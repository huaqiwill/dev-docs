# Git

教程和工具

* Git可视化工具 - 推荐：https://blog.csdn.net/qq_36075612/article/details/137636841

* 【Git】本地仓库强制覆盖远程仓库：https://blog.csdn.net/DovSnier/article/details/107156612

* CICD：https://zhengzhaoxiang.blog.csdn.net/article/details/143170557?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-143170557-blog-123813185.235%5Ev43%5Epc_blog_bottom_relevance_base1&depth_1-u

* DevOps：https://zhuanlan.zhihu.com/p/562036793

* Github-Huaqiwill：https://github.com/huaqiwill

* Git教程 - CSDN：https://blog.csdn.net/Javachichi/article/details/140660754

* Git删除本地和远程分支：https://blog.csdn.net/m0_69824302/article/details/137170659

* git提示warning LF will be replaced by CRLF的解决办法：https://blog.csdn.net/u012757419/article/details/105614028

* Git完整教程：https://zhuanlan.zhihu.com/p/30044692

* 获取Github中Star数的统计：https://star-history.com/#Byaidu/PDFMathTranslate&Date

* 基于 VScode 的 git 详细使用指南【保姆级！建议收藏！】：https://blog.csdn.net/weixin_48024605/article/details/136037857

* 开源工具包：https://gitcode.com/org/open-source-toolkit/repos

* 如何为开源做贡献？：https://www.freecodecamp.org/chinese/news/how-to-contribute-to-open-source-projects-beginners-guide/#:~:text=%E5%A6%82%E4%BD%95%E4%B8%BA%E5%BC%80%E6%BA%90%E5%81%9A%E8%B4%A1%E7%8C%AE%201%20%E4%BD%A0%E5%8F%AF%E4%BB%A5%E5%9C%A8%E9%A1%B9%E7%9B%AE%E6%96%87%E6%A1%A

* 鱼皮：Git & Github学习路线：https://github.com/liyupi/codefather/blob/main/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF/Git%26GitHub%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF%20by%20%E7%A8%8B%E5%BA%8F%E5%91%98%E9%B1%BC%E7%9A%AE.md





01.Git简介 - Git的定义、特点及工作原理

01_Git用一个分支完全替代另一个分支

## 知识点

Git教程详细规划

第一周：基础入门

1. Git简介
   - Git的定义、特点及工作原理。
2. 环境搭建
   - 安装Git并配置用户信息。
3. 第一个Git仓库
   - 创建和初始化Git仓库。
4. 基本操作
   - Git的常用命令（add、commit、status、log）。
5. 分支管理
   - 创建、切换、合并和删除分支。
6. 远程仓库
   - 连接远程仓库（GitHub/GitLab）。
7. 克隆与拉取
   - 克隆仓库与拉取远程更新。

第二周：进阶操作

1. 推送与拉取请求
   - 推送代码到远程仓库与创建拉取请求。
2. 标签与版本控制
   - 创建和管理标签。
3. 冲突解决
   - 处理合并冲突的技巧与步骤。
4. 变基与合并
   - 理解变基和合并的区别与用法。
5. Git工作流
   - 常见的Git工作流（Git Flow、GitHub Flow）。
6. 子模块管理
   - 使用Git子模块的场景与操作。
7. Git配置
   - 配置Git别名与常用设置。

第三周：实用技巧

1. 日志与回溯
   - 使用日志查看历史记录与回溯操作。
2. 撤销操作
   - 撤销修改、删除和提交的操作。
3. 安全性与加密
   - Git中的安全性考虑与加密配置。
4. Git hooks
   - 自定义Git钩子的使用场景与编写。
5. CI/CD与Git
   - Git在持续集成与持续交付中的应用。
6. Git常见问题
   - 解决常见的Git使用问题与技巧。
7. 项目实战
   - 使用Git管理一个完整项目的开发流程。

第四周：高级应用

1. Git与团队协作
   - 在团队中使用Git的最佳实践。
2. Git的高级功能
   - 学习Git的高级功能与命令。
3. 实战演练
   - 综合运用所学知识完成一个项目。
4. 总结与展望
   - 总结学习内容，展望Git的未来应用与发展。

学习与写作小贴士

