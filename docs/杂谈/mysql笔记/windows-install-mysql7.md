---
title: Windows 下 MySQL5.7.24的安装
date: 2018-08-10 23:20:48
categories:
 - backEnd
tags:
 - mysql
---

> MySQL是一种关系数据库管理系统，关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性  

## 下载MySQL5.7

点击 [MySQL5.7.24](https://dev.mysql.com/downloads/mysql/5.7.html#downloads "MySQL5.7.24") 的进入下载页面   

* 根据自己的操作系统选择对应版本

![版本选择](http://upload-images.jianshu.io/upload_images/12493822-40bf1818c9853640.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "MySQL版本选择") 

* 进入下载页面， 点击下面的 **No thanks, just start my download.** 不注册，直接下载  

![下载](http://upload-images.jianshu.io/upload_images/12493822-02db48bdca2bca7f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "MySQL下载")  

* 如果无法访问 **MySQL官网** 或者 下载龟速， 我这里提供了百度云的下载链接 [MySQL5.7.24](https://pan.baidu.com/s/18emOYA4e3bIvZPqT3k_AKw "MySQL5.7.24")  提取码为: _4guz_   

下载下来的文件为 **mysql-5.7.24-winx64.zip** 的压缩文件

* 解压，并将解压后的文件夹，放置到平常软件的安装目录下 如： **D:\app\mysql-5.7.24-winx64**

* 为 MySQL Server 配置环境变量  

![环境变量](http://upload-images.jianshu.io/upload_images/12493822-e3416620ba619dcb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "MySQL环境变量")  

![环境变量](http://upload-images.jianshu.io/upload_images/12493822-0a5dd53e21618fac.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "MySQL环境变量")  

* 注册 MySQL 服务

  * 创建**D:\app\mysql-5.7.24-winx64\my.ini**  

  ```
  [mysqld]
  character_set_server=utf8 #网上很多是default-character-set=utf8 ，容易出错
  port = 3306
  basedir=D:\\app\\mysql-5.7.24-winx64
  max_connections=200
  character-set-server=utf8
  default-storage-engine=INNODB
  [mysql]
  ```

  * **以管理员的身份运行cmd, 否则将安装mysqld 失败**

  * **cmd** 进入 **D:\app\mysql-5.7.24-winx64\bin** 执行 `mysqld -install`

  ```sh
  D:\app\mysql-5.7.24-winx64\bin>mysqld -install
  Service successfully installed.
  ```

  * 初始化，创建root账户

  ```sh
  mysqld --initialize --user=root --console
  ```

  ![mysql初始密码](http://upload-images.jianshu.io/upload_images/12493822-192b40f770b5dfb8.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "mysql初始密码")


* 启动服务
```sh
net start mysql
```

* 登录

```sh
D:\app\mysql-5.7.24-winx64\bin>mysql -u root -p
Enter password: ************ (nGhqPrFwd9?C)
```

* 修改密码

```sh
mysql> set password = password('123456');
```

* 退出

```sh
mysql> quit
```
