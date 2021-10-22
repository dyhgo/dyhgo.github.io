# 每日一题 (CF)


> 在这篇文章下更新CodeForces的每日一题，每日一题并不是为了提高编程水平，而是保持手感，从10月2日开始更新，应该过几天批量更新一次

## 扫描线

### 题意
[题链](https://atcoder.jp/contests/abc221/tasks/abc221_d)

给N个区间，N<=2e5，区间长度最大1e9，对于每个区间，区间里面的每个数+1，求数字分别为1,2,3...N的id个数

### 题解

如果区间长度很小，可以直接做。区间长度很大时，就类似于分段处理，用扫描线。把区间端点排序，求在当前端点到下一个端点这个区间内数字为多少。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    int n;
    cin >> n;
    vector<int> a(n + 1);
    vector<pair<int, int>> v;
    for (int i = 0; i < n; ++i) {
        int l, r;
        cin >> l >> r;
        r += l;
        v.emplace_back(l, 1);
        v.emplace_back(r, -1);
    }
    sort(v.begin(), v.end());
    int cnt = 0;
    for (int i = 0; i < (int) v.size() - 1; ++i) {
        cnt += v[i].second;
        a[cnt] += v[i + 1].first - v[i].first;
    }
    for (int i = 1; i <= n; ++i) {
        cout << a[i] << " \n"[i == n];
    }
    return 0;
}
```


## 贪心 实现

### 题意

[题链](https://codeforces.com/problemset/problem/1566/D2)

电影院座位有n行m列，给座位编号从上到下，从左到右为1,2,3,...nm，给nm个人安排座位，每个人的视力为ai，安排座位需要满足对于任意两个座位i,j上的人的视力ai,aj满足i < j 时一定ai < aj，每个人按自己的id顺序坐进去。首先，ta来到自己被安排座位的那一行，然后从左开始往右走。每个人的不方便度为ta从左走向自己座位时需要经过多少个已经在座位上的人，求不方便度总和的最小值

### 题解

按视力排序，对于同一个视力的人，将小的id尽可能地排在最上面和最右边

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    int _;
    cin >> _;
    while (_--) {
        map<int, vector<int>> mp;
        int n, m;
        cin >> n >> m;
        vector<vector<int>> id(n + 1, vector<int>(m + 1));
        for (int i = 1; i <= n * m; ++i) {
            int t;
            cin >> t;
            mp[t].push_back(i);
        }
        for (auto& i : mp) {
            sort(i.second.rbegin(), i.second.rend());
        }
        int rem = m;
        int row = 1;
        for (const auto& i : mp) {
            auto cnt = i.second;
            while (!cnt.empty()) {
                if (rem >= (int) cnt.size()) {
                    for (int j = m - rem + (int) cnt.size(); !cnt.empty(); --j) {
                        id[row][j] = cnt.back();
                        cnt.pop_back();
                        rem--;
                    }
                }else {
                    for (int j = m; rem > 0; --j) {
                        id[row][j] = cnt.back();
                        cnt.pop_back();
                        rem--;
                    }
                    rem = m;
                    row++;
                }
            }
        }
        int ans = 0;
        for (int i = 1; i <= n; ++i) {
            vector<int> vt;
            for (int j = 1; j <= m; ++j) {
                int num = 0;
                auto ite = lower_bound(vt.begin(), vt.end(), id[i][j]);
                num = ite - vt.begin();
                vt.insert(ite, id[i][j]);
                ans += num;
            }
        }
        cout << ans << '\n';
    }
    return 0;
}
```

## 构造 数学

### 题意

