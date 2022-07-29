---
title: 03 JS 函数的 this 指向
author: 前端程序猿
tags:
  - javascript

categories:
  - 大前端
postImage: /images/javascript.webp
---

在常见的编程语言中，几乎都有 this 这个关键字（Objective-C 中使用的是 self），但是 JavaScript 中的 this 和常见的面向对象语
言中的 this 不太一样：

<!-- more -->

## 为什么需要 this？

- 常见面向对象的编程语言中，比如 Java、C++、Swift、Dart 等等一系列语言中，this 通常只会出现在类的方法中
- 也就是你需要有一个类，类中的方法（特别是实例方法）中，this 代表的是当前调用对象。
- 但是 JavaScript 中的 this 更加灵活，无论是它出现的位置还是它代表的含义。
- 我们来看一下编写一个 obj 的对象，有 this 和没有 this 的区别

```js
var obj = {
  name: 'why',
  running: function () {
    console.log(obj.name + ' running')
  },
  eating: function () {
    console.log(obj.name + ' eating')
  },
  studying: function () {
    console.log(obj.name + ' studying')
  },
}
```

```js
var obj = {
  name: 'why',
  running: function () {
    console.log(this.name + ' running')
  },
  eating: function () {
    console.log(this.name + ' eating')
  },
  studying: function () {
    console.log(this.name + ' studying')
  },
}
```

## this 指向什么呢？

我们先说一个最简单的，this 在全局作用域下指向什么？

这个问题非常容易回答，在浏览器中测试就是指向 window

```js
console.log(this) // window

var name = 'why'
console.log(this.name) // why
console.log(window.name) // why
```

但是，开发中很少直接在全局作用于下去使用 this，通常都是在函数中使用。

所有的函数在被调用时，都会创建一个执行上下文：这个上下文中记录着函数的调用栈、AO 对象等；this 也是其中的一条记录；

## this 到底指向什么呢？

我们先来看一个让人困惑的问题：定义一个函数，我们采用三种不同的方式对它进行调用，它产生了三种不同的结果

```js
// 定义一个函数
function foo() {
  console.log(this)
}

// 直接调用
foo() // window

// 将foo放到一个对象中，再调用

var obj = {
  name: 'why',
  foo,
}

obj.foo() // obj对接

// 通过 call/apply调用
foo.call('abc') // String {"abc"} 对象
```

这个的案例可以给我们什么样的启示呢？

1. 函数在调用时，JavaScript 会默认给 this 绑定一个值；
2. this 的绑定和定义的位置（编写的位置）没有关系；
3. this 的绑定和调用方式以及调用的位置有关系；
4. this 是在运行时被绑定的；

那么 this 到底是怎么样的绑定规则呢？一起来学习一下吧

- 绑定一：默认绑定；
- 绑定二：隐式绑定；
- 绑定三：显示绑定；
- 绑定四：new 绑定；

## 规则一：默认绑定

什么情况下使用默认绑定呢？独立函数调用。独立的函数调用我们可以理解成函数没有被绑定到某个对象上进行调用；

我们通过几个案例来看一下，常见的默认绑定

案例 1

```js
function foo() {
  console.log(this)
}

foo()
```

案例 2

```js
function test1() {
  console.log(this)
  test2()
}

function test2() {
  console.log(this)
  test3()
}

function test3() {
  console.log(this)
}

test1()
```

案例 3

```js
function foo(func) {
  func()
}

var obj = {
  name: 'why',
  bar: function () {
    console.log(this)
  },
}

foo(obj.bar)
```

## 规则二：隐式绑定

另外一种比较常见的调用方式是通过某个对象进行调用的：也就是它的调用位置中，是通过某个对象发起的函数调用。

我们通过几个案例来看一下，常见的隐式绑定

```js
// 通过对象调用

function foo() {
  console.log(this) // obj 对象
}

var obj = {
  name: 'why',
  foo,
}

obj.foo()
```

```js
function foo() {
  console.log(this)
}

var obj1 = {
  name: 'obj1',
  foo,
}

var obj2 = {
  name: 'obj2',
  obj1,
}

obj2.obj1.foo()
```

## 规则三：显示绑定

隐式绑定有一个前提条件：

必须在调用的对象内部有一个对函数的引用（比如一个属性）；如果没有这样的引用，在进行调用时，会报找不到该函数的错误；正是通过这个引用，间接的将 this 绑定到了这个对象上；

如果我们不希望在 对象内部 包含这个函数的引用，同时又希望在这个对象上进行强制调用，该怎么做呢？

JavaScript 所有的函数都可以使用 call 和 apply 方法（这个和 Prototype 有关）。

它们两个的区别这里不再展开；其实非常简单，第一个参数是相同的，后面的参数，apply 为数组，call 为参数列表；

这两个函数的第一个参数都要求是一个对象，这个对象的作用是什么呢？就是给 this 准备的。在调用这个函数时，会将 this 绑定到这个传入的对象上。

因为上面的过程，我们明确的绑定了 this 指向的对象，所以称之为 显示绑定。

## call、apply、bind

