# 8086指令系统



[8086寄存器](https://blog.csdn.net/qq_41115702/article/details/82763383)


 mem     存储器操作数
 
 acc         累加器操作数
 
 dest        目标操作数
 
 src          源操作数
 
 disp        8位或16位偏移量，可用符号地址表示
 
 DATA    8位或16位数据
 
 port        输入输出端口
 
 ( )            表示寄存器的内容
 
 [ ]            表示存储器的内容或偏移地址


## 数据传送
### 传送数据

#### MOV

**move**

指令格式：MOV dst, src;
           操作：dest        src

 WORD PTR       字长度标记
 BYTE PTR         字节长度标记
 DWORD PTR     双字长度标记   （伪指令）


1) IP不能作目的寄存器；
2) 不允许 mem2 ← mem1（存储器）；
3) 不允许 segreg ← segreg（段寄存器）；
4) 立即数不允许作为目的操作数；
5) 源操作数与目的操作数类型要一致。


```asm
MOV  AL, BL;
MOV  [DI], AX;
MOV  CX, [1000H]; 
MOV  BL, 40
MOV WORD PTR[SI], 01H;
```

几种不允许传送的解决办法：					用寄存器如AX作桥梁。

存储器←存储器：			
```asm		
MOV  AX，MEM1					
MOV  MEM2，AX
```

段寄存器←段寄存器：					
```asm
MOV  AX，DS					
MOV  ES，AX
```

段寄存器←立即数：						
```asm
MOV  AX，DATA					
MOV  DS，AX
```



#### PUSH/POP

 由SS指示堆栈段的段基址；
 堆栈指针SP始终指向堆栈的顶部；
 SP的初值规定了所用堆栈区的大小；
 堆栈的最高地址叫栈底。 

PUSH    src	   ; src为16位操作数

 PUSH   reg  ；    PUSH    mem/reg
 PUSH   segreg

例如：
```asm
PUSH  AX；    PUSH  [BX]；    PUSH  DS ；
```

 PUSH	   AX	；将AX内容压栈
 执行操作： [(SP)-1]←高字节(AH)
[(SP)-2]←低字节(AL)
(SP) ← (SP) - 2

POP	dest

例：
```asm
POP	BX	；
```
将栈顶内容弹至BX
    	执行操作：	(BL)  ←[SP]
                                 (BH) ← [(SP)+ 1]
                                 (SP) ← (SP) + 2


#### XCHG

**exchange**

格式：XCHG  reg，mem/reg
功能：交换两操作数的内容。  
要求：两操作数中必须至少有一个在寄存器中；
            操作数不能为段寄存器和立即数；
            源和目地操作数类型要一致。

举例：
```asm 
XCHG	 AX，BX
XCHG  [2000]，CL
```


#### XLAT

**translate**

执行的操作：AL←[(BX)+(AL)]
  又叫查表转换指令，它可根据表项序号查出表中对应代码的内容。执行时先将表的首地址（偏移地址）送到BX中，表项序号存于AL中。


XLAT是一条隐含寻址的指令。使用前要给隐含操作数赋初值。

   





### 传送地址

#### LEA

**load effective address**

用途：用于传送操作数的偏移地址
 传送偏移地址：LEA reg，mem ；			将指定内存单元的偏移地址送到指定寄存器


要求：
  1) 源操作数必须是一个存储器操作数；
  2) 目的操作数必须是一个16位的通用寄存器。

例：
```asm
LEA	BX，[SI+10H]
```

设：（SI）=1000H
则执行该指令后，（BX）=1010H

 注意以下指令差别：

```asm
LEA    BX，[2000H] ;将存储单元的偏移地址取到 BX
MOV BX， [2000H] ;将存储单元中的内容取到 BX
  ```


#### LDS

#### LES

### 输入输出

只限于用累加器AL或AX来传送信息。
功能: (累加器)←→I/O端口


#### IN

格式:   IN acc, port ；port端口号0～255H
   	   IN acc, DX；DX表示的端口范围达64K


例: 

