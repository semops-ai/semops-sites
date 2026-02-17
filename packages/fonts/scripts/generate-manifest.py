#!/usr/bin/env python3
"""
Font Manifest Generator

Scans TTF/WOFF2 directories and generates:
- fonts.json (machine-readable manifest with rich metadata)
- css/fonts.css (@font-face definitions)

The manifest is merged, not overwritten - human-added fields like 'description',
'pairings', and custom 'tags' are preserved across regenerations.

Usage:
    python generate-manifest.py [options]

Options:
    --convert-woff2         Convert TTF files to WOFF2 format
    --import-zip <path>     Extract fonts from ZIP file(s) to ttf/
    --install-local         Install TTF fonts to system font directory
    --lookup-metadata       Enrich manifest with Google Fonts API metadata

Environment Variables:
    GOOGLE_FONTS_API_KEY    Required for --lookup-metadata

Requirements:
    pip install fonttools brotli python-dotenv requests
"""

from __future__ import annotations

import argparse
import json
import os
import platform
import re
import shutil
import subprocess
import zipfile
from collections import defaultdict
from pathlib import Path

from dotenv import load_dotenv
from fontTools.ttLib import TTFont

# Load environment variables from .env file
load_dotenv(Path(__file__).parent.parent / ".env")

FONTS_DIR = Path(__file__).parent.parent
WOFF2_DIR = FONTS_DIR / "woff2"
TTF_DIR = FONTS_DIR / "ttf"
CSS_DIR = FONTS_DIR / "css"
MANIFEST_PATH = FONTS_DIR / "fonts.json"

# Fields that are preserved from existing manifest (human-editable)
PRESERVED_FIELDS = {
    "description",
    "pairings",
    "tags",
    "usage",
    "tokens",
    "designer",
    "source",
    "license",
    "licenseInfo",
    "licenseUrl",
    "googleFonts",
    "subsets",
    "_source",
}

# Weight suffix patterns for family normalization
WEIGHT_SUFFIXES = {
    "thin": 100,
    "hairline": 100,
    "extralight": 200,
    "ultralight": 200,
    "light": 300,
    "regular": 400,
    "normal": 400,
    "medium": 500,
    "semibold": 600,
    "demibold": 600,
    "bold": 700,
    "extrabold": 800,
    "ultrabold": 800,
    "black": 900,
    "heavy": 900,
}

# Tags to extract from font names
TAG_PATTERNS = {
    "pixel": ["pixel", "bitmap", "8bit", "retro"],
    "mono": ["mono", "monospace", "fixed", "code"],
    "display": ["display", "headline", "poster", "decorative"],
    "handwritten": ["hand", "script", "brush", "signature"],
    "serif": ["serif", "roman", "classical"],
    "sans": ["sans", "gothic", "grotesk"],
    "blackletter": ["blackletter", "fraktur", "gothic", "old english"],
    "rounded": ["rounded", "soft"],
    "condensed": ["condensed", "narrow", "compressed"],
    "extended": ["extended", "wide", "expanded"],
    "stencil": ["stencil"],
    "outline": ["outline", "hollow"],
    "slab": ["slab"],
    "geometric": ["geometric", "futura"],
    "humanist": ["humanist"],
    "techno": ["tech", "futuristic", "cyber", "digital"],
    "vintage": ["vintage", "retro", "classic", "antique"],
    "modern": ["modern", "contemporary"],
    "clock": ["clock", "time", "watch", "timer", "stopwatch"],
}

# Default design tokens by category
DEFAULT_TOKENS = {
    "sans-serif": {
        "lineHeight": {"body": 1.5, "heading": 1.2},
        "letterSpacing": {"body": "0", "heading": "-0.02em"},
    },
    "serif": {
        "lineHeight": {"body": 1.6, "heading": 1.25},
        "letterSpacing": {"body": "0", "heading": "-0.01em"},
    },
    "monospace": {
        "lineHeight": {"body": 1.5, "heading": 1.3},
        "letterSpacing": {"body": "0", "heading": "0"},
    },
    "display": {
        "lineHeight": {"body": 1.4, "heading": 1.1},
        "letterSpacing": {"body": "0", "heading": "-0.03em"},
    },
}


