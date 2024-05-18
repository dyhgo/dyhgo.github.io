# Segment Tree





线段树是把区间分割，然后把数据按树存储的数据结构。线段树是一颗完美二叉树

用一个例子来介绍线段树

RMQ（range minimum query）

实现功能
对于一个数列
1.给定s,t求[s,t)区间的最小值（最大值）
2.给定i和x,把ai改成x

```cpp
const int maxn = 1<<17;
int n,dat[2*maxn+1];

void init(int n_)
{
	//为了计算方便,把元素个数扩大到2的幂次方的个数
	 n=1;
	 while(n<n_) n*=2;
	 fill(dat,dat+2*n-1,inf);
}

//将从0开始的第k个值，改成a 
void update(int k,int a)
{
	k+=n-1;
	dat[k]=a;
	//向上更新
	while(k>0)
	{
		k=(k-1)/2;
		dat[k]=min(dat[2*k+1],dat[2*k+2]);
	} 
}

//求[a,b)区间的最小值(从0开始数)
//后面的参数是为了计算方便传入的
//k是节点编号，l，r是k节点对应的区间
//在外部调用是用query(a,b,0,0,n)
int query(int a,int b,int k,int l,int r)
{
	if(r<=a || b<=l) return inf;
	if(a<=l && r<=b) return dat[k];
	else
	{
		int vl=query(a,b,2*k+1,l,(l+r)/2);
		int lr=query(a,b,2*k+2,(l+r)/2,r);
		return min(vl,vr);
	}
} 
```
初始化的时间复杂度O(n)
更新和查询的时间复杂度O(logn)

如果dat以1开头，则可以利用这些性质
\>>1     :        /2取整
<<1 : 乘2
<<1|1 : (*2+1)

