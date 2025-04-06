# C++模板语法

C++模板是 C++ 编程中的一种强大工具，它允许程序员编写通用的代码以处理不同类型的数据。通过使用模板，可以避免重复编写类似的代码，提升代码的可维护性、扩展性和重用性。模板是 C++ 中泛型编程的核心部分，能够在编译时提供类型安全的通用解决方案。本文将详细讲解 C++ 模板的基本概念、语法、应用以及一些进阶特性。

### 一、模板的基本概念

C++ 模板分为两类：**函数模板** 和 **类模板**。它们使得函数或类能够处理不同类型的数据，而不需要为每个数据类型写多个版本的代码。

1. **函数模板**：可以根据传入的参数类型自动生成不同类型的函数。
2. **类模板**：用于定义可以处理任意数据类型的类。

#### 1.1 函数模板

函数模板允许我们编写一个通用的函数定义，后续编译器会根据传入的参数类型自动生成函数实例。

**基本语法：**

```cpp
template <typename T>
T add(T a, T b) {
    return a + b;
}
```

上述代码定义了一个名为 `add` 的函数模板，它接收两个同类型的参数，并返回它们的和。`T` 是一个占位符类型，可以在调用时被具体的类型所替代。

**使用函数模板：**

```cpp
int main() {
    int result1 = add(3, 4);  // T 自动推导为 int
    double result2 = add(3.5, 4.5);  // T 自动推导为 double
    std::cout << result1 << ", " << result2 << std::endl;
    return 0;
}
```

输出：

```
7, 8
```

在这个例子中，`T` 会被替换为 `int` 或 `double`，从而生成具体的 `add` 函数。

#### 1.2 类模板

类模板用于定义模板类，允许创建可以处理多种数据类型的类。类模板的定义和函数模板相似。

**基本语法：**

```cpp
template <typename T>
class Box {
private:
    T value;
public:
    Box(T val) : value(val) {}
    T getValue() {
        return value;
    }
};
```

此代码定义了一个名为 `Box` 的类模板，它能够封装任意类型的数据，并提供一个 `getValue` 方法来获取该值。

**使用类模板：**

```cpp
int main() {
    Box<int> intBox(5);   // 类型为 int
    Box<double> doubleBox(3.14);  // 类型为 double
    
    std::cout << intBox.getValue() << ", " << doubleBox.getValue() << std::endl;
    return 0;
}
```

输出：

```
5, 3.14
```

在这个例子中，`Box` 和 `Box` 都是具体化的类模板，分别处理 `int` 和 `double` 类型的数据。

### 二、模板参数

C++ 模板支持多种类型的参数，可以是类型参数、非类型参数以及模板模板参数。

#### 2.1 类型模板参数

最常见的模板参数是类型参数，通常用 `typename` 或 `class` 来指定。

**类型参数示例：**

```cpp
template <typename T>
void print(T t) {
    std::cout << t << std::endl;
}
```

`T` 是一个类型参数，允许 `print` 函数处理任意类型的参数。

#### 2.2 非类型模板参数

除了类型参数外，模板还可以接受非类型参数。非类型参数可以是常量值（如整数、指针等），而不是类型。

**非类型参数示例：**

```cpp
template <typename T, int size>
class Array {
private:
    T arr[size];
public:
    int getSize() {
        return size;
    }
};
```

在这个例子中，`size` 是一个非类型模板参数，它指定了 `Array` 类的数组大小。`size` 必须是一个常量值。

**使用非类型模板参数：**

```cpp
int main() {
    Array<int, 10> arr;  // 数组大小为 10
    std::cout << arr.getSize() << std::endl;
    return 0;
}
```

输出：

```
10
```

#### 2.3 模板模板参数

模板模板参数是模板的参数化版本。它允许传递另一个模板作为参数。例如，我们可以传递一个容器类模板（如 `std::vector`）作为模板参数。

**模板模板参数示例：**