```asm
IN AL，80H  ；(AL）←(80H端口)
IN AL，DX    ；(AL）←((DX))
IN AX，DX  ； (AL）←((DX))，(AH）←((DX+1)) 
```

#### OUT

格式：OUT  port, acc
            OUT  DX, acc

例：
```asm
OUT 68H，AX  ；(68H）←（AL）
             ；(69H）←（AH）
OUT DX，AL   ；((DX))←(AL)
```

在使用间接寻址的IN/OUT指令时，要事先用传送指令把I/O端口号设置到DX寄存器，如：

```asm
MOV  DX，220H
IN   AL，DX  ;将220H端口内容读入AL
```


### 例子

   例2.5 内存中自TABLE开始的16个单元连续存放着自然数0到15的平方值(构成一个平方表)，任给一整数M在XX单元中(该数为0≤M≤15)，查表求M的平方值，并将结果存入YY单元中。


解:	
```asm
LEA  BX，TABLE
MOV  AL，XX	      
XLAT			 
MOV  YY，AL
```

## 算术运算

### 加法

#### ADD

不带进位的加法指令ADD

格式：   
 ADD	 acc, data  
	          	 ADD	 mem/reg, data
           	 ADD  mem/reg1, mem/reg2
           	 
   实例：
   ```asm 	 
ADD	 AL，30H     
ADD	 SI，[BX+20H]
ADD	 CX，SI
ADD	 [DI]，200H
```

ADD指令对6个状态标志均产生影响。

  例：已知(BX)=E75FH，指令 ADD  BX, 8046H 执行后，状态标志各是多少？	    
		      E75FH = 1 1 1 0  0 1 1 1  0 1 0 1  1 1 1 1
    	      8046H =  1 0 0 0  0 0 0 0  0 1 0 0  0 1 1 0 
                              1                           1       1  1 1 
                              1 0 1 1 0  0 1 1 1  1 0 1 0  0 1 0 1

结果：CF=1, ZF=0, PF=1, 	   AF=1, OF=1, SF=0  

PF：低8位中1的个数是否为偶数！


#### ADC

**add with carry**

带进位位的加法指令ADC

   ADC指令在形式上和功能上与ADD类似，只是相加时还要包括进位标志CF的内容，例如：

```asm
  ADC  AL，68H   ;AL←(AL)+68H+(CF)	
  ADC  AX，CX    ;AX←(AX)+(CX)+(CF)
  ADC  BX，[DI]  ; BX←(BX)+[DI+1][DI]+(CF)
```

 ADC指令用于多字节加法运算中

ADD/ADC对条件标志位的影响：

SF = 1 结果为负，否则为0

ZF = 1结果为0

CF = 1 和的最高有效位有向高位的进位

OF = 1  两个操作数符号相同，而结果符号与之相反

CF位表示无符号数相加的溢出。
OF位表示带符号数相加的溢出。


#### INC

**increase 1**

加1指令INC（单操作数指令）

格式：INC  reg/mem
功能：类似于C语言中的++操作：对指定的操作数加1。 


例：  
```asm
INC  AL
INC  SI 
INC  BYTE PTR[BX+4]
```

注：本指令不影响CF标志。


### 减法

#### SUB
**substract**

不带借位的减法指令SUB

 格式： SUB  dest, src
 操作： dest←(dest)-(src)
注：1.源和目的操作数不能同时为存储器操作数
        2.立即数不能作为目的操作数

例： 
```asm
SUB  AL，60H
SUB  [BX+20H]，DX
SUB  AX，CX
```



#### SBB

**substract with borrow**

带借位的减法指令SBB

SBB指令主要用于多字节的减法。
格式： SBB  dest, src
操作： dest←(dest)-(src)-(CF)


例：
```asm
      SBB  AX，CX
      SBB  WORD PTR[SI]，2080H
      SBB  [SI],DX
```

#### DEC

**decrease 1**

作用类似于C语言中的”－－”操作符。
格式：DEC  opr				      
操作：opr←(opr)-1

例：
```asm
      DEC  CL
      DEC  BYTE PTR[DI+2]
      DEC  SI 
```

#### NEG

**negative**

求补(负)指令NEG

