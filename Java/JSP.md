### JSP  

 Java Server Pages ：java服务器端页面  
 	- 可以理解为：一个特殊的页面，其中既可以定义html标签，也可以定义java代码  
	- 用于简化书写  

```jsp
<%
	System.out.println("hi jsp");
	%>
```
> jsp 的本质就是一个servlet  

jsp的脚本  

> JSP定义java代码的方式  

1. `<% %>` : 定义的java代码在service方法中。   
2. `<%! %>` ：定义成员 可以是成员变量或成员方法   
3. `<%= %>`  ：定义的java代码会输出到页面上   

#### JSP的内置对象  
	- 在jsp页面中不需要获取和创建，可以直接使用的对象  
	- jsp一共有9个内置对象  

request  

response  

out  
	- 字符输出流对象，可以将数据输出到页面上。和response.getWriter()类似  

**指令**  
作用：用于配置JSP页面，导入资源文件  
格式：  
	- `<%@ 指令名称 属性名1=属性值1 属性名2=属性值2 ... %>`  

