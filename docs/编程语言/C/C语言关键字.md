# 部分关键字描述

参考：https://blog.csdn.net/ipmux/article/details/17316671



- `volatile`用于防止编译器对某些特定变量进行错误优化，确保这些变量在不同的情况下始终保持一致性。
- `typedef`不仅能提高代码的可读性，还能方便跨平台移植，减少重复代码。



## 1. 内联函数（`inline` 函数）

内联函数的作用是建议编译器将函数体直接插入到调用函数的地方，从而避免函数调用的开销。

**示例代码：**

```c
#include <stdio.h>

// 内联函数示例
inline int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(3, 4); // 内联函数调用
    printf("The result is: %d\n", result);
    return 0;
}
```

**解释：**

- 这里 `add` 是一个内联函数。编译器会将 `add(3, 4)` 展开成 `3 + 4`，从而避免了函数调用的开销。
- 如果编译器没有将其内联，也不会影响程序的正确性。不同的编译器可能会根据实际情况决定是否展开该函数。

## 2. 内嵌汇编（内联汇编）

内嵌汇编允许将汇编语言代码嵌入到 C 代码中，这对于需要直接控制硬件或进行底层优化时非常有用。

**示例代码：**

```c
#include <stdio.h>

int main() {
    int result;
    int a = 5, b = 10;
    
    // 使用 GCC 内联汇编计算 a 和 b 的和
    __asm__("addl %%ebx, %%eax;" // 汇编指令：a + b
            : "=a"(result)       // 输出部分，将结果存入 result
            : "a"(a), "b"(b));    // 输入部分，传递 a 和 b

    printf("The result is: %d\n", result);
    return 0;
}
```

**解释：**

- `__asm__` 关键字用于嵌入汇编代码。
- 在这个示例中，`addl %%ebx, %%eax;` 是将 `eax` 和 `ebx` 寄存器中的值相加，这里使用了 `a` 和 `b` 来对应传入的参数。
- 输出部分将汇编计算结果存储到 `result` 变量。

## 3. `const` 关键字使用

`const` 用于声明常量或只读变量。它限制了变量的修改，增加代码的可读性和安全性。

**示例代码：**

```c
#include <stdio.h>

int main() {
    const int a = 10;  // 声明一个常量

    // 试图修改常量，会报错
    // a = 20;  // 编译时会报错，因 a 是常量

    printf("The value of a is: %d\n", a);
    return 0;
}
```

**解释：**

- `a` 被声明为常量，不能修改它的值。如果尝试修改，编译器会给出错误提示。
- `const` 使代码更加安全，因为它避免了对不该修改的数据进行操作。

## 4. `sizeof` 运算符

`sizeof` 用于返回数据类型或变量所占的内存字节数。在不同平台上，`sizeof` 可以确保代码具有良好的可移植性。

**示例代码：**

```c
#include <stdio.h>

int main() {
    int a = 10;
    double b = 20.5;
    
    printf("Size of int: %zu bytes\n", sizeof(a));   // 输出int类型的大小
    printf("Size of double: %zu bytes\n", sizeof(b));  // 输出double类型的大小
    printf("Size of int pointer: %zu bytes\n", sizeof(int*));  // 输出指针大小

    return 0;
}
```

**解释：**

- `sizeof(a)` 返回 `a` 变量的大小（在 32 位系统中通常是 4 字节）。
- `sizeof(int*)` 返回指针的大小（通常为 4 字节，在 64 位系统中为 8 字节）。
- 使用 `sizeof` 可以避免在不同平台上手动计算数据类型大小的问题，确保程序具有良好的可移植性。

------

这些代码示例帮助你理解了内联函数、内嵌汇编、`const` 关键字和 `sizeof` 运算符的基本用法。如果你还有其他问题或需要进一步的示例，可以随时告诉我！



