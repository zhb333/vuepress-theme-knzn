---
title: MongoDB 读取文档
date: 2019-09-11 20:53:07
categories:
 - backEnd
tags:
 - mongoDB
---

## 一、`db.collection.find()` 读取文档

> Selects documents in a collection or view and returns a cursor to the selected documents.

选择集合或视图中的文档，并返回所选文档的游标。

```sh
db.collection.find(query, projection)
```

|    参数    |   类型   | 描述                                                                                               |
| :--------: | :------: | :------------------------------------------------------------------------------------------------- |
|   query    | document | (可选的)使用查询操作符指定选择筛选器。若要返回集合中的所有文档，请省略此参数或传递一个空文档({})。 |
| projection | document | (可选的) 指定要在文档中返回与查询筛选器匹配的字段。要返回匹配文档中的所有字段，请省略此参数。      |

读取所有文档

```js
db.department.find({});
```

## 二、匹配查询

- 查询 `name` 为 `lisi` 的文档

  ```js
  db.department.find({ name: "lisi" });
  ```

- 查询 `name` 为 `lisi`, 且 `age` 为 `19` 的文档

  ```js
  db.department.find({ name: "lisi", age: 19 });
  ```

- 查询 `_id.status` 为 `leaving` 的文档（复合查询）

  ```js
  db.department.find({ "_id.status": "leaving" });
  ```

## 三、比较查询操作符

语法：

```sh
{ <field>: { $<operator>: <value> } }
```

- `$eq` 相等

  查询 `name` 为 `lisi`, 且 `age` 为 `19` 的文档

  ```js
  db.department.find({ name: { $eq: "lisi" }, age: { $eq: 19 } });
  // or db.department.find({ name: "lisi", age: 19 });
  ```

- `$ne` 不相等
  查询 `name` 不等于 `lisi` 的文档

  ```js
  db.department.find({ name: { $ne: "lisi" } });
  ```

  查询 `_id.status` 不等于 `leaving` 的文档

  ```js
  db.department.find({ "_id.status": { $ne: "leaving" } });
  ```

- `$gt` 大于
  查询 `age` 大于 `18` 的文档
  ```js
  db.department.find({ age: { $gt: 18 } });
  ```
- `$gte` 大于等于
- `$lt` 小于
  查询 `name` 按字母大小比较， 小于 `lisi` 的文档
  ```js
  db.department.find({ name: { $lt: "lisi" } });
  ```
- `$lte` 小于等于

- `$in` 选择字段值等于指定数组中任何值的文档。
  语法：

  ```sh
  { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
  ```

  查询 `name` 为 `lisi` 或 `zhangsan` 的文档

  ```js
  db.department.find({ name: { $in: ["lisi", "zhangsan"] } });
  ```

- `$nin` 选择字段值不等于指定数组中任何值的文档。

## 四、逻辑查询操作符

- `$not` 取反
  语法：

  ```sh
  { field: { $not: { <operator-expression> } } }
  ```

  查询 `age` 不大于 `18` 的文档

  ```js
  db.department.find({ age: { $not: { $gt: 18 } } });
  ```

- `$and` 且
  语法:

  ```sh
  { $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ]}
  ```

  查询 `age` 大于 `18` 小于 `30` 的文档

  ```js
  // db.department.find({ age: { $gt: 18, $lt: 30 } });
  // db.department.find({ $and: [{ age: { $gt: 18, $lt: 30 } }] });
  db.department.find({ $and: [{ age: { $gt: 18 } }, { age: { $lt: 30 } }] });
  ```

  查询 `age` 小于 `30` 且 `name` 小于 `lisi` 的文档

  ```js
  // db.department.find({ name: { $lt: 'lisi' }, age: { $lt: 30 } })
  db.department.find({
    $and: [{ name: { $lt: "lisi" } }, { age: { $lt: 30 } }],
  });
  ```

- `$or` 或
  语法：

```sh
{ $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
```

查询 `name` 为 `lisi` 或 `zhangsan` 的文

