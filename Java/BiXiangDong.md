# 毕向东视频笔记  
-----------------------

## Day 7 

### 06  子父类中构建器的特点  

1. 每个子类构建器的第一行为隐式表达式super();  
	- 即默认调用父类的默认构建器进行初始化  
2. 如果父类没有空参数的构建器，则需要在子类构建器用super()语句进行显式初始化(手动初始化)super(4);   
3. 如果子类构建器的第一行需要调用自身的其他构建器，为this();则没有super();

##### 子类访问父类构建器的原因：  
子类可以直接获取父类中的数据，所以需要查看父类是如何对这些数据进行初始化的  

### 07 Final关键字  

final修饰符可以修饰类，函数，变量  
1. 被final修饰的类不可以被继承,为了避免被继承，被子类复写功能    
	> 保证封装性  
2. 被final修饰的方法不能被复写  
3. 被final修饰的变量是一个常量只能赋值一次，既可以修饰成员变量，也可以修饰局部变量  
	> 常量书写规范：所有字母大写，如果含有多个单词，单词间通过_连接  
4. 内部类定义在类中的局部位置上时，只能访问该局部被final修饰的局部变量  
 
##### 语法：  

```java
final class Person {
	void show() {}
	final int speak() {}
	public static final MY_PI = 3.1415926;
}
```
### 08-09 抽象类  

当多个类中出想相同功能，但是功能的主体不同时，可以向上抽取，只抽取功能的定义，需求，或部分相同功能，而不抽取功能的主体，建立抽象类。  

1. 抽象方法一定要放在抽象类中  
2. 抽象方法和抽象类必须被abstract关键字修饰  
3. 抽象类不可以用new创建对象，因为调用对象没意义  
4. 抽象类中的方法要被使用，必须由子类复写所有的抽象方法后，建立子类对象使用  
	> 如果子类只复写了部分抽象方法，那么该子类还是一个抽象类  
5. 抽象类可以不定义抽象方法，而只用于控制不能建立该类对象  

```java
//抽象类
abstract class Student {
	//该方法没有主体
    abstract void study();
}

class BaseStudent extends Student {
	//子类复写抽象类的抽象方法  
    void study() {
        System.out.println("Base Study");
    }
}

class AdvAtudent extends Student {
    void study() {
        System.out.println("Advance Study");
    }
}
```

### 11 模板方法模式  

定义功能时，功能的一部分是确定的，且确定的部分包含在不确定的部分中，那么就将不确定的部分暴露出去，由该类的子类去继承  

```java
abstract class GetTime {
    public final void getTime() {
        long start = System.currentTimeMillis();
		//模板	
        runcode();
        long end = System.currentTimeMillis();
        System.out.println("毫秒：" + (end-start));
    }
    public abstract void runcode();
}

//重写模板
class SubTime extends GetTime {
    public void runcode() {
        for (int x = 0; x < 100; x++) {
            System.out.println(x);
        }
    }
}

public class TemplateDemo {
    public static void main(String[] args) {
        SubTime time = new SubTime();
        time.getTime();
    }
}
```

### 12-14 接口  

##### 当抽象类中的方法都是抽象的，那么可以通过接口的形式来表示  

1. class 用于定义类，interface 用于定义接口  
2. implements关键字用于实现接口  
3. 接口可以被类多实现（一个类可以实现多个接口）  
4. 接口中定义的常量可以直接调用  
5. 一个类可以继承的同时可以多实现  
6. 接口间可以相互继承  
7. 接口间可以多继承  

**格式特点：**  
1. 接口中常见定义：常量，抽象方法  
2. 接口成员有固定修饰符  
	- 常量：public static final  
	- 方法：public abstract   
3. 修饰符可以省略，编译器自动加，**但是建议不写**  

```java
//定义接口 
interface Inter {
    public static final int NUN = 3;
    public abstract void show();
}

interface InterA {
    public abstract void method();
}

//用implements实现接口  
class Test implements Inter,IntetA {
    public void show() {
        System.out.println("show");
    }
	public void method(){}
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Test test = new Test();
        System.out.println(test.NUN);
        System.out.println(Test.NUN);
        System.out.println(Inter.NUN);
    }
}

```  

## Day 8  

### 01-02 多态  

事物存在的多种形态  

##### 1. 多态的体现  
    - 父类的引用也可以接受子类对象    
##### 2. 多态的前提  
	- 类与类之前必须有关系，要么继承，要么实现  
	- 存在重写  
##### 3. 多态的好处  
	- 大大提高了程序的拓展性  
##### 4. 多态的局限  
	- 只能使用父类的引用访问父类中的成员    

```java
abstract class Animal {
    abstract void eat();
}

class Cat extends Animal {
    void eat() {
        System.out.println("吃鱼");
    }
    void CatchMouse() {
        System.out.println("抓老鼠");
    }
}

class Dog extends Animal {
    void eat() {
        System.out.println("吃肉");
    }
    void bark() {
        System.out.println("叫");
    }
}

class Pig extends Animal {
    void eat() {
        System.out.println("吃草");
    }
    void gongDi() {
        System.out.println("拱地");
    }
}

public class DuoTaiDemo {
    public static void main(String[] args) {
        Cat cat = new Cat();
        Dog dog = new Dog();
        Animal pig = new Pig();
        cat.CatchMouse();
        function(cat);
        function(dog);
        function(pig);
    }
    public static void function (Animal animal) {
        animal.eat();
    }
}

```

### 03 转型  

1. 不能将父类对象转换为子类类型  
2. 将父类引用指向自己的子类对象时，该引用可以被提升，也可以被强制转换  
3. 多态自始自终是子类对象的变化  
4. instancdof关键词判断是那个子类引用  
	- 子类型有限  
	- 需要对子类型进行其他操作  

```java  
public class DuoTaiDemo2 {
    public static void main(String[] args) {
        Animal a = new Cat();
        a.eat();
        fuc(a);
        fuc(new Dog());
    }
    public static void fuc(Animal animal) {
        if (animal instanceof Cat) {
            Cat c = (Cat)animal;
            c.CatchMouse();
        }
        else if (animal instanceof Dog) {
            Dog d = (Dog)animal;
            d.bark();
        }
    }
```

### 04-05 多态中成员的特点  
1. 非静态  
	1. 在编译期：参阅引用型变量(句柄类)所属的类中是否含有调用的方法，如果有，编译通过，否则失败  
	2. 在运行期：参阅对象所属的类中是否含有调用的方法  
	3. 引用型变量 a = new 对象所属的类  

2. 对于静态方法  
	1. 无论编译还是运行期，都参考（引用型变量所属的类）  

3. 在多态中，成员变量的特点  
	1. 无论在编译和运行期，都参考（引用型变量所属的类）  

### 06-07 多态的主板实例  

```java
interface PCI {
    public abstract void open();
    public abstract void close();
}

class MainBoard {
    public void run() {
        System.out.println("MainBoard Run");
    }

    public void runPCI(PCI pci) {
        pci.open();
        pci.close();
    }
}

class NetCard implements PCI {
    public void open() {
        System.out.println("NetCard Open");
    }

    public void close() {
        System.out.println("NetCard Close");
    }
}

class SoundCard implements PCI {
    public void open() {
        System.out.println("SoundCard Open");
    }

    public void close() {
        System.out.println("SoundCard Close");
    }

}

public class DuoTaiDemo5 {
    public static void main(String[] args) {
        MainBoard mainBoard = new MainBoard();
        mainBoard.run();
        mainBoard.runPCI(new NetCard());
        mainBoard.runPCI(new SoundCard());
    }
}
```
### 08 Object类  

1. equals方法： 比较两个类的内存空间，如果是同一个对象，返回true,否则返回false;   
	- 可以复写equals方法实现自定义的比较功能  
2. toString()方法： 返回对象的字符串表示  

## Day 09  

### 01-02 内部类访问规则  

1. 内部类可以直接访问外部类的成员，包括私有  
	- 之所以能直接访问外部类中的成员，是因为内部类中持有了一个外部类的引用，格式 外部类名.this  
2. 外部类要访问内部类，必须建立内部类对象  
3. 当内部类在成员位置上时，就可以在被成员修饰符修饰  
	- 例如： private 私有化  
	- static: 内部类就具备static的特性  
	- 当内部类被static修饰时，只能访问外部类中的static成员,取消内部类对外围类的使用    
	- 访问静态类的方法： new Outer.Inner().function();  