格式： NEG  opr  ;补码表示的带符号数
操作： opr← 0-(opr)

对一个操作数取补码相当于用0减去此操作数，故利用NEG指令可得到负数的绝对值。
例：若(AL)=0FCH（ -4的补码），
	则执行 NEG  AL，  
    	(AL)=04H，CF=1。
       即得到4(-4的绝对值)。


#### CMP

**compare**

比较指令CMP

格式： CMP  dest, src
操作： (dest)-(src)
	CMP也是执行两个操作数相减，但结果不送目标操作数，其结果只反映在标志位上。
例： 
```asm
     CMP  AL，0AH
     CMP  CX，SI
     CMP  DI，[BX+03]
```


根据标志位来判断比较的结果

1) 根据ZF判断两个数是否相等。若ZF=1，则两数相等。

2) 若两个数不相等,则分两种情况考虑:
	①比较的是两个无符号数					    	若CF=0，则dest＞src;						若CF=1，则dest＜src。
   ②比较的是两个有符号数						若OF⊕SF=0，则dest＞src;					若OF⊕SF=1，则dest＜src。


比较指令在使用时，一般在其后紧跟一条条件转移指令，判断比较结果的转向。

举例：比较AL、BL、CL中带符号数的大小，将
      最小数放在AL中。

程序：
```asm
       	CMP   AL,BL   ；AL和BL比较
       	JNG   BBB     ；若AL≤BL,则转
       	XCHG  AL,BL   ；若AL＞BL,则交换
       	
 BBB:  CMP   AL,CL   ；AL和CL比较
       	JNG   CCC     ；若AL≤CL,则转
       	XCHG  AL,CL   ；若AL＞CL,则交换
 CCC:  HLT
```

### 乘除法

进行乘法时：
8位× 8位→16位乘积	
            	      16位× 16位→32位乘积


进行除法时：
16位/8位→8位商	
              32位/16位→16位商


 对被除数、商及余数存放有如下规定：	
		  被除数	    商	余数
字节除法         AX               AL	 AH
  字除法	   DX:AX	    AX	 DX

#### MUL
**multiplication**

无符号数的乘法指令MUL(mem/reg)

格式： MUL   src；src的长度确定乘法类型
操作：字节操作数  (AX) ←  (AL) × (src)
           字操作数      (DX, AX) ←  (AX) × (src)

指令例子： 
```asm
       MUL  BL   ；(AL)×(BL),乘积在AX中
       MUL  CX   ；(AX)×(CX),乘积在DX,AX中
       MUL  BYTE PTR[BX]
```

乘法指令对CF/OF的影响：

CF/OF = 0/0 乘积的高一半为零，否则1/1 高一半为有效数字

例：(AL) = A5H，(BL) = 11H	
 	(1)     MUL  BL   ;  (AX)  ←  (AL)×(BL)		        			;  A5×11= 0AF5				                                    			;  (AX) = 0AF5H   CF=OF=1   



#### IMUL

**integer multiplication**

#### DIV

无符号数除法指令DIV

格式： DIV   src； src的长度确定除法类型
操作：字节操作  (AL) ← (AX) / (SRC) 的商
                              (AH) ← (AX) / (SRC) 的余数           

  字操作   (AX) ← (DX, AX) / (SRC) 的商
                          (DX) ←  (DX, AX) / (SRC) 的余数

指令例子：
```asm
      	DIV  CL
      	DIV  WORD PTR[BX]
```

注：若除数为零或AL中商大于FFH,(或AX中商大于FFFFH)，则CPU产生一个类型0的内部中断。


#### IDIV


### 例子

   例 下列程序段完成S=(a×b+c)/a的运算，其中变量a、b、c和S均为带符号的字数据,结果的商存入S，余数则不计，填空完成下列程序。

```asm
MOV  AX，a           ;取得被乘数a
     IMUL b             ;a×b在DX:AX中
     MOV  CX，DX
     MOV  BX，AX
MOV  AX，c
     CWD        ;c扩展为双字节，在DX:AX中
     ADD  AX，BX             ;a×b+c在DX:AX中
     ADC  DX，CX   ；高位相加
     IDIV a            ;(a×b+c)/a,商存入S
     MOV  S，AX
```


