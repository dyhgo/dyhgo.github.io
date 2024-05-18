# 简易对拍




以[<font cokor=red>这道题](https://ac.nowcoder.com/acm/contest/3947/C)为例

准备一个对拍的文件夹，里面装这些东西

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200127222109818.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
duipai_random_input_src.cpp是产生随机测试数据的代码

```cpp
#include<cstdlib>
#include<iostream>
#include<ctime>
using namespace std;
int t=100;                //数据组数
int main()
{
	srand(time(0));
	freopen("D:\\c++\\duipai\\duipai_random_input.txt","w",stdout);
	int a,b;
	while(t--)
	{
		a=rand();
		b=rand();
		if(a>b) swap(a,b);
		cout<<a<<" "<<b<<endl;
	}
	return 0;
} 
```
将产生的随机测试数据写入duipai_random_input.txt中

ac代码或暴力搜索正确的代码

```cpp
//ac
#include<bits/stdc++.h>
using namespace  std;
typedef long long ll;
ll t1,t2;
ll ad;
ll fun(ll x)
{
	if(x<=50) return x;
	if(x>50 and x<=60) return 50; 
	ll m;
	if(x%60==0) return x-x*10/60;
	else
	{
		m=x/60;
		ll n=50+m*60;
		if(x-n>0)
		{
			return n-10*m;
		}
		else
		{
			return x-10*m;
		}
	}
	
}
 int main()
 {
 	     freopen("D:\\c++\\duipai\\duipai_random_input.txt","r",stdin);
 	     freopen("D:\\c++\\duipai\\duipai_ac_output.txt","w",stdout);
      while(~scanf("%lld%lld",&t1,&t2)) 
      {
      	printf("input data are %lld %lld --- ",t1,t2);
      	printf("%lld\n",fun(t2)-fun(t1-1));
	  }
	  //cout<<fun(180);
    return 0;
}
```

从duipai_random_input.txt读入，写到duipai_ac_output.txt中

wa代码

```cpp
//wa
#include<bits/stdc++.h>
using namespace  std;
typedef long long ll;
ll t1,t2;
ll ad;
ll fun(ll x)
{
	if(x<=50) return x;
	if(x>50 and x<=60) return 50; 
	ll m;
	if(x%60==0) return x-x*10/60;
	else
	{
		m=x/60;
		ll n=50+m*60;
		if(x-n>0)
		{
			return n-10*m;
		}
		else
		{
			return x-10*m;
		}
	}
	
}
 int main()
 {
 	     freopen("D:\\c++\\duipai\\duipai_random_input.txt","r",stdin);
 	     freopen("D:\\c++\\duipai\\duipai_wa_output.txt","w",stdout);
      while(~scanf("%lld%lld",&t1,&t2)) 
      {
      	printf("input data are %lld %lld --- ",t1,t2);
      	printf("%lld\n",fun(t2)-fun(t1)+1);
	  }
	  //cout<<fun(180);
    return 0;
}
```
从duipai_random_input.txt读入，写到duipai_wa_output.txt中

比较duipai_ac_output.txt 和 duipai_wa_output.txt

在duipai文件夹下运行批处理命令（duipai.bat）

```powershell
@echo off
fc duipai_ac_output.txt duipai_wa_outout.txt
pause
```
echo off是不回显，fc是文件比较

运行cpp和bat程序

得到结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200127223435668.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
过于复杂的输入数据和输出数据，简易对拍不好实现

要产生大随机数，可以用

```cpp
long long r=123456789;
cout<<(long long)((double)(rand()*r)/RAND_MAX);
```
[这题](https://atcoder.jp/contests/abc148/tasks/abc148_e)也可对拍
