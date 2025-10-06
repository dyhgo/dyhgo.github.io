# 使用ASAN和Valgrind调试C++内存问题



以下针对C++中常见的内存问题，使用Address Sanitizer和Valgrind进行调试

Linux环境 CentOS 7.9



## Valgrind安装

```
yum install valgrind
valgrind --version
```

## ASAN安装

```
yum install libasan
```

## Valgrind的使用

valgrind是一套工具集，最常用的工具是memcheck

先编译，带`-g`，然后运行

`valgrind [选项] 可执行程序 [程序参数]`，比如`valgrind --leak-check=yes ./your_program`

常用的选项有

 - --leak-check=yes：启用内存泄漏检测
 - --leak-check=full：显示更详细的内存泄漏信息
 - --show-leak-kinds=all：显示所有类型的内存泄漏
 - --track-origins=yes：跟踪未初始化内存的来源
 - --vgdb=yes：启用调试模式，可配合 gdb 使用

假设C代码为

```c
#include <stdlib.h>

// 有内存泄漏的函数
void leak_memory() {
    int *ptr = malloc(10 * sizeof(int)); // 分配内存但未释放
    ptr[0] = 42; // 使用内存
    // 没有free(ptr)，导致内存泄漏
}

// 正常的内存分配和释放
void normal_memory() {
    int *ptr = malloc(5 * sizeof(int));
    if (ptr != NULL) {
        ptr[0] = 100;
        free(ptr); // 正确释放内存
    }
}

int main() {
    leak_memory();
    normal_memory();
    return 0;
}
```


编译它 `gcc test.c -o test -g`，运行`valgrind --leak-check=full ./test` **（注意此处不能写test，要写./test，让它实际运行起来）**

输出的结果为

```
==5322== Memcheck, a memory error detector
==5322== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==5322== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==5322== Command: ./test
==5322== 
==5322== 
==5322== HEAP SUMMARY:
==5322==     in use at exit: 40 bytes in 1 blocks
==5322==   total heap usage: 2 allocs, 1 frees, 60 bytes allocated
==5322== 
==5322== 40 bytes in 1 blocks are definitely lost in loss record 1 of 1
==5322==    at 0x4C29F73: malloc (vg_replace_malloc.c:309)
==5322==    by 0x40058E: leak_memory (test.c:5)
==5322==    by 0x4005E1: main (test.c:20)
==5322== 
==5322== LEAK SUMMARY:
==5322==    definitely lost: 40 bytes in 1 blocks
==5322==    indirectly lost: 0 bytes in 0 blocks
==5322==      possibly lost: 0 bytes in 0 blocks
==5322==    still reachable: 0 bytes in 0 blocks
==5322==         suppressed: 0 bytes in 0 blocks
==5322== 
==5322== For lists of detected and suppressed errors, rerun with: -s
==5322== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```

信息解读

 - HEAP SUMMARY：显示堆内存使用概况，这里显示有 40 字节未释放，总共分配2次，一共分配60字节
 - definitely lost：确定的内存泄漏，40 字节，位于leak_memory函数的第 5 行
 - LEAK SUMMARY：汇总各类内存泄漏情况


内存泄露类型

 - definitely lost：确定的内存泄漏，必须修复
 - indirectly lost：间接泄漏，通常是由于指向它的指针被泄漏导致
 - possibly lost：可能的泄漏，需要进一步检查
 - still reachable：仍然可访问的内存，通常不需要修复


当修复上述代码后，使用Valgrind检测结果为

```
==5428== Memcheck, a memory error detector
==5428== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==5428== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==5428== Command: ./test
==5428== 
==5428== 
==5428== HEAP SUMMARY:
==5428==     in use at exit: 0 bytes in 0 blocks
==5428==   total heap usage: 2 allocs, 2 frees, 60 bytes allocated
==5428== 
==5428== All heap blocks were freed -- no leaks are possible
==5428== 
==5428== For lists of detected and suppressed errors, rerun with: -s
==5428== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

## ASAN的使用

注意ASAN在检测不到内存问题时，无输出


在编译时添加flag

```
# GCC或Clang通用
-fsanitize=address  # 启用AddressSanitizer
-g                  # 保留调试信息（用于定位错误位置）
-fno-omit-frame-pointer  # 优化栈跟踪显示（可选，推荐添加）
```

比如

```
# 编译多个文件（链接时也需要添加ASan标志）
g++ -fsanitize=address -g -fno-omit-frame-pointer -o app file1.cpp file2.cpp
```

然后直接运行可执行文件即可

```
./app
```

比如有如下C代码


```c
#include <stdlib.h>

