# abc157




# A - Duplex Printing  
#### [题目链接](https://atcoder.jp/contests/abc157/tasks/abc157_a)

### 题意
每一页正反两面可以分别写一个数，问有n个不同的数可以写几页

### 思路
简单模拟

ac代码如下

```cpp
#include<bits/stdc++.h>
using namespace std;
int main()
{
	int a;
	cin>>a;
	if(a&1)
	cout<<a/2+1<<endl;
	else
	cout<<a/2;
	return 0;
}

```


# B - Bingo
##### [题目链接](https://atcoder.jp/contests/abc157/tasks/abc157_b)
### 题意
有一个3*3的网格填满数字，接下来给出一些数字，如果网格中有，就标记。

问是否存在一行或一列或对角线满足它们都被标记
### 思路
由于数据不是很大，所以暴力模拟

ac代码如下


```cpp
#include<iostream>
using namespace std;
bool b[3][3];
int main()
{
	int d[3][3];
	
	int n;
	for(int i=0;i<3;i++)
	for(int j=0;j<3;j++)
	cin>>d[i][j];
	cin>>n;
	int t;
	while(n--)
	{
		cin>>t;
		for(int i=0;i<3;i++)
		for(int j=0;j<3;j++)
		{
			if(d[i][j]==t)
			{
				b[i][j]=true;
				break;
			}
		}
	}
	
	
	bool flag=false;
	for(int i=0;i<3;i++)
	{
		if(b[0][i]== true and b[1][i]==true and b[2][i]==true) 
		{
			flag=true;
			break;
		}
	}
	for(int i=0;i<3;i++)
	{
		if(b[i][0]== true and b[i][1]==true and b[i][2]==true) 
		{
			flag=true;
			break;
		}
	}
	if(b[0][0]==true and b[1][1]==true and b[2][2]==true) 
	{
		flag=true;
		
	}
	if(b[0][2]==true and b[1][1]==true and b[2][0]==true)
	{
		flag=true;
		
	}
	if(flag) cout<<"Yes"<<endl;
	else cout<<"No"<<endl;
	return 0;
}

```

# C - Guess The Number
#### [题目链接](https://atcoder.jp/contests/abc157/tasks/abc157_c)
### 题意
给一个数位n，和若干个条件，条件类型为ai位必须是数字bi，求满足这些条件的最小n

位数，不满足输出-1
### 思路
数据很小，简单模拟，有很多的细节，注意一位数、前导0等特殊情况

由于边打代码边想，所以代码很乱

ac代码如下

```cpp
#include<bits/stdc++.h>
using namespace std;
bool use[3];
int main()
{
	int d[3];
	int n,m;
	cin>>n>>m;
	int s,c;
	bool flag=true;
	for(int i=0;i<m;i++)
	{                                                
		cin>>s>>c;
		s--;
		if(n!=1 and s==0 and c==0)
		{
			flag=false;
			break;
		}
		else if(s>n)
		{
			flag=false;
			break;
		}
		else if(use[s] and c!=d[s])
		{
			flag=false;
			break;
		}
		else
		{
			d[s]=c;
			use[s]=true;
		}
	}
	if(n!=1 and !use[0]) 
	{
		d[0]=1;
		for(int i=1;i<n;i++)
		{
			if(!use[i]) d[i]=0;
		}
	}
	else
	{
		for(int i=0;i<n;i++)
	{
		
		if(!use[i])
		d[i]=0;
	}
	}
	
	if(!flag) cout<<-1<<endl;
	else 
	{
		for(int i=0;i<n;i++)
		{
			cout<<d[i];
		}
		cout<<endl;
	}
	//cout<<use[2]<<endl;
	return 0;
}

```

# D - Friend Suggestions
#### [题目链接](https://atcoder.jp/contests/abc157/tasks/abc157_d)
### 题意
有n个人和两种关系（双向的）friendship 和 blockship

定义：一个人为另一个人的friend candidate

当且仅当满足他们没有这两种关系且他们之间存在着friendship的传导链

