# Codeforces Round #644 (Div. 3)


可能是最简单的div3（不考dp dfs？）
# [A. Minimal Square](https://codeforces.com/contest/1360/problem/A)

## 题意

给俩相同的长方形，求面积最小的正方形使得容纳两个长方形，且长方形之间不重合

## 题解

两倍宽或两倍长

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int,int>;
using pll = pair<ll,ll>;
int  main(){
	int t;
	cin>>t;
	while(t--){
		int a,b;
		cin>>a>>b;
		if(a>b) swap(a,b);
		if(2*a<=b) cout<<b*b<<endl;
		else  cout<<4*a*a<<endl;
	}
	return 0;
}
```

# [B. Honest Coach](https://codeforces.com/contest/1360/problem/B)

## 题意

把一堆数分成两堆，求第一堆最大值和第二堆最小值的差的最小值

## 题解

排序，求相邻两数差的最小值，以此为分界

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int,int>;
using pll = pair<ll,ll>;
int  main(){
	int t;
	cin>>t;
	while(t--){
		int n;
		cin>>n;
		int a[55];
		for(int i=0;i<n;i++) cin>>a[i];
		sort(a,a+n);
		int ans = 1000000000;
		for(int i=0;i<n-1;i++){
			ans = min(ans,a[i+1]-a[i]);
		}
		cout<<ans<<endl;
	}
	return 0;
}
```

# [C. Similar Pairs](https://codeforces.com/contest/1360/problem/C)

## 题意

定义好数对 (a,b) a,b具有相同的奇偶性或者a,b差为1

给一堆数（偶数个），问是否能被划分成若干个好数对

## 题解
如果奇数的个数有偶数个就一定可以

否则检测是否有差为1的数对

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int,int>;
using pll = pair<ll,ll>;
int  main(){
	int t;
	cin>>t;
	while(t--){
		int n;
		cin>>n;
		vector<int> vt1;
		vector<int> vt2;
		for(int i=0;i<n;i++){
			int x;
			cin>>x;
			if(x&1) vt1.push_back(x);else vt2.push_back(x);
		}
		if(vt1.size()%2==0) puts("yes");
		else{
			bool flag=false;
			for(int i:vt1){
				if(find(vt2.begin(),vt2.end(),i+1)!=vt2.end() || find(vt2.begin(),vt2.end(),i-1)!=vt2.end()){
					flag=true;
					break;
				}
			}
			if(flag) puts("yes");
			else puts("no");
		}
	}
	return 0;
}
```

# [D. Buying Shovels](https://codeforces.com/contest/1360/problem/D)

## 题意

第i种包里有i个铁铲，总共有k种，只能选择一种包，可以买无数个，求最小需要买几包才能获得恰好n个铁铲

## 题解
k>=n时特判

其他只要遍历到开方，一一检测是否能被整除，不断min

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int,int>;
using pll = pair<ll,ll>;
int  main(){
	ll t;
	cin>>t;
	while(t--){
		ll n,k;
		cin>>n>>k;
		if(n<=k) cout<<1<<endl;
		else{
			bool flag = false;
			ll ans = 1e10;
			for(ll i=2;i<=(ll)(sqrt(n));i++){
				if(n%i==0 and i<=k){
					ans = min(ans , n/i);
					if(n/i<=k) ans = min(ans , i);
					flag=true;
					//break;
				}
			}
			if(!flag) cout<<n<<endl; else cout<<ans<<endl;
		}
	}
	return 0;
}
```

# [E. Polygon](https://codeforces.com/contest/1360/problem/E)

## 题意

判断一个矩阵是否是polygon游戏的产物

## 题解

