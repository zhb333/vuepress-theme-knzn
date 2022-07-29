---
title: 11 ES6 中类的使用
author: 前端程序猿
tags:
  - javascript

categories:
  - 大前端
postImage: /images/javascript.webp
---

我们会发现，按照前面的构造函数形式创建 类，不仅仅和编写普通的函数过于相似，而且代码并不容易理解。

在 ES6（ECMAScript2015）新的标准中使用了 class 关键字来直接定义类；但是类本质上依然是前面所讲的构造函数、原型链的语法糖而已；所以学好了前面的构造函数、原型链更有利于我们理解类的概念和继承关系；

<!-- more -->

## 认识 class 定义类

那么，如何使用 class 来定义一个类呢？可以使用两种方式来声明类：类声明和类表达式；

```js
// 类的声明
class Person {}

// 类的表达式
var Animal = class {}
```

## 类和构造函数的异同

我们来研究一下类的一些特性：你会发现它和我们的构造函数的特性其实是一致的；

```js
var p = new Person()
console.log(p.__proto__ === Person.prototype) // true
console.log(Person.prototype) // { constructor: class Person, __proto__: Object.prototype }
console.log(Person.prototype.__proto__) // Object.prototype
console.log(Person.prototype.constructor) // class Person
console.log(typeof Person) // function
```

## 类的构造函数

如果我们希望在创建对象的时候给类传递一些参数，这个时候应该如何做呢？

每个类都可以有一个自己的构造函数（方法），这个方法的名称是固定的 constructor；当我们通过 new 操作符，操作一个类的时候会调用这个类的构造函数 constructor；每个类只能有一个构造函数，如果包含多个构造函数，那么会抛出异常；

当我们通过 new 关键字操作类的时候，会调用这个 constructor 函数，并且执行如下操作：

- 1.在内存中创建一个新的对象（空对象）；
- 2.这个对象内部的[[prototype]]属性会被赋值为该类的 prototype 属性；
- 3.构造函数内部的 this，会指向创建出来的新对象；
- 4.执行构造函数的内部代码（函数体代码）；
- 5.如果构造函数没有返回非空对象，则返回创建出来的新对象；

```js
// 类的声明
class Person {
  // 类的构造方法
  // 注意: 一个类只能有一个构造函数
  // 1.在内存中创建一个对象 moni = {}
  // 2.将类的原型prototype赋值给创建出来的对象 moni.__proto__ = Person.prototype
  // 3.将对象赋值给函数的this: new绑定 this = moni
  // 4.执行函数体中的代码
  // 5.自动返回创建出来的对象
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

var p1 = new Person('why', 18)
var p2 = new Person('kobe', 30)
console.log(p1, p2)
```

## 类的实例方法

在上面我们定义的属性都是直接放到了 this 上，也就意味着它是放到了创建出来的新对象中：

在前面我们说过对于实例的方法，我们是希望放到原型上的，这样可以被多个实例来共享；这个时候我们可以直接在类中定义；

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  // 普通的实例方法
  // 创建出来的对象进行访问
  // var p = new Person()
  // p.eating()
  eating() {
    console.log(this.name + ' eating~')
  }

  running() {
    console.log(this.name + ' running~')
  }
}

var p = new Person('why', 18)
p.eating()
p.running()
```

## 类的访问器方法

我们之前讲对象的属性描述符时有讲过对象可以添加 setter 和 getter 函数的，那么类也是可以的：

```js
class Person {
  constructor() {
    this._address = '广州市'
  }

  // 类的访问器方法
  get address() {
    console.log('拦截访问操作')
    return this._address
  }

  set address(newAddress) {
    console.log('拦截设置操作')
    this._address = newAddress
  }
}

var p = new Person('why', 18)

console.log(p.address)
p.address = '北京市'
console.log(p.address)
```

## 类的静态方法

静态方法通常用于定义直接使用类来执行的方法，不需要有类的实例，使用 static 关键字来定义：

```js
var names = ['abc', 'cba', 'nba']

class Person {
  // 类的静态方法(类方法)
  static randomPerson() {
    var nameIndex = Math.floor(Math.random() * names.length)
    var name = names[nameIndex]
    var age = Math.floor(Math.random() * 100)
    return new Person(name, age)
  }
}

