# mysql查询练习



## 数据准备

### 数据库 

test3

### 建表

|学生表|课程表  |成绩表|教师表|
|--|--|--|--|
| Student| Course | Score|Teacher |
| 学号|  课程号| 学号| 教师编号|
|姓名 |  课程名称| 课程号| 教师名字|
|性别 |  教师编号| 成绩| 教师性别|
|出生年月日 |  | | 出生年月日|
| 所在班级|  | | 职称|
| |  | | 所在部门|

### 学生表

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101323394.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112010132750.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 教师表

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101337537.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101343217.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 课程表

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101353904.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101400494.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 成绩表

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101414347.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101418944.png#pic_center)

### 添加数据

#### 课程表

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101439195.png#pic_center)

#### 分数

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112010145827.png#pic_center)


#### 学生

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101513734.png#pic_center)


#### 教师表

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101526339.png#pic_center)


## 10个基础查询练习

### 查询student中的所有记录

```bash
SELECT * FROM student;
```

### 查询其中几个字段

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101621603.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)


### 查询教师表中不重复的部门

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101636773.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 查询30到50之间的成绩

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101652377.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

或者

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101704253.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 查询成绩是34 32 23

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101722313.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 查询在9001班或者性别为女的同学

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101734798.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 按班级降序查询

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101750166.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

默认升序

### 在成绩表中按cnum升序优先，否则snum降序排列

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112010180468.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 在学生表中查找男有几个

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101817440.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 查询最高分的学生学号和课程号

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101903669.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

或者

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101916588.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

上面limit第一个数字表示从哪开始，第二个数字表示查询几条


## 基础查询2

### 计算7-503课程号的平均成绩

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112010194483.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 查询所有的课程平均分

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120101957352.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)


### 分组与模糊

查询在成绩表中cnum数量大于等于2且cnum以1-开头的成绩平均分（
要用到模糊查询）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120102028942.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)


## 多表查询


### 查询学生名字、选课序号和成绩

首先可以查两个表观察一下

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120102105386.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120102110268.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

最后多表联查

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120102121509.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)


注意是单个等号

### 三表查询

在1的基础上多一个课程名字

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120102149850.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

查询时起个别名

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120102203448.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 查询9001班学生平均分

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120102219233.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 查询选修1-797中成绩高于1004号的同学的所有成绩

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120102230921.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 查询与1001号和1002号学生同年出生的学生

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112010224226.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 查询李雷任课的学生成绩

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120102253236.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 查询选修某课程人数>1的任课老师姓名

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120102303703.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

### 两表合并 union

先做到这边，还有很多以后再补充
