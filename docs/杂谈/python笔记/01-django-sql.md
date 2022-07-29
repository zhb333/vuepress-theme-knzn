---
title: Django 操作数据库-原生SQL初体验
date: 2018-08-11 23:10:48
categories:
 - backEnd
tags:
 - django
 - python
---

## 一、安装 `mysqlclient`

```bash
pip install mysqlclient
```

## 二、 配置连接数据库

`mysite/settings.py`
```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        # 数据库名
        'NAME': 'django_db1',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}
```

## 三、使用原生 `sql` 操作数据库

* 使用 `navicat` 新建数据库 `django_db1`

* 在数据库 `django_db1` 新建表 `book`

* 新增数据：  
    
    `front/views.py`

    ```py
    from django.shortcuts import render
    from django.db import connection


    def index(request):
        cursor = connection.cursor()
        cursor.execute("insert into book(title,author) values('深入理解ES6', '尼古拉斯')")
        return render(request, 'front/index.html')
    ```

* 浏览器访问： `localhost:8000`, 便会新增一条数据

* 查询数据

    `front/views.py`

    ```py
    def index(request):
    cursor = connection.cursor()
    cursor.execute("select * from book")
    # 查询一条数据
    # row = cursor.fetchone()
    # 指定查询的条数
    # rows = cursor.fetchmany(2)
    # 查询所有数据
    rows = cursor.fetchall()
    for row in rows:
        print(row)
    return render(request, 'front/index.html')
    ```

## 四、`Python DB API`下 `cursor`对象，常用接口

* `description`

    执行 `cursor.execute`后，可通过 `cursor.description` 查看字段信息

    `front/views.py`

    ```py
    def index(request):
    cursor = connection.cursor()
    cursor.execute("select * from book")
    # (('id', 3, 1, 11, 11, 0, 0), ('title', 253, 15, 765, 765, 0, 0), ('author', 253, 12, 765, 765, 0, 0))
    print(cursor.description)
    rows = cursor.fetchall()
    for row in rows:
        print(row)
    return render(request, 'front/index.html')
    ```

* `rowcount`

    执行 `sql` 删除，新增，修改时，返回受影响的条数， 查询时，返回查询数据的条数

    `front/views.py`

    ```py
    def index(request):
    cursor = connection.cursor()
    cursor.execute("delete from book where id=2")
    # 1
    print(cursor.rowcount)
    return render(request, 'front/index.html')
    ```
* `close`

    关闭游标
    ```py
    cursor.close()
    ```

* `execute`

    用于执行 `sql` 语句， 还可以传递参数

    ```py
    cursor.execute('select * from book where id=%s', (1,))
    ```

* `fetchone`
* `fetchmany`
* `fetchall`
    ```py
    # 查询一条数据
    row = cursor.fetchone()
    # 指定查询的条数
    rows = cursor.fetchmany(2)
    # 查询所有数据
    rows = cursor.fetchall()
    ```  


## 五、图书管理系统案例

* 进入虚拟环境
    ```bash
    workon myenv
    ```
* 创建一个新的项目
    ```bash
    django-admin startproject book_manager
    ```
* 创建 `front` 应用

    ```bash
    cd book_manager
    python manage.py startapp front
    ```
* 配置将 `front` 应用，注册到已安装应用
    `book_manager/setting.py`
    ```py    
    INSTALLED_APPS = [
        'front',
    ]
    ```
-------------

1. 使用 `Navicat` 创建数据库 `book_manager`

2. 创建表 `book`, 三个字段： `id`、 `title`、 `author`

3. 配置数据库连接
    `book_manager/settings.py`
    ```py
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            # 数据库名
            'NAME': 'book_manager',
            'USER': 'root',
            'PASSWORD': '123456',
            'HOST': '127.0.0.1',
            'PORT': '3306',
        }
    }
    ```