这篇文章深入探讨了C语言中的`volatile`和`typedef`关键字，它们在嵌入式开发、跨平台移植、提高代码可读性等方面的作用。以下是对文章中一些关键点的概述以及示例代码。

## 5. `volatile`关键字

`volatile`关键字用于指示编译器在优化过程中不要对变量进行优化，尤其是在多任务、硬件寄存器操作或中断场景下，避免编译器错误地优化导致的错误。

**作用**

1. 阻止编译器优化

   ： 

   - **数据流分析优化**：编译器根据变量的赋值和使用分析，可能忽略一些无效的操作。例如，如果一个变量没有被显式修改，编译器可能会将其值缓存到寄存器中。
   - **寄存器缓存优化**：编译器可能会将频繁访问的变量存储在寄存器中，而不是每次从内存读取。`volatile`阻止这种优化，确保每次访问变量都直接从内存中读取。

**示例**

1. **MMIO操作**：

   ```c
   volatile int *p = get_io_addr();
   int a, b;
   
   a = *p;  // 从MMIO读取
   // 其他代码中没有修改p
   b = *p;  // 再次读取MMIO
   ```

   如果没有`volatile`，编译器可能认为`*p`的值在`a = *p`和`b = *p`之间不变，从而错误地使用缓存的值。

2. **中断服务程序**：

   ```c
   volatile int i = 0;
   
   void main(void) {
       while (1) {
           if (i) do_xxx();
       }
   }
   
   void ISR_XX(void) {
       i = 1;  // 中断修改i
   }
   ```

   在没有`volatile`的情况下，编译器可能会优化掉对`i`的检查，导致`do_xxx()`无法在中断发生时被调用。

## 6. `typedef`关键字

`typedef`用于为现有类型创建别名，使代码更易读、便于跨平台移植等。

**`typedef`与`#define`的区别**

- `typedef`用于定义类型的别名，而`#define`进行宏替换。
- `typedef`在编译时处理，而`#define`在预处理阶段进行字符替换。

**示例**

1. **定义类型别名**：

   ```c
   typedef int bool;
   typedef int size;
   
   bool flag;
   size length;
   ```

2. **简化复杂类型**：

   ```c
   typedef char Array10[10];
   Array10 line, text;  // 简化了数组的定义
   ```

3. **函数指针别名**：

   ```c
   typedef int (*pFun)(const char *, const char *);
   
   pFun Register(pFun pf);
   ```

   通过`typedef`，函数指针的定义变得更加简洁和易于理解。

## 7.  `static` 关键字

在 C 语言中，`static` 是一个常见的修饰符，通常用于函数、局部变量和全局变量。它的作用比较特殊，并且随着修饰对象的不同，它的效果也有所不同。`static` 在编程中被用来解决两个常见的问题：局部变量生命周期的延长，以及全局命名空间的管理。可以总结为“有限生命变无限，无限空间变有限”。



`static` 是解决 C 语言中两大常见问题的有力工具：

- **局部变量生命周期过短**：`static` 延长了局部变量的生命周期，使其能在函数多次调用间保存状态。
- **命名污染问题**：`static` 限制了全局变量和函数的作用范围，避免了命名冲突。

因此，对于不需要在其他源文件中使用的全局变量和函数，应该使用 `static` 进行修饰。这不仅能提高程序的安全性和可维护性，还能有效避免命名冲突。

`static` 在 C 语言中的作用不可小觑，它的正确使用能使程序更简洁、高效，并且降低潜在的错误发生率。



**`static` 的三类作用对象**

1. **局部变量**
2. **全局变量**
3. **函数**

### 1. `static` 的作用：局部变量的生命周期延长

通常，C语言中的局部变量存储在栈上，其生命周期从函数调用时开始，到函数退出时结束。每次函数调用时，局部变量都会被重新创建，生命周期较短。但如果局部变量被 `static` 修饰，它的生命周期会被延长至整个程序的运行周期。

例如，在以下代码中：

