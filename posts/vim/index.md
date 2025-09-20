# vim指令速查


vim有三种模式，命令模式（command line），输入模式（insert mode），命令行模式（command-line mode）
![在这里插入图片描述](https://i-blog.csdnimg.cn/img_convert/b2615e7cc613c7bad43a20d6b4819cf9.png#pic_center)

## 插入

|命令|作用  |
|--|--|
| i | 插入 |
| o|在当前行的下方插入一行，并进入输入模式 |
| O|在当前行的上方插入一行，并进入输入模式 |


## 移动光标

|命令|作用  |
|--|--|
| page up| 向上翻页|
| page down| 向下翻页|
|[number]+space |先按下数字，再按空格，光标向后几格 |
|0或者home |光标移动到行首 |
| $或者end| 光标移动到行末|
| G|移动到文本的最后一行 |
| gg|移动到文本的第一行 |
|[number]G |移动到文本的第n行 |
|[number]+enter |光标向下移动n行 |

## 搜索替换

|命令|作用  |
|--|--|
|/word |搜素word字符串 |
| n|下一个 |
|N |上一个 |
| :n1,n2s/word1/word2/g|将第n1行到第n2行中的word1替换成word2 |
|:1,$s/word1/word2/g |将全文的word1替换为word2 |
|:1,$s/word1/word2/gc | 将全文的word1替换为word2，每个字符要确认|

## 复制剪切粘贴

|命令|作用  |
|--|--|
|x |删除当前光标所在处的字符 |
|dd |剪切当前行 |
| ndd|剪切当前和向下的n行 |
|yy |复制当前行 |
| nyy|复制当前和向下的n行 |
|p |粘贴到光标的下一行 |
|P |粘贴到光标上一行 |

## 保存退出

|命令|作用  |
|--|--|
|:w |保存文件 |
|:q |退出vim |
| :wq|保存并退出 |
| :q!|不保存退出 |

## 其他


|命令|作用  |
|--|--|
|: |切换成命令行模式 |
|:set nu | 显示行号|
|:set nonu |不显示行号 |
|u |撤销上一次操作 |
|ctrl+r |重做上一次被撤销的操作 |
|. |重复上一个命令 |




















## 参考

https://www.runoob.com/linux/linux-vim.html

