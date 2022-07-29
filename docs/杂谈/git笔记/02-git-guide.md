---
title: Git 操作指南(二）
date: 2019-01-31 12:32:20
categories:
 - tool
tags:
 - git
---

## 一、 比较暂存区和HEAD的文件差异

`git diff --cached`

## 二、 比较工作区和暂存区的文件差异

`git diff`

指定文件进行差异对比

`git diff -- <file>...`

## 三、撤销暂存区的所有提交并恢复到工作区

`git reset HEAD`

## 四、让暂存区的提交恢复到工作区

`git checkout -- <file>...`

## 五、撤销暂存区的提交

- `git restore --staged <file>...`

- `git reset HEAD <file>...`

## 六、撤销工作区的修改

`git restore <file>...`

## 七、撤销最近的几次提交

`git reset --hard <hashId>` 将头指针移到指定的 commit

## 八、不同提交的指定文件的对比

- `git diff <branch> <other branch>` 比较两个分支所有文件的差异
- `git diff <branch> <other branch> -- <file>...` 比较两个分支指定文件的差异
- `git diff <commit ID> <other commit ID> -- <file>...` 比较两个不同提交指定文件的差异

## 九、使用 git 删除文件

`git rm <file>...`

## 十、临时处理其它任务的情况

`git stash` 存放当前状态
`git stash list` 查看存放的状态
`git status` 查看工作区和暂存区的状态，执行了上面的命令后，此刻是干净的
`git stash apply` 干完其它事情后，恢复到之前存放的状态, 但不删除stash 堆栈中的记录
`git stash list` 还能看到之前存放的记录
`git reset --hard HEAD` 将工作区和暂存区清空
`git stash pop` 恢复到之前存放的状态, 并删除stash 堆栈中的记录
`git stash list` 现在看不到之前保存的记录了

## 十一、创建仓库与备份

- `git clone --bare </path/to/repo.git>` 基于哑协议创建仓库
- `git clone --bare <file:///path/to/repo.git>` 基于智能协议创建仓库

- `git remote add <repo name> <url>` 添加远程仓库 url 格式根据传输协议进行配置
- `git push --set-upstream <repo name> <branch>` 将本地仓库备份到远程仓库

## 十二、修改最新的提交信息

`git commit --amend`

## 十三、修改老旧的 commit 的提交信息

- `git rebase -i <parent version>`, 在交互界面使用 `reword` 关键字进行指定操作

## 十四、 把连续多个 commit 集成为一个 commit

- `git rebase -i <parent version>`, 在交互界面使用 `squash` 关键字进行指定操作

## 十五、把间隔的几个 commit 合成一个 commit

- `git rebase -i <parent version>`, 在交互界面, 将间隔的几个commit移动到一起， 使用 `squash` 关键字进行指定操作
- `git rebase --continue` 间隔的几个 commit 合并在指定操作后, 需要接着运行这条命令继续进行合并