```c
void testfun() {
    static int fun_cnt = 0;
    if (fun_cnt == 0) {
        // 执行一次初始化操作
    }
    fun_cnt++;
}
```

在函数第一次调用时，`fun_cnt` 为 0，之后每次调用时，`fun_cnt` 会递增。这是因为 `fun_cnt` 被 `static` 修饰，意味着它不会在函数退出时被销毁，而是保持其值，直到程序结束。

### 2. `static` 的作用：限制全局命名空间

在 C 语言中，全局变量和函数默认是全局可见的。这可能会导致命名冲突，尤其是在较大的项目中。使用 `static` 可以将全局变量或函数的作用域限制为当前源文件，从而避免命名污染。

当全局变量或函数被 `static` 修饰时，它们只能在当前源文件中访问，其他源文件无法直接引用它们。通过这种方式，可以有效防止不同文件之间的符号冲突。

```c
static int global_variable = 10; // 只能在当前源文件中访问
```

### 3. `static` 修饰函数

`static` 不仅能修饰变量，还可以修饰函数。当一个函数被 `static` 修饰后，它只能在定义它的源文件中被调用，其他文件无法访问该函数。

这种做法可以减少函数冲突，同时也有助于编译器优化。编译器可能会将短小的 `static` 函数内联展开，从而消除函数调用的开销，提升程序的运行效率。



# 部分关键字描述（二）

## 内联与内嵌

在C语言中，内联函数和内嵌汇编是两个常常被误混淆的概念。很多人在求职时会被问到有关内联和内嵌的区别，而网上的中文表述也经常出现混乱。下面就让我们来理清这两个概念。

- **内联函数（inline）** 是C语言的关键字，用于提示编译器展开函数代码，通常用于小型、频繁调用的函数，以减少函数调用的开销。
- **内嵌汇编** 是将汇编语言代码直接嵌入C代码中的技术，用于实现一些C语言无法表达的低级操作。

内联函数是编译器支持的标准特性，而内嵌汇编则依赖于具体编译器的支持和语法规范。

### 内联函数（inline）

内联函数（inline function）是C语言中的一种优化手段，它的作用是“建议”编译器将函数代码直接插入到调用函数的地方，从而避免了函数调用时的栈操作开销。内联函数的关键字是 `inline`。

例如：

```c
inline int add(int a, int b) {
    return a + b;
}
```

内联函数的使用适合小型的、频繁调用的函数，因为它可以节省函数调用的开销，但会增加代码量。需要注意的是，内联只是建议，编译器可能会根据具体情况选择是否展开该函数。如果函数体较大或复杂，内联可能会导致代码膨胀，甚至影响缓存命中率，反而会降低性能。

除了 `inline`，还有 `static` 关键字也会影响内联的行为。使用 `static inline` 可以限制函数的作用域在当前文件内。对于多个文件间调用的内联函数，通常会使用 `inline`，而单文件内的函数则可以使用 `static inline`。

### 内嵌汇编（内联汇编）

内嵌汇编（Inline Assembly）允许在C语言代码中直接嵌入汇编指令，这在某些底层编程中非常有用，尤其是涉及到性能优化、系统移植、硬件控制等特殊场合。内嵌汇编的语法和格式因编译器而异。

以GCC为例，内嵌汇编的语法如下：

```c
__asm__("mcr p15, 1, %0, c15, c9, 3" : : "r" (addr));
```

而在ADS编译器中，语法则是：

```c
__asm{
    smull tmp, ret.hi, a, b;
}
```

这些内嵌汇编代码并不会直接交给汇编器，而是先由编译器处理，转换为相应的汇编指令，再交给汇编器。





## `const`关键字

C语言中的 `const` 关键字通常被用来修饰常量（不可修改的值），但很多人在理解 `const` 时容易把它当作常量来处理。其实，`const` 更准确的含义是“只读”，而非常量。

