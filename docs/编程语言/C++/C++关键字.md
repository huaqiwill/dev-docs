# C++关键字

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





## auto和register关键字

- auto关键字(忘记)

+ 只能修饰局部变量, 局部变量如果没有其它修饰符, 默认就是auto的
+ 特点: 随用随开, 用完即销

```c
auto int num; // 等价于 int num;
```

- register关键字(忘记)

+  只能修饰局部变量, 原则上将内存中变量提升到CPU寄存器中存储, 这样访问速度会更快
+  但是由于CPU寄存器数量相当有限,  通常不同平台和编译器在优化阶段会自动转换为auto

```c
register int num; 
```

## static关键字

- **对局部变量的作用**

+ 延长局部变量的生命周期,从程序启动到程序退出,但是它并没有改变变量的作用域
+ 定义变量的代码在整个程序运行期间仅仅会执行一次

```c
#include <stdio.h>
void test();
int main()
{
    test();
    test();
    test();

    return 0;
}
void test(){
    static int num = 0; // 局部变量
    num++; 
    // 如果不加static输出 1 1 1
    // 如果添加static输出 1 2 3
    printf("num = %i\n", num); 
}
```

- **对全局变量的作用**
- 全局变量分类：

+ 内部变量:只能在本文件中访问的变量
+ 外部变量:可以在其他文件中访问的变量,默认所有全局变量都是外部变量

- 默认情况下多个同名的全局变量共享一块空间, 这样会导致全局变量污染问题
- 如果想让某个全局变量只在某个文件中使用, 并且不和其他文件中同名全局变量共享同一块存储空间, 那么就可以使用static

```c
// A文件中的代码
int num; // 和B文件中的num共享
void test(){
    printf("ds.c中的 num = %i\n", num);
}
```

```c
// B文件中的代码
#include <stdio.h>
#include "ds.h"

int num; // 和A文件中的num共享
int main()
{
    num = 666;
    test(); // test中输出666
    return 0;
}
```

```c
// A文件中的代码
static int num; // 不和B文件中的num共享
void test(){
    printf("ds.c中的 num = %i\n", num);
}
```

```c
// B文件中的代码
#include <stdio.h>
#include "ds.h"

int num; // 不和A文件中的num共享
int main()
{
    num = 666;
    test(); // test中输出0
    return 0;
}
```

---

## extern关键字

- 对局部变量的作用

+ extern不能用于局部变量
+ extern代表声明一个变量, 而不是定义一个变量, 变量只有定义才会开辟存储空间
+ 所以如果是局部变量, 虽然提前声明有某个局部变量, 但是局部变量只有执行到才会分配存储空间

```c
#include <stdio.h>

int main()
{
    extern int num;
    num = 998; // 使用时并没有存储空间可用, 所以声明了也没用
    int num; // 这里才会开辟
    printf("num = %i\n", num);
    return 0;
}
```

- 对全局变量的作用

+ 声明一个全局变量, 代表告诉编译器我在其它地方定义了这个变量, 你可以放心使用

```c
#include <stdio.h>

int main()
{
    extern int num; // 声明我们有名称叫做num变量
    num = 998; // 使用时已经有对应的存储空间
    printf("num = %i\n", num);
    return 0;
}
int num; // 全局变量, 程序启动就会分配存储空间

```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## static与extern对函数的作用

- 内部函数:只能在本文件中访问的函数
- 外部函数:可以在本文件中以及其他的文件中访问的函数
- 默认情况下所有的函数都是外部函数

- **static 作用**
- 声明一个内部函数

```c
static int sum(int num1,int num2);
```

-  定义一个内部函数

```c
static int sum(int num1,int num2)
{
  return num1 + num2;
}
```

- **extern作用**

+ 声明一个外部函数

```c
extern int sum(int num1,int num2);
```

- 定义一个外部函数

```c
extern int sum(int num1,int num2)
{
  return num1 + num2;
}
```

