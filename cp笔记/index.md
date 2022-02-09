# CP笔记



记录的东西十分零散，适用于速查，不适合系统学习

由于记录的时候所掌握的知识很浅，所以可能存在错误


## 快速排序

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;

void quicksort(int s[], int l, int r) {
    if (l < r) {
        int i = l, j = r, x = s[l];
        while (i < j) {
            while (i < j && s[j] >= x)
                j--;
            if (i < j)
                s[i++] = s[j];
            while (i < j && s[i] < x)
                i++;
            if (i < j)
                s[j--] = s[i];
        }
        s[i] = x;
        quicksort(s, l, i - 1);
        quicksort(s, i + 1, r);
    }
}

int main() {

    int a[10] = {3, 5, 1, 8, 9, 4, 2, 6, 0, 1};
    int i;
    quicksort(a, 1, 9);
    for (i = 0; i < 10; i++)
        cout << a[i] << ' ';
    

    return 0;
}

//3 0 1 1 2 4 5 6 8 9
```


## 产生随机数

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;

//#include <random>
//#include <chrono>
    

int main() {

    mt19937 rd(chrono::steady_clock::now().time_since_epoch().count());
    cout << rd() % 101 + 1;

    return 0;
}

```


## STL

### set

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;


int main() {

    set<int> st;
    int a[] = {1, 2, 3};
    st.insert(a, a + 3);
    st.erase(2);
    for (int i : st) {
        cout << i << ' ';
    }
    st.erase(st.begin(), st.end());
    return 0;
}

//1 3

```

[集合运算](https://da1yh.xyz/c-%E4%BA%A4%E9%9B%86%E5%B9%B6%E9%9B%86%E5%B7%AE%E5%AF%B9%E7%A7%B0%E5%B7%AE%E5%87%BD%E6%95%B0/)


### map

和set差不多

map按key倒序排

```cpp
map<int, int, greater<int>> mp;
```

map想按value排，就要提取出来变成vector<pair<int, int>>


### 其他

multiset允许值重复

multimap允许key重复


## 约瑟夫环

总共有people个人，喊到num的倍数退出，求最后一个人


```cpp
int Josephus(int people, int num) {
    int i, r = 0;
    for (i = 2; i <= people; i++)
        r = (r + num) % i;
    return r + 1;
}
```



## 流操作符boolalpha

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;


int main() {


    bool a = true;
    cout << boolalpha << a;

    return 0;
}
```


## 自定义排序

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;

struct cmp {
    bool operator()(const int &l, const int &r) const {
        return l > r;
    }
};

int main() {

    set<int, cmp> s;
    return 0;
}
```


```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;

struct Student {
    int a;

    bool operator<(const Student &s) const {
        return this->a > s.a;
    }
};

int main() {

    set<Student> s;
    return 0;
}
```


## 字符串和字符

c语言有关函数


```cpp
#include <bits/stdc++.h>
#include <cctype>

using namespace std;
using ll = long long;

#define log(x) cout << x << '\n'

int main() {
    char x ;
    isalpha(x);
    isdigit(x);
    isupper(x);
    islower(x);
    isalnum(x);
    isblank(x); // space \t
    isspace(x); // space \t \r \n


    char a[20] = "hello";
    char b[20] = " world";
    char c[20];
    strcpy(c, a);
    log(c);     // hello
    memset(c, 0, sizeof(c));
    strncpy(c, a, 3);
    log(c);     // hel
    strcat(a, b);   // a = a + b
    log(a);     // hello world
    log(strlen(a));     // 11
    bool yes = strcmp(a, b);
    char* chptr = strchr(a, 'l');
    log(chptr);     // llo world
    char* chptr2 = strstr(a, "rl");
    log(chptr2);    // rld

    return 0;
}
```

string有时要用c_str()


## 背包问题


01背包2维

```cpp
int n;  // 物品个数
    int W;  // 背包容量
    int dp[n + 5][W + 5];
    int w[n + 5];  // 每个物品的体积
    int v[n + 5];   // 每个物品的价值
    for (int i = 1; i <= n; ++i) {
        for (int j = 0; j <= W; ++j) {
            if(j < w[i]) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - w[i]] + v[i]);
            }
        }
    }
    cout << dp[n][W];
```


完全背包 2维

```cpp
int n;  // 物品个数
    int W;  // 背包容量
    int dp[n + 5][W + 5];
    int w[n + 5];  // 每个物品的体积
    int v[n + 5];   // 每个物品的价值
    for (int i = 1; i <= n; ++i) {
        for (int j = 0; j <= W; ++j) {
            if(j < w[i]) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - w[i]] + v[i]);   // 注意是dp[i]不是dp[i-1]
            }
        }
    }
    cout << dp[n][W];
```


完全背包2维公式推导

![在这里插入图片描述](https://img-blog.csdnimg.cn/c984a8a7d4f34a8cb857f9ed297285c9.png?x-oss-process=image,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_14,color_FFFFFF,t_70,g_se,x_16)



01背包1维

```cpp
for (int i = 1; i <= n; ++i) 
        for (int j = W; j >= w[i]; j--) 
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    return dp[W];
```

完全背包1维

```cpp
for (int i = 1; i <= n; ++i) 
        for (int j = w[i]; j <= W; j++) 
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    return dp[W];
```




## memset

memset只能初始化0, 1, 0x3f, 0xc0这种的，不能写2,3这种的


## binary_search

binary_search 用在有序数组里

```cpp
#include <algorithm>

vector<int> v = {1, 2, 3};
bool condition = binary_search(v.begin(), v.begin() + 2, 1);
```


## next_permutation


next_permutation

```cpp
#include <algorithm>
int a[3] = {1, 2, 3};
    do {
        cout << a[0] << ' ' << a[1] << ' ' << a[2] << '\n';
    }while (next_permutation(a, a + 3));

//1 2 3
//1 3 2
//2 1 3
//2 3 1
//3 1 2
//3 2 1
```


next_permutation只能用在数字和字符中

prev_premutation类似


## unique

unique作用域有序数组


```cpp
vector<int> a = {3, 3, 2, 2, 1, 1};
sort(a.begin(), a.end());
a.erase(unique(a.begin(), a.end(), [&](int i, int j){return (i + 1) == j;}), a.end());
```


## 加速读写

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
cout.tie(nullptr);
```

这样最好只用cin cout，不要用scanf和printf和gets()和puts()

scanf和printf比这种加速读写快


## While 读取

```cpp
int a;
while (~scanf("%d", &a)) {

}
while (scanf("%d", &a) != EOF) {
        
}
```


## sizeof退化

```cpp
#include <bits/stdc++.h>
#include <algorithm>

using namespace std;
using ll = long long;

#define log(x) cout << x << '\n'

void fun(int a[]) {
    cout << sizeof(a) << '\n';
}


int main() {

    int a[] = {1, 2, 3, 4, 5, 6, 7};
    fun(a); // output 8


    return 0;
}
```

此处int[]变为指针，sizeof算的是地址长度，不是数组长度




## find

string的find没找到返回string::npos，stl返回end()，找到则返回下标的迭代器或偏移地址







