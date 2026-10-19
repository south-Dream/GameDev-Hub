import fs from 'node:fs';
import { validateCatalog } from '../src/data/validate-catalog.mjs';
export const categories = JSON.parse(fs.readFileSync(new URL('../src/data/categories.json', import.meta.url), 'utf8'));
export const software = JSON.parse(fs.readFileSync(new URL('../src/data/software.json', import.meta.url), 'utf8'));
validateCatalog(categories, software);
for (const item of [...categories, ...software]) {
  if (item.icon.startsWith('icons/') && !fs.existsSync(new URL('../public/' + item.icon, import.meta.url))) {
    throw new Error(`配置表错误：${item.id} 的图片 public/${item.icon} 不存在`);
  }
}
console.log(`配置检查通过：${categories.length} 个导航入口，${software.length} 款工具。`);
