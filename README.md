# High-Dimensional Spectral Flow Data Analysis

This repository contains the public participant site for the LMU workshop. GitHub Pages publishes `main` from `/docs`. The static HTML lives in that folder. GitHub Releases hosts the synthetic FCS and ZIP downloads.

## Refresh the workshop instructions

Install the pinned build dependency once with `npm ci`. Sync or download the files from `pc2/website_inhalt` to a local folder. From the repository root, run:

```powershell
npm run refresh -- "C:\path\to\website_inhalt"
```

This imports the recognized Markdown files that are present and rebuilds the pages. The recognized names are `index.md`, `exercise_1.md`, `exercise_1_set_a.md` through `exercise_1_set_e.md`, `exercise_2.md`, and `glossary.md`. Shared text belongs outside version blocks. Use a line with `::: v10` or `::: v11` to start a version block and a line with `:::` to close it. Use section headings beginning with `##`. Each page supplies its own title.

Use `npm run build` to rebuild using the Markdown already in `content/`. Review the changes in `content/` and `docs/` before pushing them to `main`. The site accepts `?flowjo=v10` or `?flowjo=v11`. The version selector remembers the choice and carries it across internal links.

## Update data downloads

Keep the approved data in the GitHub Release assets. Set `release` in `downloads.json` to the new release tag and update the filename, byte count and SHA-256 of each asset. Run `npm run build`, review the repository file list and the Exercise 1 pages and assets, then push. Download each published asset again and compare the byte count and SHA-256 shown on the site.
