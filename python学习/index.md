# Python学习



记录一下第n次学python。。。

## 打印

### 转义字符的打印

```python
str = r"D:\now"
print(str)

------------------------------

D:\now
```

## 数据类型

### 获得数据类型

```python
print(type(3.14))
print(isinstance(15, int))

-----------------------------------

<class 'float'>
True
```


## 运算符

### 整数除法 幂次 大小关系表达式

```python
print(3//2)
print(-3**3)
print(3<4<5)

--------------------------

1
-27
True
```


### 三目运算符

```python
x = 6 if 2 > 4 else 7
print(x)

--------------------------------

7
```


### 运算符的优先级


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210205223244414.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)



## 列表

### 普通列表 混合列表 空列表

```python
a = [2,3,4]
print(a)
a = ['2',3,True]
print(a)
print(len(a))
a = []
print(a)

------------------------------

[2, 3, 4]
['2', 3, True]
3
[]
```


### append insert extend

```python
a = [1,"2",3]
a.append("sss")
print(a)
a.extend(["eee",6])
print(a)
a.insert(1,"one")
print(a)

------------------------------

[1, '2', 3, 'sss']
[1, '2', 3, 'sss', 'eee', 6]
[1, 'one', '2', 3, 'sss', 'eee', 6]
```


### 删除元素

```python
a = [1,2,3,3]
a.remove(1)
print(a)
a.remove(3)
print(a)

-----------------------

[2, 3, 3]
[2, 3]
```

```python
a = [1,2,3]
del a[0]
print(a)
del a
print(a)

------------------------

[2, 3]
Traceback (most recent call last):
  File "D:/python/mysources/test2/test2.py", line 38, in <module>
    print(a)
NameError: name 'a' is not defined
```


```python
a = [1,2,3,4,5]
a.pop()
print(a)
print(a.pop())
a.pop(1)
print(a)

----------------------------

[1, 2, 3, 4]
4
[1, 3]
```


### slice

```python
a = [1,2,3,4]
print(a[1:3])
print(a[:3])
print(a[1:])
print(a[:])
print(a[:-1])
print(a[-3:])

--------------------------

[2, 3]
[1, 2, 3]
[2, 3, 4]
[1, 2, 3, 4]
[1, 2, 3]
[2, 3, 4]
```

### 操作符

```python
a = [3,3,1,1,2,4]
print(a.count(3))
print(a.index(1))
print(a.index(3))
print(a.index(1,3))
print(a.index(1,1,2))#左闭右开

------------------------------------

2
2
0
3
Traceback (most recent call last):
  File "D:/python/mysources/test2/test2.py", line 60, in <module>
    print(a.index(1,1,2))#左闭右开
ValueError: 1 is not in list
```

```python
a = [3,5,7,1,2]
b = a[:]
c = a
a.reverse()
print(a)
a.sort()
print(a)
a.sort(reverse=True)
print(a)
print(b)
print(c)

------------------------------------

[2, 1, 7, 5, 3]
[1, 2, 3, 5, 7]
[7, 5, 3, 2, 1]
[3, 5, 7, 1, 2]
[7, 5, 3, 2, 1]
```


## 元组


```python
a = (1,2,'4')
print(a)
a = 1,
print(type(a))
a = (1,)
print(type(a))

-----------------------

(1, 2, '4')
<class 'tuple'>
<class 'tuple'>
```

## 格式化

```python
s = '{0} {1} {2}'.format("aaa","bb","c")
print(s)
s = '{0:.2f} {1}'.format(3.266,'ww')
print(s)
s = "%s %c %6.2f" % ('qqq',98,3.145)
print(s)
print('%#o' % 10)
print('%010d' % 52)

---------------------------------

aaa bb c
3.27 ww
qqq b   3.15
0o12
0000000052
```

## 序列

### 一些函数

