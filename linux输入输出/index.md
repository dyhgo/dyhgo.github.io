# Linux输入输出



万物皆文件 -- Linus Torvalds

## 重定向

标准输入流`stdin`的文件描述符是`0`，标准输出流`stdout`的文件描述符是`1`，标准错误流的文件描述符是`2`

标准输入流一般是键盘在终端的输入，标准输出流和错误输出流一般显示在终端屏幕上

我们可以将输入输出流重定向到其他文件

输出有`>`表示覆盖和`>>`表示追加，输入有`<`

注意像`2>`这种符号之间不能有空格

### 2>&1

`2>&1`表示把错误输出`2`，重定向`>&`到标准输出`1`所在的文件描述符(默认是终端屏幕）

`command > file 2>&1`表示command的标准输出先重定向到file，然后错误输出重定向到标准输出（现在是file），所以最后标准输出和错误输出都被重定向到file

`command 2>&1 > file`表示command的错误输出重定向到标准输出（现在是终端）（相当于啥事没发生），然后标准输出重定向到file，最后只有标准输出重定向到file，错误输出还是在终端输出


同理可以有`1>&2`等组合
### 各种命令

|命令|作用  |
|--|--|
| command > file | 将command的标准输出重定向到file |
|command >> file |将command的标准输出重定向到file |
|command 2> file |只将command的标准错误输出重定向到file |
|command 2>> file |只将command的标准错误输出重定向到file |
|command 2>&1 | 将command的错误输出重定向到标准输出|
| command > file 2>&1|将command的标准输出和错误输出重定向到file,此时2>&1只能写在最后 |
| command >> file 2>&1| 将command的标准输出和错误输出重定向到file,此时2>&1只能写在最后|
|command &> file |command > file 2>&1的简写，注意简写&>只能放在file前，不能放在后面 |
|command >& file | 同command &> file|
| command &>> file| command >> file 2>&1的简写，注意&>>不能写成>>&|
|command 2>&1 > file | 将command的标准输出重定向到file|
|command 2>&1 >> file | 将command的标准输出重定向到file|
|command < input | 将command的标准输入重定向到input|
|command << input|一直从键盘输入，直到遇到字符input，here-document方式|
|command <<< input|input为单行字符串，here- string方式，其中input用单引号和双引号效果不一样，详见参考|
|command < file1 > file2 |将command的标准输入重定向到file1，标准输出重定向到file2|



### 例子



`command > file`

```shell
dyh@0v0:~$ cat a
123
dyh@0v0:~$ echo 'hello' > a
dyh@0v0:~$ cat a
hello
```

`command >> file`


```shell
dyh@0v0:~$ cat a
hello
dyh@0v0:~$ echo 'world' >> a
dyh@0v0:~$ cat a
hello
world
```

`command 2> file`

```shell
dyh@0v0:~$ cd 123
-bash: cd: 123: No such file or directory
dyh@0v0:~$ cat a
hehe
dyh@0v0:~$ cd 123 2> a
dyh@0v0:~$ cat a
-bash: cd: 123: No such file or directory
dyh@0v0:~$ cd 123 > a
-bash: cd: 123: No such file or directory
dyh@0v0:~$ cat a
dyh@0v0:~$ 
```


`command 2>> file`

```shell
dyh@0v0:~$ cat a
-bash: cd: 123: No such file or directory
dyh@0v0:~$ cd 124 2>> a
dyh@0v0:~$ cat a
-bash: cd: 123: No such file or directory
-bash: cd: 124: No such file or directory
```

`command > file 2>&1`

```shell
dyh@0v0:~$ cat a
qqq
dyh@0v0:~$ ls a b > a 2>&1
dyh@0v0:~$ cat a
ls: cannot access 'b': No such file or directory
a
```

`command >> file 2>&1`

```shell
dyh@0v0:~$ cat a
ls: cannot access 'b': No such file or directory
a
dyh@0v0:~$ ls a b >> a 2>&1
dyh@0v0:~$ cat a
ls: cannot access 'b': No such file or directory
a
ls: cannot access 'b': No such file or directory
a
```

`command &> file`

```shell
dyh@0v0:~$ cat a
ls: cannot access 'b': No such file or directory
a
ls: cannot access 'b': No such file or directory
a
dyh@0v0:~$ ls a b &> a
dyh@0v0:~$ cat a
ls: cannot access 'b': No such file or directory
a
```


`command >& file`

```shell
dyh@0v0:~$ cat a
111
dyh@0v0:~$ ls a b >& a
dyh@0v0:~$ cat a
ls: cannot access 'b': No such file or directory
a
```

`command &>> file`


```shell
dyh@0v0:~$ cat a
ls: cannot access 'b': No such file or directory
a
dyh@0v0:~$ ls a b &>> a
dyh@0v0:~$ cat a
ls: cannot access 'b': No such file or directory
a
ls: cannot access 'b': No such file or directory
a
```

`command 2>&1 > file`

```shell
dyh@0v0:~$ cat a
qqq
dyh@0v0:~$ ls a b 2>&1 > a
ls: cannot access 'b': No such file or directory
dyh@0v0:~$ cat a
a
```


`command 2>&1 >> file`

```shell
dyh@0v0:~$ cat a
a
dyh@0v0:~$ ls a b 2>&1 >> a
ls: cannot access 'b': No such file or directory
dyh@0v0:~$ cat a
a
a
```

`command < input`

```shell
dyh@0v0:~$ cat a
hello
world
hah
dyh@0v0:~$ wc -l a
3 a
dyh@0v0:~$ wc -l < a
3
```


`command << input`

```shell
dyh@0v0:~$ wc -l << a
> 123
> 456
> hello world
> yes
> no
> a
5
```

`command <<< input`

```shell
dyh@0v0:~$ tr a-z A-Z <<< aa
AA
dyh@0v0:~$ tr a-z A-Z <<< 'hello world'
HELLO WORLD
dyh@0v0:~$ tr a-z A-Z <<< "hello world"
HELLO WORLD
dyh@0v0:~$ tr a-z A-Z <<< aa bb
tr: extra operand ‘bb’
Try 'tr --help' for more information.
```

`command < file1 > file2`

```shell
dyh@0v0:~$ cat a
hello
world
hah
dyh@0v0:~$ tr a-z A-Z < a > r
dyh@0v0:~$ cat r
HELLO
WORLD
HAH
```

```shell
dyh@0v0:~$ cat a 
hello
world
hah
dyh@0v0:~$ cat > a << qq
> erfafsa
> fafssvadrfgh
> fvdsf
> qq
dyh@0v0:~$ cat a
erfafsa
fafssvadrfgh
fvdsf
```

### /dev/null

将输出流重定向到/dev/null就会消失，像掉进黑洞一样



## 管道

管道将标准输出流转化成标准输入流

```shell
dyh@0v0:~$ ps -ef | grep "ba"
root          31       2  0 Nov22 ?        00:00:00 [writeback]
root         610       1  0 Nov22 ?        00:00:03 /usr/sbin/irqbalance --foreground
root        1086       1  0 Nov22 ttyS0    00:00:00 /sbin/agetty -o -p -- \u --keep-baud 115200,57600,38400,9600 ttyS0 vt220
root       10451   10361  0 20:18 pts/0    00:00:00 -bash
dyh        10468   10467  0 20:18 pts/0    00:00:00 -bash
dyh        10560   10468  0 21:02 pts/0    00:00:00 grep ba
```

有时候只使用管道是不行的，要通过`xargs`把标准输入转化成一个或多个下一个命令的参数，一般使用空格分开，但是如果标准输入中就有空格，需要额外处理

```shell
dyh@0v0:~$ ls -l
total 12
-rw-r--r-- 1 dyh dyh   29 Nov 24 20:39 a
-rw-r--r-- 1 dyh dyh   15 Nov 24 21:13 aa
drwxr-xr-x 2 dyh dyh 4096 Nov 24 21:22 dir_a
dyh@0v0:~$ find ~ -name '*a*'
/home/dyh/aa
/home/dyh/a
/home/dyh/dir_a
dyh@0v0:~$ ls -l /home/dyh/aa /home/dyh/a /home/dyh/dir_a
-rw-r--r-- 1 dyh dyh   29 Nov 24 20:39 /home/dyh/a
-rw-r--r-- 1 dyh dyh   15 Nov 24 21:13 /home/dyh/aa

/home/dyh/dir_a:
total 0
dyh@0v0:~$ find ~ -name '*a*' | ls -l
total 12
-rw-r--r-- 1 dyh dyh   29 Nov 24 20:39 a
-rw-r--r-- 1 dyh dyh   15 Nov 24 21:13 aa
drwxr-xr-x 2 dyh dyh 4096 Nov 24 21:22 dir_a
dyh@0v0:~$ find ~ -name '*a*' | xargs ls -l
-rw-r--r-- 1 dyh dyh   29 Nov 24 20:39 /home/dyh/a
-rw-r--r-- 1 dyh dyh   15 Nov 24 21:13 /home/dyh/aa

/home/dyh/dir_a:
total 0
```

对于find命令，可以使用-exec选项

```shell
dyh@0v0:~$ find ~ -name '*a*' -exec ls -l {} \;
-rw-r--r-- 1 dyh dyh 15 Nov 24 21:13 /home/dyh/aa
-rw-r--r-- 1 dyh dyh 29 Nov 24 20:39 /home/dyh/a
total 0
```

不过如果要查找文件，最好用`whereis`或`locate`，这两个都比`find`快，不过`find`是最强大的查找工具

`find <path> -name <name> -exec <command> {} \;`和`find <path> -name <name> | xargs <command>`有什么区别

Q:

 `find <path> -name <name> -exec <command> {} \;`和`find <path> -name <name> | xargs <command>`都是Linux中的`find`命令，用于查找文件并对其执行指定的命令。两者的区别在于：

A: 

- `find <path> -name <name> -exec <command> {} \;`会对每个查找到的文件都执行一次指定的命令，而`find <path> -name <name> | xargs <command>`则会将所有查找到的文件名作为参数传递给`xargs`命令，然后再一次性地执行指定的命令。
- `find <path> -name <name> -exec <command> {} \;`可以保证命令的执行顺序，而`find <path> -name <name> | xargs <command>`则不能保证命令的执行顺序。

例如，下面的命令将在当前目录下查找所有`.txt`文件，并对每个文件执行`ls -l`命令：

```bash
find . -name "*.txt" -type f -exec ls -l {} \;
```

而下面的命令则使用了`xargs`命令来执行相同的操作：

```bash
find . -name "*.txt" -type f | xargs ls -l
```

这两个命令的效果是相同的，但是第二个命令可能会更快，因为它可以将多个文件名作为参数传递给`ls`命令，从而减少了命令的执行次数.

总的来说，如果需要对每个查找到的文件执行指定的命令，并且命令的执行顺序很重要，那么应该使用`-exec`选项。如果只是需要对所有查找到的文件执行指定的命令，并且命令的执行顺序不重要，那么可以考虑使用`xargs`命令.

以上答案来自于gpt-4


`xargs` 处理空格输入

```shell
dyh@0v0:~$ ls -l
total 12
-rw-r--r-- 1 dyh  dyh    29 Nov 24 21:59  a
-rw-r--r-- 1 root root    0 Nov 24 22:00 'a a'
-rw-r--r-- 1 dyh  dyh    15 Nov 24 21:13  aa
drwxr-xr-x 2 dyh  dyh  4096 Nov 24 21:22  dir_a
dyh@0v0:~$ ls
 a  'a a'   aa   dir_a
dyh@0v0:~$ find ./ -name '*a*'
./aa
./a a
./a
./dir_a
dyh@0v0:~$ ls -l ./aa ./a\ a ./a ./dir_a
-rw-r--r-- 1 dyh  dyh    29 Nov 24 21:59  ./a
-rw-r--r-- 1 root root    0 Nov 24 22:00 './a a'
-rw-r--r-- 1 dyh  dyh    15 Nov 24 21:13  ./aa

./dir_a:
total 0
dyh@0v0:~$ find ./ -name '*a*' | ls -l
total 12
-rw-r--r-- 1 dyh  dyh    29 Nov 24 21:59  a
-rw-r--r-- 1 root root    0 Nov 24 22:00 'a a'
-rw-r--r-- 1 dyh  dyh    15 Nov 24 21:13  aa
drwxr-xr-x 2 dyh  dyh  4096 Nov 24 21:22  dir_a
dyh@0v0:~$ find ./ -name '*a*' | xargs ls -l
-rw-r--r-- 1 dyh dyh   29 Nov 24 21:59 ./a
-rw-r--r-- 1 dyh dyh   29 Nov 24 21:59 ./a
-rw-r--r-- 1 dyh dyh   29 Nov 24 21:59 a
-rw-r--r-- 1 dyh dyh   15 Nov 24 21:13 ./aa

./dir_a:
total 0
dyh@0v0:~$ find ./ -name '*a*' -print0 | xargs -0 ls -l
-rw-r--r-- 1 dyh  dyh    29 Nov 24 21:59  ./a
-rw-r--r-- 1 root root    0 Nov 24 22:00 './a a'
-rw-r--r-- 1 dyh  dyh    15 Nov 24 21:13  ./aa

./dir_a:
total 0
```

`-print0`和`-0`意思是不用空格分割了，用null分割




## 参考

[https://www.runoob.com/linux/linux-shell-io-redirections.html](https://www.runoob.com/linux/linux-shell-io-redirections.html)

[https://www.redhat.com/sysadmin/linux-shell-redirection-pipelining](https://www.redhat.com/sysadmin/linux-shell-redirection-pipelining)

[https://blog.csdn.net/succing/article/details/127355545](https://blog.csdn.net/succing/article/details/127355545)

[https://blog.csdn.net/weixin_43025343/article/details/132537234](https://blog.csdn.net/weixin_43025343/article/details/132537234)

[https://luzejia.blog.csdn.net/article/details/112059493?spm=1001.2014.3001.5502](https://luzejia.blog.csdn.net/article/details/112059493?spm=1001.2014.3001.5502)

[https://blog.csdn.net/oqqHuTu12345678/article/details/129282059](https://blog.csdn.net/oqqHuTu12345678/article/details/129282059)

[https://www.runoob.com/linux/linux-comm-xargs.html](https://www.runoob.com/linux/linux-comm-xargs.html)
