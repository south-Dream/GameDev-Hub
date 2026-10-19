const { categories, software } = catalog;
let category = 'all';
let query = '';
const categoryName = id => categories.find(item => item.id === id)?.name ?? id;
const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
function icon(value, fallback, className) {
  const node = element('span', className);
  if (/^https?:\/\//i.test(value) || value.startsWith('icons/')) {
    const image = element('img');
    image.src = value.startsWith('icons/') ? 'public/' + value : value;
    image.alt = '';
    image.loading = 'lazy';
    image.onerror = () => node.replaceChildren(document.createTextNode(fallback.slice(0, 1)));
    node.append(image);
  } else node.textContent = value;
  return node;
}
function link(label, url, className) {
  const node = element('a', className, label);
  node.href = url;
  node.target = '_blank';
  node.rel = 'noopener noreferrer';
  return node;
}
function button(label, onClick, className) {
  const node = element('button', className, label);
  node.onclick = onClick;
  return node;
}
function reset() {
  category = 'all'; query = '';
  document.querySelector('input').value = '';
  render();
}
function showDetails(item) {
  const dialog = document.querySelector('dialog');
  const top = element('div', 'dialog-top');
  const close = button('✕', () => dialog.close());
  close.setAttribute('aria-label', '关闭说明');
  top.append(icon(item.icon, item.name, 'avatar ' + (item.color ?? 'slate')), close);
  const actions = element('div', 'dialog-actions');
  actions.append(link('官方下载 ↗', item.url, 'download'));
  if (item.documentation) actions.append(link('官方文档 ↗', item.documentation, 'docs'));
  dialog.replaceChildren(top, element('small', 'dialog-category', categoryName(item.category)),
    element('h2', '', item.name), element('p', '', item.description),
    element('h3', '', '安装与使用说明'), element('p', '', item.instructions || '使用说明待补充，可先查看官方文档。'), actions);
  dialog.showModal();
}
function render() {
  const nav = document.querySelector('nav');
  const filters = document.querySelector('.filters');
  nav.replaceChildren(); filters.replaceChildren();
  for (const item of categories) {
    const choose = () => { category = item.id; render(); };
    const count = software.filter(s => item.id === 'all' || s.category === item.id).length;
    const entry = button('', choose, category === item.id ? 'active' : '');
    entry.setAttribute('aria-pressed', String(category === item.id));
    entry.append(icon(item.icon, item.name, 'nav-config-icon'), element('span', '', item.name), element('small', '', count));
    nav.append(entry);
    const filter = button(item.name, choose, category === item.id ? 'selected' : '');
    filter.setAttribute('aria-pressed', String(category === item.id));
    filters.append(filter);
  }
  const found = software.filter(item => (category === 'all' || item.category === category) &&
    [item.name, item.description, categoryName(item.category), ...(item.keywords ?? [])].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
  document.querySelector('.results').replaceChildren(
    element('span', '', query ? `“${query}” 的搜索结果` : category === 'all' ? '发现你的下一款好工具' : categoryName(category)),
    element('span', '', `${found.length} 款工具`));
  const listing = document.querySelector('#listing');
  if (!found.length) {
    const empty = element('div', 'empty');
    empty.append(element('h3', '', '暂时没有找到工具'), element('p', '', '试试其他关键词，或切换分类。'), button('查看全部工具', reset));
    listing.replaceChildren(empty);
    return;
  }
  const cards = element('div', 'cards');
  for (const item of found) {
    const card = element('article');
    const top = element('div', 'card-top');
    top.append(icon(item.icon, item.name, 'avatar ' + (item.color ?? 'slate')), element('span', 'badge', categoryName(item.category)));
    const actions = element('div', 'actions');
    actions.append(link('↓ 官方下载 ↗', item.url, 'download'));
    if (item.documentation) actions.append(link('▤ 文档 ↗', item.documentation, 'docs'));
    card.append(top, element('h3', '', item.name), element('p', 'description', item.description), button('查看说明 ›', () => showDetails(item), 'note'), actions);
    cards.append(card);
  }
  listing.replaceChildren(cards);
}
document.querySelector('input').addEventListener('input', event => { query = event.target.value; render(); });
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault(); document.querySelector('input').focus();
  }
});
document.querySelector('dialog').addEventListener('click', event => { if (event.target === event.currentTarget) event.currentTarget.close(); });
render();
