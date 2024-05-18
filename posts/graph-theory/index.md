# Graph Theory




图的存储：邻接表、邻接矩阵、前向星、链式前向星等



## 链式前向星存图

```cpp
struct edge{
	int to , w , next;
}e[maxn];
int tot,head[maxn];

void add_edge(int u,int v,int w){
	e[tot].to = v;
	e[tot].w = w;
	e[tot].next = head[u];
	head[u] = tot++;
}

for(int i=head[u];~i;i=e[i].next){
	int v = e[i].to;
	int w = e[i].w;
}

//init
memset(head , -1 , sizeof(head));

```
 
 ## 二分图判定
 
 通过着色来判定，整个图只染两种颜色，如果相邻点颜色不同就是二分图

用dfs判断每个点是否可染色，如果每个点都是可染色的，就是二分图

```cpp
//input
vector<int> G[max_v];
int V;
int color[max_v]  //顶点i的颜色 1或-1

bool dfs(int v,int c)
{
	color[v]=c;   //染色
	for(int i=0;i<G[v].size();i++)
	{
		if(color[v][i]==c) return false;    //相邻顶点同色
		if(color[G[v][i]]==0 && !dfs(G[v][i],-c)) return false;     //对于还没染色的点，如果不能染色则返回false 
	 } 
	return true;
}

bool bipartite_graph()
{
	for(int i=0;i<V;i++)
	{
		if(color[i]==0)    //还未着色//如果是连通图，遍历一次就够
		if(!dfs(i,1)) return false; 
	}
	return true;
} 
```
把顶点和边都算的话，时间复杂度是O(|V|+|E|)

## 求DAG的拓扑序
求拓扑序可以dfs，删边法（通过栈或队列）

求每个点的入度，将入度为0的点入栈，遍历栈里的点，将于这些点相邻的点的入度减1，如果有点入度为0，则入栈。依靠这个顺序，得到的就是拓扑序。如果点访问两次，则有圈。可以通过这个方法判断有向图是否有圈

```cpp
//input
vector<int> G[max_v]
int V;
int indgree[max_v]      //每个顶点的入度
vector<int> res;         //拓扑排序的结果

bool topological_sort()  //判断是否能拓扑排序 ，若果有圈就不能 
{
	stack<int> s;
	//int counter=0;       //遍历的点的个数 
	
	for(int i=0;i<V;i++) 
		if(indegree[i]==0) s.push(i);    //入度为0 的顶点入栈
	 
	while(!s.empty())
	{
		int v=s.top();                
		s.pop();
		res.push_back(v);
		//counter++;
		for(int i=0;i<G[v].size();i++)
		{
			int k=G[v][i];
			if(--indegree[k] == 0) s.push(k);      //遍历到的点入度间1，入度为0则入栈 
		}
	}	
	if(res.size()==n) return true;
	else return false;
}
```
时间复杂度是O(|V|+|E|)

## Bellman-Ford算法
求单源最短路

d[i]=min{d[j]+e(j,i)}

只要图中不存在负圈，这样的更新操作是有限的（由于最短路不会经过一个顶点两次，所以这种操作只会重复|v|-1次）

时间复杂度O(|V|*|E|)

```cpp
struct edge
{
	int from,to,cost;
}es[max_e];

int d[max_v];
int V,E;

void bellman_ford(int s)
{
	for(int i=0;i<V;i++) d[i]=inf;         //把最短距离初始化成无限
	d[s]=0; 
	while(true)
	{
		bool update=false;                //判断while是否进行了更新操作，没有更新操作则退出循环 
		for(int i=0;i<E;i++)              //根据公式，遍历边
		{
			edge e=es[i];
			if(d[e.from]!=inf && d[e.to]>d[e.from]+e.cost)
			{
				d[e.to]=d[e.from]+e.cost;
				update=true;
			}
		}
		if(!update) break;
	}
}
```
如果更新操作（while循环）进行了超过|V|-1次，则存在负圈

所以判断负圈的一个方法可以是

把所有d[i]都变成0，如果有负圈，则一定执行超过|V|-1次

