---
title: MongoDB 创建文档
date: 2019-09-09 20:03:32
categories:
 - backEnd
tags:
 - mongoDB
---

## 一、创建数据库

使用 `use databaseName` 命令切换数据库，如果数据库不存在则创建

```sh
> use test
switched to db test
```

使用 `show collections` 命令查看数据库下的所有集合，新建的数据库的集合为 0 个

```sh
> show collections
```

## 二、`db.collection.insertOne()`创建当个文档

The `insertOne()` method has the following syntax:

```sh
db.collection.insertOne(
   <document>,
   {
      writeConcern: <document>
   }
)
```

|     参数     |   类型   | 描述                                                                                        |
| :----------: | :------: | :------------------------------------------------------------------------------------------ |
|   document   | document | 要插入到集合中的文档                                                                        |
| writeConcern | document | (可选的) 表示一个文档的安全写级别<br>如果在事务中运行，请不要设置该参数<br>(以后文章会讲到) |

往 `department` 这个集合插入第一条文档(`department`集合不存在时，会自动创建，并插入数据)

```js
db.department.insertOne({
  _id: "employee1",
  name: "zhangsan",
  age: 18,
});
```

运行结果：

```sh
{ "acknowledged" : true, "insertedId" : "employee1" }
```

返回：一个文档描述

- `acknowledged` 安全写级别默认开启
- `insertedId` 写入集合的文档主键 `_id` 的值

## 三、`db.collection.insertOne` 操作失败的情况

文档主键必须唯一，重复创建相同 `_id` 的文档时，将创建失败

```js
try {
  db.department.insertOne({
    _id: "employee1",
    name: "lisi",
    age: 19,
  });
} catch (e) {
  print(e);
}
```

运行结果：

```sh
WriteError({
	"index" : 0,
	"code" : 11000,
	"errmsg" : "E11000 duplicate key error collection: test.department index: _id_ dup key: { _id: \"employee1\" }",
	"op" : {
		"_id" : "employee1",
		"name" : "lisi",
		"age" : 19
	}
})
```

## 四、自动生成文档主键

人为的指定文档主键，并不安全，如果不指定 `_id`的值，`MongoDB` 会自动调用`ObjectId()` 生成文档主键，并确保唯一性

```sh
> ObjectId()
ObjectId("5f4fe0abb3dbdc66cacb3b8e")
```

不指定 `_id` 进行创建

```js
db.department.insertOne({
  name: "lisi",
  age: 19,
});
```

运行结果：

```sh
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5f4fe031b3dbdc66cacb3b8d")
}
```

## 五、`db.collection.insertMany()`创建多个文档

The `insertMany()` method has the following syntax:

```sh
db.collection.insertMany(
   [ <document 1> , <document 2>, ... ],
   {
      writeConcern: <document>,
      ordered: <boolean>
   }
)
```

|     参数     |   类型   | 描述                                                                                                                                                                         |
| :----------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   document   | document | 要插入到集合中的文档数组                                                                                                                                                     |
| writeConcern | document | (可选的) 表示一个文档的安全写级别<br>如果在事务中运行，请不要设置该参数<br>(以后文章会讲到)                                                                                  |
|   ordered    | boolean  | (可选的) 一个布尔值，指定`mongod`实例应该执行有序插入还是无序插入。默认值为`true` <br> 如果为`false`，则执行无序插入，如果其中一个文档发生错误，则继续处理数组中的其余文档。 |

一次性创建两个文档

```js
db.department.insertMany([
  {
    name: "joe",
    age: 18,
  },
  {
    name: "lily",
    age: 17,
  },
]);
```

运行结果：

```sh
{
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("5f4fe3cdb3dbdc66cacb3b8f"),
		ObjectId("5f4fe3cdb3dbdc66cacb3b90")
	]
}
```

返回：一个文档描述

- `acknowledged` 安全写级别默认开启
- `insertedIds` 对于每个成功插入的文档，一个`_id` 数组

## 六、`db.collection.insertMany` 操作失败的情况

文档主键必须唯一，重复创建相同 `_id` 的文档时，将创建失败

```js
try {
  db.department.insertMany([
    {
      _id: "employee1",
      name: "mike",
      age: 19,
    },
    {
      name: "lucy",
      age: 17,
    },
  ]);
} catch (e) {
  print(e);
}
```

运行结果：

