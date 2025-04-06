# Java字符串

在 Java 中，**字符串**（`String`）是一个非常常用的类型，它是字符的序列。字符串在 Java 中是不可变的（immutable），一旦创建，字符串的内容就不能被改变。Java 提供了丰富的字符串操作方法和类，帮助开发者高效地处理和操作字符串数据。

### 1. **字符串的创建**

在 Java 中，字符串可以通过以下两种方式创建：

#### 1.1 **字面量创建字符串**

```java
String str = "Hello, World!";
```

这里，字符串 `"Hello, World!"` 被存储在 Java 的字符串常量池中。每当遇到相同的字符串字面量时，Java 会直接引用常量池中的字符串，而不是重新创建一个新的字符串对象。

#### 1.2 **使用 `new` 关键字创建字符串**

```java
String str = new String("Hello, World!");
```

这种方式会创建一个新的 `String` 对象，并将字符串 `"Hello, World!"` 存储在堆内存中。尽管字符串内容相同，它仍然是一个不同的对象。

### 2. **字符串常用方法**

Java 提供了丰富的字符串方法来进行各种操作。以下是一些常用的字符串方法：

#### 2.1 **获取字符串长度**

```java
String str = "Hello";
int length = str.length();  // 返回字符串的长度 5
```

#### 2.2 **字符串连接**

字符串连接可以使用 `+` 运算符，也可以使用 `concat()` 方法：

```java
String str1 = "Hello";
String str2 = " World!";
String result = str1 + str2;  // 使用 + 运算符连接
// 或者
String result2 = str1.concat(str2);  // 使用 concat 方法连接
```

#### 2.3 **比较字符串**

- **`equals()`**：比较两个字符串的内容是否相同（区分大小写）。
- **`equalsIgnoreCase()`**：比较两个字符串的内容是否相同（忽略大小写）。
- **`compareTo()`**：比较两个字符串的字典顺序。

```java
String str1 = "hello";
String str2 = "Hello";

System.out.println(str1.equals(str2));  // false，比较内容是否相同
System.out.println(str1.equalsIgnoreCase(str2));  // true，忽略大小写比较
System.out.println(str1.compareTo(str2));  // 结果为正，表示 str1 大于 str2
```

#### 2.4 **字符串查找**

- **`indexOf()`**：返回子字符串第一次出现的位置。
- **`lastIndexOf()`**：返回子字符串最后一次出现的位置。
- **`contains()`**：检查字符串是否包含某个子字符串。

```java
String str = "Hello, World!";
int index = str.indexOf("World");  // 返回 7
boolean contains = str.contains("World");  // 返回 true
```

#### 2.5 **截取字符串**

- **`substring()`**：返回从指定位置开始的子字符串。

```java
String str = "Hello, World!";
String subStr = str.substring(7);  // 返回 "World!"
String subStr2 = str.substring(0, 5);  // 返回 "Hello"
```

#### 2.6 **替换字符串**

- **`replace()`**：替换字符串中的字符或子字符串。

```java
String str = "Hello, World!";
String replacedStr = str.replace("World", "Java");  // "Hello, Java!"
```

#### 2.7 **去除空白字符**

- **`trim()`**：去除字符串首尾的空白字符。

```java
String str = "  Hello, World!  ";
String trimmedStr = str.trim();  // 返回 "Hello, World!"
```

#### 2.8 **转换大小写**

- **`toUpperCase()`**：将字符串转换为大写。
- **`toLowerCase()`**：将字符串转换为小写。

```java
String str = "Hello";
String upperStr = str.toUpperCase();  // "HELLO"
String lowerStr = str.toLowerCase();  // "hello"
```

#### 2.9 **字符串拆分**

- **`split()`**：根据指定的分隔符将字符串拆分成数组。

```java
String str = "apple,banana,orange";
String[] fruits = str.split(",");  // 返回数组 ["apple", "banana", "orange"]
```

#### 2.10 **正则表达式匹配**

- **`matches()`**：判断字符串是否匹配给定的正则表达式。

```java
String str = "123abc";
boolean matches = str.matches("\\d+");  // 判断字符串是否只包含数字，返回 false
```

### 3. **StringBuilder 和 StringBuffer**

`String` 是不可变的，这意味着每次修改字符串时，都会创建一个新的字符串对象。为了提高字符串的拼接效率，Java 提供了 `StringBuilder` 和 `StringBuffer` 类，它们可以用于可变字符串。

- **`StringBuilder`**：是一个线程不安全的可变字符串类。
- **`StringBuffer`**：是一个线程安全的可变字符串类。

#### 示例：使用 `StringBuilder` 拼接字符串

```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(", World!");
System.out.println(sb.toString());  // 输出：Hello, World!
```

### 4. **字符串池（String Pool）**

Java 使用字符串常量池来优化内存使用。当你使用字符串字面量创建字符串时，JVM 会首先检查常量池中是否已经存在该字符串。如果存在，JVM 会返回池中的引用；如果不存在，则将该字符串添加到常量池中。

#### 示例：字符串常量池的使用

```java
String str1 = "Hello";
String str2 = "Hello";
System.out.println(str1 == str2);  // 输出 true，指向同一个对象

String str3 = new String("Hello");
System.out.println(str1 == str3);  // 输出 false，str3 是新对象，不在常量池中
```

### 5. **字符串格式化**

Java 提供了 `String.format()` 方法，用于格式化字符串。它类似于 C 语言中的 `printf`。

#### 示例：使用 `String.format()` 格式化字符串

```java
int age = 25;
String name = "John";
String str = String.format("My name is %s, and I am %d years old.", name, age);
System.out.println(str);  // 输出：My name is John, and I am 25 years old.
```

### 6. **国际化与本地化**

