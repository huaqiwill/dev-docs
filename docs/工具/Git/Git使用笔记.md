[toc]

# 前言

原文链接：https://blog.csdn.net/weixin_43145427/article/details/123707371

基于 VScode 的 git 详细使用指南【保姆级！建议收藏！】：https://blog.csdn.net/weixin_48024605/article/details/136037857



参考：

Git版本控制管理工具

Github

Gitee

Git系统和理论的学习





Git需要了解的知识点

能够知道Github的作用
能够创建并配置Github账号
能够在Github中创建仓库并使用
能够知道分支的作用
能够创建分支与合并
能够操作远程分支



如何列出所有已合并到 master 的分支并删除



```bash
# 列出所有已合并到 master 的分支
$ git branch --merged master

# 删除所有已合并到 master 的分支
$ git branch --merged master | grep -v '^\*' | xargs git branch -d
```



git常见面试题总结

- [【Q099】git 如何查看某个文件的提交历史]()
- [【Q344】如何列出所有已合并到 master 的分支并删除]()
- [【Q414】git 如何添加与删除一个 submodule]()



Contents:[title: "【Q414】git 如何添加与删除一个 submodule | git高频面试题" description: "【Q414】git 如何添加与删除一个 submodule 字节跳动面试题、阿里腾讯面试题、美团小米面试题。"](about:blank#h-1)[git 如何添加与删除一个 submodule](about:blank#h-2)

------



git 如何添加与删除一个 submodule



**添加 submodule**

```bash
$ git submodule add :git-url dep
```

**删除 submodule**

- `vim .gitmodules`，找到该模块位置，删掉
- `vim .git/config`，找到该模块位置，删除
- `rm -rf .git/module/dep`
- `git rm --cached dep`



Contents:[title: "【Q099】git 如何查看某个文件的提交历史 | git高频面试题" description: "【Q099】git 如何查看某个文件的提交历史 字节跳动面试题、阿里腾讯面试题、美团小米面试题。"](about:blank#h-1)[git 如何查看某个文件的提交历史](about:blank#h-2)



git 如何查看某个文件的提交历史



```bash
git log -p file
```





# 1、Git安装

对于文本和代码项目，备份策略通常包括版本控制，或者叫“对变更进行追踪管理”。每个开发人员每天都会进行若干个变更。这些持续增长的变更，加在一起可以构成一个版本库，用于项目描述，团队沟通和产品管理。版本控制具有举足轻重的作用，只要定制好工作流，版本控制是最高效的组织管理方式。

Git是功能强大、灵活而且低开销的版本控制系统，由Linus Torvalds发明，他是 Linux 内核的创建者。Git支持分布式开发，能够胜任上千开发人员的规模，支持并且鼓励基于分支的开发，关键的是其完全免费。

## Ubuntu系统Git安装

Git 软件包被包含在 Ubuntu 默认的软件源仓库中，并且可以使用 apt 包管理工具安装。这是在 Ubuntu 上安装 Git 最便利，最简单的方式。可以从 Git 源码上编译安装最新的 Git 版本。

一、命令行安装 Git
安装非常直接，仅仅以 sudo 权限用户身份运行下面的命令：

```
sudo apt update
sudo apt install git
```



运行下面的命令，打印 Git 版本，验证安装过程：

```
git --version
```



在 Ubuntu 18.04 下 Git 当前可用版本是 2.17.1，如果你能看到版本信息，说明已经成功地在你的 Ubuntu 上安装 Git，之后可以开始使用它。

## 源码安装 Git

从源码安装 Git 的最大优势就是你可以编译最新的 Git 发行版，并且定制编译选项。开始安装依赖软件包，用来在你的 Ubuntu 系统上构建 Git：

```
sudo apt update
sudo apt install dh-autoreconf libcurl4-gnutls-dev libexpat1-dev make gettext libz-dev libssl-dev libghc-zlib-dev
```



下一步，打开你的浏览器，浏览 Github 上的 Git 项目镜像 并且 拷贝最新的 以.tar.gz结尾的发行版链接 URL。现在Git 最新稳定版本是2.35.1。

下面命令将会下载，并且解压 Git 源码到 /usr/src目录。这个目录通常被用来放置源代码。

```
wget -c https://github.com/git/git/archive/refs/tags/v2.35.1.tar.gz -O - | sudo tar -xz -C /usr/src
```



当下载完成时，切换源码目录，并且运行下面的命令来编译和安装 Git：

```
cd /usr/src/git-*
sudo make prefix=/usr/local all
sudo make prefix=/usr/local install
```



编译过程会花费几分钟。一旦完成，验证安装过程，运行：

```
git --version
```



git的编译有很多地方需要注意，所以如果不是特别强调版本，建议直接使用apt-get进行安装。

## Ubuntu系统Git卸载

1、为了确保完全卸载可以使用：

```
sudo apt-get remove git
```



2、查看是否删除成功

```
git --version
```





# 2、Git配置


在系统上安装好 Git后，还需要配置Git 环境。 每台计算机上只需要配置一次，程序升级时会保留配置信息，也可以在任何时候再次通过运行命令来修改它们。

## 配置文件位置

Git 自带一个 git config 的工具来帮助设置配置变量，这些变量存储在三个不同的位置：

* `/etc/gitconfig` 文件: 包含系统上每一个用户及他们仓库的通用配置。 如果在执行 git config 时带上 --system 选项，那么它就会读写该文件中的配置变量。（由于它是系统配置文件，需要管理员或超级用户权限来修改它，所以一般不对该文件配置。）

* `~/.gitconfig` 或 `~/.config/git/config` 文件：只针对当前用户。 可以传递 --global 选项让 Git 读写此文件，这会对当前用户在系统上所有的仓库生效。

* 当前仓库的 Git 目录中的 config 文件（即 .git/config），只针对该仓库。 你可以传递 --local 选项让 Git 强制读写此文件，虽然默认情况下用的就是它。（当然，你需要进入某个 Git 仓库中才能让该选项生效。）

所以三个git配置文件作用域是有所区别的，我们一般对第二和第三个配置文件进行配置。每一个级别会覆盖上一级别的配置，所以 .git/config 的配置变量会覆盖 /etc/gitconfig 中的配置变量。

## 配置用户信息

安装完 Git 之后，要做的第一件事就是设置你的用户名和邮件地址。 这一点很重要，因为每一个 Git 提交都会使用这些信息，它们会写入到你的每一次提交中，不可更改：

```
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

## 检查配置信息

Git配置好后，如果想要检查你的配置，可以使用 git config --list 命令来列出所有 Git 当时能找到的配置。

```
$ git config --list
user.name=John Doe
user.email=johndoe@example.com
color.status=auto
color.branch=auto
color.interactive=auto
color.diff=auto
...
```

 可以通过以下命令查看所有的详细配置以及它们所在的文件：

```
$ git config --list --show-origin
```

还可以通过输入 git config `<key>`来检查 Git 的某一项配置

```
$ git config user.name
```

John Doe

## 账号密码持久化

git在提交时每次都需要输入密码和账号信息，可以将账号和密码进行持久化存储，当git push的时候输入一次用户名和密码就会被记录，不需要每次输入，提高效率，进行一下配置：

```
git config --global credential.helper [mode]
```

这里的mode可以是`<cache>`，`<store>`和macos的`<osxkeychain>`以及windows的`<wincred>`值：

设置cache模式时，内置凭证系统把登录凭证信息保存在机器内存中一段时间，时间过后将被从内存中移除。一般是15分钟，可以在配置时添加参数去自定义--timeout 30000。

设置store模式后，内置凭证系统把登录凭证信息保留在硬盘中，并且只要不主动清除则会一直保留，没有失效时间，除非修改密码或主动取消该模式。不过该模式存在安全问题在于密码信息是用明文保存。

设置osxkeychain模式时，此模式下的凭证助手会对登录凭证信息进行加密处理并存储。该模式只能在Mac系统使用。

设置wincred模式时，该模式会对凭证信息处理放入到Windows凭据管理器中，但是还是可以获取用户信息。该模式只能在Windows操作系统中使用。

## 删除持久化密码

如何删除持久化存储呢，这时候就需要把以前记录过的信息都删掉。

1. 列出信息，查看持久化存储方式

```
git config --list | grep credential 
#显示
credential.helper=osxkeychain  # 第一种就是mac自带的钥匙串
#或者
credential.helper=store        # 第二种是文件存储地址在 ~/.git-credentials
```

2. 删除信息

第一种需要进入启动台->其他->钥匙串访问，搜索git相关删掉目标信息。

第二种需要通过vim修改~/.git-credentials文件，删除以下类似信息：

http://username:password@git.xxx.cn
https://xxxx:xxxx@github.com
或者统一用这种方法移除设置。

```
#移除设置
git config --global --unset credential.helper
```

# 3、项目阶段和文件分类

## Git环境

Git 可以分为本地(Local)和远程(Remote)两个环境，由于Git属于分布式的版本控制系统，所以开发者可以在离线环境下开发，等有网络信号时再将自己的代码推送(push)到远程或拉取(pull)其他开发者提交的代码到本地进行整合。

## Git项目的三个阶段

在本地环境中将项目又分为工作区(working directory)、暂存区(staging area)和版本库(local rep)。当自己进行开发时会在工作区进行工作，当需要进入版本库前需要将文件代码加入到暂存区，没有问题则确认(commit)到版本库中，最后推送(push)到远程环境。在 Git 中若是有和其他开发者一起合作，则会需要处理不同分支之间的冲突和合并等问题。

这会让我们的 Git 项目拥有三个阶段：工作区、暂存区以及版本库(项目下.git目录)。

* 工作区：工作区是对项目的某个版本独立提取出来的内容。 这些从 Git仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。就是你在电脑里能看到、进行操作的目录。

* 暂存区：英文叫 stage 或 index。暂存区是一个文件，保存了下次将要提交的文件列表信息，一般存放在 .git 目录下的 index 文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。

* 版本库：就是项目下的隐藏目录 .git，这个不算工作区，而是 Git 的版本库。Git 版本库是 Git 用来保存项目的元数据和对象数据库的地方。这是 Git 中最重要的部分，从其它计算机克隆仓库时，复制的就是这里的数据。

## Git文件的三种状态 

  因为Git项目的本地环境有三个区，所以项目中的Git文件对应有三种状态，项目中的文件可能处于其中之一：已修改(modified)、 已暂存(staged)和已提交(committed)。但是也有可能项目中的文件不属于这三种状态之一，这三种状态的文件只是为了和本地环境的三个阶段做一个对应，下面Git文件的三种分类才是一个完备的分类方法。

* 已修改：表示我们对文件进行了修改，但还没保存到本地版本库中。
* 已暂存：表示对一个已修改文件的当前版本做了标记，使之包含在下次提交到本地版本库的快照中。
* 已提交：表示数据已经安全地保存到了本地版本库中。

如果版本库(.git目录) 中保存着特定版本的文件，就属于 `已提交` 状态。 如果文件已修改并放入暂存区，就属于 `已暂存` 状态。 如果自上次检出后，作了修改但还没有添加到暂存区域，就是 `已修改` 状态。

## Git文件的三种分类 

Git将项目中所有文件分为3类：已追踪的(Tracked)、被忽略的(Ignored)和未追踪的(Untracked)。

* 已追踪的文件是指已经在版本库中的文件，或者是已经暂存到索引中的文件。如果想将新的文件newfile添加到为已追踪(Tracked)的文件，执行git add newfile命令即可。
* 被忽略的文件必须在版本库中被明确申明为不可见或被忽略，即使它可能会在你的工作目录中出现。一个软件项目通常会有很多倍忽略的文件：普通被忽略的文件包含临时文件、个人笔记、编译器输出文件以及构建项目过程中自动生成的大多数文件等等。Git维护一个默认忽略文件列表，也可以配置版本库来识别其它文件，比如可以通过.gitignore文件来继续配置。
* 未追踪的文件是指那些不在前两类中的文件。Git把工作目录下的所有文件当成一个集合，减去已追踪的文件和被忽略的文件，剩余部分最为未被追踪的文件(Untracked)。

# 4、Git版本控制管理：命令分类

帮助命令

首先可使用git help命令显示出git命令介绍，看大概分为哪几内容：

```
$ git help
使用：git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]
```

 其中的`<command>`是命令，主要分为五大块：

* 开始或创建工作区；
* 工作区的文件操作；
* 查看历史和状态；
* 分支和标签操作；
* 本地和远程合并推送。

这些是在各种情况下使用的通用Git命令：

```
start a working area (参见命令: git help tutorial)
   clone      将存储库克隆到新目录中
   init       创建一个空的Git存储库或重新初始化一个现有的存储库

work on the current change (参见命令: git help everyday)
   add        将文件内容添加到索引中
   mv         移动或重命名文件、目录或符号链接
   reset      将当前磁头重置为指定状态
   rm         从工作树和索引中删除文件

examine the history and state (参见命令: git help revisions)
   bisect     使用二分查找查找引入错误的提交
   grep       打印与模式匹配的行
   log        显示提交日志
   show       显示各种类型的对象
   status     显示工作树状态

grow, mark and tweak your common history
   branch     列出、创建或删除分支
   checkout   切换分支或还原工作树文件
   commit     记录对存储库的更改
   diff       显示提交、提交和工作树等之间的更改
   merge      将两个或多个开发历史连接在一起
   rebase     在另一个基本提示之上重新应用提交
   tag        创建、列表、删除或验证用GPG签名的标记对象

collaborate (参见命令: git help workflows)
   fetch      从另一个存储库下载对象和引用
   pull       从另一个存储库或本地分支获取并与之集成
   push       更新远程引用和相关对象
```

'git help -a' 和 'git help -g' 列出可用的子命令和一些概念指导。
命令'git help `<command>`' 或 'git help `<concept>`' 查看特定子命令或概念.

# 5、Git版本控制管理：常用命令


日常使用只要记住下面几组命令就可以了

## 一次完整提交：工作区到远程仓库

```
#工作区 -> 暂存区
$ git add <file/dir>
#暂存区 -> 本地仓库
$ git commit -m "some info"
#本地仓库 -> 远程仓库
$ git push origin master  # 本地master分支推送到远程origin仓库
```

## 一次完整拉取：远程仓库到工作区

```
#本地仓库 <- 远程仓库
$ git clone <git_url>        # 克隆远程仓库
$ git fetch upstream master  # 拉取远程代码到本地但不应用在当前分支
$ git pull upstream master   # 拉取远程代码到本地但应用在当前分支
$ git pull --rebase upstream master  # 如果平时使用rebase合并代码则加上

#工作区 <- 本地仓库
$ git reset <commit>          # 本地仓库覆盖到工作区(保存回退文件内容修改)
$ git reset --mixed <commit>  # 本地仓库覆盖到工作区(保存回退文件内容修改)
$ git reset --soft <commit>   # 本地仓库覆盖到工作区(保留修改并加到暂存区)
$ git reset --hard <commit>   # 本地仓库覆盖到工作区(不保留修改直接删除掉)

#工作区 <- 本地仓库或者分解为下面两个操作步骤
#暂存区 <- 本地仓库
$ git reset HEAD <file>   # 本地仓库文件内容覆盖暂存区文件内容

#工作区 <- 暂存区
$ git checkout -- <file>  # 暂存区文件内容覆盖工作区文件内容
```

# 六、Git版本控制管理：添加、删除和重命名文件



## git add

这个命令将暂存一个文件，前面写过，对于Git文件分类而言，如果一个文件是未追踪的，那么git add就会将文件的状态转化成已追踪的。如果git add作用于一个目录名，那么该目录下的文件和子目录都会递归暂存起来。运行命令，git status可以看到有哪些未追踪文件，接着运行git add把相应文件暂存：

```
$ git status # 查看未追踪文件
$ git add <filename> # 将文件添加暂存
```



在Git的对象模型方面，运行git add命令时，每个文件的全部内容都将复制到对象库中，并且按文件的SHA1名来索引。暂存一个文件也可以称作缓存一个文件，或者叫“把文件放进索引”。可以使用git ls-files命令查看隐藏在对象模型下面的东西，并且可以找到那些暂存文件的SHA1值：

```
$ git ls-files --stage
```



注意：在文件的任何编辑之后，提交变更之前，请执行git add命令，用最新版本的文件去更新索引。如果不这么做，将会得到两个不同版本的文件：一个是对象库里被捕捉并被索引引用的，另一个则在工作目录下。

## git rm

git rm命令是与git add相反的命令。由于删除文件比添加文件问题更多，所以操作会复杂一点。

该命令通过参数控制可以从索引或者同时从索引和工作目录中删除一个文件。从工作目录和索引中删除一个文件，并不会删除该文件在版本库中的历史记录。文件的任何版本，只要是提交到版本库的历史记录的一部分，就会留在对象库里并保存历史记录。

如果引进一个不应该暂存的“意外”文件，下面示例将其删除：

```
$ echo "some stuff" > oops
$ git add oops   # 添加文件到暂存区，如果不是暂存区文件不能用git rm命令
#将文件由已暂存转变为未暂存，会删除索引的文件并把文件保留在工作目录中而不删除
$ git rm --cached oops  
#下面这个命令是间文件从索引和工作目录中都删除
$ git rm oops 
#下面这个命令会强制来删除文件，即使上次提交后又修改了文件，还是会删除
$ git rm -f oops
```






如果不小心把工作目录下的文件删除了，可以通过版本控制回复文件的旧版本。

$ git checkout HEAD -- oops
git mv
 git mv命令可以对文件进行移动或者重命名文件。移动或者重命名文件实际上有两种方法，一种方法是先对文件使用git rm命令，然后用git add命令添加新文件，另一种方法是直接使用git mv命令

#方法一
$ mv oops newoops
$ git rm oops
$ git add newoops

#方法二
$ git mv oops newoops
无论哪种方法，都会在索引中删除oops的路径名，并添加newoops的路径名，而oops的原始内容则保留在对象库中，然后再将它与newoops重新关联。



# 七、Git版本控制管理：提交和查看提交历史



## Git 提交

git commit 提交命令将暂存区内容添加到本地仓库中，用来记录版本库的变更。Git会为任何有变换的文件创建新的blob对象，对有变化的目录创建新的树对象，对于未改动的文件和目录则会沿用之前的blob与树对象。版本库中的变更和提交是一一对应的关系：提交是将变更引入版本库的唯一方法，任何版本库中的变更都必须由一个提交引入。

提交暂存区到本地仓库中:

```
$ git add <file>  # 将文件存到暂存区
$ git commit -m [message]  # 将暂存区所有文件提交到版本库，[message] 可以是一些备注信息。
$ git commit [file1] [file2] ... -m [message]  # 将暂存区指定文件提交到版本库
```



如果没有设置 -m 选项，Git 会尝试为你打开一个编辑器以填写提交信息。 如果 Git 在你对它的配置中找不到相关信息，默认会打开 vim，然后在vim中添加提交信息。

如果觉得 git add 提交缓存的流程太过繁琐，Git 也允许用 -a 选项跳过这一步。命令格式如下：

```
$ git commit -a
```





#示例，对所有修改了的文件进行提交

```
$ git commit -am "修改文件"
```



## Git 查看提交历史

Git 提交历史一般常用两个命令：

git log - 查看历史提交记录。
git blame <file> - 以列表形式查看指定文件的历史修改记录。
git log
显示提交历史的主要命令是git log，这个命令有很多参数选项。一些常用命令如下：

$ git log             # 列出历史提交记录
$ git log --oneline   # 用online参数选项来查看历史记录的简洁的版本
$ git log --graph     # 查看历史中什么时候出现了分支、合并
$ git log --reverse   # 逆向显示所有日志
一些高级用法：

$ git log --author    # 查找指定用户的提交日志

#示例， Git 项目中 Hanscal 提交的部分

$ git log --author=Hanscal --oneline -5 


$ git log --since --before  # 指定日期，也可以用--until和--after

#示例， Git 项目中三周前且在四月十八日之后的所有提交

$ git log --oneline --before={3.weeks.ago} --after={2010-04-18} --no-merges
git blame
此命令可以显示一个文件中的每一行最后是谁修改的和哪次提交做出了变更，是以列表形式显示修改记录：

$ git blame <filename>

#示例

$ git blame README.md 
文章知识点与官方知识档案匹配，可进一步学习相关知识
Git技能树Git入门Git简介5633 人正在系统学习中

# 八、Git版本控制管理：查看、创建、选择、合并和删除分支


分支是在软件项目中启动一条单独的开发线的基本方法。分支是从一种统一的、原始的状态分类出来的，使开发人员能在多个方向上同时进行，并可能产生项目的不同版本。通常情况下，分支会被调解并与其他分支合并，来重聚不同的力量。

几乎每一种版本控制系统都以某种形式支持分支。使用分支意味着你可以从开发主线上分离开来，然后在不影响主线的同时继续工作。有人把 Git 的分支模型称为必杀技特性，而正是因为它，将 Git 从版本控制系统家族里区分出来。

## 列出分支

列出分支基本命令：

```
git branch  # 没有参数时，git branch 会列出你在本地的分支。
git branch -a # 把特性分支和远程分支都列出来
git branch -r # 列出远程追踪分支
```



## 创建分支

创建分支的基本命令如下： 

#命令基本形式

```
git branch <branchname> [starting-commit]
```



这条命令可以在给定的提交上创建一个命名的分支，如果没有指定starting-commit，就默认为当前的分支上的最近提交。换言之，默认是在现在工作的地方启动一个新的分支，新的分支是基于版本库中现有的提交。该命令只是创建了分支，并没有切换到该分支。

```
git branch prs/pr-1138   # 基于最近的提交创建分支
git branch prs/pr-1138 rel-2.3[SHA1]  # 基于该commit或者SHA1创建分支
```





## 切换分支

git checkout (branchname)  # 切换到已经创建了的分支
git checkout -b (branchname)  # 创建并切换到创建的分支
当你切换分支的时候，Git 会用该分支的最后提交的快照替换你的工作目录的内容， 所以多个分支不需要多个目录。

## 合并分支

```
git merge
```



你可以多次合并到统一分支， 也可以选择在合并之后直接删除被并入的分支。当你执行 git init 的时候，默认情况下 Git 就会为你创建 master 分支。下面示例将test分支合并到master分支：

```
git checkout master   # 先把分支切换到master
git merge test        # 将test分支合并到master
```



**合并冲突**

合并并不仅仅是简单的文件添加、移除的操作，Git 也会合并修改。当运行git merge命令，分支中出现冲突时，需要先找到冲突文件，解决冲突，然后先后执行`git add <filename>`, `git commit -m`''命令。

```
git merge test  # 将test分支进行合并

# 解决conflict <filename>

git add <filename>  # 将解决了冲突的filename添加到暂存区
git commit -m 'conflict resolve'  # 将修改文件提交到版本库
```





## 删除分支

删除分支命令：

git branch -d (branchname)

#删除test分支示例

git branch -d testing


# 九、Git版本控制管理：更改提交消息


具体来说，有两种修改方法，分别对应两种不同情况：

```
git commit --amend：修改最近一次 commit 的 message；
git rebase -i：修改某次 commit 的 message。
```



接下来，我们分别来说这两种方法。

## 修改最新提交信息

有时候，刚提交完一个 commit，但是发现 commit 的描述不符合规范或者需要纠正，这时候，可以通过 git commit --amend 命令来修改刚刚提交的信息。具体修改步骤如下：

1.查看当前分支的日志记录。

$ git log --oneline

2.更新最近一次提交的信息

$ git commit --amend     # 命令执行后会进入一个交互界面，在交互界面中，修改最近一次的信息后保存

3.查看提交信息是否更新

$ git log --oneline

## 修改某次提交信息

 如果想修改的信息不是最近一次的，可以通过 git rebase -i <父commit ID>命令来修改。这个命令在实际开发中使用频率比较高，一定要掌握。具体来说，使用它主要分为 4 步。

1.查看当前分支的日志记录。

$ git log --oneline

2.修改父commit id为<SHA1>的提交

$ git rebase -i <SHA1>  # 运行命令进入交互界面后，修改最近一次的提交信息，之后保存退出

3.查看提交信息是否被更新

$ git log --oneline
 注意：

这里一定要传入想要变更信息的父 commit ID：git rebase -i <父 commit ID>。
git commit --amend 只会变更最近一次的 commit ID，但是 git rebase -i 会变更父 commit ID 之后所有提交的 commit ID。
如果当前分支有未 commit 的代码，需要先执行 git stash 将工作状态进行暂存，当修改完成后再执行 git stash pop 恢复之前的工作状态。

## 修改多个提交消息

如果需要修改多个提交或旧提交的消息，可以使用git rebase命令，然后强制推送以更改提交历史记录。 

1.查看当前分支的日志记录。

```
$ git log --oneline
```



2.使用 git rebase -i HEAD~n 命令在默认文本编辑器中显示最近n个提交的列表

```
$ git rebase -i HEAD~3
```



3.在要更改的每个提交消息的前面，用 reword 替换 pick,保存并关闭提交列表文件。

4.接着依次弹出n个提交文件，输入入新的提交消息，保存文件，然后关闭它。

5.查看当前分支最新的日志记录

```
$ git log --oneline
```



6.将更改推送到GitHub，请使用git push -f命令强制推送旧提交。

```
$ git push -f origin master
```




# 十、Git版本控制管理：远程版本库基本命令


之前有关Git的系列介绍基本是在一个本地版本库中。远程版本库是一个引用或句柄，通过文件系统或网络指向另一个版本库。可以使用远程版本库作为简称，代替复杂的Git URL。一旦远程版本库建立，Git就可以使用推拉模式在版本库之间传输数据。git使用URL来定位远程版本库，支持多种url协议，常见的有http、https、git、ssh、file。下面有些关于远程版本库的基本命令：

从远程版本库抓取对象及其相关的元数据

## git fetch

与git fetch相似，但对修改的内容合并到相应的本地分支

```
git pull  # pull=fetch+merge
```



推送对象及其相关的元数据到远程版本库

## git push

显示一个给定的远程版本库的引用列表

```
git ls-remote   # 也可以列出远程库中的所有分支
```



## git clone 

clone命令可以把远程的代码库克隆到本地，并在.git/config目录中记录远程版本库的url

本地创建一个新的远程克隆版本库

git clone  # 每个新的克隆版本库都通过一个成为origin的远程版本库，建立链接指向其父版本库
注意：在config文件中有显示[remote “origin”]，其中origin是对url的一个别名，因为一个git库可能对应多个远程代码库，如果没有这个别名，每次都填写这个url会很麻烦，所以这个别名是必须的，而且clone的时候，别名默认为“origin”。



## git remote

该命令是一个专门的接口，特别使用与远程版本库，用来操纵配置文件数据和远程版本库的引用。

```
git remote -v # 显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL
git remote add <name> <url> # 添加别名为name的url，此时会看到.git/config文件变更,字符串name来代替整个 URL
git remote remove <name>   # 移除某个远程代码库,一旦使用这种方式删除了一个远程仓库，那么所有和这个远程仓库相关的远程跟踪分支以及配置信息也会一起被删除。
git remote rename <ole_name> <new_name> # 远程仓库的重命名
git remote show <name>  # 查看某个远程仓库,列出远程仓库的 URL 与跟踪分支的信息
git remote prune <name>  # 删除本地版本库中陈旧的远程追踪分支（被其他开发人员删除的远程分支）
git remote update [group]  #从远程版本库获得更新，一般可以与prune合用，如git remote update --prune remote
git remote set-url <name> <url> # 更新或更改远程版本库的URL
```



# 十一：Git版本控制管理：添加和删除远程分支


在本地分支上创建的任何新开发，在远程版本库中都是不可见的，除非进行推送更新。同样，在本地的版本库中删除一个分支仍然是一个本地变化，也不会从远程版本库中删除。

## 添加远程分支

1. 查看所有分支：

```
git branch -a
```



2. 创建本地分支（如果之前创建了，这步就不需要）：

```
git checkout -b dev   # 创建本地dev分支
```



3. 推送本地分支到远程版本库，并创建该分支

```
git push --set-upstream origin dev   # 把本地dev分支推送到远程,并在远程库中创建分支
```



4. 查看所有分支：

```
git branch -a
```



## 删除远程分支

1. 首先使用Git命令查看当前所有分支：

```
git branch -a
```



2. 接着删除本地分支：

```
git branch -d dev  # 以删除dev分支为示例
```



3. 然后删除远程仓库分支：

```
git push origin --delete dev # 以删除dev分支为示例
```

或者

```
git push origin :dev # 注意有冒号，推荐上面第一种方式
```



4. 最后查看分支是否删除：

```
git branch -a
```




# 十二：Git版本控制管理：新建仓库并推送远程仓库


如果本地有需要提交的版本库，并且要发布在远程版本库上，但是Git远程服务器(GitHub为例)上没有该仓库， 下一步就是在GitHub上创建一个版本库来接受提交，一般有以下步骤：

1. 先在github上或者你的服务器上创建一个仓库，以MyBlog项目为例

   注册github账号并登录，然后在个人页，单击New repository（新版本库）按钮创建仓库MyBlog

2. 在本地项目中使用 git init 把其变成git可以管理的仓库 

打开MyBlog项目文件夹，在文件目录下输入：
git init
就可以把此时的MyBlog项目变成git可以管理的仓库

3. 添加文件夹下所有文件到暂存区 

可以用命令 git add `<filename>`添加单个文件
也可以用命令 git add . 把文件夹下所有文件添加到缓存区（注意add和.之间有个空格）

4. 把文件提交到仓库 

使用命令行： git-commit -m “提交描述”

5. 关联远程仓库 **

使用命令行：git remote add origin <MyBlog远程仓库url地址>

6. 获取远程库与本地同步（远程仓库不为空需要这一步）

使用命令行：git pull --rebase origin master  # 注意远程库是main还是master分支

如果远程分支名与本地分支名不一致，需要对本地分支或远程分支重命名

```
git branc -M <oldbranch> <newbranch>  # 修改本地分支名与远程分支名一致，再使用命令
git pull --rebase origin <newbranch> 
```

7. 把本地内容推送到远程库

使用命令行：

```
git push -u origin master
```





# 第十三节：Git版本控制管理：选择性clone仓库项目子目录


有时在git clone的时候，只想clone自己想要的文件夹或目录。文件可以通过打开raw文件直接下载，而只clone目录似乎没有比较好的办法。Git1.7.0以后加入了Sparse Checkout模式，该模式可以实现Check Out指定文件或者文件夹。

现在有一个test仓库 ssh://git@github.com/mygithub/test.git

需要git clone里面的myproj/models子目录：

**方法一**

```
git init test && cd test     // 新建仓库并进入文件夹
git config core.sparsecheckout true // 设置允许克隆子目录
echo 'myproj/models' >> .git/info/sparse-checkout // 设置要克隆的仓库的相对根目录路径   //空格别漏
git remote add origin ssh://git@github.com/mygithub/test.git // 这里换成你要克隆的项目和库
git pull origin master    // 下载代码
```



如果只想保留最新的文件而不要历史版本的文件，上例最后一行可以用git pull --dpeth 1命令，即“浅克隆”：

```
$ git pull --depth 1 origin master 
```



**方法二**

step1：From GitURL to SVNURL
	点开”/models”子文件夹，复制浏览器中的地址，如下：

​	https:// github. com/mygithub/test/tree/master/models

​	将”/tree/”替换成”/trunk/”，则新生成的新链接为：

​	https:// github. com/mygithub/trunk/models

​	注意：这里根据分支的不同，通用的办法是将”/branches/branchname/”替换成”/trunk/”。

​	例如：”/tree/master/” to “/trunk/” ； “/tree/develop/” to “trunck”

step2：svn checkout your code

​	svn checkout SVNURL

​	这里的SVNURL就是step1中生成的url



**方法三**

如果觉得以上操作麻烦，可以直接进入这个网站：DownGit

 

# 第十四节：Git版本控制管理：仓库项目子模块


开发中经常会遇到这样的情况：项目越来越大，一些通用的模块我们希望将他抽离出来作为单独的项目，以便其他项目也可以使用，或者使用一些第三方库，可能我们并不想将代码直接拷贝进我们的项目里面，而仅仅只是单纯的引用。这时问题来了，你想把他们当做独立的项目，同时又想在项目中使用另一个。



假设搭建自己的个人博客，然后使用了某个主题，而博客中的主题常以独立项目的形式提供。如果直接将主题项目代码复制到博客项目中，不仅丢弃了主题项目的维护历史，同时你将再也无法自由及时地合并上游的更新。这时你就需要在个人博客项目中引用主题项目。

基于Git一般有两种方式来解决这个问题：Git Submodule，Git Subtree

## Git Submodule

Git Submodule允许你将一个Git仓库作为另一个Git仓库的子目录。它能让你将另一个仓库克隆到自己的项目中，同时还保持独立的提交。

### 添加子模块

将一个已存在的Git仓库添加为正在工作的仓库的子模块，可以使用git submodule add <repository> [<path>]命令。以MyBlog博客项目中添加Hanscal主题为例：

默认情况下，子模块会将子项目放在一个与仓库同名的目录中比如Hanscal目录下

我们也可以通过在命令结尾添加一个path来指定放到相对于项目根目录的其他地方，下面是相对根目录themes/Hanscal下。

$ git submodule add /private/tmp/remote/Hanscal.git themes/Hanscal
如果这时运行git status，你会注意到2件事情。

首先产生了新的.gitmodules文件。该文件保存了子模块的url与本地目录之间的映射，如果有多个子模块，该文件中就会有多条记录：

[submodule "themes/Hanscal"]
    path = themes/Hanscal
    url = /private/tmp/remote/Hanscal.git
虽然themes/Hanscal是工作目录中的一个子目录，但Git将它视作一个子模块。当不在那个目录中时，Git并不会跟踪其内容，而是将其看作该仓库中的一个特殊提交。

其次还有个隐藏的变化在.git/config中：

$ cat .git/config 
[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
    ignorecase = true
    precomposeunicode = true
[remote "origin"]
    url = /private/tmp/remote/MyBlog.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
    remote = origin
    merge = refs/heads/master
[submodule "themes/Hanscal"]
    url = /private/tmp/remote/Hanscal.git

父项目的.git/config文件中也保存了子模块的信息，所以你可以根据自己的需要，通过配置父项目.git/config文件来覆盖.gitmodules中的配置。如通过在本地执行git config submodule.themes/Hanscal.url <url>来覆盖.gitmodules中的url。

### 克隆子模块

当你克隆一个含有子模块的项目时，默认会包含该子模块目录，但其中还没有任何文件。

$ git clone /private/tmp/remote/MyBlog.git  # 该命令运行后主项目中不包含子模块
$ git submodule init          # 用来初始化本地配置文件
$ git submodule update        # 从该项目中抓取所有数据并检出父项目中列出的合适的提交，使themes/Ha处在和之前提交时相同的状态

还有一个简单方式，前面三个命令等同于下面这个命令

如果给git clone命令传递--recursive选项，它就会自动初始化并更新仓库中的每一个子模块。

$ git clone --recursive /private/tmp/remote/MyBlog.git

### 更新子模块

假如在当前开发中，父项目只是使用子项目并不时的获取更新。这时你可以进入到子模块目录中运行git fetch与git merge，合并上游分支来更新本地代码。

$ git fetch && git merge origin/master # 在子模块目录中手动抓取与合并

或者更简单的方式

$ git submodule update --remote  # Git将会进入子模块然后抓取并更新，此命令默认更新并检出所有子模块仓库的master分支。不过你也可以通过path(相对路径)指定想要更新的子模块、想要更新的分支以及更新后进行的操作。
这时运行git status，Git会显示子模块中有“新提交”，如果在此时提交，那么会将父项目锁定为子模块master分支最新的代码。假如你希望在父项目上编写代码的同时又在子模块上编写代码，那又该如何处理呢？

当我们运行git submodule update从子模块仓库中抓取修改时，Git将会获得这些改动并更新子目录中的文件，但是会将子仓库留在一个称作 “游离的 HEAD”的状态。这意味着没有本地工作分支（例如 “master”）跟踪改动。所以你做的任何改动都不会被跟踪。

一种方式进入每个必要的子模块并检出topic工作分支，使得子模块设置得更容易更新修改：

$ cd themes/Hanscal         # 进入子模块
$ git checkout -b featureA  # 检出子模块分支
然后，我们可以对子模块做些改动，使用git fetch或者git pull来更新代码，git merge或者git rebase合并改动，就像独立的项目开发一样。

另一种方式，也可以在父项目中使用git submodule update --remote --merge或者git submodule update --remote --rebase来合并代码。如：

$ git submodule update --remote --rebase   
如果你忘记--rebase或--merge，Git会将子模块更新为服务器上的状态。并且会将项目重置为一个游离的HEAD状态。即便这真的发生了也不要紧，你只需回到目录中再次检出你的分支（即还包含着你的工作的分支）然后手动地合并或变基对应的分支（或任何一个你想要的远程分支）就行了。如果你做了一些与上游改动冲突的改动，当运行更新时Git会让你知道，然后你可以进入子模块目录中然后就像平时那样修复冲突。

### 提交子模块

如果我们在父项目中提交并推送但并不推送子模块上的改动，其他尝试检出我们修改的人会遇到麻烦，因为他们无法得到依赖的子模块改动。那些改动只存在于我们本地的拷贝中。

提交子模块的改动最简单的选项是进入每一个子模块中然后手动推送到远程仓库。然而git push命令接受值为on-demand的--recurse-submodules参数，它会尝试为你这样做。

$ git push --recurse-submodules=on-demand   # 在父项目中运行该命令，会提交所有子模块更新

### 遍历子模块

如果父项目中包含大量子模块，那我们一些通用的子模块操作，如更新子模块，将会变成巨大的工作量。幸好，Git提供了foreach子模块命令。

假如，我们想要开始开发一个新的功能或者修复一些错误，并且需要在几个子模块内工作。这时我们可能需要创建一个新的分支，然后将所有子模块都切换过去。

$ git submodule foreach 'git checkout -b featureA'
子模块的问题
然而使用子模块还是有一些小问题：

在父项目中git pull并不会自动更新子模块，需要调用git submodule update来更新子模块信息。如果忘记调用git submodule update，那么你极有可能再次把旧的子模块依赖信息提交上去。
调用git submodule update并不会将子模块切换到任何分支，默认情况下子模块处于“游离的 HEAD”的状态。如果此时我们改动子模块而没有检出一个工作分支，那调用git submodule update时你所做的任何改动都会丢失。
Git子模块在父项目中维护所有依赖的子模块版本，当包含大量子模块时，父项目的更新将很容发生冲突，并且父项目的维护历史与所有子模块的维护历史相互交织，维护成本也会比较高。

## Git Subtree

该命令使用Git的subtree merge策略来得到类似git submodule的结果。但本质上，它是将子项目的代码全部merge进父项目。该命令不仅可以将其他项目合并为父项目的一个子目录，而且可以从父项目提取某个子目录的全部历史作为一个单独的项目。

相比Git Submodule

管理和更新流程比较方便
不再有.gitmodules文件
克隆仓库不再需要init和update等操作
删除时不再像git submodule那样费劲
添加子项目
将一个已存在的Git仓库以Subtree方式添加为子项目可以使用git subtree add --prefix=<prefix> <repository> <ref>命令，其中--prefix选项指定了子项目对应的子目录，--squash选项用以压缩Subtree的提交为一个，这样父项目的历史记录里就不会出现子项目完整的历史记录。我们还是以MyBlog添加Hanscal主题为例：

$ git clone /private/tmp/remote/MyBlog.git
$ cd MyBlog/
$ git subtree add --prefix=themes/Hanscal /private/tmp/remote/Hanscal.git master --squash 
更新子项目
一段时间之后，子项目可能有大量新的代码，父项目也想使用这些代码。此时父项目的维护者只需执行下面命令，就可以将父项目中子项目对应目录里的内容更新为子项目最新的代码了：

$ git subtree pull --prefix=themes/Hanscal /private/tmp/remote/Hanscal.git master --squash 
如果觉得每次都输入子项目完整的仓库url太麻烦，可以将子项目添加为追踪的仓库，然后再执行命令：

$ git remote add hanscal /private/tmp/remote/Hanscal.git
$ git subtree add --prefix=themes/Hanscal hanscal master --squash
提取子项目
当我们开发一个项目若干时间后，希望将某个目录单独出一个项目来开发，同时又保留这部分代码历史提交记录，使用git subtree split可以很轻松的完成这个操作。以MyBlog分离Hanscal主题为例：

$ git subtree split --prefix=themes/Hanscal --branch hanscal  # 将themes/Hanscal这个项目创建为分支hanscal，但没有切换到该分支
$ git branch -a    # 查看所有分支，出现hanscal分支
$ git checkout hanscal   # 切换到hanscal分支
$ git log            # 查看上述过程log信息
其中--branch指定将生成的历史提交记录保存到一个新的分支。

提交子项目
如果我们在使用子项目的过程中，对子项目做了一些改动，同时我们又希望子项目的其他使用者也能共享这些改动，此时可以将我们的改动提交到子项目的远程仓库中。

$ git subtree push --prefix=themes/Hanscal /private/tmp/remote/Hanscal.git master
文章知识点与官方知识档案匹配，可进一步学习相关知识
Git技能树首页概览5633 人正在系统学习中

# 第十五节：使用 git tag 给项目打标签

随着开发的深入，一些开发的规范也在慢慢落实。对项目的每个版本打上标签就是其中很重要的一项，下面说一下打标签的一些常规操作。

使用命令行提示
使用命令行提示查看 tag 相关命令行：

```
$ git tag -h
```

## 创建标签

通过 `git tag <tagname>`创建一个标签：

```
$ git tag v1.0.0  # 默认标签是打在最新提交的commit上的。
```



对特定的commit id对项目打标签

```
$ git tag v1.0.8 ba9f9e  # 如果想给历史commit 打上标签，只需在后面加上 commit id 即可。
```





## 上传标签

`git push` 并不会将 tag 推送到远程仓库服务器上，在创建完 tag 后我们需要手动推送 tag。

推送单个 tag：

```
$ git push origin v1.0.8
```

一次推送所有本地 tag：

```
$ git push origin --tags
```

## 查看标签

查看标签列表

```
$ git tag
```

查看最近n行信息

```
$ git tag -n3 # 这时候可以用查看最近3行的 tag 信息
```

列出相关标签 

```
$ git tag -l "v1.0*" # 查看 1.0.x 版本的tag，等同于 git tag --list
```

查看标签详细信息

```
$ git show v1.0.8  # 命令查看标签详细信息
```

## 删除标签

先删除本地仓库上的标签，然后更新到远程仓库

```
git tag -d <tagname> 删除本地仓库的标签
$ git tag -d v1.0.9   # 删除本地仓库的v1.0.9标签
```

然后用 `git push <remote> :refs/tags/<tagname>` 更新远程仓库：

```
$ git push origin :refs/tags/v1.0.9
```



或者先删除远程标签，然后同步到本地

```
$ git push origin --delete <tagname> 删除远程标签
$ git push origin --delete v1.0.7
```



## 将远程标签同步到本地

```
$ git fetch --prune --prune-tags    

```



注意： `git fetch --prune --prune-tags` 会强制同步远程 tag 到本地，所以会导致本地新建的未提交到远程服务器的 tag 也会被删除。
给标签添加信息
上文提到的创建标签属于创建轻量标签，可以在创建标签时通过-m <message>添加附加信息：

```
$ git tag v2.0.0 -m "version 2.0.0 released"  # 添加附加信息
$ git tag v2.0.0 -m "version 2.0.0 released" -m "rebuild with react hooks" -m "support typescript"    # 添加多行信息
```



如果想要编辑已有tag信息，除了删除这个tag重新打tag之外还可以用git tag <tagname> <tagname>^{} -f -m "<new message>" 修改 tag 信息：

```
$ git tag v1.0.0 v1.0.0^{} -f -m "first commit"
```



此时如果线上已经存在这个tag，修改后想将它推送到远程代码仓库需要加 -f 强制推送：

```
$ git push origin -f v1.0.0
```




# 第十六节：git远程分支强制覆盖本地分支

有时候同一个分支，远程仓库的和本地的都被修改的面目全非了，变得很不一致了。

如果想要把本地的替换成远程的，即用远程分支覆盖本地分支。

第一种方式: reset --hard 参数

```
git fetch --all
git reset --hard origin/dev (这里dev要修改为对应的分支名)
git pull origin dev
```

第二种方式：pull --force参数

有的时候，已经知道远程分支与本地分支有不同的commit，比如本地分支有一个临时的commit,远程分支并没有。是不能简单执行git pull的，会报错。
此时如果只是想放弃本地的临时提交，强制将远程仓库的代码覆盖到本地分支。就要用到--force参数，强制拉取功能，命令格式如下：

```
$ git pull --force  <远程主机名> <远程分支名>:<本地分支名>
```

示例：

```
$ git pull --force origin dev:dev
```



# 第十七节：github文件夹有白色箭头、文件夹不能打开的解决办法

一个架构系统的demo中，因为里面有几个子系统是clone别人的项目，导致github这个文件夹上显示白色箭头并且不能打开。

原来是因为这个文件夹里面有.git隐藏文件，github就将该文件夹视为一个子系统模块了。

解决办法就是：

1、删除文件夹里面的.git文件夹

2、执行git rm --cached [文件夹名]

3、执行git add [文件夹名]

4、执行git commit -m "msg"

5、执行git push origin [branch_name]





> git rm -r --cached .idea