4. 当内部类定义在外部类的成员位置上，而且非私有，可以直接在外部其他类中直接建立内部类对象  
	- 格式： 外部类名.内部类名 变量名 = 外部类对象.内部类对象;  
	- Outer.Inner inner = new Outer().new Inner();
5. 当外部类定义了静态成员，该内部类必须时静态的  
6. 当外部类中的静态方法访问内部类时，内部类也必须时静态的  


```java

class Outer {

    private int x = 3;

    class Inner {
        int x = 4;
        void function() {
            int x = 6;
            System.out.println("inner:" + x);   x = 6;//直接调用外部类的成员
            System.out.println(this.x); //x = 4;
            System.out.println(Outer.this.x); //x = 3;
        }
    }
    void method() {
        Inner in = new Inner();
        in.function();
    }
}


public class InnerClassDemo {
    public static void main(String[] args) {
        Outer outer = new Outer();
        outer.method();
        //直接访问内部类
        Outer.Inner inner = new Outer().new Inner();
        inner.function();
    }
}

```

### 03 内部类的定义原则  
当描述事物时，事物的内部还有事物，该事物用内部类来表示  
因为内部类可是使用外部事物的内容  


内部类定义在局部时  
1. 不可以被成员修饰符(static, private)修饰  
2. 可以直接访问外部类的成员，因为还持有外部类的引用  
3. 但是不可以访问它所在的局部中的变量，只能访问被final修饰的局部变量，如所示z;   

```java 
class Outer {
    private int x = 3;

    void method() {
        //如果没加final编译器自动加上
        final int z = 5;
        class Inner {
            int y = 4;
            void function() {
                System.out.println("inner:" + x);   //直接调用外部类的成员
                System.out.println(y);
                System.out.println(z);
            }
        }
        new Inner().function();
    }
}


public class InnerClassDemo {
    public static void main(String[] args) {
        Outer outer = new Outer();
        outer.method();
    }
}
```

### 04 匿名內部类  

1. 匿名内部类其实是内部类的简写格式  
2. 定义匿名内部类的前提：  
	- 内部类必须是继承或实现接口  
3. 匿名内部类的格式：　new父类或者接口(){定义子类内容}  
4. 其实匿名内部类就是一个匿名子类对象　　
5. 匿名对象对方法自能调用一次　　
6. 匿名内部类中定义的方法最好不超过两个　　

```java
abstract class AbsDemo {
    abstract void show();
}
class Outer {
    private int x = 3;
    public void function() {
		//匿名内部类	
        AbsDemo abs =  new AbsDemo() {
            public void show() {
                System.out.println("show " + x);
            }
        }
        abs.show();

		//匿名内部类第二种格式　
		new AbsDemo() 	{
			public void show() {
				System.out.println("goog");
			}
		}.show();
    }
}

public class InnerClassDemo {
    public static void main(String[] args) {
        Outer outer = new Outer();
        outer.function();
    }
}

```
### 05 异常描述  

异常：  就是程序运行时出现的不正常现象  
异常由来： 问题是现实生活中的一个具体的事物，通过java的类的形式进行描述，并封装成对象。  

严重异常java通过Error类进行描述  
	- 一般不编写针对性的代码进行描述  
非严重异常java通过Exception类进行描述 
	- 进行针对性的处理   

Throwable是所有错误和异常的超类  
#### Throwable  
	- Error  
	- Exception  

### 06 异常处理  
```java  
try {
	需要检测的代码  
}
catch(异常类 变量) {
	处理异常的代码(处理方式)
}
finally {
	一定会执行的语句
}	
```

### 07 异常声明throws  

```java
class Function {
    double div(double x, double y) throws ArithmeticException {  //提示此处有可能出现ArithmeticException异常  
        return x / y;
    }

}

public class ExceptionDemo {
    public static void main(String[] args) {
        Function func = new Function();
        try {
            double res = func.div(4, 3);
            System.out.println(res);
        }
        catch (Exception e) {  // 相当于Exception e = new AritchmeticExcepetion();
            System.out.println("除零错误");
        }
    }
}
```

### 08 多异常处理  

1. 声明异常时：建议声明更为具体的异常   
2. 对方声明几个异常，就对应有几个catch块，不要定义多余catch块    
	- 如果多个catch块中的异常出现继承关系，父类异常catch块放在最下面  
3. catch中应该建立具体的处理语句  

> 函数中只要有异常发生，函数就结束了  

```java
class Function {
    double div(int x, int y) throws ArithmeticException, ArrayIndexOutOfBoundsException {  //提示此处有可能出现Exception异常
        int[] arr = new int[x];
        System.out.println(arr[4]);
        return x / y;
    }

}

public class ExceptionDemo {
    public static void main(String[] args) {
        Function func = new Function();
        try {
            double res = func.div(6, 0);
            System.out.println(res);
        }
        catch (ArithmeticException e) {  // 相当于ArithmeticException e = new AritchmeticExcepetion();
            System.out.println("除零错误");
        }
        catch (ArrayIndexOutOfBoundsException a) {
            System.out.println(a.toString());
            System.out.println("角标越界了");
        }
    }
}
```

### 09 自定义异常  

解决项目中的特有问题  

需求： 对于除数是负数也视为是错误的，无法进行运算  

当函数内部出项了throw抛出异常对象，那么就必须要给出对应的处理动作  
要么在内部try catch处理  
要么在函数上声明让使用者处理  
一般情况，函数内出现异常，函数上需要声明  

自定义异常必须是自定义类继承Exception  
	- 因为异常类和异常对象都需要被抛出，而可抛性是throwable的独有特点  

```java
class FuShuException extends Exception {
    FuShuException(String msg) {
        super(msg);
    }

}

class Function {
    double div(int x, int y) throws ArithmeticException, FuShuException {  //提示此处有可能出现Exception异常
        if (y < 0)
            throw new FuShuException("不可以除负数");  //手动抛出自定义异常
        return x / y;
    }

}

public class ExceptionDemo {
    public static void main(String[] args) {
        Function func = new Function();
        try {
            double res = func.div(6, -1);
            System.out.println(res);
        }
        catch (ArithmeticException e) {  // 相当于ArithmeticException e = new AritchmeticExcepetion();
            System.out.println("除零错误");
        }
        catch (FuShuException f) {
            System.out.println(f.getMessage());
        }
    }
}
```

### 10 throws 和 throw 的区别  

throws使用在函数上，后面跟异常类，可以跟多个，用逗号隔开     
throw 使用在函数内，后面跟异常对象    


### 11 RuntimeException  

1. 如果在函数中抛出RuntimeException异常，函数上可以不用声明  
2. 如果在函数上声明了该异常，调用者可以不用进行处理  
3. 自定义异常时，如果该异常发生，希望程序停止，就让自定义异常继承RuntimeException  

### 12 异常练习  

throw存在时，执行throw后函数结束  

## Day 10  

### 01 异常finally  

finally数据块  
用于定义一定会执行的代码  
通常用于关闭资源  

```java
try {
	连接数据库
	数据操作
}
catch(SQLeException e) {
	会对数据库进行异常处理
}
finally {
	关闭数据库
}
```

### 02 异常处理语句其他格式  

1. 在检测异常没处理之前，一定要声明异常  
2. 只有catch语句才算处理异常  

以下格式合法:  
```java
try {
}
finally{
}
```
	
### 03 异常-覆盖  

异常在子类的覆盖中的体现  
1. 子类在覆盖父类异常时，如果父类的方法抛出异常，那么子类的覆盖方法，只能抛出父类的异常或者该异常的子类  
2. 如果父类方法抛出多个异常，那么子类在覆盖方法时，只能抛出父类异常的子集  
3. 如果父类或者接口的方法中没有异常抛出，那么子类在覆盖方法时，也不可以抛出异常，如果子类发生异常，则只能try  

### 04 异常-练习  

```java
class NoValueException extends RuntimeException {
    NoValueException(String msg) {
        super(msg);
    }
}

interface Shape {
    void getArea();
}

class Rec implements Shape {
    private int len, wid;
    Rec(int len, int wid) {
        if (len <= 0 || wid <= 0) {
           throw new NoValueException("出现非法值");
        }
        else {
            this.len = len;
            this.wid = wid;
        }
    }

    public void getArea() {

        System.out.println(len*wid);
    }
}

class Cricle implements Shape {
    private int radius;
    public static final double PI = 3.14;
    Cricle(int radius) {
        if (radius <= 0) {
            throw new NoValueException("非法输入");
        }
        else {
            this.radius = radius;
        }
    }

    public void getArea() {
        System.out.println(radius*radius*PI);
    }


}
public class ExceptionTest {
    public static void main(String[] args) {
        Rec r = new Rec(3,4);
        r.getArea();
        Cricle c = new Cricle();
        c.getArea();
    }
}
```

