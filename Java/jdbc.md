## JDBC  
------------  
> 定义了操作所有关系型数据库的规则(接口)  

**数据库驱动:JDBC具体的实现类**  

*步骤*  
1. 导入驱动jar包  
2. 注册驱动  
3. 获取数据库连接对象Connection  
4. 定义sql  
	- sql的参数使用占位符. `select * from user where username = ? and password = ?`  
5. 获取执行sql语句的对象Statement  
6. 给?赋值  
	- setXxx(参数1,参数2)  
	- 参数1: ?的位置编号 从1开始  
	- 参数2: ?的值
7. 执行sql，接收返回结果  
8. 处理结果  
9. 释放资源  

```java
Class.forName("com.mysql.jdbc.Driver");

// 获取数据库连接对象  
Connection conn = DriverManager.getConnection
("jdbc:mysql://localhost/test", "root", "111");

String sql = "update account set salary = 10101 where id = 10000";

//获取执行sql的对象  Statement
Statement stmt = conn.createStatement();

int res = stmt.executeUpdate(sql);
System.out.println(res);
conn.close();
stmt.close();
```

1. `DriverManager`驱动管理对象 
- 注册驱动  
- 获取数据库连接  
2. `Connection`数据库连接对象  
- 获取执行sql的对象  
	- Statement createStatement()  
	- PreparedStatement preparedStatement(String sql)
- 管理事务  
	- 开启事务  `setAutoCommit(boolean autoCommit)` 调用方法设置参数为false，即开启事务  
	- 提交事务  `commit()`  
	- 回滚事务  `rollback()`  
3. `Statement`执行静态sql的对象  
- int executeUpdate(String sql) 执行DML语句,DDl语句  
	- 返回值: 影响的行数,如果>0则证明语句执行成功  
- ResultSet executeQuery(String sql) 执行DQL(select)语句  	
4. `ResultSet`结果集对象  
1. next()游标向下移动一行  
2. getXxx:获取数据  
- int getInt(), String getString()  
- 参数  
		1. int: 代表列的编号，从1开始  如: getString(1)  
		2. String: 代表列名称  如： getDouble("salary")  

5. `PreparedStatement`执行预编译sql的对象  

> 后期全部使用PreparedStatement而不是Statement  

循环获取数据  
```
while(rs.next()) {
int id = rs.getInt(1);
String name = rs.getString("name");
}
```

**通用性**  

> 不想传参同时保证工具类的通用性  

*SQL注入问题*  
在拼接sql时，有一些sql的特殊关键字参与字符串的拼接。会造成安全问题  

*预编译SQL*  
> 占位符  


*解决方法*  
配置文件  

**获取路径**  
```java
//获取jdbc.properties文件的路径  
ClassLoader classLoader = JDBCUtils.class.getClassLoader();
URL res = classLoader.getResource("jdbc.properties");
String path = res.getPath();
```

### 数据库连接池  

> 是一个容器(集合),存放数据库连接的容器  

当系统初始化后，容器被创建，容器中会申请一些对象，当用户访问数据库时，从容器中获取连接对象，用户访问完后，会将连接对象归还给容器  

方法:  
- 获取连接: getConnection()  
- 归还连接: Connection.close()  


### Druid  

配置文件:  
- properties  
- 可以是任意名称,任意目录  

获取数据库连接池对象  
- 通过工厂类来获取 `DruidDataSourceFactory`  
获取连接  
- `getConnection()`

*druid.properties*  

```
driverClassNmae=com.mysql.jdbc.Driver
url=jdbc:mysql://127.0.0.1:3306/darkhorse
username=root
password=111
#初始化连接数量 
initialSize=5
#最大连接数
maxActive=10
#最大等待时间
maxWait=3000
```

*定义工具类*  

1. 定义一个类 `JDBCUtils`  
2. 提供静态代码块加载配置文件,初始化连接池对象  
3. 提供方法  
1. 获取连接的方法: 通过数据库连接池获取连接  
2. 释放资源  
3. 获取连接池的方法  


### Spring JDBC  

1. 导入jar包  
2. 创建JdbcTemplate对象。依赖于数据源DataSource  
3. 调用JdbcTemplate的方法来完成CRUD的操作  

| 方法             | 操作                               |
|------------------|------------------------------------|
| update()         | 执行DML语句。增删改                |
| queryForMap()    | 查询结果集封装为map集合            |
| queryForList()   | 查询结果将结果集封装为list集合     |
| query()          | 查询结果，将结果封装为JavaBean对象 |
| queryForObject() | 查询结果，将结果封装为对象         |

> queryForMap(): 查询的结果集长度只能是1  
> queryForList(): 将每条记录封装为一个map集合，在将map集合装载到list集合中  


查询所有结果将结果集封装为list集合  
```java
String sql = "select * from emp";
List<Emp> list = template.query(sql, new BeanPropertyRowMapper<Emp>(Emp.class));
for (Emp emp : list) 
sout(emp);
```
