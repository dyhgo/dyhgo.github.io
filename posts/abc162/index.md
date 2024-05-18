# abc162




# [A - Lucky 7](https://atcoder.jp/contests/abc162/tasks/abc162_a)

## 题意

问一个整数中是否含有数字7！

## 题解
ac代码

```python
s = input()
if '7' in list(s):
	print('Yes')
else:
	print('No')
```

# [B - FizzBuzz Sum](https://atcoder.jp/contests/abc162/tasks/abc162_b)

## 题意

找出不大于n的自然数中不能被3和5整除的数的和

## 题解

模拟或者集成成公式O(1)

ac代码

```python
n = int(input())
ans=0
for i in range(1,n+1):
    if i%3==0 or i%5==0:
        continue
    else:
        ans+=i
print(ans)
```

# [C - Sum of gcd of Tuples (Easy)](https://atcoder.jp/contests/abc162/tasks/abc162_c)

## 题意

看题目

## 题解

ac代码


```python
from math import gcd
k=int(input())
ans=0
for i in range(1,k+1):
    for j in range(1,k+1):
        for m in range(1,k+1):
            ans+=gcd(i,gcd(j,m))
print(ans)
```

# [D - RGB Triplets](https://atcoder.jp/contests/abc162/tasks/abc162_d)

## 题意

看题目

## 题解

存rgb对应的下标

每次for循环两个颜色，在第三种颜色的下标中二分查找

时间复杂度O(n^2lgn)

这种方法不是很高效，跑了1600ms

利用乘法原理，跑一遍字符串应该可以O(n)

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int n;
char s[4005];
vector<int> c[3];
long long ans=0;
void sol(int q,int w,int e){
	for(int i:c[q]) for(int j:c[w]){
		if(j>i){
			vector<int>::iterator it = upper_bound(c[e].begin(),c[e].end(),j);
			if(it!=c[e].end()){
				ans+=(int)(c[e].end()-it);
				int tgt=j+j-i;
				if(find(c[e].begin(),c[e].end(),tgt)!=c[e].end()) ans--;
			}else break;
		}
	}
}
int main(){
	//freopen("in.txt","r",stdin);
	cin>>n;
	for(int i=0;i<n;i++){
		cin>>s[i];
		switch(s[i]){
			case 'R':c[0].push_back(i);break;
			case 'G':c[1].push_back(i);break;
			case 'B':c[2].push_back(i);break;
		}
	}
	sol(0,1,2);
	sol(0,2,1);
	sol(1,2,0);
	sol(1,0,2);
	sol(2,1,0);
	sol(2,0,1);
	cout<<ans<<endl;
	//cout<<s+1<<endl;
	return 0;
}
```


# [E - Sum of gcd of Tuples (Hard)](https://atcoder.jp/contests/abc162/tasks/abc162_e)

## 题意

C题的升级版，个人觉得出得很好

官方题解，巧妙易懂

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200413133339919.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll =long long;
ll n,k;
ll ans;
ll dp[1<<17];
const ll mod = 1e9+7;
ll qpow(ll x,ll n)
{
    ll res =1;
    while(n>0)
    {
        if(n&1) res=res*x%mod;
        x=x*x%mod;
        n>>=1;
    }
    return res;
}
int main(){
	cin>>n>>k;
	for(ll i=k;i>0;i--){
		dp[i]=qpow(k/i , n);
		for(ll j=i+i;j<=k;j+=i){
			dp[i]-=dp[j];  //+mod%mod防溢出 
		}
	}
	for(ll i=1;i<=k;i++) ans=(ans+dp[i]*i)%mod;
	cout<<ans%mod<<endl;
	return 0;
}
```


# [F - Select Half](https://atcoder.jp/contests/abc162/tasks/abc162_f)


## 题意
看题目

## 题解
贪心dp

对于当前数，有两种情况，选和不选

如果前一个数选了，这个数就不能选

如果前一个数不选，这个数可选可不选，取决于选了是否会贡献

对于下标的奇偶性需要分开判断

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll=long long;
ll dat[1<<18];
ll sum[1<<18];
ll dp[1<<18];
ll n;
int main(){
	cin>>n;
	for(ll i=0;i<n;i++) {
		cin>>dat[i];
		if(i>=2 and i%2==0) sum[i]=dat[i]+sum[i-2];
		else if(i==0) sum[i]=dat[i];
	}
	for(ll i=0;i<n;i++){
		if(i&1){
			dp[i]=max(dp[i-2]+dat[i] , sum[i-1]);
		}
		else{
			dp[i]=max(dp[i-2]+dat[i] , dp[i-1]);
		}
	}
	cout<<dp[n-1]<<endl;
	return 0;
}

```









