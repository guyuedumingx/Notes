## JSON  
------------------   

[官方网站](https://www.json.org/json-en.html)  

#### 语法   

**基本规则**  

> 键用引号(单双都行)引起来，也可以不使用引号  

**值**  
1. 数字(整数或浮点数)  
2. 字符串(在双引号中)  
3. 逻辑值(true/false)  
4. 数组(在方括号中)  
	- `{persons:[{},{}]}`
5. 对象(在花括号中)  
	- `{address:{province:"广东"}}`  
6. null  

数据由逗号分隔：多个键值对由逗号分隔  
花括号保存对象: 使用{}定义json格式  
方括号保存数组:[]  

**获取数据**   
1. json对象.键名  
2. json对象["键名"]  
3. 数组对象[索引]  

* JSON解析器  
		- Jsonlib, Gson, fastjson, jackson,  

JSON数据和Java对象的相互转换  

1. 导入jackson相关的jar包  
2. 创建Jackson核心对象ObjectMapper  
3. 调用ObjectMapper的相关方法进行转换  3. 调用ObjectMapper的相关方法进行转换  3. 调用ObjectMapper的相关方法进行转换  

转换方法  
`writeValue(参数1,obj)`  
参数1:  
	- File: 将obj对象转换为JSON字符串并保存到指定文件中  
	- Write：将obj对象转换为JSON字符串并将json数据填充到字符输出流  
	- OutputStream: 将obj对象转换为JSON字符串并将json数据填充到字节输出流  
`writeValueAsString(obj)`: 将对象转换为字符串  

复杂对象的转换  
1. List: 数组    
2. Map: 对象格式一致  


**注解**  
@JsonIgnore  //忽略该属性的转换  
@JsonFormat  //格式化  

```
@JsonFormat(pattern = "yyyy-MM-dd")
private Date birthday;
```

Json 转 Java  
`readValue(json字符串数据,Class)`















