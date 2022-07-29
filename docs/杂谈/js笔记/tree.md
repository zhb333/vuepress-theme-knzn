---
title: JavaScript 数据结构之二叉搜索树
date: 2019-03-27 10:36:20
categories:
 - frontEnd
tags:
 - js 
---

## 一、认识树结构

树结构示意图

![tree.jpg](https://upload-images.jianshu.io/upload_images/12493822-21ec03db150c0a89.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


树结构中的一些术语

树(Tree): n(n>=0) 个节点构成的有限集合

- n = 0 时, 称为空树
- 根节点(Root): 树的第一个节点，称为根节点
- 子树(SubTree): 根节点下的子节点，又可以形成新的树，称为子树
- 节点的度(Degree): 节点的直接子节点个数
- 树的度：所有节点中节点度数的最大值
- 叶子节点(Leaf)： 度为 0 的节点，即没有子节点的节点
- 父节点(Parent)：有子节点的节点，相对于子节点，称为父节点
- 子节点(Child): 有父节点的节点，相对于父节点，称为子节点
- 兄弟节点(Sibling): 具有同一父节点的节点，彼此之间是兄弟节点
- 路径: 从节点 n1 到 nk 经过的节点个数(n1...nk)，称为路径
- 路径的长度：从节点 n1 到 nk 经过的边的个数，称为长度
- 节点的层次(Level): 规定根节点在第一层，其它任一节点的层数是其父节点从层数加 1
- 树是深度(Depth): 树中所有节点的最大层次，就是这棵树的深度

## 二、 树结构的表示方式

最普通的表示方式

![tree_normal.jpg](https://upload-images.jianshu.io/upload_images/12493822-f83a7c96f1ff03aa.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


上面的树结构中，节点的子节点个数不确定，创建节点的代码难以统一编写

儿子-兄弟表示法

![tree_son_brother.jpg](https://upload-images.jianshu.io/upload_images/12493822-4749792584e32beb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


上面的树结构，创建节点的方法可以表示为

```js
class Node {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.brother = null;
  }
}
```

儿子-兄弟表示法旋转

![tree_rotate.jpg](https://upload-images.jianshu.io/upload_images/12493822-14098311e7cffe3e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


将拥有任意个子节点的树，通过儿子兄弟法表示，然后顺时针旋转 45 度，就得到了一棵二叉树

因此，可以得出结论： 任意一棵树，都可以转换为二叉树

## 二、 二叉树的概念

二叉树： 每一个节点，最多有两个子节点的树

二叉树的特性

- 二叉树的第 i 层，最多可以有 2^(i-1) 个节点; i >= 1
- 深度为 k 的二叉树， 节点总数最多为 2^k - 1 个; k >= 1
- 二叉树的叶子节点数记做 n0, 度为 2 的节点数记为 n2, 两者满足关系 n0 = n2 + 1

完美二叉树: 除了最后一层的叶子节点， 其余每一层的节点都有两个子节点，这样的树称为完美二叉树

![tree_perfect.jpg](https://upload-images.jianshu.io/upload_images/12493822-3e5b66c7a06122cb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


完全二叉树：除了最后一层的叶子节点，其余每一层的节点数都达到最大，且最后一层从左到右的节点需要连续存在，只能缺少右侧的若干节点

![tree_complete.jpg](https://upload-images.jianshu.io/upload_images/12493822-124b3ea8795f9d81.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 三、 二叉搜索树(BST, Binary Search Tree)

### 1. 二叉搜索树的性质

- 非空左子树所有节点的键值小于父节点的键值
- 非空右子树所有节点的键值大于父节点的键值
- 左右子树本身也是二叉搜索树

二叉搜索树的特点： 相对较小的值总是保存在左节点上，相对较大的值总是保存在右节点上

### 2. 二叉搜索的遍历方式

先序遍历: 根节点 -> 左子树 -> 右子树

![tree_pre_order.jpg](https://upload-images.jianshu.io/upload_images/12493822-8481fe2184000776.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


中序遍历: 左子树 -> 根节点 -> 右子树

![tree_in_order.jpg](https://upload-images.jianshu.io/upload_images/12493822-39fd09f8758c3b70.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


后序遍历: 左子树 -> 右子树 -> 根节点

![tree_post_order.jpg](https://upload-images.jianshu.io/upload_images/12493822-2b250d47e914fa72.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 3. 二叉搜索的删除

删除二叉搜索树中的节点，首先需要找到这个节点，然后根据节点的位置进行相应的删除操作

- 情况一： 删除的是叶节点， 判断该叶节点是左子节点还是右子节点， 将父节点的左子节点或右子节点设为 null
- 情况二： 删除的节点只有一个子节点, 判断该叶节点是左子节点还是右子节点，将父节点的左子节点或右子节点设为该节点的子节点
![tree_del_1.jpg](https://upload-images.jianshu.io/upload_images/12493822-036ea934c982d659.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- 情况三： 删除的节点只两个子节点, 甚至子节点下面还有子节点,需要找到该节点的前驱（该节点的左子树中的最大值）, 或找到该节点的后继（该节点的右子树中的最小值）, 来替换该节点
![tree_del_2.jpg](https://upload-images.jianshu.io/upload_images/12493822-ae1b38272dea7d60.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 四、 二叉搜索树的实现

```js
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySerachTree {
  constructor() {
    this.root = null;
  }

  // 插入操作
  insert(key) {
    const newNode = new Node(key);

    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      // 向左子树插入数据
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      // 向右子树插入数据
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // 查找操作, 找到返回 true , 否则返回 false
  search(key) {
    const node = this.searchNode(key);
    return !!node;
  }

  searchNode(key) {
    if (!this.root) {
      return null;
    }
    let node = this.root;
    while (node) {
      if (node.key > key) {
        node = node.left;
      } else if (node.key < key) {
        node = node.right;
      } else {
        // 相等的情况
        return node;
      }
    }

    return null;
  }

  // 先序遍历 根节点 -> 左子树 -> 右子树
  preOrderTraversal(handler) {
    this.preOrderTraversalNode(this.root, handler);
  }

  preOrderTraversalNode(node, handler) {
    if (!node) {
      return;
    }

    handler(node.key);
    this.preOrderTraversalNode(node.left, handler);
    this.preOrderTraversalNode(node.right, handler);
  }

  // 中序遍历 左子树 -> 根节点 -> 右子树
  inOrderTraversal(handler) {
    this.inOrderTraversalNode(this.root, handler);
  }

  inOrderTraversalNode(node, handler) {
    if (!node) {
      return;
    }

    this.inOrderTraversalNode(node.left, handler);
    handler(node.key);
    this.inOrderTraversalNode(node.right, handler);
  }

  // 后序遍历 左子树 -> 右子树 -> 根节点
  postOrderTraversal(handler) {
    this.postOrderTraversalNode(this.root, handler);
  }

  postOrderTraversalNode(node, handler) {
    if (!node) {
      return;
    }

    this.postOrderTraversalNode(node.left, handler);
    this.postOrderTraversalNode(node.right, handler);
    handler(node.key);
  }

  // 最小值
  min() {
    let node = this.root;
    if (!node) {
      return;
    }
    while (node.left) {
      node = node.left;
    }
    return node.key;
  }

  // 最大值
  max() {
    let node = this.root;
    if (!node) {
      return;
    }
    while (node.right) {
      node = node.right;
    }
    return node.key;
  }

  remove(key) {
    let current = this.root;
    let parent = this.root;
    let isLeftChild = true;

    // 1. 查找节点
    while (current.key !== key) {
      parent = current;
      if (key < current.key) {
        isLeftChild = true;
        current = current.left;
      } else {
        isLeftChild = false;
        current = current.right;
      }

      // current 为null 时，说明二叉树中不存在该数据
      if (!current) {
        return false;
      }
    }

    if (!current.left && !current.right) {
      // 2.要删除的是叶子节点
      if (current === this.root) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (!current.right) {
      // 3. 要删除的节点只有一个左子节点
      if (current === this.root) {
        this.root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else if (!current.left) {
      // 4. 要删除的节点只有一个右子节点
      if (current === this.root) {
        this.root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    } else {
      // 5. 要删除的节点有两个子节点
      const successor = this.getSuccessor(current);
      if (current === this.root) {
        this.root = successor;
      } else if (isLeftChild) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }
      successor.left = current.left;
    }
    return true;
  }

  // 获取后继节点
  getSuccessor(node) {
    let successor = node;
    let current = node.right;
    let parent = node;

    while (current) {
      parent = successor;
      successor = current;
      current = current.left;
    }

    // 如果后继节点, 不是删除节点的直接子节点, 需要处理后继节点的右子树
    if (successor !== node.right) {
      parent.left = successor.right; // 后继节点的父节点的左子节点, 设置为后继节点的右节点
      successor.right = node.right; // 设置后继节点的右子树
    }

    return successor;
  }
}
```

## 五、代码测试

```js
// 测试代码
const bst = new BinarySerachTree();

// 插入数据
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

// 前序遍历
let resultString = "前序遍历:";
bst.preOrderTraversal(function (key) {
  resultString += key + " ";
});
console.log(resultString); // 前序遍历:11 7 5 3 6 9 8 10 15 13 12 14 20 18 25

// 中序遍历
resultString = "中序遍历:";
bst.inOrderTraversal(function (key) {
  resultString += key + " ";
});
console.log(resultString); // 中序遍历:3 5 6 7 8 9 10 11 12 13 14 15 18 20 25

// 后续遍历
resultString = "后序遍历:";
bst.postOrderTraversal(function (key) {
  resultString += key + " ";
});
console.log(resultString); // 后序遍历:3 6 5 8 10 9 7 12 14 13 18 25 20 15 11

// 获取最值
console.log("最小值:" + bst.min()); // 最小值:3
console.log("最大值:" + bst.max()); // 最大值:25

// 查找特定的值
console.log(bst.search(10)); // true
console.log(bst.search(21)); // false

// 删除操作
bst.remove(15);
resultString = "删除节点的后继节点，不是直接右子节点的情况测试:";
bst.preOrderTraversal(function (key) {
  resultString += key + " ";
});
console.log(resultString); // 删除节点的后继节点，不是直接右子节点的情况测试:11 7 5 3 6 9 8 10 18 13 12 14 20 25
```
