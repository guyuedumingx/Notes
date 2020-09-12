### Shell   

#### First Sample  

test.sh:  
```bash
#!/bin/bash
echo "Hello World"
```

#### Run Shell  

1 :  

```bash
>>> chmod +x ./test.sh # 使脚本具有运行权限
>>> ./test.sh # 执行脚本
```

2 :  

```bash
>>> /bin/sh test.sh
```

#### Define Variable  

```bash
your_name="runoob"
```

> There is no space between variable_name and equals  

#### Use Variable  

> Add an $ before you use a defined variable  

```bash
your_name="qinjx"
echo $your_name
echo ${your_name} #Multiple choice to add{}
```
#### Read-only variable  

use key: readonly  

```bash
#!/bin/bash
my_name="Harden"
readonly my_name #The value of my_name will never change anymore
```
#### Delete Variable  

use key: unset  

```bash
unset variable_name
```

> unset command can not detele Read-only variable  

### The kind of the variable  

1. Local Variable: define in shell or command,can only use by this shell  
2. Environment Variable: can used by all application,sometimes shell can define it  

#### String   

use '' or ""  

单引号：  
	- 单引号中的任何字符都会原样输出，单引号字符串中的变量是无效的  
	- 单引号字串中不能出现单独一个的单引号(对单引号使用转义符后也不行)，但可以成对出现，作为字符串的拼接使用  

双引号的优点：  
	- 双引号可以有变量  
	- 双引号中可以出现转义字符  

```bash
your_name="Runoob"

#使用双引号拼接  
greeting="Hello,"${your_name}"!"
greeting_1="hello, "$your_name"!" 
echo ${greeting} ${greeting_1}

#使用单引号拼接
greeting_2='hello, '$your_name'!'
greeting_3='Hello, '${your_name}'!'
echo $greeting_3 $greeting_2
``` 
输出结果为：  
```
>>> Hello,Runoob! hello, Runoob!
>>> Hello, Runoob! hello, Runoob!
```

##### 获取字符串长度  

```bash
string="abcd"
echo ${#string} #输出4
```

##### 提取子串  

从第二个字符开始取4个字符  

```bash
string="runoob is a great site"
echo ${string:1:4} #out unoo
```

##### 查找子串  

查找i或o(谁先出现找到谁)  

```bash
string="runoob is a great site"
echo `expr index "$string" io` #out 4
```

### Define Array  

```bash
array_name=(value0 value1 value2)  

array_name=(
value0
value1
value2
)

array_name[0]=value0
array_name[1]=value1
```

#### 读取数组  
读取数组元素的一般形式是：  

```bash
${array_name[index]}  

#使用@符号可以读取数组中的所有元素：  
echo ${array_name[@]}
```
Sample:  
```bash
my_array[0]=A
my_array[1]=B
my_array[2]=C
my_array[3]=D

echo "${my_array[*]}"
echo "${my_array[@]}"
```

#### 获取数组长度   

```bash
# 取得数组长度的方法与获取字符串长度的方法相同  
length=${#array_name[@])

#或者  
length=${#array_name[*]}

# 取得数组单个元素的长度  
lengthn=${#array_Oname[n]}
```
### Shell 注释  

以#开头的行就是注释  

> 把一段要注释的代码用一对花括号括起来，定义成一个函数，没有地方调用这个函数，这块代码就不会执行，达到了和注释一样的效果  

#### 多行注释  

```bash

:<<EOF
注释内容...
EOF
```
> EOF也可以是其他符号  

```bash
:<<'
注释内容...
'
:<<!
注释内容...
!
```
### Shell 传递参数  

执行shell脚本时，向脚本传递参数，脚本内获取参数的格式为：$n。n代表一个数字，1为执行脚本的第一个参数，2为执行脚本的第二个参数  

```bash
#!/bin/bash
# author: Harden 

echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```

```bash
>>> chmod +x ./can.sh
>>> ./can.sh 1 2 3
执行的文件名：./can.sh
第一个参数为：1
第二个参数为：2
第三个参数为：3
```

处理参数的特殊字符：   

|参数处理|说明|
|:--|:--|
|$#|传递到脚本的参数个数|
|$*|以一个单字符串显示所有向脚本传递的参数。如"$*"用""括起来的情况，以"$1 $2 $3...$n"的形式输出所有参数|
|$$|脚本运行的当前进程ID号|
|$!|后台运行的最后一个进程的ID号|
|$@|与$*相同，但是使用是加括号，并在引用中返回每个参数。如"$@"用”“括起来的情况，以"$1""$2""$3"的形式输出所有的参数|
|$-|显示Shell使用的当前选项，与set命令功能相同|
|$?|显示最后命令的退出状态，0表示没有错误，其他任何值表示有错误|

### Shell 基本运算符  

> 原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。
expr 是一款表达式计算工具，使用它能完成表达式的求值操作。  

