# abc159




# [A - The Number of Even Pairs](https://atcoder.jp/contests/abc159/tasks/abc159_a)
## 题解
ac代码 (awk语言)

```awk
$0=$1*--$1/2+$2*--$2/2_
```
# [B - String Palindrome](https://atcoder.jp/contests/abc159/tasks/abc159_b)
## 题解
ac代码 (perl语言)

```perl
print<>=~/^(.+).\1$/?Yes:No
```
# [C - Maximum Volume](https://atcoder.jp/contests/abc159/tasks/abc159_c)
## 题解

ac代码 (perl语言)

```perl
print<>**3/27
```

# [D - Banned K](https://atcoder.jp/contests/abc159/tasks/abc159_d)
## 题解

ac代码 (perl语言)

```perl
<>;print$.-@$_,$/for grep$.+=++$#$_,glob`dd`
```
# [E - Dividing Chocolate](https://atcoder.jp/contests/abc159/tasks/abc159_e)
## 题意
一块巧克力由h行w列的方块组成，每个方块为白或黑

你可以对巧克力进行切割，切割只能沿着方块边缘横切或竖切切到底

问最少需要切几刀，使每个独立块都有不多于k个白巧克力方块

## 题解
### 贪心 枚举
和牛客小白月赛26的A题很像

由于h的数据不大，枚举行的所有可能情况，先考虑横切，横切不够再竖切

考虑竖切时，如果最大的块大于k，就实施竖切

遍历所有情况求最小值

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int h,w,k;
string s[12];
int main(){
	//freopen("input.txt","r",stdin);
	int coun=0;
	cin>>h>>w>>k;
	for(int i=0;i<h;i++){
		cin>>s[i];
	}
	//特判                                                                   //没有特判，用u=0代替 WA 
	for(int i=0;i<h;i++) for(int j=0;j<w;j++) if(s[i][j]=='1') coun++;
	 if(coun<=k) cout<<0<<endl;
	else{
		int ans=1e9;
	for(int u=1;u<(1<<(h-1));u++){
		int x=__builtin_popcount(u);
		int cut_num=x;
		int block[x+1]={0};
		int p=0;
		int mx=0;
		bool flag=true;                                                      //没有设置flag WA 
		for(int j=0;j<w;j++){
			for(int i=0;i<h;i++){
				block[p]+=s[i][j]-'0';
				mx=max(mx,block[p]);
				if(u>>i&1) p++;
			}
			//mx=max(mx,block[p]);
			if(mx>k) {
				if(j==0) { flag=false;break;                                 
				}
				cut_num++;
				mx=0;
				memset(block,0,sizeof(block));
				p=0;                                                        //没有重置p WA 
				for(int i=0;i<h;i++){                                       //没有记忆（重新计算） WA 
				block[p]+=s[i][j]-'0';
				mx=max(mx,block[p]);
				if(u>>i&1) p++;
			}
			}
			p=0;                                                            //没有重置p WA 
		}
		if(flag) ans=min(ans,cut_num);
	}
	cout<<ans<<endl;
	}
	return 0;
}

```

这道题做了快一个小时，WA了特别多次，每次都WA两三个测试点，主要是细节，WA点在代码中已标注

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200323210555483.PNG)

# [F - Knapsack for All Segments](https://atcoder.jp/contests/abc159/tasks/abc159_f)

## 题意
给一数列，求对每一可能区间，其子区间内的数和等于s的子区间个数

对所有可能区间求和

## 题解
### 动态规划
奇妙的动态规划

`dp[i][j]  = sum(f(left,i))`  当和为 `j` 时

可以的得到递推式

`dp[i][j]=dp[i-1][j] `     

`dp[i][j]+=dp[i-1][j-data[i]]`

有一个很重要的点在代码中标出

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll n,s;
ll data[3005];
ll dp[3005][3005];
const ll mod=998244353;
int main(){
	//freopen("input.txt","r",stdin);
	cin>>n>>s;
	for(ll i=1;i<=n;i++) cin>>data[i];
	dp[0][0]=1;
	for(ll i=1;i<=n;i++) for(ll j=0;j<=s;j++)
	{
		dp[i][j]=dp[i-1][j];
		if(j-data[i]>=0) dp[i][j]+=dp[i-1][j-data[i]];
		if(j==0) dp[i][j]++;  //当j-data[i]==0时，a[i]这一个也要算上 
		dp[i][j]%=mod;
	}
	ll ans=0;
	for(ll i=1;i<=n;i++) ans=(ans+dp[i][s])%mod;
	cout<<ans%mod<<endl;
	return 0;
}

```

一遍过，芜湖~


have a good day ^_^


