# abc158




# A - Station and Bus
### [题目链接](https://atcoder.jp/contests/abc158/tasks/abc158_a)
### 题意
给一长度为3的，只含AB的字符串，问是否存在相邻两个字符不同的情况
### 题解
签到题

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int main()
{
	string s;
	cin>>s;
	if((s[0]=='A' and s[1]=='A' and s[2]=='A') or(s[0]=='B' and s[1]=='B' and s[2]=='B'))
	cout<<"No"<<endl;
	else cout<<"Yes"<<endl;
	return 0;
}

```
# B - Count Balls
### [题目链接](https://atcoder.jp/contests/abc158/tasks/abc158_b)
### 题意
有蓝球和红球若干，将他们排成一排，不断通过以下操作排列，在尾部加a个蓝球，在尾部加b个红球，问前n个球有多少个蓝球

### 题解
签到题

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll=long long;
int main()
{
	//freopen("input.txt","r",stdin);
	ll a,b,n;
	cin>>n>>a>>b;
	ll m=n/(a+b);
	
	ll ans;
	if(n>0) ans=m*a;
	else ans=0;
	
	n-=m*(a+b);
	if(n>a) ans+=a;
	else ans+=n;
	cout<<ans<<endl;
	return 0;
}

```
# C - Tax Increase
### [题目链接](https://atcoder.jp/contests/abc158/tasks/abc158_c)
### 题意
给俩数a,b，问是否存在整数x使得，floor(x*0.08)=a && floor(x*0.1)=b，若存在，输出满足这种条件的最小数，否则输出-1

### 题解
由于数据不大，遍历x，判断是否满足条件

或者求满足条件的两个区间，判断是否有交集

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int main()
{
	//freopen("input.txt","r",stdin);
	int l1,r1,l2,r2;
	int a,b;
	cin>>a>>b;
	l1=ceil(a/0.08);
	double t;
	t=(a+1)/0.08;
	if(t*0.08==a+1)
	r1=t-1;
	else
	r1=floor((a+1)/0.08);
	
	l2=ceil(b/0.1);
	t=(b+1)/0.1;
	if(t*0.1==b+1)
	r2=t-1;
	else
	r2=floor((b+1)/0.1);
	bool flag=true;
	int ans;
	if(r1<l2 or r2<l1) flag=false;
	else if(l2>=l1 and r2<=r1) ans=l2;
	else if(l1>=l2 and r1<=r2) ans=l1;
	else ans=max(l1,l2);
	if(flag) cout<<ans<<endl;
	else cout<<-1<<endl;
	//cout<<l1<<" "<<r1<<" "<<l2<<" "<<r2;
	return 0;
}

```


# D - String Formation
### [题目链接](https://atcoder.jp/contests/abc158/tasks/abc158_d)

### 题意
对于一个字符串，有三种操作，倒置，在头部添加字符，在尾部添加字符，求最后得到的字符串

### 题解
分别存储前缀和后缀，用一个bool来判断顺序，倒置操作给bool取反。

在头部加，如果是顺序的就加在前缀，其他情况同理。

最后通过bool量来控制输出顺序

（直接模拟也可以）

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
string s;
int q;
char c;
int f;
int t;
string pre,suf;
bool order;
int main()
{
	//freopen("input.txt","r",stdin);
	order=true;
	cin>>s;
	cin>>q;
	while(q--)
	{
		cin>>t;
		if(t==1) order^=1; //!!
		else
		{
			cin>>f;
			if(f==1) 
			{
				cin>>c;
				if(order) pre+=c;
				else suf+=c;
			}
			else
			{
				cin>>c;
				if(order) suf+=c;
				else pre+=c;
			}
		}
	}
	if(order)
	{
		reverse(pre.begin(),pre.end());
		cout<<pre<<s<<suf<<endl;
	}
	else
	{
		reverse(suf.begin(),suf.end());
		reverse(s.begin(),s.end());
		cout<<suf<<s<<pre<<endl;
	}
	return 0;
}



```

知识点

1.bool的取反不能flag=-flag，可以用flag^=1

2.string 在的插入函数 e.g.  s.insert(s.begin(),c)  or s.insert(s.end(),c)

3.string的拼接 s=(string)"aaa"+"bbb";  （一定要强制类型转换）

