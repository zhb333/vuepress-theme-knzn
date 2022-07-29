---
title: JavaScript 数据结构之集合
date: 2019-02-17 11:06:58
categories:
 - frontEnd
tags:
 - js 
---

## 一、 集合的介绍

几乎每一种编程语言中，都有集合结构, 常见是实现方式是哈希表，这里我们使用 JavaScript 中的 Object 实现集合

**集合： 由一组无序的，不重复的元素构成**

ES6 中已经实现了 Set 类， 可以直接使用，但为了明确集合内部的实现机制，这里还是封装一下 Set 类

## 二、 集合的基本操作

```js
class Set {
  constructor() {
    this.items = {};
  }

  // 添加新元素
  add(value) {
    if (this.has(value)) {
      return false;
    }

    this.items[value] = value;
    return true;
  }

  // 删除元素
  remove(value) {
    if (!this.has(value)) {
      return false;
    }
    delete this.items[value];
    return true;
  }

  // 检测是否包含特定值
  has(value) {
    return this.items.hasOwnProperty(value);
  }

  // 清空集合
  clear() {
    this.items = {};
  }

  // 返回集合元素个数
  size() {
    return Object.keys(this.items).length;
  }

  // 返回集合值组成的数组
  values() {
    return Object.keys(this.items);
  }
}
```

## 三、 并集

```js
// 并集
union (otherSet) {
  const union = new Set()
  const values = this.values()
  const otherValues = otherSet.values()
  for (const value of values) {
    union.add(value)
  }
  for (const value of otherValues) {
    union.add(value)
  }
  return union
}
```

## 四、 差集

```js
// 差集
difference (otherSet) {
  const difference = new Set()
  const values = this.values()
  for (const value of values) {
    if (!otherSet.has(value)) {
      difference.add(value)
    }
  }
  return difference
}
```

## 五、 交集

```js
// 交集
intersection (otherSet) {
  const intersection = new Set()
  const values = this.values()
  for (const value of values) {
    if (otherSet.has(value)) {
      intersection.add(value)
    }
  }
  return intersection
}
```

## 六、 子集

```js
// 子集
isSubSetOf (otherSet) {
  const values = this.values()
  for (const value of values) {
    if (!otherSet.has(value)) {
      return false
    }
  }
  return true
}
```

## 七、 完整代码

```js
class Set {
  constructor() {
    this.items = {};
  }

  // 添加新元素
  add(value) {
    if (this.has(value)) {
      return false;
    }

    this.items[value] = value;
    return true;
  }

  // 删除元素
  remove(value) {
    if (!this.has(value)) {
      return false;
    }
    delete this.items[value];
    return true;
  }

  // 检测是否包含特定值
  has(value) {
    return this.items.hasOwnProperty(value);
  }

  // 清空集合
  clear() {
    this.items = {};
  }

  // 返回集合元素个数
  size() {
    return Object.keys(this.items).length;
  }

  // 返回集合值组成的数组
  values() {
    return Object.keys(this.items);
  }

  // 并集
  union(otherSet) {
    const union = new Set();
    const values = this.values();
    const otherValues = otherSet.values();
    for (const value of values) {
      union.add(value);
    }
    for (const value of otherValues) {
      union.add(value);
    }
    return union;
  }

  // 交集
  intersection(otherSet) {
    const intersection = new Set();
    const values = this.values();
    for (const value of values) {
      if (otherSet.has(value)) {
        intersection.add(value);
      }
    }
    return intersection;
  }

  // 差集
  difference(otherSet) {
    const difference = new Set();
    const values = this.values();
    for (const value of values) {
      if (!otherSet.has(value)) {
        difference.add(value);
      }
    }
    return difference;
  }

  // 子集
  isSubSetOf(otherSet) {
    const values = this.values();
    for (const value of values) {
      if (!otherSet.has(value)) {
        return false;
      }
    }
    return true;
  }
}
```
