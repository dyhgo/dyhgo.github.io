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



