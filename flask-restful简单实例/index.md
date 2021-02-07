# Flask-RESTful简单实例


Python web的框架有Django Flask Tornado

Flask 是一个使用 Python 编写的轻量级 Web 应用程序框架，由werkzeug服务器和jinja2模板引擎组成

RESTful是一个与资源（resource）有关的架构理念

REST全称Representational State Transfer，详细信息参考下面的资料

### 功能说明

接下来用Flask-RESTful扩展实现一个非常简单的实例，没有用到数据库，没有用到前端页面（模板），没有表单验证，没有复杂的业务逻辑

只用字典存储数据，实现crud（后期将增加数据库）

### 实现原理

安装 `pip install flask-restful`

Flask-RESTful最基本的套路

实例化app api

实例化解析器，将待验证的参数加进解析器中

根据路由编写对应的类，在类下面编写需要的函数

将类和对应的路由集成到api中

代码如下

```python
from flask import Flask
from flask_restful import reqparse , abort , Api , Resource

#实例化
app = Flask(__name__)
api = Api(app)

#创造初始数据
PERSONS = {
    'p1' : {'name' : 'qaz' , 'num' : '15'} ,
    'p2' : {'name' : 'wsx' , 'num' : '16'} ,
    'p3' : {'name' : 'edc' , 'num' : '17'} ,
}

def not_exist(ps_id):
    if ps_id not in PERSONS:
        abort(404 , message = 'person {} not exist'.format(ps_id))

#实例化解析器
#增加验证参数
parser = reqparse.RequestParser()
parser.add_argument('name' , type=str , required=True , help='it is a string') #把它设为必填项
parser.add_argument('num' , type=int , required=True , help='it is a number') #把它设为必填项

#对单个人的操作
class Person(Resource):
    def get(self , ps_id):
        not_exist(ps_id)
        return PERSONS[ps_id]

    def delete(self , ps_id):
        not_exist(ps_id)
        del PERSONS[ps_id]
        return '' , 204

    def put(self , ps_id):
        not_exist(ps_id)
        args = parser.parse_args() #开始数据验证
        info = {'name' : args['name'] , 'num' : args['num']}
        PERSONS[ps_id] = info #更新
        return info , 201

#对所有人的操作
class PersonList(Resource):
    def get(self):
        return PERSONS

    def post(self):
        global ps_id
        args = parser.parse_args()
        #暴力求缺失id
        lis = []
        #求每个键，然后过滤出数字，加进列表中，遍历获得空位置
        for i in PERSONS.keys():
            tmp_filter = filter(str.isdigit , i)
            tmp_list = list(tmp_filter)
            tmp_str = ''.join(tmp_list)
            tmp_int = int(tmp_str)
            lis.append(tmp_int)

        lis.sort()
        flag = False
        for i,j in range(len(lis)),lis:
            if i+1 != j:
                ps_id = i+1
                flag = True
                break

        if(not flag):  ps_id = len(lis) + 1

        ps_id = 'p%d' % (ps_id)
        PERSONS[ps_id] = {'name':args['name'] , 'num':args['num']}
        return PERSONS[ps_id] , 201

#增加对应的路由
api.add_resource(Person , '/persons/<string:ps_id>')
api.add_resource(PersonList , '/persons')

if __name__ == '__main__':
    app.run()
```



### 测试
#### 查询所有信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160100923.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160319708.png)

#### 根据ps_id查询单个人的信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160150740.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160338687.png)
##### 根据ps_id删除某个人的信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160255170.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160356394.png)

再查看所有人的信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020061316043170.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160441402.png)

#### 增加某个人的信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160601911.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160615543.png)

查看所有人的信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160645652.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160658786.png)

由于之前删除了2号，所以它占据了2号的位置

####  改变某个人的信息
现在p3 的name是edc num是17

改成name是uuu，num是27

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160928474.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613160942914.png)

查看所有人的信息以验证

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020061316101916.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613161029698.png)

### 参考资料（部分）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613161234684.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)



