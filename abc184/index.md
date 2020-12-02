# abc184


## [A - Determinant](https://atcoder.jp/contests/abc184/tasks/abc184_a)

### 题意

求二阶行列式

### 题解

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int main() {
    int a, b, c, d;
    cin >> a >> b >> c >> d;
    cout << a * d - c * b << endl;
    return 0;
}
```

## [B - Quizzes](https://atcoder.jp/contests/abc184/tasks/abc184_b)

### 题意

给n个问题，和答题情况，答对加1，答错减1（为0不扣分），初始分数x，求最终分数

### 题解

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int main() {
    int n, k;
    cin >> n >> k;
    for(int i = 0; i < n; ++i){
        char ch;
        cin >> ch;
        //cout << ch;
        if(ch == 'o') k++;
        if(ch == 'x' and k > 0) k--;
    }
    cout << k << endl;
    return 0;
}
```

## [C - Super Ryuma](https://atcoder.jp/contests/abc184/tasks/abc184_c)

### 题意

对于题目给定的图（点击标题转到原题），小黄点可以到达以它为中心的红色领域，已知小黄点的位置和目标，求最少几步能到达目标

### 题解

感觉这题比传统的C难

最多只需要三步，如果小黄点和目标重合，0步，目标在小黄点的领域内，1步

最难的就是判断2步，满足这几种情况就是2步，其余就是3步

以小黄点为中心的领域和目标为中心的领域相交（坐标和奇偶）

两个点的曼哈顿距离不大于6

以小黄点为中心的领域的斜线部分和目标的曼哈顿距离不大于3（其实就是和目标为中心的领域的中间那一块）（此处斜线部分有两条，所以分两种情况）

```cpp
#include "bits/stdc++.h"
using namespace std;
using ll = long long;
int main() {
    int a, b, c, d;
    cin >> a >> b >> c >> d;
    int ans = 3;
    if(a == c and b == d) ans = 0;
    else if(a + b == c + d or a - b == c - d or abs(a - c) + abs(b - d) <= 3) ans = 1;
    else if(abs(c + d - (a + b)) <= 3 or abs(c - d + b - a) <= 3 or (a + b) % 2 == (c + d) % 2 or abs(a - c) + abs(b - d) <= 6) ans = 2;
    cout << ans << endl;
    return 0;
}
```

## [D - increment of coins](https://atcoder.jp/contests/abc184/tasks/abc184_d)

### 题意

三个袋子放着a b c数量的金币、银币、铜币(a,b,c < 100)，做以下操作直到有一个袋子数量满100

从某个袋子中拿走一个币，再放回两个相同的币

问操作次数的期望值

### 题解

概率dp（没怎么做过）

dp[i][j][k] 表示袋子中分别剩下i j k个时的概率

所有100\*100\*100种情况求和就是答案（从样例2可以分析得到）

初始化 dp[a][b][c] = 1



```cpp
#include<bits/stdc++.h>
using namespace std;
double dp[110][110][110];
int main(){
	int a, b, c;
	cin >> a >> b >> c;
	dp[a][b][c] = 1;
	double ans = 0;
	for(int i = 0; i < 100; ++i){
		for(int j = 0; j < 100; ++j){
			for(int k = 0; k < 100; ++k){
				if(i + j + k == 0) continue;
				ans += dp[i][j][k];
				dp[i + 1][j][k] += dp[i][j][k] * i / (i + j + k);
				dp[i][j + 1][k] += dp[i][j][k] * j / (i + j + k);
				dp[i][j][k + 1] += dp[i][j][k] * k / (i + j + k);
			}
		}
	}
	printf("%.9f\n", ans);
	return 0;
}
```


## [E - Third Avenue](https://atcoder.jp/contests/abc184/tasks/abc184_e)

### 题意

给一个网格，上面有障碍，起点，终点和小写字母，从起点出发，对于当前这个没有障碍的格子，可以选择走一步（相邻四个格子），如果这个格子是小写字母就可以传送到另一个小写字母上，问最少需要几步到达终点

### 题解

基础bfs

