# 使用 GitHub 托管 Hugo 资源

Hugo 是一个快速、灵活的静态站点生成器，结合 GitHub，可以轻松实现站点的托管和自动化部署。本文将介绍如何使用 GitHub 托管 Hugo 生成的静态资源。

## 前置条件

1. 已安装 Hugo（[安装指南](https://gohugo.io/getting-started/installing/)）。
2. 已安装 Git 并配置好 GitHub 账户。
3. 已创建一个 Hugo 项目。

## 步骤

### 1. 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)。
2. 创建一个新的仓库，用于存储 Hugo 生成的静态资源。例如：`my-hugo-site`。
3. 初始化仓库时，可以选择添加 `.gitignore` 文件并选择 `Hugo` 模板。

### 2. 配置 Hugo 项目

在 Hugo 项目的根目录下，打开 `config.toml` 文件（或 `config.yaml`，根据你的配置文件格式），添加或修改以下内容：

```toml
baseURL = "https://<your-github-username>.github.io/<repository-name>/"
publishDir = "public"
```

将 `<your-github-username>` 替换为你的 GitHub 用户名，将 `<repository-name>` 替换为你的仓库名称。

### 3. 生成静态资源

运行以下命令生成静态资源：

```bash
hugo
```

生成的静态资源将存储在 `public` 文件夹中。

### 4. 推送到 GitHub

1. 将 `public` 文件夹初始化为一个 Git 仓库：

```bash
cd public
git init
git remote add origin https://github.com/<your-github-username>/<repository-name>.git
```

2. 提交并推送文件：

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

### 5. 配置 GitHub Pages

1. 打开 GitHub 仓库的设置页面。
2. 找到 **Pages** 部分。
3. 在 **Source** 下拉菜单中，选择 `main` 分支并保存。
4. GitHub 将自动部署你的站点，稍等片刻后，你可以通过 `https://<your-github-username>.github.io/<repository-name>/` 访问你的 Hugo 站点。

## 自动化部署（可选）

为了简化部署流程，可以使用 GitHub Actions 实现自动化部署。

1. 在项目根目录下创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy Hugo Site

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup Hugo
      uses: peaceiris/actions-hugo@v2
      with:
        hugo-version: 'latest'

    - name: Build
      run: hugo

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        personal_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
```

2. 提交并推送更改到 GitHub。

每次推送到 `main` 分支时，GitHub Actions 将自动构建并部署你的 Hugo 站点。

## 总结

通过以上步骤，你可以轻松地将 Hugo 站点托管到 GitHub 上，并通过 GitHub Pages 提供访问。结合 GitHub Actions，还可以实现自动化部署，进一步提升效率。