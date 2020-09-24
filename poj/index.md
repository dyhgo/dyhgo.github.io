# poj


## 线段相交

[1127](http://poj.org/problem?id=1127)

### 题意

判断两条线段是否相交，对于N条线段，间接相交也算相交。对于每次询问，判
断给定的两条线段是否相交

### 题解

这个题目分成两部分，一部分是基础的判断两条线段是否相交，用一个bool数组来存储信息。另一部分是判断间接相交，可以用floyd-warshall（比较巧妙）或者并查集.第一部分就是套模板。

点可以用结构体存储（推荐），线段也可以用结构体存储或pair

判断两条线段相交有多重模板，比如判是否平行、重合、求两条直线交点，判断交点是否在线段上，还有ccw（counter clock wise）函数，可参考discuss

比较常见的是<font color=red>快速排斥</font>和<font color=red>跨立检验

以线段为对角线，作平行于x轴、y轴的射线，使之形成矩形，若两个矩形没有相交，则线段不相交（可以排除大部分）

不满足快速排斥进入跨立检验,判断两个点是否在线段的两侧（即跨立），判断方法是外积的符号是否相反，<font color=red>等于0说明在线上

如果两两互相跨立，则线段相交


```cpp
#include<iostream>
#include<algorithm>
using namespace std;
int n;
bool con[15][15];
int p,q;
struct point
{
	double x,y;
	//point(double a,double b) : x(a),y(b) {}            //!!!!!会发生编译错误 
};
pair<point,point> seg[15];
double dir(point a,point b,point c) //用外积 
{
	return (c.x-a.x)*(c.y-b.y) - (c.y-a.y)*(c.x-b.x); 
}
bool judge(pair<point,point> p1,pair<point,point> p2)
{
	point a,b,c,d;
	a=p1.first; 
	b=p1.second;
	c=p2.first;
	d=p2.second;
	//快速排斥
	if(min(a.x,b.x)>max(c.x,d.x) or min(c.x,d.x)>max(a.x,b.x) or
	   min(a.y,b.y)>max(c.y,d.y) or min(c.y,d.y)>max(a.y,b.y))
	   return false;
	//跨立检验 (int 可改成double)
	else
	{
		int d1,d2,d3,d4;
		d1=dir(a,b,c);
		d2=dir(a,b,d);
		d3=dir(c,d,a);
		d4=dir(c,d,b);
		return d1*d2<=0 and d3*d4<=0;    //!!!
	}
}
int main()
{
	while(scanf("%d",&n)==1 and n!=0)
	{
		for(int i=1;i<=n;i++) con[i][i]=true;
		for(int i=1;i<=n;i++)
			scanf("%lf%lf%lf%lf",&seg[i].first.x,&seg[i].first.y,&seg[i].second.x,&seg[i].second.y);
		for(int i=1;i<=n;i++)
			for(int j=1;j<i;j++)
			{
				if(judge(seg[i],seg[j])) con[i][j]=con[j][i]=true;
				else con[i][j]=con[j][i]=false;
			}
		for(int k=1;k<=n;k++)                                               //Floyd-Warshall算法或并查集都可以 
			for(int i=1;i<=n;i++)
				for(int j=1;j<=n;j++)
					con[i][j] |= con[i][k] and con[k][j];
		while(scanf("%d%d",&p,&q)==2 and p!=0)
			puts(con[p][q] ? "CONNECTED" : "NOT CONNECTED");
	}
	return 0;
}
```

### 艰难的debug
计算几何有些很麻烦，代码太相似，debug比较难，有时还要考虑精度问题（即误差eps）

debug一个上午

写完代码CE，seg[i].first.x错误，把stl_pair.h中的代码小改一下可以通过，但放到oj上肯定不行，怕污染代码还是不这样做。最后发现<font color=red>把构造函数去掉</font>可以通过

自测，最后一个样例没过，发现是边界情况，<font color=red>把跨立检验最后一步的等号加上

自测，中间有一个样例没过，作图，把样例分离出来，过了。说明可能不是judge函数的问题。

单测样例，没过，说明错误不是受别组影响

编译器debug，把函数内的局部变量，变成全局变量，add watch

发现d1 d2 d3 d4都等于0，a.x a.y b.x b.y  ....有问题

继续add watch

发现seg[1].first的内容就有问题，是double边界数，然后发现最终问题 %d 赋值给了double型变量

### 总结
提高debug能力，少犯白痴错误。

写代码要有清晰性和完整性，这样鲁棒性更强。

===========================================================================================================

## 并查集

[1182](http://poj.org/problem?id=1182)

### 题解

并查集

看到信息的内容，有并查集的影子

依次遍历信息，对于每一条信息，因为没有说种类，所以设置三个种类，把每一种情况都加上去，比如：x和y属于同一类，则合并x和y属于A类，B类，C类

判断是否是错误信息，只要判断是否与前面信息矛盾即可

并查集的时间复杂度O(α(n)) α(n)是阿克曼函数的反函数，比O(lgn)还快

代码如下（并查集的模板 + 并查集的应用）

```cpp
#include<iostream>
using namespace std;
int T[100005],X[100005],Y[100005];
int n,k;
//union find
int par[150005];     //父亲 
int rankk[150005];    //树的高度,!!!元素是根 （优化用）//reference to "rank" is ambiguous
//初始化，要用并查集前要初始化
void init(int n)      
{
	for(int i=0;i<n;i++)
	{
		par[i]=i;
		rankk[i]=0;
	}
} 
//查询树的根
int find(int x)
{
	if(par[x]==x) return x;
	else return par[x]=find(par[x]);     //return find(par[x]);也可以 。par[x]=find(par[x]) 是路径压缩优化  
} 
//合并x,y //优化高度（如果rankk不同，那么从rankk小的向大的连边 
void unite(int x,int y)
{
	x=find(x);
	y=find(y);
	if(x==y) return ;                  //判断是否已在同一个集合内
	
	if(rankk[x]<rankk[y]) par[x]=y;      //!!!利用它们的 根 进行合并 
	else
	{
		par[y]=x;
		if(rankk[x]==rankk[y]) rankk[x]++;     //这时候rankk还是原来的高度 
	 } 
} 
//判断是否在同一个集合内
bool  same(int x,int y)
{
	return find(x)==find(y);
}
int main()
{
	cin>>n>>k;
	for(int i=0;i<k;i++)
		scanf("%d%d%d",&T[i],&X[i],&Y[i]);
		
	init(n*3);
	
	int ans=0;
	for(int i=0;i<k;i++)
	{
		int t=T[i],x=X[i]-1,y=Y[i]-1;
		
		//错误的编号
		if(x<0 || x>=n || y<0 || y>=n)
		{
			ans++;
			continue;
		} 
		else if(t==1)                           //第一种类型
		{
			if(same(x,y+n) || same(x,y+2*n)) ans++;           //判断是否矛盾 //!!!只需要判断x在A类就行，因为每次unite都
			                                                  //涵盖所有情况，它们是平行影响的，判断一个就相当于判断所有 
			else
			{
				unite(x,y);
				unite(x+n,y+n);
				unite(x+n+n,y+n+n);
			}
		} 
		else if(t==2)
		{
			if(same(x,y) || same(x,y+2*n)) ans++;
			else
			{
				unite(x,y+n);
				unite(x+n,y+2*n);
				unite(x+2*n,y);
			}
		}
	}
	cout<<ans<<endl;
	return 0;
}
```

===========================================================================================================


## 完全背包问题
[1384](http://poj.org/problem?id=1384)
### 题解

题意：完全背包问题求最小价值

<font color=red>时间复杂度O(nm)

二维数组如下，MLE
```cpp
#include<iostream>
#include<algorithm>
using namespace std;
int dp[505][10005];
int v[505];
int w[505];
int t;
int e,f;
int n,m;
const int inf=0x3f3f3f3f;
int main()
{
	cin>>t;
	while(t--)
	{
		cin>>e>>f;
		m=f-e;
		cin>>n;
		//init
		fill(dp[0],dp[0]+n*(m+1),inf);
		dp[0][0]=0;
		for(int i=1;i<=n;i++)
			scanf("%d%d",&v[i],&w[i]);
		for(int i=1;i<=n;i++)
			for(int j=0;j<=m;j++)
				if(j<w[i])
					dp[i][j]=dp[i-1][j];
				else
					dp[i][j]=min(dp[i-1][j],dp[i][j-w[i]]+v[i]);
		if(dp[n][m]!=inf)
			printf("The minimum amount of money in the piggy-bank is %d.\n",dp[n][m]);
		else
		    printf("This is impossible.\n");
	}
	return 0;
}
```
改一维数组，AC

```cpp
#include<iostream>
#include<algorithm>
using namespace std;
int dp[10005];
int v[505];
int w[505];
int t;
int e,f;
int n,m;
const int inf=0x3f3f3f3f;
int main()
{
	cin>>t;
	while(t--)
	{
		cin>>e>>f;
		m=f-e;
		cin>>n;
		//init
		fill(dp,dp+m+1,inf);     //!!!!!
		dp[0]=0;
		for(int i=1;i<=n;i++)
			scanf("%d%d",&v[i],&w[i]);
		for(int i=1;i<=n;i++)
			for(int j=w[i];j<=m;j++)
					dp[j]=min(dp[j],dp[j-w[i]]+v[i]);
		if(dp[m]!=inf)
			printf("The minimum amount of money in the piggy-bank is %d.\n",dp[m]);
		else
		    printf("This is impossible.\n");
	}
	return 0;
}
```
<font color=red>这个地方要注意 fill 到 dp+m+1

滚动数组好啊

AC代码

```cpp
#include<iostream>
#include<algorithm>
using namespace std;
int dp[2][10005];
int v[505];
int w[505];
int t;
int e,f;
int n,m;
const int inf=0x3f3f3f3f;
int main()
{
	//freopen("input.txt","r",stdin);
	cin>>t;
	while(t--)
	{
		cin>>e>>f;
		m=f-e;
		cin>>n;
		//init
		fill(dp[0],dp[0]+2*(m+1),inf);
		dp[0][0]=0;
		for(int i=1;i<=n;i++)
			scanf("%d%d",&v[i],&w[i]);
		for(int i=1;i<=n;i++)
			for(int j=0;j<=m;j++)
				if(j<w[i])
					dp[i&1][j]=dp[(i-1)&1][j];
				else
					dp[i&1][j]=min(dp[(i-1)&1][j],dp[i&1][j-w[i]]+v[i]);
		if(dp[n&1][m]!=inf)
			printf("The minimum amount of money in the piggy-bank is %d.\n",dp[n&1][m]);
		else
		    printf("This is impossible.\n");
	}
	return 0;
}
```
### 总结
这种类型的dp有两个重点，初始化边界条件，找递推式

求最小，一般初始化为inf，dp[0][0]=0;

求最大，一般初始化为0

必要时可用滚动数组

完全背包递推式的证明（这里证明求最大值的情况）

dp[i][j]=max{dp[i-1][j-k*w[i]]+k\*v[i] | k>=0}

=max(dp[i-1][j] , max{dp[i-1][j-k*w[i]]+k\*v[i] | k>=1}

=max(dp[i-1][j] , max{dp[i-1][(j-w[i])-k*w[i]]+k\*v[i] | k>=0}+v[i])

=max(dp[i-1][j] , dp[i][j-w[i]]+v[i])

<font color=red>这种分离思想很常见

===========================================================================================================

## 线性dp LCS
[1458](http://poj.org/problem?id=1458)

### 题解

水一题线性dp裸题--LCS(longest common subsequence)

因为没加string头文件CE了3次（被error误导了）

ac代码

```cpp
#include<iostream>
#include<cstring>
#include<string>
using namespace std;
string s1,s2;
int dp[1000][1000];  //dp[i][j] 表示s1到i，s2到j的lcs长度
int len1,len2; 
int lcs(string s1,string s2)
{
	len1=s1.length();
	len2=s2.length();
	memset(dp,0,sizeof(dp));
	for(int i=0;i<len1;i++)
		for(int j=0;j<len2;j++)
			if(s1[i]==s2[j])
				dp[i+1][j+1]=dp[i][j]+1;
			else
				dp[i+1][j+1]=max(dp[i+1][j],dp[i][j+1]);
	return dp[len1][len2];
}
int main()
{
	//freopen("input.txt","r",stdin);
	while(cin>>s1>>s2)
		cout<<lcs(s1,s2)<<endl;		
	return 0;
}
```

===========================================================================================================

## 凸包

[2187](http://poj.org/problem?id=2187)

### 题意
平面上有n个不重合的点，求两个点的最远距离

### 题解
由于点的个数为50000，所以暴力超时

构造凸包，遍历凸包上的点即可

坐标范围在n内的凸多边形（顶点在格点上）的顶点个数最多为O（√n）（尝试不严谨的画图证明，和公差为1的等差数列求和有关，所以是平方关系）

所以构造凸包后，暴力遍历的时间复杂度为O（n）

构造凸包可以用模板 

此处介绍的是<font color=red>时间复杂度O(nlgn）的graham扫描法

<font color=red>外积是很常用的工具，此处利用外积的坐标公式的符号判断凹凸性

可以对点先排序，然后按逆时针方向依次遍历点，先构造凸包的下侧，到达最右端时，构造凸包的上侧


代码如下
```cpp
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
int n;
struct point
{
	double x,y;
}ps[50005];
double s_dist(point a,point b)
{
	double dx=a.x-b.x,dy=a.y-b.y;
	return dx*dx+dy*dy;
}
bool cmp(point a,point b)
{
	if(a.x!=b.x) return a.x<b.x;
	return a.y<b.y;
}
double out_product(double x1,double y1,double x2,double y2)
{
	return x1*y2-x2*y1;
}
vector<point> convex_hull(point* ps,int n)
{
	sort(ps,ps+n,cmp);                                  //很多题目都需要对乱序输入排序
	int k=0;                                             // 凸包点的index 
	vector<point> qs(n*2);                               //构造凸包
	//逆时针构造凸包
	//构造凸包的下侧
	for(int i=0;i<n;i++)
	{
		while(k>1 && out_product(qs[k-1].x-qs[k-2].x , qs[k-1].y-qs[k-2].y , ps[i].x-qs[k-1].x , ps[i].y-qs[k-1].y)<=0) k--;
		qs[k++]=ps[i];
 	} 
	//继续构造凸包的上侧
	for(int i=n-2,t=k;i>=0;i--)
	{
		while(k>t && out_product(qs[k-1].x-qs[k-2].x , qs[k-1].y-qs[k-2].y , ps[i].x-qs[k-1].x , ps[i].y-qs[k-1].y)<=0) k--;  //这里有个k>t 和 k>1效果一样 
		qs[k++]=ps[i]; 
    } 
    qs.resize(k-1);
    return qs;
}
int main()
{
	cin>>n;
	for(int i=0;i<n;i++)
	{
		point p;
		scanf("%lf%lf",&p.x,&p.y);
		ps[i]=p;
	}
	vector<point> qs=convex_hull(ps,n);
	double res=0;
	for(int i=0;i<qs.size();i++)
		for(int j=0;j<i;j++)
			res=max(res,s_dist(qs[i],qs[j]));
	cout<<(int)res<<endl;                                   //!!!不加int 或不用printf("%.0lf\n",res); 就会WA 
	return 0;
}
```
还有一种时间复杂度更低的方法

<font color=red>convex hull + rotating calipers

这是一种常见、经典的方法

对踵点：如果凸包上过两个点画两条平行线，使凸包所有的点都夹在这两条线之间，这两个点就叫对踵点，称为一对对踵点对

对于一个凸包，最远距离一定是对踵点对

所以先找一对对踵点对，根据判断凹凸性，确定哪个点向后面的点移动（如图）（图懒得画），宏观来看就是对踵点对的连线旋转了180°

这样就总时间复杂度就是O（√n）

代码如下

```cpp
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
int n;
struct point
{
	double x,y;
}ps[50005];
inline double s_dist(point a,point b)
{
	double dx=a.x-b.x,dy=a.y-b.y;
	return dx*dx+dy*dy;
}
bool cmp(point a,point b)
{
	if(a.x!=b.x) return a.x<b.x;
	return a.y<b.y;
}
inline double out_product(double x1,double y1,double x2,double y2)
{
	return x1*y2-x2*y1;
}
vector<point> convex_hull(point* ps,int n)
{
	sort(ps,ps+n,cmp);                                  //很多题目都需要对乱序输入排序
	int k=0;                                             // 凸包点的index 
	vector<point> qs(n*2);                               //构造凸包
	//逆时针构造凸包
	//构造凸包的下侧
	for(int i=0;i<n;i++)
	{
		while(k>1 && out_product(qs[k-1].x-qs[k-2].x , qs[k-1].y-qs[k-2].y , ps[i].x-qs[k-1].x , ps[i].y-qs[k-1].y)<=0) k--;
		qs[k++]=ps[i];
 	} 
	//继续构造凸包的上侧
	for(int i=n-2,t=k;i>=0;i--)
	{
		while(k>t && out_product(qs[k-1].x-qs[k-2].x , qs[k-1].y-qs[k-2].y , ps[i].x-qs[k-1].x , ps[i].y-qs[k-1].y)<=0) k--;  //这里有个k>t 和 k>1效果一样 
		qs[k++]=ps[i]; 
    } 
    qs.resize(k-1);
    return qs;
}
int main()
{
	cin>>n;
	for(int i=0;i<n;i++)
	{
		point p;
		scanf("%lf%lf",&p.x,&p.y);
		ps[i]=p;
	}
	
	vector<point> qs=convex_hull(ps,n);
	double res=0;                               
	int m=qs.size();
	if(m==2)      //特殊处理凸包退化情况
	{
		cout<<(int)s_dist(qs[0],qs[1])<<endl; 
		return 0; 
	} 
	int i=0,j=0;  //表示左右俩对踵点
	//求x轴方向上的对踵点对
	for(int k=0;k<m;k++)
		if(cmp(qs[j],qs[k])) j=k;
	//rotating calipers
	int si=i,sj=j;
	while(!(i==sj && j==si))                         //旋转180°，注意判断条件 
	{
		//cout<<i<<" "<<j<<endl;
		res=max(res,s_dist(qs[i],qs[j]));           //这条语句放在while循环体的前端，可以把x轴方向上的对踵点对都比较
		//通过外积判断凹凸性，判断是i移到i+1，还是j移到j+1
		if(out_product(qs[(i+1)%m].x-qs[i].x , qs[(i+1)%m].y-qs[i].y , qs[(j+1)%m].x-qs[j].x , qs[(j+1)%m].y-qs[j].y)<0)  //<0 或<=0都可以
			i=(i+1)%m;                                    //把m错写成n,tle好久 
		else
			j=(j+1)%m;                                   //!!!要%m 这样转一圈才能回到起点，退出循环 
	}                                                 //之前添加的debug条件忘记屏蔽，WA了特久 
	cout<<(int)res<<endl;
	return 0;
}
```

===========================================================================================================

## bfs dfs

[2386](http://poj.org/problem?id=2386)

### 题解

bfs dfs都行
基础dfs
<font color=Red>**时间复杂度 O(mn)**
```cpp
//dfs
#include<iostream>
using namespace std;
char field[105][105];
int n,m;
void dfs(int x,int y)
{
	field[x][y]='.';
	for(int dx=-1;dx<=1;dx++)
		for(int dy=-1;dy<=1;dy++)
		{
			int nx=x+dx,ny=y+dy;
			if(0<=nx && nx<n && 0<=ny && ny<m && field[nx][ny]=='W')
				dfs(nx,ny);
		}
	return ;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	cin>>n>>m;
	for(int i=0;i<n;i++)
		for(int j=0;j<m;j++)
		{
			cin>>field[i][j];
		}
	int res=0;
	for(int i=0;i<n;i++)
		for(int j=0;j<m;j++)
		{
			if(field[i][j]=='W') 
			{
				dfs(i,j);
				res++;
			}
		}
	cout<<res<<endl;
	return 0;
}
```
### 总结
经典dfs就是递归思想
如果图外面是可达且连通的，就在图外面加一圈

===========================================================================================================


## 状态压缩dp


[2686](http://poj.org/problem?id=2686)

### 题解

TSP问题

不能在多项式时间内求解

暴力求解是阶乘数量级的

在数据不是很大的时候可以用状态压缩dp

对于这道题时间复杂度O((2^n)\*m\*m\*n)

基础状态压缩dp

以3.667为例

道路图为

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200304121941941.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

dp[S][x] 

S表示剩余车票集合

x表示从a出发到达x（单源最短路）

dp表示最小花费

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200304122335132.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

这样就变成DAG求最短路问题，不需要使用dijkstra算法，用dp就可以

dp的初始条件是

dp=inf   , dp[U][a]=0

dp的状态转移方程

dp[S/{i}][u] = min{dp[S][v]+d[v][u]/t[i] (i∈S)}

将集合用整数的二进制表示

根据状态转移方程，可以用记忆化搜索+递归

这个问题可以用循环嵌套求解

约束条件很重要

这道题的约束条件是“车票”

如果题目要求每个点只能走一遍的话

那么又有一个约束条件是“点”（即判断这个点是否走过）

循环嵌套的写法就是按照套路

遍历所有子集，嵌套遍历每种子集的操作情况

遍历集合的所有情况（逆序）

嵌套遍历每个点

再嵌套遍历每个点

依题意再嵌套遍历剩下的所有车票（顺序可与上一步调换）

最后遍历所有的dp[S'][b] S'⊆U，获得最小值

ac代码

```cpp
#include<iostream>
#include<cstring>
#define maxn 8
#define maxm 30
#define inf 0x3f3f3f3f
using namespace std;
int n,m,p,a,b;
int t[maxn];
int d[maxm][maxm];
double dp[1<<maxn][maxm];    //dp[剩下的车票集合][目标城市]=从a到达目标城市的最短时间 
int main()
{
	while(scanf("%d%d%d%d%d",&n,&m,&p,&a,&b)==5 and !(n==0 and m==0 and p==0 and a==0 and b==0))
	{
		for(int i=0;i<n;i++) scanf("%d",&t[i]);
		memset(d,-1,sizeof(d));
		int temp1,temp2,temp3;
		for(int i=0;i<p;i++)
		{
			scanf("%d%d%d",&temp1,&temp2,&temp3);
			d[temp1-1][temp2-1]=temp3;
			d[temp2-1][temp1-1]=temp3;
		}
		
		for(int i=0;i<1<<n;i++) fill(dp[i],dp[i]+m,inf);           //注意这里要用循环初始化二维数组 //inf是因为要用到min 
		dp[(1<<n)-1][a-1]=0;
		double res=inf;                                            //inf是因为要用到min 
		for(int s=(1<<n)-1;s>=0;s--)
		{
			res=min(res,dp[s][b-1]);
			for(int v=0;v<m;v++)
			{
				for(int u=0;u<m;u++)
				{
					if(d[v][u]>=0)
					{
						for(int i=0;i<n;i++)
						{
							if(s>>i&1)
							{
								dp[s&~(1<<i)][u]=min(dp[s&~(1<<i)][u],dp[s][v]+(double)d[u][v]/t[i]);
							}
						}
					}
				}
			}
		}
		if(res==inf) printf("Impossible\n");
		else printf("%.3lf\n",res);                //discuss里面说poj用lf会wa,用f就ac ，但我试了lf也可以ac
	}
	return 0;
}

```

===========================================================================================================


## 强连通分量

[2816](http://poj.org/problem?id=2816)

### 题解

如果一头牛被其他所有牛认为是红牛，那么和它在同一个强连通分量的所有牛都

是红牛，所以scc分解，拓扑序最后一个强连通分量是红牛群，最后检查这个连通

块中的一头红牛是否对所有牛可达



```cpp
#include<iostream>
#include<vector>
#include<cstring>
using namespace std;
int V,m;
int t1,t2;   
#define maxv 10005                     
vector<int> G[maxv];           
vector<int> rG[maxv];
vector<int> vs;                  
bool used[maxv];                
int cmp[maxv];                   

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
	memset(used,0,sizeof(used));
	int k=0;
	for(int i=vs.size()-1;i>=0;i--) if(!used[vs[i]]) rdfs(vs[i],k++);
	return k;
}
int main(){
	cin>>V>>m;
	while(m--){
		cin>>t1>>t2;
		add_edge(t1-1,t2-1);
	}
	int k=kosaraju_scc();
	int u=0,num=0;                     //备选个数 u取得正序最后一个 
	for(int i=0;i<V;i++){
		if(cmp[i]==k-1){
			u=i;
			num++;
		}
	}
	memset(used,0,sizeof(used));
	rdfs(u,0);                         //反向判断是否都可达
	for(int i=0;i<V;i++){
		if(!used[i]){
			num=0;
			break;
		}
	} 
	cout<<num<<endl;
	return 0;
}
```

===========================================================================================================

## 扫描线

[2932](http://poj.org/problem?id=2932)

### 题意
坐标上有n个不相交的圆，求最外层圆的index

### 题解
由于数据规模，暴力超时

<font color=red>sweeping line

一般有两种，平移扫描，环形扫描

对于这一题，从左到右平移扫描

用一个容器维护每个圆的左右两个端点，代表扫描到圆和扫描出圆

对于扫描到的圆，判断它是否在别的圆内

只需要判断上下最近的两个圆（可画图证明，不严谨）

用一个容器维护还没扫描出的最外圆，可以排序，再查找。<font color=red>总时间复杂度O(nlgn)

可以选用set

当扫描到右时，把圆从set中去除，意味着扫描过了
```cpp
#include<iostream>
#include<set>
#include<vector>
#include<algorithm>
using namespace std;
double x[40005],y[40005],r[40005];
int n;
typedef pair<double ,int> pdi;
bool inside(int i,int j)
{
	double dx=x[i]-x[j],dy=y[i]-y[j];
	return dx*dx+dy*dy<=r[j]*r[j];
}
int main()
{
	cin>>n;
	for(int i=0;i<n;i++)
		scanf("%lf%lf%lf",&r[i],&x[i],&y[i]);
	
	vector<pdi> vt;       //存左右两边界 
	for(int i=0;i<n;i++)
	{
		vt.push_back(make_pair(x[i]-r[i],i));
		vt.push_back(make_pair(x[i]+r[i],i+n));
	}
	sort(vt.begin(),vt.end());
	//扫描
	set<pdi> outers;    //set为了排序 
	vector<int> res;    //存放结果 
	for(int i=0;i<vt.size();i++)
	{
		int id=vt[i].second%n;
		if(vt[i].second<n)    //扫描到左 
		{
			set<pdi>::iterator it=outers.lower_bound(make_pair(y[id],id));
			if(it!=outers.end() && inside(id,it->second)) continue;           //上面最近的圆 
			if(it!=outers.begin() && inside(id,(--it)->second)) continue;     //下面最近的圆 
			res.push_back(id);
			outers.insert(make_pair(y[id],id));
		}
		else        //扫描到右 
			outers.erase(make_pair(y[id],id));
	} 
	
	sort(res.begin(),res.end());
	cout<<res.size()<<endl;
	for(int i=0;i<res.size();i++)
		printf("%d%c",res[i]+1,i+1==res.size()? '\n' : ' ');
	return 0;
}
```

===========================================================================================================


## 贪心

[3069](http://poj.org/problem?id=3069)

### 题意

一条路上有n个路灯，每个路灯都能照亮左右的一段距离，问最少需要多少路灯才能使街道都亮着

### 题解

<font color=red>**greedy**

从最左开始向右延伸r，在r的范围内将最右的路灯点亮，此时这盏路灯将照亮左边和右边，从暗处的最左路灯开始，已知重复下去。
<font color=red>时间复杂度 O(n)<font>

!!!!需要将路灯位置排序

```cpp
#include<iostream>
#include<algorithm>
using namespace std;
int r,n;
int x[1006];
int main()
{
	while(scanf("%d%d",&r,&n)==2 && r!=-1)
	{
		for(int i=0;i<n;i++)
			scanf("%d",&x[i]);
		
		sort(x,x+n);                               // ！！！记得排序
		
		int j=0,ans=0;
		while(j<n)
		{
			int s=x[j++];
			while(j<n && x[j]<=s+r) j++;
			int p=x[j-1];
			while(j<n && p+r>=x[j]) j++;
			ans++;
		} 
		printf("%d\n",ans);
	}
	return 0;
} 
```

===========================================================================================================

## 贪心

[3617](http://poj.org/problem?id=3617)

### 题意

给一个字符串s和空字符串p，每次进行以下操作之一

删除s的头部字符，加入到p的尾部

删除s的尾部字符，加入到p的尾部

最后s为空，p的字典序最小

### 题解

<font color=red>**greedy**

时间复杂度最坏 O($n^2$)

```cpp
#include<iostream>
using namespace std;
int n;
char s[2005];
int c=0;
int main()
{
	cin>>n;
	for(int i=0;i<n;i++)
	{
		cin>>s[i];
	}
	int a=0,b=n-1;
	bool left=false;
	while(a<=b)
	{
		for(int i=0;a+i<=b;i++)
		{
			if(s[a+i]<s[b-i])
			{
				left=true;
				break;
			}
			else if(s[a+i]>s[b-i])
			{
				left=false;
				break;
			}
		}
		if(left) putchar(s[a++]);
		else putchar(s[b--]);
		c++;
		if(c%80==0) putchar('\n');
	}
	return 0;
}
```
===========================================================================================================

## 01背包问题


[3624](http://poj.org/problem?id=3624)

### 题解

基础01背包问题

如果用二维数组写的话就会MLE

猜测测试数据可能不会满，就随着数据动态申请内存，想侥幸过（可以用new/delete 或 malloc/free）结果还是MLE

这是MLE代码

```cpp
#include<iostream>
using namespace std;
//int dp[3410][12885];
int n,m;
//int w[3410];
//int v[3410];
int main()
{
	cin>>n>>m;
	int **dp,*w,*v;
	dp=new int*[n+3];
	for(int i=0;i<n+3;i++)
		dp[i]=new int[m+3];
	w=new int[n+3];
	v=new int[n+3];
	for(int i=1;i<=n;i++)
	{
		scanf("%d%d",&w[i],&v[i]);
	}
	
	//initialized
	for(int i=0;i<=n;i++)
		dp[i][0]=0;
	for(int i=0;i<=m;i++)
		dp[0][i]=0;
	for(int i=1;i<=n;i++)
		for(int j=0;j<=m;j++)
			if(j<w[i])
				dp[i][j]=dp[i-1][j];
			else
				dp[i][j]=max(dp[i-1][j],dp[i-1][j-w[i]]+v[i]);
	
	cout<<dp[n][m];
	delete dp,w,v;
	return 0;
}
```
在discuss找了一圈也没有二维数组过的

优化成一维数组（节省内存，容易出bug）

AC代码

```cpp
#include<iostream>
using namespace std;
int n,m;
int dp[12885];
int w[3410];
int v[3410];
int main()
{
	cin>>n>>m;
	for(int i=1;i<=n;i++)
		scanf("%d%d",&w[i],&v[i]);
	for(int i=1;i<=n;i++)
		for(int j=m;j>=w[i];j--)
			dp[j]=max(dp[j],dp[j-w[i]]+v[i]);
	cout<<dp[m];
	return 0;
}
```
这个内层循环是递减的，如果是递增则解决完全背包问题

由于01背包问题的dp[i]只依赖于dp[i-1]，内层循环递减时，dp[j]依赖的dp[j]为i-1的dp[j]

由于原来在二维数组中就是递增的，是同一个i，所以内层循环递增时，dp[j]依赖的dp[j]为i的dp[j]，符合完全背包问题

由于有两种状态（i和i-1），所以可利用奇偶性滚动数组实现

AC代码
```cpp
#include<iostream>
using namespace std;
int n,m;
int dp[2][12885];
int w[3410];
int v[3410];
int main()
{
	cin>>n>>m;
	for(int i=1;i<=n;i++)
		scanf("%d%d",&w[i],&v[i]);
	for(int i=1;i<=n;i++)
		for(int j=0;j<=m;j++)
			if(j<w[i])
				dp[i&1][j]=dp[(i-1)&1][j];
			else
				dp[i&1][j]=max(dp[(i-1)&1][j],dp[(i-1)&1][j-w[i]]+v[i]);
	cout<<dp[n&1][m];
	return 0;
}
```

===========================================================================================================


## 2-SAT

[3683](http://poj.org/problem?id=3683)

### 题解

xi表示某一婚礼

xi为真表示在开始举行

xi为假表示在结束举行

对于两个婚礼

如果同在开始时间举行会产生冲突

则 ¬xi ∨ ¬xj 为真

遍历所有的关系对，检查是否产生冲突

如果产生冲突则有一个析取式成立

遍历完之后得到一个合取范式

这样就把问题转换成2-SAT

根据蕴含等值式

a ∨ b  ⇒ (a ∨ b) ∧ (b ∨ a) ⇒ (¬a → b) ∧ (¬b → a)

对于每一个蕴含式都可以构造一条有向边

最后scc分解

判断合取范式是否是可满足式，只需要检查¬xi 和 xi 是否在同一个强连通分量中

最后对于所在强连通分量的拓扑序，依次给出真值

ac代码

```cpp
#include<iostream>
#include<vector>
#include<cstring>
using namespace std;
int n;
int V;      
const int maxv=2005;                   
vector<int> G[maxv];           
vector<int> rG[maxv];
vector<int> vs;                  
bool used[maxv];                 
int cmp[maxv];                  
int s[1005],t[1005],d[1005];

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
    memset(used,0,sizeof(used));
    int k=0;
    for(int i=vs.size()-1;i>=0;i--) if(!used[vs[i]]) rdfs(vs[i],k++);
    return k;
}

int main(){
	cin>>n;
	int t1,t2,t3,t4,t5;
	for(int i=0;i<n;i++){
		scanf("%d:%d%d:%d%d",&t1,&t2,&t3,&t4,&t5);
		s[i]=t1*60+t2;
		t[i]=t3*60+t4;
		d[i]=t5;
	}
	
	V=n*2;
	for(int i=0;i<n;i++)for(int j=i+1;j<n;j++){
		if( min( s[i]+d[i] , s[j]+d[j] ) > max(s[i] , s[j])){
			add_edge(i,n+j);
			add_edge(j,n+i);
		}
		if(min(s[i]+d[i] , t[j]) > max(s[i] , t[j]-d[j])){
			add_edge(i,j);
			add_edge(n+j,i+n);
		}
		if(min(t[i] , s[j]+d[j]) > max(s[j] , t[i]-d[i])){
			add_edge(i+n,j+n);
			add_edge(j,i);
		}
		if(min(t[i] , t[j]) > max(t[i]-d[i] , t[j]-d[j])){
			add_edge(n+i,j);
			add_edge(n+j,i);
		}
	}
	
	kosaraju_scc();
	
	for(int i=0;i<n;i++){
		if(cmp[i]==cmp[i+n]){
			cout<<"NO\n";
			return 0;
		}
	}
	
	cout<<"YES\n";
	for(int i=0;i<n;i++){
		if(cmp[i]>cmp[i+n]){
			printf("%02d:%02d %02d:%02d\n",s[i]/60,s[i]%60,(s[i]+d[i])/60,(s[i]+d[i])%60);
		}
		else{
			printf("%02d:%02d %02d:%02d\n",(t[i]-d[i])/60,(t[i]-d[i])%60,t[i]/60,t[i]%60);
		}
	}
	return 0;
}
```

===========================================================================================================

## bfs dfs


[3984](http://poj.org/problem?id=3984)

### 题解

dfs/bfs都行
基础bfs
（这个测试点只有一个，就是样例）
<font color=red>**时间复杂度O(mn)**

```cpp
#include<iostream>
#include<map>
#include<vector>
#include<queue>
#include<algorithm>
using namespace std;
int n,m;
int maze[7][7];
int d[7][7];
const int inf=0x3f3f3f3f;
typedef pair<int,int> pii; //表示坐标 
int sx,sy,gx,gy;  //起点终点 
int dx[]={0,0,1,-1};
int dy[]={1,-1,0,0};
map<pii,pii > mp;  //记录前驱节点,目的是记录路径 （如果记录路径就可以不用求最短距离） 
vector<pii > vt;   //记录路径 
void bfs()
{
	queue<pii> q;
	fill(d[0],d[0]+7*7,inf);
	q.push(pii(sx,sy));
	d[sx][sy]=0;
	while(q.size())
	{
		pii p=q.front();
		q.pop();
		if(p.first==gx and p.second==gy) break;    //很重要的终止判断条件
		for(int i=0;i<4;i++)
		{
			int nx=p.first+dx[i],ny=p.second+dy[i];
			if(nx>=0 and ny>=0 and nx<n and ny<m and maze[nx][ny]==0 and d[nx][ny]==inf)  //inf的判断很重要
			{
				q.push(pii(nx,ny));
				d[nx][ny]=d[p.first][p.second]+1;
				mp[pii(nx,ny)]=pii(p.first,p.second);
			} 
		} 
	}
}
int main()
{
	//freopen("input.txt","r",stdin);
	n=5;
	m=5;
	for(int i=0;i<n;i++)
		for(int j=0;j<m;j++)
			cin>>maze[i][j];
	
	sx=0,sy=0,gx=4,gy=4;
	
	bfs();
	
	//cout<<d[gx][gy]<<endl;
	pii p;
	p=pii(gx,gy);
	while(p!=pii(sx,sy))
	{
		vt.push_back(p);
		p=mp[p];
	}
	
	reverse(vt.begin(),vt.end());
	printf("(%d, %d)\n",sx,sy);
	for(vector<pii>::iterator it=vt.begin();it!=vt.end();it++)
	{
		printf("(%d, %d)\n",it->first,it->second);
	}
	return 0;
}
```
### 总结
一个经典的bfs模板就是用<font color=red>队列</font>来控制广度优先

===========================================================================================================


## 强连通分量

[1236](http://poj.org/problem?id=1236)


### 题解

第一问就是求scc的数量，第二问就是求对每个scc出度为0的数量和入度为0的数量


```cpp
#include<iostream>
#include<cstring>
#include<vector>
using namespace std;
const int maxv = 105;
int V;                         
vector<int> G[maxv];           
vector<int> rG[maxv];
vector<int> vs;                  
bool used[maxv];                 
int cmp[maxv];      
int in[maxv],out[maxv];

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
	memset(used,0,sizeof(used));
	int k=0;
	for(int i=vs.size()-1;i>=0;i--) if(!used[vs[i]]) rdfs(vs[i],k++);
	return k;
}

int main(){
	cin>>V;	
	for(int i=0;i<V;i++){
		while(1){
			int tmp;
			cin>>tmp;
			if(tmp==0) break;
			tmp--;
			add_edge(i,tmp);			
		}
	}
	int k = kosaraju_scc();
	for(int i=0;i<V;i++){
		for(int j=0;j<G[i].size();j++){
			int to = G[i][j];
			if(cmp[i] != cmp[to]){
				in[cmp[to]]++;
				out[cmp[i]]++;
			}
		}
	}
	int ind =0;
	int outd = 0;
	for(int i=0;i<k;i++){
		if(in[i]==0) ind++;
		if(out[i]==0) outd++;
	}
	int ans;
	if(k==1) ans = 0;else ans = max(ind,outd);
	cout<<ind<<endl;
	cout<<ans<<endl;
	return 0;
}
```

===========================================================================================================

## 平面点分治

[3714](http://poj.org/problem?id=3714)

### 题解

懒得写

```cpp
#include <iostream>
#include <iomanip>
#include <algorithm>
#include <cmath>
using namespace std;
typedef double db ;
struct node{
    db x, y;
    int flag;
}vt[200005], tmp[200005];
bool compy(node n1, node n2){
    return n1.y < n2.y;
}
bool compx(node n1, node n2){
    return n1.x < n2.x;
}
db dist(node n1, node n2){
    db dx = fabs(n1.x - n2.x);
    db dy = fabs(n1.y - n2.y);
    return sqrt(dx * dx + dy * dy);
}
db solve(int l, int r){
    if(l == r) return 1e50;
    int m = (l + r) / 2;
    db d = min(solve(l, m), solve(m + 1, r));
    int cnt = 0;
    for(int i = l; i <= r; ++i){
        if(abs(vt[i].x - vt[m].x) < d){
            tmp[++cnt] = vt[i];
        }
    }
    sort(tmp + 1, tmp + cnt + 1, compy);
    for(int i = 1; i <= cnt; ++i){
        for(int j = i + 1; j <= cnt; ++j){
            if(tmp[j].y - tmp[i].y >= d) break;
            if(tmp[j].flag == tmp[i].flag) continue;
            d = min(d, dist(tmp[i], tmp[j]));
        }
    }
    return d;
}

int main() {
    int _;
    cin >> _;
    while (_--) {
        int n;
        cin >> n;
        for(int i = 1; i <= n; ++i){
            cin >> vt[i].x >> vt[i].y;
            vt[i].flag = 0;
        }
        for(int i = n + 1; i <= 2 * n; ++i){
            cin >> vt[i].x >> vt[i].y;
            vt[i].flag = 1;
        }
        sort(vt + 1, vt + 2 * n + 1, compx);
        cout << fixed << setprecision(3) << solve(1, 2 * n) << endl;
    }
    return 0;
}
```




