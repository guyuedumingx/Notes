# Clean Code  

1. *神在细节之中*  
2. *整洁的代码只做好一件事*  
3. *如何在意代码*  
4. *让营地比你来时更干净*  

**简洁代码**  

- 能通过所有测试  
- 没有重复代码  
- 体现系统中全部设计理念  
- 包括尽量少的实体，比如类，方法，函数等  

> 如果每个里程都让你感到深合己意，那就是整洁代码。  
> 如果代码让编程语言看起来像是专为解决那个问题而存在，就可以称之为漂亮的代码  
> -- Ward Cunningham  

### 有意义的命名  

```
变量名应该明确它为什么会存在，它做什么事，应该怎么用  
```

> 如果名称需要注释来补充，那就不算是名副其实  

**代码要关联上下文**  

没有关联,不知道这个方法是干什么的  
```java
public List<int[]> getThem() {
	List<int[]> list1 = new ArrayList<int[]();
	for (int[] x : theList)
		if (x[0] == 4)
			list1.add(x);
		return list1;
}
```

- theList中是什么类型的东西  
- theList零下标条目的意义是什么  
- 值4的意义是什么  
- 我怎么使用返回的列表  

----  
比方说我们在开发一种扫雷游戏，我们发现，盘面是名为`theList`的单元格列表，那就将其名称改为`gameBoard`。  
盘面上每一个单元格都用一个简单数组表示。我们还发现，零下标条目是一种`状态值`，而该状态值为`4`表示`已标记`。只要改为有意义的名称，代码就会得到相当程度的改进  

----  

```java
public List<int[]> getFlaggedCells() {
	List<int[]> flaggedCells = new ArrayList<int[]();
	for (int[] x : gameBoard)
		if (x[STATUS_VALUE] == FLAGGED)
			flaggedCells.add(x);
		return flaggedCells;
}
```

不用int表示单元格，新写一个类，类包括一个名副其实的函数(isFlagged)，从而掩盖住那个`魔术数`。  

```java
public List<int[]> getFlaggedCells() {
	List<Cell> flaggedCells = new ArrayList<Cell>();
	for (Cell cell : gameBoard)
		if (cell.isFlagged)
			flaggedCells.add(cell);
		return flaggedCells;
}
```

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

> 明确是王道  

### 类名  

> 类名和对象名应该是名词或名词短语  
> 类名不应该是动词

```
Such as: Customer WikiPage Account AddressParser  
Not as : Manager Processor Data Info  
```  

> 函数是语言的动词，类是名词  

### 方法名  

> 方法名应当是动词或动词短语  

Such as :

```
 postPayment deletePage save  
```

> 属性访问器，修改器和断言应该根据其值命名，并依Javabean标准加上get set is前缀  

重载构造器时，使用描述了参数的静态工厂方法名  

Such as :

```
Complex fulcrumPoint = Complex.FromRealNumber(23.0)  
```

通常好于  

```
Complex fulcrumPoint = new Complex(23.0)
```
> 可以考虑将相应的构造器设置为private, 强制使用这种命名手段  

**每个概念对应一个词 --一以贯之**  
```
如果在同一堆代码中有controller,又有manager,还有driver,就会令人疑惑  
```

**别用双关语  --一词一义**  
```
避免将同一单词用于不用目的，同一术语用于不同概念  
```

**使用解决方案领域的名称**  
```
只有程序员会读你的代码  
```

**添加有意义的语境**  
```
添加add前缀之类的  
```

**不要添加没用的语境**  

只要短名称足够清楚，就要比长名称好。  

### 函数  


函数的第一规则是短小，第二规则是更短小  

> 函数就应该只有5,6行  

1. 每个函数都只说一件事  
2. 而且每个函数都依序把你带到下一个函数  


**代码块和缩进**  

if语句，else语句，while语句等，其中的代码快应该只有一行。该行大抵应该是一个函数调用语句  

1. 函数不应该大到足以容纳嵌套结构  
2. 函数的缩进层级不该多于一层或两层  

*函数应该做好一件事。做好这件事，只做一件事*   

