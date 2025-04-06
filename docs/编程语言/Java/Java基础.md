# Java基础

参考笔记：

*  二哥的Java进阶之路（沉默王二）：https://javabetter.cn/
* Java学习：https://dev.java/learn/
* java官网：https://www.java.com/zh-CN/
* 杨焱老师笔记：http://www.yangeit.cn:21010/

* Java面试指南（鱼皮）：https://javaguide.cn/
* 

Java语法基础、基本命令，面相对象会在另一篇幅中讲述。

Java的CMD命令



## Java环境安装

1. 下载Java
2. 配置环境变量

参考：https://blog.csdn.net/Coin_Collecter/article/details/136825041

编写一个Helloworld示例

**Java HelloWorld**代码

```
public class HelloWorld {
	public static void main(string[] args) {
		System.out.println("Hello World");
	}
}
```

编译成class文件

```
java HelloWorld.java
```

执行class文件

```
java HelloWorld
```

## Java知识点

1. Java的作者（Java之父）： 詹姆斯·高斯林 
2. Java特性

3. Java跨平台原理
4. 

JDK & JRE



## Java语法基础

* 注释和关键字
* 字面量
* 变量和常量
* 运算符
* 判断和循环
* 数组
* 







## Java数据类型

Java 的数据类型分为 **基本数据类型** 和 **引用数据类型**。基本数据类型包括整数、浮点数、字符和布尔类型，具有固定的大小和高效的存储方式；引用数据类型则包括对象、数组和接口，它们存储的是数据的引用。理解和使用这些数据类型对于 Java 编程至关重要。



Java 数据类型是 Java 编程语言中的基本组成部分，用于定义变量的类型和储存的数据种类。Java 的数据类型分为两大类：**基本数据类型（原始类型）\**和\**引用数据类型**。

### 1. **基本数据类型（Primitive Data Types）**

基本数据类型是 Java 中最基本的类型，它们直接保存数据的值。Java 总共有 8 种基本数据类型：

| 数据类型  | 描述                           | 默认值   | 占用内存 | 最小值    | 最大值    |
| --------- | ------------------------------ | -------- | -------- | --------- | --------- |
| `byte`    | 8 位有符号整数                 | 0        | 1 字节   | -128      | 127       |
| `short`   | 16 位有符号整数                | 0        | 2 字节   | -32,768   | 32,767    |
| `int`     | 32 位有符号整数                | 0        | 4 字节   | -2^31     | 2^31 - 1  |
| `long`    | 64 位有符号整数                | 0L       | 8 字节   | -2^63     | 2^63 - 1  |
| `float`   | 32 位浮点数（单精度）          | 0.0f     | 4 字节   | ±1.4E-45  | ±3.4E+38  |
| `double`  | 64 位浮点数（双精度）          | 0.0d     | 8 字节   | ±4.9E-324 | ±1.8E+308 |
| `char`    | 单一字符（16 位 Unicode 字符） | '\u0000' | 2 字节   | N/A       | N/A       |
| `boolean` | 布尔值，表示 `true` 或 `false` | false    | 1 字节   | N/A       | N/A       |

**基本数据类型的特点：**

- 基本数据类型是 **值类型**，即变量直接保存值。
- 占用的内存大小是固定的。
- 数据存储效率高，速度较快。

### 2. **引用数据类型（Reference Data Types）**

引用数据类型表示对象的引用或内存地址，而不是直接存储数据。引用类型的变量存储的是一个指向实际数据的内存地址（引用）。Java 中的引用数据类型包括：

- **类（Class）**
- **接口（Interface）**
- **数组（Array）**

**常见引用类型：**

- **对象**：Java 中的类实例。例如：`String`、`Scanner`、`ArrayList`。
- **数组**：一组相同类型的数据。例如：`int[]`、`String[]`。
- **接口**：声明一组方法的类型，供实现该接口的类去定义。例如：`Runnable`、`Comparable`。

**引用数据类型的特点：**

- 引用数据类型是 **引用类型**，即变量存储的是对象在内存中的地址。
- 引用数据类型的大小与系统有关，通常为 4 字节（32 位系统）或 8 字节（64 位系统）。
- 当引用数据类型赋值时，实际上是将地址（引用）传递给新变量，而不是值本身。

### 3. **自动装箱与拆箱（Autoboxing and Unboxing）**

Java 中的基本数据类型与对应的包装类之间可以自动转换，称为自动装箱（将基本数据类型转换为包装类）和自动拆箱（将包装类转换为基本数据类型）。

| 基本数据类型 | 包装类      |
| ------------ | ----------- |
| `byte`       | `Byte`      |
| `short`      | `Short`     |
| `int`        | `Integer`   |
| `long`       | `Long`      |
| `float`      | `Float`     |
| `double`     | `Double`    |
| `char`       | `Character` |
| `boolean`    | `Boolean`   |

