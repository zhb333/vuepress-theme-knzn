---
title: JavaScript 数据结构之哈希表(散列表）
date: 2019-03-17 13:46:08
categories:
 - frontEnd
tags:
 - js 
---

## 一、 哈希表的介绍

### 1. 哈希表的优势

哈希表通常是基于数组实现的，但相对于数组，它有很多优势

- 快速的插入、删除、查找操作， 时间复杂度接近常量值，时间复杂度为 O(1)
- 哈希表的速度比树还要快，代码相对树来说简单很多

### 2. 哈希表的缺点

- 哈希表中的数据没有顺序，因此不能通过固定的方式遍历元素
- 哈希表是通过空间来换取时间是数据结构，通过占用更多的内存空间来提高操作效率

**哈希表的实现是基于数组的下标值的一种变换，这种变换通过哈希函数实现**

### 3. 哈希表的一些概念

- 哈希化： 将大数字转化为数组范围内下标的过程，我们称之为哈希化
- 哈希函数：大数字在进行哈希化的实现逻辑，封装在一个函数中，我们称这个函数为哈希函数
- 哈希表：通过哈希函数得到下标，并将数据插入到数组中，以及其它操作，对整个结构的封装，我们称之为哈希表

### 4. 解决冲突的方法

通过哈希函数得到的下标值，有可能会重复, 常见有两种解决方案

- 链地址法(也叫拉链法)
- 开放地址法

### 5. 链地址法

示意图：

![hash_link.jpg](https://upload-images.jianshu.io/upload_images/12493822-4d066af00b1b8fea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


当哈希表产生冲突时，链地址法是常见的解决冲突的方法，数组中不再存储单一的值，也是存储一个链表(或数组)，将冲突的值依次追加到链表(或数组)中即可

### 6. 开发地址法

开发地址法的主要工作方式是寻找空白的位置来添加重复的数据

寻找空白位置，有三种不同的方法

- 线性探测:
  - 插入元素产生冲突时，也就是位置上已经存在元素，以步长为 1，往后寻找空白位置，并插入数据
  - 线性探测，在插入连续的数据时，会产生聚集，导致冲突数据位置之间的距离很远，影响哈希表的操作效率
- 二次探测
  - 二次探测对步长做了优化，比如下标从 x 开始，那么步长可以是 x + 1, x + 2^2, x + 3^3 ......, 这样探测的距离比较远，可以避免连续数据产生的聚集问题
  - 二次探测的问题是，不断的插入连续的数据，也会产生步长不一的聚集
  - 效率比线性探测高
- 再哈希法
  - 为了解决，线性探测和二次探测可能产生的聚集问题，我们可以使用再哈希法
  - 再哈希法，是使用数据的关键字，用另一个哈希函数，再做一次哈希，用这次哈希化的结果作为步长
  - 再哈希函数的算法
    - stepSize = constant - (key % constant)
    - constant 为小于数组长度的质数
    - key 数据的关键字

开发地址法中查找元素时，也需要安装步长线性查找，但遇到空白位置时，就可以停止查找

开发地址法中删除元素时，不能直接把该元素的位置设为 null, 否则会影响查找操作，应该设置成一个特殊值，当查找时，遇到这个值，才能知道，后面可能还有查找的相关数据

### 7. 哈希化的效率

填充因子 = 总数据项 / 哈希表长度

开发地址法的填充因子，最大值为 1
链地址法的填充因子可以大于 1， 因为数组中存放的是链表，链表上又可以添加多个数据

探测次数与填充因子有关，随着填充因子的增长, 需要探测的次数会越来越多

开发地址法中， 线性探测的效率最低， 二次探测和再哈希法的效率差不多， 这三种算法的探测次数都随着填充因子的增大，呈现指数增长的趋势

链地址法，随填充因子的增大，探测次数与填充因子，呈现线性增长的趋势

因此，链地址法的效率比开放地址法的效率高很多

## 二、 哈希函数

### 1. 优秀的哈希函数

一个好的哈希函数，应该满足：

- 尽可能小的计算量(使用霍纳法则)
- 哈希化的结果，使得元素可以均匀分布在数组中

### 2. 霍纳法则

用于对多项式求值问题

表达式： Pn(x)= anx^n + a(n－1)x^(n-1) + … + a1x + a0 (时间复杂度为 O(n^2))

霍纳法则表示法： ((…(((anx + an － 1)x + an － 2)x + an －3)…)x + a1)x + a0 (时间复杂度为 O(n))

关于霍纳法则，需要去了解其相关介绍

### 3. 质数的使用

使用质数可以使数据尽可能均匀的分布

使用质数的地方有

- 数组的长度
- 幂的底数

### 4. 代码实现

```js
function hashFunc(str, max) {
  let hashCode = 0;
  const primeNum = 37; // 质数

  // 霍纳法则，计算 hashCode
  for (let i = 0; i < str.length; i++) {
    hashCode = primeNum * hashCode + str.charCodeAt(i);
  }

  return hashCode % max;
}
```

## 三、哈希表的实现

```js
class HashTable {
  constructor() {
    this.storage = [];
    this.count = 0;
    this.limit = 7; // 默认数组长度
  }

  // 判断是否是质数
  isPrime(num) {
    const temp = Math.floor(Math.sqrt(num));
    for (let i = 2; i <= temp; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  // 获取质数
  getPrime(num) {
    while (!this.isPrime(num)) {
      num += 1;
    }
    return num;
  }

  // 哈希函数
  hashFunc(str, max) {
    let hashCode = 0;

    // 霍纳算法
    for (let i = 0; i < str.length; i++) {
      hashCode = hashCode * 37 + str.charCodeAt(i);
    }

    return hashCode % max;
  }

  // 插入数据
  put(key, value) {
    // 通过哈希函数计算数组下标
    const index = this.hashFunc(key, this.limit);
    let bucket = this.storage[index];

    if (!bucket) {
      // 计算得到的下标还未存放数据
      bucket = [];
      this.storage[index] = bucket;
    }

    let isOverwrite = false; // 是否为修改操作

    for (const tuple of bucket) {
      // 循环判断是否为修改操作
      if (tuple[0] === key) {
        tuple[1] = value;
        isOverwrite = true;
      }
    }

    if (!isOverwrite) {
      // 不是修改操作，执行插入操作
      bucket.push([key, value]);
      this.count++;

      // 如果填充因子大于 0.75 需要对数组进行扩容
      if (this.count / this.length > 0.75) {
        const primeNum = this.getPrime(this.limit * 2);
        this.resize(primeNum);
      }
    }
  }

  // 获取数据
  get(key) {
    const index = this.hashFunc(key, this.limit);
    const bucket = this.storage[index];
    if (!bucket) {
      return null;
    }
    for (const tuple of bucket) {
      if (tuple[0] === key) {
        return tuple[1];
      }
    }
  }

  // 删除数据
  remove(key) {
    const index = this.hashFunc(key, this.limit);
    const bucket = this.storage[index];
    if (!bucket) {
      return null;
    }
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        bucket.splice(i, 1);
        this.count -= 1;
        // 如果填充因子小于0.25，需要缩小数组容量
        if (this.count / this.limit < 0.25 && this.limit > 7) {
          const primeNum = this.getPrime(Math.floor(this.limit / 2));
          this.resize(primeNum);
        }
        return tuple[1];
      }
    }
    return null;
  }

  // 重新设置数组长度
  resize(newLimit) {
    const oldStorage = this.storage;
    this.limit = newLimit;
    this.count = 0;
    this.storage = [];
    // 将旧数据从新添加到哈希表中
    oldStorage.forEach((bucket) => {
      if (!bucket) {
        return;
      }
      for (const tuple of bucket) {
        this.put(...tuple);
      }
    });
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }
}
```


