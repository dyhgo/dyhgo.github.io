# abc168



# [A - ∴ (Therefore)](https://atcoder.jp/contests/abc168/tasks/abc168_a)

## 题意
看题目

## 题解

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	string s;
	cin>>s;
	char c=s[s.length()-1];
	switch(c){
		case '2' :case '4': case '5': case '7': case '9': 
			cout<<"hon\n";
			break;
		case '3':
			cout<<"bon\n";
			break;
		default :cout<<"pon\n"; 
	}
	return 0;
}
```


# [B - ... (Triple Dots)](https://atcoder.jp/contests/abc168/tasks/abc168_b)

## 题意

看题目

## 题解

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	int k;
	cin>>k;
	string s;
	cin>>s;
	
	if(s.length()<=k)cout<<s<<endl;
	else{
		for(int i=0;i<k;i++){
			cout<<s[i];
		}cout<<"..."<<endl;
	}
	
	return 0;
}
```

# [C - : (Colon)](https://atcoder.jp/contests/abc168/tasks/abc168_c)

## 题意

给定时针和分针的长度，起始为12点，问经过h小时m分钟后，时针和分针不连接的端点的距离


## 题解

用比例求夹角，然后余弦定理

```cpp
#include<bits/stdc++.h>
using namespace std;
const double pi = acos(-1);
using db = double;
double toRad(double x){
	return x/180*pi;
}
db COS(db x,db y,db d){
	return sqrt(x*x+y*y-2*x*y*cos(d));
}
db a,b,m,h;
int main(){
	cin>>a>>b>>h>>m;
	db ma = ((int)(h*60+m)%60)*(db)6;
	db ha = ((int)(h*60+m)%720)/(db)2;
	db delta = fabs(ma-ha);
	db Rdel = toRad(delta);
	db ans = COS(a,b,Rdel);
	printf("%.10lf\n",ans);
	return 0;
}
```


# [D - .. (Double Dots)](https://atcoder.jp/contests/abc168/tasks/abc168_d)

## 题意

由n个点组成的边权为1的双向图，每个点一个标志，从这个点开始沿着标志所指向的点（要有边连接）一直走，就可以到达1号点，且是最短路。问对于所有的点是否都存在这样的标志，存在则输出每个标志。

## 题解

bfs 求前趋

