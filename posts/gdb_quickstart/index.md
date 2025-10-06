# gdb基础使用


## gdb安装

Linux版本 CentOS Linux release 7.9.2009

```
yum install gdb
gdb --version
```

## 基础命令简介

查看gdb的命令

`man gdb`


以下三种使用gdb调试的方式

`gdb program` 调试可执行文件

`gdb program core`  调试corefile

`gdb -p 1234`  调试正在运行的程序，1234为pid

查看gdb中的某个命令，在进入gdb中使用

`help xxx`

|命令  |简写  |功能 |
|--|--|-- |
| run [arglist] |r  |运行程序（可带命令行参数，如r 10 20） |
| break [file:]functiop |b  | 设置断点（如b main.c:10在 main.c 第 10 行设断点，b func在函数 func 处设断点）|
| next | n | 单步执行（不进入函数内部）|
| step | s | 单步执行（进入函数内部）|
| print expr | p | 查看变量值（如p num打印变量 num 的值，p array[0]打印数组首元素）|
|continue  | c | 从当前位置继续执行，直到下一个断点或程序结束|
| info break |i b  | 查看所有断点信息|
|delete num |d  |删除断点（如d 1删除编号为 1 的断点） |
| backtrace | bt |查看函数调用栈（定位程序崩溃位置常用） |
| quit |q  |退出 GDB |
| list [file:]function| l| 显示此刻源代码|
|frame num |f |进入某个调用栈 |



要让gdb调试，就要在gcc编译时加上`-g`

比如有如下代码

```c
#include <stdio.h>

int main(){
        printf("hello world\n");
        return 0;

}
```

执行`gcc test.c -o test -g`，然后执行`gdb test`
		
## 基础命令示例


假设代码为

```c
#include <stdio.h>

// 计算1到n的和
int calculate_sum(int n) {
    int sum = 0;
    int i = 1;
    while (i <= n) {
        sum += i;
        i++;
    }
    return sum;
}

int main() {
    int num = 5;
    int result = calculate_sum(num);
    printf("1到%d的和为：%d\n", num, result);  
    return 0;
}
```

演示run和quit


```
(gdb) r
Starting program: /root/test 
1到5的和为：15
[Inferior 1 (process 15335) exited normally]
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64
(gdb) q
```

演示break、info break、print、continue


```
(gdb) b main
Breakpoint 2 at 0x400563: file test.c, line 15.
(gdb) b 17
Breakpoint 3 at 0x400577: file test.c, line 17.
(gdb) i b
Num     Type           Disp Enb Address            What
2       breakpoint     keep y   0x0000000000400563 in main at test.c:15
3       breakpoint     keep y   0x0000000000400577 in main at test.c:17
(gdb) r
Starting program: /root/test 

Breakpoint 2, main () at test.c:15
15          int num = 5;
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64
(gdb) p num
$1 = 0
(gdb) n
16          int result = calculate_sum(num);
(gdb) p num
$2 = 5
(gdb) c
Continuing.

Breakpoint 3, main () at test.c:17
17          printf("1到%d的和为：%d\n", num, result);  
(gdb) c
Continuing.
1到5的和为：15
[Inferior 1 (process 15552) exited normally]
(gdb) c
The program is not being run.
(gdb) q
```

演示next、step、bt、frame