## 逻辑

逻辑运算指令
 运算规则：按位操作，无进/借位 
 对标志位的影响(除NOT指令外)：  

CF  OF SF ZF PF  AF
 0     0    *    *    *   无定义

\*  根据运算结果设置



#### AND
逻辑”与” AND

对两个操作数进行按位逻辑“与”操作。
格式：AND   dest, src
用途：保留操作数的某几位，清零其他位。

例1：
保留AL中低4位，高4位清0。
```asm
AND  AL, 0FH
```

例2：测试AL的bit7, bit5, bit2是否都是1。
```asm
	AND  AL, 10100100B
	CMP  AL, 10100100B
          JZ      YES
           … … ；不全为1时的处理
YES: 
```


#### OR


逻辑”或” OR


对两个操作数进行按位逻辑”或”操作。
格式：OR  dest, src
用途：对操作数的某几位置1；				 对两操作数进行组合。


例：把AL的第5位置为1
```asm
OR  AL, 00100000B
```


#### NOT


逻辑“非”(取反)  NOT

对操作数进行按位逻辑”非”操作。
格式：NOT  mem/reg

例：
```asm
NOT  CX
NOT  BYTE PTR[DI]
```


#### XOR

逻辑”异或”  XOR

对两个操作数按位进行”异或”操作。
格式：XOR  dest, src
用途：对reg清零(自身异或)
      把reg/mem的某几位变反(与’1’异或)


例1：把AX寄存器清零。 
```asm
XOR  AX, AX 		  
MOV  AX, 0
AND  AX, 0
SUB  AX, AX  
```

例2：把DH的bit4,3变反
```asm
 XOR  DH,18H
 ```
#### TEST

测试指令TEST

操作与AND指令类似,但不将”与”的结果送回,只影响标志位。
	TEST指令常用于位测试,与条件转移指令一起用。


例：测试AL的内容是否为负数。
```asm
     	 TEST  AL, 80H  ；检查AL中D7=1？	       
     	 JNZ    MINUS   ；是1(负数)，转MINUS               
     	 … …         ；否则为正数
MINUS: …
```


#### 例子

例 已知寄存器DX：AX的内容为32位带符号数，编写一段程序使DX：AX的内容成为原来数据的绝对值。	

解: 
```asm
 TEST  DX，8000H  ;测试符号位，产生状态
     JZ    EXIT       ;符号位=0，结束
     NEG   DX         ;求绝对值
     NEG   AX
     SBB   DX，0
EXIT:HLT
```





## 移位

#### SHL/SHR/SAR


非循环移位指令
   算术左移指令 SAL(Shift Arithmetic Left)
   算术右移指令 SAR(Shift Arithmetic Right)
   逻辑左移指令 SHL(Shift Left)
   逻辑右移指令 SHR(Shift Right)
这4条指令的格式相同,以SAL为例：

SAL  mem/reg, CL（移位位数大于1） 1（移位位数等于1）

 算术移位——把操作数看做有符号数；
 逻辑移位——把操作数看做无符号数。
移位位数放在CL寄存器中，如果只移1位,也
 可以直接写在指令中。例如：
	 MOV  CL, 4
	 SHR  AL, CL  ；AL中的内容右移4位
 影响C, P, S, Z, O标志。
 结果未溢出时：
     左移1位≡操作数×2
     右移1位≡操作数 / 2


#### ROL/ROR/RCL/RCR
**rotate left**

**rotate left with carry**

循环移位指令

   不含进位位的循环左移指令 ROL	
   不含进位位的循环右移指令 ROR
   含进位位的循环左移指令 RCL	
   含进位位的循环右移指令 RCR

 格式同非循环移位指令。
 移位位数放在CL寄存器中，如果只移1位,
 				也可以直接写在指令中。
 循环移位指令只影响标志位CF和OF。

例1：将AL的高4位与低4位互换。
```asm
MOV  CL, 4
ROL   AL, CL
```

## 串操作

