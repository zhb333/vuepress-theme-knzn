---
title: 06 JS 额外知识补充
author: 前端程序猿
tags:
  - javascript

categories:
  - 大前端
postImage: /images/javascript.webp
---

## with 语句

with 语句: 可以形成自己的作用域

```js
var obj = { name: 'why', age: 18, message: 'obj message' }

with (info) {
  console.log(name)
}
```

严格模式，不允许使用 with 语句

```js
'use strict'

var info = { name: 'kobe' }
with (info) {
  // 严格模式下不允许使用 "with" 语句。
  console.log(name)
}
```

不建议使用 with 语句，因为它可能是混淆错误和兼容性问题的根源。

```js
var obj = { name: 'why', age: 18, message: 'obj message' }

function foo() {
  var message = 'Hello World'
  with (obj) {
    console.log(message)
  }
}

foo()
```

## eval 函数

eval 是一个特殊的函数，它可以将传入的字符串当做 JavaScript 代码来运行。

```js
var jsString = 'var message = "Hello World"; console.log(message);'

var message = 'aa'

eval(jsString)

console.log(message) // Hello World
```

不建议在开发中使用 eval：

- eval 代码的可读性非常的差（代码的可读性是高质量代码的重要原则）；
- eval 是一个字符串，那么有可能在执行的过程中被刻意篡改，那么可能会造成被攻击的风险；
- eval 的执行必须经过 JS 解释器，不能被 JS 引擎优化；

## 认识严格模式

在 ECMAScript5 标准中，JavaScript 提出了严格模式的概念（Strict Mode）：

严格模式很好理解，是一种具有限制性的 JavaScript 模式，从而使代码隐式的脱离了 ”懒散（sloppy）模式“；支持严格模式的浏览器在检测到代码中有严格模式时，会以更加严格的方式对代码进行检测和执行；

严格模式对正常的 JavaScript 语义进行了一些限制：

- 严格模式通过 抛出错误 来消除一些原有的 静默（silent）错误；
- 严格模式让 JS 引擎在执行代码时可以进行更多的优化（不需要对一些特殊的语法进行处理）；
- 严格模式禁用了在 ECMAScript 未来版本中可能会定义的一些语法；

```js
// 静默错误
true.foo = 'abc'
```

## 开启严格模式

那么如何开启严格模式呢？严格模式通过在文件或者函数开头使用 use strict 来开启。

严格模式支持粒度化的迁移：

可以支持在 js 文件中开启严格模式；

```js
// "use strict"

true.foo = 'abc'
```

也支持对某一个函数开启严格模式；

```js
function foo() {
  'use strict'

  true.foo = 'abc'
}
```

## 严格模式限制

这里我们来说几个严格模式下的严格语法限制：

JavaScript 被设计为新手开发者更容易上手，所以有时候本来错误语法，被认为也是可以正常被解析的；但是这种方式可能给带来留下来安全隐患；在严格模式下，这种失误就会被当做错误，以便可以快速的发现和修正；

1. 无法意外的创建全局变量
2. 严格模式会使引起静默失败的赋值操作抛出异常
3. 严格模式下试图删除不可删除的属性
4. 严格模式不允许函数参数有相同的名称
5. 不允许 0 开头表示的八进制语法, `0o` ES6 的新写法支持
6. 在严格模式下，不允许使用 with
7. 在严格模式下，eval 不再为上层引用变量
8. 严格模式下，this 默认绑定为 `undefined`

```js
'use strict'
// 禁止意外创建全局变量
message = 'Hello World'
console.log(message)
```

```js
'use strict'
// 不允许函数有相同的参数名称
function foo(x, y, x) {
  console.log(x, y, x)
}

foo(10, 20, 30)
```

```js
'use strict'
// 静默错误
true.name = 'abc'
NaN = 123
```

```js
'use strict'
// 试图删除不可删除的属性
var obj = {}
Object.defineProperty(obj, 'name', {
  configurable: false,
  writable: false,
  value: 'why',
})
console.log(obj.name)
// obj.name = "kobe"

delete obj.name
```

```js
'use strict'
// 不允许使用原先的八进制格式 0123
var num = 0o123 // 八进制
var num2 = 0x123 // 十六进制
var num3 = 0b100 // 二进制
console.log(num, num2, num3)
```

```js
// eval函数不会向上引用变量了
var jsString =
  '"use strict"; var message = "Hello World"; console.log(message);'
eval(jsString)

console.log(message) // Uncaught ReferenceError: message is not defined
```

```js
'use strict'

// 在严格模式下, 自执行函数(默认绑定)会指向undefined
function foo() {
  console.log(this)
}
```
