# 每日一题 (CF)





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


## dp

### 题意

[题链](https://codeforces.com/contest/1525/problem/D)

有n把椅子n=5000，从左往右排，有m个人坐在椅子上，每个人只能坐一把椅子，m<n/2，你需要一个接一个让每个人移动到空座位上，移动的代价是椅子距离，最后使得每个刚开始有人占据的椅子都是空的，求最小代价

### 题解

如果n小的话可以直接用二分图匹配。因为移动后每个人的相对顺序不变，考虑O(n^2)做法，考虑用dp来调度。

dp[i][j]表示前i个人坐前j个空座位的最小代价

dp[i][j] = min(dp[i][j-1], dp[i-1][j-1] + 第i个人和第j个空座位的距离)

最后输出dp[人数][空椅子数]

注意初始化dp[0][i] = 0，其他全为inf

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    int n;
    cin >> n;
    vector<int> one(n + 1), zero(n + 1);
    int ct0 = 0, ct1 = 0;
    for (int i = 1; i <= n; ++i) {
        int u;
        cin >> u;
        if (u == 0) {
            zero[++ct0] = i;
        }else {
            one[++ct1]= i;
        }
    }
    vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0x3f3f3f3f));
    for (int i = 0; i <= n; ++i) dp[0][i] = 0;  // !!! notice initialize dp[0][i] means no person need moving, dp[i][0]
    // means there're some persons need moving but they can't, so the cost is inf, also dp[0][0] = 0
    if (ct1 == 0) {
        puts("0");
        exit(0);
    }
    for (int i = 1; i <= ct1; ++i) {
        for (int j = 1; j <= ct0; ++j) {
            dp[i][j] = min(dp[i][j - 1], dp[i - 1][j - 1] + abs(one[i] - zero[j]));
        }
    }
    cout << dp[ct1][ct0] << '\n';
    return 0;
}
```


## 思维

### 题意

[题链](https://codeforces.com/contest/1604/problem/C)

3e5长度的数组，每次选择一个数删除，删除的数需满足条件：假设这个数是第i个数，则num[i]不能被i+1整除，问是否能删空

### 题解

对于1-n的每个位置i，枚举2-i+1看是否满足num[i] % j != 0，如果存在就在那个位置删除，如果不存在这个位置就不能删空

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    int _;
    cin >> _;
    while (_--) {
        int n;
        cin >> n;
        vector<int> a(n + 1);
        for (int i = 1; i <= n; ++i) {
            cin >> a[i];
        }
        bool output = false;
        for (int i = 1; i <= n; ++i) {
            bool ok = false;
            for (int j = 2; j <= i + 1; ++j) {
                if (a[i] % j != 0) {
                    ok = true;
                    break;
                }
            }
            if (!ok) {
                puts("NO");
                output = true;
                break;
            }
        }
        if (!output) puts("YES");
    }
    return 0;
}
```


## 数论 规律

### 题意

[题链](https://codeforces.com/contest/1604/problem/D)

给两个偶数x、y，在1-2e18中找一数n，满足n % x = y % n

x、y范围为1e9

### 题解

设 c1x+k=n, c2n+k=y,  n=(y+c1x) / (1+c2)

打表找规律，找c1和c2的规律

枚举多组x，y，枚举c1和c2，发现当x>y时c1=1， c2=0

当x<=y时，猜测是否与y/x或y%x有关，所以一并打y/x和y%x，发现c1=y/x，c2=1

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    int _;
    cin >> _;
    while (_--) {
        ll x, y;
        cin >> x >> y;
        ll ans = (x > y ? (x + y) : ((y / x) * x + y) / 2);
        cout << ans << '\n';
    }
//    int x = 378, y = 99364;
//    //int x = 118502, y = 778;
//    cout << y / x << ' ' << y % x << '\n';
//    for (int c1 = 0; c1 <= 1000; ++c1) {
//        for (int c2 = 0; c2 <= 100000; ++c2) {
//            if ((y + c1 * x) % (1 + c2) == 0) {
//                int n = (y + c1 * x) / (1 + c2);
//                if (n % x == y % n) {
//                    cout << c1 << ' ' << c2 << ' ' << n << '\n';
//                }
//            }
//        }
//    }
    return 0;
}
```


## 树状数组

### 题意

[题链](https://codeforces.com/contest/61/problem/E)

经典的求逆序三元组的个数，求逆序对可以用归并排序和树状数组，求逆序三元组就是在逆序对的基础上求，遍历数组，只是需要把逆序对的+1变成+该位置与前面产生的逆序对数量。这样就可以求逆序k元组

注意读入long

### 题解

```java
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        long[] nums = new long[n];
        for (int i = 0; i < n; ++i) {
            nums[i] = in.nextLong();
        }
        long[] tmp = new long[n];
        System.arraycopy(nums, 0, tmp, 0, n);
        Arrays.sort(tmp);
        for (int i = 0; i < n; ++i) {
            nums[i] = Arrays.binarySearch(tmp, nums[i]) + 1;
        }
        FenwickTree fenwickTree = new FenwickTree(n);
        for (int i = 0; i < n; ++i) {
            tmp[i] = i - fenwickTree.sum((int) nums[i]);
            fenwickTree.add((int) nums[i], 1);
        }
        long ans = 0;
        long sum = 0;
        fenwickTree = new FenwickTree(n);
        for (int i = 0; i < n; ++i) {
            ans += sum - fenwickTree.sum((int) nums[i]);
            fenwickTree.add((int) nums[i], tmp[i]);
            sum += tmp[i];
        }
        System.out.println(ans);
    }
}

