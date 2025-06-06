# C++内存管理

## 内存管理

## 进程空间

- 程序，是经源码编译后的可执行文件，可执行文件可以多次被执行，比如我们可以多次打开 office。
- 而进程，是程序加载到内存后开始执行，至执行结束，这样一段时间概念，多次打开的wps,每打开一次都是一个进程，当我们每关闭一个 office，则表示该进程结束。
- 程序是静态概念，而进程动态/时间概念。
  ###进程空间图示
  有了进程和程序的概念以后，我们再来看一下，程序被加载到内存以后内存空间布局是什么样的
  ![](http://8.155.40.179:9000/blog/images/eb67c45f13e5fce13e7be9e122d902e3/5d2e966e95f1518585804e57779e7fe6.png)

---

## 栈内存(Stack)

- 栈中存放任意类型的变量，但必须是 auto 类型修饰的，即自动类型的局部变量， 随用随开，用完即消。
- 内存的分配和销毁系统自动完成，不需要人工干预
- 栈的最大尺寸固定，超出则引起栈溢出

+ 局部变量过多，过大 或 递归层数太多等就会导致栈溢出

```c
int ages[10240*10240]; // 程序会崩溃, 栈溢出
```

```c
#include <stdio.h>

int main()
{
    // 存储在栈中, 内存地址从大到小
    int a = 10;
    int b = 20;
    printf("&a = %p\n", &a); // &a = 0060FEAC
    printf("&b = %p\n", &b); // &b = 0060FEA8

    return 0;
}
```

---

## 堆内存(Heap)

- 堆内存可以存放任意类型的数据，但需要自己申请与释放
- 堆大小，想像中的无穷大，但实际使用中，受限于实际内存的大小和内存是否连续性

```c
int *p = (int *)malloc(10240 * 1024); // 不一定会崩溃
```

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    // 存储在栈中, 内存地址从小到大
    int *p1 = malloc(4);
    *p1 = 10;
    int *p2 = malloc(4);
    *p2 = 20;
   
    printf("p1 = %p\n", p1); //  p1 = 00762F48
    printf("p2 = %p\n", p2); // p2 = 00762F58

    return 0;
}
```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## malloc函数

| 函数声明           | void * malloc(size_t _Size);                             |
| ------------------ | -------------------------------------------------------- |
| 所在文件           | stdlib.h                                                 |
| 函数功能           | 申请堆内存空间并返回,所申请的空间并未初始化。            |
| 常见的初始化方法是 | memset 字节初始化。                                      |
| 参数及返回解析     |                                                          |
| 参数               | size_t	_size 表示要申请的字符数                       |
| 返回值             | void *	成功返回非空指针指向申请的空间 ，失败返回 NULL |

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    /*
     * malloc
     * 第一个参数: 需要申请多少个字节空间
     * 返回值类型: void *
     */ 
    int *p = (int *)malloc(sizeof(int));
    printf("p = %i\n", *p); // 保存垃圾数据
    /*
     * 第一个参数: 需要初始化的内存地址
     * 第二个初始: 需要初始化的值
     * 第三个参数: 需要初始化对少个字节
     */ 
    memset(p, 0, sizeof(int)); // 对申请的内存空间进行初始化
    printf("p = %i\n", *p); // 初始化为0
    return 0;
}
```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## free函数

- 注意: 通过malloc申请的存储空间一定要释放, 所以malloc和free函数总是成对出现

| 函数声明       | void free(void *p);           |
| -------------- | ----------------------------- |
| 所在文件       | stdlib.h                      |
| 函数功能       | 释放申请的堆内存              |
| 参数及返回解析 |                               |
| 参数           | void*	p 指向手动申请的空间 |
| 返回值         | void	无返回                |

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    // 1.申请4个字节存储空间
    int *p = (int *)malloc(sizeof(int));
    // 2.初始化4个字节存储空间为0
    memset(p, 0, sizeof(int));
    // 3.释放申请的存储空间
    free(p);
    return 0;
}
```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## calloc函数

| 函数声明       | void *calloc(size_t nmemb, size_t size);                 |
| -------------- | -------------------------------------------------------- |
| 所在文件       | stdlib.h                                                 |
| 函数功能       | 申请堆内存空间并返回，所申请的空间，自动清零             |
| 参数及返回解析 |                                                          |
| 参数           | size_t 	nmemb 所需内存单元数量                        |
| 参数           | size_t size	内存单元字节数量                          |
| 返回值         | void *	成功返回非空指针指向申请的空间 ，失败返回 NULL |

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    /*
    // 1.申请3块4个字节存储空间
    int *p = (int *)malloc(sizeof(int) * 3);
    // 2.使用申请好的3块存储空间
    p[0] = 1;
    p[1] = 3;
    p[2] = 5;
    printf("p[0] = %i\n", p[0]);
    printf("p[1] = %i\n", p[1]);
    printf("p[2] = %i\n", p[2]);
    // 3.释放空间
    free(p);
    */

    // 1.申请3块4个字节存储空间
    int *p = calloc(3, sizeof(int));
    // 2.使用申请好的3块存储空间
    p[0] = 1;
    p[1] = 3;
    p[2] = 5;
    printf("p[0] = %i\n", p[0]);
    printf("p[1] = %i\n", p[1]);
    printf("p[2] = %i\n", p[2]);
    // 3.释放空间
    free(p);

    return 0;
}
```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## realloc函数

| 函数声明       | void *realloc(void *ptr, size_t size);                       |
| -------------- | ------------------------------------------------------------ |
| 所在文件       | stdlib.h                                                     |
| 函数功能       | 扩容(缩小)原有内存的大小。通常用于扩容，缩小会会导致内存缩去的部分数据丢失。 |
| 参数及返回解析 |                                                              |
| 参数           | void * ptr 表示待扩容(缩小)的指针， ptr 为之前用 malloc 或者 calloc 分配的内存地址。 |
| 参数           | size_t	size 表示扩容(缩小)后内存的大小。                  |
| 返回值         | void* 成功返回非空指针指向申请的空间 ，失败返回 NULL。       |

- 注意点:
  + 若参数ptr==NULL，则该函数等同于 malloc
  + 返回的指针，可能与 ptr 的值相同，也有可能不同。若相同，则说明在原空间后面申请，否则，则可能后续空间不足，重新申请的新的连续空间，原数据拷贝到新空间， 原有空间自动释放

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    // 1.申请4个字节存储空间
    int *p = NULL;
    p = realloc(p, sizeof(int)); // 此时等同于malloc
    // 2.使用申请好的空间
    *p = 666;
    printf("*p = %i\n",  *p);
    // 3.释放空间
    free(p);

    return 0;
}
```

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    // 1.申请4个字节存储空间
    int *p = malloc(sizeof(int));
    printf("p = %p\n", p);
    // 如果能在传入存储空间地址后面扩容, 返回传入存储空间地址
    // 如果不能在传入存储空间地址后面扩容, 返回一个新的存储空间地址
    p = realloc(p, sizeof(int) * 2);
    printf("p = %p\n", p);
    // 2.使用申请好的空间
    *p = 666;
    printf("*p = %i\n",  *p);
    // 3.释放空间
    free(p);

    return 0;
}
```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。