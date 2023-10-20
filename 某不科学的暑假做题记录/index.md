# 某不科学的暑假做题记录


## 简单思维 

[题目](http://acm.hdu.edu.cn/showproblem.php?pid=6600)

### 题解

直接法，注意数组大小爆long long

```cpp
#include<bits/stdc++.h>
using ll = long long;
const ll  mod = 1e6+3;
ll fac[mod+2];
int main(){
	fac[0] = 1LL;
	fac[1] = 1LL;
	for(ll i=2;i<mod+2;i++){
		fac[i] = i*fac[i-1];
		fac[i] %= mod;
	}
	ll n;
	while(std::cin>>n){
		if(n>=mod) puts("0");else
		std::cout<<fac[n]<<std::endl;
	}
	return 0;
}

```


===========================================================================================================


## 并查集 排列组合 容斥原理

[题目](https://ac.nowcoder.com/acm/contest/889/E)

### 题解

并查集模拟操作

每次的答案依赖于上一次的答案

对于当前给出的两个数

如果在一个集合内，则 ans = ans

如果不在一个集合内，假设一个在A集合，一个在B集合

num(S) 表示满足条件S的方案数

四元组为 Q

并查集的集合为 U

设合并A、B后的集合为C

`ans -= num(∃q ∈ Q , (q∈A) ∧ (Q\q ∈ U\(A , B) ) )`

`ans -= num(∃q ∈ Q , (q∈B) ∧ (Q\q ∈ U\(A , B) ) )`

`ans -= num(∃q1,q2 ∈ Q ,  (q1 ∈ A) ∧ (q2 ∈ B)  ∧ (Q\(q1 , q2) ∈ U\(A , B) )`

`ans += num(∃q ∈ Q , (q ∈ C) ∧ (Q\q ∈ U\C) )`


由于12式和4式相抵消，所以实际只要操作3式


由于3式需要在并查集中选两个的方案数，所以维护两个变量

ans two (在并查集中选两个元素的方案数，选的元素可重复)

利用容斥原理和排列组合

`num(∃q1,q2 ∈ Q ,  (q1 ∈ A) ∧ (q2 ∈ B)  ∧ (Q\(q1 , q2) ∈ U\(A , B) ) = size(A) * size(B) * (two - (size(A) * (n - size(A)) - (size(B) * (n - size(B)) + size(A) * size(B) )`

更新完ans后更新two


初始化

`ans = C(n,4) two = C(n,2)`

数据规模大，用unsigned long long 

注意这样初始化

```cpp
ll ans = n*(n-1)/4*(n-2)/3*(n-3)/2; 
```

而不是

```cpp
ll ans = n*(n-1)*(n-2)*(n-3)/24; 
```

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = unsigned long long;
//using ld = long double;
const int maxn = 1e5+3;
ll n,m;
ll par[maxn];  
ll rankk[maxn];   
ll sizz[maxn];

void init(ll n)      
{
    for(ll i=0;i<n;i++)
    {
        par[i]=i;
        rankk[i]=0;
    }
    fill(sizz,sizz+n,1);
} 

ll find(ll x)
{
    if(par[x]==x) return x;
    else return par[x]=find(par[x]);     
} 

void unite(ll x,ll y)
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

bool same(ll x,ll y)
{
    return find(x)==find(y);
}

int main(){
	cin>>n>>m;
	ll two = n*(n-1)/2;
	ll ans = n*(n-1)/4*(n-2)/3*(n-3)/2; 
	cout<<ans<<endl;
	init(n);
	for(ll i=0;i<m;i++){
		ll x,y;
		cin>>x>>y;
		x--,y--;
		
		if(!same(x,y)){
			ll szx = sizz[find(x)];
			ll szy = sizz[find(y)];
			
			ans -= (szx * szy * (two - szx * (n - szx) - szy * (n - szy) + szx * szy));
			two -= szx * szy;
			unite(x,y);
			
			cout<<ans<<endl;
		}else cout<<ans<<endl;
	}
	
	
	return 0;
}
```



===========================================================================================================

## kmp

[题目](https://ac.nowcoder.com/acm/contest/6226/E)

### 题解

先找既是前缀又是后缀的最长子串

这可以利用kmp的next数组

然后去掉原串的头尾作为匹配串，由next数组得到的作为模式串

再进行kmp匹配，如果匹配不成功，则在模式串中取前next[len]的长度

不断重复，直到与匹配串匹配

```cpp
#include<bits/stdc++.h>
using namespace std;
char s[100005],p[100005],pp[100005],ppp[100005];
int n,m;
int nextt[100005];

void get_next(){
    int i=0,j=-1;
    nextt[0]=-1;
    while(i<m){
        if(j==-1 || p[i]==p[j]) nextt[++i]=++j;
        else j=nextt[j]; //!!!
    }
}
int kmp(){
    int i=0,j=0;
    while(1){
        if(s[i]==p[j]) i++,j++;
        else{
            int t=nextt[j];
            if(t==-1) i++,j=0;
            else j=t;
        }
        if(j>=m) return i-m;    
        if(i>=n) return -1;
    }
}
int main(){
    cin>>p;
    m = strlen(p);
    get_next();
    int len = nextt[m];
    strncpy(pp,p,len);
    len = strlen(p) - 2;
    strncpy(s,p+1,len);
    strcpy(p,pp);
    m = strlen(p);
    n = strlen(s);
    while(1){
    	if(kmp()!=-1){
    		cout<<p<<endl;
    		break;	
		}//else if(nextt[strlen(p)] == -1) break;
		else{
			strncpy(ppp,p,nextt[strlen(p)]);  //不能拷贝给自身
			strcpy(p,ppp);
			m = strlen(p);
			//cerr<<p<<endl;
		}
	}
    
    return 0;
}
```



===========================================================================================================


## 换根dp

[题目](https://ac.nowcoder.com/acm/contest/6226/C)

### 题解

`dpd[u]` 表示以u为根的子树的连通块数

`dpu[u]` 表示u之上的连通块数

`ans[u]` 表示包含u的连通块数

假设 `v` 是 `u` 的子节点，`p` 是 `u` 的父节点 ，`s` 是 `u` 的兄弟节点

`dpd[u] = (dpd[v1] + 1) * (dpd[v2] + 1) * (dpd[v3] + 1) * ...`


`ans[u] = dpd[u] * (dpu[u] + 1)`

`dpu[u] = ans[p] / (dpd[u] + 1)`

当 `(dpd[u] + 1) % mod = 0` 时，模数无效，所以这种情况要特殊处理

`dpu[u] = (dpu[p] + 1) * (dpd[s1] + 1) * (dpd[s2] + 1) * ...`

两次dfs，一次求dpd，一次求dpu并更新ans

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 1e9 + 7;
const int maxn = 1e6 + 5;
struct edge{
    int to , next;
}e[maxn<<1];
ll tot,head[maxn<<1];

void add_edge(int u,int v){
    e[tot].to = v;
    e[tot].next = head[u];
    head[u] = tot++;
}


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


ll dpu[maxn],par[maxn],dpd[maxn],ans[maxn];
ll V;


void dfs1(int u,int p){
	dpd[u] = 1;
	par[u] = p;
	for(int i=head[u]; ~i ;i=e[i].next){
		int v = e[i].to;
		if(v == p) continue;
		dfs1(v,u);
		dpd[u] *= (dpd[v] + 1);
		dpd[u] %= mod;
 	}
}

void dfs2(int u,int p){
	if(u != 1){
		if((dpd[u] + 1) % mod){
			dpu[u] = ans[p] * qpow(dpd[u] + 1 , mod - 2);
			dpu[u] %= mod;
			ans[u] = dpd[u] * (dpu[u] + 1);
			ans[u] %= mod;
		}
		else{
			ll tmp = dpu[p] + 1;
			for(int i=head[p]; ~i ;i=e[i].next){
				int v = e[i].to;
				if(v == par[p] or v == u) continue;
				tmp *= dpd[v] + 1;
				tmp %= mod;
			}
			dpu[u] = tmp;
			ans[u] = dpd[u] * (dpu[u] + 1);
			ans[u] %= mod;
		}
	}
	for(int i=head[u]; ~i ;i=e[i].next){
		int v = e[i].to;
		if(v == p) continue;
		dfs2(v,u);
	}
}

int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);
	memset(head,-1,sizeof(head));
	cin>>V;
	for(int i=0;i<V-1;i++){
		ll x,y;
		cin>>x>>y;
		add_edge(x,y);
		add_edge(y,x);
	}	
	
	dfs1(1,0);
	ans[1] = dpd[1];
	dfs2(1,0);
	for(int i=1;i<=V;i++){
		cout<<ans[i]<<endl;
	}
	return 0;
}

```


===========================================================================================================

## 贪心 思维

[题目](https://atcoder.jp/contests/aising2020/tasks/aising2020_e)

### 题解

把L大的放左边，把R大的放右边

假设L大的有a个，R大的有b个

可以把他们分开放置

先处理前a个位置（这些都放置L大的数）

再处理后b个位置（这些都放置R大的数）

对于前a个位置

遍历L大的集合（L大的排前面）

对于当前数，贪心地把它放在不超过k的最右边

如果不满足条件，就放在区间的最右边（此时放哪里，贡献都一样，为了给别的数腾出位置，贪心地放在最右边）

对于后b个位置

遍历R大的集合（R大的排前面）

对于当前数，贪心地把它放在超过k的最左边

如果不满足条件，就放在区间的最左边（此时放哪里，贡献都一样，为了给别的数腾出位置，贪心地放在最左边）


```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
vector<pair<int,int>> vL;
vector<pair<int,int>> vR;
int t;
int n;
set<int> sL;
set<int> sR;
#define fi first
#define se second
int main(){
	cin>>t;
	while(t--){
		ll ans = 0;
		cin>>n;
		vL.clear();
		vR.clear();
		for(int i=0;i<n;i++){
			int k,l,r;
			cin>>k>>l>>r;
			if(l<r) vR.push_back({l-r,k});
			else vL.push_back({l-r,k});
			ans += r;
		}
		for(int i=1;i<=vL.size();i++) sL.insert(i);
		for(int i=vL.size()+1;i<=n;i++) sR.insert(i);
		sort(vL.begin(),vL.end(),greater<pair<int,int>>());
		sort(vR.begin(),vR.end());
		for(auto i:vL){
			auto tmp = sL.upper_bound(i.se);
			if(tmp == sL.begin()){
				sL.erase(--sL.end());
			}else{
				ans += i.fi;
				sL.erase(--tmp);
			}
		}
		for(auto i:vR){
			auto tmp = sR.upper_bound(i.se);
			if(tmp == sR.end())	{
				sR.erase(sR.begin());
				ans += i.fi;
			}
			else{
				sR.erase(tmp);
			}		
		}
		cout<<ans<<endl;
	}
	
	return 0;
}
```


===========================================================================================================

## 栈

[题目](https://ac.nowcoder.com/acm/contest/6290/A)

### 题解

栈的经典应用

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll a[10005];
stack<int> sk;
int ans[10005];
int main(){
    ll n;
    cin>>n;
    for(int i=0;i<n;i++) {
        cin>>a[i];
    }
    int i = 0;
    while(i < n){
        if(sk.empty() or a[i] <= a[sk.top()]){
            sk.push(i);
            i++;
        }
        else{
            ans[sk.top()] = i;
            sk.pop();
        }
    }
    while(!sk.empty()){
        ans[sk.top()] = -1;
        sk.pop();
    }
    for(int i=0;i<n;i++) cout<<ans[i]+1<<" "; cout<<"\n";
    return 0;
}
```


## 树链剖分

[题目](https://ac.nowcoder.com/acm/contest/6290/D)

### 题解

树链剖分裸题

线段树需支持区间平方和操作

这道题用int不能过

注意细节

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll maxn = 1e5+10;
struct edge{     
	ll to,nxt;
}e[maxn<<1];    

struct tnode{    
	ll w,l,r,siz,alazy;
	ll sq,mlazy=1LL;
}tn[maxn<<2];    

ll wch[maxn],sz[maxn],head[maxn],wt[maxn],dep[maxn],dfn[maxn],par[maxn],top[maxn],rdfn[maxn];

ll n,q;
const ll mod = 23333;


ll cnt_e;   
ll cnt_d;   

void add_edge(ll u,ll v){   
	e[++cnt_e].to = v;        
	e[cnt_e].nxt = head[u];   
	head[u] = cnt_e;
}

void dfs1(ll u,ll p){      
	sz[u] = 1;
	for(ll i = head[u]; i ; i=e[i].nxt){
		ll t = e[i].to;
		if(t != p){
			dep[t] = dep[u] + 1;
			par[t] = u;
			dfs1(t,u);
			sz[u] += sz[t];
			if(sz[t] > sz[wch[u]]) wch[u] = t;
		} 
	}
}

void dfs2(ll u,ll p,ll tp){  
	top[u] = tp;
	dfn[u] = ++cnt_d;          
	rdfn[cnt_d] = u;           
	if(wch[u]){                
		dfs2(wch[u],u,tp);
	}
	for(ll i=head[u]; i ; i=e[i].nxt){
		ll t = e[i].to;
		if(t != p and t != wch[u]){
			dfs2(t,u,t);      
		}
	}
}

void pushup(ll u){   
	tn[u].w = (tn[u<<1].w + tn[u<<1|1].w) % mod;
	tn[u].sq = (tn[u<<1].sq + tn[u<<1|1].sq) % mod;
}

void build(ll u,ll l,ll r){  
	tn[u].l = l;
	tn[u].r = r;
	tn[u].siz = r - l + 1;
	if(l == r){
		tn[u].w = wt[rdfn[l]];   
		tn[u].sq = wt[rdfn[l]] * wt[rdfn[l]];
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

	cin>>n>>q;
	for(ll i=1;i<=n;i++){
		scanf("%lld",&wt[i]);
	}
	
	for(ll i=0;i<n-1;i++){
		ll x,y;
		scanf("%lld %lld",&x,&y);
		add_edge(x,y);
		add_edge(y,x);
	}
	
	dfs1(1,0);
	dfs2(1,0,1);
	build(1,1,n);
	
	for(ll i=0;i<q;i++){
		ll t;
		scanf("%lld",&t);
		if(t==1){
			ll x,y;
			scanf("%lld %lld",&x,&y);
			update(1,dfn[x],dfn[x]+sz[x]-1,y%mod,1LL);
		}
		else{
			ll x;
			scanf("%lld",&x);
			printf("%lld\n", query(1,dfn[x],dfn[x]+sz[x]-1,2));
		}
	}

	return 0;
}
```


===========================================================================================================

## 计算几何

[题目](https://ac.nowcoder.com/acm/contest/5667/B)

### 题解

两两求圆心，圆心相同表示能在同一个圆上

求最多的圆心数量

需要固定一个点，每次换点时求一次max，如果在遍历完所有点对求max，就变成排列组合

```cpp
#include<bits/stdc++.h>
using namespace std;
using db = double;
struct point{
    db x,y;
}ps[2005];
map<pair<db,db>,int> mp;
db X,Y;
inline db out(point a,point b,point c) {
    return (c.x - a.x) * (c.y - b.y) - (c.y - a.y) * (c.x - b.x); 
}
bool circle_center(point a,point b,point c){
	if(out(a,b,c) == 0 ) return false;
    db a1 = b.x - a.x, b1 = b.y - a.y, c1 = (a1 * a1 + b1 * b1) / 2;
    db a2 = c.x - a.x, b2 = c.y - a.y, c2 = (a2 * a2 + b2 * b2) / 2;
    db d = a1 * b2 - a2 * b1;
    X = a.x + (c1 * b2 - c2 * b1) / d , Y = a.y + (a1 * c2 - a2 * c1) / d;
    return true;
}
int main(){
    int n;
    cin>>n;
    for(int i=0;i<n;i++) {
        cin>>ps[i].x;
        cin>>ps[i].y;
    }
    int ans = 0;
    for(int i=0;i<n;i++){
    	mp.clear();
        for(int j=i+1;j<n;j++){
        	if(circle_center((point){0,0} , ps[i] , ps[j]))
            mp[{X,Y}]++;
        }
        int tmp = 0;
        for(auto i:mp) tmp = max(tmp , i.second);
        ans = max(ans ,  tmp);
    }
    cout<<ans+1<<endl;
    return 0;
}
```

===========================================================================================================

## 并查集

[题目](https://ac.nowcoder.com/acm/contest/5668/G)


### 题解

并查集模改

细节参考官方题解

并查集模拟操作，链表维护相同颜色的节点

注意要记录初始的状态（debug好久）

```cpp
#include<bits/stdc++.h>
using namespace std;
const int maxn = 8e5 + 10;
vector<int> G[maxn];
list<int> ls[maxn];
int par[maxn];    
  
void init(int n)      
{
    for(int i=0;i<n;i++)
    {
        par[i]=i;
        ls[i].push_back(i);
    }
} 

int find(int x)
{
    if(par[x]==x) return x;
    else return par[x]=find(par[x]);    
}

int main(){
	int t;
	cin>>t;
	while(t--){
		int n,m;
		cin>>n>>m;
		//reset
		for(int i = 0;i<=n;i++) {
			G[i].clear(); ls[i].clear();
		}
			
		for(int i = 0;i<m;i++){
			int x,y;
			cin>>x>>y;
			G[x].push_back(y);
			G[y].push_back(x);
		}
		
		init(n);
		int q;
		cin>>q;
		while(q--){
            
			int x;
			cin>>x;
			
			if(x != par[x]) continue;
			int sz = ls[x].size();  //记录初始的链表大小
			int px = find(x);   //记录初始的根节点
			while(sz--){
				int cnt = ls[x].front();
				ls[x].pop_front();
				for(int i:G[cnt]){
					int pi = find(i);  //记录初始的根节点
					if(px == pi) continue;
					par[pi] = px; //这样合并
					ls[x].splice(ls[x].end() , ls[pi]);		
				}
			}
		
		}
		for(int i=0;i<n;i++) cout<<find(i)<<" ";
		puts("");
	}
	return 0;
}
```


===========================================================================================================

## 数论 思维

[题目](https://ac.nowcoder.com/acm/contest/5669/H)

### 题解

1和大于n/2的质数都不能匹配

先处理质因子稀有的数，就是从大到小遍历质数

然后把含有这个质因子的数两两匹配

如果含有这个质因子的数的个数是奇数个

就不匹配 2*p 这个数，留给下一个质因子，因为2是最多的质因子

```cpp
#include "bits/stdc++.h"
using namespace std;
const int maxnn = 2e5+10;
bool isprime[maxnn];
void e_sieve(int n = maxnn){
    for(int  i = 1;i<n;i++){
        isprime[i] = true;
    }
    isprime[0] = isprime[1] = false;
    for(int i = 2;i < n;i++){
        if(isprime[i]){
            for(int j = 2 * i ; j < n ; j += i){
                isprime[j] = false;
            }
        }
    }
}
int use[maxnn] ;
int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    e_sieve();
    int t;
    cin>>t;
    while (t--){
        int n;
        cin>>n;

        for(int i = 1; i <= n ; i++) use[i] = 0;
        vector<pair<int,int>> ans;
        for(int i = n/2 ; i >= 2 ; --i){
            if(isprime[i]){
                vector<int> tmp;
                for(int j = i; j <= n ; j += i){
                    if(use[j] == 0){
                        tmp.push_back(j);
                    }
                }
                if(tmp.size() & 1){
                    for(int x = 0 ; x < tmp.size() ; ++x){
                        if(tmp[x] == i * 2) tmp.erase(tmp.begin() + x);
                    }
                }

                for(int i = 0 ; i < tmp.size() - 1 ; i += 2){
                    ans.push_back({tmp[i] , tmp[i+1]});
                    use[tmp[i]] = 1;
                    use[tmp[i+1]] = 1;
                }
            }
        }
        //for(int i = 2; i < 20 ; i++) cout<<i<<" "<<isprime[i]<<"\n";
        cout<<ans.size()<<endl;
        for(auto i : ans){
            cout<<i.first<<" "<<i.second<<endl;
        }
    }
    return 0;
}
```

===========================================================================================================

## 数论

[题目](https://ac.nowcoder.com/acm/contest/5668/F)

### 题解

如果没有 d<b f<b 的条件直接让 d = f = b

如果 a/b 能约分成 a' / b'

则 d = f = b'

e = 1 , c = a‘+1（随便赋值）

如果 a/b不能约分

就把b分解质因数（预处理每个数最小的质因子）

设b分解成 p1 p2 

如果p1 p2 有1 无解

否则根据通分公式  d = p1 , f = p2

cf - de = a

因为d f是b的因子 ，b 和 a  互质 ，所以gcd(f/a , d/a) = 1

-(d/a)e + c(f/a) = 1

用扩展欧几里得公式求出 c e 

e = -e  如果 e c有负数 ，正数化

然后 e c 都乘上 a

```cpp
#include "bits/stdc++.h"

using namespace std;
using ll = long long;

const ll maxn = 2e6+10;

ll gcd(ll a , ll b){
    return b == 0 ? a : gcd(b , a % b);
}


bool isprime[maxn+1]; //is i a prime number
ll minp[maxn+1];

void e_sieve(int n = maxn)
{

    for(int i=0;i<=n;i++) isprime[i]=true;  //initialize
    isprime[0]=isprime[1]=false;
    for(int i=2;i<=n;i++)
    {
        if(isprime[i])
        {
            for(int j=2*i;j<=n;j+=i) isprime[j]=false;
        }
    }


    for(ll i = 2 ; i <= n; i++){
        if(isprime[i]){
            for(ll j = i; j <= n; j += i){
                if(minp[j] == 0) minp[j] = i;
            }
        }
    }
}

ll ex_gcd(ll a,ll b,ll& x,ll& y)
{
    ll t,res;
    if(!b)
    {
        x=1;y=0;return a;
    }
    else
    {
        res=ex_gcd(b,a%b,x,y);
        t=x;
        x=y;y=t-a/b*y;
        return res;
    }
}



int main() {
#ifdef LOCAL
    freopen("in1.txt", "r", stdin);
    freopen("out1.txt", "w", stdout);
#endif

    e_sieve();
    //for(int i = 2; i< 100;i++) cout<<i<<" "<<minp[i]<<endl;
    int _;
    cin >> _;
    while (_--) {
        ll a, b;
        cin >> a >> b;
        ll c , d , e , f;
        ll t = gcd(a , b);
        if(t != 1){
            a /= t;
            b /= t;
            d = f = b;
            e = 1;
            c = a + 1;
            cout<<c<<" "<<d<<" "<<e<<" "<<f<<endl;
            continue;
        }
        ll p1 = 1,p2 = b,p = minp[b];
        if(p == 0) {
            cout<<-1<<" "<<-1<<" "<<-1<<" "<<-1<<endl;
            continue;
        }
        while(p2 % p == 0){
            p2 /= p;
            p1 *= p;
        }
        if(p2 == 1){
            cout<<-1<<" "<<-1<<" "<<-1<<" "<<-1<<endl;
            continue;
        }
        d = p1;
        f = p2;
        ex_gcd(d, f, e, c);
        e = -e;

        if(e <= 0 or c <= 0){
            ll et = (e % f + f) % f;
            ll ct = (c % d + d) % d;
            ll mm = max(0ll , max((et - e) / f , (ct - c) / d));
            e += f * mm;
            c += d * mm;
        }
        e *= a;
        c *= a;
        cout<<c<<" "<<d<<" "<<e<<" "<<f<<endl;
    }

    return 0;
}
```


===========================================================================================================


## 计算几何 区间dp

[题目](https://ac.nowcoder.com/acm/contest/74/C)

### 题解

很难的一道题

由于切割的方案数太多，所以考虑dp

`dp[i][j]` 表示点 `i` 到点 `j` 的答案

转移方程

`dp[i][j] = min(dp[i][j] , max( max (dp[i][k] , dp[k][j]) , area(ps[i] , ps[j] , ps[k]) ) )`

计算面积直接用外积 `1/2 * (A->B) X (A->C)`

由于题目存在凹多边形的情况

所以当有点在三角形 `i j k`中，这个区间不可分割（根据面积判断，这个技巧可以用于求一个点是否在凸多边形内）

dp的初始化 

`dp[i][i+2] = area(ps[i] , ps[i+1] , ps[i+2])`

`dp[i][i] = dp[i][i+1] = 0`

`dp[i][i+m] = inf [m>2]`

几个注意点

用eps ， 初始化只有一类为inf ， 用外积求面积要加绝对值 ， dp的遍历先遍历区间长度（因为从小的先更新，大的区间依赖于小的，这也是很多区间dp要求的）

```cpp
#include "bits/stdc++.h"

using namespace std;
using ll = long long;
const int inf = 0x3f3f3f3f;
const int maxn = 105;
double eps = 1e-10;
struct point{
    double x,y;
}ps[maxn];
double dp[maxn][maxn];
int n;
//a->c X b->c
double area(point a,point b,point c) {
    return fabs((c.x - a.x) * (c.y - b.y) - (c.y - a.y) * (c.x - b.x)) / 2;
}

bool judge(int a,int b,int c){
    double s = area(ps[a], ps[b], ps[c]);
    for(int i =1;i<=n;i++){
        if(i == a or i == b or i == c) continue;
        double t = area(ps[i],ps[a],ps[b]) + area(ps[i],ps[a],ps[c]) + area(ps[i],ps[b],ps[c]);
        if(fabs(t - s) < eps) return false;
     }
    return true;
}

int main() {
#ifdef LOCAL
    freopen("in1.txt", "r", stdin);
    freopen("out1.txt", "w", stdout);
#endif
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);

    while(cin>>n){

        for(int i=1;i<=n;i++){
            cin>>ps[i].x>>ps[i].y;
            if(i>=3){
                dp[i-2][i] = area(ps[i] , ps[i-1] , ps[i-2]);
            }
        }

        for(int len = 3 ; len <= n ; len++){
            for(int i = 1,j = i+len;j<=n;i++,j++){
                dp[i][j] = inf;
                    for(int k = i + 1 ; k < j ; k++){
                        if(judge(i,j,k)){
                            dp[i][j] = min(dp[i][j] , max(max(dp[i][k] , dp[k][j]) , area(ps[i] , ps[j] , ps[k])));
                        }
                    }

            }
        }
        printf("%.1lf\n", dp[1][n]);
    }
    return 0;
}
```

 
 ===========================================================================================================
 
## 并查集 思维

[题目](http://acm.hdu.edu.cn/showproblem.php?pid=6763)

### 题解

选择权值不为0的极大连通块，全部-1，不断重复，并记录操作次数

由于点变成0后要从连通块中分裂出来很麻烦，所以考虑倒着来，即单个点合并成连通块

权值从大到小处理，对于u先假设它是单点，ans+=该点的权值，标记为访问

对于它相邻的点v，如果访问过（表示v比u权值大）但不在一个集合内，则合并，然后减去u的权值

因为u和v在一个集合内，v和u共享了u的权值次操作

注意用scanf

```cpp
//#include "bits/stdc++.h"
#include "iostream"
#include "algorithm"
#include "vector"


using namespace std;
using ll = long long;
const int maxn = 100005;
pair<int,int> b[maxn];
vector<int> G[maxn];
//union find
int par[maxn];
int rankk[maxn];
int sz[maxn];
int used[maxn];

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

    if(rankk[x]<rankk[y]) par[x]=y;
    else
    {
        par[y]=x;
        if(rankk[x]==rankk[y]) rankk[x]++;
    }
}

bool  same(int x,int y)
{
    return find(x)==find(y);
}

int main() {
#ifdef LOCAL
    freopen("in1.txt", "r", stdin);
    freopen("out1.txt", "w", stdout);
#endif



    int _;
    cin >> _;
    while (_--) {

        int n,m;
        scanf("%d%d",&n,&m);
        for(int i=0;i<=n;i++) G[i].clear();
        for(int i=1;i<=n;i++) {
            scanf("%d",&b[i].first);
            b[i].second = i;
        }
        for(int i=0;i<m;i++){
            int u,v;
            scanf("%d%d",&u,&v);
            G[u].push_back(v);
            G[v].push_back(u);
        }

        sort(b+1,b+n+1,[](pair<int,int> a,pair<int,int> b){return a.first>b.first;});
        init(n+1);
        for(int i=0;i<=n;i++) used[i] = 0;
        ll ans = 0;
        for(int i=1;i<=n;i++){
            ans += b[i].first;
            used[b[i].second] = 1;
            for(int j:G[b[i].second]){
                if(used[j]){
                    if(!same(b[i].second,j)){
                        unite(b[i].second,j);
                        ans -= b[i].first;
                    }
                }
            }
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

 
===========================================================================================================


## 哈希

[题目](http://acm.hdu.edu.cn/showproblem.php?pid=6768)

### 题解

把问题转化成求 A * B = C + Fk

由于k很大，所以这些数会溢出，用除余法哈希，除数选择不超过ull的数，然后遍历k找到满足C + Fk等于 A * B的k

实际上不哈希也可以，所以数都自然溢出（可以看做是特殊的哈希），也可以找到答案

```cpp
#include "bits/stdc++.h"

using namespace std;
using ull = unsigned long long;

ull fib[2000005];

ull a,b,c;
int n;
void init(){
    fib[1] = 1;
    fib[2] = 2;
    for(int i=3;i<2000005;i++){
        fib[i] = fib[i-1] + fib[i-2];
    }
}

void cal(ull &x,int n){
    x = 0;
    for(int i=1;i<=n;i++){
        int t;
        scanf("%d",&t);
        if(t){
            x += fib[i];
        }
    }
}

int main() {
#ifdef LOCAL
    freopen("in1.txt", "r", stdin);
    freopen("out1.txt", "w", stdout);
#endif
    init();
    int _;
    cin >> _;
    while (_--) {
        a = b = c = 0;
        scanf("%d",&n);
        cal(a,n);
        scanf("%d",&n);
        cal(b,n);
        scanf("%d",&n);
        cal(c,n);

        a *= b;
        for(int i=1;i<=n;i++){
            if(fib[i] + c == a){
                printf("%d\n",i);
                continue; //应该是break 但这样也不会超时
            }
        }

    }
    return 0;
}
```

===========================================================================================================

## 置换群

[题目](https://ac.nowcoder.com/acm/problem/209989)

### 题解

求排列中每个循环的长度，对它们求lcm

注意大数（可不必取模）

贴一份队友的代码

```python
def gcd(a, b):
    return a if b == 0 else gcd(b, a % b)
 
def dfs(i):
    global vis
    u = i
    ans = 1
    while p[i] != u:
        ans += 1
        vis[i] = 1
        i = p[i]
    return ans
 
n = int(input())
MOD = pow(10, n)
vis = [0] * 100007
p = [0] * 100007
pp = list(map(int, input().split()))
for i in range(1, n + 1):
    p[i] = pp[i-1]
ans = 1
for i in range(1, n + 1):
    if vis[i] == 1:
        continue
    k = dfs(i)
    ans = ((ans * k) // gcd(ans, k)) % MOD
print(ans)
```

===========================================================================================================

## 思维 LIS

[题目](https://ac.nowcoder.com/acm/problem/209988)

### 题解

invert操作不会改变数的相对位置，drop2操作会改变数的相对位置

drop2操作是把最后一个数之前的数往数列头部移动

由于这两种操作的性质，把数列看成一个环

那么invert操作就是旋转环，drop2操作就是把最后一个数（在环里就是任意一个数）插到任意位置上

所以问题转化成对于一个数列（排列），最少有多少次“将任意数插入到任意位置上”的操作，使得数列递增

操作数 = n - len(LIS)  , 对于环的不同起始位置求LIS，取最大值

时间复杂度 O(n\*n\*logn)

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int dp[505];
const int inf = 0x3f3f3f3f;
int a[1010];
int main() {
    int n;
    int ma = -1 ;
    scanf("%d",&n);
    for(int i=0;i<n;++i){
        cin>>a[i];
    }
    int i,j;
    for(i=0;i<n;i++){
        fill(dp,dp+n,inf);
        for(j=i;j<i+n;j++){
            *lower_bound(dp,dp+n,a[j]) = a[j];
        }
        ma = max(ma , (int)(lower_bound(dp,dp+n,inf) - dp));
        a[j] = a[i];
    }
    cout<<n-ma<<"\n";
    return 0;
}
```

===========================================================================================================


## 数据结构 实现

[题目](https://ac.nowcoder.com/acm/contest/5671/K)

### 题解
对于每个数，判断能否把前min(i,k)个数作为一个排列，即在它的后面放置切割

判断是否是排列，即判断这些数中每个数是否只出现一次，出现次数可以用unordered_map记录(map超时)

想了一个非常复杂的方法，不知道怎么实现，以下是参考了别人的代码，实现效率非常高

```cpp
#include "iostream"
#include "unordered_map"
#include "cstring"
#pragma GCC optimize(2)
using namespace std;
typedef long long ll;
int a[500005],cut[500005];
unordered_map<int,int> mp;
inline int read()
{
    int x=0;int f=1;char s=getchar();
    while(s<'0' or  s>'9')
    {
        if(s=='-')
            f-=1;
        s=getchar();
    }
    while(s>='0' and s<='9')
    {
        x=x*10+s-'0';
        s=getchar();
    }
    return x*f;
}

int main() {
    int _;
    _ = read();
    while (_--) {
        mp.clear();
        int flag = 0;
        int n,k;
        n = read() , k = read();
        for (register int i = 1; i <= n; ++i) {
            a[i] = read();
            if(a[i] > k) {
                flag = 1;
                break;
            }
        }
        if(flag) {
            puts("NO");
            continue;
        }

        int dif_num = 0; memset(cut , 0 , sizeof(cut));
        cut[0] = 1;
        for(register int i=1;i<=n;++i){
            if(i > k) {
                if (mp[a[i - k]] == 1) dif_num-- ; mp[a[i - k]]--;
            }
            if(mp[a[i]] == 0) dif_num++; mp[a[i]]++;
            if(dif_num == k or dif_num == i){
                cut[i] = (i>=k ? cut[i-k] : 1);
            }
        }
        dif_num = 0 ; mp.clear();
        flag = 0;
        for(register int i=n;i>=max(n-k,0);--i){
            if(dif_num == n-i and cut[i] == 1){
                flag = 1;
                break;
            }
            if(mp[a[i]] == 0) dif_num++;
            mp[a[i]]++;
        }
        flag ? puts("YES") : puts("NO");
    }
    return 0;
}
```

===========================================================================================================

## 状态压缩dp

[题目](https://atcoder.jp/contests/m-solutions2020/tasks/m_solutions2020_e)

### 题解

对于铁路线，肯定是过某个点最划算，而且是过不同的点，即一个点一条线穿过

所以枚举即将被穿线的点集，每个点有被特定的一条线穿过，穿过的方式有横线、竖线（对于特定的点集，枚举横线竖线的所有情况）

对于每种情况，更新答案 （两条铁路重合的情况不会影响答案，因为这始终不是最优解）

玄学时间复杂度  O(sum(2^i * C(n,i)  \* n  \* n) 应该有千亿计算量

一直以为会超时，想把n*n优化成O(1) 无果，看了别人的做法，居然不会超时？？？

最后跑了2700+ms ，时限是3000ms 

注意long long的强制类型转化

实际上还有更快的暴力方法和dfs，但我不会

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int n,x[16],y[16],d[16],D[16],p[16];
ll ans[16];
int main() {
    memset(ans , 0x3f , sizeof(ans));
    cin >> n;
    for(int i=0;i<n;i++){
        cin>>x[i]>>y[i]>>p[i];
    }
    for(int i=0;i<n;i++){
        D[i] = min(abs(x[i]) , abs(y[i]));
    }
    ans[0] = 0;
    for(int i=0;i<n;i++){
        ans[0] += (ll)D[i]*p[i];
    }
    for(int i=1;i<(1<<n);i++){
        int j = i;
        do{
            memcpy(d,D,sizeof(D));
            for(int k=0;k<n;k++){
                if(i>>k&1){
                    if(j>>k&1){
                        for(int q=0;q<n;q++){
                            d[q] = min(d[q] , abs(x[q] - x[k]));
                        }
                    }
                    else{
                        for(int q=0;q<n;q++){
                            d[q] = min(d[q] , abs(y[q] - y[k]));
                        }
                    }
                }
            }
            ll tmp = 0;
            for(int i=0;i<n;i++) tmp += (ll)d[i] * p[i];
            ans[__builtin_popcount(i)] = min(ans[__builtin_popcount(i)] , tmp);
            j = (j-1) & i;
        }while(j != i);
    }
    for(int i=0;i<=n;i++) cout<<ans[i]<<endl;
    return 0;
}
```

===========================================================================================================

## 01背包问题

[题目](https://ac.nowcoder.com/acm/problem/14699)

### 题解

01背包问题模改

dp[i][j][k] 表示前i个从者，前j个装备，容量为k的最大价值

由于从者和装备是平级的，所以分别对它们用01背包问题

但是有约束条件，装备数量不多于从者，从者最多选5个

所以应该这样dp ， dp[a][i][b][j][k] 表示从前i个选a个，从前j个选b个，容量为k的最大价值，其中a，b只需遍历到5

但这样内存超限，由于01背包问题可以从2维降到1维（重复利用，滚动原理），所以这个dp也可以将2维

dp[i][j][k] 表示选i个从者，j个装备，容量为k的最大价值

由于装备数量不多于从者，所以先枚举从者（即j=0），然后枚举不大于从者的装备

最后3重循环求最大值

```cpp
#include "bits/stdc++.h"
#include "algorithm"
using namespace std;
using ll = long long;
int dp[6][6][140];
int a1[305],c1[305],a2[305],c2[305];
int main() {
    int n,m,c;
    cin>>n>>m>>c;
    for(int i=1;i<=n;i++) cin>>a1[i]>>c1[i];
    for(int i=1;i<=m;i++) cin>>a2[i]>>c2[i];
    memset(dp,0xc0,sizeof(dp));
    dp[0][0][0] = 0;
    for(int i=1;i<=n;i++){
        for(int j=c;j>=c1[i];j--){
            for(int k=1;k<=5;k++){
                dp[k][0][j] = max(dp[k][0][j] , dp[k-1][0][j-c1[i]] + a1[i]);
            }
        }
    }
    for(int i=1;i<=m;i++){
        for(int j=c;j>=c2[i];j--){
            for(int k=1;k<=5;k++){
                for(int x=1;x<=k;x++){
                    dp[k][x][j] = max(dp[k][x][j] , dp[k][x-1][j-c2[i]] + a2[i]);
                }
            }
        }
    }
    int ans = -1;
    for(int i=1;i<=5;i++){
        for(int j=0;j<=i;j++){
            for(int k=0;k<=c;k++){
                ans = max(ans , dp[i][j][k]);
            }
        }
    }
    cout<<ans<<endl;
    return 0;
}
```

===========================================================================================================

## 容斥原理

[题目](https://ac.nowcoder.com/acm/problem/13884)

### 题解

考虑特定的k种颜色的染色方案，那么答案就乘上 C(m,k)

如果是选k种颜色涂色，方案数就是 k(k-1)^(n-1)

但这是不多于k种颜色的方案，对于“恰好”的方案，可以考虑用容斥原理

设不多于k种颜色的方案为f(k)

exactly(k) = f(k) - ( f(k-1) - ( f(k-2) - (  f(k-3) - ( f(k-4) -... f(1) ))))

f(k) - part 锁定了第k个元素必须使用，f(k-1) - part锁定了k-1个元素必须使用，以此类推

把括号打开，就是容斥原理的结构

exactly(k) = f(k) - f(k-1) + f(k-2) - f(k-3) + f(k-4) ... f(1)

由于在加减的过程中不断锁定第i个元素，但没有指定在哪个位置锁定这个元素，所以f要乘上所有的方案数

即F(i) = C(k,i)f(i)

所以答案为

$$
C_{m}^{k}\sum\limits_{i=0}  ^ {k-1} {(-1)^iC_{k}^{k-i}(k-i)(k-i-1)^{n-1}}
$$

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
ll ans,n,m,k;
const int maxn = 1e6+10;
const ll mod = 1e9+7;
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
ll inv[maxn];
ll fac[maxn];
inline ll C(ll m,ll n){
    return fac[n]*inv[m]%mod*inv[n-m]%mod;
}
int main() {
    for(ll i=0;i<maxn;i++){
        fac[i]=1;
    }
    for(ll i=2;i<maxn;i++){
        fac[i]=(fac[i-1]*i)%mod;
    }
    inv[0]=1;inv[1]=1;      //inv[0]=1 !!!
    for(ll i=2;i<maxn;i++){
        inv[i]=(mod-mod/i)*inv[mod%i]%mod;
    }
    for(ll i=2;i<maxn;i++){
        inv[i]=(inv[i]*inv[i-1])%mod;
    }

    int _;
    cin >> _;
    while (_--) {
        ll ckm = 1;
        ans = 0;
        cin >> n >> m >> k;
        for(ll i=0;i<k;i++){
            ckm *= (m-i);
            ckm %= mod;
        }
        ckm *= inv[k];
        ckm %= mod;
        int sign = 1;
        for(int i = k; i >0 ; --i){
            ll tmp = 1;
            tmp *= C(i,k);
            tmp %= mod;
            tmp *= i;
            tmp %= mod;
            tmp *= qpow(i-1 , n-1);
            tmp %= mod;
            if(sign == 1) ans += tmp ; else ans -= tmp;
            ans += mod;
            ans %= mod;
            sign = -sign;
        }
        ans *= ckm;
        ans %= mod;
        cout<<ans<<endl;
    }

    return 0;
}
```

===========================================================================================================

## bfs
[题目](https://codeforces.com/problemset/problem/590/C)

### 题解

问题转化成创建一条路径连通三个国家，使路径长度最短

那么路径一定汇集于一个点

这就是bfs问题，枚举每个点，求它们到每个国家的最小值，然后和的最小值就是答案，但这样会超时

以每个国家为起点，bfs到每个点，这样每个点会得到三个信息（分别到三个国家的最短距离），和的最小值就是答案，不会超时

当这个点是平地时，距离和-2，因为它被创造了三条公路

我的bug：用fill初始化产生错误，用memset初始化正常，bfs时当点是国家时，距离不需要+1 ， 在求距离和时，要将一个数强制类型转化成long long，它才会升级

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int n,m;
char maze[1005][1005];
int dist[1003][1003][4];
using pii = pair<int,int>;
int dir[4][2] = { {0,1} , {1,0} , {-1,0} , {0,-1} };
const ll inf = 0x3f3f3f3f;
void bfs(int x){
    queue<pii> q;
    char ch = '0' + x;
    for(int i=0;i<n;i++)for(int j=0;j<m;j++){
        if(maze[i][j] == ch) {
            dist[i][j][x] = 0;
            q.push({i,j});
        }
    }
    while(q.size()){
        pii tmp = q.front();
        q.pop();
        for(int i=0;i<4;i++){
            int xt = tmp.first + dir[i][0];
            int yt = tmp.second + dir[i][1];
            if(maze[xt][yt] == '#') continue;
            if(xt <0 or yt<0 or xt>=n or yt>=m) continue;
            int cost = (maze[xt][yt] == '.');
            if(dist[tmp.first][tmp.second][x] + cost < dist[xt][yt][x]){
                dist[xt][yt][x] = dist[tmp.first][tmp.second][x] + cost;
                q.push({xt,yt});
            }
        }
    }
}

int main() {
    cin>>n>>m;
    memset(dist , inf , sizeof(dist));
    for(int i=0;i<n;i++){
        scanf("%s",&maze[i]);
    }  
    bfs(1);bfs(2);bfs(3);
    ll ans = inf;
    for(int i=0;i<n;i++) for(int j=0;j<m;j++){
        if(maze[i][j] == '#') continue;
        ll sum = (ll)dist[i][j][1] + dist[i][j][2] + dist[i][j][3];
        if(maze[i][j] == '.') sum -= 2;
        ans = min(ans , sum);
    }
    cout<<(ans == inf ? -1 : ans)<<endl;
    return 0;
}
```
===========================================================================================================

## dfs 图论

[题目](https://ac.nowcoder.com/acm/problem/20857)

### 题解

把问题转化成求在所有简单路径中，每个点被遍历了几次，如果是偶数次，异或和为0，奇数次异或和为本身

这样就是图论中求所有简单路径XX被遍历几次的经典模型，基础的有边和点

如果是边

$$
f(edge) = size[x] * ( n - size[x])
$$

如果是点，考虑三种情况，以这个点为端点，有n-1条，这个点的子树连到子树外面有 (size[x] - 1) * ( n - size[x]) ， 这个点的子节点的子树连到另外一个子节点的子树有 (sum(size[ch] * (size[x] - 1 - size[ch]))) / 2
除以2因为每个点都作为起点和终点一次，但这样只有一条

$$
f(node) = n-1 + (size[x]  - 1) * (n-size[x])  + \frac{\sum\limits_{}  ^ {} {size[ch] * (size[x] - 1 -  size[ch])} }{2}
$$

还有另一种算法

$$
f(node) = \frac{\sum{f(edge) [connected \ to  \ node]+ n-1} }{2}
$$

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
vector<ll> G[500005];
ll sz[500005];
ll a[500005];
ll ans ;
ll n;

ll dfs(ll u,ll p){
    sz[u] = 1;
    for(ll i:G[u]){
        if(i == p) continue;
        sz[u] += dfs(i,u);
    }
    ll sum = 0;
    for(ll i:G[u]){
        if(i == p) continue;
        sum += sz[i] * (sz[u] - 1 - sz[i]) ;
    }
    sum /= 2;
    sum += (sz[u] - 1) * (n - sz[u]);
    sum += n - 1;
    if(sum&1) ans ^= a[u];
    return sz[u];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    cin>>n;
    for(ll i=0;i<n-1;i++){
        ll x,y; cin>>x>>y;
        G[x].push_back(y); G[y].push_back(x);
    }
    for(ll i=1;i<=n;i++) cin>>a[i];
    dfs(1,0);
    cout<<ans<<endl;
    return 0;
}
```

===========================================================================================================

## 思维 高精度

[题目](https://ac.nowcoder.com/acm/contest/5673/K)

### 题解
这道题主要是发现高精度，理论上ans会达到 1e9\*1e5\*1e5

以下是__int128的输入输出模板（支持负数）


```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef __int128 INT ;
const INT N=1e5+5;
INT a[N],b[N],s[N],m[N];
inline INT read(){
    INT x=0,f=1;
    char ch=getchar();
    while(ch<'0'||ch>'9'){
        if(ch=='-')
            f=-1;
        ch=getchar();
    }
    while(ch>='0'&&ch<='9'){
        x=x*10+ch-'0';
        ch=getchar();
    }
    return x*f;
}
  
inline void write(INT x){
    if(x<0){
        putchar('-');
        x=-x;
    }
    if(x>9)
        write(x/10);
    putchar(x%10+'0');
}
int main(){
    INT t,n;
    t = read();
    for(int u=1;u<=t;u++){
        n = read();
        for(int i=1;i<=n;i++) a[i] = read();
        for(int i=1;i<=n;i++) b[i] = read();
        s[1] = a[1];
        for(int i=2;i<=n;i++){
            s[i] = s[i-1] + a[i];
        }
        m[1] = b[1];
        for(int i=2;i<=n;i++){
            m[i] = min(b[i],m[i-1]);
        }
        INT ans = 0;
        INT cnt = a[1];
        for(int i=2;i<=n;i++){
            if(b[i-1]>b[i]){
                ans += cnt * (m[i-1] - m[i]);
            }
            cnt = max(cnt,s[i]);
        }
        ans += cnt * m[n];
        cout<<"Case #"<<u<<": ";
        write(b[1]);
        cout<<" ";
        write(ans);
        puts("");
    }
    return 0;
}
```

===========================================================================================================

## 思维 并查集 离散化

[题目](https://ac.nowcoder.com/acm/contest/5673/I)

### 题解

对于当前的一对数，给它们连一条边，对所有的对数都进行这样的操作，最后会形成很多连通块，如果连通块有环，则这些数都能被选择，否则其中有一个数不能被选择，因为数据大小，用unordered_map离散化

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
unordered_map<int,int> used;
set<int> rt;
unordered_map<int,int> rel;
unordered_map<int,int> num;
unordered_map<int,int> id;
const int maxn = 2e5+10;
int a[maxn],b[maxn];
//union find
int par[maxn];
int rankk[maxn];
int sz[maxn];
void init(int n){
    for(int i=0;i<n;i++)
    {
        par[i]=i;
        rankk[i]=0;
    }
}
int find(int x){
    if(par[x]==x) return x;
    else return par[x]=find(par[x]);
} 
void unite(int x,int y){
    x=find(x);
    y=find(y);
    if(x==y) return ;
    if(rankk[x]<rankk[y]) par[x]=y;
    else{
        par[y]=x;
        if(rankk[x]==rankk[y]) rankk[x]++;
    }
} 
bool  same(int x,int y){
    return find(x)==find(y);
}
int getid(int u){
    return id[u];
}
int main() {
    int _;
    cin >> _;
    for(int q=1;q<=_;q++) {
        used.clear();
        rt.clear();
        rel.clear();
        num.clear();
        id.clear();
        int n;
        scanf("%d",&n);
        for(int i=0;i<n;i++){
            scanf("%d%d",&a[i],&b[i]);
        }
        init(2*n+2);
        int cnt = 0;
        for(int i=0;i<n;i++){
            if(id[a[i]] == 0) id[a[i]] = ++cnt;
            if(id[b[i]] == 0) id[b[i]] = ++cnt;
        }
        for(int i=1;i<=cnt;i++){
            rt.insert(i);
        }
        for(int i=1;i<=cnt;i++){
            num[i] = 1;
        }
//        for(int i=1;i<=cnt;i++){
//            cout<<id[i]<<" ";
//        }puts("");
        for(int i=0;i<n;i++){
            int u = a[i],v = b[i];
            //if(used[u] == 1 and used[v] == 1) continue;
            //used[u] = used[v] = 1;
            if(!same(getid(u) , getid(v))){
                int urt = find(getid(u));
                int vrt = find(getid(v));
                int t1 = rel[urt],t2 = rel[vrt];
                int t3 = num[urt],t4 = num[vrt];
                rt.erase(urt);
                rt.erase(vrt);
                int t5 = t1 + t2 + 1;
                int t6 = t3 + t4;
                unite(getid(u),getid(v));
                int uvrt = find(getid(u));
                rel[uvrt] = t5;
                num[uvrt] = t6;
                rt.insert(uvrt);
            }else{
                rel[find(getid(u))]++;
            }
        }
        ll ans = 0;
        for(int i:rt){
            ans += (rel[i] >= num[i] ? num[i] : num[i] - 1);
            //cout<<rel[i]<<" "<<num[i]<<" "<<i;
            //cout<<find(getid(44));
        }
        cout<<"Case #"<<q<<": "<<ans<<endl；
    }
    return 0;
}
```

===========================================================================================================

## 模拟 枚举

[题目](https://ac.nowcoder.com/acm/contest/5673/G)

### 题解
三重循环枚举

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
const int maxn = 260;
string cards[maxn][4];
bool check(int i,int j,int k){
    bool flags[4] = {false};
    for(int q=0;q<4;q++){
        string s1 = cards[i][q];
        string s2 = cards[j][q];
        string s3 = cards[k][q];
        if((s1=="[*]" or s2=="[*]" or s3=="[*]") or (s1 == s2 and s2  == s3) or (s1 != s2 and s2 != s3 and s1 != s3)) flags[q] = true;
    }
    if(flags[0] and flags[1] and flags[2] and flags[3]) return true;
    return false;
}
int main() {
    int _;
    cin >> _;
    for(int u=1;u<=_;u++) {
        int n;
        cin>>n;
        //reset
        for(int i=0;i<=n;i++){
            for(int j=0;j<4;j++){
                cards[i][j].clear();
            }
        }
        string s;
        for(int i=0;i<n;i++) {
            cin>>s;
            for(int j=0,k=0;j<s.length();j++){
                cards[i][k].push_back(s[j]);
                if(s[j]==']') k++;
            }
        }
//        for(int i=0;i<4;i++){
//            cout<<cards[0][i]<<" ";
//        }
        bool ok = false;
        for(int i=0;i<n;i++){
            if(ok) break;
            for(int j=i+1;j<n;j++){
                if(ok) break;
                for(int k=j+1;k<n;k++){
                    if(ok) break;
                    if(check(i,j,k)){
                        cout<<"Case #"<<u<<": "<<i+1<<" "<<j+1<<" "<<k+1<<endl;
                        ok = true;
                    }
                }
            }
        }
        if(!ok) cout<<"Case #"<<u<<": -1\n";
    }
    return 0;
}
```


===========================================================================================================

## dp

[题目](https://ac.nowcoder.com/acm/contest/6885/D)

### 题解

```cpp
#include "bits/stdc++.h"
using namespace std;
const int maxn = 1e5 + 5;
int a[maxn];
int dp[maxn][2];
int main() {
    int n;
    cin >> n;
    for(int i = 0; i < n; i++){
        cin >> a[i];
    }
    if(a[0] == 0) dp[0][0] = 0, dp[0][1] = 1;
    if(a[0] == 1) dp[0][0] = 1, dp[0][1] = 0;
    for(int i = 1; i < n; i++){
        if(a[i] == 0){
            dp[i][0] = min(dp[i-1][0] , dp[i-1][1] + 1);
            dp[i][1] = min(dp[i-1][0] + 2 , dp[i-1][1] + 1);
        }
        if(a[i] == 1){
            dp[i][0] = min(dp[i-1][0] + 1 , dp[i-1][1] + 2);
            dp[i][1] = min(dp[i-1][0] + 1 , dp[i-1][1]);
        }
    }
    cout << min(dp[n-1][0] , dp[n-1][1] + 1)<<endl;
    return 0;
}
```

===========================================================================================================

## 图论 

[题目](https://ac.nowcoder.com/acm/contest/7141/A)

### 题解

暴力O(n^2) ，所以考虑将问题本质化（结论化）

把问题转化成求一个点，使得它到集合中的点的最大距离最小，求值

这样这个点从直观上看应该处在这些点的中间，并且是集合中两个最远的点的中点

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
const int maxv = 3e5 + 5;
const int max_logv = 20;
vector<int> G[maxv];
int root;
int parent[max_logv][maxv];
int depth[maxv];
void dfs(int v, int p, int d){
    parent[0][v]=p;
    depth[v]=d;
    for(int i = 0; i < G[v].size(); i++){
        if(G[v][i] != p) dfs(G[v][i], v, d+1);
    }
}
void init(int V){
    dfs(root, -1, 0);
    for(int k = 0; k+1 < max_logv; k++){
        for(int v = 0; v < V; v++){
            if(parent[k][v] < 0) parent[k+1][v] = -1;
            else parent[k+1][v] = parent[k][parent[k][v]];
        }
    }
}
int lca(int u,int v){
    if(depth[u] > depth[v]) swap(u, v);
    for(int k =0; k < max_logv; k++){
        if((depth[v] - depth[u]) >> k & 1) v = parent[k][v];
    }
    if(u == v) return u;
    for(int k = max_logv-1; k >= 0; k--){
        if(parent[k][u] != parent[k][v]){
            u = parent[k][u];
            v = parent[k][v];
        }
    }
    return parent[0][u];
}
int a[1000005];
int main() {
    int n;
    cin >> n;
    for(int i = 0; i < n-1; i++){
        int u, v;
        cin >> u >> v;
        G[u].push_back(v);
        G[v].push_back(u);
    }
    root = 1;
    init(n+1);
    int num ;
    cin >> num;
    for(int i = 0; i < num; i++){
        int m;
        cin >> m;
        int est = root;
        for(int j = 0; j < m; j++){
            cin >> a[j];
            if(depth[a[j]] > depth[est]) est = a[j];
        }
        int ans =  -1;
        for(int j = 0; j < m; j++){
            ans = max(ans, depth[est] + depth[a[j]] - 2 * depth[lca(est, a[j])]);
        }
        cout << ((ans + 1) >> 1) << endl;
    }
    return 0;
}
```