>+ 注意点: 
>+ 由于默认情况下所有的函数都是外部函数, 所以extern一般会省略
>+ 如果只有函数声明添加了static与extern, 而定义中没有添加static与extern, 那么无效

---

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## typedef关键字

- C语言不仅􏰀供了丰富的数据类型,而且还允许由用户自己定义类型说明符,也就是说允许由用户为数据类型取“别名”。
- 格式: ```typedef 原类型名 新类型名;```

+ 其中原类型名中含有定义部分,新类型名一般用大写表示,以便于区别。
+ 有时也可用宏定义来代替typedef的功能,但是宏定义是由预处理完成的,而typedef则是在编译 时完成的,后者更为灵活方便。
  ##typedef使用

- 基本数据类型

```c
typedef int INTEGER
INTEGER a; // 等价于 int a;
```

- 也可以在别名的基础上再起一个别名

```c
typedef int Integer;

typedef Integer MyInteger;

```

- 用typedef定义数组、指针、结构等类型将带来很大的方便,不仅使程序书写简单而且使意义更为 明确,因而增强了可读性。

- 数组类型

```c
typedef char NAME[20]; // 表示NAME是字符数组类型,数组长度为20。然后可用NAME 说明变量,
NAME a; // 等价于 char a[20];
```

- 结构体类型

+ 第一种形式:

```c
 struct Person{
    int age;
    char *name;
};

typedef struct Person PersonType;
```

    + 第二种形式:

```c
typedef struct Person{
    int age;
    char *name;
} PersonType;
```

    + 第三种形式:

```c
typedef struct {
    int age;
    char *name;
} PersonType;
```

- 枚举

+ 第一种形式:

```c
enum Sex{
    SexMan,
    SexWoman,
    SexOther
};
typedef enum Sex SexType;

```

    + 第二种形式:
    

```c
typedef enum Sex{
    SexMan,
    SexWoman,
    SexOther
} SexType;

```

    + 第三种形式:
    

```c
typedef enum{
    SexMan,
    SexWoman,
    SexOther
} SexType;

```

- 指针

+ typedef与指向结构体的指针

```c
 // 定义一个结构体并起别名
  typedef struct {
      float x;
      float y;
  } Point;

 // 起别名
 typedef Point *PP;


```

+ typedef与指向函数的指针

```c
// 定义一个sum函数，计算a跟b的和
  int sum(int a, int b) {
      int c = a + b;
      printf("%d + %d = %d", a, b, c);
      return c;
 }
 typedef int (*MySum)(int, int);

// 定义一个指向sum函数的指针变量p
 MySum p = sum;

```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## 宏定义与函数以及typedef区别

- 与函数的区别

+ 从整个使用过程可以发现，带参数的宏定义，在源程序中出现的形式与函数很像。但是两者是有本质区别的：
+ 1> 宏定义不涉及存储空间的分配、参数类型匹配、参数传递、返回值问题
+ 2> 函数调用在程序运行时执行，而宏替换只在编译预处理阶段进行。所以带参数的宏比函数具有更高的执行效率

- typedef和#define的区别

+ 用宏定义表示数据类型和用typedef定义数据说明符的区别。
+ 宏定义只是简单的字符串替换,￼是在预处理完成的
+ typedef是在编译时处理的,它不是作简单的代换,而是对类型说明符￼重新命名。被命名的标识符具有类型定义说明的功能

```c
typedef char *String;
int main(int argc, const char * argv[])
{
     String str = "This is a string!";
     return 0;
}


#define String char *
int main(int argc, const char * argv[])
{
    String str = "This is a string!";
     return 0;
}
```

```c
typedef char *String1; // 给char *起了个别名String1
#define String2 char * // 定义了宏String2
int main(int argc, const char * argv[]) {
        /*
        只有str1、str2、str3才是指向char类型的指针变量
        由于String1就是char *，所以上面的两行代码等于:
        char *str1;
        char *str2;
        */
      String1 str1, str2;
        /*
        宏定义只是简单替换, 所以相当于
        char *str3, str4;
        *号只对最近的一个有效, 所以相当于
        char *str3;
        char str4;
        */
      String2 str3, str4;
      return 0;
}
```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## const关键字