for (var i = 0; i < 50; i++) {
  console.log(Person.randomPerson())
}
```

## ES6 类的继承 - extends

前面我们花了很大的篇幅讨论了在 ES5 中实现继承的方案，虽然最终实现了相对满意的继承机制，但是过程却依然
是非常繁琐的。

在 ES6 中新增了使用 extends 关键字，可以方便的帮助我们实现继承：

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  running() {
    console.log(this.name + ' running~')
  }

  eating() {
    console.log(this.name + ' eating~')
  }
}

// Student称之为子类(派生类)
class Student extends Person {
  // JS引擎在解析子类的时候就有要求, 如果我们有实现继承
  // 那么子类的构造方法中, 在使用this之前
  constructor(name, age, sno) {
    super(name, age)
    this.sno = sno
  }
}
```

## super 关键字

我们会发现在上面的代码中我使用了一个 super 关键字，这个 super 关键字有不同的使用方式：

注意：在子（派生）类的构造函数中使用 this 或者返回默认对象之前，必须先通过 super 调用父类的构造函数！

super 的使用位置有三个：子类的构造函数、实例方法、静态方法；

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  running() {
    console.log(this.name + ' running~')
  }

  eating() {
    console.log(this.name + ' eating~')
  }

  personMethod() {
    console.log('处理逻辑1')
    console.log('处理逻辑2')
    console.log('处理逻辑3')
  }

  static staticMethod() {
    console.log('PersonStaticMethod')
  }
}

// Student称之为子类(派生类)
class Student extends Person {
  // JS引擎在解析子类的时候就有要求, 如果我们有实现继承
  // 那么子类的构造方法中, 在使用this之前
  constructor(name, age, sno) {
    super(name, age) // super 代表父类的构造函数
    this.sno = sno
  }

  studying() {
    console.log(this.name + ' studying~')
  }

  // 类对父类的方法的重写
  running() {
    console.log('student ' + this.name + ' running')
  }

  // 重写personMethod方法
  personMethod() {
    // 复用父类中的处理逻辑
    super.personMethod() // super 代表 父类的prototype

    console.log('处理逻辑4')
    console.log('处理逻辑5')
    console.log('处理逻辑6')
  }

  // 重写静态方法
  static staticMethod() {
    super.staticMethod() // super 代表 父类
    console.log('StudentStaticMethod')
  }
}

var stu = new Student('why', 18, 111)
console.log(stu)

// console.log(Object.getOwnPropertyDescriptors(stu.__proto__))
// console.log(Object.getOwnPropertyDescriptors(stu.__proto__.__proto__))

stu.eating()
stu.running()

stu.personMethod()

Student.staticMethod()

console.log(Object.getOwnPropertyDescriptors(Person))
```

## 继承内置类

我们也可以让我们的类继承自内置类，比如 Array：

```js
class HYArray extends Array {
  firstItem() {
    return this[0]
  }

  lastItem() {
    return this[this.length - 1]
  }
}

var arr = new HYArray(1, 2, 3)
console.log(arr.firstItem())
console.log(arr.lastItem())
```

## 类的混入 mixin

JavaScript 的类只支持单继承：也就是只能有一个父类

那么在开发中我们我们需要在一个类中添加更多相似的功能时，应该如何来做呢？ 这个时候我们可以使用混入（mixin）；

```js
class Person {}

function mixinRunner(BaseClass) {
  class NewClass extends BaseClass {
    running() {
      console.log('running~')
    }
  }
  return NewClass
}

function mixinEater(BaseClass) {
  return class extends BaseClass {
    eating() {
      console.log('eating~')
    }
  }
}

// 在JS中类只能有一个父类: 单继承
class Student extends Person {}

var NewStudent = mixinEater(mixinRunner(Student))
var ns = new NewStudent()
ns.running()
ns.eating()
```

## JavaScript 中的多态

面向对象的三大特性：封装、继承、多态。前面两个我们都已经详细解析过了，接下来我们讨论一下 JavaScript 的多态。

JavaScript 有多态吗？

不同的数据类型进行同一个操作，表现出不同的行为，就是多态的体现。

那么从上面的定义来看，JavaScript 是一定存在多态的

```js
function sum(m, n) {
  return m + n
}

sum(20, 30)
sum('abc', 'cba')
```

```js
// 多态: 当对不同的数据类型执行同一个操作时, 如果表现出来的行为(形态)不一样, 那么就是多态的体现.
function calcArea(foo) {
  console.log(foo.getArea())
}

var obj1 = {
  name: 'why',
  getArea: function () {
    return 1000
  },
}

class Person {
  getArea() {
    return 100
  }
}

var p = new Person()

calcArea(obj1)
calcArea(p)
```
