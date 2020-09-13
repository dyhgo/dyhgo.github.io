# Codeforces Round #641 (Div. 2) A~D


# [A. Orac and Factors](https://codeforces.com/contest/1350/problem/A)

## 题意

对于一个数，每一次操作加上他的最小因子（除1外）

问k次操作后，这个数是多少

## 题解

奇数找最小因子加一下就变成偶数，偶数最小因子是2

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,k,t;
int ans;
int f(int x){
	for(int i=2;i*i<=x;i++){
		if(x%i==0){
			return i;
		}
	}
	return x;
}
int main(){
	cin>>t;
	while(t--){
		cin>>n>>k;
		if(n&1){
			n+=f(n);
			ans = n+(k-1)*2;
		}
		else{
			ans = n+k*2;	
		}
		cout<<ans<<endl;
	}
	return 0;
}
```

# [B. Orac and Models](https://codeforces.com/contest/1350/problem/B)

## 题意

给一数组，从中选几个数出来，满足严格递增，且对任意相邻下标a,b满足a|b，输出最长子序列的个数

## 题解

对于每个数都可以选择x2 x3 x4 x5...

所以对于每个数依次判断x2 x3 x4 x5...是否满足严格递增，由于越大的数越稀疏，所以不会超时

即 `if( a[j] > a[i] ) dp[j] = max(dp[j] , dp[i] + 1)`

```cpp
#include<bits/stdc++.h>
using namespace std;
int t,n;
int dat[100005];
int dp[100005];
int main(){
	cin>>t;
	while(t--){
		cin>>n;
		for(int i=1;i<=n;i++) cin>>dat[i],dp[i]=1;
		for(int i=1;i<=n;i++)for(int j=i+i;j<=n;j+=i){
			if(dat[j]>dat[i]) dp[j]=max(dp[j],dp[i]+1);
		}
		int ans=-1;
		for(int i=1;i<=n;i++){
			ans=max(ans,dp[i]);
		}
		cout<<ans<<endl;
	}
	return 0;
}
```


# [C. Orac and LCM](https://codeforces.com/contest/1350/problem/C)

## 题意

对于一个数组，每两个元素求lcm，把结果放到multi_set中，对multiset求gcd 

## 题解

从a[1]开始依次对后面的数求lcm，然后对结果求gcd


`gcd(lcm(a1,a2) , lcm(a1,a3) , ... , lcm(a1,an)) = lcm(a1 , gcd(a2,a3, ... , an)`


这样就可以利用后缀

最后对所有lcm求gcd

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll n;
ll dat[100005];
vector<ll> vt;
ll suf[100005];
ll lcm(ll a,ll b){
	return a*b/__gcd(a,b);
}
int main(){
	cin>>n;
	for(ll i=1;i<=n;i++) cin>>dat[i];
	suf[n]=dat[n];
	for(ll i=n-1;i>=2;i--){
		suf[i]=__gcd(dat[i],suf[i+1]);
	}
	for(ll i=1;i<=n-2;i++){
		vt.push_back(lcm(dat[i],suf[i+1]));
	}
	vt.push_back(lcm(dat[n-1],dat[n]));
	ll gcd=vt[0];
	for(ll i=1;i<vt.size();i++){
		gcd=__gcd(gcd,vt[i]);
	}
	cout<<gcd<<endl;
	return 0;
}
```

# [D. Orac and Medians](https://codeforces.com/contest/1350/problem/D)

## 题意

对于一个数组，可以选择一个区间，将区间内的数变成这个区间的中位数，如果有两个，则选较小，问是否能在若干次操作后把所有数字变成k

## 题解

特判数组是否有k

对于有k的情况

如果数组中>=k 的个数大于 <k的个数，就可以通过不断选2个数，其中一个是K

同化另一个数，达到同化所有

其他情况如果存在相邻的三个数，满足2个数>=k 就可以实现同化并不断同化

```cpp
#include<bits/stdc++.h>
using namespace std;
int t,n,k;
int dat[100005];
int main(){
	cin>>t;
	while(t--){
		bool ok=false;
		int low=0,hi=0;
		cin>>n>>k;
		for(int i=0;i<n;i++){
			cin>>dat[i];
			if(dat[i]==k) ok=true;
			if(dat[i]<k) low++;
			else hi++;
		}
		if(!ok){
			puts("no");
		}
		else if(hi>low) puts("yes");
		else{
			bool okk = false;
			for(int i=0;i<n-2;i++){
				int l=0,h=0;
				if(dat[i]<k) l++;else h++;
				if(dat[i+1]<k) l++;else h++;
				if(dat[i+2]<k) l++;else h++;
				if(h>l) okk=true;
			}
			if(okk) puts("yes"); else puts("no");
		}
	}
	return 0;
}
```



