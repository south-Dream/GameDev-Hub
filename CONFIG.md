# 修改软件与导航配置

只需要维护两份 UTF-8 编码的 JSON 文件，React 页面与离线预览使用相同的数据。

- `src/data/software.json`：软件卡片、下载、文档和说明。
- `src/data/categories.json`：左侧导航和顶部分类标签，顺序就是显示顺序。

## 软件配置

复制一条现有记录，修改内容。每项之间用逗号分隔，最后一项后不要加逗号。JSON 不支持注释。

```json
{
  "id": "my-tool",
  "name": "软件名称",
  "icon": "M",
  "color": "blue",
  "url": "https://example.com/download",
  "documentation": "https://example.com/docs",
  "description": "卡片上展示的一句话用途介绍。",
  "instructions": "第一步：下载安装包。\n第二步：按说明安装。",
  "category": "code",
  "keywords": ["搜索别名", "用途关键词"]
}
```

上面的 example.com 仅为格式示例，请替换成核实过的官方网址。

| 字段 | 含义 |
| --- | --- |
| `id` | 唯一标识，小写英文、数字或连字符，不要重复 |
| `name` | 软件名字 |
| `icon` | 简短文字、符号、http/https 图片网址，或 `icons/文件名.svg` 等本地图片路径 |
| `url` | 官方下载页或官网，完整 http/https 网址 |
| `documentation` | 官方文档网址；没有时可填空字符串或省略，页面自动隐藏文档按钮 |
| `description` | 卡片展示的简短介绍 |
| `instructions` | 弹窗说明，可用 `\n` 换行；可省略，页面显示待补充提示 |
| `category` | 对应分类配置中的 `id`，不能填写 `all` |
| `keywords` | 搜索关键词数组，可省略 |
| `color` | 图标底色，可选 `slate`、`blue`、`orange`、`pink`、`indigo`；省略为 `slate` |

图标图片建议放到 `public/icons/`，例如文件为 `public/icons/my-tool.svg` 时，填写 `"icon": "icons/my-tool.svg"`。图片加载失败会用软件名字的第一个字替代。

## 分类配置

在 `categories.json` 数组中添加一项：

```json
{ "id": "image-tools", "name": "图片工具", "icon": "图" }
```

然后把对应软件的 `category` 填为 `image-tools`。导航、分类筛选、分类名称和数量都会自动生成；调整数组顺序就能调整导航顺序。保留 `id` 为 `all` 的全部工具入口。删除分类前，先调整属于该分类的软件。

## 更新预览与线上网站

1. 修改 JSON 后运行 `npm run check:config` 检查格式、分类关系和本地图片。
2. 运行 `npm run dev` 查看 React 页面。开发时修改 JSON 会自动更新。
3. 不安装依赖也能运行 `node scripts/preview.mjs`，重新生成可双击查看的 `preview.html`。
4. 提交到 GitHub 的 `main` 分支，发布流程自动读取新配置并重新生成线上网站。

JSON 是公开的网站资料，不要放密码或令牌。修改本地配置后仍需要上传才能更新线上网页。无需数据库或管理后台。