```python
a = list('abc')
print(a)
a = list((2,3,4))
print(a)
a = list((3,5,1,7,3))
print(sorted(a))
print(reversed(a))  #没有改变 a
print(list(reversed(a)))
print(sorted(a,reverse=True))
print(enumerate(a))
print(list(enumerate(a)))
b = [4,2,6]
print(zip(a,b))
print(list(zip(a,b)))

--------------------------------------------

['a', 'b', 'c']
[2, 3, 4]
[1, 3, 3, 5, 7]
<list_reverseiterator object at 0x000001961A58C400>
[3, 7, 1, 5, 3]
[7, 5, 3, 3, 1]
<enumerate object at 0x000001961A59DA68>
[(0, 3), (1, 5), (2, 1), (3, 7), (4, 3)]
<zip object at 0x000001961A59E5C8>
[(3, 4), (5, 2), (1, 6)]
```

## 函数

### 函数文档

```python
def func(a):
    'it is a doc'
    print(a)
func(3)
print(func.__doc__)
help(func)

------------------------------

3
it is a doc
Help on function func in module __main__:

func(a)
    it is a doc
```


### 函数参数

```python
def func(*params , x = 5):
    print(x)
    print(params[1])
def fun(*param , x):
    print(x)
func(2,3,1)
fun(4,5,2,x=7)

---------------------------

5
3
7
```

### 全局变量

```python
a = 5
def fun():
    a = 10
    print(a)
def func():
    global a
    a = 10
fun()
print(a)
func()
print(a)

10
5
10
```


### ★闭包

```python
def fun1(x):
    def fun2(y):
        return x*y
    return fun2
a = fun1(3)
print(type(a))
b = a(5)
print(b)
print(fun1(4)(7))

-------------------------

<class 'function'>
15
28
```


```python
def fun1():
    x = 3
    def fun2():
        x *= x
        return x
    return fun2()
print(fun1())

-------------------------

Traceback (most recent call last):
  File "D:/python/mysources/test2/test2.py", line 155, in <module>
    print(fun1())
  File "D:/python/mysources/test2/test2.py", line 154, in fun1
    return fun2()
  File "D:/python/mysources/test2/test2.py", line 152, in fun2
    x *= x
UnboundLocalError: local variable 'x' referenced before assignment
```


```python
def fun1():
    x = [3]
    def fun2():
        x[0] *= x[0]   #容器化
        return x[0]
    return fun2()
print(fun1())

-----------------------------------

9
```

```python
def fun1():
    x = 3
    def fun2():
        nonlocal x
        x *= x
        return x
    return fun2()
print(fun1())

---------------------------------------

9
```

### ★lambda表达式

```python
a = lambda x,y : x + y
print(a)
print(type(a))
print(a(3,6))

------------------------

<function <lambda> at 0x000001418C837F28>
<class 'function'>
9
```

```python
print(list(filter(lambda x:x%2,[1,2,3,4,5])))
print(list(map(lambda x:x*2+1,[1,2,3,4,7])))

--------------------------------------------------------

[1, 3, 5]
[3, 5, 7, 9, 15]
```


## 字典

### 字典化

```python
a = dict((('2','aaa') , (3,'vvv') , ('ss',7)))
print(a)
a = dict(a='222' , sss=99) #key是字符串
print(a)

----------------------------------------------

{'ss': 7, '2': 'aaa', 3: 'vvv'}
{'a': '222', 'sss': 99}
```

### 字典的bif

```python
a = {}
print(a.fromkeys((1,2,3),'num')) #产生新的但不改变a
print(a)
print(a.fromkeys((1,3,4),('a','b')))
print(a.fromkeys((1,3,4),('a','b','d')))
print(a.fromkeys(range(4),'s'))

-------------------------------------------------

{1: 'num', 2: 'num', 3: 'num'}
{}
{1: ('a', 'b'), 3: ('a', 'b'), 4: ('a', 'b')}
{1: ('a', 'b', 'd'), 3: ('a', 'b', 'd'), 4: ('a', 'b', 'd')}
{0: 's', 1: 's', 2: 's', 3: 's'}
```


```python
a = {}
b = a.fromkeys((1,3,4),'s')
print(b.keys())
print(b.values())
print(dict(b.items()))
print(b.get(7,'x'))
print(b.get(3,'x'))

----------------------------

dict_keys([1, 3, 4])
dict_values(['s', 's', 's'])
{1: 's', 3: 's', 4: 's'}
x
s
```