[题链](https://codeforces.com/contest/1497/problem/C2)

给数n（3-1e9）和k（3-1e5），构造出k个数，和为n，lcm不超过n/2

### 题解
刚开始想了个fake算法：构造成a,a,a,a,....b

实际上可以构造成1,1,1,1,1...a,b,c （长度大于2）

假设a+b+c=m，如果m是奇数，就是1, m/2, m/2，如果m是偶数可以2, (m-2)/2, (m-2)/2，但是这样(m-2)/2可能是奇数。可以发现当(m-2)/2是奇数时，m为4的倍数，所以这样构造m/2, m/4, m/4

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int _;
    cin >> _;
    while (_--) {
        int n, k;
        cin >> n >> k;
        if (n % k == 0) {
            for (int i = 0; i < k; ++i) {
                cout << n / k << " \n"[i == k - 1];
            }
        }else {
            int a, b, c;
            n -= (k - 3);
            if (n % 2 == 1) {
                a = 1;
                b = c = n / 2;
            }else if (n % 4 == 0) {
                a = n / 2;
                b = n / 4;
                c = n / 4;
            }else {
                a = 2;
                b = c = (n - 2) / 2;
            }
            cout << a << ' ' << b << ' ' << c << ' ';
            for (int i = 0; i < k - 3; ++i) {
                cout << 1 << " \n"[i == k - 4];
            }
        }
    }
    return 0;
}
```


## 构造 贪心 欧拉路径

### 题意

[题链](https://codeforces.com/contest/1511/problem/D)

给数n（2e5）和k（26），构造长度为n的字符串，字符串只能出现前k种字母，使得它的cost最小，cost定义为num(i, j) [s[i] == s[j] && s[i+1] == s[j+1]]

### 题解

最直接的方法是查看每个字符可以向哪些字符转移，这样就画出一个dfa，然后求欧拉路径，另一种方法是贪心。（假设k=4）

先写下a，然后查看a与哪个字母未匹配，发现a与a未匹配，所以字符串为aa，对于第2个a，只能与b匹配，字符串为aab，b与a未匹配，字符串为aaba，a与c未匹配，字符串为aabac，c与a未匹配，字符串为aabaca，a与d未匹配，字符串为aabacad，d与a未匹配，但是如果d与a匹配了，a匹配满了就只能重复之前的匹配，所以贪心选择d与b匹配，字符串为aabacadb，b与b未匹配，字符串为aabacadbb，所以cost为0的字符串为aabacadbbcbdccdd，最后再加一个a，发现最后一个a可以作为字符串的开始，作为下一个循环

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k;
    cin >> n >> k;
    string s;
    for (int i = 0; i < k; ++i) {
        s += char('a' + i);
        for (int j = i + 1; j < k; ++j) {
            s += char('a' + i);
            s += char('a' + j);
        }
    }
    for (int i = 0; i < n; ++i) {
        cout << s[i % (k * k)];
    }
    return 0;
}
```

## 构造 贪心

### 题意

