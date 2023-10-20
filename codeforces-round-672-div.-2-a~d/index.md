# Codeforces Round #672 (Div. 2) A~D


## [A. Cubes Sorting](https://codeforces.com/contest/1420/problem/A)

### 题意

对于一个数列，每次操作交换相邻的两个数，问是否需要达到n(n-1)/2次操作才可以让数列递增

### 题解

判断数列是否严格单调递减

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int main() {
    int _;
    cin >> _;
    while (_--) {
        vector<int> vt;
        int n;
        cin >> n;
        for(int i = 0; i < n; ++i){
            int u;
            cin >> u;
            vt.push_back(u);
        }
        bool ok = false;
        for(int i = 0; i < n - 1; i ++){
            if(vt[i] > vt[i + 1]) continue;
            else {
                ok = true;
                break;
            }
        }
        if(ok) puts("YES"); else puts("NO");
     }
    return 0;
}
```

## [B. Rock and Lever](https://codeforces.com/contest/1420/problem/B)

### 题意
给一数列，判断有多少对数满足 x & y >= x ^ y

### 题解

根据位运算的定义，两个数的最高位（1）互相对齐就行，即二进制位数相等

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int main() {
    ll _;
    cin >> _;
    while (_--) {
        ll n;
        cin >> n;
        map<ll, ll> mp;
        for(ll i = 0; i < n; ++i){
            ll u;
            cin >> u;
            ll v = u;
            ll tmp = 0;
            while(v != 0){
                v >>= 1;
                tmp++;
            }
            mp[tmp]++;
        }
        ll ans = 0;
        for(auto i : mp){
            ans += i.second * (i.second - 1) / 2;
        }
        cout << ans << endl;
    }
    return 0;
}
```

## [C1. Pokémon Army (easy version)](https://codeforces.com/contest/1420/problem/C1)

### 题意

对于一个数列，选择一些数，按顺序执行加减交替操作，求可得到的最大值（第一个是加）

### 题解

dp

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
ll dp[300005][2];
ll a[300005];
int main() {
    ll _;
    cin >> _;
    while (_--) {
        memset(dp, 0, sizeof(dp));
        ll n, q;
        cin >> n >> q;
        for(ll i = 1; i <= n; ++i){
            cin >> a[i];
        }
        dp[1][0] = a[1];
        dp[1][1] = 0;
        for(ll i = 2; i <= n; ++i){
            dp[i][0] = max(dp[i-1][0], dp[i-1][1] + a[i]);
            dp[i][1] = max(dp[i-1][1], dp[i-1][0] - a[i]);
        }
        cout << max(dp[n][0], dp[n][1]) << endl;
    }
    return 0;
}
```


## [C2. Pokémon Army (hard version)](https://codeforces.com/contest/1420/problem/C2)

### 题意

在C1的基础上，增加q次操作，每次操作交换两个位置的数值，每次操作询问可得到的最大值

### 题解

对于数列中的数值大小，波峰一定是加操作，波谷一定是减操作，对于每次的交换操作，

先消去这两个数（和它左右两个数）的影响，因为左右两个数决定了它是波峰还是波谷还是其他，交换后的数可能会影响原来左右的两个数

再加上交换数值后的影响（即该点和左右是否是波峰、波谷）

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
const int maxn = 300005;
ll a[maxn];
int pos[maxn];
int n, q;
ll ans;
void init(){
    a[0] = a[n + 1] = 0;
    pos[0] = pos[n + 1] = -1;
    for(int i = 1; i <= n; ++i){
        if(a[i] > a[i - 1] and a[i] > a[i + 1]) {
            pos[i] = 1;
            ans += a[i];
        }else if(a[i] < a[i - 1] and a[i] < a[i + 1]){
            pos[i] = -1;
            ans -= a[i];
        }else{
            pos[i] = 0;
        }
    }
}

void did(int x){
    if(x <= 0 or x > n) return;
    if(pos[x] == 1){
        pos[x] = 0;
        ans -= a[x];
    }else if(pos[x] == -1){
        pos[x] = 0;
        ans += a[x];
    }
}

void update(int x){
    if(x <= 0 or x > n) return ;
    if(pos[x] == 0 and a[x] > a[x + 1] and a[x] > a[x - 1]) {
        pos[x] = 1;
        ans += a[x];
    }else if(pos[x] == 0 and a[x] < a[x + 1] and a[x] < a[x - 1]){
        pos[x] = -1;
        ans -= a[x];
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int _;
    cin >> _;
    while (_--) {
        ans = 0;
        cin >> n >> q;
        for(int i = 1; i <= n; ++i) cin >> a[i];
        init();
        cout << ans << endl;
        while(q--){
            int l, r;
            cin >> l >> r;
            did(l); did(l - 1); did(l + 1); did(r); did(r - 1); did(r + 1);
            swap(a[l], a[r]);
            update(l); update(l - 1); update(l + 1); update(r); update(r - 1); update(r + 1);
            cout << ans << endl;
        }
    }
    return 0;
}
```

## [D. Rescue Nibel!](https://codeforces.com/contest/1420/problem/D)

### 题意

有n盏灯，每盏灯有打开的时间和关闭的时间l，r，选择其中k盏，满足存在某一时刻这k盏灯同时亮，求选择方案数

### 题解

离散化，枚举每个时间点，查看有多少盏灯之前就亮着，多少盏灯加入到亮的行列，排列组合


```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
const ll mod = 998244353;
ll n, k;
ll ans;
set<ll> L;
unordered_map<ll, vector<ll> > R;
priority_queue<ll, vector<ll>, greater<> > pq;
const ll maxn = 300005;
ll inv[maxn];
ll fac[maxn];
ll cnt;
ll tmp;
inline ll C(ll m,ll n){
    return fac[n]*inv[m]%mod*inv[n-m]%mod;
}
inline ll A(ll m,ll n){
    return fac[n]*inv[n-m]%mod;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    for(ll i=0;i<maxn;i++){
        fac[i]=1;
    }
    for(ll i=2;i<maxn;i++){
        fac[i]=(fac[i-1]*i)%mod;
    }

    inv[0]=1;inv[1]=1;      //inv[0]=1 !!!
    for(ll i=2;i<maxn;i++){
        inv[i]=(mod-mod/i)*inv[mod%i]%mod;
    }
    for(ll i=2;i<maxn;i++){
        inv[i]=(inv[i]*inv[i-1])%mod;
    }


    cin >> n >> k;
    for(int i = 0; i < n; ++i){
        ll l, r;
        cin >> l >> r;
        R[l].push_back(r);
        L.insert(l);
    }

    for(auto i : L){
        tmp = 0;
        cnt = pq.size();
       while(!pq.empty()){
           if(pq.top() < i){
               pq.pop();
               cnt--;
           }else break;
       }
       for(auto j : R[i]){
           pq.push(j);
           tmp++;
       }
       if(tmp + cnt < k) continue;
       for(ll e = 1; e <= min(k, tmp); ++e){
           if(tmp >= e and cnt >= k - e) ans += C(e, tmp) * C(k - e, cnt) % mod;
       }
    }
    cout << ans % mod << endl;
    return 0;
}
```


