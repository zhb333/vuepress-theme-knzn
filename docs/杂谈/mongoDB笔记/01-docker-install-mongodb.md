---
title: 使用 docker 搭建 MongoDB 服务
date: 2019-09-08 21:33:39
categories:
 - backEnd
tags:
 - mongoDB
---

## 一、 拉取 `MongoDB` 官方 `docker` 镜像

```sh
docker pull mongo:4
```

查看下载的镜像

```sh
docker image ls
# or
docker images
```

执行结果：

```sh
[root@localhost ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mongo               4                   409c3f937574        13 days ago         493MB
mongo-express       latest              323f84fbaf9b        5 weeks ago         130MB
registry            2                   2d4f4b5309b1        2 months ago        26.2MB
```

## 二、启动 `MongoDB` 服务器容器

```sh
docker run --name mongo4 -v /mongodb/data:/data/db -d mongo:4
```

- `--name` 指定 `docker` 容器的名字为 `mongo4`
- `-v` 将本地 `/mongodb/data` 挂载到容器环境的 `/data/db`(即`MongoDB保存数据的位置`)
- `-d` 后台运行 `docker` 进程

查看 `docker` 容器状态

```sh
docker ps
# or
docker container ls
```

执行结果：

```sh
[root@localhost ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
ebd63a30b9ce        mongo:4             "docker-entrypoint.s…"   9 seconds ago       Up 7 seconds        27017/tcp                mongo4
```

## 三、`mongo-express` 网页版的 `MongoDB` 数据库管理系统

拉取 `mongo-express` 镜像

```sh
docker pull mongo-express
```

运行 `mongo-express`

```sh
docker run --link mongo4:mongo -p 8081:8081 mongo-express
```

- `--link` 连接到 `mongo4`容器的 `mongo` 程序
- `-p` 指定访问 `mongo-express` 的 `HTTP` 端口

运行结果：

```sh
[root@localhost ~]# docker run --link mongo4:mongo -p 8081:8081 mongo-express
Waiting for mongo:27017...
Welcome to mongo-express
------------------------


Mongo Express server listening at http://0.0.0.0:8081
Server is open to allow connections from anyone (0.0.0.0)
basicAuth credentials are "admin:pass", it is recommended you change this in your config.js!
Database connected
Admin Database connected
```

浏览器访问 `8081` 端口，可进入数据库的管理界面

## 四、运行 `Mongo Shell`

```sh
docker exec -i -t mongo4 mongo
```

运行结果：

```sh
[root@localhost ~]# docker exec -it mongo4 mongo
MongoDB shell version v4.4.0
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("367a12f1-2201-4b20-be59-99163728ce84") }
MongoDB server version: 4.4.0
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	https://docs.mongodb.com/
Questions? Try the MongoDB Developer Community Forums
	https://community.mongodb.com
---
The server generated these startup warnings when booting:
        2020-09-02T15:53:58.794+00:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
        2020-09-02T15:53:58.797+00:00: /sys/kernel/mm/transparent_hugepage/enabled is 'always'. We suggest setting it to 'never'
        2020-09-02T15:53:58.797+00:00: /sys/kernel/mm/transparent_hugepage/defrag is 'always'. We suggest setting it to 'never'
---
---
        Enable MongoDB's free cloud-based monitoring service, which will then receive and display
        metrics about your deployment (disk utilization, CPU, operation statistics, etc).

        The monitoring data will be available on a MongoDB website with a unique URL accessible to you
        and anyone you share the URL with. MongoDB may use this information to make product
        improvements and to suggest MongoDB products and deployment options to you.

        To enable free monitoring, run the following command: db.enableFreeMonitoring()
        To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---
>
```

上面的运行结果，表示成功执行 `mongo4` 容器的 `mongo` 程序，并且可以，交互式的在 `mongo shell` 中执行命令

## 五、第一条 `MongoDB` 命令

查看所有数据库

```sh
show databases
```

运行结果：

```sh
> show databases
admin   0.000GB
config  0.000GB
local   0.000GB
>
```