对于每一个元素，如果是1就判断右边和下面是否有1

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int,int>;
using pll = pair<ll,ll>;
int  main(){
	int t;
	cin>>t;
	while(t--){
		int n;
		cin>>n;
		char mat[55][55];
		for(int i=0;i<n;i++) {
			cin>>mat[i];
		}
		bool ok = true;
		for(int i=0;i<n;i++)for(int j=0;j<n;j++){
			if(mat[i][j]=='1'){
				if(i==n-1 or j==n-1) continue;
				else{
					if(mat[i+1][j]=='1' or mat[i][j+1]=='1') continue;
					else {
						ok = false;
						break;
					}
				}
			}
		}
		if(ok) puts("yes");
		else puts("no");
	}
	return 0;
}
```

# [F. Spy-string](https://codeforces.com/contest/1360/problem/F)

## 题意

给一堆长度都是m的字符串，问是否存在一个长度也为m的字符串使得它对每个字符串都有“相同或不同的个数为1”

## 题解

数据小，暴力枚举

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int,int>;
using pll = pair<ll,ll>;
vector<string> vt;
int n,m;
bool ck(string q1,string q2){
	int dif = 0;
	for(int i=0;i<m;i++){
		if(q1[i]!=q2[i]) dif++;
	}
	return dif<=1 ? true : false;
}
bool check(string ss){
	bool ok = true;
	for(auto i : vt){
		if(!ck(ss,i)){
			ok = false;
			break;
		}
	}
	return ok;
}
int  main(){
	int t;
	cin>>t;
	while(t--){
		
		cin>>n>>m;
		string s;
		cin>>s;
		vt.clear();
		for(int i=0;i<n-1;i++) {
			string s1;
			cin>>s1;
			vt.push_back(s1);
		}
		bool ok = false;
		string s3;
		for(int i=0;i<m;i++){
			for(int j=0;j<26;j++){
				string s2  = s;
				s2[i] = 'a' + j;
				if(check(s2)){
					ok = true;
					s3 = s2;
					break;
				}
			}
		}
		if(ok) cout<<s3<<endl;
		else{
			cout<<-1<<endl;
		}
 	}
	return 0;
}
```

# [G. A/B Matrix](https://codeforces.com/contest/1360/problem/G)

## 题意

是否存在一个n*m的矩阵使得每一行有a个1，每一列有b个1，其他都是0

## 题解

第一行开头先填a个1，第二行在这个之后填1，然后回到第一个，直到填满a个

第三行以此类推

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200525155600606.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int,int>;
using pll = pair<ll,ll>;
int main(){
	int t;
	cin>>t;
	while(t--){
		int n,m,a,b;
		cin>>n>>m>>a>>b;
		if(n*a!=m*b) puts("no");
		else{
			int mat[55][55] = {0};
			int one = 0;
			for(int i=0;i<n;i++){
				for(int j=0;j<a;j++){
					mat[i][one] = 1;
					one++;
					one%=m;
				}
			}
			puts("yes");
			for(int i=0;i<n;i++){
				for(int j=0;j<m;j++){
				cout<<mat[i][j];
			}puts("");
			}
		}
	}
	return 0;
}
```


# [H. Binary Median](https://codeforces.com/contest/1360/problem/H)

## 题意

给几个长度为m的01串，求对于所有长度为m的01串形成的集合的补集中的中位数（字典序）



## 题解

将01串转成十进制，最后再转回来

由于数据规模是 2^60 所以不能枚举

以每个给定的数为节点，求补集内比它小的数有几个

求中位数是补集内的第几个

假设是第 i 个，求 i 落在以节点划分的哪个区间内

（几个WA点 

要用1LL 

iota和strtol函数做进制转化时精度太低，是int

）

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int,int>;
using pll = pair<ll,ll>;
ll tot;
ll ans;
int main(){
	int t;
	cin>>t;
	while(t--){
		ll n,m;
		cin>>n>>m;
		tot = (1LL<<m);  // use 1LL 
		ll rem = tot - n;
		rem--;
		ll ind = rem / 2;
		vector<pll> vt;
		vector<string> vts;
		for(ll i=0;i<n;i++) {
			string s;
			cin>>s;
			vts.push_back(s);
		}
		sort(vts.begin(),vts.end());   //sort first 
		for(ll i = 0;i<vts.size();i++){
			string st = vts[i];
			ll res=0;
			for(ll j=0;j<m;j++){
				res+=(st[j]=='1' ? (1LL<<(m-j-1)) : 0);
			}
			vt.emplace_back(res,res-i-1LL);
		}
		//sort(vt.begin(),vt.end());
		vt.emplace_back((1LL<<m),(1LL<<m) - n-1LL);

		for(ll i=0;i<vt.size();i++){
			if(vt[i].second==ind){
				ans = vt[i].first - 1;break;
			}else if(vt[i].second>ind){
				if(vt.size()==1 or i==0){
					ans = ind;break;
				}else{
					ans = vt[i-1].first + (ind - vt[i-1].second);break;
				}
			}
		}
		for(ll i=m-1;i>=0;i--){
			cout<<(ans>>i&1);
		}puts("");
		
	}
	return 0;
}
```

