# Github

Actions、Issues、Projects、Wiki

Github-Huaqiwill：https://github.com/huaqiwill

## **GitHub 知识点汇总**

GitHub 是全球最流行的**基于 Git 的代码托管平台**，提供**版本控制、协作开发、CI/CD、代码审查、Issue 追踪、Wiki 文档**等功能，并支持开源和私有项目。

------

## **1. GitHub 账户与仓库**

### **(1) 注册 GitHub**

👉 **[GitHub 官网](https://github.com/)**  注册账号。

### **(2) 创建新仓库**

1. 进入 **GitHub 主页** → `Repositories` → `New`
2. 设置 **仓库名称**、描述、是否公开（Public/Private）
3. 选择是否初始化 **README** 和 **.gitignore**
4. 点击 `Create repository`

### **(3) 克隆仓库**

```sh
git clone https://github.com/your-username/your-repo.git
```

或者使用 SSH（需配置 SSH Key）：

```sh
git clone git@github.com:your-username/your-repo.git
```

------

## **2. GitHub 基本 Git 操作**

### **(1) 提交代码**

```sh
git add .
git commit -m "提交信息"
git push origin main
```

### **(2) 分支管理**

```sh
git checkout -b feature-branch  # 创建新分支
git checkout main               # 切换到主分支
git merge feature-branch        # 合并分支
git branch -d feature-branch    # 删除本地分支
```

推送远程分支：

```sh
git push origin feature-branch
```

删除远程分支：

```sh
git push origin --delete feature-branch
```

------

## **3. GitHub Issues（Bug 跟踪）**

GitHub **Issues** 用于管理任务、Bug 追踪、讨论：

1. 进入仓库，点击 `Issues`
2. 点击 `New issue`
3. 填写标题、描述、标签（Labels）、分配人（Assignees）
4. 提交后可以在评论区跟踪进展

**自动关闭 Issue** 在 **提交信息（commit message）** 中添加：

```sh
git commit -m "修复 bug  #5"
```

推送后，GitHub 会**自动关闭 Issue #5**。

------

## **4. Pull Requests（代码合并 & 代码审查）**

### **(1) 提交 Pull Request**

1. 创建新分支并修改代码： 

   ```sh
   git checkout -b feature-branch
   git add .
   git commit -m "新增功能"
   git push origin feature-branch
   ```

2. 进入 GitHub → `Pull Requests` → `New Pull Request`

3. 选择 `base`（主分支）和 `compare`（新分支）

4. 添加描述并提交 `Create Pull Request`

5. 审核通过后点击 `Merge`

------

## **5. GitHub Actions（CI/CD 自动化）**

GitHub **Actions** 允许自动化测试、构建和部署。

### **(1) 创建 GitHub Actions**

在仓库 `.github/workflows/` 目录下创建 `ci.yml`：

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: 安装 Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 16
      - name: 安装依赖
        run: npm install
      - name: 运行测试
        run: npm test
```

每次 `git push` 或提交 PR 后，GitHub Actions 会**自动执行构建和测试**。

------

## **6. GitHub Pages（静态网站托管）**

GitHub Pages 可用于**托管个人网站、博客、文档等**。

### **(1) 启用 GitHub Pages**

1. 进入仓库 → `Settings`
2. 找到 `Pages` 选项
3. 选择 `main` 分支（或 `gh-pages` 分支）
4. GitHub 会生成一个 `https://your-username.github.io/your-repo/` 网址

### **(2) 使用 Jekyll 自动生成博客**

GitHub Pages **支持 Jekyll**，在仓库根目录创建 `_config.yml`：

```yaml
title: 我的博客
description: 欢迎访问
theme: minima
```

然后 **Push 代码**，GitHub 会自动生成博客。

------

## **7. GitHub Webhooks（自动触发构建）**

GitHub Webhooks 可在代码更新后**自动通知外部服务（如 Jenkins、Docker）**。

**配置 Webhook**

1. 进入 `Settings -> Webhooks`
2. 填写 **目标 URL**（如 `http://your-server/webhook`）
3. 选择 **触发条件**（Push、PR、Release）
4. 点击 `Add Webhook`

------

## **8. GitHub API（自动化操作）**

GitHub 提供 **REST API & GraphQL API**，可用于自动化管理仓库、Issue 等。

### **(1) 获取所有仓库**

```sh
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
     https://api.github.com/user/repos
```

### **(2) 创建新 Issue**

```sh
curl -X POST -H "Authorization: token YOUR_GITHUB_TOKEN" \
     -d '{"title": "Bug 报告", "body": "详细描述"}' \
     https://api.github.com/repos/your-username/your-repo/issues
```

------

## **9. GitHub Packages（私有包管理）**

GitHub Packages 允许**存储和分发 Docker、npm、Maven、PyPI 包**。

### **(1) 发布 npm 包**

1. 登录 npm： 

   ```sh
   npm login --registry=https://npm.pkg.github.com
   ```

2. 修改 

   ```
   package.json
   ```

   ： 

   ```json
   {
     "name": "@your-username/your-package",
     "repository": {
       "type": "git",
       "url": "https://github.com/your-username/your-repo.git"
     }
   }
   ```

3. 发布： 

   ```sh
   npm publish --registry=https://npm.pkg.github.com
   ```

------

## **10. 备份和迁移 GitHub**

### **(1) 备份 GitHub 仓库**

```sh
git clone --mirror https://github.com/your-username/your-repo.git
tar -czf your-repo-backup.tar.gz your-repo.git
```

### **(2) 迁移到 GitHub**

1. 进入 **GitHub**

2. 创建新仓库

3. 本地执行： 

   ```sh
   git remote add new-origin https://github.com/your-new-org/your-repo.git
   git push --mirror new-origin
   ```

------

## **总结**

✅ **GitHub 是全球最大的开源社区**
 ✅ **支持 Git 版本控制，适合团队协作**
 ✅ **提供 CI/CD（GitHub Actions）、静态网站（Pages）**
 ✅ **支持 API 操作、Webhooks 触发自动化任务**

你是想**使用 GitHub 进行代码托管**，还是**学习 CI/CD 或 GitHub API**？ 😊