def get_system_font_dir() -> Path:
    """Get the user's system font directory based on OS."""
    system = platform.system()
    if system == "Darwin":  # macOS
        return Path.home() / "Library" / "Fonts"
    elif system == "Linux":
        return Path.home() / ".local" / "share" / "fonts"
    elif system == "Windows":
        return Path.home() / "AppData" / "Local" / "Microsoft" / "Windows" / "Fonts"
    else:
        raise RuntimeError(f"Unsupported platform: {system}")


def parse_envato_slug(zip_filename: str) -> dict | None:
    """
    Parse Envato Elements ZIP filename to extract product slug.

    Format: {product-slug}-{date}-utc.zip
    Example: matech-modern-techno-monospace-2024-06-07-19-45-05-utc.zip

    Returns dict with slug and download date, or None if not Envato format.
    """
    # Remove .zip extension
    name = zip_filename.replace(".zip", "")

    # Match Envato format: ends with date-utc pattern
    # Pattern: YYYY-MM-DD-HH-MM-SS-utc
    date_pattern = r"-(\d{4}-\d{2}-\d{2})-\d{2}-\d{2}-\d{2}-utc$"
    match = re.search(date_pattern, name, re.IGNORECASE)

    if match:
        date_str = match.group(1)
        slug = re.sub(date_pattern, "", name, flags=re.IGNORECASE)
        return {
            "slug": slug,
            "downloadDate": date_str,
            "envatoUrl": f"https://elements.envato.com/{slug}",
        }

    return None


def extract_fonts_from_zip(
    zip_path: Path, dest_dir: Path, source_map: dict
) -> list[Path]:
    """Extract TTF and OTF files from a ZIP archive."""
    extracted = []

    # Parse Envato slug from filename
    envato_info = parse_envato_slug(zip_path.name)

    with zipfile.ZipFile(zip_path, "r") as zf:
        for name in zf.namelist():
            if name.endswith("/") or name.startswith("__MACOSX") or name.startswith("._"):
                continue

            lower_name = name.lower()
            if lower_name.endswith(".ttf") or lower_name.endswith(".otf"):
                filename = Path(name).name
                if filename.startswith("._"):
                    continue
                dest_path = dest_dir / filename
                with zf.open(name) as src:
                    dest_path.write_bytes(src.read())
                extracted.append(dest_path)
                print(f"  Extracted: {filename}")

                # Track source for this font file
                if envato_info:
                    source_map[filename] = envato_info

    return extracted


def import_from_zip(zip_paths: list[str], existing_sources: dict) -> tuple[int, dict]:
    """Import fonts from one or more ZIP files. Returns (count, source_map).

    When importing from a directory, processed ZIPs are moved to a 'processed/'
    subdirectory. This allows incremental imports - just drop new ZIPs in the
    folder and run again.
    """
    TTF_DIR.mkdir(exist_ok=True)
    total_extracted = 0
    source_map: dict = existing_sources.copy()
    processed_zips: list[tuple[Path, Path]] = []  # (zip_path, processed_dir)

    for zip_path_str in zip_paths:
        zip_path = Path(zip_path_str).expanduser().resolve()

        if not zip_path.exists():
            print(f"  Warning: {zip_path} not found, skipping")
            continue

        if zip_path.is_dir():
            # Only process ZIPs in the root, not in processed/ subfolder
            zip_files = [z for z in zip_path.glob("*.zip") if z.parent == zip_path]
            if not zip_files:
                print(f"  No new ZIP files found in {zip_path}")
                continue
            processed_dir = zip_path / "processed"
            processed_dir.mkdir(exist_ok=True)
            for zf in zip_files:
                print(f"\nImporting from: {zf.name}")
                extracted = extract_fonts_from_zip(zf, TTF_DIR, source_map)
                total_extracted += len(extracted)
                processed_zips.append((zf, processed_dir))
        else:
            print(f"\nImporting from: {zip_path.name}")
            extracted = extract_fonts_from_zip(zip_path, TTF_DIR, source_map)
            total_extracted += len(extracted)

    # Move processed ZIPs to processed/ folder
    for zf, processed_dir in processed_zips:
        dest = processed_dir / zf.name
        shutil.move(str(zf), str(dest))
        print(f"  Moved: {zf.name} -> processed/")

    return total_extracted, source_map