```js
// db.department.find({ name: { $in: ["lisi", "zhangsan"] } });
db.department.find({ $or: [{ name: "lisi" }, { name: "zhangsan" }] });
```

- `$nor` 不是

查询 `name` 不为 `lisi` 或 `zhangsan` 的文

```js
// db.department.find({ name: { $nin: ["lisi", "zhangsan"] } });
db.department.find({ $nor: [{ name: "lisi" }, { name: "zhangsan" }] });
```

## 五、 字段查询操作符

- `$exists` 匹配具有指定字段的文档
  语法：

  ```sh
  { field: { $exists: <boolean> } }
  ```

  查询具有 `_id.status` 属性的文档

  ```js
  db.department.find({ "_id.status": { $exists: true } });
  ```

  查询具有 `_id.status` 属性的文档, 且值不为 `working` 的文档

  ```js
  db.department.find({ "_id.status": { $exists: true, $ne: "working" } });
  ```

- `$type` 匹配字段类型为指定类型的文档
  语法：

  具体类型

  ```sh
  { field: { $type: <BSON type> } }
  ```

  多个类型

  ```sh
  { field: { $type: [ <BSON type1> , <BSON type2>, ... ] } }
  ```

  支持的类型：
  | Type | Number | Alias | Notes |
  | --- | --- | --- | --- |
  | Double | 1 | “double” | |
  | String | 2 | “string” |
  | Object | 3 | “object” |
  | Array | 4| “array”|
  | Binary data |5| “binData”
  | Undefined |6| “undefined”| Deprecated.
  | ObjectId| 7| “objectId”
  | Boolean| 8| “bool”
  | Date| 9 |“date”
  | Null| 10 |“null”
  | Regular Expression |11 |“regex”
  | DBPointer| 12| “dbPointer”| Deprecated.
  | JavaScript| 13| “javascript”
  | Symbol| 14 |“symbol”| Deprecated.
  | JavaScript (with scope)|15| “javascriptWithScope” |Deprecated in MongoDB 4.4.
  | 32-bit integer |16 |“int”|
  | Timestamp |17 |“timestamp”|
  | 64-bit integer| 18 |“long”|
  | Decimal128| 19| “decimal” |New in version 3.4.|
  | Min key| -1| “minKey”|
  | Max key| 127| “maxKey”|

  查询 `_id` 的类型为 `string` 的文档

  ```js
  db.department.find({ _id: { $type: "string" } });
  ```

  查询 `_id` 类型为 `objectId` 或 `object` 的文档

  ```js
  db.department.find({ _id: { $type: ["objectId", "object"] } });
  ```

## 六、数组查询操作符

准备数据

```js
db.department.insert([
  {
    name: "a",
    skill: ["vue", "python", "mongodb"],
  },
  {
    name: "b",
    skill: ["vue", "nodejs", "mongodb", "ngix"],
  },
  {
    name: "c",
    skill: ["react", "nodejs", "mongodb", "docker"],
  },
  {
    name: "d",
    skill: [["django", "flask", "pycharm"]],
  },
  {
    name: "e",
    skill: [["django", "flask", "vscode", "vuex", "element-ui"]],
  },
]);
```

- `$all` 匹配包含所有指定值的数组。
  语法：

  ```sh
  { <field>: { $all: [ <value1> , <value2> ... ] } }
  ```

  查询 `skill` 有 `python`、`vue`、`mongodb` 的文档

  ```js
  db.department.find({ skill: { $all: ["python", "vue", "mongodb"] } });
  // db.department.find({ $and: [{ skill: 'python' }, { skill: 'vue' }, { skill: 'mongodb' }] })
  ```

  查询 `skill` 有 `["django", "flask", "pycharm"]` 的文档

  ```js
  db.department.find({ skill: [['django', 'flask', 'pycharm']] }
  ```