### 05 异常总结  

定义：异常是对问题的描述，将问题进行对象的封装  

异常体系：
```java
Throwable
	|--Error
	|--Exception	
		|--RuntimeException
```
异常体系的独有特点：  
异常体系中的所有类以及建立的对象都具备可抛性  
即可以被throw和throws关键字操作  

throw和throws的区别：  
throws使用在函数上，后面跟异常类，可以跟多个，用逗号隔开     
throw 使用在函数内，后面跟异常对象    

当函数内容有throw抛出异常对象，并未进行try处理，必须要在函数上进行声明，否则编译失败  
RuntimeException异常除外  

如果函数声明了异常，调用者需要进行处理，处理方法可以throw可以try  

异常有两种 
1. 编译时被检测异常  
	- 编译前需要处理
2，运行时异常(编译时不检测)  
	- 编译前不需要处理，编译器不检查  
	- 建议不处理  

异常处理语句  
```java
try 
{
}
catch
{
}


try
{
}
catch
{
}

try
{
}
finally
{
}
```
系统推出,jvm关闭  
System.exit(0)  

注意：  
1. finally中定义的通常时关闭资源的代码，因为资源必须释放  
2. finally中只有一种情况不会执行,当执行到System.exit(0); finally不会执行  

自定义异常  
	定义类继承Exception或者RuntimeException  
	1. 为了让该自定义类具备可抛性  
	2. 让该类具备操作异常的共性方法  


当要定义自定义异常信息时，可以使用父类已经定义好的功能  
异常信息传递给父类的构造函数  

```java
class NoValueException extends RuntimeException {
    NoValueException(String msg) {
        super(msg);
    }
```
自定义异常是按照java的面向对象思想，将程序中出现的特有问题进行封装  
异常的好处：  
1. 将问题进行封装  
2. 将正常流程代码问题和问题处理代码的分离，方便于阅读  

异常处理原则：  
1. try或者throw  
2. 抛出几个处理几个  
3. 多个catch，父类的catch放下面  
4. catch语句内，进行异常的针对性处理，不要简单的println出去，也不要多写  

可将异常问题转换，抛出于功能相关的异常  
```java
try {
	throw new AException
}
catch(AException e) {
	throw new BException
}
```
	
异常在子类的覆盖中的体现  
1. 子类在覆盖父类异常时，如果父类的方法抛出异常，那么子类的覆盖方法，只能抛出父类的异常或者该异常的子类  
2. 如果父类方法抛出多个异常，那么子类在覆盖方法时，只能抛出父类异常的子集  
3. 如果父类或者接口的方法中没有异常抛出，那么子类在覆盖方法时，也不可以抛出异常，如果子类发生异常，则只能try  

### 07 Package  

1. 对类文件进行分类管理  
2. 给类进行多层命名空间  
3. 包也是一种封装形式  

格式：  
	1. 写在程序文件第一行  
		- package 包名;
	2. 包名.类名 
	3. 定义包名时所有字母小写   

指定位置  
```
>>> javac -d . Demo.java
>>> java package_name.Demo  

```
. 为当前文件夹  

1. 包与包之间进行访问，被访问的包中类以及类中的成员，需要public修饰  
2. 不同包中的子类还可以访问父类中被protected修饰的成员  

3. 包与包 之间只有两种使用权限：public protected  

|范围|public|protected|friendly|private|
|:--:|:--:|:--:|:--:|:--:|
|同一个类中|Y|Y|Y|Y|
|同一个包中|Y|Y|Y|N|
|不同包的子类|Y|Y|N|N|
|不同包中|Y|N|N|N|

### 09 improt关键字  

import 导入的是包中的类，不导入该目录下的子包    
建议不要全导入，需要用到那个类就导入那个类  

不同包内类出现重名时，必须写包名  

建议定义包名时不要重名，建议用域名反转来定义  

### 10 Jar压缩包  

把jar包放到classpath路径下就能用  


## Day 11 

### 01 多线程--概述  

进程：  
1. 是一个正在执行的程序  
2. 每一个进程执行都有一个执行程序(控制单元)  

线程：  
1. 进程中的一个独立的控制单元  
2. 线程控制着程序的执行  

> 一个进程中至少有一个线程  

负责执行java的主线程存在main方法中  

扩展： jvm启动不只一个线程，还有垃圾回收器  

### 02 创建线程-继承Thread类   

方式：  
1. 定义类继承Thread类  
2. 复写Thread类中的run方法  
3. 调用线程的start方法  
	- 启动线程  
	- 调用run方法  

多线程的随机性：  
多个线程在抢占cpu的执行权  

### 03-04 run和start的特点  

Thread类用于描述线程  
run方法用于存储线程需要运行的代码  

```java
package Day11;

class Demo extends Thread {
    public void run() {
        for(int x = 0; x < 400 ; x++) {
            System.out.println("demo run" + x);
        }
    }
}


public class ThreadDemo {
    public static void main(String[] args) {
        Demo d = new Demo();    //创建好一个线程
        d.start();      //开启线程并调用run方法  

        for (int x=0; x < 400;x++) {
            System.out.println("Hello Thread----" + x);
        }
    }
}
``` 

### 05 线程运行状态  

运行  
冻结: 
	- sleep()
	- wait()进入线程池中等待　　 	
	- 唤醒notify()唤醒线程池中的线程，通常唤醒第一个等待的　　  
	- notifyAll() 唤醒全部　　
阻塞  
消亡     
> wait() , notify(), notifyAll() 都使用在同步中，因为要对持有监视器(锁)的线程操作，所以要使用在同步中，因为只有同步才可以具有锁。

> 而为什么这些操作线程的方法要定义在Object类中呢？　　

> 因为这些方法在操作同步线程时，都必须要标识他们所操作线程持有的锁，只有同一个锁上的被等待线程，可以被同一个锁上notify唤醒，不可以对不同锁中的线程进行唤醒，也就是说，等待和醒必须是同一个锁，而锁可以是任意对象，所以可以被任意对象调用的方法定义在Object类中(Day12 03)

### 06 获取线程对象以及名称  

getName()获取线程的默认名称  
static Thread currentThread(); 获取当前对象  

### 07 多线程例子  

```java   
package Day11;

class Ticket extends Thread {
    private static int tick = 100;
    public void run() {
        while (true) {
            if(tick > 0) {
                System.out.println(Thread.currentThread().getName() + "--sale----" + tick--);
            }
        }
    }
}

public class TicketDemo {
    public static void main(String[] args)   {
        Ticket t1 = new Ticket();
        Ticket t2 = new Ticket();
        Ticket t3 = new Ticket();
        Ticket t4 = new Ticket();

        t1.start();
        t2.start();
        t3.start();
        t4.start();
    }
}
```   

已经运行线程不需要再开启  

### 08 实现Runnable接口  

创建线程的第二种方式：  
1. 定义类实现Runnable接口  
2. 覆盖Runnable接口中的run方法  
3. 通过Thread类建立线程对象  
4. 将Runnable接口的子类对象作为实际参数传递给Thread的构造函数  
5. 调用Thread类的start方法并开启线程调用Runnable接口的子类的run方法    


实现方式和继承方式的区别：  
1. 避免了单继承的局限性  
2. 建议使用实现方式  
 


```java
package Day11;

class Ticket implements Runnable {
    private static int tick = 100;
    public void run() {
        while (true) {
            if(tick > 0) {
                System.out.println(Thread.currentThread().getName() + "--sale----" + tick--);
            }
        }
    }
}

public class TicketDemo {
    public static void main(String[] args)   {
        Ticket t = new Ticket();
        Thread t1 = new Thread(t);
        Thread t4 = new Thread(t);
        Thread t3 = new Thread(t);
        Thread t2 = new Thread(t);

        t1.start();
        t2.start();
        t3.start();
        t4.start();
    }
}
```

### 09 多线程的安全问题  

原因：  
当多条语句在操作同一个线程共享数据时，一个线程对多条语句只执行了一部分，还没有执行完，另一个线程参与其中，导致共享数据的错误  

解决方法：  
对多条操作共享数据的语句，只能让一个线程都执行完，在执行过程中，其他的线程不可以参与其中  

使用同步代码块：  
```java
synchronized(对象)
{
	需要同步的代码
}
```
对象就是锁  
> 那些代码需要同步只要看哪些语句在操作共享数据  

