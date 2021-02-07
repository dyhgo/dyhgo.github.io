# 正则表达式



正则表达式的基础用法

[在线测试网站](https://regex101.com/)




## 限定符 ？

used? 表示？前面的字符可有可无

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207141931990.png)

## 限定符 *

*之前的字符出现0或多次

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142042972.png)
## 限定符 +

+之前的字符出现至少一次

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142105307.png)

## 出现指定次数

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021020714240580.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142410146.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142416307.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142424142.png)



## 字符串重复出现

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142456452.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)


## 或运算

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142522979.png)

## 指定匹配哪些字符


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142536129.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142541611.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142546339.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142604892.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142612411.png)



## \d表示数字（元字符）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142655236.png)

## \w表示所有的数字、字符、下划线

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021020714270742.png)

## \s表示空格、制表符、换行

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142719737.png)

### 其他说明

\S 是\s的补集

\W是\w的补集

\D是\d的补集

## .表示任意字符（不包括换行符）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142759179.png)

## ^a匹配行首的a

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142810504.png)

## a$匹配行尾的a

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142831271.png)

## 贪婪匹配转懒惰匹配

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207142948493.png)

## 例子：RGB

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207143007541.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