通过 call 或者 apply 绑定 this 对象; 显示绑定后，this 就会明确的指向绑定的对象

```js
function foo() {
  console.log(this)
}

foo.call(window) // window
foo.call({ name: 'why' }) // {name: 'why'}
foo.call(123) // Number对象
```

如果我们希望一个函数总是显示的绑定到一个对象上，可以怎么做呢？

```js
function foo() {
  console.log(this)
}

var obj = {
  name: 'why',
}

var bar = foo.bind(obj)

bar() // obj对象
```

## 内置函数的绑定思考

有些时候，我们会调用一些 JavaScript 的内置函数，或者一些第三方库中的内置函数。这些内置函数会要求我们传入另外一个函数；我们自己并不会显示的调用这些函数，而且 JavaScript 内部或者第三方库内部会帮助我们执行；这些函数中的 this 又是如何绑定的呢？

setTimeout

```js
setTimeout(function () {
  console.log(this) // window
}, 1000)
```

数组的 forEach

```js
var names = ['abc', 'cba', 'nba']
var obj = { name: 'why' }

names.forEach(function (item) {
  console.log(this) // obj对象
}, obj)
```

div 的点击

```js
var box = document.querySelector('.box')
box.onclick = function () {
  console.log(this === box) // true
}
```

## new 绑定

JavaScript 中的函数可以当做一个类的构造函数来使用，也就是使用 new 关键字。

使用 new 关键字来调用函数是，会执行如下的操作：

1. 创建一个全新的对象；
2. 这个新对象会被执行 prototype 连接；
3. 这个新对象会绑定到函数调用的 this 上（this 的绑定在这个步骤完成）；
4. 如果函数没有返回其他对象，表达式会返回这个新对象；

```js
function Person(name) {
  console.log(this) // Person {}
  this.name = name
}

var p = new Person('why')
console.log(p)
```

## 规则优先级

学习了四条规则，接下来开发中我们只需要去查找函数的调用应用了哪条规则即可，但是如果一个函数调用位置应用了多
条规则，优先级谁更高呢？

- 默认规则的优先级最低
  毫无疑问，默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定 this

- 显示绑定优先级高于隐式绑定

```js
var obj = {
  name: 'obj',
  foo: function () {
    console.log(this)
  },
}

obj.foo()

// 1.call/apply的显示绑定高于隐式绑定
obj.foo.apply('abc')
obj.foo.call('abc')
```

```js
// 2.bind的优先级高于隐式绑定
var bar = obj.foo.bind('cba')
bar()
// 3.更明显的比较
function foo() {
  console.log(this)
}

var obj = {
  name: 'obj',
  foo: foo.bind('aaa'),
}

obj.foo()
```

- new 绑定优先级高于隐式绑定

```js
var obj = {
  name: 'obj',
  foo: function () {
    console.log(this)
  },
}

// new的优先级高于隐式绑定
var f = new obj.foo()
```

- new 绑定优先级高于 bind
  - new 绑定和 call、apply 是不允许同时使用的，所以不存在谁的优先级更高
  - new 绑定可以和 bind 一起使用，new 绑定优先级更高

```js
// 结论: new关键字不能和apply/call一起来使用

// new的优先级高于bind
function foo() {
  console.log(this)
}

var bar = foo.bind('aaa')

var obj = new bar()

// new绑定 > 显示绑定(apply/call/bind) > 隐式绑定(obj.foo()) > 默认绑定(独立函数调用)
```

## this 规则之外 – 忽略显示绑定

我们讲到的规则已经足以应付平时的开发，但是总有一些语法，超出了我们的规则之外。（神话故事和动漫中总是
有类似这样的人物）;

如果在显示绑定中，我们传入一个 null 或者 undefined，那么这个显示绑定会被忽略，使用默认规则：

```js
function foo() {
  console.log(this)
}

foo.apply('abc')
foo.apply({})

// apply/call/bind: 当传入null/undefined时, 自动将this绑定成全局对象
foo.apply(null)
foo.apply(undefined)

var bar = foo.bind(null)
bar()
```

## this 规则之外 - 间接函数引用

另外一种情况，创建一个函数的 间接引用，这种情况使用默认绑定规则。赋值(obj2.foo = obj1.foo)的结果是 foo 函数；foo 函数被直接调用，那么是默认绑定；

```js
var obj1 = {
  name: 'obj1',
  foo: function () {
    console.log(this)
  },
}

var obj2 = {
  name: 'obj2',
}

// obj2.bar = obj1.foo
// obj2.bar()

;(obj2.bar = obj1.foo)()
```

## 箭头函数 arrow function

箭头函数是 ES6 之后增加的一种编写函数的方法，并且它比函数表达式要更加简洁：箭头函数不会绑定 this、arguments 属性；箭头函数不能作为构造函数来使用（不能和 new 一起来使用，会抛出错误）；

箭头函数如何编写呢？ (): 函数的参数 {}: 函数的执行体