// 有内存泄漏的函数
void leak_memory() {
    int *ptr = malloc(10 * sizeof(int)); // 分配内存但未释放
    ptr[0] = 42; // 使用内存
    // 没有free(ptr)，导致内存泄漏
}

// 正常的内存分配和释放
void normal_memory() {
    int *ptr = malloc(5 * sizeof(int));
    if (ptr != NULL) {
        ptr[0] = 100;
        free(ptr); // 正确释放内存
    }
}

int main() {
    leak_memory();
    normal_memory();
    return 0;
}
```

编译并执行它 `gcc -fsanitize=address -g -fno-omit-frame-pointer -o test test.c && ./test`

ASAN无法检测出错误

比如如下代码

```c
#include <stdlib.h>

int main() {
    int *ptr = (int*)malloc(4);
    int *pp = (int*)malloc(4);
    free(ptr);       
    free(pp);
    *ptr = 10;
    *pp = 20;       
    return 0;
}
```


因为asan在检测到内存泄漏后就会停止，如果要检测出所有的内存错误，可以通过设置 ASAN_OPTIONS 环境变量中的 halt_on_error=0 选项实现

`export ASAN_OPTIONS="halt_on_error=0:detect_leaks=1"`

但是程序一旦遇到内存错误，就是不稳定的，后续检测出的内存错误可能是之前引起的，所以一般只检测最先出现的内存错误

执行./test，输出

```
=================================================================
==7806== ERROR: AddressSanitizer: heap-use-after-free on address 0x60040000dff0 at pc 0x400770 bp 0x7fff72479600 sp 0x7fff724795f0
WRITE of size 4 at 0x60040000dff0 thread T0
    #0 0x40076f (/root/test+0x40076f)
    #1 0x7f6356c2c554 (/usr/lib64/libc-2.17.so+0x22554)
    #2 0x400638 (/root/test+0x400638)
0x60040000dff0 is located 0 bytes inside of 4-byte region [0x60040000dff0,0x60040000dff4)
freed by thread T0 here:
    #0 0x7f6356fedff9 (/usr/lib64/libasan.so.0.0.0+0x15ff9)
    #1 0x40072c (/root/test+0x40072c)
    #2 0x7f6356c2c554 (/usr/lib64/libc-2.17.so+0x22554)
previously allocated by thread T0 here:
    #0 0x7f6356fee119 (/usr/lib64/libasan.so.0.0.0+0x16119)
    #1 0x40070e (/root/test+0x40070e)
    #2 0x7f6356c2c554 (/usr/lib64/libc-2.17.so+0x22554)
Shadow bytes around the buggy address:
  0x0c00ffff9ba0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9bb0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9bc0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9bd0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9be0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
=>0x0c00ffff9bf0: fa fa fa fa fa fa fa fa fa fa fd fa fa fa[fd]fa
  0x0c00ffff9c00: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9c10: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9c20: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9c30: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9c40: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:     fa
  Heap righ redzone:     fb
  Freed Heap region:     fd
  Stack left redzone:    f1
  Stack mid redzone:     f2
  Stack right redzone:   f3
  Stack partial redzone: f4
  Stack after return:    f5
  Stack use after scope: f8
  Global redzone:        f9
  Global init order:     f6
  Poisoned by user:      f7
  ASan internal:         fe
