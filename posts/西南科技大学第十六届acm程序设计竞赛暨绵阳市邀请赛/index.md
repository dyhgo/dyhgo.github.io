# 西南科技大学第十六届ACM程序设计竞赛暨绵阳市邀请赛




挺好的比赛

# [A-找规律](https://ac.nowcoder.com/acm/contest/6037/A)

## 题解

玄学题，打表找规律或者猜测规则是每次洗牌是将一个位置移动到另一个固定位置

13次洗牌之后所有的位置都占过一遍，所以13次是循环

要求洗牌5次的结果就是求9次两次洗牌的结果

```cpp
#include<bits/stdc++.h>
using namespace std;
string s[30];
string t[30];
int a[30];
void init_a(){
	for(int i=0;i<13;i++){
		for(int j=0;j<13;j++){
			if(s[i] == t[j]){
				a[i] = j;
				break;
			}
		}
	}
}
void sol(){
	for(int i=0;i<13;i++){
		t[a[i]] = s[i];
	}
	for(int i=0;i<13;i++){
		s[i] = t[i];
	}
}
int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);
	while(cin>>s[0]){
		for(int i=1;i<13;i++) cin>>s[i]; 
		for(int i=0;i<13;i++) cin>>t[i]; 
		init_a();
		for(int i=0;i<9;i++) sol();
		for(int i=0;i<13;i++) cout<<s[i]<<" "; cout<<endl;
		//cout<<"end"<<endl;
	}
	return 0;
}
```

# [B-签到题](https://ac.nowcoder.com/acm/contest/6037/B)

## 题解
排列组合

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 1e9+9;
ll fac[100005];
ll inv[100005];
ll C(ll n,ll m){
	return fac[n]*inv[m]%mod*inv[n-m]%mod;
}
ll A(ll n,ll m){
	return fac[n]*inv[n-m]%mod;
}
int main(){
	fac[0] = 1;
	fac[1] = 1;
	for(ll i=2;i<100005;i++){
		fac[i] = i * fac[i-1];
		fac[i] %= mod;
	}
	inv[0] = 1;
	inv[1] = 1;      //inv[0]=1 !!! 
    for(ll i=2;i<=100005;i++){
        inv[i] = (mod-mod/i)*inv[mod%i]%mod;
    }
    for(ll i=2;i<=100005;i++){
        inv[i] = (inv[i]*inv[i-1])%mod;
    }
    ll n;
    while(cin>>n){
        cout<<n*C(n,2)%mod*A(n-1,n-2)%mod<<endl;
    }
    return 0;
}
```


# [C-救救AR](https://ac.nowcoder.com/acm/contest/6037/C)

## 题意

找规律

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    int n;
    cin>>n;
    if(n==1 or n==2 or n==3){
        cout<<-1<<endl;
    }
    else{
       if(n&1){
           cout<<"ARA";
           for(int i=0;i<n/2;i++){
               cout<<"R";
           }
           cout<<endl;
       }
        else{
            cout<<"AA";
            for(int i=0;i<n/2;i++) cout<<"R";
            cout<<endl;
        }
        
    }
    return 0;
}
```


# [D-ar采蘑菇](https://ac.nowcoder.com/acm/contest/6037/D)

## 题解

状态压缩dp

```cpp
#include<iostream>
#include<cstring>
using namespace std;
using ll = long long;
int r[7],u[7];
int dp[105][105][35];
int main(){
	int t;
	cin>>t;
	int n,m,k;
	while(t--){
		memset(r,0,sizeof(r));
		memset(u,0,sizeof(u));
		memset(dp,0,sizeof(dp));
		cin>>n>>m>>k;
        for(int i=0;i<k;i++){
		string s;
		cin>>s;
		for(int j=0;j<s.length();j++){
			if(s[j] == 'R') r[i]++; else u[i]++;
		}
	}
	dp[0][0][0] = 1;
	for(int i=0;i<=n;i++){
		for(int j=0;j<=m;j++){
			for(int st=0;st<(1<<k);st++){
				for(int q=0;q<k;q++){
					int nn = i - r[q];
					int mm = j - u[q];
					if(nn<0 or nn>n or mm<0 or mm>m) continue;
					if(st>>q&1){
						dp[i][j][st] |= dp[nn][mm][st];
						dp[i][j][st] |= dp[nn][mm][st^(1<<q)];
					}
				}
			}
		}
	}
	int ans = 0;  //等于0就ac,-1wa
	for(int i=0;i<(1<<k);i++){
		if(dp[n][m][i]){
			ans = max(ans , __builtin_popcount(i));
		}
	}
	cout<<ans<<endl;
	
	
	
	}
	
	return 0;
	

}
```