s='a'+(string)"kkk"; （string要强制类型转换，char是不能转成string）

# E - Divisible Substring
### [题目链接](https://atcoder.jp/contests/abc158/tasks/abc158_e)
### 题意
给一个仅由数字组成的字符串和质数p，问有几个子串（连续字符组成的）能够被p整除

### 题解
个人感觉出的特别好的一道题

动态规划+后缀

从最后开始向前遍历每个数

ans+=（以当前数为开头，满足条件的个数）

要求以当前数开头，满足条件的个数，就是个区间问题

这个区间问题可以用后缀来求

当两个后缀模p的余数相等时，这个区间内的数能被p整除（2和5除外）

所以问题转化成求此时的后缀（余数），查询之前和这个余数相等的个数

然后ans+=个数

注意特殊处理一下2和5

以下是对上面结论的证明（实际并不需要严格证明）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200308173734181.png)
ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll=long long;
int n,p;
string s;
map<int,int> mp;  //存余数和对应的个数 
ll ans=0;
int main()
{
	ios::sync_with_stdio(false); cin.tie(0);
	//freopen("input.txt","r",stdin);
	cin>>n>>p>>s;
	if(p==2 or p==5)
	{
		int pt=p;
		for(int i=0;i<n;i++)
			if((s[i]-'0')%pt==0) ans+=i+1;
	}
	else
	{
		mp[0]++;
		int num=0;
		int m=1;
		for(int i=n-1;~i;i--)
		{
			num=(num+(s[i]-'0')*m)%p;
			ans+=mp[num];
			mp[num]++;
			m=(m*10)%p;
		}
	}
	cout<<ans<<endl;
	return 0;
}

```

# F - Removing Robots
### [题目链接](https://atcoder.jp/contests/abc158/tasks/abc158_f)
### 题意
数轴上有n个点，每个点有两个属性（坐标和能够向右移动的距离），随意地激活其中几个点，激活的点必须向右移动该距离，若移动过程中碰到点则那个点被激活，求对于所有的激活情况，最后的结果有多少种

### 题解
动态规划+栈优化

从右往左遍历每个点

给每个点设置一个数值，表示遍历到该点的集合数量（即答案）

判断这个点是否可以覆盖右边的点，可以覆盖，则这个点的数值乘上覆盖点的数值

用栈维护每个遍历的点，如果栈顶没有被覆盖，则栈里面都无需遍历

被覆盖的点就出栈

新的点入栈（因为旧的点被新的点覆盖，集合数已经被新的点记录）

最后遍历一遍栈，累乘数值

ac代码

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
ll n;
const ll mod=998244353;
vector<pair<int,int>> vt;  //存输入 
stack<pair<int,int>> stk;   //将不覆盖的点入栈 ，用栈优化（对于正在检测的点，如果栈顶不满足，则栈里面的都不满足） 
//存点的坐标（identifier）和扫描到这个点时，它满足的集合数量 
int t1,t2;
int main()
{
	//freopen("input.txt","r",stdin);
	ios::sync_with_stdio(false);cin.tie(0);
	cin>>n;
	for(int i=0;i<n;i++)
	{
		cin>>t1>>t2;
		t2+=t1;
		vt.emplace_back(t1,t2);
	}
	sort(vt.rbegin(),vt.rend());  //这种题目几乎都要sort 此处逆序遍历 
	for(int i=0;i<n;i++)
	{
		ll t=1;
		//cout<<stk.empty()<<endl;
		while(!stk.empty() && vt[i].second>stk.top().first)		//遍历栈 注意开区间 
		{
			t=(t*stk.top().second)%mod;
			stk.pop();
			
		}
		//cout<<t<<endl;
		stk.push(make_pair(vt[i].first,t+1));   //!!!!! 一定要加1，因为枚举集合数的时候，对于每个点分两种情况（激活和不激活） 
	} 
	ll ans=1;
	while(!stk.empty())
	{
		ans=(ans*stk.top().second)%mod;
		stk.pop();
		//cout<<ans<<endl;
	}
	cout<<ans%mod<<endl;
	return 0;
} 

```
debug了一小时

发现自己手贱，在声明vector的时候给它分配了空间，然后就出现迷之错误

（我一定是有病才会这么做）

感觉自己的思维和英语都退步了

oh shake it 又没有学习android
