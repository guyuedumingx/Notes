## Mysql  
-----------

### 注释  
1. 单行注释  
```
--注释内容
# 注释内容
```
2. 多行注释  
```
/*注释*/
```

### SQL分类  

- DDL(操作数据库和表)  
- DQL(查询表中的数据)  
- DML(增删表中的数据)  
- DCL(定义访问权限和安全级别)  


### DDL  

**操作数据库:CRUD**  

1. C(Create):创建  
2. R(Retrieve):查询  
3. U(Update):修改  
4. D(Delete):删除  
5. 使用数据库  

> show create database mysql;  
> 查看创建database的mysql语法  

*创建数据库*  

```
创建db数据库,判断是否存在,制定字符集
create database if not exists db character set gbk;
```

*修改数据库*  

```
修改字符集  
alter database db character set utf8;
```

*删除数据库*  

```
判断存在并删除db数据库
drop database if exists db;
```

*使用数据库*  
```
查询当前正在使用的数据库名称  
select database();

进入数据库  
use 数据库名称;
```
**操作表**  

*创建表*  
```
create table 表名(
列名1 数据类型1,
列名2 数据类型2,
列名3 数据类型3,
......
列名4 数据类型4,
);
```
数据类型  
1. int 整数类型  
```
age int;
```
2. double 小数类型
```
score double(5,3);
score长5位,保留3位小数  
```
3. date 日期	
```
只包含年月日, yyyy-MM-dd
```
4. datetime 日期
```
包含年月日时分秒, yyyy-MM-dd HH:mm:ss
```
5. timestamp 时间戳类型 
```
包含年月日时分秒 yyyy-MM-dd HH:mm:ss  
如果不给这个字段赋值，或赋值为null,则默认使用当前的系统时间,来自动赋值  
```
6. varchar 字符串  
```
name varchar(20) name最大20个字符  
zhangsan 是8个字符  
张三 是2个字符  
```

实例:学生表  
```
create table student(
id int,
name varchar(32),
age int,
score double(4,1),
birthday date,
insert_time timestamp
);
```

*查询表*  

1. 查询表结构  
``` 
desc 表名;
```
2. 查询某个数据库中所有的表名陈  
```
show tables;
```

复制表  

```
create table 表名 like 被复制的表名;
```

*修改表*  

1. 修改表名  
```
alter table 表名 rename to 新的表名;  
```

2. 修改表的字符集  
```
alter table 表名 character set 字符集名称;
alter table db character set utf8;
```

3. 添加一列  
```
alter table 表名 add 列名 数据类型;
```

4. 修改列名称 类型   
```
alter table 表名 change 列名 新列名 新数据类型;  
alter table 表名 modify 列名 新数据类型;  
```

5. 删除列  
```
alter talbe 表名 drop 列名;  
```

*删除表*  
```
drop table if exists 表名;
```

### DML  

**增删改查表中数据**  

1. 添加数据  
```
insert into 表名(列名1,列名2,列名3...列名n) values(值1,值2,值3...值n);   
```
> 1. 列名和值要一一对应  
> 2. 如果表名后,不定义列名, 则默认给所有的列添加值  
> `insert into 表名 values(值1,值2...值n);`  
> 3. 除了数字类型,其他类型要使用引号(单双都可以)引起来  

2. 删除数据  
```
delete from 表名 [where 条件]  
delete from 表名;  //不推荐使用,有多少条记录就会执行多少次删除操作  
TRUNCATE TABLE 表名;  //一般用这个来删除表中的所有记录 
```
> TRUNCATE 的原理是先删除表在建立一个一模一样的表  

3. 更改数据  
```
UPDATE 表名 SET 列名 = 值, WHERE 条件; //不加条件时所有列的数据都会改  
UPDATE 表名 SET 列名 = 值, SET 列名 = 值, WHERE 条件;
```
	
### DQL  
**查询表中的记录**  
1. 查询语句  
1. 排序查询  
2. 聚合函数  
3. 分组查询  
4. 分页查询  

```
select
字段列表
from
表名列表
where
调节列表
group by 
分组字段 
having 
分组之后的条件
order by 
排序 
limit 
分页限定
```

*基础查询*  

