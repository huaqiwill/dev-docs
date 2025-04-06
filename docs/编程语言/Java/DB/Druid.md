# Druid学习笔记

官网：https://druid.apache.org/

## **Druid 是什么？**

**Druid** 是 **阿里巴巴开源的数据库连接池（JDBC Connection Pool）**，专门用于提升 **Java 数据库访问性能**，同时提供 **SQL 解析、监控、数据安全等功能**。
 Druid 适用于 **MySQL、PostgreSQL、Oracle、SQL Server** 等主流数据库，广泛用于 **Spring Boot 和 MyBatis 项目**。

------

## **Druid 的特点**

✅ **高性能**：比 HikariCP、C3P0 更快，支持高并发数据库连接管理。
 ✅ **SQL 监控**：内置 **Web 监控页面**，可查看 SQL 执行时间、慢查询、并发情况。
 ✅ **防 SQL 注入**：自带 SQL 解析器，可拦截恶意 SQL 语句。
 ✅ **连接池优化**：支持 **PreparedStatement 缓存、批量提交、自动回收无效连接**。
 ✅ **兼容性强**：支持 **Spring Boot、Spring、MyBatis、JPA**，兼容 **JDBC 规范**。

------

## **Druid 依赖安装**

在 **Spring Boot** 项目中，可以直接引入 Druid 依赖：

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.20</version>  <!-- 版本根据官方最新选择 -->
</dependency>
```

------

## **Druid 基本配置**

在 **Spring Boot** 的 `application.yml` 文件中，添加 Druid 配置：

```yaml
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource  # 指定 Druid 连接池
    driver-class-name: com.mysql.cj.jdbc.Driver  # MySQL 驱动
    url: jdbc:mysql://localhost:3306/testdb?serverTimezone=UTC
    username: root
    password: 123456

    # 连接池参数
    initial-size: 5       # 初始连接数
    min-idle: 5           # 最小空闲连接数
    max-active: 20        # 最大连接数
    max-wait: 60000       # 获取连接最大等待时间（毫秒）

    # SQL 监控（开启 SQL 统计）
    filters: stat,wall,slf4j
    stat-view-servlet:
      enabled: true       # 启用 Web 监控
      login-username: admin  # 监控页面用户名
      login-password: admin  # 监控页面密码
      allow: 127.0.0.1     # 允许访问的 IP（多个用逗号分隔）
```

------

## **Druid Web 监控页面**

Druid 提供了一个 **内置 Web 界面**，可以直接查看 **SQL 监控、慢查询、连接池状态**。

### **1. 开启 Druid 监控 Servlet**

在 `application.yml` 里添加：

```yaml
druid:
  stat-view-servlet:
    enabled: true
    url-pattern: /druid/*   # 监控页面 URL
    login-username: admin   # 登录用户名
    login-password: admin   # 登录密码
```

### **2. 访问 Druid 监控页面**

启动 Spring Boot 项目后，在浏览器打开：

```
http://localhost:8080/druid/
```

输入账号 `admin`，密码 `admin`，就能查看 **SQL 监控数据**。

------

## **Druid 结合 MyBatis**

Druid 可以 **和 MyBatis 无缝集成**，优化数据库访问性能。

### **1. 添加 MyBatis 依赖**

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.0</version>
</dependency>
```

### **2. 配置 MyBatis**

在 `application.yml` 里配置：

```yaml
mybatis:
  mapper-locations: classpath:mapper/*.xml  # Mapper XML 路径
  type-aliases-package: com.example.demo.model  # 实体类包路径
```

### **3. 创建 Mapper**

```java
@Mapper
public interface UserMapper {
    @Select("SELECT * FROM users WHERE id = #{id}")
    User getUserById(@Param("id") int id);
}
```

### **4. 调用数据库**

```java
@Autowired
private UserMapper userMapper;

public void test() {
    User user = userMapper.getUserById(1);
    System.out.println(user);
}
```

------

## **Druid 慢查询监控**

Druid 允许监控 **执行时间较长的 SQL 语句**，方便优化数据库性能。

### **1. 开启慢 SQL 监控**

```yaml
spring:
  datasource:
    druid:
      filters: stat
      stat-view-servlet:
        slow-sql-millis: 1000  # SQL 超过 1 秒就记录
        log-slow-sql: true     # 记录慢 SQL 日志
```

### **2. 在 Druid Web 监控页面查看**

访问 `http://localhost:8080/druid/`，在 **SQL 监控** 中，可以看到 **慢 SQL 语句**。

------

## **Druid vs HikariCP vs C3P0**

| **特点**             | **Druid**  | **HikariCP** | **C3P0** |
| -------------------- | ---------- | ------------ | -------- |
| **性能**             | 高         | **最快**     | 较慢     |
| **SQL 监控**         | **支持**   | 不支持       | 不支持   |
| **防 SQL 注入**      | **支持**   | 不支持       | 不支持   |
| **Spring Boot 集成** | **非常好** | **推荐**     | 一般     |
| **稳定性**           | **高**     | **高**       | **一般** |

- **Druid** 适用于 **监控 + 高并发应用**，适合 **大型 Spring Boot 项目**。
- **HikariCP** 是 **目前最快的连接池**，推荐用于 **高性能场景**。
- **C3P0** 旧版较慢，**不推荐新项目使用**。

------

## **总结**

- **Druid 是阿里巴巴开源的高性能数据库连接池**，适用于 **Spring Boot 和 MyBatis**。
- **支持 SQL 监控、防 SQL 注入、慢查询日志**，比传统的 HikariCP、C3P0 更加强大。
- **提供 Web 监控页面**，可以实时查看 **数据库连接池状态**。
- **推荐用于大规模、高并发的 Spring Boot 项目**。

🚀 **一句话总结：Druid = 连接池 + SQL 监控 + 数据安全，Spring Boot 项目必备！**