```cpp
bool find_negative_loop()
{
	memset(d,0,sizeof(d));
	for(int i=0;i<V;i++)
	{
		for(int j=0;j<E;j++)
		{
			edge e=es[j];
			if(d[e.to]>d[e.from]+e.cost)
			{
				d[e.to]>d[e.from]+e.cost;
				if(i==V-1) return true;          //这条语句不能放在if外，如果放在if外需要加update	
			}
		}
	}
	return false;	
}
```
## Dijkstra算法
求单源最短路，适用于没有负边的情况

将已求出最短路的点，放入一个集合中 ，每次从集合外找到一个和集合距离最近的点，加入集合

```cpp
int cost[max_v][max_v];       //权值，不存在时为inf
int d[max_v];
bool used[max_v];
int V;
void dijkstra(int s)
{
	fill(d,d+v,inf);
	fill(used,used+v,false);
	d[s]=0;
	
	while(true)
	{
		int v=-1;
		//从尚未使用过的点中选一个距离最小的点
		for(int u=0;u<V;u++)
		{
			if(!used[u] && (v==-1 || d[u]<d[v])) v=u;
		} 
		 
		if(v==-1) break;
		used[v]=true;
		for(int u=0;u<V;u++)
			d[u]=min(d[u],d[v]+cost[v][u]); 
	}
} 
```
时间复杂度O(V^2)

优化

如果将点放入优先队列中，这要查找和更新就会节省很多时间，时间复杂度O(ElgV)

```cpp
struct edge
{
	int to,cost;
}
typedef pair<int,int> pii;       //first 是距离 ，second是点编号
int V;
vector<edge> G[max_v];
int d[max_v];
void dijkstra(int s)
{
	priority_queue<pii,vector<pii>,greater<pii> > q;           //使小的在上面
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
```
## Floyd-Warshall算法
求任意两点最短路，暴力枚举思想

d[i][j]=min(d[i][j],d[i][k]+d[k][j])  遍历所有的k

时间复杂度O(V^3)

```cpp
int d[max_v][max_v];   //存储权值，边不存在时为inf，d[i][i]=0 
int V;
void floyd_warshall()
{
	for(k=0;k<V;k++)
		for(int i=0;i<V;i++)
			for(int j=0;j<V;j++)
				d[i][j]=min(d[i][j],d[i][k]+d[k][j]);
}
```
## 路径还原
通过找满足d[j]=d[k]+cost[k][j]的顶点k，来寻找前趋节点，不断寻找前趋节点来还原路径，时间复杂度O(E)

还可以用prev[j]在算法内直接记录前趋节点，最后遍历数组即可，时间复杂度O(V)

```cpp
//算法内记录前趋节点 (优化的dijkstra算法)
int prev[max_v]          //前趋节点
struct edge
{
	int to,cost;
}
typedef pair<int,int> pii;       //first 是距离 ，second是点编号
int V;
vector<edge> G[max_v];
int d[max_v];
void dijkstra(int s)
{
	priority_queue<pii,vector<pii>,greater<pii> > q;           //使小的在上面
	fill(d,d+V,inf);
	fill(prev,prev+V,-1);                                        //!!!!                            
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
				prev[e.to]=v;                                   //!!!!
				q.push(pii(d[e.to],e.to));
			}
		}
	 } 
}
 
vector<int> get_path(int t)
{
	vector<int> path;
	for(;t!=-1;t=prev[t]) path.push_back(t);
	reverse(path.begin(),path.end());
	return path;
}
```
## Prim算法
求最小生成树

prim算法和dijkstra算法很像，也是把已确定的点放入一个集合中，贪心地选取集合和未确定的点相连的最小权边，并加入到集合中，得到一棵生成树，可以证明是MST(minimum spanning tree)

```cpp
//也可以堆优化 
int cost[max_v][max_v]      //权值
int mincost[max_v];          //从集合出发到其他点的最小权值,!!!这个权值是 集合 和 点 之间的 
bool used[max_v];               //是否在集合中
int V;

int prim()                   //返回MST的权值
{
	fill(mincost,mincost+V,inf);      //初始化 
	fill(used,used+V,false);
	mincost[0]=0;             //从0开始 
	
	int res=0;
	while(true)
	{
		int v=-1;
		for(int u=0;u<V;u++)
		{
			if(!used[u] && (v==-1 || mincost[u]<mincost[v])) v=u;
		}
		if(v==-1) break;
		used[v]=true;
		res+=mincost[v];
		
		for(int u=0;u<V;u++)
		{
			mincost[u]=min(mincost[u],cost[v][u]);    //每次往集合中加入一个点，所有点的mincost都有可能改变 
		}
	}
	return res; 
 } 
```
时间复杂度与dijkstra算法一样
## Kruskal算法
求MST