```java
package Day11;

class Ticket implements Runnable {
    private static int tick = 100;
    Object obj = new Object();
    public void run() {
        while (true) {
            synchronized (obj) {
                if (tick > 0) {
                    System.out.println(Thread.currentThread().getName() + "--sale----" + tick--);
                }
            }
        }
    }
}

public class TicketDemo {
    public static void main(String[] args)   {
        Ticket t = new Ticket();
        Thread t1 = new Thread(t);
        Thread t4 = new Thread(t);
        Thread t3 = new Thread(t);
        Thread t2 = new Thread(t);

        t1.start();
        t2.start();
        t3.start();
        t4.start();
    }
}
```

### 10 多线程同步代码块  

对象如同锁，持有锁的线程可以在同步中执行，没有持有锁的线程即使获取执行权也进不去  

同步的前提：  
1. 必须要有两个或者以上的线程  
2. 必须是多个线程同时使用一个锁  

### 11 同步函数   

把synchronized做为函数的修饰符，使函数具备同步的特性   

### 12 同步函数的锁是this  

```java
package Day11;

class Ticket implements Runnable {
    private static int tick = 400;
    Object obj = new Object();
    public void run() {
        while (true) {
            show();
            }
    }
    public synchronized void show() {
        if (tick > 0) {
            System.out.println(Thread.currentThread().getName() + "--sale----" + tick--);
        }
    }
}

public class TicketDemo {
    public static void main(String[] args)   {
        Ticket t = new Ticket();
        Thread t1 = new Thread(t);
        Thread t4 = new Thread(t);
        Thread t3 = new Thread(t);
        Thread t2 = new Thread(t);

        t1.start();
        t2.start();
        t3.start();
        t4.start();
    }
}
```
函数需要被对象调用，那么函数就都有一个所属对象引用，就是this  
所以同步函数使用的锁就是this  

### 13 静态同步函数的锁是Class对象  

Class对象：字节码文件对象  
静态进内存时，内存中没有本类对象但是一定有该类对应的字节码文件对象，该对象的类型是Class  

### 14 单例设计模式同步问题  

### 15 死锁  

同步中嵌套同步而锁却不同  
a锁中有b锁  
b锁中有a锁  

## Day 12   

### 01 线程间通讯－示例代码　　

```java
package Day112;
class Res {
    String name;
    String sex;
}
class Input implements Runnable {
    private Res r;
    Input (Res r) {
        this.r = r;
    }
    public void run() {
        int x = 0;
        while (true) {
            if(x == 0) {
                r.name = "mike";
				//线程在这里失去执行权
                r.sex = "man";
            }
            else {
                r.name = "丽丽";
				//线程在这里失去执行权
                r.sex = "女女女女女女";
            }
            x = (x+1)%2;
        }
    }
}

class Output implements Runnable {
    private Res r;
    Output(Res r) {
        this.r = r;
    }
    public void run() {
        while(true) {
            System.out.println(r.name + r.sex);
        }
    }
}
public class InputOutputDemo {
    public static void main(String[] args) {
        Res r = new Res();
        Input in = new Input(r);
        Output out = new Output(r);
        Thread t1 = new Thread(in);
        Thread t2 = new Thread(out);
        t1.start();
        t2.start();
    }
}
```

### 02 线程间通讯－解决安全问题　　

```java
package Day12;

class Res {
    String name;
    String sex;
}
class Input implements Runnable {
    private Res r;
    Input (Res r) {
        this.r = r;
    }
    public void run() {
        int x = 0;
        while (true) {
            synchronized (r) {
                if (x == 0) {
                    r.name = "mike";
                    r.sex = "man";
                }
                else {
                    r.name = "丽丽";
                    r.sex = "女女女女女女";
                }
                x = (x + 1) % 2;
            }
        }
    }
}

class Output implements Runnable {
    private Res r;
    Output(Res r) {
        this.r = r;
    }
    public void run() {
            while (true) {
                synchronized (r) {
                System.out.println(r.name + r.sex);
            }
        }
    }
}
public class InputOutputDemo {
    public static void main(String[] args) {
        Res r = new Res();
        Input in = new Input(r);
        Output out = new Output(r);
        Thread t1 = new Thread(in);
        Thread t2 = new Thread(out);
        t1.start();
        t2.start();
    }
}
```

### 03-04 线程间通讯－等待唤醒机制　　

```java
package Day12;

class Res {
    private String name;
    private String sex;
    boolean flag = false;

    public synchronized void set(String name, String sex) {

        if (flag) {
            //冻结等待　　
            try {this.wait();} catch (Exception e) {}
        }
        this.name = name;
        this.sex = sex;
        flag = true;
        this.notify();
    }
    public synchronized void out() {
        if(!flag)
            try { this.wait(); } catch (Exception e) {}
        System.out.println(name + "........" + sex);
        flag = false;
        this.notify();
    }
}
class Input implements Runnable {
    private Res r;
    Input (Res r) {
        this.r = r;
    }
    public void run() {
        int x = 0;
        while (true) {
            if (x == 0) {
                r.set("mike", "man");
            }
            else {
                r.set("丽丽","女女女女女");
            }
            x = (x + 1) % 2;
        }
    }
}

class Output implements Runnable {
    private Res r;
    Output(Res r) {
        this.r = r;
    }
    public void run() {
            while (true) {
                r.out();
        }
    }
}
public class InputOutputDemo {
    public static void main(String[] args) {
        Res r = new Res();
        new Thread(new Input(r)).start();
        new Thread(new Output(r)).start();
    }
}
```

### 05-06 生产者消费者　　
将同步synchronized替换成显式Lock操作  
将Object中的wait,notify,notifyAll，替换成condition对象    
该对象可以Lock锁,进行获取　  　

```java
package Day12;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ProducerConsume {
    public static void main(String[] args) {
        Resource r = new Resource();
        Producer pro = new Producer(r);
        Consumer con = new Consumer(r);
        Thread t1 = new Thread(pro);
        Thread t2 = new Thread(con);
        Thread t3 = new Thread(pro);
        Thread t4 = new Thread(con);
        t1.start();
        t2.start();
        t3.start();
        t4.start();
    }
}

class Resource {
    private String name;
    private int count = 1;
    private boolean flag = false;
    private Lock lock = new ReentrantLock();
    private Condition condition_pro = lock.newCondition();
    private Condition condition_con = lock.newCondition();

    public void set(String name) throws InterruptedException {
        lock.lock();
        try {
            while (flag)
                condition_pro.await();
            this.name = name + "--" + count++;
            System.out.println(Thread.currentThread().getName() + "...生产者..." + this.name);
            flag = true;
            condition_con.signal();
        }
        finally {
            lock.unlock();
        }
    }
    public void out() throws InterruptedException {
        lock.lock();
        try {
            while (!flag)
                condition_con.await();
            System.out.println(Thread.currentThread().getName() + "...消费者..." + this.name);
            flag = false;
            condition_pro.signal();

        }
		//释放锁的动作一定要执行　　
        finally {
            lock.unlock();
        }
    }
}

class Producer implements Runnable {
    private Resource res;

    Producer(Resource res) {
        this.res = res;
    }
    public void run() {
        while (true) {
            try {
                res.set("Candy:");
            }
            catch (InterruptedException e) {}
        }
    }
}

class Consumer implements Runnable {
    private Resource res;

    Consumer(Resource res) {
        this.res = res;
    }
    public void run() {
        while(true) {
            try {
                res.out();
            }
            catch (InterruptedException e) {}
        }
    }
}
```

在该示例中实现了本方只唤醒对方的操作　　

### 07 停止线程　　

run方法结束　　  
开启多线程，运行代码通常是循环结构，只要控制住循环，就可以让run方法结束,也就是线程结束　　  

特殊情况，当线程处于了冻结状态  
就不会读取到标记，那么线程就不会结束  
interrupt()中断异常, 强制结束冻结状态的异常，让它们进入运行或阻塞状态　　　　　  

```java
package Day12;

class StopThread implements Runnable {
    private boolean flag = true;
    public synchronized void run() {
        while (flag) {
            try {
                wait();
            }
            catch (InterruptedException e) {
                System.out.println(Thread.currentThread().getName() + "...Exception");
                flag = false;
            }
            System.out.println(Thread.currentThread().getName() + "...run");
        }
    }
    public void changeFlag() {
        flag = false;
    }
}



public class StopThreadDemo {
    public static void main(String[] args) {
        StopThread st = new StopThread();
        Thread t1 = new Thread(st);
        Thread t2 = new Thread(st);

        t1.start();
        t2.start();

        int num = 0;
        while (true) {
            if(num++ == 60) {
                st.changeFlag();
                t1.interrupt();
                t2.interrupt();
                break;
            }
            System.out.println(Thread.currentThread().getName() + ".........." + num);
        }
    }
}
```