==7806== ABORTING
```

其中`heap-use-after-free`，表明内存错误类型

`WRITE of size 4 at 0x60040000dff0` 表示写4字节

`freed by thread T0 here` 表示在此处被释放


`previously allocated by thread T0 here` 表示在此处分配内存

`at pc 0x400770` 表示在此地址产生错误

通过`addr2line -e test 0x400770` 可以查看地址对应的代码位置，输出为

```
root@iZbp1cqyppyocyfsztmoftZ:~$ addr2line -e test 0x400770
/root/test.c:8
```







## 两者对比

| 特性 | ASan | Valgrind (memcheck)|
|--|--|--|
| 速度 | 快（2-3 倍慢于原始程序） |慢（10-50 倍慢于原始程序） |
| 内存开销 | 大（2-3 倍内存使用） | 更大（5-10 倍内存使用）|
| 检测范围 |支持更多内存错误（如溢出）  | 支持内存泄漏和部分错误|
| 使用方式 | 编译时插入检测代码 |运行时拦截内存操作 |
| 适合场景 |开发阶段快速检测  |发布前全面检测 |


## 内存泄露

```cpp
void func() {
    int* p = new int[100]; // 堆上分配100个int的数组
    p[0] = 10; // 使用内存
    // 错误：未执行delete[] p; 函数结束后p销毁，但堆内存未释放
}
```

### ASAN调试结果

无信息输出

### Valgrind调试结果


```
==8327== Memcheck, a memory error detector
==8327== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8327== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==8327== Command: ./test
==8327== 
==8327== 
==8327== HEAP SUMMARY:
==8327==     in use at exit: 400 bytes in 1 blocks
==8327==   total heap usage: 1 allocs, 0 frees, 400 bytes allocated
==8327== 
==8327== 400 bytes in 1 blocks are definitely lost in loss record 1 of 1
==8327==    at 0x4C2AC38: operator new[](unsigned long) (vg_replace_malloc.c:433)
==8327==    by 0x40069E: func() (test.cpp:6)
==8327==    by 0x4006B7: main (test.cpp:13)
==8327== 
==8327== LEAK SUMMARY:
==8327==    definitely lost: 400 bytes in 1 blocks
==8327==    indirectly lost: 0 bytes in 0 blocks
==8327==      possibly lost: 0 bytes in 0 blocks
==8327==    still reachable: 0 bytes in 0 blocks
==8327==         suppressed: 0 bytes in 0 blocks
==8327== 
==8327== For lists of detected and suppressed errors, rerun with: -s
==8327== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```


## 访问野指针

```cpp
void func() {
    int* p = new int(5); 
    delete p; // 释放p指向的内存，但p本身未置空
    // 错误：p已成野指针，再访问其指向的内存（此时为“垃圾内存”）
    *p = 10; // 行为未定义：可能崩溃、修改其他变量数据
}
```

### ASAN调试结果



```
root@iZbp1cqyppyocyfsztmoftZ:~$ ./test 
=================================================================
==9244== ERROR: AddressSanitizer: heap-use-after-free on address 0x60040000dff0 at pc 0x400993 bp 0x7ffcfec78040 sp 0x7ffcfec78030
WRITE of size 4 at 0x60040000dff0 thread T0
    #0 0x400992 (/root/test+0x400992)
    #1 0x4009a7 (/root/test+0x4009a7)
    #2 0x7f958947e554 (/usr/lib64/libc-2.17.so+0x22554)
    #3 0x400838 (/root/test+0x400838)
0x60040000dff0 is located 0 bytes inside of 4-byte region [0x60040000dff0,0x60040000dff4)
freed by thread T0 here:
    #0 0x7f958a05c379 (/usr/lib64/libasan.so.0.0.0+0x12379)
    #1 0x40095b (/root/test+0x40095b)
    #2 0x4009a7 (/root/test+0x4009a7)
    #3 0x7f958947e554 (/usr/lib64/libc-2.17.so+0x22554)
previously allocated by thread T0 here:
    #0 0x7f958a05c139 (/usr/lib64/libasan.so.0.0.0+0x12139)
    #1 0x40090e (/root/test+0x40090e)
    #2 0x4009a7 (/root/test+0x4009a7)
    #3 0x7f958947e554 (/usr/lib64/libc-2.17.so+0x22554)
Shadow bytes around the buggy address:
  0x0c00ffff9ba0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9bb0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9bc0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9bd0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9be0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
=>0x0c00ffff9bf0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa[fd]fa
  0x0c00ffff9c00: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9c10: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9c20: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9c30: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c00ffff9c40: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:     fa
  Heap righ redzone:     fb
  Freed Heap region:     fd
  Stack left redzone:    f1
  Stack mid redzone:     f2
  Stack right redzone:   f3
  Stack partial redzone: f4
  Stack after return:    f5
  Stack use after scope: f8
  Global redzone:        f9
  Global init order:     f6
  Poisoned by user:      f7
  ASan internal:         fe
