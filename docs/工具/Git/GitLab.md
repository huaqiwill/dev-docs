# GitLab

## **GitLab 知识点汇总**

GitLab 是一个**基于 Git 的 DevOps 平台**，提供 **代码仓库管理、CI/CD 持续集成、自动化部署、权限控制、代码审查、Issue 追踪** 等功能，适用于企业级开发。

------

## **1. GitLab 安装**

### **(1) 直接使用 GitLab 提供的 SaaS 服务**

👉 **[GitLab 官方网站](https://gitlab.com/)** 直接注册账号使用。

### **(2) 本地安装 GitLab**

GitLab 可部署在自己的服务器上：

```sh
sudo apt update && sudo apt install -y curl openssh-server ca-certificates
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash
sudo apt install gitlab-ee
```

然后**访问 `http://your-server-ip/`，设置管理员密码**。

------

## **2. GitLab 基本使用**

### **(1) 克隆仓库**

```sh
git clone https://gitlab.com/your-group/your-repo.git
```

或者使用 SSH：

```sh
git clone git@gitlab.com:your-group/your-repo.git
```

（SSH 需要提前 **添加 SSH Key**，在 `Settings -> SSH Keys` 里添加）

### **(2) 提交代码**

```sh
git add .
git commit -m "更新代码"
git push origin main
```

### **(3) 分支管理**

```sh
git checkout -b new-feature  # 创建新分支
git checkout main            # 切换到主分支
git merge new-feature        # 合并分支
git push origin new-feature  # 推送分支
git branch -d new-feature    # 删除本地分支
```

------

## **3. GitLab CI/CD（持续集成）**

GitLab 具有内置的 CI/CD，自动构建、测试和部署代码。

### **(1) GitLab CI/CD 配置**

在仓库根目录创建 `.gitlab-ci.yml`：

```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - echo "正在构建项目..."

test:
  stage: test
  script:
    - echo "运行测试..."

deploy:
  stage: deploy
  script:
    - echo "部署项目..."
```

然后每次 `git push` 后，GitLab CI/CD 就会自动执行这些任务。

### **(2) GitLab Runner（本地执行 CI/CD）**

安装 GitLab Runner 以在本地或服务器上执行 CI/CD：

```sh
sudo apt install gitlab-runner
gitlab-runner register
```

然后按照提示输入 GitLab 地址和 Runner Token。

------

## **4. GitLab 权限管理**

GitLab 有 **五级权限控制**：

| 角色       | 权限                             |
| ---------- | -------------------------------- |
| Guest      | 只能查看 Issue 和 Wiki           |
| Reporter   | 可以下载代码，提交 Issue         |
| Developer  | 可以 Push 代码，创建分支         |
| Maintainer | 可以管理 Merge Request、Pipeline |
| Owner      | 拥有最高权限，管理项目和成员     |

可以在 **`Settings -> Members`** 里管理团队成员。

------

## **5. GitLab Webhook（自动触发构建）**

GitLab 支持 Webhook，在代码更新后自动通知外部系统（如 Jenkins、Docker）。

**配置 Webhook**

1. 进入 `Settings -> Webhooks`
2. 填写 **目标 URL**（如 `http://your-server/webhook`）
3. 选择 **触发条件**（Push、Merge Request、Tag 等）
4. 点击 `Add Webhook`

------

## **6. GitLab Pages（托管静态网站）**

GitLab 可以**托管静态网站**（类似 GitHub Pages）。

### **(1) 配置 GitLab Pages**

在 `.gitlab-ci.yml` 里添加：

```yaml
pages:
  stage: deploy
  script:
    - mkdir public
    - echo "<h1>Hello GitLab Pages</h1>" > public/index.html
  artifacts:
    paths:
      - public
```

然后 **Push 代码**，访问 `https://yourusername.gitlab.io/your-repo/` 即可看到页面。

------

## **7. 备份和恢复 GitLab**

### **(1) 备份 GitLab**

```sh
sudo gitlab-backup create
```

备份文件存储在 `/var/opt/gitlab/backups/` 目录。

### **(2) 恢复 GitLab**

```sh
sudo gitlab-backup restore BACKUP=xxx_yyy
```

------

## **8. 高级功能**

### **(1) GitLab Docker 部署**

可以用 Docker 快速部署：

```sh
docker run --detach \
  --hostname gitlab.example.com \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  gitlab/gitlab-ee:latest
```

### **(2) GitLab 代码审查（Merge Request）**

GitLab 提供 **Merge Request (MR)** 进行代码审查：

1. **创建分支**：`git checkout -b feature-branch`
2. **开发并提交代码**：`git push origin feature-branch`
3. **在 GitLab 提交 Merge Request**
4. **Reviewer 审核代码后合并**

### **(3) GitLab API（自动化操作）**

GitLab 提供 **REST API** 进行自动化操作：

```sh
curl --header "Private-Token: your-token" "https://gitlab.com/api/v4/projects"
```

------

## **总结**

✅ **GitLab = Git + CI/CD + 权限管理 + DevOps**
 ✅ **适用于企业内部部署**
 ✅ **支持 Webhook、API、代码审查、Docker 部署**
 ✅ **适用于 DevOps 工作流（自动构建 & 部署）**

你是要**使用 GitLab 托管代码**，还是**搭建私有 GitLab 服务器**呢？ 😊