**自动装箱示例**：

```java
int x = 10;
Integer y = x;  // 自动装箱，将 int 转换为 Integer
```

**自动拆箱示例**：

```java
Integer x = 10;
int y = x;  // 自动拆箱，将 Integer 转换为 int
```

### 4. **类型转换（Type Casting）**

Java 中的类型转换分为两种：**隐式类型转换（自动类型转换）\**和\**显式类型转换（强制类型转换）**。

**隐式类型转换**（自动类型转换）：

在数据类型范围内，从小范围到大范围类型可以自动转换。例如，从 `int` 转为 `long`。

```java
int x = 10;
long y = x;  // 自动类型转换，int 转为 long
```

**显式类型转换**（强制类型转换）：

当从大范围类型转换为小范围类型时，需要使用强制转换。强制转换可能导致数据丢失或精度丧失。

```java
long x = 10L;
int y = (int) x;  // 强制类型转换，long 转为 int
```

### 5. **字符串类型**

虽然 `String` 在 Java 中是引用数据类型，但由于其重要性，通常将其单独列出。`String` 类型用于表示字符串，可以通过字符串字面量或 `String` 类实例化。

```java
String str = "Hello, World!";
```

**String 类型的特点：**

- `String` 是不可变类型（immutable），一旦创建就不能改变。
- 常用操作包括拼接、查找、替换等，Java 提供了丰富的 `String` 方法。





## Java关键字

Java 的关键字涉及面广，涵盖了从控制结构到异常处理、类型系统等各个方面。它们在 Java 编程中具有重要的作用，熟悉这些关键字是学习 Java 编程的基础。



Java 关键字是 Java 编程语言中具有特殊含义的保留字，它们有特定的功能和用途，不能用作变量名、方法名、类名等标识符。Java 的关键字分为不同的类别，常见的包括控制结构、数据类型、访问控制、异常处理等。

以下是 Java 中的所有关键字（包括过时的关键字）：

### 1. **访问控制相关**

- `public`：指定类、方法或变量可以被其他类访问。
- `protected`：指定类、方法或变量可以在同一包内或子类中访问。
- `private`：指定类、方法或变量只能在当前类中访问。
- `default`：指定接口中的默认方法（Java 8 引入）。
- `static`：用于声明静态方法或静态变量，意味着该成员属于类而不是类的实例。

### 2. **数据类型相关**

- `int`：整数数据类型，32 位。
- `long`：长整型数据类型，64 位。
- `float`：浮点型数据类型，32 位。
- `double`：双精度浮点型数据类型，64 位。
- `boolean`：布尔数据类型，取值为 `true` 或 `false`。
- `char`：字符数据类型，16 位，用于存储单个字符。
- `byte`：字节数据类型，8 位。
- `short`：短整型数据类型，16 位。
- `void`：表示没有返回值的数据类型。
- `null`：表示空引用。

### 3. **控制流程相关**

- `if`：用于条件判断。
- `else`：与 `if` 配合，表示条件不成立时执行的代码块。
- `switch`：用于多重选择判断。
- `case`：在 `switch` 中使用，指定某个条件。
- `default`：在 `switch` 中使用，表示没有匹配的情况。
- `for`：用于循环。
- `while`：用于循环，先判断条件。
- `do`：用于循环，先执行一次再判断条件。
- `break`：退出循环或 `switch` 语句。
- `continue`：跳过当前循环的剩余部分，进入下一次循环。
- `return`：用于从方法中返回。

### 4. **类、对象和方法相关**

- `class`：用于定义一个类。
- `interface`：用于定义一个接口。
- `extends`：用于表示类的继承关系。
- `implements`：用于表示类实现接口。
- `new`：用于创建对象或数组。
- `this`：引用当前类的实例。
- `super`：引用父类的实例或方法。
- `instanceof`：用于判断对象是否为某个类的实例。
- `abstract`：用于定义抽象类或抽象方法，表示该类不能实例化。
- `final`：用于表示常量、方法不可重写或类不可继承。
- `native`：用于声明一个本地方法，通常与操作系统底层交互。
- `synchronized`：用于声明同步代码块，保证多线程并发访问时的线程安全。
- `volatile`：用于表示一个变量在多线程中是共享的，避免编译器优化。

### 5. **异常处理相关**

- `try`：用于捕获异常的代码块。
- `catch`：用于捕获异常并处理。
- `finally`：在 `try-catch` 之后总会执行的代码块，用于清理资源。
- `throw`：手动抛出异常。
- `throws`：声明方法可能抛出的异常。

### 6. **包和导入相关**

- `package`：声明类所在的包。
- `import`：导入其他类或包。

### 7. **类型和泛型相关**