- 从student表中查询姓名和年龄  
```
SELECT name,age, FROM student; 
```
- 查询所有字段  
```	
SELECT * FROM 表名;
```	
- 去除重复的结果集  
```
-- distinct  
SELECT DISTINCT name FROM student;  
```
- 四则运算  
```
SELECT name,math,english,math+english FROM student;
```
>一般可以使用四则运算计算一些列的值(一般只会进行数值型的计算)  
> 如果有null参与计算，计算结果都为null  

- 把参与计算的null转为0  
```
SELECT name,math,english,math + IFNULL(english,0) FROM student;  
```
- 起别名  
```
SELECT name,math,english,math + IFNULL(english,0) AS 总分 FROM student;  
SELECT name,math 数学,english 英语,math + IFNULL(english,0) 总分 FROM student;  
```
> 可以把AS换成空格  

*条件查询*  

1. where子句后跟条件  
2. 运算符  
- `>,<,<=,>=,=,<>`  
- `BETWEEN...AND`  
- `IN(集合)`  
- `LIKE`  
	> 占位符  
	> `_`单个任意字符  
	> `&`多个任意字符  
- `IS NULL`  
- `and,&&`  
- `or, ||`  
- `not, !`  

- 查询年龄大于20岁  

```
SELECT * FROM student WHERE age > 20;
```

- 查询年龄大于等于20岁  

```
SELECT * FROM student WHERE age >= 20;
```

- 查询年龄等于20岁  

```
SELECT * FROM student WHERE age = 20;
```

- 查询年龄不等于20岁  

```
SELECT * FROM student WHERE age != 20;` 
SELECT * FROM student WHERE age <> 20;` 
```

- 查询年龄大于等于20小于等于30岁  

```
SELECT * FROM student WHERE age >= 20 && age <= 30; -- 不推荐使用
SELECT * FROM student WHERE age >= 20 AND age <= 30;   
SELECT * FROM student WHERE age BETWEEN 20 AND 30; 
```

- 查询年龄22岁,18岁,25岁的信息  

```
SELECT * FROM student WHERE age = 22 OR age = 18 OR age = 25; 
SELECT * FROM student WHERE age IN (22,18,25); 
```

- 查询英语成绩不为null  

```
SELECT * FROM student IS NOT NULL;
```
> NULL 不能使用=号判断，要用IS NULL 或者 IS NOT NULL;  

- 模糊查询  

```
SELECT * FROM student WHERE name LIKE '马%';  
> 查询姓马的有哪些人  

SELECT * FROM student WHERE name LIKE "_化%";  
> 查询姓名第二个字是化的人  

SELECT * FROM student WHERE name LIKE '___';  
> 查询姓名是三个字的人    

SELECT * FROM student WHERE name LIKE '%马%';  
> 查询姓名中包含马字的人    
```

*排序查询*  
```
order by 子句  
order by 排序字段1 排序方式1, 排序字段2 排序方式2 ... 
```
```
SELECT * FROM student ORDER BY 字段; -- 不指定排序方式默认为升序  
SELECT * FROM student ORDER BY 字段 ASC; -- 升序  
SELECT * FROM student ORDER BY 字段 DESC; -- 降序  
```
- 按照数学成绩排名，如果数学成绩一样，则按照英语成绩排名  
`SELECT * FROM student ORDER BY math ASC, english ASC;`  

*聚合函数*  
```
将一列数据作为一个整体,进行纵向的计算  
```
1. `count` 计算个数  
2. `max` 计算最大值  
3. `min` 计算最小值  
4. `sum` 计算和  
5. `avg` 计算平均值  

> 可以在聚合函数后面取别名，并拿来参与判断  

- 计算人数  
```
SELECT COUNT(name) FROM student;
SELECT COUNT(IFNULL(english,0)) FROM student;
SELECT COUNT(*) FROM student; -- 不推荐使用  
```
- 求和  
```
SELECT SUM(english) FROM student;
```

> 聚合函数的计算自动排除null的值  
>> 选择不包含NULL的列进行计算：主键  

