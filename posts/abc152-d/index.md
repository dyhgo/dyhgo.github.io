# abc152-D




[题目链接](https://atcoder.jp/contests/abc152/tasks/abc152_d)
题意：找正整数对（A,B），A、B都不大于N，满足A的第一个数字是B的最后一个数

字，B的第一个数字是A的最后一个数字，个位数也算，输出满足条件的正整数对的个数

----

这种题感觉abc一贯的风格

当时第一感觉是纯模拟肯定巨麻烦，就想着有没有规律，发现没有规律

又想着按数位分类。

按数位分类就要考虑对子里面的数位

花了一些时间把它整理成元素都是9^n的矩阵（一个对称矩阵）

然而并没有什么用，还是得求N-10^k这个剩余部分

问题又回到起点

试图从9^n求和中找规律，无果

试图简化模拟或换个角度模拟，无果

看了别人的解答，大同小异

遍历一遍N，二维数组存N中第一个数字为 i ，最后一个数字为 j 的个数

最后遍历ans+=c[i][j]*c[j][i]

```cpp
#include<bits/stdc++.h>
using namespace std;
int n;
long long ans;
long long c[10][10];
int main()
{
    //freopen("input.txt","r",stdin);
    cin>>n;
    for(int i=1;i<=n;i++)
    {
    	string s=to_string(i);
    	c[s[0]-'0'][s[s.length()-1]-'0']++;
	}
	for(int i=0;i<10;i++)
		for(int j=0;j<10;j++)
			ans+=c[i][j]*c[j][i];
			cout<<ans;
	return 0; 
}
```
总结：我好弱啊

