# Gitee

GitCode

## **Gitee 知识点总结**

Gitee（码云）是国内知名的 **Git 代码托管平台**，类似于 GitHub 和 GitLab，提供**Git 版本控制、团队协作、私有仓库、代码审查、CI/CD（Gitee Actions）、Wiki、Issue 管理**等功能。

------

## **1. Gitee 账户与仓库管理**

### **(1) 注册与登录**

- 访问 [Gitee 官网](https://gitee.com/)
- 支持 **邮箱注册、GitHub/微信/QQ 登录**

### **(2) 创建新仓库**

1. 进入 **Gitee 主页** → `代码` → `新建仓库`
2. 设置 **仓库名称、描述、权限（公开/私有）**
3. 选择是否初始化 **README、.gitignore、许可证**
4. 点击 `创建仓库`

### **(3) 克隆仓库**

```sh
git clone https://gitee.com/your-username/your-repo.git
```

或使用 SSH（需配置 SSH Key）：

```sh
git clone git@gitee.com:your-username/your-repo.git
```

------

## **2. Gitee Git 基本操作**

### **(1) 提交代码**

```sh
git add .
git commit -m "提交说明"
git push origin main
```

### **(2) 分支管理**

```sh
git checkout -b new-feature   # 创建新分支
git checkout main             # 切换回主分支
git merge new-feature         # 合并分支
git branch -d new-feature     # 删除本地分支
git push origin --delete new-feature  # 删除远程分支
```

------

## **3. Gitee Issues（任务 & Bug 追踪）**

### **(1) 创建 Issue**

1. 进入仓库 → `Issue` → `新建 Issue`
2. 填写 **标题、描述、标签（Labels）、指派处理人（Assignees）**
3. 提交后可在评论区跟踪进展

**自动关闭 Issue** 在 **提交信息（commit message）** 中添加：

```sh
git commit -m "Fix bug #5"
```

推送后，Gitee 会**自动关闭 Issue #5**。

------

## **4. Gitee Pull Requests（代码合并 & 代码审查）**

### **(1) 提交 Pull Request**

1. 创建新分支并修改代码

   ```sh
   git checkout -b feature-branch
   git add .
   git commit -m "新增功能"
   git push origin feature-branch
   ```

2. 进入 Gitee → `合并请求` → `新建合并请求`

3. 选择 `base`（主分支）和 `compare`（新分支）

4. 添加描述并提交 `创建合并请求`

5. 审核通过后点击 `合并`

------

## **5. Gitee Pages（静态网站托管）**

Gitee Pages 可用于**托管个人网站、博客、文档等**。

### **(1) 启用 Gitee Pages**

1. 进入仓库 → `服务` → `Gitee Pages`
2. 选择 `main` 分支（或 `gh-pages` 分支）
3. 点击 `启动`，生成 `https://your-username.gitee.io/your-repo/`

### **(2) 配合 Jekyll 自动生成博客**

在仓库根目录创建 `_config.yml`：

```yaml
title: 我的博客
description: 欢迎访问
theme: minima
```

然后 **Push 代码**，Gitee 会自动生成博客。

------

## **6. Gitee Actions（CI/CD 自动化）**

Gitee Actions 类似 GitHub Actions，支持**自动化测试、构建、部署**。

### **(1) 配置 Gitee Actions**

1. 进入仓库 → `服务` → `Gitee Go`
2. 新建 **工作流（workflow）**
3. 配置 YAML，如：

```yaml
name: 自动构建

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 克隆代码
        uses: actions/checkout@v2
      - name: 安装 Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 16
      - name: 安装依赖
        run: npm install
      - name: 运行测试
        run: npm test
```

1. 每次 `git push` 后，Gitee Actions 会**自动运行 CI/CD**。

------

## **7. Gitee Webhooks（自动触发构建）**

Gitee Webhooks 可在代码更新后**自动通知外部服务（如 Jenkins、Docker）**。

### **(1) 配置 Webhook**

1. 进入仓库 → `管理` → `WebHooks`
2. 填写 **目标 URL**（如 `http://your-server/webhook`）
3. 选择 **触发条件**（Push、PR、Release）
4. 点击 `添加 WebHook`

------

## **8. Gitee API（自动化管理）**

Gitee 提供 **REST API**，可用于自动化管理仓库、Issue 等。

### **(1) 获取所有仓库**

```sh
curl -H "Content-Type: application/json" \
     -H "Authorization: token YOUR_GITEE_TOKEN" \
     https://gitee.com/api/v5/user/repos
```

### **(2) 创建新 Issue**

```sh
curl -X POST -H "Authorization: token YOUR_GITEE_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"title": "Bug 报告", "body": "详细描述"}' \
     https://gitee.com/api/v5/repos/your-username/your-repo/issues
```

------

## **9. Gitee 私有仓库与企业版**

Gitee 支持 **私有仓库、企业版（Gitee Enterprise）**，适用于**企业内部开发管理**。

### **(1) 创建私有仓库**

1. 进入 `新建仓库`
2. 选择 `私有仓库`
3. 仅**授权成员**可访问和提交代码

### **(2) 企业 Git 代码托管**

Gitee 企业版（Gitee Enterprise）支持： ✅ **私有 Git 服务器** ✅ **团队协作 & 权限管理** ✅ **自动化 CI/CD** ✅ **代码质量管理**

------

## **10. Gitee 与 GitHub 互相同步**

### **(1) GitHub 推送到 Gitee**

使用 `git remote` 设置 **两个远程仓库**

```sh
git remote add github https://github.com/your-username/your-repo.git
git remote add gitee https://gitee.com/your-username/your-repo.git

git push github main
git push gitee main
```

### **(2) 使用 Gitee 的 GitHub 代码导入**

1. 进入 `新建仓库`
2. 选择 `从 GitHub 导入`
3. 填写 GitHub 地址，点击 `开始导入`

------

## **总结**

✅ **Gitee 是国内主流 Git 托管平台**
 ✅ **支持 Git 代码管理、Pull Requests、Issue、Wiki、Pages**
 ✅ **提供 CI/CD（Gitee Actions）、Webhooks、API 自动化管理**
 ✅ **适合团队协作、企业私有代码托管**
 ✅ **可同步 GitHub 代码**

如果你在 Gitee 具体操作上遇到问题，欢迎继续问我！🚀