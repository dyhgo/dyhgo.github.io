# abc165


# [A - We Love Golf](https://atcoder.jp/contests/abc165/tasks/abc165_a)

## 题意

询问在A到B之间是否有C的倍数

## 题解

特判边界是否满足条件，否则判断左右边界除以C的值是否大于等于1

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
int main(){
    int a,b,c;
    cin>>a>>b>>c;
    if(b/(double)a == b/a) puts("OK");
    else if(c/(double)a == c/a) puts("OK");
    else if(c/a > b/a){
    	puts("OK");
    	
	}
	else puts("NG");
    return 0;
}
```

# [B - 1%](https://atcoder.jp/contests/abc165/tasks/abc165_b)

## 题意

初始有100円，每年利息1%，每年结算时将小数部分抛弃，问多久能达到A円

## 题解

计数器模拟

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
int main(){
    ll a;
    cin>>a;
    ll dy = 0;
    double bs = 100;
    while(bs<a){
    	bs*=1.01;
    	bs = floor(bs);
		dy++; 
	}
	cout<<dy<<endl;
    return 0;
}
```

# [C - Many Requirements](https://atcoder.jp/contests/abc165/tasks/abc165_c)

## 题意

构造一个数列A每个数不大于10，数列长度不大于M，且递增

有q个四元组 a  b c d

如果Ab - Aa == c，则v+=d

求v的最大值

## 题解

最开始有两种思路，暴力构造（超时），对q个四元组贪心（会错过最优解）

所以dfs，dfs到最后一个数时求v并更新v

传入下标作为参数，不需要回溯

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int a[55],b[55],c[55],d[55];
int n,m,q;
int ans;
int dat[12];
void dfs(int ind , int pre){
	if(ind == n){
		int cnt = 0;
		for(int i=0;i<q;i++){
			if(dat[b[i] - 1] - dat[a[i] - 1] == c[i]) cnt+=d[i];
		}
		ans = max(ans , cnt);
	}
	else{
		for(int i = pre;i<=m;i++){
			dat[ind] = i;
			dfs(ind + 1 , i);
		}
	}
}
int main(){
	cin>>n>>m>>q;
	for(int i=0;i<q;i++) cin>>a[i]>>b[i]>>c[i]>>d[i];
	dfs(0,1);
	cout<<ans<<endl;
	return 0;
}
```

# [D - Floor Function](https://atcoder.jp/contests/abc165/tasks/abc165_d)

## 题意

看题目

## 题解

问题转化成在0~N中找一个数x，使得x/B的小数部分最接近0.99999

x = B-1 如果N不允许，找最大N

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
int main(){
   double a,b,n;
   cin>>a>>b>>n;
   double x;
   
   if(n>=b-1) x =b-1;
   else x=n;
   cout<<floor(a*x/b) - a*floor(x/b)<<endl;
   
    return 0;
}
```


# [E - Rotation Matching](https://atcoder.jp/contests/abc165/tasks/abc165_e)

## 题意

有N个玩家，M个竞技场（M*2+1<=N）

每个玩家都有一个数字

每个竞技场安排两个数字，不能重复

共有N轮决斗

对于每一轮，每个竞技场中数字对应的两个玩家进行battle

每一轮决斗后，所有玩家的数字都+1

求安排方案使得所有的人都不会和同一个人battle两次

## 题解

应该是本次比赛最难的题

由于M*2+1<=N

所以合理安排，在进行N轮之后，一定会刚好满足条件

其实就是号码的两两配对

在纸上列出所有的情况，一直尝试、排除

最后会发现，前半段要隔一个对称配对，后半段直接对称配对，这样就能完美错开

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503103250978.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)


ac代码

```cpp
#include<bits/stdc++.h>
	int dat1[100005],dat2[100005];
using namespace std;
int main(){

	int n,m;
	cin>>n>>m;
	if(!(n&1)) n--;
	int mm = (n-1)/2;
	if(mm&1){
		for(int i=1;i<=mm/2;i++){
			dat1[i] = i;
			dat2[i] = (n+1)/2 - i;
		}
		for(int j=(n+1)/2,i = mm/2+1,k=0;i<=mm;i++,j++,k++){
			dat1[i] = j;
			dat2[i] = n - k;
		}
	}
	else{
		for(int i=1;i<=mm/2;i++){
			dat1[i] = i;
			dat2[i] = (n+3)/2 - i;
		}
		for(int i=(n+3)/2,j=n,k=mm/2+1;k<=mm;i++,j--,k++){
			dat1[k] = i;
			dat2[k] = j;
		}
	}
	//for(int i=1;i<=6;i++) cout<<dat1[i]<<" "<<dat2[i]<<endl;
	for(int i=1;i<=m;i++) cout<<dat1[i]<<" "<<dat2[i]<<endl;
	return 0;
}
```

# [F - LIS on Tree](https://atcoder.jp/contests/abc165/tasks/abc165_f)

## 题意


给一棵树，每个点有一个数字属性，求1到X的最短路径中，按1到X的顺序排列数字属性得到的序列中的最长上升子序列（LIS）

对所有的X

## 题解

dfs + lis

注意回溯

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int dp[200005];
vector<int> G[200005];
int n;
int a[200005];
int ans[200005];
const int inf = 0x3f3f3f3f;
void dfs(int u,int p){
	int ind = (int)(lower_bound(dp,dp+n,a[u]) - dp);
	int cnt = dp[ind];
	dp[ind] = a[u];
	ans[u] = (int)(lower_bound(dp,dp+n,inf) - dp);
	for(int i:G[u]){
		if(i!=p){
			dfs(i,u);
		}
	}
	//undo
	dp[ind] = cnt;
}
int main(){
	cin>>n;
	for(int i=0;i<n;i++){
		cin>>a[i];
	}
	for(int i=0;i<n-1;i++){
		int t1,t2;
		cin>>t1>>t2;
		t1--,t2--;
		G[t1].push_back(t2);
		G[t2].push_back(t1);
	}
	fill(dp,dp+n+2,inf);
	dfs(0,-1);
	for(int i=0;i<n;i++) cout<<ans[i]<<endl;
	return 0;
}
```







