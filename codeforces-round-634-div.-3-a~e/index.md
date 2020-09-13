# Codeforces Round #634 (Div. 3) A~E



# [A. Candies and Two Sisters](https://codeforces.com/contest/1335/problem/A)

## 题意

将一堆糖果分给两个女孩，其中一个要比另一个多，问有几种分法

## 题解

可以看出规律

ac代码

```python
t=int(input())
for i in range(t):
    n=int(input())
    print((int)((n-1)/2))
```


# [B. Construct the String](https://codeforces.com/contest/1335/problem/B)

## 题意

输入a,b,c 构造字符串，使字符串的长度为a，任意b个字符有c个不同字符

## 题解

如果b=6,c=4就构造类似于aaabcdaaabcd..

其他同理

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int t,n,a,b;
char s[2005];
int main(){
	cin>>t;
	while(t--){
		cin>>n>>a>>b;
		for(int i=0;i<a-b+1;i++){
			s[i]='a';
		}
		char x;
		for(int i=a-b+1, x='b';i<a;i++,x++){
			s[i]=x;
		}
		for(int j=0,i=0;j<n;j++){
			if(i==a) i=0;
			cout<<s[i++];
		}
		cout<<endl;
	}
	return 0;
}
```


# [C. Two Teams Composing](https://codeforces.com/contest/1335/problem/C)

## 题意

从一个数列中，选一些数组成两个数列，使这两个数列长度相等，一个数列数字

全部相同，一个数列数字全部不同，求最长长度

## 题解

求数列中出现次数最多的个数和总共有多少种数字，瞎比较一下即可

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
map<int,int> mp;
int t,n;
int num;
int m;
int dat[200005];
int ans;
int main(){
	cin>>t;
	while(t--){
		set<int> st;mp.clear();
		m=-1;
		cin>>n;
		for(int i=0;i<n;i++){
			cin>>dat[i];
			mp[dat[i]]++;
			if(mp[dat[i]]>m){
				m=mp[dat[i]];
				num=dat[i];
			}
			st.insert(dat[i]);
		}
		
		int rem=n-m;
		if(m<=st.size()-1) ans=m;
		else if(m==st.size()) ans=m-1;
		else ans=st.size();
		cout<<ans<<endl;
	}
	return 0;
}
```


# [D. Anti-Sudoku](https://codeforces.com/contest/1335/problem/D)

## 题意

输入一个数独

每行每列每宫格只能改变一个数，使每行每列每宫格有两个数相同

## 题解

思维题

把所有的1改成2

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int t;
char s[9][10];
int main(){
	cin>>t;
	while(t--){
		for(int i=0;i<9;i++){
			cin>>s[i];
		}
		for(int i=0;i<9;i++){
			for(int j=0;j<9;j++){
				if(s[i][j]=='1') s[i][j]='2';
			}
		}
		for(int i=0;i<9;i++){
			puts(s[i]);
		}
	}
	return 0;
}
```


# [E. Three Blocks Palindrome (hard version)](https://codeforces.com/contest/1335/problem/E2)

## 题意

求一个字符串的子串（可以不连续）使得这个子串是三块回文串

三块回文串：字符串被分成三块（长度可以为0），第一块和第三块必须相同

第二块可以和第一块相同也可以不同

## 题解

简单版的可以暴力枚举中间块的左边界和右边界

然后前缀存每个数字出现的次数

设长度为n，数字最大为m

则时间复杂度O(n\*n\*m\*m)

困难版时间复杂度必须降到O(k*n)

这时候不再遍历两个边界

而是固定一个边界，遍历一个边界，这样时间复杂度为O(k*n)

如此只能遍历第一块的右边界（对应第三块的左边界）

对于一个特定的数 i

假设共有 x 个

第一块含有这个数的个数从1遍历到 x/2 个

这就需要一个容器存储数字 i 出现 j 次对应的下标

确定第一块和第三块后就要找第二块哪种数字出现得最多

这和简单版的一样，用前缀存数字 i 在下标为 j 时出现的次数

遍历一遍所有数字

再总体遍历一遍所有数字

时间复杂度O(m\*m\*n\*lgn)

看起来会超时，但实际不会 (跑了400ms)

本来在存储下标pos时开二维静态数组，MLE(266K)

改成动态map (166K)

对于时间复杂度和空间复杂度都可以再优化

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int t;
int n;
int num[205][200005];   //num[i][j]存数字i在下标为j时出现的次数 
map<int,int> pos[205];     	//map<j,index>存数字i出现第j次的下标 
int main(){
	//freopen("in.txt","r",stdin);
	scanf("%d",&t);
	while(t--){
		//TODO reset
		/*for(int i=0;i<202;i++) {
			num[i][0]=0;
			pos[i][0]=0;
		}*/
		for (int i=0;i<205;i++) pos[i].clear();
		
		scanf("%d",&n);
		int tmp;
		for(int i=1;i<=n;i++){
			scanf("%d",&tmp);
			for(int j=1;j<=200;j++){
				if(j==tmp){
					num[j][i]=num[j][i-1]+1;
				}
				else{
					num[j][i]=num[j][i-1];
				}
			}
			pos[tmp].insert(make_pair(num[tmp][i],i));
		}
		
		int ans=1;
		for(int i=1;i<=200;i++){
			for(int j=1;j<=num[i][n]/2;j++){
				int l=pos[i][j]+1;
				int r=pos[i][num[i][n]-j+1]-1;
				
				for(int k=1;k<=200;k++){
					ans=max(ans,num[k][r]-num[k][l-1]+2*j);
				}
			}
		}
		cout<<ans<<endl;
		//for(int i=1;i<=4;i++) cout<<num[i][8]<<" ";
		//for(int i=1;i<=4;i++) cout<<pos[3][i]<<" ";
	}
	return 0;
}
```


# [F. Robots on a Grid](https://codeforces.com/contest/1335/problem/F)

## 题意

不懂

## 题解

不会
