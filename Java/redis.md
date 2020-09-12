## redis  
-----------   

[官方网址](http://www.redis.cn/commands.html#)  

#### redis的数据结构  
1. 字符串类型 string  
2. 哈希类型 hash : map格式  
3. 列表类型 list : linkedlist格式   
4. 集合类型 set  
5. 有序集合类型 sortedset ：不重复，排序   

**字符串类型**    

*Set*  
```
redis> SET mykey "Hello"
OK
redis> GET mykey
"Hello"
redis> 
```

*Get*  
```
redis> GET nonexisting
(nil)
redis> SET mykey "Hello"
OK
redis> GET mykey
"Hello"
redis> 
```

*del*  
```
redis> SET key1 "Hello"
OK
redis> SET key2 "World"
OK
redis> DEL key1 key2 key3
(integer) 2
redis> 
```

**hash**  

*hset*  
```
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "Google"
(integer) 1
redis> HSET myhash field3 "Dog"
(integer) 1
```

*hget*  
```
//获取指定的键的值
redis> HGET myhash field1
"Hello"

//获取所有的键和值  
redis> hgetall myhash
```

*hdel*  
```
hdel key field  

redis> hdel myhash field1
```

**列表类型**  

> Redis列表是简单的字符串列表，按照插入顺序排序。  
> 你可以添加一个元素到列表的头部或者尾部  

添加：  
	1. lpush key value: 将元素加入列表左边  
	2. rpush key value: 将元素加入列表右边  

获取:  
	1. lrange key start end: 范围获取  
	
删除：  
	1. lpop key: 删除列表最左边的元素并将元素返回  
	2. rpop key：删除列表最右边的元素并将元素返回 


获取所有元素  
```
lrange mylist 0 -1
```

**set集合类型**   

> 无序不重复  

存储： sadd key value  
获取： smembers key: 获取set集合中的所有元素  
删除:  srem key value: 删除set集合中的某个元素  


**sortedset有序集合**  

> 不重复有序  

存储： zadd key value  
获取： zrange key start end  
删除:  zrem key value  

*查询所有的键*  
```
keys *
```

*获取类型*  
```
type key
```

*删除指定的键*  
```
del key
```

**持久化**     

RDB: 默认方式  
	- 在一定的间隔时间中检测key的变化情况，然后持久化数据  
AOF: 日志记录的方式  
	- 记录每一条命令的操作，可以每一次命令操作后，持久化数据  


编辑/etc/redis.conf文件  

```
# 15分钟后只要有一个key发生变化就持久化一次  
save 900
# 5分钟后只要有10个key发生变化就持久化一次  
save 300 10
# 60秒之后只要有10000个key发生变化就持久化一次  
save 60 10000
```

重新启动redis服务器  
```
redis-server /etc/redis.conf
```

使用AOF  

编辑/etc/redis.conf文件  
```
appendonly no  --> appendonly yes 

appendfsync always //每次操作进行持久化  
appendfsync everysec  //每隔一秒持久化  
appendfsync no  //不进行持久化  
```

#### Java redis   

Jedis  

```java
public void test() {
	//localhost本地服务器，port: 6379 
	Jedis jedis = new Jedis("localhost",6379);
	//设置键值对
	jedis.set("username","zhangsan");
	//关闭jedis
	jedis.close();
}
```

```java
	//如果使用空参构造，默认值"localhost", 6379
	Jedis jedis = new Jedis(); 
```

获取  
```java
String username = jedis.get("username");
```

setex()指定过期时间的key value  
```
//将activecode: hehe 键值对存入redis，并20秒后自动删除该键值对  
jedis.setex("activecode",20,"hehe") 
```

### JedisPool 连接池  

> jedis 自带   

```
public void test7() {
	//创建Jedis连接池对象 
	JedisPool jedisPool = new JedisPool();

	//获取连接  
	Jedis jedis = jedisPool.getResource();

	//使用  
	jedis.set("hehe","haha");

	//关闭 归还到连接池中 
	jedis.close();
}
```

*配置*    

```
//创建一个配置对象  
JedisPoolConfig config = new JedisPoolConfig();
config.setMaxTotal(50);
//最大活动数
config.setMaxIdle(10);

//创建连接池对象
JedisPool jedisPool = new JedisPool(config,"localhost",6379);
```