def install_fonts_locally(ttf_files: list[Path]) -> int:
    """Install TTF fonts to system font directory."""
    font_dir = get_system_font_dir()
    font_dir.mkdir(parents=True, exist_ok=True)

    installed = 0
    for ttf_path in ttf_files:
        dest = font_dir / ttf_path.name
        if dest.exists():
            print(f"  Skipped (exists): {ttf_path.name}")
        else:
            shutil.copy2(ttf_path, dest)
            print(f"  Installed: {ttf_path.name} -> {dest}")
            installed += 1

    if platform.system() == "Linux" and installed > 0:
        print("\nRefreshing font cache...")
        try:
            subprocess.run(["fc-cache", "-fv"], check=True, capture_output=True)
            print("  Font cache updated")
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("  Warning: Could not refresh font cache (fc-cache not found)")

    return installed


def extract_font_metadata(font_path: Path) -> dict:
    """Extract metadata from a font file using fonttools."""
    font = TTFont(str(font_path))
    name_table = font["name"]
    os2_table = font.get("OS/2")

    names = {}
    for record in name_table.names:
        if record.platformID == 3:
            try:
                names[record.nameID] = record.toUnicode()
            except Exception:
                pass

    if not names:
        for record in name_table.names:
            if record.platformID == 1:
                try:
                    names[record.nameID] = record.toUnicode()
                except Exception:
                    pass

    family = names.get(1, "Unknown")
    style = names.get(2, "Regular")
    designer = names.get(9, None)
    license_info = names.get(13, None)
    license_url = names.get(14, None)

    weight = os2_table.usWeightClass if os2_table else 400

    is_italic = "italic" in style.lower()
    if os2_table and not is_italic:
        is_italic = bool(os2_table.fsSelection & 1)

    font.close()

    return {
        "family": family,
        "style": style,
        "weight": weight,
        "is_italic": is_italic,
        "designer": designer,
        "license_info": license_info,
        "license_url": license_url,
    }


def normalize_family_name(family: str) -> tuple[str, int | None]:
    """
    Normalize family name by removing weight suffixes.
    Returns (normalized_name, detected_weight or None).

    Example: "Fhayu Thin" -> ("Fhayu", 100)
             "Matech ExtraBold" -> ("Matech", 800)
             "Inter" -> ("Inter", None)
    """
    family_lower = family.lower()

    # Check for weight suffix at end of family name
    for suffix, weight in sorted(WEIGHT_SUFFIXES.items(), key=lambda x: -len(x[0])):
        # Match suffix at word boundary
        pattern = rf"\s+{re.escape(suffix)}$"
        if re.search(pattern, family_lower):
            normalized = re.sub(pattern, "", family, flags=re.IGNORECASE).strip()
            return normalized, weight

    return family, None


def extract_tags(family: str, filename: str = "") -> list[str]:
    """Extract style tags from font family name and filename."""
    tags = set()
    search_text = f"{family} {filename}".lower()

    for tag, patterns in TAG_PATTERNS.items():
        for pattern in patterns:
            if pattern in search_text:
                tags.add(tag)
                break

    return sorted(tags)


def categorize_font(family: str, tags: list[str]) -> str:
    """Categorize font by family name and tags."""
    family_lower = family.lower()

    # Check tags first
    if "mono" in tags:
        return "monospace"
    if "display" in tags or "pixel" in tags or "clock" in tags:
        return "display"

    # Then check family name
    if "mono" in family_lower:
        return "monospace"
    elif any(x in family_lower for x in ["lora", "georgia", "times", "garamond"]):
        return "serif"
    elif "sans" not in family_lower and "serif" in family_lower:
        return "serif"

    return "sans-serif"