将边的权值按大小排序，如果不产生<font color=red>圈和重边</font>，就依次把边加入到生成树中

要判断是否产生圈和重边，只需要判断加入这条边前，这条边的两个端点是否已在同一个连通分量里，这样就可以用并查集

Kruskal在边的排序上最费时，算法复杂度O(ElgV)

Kruskal适用于sparse graph 

Prim适用于dense graph

在实际应用中，Kruskal更普遍

 

```cpp
struct edge
{
	int u,v,cost;
}es[max_e];
int V,E;
int par[max_v];                           //union find需要 
int rankk[max_v];                         //key word "rank"
bool cmp(const edge& e1,const edge& e2)
{
	return e1.cost<e2.cost;
}
void init_union_find(int x)
{
	for(int i=0;i<x;i++)
	{
		par[i]=i;
		rankk[i]=0;
	}
}
int find(int x)
{
	if(par[x]==x)
		return x;
	else
		return par[x]=find(par[x]);
}
void unite(int x,int y)
{
	x=find(x);
	y=find(y);
	if(x==y) return;
	if(rankk[x]<rankk[y]) par[x]=y;
	else
	{
		par[y]=x;
		if(rankk[x]==rankk[y]) rankk[x]++;
	}
}
bool same(int x,int y)
{
	return find(x)==find(y);
}
int kruskal()
{
	sort(es,es+E,cmp);
	init_union_find(V);
	int res=0;
	for(int i=0;i<E;i++)
	{
		edge e=es[i];
		if(!same(e.u,e.v))
		{
			unite(e.u,e.v);
			res+=e.cost;
		}
	}
	return res;
}
```

## Kosaraju算法

强连通分量(strongly connected component)分解高效的算法有kosaraju算法，

tarjan算法，gabow算法

kosaraju算法通过随便选一点dfs，给点标号

把边的方向反过来，再一次dfs

由于在强连通分量中的点，其可达性不受边反向的影响

所以最后需独立进行k次搜索

即分裂出k个强连通分量

时间复杂度 O(V+E)

```cpp
//kosaraju 
int V;                         
vector<int> G[maxv];           
vector<int> rG[maxv];
vector<int> vs;                  //后序遍历顺序的顶点列表（标号） 
bool used[maxv];                 //是否访问 
int cmp[maxv];                   //所属强连通分量的拓扑序（序号） 

void add_edge(int from,int to){
	G[from].push_back(to);
	rG[to].push_back(from);
}

void dfs(int v){
	used[v]=true;
	for(int i=0;i<G[v].size();i++){
		if(!used[G[v][i]]) dfs(G[v][i]);
	}
	vs.push_back(v);
}

void rdfs(int v,int k){
	used[v]=true;
	cmp[v]=k;
	for(int i=0;i<rG[v].size();i++){
		if(!used[rG[v][i]]) rdfs(rG[v][i],k);
	}
}

int kosaraju_scc(){
	memset(used,0,sizeof(used));
	vs.clear();
	for(int i=0;i<V;i++) if(!used[i]) dfs(i);
	memset(uesd,0,sizeof(used));
	int k=0;
	for(int i=vs.size()-1;i>=0;i--) if(!used[vs[i]]) rdfs(vs[i],k++);
	return k;
}

```


## Tarjan算法 （scc部分）

求scc的tarjan算法是给一个点赋上两个属性 dfn low分别表示dfs的访问时间和该点可追踪到的最小访问时间

dfs过程中先访问自己，再访问邻接点，最后对自己进行操作

在访问自己时，将两个属性初始化为当前时间，并且进栈

接下来访问未被访问过的邻接点，并且更新low属性

如果已被访问过且在栈里也更新low属性

最后对自己的操作就是判断dfn 和 low是否相等

