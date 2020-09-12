### 会话技术  

客户端会话技术和服务器端会话技术的区别：  
> 把数据存到客户端的叫客户端会话技术  
> 把数据存到服务器的叫服务器端会话技术  

1. 会话： 一次会话包含多次请求和响应  
	- 一次会话： 浏览器第一次给服务器发送请求，会话建立，直到有一方断开为止  
	- 功能：在一次对话的范围内共享数据  

### Cookie   
> 客户端会话技术  

*使用步骤*  
1. 创建Cookie对象，绑定数据  
	- new Cookie(new Cookie(String name, String value))  
2. 发送Cookie对象  
	- response.addCookie(Cookie cookie)  
3. 获取Cookie，拿到数据  
	- Cookie[] request.getCookies()  

*Cookie在浏览器中保存多长时间  
1. 默认情况下，当浏览器关闭后，Cookie数据被摧毁  
2. 持久化存储  
	- *SetMaxAge(int seconds)*
			- 正数：将Cookie数据写到硬盘文件中。持久化存储。Cookie存活时间  
			- 负数： 默认值  
			- 零： 删除Cookie信息  

*Cookie能不能支持中文*  
1. tomcat 8 之前cookie不能直接存储中文数据  
	- 需要将中文数据转码--- 一般采用URL编码(%E3)  
2. tomcat 8  之后支持存储中文数据  

*cookie共享*  
假设在一个tomcat服务器中，部署多个web项目，那么在这些web项目中cookie能不能共享  
- 默认情况下cookie不能共享  
- setPath(String path)设置cookie的获取范围。默认情况下，设置当前的虚拟目录  
	- 如果要共享，则可以设置path为"/"  
			
不同的tomcat之间共享数据  
	- setDomain(String path) 如果设置一级域名相同，那么多个服务器之间就可以共享cookie  
		- setDomain(".baidu.com")那么tieba.baidu.com和news.baidu.com可以共享cookie  
				
**Cookie特点**  




### Session  
> 服务器端会话技术，将数据保存在服务器端的对象中(HttpSession)  

1. 获取HttpSession对象  
	- HttpSession session = request.getSession();  
2. 使用HttpSession对象  
	- Object getAttribute(String name)  
	- void setAttribute(String name, Object value)  
	- void removeAttribute(String name)  


*当客户端关闭后，服务器不关闭，两次获取session是否为同一个*  
	- 默认情况下不是  
	- 如果需要相同，可以设置Cookie  

```java
Cookie c = new Cookie("JSESSIONID",session.getId());  
c.setMaxAge(60*60);
response.addCookie(c);
```

*客户端不关闭,服务器关闭后，两次获取的session是同一个吗*  

- 不是同一个，但是要确保数据不丢失  
	- session的钝化  
		- 在服务器正常关闭前，将session对象序列化到硬盘上  
	- session的活化  
		- 在服务器启动后，将session文件转化为内存中的session对象即可  

*session失效时间*  
1. 服务器关闭  
2. session对象调用invalidate()  
3. session默认失效时间是30分钟  

**session的特点**  
1. session用于存储一次会话的多次请求的数据，存在服务器端  
2. session没有数据大小的限制  
3. session相对安全  
