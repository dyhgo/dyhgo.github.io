# Educational Codeforces Round 89 (Rated for Div. 2) A~E



# [A. Shovels and Swords](https://codeforces.com/contest/1366/problem/A)

## 题意

两个钻石和一个棍子可以造出A，两个棍子和一个钻石可以造出B

每个A或B都可以卖出一块钱，求 x个棍子和y个钻石最多可以卖多少钱

## 题解

钻石和棍子是等价的，他们一共用了三个，只要贪心地将总数/3即可

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 998244353;
int t;
int main(){
	cin>>t;
	while(t--){
		int a,b;
		cin>>a>>b;
		cout<<min({a,b,(a+b)/3})<<endl;
	}
	return 0;
}
```

# [B. Shuffle](https://codeforces.com/contest/1366/problem/B)

## 题意

初始有n个数，第i个为1，其他为0，给若干个区间，对每个区间，可以选择区间内的数（两个或自身）交换数值

问有多少个数字能在合理选择后达到1

## 题解

首先前面的区间是否覆盖1，没覆盖全部抛弃，否则从那个区间开始做以下事

判断接下来的区间和这个区间有没有交集，有则用并集刷新当前区间，否则抛弃

最后求集合包含了几个数

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 998244353;
int n,x,m;
int t;
int l,r;
int main(){
	cin>>t;
	while(t--){
		cin>>n>>x>>m;
		int L=-1,R=-1;
		bool ok = false;
		while(m--){
			cin>>l>>r;
			if(ok){
				if(l<=R and L<=r){
					L = min(L,l);
					R = max(R,r);
				}
			}
			else
			{
				if(x<l or x>r ) continue;
				L = l,R = r;
				ok = true;
			}
		}
		if(L==-1 and R==-1) cout<<1<<endl;
		else cout<<R-L+1<<endl;
	}
	return 0;
}
```

# [C. Palindromic Paths](https://codeforces.com/contest/1366/problem/C)

## 题意

给一充满01的矩阵，从左上角走到右下角，只能向右走和向下走

改变矩阵中的若干元素，使得所有路径按序组成的字符串都是回文串

求最小改动数

## 题解

由于题限，到每个点都走固定的步数，每个步数值与对称的步数值相同（同为0或1）

bfs求每格步数，然后对于每一组求0多还是1多，以此决定全是0还是全是1

