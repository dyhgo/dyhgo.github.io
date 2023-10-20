# abc161



# [A - ABC Swap](https://atcoder.jp/contests/abc161/tasks/abc161_a)

## 题意

给三个数a,b,c，交换ab的值，交换ac的值，输出

## 题解
模拟

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	int a,b,c;
	cin>>a>>b>>c;
	swap(a,b);
	swap(a,c);
	cout<<a<<" "<<b<<" "<<c<<endl;
	return 0;
}

```


# [B - Popular Vote](https://atcoder.jp/contests/abc161/tasks/abc161_b)

## 题意

有n件商品，每种商品有一价格，给一数m

求能否从中选出m件商品使得它们的价格都不小于商品总价格（n件）/(4*m)

## 题解

对价格求和，求出界限，对商品价格排序，检查前m件商品价格是否都满足这个限

制

ac代码

```cpp
#include<iostream>
#include<bits/stdc++.h>
using namespace std;
//using ll = long long;
int n,m;
int a[1005];
bool cmp(int a,int b){
	return a>b;
}
int main(){
	//freopen("in.txt","r",stdin);
	cin>>n>>m;
	for(int i=0;i<n;i++)cin>>a[i];
	int sum=0;
	for(int i=0;i<n;i++) sum+=a[i]; 
	int b=ceil((double)sum/(4*m));
	//cout<<sum;
	//cout<<b;
	
	bool ok=true;
	sort(a,a+n,cmp);
	//int ans=0;
	for(int i=0;i<m;i++){
		//ans+=a[i];
		if(a[i]<b){
			ok=false;
			break;
		}
	}
	    puts(ok? "Yes":"No");
	 	return 0;
}

```


# [C - Replacing Integer ](https://atcoder.jp/contests/abc161/tasks/abc161_c)

## 题意

给俩数n,k

一直做如右操作，将n替换成|n-k|

求这个过程中n能达到的最小值

## 题解

找规律，不断地去迎合所有的情况，就会莫名其妙ac

或者用数学方法做

ac代码

```cpp
#include<iostream>
using namespace std;
using ll = long long;
ll n,k;
int main(){
	//freopen("in.txt","r",stdin);
	cin>>n>>k;
	if(n==k){
		cout<<0<<endl;
	}
	else{
		if(n<k) n=k+(k-n);
	
	cout<<min((k-n%k)%k,n-k)<<endl;
	}
	return 0;
}

```


# [D - Lunlun Number](https://atcoder.jp/contests/abc161/tasks/abc161_d)

## 题意

定义“lunlun数”：对于一个数，相邻两个位数的数字差不大于1

给一数n，求第n个“lunlun数”

## 题解

预处理最大的情况

dfs，dp都行

数字，字符串都行

此处用bfs做

对于一个数，在它的末尾增加新的数字，9和0有两种情况，其他有三种情况

先处理一位数，再处理两位数。。。

用bfs经典方法队列实现

用maxn进行循环退出判断

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
vector<string> vt;
int num=0;
queue<string> q;
bool cmp(string s1,string s2){
	if(s1.length()==s2.length()){
		return s1<s2;
	}
	else return s1.length()<s2.length();
}

int main(){
	q.push("1");
	q.push("2");
	q.push("3");
	q.push("4");
	q.push("5");
	q.push("6");
	q.push("7");
	q.push("8");
	q.push("9");
	
	while(!q.empty() and num<100005){
		string s=q.front();
		q.pop();
		vt.push_back(s);
		num++;
		
		int len=s.length();
		char ch=s[len-1];
		if(ch=='9'){
			q.push(s+'8');
			q.push(s+'9');
		}
		else if(ch=='0'){
			q.push(s+'0');
			q.push(s+'1');
		}
		else{
			char ch1= ch-1,ch2=ch,ch3=ch+1;
			string s1=s,s2=s,s3=s;
			s1.insert(s1.end(),ch1);
			s2.insert(s2.end(),ch2);
			s3.insert(s3.end(),ch3);
			
			q.push(s1);
			q.push(s2);
			q.push(s3);
		}
	}

	sort(vt.begin(),vt.end(),cmp);
	
	int n;cin>>n;
	n--;
	cout<<vt[n]<<endl;

	return 0;
}

```


cmp可以用lambda表达式写

# [E - Yutori](https://atcoder.jp/contests/abc161/tasks/abc161_e)

## 题意

给两个数k,c和一串由ox组成的字符串，表示每一天

从中选k天上班

限制条件：x不能上班，上完一天班后要连续休息c天

求所有可能的上班方案中，哪一天是必须上班的

## 题解

枚举必超时

其实只要贪心地从第一个开始选k个，从最后开始贪心地往前选k个

查看是否有交集就可

小证明

如果交集为空集，则不存在，因为这两种情况是所有情况的子集

如果存在（数量不大于k，下证），则对于所有中间取的情况一定会和左右两种情

况重叠，左右取产生的交集是最苛刻的满足条件



有几个细节

1.可以特判n==2

2.当从最左边开始选可以选到k+1个，则不存在必须上班的那一天

小证明

如果有k+1天，则随便从中选一天不上班，其余的天数都上班

对于所有的情况，它们的交集为空集，与右边的交集为空集（空集与任何集合

的交集都为空集）

3.同理右边也不能选到k+1个


ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,k,c;
char s[200005];
set<int> st;
set<int> st2;
set<int> st3;
int main(){
	//freopen("in.txt","r",stdin);
	scanf("%d%d%d%s",&n,&k,&c,s);
	
	int cnt=0;
	for(int i=0;i<n;i++){
		if(s[i]=='o') {
			st.insert(i+1);
			cnt++;
			i+=c;
		}
		if(cnt>k) return 0;  //一定不存在必须工作的一天 
	}
	
	cnt=0;
	for(int i=n-1;i>=0;i--){
		if(s[i]=='o'){
			st2.insert(i+1);
			cnt++;
			i-=c;
		}
		if(cnt>k) return 0;  //一定不存在必须工作的一天 
	}
	set_intersection(st.begin(),st.end(),st2.begin(),st2.end(),ostream_iterator<int>(cout,"\n"));
	
	return 0;
}

```


# [F - Division or Substraction](https://atcoder.jp/contests/abc161/tasks/abc161_f)


## 题意

给俩数n,k（2<=k<=n）

不断进行如下操作

如果k能整除n，则n/=k

否则n-=k

当n<k时停机

问满足最后n==1的k的个数

## 题解

设置一个计数器，遍历所有的k进行判断

这样会T，所以进行优化

首先只需遍历到√n（下证）

对于每个k

分两种情况

如果n%k==1，则满足条件

且(n-1)/k也满足条件

如果n%k==0则不断进行n/=k

最后判断是否n%k==1

这种情况下只有k满足条件，计数器计数

注意k*k=n-1只能计一个数

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
int main(){
	//freopen("in.txt","r",stdin);
	ll n;
	cin>>n;
	
	if(n==2) {
		cout<<1<<endl;return 0;
	}
	ll ans=2; //n和n-1 
	for(ll i=2;i*i<=n;i++){
		if(n%i==1){
			if(i*i==n-1) ans++; else ans+=2;
		}
		else if (n%i==0){
			ll t=n;
			while(t%i==0) t/=i;
			if(t%i==1) ans++;
		}
	}
	cout<<ans<<endl;
	return 0;
}

```


