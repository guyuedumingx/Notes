### JSP  

 Java Server Pages ：java服务器端页面  
- 可以理解为：一个特殊的页面，其中既可以定义html标签，也可以定义java代码    
- 用于简化书写  

```jsp
<!--在控制台打印hi jsp-->
<%
System.out.println("hi jsp");
%>
```

> jsp 的本质就是一个servlet  

jsp的脚本  

> JSP定义java代码的方式  

1. `<% %>` : 定义的java代码在`service`方法中。(HttpServlet里面的)`service` 方法中有什么它就可以有什么  
2. `<%! %>` ：定义成员 可以是`成员变量`或`成员方法`, 转换后在java类的成员位置(就是在方法体的外面)（可能引发线程安全问题）    
3. `<%= %>`  ：定义的java代码会输出到页面上   

#### JSP的内置对象  

- 在jsp页面中不需要获取和创建，可以直接使用的对象  
- jsp一共有9个内置对象  


| 内置对象    | 真实类型            | 作用                              |
|-------------|---------------------|-----------------------------------|
| pageContext | PageContext         | 当前页面共享数据，获取其他8个对象 |
| request     | HttpServletRequest  | 一次请求访问的多个资源            |
| session     | HttpSession         | 一次会话的多个请求间              |
| application | ServletContext      | 所有用户间共享数据                |
| response    | HttpServletResponse | 响应对象                          |
| page        | Object              | 当前页面的对象                    |
| out         | JspWriter           | 输出对象                          |
| config      | ServletConfig       | Servlet的配置对象                 |
| exception   | Throwable           | 异常对象                          |

> 一次会话的意思就是，只要这个用户没关这个浏览器，它就还存在，浏览器重启之都消失  
> `application`的作用域比较大，所有的用户都可以共用，而`sesson`只是一个用户的  

**out**  

- 字符输出流对象，可以将数据输出到页面上。和response.getWriter()类似  

> tomcat服务器永远先找response对象再找out, 所以response.getWriter() 会比out.write先  


**指令**  

作用：用于配置JSP页面，导入资源文件  
格式：  
	- `<%@ 指令名称 属性名1=属性值1 属性名2=属性值2 ... %>`  

分类:  
1. `page` : 配置JSP页面的   
2. `include` ：用来包含页面。导入页面的资源文件   
3. `taglib` ：导入资源,一般用来导入标签库     

*page*  

- `contentType`  
	1. 设置响应体的mine类型以及字符集  
	2. 设置当前jsp页面的编码  
		- 高级IDE才生效，否则需要设置pageEncoding  

```jsp
<%@ page contentType="text/html; charset = gb2312" %>
```

- `import` 
	1. 导入java包  


- `buffer` 设置缓冲区大小  


- `session` 设置是否需要session对象  


- `autoFlush` 设置缓冲区填满是否刷新  


- `isThreadsafe` 设置是否可以多线程访问JSP页面  


- `info` 定义一个常用的字符串  


- `errorPage`  
	1. 当前页面发生异常后，会自动跳转到指定的错误页面  


- `isErrorPage`  
	1. 标识当前页面是否是错误页面  
		- true: 可以使用内置对象Exception  


> `errorPage` 用来指定异常界面是哪个，只要这个界面发生了异常，就跳转过去   

> `isErrorPage` 接收一个布尔值，如果是`true`，则说明这是一个异常界面，就是`errorPage`有可能跳到这里来，标识了`isErrorPage`属性之后，就可以使用`Exception`这个内置对象  


*include*  

```jsp
<%@ include file="文件的 URL" %>
```

*taglib*  

一般用来导入标签库，比如JSTL  

```jsp 
<@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core">
```
- prefix 前缀  
- uri 资源路径  

#### 注释  

```
html的注释方式  
1. <!-- --> 只能注释html代码   

jsp的注释方式 
2. <%-- --> 都能注释  (推荐)
```

### EL表达式  

1. 概念： Expression Language 表达式语言  
2. 作用： 替换和简化jsp页面中的java代码的书写  
3. 语法： `${表达式}` 

4. 忽略El表达式（原样输出）  
	- 设置`jsp`中`page`指令: `isELIgnored="true"` 忽略当前jsp页面中所有的EL表达式  
	- `\${表达式}`： 忽略当前这个EL表达式  

5. 支持的运算  
	- 算数运算符： `+` `-` `/(div)` `%(mod)`  
	- 比较运算符： `>` `<` `>=` `<=` `==` `!=`  
	- 逻辑运算符： `&&(and)` `||(or)` `!(not)`  
	- 空运算符： `empty`  
		- 功能： 用于判断字符串、集合、数组对象是否为null并且长度是否为0  
		- `${empty list}`  
		- `${not empty list}` 不为空   
	
**获取值**  

1. EL表达式只能从域对象中获取值  

*语法1*： `${域名称.键名}`: 从指定域中获取指定键的值  

域对象名称：  
```
pageScope        --> pagecontext  
requestScope     --> request  
sessionScope     --> session  
applicationScope --> application(ServletContext)  
```

举例：

```jsp
在request域中存储了name=张三  
${requestScope.name} 
```

*语法2*： `${键名}`  
依次从最小的域中寻找这个键，直到找到为止  

**获取对象**  

通过对象的属性获取  

`${域名称.键名.属性名}`  

> 实际上调用的是get方法  
> 所以这个对象里面必须有对应的get方法  
> 只要有get方法，去掉get再把首字母小写,就可以直接调用  

```jsp
<%
User user = new User();
user.setName("张三");
request.setAttribute("u", user);
%>

<!--获取user中的name的值-->
${requestScope.u.name}

```

**获取List集合**  

`${域名称.键名[索引]}`  

```jsp
<%
List list = new ArrayList();
list.add("aaa");
list.add("bbb");
request.setAttribute("list", list);
%>

<%--获取list中的第一个值--%>  
${list[0]}
```

**获取Map集合**  

`${域名称.键名.key名称}`    

`${域名称.键名["key名称"]}`    

```jsp  
<%
Map map = new HaspMap();
map.put("sname", "张三");
map.put("gender", "男");
request.setAttribute("map", map);
%>

${map.gender}
${map["gender"]}
```

**隐式对象**  

1. EL表达式中有11个隐式对象  

*`page`对象*: 可以获取其他8个内置对象  

```jsp
${pageContext.request.contextPath}：动态获取虚拟目录  
```

#### 资源链接   

[!JSP复习总结](https://blog.csdn.net/GodJing007/article/details/103500726)  

[!github](https://github.com/guyuedumingx/Notes)  



