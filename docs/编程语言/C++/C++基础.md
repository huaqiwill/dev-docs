# 一、C++语言基础

## 1、C++关键字

C++ 11

alignas     alignof     and         and_eq      asm
auto        bitand      bitor       bool        break
case        catch       char        char8_t     char16_t
char32_t    class       compl       concept     const
consteval   constexpr   const_cast  continue    co_await
co_return   co_yield    decltype    default     delete
do          double      dynamic_castelse        enum
explicit    export      extern      false       float
for         friend      goto        if          inline
int         long        mutable     namespace   new
noexcept    not         not_eq      nullptr     operator
or          or_eq       private     protected   public
register    reinterpret_cast    requires    return  short
signed      sizeof      static      static_assert   static_cast
struct      switch      template    this        thread_local
throw       true        try         typedef     typeid
typename    union       unsigned    using       virtual
void        volatile    wchar_t     while       xor
xor_eq

C++ 14

alignas     alignof     and         and_eq      asm
auto        bitand      bitor       bool        break
case        catch       char        char8_t     char16_t
char32_t    class       compl       concept     const
consteval   constexpr   const_cast  continue    co_await
co_return   co_yield    decltype    default     delete
do          double      dynamic_castelse        enum
explicit    export      extern      false       float
for         friend      goto        if          inline
int         long        mutable     namespace   new
noexcept    not         not_eq      nullptr     operator
or          or_eq       private     protected   public
register    reinterpret_cast    requires    return  short
signed      sizeof      static      static_assert   static_cast
struct      switch      template    this        thread_local
throw       true        try         typedef     typeid
typename    union       unsigned    using       virtual
void        volatile    wchar_t     while       xor
xor_eq

## 2、C++运算符


C++ 中包含多种运算符，它们用于执行不同的操作，如算术运算、逻辑运算、赋值、比较等。以下是 C++ 中常见的操作符分类：

### 算术运算符：

- `+` 加法
- `-` 减法
- `*` 乘法
- `/` 除法
- `%` 取模（取余）

### 赋值运算符：

- `=` 赋值
- `+=` 加法赋值
- `-=` 减法赋值
- `*=` 乘法赋值
- `/=` 除法赋值
- `%=` 取模赋值
- `<<=` 左移赋值
- `>>=` 右移赋值
- `&=` 按位与赋值
- `^=` 按位异或赋值
- `|=` 按位或赋值

### 比较运算符：

- `==` 等于
- `!=` 不等于
- `<` 小于
- `>` 大于
- `<=` 小于等于
- `>=` 大于等于

### 逻辑运算符：

- `&&` 逻辑与
- `||` 逻辑或
- `!` 逻辑非

### 位运算符：

- `&` 按位与
- `|` 按位或
- `^` 按位异或
- `~` 按位取反
- `<<` 左移
- `>>` 右移

### 其他运算符：

- `sizeof` 返回对象或类型的大小（字节数）
- `?:` 条件运算符（三元运算符）
- `,` 逗号运算符（用于多个表达式的序列，返回最后一个表达式的值）
- `.` 成员访问运算符
- `->` 成员访问运算符（用于通过指针访问成员）

 此外，C++ 还支持函数调用运算符 `()` 和下标运算符 `[]`，允许调用函数和访问数组元素。 

## 3、C++类型转换操作符

C++ 中有四种主要的类型转换操作符，它们分别是：

1. **static_cast**：
   - 用于执行静态类型转换，可以在合理的范围内转换相关类型，如基本数据类型之间的转换、向上/向下转换（在继承关系中进行转换）、void 指针与其他指针类型之间的转换等。
2. **dynamic_cast**：
   - 主要用于进行安全的动态类型转换，在面向对象程序设计中用于在继承层次结构中转换指针或引用。它会在运行时检查类型信息，因此只能用于具有虚函数的类。
3. **const_cast**：
   - 用于添加或移除变量的 const 属性、volatile 属性，它可以去掉对象的 const 限定或者添加 const 限定，但不会改变对象本身的值。
4. **reinterpret_cast**：
   - 用于执行低级别的类型转换，允许将一个指针类型转换为另一种指针类型，或者将整数类型转换为指针类型，反之亦然。这种转换是非常危险的，因为它可以绕过编译器的类型检查，可能导致未定义行为或程序错误。

这些类型转换操作符提供了不同的功能和安全级别，但应该谨慎使用。正确选择适当的类型转换操作符是编写安全、高效代码的重要一环。



## 4、C++数据类型

- **基本数据类型**：整型、浮点型、字符型、布尔型等。
- **复合数据类型**：数组、结构体、枚举、联合体、指针等。
- **标准库中的数据结构**：`std::vector`、`std::list`、`std::map` 等



## 5、C++流程控制

- **条件语句**：if、else、switch。
- **循环语句**：for、while、do-while。
- **跳转语句**：break、continue、goto。





## 6、C++函数和模块化编程

- **函数**：函数声明、定义、参数传递、递归等。
- **命名空间**：用于组织和管理代码，避免名称冲突。
- **模块化设计**：将程序分解为独立的模块，提高代码的可维护性和复用性。



## 7、C++内存管理

 **动态内存分配**：new 和 delete 操作符。 



## 8、C++操作符

### 引用和地址操作符：

- **取地址操作符 `&`**：返回变量的地址。
- **引用操作符 `*`**：用于声明指针，或者在指针上解引用获取所指对象的值。

### 指针操作符：

- **成员访问操作符 `->`**：用于通过指针访问对象的成员。
- **指针算术操作符**：`+`、`-`、`++`、`--` 等用于对指针进行算术运算，以便在数组或其他数据结构中进行移动或定位。

### 对象创建和销毁操作符：

- **构造函数 `Type()`**：用于创建对象时进行初始化。
- **析构函数 `~Type()`**：用于对象销毁时进行清理。

### Lambda 表达式操作符：

- **Lambda 表达式 `[]`**：用于定义匿名函数对象，可以捕获其所在作用域的变量。

### 其他运算符：

- **条件运算符 `?:`**：三元运算符，根据条件选择不同的值。
- **逗号运算符 `,`**：用于顺序执行表达式，并返回最后一个表达式的值。

### 多线程相关操作符：

- **`std::thread::operator()`**：用于在新线程中执行的函数调用操作符。通过 `std::thread` 创建的线程对象可以使用 `operator()` 来执行线程函数。

### 字符串操作符：

- **字符串连接操作符 `+`**：用于连接字符串。

### 容器相关操作符：

- **迭代器操作符 `->` 和 `\*`**：用于通过迭代器访问容器元素。

### 类型转换相关操作符：

- **用户自定义类型转换操作符**：`operator Type()`，允许用户自定义类型转换，将一个类对象转换为其他类型。










