# abc170


# [A - Five Variables](https://atcoder.jp/contests/abc170/tasks/abc170_a)

## 题意

找5个数中值为0的下标

## 题解

```python
a = list(map(int , input().split()))
print(a.index(0) + 1)
```

# [B - Crane and Turtle](https://atcoder.jp/contests/abc170/tasks/abc170_b)

## 题意

鸡兔同笼问题

## 题解

```python
n , m = map(int , input().split())
print('Yes') if (m - 2 * n) % 2 == 0 and (m - 2 * n) >= 0 and 4 * n - m >= 0 and (4 * n - m) % 2 == 0 else print('No')
```


# [C - Forbidden List](https://atcoder.jp/contests/abc170/tasks/abc170_c)

## 题意

给一数x 和一数列，找不在数列中离x最近的数

## 题解

```python
x , n = map(int , input().split())
b = []
if n!=0:
    b = list(map(int,input().split()))
t = 0
ans = 0
while 1:
    if x-t not in b:
        ans = x - t
        break
    if x+t not in b:
        ans = x + t
        break
    t += 1
print(ans)
```

# [D - Not Divisible](https://atcoder.jp/contests/abc170/tasks/abc170_d)

## 题意

给一数列，对于数列中的每个数，如果都不能被其他数整除，计数器 + 1

求计数器的值

## 题解

暴力时间复杂度 O(n*√(V)) 好像会超时

可以排序，从小到大遍历，对于当前数，考虑 2\*x 3\*x 4\*x 的值是否在数列里，如果在数列里（只会比当前数大）则移除

这样总共要算

(1/2 + 1/3 + 1/4 + 1/5 + 1/6 + ... + 1/n) * V = (ln(n) + 0.578) * V 次

时间复杂度为 O(n*ln(n))

注意当数列中有重复数，则都不能算

注意特判1个数

```cpp
#include<bits/stdc++.h>
using namespace std;
int n;
//int a[200005];
set<int> st;
set<int> stt;
multiset<int> ms;
void did(int x){
	for(int i=2;i*x<=1000005;i++){
		int tmp = i*x;
		if(st.find(tmp)!=st.end()){
			st.erase(tmp);
		}
	}
}
int main(){
	cin>>n;
	//for(int i=0;i<n;i++) cin>>a[i];
	for(int i=0;i<n;i++){
		int x;
		cin>>x;
		st.insert(x);
		stt.insert(x);
		ms.insert(x);
	}
	//for(int i:st) cout<<i<<endl;
	if(st.size()==1 and  n>1) {
		cout<<0<<endl;
		return 0;
	}
	if(n==1) {    // WA!!!
		cout<<1<<endl;
		return 0;
	}
	for(int i:st){
		did(i);
	}
	//for(int i:st) cout<<i<<endl;
	int ans = st.size();    // WA  !!!!
	for(int i:st){
		if(ms.count(i)>1) ans--;
	}
	cout<<ans<<endl;
	return 0;
}
```

# [E - Smart Infants](https://atcoder.jp/contests/abc170/tasks/abc170_e)

## 题意

每个小朋友都有一个分数和初始的幼儿园

每次转学的操作是

将第 i 个小朋友转到第 j 个幼儿园

对于q次转学

每次输出每个幼儿园中分数最高的最小值

## 题解

一开始的思路是最小值的更新肯定在有变动的幼儿园和当前最小值之间选择

但这是错的，因为当前最小值被覆盖之后，更新后的最小值可能是之前的次小值（而次小值没有记录）

所以：用集合模拟幼儿园（目的在于log时间内排序）

对于每次操作都用集合模拟，用多重集维护所有的最大值

通过查看幼儿园最大值是否被更换来决定是否对多重集进行增删

一百万个数据错了3个，原因竟然是：

多重集的erase操作是全删而不是删一个

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,q;
set<pair<int,int>, greater<pair<int,int> > > st[200005];
multiset<int> ms;
int rat[200005];
int wh[200005];
//multiset<int , greater<int>> ts[200005];
int main(){
	cin>>n>>q;
	for(int i=0;i<n;i++){
		int a,b;
		cin>>a>>b;
		b--;
		rat[i] = a;
		wh[i] = b;
		st[b].insert({a,i});
		//ts[b].insert(a);
	}
	for(int i=0;i<200005;i++){
		if(st[i].empty()) continue;
		//int num = ts[i].count(*ts[i].begin());
		//for(int j=0;j<num;j++){
			ms.insert(st[i].begin()->first);
		//}
	}
	while(q--){
		int a,b;
		cin>>a>>b;
		a--,b--;
		bool ismax = false;
		if(st[wh[a]].begin()->second == a) ismax = true;
		if(ismax){
			ms.erase(ms.find(rat[a]));
			st[wh[a]].erase({rat[a] , a});
			if(st[wh[a]].empty()) ;
			else ms.insert(st[wh[a]].begin()->first);
			wh[a] = b;
			if(st[b].empty()) ;
			else ms.erase(ms.find(st[b].begin()->first));
			st[b].insert({rat[a] , a});
			ms.insert(st[b].begin()->first);
		}
		else{
			st[wh[a]].erase({rat[a] , a});
			wh[a] = b;
			if(st[b].empty()) ;
			else ms.erase(ms.find(st[b].begin()->first));
			st[b].insert({rat[a] , a});
			ms.insert(st[b].begin()->first);
		}
		cout<<*ms.begin()<<endl;
	}
	return 0;
}
```


# [F - Pond Skater](https://atcoder.jp/contests/abc170/tasks/abc170_f)

## 题意

给一个迷宫、起点、终点

对于走的方向，只能是上下左右

对于每一步，最多只能走k格且不能转弯

求是否能到达终点，如果能，最少走几步

## 题解

bfs 每次沿一个方向，尽可能地走k步

```cpp
#include<bits/stdc++.h>
using namespace std;
int h ,w ,k;
int xs,ys,xt,yt;
const int inf = 1e9;
int dirx[] = {0,-1,1,0};
int diry[] = {1,0,0,-1};
int main(){
	cin >> h >> w >> k;
	cin>>xs>>ys>>xt>>yt;
	xs--,ys--,xt--,yt--;
	vector<string> vt(h);
	for(int i=0;i<h;i++) cin>>vt[i];
	vector<vector<int>> d(h , vector<int>(w,inf));
	
	
	queue<pair<int,int>> q;
	q.push({xs,ys});
	d[xs][ys] = 0;
	
	
	while(q.size()){
		auto tmp = q.front();
		q.pop();
		int tmpx = tmp.first;
		int tmpy = tmp.second;
		
		for(int i=0;i<4;i++){
//			int tox = tmpx + dirx[i];
//			int toy = tmpy + diry[i];
			int ttmpx = tmpx;
			int ttmpy = tmpy;
			int j;
			for(j=0;j<k;j++){
				ttmpx += dirx[i];
				ttmpy += diry[i];
				if(ttmpx>=0 and ttmpy>=0 and ttmpx<h and ttmpy<w and vt[ttmpx][ttmpy]!='@' and d[ttmpx][ttmpy] > d[tmpx][tmpy]){
					if(d[ttmpx][ttmpy] > d[tmpx][tmpy] + 1){
						d[ttmpx][ttmpy] = d[tmpx][tmpy] + 1;
						q.push({ttmpx , ttmpy});
					}
				}else break;
			}
			
		}
	}
	
	cout<<(d[xt][yt]==1e9 ?  -1 : d[xt][yt])<<endl;
	return 0;
	
}
```



