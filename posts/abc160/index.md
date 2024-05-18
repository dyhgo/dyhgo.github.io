# abc160


# [A - Coffee](https://atcoder.jp/contests/abc160/tasks/abc160_a)

## 题意
判断一个长度为6的字符串，第3位和第4位是否相等，第5位和第6位是否相等

## 题解
模拟

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	string s;
	cin>>s;
	if(s[2]==s[3] and s[4]==s[5]) cout<<"Yes";
	else cout<<"No";
	return 0;
}

```


# [B - Golden Coins](https://atcoder.jp/contests/abc160/tasks/abc160_b)

## 题意
高桥有许多钱，可以兑换成各种硬币，每获得一枚500円的硬币，就能获得1000

点快乐值，每获得一枚5円的硬币，就能获得5点快乐值，问最多能获得多少快乐

值


## 题解

贪心地兑换成500円的硬币，然后再兑换成5円的

ac代码


```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
ll x;
ll ans=0;
int main(){
	cin>>x;
	ans+=x/500;
	ans*=1000;
	x%=500;
	ans+=(x/5)*5;
	cout<<ans<<endl;
	return 0;
}

```

# [C - Traveling Salesman around Lake](https://atcoder.jp/contests/abc160/tasks/abc160_c)

## 题意
在一个圆上有n个点，给定每个点的位置，问沿圆周访问所有点的最短长度

## 题解

访问所有点的路径就是圆周长减去一段隔阂

求隔阂的最大值，依次遍历即可

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,k;
int dist[200005];
int c;
int ans=-1;
int main(){
	//freopen("input.txt","r",stdin);
	cin>>k>>n;
	c=k;
	for(int i=1;i<=n;i++) cin>>dist[i];
	sort(dist+1,dist+n+1);
	for(int i=1;i<=n-1;i++){
		ans=max(ans,dist[i+1]-dist[i]);
	}
	ans=max(ans,c-dist[n]+dist[1]); //n是double不能当作index 
	cout<<c-ans<<endl;
	return 0;
}

```

# [D - Line++](https://atcoder.jp/contests/abc160/tasks/abc160_d)

## 题意
有n个点，依次连线，再把其中两个未连线的点连线

求最短路径长度等于k的路径条数（对于所有的k=1,2,3..）

## 题解

看似是图论题，其实只需要考虑两种情况

枚举所有点对的最短距离

1.直接按顺序走

2.走过特殊的连线

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,x,y;
map<int,int> mp;
int main(){
	//freopen("input.txt","r",stdin);
	cin>>n>>x>>y;
	for(int i=1;i<=n;i++) for(int j=i+1;j<=n;j++)
		mp[min(j-i,abs(i-x)+abs(j-y)+1)]++;
	for(int i=1;i<n;i++) cout<<mp[i]<<endl;
	return 0;
}

```

# [E - Red and Green Apples](https://atcoder.jp/contests/abc160/tasks/abc160_e)

## 题意

DIO有a个红苹果（X）红面包（√）和b片绿面包，c片白面包

每片面包都有时停时间，聪明的DIO可以将白面包涂成红色或者绿色

现在DIO要吃x片红面包和y片绿面包（！DIO居然记得吃几片面包）

DIO的最终目的就是无限时停，问DIO最多能时停几秒

## 题解

贪心地选取时停时间最多的面包

但是有限制条件就是x和y（白色是不受限制的）

所以从红色中选前x个，绿色中选前y个，与白色混合排序

最后选前x+y个

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
ll x,y,aa,bb,cc;
vector<ll> a,b,c;
int main(){
	//freopen("input.txt","r",stdin);
	cin>>x>>y>>aa>>bb>>cc;
	ll temp;
	for(ll i=0;i<aa;i++) {
		cin>>temp;
		a.push_back(temp);
	}
	for(ll i=0;i<bb;i++) {
		cin>>temp;
		b.push_back(temp);
	}
	sort(a.rbegin(),a.rend());
	sort(b.rbegin(),b.rend());
	for(ll i=0;i<x;i++) c.push_back(a[i]);
	for(ll i=0;i<y;i++) c.push_back(b[i]);
	for(ll i=0;i<cc;i++) {
		cin>>temp;
		c.push_back(temp);
	}
	sort(c.rbegin(),c.rend());
	ll sum=0;
	for(ll i=0;i<x+y;i++) sum+=c[i];
	cout<<sum<<endl;
	return 0;
}

```


# [F - Distributing Integers](https://atcoder.jp/contests/abc160/tasks/abc160_f)

## 题意
给一棵树，对于树上的一个顶点，赋值为1，然后对于已赋值顶点的相邻顶点依次

赋值2,3,4..，求有多少种赋值方案，对于所有的顶点

## 题解

又是不会做的一题

树的拓扑序计数 + 换根

（感谢出题人和这道题让我认识了“树的拓扑序计数”，然后第二次遇见了“换根”）

对于某个顶点，方案数就是以这个点为根的“树的拓扑序的个数”

树的拓扑序的个数为

$$
{\frac{n!}{\prod\limits_{}  ^ {} {num}}}
$$


num为每个节点的子节点数（含自己）

小证明：

如果没有限制，则排列组合有n!种

由于子节点要排在父节点的的后面

以根节点为例，它要排在第一个

由于排序是随机的，所以排在第一个的概率为1/num

同理所有的节点作为父节点时都与子节点等概率排序，所以每个都是1/num

全部就是product(num)

n!可以直接求

现在要求product(num)

为避免超时，可以用类似于记忆化搜索的思想

先选取一个点为根（以1为例）求每个节点的子节点个数

直接dfs

然后求product(num[1])

最后换根求不同节点的product(num)

直接dfs

此处换根product(num[i])=product(num[par])*(n-child[i])/child[i]

ac代码

```cpp
//#include"bits/stdc++.h"
#include<iostream>
#include<vector>
using namespace std;
typedef long long ll;
// using pAr = product_as_root;
const ll mod = 1e9+7;
ll n;
ll sn[200005];
ll pAr[200005];
vector<ll> G[200005];
ll qpow(ll x,ll n,ll mod)
{
	ll res =1;
	while(n>0)
	{
		if(n&1) res=res*x%mod;
		x=x*x%mod;
		n>>=1;
	}
	return res;
}
void dfs_sn(ll u,ll v){
	for(auto i:G[u]){
		if(i!=v){
			dfs_sn(i,u); sn[u]+=sn[i];
		}
	}
	sn[u]++;
}
void dfs_cr(ll u,ll v){
	for(auto i:G[u]){
		if(i!=v){
			pAr[i]=pAr[u]*qpow(sn[i],mod-2,mod)%mod*(n-sn[i])%mod;
			dfs_cr(i,u);
		}
	}
}
int main(){
	//freopen("input.txt","r",stdin);
	cin>>n;
	ll t1,t2;
	for(ll i=0;i<n-1;i++) {
		cin>>t1>>t2;
		G[t1].push_back(t2);
		G[t2].push_back(t1);
	}
	dfs_sn(1,0);
	//init
	pAr[1]=1;
	for(ll i=1;i<=n;i++) pAr[1]=pAr[1]*sn[i]%mod;
	dfs_cr(1,0);
	//factorial
	ll fac=1;
	for(ll i=2;i<=n;i++) fac=fac*i%mod;
	for(ll i=1;i<=n;i++){
		cout<<fac*qpow(pAr[i],mod-2,mod)%mod<<endl;
	}
	//for(int i=1;i<=8;i++) cout<<pAr[i]<<" ";
	return 0;
}



```

have a good day ^_\^





