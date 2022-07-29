---
title: 04 call、apply、bind
author: 前端程序猿
tags:
  - javascript

categories:
  - 大前端
postImage: /images/javascript.webp
---

接下来我们来实现一下 apply、call、bind 函数：

注意：我们的实现是练习函数、this、调用关系，不会过度考虑

<!-- more -->

## 实现 apply、call、bind

```js
Function.prototype.hycall = function (thisBings, ...args) {
  thisBings =
    thisBings === null || thisBings === undefined ? window : Object(thisBings)
  thisBings.fn = this // 使用 hycall 方法时的函数对象，隐式绑定
  var result = thisBings.fn(...args)
  delete thisBings.fn
  return result
}
```

```js
Function.prototype.hyapply = function (thisBings, args) {
  thisBings = thisBings === null || thisBings === undefined ? window : thisBings
  thisBings.fn = this

  let result
  if (!args) {
    result = thisBings.fn()
  } else {
    result = thisBings.fn(...args)
  }

  delete thisBings.fn

  return result
}
```

```js
Function.prototype.hybind = function (thisBings, ...bindArgs) {
  thisBings = thisBings === null || thisBings === undefined ? window : thisBings
  thisBings.fn = this

  return function (...newArgs) {
    var args = [...bindArgs, ...newArgs]
    return thisBings.fn(...args)
  }
}
```

## 认识 arguments

arguments 是一个 对应于 传递给函数的参数 的 类数组(array-like)对象。

array-like 意味着它不是一个数组类型，而是一个对象类型：

- 但是它却拥有数组的一些特性，比如说 length，比如可以通过 index 索引来访问；
- 但是它却没有数组的一些方法，比如 forEach、map 等；

```js
function foo(num1, num2, num3) {
  // 类数组对象中(长的像是一个数组, 本质上是一个对象): arguments
  // console.log(arguments)

  // 常见的对arguments的操作是三个
  // 1.获取参数的长度
  console.log(arguments.length)

  // 2.根据索引值获取某一个参数
  console.log(arguments[2])
  console.log(arguments[3])
  console.log(arguments[4])

  // 3.callee获取当前arguments所在的函数
  console.log(arguments.callee)
  // arguments.callee()
}

foo(10, 20, 30, 40, 50)
```

## arguments 转成 array

- 自己遍历

```js
function foo(num1, num2) {
  var newArr = []
  for (var i = 0; i < arguments.length; i++) {
    newArr.push(arguments[i])
  }
}

foo(10, 20, 30, 40, 50)
```

- Array.prototype.slice 将 arguments 转成 array

```js
var newArr2 = Array.prototype.slice.call(arguments)
var newArr3 = [].slice.call(arguments)
```

- ES6 的语法

```js
var newArr4 = Array.from(arguments)
var newArr5 = [...arguments]
```

## 额外补充的知识点

Array 中的 slice 实现

```js
Array.prototype.hyslice = function (start, end) {
  var arr = this
  start = start || 0
  end = end || arr.length
  var newArray = []
  for (var i = start; i < end; i++) {
    newArray.push(arr[i])
  }
  return newArray
}

var newArray = Array.prototype.hyslice.call(['aaaa', 'bbb', 'cccc'], 1, 3)
console.log(newArray)

var newArray2 = ['aaaa', 'bbb', 'cccc'].hyslice(1, 3)
console.log(newArray2)

var names = ['aaa', 'bbb', 'ccc', 'ddd']
console.log(names.slice(1, 3))
```

## 箭头函数不绑定 arguments

箭头函数是不绑定 arguments 的，所以我们在箭头函数中使用 arguments 会去上层作用域查找：

- 案例一:

```js
var foo = () => {
  console.log(arguments)
}

foo()
```

- 案例二:

```js
function foo() {
  var bar = () => {
    console.log(arguments)
  }
  return bar
}

var fn = foo(123)
fn()
```

- 案例三:

```js
var foo = (num1, num2, ...args) => {
  console.log(args)
}

foo(10, 20, 30, 40, 50)
```
