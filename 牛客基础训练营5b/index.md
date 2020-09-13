# 牛客基础训练营5B





[题目在这](https://ac.nowcoder.com/acm/contest/3006/B)

这道题可以用二分法，三分法更好一点（反正当时完全没想到），0.618法应该最快

三分是中间的两个点 mid = l + (r - l) / 2      midmid = mid + (r - mid) / 2

求mid midmid与n个点的距离，然后依据较小值缩减区间

代码如下

```cpp
//三分法  最快的应该是0.618法
#include<bits/stdc++.h>
using namespace std;
int n;
struct point 
{
    double x,y;
}p[100005];
double eps = 5e-5;
double check(double x)
{
    double dist = -1;
    for(int i=0;i<n;i++)
    {
        dist = max(dist,(x-p[i].x)*(x-p[i].x) + p[i].y*p[i].y); 
    }
    return sqrt(dist);
}
int main()
{
    cin>>n;
    for(int i=0;i<n;i++)
        scanf("%lf %lf",&p[i].x,&p[i].y);
    double l = -10000.0;
    double r = 10000.0;
    while(r-l>eps)
    {
        double mid = l + (r -l)/2;  //这里的三分
        double midmid = mid+(r-mid)/2;
        if(check(mid)>check(midmid)) l=mid;
        else r=midmid;
    }
    printf("%.5lf\n",check(l));
    return 0;
}
```
