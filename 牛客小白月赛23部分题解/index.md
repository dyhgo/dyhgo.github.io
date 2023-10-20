# 牛客小白月赛23(部分题解)




# A 膜法记录
[题目链接](https://ac.nowcoder.com/acm/contest/4784/A)

### 题解
#### 贪心   枚举 集合的整数表示

由于n的数据较小，直接枚举n的所有情况，有2^n种

对于每种情况判断剩下的点列blast能否用完

其实就是贪心思想（把行blast用完，再用列blast）

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll=long long;
char s[23][100005];
ll t;
ll n,m,a,b;
ll cl[1<<21];
int main(){
    cin>>t;
    while(t--){
        cin>>n>>m>>a>>b;
        for(ll i=0;i<(1<<n);i++) cl[i]=0;
        for(ll i=1;i<=n;i++) scanf("%s",s[i]+1);
        //memset(cl,0,sizeof(cl));
        for(ll j=1;j<=m;j++) {
            ll temp=0;
            for(ll i=1;i<=n;i++) if(s[i][j]=='*') temp|=(1<<i-1);
            cl[temp]++;
        }
        for(ll i=1;i<=n;i++)
            for(ll j=0;j<(1<<n);j++){
                if((j&(1<<i-1))==0) cl[j|1<<i-1]+=cl[j];
            }
        bool ok=false;
        for(ll i=0;i<(1<<n);i++){
            if(__builtin_popcount(i)<=a and m-cl[i]<=b){
                ok=true;break;
            }
        }
        if(ok) puts("yes");
        else puts("no");
    }
    return 0;
}
```

这里用memset会迷之超时，要用for循环

一个神奇的函数 `__builtin_popcount(int x)` 返回x的二进制1的个数

# B 阶乘
[题目链接](https://ac.nowcoder.com/acm/contest/4784/B)

### 题解
#### 二分 数论

用二分法获得最小值

检测一个数n的阶乘是否能被p整除

对p进行质因数分解

遍历p的质因数

如果对于所有的质因数

n！被这个质因数整除的个数都不小于p中的个数

那么n！就能被p整除

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll=long long;
ll t;
ll p;
ll fac[1000005];
ll num[1000005];
ll tt;
void decompose(ll p){
    tt=0;
    for(ll i=2;i*i<=p;i++){
        if(p%i==0){
            fac[tt]=i;
            num[tt]=0;
            while(p%i==0) p/=i,num[tt]++;
            tt++;
        }
    }
    if(p>1) {
        fac[tt]=p;num[tt]=1;tt++;
    }
}
bool check(ll x){
    for(ll i=0;i<tt;i++){
        ll cnt=0,t=x;
        while(t) {
            cnt+=t/fac[i];
            t/=fac[i];
        }
        if(cnt<num[i]) return false;
    }
    return true;
}
int main(){
	//freopen("input.txt","r",stdin);
    cin>>t;
    while(t--){
        cin>>p;
        decompose(p);
        ll l=1,r=1e10;   //开1e6会wa
        while(l<r){
            ll mid=l+r>>1;
            if(check(mid)) r=mid;
            else l=mid+1;
        }
        cout<<r<<endl;
    }
    return 0;
}
```
# C 完全图
[题目链接](https://ac.nowcoder.com/acm/contest/4784/C)

### 题解
#### 二分 图论 规律

很容易能找到规律

要分裂出 `x` 个连通块，就要拆掉 `x*n-(x+1)*x/2` 条边

然后用二分找到 `x`

注意 `r` 的初始值不大于 `n`

据说解一元二次方程也可以，我随便写了个，失败了

用python可以防溢出，但是我出现了2.9999999！=3的情况

用c++就要用__int128防止爆long long

不过__int128不能用标准输入输出

一种解决方法是自己写输入输出

但是这题只需要在特定的地方转成__int128就行


ac代码


```cpp
#include<bits/stdc++.h>
using namespace std;
using Int = __int128;
using ll = long long;
ll t,n,m;
int main(){
	//freopen("input.txt","r",stdin);
    cin>>t;
    while(t--){
        cin>>n>>m;
        ll l=0,r=n;
        ll mid;
        for(int i=0;i<10000;i++){
            mid=(l+r)/2;
            if(((Int)mid*n-(1+mid)*(Int)mid/2)<=(Int)m)
                l=mid;
            else
                r=mid;
        }
        cout<<r<<endl;
    }
    return 0;
}
```

# D 病毒传染
[题目链接](https://ac.nowcoder.com/acm/contest/4784/D)

### 题解
不会

# E A+B问题
[题目链接](https://ac.nowcoder.com/acm/contest/4784/E)

### 题解

总共能表示的数有2^32个，每一个数都能找到另一个数与之相加等于答案

ac代码

用PHP写的（求比这更短的代码）（再一次证明了PHP是世界上最好的语言）

```php
4294967296
```

# F 美丽的序列I
[题目链接](https://ac.nowcoder.com/acm/contest/4784/F)

### 题解
不会

# G 树上求和
[题目链接](https://ac.nowcoder.com/acm/contest/4784/G)

### 题解
#### 图论 DFS

求出每条边对于所有的简单路径经过了几次

然后按次数从大到小排序，依次赋值1,2,3...

求遍历次数就是求这条边的左右各有几个点，然后相乘

对于每个点再递归求它的子节点

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll=long long;
ll n;
vector<ll> p[100005];
ll ch[100005];
bool visit[100005];
using pll=pair<ll,ll>;
vector<pll> vt;
vector<ll> w;
map<pll,ll> mp;
bool cmp(ll a,ll b){return a>b;}
ll dfs(ll k){
    visit[k]=true;
     ll ans=1;
      
    for(auto it:p[k]){
        if(!visit[it]){
            ans+=dfs(it);
        }
    }
    w.push_back(ans*(n-ans));
    return ans;
}
 
int main(){
    //freopen("input.txt","r",stdin);
    cin>>n;
    ll t1,t2;
    for(ll i=0;i<n-1;i++){
        cin>>t1>>t2;
         p[t1].push_back(t2); ch[t1]++;
         p[t2].push_back(t1); ch[t2]++;
    }
    for(ll i=1;i<=n;i++) ch[i]--;
    dfs(1);
    sort(w.begin(),w.end(),cmp);
    ll i=1;
    ll ans2=0;
    for(auto it:w){
        ans2+=it*i++;
        //cout<<it<<endl;
    }
    cout<<ans2<<endl;
    return 0;
}
```
用另外一种传入父节点的方法就超时，记忆化搜索也超时

这是TLE/RE代码，不知道为什么错了（对80%），等有空或实力更强一点再看

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll=long long;
ll n;
vector<ll> p[100005];
ll ch[100005];
using pll=pair<ll,ll>;
vector<pll> vt;
vector<ll> w;
map<pll,ll> mp;
bool cmp(ll a,ll b){return a>b;}
ll dfs(ll k,ll par){
    if(mp[make_pair(k,par)]!=0) return mp[make_pair(k,par)];
    if(ch[k]==0) {mp[make_pair(k,par)]=0;return 0;} 
     ll ans=0;
    ans+=ch[k];
    for(auto it:p[k]){
        if(it!=par){
            ans+=dfs(it,k);
        }
    }
    mp[make_pair(k,par)]=ans;
    return ans;
}
ll cal(ll x,ll y){
    ll resx=dfs(x,y);
    ll resy=dfs(y,x);
    return resx+resy+resx*resy+1;
}
int main(){
	//freopen("input.txt","r",stdin);
    cin>>n;
    ll t1,t2;
    for(int i=0;i<n-1;i++){
        cin>>t1>>t2;
         p[t1].push_back(t2); ch[t1]++;
         p[t2].push_back(t1); ch[t2]++;
        vt.emplace_back(t1,t2);
    }
    for(int i=1;i<=n;i++) ch[i]--;
    for(int i=0;i<n-1;i++){
        w.push_back(cal(vt[i].first,vt[i].second));
    }
    sort(w.begin(),w.end(),cmp);
    ll i=1;
    ll ans2=0;
    for(auto it:w){
        ans2+=it*i++;
        
    }
    cout<<ans2<<endl;
    return 0;
}
```





# H 奇怪的背包问题增加了
[题目链接](https://ac.nowcoder.com/acm/contest/4784/H)

### 题解
#### 二进制

由二进制01串的性质可以发现

如果物品总重量没有2^30就输出impossible

否则从大到小排序，依次增加就可以


ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll =long long;
ll t;
ll n;
ll num[100005];
using pll=pair<ll,ll>;

int check[100005];
int main(){
    cin>>t;
    while(t--){
        vector<pll> vt;        //因为这个wa了好久
        cin>>n;
        ll ans=0;
        ll temp;
        for(ll i=0;i<n;i++){
            cin>>temp;
            num[i]=(1<<temp);
			vt.emplace_back(num[i],i);
            ans+=num[i];
        }
        if(ans<(1<<30)) puts("impossible");
        else{
     
             
            sort(vt.begin(),vt.end(),greater<pll>());
            ll ans=0;
            ll i=0;
            ll rr=(1<<30);
            for(ll i=0;i<n;i++) check[i]=0;
            while(ans!=rr){
                ans+=vt[i].first;
                check[vt[i].second]=1;
                i++;
            }
            
            //for(ll i=0;i<n;i++) cout<<vt[i].first<<" ";
            for(ll i=0;i<n;i++) cout<<check[i];
            cout<<endl;
        }
    }
    return 0;
}
```

有个wa点，就是没有清空容器 T_T

# I 寻找字串
[题目链接](https://ac.nowcoder.com/acm/contest/4784/I)

### 题解
枚举后缀，比较即可

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
vector<string> vt;
string s;
bool cmp(string s1,string s2){
    return s1>s2;
}
int main(){
    cin>>s;
    int len=s.length();
    for(int i=0;i<len;i++){
        vt.push_back(s.substr(i,len-i));
    }
    sort(vt.begin(),vt.end(),cmp);
    cout<<vt[0]<<endl;
    return 0;
}
```

# J 最大的差
[题目链接](https://ac.nowcoder.com/acm/contest/4784/J)

### 题解
最大值减最小值

ac代码

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    int n;
    int mi=100005;
    int ma=-1;
    cin>>n;
    int t;
    for(int i=0;i<n;i++){
        cin>>t;
        mi=min(t,mi);
        ma=max(t,ma);
    }
    cout<<ma-mi<<endl;
    return 0;
}
```

本次比赛官方说难度对标cf div2 a~c，可是根据大家的做题情况除签到题至少应该d吧

不知道为什么有好多题都迷之超时

总体来说，题目还行
