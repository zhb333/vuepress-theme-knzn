---
title: linux安装git
date: 2019-01-28 17:30:20
categories:
 - tool
tags:
 - linux
 - git
---

## 一、下载最新的 `git` 版本

- 下载地址： https://github.com/git/git/releases
- 下载最新的 `tar.gz` 格式

## 二、将git压缩包上传到服务器

- 打开 `xshell`, 使用 `rz` 工具， 将压缩包上传到 `/usr` 
- 解压 `tar -zxvf git-2.29.0.tar.gz`
- 进入目录 
```shell
cd git-2.29.0
```

## 三、安装
- 安装所需依赖

```shell
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel gcc perl-ExtUtils-MakeMaker
```
- 移除旧版本的 git 
```shell
yum -y remove git
```
- 编译git源码 
```shell
make prefix=/usr/local/git all
```
- 安装git至/usr/local/git路径 
```shell
make prefix=/usr/local/git install
```
- 配置环境变量
```shell
vim /etc/profile
```
在底部添加
```txt
export PATH=$PATH:/usr/local/git/bin
```
- 刷新环境变量
```shell
source /etc/profile
```

- 查看git版本
```shell
git --version
```

## 四、git 配置

- 配置邮箱和用户名
```shell
git config --global user.name "your name"
git config --global user.email "your email"
```

- 生成公钥和私钥，用于ssh连接
```shell
ssh-keygen -t rsa -C "your email"
```

- 查看公钥

```shell
cat /root/.ssh/id_rsa.pub
```

- 将公钥复制到github
  - 访问 https://www.github.com
  - 点击头像 -> Settings -> SSH and GPG keys
  - 点击 New SSH key
  - 填写公钥名称，以及复制公钥

**完~**