# Number Theory




#### 求最大公约数和最小公倍数
辗转相除法

时间复杂度O(log(max(a,b)))
```cpp
int gcd(int a,int b)
{
	if(b==0) return a;
	else return gcd(b,a%b);
}

int lcm(int a,int b)
{
	return a*b/gcd(a,b);
}
```
或直接调用algorithm库中的__gcd(int a,int b)
&emsp;
#### 扩展欧几里得算法
求满足 ax+by=gcd(a,b) 的整数解 x ，y

时间复杂度O(log(max(a,b)))

```cpp
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
```
&emsp;
#### 求n以内质数个数
很多种方法，以下是埃氏筛 

时间复杂度O(nloglogn)

```cpp
int prime[maxn];   //ith prime number
bool isprime[maxn+1] //is i a prime number
int e_sieve(int n)
{
	int p=0;  //position
	for(int i=0;i<=n;i++) isprime[i]=true;  //initialize
	isprime[0]=isprime[1]=false;
	for(int i=2;i<=n;i++)
	{
		if(isprime[i])
		{
			prime[p++]=i;
			for(int j=2*i;j<=n;j+=i) isprime[j]=true;
		}
	}
	return p;
}
```
&emsp;
#### 数论的一些性质
Premise: a≡c (mod m)   and  b≡d (mod m)
Conclusion:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a±b≡c±d (mod m)   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; a\*b≡c\*d (mod m)
&emsp;
d|a && d|b ⇒ d|gcd(a,b)
&emsp;
gcd(an,bn) = n\*gcd(a,b)
&emsp;
 任意正整数n，n|ab && a,n互质 ⇒ n|b
 &emsp;
 a,p 互质  ， b,p互质 ⇒ ab,p互质
 &emsp;
任意一个合数都可以分解成唯一的质数幂积的形式，即
$$
a=\prod\limits_{i=1}  ^ {n} {{p_i} ^ {e_i}}
$$
因子个数为
$$
\sum\limits_{i=1}  ^ {n} {(1+e_i)}
$$
积性函数 
f(ab) = f(a)f(b)
欧拉函数 莫比乌斯函数 gcd 狄利克雷函数

&emsp;
#### 快速幂
时间复杂度O(logn)
```cpp
typedef long long ll;
ll qpow(ll x,ll n,ll mod)
{
	ll res =1;
	while(n>0)
	{
		if(n&1) res=res*x%mod;
		x=x*x%mod;
		n>>=1;
	}
	return res;
}
```
&emsp;
#### 逆元
$$
 逆元\quad y=a^{-1}\quad满足\quad ay≡1(mod\ m) ~\\ y为a在模m下的逆元
$$
$$
对于\quad ax≡b(mod\ m) ~\\ x=a^{-1}*b
$$
求逆元
$$
ax≡1(mod\ m) ~\\ ax-mk=1 ~\\ ax+my=1 ~\\ ax+my=gcd(a,m) ~\\当a,m不互质的时候，逆元不存在
$$

```cpp
int mod_inverse(int a,int m)
{
	int x,y;
	ex_gcd(a,m,x,y);
	return (m+x%m)%m;
} 
```
&emsp;

#### 线性时间内预处理逆元

```cpp
inv[0]=1;inv[1]=1;      //inv[0]=1 !!! 
	for(ll i=2;i<=n;i++){
		inv[i]=(mod-mod/i)*inv[mod%i]%mod;
	}
```


#### 欧拉函数
$$
设\quad n =\prod\limits_{i=1}  ^ {n} {{p_i} ^ {e_i}} ~\\ 则欧拉函数\quad  φ(n)=n*\prod\limits_{i=1}  ^ {n} {\frac{p_i-1}{p_i}}
$$
欧拉函数的数值等于不超过n且与n互质的数的个数

当n时质数时，φ(n)=n-1

如果n=p^k , φ(n)=p^k - p^(k-1) = (p-1)p^(k-1)

如果m,n互质，则φ(mn)=φ(m)φ(n)

φ(n)的值都为偶数，φ(2)除外

质因子之和 (φ(n)*n)/2
&emsp;
#### 欧拉定理
$$
当a,m互质时 ~\\ a^{φ(m)}≡1(mod \ m)
$$
&emsp;
#### 费马小定理
$$
当p是质数时， 对任意整数x 都有 ~\\ x^p≡x(mod \ p) ~\\~\\ 当x,p互质时 ~\\ x^{p-1}≡1(mod \ p) ~\\ 这就是欧拉定理的特殊形式
$$
&emsp;
#### 求欧拉函数
时间复杂度O(√(n))
求欧拉函数值的表，类似于埃氏筛，时间复杂度O(n)

