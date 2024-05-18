# Codeforces Round #688 (Div. 2) A~D



## [A. Cancel the Trains](https://codeforces.com/contest/1453/problem/A)

### 题意

给一个铁路网，和每个火车所在的铁路（都在起点），每一时刻走一格，问有几辆车会相撞

### 题解

编号相同的横向和列向火车会相撞

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int a[105];
int b[105];
int main() {
    int _;
    cin >> _;
    while (_--) {
        int n, m;
        cin >> n >> m;
        for(int i = 0; i < n; ++i){
           cin >> a[i];
        }
        for(int i = 0; i < m; ++i){
            cin >> b[i];
        }
        int num = 0;
        for(int i = 0; i < n; ++i){
            for(int j = 0; j < m; ++j){
                if(a[i] == b[j]) num++;
            }
        }
        cout << num << endl;
    }
    return 0;
}
```

## [B. Suffix Operations](https://codeforces.com/contest/1453/problem/B)

### 题意
给一个数组，刚开始时可以选择将一个数改成任何数，也可以不改，做以下操作直到每个数相等

将某一后缀都加1或减1

求最小该操作数

### 题解

如果没有刚开始的操作，那么操作数是固定的，是前一个数减后一个数再求和

然后再尝试修改每个数，中途求操作数的最小值

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
ll a[200005];
int main() {
    int _;
    cin >> _;
    while (_--) {
        ll n;
        cin >> n;
        for(int i = 0; i < n; ++i) cin >> a[i];
        ll ans = 0;
        for(int i = 0; i < n - 1; ++i){
            ans += abs(a[i] - a[i + 1]);
        }
        ll tmp = ans;
        for(int i = 1; i < n - 1; ++i){
            ll tt = tmp - abs(a[i - 1] - a[i]);
            tt -= abs(a[i] - a[i + 1]);
            tt += abs(a[i - 1] - a[i + 1]);
            ans = min(ans, tt);
        }
        ll tt = tmp - abs(a[n - 2] - a[n - 1]);
        ans = min(ans, tt);
        tt = tmp - abs(a[0] - a[1]);
        ans = min(ans, tt);
        cout << ans << endl;
    }
    return 0;
}
```

## [C. Triangles](https://codeforces.com/contest/1453/problem/C)

### 题意

给一个正方形，每个格子都填数字0~9，对于每个数字，求对应数字的最大面积的三角形，该三角形满足以下条件

顶点可重合

顶点必须在该数字的格子上

允许将其中一个格子改成任何数字（也可以不改）

至少有一条边竖直或水平

如果这条边由两个重合的点组成，则这条边竖直且水平

### 题解