class FenwickTree {
    //[1, n]
    private long[] bit;
    private long n;

    public FenwickTree(int n) {
        this.bit = new long[n + 2];
        this.n = n;
    }

    public long sum(int i) {
        long s = 0;
        while (i > 0) {
            s += bit[i];
            i -= i & -i;
        }
        return s;
    }

    public void add(int i, long x) {
        while (i <= n) {
            bit[i] += x;
            i += i & -i;
        }
    }
}
```


## 欧拉降幂

### 题意

[题链](https://atcoder.jp/contests/abc228/tasks/abc228_e)

求M\^(K^N)，每个数1e18


### 题解

欧拉降幂，注意底数取模防long long溢出

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
ll qpow(ll x,ll n,ll mod) {
    ll res =1;
    while(n>0)
    {
        if(n&1) res=res*x%mod;
        x=x*x%mod;
        n>>=1;
    }
    return res;
}
const ll mod = 998244353;
const ll phimod = 998244352;
ll gcd(ll a , ll b){
    return b == 0 ? a : gcd(b , a % b);
}

int main() {
    ll n, k, m;
    cin >> n >> k >> m;
    if (m % mod == 0) {
        puts("0");
        exit(0);
    }
    ll ans;
    ans = qpow(m % mod, qpow(k % phimod, n, phimod), mod);
    cout << ans << '\n';

    return 0;
}
```


## 数论 辗转相除法 规律

### 题意

