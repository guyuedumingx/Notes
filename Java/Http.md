## Http  

-------------  

### Requests  

```
1. 获取请求方式  GET
	- String getMethod()
2. 获取虚拟目录  
	- String getContextPath()  
3. 获取Servlet路径  
	- String getServletPath()
4. 获取get方式请求的参数  
	- String getQueryString()  
5. 获取请求URI  
	- String getRequestURI()
	- StringBuffer getRequestURL()
6. 获取协议和版本  
	- String getProtocol()
7. 获取客户机的IP地址  
	- String getRemoteAddr()
```

1. 获取请求头  
	- getHeader(String name)  通过请求头的名称获取头的值  
	- Enumeration<String> getHeaderName() 获取所有请求头的名称  
2. 获取请求体  
	- 只有POST才有请求体  
	- 获取流对象  
			- BufferReader getReader()  获取字符输入流，只能操作字符数据  
			- ServletInputStream getInputStream() 获取字节输入流,可以操作所有类型的数据  

获取请求参数的通用方式  

1. String getParameter(String name) 根据参数名称获取参数值  
2. String[] getParameterValues(String name) 根据参数名称获取参数值的数组  
3. Enumeration<String> getParameterNames(): 获取所有请求参数名称  
4. Map<String,String[]> getParameterMap() : 获取所有参数的map集合  


请求转发  

> 在服务器内部的资源跳转的方式  

```
RequestDispatcher getRequestDispatcher(String path).forward(ServletRequest request, ServletResponse response)
```
共享数据  

1. 域对象  
	- 一次共享的域  
 
 ```
 void setAttribute(String name, Object obj) 存储数据
 Object getAttritude(String name) 通过键获取值
 void removeAttribute(String name) 通过键移除数据
 
 ```

#### 相应消息   

*数据格式*   

1. 响应行  
	1. 组成： 协议/版本 响应状态码 状态码描述  
	2. 响应状态码：服务器告诉客户端浏览器本次请求和响应的一个状态  
		1. 状态码都是3位数字  
		2. 分类:  
			
2. 响应头  
	1. 格式：头名称：值  
	2. 常见的响应头：  
		1. `Content-Type`:服务器告诉客户端本次响应体数据格式以及编码格式  
		2. `Content-disposition`: 服务器告诉客户端以什么格式打开响应体数据  
			- in-line:默认值,在当前页面打开  
			- attachment;filename=xxx:以附件形式打开响应体.文件下载  

3. 响应空行  
4. 响应体  
	- 数据  

状态码分类  

| 类型 | 描述                                                    |
|------|---------------------------------------------------------|
| 1xx  | 服务器收客户端的消息，但是没有完成，等待一段时间后抛出  |
| 2xx  | 成功                                                    |
| 3xx  | 重定向 302(重定向) 304(访问缓存)                        |
| 4xx  | 客户端错误 404(路径无对应资源) 405(没有对应的doxxx方法) |
| 5xx  | 服务器端错误 500(服务器内部异常)                        |


### Response  

1. 设置响应行  
	1. 格式： HTTP/1.1 200 ok  
	2. 设置状态码: setStatus(int sc)  
2. 设置响应头： setHeader(String name, String value)  
3. 设置响应体  
	1. 获取输出流  
		- 字符输出流：PrintWriter getWriter()_  
		- 字节输出流：ServletOutputStream getOutputStream()  
	2. 使用输出流将数据输出到客户端浏览器  

重定向方法  

```
response.sendRdfirect(重定向的位置)  
response.sendRdfirect("/day15/responseDemo2")  
```

*重定向与转发*  

重定向的特点  

1. 地址栏发生变化  
2. 重定向可以访问其他站点  
3. 重定向是两次请求 不能通过request对象共享数据   

转发的特点  

1. 地址栏不发生变化  
2. 转发只能发问当前服务器下的资源  
3. 转发是一次请求 能通过request对象共享数据   

**路径**  
规则: 判断定义的路径是给谁用的？判断请求将来从哪儿发出  
	- 给客户端使用：需要加虚拟目录  
	- 给服务端使用：不需要加虚拟目录  


*动态获取虚拟目录*    
```
String contextPath = request.getContextPath();
```
### ServletContext 对象  

1. 概念： 代表整个web应用，可以和程序的  
2. 功能  
	- 获取MIME类型  
	- 域对象：共享数据  
	- 获取文件的真实(服务器)路径  
			- String getRealPath(String path)  

> MIME是互联网通讯过程中定义的一种文件数据类型  
> 格式： 大类型/小类型    text/html    image/jpeg  
> 获取： `String getMimeType(String file)`  
	
3. 获取  
	- 通过request对象获取  
			- request.getServletContext();  
	- 通过HttpServlet获取  
			- this.getServletContext();  