```
(gdb) l 1
1       #include <stdio.h>
2
3       // 计算1到n的和
4       int calculate_sum(int n) {
5           int sum = 0;
6           int i = 1;
7           while (i <= n) {
8               sum += i;
9               i++;
10          }
(gdb) 
11          return sum;
12      }
13
14      int main() {
15          int num = 5;
16          int result = calculate_sum(num);
17          printf("1到%d的和为：%d\n", num, result);  
18          return 0;
19      }(gdb) b 15
Breakpoint 1 at 0x400563: file test.c, line 15.
(gdb) i b
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x0000000000400563 in main at test.c:15
(gdb) r
Starting program: /root/test 

Breakpoint 1, main () at test.c:15
15          int num = 5;
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64
(gdb) n
16          int result = calculate_sum(num);
(gdb) s
calculate_sum (n=5) at test.c:5
5           int sum = 0;
(gdb) n
6           int i = 1;
(gdb) n
7           while (i <= n) {
(gdb) n
8               sum += i;
(gdb) n
9               i++;
(gdb) p sum
$1 = 1
(gdb) p num
No symbol "num" in current context.
(gdb) p sum== 1
$2 = 1
(gdb) p sum ==0
$3 = 0
(gdb) bf
Undefined command: "bf".  Try "help".
(gdb) bt
#0  calculate_sum (n=5) at test.c:9
#1  0x0000000000400574 in main () at test.c:16
(gdb) f 1
#1  0x0000000000400574 in main () at test.c:16
16          int result = calculate_sum(num);
(gdb) p num
$4 = 5
(gdb) p sum
No symbol "sum" in current context.
(gdb) n
7           while (i <= n) {
(gdb) p sum
$5 = 1
(gdb) bt
#0  calculate_sum (n=5) at test.c:7
#1  0x0000000000400574 in main () at test.c:16
(gdb) f 1
#1  0x0000000000400574 in main () at test.c:16
16          int result = calculate_sum(num);
(gdb) n
8               sum += i;
(gdb) n
9               i++;
(gdb) p sum
$6 = 3
(gdb) b 17
Breakpoint 2 at 0x400577: file test.c, line 17.
(gdb) i b
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x0000000000400563 in main at test.c:15
        breakpoint already hit 1 time
2       breakpoint     keep y   0x0000000000400577 in main at test.c:17
(gdb) c
Continuing.

Breakpoint 2, main () at test.c:17
17          printf("1到%d的和为：%d\n", num, result);  
(gdb) p num
$7 = 5
(gdb) p result
$8 = 15
(gdb) c
Continuing.
1到5的和为：15
[Inferior 1 (process 16344) exited normally]
(gdb) q
```

`finish` 命令在进入函数时，完成函数然后退出

`return` 命令可带参数，在进入函数时，可直接退出

演示下return命令

```go
(gdb) b 15
Breakpoint 1 at 0x400563: file test.c, line 15.
(gdb) i b
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x0000000000400563 in main at test.c:15
(gdb) r
Starting program: /root/test 

Breakpoint 1, main () at test.c:15
15          int num = 5;
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64
(gdb) s
16          int result = calculate_sum(num);
(gdb) s
calculate_sum (n=5) at test.c:5
5           int sum = 0;
(gdb) s
6           int i = 1;
(gdb) n
7           while (i <= n) {
(gdb) n
8               sum += i;
(gdb) n
9               i++;
(gdb) n
7           while (i <= n) {
(gdb) n
8               sum += i;
(gdb) n
9               i++;
(gdb) return
Make calculate_sum return now? (y or n) y
#0  0x0000000000400574 in main () at test.c:16
16          int result = calculate_sum(num);
(gdb) p result
$1 = 0
(gdb) n
17          printf("1到%d的和为：%d\n", num, result);  
(gdb) p result
$2 = 2
(gdb) c
Continuing.
1到5的和为：2
[Inferior 1 (process 17355) exited normally]
```

演示下finish命令

```
(gdb) b 15
Breakpoint 1 at 0x400563: file test.c, line 15.
(gdb) r
Starting program: /root/test 

Breakpoint 1, main () at test.c:15
15          int num = 5;
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64
(gdb) n
16          int result = calculate_sum(num);
(gdb) s
calculate_sum (n=5) at test.c:5
5           int sum = 0;
(gdb) n
6           int i = 1;
(gdb) n
7           while (i <= n) {
(gdb) n
8               sum += i;
(gdb) n
9               i++;
(gdb) n
7           while (i <= n) {
(gdb) n
8               sum += i;
(gdb) finish 
Run till exit from #0  calculate_sum (n=5) at test.c:8
0x0000000000400574 in main () at test.c:16
16          int result = calculate_sum(num);
Value returned is $1 = 15
(gdb) p re
Display all 123 possibilities? (y or n)
(gdb) p result
$2 = 0
(gdb) n
17          printf("1到%d的和为：%d\n", num, result);  
(gdb) p result
$3 = 15
(gdb) c
Continuing.
1到5的和为：15
[Inferior 1 (process 17754) exited normally]
```