### 09 Join方法  

> 抢夺cpu执行权  

当A线程执行到Ｂ线程的join()方法时，Ａ就会等待，等Ｂ线程执行完，Ａ才会执行  

### 10 优先级&yield  

线程组: 谁开启的线程，该线程就属于哪个组  

yield: 暂停当前执行的线程对象，并执行其他线程　  

## Day 13  

### 02 String   

判断：  
1. 字符串中是否包含某一个字串  
	- boolean contains(str)  
	- indexOf(str):可以索引str第一次出现的位置  
2. 字符串中是否有内容  
	- boolean isEmpty():  判断字符串长度是否为0  
3. 字符串是否一指定内容开头  
	- boolean startWith(str)  
4. 字符串是否以子指定内容结尾  
	- boolean endsWith(str)  
5. 判断字符串的内容是否相同  
	- boolean equals(str)  
	- boolean equalsIgnoreCase()

转换：  
1. 将字符数组转成字符串  
	- 构造函数： 
		- String(char[])
		- String(char[],offset,count):将字符数组的一部分转成字符串
	- 静态方法：  
		- static String copyValueOf(char[])
		- static String copyValueOf(char[])
		- static String valueOf(char[])
2. 将字符串转成字符数组  
	- char[] toCharArray()
3. 将字节数组转成字符串  
	- String(byte [])
	- String(byte [],offset,count)
4. 将字符串转成字节数组  
	-  byte[] getBytes()
5. 将及基本数据类型转换成字符串  
	- static String valueOf(int)
	- static String valueOf(double)
	- 3 + ""

> 字符串和字节数组的转换过程中是可以指定编码表的  

替换:  
- String replace(oldchar,newchar): 既可以替换字符，也可以替换字符串  

切割：  
- String[] split(regex)  

字串：  
- String substring(begin)  
- String substring(begin,end)  

转换：   
1. 将字符串转换成大写或小写  
	- String toUpperCase()
	- String toLowerCase()
2. 将字符串两端的多个空格去除  
	- String trim()
3. 将两个字符串进行自然顺序的比较  
	- int compareTo(String)
  
#### 得到最长的子串  

```java
package Day13;

public class StringTest1 {
    public static void main(String[] args) {
        String s1 = "aowhfg";
        String s2 = "wwpowhfg";
        String res = getMaxSubString(s1,s2);
        System.out.println(res);

    }
    static String getMaxSubString(String s1,String s2) {
        if (s1.length() < s2.length()) {
            String stemp = s1;
            s1 = s2;
            s2 = stemp;
        }
        for(int x=0;x<s2.length();x++) {
            for(int y=0,z=s2.length()-x;z!=s2.length()+1;y++,z++) {
                String temp = s2.substring(y,z);
                if(s1.contains(temp))
                    return temp;
            }
        }
        return "";
    }
}
```

### StringBuffer  

StringBuffer是一个字符串缓冲区（是一个容器）  

##### 添加：  
1. StringBuffer append():  将指定数据作为参数添加到已有数据结尾处  
2. StringBuffer insert(index,data) 将数据插入到指定位置  

```java
StringBuffer sb = new StringBuffer();
// 操作链  
sb.append("asg").append(true).append(34);
sb.toString(); //返回字符串
```
##### 删除：  

1. StringBuffer delete(start, end): 删除指定位置的元素  
2. StringBuffer deleteCharAt(index): 单个    

清空缓冲区：   
```bash
sb.delete(0,sb.length());
```

##### 获取： 
1. char charAt(int, index)  
2. int indexOf(String str)  
3. int lastIndexOf(String str)  
4. int length()  
5. String substring(int start, int end)  

##### 修改：   

1. StringBuffer	replace(int start, int end, String str)  
2. void	setCharAt(int index, char ch)   


把缓冲区的数据存到数组中
public void getChars(int srcBegin,
int srcEnd,
char[] dst,
int dstBegin)

##### JDK1.5 后，使用StringBuider  

StringBuider 是线程不同步的  
StringBuffer 是线程同步的  

> 建议使用StringBuider  

#### 基本数据类型对象包装类  

|基本数据类型|包装类|
|:--|:--|
|byte|Byte|
|short|Short|
|int|Integer|
|long|Long|
|boolean|Boolean|
|float|Float|
|double|Double|
|char|Character|

基本数据类型的最常用作用： 
用于基本数据类型和字符串类型之间的转换  

基本数据类型转换成字符串：  
	- 基本数据类型 + "";
	- 基本数据类型.toString(基本数据类型值);   
	
把字符串转换成基本数据类型：   
	- xxx a = xxx.parseXxx(String)
	- int a = Integer.parseInteger("123")
	- i.intValue()

##### 进制：  
static int	parseInt(String s, int radix)  
radix为你想转换成的进制  

##### 新写法：  

```java
//自动装箱  
Integer x = 4;

//自动拆箱，在自动装箱
x = x + 2;
```
如果不初始化，有可能出现null异常  

```java

Integer m = 128;
Integer n = 128;

prt(m==n) //false

Integer m = 127;
Integer n = 127;

prt(m==n) //true 当Integer的值在byte范围内时，不分配新的空间，所以此时m和n指向同一个对象  
```

## Day14 

### 集合框架  

集合作用：用于存储对象   

```
Collection:  
	|--List:元素有序，可重复，有index  
		|--ArrayList:底层的数据结构使用的是数组结构,特点是：查询快，增删慢，线程不同步    
		|--LinkedList:链表结构(后一位记住前一位),特点是：查询慢，增删快  
		|--Vector：底层是数组数据结构，是同步的 (一般不用) 
	|--set: 元素无序，不可重复，无index  
```
> 可变长度数组是不断new出来的  


```java
package Day14;

import java.util.*;

public class CollectionDemo {
    public static void main(String[] args) {
        //创建一个集合容器，使用Collection的子类，ArrayList
        ArrayList a1 = new ArrayList();
        method_get(a1);

    }
    public static void method_get(ArrayList a1) {
        //添加元素
        a1.add("java01");
        a1.add("java02");
        a1.add("java03");
        a1.add(new Integer(4));

        Iterator it = a1.iterator();
        while (it.hasNext())
            prt(it.next());
        prt(a1);
    }

    public static void base_method2() {
       ArrayList a11 = new ArrayList();

        //添加元素
        a11.add("java");
        a11.add("python");
        a11.add("java03");
        a11.add(new Integer(4));

        ArrayList a2 = new ArrayList();

        a2.add("java");
        a2.add("python");
        a2.add("Rust");
        a2.add("Gone");

        //取出元素
        a11.retainAll(a2); //取交集，a11中只会保留a2中相同的元素

        prt(a11);
        prt(a2);
    }

    public static void base_method(ArrayList a1) {

        //添加元素
        a1.add("java01");
        a1.add("java02");
        a1.add("java03");
        a1.add(new Integer(4));

        prt(a1);
        prt(a1.size());
        a1.remove("java02");
        prt(a1);

        //判断元素
        prt(a1.contains("java03"));

        //清空集合
        a1.clear();

        prt(a1.isEmpty());
    }

    public static void prt(Object obj){
        System.out.println(obj);
    }
}
```

### 迭代器  
负责集合中判断和取出的内部类的共性所抽取出来的接口  
```
iterator();
   
```

### ArrayList  

```java
ArrayList a = new ArrayList();

//增  
a.add();

//delete
a.remove();

//change
a.set(index,Element)

//get element
for(int x=0;x < a.size();x++)
{
	System.out.println(a.get(x)):
}

```
List集合特有的迭代器，ListIterator是Iterator的子接口  

> 在迭代时，不可以通过集合对象的方法操作集合中的元素，因为会发生ConcurrnetModificationException异常  


### LinkedList  

封装自己的队列
```java
package Day14;

import java.util.LinkedList;

public class LinkedListTest {
    public static void main(String[] args) {
        Queue queue = new Queue();
        queue.add("good");
        queue.add("HIHI");

        while (!queue.isEmtpy()) {
            System.out.println(queue.get());
        }
    }
}

class Queue {
    private LinkedList link;

    Queue() {
        link = new LinkedList();
    } 
    public void add(Object obj) {
        link.addLast(obj);
    }
    public Object get() {
        return link.removeFirst();
    }
    public boolean isEmtpy() {
        return link.isEmpty();
    }
}
```

