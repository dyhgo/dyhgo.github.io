# 9th hhucpc (Senior)



u1s1,zyyyyy出的题目真的好好，补题的过程学到了好多（好菜啊o(╥﹏╥)o

[题目链接](http://acm.hhu.edu.cn/contest.php?cid=1028)

只贴了代码，题解参考[此处](http://acm.hhu.edu.cn/upload/file/20201130/20201130235312_82051.pdf)

## A

### 签到

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
int main(){
    int n;
    int a[105];
    cin >> n;
    int s, m, b;
    s = m = b = 0;
    for(int i = 0; i < n; ++i){
        double x;
        cin >> x;
        
        if(x == 2 or x == 2.5 or x == 3) s++;
        else if(x == 5 or x == 5.5 or x == 6) m++;
        else b++;
    }
    cout << "Small: " << s << endl << "Medium: " << m << endl << "Big: " << b << endl;
    return 0;

}
```

## B

### 贪心

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
ll a[100005];
ll b[100005];
int main(){
    ll n;
    ll x, y, z;
    cin >> n;
    for(int i = 1; i <= n; ++i) cin >> a[i];
    cin >> x >> y >> z;
    ll mi = 100000000000;
    ll ans = n;
    b[0] = x;
    for(int i = 1; i <= n; ++i) b[i] = b[i - 1] + z;
    bool ok = true;
    for(int i = n; i > 0; --i){
        if(b[i] <= a[i]){
            ok = false;
            break;
        }
        if(b[i] - z - y > a[i] and mi > (y + z)){
            ans--;
            b[i] = b[i] - z - y;
            mi = min(b[i] - a[i], mi- y - z);
        }
        mi = min(mi, b[i] - a[i]);
    }
    if(!ok) puts("HHUTQL");
    else cout << ans << endl;
    return 0;

}
```

## C

### 线段树

没板子就不写了  o(╥﹏╥)o

## D

### 状态压缩 / dfs暴搜

```cpp
#include "bits/stdc++.h"
 
using namespace std;
typedef long long ll;
ll n, m, c;
ll w[25];
ll v[25];
vector<pair<ll, ll>> conflict;
ll ind[1005];
 
ll to_ind(ll x){
    return ind[x];
}
 
bool ok(ll x){
    for(auto i : conflict){
        ll l = i.first;
        ll r = i.second;
        if((x >> l & 1) and (x >> r & 1)) return false;
    }
    return true;
}
 
ll cal(ll x){
    ll sumw = 0;
    ll sumv = 0;
    for(ll i = 0; i < n; ++i){
        if(x >> i & 1){
            sumw += w[i];
            sumv += v[i];
            if(sumw > m) return 0;
        }
    }
    return sumv;
}
 
int main() {
 
    ll _;
    cin >> _;
    while (_--) {
        conflict.clear();
        cin >> n >> m >> c;
        for(ll i = 0; i < n; ++i){
            ll x, y, z;
            cin >> x >> y >> z;
            w[i] = y;
            v[i] = z;
            ind[x] = i;
        }
        for(ll i = 0; i < c; ++i){
            ll x, y;
            cin >> x >> y;
            conflict.emplace_back(to_ind(x), to_ind(y));
        }
        ll ans = 0;
        for(ll i = 0; i < (1 << n); ++i){
            if(ok(i)){
                ans = max(ans, cal(i));
            }
        }
        cout << ans << endl;
    }
    return 0;
}
```

## E

### 打表 矩阵快速幂

```cpp
#include "bits/stdc++.h"

using namespace std;
using ll = long long;
const ll mod = 1000000007;
typedef vector<ll> vec;
typedef vector<vector<ll>> mat;
mat mul(mat &A , mat &B){
    mat C(A.size() , vec(B[0].size()));
    for(ll i = 0; i < A.size() ; ++i){
        for(ll k = 0 ; k < B.size() ; ++k){
            for(ll j = 0 ; j < B[0].size() ; ++j){
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod;
            }
        }
    }
    return C;
}

mat pow_mat(mat A , ll n){
    mat B(A.size() , vec(A.size()));
    for(ll i = 0 ; i < A.size() ; ++i){
        B[i][i] = 1;
    }
    while(n > 0){
        if(n & 1) B = mul(B , A);
        A = mul(A , A);
        n >>= 1;
    }
    return B;
}
int main() {

//    ll n = 1;
//    ll ans = 0;
//    vector<ll> vt;
//    vector<ll> tt;
//    for(ll i = 0; i < n; ++i){
//        tt.push_back(i % 3);
//    }
//    for(ll i = 0; i < (1 << n); ++i){
//        vt.clear();
//        for(ll j = 0; j < n; ++j){
//            if(i >> j & 1){
//                vt.push_back(j % 3);
//            }
//        }
//        bool ok = true;
//        for(ll j = 0; j < vt.size(); ++j){
//            if(vt[j] != tt[j]){
//                ok = false;
//                break;
//            }
//        }
//        if(ok) ans++;
//    }
//    cout << ans - 1 << endl;

    ll g1 = 1, g2 = 2, g3 = 3;

    ll _;
    cin >> _;
    while (_--) {
        //此处有md渲染有bug，所以这样写
        mat core = {{1, 0, 1, 1}}, {1, 0, 0, 0}, {0, 1, 0, 0}, {{0, 0, 0, 1}};
        ll n;
        cin >> n;
        if(n <= 3){
            cout << n << endl;
            continue;
        }

        n -= 3;
        core = pow_mat(core, n);
        ll ans = 0;
        ans += core[0][0] * g3;
        ans %= mod;
        ans += core[0][1] * g2;
        ans %= mod;
        ans += core[0][2] * g1;
        ans %= mod;
        ans += core[0][3];
        ans %= mod;
        cout << ans << endl;
    }
    return 0;
}
```

## F

### 分治 01背包 二分 前缀

```cpp
#include "bits/stdc++.h"

using namespace std;
typedef long long ll ;
int n, c;
const int maxn = 1005;
const int maxm = 32007;
int dp1[maxm];
int dp2[maxm];
int n1;
int n2;
int W;
vector<int> w1, v1, w2, v2;
const int limit = (1 << 10);
vector<pair<int, int>> vt1;
vector<int> vt2;
int premax[maxm];
// 1 for big , 2 for small
int main() {


    cin >> n >> c;
    memset(premax, -1, sizeof(premax));
    W = maxm - 3;
    // for test
    w1.push_back(0);
    w2.push_back(0);
    v1.push_back(0);
    v2.push_back(0);
    for(int i = 0; i < n; ++i){
        int x, y;
        cin >> x >> y;
        if(x >= limit){
            ++n1;
            w1.push_back((x >> 10));
            v1.push_back(y);
        }else {
            ++n2;
            w2.push_back(x);
            v2.push_back(y);
        }
    }
    for(int i = 1; i <= n1; ++i)
        for(int j = W; j >= w1[i]; --j)
            dp1[j] = max(dp1[j], dp1[j - w1[i]] + v1[i]);

    for(int i = 1; i <= n2; ++i)
        for(int j = W; j >= w2[i]; --j)
            dp2[j] = max(dp2[j], dp2[j - w2[i]] + v2[i]);


    for(int i = 0; i <= W; ++i){
        vt1.emplace_back((i << 10), dp1[i]);
    }


    premax[0] = dp2[0];
    for(int i = 1; i <= W; ++i){
        premax[i] = max(premax[i - 1], dp2[i]);
    }




    int ans = 0;
    for(int i = 0; i < W; ++i){
        int cnt = vt1[i].first;
        int rem = c - cnt;
        if(rem >= 0 and rem < W) ans = max(ans, vt1[i].second + premax[rem]);
    }

    cout << ans << endl;

    return 0;
}
```


## G

### 图论 dfs

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
int V;
const int maxv = 1e5 + 10;
vector<int> G[maxv];
int od[maxv];
bool ok ;

void dfs(int x, int f, int d){
    for(int i = 0; i < G[x].size(); ++i){
        int to = G[x][i];
        if(to == f) continue;
        if(od[to] != 0){
            if((d + 1 - od[to]) & 1){
                ok = true;
                break;
            }
        }else {
            od[to] = d + 1;
            dfs(to, x, d + 1);
        }
    }
}

int main(){
    int m;
    cin >> V >> m;
    for(int i = 0; i < m; ++i){
        int u, v;
        cin >> u >> v;
        G[u].push_back(v);
        G[v].push_back(u);
    }
    if(m >= V){
        for(int i = 1; i <= V; ++i){
            if(od[i] == 0){
                dfs(i, -1, 1);
                od[i] = 1;
            }
        }
    }else ok = false;

    if(ok) puts("yes"); else puts("NO");
    return 0;
}
```

## H

### 欧拉降幂 快速幂 快速乘

```cpp
#include "bits/stdc++.h"
 
using namespace std;
typedef long long ll ;
inline ll qmul(ll x, ll y, ll mod)
{
    return ( x * y - (ll) ( (long double) x / mod*y )*mod + mod ) % mod;
}
ll qpow(ll x, ll n, ll mod){
    ll res =1;
    while(n>0)
    {
        if(n&1) res=qmul(res, x, mod)%mod;
        x=qmul(x, x, mod)%mod;
        n>>=1;
    }
    return res;
}
ll phi(ll n)
{
    ll res=n;
    for(ll i=2;i*i<=n;i++)
    {
        if(n%i==0)
        {
            res=res/i*(i-1);
            while(n%i==0) n/=i;
        }
    }
    if(n!=1) res=res/n*(n-1);
    return res;
}
char n[100005];
int main() {

    int _;
    cin >> _;
    while (_--) {
        ll ans ;
 
        ll m;
        scanf("%s", n);
        scanf("%lld", &m);
        ll tmpn = 0;
        ll tmp_phi = phi(m);
        ll len = strlen(n);
        if(len <= 16){
            ll tmp_mul = 1;
            for(int i = len - 1; i >= 0; --i){
                tmpn += (n[i] - '0') * tmp_mul;
                tmp_mul *= 10;
            }
                ll tmp_ans = qpow(3, tmpn, m);
                ans = tmp_ans;
                ans -= 2;
                ans += m;
                ans %= m;
 
        }else {
            for(int i = 0; i < len; ++i){
                tmpn = tmpn * 10 + (n[i] - '0');
                tmpn %= tmp_phi;
            }
            tmpn += tmp_phi;
            ll tmp_ans = qpow(3, tmpn, m);
            ans = tmp_ans;
            ans -= 2;
            ans += m;
            ans %= m;
        }
        cout << ans << endl;
    }
    return 0;
}
```


## I

### 二分 贪心

```cpp
#include "bits/stdc++.h"

using namespace std;
typedef long long ll ;
const int maxn = 1e5 + 10;
int a[maxn];
int b[maxn];
int n, m;

bool check(int x){
    int i = 0, j = 0;
    while(i < n and j < m){
        if(abs(a[i] - b[j]) <= x){
            ++i, ++j;
        }else {
            ++j;
        }
    }
    return i == n;
}

int main() {

    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);

    int _;
    cin >> _;
    while (_--) {
        cin >> n >> m;
        for(int i = 0; i < n; ++i){
            cin >> a[i];
        }
        for(int i = 0; i < m; ++i){
            cin >> b[i];
        }
        sort(a, a + n);
        sort(b, b + m);
        int l = 0, r = 5 * 1e8 + 3;
        int mid;
        while (l <= r){
            mid = (l + r) >> 1;
            if(check(mid)){
                r = mid - 1;
            }else {
                l = mid + 1;
            }
        }
        cout << l << endl;
    }
    return 0;
}
```