串：顺序放在内存中的一组相同类型的数据。
串操作：对串中的元素进行相同的操作。
串操作的寻址方式：							源操作数指针———DS:SI(DS可超越)			目的操作数指针——ES:DI
每次串操作后：							串操作指令自动修改SI和DI——字节:±1，字:±2。DF标志决定±。注意：退出串操作后，指针指向最后操作的元素的下一个元素。 


 可完成存储单元到存储单元的传送、比较（也仅是串指令可以）
 有的串操作指令前面可加重复前缀。当使用重复前缀时，操作重复次数由CX决定(CX自动减量)。该指令重复执行,直至(CX)=0为止。
 执行串指令之前，应先进行如下设置：
 源串首地址（末地址）→ SI
 目的串首地址（末地址）→ DI
 串长度 → CX
 建立方向标志（CLD使DF=0(增)，STD使DF=1 (减) ）


重复前缀
 
REP               ；无条件重复
REPE/REPZ         ；当相等/为零时重复
REPNE/REPNZ       ；当不相等/不为零时重复
  


#### MOVS
**move string**

串传送指令MOVSB / MOVSW

指令执行的操作为：
MOVSB    ； ((ES):(DI))←((DS):(SI))
	         SI±1, DI±1 
MOVSW   ； ((ES):(DI+1)(DI))←((DS):(SI+1)(SI))	
         		SI±2, DI±2 

注意：
   src用DS:SI寻址, dest用ES:DI寻址  


  例 编写将数据段中自AREA1开始的100个字数据搬到附加段中以AREA2开始的数据区中的程序段。

解：
① 用基本串传送指令	
```asm
		LEA    SI，AREA1
		LEA    DI，AREA2
		MOV   CX，100
		CLD
DONE: MOVSW
		LOOP  DONE 
```

2. 用重复串传送指令
```asm
	LEA   SI， AREA1
	LEA   DI， AREA2
	MOV  CX， 100
	CLD
	REP  MOVSW
```

#### STOS
**store string**

串存储指令STOSB / STOSW

写指令的操作为：
  对字节：((ES):(DI))←(AL)
          	 DI±1
    对字：((ES):(DI+1)(DI))←(AX)	
	           DI±2

本指令用于把一块存储区域填充成某一
  初始值(即对存储区进行初始化)。

#### LODS
**load string**

串读取指令LODSB / LODSW

执行的操作为：
  对字节：(AL)←((DS):(SI))
	           SI±1
    对字：(AX)←((DS):(SI+1)(SI))	
	           SI±2 

串读取指令通常不加重复前缀。
LODSB等价于:         
```asm
MOV  AL,[SI］        
INC  SI
```	     
                     	    

LODSW等价于:     
```asm
MOV  AX,[SI] 
INC  SI
INC  SI         
 ```



#### CMPS
**compare string**

串比较指令CMPSB / CMPSW

指令执行的操作为：
CMPSB  ；((DS):(SI))-((ES):(DI))
        		 SI±1, DI±1 
CMPSW ；((DS):(SI+1)(SI))-((ES):(DI+1)(DI))
	         SI±2, DI±2 

比较的结果只反映在标志位上，串本身无变化。
本指令可用来检查两个串是否相等。
与重复前缀REPZ/REPE、REPNZ/REPNE结合使用。


#### SCAS
**scan string**

串扫描SCASB / SCASW

执行的操作：
   对字节：(AL)－((ES):(DI))
                   DI±1
   对字：    (AX)－((ES):(DI＋1)(DI))
                   DI±2

搜索指令执行的仍是比较(减法)操作,结果只影响标志位。
要搜索的关键字放在AL(字节)或AX(字)中。
本指令用于在串中查找指定的信息。
与重复前缀REPZ/REPE、REPNZ/REPNE结合使用。

  SCAS指令加上重复前缀后,可对串进行连续扫描比较：
 若前缀为REPZ，则表示比较结果相等(ZF=1)且串未结束(CX≠0)，则继续比较。
 若前缀为REPNZ，则表示比较结果不相等(ZF=0)且串未结束(CX≠0)，就继续比较。

