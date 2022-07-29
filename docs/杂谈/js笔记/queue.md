---
title: JavaScript 数据结构之队列
date: 2019-02-15 01:00:20
categories:
 - frontEnd
tags:
 - js 
---

## 一、认识队列(queue)

示意图

![queue.jpg](https://upload-images.jianshu.io/upload_images/12493822-f26cd541c756ea2e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


队列是一种受限的线性表，先进先出(FIFO)

- 只能在表的前端删除元素
- 只能在表的后端添加元素

生活的排队，打印机对文档的打印， 多线程中的线程队列，都是队列的场景

## 二、 队列的实现

可基于数组, 也可基于链表，基于链表实现队列，效率会更高一些

基于数组实现队列

```js
class Queue {
  constructor() {
    this.items = [];
  }

  // 向队列尾部添加一个新的元素
  enqueue(element) {
    this.items.push(element);
  }

  // 移除队列的第一项，并返回被移除的元素
  dequeue() {
    return this.items.shift();
  }

  // 返回队列中的第一个元素
  front() {
    return this.items[0];
  }

  // 判断队列是否为空队列
  isEmpty() {
    return this.items.length === 0;
  }

  // 返回队列的元素个数
  size() {
    return this.items.length;
  }

  // 将队列中的内容，转成字符串的形式
  toString() {
    return this.items.reduce((result, item) => result + item + " ", "").trim();
  }
}
```

代码验证：

```js
const queue = new Queue();
queue.enqueue(98);
queue.enqueue(24);
queue.enqueue(424);
console.log(queue.toString()); // 98 24 424
queue.dequeue();
console.log(queue.toString()); // 24 424
console.log(queue.front()); // 24
console.log(queue.isEmpty()); // false
queue.dequeue();
queue.dequeue();
console.log(queue.isEmpty()); // true
```

## 三、 案例： 击鼓传花

规则：

- 所有人围成一圈，从某人手里开始向旁边的同学传一束花
- 有人在旁边数数，数到某个数字时，花落在谁的手里，谁就被淘汰
- 求出最后的胜出者

```js
function drummingFlower(nameList, num) {
  // 创建队列
  const queue = new Queue();

  // 将所有人加入队列
  for (const name of nameList) {
    queue.enqueue(name);
  }

  while (queue.size() > 1) {
    // 开始数数，不是 num 时，移到队尾
    for (let i = 0; i < num - 1; i++) {
      queue.enqueue(queue.dequeue());
    }
    // 数到num时，移出队列
    queue.dequeue();
  }

  return queue.front();
}

const nameList = ["a", "b", "c", "d", "e"];
console.log(drummingFlower(nameList, 5)); // b
```

## 四、优先级队列

### 1 认识优先级队列

优先级队列，在插入一个元素的时候会考虑该数据的优先级,和其它数据进行比较，比较完成后，可以得出这个元素在队列中的正确位置

例子

- 登机的顺序，头等舱和商务舱优先级高于经济舱
- 救援的顺序，老人、孕妇和小孩的优先级高于其它人
- 医院急诊科，严重患者的优先级高于轻微患者

### 2 优先级队列的实现

```js
class PriorityQueue extends Queue {
  constructor() {
    super();
    this.items = [];
  }

  // 插入, 我们认为 priority 的值越小， 优先级越高
  enqueue(element, priority) {
    const queueElement = { element, priority };

    // 判断队列是否为空
    if (this.isEmpty()) {
      this.items.push(queueElement);
    } else {
      let isAdded = false;
      for (let i = 0; i < this.size(); i++) {
        const item = this.items[i];
        if (queueElement.priority < item.priority) {
          this.items.splice(i, 0, queueElement);
          isAdded = true;
          break;
        }
      }
      if (!isAdded) {
        this.items.push(queueElement);
      }
    }
  }

  // 将队列中的内容，转成字符串的形式
  toString() {
    return this.items
      .reduce((result, item) => result + item.element + " ", "")
      .trim();
  }
}
```

代码验证

```js
const priorityQueue = new PriorityQueue();

priorityQueue.enqueue("a", 39);
priorityQueue.enqueue("b", 10);
priorityQueue.enqueue("c", 44);
priorityQueue.enqueue("d", 8);

console.log(priorityQueue.toString()); // d b a c
```
