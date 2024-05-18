# mysql基础



## 基本操作

### 进入数据库

```bash
mysql -uroot -p123456;
```

### 查看所有数据库

```bash
show databases；
```

### 	使用某个数据库

```bash
use XXX;
```


### 	查看某个数据库中的admin信息

```bash
select * from admin;
```


### 带条件的查询

```bash
select * from admin where id = 1;
```


### mysql数据类型

[链家](https://www.runoob.com/mysql/mysql-data-types.html)


### 查看当前在哪个数据库

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120093303559.png#pic_center)

### 查看数据库中有哪些表


![在这里插入图片描述](https://img-blog.csdnimg.cn/202011200933260.png#pic_center)


## 创建数据库

### 创建数据库

```bash
create database test2;
```

### 查看数据库中的表

```bash
show tables;
```

### 如何创建一个数据表

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112009343988.png#pic_center)

### 查看某个表的详情

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120093559381.png#pic_center)

或者

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120093607365.png#pic_center)

###  往某个表中添加新的记录

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120093628380.png#pic_center)

### 查看表中的记录

```bash
select * from person;
```

### 增加新字段

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120093708127.png#pic_center)

### 对字段的操作

[链接](https://www.cnblogs.com/mark-luo/p/10876144.html)


## 对某一条记录的crud

### 删除

```bash
delete from person where name = 'dyh';
```

### 更新数据

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120093807970.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)


## 创建表的约束

### 主键约束

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120093849376.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120093853896.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112009385886.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120093904983.png#pic_center)

### 联合主键

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094005554.png#pic_center)

（是 与 逻辑）（不能为null）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094015634.png#pic_center)

### 自增约束

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094032527.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094042354.png#pic_center)


### 忘记添加主键约束，之后添加

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094118858.png#pic_center)

### 删除主键约束

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094130683.png#pic_center)

### 通过修改字段的方式来增加或删除主键约束

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094146953.png#pic_center)

### 唯一约束（和主键约束的区别就是它可以为空）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094201108.png#pic_center)

失败

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094210769.png#pic_center)

这样能成功（猜测和null有关）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094223189.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

还可以直接在创建的时候添加

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112009424575.png#pic_center)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094252500.png#pic_center)

当重复对一个字段添加unique是key会变成mul


### 删除唯一约束

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094317612.png#pic_center)

### 非空约束

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094330445.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112009433711.png#pic_center)

### 默认约束

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112009434920.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094353917.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 外键约束

要两个表 主表和副表

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094411957.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094416138.png#pic_center)


## 数据表设计

### 1NF

字段不可拆分

[链接](https://www.bilibili.com/video/BV1Vt411z7wy?p=16)

### 2NF

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120094457513.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

[链接](https://www.bilibili.com/video/BV1Vt411z7wy?p=17)


### 3NF

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112009452263.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

[链接](https://www.bilibili.com/video/BV1Vt411z7wy?p=18)