[题链](https://codeforces.com/contest/1503/problem/A)

给长度为n（2e5）的01串，构造两个长度为n的字符串a、b，满足a、b为括号序列，如果第i个为0，则对应位的括号不同，为1则相同，a、b都是合法的括号序列

### 题解

一开始想了个fake的贪心，记录当前剩余左括号个数，然后分情况讨论，贪心地增加左括号，没法增加左括号就增加右括号，后来发现反例a='(())()'， b='((()))'

可以发现0的个数必须是偶数，这样1的个数也是偶数，将1的前半部分填'('，后半部分填')'，对于0，则交错填a:')'，b:'('和a:'('，b:')'，填的时候记录还有多少个左括号未匹配，如果为负数就是不存在

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int _;
    cin >> _;
    while (_--) {
        int n;
        cin >> n;
        string s;
        cin >> s;
        int n0, n1;
        n0 = n1 = 0;
        bool ok = true;
        for (int i = 0; i < n; ++i) {
            if (s[i] == '1') n1++; else n0++;
        }
        if (n0 % 2 != 0 or n1 % 2 != 0) {
            puts("no");
            continue;
        }
        int up = 0, down = 0;
        int cnt = 0;
        string ans1, ans2;
        bool nor = true;
        for (int i = 0; i < n; ++i) {
            if (s[i] == '1') {
                cnt++;
                if (cnt * 2 <= n1) {
                    ans1 += '(';
                    ans2 += '(';
                    up++;
                    down++;
                } else {
                    ans1 += ')';
                    ans2 += ')';
                    up--;
                    down--;
                }
            } else {
                if (nor) {
                    ans1 += ')';
                    ans2 += '(';
                    up--;
                    down++;
                    nor ^= 1;
                } else {
                    ans1 += '(';
                    ans2 += ')';
                    up++;
                    down--;
                    nor ^= 1;
                }
            }
            if (up < 0 or down < 0) {
                ok = false;
                break;
            }
        }
        if (ok and up != 0 or down != 0) {
            puts("no");
        }else if (ok) {
            puts("yes");
            cout << ans1 << '\n' << ans2 << '\n';
        }
    }
    return 0;
}
```


## 图 模拟

### 题意

[题链](https://codeforces.com/contest/1593/problem/E)

给一棵树，每次操作删除当前树的所有叶子，求k次操作后剩下几个节点

### 题解

存度数模拟

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    int _;
    cin >> _;
    while (_--) {
        int n, k;
        cin >> n >> k;
        if (n == 1) {
            puts("0");
            continue;
        }
        vector<int> G[n + 1];
        int degree[n + 1];
        memset(degree, 0, sizeof(degree));
        bool used[n + 1];
        memset(used, 0, sizeof(used));
        for (int i = 0; i < n - 1; ++i) {
            int u, v;
            cin >> u >> v;
            G[u].push_back(v);
            G[v].push_back(u);
            degree[u]++;
            degree[v]++;
        }
        queue<int> q;
        for (int i = 1; i <= n; ++i) {
            if (degree[i] == 1) q.push(i), used[i] = true;
        }
        int cut_num = 0;
        while (k--) {
            if (cut_num == n) break;
            int sz = (int) q.size();
            cut_num += sz;
            while (sz--) {
                auto tmp = q.front();
                q.pop();
                for (int i : G[tmp]) {
                    if (used[i]) continue;
                    if (--degree[i] <= 1) {
                        q.push(i);
                        used[i] = true;
                    }
                }
            }
        }
        cout << n - cut_num << '\n';
    }
    return 0;
}
```


## 二分 交互

### 题意

