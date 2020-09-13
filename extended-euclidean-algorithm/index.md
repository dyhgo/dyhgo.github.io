# extended euclidean algorithm




```cpp
#include<bits/stdc++.h>
using namespace std;
int ex_gcd(int a,int b,int& x,int& y)
{
	int t,res;
	if(!b)
	{
		x=1;y=0;return a;
	}
	else
	{
		res=ex_gcd(b,a%b,x,y);
		t=x;
		x=y;y=t-a/b*y;
		return res;
	}
}
int main()
{
	int a,b,x,y;
	a=60;
	b=22;
	cout<<ex_gcd(a,b,x,y)<<endl;
	cout<<x<<" "<<y<<endl;
	return 0;
}
```