- **实践为主**：每篇文章附上代码示例，并推荐读者在实际项目中应用。
- **互动与讨论**：鼓励读者在评论区提问与交流，增强学习氛围。



## Git用一个分支完全替换另外一个分支

```
git checkout master // 切换到旧的分支 
git reset --hard develop // 将本地的旧分支 master 重置成 develop 
git push origin master --force // 再推送到远程仓库
```

## Git环境安装与配置



Git安装



配置用户全局信息



## Git**远程拉取**

你可以使用以下命令获取所有远程分支的列表：

```
git branch -r
```

这将显示所有远程分支。如果你想要同时查看本地和远程分支，可以使用：

```
git branch -a
```

 切换到远程分支（例如，`remote-branch-name`） 

```
git checkout remote-branch-name
```

如果你希望在本地创建一个跟踪这个远程分支的本地分支，可以使用： 

```
git checkout -b local-branch-name origin/remote-branch-name
```

## Git创建和初始化仓库

```
git init
```





## Git回滚到之前某次提交（本地+远程）

**1、回滚到之前某一版本且该版本后的提交都不需要**

1）首先使用git log命令查看版本号(commit后就是版本号)

```
commit 91089df9cc4581d82d454a16fc15b8501d239128
```

2）`git reset --hard 版本号` 回滚到之前某版本，此时本地已经回滚，远程仓库还未回滚

3）`git push -f `回滚远程仓库版本

**2、回滚到之前某一版本但该版本后的提交仍需保留**

1）首先使用git log命令查看版本号(commit后就是版本号)

2）`git revert -n 版本号` 回滚到之前版本

3）` git commit "备注信息" `提交

4）`git push` 推送至远程仓库

**3、git commit但未push  把修改撤销到工作区中**

使用` git reset --soft HEAD^ `命令，撤销了commit 代码依然保留

## Git新建一个分支并上传

在 Git 中新建一个分支并上传到远程仓库的基本步骤如下：

**1. 新建并切换到新分支**

```bash
git checkout -b new-branch
```

这条命令会创建一个名为 `new-branch` 的新分支，并切换到该分支。

**2. 添加修改并提交代码**

```bash
git add .
git commit -m "初始化 new-branch 分支"
```

这里 `git add .` 会添加所有改动的文件，`git commit` 会提交改动并附加提交信息。

**3. 将新分支推送到远程仓库**

```bash
git push -u origin new-branch
```

`-u` 参数会将本地分支与远程 `origin/new-branch` 关联，之后可以直接使用 `git push` 推送。

**4. 远程查看分支**

如果要查看远程仓库的分支列表，可以运行：

```bash
git branch -r
```

**5. 切换回主分支（可选）**

如果需要切换回 `main` 或 `master` 分支：

```bash
git checkout main  # 或者 git checkout master
git pull  # 拉取最新代码
```

如果之后需要合并 `new-branch` 到 `main`：

```bash
git merge new-branch
git push origin main
```

这样你的新分支就成功创建并上传到远程仓库了 🚀





# Git常用命令

（add、commit、status、log）



| 概念                              | 说明                                          |
| --------------------------------- | --------------------------------------------- |
| **工作区（Working Directory）**   | 你在本地文件夹中的实际文件                    |
| **暂存区（Staging Area）**        | 通过 `git add` 暂存的更改                     |
| **本地仓库（Local Repository）**  | 通过 `git commit` 提交后的代码存储在本地      |
| **远程仓库（Remote Repository）** | 代码托管在 GitHub、Gitee、GitLab 等远程服务器 |
| **提交（Commit）**                | 把暂存区的文件保存到本地仓库                  |
| **分支（Branch）**                | 用于并行开发，不同分支可以独立修改代码        |
| **合并（Merge）**                 | 把不同分支的代码合并到一起                    |
| **标签（Tag）**                   | 给特定的提交打上标签，常用于版本发布          |



## Git文件管理

在 Git 中，管理文件（添加、删除）相关的常见命令如下：

1. **添加文件**

| 操作               | 命令            |
| ------------------ | --------------- |
| 添加单个文件       | `git add `      |
| 添加多个文件       | `git add   ...` |
| 添加所有更改的文件 | `git add .`     |
| 添加某个目录       | `git add `      |

示例：

```sh
git add index.html
git add src/
git add .
```