```bash
#!/bin/bash

val=`expr 2 + 2`
echo "两数之和为：$val"
```
> 表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。
完整的表达式要被 \` \` 包含，注意这个字符不是常用的单引号，在 Esc 键下边。  

a=10,b=20  

|运算符|说明|举例|
|:--|:--|:--|
|+|加法|`expr $a + $b`结果为30|
|-|减法|`expr $a - $b`结果为 -10|
|*|乘法|`expr $a \* $b`结果为200|
|/|除法|`expr $b / $a`结果为2|
|%|取余|`expr $b % $a`结果为0|
|=|赋值|a=$b 将把变量b的值赋给a|
|==|相等|[ $a == $b ]返回false|
|!=|不想等|[ $a != $b ]返回true|

> 条件表达式要放在方括号之间，并且要有空格，例如: [$a==$b] 是错误的，必须写成 [ $a == $b ]  

> 乘法(*)前边必须加反斜杆(\)才能实现乘法  

#### 关系运算符  

> 关系运算符只支持数字，不支持字符串，除非字符串的值是数字。
下表列出了常用的关系运算符，假定变量 a 为 10，变量 b 为 20：  

|运算符|说明|举例|
|:--|:--|:--|
|-eq|检测两个数是否相等，相等返回 true.|[ \$a -eq \$b ]返回false。|
|-ne|检测两个数是否不相等，不相等返回 true|[ \$a -ne \$b ]返回true|
|-gt|检测左边的数是否大于右边的，如果是，则返回 true|[ \$a -gt \$b ]返回false|
|-lt|检测左边的数是否小于右边的，如果是，则返回 true|[ \$a -lt \$b ]返回true|
|-ge|检测左边的数是否大于等于右边的，如果是，则返回 true|[ \$a -ge \$b ]返回false|
|-le|检测左边的数是否小于等于右边的，如果是，则返回 true|[ \$a -le \$b ]返回true|

#### 布尔运算符  

a=10 b=20

|运算符|说明|举例|
|:--|:--|:--|
|!|非运算|[!false]返回true|
|-o|或运算|[ $a -lt 20 -o $b -gt 100 ]返回true|
|-a|与运算|[ $a -lt 20 -a $b -gt 100 ]返回false|

#### 逻辑运算符  

|运算符|说明|举例|
|:--|:--|:--|
|&&|逻辑AND|[[ $a -lt 100 && $b -gt 100 ]]返回false |
|两竖|逻辑OR|[[ $a -lt100 两竖 $b -gt 100 ]]返回true|

 
|操作符|说明|举例|
|:--|:--|:--|
|-b file|检测文件是否是块设备文件，如果是，则返回 true|[ -b \$file ]返回false|
|-c file|检测文件是否是字符设备文件，如果是，则返回 true|[ -c \$file ]返回false|
|-d file|检测文件是否是目录，如果是，则返回 true|[ -d \$file ]返回false|
|-f file|检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true|[ -f \$file ]返回true|
|-g file|检测文件是否设置了 SGID 位，如果是，则返回 true|[ -g \$file ]返回false|
|-k file|检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true|[ -k \$file ]返回false|
|-p file|检测文件是否是有名管道，如果是，则返回 true|[ -p \$file ]返回false|
|-u file|检测文件是否设置了 SUID 位，如果是，则返回 true|[ -u \$file ]返回false|
|-r file|检测文件是否可读，如果是，则返回 true|[ -r \$file ]返回true|
|-w file|检测文件是否可写，如果是，则返回 true|[ -w \$file ]返回true|
|-x file|检测文件是否可执行，如果是，则返回 true|[ -x \$file ]返回true|
|-s file|检测文件是否为空（文件大小是否大于0），不为空返回 true|[ -s \$file ]返回true|
|-e file|检测文件（包括目录）是否存在，如果是，则返回 true|[ -e \$file ]返回true|

其他检查符：  	
> -S:判断某文件是否socket  
> -L:检测文件是否存在并且是一个符号链接  

#### Shell echo  

```bash
echo string
```

1. 引号可以省略：  
```bash
echo It is a test
```

2. 显示转义字符  
3. 显示变量  

#### Read命令读入一行  

```bash
#!/bin/sh

read name
echo "$name It is a test"
```

运行：   
```bash
>>> sh test.sh
OK  
OK It is a test
```

显示换行：  
```bash
echo -e "OK! \n" # -e 开启转义  
echo "It is a test"
```

显示不换行：  
```bash
echo -e "OK! \c" # -e 开启转义 \c 不换行  
echo "It is a test"
```

显示结果定向至文件：  
```bash
echo "It is a test" > myfile 
```

原样输出字符串，不进行转义或取变量（用单引号）  

```bash
echo '$name"'
```

显示命令执行结果  
```bash
echo `date`
```
结果将显示当前日期：  
```bash
The Jul 24 10:08:46 CST 2020
```

### Shell printf  

```bash
printf format-string [arguments]
```

参数说明：   
	- format-string 为格式控制字符串
	- arguments参数列表  

```bash
printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg  
printf "%-10s %-8s %-4.2f\n" 郭靖 男 66.1234 
printf "%-10s %-8s %-4.2f\n" 杨过 男 48.6543 
printf "%-10s %-8s %-4.2f\n" 郭芙 女 47.9876 
```

1. %s %c %d %f都是格式替代符  
2. %-10s 指一个宽度为10个字符（-表示左对齐，没有则表示右对齐），任何字符都会被显示在10个字符宽的字符内，如果不足则自动以空格填充，超过也会将内容全部显示出来。  
3. %-4.2f 指格式化为小数，其中.2指保留2位小数。  

```bash
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com
 
