# Codeforces Round #627 (Div. 3)



# A. Yet Another Tetris Problem [link](https://codeforces.com/contest/1324/problem/A)
# B. Yet Another Palindrome Problem [link](https://codeforces.com/contest/1324/problem/B)
# C. Frog Jumps [link](https://codeforces.com/contest/1324/problem/C)
# D. Pair of Topics [link](https://codeforces.com/contest/1324/problem/D)
# E. Sleeping Schedule [link](https://codeforces.com/contest/1324/problem/E)
### 题意
假设一天有h个小时，DIO一共要睡n次，每次睡ai个小时（按顺序睡觉），每次刚睡醒，就要继续睡觉，一直睡下去，直至睡眠次数耗光。

给定一个一天中的区间[l,r]，如果有一次睡醒时刻在区间内，则这次睡眠为“好睡眠”

对于每次睡眠时间ai,可以选择睡ai小时或ai-1小时

问一开始就进行睡眠的情况下，“好睡眠”的次数最多有几次

### 题解
动态规划

dp[i][j] 

i表示已经进行了i次睡眠   

j表示现在在时刻j

dp表示最大“好睡眠”次数

初始化 ：dp[i][j]=-inf , dp[0][0]=0

分别讨论下面两种情况

to=(j+a[i])%h

to=(j+a[i]-1)%h

状态转移方程 ：dp[i+1][to] = max(dp[i+1][to] , dp[i][j] + flag)

flag当to在区间内为1，否则为0

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,h,l,r;
int dp[2005][2005];
int data[2005];
int main()
{
	//freopen("input.txt","r",stdin);
	ios::sync_with_stdio(0);cin.tie(0);
	cin>>n>>h>>l>>r;
	for(int i=0;i<n;i++) cin>>data[i];
	//preprocess
	memset(dp,0xc0,sizeof(dp));   //0xc0c0c0c0  0x3f3f3f3f
	dp[0][0]=0;
	for(int i=0;i<n;i++)
		for(int j=0;j<h;j++) // <即可
		{
			int to=(j+data[i])%h;
			dp[i+1][to]=max(dp[i+1][to],dp[i][j]+(l<=to and to<=r));
			to =(j+data[i]-1)%h;
			dp[i+1][to]=max(dp[i+1][to],dp[i][j]+(l<=to and to<=r));
		}
	int ans=-1; 
	for(int i=0;i<h;i++)
		ans=max(ans,dp[n][i]);
	cout<<ans<<endl;
	return 0;
}
```
小技巧

inf = 0x3f3f3f3f memset可以用0x3f

ninf=0xc0c0c0c0 memset可以用0xc0

# F. Maximum White Subtree [link](https://codeforces.com/contest/1324/problem/F)

### 题意
给一棵树（比赛当天是植树节！！）

节点有黑的，白的

对于这棵树的某一子图

定义这个子图所有节点的dif=白色节点数-黑色节点数

求每一个节点的最大dif值

### 题解
深度优先搜索+动态规划

首先考虑以每个节点为父节点的子图的最大dif

然后每个节点的的最大dif=作为父节点的最大dif+作为子节点的最大dif

如何求以每个节点为父节点的子图的最大dif？

遍历子节点

判断每个子节点以下（作为父节点）是否白色比黑色多，多则累加对应的数值，否则不累加

这样就形成和了dfs

如何求最终的dif？

作为子节点的部分的dif，可以用该节点的父节点的dif（最终）- 作为父节点的dif

需要判断是否有必要增加“额外部分”

要让该节点的父节点的dif为最终值，需要从根开始，一层层遍历子节点

这样又形成了dfs

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int n;
int dif_orig[200005];
vector<int> adj[200005];
int dif_par[200005];
int ans[200005];
void dfs_par(int u,int par)
{
	dif_par[u]=dif_orig[u];
	for(auto v:adj[u])
	{
		if(v!=par)
		{
			dfs_par(v,u);
			dif_par[u]+=max(dif_par[v],0); //如果黑色比白色多，则丢弃 
		}
	}
}
void dfs_final(int u,int par,int el)
{
	ans[u]=dif_par[u]+el;
	for(auto v:adj[u])
	{
		if(v!=par)
		{
			dfs_final(v,u,max(0,ans[u]-max(dif_par[v],0)));  //里面的max和上面一样，外面的max判断是否有必要增加其他部分（作为子节点的部分） 
		}
	}
}
int main()
{
	//freopen("input.txt","r",stdin);
	ios::sync_with_stdio(0);cin.tie(0);
	cin>>n;
	for(int i=0;i<n;i++) 
	{
		cin>>dif_orig[i];
		if(!dif_orig[i]) dif_orig[i]=-1;   //如果是黑色，则白色-黑色=-1 
	}
	for(int i=1,u,v;i<n;i++)
	{
		cin>>u>>v;
		u--,v--;
		adj[u].emplace_back(v);
		adj[v].emplace_back(u);
	}
	
	dfs_par(0,-1);
	dfs_final(0,-1,0);
	for(int i=0;i<n;i++)
		cout<<ans[i]<<" ";
	return 0;
}
```




