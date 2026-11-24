(() => {
  const storageKey = 'lmu-flow-workshop-2026.flowjo';
  const versions = new Set(['v10', 'v11']);
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
  addEventListener('pageshow', () => show(readVersion()));
  show(readVersion());
})();
