import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';

const root = fileURLToPath(new URL('../', import.meta.url));
const docs = join(root, 'docs');
const contentFolder = join(root, 'content');
const title = 'High-Dimensional Spectral Flow Data Analysis';
const repository = 'https://github.com/henry-nording/lmu-flow-workshop-2026';
const sections = {
  exercise1: 'Exercise 1',
  exercise2: 'Exercise 2',
  test: 'Test file',
};
const sets = ['A', 'B', 'C', 'D', 'E'];
const pages = [
  { route: '', label: 'Home', heading: title, source: 'index.md' },
  { route: 'exercise-1/', label: 'Exercise 1', heading: 'Exercise 1: Find the error', source: 'exercise_1.md', printable: true },
  { route: 'exercise-2/', label: 'Exercise 2', heading: 'Exercise 2: Cluster and name', source: 'exercise_2.md', printable: true },
  { route: 'downloads/', label: 'Downloads', heading: 'Downloads' },
  { route: 'glossary/', label: 'Glossary', heading: 'Glossary', source: 'glossary.md' },
  { route: 'printable/', heading: 'Printable versions' },
  ...sets.map(set => ({
    route: `exercise-1/set-${set.toLowerCase()}/`,
    heading: `Set ${set}`,
    source: `exercise_1_set_${set.toLowerCase()}.md`,
    set,
    printable: true,
  })),
];
const markdown = new MarkdownIt({ html: false });
const escape = markdown.utils.escapeHtml;

function resolveSources(args) {
  if (!args.length) return null;
  if (args.length !== 2 || args[0] !== '--from') {
    throw new Error('Usage: npm run refresh -- "<local website_inhalt folder>"');
  }
  return resolve(args[1]);
}

