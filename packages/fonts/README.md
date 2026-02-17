# @sites/fonts

Shared font assets and manifest for the semops-sites monorepo.

> **Portable:** The `scripts/generate-manifest.py` script is self-contained and can be copied to other monorepos. Just copy the `scripts/` directory and `requirements.txt`.

## Structure

```
packages/fonts/
├── fonts.json          # Single manifest - edit directly for descriptions, pairings, etc.
├── css/
│   └── fonts.css       # Ready-to-use @font-face definitions (generated)
├── woff2/              # Web-optimized WOFF2 format
├── ttf/                # Desktop/fallback TrueType format
├── zips/               # Drop zone for font ZIP archives (gitignored)
│   └── processed/      # ZIPs moved here after import
└── scripts/
    ├── generate-manifest.py
    └── requirements.txt
```

## Quick Start

### Option 1: Import from ZIP files

```bash
cd packages/fonts
python3 -m venv venv
source venv/bin/activate
pip install -r scripts/requirements.txt

# Drop ZIPs into zips/ folder, then import
python scripts/generate-manifest.py --import-zip zips/ --convert-woff2 --install-local
```

### Option 2: Copy TTF files manually

```bash
cd packages/fonts
python3 -m venv venv
source venv/bin/activate
pip install -r scripts/requirements.txt

# Copy your fonts to ttf/
cp /path/to/fonts/*.ttf ttf/

# Generate manifest, convert to WOFF2, install locally
python scripts/generate-manifest.py --convert-woff2 --install-local
```

## Script Options

```
python scripts/generate-manifest.py [options]

Options:
  --import-zip PATH    Extract fonts from ZIP file(s) or directory
  --convert-woff2      Convert TTF files to WOFF2 format
  --install-local      Install fonts to system font directory
  --lookup-metadata    Enrich manifest with Google Fonts API metadata
```

### Examples

```bash
# Import all ZIPs from zips/ folder
python scripts/generate-manifest.py --import-zip zips/

# Import from single ZIP
python scripts/generate-manifest.py --import-zip zips/Inter.zip

# Full pipeline: import, convert, install, generate manifest
python scripts/generate-manifest.py --import-zip zips/ --convert-woff2 --install-local

# Enrich with Google Fonts metadata (requires API key)
python scripts/generate-manifest.py --lookup-metadata

# Just regenerate from existing ttf/ files
python scripts/generate-manifest.py --convert-woff2
```

## Editing the Manifest

Edit `fonts.json` directly to add human/agent-readable metadata. The following fields are preserved when you regenerate:

- `description` - Human-readable description of the font's character and best use cases
- `pairings` - Suggested font pairings
- `tags` - Custom tags (merged with auto-detected tags)
- `usage` - Usage hints (body, heading, code, etc.)
- `tokens` - Design tokens (line height, letter spacing)
- `_source` - Source tracking (Envato URLs, download dates)

Example:

```json
{
  "family": "Billy",
  "description": "Friendly rounded sans-serif with soft, approachable character. Works well for playful brands.",
  "pairings": ["Lora", "Inter"],
  "tags": ["friendly", "rounded"],
  ...
}
```

## Google Fonts API Integration

The `--lookup-metadata` flag enriches your manifest with metadata from Google Fonts:

- Category (serif, sans-serif, monospace, display, handwriting)
- Supported subsets (latin, cyrillic, etc.)
- Source URL to Google Fonts specimen page

### Setup

1. Get a free API key at [Google Fonts Developer API](https://developers.google.com/fonts/docs/developer_api)

2. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

3. Add your API key to `.env`:

   ```bash
   GOOGLE_FONTS_API_KEY=your_api_key_here
   ```

### Usage

```bash
# Enrich manifest with Google Fonts data
python scripts/generate-manifest.py --lookup-metadata

# Combine with other options
python scripts/generate-manifest.py --import-zip zips/ --convert-woff2 --lookup-metadata
```

Fonts not found in Google Fonts will retain their locally-extracted metadata.

## System Font Installation

The `--install-local` flag copies fonts to your system font directory:

| OS | Directory |
|----|-----------|
| macOS | `~/Library/Fonts/` |
| Linux | `~/.local/share/fonts/` (runs `fc-cache` automatically) |
| Windows | `%LOCALAPPDATA%\Microsoft\Windows\Fonts\` |

## Using in Web Projects

Import the generated CSS in your stylesheet:

```css
@import '@sites/fonts/css/fonts.css';
```

Or reference individual WOFF2 files in your own `@font-face` rules.

## Cross-Repo Usage

Other repos can consume this package via symlink:

```bash
# In another monorepo
cd packages
ln -s ../../semops-sites/packages/fonts fonts
```

This allows sharing the font manifest and assets without duplication. For production builds, fonts should be served from a CDN (e.g., R2).

## Manifest Format

The `fonts.json` manifest provides machine-readable font metadata:

```json
{
  "version": "3.0.0",
  "_comment": "Edit this file directly to add descriptions, pairings, etc.",
  "fonts": [
    {
      "family": "Inter",
      "description": "Modern geometric sans-serif, excellent for UI and body text.",
      "category": "sans-serif",
      "license": "OFL",
      "tags": ["geometric", "ui"],
      "usage": ["body", "ui"],
      "pairings": ["Lora"],
      "tokens": {
        "lineHeight": { "body": 1.5, "heading": 1.2 },
        "letterSpacing": { "body": "0", "heading": "-0.02em" }
      },
      "_source": {
        "slug": "inter-font",
        "downloadDate": "2024-01-15",
        "envatoUrl": "https://elements.envato.com/inter-font"
      },
      "variants": [
        {
          "weight": 400,
          "style": "normal",
          "files": {
            "woff2": "woff2/Inter-Regular.woff2",
            "ttf": "ttf/Inter-Regular.ttf"
          }
        }
      ]
    }
  ]
}
```

## Current Fonts

| Font | App | Role |
|------|-----|------|
| Inter | timjmitchell | Body text |
| Lora | timjmitchell | Serif headings |
| Plus Jakarta Sans | timjmitchell | Display headings |
| DM Sans | semops | Body text |
| JetBrains Mono | semops | Headings/code |
