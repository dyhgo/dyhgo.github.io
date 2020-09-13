# Codeforces Round #629 (Div. 3)




# [A. Divisibility Problem](https://codeforces.com/contest/1328/problem/A)

## 题意
求一个数加上多少能被另一个数整除

## 题解
如果b|(a+k) 

则k=b-a%b注意k=0特判

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int t,a,b;
int main(){
	//freopen("input.txt","r",stdin);
	cin>>t;
	while(t--){
		cin>>a>>b;
		cout<<(b-(a%b)==b?0:b-(a%b))<<endl;
	}
	return 0;
}
```


# [B. K-th Beautiful String](https://codeforces.com/contest/1328/problem/B)

## 题意
一个长度为n的字符串，由n-2个a组成和2个b组成

求所有按字典序排列组合的第k个

## 题解

只要定位b的位置就行

b的位置是有规律的，模拟这个规律

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
long long t,n,k;
int main(){
	//freopen("input.txt","r",stdin);
	cin>>t;
	while(t--){
		cin>>n>>k;
		long long fi=ceil((sqrt(1+8*k)-1)/2);
		long long se=fi*(fi-1)/2;
		se=k-se;
		se=n-se; 
		fi=n-1-fi;
		for(long long i=0;i<n;i++) if(i==fi or i==se) cout<<'b'; else cout<<'a';
		cout<<endl;
	}
}
```

没开long long WA掉一发

# [C. Ternary XOR](https://codeforces.com/contest/1328/problem/C)
## 题意

定义一种异或运算

ai XOR bi = (ai+bi)%3

给一数c，求a,b使得(a XOR b)=c，使得max(a,b)尽可能小

c由0,1，2组成，且首位为2

## 题解

从左到右遍历

以是否出现过1作为判断条件

第一次出现1时，一边为0，一边为1

之后把大的数填到之前填0的那一边

就能保证max最小

如果没有出现1则2分成1和1

出现后2分成0和2

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int t;
int n;
short up[50005];
short down[50005];
bool one;
int main(){
	//freopen("input.txt","r",stdin);
	cin>>t;
	while(t--){
		one = false;
		cin>>n;
		char temp1;
		int temp2;
		for(int i=0;i<n;i++){
			cin>>temp1;
			temp2=temp1-'0';
			if(one){
				if(temp2==1){
					up[i]=1;down[i]=0;
				}
				if(temp2==2){
					up[i]=2;down[i]=0;
				}
				if(temp2==0){
					up[i]=0;down[i]=0;
				}
			}
			else{
				if(temp2==1) {
					one=true;up[i]=0;down[i]=1;
				} 
				if(temp2==2){
					up[i]=1;down[i]=1;
				}
				if(temp2==0) {
					up[i]=0;down[i]=0;
				}
			}
		}
		for(int i=0;i<n;i++) cout<<up[i]; cout<<endl; for(int i=0;i<n;i++) cout<<down[i]; cout<<endl;
	}
	return 0;
}
```


#  [D. Carousel](https://codeforces.com/contest/1328/problem/D)

## 题意

旋转木马的马上有很多图案，给它们涂色，要求相邻不同图案要涂不同的颜色

问最少需要几种颜色，并求涂色方案（注意旋转木马是个环）

## 题解

如果所有的图案都相同，只需要一种

如果图案不同则有可能需要2种或3种，但不超过3种

如果必须3种，则涂色可以为1,2,3,1,2,3...（注意最后一个不能与第一个相同）（不一定）

现在验证是否只需要2种

因为不同的图案必须涂不同的颜色

所以以不同的图案为点，用边连起来

判定是否为二分图就行（同种图案涂色不受限，所以不需要考虑同种图案）

还可以通过木马的奇偶性分类讨论

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int q;
int n;
int a[200005];
int color[200005];
vector<int> G[200005];
bool dfs(int v,int c)
{
	color[v]=c;   
	for(int i=0;i<G[v].size();i++)
	{
		if(color[G[v][i]]==c) return false;    
		if(color[G[v][i]]==0 && !dfs(G[v][i],3-c)) return false;    
	 } 
	return true;
}
bool bipartite_graph()
{
	for(int i=1;i<=n;i++)
	{
		if(color[i]==0)    
		if(!dfs(i,1)) return false; 
	}
	return true;
} 
int main(){
	//freopen("input.txt","r",stdin);
	cin>>q;
	while(q--){
		//reset TODO
		memset(color,0,sizeof(color));
		for(int i=0;i<=n;i++) G[i].clear();
		cin>>n;
		for(int i=1;i<=n;i++) cin>>a[i];

		//特判
		bool flag=true;
		for(int i=1;i<n;i++) if(a[i]!=a[i+1]) flag=false; if(a[n]!=a[1]) flag=false;
		if(flag) {
			cout<<1<<endl; for(int i=0;i<n;i++) cout<<1<<" "; cout<<endl;
		}
		else{
			//preprocess
			for(int i=1;i<n;i++){
				if(a[i]!=a[i+1]) {
					G[i].push_back(i+1);G[i+1].push_back(i);
				}
			}
			if(a[n]!=a[1]) {
				G[n].push_back(1);G[1].push_back(n);
			}
			
			if(bipartite_graph()){
				cout<<2<<endl;
				for(int i=1;i<=n;i++) cout<<color[i]<<" "; cout<<endl;
			}
			else{
				cout<<3<<endl;
				if((n-1)%3==0) {
					for(int i=1;i<n;i++) cout<<(i%3==0? 3 : i%3 )<<" "; cout<<2<<endl; 
				}
				else{
					for(int i=1;i<=n;i++) cout<<(i%3==0? 3 : i%3 )<<" "; cout<<endl; 
				}
			}
		}
	}
	return 0;
}



```