`const` 在代码中就像单行道标志，意味着你无法随意修改某个变量的值。在程序中合理使用 `const` 关键字可以提升代码的可读性、安全性及编译器优化能力。

### const语法

对于普通的非指针变量，`const` 无论放在类型前还是后，表示该变量是只读的，即在运行过程中不可修改。

例如：

```c
const int a = 10;   // a是常整型，只读
int const a = 10;   // 同样，a是常整型，只读
```

对于指针，`const` 关键字有三种不同的修饰方式：

1. **`const int\* a`**：表示指针 `a` 指向的是只读的整数，不能修改指针指向的内容，但可以修改指针本身，使其指向其他地址。
2. **`int\* const a`**：表示指针 `a` 本身是只读的，不能修改指针的地址，但可以修改指针所指向的内容。
3. **`const int\* const a`**：表示指针 `a` 本身和指向的整数都是只读的，既不能修改指针指向的内容，也不能修改指针本身。

### const的作用

1. **增强可读性**：`const` 通过明确表明变量不应修改，能够提高代码的可读性。
2. **防止误修改**：使用 `const` 可以防止无意间修改变量的值，编译器会在尝试修改时发出警告。
3. **提升编译器优化**：编译器知道某个变量是只读的，可以根据这一信息做出更高效的优化。
4. **在内存管理中提供帮助**：某些编译器使用 `const` 关键字将全局数据放入只读数据段（rodata），从而在多个进程间共享而无需同步。

### const与常量

`const` 和常量的概念有所不同。常量（如 `#define` 定义的宏）是没有存储空间的右值，而 `const` 修饰的变量仍然是左值，有存储空间，只是限定为只读。

例如：

```c
#define MAX 100   // 常量
const int MAX = 100;   // 只读变量
```



## `sizeof`关键字

`sizeof` 是C语言中的一元运算符，用来获取操作数所占的字节数。它的返回值是一个常数，计算在编译时完成，因此不会像函数调用那样产生运行时开销。

### sizeof常见用法

- 对于基本数据类型或普通变量，`sizeof` 返回的是该数据类型在内存中占用的字节数。例如，在一个32位系统上，`int` 通常占用4字节：

  ```c
  sizeof(int);  // 返回4
  ```

- `sizeof` 还可以用来获取数组的总字节数。例如：

  ```c
  int arr[10];
  sizeof(arr);  // 返回40，数组总大小（10个int，每个int占4字节）
  ```

- 对于指针，`sizeof` 返回的是指针本身占用的字节数，而不是指针指向的内存空间的大小：

  ```c
  int *p;
  sizeof(p);  // 返回4，指针p本身的大小
  ```

### sizeof禁区

- **不完全类型**：不能对不完全类型（如 `void`）使用 `sizeof`。
- **函数类型**：`sizeof` 不能直接用于函数类型。

### sizeof与指针

- **数组与指针**：当数组作为函数参数传递时，它会退化成指针，因此在函数内部 `sizeof` 得到的是指针的大小，而不是数组的大小。

```c
void func(int arr[10]) {
    printf("%d\n", sizeof(arr));  // 返回指针大小，而非数组大小
}

```

### sizeof与结构体/联合体

结构体和联合体的大小不仅由成员的大小决定，还会考虑内存对齐。

例如，对于以下结构体：

```c
struct MyStruct {
    double da;
    char ca;
    int ia;
};

```

由于内存对齐的要求，结构体的总大小可能会大于成员的总大小。编译器会自动为不对齐的成员填充内存，从而确保内存对齐。

### strlen与sizeof

- **`sizeof`**：在编译时确定大小。
- **`strlen`**：运行时计算字符串的长度。

例如：

```c
char str[20] = "Hello";
printf("%d\n", sizeof(str));  // 输出20（数组大小）
printf("%d\n", strlen(str));  // 输出5（字符串长度）

```

`sizeof` 用于计算数据类型在内存中所占的字节数，而 `strlen` 则是用于计算字符串的实际字符数。