### Day 18  

#### IO  

```
字节流    
    |--inputstream
    |--outputstream
字符流
    |--reader
    |--writer
```

```java
package Day18;

import java.io.FileWriter;
import java.io.IOException;

public class FileWriterDemo {
    public static void main(String[] args) throws IOException {
        FileWriter fw = new FileWriter("demo.txt");

        //调用write方法，将字符串写入到流中
        fw.write("abcde\n");

        //刷新流对象中的缓冲区中的数据
        //将数据刷到目的地中
        fw.flush();
        fw.write("good");

        //关闭流资源，关闭前刷新
        //释放windows资源
        fw.close();
    }

}
```  

#### IO异常的处理方式

```java
package Day18;

import java.io.FileWriter;
import java.io.IOException;

public class FileWriterDemo2 {
   public static void main(String[] args) {
     
       //在外部建立引用
       FileWriter fw = null;
       try {
           //在指定目录下创建文件
           //若新建对象，若存在原文件，则覆盖
           fw = new FileWriter("Demo2.txt");
           fw.write("abcdesg");
       }
       catch (IOException e) {
           System.out.println(e.toString());
       }
       finally {
           //单独处理fw.close()可能出现的异常
           try {
               if (fw!=null)
                    fw.close();
           }
           catch (IOException e) {
               System.out.println(e.toString());
           }
       }
   } 
}
```

#### 数据的续写  

#####  演示对已有文件的续写  
```java
public class FileWriterDemo3 {
public static void main(String[] args) throws IOException {
        //true参数代表不覆盖已有文件，并在文件末尾处进行数据的续写
        FileWriter fw = new FileWriter("demo.txt",true);
        fw.write("\nwhen");
        fw.close();
    }
}
```

#### Read读文件  

```java
package Day18;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class FileReaderDemo {
    public static void main(String[] args) {

        FileReader fr = null;
        try {
            //若文件不存在，则抛出FileNotFoundException
            fr = new FileReader("demo.txt");
        }
        catch (FileNotFoundException e) {
            System.out.println("文件找不到");
        }
        try {
            //read()一次读出一个字符且自动往下读
            //自动转成int型
            /*
            int ch = 0;
            while((ch = fr.read()) != -1)
                System.out.println("ch=" + (char)ch);

             */
            //容量一般取1024的整数倍
            char[] buf = new char[1024];
            int number = 0;
            //存满buf在打印在循环存
            while ((number=fr.read(buf)) != -1)
                System.out.println(new String(buf,0,number));

        }
        catch (IOException e) {
            System.out.print(e.toString());
        }

    }
}
```

##### 文件复制  

```java
package Day18;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class Copy {
    public static void main(String[] args) {
        copy();
    }

    public static void copy() {
        FileReader fr = null;
        FileWriter fw = null;
        try {
            fr = new FileReader("Demo.txt");
            fw = new FileWriter("Demo_copy.txt");

            char[] buf = new char[1024];

            int len = 0;
            while ((len = fr.read(buf)) != -1) {
                fw.write(buf,0,len);
            }
        }
        catch (IOException e) {
            throw new RuntimeException("读写失败");
        }
        finally {
            if(fr != null) {
                try {
                    fr.close();
                }
                catch (IOException e) {
                    System.out.println(e.toString());
                }
            }
            if (fw != null) {
                try {
                    fw.close();
                }
                catch (IOException e) {
                    System.out.println(e.toString());
                }
            }
        }
    }
}
```

### Day19  

#### Buffer缓冲区    
```java
package Day19;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class BufferDemo {
   public static void main(String[] args) throws IOException {
       //要使用缓冲区必须先有流对象
       FileWriter fw = new FileWriter("Demo.txt");
       
       BufferedWriter bufw = new BufferedWriter(fw);
       
       for(int x=1; x<5; x++) {
           bufw.write("abcd" + x);
           //换行。考虑到跨平台性
           bufw.newLine();
           //用到缓冲区的时候记得刷新
           bufw.flush();
       }
       
       //关闭缓冲区其实关闭的是缓冲区对应的流对象
       bufw.close();
   }
}
```

```java
package Day19;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class BufferReadDemo {
    public static void main(String[] args) throws IOException {
        FileReader fr = new FileReader("Demo.txt");
        BufferedReader bufr = new BufferedReader(fr);

        String sl = null;
        //读出一行
        while((sl=bufr.readLine())!=null) {
            System.out.println(sl);
        }

    }
}
```

#### 通过缓冲区复制一个.java文件  
```java
package Day19;

import javafx.scene.shape.HLineTo;

import javax.imageio.IIOException;
import java.io.*;

public class copyTestBuffer {
    public static void main(String[] args) {
        BufferedReader bufr = null;
        BufferedWriter bufw = null;

        try {
            bufr = new BufferedReader(new FileReader("Demo.txt"));
            bufw = new BufferedWriter(new FileWriter("Demo_copytxt"));

            String line = null;

            //readLine()不返回回车符之类的系统符
            while ((line=bufr.readLine())!=null) {
                System.out.println(line);
            }
        }
        catch (IOException e) {
            throw new RuntimeException("读写失败");
        }
        finally {
            try {
                if(bufr!=null)
                    bufr.close();
            }
            catch (IOException e) {
                throw new RuntimeException("读取关闭失败");
            }
            try {
                if(bufw!=null)
                    bufw.close();
            }
            catch (IOException e) {
                throw new RuntimeException("读取关闭失败");
            }
        }



    }
}
```

#### 装饰设计模式  

对已有对象进行功能增强  
基于已有功能，提供加强功能  
自定义的该类称为装饰类  
装饰类通常会通过构造方法接受被装饰的对象  
并基于被装饰类的对象的功能，提供更强的功能  

装饰设计模式比继承更灵活，避免了继承的臃肿  
装饰类与被装饰类通常都是属于一个体系中  

```java
package Day19;

class Person {
    public void eat() {
        System.out.println("Eating");
    }
}

class SuperPerson {
    private Person p;
    SuperPerson(Person p) {
        this.p = p;
    }
    public void superEat() {
        System.out.println("Eating fruit");
        p.eat();
        System.out.println("dessert");
    }
}


public class DressDemo {
    public static void main(String[] args) {
        Person p = new Person();
        SuperPerson sp = new SuperPerson(p);
        sp.superEat();
    }
}
```
 
#### 字节流  

    
字节流不需要刷新  
``` 
   |--FileOutputStream
   |--FileIutputStream

    |--BufferInputStream
    |--bufferOUtputStream  
```

```java

package Day19;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileStream {
    public static void  main(String[] args) throws IOException {
        FileInputStream fis = new FileInputStream("Demo.txt");

        //使用byte型数组
        byte[] buf = new byte[fis.available()];
        fis.read(buf);
        System.out.println(new String(buf));
        fis.close();

    }
}
```
操作文件大时不建议使用fis.available()  
容易发生内存溢出    
建议使用以上1024的方法  

##### 拷贝图片  
read()方法之所以输出int型是因为排除-1的产生  
wirter方法强制转换只取最后8位  
```java
package Day19;

import java.io.*;
public class CopyPic {
    public static void  main(String[] args) {
        FileInputStream fis = null;
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream("e:\\2.jpg");
            fis = new FileInputStream("e:\\pic.jpg");

            byte[] buf = new byte[1024];

            int len = 0;

            while ((len=fis.read(buf))!=-1)
                fos.write(buf,0,len);
        }
        catch(IOException e) {
            throw new RuntimeException("something wrong");
        }
        finally {
            try {
                if(fos!=null)
                    fos.close();
            }
            catch(IOException e) {
                System.out.println("writer false");
            }
            try {
                if(fis!=null) {
                    fis.close();
                }
            }
            catch (IOException e) {
                System.out.println("Read false");
            }
        }
    }
}
```

#### 读取键盘录入    

System.in: 标准输入设备  

