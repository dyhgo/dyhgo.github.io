# Learning CPP








{{< admonition abstract "Introduction" false >}}
学习一下c++

[教程视频地址](https://www.bilibili.com/video/BV1qh411p7Sa)，搬运自youtube

个人认为是一个非常不错的c++教程

空着的待补
{{< /admonition >}}





## How C++ works

pre-process


compile

link


## Variables

## Functions


## Header Files



当我们需要在cpp文件中用别的cpp的函数，需要先声明（declaration）

{{< admonition quote "声明函数" false >}}

main.cpp
```cpp
// main.cpp
#include <iostream>

void log(const char* msg) {
    std::cout << msg << std::endl;
}

int main() {
    log("hello world");
    return 0;
}
```

log.cpp
```cpp
// log.cpp
void log(const char* msg);

void initLog() {
    log("hello world");
}
```

{{< /admonition >}}



使用头文件的基本例子



{{< admonition quote "使用头文件" false >}}

main.cpp
```cpp
// main.cpp
#include <iostream>
#include "log.h"

int main() {
    initLog();
    log("hello world");
    return 0;
}
```

log.cpp
```cpp
#include "log.h"
#include <iostream>

void initLog() {
    log("yello");
}

void log(const char* msg) {
    std::cout << msg << std::endl;
}
```

log.h

```cpp
#pragma once

void initLog();
void log(const char* message);
```

CMakeLists.txt

```cpp
cmake_minimum_required(VERSION 3.16)
project(LearnCPP)

set(CMAKE_CXX_STANDARD 20)

add_executable(main main.cpp)
add_executable(log log.cpp)

add_library(liblog log.h log.cpp)
target_link_libraries(main liblog)
```

{{< /admonition >}}


`#pragma once` 的意思是这个头文件只会被include`一次`到一个[编译单元](https://baike.baidu.com/item/%E7%BC%96%E8%AF%91%E5%8D%95%E5%85%83/7400939?fr=aladdin)（translate unit）（即一个cpp文件）中


举一个错误的例子


{{< admonition failure "不使用#pragma once的错误例子" false >}}

main.cpp
```cpp
#include <iostream>
#include "log.h"

int main() {
    initLog();
    log("hello world");
    return 0;
}

```

log.cpp
```cpp
#include "log.h"
#include "common.h"
#include <iostream>

void initLog() {
    log("yello");
}

void log(const char* msg) {
    std::cout << msg << std::endl;
}
```

log.h

```cpp
// #pragma once

void initLog();
void log(const char* message);

struct hello {};
```

common.h

```cpp
#pragma once
#include "log.h"
```

编译之后，
![在这里插入图片描述](https://img-blog.csdnimg.cn/a9b919c8e507434e832a0142120b7da9.png)


{{< /admonition >}}


另一种发挥 `#pragma once` 的方法是，在log.h中这样写，这个意思是如果没定义_LOG_H则会定义_LOG_H为一下代码，可见当include一次后_LOG_H就会被定义，所以之后不会在执行这些代码

```cpp
#ifndef _LOG_H
#define _LOG_H

void initLog();
void log(const char* message);

struct hello {};

#endif
```


带 `#` 的都是预处理指令，在编译前执行，include<>和include""的区别是前者在系统库所在路径下搜寻，后者在当前项目的相对路径下搜寻

include某个cpp文件就相当于把那个cpp文件的代码拷贝到这个cpp文件中

为什么cpp的头文件没有.h？ 这是为了和c的头文件区分，c++的头文件不含.h，比如iostream，cstring


## How to debug

## Conditions and Branches

## Project Structures

## Loops

## Pointers

指针只是一个地址，他所存储的数据取决于你所要的字节长度


```cpp
void* ptr = 0; 
```

void* 表示暂时不关心这个数据的类型，只是声明一个指针， 0就是NULL，在cpp源码中有 #define NULL 0和 #define NULL ((void*)0),  或者用nullptr表示真正意义上的空指针


指针的间接引用（derefence）


```cpp
#include <iostream>
#define log(x) std::cout << x << std::endl
int main() {
    int a = 8;
    int* ptr = &a;
    *ptr = 10;
    log(a);
    return 0;
}
//output
// 10
```

new delete

```cpp
#include <iostream>
#include <memory.h>

#define log(x) std::cout << x << std::endl

int main() {
    char *buffer = new char[8];
    memset(buffer, 0, 8);
    delete[] buffer;
    return 0;
}
```


指向指针的指针


```cpp
#include <iostream>
#include <memory.h>

#define log(x) std::cout << x << std::endl

int main() {
    char *buffer = new char[8];
    memset(buffer, 0, 8);
    char** ptr = &buffer;
    delete[] buffer;
    return 0;
}
```


## References

引用是一种基于指针的语法糖（Syntactic sugar）

基本例子

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

int main() {
    int a = 5;
    int& ref = a;
    ref = 2;
    log(a);
    return 0;
}

//output
// 2
```


引用在初始化时就要指定一个变量，在指定完变量后，不能更改（即不能变成其他变量的引用），如果硬要这样做的话只能用指针


## Classes


类成员和函数需要public声明才可以在外部访问和初始化，默认是private。

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class Player {
public:
    int x, y, speed;
    void go(int dx, int dy) {
        x = dx;
        y = dy;
    }
};

int main() {
    Player player{};
    player.go(1, 2);
    return 0;
}

```


class和struct的区别是class的成员变量和函数默认是private，struct是public。struct可以继承，但不会去使用。看起来struct似乎是没有必要的，之所以有struct是因为它要和c兼容，c只有struct，没有class。

struct和class的使用场景没有严格要求，看个人习惯

struct适合用在数据的集合，class适合当作对象，具有比较大的功能

在写class的时候注意变量和函数的可见性（public，private，protected），protected变量可以被子类的访问


## Static

static有两种，在结构体和类内的，在外面的。


外部的static，the linkage of the symbol declared as static is going to be internal, i.e. only visible in the translation unit defined in

内部的static，share memory with all instances of the class/struct; i.e. among all the instances created in this class/struct: only one instance of the variable

要使用外部的变量或函数，用extern，告诉linker这个变量或函数在外面找



{{< admonition quote "extern和static举例" false >}}

main.cpp

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

extern int var;	// declaration

int main() {
    log(var);
    return 0;
}
// output 
// 11
```

static.cpp

```cpp

//static int var = 11;
int var = 11;  // definition
```

CMakeLists.txt （关键）

```cpp
add_library(libstatic static.cpp)
target_link_libraries(main libstatic)
```

{{< /admonition >}}

函数同理

实际上static非常常用，extern似乎还有很多用法，参考网上


类或结构体内部的static，用它修饰的变量，在创建多个实例时，不会创建多个变量（不会多分配内存）


```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

struct Entity {
    static int x, y;
    static void Print() {
        std::cout << x << ' ' << y << std::endl;
    }
};

int Entity::x;
int Entity::y;

int main() {
    Entity e1, e2;
//    e1.x = 2; e1.y = 3;
//    e1.Print();
//    e2.x = 4; e2.y = 5;
//    e2.Print();
    Entity::x = 2;
    Entity::y = 3;
    e2.Print();
    Entity::Print();
    return 0;
}

// output
// 2 3
// 2 3
```


注意如果变量非static，函数就不能用static，因为static函数不能访问非static变量

local static变量，它只有一个变量，尽管所在代码块被调用多次，因为它是local的，所以不能被外界访问



```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

void func() {
    static int i = 0;
    i++;
    log(i);
}

int main() {
    func();
    func();
    func();
    func();
    return 0;
}

// output
// 1
// 2
// 3
// 4
```



```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class Singleton {
public:
    static Singleton& get() {
        static Singleton instance;
        return instance;
    }
    void hello() {

    }
};

int main() {
    Singleton::get().hello();
    return 0;
}

```


如果去掉local static，那么Singleton就会在栈上创建，特别是返回值是引用时会产生很大的错误，如果没有引用，那就是返回一份复制，没多大问题。


## Enums

作用：增加代码可读性

enum里面的值默认是从0递增的，且是整数，当然你可以给它赋值

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

struct node {
    enum haha {
        A, B
    };
};

enum e1 {
    A, B, C = 4
};

enum e2 : char {
    a, b, c, d
};

int main() {
    node::A;    // 注意这种写法，A需要在enum里，否则需要加static
    int foo = B;
    e1 bar = B; // 这样bar只能是e1中的值
    int hoge = bar;
    log(bar);
    log(hoge);
    return 0;
}

//output
//1
//1
```


## Constructors

构造函数本身就存在，再java中变量初始化为0，c++并不是，是之前存在内存中的值，构造函数可以对其初始化，构造函数可以写多个（只要参数不同就行），这就是重载（overload）


```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class node {
public:
    int x, y;

    node() {
        x = 1;
        y = 2;
    }

    [[maybe_unused]] node(int q, int w) {   // [[maybe_unused]] 抑制针对未使用实体的警告, c++ 17
        x = q;
        y = w;
    }

    void Print() const {
        std::cout << x << ' ' << y << std::endl;
    }
};

int main() {
    node n1;
    n1.Print();
    node n2(4, 5);
    n2.Print();
    return 0;
}

//output
// 1 2 
// 4 5
```


一种不允许创建实例的方法是把构造函数写在private里或者写`[类名]() = delete` 这样默认构造函数被删除了，这样你只能使用类的static函数


```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class node {
private:
    //node() {}
public:
    int x, y;
    node() = delete ;
};

int main() {
    node n1{};
    return 0;
}
```


## Destructor

析构函数默认也有，在对象被销毁时调用

c++类的四个默认函数，构造函数、析构函数、拷贝函数、赋值函数

```cpp
class String

{ 

public:   

    String(const char *str = NULL); // 普通构造函数

    String(const String &other); // 拷贝构造函数

    ~ String(void); // 析构函数   

    String & operate =(const String &other); // 赋值函数

private: 

    char *m_data; // 用于保存字符串

};
```


```cpp
String a(“hello”);
String b(“world”);
String c = a; // 调用了拷贝构造函数，最好写成c(a);
c = b; // 调用了赋值函数
```


[参考](https://www.cnblogs.com/liushui-sky/p/5802910.html)

注意：析构函数没有重载，如果只自己写了一个构造函数，它不算重载，因为默认构造函数会被抛弃



```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class node {
public:
    int x, y;
    node() {
        x = 1, y = 2;
        log("created");
    }
    ~node() {
        log("destroyed");
    }
    void Print() {
        std::cout << x << ' ' << y << std::endl;
    }
};

void func() {
    node n1;
    n1.Print();
    n1.~node(); // 不推荐这样写
}

int main() {
    func();
    return 0;
}

//output
//
//created
//1 2
//destroyed
//destroyed
```


## Inheritance

子类的类型可以是父类，如果一个函数的参数是父类，则输入子类也是可以的。

三种继承


1. 公有继承(public)

公有继承的特点是基类的公有成员和保护成员作为派生类的成员时，它们都保持原有的状态，而基类的私有成员仍然是私有的，不能被这个派生类的子类所访问。

2. 私有继承(private)

私有继承的特点是基类的公有成员和保护成员都作为派生类的私有成员，并且不能被这个派生类的子类所访问。

3. 保护继承(protected)

保护继承的特点是基类的所有公有成员和保护成员都成为派生类的保护成员，并且只能被它的派生类成员函数或友元访问，基类的私有成员仍然是私有的。


[参考](https://www.cnblogs.com/tangshiguang/p/6735351.html)


```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class Entity {
public:
    float x, y;

    Entity() {
        x = 1.0f;
        y = 2.0f;
    }

    void move(float dx, float dy) {
        x += dx;
        y += dy;
    }
};

class Player : public Entity {
public:
    const char *name;

    Player() {
        name = "robot";
    }

    void PrintName() const {
        log(name);
    }
};

int main() {

    Player player;
    log(player.x);
    log(player.y);
    log(player.name);
    log(sizeof(Entity));
    log(sizeof(Player));
    return 0;
}

//output
//1
//2
//robot
//8
//16
```


## Virtual Functions

看一下代码


```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class Entity {
public:
    std::string GetName() {
        return "Entity";
    }
};

class Player : public Entity {
private:
    std::string mName;
public:
    Player(const std::string& name) : mName(name) {}
    std::string GetName() {
        return mName;
    }
};

void PrintName(Entity* entity) {
    log(entity->GetName());
}

int main() {

    Entity *e1 = new Entity();
    Player* p1 = new Player("dyh");
    PrintName(e1);
    PrintName(p1);
    return 0;
}

//output
//Entity
//Entity
```


之所以会输出两个Entity是因为PrintName()的参数类型是Entity，所以会当作Entity。

虚函数通过虚表（vtable）来编译，虚表是类中所有虚函数映射的表，通过虚表可以找到正确重写的函数。


当你需要在子类中重写父类的方法时，需要把父类的方法设置为虚函数

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class Entity {
public:
    virtual std::string GetName() {
        return "Entity";
    }
};

class Player : public Entity {
private:
    std::string mName;
public:
    Player(const std::string& name) : mName(name) {}
    std::string GetName() override {
        return mName;
    }
};

void PrintName(Entity* entity) {
    log(entity->GetName());
}

int main() {

    Entity *e1 = new Entity();
    Player* p1 = new Player("dyh");
    PrintName(e1);
    PrintName(p1);
    return 0;
}

//output
//Entity
//dyh
```


虚函数的额外开销：虚表需要占一定的空间，基类有一个指针指向虚表，调用虚函数时，需要遍历虚表。但这些开销在大部分情况下都可以忽略不计


## Interfaces (Pure Virtual Functions)

 纯虚函数就是虚函数里不写任何内容，带有纯虚函数的父类不能被实例化，就想java的接口不能实例化只能实现。如果父类有纯虚函数，子类必须重写该函数才可以被实例化。

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class Entity {
public:
    virtual std::string GetName() = 0;
};

class Player : public Entity {
private:
    std::string mName;
public:
    Player(const std::string& name) : mName(name) {}
    std::string GetName() override {
        return mName;
    }
};

void PrintName(Entity* entity) {
    log(entity->GetName());
}

int main() {

    //Entity *e1 = new Entity();  // error
    Entity* e1 = new Player("");
    Player* p1 = new Player("dyh");
    PrintName(e1);
    PrintName(p1);
    return 0;
}

//output
//
//dyh
```

下列代码中如果Player类没有重写GetClassName()函数，则输出两个Entity


```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class Printable {
public:
    virtual std::string GetClassName() = 0;
};

class Entity : public Printable {
public:
    virtual std::string GetName() { return "hello"; }

    std::string GetClassName() override {
        return "Entity";
    }
};

class Player : public Entity {
private:
    std::string mName;
public:
    Player(const std::string &name) : mName(name) {}

    std::string GetName() override {
        return mName;
    }

    std::string GetClassName() override {
        return "Player";
    }
};

void Print(Printable *obj) {
    log(obj->GetClassName());
}

int main() {

    Entity *e = new Entity();
    Player *p = new Player("dyh");
    Print(e);
    Print(p);
    return 0;
}

//output
//Entity
//Player
```


## Visibility

c++ 的三种可见性：private、protected、public。可以把一个类或函数标记成另一个类的友元（friend），这样它就可以访问这个类的private成员

public大家都可以访问、private只有类成员可以访问（友元也行）、protected只有基类和派生类可以访问


## Arrays

如果一个函数想返回一个数组，就要用new来创建，除非传入地址参数

创建数组的方式有三种

```cpp
#include <iostream>
#include <array>

#define log(x) std::cout << x << std::endl


int main() {

    int a[5];   //在栈上面创建的，这个代码块结束后，它会被销毁
    a[2] = 3;
    log(a[2]);  // 3
    int *ptr = a;
    *(ptr + 2) = 4;
    log(a[2]);  // 4
    *(int *) ((char *) ptr + 8) = 5;
    log(a[2]);  // 5
    log(sizeof(a)); // 20
    log(sizeof(*a));    // 4
    log(sizeof(&a));    // 8

    int *b = new int[5];    //创建在堆上（内存间接寻址），直到用delete销毁或程序结束
    log(sizeof(b));     // 8 // 地址长度
    delete[] b;

    int c[] = {1, 2, 3};

    std::array<int, 5> d{};
    return 0;
}
```


## Strings

两种形式：char数组和std::string（或者wide string）


```cpp
#include <iostream>
#include <string>

#define log(x) std::cout << x << std::endl

void Print(const std::string& x) {  //加const是因为我们不想让x被修改，加&是因为这样就变成一个引用，不需要拷贝字符串，拷贝字符串很占时间
    log(x);
}

int main() {

    char a[3] = {'d', 'y', 'h'};
    log(a); // dyh?Y╗ 后面的随机字符是因为char数组没有\0作为结束标志，所以不知道打印到哪里
    std::string b = "dyh";
    log(b); // dyh
    Print(b);   // dyh
    return 0;
}
```


## String Literals

字符串字面量就是双引号之间的字符们，它总是存储在只读内存中

```cpp
#include <iostream>
#include <string>

#define log(x) std::cout << x << std::endl

int main() {

//    char* name = "dyh"; // warning:  ISO c++11 does not allow conversion from string literal to 'char*'
//    name[1] = 'a';
//    char* name = (char*) "dyh"; //这样去修改字符是一种未定义的行为undefined behavior，所以不要这样做，如果要修改字符串数组应该按下面的方式写
//    name[1] = 'a';    //这个代码会让程序崩溃
    char another[5] = "dyh";    //按这种方式写。用数组不要用指针
    another[1] = 'a';
    const char *yes = "dyh";      // 当用char指针时，最好加上const，这样可以提醒自己用char*时不能修改内容
    // const char* yes = u8"dyh";
    const wchar_t *bar = L"dyh";    // 长度由编译器决定，一般wins2字节，Linux4字节，macos4字节
    const char16_t *foo = u"dyh";
    const char32_t *hoge = U"dyh";

    using namespace std::string_literals;
    std::string pop = "happy "s + "new year";   // s是一个函数
    std::wstring pop2 = L"happy"s + L"new year";
    std::u32string pop3 = U"happy"s + U"new year";

    const char *example = R"(Line1
Line2
Line3
Line4)";    // R可以忽略转义字符，可以多行输入而不会黏在一起
    log(example);
    return 0;
}
```


## Const


const修饰指针

```cpp
#include <iostream>
#include <string>

#define log(x) std::cout << x << std::endl

int main() {
    //const int* a = new int; // 不能改变指针存储的值，但可以改变指针的指向
    //int const* a = new int; // 同上
    // int* const a = new int; // 可以改变指针存储的值，不能改变指针的指向
    //const int* const a = new int;
    //*a = 2;
    int b = 100;
    //a = &b;
    //log(*a);
    return 0;
}
```


如果是 int* a, b;那么a是指针，b是int型，如果是int* a, *b; 那么a是指针，b是指针


```cpp
#include <iostream>
#include <string>

#define log(x) std::cout << x << std::endl

class Entity {
    int x, y;
    int* ptr;
    mutable int var;
public:
    int getx() const {  // 只有在类里面才这么用   意思是只读取类数据，不修改
        var = 2;    //用mutable修饰的变量可以修改
        return x;
    }

    int getx() {
        return x;
    }

    const int* const getptr() const {   // 返回一个不能改变指向，不能改变存储数据的指针
        return ptr;
    }
    void setx(int xx) {
        x = xx;
    }
};

void Print(const Entity& e) {
    log(e.getx());  //如果把getx的const去掉，e就不能调用getx()，因为getx可能会修改类，这样与形参的const冲突，尽管getx并没有改变类
    // 只要有const版本的getx存在就行
}

int main() {
    return 0;
}
```


## Mutable

mutable的两种用法：一种是和const一起用，一种是和lambda


```cpp
#include <iostream>
#include <string>

#define log(x) std::cout << x << std::endl

int main() {
    int x = 5;
    auto f = [=]() mutable {    // 在按值传递的情况下，如果把mutable去掉，就要改成下面的代码，它们是等价的
        x++;                    // lambda里使用mutable的情况极少见
        log(x);

//        int y = x;
//        y++;
//        log(y);
//        log(x);
    };
    f();
    log(x);
    return 0;
}
```


## Member Initializer Lists (Constructor Initializer Lists)




```cpp
#include <iostream>
#include <string>

#define log(x) std::cout << x << std::endl

class Entity {
    std::string m_name;
    int m_score;
public:
    Entity() : m_name("hello"), m_score(123) {}     // 初始化顺序最好和声明的顺序一样
    Entity(const std::string& name) : m_name(name), m_score(456) {}
};

int main() {

    return 0;
}
```


初始化列表和赋值形式初始化还有功能上的区别，看以下两段代码的区别。如果不用列表，类将会被实例化两次，用初始化列表，类被初始化一次，节省资源


```cpp
#include <iostream>
#include <string>

#define log(x) std::cout << x << std::endl

class A {
public:
    A() {
        log("created");
    }
    A(int x) {
        log(x);
    }
};

class B {
private:
    int x;
    A a;
public:
    B() {
        x = 3;
        a = A(2);
    }
};

int main() {
    B b;
    return 0;
}

//output
//created
//2
```



```cpp
#include <iostream>
#include <string>

#define log(x) std::cout << x << std::endl

class A {
public:
    A() {
        log("created");
    }
    A(int x) {
        log(x);
    }
};

class B {
private:
    int x;
    A a;
public:
    B() : x(3), a(A(2)) {}
    //B() : x(3), a(2) {}   // 效果和上面相同
};

int main() {
    B b;
    return 0;
}

//output
// 2
```

## Ternary Operators

为什么用三元运算符，因为它快，更整洁


## How to Create Instantiate Object

实例化就是看在堆上创建还是在栈上

在堆上，你决定什么时侯销毁，在栈上，超出作用域就销毁

在堆上创建实例的理由有：不想在超出作用域后被销毁，对象太大了，在栈上创建很多太占空间，栈比较小，会爆栈

在堆上分配会比在栈上费时间

```cpp
#include <iostream>
#include <string>

using namespace std;

#define log(x) std::cout << x << std::endl

class Entity {
private:
    string m_name;
public:
    Entity() : m_name("hello") {}

    Entity(const string& name) : m_name(name) {}

    const string& getname() const {
        return m_name;
    }
};

int main() {
    Entity *e;
    {
        //Entity entity("dyh");  // 在栈上创建，过了这个代码块就会被销毁
        Entity* entity = new Entity("dyh"); // 在堆上创建
        //e = &entity;
        e = entity;
        delete entity;
    }
    //delete entity;  // wrong should be 'delete e'
    return 0;
}
```


## New

new 返回分配的内存的指针

placement new 留坑

```cpp
#include <iostream>
#include <string>

using namespace std;

#define log(x) std::cout << x << std::endl

class Entity {
private:
    string m_name;
public:
    Entity() : m_name("hello") {}

    Entity(const string& name) : m_name(name) {}

    const string& getname() const {
        return m_name;
    }
};

int main() {
    Entity* entity = new Entity;
    Entity* e = (Entity*) malloc(sizeof(Entity));   // 不要用这种，它没有调用构造函数，而且可读性差
    return 0;
}
```


## Implicit Conversion and Explicit Keyword


```cpp
#include <iostream>
#include <string>

using namespace std;

#define log(x) std::cout << x << std::endl

class Entity {
private:
    string m_name;
    int m_age;
public:
    Entity(const string& name) : m_name(name), m_age(-1) {}
    Entity(int x) : m_name("unknown"), m_age(x) {}
};

int main() {
    // 一般不会这样写代码，可读性差
    Entity e = 22;  // int implicit convert to Entity
    //Entity e2 = "abc";  // wrong, because "abc" is char array type not string
    Entity e2 = (string) "abc"; // ok
    return 0;
}
```


explicit 禁止隐式转化

```cpp
#include <iostream>
#include <string>

using namespace std;

#define log(x) std::cout << x << std::endl

class Entity {
private:
    string m_name;
    int m_age;
public:
    Entity(const string& name) : m_name(name), m_age(-1) {}
    explicit Entity(int x) : m_name("unknown"), m_age(x) {}
};

int main() {
    Entity e = 22;  // wrong
    return 0;
}
```



## Operators and Operator Overloading

java不支持运算符重载

```cpp
#include <iostream>
#include <string>

using namespace std;

#define log(x) std::cout << x << std::endl

class Vector2d {
public:
    float x, y;

    //Vector2d() {}
    Vector2d(float x, float y) : x(x), y(y) {}
    Vector2d add(const Vector2d& other) const {
        //return *this + other;
        return operator+(other);    // 两种都行
    }
    Vector2d operator+(const Vector2d &other) const {
        return Vector2d(x + other.x, y + other.y);
    }
    bool operator==(const Vector2d& other) const {
        return x == other.x && y == other.y;
    }
};

// 重载<<流运算符，在class外面，因为这和class无关，而且写到类里面报错。这里重载<<很像java里的to_string方法
// 重载==就像重写equals
std::ostream& operator<<(std::ostream& stream, const Vector2d& v) {
    stream << v.x << ", " << v.y;
    return stream;
}

int main() {
    Vector2d v1(2.0f, 1.0f), v2(3.0f, 7.0f);
    //Vector2d v3 = v1 + v2;
    Vector2d v3 = v1.add(v2);
    log(v3.x);
    log(v3.y);
    log(v3);
    bool condition = v1 == v2;
    condition = v1 != v2;
    return 0;
}
```

## This

this是指向当前对象的指针且是const修饰的，比如const A*

试试在class里写delete this（X）


## Object Lifetime


在栈上创建

```cpp
#include <iostream>
#include <string>

using namespace std;

#define log(x) std::cout << x << std::endl

class Entity {
public:
    Entity() {
        log("created entity");
    }
    ~Entity() {
        log("destroyed entity");
    }
};

int main() {
    {
        Entity entity;
    }
    return 0;
}

//created entity
//destroyed entity
```


在堆上创建

```cpp
#include <iostream>
#include <string>

using namespace std;

#define log(x) std::cout << x << std::endl

class Entity {
public:
    Entity() {
        log("created entity");
    }
    ~Entity() {
        log("destroyed entity");
    }
};

int main() {
    {
        Entity* entity = new Entity;
    }
    return 0;
}

//created entity
```


```cpp
int* CreateArray() {
//    int a[20];    //这是错误的，因为它在栈上创建
//    return a;
    int* a = new int[20];
    return a;
}
```


如果想用new在堆上分配，又想在跳出作用域时自动删除（智能指针雏形）

```cpp
#include <iostream>
#include <string>

using namespace std;

#define log(x) std::cout << x << std::endl

class Entity {
public:
    Entity() {
        log("created entity");
    }
    ~Entity() {
        log("destroyed entity");
    }
};

class ScopedPtr {
private:
    Entity* m_ptr;
public:
    ScopedPtr(Entity* entity) : m_ptr(entity) {}
    ~ScopedPtr() {
        delete m_ptr;
    }
};

int main() {
    {
        ScopedPtr ptr = new Entity();   // implicit conversion
    }
    return 0;
}

//created entity
//destroyed entity
```



## Smart Pointers

unique_ptr


unique_ptr不能复制，因为如果复制的话，当之前的指针指向的内存区域释放后，复制的指针将指向已释放的内存，这没有意义


```cpp
#include <iostream>
#include <string>
#include <memory>


#define log(x) std::cout << x << std::endl

class Entity {
public:
    Entity() {
        log("created entity");
    }
    ~Entity() {
        log("destroyed entity");
    }
    void Print() {

    }
};



int main() {
    //std::unique_ptr<Entity> entity(new Entity);
    std::unique_ptr<Entity> entity = std::make_unique<Entity>();    // 更安全的写法，如果构造函数跑出异常，它不会得到一个悬空的指针而造成内存泄露
    entity->Print();
//    std::unique_ptr<Entity> e(entity);
//    std::unique_ptr<Entity> e = entity;   // unique_ptr不能复制
    return 0;
}

```


shared_ptr 使用引用计数（reference counting），就是记录有多少个指针指向它，如果引用计数变成0就删掉这块内存

如果shared_ptr复制给weak_ptr ，不会增加这个内存的引用计数。weak_ptr 不会真正占有内存块

使用时优先考虑unique，如果必须要复制，再用shared，shared比unique开销大


```cpp
#include <iostream>
#include <string>
#include <memory>


#define log(x) std::cout << x << std::endl

class Entity {
public:
    Entity() {
        log("created entity");
    }
    ~Entity() {
        log("destroyed entity");
    }
    void Print() {

    }
};



int main() {
    std::shared_ptr<Entity> entity = std::make_shared<Entity>();
    // 一般不用new，因为share_ptr需要控制块来记录引用计数，如果用new，要做两次内存分配，一次是new Entity，一次是分配控制块，用这种方法可以把它们结合起来更高效
    std::shared_ptr<Entity> e1 = entity;
    std::weak_ptr<Entity> e2 = e1;
    return 0;
}

```


## Copying and Copy Constructors


```cpp
#include <iostream>
#include <string>
#include <memory>

#define log(x) std::cout << x << std::endl

int main() {
    int a = 2;
    int b = a;  // copy value
    b = 3;
    log(a);
    int *c;
    *c = 5;
    int *d = c; // copy pointer
    *d = 6;
    log(*c);
    return 0;
}
// 2
// 6
// 6
```

以下是模拟写一个string类


```cpp
#include <iostream>
#include <string>
#include <cstring>

#define log(x) std::cout << x << std::endl

class String {
private:
    char* m_buffer;
    unsigned int m_size;
public:
    String(const char* string) {
        m_size = strlen(string);
        m_buffer = new char[m_size + 1];
        memcpy(m_buffer, string, m_size);
        m_buffer[m_size] = 0;   //or memcpy(m_buffer, string, m_size + 1);
    }
    ~String() {
        delete[] m_buffer;
    }
    friend std::ostream& operator<<(std::ostream& stream, const String& string);
};

std::ostream& operator<<(std::ostream& stream, const String& string) {
    stream << string.m_buffer;
    return stream;
}

int main() {
    String s = "hello";
    //String s("hello");
    String s1 = s;  // 这样拷贝程序会崩溃，因为s1的指针和s的指针一样，指向同一块内存区域，当s1析构时，内存区域被释放了，s析构时，又会对同一片区域释放，出错
    log(s);
    log(s1);
    return 0;
}

// hello
// hello
```


重载[]运算符

```cpp
#include <iostream>
#include <string>
#include <cstring>

#define log(x) std::cout << x << std::endl

class String {
private:
    char* m_buffer;
    unsigned int m_size;
public:
    String(const char* string) {
        m_size = strlen(string);
        m_buffer = new char[m_size + 1];
        memcpy(m_buffer, string, m_size);
        m_buffer[m_size] = 0;   //or memcpy(m_buffer, string, m_size + 1);
    }
    ~String() {
        delete[] m_buffer;
    }
    char& operator[](unsigned int index) {
        return m_buffer[index];
    }
    friend std::ostream& operator<<(std::ostream& stream, const String& string);
};

std::ostream& operator<<(std::ostream& stream, const String& string) {
    stream << string.m_buffer;
    return stream;
}

int main() {
    String s = "hello";
    //String s("hello");
    String s1 = s;  // （浅拷贝）这样拷贝程序会崩溃，因为s1的指针和s的指针一样，指向同一块内存区域，当s1析构时，内存区域被释放了，s析构时，又会对同一片区域释放，出错
    s1[1] = 'a';
    log(s);
    log(s1);
    return 0;
}

// hallo
// hallo

```


只拷贝了指针却没有拷贝指针所指向的区域，这是浅拷贝（shallow copy）如何才能拷贝指针且拷贝指针指向的区域（不同的指针加上不同的内存区域），这是深拷贝（deep copy）。深拷贝可以通过改写拷贝构造函数实现

```cpp
#include <iostream>
#include <string>
#include <cstring>

#define log(x) std::cout << x << std::endl

class String {
private:
    char* m_buffer;
    unsigned int m_size;
public:
    String(const char* string) {
        m_size = strlen(string);
        m_buffer = new char[m_size + 1];
        memcpy(m_buffer, string, m_size);
        m_buffer[m_size] = 0;   //or memcpy(m_buffer, string, m_size + 1);
    }
    //String(const String& other) : m_buffer(other.m_buffer), m_size(other.m_size) {} // 这是c++提供的默认的拷贝构造函数
//    String(const String& other) {   // 实际上c++提供的默认拷贝构造函数是这样的
//        memcpy(this, &other, sizeof(String));
//    }
    // deep copy
    String(const String& other) : m_size(other.m_size) {
        log("copyed");
        m_buffer = new char[m_size + 1];
        memcpy(m_buffer, other.m_buffer, m_size + 1);
    }
    ~String() {
        delete[] m_buffer;
    }
    char& operator[](unsigned int index) {
        return m_buffer[index];
    }
    friend std::ostream& operator<<(std::ostream& stream, const String& string);
};

std::ostream& operator<<(std::ostream& stream, const String& string) {
    stream << string.m_buffer;
    return stream;
}

// 用引用避免不必要的拷贝，用const是因为它不会被修改，要多用const引用，好处多多
void Print(const String& s) {
    log(s);
}

int main() {
    String s = "hello";
    //String s("hello");
    String s1 = s;  // （浅拷贝）这样拷贝程序会崩溃，因为s1的指针和s的指针一样，指向同一块内存区域，当s1析构时，内存区域被释放了，s析构时，又会对同一片区域释放，出错
    s1[1] = 'a';
    Print(s);
    Print(s1);
    return 0;
}

// hello
// hallo

```


记得多用const引用！

## Arrow

->重载的使用和场景

如果不用重载，要这样写

```cpp
#include <iostream>
#include <string>
#include <cstring>

#define log(x) std::cout << x << std::endl

class Entity {
public:
    int x;
    void Print() const {
        log("hello");
    }
};

class ScopedPtr {
private:
    Entity* entity;
public:
    ScopedPtr(Entity* e) : entity(e) {

    }
    ~ScopedPtr() {
        delete entity;
    }
    Entity* getObj() {
        return entity;
    }
};

int main() {
    ScopedPtr e = new Entity();     // Implicit conversion
    e.getObj()->Print();	// 要这样写
    return 0;
}
```

重载运算符就这样写了


```cpp
#include <iostream>
#include <string>
#include <cstring>

#define log(x) std::cout << x << std::endl

class Entity {
public:
    int x;
    void Print() const {
        log("hello");
    }
};

class ScopedPtr {
private:
    Entity* entity;
public:
    ScopedPtr(Entity* e) : entity(e) {

    }
    ~ScopedPtr() {
        delete entity;
    }
    Entity* operator->() {
        return entity;
    }
    const Entity* operator->() const {
        return entity;
    }
};

int main() {
    ScopedPtr e = new Entity();     // Implicit conversion
    //const ScopedPtr e = new Entity();	//如果用const就加上const版本的重载
    e->Print();
    return 0;
}
```


->的一个应用，取数据的偏移地址


```cpp
#include <iostream>
#include <string>
#include <cstring>

#define log(x) std::cout << x << std::endl

struct A {
    float x, y, z;  //  Q：想找y或者z在内存里对于x的偏移
};

int main() {
    // 为了可读性全加上括号
    // 经实验c++20不能把地址转换成int
    int offsetx = (int) (&(((A*) nullptr)->x)); // 0
    int offsety = (int) (&(((A*) nullptr)->x)); // 4
    log(offsetx);
    int x = 5;
    int y = (int)&x;    // wrong
    return 0;
}
```


## Vector

vector作为动态数组为什么叫vector，据设计者称，这是一个命名错误，详见网上资料


vector的使用优化

以下这段代码之所以会拷贝那么多次是因为

首先在main栈上创建值为123的Vertex对象，然后将值为123的Vertex对象拷贝进vector中，这是1次。在main栈上创建值为456的Vertex对象，然后因为vector的大小默认为1，空间不够，所以在内存中找一块值为2或更大的空间，然后把Vertex123拷贝进那个空间，这是第2次，再将Vertex456拷贝进那个空间，这是第3次，其他同理。但是输出的copied并不像预想的那么多，是因为机器不同、当前环境不同，实际的过程略有差异

优化的方法，1：预先分配一定大小的空间，减少对象的转移

2：直接在vector后面创建，不要在main栈里创建，再拷贝


```cpp
#include <iostream>
#include <vector>

#define log(x) std::cout << x << std::endl

struct Vertex {
    float x, y, z;
    Vertex(float x, float y, float z) : x(x), y(y), z(z) {}
    Vertex(const Vertex& v) : x(v.x), y(v.y), z(v.z) {
        log("copied");
    }
};

int main() {
    std::vector<Vertex> vertices;
    vertices.push_back({1, 2, 3});
    vertices.push_back({4, 5, 6});
    vertices.push_back({7, 8, 9});
    vertices.push_back({10, 11, 12});
    return 0;
}

//copied
//copied
//copied
//copied
//copied
//copied
//copied
```


针对优化1

```cpp
#include <iostream>
#include <vector>

#define log(x) std::cout << x << std::endl

struct Vertex {
    float x, y, z;
    Vertex(float x, float y, float z) : x(x), y(y), z(z) {}
    Vertex(const Vertex& v) : x(v.x), y(v.y), z(v.z) {
        log("copied");
    }
};

int main() {
    std::vector<Vertex> vertices;
    vertices.reserve(4);
    vertices.push_back({1, 2, 3});
    vertices.push_back({4, 5, 6});
    vertices.push_back({7, 8, 9});
    vertices.push_back({10, 11, 12});
    return 0;
}

//copied
//copied
//copied
//copied
```


针对优化2，注意emplace_back传入的是数字参数，而不是对象

```cpp
#include <iostream>
#include <vector>

#define log(x) std::cout << x << std::endl

struct Vertex {
    float x, y, z;
    Vertex(float x, float y, float z) : x(x), y(y), z(z) {}
    Vertex(const Vertex& v) : x(v.x), y(v.y), z(v.z) {
        log("copied");
    }
};

int main() {
    std::vector<Vertex> vertices;
    vertices.reserve(4);
    vertices.emplace_back(1, 2, 3);
    vertices.emplace_back(4, 5, 6);
    vertices.emplace_back(7, 8, 9);
    vertices.emplace_back(10, 11, 12);
    return 0;
}

//
```


## Multiple Return Values

用pair、tuple、struct等等

std::tie 和 std::ignore 的用法

```cpp
#include <iostream>
#include <string>
#include <tuple>

#define log(x) std::cout << x << std::endl

int main() {
    std::tuple<int, float, std::string> tp = std::make_tuple(3, 2.0f, "qwe");
    int x;
    float y;
    std::string z;
    std::tie(x, y, z) = tp;
    log(x);
    log(y);
    log(z);
    std::tie(x, std::ignore, z) = tp;
    return 0;
}

//3
//2
//qwe
```


## Templates


```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

//template<class T>
//它们是连在一起的，叫模板，Print不是一个单独的函数，如果没有调用这个函数，这个函数就不存在，只有在调用时，才会根据类型创建出函数（代码）
template<typename T>
void Print(T x) {
    log(x);
}

int main() {
    Print(3);
    Print("hello");
    Print(5.2);
    Print<int>(4);
    return 0;
}
```




```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

template<typename T, int N>
class Array {
private:
    T m_array[N];
public:
    int getsize() const {
        return N;
    }
};

int main() {
    Array<int, 5> array;
    log(array.getsize());
    return 0;
}
```


## Stack vs Heap Memory

程序运行时，操作系统会分配一堆的ram，堆和栈是ram中的区域

栈通常是一个固定大小的区域，大概为2M，堆可以扩充

栈的空间分配是连续的，很快的，堆的分配比较慢，一个主要原因是，栈的空间分配是预先分配好的，堆的空间分配不是预先分配的，堆的每一次分配都要找空间碎片。 另一个影响效率的是cache命中率的问题


## Macros

宏很适合用来调试

```cpp
#include <iostream>

//#ifdef LOCAL
//#define log(x) std::cout << x << std::endl
//#else
//#define log(x)
//#endif

//以下写法比上面更好

#if LOCAL == 1
#define log(x) std::cout << x << std::endl
#else
#define log(x)
#endif

//#if LOCAL == 1
//#define log(x) std::cout << x << std::endl
//#elif defined(DEBUG)
//#define log(x)
//#endif

//#if 0
//#endif

//多行的define, \是enter的转义，\后不要打符号
#define Main int main() {\
    int a = 3;\
    log(a);\
    return 0;\
}

Main
```


## auto

auto的一个用法，当类型很长时用auto代替，有时候可以这样写const auto&

```cpp
#include <iostream>
#include <functional>

#define log(x) std::cout << x << std::endl

int main() {
    //c++ 14
    auto func = [&](int x) -> int {
        return x + 1;
    };
    return 0;
}
```


## Static Arrays

std::array 固定类型、固定长度

std::array的好处是具有STL特性，可以用STL函数

时间也很快

基本不占额外的空间


```cpp
#include <iostream>
#include <array>

#define log(x) std::cout << x << std::endl

//int fun(std::array<int, 3> a) {
//    return (int) a.size();
//}

//一种不用传递数组大小也能知道数组大小的方式
//template<typename T, size_t n>
//int fun(const T (&arr)[n]) {
//    return (int) n;
//}

template<typename T>
int fun(const T& a) {
    return (int) a.size();
}

int main() {
    std::array<int, 6> data;
    data[0] = 1;
    data[1] = 2;
    int a[] = {1, 2, 3};
    //log(fun(a));    // 3
    log(fun(data)); // 6
    return 0;
}
```


## Function Pointers

```cpp
#include <iostream>
#include <array>

#define log(x) std::cout << x << std::endl

void Print(int x) {
    log("hello");
    log(x);
}

int main() {
    auto func = Print;
    func(5);
    void(*foo)(int);
    foo = Print;
    foo(6);
    typedef void(*PrintFunction)(int);
    PrintFunction bar = Print;
    bar(7);
    return 0;
}
// hello
// 5
// hello
// 6
// hello
// 7
```


```cpp
#include <iostream>
#include <vector>

#define log(x) std::cout << x << std::endl

void Print(int x) {
    log(x);
}

void ForEach(const std::vector<int>& v, void(*func)(int)) {
    for (int i : v) {
        func(i);
    }
}

int main() {
    std::vector<int> v = {5, 4, 3, 2, 1};
    ForEach(v, Print);
    return 0;
}

//5
//4
//3
//2
//1
```


## lambdas

```cpp
#include <iostream>
#include <vector>

#define log(x) std::cout << x << std::endl

void ForEach(const std::vector<int>& v, void(*func)(int)) {
    for (int i : v) {
        func(i);
    }
}

int main() {
    std::vector<int> v = {5, 4, 3, 2, 1};
    auto fun = [](int x){log(x);};
    ForEach(v, fun);
    return 0;
}

//5
//4
//3
//2
//1
```


捕获（capture）

[a, &b] a通过复制捕获，b通过引用捕获

[this] 通过引用捕获当前对象

[&] 通过引用捕获所有变量和当前对象

[=] 通过拷贝捕获所有变量，通过引用捕获当前对象

[] 不捕获



```cpp
#include <iostream>
#include <vector>
#include <functional>
#include <algorithm>

#define log(x) std::cout << x << std::endl

void ForEach(const std::vector<int>& v, const std::function<void(int)>& func) { // 不加const报错
    for (int i : v) {
        func(i);
    }
}

int main() {
    std::vector<int> v = {5, 4, 3, 2, 1};
    int a = 5;
    auto fun = [&](int x){log(x);}; // 传值，也可以修改变量的值，要加mutable
    ForEach(v, fun);

    std::find_if(v.begin(), v.end(), [&](int val){return val > 3;});

    return 0;
}

//5
//4
//3
//2
//1
```


## Namespaces


命名空间是为了避免命名冲突

命名空间可以嵌套

类本身就是一个命名空间


```cpp
#include <iostream>
#include <vector>
#include <functional>

#define log(x) std::cout << x << std::endl

namespace apple {
    void Print(const char* text) {
        log(text);
    }
}

namespace orange {
    void Print(const char* text) {
        std::string tmp = text;
        std::reverse(tmp.begin(), tmp.end());
        log(tmp);
    }
}

int main() {
    apple::Print("apple");
    orange::Print("orange");
    //using namespace apple;
    //using apple::Print;
    //namespace a = apple;

    // 两个namespace不能同时存在
    return 0;
}

//apple
//egnaro
```



## Threads

```cpp
#include <iostream>
#include <thread>

#define log(x) std::cout << x << std::endl

void DoWork() {
    while (true) {
        log("working");
        std::cin.get();
    }
}
int main() {
    std::thread worker(DoWork);     // 在这里立即启动线程，并行运行
    worker.join();      //运行到这一步时，阻塞当前线程（主线程），等待这个线程执行完再回到主线程
    std::cin.get();		// 有了上面的join，在DoWork没有执行完是不会执行这一步的
    return 0;
}
//...
```

想实现按回车结束某个线程


```cpp
#include <iostream>
#include <thread>

#define log(x) std::cout << x << std::endl

static bool is_finished = false;

void DoWork() {
    using namespace std::literals::chrono_literals;
    log(std::this_thread::get_id());
    while (!is_finished) {
        log("working");
        std::this_thread::sleep_for(1s);
    }
}
int main() {
    std::thread worker(DoWork);
    std::cin.get();
    is_finished = true;
    worker.join();
    std::cin.get();
    return 0;
}

//2
//working
//working
//working
//working
```


## Timing

```cpp
#include <iostream>
#include <thread>
#include <chrono>

#define log(x) std::cout << x << std::endl

int main() {
    using namespace std::literals::chrono_literals;
    auto start = std::chrono::high_resolution_clock::now();
    std::this_thread::sleep_for(1s);
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<float> duration = end - start;
    log(duration.count());
    return 0;
}

//1.0006
```

一种更好的计算方式

```cpp
#include <iostream>
#include <thread>
#include <chrono>

#define log(x) std::cout << x << std::endl

struct Timer {
    std::chrono::time_point<std::chrono::steady_clock> start, end;
    std::chrono::duration<float> duration;
    Timer() {
        start = std::chrono::steady_clock::now();
    }
    ~Timer() {
        end = std::chrono::steady_clock::now();
        duration = end - start;
        std::cout << duration.count() * 1000 << " ms" << std::endl;
    }
};

void Print() {
    Timer timer;
    for (int i = 0; i < 100; ++i) {
        log("hello world");     // endl比'\n'慢
    }
}

int main() {
    Print();
    return 0;
}

//hello world
//...
// 37.1672 ms
```


## Multidimensional Arrays

一维数组比多维数组好

待补

## Sorting

sort中，true和false的意义


```cpp
#include <iostream>
#include <vector>
#include <algorithm>

#define log(x) std::cout << x << std::endl

int main() {
    std::vector<int> a = {2, 4, 5, 1, 3};
    // 让1排在最后
    std::sort(a.begin(), a.end(), [](int a, int b) {
        if (a == 1) return false;   // false表示a在后，b在前，true相反
        if (b == 1) return true;
        return a < b;
    });
    for (int i : a) {
        std::cout << i << ' ';
    }
    return 0;
}

//2 3 4 5 1
```


## Type Punning

类型双关

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

#define log(x) std::cout << x << std::endl

int main() {
    int a = 5;
    double b = a;   // 隐式转化，内存的内容改动
    log(b);
    double c = *(double *) &a;  // 内存的值不变，变成用double读取
    log(c);
    return 0;
}

//5
//2.47033e-323
```


## Unions

联合体中的变量内存值相同，只占一个变量的空间

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

int main() {
    struct Union {
        union {
            float a;
            int b;
        };
    };
    Union u;
    u.a = 2.0f;
    log(u.a);
    log(u.b);
    return 0;
}

//2
//1073741824
```


union的用法

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

struct Vector2d {
    float x, y;
};

struct Vector4d {
    union { //  anonymous
        struct {    // anonymous
            float x, y, z, w;
        };
        struct {
            Vector2d a, b;  // a的值就是x，y的值， b的值就是z，w的值
        };
    };
};

void PrintV2(const Vector2d& v) {
    std::cout << v.x << ' ' << v.y << '\n';
}

int main() {
    Vector4d  v4 = {1.0f, 2.0f, 3.0f, 4.0f};
    PrintV2(v4.a);
    PrintV2(v4.b);
    v4.z = 500.f;
    PrintV2(v4.a);
    PrintV2(v4.b);
    return 0;
}


//1 2
//3 4
//1 2
//500 4
```


## Virtual Destructors

和虚构造函数类似

虚函数在有子类的情况下通常都要考虑


```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class Base {
public:
    Base() {
        log("base constructor");
    }
    ~Base() {
        log("base destructor");
    }
};

class Derived : public Base {
public:
    Derived() {
        log("derived constructor");
    }
    ~Derived() {    // 对于基类不是重写，而是增加一个析构函数
        log("derived destructor");
    }
};

int main() {
    Base* base = new Base();
    delete base;
    log("----------");
    Derived* derived = new Derived();
    delete derived;
    log("----------");
    Base* poly = new Derived();
    delete poly;
    return 0;
}

//base constructor
//base destructor
//----------
//base constructor
//derived constructor
//derived destructor
//base destructor
//----------
//base constructor
//derived constructor
//base destructor
```



可以看到最后没有调用derived的析构函数，这可能造成内存泄露，比如在derived的构造函数中new内存，在derived的析构函数中delete，但是因为没有调用，所有没有释放（这种情况在堆上有）

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class Base {
public:
    Base() {
        log("base constructor");
    }
    virtual ~Base() {
        log("base destructor");
    }
};

class Derived : public Base {
public:
    Derived() {
        log("derived constructor");
    }
    ~Derived() {    // 对于基类不是重写，而是增加一个析构函数
        log("derived destructor");
    }
};

int main() {
    Base* base = new Base();
    delete base;
    log("----------");
    Derived* derived = new Derived();
    delete derived;
    log("----------");
    Base* poly = new Derived(); // 多态
    delete poly;
    return 0;
}

//base constructor
//base destructor
//----------
//base constructor
//derived constructor
//derived destructor
//base destructor
//----------
//base constructor
//derived constructor
//derived destructor
//base destructor
```


## Casting

c++风格的casting比c风格的casting，好在如果你想要去掉casting，你要去搜索，在c里要搜索int，在c++里要搜索static_cast\<int\>，这比int好搜。另一个好处是编译器会做严格的检查

static_cast , dynamic_cast , reinterpret_cast, const_cast

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class Base {
public:
    Base() {}

    virtual ~Base() {}
};

class Derived : public Base {
public:
    Derived() {}

    ~Derived() {}
};

class AnotherClass : public Base {
public:
    AnotherClass(){};
    ~AnotherClass(){};
};

int main() {
    Derived* derived = new Derived();
    Base* base = derived;
    //AnotherClass* ac = dynamic_cast<AnotherClass*>(base);   // ac is null
    Derived* ac = dynamic_cast<Derived*>(base); // ac is not null
    // dynamic会在运行时检查
    return 0;
}
```

dynamic casting

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class Entity {

};

class Player : public Entity {

};

class Enemy : public Entity {

};

int main() {
    Player* player = new Player();
    Entity* e = player; // ok
    Player* p = dynamic_cast<Player*>(e);  // e可以是enemy，所以错了，但是在Entity加虚函数就行，多态
    return 0;
}
```

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

class Entity {
    virtual void Print() {}
};

class Player : public Entity {

};

class Enemy : public Entity {

};

int main() {
    Player* player = new Player();
    Entity* actuallyEnemy = new Enemy();
    Entity* actuallyPlayer = player;
    Player* p0 = dynamic_cast<Player*>(actuallyEnemy);  //p0是null
    Player* p1 = dynamic_cast<Player*>(actuallyPlayer); // p1不是null
    // 之所以可以吧Entity类转化成功，是因为根本不用担心Entity是enemy，因为加了虚函数相当于Entity是个接口，Entity不会被实例化
    // Entity只能是Player或者Enemy，根据上文actuallyPlayer已经是player了，所以转换成功
    if (dynamic_cast<Player*>(actuallyEnemy)) { // 用if检查是否能转换

    }
    return 0;
}
```



dynamic_cast可以做到检查类型是因为它存储了RTTI（runtime type information）

dynamic_cast 存储RTTI增加了开销，检查类型是否匹配也增加了开销




## Conditional and Action Breakpoints

在断点处设置条件，当条件为true时，触发断点

![在这里插入图片描述](https://img-blog.csdnimg.cn/c745448835804fbc97fb12d8574fb047.png?x-oss-process=image,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_16,color_FFFFFF,t_70,g_se,x_16)


## Precompiled Headers

## Benchmarking 


怎样测试一个代码块的运行时间

```cpp
#include <iostream>
#include <memory>
#include <chrono>

#define log(x) std::cout << x << std::endl

class Timer {
public:
    Timer() {
        startTimePoint = std::chrono::steady_clock::now();
    }
    ~Timer() {
        stop();
    }
    void stop() {
        auto endTimePoint = std::chrono::steady_clock::now();
        auto start = std::chrono::time_point_cast<std::chrono::microseconds>(startTimePoint).time_since_epoch().count();
        auto end = std::chrono::time_point_cast<std::chrono::microseconds>(endTimePoint).time_since_epoch().count();
        auto duration = end - start;
        std::cout << duration << " us" << std::endl;
    }
private:
    std::chrono::time_point<std::chrono::steady_clock> startTimePoint;
};

int main() {
    int v = 0;
    {
        Timer timer;
        for (int i  = 0; i < 1000000; ++i) {    // 有时候编译器会对这段代码进行优化，直接得出结果，这样就测不出时间
            v += 2;
        }
    }
    log(v);
    __debugbreak();     //手动打断点
    return 0;
}
```



share_ptr new unique_ptr性能对比


最好再release模式下测试，release比debug快，会减少很多不必要的东西


```cpp
#include <iostream>
#include <memory>
#include <chrono>
#include <array>

#define log(x) std::cout << x << std::endl

class Timer {
public:
    Timer() {
        startTimePoint = std::chrono::steady_clock::now();
    }
    ~Timer() {
        stop();
    }
    void stop() {
        auto endTimePoint = std::chrono::steady_clock::now();
        auto start = std::chrono::time_point_cast<std::chrono::microseconds>(startTimePoint).time_since_epoch().count();
        auto end = std::chrono::time_point_cast<std::chrono::microseconds>(endTimePoint).time_since_epoch().count();
        auto duration = end - start;
        std::cout << duration << " us" << std::endl;
    }
private:
    std::chrono::time_point<std::chrono::steady_clock> startTimePoint;
};

int main() {
    struct V {
        float x, y;
    };
    log("make share");
    {
        std::array<std::shared_ptr<V>, 1000> sharePtrs;
        Timer timer;
        for (int i = 0; i < sharePtrs.size(); i++) {
            sharePtrs[i] = std::make_shared<V>();
        }
    }

    log("new shared");
    {
        std::array<std::shared_ptr<V>, 1000> sharePtrs;
        Timer timer;
        for (int i = 0; i < sharePtrs.size(); i++) {
            sharePtrs[i] = std::shared_ptr<V>(new V());
        }
    }

    log("make unique");
    {
        std::array<std::unique_ptr<V>, 1000> uniquePtrs;
        Timer timer;
        for (int i = 0; i < uniquePtrs.size(); i++) {
            uniquePtrs[i] = std::make_unique<V>();
        }
    }

    //__debugbreak();     //手动打断点
    return 0;
}

//debug
//make share
//405 us
//new shared
//322 us
//make unique
//219 us
//


//release

//make share
//126 us
//new shared
//184 us
//make unique
//66 us
```



## Structured Bindings

c++17特性

处理多返回值问题

```cpp
#include <iostream>
#include <string>
#include <tuple>

#define log(x) std::cout << x << std::endl

std::tuple<std::string, int> createPerson() {
    return {"dyh", 22};
}


int main() {
    auto [name, age] = createPerson();
    return 0;
}
```


## Optional Data

std::optional

c++17特性

optional修饰的数据可有可无

optional用法

```cpp
#include <iostream>
#include <fstream>
#include <optional>

#define log(x) std::cout << x << std::endl

std::optional<std::string> ReadFileAsString(const std::string& filepath) {
    std::ifstream stream(filepath);
    if (stream) {
        std::string result;
        // read file
        stream.close();
        return result;
    }
    return {};
}

int main() {
    std::optional<std::string> data = ReadFileAsString("data.txt");
    std::string value = data.value_or("not present");
    if (data) { // if(data.has_value)
        log("read successfully");
    } else {
        //std::string& string = *data;
        data.value();
        log("file could not be opened");
    }
    return 0;
}
```



## Multiple Types of Data in A Single Variable

std::variant

c++17特性

它和union的区别是，union的大小是最大变量的长度，variant的长度是每个类型长度和

```cpp
#include <iostream>
#include <variant>

#define log(x) std::cout << x << std::endl

int main() {
    std::variant<std::string, int> data;
    // 要按这个顺序读取
    data = "dyh";
    log(std::get<std::string>(data));
    data = 12;
    log(std::get<int>(data));
    log(data.index());
    if (auto val = std::get_if<std::string>(&data)) {
        // 如果不是string，返回NULL
        std::string& v = *val;
    }
    return 0;
}

//dyh
//12
//1
```



variant在读取文件的应用

```cpp
enum class ErrorCode {
    None = 0, NotFound = 1, NotAccess = 2;
};

std::variant<std::string, ErrorCode> ReadFileAsStirng() {
    return {};
}
```


## Store Any Data

std::any c++17特性

any和variant的区别，any会动态分配空间，variant要先指定类型

应该要多用variant，而不是any，variant是安全版的any

```cpp
#include <iostream>
#include <any>
#define log(x) std::cout << x << std::endl

int main() {
    std::any a;
    a = 2;
    a = "hello"; //const char*
    a = std::string("abc");
    log(std::any_cast<std::string>(a));
    return 0;
}
```


## Make C++ Run Faster

用多线程


```cpp
#include <iostream>
#include <future>
#include <vector>

#define log(x) std::cout << x << std::endl

namespace Hazel {

    static std::mutex s_MeshMutex;
    std::vector<Hazel::Ref<Hazel::Mesh>> m_Meshes;

    // void是因为LoadMesh的返回值是void
    std::vector<std::future<void>> m_Futures;

    // 为什么string不传引用，这是生命周期的问题。线程函数参数按值传送，传拷贝，如果传引用要用Ref包裹，
    static void LoadMesh(std::vector<Ref<Mesh>>* meshes, std::string filepath) {
        auto mesh = Mesh::Load(filepath);
        std::lock_guard<std::mutex> lock(s_MeshMutex);
        meshed->push_back(mesh);
    }

    void func() {

#define ASYNC 1
#if ASYNC
        // concurrent for-loop
        for (const auto& file : meshFilepaths) {    // std::launch::async 在不同线程上工作, deferred是根据工作负载自动选线程
            // async返回std::future，要保留这个返回值，因为如果不保留，每次for循环结束后，async就会被摧毁（被析构），而析构需要等待LoadMesh结束，，这样就变成顺序执行
            m_Futures.push_back(std::async(std::launch::async, LoadMesh, &m_Meshes, file));
        }
#else
        // original for-loop
        for (const auto& file : meshFilepaths) {
            m_Meshes.push_back(Mesh::Load(file));
        }
#endif


    }
}


int main() {

    return 0;
}


```



## Make Strings Faster

使用string_view减少内存分配，本质是个指针

```cpp
#include <iostream>
#include <string>

#define log(x) std::cout << x << std::endl

static uint32_t s_AllocCount = 0;

void* operator new(size_t size) {
    s_AllocCount++;
    std::cout << "Allocating " << size << " bytes\n";
    return malloc(size);
}

void Print(const std::string& x) {
    log(x);
}

void Print(std::string_view x) {
    log(x);
}

int main() {
    std::string name = "yhdai"; // 把string换成const char*更快，这样后面不需要加c_str()
    Print(name);
    //std::string firstName = name.substr(0, 2);
    //std::string lastName = name.substr(2, 3);
    log(s_AllocCount);  // 0 不同编译器有不同结果
    //减少字符串分配的一种方法是用string_view，本质是一个指针
    std::string_view firstName(name.c_str(), 2);
    std::string_view lastName(name.c_str() + 2, 3);
    Print(firstName);
    Print(lastName);
    return 0;
}

//yhdai
//0
//yh
//dai
```


## Track Memory Allocation the Easy Way


```cpp
#include <iostream>
#include <string>
#include <memory>

#define log(x) std::cout << x << std::endl

struct AllocationMetrics {
    uint32_t TotalAllocated = 0;
    uint32_t TotalFreed = 0;
    uint32_t CurrentUsage() const {return TotalAllocated - TotalFreed;}
};

static AllocationMetrics allocationMetrics;

void* operator new(size_t size) {
    allocationMetrics.TotalAllocated += size;
    return malloc(size);
}

void operator delete(void* memory, size_t size) {
    allocationMetrics.TotalFreed += size;
    free(memory);
}

static void PrintMemoryUsage() {
    std::cout << "memory usage: " << allocationMetrics.CurrentUsage() << " bytes\n";
}

struct obj {
    int x, y, z;
};

int main() {
    PrintMemoryUsage();
    std::string str = "dddyyyhhh";
    PrintMemoryUsage();
    {
        std::unique_ptr<obj> ptr = std::make_unique<obj>();
        PrintMemoryUsage();
    }
    PrintMemoryUsage();
    return 0;
}

//memory usage: 0 bytes
//memory usage: 0 bytes
//memory usage: 12 bytes
//memory usage: 0 bytes
```


## Lvalues and Rvalues

通常人们会说左值是等号左边的值，右值是等号右边的值，这不一定对。

左值一般指某个地址的值，右值一般指一个没有地址的数据，暂时的数据


```cpp
#include <iostream>

int& func() {
    static int v = 10;
    return v;
}

#define log(x) std::cout << x << std::endl

int main() {
    int a = 5;
    func() = 3; // func返回int&可以，它是左值，返回int不行
    func() = a;
    return 0;
}
```

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

int main() {
    int a = 5;
    int& b = a;
    //int& c = 3; // wrong 右值不能赋给左值引用
    const int& c = 3;   // ok 等价于int tmp = 3; int& c = tmp;
    return 0;
}
```


一种检查左值还是右值的方法，不加const的类型引用，这只接收左值，不接受右值，加上const都接收

```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

void Print(std::string& str) {
    std::cout << str << std::endl;
}

void Print2(const std::string& str) {
    std::cout << str << std::endl;
}

int main() {
    // a,b,c is lvalue, "qwe", "asd", a + b is rvalue
    std::string a = "qwe";
    std::string b = "asd";
    std::string c = a + b;
    Print(a);
    //Print(a + b);   // wrong
    Print2(a + b);  
    return 0;
}

//qwe
//qweasd
```

函数参数只接受右值，不接受左值，用&&


```cpp
#include <iostream>

#define log(x) std::cout << x << std::endl

void Print(std::string&& str) {
    std::cout << str << std::endl;
}

void Print2(const std::string& str) {
    std::cout << str << std::endl;
}

int main() {
    // a,b,c is lvalue, "qwe", "asd", a + b is rvalue
    std::string a = "qwe";
    std::string b = "asd";
    std::string c = a + b;
    //Print(a);     // wrong
    Print(a + b);
    Print("qwe");
    return 0;
}

//qweasd
//qwe
```


## Move Semantics

```cpp
#include <iostream>
#include <cstring>

#define log(x) std::cout << x << std::endl

class String {
public:
    String() = default;

    String(const char *str) {
        printf("created\n");
        m_size = strlen(str);
        m_data = new char[m_size];
        memcpy(m_data, str, m_size);
    }

    String(const String& other) {
        printf("copied\n");
        m_size = other.m_size;
        m_data = new char[m_size];
        memcpy(m_data, other.m_data, m_size);
    }

    ~String() {
        printf("destroyed");
        delete m_data;
    }

    void Print() {
        for (uint32_t i = 0; i < m_size; ++i) {
            printf("%c", m_data[i]);
        }
        printf("\n");
    }

private:
    char *m_data;
    uint32_t m_size;
};

class Entity {
public:
    Entity(const String& name) : m_name(name) {

    }
    void PrintName() {
        m_name.Print();
    }

private:
    String m_name;
};

int main() {
    Entity entity("hello");
    entity.PrintName();
    return 0;
}

//created
//copied
//hello
```

以上代码可以发现hello被分配了两次，一次在main函数里，一次在String的构造函数的new里，hello会在Entity的String m_name里被拷贝（通过new）。那么是否有方法在main函数里分配一次，然后把这段内存“移动”（实际数据并不是真正移动了）到Entity的String m_name里？

这样实现move

```cpp
#include <iostream>
#include <cstring>

#define log(x) std::cout << x << std::endl

class String {
public:
    String() = default;

    String(const char *str) {
        printf("created\n");
        m_size = strlen(str);
        m_data = new char[m_size];
        memcpy(m_data, str, m_size);
    }

    String(const String& other) {
        // 深拷贝
        printf("copied\n");
        m_size = other.m_size;
        m_data = new char[m_size];
        memcpy(m_data, other.m_data, m_size);
    }

    String(String&& other) noexcept {   // 只能传右值，右值优先选这个函数
        // implement MOVE
        //相当于直接占据那块内存，指针指向那块内存，原来的指针（other）让它失效(因为析构里有delete)
        printf("moved");
        m_size = other.m_size;
        m_data = other.m_data;

        other.m_size = 0;
        other.m_data = nullptr;
    }

    ~String() {
        printf("destroyed\n");
        delete m_data;
    }

    void Print() {
        for (uint32_t i = 0; i < m_size; ++i) {
            printf("%c", m_data[i]);
        }
        printf("\n");
    }

private:
    char *m_data;
    uint32_t m_size;
};

class Entity {
public:
    Entity(const String& name) : m_name(name) {

    }
    Entity(String&& name) : m_name(name) {  //只传右值，右值优先选这个函数

    }
    void PrintName() {
        m_name.Print();
    }

private:
    String m_name;
};

int main() {
    Entity entity("hello");
    entity.PrintName();
    return 0;
}

//created
//copied
//destroyed
//hello
//destroyed
```


但是还是有copy，这是因为还是使用了String(const String& other)，应该使用Entity(String&& name) : m_name((String&&) name) 或者Entity(String&& name) : m_name(std::move(name))


```cpp
#include <iostream>
#include <cstring>

#define log(x) std::cout << x << std::endl

class String {
public:
    String() = default;

    String(const char *str) {
        printf("created\n");
        m_size = strlen(str);
        m_data = new char[m_size];
        memcpy(m_data, str, m_size);
    }

    String(const String& other) {
        // 深拷贝
        printf("copied\n");
        m_size = other.m_size;
        m_data = new char[m_size];
        memcpy(m_data, other.m_data, m_size);
    }

    String(String&& other) noexcept {   // 只能传右值，右值优先选这个函数
        // implement MOVE
        //相当于直接占据那块内存，指针指向那块内存，原来的指针（other）让它失效(因为析构里有delete)
        printf("moved\n");
        m_size = other.m_size;
        m_data = other.m_data;

        other.m_size = 0;
        other.m_data = nullptr;
    }

    ~String() {
        printf("destroyed\n");
        delete m_data;
    }

    void Print() {
        for (uint32_t i = 0; i < m_size; ++i) {
            printf("%c", m_data[i]);
        }
        printf("\n");
    }

private:
    char *m_data;
    uint32_t m_size;
};

class Entity {
public:
    Entity(const String& name) : m_name(name) {

    }
    Entity(String&& name) : m_name((String&&) name) {  //只传右值，右值优先选这个函数

    }
    void PrintName() {
        m_name.Print();
    }

private:
    String m_name;
};

int main() {
    Entity entity("hello");
    entity.PrintName();
    return 0;
}

//created
//moved
//destroyed
//hello
//destroyed
```



## Move

move把一个对象“移到”一个地方

```cpp
#include <iostream>
#include <cstring>

#define log(x) std::cout << x << std::endl

class String {
public:
    String() = default;

    String(const char *str) {
        printf("created\n");
        m_size = strlen(str);
        m_data = new char[m_size];
        memcpy(m_data, str, m_size);
    }

    String(const String& other) {
        // 深拷贝
        printf("copied\n");
        m_size = other.m_size;
        m_data = new char[m_size];
        memcpy(m_data, other.m_data, m_size);
    }

    String(String&& other) noexcept {   // 只能传右值，右值优先选这个函数
        // implement MOVE
        //相当于直接占据那块内存，指针指向那块内存，原来的指针（other）让它失效(因为析构里有delete)
        printf("moved\n");
        m_size = other.m_size;
        m_data = other.m_data;

        other.m_size = 0;
        other.m_data = nullptr;
    }

    String& operator=(String&& other) noexcept {
        printf("moved\n");

        if (this != &other) {   // 防止 a = std::move(a);
            delete [] m_data;

            m_size = other.m_size;
            m_data = other.m_data;

            other.m_size = 0;
            other.m_data = nullptr;
        }

        return *this;
    }

    ~String() {
        printf("destroyed\n");
        delete m_data;
    }

    void Print() {
        for (uint32_t i = 0; i < m_size; ++i) {
            printf("%c", m_data[i]);
        }
        printf("\n");
    }

private:
    char *m_data;
    uint32_t m_size;
};

class Entity {
public:
    Entity(const String& name) : m_name(name) {

    }
    Entity(String&& name) : m_name(std::move(name)) {  //只传右值，右值优先选这个函数

    }
    void PrintName() {
        m_name.Print();
    }

private:
    String m_name;
};

int main() {
    Entity entity("hello");
    entity.PrintName();

    String s = "world";
    String t = std::move(s);

    //s.Print();  // wrong s is moved
    //t = s;      // wrong

    puts("");

    String apple = "Apple";
    String q;
    //q = apple;  // wrong
    q = std::move(apple);   // ok
    String w = apple;   // ok 没有用到等号运算符，用构造函数
    String e = std::move(apple);    // ok 用move版构造函数
    return 0;
}


```


## How to Learn C++

看需要的或感兴趣的开源项目


## Conclusions

不会真有人不学rust学c++吧😅
