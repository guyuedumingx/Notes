## Clean Code  

### 有意义的命名  

```
变量名应该明确它为什么会存在，它做什么事，应该怎么用  
```

> 如果名称需要注释来补充，那就不算是名副其实  

不要以a1,a2,aN这样的命名  

不要无意义的区分：  
```	
Product
ProductInfo
ProductData  //与ProductInfo类名称虽然不同，意思却无区别  
``` 

> 以读者能区别不同之处来区分名称  

1. 使用读得出来的名称  
2. 使用可搜索的名称  
3. 避免使用编码  

#### 类名  

> 类名和对象名应该是名词或名词短语  
> 类名不应该是动词

```
Such as: Customer WikiPage Account AddressParser  
Not as : Manager Processor Data Info  
```  

#### 方法名  

> 方法名应当是动词或动词短语  

Such as :

```
 postPayment deletePage save  
```

> 属性访问器，修改器和断言应该根据其值命名，并依Javabean标准加上get set is前缀  

重载构造器时，使用描述了参数的静态工厂方法名  

Such as :

```
Complex fulcrumPoint = Complex.FromRealNumber(23.)  
```

通常好于  

```
Complex fulcrumPoint = new Complex(23.0)
```
> 可以考虑将相应的构造器设置为private, 强制使用这种命名手段  

#### 每个概念对应一个词 --一以贯之  
```
如果在同一堆代码中有controller,又有manager,还有driver,就会令人疑惑  
```

#### 别用双关语  --一词一义  
```
避免将同一单词用于不用目的，同一术语用于不同概念  
```

#### 使用解决方案领域的名称  
```
只有程序员会读你的代码  
```

#### 添加有意义的语境  
```
添加add前缀之类的  
```

#### 不要添加没用的语境  

### 函数  

```
函数的第一规则是短小，第二规则是更短小  
```

> 函数就应该只有5,6行  

```
每个函数都只说一件事  
而且每个函数都依序把你带到下一个函数  
```

#### 代码块和缩进  

if语句，else语句，while语句等，其中的代码快应该只有一行。该行大抵应该是一个函数调用语句  

> 函数的缩进层级不该多于一层或两层  

** 函数应该做好一件事。做好这件事，只做一件事 **    
 

> 函数中的语句都要在同一个抽象层级上  

#### 向下规则  

每个函数后面都跟位于下一抽象层级的函数  

*程序就像是一序列TO起头的段落，没一段都描述当前抽象层级，并引用位于下一抽象层级的后续啊TO起头的段落 *    


**如果每个例程都让你感到深合己意，那就是整洁代码**  

1. 长而具有描述性的名称，要比短而令人费解的名称好  
2. 长而具有描述性的名称，要比描述性的长注释好  
> 最理想的参数数量是零，其次是一，再次是二  

尽量避免三参数函数。无论如何最好别出现三个以上参数的函数  

输出参数比输入参数还要难理解，最好通过返回值从函数中输出  

向函数传递参数的情况：  

1. 获取参数的信息  

```java
boolean fileExists("MyFile")  
```

2. 操作该函数，将其转换为其他东西  

```java
InputStream fileOpen("MyFile")  
```  

把String类型的文件名转换为InputStream类型的返回值  

3. 事件  

有输入参数而无输出参数  
使用该函数修改系统状态 

```java
void passwordAttemptFailedNtimes(int attempts)

```

##### 反例：  

```
void includeSetupPageInto(StringBuffer pageText)  
```

对于转换，应该使用返回值  

```
transform(StringBuffer out)  
```  

#### 标识参数  

不要向函数传入布尔值  

应该用把函数一分为而，分别处理true 和 false部分  

尽量把二元函数转换成一元函数  

1. 把一元函数写成二元函数的成员  
2. 把二元函数其中的一个参数写成类的成员变量  

#### 参数对象  

把参数封装成类来减少参数的数量  

```java
Circle makeCircle(double x, double y, double radius)  
Circle makeCircle(Point center, double radius)  
```

> 当一组参数共同被传递，往往就是该有自己名称的某一个概念的一部分  ‘

#### 参数列表  

可变参数和传递类型为List的单个参数没什么两样 

#### 动词与关键字  

把参数名称编码成函数名  

```
assertEqual  
qssertExpectedEqualsActual(expected, actual)  
```

> 应避免使用输出参数  
> 如果函数必须要修改某种状态，就修改所属对象的状态  

#### 分隔指令与询问  

**函数要么回答什么事，要么做什么事，二者不可得键**  

Such as:  

```java
public boolean set(String attribute, String value);
```

会导致：  

```java
if (set("username","unclebob")) ...
```

应该：  

```java
if (attributeExists("username")) {
	setAttribute("username","unclebob")
}
```

> 把指令和询问分隔开来  


