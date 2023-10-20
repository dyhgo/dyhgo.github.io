# gflag


[文档链接](https://gflags.github.io/gflags/)

gflags相当于代码中的常量

gflags读取命令行的flags，然后修改代码中相应名字的“常量”

主要有三个函数

`DEFINE_xxx()`，定义flag名，默认值，描述信息，flag名为`FLAGS_xxx`

描述信息可以使用`--help`显示

```cpp
#include <gflags/gflags.h>
DEFINE_bool(big_menu, true, "Include 'advanced' options in the menu listing");
DEFINE_string(languages, "english,french,german",
                 "comma-separated list of languages to offer in the 'lang' menu");

```

`DECLARE_xxx()`，在不同的文件中声明，相当于`extern FLAGS_xxx`

```cpp
DECLARE_bool(big_menu);
```

在main函数第一行，表示我要解析传入的参数，并对代码中设定的flag修改

```cpp
gflags::ParseCommandLineFlags(&argc, &argv, true);
```

可以在命令行中输入

```shell
app_containing_foo --nobig_menu -languages="chinese,japanese,korean" ...
```

其中bool型flag可以在前面加no来表示值为false，此处-和--都可以，=可以省略