相等说明它是连通块的头，已经无法再更新了

这时候不断出栈直到自己也出栈

总的操作就是遍历每个点，没访问就dfs

-------------------------------------------------------------------

tarjan算法和kosaraju算法有点类似，都是利用了反向边的性质，本质上是强连通分量中反向边的可达性，依此对每个点都最小化点的属性，而属性选择dfs序较高效

tarjan算法要dfs一次，邻接表的时间复杂度是 O(V+E)


----------------------------------------------------------------------

求连通块的出度和入度就是判断原本连接的两个点是否在同一个强连通分量中

```cpp
int V;
vector<int> G[maxv];
int dfn[maxv],low[maxv],cmp[maxv];
bool in_stack[maxv];
stack<int> s;
int tim;
int num=0;  //最后的num是连通块数量 
int in[maxv];
int out[maxv];

void tarjan_dfs(int x){
	dfn[x] = low[x] = ++tim;
	s.push(x);
	in_stack[x] = true;
	
	for(int i=0;i<G[x].size();i++){
		int to = G[x][i];
		if(dfn[to] == 0){
			tarjan_dfs(to);
			low[x] = min(low[x] , low[to]);
		}
		else if(in_stack[to]){
			low[x] = min(low[x] , low[to]);
		}
	}
	
	int tmp;
	if(dfn[x] == low[x]){
		do{
			tmp = s.top();
			cmp[tmp] = num;
			s.pop();
			in_stack[tmp] = false;
		}while(tmp != x);
		num++;
	}
}


void tarjan_scc(){
	for(int i=0;i<V;i++){
		if(!dfn[i]){
			tarjan_dfs(i);
		}
	}
}

void in_out_d(){
	for(int i=0;i<V;i++){
		for(int j=0;j<G[i].size();j++){
			int to = G[i][j];
			if(cmp[i] != cmp[to]){
				in[cmp[to]]++;
				out[cmp[i]]++;
			}
		}
	}
}
```


## Tarjan算法 （割点、桥部分）

利用dfn和low判定割点和桥，注意更新

```cpp
int V;
vector<int> G[maxv];
int dfn[maxv],low[maxv],cmp[maxv];
bool in_stack[maxv];
stack<int> s;
int tim;
int num=0;  //最后的num是连通块数量 
set<int> cut;
int Rchild;
int cnt_root;
set<pair<int,int>> bridge; 

void tarjan_dfs(int x,int p){
    dfn[x] = low[x] = ++tim; 
    s.push(x);
    in_stack[x] = true;
    
    for(int i=0;i<G[x].size();i++){
        int to = G[x][i];
        if(to != p){
        	
        	if(dfn[to] == 0){
        		if(x == cnt_root) Rchild++;
            	tarjan_dfs(to , x);
            	low[x] = min(low[x] , low[to]);
            	
            	if(x != cnt_root and low[to] >= dfn[x]) cut.insert(x);         //不是根，求割点 
            	if(low[to] > dfn[x]) bridge.insert({min(x,to),max(x,to)});     //求桥 
            	
         	}
        	else if(in_stack[to]){
            	low[x] = min(low[x] , dfn[to]);  //注意这里是dfn，而不是求scc的low 
        	}
        	
		}
    }
    
    int tmp;
    if(dfn[x] == low[x]){
        do{
            tmp = s.top();
            cmp[tmp] = num;
            s.pop();
            in_stack[tmp] = false;
        }while(tmp != x);
        num++;
    }
}


void tarjan_scc(){
    for(int i=0;i<V;i++){
        if(!dfn[i]){
        	cnt_root = i;
        	Rchild = 0;
            tarjan_dfs(i,-1);
            
            if(Rchild > 1) cut.insert(cnt_root);       //是根，求割点 
        }
    }
}
```

