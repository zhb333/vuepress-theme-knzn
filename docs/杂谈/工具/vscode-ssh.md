---
title: vscode插件remote-ssh配置
date: 2020-06-28 17:30:29
categories:
 - tool
tags:
 - vscode
---

## 一、安装 Remote-SSH 插件

- 在插件市场，找到 `Remote-SSH` 并安装
- 安装成功后，会在左侧功能区多出一个功能选项

## 二、Remote-SSH 配置

- 进入功能选项，点击 `configure`（小齿轮）
- 选择 `C:\Users\administrator\.ssh\config`
- 添加配置项
  - Host 连接的别名
  - User 登录远程服务的用户名
  - Hostname 远程 IP 地址， 填写自己的 IP 地址
  ```
  Host 腾讯云
  User root
  Hostname 192.168.1.1
  ```
- 添加完配置后，会在左侧连接列表中多出一个连接项
- 点击连接项右侧的 `Connect to Host in New Window` 会重新打开一个新的 vscode 进程
- 在新打开的 vscode 界面中，会有一个选择项，选择 `Linux`
- 接着需要输入云服务器的的密码，这样就可以连接上远程主机了
- 在左侧目录区，点击 `打开文件夹` 可以选择要使用 vscode 编辑的目录，但是还需要重新输入密码

## 三、免密登录

- 使用管理员身份打开 `PowerShell`
- 进入用户根目录
  ```shell
  cd ~
  ```
- `ssh-keygen` 生成本地私钥和公钥 , 一路回车即可

```shell
ssh-keygen -t rsa -b 4096
```

- 进入 .shh 目录
  ```shell
  cd .ssh
  ```
- 将公钥上传到远程服务器, 运行以下命令，并输入密码，注意 填写自己 IP 地址

```shell
scp .\id_rsa.pub root@118.24.109.123:/root/.ssh/pubkey
```

- 使用 `xshell` 或其它工具登录远程服务器，将`id_rsa.pub`公钥的内容, 追加到`authorized_keys`

```shell
cd /root/.ssh/
cat pubkey >> authorized_keys
rm -rf pubkey
```

这样，以后使用本机`vscode`的`Remote-SSH`插件连接该云服务器时，就不需要输入密码了！

## 四、使用 git 自带的 ssh

打开 cmd, 查看 ssh 版本

```shell
ssh -V
```
显示的版本为： `OpenSSH_for_Windows_7.7p1`

配置系统环境变量
将 `C:\Program Files\Git\usr\bin` 添加到环境变量，并置于 `C:\Windows\System32\OpenSSH\` 前面

重新打开 cmd 查看 ssh 版本, 修改后的版本为： `OpenSSH_8.0p1`
