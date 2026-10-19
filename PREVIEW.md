# 轻量页面预览

直接双击 `preview.html` 即可离线查看效果，无需安装依赖。该文件通过 `node scripts/preview.mjs` 从软件数据与样式生成。

当前按简化后的需求制作：分类、搜索、软件卡片、官方链接和说明弹窗。没有个人状态，也没有网页添加功能。

启动：`npm install`，然后 `npm run dev`。

构建：`npm run build`。预览构建：`npm run preview`。

软件数据在 `src/data/software.json`，导航分类在 `src/data/categories.json`，每条记录共用同一套展示组件。`icon` 支持文字、符号和图片。详细字段说明见 `CONFIG.md`，发布步骤见 `DEPLOY.md`。

新增资料不需要数据库：在数据文件中增加记录并重新构建发布即可。网页上直接保存新增资料则需要另行选择存储方案，本次未实现。

原 README 保留作为最初的需求记录，当前预览不实现其中的收藏、安装状态和环境清单等功能。