[割点的模板测试](https://www.luogu.com.cn/problem/P3388) 这个题的数据好像有森林

[桥的模板测试](https://www.luogu.com.cn/problem/P1656)


## LCA

大致的做法就是直接法，直接向上追溯

对于多次查询通过跳级预处理，利用二分的思想

单次查询，O(n)

```cpp
vector<int> G[maxv];
int root;

int parent[maxv];
int depth[maxv];

void dfs(int v,int p,int d){
	parent[v] = p;
	depth[v] = d;
	for(int i=0;i<G[v].size();i++){
		if(G[v][i] != p) dfs(G[v][i] , v , d+1);
	}
}

void init(){
	dfs(root , -1 , 0);
}

int lca(int u,int v){
	while(depth[u] > depth[v]) u = parent[u];
	while(depth[v] > depth[v]) v = parent[v];
	
	while(u != v){
		u = parent[u];
		v = parent[v];
	}
	
	return u;
}
```

多次查询 O(nlogn)

```cpp
vector<int> G[maxv];
int root;

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
```



## dfs序 (与线段树和树状数组结合)

```cpp
vector<int> G[maxv];  //图的领接表 
int od[maxv];  //dfs序 
int L[maxv];   //子树区间左边界 
int R[maxv];   //子树区间有边界 
int cnt = 1;   //当前是第几个节点（dfs序） 
void dfs(int x,int p){
	od[x] = cnt++;
	L[x] = cnt - 1;
	for(int i:G[x]){
		if(i!=p){
			dfs(i,x);
		}
	}
	R[x] = cnt - 1;
}
```

## 树链剖分

树链剖分利用重孩子的定义和dfs序将树上路径权值和子树整体权值的修改和查询压缩成连续的区间的查询，对于区间的修改和查询可以利用线段树

以[这道题](https://www.luogu.com.cn/problem/P3384)为例

（无注释代码点击[此处](https://pasteme.cn/41602)）

```cpp
#include<bits/stdc++.h>
using namespace std;
const int maxn = 1e5+10;
struct edge{     //链式前向星存图 
	int to,nxt;
}e[maxn<<1];     //用双向边代替无向边 

struct tnode{    //线段树的节点 节点权值，覆盖的左区间，覆盖的右区间，覆盖的范围，lazy标签 
	int w,l,r,siz,lazy;
}tn[maxn<<2];    // 大小要*4  


//wch：重孩子                   sz：子树大小      head：链式前向星的head    
//wt：原来树上节点的权值        dep：深度         dfn：dfs序 
//par：父节点                   top：树上节点所属链的链首      rdfn：dfs序的反映射 

int wch[maxn],sz[maxn],head[maxn],wt[maxn],dep[maxn],dfn[maxn],par[maxn],top[maxn],rdfn[maxn];
int n,m,r,mod;   
int cnt_e;   //链式前向星的计数器 
int cnt_d;   //dfs序的计数器 

void add_edge(int u,int v){   //链式前向星的建图函数 
	e[++cnt_e].to = v;        
	e[cnt_e].nxt = head[u];   //头插法 
	head[u] = cnt_e;
}

void dfs1(int u,int p){      //获得子树大小 ，深度，父节点，重孩子 
	sz[u] = 1;
	for(int i = head[u]; i ; i=e[i].nxt){
		int t = e[i].to;
		if(t != p){
			dep[t] = dep[u] + 1;
			par[t] = u;
			dfs1(t,u);
			sz[u] += sz[t];
			if(sz[t] > sz[wch[u]]) wch[u] = t;
		} 
	}
}

void dfs2(int u,int p,int tp){  //剖分重链和轻链 
	top[u] = tp;
	dfn[u] = ++cnt_d;          //dfs序 
	rdfn[cnt_d] = u;           //反dfs序 
	if(wch[u]){                //先操作重孩子，目的是让重链节点的dfs序连续，便于在线段树上的区间操作 
		dfs2(wch[u],u,tp);
	}
	for(int i=head[u]; i ; i=e[i].nxt){
		int t = e[i].to;
		if(t != p and t != wch[u]){
			dfs2(t,u,t);      //操作轻孩子 
		}
	}
}

void pushup(int u){   //通过两个孩子，更新自己的权值 由于题目要求，所以是求和形式 
	tn[u].w = (tn[u<<1].w + tn[u<<1|1].w) % mod;
}

void build(int u,int l,int r){  //建立线段树 
	tn[u].l = l;
	tn[u].r = r;
	tn[u].siz = r - l + 1;
	if(l == r){
		tn[u].w = wt[rdfn[l]];   //此时获得线段树节点的权值 
		return ;
	}
	int mid = (l+r) >> 1;
	build(u<<1 , l , mid);       //递归建树 
	build(u<<1|1 , mid+1 , r);
	pushup(u);                   //每建一层就通过两个孩子更新自己 
}

void pushdown(int u){   //通过迟滞，下放lazy，在需要的时候更新，这样会减少操作量 
	if(tn[u].lazy){
		tn[u<<1].w = (tn[u<<1].w + tn[u<<1].siz * tn[u].lazy) % mod;  //通过迟滞来更新子节点的权值 
		tn[u<<1|1].w = (tn[u<<1|1].w + tn[u<<1|1].siz * tn[u].lazy) % mod;
		tn[u<<1].lazy = (tn[u<<1].lazy + tn[u].lazy) % mod;           //下放迟滞 
		tn[u<<1|1].lazy = (tn[u<<1|1].lazy + tn[u].lazy) % mod;
		tn[u].lazy = 0;                                               //该节点迟滞的作用结束，清空 
	}
}

void update(int u,int l,int r,int w){   //更新区间 
	if(l<=tn[u].l and r>=tn[u].r){      // 当目标区间包含了节点区间时，无法往下操作，更新节点的权值和迟滞 
		tn[u].w += tn[u].siz * w;
		tn[u].lazy += w;
		return ;
	}
	pushdown(u);                        // 下放迟滞准备对子节点的更新操作 
	int mid = (tn[u].l + tn[u].r) >> 1; //这里是节点区间的一半 
	if(l<=mid) update(u<<1, l , r , w);
	if(r>mid) update(u<<1|1, l , r , w);
	pushup(u);                          //子树更新完毕,通过子节点更新自己 
}

void add_path(int u,int v,int w){   //对路径的更新操作 
	while(top[u]!=top[v]){          //如果不属于一条重链 
		if(dep[top[u]] < dep[top[v]]) swap(u,v);   //现在它们属于两条链，始终对链头深度大的进行操作 
		update(1,dfn[top[u]],dfn[u],w);            //更新这条链 
		u = par[top[u]];                           //这条链更新完毕，跳到链头的父节点，这样最终它们会相遇，处在同一条链上 
	}
	
	if(dep[u] > dep[v]) swap(u,v);   //让深度低的节点在左，才可以区间操作 
	update(1,dfn[u],dfn[v],w);       //根据dfs序 
}

int query(int u,int l,int r){     //区间查询 
	if(l<=tn[u].l and r>=tn[u].r) return tn[u].w;     //已经缩到最小区间，直接返回值 
	
	int ans = 0;
	pushdown(u);                 //下放迟滞，以备后续操作 
	int mid = (tn[u].l + tn[u].r) >> 1;
	if(l<=mid) ans = (ans + query(u<<1 , l , r)) % mod;
	if(r>mid) ans = (ans + query(u<<1|1 , l , r)) % mod;
	return ans;
}

int query_path(int u,int v){   //路径上的查询 
	int ans = 0;
	while(top[u] != top[v]){   //与路径上的更新相同 
		if(dep[top[u]] < dep[top[v]]) swap(u,v);
		ans = (ans + query(1, dfn[top[u]] , dfn[u])) % mod;
		u = par[top[u]];
	}
	if(dep[u] > dep[v]) swap(u,v);
	ans = (ans + query(1,dfn[u],dfn[v])) % mod;
	return ans;
}



int main(){
	//freopen("in.txt","r",stdin);
	cin>>n>>m>>r>>mod;
	for(int i=1;i<=n;i++){
		cin>>wt[i];
	}
	for(int i=0;i<n-1;i++){
		int x,y;
		cin>>x>>y;
		add_edge(x,y);
		add_edge(y,x);
	}
	
	dfs1(r,0);    //初始化 
	dfs2(r,0,r);
	build(1,1,n);
	
	for(int i=0;i<m;i++){
		int tp;
		cin>>tp;
		switch(tp){
			case 1:{
				int x,y,z;
				cin>>x>>y>>z;
				add_path(x,y,z%mod);
				break;
			}
			case 2:{
				int x,y;
				cin>>x>>y;
				cout<<query_path(x,y)<<endl;
				break;
			}
			case 3:{
				int x,z;
				cin>>x>>z;
				update(1,dfn[x],dfn[x]+sz[x]-1,z%mod);
				break;
			}
			case 4:{
				int x;
				cin>>x;
				cout<<query(1,dfn[x],dfn[x]+sz[x]-1)<<endl;
				break;
			}
		}
	}
	return 0;
}
```



## 树上启发式合并

dsu on tree

并查集的按秩合并是启发式，即小的往大的合并，减少查询难度

树上启发式合并通过树链剖分中重孩子的定义，在对子树查询时，先处理所有轻孩子，然后撤销（消除轻孩子对父节点的影响），再处理重孩子，不撤销，最后再处理一遍轻孩子，把对父节点的贡献和重孩子合并

撤销的目的在于对节点信息查询时会开辟一个数组，对于不同子节点，这个数组要再开辟一次，这样会MLE

以[这道题](https://www.luogu.com.cn/problem/U41492)为例

（无注释代码点击[此处](https://pasteme.cn/41607)）

```cpp
#include<bits/stdc++.h>
using namespace std;
const int maxn = 1e5 + 10;
struct edge{
	int to,nxt;
}e[maxn<<1];
int sz[maxn],par[maxn],c[maxn],head[maxn],wch[maxn],ans[maxn],num[maxn];  //这些变量见树链剖分部分 
int n,m;
int sum;  //子树颜色数 
int cnt;  //计数器 

void add_edge(int u,int v){
	e[++cnt].to = v;
	e[cnt].nxt = head[u];
	head[u] = cnt;
}

void dfs(int u,int p){
	sz[u] = 1;
	for(int i = head[u]; i ; i=e[i].nxt){
		int t = e[i].to;
		if(t != p){
			dfs(t,u);
			sz[u] += sz[t];
			if(sz[t] > sz[wch[u]]) wch[u] = t;
		} 
	}
}

void cal(int u,int p,int wch,int val){
	if(!num[c[u]]) sum++;               //如果之前数量为0，说明是新颜色 
	num[c[u]] += val;
	for(int i=head[u]; i ; i=e[i].nxt){  
		int t = e[i].to;
		if(t != p and t != wch){       //跳过重孩子 
			cal(t,u,wch,val);       
		}
	}
}

void dsu(int u,int p,int kp){   //kp表示是否撤销 
	for(int i=head[u]; i ; i=e[i].nxt){
		int t = e[i].to;
		if(t != p and t != wch[u]){
			dsu(t,u,0);            //先处理轻孩子，需要撤销 
		}
	}
	
	if(wch[u]) dsu(wch[u] , u , 1);  //处理重孩子，需要保留 
	
	cal(u,p,wch[u],1);            //计算轻孩子 
	ans[u] = sum;
	
	if(!kp){                      
		cal(u,p,0,-1);           //撤销操作 
		sum = 0;
	}
}

int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);
	cin>>n;
	for(int i=0;i<n-1;i++){
		int x,y;
		cin>>x>>y;
		add_edge(x,y);
		add_edge(y,x);
	}
	for(int i=1;i<=n;i++){
		cin>>c[i];
	}
	  
	dfs(1,0);                     //初始化 
	dsu(1,0,1);
	
	
	cin>>m;
	while(m--){
		int foo;
		cin>>foo;
		cout<<ans[foo]<<endl;
	}
	return 0;
}
```


## Dinic算法

用来解决最大流问题

有两类算法

增广路算法（dinic ek isap ff）

预流推进算法 （hlpp）

dinic算法是经典算法，hlpp可能更快一点

dinic算法的本质还是贪心+暴力

通过不断地对残余网络(residual networks)求增广路(augmenting paths)，对每一条增广路求流量，然后把流量加起来就是最大流

有一个问题：在对增广路下放流量时，可能错过最优解

解决的方法是，对每条边加一条反向边，流量在原来的边减多少，就在反向边加多少，这样可以通过流入反向边来达到撤销的操作

dinic的操作过程分两步

bfs建立分层图，通过最短路的原则分层，每次在最短路的前提下找增广路，这是贪心的思想，这样会使找增广路高效且达到可行解

dfs找增广路，不断对边进行流量增减操作，暴力枚举思想

不断迭代每次产生的残余网络

三种优化（主要是后两者）[参考文章](https://www.cnblogs.com/Absofuckinglutely/p/11520363.html)

当前弧优化 ：  增广路搜索中不再考虑之前搜索过的边 

多路增广优化： 对于某一条边减去的流量，因增广路覆盖的次数会进行多次操作，现在只需要一次操作就行（操作总的流量），从一次bfs，多次dfs到多次bfs，一次dfs

炸点优化 ： 当某一条增广路中流量为0时，这个点在当前dfs搜索增广路中将不可达，所以直接炸点 

时间复杂度 O(n\*n\*m) 

实际合理运用优化之后，很难达到这样的时间复杂度，dinic算法还是很高效的，甚至可以跑十万个点

根据最大流最小割定理(maximum flow minimum cut theorem) 最大流就是有源汇最小割

对于无源汇最小割和全局最小割可以用Stoer Wagner算法

对于有源汇无源汇上下界最大流，[参考此处](https://www.luogu.com.cn/problem/solution/P5192)

对于时间要求苛刻的最大流可以用HLPP算法

对于费用流，可以用spfa

对于最大流的各种变体，参考其他资料

[测模板题](https://www.luogu.com.cn/problem/P3376)

[无注释代码](https://pasteme.cn/43342)

```cpp
//有时需改成long long 

#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 205;
const int maxm = 5005;
int n,m,s,t;


const int inf = 0x3f3f3f3f; 

struct edge{
    int to , w , nex;
}e[maxm<<1];          //maxm 
int tot=2,head[maxn]; // tot = 2 !!

int dep[maxn],cur[maxn];   //dep : dfs得到的最短距离   cur : 当前弧优化需要拷贝的数组 


void add_edge(int u,int v,int w){
    e[tot].to = v;
    e[tot].w = w;
    e[tot].nex = head[u];
    head[u] = tot++;
}

bool bfs(){
	memset(dep , 0 , sizeof(dep));  
	//memset(dep , 0 , (tot+2)<<2);  
	queue<int> q;
	q.push(s);
	dep[s] = 1;    
	
	int u , v;
	while(q.size()){
		u = q.front();
		q.pop();
		for(int i = head[u] ; i ; i = e[i].nex){
			v = e[i].to;
			if(dep[v] or e[i].w <= 0) continue;  //v 已达到不能作为dfs的增广路 ， 断流的点不能作为dfs的增广路 
			dep[v] = dep[u] + 1;
			q.push(v);
		}
	} 
	for(int i=0;i<=n;i++) cur[i] = head[i];      //拷贝作为当前弧优化 
	return dep[t];                               //是否到达汇点 
}


int dfs(int u , int flow){
	if(u == t) return flow;
	int nowflow = 0;                            //当前流量 
	for(int& i = cur[u] , v ; i ; i = e[i].nex){      //当前弧优化 
		v = e[i].to;
		if(dep[v] != dep[u] + 1 or e[i].w <= 0) continue;      //不满足深度递增或断流就不能作为增广路 
		
		if(int delta = dfs(v , min(flow - nowflow , e[i].w))){    
			e[i].w -= delta;
			e[i^1].w += delta;
			nowflow += delta;                   //多路增广优化，for循环一直进行，nowflow一直增加 
			if(nowflow == flow) break;         //已达到最大流量 
		}
	}
	if(!nowflow) dep[u] = -2;                  //炸点优化 
	return nowflow;
}


ll dinic(){
	ll ans = 0 ;
	while(bfs()){                              //对残余网络不断分层，以备之后dfs求增广路，当汇点不可达时，残余网络将永远不可达 
		ans += dfs(s , inf);
	}
	return ans;
}

int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);
	cin>>n>>m>>s>>t;
	for(int i=0;i<m;i++){
		int x,y,z;
		cin>>x>>y>>z;
		add_edge(x,y,z);
		add_edge(y,x,0);
	}
	ll ans = dinic();
	cout<<ans<<endl;
	return 0;
}
```




![在这里插入图片描述](https://img-blog.csdnimg.cn/20200205145500420.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
