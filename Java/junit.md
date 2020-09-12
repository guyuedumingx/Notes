#### Junit  

> 白盒测试  

**步骤**  
```
1. 定义一个测试类  
	* 测试类名Test		CalculatorTest  
	* 包名xxx.xxx.test	cn.itcasty.test  

2. 定义测试方法: 可以独立运行  
	* test测试的方法名		testAdd()   
	* 返回值void  
	* 空参  

3. 给方法加@Test  

4. 导入junit依赖  
```

**判定结果**  

> 使用断言  

```
Assert.assertEquals(expected,actual)  
expected:	希望值  
actual:		真实返回的结果值  
```

**补充**  

> 初始化方法  
> 用于资源申请,所有测试方法在执行之前的资源申请  
> 在所有测试方法执行之前都会执行  

```
@Before
public void init() {

}
```

> 关闭资源的方法  
> 在所有测试方法执行之后都会执行  

```
@After
public void close() {

}
```

- @Before  
	- 修饰的方法会在测试方法之前自动执行  
- @After  
	- 修饰的方法会在测试方法之后自动执行  


#### 反射  

> 框架设计的灵魂  
> 将类的各个组成部分封装为其他对象  

*好处*  

1. 可以在运行过程中,操作这些对象  
2. 可以解耦(降低程序的耦合性)  

**Class对象的功能**  
```
1. 获取成员变量们  
	- 获取被public修饰的变量
	- Field[] getFields()  
	- Field[] getField(String name)

	- 获取所有的成员变量,不考虑修饰符  
	- Field[] getDeclaredFields()
	- Field getDeclaredField(String name)
2. 获取构造方法们  
	- Constructor<?>[] getConstructors()
	- Constructor<T> getConstructor(类<?>...parameterTypes)

	- Constructor<T> getDeclaredConstructor(类<?>...parameterTypes)  
	- Constructor<?>[] getDeclaredConstructors()
3. 获取成员方法们
	- Method[] getMethods()
	- Method getMethod(String name, 类<?>...parameterTypes)

	- Method[] getDeclaredMethods()
	- Method getDeclaredMethod(String name, 类<?>...parameterTypes)
4. 获取类名  
	- String getName()
```

*Field 成员变量*  
1. 操作  
	- 设置值  
		- void set(Object obj, Object value);
	- 获取值  
		- get(Object obj)
	- 忽略访问权限修饰符的安全检查  
		- setAccessible(true)	//暴力反射  

*实例*  
``` 
Field[] fields = personClass.getFields();
for (Field field : fields) 
	System.out.println(field);

//获取被public修饰的变量
Field a = personClass.getField("a");

//获取成员变量a的值  
Person p = new Person();
Object value = a.get(p);
System.out.println(value);

//设置a的值  
a.set(p,"张三");

//获取所有的成员变量
Field d = personClass.getDeclaredField("d");
//暴力反射  
//忽略访问权限修饰符的安全检查
d.setAccessible(true);
Object value2 = d.get(p);
```

*Constructor 构造方法*  
1. 创建对象  
	- T newInstance(Object... initargs)
	- 使用空参数构造方法创建对象
		- Class对象的newInstance方法  

*实例*  
```
Constructor constructor = personClass.getConstructor(String.class,int.class);
Object person = constructor.newInstance("张三",23);

//空参构造方法
personClass.newInstance();

//构造器也可以暴力反射  
constructor.setAccessible(true);
```

*Method 成员方法*  
1. 执行方法
	- Object invoke(Object obj, Object... args)
2. 获取方法名称
	- String getName() 获取方法名

*实例*  
```
Method eat_method = personClass.getMethod("eat"):
Person p = new Person();
//执行方法
eat_method.invoke(p);

Method eat_method2 = personClass.getMethod("eat", String.class);
//执行方法
eat_method2.invoke(p,"饭");
```

**获取Class对象的方式**  
1. Class.forName("全类名"):将字节码文件加载进内存,返回Class对象  
	- 多用于配置文件,把类名定义在配置文件中,读取文件,加载类  
2. 类名.class:通过类名属性class获取  
	- 多用于参数的传递  
3. 对象.getClass(): getClass()方法定义在Object类中  
	- 多用于对象的获取字节码的方式  

```
//1.
Class cls = Class.forName("cn.itcast.domian.Person");
//报ClassNotFound错  
//2.
Class cls2 = Person.class;
//3.
Person p = new Person();
Class cls3 = p.getClass();
```

> 同一个字节码文件(*.class)在一次运行中只会加载一次  

#### 路径  

```
//获取class目录下的配置文件  
ClassLoader classLoader = ReflectTest.class.getClassLoader();
InputStream is = classLoader.getResourceAsStream("pro.properties");
Properties pro = new Properties();
pro.load(is);

//获取配置文件中定义的数据  
String className = pro.getProperty("className");
String methodName = pro.getProperty("methodName");
```

#### 反射案例  
> 创建任意对象,执行任意方法  

```
ClassLoader classLoader = ReflectTest.class.getClassLoader();
InputStream is = classLoader.getResourceAsStream("pro.properties");
Properties pro = new Properties();
pro.load(is);

//获取配置文件中定义的数据  
String className = pro.getProperty("className");
String methodName = pro.getProperty("methodName");

//加载该类进内存  
Class cls = Class.forName(className);
//创建对象 
Object obj = cls.newInstance();
//获取方法对象 
Method method = cls.getMethod(methodName);
//执行方法  
method.invoke(obj);
```

#### 注解    
1. 概念: 说明程序的。给计算机看的  
> 注释: 用文字描述程序,给程序员看的  

2. 作用分类:  
	- 编写文档  
	- 代码分析  
	- 编译检查  

3. 使用注解  
	- @注解名称  

**JDK中预定义的注解**  
```
- @Override:检测被该注解标注的方法是否继承自父类(接口)的  
- @Deprecated:该注解标注的内容,表示已过时  
- @SuppressWarnings:压制警告  
	- @SuppressWarnings("all"):压制所有警告  
```

**自定义注解**  
*格式*   
```
- 元注解  
- public @interface 注解名称{}
```

*本质*  
```
- 注解的本质上就是一个接口,该接口默认继承Annotation接口  
	- public interface MyAnno extends java.lang.annotation.Annotation{}  
```

*属性*  
```
- 接口中的抽象方法  
- 要求:  
	- 属性的放回值类型  
	- String  
	- 枚举  
	- 注解  
	- 以上类型的数组  
```

*元注解*  

> 描述注解的注解  

- `@Target`:描述注解能够作用的位置  
	- `ElementType`取值  
		- `TYPE:`可以作用于类上  
		- `METHOD:`可以作用于方法上  
		- `FIELD:`可以作用于成员变量上  
- `@Retention`:描述注解被保留的阶段  
- `@Documented`:描述注解是否被抽取到api文档中  
- `@Inherited`:描述注解是否被子类继承  

```
@Target(value={ElementType.TYPE})//表示该自定义注解只能作用在类上  
@Retention(RetentionPolicy.RUNTIME)当前被描述的注解,会保留到class字节码文件中,并被JVM读取到  
```