通过`b 行号 if 条件`设置条件断点，演示如下

```
(gdb) l 1
1       #include <stdio.h>
2
3       // 计算1到n的和
4       int calculate_sum(int n) {
5           int sum = 0;
6           int i = 1;
7           while (i <= n) {
8               sum += i;
9               i++;
10          }
(gdb) b 8 if sum > 5
Breakpoint 1 at 0x400544: file test.c, line 8.
(gdb) i b
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x0000000000400544 in calculate_sum at test.c:8
        stop only if sum > 5
(gdb) r
Starting program: /root/test 

Breakpoint 1, calculate_sum (n=5) at test.c:8
8               sum += i;
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64
(gdb) p sum
$1 = 6
(gdb) c
Continuing.

Breakpoint 1, calculate_sum (n=5) at test.c:8
8               sum += i;
(gdb) p sum
$2 = 10
(gdb) c
Continuing.
1到5的和为：15
[Inferior 1 (process 18140) exited normally]
```

`shell xxx` 可以在gdb中运行shell命令

`set logging on` 可以将gdb调试的信息输出到日志中

`set var xxx=xxx`可以设置变量的值，用于快速调试

演示如下


```
(gdb) set logging on
Copying output to gdb.txt.
(gdb) shell ls
gdb.txt  test  test.c
(gdb) l 0
1       #include <stdio.h>
2
3       // 计算1到n的和
4       int calculate_sum(int n) {
5           int sum = 0;
6           int i = 1;
7           while (i <= n) {
8               sum += i;
9               i++;
10          }
(gdb) b 8
Breakpoint 1 at 0x400544: file test.c, line 8.
(gdb) i b
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x0000000000400544 in calculate_sum at test.c:8
(gdb) r
Starting program: /root/test 

Breakpoint 1, calculate_sum (n=5) at test.c:8
8               sum += i;
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64
(gdb) n
9               i++;
(gdb) n
7           while (i <= n) {
(gdb) p sum
$1 = 1
(gdb) set var sum=100
(gdb) p sum
$2 = 100
(gdb) finish
Run till exit from #0  calculate_sum (n=5) at test.c:7

Breakpoint 1, calculate_sum (n=5) at test.c:8
8               sum += i;
(gdb) finish
Run till exit from #0  calculate_sum (n=5) at test.c:8

Breakpoint 1, calculate_sum (n=5) at test.c:8
8               sum += i;
(gdb) c
Continuing.

Breakpoint 1, calculate_sum (n=5) at test.c:8
8               sum += i;
(gdb) c
Continuing.

Breakpoint 1, calculate_sum (n=5) at test.c:8
8               sum += i;
(gdb) c
Continuing.
1到5的和为：114
[Inferior 1 (process 18358) exited normally]
(gdb) q
root@iZbp1cqyppyocyfsztmoftZ:~$ ls
gdb.txt  test  test.c
root@iZbp1cqyppyocyfsztmoftZ:~$ cat gdb.txt 
1       #include <stdio.h>
2
3       // 计算1到n的和
4       int calculate_sum(int n) {
5           int sum = 0;
6           int i = 1;
7           while (i <= n) {
8               sum += i;
9               i++;
10          }
Breakpoint 1 at 0x400544: file test.c, line 8.
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x0000000000400544 in calculate_sum at test.c:8
Starting program: /root/test 

Breakpoint 1, calculate_sum (n=5) at test.c:8
8               sum += i;
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64
9               i++;
7           while (i <= n) {
$1 = 1
$2 = 100
Run till exit from #0  calculate_sum (n=5) at test.c:7

Breakpoint 1, calculate_sum (n=5) at test.c:8
8               sum += i;
Run till exit from #0  calculate_sum (n=5) at test.c:8

Breakpoint 1, calculate_sum (n=5) at test.c:8
8               sum += i;
Continuing.

Breakpoint 1, calculate_sum (n=5) at test.c:8
8               sum += i;
Continuing.

Breakpoint 1, calculate_sum (n=5) at test.c:8
8               sum += i;
Continuing.
[Inferior 1 (process 18358) exited normally]
```

