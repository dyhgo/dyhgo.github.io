# 今天你也要来点cmake吗




## 前言

很早就想写cmake，但是一直懒得写

 今天也随便写点cmake

官方对cmake的解释

`CMake is an open-source, cross-platform family of tools designed to build, test and package software. CMake is used to control the software compilation process using simple platform and compiler independent configuration files, and generate native makefiles and workspaces that can be used in the compiler environment of your choice. The suite of CMake tools were created by Kitware in response to the need for a powerful, cross-platform build environment for open-source projects such as ITK and VTK.`

按我的理解，cmake就是工程构建工具（多用于c++）

## 实践

### 预备 

以一道题目来介绍cmake最基本的用法，这个例子不会用到任何ide，实际上用ide应该更好

实验环境 ubuntu 16.04 LTS

cmake的安装见[此处](https://dyhgo.fun/install-ubuntu-in-vmware/#%E5%AE%89%E8%A3%85cmake)

题目如下，由于题意不清，仅供参考，实际的构建和题目有点差别

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201008210239860.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)

这个实验分成两部分，编写共享库并安装，使用库和头文件

### 编写共享库并安装

编写静态库的操作和它差不多

首先建立`tt`文件夹，作为工程的总文件夹

在`tt`文件夹下建立`build`文件夹作为存放外部编译的中间文件，`lib`文件夹存放生成的库，`CMakeLists.txt`（按我的理解，这个文件就像cpu里的控制器，MakeFile文件夹之于CMakeLists.txt就像低级语言之于高级语言），`src` 文件夹放置该工程的源代码

文章最后有文件结构，看得更直观


#### tt/CMakeLists.txt

`tt`文件夹下的`CMakeLists.txt`

```
cmake_minimum_required(VERSION 3.5)
project(sayHello)
add_subdirectory(lib)
add_subdirectory(src)
```

解释一下，`cmake_minimum_required` 声明版本，不加构建的时候会报不是很严重的错

`project` 声明该工程的名字  `add_subdirectory` 关联子目录

如果是`add_subdirectory(aaa bbb)` 就是当外部编译时本该在`build/aaa`下生成的目标二进制文件，现在生成到了`build/bbb`下


#### tt/lib

`lib`文件夹放三个文件，与库有关

`hello.c`

```c
#include "hello.h"
#include <stdio.h>
void sayHello(){printf("hello slam\n");}
```

`hello.h`

```c
#pragma once
void sayHello();
```

`CMakeLists.txt`  （为了追踪，这几乎每个文件夹都有）

```
add_library(hello SHARED hello.c)
set(CMAKE_INSTALL_PREFIX /usr/local)
install(TARGETS hello LIBRARY DESTINATION lib)
install(FILES hello.h DESTINATION include)
```

解释一下 `add_library(hello SHARED hello.c)`   第一个参数指库的名字，如果是`hello`，库的名字会自动变成`libhello`  第二个参数指代库的类型（共享库（动态库），静态库） ，分别对应 `SHARED` `STATIC` ，如果是动态库则生成 `libhello.so` 如果是静态库，则生成 `libhello.a` ，第三个参数是库的源代码

 `set(CMAKE_INSTALL_PREFIX /usr/local)`  `CMAKE_INSTALL_PREFIX`这是一个cmake变量，安装时路径是`<prefix>/<custom>`

`install(TARGETS hello LIBRARY DESTINATION lib)` 安装路径，第一个参数是静态库、动态库、目标二进制专用，hello指代库的名称（add_library时已指定），最后一个参数就是自定义相对路径，所以它会被装在`/usr/local/lib` 下


`install(FILES hello.h DESTINATION include)` 第一个参数表明待安装的是文件，它将被装在 `/usr/local/include` 下


#### 构建

在`build`文件夹下

```bash
sudo cmake ..
sudo make
sudo make install
```

解释一下，这是cmake的最常用、最基本的命令， `..`表示用上一级的`CMakeLists.txt` 

`install`是安装命令，构建之后，会在`build`文件夹下生成与`tt`文件夹下类似的文件（注意这句话）

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020100821530768.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)


(忽略tt前面的前缀）

可以看到库和头文件已经按照题目要求成功安装（安装的目的在于可以使用）

### 使用库
#### tt/src
在`src`文件夹编写要使用库的源代码

`useHello.c`  （注意`hello.h`要用双引号，不能用尖括号）

```c
#include "hello.h"
int main(int argc, char** argv){sayHello();}
```

`CMakeLists.txt`

```
add_executable(sayHello useHello.c)
include_directories(/usr/local/include)
link_directories(/usr/local/lib)
target_link_libraries(sayHello hello)
```

解释一下，`add_executable(sayHello useHello.c)` 第一个参数是程序名（自定义），第二个参数是程序源文件，这条指令的作用就是它的名字所描述的

`include_directories(/usr/local/include)`  注意，这条语句并不是包含了哪些目录的库（这么理解似乎也没什么问题），而是在包含库之后，它应该在哪个路径下搜索，由于`hello.h`是相对路径，如果装在`/usr/include`就没事了，因为它是默认的搜索路径，但是现在装在了 `/usr/local/include` 所以就要增加搜索路径（导向作用）


`link_directories(/usr/local/lib)`  这条语句和上一条是相似的，我一直觉得它写成 `library_directories` 应该更好理解（其实没有这条指令，又想到include是动词，link也是动词就没事了），所以这条命令就是增加库的搜索路径（是的，不仅要搜索头文件，还要搜索库，因为头文件里什么也没有，只有一堆函数的空壳，实际的内容在源文件里(hello.c)，它和头文件一起生成了 libhello.so)，这也就是为什么有下一条指令的原因

`target_link_libraries(sayHello hello)`  用来连接目标二进制和库，至于为什么是 `sayHello` ，第一条指令已经给出

在`build`文件夹下构建，看到`build`文件夹下也有个 `src`文件夹，正如之前 `build`文件夹下有了`lib`一样

运行`tt/build/src/sayHello`  可以看到终端输出 `hello world` ，表明使用库成功

## 文件结构
```
tt ---------------------------
 |
 |  build  -------------------
          |     。。。
          |     。。。
          
    lib ----------------------
          |   hello.c
          |   hello.h
          |   CMakeLists.txt
          
    src -----------------------
          |   useHello.c
          |   CMakeLists.txt
          
    CMakeLists.txt ------------
      

```
cmake好难，还有很多想写。。。下次一定








