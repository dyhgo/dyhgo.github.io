# Flask学习



## 扩展的地址

[flask扩展的地址](https://flask.pocoo.org/extensions)

## requirement.txt

用来存项目的依赖和版本

### 生成requirement.txt

```powershell
pip freeze > requirement.txt
```
### 安装requirement.txt

```powershell
pip install -r requirement.txt
```

## 基本框架

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return 'hello world'

if __name__ == '__main__':
    app.run()
```

Flask-RESTful

```python
from flask import Flask
import flask_restful

app = Flask(__name__)
api = flask_restful.Api(app)

class Hello(flask_restful.Resource):
    def get(self):
        return 'hello world'

api.add_resource(Hello , '/')

if __name__ == '__main__':
    app.run()
```


## 路由

### 改变路由请求方式

```python
@app.route('/', methods = ['GET', 'POST'])
def index():
    return 'hello world'
```

### 路由参数处理

```python
@app.route('/order/<order_id>')
def fun(order_id):
    return 'order id is %s' % order_id
```

#### 格式限定


```python
@app.route('/order/<int:order_id>')
def fun(order_id):
    return 'order id is %s' % order_id
```


## Jinja2模板

### Jinja2模板引擎渲染网页

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index1.html')

if __name__ == '__main__':
    app.run()
```

### 和模板链接更改数据

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    tmp_url = 'https://dyhgo.fun'
    return render_template('index1.html', str_url=tmp_url)
	#此处模板中有str_url
if __name__ == '__main__':
    app.run()
```

### 变量代码块

```html
{{str_url}}
```

### 注释

```html
{# 这是注释 #}
```



### 控制代码块

```python
@app.route('/')
def hello_world():
    my_list = [1, 2, 3]
    return render_template('index.html', my_list=my_list)
```


```html
{% for i in my_list %}
{% if i > 1 %}
{{i}} <br>
{% endif %}
{% endfor %}
```

### 过滤器

```python
@app.route('/')
def hello_world():
    _url = 'aaaB'
    return render_template('index.html', _url=_url)
```

```html
{{_url | upper}}<br>
{{_url | reverse}} <br>
{{_url | lower | reverse}}<br>
```


## Flask表单

```python
from flask import Flask, render_template, request, flash


app = Flask(__name__)

app.secret_key = 'csfdka'

@app.route('/' ,  methods = ['POST','GET'])
def fun():
    if request.method == 'POST':
        username = request.form.get('username')
        psw = request.form.get('psw')
        psw2 = request.form.get('psw2')
        print(username,psw,psw2)
        if not all([username , psw , psw2]):
            flash('有待填项')
        elif psw2 != psw:
            flash('两次密码不一致')
        else:
            return 'success'



    return render_template('index1.html')



# @app.route('/order/<int:order_id>')
# def fun2(order_id):
#     return 'order id is %s' % order_id

if __name__ == '__main__':
    app.run()
```


index1.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form method="post">
    <label>用户名</label><input type="text"  name="username"><br>
    <label>密码</label><input type="password"  name="psw"><br>
    <label>确认密码</label><input type="password" name="psw2" ><br>
    <input type="submit" value="提交" ><br>

    {% for message in get_flashed_messages() %}
        {{message}}<br>
    {% endfor %}

</form>

</body>
</html>
```

