# Django学习




跟着[django文档](https://docs.djangoproject.com/zh-hans/2.1/)实现投票app

## 需求

 - 一个让人们查看和投票的公共站点。
 - 一个让你能添加、修改和删除投票的管理站点。


## 环境

 - ide： pycharm community（不支持Django代码自动补全）
 - 版本：django 2.1.1
 - 数据库：sqlite


## 创建项目

```powershell
django-admin startproject mysite
```

生成的文件结构

```
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        wsgi.py
```


开启服务器

```powershell
python manage.py runserver
```


## 创建应用

```powershell
python manage.py startapp polls
```

在polls下生成的文件结构

```
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py
```

创建polls/urls.py作为视图的路由

## 数据库配置

sqlite是其自带的数据库，使用其他数据库需要添加配置项

比如mysql，在mysite/settings中DATABASES应该这样写

```python
DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.sqlite3',
        # 'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        'ENGINE' : 'django.db.backends.mysql',
        'NAME' : 'test_django',
        'USER' : 'root',
        'PASSWORD' : '123456',
        'HOST' : 'localhost',
        'PORT' : '3306',
    }
}
```


在使用mysite/settings中的INSTALLED_APPS之前要在数据库中创建一些表，执行

```powershell
python manage.py migrate
```

## 创建模型

在polls/models.py中写

__str__方法在命令行调试时有很好的输出

```python
from django.db import models
import datetime
from django.utils import timezone

# Create your models here.

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __str__(self):
        return self.question_text
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now

    #更改后台的显示方式
    was_published_recently.admin_order_field = 'pub_date'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Published recently?'

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text
```



## 激活模型

polls/apps.py

```python
from django.apps import AppConfig
class PollsConfig(AppConfig):
    name = 'polls'
```


 把polls应用安装到项目中，在mysite/settings.py中

```python
INSTALLED_APPS = [
    'polls.apps.PollsConfig',  #可插拔 这么做，项目就会包含应用
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```


运行如下命令

```powershell
python manage.py makemigrations polls
```

通过运行 makemigrations 命令，Django 会检测对模型文件的修改，并且把修改的部分储存为一次迁移。

运行如下命令，将会把模型的修改同步到数据库中

```powershell
python manage.py migrate
```

在之后改模型要做这三步

 - 修改模型
 - python manage.py makemigrations
 - python manage.py migrate


## API

打开python命令行

```powershell
python manage.py shell
```

```powershell
Python 3.5.6 |Anaconda 4.2.0 (64-bit)| (default, Aug 26 2018, 16:05:27) [MSC v.1900 64 bit (AMD64)]
Type "copyright", "credits" or "license" for more information.

IPython 5.1.0 -- An enhanced Interactive Python.
?         -> Introduction and overview of IPython's features.
%quickref -> Quick reference.
help      -> Python's own help system.
object?   -> Details about 'object', use 'object??' for extra details.

In [1]: from polls.models import Choice, Question

In [2]: Question.objects.all()
Out[2]: <QuerySet [<Question: what's up?>]>

In [3]: Question.objects.filter(id=1)
Out[3]: <QuerySet [<Question: what's up?>]>

In [4]: Question.objects.filter(question_text__startswith='What')
Out[4]: <QuerySet [<Question: what's up?>]>

In [5]: Question.objects.get(id=2)
---------------------------------------------------------------------------
DoesNotExist                              Traceback (most recent call last)
<ipython-input-5-e5ad49b3e3e3> in <module>()
----> 1 Question.objects.get(id=2)

D:\anaconda\lib\site-packages\django\db\models\manager.py in manager_method(self, *args, **kwargs)
     80         def create_method(name, method):
     81             def manager_method(self, *args, **kwargs):
---> 82                 return getattr(self.get_queryset(), name)(*args, **kwargs)
     83             manager_method.__name__ = method.__name__
     84             manager_method.__doc__ = method.__doc__

D:\anaconda\lib\site-packages\django\db\models\query.py in get(self, *args, **kwargs)
    397             raise self.model.DoesNotExist(
    398                 "%s matching query does not exist." %
--> 399                 self.model._meta.object_name
    400             )
    401         raise self.model.MultipleObjectsReturned(

DoesNotExist: Question matching query does not exist.

In [6]: q = Question.objects.get(pk=1)

In [7]: q.was_published_recently()
Out[7]: False

In [8]: q = Question.objects.get(pk=1)
   ...: 

In [9]: q.choice_set.all()
Out[9]: <QuerySet [<Choice: not much>, <Choice: the sky>, <Choice: just hacking>]>

In [10]: q.choice_set.create(choice_text='Not much', votes=0)
Out[10]: <Choice: Not much>

In [11]: c = q.choice_set.create(choice_text='Just hacking again', votes=0)

In [12]: c.question
Out[12]: <Question: what's up?>

In [13]: q.choice_set.all()
Out[13]: <QuerySet [<Choice: not much>, <Choice: the sky>, <Choice: just hacking>, <Choice: Not much>, <Choice: Just hacking again
>]>

In [14]: q.choice_set.count()
Out[14]: 5

In [15]: c = q.choice_set.filter(choice_text__startswith='Just hacking')

In [16]: c.delete()
Out[16]: (2, {'polls.Choice': 2})

In [17]: quit()
```



## Django管理页面


创建管理员账号

```powershell
python manage.py createsuperuser
```

启动服务器，转到/admin/路径，进入管理员界面


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210205205039897.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)




## 编写视图

需求

 - 问题索引页——展示最近的几个投票问题。