*分组查询*  
- group by  	
> 分组之后查询的字段,分组字段,聚合函数  
> where 在分组之前进行限定,如果不满足条件,则不参与分组。  
> having 在分组之后进行限定，如果不满足结果，则不会被查询出来  
> where 后不可以跟聚合函数,having可以进行聚合函数的判断  

```
SELECT sex, AVG(math) FROM student GROUP BY sex;
-- 根据sex分组并求平均分  

SELECT sex, AVG(math),COUNT(id) FROM student GROUP BY sex;
-- 根据sex分组并求平均分和人数  

SELECT sex, AVG(math),COUNT(id) FROM student WHERE math > 70 GROUP BY sex;
-- 分数低于70分的不参与限定  

SELECT sex, AVG(math),COUNT(id) FROM student WHERE math > 70 GROUP BY sex HAVING COUNT(id) > 2;
-- 分组之后人数要大于2个人 
```

*分页查询*  
```
limit 开始的索引,每页查询的条数  
开始的索引 = (当前的页码-1) * 每页显示的条数  
```

- 每页显示3条记录  
```
SELECT * FROM student LIMIT 0,3; -- 第一页  
SELECT * FROM student LIMIT 3,3; -- 第二页  
```

#### 多表查询  

```
SELECT * FROM 表名, 表名;
```
> 查出来的是迪卡尔积  
> 有两个集合A,B，取这两个集合的所有可能的组成情况  

**内连接查询**  

*隐式内连接: 使用where消除无用的数据*  
```
SELECT * FROM emp,dept WHERE emp.dept_id = dept.id;
```
部分查询  
```
-- 查询员工表的姓名性别和部门表的名称  
SELECT
t1.name,
t1.gender,
t2.name
FROM
emp t1, 
dept t2  -- 起别名  
WHERE
t1.dept_id = t2.id;
```
*显式内连接:*   
```
SELECT 字段列表 FROM 表名1 INNER JOIN 表名2 ON 条件  
SELECT 字段列表 FROM 表名1 JOIN 表名2 ON 条件  
```
案例  
```
SELECT * FROM emp JOIN dept ON emp.`dept_id` = dept.`id`;
```
**外链接查询**  

*左外连接*  
```
-- 查询左表所有数据以及其交集部分  
SELECT 字段列表 FROM 表1 LEFT [outer] JOIN 表2 ON 条件;
```

*右外连接*  
```
-- 查询右表所有数据以及其交集部分  
SELECT 字段列表 FROM 表1 RIGHT [outer] JOIN 表2 ON 条件;
```

**子查询**  
> 查询中嵌套查询  

1. 子查询的结果是单行单列的  

```
-- 查询工资最高的员工信息  
SELECT * FROM WHERE emp.`salary` = (SELECT MAX(salary) FROM emp);

-- 查询员工工资小于平均工资的人  
SELECT * FROM emp WHERE emp.`salary` < (SELECT AVG(salary) FROM emp);
```

2. 子查询的结果是多行单列的  

```
-- 查询财务部和市场部所有员工的信息  
SELECT * FROM emp WHERE dept_id IN (SELECT id FROM dept WHERE name = '财务部' OR name = '市场部');
```  
> 使用运算符号in作为判断  

3. 子查询的结果是多行多列的  

```  
-- 查询员工入职日期是2011-11-11日之后的员工信息和部门信息  
SELECT * FROM dept t1, (SELECT * FROM emp WHERE emp.join_date > '2011-11-11') t2  
WHERE t1.id = t2.dept_id;
```    
> 子查询可以作为一张虚拟表来查询  	

### DCL  

> 管理用户,授权  

**管理用户**  

*添加用户*  
```
-- 创建用户  
CREATE USER '用户名'@'主机名' IDENTFIED BY '密码';

CREATE USER 'zhangsan'@'localhost' IDENTFIED BY '123';
-- 支持任意主机登录  
CREATE USER 'zhangsan'@'%' IDENTFIED BY '123';
```
*删除用户*  
```
DROP USER '用户名'@'主机名'
```
*修改用户密码*     
```
UPDATE USER SET PASSWORD = PASSWORD('新密码') WHERE USER = '用户名';
```
```
SET PASSWORD FOR '用户名'@'主机名' = PASSWORD('新密码');
```
*忘记root用户的密码*  
```
1. cmd --> net stop mysql  
2. mysqld --skip-grant-tables
```

