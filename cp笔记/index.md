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

古老的生成随机数的方法

```cpp
srand(time(nullptr));
    cout << rand() % 30 + 2 << '\n';

//大随机数
    long long r = 123456789;
    cout << rand() * r / RAND_MAX;
```

c++11生成随机数的方法


```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;

//#include <random>
//#include <chrono>
    

int main() {

    mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
    //cout << rd() % 101 + 1;
    uniform_int_distribution<int> dis(2, 100);  //闭区间
    cout << dis(rng);

    return 0;
}

```

以下这种方法更好，但只在Linux下有效，在win下无效，在win下会生成固定顺序的随机数

```cpp
mt19937 gen{random_device{}()};
    uniform_int_distribution<int> dis(4, 70);   //闭区间
    for (int i = 0; i < 10; i++) {
        cout << dis(gen) << '\n';
    }
//    41
//    52
//    27
//    65
//    4
//    43
//    62
//    38
//    68
//    69
```

### 洗牌

```cpp
vector<int> a{1, 2, 3, 4, 5, 6};
    mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
    shuffle(a.begin(), a.end(), rng);
    for (int i : a) {
        cout << i << ' ';
    }
    //3 4 5 1 2 6
```



## STL

### list


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

想要询问map是否存在一个key，不应该用map[key]==0来判断，应该用map.find(key) == mp.end()来判断



### deque

双端队列

front() back() clear() erase() insert(pos, v) insert(pos, n, v) push_back() pop_back() push_front() pop_front()

### stack

push() pop() top() empty() size()

find() unique() sort() count()

### queue

push() pop() front() empty() size() back()

find() unique() sort() count()

queue和stack没有clear()，要清空应该这样

```cpp
queue<int> a;
    a.push(2);
    a.push(1);
    cout << a.size() << '\n';   //2
    queue<int> tmp;
    swap(tmp, a);
    cout << a.size() << '\n';   //0

    stack<int> s;
    s.push(3);
    s.push(2);
    cout << s.size() << '\n';   //2
    stack<int> t;
    swap(t,s);
    cout << s.size() << '\n';   //0
```



### 其他

multiset允许值重复

multiset的erase(x)会把所有x都删掉，而不是删一个

multimap允许key重复

求数组中k出现几次的一种方法，排序+二分查找，upper_bound - lower_bound

set\<int\> s; map\<int\> m

s.lower_bound()比lower_bound(s.begin(),s.end())要快很多，内置的lower_bound()是专为红黑树写的


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
        return this->a > s.a;	//始终把this放s前，不能是s.a < this->a
    }
};

int main() {

    set<Student> s;
    return 0;
}
```


## 字符串和字符

### c语言有关函数 strXXX


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

### 子串相关

```cpp
string a = "qwer";
cout << a.find("we");   // 1
cout << a.substr(1, 2); // we
```

### 字符串和字符数组的转化 string to char[]


字符串转字符数组

```cpp
    char a[20];
    string s = "qwer";
    strcpy(a, s.c_str());
    cout << a << '\n';  // qwer
```


字符数组转字符串

```cpp
char x[] = "wertt";
    string s = x;
    cout << s; //wertt
```


### 按字符分割字符串 strtok

```cpp
char s[] = "s1mple is the best sniper of the world";
    char* token;
    token = strtok(s, " ");
    while (token != nullptr) {
    //vector<string> v;
        //v.push_back(token);
        cout << token << '\n';
        token = strtok(nullptr, " ");
    }
```

### char[]从下标为1开始读入

```cpp
char a[20];
    scanf("%s", a + 1);
    cout << strlen(a + 1);
```


### 其他

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

## memmove

```cpp
int a[3] = {2, 1, 3};
    int b[20];
    memmove(b, a + 1, 2 * sizeof(int));
    for (int i = 0; i < 2; i++) {
        cout << b[i] << ' ';
    }
    //1 3
```


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


## incline

内联函数，如果一个自定义函数内容较少且调用次数较多，可以在函数前加incline，这样调用时，直接将代码复制，避免大开销


## 浮点数的向下取整

```cpp
double x = 2.4567;
printf("%.2f", x);  // 四舍五入
printf("%.2f", floor(x * 100) / 100); // 向下取整，保留几位就乘pow(10,n)
    
    // 2.46
    // 2.45
```

## merge

使用merge之前要对数组分配空间，vector可以用resize，merge(first1, last1, first2, last2, dest, cmp)

```cpp
vector<int> a{3, 4, 1};
    vector<int> b{1, 9, 7, 7};
    vector<int> c;
    c.resize(10);
    merge(a.begin(), a.end(), b.begin(), b.end(), c.begin());
    for (int i : c) {
        cout << i << ' ';
    }
    
    //1 3 4 1 9 7 7 0 0 0 
```

### inplace_merge()


## 字符串和数字转化

stringstream只能用一次，用ss.clear()重置


```cpp
#include <string>

    int a = 123;
    string s = to_string(a);
    cout << s << '\n';  //123

    double b = 0.123;
    cout << to_string(b) << '\n';   //0.123000

    stringstream ss;
    string t;
    ss << b;
    ss >> t;
    cout << t << '\n'; //0.123

    string c = "7355608";
    int n = stoi(c);
    cout << n << '\n';  // 7355608

    string d = "6653.9418";
    double dq = stod(d);
    cout << dq << '\n';   //6653.94

    double db;
    stringstream sss;
    sss << d;
    sss >> db;
    cout << db << '\n'; //6653.94
