---
title: JavaScript 数据结构之链表
date: 2019-02-16 20:08:50
categories:
 - frontEnd
tags:
 - js 
---

## 一、 单向链表

要存储多个元素，数组可能是最常用的数据结构, 但数组存在一些缺点

- 创建数组需要申请一段连续的内存空间，并且大小是固定的， 当数组容量不够时，就要进行扩容
- 删除或插入开头或中间位置的元素时，需要进行大量元素的位移
- JavaScript 中的 Array 提供了一些方法帮助我们做这些事情， 但背后的原理依然是这样的

另一种存储数据的线性结构是链表

- 链表中的元素在内存中不必是连续的空间
- 链表中每一个元素由, 一个存储元素本身的节点和指向下一个元素的引用组成
- 链表不必在创建是就确定大小，大小可以无限延伸
- 链表在插入和删除数据时，时间复杂度可以达到 O(1), 效率比数组高很多

链表的缺点

- 链表访问任何一个位置上的元素时，都需要从头开始访问, 直到找到对应的元素
- 无法通过下标值，直接访问元素

- 链表的示意图

![link.jpg](https://upload-images.jianshu.io/upload_images/12493822-505d9f434fdbc9e8.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 二、单向链表的实现

```js
// 链表节点结构类
class Node {
  constructor(data) {
    // 节点数据
    this.data = data;
    // 指向下一个指针
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    // 链表头指针
    this.head = null;
    // 链表数据长度
    this.length = 0;
  }

  // 尾部添加新节点
  append(data) {
    const newNode = new Node(data);
    if (this.length === 0) {
      this.head = newNode;
    } else {
      let current = this.head;
      // 循环找到链表中的最后一个节点
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length += 1;
  }

  // 向特定位置插入新节点
  insert(position, data) {
    // 越界判断
    if (position < 0 || position > this.length) {
      return false;
    }
    const newNode = new Node(data);
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let index = 0;
      let previous = null;
      let current = this.head;
      while (index < position) {
        previous = current;
        current = current.next;
        index += 1;
      }
      previous.next = newNode;
      newNode.next = current;
    }
    this.length += 1;
    return true;
  }

  // 获取对应位置的节点
  _getNode(position) {
    // 越界判断
    if (position < 0 || position >= this.length) {
      return null;
    }
    // 类型检测
    if (typeof position !== "number") {
      return null;
    }
    let current = this.head;
    let index = 0;
    while (index < position) {
      current = current.next;
      index += 1;
    }
    return current;
  }

  // 获取对应位置的元素
  get(position) {
    let current = this._getNode(position);
    if (current === null) return null;
    return current.data;
  }

  // 返回元素在链表中的索引
  indexOf(data) {
    let index = 0;
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return index;
      }
      index += 1;
      current = current.next;
    }
    return -1;
  }

  // 修改某个位置的元素
  update(position, data) {
    let current = this._getNode(position);
    if (current === null) return false;
    current.data = data;
    return true;
  }

  // 删除链表特定位置的元素
  removeAt(position) {
    // 越界判断
    if (position < 0 || position >= this.length) {
      return null;
    }
    let current = this.head;
    if (position === 0) {
      this.head = current.next;
    } else {
      let index = 0;
      let previous = null;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.length -= 1;
    return current.data;
  }

  // 删除列表中特定的元素
  remove(data) {
    const index = this.indexOf(data);
    return this.removeAt(index);
  }

  // 判断列表是否为空
  isEmpty() {
    return this.length === 0;
  }

  // 返回链表元素个数
  size() {
    return this.length;
  }

  // 返回链表内容的字符串形式
  toString() {
    let current = this.head;
    let str = "";
    while (current) {
      str += current.data + " ";
      current = current.next;
    }
    return str.trim();
  }
}
```

## 三、双向链表

单向链表，只能从头遍历到尾部，链表相连的过程是单向的，每个节点上有一个指向下一个节点的引用, 获取下一个节点时很轻松，当想获取上一个节点就比较麻烦

双向链表：

- 既可以从头遍历到尾，也可以从尾遍历到头
- 一个节点同时保存着, 指向上一个节点的引用和指向下一个节点的引用
- 比单向链表使用起来更加便利

双向链表的缺点：

- 插入和删除节点时，需要同时处理四个引用，实现逻辑并单向链表复杂
- 占用更多的内存空间

示意图

![double_link.jpg](https://upload-images.jianshu.io/upload_images/12493822-9e06dbc947543cd3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 四、 双向链表的实现

```js
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 在尾部追加数据
  append(data) {
    const newNode = new Node(data);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length += 1;
  }

  // 在任意位置插入数据
  insert(position, data) {
    // 越界判断
    if (position < 0 || position > this.length) {
      return false;
    }

    const newNode = new Node(data);

    if (position === 0) {
      // 插入到头部
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
      }
    } else if (position === this.length) {
      // 插入到尾部
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      // 插入到中间
      let index = 0;
      let current = this.head;
      let previous = null;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }

      newNode.next = current;
      newNode.prev = previous;
      previous.next = newNode;
      current.prev = newNode;
    }
    this.length += 1;
    return true;
  }

  // 根据位置删除对应的元素
  removeAt(position) {
    // 越界判断
    if (position < 0 || position >= this.length) {
      return null;
    }

    let current = this.head;
    if (position === 0) {
      // 删除第一个节点
      if (this.length === 1) {
        this.prev = null;
        this.next = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
    } else if (position === this.length - 1) {
      // 删除最后一个节点
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = null;
    } else {
      // 删除中间的节点
      let index = 0;
      let previous = null;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }

      previous.next = current.next;
      current.next.prev = previous;
    }
    this.length -= 1;
    return current.data;
  }

  // 获取第一个元素
  getHead() {
    return this.head ? this.head.data : null;
  }

  // 获取最后一个元素
  getTail() {
    return this.tail ? this.tail.data : null;
  }

  // 正向遍历
  forwardString() {
    return this.toString();
  }

  // 反向遍历
  reverseString() {
    let current = this.tail;
    let str = "";
    while (current) {
      str += current.data + " ";
      current = current.prev;
    }
    return str.trim();
  }
}
```
