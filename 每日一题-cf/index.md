# 每日一题 (CF)



> 在这篇文章下更新CodeForces的每日一题，每日一题并不是为了提高编程水平，而是保持手感，从10月2日开始更新，应该过几天批量更新一次

## 10.2 扫描线

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


## 10.3 贪心，实现

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