```sh
BulkWriteError({
	"writeErrors" : [
		{
			"index" : 0,
			"code" : 11000,
			"errmsg" : "E11000 duplicate key error collection: test.department index: _id_ dup key: { _id: \"employee1\" }",
			"op" : {
				"_id" : "employee1",
				"name" : "mike",
				"age" : 19
			}
		}
	],
	"writeConcernErrors" : [ ],
	"nInserted" : 0,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

以上报错信息中发现 `nInserted` 值为 `0`, 即两条数据均没有创建成功

**当我们配置 `ordered` 为 `false` 时, 结果将会有所不同**

```js
try {
  db.department.insertMany(
    [
      {
        _id: "employee1",
        name: "mike",
        age: 19,
      },
      {
        name: "lucy",
        age: 17,
      },
    ],
    {
      ordered: false,
    }
  );
} catch (e) {
  print(e);
}
```

运行结果：

```sh
BulkWriteError({
	"writeErrors" : [
		{
			"index" : 0,
			"code" : 11000,
			"errmsg" : "E11000 duplicate key error collection: test.department index: _id_ dup key: { _id: \"employee1\" }",
			"op" : {
				"_id" : "employee1",
				"name" : "mike",
				"age" : 19
			}
		}
	],
	"writeConcernErrors" : [ ],
	"nInserted" : 1,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

上面的结果可以发现 `nInserted` 的值为 `1`, 即有一条数据创建成功，`_id` 为 `employee1` 的文档，因为主键重复创建失败，另一条文档因为没有错误，所以成功被创建

## 七、`db.collection.insert()` 创建一个或多个文档

The insert() method has the following syntax:

```sh
db.collection.insert(
   <document or array of documents>,
   {
     writeConcern: <document>,
     ordered: <boolean>
   }
)
```

|     参数     |   类型   | 描述                                                                                                                                                                         |
| :----------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   document   | document | 要插入到集合中的文档数组                                                                                                                                                     |
| writeConcern | document | (可选的) 表示一个文档的安全写级别<br>如果在事务中运行，请不要设置该参数<br>(以后文章会讲到)                                                                                  |
|   ordered    | boolean  | (可选的) 一个布尔值，指定`mongod`实例应该执行有序插入还是无序插入。默认值为`true` <br> 如果为`false`，则执行无序插入，如果其中一个文档发生错误，则继续处理数组中的其余文档。 |

创建一个文档

```js
db.department.insert({
  name: "jake",
  age: 19,
});
```

运行结果：

```sh
WriteResult({ "nInserted" : 1 })
```

创建一个文档返回 `WriteResult` 对象

创建多个文档

```js
db.department.insert([
  {
    name: "王五",
    age: 19,
  },
  {
    name: "李二狗",
    age: 17,
  },
]);
```

运行结果：

```sh
BulkWriteResult({
	"writeErrors" : [ ],
	"writeConcernErrors" : [ ],
	"nInserted" : 2,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

创建多个文档返回 `BulkWriteResult` 对象

## 八、`db.collection.insert()` 操作失败的情况

创建一个文档失败的情况

```js
db.department.insert({
  _id: "employee1",
  name: "李二蛋",
  age: 30,
});
```

运行结果：

```sh
WriteResult({
	"nInserted" : 0,
	"writeError" : {
		"code" : 11000,
		"errmsg" : "E11000 duplicate key error collection: test.department index: _id_ dup key: { _id: \"employee1\" }"
	}
})
```

返回 `WriteResult` 对象， 和创建成功返回同样类型的错误对象

创建多个文档失败的情况

```js
db.department.insert([
  {
    _id: "employee1",
    name: "李四娣",
    age: 16,
  },
  {
    name: "李逍遥",
    age: 33,
  },
]);
```

运行结果：

```sh
BulkWriteResult({
	"writeErrors" : [
		{
			"index" : 0,
			"code" : 11000,
			"errmsg" : "E11000 duplicate key error collection: test.department index: _id_ dup key: { _id: \"employee1\" }",
			"op" : {
				"_id" : "employee1",
				"name" : "李四娣",
				"age" : 16
			}
		}
	],
	"writeConcernErrors" : [ ],
	"nInserted" : 0,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

返回 `BulkWriteResult` 对象， 和创建成功返回同样类型的错误对象

当设置 `ordered` 参数为 `false` 时，则执行无序插入，如果其中一个文档发生错误，则继续处理数组中的其余文档

```js
db.department.insert(
  [
    {
      _id: "employee1",
      name: "李四娣",
      age: 16,
    },
    {
      name: "李逍遥",
      age: 33,
    },
  ],
  {
    ordered: false,
  }
);
```

运行结果：

```sh
BulkWriteResult({
	"writeErrors" : [
		{
			"index" : 0,
			"code" : 11000,
			"errmsg" : "E11000 duplicate key error collection: test.department index: _id_ dup key: { _id: \"employee1\" }",
			"op" : {
				"_id" : "employee1",
				"name" : "李四娣",
				"age" : 16
			}
		}
	],
	"writeConcernErrors" : [ ],
	"nInserted" : 1,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

返回结果发现，有一个报错，`nInserted` 为 `1` 则表示成功创建了 1 个文档

## 九、`db.collection.save()` 保存文档

> The `save()` method uses either the insert or the update command.

`save()`方法， 当保存新文档时，会调用 `insert()` 方法创建文档，当保存的文档 `_id` 已存在，会调用 `update()` 方法更新文档

**提示:** `MongoDB` 不推荐 `db.collection.save()` 方法。而是使用`db.collection.insertOne()`或`db.collection.replaceOne()`。

`update()`、 `db.collection.replaceOne()` 更新文档操作，后面的文章会讲解

The save() method has the following form:

```sh
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)
```

使用 `save()` 方法创建一个文档

```js
db.department.save({
  name: "郑屠户",
  age: 55,
});
```

运行结果：

```sh
WriteResult({ "nInserted" : 1 })
```

使用 `save()` 方法创建多个文档

```js
db.department.save([
  {
    name: "楚霸王",
    age: 37,
  },
  {
    name: "李寻欢",
    age: 33,
  },
]);
```

运行结果：

```sh
BulkWriteResult({
	"writeErrors" : [ ],
	"writeConcernErrors" : [ ],
	"nInserted" : 2,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

**可以发现，运行结果与 `insert()` 通用**

## 十、`ObjectId()` 文档主键

```sh
ObjectId(<hexadecimal>)
```

|    参数     |  类型  | 描述                             |
| :---------: | :----: | :------------------------------- |
| hexadecimal | String | (可选的)十二位的十六进制字符串值 |

十二位的十六进制表示为：

- 一个 4 字节的时间戳值，表示`ObjectId`的创建，自 Unix 时代以来以秒为单位进行度量
- 一个 5 字节的随机值
- 一个 3 字节的递增计数器，初始化为一个随机值

方法和属性：

|    Attribute/Method     | 描述                                                        |
| :---------------------: | :---------------------------------------------------------- |
|           str           | 返回对象的十六进制字符串表示形式。                          |
| ObjectId.getTimestamp() | 将对象的时间戳部分作为日期返回。                            |
|   ObjectId.toString()   | 以字符串文本" ObjectId(…)"的形式返回 JavaScript 表示形式。  |
|   ObjectId.valueOf()    | 返回以十六进制字符串形式表示的对象。返回的字符串是 str 属性 |

创建一个 `ObjectId`

```sh
> const objId = ObjectId()
> objId
ObjectId("5f5084376310a4635f151165")
```

传入十六进制字符串创建 `ObjectId`

```sh
> ObjectId(objId.str)
ObjectId("5f5084376310a4635f151165")
```

属性和方法：

```sh
> objId.str
5f5084376310a4635f151165
> objId.toString()
ObjectId("5f5084376310a4635f151165")
> objId.valueOf()
5f5084376310a4635f151165
> objId.getTimestamp()
ISODate("2020-09-03T05:50:47Z")
```

## 十一、 复合主键

文档主键的值为另一个文档

```js
db.department.insert({
  _id: { status: "leaving", gender: "male" },
  name: "白小飞",
  age: 35,
});
```

运行结果:

```sh
WriteResult({ "nInserted" : 1 })
>
```

复合主键也要满足唯一性

```sh
WriteResult({
	"nInserted" : 0,
	"writeError" : {
		"code" : 11000,
		"errmsg" : "E11000 duplicate key error collection: test.department index: _id_ dup key: { _id: { status: \"leaving\", gender: \"male\" } }"
	}
})
>
```

不过，当复合主键文档的键值对顺序改变时，`MongoDB` 会认为是不同的文档主键

```js
db.department.insert({
  _id: { gender: "male", status: "leaving" },
  name: "杨贵妃",
  age: 18,
});
```

运行结果：

```sh
WriteResult({ "nInserted" : 1 })
```

## 十二、总结

- `db.collection.insertOne()` 将一个文档插入到集合中
- `db.collection.insertMany()` 将多个文档插入到集合中
- `db.collection.insert()` 将一个或多个文档插入到集合中。
- `db.collection.save()` 更新现有文档或插入新文档
- `ObjectId()` 生成文档主键对象
- 复合主键的概念
