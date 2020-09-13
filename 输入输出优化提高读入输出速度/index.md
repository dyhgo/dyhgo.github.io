# 输入输出优化(提高读入输出速度)





参考[https://blog.csdn.net/weixin_43960287/article/details/85337291](https://blog.csdn.net/weixin_43960287/article/details/85337291)
## 1.用scanf,printf代替cin,cout
## 2.取消同步和绑定

```cpp
ios::sync_with_stdio(false);
cin.tie(0);
//cout.tie(0);
```
此时只能用cin,cout
## 3.对整型输入输出，将每个数字变成字符

```cpp
inline int read()
{
	int x=0;int f=1;char s=getchar();
	while(s<'0' or  s>'9') 
	{
		if(s=='-')
			f-=1;
		s=getchar();
	}
	while(s>='0' and s<='9') 
	{
		x=x*10+s-'0';
		s=getchar();
	}
	return x*f;
}

void write(int x)
{
	if(x/10>0) write(x/10);
	putchar(char(x%10+'0'));
}

int main()
{
	//freopen("input.txt","r",stdin);
	int n=read();
	cout<<n<<endl;
	write(200);
	return 0;
} 
```