def infer_usage(category: str, tags: list[str]) -> list[str]:
    """Infer usage hints based on category and tags."""
    usage = []

    if category == "monospace":
        usage.extend(["code", "data"])
    elif category == "display":
        usage.append("heading")
    elif category == "serif":
        usage.extend(["body", "heading"])
    else:  # sans-serif
        usage.extend(["body", "ui"])

    if "pixel" in tags or "clock" in tags:
        usage.append("decorative")
    if "handwritten" in tags:
        usage.append("accent")

    return sorted(set(usage))


def convert_ttf_to_woff2(ttf_path: Path, woff2_path: Path) -> None:
    """Convert a TTF file to WOFF2 format."""
    from fontTools.ttLib import woff2

    woff2.compress(str(ttf_path), str(woff2_path))
    print(f"  Converted: {ttf_path.name} -> {woff2_path.name}")


# Google Fonts API cache
_google_fonts_cache: dict | None = None


def fetch_google_fonts_metadata() -> dict:
    """Fetch and cache Google Fonts API metadata.

    Returns a dict mapping lowercase family names to their metadata.
    """
    global _google_fonts_cache

    if _google_fonts_cache is not None:
        return _google_fonts_cache

    import requests

    api_key = os.getenv("GOOGLE_FONTS_API_KEY")
    if not api_key:
        raise ValueError(
            "GOOGLE_FONTS_API_KEY environment variable not set.\n"
            "Get an API key at: https://developers.google.com/fonts/docs/developer_api\n"
            "Then add it to packages/fonts/.env"
        )

    url = "https://www.googleapis.com/webfonts/v1/webfonts"
    params = {"key": api_key, "sort": "alpha"}

    print("Fetching Google Fonts metadata...")
    response = requests.get(url, params=params, timeout=30)
    response.raise_for_status()

    data = response.json()
    fonts = data.get("items", [])

    # Build lookup dict by lowercase family name
    _google_fonts_cache = {}
    for font in fonts:
        family = font.get("family", "")
        _google_fonts_cache[family.lower()] = font

    print(f"  Loaded {len(_google_fonts_cache)} font families from Google Fonts")
    return _google_fonts_cache


def lookup_google_fonts_metadata(family_name: str) -> dict | None:
    """Look up metadata for a font family from Google Fonts API.

    Returns enriched metadata dict or None if not found.
    """
    cache = fetch_google_fonts_metadata()
    gf_data = cache.get(family_name.lower())

    if not gf_data:
        return None

    # Extract useful fields
    return {
        "googleFonts": True,
        "googleFontsFamily": gf_data.get("family"),
        "category": gf_data.get("category", "").replace("-", " "),
        "subsets": gf_data.get("subsets", []),
        "variants": gf_data.get("variants", []),
        "version": gf_data.get("version"),
        "lastModified": gf_data.get("lastModified"),
        "source": f"https://fonts.google.com/specimen/{gf_data.get('family', '').replace(' ', '+')}",
    }


def enrich_with_google_fonts(families: dict) -> int:
    """Enrich font families with Google Fonts API metadata.

    Returns count of families enriched.
    """
    enriched = 0

    for family_name, family_data in families.items():
        gf_metadata = lookup_google_fonts_metadata(family_name)
        if gf_metadata:
            # Merge Google Fonts data
            family_data["googleFonts"] = True
            family_data["source"] = gf_metadata["source"]

            # Use Google's category if we don't have a better one
            if family_data.get("category") == "sans-serif" and gf_metadata.get("category"):
                gf_category = gf_metadata["category"]
                if gf_category in ("serif", "monospace", "display", "handwriting"):
                    family_data["category"] = gf_category

            # Add subsets info
            if gf_metadata.get("subsets"):
                family_data["subsets"] = gf_metadata["subsets"]

            enriched += 1
            print(f"  ✓ {family_name}: matched Google Fonts")
        else:
            print(f"  · {family_name}: not in Google Fonts")

    return enriched