[WARNING] 以下代码，逻辑低效(懒得改)

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 998244353;
int n,m;
int t;
int a[32][32];
int d[32][32];
vector<int> stp[62];
int used[32][32];
priority_queue<pair<int,int>> pq;
void bfs(){
	pq.push({0,0});
	d[0][0] = 0;
	used[0][0] = 1;
	while(pq.size()){
		pair<int,int> pii = pq.top();
		pq.pop();
		if(pii.first+1 < n and used[pii.first+1][pii.second]==0) {
			pq.push(make_pair(pii.first+1,pii.second));
			d[pii.first+1][pii.second] = d[pii.first][pii.second] + 1;
			used[pii.first+1][pii.second] = 1;
		}
		if(pii.second+1 < m and used[pii.first][pii.second+1]==0){
			pq.push(make_pair(pii.first,pii.second+1));
			d[pii.first][pii.second+1] = d[pii.first][pii.second] + 1;
			used[pii.first][pii.second+1] = 1;
		}
	}
	for(int i=0;i<n;i++) for(int j=0;j<m;j++) stp[d[i][j]].push_back(a[i][j]);
}
int main(){
	cin>>t;
	while(t--){
		int ans = 0;
		cin>>n>>m;
		for(int i=0;i<62;i++) stp[i].clear();
		memset(used,0,sizeof(used));
		for(int i=0;i<n;i++) for(int j=0;j<m;j++) cin>>a[i][j];
		bfs();
		for(int i=0,j=n+m-2;i<j;i++,j--){
			if((n+m-2)%2==0 and i==j) continue;
			int zero = count(stp[i].begin(),stp[i].end(),0) + count(stp[j].begin(),stp[j].end(),0);
			int one = count(stp[i].begin(),stp[i].end(),1) + count(stp[j].begin(),stp[j].end(),1);
			ans += 2*stp[i].size() - max(zero,one);
		}
		cout<<ans<<endl;
	}
	return 0;
}
```

# [D. Two Divisors](https://codeforces.com/contest/1366/problem/D)

## 题意

给一数n，判断n的所有因子中（1除外）是否存在 d1 d2使得 d1+d2与n互质

## 题解

如果存在，则这组数可以是 d1*d2 = n

d1 与d2一定互质

让n一直除以最小因子，除到最后不为1，则剩下的数与之前的除数互质，满足条件

最小因子可以筛法预处理

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 998244353;
int n;
int d1[500005];
int d2[500005];
int a[500005];
int f[10000005];
void preprocess(){
	for(int i=2;i<10000005;i++)
	if(f[i] == 0)
	{
		f[i] = i;
		for(int j=i+i;j<10000005;j+=i) f[j] = i;
	}
}
void did(int x,int ind){
	int foo = f[x];
	int bar = x;
	while(x%foo==0) x /= foo;
	if(x==1) d1[ind]=-1,d2[ind]=-1;
	else d1[ind]=x,d2[ind]=bar/x;
}
int main(){
	preprocess();
	cin>>n;
	for(int i=0;i<n;i++) cin>>a[i];
	for(int i=0;i<n;i++) did(a[i] , i);
	for(int i=0;i<n;i++) cout<<d1[i]<<" "; cout<<endl;
	for(int i=0;i<n;i++) cout<<d2[i]<<" "; cout<<endl; 
	return 0;
}
```

# [E. Two Arrays](https://codeforces.com/contest/1366/problem/E)

## 题意

给两个数组A B（B为递增），B的大小为m，将A分成m个区间，使得每个区间的最小值与B的每个数相同（按顺序对应），求方案数

## 题解

隔板法，双指针锁定每个数之间隔板可以移动的范围，最后乘法原理

对于可移动范围，因为B是递增的，从右往左遍历

就是A B数组元素比大小，然后右边的指针贪心地选择可满足数中最右边的数，左指针贪心地选择可满足数中最左边的数

（即右指针左移过程中，碰到可满足数就停下来，左指针要一直移动直到不满足，这样得到最大的区间）

注意特判！！

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 998244353;
ll ans = 1;
int a[200005];
int b[200005];
int n,m;
int l[200005];
int r[200005];
int main(){
	cin>>n>>m;
	for(int i=0;i<n;i++) cin>>a[i];
	for(int i=0;i<m;i++) cin>>b[i];
	for(int i=0;i<m;i++) l[i] = r[i] = -1;
	int ind = m-1;
	for(int i=n-1;i>=0;i--){
		while(ind>=0 and b[ind] > a[i]) ind--;
		if(ind<0) {
			cout<<0<<endl;
			exit(0);
		}
		l[ind] = i;
		if(a[i] == b[ind] and r[ind]==-1){  //greedy
			r[ind] = i;
		}
	}
	if(l[0]==-1 or r[0]==-1) {
		cout<<0<<endl;
		exit(0);
	}
	for(int i=1;i<m;i++){
		if(l[i]==-1 or r[i]==-1) {
			cout<<0<<endl;
			exit(0);			
		}
		ans *= (ll) (r[i] - l[i] + 1);
		ans %= mod;
	}
	cout<<ans<<endl;
	return 0;
}
```

# [F. Jog Around The Graph](https://codeforces.com/contest/1366/problem/F)

## 题意

不懂

## 题解

不会

# [G. Construct the String](https://codeforces.com/contest/1366/problem/G)

## 题意

不懂

## 题解

不会




