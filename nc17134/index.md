# NC17134



# [Symmetric Matrix](https://ac.nowcoder.com/acm/problem/17134)

## 题目描述

Count the number of n x n matrices A satisfying the following condition modulo m.
* Ai, j ∈ {0, 1, 2} for all 1 ≤ i, j ≤ n.
* Ai, j = Aj, i for all 1 ≤ i, j ≤ n.
* Ai, 1 + Ai, 2 + ... + Ai, n = 2 for all 1 ≤ i ≤ n.
* A1, 1 = A2, 2 = ... = An, n = 0.

## 输入描述


The input consists of several test cases and is terminated by end-of-file.
Each test case contains two integers n and m.

## 输出描述



For each test case, print an integer which denotes the result.

## 样例输入

3 1000000000
100000 1000000000

## 样例输出

1
507109376


## 限制

* 1 ≤ n ≤ 105
* 1 ≤ m ≤ 109
* The sum of n does not exceed 107.

## 题解

挺好一道题目

这个题分三个步骤

1.根据题意转化成图的邻接矩阵

2.使用dp，找dp递推式

3.化简递推式

1.把题目转化成求n个点的无向图个数满足，没有自环，如果组成圈则边权为1

如果是两个点相连则权值为2（参考下面的图片）

2.`f[n]` 表示 `n` 个点时的方案数

那么第 `n` 个点依赖于前 `n-1` 个点

考虑两种情况

① 将 `n-1` 个点中的一个点拉出来与第 `n` 个点组成边权为2的点对，对于每一种方

案都有 `n-1` 个点可选，剩下的 `n-2` 个点方案数为 `f[n-2]` 所以 `f[n] += (n-1)*f[n-2]`

② 把第 `n` 个点与前 `n-1` 个点组成圈

考虑选 `k` 个点出来，那么就有 

$$ 
C_{n-1}^{k} 
$$ 

种选法

对于选出来的 `k` 个点全排列，有 

$$ 
A_{k}^{k} 
$$ 

种，剩下的情况有 `f[n-1-k]` 种

由于圈的首位相连，所以 `/2`

那么所有的方案是

$$ 
\frac{1}{2}  \sum\limits_{k=2}  ^ {n-1} {C_{n-1}^{k}A_{k}^{k}f[n-1-k]}
$$

这样并不会重复，因为每次参与形成圈的点数是不同的，这一定互异

3.化简

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200502110448288.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)


最终式 `f[n] = (n-1) * (f[n-1] + f[n-2]) - 1/2 * (n-1) * (n-2) * f[n-3]`

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll ans[100005];
int main(){
    ll n,m;
    ans[0] = 1;
    ans[1] = 0;
    ans[2] = 1;
    ans[3] = 1;
    
    while(cin>>n>>m){
        for(ll i=4;i<=n;i++){
            ans[i] = 0;
        }
        for(ll i = 4;i<=n;i++){
            ans[i] += ((i-1)*((ans[i-1]+ans[i-2])%m)%m);
            ans[i] -= (((i-1)*(i-2)/2%m)*ans[i-3])%m;
            ans[i] += m;
            ans[i] %= m;
        }
        cout<<ans[n]%m<<endl;
    }
    return 0;
}
```