#  [E-呼兰河传](https://ac.nowcoder.com/acm/contest/6037/E)

## 题解
最大的lcm为全选取

经典的大数求lcm

暴力超时，且除以gcd无法取模

由于题目的数据规模可以去重

对于每一个因数，求这些数对于它幂次方贡献的最大值

最后遍历所有因数，对于最大贡献求积

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 1e9+9;
ll pn[100005];
set<ll> st;
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
void did(ll x){
	for(ll i=2;i*i<=x;i++){
		if(x%i==0){
			ll num = 0;
			while(x%i==0){
				x /= i;
				num++;
			}
			pn[i] = max(pn[i] , num);
		}
	}
	if(x != 1){
		pn[x] = max(pn[x] , 1LL);
	}
}
int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);
	ll n;
	cin>>n;
	for(ll i=0;i<n;i++){
		ll x;
		cin>>x;
		st.insert(x);
	}
	for(ll i:st){
		did(i);
	}
	ll ans = 1;
	for(ll i=2;i<=1e5+2;i++){
		ans *= qpow(i,pn[i]);
		ans %= mod;
	}
	cout<<ans<<endl;
	return 0;
}
```


# [F-月出皎兮，佼人僚兮。](https://ac.nowcoder.com/acm/contest/6037/F)

## 题解


对于某一节点u，设子树颜色数最大是 p，颜色总数是sum，如果p*2 > sum

最大匹配数是sum - p，否则都能匹配 sum/2

所以只要求子树颜色最多的数量

暴力dfs超时，所以用树上启发式合并

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll maxn = 2e5+3;
struct edge{
	int to,nxt;
}e[maxn<<1];
ll sz[maxn],par[maxn],c[maxn],num[maxn],head[maxn],wch[maxn],tot[maxn],ans[maxn];
ll n;
ll cnt;
ll tmax;
ll sum;

void add_edge(ll u,ll v){
	e[++cnt].to = v;
	e[cnt].nxt = head[u];
	head[u] = cnt;
}

void dfs(ll u,ll p){
	sz[u] = 1;
	for(ll i=head[u]; i ;i=e[i].nxt){
		ll t = e[i].to;
		if(t != p){
			dfs(t,u);
			sz[u] += sz[t];
			if(sz[t] > sz[wch[u]]) wch[u] = t;
		}
	}
	
}

void cal(ll u,ll p,ll wch,ll val){
	tot[c[u]] += val * num[u];
	sum += val * num[u];
	tmax = max(tmax , tot[c[u]]);
	for(ll i=head[u]; i ; i=e[i].nxt){
		ll t = e[i].to;
		if(t != p and t != wch){
			cal(t,u,wch,val);
		}
	}
}


void dsu(ll u,ll p,ll kp){
	for(ll i=head[u]; i ; i=e[i].nxt){
		ll t = e[i].to;
		if(t != p and t != wch[u]){
			dsu(t,u,0);
		}
	}
	
	if(wch[u]) dsu(wch[u],u,1);
	
	cal(u,p,wch[u],1);
	
	if(2*tmax > sum) ans[u] = sum - tmax;
	else ans[u] = sum / 2; 
	
	if(!kp) {
		cal(u,p,0,-1);
		tmax = 0;
		sum = 0;
	}
}

int main(){
	cin>>n;
	for(ll i=0;i<n-1;i++){
		ll x,y;
		cin>>x>>y;
		add_edge(x,y); add_edge(y,x);
	}
	for(ll i=1;i<=n;i++){
		ll x,y;
		cin>>x>>y;
		c[i] = x;
		num[i] = y;
	}
	dfs(1,0);
	dsu(1,0,1);
	for(int i=1;i<=n;i++){
		cout<<ans[i]<<endl;
	} 
	return 0;
}
```

# [G-寻找未曾见过的你](https://ac.nowcoder.com/acm/contest/6037/G)

## 题解

不会

# [H-AR的背包](https://ac.nowcoder.com/acm/contest/6037/H)

## 题解

不会
