---
title: VMware15 和 centOS7的安装及配置
date: 2017-08-10 20:28:58
categories:
 - backEnd
tags:
 - linux
---

## VMware 的下载、安装、配置

### 下载 VMware

链接：https://pan.baidu.com/s/1kPGm7yeIG7eTGjPyJzZdaw 
提取码：degt 
复制这段内容后打开百度网盘手机App，操作更方便哦

### 安装及破解

- 安装过程很简单，根据提示进行安装即可  
- 安装完成，通过破解工具生成秘钥   
- VMware 帮助-> 注册 把秘钥粘贴进去即可

### Vmware 配置
1. VMware 的虚拟网络配置
  - VMware工具栏 -> 编辑 
  - -> 虚拟网络编辑器 
  - -> 更改设置 
  - -> 点击VMnet8,查看"子网IP"是否与本机的 ip 匹配
  - 如本机 ip 为 192.168.31.128 那么 VMnet8的子网 IP 应该为 192.168.31.0
2. VMnet8网卡配置 （远程连接和SSH）
  - 控制面板
  - 网络和Internet
  - 网络和共享中心
  - 更改适配器设置
  - 找到 VMnet8 网卡，右键属性
  - 在 “网络” 面板里，勾选 VMware Bridge Protocol
  - 双击 Internet 协议版本 4(TCP/IPv4)
  - 选择 “自动获得IP地址”
  - 选择 “自动获得 DNS 服务器地址”
  - 确定，回到 “网络” 面板
  - 点击 “共享”
  - 勾选 允许其他网路用户通过此计算机的 Internet 连接来连接


## centOS 的下载、安装、配置

### centOS下载  

国内，可以使用 阿里云镜像 或 网易镜像 下载 centOS系统镜像

 阿里云 centOS7 镜像地址：   
 `https://mirrors.aliyun.com/centOS/`  
找到自己想要版本进行下载即可


### 新建虚拟机

1. 创建新的虚拟机引导
  - 选择 “典型（推荐）”
  - 稍后安装操作系统
  - 客户机操作系统选择 “Linux”， 版本选择 "CentOS 7 64位"
  - 虚拟机名称填写，安装位置选择
  - 设置最大磁盘大小， 选择 “将虚拟磁盘拆分成多个文件”

2. 虚拟机设置
  - “内存”根据实际情况分配
  - “处理器” 根据实际情况分配
  - "CD/DVD(IDE)" 配置
    - 选择 “使用 ISO 映像文件”
    - “浏览” 找到下载好的 CentOS 镜像文件
  - “网络适配器”
    - “NAT 模式(N): 用于共享主机的IP地址”
  - "USB 控制器" 移除
  - “声卡” 移除
  - “打印机” 移除
  - “显示器” 默认

### 安装 CentOS
- 启动此虚拟机
- 上下方向键选择 “Install CentOS 7”
- 选择安装过程中的语言 "English" -> "Continue"
- "SOFTWARE SELECTION"
  - “Base Environment” 选择 “GNOME Desktop”
  - "Add-Ons for Selected Environment" 选择 “Development Tools”
  - "Done"
- "INSTALLATION DESTINATION"
  - 进去后点击 "Done" 即可
- “NETWORK & HOST NAME”
  - 开启 “Ethernet(en32)”
  - 点击 “configure”
    - 选择 “General”
    - 勾选 “Automatically connect to this network when it avaliable”
    - "save"
    - "Done"
- "Begin Installation"
- “ROOTPASSWORD”
  - 设置 root 账号的密码， 大于等于6位即可，没有规则
  - “Done”
- “USER CREATION”
  - 填写 “Full name” "User name" 
  - 勾选 “Make this user administrator”
  - 填写密码有规则，包含大写字符小写字符数字
  - “Done”
- 等待...
- "Reboot"
- "LICENSE INFORMATION"
  - 勾选 "I accept license agreement"
  - "Done"
- "FINISH CONFIGURATION"

## CentOS 配置

### 初始化设置
- 输入用户密码登录
- 选择系统语言 “English” -> Next
- 选择键盘风格 “English(US)” -> Next
- "Privacy" 默认 -> Next
- "Connect Your Online Accounts" 默认 -> Skip
- "Start Using CentOS Linux"

### 系统设置

1. 永不锁屏
- 点击 “Applications”
- "System Tools" -> “Settings”
- -> "Privacy"
- -> "Screen Lock" -> "Off"

2. 永不息屏
- 点击 “Applications”
- "System Tools" -> “Settings”
- -> "Power"
- -> "Blank screen" -> "Never"

3. 自动识别时区
- 点击 “Applications”
- "System Tools" -> “Settings”
- -> "Details"
- -> "Date & Time" 
- -> "Automatic Time Zone" -> "ON"

4. 免密登录
- 点击 “Applications”
- "System Tools" -> “Settings”
- -> "Details"
- -> "Users" 
- -> "Unlock"
- -> 输入用户密码
- -> "Authenticate"
- "Automatic Login" -> "ON"

5. 关机后，移除虚拟机设置中的 "CD/DVD(IDE)"

