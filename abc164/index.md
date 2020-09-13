# abc164



# [A - Sheep and Wolves](https://atcoder.jp/contests/abc164/tasks/abc164_a)

## 题意
判断两个数的大小

## 题解

ac代码

```python
n,m = map(int,input().split())
if n>m:
    print('safe')
else :
    print('unsafe')
```

# [B - Battle](https://atcoder.jp/contests/abc164/tasks/abc164_b)

## 题意

给定两个人的生命值和攻击力，两个人回合制battle，谁的生命值先小于等于0

## 题解

模拟

ac代码

```python
a,b,c,d = map(int,input().split())
while a>0 and c>0:
    c=c-b
    if c<=0:
        break
    a=a-d
    if a<=0:
        break
if a<=0:
    print('No')
else:
    print('Yes')
```

# [C - gacha](https://atcoder.jp/contests/abc164/tasks/abc164_c)


## 题意

给一堆字符串，求有多少种

## 题解

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	int n;
	set<string> st;
	cin>>n;
	string s;
	while(n--){
		cin>>s;
		st.insert(s);
	}
	cout<<st.size()<<endl;
	return 0;
}
```


# [D - Multiple of 2019](https://atcoder.jp/contests/abc164/tasks/abc164_d)

## 题意

给一数字串，求多少个连续子串组成的数字是2019的倍数

## 题解

后缀，和abc158E几乎一致



```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	string s;
	int a[2020]={0};
	cin>>s;
	int ans = 0;
	int t = 1;
	int cnt = 0;
	a[0]++;
	for(int i=s.length()-1;~i;i--){
		cnt = (cnt+t*(s[i]-'0'))%2019;
		ans+=(a[cnt]++);
		t=(t*10)%2019;
	}
	cout<<ans<<endl;
	return 0;
}
```

# [E - Two Currencies](https://atcoder.jp/contests/abc164/tasks/abc164_e)

## 题意
有n个城市，m条路（无向），每条路有两个属性（通过这条路要花费的时间和金

钱），每个城市有两个属性（可以花费时间购买金钱），给初始的金钱数量，求

从1城市到每个城市花费的最少时间

## 题解

dijkstra算法的变形

把时间当做最短路

当金钱超过最大值时，就不需要考虑是否在每个城市购买金钱

套一个dijkstra算法板子，加上对每个城市是否购买金币的判断

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using tp = tuple<ll,ll,ll>;
ll n,m,s;
ll a,b; 
ll c[55],d[55];       //存获得的银币和消耗的时间 
ll dp[55][2505];            //到达i时还有j银币的最小时间 
vector<tp> G[55];          //目标点 a b 
tp info;              //时间 目标点 当前的钱 
const ll inf = 0x3f3f3f3f3f3f3f3f;
int main(){
	cin>>n>>m>>s;
	s = min(s,2504LL);
	for(ll i=0;i<m;i++){
		ll ta,tb,tc,td;
		cin>>ta>>tb>>tc>>td;
		G[ta].push_back(tp(tb,tc,td));
		G[tb].push_back(tp(ta,tc,td));	 
	}
	for(ll i=1;i<=n;i++){
		ll tc,td;
		cin>>tc>>td;
		c[i] = tc;
		d[i] = td;
	}
	fill(dp[0] , dp[0] + 54*2504 , inf);
	dp[1][s] = 0;
	priority_queue<tp,vector<tp>,greater<tp>> pq;
	pq.push(tp(0,1,s));
	while(!pq.empty()){
		info = pq.top();
		pq.pop();
		ll t = get<0>(info) , u = get<1>(info) , w = get<2>(info);
		if(dp[u][w] > t) continue;
		for(auto i:G[u]){
			ll v = get<0>(i) , aa = get<1>(i) , bb = get<2>(i);
			if(w>=aa and dp[v][w-aa] > t + bb){
				dp[v][w-aa] = t + bb;
				pq.push(tp(t+bb , v , w-aa));
			}
		}
		if(dp[u][min(w + c[u] , 2504LL)] > t + d[u]){
			dp[u][min(w + c[u] , 2504LL)] = t + d[u];
			pq.push(tp(t + d[u] , u , min(w + c[u] , 2504LL)));
		}
		
	
	}	
	
	for(ll i=2;i<=n;i++){
			ll ans = inf;
			for(ll j=0;j<2504;j++){
				ans = min(ans , dp[i][j]);
			}
			cout<<ans<<endl;
		}
	
	return 0;
}
```


# [F - I hate Matrix Construction](https://atcoder.jp/contests/abc164/tasks/abc164_f)

似乎是位运算的构造。。。🤔