*查询用户*  
```
-- 切换到mysql数据库  
USE mysql;
-- 查询USER表  
SELECT * FROM USER;
```

**授权**  

*查询权限*  

```
SHOW GRANTS FOR '用户名'@'主机名';
SHOW GRANTS FOR 'root'@'%';
```

*授予权限*  

```
GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';
GRANT SELECT,DELETE,UPDATE ON 数据库名.表名 TO '用户名'@'主机名';

-- 给张三用户授予所有权限，在任意数据库任意表上  
GRANT ALL ON *.* TO 'zhangsan'@'localhost';
```
*撤销权限*  
```

REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
REVOKE UPDATE ON db.account FROM 'lisi'@'%';
```
 


#### 约束  

```
对表中的数据进行限定,保证数据的正确性,有效性和完整性  
```

1. 主键约束  `primary key`  
2. 非空约束  `not null`  
3. 唯一约束  `unique`  
4. 外键约束  `foreign key`  

> mysql中唯一约束限定的条件中可以有多个null  
		
*创建表时加约束*  
```	
CREATE table stu (
  id INT,
  name VARCHAR(20) NOT NULL -- name非空约束  
  phone_number VARCHAR(20) UNIQUE -- 添加唯一约束  
);
```	

*创建表后添加非空约束*  
```
ALTER TABLE stu MODIFY name VARCHAR(20) NOT NULL;
```
*创建表后添加唯一约束*  
```
ALTER TABLE stu phone_number VARCHAR(20) UNIQUE;
```

*删除非空约束*  
```
ALTER TABLE stu MODIFY name VARCHAR(20);  
```
*删除唯一约束*  
```
通过删除索引的方式删除唯一约束  
ALTER TABLE stu DROP INDEX phone_number;
```

**主键**  
```
1. 含义：非空且唯一约束  
2. 一张表只能有一个字段为主键  
3. 主键就是一张表的唯一标识  
```
*创建表时加主键*  

```
CREATE TABLE stu ( 
	id INT PRIMARY KEY, -- 给id加主键约束  
	name VARCHAR(20)
);
```

*删除主键*  
```
ALTER TABLE stu DROP PRIMARY KEY;
```
*创建表后添加主键*  
```
ALTER TABLE stu MODIFY id INT PRIMARY KEY;
```

**自动增长**  
```
如果某一列是数值类型的,使用auto_increment可以完成值的自动增长  
```

```
CREATE TABLE stu ( 
	id INT PRIMARY KEY AUTO_INCREMENT, --给id加自动增长  
	name VARCHAR(20)
);
```

*删除自动增长*  
```
ALTER TABLE stu MODIFY id INT;
```
*添加自动增长*  
```
ALTER TABLE stu MODIFY id INT AUTO_INCREMENT;
```

**添加外键约束**  
```
create table 表名 (
	...
	外键列
	constraint 外键名称 foreign key (外键列名称) references 主表名称(主表列名称)
```

*案例*  
```
CREATE TABLE department ( 
	id INT PRIMARY KEY AUTO_INCREMENT,
	dep_name VARCHAR(20),
	dep_location VARCHAR(20)
);
```
```
CREATE TABLE employee ( 
	id INT PRIMARY KEY AUTO_INCREMENT,
	age INT,
	dep_id INT, -- 外键对应主表的主键
	CONSTRAINT emp_dept FOREIGN KEY (dep_id) REFERENCES department (id)
);
```

*删除外键*  
```
ALTER TABLE employee DROP FOREIGN KEY emp_dept;
```
*添加外键*  
```
ALTER employee ADD CONSTRAINT emp_dept FOREIGN KEY (dep_id) REFERENCES department (id);
```
**级联操作**  

1. 级联更新  
```
ON UPDATE CASCADE
```
2. 级联删除  
```
ON DELETE CASCADE
```

```
ALTER TABLE 表名 ADD CONSTRAINT 外键名称  
	FOREIGN KEY (外键字段名称) REFERENCES 主表名称(主表列名称) ON UPDATE CASCADE ON DELETE CASCADE;
```

**多表之间关系**  