```cpp
#include<bits/stdc++.h>
using namespace std;
int dist[2010][2010];
char maze[2010][2010];
int h, w;
vector<pair<int, int>> a[26];
int dir[4][2] = {{-1, 0}, {0, -1}, {0, 1}, {1, 0}};

int main(){
	memset(dist, 0x3f, sizeof(dist));
	cin >> h >> w;
	int sx, sy, gx, gy;
	for(int i = 1; i <= h; ++i){
		cin >> maze[i] + 1;
	}
	
	for(int i = 1; i <= h; ++i){
		for(int j = 1; j <= w; ++j){
			if(maze[i][j] == 'S'){
				sx = i, sy = j;
			}
			if(maze[i][j] == 'G'){
				gx = i, gy = j;
			}
		}
	}
	
//	for(int i = 1; i <= h; ++i){
//		 for(int j = 1; j <= w; ++j) 
//		 {
//		 	cout << maze[i][j];
//		 }
//		 cout << '\n';
//	}


	for(int i = 1; i <= h; ++i){
		for(int j = 1; j <= w; ++j){
			if(isalpha(maze[i][j]) and maze[i][j] != 'S' and maze[i][j] != 'G'){
				a[maze[i][j] - 'a'].emplace_back(i, j);
			}
		}
	}
	
	dist[sx][sy] = 0;
	
	queue<pair<int, int>> q;
	q.push({sx, sy});
	bool got = false;
	while(!q.empty() and !got){
		auto tmp = q.front();
		q.pop();
		int tx = tmp.first;
		int ty = tmp.second;
		
		for(int i = 0; i < 4; ++i){
			int fx = tx + dir[i][0];
			int fy = ty + dir[i][1];
			
			if(fx >= 1 and fy >= 1 and fx <= h and fy <= w and maze[fx][fy] != '#' and dist[fx][fy] > dist[tx][ty] + 1){
				dist[fx][fy] = dist[tx][ty] + 1;
				if(fx == gx and fy == gy){
					got = true;
					break;			
				}
				q.push({fx, fy});
			}
		}
		
		
		if(isalpha(maze[tx][ty]) and maze[tx][ty] != 'S' and maze[tx][ty] != 'G') {
			for(auto i : a[maze[tx][ty] - 'a']){
				auto cx = i.first ;
				auto cy = i.second;
				if(cx == tx and cy == ty) continue;
				if(dist[cx][cy] > dist[tx][ty] + 1){
					dist[cx][cy] = dist[tx][ty] + 1;
					if(cx == gx and cy == gy){
						got = true;
						break;			
					}
					q.push({cx, cy});
				}
			}
		}	
}
	
	if(got) cout << dist[gx][gy] << endl;
	if(!got){
		puts("-1");
	}
	return 0;
}
```


## [F - Programming Contest](https://atcoder.jp/contests/abc184/tasks/abc184_f)

### 题意

给n（n=40）个数，选择其中0个或几个使得和不大于t，求最大可能的和

### 题解

经典问题

由于n=40，枚举超时，考虑折半枚举，集合大小为2^20，然后对于一个集合中的每个数，二分查找另一个集合满足条件的最大值

以下代码手写二分，也可以用内置函数，主要是想练一下手写二分

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll a[45];
vector<ll> vt1;
vector<ll> vt2;
vector<ll> foo1;
vector<ll> foo2;

ll n;
ll t;
bool check(ll x, ll tp){
    return foo2[x] + tp <= t;
}

int main(){
    cin >> n >> t;
    for(ll i = 1; i <= n; ++i){
        cin >> a[i];
    }

    for(ll i = 1; i <= n / 2; ++i){
        vt1.push_back(a[i]);
    }
    for(ll i = n / 2 + 1; i <= n; ++i){
        vt2.push_back(a[i]);
    }

    ll len1 = n / 2;
    ll len2 = n - n / 2;
    for(ll i = 0; i < (1 << len1); ++i){
        ll tmp = 0;
        for(ll j = 0; j < len1; ++j){
            if(i >> j & 1){
                tmp += vt1[j];
            }
        }
        foo1.push_back(tmp);
    }


    for(ll i = 0; i < (1 << len2); ++i){
        ll tmp = 0;
        for(ll j = 0; j < len2; ++j){
            if(i >> j & 1){
                tmp += vt2[j];
            }
        }
        foo2.push_back(tmp);
    }


    foo1.push_back(0);
    foo2.push_back(0);

    sort(foo1.begin(), foo1.end());
    sort(foo2.begin(), foo2.end());

    vector<ll>::iterator it;
    it = unique(foo1.begin(), foo1.end());
    foo1.erase(it, foo1.end());
    it = unique(foo2.begin(), foo2.end());
    foo2.erase(it, foo2.end());


    //for(ll i : foo2) cout << i << " ";

    len1 = foo1.size();
    len2 = foo2.size();

    ll mx = -1;

    for(ll i = 0; i < len1; ++i){
        ll tmp = foo1[i];
        ll l = 0, r = len2 - 1;
        while(l <= r){
            ll mid = (l + r) >> 1;
            if(check(mid, tmp)){
                mx = max(mx, tmp + foo2[mid]);
                l = mid + 1;
            }else r = mid - 1;
        }

    }
    cout << mx << endl;
    //cout << qq1 << " " << qq2 << endl;
    //cout << foo2[6];
    return 0;
}
```