- 问题详情页——展示某个投票的问题和不带结果的选项列表。
- 问题结果页——展示某个投票的结果。
- 投票处理器——用于响应用户为某个问题的特定选项投票的操作。


使用模板系统，更加灵活

建立polls/templates文件夹

在建立polls文件夹，形成polls/templates/polls，将html文件放此目录下

在polls/views.py下编写视图，使用通用视图，结合request和response

```python
from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from .models import Question, Choice
from django.http import Http404
from django.urls import reverse
from django.views import generic
from django.utils import timezone


# def index(request):
#     latest_question_list = Question.objects.order_by('-pub_date')[:5]
#     context = {
#         'latest_question_list' : latest_question_list
#     }
#     return render(request, 'polls/index.html', context)

class IndexView(generic.ListView):
    #model = Question
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'

    '''
    Question.objects.filter(pub_date__lte=timezone.now()) 
    returns a queryset containing Questions whose pub_date is 
    less than or equal to - that is, earlier than or equal to - timezone.now.
    '''

    def get_queryset(self):
        return Question.objects.filter(
            pub_date__lte = timezone.now()
        ).order_by('-pub_date')[:5]

class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'

    def get_queryset(self):
        return Question.objects.filter(pub_date__lte = timezone.now())

class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/results.html'

# Leave the rest of the views (detail, results, vote) unchanged


# def detail(request, question_id):
#     question = get_object_or_404(Question, pk = question_id)
#     return render(request, 'polls/detail.html', {'question': question})
#
# def results(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     return render(request, 'polls/results.html', {'question': question})

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
        # 使用reverse将返回 '/polls/3/results/'
```



设置路由


在polls/urls.py中设置路由，并为应用加上命名空间

```python
from django.urls import path

from . import views

app_name = 'polls'  #命名空间，防止重名
urlpatterns = [
    path('' , views.IndexView.as_view() , name = 'index'),
    path('<int:pk>/' , views.DetailView.as_view() , name = 'detail'),
    path('<int:pk>/results/' , views.ResultsView.as_view() , name = 'results'),
    path('<int:question_id>/vote/' , views.vote , name = 'vote'),
]
```


编写模板


使用软编码url，在polls/templates/polls中编写

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    {% load static %}
    <link rel="stylesheet" type="text/css" href="{% static 'polls/style.css' %}">
</head>
<body>

{% if latest_question_list %}
    <ul>
    {% for question in latest_question_list %}
        <li><a href="{% url 'polls:detail' question.id %}">{{ question.question_text }}</a></li>
    {% endfor %}
    </ul>
{% else %}
    <p>No polls are available.</p>
{% endif %}


</body>
</html>
```



detail.html  表单验证

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>{{ question.question_text }}</h1>

{% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}

<form action="{% url 'polls:vote' question.id %}" method="post">
{% csrf_token %}
{% for choice in question.choice_set.all %}
    <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}">
    <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
{% endfor %}
<input type="submit" value="Vote">
</form>
</body>
</html>
```


result.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>{{ question.question_text }}</h1>

<ul>
{% for choice in question.choice_set.all %}
    <li>{{ choice.choice_text }} -- {{ choice.votes }} vote{{ choice.votes|pluralize }}</li>
    <!-- pluralize 复数 -->
{% endfor %}
</ul>

<a href="{% url 'polls:detail' question.id %}">Vote again?</a>
</body>
</html>
```


使用静态文件

比如css文件和图片

建立文件夹polls/static/polls

把图片放在polls/static/polls/images下，css文件放在polls/static/polls下

```css
li a{
    color : pink;
}

body {
    background: white url('images/background.jpg');
}
```


## 自定义管理员界面


在polls/admin.py中编写

```python
from django.contrib import admin

# Register your models here.

from .models import Question, Choice

#admin.site.register(Question)

# class QuestionAdmin(admin.ModelAdmin):
#     #fields = ['pub_date' , 'question_text']
#     fieldsets = [
#         (None, {'fields': ['question_text']}),
#         ('Date information', {'fields': ['pub_date']}),
#     ]

#class ChoiceInline(admin.StackedInline):
class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields' : ['question_text']}),
        ('Date information' , {'fields' : ['pub_date'],
                               'classes' : ['collapse']}),
    ]
    inlines = [ChoiceInline]
    list_display = ('question_text', 'pub_date', 'was_published_recently')
    list_filter = ['pub_date']
    search_fields = ['question_text']

admin.site.register(Question, QuestionAdmin)
#admin.site.register(Choice)


```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210205205106460.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210205205136106.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)


## 问题记录

### 问题描述

把sqlite数据库导入到mysql

[参考](https://www.javazhiyin.com/40359.html)

### 解决方法

安装mysqldb驱动

```powershell
pip install --pre MySQLdb -i https://pypi.douban.com/simple
```

出错

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210205220422734.png)

安装可执行文件

[链接](https://sourceforge.net/projects/mysqlpythonwinx64py272/files/latest/download)

出错，因为python2才有 mysqldb

Python3是pymysql

尝试

```powershell
pip install pymysql
py manage.py makemigrations
```

报错

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210205220640908.png)

与工程同名的文件夹下的__init__.py中这样写


```python
import pymysql
pymysql.version_info = (1, 3, 13, 'final', 0)
pymysql.install_as_MySQLdb()
```

再执行

```powershell
py manage.py makemigrations
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210205220842852.png)
找到对应的错误

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210205220859180.png)

定位到这样的代码段

```python
query = getattr(cursor, '_executed', None)
if query is not None:
	query = query.decode(errors='replace')
return query
```

把decode改成encode