```js
// 1.编写箭头函数
// 1> (): 参数
// 2> =>: 箭头
// 3> {}: 函数的执行体
var foo = (num1, num2, num3) => {
  console.log(num1, num2, num3)
  var result = num1 + num2 + num3
  console.log(result)
}

function bar(num1, num2, num3) {}

// 高阶函数在使用时, 也可以传入箭头函数
var nums = [10, 20, 45, 78]
nums.forEach((item, index, arr) => {})
```

## 箭头函数的编写优化

箭头函数有一些常见的简写:

简写一: 如果参数只有一个, ()可以省略

```js
nums.forEach((item) => {
  console.log(item)
})
```

简写二: 如果函数执行体只有一行代码, 那么{}也可以省略

```js
// 强调: 并且它会默认将这行代码的执行结果作为返回值
nums.forEach((item) => console.log(item))
var newNums = nums.filter((item) => item % 2 === 0)
console.log(newNums)

// filter/map/reduce
var result = nums
  .filter((item) => item % 2 === 0)
  .map((item) => item * 100)
  .reduce((preValue, item) => preValue + item)
console.log(result)
```

简写三: 如果一个箭头函数, 只有一行代码, 并且返回一个对象, 这个时候如何编写简写

```js
// var bar = () => {
//   return { name: "why", age: 18 }
// }

var bar = () => ({ name: 'why', age: 18 })
```

## this 规则之外 – ES6 箭头函数

箭头函数不使用 this 的四种标准规则（也就是不绑定 this），而是根据外层作用域来决定 this。

我们来看一个模拟网络请求的案例：

这里我使用 setTimeout 来模拟网络请求，请求到数据后如何可以存放到 data 中呢？

- 我们需要拿到 obj 对象，设置 data；
- 但是直接拿到的 this 是 window，我们需要在外层定义：var \_this = this
- 在 setTimeout 的回调函数中使用\_this 就代表了 obj 对象

```js
var obj = {
  data: [],
  getData: function () {
    // 发送网络请求, 将结果放到上面data属性中
    // 在箭头函数之前的解决方案
    var _this = this
    setTimeout(function () {
      var result = ['abc', 'cba', 'nba']
      _this.data = result
    }, 2000)
  },
}
```

## ES6 箭头函数 this

之前的代码在 ES6 之前是我们最常用的方式，从 ES6 开始，我们会使用箭头函数：

为什么在 setTimeout 的回调函数中可以直接使用 this 呢？因为箭头函数并不绑定 this 对象，那么 this 引用就会从上层作用于中找到对应的 this

```js
var obj = {
  data: [],
  getData: function () {
    // 箭头函数之后
    setTimeout(() => {
      var result = ['abc', 'cba', 'nba']
      this.data = result
    }, 2000)
  },
}
```

思考：如果 getData 也是一个箭头函数，那么 setTimeout 中的回调函数中的 this 指向谁呢？

```js
var obj = {
  data: [],
  getData: () => {
    setTimeout(() => {
      console.log(this) // window
    }, 2000)
  },
}
```

## 面试题一

```js
var name = 'window'

var person = {
  name: 'person',
  sayName: function () {
    console.log(this.name)
  },
}

function sayName() {
  var sss = person.sayName
  sss() // window: 独立函数调用
  person.sayName() // person: 隐式调用
  // (person.sayName)(); // person: 隐式调用
  ;(b = person.sayName)() // window: 赋值表达式(独立函数调用)
}

sayName()
```

## 面试题二

```js
var name = 'window'

var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  },
}

var person2 = { name: 'person2' }

// person1.foo1(); // person1(隐式绑定)
// person1.foo1.call(person2); // person2(显示绑定优先级大于隐式绑定)

// person1.foo2(); // window(不绑定作用域,上层作用域是全局)
// person1.foo2.call(person2); // window

// person1.foo3()(); // window(独立函数调用)
// person1.foo3.call(person2)(); // window(独立函数调用)
// person1.foo3().call(person2); // person2(最终调用返回函数式, 使用的是显示绑定)

// person1.foo4()(); // person1(箭头函数不绑定this, 上层作用域this是person1)
// person1.foo4.call(person2)(); // person2(上层作用域被显示的绑定了一个person2)
// person1.foo4().call(person2); // person1(上层找到person1)
```

## 面试题三

```js
var name = 'window'

function Person(name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  }
  this.foo2 = () => console.log(this.name)
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo1() // person1
person1.foo1.call(person2) // person2(显示高于隐式绑定)

person1.foo2() // person1 (上层作用域中的this是person1)
person1.foo2.call(person2) // person1 (上层作用域中的this是person1)

person1.foo3()() // window(独立函数调用)
person1.foo3.call(person2)() // window
person1.foo3().call(person2) // person2

person1.foo4()() // person1
person1.foo4.call(person2)() // person2
person1.foo4().call(person2) // person1
```

## 面试题四

```js
var name = 'window'

function Person(name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    },
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()() // window
person1.obj.foo1.call(person2)() // window
person1.obj.foo1().call(person2) // person2

person1.obj.foo2()() // obj
person1.obj.foo2.call(person2)() // person2
person1.obj.foo2().call(person2) // obj
```
