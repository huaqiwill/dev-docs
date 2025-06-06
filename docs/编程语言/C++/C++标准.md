# C++标准



## 标准描述

C++ 语言也经历了多个版本的标准化，每个版本都带来了不同的特性、改进和增强。以下是 C++ 主要的标准版本及其特点：

### 1. **C++98 (ISO/IEC 14882:1998)**

**标准化背景**：

- C++98是C++的第一个国际标准，由ISO于1998年发布，基于1990年代初期的C++语言。

**主要特性**：

- **面向对象的编程**：C++98进一步完善了面向对象的特性，包括继承、封装、多态等。
- **模板编程**：C++98对模板提供了支持，允许使用模板来定义通用数据结构和算法。
- **STL（标准模板库）**：C++98标准化了STL（包括`vector`, `map`, `set`, `algorithm`等容器和算法）。
- **异常处理**：C++98引入了异常处理机制，包括`try`, `catch`, `throw`语法。
- **名字空间**：引入了`namespace`以避免命名冲突，促进代码模块化。

**影响**：

- C++98确立了C++语言的核心特性，是C++编程语言的第一步正式标准，确保了语言的统一性和可移植性。

### 2. **C++03 (ISO/IEC 14882:2003)**

**标准化背景**：

- C++03是C++98的一个小修订版本，发布于2003年。它主要是修复了C++98中的一些缺陷和不一致之处，并没有引入大的新特性。

**主要特性**：

- **修复C++98中的问题**：包括模板的某些语法不一致问题、内存管理上的一些问题等。
- **无新特性**：与C++98相比，C++03并没有新增显著的特性或功能。

**影响**：

- C++03的发布目的是为了清理语言中的一些不一致之处，提供更稳定的基础，并为后来的标准化工作打下基础。

### 3. **C++11 (ISO/IEC 14882:2011)**

**标准化背景**：

- C++11是C++语言的一个重要版本，发布于2011年，是C++语言的一次大更新。它引入了许多新的语言特性，显著提高了语言的功能性和现代化水平。

**主要特性**：

- **自动类型推断 (`auto`)**：引入`auto`关键字，允许编译器根据初始化值推断变量类型，简化代码。
- **智能指针**：引入了`std::unique_ptr`和`std::shared_ptr`，提供了更安全的内存管理方式。
- **右值引用和移动语义**：通过右值引用（`&&`）和`std::move`，支持移动语义，避免不必要的复制，提高性能。
- **Lambda 表达式**：C++11引入了Lambda表达式，简化了匿名函数和回调的使用。
- **线程和并发编程**：引入了``, `std::mutex`, `std::atomic`等库支持多线程编程。
- **初始化列表**：通过初始化列表（`{}`）可以统一初始化数组、容器以及类成员。
- **范围基 for 循环**：新增`for`循环语法，简化容器遍历。
- **constexpr**：引入`constexpr`关键字，允许在编译时求值。
- **类型别名 (`using`)**：替代了`typedef`，提供了更简洁的类型别名声明。

**影响**：

- C++11极大地改善了C++语言的可用性和性能，是C++语言的一次现代化飞跃。它引入了现代C++的核心特性，提升了开发效率和程序性能。

### 4. **C++14 (ISO/IEC 14882:2014)**

**标准化背景**：

- C++14是C++11的一个小版本修订，发布于2014年。它在C++11的基础上进行了一些修复和细化，并且增加了一些小的特性。

**主要特性**：

- **Lambda表达式改进**：C++14加强了Lambda表达式的能力，支持默认返回类型和捕获外部变量按值的改进。
- **`std::make_unique`**：引入了`std::make_unique`，简化了`unique_ptr`的创建。
- **constexpr改进**：`constexpr`支持更多的表达式，增强了编译时计算的能力。
- **二进制字面值**：引入了`0b`或`0B`前缀，支持二进制字面值。
- **类型推断改进**：`auto`关键字的使用得到了更多的扩展。

**影响**：

- C++14进一步加强了C++11中的特性，修复了C++11的一些问题，增强了代码的表达能力。

### 5. **C++17 (ISO/IEC 14882:2017)**

**标准化背景**：

- C++17对C++14进行了进一步的优化和补充，加入了一些新特性，并进一步提高了语言的表达力和效率。

**主要特性**：

- **`if constexpr`**：引入了`if constexpr`语句，用于条件编译，优化模板编程。
- **结构化绑定声明**：支持通过`auto [x, y] = some_tuple;`的语法直接解构元组或数组。
- **`std::optional`**：提供了`std::optional`类型，表示值可能为空的对象，简化了空指针的使用。
- **文件系统库**：引入了``库，提供文件系统操作接口。
- **并行算法**：支持对标准库算法进行并行执行，提高了性能。
- **`std::string_view`**：提供了`std::string_view`，避免了字符串操作时的内存复制。
- **`std::any`和`std::variant`**：新增类型`std::any`（存储任意类型的值）和`std::variant`（存储固定类型的值）。

**影响**：

- C++17进一步提升了C++语言的功能，增强了模板编程、并发编程和内存管理方面的能力，同时简化了许多常见操作。

### 6. **C++20 (ISO/IEC 14882:2020)**

**标准化背景**：

- C++20是C++语言的一次重大更新，引入了大量的新特性和改进，是C++历史上最为重要的一次标准化。

**主要特性**：

- **概念（Concepts）**：引入了概念，允许在模板中限制类型的要求，使得模板更易于理解和使用。
- **范围库（Ranges）**：提供了`ranges`库，使得C++的范围操作更简洁，类似于Python等语言中的迭代器模式。
- **协程（Coroutines）**：引入协程，允许编写异步代码，像写同步代码一样简洁。
- **三向比较（Spaceship Operator）**：引入了三向比较（`<=>`），用于简化比较操作符的定义。
- **`std::format`**：提供了`std::format`函数，提供格式化字符串的功能，类似于Python的`f-string`。
- **模块（Modules）**：引入了模块机制，目标是减少头文件的重复处理和加速编译。
- **`constexpr`改进**：`constexpr`支持更多的功能，包括动态分配内存。

**影响**：

- C++20为C++语言带来了现代化的编程范式，尤其在模板编程、并发编程、格式化和协程等方面的改进，使得C++语言更易于编写高效且易读的代码。

### 7. **C++23 (ISO/IEC 14882:2023)**

**标准化背景**：

- C++23是C++20之后的最新标准，仍在持续更新中，预计带来更多的改进和特性。

**主要特性（预计）**：

- **语言和库的进一步优化**：例如改进并发库、扩展C++标准库中的某些功能、进一步增强的类型推导等。
- **改进模板特性**：C++23有望改进模板元编程，减少编译时间并简化模板代码。

**影响**：

- C++23将继续推动C++向更加现代化的方向发展。

