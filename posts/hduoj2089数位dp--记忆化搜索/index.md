# hduoj2089(数位dp + 记忆化搜索)




#### Problem Description
杭州人称那些傻乎乎粘嗒嗒的人为62（音：laoer）。
杭州交通管理局经常会扩充一些的士车牌照，新近出来一个好消息，以后上牌照，不再含有不吉利的数字了，这样一来，就可以消除个别的士司机和乘客的心理障碍，更安全地服务大众。
不吉利的数字为所有含有4或62的号码。例如：
62315 73418 88914
都属于不吉利号码。但是，61152虽然含有6和2，但不是62连号，所以不属于不吉利数字之列。
你的任务是，对于每次给出的一个牌照区间号，推断出交管局今次又要实际上给多少辆新的士车上牌照了。
#### Input
输入的都是整数对n、m（0<n≤m<1000000），如果遇到都是0的整数对，则输入结束。
#### Output
对于每个整数对，输出一个不含有不吉利数字的统计个数，该数值占一行位置。
#### Sample Input
1 100
0 0
#### Sample Output
80
#### Solution
与数位的组成有关，可以用数位dp。

利用前缀即 solve(m)-solve(n-1)

dp[i][j] 表示   符合条件的个数[当前操作的数位(倒序排)][当前操作的数位的前一个数]
$$
dp[pos][pre] = \sum\limits_{i=0}  ^ {maxd} dp[pos-1][i]
$$
maxd可以由一个boolean变量limit控制，是否是9还是dig[pos]

为了不重复计算（重复计算也可以），可以用记忆化搜索，也就是可以利用计算好的dp。为了使dp普适，dp必须是稳定，经全搜索得到的（即maxd=9）。所以通过limit控制dp的存储和dp的读取

通过dp递推式，可以用dfs实现（理论上来说可以不用dfs，但不能记忆化且dp可能要增加维度，且要特殊初始化。没有实践过，有时间可以去试试）

int dfs(int pos,int pre,bool limit)

通过limit和返回值来使dp结果普适

AC代码如下

```cpp
#include<iostream>
#include<cstring>
using namespace std;
int n,m;
int dp[10][10];   //dp[i][j]  i:总共有i位 , j:前导数字为j , dp:满足条件（不含4和62）的个数 
int dig[10];
int dfs(int pos,int pre,bool limit)   //pos 当前位置 ， pre 当前位置的前一个数字 
{
	if(pos==-1) return 1;           //只有0（1个数字）满足
	if(dp[pos][pre]!=-1 && !limit) return dp[pos][pre];  //已经搜索过则直接返回  //!!!!
	int ans=0;
	int maxd;
	if(limit) maxd=dig[pos];
	else maxd=9;
	
	for(int i=0;i<=maxd;i++)
	{
		if(i==4 || (pre==6 && i==2)) ;
		else ans+=dfs(pos-1,i,limit && i==dig[pos]);   //这里需要传limit  !!!!!!!!!! 
	}
	if(!limit)     //只有在全搜索的时候才能给dp赋值，这样可以保证dp适用于所有情况，从而实现记忆化搜素 
	dp[pos][pre]=ans;
	
	return ans;
}
int solve(int x)
{
	int len=0;
	while(x)
	{
		dig[len++]=x%10;
		x/=10;
	}
	return dfs(len-1,0,1);
 } 
int main()
{
	//freopen("input.txt","r",stdin);
	memset(dp,-1,sizeof(dp)); //不需要每次都初始化，因为要记忆化搜索 //不需要对dp特殊初始化，因为dfs中有return 1 
	while(scanf("%d%d",&n,&m)==2 && (n || m))
	{
		cout<<solve(m)-solve(n-1)<<endl;
	}
	return 0;
 } 

```
第一次写数位dp，参考了别人的代码，也调试了很久，思考了很多，才弄懂其中的细节
