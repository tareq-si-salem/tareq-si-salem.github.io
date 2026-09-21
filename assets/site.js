(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  function labelTheme() { const dark = root.dataset.theme === 'dark'; toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`); toggle.setAttribute('aria-pressed', String(dark)); document.querySelector('meta[name="theme-color"]').content = dark ? '#111827' : '#f4f5fa'; }
  labelTheme();
  toggle.addEventListener('click', () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('theme',root.dataset.theme); } catch (_) {} labelTheme(); });
  const menu = document.getElementById('menu-toggle');
  const links = document.getElementById('nav-links');
  function setMenu(open) { links.classList.toggle('active',open); menu.setAttribute('aria-expanded',String(open)); menu.textContent = open ? 'Close' : 'Menu'; }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('click', event => { if (!event.target.closest('.navbar')) setMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
  links.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  window.matchMedia('(min-width:851px)').addEventListener('change', () => setMenu(false));
  // Hide the mobile navigation only after its controls have been initialized.
  root.classList.add('js');
  const search = document.getElementById('publication-query');
  if (search) {
    const cards = [...document.querySelectorAll('.pub-card')];
    const headings = [...document.querySelectorAll('.publication-heading')];
    const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const records = cards.map(card => ({card,text:norm(card.textContent)}));
    const groups = headings.map(heading => { const items=[]; let node=heading.nextElementSibling; while(node && !node.matches('.publication-heading')) { if(node.matches('.pub-card')) items.push(node); items.push(...node.querySelectorAll('.pub-card')); node=node.nextElementSibling; } return {heading,items}; });
    function filter() { const terms=norm(search.value).trim().split(/\s+/).filter(Boolean); let count=0; records.forEach(({card,text}) => { card.hidden=!terms.every(term=>text.includes(term)); if(!card.hidden) count++; }); groups.forEach(({heading,items})=>{heading.hidden=!items.some(card=>!card.hidden)}); document.getElementById('search-status').textContent=count ? `${count} publication${count===1?'':'s'}${terms.length?' found':''}` : 'No publications found. Try another title, author, venue, or year.'; }
    document.querySelector('.publication-search').hidden=false;
    search.addEventListener('input',filter);
    document.getElementById('clear-search').addEventListener('click',()=>{search.value='';filter();search.focus()});
    filter();
  }
  document.querySelectorAll('[data-year]').forEach(el=>{el.textContent=new Date().getFullYear()});
})();
