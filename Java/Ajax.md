## Ajax   
---------------  

### JQuery 实现方式  
	
**$.ajax()**  
	- 语法: `$.ajax(url,[settings])`  
```
$.ajax({
	url:"ajaxServlet", //请求路径
	type: "POST", //请求方式
	data:{"username":"jack","age":15},
	success:function(data){
		alert(data)	
	}, //响应成功后的回调函数
	error: function() {
		
	}, //请求出错后执行的回调函数 
	dataType: "json",//设置响应的数据格式  
})   
```

**$.get()**  
```
$.get(url,[data],[callback],[type])  
```

```
$.get("ajaxServlet",{username:"rose"},function (data) {
	alert(data)
},"text")
```


**$.post()**    
