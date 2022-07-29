---
title: Django - 模板中加载静态文件
date: 2018-08-13 23:50:48
categories:
 - backEnd
tags:
 - django
 - python
---

> 接着 [模板结构优化](https://zhb333.github.io/readme-blog/Python/Django/templates_4.html ) 往下讲

* 确保`mysite/setting.py` 中 `INSTALLED_APPS` 已经安装了 `django.contrib.staticfiles`

* 确保 `mysite/setting.py` 中设置了 `STATIC_URL`

* 在已经安装的 `app` 下创建 `static` 文件夹，并将该应用的静态资源存放在里面 : `front/static/suolong.jpg` 

  `templates/index.html`

  ```html
  {% block content %}
      <img src="/static/suolong.jpg" alt="suolong">
  {% endblock %}
  ```

* `mysite/setting.py` 中 `STATIC_URL` 值是可变的，这样以后引用静态资源的路径都要根据 `STATIC_URL` 是新值去修改，因此我们需要使用 `{% load static %}`

  `templates/index.html`

  ```html
  {% extends 'base.html' %}
  {% load static %}

  {% block content %}
      <img src="{% static 'suolong.jpg' %}" alt="suolong">
  {% endblock %}
  ```

* 公共资源路径

  在更目录下创建 `static` 文件夹

  `static/style.css`
  ```css
  body {
      background-color: #abcdef;
  }
  ```

  `mysite/setting.py`  
  ```py
  STATICFILES_DIRS = (
      os.path.join(BASE_DIR, 'static'),
  )
  ```

  `mysite/base.html`
  ```html
  {% load static %}
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <link rel="stylesheet" href="{% static 'style.css' %}">
  </head>
  ```

* 在每个需要加载静态资源文件的模板中都要写 `{% load static %}`, 为了不在每个模板中都写，我们可以吧 `static` 变为 `DTL` 模板标签  

  `mysite/setting.py`  
  ```py
  TEMPLATES = [
      {
        'OPTIONS': {
            'builtins': [
                'django.templatetags.static'
            ]
        },
      },
  ]
  ```

  **这样就不用在每个页面中引入`{% load static %}`**
