# Java异常

在 Java 中，**异常（Exception）** 是程序运行过程中发生的错误或意外情况。异常机制是 Java 语言中处理错误的关键机制。通过异常处理，程序能够在遇到错误时不中断运行，而是按照程序员的设定执行一些补救措施或记录错误日志等。

### 1. **异常的分类**

Java 中的异常分为两大类：

#### 1.1 **检查型异常（Checked Exception）**

检查型异常是指在编译时必须进行处理的异常。如果代码中可能抛出检查型异常，则必须显式地捕获（`try-catch`）或在方法签名中声明抛出（`throws`）。这类异常通常是由程序外部因素导致的，如网络异常、文件操作异常等。

常见的检查型异常包括：

- `IOException`（输入输出异常）
- `SQLException`（SQL 异常）
- `ClassNotFoundException`（类找不到异常）

#### 1.2 **非检查型异常（Unchecked Exception）**

非检查型异常通常是在运行时发生的异常，编译器不强制要求捕获或声明。这类异常通常表示程序的错误，比如数组越界、空指针等。

常见的非检查型异常包括：

- `NullPointerException`（空指针异常）
- `ArrayIndexOutOfBoundsException`（数组下标越界）
- `ArithmeticException`（算术异常，如除零）

#### 1.3 **错误（Error）**

`Error` 类及其子类表示虚拟机本身的错误，通常是严重的错误，程序不能处理，甚至可能会导致 JVM 崩溃。例如：`OutOfMemoryError`。

### 2. **异常的处理**

Java 中的异常处理使用 `try-catch-finally` 语句进行。`try` 块用于包含可能抛出异常的代码，`catch` 块用于捕获并处理异常，`finally` 块用于清理资源（无论是否有异常发生）。

#### 2.1 **基本结构：`try-catch`**

```java
try {
    // 可能会抛出异常的代码
    int result = 10 / 0; // 抛出 ArithmeticException
} catch (ArithmeticException e) {
    // 捕获并处理异常
    System.out.println("发生除零异常：" + e.getMessage());
} finally {
    // 无论是否有异常发生，都会执行的代码
    System.out.println("清理资源或执行最终操作");
}
```

#### 2.2 **多重 `catch` 块**

可以有多个 `catch` 块来捕获不同类型的异常。Java 会按顺序检查每个 `catch` 块，直到找到一个匹配的异常类型。

```java
try {
    String str = null;
    System.out.println(str.length()); // 抛出 NullPointerException
} catch (NullPointerException e) {
    System.out.println("捕获到空指针异常");
} catch (Exception e) {
    System.out.println("捕获到其他异常");
}
```

#### 2.3 **`finally` 块**

`finally` 块中的代码无论是否有异常抛出都会执行。通常用于关闭文件、释放数据库连接等资源释放操作。

```java
try {
    System.out.println("正在执行...");
    // 可能会抛出异常的代码
} catch (Exception e) {
    System.out.println("捕获异常");
} finally {
    System.out.println("最终执行，通常用于释放资源");
}
```

#### 2.4 **异常的传递（`throws`）**

如果一个方法内部可能抛出异常，并且该方法没有处理该异常，则需要使用 `throws` 关键字声明该异常，这样调用该方法的代码就可以选择处理该异常或继续向上抛。

```java
public class Test {
    public static void main(String[] args) throws Exception {
        method1();
    }

    public static void method1() throws Exception {
        throw new Exception("异常发生");
    }
}
```

### 3. **自定义异常**

Java 允许程序员自定义异常。自定义异常通常需要继承 `Exception` 类或其子类。

```java
class MyException extends Exception {
    public MyException(String message) {
        super(message);
    }
}

public class Test {
    public static void main(String[] args) {
        try {
            throw new MyException("这是自定义的异常");
        } catch (MyException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

### 4. **异常的常用方法**

异常对象本身也包含一些有用的方法，常用的有：

- `getMessage()`：返回异常的描述信息。
- `printStackTrace()`：打印异常的堆栈信息，通常用于调试。
- `toString()`：返回异常类的名称和详细的描述信息。
- `getCause()`：获取导致当前异常的原因。

#### 示例：

```java
try {
    int[] arr = new int[2];
    System.out.println(arr[3]); // 会抛出 ArrayIndexOutOfBoundsException
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("异常信息：" + e.getMessage());
    e.printStackTrace(); // 打印堆栈信息
}
```

### 5. **异常链（Chained Exception）**

异常链允许将一个异常作为另一个异常的原因。这是通过 `Throwable` 类的构造函数来实现的。异常链通常用于将原始异常封装到更高层次的异常中，以便于处理。

```java
public class ChainedExceptionExample {
    public static void main(String[] args) {
        try {
            throw new Exception("原始异常");
        } catch (Exception e) {
            try {
                throw new RuntimeException("封装异常", e); // 封装原始异常
            } catch (RuntimeException re) {
                re.printStackTrace(); // 打印异常链
            }
        }
    }
}
```

### 6. **常见的 Java 异常类**

- **`NullPointerException`**：空指针异常，访问未初始化的对象引用时发生。
- **`ArithmeticException`**：算术异常，通常是除零错误。
- **`ArrayIndexOutOfBoundsException`**：数组下标越界异常。
- **`FileNotFoundException`**：文件未找到异常。
- **`IOException`**：输入输出异常。
- **`ClassNotFoundException`**：类找不到异常。
- **`IllegalArgumentException`**：非法参数异常。

### 7. **最佳实践**

- **尽量避免使用 `Exception` 捕获所有异常**。应尽量捕获具体的异常类型，这样可以更好地定位问题。
- **不应在 `catch` 块中空置代码**。如果捕获到异常，应进行适当的处理或至少记录日志。
- **`finally` 块中避免抛出异常**。如果 `finally` 块抛出异常，它会覆盖 `try` 或 `catch` 中的异常，导致不可预测的行为。

### 总结

Java 的异常机制使得程序可以优雅地处理错误和异常情况，避免程序崩溃。通过 `try-catch` 语句可以捕获并处理异常，`throws` 用于将异常声明抛出，自定义异常可以提供更好的错误处理和诊断能力。异常的合理使用和处理是构建健壮应用程序的关键。