# [E. Tree Queries](https://codeforces.com/contest/1328/problem/E)

## 题意

给一棵树和几个树上的顶点

问是否存在从根出发的一条简单路径

使得所有的点都在这条路径上或离路径的距离为1

## 题解

如果存在，这条路径一定是从根到深度最大的顶点

接下来依次判断这些点是否满足这些条件

对于某个点

求这个点和最深的点的LCA

判断这个点是否是LCA或LCA的子节点

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int V;
int m;
const int maxv=200005;
const int max_logv=20;
int data[maxv];
int n;
vector<int> G[maxv];
int root=0;
int parent[max_logv][maxv];
int depth[maxv];


void dfs(int v,int p,int d){
	parent[0][v]=p;
	depth[v]=d;
	for(int i=0;i<G[v].size();i++){
		if(G[v][i]!=p) dfs(G[v][i],v,d+1);
	}
}

void init(int V){
	dfs(root,-1,0);
	for(int k=0;k+1<max_logv;k++){
		for(int v=0;v<V;v++){
			if(parent[k][v]<0) parent[k+1][v]=-1;
			else parent[k+1][v]=parent[k][parent[k][v]];
		}
	}
}

int lca(int u,int v){
	if(depth[u]>depth[v]) swap(u,v);
	for(int k=0;k<max_logv;k++){
		if((depth[v]-depth[u])>>k&1) v=parent[k][v];
	}
	if(u==v) return u;
	for(int k=max_logv-1;k>=0;k--){
		if(parent[k][u]!=parent[k][v]){
			u=parent[k][u];
			v=parent[k][v];
		}
	}
	return parent[0][u];
}


int main(){
	//freopen("input.txt","r",stdin);
	cin>>V>>m;
	int temp1,temp2;
	for(int i=0;i<V-1;i++){
		cin>>temp1>>temp2;
		G[temp1-1].push_back(temp2-1);
		G[temp2-1].push_back(temp1-1);
	}
	init(V);
	while(m--){
		cin>>n;
		int maxdi;
		int maxd=-1e9;
		int temp;
		for(int i=0;i<n;i++){
			cin>>temp;
			data[i]=temp-1;
			if(depth[data[i]]>=maxd) {
				maxd=depth[data[i]];
				maxdi=data[i];
			}
		}
		//cout<<maxdi<<endl;
		bool flag=true;
		for(int i=0;i<n;i++){
			if(data[i]!=maxdi)
			{
				int foo=lca(maxdi,data[i]);
				if(!(data[i]==foo || foo==parent[0][data[i]])) {
					flag=false;break;
				}
			}
		}
		if(flag) cout<<"YES"<<endl; else cout<<"NO"<<endl; 
	}
	//cout<<lca(2,4)<<endl;
	//for(int i=1;i<=4;i++) cout<<depth[i]<<endl;
	return 0;
}

 
```



因为max_logv开太小，WA了7次，一直停留在第80个测试点（我记得明明还往多了开的，难道是计算失误，还是记忆丧失）

#  [F. Make k Equal](https://codeforces.com/contest/1328/problem/F)

## 题意

给一数列

每次可进行这样的操作

1.把最小的数+1

2.把最大的数-1

求最少需要多少次操作使数列中有k个相等的数

## 题解

一开始想的是，这个数应该是中位数，然后从它往两边扩散，把两边的数往里压

结果这应该不是最优解

太困了（X）太菜了（√），直接看了别人的题解恍然大悟

最后得到的这k个相同的数一定在数列中（由于两边往里压，中间的数可看成不变，最后的结果一定是压向不变的数）

首先排序

过一遍数列

每次针对一片相同数字域

求以此为目标需要进行的操作数

不断min更新

对于某块相同数字域

遍历过程中维护数字域左边的数量lnum

左边的和lsum

右边的数量rnum

右边的和rsum

这样是便于计算操作数，降低时间复杂度

考虑三种情况

左边压到中间

右边压到中间

两边压到中间

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll n,k;
ll a[200005];
map<ll,ll> mp;
ll lsum=0;
ll rsum=0;
ll lnum=0;
ll rnum;
ll re;
ll ans=1e15;
int main(){
	//freopen("input.txt","r",stdin);
	cin>>n>>k;
	for(ll i=0;i<n;i++){
		cin>>a[i];
		mp[a[i]]++;
		rsum+=a[i];
	}
	//特判
	for(auto i:mp) if(i.second>=k) {cout<<0<<endl;return 0;}
	rnum=n;
	for(auto i:mp) {
		rnum-=i.second;
		rsum-=(i.first*i.second); 
		re=k-i.second;
		if(lnum>=re){
			ans=min(ans,(i.first-1)*lnum-lsum+re);
		}
		if(rnum>=re){
			ans=min(ans,rsum-(i.first+1)*rnum+re);
		}
		if(re>=2){
			ans=min(ans,(i.first-1)*lnum-lsum+re+rsum-(i.first+1)*rnum);
		}
		lsum+=(i.first*i.second);
		lnum+=i.second;
	} 
	cout<<ans<<endl;
	return 0;
} 

 
```



hava a good day  ^_\^
