---
title: JavaScript 数据结构之栈
date: 2019-02-12 00:30:20
categories:
 - frontEnd
tags:
 - js 
---

## 一、 认识栈

示意图

![stack.jpg](https://upload-images.jianshu.io/upload_images/12493822-5a2f877fa19d07f2.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


栈(stack),是一种受限的线性结构, 特点是：后进先出(LIFO)

- 只允许在栈顶添加和删除元素
- 向栈插入元素又称为：入栈、进栈、压栈
- 从一个栈删除元素又称为：出栈、退栈

如：生活中的盘子的叠放, 编程中的函数调用栈,递归等

## 二、栈的一个面试题

有六个元素 6,5,4,3,2,1, 按顺序进栈，请问下列哪个不是合法的出栈序列(C)

A. 543612 B. 453216 C. 346521 D. 234156

解析：

- A 选项入栈出栈分析
  - 65 -> 5 出栈
  - 6 <- 4 入栈
  - 64 -> 4 出栈
  - 6 <- 3 入栈
  - 63 -> 3 出栈
  - 6 -> 6 出栈
  - <- 2 入栈
  - 2 <- 1 入栈
  - 21 -> 1 出栈
  - 2 -> 2 出栈
- B 选项入栈出栈分析
  - 654 -> 4 出栈
  - 65 -> 5 出栈
  - 6 <- 3 入栈
  - 63 -> 3 出栈
  - 6 <- 2 入栈
  - 62 -> 2 出栈
  - 6 <- 1 入栈
  - 61 -> 1 出栈
  - 6 -> 出栈
- C 选项入栈出栈分析
  - 6543 -> 3 出栈
  - 654 -> 4 出栈
  - 65 -> 6 (错误, 只能移除栈顶元素，此时栈顶元素是 5)
- D 选项入栈出栈分析
  - 65432 -> 2 出栈
  - 6543 -> 3 出栈
  - 654 -> 4 出栈
  - 65 <- 1 入栈
  - 651 -> 1 出栈
  - 65 -> 5 出栈
  - 6 -> 6 出栈

## 三、 栈结构的实现

可基于数组, 也可基于链表, 因为都是对栈顶元素的操作，不涉及数组的位移问题，因此使用这两种数据结构来实现栈，效率差不多

基于数组实现栈：

```js
class Stack {
  constructor() {
    this.items = [];
  }
}
```

栈的常见操作:

- push 添加新元素到栈顶

```js
push(element) {
  this.items.push(element)
}
```

- pop 移除栈顶元素，同时返回被移除的元素

```js
pop() {
  return this.items.pop()
}
```

- peek 返回栈顶元素，不对栈做任何修改

```js
peek() {
  return this.items[this.size() - 1]
}
```

- isEmpty 如果栈里没有任何元素返回 true, 否则返回 false

```js
isEmpty() {
  return this.items.length === 0
}
```

- size 返回栈里的元素个数

```js
size() {
  return this.items.length
}
```

- toString() 将栈结构的内容以字符形式返回

```js
toString() {
  return this.items.reduce((result, item) => {
      return result + item + ' '
  }, '').trim()
}
```

四、完整代码

```js
class Stack {
  constructor() {
    this.items = []
  }

  // push 添加新元素到栈顶
  push(element) {
    this.items.push(element)
  }
  // pop 移除栈顶元素，同时返回被移除的元素
  pop() {
    return this.items.pop()
  }
  // peek 返回栈顶元素，不对栈做任何修改
  peek() {
    return this.items[this.size() - 1]
  }
  // isEmpty 如果栈里没有任何元素返回true, 否则返回false
  isEmpty() {
    return this.items.length === 0
  }
  // size 返回栈里的元素个数
  size() {
    return this.items.length
  }
  // toString() 将栈结构的内容以字符形式返回
  toString() {
    return this.items.reduce((result, item) => {
      return result + item + ' '
    }, '').trim()
  }
}

```

测试：

```js
const stack = new Stack()

stack.push(19)
stack.push(90)
stack.push(97)
stack.push(300)

console.log(stack.peek()) // 300
console.log(stack.size()) // 4
console.log(stack.toString()) // 19 90 97 300

stack.pop()
stack.pop()
stack.pop()

console.log(stack.peek()) // 19
console.log(stack.size()) // 1
console.log(stack.toString()) // 19

console.log(stack.isEmpty()) // false

stack.pop()

console.log(stack.isEmpty()) // true
```

## 五、 案例: 十进制转二进制

示意图：

![dec2bin.jpg](https://upload-images.jianshu.io/upload_images/12493822-9fd611fcdcc50371.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


要把十进制转化为二进制，需要把该十进制数一直与2整除，直到结果为0， 整除过程中得到的余数，按反方向读取形成的二进制，即为十进制转化的二进制形式

代码实现：

```js
function dec2bin(decNum) {
  // 定义栈对象
  const stack = new Stack()

  while(decNum > 0) {
    // 获取余数并放入栈中
    stack.push(decNum % 2)
    // 获取整除后的结果, 进行下一次运算
    decNum = Math.floor(decNum / 2)
  }

  // 从栈中取出余数，并拼接成二进制字符串
  let binaryString = ''
  while(!stack.isEmpty()) {
    binaryString += stack.pop()
  }

  return binaryString
}

console.log(dec2bin(29)) // 11101
```

## 六、 案例： 十进制转任意进制

我们可以根据上一个十进制转二进制的例子, 进一步改写成将十进制转任意进制

下面的代码可以将十进制转为36进制以内的任何进制数

```js
function dec2any(decNum, system) {
  const digitStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  // 检查能转化的最大进制数
  if (system > digitStr.length) {
    throw new Error(`the system param can't greater than ${digitStr.length}`)
  }
  const stack = new Stack()

  while (decNum > 0) {
    // 求得余数，入栈
    stack.push(decNum % system)
    // 求得进行下一次计算的十进制数
    decNum = Math.floor(decNum / system)
  }

  // 从栈中取出余数，并拼接成二进制字符串
  let systemStr = ''
  while (!stack.isEmpty()) {
    systemStr += digitStr.charAt(stack.pop())
  }

  return systemStr
}


console.log(dec2any(29, 2)) // 11101
console.log(dec2any(29, 10)) // 29
console.log(dec2any(29, 16)) // 1D
console.log(dec2any(29, 100)) // 报错 the system param can't greater than 36
```
