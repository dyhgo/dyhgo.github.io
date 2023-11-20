# mysql



## 基础

### SQL

#### SQL语言分类

![在这里插入图片描述](https://img-blog.csdnimg.cn/2afe0b4cdc0245b98d53514141396a15.png)

#### DDL


##### 数据类型

数值型

![请添加图片描述](https://img-blog.csdnimg.cn/1148cd5ca9e743c0a5fe8a5853ab8af6.png)

字符串类型

![请添加图片描述](https://img-blog.csdnimg.cn/aa69d47a96fb4404a688d71fdb51c6d9.png)

日期和时间型

![请添加图片描述](https://img-blog.csdnimg.cn/5fe2320a10ca4bc0bbfe6ea349d4bec7.png)

##### 数据库

查数据库`show databases;`

查当前数据库`select database();`

增加数据库`create database [if not exists]  xxx [default charset xxx] [collate xxx];`

删除数据`drop database [if exists] xxx;`

使用数据库`use xxx;`

##### 表

查询当前数据库的所有表`show tables;`

查询某个表的结构`desc xxx;`

查询建表的语句`show create table xxx;`

创建表


```sql
create table xxx(
	id int comment 'student id',
	name varchar(20) comment 'name'
) comment 'student table';
```

对已存在的表添加新的字段`alter table {table name} add {field name} {type} [comment] [restraint];`


对已存在的表修改某个字段的数据类型`alter table {table name} modify {field name} {new type};`


对已存在的表修改某个字段`alter table {table name} change {old field name} {new field name} {type} [comment] [restraint];`

删除字段`alter table {table name} drop {filed name};`

修改表名`alter table {table name} rename to {new table name};`

#### DML

添加数据
`insert into {table name} ( {field name1},  {field name2}, ...) values ( {value1}, {value2}, ...);`

给全部字段添加数据
`insert into {table name} values ( {value1}, {value2}, ...);` 

一次性插入多条数据

修改某条数据
`update {table name} set {field name1} = {value1},  {field name2} =  {value2}, ... [where...];`

删除某条数据
`delete from {table name} [where...];`

#### DQL

```sql
select {fields}
from {tables}
where {conditions}
group by {group fields}
having {conditions}
order by {sorting fields}
limit {args};
```

##### 基础查询

查询几个字段的记录

以下用`fd`代替`field name`，`tb`代替`table name`，`fds`代替`{fd1}, {fd2}, ...`

`select {fd1}, {fd2}, ... from {tb};` 

`select * from {tb};`

设置别名，设置别名

`select {fd1} [as alias1], {fd2} [as alias2] ... from {tb};`

去除重复记录

`select distinct {fds} from {tb}`

##### 条件查询

##### 聚合函数

count min max avg sum

##### 分组查询

`group by  {fd} having {condition}`

##### 排序查询

`order by {fd1} asc|desc, {fd2} asc|desc;`先按fd1排，然后再排fd2

asc可以省略

##### 分页查询

##### 语句的执行顺序



```sql
select {fields} 4
from {tables} 1
where {conditions} 2
group by {group fields} 3
having {conditions} 
order by {sorting fields} 5
limit {args} 6; 
```


#### DCL

### 函数


字符串函数

![在这里插入图片描述](https://img-blog.csdnimg.cn/947dfa4f78a647189d9a7412a2a851a4.png)

数值函数

![在这里插入图片描述](https://img-blog.csdnimg.cn/eb1ec84ccb204e15a86dde948af26bf8.png)

日期函数

![在这里插入图片描述](https://img-blog.csdnimg.cn/95f7104fd1ff498498ccb584112d521b.png)

流程函数

![在这里插入图片描述](https://img-blog.csdnimg.cn/f561b692969b41c781c680f2995f43f8.png)

### 约束

![请添加图片描述](https://img-blog.csdnimg.cn/ac0a8b12032f4411a3b6721d6bab54a6.png)

外键相关的删除更新行为

![请添加图片描述](https://img-blog.csdnimg.cn/2ecb19d719d34ef1883f11357e6cc205.png)

### 多表查询

#### 内连接

查询两张表交集的部分

隐式内连接

`select {fds} from {tbs} where {condition};`					

显示内连接

`select {fds} from {tb1} [inner] join {tb2} on {condition};`

#### 外连接

查询某个表所有的信息加上另个相关联的表的部分信息就是外连接

左外连接

`select {fds} from {tb1} left [outer] join {tb2} on {condition};`

右外连接

`select {fds} from {tb1} right [outer] join {tb2} on {condition};`

#### 自连接

必须起别名

`select {fds} from {tb1} {alias1} join {tb1} {alias2} on {condition};`


自连接可以包含内连接和外连接，只要语法和内连接和外连接一样就行

#### 联合查询

把两个查询结果联合成一张表

`select {fds} from {tbs} ... union [all] select {fds} from {tbs} ...;`

加all表示不对两次查询的结果去重

与or的区别，如果条件很多则选择union性能更好，查询条件较少，选择or

#### 子查询

子查询就是where语句的条件是DQL

##### 标量子查询

子查询的结果是一行一列

##### 行子查询

子查询的结果是一行多列

![请添加图片描述](https://img-blog.csdnimg.cn/deb83a4064c54049b7f97559e1b53e91.png)

##### 列子查询

子查询的结果是一列多行

![请添加图片描述](https://img-blog.csdnimg.cn/deb83a4064c54049b7f97559e1b53e91.png)

##### 表子查询

子查询结果是多行多列

### 事务

查看事务是自动提交还是手动提交

`select @@autocommit;`

如果是1，是自动提交，如果是0，是手动提交

设置提交方式

`set @@autocommit=0;`

提交事务

commit;`

回滚事务，撤销所有未提交的修改

`rollback;`

开启事务

`start transaction;`

`begin;`


#### ACID

![在这里插入图片描述](https://img-blog.csdnimg.cn/2e5d10d492934c89ad5177e3f428bfcd.png)

#### 并发事务带来的问题

（没懂）

![在这里插入图片描述](https://img-blog.csdnimg.cn/b81bb31e1f3f4484b2aa09a36b8adf45.png)
#### 事务隔离级别（重要）

![在这里插入图片描述](https://img-blog.csdnimg.cn/e4bcdfed6ef74a6f9ac76dd6a630ecef.png)

查看事务隔离级别

`select @@transaction_isolation;`

设置事务隔离级别

`set [session|global] transaction isolation level {read uncommitted | read committed | repeatable read | serializable};`

## 进阶

mysql体系结构

![请添加图片描述](https://img-blog.csdnimg.cn/368946c889404bc684bc51db9067e5cc.png)

### 存储引擎

存储引擎就是存储数据、建立索引、更新/查询数据等技术的实现方式。存储引擎是基于表的，而不是基于库的，所以存储引擎也叫做表类型

查当前数据库支持的存储引擎

`show engines;`

#### InnoDB

特点

 - DML操作遵循ACID模型，支持事务
 - 行级锁，提高并发访问性能
 - 支持外键约束


InnoDB把每张数据库存在xxx.ibd文件中，xxx是表名

InnoDB的逻辑存储结构

![请添加图片描述](https://img-blog.csdnimg.cn/4641aaeafb7c4dac9ff2bc239ad7738d.png)

#### MyISAM

mysql早期存储引擎

特点

- 不支持事务，不支持外键
- 支持表锁，不支持行锁
- 访问速度快

文件

- xxx.sdi 存储表结构信息
- xxx.MYD 存储数据
- xxx.MYI 存储引擎

#### Memory

memory引擎的表数据存储在内存中，容易收到断电影响，所以作临时表或缓存表用

特点

- 内存存放，速度快
- hash索引

文件

xxx.sdi 存储表结构信息

存储引擎对比（重要）

![请添加图片描述](https://img-blog.csdnimg.cn/7147bcac11ab490bb9b40c879e2dc71f.png)

存储引擎选择

![请添加图片描述](https://img-blog.csdnimg.cn/0905f519db5a4a7aaaf40875649e440b.png)

现在一般使用innodb，myisam被mongodb取代，memory被redis取代


### 索引 （重要）

#### 结构

##### b树

##### b+树

##### hash表

![在这里插入图片描述](https://img-blog.csdnimg.cn/a390ddc3929e46c781ff482a5c344844.png)

#### 分类

![在这里插入图片描述](https://img-blog.csdnimg.cn/ce9c8135c77f4f0e8085ec0b498e5ab6.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/7c18ca0f2f534b78b56da2b623b354c8.png)

有了聚集索引和二级索引后，查数据用的是回表查询

#### 语法

创建索引

`create [unique | fulltext] index {index_name} on {table name} ({col_name1}, {col_name2}, ...);`

查看索引

`show index from {table_name};`

删除索引

`drop index {index_name} on {table_name};`

#### SQL性能分析

##### 查看数据库增删改查的频次

`show global status like 'Com_______';`

##### 慢查询日志

##### 查看每条语句耗时

`show profiles;`

##### 查询执行语句详情

`explain {language};`

 

#### 使用规则

索引可以大幅提升查询时间


##### 最左前缀法则

如果索引了多列（联合索引），要遵守最左前缀法则。最左前缀法则指的是查询从索引的最左列开始，并且不跳过索引中的列，如果跳过某一列，索引将部分失效（后面的字段索引失效）

联合索引中，出现范围查询（指大于和小于），范围查询右侧的列索引失效

所以尽量用大于等于和小于等于


##### 索引失效情况

在索引列上进行运算操作，索引失效

字符串没加引号，失效

模糊查询中，尾部模糊不会失效，头部模糊会失效 

or连接的所有条件必须都有索引，否则整个or语句不会用到索引

mysql评估使用索引比全表扫描慢，则不使用索引


##### SQL提示

建议mysql使用特定索引

`... from ... use index ({index name}) where ...;`

不使用特定索引

`... ignore index ...;`

强制使用特定索引

`... force index ...;`

##### 覆盖索引和回表查询

注意这里关注的是查询的字段就是select后面的内容而不是查询的条件（where后面的内容）

覆盖索引指的是查询的字段最好是联合索引的子集（可以加上id，如果id是聚集索引的索引项），否则会回表查询

回表查询就是先从二级索引中查，然后再到聚集索引中查

explain语句的extra字段中，`using where; using index`不需要回表查询，`using index condition`就是要回表查询

##### 前缀索引

对于varchar，text的字符串类型，把它们用做索引时，很耗费开销，所以取字符串的前缀作索引 

`create index {index_name} on {table_name}(column(x));`表示取前x个字符

前缀索引如果多个字符串前缀相同在b+树中怎么查询？先查到一个，然后回表查询比对，不是的话沿链表查询下一个，具体不知道


##### 单列索引和联合索引

一般选择联合索引，单列索引容易造成回表查询



#### 设计原则

![在这里插入图片描述](https://img-blog.csdnimg.cn/b2972c9d21e047ebbb0acd7418cca209.png)


### SQL优化

大部分都涉及到索引

#### 插入数据

##### 插入少量数据

当需要插入多条数据时，使用批量插入

手动提交事务

主键顺序插入

##### 插入大量数据

load

####  主键优化

插入数据最好按主键顺序插入，否则会产生“页分裂” 

当删除数据时会出现“页合并”

![主键设计原则：](https://img-blog.csdnimg.cn/5482efe31fa44808baa0c739fc314bfe.png)

#### order by优化

![在这里插入图片描述](https://img-blog.csdnimg.cn/428738a50abc4eca8140761f382c884f.png)

using filesort和using index在explain语句的extra字段查看

using filesort慢，using index快

尽量把using filesort优化成using index

按照order by后面的字段的顺序和升降序创建对应的索引

前提是要用到覆盖索引（就是查询的字段是索引的子集（可以带主键）），覆盖索引不需要回表查询


#### group by优化

根据group by的条件建立联合索引，注意索引也是满足最左前缀法则，如果有where语句，where后面的条件也纳入最左前缀法则的范畴

#### limit优化

通过覆盖索引和子查询进行优化



#### count优化

![在这里插入图片描述](https://img-blog.csdnimg.cn/484af0d28e2a4d34a388ca550805ee86.png)
性能

count(字段) < count(主键) < count(1) < count(*)

#### update优化

update的where跟着的字段要是索引，不然两个事务共同执行时行锁变成表锁，并发性能降低

innodb的行锁是针对索引加的锁，不是针对记录加的锁，并且该索引不能失效，否则会从行锁变成表锁

### 视图

创建视图

`create [or replace] view {view_name} as select ...;`

查看创建视图的语句

`show create view {view_name};`

查看视图数据，和表的操作一致

`select * from {view_name};`

修改视图

`create [or replace] view {view_name} as select ...;`

或者

`alter view {view_name} as select ...;`

删除视图

`drop view [if exists] {view_name};`

对视图的其他增删改查操作和表操作的语法一样

注意：对视图的增删改操作将会影响基表，对基表的修改会影响视图

注意：如果一个视图基于基于表的视图，那么对视图的修改仍然会影响基表

注意：视图可以基于视图创建


#### 检查选项

由于对视图的修改会影响到基表或基视图

如果不加检查选项，那么对视图的修改不会检查视图创建语句的where条件

如果对视图增加或修改一条不满足条件的数据，基表或基视图会正常增加或修改，但是视图不显示（因为不满足条件）

要想做到无法增加或修改不满足条件的数据就要使用检查选项

##### cascaded

在创建视图的语句后面加上`with cascaded check option;`则对视图进行增加修改时会检查这条数据是否满足创建视图的语句的where条件，并且还会级联地检查这条数据是否满足基视图的where条件

对视图增加或修改数据的判断逻辑是，如果这个视图没有加检查选项，则不做检查，然后检查这个视图基于的视图或表，如果它有加检查选项就检查是否满足条件，如果是级联的，就继续往下检查；如果没加检查选项，就继续查看它基于的表

只要有一个视图加了级联，则它一定会判断这个视图基于的所有视图和表的条件


##### local

local就是只检查当前视图条件，不级联检查它基于的视图条件

注意：要不要检查条件是一定会顺着链路一直进行下去的，但是local只负责当前视图，cascaded则会检查它所有的基视图或基表的条件，默认是cascaded

#### 视图的更新限制

只有当视图中的每一条数据和基表是 一一对应关系时才可以更新

#### 视图的作用

-  把那些经常查询的数据列出来，这样比较直观，也不需要重复写这些查询条件，有点像求质数的预处理操作
- 安全性，给特定的用户提供特定的视图


### 存储过程


就是把多条mysql语句集合在一起

#### 基本语法

创建过程

```sql
create procedure {procedure_name}([{aug1}, {aug2}, {aug3}])
begin
	{sql_statement}
end;
```

调用过程

`call {procedure_name}({aug1}, {aug2}, ...);`

查看该数据库具有的过程

`select * from information_schema.ROUTINES where ROUTINE_SCHEMA='{database_name}';`

查看创建过程的语句

`show create procedure {procedure_name};`

删除过程

`drop procedure [if exists] {procedure_name};`

注意在命令行中执行创建过程语句时，会出现遇到分号提前结束mysql语句的错误

需要写输入以下命令

`delimiter xx`

表示mysql语句由xx结尾，然后把创建过程的语句最后的分号改成xx


#### 变量

变量分为系统变量、用户变量、局部变量

##### 系统变量

系统变量是系统定义的变量

系统变量分为全局变量（global）和会话变量（session）

注意：全局变量会在mysql服务器重启后变成默认值，如果想要永久修改全局变量，则要到`/etc/my.conf`这个文件中修改

查看系统变量（没加session或者global默认是session）

`show [session |  global] variables;`

`show [session | global] variables like 'xxx';`

`select @@[session | global][.]{var_name};`

设置系统变量

`set [session | global] {var_name} = {var_value};`

`set @@[session | global][.]{var_name} = {var_value};`

##### 用户变量

定义和赋值，可以用`:=`，也可以用`=`，推荐使用`:=`，因为mysql的相等和赋值都是`=`，用`:=`不会混淆

`set @{var_name} = xxx [, @{var_name2} = xxx];`

`set @{var_name} := xxx [, @{var_name2} := xxx];`

`select @{var_name} := xxx [, @{var_name2} := xxx];`

把从表中查询到的某些字段（结果）赋值给用户变量

`select {field_name} into @{var_name} from {table_name};`

查看

`select @{var_name};`

注意：用户变量不需要声明和初始化，但是如果没有初始化，则默认值是null


##### 局部变量

局部变量需要声明，常用在过程中的局部变量和输入参数，局部变量的作用范围是begin end之间

声明

`declare {var_name} {var_type} [default ...];`

变量类型就是数据库字段类型

赋值

`set {var_name} = {var_value};`

`set {var_name} := {var_value};`

`select {field_name} into {var_name} from {table_name} ... ;`


#### 条件语句

##### if

if判断写在过程的begin和end内

语法 

```sql
if {condition1} then
	...
elseif {condition2} then
	...
else
	...
end if;
```

##### case

语法

```sql
case {var}
	when {value1} then ...
	[when {value2} then ...
	[else ...]
end case;
```

```sql
case 
	when {condition1} then ...
	[when {condition2} then ...
	[else ...]
end case;
```


#### 参数和返回值

参数有三种，in表示传入的参数，out表示返回值，inout既可以作为形参，也可以作为返回值

语法

```sql
create procedure {procedure_name}([in|out|inout {para_name} {para_type}])
begin
	...
end;
```

inout变量有点像传引用

#### 循环

##### while

```sql
while {condition} do
	...
end while;
```

##### repeat

```sql
repeat
	...
	until {condition}
end repeat;
```

##### loop

```sql
[{loop_name1}:] loop
	...
	iterate {loop_name1};
	leave {loop_name1};
	...
end loop [{loop_name1}];
```


#### 指针

用来对查询结果集进行操作

声明指针

`declare {cursor_name} cursor for {select_statement};`

打开指针

`open {cursor_name};`

获取指针记录

`fetch {cursor_name} into {var1} [, {var2}, {var3}, ...];`

关闭指针

`close {cursor_name};`

注意：在过程中，局部变量的声明要在指针的声明之前

注意：指针指代查询结果集的一行，每次fetch之后，指针自动跳到下一行

#### 处理程序

可以定义在一个流程中，如果遇到了某种情况的相应处理措施

handler_action是处理措施，有两种 continue继续执行当前程序，exit退出当前程序

condition_value是触发条件

- sqlstate {value} ，这个value是状态码，比如02000
- sqlwarning，所有以01开头的状态码
- not found，所有以02开头的状态码
- sqlexception，除了sqlwarning和not found以外的状态码


声明handler

`declare {handler_action} handler for {condition_value1} [, {condition_value2}, ...] {actions_before_handler_action};`

注意：这里的handler_action的作用范围是所在的begin end块


#### 函数

一种特殊的过程，它一定有返回值，且参数只能是in类型

```sql
create function {function_name}([in] {para_name1} {para_type1}, [[in] {para_name2} {para_type2}])
returns {return_type} deterministic|no sql|reads sql data
begin
	...
	return {return_value};
end;
```

characteristic说明

- deterministic 相同的输入总是产生相同的输出
- no sql 不包含sql语句
- reads sql data 有读数据的语句没有写数据的语句


### 触发器


有三种类型的触发器，并且用old和new来表示旧的数据和新的数据

|类型|old new  |
|--|--|
|  insert类型触发器|new表示新增的数据  |
| update类型的触发器 |old表示旧的数据 new表示更新后的数据 | 
| delete类型触发器|old表示要删除的数据 |



mysql只支持行级触发器（update语句更新了多行就触发多次）不支持语句级触发器（update语句不管更新几行，只要是一条语句就触发一次）

创建触发器

```sql
create trigger {trigger_name}
before|after insert|update|delete --触发触发器的操作
on {table_name} /*被监控的表*/ for each row
begin
	...
end;
```

查看触发器

`show triggers;`

删除触发器，如果不指定数据库名，则默认是当前数据库

`drop trigger [{db_name}.]{trigger_name};`

### 锁 （重要）

#### 全局锁

锁整个数据库

典型的使用场景是数据库要做备份，要先加全局锁

对当前数据库加全局锁

`flush tables with read lock;`

数据库数据备份（注意：这不是mysql语句，而是bash命令）

-h是连接远程数据库

`mysqldump [-h {ip_addr}] -uxxx -pxxx {db_name} > xxx.sql`

释放全局锁

`unlock tables;`

innodb引擎中使用如下语句可以通过不加锁实现数据一致性的备份（快照读方式）

`mysqldump --single-transaction -uxxx -pxxx {db_name} > xxx.sql`



#### 表级锁

表级锁分为表锁、元数据锁、意向锁

##### 表锁

表锁分为表读锁和表写锁（又叫表共享锁和表排他锁）

表读锁允许自己读，不允许自己写，允许别人读，不允许别人写

表写锁允许自己读，允许自己写，不允许别人读，不允许别人写

加锁

`lock tables {tb_name} read|write;`

释放锁

`unlock tables;` 或者客户端断开连接

##### 元数据锁

meta data lock MDL

元数据就是表结构，元数据锁是在访问一张表时系统自动加的，为了避免dml和ddl冲突，保证读写操作的正确性

具体客户端在对数据表做操作时加哪些锁，看下表



![请添加图片描述](https://img-blog.csdnimg.cn/a4ceddb9c5324a058ec68746eae20e5d.png)
元数据锁会自动释放，当这条语句执行完后自动释放，当使用事务时，在commit之后才算语句执行完，才释放锁

查看元数据锁

`select object_type, object_schema, object_name, lock_type, lock_duration from performance_schema.metadata_locks;`

##### 意向锁

intension lock

意向锁是为了解决表锁和行锁的冲突。当对一行数据进行修改时会加行锁，这个时候如果别人就不能加表锁，要加表锁时要一行一行判断是否有行锁，很耗时，所以在加入行锁的时候再加入意向锁，当别人要加表锁时，只需要判断是否有意向锁就行

意向锁分为意向共享锁 is，与表读锁兼容，与表写锁互斥

意向排他锁ix，与表读锁和表写锁都互斥

意向锁之间不会互斥

查看意向锁

`select object_schema, object_name, index_name, lock_type, lock_mode, lock_data from performance_schema.data_locks;`

在select语句后面加上`lock in share mode`就可以加上行共享锁和意向共享锁，当这条语句执行完后（如果时事务，则要提交）会自动释放锁

update语句会自动加行排他锁和意向排他锁

#### 行级锁

应用在innodb存储引擎中

行级锁分为行锁（record lock）、间隙锁（gap lock）、临键锁（next-key lock）


![请添加图片描述](https://img-blog.csdnimg.cn/6dd641b4f2954dc88b0f3c00b471b020.png)

rc时read commmi，rr时repeatable read

行锁

![请添加图片描述](https://img-blog.csdnimg.cn/c04bfb2e277147838eca4815f6eb8433.png)

间隙锁

![请添加图片描述](https://img-blog.csdnimg.cn/3d69e5477a16441e83354197ced17d19.png)

临键锁（行锁加间隙锁，锁的是一个记录和记录前的间隙）

此图描述有误

![请添加图片描述](https://img-blog.csdnimg.cn/09d59e011e724588974d3614addaea19.png)


##### 行锁

分为共享锁和排他锁，其实就是读锁和写锁

执行增删改查时加行锁的情况

![请添加图片描述](https://img-blog.csdnimg.cn/29252fe4da864947a1ebc35c5e155f63.png)

注意：加行级锁一定会加意向锁，一般同一时间加的一批行级锁对应一个意向锁

注意：innodb的行级锁都是基于索引来加的，所以如果select语句的where条件不走索引，那么innodb对表中的所有数据都加锁，即锁变成了表锁。表锁是无论如何也不允许别人写的

##### 间隙锁/临键锁

作用时避免幻读

当对唯一索引进行等值操作时（看where后面的语句知是否走唯一索引），进行删改时，如果该记录不存在，则行级锁没法成为行锁，它会变成间隙锁，比如有数据id是3和7，改或删5，不存在，就锁住3和7之间的间隙，间隙锁的唯一作用就是防止别人在其中插入数据，也不能把已有的数据更新为间隙内的值，但是删掉间隙左右的记录是可以的

注意：上面这种情况也会同步加上意向排他锁


注意：可以对同一个间隙加多个间隙锁


当对普通索引（非唯一索引）进行等值操作时，它会增加行锁、临键锁、间隙锁。比如有数据为2 2 2 3 3 3 3 7 7 9 9 9，对3进行等值操作，那么会在最后一个3和第一个7之间加间隙锁，在所有的3上加行锁，在第一个3和之前的间隙（最后一个2和第一个3之间）上加临键锁。最后还有一个意向锁

对唯一索引进行范围查询时，它会增加行锁、临键锁，比如数据 2 3 5 7 9，查询>= 7的，它对7加行锁，(7,9]加临键锁，[9,∞)加临键锁，再加一个意向锁

[此处还有待认真学习 ！！！]

### InnoDB引擎

#### 逻辑存储结构


![请添加图片描述](https://img-blog.csdnimg.cn/88d263ea7d654450a83966144686c745.png)

一个表空间表示一个数据库中的一张表，是idb文件

![请添加图片描述](https://img-blog.csdnimg.cn/7fa9a016242d41918d22ee63a2cecb2d.png)


#### 架构

![请添加图片描述](https://img-blog.csdnimg.cn/f4c48570724340ab9dc229fe79c2e24b.png)

##### 内存架构

##### 磁盘架构

##### 后台线程

#### 事务的原理

事务有acid性

其中acd是有redo log和undo log实现的

i是由锁和mvcc实现的

##### redo log

![请添加图片描述](https://img-blog.csdnimg.cn/7e7afa002671498fb5fe4adf85b0993a.png)

保证了事务的持久性

记录了数据的变更内容

原理参考[此处](https://www.bilibili.com/video/BV1iq4y1u7vj/?p=139)和[这个](https://xiaolincoding.com/mysql/log/how_update.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-redo-log)，还有[这个](https://blog.csdn.net/qq_42500831/article/details/123792708)

Q：如果redo log buffer刷新redo log file失败了怎么办？

A：则事务提交不成功，不需要维护提交不成功事务的持久性

##### undo log

保证了事务的原子性

![请添加图片描述](https://img-blog.csdnimg.cn/17996a0279914dbb841fef0a4f8f5442.png)

#### MVCC（重要）

当前读

![请添加图片描述](https://img-blog.csdnimg.cn/de783e1742ee44da9aaf09878b8587fd.png)


快照读

![请添加图片描述](https://img-blog.csdnimg.cn/1041ee82efe346e691b23acc36b1617b.png)



MVCC


![请添加图片描述](https://img-blog.csdnimg.cn/f0cc4996bad6427f87dc6ea847f0daf4.png)

##### 隐藏字段

![请添加图片描述](https://img-blog.csdnimg.cn/af4d24ee242c4095955525c512124aa4.png)

查看idb文件

`idb2sdi xxx.idb`

##### undolog

![请添加图片描述](https://img-blog.csdnimg.cn/c8964fbf8f1a4d03abb51fb4f4424eb4.png)

参考[此处](https://www.bilibili.com/video/BV1Kr4y1i7ru?p=143)

undolog 版本链

![请添加图片描述](https://img-blog.csdnimg.cn/02e4f8d92cc8417684f72d466da792ee.png)


##### readview

![请添加图片描述](https://img-blog.csdnimg.cn/81d0d9aa81ea4992a410293b0778bc9f.png)

![请添加图片描述](https://img-blog.csdnimg.cn/c4208292e8cf428098dfb225ed4e0929.png)

![请添加图片描述](https://img-blog.csdnimg.cn/e37e3404fd6a494fb72597449bc96a70.png)

##### MVCC原理（RC级别）

参考[此处](https://www.bilibili.com/video/BV1Kr4y1i7ru?p=145)

##### MVCC原理（RR级别）

参考[此处](https://www.bilibili.com/video/BV1Kr4y1i7ru?p=146)

事务的隔离性由mvcc（隐藏字段、undolog版本链、readview）和锁保证

而事务的一致性是由redo log和undo log一起保证的

事务的持久性有redo log保证

事务的原子性由redo log保证

### MySQL管理

#### 系统级数据库

#### mysql常用工具

在命令行使用的

mysql

mysqladmin是一个执行管理操作的客户端程序，可以用来检查服务器的配置和当前的状态、创建并删除数据库等

mysqlbinlog由于服务器生成的日志文件是以二进制保存的，所以想要查看这些文件的文本格式，就要用这个工具

mysqlshow用来查找存在哪些数据库、数据库中的表、表中的列和索引

mysqldump用来备份数据库和在不同数据库间进行数据迁移。备份内容包括创建表和插入表的sql语句

 mysqlimport导入数据，用来导入mysqldump -T参数后的文本文件

`source xxx.sql`导入sql文件


## 运维


### 日志

#### 错误日志

![请添加图片描述](https://img-blog.csdnimg.cn/f28978848c964605b4b1d276666c0931.png)

#### 二进制日志

![请添加图片描述](https://img-blog.csdnimg.cn/6a7466ea99f84fc7a96a21f8ca23c7ed.png)


#### 查询日志


![请添加图片描述](https://img-blog.csdnimg.cn/efe710ce07b94b488e20cc04fcddb6af.png)


记录客户端所有操作语句，默认是关闭

#### 慢查询日志

![请添加图片描述](https://img-blog.csdnimg.cn/2d7a3442f89d4dba8f3d6449eaadbd97.png)

![请添加图片描述](https://img-blog.csdnimg.cn/dc62ec53ad58465481fc85b3cfe2264f.png)


### 主从复制

![请添加图片描述](https://img-blog.csdnimg.cn/6b109a98c3c741b192596e2704054474.png)

原理

![请添加图片描述](https://img-blog.csdnimg.cn/e18999f10a4f44889c1499af557805fb.png)

### 分库分表


![请添加图片描述](https://img-blog.csdnimg.cn/55f95403f04c46c684cb13adcaf56505.png)

![请添加图片描述](https://img-blog.csdnimg.cn/d0332537090248738cd7701914a6dcae.png)

mycat是分库分表中间件

### 读写分离

基于主从复制，一般通过mycat实现


## 参考

黑马程序员