```cpp
int phi(int n)
{
	int res=n;
	for(int i=2;i*i<=n;i++)
	{
		if(n%i==0)
		{
			res=res/i*(i-1);
			while(n%i==0) n/=i;
		}
	}
	if(n!=1) res=res/n*(n-1);
	return res;
}

int euler_phi[maxn];
void phi_arr()
{
	for(int i=0;i<maxn;i++) euler_phi[i]=i;
	for(int i=2;i<maxn;i++)
	{
		if(euler_phi[i]==i)
		{
			for(int j=i;j<maxn;j+=i) euler_phi[j]=euler_phi[j]/i*(i-1);
		}
	}
}
```
&emsp;
#### 线性同余方程组
$$
a_ix≡b_i(mod \ m_i)
$$
如果方程组有解，一定有无穷多解

解的全集可以写成 x≡b(mod m)

所以将问题转化为求b,m

可以对如下方程组依次求解
$$
x≡b_1(mod \ m_1) ~\\ ax≡b_2(mod\ m_2)
$$
$$
x≡b_1(mod \ m_1) ~\\ x=b_1+m_1*t ~\\a(b_1+m_1*t)≡b_2(mod\ m_2) ~\\a*m_1*t≡b_2-a*b_1(mod \ m_2) ~\\a'*t≡b'(mod \ m_2)
$$
当gcd(m₂,a*m₁)与b₂-a*b₁互质时，方程组无解

时间复杂度O(n)
```cpp
pair<int,int> linear_congruence(const vector<int>& A,const vector<int>& B,const vector<int>& M)
{
	//最开始没有限制，把解设为所有整数 x ≡0(mod 1)
	int x=0,m=1;
	for(int i=0;i<A.size();i++)
	{
		int a=A[i]*m , b=B[i]-A[i]*x , d=gcd(M[i],a);    //d!!!
		if(b%d!=0) return make_pair(0,-1);  //无解
		int t=b / d * mod_inverse(a/d,M[i]/d) % (M[i]/d) ;
		x=x+m*t;
		m*=M[i]/d;    //*=  !!!
	}
	return make_pair(x%m,m);
}
```
&emsp;
#### 中国剩余定理(CRT)
crt是线性同余方程组ai=0，mi互质的特殊形式

这时，x≡b(mod Πmi)

crt的思想是余数的加性和模数的乘性，当模数为合数时，可以拆成质因数的积

crt定理如下
$$
对于x≡b_i(mod \ m_i) \ \ \ \ \ \ m_i互质 ~\\ ~\\令M=\prod{m_i} ~\\M_i=\frac{M}{m_i} ~\\M_i ^ {-1} 为M_i模m_i的逆元 ~\\
则 \ x≡(\sum\limits_{i=1}  ^ {n} {b_iM_iM_i ^{-1}}) \ (mod \ M)
$$

```cpp
// x=x+(Πmi)*t
//return minimum 
int crt(const vector<int>& b,const vector<int> &m)
{
    int M=1,x=0;
    for(int i=0;i<m.size();i++) M*=m[i];
    for(int i=0;i<m.size();i++){
        int Mprime=M/m[i];
        int M_p_i=mod_inverse(Mprime,m[i]);
        x=(x + b[i] * Mprime * M_p_i)%M;
    }
    return (x+M)%M;
}
```
&emsp;
#### Lucas定理
$$
求 \ C_{n}^{k} \ (mod \ p)   , p是质数 ~\\ 当k,n较小时，利用杨辉三角形的性质 ~\\ C_{n}^{k}=C_{n-1}^k+C_{n-1}^{k-1} ~\\ ~\\当n,k较大时 ~\\ n=\sum{n_ip^i} \quad \quad k=\sum{k_ip^i}   \quad\quad表示成p进制~\\ C_n^k≡\prod{C_{n_i}^{k_i}} \ (mod \ p)
 $$

```cpp
ll pow_mod(ll a, ll n)
{
    if(n == 0) return 1;
    ll x = pow_mod(a, n/2);
    ll ans = x * x % mod;
    if(n % 2 == 1) ans = ans *a % mod;
    return ans%mod;
}

ll C(ll n,ll m) {
    if(n < m) return 0;
    ll res = 1;
    for(ll i=1; i<=m; i++) {
        ll a = (n+i-m)%mod;
        ll b = i%mod;
        res = res*(a*pow_mod(b,mod-2)%mod)%mod;
    }
    return res;
}

ll Lucas(ll n,ll m) {
    if(m == 0) return 1;
    return C(n%mod, m%mod) * Lucas(n/mod,m/mod)%mod;
}
```

```cpp
ll qpow(ll x,ll n)
{
	ll res =1;
	while(n>0)
	{
		if(n&1) res=res*x%mod;
		x=x*x%mod;
		n>>=1;
	}
	return res;}
ll com(ll a,ll b){
    ll ans=1;
    for(ll i=a;i>a-b;i--){
        ans=ans*i%mod;
    }
    for(ll i=1;i<=b;i++){
        ans=(ans*qpow(i,mod-2))%mod;
    }
    return ans;
}
```

![](https://img-blog.csdnimg.cn/2020022211204398.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
