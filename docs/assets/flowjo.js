(() => {
  const storageKey = 'lmu-flow-workshop-2026.flowjo';
  const versions = new Set(['v10', 'v11']);
  const revision = new URL(location.href).searchParams.get('rev');
  const picker = document.querySelector('[data-version-picker]');
  const content = document.querySelector('[data-version-content]');
  const defaultContent = content?.cloneNode(true);
  const v11Content = document.querySelector('template[data-version="v11"]');
  const printVersion = document.querySelector('[data-print-version]');
  const printButton = document.querySelector('[data-print-page]');
  let selected;

  function storedVersion() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function show(version) {
    if (content && v11Content && selected !== version) {
      const source = version === 'v11' ? v11Content.content : defaultContent;
      content.replaceChildren(...Array.from(source.childNodes, node => node.cloneNode(true)));
    }
    selected = version;
    picker.querySelector(`input[value="${version}"]`).checked = true;
    if (printVersion) printVersion.textContent = `FlowJo ${version}`;
    for (const link of document.querySelectorAll('a[data-workshop-page]')) {
      const target = new URL(link.href);
      target.searchParams.set('flowjo', version);
      if (revision) target.searchParams.set('rev', revision);
      link.href = target;
    }
  }

  function readVersion() {
    const fromUrl = new URL(location.href).searchParams.get('flowjo');
    const stored = storedVersion();
    return versions.has(fromUrl) ? fromUrl : versions.has(stored) ? stored : 'v10';
  }

  picker.addEventListener('change', event => {
    const version = event.target.value;
    if (!versions.has(version)) return;
    try {
      localStorage.setItem(storageKey, version);
    } catch {
      // The URL also carries the selection.
    }
    const url = new URL(location.href);
    url.searchParams.set('flowjo', version);
    history.replaceState(null, '', url);
    show(version);
  });
  if (printButton) {
    printButton.hidden = false;
    printButton.addEventListener('click', () => window.print());
  }
  function plainClick(event) {
    return !(event.defaultPrevented || event.button !== 0 ||
      event.ctrlKey || event.metaKey || event.shiftKey || event.altKey);
  }

  // Each file gets its own hidden frame, so the downloads survive opening the instructions
  // and are not stopped by a pop-up blocker.
  function downloadAll(urls) {
    urls.forEach((url, index) => {
      setTimeout(() => {
        const frame = document.createElement('iframe');
        frame.hidden = true;
        frame.src = url;
        document.body.append(frame);
        setTimeout(() => frame.remove(), 60000);
      }, index * 1000);
    });
  }

  for (const link of document.querySelectorAll('a[data-set-download]')) {
    link.addEventListener('click', event => {
      if (!plainClick(event)) return;
      const urls = link.dataset.setDownload.split(' ').filter(Boolean);
      event.preventDefault();
      downloadAll(urls);
      setTimeout(() => { location.href = link.href; }, urls.length * 1000 + 500);
    });
  }
  for (const link of document.querySelectorAll('a[data-download-both]')) {
    link.addEventListener('click', event => {
      if (!plainClick(event)) return;
      event.preventDefault();
      downloadAll(link.dataset.downloadBoth.split(' ').filter(Boolean));
    });
  }
  addEventListener('pageshow', () => show(readVersion()));
  show(readVersion());
})();
