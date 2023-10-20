# ford fulkerson algorithm





```cpp
//O(FE) 
/* 
input 
5 7
1 3 6
3 5 8
2 5 5
3 2 3
1 2 6
4 1 10
4 2 2
4 5
output
11
*/
#include<bits/stdc++.h>
using namespace std;
#define maxv 100
#define inf 0x3f3f3f3f
int v,e;
int s,t;
struct edge{int to,cap,rev;
};
vector<edge> G[maxv];
bool used[maxv];

void add_edge(int from ,int to,int cap)
{
	G[from].push_back((edge){to,cap,G[to].size()});
	G[to].push_back((edge){from,0,G[from].size()-1});
}

int dfs(int s,int t,int f)
{
	if(s==t) return f;
	used[s]=true;
	for(int i=0;i<G[s].size();i++)
	{
		edge &e =G[s][i];
		if(!used[e.to] && e.cap>0)
		{
			int d=dfs(e.to,t,min(f,e.cap));
			if(d>0)
			{
				e.cap-=d;
				G[e.to][e.rev].cap+=d;
				return d;
			}
		}
	}
	return 0;
}

int max_flow(int s,int t)
{
	int flow=0;
	for(;;)
	{
		memset(used,0,sizeof(used));
		int f=dfs(s,t,inf);
		if(f==0) return flow;
		flow+=f;
	}
}

int main()
{
	freopen("input.txt","r",stdin);
	cin>>v>>e;
	for(int i=0;i<e;i++)
	{
		int from,to,cap;
		scanf("%d%d%d",&from,&to,&cap);
		add_edge(from,to,cap);
	}
	cin>>s>>t;
	cout<<max_flow(s,t);
	return 0;
}
```
