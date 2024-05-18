# shell三剑客



## grep

Global Regular Expression Print

用正则表达式查找文本

`grep [-option] {pattern} {file}`

|  |  |
|--|--|
|-A<行数>|除了显示匹配 pattern 的那一行外，显示该行之后的内容|
|-B<行数>|除了显示匹配 pattern 的那一行外，显示该行之前的内容|
-C<行数>|除了显示匹配 pattern 的那一行外，显示该行前、后的内容|
|-c|统计匹配的行数|
|-e|同时匹配多个pattern|
|-i|忽略字符的大小写|
|-n|显示匹配的行号|
|-o|只显示匹配的字符串|
|-v|显示没有匹配pattern的那一行，相当于反向匹配|
|-w|匹配整个单词|



## sed

stream editor

对某个文本进行批量操作

`sed [-option] '{region} {command}' file`

|  |  |
|--|--|
|-n|只打印匹配到的行|
|-e|多次匹配，相当于对每行处理时，顺序执行多个sed命令|
|-i|直接将处理结果写入文件|


|  |  |
|--|--|
|不给地址|默认对全文进行处理|
|单地址|/pattern/，被pattern匹配到的每一行|
|地址范围|#, #|

x   
|d|删除模式空间匹配到的行|
|p|打印模式空间中的内容|
|s/old/new/g|将old替换为new，g表示行内全局替换|


## awk	

Aho-Corasick With Additional Features



## 参考

[https://zhuanlan.zhihu.com/p/181724885](https://zhuanlan.zhihu.com/p/181724885)

[https://zhuanlan.zhihu.com/p/181734158](https://zhuanlan.zhihu.com/p/181734158)

[https://zhuanlan.zhihu.com/p/186289624](https://zhuanlan.zhihu.com/p/186289624)



