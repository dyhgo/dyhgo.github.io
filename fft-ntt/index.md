# FFT & NTT


## 前言

一篇没什么用的文章，记录一下FFT和NTT的板子

fft和ntt的原理参考[FFT](https://blog.csdn.net/enjoy_pascal/article/details/81478582) & [NTT](https://blog.csdn.net/enjoy_pascal/article/details/81771910?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522160095020619724848323912%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=160095020619724848323912&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v28-1-81771910.pc_first_rank_v2_rank_v28&utm_term=ntt&spm=1018.2118.3001.4187)


## 概述

fft和ntt差不多，基础用法就是加速多项式乘法，把多项式从系数表示转成点值表示来方便计算，而要转成点值表示，不能选择任意点。有些点的若干次方是1（实际上可以是-1,+i,-i等等），这样不需要做所有的次方运算，而这些点在复平面单位圆上。在ntt中是拿[原根](https://blog.csdn.net/enjoy_pascal/article/details/81771910?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522160095020619724848323912%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=160095020619724848323912&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v28-1-81771910.pc_first_rank_v2_rank_v28&utm_term=ntt&spm=1018.2118.3001.4187)替换fft的单位根。
它们的时间复杂度都是O(nlgn)


## 优缺点

ntt能取模，没有浮点精度误差，但是系数必须是整数，模数通常是998244353，原根是3

fft和ntt还有很多扩充的技巧和应用

以多项式乘法为例

## 模板

### fft

```cpp
typedef complex<double> cp ;
const double pi = acos(-1);
int m, n;
const int maxn = 4 * 1e6 + 2; //记得开大点 因为2的幂次，最好乘4
cp a[maxn], b[maxn];   // a表示第一个多项式的系数（按幂次递增）
int rev[maxn];
int bt;   // 扩展成2的次幂后的二进制位数
int mn;   //相乘后的最高次幂即mn = m + n，m和n分别是最高次幂
int fmn;  //扩展成2的次幂的最高次幂
void fft(cp* x, int len, int sign){  //sign表示共轭复数的符号
    for(int i = 0; i < len; ++i){
        if(i < rev[i]) swap(x[i], x[rev[i]]);
    }
    for(int i = 1; i < len; i <<= 1){
        cp tmp(cos(pi / i), sign * sin(pi / i));
        for(int k = i << 1, j = 0; j < len; j += k){
            cp omega(1, 0);
            for(int l = 0; l < i; l++, omega *= tmp){
                cp p = x[j + l], q = omega * x[j + l + i];
                x[j + l] = p + q, x[j + l + i] = p - q;
            }
        }
    }
}
```

### ntt

```cpp
const ll mod = 998244353;   //一般意义下的模数
const ll g = 3;   //998244353对应的原根
ll m, n;
const ll maxn = 4 * 1e6 + 2; //记得开大点
ll a[maxn], b[maxn];
ll rev[maxn];
ll bt;
ll mn;
ll fmn;
ll qpow(ll x, ll nn){
    ll res = 1;
    while(nn > 0){
        if(nn & 1) res = res * x % mod;
        x = x * x % mod;
        nn >>= 1;
    }
    return res;
}
void ntt(ll x[], ll len, int type){
    for(ll i = 0; i < len; ++i){
        if(i < rev[i])  swap(x[i], x[rev[i]]);
    }
    for(ll i = 1; i < len; i *= 2){
        ll tmp = qpow(g, (mod - 1) / (i * 2)    );
        if(type == -1) tmp = qpow(tmp, mod - 2);
        for(ll j = 0; j < len; j += i * 2){
            ll omega = 1;
            for(ll k = 0; k < i; ++k, omega = omega * tmp % mod){
                ll p = x[j + k], q = omega * x[j + k + i] % mod;
                x[j + k] = (p + q) % mod, x[j + k + i] = (p - q + mod) % mod;
            }
        }
    }
}
```

## 模板题

### 多项式乘法

[题目](https://www.luogu.com.cn/problem/P3803)

#### fft实现

```cpp
#include "bits/stdc++.h"
using namespace std;
typedef long long ll ;
typedef complex<double> cp ;
const double pi = acos(-1);
int m, n;
const int maxn = 4 * 1e6 + 2; //记得开大点
cp a[maxn], b[maxn];
int rev[maxn], ans[maxn];
int bt;
int mn;
int fmn;
void fft(cp* x, int len, int sign){
    for(int i = 0; i < len; ++i){
        if(i < rev[i]) swap(x[i], x[rev[i]]);
    }
    for(int i = 1; i < len; i <<= 1){
        cp tmp(cos(pi / i), sign * sin(pi / i));
        for(int k = i << 1, j = 0; j < len; j += k){
            cp omega(1, 0);
            for(int l = 0; l < i; l++, omega *= tmp){
                cp p = x[j + l], q = omega * x[j + l + i];
                x[j + l] = p + q, x[j + l + i] = p - q;
            }
        }
    }
}
int main() {
    scanf("%d%d", &m, &n);
    for(int i = 0; i <= m; ++i){
        scanf("%lf", &a[i]);
    }
    for(int i = 0; i <= n; ++i){
        scanf("%lf", &b[i]);
    }
    mn = m + n;
    for(fmn = 1; fmn <= mn; fmn <<= 1) bt++;
    for(int i = 0; i < fmn; ++i) rev[i] = (rev[i >> 1] >> 1) | ((i & 1) << (bt - 1));
    fft(a, fmn, 1);
    fft(b, fmn, 1);
    for(int i = 0; i <= fmn; ++i) a[i] = a[i] * b[i];
    fft(a, fmn, -1);
    for(int i = 0; i <= mn; ++i) printf("%d ", (int)(a[i].real()/fmn + 0.5));
    return 0;
}
```


#### ntt实现

```cpp
#include "bits/stdc++.h"
using namespace std;
typedef long long ll ;
const ll mod = 998244353;
const ll g = 3;
ll m, n;
const ll maxn = 4 * 1e6 + 2; //记得开大点
ll a[maxn], b[maxn];
ll rev[maxn], ans[maxn];
ll bt;
ll mn;
ll fmn;
ll qpow(ll x, ll nn){
    ll res = 1;
    while(nn > 0){
        if(nn & 1) res = res * x % mod;
        x = x * x % mod;
        nn >>= 1;
    }
    return res;
}
void ntt(ll x[], ll len, int type){
    for(ll i = 0; i < len; ++i){
        if(i < rev[i])  swap(x[i], x[rev[i]]);
    }
    for(ll i = 1; i < len; i *= 2){
        ll tmp = qpow(g, (mod - 1) / (i * 2)    );
        if(type == -1) tmp = qpow(tmp, mod - 2);
        for(ll j = 0; j < len; j += i * 2){
            ll omega = 1;
            for(ll k = 0; k < i; ++k, omega = omega * tmp % mod){
                ll p = x[j + k], q = omega * x[j + k + i] % mod;
                x[j + k] = (p + q) % mod, x[j + k + i] = (p - q + mod) % mod;
            }
        }
    }
}
int main() {
    scanf("%d%d", &m, &n);
    for(int i = 0; i <= m; ++i){
        scanf("%lld", &a[i]);
        a[i] += mod;
        a[i] %= mod;
    }
    for(int i = 0; i <= n; ++i){
        scanf("%lld", &b[i]);
        b[i] += mod;
        b[i] %= mod;
    }
    mn = m + n;
    for(fmn = 1; fmn <= mn; fmn <<= 1) bt++;
    for(int i = 0; i < fmn; ++i) rev[i] = (rev[i >> 1] >> 1) | ((i & 1) << (bt - 1));
    ntt(a, fmn, 1);
    ntt(b, fmn, 1);
    for(ll i = 0; i <= fmn; ++i) a[i] = (a[i] * b[i]) % mod;
    ntt(a, fmn, -1);
    ll inv_fmn = qpow(fmn, mod - 2);
    for(ll i = 0; i <= mn; ++i){
        printf("%lld ", a[i] * inv_fmn % mod);
    }
    return 0;
}
```

### 高精度乘法

#### fft实现

```cpp
#include "bits/stdc++.h"
using namespace std;
typedef complex<double> cp ;
const double pi = acos(-1);
int m, n;
const int maxn = 4 * 1e6 + 2; //记得开大点
cp a[maxn], b[maxn];
int rev[maxn];
int ans[maxn];
int bt;
int mn;
int fmn;
void fft(cp* x, int len, int sign){
    for(int i = 0; i < len; ++i){
        if(i < rev[i]) swap(x[i], x[rev[i]]);
    }
    for(int i = 1; i < len; i <<= 1){
        cp tmp(cos(pi / i), sign * sin(pi / i));
        for(int k = i << 1, j = 0; j < len; j += k){
            cp omega(1, 0);
            for(int l = 0; l < i; l++, omega *= tmp){
                cp p = x[j + l], q = omega * x[j + l + i];
                x[j + l] = p + q, x[j + l + i] = p - q;
            }
        }
    }
}
int main() {
    string s1, s2;
    cin >> s1 >> s2;
    m = s1.size() - 1;
    n = s2.size() - 1;
    for(int i = 0; i <= m; ++i){
        a[i] = (double) (s1[m - i] - '0');
    }
    for(int i = 0; i <= n; ++i){
        b[i] = (double) (s2[n - i] - '0');
    }
    mn = m + n;
    for(fmn = 1; fmn <= mn; fmn <<= 1) bt++;
    for(int i = 0; i < fmn; ++i) rev[i] = (rev[i >> 1] >> 1) | ((i & 1) << (bt - 1));
    fft(a, fmn, 1);
    fft(b, fmn, 1);
    for(int i = 0; i <= fmn; ++i) a[i] = a[i] * b[i];
    fft(a, fmn, -1);
    for(int i = 0; i <= mn; ++i){
        ans[i] += (int) (a[i].real() / fmn + 0.5);  // 注意+= 不是 =
        ans[i + 1] += ans[i] / 10 ;
        ans[i] %= 10;
    }
    if((mn == 0 and ans[0] == 0) or (mn > 0 and ans[1] == 0)) {
        puts("0");
        exit(0);
    }
    for(int i = mn + 1; i >= 0; --i){  //进位
        if(ans[i] == 0 and i == mn + 1)
            continue;
        cout << ans[i];
    }
    return 0;
}
```


#### ntt实现

```cpp
#include "bits/stdc++.h"
using namespace std;
typedef long long ll ;
const ll mod = 998244353;
const ll g = 3;
ll m, n;
const ll maxn = 4 * 1e6 + 2; //记得开大点
ll a[maxn], b[maxn];
ll rev[maxn];
ll ans[maxn];
ll bt;
ll mn;
ll fmn;
ll qpow(ll x,ll nn){
    ll res = 1;
    while(nn > 0){
        if(nn & 1) res = res * x % mod;
        x = x * x % mod;
        nn >>= 1;
    }
    return res;
}
void ntt(ll x[], ll len, int type){
    for(ll i = 0; i < len; ++i){
        if(i < rev[i])  swap(x[i], x[rev[i]]);
    }
    for(ll i = 1; i < len; i *= 2){
        ll tmp = qpow(g, (mod - 1) / (i * 2));
        if(type == -1) tmp = qpow(tmp, mod - 2);
        for(ll j = 0; j < len; j += i * 2){
            ll omega = 1;
            for(ll k = 0; k < i; ++k, omega = omega * tmp % mod){
                ll p = x[j + k], q = omega * x[j + k + i] % mod;
                x[j + k] = (p + q) % mod, x[j + k + i] = (p - q + mod) % mod;
            }
        }
    }
}
int main() {
    string s1, s2;
    cin >> s1 >> s2;
    m = s1.size() - 1;
    n = s2.size() - 1;
    for(int i = 0; i <= m; ++i){
        a[i] = s1[m - i] - '0';
    }
    for(int i = 0; i <= n; ++i){
        b[i] = s2[n - i] - '0';
    }
    mn = m + n;
    for(fmn = 1; fmn <= mn; fmn <<= 1) bt++;
    for(int i = 0; i < fmn; ++i) rev[i] = (rev[i >> 1] >> 1) | ((i & 1) << (bt - 1));
    ntt(a, fmn, 1);
    ntt(b, fmn, 1);
    for(ll i = 0; i <= fmn; ++i) {
        a[i] = a[i] * b[i] % mod;
    }
    ntt(a, fmn, -1);
    ll inv_fmn = qpow(fmn, mod - 2);
    for(ll i = 0; i <= fmn; ++i){
        ans[i] += a[i] * inv_fmn % mod;
        ans[i + 1] = ans[i] / 10;
        ans[i] %= 10;
    }
    if((mn == 0 and ans[0] == 0) or (mn > 0 and ans[1] == 0)) {
        puts("0");
        exit(0);
    }
    for(int i = mn + 1; i >= 0; --i){  //进位
        if(ans[i] == 0 and i == mn + 1)
            continue;
        cout << ans[i];
    }
    return 0;
}
```

接下来了解下trie树，国庆做点dp题

