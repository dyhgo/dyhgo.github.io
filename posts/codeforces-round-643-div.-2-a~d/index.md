# Codeforces Round #643 (Div. 2) A~D



# [A. Sequence with Digits](https://codeforces.com/contest/1355/problem/A)

## 题意

看题目

## 题解

模拟，minDigit(x) 等于0 时打断

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const int inf = 0x3f3f3f3f;
const int ninf = 0xc0c0c0c0;
ll t;
ll a,k;
ll maxD(ll n)
{
 ll res=n%10;
 while(n)
 {
  res=max(res,n%10);
  n/=10;
 }
 return res;
}
ll minD(ll n)
{
 ll res=n%10;
 while(n)
 {
  res=min(res,n%10);
  n/=10;
 }
 return res;
}
ll cal(ll n)
{
 return n+maxD(n)*minD(n);
}
int main(){
	cin>>t;
	while(t--){
		cin>>a>>k;
		for(ll i=1;i<k;i++)
		{
			//cout<<a<<" "<<i<<" "<<maxD(a)<<" "<<minD(a)<<" "<<endl;
			a=cal(a);
			if(minD(a)==0) break;
		}
		cout<<a<<endl;
	}
	return 0;
}
```

# [B. Young Explorers](https://codeforces.com/contest/1355/problem/B)
##  题意

有一个数组，将它们划分成n组（不用每一个数字都被划分），保证每一组的每个数字都<=这组数字的个数，求最多划分成几组

## 题解

贪心

方法有很多，其中之一是

排序，对当前数字x，从它开始选x个，如果有不满足的就继续选，直到满足条件

最后一个区间如果不能满足条件则并到前一个区间内

（之前一直以为只要从头到尾或从尾到头贪心地选择数字对应的区间即可）

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const int inf = 0x3f3f3f3f;
const int ninf = 0xc0c0c0c0;
int t;
int n;
int a[200005];
int main(){
	//freopen("in.txt","r",stdin);
	cin>>t;
	while(t--){
		cin>>n;
		for(ll i=0;i<n;i++){
			cin>>a[i];
		}
		sort(a,a+n);
		int ans=0;
		for(int i=0;i<n;){
			int t=a[i];
			int x=i+t-1;
			while(t<a[x] and t<=n and x<=n){
				t++;
				x++;
			}
			if(x<n) ans++;
			i+=t;
		}
		cout<<ans<<endl;
	}
	return 0;
}
```



# [C. Count Triangles](https://codeforces.com/contest/1355/problem/C)

## 题意

给四个数 abcd （从小到大），划分成三个区间，分别从三个区间中选三个数组成三条边，求组成三角形的个数

## 题解

由于顺序的特殊性，只要检查前两个区间选出来的数之和有没有大于第三个区间选出来的数

对于前两个区间选出来的数之和落在 [a+b , b+c]

然后再判断第三个区间有几个数满足条件 

记录一下每个数出现的次数（找规律）

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll a,b,c,d;
ll ran[1000005];
int main(){
	cin>>a>>b>>c>>d;
	ll low=a+b;
	ll hi=b+c;
	ll num=min(b-a,c-b);
	num++;
	for(ll i=1;i<=num;i++){
		ran[low]=i;
		low++;
	}
	for(ll i=a+b+num;i<=hi-num;i++){
		ran[i] = num;
	}
	for(ll i=hi-num+1;i<=hi;i++){
		ran[i] = num;
		num--;
	}
	//for(ll i=3;i<=5;i++) cout<<ran[i]<<" ";
	ll ans=0;
	for(ll i=a+b;i<=b+c;i++){
		ll mul = ran[i];
		if(i-c-1>=0) {
			if(i-1>d){
				ans+=(d-c+1)*mul;
			}else{
				ans+=mul*(i-c);
			}
		}
		//cout<<ans<<endl;
	}
	cout<<ans<<endl;
	return 0;
}
```

# [D. Game With Array](https://codeforces.com/contest/1355/problem/D)

## 题意

给俩数 n s (n<=s) 问是否存在满足下列条件的数组

数组的长度为 n 元素和为 s

存在k使得任何一个子数组的和都不等于 k或s-k

## 题解

构造

由于 k 或 s-k 所以当 s/2<n 时不存在

由于数的奇偶性，可以构造全是偶数的数组(2) 这样随便选一个奇数就满足条件

但对于s是奇数时，最后一个元素是奇数，如果把前面全部构造成2，且s/2<n

这样最后一个一定>=3

所以k选择1

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	int n,s;
	cin>>n>>s;
	if(s/2<n){
		 puts("no");
	}
	else{
		puts("yes");
		for(int i=0;i<n-1;i++){
			cout<<2<<" ";
		}
		cout<<s-2*n+2<<endl;
		cout<<1<<endl;
	}
	return 0;
}
```

