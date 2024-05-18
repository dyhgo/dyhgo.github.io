# 牛客算法周周练5(部分)



# [C - 序列最小化](https://ac.nowcoder.com/acm/contest/5556/C)

## 题解

贪心，每次选择的长度为k的区间首尾重叠

```cpp
#include<bits/stdc++.h>
using namespace std;
using Int = long long;
int main(){
    Int n,k;
    cin>>n>>k;   
    n-=k;
    Int ans = ceil((double)n/(k-1));
    cout<<ans+1<<endl;
    return 0;
}
```


# [E - 简单瞎搞题](https://ac.nowcoder.com/acm/contest/5556/E)

## 题解

位dp，`dp[i]` 表示前i个数能达到的数字集合

加上第 `i` 个区间的数，遍历一遍这个区间对于其中一个数 `j` 

集合的结果变成 `dp[i-1]<<(j*j)`

所以 `dp[i] |= dp[i-1] << (j*j)`

```cpp
#include<bits/stdc++.h>
using namespace std;
bitset<1000005> dp[105];
int n;
int l[105];
int r[105];
int main(){
    cin>>n;
    for(int i=1;i<=n;i++) dp[i].reset();
    //init
    dp[0][0]=1;
    for(int i=1;i<=n;i++){
        cin>>l[i]>>r[i];
    }
    for(int i=1;i<=n;i++){
        for(int j=l[i];j<=r[i];j++){
            dp[i] |= (dp[i-1]<<(j*j));
        }
    }
    cout<<dp[n].count();
    return 0;
}
```


# [D - 小雨坐地铁](https://ac.nowcoder.com/acm/contest/5556/D)

## 题解
经典图论题

丁老师说过如果由直线构成的图中，转弯需要花费时间，则可以构造虚点

对于本身耗费的金钱a，可以构造虚点，对应于每个点，从实点到虚点有权为0的边，从虚点到实点有权为a的边


把每条地铁线的点独立，这样就有(m+1)*n个点

对于每条地铁线上的点，在对应的图层上连线，而图层之间由虚点连接

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506091114433.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
最后跑一遍最短路

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,m,s,t;
int a,b,c;
int t1,t2;
const int inf = 0x3f3f3f3f;
const int max_v = 501505;
struct edge
{
    int to,cost;
    edge(int to,int cost){
    	this->cost = cost;
    	this->to = to;
	}
};
typedef pair<int,int> pii;       
int V;
vector<edge> G[max_v];
int d[max_v];
inline void add_edge(int a,int b,int c){
    G[a].push_back(edge(b,c));
}
void dijkstra(int s)
{
    priority_queue<pii,vector<pii>,greater<pii> > q;          
    fill(d,d+V,inf);
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
                q.push(pii(d[e.to],e.to));
            }
        }
     } 
} 
int main(){
    cin>>n>>m>>s>>t;
    V=(m+1)*n+1;
    s=n*m+s;
    t=n*m+t;
    for(int i=0;i<m;i++){
        cin>>a>>b>>c;
        for(int j=0;j<c;j++){
            cin>>t1;
            if(j>0){
                add_edge(i*n+t2,i*n+t1,b);
                add_edge(i*n+t1,i*n+t2,b);
            }
            add_edge(i*n+t1,m*n+t1,0);
            add_edge(m*n+t1,i*n+t1,a);
            t2=t1;
        }
    }
    dijkstra(s);
    cout<<(d[t]==inf ? -1 : d[t])<<endl;
    return 0;
}
```

