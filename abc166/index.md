# abc166



# [A - A?C](https://atcoder.jp/contests/abc166/tasks/abc166_a)
## 题意

abc输出arc反之亦然

## 题解

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	string s;
	cin>>s;
	s[1]=s[1]=='B'? 'R': 'B';
	cout<<s<<endl;
	return 0; 
}

```

# [B - Trick or Treat](https://atcoder.jp/contests/abc166/tasks/abc166_b)

## 题意
snack_i被snuke_1,snuke_2..拥有

问有多少个snuke没有snack

## 题解

```cpp
#include<bits/stdc++.h>
using namespace std;
set<int> st;
int main(){
	int n,k;
	cin>>n>>k;
	for(int i=1;i<=k;i++){
		int x;
		cin>>x;
		while(x--){
			int y;
			cin>>y;
			st.insert(y);
		}
	}
	cout<<n-st.size()<<endl;
	return  0;
}

```

# [C - Peaks](https://atcoder.jp/contests/abc166/tasks/abc166_c)

## 题意

山上有n个观景台，有一些路连接两个观景台，一个观景台是好的当且仅当从它出发走一条路能到达的观景台海拔都比它低，没有路也算

问有多少个好观景台

## 题解

用二叉树排序



```cpp
#include<bits/stdc++.h>
using namespace std;
priority_queue<int> p[100005];
int a[100005];
int main(){
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++) p[i].push(0);
	for(int i=1;i<=n;i++) cin>>a[i];
	while(m--){
		int t1,t2;
		cin>>t1>>t2;
		p[t1].push(a[t2]);
		p[t2].push(a[t1]);
	}
	int ans=0;
	for(int i=1;i<=n;i++){
		if(p[i].top()<a[i]) ans++;
	}
	cout<<ans<<endl;
	
	return  0;
}

```

# [D - I hate Factorization](https://atcoder.jp/contests/abc166/tasks/abc166_d)

## 题意

给定一个数X，求A，B使得A^5 - B^5 = X,A，B是整数

## 题解

bf

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll x,a,b;
bool check(ll a,ll b){
	if(a*a*a*a*a - b*b*b*b*b == x) return true;
	return false;
}
int main(){
	cin>>x;
	for(ll i = -500;i<=500;i++) for(ll j=-500;j<=500;j++){
		if(check(i,j)){
			a = i,b = j;
			break;
		}
	}
	cout<<a<<" "<<b<<endl;
	return 0;
}

```


# [E - This Message Will Self-Destruct in 5s](https://atcoder.jp/contests/abc166/tasks/abc166_e)

## 题意

有一个数列，一对数字是好数对，当且仅当下标差等于数值和，求好数对个数

## 题解

等式移项

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll n;
map<ll,ll> mp;
ll ans;
int main(){
	cin>>n;
	for(ll i=0;i<n;i++){
		ll x;
		cin>>x;
		ans+=mp[i-x];
		mp[i+x]++;
	}
	cout<<ans<<endl;
	return 0;
}

```


# [F - Three Variables Game](https://atcoder.jp/contests/abc166/tasks/abc166_f)

## 题意

有三个数a,b,c，有n轮抉择，每一轮抉择会给出一个字符串"ab" "bc" ,"ac"

选择其中一个数加，另一个数减，问是否存在一种方案使得所有数最后都不是负数

## 题解

这题做错了，因为思维局限在dfs找两个数字相同情况下该选哪个，然后不是WA就是TLE，理论上可以，没写好

其实可以全搜索，然后找到一组解就exit(0)

一定要退出，不能返回，因为真的搜索完全就超时

```cpp
#include<bits/stdc++.h>
using  namespace std;
int n,a,b,c;
string s[100005];
char ans[100005];

bool ok;
void dfs(int ind,int a,int b,int c){
	if(a<0 || b<0 || c<0) return;
	if(ind==n){
		puts("Yes");
		for(int i = 0;i < n;i++){
			cout<<ans[i]<<endl;
		}
		exit(0);
	}
	else{
		if(s[ind]=="AB"){
			ans[ind]='A';
			dfs(ind+1,a+1,b-1,c);
			ans[ind]='B';
			dfs(ind+1,a-1,b+1,c);
		}
		else if(s[ind]=="AC"){
			ans[ind]='A';
			dfs(ind+1,a+1,b,c-1);
			ans[ind]='C';
			dfs(ind+1,a-1,b,c+1);
		}
		else{
			ans[ind]='B';
			dfs(ind+1,a,b+1,c-1);
			ans[ind]='C';
			dfs(ind+1,a,b-1,c+1);
		}
	}
	
}
int main(){
	cin>>n>>a>>b>>c;
	
	for(int i = 0;i<n;i++) cin>>s[i];
	dfs(0,a,b,c);
	
		puts("No");
	
	return 0;
}

```

