# Codeforces Round #628 (Div. 2) A~D




# [A. EhAb AnD gCd](https://codeforces.com/contest/1325/problem/A)
### 题意
给一正整数x，求正整数a,b满足gcd(a,b)+lcm(a,b)=x

### 题解
数论思维题，a=1，b=x-1满足条件

ac代码

```cpp
#include<iostream>
using namespace std;
int main(){
    int t;
    cin>>t;
    while(t--) {
        int k;
        cin>>k;
        cout<<1<<" "<<k-1<<endl;
    }
    return 0;
}
```
# [B. CopyCopyCopyCopyCopy](https://codeforces.com/contest/1325/problem/B)
### 题意
给一数列，将数列无限复制，求最长严格单调子序列的个数

### 题解
计算数列有多少种数字就行

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll =long long;
ll t;
ll n;
set<ll> st;
ll tmp;
inline ll read(){
    ll x=0;ll f=1;char s=getchar();
    while(s<'0' or  s>'9') {
        if(s=='-')
            f-=1;
        s=getchar();
    }
    while(s>='0' and s<='9') {
        x=x*10+s-'0';
        s=getchar();
    }
    return x*f;
}
int main(){
//freopen("input.txt","r",stdin);	
	cin>>t;
	while(t--){
		st.clear();
		cin>>n;
		for(int i=0;i<n;i++){
			tmp=read();
			st.insert(tmp);
		 } 
		cout<<st.size()<<endl; 
	}	
	return 0;
}
```
# [C. Ehab and Path-etic MEXs](https://codeforces.com/contest/1325/problem/C)

### 题意
给一棵n个节点的树，求边权重的赋值方案（权重为0~n-2互异）

使得max(mex(u,v))最小

其中mex(u,v)为连接顶点u,v的简单路径中“不”包含边权重的最小值

### 题解
当树为一条链时，随便赋值

否则，树必然有一个顶点的度数为3

所有简单路径中必然经过0和1的边

要让最大值最小，就要让所有简单路径不同时存在0，1，2的边（这样max(mex)=2）

只需要把0，1，2分散在三度顶点的三条边上

其他随便赋值

以第2个样例为例

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200316202758292.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int n;
int deg[100005];
using pii=pair<int,int>;
vector<pii> vt;
bool lis;
//bool lef;
int p;
int main(){
	//freopen("input.txt","r",stdin);
	ios::sync_with_stdio(0);cin.tie(0);
	lis=true;
	cin>>n;
	for(int i=0,t1,t2;i<n-1;i++){
		cin>>t1>>t2;
		//if(t1>t2) swap(t1,t2);
		deg[t1]++;
		deg[t2]++;
		vt.emplace_back(t1,t2);
	}
	for(int i=1;i<=n;i++) {
		if(deg[i]>2){
			lis=false;
			p=i;
			break;
		}
	}
	if(lis){
		for(int i=0;i<n-1;i++) cout<<i<<endl;
	}
	else{
		int a=0,b=3;
		for(int i=0;i<n-1;i++){
			if((vt[i].first==p or vt[i].second==p ) and (a<3)){
				cout<<a++<<endl;
			}
			else cout<<b++<<endl;
		}	
	}
	
	return 0;
}
```
# [D. Ehab the Xorcist](https://codeforces.com/contest/1325/problem/D)
### 题意 
Given 2 integers u and v, find the shortest array such that bitwise-xor of its elements is u, and the sum of its elements is v.

### 题解
如果是3个数，则这3个数可以是u , (v-u)/2 , (v-u)/2  (利用异或性质)

如果是2个数，p，q

则考虑p+q和p^q的关系

利用以下性质可求得p,q

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200316203519731.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
注意题目说的正整数和样例，进行特判

ac代码

```cpp
#include<bits/stdc++.h>
using ll = long long;
using namespace std;
ll u,v;
int main(){
	cin>>u>>v;
	if((v-u)&1 || v-u<0) puts("-1");
	else if(v==0 && u==0) puts("0");
	else if(v==u) cout<<1<<endl<<u;
	else{
		ll p=(v-u)/2;
		ll q=u^p;
		if(p+q==v) cout<<2<<endl<<p<<" "<<q<<endl;
		else cout<<3<<endl<<u<<" "<<p<<" "<<p<<endl;
	} 
	return 0;
}
```
# [E. Ehab's REAL Number Theory Problem](https://codeforces.com/contest/1325/problem/E)
### 题意
不懂
### 题解
不会

# [F. Ehab's Last Theorem](https://codeforces.com/contest/1325/problem/F)
### 题意
不懂

### 题解
不会
