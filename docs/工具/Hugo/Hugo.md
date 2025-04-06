## Hugo & Github 搭建个人博客教程

huaqiwill-blog：https://huaqiwill.github.io/huaqiwill-blog/

HugoMods官网：https://hugomods.com/

Hugo官网：https://gohugo.io/

Hugo中文文档：https://www.gohugo.org/

Hugo主题：https://themes.gohugo.io/

博客园  - api：https://api.cnblogs.com/Help

参考：https://icons.hugomods.com/zh-hans/docs/installation/

在Github上部署自己的简历：https://zhuanlan.zhihu.com/p/22250197

PHP从0到1搭建一款音乐网站、PHP从0搭建个人博客系统、01-系列内容设计、毕设_xx系统、博客_xx系统、



### 1、安装 Hugo

Hugo 是一个快速的静态网站生成器，您可以通过以下步骤在本地环境中安装 Hugo。

#### 安装方法

##### Windows

1. 下载 [Hugo for Windows](https://github.com/gohugoio/hugo/releases) 版本。
2. 解压缩下载的文件，将 `hugo.exe` 放到某个目录（例如：`C:\hugo\bin`）。
3. 将该目录添加到系统环境变量中。
4. 在命令行中输入 `hugo version`，确认 Hugo 是否安装成功。

##### macOS

可以通过 Homebrew 来安装 Hugo：

```bash
brew install hugo
```

##### Linux

在 Linux 上，您可以使用以下命令安装 Hugo：

```bash
sudo apt-get install hugo
```

或者通过下载 Hugo 的预编译二进制文件进行手动安装。

### 2、初始化站点

Hugo 安装完成后，您可以创建一个新的 Hugo 站点并启动本地开发服务器。

#### 创建站点

在命令行中，使用以下命令创建新的 Hugo 站点：

```bash
hugo new site <site_name>
```

将 `` 替换为您希望创建的博客站点名称。这个命令会在当前目录下创建一个新的文件夹，并包含 Hugo 所需的基本文件结构。

#### 启动开发服务器

进入到您刚才创建的站点目录：

```bash
cd <site_name>
```

然后通过以下命令启动 Hugo 开发服务器：

```bash
hugo server -D
```

- `-D` 参数表示包括草稿内容，便于调试和开发。
- 服务器启动后，打开浏览器访问 `http://localhost:1313`，即可看到 Hugo 默认的欢迎页面。

### 3、选择并安装主题

Hugo 提供了丰富的主题，您可以根据个人喜好选择一个合适的主题。下面是一个推荐的 Hugo 主题：

- [hugo-theme-stack](https://github.com/CaiJimmy/hugo-theme-stack)

#### 安装主题

1. 进入站点目录并下载主题：

```bash
git submodule add https://github.com/CaiJimmy/hugo-theme-stack.git themes/stack
```

1. 编辑 `config.toml` 文件，将主题设置为刚刚下载的主题：

```toml
theme = "stack"
```

### 4、配置站点

#### 配置基本信息

在 `config.toml` 文件中，您可以配置站点的基本信息。例如：

```toml
baseURL = "https://example.com"
languageCode = "en-us"
title = "我的个人博客"
theme = "stack"
```

#### 配置社交媒体链接

您可以在 `config.toml` 中添加社交媒体链接：

```toml
[[params.social]]
  name = "github"
  url = "https://github.com/your_username"
```

#### 配置菜单

在 `config.toml` 文件中，您可以配置站点的导航菜单：

```toml
[[menu.main]]
  name = "Home"
  url = "/"
  weight = 1

[[menu.main]]
  name = "About"
  url = "/about"
  weight = 2
```

### 5、创建文章

创建一篇新的文章，可以使用以下命令：

```bash
hugo new posts/my-first-post.md
```

该命令会在 `content/posts` 目录下创建一个新的 Markdown 文件。您可以编辑该文件来编写您的文章。

#### 示例文章内容：

```markdown
---
title: "我的第一篇博客文章"
date: 2025-01-19T10:00:00+08:00
draft: true
tags: ["个人", "博客"]
---

欢迎来到我的个人博客！这是我的第一篇文章，介绍我使用 Hugo 和 Github 搭建博客的过程。Hugo 是一个非常轻量级且快速的静态网站生成器，适合个人博客和文档网站的构建。

### 使用 Hugo 和 Github 搭建博客的步骤

1. **安装 Hugo**：我们需要先在本地安装 Hugo。
2. **初始化站点**：创建并启动 Hugo 站点。
3. **选择主题**：选择一个合适的主题来美化站点。
4. **配置站点**：在 `config.toml` 文件中配置站点信息。
5. **创建文章**：使用 Hugo 命令创建并编辑文章。
```

将 `draft: true` 改为 `draft: false` 后，文章会出现在网站上。

### 6、将站点发布到 Github

#### 创建 Github 仓库

1. 在 Github 上创建一个新的仓库。例如：`your-username.github.io`。
2. 获取该仓库的远程 URL。

#### 部署站点

1. 在 Hugo 站点根目录中，创建一个新的 Git 仓库：

```bash
git init
```

1. 添加远程仓库：

```bash
git remote add origin https://github.com/your-username/your-username.github.io.git
```

1. 构建 Hugo 站点：

```bash
hugo
```

1. 将生成的静态文件推送到 Github：

```bash
cd public
git add .
git commit -m "Initial commit"
git push -u origin master
```

### 7、使用 Github Pages 发布博客

将站点发布到 Github 后，您可以通过 `https://your-username.github.io` 访问您的个人博客。

### 8、其他配置与扩展

- **评论系统**：可以通过集成 Disqus 或 Gitalk 来为您的博客添加评论功能。
- **自定义插件**：Hugo 支持多种插件，您可以根据需要安装和配置。

### 结语

通过 Hugo 和 Github，您可以快速搭建一个高效且易于维护的个人博客。希望这篇文章能帮助您开始自己的博客之旅！