```cpp
template <template <typename> class Container, typename T>
void printContainer(Container<T>& c) {
    for (const auto& item : c) {
        std::cout << item << " ";
    }
    std::cout << std::endl;
}
```

在这个例子中，`Container` 是一个模板模板参数，它接受一个类模板（如 `std::vector` 或 `std::list`），并且 `T` 是容器的元素类型。

**使用模板模板参数：**

```cpp
int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    printContainer(vec);
    return 0;
}
```

输出：

```
1 2 3 4 5
```

### 三、模板特化

模板特化是指为某一特定类型或条件提供特定的实现。C++ 支持**完全特化**和**偏特化**两种特化形式。

#### 3.1 完全特化

完全特化是指为某个特定的模板参数提供完全不同的实现。

**完全特化示例：**

```cpp
template <typename T>
class Box {
public:
    T value;
    Box(T val) : value(val) {}
    void print() {
        std::cout << "Generic Box: " << value << std::endl;
    }
};

// 完全特化：为 int 类型提供不同的实现
template <>
class Box<int> {
public:
    int value;
    Box(int val) : value(val) {}
    void print() {
        std::cout << "Specialized Box for int: " << value << std::endl;
    }
};
```

**使用完全特化：**

```cpp
int main() {
    Box<double> b1(3.14);
    Box<int> b2(42);

    b1.print();  // 调用通用模板
    b2.print();  // 调用特化版本
    return 0;
}
```

输出：

```
Generic Box: 3.14
Specialized Box for int: 42
```

#### 3.2 偏特化

偏特化是为某些类型的模板参数提供特定的实现，但不是所有类型都进行特化。偏特化可以在模板参数列表中使用特定类型进行部分匹配。

**偏特化示例：**

```cpp
template <typename T, typename U>
class Pair {
public:
    T first;
    U second;
    Pair(T f, U s) : first(f), second(s) {}
    void print() {
        std::cout << first << ", " << second << std::endl;
    }
};

// 偏特化：为第一个类型为 int 的 Pair 提供不同实现
template <typename U>
class Pair<int, U> {
public:
    int first;
    U second;
    Pair(int f, U s) : first(f), second(s) {}
    void print() {
        std::cout << "Pair with int first: " << first << ", " << second << std::endl;
    }
};
```

**使用偏特化：**

```cpp
int main() {
    Pair<double, std::string> p1(3.14, "Hello");
    Pair<int, std::string> p2(42, "World");

    p1.print();  // 调用通用模板
    p2.print();  // 调用偏特化版本
    return 0;
}
```

输出：

```
3.14, Hello
Pair with int first: 42, World
```

### 四、SFINAE 和类型萃取

SFINAE（Substitution Failure Is Not An Error）是 C++ 中的一种技巧，允许根据类型特征对模板进行选择性启用。

#### 4.1 SFINAE 示例

```cpp
template <typename T>
typename std::enable_if<std::is_integral<T>::value, T>::type
add(T a, T b) {
    return a + b;
}
```

上述代码使用 `std::enable_if` 和 `std::is_integral` 来限制 `add` 函数只能接受整数类型。如果传递的类型不是整数类型，编译器会自动选择其他合适的重载或模板。

#### 4.2 类型萃取

类型萃取是指从类型信息中提取有用的数据，例如通过 `std::is_integral` 或 `std::is_floating_point` 来判断类型是否为整数或浮点

数。

```cpp
template <typename T>
void printType(T val) {
    if (std::is_integral<T>::value) {
        std::cout << "Integer type: " << val << std::endl;
    } else if (std::is_floating_point<T>::value) {
        std::cout << "Floating point type: " << val << std::endl;
    }
}
```

### 五、总结

C++ 模板是泛型编程的核心，能够帮助程序员编写高效、灵活、可重用的代码。通过理解模板的基本语法、模板参数、特化、SFINAE 和类型萃取等高级特性，程序员可以更好地利用模板机制来解决复杂的编程问题。在实际应用中，模板不仅能够简化代码，还能通过静态类型检查提供更高的安全性。