def load_existing_manifest() -> tuple[dict, dict]:
    """Load existing manifest and extract preserved data.

    Returns (existing_fonts_by_family, file_source_map).
    """
    existing_fonts: dict = {}
    source_map: dict = {}

    if MANIFEST_PATH.exists():
        try:
            manifest = json.loads(MANIFEST_PATH.read_text())
            for font in manifest.get("fonts", []):
                family = font.get("family", "")
                if family:
                    existing_fonts[family] = font
                    # Extract source info if present
                    if "_source" in font:
                        source_map[family] = font["_source"]
        except json.JSONDecodeError:
            print(f"  Warning: Could not parse existing {MANIFEST_PATH}")

    return existing_fonts, source_map


def merge_preserved_fields(new_data: dict, existing_data: dict) -> dict:
    """Merge preserved fields from existing data into new data."""
    for field in PRESERVED_FIELDS:
        if field in existing_data and field not in new_data:
            new_data[field] = existing_data[field]
        elif field == "tags" and field in existing_data and field in new_data:
            # Merge tags
            new_data["tags"] = sorted(set(new_data["tags"]) | set(existing_data["tags"]))
        elif field == "pairings" and field in existing_data:
            # Preserve pairings (don't auto-generate)
            new_data["pairings"] = existing_data["pairings"]
        elif field == "tokens" and field in existing_data and field in new_data:
            # Deep merge tokens
            for key, value in existing_data["tokens"].items():
                if key not in new_data["tokens"]:
                    new_data["tokens"][key] = value

    return new_data


def group_fonts_by_family(
    fonts: list[dict], existing_fonts: dict, file_source_map: dict
) -> dict:
    """Group font variants by normalized family name."""
    families: dict = defaultdict(lambda: {"variants": {}, "_sources": []})

    for font in fonts:
        raw_family = font["family"]
        normalized_family, detected_weight = normalize_family_name(raw_family)

        # Use detected weight from family name if font weight is default (400)
        weight = font["weight"]
        if detected_weight and weight == 400:
            weight = detected_weight

        if "family" not in families[normalized_family]:
            families[normalized_family]["family"] = normalized_family

        # Track original family names for debugging
        if raw_family not in families[normalized_family]["_sources"]:
            families[normalized_family]["_sources"].append(raw_family)

        stem = font["file_stem"]
        style = "italic" if font["is_italic"] else "normal"
        variant_key = (weight, style)

        if variant_key not in families[normalized_family]["variants"]:
            families[normalized_family]["variants"][variant_key] = {
                "weight": weight,
                "style": style,
                "files": {},
            }

        variant = families[normalized_family]["variants"][variant_key]

        woff2_file = WOFF2_DIR / f"{stem}.woff2"
        if woff2_file.exists() and "woff2" not in variant["files"]:
            variant["files"]["woff2"] = f"woff2/{stem}.woff2"

        ttf_file = TTF_DIR / f"{stem}.ttf"
        if ttf_file.exists() and "ttf" not in variant["files"]:
            variant["files"]["ttf"] = f"ttf/{stem}.ttf"

        # Store additional metadata from first font file
        if "designer" not in families[normalized_family] and font.get("designer"):
            families[normalized_family]["designer"] = font["designer"]
        if "licenseInfo" not in families[normalized_family] and font.get("license_info"):
            families[normalized_family]["licenseInfo"] = font["license_info"]
        if "licenseUrl" not in families[normalized_family] and font.get("license_url"):
            families[normalized_family]["licenseUrl"] = font["license_url"]

        # Check for source info from file_source_map
        filename = f"{stem}.ttf"
        if filename in file_source_map:
            families[normalized_family]["_source"] = file_source_map[filename]

    # Convert variant dicts to sorted lists and add metadata
    for family_name, family_data in families.items():
        # Convert variants to list
        variants_list = list(family_data["variants"].values())
        variants_list.sort(key=lambda v: (v["weight"], v["style"]))
        family_data["variants"] = variants_list

        # Extract tags
        tags = extract_tags(family_name, " ".join(family_data.get("_sources", [])))
        family_data["tags"] = tags

        # Determine category
        category = categorize_font(family_name, tags)
        family_data["category"] = category

        # Infer usage
        family_data["usage"] = infer_usage(category, tags)

        # Add default design tokens
        token_category = "display" if category == "display" else category
        if token_category in DEFAULT_TOKENS:
            family_data["tokens"] = DEFAULT_TOKENS[token_category].copy()

        # Default license
        family_data["license"] = "OFL"

        # Initialize empty pairings (to be filled by user/agent)
        family_data["pairings"] = []

        # Merge preserved fields from existing manifest
        if family_name in existing_fonts:
            family_data = merge_preserved_fields(family_data, existing_fonts[family_name])

        # Remove internal fields
        family_data.pop("_sources", None)

    return dict(families)