```python
a = {1:2}
b = a
a = {}
print(a)
print(b)
b = a
a.clear()
print(b)

-----------------------------

{}
{1: 2}
{}
```


```python
a = {1:'one' , 2:'to' , 3:'san'}
b = a
c = a.copy()
print(id(a))
print(id(b))
print(id(c))
a.popitem() #随机返回并删除最后一组的键值对
print(a)
a.setdefault(4,'for')
print(a)
d = {'5':'five' , 2:'two'}
a.update(d)
print(a)

----------------------

2597077552072
2597077552072
2597077552200
{2: 'to', 3: 'san'}
{2: 'to', 3: 'san', 4: 'for'}
{2: 'two', 3: 'san', 4: 'for', '5': 'five'}
```

## 文件

### 输入输出重定向

```python
import sys
std_out = sys.stdout #备份
std_in = sys.stdin #备份
sys.stdout = open('out.txt','w')
sys.stdin = open('in.txt','r')
n,m = map(int,input().split())
print(n+m)
sys.stdout.close()
sys.stdin.close()
```

## 异常

### 捕获异常

```python
try:
    print(2)
    print(1+'2')
except (NameError , TypeError) as reason:
    print(reason)

------------------------------------------

2
unsupported operand type(s) for +: 'int' and 'str'
```

```python
try:
    print(2)
    print(1+'2')
except NameError as reason:
    print('not defined' + str(reason))
except TypeError as reason:
    print(reason)
    
-----------------------------------------

2
unsupported operand type(s) for +: 'int' and 'str'
```


```python
try:
    print(2)
    print(1+'2')
except (NameError, TypeError) as reason:
    print(reason)
finally:
    print('aaa')

------------------------------------

2
unsupported operand type(s) for +: 'int' and 'str'
aaa
```





### 异常中的else

```python
try:
    print(2)
    print(1+'2')
except (NameError , TypeError) as reason:
    print(reason)
else:
    print('no error')
finally:
    print('aaa')

-------------------

2
unsupported operand type(s) for +: 'int' and 'str'
aaa
```

## 类

### 	继承（可以继承多个，但要小心）

```python
class Mylist(list):
    pass
ml = Mylist()
ml.append(1)
ml.append(3)
ml.append(2)
ml.sort()
print(ml)

---------------------

[1, 2, 3]
```


### 基本用法

```python
class Person:
    name = None
    school = 'hhu'
    def fun1(self):
        print(self.name)
    def fun2(self):
        print(self.school)
p = Person()
p.name = 'qq'
p.fun1()
p.fun2()

---------------------

qq
hhu
```

### 构造函数

```python
class Person:
    def __init__(self,name,gender):
        self.name = name
        self.gender = gender
    def doit(self):
        print(self.name,self.gender)
p = Person('qq','female')
p.doit()

-----------------------------

qq female
```


### 私有变量

```python
class Person:
    __name = 'aaa'
    def getName(self):
        return self.__name
p = Person()
print(p.getName())
print(p._Person__name)
print(p.__name)
print(p.name)

------------------

aaa
aaa
Traceback (most recent call last):
  File "D:/python/mysources/test2/test2.py", line 282, in <module>
    print(p.__name)
AttributeError: 'Person' object has no attribute '__name'
```


### 类对象、实例对象

```python
class A:
    f = 1
    def x(self):
        print('xxx')

a = A()
b = A()
c = A()
c.f += 1
print(c.f)
print(a.f)
A.f += 100
print(a.f)
print(b.f)
print(c.f)
d = A()
print(d.x())
d.x = 1
print(d.x)
print(d.x())

-------------------

Traceback (most recent call last):
  File "D:/python/mysources/test2/test2.py", line 305, in <module>
    print(d.x())
TypeError: 'int' object is not callable
2
1
101
101
2
xxx
None
1
```



## 构造和析构

## 杂乱记录

### 将输入数四舍五入显示

```python
n = float(input())
print('%.2f' % (n + 0.001))
```

### 多组输入直到文件结束

```python
while True:
    try:
        pass
    except:
        break
```

### 二维列表的定义

```python
a = [[0] * 5 for i in range(10)]
print(a)

------------------------------

[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
```