[题链](https://codeforces.com/contest/1612/problem/D)


给俩数a,b和x，范围是1e18，求是否可以如下操作使得a=x或b=x，用a、b差替换a或替换b


### 题解

如果x > 最大的数无解

一开始想的是贪心，就是什么情况替换a，什么情况替换b，然后WA爆（其实这么做本身就没有道理）

列出每种情况找规律，举个例子

![在这里插入图片描述](https://img-blog.csdnimg.cn/26ce9ee69e8f4eaa952c166cc22eda53.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_19,color_FFFFFF,t_70,g_se,x_16)

发现有些路产生的数别的路也会产生，最上面那条路始终是最快产生新数字的，所以只要考虑那条路就行，即 始终替换最大的数

这样只要模拟这个过程就行，但是会T

把这条路单独拎出来，观察发现这和求最大公约数的辗转相除法很像 

![在这里插入图片描述](https://img-blog.csdnimg.cn/877bb793239b4d5ba20460433a2eda69.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_19,color_FFFFFF,t_70,g_se,x_16)

但是少了11，这是因为11是余数4加7的结果，实际上只要满足%7=4都可以，这样就可以依赖欧几里得算法使时间复杂度变成logn

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;

#define YES cout << "YES" << '\n'
#define NO cout << "NO" << '\n'
#define Yes cout << "Yes" << '\n'
#define No cout << "No" << '\n'
#define yes cout << "yes" << '\n'
#define no cout << "no" << '\n'

bool sol(ll a, ll b, ll k) {
    if (b == 0 or k > a) return false;
    if (k % b == a % b) return true;
    return sol(b, a % b, k);
}

int main() {
    int _;
    cin >> _;
    while (_--) {
        ll a, b, k;
        cin >> a >> b >> k;
        if (a < b) swap(a, b);
        if (sol(a, b, k)) YES; else NO;
    }
    return 0;
}
```



## 计数dp 排列组合

### 题意

[题链](https://codeforces.com/contest/1606/problem/E)

有n个人，每个人初始有生命值ai，每一轮每个人生命值同时减k-1，k为该轮存活人数，生命值为<=0时死亡，问如何安排每个人的初始生命值，使得所有生命值不超过x，且最后无人生还，求方案数。

### 题解

计数，有递推关系的考虑dp

dp[i][j]表示前i个，血量不超过j的方案数，如果如果i-1 >= j，血量可以随便安排即dp[i][j] = j ^ i

否则考虑一轮后剩下k个（可能也可以假设一轮后消灭k个）

$$
dp[i][j] = \sum_{k=0}^{i}{C_i^kdp[k][j-i+1](i-1)^{i-k}}
$$

之前以为k从1开始加，然后样例过不了，发现需要加dp[0][j]=1

所以初始化为dp=0，dp[0][j]=1 （表示前0个是可行的）


```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 998244353;
ll dp[505][505];
ll qpow(ll x,ll n,ll mod){
    ll res =1;
    while(n>0)
    {
        if(n&1) res=res*x%mod;
        x=x*x%mod;
        n>>=1;
    }
    return res;
}
ll inv[505];
ll fac[505];
inline ll C(ll m,ll n){
    return fac[n]*inv[m]%mod*inv[n-m]%mod;
}
inline ll A(ll m,ll n){
    return fac[n]*inv[n-m]%mod;
}
int main() {
    for(ll i=0;i<=502;i++){
        fac[i]=1;
    }
    for(ll i=2;i<=502;i++){
        fac[i]=(fac[i-1]*i)%mod;
    }

    inv[0]=1;inv[1]=1;      //inv[0]=1 !!!
    for(ll i=2;i<=502;i++){
        inv[i]=(mod-mod/i)*inv[mod%i]%mod;
    }
    for(ll i=2;i<=502;i++){
        inv[i]=(inv[i]*inv[i-1])%mod;
    }
    ll n, x;
    cin >> n >> x;
    for (int i = 1; i <= x; ++i) {
        dp[0][i] = 1;
    }
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= x; ++j) {
            if (i - 1 >= j) dp[i][j] = qpow(j, i, mod);
            else {
                for (int k = 0; k <= i; ++k) {
                    dp[i][j] += (C(k, i) * dp[k][j - i + 1] % mod * qpow(i - 1, i - k, mod) % mod);
                    dp[i][j] %= mod;
                }
            }
        }
    }

    cout << dp[n][x];

    return 0;
}
```



## 二分 ST

### 题意

[题链](https://codeforces.com/contest/1611/problem/F)

有一个数组和一个初始数，选择最长的子区间，使得数字遍历区间时不断加上该区间的数且该数字一直不小于0，输出该区间

### 题解

二分区间长度，暴力判断，维护前缀和，用st表求区间最小值，时间复杂度O(nlognlogn)

注意二分的初始L和R，我把L设为0，wa了，要设为1

注意long long


```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
//O(nlogn) preprocess, O(1) query
// llerval minimum, maxmum, bit-or, bit-xor, gcd(less efficient than segment tree)
const ll maxlogn = 21;
const ll maxn = 2e5 + 10;
ll f[maxn][maxlogn], logn[maxn];

void pre() {
    logn[1] = 0;
    logn[2] = 1;
    for (ll i = 3; i < maxn; ++i) {
        logn[i] = logn[i / 2] + 1;
    }
}


ll dat[maxn], ini;
ll ansl, ansr;
ll n;

bool ok(ll x) {
    for (ll i = 1; i <= n - x + 1; ++i) {
        ll l = i, r = i + x - 1;
        ll s = logn[r - l + 1];
        ll tmp = min(f[l][s], f[r - (1 << s) + 1][s]);
        if (tmp - dat[i - 1] + ini >= 0) {
            ansl = l, ansr = r;
            return true;
        }
    }
    return false;
}


int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    pre();
    ll _;
    cin >> _;
    while (_--) {
        cin >> n >> dat[0];
        ini = dat[0];
        for (ll i = 1; i <= n; ++i) cin >> dat[i];
        for (ll i = 1; i <= n; ++i) dat[i] += dat[i - 1];
        for (ll i = 1; i <= n; ++i) f[i][0] = dat[i];
        for (ll j = 1; j < maxlogn; ++j) for (ll i = 1; i + (1 << j) - 1 <= n; ++i) f[i][j] = min(f[i][j - 1], f[i + (1 << (j - 1))][j - 1]);
        ll l = 1, r = n;
        //dat[0] = 0;
        while (l <= r) {
            ll mid = (l + r) >> 1;
            if (ok(mid)) l = mid + 1;
            else r = mid - 1;
        }
        if (l == 1) cout << -1 << '\n';
        else cout << ansl << ' ' << ansr << '\n';
    }
    return 0;
}
```


## 并查集 图论

### 题意

[题链](https://atcoder.jp/contests/abc229/tasks/abc229_e)

对于一个森林，按顺序删除点和所连的边，求每次删除后剩几个连通块

### 题解

反向加点，并查集，每次加点判断该点和所连的点是否在同一个连通块中，如果不在，则连通块-1（说明有一条边把两个连通块连在一起）

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;
const int maxn = 2e5 + 10;
//union find
int par[maxn];
int rankk[maxn];
int sz[maxn];

void init(int n)
{
    for(int i=0;i<n;i++)
    {
        par[i]=i;
        rankk[i]=0;
    }
}

int find(int x)
{
    if(par[x]==x) return x;
    else return par[x]=find(par[x]);
}

void unite(int x,int y)
{
    x=find(x);
    y=find(y);
    if(x==y) return ;

    if(rankk[x]<rankk[y]) par[x]=y;
    else
    {
        par[y]=x;
        if(rankk[x]==rankk[y]) rankk[x]++;
    }
}

bool  same(int x,int y)
{
    return find(x)==find(y);
}

int main() {
    int n, m;
    cin >> n >> m;
    init(n + 1);
    vector<int> G[n + 1];
    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        if (u > v) swap(u, v);
        G[u].push_back(v);
    }
    vector<int> ans;
    int cnt = 0;
    for (int i = n; i >= 1; --i) {
        cnt++;
        for (int j : G[i]) {
            if (!same(j, i)) {
                cnt--;
                unite(j, i);
            }
        }
        ans.push_back(cnt);
    }
    reverse(ans.begin(), ans.end());
    for (int i = 1; i < (int) ans.size(); ++i) cout << ans[i] << '\n';
    cout << 0 << '\n';
    return 0;
}
```