def generate_css(families: dict) -> str:
    """Generate @font-face CSS from font families."""
    css_lines = [
        "/* Generated by generate-manifest.py - DO NOT EDIT */",
        "/* Run 'python scripts/generate-manifest.py' to regenerate */",
        "",
    ]

    for family_name in sorted(families.keys()):
        family_data = families[family_name]
        css_lines.append(f"/* {family_name} */")

        for variant in family_data["variants"]:
            src_parts = []
            if "woff2" in variant["files"]:
                src_parts.append(
                    f"url('../{variant['files']['woff2']}') format('woff2')"
                )
            if "ttf" in variant["files"]:
                src_parts.append(
                    f"url('../{variant['files']['ttf']}') format('truetype')"
                )

            if src_parts:
                css_lines.append(
                    f"""@font-face {{
  font-family: '{family_name}';
  font-style: {variant["style"]};
  font-weight: {variant["weight"]};
  font-display: swap;
  src: {",\n       ".join(src_parts)};
}}"""
                )
                css_lines.append("")

    return "\n".join(css_lines)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate font manifest and CSS",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Import fonts from ZIP and generate manifest
  python generate-manifest.py --import-zip ~/Downloads/Inter.zip --convert-woff2

  # Import from multiple ZIPs
  python generate-manifest.py --import-zip ~/Downloads/*.zip --convert-woff2

  # Import from directory containing ZIPs
  python generate-manifest.py --import-zip ~/Downloads/fonts/ --convert-woff2

  # Install fonts to system and generate manifest
  python generate-manifest.py --install-local --convert-woff2

  # Just generate manifest from existing ttf/ files
  python generate-manifest.py --convert-woff2

The manifest is merged, not overwritten. Human-added fields like 'description',
'pairings', and custom 'tags' are preserved across regenerations. Edit fonts.json
directly to add descriptions or other metadata.
""",
    )
    parser.add_argument(
        "--convert-woff2",
        action="store_true",
        help="Convert TTF files to WOFF2 format",
    )
    parser.add_argument(
        "--import-zip",
        nargs="+",
        metavar="PATH",
        help="Import fonts from ZIP file(s) or directory containing ZIPs",
    )
    parser.add_argument(
        "--install-local",
        action="store_true",
        help="Install TTF fonts to system font directory",
    )
    parser.add_argument(
        "--lookup-metadata",
        action="store_true",
        help="Enrich manifest with Google Fonts API metadata (requires GOOGLE_FONTS_API_KEY)",
    )
    args = parser.parse_args()

    # Ensure directories exist
    WOFF2_DIR.mkdir(exist_ok=True)
    CSS_DIR.mkdir(exist_ok=True)
    TTF_DIR.mkdir(exist_ok=True)

    # Load existing manifest to preserve human-added fields
    print("Loading existing manifest...")
    existing_fonts, existing_sources = load_existing_manifest()
    if existing_fonts:
        print(f"  Found {len(existing_fonts)} existing font families")

    # Build file-level source map from existing manifest
    file_source_map: dict = {}
    for family_name, font_data in existing_fonts.items():
        if "_source" in font_data:
            # Map source to all variant files
            for variant in font_data.get("variants", []):
                for file_type, file_path in variant.get("files", {}).items():
                    filename = Path(file_path).name
                    # Convert woff2 filename to ttf for lookup
                    if filename.endswith(".woff2"):
                        filename = filename.replace(".woff2", ".ttf")
                    file_source_map[filename] = font_data["_source"]

    # Import from ZIP if requested
    if args.import_zip:
        print("Importing fonts from ZIP archives...")
        imported, file_source_map = import_from_zip(args.import_zip, file_source_map)
        print(f"\n✓ Imported {imported} font files")
        if file_source_map:
            envato_count = sum(1 for v in file_source_map.values() if v.get("envatoUrl"))
            if envato_count:
                print(f"  ({envato_count} from Envato Elements)")

    # Collect all TTF files
    ttf_files = list(TTF_DIR.glob("*.ttf")) + list(TTF_DIR.glob("*.otf"))

    if not ttf_files:
        print(f"No font files found in {TTF_DIR}")
        print("\nTo use this script:")
        print(f"  1. Copy your .ttf files to {TTF_DIR}/")
        print("     OR use --import-zip to extract from ZIP archives")
        print("  2. Run: python scripts/generate-manifest.py --convert-woff2")
        return

    print(f"\nProcessing {len(ttf_files)} font files...")

    # Install locally if requested
    if args.install_local:
        print(f"\nInstalling to {get_system_font_dir()}...")
        installed = install_fonts_locally(ttf_files)
        print(f"✓ Installed {installed} fonts")

    # Convert to WOFF2 if requested
    if args.convert_woff2:
        print("\nConverting TTF to WOFF2...")
        for ttf_path in ttf_files:
            woff2_path = WOFF2_DIR / f"{ttf_path.stem}.woff2"
            if not woff2_path.exists():
                try:
                    convert_ttf_to_woff2(ttf_path, woff2_path)
                except Exception as e:
                    print(f"  Error converting {ttf_path.name}: {e}")
            else:
                print(f"  Skipped (exists): {woff2_path.name}")

    # Extract metadata from all fonts
    fonts = []
    print("\nExtracting metadata...")
    for ttf_path in ttf_files:
        try:
            metadata = extract_font_metadata(ttf_path)
            metadata["file_stem"] = ttf_path.stem
            fonts.append(metadata)
            print(
                f"  {ttf_path.name}: {metadata['family']} "
                f"{metadata['weight']} {metadata['style']}"
            )
        except Exception as e:
            print(f"  Error reading {ttf_path.name}: {e}")

    if not fonts:
        print("No valid font files found.")
        return

    # Group by family (with merge from existing)
    families = group_fonts_by_family(fonts, existing_fonts, file_source_map)

    # Enrich with Google Fonts API metadata if requested
    if args.lookup_metadata:
        print("\nLooking up Google Fonts metadata...")
        try:
            enriched = enrich_with_google_fonts(families)
            print(f"✓ Enriched {enriched} families with Google Fonts metadata")
        except ValueError as e:
            print(f"Warning: {e}")
        except Exception as e:
            print(f"Warning: Google Fonts lookup failed: {e}")

    # Generate manifest
    manifest = {
        "version": "3.0.0",
        "generated": True,
        "_comment": "Edit this file directly to add descriptions, pairings, etc. Human-added fields are preserved on regeneration.",
        "fonts": sorted(families.values(), key=lambda f: f["family"]),
    }

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"\nGenerated: {MANIFEST_PATH}")

    # Generate CSS
    css_content = generate_css(families)
    css_file = CSS_DIR / "fonts.css"
    css_file.write_text(css_content)
    print(f"Generated: {css_file}")

    # Summary
    print(f"\n✓ {len(families)} font families")
    print(f"✓ {sum(len(f['variants']) for f in families.values())} total variants")

    # Show families that were normalized
    for family_data in families.values():
        tags = family_data.get("tags", [])
        if tags:
            print(f"  {family_data['family']}: {', '.join(tags)}")


if __name__ == "__main__":
    main()
