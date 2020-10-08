# 无聊的做题记录


## 数学公式

[题目](https://ac.nowcoder.com/acm/problem/15097)

### 题解

错排公式

Dn = floor(n!/e + 0.5) = (n - 1) * (Dn-1 + Dn-2)

D1 = 0 , D2 = 1



```cpp
//457ms/1000ms  488k/32768k
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
const ll mod = 998244353;
int main() {
    ll n;
    cin >> n;
    ll one = 0, to = 1;
    ll ans = 0;
    for(int i = 2; i < n; ++i){
        ans = i * (one + to);
        ans %= mod;
        one = to;
        to = ans;
    }
    cout << ans ;
    return 0;
}
```
===============================================================

## 贪心

[题目](http://acm.hdu.edu.cn/showproblem.php?pid=6709)

### 题解

最优策略一定是捕鱼和炖鱼并行，但是捕鱼的过程不能中断，所以就有时间浪费，分两种，1.在炖鱼结束前停止捕鱼，2.炖鱼结束前，捕一条鱼，炖鱼结束，捕鱼还没结束

对每一次炖鱼选择哪一种？2优于1在于同样是浪费时间，2可以多收获一条生鱼

所以每次都选择2策略，捕鱼顺序会影响时间，为了让浪费时间尽可能少，应该求出每一次炖鱼的“浪费时间”，然后从小到大排序，选择前“浪费时间的次数”个

```cpp
//436ms/1000ms 4024kb/65536kb
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
ll a[100005];
vector<ll> b;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int _;
    cin >> _;
    while (_--) {
        b.clear();
        int n, k;
        cin >> n >> k;
        ll ans = 0;
        ll sum = 0;
        for(int i = 0; i < n; ++i) {
            cin >> a[i];
            ans += a[i];
            sum += a[i] / k;
            b.push_back(k - a[i] % k);
        }
        sort(b.begin(), b.end());
        for(int i = 0; i < n - sum - 1; ++i){
            ans += b[i];
        }
        ans += k;
        cout << ans << endl;
    }
    return 0;
}
```

===============================================================

## 树形dp dfs 数论

[题目](https://nanti.jisuanke.com/t/39262)

### 题解

dp[i][j] 表示以 i 为根的树，i节点为j时的方案数

dp[i][j] = 每个子节点满足条件的方案数相乘（满足的条件是gcd(i,j) != w）

子节点又要求子节点所以形成dfs

由于求j满足gcd(i,j) = w比较好求（枚举w的倍数），所以满足条件的方案数是所有方案数减不满足条件方案数

所有方案数即dp[i][1] + dp[i][2] + ...  + dp[i][m] 这可以每次求完所有的dp[i][x] 之后求和，用sum[i]维护

整体过程就是先dfs子节点，处理完毕后遍历m，然后遍历每个子节点，算出该子节点对dp[i][j]的贡献（满足的方案数），最后求积，赋值给dp[i][j]，然后再遍历一遍m在线预处理sum[i]


时间复杂度 O(m^2logm)

如果m是1e5，可能需要莫比乌斯反演

注意这不是一棵树，是无向图



```cpp
    //537ms/1000ms 8192kb/262144kb
    #include "bits/stdc++.h"
    using namespace std;
    using ll = long long;
    const int maxn = 1005;
    ll sum[maxn];
    const ll mod = 1e9 + 7;
    ll n, m;
    ll dp[maxn][maxn];
    struct edge{
        int to , next;
        ll w;
    }e[2*maxn];
    int tot,head[maxn];
    ll gcd(ll a, ll b){
        return b ? gcd(b, a%b) : a;
    }
    void add_edge(int u, int v, ll w){
        e[tot].to = v;
        e[tot].w = w;
        e[tot].next = head[u];
        head[u] = tot++;
    }
    void dfs(int x, int p){
        for(int i = head[x]; ~i; i = e[i].next){
            int v = e[i].to;
            if(v != p) dfs(v, x);
        }
        for(ll i = 1; i <= m; ++i){
            ll cnt = 1;
            for(int j = head[x]; ~j; j = e[j].next){
                int v = e[j].to;
                ll w = e[j].w;
                if(v == p) continue;
                ll rem = sum[v];
                for(ll k = w; k <= m; k += w){
                    if(gcd(i, k) == w){
                        rem -= dp[v][k];
                        rem += mod;
                        rem %= mod;
                    }
                }
                cnt *= rem;
                cnt %= mod;
            }
            dp[x][i] = cnt;
            dp[x][i] %= mod;
        }
        for(ll i = 1; i <= m; ++i){
            sum[x] += dp[x][i];
            sum[x] %= mod;
        }
    }

    int main() {
        ios::sync_with_stdio(false);
        cin.tie(nullptr);
        cout.tie(nullptr);
        memset(head , -1 , sizeof(head));
        cin >> n >> m;
        for(int i = 0; i < n - 1; ++i){
            int u, v, w;
            cin >> u >> v >> w;
            add_edge(u, v, w);
            add_edge(v, u, w);
        }
        dfs(1, 0);
        cout << sum[1] << endl;
        return 0;
    }
```

===============================================================

## dp 乘法原理

[题目](https://codeforces.com/contest/1426/problem/F)

### 题解

用dp处理排列组合问题，对于子序列的数量，考虑对前缀的依赖

`dp[3]` 表示扫描到当前abc的数量，`dp[2]`表示扫描到当前ab的数量，`dp[1]`表示扫描到当前a的数量，`dp[0]`表示扫描到当前单纯排列组合的数量

转移方程 `dp[3] = dp[3] + dp[2]  [ch[i] == 'c']`

`dp[2] = dp[2] + dp[1] [ch[i] == 'b']`

`dp[1] = dp[1] + dp[0] [ch[i] == 'a']`

当前字符是？时，它有三种情况a, b, c所以对于dp[0], dp[1], dp[2], dp[3]都乘以3

然后再分a, b, c三种情况

对于c，`dp[3] += dp[2]` （这是未扫描到当前的dp[2]）其他同理

初始化 `dp[0] = 1`

```cpp
//61ms/1000ms 208kb/256mb
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 1e9 + 7;
char a[200005];
ll dp[4];
int main(){
    int n;
    cin >> n;
    cin >> a;
    dp[0] = 1;
    for(int i = 0; i < n; ++i){
        if(a[i] == 'a'){
            dp[1] = (dp[1] + dp[0]) % mod;
        }else if(a[i] == 'b'){
            dp[2] = (dp[2] + dp[1]) % mod;
        }else if(a[i] == 'c'){
            dp[3] = (dp[3] + dp[2]) % mod;
        }else{
            dp[3] = (3ll * dp[3] + dp[2]) % mod;
            dp[2] = (3ll * dp[2] + dp[1]) % mod;
            dp[1] = (3ll * dp[1] + dp[0]) % mod;
            dp[0] = (3ll * dp[0]) % mod;
        }
    }
    cout << dp[3] << endl;
    return 0;
}
```


