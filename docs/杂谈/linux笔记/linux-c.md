---
title: Linux C语言编程基本原理与实践
date: 2019-02-01 17:30:20
categories:
 - backEnd
tags:
 - C linux
---

## 一、C 语言是什么？

C 语言是一个有结构化程序设计、具有变量作用域以及递归功能的过程式语言。广泛用于系统软件与应用软件的开发。

C 语言，通俗的讲，就是人类和计算机交流的一种方式。

### 1.1 ANSI C

ANSI C、ISO C、Standard C 是指美国国家标准协会（ANSI）和国际标准化组织（ISO）对 C 语言发布的标准。历史上，这个名字专门用于指代此标准的原始版本，也是支持最好的版本（称为 C89 或 C90）

### 1.2 C 语言的特点

- 简单
- 快速
- 高性能
- 兼容性好
- 功能强大
- 易于学习

### 1.3 C 语言适合做什么？

什么样的程序最有价值？
什么样的场景最适合用 C 语言

- Linux 嵌入式 （小工具: ls cd 等）
- 和硬件打交道的程序 (操作系统 ARM 嵌入式 单片机 Arduino)
- 性能要求较高的应用程序 (nginx)

## 二、开发环境与配置

### 2.1 准备一个 linux 环境

- 虚拟机安装
- 云服务器

### 2.2 编辑器

- emacs (编辑器之神)
- vim (神的编辑器)

### 2.3 安装 vim

```shell
yum install vim
```

### 2.4 查看 cc 编译器

```shell
cc -v
```

显示当前的 cc 编译器是 gcc 版本，gcc 是兼容 cc 的编译器

`gcc version 4.8.5 20150623 (Red Hat 4.8.5-39) (GCC)`

也可以使用这条命令查看

```shell
gcc -v
```

## 三、Linux 下的第一个C程序

### 3.1 创建工程目录以及编辑 C 程序文件

```shell
mkdir less1
cd less1
vim a.c
```

### 3.2 hello world

```c
#include <stdio.h> // 导入标准的输入输出流 头文件

int main()
{
  printf("hello world\n");
  return 0;
}
```

保存并退出

### 3.3 编译 c 程序

```shell
cc a.c
```

会生成 a.out 的可执行文件

### 3.4 执行编译后的 c 程序

```shell
./a.out
```

结果在命令行输出

```shell
[root@VM_0_3_centos less1]# ./a.out
hello world
```

## 四、多文件操作

### 4.1 函数文件和入口文件分别定义

- 求最大值的函数文件 max.c

```c
int max(int a, int b) {
  if (a > b) {
    return a;
  } else {
    return b;
  }
}
```

- 求最小值函数文件 max.c

```c
int min(int a, int b) {
  if (a > b) {
    return b;
  } else {
    return a;
  }
}
```

- 入口文件 main.c

```c
#include <stdio.h> // 系统库中查找
#include "max.c" // 当前项目中查找
#include "min.c" // 当前项目中查找

int main() {
  int a  = 12;
  int b = 20;
  int maxNum = max(a, b);
  int minNum = min(a, b);
  printf("the max value is %d\n", maxNum);
  printf("the min value is %d\n", minNum);
  return 0;
}
```

- 编译并运行

```shell
gcc main.c -o main.out

./main.out
```

### 4.2 引用编译后的函数文件

当入口文件中引入很多自定义的 C 源程序代码时，一起编译时会很慢，如果引入的是编译后的文件，编译就会很快了

- 编译函数源程序

```shell
gcc -c max.c -o max.o
gcc -c min.c -o min.o
```

- 注释入口文件中引入的 max.c min.c

```c
#include <stdio.h> // 系统库中查找
// #include "max.c" // 当前项目中查找
// #include "min.c"
```

- 使用命令行编译并运行

```shell
gcc min.o max.o main.c -o main.out
./main.out
```

### 4.3 编写头文件

使用编译后的文件与入口函数一起编译时，能够加快编译速度，但是却看不到编译文件中的函数的用法，因此需要编写编译文件的头文件，让别人知道该编译文件的使用方法

- max.c 的头文件 max.h

```c
int max(int a, int b);
```

- min.c 的头文件 min.h

```c
int min(int a, int b);
```

- 在入口函数中引入头文件

```c
#include <stdio.h> // 系统库中查找
// #include "max.c" // 当前项目中查找
// #include "min.c"
#include "max.h"
#include "min.h"
```

## 五、 Makefile 的编写和使用

如果我们在编译时，引入了有很多个编译文件

```shell
gcc min.o max.o main.c -o main.out
```

命令行就会变得很长很长，这种方式就不可行了，这时我们需要来编写 MakeFile

### 5.1 make 命令

- make 工具可以将大型的开发项目分成若干个易于管理的模块
- make 工具可以很清晰和很快捷的整理源文件
- make 内部也是使用了 gcc

查看 make 工具是否已经安装

```shell
make -v
```

### 5.2 编写 Makefile

```Makefile
# main.out 是目标文件， 依赖于 min.o max.o main.c
# 通过执行 gcc min.o max.o main.c 生成 main.out
main.out:min.o max.o main.c
        gcc min.o max.o main.c -o main.out
# 如果缺少 min.o max.o, 需要先执行下面的命令生成 min.o max.o
# 如果 min.o max.o 已经存在， 再次编译时，就不会再生成 min.o max.o 了
# 如果 min.o 或 max.o 做了修改，再次编译时，也会重新生成 min.o 或 max.o
# min.o 是目标文件，依赖 min.c
# 通过执行 gcc -c min.c 生成 min.o
min.o:min.c
        gcc -c min.c
# max.o 是目标文件，依赖 max.c
# 通过执行 gcc -c max.c 生成 max.o
max.o:max.c
        gcc -c max.c
```

