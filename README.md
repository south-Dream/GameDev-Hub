# GameDev Hub

一个轻量的游戏开发工具导航网站，集中整理常用软件的官方下载入口、官方文档和安装使用说明。

**访问网站：[GameDev Hub](https://south-dream.github.io/GameDev-Hub/)**

## 功能

- 按游戏引擎、代码开发、图片与设计、音频与视频、效率工具等分类浏览。
- 按软件名称、用途和关键词即时搜索，支持 `Ctrl + K` 聚焦搜索框。
- 查看软件介绍和操作说明，在新标签页打开官方下载页与文档。
- 软件卡片、分类导航及数量由 JSON 配置生成。
- 支持桌面和手机浏览器，无需登录。

网站采用 React + TypeScript + Vite 构建，通过 GitHub Pages 发布。软件安装步骤会逐步补充，当前可先参考各软件的官方文档。

## 维护软件与分类

日常维护主要修改两份文件：

| 文件 | 内容 |
| --- | --- |
| [src/data/software.json](src/data/software.json) | 软件名称、图标、网址、文档、介绍、操作说明、分类和搜索关键词 |
| [src/data/categories.json](src/data/categories.json) | 分类导航的名称、图标和排列顺序 |

软件配置示例：

```json
{
  "id": "vscode",
  "name": "Visual Studio Code",
  "icon": "⌘",
  "color": "blue",
  "url": "https://code.visualstudio.com/download",
  "documentation": "https://code.visualstudio.com/docs",
  "description": "轻巧灵活的代码编辑器。",
  "instructions": "选择适合操作系统的安装包，安装与配置可参考官方文档。",
  "category": "code",
  "keywords": ["vscode", "编辑器", "编程"]
}
```

新增软件时，在软件数组中追加一条记录，并使用唯一的 `id`。`category` 对应分类表中的 `id`。图标支持简短文字、符号、图片网址或 `public/icons/` 下的图片。

新增分类时，在分类数组中追加记录，导航和筛选标签会自动生成。调整数组顺序即可调整展示顺序。

完整字段说明、图片配置和示例见 [配置维护指南](CONFIG.md)。配置提交到 `main` 分支后，GitHub Actions 会检查并重新发布网站，无需数据库。

## 本地开发

建议使用 Node.js 22 和 npm。

```sh
npm install
npm run dev
```

打开终端中显示的本地地址即可预览。

其他命令：

| 命令 | 用途 |
| --- | --- |
| `npm run check:config` | 检查 JSON 数据、分类关联和本地图片 |
| `npm test` | 运行配置校验测试 |
| `npm run build` | 检查配置、执行 TypeScript 检查并构建到 `dist/` |
| `npm run preview` | 本地预览构建结果 |
| `npm run preview:offline` | 重新生成可直接打开的 `preview.html` |

无需安装依赖也可以运行 `node scripts/preview.mjs`，生成离线预览。修改数据后，需要重新生成该文件。

## 项目结构

```text
.github/workflows/deploy.yml  GitHub Pages 自动发布
public/icons/                软件与分类图标
scripts/                     配置检查、测试与离线预览生成
src/
  components/                通用组件
  data/
    categories.json          分类导航配置
    software.json            软件资料配置
    catalog.ts               数据读取与类型定义
    validate-catalog.mjs     配置校验
  main.tsx                   页面与交互
  styles.css                 布局与样式
```

## 发布

仓库通过 [GitHub Actions](https://github.com/south-Dream/GameDev-Hub/actions) 构建并部署到 GitHub Pages。向 `main` 推送更新后会自动触发发布；只有检查和构建通过才会进入部署。

首次部署需在仓库 `Settings → Pages` 中将 `Source` 设置为 `GitHub Actions`。详细操作见 [部署指南](DEPLOY.md)。
