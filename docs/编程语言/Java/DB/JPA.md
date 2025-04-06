# JPA



## **JPA（Java Persistence API）是什么？**

**JPA（Java Persistence API）** 是 **Java 官方提供的 ORM（对象关系映射）标准**，用于 **在 Java 应用中操作数据库**。它定义了一套 **统一的接口**，让开发者可以用 **面向对象的方式** 进行数据库操作，而不需要写大量 SQL 代码。

JPA 本身**只是一个规范**，并没有具体实现，常见的 JPA 实现有：

- **Hibernate**（最流行，Spring Boot 默认支持）
- **EclipseLink**（JPA 官方实现）
- **OpenJPA**（Apache 维护）

------

## **JPA 的核心概念**

| **概念**               | **作用**                                   |
| ---------------------- | ------------------------------------------ |
| **Entity**             | **实体类**，对应数据库表                   |
| **EntityManager**      | **实体管理器**，负责增删改查               |
| **PersistenceContext** | **持久化上下文**，管理实体生命周期         |
| **Repository**         | **Spring Data JPA 提供的数据库操作接口**   |
| **JPQL**               | **JPA 查询语言**，类似 SQL，但支持对象查询 |
| **Criteria API**       | **动态查询 API**，可以构建复杂查询         |
| **Transaction**        | **事务管理**，保证数据一致性               |

------

## **JPA 和 Hibernate 的关系**

| **对比项** | **JPA** | **Hibernate** | |---|---| | **类型** | 规范（API 标准） | JPA 的具体实现 | | **开发者** | **Oracle / Jakarta EE** | **Red Hat**（Spring 默认实现） | | **功能** | 仅提供接口 | **扩展功能更多（如缓存、批量操作）** | | **适用场景** | 适用于任何 JPA 实现 | **Spring Boot 默认，生态更完善** |

🚀 **总结**：JPA 是 **标准**，Hibernate 是 **实现**，Spring Boot 默认用 Hibernate 来实现 JPA。

------

## **JPA 在 Spring Boot 中的使用**

### **1. 添加 JPA 依赖**

在 Spring Boot **`pom.xml`** 添加 JPA 依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

------

### **2. 配置数据库**

在 `application.properties`（或 `application.yml`）中配置数据库：

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA 配置
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update  # 自动更新表结构
spring.jpa.show-sql=true  # 控制台打印 SQL 语句
```

------

### **3. 创建实体类（Entity）**

使用 **`@Entity`** 将 Java 类映射到数据库表：

```java
import jakarta.persistence.*;

@Entity  // 标识为数据库实体类
@Table(name = "users")  // 指定表名
public class User {
    
    @Id  // 指定主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 自增策略
    private Long id;

    @Column(nullable = false, length = 100)  // 字段属性
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    // Getter 和 Setter
}
```

------

### **4. 创建 Repository**

JPA 允许使用 **`JpaRepository`** 直接操作数据库：

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);  // 自定义查询
}
```

💡 只要继承 `JpaRepository`，就自动具备了 **增删改查** 方法！

------

### **5. 编写 Service**

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

### **6. 编写 Controller**

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public String addUser(@RequestParam String name, @RequestParam String email) {
        userService.saveUser(name, email);
        return "User added successfully!";
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
```

💡 **通过 `POST /users` 添加用户，`GET /users` 查询所有用户！**

------

## **JPA 查询方式**

### **1. 使用 `@Query` 自定义 SQL**

```java
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT u FROM User u WHERE u.email = :email")  // JPQL 语法
    User getUserByEmail(@Param("email") String email);
}
```

------

### **2. 使用 JPQL**

**JPQL（Java Persistence Query Language）** 允许使用面向对象的方式查询数据库：

```java
@Query("SELECT u FROM User u WHERE u.name LIKE %:name%")
List<User> searchByName(@Param("name") String name);
```

------

### **3. 使用 Criteria API（动态查询）**

```java
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

public static Specification<User> hasName(String name) {
    return (root, query, criteriaBuilder) -> {
        return criteriaBuilder.like(root.get("name"), "%" + name + "%");
    };
}
```

------

## **JPA 事务管理**

默认情况下，Spring Boot 的 **JPA 方法都是事务性的**，但你可以手动控制事务：

```java
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional  // 事务注解，确保数据库操作的原子性
    public void updateUserEmail(Long id, String newEmail) {
        User user = userRepository.findById(id).orElseThrow();
        user.setEmail(newEmail);
        userRepository.save(user);
    }
}
```

🔹 **如果事务失败，数据将自动回滚！**

------

## **JPA 的优点**

✅ **面向对象操作数据库**，避免手写 SQL。
 ✅ **支持自动建表**，只需定义 `@Entity`，JPA 就能自动创建表。
 ✅ **内置事务管理**，保证数据一致性。
 ✅ **兼容 Hibernate、EclipseLink、OpenJPA 等不同实现**。
 ✅ **支持 JPQL 和 Criteria API**，提供强大的查询能力。

------

## **总结**

🚀 **JPA 是 Java 官方的 ORM 规范，Hibernate 是它最流行的实现。**
 🚀 **在 Spring Boot 中，`JpaRepository` 可以轻松实现数据库操作。**
 🚀 **JPA 提供了强大的查询能力（JPQL、Criteria API、事务管理）。**

------

**一句话总结：JPA 让 Java 操作数据库更简单、更高效、更优雅！** 💡