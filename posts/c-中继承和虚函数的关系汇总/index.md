# C++中继承和虚函数的关系汇总


类C 继承 类B 继承 类A

基类指针指向派生类对象

如果是C->A, B->A，那么操作A和C时，不会触碰到B

析构函数和成员函数之间互不干扰
## 一级继承 （B->A)

### A没有虚函数

```cpp
#include <bits/stdc++.h>

using namespace std;

class A {
public:
    A() {
        cout << "A create" << '\n';
    }
    void x() {
        cout << "A" << '\n';
    }
    ~A() {
        cout << "A destroy" << '\n';
    }
};

class B : public A {
public:
    B() {
        cout << "B create" << '\n';
    }
    void x() {
        cout << "B" << '\n';
    }
    ~B() {
        cout << "B destroy" << '\n';
    }
};

int main() {

    A* a = new B;
    a->x();
    delete a;

    return 0;
}

A create
B create
A
A destroy
```

### A析构函数是虚函数

```cpp
#include <bits/stdc++.h>

using namespace std;

class A {
public:
    A() {
        cout << "A create" << '\n';
    }
    void x() {
        cout << "A" << '\n';
    }
    virtual ~A() {
        cout << "A destroy" << '\n';
    }
};

class B : public A {
public:
    B() {
        cout << "B create" << '\n';
    }
    void x() {
        cout << "B" << '\n';
    }
    ~B() {
        cout << "B destroy" << '\n';
    }
};

int main() {

    A* a = new B;
    a->x();
    delete a;

    return 0;
}

A create
B create
A
B destroy
A destroy
```


### A成员函数是虚函数

```cpp
#include <bits/stdc++.h>

using namespace std;

class A {
public:
    A() {
        cout << "A create" << '\n';
    }
    virtual void x() {
        cout << "A" << '\n';
    }
    ~A() {
        cout << "A destroy" << '\n';
    }
};

class B : public A {
public:
    B() {
        cout << "B create" << '\n';
    }
    void x() {
        cout << "B" << '\n';
    }
    ~B() {
        cout << "B destroy" << '\n';
    }
};

int main() {

    A* a = new B;
    a->x();
    delete a;

    return 0;
}


A create
B create
B
A destroy
```


## 二级继承 (C->B->A)

### A析构函数是虚函数（B的析构函数也一定是虚函数）

```cpp
#include <bits/stdc++.h>

using namespace std;

class A {
public:
    A() {
        cout << "A create" << '\n';
    }
    void x() {
        cout << "A" << '\n';
    }
    virtual ~A() {
        cout << "A destroy" << '\n';
    }
};

class B : public A {
public:
    B() {
        cout << "B create" << '\n';
    }
    void x() {
        cout << "B" << '\n';
    }
    ~B() {
        cout << "B destroy" << '\n';
    }
};

class C : public B {
public:
    C() {
        cout << "C create" << '\n';
    }
    void x() {
        cout << "C" << '\n';
    }
    ~C() {
        cout << "C destroy" << '\n';
    }
};


int main() {

    A* a = new C;
    a->x();
    delete a;

    cout << endl;

    B* b = new C;
    b->x();
    delete b;


    return 0;
}


A create
B create
C create
A
C destroy
B destroy
A destroy

A create
B create
C create
B
C destroy
B destroy
A destroy
```

### A析构函数不是虚函数，B析构函数不是虚函数

```cpp
#include <bits/stdc++.h>

using namespace std;

class A {
public:
    A() {
        cout << "A create" << '\n';
    }
    void x() {
        cout << "A" << '\n';
    }
    ~A() {
        cout << "A destroy" << '\n';
    }
};

class B : public A {
public:
    B() {
        cout << "B create" << '\n';
    }
    void x() {
        cout << "B" << '\n';
    }
    ~B() {
        cout << "B destroy" << '\n';
    }
};

class C : public B {
public:
    C() {
        cout << "C create" << '\n';
    }
    void x() {
        cout << "C" << '\n';
    }
    ~C() {
        cout << "C destroy" << '\n';
    }
};


int main() {

    A* a = new C;
    a->x();
    delete a;

    cout << endl;

    B* b = new C;
    b->x();
    delete b;


    return 0;
}


A create
B create
C create
A
A destroy

A create
B create
C create
B
B destroy
A destroy
```