> 函数中的语句都要在同一个抽象层级上  
> 判断函数是否不止做了一件事，可以看是否还能拆出一个函数  

**向下规则**  

每个函数后面都跟位于下一抽象层级的函数    


*程序就像是一序列TO起头的段落，没一段都描述当前抽象层级，并引用位于下一抽象层级的后续啊TO起头的段落*    


**如果每个例程都让你感到深合己意，那就是整洁代码**  

1. 长而具有描述性的名称，要比短而令人费解的名称好  
2. 长而具有描述性的名称，要比描述性的长注释好  

> 最理想的参数数量是零，其次是一，再次是二  

尽量避免三参数函数。无论如何最好别出现三个以上参数的函数  

输出参数比输入参数还要难理解，最好通过返回值从函数中输出  

向函数传递参数的情况：  

1.获取参数的信息  

```java
boolean fileExists("MyFile")  
```

2.操作该函数，将其转换为其他东西  

```java
InputStream fileOpen("MyFile")  
```  

把String类型的文件名转换为InputStream类型的返回值  

3.事件  

有输入参数而无输出参数  
使用该函数修改系统状态 

```java
void passwordAttemptFailedNtimes(int attempts)

```

**反例：**  

```
void includeSetupPageInto(StringBuffer pageText)  
```

对于转换，应该使用返回值  

```
transform(StringBuffer out)  
```  

#### 标识参数  

不要向函数传入布尔值  

应该用把函数一分为二，分别处理true 和 false部分  

尽量把二元函数转换成一元函数  

1. 把一元函数写成二元函数的成员  
2. 把二元函数其中的一个参数写成类的成员变量  

#### 参数对象  

把参数封装成类来减少参数的数量  

```java
Circle makeCircle(double x, double y, double radius)  
Circle makeCircle(Point center, double radius)  
```

> 当一组参数共同被传递，往往就是该有自己名称的某一个概念的一部分  

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

> 函数要么回答什么事，要么做什么事，二者不可得兼  

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

#### 使用异常替代返回错误码  

> 防止因if导致的更深层次的嵌套结构  

#### 抽离TryCatch代码块  

把try和catch代码块的主题部分抽离出来，另外形成函数  

```java
public void delete(Page page) {
	try {
		deletePageAndAllReference(page);
	}
	catch (Exception e) {
		logError(e);
	}
}

private void deletePageAllReference(Page page) throws Exception {
	deletePage(page);
	registry.deleteReference(page.name);
	configKeys.deleteKey(page.name.makeKey());
}

private void logError(Exception e) {
	logger.log(e.getMessage());
}
```

#### 错误处理就是一件事  

处理错误的函数不该做其他事  

这意味着如果关键字try在某个函数中存在，它就该是这个函数的第一个单词，而且在catch/finally代码块后面也不该有其他内容  

#### 结构化编程  

> 每个函数、函数中的每个代码块中只该有一个return语句，循环中不能有break或continue语句，永远不能有任何的goto语句。  

## 注释  

与其花时间编写解释你糟糕的代码的注释，不如花时间清洁糟糕的代码  

1. 对意图的解释  
2. 阐释  
	- 把晦涩难明的参数或返回值的意义翻译为某种可读形式  
3. 警示  
	- 警告其他程序员会出现某种后果  

#### TODO注释  

在源码中放置要做的工作列表  
是程序员认为应该做，但是还没做的工作  

```java
//TODO-MdM these are not needed
// We except this to go away we do the checkout meodel  
protected VersionInfo makeVersion() throws Excpetion {
return null;
}
```

> 不必每个函数都要有Javadoc或每个变量有要有注释  

*能用函数或变量时就别用注释*  

> 不要直接把代码注释掉  


## 代码格式  

#### 垂直格式  

文件长度在200行到500行之间比较合适  

**概念间垂直方向上的区隔**    
在封包声明，导入声明和每个函数之间，都有空白行隔开  

**垂直方向上的靠近**  
紧密相关的代码应该相互靠近  

1. 多个实体变量的定义  

