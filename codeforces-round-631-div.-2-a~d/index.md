# Codeforces Round #631 (Div. 2) A~D



# [A. Dreamoon and Ranking Collection](https://codeforces.com/contest/1330/problem/A)

## 题意

给n个数和数字k，你可以对数列进行扩充k个数，使得扩充后的数列出现1~m的

数字至少一次，求m的最大值

## 题解
用计数器对原始数列计数，如果不连续，则k递减，直到k耗光，最后还要判断

原始数列能否再连续下去，直到断开

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,x;
int a[105];
int t;
set<int> s;
int main(){
	//freopen("in.txt","r",stdin);
	cin>>t;
	while(t--){
		//reset
		s.clear();
		
		cin>>n>>x;
		for(int i=0;i<n;i++)
		cin>>a[i];
		//sort(a,a+n);
		
		for(int i=0;i<n;i++){
			s.insert(a[i]);
		}
		
		
		int cnt=1;set<int>::iterator it;
		for(it =s.begin();it!=s.end();){
			if((*it)!=cnt){
				x--;cnt++;
			}
			else {
				it++;
				cnt++;
			}
			if(x==0) break;
			
		}
		if(it==s.end() and x!=0){
			cnt+=x;
		}
		
		while(*it==cnt){
			it++;cnt++;
		}
		
		cout<<cnt-1<<endl;
	}
	return 0;
}
```

# [B. Dreamoon Likes Permutations](https://codeforces.com/contest/1330/problem/B)

## 题意

定义“排列”为一个长度为n的数列，数列中1~n的数字必须且只能出现一次

给一数列，对数列进行切割，将数列分成两部分，使得两部分都是“排列”

求分割方案数

## 题解

用两个集合存左右两部分

如果两个集合的最大值都等于数量，则这种分割可以得到排列

遍历数组，同时对俩集合进行增删操作

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int t;
int n;
int a[200005];
set<int> s1;
set<int> s2;
vector<int> ans;
int num[200005];
int main(){
	ios::sync_with_stdio(0);cin.tie(0);
//	freopen("in.txt","r",stdin);
	cin>>t;
	while(t--){
		//TODO reset
		s1.clear();
		s2.clear();
		ans.clear();
		memset(num,0,sizeof(num));
		
		cin>>n;
		for(int i=0;i<n;i++){
			cin>>a[i];
		}
		
		//preprocess
		s1.insert(a[0]);
		for(int i=1;i<n;i++){
			s2.insert(a[i]);
			num[a[i]]++;
		}
		
		for(int i=1;i<n;i++){
			if(s1.size()==i and s2.size()==n-i and *(--s1.end())==i and *(--s2.end())==n-i){
				ans.push_back(i);
			}
			s1.insert(a[i]);
			if(num[a[i]]==1){
				s2.erase(a[i]);
			}
			num[a[i]]--;
		}
		if(ans.size()!=0)
		{
			cout<<ans.size()<<endl;
		for(auto i:ans){
			cout<<i<<" "<<n-i<<endl;
		}
		}
		else cout<<0<<endl;
	}
	return 0;
}
```

# [C. Dreamoon Likes Coloring](https://codeforces.com/contest/1330/problem/C)

## 题意

给一数列，每次可以对其中连续的li个元素进行染色，每次染的颜色都不相同，问

所有染色结束后，能否使所有数字都染色，且每种颜色都存在

## 题解

首先特判

如果区间的长度和小于数列长度，则不存在

如果对于第i个长度，区间的起始位置小于i，则不存在

贪心法

让第一个区间从第一个数开始，第二个区间从第二个数开始。。。

这样就能保证至少有一个数染这种颜色

但这样会出现一个问题

当所有区间都用完之后，右边的数可能不会染色

这时候就要将某些区间右移（不能在放在第i个）

判断条件就是，对于这个区间，是否存在右边为空的情况（即n-sum>i）

其中sum为剩余部分长度和

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll n,m;
ll l[100005];
ll sum=0;
ll ans[100005];
int main(){
	//freopen("in.txt","r",stdin);
	cin>>n>>m;
	bool ok=true;
	for(int i=0;i<m;i++) {
		cin>>l[i];
		//l[i];
		sum+=l[i];
		if(n-l[i]+1<=i){
			ok=false;
		}
	}
	
	if(!ok or sum<n) {
		cout<<-1<<endl;
		return 0;
	}
	
	else{
		for(int i=0;i<m;i++){
			if(n-sum>i){
				ans[i]=n-sum;
			}
			else ans[i]=i;
			
			sum-=l[i];
		}
		for(int i=0;i<m;i++) cout<<ans[i]+1<<" "; cout<<endl;return 0;
	}
	
	
}
```


# [D. Dreamoon Likes Sequences](https://codeforces.com/contest/1330/problem/D)


## 题意

给俩数d,m

求满足下列条件的数列的个数%m

1<= a1 < a2 <... <  an <=d

a1 XOR  a2  > a1

a1 XOR  a2 XOR a3 > a1 XOR a2

a1 XOR a2 XOR a3 XOR a4 > a1 XOR a2 XOR a3

.......

## 题解


二进制构造 + 动态规划

对于一个数a，构造一个数b，使得b>a ，且 b XOR a > a

a的二进制首位为0（可以添加0，没影响）

b的二进制首位为1

那么b XOR a 的首位一定为1，满足条件

b的首位为1，其他位随便填

所以dp[i]表示长度为i的个数

那么dp[i] = (2^i) * dp[i-1] + dp[i-1]  （加上之前的个数）

但这样一直做可能会超过d

所以要判断条件2^i<=d

剩余的部分不再有2^i种

而是d-2^i+1种

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll d,m,t;
ll dp[30];
ll init=2;
int main(){
//	freopen("in.txt","r",stdin);
	cin>>t;
	while(t--){
		cin>>d>>m;
		if(d==1){
			cout<<1%m<<endl;
		}
		else{
			dp[0]=init;
		int i;
		for( i=1;(1<<i)<=d;i++){
			dp[i]=(1<<i)*dp[i-1]%m+dp[i-1]%m;
		}
		i--;
		dp[i]=(d-(1<<i)+1)*dp[i-1]%m+dp[i-1]%m;
		cout<<(dp[i]-1+m)%m<<endl;                   //加m防止溢出 
		}
	}
	return 0;
}
```

 