`watch var` 表示监控某个变量，当变量发生变化时会停在此处，当执行n时，如果碰到变量改变，则会输出old value和new value，如果执行c，则会在变量改变时停住，演示如下

```
(gdb) l 0
1       #include <stdio.h>
2
3       // 计算1到n的和
4       int calculate_sum(int n) {
5           int sum = 0;
6           int i = 1;
7           while (i <= n) {
8               sum += i;
9               i++;
10          }
(gdb) b 6
Breakpoint 1 at 0x40053b: file test.c, line 6.
(gdb) r
Starting program: /root/test 

Breakpoint 1, calculate_sum (n=5) at test.c:6
6           int i = 1;
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64
(gdb) p i
$1 = 0
(gdb) p *i
Cannot access memory at address 0x0
(gdb) p &i
$2 = (int *) 0x7fffffffe3f8
(gdb) watch i
Hardware watchpoint 2: i
(gdb) info w
Ambiguous info command "w": warranty, watchpoints, win.
(gdb) info watchpoints
Num     Type           Disp Enb Address            What
2       hw watchpoint  keep y                      i
(gdb) n
7           while (i <= n) {
(gdb) n
8               sum += i;
(gdb) n
9               i++;
(gdb) n
Hardware watchpoint 2: i

Old value = 0
New value = 2
calculate_sum (n=5) at test.c:7
7           while (i <= n) {
(gdb) n
8               sum += i;
(gdb) n
9               i++;
(gdb) n
Hardware watchpoint 2: i

Old value = 2
New value = 3
calculate_sum (n=5) at test.c:7
7           while (i <= n) {
(gdb) n
8               sum += i;
(gdb) c
Continuing.
Hardware watchpoint 2: i

Old value = 3
New value = 4
calculate_sum (n=5) at test.c:7
7           while (i <= n) {
(gdb) c
Continuing.
Hardware watchpoint 2: i

Old value = 4
New value = 5
calculate_sum (n=5) at test.c:7
7           while (i <= n) {
(gdb) c
Continuing.
Hardware watchpoint 2: i

Old value = 5
New value = 6
calculate_sum (n=5) at test.c:7
7           while (i <= n) {
(gdb) c
Continuing.

Watchpoint 2 deleted because the program has left the block in
which its expression is valid.
0x0000000000400574 in main () at test.c:16
16          int result = calculate_sum(num);
(gdb) c
Continuing.
1到5的和为：15
[Inferior 1 (process 19421) exited normally]
```

`x/FMT ADDRESS` （如x/10xw 0x123456查看从 0x123456 开始的 10 个 4 字节值，以十六进制显示）


## 调试正在运行的程序

假设代码为

```c
#include <stdio.h>

void func() {
    int i = 0;
    for (; i < 100; i++) {
        sleep(1);
    }
}

int main() {
    func();
    return 0;
}
```

执行该程序

通过查看该进程号来用gdb调试，注意gdb调试时，程序会停止，执行continue会持续执行，直到ctrl+c，再执行continue时继续执行，执行next会单步执行，退出gdb后程序会继续执行

