# 二进制表示集合




以二进制的原理表示集合，以整数呈现

1表示在集合内，0表示不在集合内

一位运算优先于按位逻辑运算

空集  0
只含有第i个元素的集合{i}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  1<<i
含有全部n个元素的集合 {0,1,2,...n-1}         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1<<n) - 1
判断第i个元素是否属于集合S                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if ( s>>i & 1 )  原来的集合变了
向集合中加入第i个元素 S∪{i}            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;S|1<<i
从集合中去除第i个元素  S\{i}           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; S&~(1<<i)
集合S和T的并集                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;S|T
集合S和T的交集 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                            S&T

按顺序枚举集合的子集

```cpp
for(int S=0;S<1<<n;S++)
```

枚举某个集合sup的子集

```cpp
int sub=sup;
do
{
	sub=(sub-1)&sup;
}while(sub!=sup); //处理完0之后，会有-1&sup=sup 
```
枚举{0,1,2,...n-1}所包含的大小为k的子集

```cpp
int comb=(1<<k)-1;
while(comb<1<<n)
{
	int x=comb & -comb , y=comb+x;
	comb=((comb & ~y) / x>>1) | y;
}
```