async function optionalText(path) {
  try {
    return (await readFile(path, 'utf8')).replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

function versionedMarkdown(text, source) {
  const lines = { v10: [], v11: [] };
  let block = null;
  let lastSharedLine = '';
  let blockIndent = '';
  for (const [index, line] of text.split('\n').entries()) {
    const marker = line.trim();
    if (marker === '::: v10' || marker === '::: v11') {
      if (block) throw new Error(`${source}:${index + 1}: nested FlowJo block`);
      block = marker.slice(4);
      const stepStart = lastSharedLine.match(/^(\s*\d+\.\s+)/);
      blockIndent = stepStart ? ' '.repeat(stepStart[1].length) : '';
    } else if (marker === ':::') {
      if (!block) throw new Error(`${source}:${index + 1}: FlowJo block was never opened`);
      block = null;
    } else if (block) {
      const needsIndent = line.trim() && !line.startsWith(blockIndent);
      lines[block].push(needsIndent ? blockIndent + line : line);
    } else {
      lines.v10.push(line);
      lines.v11.push(line);
      if (line.trim()) lastSharedLine = line;
    }
  }
  if (block) throw new Error(`${source}: unclosed FlowJo block`);
  return Object.fromEntries(Object.entries(lines).map(([version, body]) => [
    version,
    markdown.render(body.join('\n').replace(/^\s*# [^\n]+(?:\n|$)/, '')),
  ]));
}

function workshopLink(href, text, current = false, setDownload = '') {
  const download = setDownload ? ` data-set-download="${setDownload}"` : '';
  return `<a href="${href}" data-workshop-page${current ? ' aria-current="page"' : ''}${download}>${text}</a>`;
}

function flowjoPicker() {
  return `<div class="version-picker" data-version-picker role="group" aria-labelledby="version-label">
    <span class="version-label" id="version-label">FlowJo version</span>
    <div class="version-options">
      <label><input type="radio" name="flowjo" value="v10" checked><span>v10</span></label>
      <label><input type="radio" name="flowjo" value="v11"><span>v11</span></label>
    </div>
  </div>`;
}

function layout(page, base, main) {
  const navigation = pages.filter(p => p.label).map(p =>
    workshopLink(base + (p.route || './'), p.label, p.route === page.route)).join('\n');
  const pageTitle = page.route ? `${page.heading} | ${title}` : title;
  const printStyles = page.printable
    ? `\n  <link rel="stylesheet" href="${base}assets/print.css" media="print">` : '';
  const worksheet = page.set ? `Exercise 1: Find the error · Set ${page.set}` : page.heading;
  const printBrand = page.printable ? `\n        <div class="brand print-only">${title}
          <span class="print-running-title">${escape(worksheet)} · <span data-print-version>FlowJo v10</span></span>
        </div>` : '';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(pageTitle)}</title>
  <link rel="icon" href="${base}assets/cic-logo.png">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap">
  <link rel="stylesheet" href="${base}assets/workshop.css">${printStyles}
  <script src="${base}assets/flowjo.js" defer></script>
</head>
<body>
  <a href="#main" class="skip-link">Skip to content</a>
  <header>
    <div class="masthead">
      <div class="wrap masthead-inner">
        <a class="brand${page.printable ? ' screen-only' : ''}" href="${base}./" data-workshop-page>${title}</a>${printBrand}
        <img class="cic" src="${base}assets/cic-logo.png" alt="CIC logo">
      </div>
    </div>
    <div class="navigation">
      <div class="wrap navigation-inner">
        <nav aria-label="Workshop">${navigation}</nav>
        ${flowjoPicker()}
      </div>
    </div>
  </header>
  <main class="wrap" id="main">
    ${main}
  </main>
  <footer class="site-footer">
    <div class="wrap footer-inner">
      <span>CytoIntelligence Core (CIC) • Kiel, Germany</span>
      <img class="cau" src="${base}assets/cau-logo.png" alt="Kiel University logo">
    </div>
  </footer>
</body>
</html>
`;
}

function introduction(heading, description = '', breadcrumb = '') {
  return `<div class="intro">${breadcrumb}<h1>${escape(heading)}</h1>${description}</div>`;
}

function article(versions, fallback = '') {
  if (!versions) return fallback ? `<div class="article">${fallback}</div>` : '';
  if (versions.v10 === versions.v11) return `<div class="article">${versions.v10}</div>`;
  return `<div class="article" data-version-content>${versions.v10}</div>
    <template data-version="v11">${versions.v11}</template>`;
}

function setNavigation(base, manifest, activeSet) {
  const links = sets.map(set => workshopLink(
    `${base}exercise-1/set-${set.toLowerCase()}/`,
    `Set ${set}`,
    activeSet === set,
    releaseAssetUrl(manifest, `Set_${set}.zip`),
  ));
  return `<nav class="set-nav" aria-labelledby="your-set"><h2 id="your-set">Your set</h2>
    <div class="set-list">${links.join('\n')}</div></nav>`;
}

function home(base, versions) {
  const links = [
    ['exercise-1/', 'Exercise 1', 'Find the error'],
    ['exercise-2/', 'Exercise 2', 'Cluster and name'],
    ['downloads/', 'Downloads', 'Synthetic FCS files for both exercises and a FlowJo test file'],
    ['glossary/', 'Glossary', 'Workshop terms and definitions (PDF)'],
  ];
  return `<div class="home-intro">
    <p class="overline">LMU Workshop</p>
    <h1>${title}</h1>
    ${article(versions, '<p>Use this site to follow the exercises and download the synthetic teaching data. Choose the FlowJo version you use for the workshop.</p>')}
  </div>
  <nav class="cards" aria-label="Workshop materials">
    ${links.map(([route, name, detail]) => `<a class="card" href="${base}${route}" data-workshop-page>
      <strong>${name}</strong><span>${detail}</span></a>`).join('\n')}
  </nav>
  <p class="printable-link">${workshopLink(base + 'printable/', 'Printable versions')}</p>`;
}

function printableVersions(base) {
  const exercise1 = pages.find(page => page.route === 'exercise-1/');
  const exercise2 = pages.find(page => page.route === 'exercise-2/');
  const setLinks = pages.filter(page => page.set).map(page =>
    `<li>${workshopLink(base + page.route, page.heading)}</li>`
  ).join('\n');
  return introduction('Printable versions',
    '<p>Choose the FlowJo version you need, open a worksheet, and select Print this page. The worksheets are formatted for A4.</p>') +
    `<ul class="printable-list">
      <li>${workshopLink(base + exercise1.route, exercise1.heading)}
        <ul>${setLinks}</ul>
      </li>
      <li>${workshopLink(base + exercise2.route, exercise2.heading)}</li>
    </ul>`;
}

function formatBytes(bytes) {
  const exact = new Intl.NumberFormat('en-US').format(bytes);
  if (bytes < 1024) return `${exact} bytes`;
  const unit = bytes >= 1024 ** 2 ? 'MiB' : 'KiB';
  const scaled = bytes / (unit === 'MiB' ? 1024 ** 2 : 1024);
  return `${scaled.toFixed(2)} ${unit} (${exact} bytes)`;
}

function releaseAssetUrl(manifest, name) {
  return `${repository}/releases/download/${manifest.release}/${encodeURIComponent(name)}`;
}

function downloads(manifest) {
  return introduction('Downloads', '<p>All files are synthetic: generated by a program, not measured on any sample.</p>') +
    Object.entries(sections).map(([key, label]) => {
      const files = manifest.assets.filter(file => file.section === key);
      return `<section class="download-group" id="${key}"><h2>${label}</h2>
        <ul class="download-list">${files.map(file => `<li>
          <a href="${releaseAssetUrl(manifest, file.name)}">${escape(file.label)}</a>
          <span class="download-file">${escape(file.name)} · ${formatBytes(file.bytes)}</span>
          <code class="digest">SHA-256 ${file.sha256}</code>
        </li>`).join('\n')}</ul></section>`;
    }).join('\n');
}

function glossary(base, versions, pdf) {
  return introduction('Glossary') +
    `<a class="action" href="${base}glossary.pdf" download>Download glossary (PDF)</a>
      <p class="download-file">glossary.pdf · ${formatBytes(pdf.length)}</p>
      <code class="digest">SHA-256 ${createHash('sha256').update(pdf).digest('hex')}</code>` +
    article(versions);
}

function exercise(page, base, versions, sharedExercise1, manifest) {
  const printButton = '<button class="print-button" type="button" data-print-page hidden>Print this page</button>';
  const placeholder = '<p>Workshop instructions will be available here.</p>';
  if (page.set) {
    const parent = workshopLink(base + 'exercise-1/', 'Exercise 1: Find the error');
    const breadcrumb = `<p class="crumb screen-only">${parent}</p>
      <p class="print-only print-context">Exercise 1: Find the error</p>`;
    const setUrl = releaseAssetUrl(manifest, `Set_${page.set}.zip`);
    const referenceUrl = releaseAssetUrl(manifest, 'Reference.zip');
    return introduction(page.heading, '', breadcrumb) + setNavigation(base, manifest, page.set) +
      `<p class="exercise-actions screen-only">
        <a href="${setUrl}" download>Download Set ${page.set} (ZIP)</a>
        <a href="${referenceUrl}" download>Download Reference (ZIP)</a>
        ${printButton}
      </p>` + article(versions ?? sharedExercise1, placeholder);
  }
  const first = page.route === 'exercise-1/';
  const fileLink = workshopLink(base + `downloads/#${first ? 'exercise1' : 'exercise2'}`, 'Get the exercise files');
  return introduction(page.heading) + (first ? setNavigation(base, manifest) : '') +
    `<p class="exercise-actions screen-only">${fileLink}${printButton}</p>` + article(versions, placeholder);
}

function readManifest(text) {
  const manifest = JSON.parse(text);
  const counts = { exercise1: 6, exercise2: 2, test: 1 };
  const seen = new Set();
  if (!/^data-v\d+\.\d+(?:\.\d+)?$/.test(manifest.release) || manifest.assets.length !== 9) {
    throw new Error('Expected the data release tag and nine download files');
  }
  for (const file of manifest.assets) {
    if (!(file.section in counts) || --counts[file.section] < 0 ||
        !/^[A-Za-z0-9_-]+\.(zip|fcs)$/.test(file.name) || seen.has(file.name) ||
        !Number.isSafeInteger(file.bytes) || file.bytes < 1 ||
        !/^[a-f0-9]{64}$/.test(file.sha256) || !file.label) {
      throw new Error(`Invalid download metadata for ${file.name}`);
    }
    seen.add(file.name);
  }
  for (const name of ['Reference.zip', ...sets.map(set => `Set_${set}.zip`)]) {
    if (!manifest.assets.some(file => file.section === 'exercise1' && file.name === name)) {
      throw new Error(`Missing Exercise 1 archive: ${name}`);
    }
  }
  return manifest;
}

const source = resolveSources(process.argv.slice(2));
const manifest = readManifest(await readFile(join(root, 'downloads.json'), 'utf8'));
const pdf = await readFile(join(docs, 'glossary.pdf'));
const variants = new RegExp(['qc', 'doublets', 'livedead', 'batch', 'debris'].map(name => `no_${name}`).join('|'), 'i');
const sources = await Promise.all(pages.map(async page => {
  const incoming = source && page.source ? await optionalText(join(source, page.source)) : null;
  const text = incoming ?? (page.source ? await optionalText(join(contentFolder, page.source)) : null);
  return { page, incoming, text, versions: text ? versionedMarkdown(text, page.source) : null };
}));
const sharedExercise1 = sources.find(({ page }) => page.route === 'exercise-1/').versions;
const generated = sources.map(({ page, incoming, text, versions }) => {
  const base = '../'.repeat(page.route.split('/').length - 1);
  let main;
  if (!page.route) main = home(base, versions);
  else if (page.route === 'downloads/') main = downloads(manifest);
  else if (page.route === 'glossary/') main = glossary(base, versions, pdf);
  else if (page.route === 'printable/') main = printableVersions(base);
  else main = exercise(page, base, versions, sharedExercise1, manifest);
  const html = layout(page, base, main);
  if (page.route.startsWith('exercise-1/') && (variants.test(html) || variants.test(text ?? ''))) {
    throw new Error(`Exercise 1 discloses a data variant in ${page.source}`);
  }
  return { page, incoming, html };
});

if (source && !generated.some(item => item.incoming !== null)) {
  throw new Error(`No recognized Markdown files found in ${source}`);
}
for (const { page, incoming, html } of generated) {
  const file = join(docs, page.route, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  if (incoming !== null) {
    await mkdir(contentFolder, { recursive: true });
    await writeFile(join(contentFolder, page.source), incoming);
  }
  console.log(`docs/${page.route}index.html`);
}
