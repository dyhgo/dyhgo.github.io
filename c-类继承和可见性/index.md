# C++类继承和可见性



三种继承方式，是否真正继承了，子类可访问吗，外部可访问吗

三种可见性，类自己可访问吗，外部可访问吗

继承默认是private继承

## 继承和可见性问题

private、protected、public

public大家都可以访问、private只有类成员可以访问（友元也行）、protected只有基类和派生类可以访问

友元，把类或函数声明成一个类的友元，那么它可以访问这个类的private变量

| 访问范围/是否继承（这一列）、父类成员可见性（这一行） |   public   | protected  | Private |
| :---------------------------------------------------: | :--------: | ---------- | ------- |
|                         类内                          |     ✅      | ✅          | ✅       |
|                         外部                          |     ✅      | ❌          | ❌       |
|                    子类public继承                     |  ✅public   | ✅protected | ❌       |
|                   子类protected继承                   | ✅protected | ✅protected | ❌       |
|                    子类private继承                    |  ✅private  | ✅private   | ❌       |




