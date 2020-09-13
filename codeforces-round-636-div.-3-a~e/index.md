# Codeforces Round #636 (Div. 3) A~E



# [A. Candies](https://codeforces.com/contest/1343/problem/A)


## 题意
给一个数n，找一个数x，满足 x+2x+4x+8x+... = n

## 题解

等比数列求和，变成2^m

然后枚举，看哪个能整除

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
long long n,t;
int main(){
	cin>>t;
	long long a[32];
	for(long long i=1;i<=30;i++){
		a[i] = (1<<i) - 1;
	}
	while(t--){
		cin>>n;
		for(long long i=2;i<=30;i++){
			if((double)n/a[i] == n/a[i]){
				cout<<n/a[i]<<endl;
				break;
			}
		}
	}
	
	return 0;
}
```



# [B. Balanced Array](https://codeforces.com/contest/1343/problem/B)


## 题意

给一数n，问是否可以构造一个数列

数列的个数是偶数

前半部分都是偶数，后半部分都是奇数

前半部分的和等于后半部分


## 题解

按照样例那样有规律地构造

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,t;
int main(){
	//freopen("in.txt","r",stdin);
	cin>>t;
	while(t--){
		cin>>n;
		if((n/2) & 1) puts("NO");
		else {
			puts("YES");
			for(int i=1;i<=n/2;i++){
				cout<<i*2<<" ";	
			}
			
			for(int i=1;i<=n/4;i++){
				cout<<i*2-1<<" ";
			}
			
			for(int i=n/4+1;i<=n/2;i++){
				cout<<i*2+1<<" ";
			}
			cout<<"\n";
		}
	}
	return 0;
}
```


# [C. Alternating Subsequence](https://codeforces.com/contest/1343/problem/C)


##  题意

在一个数列中找一个子序列（可以不连续）满足奇偶穿插

对于满足这个条件的最长子序列中，求元素和最大值


## 题解

将数列按奇偶性分割，每一部分取最大值

可以用双指针锁定区间

我的写法需要再最后添一个相反数，否则加不到最后一块区域

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll n,t,a[200005];

const ll inf = 0x3f3f3f3f3f3f3f3f;
const ll ninf = 0xc0c0c0c0c0c0c0c0;
int main(){
	
	cin>>t;
	while(t--){
		
		cin>>n;
		vector<ll> ans;
		
		for(ll i=0;i<n;i++) cin>>a[i];
		if(a[n-1]>0) a[n]=-1;
		else a[n]=1;
		
		bool pos;
		if(a[0]>0){
			pos=true;
		}else pos=false;
		
		ll l = 0;
		ll r = 0;
		for(int i=0;i<=n;i++){
			if(pos){
				if(a[i]>0) r++;
				else {
					pos^=1;
					ll cnt = *max_element(a+l , a+r);
					ans.push_back(cnt);
					l = r;
					r++;
				}
			}
			else{
				if(a[i]<0) r++;
				else{
					pos^=1;
					ll cnt = *max_element(a+l , a+r);
					ans.push_back(cnt);
					l = r;
					r++;
				}
			}
		}
		ll foo = 0;
		for(ll i:ans){
			//cout<<i<<endl;
			foo+=i;
		}
		cout<<foo<<endl;
	}
	return 0;
}
```



# [D. Constant Palindrome Sum](https://codeforces.com/contest/1343/problem/D)


## 题意

对于一个长度为n的数列（n为偶数）

对于数列中的每个数可以进行替换，使得所有的对称的一组数字和相等

且所有数字不超过k

求最小替换数


## 题解

对于每组数，可以替换1次，2次0次

由于数字不超过k，所以和的范围为[2,2*k]

因为k的数据较小，所以可以枚举，对于每个x

求替换数，然后一直min


如果两个数和为x，则替换数为0

如果替换一个数，则替换之后和的范围是[min(x1,x2)+1 , max(x1,x2)+k]

所以检查x是否落在这个范围内

除此之外要替换2个

所以用一个容器存数字和的个数（目的是求0个）

存左右区间的个数（目的是不断迭代求1个）（如果用这种方法1个的个数会覆盖0个）

剩下就是2个

ac代码


```cpp
#include<bits/stdc++.h>
using namespace std;
int t,n,k;
int a[200005];
int eq[2*200005];
int l[2*200005];
int r[2*200005];
int one[2*200005];  //只替换一个 
int ans;
int main(){

	cin>>t;
	while(t--){
		cin>>n>>k;
		for(int i=1;i<=n;i++){
			cin>>a[i];
		}
		
		for(int i=1;i<=n/2;i++){
			eq[a[i]+a[n-i+1]]++;
			l[min(a[i],a[n-i+1])+1]++;
			r[max(a[i],a[n-i+1])+k]++;
		}
		
		for(int i=1;i<=2*k+3;i++){
			one[i] = one[i-1]+l[i]-r[i-1];
		}
		ans = n+2;
		for(int i=1;i<=2*k+3;i++){
			ans = min(ans , n - one[i] - eq[i]);  //不能用2*eq，因为one会重复计算一个eq所以要再加上一个eq 
		}
		
		cout<<ans<<endl;


//TODO reset

for(int i=0;i<2*k+2;i++) {          //这里用memeset就会超时 
	eq[i]=l[i]=r[i]=0;
}
	}
	return 0;
}
 