最无脑的做法应该是单源最短路求前趋

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const int inf = 0x3f3f3f3f;
const int ninf = 0xc0c0c0c0;
const double pi = acos(-1);
using db = double;
const int max_v = 200005;
int n,m;
int prevv[max_v];        
struct edge
{
    int to,cost;
    edge(int to,int cost){
    	this->to = to;
    	this->cost = cost;
	}
};
typedef pair<int,int> pii;       
int V;
vector<edge> G[max_v];
int d[max_v];
void dijkstra(int s)
{
    priority_queue<pii,vector<pii>,greater<pii> > q;          
    fill(d,d+V,inf);
    fill(prevv,prevv+V,-1);                                                                   
    d[s]=0;
    q.push(pii(0,s));
    while(!q.empty())
    {
        pii p=q.top();
        q.pop();
        int v=p.second;
        if(d[v]<p.first) continue;
        for(int i=0;i<G[v].size();i++)
        {
            edge e=G[v][i];
            if(d[e.to]>d[v]+e.cost)
            {
                d[e.to]=d[v]+e.cost;
                prevv[e.to]=v;                                  
                q.push(pii(d[e.to],e.to));
            }
        }
     } 
}
int main(){
	cin>>n>>m;
	V=n+1;
	for(int i=0;i<m;i++){
		int t1,t2;
		cin>>t1>>t2;
		G[t1].push_back(edge(t2,1));
		G[t2].push_back(edge(t1,1));
	}
	dijkstra(1);
	bool ok=true;
	for(int i=2;i<=n;i++){
		if(prevv[i]==-1) {
			ok=false;break;
		}
	}
	if(ok){
		puts("Yes");
		for(int i=2;i<=n;i++){
			cout<<prevv[i]<<endl;
		}
	}else{
		puts("No");
	}
	//cout<<d[1]<<" "<<d[2]<<" "<<d[3]<<d[4];
	return 0;
}
```

# [E - ∙ (Bullet)](https://atcoder.jp/contests/abc168/tasks/abc168_e)

## 题意

给n个数对 (ai,bi) 

求满足下列条件的集合个数

集合由数对组成，集合中任意两个数对满足 ai\*aj + bi\*bj != 0

## 题解

以上的公式是内积形式，把问题转化成给n个向量，找满足任意两个向量不垂直的集合数

由于零向量和任意向量垂直，所以它只能单独在一个集合内

遍历数对，记录每个斜率（用map存出现的次数）

斜率为0和斜率不存在可以特殊处理

遍历每个斜率（出现次数为num），如果没有和它垂直的（找是否有 -1/k）

那么这个斜率的全集就是num个相同的数

子集有 2^num 个

如果有和它垂直的（个数分别为num1,num2），这两种斜率就不能放在一个集合 内，所以要把它们看成一个整体

从两个集合分开选子集，再合并，总的子集个数为 2^num1 -1+ 2^num2 -1 + 1

减去各自的空集加上总体的空集

然后把每个子集数乘起来（乘法原理）（包括斜率为0和不存在）

最后再加上零向量的个数，减去1（除去空集）

照这个方法做是错的

 debug半天一直错6个点，看了下数据，都是大数，看了下程序，觉得自己逻辑一点也没有漏洞，模数也没有溢出

直到看到这句话

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519190557319.PNG)

1E18 long double 精度不够！！所以只能存原始的数对 (ai,bi) 用gcd处理倍数关系

 由于 (-a,b)   和 (a,-b) 是一致的，所以让第一个数始终大于0

想想 long double 确实精度不够，但那时真的没想到
   

发现一个提供atcoder测试数据的[网站](https://www.dropbox.com/sh/nx3tnilzqz7df8a/AAAYlTq2tiEHl5hsESw6-yfLa?dl=0)

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long ;
ll n,x,y;
using ld = long double;
map<pair<ll,ll>,ll> mp;
const ll mod = 1000000007;
ll zero;
ll h;
ll v;
ll ans = 1;
ll qpow(ll x,ll n)
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
int main(){
	cin>>n;
	for(ll i=0;i<n;i++){
		cin>>x>>y;
		if(x==0 and y==0) zero++;
		else if(x==0) v++;
		else if(y==0) h++;
		else {
			ll g = __gcd(x,y);
			x/=g;
			y/=g;
			if(x<0) x=-x,y=-y;
			mp[{x,y}]++;	
		}	
	}
	for(auto i:mp){
		ll a = i.first.first;
		ll b = i.first.second;
		ll c = i.second;
		if(c==0) continue;
		ll cnt;
		if(-b<0) b=-b,a=-a;
		pair<ll,ll> pll = {-b,a};
		if(!mp.count(pll)){
			cnt = qpow(2,c); ans=(ans*cnt)%mod;
		}else{
			cnt = qpow(2,c)-1LL+qpow(2,mp[pll]);
			cnt %= mod;
			ans=(ans*cnt)%mod;
			mp[pll]=0;
		}
	}
	if(h!=0 and v!=0){
		ll foo = qpow(2,h)-1LL+qpow(2,v);
		foo %= mod;
		ans = (ans*foo)%mod;
	}else if(h==0 and v!=0){
		ll foo = qpow(2,v);
		ans = (ans*foo)%mod;
	}else if(h!=0 and v==0){
		ll foo = qpow(2,h);
		ans = (ans*foo)%mod;
	}
	ans = (ans+zero)%mod;
	ans-=1LL;
	ans+=mod;
	ans%=mod;
	cout<<ans<<endl;
	return 0;
}
```

# [F - . (Single Dot)](https://atcoder.jp/contests/abc168/tasks/abc168_f)

## 题解

待补

好像是细节很多的离散化bfs
