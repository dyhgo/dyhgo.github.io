# Codeforces Round #630 (Div. 2) A~E



# [A. Exercising Walk](https://codeforces.com/contest/1332/problem/A)

## 题意

给一坐标范围，初始位置，和左右上下移动的步数，问是否会出界

## 题解

加各种条件判断即可

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int t;
int a,b,c,d,x,y,x1,y1,x2,y2;
bool ok;
int main(){
	//freopen("input.txt","r",stdin);
	cin>>t;
	while(t--){
		ok=true;
		cin>>a>>b>>c>>d>>x>>y>>x1>>y1>>x2>>y2;
		if( (a-b>=0 and x-x1<a-b) or (b-a>0 and x2-x<b-a) or (c-d>0 and y-y1<c-d) or (d-c>0 and y2-y<d-c) or 
		(a==b and a!=0 and x1==x and x2==x) or (c==d and c!=0 and y1==y and y2==y) )
		ok = false;
		if(ok) puts("yes"); else puts("no");
	}
	return 0;
}
```



# [B. Composite Coloring](https://codeforces.com/contest/1332/problem/B)

## 题意
给n个合数上色，要求相同颜色的数字必须不互质，求最小着色数和着色方案

（题目保证着色数不大于11，且值不大于1000）

## 题解

两个合数不互质，即最小质因子相同

对每个数求最小质因子

相同则染同一种颜色（贪心）

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int t,n;
int a[1005];
int c[1005];
int p[]={1,2,3,5,7,11,13,17,19,23,29,31};
set<int> st;
bool vi[1005];
int main(){
	//freopen("input.txt","r",stdin);
	cin>>t;
	while(t--){
		cin>>n;
		//reset
		memset(c,0,sizeof(c));
		st.clear();
		memset(vi,0,sizeof(vi));
		
		for(int i=0;i<n;i++) cin>>a[i];
		for(int i=0;i<n;i++){
			for(int j=1;j<=12;j++){
				if(a[i]%p[j]==0){
					c[i]=j;
					st.insert(j);
					break;
				}
			}
		}
		
		
		int num=st.size();
		int index=0;
		int cnt;
		
		for(int i=0;i<n;i++){
			if(!vi[i]){
				cnt=c[i];
				vi[i]=true;
				index++;
				c[i]=index;
				for(int j=i+1;j<n;j++){
					if(!vi[j] and c[j]==cnt){
						c[j]=index;
						vi[j]=true;
					}
				}
			}
		}
		
		cout<<num<<endl; for(int i=0;i<n;i++) cout<<c[i]<<" "; cout<<endl;
	}
	return 0;
}
```


# [C. K-Complete Word](https://codeforces.com/contest/1332/problem/C)

## 题意

给一字符串和k，要求改其中一些字符，使字符串是回文串且周期为k，求最小改

动数

## 题解

把字符串分成k个部分，每个部分都是回文串

字符串中的一些字符是相互捆绑的（即要相同），与其他字符相互独立



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200401230730155.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

对于相互捆绑的字符，查询出现次数最多的字符，然后都替换成它

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int t,n,k;
string s;
int kp;
int z[27];
int main(){
	//freopen("input.txt","r",stdin);
	cin>>t;
	while(t--){
		cin>>n>>k;
		cin>>s;
		
		//reset
		//memset(z,0,sizeof(z));
		kp=0;
		for(int i=0;i<=k-i-1;i++){
			memset(z,0,sizeof(z));
			
			for(int j=i;j<n;j+=k){
				z[s[j]-'a']++;
			}
			if(i<k-i-1)
			{
				for(int j=k-i-1;j<n;j+=k){
					z[s[j]-'a']++;
				}
			}
			kp+=*max_element(z,z+27);
			//cout<<*max_element(z,z+27)<<endl;
		}
		cout<<n-kp<<endl;
	}
}
```

# [D. Walk on Matrix](https://codeforces.com/contest/1332/problem/D)

## 题意

给一矩阵，从矩阵的左上角走到右下角，只能往右和往下走

走到一个元素上，则自身的值变为当前自身的值&元素上的值

存在一种走法使得最后得到的值最大

给一dp算法和k，求满足经dp算法算出的值和最大值差k的矩阵

## 题解

构造矩阵

让最大值为k

经dp算法输出的值为0

根据(m+k)&k=k , (m+k)&m=m ,  m&k=0

其中m的二进制位1000...

进行构造（不唯一）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200401231818761.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int m=(1<<17);
int k;
int main(){
	cin>>k;
	cout<<2<<" "<<3<<endl;
	cout<<m+k<<" "<<m<<" "<<0<<endl<<k<<" "<<m+k<<" "<<k<<endl;
	return 0;
}
```


# [E. Height All the Same](https://codeforces.com/contest/1332/problem/E)

## 题意
给一n*m的网格，和L，R

在网格上进行初始化放方块，要求每一格的方块数在L到R之间

有两种操作

1.在两（边相邻）相邻网格上各增加一块

2.在一个网格上增加两块

求能够使所有网格高度相等的初始化方案数

## 题解
dif=R-L+1

当网格数量为奇数时，随便放，有dif^(n*m)种

当网格数量为偶数时，如果dif为偶数，则有一半情况不满足（每个满足的都对应

一个不满足的），有dif^(n*m)/2

当dif为奇数时，则中间会多出一个没有对应的方案，有(dif^(n*m)+1)/2

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll=long long;
const ll mod = 998244353;
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
	//freopen("input.txt","r",stdin);
	ll n,m,l,r;
	cin>>n>>m>>l>>r;
	ll ans;
	ll dif=r-l+1;
	if((n*m)&1) ans=qpow(dif,n*m)%mod;
	else if(dif%2==0) {
		ans=qpow(dif,n*m)%mod*qpow(2,mod-2)%mod;
	}
	else{
		ans=(qpow(dif,n*m)+1)%mod*qpow(2,mod-2)%mod;
	}
	cout<<ans<<endl;
}
```

