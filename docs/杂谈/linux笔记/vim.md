---
title: Vim 的常用操作
date: 2018-08-11 13:03:09
categories:
 - backEnd
tags:
 - linux
 - vim
---

### Vim 常用的四种模式

- normal(普通) 模式
- insert(编辑) 模式
- visual(可视) 模式
- command(命令) 模式

默认使用 normal 模式，大部分情况是在浏览而不是在编辑, 在normal 模式下可以进行各种命令操作和移动

### 进入 insert 模式

在 normal 模式下，使用以下命令进入 insert 模式

i (inser before char) 在当前字符前插入
I (insert before line) 在行首插入

a (insert after char) 在当前字符后插入
A (insert after line) 在行尾插入

o (insert below line) 在下一行插入
O (insert above line) 在上一行插入

s  删除当前字符并进入插入模式
S  删除当前行并进入插入模式

c 删除匹配的字符并进入插入模式
C 删除当前字符到行尾的字符，并进入插入模式

gi 跳转到上一次编辑的位置，进入插入模式

### insert 模式下的小技巧

- ctrl + h 删除上一个字符，相当于退格键
- ctrl + w 删除上一个单词
- ctrl + u 删除到行首
- ctrl + [ 回到 normal  模式，相当于 esc

### Command 模式的常用操作

在 normal 模式下，使用 `:` 进入命令模式

保存退出
- `:w` write, 保存
- `:q` quit 退出文件

分割窗口
- `:sp` split 水平分屏 快捷键 ctrl + w s
- `:vs` vertical split 垂直分屏 ctrl + w v

在分割的窗口间跳转
- `ctrl + w w`     在窗口间循环切换
- `ctrl + w h`     切换到左边的窗口
- `ctrl + w j`     切换到下边的窗口
- `ctrl + w k`     切换到上边的窗口
- `ctrl + w l`     切换到右边的窗口

替换
- `:%s/pattern/string/g` 全局替换
- `:%s/\<pattern\>/string/g` 精确匹配全局替换
- `%10,20s/pattern/string/g` 指定范围替换

多文件操作

- `:e {filename}` 打开当前目录的其它文件
- `ctrl + p` 打开文件
- `tabNext` 切换到下一个打开的文件
- `tabPrevious` 切换到上一个打开的文件
- `tabOnly` 除了当前文件，关闭其它打开的文件
- `ctrl + f4` 关闭当前打开文件

### 进入 visual 模式

- v 进入可视模式
- V 进入可视模式，行选择
- ctrl + v 进入可视模式， 块选择

### normal 模式快速移动

按字符移动
- h 向左移动一个字符
- j 向下移动一行
- k 向上移动一行
- l 向右移动一行

行间搜索移动
- f{char} 移动到当前行的 {char} 字符上
- t{char} 移动到当前行的 {char} 字符前
- F{char} 反向移动到当前行的 {char} 字符上
- T{char} 反向移动到当前行的 {char} 字符前
- ; 行间搜索的以一个匹配项
- , 行间搜索的上一个匹配项

水平移动
- 0 移动到行首的第一个字符
- ^ 移动到行首的第一个非空字符
- $ 移动到行尾
- g_ 移动到行尾非空白字符

垂直移动
- ( 移动到上一个句子
- ) 移动到下一个句子
- { 移动到上一个段落
- } 移动到下一个段落

页面移动
- gg 跳转到页面开头
- G 跳转到页面结尾
- ctrl + o 跳转到上一个位置

屏幕中移动
- H 跳转到屏幕开头
- M 跳转到屏幕中间
- L 跳转到屏幕结尾

翻页
- ctrl + u 向上翻页
- ctrl  + f 向下翻页
- zz 当前位置置为屏幕中间

### 操作文本块-text object

操作文本块的格式
[number]<command>[text object]

文本对象常用到的两个语义化命令
- i inner 如： `ciw` 删除一个单词不包含单词周围的空白字符，并进入insert模式
- a around 如  `daw` 删除一个单词包括单词周围的空白字符

```sh
4diw #删除四个单词
vaw # 选择一个单词，包括单词左右的空白字符，并进入 visual  模式
ci{ # 删除 {} 中的文本，并进入 insert 模式
ci( # 删除 () 中的文本，并进入 insert 模式
```

### 查询
- /{string} 前向搜索
- ?{string} 反向搜索
- n 跳转到下一个匹配
- N 跳转到上一个匹配

### 使用宏完成批量操作

- q{register} 指定寄存器，开始录制操作
- q 完成录制
- @{register} 在选择的区域执行录制的操作

### 寄存器的使用

normal 模式下的复制、剪切、粘贴
- y yank 复制
- d delete 剪切
- p put 粘贴

复制，剪切的内容默认都存放在 无名寄存器中 即：`""`
因此，`p` 相当于 `""p`

在复制或剪切前可指定到自定义的寄存器中
- `"adiw` 在寄存器a中存放删除的单词
- `"ap` 粘贴寄存器a中的内容
- `"+dd` 删除一行，并将删除的内容存放到系统剪贴板中，寄存器+ 代表系统剪贴板

在insert 模式下，可通过 `shift + insert`将系统剪贴板的内容粘贴到文件中