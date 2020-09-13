# 筛法求区间内质数个数？




很早以前写的懒得去审查。。。

不知道对不对。。。

Eprime

```cpp
#include<bits/stdc++.h>
using namespace std;
#define MAX 10000
long long prime1[MAX],num1;
long long prime2[MAX],num2;
bool isprime1[MAX],isprime2[MAX];
int qprime1(int n)
{
	num1=0;
	memset(isprime1,1,sizeof(isprime1));
	isprime1[0]=isprime1[1]=0;
	for(int i=2;i<=n;i++)
	{
		if(isprime1[i])
		{
			prime1[num1++]=i;
			for(int j=2;j*i<=n;j++)
				isprime1[j*i]=0;
		}
	}
	return num1;
}
int qprime2(int m,int n)
{
	num2=0;
	qprime1((int)sqrt(n));
	memset(isprime2,1,sizeof(isprime2));
	for(int i=0;i<num1;i++)
	{
		for(int j=m/prime1[i];j*prime1[i]<=n;j++)
		{
			isprime2[j*prime1[i]]=0;
		}
	}
	for(int i=m;i<=n;i++)
		if(isprime2[i]) num2++;
	return num2;
} 
int main()
{
	cout<<qprime2(10,100);
	return 0;
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200117203509351.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
