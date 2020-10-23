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

===============================================================

## dp bf 预处理

[题目](https://vjudge.net/contest/398486#problem/I)

### 题意

给定一个大写的字符串，每个大写的字母都代表三个字母的组合（qwe），每次释放一个qwe中的技能就会获得这个字母，至多只能获得三个，如果在已有三个字母的情况下获得释放技能，第一个字母将会被挤掉（类似于队列）当集齐该大写字母的三个字母组合时，释放r技能就能成功点亮这个大写字母，这时候字母队列中不会有任何变化，问最少需要释放几个技能把所有的大写字母按顺序点亮

### 题解

按顺序暴力，由于大写字母对应的是技能的组合，总共有6种，所以求出前6种组合对后6种组合的影响，然后对每个都取最小值，这样就形成dp 

dp[i][j] 表示扫描完第 i 个大写字母时，对应的第 j 种组合（至多6种）的答案

初始化 `dp[0][i] = 3 [0 <= i < 6]`

状态转移方程  `dp[i][j] = min(dp[i][j], dp[i - 1][k] + cot(string s[i - 1][k], string s[i][j])`

最后的答案就是 `min(dp[s.len - 1][i]) [0 <= i < 6]`

如果不做优化会超时，优化的方法就是两处预处理（在代码中标注）

```cpp
//358ms/1000ms 2772kb/1024mb
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
const int maxn = 100005;
//string s;
char s[maxn];
unordered_map<char, int> mp;
//括号不匹配
char ch[11][7][4] =
        {{"QQQ", "QQQ", "QQQ", "QQQ", "QQQ", "QQQ"}},
        {"QQW", "QWQ", "QQW", "QWQ", "WQQ", "WQQ"},
         {"QQE", "QEQ", "QQE", "QEQ", "EQQ", "EQQ"},
         {"WWW", "WWW", "WWW", "WWW", "WWW", "WWW"},
         {"QWW", "QWW", "WQW", "WWQ", "WQW", "WWQ"},
         {"WWE", "WEW", "WWE", "WEW", "EWW", "EWW"},
         {"EEE", "EEE", "EEE", "EEE", "EEE", "EEE"},
         {"QEE", "QEE", "EQE", "EEQ", "EQE", "EEQ"},
         {"WEE", "WEE", "EWE", "EEW", "EWE", "EEW"},
         {{"QWE", "QEW", "WQE", "WEQ", "EQW", "EWQ"}};

int dp[maxn][6];
int did(string s1, string s2){
    if(s1 == s2) return 0;
    if(s1[1] == s2[0] and s1[2] == s2[1]) return 1;
    if(s1[2] == s2[0]) return 2;
    return 3;
}
const int inf = 0x3f3f3f3f;
//int get_id(char x){
//    if(x == 'Y') return 0;
//    if(x == 'V') return 1;
//    if(x == 'G') return 2;
//    if(x == 'C') return 3;
//    if(x == 'X') return 4;
//    if(x == 'Z') return 5;
//    if(x == 'T') return 6;
//    if(x == 'F') return 7;
//    if(x == 'D') return 8;
//    return 9;
//}
int cot[11][7][11][7];
int main() {
    mp['Y'] = 0;
    mp['V'] = 1;
    mp['G'] = 2;
    mp['C'] = 3;
    mp['X'] = 4;
    mp['Z'] = 5;
    mp['T'] = 6;
    mp['F'] = 7;
    mp['D'] = 8;
    mp['B'] = 9;
    for(int i = 0; i < 10; ++i){
        for(int j = 0; j < 6; ++j){
            for(int k = 0; k < 10; ++k){
                for(int m = 0; m < 6; ++m){
                    string s1 = ch[i][j];
                    string s2 = ch[k][m];
                    cot[i][j][k][m] = did(s1, s2);
                }
            }
        }
    }
    //cin >> s;
    scanf("%s", s);
    int len = strlen(s);
    for(int i = 0; i <= len; ++i)
        for(int j = 0; j < 6; ++j)
            dp[i][j] = inf;
    //cout << len << endl;
    for(int i = 0; i < 6; ++i){
        dp[0][i] = 3;
    }
    for(int i = 1; i < len; ++i){
        int id1 = mp[s[i - 1]];   //在外层循环得到
        int id2 = mp[s[i]];
        for(int j = 0; j < 6; ++j){
            for(int k = 0; k < 6; ++k){
                dp[i][j] = min(dp[i][j], dp[i - 1][k] + cot[id1][k][id2][j]);  //!!!此处预处理
                //dp[i][j] = min(dp[i][j], dp[i - 1][k] + did(ch[id1][k], ch[id2][j]));
            }
        }
    }
    int ans = 0x3f3f3f3f;
    for(int i = 0; i < 6; ++i){
        ans = min(ans, dp[len - 1][i]);
    }
    cout << ans + len << endl;
    return 0;
}
```

===============================================================

## dfs 图论 乘法原理

[题目](https://vjudge.net/contest/398486#problem/F)

### 题意

给一个森林，每个连通块都是[仙人掌图](https://www.cnblogs.com/aininot260/p/9623954.html)，每次删除一些边，使得它变成一个森林且每个连通块都是一棵树，问有多少种删边方法

### 题解

根据仙人掌图的定义，对于每个环，至少删除一条边就能满足条件，所以计算每个环的边数

对于不在环上的边，可以任意删除或保留，假设每个环的边数为ci，不在环上的边数是r

$$
ans = 2^r*\prod (2^{c_i} - 1)
$$

对于找环的边数，可以用tarjan算法的思想，用dfs序来判断是否遍历过这个点，如果遍历过就说明形成环，dfs序相减就是环的长度

```cpp
//358ms/1000ms 138640kb/1048576kb
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
const int maxv = 300005;
const ll mod = 998244353;
const int maxn = 2000005;
struct edge{
    int to,  nxt;
}e[maxn];
int tot,head[maxn];
void add_edge(int u,int v){
    e[tot].to = v;
    e[tot].nxt = head[u];
    head[u] = tot++;
}
vector<ll> res;
int dfn[maxv],low[maxv];
bool in_stack[maxv];
stack<int> s;
int tim;
ll qpow(ll x,ll n){
    ll res =1;
    while(n>0){
        if(n&1) res=res*x%mod;
        x=x*x%mod;
        n>>=1;
    }
    return res;
}
void tarjan_dfs(int x, int p){
    for(int i = head[x]; ~i; i = e[i].nxt){
        int v = e[i].to;
        if(v == p) continue;
        if(dfn[v] != 0){
            res.push_back(dfn[x] + 1 - dfn[v]);
        }else{
            dfn[v] = dfn[x] + 1;
            tarjan_dfs(v, x);
        }
    }
}
int main() {
    int n, m;
    while(scanf("%d%d", &n, &m) != EOF){
        //reset
        res.clear();
        tim = 0;
        memset(dfn, 0, sizeof(dfn));
        memset(low, 0, sizeof(low));
        memset(in_stack, 0, sizeof(in_stack));
        while(!s.empty()) s.pop();
        tot = 0;
        memset(head , -1 , sizeof(head));
        for(int i = 0; i < m; ++i){
            int u, v;
            scanf("%d%d", &u, &v);
            add_edge(u, v);
            add_edge(v, u);
        }

        for(int i = 1; i <= n; ++i){
            if(!dfn[i]){
                dfn[i] = 1;
                tarjan_dfs(i, 0);
            }
        }
        ll rem = 0;
        for(ll i : res) {
            if(i > 0) rem += i;
        }
        rem = m - rem;
        ll ans = 1;
        for(ll i : res){
            if(i <= 0) continue;
            ans *= qpow(2, i) - 1;
            ans += mod;
            ans %= mod;
        }
        ans *= qpow(2, rem);
        ans += mod;
        ans %= mod;
        printf("%lld\n", ans);
        //for(ll i : res) cout << i << " ";
        //for(int i = 1; i < 6; ++i) cout << dfn[i] << " ";
    }
    return 0;
}
```

