# abc163



# [A - Circle Pond](https://atcoder.jp/contests/abc163/tasks/abc163_a)

## 题意

求圆周长

## 题解
ac代码

```python
print(int(input())*2*3.14159265)
```


# [B - Homework](https://atcoder.jp/contests/abc163/tasks/abc163_b)


## 题意

给定假期的时间和每一项作业完成的时间，求这个假期能玩几天

## 题解

ac代码

```python
n,m = map(int , input().split())
a = list(map(int , input().split()))
s = sum(a)
if n>=s:
    print(n-s)
else:
    print(-1)
```



# [C - management](https://atcoder.jp/contests/abc163/tasks/abc163_c)

## 题意

告诉每个员工的老板，询问每个老板有多少个员工

## 题解

ac代码

```python
n=int(input())
a=input().split()
w=[0]*n
for i in a:
    w[int(i)-1]+=1
for i in w:
    print(i)
```


# [D - Sum of Large Numbers](https://atcoder.jp/contests/abc163/tasks/abc163_d)

## 题意

看题目

## 题解

由于10^100次方的作用，这个题目就转化成求从中选n个数，有几种求和的结果

种数就是最大的n个减最小的n个

再遍历所有的n

ac代码

```python
n , k = map(int , input().split())
sum = 0
mod = 1e9+7
def func(x):
    return (2 * n - x + 1) * x / 2 - (x - 1) * x / 2 + 1
for i in range(k , n+2):
    sum = (sum + func(i)) % mod
print(int(sum))
```


# [E - Active Infants](https://atcoder.jp/contests/abc163/tasks/abc163_e)

## 题意

看题目

## 题解

贪心策略，尽可能地把值最大的点放到边边上,所以可以按降序排，然后从左到右

遍历

dp[i][j] 表示区间 [ i , j ] 确定的最大值

cnt<value,index> 表示当前点，即比它大的点都已安置过

那么 dp[i[[j] = max(dp[i+1][j] + cnt.first \*  | cnt.second - i| ,
                              dp[i][j-1] + cnt.first \* |cnt.second - j| )


对于 dp[i+1][j] 和 dp[i][j-1] 都需要用函数进行计算，就形成dfs

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
#define fi first
#define se second
using pll = pair<ll,ll>;
ll n;
ll ans=0;
vector<pll> vt;   //存value和index 
ll dp[2005][2005];
ll cal(ll a,ll b,ll cnt){
	if(a>b) return 0;
	if(dp[a][b]!=-1) return dp[a][b];
	return dp[a][b] = max(cal(a+1 , b , cnt+1) + vt[cnt].fi*abs(vt[cnt].se-a) , cal(a,b-1,cnt+1) + vt[cnt].fi*abs(vt[cnt].se -b));
}
int main(){
	//freopen("in.txt","r",stdin);
	cin>>n;
	ll t;
	for(ll i=0;i<n;i++){
		cin>>t;
		vt.emplace_back(t,i) ;
	}
	sort(vt.begin() , vt.end() , [](pll x,pll y){if(x.fi != y.fi) return x.fi>y.fi; return x.se>y.se;});  //可以直接用greater
	memset(dp,-1,sizeof(dp));
	cout<<cal(0,n-1,0)<<endl;
	return 0;
}
```


# [F - path pass i](https://atcoder.jp/contests/abc163/tasks/abc163_f)


## 题意

一个n个节点的树，每个节点都有一种颜色，可能重复

对于每种颜色，输出包含这种颜色的简单路径数量


## 题解

挺好一道树上dfs求路径的题

把问题转化成所有路径 - 不包含这种颜色的路径数

所有路径数为 C(2,n)+n

不包含这种颜色 i 的路径可以分成两部分

以颜色 i 作为父节点的子树，任意一条都是满足的（注意子树可能有颜色 i ）

将 i 节点作为父节点的子树切去的剩余部分


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200422143230387.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

如果暴力求连通块的话会超时，所以要dfs（回溯思想）

因为分成两个部分，所以维护两种信息

path_num[i]        以i为颜色的点作为父节点中子树里面不包含此颜色的路径数量 

ch_num[i]          以 i 为颜色的点作为父节点中子树的大小，包含 i 颜色 





最后 

k = n - cn_num[i]

ans = all - path_num[i] - k(k+1)/2

对于dfs的细节在代码中标注


ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int c[200005];
vector<long long> G[200005];
long long path_num[200005];        //以i为颜色的点作为父节点中子树里面不包含此颜色的路径数量 
long long ch_num[200005];          //以i为颜色的点作为父节点中子树的大小，包含i颜色 
long long n;
long long ans;
long long dfs(long long u,long long v){
	long long pre = ch_num[c[u]];    //dfs到u时，ch_num[i]的大小       
	long long cnt_ch_num = 1;        //记录以u为父节点，子树的大小，包含自己所以起始为1 
	long long update = ch_num[c[u]]; //每次访问一个子节点就更新，目的是实时地计算路径数（需要用到残差） 
	for(auto i:G[u]){                
		if(i!=v){
			long long cntt = dfs(i,u);   //返回的是以这个点为父节点的子节点数 
			cnt_ch_num += cntt;          //扩充新的子节点数 
			long long delta = ch_num[c[u]] - update;   //计算下一个子节点对于上一个子节点该颜色子树点的数量差 
			long long k = cntt - delta;   //对于每个点都要更新路径数，路径数就是多出来的剩余部分(切去该颜色的点为父节点的所有子树，因为之前算过一部分
										  //所以这里算残差) 
			path_num[c[u]] += (k+1)*k/2;  
			update = ch_num[c[u]];        //为了残差，需要更新 
		}
	}
	
	
	ch_num[c[u]] = pre + cnt_ch_num;     //子树大小为之前的部分 + 以u为父节点子树的部分 
	return cnt_ch_num;                   
}
int main(){
	cin>>n;
	for(long long i=0;i<n;i++) {
		cin>>c[i];
		c[i]--;
	}
	
	long long t1,t2;
	for(long long i=0;i<n-1;i++){
		cin>>t1>>t2;
		t1--;t2--;
		G[t1].push_back(t2);
		G[t2].push_back(t1);
	}
	
	dfs(0,-1);
	for(long long i=0;i<n;i++){
		long long k=n-ch_num[i];
		ans = (n+1)*n/2 - path_num[i] - (k+1)*k/2;     //所有路径 - 子树部分 - 剩余部分 
		cout<<ans<<endl;
	}
	return 0;
}
```



吃了一发爆long long

debug很久发现，“简单路径”居然可以是自己到自己

一直在做android作业，debug快疯掉

debug一天多，发现recyclerview里面没有呈现cardview居然是getItemCount(){return 0;}


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200422144848600.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)


