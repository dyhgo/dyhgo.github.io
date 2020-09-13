# abc173



# [A - Payment](https://atcoder.jp/contests/abc173/tasks/abc173_a)

## 题解

```cpp
#include<bits/stdc++.h> 
using namespace std;
int main(){
	int n;
	cin>>n;
	int i=1000;
	while(i<n){
		i+=1000;
	}
	cout<<i-n;
	return 0;
}
```


# [B - Judge Status Summary](https://atcoder.jp/contests/abc173/tasks/abc173_b)

## 题解

```cpp
#include<bits/stdc++.h> 
using namespace std;
const int maxn = 1e5+2;
int wa,tle,ac,re;
int main(){
	int n;
	cin>>n;
	while(n--){
		string s;
		cin>>s;
		switch(s[0]){
			case 'A':{
				ac++;
				break;
			}
			case 'W':{
				wa++;
				break;
			}
			case 'T':{
				tle++;
				break;
			}
			default:{
				re++;
				break;
			}
		}
	}
	cout<<"AC x "<<ac<<endl<<"WA x "<<wa<<endl<<"TLE x "<<tle<<endl<<"RE x "<<re<<endl;
	return 0;
}
```

# [C - H and V](https://atcoder.jp/contests/abc173/tasks/abc173_c)

## 题解

```cpp
#include<bits/stdc++.h> 
using namespace std;

char a[7][7];
char b[7][7];
int n,m;int k;
void row(int x){
	for(int i=0;i<m;i++){
		b[x][i] = '.';
	}
}

void col(int x){
	for(int i=0;i<n;i++){
		b[i][x] = '.';
	}
}


void sol(int x,int y){
	for(int i=0;i<n;i++){
		if(x>>i&1){
			row(i);
		}
	}
	
	for(int j=0;j<m;j++){
		if(y>>j&1){
			col(j);
		}
	}
}

int cal(){
	int ans =0;
	for(int i=0;i<n;i++){
		for(int j=0;j<m;j++){
			if(b[i][j] == '#') ans++;
		}
	}
	return ans;
}

int main(){
	cin>>n>>m;cin>>k;
	char c;
	for(int i=0;i<n;i++){
		for(int j=0;j<m;j++){
			cin>>a[i][j];
			
		}
	}
	int ans = 0;
	for(int i=0;i<(1<<n);i++){
		for(int j=0;j<(1<<m);j++){
			memcpy(b,a,sizeof(a));
			sol(i,j);
			if (cal() == k) ans++;
		}
	}
	cout<<ans<<endl;
	return 0;
}
```

# [D - Chat in a Circle](https://atcoder.jp/contests/abc173/tasks/abc173_d)

## 题解

```cpp
#include<bits/stdc++.h> 
using namespace std;
using ll = long long;
ll a[200005];
ll n;
int main(){
	cin>>n;
	for(ll i=0;i<n;i++){
		cin>>a[i];
	}
	sort(a,a+n,[](int a,int b){return a>b;});
	if(n==2) {
		cout<<a[0]<<endl;
		exit(0);
	}
	n--;
	ll t;
	ll q = n;
	if(n&1){
		t = (n-1)/2;
		t++;
	}
	else{
		n++;
		t = (n-1)/2;
		t++; 
	}
	ll ans = a[0];
	for(ll i=1;i<t;i++){
		ans += 2LL * a[i];
	}
	if(q%2 == 0){
		ans -= a[t-1];
	}
	cout<<ans<<endl;
	return 0;
}
```

# [E - Multiplication 4](https://atcoder.jp/contests/abc173/tasks/abc173_e)

## 题解

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 1e9+7;
ll a[200005];
ll n,k;
int main(){
	cin>>n>>k;
	for(int i=0;i<n;i++){
		cin>>a[i];
	}
	sort(a,a+n);
	int L = 0,R = n-1;
	if(k&1){
		if(a[n-1] < 0){
			ll ans = 1;
			for(int i=n-1;i>=n-k;i--){
				ans *= a[i];
				ans %= mod;
			}
			if(ans < 0) cout<<ans+mod<<endl;else cout<<ans<<endl;
			exit(0);
		}
		
		R--,k--;
	}
	while(k){
		ll lv = a[L] * a[L+1];
		ll rv = a[R] * a[R-1];
		
		if(lv < rv){
			R -= 2;
		}	else L += 2;
		k -= 2;
	}
	ll ans = 1;
	for(int i=0;i<L;i++){
		ans *= a[i];
		ans %= mod;
	}
	for(int i=R+1;i<n;i++){
		ans *= a[i];
		ans %= mod;
	}
	if(ans < 0) cout<<ans+mod<<endl;
	else cout<<ans<<endl;
	return 0;
}
```


# [F - Intervals on Tree](https://atcoder.jp/contests/abc173/tasks/abc173_f)

## 题解

对于一个森林，点和边对连通图个数的贡献是每个点+1，每条边-1

所以计算点被遍历几次，边被遍历几次

这与区间的左右数字个数有关

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
int n;
int main(){
	ll ans = 0;
	cin>>n;
	for(int i=1;i<=n;i++){
		ans += (ll)i * (n-i+1);
	}
	
	int _ = n;
	_--;
	while(_--){
		int a,b;
		cin>>a>>b;
		if(a > b) swap(a,b);
		ans -= (ll)a * (n-b+1);
	}
	cout<<ans<<endl;
	return 0;
}
```

