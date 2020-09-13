# hduoj1711(kmp)


# [Number Sequence](http://acm.hdu.edu.cn/showproblem.php?pid=1711)
### Problem Description

Given two sequences of numbers : a[1], a[2], ...... , a[N], and b[1], b[2], ...... , b[M] (1 <= M <= 10000, 1 <= N <= 1000000). Your task is to find a number K which make a[K] = b[1], a[K + 1] = b[2], ...... , a[K + M - 1] = b[M]. If there are more than one K exist, output the smallest one.

### Input

The first line of input is a number T which indicate the number of cases. Each case contains three lines. The first line is two numbers N and M (1 <= M <= 10000, 1 <= N <= 1000000). The second line contains N integers which indicate a[1], a[2], ...... , a[N]. The third line contains M integers which indicate b[1], b[2], ...... , b[M]. All integers are in the range of [-1000000, 1000000].

### Output

For each test case, you should output one line which only contain K described above. If no such K exists, output -1 instead.

### Sample Input

2 </br>
13 5</br>
1 2 1 2 3 1 2 3 1 3 2 1 2</br>
1 2 3 1 3</br>
13 5</br>
1 2 1 2 3 1 2 3 1 3 2 1 2</br>
1 2 3 2 1</br>

### Sample Output

6</br>
-1

### Solution
测一下kmp板子

ac代码

```cpp
#include<iostream>
using namespace std;
int n,m,t;
int s[1000005];
int p[10005];
int nextt[10005];
void get_next(){
	int i=0,j=-1;
	nextt[0]=-1;
	while(i<m){
		if(j==-1 || p[i]==p[j]) nextt[++i]=++j;
		else j=nextt[j]; //!!!
	}
}
int kmp(){
	int i=0,j=0;
	while(1){
		if(s[i]==p[j]) i++,j++;
		else{
			int t=nextt[j];
			if(t==-1) i++,j=0;
			else j=t;
		}
		if(j>=m) return i-m+1;   //根据题目要求返回 
		if(i>=n) return -1;
	}
}
int main(){
	//freopen("input.txt","r",stdin);
	ios::sync_with_stdio(0);cin.tie(0);
	cin>>t;
	while(t--){
		cin>>n>>m;
		for(int i=0;i<n;i++) cin>>s[i];
		for(int i=0;i<m;i++) cin>>p[i];
		get_next();
		cout<<kmp()<<endl;
	}
	return 0;
}
```