- `extends`：表示泛型的上限，用于限定泛型类型的范围。
- `super`：表示泛型的下限，用于限定泛型类型的范围。

### 8. **其他关键字**

- `instanceof`：用于判断一个对象是否是某个类的实例。
- `assert`：用于进行断言，检查一个条件是否为 `true`（用于调试阶段）。
- `enum`：用于声明枚举类型（Java 5 引入）。
- `strictfp`：用于限定浮点数的计算遵循严格的规则（Java 1.2 引入）。
- `transient`：用于声明不序列化的成员变量。
- `volatile`：用于声明变量在多线程中的共享性，防止线程缓存。

### 9. **已废弃的关键字**

- `goto`：虽然是 Java 语言的保留字，但并未被使用。Java 不支持 `goto`，它已经被弃用。
- `const`：也是 Java 的保留字，但没有使用，未被实现。





## Java流程控制

Java 流程控制语句包括条件判断、循环控制以及跳转控制等，合理使用这些语句可以使程序的执行逻辑更加灵活和高效。

Java 流程控制是指用来控制程序执行顺序的语句和结构，它可以根据不同的条件和需求来控制程序的执行流程。Java 提供了几种常见的流程控制结构，包括条件判断、循环、跳转控制等。

### 1. **条件控制语句**

条件控制语句用于根据一定的条件判断，决定执行某些特定的代码块。

`if` 语句

`if` 语句根据条件表达式的值来决定是否执行某一段代码。

```java
if (condition) {
    // 如果 condition 为 true 执行的代码
}
```

`if-else` 语句

`if-else` 语句有两个分支，分别对应条件为 `true` 或 `false` 的情况。

```java
if (condition) {
    // 如果 condition 为 true 执行的代码
} else {
    // 如果 condition 为 false 执行的代码
}
```

`if-else if-else` 语句

用于多个条件判断，按顺序判断条件并执行相应的代码块。

```java
if (condition1) {
    // 如果 condition1 为 true 执行的代码
} else if (condition2) {
    // 如果 condition2 为 true 执行的代码
} else {
    // 如果以上条件都不成立执行的代码
}
```

`switch` 语句

`switch` 语句用于多重条件判断，通常用来判断某个变量的值，适用于有多个选项的情况。

```java
switch (expression) {
    case value1:
        // 如果 expression 等于 value1 执行的代码
        break;
    case value2:
        // 如果 expression 等于 value2 执行的代码
        break;
    default:
        // 如果 expression 不等于任何 case 值执行的代码
}
```

### 2. **循环控制语句**

循环语句用于重复执行一段代码，直到满足某个条件。

`for` 循环

`for` 循环用于执行一段固定次数的代码，通常用于已知迭代次数的情况。

```java
for (initialization; condition; increment/decrement) {
    // 循环体代码
}
```

例如：