- `$elemMatch` 匹配包含指定值的数组
  语法：

  ```sh
  { <field>: { $elemMatch: { <query1>, <query2>, ... } } }
  ```

  查询 `skill` 中大于 `docker` 小于 `vue` 的文档

  ```js
  db.department.find({
    skill: {
      $elemMatch: {
        $gt: "docker",
        $lt: "vue",
      },
    },
  });
  ```

  查询 `skill` 中(大于 `docker` 且 小于 `vue`) 而且 (大于 `docker` 且 小于 `webpack`)的文档

  ```js
  db.department.find({
    skill: {
      $all: [
        {
          $elemMatch: {
            $gt: "docker",
            $lt: "vue",
          },
        },
        {
          $elemMatch: {
            $gt: "docker",
            $lt: "webpack",
          },
        },
      ],
    },
  });
  ```

- `$size` 匹配指定大小的数组。
  查询 `skill` 数组长度为 `3` 的文档

  ```js
  db.department.find({
    skill: {
      $size: 3,
    },
  });
  ```

## 七、运算查询操作符

- `$regex` 选择值与指定正则表达式匹配的文档

  语法：

  ```sh
  { <field>: { $regex: /pattern/, $options: '<options>' } }
  { <field>: { $regex: 'pattern', $options: '<options>' } }
  { <field>: { $regex: /pattern/<options> } }
  ```

  你也可以使用正则表达式对象(如`/pattern/`)来指定正则表达式

  ```sh
  { <field>: /pattern/<options> }
  ```

  `$options`: 匹配模式

  - `i` 忽略大小写
  - `m` 多行匹配
  - `x` 将模式中的空白忽略
  - `s` 将字符串视为单行,换行符作为普通字符;

  查询 `name` 以 `li` 或 `李` 开头, 忽略大小写的文档

  ```js
  db.department.find({ name: { $regex: /(^li)|(^李)/, $options: "i" } });
  db.department.find({ name: { $regex: "(^li)|(^李)", $options: "i" } });
  db.department.find({ name: { $regex: /(^li)|(^李)/i } });
  db.department.find({ name: /(^li)|(^李)/i });
  db.department.find({ name: { $in: [/^li/, /^李/] } });
  ```

## 八、游标操作

`db.collection.find()`方法返回一个游标, 要访问文档，需要迭代游标。但是，如果返回的游标没有使用`var`关键字分配给变量，那么游标最多只显示结果中前 20 条文档

```js
var myCursor = db.department.find({});
myCursor;
```

访问查询结果的第一条文档

```js
var myCursor = db.department.find({});
myCursor[0];
```

遍历游标

```js
var myCursor = db.department.find({});
while (myCursor.hasNext()) {
  printjson(myCursor.next());
}

// myCursor.forEach(printjson);
```

默认情况下，在 10 分钟内不活动或者已经遍历完的游标将自动关闭，覆盖此行为，可以使用` cursor.noCursorTimeout()`方法:

```js
var myCursor = db.department.find().noCursorTimeout();
```

手动关闭游标

```js
myCursor.close();
```

指定返回文档的数量

```js
var myCursor = db.department.find({});
myCursor.limit(2);
```

跳过指定数量的文档

```js
var myCursor = db.department.find({});
myCursor.skip(2);
```

翻页时，假设每页显示 2 条文档，则第二页的数据应该为：

```js
var myCursor = db.department.find({});
myCursor.skip(2).limit(2);
```

当 `limit`方法参数为 `0` 时，将返回剩下的所有文档

```js
var myCursor = db.department.find({});
myCursor.skip(2).limit(0);
```

获取游标中文档的总个数

```js
var myCursor = db.department.find({});
// 不考虑是否调用了 `limit` 或 `skip` 方法, 将返回总个数
myCursor.count();

// 如果想知道调用了 `limit` 或 `skip` 方法后返回的个数
myCursor.count(true);
```

如：

```sh
> var myCursor = db.department.find().noCursorTimeout();
> myCursor.limit(2)
{ "_id" : "employee1", "name" : "zhangsan", "age" : 18 }
{ "_id" : ObjectId("5f4fe031b3dbdc66cacb3b8d"), "name" : "lisi", "age" : 19 }
> myCursor.count()
19
> myCursor.count(true)
2
```

