---
title: TypeScript 接口
date: 2019-04-19 21:46:49
categories:
 - frontEnd
tags:
 - TypeScript 
---

## 一、基本用法
```ts
interface NameInfo {
  firstName: string,
  lastName: string
}

const getFullName = ({ firstName, lastName }: NameInfo) => {
  return `${firstName} ${lastName}`
}

console.log(getFullName({ firstName: 'lucy', lastName: 'liu' }))
// lucy liu
```
## 二、可选属性
```ts
interface Vegetable {
  color?: string,
  type: string,
}

const getVegetables = ({ color, type }: Vegetable) => {
  return `A ${color ? color + ' ' : ''}${type}`
}

console.log(getVegetables({ color: 'red', type: 'tomato' }))
// A red tomato
console.log(getVegetables({ type: 'tomato' }))
// A tomato
```
## 三、多余属性检查

- 类型断言
```ts
console.log(getVegetables({ type: 'tomato', size: 2 } as Vegetable))
```

- 索引签名
```ts
interface Vegetable {
  color?: string,
  type: string,
  [prop: string]: any // 索引签名
}

console.log(getVegetables({ type: 'tomato', size: 2 }))
```
- 类型兼容性

```ts
const vegetableInfo = { type: 'tomato', size: 2 }
console.log(getVegetables(vegetableInfo))
```
## 四、只读属性
```ts
// 只读属性
interface UserInfo {
  name: string,
  readonly age: number
}

const user: UserInfo = {
  name: 'lucy',
  age: 18
}

// user.age = 17 // 报错 Cannot assign to 'age' because it is a read-only property.

// 限定数组元素是只读属性

interface ArrInterface {
  readonly 0: number,
  1: string
}

const myArr: ArrInterface = [18, 'lucy']
// myArr[0] = 17 // 报错 Cannot assign to '0' because it is a read-only property.
```
## 五、函数类型
```ts
interface AddFunc {
  (num1: number, num2: number): number
}
const add: AddFunc = (n1, n2) => n1 + n2
```
## 六、索引类型
```ts
// 索引类型
interface RoleDic {
  [id: number]: string
}

// 属性名必须是数字类型
const role1: RoleDic = {
  0: 'superuser',
  // name: 'lucy' // 报错 'name' does not exist in type 'RoleDic'.
}

interface RoleDic1 {
  [id: string]: string
}

// 属性名可以是数字类型, 会自动转换为字符串类型
const role2: RoleDic1 = {
  name: 'lucy',
  0: 'superuser'
}
```
## 七、接口继承
```ts
interface Vegetables {
  color: string
}

interface Tomato extends Vegetables {
  radius: number
}

interface Carrot extends Vegetables {
  length: number
}

const tomato: Tomato = {
  color: 'red',
  radius: 15
}

const carrot: Carrot = {
  color: 'orange',
  length: 15
}
```
## 八、混合类型接口
```ts
interface Counter {
  (): void,
  count: number
}

const getCounter = (): Counter => {
  const c = () => { c.count++ }
  c.count = 0
  return c
}

const counter: Counter = getCounter()

counter()
console.log(counter.count)
```
## 九、接口与类
在类的部分一起讲解