- const是一个类型修饰符

+ 使用const修饰变量则可以让变量的值不能改变
  ##const有什么主要的作用?

- (1)可以定义const常量,具有不可变性

```c
const int Max=100;
int Array[Max];
```

- (2)便于进行类型检查,使编译器对处理内容有更多了解,消除了一些隐患。

```c
 void f(const int i) { .........}
```

+ 编译器就会知道i是一个常量,不允许修改;

- (3)可以避免意义模糊的数字出现,同样可以很方便地进行参数的调整和修改。 同宏定义一样,可以做到不变则已,一变都变!如(1)中,如果想修改Max的内容,只需要:const int Max=you want;即可!

- (4)可以保护被修饰的东西,防止意外的修改,增强程序的健壮性。 还是上面的例子,如果在 函数体内修改了i,编译器就会报错;

```c
void f(const int i) { i=10;//error! }
```

- (5) 可以节省空间,避免不必要的内存分配。

```c
#define PI 3.14159 //常量宏
const doulbe Pi=3.14159; //此时并未将Pi放入ROM中 ...... double i=Pi; //此时为Pi分配内存,以后不再分配!
double I=PI; //编译期间进行宏替换,分配内存
double j=Pi; //没有内存分配
double J=PI; //再进行宏替换,又一次分配内存! const定义常量从汇编的角度来看,只是给出了对应的内存地址,而不是象#define一样给出的是立即数,所以,const定义的常量在程序运行过程中只有一份拷贝,而#define定义的常量在内存 中有若干个拷贝。
```

- (6) 􏰀高了效率。编译器通常不为普通const常量分配存储空间,而是将它们保存在符号表 中,这使得它成为一个编译期间的常量,没有了存储与读内存的操作,使得它的效率也很高。

---

## 如何使用const?

- (1)修饰一般常量一般常量是指简单类型的常量。这种常量在定义时,修饰符const可以用在类型说明符前,也可以用在类型说明符后

```c
int const x=2; 或 const int x=2;
```

-   (当然,我们可以偷梁换柱进行更新: 通过强制类型转换,将地址赋给变量,再作修改即可以改变const常量值。)

```c
    // const对于基本数据类型, 无论写在左边还是右边, 变量中的值不能改变
    const int a = 5;
    // a = 666; // 直接修改会报错
    // 偷梁换柱, 利用指针指向变量
    int *p;
    p = &a;
    // 利用指针间接修改变量中的值
    *p = 10;
    printf("%d\n", a); 
    printf("%d\n", *p);
```

- (2)修饰常数组(值不能够再改变了)定义或说明一个常数组可采用如下格式:

```c
int const a[5]={1, 2, 3, 4, 5};
const int a[5]={1, 2, 3, 4, 5};
```

```
const int a[5]={1, 2, 3, 4, 5};
a[1] = 55; // 错误
```

- (3)修饰函数的常参数const修饰符也可以修饰函数的传递参数,格式如下:void Fun(const int Var); 告诉编译器Var在函数体中的无法改变,从而防止了使用者的一些无 意的或错误的修改。

- (4)修饰函数的返回值: const修饰符也可以修饰函数的返回值,是返回值不可被改变,格式如 下:

```c
const int Fun1();
const MyClass Fun2();

```

- (5)修饰常指针
  + const int *A; //const修饰指针,A可变,A指向的值不能被修改
  + int const *A; //const修饰指向的对象,A可变,A指向的对象不可变
  + int *const A; //const修饰指针A, A不可变,A指向的对象可变
  + const int *const A;//指针A和A指向的对象都不可变

- 技巧

```c
 先看“*”的位置
 如果const 在 *的左侧 表示值不能修改,但是指向可以改。
 如果const 在 *的右侧 表示指向不能改,但是值可以改
 如果在“*”的两侧都有const 标识指向和值都不能改。

```



最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。