```



# [E. Weights Distributing](https://codeforces.com/contest/1343/problem/E)


## 题意


给一没有权值的无向图和权值序列

问怎样给边赋值（一一对应）使得从a到b再到c的权值和最小


## 题解

由于行走路径会重复的问题

所以可以把问题转化成从a到 i ，从i到b，从b到 I ，从 i 到c

遍历所有的点 i

保证 i 到 b ，a 到 i ， i 到 c 都是最短路径（路径数最少） 

将权值最小的部分赋给 b到 i 的路径上，再将较小的权值赋给 a到 i 和 i 到 c

要让路径数最少，直接bfs预处理

然后给权值排序，因为要不断选一段有序的权值，所以前缀和预处理

最后要特判

如果在样例1中，i 在 a 上，那么 i 到 b 和 i 到 c 路径重复，这种情况是绝对不可

能最优的（总能找到反例）

ac代码


```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll t,n,m,a,b,c;
ll mm[200005];
ll d[3][200005];
ll spre[200005];
vector<ll> G[200005];
const ll inf = 0x3f3f3f3f3f3f3f3f;
void bfs(ll st,ll r){
	
	queue<ll> q;
	q.push(st);
	while(!q.empty()){
		ll cnt = q.front();
		q.pop();
		for(auto i : G[cnt]){
			if(d[r][i] == -1){
				d[r][i] = d[r][cnt]+1;
				q.push(i);
			}
		}
	}
}
int main(){
	//freopen("in.txt","r",stdin);
	cin>>t;
	while(t--){
		
		
		
		cin>>n>>m>>a>>b>>c;
		
		//TODO reset
		for(ll i=0;i<3;i++)for(ll j=0;j<=n;j++) d[i][j]=-1;
		for(ll i=0;i<=n;i++) G[i].clear();
		
		for(ll i=1;i<=m;i++){
			cin>>mm[i];
		}
		
		sort(mm+1,mm+m+1);
		spre[1] = mm[1];
		for(ll i=2;i<=m;i++){
			spre[i]=spre[i-1]+mm[i];
		}
		
		
		ll t1,t2;
		for(ll i=1;i<=m;i++){
			cin>>t1>>t2;
			G[t1].push_back(t2);
			G[t2].push_back(t1);
		}
		
		d[0][a]=0;d[1][b]=0,d[2][c]=0;
		bfs(a,0);
		bfs(b,1);
		bfs(c,2);
		
		ll ans = inf;
		for(ll i=1;i<=n;i++){
			if(d[0][i] + d[1][i] + d[2][i] > m) continue;
			ans = min(ans , spre[ d[1][i] ] + spre[ d[0][i] + d[1][i] + d[2][i] ]);
		}
		cout<<ans<<endl;
	}
//	for(ll i=1;i<=7;i++){
		//cout<<d[2][2]<<" ";
//	}

	//for(ll i=1;i<=8;i++) cout<<spre[i]<<" ";
	//cout<<d[1][1]<<endl;
	//cout<<a<<b<<c;
	return 0;
}
```