`cursor.sort(<document>)`对文档进行排序
在 sort 参数中指定要排序的字段，值为 1 或-1 分别指定升序或降序排序。

假如对游标中的文档按 `age` 升序， `name` 降序

```js
var myCursor = db.department.find({});
myCursor.sort({ age: 1, name: -1 });
```

查询 `age` 最大的文档

```js
db.department.find({}).sort({ age: -1 }).limit(1)[0];
```

**链式查询时，需要注意函数的优先级**

`skip` 的优先级大于 `limit` 所以下面的命令，返回相同的结果

```js
db.department.find({}).skip(5).limit(5);
```

```js
db.department.find({}).limit(5).skip(5);
```

`sort` 的优先级 大于 `skip`

```js
db.department.find({}).skip(5).limit(5).sort({ age: -1 });
// db.department.find({}).sort({ age: -1 }).skip(5).limit(5);
```

## 九、文档的投射

投影参数决定在匹配的文档中返回哪些字段  
投影参数采用以下形式的文档

```sh
{ <field1>: <value>, <field2>: <value> ... }
```

- `<field>: <1 or true>` 指定包含的字段
- `<field>: <0 or false>` 指定排除的字段

返回的文档中，只包含字段 `name` 和 `_id`

```js
db.department.find({}, { name: 1 });
```

返回的文档中，只包含字段 `name`

```js
db.department.find({}, { name: 1, _id: 0 });
```

返回的文档中，不包含字段 `name`

```js
db.department.find({}, { name: 0 });
```

除了文档主键 `_id` 外，不能再投射中使用，即包含与不包含的操作

```js
try {
  db.department.find({}, { name: 0, age: 1 });
} catch (e) {
  print(e);
}
```

运行结果：

```sh
Error: error: {
	"ok" : 0,
	"errmsg" : "Cannot do inclusion on field age in exclusion projection",
	"code" : 31253,
	"codeName" : "Location31253"
}
```

## 十、 投影操作符

- `$slice (projection)` 指定在查询结果中返回的数组中的元素数量

  语法：

  ```sh
  db.collection.find(
   <query>,
   { <arrayField>: { $slice: <number to return> } }
  );
  ```

  或

  ```sh
  db.collection.find(
   <query>,
   { <arrayField>: { $slice: [ <number to skip>, <number to reutrn> ] } }
  );
  ```

  返回 `skill` 数组中的前 2 个元素

  ```js
  db.department.find({}, { skill: { $slice: 2 } });
  ```

  返回 `skill` 数组中忽略第一个元素后的 2 个元素

  ```js
  db.department.find({}, { skill: { $slice: [1, 2] } });
  ```

  返回 `skill` 数组中的最后 2 个元素

  ```js
  db.department.find({}, { skill: { $slice: -2 } });
  ```

- `$elemMatch (projection)` 返回数组中满足条件的第一个元素

  返回 `skill` 数组中的大于 `python` 的第一个元素  
  **如果没有找到匹配的元素，`skill` 字段将被忽略**

  ```js
  db.department.find({}, { skill: { $elemMatch: { $gt: "python" } } });
  ```

  **该操作符，会忽略掉除了 `_id` 的其他字段, 其他字段需要显示指定**

  ```js
  db.department.find(
    {},
    { name: 1, age: 1, skill: { $elemMatch: { $gt: "python" } } }
  );
  ```

  引用查询条件中的值: 如果查询条件中有 `skill` 数组的过滤条件，可以使用投射中使用下面的方式，调用 `$elemMatch` 操作符

  ```js
  db.department.find({ skill: { $gt: "python" } }, { "skill.$": 1 });

  // db.department.find({ skill: { $gt: 'python' } }, { skill: { $elemMatch: { $gt: 'python' } } })
  ```

## 十一、 总结

- `db.collection.find()`
- 比较操作符
- 逻辑操作符
- 字段操作符
- 数组操作符
- 运算操作符
- 游标的操作
- 文档投射操作
