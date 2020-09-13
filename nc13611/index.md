# NC13611




#### 题目描述 

shy有一颗树，树有n个结点。有k种不同颜色的染料给树染色。一个染色方案是合法的，当且仅当对于所有相同颜色的点对(x,y)，x到y的路径上的所有点的颜色都要与x和y相同。请统计方案数。

#### 输入描述:


第一行两个整数n，k代表点数和颜色数；
接下来n-1行，每行两个整数x,y表示x与y之间存在一条边；

#### 输出描述:

输出一个整数表示方案数（mod 1e9+7）。

#### sample input

4 3
1 2
2 3
2 4

#### sample output

39

#### solution

动态规划

`dp[i][j]`  表示现在在第 `i` 个点，用 `j` 中颜色染色的方案数

那么对于下一个点有两种情况

1.染同一种颜色 `dp[i][j]=dp[i-1][j]`

2.染不同颜色 `dp[i][j]+=dp[i-1][j-1]*(k-j+1)`

最后对所有的 `dp[n][i] 1<=i<=k ` 求和

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll=long long;
ll n,k;
ll dp[305][305];
const ll mod = 1e9+7;
int main(){
	cin>>n>>k;
	dp[0][0]=1;
	for(int i=1;i<=n;i++)
	for(int j=1;j<=k;j++){
		dp[i][j]=(dp[i-1][j]+dp[i-1][j-1]*(k-j+1))%mod;
	}
	ll ans=0;
	for(int i=1;i<=k;i++){
		ans=(ans+dp[n][i])%mod;
	}
	cout<<ans%mod<<endl;
	return 0;
}
```


排列组合

把问题转化成将树分解成不大于 `k` 个连通块的方案数

将树分解成 `i` 个连通块，就要删掉 `i-1` 条边

总共有 


$$\ C_{n-1}^{i-1}$$


种方案

对于每一种方案，染 `i` 中颜色

就有

$$\ A_{k}^{i}$$


种方案

所以一共有

$$
\sum\limits_{i=1}  ^ {min(n,k)} {\ C_{n-1}^{i-1}\ A_{k}^{i}}
$$


然后模拟

逆元法

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll=long long;
ll n,k;
const ll mod = 1e9+7;
ll inv[305];
ll fac[305];
inline ll C(ll m,ll n){
	return fac[n]*inv[m]%mod*inv[n-m]%mod;
}
inline ll A(ll m,ll n){
	return fac[n]*inv[n-m]%mod;
}
int main(){
	cin>>n>>k;
	for(ll i=0;i<=n;i++){
		fac[i]=1;
	}
	for(ll i=2;i<=n;i++){
		fac[i]=(fac[i-1]*i)%mod;
	}
	//for(int i=1;i<=9;i++) cout<<fac[i]<<endl;
	inv[0]=1;inv[1]=1;      //inv[0]=1 !!! 
	for(ll i=2;i<=n;i++){
		inv[i]=(mod-mod/i)*inv[mod%i]%mod;
	}
	for(ll i=2;i<=n;i++){
		inv[i]=(inv[i]*inv[i-1])%mod;
	}
	ll ans=0;
	for(ll i=1;i<=min(n,k);i++){
		ans=(ans+C(i-1,n-1)*A(i,k)%mod)%mod;
	}
	cout<<ans%mod;
	
	return 0;
}
```



快速幂法

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll=long long;
ll n,k;
const ll mod = 1e9+7;
ll fac[305];
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
inline ll cal(ll i){
	return fac[n-1]*fac[k]%mod*qpow(fac[i-1],mod-2)%mod*qpow(fac[n-i],mod-2)%mod*qpow(fac[k-i],mod-2)%mod;
}
int main(){
	cin>>n>>k;
	for(ll i=0;i<=n;i++){ //fac[0]=1!!!
		fac[i]=1;
	}
	for(ll i=2;i<=n;i++){
		fac[i]=(fac[i-1]*i)%mod;
	}
	
	ll ans=0;
	for(ll i=1;i<=min(k,n);i++){
		ans=(ans+cal(i))%mod;
	}
	
	cout<<ans%mod;
	
	return 0;
}
```

