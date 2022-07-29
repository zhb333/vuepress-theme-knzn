---
title: Git 操作指南(一）
date: 2019-01-28 17:30:20
categories:
 - tool
tags:
 - git
---

## 一、git 的基本配置

- 配置用户信息

```shell
git config --global user.name 'your_name'
git config --global user.email 'your_email@domain.com'
```

config 的三个作用域

- `--local` 只对某个仓库有效
- `--global` 对当前用户所有仓库有效
- `--system` 对系统登录的所有用户有效

显示 config 的配置

- `git config --list` 系统三个作用域的所有配置信息
- `git config --list --local` 当前仓库的配置信息
- `git config --list --glocal` 当前用户的全局配置信息
- `git config --list --system` 系统登录的所有用户的配置信息

## 二、建 Git 仓库

- `git init` 把已有的项目代码纳入 Git 管理
- `git init <name>` 新建的项目直接用 Git 管理

## 三、 查看状态

`git status`

## 四、添加到暂存区

- `git add <file>...` 指定添加文件
- `git add .` 将工作区的修改全部添加到暂存区
- `git add -u` 将工作区被 git 管控的文件提交到暂存区

## 三、 提交版本记录

- `git commit -m '<message>'` 将暂存区的内容提交到版本记录
- `git commit -am '<message>'` 将工作区的内容直接提交到版本记录

## 三、理解工作目录、暂存区和版本记录

示意图：

![git_flow.jpg](https://upload-images.jianshu.io/upload_images/12493822-9cdc882237743986.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 四、 重命名的便捷方法

`git mv <file> <new file>`

## 五、 查看历史版本

- `git log` # 查看当前分支历史版本的详细信息
- `git log --oneline` # 单行模式查看
- `git log -n2` # 查看最近2个历史版本
- `git log -2` # 查看最近2个历史版本
- `git log -n2 --oneline` # 单行模式显示最近两个历史版本
- `git log --all --graph` # 图形化的结构查看历史版本
- `git log --all --online -n4 --graph` # 查看所有分支最近4条历史版本，并用图形化的结构显示
- `git help --web log` # 使用浏览器打开 git log 命令的使用手册

## 六、 图形界面

- `gitk` 打开当前分支的图形化管理工具
- `gitk --all` 打开所有分支的图形化管理工具

## 七、查看分支信息

- `git branch -v` # 查看本地的分支

## 八、新建和切换分支

- `git checkout <branch>` 切换分支
- `git checkout <new branch> <branch>` # 基于分支创建新分支, 实际上就是基于该分支的HEAD的版本号创建新分支
- `git checkout -b <branch name>` # 基于当前分支的HEAD创建分支
- `git checkout -b <branch name> <version>` # 基于版本号创建分支

## 九、 分离头指针

- `git checkout <version>` 再分离头指针状态下的修改和提交，切换到其它分支时都不会保留

## 十、.git 目录介绍

- `.git/objects/` 存放 `commit`,`tree`,`blob`的提交记录
- `.git/HEAD` 文件中保存着当前工作的分支
- `.git/config` 是 `git` 仓库的配置文件

- `.git/refs/` 文件夹保存中分支、标签的引用信息
  - `.git/refs/heads/` 保存所有分支的引用信息
  - `.git/refs/tags/` 保存所有标签的引用信息

## 十一、查看版本号的类型和内容

git 中版本号有三种类型

- commit 版本类型
- tree 一次版本提交的内容， 目录， 都对应 tree 类型
- blob 文件类型

- `git cat-file -t <version>` 查看版本号的类型
- `git cat-file -p <version>` 查看版本号的内容

## 十二、 头指针

关键字 `HEAD` 指向当前分支的最后一次提交记录的版本号

- `HEAD^`, `HEAD^1`, `HEAD~1` 指向头指针的上一次提交
- `HEAD^^`, `HEAD^1^1`, `HEAD~2` 指向头指针的前两次提交

## 十三、 删除分支

- `git branch -d <branch>` 删除分支命令
- `git branch -D <branch>` `-d` 参数没能删除成功时，要使用 `-D` 参数