```
root@iZbp1cqyppyocyfsztmoftZ:~$ ps -ef | grep test
root     21402 21346  0 00:07 pts/0    00:00:00 ./test
root     21465 21380  0 00:08 pts/1    00:00:00 grep --color=auto test
root@iZbp1cqyppyocyfsztmoftZ:~$ gdb -p 21402
GNU gdb (GDB) Red Hat Enterprise Linux 7.6.1-120.el7
Copyright (C) 2013 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
and "show warranty" for details.
This GDB was configured as "x86_64-redhat-linux-gnu".
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
Attaching to process 21402
Reading symbols from /root/test...done.
Reading symbols from /lib64/libc.so.6...(no debugging symbols found)...done.
Loaded symbols for /lib64/libc.so.6
Reading symbols from /lib64/ld-linux-x86-64.so.2...(no debugging symbols found)...done.
Loaded symbols for /lib64/ld-linux-x86-64.so.2
0x00007f5e577609e0 in __nanosleep_nocancel () from /lib64/libc.so.6
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64
(gdb) bf
Undefined command: "bf".  Try "help".
(gdb) bt
#0  0x00007f5e577609e0 in __nanosleep_nocancel () from /lib64/libc.so.6
#1  0x00007f5e57760894 in sleep () from /lib64/libc.so.6
#2  0x000000000040059d in func () at test.c:6
#3  0x00000000004005cb in main () at test.c:12
(gdb) p i
No symbol "i" in current context.
(gdb) f 2
#2  0x000000000040059d in func () at test.c:6
6               sleep(1);
(gdb) p i
$1 = 21
(gdb) c
Continuing.
q 
^C
Program received signal SIGINT, Interrupt.
0x00007f5e577609e0 in __nanosleep_nocancel () from /lib64/libc.so.6
(gdb) c
Continuing.
^C
Program received signal SIGINT, Interrupt.
0x00007f5e577609e0 in __nanosleep_nocancel () from /lib64/libc.so.6
```


## 调试corefile


使用`ulimit -a`查看`core file size`是否为0，如果为0，不能生成corefile，需要`ulimit -c unlimited` (临时生效，重启后需重新设置)


当程序core时，会生成core.xxx文件，xxx为进程号


接下来用几个出错的C++例子说明gdb调试corefile的过程

centos 安装g++

`yum install gcc-c++`

执行可执行文件时，会出现 `xxx (core dumped)`


使用 `gdb program core.xxx` 来调试corefile



### 空指针解引用

SIGSEGV 段错误

```cpp
#include <iostream>
using namespace std;

int main() {
    int* p = nullptr; // 空指针，未指向任何有效内存
    *p = 10; // 错误：解引用空指针，触发coredump
    return 0;
}
```

```
Core was generated by `./test'.
Program terminated with signal 11, Segmentation fault.
#0  0x000000000040065d in main () at test.cpp:6
6           *p = 10; // 错误：解引用空指针，触发coredump
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64 libgcc-4.8.5-44.el7.x86_64 libstdc++-4.8.5-44.el7.x86_64
(gdb) bt
#0  0x000000000040065d in main () at test.cpp:6
(gdb) f 0
#0  0x000000000040065d in main () at test.cpp:6
6           *p = 10; // 错误：解引用空指针，触发coredump
(gdb) p p
$1 = (int *) 0x0
(gdb) p &p
$2 = (int **) 0x7ffc0f05bf28
(gdb) p *p
Cannot access memory at address 0x0
```

### 野指针解引用

SIGSEGV 段错误（未定义行为，可能正常运行）

如果正常运行说明，内存已释放，但未被os回收

```cpp
#include <iostream>
using namespace std;

int main() {
    int* p = new int(5); 
    delete p; // 释放内存后，p变为野指针（指向“无效内存”）
    *p = 20; // 错误：访问已释放的内存，触发coredump
    return 0;
}
```

可以看出虽然delete了，但是20被正常写入，但是不要做这种危险的行为

```
(gdb) start
Temporary breakpoint 1 at 0x4006e5: file test.cpp, line 5.
Starting program: /root/test_core/test 

