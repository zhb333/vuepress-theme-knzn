---
title: Windows 下 Python 虚拟环境全解
date: 2018-08-10 14:10:28
categories:
 - backEnd
tags:
 - python
---

> 每个Python应用可能需要各自拥有一套“独立”的Python运行环境。虚拟环境 就是用来为一个应用创建一套“隔离”的 Python运行环境  

## virtualenv

### virtualenv 的基本用法

> A tool for creating isolated 'virtual' python environments.

查看是否已经安装过 virtualenv

```sh
pip list
```  

安装 virtualenv 

```sh
pip install virtualenv
```

使用 virtualenv 创建一个 Python 虚拟环境

```sh
# 创建使用系统默认Python 版本的虚拟环境
virtualenv myenv

# 创建指定 Python 版本的 虚拟环境
virtualenv -p C:\Python37\python.exe myenv

cd myenv

# 进入虚拟环境
# powershell 默认不允许执行未签名的脚本，为了能成功进入虚拟环境，请先执行：
# Set-ExecutionPolicy -Scope CurrentUser
# ExecutionPolicy: RemoteSigned
.\Scripts\activate

```

成功进入虚拟环境的标志是，在命令提示符前面显示 用括号包裹的 Python 虚拟环境名：**(myenv) PS D:\code\myenv**

查看虚拟环境下的pip安装包

```sh
pip list
```

可以看到只有 **pip** , **setuptools** , **wheel** 三个默认安装包

退出虚拟环境
```sh
# 在虚拟环境的任意目录下
deactivate
```

## virtualenvwrapper

> virtualenvwrapper 基于 virtualenv， 可以更方便的管理 Python 虚拟环境， 如果使用 virtualenvwrapper-win 作为 Python 虚拟环境的管理工具，完全可以不必安装 virtualenv

**需要注意的是， virtualenvwrapper 在 Windows 系统中 只能通过 cmd 才能正常使用**


安装 virtualenvwrapper

```sh
# 非Windows
# pip install virtualenvwrapper

# Windows
pip install virtualenvwrapper-win
```

创建并进入虚拟环境
```sh
mkvirtualenv myenv

# 指定 Python 版本创建 虚拟环境
mkvirtualenv --python=D:\\app\\python37\\python.ext myenv
```

通过以上命令创建的虚拟环境，会统一储存在 **C:\Users\Administrator\Envs\\** 

如果想更改虚拟环境储存的目录，需要设置一个 **WORKON_HOME** 的系统环境变量， 关于如何设置 Windows 环境变量，请找 [度娘](https://www.baidu.com "百度") 或 [谷哥](https://www.google.com.hk "谷歌")  

![WORKON_HOME](http://upload-images.jianshu.io/upload_images/12493822-c7037731f61af48a.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "WORKON_HOME")


进入虚拟环境
```sh
# 可以在任意目录，下切换虚拟环境
# 注意， 该命令在powershell 终端无效， 在 cmd 中才有效果
workon myenv
```

删除虚拟环境

```sh
rmvirtualenv myenv
```

查看所有虚拟环境

```sh
lsvirtualenv
```

进入当前虚拟环境所在的目录

```sh
cdvirtualenv
```


## Pycharm 与 virtualenvwrapper 的配合


**pycharm 本身集成了 virtualenv， 创建新项目时会要求生成虚拟环境， 只要把pycharm生成的虚拟环境安装到 virtualenvwrapper 的虚拟环境目录 ，那么 virtualenvwrapper 同样可以管理 Pycharm生成的是虚拟环境**  

![WORKON_HOME](http://upload-images.jianshu.io/upload_images/12493822-1fdaa9871675a5ed.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "WORKON_HOME")