问每个人的friend candidate数量
### 思路
由于需要friendship传导链，又存在friendship的双向关系，所以考虑并查集

再遍历一遍信息，如果是直接的friendship和blockship关系就减掉这个人（数量减1）

（需要计算集合元素个数）

ac代码如下

```cpp
#include<bits/stdc++.h>
using namespace std;

int n,m,k;
//union find
int par[100005];  
int rankk[100005];   
int sizz[100005];
int ans[100005];
int a[100005];
int b[100005];
int c[100005];
int d[100005];
void init(int n)      
{
    for(int i=0;i<n;i++)
    {
        par[i]=i;
        rankk[i]=0;
    }
} 

int find(int x)
{
    if(par[x]==x) return x;
    else return par[x]=find(par[x]);     
} 

void unite(int x,int y)
{
    x=find(x);
    y=find(y);
    if(x==y) return ;                
    
    if(rankk[x]<rankk[y]) par[x]=y,sizz[y]+=sizz[x];    
    else
    {
        par[y]=x;
        sizz[x]+=sizz[y];
        if(rankk[x]==rankk[y]) rankk[x]++;    
     } 
} 

bool  same(int x,int y)
{
    return find(x)==find(y);
}
int main()
{
	ios::sync_with_stdio(0);cin.tie(0);
	//freopen("input.txt","r",stdin);
	cin>>n>>m>>k;
	init(n);
	fill(sizz,sizz+n,1);
	for(int i=0;i<m;i++)
	{
		cin>>a[i]>>b[i];
	}
	for(int i=0;i<k;i++)
	{
		cin>>c[i]>>d[i];
	}
	for(int i=0;i<m;i++)
	{
		unite(a[i],b[i]);
	}
	for(int i=1;i<=n;i++)
	{
		ans[i]=sizz[find(i)];
	}
	for(int i=0;i<m;i++)
	{
		if(same(a[i],b[i]))
		{
			ans[a[i]]--;
			ans[b[i]]--;
		}
	}
	for(int i=0;i<k;i++)
	{
		if(same(c[i],d[i]))
		{
			ans[c[i]]--;
			ans[d[i]]--;
		}
	}
	cout<<ans[1]-1;
	for(int i=2;i<=n;i++)
	{
		cout<<" "<<ans[i]-1;
	}
	cout<<endl;
	return 0;
}

```
# E - Simple String Queries
#### [题目链接](https://atcoder.jp/contests/abc157/tasks/abc157_e)
### 题意
给一个只有小写字母的字符串s，和两种操作

将ai下标的字符替换成bi

查询l到r区间内有多少个不同的字母，输出结果

### 思路
数据太大，不能简单模拟

用合理的数据结构

用26个集合存储有这个字母对应的下标

对于查询区间，遍历26个集合，查询这个区间是否存在该字母（如果存在 ans++）

只需要对每个集合二分搜索左边界的标号，如果这个标号在右边界内，即存在

ac代码如下

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,q;
string s;
set<int> st[27];
int main()
{
	ios::sync_with_stdio(false);cin.tie(false);
	//freopen("input.txt","r",stdin);
	cin>>n;
	cin>>s;
	cin>>q;
	for(int i=0;i<26;i++)
	{
		st[i].insert(n);       //防止使用lower_bound时集合为空 
	}
	for(int i=0;i<n;i++)
	{
		st[s[i]-'a'].insert(i);
	}
	int t;
	for(int i=0;i<q;i++)
	{
		cin>>t;
		if(t==1)
		{
			int a;char b;
			cin>>a>>b;
			st[s[a-1]-'a'].erase(a-1);
			st[b-'a'].insert(a-1);
			s[a-1]=b;
		}
		else
		{
			int l,r;
			cin>>l>>r;
			int ans=0;
			for(int i=0;i<26;i++)
			{
				auto it=st[i].lower_bound(l-1);
				if(*it<=r-1) ans++;
			}
			cout<<ans<<endl;
		}
	}
	return 0;
}