Temporary breakpoint 1, main () at test.cpp:5
5           int* p = new int(5); 
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64 libgcc-4.8.5-44.el7.x86_64 libstdc++-4.8.5-44.el7.x86_64
(gdb) n
6           delete p; // 释放内存后，p变为野指针（指向“无效内存”）
(gdb) n
7           *p = 20; // 错误：访问已释放的内存，触发coredump
(gdb) n
8           return 0;
(gdb) p p
$1 = (int *) 0x602010
(gdb) x/4xw p
0x602010:       0x00000014      0x00000000      0x00000000      0x00000000
```


### 数组越界

SIGSEGV 段错误（未定义行为，可能正常运行）

如果正常运行说明，越界的内存仍是该进程的，不会占用到别的进程去

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[3] = {1,2,3}; // 数组下标合法范围：0~2
    arr[10] = 100; // 错误：下标10超出范围，访问非法内存
    return 0;
}
```

### 栈溢出

```cpp
#include <iostream>
using namespace std;

// 无终止条件的递归：每次调用都会在栈上创建新栈帧
void infinite_recursion() {
    infinite_recursion(); 
}

int main() {
    infinite_recursion(); 
    // 另一种场景：局部数组过大（栈默认大小通常几MB）
    // char huge_arr[1024*1024*10]; // 10MB数组，直接撑满栈
    return 0;
}
```


使用`bt`发现调用栈过多


### 非法修改只读内存

```cpp
#include <iostream>
using namespace std;

int main() {
    // 字符串常量"hello"存储在只读数据区，指针str指向该区域
    char* str = "hello"; 
    str[0] = 'H'; // 错误：修改只读内存，触发coredump
    return 0;
}
```

```
Core was generated by `./test'.
Program terminated with signal 11, Segmentation fault.
#0  0x000000000040065d in main () at test.cpp:6
6           str[0] = 'H'; // 错误：修改只读内存，触发coredump
```


### 断言失败

SIGABRT

```cpp
#include <cassert>
#include <iostream>
using namespace std;

int main() {
    int age = -5;
    // 断言“age为正数”，若条件不满足则触发abort()
    assert(age > 0 && "Age must be positive"); 
    return 0;
}
```


执行程序时，产生`test: test.cpp:7: int main(): Assertion age > 0 && "Age must be positive"failed.Aborted (core dumped)`


```
Core was generated by `./test'.
Program terminated with signal 6, Aborted.
#0  0x00007fb265c32387 in raise () from /lib64/libc.so.6
Missing separate debuginfos, use: debuginfo-install glibc-2.17-326.el7_9.3.x86_64 libgcc-4.8.5-44.el7.x86_64 libstdc++-4.8.5-44.el7.x86_64
(gdb) bt
#0  0x00007fb265c32387 in raise () from /lib64/libc.so.6
#1  0x00007fb265c33a78 in abort () from /lib64/libc.so.6
#2  0x00007fb265c2b1a6 in __assert_fail_base () from /lib64/libc.so.6
#3  0x00007fb265c2b252 in __assert_fail () from /lib64/libc.so.6
#4  0x00000000004006cb in main () at test.cpp:7
(gdb) f 4
#4  0x00000000004006cb in main () at test.cpp:7
7           assert(age > 0 && "Age must be positive"); 
(gdb) p age
$1 = -5
```





### 除零错误

SIGFPE


```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int b = 0;
    int result = a / b; // 错误：整数除零，触发coredump
    cout << result << endl;
    return 0;
}
```

执行该程序，会出现 `Floating point exception (core dumped)`


```
Core was generated by `./test'.
Program terminated with signal 8, Arithmetic exception.
#0  0x00000000004007c7 in main () at test.cpp:7
7           int result = a / b; // 错误：整数除零，触发coredump
```

## 调试多线程程序

to be continued

## 调试多进程程序

to be continued



## 参考

https://www.cnblogs.com/xvic/p/15997498.html