[题链](https://codeforces.com/contest/1520/problem/F1)

有一个数组由0和1组成，每次可以查询一个区间的和，使用不超过20次查询求出从左往右的第k个0的位置


### 题解

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int n, t, k;
int ask(int l, int r) {
    int ret ;
    cout << "? " << l << ' ' << r << endl;
    cout.flush();
    cin >> ret;
    return ret;
}
int query(int l, int r, int th) {
    if (l == r and ask(l, r) == 0) {
        return l;
    }
    int one = ask(l, l + (r - l) / 2);
    if ((r - l) / 2 + 1 - one >= th) {
        return query(l, l + (r - l) / 2, th);
    } else {
        return query(l + (r - l) / 2 + 1, r, th - (r - l) / 2 - 1 + one);
    }
}
int main() {
    cin >> n >> t;
    cin >> k;
    int ans = query(1, n, k);
    cout << "! " << ans << endl;
    cout.flush();
    return 0;
}
```


## 记忆化搜索

### 题意

[题链](https://codeforces.com/contest/1498/problem/C)

有n个平面从左往右放置，一个粒子会以衰竭时间k打到平面上。粒子打到平面上会产生两种效果，以相同衰竭时间穿过平面到达下一个平面，产生一个反方向，衰竭时间-1的粒子到达之前的平面。衰竭时间为1的粒子不会产生反射粒子。求一个衰竭时间为k的粒子从左往右打到第一个平面总共会产生几个粒子


### 题解

模拟粒子的穿过和反射操作，递归搜索，记忆化搜索，用dp[i][j][k]表示一个衰竭时间为j的粒子以k方向打到第i个平面产生的粒子数，搜索时分情况讨论

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 1e9 + 7;
const int maxn = 1005;
ll dp[maxn][maxn][2];   //0 is -> , 1 is <-
int n, k;
ll dfs(int id, int da, int dir) {
    if (dp[id][da][dir] != -1) {
        return dp[id][da][dir];
    }
    ll ans = 0;
    if (dir == 0) {
        if (id == 1) {
            if (da != 1) {
                ans += (1 + dfs(id + 1, da, 0));
                ans %= mod;
            }
        }else if (id == n) {
            if (da != 1) {
                ans += (1 + dfs(id - 1, da - 1, 1));
                ans %= mod;
            }
        }else {
            if (da != 1) {
                ans += (1 + dfs(id + 1, da, 0));
                ans %= mod;
                ans += dfs(id - 1, da - 1, 1);
                ans %= mod;
            }
        }
    }else {     // dir == 1
        if (id == 1) {
            if (da != 1) {
                ans += (1 + dfs(id + 1, da - 1, 0));
                ans %= mod;
            }
        }else if (id != n) {
            if (da != 1) {
                ans += (1 + dfs(id - 1, da, 1));
                ans %= mod;
                ans += dfs(id + 1, da - 1, 0);
                ans %= mod;
            }
        }
    }
    dp[id][da][dir] = ans;
    return ans;
}
int main() {
    int _;
    cin >> _;
    while (_--) {
        memset(dp, -1, sizeof(dp));
        cin >> n >> k;
        if (n == 1) {
            if (k == 1) {
                puts("1");
            }else puts("2");
            continue;
        }
        cout << 1 + dfs(1, k, 0) << '\n';
    }
    return 0;
}
```


## dfs lca

### 题意

[题链](https://codeforces.com/contest/1592/problem/C)

给一棵树，每个节点有权值，给一个数k，求是否满足删掉1~k-1条边，让连通块的异或和相等

### 题解

这题是我近期来做得最久的一道题，基本都在debug，就各种思维漏洞🤡

由异或的性质想到如果连通块是偶数就是0，奇数假设是x

所以如果每个值异或和为0就存在，如果为x就要判断是否能划成奇数个，每个是x，容易发现只要考虑能否被划分成3个就行

在一开始我想到删掉一条边就相当于把这条边所连节点的子树划出去，所以只需要求每个子树的异或和，然后看是否有两个同值就行（首先你要假设一个根）

这是我犯的第一个错，因为如果删除的两条边在一条链上就不满足上面的条件

所以我想那就把这种情况也考虑进去，如果删除的两条边在一条链上，那么我只需要找一棵子树异或和为0，然后看这棵子树的子树有没有异或和为x的，这是正确的

然后是我犯的第二个错误，如果要分成三个连通块就要特判k>2

接下来是我犯的第三个错误，之前说到看两个子树的异或和是否有同值，这是错的。如果子树是另一个子树的子树就不行，所以这种情况需要满足两个子树不相交

我想那就把这部分补上，我便考虑求一棵树上是否存在两个节点，值相同且没有祖先后代关系

我想这可以用dfs解决，首先求每个值出现几次，然后dfs过程求每个值最多出现几次（因为dfs序，所以遍历过程一定满足祖先后代关系），如果有最多出现次数小于总次数就存在

但是这个方法单独运行应该不会超时（X），反正最后超时了

然后我想其实这个更特殊要求子树异或和为x，所以把异或和为x的节点抽出来，暴力lca判断（直觉上时间应该短）

最后居然跑得比最开始交的代码还快，属于是用空间换时间了

不过真正优美的做法肯定不是这样的━┳━　━┳━ hh

![在这里插入图片描述](https://img-blog.csdnimg.cn/680c2fe657b94efcb2bc28b331966aac.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_9,color_FFFFFF,t_70,g_se,x_16)

保留debug痕迹，时刻提醒自己思维要严谨


```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;

template <typename A, typename B>
string to_string(pair<A, B> p) {
    return "(" + to_string(p.first) + ", " + to_string(p.second) + ")";
}

template <typename A, typename B, typename C>
string to_string(tuple<A, B, C> p) {
    return "(" + to_string(get<0>(p)) + ", " + to_string(get<1>(p)) + ", " + to_string(get<2>(p)) + ")";
}

template <typename A, typename B, typename C, typename D>
string to_string(tuple<A, B, C, D> p) {
    return "(" + to_string(get<0>(p)) + ", " + to_string(get<1>(p)) + ", " + to_string(get<2>(p)) + ", " + to_string(get<3>(p)) + ")";
}

void debug_val() {cerr << '\n';}
template <typename Head, typename... Tail>
void debug_val(Head H, Tail... T) {
    cerr << " " << to_string(H);
    debug_val(T...);
}

#ifdef LOCAL
#define debug(...) cerr << "[" << #__VA_ARGS__ << "]:", debug_val(__VA_ARGS__)
#define split()  cerr << "===============================================" << '\n'
#define timeused() cerr << "time_used: " << t_clock - s_clock << '\n'
#endif

const int maxn = 100005;
vector<int> G[maxn];
int xor_sum[maxn];
int n, k;
int val[maxn];
int a;
int par[maxn];
unordered_map<int, int> mp[maxn];
void dfs(int x, int p) {
    par[x] = p;
    if ((int) G[x].size() == 1 and G[x][0] == p) {
        xor_sum[x] = val[x];
        return;
    }
    for (int i : G[x]) {
        if (i == p) continue;
        dfs(i, x);
        xor_sum[x] ^= xor_sum[i];
    }
    xor_sum[x] ^= val[x];
}

bool dfs2(int x, int p) {
    if ((int) G[x].size() == 1 and G[x][0] == p) {
        return val[x] == a;
    }
    for (int i : G[x]) {
        if (i == p) continue;
        if (xor_sum[i] == a) return true;
        //else return dfs2(i, x);  wrong
        else {
            if (dfs2(i, x)) return true;
        }
    }
    return false;
}

//unordered_map<int, int> col_num;
//unordered_map<int, int> mx_col_num;
//unordered_map<int, int> cur_col_num;


//void dfs3(int x, int p) {
//    if (xor_sum[x] == a) {
//        cur_col_num[xor_sum[x]]++;
//        mx_col_num[xor_sum[x]] = max(mx_col_num[xor_sum[x]], cur_col_num[xor_sum[x]]);
//    }
//    for (int i : G[x]) {
//        if (i == p) continue;
//        dfs3(i, x);
//    }
//    if (xor_sum[x] == a) {
//        cur_col_num[xor_sum[x]]--;
//    }
//}
//
//bool sol() {
//    for (int i = 1; i <= n; ++i) {
//        col_num[xor_sum[i]]++;
//    }
//    dfs3(1, 0);
//    for (int i = 1; i <= n; ++i) {
//        if (xor_sum[i] != a) continue;
//        if (mx_col_num[xor_sum[i]] < col_num[xor_sum[i]]) return true;
//    }
//    return false;
//}



int root;

int parent[20][maxn];
int depth[maxn];

void dfs(int v,int p,int d){
    parent[0][v]=p;
    depth[v]=d;
    for(int i=0;i<G[v].size();i++){
        if(G[v][i]!=p) dfs(G[v][i],v,d+1);
    }
}

void init(int V){
    dfs(root,-1,0);
    for(int k=0;k+1<20;k++){
        for(int v=0;v<V;v++){
            if(parent[k][v]<0) parent[k+1][v]=-1;
            else parent[k+1][v]=parent[k][parent[k][v]];
        }
    }
}

int lca(int u,int v){
    if(depth[u]>depth[v]) swap(u,v);
    for(int k=0;k<20;k++){
        if((depth[v]-depth[u])>>k&1) v=parent[k][v];
    }
    if(u==v) return u;
    for(int k=20-1;k>=0;k--){
        if(parent[k][u]!=parent[k][v]){
            u=parent[k][u];
            v=parent[k][v];
        }
    }
    return parent[0][u];
}

bool sol() {
    root = 1;
    init(n + 1);
    vector<int> tmp;
    for (int i = 2; i <= n; ++i) {
        if (xor_sum[i] == a)
            tmp.push_back(i);
    }
    for (int i = 0; i < (int) tmp.size(); ++i) {
        for (int j = i + 1; j < (int) tmp.size(); ++j) {
            int cp = lca(tmp[i], tmp[j]);
            if (cp != tmp[i] and cp != tmp[j]) return true;
        }
    }
    return false;
}

int main() {
#ifdef LOCAL
    freopen("in1.txt", "r", stdin);
    freopen("out1.txt", "w", stdout);
#endif


    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    int _;
    cin >> _;
    while (_--) {
        cin >> n >> k;
        for (int i = 0; i < n + 1;  ++i) {
            G[i].clear();
            xor_sum[i] = 0;
            mp[i].clear();
//            col_num.clear();
//            cur_col_num.clear();
//            mx_col_num.clear();
        }
        for (int i = 1; i <= n; ++i) {
            cin >> val[i];
        }
        for (int i = 0; i < n - 1; ++i) {
            int u, v;
            cin >> u >> v;
            G[u].push_back(v);
            G[v].push_back(u);
        }
        dfs(1, 0);
        a = xor_sum[1];
//        debug(xor_sum[3]);
//        int test = 94888708 ^ 423961455 ^ 527440158;
//        debug(test);
        if (a == 0) {
            puts("yes");
            continue;
        }
//        int num = 0;
//        for (int i = 2; i <= n; ++i) {
//            if (xor_sum[i] == a) num++;
//         }
//        if (num >= 2 and k != 2) {
//            puts("yes");
//            continue;
//        }
        if (sol() and k != 2) {
            puts("yes");
            continue;
        }

        bool ok = false;
        for (int i = 2; i <= n; ++i) {
            if (xor_sum[i] == 0 and k != 2 and dfs2(i, par[i])) {
                puts("yes");
                ok = true;
                break;
            }
        }
        if (!ok) puts("no");
    }

    return 0;
}
```


## 组合 推理

### 题意

[题链](https://codeforces.com/contest/1598/problem/D)

有n对数，每对数有两个属性a、b，选出三对数使得a属性完全不同或b属性完全不同，求方案数（题目保证没有完全相同的数对）

### 题解

全部方案数-不满足的方案数，由于题目保证没有完全相同的数对，所以a属性只有两个相同，不可能有三个相同。不满足的方案数为a属性有两个相同且b属性有两个相同，即(x,y) (x,z) (q,y)/(q,z)，然后就容易推导出公式。注意long long

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    ll _;
    cin >> _;
    while (_--) {
        ll n;
        cin >> n;
        vector<ll> a(n + 1), b(n + 1);
        unordered_map<ll, vector<ll>> mp1;
        unordered_map<ll, vector<ll>> mp2;
        for (ll i = 1; i <= n; ++i) {
            cin >> a[i] >> b[i];
            mp1[a[i]].push_back(b[i]);
            mp2[b[i]].push_back(a[i]);
        }
        ll ans;
        ans = n * (n - 1) * (n - 2) / 6;
        ll tmp = 0;
        for (auto i : mp1) {
            ll sz = (ll) i.second.size();
            for (auto j : i.second) {
                if (mp2.find(j) != mp2.end())
                    tmp += ((ll) mp2[j].size() - 1) * (sz - 1);
            }
        }
        //cout << tmp << '\n';
        ans -= tmp;
        cout << ans << '\n';
    }
    return 0;
}
```

