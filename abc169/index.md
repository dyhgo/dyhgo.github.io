# abc169



由于事情太多，拖了这么久

# [A - Multiplication 1](https://atcoder.jp/contests/abc169/tasks/abc169_a)

## 题意

输入两个数，求积

## 题解

```python
n,m = map(int,input().split())
print(n*m)
```

# [B - Multiplication 2](https://atcoder.jp/contests/abc169/tasks/abc169_b)

## 题意

输入很多大数，求积是否超过1e18

## 题解

用 __int128 ，  样例有个情况是前面超过1e18但后面有0

所以遍历一遍数组判断是否有0


```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using INT = __int128;
ll a[100005];
int main(){
	ll n;
	cin>>n;
	INT ans = 1;
	bool flag = true;
	for(ll i=0;i<n;i++){
		cin>>a[i];
		if(!a[i]) flag = false;
	}
	if(!flag) {
		cout<<0<<endl;
		exit(0);
	}
	for(ll i=0;i<n;i++){
		ll x = a[i];
		ans *= (INT) x;
		if(ans > (INT) 1e18) {
			cout<<-1<<endl;
			exit(0);
		}
	}
	cout<<(ll)ans<<endl;
	return 0;
}
```


# [C - Multiplication 3](https://atcoder.jp/contests/abc169/tasks/abc169_c)

## 题意

输入两个数，求积 。一个数上限 1e15 ，一个数为小于10的正两位小数

## 题解

因为精度问题，先 *100 再 /100

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
int main(){
	ll a,b,c;
	scanf("%lld %lld.%lld",&a,&b,&c);
	ll ans = a*(b*100+c) ;
	ans /= 100LL;
	cout<<ans<<endl;
	return 0;
}
```

# [D - Div Game](https://atcoder.jp/contests/abc169/tasks/abc169_d)

## 题意

看题目

## 题解

根据唯一分解定理分解，得到质因子和每种质因子的个数

要求次数最多，对于每种质因子，取1次方，2次方，3次方。。。

有个WA点，当无法整除时，ans+1（本身的质数）

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
map<ll,ll> mp;
bool isprime(ll n){
	if(n==1) return false;
	for(ll i=2;i*i<=n;i++){
		if(n%i==0){
			return false;
		}
	}
	return true;
}
int main(){
	ll n;
	cin>>n;
	ll nn = n;
	for(ll i=2;i*i<=nn;i++){
		while(n%i==0){
			n/=i;
			mp[i]++;
		}
	}
	//cout<<mp[2]<<mp[5];
	ll ans = 0;
	for(auto i:mp){
		//cout<<i.first<<" "<<i.second<<endl;
		ll tmp = i.second;
		ll cnt = 0;
		ll ct = 1;
		while(cnt<=tmp){
			cnt += ct++; 
		}
		ct -= 2;
		ans += ct;
	}
	if(isprime(n)) ans++;  //wa点 做不下去时要判断是不是质数 如果是质数那么z可以等于这个数 即答案+1 
	cout<<ans<<endl;
	return 0;
}
```

# [E - Count Median](https://atcoder.jp/contests/abc169/tasks/abc169_e)

## 题意
给  n 个区间，可以在每个区间中选一个数，这样就有 n 个数，对这n个数求中位数，问所有方案中，中位数有几种

## 题解

数学题

求最小的可能中位数和最大的可能中位数，在此之间的所有数都能取到

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll a[200005],b[200005];
int main(){
	ll n;
	cin>>n;
	for(ll i=0;i<n;i++){
		scanf("%lld%lld",&a[i],&b[i]);
	}
	sort(a,a+n);
	sort(b,b+n);
	ll low ,hi;
	if(n&1){
		low = a[(n-1)/2];
		hi = b[(n-1)/2];
	}else{
		low = a[(n-2)/2] + a[(n-2)/2+1] ;
		hi = b[(n-2)/2] + b[(n-2)/2+1];
	}
	cout<<hi-low+1<<endl;
	return 0;
}
```

# [F - Knapsack for All Subsets](https://atcoder.jp/contests/abc169/tasks/abc169_f)

## 题意

给一堆数，和一个数s

对于这堆数形成的集合，对于它的每个子集

如果该子集中有一个子集的数和为s，计数器加1

求计数器的值

## 题解



计数dp题

可以考虑其中一种方案是 `i` 个数加起来等于 `s`

那么容纳它的所有集合都满足条件

所以计数器加 ` i*2^(n-i)`

要求一堆数中，哪些数加起来能等于s就类似于背包问题

所以考虑dp

`dp[i][j]` 表示前 `i` 个数和为 `j` 的答案

对于当前数，可以选择，也可以不选

转移方程

`dp[i][j] = dp[i-1][j] + dp[i-1][j-a[i]]` 

根据上面的结论加上dp表示的是答案，所以每多选一个数，就会在前一个的基础上 `/2`

所以真正的转移方程为

`dp[i][j] = dp[i-1][j] + ( dp[i-1][j-a[i]]  ) / 2`

这样初始条件就是

`dp[0][0] = 2^n`   


```cpp
#include<bits/stdc++.h>
using namespace std;
using ll  = long long;
ll dp[3005][3005];
ll n,s;
ll a[3005];
const ll mod = 998244353;
ll qpow(ll a, ll b, ll m){
	if(b == 0)
		return 1;
	else if(b % 2 == 1)
		return a * qpow(a, b - 1, m) % m;
	else{
		ll num = qpow(a, b/2, m) % m;	
		return num * num % m;
	}
}
const ll inv2 = (mod+1) / 2;
int main(){
	cin>>n;
	cin>>s;
	for(ll i=1;i<=n;i++) cin>>a[i];
	
	dp[0][0] = qpow(2,n,mod);
	for(int i=1;i<=n;i++){
		for(int j=0;j<=s;j++){
			(dp[i][j] += dp[i-1][j]) %= mod;
			if(j>=a[i]) {
				(dp[i][j] += dp[i-1][j-a[i]] * inv2) %= mod;
			}
		}
	}
	cout<<dp[n][s]%mod<<endl;
	return 0;
}
```




