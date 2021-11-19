# 编译原理小练习




随便记录一下

![在这里插入图片描述](https://img-blog.csdnimg.cn/30df106e684f494684fde92bf665877e.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_8,color_FFFFFF,t_70,g_se,x_16)

[图源](https://blog.csdn.net/sundingh/article/details/78714245)


## 词法分析程序设计

```python
import sys

#种别编码表
dict = {'begin' : 1, 'if' : 2, 'then' : 3, 'while' : 4, 'do' : 5, 'end' : 6,
        '+' : 13, '-' : 14, '*' : 15, '/' : 16, ':' : 17, ':=' : 18,
        '<' : 20, '<>' : 21, '<=' : 22, '>' : 23, '>=' : 24, '=' : 25, ';' : 26,
        '(' : 27, ')' : 28, '#' : 0}

#一些关键字
word = ['begin', 'if', 'then', 'while', 'do', 'end']


#s是关键字时的处理
def do_word(s):
    print('(%d, %s) ' % (dict[s], s), end='')

#s是id时的处理
def do_id(s):
    print('(%d, \'%s\') ' % (10, s), end='')

#s是数字时的处理
def do_num(s):
    print('(%d, %s) ' % (11, s), end='')

#s是符号时的处理
def do_symbol(s):
    print('(%d, %s) ' % (dict[s], s), end='')


def main():
    with open('in.txt', 'r') as f:
        tmpio = sys.stdin
        sys.stdin = f
        str = input()
        #print(str)
        i = 0
        while str[i] != '#':    # #是结束标志
            ch = str[i]
            if ch == ' ':       #空格直接跳过
                i += 1
                continue
            if ch.isalpha():    #如果是字母就一直搜素知道非数字和非字母，这样就能取到关键字或标识符
                tmp_str = ''
                while ch.isalnum():
                    tmp_str += ch
                    i += 1
                    ch = str[i]
                if tmp_str in word:     #如果是关键字
                    do_word(tmp_str)
                else :
                    do_id(tmp_str)      #否则是标识符
            elif ch.isnumeric():        #取得这个数字
                tmp_str = ''
                while ch.isnumeric():
                    tmp_str += ch
                    i += 1
                    ch = str[i]
                do_num(tmp_str)
            else:                       #判断是否是两个字符组成的符号
                tmp_str = ''
                if str[i] == ':' and str[i + 1] == '=':
                    tmp_str = ':='
                    i += 1
                elif str[i] == '<' and str[i + 1] == '>':
                    tmp_str = '<>'
                    i += 1
                elif str[i] == '<' and str[i + 1] == '=':
                    tmp_str = '<='
                    i += 1
                elif str[i] == '>' and str[i + 1] == '=':
                    tmp_str = '>='
                    i += 1
                else:
                    tmp_str = ch        #一个字符组成的符号
                do_symbol(tmp_str)
                i += 1
        print('(0, #)')
        sys.stdin = tmpio

if __name__ == '__main__':
    main()
```


```javascript
function func(){
    var tmp = document.getElementById('qwe');
    var str = tmp.value;

    var fstr = '';

    // tmp = document.getElementById('zxc');
    // tmp.value = str;

    function do_word(s) {
        fstr += '(';
        fstr += dict[s];
        fstr += ', ';
        fstr += s;
        fstr += ') ';
    }

    function do_id(s) {
        fstr += '(';
        fstr += 10;
        fstr += ', ';
        fstr += s;
        fstr += ') ';
    }

    function do_num(s) {
        fstr += '(';
        fstr += 11;
        fstr += ', ';
        fstr += s;
        fstr += ') ';
    }

    function do_symbol(s) {
        fstr += '(';
        fstr += dict[s];
        fstr += ', ';
        fstr += s;
        fstr += ') ';
    }


    function contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }


    var dict = {'begin' : 1, 'if' : 2, 'then' : 3, 'while' : 4, 'do' : 5, 'end' : 6,
        '+' : 13, '-' : 14, '*' : 15, '/' : 16, ':' : 17, ':=' : 18,
        '<' : 20, '<>' : 21, '<=' : 22, '>' : 23, '>=' : 24, '=' : 25, ';' : 26,
        '(' : 27, ')' : 28, '#' : 0};
    var word = new Array('begin', 'if', 'then', 'while', 'do', 'end');

    var i = 0;
    while(str[i] != '#'){
        var ch = str[i];
        if(ch == ' '){
            i++;
            continue;
        }
        if((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')){
            var tmp_str = '';
            while((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9')){
                tmp_str += ch;
                i++;
                ch = str[i];
            }
            if(contains(word, tmp_str)){
                do_word(tmp_str);
            }else do_id(tmp_str);
        }else if(ch >= '0' && ch <= '9'){
            var tmp_str = '';
            while (ch >= '0' && ch <= '9'){
                tmp_str += ch;
                i++;
                ch = str[i];
            }
            do_num(tmp_str);
        }else{
            var tmp_str = '';
            if(str[i] == ':' && str[i + 1] == '='){
                tmp_str = ':=';
                i++;
            }else if(str[i] == '<' && str[i + 1] == '>'){
                tmp_str = '<>';
                i++;
            }else if(str[i] == '<' && str[i + 1] == '='){
                tmp_str = '<=';
                i++;
            }else if(str[i] == '>' && str[i + 1] == '='){
                tmp_str= '>=';
                i++;
            }else tmp_str = ch;
            do_symbol(tmp_str);
            i++;
        }
    }
    fstr += '(0, #)';


    tmp = document.getElementById('zxc');
    tmp.value = fstr;

}
```


## 基于语法制导翻译的表达式转换编译器

```javascript
function func2() {
        var tmp = document.getElementById('qwe');
        var str = tmp.value;

        var fstr = '';

        var st_lex = [];
        var st_tok = [];

        const NUM = 256, DIV = 257, MOD = 258, ID = 259, DONE = 260, NONE = -1, EOSTR = '\0';

        const BUF_SIZE = 100, SYM_SIZE = 200;

        var lookahead, lineno = 1, tokenval = NONE;

        var lexbuf = '';

        var I = 0;

        var eflag = false;

        var estr = '';

        function emit(type, tval) {
            switch (type) {
                case '+':
                case '-':
                case '*':
                case '/':
                    fstr += type;
                    break;
                case DIV:
                    fstr += 'div';
                    break;
                case MOD:
                    fstr += 'mod';
                    break;
                case NUM:
                    fstr += tval;
                    break;
                case ID:
                    fstr += st_lex[tval];
                    break;
                default:
                    return;
            }
        }

        function error(s) {
            fstr += 'line ' + lineno + ': ' + s + '\n';
            eflag = true;
            estr = fstr;
            //add a teiminate statement
            tmp = document.getElementById('zxc');
            tmp.value = fstr;
            //alert('qqq');
            throw new  Error ('error');
        }

        function insert(s, num) {
            if(st_lex.length >= SYM_SIZE){
                error('symbol table full');
            }
            st_lex.push(s);
            st_tok.push(num);
        }

        function init() {
            insert('', 0);
            insert('div', DIV);
            insert('mod', MOD);
        }

        function lookup(s) {
            for(var i = 1; i < st_lex.length; ++i){
                if(st_lex[i] == s) return i;
            }
            return 0;
        }

        function lex() {
            var tmp;
            while(true){
                tmp = str[I];
                I++;
                if(tmp == ' ' || tmp == '\t') continue;
                else if(tmp == '\n'){
                    lineno++;
                }else if(tmp >= '0' && tmp <= '9'){
                    I--;
                    var tt = '';
                    while(tmp >= '0' && tmp <= '9'){
                        tt += tmp;
                        I++;
                        tmp = str[I];
                    }
                    tokenval = parseInt(tt);
                    return NUM;
                }else if((tmp >= 'a' && tmp <= 'z') || (tmp >= 'A' && tmp <= 'Z')){
                    var pos, ind = 0;
                    lexbuf = '';
                    while ((tmp >= 'a' && tmp <= 'z') || (tmp >= 'A' && tmp <= 'Z') || (tmp >= '0' && tmp <= '9')){
                        lexbuf += tmp;
                        tmp = str[I];
                        I++;
                        ind++;

                        var tmps = lexbuf;
                        if(tmps == 'DIV' || tmps == 'MOD'){
                            break;
                        }
                        if(ind >= BUF_SIZE){
                            error('the length of identifier is too long');
                        }
                    }

                    if(tmp != '#'){
                        I--;
                    }


                    pos = lookup(lexbuf);
                    if(pos == 0){
                        insert(lexbuf, ID);
                        tokenval = st_lex.length - 1;
                        return ID;
                    }else if(st_lex[pos] == 'div' || st_lex[pos] == 'mod'){
                        if(st_lex[pos] == 'div'){
                            tokenval = DIV;
                            return DIV;
                        }else {
                            tokenval = MOD;
                            return MOD;
                        }
                    }else {
                        tokenval = pos;
                        return ID;
                    }

                }else if(tmp == '#'){
                    return DONE;
                }else{
                    tokenval = NONE;
                    return tmp;
                }
            }
        }

        function match(x) {
            if(lookahead == x){
                lookahead = lex();
            }else error('syntax error');
        }

        function factor() {
            switch (lookahead) {
                case '(':
                    match('(');
                    express();
                    match(')');
                    break;
                case NUM:
                    emit(NUM, tokenval);
                    match(NUM);
                    break;
                case ID:
                    emit(ID, tokenval);
                    match(ID);
                    break;
                default:
                    error('syntax error');
            }
        }


        function term() {
            var tmp;
            factor();
            while(true){
                switch (lookahead) {
                    case '*':
                    case '/':
                    case DIV:
                    case MOD:
                        tmp = lookahead;
                        match(lookahead);
                        factor();
                        emit(tmp, NONE);
                        continue;
                    default:
                        return ;
                }
            }
        }


        function express() {
            var tmp;
            term();
            while (true){
                switch (lookahead) {
                    case '+':
                    case '-':
                        tmp = lookahead;
                        match(lookahead);
                        term();
                        emit(tmp, NONE);
                        continue;
                    default:
                        return ;
                }
            }
        }

        function parse() {
            lookahead = lex();
            while (lookahead != DONE){
                express();
                match(';');
                fstr += '\n';
            }
        }

        init();
        parse();

        tmp = document.getElementById('zxc');
        tmp.value = fstr;
        //if(eflag) tmp.value = estr; else tmp.value = fstr;


    }
```


## 说明语句的词法分析器

```python
import sys



ind = 0
id = []     #存标识符名称
tp = []     #存标识符类型
val = []    #存标识符的值



def judge_is_id(s):     #是否满足标识符的条件
    if s.count(' ') > 0:
        return False
    if not s[0].isalpha():
        return False
    return True

def main():
    with open('in.txt', 'r') as f:
        tmpio = sys.stdin
        sys.stdin = f
        str = input()

        int_num = char_num = string_num = float_num = 0     #计数

        i = 0
        while str[i] != ';':        #分号表示结束
            if str[i] == ' ':       #空格跳过
                i += 1
                continue

            if str[i] != 'c':       #第一个字符不为c，说明不是const
                print('It is not a constant declaration statement!')
                print('Please input a string again!')
                sys.exit()
            elif i + 6 > len(str):  #说明不存在const这个单词
                print('It is not a constant declaration statement!')
                print('Please input a string again!')
                sys.exit()
            elif str[i : i + 5] != 'const':     #开头是c但是单词不是const
                print('It is not a constant declaration statement!')
                print('Please input a string again!')
                sys.exit()
            else:
                str = str[i + 5: -1]        #是const，截掉这个单词
                break

        i = 0
        foo = str.split(',')            #按逗号分割
        #print(foo)

        for cnt in foo:
            left = (cnt.split('=')[0])      #等号左边的量
            right = cnt.split('=')[1]       #等号右边的数值
            left = left.strip()             #消掉前后的空格
            right = right.strip()

            if not judge_is_id(left):       #不是标识符
                id.append(left)
                tp.append('Wrong! It is not an identifier!')
                val.append(' ')
                #print('Wrong! It is not an identifier!')
                #sys.exit()
            else:
                left.strip()
                id.append(left)



                if right[0] == '\'' and right[2] == '\'' :      #值所代表的的字符串中有两个单引号，且距离为1，说明是char类型
                    tp.append('char')
                    val.append(right[1])
                elif right.count('\'') == 2:                #有两个单引号，但是其中的字符大于1
                    tp.append('more than one character in \'')
                    val.append(' ')
                    #print('more than one character in \'\'')
                    #sys.exit()
                elif right.count('\"') == 2:            #有两个双引号是string类型
                    tp.append('string')
                    val.append(right[1: -1])
                else :                                  #剩下的情况是数字或非法
                    if right.count('.') == 1 and right.split('.')[0].isdigit() and right.split('.')[1].isdigit() :
                        if right.split('.')[0][0] == '0':       #上面的语句说明含有一个小数点，且小数点左右两边都是数字，这可能是个小数
                            tp.append('numbers cannot started with zero')   #有前导0不行，这里没有考虑0.xxx的情况
                            val.append(' ')
                            #print('numbers cannot started with zero')
                            #sys.exit()
                        else:                   #合法的小数
                            tp.append('float')
                            val.append(right)

                    elif not right.isdigit():       #含有非数字成分，说明这不是一个数字
                        tp.append('Wrong constant')
                        val.append(' ')
                        #print('Wrong constant')
                        #sys.exit()
                    elif right[0] == '0':       #是数字但是含有前导0
                        tp.append('numbers cannot started with zero')
                        val.append(' ')
                        #print('numbers cannot started with zero')
                        #sys.exit()
                    else :                      #合法的数字
                        tp.append('integer')
                        val.append(right)


        #print(len(id), len(tp), len(val))
        bar = len(id)                           #输出
        for i in range(bar):
            print('%s ( %s, %s )' % (id[i], tp[i], val[i]))

        for i in range(bar):                    #统计
            if tp[i] == 'integer':  int_num += 1
            if tp[i] == 'char': char_num += 1
            if tp[i] == 'string':   string_num += 1
            if tp[i] == 'float':    float_num += 1

        print('%s = %d, %s =  %d, %s = %d, %s = %d' % ('int_num', int_num, 'char_num', char_num, 'string_num', string_num, 'float_num', float_num) )

        sys.stdin = tmpio

if __name__ == '__main__':
    main()
```



```javascript
function func3() {

    var tmp = document.getElementById('qwe');
    var str = tmp.value;
    var fstr = '';

    var id = [], tp = [], val = [];

    function judge_is_id(s) {
        if ((s.split(' ')).length - 1 > 0){
            return false;
        }
        if(!((s[0] >= 'a' && s[0] <= 'z') || (s[0] >= 'A' || s[0] <= 'Z'))){
            return false;
        }
        return true;
    }

    var int_num, char_num, string_num, float_num;
    int_num = char_num = string_num = float_num = 0;

    var i = 0;
    while (str[i] != ';'){
        if(str[i] == ' '){
            i++;
            continue;
        }
        if(str[i] != 'c'){
            fstr += 'It is not a constant declaration statement!\n';
            fstr += 'Please input a string again!';
            tmp = document.getElementById('zxc');
            tmp.value = fstr;
            throw new Error('error');
        }else if(i + 6 > str.length){
            fstr += 'It is not a constant declaration statement!\n';
            fstr += 'Please input a string again!';
            tmp = document.getElementById('zxc');
            tmp.value = fstr;
            throw new Error('error');
        }else if(str.slice(i, i + 5) != 'const'){
            fstr += 'It is not a constant declaration statement!\n';
            fstr += 'Please input a string again!';
            tmp = document.getElementById('zxc');
            tmp.value = fstr;
            throw new Error('error');
        }else{
            str = str.slice(i + 5, str.length - 1);
            break;
        }
    }

    var foo = str.split(',');

    for(i = 0; i < foo.length; ++i){
        var cnt = foo[i];
        var left = cnt.split('=')[0];
        var right = cnt.split('=')[1];

        left = left.replace(/(^\s*)|(\s*$)/g, "");
        right = right.replace(/(^\s*)|(\s*$)/g, "");

        if(!judge_is_id(left)){
            id.push(left);
            tp.push('Wrong! It is not an identifier!');
            val.push(' ');
        }else {
            id.push(left);

            if(right[0] == '\'' && right[2] == '\''){
                tp.push('char');
                val.push(right[1]);
            }else if((right.split('\'')).length - 1 == 2){
                tp.push('more than one character in \'');
                val.push(' ');
            }else if((right.split('\"')).length - 1 == 2){
                tp.push('string');
                val.push(right.slice(1, right.length - 1));
            }else{
                if((right.split('.')).length - 1 == 1 && !isNaN(right.split('.')[0]) && !isNaN(right.split('.')[1])){
                    if(right.split('.')[0][0] == '0'){
                        tp.push('numbers cannot started with zero');
                        val.push(' ');
                    }else{
                        tp.push('float');
                        val.push(right);
                    }
                }else if(isNaN(right)){
                    tp.push('Wrong constant');
                    val.push(' ');
                }else if(right[0] == '0'){
                    tp.push('numbers cannot started with zero');
                    val.push(' ');
                }else{
                    tp.push('integer');
                    val.push(right);
                }
            }

        }

    }

    var bar = id.length;
    for(i = 0; i < bar; ++i){
        fstr += (id[i] + ' ( ' + tp[i] + ' , ' + val[i] + ' ) \n');
    }
    for(i = 0; i < bar; ++i){
        if(tp[i] == 'integer') int_num++;
        if(tp[i] == 'char') char_num++;
        if(tp[i] == 'string') string_num++;
        if(tp[i] == 'float') float_num++;
    }
    fstr += ('int_num = ' + int_num + ', char_num = ' + char_num + ', string_num = ' + string_num + ', float_num = ' + float_num);
    tmp = document.getElementById('zxc');
    tmp.value = fstr;


}
```


##  基于预测分析方法的表达式语法

```python
import sys

#预测分析表

dict = {
    'S' : {
        'm' : 'AT',
        '(' : 'AT'
    },
    'T' : {
        '+' : '+AT',
        ')' : '$',
        '#' : '$',
    },
    'A' : {
        'm' : 'BU',
        '(' : 'BU'
    },
    'U' : {
        '+' : '$',
        '*' : '*BU',
        ')' : '$',
        '#' : '$'
    },
    'B' : {
        'm' : 'm',
        '(' : '(S)'
    }
}

#非终结符

no_tm = ['m', '+', '*', '(', ')', '#']

#输出一行包含序号，分析栈，输入栈，所用产生式

def PRINT(no, stk, s, pd):
    if stk[-1:] not in no_tm:
        print('%d\t%-10s%10s\t%s->%s' % (no, stk, s, stk[-1:], pd))
    else :
        print('%d\t%-10s%10s\t%s' % (no, stk, s, pd))


def main():
    with open('in.txt', 'r') as f:
        tmpio = sys.stdin
        sys.stdin = f
        stri = input()

        num = 1         #序号
        prod = ''       #产生式
        ind = 0         #输入串的下标
        stack = '#S'    #分析栈


        while len(stack) != 1:          #说明只剩#
            if stack[-1:] == stri[ind]:     #分析栈的栈顶等于输入串的栈顶，说明非终结符匹配
                PRINT(num, stack, stri, '\'' + stri[ind] + '\' match')
                stri = ' ' * (ind + 1) + stri[ind+1:]
                ind += 1
                num += 1
                stack = stack[:-1]
            elif stack[-1:] in no_tm:       #分析栈的栈顶不等于输入串的栈顶又不是非终结符，说明不匹配
                PRINT(num, stack, stri, '[ERROR] not match')
                sys.exit()
            elif stri[ind] not in dict[stack[-1:]].keys():      #在预测分析表中没有填产生式，出错
                PRINT(num, stack, stri, '[ERROR] not match')
                sys.exit()
            else:                                       #利用产生式，出栈和入栈
                prod = dict[stack[-1:]][stri[ind]]
                PRINT(num, stack, stri, prod)
                num += 1
                stack = stack[:-1]
                if prod != '$':
                    stack += prod[::-1]

        PRINT(num, stack, stri, 'acc')                  #出错的全都中途退出了，能走到这步的都是acc






        sys.stdin = tmpio

if __name__ == '__main__':
    main()
```



```javascript
function func4() {

    var tmp = document.getElementById('qwe');
    var str = tmp.value;
    var fstr = '';

    var dict = {
        'S' : {
            'm' : 'AT',
            '(' : 'AT'
        },
        'T' : {
            '+' : '+AT',
            ')' : '$',
            '#' : '$',
        },
        'A' : {
            'm' : 'BU',
            '(' : 'BU'
        },
        'U' : {
            '+' : '$',
            '*' : '*BU',
            ')' : '$',
            '#' : '$'
        },
        'B' : {
            'm' : 'm',
            '(' : '(S)'
        }
    };

    no_tm = ['m', '+', '*', '(', ')', '#'];

    function PRINT(no, stk, s, pd) {
        var tchar = stk.slice(stk.length - 1, stk.length);
        if(no_tm.indexOf(tchar) == -1){
            while(stk.length < 20){
                stk += ' ';
            }
            while (s.length < 20){
                s = ' ' + s;
            }
            fstr += no;
            fstr += ('\t' + stk + s + '\t\t\t' + tchar + '->' + pd + '\n');
        }else{
            while(stk.length < 20){
                stk += ' ';
            }
            while (s.length < 20){
                s = ' ' + s;
            }
            fstr += no;
            fstr += ('\t' + stk + s + '\t\t\t' + pd + '\n');
        }
    }


    var num = 1;
    var ind = 0;
    var stack = '#S';

    while (stack.length != 1){
        if(stack.slice(stack.length - 1, stack.length) == str[ind]){
            PRINT(num, stack, str, '\'' + str[ind] + '\' match');
            tt_str = str;
            str = '';
            for(var j = 0; j < ind + 1; ++j){
                str += ' ';
            }
            str += tt_str.slice(ind + 1, tt_str.length);
            ind++;
            num++;
            stack = stack.slice(0, stack.length - 1);
        }else if(no_tm.indexOf(stack.slice(stack.length - 1, stack.length)) != -1){
            PRINT(num, stack, str, '[ERROR] not match');
            tmp = document.getElementById('zxc');
            tmp.value = fstr;
            throw new Error('error');
        }else if(!(str[ind] in dict[stack.slice(stack.length - 1, stack.length)])){
            PRINT(num, stack, str, '[ERROR] not match');
            tmp = document.getElementById('zxc');
            tmp.value = fstr;
            throw new Error('error');
        }else{
            var prod = dict[stack.slice(stack.length - 1, stack.length)][str[ind]];
            PRINT(num, stack, str, prod);
            num++;
            stack = stack.slice(0, stack.length - 1);
            if(prod != '$'){
                stack += prod.split("").reverse().join("");
            }
        }
    }

    PRINT(num, stack, str, 'acc');

    tmp = document.getElementById('zxc');
    tmp.value = fstr;

}
```

