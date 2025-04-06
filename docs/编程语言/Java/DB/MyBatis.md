# MyBatis使用

动态SQL

中间表

插件：pageHelper

db.properties

```
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/xwebdb?useSSL=false&serverTimezone=UTC
jdbc.username=xwebdb
jdbc.password=xwebdb
```

UserMapper.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.neu.mapper.UserMapper">
	<select id="findAll" resultType="user">
		SELECT * FROM user
		<where>
			<if test="userName != null and userName != ''">
				and userName LIKE CONCAT('%',#{userName},'%')
			</if>
		</where>
		
	</select>
</mapper>
```





## 前言

MyBatis3官方文档：https://mybatis.org/mybatis-3/zh/index.html



**MyBatis**

特点：小巧、方便、高效、直接、半自动ORM框架

MyBatis直接基于JDBC封装

在国内更加流行

场景：在业务复杂系统进行使用

**Hibernate**

特点：强大、方便、高效、复杂、绕弯子、全自动

强大：根据ORM映射不能SQL

在国外更流行

场景：在业务相对简单的系统进行使用、随着微服务的流行

## 1、使用MyBatis





## XML配置





## XML映射文件







## 动态SQL





## 日志











## 最后

参考资料：