```

总结，整数最好用to_string()和stoi()，小数最好用stringstream





## 进制转化

python可以用ord

十进制转任意进制

```cpp
char a[30];
    int x = 176;
    itoa(x, a, 15);	//第三个参数不能太大，不能超过30
    cout << a << '\n';
    //bb
```

任意进制转十进制

```cpp
char a[20] = "e4cxxx";
    char b[20] = "e4c";
    char *ed;
    cout << strtol(a, &ed, 15);	//第三个参数不能太大，不能超过30
    cout << strtol(b, &ed, 15);
    // 3222
    // 3222
```

任意进制的互相转化可以通过十进制过渡


## __int128

__int128是128位的整数类型，long long只有64位

## 数据类型范围

```cpp
cout << numeric_limits<int>::min() << '\n';     //-2147483648
    cout << numeric_limits<int>::max() << '\n';     //2147483647
    cout << numeric_limits<long long>::min() << '\n';   //-9223372036854775808
    cout << numeric_limits<long long>::max() << '\n';   //9223372036854775807
    cout << numeric_limits<float>::min() << '\n';   //1.17549e-38
    cout << numeric_limits<float>::max() << '\n';   //3.40282e+38
    cout << numeric_limits<double>::min() << '\n';  //2.22507e-308
    cout << numeric_limits<double>::max() << '\n';  //1.79769e+308
    cout << numeric_limits<long double>::min() << '\n'; //3.3621e-4932
    cout << numeric_limits<long double>::max() << '\n'; //1.18973e+4932
```


## fill

```cpp
int a[20];
    fill(a, a + 5, 3);
    vector<int> v(30);
    fill(v.begin(), v.begin() + 5, 4);
    fill_n(a, 10, 3);

    int b[20][20] = {0};
    fill(b[0], b[0] + 10 * 10, 3);    // 前5行，每一列都为3
```

## 最大最小值

```cpp
const int inf = 0x3f3f3f3f;
    const long long inf = 0x3f3f3f3f3f3f3f3f;
    const int ninf  = 0xc0c0c0c0;
    const long long ninf = 0xc0c0c0c0c0c0c0c0;
```

用memset时

```cpp
memset(a, 0x3f, sizeof(a));
```

## __builtin_XXX

__builtin_popcount(x)求数的二进制中1的个数

## lambda表达式

```cpp
vector<int> a;
    sort(a.begin(), a.end(), [&](int a, int b){return a > b;});
    sort(a.begin(), a.end(), greater<>());
```

## modf()返回小数的小数部分

```cpp
double x, y, z;
    x = 1.234;
    z = modf(x, &y);
    cout << x << ' ' << y << ' ' << z << '\n';
    //1.234 1 0.234
```


## bitset

```cpp
bitset<4> bs1;  // 0000
    bitset<8> bs2(12); // 00001100
    bitset<5> bs3("1101"); // 01101
    
    //有些可带参数也可不带参数
    bitset<10> bs;
    bs[5];  // 表示第6位，从右往左数，从小往大
    bs.count(); // 求1的个数
    bs.size(); // 大小
    bs.test(4); //下标为4的数是否为1
    bs.any();   //是否有1
    bs.none();  //是否没有1
    bs.all();   //是否全是1
    bs.flip(4); // 将下标为4的位取反
    bs.set();   // 置1
    bs.set(4, false); //下标为4的置零
    bs.reset(); //置0
    bs.to_string();     //转string
    bs.to_ulong();
    bs.to_ullong();
```


## 算法

树上两点的距离

dist(x, y) = dep(x) + dep(y) - 2 * dep(lca(x,y))


## switch

switch只能在int和char中选

## accumulate

求和

```cpp
int a[20];
    accumulate(a, a + 3, 20);
```

## pb_ds库

```cpp
#include <bits/extc++.h>
```

## double输入输出

float 用%f %f
double 用%lf %f

## 程序运行加速

long long换int

把main外的函数放main里

## size和int类型转换

size和int计算时要强制类型转换

(int) s.size() - 1

## 迭代器移动

advance(it, 5)把it迭代器向后移动5

## pair_hash

当map等排序数组的key是pair时，需要pair_hash

```cpp
struct pair_hash{
    template<class T1, class T2>
    std::size_t operator() (const std::pair<T1, T2>& p) const
    {
        auto h1 = std::hash<T1>{}(p.first);
        auto h2 = std::hash<T2>{}(p.second);
        return h1 ^ h2;
    }
};

    map<pair<int, int>, int, pair_hash>
```


## auto &

不带&

```cpp
map<int, int> mp;
    mp[1] = 2;
    for (auto [x, y] : mp) {
        y += 2;
    }
    cout << mp[1];
    // 2
```

对于引用，参数如果是string类型，应该尽量用引用来减少复制的开销


## hypot()

```cpp
#include <cmath>
    cout << hypot(3, 4);    //5
    cout << hypotf(3, 4);
    cout << hypotl(3, 4);
```











