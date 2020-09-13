# 牛客练习赛61(部分)



# [A .  打怪](https://ac.nowcoder.com/acm/contest/5026/A)
## 题解
模拟

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//freopen("in.txt","r",stdin);
	int t,a,b,c,d;
	cin>>t;
	while(t--){
		cin>>a>>b>>c>>d;
		if(b>=c || d<=0) cout<<-1<<endl;
		else{
			int num=0;
			int cx=c;
			bool me=true;
			while(a>0){
				if(me){
					cx-=b; me^=1;
				}
				else{
					a-=d;me^=1;
				}
				if(cx<=0) {
					cx=c;num++;me=true;
				}
			}
			if(num>10000) cout<<-1<<endl;else cout<<num<<endl;
		}
	}
	return 0;
}
```


# [B . 吃水果](https://ac.nowcoder.com/acm/contest/5026/B)
## 题解

贪心

其实就是找一些操作使两数相等，如果小的数\*2比大的数小就\*2，否则随着数的

递减，y/x增大，需要乘很多次2才能相等

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	int t;
	cin>>t;
	while(t--){
		int n,m;
		cin>>n>>m;
		int c=0;
		while(n!=m){
			if(n>m) swap(n,m);
			if(2*n<=m) {
				n*=2;c++;
			}
			else{
				n--;m--;c++;
			}
		}
		cout<<c+n<<endl;
	}
	return 0;
}
```

# [C . 四个选项](https://ac.nowcoder.com/acm/contest/5026/C)

## 题解

z[12]用来存12道题的选项，每次停留在一道题时，根据剩余选项数进行dfs

每次搜索到末尾时判断是否满足第i题和第j题答案相同，都相同则方案数+1

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int num[5];
int z[13];
vector<pair<int,int>> vt;
int ans=0;
int m;
void dfs(int ind){
	if(ind==13){
		bool flag=true;
		for(auto i:vt){
			if(z[i.first]!=z[i.second]) {
				flag=false;break;
			}
		}
		if(flag) {
			ans++;return;
		}
	}
	for(int i=1;i<=4;i++){
		z[ind]=i;
		if(num[i]){
			num[i]--;
			dfs(ind+1);
			num[i]++;
		}
	}
}
int main(){
	cin>>num[1]>>num[2]>>num[3]>>num[4]>>m;
	int t1,t2;
	while(m--) {
		cin>>t1>>t2;
		vt.emplace_back(t1,t2);
	}
	dfs(1);
	cout<<ans<<endl;
	return 0;
}
```


# [D . 最短路变短了](https://ac.nowcoder.com/acm/contest/5026/D)

## 题解

设d1[x]是1到x的最短距离

d2[x]是x到n的最短距离

则每次反向一条边（u->v,w）

如果变短，那么一定是 1->v->u->n

所以只需要判断 d1[v]+w+d2[u] < d1[n]

反向边的改变可能会影响d1,d2原始的数值

但不影响结果

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
const long long max_v=100005;
const long long max_q=200005;
const long long max_e=200005;
const long long inf=0x3f3f3f3f3f3f3f3f;
struct edge
{
    long long to,cost;
    edge(long long to,long long cost){
    	this->to=to;
    	this->cost=cost;
	}
};
typedef pair<long long,long long> pii;       
vector<edge> G1[max_v];
vector<edge> rG[max_v];
long long V;
long long d1[max_v];
long long d2[max_v];
long long n,m,q;
long long t1,t2,t3;
long long x;
long long dat[max_e][3];
void dijkstra(long long s,long long d[],vector<edge> G[])
{
    priority_queue<pii,vector<pii>,greater<pii> > q;           
    fill(d,d+V+2,inf);
    d[s]=0;
    q.push(pii(0,s));
    while(!q.empty())
    {
        pii p=q.top();
        q.pop();
        long long v=p.second;
        if(d[v]<p.first) continue;
        for(long long i=0;i<G[v].size();i++)
        {
            edge e=G[v][i];
            if(d[e.to]>d[v]+e.cost)
            {
                d[e.to]=d[v]+e.cost;
                q.push(pii(d[e.to],e.to));
            }
        }
     } 
} 
main(){
	//freopen("in.txt","r",stdin);
	cin>>n>>m;
	V=n;
	for(long long i=1;i<=m;i++){
		cin>>t1>>t2>>t3;
		edge e(t2,t3);
		G1[t1].push_back(e);
		edge e1(t1,t3);
		rG[t2].push_back(e1);
		dat[i][0]=t1,dat[i][1]=t2,dat[i][2]=t3;
	}
	dijkstra(1,d1,G1);
	dijkstra(n,d2,rG);
	cin>>q;
	while(q--){
		cin>>x;
		long long u=dat[x][0],v=dat[x][1],w=dat[x][2];
		if(d1[v]+d2[u]+w<d1[n]) puts("YES"); else puts("NO");
	}
//	for(long long i=1;i<4;i++) cerr<<d1[i]<<" "; cerr<<"\n";
//	for(long long i=1;i<4;i++) cerr<<d2[i]<<" "; cerr<<"\n";
}



```


# [	E . 相似的子串](https://ac.nowcoder.com/acm/contest/5026/E)

# [F . 苹果树](https://ac.nowcoder.com/acm/contest/5026/F)
