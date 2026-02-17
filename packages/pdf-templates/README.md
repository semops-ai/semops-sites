# PDF Templates

LaTeX templates for Pandoc PDF export, branded to match web design systems.

## Templates

| Template | Brand | Typography | Colors |
|----------|-------|------------|--------|
| `semops.latex` | SemOps | DM Sans + JetBrains Mono | Forest green |
| `timjmitchell.latex` | Tim J Mitchell | Inter + Lora + JetBrains Mono | Sky blue |
| `technical.latex` | Technical docs | Inter + JetBrains Mono | Neutral zinc |
| `resume.latex` | Resume | Inter + Lora + JetBrains Mono | Sky blue |

## Usage

These templates are consumed by `semops-publisher/scripts/export_pdf.py`:

```bash
# From semops-publisher
python scripts/export_pdf.py posts/my-post --template semops

# The script looks for templates at:
# ~/GitHub/semops-sites/packages/pdf-templates/{template}.latex
```

## Requirements

- XeLaTeX (for font support)
- Pandoc
- System fonts: DM Sans, Inter, Lora, JetBrains Mono

Install fonts via `packages/fonts/` infrastructure or your system font manager.

## Template Features

All templates include:

- **Typography:** Brand fonts via fontspec
- **Colors:** Brand palette via xcolor
- **Code blocks:** JetBrains Mono with syntax highlighting
- **Blockquotes:** Colored left border
- **Tables:** booktabs styling
- **Headers/footers:** Document title and page numbers
- **Links:** Brand-colored hyperlinks

### semops.latex

- Forest green accent (`#3a6b54`)
- JetBrains Mono headings with tight letter-spacing
- Professional technical feel

### timjmitchell.latex

- Sky blue accent (`#0ea5e9`)
- Lora serif headings
- Warm professional feel

### technical.latex

- Blue accent (`#2563eb`)
- Line numbers in code blocks
- Tighter spacing for dense documentation
- Smaller base font (10pt)

### resume.latex

- Sky blue accent (`#0ea5e9`), same palette as timjmitchell
- Lora serif headings, Inter body
- 10pt base font, letter paper, 1" margins, single line spacing
- Contact links in first-page header only, no headers/footers on subsequent pages
- Horizontal rules suppressed for compact layout
- Optimized for 2-page resume format

## Customization

Edit templates directly. Key customization points:

- **Colors:** `\definecolor{primary}{HTML}{...}`
- **Fonts:** `\setmainfont{...}`, `\setmonofont{...}`
- **Spacing:** `\setstretch{...}`, `\parskip`
- **Margins:** `geometry` package options

## Related

- [ADR-0005: Design System Asset Ownership](../../docs/decisions/ADR-0005-design-system-asset-ownership.md)
- [semops-publisher#48](https://github.com/semops-ai/semops-publisher/issues/48) - PDF export implementation
- [packages/fonts/](../fonts/) - Font infrastructure
