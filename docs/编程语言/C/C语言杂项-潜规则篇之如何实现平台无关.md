# C潜规则篇之如何实现平台无关

参考链接：https://blog.csdn.net/ipmux/article/details/17302979

​    或许大家都有这样类似经历：要在某平台上开发一个模块，很幸运找到了功能类似的参考代码，拿来修改却发现它是基于其它平台，底层接口完全不同，且全都嵌在代码里，要一个个改。面对一堆编译错误，用着麻烦，丢了可惜，真成了“鸡肋”。

C代码复用不象JAVA那么简单，一般都要经过移植才能在不同平台运行。但如果事先把平台相关部分集中在一起，形成平台隔离层，C程序也能做到代码基本平台无关。判定C代码级平台无关的标准是：移植只需修改makefile等编译脚本，不需修改源代码。具体需要从以下方面提取和消除平台相关性，然后在makefile中切换不同平台的编译开关：



1）基本数据类型重定义

类似下面代码，很多人都看到过，却不清楚为什么这样做：

```c
typedef int                           sint32
typedef unsigned char           uint8;
typedef signed char            sint8;
typedef unsigned short          uint16;
typedef unsigned int             uint32;
```

用typedef可以为不同平台重定义一套通用数值类型，源代码里统一使用新定义类型名，移植时只需根据平台特性重新定义。注意：有的编译器默认char型为有符号，有的默认无符号，重定义时要明确指定signed或unsigned，否则不能消除平台相关性。

2)设计中间层平台库，完成标准库以及宏的重定义

不要直接调用C标准库函数（如printf，malloc）；不直接使用特定平台下的标准宏（如ASSERT , DEBUG等windows宏）以及编译器相关的语法，如#pragram等。这些元素平台相关，如果直接放在代码里，移植时就要修改源代码，应通过中间层隔离，例如：

```c
#define XXX_malloc   malloc  或 int XXX_malloc(){  return malloc();  }
#define XXX_printf     printf    或 int XXX_printf(){  return printf();  }
#define XXX_fopen    fopen   或 int XXX_fopen(){  return fopen();  }
```

 这样就不受平台底层变动的影响，甚至即使没有底层库支持也可以须改中间层库来移植，比如某些平台内存管理不完善，或申请的最大内存无法满足需要，这时就可以在中间层实现特定的内存管理。

  中间层接口的设计要尽量简化，移植的主要工作就是处理平台库接口，接口越简单，移植工作量就越少。

3）用编译开关加函数指针方式来选择不同平台的实现或特定优化版本

有些如某FIR滤波器运算，针对不同硬件平台写了专门优化或汇编函数，函数指针可以为不同平台选择最优实现：

```c
void (*fir)(sint16 *pCoef);
#if defined(ARMV4)
    fir = FIR_ARMV4;
    ……
#if defined(TI_DM320DSP)
	fir= FIR_TIDM320;
#if defined(ARM_CORTEXA9)
	fir = FIR_CORTEXA9;
#endif
```

4）消除全局变量与静态变量

某些平台（Symbian/Brew等）不支持全局变量，且全局与静态变量会使函数不可重入，并增加模块耦合性，可用两种方法代替：

a. 用const把全局变量变为常量，很多全局数组本就只是存储只读常量数据，如：

  原始代码：`const int *ptr[8] = {tab1,tab2,tab3,tab3,tab3,tab2,tab1,tab3};`

  修正后代码：`const int * const ptr[8] = {tab1,tab2,tab3,tab3,tab3,tab2,tab1,tab3};`

用const意味这些常数组将被定位到静态数据区，这是所有平台都支持的。

b. 把全局变量组织到树状结构体集合中，定义一个handle指针，在程序内主要函数间传递信息，这样既能通过此handle全局访问数据，又避免出现语法上的全局变量。

5）某些平台（如PALM）不支持变长数组，应避免，如：

不支持`static const char sArray[][7] = {"Mike","Jerry","Tom","Henry","William"};`

事先指定长度：`static const char sArray[8][7] = {"Mike","Jerry","Tom","Henry","William"};`

6）有些编译器要求变量必须定义在函数开头所有表达式语句前，所以避免把局部变量定义在函数内部blocks中，即不提倡：

```c
int fun()
{
  if (…… ){
    int tmp;   //某些编译器不支持此类语法
  }
}
```

7）用sizeof代替长度值

不同平台数据类型长度不同，int *p = malloc(10)这种定义直接移植到不同平台，或浪费内存，或内存越界。特别struct/enum等编译器相关，更是只能用sizeof取长度。

8)考虑字节序及字符集问题

与设备字节序有关的代码，尽量兼容Little和Big Endian，提供两种字节序版本的IO接口，通过编译开关切换。另外考虑字符串资源的多平台管理维护，收集所有裸字符串，放在单独定义的头文件（资源文件），源码中用宏定义代替，便于后续字符编码集的扩展和移植。

9）指针类型变换时考虑到某些平台的内存对齐要求

如下面代码在x86上正常运行，而ARM下就可能会crash：

```c
char x = malloc(15);

……

if (0==((int *)x)[i])    //可能发生内存不对齐错误。
```

10)避免碰触C标准中的空白点

C标准由于某些原因，把若干细节留给编译器自由实现，而这些空白区自然引起不同平台间的差异，要小心绕开，改用标准中明确定义的语法，这些其实已超出平台相关性问题，属于C的一些陷阱。如：

a.不使用求值顺序不确定的表达式，如：while(i<n){  y[i]=x[i++];  }。 因为C没有限定=号左右的求值顺序，所以这里y[i]和x[i++]的计算顺序和结果与编译器相关，不同平台结果不同。因此要改为计算顺序确定的表达形式。

b. 把有符号数的右移操作改为无符号，因为C标准没有规定有符号数右移的填充位，可能为0也可能为标志位，取决于编译器。

11)头文件中定义的函数以C接口形式提供，

具体要求：a.函数参数不能用传引用方式；b. 不能用缺省参数；c. 不能用变长参数；d.所有接口API层函数必须显式用extern "C"声明为C接口，模板如下：

```c
#ifdef  __cplusplus

extern "C" {

#endif

……

#ifdef  __cplusplus

}

#endif
```

12）设计时考虑栈空间容量，防止某些平台下栈溢出。

具体措施包括：不影响效率时，不用大的临时数组，改用动态分配堆内存；避免使用递归函数以及太深的函数调用。

13）统一接口文件名大小写。

某些编译器不区分文件名大小写（如VC6），另一些则区分（gcc），因此库接口头文件最好统一用小写命名，源代码中对应的include头文件名也小写，这样移植时就不需要因文件名大小写问题而修改源代码。常见于windows到linux的移植。


