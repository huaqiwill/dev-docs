# Java反射

Java反射（Reflection）是 Java 提供的一种强大功能，它允许程序在运行时动态地获取类的信息、访问类的成员（如字段、方法和构造方法），并可以在运行时操作它们。通过反射，Java 可以动态地加载类、调用方法、访问和修改字段值，而不需要在编译时知道具体的类和方法。

### 1. **反射的核心类**

Java反射主要依赖以下几个核心类：

- **`Class` 类**：用来表示一个类或接口。
- **`Field` 类**：用来表示类的成员变量（字段）。
- **`Method` 类**：用来表示类的成员方法。
- **`Constructor` 类**：用来表示类的构造方法。
- **`Modifier` 类**：用来获取类、字段、方法和构造方法的修饰符（例如 `public`、`private` 等）。

### 2. **获取 Class 对象**

在 Java 中，任何类都是 `Class` 类的实例。你可以通过多种方式获取某个类的 `Class` 对象。

#### 通过 `Class.forName()` 获取：

```java
Class<?> clazz = Class.forName("java.lang.String");
```

#### 通过 `getClass()` 方法获取：

```java
String str = "Hello";
Class<?> clazz = str.getClass();
```

#### 通过类字面常量获取：

```java
Class<?> clazz = String.class;
```

### 3. **使用反射访问类的信息**

通过反射，我们可以获得类的各种信息，例如类的名称、字段、方法和构造方法等。

#### 获取类名：

```java
Class<?> clazz = Class.forName("java.lang.String");
System.out.println(clazz.getName()); // 输出：java.lang.String
```

#### 获取类的字段（属性）：

```java
Class<?> clazz = Class.forName("java.lang.String");
Field[] fields = clazz.getDeclaredFields();  // 获取所有字段
for (Field field : fields) {
    System.out.println(field.getName()); // 输出字段名称
}
```

#### 获取类的构造方法：

```java
Class<?> clazz = Class.forName("java.lang.String");
Constructor<?>[] constructors = clazz.getDeclaredConstructors();  // 获取所有构造方法
for (Constructor<?> constructor : constructors) {
    System.out.println(constructor.getName()); // 输出构造方法的名称
}
```

#### 获取类的方法：

```java
Class<?> clazz = Class.forName("java.lang.String");
Method[] methods = clazz.getDeclaredMethods();  // 获取所有方法
for (Method method : methods) {
    System.out.println(method.getName()); // 输出方法名称
}
```

### 4. **使用反射实例化对象**

反射可以用来创建对象，甚至在你不知道具体类名的情况下，也能动态地创建对象。

#### 通过无参构造函数实例化：

```java
Class<?> clazz = Class.forName("java.lang.String");
Constructor<?> constructor = clazz.getConstructor(String.class);  // 获取带 String 参数的构造函数
String str = (String) constructor.newInstance("Hello");
System.out.println(str);  // 输出：Hello
```

#### 通过有参构造函数实例化：

```java
Class<?> clazz = Class.forName("java.util.ArrayList");
Constructor<?> constructor = clazz.getConstructor();  // 获取无参构造函数
List<String> list = (List<String>) constructor.newInstance();
```

### 5. **通过反射调用方法**

通过反射，你可以在运行时调用类的方法。

#### 获取方法并调用：

```java
Class<?> clazz = Class.forName("java.lang.String");
Method method = clazz.getMethod("substring", int.class, int.class); // 获取 substring 方法
String str = "Hello, World!";
Object result = method.invoke(str, 7, 12);  // 调用 substring 方法
System.out.println(result);  // 输出：World
```

#### 调用私有方法：

```java
Class<?> clazz = Class.forName("java.lang.String");
Method method = clazz.getDeclaredMethod("indexOf", char.class);  // 获取 indexOf 方法
method.setAccessible(true);  // 设置方法可访问（即使是私有方法）
Object result = method.invoke("Hello", 'e');
System.out.println(result);  // 输出：1
```

### 6. **使用反射访问和修改字段**

反射不仅可以访问对象的字段，还可以修改它们。

#### 访问字段值：

```java
Class<?> clazz = Class.forName("java.lang.String");
Field field = clazz.getDeclaredField("value");  // 获取私有字段 value
field.setAccessible(true);  // 设置字段可访问
char[] value = (char[]) field.get("Hello");
System.out.println(value);  // 输出：[C@15db9742
```

#### 修改字段值：

```java
class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }
}

Person person = new Person("John");
Class<?> clazz = person.getClass();
Field field = clazz.getDeclaredField("name");
field.setAccessible(true);  // 设置字段可访问
field.set(person, "Jane");  // 修改字段值
System.out.println(person.name);  // 输出：Jane
```

### 7. **反射的性能问题**

反射机制虽然非常强大，但它也存在一些性能开销。由于反射需要在运行时进行类加载、方法解析等操作，因此它比直接调用方法要慢。在高性能要求的场景下，过度使用反射可能会导致性能下降。

### 8. **反射常见应用**

- **框架设计**：许多 Java 框架（如 Spring、Hibernate、MyBatis）都大量使用了反射，来动态地获取类的信息、创建对象、调用方法等。
- **JavaBean 操作**：通过反射，可以动态地获取和设置对象的属性。
- **动态代理**：反射与代理模式结合，可以实现方法拦截，常用于 AOP（面向切面编程）。

### 9. **反射的限制**

- **类型安全**：反射由于依赖运行时类型，因此无法享受编译时的类型检查，容易导致类型错误。
- **性能问题**：反射的性能开销较大，不适合在性能敏感的代码中频繁使用。
- **安全问题**：使用反射可以访问私有方法和字段，可能会导致安全问题，因此在使用时要小心。

------

### 总结

Java反射提供了非常强大的动态功能，使得程序在运行时能够动态加载类、调用方法、访问字段等。这为许多框架和工具的开发提供了灵活性，但同时也带来了性能上的开销和安全风险。在使用反射时，应该根据具体的应用场景权衡其利弊。



# Java注解和反射

## 前言





## 1、注解 Annotation

java.annotation

### 注解预览

Deprecated

SuppressWarnings

反射：对注解的数据进行访问

### Java元注解

java.lang.annotation

Target描述注解使用的范围

Retention表示需要在什么级别保存该注释信息，用于描述注解的生命周期（SOURCE < CLASS < RUNTIME）

Document说明该注释被包含在javadoc中

Inherited说明子类可以继承父类中的该注解

### Java自定义注解

定义一个注解

```java
@Target(value = {ElementType.METHOD,ElementType.TYPE})
@interface MyAnnotation{
 	String name() default "";   
}
```



## 2、反射 Reflection

java.reflection

静态语言 => 动态语言

### Java反射机制概述

理解Class类并获取Class实例

类的加载与ClassLoader

创建运行时类的对象

获取运行时类的对象

获取运行时类的完整结构

调用运行时类的制定结构

**动态语言**

Object-C、C#、JavaScript、PHP、Python

**静态语言**

Java、C、C++

```
Class c = Class.forName("java.lang.String")

newInstance()
getName()
getSuperClass()
getInterface()
// .getClass
// Class.forName
// .class
//
```





### 面向切面编程AOP

hashCode()

除了特殊情况，不要使用反射

```

```

## 最后