1. 一对一  
	- 人和身份证  
	- 实现方式: 在任意一方添加主键指向另一方的唯一外键  
	- 一般情况下不需要在另外作出一张表  
2. 一对多(多对一)  
	- 部门和员工  
	- 一个部门有多个员工，一个员工只属于一个部门  
	- 实现方式: 在多的一方建立外键,指向一的一方的主键  
3. 多对多  
	- 学生和课程  
	- 实现方式:   
			> 借助第三张中间表  
			> 中间表至少包含两个字段,这两个字段作为第三张表的外键,分别指向两张表的主键  


#### 数据库设计的范式  

1. 第一范式(1NF) :每一列都是不可分割的原子数据项   
2. 第二范式(2NF) :在1NF的基础上消除非主属性对主码的部分函数依赖(消除部分依赖)   
3. 第三范式(3NF) :在2NF的基础上消除传递依赖   

```
1.函数依赖: A-->B,如果根据A属性(属性组)的值可以确定唯一B属性的值，则称B依赖于A  
	例如: 学号-->姓名 

2.完全函数依赖: A-->B, 如果A是一个属性组,则B属性值的确定需要依赖于A属性组所有的属性值  
	例如: (学号,课程名称) --> 分数  

3. 部分函数依赖: A-->B, 如果A是一个属性组,则B属性值的确定只需要依赖于A属性组某一些属性值即可  
	例如: (学号,课程名称) --> 姓名

4. 传递函数依赖: A-->B, B-->C,如果通过A属性(属性组)的值，可以确定唯一B属性的值，再通过B属性(属性组)的值可以确定唯一C属性的值，则称C传递函数依赖于A  

5. 码: 如果在一张表中,一个属性或属性组,被其他所有属性所完全依赖，则称这个属性(属性组)为该表的码  
	例如: (学号,课程名称)  
	主属性:码属性组中的所有属性  
	非主属性:除码属性组的属性  
```

#### 数据库的备份和还原  

*备份*  
```
mysqldump -u用户名 -p密码 > 保存的路径  
mysqldump -uroot -p111 > d://a.sql
```
*还原*  
```
1.登录数据库
2.创建数据库
3.使用数据库
4.执行文件 source 文件路径
```

#### 事务  

> 如果一个包含多个步骤的业务操作，被事务管理，那么这些操作要么同时成功，要么同时失败  

1. 开启事务  `start transaction`  
2. 回滚  `rollback`  
3. 提交  `commit`  

```
-- zhangsan 转账给lisi 500元  

-- 开启事务  
START TRANSACTION;  

UPDATE acccount SET balance = balance - 500 WHERE name = 'zhangsan';
UPDATE acccount SET balance = balance + 500 WHERE name = 'lisi';

--执行事务,无误提交  
COMMIT;

--错误回滚
ROLLBACK;
```

*事务提交的两种方式*  
1. 一条DML(增删改)语句会自动提交一次事务  
2. 手动提交  
	- COMMIT  

> 查看事务的默认提交方式: `SELECT @@autocommit;`  --1 就是自动提交  0 就是手动提交  
> 修改事务的默认提交方式; `SET @@autocommit = 0`

**事务的隔离级别**  

存在的问题  
- 脏读: 一个事务，读取到另一个事务中没有提交的数据  
- 不可重复读(虚读):在同一个事务中，两次读取到的数据不一样  
- 幻读: 一个事务操作(DML)数据表中的所有记录,另一个事务添加了一条数据，则第一个事务查询不到自己的修改   

*隔离级别*  
1. `read uncommitted`: 读未提交  
	- 产生的问题: 脏读，不可重复读，幻读  
2. `read committed:` 读已提交(Oracle默认的隔离级别)  
	- 产生的问题: 不可重复读，幻读  
3. `repeatable read:` 可重复读 (Mysql默认)  
	- 产生的问题: 幻读  
4. `serializable:` 串行化  	
	- 解决所有的问题  

> 隔离级别从小到大安全性越来越高，但是效率越来越低  

*查询数据库隔离级别*  
```
SELECT @@tx_isolation;
```
*设置数据库隔离级别*  
```
set global transaction isolation level 级别字符串  
```
