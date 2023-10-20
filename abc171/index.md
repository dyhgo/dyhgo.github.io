# abc171


# [A - αlphabet](https://atcoder.jp/contests/abc171/tasks/abc171_a)

## 题意

看题目

## 题解

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	char a;
	cin>>a;
	if(isupper(a)) cout<<'A';else cout<<'a';
	return 0;
}
```

# [B - Mix Juice](https://atcoder.jp/contests/abc171/tasks/abc171_b)

## 题意

看题目

## 题解

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	int n,k;
	cin>>n>>k;
	int a[n];
	for(int i=0;i<n;i++) cin>>a[i];
	sort(a,a+n);
	int ans = 0;
	for(int i=0;i<k;i++) ans+=a[i];
	cout<<ans<<endl;
	return 0;
}
```

# [C - One Quadrillion and One Dalmatians](https://atcoder.jp/contests/abc171/tasks/abc171_c)

## 题意

类似于十进制转26进制

不同的是27是 aa

## 题解

这个题目没有像正常的转化那样进位

所以对每一位求值前先减1

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
int main(){
	ll a;
	cin>>a;
	string s = "";
	//a--;
	while(a!=0){
		a--;
		s += (a%26) + 'a';
		a /= 26;
	}
	reverse(s.begin(),s.end());
	cout<<s<<endl;
    return 0;
}
```

# [D - Replacing](https://atcoder.jp/contests/abc171/tasks/abc171_d)

## 题意

看题目

## 题解

模拟

```cpp
#include<bits/stdc++.h>
using namespace std;
long long a[100005];
int main(){
    long long n;
    cin>>n;
    long long sum = 0;
    for(long long i=0;i<n;i++) {
    	long long x;
    	cin>>x;
    	a[x]++;
    	sum+=x;
	}
	long long q;
	cin>>q;
	for(long long i=0;i<q;i++){
		long long t,y;
		cin>>t>>y;
		sum+=((y-t)*a[t]);
		
		cout<<sum<<endl;
		a[y]+=a[t];
		a[t] = 0;
		
	}
    return 0;
}
```

# [E - Red Scarf ](https://atcoder.jp/contests/abc171/tasks/abc171_e)

## 题意

对于一个数列，第一个位置的值是原数列其他位置的异或，依此类推

还原数列

## 题解

利用异或性质

```cpp
#include<bits/stdc++.h>
using namespace std;
int a[200005];
int main()
{
	int n;
	cin>>n;
	int ans = 0;
	for(int i=0;i<n;i++){
		cin>>a[i];
		ans ^= a[i];
	}
	for(int i=0;i<n;i++){
		cout<<(ans^a[i])<<" ";
	}cout<<endl;
	return 0;
}
```

# [F - Strivore](https://atcoder.jp/contests/abc171/tasks/abc171_f)

## 题意

看题目

## 题解

把问题转化成满足长度为n的，包含子序列s的字符串有几个

然后就变成排列组合题

考虑所有情况减去不包含子序列s的字符串

不含子序列s的字符串可以这样构造

目标串T可以包含子序列中的1个，2个，3个。。。s.length() - 1个

这样取子序列只能是前几个，因为取s的中间部分就一定不满足条件

对于其中一种情况，举个例子

s = " acf"  总长度为8

假设从s中选两个，那这两个就一定是 a c

假设它们被安排在这样的位置

12a45c78

那么1号和2号一定不能选到a，4号和5号一定不能选到c，7号和8号一定不能选到f

这样T就一定没有子序列s

对于除ac外的位置都有25种选择

所以这种情况（选两个）就有

$$
C_{8}^{2} * 25^6
$$

种方案

所以对于所有情况(n是T的长度，s是子序列的长度)，方案数

$$
26^{n} - \sum\limits_{i=0}  ^ {s-1} {C_n^i*25^{n-i}}
$$

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 1e9+7;
ll fac[2000005];
ll qpow(ll x,ll n)
{
    ll res =1;
    while(n>0)
    {
        if(n&1) res=res*x%mod;
        x=x*x%mod;
        n>>=1;
    }
    return res;
}
ll C(ll n,ll m){
	return fac[n]*qpow(fac[m] , mod-2)%mod*qpow(fac[n-m] , mod-2)%mod;
}
int main(){
	fac[0] = 1;
	fac[1] = 1;
	for(ll i=2;i<2000002;i++){
		fac[i] = i * fac[i-1];
		fac[i] %= mod;
	}
	ll k;
	cin>>k;
	string ss;
	cin>>ss;
	ll s = ss.size();
	ll ans = 0;
	for(ll i=0;i<s;i++){
		ans += C(k+s , i) * qpow(25 , k+s-i);
		ans %= mod;
	}
	cout<<(qpow(26 , k+s) - ans + mod) % mod<<endl;
	return 0;
}
```


如果用逆元

```cpp
inline ll C(ll m,ll n){
    return fac[n]*inv[m]%mod*inv[n-m]%mod;
}

inv[0]=1;inv[1]=1;      //inv[0]=1 !!! 
    for(ll i=2;i<=n;i++){
        inv[i]=(mod-mod/i)*inv[mod%i]%mod;
    }
    for(ll i=2;i<=n;i++){
        inv[i]=(inv[i]*inv[i-1])%mod;
    }
```