==9244== ABORTING
root@iZbp1cqyppyocyfsztmoftZ:~$ addr2line -e test 0x400993
/root/test.cpp:9
```


### Valgrind调试结果

```
==9173== Memcheck, a memory error detector
==9173== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==9173== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==9173== Command: ./test
==9173== 
==9173== Invalid write of size 4
==9173==    at 0x400709: func() (test.cpp:9)
==9173==    by 0x400719: main (test.cpp:15)
==9173==  Address 0x5a25040 is 0 bytes inside a block of size 4 free'd
==9173==    at 0x4C2B51D: operator delete(void*) (vg_replace_malloc.c:586)
==9173==    by 0x400704: func() (test.cpp:7)
==9173==    by 0x400719: main (test.cpp:15)
==9173==  Block was alloc'd at
==9173==    at 0x4C2A593: operator new(unsigned long) (vg_replace_malloc.c:344)
==9173==    by 0x4006EE: func() (test.cpp:6)
==9173==    by 0x400719: main (test.cpp:15)
==9173== 
==9173== 
==9173== HEAP SUMMARY:
==9173==     in use at exit: 0 bytes in 0 blocks
==9173==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==9173== 
==9173== All heap blocks were freed -- no leaks are possible
==9173== 
==9173== For lists of detected and suppressed errors, rerun with: -s
==9173== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```


		
## 数组越界

```cpp
void func() {
    int arr[5] = {1,2,3,4,5}; // 数组下标范围0-4
    // 错误：下标5超出数组边界，访问了数组后面的“无关内存”
    arr[5] = 6; 
    // 更隐蔽的情况：动态数组越界
    int* p = new int[7];
    p[10] = 20; // 同样越界，破坏堆内存结构 可能导致delete失效
}
```

### ASAN调试结果


只显示出最开始的数组越界的错误


```
=================================================================
==9998== ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffb7660554 at pc 0x400a79 bp 0x7fffb7660500 sp 0x7fffb76604f0
WRITE of size 4 at 0x7fffb7660554 thread T0
    #0 0x400a78 (/root/test+0x400a78)
    #1 0x400af0 (/root/test+0x400af0)
    #2 0x7fb9d1fd3554 (/usr/lib64/libc-2.17.so+0x22554)
    #3 0x4007f8 (/root/test+0x4007f8)
Address 0x7fffb7660554 is located at offset 52 in frame <func> of T0's stack:
  This frame has 1 object(s):
    [32, 52) 'arr'
HINT: this may be a false positive if your program uses some custom stack unwind mechanism or swapcontext
      (longjmp and C++ exceptions *are* supported)
Shadow bytes around the buggy address:
  0x100076ec4050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100076ec4060: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100076ec4070: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100076ec4080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100076ec4090: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100076ec40a0: 00 00 00 00 f1 f1 f1 f1 00 00[04]f4 f3 f3 f3 f3
  0x100076ec40b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100076ec40c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100076ec40d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100076ec40e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100076ec40f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:     fa
  Heap righ redzone:     fb
  Freed Heap region:     fd
  Stack left redzone:    f1
  Stack mid redzone:     f2
  Stack right redzone:   f3
  Stack partial redzone: f4
  Stack after return:    f5
  Stack use after scope: f8
  Global redzone:        f9
  Global init order:     f6
  Poisoned by user:      f7
  ASan internal:         fe
==9998== ABORTING
root@iZbp1cqyppyocyfsztmoftZ:~$ addr2line -e test 0x7fffb7660554
??:0
root@iZbp1cqyppyocyfsztmoftZ:~$ addr2line -e test 0x400a79
/root/test.cpp:9
```



### Valgrind调试结果

代码中有2个错误，前面是数组越界，后面是数组越界+内存泄露

从valgrind可以看出只显示出第二个错误

在最后2 errors from 2 contexts表明一共存在两个错误，都属于后面那个大错误


```
==9890== Memcheck, a memory error detector
==9890== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==9890== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==9890== Command: ./test
==9890== 
==9890== Invalid write of size 4
==9890==    at 0x4006D5: func() (test.cpp:12)
==9890==    by 0x4006E5: main (test.cpp:18)
==9890==  Address 0x5a25068 is 12 bytes after a block of size 28 alloc'd
==9890==    at 0x4C2AC38: operator new[](unsigned long) (vg_replace_malloc.c:433)
==9890==    by 0x4006C8: func() (test.cpp:11)
==9890==    by 0x4006E5: main (test.cpp:18)
==9890== 
==9890== 
==9890== HEAP SUMMARY:
==9890==     in use at exit: 28 bytes in 1 blocks
==9890==   total heap usage: 1 allocs, 0 frees, 28 bytes allocated
==9890== 
==9890== 28 bytes in 1 blocks are definitely lost in loss record 1 of 1
==9890==    at 0x4C2AC38: operator new[](unsigned long) (vg_replace_malloc.c:433)
==9890==    by 0x4006C8: func() (test.cpp:11)
==9890==    by 0x4006E5: main (test.cpp:18)
==9890== 
==9890== LEAK SUMMARY:
==9890==    definitely lost: 28 bytes in 1 blocks
==9890==    indirectly lost: 0 bytes in 0 blocks
==9890==      possibly lost: 0 bytes in 0 blocks
==9890==    still reachable: 0 bytes in 0 blocks
==9890==         suppressed: 0 bytes in 0 blocks
==9890== 
==9890== For lists of detected and suppressed errors, rerun with: -s
==9890== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
		
