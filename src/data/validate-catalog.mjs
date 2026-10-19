const colors = ['slate', 'blue', 'orange', 'pink', 'indigo'];
function fail(message) { throw new Error(`配置表错误：${message}`); }
function text(value, field) {
  if (typeof value !== 'string' || !value.trim()) fail(`${field} 必须是非空文字`);
}
function url(value, field) {
  text(value, field);
  try { const parsed = new URL(value); if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error(); }
  catch { fail(`${field} 必须是完整的 http/https 网址`); }
}
function icon(value, field) {
  text(value, field);
  if (/^https?:\/\//i.test(value)) url(value, field);
  else if (value.startsWith('icons/')) {
    if (!/^icons\/[a-zA-Z0-9_./-]+\.(png|jpg|jpeg|webp|svg)$/i.test(value) || value.split('/').includes('..')) fail(`${field} 图片路径无效`);
  } else if (value.length > 12 || /[<>:/\\]/.test(value)) fail(`${field} 请填写简短文字、符号、https 图片网址或 icons/图片文件名`);
}
function records(items, filename) {
  if (!Array.isArray(items)) fail(`${filename} 顶层必须是数组`);
  const ids = new Set();
  for (const item of items) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) fail(`${filename} 每一项必须是对象`);
    text(item.id, `${filename}.id`);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(item.id)) fail(`${filename} 的 id 仅支持小写英文字母、数字和连字符`);
    if (ids.has(item.id)) fail(`${filename} 存在重复 id：${item.id}`);
    ids.add(item.id);
    text(item.name, `${item.id}.name`);
    icon(item.icon, `${item.id}.icon`);
  }
  return ids;
}
export function validateCatalog(categories, software) {
  const categoryIds = records(categories, 'categories.json');
  records(software, 'software.json');
  if (!categoryIds.has('all')) fail('categories.json 必须保留 id 为 all 的全部工具入口');
  for (const item of software) {
    if (item.category === 'all' || !categoryIds.has(item.category)) fail(`${item.id}.category 必须对应分类表中的具体分类 id`);
    url(item.url, `${item.id}.url`);
    if (item.documentation !== undefined && item.documentation !== '') url(item.documentation, `${item.id}.documentation`);
    text(item.description, `${item.id}.description`);
    if (item.instructions !== undefined && typeof item.instructions !== 'string') fail(`${item.id}.instructions 必须是文字`);
    if (item.color !== undefined && !colors.includes(item.color)) fail(`${item.id}.color 必须是 ${colors.join('、')} 之一`);
    if (item.keywords !== undefined && (!Array.isArray(item.keywords) || item.keywords.some(k => typeof k !== 'string'))) fail(`${item.id}.keywords 必须是文字数组`);
  }
}