## 规律 dp

### 题意

[题链](https://codeforces.com/contest/1613/problem/D)


### 题解

像我这种不能一眼看出规律的就要多写几组数据。从前往后填数


![在这里插入图片描述](https://img-blog.csdnimg.cn/c1ae322b2e814e19ad25c2cbb4c0e779.png?x-oss-process=image,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_19,color_FFFFFF,t_70,g_se,x_16)

如果找不到规律就多写几层，可以看出每次都有3个分支，但是有些有两个分支

少掉的那个分支一定当前要填的数是前面数的mex，如果当前填的数是前面数的mex，使得现在的mex+1就可以填，否则使mex+2就不能填

三个分支填的数是前面数的mex，mex-1，mex+1，其中填mex如果造成mex+2就不能填（即前面的数有mex+1）

所以设dp[i]表示以 i 结尾的个数，num[i]表示前面mex为 i 的个数，numex[i]表示前面mex为 i 且前面没有mex+1的个数

每次dp[i] = num[a[i]-1] + num[a[i]+1] + numex[a[i]] 注意判断a[i]-1>=0

更新num，numex，如果选了前面mex为a[i]-1则mex不变，个数翻倍，num[a[i]-1]\*=2，但是出现了mex+1，所以不更新numex

如果选了前面mex为a[i]+1，mex不变，个数翻倍，num[a[i]+1]\*=2，numex[a[i]+1]\*=2

如果选了前面mex为a[i]，mex变成mex+1，num[a[i]+1] += numex[a[i]]，考虑是否更新numex即前面是否有mex+2，一定不会有，所以numex[a[i]+1] += numex[a[i]]

最后特判，如果当前数是0，dp[i]++ num[1]++ numex[1]++

当前数是1，dp[i]++ num[0]++;

初始化全为0

答案为dp求和

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 998244353;
int main() {
    int _;
    cin >> _;
    while (_--) {
        int n;
        cin >> n;
        vector<int> a(n + 5);
        for (int i = 1; i <= n; ++i) cin >> a[i];
        vector<ll> dp(n + 5);
        vector<ll> num(n + 5), numex(n + 5);
        for (int i = 1; i <= n; ++i) {
            if (a[i] - 1 >= 0)
                dp[i] = num[a[i] - 1] + num[a[i] + 1] % mod + numex[a[i]] % mod;
            else
                dp[i] = num[a[i] + 1] % mod + numex[a[i]] % mod;
            if (a[i] - 1 >= 0) num[a[i] - 1] = (num[a[i] - 1] * 2) % mod;
            num[a[i] + 1] *= 2;
            num[a[i] + 1] %= mod;
            numex[a[i] + 1] *= 2;
            numex[a[i] + 1] %= mod;
            num[a[i] + 1] += numex[a[i]];
            num[a[i] + 1] %= mod;
            numex[a[i] + 1] += numex[a[i]];
            numex[a[i] + 1] %= mod;
            if (a[i] == 0) {
                dp[i]++;
                dp[i] %= mod;
                num[1]++;
                num[1] %= mod;
                numex[1]++;
                numex[1] %= mod;
            }
            if (a[i] == 1) {
                dp[i]++;
                dp[i] %= mod;
                num[0]++;
                num[0] %= mod;
            }
        }
        ll ans = 0;
        for (int i = 1; i <= n; ++i) {
            ans += dp[i];
            ans %= mod;
        }
        cout << ans << '\n';
    }
    return 0;
}
```

