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

===============================================================

## dp lis

[题目](https://codeforces.com/contest/1427/problem/C)

### 题意

在一个网格上有n个明星，他们出现的时间是0~ti，从(1,1)出发，每走一格消耗一个时间单位，问最多能碰见几个明星

### 题解

注意一个重要条件：时间是按**严格**升序排的，r<=500

类似于lis的dp，dp[i]表示最后碰见第i个人时的答案

ans = max(ans, dp[i]) [1 <= i <= n]

dp[i] = max(dp[i], dp[j] + 1)

在lis中更新的条件是后面的数比前面的大，在这里条件是曼哈顿距离不大于时间差（已排好序）

这样时间复杂度就是O(n^2)

对于当前明星，它存活到ti，由于网格大小的限制，所以ti - 2r之前消失的明星一定可达，而(ti-2r, ti)这段时间的明星就需要一个一个判断

接下来有一个很巧妙的将时间复杂度降到O(nr)的优化

由于[0, ti-4r]已经用来更新过（更新到ti-2r）所以这段区间将不再使用（因为它的影响已经叠加在了[ti-4r,ti-2r]这段区间上了），所以只需要看[ti-4r,ti-2r]这段区间，加上需要一个一个判断的[ti-2r,ti)这段区间。最后只需要遍历[ti-4r,ti)

时间之所以能转化成明星的个数，就是因为时间是**严格**有序的


```cpp
//702ms/2000ms 1572kb/256mb
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int r, n;
const int maxn = 100005;
int dp[maxn];
tuple<int, int, int> cel[maxn];
int dist(int i, int j){
    return abs(get<1>(cel[i]) - get<1>(cel[j])) + abs(get<2>(cel[i]) - get<2>(cel[j]));
}
int main() {
    memset(dp, -1, sizeof(dp));
    scanf("%d%d", &r, &n);
    get<0>(cel[0]) = 0;
    get<1>(cel[0]) = 1;
    get<2>(cel[0]) = 1;
    for(int i = 1; i <= n; ++i){
        int t, x, y;
        scanf("%d%d%d", &t, &x, &y);
        get<0>(cel[i]) = t;
        get<1>(cel[i]) = x;
        get<2>(cel[i]) = y;
    }
    dp[0] = 0;
    for(int i = 1; i <= n; ++i){
        for(int j = max(0, i - 4 * r); j < i; ++j){
            if(dp[j] == -1) continue;
            if(dist(i, j) <= get<0>(cel[i]) - get<0>(cel[j])) dp[i] = max(dp[i], dp[j] + 1);
        }
    }
    int ans = 0;
    for(int i = 1; i <= n; ++i){
        ans = max(ans, dp[i]);
    }
    printf("%d\n", ans);
    return 0;
}
```


===============================================================


## 数论

[题目](https://codeforces.com/contest/1445/problem/C)

### 题意

给俩数p,q，求最大的x满足p%x=0，x%q!=0

### 题解

如果p%q!=0，x=p

否则对于pq相同的因子m，假设q中有n个m，那么就让p中m的个数减到n-1，得到一个tmp，这样就能保证p%tmp=0,tmp%q!=0，对于所有的因子产生的tmp取最大值

```cpp
//46ms/1000ms 12kb/512mb
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
vector<pair<ll, ll>> vt;
ll p, q;
int main() {
    int _;
    cin >> _;
    while (_--) {
        ll ans = -1;

        cin >> p >> q;
        if(p % q != 0) ans = p;
        else{
            vt.clear();
            for(ll i = 2; i * i <= q; ++i){
                if(q % i == 0){
                    ll cot = 0;
                    while(q % i == 0) {
                        q /= i;
                        cot++;
                    }
                    vt.emplace_back(i, cot);
                }
            }
            if(q > 1) vt.emplace_back(q, 1);
            for(auto i : vt){
                ll x = i.first;
                ll y = i.second;
                ll tmp = p;
                while(tmp % x == 0){
                    tmp /= x;
                }
                for(ll j = 0; j < y - 1; ++j) tmp *= x;
                ans = max(ans, tmp);
            }
        }
        cout << ans << endl;
    }
//for(auto i : vt){
//    cout << i.first << " " << i.second << endl;
//}
    return 0;
}
```


===============================================================

## dfs 剪枝 回溯

[题目](https://leetcode-cn.com/problems/minimum-incompatibility/)

### 题意

### 题解

重点在于剪枝，还有如何把dfs写得好看点和回溯

此处做的两个剪枝是：如果当前最小不兼容性的和大于等于ans，剪枝。如果当前要处理的集合为空，则不进行下一个集合的处理（因为下一个集合也为空（按顺序放的），这时候放哪个空集无所谓）

```cpp
//308ms 32.6Mb
class Solution {
public:
    int m ;
    int ans;
    int n;
    int K;
    void dfs(vector<int>& nums, int index, vector<set<int>>& sts, int cnt){
        if(index >= n) {
            ans = min(ans, cnt);
            return ;
        }
        for(int i = 0; i < K; ++i){
            if(sts[i].empty()){
                sts[i].insert(nums[index]);
                dfs(nums, index + 1, sts, cnt);
                sts[i].erase(nums[index]);
                return ;
            }
            if(sts[i].size() < m and sts[i].find(nums[index]) == sts[i].end()){
                int tmp_cnt = cnt + nums[index] - *sts[i].rbegin();
                if(tmp_cnt >= ans) continue;
                sts[i].insert(nums[index]);
                dfs(nums, index + 1, sts, tmp_cnt);
                sts[i].erase(nums[index]);
            }
        }
    }
    
    
    int minimumIncompatibility(vector<int>& nums, int k) {
        vector<set<int>> vt(k);
        sort(nums.begin(), nums.end());
        K = k;
        ans = 0x3f3f3f3f;
        n = nums.size();
        m = n / k;
        dfs(nums, 0, vt, 0);
        if(ans == 0x3f3f3f3f) ans = -1;
        return ans;
    }
};
```

 
===============================================================

## 状态压缩dp 预处理

[题目](https://leetcode-cn.com/problems/minimum-incompatibility/)

### 题意

和上面那题一样

### 题解

第二种方法是状态压缩dp，（完全不会(╥╯^╰╥) ）

假设n是nums的长度，m是每个集合中的元素个数

foo[i]表示集合为i时的不兼容性，只需对集合中有m个元素时处理，其他情况都是inf，注意foo[0] = 0

dp[i]表示前i个数的最小不兼容性，ans = dp[(1<<n) - 1]

对于每个集合i，枚举子集，对于子集大小为m的

dp[i] = min(dp[i], foo[sub] + dp[i ^ sub])

注意初始化为dp = inf foo = inf

dp[0] = 0 foo[0] = 0


```cpp
//1128ms 13.4Mb
class Solution {
public:
    int minimumIncompatibility(vector<int>& nums, int k) {
        int n = nums.size();
        int m = n / k;
        vector<int> cnt;
        vector<int> dp((1 << n) + 5, 0x3f3f3f3f);
        vector<int> foo((1 << n) + 5, 0x3f3f3f3f);
        dp[0] = 0;
        foo[0] = 0;
        for(int i = 0; i < (1 << n); ++i){
            cnt.clear();
            if(__builtin_popcount(i) == m){
                for(int j = 0; j < n; ++j){
                    if(i >> j & 1){
                        cnt.push_back(nums[j]);
                    }
                }
                sort(cnt.begin(), cnt.end());
                bool ok = true;
                for(int j = 1; j < m; ++j){
                    if(cnt[j] == cnt[j - 1]){
                        ok = false;
                        break;
                    }
                }
                if(ok) foo[i] = cnt[m - 1] - cnt[0];
            }
        }
        
        for(int i = 0; i < (1 << n); ++i){
            int sub = i;
            do{
                if(__builtin_popcount(sub) == m){
                    dp[i] = min(dp[i], foo[sub] + dp[sub ^ i]);
                }
                sub = (sub - 1) & i;
            }while(sub != i);
        }
        
        int ans = dp[(1 << n) - 1];
        if(ans == 0x3f3f3f3f) ans = -1;
        return ans;
    }
};
```


===============================================================

## 博弈

[题目](https://codeforces.com/contest/1451/problem/D)

### 题意

在平面坐标系里，有一个token，初始在原点，两人轮流操作，直到不能操作判胜负，操作是将token向上或向右移k个单位，每次移动后token离原点的距离都不能超出d

### 题解

记录一下看错题目，浪费一小时的惨痛经历

移动k个单位是沿一个方向

```cpp
//46ms/2000ms 0kb/256mb
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int main() {
    ll _;
    cin >> _;
    while (_--) {
        ll d, k;
        cin >> d >> k;
        ll n = 0;
        while((n + k) * (n + k) * 2 <= d * d){
            n += k;
        }
        ll tmp = n + k;
        if(tmp * tmp + n * n <= d * d) {
            n /= k ;
            n *= 2;
            n++;
        }else{
            n /= k;
            n *= 2;
        }
        if(n & 1) puts("Ashish"); else puts("Utkarsh");

    }
    return 0;
}
```


===============================================================


## 树形dp dfs

[题目](https://codeforces.com/contest/1436/problem/D)

### 题意

给一棵树，每个节点有若干个人，从根节点开始，每个人可以选择去往一个子节点，直到这个节点没人，最后所有人都来到了叶子节点。将叶子节点的最大人数最小化


### 题解

画了几下图，第一感觉是贪心+搜索，如果一直这样做的话，就有可能变成一个结论题，但是细节还是很难具体化，又有点像dp，树形dp应该是逻辑最清晰的

dp[i]表示以i为根的答案，最后输出dp[1]

初始化全为0

考虑转移方程，这个节点的答案一定不小于子节点的答案

dp[i] = max{dp[ch]}

考虑把该节点的人数转移到子树上（子树的叶子节点上），贪心地选择叶子人数少的，这样不会改变最大值，答案还是max{dp[ch]}

如果叶子人数少的被填满了，也就是现在每个叶子都均匀分配了，那就对剩下的人数继续均分

这样答案就大于max{dp[ch]}，答案更新为floor(sum[i] / leaf[i])，其中sum[i]表示i为根的树的总人数，leaf[i]表示i为根的树的叶子数

所以转移方程 dp[i] = max(max{dp[ch]}, floor(sum[i] / leaf[i])）

```cpp
//623ms/1000ms 30668kb/256mb
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
vector<ll> G[200005];
ll a[200005];
ll sum[200005];
ll leaf[200005];
ll dp[200005];

void dfs(ll x){
    if(G[x].size() == 0) leaf[x] = 1;
    sum[x] = a[x];
    for(ll i : G[x]){
        dfs(i);
        sum[x] += sum[i];
        leaf[x] += leaf[i];
        dp[x] = max(dp[x], dp[i]);
    }
    dp[x] = max(dp[x], ll(ceil((double)sum[x] / leaf[x])));
}

int main() {
    ll n;
    cin >> n;
    for(ll i = 2; i <= n; ++i){
        ll x;
        cin >> x;
        G[x].push_back(i);
    }
    for(ll i = 1; i <= n; ++i){
        cin >> a[i];
    }
    dfs(1);
    cout << dp[1] << '\n';
    return 0;
}
```


===============================================================

## 数论

[题目](https://codeforces.com/problemset/problem/1260/C)

### 题意

有一排木板，无限多个，给r的倍数涂红色，b的倍数涂蓝色，r和b的倍数随便选一种颜色涂，将涂色的木板取出来，按原来的顺序排，问是否存在不少于k个连续的颜色相同的木板

### 题解

假设r > b，r和b共同的倍数一定染红色（因为红色间隔比较大），问题转化成两个红色木板间最多有几个蓝色木板，在这个区间里，第一个蓝色木板一定是所有长度为r的区间内离该区间左边红色木板最近的，由扩展欧几里得可知ax+by=c，x，y有整数解当c | gcd(a,b)，所以这个最近距离是gcd(r,b)，然后就可以求出最多的蓝色木板

```cpp
31ms/2000ms 0kb/256mb
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int main() {
    int _;
    cin >> _;
    while (_--) {
        int r, b, k;
        cin >> r >> b >> k;
        if(r < b) swap(r, b);
        if(floor((r - 1 - __gcd(r, b)) / (double) b) + 1 < k) puts("OBEY"); else puts("REBEL");
    }
    return 0;
}
```


===============================================================

## 思维 前缀

[题目](https://ac.nowcoder.com/acm/problem/216209)


### 题意

在环上有n个数字，可以对每个数字进行+1或-1的操作，问最少需要几次操作使得环中存在一个长度为n的步长为1的顺时针的递增序列


### 题解

最关键的思路是其中一个数肯定不变

对于每个从环中任一位置开始的数列，假设其中一个数不变，求出操作数，再对所有操作数取min，这样时间复杂度为O(n\*n\*n)，考虑到对其他位置开始的序列，假设不变的数有可能是相同的，这样求别的数需要的操作数时就重复计算了

所以直接假设每个数为不变的数，然后遍历一遍2n个数，用前缀数组求出到这个数的操作数，对于长度为n的序列，操作数为pre[j] - pre[j - n]

```cpp
#include<bits/stdc++.h>
using namespace std;
int a[4005];
int pre[4005];
int ans;
int main(){
    int _;
    cin >> _;
    while(_--){
        int n;
        cin >> n;
        ans = 0x3f3f3f3f;
        for(int i = 1; i <= n; ++i){
            cin >> a[i];
            a[i + n] = a[i];
        }
        for(int i = 1; i < 2 * n; ++i){
            int tmp = a[i] - i;
            for(int j = 1; j < 2 * n; ++j){
                pre[j] = pre[j - 1] + abs(a[j] - j - tmp);
                if(j >= n){
                    ans = min(ans, pre[j] - pre[j - n]);
                }
            }
        }
        cout << ans << '\n';
    }
    return 0；
}
```


