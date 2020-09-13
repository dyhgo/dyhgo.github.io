# 每日一题 (X)



 

## 堆 贪心

[题目](https://ac.nowcoder.com/acm/contest/1080/C)

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll n;
struct p{
    ll v,s;
}ps[100005];
bool cmp(p a,p b){return a.s>b.s;}
priority_queue<ll , vector<ll> , greater<ll> > pq;
int main(){
    cin>>n;
    for(ll i=0;i<n;i++) cin>>ps[i].v>>ps[i].s;
    
    sort(ps,ps+n,cmp);
    
    ll temp=0,ans=0;
    for(ll i=0;i<n;i++){
        temp+=ps[i].v;
        pq.push(ps[i].v);
        
        while(pq.size()>ps[i].s){
            temp-=pq.top();
            pq.pop();
        }
        
        ans=max(ans,temp);
    }
    cout<<ans<<endl;
    return 0;
}
```

===========================================================================================================

## 区间dp

[题目](https://ac.nowcoder.com/acm/problem/13230)

不会做，看了别人的题解写的
 
考虑到数据大小
 
区间dp
 
`dp[i][j][k][l]`  表示在s1中取i到j区间，在s2中取k到l区间是否能组成回文串
 
这样它有四种状态转移（分别考虑边界）
 
对于每一种状态，只要有一种满足就行，用或运算实现
 
注意一些边界条件，长度从0开始、特判
 
先枚举长度，对于每一种长度，枚举区间

```cpp
#include<bits/stdc++.h>
using namespace std;
int t;
char s1[52];
char s2[52];
int dp[52][52][52][52];
int ans=0;
int main(){
    cin>>t;
    while(t--){
    	ans=0;
    	memset(dp,0,sizeof(dp));  //没有重置又WA了 
        scanf("%s",s1+1);
        scanf("%s",s2+1);
        int len1=strlen(s1+1);
        int len2=strlen(s2+1);
        for(int i=0;i<=len1;i++)
            for(int j=0;j<=len2;j++)
                for(int l1=1,r1=i+l1-1;r1<=len1 ;l1++,r1++)
                    for(int l2=1,r2=j+l2-1;r2<=len2 ;l2++,r2++){
                        if(i+j<=1) dp[l1][r1][l2][r2]=1;
                        else{
                        	if(s1[l1]==s1[r1] and r1>0) dp[l1][r1][l2][r2] |= dp[l1+1][r1-1][l2][r2]; 
                        	if(s1[l1]==s2[r2] and r2>0) dp[l1][r1][l2][r2] |= dp[l1+1][r1][l2][r2-1];
               		        if(s2[l2]==s1[r1] and r1>0) dp[l1][r1][l2][r2] |= dp[l1][r1-1][l2+1][r2];
                        	if(s2[l2]==s2[r2] and r2>0) dp[l1][r1][l2][r2] |= dp[l1][r1][l2+1][r2-1];
						}  
                            
                        if(dp[l1][r1][l2][r2]) ans=max(ans,r2-l2+r1-l1+2);
                    }
        cout<<ans<<endl;
    }
    return 0;
}
```

===========================================================================================================

## 前缀和 区间dp

[题目](https://ac.nowcoder.com/acm/problem/15553)

暴力时间复杂度 `O(n^2)`
 
`dp[i] `表示右区间的右边界为i时的最大值
 
`maxv[i]` 表示前 `i+1`个数区间长度为k的最大值（单区间）
 
那么 `dp[i]=右区间的值+maxv[i]`
 
求 `maxv[i]` 直接用前缀和预处理，时间复杂度 `O(n)`
 
依次遍历数组求答案
 
据说用st表也可以做，但我不会
 
思考问题的变形
 
 
一：不限制长度——在一个数列里找两个不相交区间使得他们权值和最大

二：区间数目变多——找 m个长度为 k 的不相交区间使得他们的权值和最大 (1≤n≤5000)

三：区间数目变多且不限制长度——找 m 个不相交长度不限的区间使得他们权值和最大(1≤n≤5000)

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll t;
ll a[200005];
ll n,k;
ll maxv[200005];
ll sum[200005];
ll ans=0;
ll asn1=0;
ll ans2=0;
ll dp[200005];
int main(){
    cin>>t;
    while(t--){
    	//reset TODO 
    	ans=-1e15;  //开1e9WA了一发 无语
        cin>>n>>k;
        for(ll i=0;i<n;i++){
        	cin>>a[i];
        	if(i>0) sum[i]=sum[i-1]+a[i]; else sum[i]=a[i];
		}
		//preprocess
		maxv[k-1]=sum[k-1];
		for(ll i=k;i<n-k;i++){
			maxv[i]=max(maxv[i-1],sum[i]-sum[i-k]);
		}
		ll temp=0;
		for(ll i=k;i<2*k;i++) temp+=a[i];
		for(ll i=2*k-1;i<n;i++){
			dp[i]=temp+maxv[i-k];
			ans=max(ans,dp[i]);
			if(i<n-1){
				temp+=a[i+1];
				temp-=a[i+1-k];
			}
		}
		cout<<ans<<endl;
    }
    return 0;
}
```


===========================================================================================================


## 位运算

[题目](https://ac.nowcoder.com/acm/contest/4853/A)

模拟位运算
 
暴力超时
 
可优化为
 
`(a1+a2+a3...)*(a1+a2+a3...)`
 
a为每一位的1
 
这样只需要计算每一位1的数量
 
对于每一位，数量平方乘上二次幂系数
 
最后求和

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll n;
ll a[100005];
ll bin[100];
int main(){
	cin>>n;
	ll temp;
	for(ll i=0;i<n;i++){
		ll p=0;
		cin>>temp;
		while(temp!=0){
			if(temp%2==1) bin[p]++;
            p++;
			temp/=2;
		}
	}
	ll ans=0;
	for(ll i=0;i<100;i++){
		ans+=(bin[i]*bin[i])*(1<<i);
	}
	cout<<ans<<endl;
	return 0;
}
```


===========================================================================================================

## 双端队列 （滑动窗口求最值）

[题目](https://ac.nowcoder.com/acm/problem/50528)

经典的滑动窗口求最大最小值问题
 
经典的做法就是利用双端队列
 
可以参考此处的[讲解](https://blog.csdn.net/u010429424/article/details/73692248?utm_source=app)

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,k;
int num[1000005];
deque<int> dq1;
deque<int> dq2;
vector<int> ans1;
vector<int> ans2;
int main(){
	cin>>n>>k;
	for(int i=0;i<n;i++) cin>>num[i];
	for(int i=0;i<n;i++){
		if(!dq2.empty() and dq2.front()<=i-k){
			dq2.pop_front();
		}
		while(!dq2.empty() and num[dq2.back()]<=num[i]){
			dq2.pop_back();
		}
		dq2.push_back(i);
		if(i>=k-1){
			ans2.push_back(num[dq2.front()]);
		}
		//-----------------华丽的分割线--------------------------- 
		if(!dq1.empty() and dq1.front()<=i-k){
			dq1.pop_front();
		}
		while(!dq1.empty() and num[dq1.back()]>=num[i]){
			dq1.pop_back();
		}
		dq1.push_back(i);
		if(i>=k-1){
			ans1.push_back(num[dq1.front()]);
		}
	}
	for(int i:ans1) cout<<i<<" "; cout<<endl;
	for(int i:ans2) cout<<i<<" "; cout<<endl;
	return 0;
}
```

===========================================================================================================

## 树形dp

[题目](https://ac.nowcoder.com/acm/problem/22598)

`dp[i]` 表示以i为节点的最小费用
 
则 `dp[i]+=min(dp[ch],w)`  w表示当前i与ch的费用，即不断更新成最小值然后加上去

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll n,m,s;
vector<pair<ll,ll> > G[100005];
ll dp[100005];
ll deg[100005];
const ll inf=0x3f3f3f3f3f3f;
void dfs(ll s,ll p){
    for(auto i:G[s]){
        ll x=i.first;
        ll y=i.second;
        if(x!=p){
            dfs(x,s); dp[s]+=min(dp[x],y);
        }
		
    }
}
int main(){
    cin>>n>>m>>s;
    while(m--){
        ll u,v,w;
        cin>>u>>v>>w;
        G[u].emplace_back(v,w);
        G[v].emplace_back(u,w);
        deg[u]++;
        deg[v]++;
    }
    for(ll i=1;i<=n;i++)
        if(deg[i]==1 and i!=s) dp[i]=inf;
    dfs(s,-1);
    cout<<dp[s]<<endl;
    return 0;
}
```

===========================================================================================================

## 二分查找

[题目](https://ac.nowcoder.com/acm/problem/23053)

和abc157-E很像
 
用集合存26个字母对应的下标
 
依次查找p中字符在s中的位置
 
每次对集合二分查找
 
**有一个防止集合为空的小技巧**

```cpp
#include<bits/stdc++.h>
using namespace std;
char s[1000005];
int n;
char p[1000005];
set<int> st[27];
int main(){
	scanf("%s",s+1);
	int len=strlen(s+1);
	//preprocess
	for(int i=0;i<27;i++){  //防止为空 
		st[i].insert(len+1);
	}
	for(int i=1;i<=len;i++){
		st[s[i]-'a'].insert(i);
	}
	
	cin>>n;
	
	while(n--){
		bool ok=true;
		scanf("%s",p+1);
		int lenp = strlen(p+1);
		int foo=1;
		for(int i=1;i<=lenp;i++){
			auto ind=st[p[i]-'a'].lower_bound(foo);
			if(*ind==len+1){
				ok=false;
				break;
			} 
			else{
				foo=(*ind)+1;
			}
		}
		puts(ok?"Yes":"No");
	}
	return 0;
}
```


===========================================================================================================


## 树形dfs

[题目](https://ac.nowcoder.com/acm/problem/13886)

对于一个节点，如果以这个节点为根的树的节点（包含自己）是奇数，则这个节点必须与父节点相连，子节点内部自己配对
 
如果是偶数，则这个节点与子节点一起参与配对
 
以下代码的缺点是存储数据和求解不够高效

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll t,n;
vector<ll> G[10005];
ll cn[10005];
ll par[10005];
map<ll,ll> W[10005];
void dfs_par(ll u,ll p){
	par[u]=p;
	for(auto i:G[u]){
		if(i!=p){
			dfs_par(i,u);
		}
	}
}
void dfs_cn(ll u,ll p){
	for(auto i:G[u]){
		if(i!=p){
			dfs_cn(i,u);
			cn[u]+=cn[i];
		}
	}
	cn[u]++;
}
int main(){
    cin>>t;
    while(t--){
        cin>>n;
        
 		ll t1,t2,w;
		for(ll i=0;i<n-1;i++){
			cin>>t1>>t2>>w;
			G[t1].push_back(t2);
			G[t2].push_back(t1);
			W[t1].insert(make_pair(t2,w));
			W[t2].insert(make_pair(t1,w));
		}       
		
		dfs_par(1,0);
		dfs_cn(1,0);
		
		ll ans=0;
		for(ll i=2;i<=n;i++){
			if(cn[i]&1){
				ans+=W[i][par[i]];
			}
		}
		cout<<ans<<endl;
		
		//reset TODO
        memset(cn,0,sizeof(cn));
        for(ll i=0;i<=n;i++){
        	G[i].clear();
        	W[i].clear();
		}
    }
    return 0;
}
```

===========================================================================================================

## 树形dp 贪心 dfs

[题目](https://ac.nowcoder.com/acm/problem/13249)

主要是树上dp
 
从子节点向根一直贪心地染色
 
这样就会出现一个问题，最优解需要染的顶点已经被染过了
 
所以要不断地更新两个值
 
`dp[i]` 现在在i，往根的方向还能染多少个
 
`k[i]` 每个点向根方向还能染多少个
 
那么 `dp[i]=max(dp[i],dp[ch]-1)`
 
如果最后 `dp[i]==0` 那么新的染色点开启 ans++
 
否则处理完一个点后k要更新
 
`k[par]=max(k[par],k[i]-1)`

```cpp
#include<bits/stdc++.h>
using namespace std;
vector<int> c[100005];
int ans;
int dp[100005];
int k[100005];
int n;
void dfs(int u,int par){
	for(auto i:c[u]){
		dfs(i,u);
		dp[u]=max(dp[u],dp[i]-1);
	}
	if(dp[u]==0){
		//can't reach next
		ans++;
		dp[u]=k[u];
	}
	else{
		//updata k
		k[par]=max(k[par],k[u]-1);
	}
}
int main(){
	cin>>n;
	int tmp;
	for(int i=2;i<=n;i++){
		cin>>tmp;
		c[tmp].push_back(i);
	}
	for(int i=1;i<=n;i++){
		cin>>k[i];
	}
	
	dfs(1,0);
	cout<<ans<<"\n";
	return 0;
}
```


===========================================================================================================


## 堆 （对顶堆求实时中位数）

[题目](https://ac.nowcoder.com/acm/problem/50940)

经典的对顶堆求实时中位数问题
 
用两个堆存数据
 
大顶堆存小的一半
 
小顶堆存大的一半
 
这样中位数只在大顶堆或小顶堆的顶部
 
每次存数据需要将它与顶部（中间数）比较
 
确认放入哪一堆
 
每次放数后，需要平衡堆的大小，使大小相差不超过1
 
最后取堆大的顶部即可
 
plus：几个很坑的点，容易PE，要用快读才能过（还以为算法有问题。。。）

```cpp
#include<iostream>
#include<queue>
using namespace std;
int p,n,m;
int t;
int main(){
    //ios::sync_with_stdio(0);
    
	cin>>p;
	while(p--){
		priority_queue<int> q1;  //大顶堆 
		priority_queue<int,vector<int>,greater<int>> q2; //小顶堆 
		scanf("%d%d",&n,&m);
		
		if(n!=1) cout<<endl;
		cout<<n<<" "<<(m+1)/2<<endl;
		
		scanf("%d",&t);
		q1.push(t);
		if(m==1) cout<<t; else cout<<t<<" ";
		
		for(int i=2;i<=m;i++){
			scanf("%d",&t);
			if(t>q1.top()) q2.push(t);   //比大顶堆大，放入小顶堆
			else q1.push(t);
			
			if(q1.size()>q2.size()+1){   //平衡两个堆的大小
				q2.push(q1.top());
				q1.pop();
			}
			
			if(q2.size()>q1.size()+1){
				q1.push(q2.top());
				q2.pop();
			}
			
			if(i&1){	
			
			int x;
			if(q1.size()>q2.size()) x=q1.top(); //中位数在堆大的顶部
			else x=q2.top();
			
				if( ((i+1)/2)%10==0 and   m-i>1){
					cout<<x<<endl;
				}
				else if(m-i>1){
					cout<<x<<" ";
				}
				else cout<<x;
			}
			
		}
		
	}
	return 0;
}
```

===========================================================================================================

## 在线区间预处理 前缀

[题目](https://ac.nowcoder.com/acm/problem/14247)

暴力枚举右区间的左右边界，这样时间复杂度就是 `O(n^2)`
 
前缀和预处理
 
对于每个右区间，`O(1)` 查询这个区间的异或值，然后找前面有几个区间的异或值等于这个区间
 
这时候只要计算以右区间左边界-1为右边界的区间中每一个的异或，然后与前面计算好的累加即可
 
最后直接累加到个数上
 
（注意区间的边界下标）

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,a[1005],b[1000005];  //b要开大一点 否则数组越界
long long sum;             //sum要用long long
int main(){
    cin>>n;
    int tmp;
    a[0]=0;
    for(int i=1;i<=n;i++) {
        cin>>tmp;
        a[i]=a[i-1]^tmp;
    }
    for(int i=0;i<n;i++){
        for(int j=i-1;j>=0;j--){
            b[a[i]^a[j]]++;
        }
        for(int j=i+1;j<=n;j++){
            sum+=b[a[j]^a[i]];
        }
    }
    cout<<sum<<endl;
    return 0;
}
```

===========================================================================================================

## 图论 dfs

[题目](https://ac.nowcoder.com/acm/problem/14248)

奇数层的点到奇数层的点就是偶数路径
 
偶数同理
 
注意同一层也可达
 
还有long long 的转化
 
还可以树形dp

```cpp
#include<bits/stdc++.h>
using namespace std;
int n;
vector<int> G[100005];
int dep[100005];
int ln[100005];
long long sum=0;
//int deg[100005];
void dfs(int u,int v){
    for(auto i:G[u]){
        if(i!=v){
            dep[i]=dep[u]+1;
            dfs(i,u);
        }
    }
}
int main(){
    cin>>n;
    int t1,t2;
    for(int i=0;i<n-1;i++){
        cin>>t1>>t2;
        G[t1].push_back(t2);
        G[t2].push_back(t1);
    }
    
    dep[1]=0;
    dfs(1,0);
    
    for(int i=1;i<=n;i++){
        ln[dep[i]]++;
    }
    int maxd=*max_element(dep+1,dep+n+1);
    for(int i=0;i<maxd+1;i++){
        for(int j=i;j<maxd+1;j+=2){
            if(j==i){
                sum+=(long long)ln[i]*(ln[i]-1)/2;
            }
        	else{
                sum+=(long long)ln[i]*ln[j];
            }
		}
    }
    cout<<sum<<endl;
    //cout<<maxd<<endl;
    return 0;
}
```


===========================================================================================================


## 排列组合

[题目](https://ac.nowcoder.com/acm/problem/14731)

对于一个长度为n的二进制串
 
随便选两个数前面放1后面放0
 
其他随便放
 
总共有 `C(n,2)*2^(n-2)` 种
 
注意对 n 取模
 
还有一个卡我的点是“特判”！！！

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = unsigned long long;
ll n;
const ll mod = 1e9+7;
ll qpow(ll x,ll t){
    ll res=1;
    while(t>0){
        if(t&1) res=res*x%mod;
        x=x*x%mod;
        t>>=1;
    }
    return res;
}
int main(){
    cin>>n;
    if(n==1) cout<<0<<endl;
    else if(n==2) cout<<1<<endl;
    else{
        cout<<qpow(2,n-3)%mod*(n%mod)%mod*((n-1)%mod)%mod<<endl;   //记得给n取模
    }
    return 0;
}
```

===========================================================================================================

## 二分法 尺取

[题目](https://ac.nowcoder.com/acm/contest/19/B)

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll t;
ll n,a[100005];
ll m,k;
ll k_th(ll x){
    ll num=0;
    ll sum=0;
    ll l=0,r=0;
    if(a[0]>x) num++;
    while(r<n and l<n){
        if(num<k){
            r++;
            if( r<n and a[r]>x) num++;
        }
        else{
            sum += n-r;   //不小心+1  就错了
            l++;
            if(l<n and a[l-1]>x ) num--;   
        }
    }
    return sum;
}
bool check(ll x){
    return k_th(x) > m-1 ? true : false;
}
int main(){
    cin>>t;
    while(t--){
        cin>>n>>k>>m;
        for(ll i=0;i<n;i++) cin>>a[i];
        ll l = 1,r=1e10,mid;
        while(l<r){
            mid = (l+r)>>1;
            if(check(mid)) l = mid+1;
            else r=mid;
        }
        cout<<l<<endl;
    }
    return 0;
}
```


===========================================================================================================


## 计数dp

[题目](https://ac.nowcoder.com/acm/problem/17137)

不会做，参考了别人的[代码](https://blog.nowcoder.net/n/e1af74239a3a49fe877eed0d334b702f)

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll  = long long;
const ll mod = 1e9+7;
ll a[100005];
ll dp[100005][12];
ll ls[100005];
ll n,m,k;
int main(){
  while(cin>>n>>m>>k){ 
      //TODO reset
      memset(dp,0,sizeof(dp));
      memset(ls,-1,sizeof(ls));
      for(ll i=1;i<=n;i++){
          cin>>a[i];
          
      }
      // TODO init 极端情况
      for(ll i=0;i<=n;i++) dp[i][0] = 1;
      for(ll i=0;i<=11;i++) dp[i][i] = 1;
      
      for(ll i=1;i<=n;i++){
          for(ll j=1;j<=min(i-1 , m);j++){
              dp[i][j] = (dp[i-1][j] + dp[i-1][j-1])%mod;
              ll rm = ls[a[i]] - i +j;
              ll part = dp[ls[a[i]] - 1][rm];
              if(ls[a[i]]!=-1 and rm>=0) dp[i][j] = (dp[i][j] - part + mod)%mod;  //这里也要模
          }
          //update 
          ls[a[i]] = i;
      }
      cout<<dp[n][m]%mod<<endl;
  }  
    return 0;
}
```

===========================================================================================================


## 贪心 堆

[题目](https://ac.nowcoder.com/acm/problem/20154)

贪心
 
按截至时间从小到大排序
 
如果按这个顺序选择，则有可能因为当前建筑耗费的时间比别的长，而错过最优解（即选择耗费时间短的，即使它的截至时间更久）
 
所以我们可以选择耗费时间更短的（相当于有一次反悔的机会），这样ans都加1，但是有更多的选择空间
 
用一个大顶堆维护当前选中的建筑的耗费时间
 
遍历所有建筑，如果能在截至时间内完成，就入堆
 
否则与堆顶比较（耗费时间最长的）
 
如果堆顶大，则用当前建筑替换堆顶的建筑，使耗费时间尽可能小

```cpp
#include<bits/stdc++.h>
using namespace std;
vector<pair<int,int>> vt;
int main(){
    int n;
    cin>>n;
    for(int i=0;i<n;i++){
        int x,y;
        cin>>x>>y;
        vt.emplace_back(x,y);
    }
    sort(vt.begin(),vt.end(),[](pair<int,int> pii1,pair<int,int> pii2){return pii1.second<pii2.second;});
    priority_queue<int> pq;
    int sum = 0;
    for(auto i:vt){
        if(sum+i.first<=i.second){
            sum+=i.first;
            pq.push(i.first);
        }else if(pq.top()>i.first){
            sum-=pq.top();
            pq.pop();
            sum+=i.first;
            pq.push(i.first);
        }
    }
    cout<<pq.size()<<endl;
    return 0;
}
```

===========================================================================================================


## 完全背包问题

[题目](https://ac.nowcoder.com/acm/problem/21228)


目标货币系统是子集，所以对于当前数，判断前面的数能否组合到这个数
 
这就变成完全背包问题，`a[i]` 表示体积，背包的最大体积是25000，价值就是是否可达到 `(dp[i]=0 or 1)`

```cpp
#include<bits/stdc++.h>
using namespace std;
int a[25005];
int dp[25005];
int ans;
int main(){
    int t;
    cin>>t;
    while(t--){
        memset(dp,0,sizeof(dp));
        ans=0;
        int n;
        cin>>n;
        dp[0]=1;
        for(int i=1;i<=n;i++){
            cin>>a[i];
        }
        sort(a+1,a+1+n);
        for(int i=1;i<=n;i++){  
            if(!dp[a[i]]) ans++;
            for(int j=a[i];j<=25000;j++){
                dp[j] = dp[j] |= dp[j-a[i]];
            }
        }
       cout<<ans<<endl;
    }
    return 0;
}
```


===========================================================================================================


## 贪心

[题目](https://ac.nowcoder.com/acm/problem/25043)

贪心，只要定排序规则就行

```cpp
#include<bits/stdc++.h>
using namespace std;
vector<pair<int,int>> vt;
int main(){
    int n;
    cin>>n;
    for(int i=0;i<n;i++){
        int x,y;
        cin>>x>>y;
        vt.emplace_back(x,y);
    }
    sort(vt.begin(),vt.end(),[](pair<int,int> pii1,pair<int,int> pii2){return pii1.first*pii2.second < pii1.second*pii2.first;});
    long long ans  = 0;
    long long tm = 0;
    for(auto i:vt){
        ans += i.second*tm;
        tm += 2LL*i.first;
    }
    cout<<ans<<endl;
    return 0;
}
```

===========================================================================================================


## dp 思维

[题目](https://ac.nowcoder.com/acm/problem/17621)

dp
 
第一次做真的很难想到
 
首先题目这么设计肯定是要把式子转换成物理意义
 
那就是“有两个装置，同时取到相同的排列的方案数，再求和”
 
设 `dp[k][i][j]` 表示两个装置都取出k个，第一个装置的上管道取出i个，第二个装置的上管道取出j个
 
那么第一个装置的下管道取出k-i个，第二个装置的下管道取出 `k-j` 个
 
`dp` 表示进行到此时的 `ans`
 
所以 `dp` 在传导的过程中用 `+=` 
 
最后的结果就是 `dp[n+m][n][n]`
 
`dp` 的初始条件是  `dp[0][0][0] = 1`
 
`dp` 的转移方程考虑四种情况
 
`(a[i]==a[j]) dp[k][i][j] += dp[k-1][i-1][j-1]`  即两个装置的上管道 各加一个球结果相同
 
`(a[i]==b[k-j]) dp[k][i][j] += dp[k-1][i-1][j]`  即第一个装置的上下两个管道各加一个球结果相同
 
`(b[k-i]==a[j]) dp[k][i][j] += dp[k-1][i][j-1]`  同上
 
`(b[k-i]==b[k-j]) dp[k][i][j] += dp[k-1][i][j]` 同上
 
由于数据规模，需要用01滚动数组
 
注意 assert 
 
注意continue 否则超时

```cpp
#include<bits/stdc++.h>
using namespace std;
const int mod = 1024523;
int n,m;
int dp[2][505][505];
char u[505];
char d[505];
int main(){
    cin>>n>>m;
    cin>>(u+1)>>(d+1);
    dp[0][0][0] = 1;
    for(int k=1;k<=n+m;k++){
        memset(dp[k&1],0,sizeof(dp[k&1]));
        for(int i=0;i<=n;i++){
        	if(k-i<0 or k-i>m) continue;  //不加这个超时 
            for(int j=0;j<=n;j++){
            	if(k-j<0 or k-j>m) continue;   //不加这个超时 
                if(u[i]==u[j] and i and j) {
                    dp[k&1][i][j] += dp[(k-1)&1][i-1][j-1];
                    dp[k&1][i][j] %= mod;
                }
                if(u[i]==d[k-j] and i and k-j and k-j<=m){
                    dp[k&1][i][j] += dp[(k-1)&1][i-1][j];
                    dp[k&1][i][j] %= mod;
                }
                if(u[j]==d[k-i] and j and k-i and k-i<=m){
                    dp[k&1][i][j] += dp[(k-1)&1][i][j-1];
                    dp[k&1][i][j] %= mod;
                }
                if(d[k-i]==d[k-j] and k-i and k-j and k-i<=m and k-j<=m){
                    dp[k&1][i][j] += dp[(k-1)&1][i][j];
                    dp[k&1][i][j] %= mod;
                }
            }
        }
    }
    cout<<dp[(n+m)&1][n][n]%mod<<endl;
    return 0;
}
```


===========================================================================================================

## 差分 规律


[题目](https://atcoder.jp/contests/tokiomarine2020/tasks/tokiomarine2020_c)

暴力差分

最重要的是所有的点在 log(n) 时间内都会变成 n

此时停机就不会超时

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,k;
int dat[200005];
int dif[200005];
bool check(){
	for(int i=1;i<=n;i++){
		if(dat[i]<n){
			return false;
		}
	}
	return true;
}
void did(int x){
	int L = max(1,x-dat[x]);
	int R = min(n , x+dat[x]);
	dif[L]++;
	dif[R+1]--;
}
void update(){
	for(int i=1;i<=n;i++){
		dat[i] = dat[i-1] + dif[i];
	}
}
int main(){
	cin>>n>>k;
	for(int i=1;i<=n;i++) cin>>dat[i];
	
	while(1 and k>0){
		for(int i=1;i<=n;i++) did(i);
		k--;
		if(check()) break;
		update();
		memset(dif,0,sizeof(dif));
	}
	
	if(k>0) {
		for(int i=0;i<n;i++) cout<<n<<" ";
	}
	else for(int i=1;i<=n;i++) cout<<dat[i]<<" ";
	cout<<'\n';
	return 0;
}
```



===========================================================================================================


## 分治（01背包问题 + 枚举）

[题目](https://atcoder.jp/contests/tokiomarine2020/tasks/tokiomarine2020_d)

第一次做分治，太妙了

暴力超时

如果在树上用dp预处理，内存超限

解决方法就是分治

完全二叉树有18层，前9层dp预处理所有的点

后9层枚举，然后将两个结果相加。这样将时间复杂度也分开了


```cpp
#include<bits/stdc++.h>
using namespace std;
vector<int> vt;
int n,q;
vector<pair<int,int>> info((1<<18) + 3);
vector<pair<int,int>> res;
#define fi first
#define se second
const int MAX = 100001;
int dp[515][MAX];
int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);
	cin>>n;
	
	for(int i=0;i<n;i++){
		int v,w;
		cin>>v>>w;
		info[i] = make_pair(v,w);
	}
	//preprocess
	const int MAX = 100001;
	int lim = min(512,n);
	
	for(int j=0;j<MAX;j++){
		dp[0][j] = (j>=info[0].se ? info[0].fi : 0);
	}
	for(int i=1;i<lim;i++){
		int p = (i-1)/2;
		for(int j=0;j<MAX;j++){
			if(j<info[i].se){
				dp[i][j] = dp[p][j];
			}else{
				dp[i][j] = max(dp[p][j] , dp[p][j - info[i].se] + info[i].fi);
			}
		}
	}
	
	cin>>q;
	while(q--){
		int V,L;
		cin>>V>>L;
		V--;
		vector<int> rem;
		while(V>=lim){
			rem.push_back(V);
			V = (V-1)/2;
		}
		int ans = 0;
		int sz = rem.size();
		for(int i=0;i<(1<<sz);i++){
			int sv = 0;
			int sw = 0;
			for(int j=0;j<sz;j++){
				if(i>>j&1){
					sv += info[rem[j]].fi;
					sw += info[rem[j]].se;
				}
			}
			if(sw <= L){
				ans = max(ans , dp[V][L-sw] + sv);
			}
		}
		cout<<ans<<endl;
	}
	return 0;
}
```


===========================================================================================================

## 博弈

[题目](https://ac.nowcoder.com/acm/contest/5891/F)

如果只有一个串，1的个数是奇数，alice必赢

所以只要有1个串1的个数是奇数，alice就对此操作，占据先机

接下来bob怎么操作，alice只要跟着操作就行

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    int t;
    cin>>t;
    while(t--){
        int n;
        cin>>n;
        bool ok=false;
        for(int i=0;i<n;i++){
            string s;
            cin>>s;
            bitset<1005> bs(s);
            if(bs.count()&1) ok=true;
        }
        if(ok) puts("sdzNB");else puts("kgNB");
    }
    return 0;
}
```

===========================================================================================================

## 递推 构造

[题目](https://ac.nowcoder.com/acm/problem/20241)

第一个数有两种情况0,1，根据第二例的信息不断往后递推，中途判断格子是否是0或1

```cpp
#include<bits/stdc++.h>
using namespace std;
int n;
int a[10005];
int b[10005];
int sol(int x){
	memset(b,0,sizeof(b));
	b[0] = 0;
	b[1] = x;
	for(int i=2;i<=n;i++){
		int tmp = a[i-1] - (b[i-1] + b[i-2]);
		if(tmp == 0 or tmp==1) {
			b[i] = tmp;
		}
		else{
			return 0;
		}
		if(i==n){
			if(a[n] == b[n-1] + b[n]){
				return 1;
			}
			else{
				return 0;
			}
		}
	}
}
int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);
	cin>>n;
	for(int i=1;i<=n;i++) cin>>a[i];
	int ans = sol(0) + sol(1);
	cout<<ans<<endl;
	return 0;
}
```

===========================================================================================================

## 筛法

[题目](https://ac.nowcoder.com/acm/problem/53079)

 筛法，注意从 i * i 开始，否则会超时

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const ll maxn = 30000005;
ll a[maxn];
ll b[maxn];
int main(){
    ll n;
    cin>>n;
//    b[1] = 0;
//     for(ll i = 2; i < maxn;i++){
//         if(a[i] == 0){    
//             ll q = i;
//             while(q < maxn){
//                 if(a[q] == 0){
//                     a[q] = i;
//                 }q += i;
//             }
//         }
//         b[i] = a[i] + b[i-1];  
//     }
    
    ll ans = 0;
	for(ll i = 2;i < n+1;i++){
		if(a[i] == 0){
			ans += i;
			ll q = i * i;   //从i*i开始，否则会超时 
			while(q < n+1){
				if(a[q] == 0){
					a[q] = 1;
					ans += i;
				}q += i;
			}
		}
	} 
    
    cout<<ans<<endl;
    return 0;
}
```



===========================================================================================================


## 背包问题 dp

[题目](https://ac.nowcoder.com/acm/problem/23413)

由于N=30所以求出所有的方案

类似于完全背包问题

`dp[i][k] `表示选 `i` 个，价值达到 `k` 的方案数

`dp[i][k] = sum(dp[i-1][k-j])`
  
其中j是每张彩票的面值

最后求 `k`在 `3n` 到 `4n` 之间的方案数

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
ll dp[35][150];
int main(){
    int n;
    cin>>n;
    dp[0][0] = 1;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=4;j++){
            for(int k=j;k<=4*n;k++){
                dp[i][k] += dp[i-1][k-j];
            }
        }
    }
    ll ans = 0;
    for(int i=3*n;i<=4*n;i++){
        ans += dp[n][i];
    }
    //cout<<ans<<endl;
    ll tol = pow(4,n);
    ll x = __gcd(tol, ans);
    ans /= x;
    tol /= x;
    cout<<ans<<"/"<<tol<<endl;
    return 0;
}
```






 

 







