import test from 'node:test';
import assert from 'node:assert/strict';
import { categories, software } from './check-config.mjs';
import { validateCatalog } from '../src/data/validate-catalog.mjs';

test('新增分类和软件只需修改配置', () => {
  assert.doesNotThrow(() => validateCatalog(
    [...categories, { id: 'new-tools', name: '新工具', icon: 'N' }],
    [...software, { id: 'new-tool', name: '示例工具', icon: 'icons/example.svg', url: 'https://example.com', description: '示例说明', category: 'new-tools' }]
  ));
});
test('拒绝重复软件 id', () => {
  assert.throws(() => validateCatalog(categories, [...software, software[0]]), /重复 id/);
});
test('拒绝不存在的分类', () => {
  assert.throws(() => validateCatalog(categories, [{ ...software[0], category: 'missing' }]), /category/);
});
test('拒绝不可用的下载和文档协议', () => {
  for (const field of ['url', 'documentation']) {
    assert.throws(() => validateCatalog(categories, [{ ...software[0], [field]: 'javascript:alert(1)' }]), /http\/https/);
  }
});
test('文档、说明、关键词和颜色可以省略', () => {
  const { documentation, instructions, keywords, color, ...minimal } = software[0];
  assert.doesNotThrow(() => validateCatalog(categories, [minimal]));
});
test('保留全部入口，拒绝无效图标路径', () => {
  assert.throws(() => validateCatalog(categories.filter(c => c.id !== 'all'), software), /all/);
  assert.throws(() => validateCatalog(categories, [{ ...software[0], icon: 'icons/../secret.svg' }]), /图片路径/);
});
