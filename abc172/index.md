# abc172



# [A - Calc](https://atcoder.jp/contests/abc172/tasks/abc172_a)


## 题意

看题目

## 题解

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
int main(){
	int a;
	cin>>a;
	cout<<a+a*a+a*a*a<<endl;
	return 0;
}
```

# [B - Minor Change](https://atcoder.jp/contests/abc172/tasks/abc172_b)

## 题意

看题目

## 题解

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
int main(){
	string s,t;
	cin>>s>>t;
	int ans = 0;
	for(int i=0;i<s.length();i++){
		if(s[i]!=t[i])ans++;
	}
	cout<<ans<<endl;
	return 0;
}
```

# [C - Tsundoku](https://atcoder.jp/contests/abc172/tasks/abc172_c)

## 题意

看题目

## 题解

前缀和+双指针

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll a[200005];
ll b[200005];
int main(){
	ll n,m,k;
	cin>>n>>m>>k;
	a[0] = 0;
	b[0] = 0;
	for(ll i=1;i<=n;i++){
		ll tmp;
		cin>>tmp;
		a[i] = a[i-1] + tmp;
	}
	for(ll j=1;j<=m;j++){
		ll tmp;
		cin>>tmp;
		b[j] = b[j-1] + tmp;
	}
	ll ans = 0;
	ll j = m;
	ll i;
	for(i=0;i<=n;i++){
		while(a[i] + b[j] > k and j>=0){
			j--;
		}
		if(a[i] + b[j] <= k) {
			ans = max(ans , i+j);
			//cerr<<j<<endl;
		}
	}
	
	cout<<ans<<endl;
	return 0;
}
```

# [D - Sum of Divisors](https://atcoder.jp/contests/abc172/tasks/abc172_d)

## 题意

看题目

## 题解

筛法预处理因子个数，O(1)查询

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll n;
ll num[10000005];
void init(){
	for(ll i=1;i<=10000005;i++){
		for(ll x=i;x<10000005;x+=i){
			num[x]++;
		}
	}
}
int main(){
	init();
	cin>>n;
	ll ans = 0;
	
	for(ll i=1;i<=n;i++){
		ans += i*num[i];
	}
	cout<<ans<<endl;
	return 0;
}
```

# [E - NEQ](https://atcoder.jp/contests/abc172/tasks/abc172_e)

## 题意

看题目

## 题解

对于从M个选N个全排列的每一种方案都有对应的若干个情况，它们都是等价的

比如M=4 N=3 ，对于全排列的一种方案 123

与之对应的有第一个数字不能为1、第二个数字不能为2，第三个数字不能为3

第一个数字和第二个数字不能同时为12，第二个和第三个数字不能同时为23，第一个和第三个数字不能同时为13

第一个第二个第三个数字不能同时为123

这样就是基于容斥原理的排列组合

总的方案数是

$$
A_{M}^{N}*\sum\limits_{i=0}  ^ {n} {C_{N}^{i}A_{M-i}^{N-i}(-1)^n}
$$

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll n;
ll m;
const ll mod = 1e9+7;
const ll maxn = 500005;
ll inv[maxn+3];
ll fac[maxn+3];

inline ll A(ll n,ll m){
    return fac[n]*inv[n-m]%mod;
}
inline ll C(ll n,ll m){
	return A(n,m)*inv[m]%mod;
}

int main(){
	cin>>n>>m;
	fac[0] = 1;
	fac[1] = 1;
	for(ll i=2;i<maxn;i++){
		fac[i] = i * fac[i-1];
		fac[i] %= mod;
	}
	inv[0]=1;inv[1]=1;      //inv[0]=1 !!! 
    for(ll i=2;i<=maxn;i++){
        inv[i]=(mod-mod/i)*inv[mod%i]%mod;
    }
    for(ll i=2;i<=maxn;i++){
        inv[i]=(inv[i]*inv[i-1])%mod;
    }
    ll ans =0;
    for(ll i=0;i<=n;i++){
    	ll tmp = C(n,i) * A(m-i,n-i);
    	tmp %= mod;
    	if(i%2==0){
    		ans += tmp;
		}else ans -= tmp;
		ans += mod;
		ans %= mod;
	}
	ans *= A(m,n);
	ans += mod;
	ans %= mod;
	cout<<ans<<endl;
	//cout<<tmp<<endl;
	return 0;
}
```





# [F - Unfair Nim](https://atcoder.jp/contests/abc172/tasks/abc172_f)

## 题意

看题目

## 题解

[题解url](https://img.atcoder.jp/abc172/editorial.pdf)

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
int main(){
	ll n;
	cin>>n;
	ll q,w;
	cin>>q>>w;
	ll x = 0;
	for(ll i=2;i<n;i++){
		ll tmp;
		cin>>tmp;
		x ^= tmp;
	}
	ll d = (q+w-x)  / 2;
	if(d<0 or d>q or (d&x) or (q+w-x)%2==1){
		cout<<-1<<endl;
		exit(0);
	}
	for(ll i=45;i>=0;i--){
		if(x>>i&1LL){
			if(d+(1LL<<i) <= q){
				d += (1LL<<i);
			}
		}
	}
	if(d==0) cout<<-1<<endl;
	else cout<<q-d<<endl;
	return 0;
}
```