------

2. **删除文件**

| 操作                              | 命令               |
| --------------------------------- | ------------------ |
| 删除单个文件（从 Git 和本地删除） | `git rm `          |
| 删除多个文件                      | `git rm   ...`     |
| 删除某个目录（递归删除）          | `git rm -r `       |
| 仅从 Git 仓库删除（保留本地文件） | `git rm --cached ` |

示例：

```sh
git rm old_file.txt
git rm -r old_directory/
git rm --cached config.json  # 只从 Git 追踪中删除，保留本地文件
```

------

3. **提交更改**

添加或删除文件后，通常需要提交更改：

```sh
git commit -m "添加或删除文件的描述信息"
```

------

4. **撤销已 `git add` 的文件**

如果误 `git add` 了某个文件但尚未提交：

```sh
git restore --staged <file>
```

或：

```sh
git reset HEAD <file>
```

------

5. **查看文件状态**

```sh
git status
```

该命令可以查看哪些文件已被添加、删除或修改但尚未提交。

------

这些命令可以帮助你在 Git 中高效地管理文件！ 🚀

## Git分支管理

- 创建、切换、合并和删除分支

| 操作             | 命令                                   |
| ---------------- | -------------------------------------- |
| 查看当前分支     | `git branch`                           |
| 创建新分支       | `git branch `                          |
| 切换分支         | `git checkout ` 或 `git switch `       |
| 创建并切换分支   | `git checkout -b ` 或 `git switch -c ` |
| 合并分支         | `git merge `                           |
| 删除本地分支     | `git branch -d `                       |
| 强制删除本地分支 | `git branch -D `                       |





## Git仓库管理

* 本地仓库管理
* 远程仓库管理



克隆与拉取 - 克隆仓库与拉取远程更新

推送与拉取请求 - 推送代码到远程仓库与创建拉取请求



| 操作               | 命令                     |
| ------------------ | ------------------------ |
| 初始化 Git 仓库    | `git init`               |
| 克隆远程仓库       | `git clone `             |
| 添加远程仓库       | `git remote add origin ` |
| 查看远程仓库       | `git remote -v`          |
| 拉取远程最新代码   | `git pull origin `       |
| 推送代码到远程仓库 | `git push origin `       |
| 删除远程仓库       | `git remote remove `     |





## Git标签管理

标签与版本控制 - 创建和管理标签

冲突解决 - 处理合并冲突的技巧与步骤

变基与合并 - 理解变基和合并的区别与用法



| 操作                   | 命令                        |
| ---------------------- | --------------------------- |
| 创建轻量级标签         | `git tag `                  |
| 创建带信息的标签       | `git tag -a  -m "版本说明"` |
| 查看所有标签           | `git tag`                   |
| 查看指定标签的详细信息 | `git show `                 |
| 删除本地标签           | `git tag -d `               |
| 推送标签到远程仓库     | `git push origin `          |
| 删除远程标签           | `git push origin --delete ` |





# Git工作流

常见的Git工作流（Git Flow、GitHub Flow）

## 子模块管理 - 使用Git子模块的场景与操作

Git **子模块（Submodule）** 允许你在一个 Git 仓库中嵌套另一个 Git 仓库。这对于管理**共享组件**或**依赖代码**非常有用，比如：

- 你的项目依赖于一个外部开源库
- 你希望在多个项目中共享相同的代码库
- 你想要将一个大型项目拆分成多个子项目
- 

- **父仓库（主仓库）**：包含子模块的 Git 仓库。
- **子模块（Submodule）**：嵌套在父仓库中的独立 Git 仓库。

子模块不像普通文件那样存储在主仓库中，而是只存储一个**指向特定提交的引用**。这意味着：

- 子模块不会自动更新到最新版本，你需要手动拉取更新。
- 子模块是**独立的 Git 仓库**，可以单独提交、推送、拉取。



## Git配置 - 配置Git别名与常用设置



## 日志与回溯

使用日志查看历史记录与回溯操作

撤销操作 - 撤销修改、删除和提交的操作

**Git 日志与回溯操作总结**



**1. 查看日志**

