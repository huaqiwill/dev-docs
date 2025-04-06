# EclipseLink



## **EclipseLink 是什么？**

**EclipseLink** 是 **Java 持久化（JPA）** 的开源实现，由 **Eclipse 基金会** 维护，提供 **对象-关系映射（ORM）**、**NoSQL 支持** 和 **Web 服务集成**，用于管理 Java 应用程序中的数据访问。

它是 **Jakarta Persistence（JPA，原 JPA 2.x）** 的官方参考实现，同时支持 **JPA、JDBC、JAXB、JCA、JSON-B、NoSQL**，可用于 **Spring Boot、Java EE、Jakarta EE** 项目。

------

## **EclipseLink 的特点**

✅ **JPA 参考实现**：是 **Jakarta Persistence（JPA）的官方实现**，和 Hibernate 类似。
 ✅ **支持关系型数据库（RDBMS）**：兼容 **MySQL、PostgreSQL、Oracle、SQL Server**。
 ✅ **支持 NoSQL 数据库**：可以与 **MongoDB、Cassandra** 结合使用。
 ✅ **缓存优化**：内置 **L2 Cache（启发式缓存）**，提升数据库访问性能。
 ✅ **多协议支持**：支持 **JPA（ORM）、JAXB（XML 绑定）、JCA（连接器架构）**。
 ✅ **与 Spring Boot 兼容**：可作为 Spring Data JPA 的底层实现。

------

## **EclipseLink vs Hibernate**



| **对比项**             | **EclipseLink**                | **Hibernate**                       |
| ---------------------- | ------------------------------ | ----------------------------------- |
| **JPA 实现**           | 官方参考实现                   | 最流行的 JPA 实现                   |
| **性能**               | **缓存优化，性能较好**         | 高效，但默认缓存较弱                |
| **NoSQL 支持**         | **支持（MongoDB、Cassandra）** | 主要支持关系型数据库                |
| **Spring Boot 兼容性** | 兼容，但需要额外配置           | **更广泛支持，默认 JPA 提供者**     |
| **功能扩展**           | 多协议支持（JAXB、JSON-B）     | **丰富的生态（Search、Validator）** |

🔹 **EclipseLink 更适合 NoSQL 或需要强缓存的应用，而 Hibernate 在 Spring Boot 生态中使用更广泛。**

------

## **EclipseLink 依赖安装**

在 **Spring Boot + JPA** 项目中，可以手动引入 EclipseLink：

```xml
<dependency>
    <groupId>org.eclipse.persistence</groupId>
    <artifactId>org.eclipse.persistence.jpa</artifactId>
    <version>2.7.9</version>  <!-- 选择最新版本 -->
</dependency>
```

⚠️ **Spring Boot 默认使用 Hibernate 作为 JPA 实现**，如果要改为 EclipseLink，需要额外配置。

------

## **Spring Boot + EclipseLink 配置**

在 `application.properties` 中配置 EclipseLink：

```properties
spring.jpa.database-platform=org.eclipse.persistence.platform.database.MySQLPlatform
spring.jpa.properties.javax.persistence.schema-generation.database.action=update
spring.jpa.show-sql=true
spring.jpa.open-in-view=false
spring.jpa.properties.eclipselink.weaving=static
```

**如果使用 `application.yml`，配置如下：**

```yaml
spring:
  jpa:
    database-platform: org.eclipse.persistence.platform.database.MySQLPlatform
    properties:
      javax.persistence.schema-generation.database.action: update
      eclipselink.weaving: static
    show-sql: true
    open-in-view: false
```

------

## **创建 JPA 实体**

**定义一个 `User` 实体类，使用 JPA 进行 ORM 映射：**

```java
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    // Getter 和 Setter
}
```

------

## **创建 Repository**

EclipseLink 兼容 **Spring Data JPA**，所以可以使用 `JpaRepository`：

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
```

------

## **使用 JPA 查询**

在 `UserService` 中调用 `UserRepository` 进行数据库操作：

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser(String name, String email) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
```

------

## **EclipseLink 的缓存**

EclipseLink 默认启用了 **二级缓存（L2 Cache）**，可以显著提高数据库查询性能。

**手动配置缓存策略：**

```properties
spring.jpa.properties.eclipselink.cache.shared.default=true
spring.jpa.properties.eclipselink.cache.size.default=500
```

**禁用缓存（不推荐，可能影响性能）：**

```properties
spring.jpa.properties.eclipselink.cache.shared.default=false
```

------

## **EclipseLink 支持 NoSQL**

EclipseLink 还支持 **MongoDB、Cassandra** 这样的 NoSQL 数据库。

### **1. 添加 NoSQL 依赖**

```xml
<dependency>
    <groupId>org.eclipse.persistence</groupId>
    <artifactId>eclipselink-nosql</artifactId>
    <version>2.7.9</version>
</dependency>
```

### **2. 配置 MongoDB 连接**

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/mydatabase
```

### **3. 使用 @NoSQL 注解**

```java
import org.eclipse.persistence.nosql.annotations.NoSql;
import jakarta.persistence.*;

@Entity
@NoSql(dataType = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(nullable = false)
    private String name;
}
```

这样 **EclipseLink 就可以支持 MongoDB 了！**

------

## **总结**

✔ **EclipseLink 是 JPA 官方实现，性能优化较好，支持缓存和 NoSQL。**
 ✔ **在 Spring Boot 中可以替代 Hibernate，但需要额外配置。**
 ✔ **适用于需要数据库缓存、高性能 NoSQL 访问的项目。**
 ✔ **如果是 Spring Boot 项目，推荐默认使用 Hibernate，除非有特殊需求。**

------

🚀 **一句话总结：EclipseLink = JPA 官方实现 + 高效缓存 + NoSQL 支持，适合 Java 企业级应用！**