REP               ；无条件重复
REPE/REPZ         ；当相等/为零时重复
REPNE/REPNZ       ；当不相等/不为零时重复

 CMPS、SCAS与REPE/REPZ的使用：
	满足下列两个条件时，重复扫描和比较：
 （1）CX≠0；重复次数还未完成；
 （2）ZF=1；目的操作数等于源操作数或扫描值。


 CMPS、SCAS与REPNE/REPNZ的使用：
满足下列两个条件时，重复扫描和比较：
 （1）CX≠0；表示重复次数还未完成；
 （2）ZF=0；目的操作数不等于源操作数或扫描值。


## 控制操作

   控制类指令包括程序转移指令和处理机控制指令

程序控制转移指令
转移指令（JMP, JNZ）
调用和返回指令（Call/RET）
循环控制指令(LOOP)
中断指令

这类指令的共同特点是可改变程序的正常执行顺序,使之转移。而改变程序的执行顺序,本质上就是要改变CS:(E)IP的内容这类指令对标志位无影响。


### 转移指令

转移指令的实质：改变IP(或CS)的内容。
 所有转移指令不会影响标志位。
 分为无条件转移和条件转移两种。


#### JMP
**jump**

无条件转移指令 – JMP
	本指令无条件转移到指定的目标地址,以执行从该地址开始的程序段。

① 段内直接转移（相对转移）

转移的目标地址由指令直接给出。指令中直接给出的目标地址实际上是一个相对于IP的位移量。
       位移量    转移范围             汇编语言中格式                        	
       8位     -128～+127         JMP SHORT OPRD 	       	
       16位  -32768～+32767  JMP NEAR PTR OPRD
例：	
```asm
JMP	0120H	         ；直接转向0120H	     	
JMP	SHORT LPI	     ；转向LPI		
JMP	NEAR PTR BBB	；转向BBB
```
由于是段内转移,故转移后CS内容保持不变。


②段内间接转移
	转移的目标地址(偏移量)由寄存器或存储单元的内容给出。
    例1：
```asm
JMP    SI
```
若指令执行前(SI)=1200H，则指令执行后，(IP)=1200H,于是转向代码段的偏移地址1200H处执行。

注意：目标地址以段内偏移的形式给出，而不是相对于IP的位移量，所以它是一个16位的操作数。

例2：
```asm
JMP  [BX+DI]
```
设指令执行前:
     (DS)=3000H, (BX)=1300H, (DI)=1200H, 
     (32500H)=2350H；  
则指令执行后:(IP)=2350H

在汇编语言中,段内间接寻址通常写成：
```asm
JMP	WORD PTR[BX+DI]
```
表示所取得的目标地址是一个字。


③段间直接转移
	在指令中直接给出要转移到的目的段地址和偏移地址。
 	 例：
```asm
JMP	2000:1000H
```
执行时,(IP)←1000H,(CS)←2000H

注：直接地址为符号地址时，段间直接转移指令中的符号地址前应加操作符FAR PTR。
  例：
 ```asm
JMP	FAR PTR  far_label				
  ```
  其中的far_label为远类型的标号。


④段间间接转移

转移的目的地址(段和偏移)在两个相邻的字存储单元中。
例如：
```asm
JMP	DWORD PTR [SI]
```
设指令执行前:(DS)=4000H，(SI)=1212H,
     		(41212H)=1000H，(41214H)=4A00H
	则指令执行后:(IP)=1000H，(CS)=4A00H，于是转到4B000H处开始执行指令。

例中的DWORD PTR表示转移地址是一个双字。


 判断无符号数的大小



#### JXX

条件转移指令 - JXX

条件转移指令可实现程序的条件分支。	条件转移指令根据标志位的状态来决定是否进行分支转移。
格式： JXX      label	；xx为条件名称缩写
	条件转移指令只能是段内直接转移，且指令的转移范围为指令所在位置的-128～+127字节。

判断无符号数的大小