| **命令**              | **作用**               |
| --------------------- | ---------------------- |
| `git log`             | 查看完整提交历史       |
| `git log --oneline`   | 以简洁格式显示提交历史 |
| `git log -- <文件名>` | 查看指定文件的提交历史 |
| `git log -p`          | 查看每次提交的具体改动 |
| `git show `           | 查看某个提交的详细信息 |



**2. 撤销修改**

| **场景**                                      | **命令**                   | **作用**                           |
| --------------------------------------------- | -------------------------- | ---------------------------------- |
| **撤销未提交的修改**                          | `git checkout -- <文件名>` | 撤销该文件的修改，回到上次提交状态 |
| **撤销所有未提交的修改**                      | `git checkout .`           | 撤销所有文件的修改                 |
| **撤销已 `git add` 的文件**                   | `git reset HEAD <文件名>`  | 取消 `git add`，但保留修改         |
| **撤销所有已 `git add` 但未 `commit` 的文件** | `git reset HEAD .`         | 取消所有 `git add`                 |



**3. 撤销提交**

| **场景**                           | **命令**                   | **作用**                          |
| ---------------------------------- | -------------------------- | --------------------------------- |
| **撤销最近一次提交（保留代码）**   | `git reset --soft HEAD~1`  | 撤销 `commit`，但代码保留在暂存区 |
| **撤销最近一次提交（回到工作区）** | `git reset --mixed HEAD~1` | 撤销 `commit`，代码回到工作区     |
| **撤销最近一次提交（彻底回滚）**   | `git reset --hard HEAD~1`  | 完全撤销 `commit`，丢失修改       |
| **撤销某个特定提交**               | `git revert `              | 生成一个新提交来撤销指定提交      |



**4. 回滚到指定版本**

| **场景**           | **命令**                       | **作用**                         |
| ------------------ | ------------------------------ | -------------------------------- |
| **回滚到指定提交** | `git reset --hard `            | 彻底回滚到某个提交，丢失后续更改 |
| **回滚后强制推送** | `git push origin main --force` | 强制覆盖远程仓库，谨慎使用       |



**5. 误 `push` 代码后撤销**

| **场景**                           | **命令**                                | **作用**                       |
| ---------------------------------- | --------------------------------------- | ------------------------------ |
| **撤销 `push` 但保留提交记录**     | `git revert `                           | 生成一个新提交撤销 `commit_id` |
| **撤销 `push` 并删除记录（危险）** | `git reset --hard  && git push --force` | **慎用**，强制覆盖远程仓库     |

如果你有更具体的 Git 需求，欢迎继续交流！😊





## 安全性与加密 - Git中的安全性考虑与加密配置



## Git hooks - 自定义Git钩子的使用场景与编写



## CI&CD与Git - Git在持续集成与持续交付中的应用





## 项目实战 - 使用Git管理一个完整项目的开发流程



## Git与团队协作

在团队中使用Git的最佳实践





## Git的高级功能 - 学习Git的高级功能与命令



## 开源项目获取Star数量

https://star-history.com/#Byaidu/PDFMathTranslate&Date



# Git常见问题

Git常见问题 - 解决常见的Git使用问题与技巧





## git branch -r查看不了所有远程分支



如果 `git branch -r` 不能查看所有远程分支，可能是由于以下几个原因：

1. **未更新远程引用**：运行以下命令以更新远程引用：

   ```bash
   git fetch --all
   ```

2. **权限问题**：确保你有权限访问远程仓库的所有分支。

3. **远程仓库配置**：确认远程仓库的配置是否正确。可以通过以下命令查看远程仓库：

   ```bash
   git remote -v
   ```

4. **分支过滤**：检查是否有任何分支过滤器在生效。查看你的 Git 配置，确认没有设置过滤器限制可见的远程分支。

尝试上述步骤后，再次运行 `git branch -r` 查看远程分支。





## Git配置代理

1. **配置 Git 代理**

Flutter 依赖 `git` 访问 GitHub，先确保 Git 也使用了代理：

**(1) 设置 HTTP/HTTPS 代理**

如果你的代理是 SOCKS5（如 Clash、V2Ray），你可以让 Git 走 HTTP 代理：

```
git config --global http.proxy http://127.0.0.1:3067
git config --global https.proxy http://127.0.0.1:3067
```

> 其中 `127.0.0.1:7890` 替换为你实际的 HTTP 代理端口。