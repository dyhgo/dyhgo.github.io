# abc167


这个比赛尽犯些sb错🙃，先是把 j 写成 i ，然后把2E5写成1E5

# [A - Registration](https://atcoder.jp/contests/abc167/tasks/abc167_a)

## 题意

判断字符串T是不是S后加一个字符

## 题解

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
int main(){
	string s1,s2;
	cin>>s1>>s2;
	if(s2.substr(0,s2.length()-1)==s1) puts("Yes");
	else puts("No");
	return 0;
}
```

不知道strstr为啥就不行

# [B - Easy Linear Programming](https://atcoder.jp/contests/abc167/tasks/abc167_b)

## 题意

有三种卡片，分别写上数字1，0，-1，选择k张，让数字和最大

## 题解
贪心

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
int main(){
	int a,b,c,k;
	cin>>a>>b>>c>>k;
	int ans=0;
	if(a<=k){
		ans+=a;
		k-=a;
		if(b<=k){
			k-=b;
			if(c<=k){
				ans-=c;
			}else ans-=k;
		}
		else{
			ans+=k;
		}
	}
	else{
		ans+=k;
	}
	cout<<ans<<endl;
	return 0;
}
```


# [C - Skill Up](https://atcoder.jp/contests/abc167/tasks/abc167_c)

## 题意

高桥想学m个算法，有n本书，每本书有价格，和对每个算法的提升程度

问高桥想要每个算法都达到X，最少需要花多少钱

## 题解

数据不是很大，可以暴力模拟，数据大，可以考虑dp

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const long long inf = 0x3f3f3f3f;
int main(){
	//freopen("in.txt","r",stdin);
	int n,m,x;
	cin>>n>>m>>x;
	int ans=inf;
	int dat[n+1][m+1+1];
	for(int i=0;i<n;i++){
		cin>>dat[i][0];
		for(int j=1;j<=m;j++) cin>>dat[i][j];
	}
	for(int i=0;i<=(1<<n)-1;i++){
		int e[m+1+1]={0};
		int foo=0;
		for(int j=0;j<n;j++){
			if(i>>j&1){
				for(int k=1;k<=m;k++){
					e[k]+=dat[j][k];
				}
				foo+=dat[j][0];
			}
		}
		bool ok=true;
		for(int i=1;i<=m;i++) if(e[i]<x) ok=false;
		if(ok) ans=min(ans,foo);
		//for(int i=1;i<=m;i++) cout<<e[i]<<" "; cout<<endl;
	}
	cout<<(ans==inf?-1:ans)<<endl;
	return 0;
}
```


# [D - Teleporter](https://atcoder.jp/contests/abc167/tasks/abc167_d)

## 题意

有一个数组（长度最大为2E5），当你在下标为 i 时，可以tp到下标为 a[i] 

问 N(N<=1E18) 次tp后在哪里

## 题解

由于数据很大不能直接算

考虑到数组最大为2E5，所以有最大为2E5的循环节

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
bool vis[200005];
ll tim[200005];
ll ind[2000005];
ll loop=0;
ll a[200005];
int main(){
	//freopen("in.txt","r",stdin);
	ll n,k;
	cin>>n>>k;
	for(ll i=1;i<=n;i++){
		cin>>a[i];
	}
	ll ans=1;
	vis[1]=true;
	tim[1] = 1;
	ind[1] = 1;
	for(int i=2;i<=k;i++){
		ans = a[ans];
		if(vis[ans]){
			loop=i-tim[ans];break;
		}else{
			vis[ans]=true;
			tim[ans]=i;
			ind[i]=ans;
		}
	}
	if(loop==0){
		cout<<a[ans]<<endl;
	}	
	else{
		k-=tim[ans];
		k%=loop;
		cout<<a[ind[k+tim[ans]]]<<endl;
	}
	//cout<<loop<<endl;
	return 0;
}
```
# [E - Colorful Blocks](https://atcoder.jp/contests/abc167/tasks/abc167_e)

## 题意

给一排方块涂色，方块有n个，至多m种颜色，要求至多有k对相邻的块涂相同的颜色

求方案数

## 题解

高中排列组合


$$
ans = \sum\limits_{i=0}  ^ {k} {m * C_{n-1}^{i} * (m-1)^{n-1-i}}
$$

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod  = 998244353;
ll n,m,k;
ll fac[200005];
ll ans = 0;
ll qpow(ll x,ll n){
	ll res = 1;
	while(n>0){
		if(n&1) res=res*x%mod;
		x=x*x%mod;
		n>>=1;
	}
	return res;
}
ll C(int n,int m){
	return fac[n]%mod*qpow(fac[m],mod-2)%mod*qpow(fac[n-m],mod-2)%mod;
}
int main(){
	cin>>n>>m>>k;
	for(ll i=0;i<n+2;i++) fac[i] = 1;
	for(ll i=1;i<n+2;i++) fac[i] = i*fac[i-1]%mod;
	for(ll i=0;i<=k;i++){
		ans = ans + m*C(n-1,i)%mod*qpow(m-1,n-1-i)%mod;
	}
	cout<<(ans+mod)%mod<<endl;
	return 0;
}
```


# [F - Bracket Sequencing](https://atcoder.jp/contests/abc167/tasks/abc167_f)

## 题意

给n个由 '(' 和 ')' 组成的字符串，将n个字符串连接，问是否存在一种方案使得连接后的字符串是合法括号序列

## 题解

很好玩的一道题

一开始想用栈，太麻烦

用计数器，每读入一个open +1 否则 -1  ，这样就得到每个字符串的计数

把计数大的放前面，并且检查计数和是否为0

这样做是错的，样例2不给过

那就对连接后的备选字符串遍历，重新计数，查看中途不能有负数且最后为0

但这样也是错的，因为有可能正确的答案不是按从大到小的顺序排的

这种错误是因为（对于每个字符串）前面有几个close，后面一堆open导致计数变大，但其实是不合法的，因为前面几个close没得匹配

所以应该记录由close影响的“计数的最小值”

合理的排序应该是

对于两个字符串a,b

考虑两种情况 a+b b+a

对于每种连接考虑两种情况

遍历到a时，a的计数最小值

遍历到a+b时，a+b的计数最小值

```cpp
#include<bits/stdc++.h>
using namespace std;
int n;
string s;
vector<pair<int,int>> vt;
int main(){
	//freopen("in.txt","r",stdin);
	cin>>n;
	int sum=0;
	for(int i=0;i<n;i++){
		cin>>s;
		int cnt=0;int low=0;   //int cnt,low=0 WA T_T
		for(char c:s){
			if(c=='('){
				cnt++;
			}else cnt--;
			low=min(low,cnt);
		}
		vt.emplace_back(cnt,low);
		sum+=cnt;
	}
	if(sum!=0) {
		puts("No");return 0;
	}
	sort(vt.begin(),vt.end(),[](pair<int,int> pii1,pair<int,int> pii2){return min(pii1.second,pii1.first+pii2.second) > min(pii2.second,pii2.first+pii1.second);});
	int foo=0;
	for(pair<int,int> pii:vt){
		if(foo<-pii.second){
			puts("No");
			return 0;
		}foo+=pii.first;
	}
	puts("Yes");
	return 0;
}
```