4. 配置路由

    `book_manager/urls.py`
    ```py
    from django.urls import path, include

    urlpatterns = [
        path('', include('front.urls')),
    ]
    ```

    `front/urls.py`
     ```py
    from django.urls import path
    from . import views

    app_name = 'front'

    urlpatterns = [
        path('', views.index, name='index'),
        path('create/', views.create_book, name='create'),
        path('detail/<int:book_id>', views.book_detail, name='detail'),
        path('delete/<int:book_id>', views.book_delete, name='delete'),
        path('edit/<int:book_id>', views.book_edit, name='edit'),
    ]
    ```

5. 编写视图函数

    `front/views.py`

    ```py
    from django.shortcuts import render, reverse, redirect
    from django.db import connection


    # 获取操作数据库锚点
    def get_cursor():
        return connection.cursor()

    # 首页，展示所有图书
    def index(request):
        cursor = get_cursor()
        cursor.execute('select * from book')
        keys = [item[0] for item in cursor.description]
        books = [dict(zip(keys, values)) for values in cursor.fetchall()]
        cursor.close()
        return render(request, 'front/index.html', context={"books": books})

    # 新增图书
    def create_book(request):
        if request.method == 'POST':
            title = request.POST.get('title')
            author = request.POST.get('author')
            cursor = get_cursor()
            cursor.execute('insert into book(title, author) values(%s, %s)', (title, author))
            cursor.close()
            return redirect(reverse('front:index'))
        else:
            return render(request, 'front/create.html')

    # 图书详情
    def book_detail(request, book_id):
        cursor = get_cursor()
        cursor.execute('select * from book where id=%s', (book_id,))
        keys = [item[0] for item in cursor.description]
        book = dict(zip(keys, cursor.fetchone()))
        cursor.close()
        return render(request, 'front/detail.html', context={"book": book})

    # 删除图书
    def book_delete(request, book_id):
        cursor = get_cursor()
        cursor.execute('delete from book where id=%s', (book_id,))
        cursor.close()
        return redirect(reverse('front:index'))

    # 编辑图书
    def book_edit(request, book_id):
        cursor = get_cursor()
        if request.method == 'GET':
            cursor.execute('select * from book where id=%s', (book_id,))
            keys = [item[0] for item in cursor.description]
            book = dict(zip(keys, cursor.fetchone()))
            cursor.close()
            return render(request, 'front/edit.html', context={"book": book})
        else:
            title = request.POST.get('title')
            author = request.POST.get('author')
            cursor.execute('update book set title=%s, author=%s where id=%s', (title, author, book_id))
            cursor.close()
            return redirect(reverse('front:index'))
    ```

6. 将 `static` 注册为模板标签
    `book_manager/settings.py`
    ```py
    TEMPLATES = [
        {
            'OPTIONS': {
                'builtins': [
                    'django.templatetags.static'
                ],
            },
        },
    ]
    ```

7. 关闭表单 `csrf` 验证
    `book_manager/settings.py`
    ```py
    MIDDLEWARE = [
        # 'django.middleware.csrf.CsrfViewMiddleware',
    ]
    ```

6. 编写模板  
 `front/templates/front/base.html`

```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>图书管理系统</title>
        <link rel="stylesheet" href="{% static 'front/style.css' %}">
    </head>
    <body>
        {% include 'front/header.html' %}
        {% block content %}
        {% endblock %}
    </body>
    </html>
```
-------------------
`front/templates/front/header.html`

```html
     <header>
        <nav>
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/create/">新增图书</a></li>
            </ul>
        </nav>
    </header>
```
--------------------
    
`front/templates/front/index.html`

```html
    {% extends "front/base.html" %}

    {% block content %}
        <h1>所有图书</h1>
        <table cellpadding="0" cellspacing="0" >
            <thead>
                <tr>
                    <th class="table-id">序号</th>
                    <th class="table-title">书名</th>
                    <th class="table-author">作者</th>
                </tr>
            </thead>
            <tbody>
                {% for book in books %}
                    <tr>
                        <td class="table-id">{{ forloop.counter }}</td>
                        <td class="table-title"><a href="{% url 'front:detail' book_id=book.id %}">{{ book.title }}</a></td>
                        <td class="table-author">{{ book.author }}</td>
                    </tr>
                {% endfor %}
            </tbody>
        </table>
    {% endblock %}
```
---------------------------
`front/templates/front/create.html`