JA/JNBE    ；高于/不低于且不等于，则转移(A＞B)			条件为: CF=0∧ZF=0
JAE/JNB      ；高于或等于/不低于，则转移(A≥B)			条件为: CF=0∨ZF=1
JB/JNAE      ；低于/不高于且不等于，则转移(A<B)			条件为: CF=1∧ZF=0
JBE/JNA       ； 低于或等于/不高于，则转移(AB)			条件为: CF=1∨ZF=1

Not, Above, Bellow, Equal

判断有符号数的大小

JG/JNLE       ；大于/不小于且不等于，则转移(A＞B)			条件为: (SF⊕OF=0)∧ZF=0
JGE/JNL      ；大于或等于/不小于，则转移(A≥B)				条件为: (SF⊕OF=0)∨ZF=1
JL/JNGE       ；小于/不大于且不等于，则转移(A＜B)			条件为: (SF⊕OF=1)∧ZF=0
JLE/JNG      ；小于或等于/不大于，则转移(A≤B)				条件为: (SF⊕OF=1)∨ZF=1

Not, larGe , Little, Equal


根据单个标志位设置的条件转移指令

JC      	 ；CF=1,则转移
JNC    	 ；CF=0,则转移
JE/JZ     	 ；结果为零(ZF=1),则转移
JNZ/JNE     ；结果不为零(ZF=0),则转移
JP/JPE         ；奇偶标志PF=1(偶),则转移
JNP/JPO     ；奇偶标志PF=0(奇),则转移
JS         	 ；SF=1,则转移
JNS       	 ；SF=0,则转移
JO		   ；OF=1,则转移
JNO		   ；OF=0,则转移


根据CX内容来决定是否转移的转移指令
 
   JCXZ  label
      若(CX)=0, 则转移到label处开始执行。

#### 例子

例：在8000H开始的长度为1000字节的字符串中查找’S’，若找到，把其偏移地址记录在ADDR中，否则ADDR单元置为0FFFFH。

```asm
	MOV    DI, 8000H
                  MOV    CX, 1000
                  MOV    AL, ’S’
                  MOV    ADDR, 0FFFFH    
   GOON:   SCASB
                  LOOPNZ   GOON	; (CX)≠0∧ZF=0时，循环。
                  JNZ      DONE 	          ；ZF=0，转移。
                  DEC     DI		          ；找到
                  MOV    ADDR, DI
   DONE:    HLT
```

### 循环控制指令

用在循环程序中以确定是否要继续循环。
循环次数通常置于CX中。
转移的目标应在距离本指令-128～+127的范围之内。
循环控制指令不影响标志位。


#### LOOP

(1)LOOP


格式：LOOP   label
操作：(CX)-1→CX；
      若(CX)≠0,则转至label处执行；
      否则退出循环,执行LOOP后面的指令。
  LOOP指令与下面的指令段等价：
  ```asm
	 DEC  CX
	 JNZ  label
```


(2) LOOPZ (LOOPE)

格式：LOOPZ   label
操作：(CX)-1→CX；
      若(CX)≠0∧ZF=1,则转至label处继续循环；
      否则退出循环,执行LOOP后面的指令。

(3) LOOPNZ (LOOPNE)
格式：LOOPNZ   label
操作：(CX)-1→CX；
      若(CX)≠0∧ZF=0,则转至label处继续循环；
      否则退出循环,执行LOOP后面的指令。


#### 例子

例1：给1A000H开始的256个内存单元均减去1，若发现某个单元减为0则立即退出循环，其后的单元不再减1。

```asm
                  MOV    AX, 1A00H
                  MOV    DS, AX	；段基址
                  MOV    DI, 0		；偏移量
                  MOV    CX, 256  	；循环次数
   GOON: DEC     BYTE PTR[DI] ；减1
                  INC      DI		        ；移动指针
                  CMP    BYTE PTR[DI-1],0
                  LOOPNZ   GOON
                  HLT       
```

### 过程调用和返回指令

过程(子程序)							  一段具有特定功能的，供其它程序调用的公用程序。
特点
调用子程序时，IP(CS)的内容被压入堆栈栈顶。从子程序返回时，栈顶的内容又被弹出到IP(CS)。
子程序执行结束后一般均要返回调用程序。
一次定义，可多次调用；
可带参数调用，以完成不同的功能。