```java
package Day19;

import java.io.*;
public class ReadIn {
    public static void main(String[] args) throws IOException {
       //InputStream in = System.in;
       //转换流，将字节流转换成字符流
       //InputStreamReader isr = new InputStreamReader(in);
       //BufferedReader br = new BufferedReader(isr);
        BufferedReader br =
                new BufferedReader(new InputStreamReader(System.in));

       //OutputStream out = System.out;
       //转化流
       //OutputStreamWriter osw = new OutputStreamWriter(out);
       //BufferedWriter bfw = new BufferedWriter(osw);
        BufferedWriter bfw =
                new BufferedWriter(new OutputStreamWriter(System.out));

       String line = null;

       while ((line=br.readLine())!=null) {
           bfw.write(line.toUpperCase());
           bfw.newLine();
           bfw.flush();
       }
       br.close();
       bfw.close();
    }
}
```

将系统标准输入保存到文件  
```java
package Day19;

import java.io.*;
public class ReadIn {
    public static void main(String[] args) throws IOException {
       //InputStream in = System.in;
       //转换流，将字节流转换成字符流
       //InputStreamReader isr = new InputStreamReader(in);
       //BufferedReader br = new BufferedReader(isr);
        BufferedReader br =
                new BufferedReader(new InputStreamReader(System.in));

       //OutputStream out = System.out;
       //转化流
       //OutputStreamWriter osw = new OutputStreamWriter(out);
       //BufferedWriter bfw = new BufferedWriter(osw);
        BufferedWriter bfw =
                new BufferedWriter(new OutputStreamWriter(new FileOutputStream("Demo.txt")));

       String line = null;

       while ((line=br.readLine())!=null) {
           bfw.write(line.toUpperCase());
           bfw.newLine();
           bfw.flush();
       }
       br.close();
       bfw.close();
    }
}
```

流操作的基本规律    

1. 明确源和目的    
    - 源：输入流： InputStream Reader  
    - 目的：输出流：OutputStream Writer  
2. 明确操作的目的是否是纯文本  
    - 是：字符流  
    - 不是：字节流  
3. 明确使用的哪个具体对象  
    - 通过设备进行区分  
        - 源设备：内存，硬盘，键盘  
        - 目的设备：内存，硬盘，控制台      

例子：  
1. 将一个文件中的数据存储到另一个文件中，复制文件：
    - 源： InputStream Reader  
        - 是不是操作文本文件  
            - 是： Reader  
                - 明确使用该体系中的哪个对象  
                    - FileReader
    - 目的: OutputStream Writer  
   
> 转换流可以指定特定的字符集   

System可以通过
    - setIn()设置输入设备  
    - 通过setOut()设置输出设备  
    
#### 系统错误日志  

```java
package Day19;

import java.io.IOException;
import java.io.PrintStream;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ExceptionInfo {
    public static void main(String[] args) {
        try {
            int[] art = new int[2];
            System.out.println(art[3]);
        }
        catch (Exception e) {
            try {
                //获取时间
                Date d = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String s = sdf.format(d);

                PrintStream ps = new PrintStream("exception.log");
                ps.println(s);
                //ps.write(d.toString().getBytes());
                System.setOut(ps);
            }
            catch (IOException ex) {
                throw new RuntimeException("日志文件创建失败");
            }
            //将throwable及其追踪输出到指定的输出流
            e.printStackTrace(System.out);
        }
    }
}

```

> 可以使用log4j包来建立日志文件  

### Day20  

File类：  
1. 用来将文件或文件夹封装成对象  


##### File类的常见方法  

1. 创建  

boolean createNewFile():      
```
如果文件存在，则不创建，返回false
和输出流不一样，输出流对象一建立创建文件，而且文件已经存在，会覆盖  
```

createTempFile():
```
创建临时文件
```

boolean mkdir(): 创建一级目录  

boolean mkdirs(): 创建多级目录    

2. 删除  

boolean delete() 删除失败返回假   

void deleteOnExit()退出时删除   

3. 判断 

boolean exists() 测试抽象路径名表示的文件或目录时否存在  

boolean canExecute() 测试文件能否执行  

boolean isDirectory() 测试对象是否是目录  

loolean isFile() 测试对象是否是文件
 
loolean isHidden() 测试对象是否时隐藏文件  

loolean isAbsolute() 测试相对路径是否为绝对路径  

> 判断文件类型时先判断文件对象是否存在
4. 获取信息   

String[] List()  返回名称  

String[] List(FilenameFilter filter) 文件名筛选  

Files files() 返回文件信息

```java
package Day20;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileDemo {
    public static void main(String[] args) throws IOException{
        //consMethod();
        File dir = new File("e:\\");
        File[] files = dir.listFiles();

        for (File f : files) {
            System.out.println(f.getName() + "::" + f.length());
        }

    }
    public static void consMethod() throws IOException {
        //将a.txt封装成对象，可以将已有的和未出现的文件或文件夹封装成对象
        File f1 = new File("Demo.txt");
        //File f2 = new File("c:"+File.separator+"abc","b.txt");

        //能否执行
        //prt("exce == " + f1.canExecute());
        //只打印出文件路径
        //prt(f1);
        //prt(f2);

        File dir = new File("Test");
        prt("mkdir == " + dir.mkdir());

    }
    public static void prt(Object obj) {
        System.out.println(obj);
    }
}
```

##### 列出指定目录下文件或文件夹包含子目录中的内容  

递归(会造成内存溢出)：  

1. 限定条件  
2. 注意递归次数，防止内存溢出  

```java
package Day20;

import java.io.File;
import java.io.FileOutputStream;

public class FileDemo2 {
    public static void main(String[] args) {
        File dir = new File("e:\\");
        showDir(dir,0);
    }

    public static String getLevel(int level) {
        StringBuilder sb = new StringBuilder();
        for(int x=0; x<level; x++) {
            sb.append("   ");
        }
        return sb.toString() + "|--";
    }


    public static void showDir(File dir, int level) {

        System.out.println(getLevel(level)+dir.getName());
        level++;
        File[] files = dir.listFiles();
        for (int x = 0; x < files.length; x++) {
            if (files[x].isDirectory())
                showDir(files[x],level);
            else
                System.out.println(getLevel(level) + files[x].getName());
        }
    }
}
```

#### Prop  

```java
package Day20;

import java.io.File;
import java.io.FileOutputStream;

public class FileDemo2 {
    public static void main(String[] args) {
        File dir = new File("e:\\");
        showDir(dir,0);
    }

    public static String getLevel(int level) {
        StringBuilder sb = new StringBuilder();
        for(int x=0; x<level; x++) {
            sb.append("   ");
        }
        return sb.toString() + "|--";
    }


    public static void showDir(File dir, int level) {

        System.out.println(getLevel(level)+dir.getName());
        level++;
        File[] files = dir.listFiles();
        for (int x = 0; x < files.length; x++) {
            if (files[x].isDirectory())
                showDir(files[x],level);
            else
                System.out.println(getLevel(level) + files[x].getName());
        }
    }
}
```

####### 将流中的数据存储到集合中  

使用load方法  
该方法的原理为：  
```java
package Day20;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

public class PropertiesDemo {
    public static void main(String[] args) throws IOException {
        BufferedReader bufr = new BufferedReader(new FileReader("info.txt"));
        String line = null;
        Properties prop = new Properties();

        while ((line = bufr.readLine())!=null) {
            String[] arr = line.split("=");
            prop.setProperty(arr[0],arr[1]);
        }
        bufr.close();
        System.out.println(prop);
    }
}
```

load方法  

```java
package Day20;

import java.io.*;
import java.net.PortUnreachableException;
import java.util.Properties;

public class PropertiesDemo {
    public static void main(String[] args) throws IOException {
        method_2();

    }
    public static void method_2() throws IOException {
        Properties prop = new Properties();
        FileInputStream fis = new FileInputStream("info.txt");

        //将流中的数据加载进集合
        prop.load(fis);
        System.out.println(prop);

        prop.setProperty("lisi","99");

        //列出集合目录
        prop.list(System.out);

        FileOutputStream fos = new FileOutputStream("info.txt");
        
        //HaHa为注释信息
        prop.store(fos,"HaHa");

        fos.close();
        fis.close();
    }
}
```

程序计数器  
即使程序结束，计数器的值也存在  

```java
package Day20;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public class RunCount {
    public static void main(String[] args) throws IOException {
        Properties prop = new Properties();

        File f = new File("count.ini");
        if(!f.exists())
            f.createNewFile();

        FileInputStream fis = new FileInputStream(f);

        prop.load(fis);

        int count=0;
        String value = prop.getProperty("time");

        if(value!=null) {
            count = Integer.parseInt(value);
            if(count>=5) {
                System.out.println("Lock");
                return ;
            }
        }

        count++;

        prop.setProperty("time",count+"");

        FileOutputStream fos = new FileOutputStream(f);

        prop.store(fos,"");

        fos.close();
        fis.close();
    }
}
```

