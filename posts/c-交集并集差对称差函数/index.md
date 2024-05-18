# c++交集、并集、差、对称差函数




```cpp
#include<iostream>
#include<set>
//#include<map>
//#include<string>
#include<algorithm>
#include<iterator>
using namespace std;
int main()
{
	int a[]={3,2,1};
	int b[]={3,4,5,6};
	set<int> s1(a,a+3);
	set<int> s2(b,b+4);
	set<int> s3;
	set_union(s1.begin(),s1.end(),s2.begin(),s2.end(),inserter(s3,s3.begin()));
	for(set<int>::iterator it=s3.begin();it!=s3.end();it++)
		cout<<*it<<" ";
	cout<<endl;
	set_union(s1.begin(),s1.end(),s2.begin(),s2.end(),ostream_iterator<int>(cout,"*"));
	cout<<endl;
	set_intersection(s1.begin(),s1.end(),s2.begin(),s2.end(),ostream_iterator<int>(cout," "));
	cout<<endl;
	set_difference(s1.begin(),s1.end(),s2.begin(),s2.end(),ostream_iterator<int>(cout," "));
	cout<<endl;
	set_symmetric_difference(s1.begin(),s1.end(),s2.begin(),s2.end(),ostream_iterator<int>(cout," "));
	return 0;
}
```