模拟

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
char a[2005][2005];
char b[2005][2005];
int origin[10][2005];
int dynamic[10][2005];
int low[10];
int hi[10];
int ans[10];
int main() {
    int _;
    cin >> _;
    while (_--) {
        memset(origin, -1, sizeof(origin));
        memset(dynamic, -1, sizeof(dynamic));
        memset(low, 0x3f, sizeof(low));
        memset(hi, -1, sizeof(hi));
        memset(ans, 0, sizeof(ans));
        int n;
        cin >> n;
        for(int i = 0; i < n; ++i) cin >> a[i];

        for(int i = 0; i < n; ++i){
            vector<int> x[10];
            for(int j = 0; j < n; ++j){
                low[a[i][j] - '0'] = min(low[a[i][j] - '0'], i);
                hi[a[i][j] - '0'] = max(hi[a[i][j] - '0'], i);

                dynamic[a[i][j] - '0'][i] = max(dynamic[a[i][j] - '0'][i], abs(0 - j));
                dynamic[a[i][j] - '0'][i] = max(dynamic[a[i][j] - '0'][i], abs(n - 1 - j));

                x[a[i][j] - '0'].push_back(j);

            }
            for(int p = 0; p < 10; ++p){
                //sort(x[p].begin(), x[p].end());
                if(x[p].size() < 2) continue;
                origin[p][i] = *max_element(x[p].begin(), x[p].end()) - *min_element(x[p].begin(), x[p].end());
            }
        }

        for(int i = 0; i < 10; ++i){
            int tmp = 0;
            //origin
            for(int j = 0; j < n; ++j){
                if(origin[i][j] == -1) continue;
                tmp = max(tmp, origin[i][j] * max(abs(j - 0), abs(n - 1 - j)));
            }
            //dynamic
            if(low[i] == 0x3f3f3f3f or hi[i] == -1) continue;
            for(int j = 0; j < n; ++j){
                if(dynamic[i][j] == -1) continue;
                tmp = max(tmp, dynamic[i][j] * max(abs(j - low[i]), abs(j - hi[i])));
            }
            ans[i] = tmp;
        }
        //cout << hi[2] << endl;
        for(int i = 0; i < n; ++i){
            for(int j = 0; j < n; ++j){
                b[i][j] = a[j][i];
            }
        }
        for(int i = 0; i < n; ++i){
            for(int j = 0; j < n; ++j){
                a[i][j] = b[i][j];
            }
        }
        memset(origin, -1, sizeof(origin));
        memset(dynamic, -1, sizeof(dynamic));
        memset(low, 0x3f, sizeof(low));
        memset(hi, -1, sizeof(hi));
        for(int i = 0; i < n; ++i){
            vector<int> x[10];
            for(int j = 0; j < n; ++j){
                low[a[i][j] - '0'] = min(low[a[i][j] - '0'], i);
                hi[a[i][j] - '0'] = max(hi[a[i][j] - '0'], i);

                dynamic[a[i][j] - '0'][i] = max(dynamic[a[i][j] - '0'][i], abs(0 - j));
                dynamic[a[i][j] - '0'][i] = max(dynamic[a[i][j] - '0'][i], abs(n - 1 - j));

                x[a[i][j] - '0'].push_back(j);

            }
            for(int p = 0; p < 10; ++p){
                //sort(x[p].begin(), x[p].end());
                if(x[p].size() < 2) continue;
                origin[p][i] = *max_element(x[p].begin(), x[p].end()) - *min_element(x[p].begin(), x[p].end());
            }
        }
        for(int i = 0; i < 10; ++i){
            int tmp = 0;
            //origin
            for(int j = 0; j < n; ++j){
                if(origin[i][j] == -1) continue;
                tmp = max(tmp, origin[i][j] * max(abs(j - 0), abs(n - 1 - j)));
            }
            //dynamic
            if(low[i] == 0x3f3f3f3f or hi[i] == -1) continue;
            for(int j = 0; j < n; ++j){
                if(dynamic[i][j] == -1) continue;
                tmp = max(tmp, dynamic[i][j] * max(abs(j - low[i]), abs(j - hi[i])));
            }
            ans[i] = max(ans[i], tmp);
        }
        for(int i = 0; i < 10; ++i){
            printf("%d%c", ans[i], i == 9 ? '\n' : ' ');
        }
    }
    return 0;
}
```

## [D. Checkpoints](https://codeforces.com/contest/1453/problem/D)

### 题意

有n个阶段，有些阶段有检查点，每次有一半的概率通过阶段，如果没有通过，则返回到之前最近的一个检查点（保证第一个阶段是检查点）（如果该阶段是检查点且没通过，则不动（即返回自身）），直到通过所有阶段

给定k为通过所有阶段的期望尝试值，求一种可能的阶段数和检查点设置情况（1为设置检查点，0为没有检查点）

### 题意

构造

奇数一定无解

考虑10000。。。的情况，如果是10，则需要6次，第一阶段的时刻是[1,2,4,5]第二个阶段的时刻是[3,6]

如果是100，则需要14次，第一阶段的时刻是[1,2,4,5,8,9,11,12]第二个阶段的时刻是[3,6,10,13]，第三个阶段的时刻是[7,14]，经过分析和找规律发现如果10000的长度为i，则答案为2^i - 2，这样问题就转化成对k求变形二进制，然后将1000序列接在一起


```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int main() {
    int _;
    cin >> _;
    while (_--) {
        vector<int> ans;
        ll n;
        cin >> n;
        if(n & 1) {
            puts("-1");
            continue;
        }
        for(ll i = 60; i >= 1; --i){
            ll tmp = (2ll << i) - 2;
            while (n >= tmp){
                n -= tmp;
                ans.push_back(1);
                ans.insert(ans.end(), i - 1, 0);
            }
        }
        cout << ans.size() << endl;
        for(int i = 0; i < ans.size(); ++i){
            cout << ans[i] << " \n"[i == ans.size() - 1];
        }
    }
    return 0;
}
```