> 尽量不把关系密切的概念放到不同的文件中  

**变量声明**  
变量声明应该尽可能靠近其使用的位置  
本地变量应该在函数的顶部出现  

**实体变量**  
应该在类的顶部声明  
应该被该类的所有方法或大部分方法所用  
让大家知道在哪儿可以看到这些声明  

**相关函数**  
若某个函数调用另外一个，就应该把它们放在一起  
调用者应该尽可能的放在被调用者上面  

### 横向格式  

> 无需拖动滚动条原则    

#### 水平方向上的区隔与接近  

```
使用空格字符将彼此紧密相关的食物连接到一起  
把相关性较弱的食物分割开  
```

1. 在赋值符周围加上空格  
2. 函数参数前加空格  
3. 不在函数名和左圆括号之间加空格  
 
乘法因子之间可以不加空格(优先级较高)，加减法之间加空格，优先级较低   

> 过程式代码(使用数据结构的代码)便于在不改动既有数据结构的前提下添加新函数  
> 面向对象代码便于在不改动既有函数的前提下添加新类  

*方法不应调用由任何函数返回的对象的方法*  
```java
final String outputDir = ctxt.getOptions().getScratchDir();
```
#### 数据传送对象DTO  

Data Transfer Object  

只含有公共变量，没有函数的类  

```java
public class Address {
	private String street;
	private String streetExtra;
	private String city;

	public Address(String street, String streetExtra, String city) {
	this.street = street;
	this.streetExtra = streetExtra;
	this.city = city;
	}

	public String getStreet() {
		return street;
	}

	public String getStreetExtra() {
		return streetExtra;
	}

	public String getCity() {
		return city;
	}
}
```

## 错误处理   

#### 依调用者需要定义异常类  

```java
public class LocalPort {
	private ASMEPort innerPort;

	public LocalPort(int portNumber) {
		innrPort = new ACMEPort(portNumber);
	}

	public void open() {
		try {
			innerPort.open();
		} catch (DeviceResponseException e) {
			throw new PortDeviceFailure(e);
		} catch (ATM1212UnlockedException e) {
			throw new PortDeviceRailure(e);
		} catch (GMXError e) {
			throw new PortDeviceFailure(e);
		}
	}
}
```

**不要返回null值**  

若需要返回空列表，可以用Collections.emptyList()  
	
**别传递null值**  

尽量不要将null值传递给其他方法  

如果有人传入null值，可以使用断言来处理  

```
assert <boolean表达式> : <错误信息表达式>
```
如果<boolean表达式>为true，则程序继续执行  
如果为false,则程序抛出java.lang.AssertionError,并输入<错误表达式>  

```java
public class MetricsCalculator {
	public double xProjection(Point p1, Point p2) {
		assert p1 != null : "p1 should not be null";
		assert p2 != null : "p2 should not be null";
		return (p2.x = p1.x) * 1.5;
	}
}
```

> 将错误隔离看待，独立于主要逻辑之外，防止错误处理终端主体代码  

## 类  

#### 类的组织  

类应该从一组变量列表开始   

1. 公共静态常量  
2. 私有静态常量  
3. 私有实体变量  
4. 公共变量  
5. 公共函数  
6. 私有工具函数(紧跟调用其的公共函数)  

#### 类应该短小  

> 类的第一条原则是应该短小  

**单一权责原则SRP**  
类或模块应有且只有一条加以修改的理由  

> 类应该只负责一块

*系统应该由许多短小的类而不是少量巨大的类组成。每个小类封装一个权责，只有一个修改的原因，并与少数其他类一起协同达成期望的系统行为*  

**内聚性**  
类应该只有少量实体变量  
每个方法都应该操作一个或多个这种变量   
方法操作的变量越多，就越粘聚到类上  

> 如果一个类的每个变量都被每个方法所用，则该类具有最大的内聚性  


## 系统  

分离构造和使用过程  

- 运行所有测试  
- 不可重复  
- 表达了程序员的意图  
- 尽可能减少类和方法的数量  

Java AOP

> 对象是过程的抽象。线程是调度的抽象  