```html
    {% extends "front/base.html" %}

    {% block content %}
        <h1>新增图书</h1>
        <form action="" method="post" id="create-form">
            <p>
                <label for="title"> 书名：
                    <input type="text" class="input-text" name="title" id="title" required>
                </label>
            </p>
            <p>
                <label for="author"> 作者：
                    <input type="text" class="input-text" name="author" id="author" required>
                </label>
            </p>
            <p>
                <input type="submit" value="新增图书" class="default-btn">
            </p>
        </form>
    {% endblock %}
```
-----------------------
`front/templates/front/detail.html`

```html
    {% extends "front/base.html" %}

    {% block content %}
        <h1>图书详情</h1>
        <table cellspacing="0" cellpadding="0">
            {% for key, value in book.items %}
                <tr>
                    <td class="table-id">{{ key }}</td>
                    <td class="table-title">{{ value }}</td>
                </tr>
            {% endfor %}
            <tr>
                <td class="table-id"><button id="book-del" class="small-danger-btn">删除</button></td>
                <td class="table-title"><button id="book-edit" class="small-default-btn">编辑</button></td>
            </tr>
        </table>

        <script>
            const delBtn = document.querySelector('#book-del');
            const editBtn = document.querySelector('#book-edit');

            delBtn.onclick = function() {
                window.location.href = '{% url 'front:delete' book_id=book.id %}'
            };

            editBtn.onclick = function() {
                window.location.href = '{% url 'front:edit' book_id=book.id %}'
            };
        </script>
    {% endblock %}
```
--------------------------
`front/templates/front/edit.html`

```html
    {% extends "front/base.html" %}

    {% block content %}
        <h1>编辑图书</h1>
        <form action="{% url 'front:edit' book_id=book.id %}" method="post" id="create-form">
            <p>
                <label for="title"> 书名：
                    <input type="text" class="input-text" value="{{ book.title }}" name="title" id="title" required>
                </label>
            </p>
            <p>
                <label for="author"> 作者：
                    <input type="text" class="input-text" value="{{ book.author }}" name="author" id="author" required>
                </label>
            </p>
            <p>
                <input type="submit" value="编辑图书" class="default-btn">
            </p>
        </form>
    {% endblock %}
```
---------------------
`front/static/front/style.css`
```css
    body, ul, li, h1{
        padding: 0;
        margin: 0;
    }

    nav ul {
        list-style: none;
        height: 60px;
        background-color: #333;
    }

    nav li {
        padding: 0 10px;
        float: left;
        text-align: center;
        line-height: 60px;
    }

    nav a {
        width: 120px;
        display: block;
        height: 60px;
        font-size: 22px;
        color: #fff;
        font-weight: bold;
        text-decoration: none;
    }

    nav a:hover {
        color: lightblue;
    }

    #create-form {
        width: 600px;
        height: 300px;
        background-color: #abcdef;
        margin: 15px auto;
    }

    #create-form p {
        text-align: center;
        padding-top:  25px;
    }

    .input-text {
        width: 200px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid lightblue;
    }

    .default-btn {
        width: 150px;
        height: 50px;
        border-radius: 10px;
        color: #fff;
        background-color: lightgreen;
        line-height: 30px;
        text-align: center;
        border: 1px solid #89a1a9;
    }

    .small-default-btn {
        width: 100px;
        height: 35px;
        border-radius: 10px;
        color: #fff;
        background-color: lightgreen;
        line-height: 30px;
        text-align: center;
        border: 1px solid #89a1a9;
    }

    .small-danger-btn {
        width: 100px;
        height: 35px;
        border-radius: 10px;
        color: #fff;
        background-color: darkred;
        line-height: 30px;
        text-align: center;
        border: 1px solid #89a1a9;
    }

    table {
        margin: 25px auto;
    }

    td, th {
        border: 1px solid lightblue;
        text-align: center;
    }

    .table-id {
        width: 100px;
        height: 50px;
    }

    .table-title {
        width: 500px;
        height: 50px;
    }

    .table-author {
        width: 300px;
        height: 50px;
    }


    h1 {
        text-align: center;
        color: #333;
    }
 ```