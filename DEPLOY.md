# 发布到 GitHub Pages

项目已经包含 `.github/workflows/deploy.yml`。推送到 `main` 后，会检查配置、构建 React 网站并发布 `dist`。

## 首次发布

1. 登录 GitHub，点击右上角 `+` → `New repository`。
2. 仓库名可用 `GameDev`，选择 `Public`。创建空仓库，不勾选自动添加 README。
3. 使用 GitHub Desktop 把当前项目作为本地仓库添加并发布到该仓库，或使用 Git 命令推送到 `main`。上传源码及 `.github/workflows/deploy.yml`，不要上传 `node_modules`、`.npm-cache` 或 `dist`。
4. 进入仓库 `Settings` → `Pages` → `Build and deployment`，把 `Source` 选择为 `GitHub Actions`。
5. 打开 `Actions` → `发布网站到 GitHub Pages`。如果之前因尚未开启 Pages 而失败，点击 `Re-run all jobs`；也可以通过 `Run workflow` 手动执行。
6. 等待构建、发布两个任务通过。`Settings` → `Pages` 和发布任务会显示网站网址，通常为 `https://用户名.github.io/GameDev/`。

GitHub Desktop 需要在用户自己的电脑上登录 GitHub。不要把访问令牌写进配置文件或发到聊天中。

当前 `vite.config.ts` 使用相对资源路径 `base: './'`，适用于这个单页网站在仓库子目录和根域名部署，本地图片也使用相对路径。不需要为每个仓库手动改代码。

## 后续更新

只修改 `src/data/software.json` 或 `src/data/categories.json`，提交并推送到 `main` 即可自动重新发布。如果配置不合法，构建会失败并显示具体原因，之前成功发布的网站继续保留。

## 本地检查

需要 Node.js 20.19+ 或 22，建议 Node.js 22。

```powershell
npm install
npm test
npm run build
npm run preview
```

没有 lockfile 时，工作流使用 `npm install`。在能联网的环境首次安装成功后，建议同时提交生成的 `package-lock.json`，再把工作流安装命令改为 `npm ci --no-audit --no-fund` 固定依赖版本。

GitHub 官方设置说明：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
