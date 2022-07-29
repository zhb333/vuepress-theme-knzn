---
title: JavaScript Symbol详解
date: 2018-06-27 10:36:20
categories:
 - frontEnd
tags:
 - js 
---

## 一、基础

- 1 Symbol 表示独一无二的值
```js
const s1 = Symbol()
console.log(s1) // Symbol()

const s2 = Symbol()
console.log(s1 === s2) // false

const s3 = Symbol('name')
console.log(s3) // Symbol(name)
const s4 = Symbol('name')
console.log(s4) // Symbol(name)

console.log(s3 === s4); // false

```

- 2 传入的参数不是字符串时会自动转换为字符串
```js
const s5 = Symbol({})
console.log(s5) // Symbol([object Object])
```

- 3 Symbol值不能参与数学运算

```js
console.log(s5 + '-a') // 报错 Uncaught TypeError: Cannot convert a Symbol value to a string
```
- 4 Symbol值 可以转换为字符串 

```js
console.log(s5.toString() + '-a') // Symbol([object Object])-a
```

- 5 Symbol值 转换为布尔值是为 true
```js
console.log(!!s1 || !!s2 || !!s3 || !!s4 || !!s5) // true
```
- 6 Symbol.prototype.description 返回 Symbol 的描述

```js
const sym = Symbol('foo');

console.log(sym.description) // "foo" 
```

## 二、作为属性名

- 第一种写法
```js
const mySymbol = Symbol()
let a = {}
a[mySymbol] = 'a'
```
- 第二种写法
```js
let a = {
    [mySymbol] :'a'
}
```
- 第三种写法
```js
Object.defineProperty(a, mySymbol, { value: 'a' })
```
## 三、属性名的遍历

- for in 遍历不到 Symbol值的属性
```js
const info = {
    [s3]: 'lucy',
    age: 18
}

console.log(info) // {Symbol(name): "lucy"}

for(const key in info) {
    console.log(key);
}
```
- Object.keys 获取不到Symbol值的属性
```js
console.log(Object.keys(info)) // ["age"]
```

- Object.getOwnPropertyNames获取不到Symbol值的属性

```js
console.log(Object.getOwnPropertyNames(info)) // ["age"]
```

- JSON.stringify不会解析Symbol值的属性
```js
console.log(JSON.stringify(info)) // {"age":18}
```

- Object.getOwnPropertySymbols 获取对象中Symbol值属性名组成的数组 
```js
console.log(Object.getOwnPropertySymbols(info)) // [Symbol(name)]
```

- Reflec.ownKeys 获取对象自身的所有属性名，包括Symbol值的属性名
```js
console.log(Reflect.ownKeys(info)) // ["age", Symbol(name)]
```

## 四、Symbol的静态方法 Symbol.for、Symbol.keyFor
- Symbol.for() 方法
接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。
如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
```js
const s3 = Symbol('name')
const s6 = Symbol.for('name')
const s7 = Symbol.for('name')

console.log(s6 === s7) // true
console.log(s6 === s3) // false
```

- Symbol.keyFor() 方法 返回使用 Symbol.for 创建的 Symbol 值的 key

```js
console.log(Symbol.keyFor(s6)) // name
console.log(Symbol.keyFor(s3)) // undefined
```
## 五、11个内置Symbol值

- Symbol.hasInstance

对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，`foo instanceof Foo`在语言内部，实际调用的是`Foo[Symbol.hasInstance](foo)`。

```js
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true
```

```js
class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}

// 等同于
const Even = {
  [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
};

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false
```

- Symbol.isConcatSpreadable

对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。

```js
// 数组的默认行为是可以展开，Symbol.isConcatSpreadable默认等于undefined。该属性等于true时，也有展开的效果。
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
```

类数组也可以运用 Symbol.isConcatSpreadable
```js
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']
```

Symbol.isConcatSpreadable属性也可以定义在类里面

```js
class A1 extends Array {
    constructor(...args) {
        super(...args)
        this[Symbol.isConcatSpreadable] = true
    }
}

class A2 extends Array {
    constructor(...args) {
        super(...args)
    }

    get [Symbol.isConcatSpreadable] () {
        return false
    }
}

let a1 = new A1(3, 4)
let a2 = new A2(5, 6)

console.log([1, 2].concat(a1, a2)) // [1, 2, 3, 4, [5, 6]]
```

- Symbol.species
对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。

Symbol.species的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。

```js
class MyArray extends Array {
}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray // true
c instanceof MyArray // true
```

Symbol.species 的默认实现为：
```js
static get [Symbol.species]() {
  return this;
}
```

修改衍生对象指向的构造函数
```js
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}

const a = new MyArray();
const b = a.map(x => x);

b instanceof MyArray // false
b instanceof Array // true
```

另一个例子

```js
class T1 extends Promise {
}

class T2 extends Promise {
  static get [Symbol.species]() {
    return Promise;
  }
}

new T1(r => r()).then(v => v) instanceof T1 // true
new T2(r => r()).then(v => v) instanceof T2 // false
```

- Symbol.match
对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。

```js
class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

const myMatcher = new MyMatcher()

'e'.match(myMatcher) // 1

// 等同于
myMatcher[Symbol.match]('e') // 1
```

- Symbol.replace
对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值

```js
const x = {};
x[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(x, 'World') // ["Hello", "World"]
// 等同于
x[Symbol.replace]('Hello', 'World')
```

- Symbol.search
对象的Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值

```js
class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}

const mySearch = new MySearch('foo')
'foobar'.search(mySearch) // 0
// 等同于
mySearch[Symbol.search]('foobar')
```

- Symbol.split
```js
class MySplitter {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    let index = string.indexOf(this.value);
    if (index === -1) {
      return string;
    }
    return [
      string.substr(0, index),
      string.substr(index + this.value.length)
    ];
  }
}

const mySplitter = new MySplitter('foo')

'foobar'.split(mySplitter) // ['', 'bar']
// 等同于
mySplitter[Symbol.split]('foobar')
```

- Symbol.iterator
对象的Symbol.iterator属性，指向该对象的默认遍历器方法。

```js
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

```js
class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

for(let value of myCollection) {
  console.log(value);
}
// 1
// 2
```

- Symbol.toPrimitive
对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

- Number：该场合需要转成数值

- String：该场合需要转成字符串

- Default：该场合可以转成数值，也可以转成字符串


```js
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```

- Symbol.toStringTag

对象的Symbol.toStringTag属性，指向一个方法。 这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串

```js
console.log({[Symbol.toStringTag]: 'Foo'}.toString()) // "[object Foo]"

class MyStringTag {
    get [Symbol.toStringTag] () {
        return 'xxx'
    }
}

let obj2 = new MyStringTag()
console.log(obj2.toString()) // "[object xxx]"
```

- Symbol.unscopables
对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。

```js
Array.prototype[Symbol.unscopables]
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   includes: true,
//   keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']
```

symbol.unscopeables 的使用
```js
// 没有 unscopables 时
class MyClass {
  foo() { return 1; }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 1
}

// 有 unscopables 时
class MyClass {
  foo() { return 1; }
  get [Symbol.unscopables]() {
    return { foo: true };
  }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 2
}
```


参照：阮一峰 [Symbol](https://es6.ruanyifeng.com/#docs/symbo)
