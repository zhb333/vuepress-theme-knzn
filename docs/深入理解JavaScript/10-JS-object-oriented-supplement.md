---
title: 10 JS 对象的方法补充
author: 前端程序猿
tags:
  - javascript

categories:
  - 大前端
postImage: /images/javascript.webp
---

## hasOwnProperty

对象是否有某一个属于自己的属性（不是在原型上的属性）

```js
var obj = {
  name: 'why',
  age: 18,
}

var info = Object.create(obj, {
  address: {
    value: '北京市',
    enumerable: true,
  },
})

// hasOwnProperty方法判断
console.log(info.hasOwnProperty('address')) // true
console.log(info.hasOwnProperty('name')) // false
```

## in/for in 操作符

判断某个属性是否在某个对象或者对象的原型上

```js
// in 操作符: 不管在当前对象还是原型中返回的都是true
console.log('address' in info)
console.log('name' in info)
```

```js
// for in
for (var key in info) {
  console.log(key) // address name age
}
```

## instanceof

用于检测构造函数的 pototype，是否出现在某个实例对象的原型链上

```js
function createObject(o) {
  function Fn() {}
  Fn.prototype = o
  return new Fn()
}

function inheritPrototype(SubType, SuperType) {
  SubType.prototype = createObject(SuperType.prototype)
  Object.defineProperty(SubType.prototype, 'constructor', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType,
  })
}

function Person() {}

function Student() {}

inheritPrototype(Student, Person)

console.log(Person.prototype.__proto__) // Object.prototype

var stu = new Student()
console.log(stu instanceof Student) // true
console.log(stu instanceof Person) // true
console.log(stu instanceof Object) // true
```

### isPrototypeOf

用于检测某个对象，是否出现在某个实例对象的原型链上

```js
function Person() {}

var p = new Person()

console.log(Person.prototype.isPrototypeOf(p)) // true
```

```js
var obj = {
  name: 'why',
  age: 18,
}

var info = Object.create(obj)

console.log(obj.isPrototypeOf(info)) // true
```
