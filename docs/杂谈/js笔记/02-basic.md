---
title: TypeScript 基础类型
date: 2019-04-17 11:36:10
categories:
 - frontEnd
tags:
 - TypeScript 
---

## 1-布尔值
```ts
// 布尔类型
let bool: boolean = true
```
## 2-数值
```ts
// 数值类型
let num: number = 123
num = 0b1111011
num = 0o173
num = 0x7b
```

## 3-字符串
```ts
// 字符串类型
let str: string = 'abc'
str = `-${str}-`
```
## 4-数组
```ts
// 数组类型
let arr: number[] = [1, 2, 3]
let arr1: Array<number> = [1, 2, 3]
let arr2: (string | number)[] = ['a', 1]
let arr3: Array<string | number> = [1, 'a']
```
## 5-元组
```ts
// 元组类型： 固定长度，固定位置，固定类型
let tuple: [string, number, boolean] = ['a', 1, false]
```
## 6-枚举值
```ts
// 枚举类型
enum Roles {
  SuperUser,
  Admin,
  User
}

console.log(Roles.User) // 2
console.log(Roles[Roles.User]) // Use
```
```js
// 编译后的结果
var Roles;
(function (Roles) {
    Roles[Roles["SuperUser"] = 0] = "SuperUser";
    Roles[Roles["Admin"] = 1] = "Admin";
    Roles[Roles["User"] = 2] = "User";
})(Roles || (Roles = {}));
```

```ts
// 从4开始自增长
enum Shop {
  Collect,
  Order = 4,
  Payed
}
console.log(Shop.Collect) // 0
console.log(Shop.Payed) // 5

// 全部自定义值
enum Car {
  Ford = 1,
  VOLKSWAGEN = 3,
  Tesla = 5
}

// 字符串枚举
enum Fruits {
  Apple = 'a',
  Banana = 'b',
  Cherry = 'c'
}
```
## 7-any
```ts
// any 类型: 任何类型
let value: any
value = 2
value = 'b'
value = false
const arr4: any[] = [1, 'a']
```
## 8-void
```ts
// void 类型: 什么类型都不是
const consoleText = (text: string): void => {
  console.log(text)
}

let v: void
v = undefined
```
## 9-null
```ts
// null
let n: null = null
```
## 10-undefined
```ts
// undefined
let u = undefined
```
## 11-never
```ts
// never 类型: 永远不存在的值的类型

// 抛错
const errFunc = (mes: string): never => {
  throw new Error(mes)
}

// 死循环
const infiniteFunc = (): never => {
  while (true) { }
}

// never 类型是任何类型的子类型
// let neverVariable = (():never => { while(true) {} })()
// num = neverVariable
```
## 12-object
```ts
// object 类型
let obj = {name: 'lucy'}
const getObject = (obj: object): void => {
  console.log(obj)
}
getObject(obj)
```
## 13-断言类型
```ts
// 类型断言
const getLength = (target: string | number): number => {
  if ((<string>target).length || (target as string).length === 0) {
    return (target as string).length
  } else {
    return target.toString().length
  }
}
```