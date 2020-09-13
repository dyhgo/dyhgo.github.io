# 字符串匹配算法(未完成)






从学习方法和代码实现debug花了挺长时间。。。

这个算法是从字符串s中找子串p出现的第一个位置

以下是两个常见的字符串匹配算法（还有其他更高效的比如Turbo-bm算法，sunday算法）

kmp算法和bm算法

时间复杂度是O(s+p)

bm算法总体比kmp算法要快3倍

当然也可以直接用函数，比如 s.find( p );

//懒得写更多，懒得修饰代码

plus:字符串的读入常常会出现读空格、读回车等奇妙现象

### kmp算法

```cpp
//kmp without optimization
//strncpy() memmove()
#include<bits/stdc++.h>
using namespace std;


int kmp(char s[],char p[])
{
	//preprocess
	int sl=strlen(s);
	int pl=strlen(p);
	char subp[pl+1][pl+1];
	int next[pl+1];
	for(int k=0;k<pl;k++)
	{
		strncpy(subp[k],p,k+1);
	}
	//can optimized
	for(int k=0;k<pl;k++)
	{
		string tl;
		string tr;
		int len_sub=k+1;
		int len=0;
		for(int m=len_sub-1;m>0;m--)
		{
			tl=string(subp[k],subp[k]+m);
			tr=string(subp[k]+len_sub-m,subp[k]+len_sub);
			if(tl==tr)
			{
				len=m;
				break;
			}
		}
		next[k]=len;
	}
	for(int k=pl-1;k>0;k--)
	{
		next[k]=next[k-1];
	}
	next[0]=-1;
	
	//match
	int i=0;int j=0;
	while(1)
	{
		if(s[i]==p[j])
		{
			i++;
			j++;
		}
		else
		{
			int t=next[j];
			if(t==-1)
			{
				i++;
				j=0;
			}
			else
			{
				j=t;
			}
		}
		if(j>=pl)
		{
			return i-pl;
		}
		if(i>=sl)
		{
			return -1;
		}
	}
}



int main()
{
	freopen("input.txt","r",stdin);
	char a[100];
	char b[100];
	cin>>a>>b;
	cout<<kmp(a,b);
	return 0;
}
```



### bm算法

```cpp
//bm algorithm three to five times faster than kmp in genneral
#include<iostream>
#include<algorithm>
#include<cstring>
#include<string>
#include<vector>
using namespace std;

int get_badc(char t,char a[])
{
	int k=strlen(a)-1;
	while(1)
	{
		if(k>=0)   //assert
		{
			if(a[k--]==t)
			{
				return k+1;
			}
		}
		else return -1;
	}
}

int get_goods(vector<char> t,char a[])  //most difficult
{
	int k=strlen(a)-1;
	vector<char> temp;
	int max_len=0;
	int m=0;
	int loc=-1;
	while(1)
	{ 
		if(k>=0)              //assert
		{
			if(t[m]==a[k])
			{
				temp.push_back(a[k]);
				m++;
				k--;
			}
			else
			{
				m=0;
				k--;
				if(temp.size()>max_len)
				{
					max_len=temp.size();
					loc=k+1;
					temp.clear();
				}
			}
		}
		else return loc;
	}
}

int bm(char s[],char p[])
{
	int sl=strlen(s);
	int pl=strlen(p);
	int i=pl-1;
	int j=pl-1;
	while(1)
	{
		if(i<sl and j>=0)    //asseert  // i<sl !!!!!!!!!! not i>0
		{
			if(s[i]==p[j])
			{
				vector<char> goods;
				goods.push_back(s[i]);
				while(1)
				{
					i--;
					j--;
					if(i>=0 and j>=0)   //assert
					{
						if(s[i]!=p[j])
						{
							char badc1=s[i];
							string str(p,p+pl-goods.size());
							int loc1=get_badc(badc1,&str[0]);
							int loc2=get_goods(goods,&str[0]);
							if(loc1==-1 and loc2!=-1)
							{
								i+=pl-1-loc2;
								j=pl-1;
							}
							else if(loc2==-1 and loc1!=-1)
							{
								i+=pl-1-loc1;
								j=pl-1;
							}
							else
							{
								i+=pl-1-min(loc1,loc2);
								j=pl-1;
							}
						}
						else
						{
							goods.push_back(s[i]);     //still add in good-suffix
						}
					}
					else break;
				}
			}
			else  //only have bad-character
			{
				char badc2=s[i];
				int loc=get_badc(badc2,p);
				i+=pl-1-loc;
				j=pl-1;
			}
		}
		else if(i>=sl) return -1;     //!!!!!!!!!!!!!
		else return i+1;              //!!!!!!!!!!!!
	}
}

int main()
{
	freopen("input.txt","r",stdin);
	char a[100];
	char b[100];
	cin>>a>>b;
	cout<<b<<endl<<a;
	cout<<bm(b,a)<<endl;
	return 0;
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200117201033532.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