## 重复释放

```cpp
void func() {
    int* p = new int(10);
    delete p; // 第一次释放，p指向的内存已回收
    // 错误：再次释放同一块内存
    delete p; 
}
```

### ASAN调试结果

```
root@iZbp1cqyppyocyfsztmoftZ:~$ ./test 
=================================================================
==10180== ERROR: AddressSanitizer: attempting double-free on 0x60040000dff0:
    #0 0x7f7524f6b379 (/usr/lib64/libasan.so.0.0.0+0x12379)
    #1 0x400967 (/root/test+0x400967)
    #2 0x400972 (/root/test+0x400972)
    #3 0x7f752438d554 (/usr/lib64/libc-2.17.so+0x22554)
0x60040000dff0 is located 0 bytes inside of 4-byte region [0x60040000dff0,0x60040000dff4)
freed by thread T0 here:
    #0 0x7f7524f6b379 (/usr/lib64/libasan.so.0.0.0+0x12379)
    #1 0x40095b (/root/test+0x40095b)
    #2 0x400972 (/root/test+0x400972)
    #3 0x7f752438d554 (/usr/lib64/libc-2.17.so+0x22554)
previously allocated by thread T0 here:
    #0 0x7f7524f6b139 (/usr/lib64/libasan.so.0.0.0+0x12139)
    #1 0x40090e (/root/test+0x40090e)
    #2 0x400972 (/root/test+0x400972)
    #3 0x7f752438d554 (/usr/lib64/libc-2.17.so+0x22554)
==10180== ABORTING
root@iZbp1cqyppyocyfsztmoftZ:~$ addr2line -e test 0x60040000dff0
??:0
root@iZbp1cqyppyocyfsztmoftZ:~$ addr2line -e test 0x400967
/root/test.cpp:9
root@iZbp1cqyppyocyfsztmoftZ:~$ addr2line -e test 0x400972
/root/test.cpp:14
root@iZbp1cqyppyocyfsztmoftZ:~$ addr2line -e test 0x40095b
/root/test.cpp:7
root@iZbp1cqyppyocyfsztmoftZ:~$ addr2line -e test 0x40090e
/root/test.cpp:6
```



### Valgrind调试结果

```
==10122== Memcheck, a memory error detector
==10122== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==10122== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==10122== Command: ./test
==10122== 
==10122== Invalid free() / delete / delete[] / realloc()
==10122==    at 0x4C2B51D: operator delete(void*) (vg_replace_malloc.c:586)
==10122==    by 0x400710: func() (test.cpp:9)
==10122==    by 0x40071B: main (test.cpp:14)
==10122==  Address 0x5a25040 is 0 bytes inside a block of size 4 free'd
==10122==    at 0x4C2B51D: operator delete(void*) (vg_replace_malloc.c:586)
==10122==    by 0x400704: func() (test.cpp:7)
==10122==    by 0x40071B: main (test.cpp:14)
==10122==  Block was alloc'd at
==10122==    at 0x4C2A593: operator new(unsigned long) (vg_replace_malloc.c:344)
==10122==    by 0x4006EE: func() (test.cpp:6)
==10122==    by 0x40071B: main (test.cpp:14)
==10122== 
==10122== 
==10122== HEAP SUMMARY:
==10122==     in use at exit: 0 bytes in 0 blocks
==10122==   total heap usage: 1 allocs, 2 frees, 4 bytes allocated
==10122== 
==10122== All heap blocks were freed -- no leaks are possible
==10122== 
==10122== For lists of detected and suppressed errors, rerun with: -s
==10122== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```

## 参考

https://zhuanlan.zhihu.com/p/703368720

## 使用心得

结合使用，各有优劣