[以这题为例](https://ac.nowcoder.com/acm/contest/3005/C)

给出一个长度为 n 的数列，a1,a2,...,an,求其长度为 k 的连续子段的乘积对 998244353 取模余数的最大值。

solution:这道题可以用尺取法、线段树、逆元

线段树的做法不需要update函数，最底层存每个数，父节点存子节点的乘积，最后query每一段区间

AC代码如下

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll mod = 998244353;
ll n_,k;
ll n;
ll dat[4*200005+2];
//[a,b)
ll query(ll a ,ll b,ll k,ll l,ll r)
{
    if(r<=a || b<=l) return 1;
    if(a<=l && r<=b) return dat[k];
    return (query(a,b,k*2+1,l,(l+r)/2) * query(a,b,k*2+2,(l+r)/2,r))%mod;
}
int main()
{
    //freopen("input.txt","r",stdin);
    scanf("%lld%lld",&n_,&k);
    n=1;
    while(n<n_) n*=2;
    for(ll i=n-1;i<n_-1+n;i++)
    {
        scanf("%lld",&dat[i]);
    }
    for(ll i=n-2;i>=0;i--)
    {
        dat[i]=(dat[i*2+1]*dat[i*2+2]) % mod;
    }
    ll ans=-1;
    for(ll i=0;i+k<=n_;i++)
    {
        ans=max(ans,query(i,i+k,0,0,n));
    }
    cout<<ans%mod<<endl;
    return 0;
}
```
有几个点导致WA
<font color=red>1.要用long long 不能用int
2.dat的的大小要用4乘，否则会断错误，因为在query时，最底层的也有可能访问子节点
边界条件是线段树容易出错的地方</font>，以上代码的区间是左闭右开，在判断条件里面用等号<font color=red>注意n_和n的使用


线段树的lazy思想

[参考这里](https://www.cnblogs.com/ECJTUACM-873284962/p/6791203.html)



===========================================================================================================

在这里补一个线段树板子


支持区间加、区间乘、区间求和、区间求平方和

如果求最值可以用上面那个模板

这个模板还没有融合进去

其实线段树的基本操作就是区间查询和区间更新，其他的操作都可以通过两个基本的区间加（区间求最值）、区间求和操作转化

平方和就是通过等式转化、类似地还可以求立方和、不过四次方应该会很麻烦


[测板子题](https://ac.nowcoder.com/acm/contest/200/B)


```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const int maxn = 10005;

struct tnode{    
	ll w,l,r,siz,alazy;
	ll sq,mlazy=1;
}tn[maxn<<2];    

ll n,m;
const ll mod = 0x3f3f3f3f3f3f3f3f;
ll wt[maxn];


void pushup(ll u){   
	tn[u].w = (tn[u<<1].w + tn[u<<1|1].w) % mod;
	tn[u].sq = (tn[u<<1].sq + tn[u<<1|1].sq) % mod;
}

void build(ll u,ll l,ll r){  
	tn[u].l = l;
	tn[u].r = r;
	tn[u].siz = r - l + 1;
	if(l == r){
		tn[u].w = wt[l];   
		tn[u].sq = wt[l] * wt[l];
		return ;
	}
	ll mid = (l+r) >> 1;
	build(u<<1 , l , mid);       
	build(u<<1|1 , mid+1 , r);
	pushup(u);                  
}

void pushdown(ll u){   
	if(tn[u].alazy != 0 or tn[u].mlazy != 1){
		tn[u<<1].sq = ((tn[u<<1].sq + 2LL * tn[u<<1].w * tn[u].alazy % mod) % mod + tn[u].alazy * tn[u].alazy % mod * tn[u<<1].siz % mod) % mod; 
		tn[u<<1|1].sq = ((tn[u<<1|1].sq + 2LL * tn[u<<1|1].w * tn[u].alazy % mod) % mod + tn[u].alazy * tn[u].alazy % mod * tn[u<<1|1].siz % mod) % mod;
		
		tn[u<<1].w =  (tn[u<<1].w * tn[u].mlazy  % mod + tn[u<<1].siz * tn[u].alazy % mod) % mod;
		tn[u<<1|1].w = (tn[u<<1|1].w * tn[u].mlazy  % mod + tn[u<<1|1].siz * tn[u].alazy % mod) % mod;
		

		tn[u<<1].alazy = (tn[u<<1].alazy * tn[u].mlazy % mod + tn[u].alazy) % mod;           
		tn[u<<1|1].alazy = (tn[u<<1|1].alazy * tn[u].mlazy % mod + tn[u].alazy) % mod;
		
		tn[u<<1].mlazy = (tn[u<<1].mlazy * tn[u].mlazy) % mod;
		tn[u<<1|1].mlazy = (tn[u<<1|1].mlazy * tn[u].mlazy) % mod;
		
		
		tn[u].alazy = 0;                                               
		tn[u].mlazy = 1;
	}
}

ll query(ll u,ll l,ll r,ll t){     
	if(l<=tn[u].l and r>=tn[u].r) {
		if(t == 1) return tn[u].w;
		if(t == 2) return tn[u].sq;
	}    
	
	ll ans = 0;
	pushdown(u);                 
	ll mid = (tn[u].l + tn[u].r) >> 1;
	if(l<=mid) ans = (ans + query(u<<1 , l , r , t)) % mod;
	if(r>mid) ans = (ans + query(u<<1|1 , l , r , t)) % mod;
	return ans;
}

void update(ll u,ll l,ll r,ll wa,ll wm){   
	if(l<=tn[u].l and r>=tn[u].r){      
		tn[u].sq = ((tn[u].sq + 2LL * tn[u].w * wa % mod) % mod + wa * wa % mod * tn[u].siz % mod) % mod;
		tn[u].w = (tn[u].w * wm % mod + tn[u].siz * wa % mod) % mod;
		
		tn[u].alazy = (tn[u].alazy * wm % mod + wa) % mod;
		tn[u].mlazy = (tn[u].mlazy * wm) % mod;

		return ;
	}
	pushdown(u);                        
	ll mid = (tn[u].l + tn[u].r) >> 1; 
	if(l<=mid) update(u<<1, l , r , wa , wm);
	if(r>mid) update(u<<1|1, l , r , wa , wm);
	pushup(u);                          
}

int main(){
	//freopen("in.txt","r",stdin);
	cin>>n>>m;
	for(ll i=1;i<=n;i++){
		cin>>wt[i];
	}
	
	build(1,1,n);
	while(m--){
		ll t;
		cin>>t;
		switch(t){
			case 1:{
				ll x,y;
				cin>>x>>y;
				cout<<query(1,x,y,1)<<endl;
				break;
			}
			case 2:{
				ll x,y;
				cin>>x>>y;
				cout<<query(1,x,y,2)<<endl;
				break;
			} 
			case 3:{
				ll x,y,z;
				cin>>x>>y>>z;
				update(1,x,y,0,z%mod);
				break;
			}
			case 4:{
				ll x,y,z;
				cin>>x>>y>>z;
				update(1,x,y,z%mod,1);
				break;
			}
		
		}	

	
	}	
	return 0;
}
```