# format-string为双引号
printf "%d %s\n" 1 "abc"

# 单引号与双引号效果一样 
printf '%d %s\n' 1 "abc" 

# 没有引号也可以输出
printf %s abcdef

# 格式只指定了一个参数，但多出的参数仍然会按照该格式输出，format-string 被重用
printf %s abc def

printf "%s\n" abc def

printf "%s %s %s\n" a b c d e f g h i j

# 如果没有 arguments，那么 %s 用NULL代替，%d 用 0 代替
printf "%s and %d \n" 
```
Result:  
```
1 abc
1 abc
abcdefabcdefabc
def
a b c
d e f
g h i
j  
 and 0
```

#### Shell test  

> 用于检查某个条件是否成立  

|参数|说明|
|:--|:--|
|-eq|等于则为真|
|-ne|不等于则为真|
|-gt|大于则为真|
|-ge|大于等于则为真|
|-lt|小于则为真|
|-le|小于等于则为真|

```bash
num1=100
num2=100
if test $[num1] -eq $[num2]
then 
	echo '两个数相等'
else
	echo '两个数不相等'
fi
```

代码中[]执行基本的算数运算，如：  
```bash
#!/bin/bash

a=5
b=6

result=$[a+b] # 注意等号两边不能有空格
echo "result 为： $result"
```

#### 字符串测试  

|arugments|information|
|:--|:--|
|=|等于则为真|
|!=|不相等则为真|
|-z字符串|字符串的长度为零则为真|
|-n字符串|字符串的长度不为零则为真|

Practice:  
```bash
num1="ru1noob"
num2="runoob"
if test $num1 = $num2
then
    echo '两个字符串相等!'
else
    echo '两个字符串不相等!'
fi
```

#### File Test   

|arguments|information|
|:--|:--|
|-e 文件名|如果文件存在则为真|
|-r 文件名|如果文件存在且可读则为真|
|-w 文件名|如果文件存在且可写则为真|
|-x 文件名|如果文件存在且可执行则为真|
|-s 文件名|如果文件存在且至少有一个字符则为真|
|-d 文件名|如果文件存在且为目录则为真|
|-f 文件名|如果文件存在且为普通文件则为真|
|-c 文件名|如果文件存在且为字符型特殊文件则为真|
|-b 文件名|如果文件存在且为块特殊文件则为真|

Practice:  
```bash
cd /bin
if test -e ./bash
then
    echo '文件已存在!'
else
    echo '文件不存在!'
fi
```

> Shell还提供了与( -a )、或( -o )、非( ! )三个逻辑操作符用于将测试条件连接起来，其优先级为："!"最高，"-a"次之，"-o"最低  

Practice:  
```bash
cd /bin
if test -e ./notFile -o -e ./bash
then
    echo '至少有一个文件存在!'
else
    echo '两个文件都不存在'
fi
```

#### If  
```bash
if conditon
then 
	command1
elif condition2
then	
	command2
else
	command3
fi
```
写成一行：  
```bash
f [ $(ps -ef | grep -c "ssh") -gt 1 ]; then echo "true"; fi
```

#### For  

```bash
for var in item1 item2 ... itemN
do 
	command1
	command2
	...
	command3
done
```
写成一行：  
```bash
for var in item1 item2; do command1; command2 ... done;
```

Sample:  
```bash
for loop in  1 2 3 4 5
do 
	echo "The value is: $loop"
done
```
```bash
for str in 'This is a string'
do 
	echo $str
done
```

#### While  

```bash
while condition
do 
	command
done
```

Sample:  
```bash
int=1
while(( $int<=5 ))
do 
	echo $int
	let "int++"
done
```
```bash
echo '按下 <CTRL-D> 退出'
echo -n '输入你最喜欢的网站名: '
while read FILM
do
    echo "是的！$FILM 是一个好网站"
done
```

##### 无限循环  
```bash
while :
do 
	command
done

# or
while true
do 
	command
done

# or 
for (( ; ; ))
```

#### until循环  

1. until 循环执行一系列命令直至条件为 true 时停止。  
2. until 循环与 while 循环在处理方式上刚好相反。  
3. 一般 while 循环优于 until 循环，但在某些时候—也只是极少数情况下，until 循环更加有用。  

Format:  
```bash
until condition
do 
	command
done
```
> condition 一般为条件表达式，如果返回值为 false，则继续执行循环体内的语句，否则跳出循环  

Sample 输出0-9数字：   
```bash
a=0

until [ ! $a -lt 10 ]
do 
	echo "$a"
	a=`expr $a + 1`
done

