dom4j可以加载xml  

### Day22  

##### 创建图形化界面  
1. 创建frame框架  
2. 对窗体进行基本设置  
    - 大小，位置，布局  
3. 定义组件  
4， 将组件通过窗体的add方法添加到窗体中  
5， 让窗体显示，通过setVisible()方法  

##### 事件监听机制  

1. 事件源  
2. 事件  
3. 监听器  
4， 事件处理  

监听器：将可以触发某一个事件的动作封装到监听器中  

我们只需要对产生的动作进行处理  

列出对应目录的文件  
```java
package Day22;
import java.awt.*;
import java.awt.event.*;
import java.io.File;

public class MyWindowDemo {
    private Frame f;
    private TextField tf;
    private Button but;
    private TextArea ta;

    MyWindowDemo() {
        init();
    }

    public void init() {
        f = new Frame("my windows");
        f.setBounds(300,100,1000,700);
        f.setLayout(new FlowLayout());

        tf = new TextField(110);

        but = new Button("Trans");

        ta = new TextArea(43,120);

        f.add(tf);
        f.add(but);
        f.add(ta);

        myEvent();
        f.setVisible(true);
    }

    private void myEvent() {

        but.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                String dirPath = tf.getText();
                File dir = new File (dirPath);
                if(dir.exists() && dir.isDirectory()) {
                    ta.setText("");
                    String[] names = dir.list();
                    for(String name : names) {
                        ta.append(name+"\r\n");
                    }
                }
            }
        });

        f.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
    }


    public static void main(String[] args) {
        new MyWindowDemo();
    }
}
```

#### 查询目录  

```java
package Day22;
import java.awt.*;
import java.awt.event.*;
import java.io.File;

public class MyWindowDemo {
    private Frame f;
    private TextField tf;
    private Button but;
    private TextArea ta;

    private Dialog d;
    private Label lab;
    private Button okBut;

    MyWindowDemo() {
        init();
    }

    public void init() {
        f = new Frame("my windows");
        f.setBounds(300,100,1000,700);
        f.setLayout(new FlowLayout());

        tf = new TextField(110);

        but = new Button("Trans");

        ta = new TextArea(43,120);

        //modal表示提示窗口没关闭时底层窗口不能操作
        d = new Dialog(f,"提示信息",true);
        d.setBounds(400,200,400,100);
        lab = new Label();
        okBut = new Button("OK");

        d.add(lab);
        d.add(okBut);

        f.add(tf);
        f.add(but);
        f.add(ta);

        myEvent();
        f.setVisible(true);
    }

    private void myEvent() {

        but.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                showDir();
            }
        });

        d.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
               if(e.getKeyCode()==KeyEvent.VK_ENTER) {
                    showDir();
               }
            }
        });

        tf.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if(e.getKeyCode()==KeyEvent.VK_ENTER) {
                    showDir();
                }
            }
        });

        okBut.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                d.setVisible(false);
            }
        });
        d.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                d.setVisible(false);
            }
        });

        f.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
    }
    private void showDir() {
       String dirPath = tf.getText();
       File dir = new File (dirPath);
       if(dir.exists() && dir.isDirectory()) {
           ta.setText("");
           String[] names = dir.list();
           for(String name : names) {
               ta.append(name+"\r\n");
           }
       }
       else {
           String info = "Path:" + dirPath + "wrong";
           lab.setText(info);
           d.setVisible(true);
       }
    }

    public static void main(String[] args) {
        new MyWindowDemo();
    }
}
```

##### 记事本  

```java
package Day22;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.*;

public class MyMenuDemo {
    private Frame f;
    private MenuBar bar;
    private Menu fileMenu,subMenu;
    private TextArea ta;
    private MenuItem closeItem, subItem, openItem, saveItem;
    private FileDialog openDia, saveDia;
    private File file;

    MyMenuDemo() {
        init();
    }

    public void init() {
        f = new Frame("my windows");
        f.setBounds(300,100,1000,700);

        ta = new TextArea();

        bar = new MenuBar();

        subMenu = new Menu("item");

        fileMenu = new Menu("File");

        closeItem = new MenuItem("Exit");
        openItem = new MenuItem("Open");
        saveItem = new MenuItem("Save");
        subItem = new MenuItem("Chrild");

        openDia = new FileDialog(f,"opend",FileDialog.LOAD);
        saveDia = new FileDialog(f,"saved",FileDialog.SAVE);

        fileMenu.add(openItem);
        fileMenu.add(saveItem);
        fileMenu.add(subMenu);
        fileMenu.add(closeItem);
        subMenu.add(subItem);


        bar.add(fileMenu);

        f.setMenuBar(bar);
        f.add(ta);

        myEvent();

        f.setVisible(true);

    }
    private void myEvent() {

        f.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });

        closeItem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                System.exit(0);
            }
        });

        openItem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                openDia.setVisible(true);
                String dirPath = openDia.getDirectory();
                String fileName = openDia.getFile();
                System.out.println(dirPath+"..."+fileName);
                if(dirPath==null || fileName==null)
                    return;
                ta.setText("");
                file = new File(dirPath, fileName);
                try {
                    BufferedReader bufr =new BufferedReader(new FileReader(file));

                    String line = null;

                    while ((line=bufr.readLine())!=null) {
                        ta.append(line+"\r\n");
                    }
                }
                catch (IOException e) {
                    throw new RuntimeException("读取失败");
                }
            }
        });
        saveItem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                if (file == null) {
                    saveDia.setVisible(true);
                    String dirPath = saveDia.getDirectory();
                    String fileName = saveDia.getFile();
                    if (dirPath == null || fileName == null)
                        return;
                    file = new File(dirPath, fileName);
                }
                try {
                    BufferedWriter bufw = new BufferedWriter(new FileWriter(file));
                    String text = ta.getText();

                    bufw.write(text);
                    bufw.close();
                } catch (IOException e) {
                    throw new RuntimeException();
                }
            }
        });
    }

    public static void main(String[] args) {
        new MyMenuDemo();
    }
}
```

//网络编程
```java
package Day23;

import java.net.InetAddress;

public class IPDemo {
    public static void main(String[] args) throws Exception{
        InetAddress i = InetAddress.getLocalHost();
        //获取地址
        System.out.println("address:" + i.getHostAddress());
        //获取主机名称
        System.out.println("Nmae:" + i.getHostName());

        //获取百度的地址
        InetAddress ia = InetAddress.getByName("www.baidu.com");
        System.out.println("address:" + ia.getHostAddress());
        System.out.println("name:" + ia.getHostName());
    }
}
```

通过UDP协议发送文件  

1. 建立upsocket服务    
2. 提供数据，并将数据封装到数据包中    
3. 通过socket服务的发送功能，将数据包发送出去  
4. 关闭资源  
 
```java
package Day23;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class UdpDemo {
    public static void main(String[] args) throws IOException {
        //创建udp服务，通过DatagramSocket对象  
        DatagramSocket ds = new DatagramSocket();
        
        //数据包
        byte[] buf = "udp come".getBytes();
        DatagramPacket dp = new DatagramPacket(buf,buf.length, InetAddress.getByName("192.168.1.2"),10000);
        
        //通过socket服务，将已有的数据包发送出去，通过send方法
        ds.send(dp);
        
        //关闭资源
        ds.close();
    }
}
```

处理UDP传输数据  

1. 定义upsocket服务,通常会监听一个端口，其实就是给这个接受网络应用程序定义数字标识  
2. 定义一个数据包，因为要存储接受到的字节数据  
    - 因为数据包对象中有更多功能可以提取字节数据中的不同数据信息  
3. 通过socket服务的receive方法将接受到的数据存入已经定义好的数据包中  
4. 通过数据包对象的特有功能，将这些不同的数据取出，打印到控制台上  

```java

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class UdpRece2 {
    public static void main(String[] args) throws IOException {
        DatagramSocket ds = new DatagramSocket(10001);
        while (true) {
            byte[] buf = new byte[1024*64];
            DatagramPacket dp = new DatagramPacket(buf,buf.length);

            ds.receive(dp);
            String ip = dp.getAddress().getHostAddress();
            String data = new String(dp.getData(),0,dp.getLength());
            System.out.println(ip + "::" + data);
        }
    }
}
```
> 广播地址，最后为255  

编写一个聊天程序  
有收数据的部分和发数据的部分  
这两部分需要同时执行，用多线程技术  
一个线程负责收，一个线程负责发  

```java

```
