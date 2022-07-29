---
title: NodeJS最优环境之 nvm、 npm、 nrm 安装
date: 2019-05-27 10:36:22
categories:
 - frontEnd
tags:
 - nodejs 
---

## 一、nvm的安装和使用  

> `nvm`全称 **Node Version Manager** 是 `Nodejs` 版本管理器，它让我们能方便的对 `Nodejs` 的版 本进行切换。 `nvm` 的官方版本只支持 `Linux` 和 `Mac`。 `Windows` 用户，可以用 `nvm-windows`

### 1、卸载已安装到全局的 `node`/`npm`  

如果之前是在官网下载的 `node` 安装包，运行后会自动安装在全局目录，其中`node` 命令`/usr/local/bin/node` ，`npm` 命令在全局 node_modules 目录中，具体路径为`/usr/local/lib/node_modules/npm`

**安装 nvm 之前先删除下已安装的 `node`**

**`windows` 使用 `git-bash` 执行以下命令**

* 查看已经安装在全局的模块

```bash
npm ls -g --depth=0 
```

* 可以使用 `360软件管家` 进行卸载

* 以防卸载有残留，手动删除安装目录
```bash
rm -rf /usr/local/bin/node

rm -rf /usr/local/lib/node_modules/
```

* 删除全局 node 模块注册的软链
```bash
cd  /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm 
```

### 2、安装 

* 下载 `nvm` 包 地址：[nvm-windows下载](https://github.com/coreybutler/nvm-windows/releases)，我们选择第一个：`nvm-noinstall.zip` 下载完成后解压到一个地方，比如: `d:\app\nvm` 里面的文件列表是这样的：`elevate.cmd`、`elevate.vbs`、`install.cmd`、`LICENSE`、`nvm.exe`

* 双击 `install.cmd` , 直接回车，成功后，会在`D`盘的根目录生成一个 `settings.txt` 的文本文件，把这个文件剪切到 `d:\app\nvm` 目录中，然后我们把它的内容修改成这样：

```txt
  root: D:\app\nvm
  path: D:\app\nodejs 
  arch: 64 
  proxy: none 
  node_mirror: http://npm.taobao.org/mirrors/node/ 
  npm_mirror: https://npm.taobao.org/mirrors/npm/
```

* 配置环境变量，刚刚点击了`install.cmd`的文件，会在环境变量的系统变量中，生成两个环境变量：`NVM_HOME` 和 `NVM_SYMLINK` 修改这两个变量名的变量值：`NVM_HOME`的变量值为：`D:\app\nvm`,  `NVM_SYMLINK`的变量值为：`D:\app\nodejs`

* 如果在Path中有 `D:\app\nvm` ; 或者是 `D:\app\nodejs` ，把他们删掉。 在Path中添加： `%NVM_HOME%`、 `%NVM_SYMLINK%`

* 打开一个cmd窗口输入命令：`nvm v` ，可以看到当前`nvm`的版本信息。然后我们可以安装`nodejs`了

* 继续输入命令：nvm install latest 如果网络畅通，我们会看到正在下载的提示，下载完成后 会让你use那个最新的node版本。

* 使用 `nvm` 下载 `node.js`, 会生成 `d:\app\nodejs` 目录，以后下载的 `nodejs` 都会在这个文件中

* 同样的咱们可以下载其他版本的nodejs，这样通过命令:nvm use 版本号 比如：nvm use 5.11.0就可以轻松实现版本切换了。

**备注： 如果你的电脑系统是32 位的，那么在下载nodejs版本的时候，一定要指明 32 如： nvm install 5.11.0 32 这样在32位的电脑系统中，才可以使用，默认是64位的。**

### 3、nvm常用命令

```bash
nvm install ## 安装指定版本，可模糊安装，如：安装v6.2.0，既可nvm install v6.2.0，又可nvm install 6.2

nvm uninstall ## 删除已安装的指定版本，语法与install类似

nvm use ## 切换使用指定的版本node

nvm ls ## 列出所有安装的版本

nvm ls-remote ## 列出所以远程服务器的版本（官方node version list）

nvm current ## 显示当前的版本

nvm alias ## 给不同的版本号添加别名

nvm unalias ## 删除已定义的别名

nvm reinstall-packages ## 在当前版本node环境下，重新全局安装指定版本号的npm包
```


## 二、npm的安装和使用

*  配置npm的全局安装路径  
  ```bash
  npm config set prefix "d:\app\nvm\npm"
  ```
  在用户文件夹下会生成一个`.npmrc`的文件
  ```txt
  prefix=D:\app\nvm\npm
  ```

* 安装 `npm`

  ```bash
  npm install npm -g
  ```

* 配置 `npm` 环境变量

  **`NPM_HOME`, 变量值为 ：`d:\app\nvm\npm`**  
  以后安装的全局 `npm` 包，都会在这个文件夹中  

  **`%NPM_HOME%` 一定要添加在 `%NVM_SYMLINK%` 之前**

* 此时我们使用的就是我们统一下载的npm包了

## 三、nrm 的安装和使用
> `nrm`(npm registry manager) 是 `npm` 的镜像源管理工具，有时候国外资源太慢，那么我们可以用这个来切换镜像源。

* 首先全局安装 nrm：
  ```bash
  npm install -g nrm
  ```

* 查看可以使用的镜像源
  ```bash
  nrm ls
  ```
  会发现列出了下面几个源：

  `npm ---- https://registry.npmjs.org/`  
  `cnpm --- http://r.cnpmjs.org/ ` 
  `taobao - https://registry.npm.taobao.org/`  
  `nj ----- https://registry.nodejitsu.com/`  
  `rednpm - http://registry.mirror.cqupt.edu.cn/`  
  `npmMirror  https://skimdb.npmjs.com/registry/`  
  `edunpm - http://registry.enpmjs.org/`  

* 个人经验，`cnpm` 的镜像源最快
  ```bash
  nrm use cnpm
  ```
