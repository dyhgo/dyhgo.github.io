# hduoj1796



# [How many integers can you find](http://acm.hdu.edu.cn/showproblem.php?pid=1796)

## Problem Description

 Now you get a number N, and a M-integers set, you should find out how many integers which are small than N, that they can divided exactly by any integers in the set. For example, N=12, and M-integer set is {2,3}, so there is another set {2,3,4,6,8,9,10}, all the integers of the set can be divided exactly by 2 or 3. As a result, you just output the number 7.
 
##  Input

  There are a lot of cases. For each case, the first line contains two integers N and M. The follow line contains the M integers, and all of them are different from each other. 0<N<2^31,0<M<=10, and the M integer are non-negative and won’t exceed 20.
  
## Output

 For each case, output the number.

##  Sample Input

12 2

2 3

## Sample Output

7

## Solution



容斥原理

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200411225851688.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

ac代码

几个注意点

data可能为0(这时候可以忽略)

要开long long(一直没想到)



```cpp
#include<bits/stdc++.h>
using namespace std;
long long n,m;
long long dat[11];
long long ans=0;
vector<long long> vt;
long long mm;
main(){
    while(~scanf("%d%d",&n,&mm)){
    ans=0;    
    vt.clear();
    n--;
    long long temp;
    for(long long i=0;i<mm;i++) {
        cin>>temp;
        if(temp!=0)
        vt.push_back(temp);
    }
    m=vt.size();
    long long x=0;
    for(auto i:vt){
        dat[x++]=i;
    }
    for(long long i=1;i<(1<<m);i++){   //i从1开始 
        long long lcm=1;
        for(long long j=0;j<m;j++){
            if(i>>j&1){
                lcm=(lcm*dat[j])/__gcd(lcm,dat[j]);
            }
            if(lcm>n) break;
        }
        if(__builtin_popcount(i)&1) ans+=n/lcm;
        else ans-=n/lcm;
    }
    cout<<ans<<endl;
    }
}
```

