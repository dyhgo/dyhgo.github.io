# 

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!-- import CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <style type="text/css">
        el-button {circle:true}
    </style>
</head>
<body>
<div id="app">

    <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="textarea1"
            id="qwe"
            background-color="#ffffff73">
    </el-input>

    <br>

    <div align="center">
        <el-tooltip class="item" effect="light" content="词法分析程序设计" placement="top">
            <el-button onclick="func()" >实验一</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="基于语法制导翻译的表达式转换编译器，以#结尾" placement="top">
            <el-button onclick="func2()" >实验二</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="说明语句的词法分析器" placement="top">
            <el-button onclick="func3()" >实验三</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="基于预测分析方法的表达式语法分析器" placement="top">
            <el-button onclick="func4()" >实验四</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="基于算符优先分析方法的表达式语法分析器" placement="top">
            <el-button onclick="func5()" >实验五</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="清空两个输入框" placement="top">
            <el-button onclick="func6()" >清空</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="点击显示每个实验的输入例子" placement="top">
            <el-button onclick="func7()" >例子</el-button>
        </el-tooltip>
    </div>

    <br>

    <el-input
            type="textarea"
            :rows="18"
            placeholder="结果将在这里显示"
            v-model="textarea2"
            id="zxc">
    </el-input>

</div>
</body>

<!-- import Vue before Element -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- import JavaScript -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>

<script>
    var Main = {
        data() {
            return {
                textarea1: '',
                textarea2: ''
            }
        }
    }
    var Ctor = Vue.extend(Main)
    new Ctor().$mount('#app')


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



    //----------------------------------------------------------------------------------------


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








    //---------------------------------------------------------------------------------


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


    //---------------------------------------------------




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


    //--------------------------------------------



    function func5() {
        var tmp = document.getElementById('qwe');
        var str = tmp.value;
        var fstr = ''
        try{
            fstr = eval(str);
            tmp = document.getElementById('zxc');
            tmp.value = fstr;
        }catch (e) {
            tmp = document.getElementById('zxc');
            tmp.value = 'wrong expression';
        }
    }


    function func6(){
        var tmp = document.getElementById('qwe');
        tmp.value = '';
        var tmp = document.getElementById('zxc');
        tmp.value = '';
    }

    function func7(){
        var tmp = document.getElementById('qwe');

        var fstr = '实验一: begin x:=9;if x>0 then x:=2*x+1/3;end#\n实验二: 4 - 5 * 6 div 4 + 8 mod 2;#\n实验三: const count=10,sum=81.5,char1=\'f\',string1=\"hj\", max=169;\n实验四: m+m*m#\n实验五: (2+3)*5\n';
        tmp.value = fstr;
    }

</script>







</html>
