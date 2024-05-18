# Codeforces Round #632 (Div. 2) A~C



# [A. Little Artem](https://codeforces.com/contest/1333/problem/A)

## 题意
给一网格染色，黑或白。要求满足以下条件的黑方块比白方块少1

如果是黑方块，则至少与一白方块边相邻，否则不计数

反之亦然

## 题解
左上角染白，其他全黑

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	int t;
	cin>>t;
	while(t--){
		int n,m;
		cin>>n>>m;
		for(int i=0;i<n;i++){
			for(int j=0;j<m;j++){
				if(i==0 and j==0){
					cout<<'W';
				}
				else cout<<'B';
			}
			cout<<endl;
		}
	}
	return 0;
}
```


# [B. Kind Anton](https://codeforces.com/contest/1333/problem/B)

## 题意

两数组a,b

a初始时只由{0,-1,1}的子集组成

操作方式：将一个数前面的某一个数加到这个数上

问能否经过一些操作后得到数组b

## 题解

由于一个数只会被前面的数影响，且前面的数不受影响

再加上0,-1,1的特殊性，只需要考虑b[i]>a[i]时，前面是否有1

或b[i]<a[i]时前面是否有-1

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int t;
int n;
int a[100005];
int b[100005];
int main(){
	//freopen("in.txt","r",stdin);
	cin>>t;
	while(t--){
		bool one=false;
		bool none=false;

		cin>>n;
		for(int i=0;i<n;i++) cin>>a[i];
		for(int i=0;i<n;i++) cin>>b[i];
		
		if(a[0]!=b[0]) {
			cout<<"NO\n"; continue;
		}
		
		if(a[0]==1) one=true;
		if(a[0]==-1) none=true;
		bool ok=true;
		for(int i=1;i<n;i++){
			if(b[i]>a[i] and !one) {
				 ok =false;break;
			}
			if(b[i]<a[i] and !none){
				 ok=false;break;
			}
			if(a[i]==1) one=true;
			if(a[i]==-1) none=true;
	}
	if(ok) cout<<"YES\n"; else cout<<"NO\n";
}
return 0;
}
```


# [C. Eugene and an array](https://codeforces.com/contest/1333/problem/C)

## 题意

给一数组，问有多少个“好子数组“

定义，好子数组：这个数组是原数组的子集，元素之和不等于0，其子集都是好子

数组

## 题解
类似于依赖前缀和动态规划

从左向右遍历，查看是否有和为0的区间，其中区间的右边界为当前数

查看是否有和为0的区间只需要查看是否有前缀和为当前数的区间

如果有则取最右端（因为好子数组的子集也是好子数组）

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll=long long;	ll n;ll x;ll sum=0;map<ll,ll> pos;ll cp=-1;ll ans=0;
int main(){
	//freopen("in.txt","r",stdin);

	cin>>n;
	pos[0]=0;
	for(int i=1;i<=n;i++){
		cin>>x;
		sum+=x;
		if(pos.count(sum)) cp=max(cp,pos[sum]);
		ans+=i-cp-1;
		pos[sum]=i;
	}
	cout<<ans<<endl;
	return 0;
}
```




# [D. Challenges in school №41](https://codeforces.com/contest/1333/problem/D)

# [E. Road to 1600](https://codeforces.com/contest/1333/problem/E)

# [F. Kate and imperfection](https://codeforces.com/contest/1333/problem/F)