```
# F - Yakiniku Optimization Problem
#### [题目链接](https://atcoder.jp/contests/abc157/tasks/abc157_f)

### 题意
平面上有n个点，每个点有一个属性ci，坐标上至少存在一个点使得这个点到其中k个点

的距离*ci（只对k个点中的一点）的值的最大值最小

输出最小值
### 思路
有趣的计算几何

很难通过找到点来求最小值

很常见的做法是用二分法

区间的值为“最大值“

每一次检查满足“最大值”的点是否超过k个

超过则将最大值减小

否则将最大值增大（理论上直到满足k个点）

通过精度来停机

怎样检查？

每个点的属性=当前“最大值”  /  ci

以点为圆心，每个点的属性为半径，每两个圆可能存在交点

遍历每个点，如果交点在某个点的属性范围内，这个点也满足条件

遍历所有情况，求最多有多少个点满足条件

以此来检查是否超过k

<font color=red>注意点

<font color=red>1.只有一个点的特判

<font color=red>2.要有eps，而且eps不能太大也不能太小

<font color=red>3.为避免重复计算，j从i开始，但不能从i+1开始，因为有可能目标点就在某一点上

<font color=red>从i+1开始会wa掉1个测试点

ac代码如下

```cpp
#include <bits/stdc++.h>
using namespace std;
int n, k;
double x[65], y[65], c[65], r[65];
double eps = 1e-8;   //!!!

double dist(pair<double, double> p, pair<double, double> q) {
	double xx = (p.first - q.first)*(p.first - q.first);
	double yy = (p.second - q.second)*(p.second - q.second);

	return sqrt(xx + yy);
}

vector<pair<double, double>> circle_circle_intersection(double x1, double y1, double r1, double x2, double y2, double r2) {
	vector<pair<double, double> > ans;
	double d = dist(make_pair(x1, y1), make_pair(x2, y2));
	if (d > r1 + r2) {
		return ans;
	}
	if (x1 == x2 && y1 == y2) {
		ans.push_back(make_pair(x1, y1)); return ans;
	}
	if (d < abs(r1 - r2)) {
		ans.push_back(make_pair(x1, y1)); return ans;
	}

	double a = (r1*r1 - r2*r2 + d*d)/(2*d);
	double h = sqrt(r1*r1 - a*a);


	double x3 = (x2 - x1)*(a/d) + x1;
	double y3 = (y2 - y1)*(a/d) + y1;

	ans.emplace_back(x3 + h*(y2 - y1)/d, y3 - h*(x2 - x1)/d);
	ans.emplace_back(x3 - h*(y2 - y1)/d, y3 + h*(x2 - x1)/d);

	return ans;
}

int check(double t) {
	int ans = 0;
	for (int i = 0; i < n; i++) {
		r[i] = t/c[i];
	}

	for (int i = 0; i < n; i++) {
		for (int j = i; j < n; j++) {                 //!!!
			vector<pair<double, double> > pts = circle_circle_intersection(x[i], y[i], r[i], x[j], y[j], r[j]);
			for (auto p: pts) {
				int cnt = 0;
				for (int k = 0; k < n; k++) {
					if (dist(p, make_pair(x[k], y[k])) <= r[k] +eps) cnt++;
				}
				ans = max(ans, cnt);
			}
		}
	}
	

	return ans;
}

int main() {
	ios::sync_with_stdio(0); cin.tie(0);
	cin >> n >> k;
	if (k == 1) {
		cout << "0\n"; exit(0);
	}
	for (int i = 0; i < n; i++) {
		cin >> x[i] >> y[i] >> c[i];
	}

	double l = 0, r = 100000000;
	while(r-l>=1e-8)
	{
		double mid = (l + r)/2;

		if (check(mid) >= k) {
			r = mid;
		} else {
			l = mid;
		}
	}
	cout << fixed << setprecision(9) << r << '\n'; 

	return 0;
}

```


个人感觉abc很考验思维和对数据结构的熟练度