### 5.3 执行 Makefile 生成目标文件

```shell
make Makefile

./main.out
```

## 六、 main 函数的详解

### 6.1 main 函数中的 return

- 在 shell 命令行中可以通过 `echo $?` 查看上一条命令的执行结果

```shell
[root@VM_0_3_centos less2]# ./a.out
hello world
[root@VM_0_3_centos less2]# echo $?
0
```

输出 0 表示上一条命令执行成功, 而 0 也是 main 函数里的返回结果

```shell
./a.out && ls
```

上面的命令，会接着执行 ls

- main 函数返回 非 0 表示程序运行错误

如果 main 函数的返回值不为 0， 表示程序执行失败

```c
int main(int argv, char* argc[]) {
  printf("hello world \n");
  return 1;
}
```

编译运行后的结果：

```shell
[root@VM_0_3_centos less2]# ./a.out
hello world
[root@VM_0_3_centos less2]# echo $?
1
```

```shell
./a.out && ls
```

上面的命令，不会接着执行 ls

### 6.2 main 函数中的参数

main 函数的完整形式

```c
// argv 表示命令行参数的个数
// argc 表示命令行参数组成的字符串数组
int main(int argv, char* argc[]) {
  printf("argv is %d\n", argv);

  int i;
  for (i = 0; i < argv; i++) {
    printf("argc[%d] is %s\n", i, argc[i]);
  }
  return 0;
}
```

编译并运行的结果：

```shell
[root@VM_0_3_centos less2]# ./a.out -a -b
argv is 3
argc[0] is ./a.out
argc[1] is -a
argc[2] is -b
```

## 七、 输入流、输出流、错误流

### 7.1 标准输入流输出流以及错误流

- stdout 标准输出流
- stdin 标准输入流
- stderr 标准错误流

```c
#include <stdio.h>

int main() {
  // stdout 标准输出流
  // printf("Please input a number: \n");
  fprintf(stdout, "Please input a number: \n");

  int a;
  // stdin 标准输入流
  // scanf("%d", &a);
  fscanf(stdin, "%d", &a);

  if (a < 0) {
    // stderr 标准错误流
    fprintf(stderr, "the inputed value must be greater than 0\n");
    return 1;
  }
  return 0;
}
```

### 7.2 输入流输出流以及错误流的重定向

- 标准输入流在 shell 中用 0 表示
- 标准输出流在 shell 中用 1 表示
- 标准错误流在 shell 中用 2 表示

```c
#include<stdio.h>

int main() {
        int i, j;
        printf("please input value a: \n");
        scanf("%d", &i);
        printf("please input value b: \n");
        scanf("%d", &j);
        if (j == 0) {
                fprintf(stderr, "the value of j can't equal to 0\n");
                return 1;
        } else {
                printf("%d/%d=%d\n", i, j, i/j);
        }
        return 0;
}
```

- 将标准输出流重定向到文件

1 表示输出流，默认值，可以不写

```shell
./a.out 1> stdout.txt
./a.out > stdout.txt
```

编译并运行

```shell
[root@VM_0_3_centos less2]# ./a.out > stdout.txt
1
1
[root@VM_0_3_centos less2]# cat stdout.txt
please input value i:
please input value j:
1/1=1
```

- 将标准输出流追加到文件

```shell
./a.out 1>> stdout.txt
```

- 将标准输入流重定向到文件

文件内容为
stdin.txt

```txt
8
4
```

0 表示输入流， 默认值， 可以不写

```shell
./a.out <0 stdin.txt
./a.out < stdin.txt
```

编译并运行

```shell
[root@VM_0_3_centos less2]# ./a.out < stdin.txt
please input value i:
please input value j:
8/4=2
```

- 将标准错误流重定向到文件
  - `>` 会重新写人,覆盖原有内容
  - `>>` 表示追加到文件

```shell
./a.out 2>> stderr.txt
```

编译并运行

```shell
[root@VM_0_3_centos less2]# ./a.out 2>> stderr.txt
please input value i:
1
please input value j:
0
[root@VM_0_3_centos less2]# cat stderr.txt
the value of j can't equal to 0
```

- 输入流、输出流、错误流的重定向

```shell
./a.out 1>> stdout.txt 2>> stderr.txt <0 stdin.txt
```

## 八、 使用管道打造实用的C语言程序

### 8.1 什么是管道？

将前一个命令的输出流, 作为下一个命令的输入流

查看 /etc/ 包含 ab 的文件

```shell
ls /etc/ | grep ab
```

查看是否开启了 ssh 进程

```shell
ps -e | grep ssh
```

### 8.2 使用管道计算平均值

input.c

```c
#include<stdio.h>

int main() {
        int i;
        int count = 0;
        int sum = 0;
        while(1) {
                scanf("%d", &i);
                if (i == 0) {
                        printf("%d,%d\n", sum, count);
                        break;
                }
                sum += i;
                count++;
        }
        return 0;
}
```

avg.c

```c
#include <stdio.h>

int main(){
 int s = 0;
 int n = 0;
 scanf("%d,%d", &s, &n);
 float v = s / n;
 printf("avg = %f\n", v);
 return 0;
}
```

编译并运行

```shell
[root@VM_0_3_centos less3]# ./input.o | ./avg.o
5
98
0
avg = 51.000000
```