```java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

`while` 循环

`while` 循环在每次迭代前检查条件，若条件为 `true`，则继续执行循环体。

```java
while (condition) {
    // 循环体代码
}
```

例如：

```java
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;
}
```

`do-while` 循环

`do-while` 循环与 `while` 循环的不同之处在于，它先执行一次循环体，然后再判断条件，确保循环体至少执行一次。

```java
do {
    // 循环体代码
} while (condition);
```

例如：

```java
int i = 0;
do {
    System.out.println(i);
    i++;
} while (i < 10);
```

### 3. **跳转控制语句**

跳转控制语句用于改变程序的执行流程。

`break` 语句

`break` 语句用于退出当前循环或 `switch` 语句，直接跳出循环或条件判断。

```java
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;  // 当 i == 5 时跳出循环
    }
    System.out.println(i);
}
```

`continue` 语句

`continue` 语句用于跳过当前循环的剩余部分，进入下一次循环。

```java
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        continue;  // 跳过当前循环的剩余部分，继续下一次循环
    }
    System.out.println(i);
}
```

`return` 语句

`return` 语句用于结束当前方法的执行并返回一个值（如果方法有返回值）或者直接返回。

```java
public int sum(int a, int b) {
    return a + b;  // 返回方法结果
}
```

`throw` 语句

`throw` 语句用于抛出异常，通常与自定义异常类一起使用。

```java
throw new Exception("This is an exception");
```

`throws` 语句

`throws` 语句用于声明方法可能抛出的异常。

```java
public void method() throws IOException {
    // 可能抛出 IOException 的代码
}
```

### 4. **标签控制语句**

Java 中支持标签的 `break` 和 `continue` 控制语句，通常用于多重循环中跳出特定的循环。

**标签 `break` 语句**

`break` 可以与标签一起使用，用于跳出多重循环。

```java
outerLoop:  // 标签
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (j == 3) {
            break outerLoop;  // 跳出外层循环
        }
        System.out.println(i + " " + j);
    }
}
```

**标签 `continue` 语句**

`continue` 可以与标签一起使用，用于跳过多重循环中的某一层。

```java
outerLoop:
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (j == 3) {
            continue outerLoop;  // 跳过外层循环的当前迭代
        }
        System.out.println(i + " " + j);
    }
}
```



## Java运算符

Java 运算符是用于进行各种操作（如算术、比较、逻辑等）的一组符号。Java 运算符的种类较多，可以分为以下几类：

Java 的运算符种类繁多，每一种运算符都有其特定的功能和使用场景，熟悉这些运算符是编写 Java 代码的基础。



### 1. **算术运算符 (Arithmetic Operators)**

用于对数值类型进行基本的算术运算。

- `+`：加法运算符，返回两个数的和。
- `-`：减法运算符，返回两个数的差。
- `*`：乘法运算符，返回两个数的积。
- `/`：除法运算符，返回两个数的商。
- `%`：取余运算符，返回两个数相除的余数。

### 2. **关系运算符 (Relational Operators)**

用于比较两个值的关系。

- `==`：等于运算符，判断两个值是否相等。
- `!=`：不等于运算符，判断两个值是否不相等。
- `>`：大于运算符，判断左边的值是否大于右边的值。
- `<`：小于运算符，判断左边的值是否小于右边的值。
- `>=`：大于等于运算符，判断左边的值是否大于或等于右边的值。
- `<=`：小于等于运算符，判断左边的值是否小于或等于右边的值。

### 3. **逻辑运算符 (Logical Operators)**

用于对两个或多个布尔值进行逻辑运算。

- `&&`：逻辑与运算符，若两个操作数都为 `true`，结果为 `true`。
- `||`：逻辑或运算符，若两个操作数中至少有一个为 `true`，结果为 `true`。
- `!`：逻辑非运算符，取反操作，若操作数为 `true`，结果为 `false`，反之亦然。

### 4. **位运算符 (Bitwise Operators)**

用于对整数类型的位进行操作。

- `&`：按位与运算符，若两个操作数的相同位都为 `1`，结果为 `1`。
- `|`：按位或运算符，若两个操作数的相同位中至少有一个为 `1`，结果为 `1`。
- `^`：按位异或运算符，若两个操作数的相同位值不同，结果为 `1`，否则为 `0`。
- `~`：按位取反运算符，翻转操作数的所有位（即 `1` 变为 `0`，`0` 变为 `1`）。
- `<<`：左移运算符，将操作数的位向左移动指定的位数。
- `>>`：右移运算符，将操作数的位向右移动指定的位数。
- `>>>`：无符号右移运算符，和 `>>` 类似，但不保留符号位。

### 5. **赋值运算符 (Assignment Operators)**

用于将值赋给变量。

- `=`：赋值运算符，将右侧的值赋给左侧的变量。
- `+=`：加法赋值运算符，将右侧的值加到左侧变量中。
- `-=`：减法赋值运算符，将右侧的值从左侧变量中减去。
- `*=`：乘法赋值运算符，将右侧的值乘到左侧变量中。
- `/=`：除法赋值运算符，将左侧变量除以右侧的值。
- `%=`：取余赋值运算符，将左侧变量取余右侧的值。

### 6. **自增与自减运算符 (Increment and Decrement Operators)**

用于对变量进行增减操作。

- `++`：自增运算符，将变量的值增加 1。可以是前置自增（`++x`）或后置自增（`x++`）。
- `--`：自减运算符，将变量的值减少 1。可以是前置自减（`--x`）或后置自减（`x--`）。

### 7. **三元运算符 (Ternary Operator)**

一种条件运算符，用于根据条件表达式的值选择两个值中的一个。

- `condition ? value_if_true : value_if_false`：若条件为真，返回 `value_if_true`，否则返回 `value_if_false`。

### 8. **类型运算符 (Type Operators)**

用于处理对象类型的相关操作。

- ```
  instanceof
  ```

  ：判断对象是否是某个类的实例，返回布尔值。 

  ```java
  if (obj instanceof String) {
      // 判断 obj 是否为 String 类型
  }
  ```

### 9. **对象创建与访问运算符 (New, .)**

用于创建对象并访问其成员。

- `new`：创建一个新对象。

- ```
  .
  ```

  ：用于访问对象的字段和方法。 

  ```java
  Object obj = new Object();
  obj.toString(); // 使用 . 访问对象的方法
  ```

### 10. **括号运算符 (Parenthesis Operator)**

用于改变运算优先级或传递方法参数。

- ```
  ()
  ```

  ：用于表达式中的优先级控制，或用于方法调用时传递参数。 

  ```java
  int result = (a + b) * c;
  ```



## Java表达式







# Java扩展知识













### static & final





### lamabda表达式



















