优点					
程序代码短, 结构清晰, 便于编程、调试、修改和阅读。  
两条相关指令：
子程序调用指令 CALL
子程序返回指令 RET



#### CALL

调用指令CALL

一般格式：CALL  sub   ;sub为子程序的入口。
根据子程序入口的寻址方式，子程序调用有四类。
① 段内直接调用							子程序的偏移地址直接由CALL指令给出。 
格式：CALL near_proc 						CALL执行时，它首先将IP内容压栈，然后把指令中给出的位移量加到IP上。
	  注：经汇编后的调用地址是相对于CALL的下一条指令的位移量。
	例：
```asm
	CALL  0120H  ;子程序偏移地址由指令给出
```
程序可能浮动，所以只记相对位移量。


#### RET
**return**

返回指令RET

段内返回指令RET的操作为：				 	IP←((SP)+1,(SP))    ;栈顶内容弹出到IP		SP←(SP)+2
段间返回指令RET的操作为：				  	IP←((SP)+1,(SP))    ;栈顶内容弹出到IP		  	SP←(SP)+2						  	CS←((SP)+1,(SP))    ;栈顶内容弹出到CS			SP←(SP)+2
另有一种带立即数返回指令：RET  n				其中n为偶数，表示从栈顶弹出地址后另外丢弃的字节数。								例：
```asm
RET 4   ;返回后再丢弃栈顶的4个字节
```

### 中断指令

8086/8088 CPU在程序中允许安排一条中断指令来引起一个中断过程,这种中断叫内部中断,或叫软中断。

中断指令共有三条：
  (1) INT n  执行类型n的中断服务程序，N=0～255
  (2) INTO   执行溢出中断的中断服务程序；
  (3) IRET   从中断服务程序返回调用程序。



#### INT
**interrupt**

1、INT n     ;n=0～255,为中断类型号
本指令的操作步骤为：
①((SP)-1,(SP)-2)←(FLAGS)，SP←(SP)-2			保护标志寄存器的内容
②IF←0,TF←0							中断服务程序中禁止外部INTR中断和单步中断
③((SP)-1,(SP)-2)←(CS)，SP←(SP)-2，CS←(n*4+2)		中断服务程序的段地址送入CS。n*4为向量地址。该向量地址中的内容即为中断服务程序入口地址。
④((SP)-1,(SP)-2)←(IP)，SP←(SP)-2，IP←(n*4)		中断服务程序的偏移地址送IP。
INT指令只影响IF和TF, 对其余标志位无影响。
INT指令可用于调用系统服务程序，如INT 21H。


#### INFO

**interrupt overflow**

溢出中断INTO
  	INTO检查溢出标志OF, 如果OF=1, 则启动一个类型4的中断过程；如果OF=0,不做任何操作。
	通常INTO指令安排在有符号数算术运算指令后面。如：
```asm
IMUL	DX						
INTO		     ;若溢出，则启动INT 4,否则继续	
MOV	RESULT, AX					
MOV	RESULT+2, DX				
		……
```


#### IRET

**interrupt return**

中断返回指令IRET

用于从中断服务程序返回到被中断的程序。任何中断服务程序不管是外部中断引起的, 还是内部中断引起的, 最后都要用IRET返回。
 	该指令执行的操作为	IP←((SP)+1,(SP))     ;栈顶内容弹出到IP	SP←(SP)+2							CS←((SP)+1,(SP))     ;栈顶内容弹出到CS	SP←(SP)+2				FLAGS←((SP)+1,(SP))  ;栈顶内容弹出到FLAG	SP←(SP)+2

### 标志位操作指令

1.标志操作指令：用来设置标志位的状态。
 （1）CF设置指令					CLC    0→CF						STC    1→CF						CMC   CF变反
 （2）DF设置指令					CLD    0→DF (串操作的指针移动方向从低到高)	STD    1→DF (串操作的指针移动方向从高到低)
 （3）IF设置指令					CLI     0→IF (禁止INTR中断)			STI     1→IF (开放INTR中断)       

