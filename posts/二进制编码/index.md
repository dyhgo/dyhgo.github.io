# 二进制编码



#### 二进制转十进制
除2取余
### 十进制转二进制
乘2次幂
### 小数进制转换
e.g.

3.59375

整数部分3的二进制位11

小数部分0.59375

0.59375*2=1.1875 ------------------------ 1</br>

0.1875*2=0.375 ---------------------------0</br>

0.375*2=0.75 ------------------------------0</br>

0.75*2=1.5 --------------------------------1</br>

0.5*2=1 -----------------------------------1</br>


二进制位0.10011

所以3.59375的二进制表示为11.10011

有些小数不能测出现循环

### IEEE754标准的浮点数与十进制数的转换
32位和64位标准
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315221429488.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315221559398.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
通过全1和全0来划定它的表示范围

E.G.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315221751406.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315222313356.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
### 原码
即正常的二进制码（带符号位）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315225331111.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315222526393.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
### 补码
正数（包括+0）的补码和原码一样

负数（包括-0）的补码在原码的基础上“按位取反，末尾加1”

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315225539372.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

补码转原码的一种方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315230724458.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315230844234.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
还可以用逆过程法，即减1取反

### 反码
正数（包括+0）的补码和原码一样

负数（包括-0）的补码在原码的基础上“按位取反”

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315225859664.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
### 补码的加法运算
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315231856790.PNG)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315232256390.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
### 补码的减法运算
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315232559834.PNG)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200315232635141.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