### A析构函数不是虚函数，B析构函数是虚函数

```cpp
#include <bits/stdc++.h>

using namespace std;

class A {
public:
    A() {
        cout << "A create" << '\n';
    }
    void x() {
        cout << "A" << '\n';
    }
    ~A() {
        cout << "A destroy" << '\n';
    }
};

class B : public A {
public:
    B() {
        cout << "B create" << '\n';
    }
    void x() {
        cout << "B" << '\n';
    }
    virtual ~B() {
        cout << "B destroy" << '\n';
    }
};

class C : public B {
public:
    C() {
        cout << "C create" << '\n';
    }
    void x() {
        cout << "C" << '\n';
    }
    ~C() {
        cout << "C destroy" << '\n';
    }
};


int main() {

    A* a = new C;
    a->x();
    delete a;

    cout << endl;

    B* b = new C;
    b->x();
    delete b;


    return 0;
}


A create
B create
C create
A
A destroy

A create
B create
C create
B
C destroy
B destroy
A destroy
```

### A成员函数是虚函数（B成员函数也一定是虚函数）

```cpp
#include <bits/stdc++.h>

using namespace std;

class A {
public:
    A() {
        cout << "A create" << '\n';
    }
    virtual void x() {
        cout << "A" << '\n';
    }
    ~A() {
        cout << "A destroy" << '\n';
    }
};

class B : public A {
public:
    B() {
        cout << "B create" << '\n';
    }
    void x() {
        cout << "B" << '\n';
    }
    ~B() {
        cout << "B destroy" << '\n';
    }
};

class C : public B {
public:
    C() {
        cout << "C create" << '\n';
    }
    void x() {
        cout << "C" << '\n';
    }
    ~C() {
        cout << "C destroy" << '\n';
    }
};


int main() {

    A* a = new C;
    a->x();
    delete a;

    cout << endl;

    B* b = new C;
    b->x();
    delete b;


    return 0;
}

A create
B create
C create
C
A destroy

A create
B create
C create
C
B destroy
A destroy
```




### A成员函数不是虚函数，B成员函数是虚函数

```cpp
#include <bits/stdc++.h>

using namespace std;

class A {
public:
    A() {
        cout << "A create" << '\n';
    }
    void x() {
        cout << "A" << '\n';
    }
    ~A() {
        cout << "A destroy" << '\n';
    }
};

class B : public A {
public:
    B() {
        cout << "B create" << '\n';
    }
    virtual void x() {
        cout << "B" << '\n';
    }
    ~B() {
        cout << "B destroy" << '\n';
    }
};

class C : public B {
public:
    C() {
        cout << "C create" << '\n';
    }
    void x() {
        cout << "C" << '\n';
    }
    ~C() {
        cout << "C destroy" << '\n';
    }
};


int main() {

    A* a = new C;
    a->x();
    delete a;

    cout << endl;

    B* b = new C;
    b->x();
    delete b;


    return 0;
}


A create
B create
C create
A
A destroy

A create
B create
C create
C
B destroy
A destroy
```

### AB都是虚的

```cpp
#include <bits/stdc++.h>

using namespace std;

class A {
public:
    A() {
        cout << "A create" << '\n';
    }
    virtual void x() {
        cout << "A" << '\n';
    }
    virtual ~A() {
        cout << "A destroy" << '\n';
    }
};

class B : public A {
public:
    B() {
        cout << "B create" << '\n';
    }
    void x() {
        cout << "B" << '\n';
    }
    ~B() {
        cout << "B destroy" << '\n';
    }
};

class C : public B {
public:
    C() {
        cout << "C create" << '\n';
    }
    void x() {
        cout << "C" << '\n';
    }
    ~C() {
        cout << "C destroy" << '\n';
    }
};


int main() {

    A* a = new C;
    a->x();
    delete a;

    cout << endl;

    B* b = new C;
    b->x();
    delete b;


    return 0;
}


A create
B create
C create
C
C destroy
B destroy
A destroy

A create
B create
C create
C
C destroy
B destroy
A destroy
```

