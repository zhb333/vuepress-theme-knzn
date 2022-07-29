---
title: Django - 模板结构优化
date: 2018-08-10 13:10:28
categories:
 - backEnd
tags:
 - django
 - python
---

 > 接着 [自定义模板过滤器](https://zhb333.github.io/readme-blog/Python/Django/templates_3.html ) 往下讲

## 一、引入模板

### `include` 标签的使用

* 新建 `templates/header.html`
    ```html
    <header>头部</header>
    ```

* 新建 `templates/footer.html`
    ```html
    <footer>尾部</footer>
    ```

* 修改 `templates/index.html`
    ```html
    <body>
    {% include 'header.html' %}
    <div>内容</div>
    {% include 'footer.html' %}
    </body>
    ```

### `include` 标签中的模板查找路径

**参照 [render_to_string的模板查找路径](http://localhost:8080/readme-blog/Python/Django/templates_1.html#%E4%B8%80%E3%80%81%E6%A8%A1%E6%9D%BF%E6%9F%A5%E6%89%BE%E8%B7%AF%E5%BE%84)**


### `include` 标签引入的模板可以引用当前模板中的变量

* 修改 `front/views.py`
    ```py
    def index(request):
        context = {
            'title': 'Django'
        }
        return render(request, 'index.html', context=context)
    ```

* 修改 `templates/header.html`

    ```html
    {#头部 Django#}
    <header>头部 {{ title }}</header>
    ```

* 但为了所有引用 `templates/header.html` 的模板都能使用 `title` 变量， 可以在 `include` 标签中传递该变量

    修改 `templates/index.html`

    ```html
    {#头部 Young and Beautiful#}
    {% include 'header.html' with title='Young and Beautiful' %}
    ```

## 二、模板继承

* 新建 `templates/base.html`：

    ```html
    <body>
    {% include 'header.html' with title='Young and Beautiful' %}
    <div>
        {% block content %}
            默认内容
        {% endblock %}
    </div>
    {% include 'footer.html' %}
    </body>
    ```

* 修改 `templates/index.html`:
    ```html
    {% extends 'base.html' %}

    {% block content %}
    首页中的内容
    {% endblock %}
    ```

* 访问 `block` 标签被覆盖的内容：

    `templates/index.html`:
    ```html
    {% extends 'base.html' %}

    {% block content %}
    首页中的内容
    <p>{{ block.super }}</p>
    {% endblock %}
    ```