Java 提供了强大的支持，用于处理不同地区的字符串表示方式。例如，`Locale` 类可以帮助你根据不同地区的文化习惯来格式化日期、数字和货币等。

```java
import java.util.Locale;
import java.text.NumberFormat;

Locale locale = new Locale("en", "US");
NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(locale);
System.out.println(currencyFormat.format(1234567.89));  // 输出：$1,234,567.89
```

### 7. **总结**

- **不可变性**：`String` 是不可变的，每次修改都会创建一个新的对象。
- **字符串池**：Java 使用字符串池来管理字符串常量，避免重复创建相同内容的字符串。
- **效率**：`StringBuilder` 和 `StringBuffer` 提供了可变字符串处理，更适合进行大量字符串拼接操作。
- **丰富的方法**：Java 提供了许多方法来操作和处理字符串，如查找、截取、替换、转换大小写、正则表达式匹配等。

掌握 Java 中的字符串操作是日常开发中非常重要的技能，它能帮助你更高效地处理字符串数据，提升代码的性能和可维护性。

# Java正则表达式

正则表达式在 Java 中主要用于字符串的匹配、查找、替换和分割操作。Java 提供了 `java.util.regex` 包，其中的核心类包括 `Pattern` 和 `Matcher`。

------

## **核心类**

1. **`Pattern` 类**
   - 表示正则表达式的编译表示。
   - 使用 `Pattern.compile(String regex)` 方法编译正则表达式。
   - 是不可变的，线程安全。
2. **`Matcher` 类**
   - 用于执行匹配操作。
   - 使用 `Pattern.matcher(String input)` 方法创建。
3. **`PatternSyntaxException`**
   - 当正则表达式语法不正确时抛出。

------

## **常见用法**

### 1. **验证字符串格式**

```java
import java.util.regex.Pattern;

public class RegexExample {
    public static void main(String[] args) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        String email = "example@domain.com";
        
        boolean isValid = Pattern.matches(emailRegex, email);
        System.out.println("Is valid email: " + isValid); // 输出: true
    }
}
```

- 方法说明

  ： 

  - `Pattern.matches(regex, input)`：直接验证输入是否匹配正则表达式。

------

### 2. **查找和匹配**

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexExample {
    public static void main(String[] args) {
        String text = "Java is a programming language. Java is also a platform.";
        String regex = "Java";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);

        while (matcher.find()) {
            System.out.println("Found at index: " + matcher.start());
        }
    }
}
```

- 常用方法

  ： 

  - `matcher.find()`：查找下一个匹配项。
  - `matcher.start()`：获取匹配的起始索引。
  - `matcher.end()`：获取匹配的结束索引。
  - `matcher.group()`：获取匹配的内容。

------

### 3. **字符串替换**

```java
import java.util.regex.Pattern;

public class RegexExample {
    public static void main(String[] args) {
        String text = "The color is red.";
        String regex = "red";
        String replacement = "blue";

        String result = text.replaceAll(regex, replacement);
        System.out.println(result); // 输出: The color is blue.
    }
}
```

- 方法说明

  ： 

  - `replaceAll(String regex, String replacement)`：将所有匹配项替换为指定内容。
  - `replaceFirst(String regex, String replacement)`：仅替换第一个匹配项。

------

### 4. **字符串分割**

```java
import java.util.regex.Pattern;

public class RegexExample {
    public static void main(String[] args) {
        String text = "one,two,three";
        String regex = ",";

        String[] parts = text.split(regex);
        for (String part : parts) {
            System.out.println(part);
        }
    }
}
```

- 方法说明

  ： 

  - `split(String regex)`：根据正则表达式分割字符串。

------

## **常用正则表达式示例**

| **用途**           | **正则表达式**                                               | **说明**                     |
| ------------------ | ------------------------------------------------------------ | ---------------------------- |
| 邮箱验证           | `^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$`                          | 验证邮箱格式                 |
| 手机号验证（中国） | `^1[3-9]\\d{9}$`                                             | 验证 11 位手机号             |
| 数字验证           | `^\\d+$`                                                     | 纯数字                       |
| IP 地址验证        | `^(\\d{1,3}\\.){3}\\d{1,3}$`                                 | 验证 IPv4 地址               |
| 日期验证           | `^\\d{4}-\\d{2}-\\d{2}$`                                     | 验证格式如 `2024-01-01`      |
| URL 验证           | `^(http                                      | https)://[A-Za-z0-9.-]+\.[A-Za-z]+.*$` |                              |
| 含字母和数字的密码 | `^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,20}$`                 | 至少 6-20 位，包含字母和数字 |

------

## **完整示例：解析日志文件**

以下代码示例演示如何使用正则表达式从日志文件中提取 IP 地址。

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LogParser {
    public static void main(String[] args) {
        String logs = "192.168.1.1 - - [10/Jan/2025:10:00:00] \"GET /index.html\" 200\n" +
                      "172.16.0.2 - - [10/Jan/2025:10:01:00] \"POST /login\" 403";

        String ipRegex = "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b";

        Pattern pattern = Pattern.compile(ipRegex);
        Matcher matcher = pattern.matcher(logs);

        while (matcher.find()) {
            System.out.println("Found IP: " + matcher.group());
        }
    }
}
```

------

## **注意事项**

1. **正则表达式的转义**
   - 在 Java 中，`\` 是转义字符，需用 `\\` 表示。例如，正则中的 `\d` 在 Java 中需写作 `\\d`。
2. **性能优化**
   - 避免重复编译相同的正则表达式，可以将 `Pattern` 存为静态变量或单例。
3. **Debug 正则表达式**
   - 使用工具（如 [Regex101](https://regex101.com/)）调试正则表达式。

通过灵活运用 Java 的正则表达式功能，可以高效地处理字符串解析、验证和转换任务！