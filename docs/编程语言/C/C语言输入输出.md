# C语言输入输出

* printf
* scanf
* putchar和getchar

## printf函数



- printf函数称之为格式输出函数,方法名称的最后一个字母f表示format。其功能是按照用户指定的格式,把指定的数据输出到屏幕上
- printf函数的调用格式为:
  + ```printf("格式控制字符串",输出项列表 );```
  + 例如:```printf("a = %d, b = %d",a, b);```
    
  + 非格式字符串原样输出, 格式控制字符串会被输出项列表中的数据替换
  + 注意: 格式控制字符串和输出项在数量和类型上***必须一一对应***

---

- 格式控制字符串
  + 形式:  ```%[标志][输出宽度][.精度][长度]类型```

---

- 类型
  + 格式: ```printf("a = %类型", a);```
  + 类型字符串用以表示输出数据的类型, 其格式符和意义如下所示

| 类型  | 含义                                |
| ----- | ----------------------------------- |
| d     | 有符号10进制整型                    |
| i     | 有符号10进制整型                    |
| u     | 无符号10进制整型                    |
| o     | 无符号8进制整型                     |
| x     | 无符号16进制整型                    |
| X     | 无符号16进制整型                    |
| f     | 单、双精度浮点数(默认保留6位小数)   |
| e / E | 以指数形式输出单、双精度浮点数      |
| g / G | 以最短输出宽度,输出单、双精度浮点数 |
| c     | 字符                                |
| s     | 字符串                              |
| p     | 地址                                |

```c
#include <stdio.h>
int main(){
    int a = 10;
    int b = -10;
    float c = 6.6f;
    double d = 3.1415926;
    double e = 10.10;
    char f = 'a';
    // 有符号整数(可以输出负数)
    printf("a = %d\n", a); // 10
    printf("a = %i\n", a); // 10

    // 无符号整数(不可以输出负数)
    printf("a = %u\n", a); // 10
    printf("b = %u\n", b); // 429496786

    // 无符号八进制整数(不可以输出负数)
    printf("a = %o\n", a); // 12
    printf("b = %o\n", b); // 37777777766

    // 无符号十六进制整数(不可以输出负数)
    printf("a = %x\n", a); // a
    printf("b = %x\n", b); // fffffff6

    // 无符号十六进制整数(不可以输出负数)
    printf("a = %X\n", a); // A
    printf("b = %X\n", b); // FFFFFFF6

    // 单、双精度浮点数(默认保留6位小数)
    printf("c = %f\n", c); // 6.600000
    printf("d = %lf\n", d); // 3.141593

    // 以指数形式输出单、双精度浮点数
    printf("e = %e\n", e); // 1.010000e+001
    printf("e = %E\n", e); // 1.010000E+001
    
    // 以最短输出宽度,输出单、双精度浮点数
    printf("e = %g\n", e); // 10.1
    printf("e = %G\n", e); // 10.1
    
    // 输出字符
    printf("f = %c\n", f); // a
}
```

---

- 宽度
  + 格式: ```printf("a = %[宽度]类型", a);```
  + 用十进制整数来指定输出的宽度, 如果实际位数多于指定宽度,则按照实际位数输出, 如果实际位数少于指定宽度则以空格补位

```c
#include <stdio.h>
int main(){
    // 实际位数小于指定宽度
    int a = 1;
    printf("a =|%d|\n", a); // |1|
    printf("a =|%5d|\n", a); // |    1|
    // 实际位数大于指定宽度
    int b = 1234567;
    printf("b =|%d|\n", b); // |1234567|
    printf("b =|%5d|\n", b); // |1234567|
}
```

---

- 标志
  + 格式: ```printf("a = %[标志][宽度]类型", a);```

| 标志 | 含义                                                  |
| ---- | ----------------------------------------------------- |
| -    | 左对齐, 默认右对齐                                    |
| +    | 当输出值为正数时,在输出值前面加上一个+号, 默认不显示  |
| 0    | 右对齐时, 用0填充宽度.(默认用空格填充)                |
| 空格 | 输出值为正数时,在输出值前面加上空格, 为负数时加上负号 |
| #    | 对c、s、d、u类型无影响                                |
| #    | 对o类型, 在输出时加前缀o                              |
| #    | 对x类型,在输出时加前缀0x                              |

```c
#include <stdio.h>
int main(){
    int a = 1;
    int b = -1;
    // -号标志
    printf("a =|%d|\n", a); // |1|
    printf("a =|%5d|\n", a); // |    1|
    printf("a =|%-5d|\n", a);// |1    |
    // +号标志
    printf("a =|%d|\n", a); // |1|
    printf("a =|%+d|\n", a);// |+1|
    printf("b =|%d|\n", b); // |-1|
    printf("b =|%+d|\n", b);// |-1|
    // 0标志
    printf("a =|%5d|\n", a); // |    1|
    printf("a =|%05d|\n", a); // |00001|
    // 空格标志
    printf("a =|% d|\n", a); // | 1|
    printf("b =|% d|\n", b); // |-1|
    // #号
    int c = 10;
    printf("c = %o\n", c); // 12
    printf("c = %#o\n", c); // 012
    printf("c = %x\n", c); // a
    printf("c = %#x\n", c); // 0xa
}
```

---

- 精度
  + 格式: ```printf("a = %[精度]类型", a); ```
  + 精度格式符以"."开头, 后面跟上十进制整数, 用于指定需要输出多少位小数, 如果输出位数大于指定的精度, 则删除超出的部分

```c
#include <stdio.h>
int main(){
    double a = 3.1415926;
    printf("a = %.2f\n", a); // 3.14
}
```

- 动态指定保留小数位数
  + 格式: ```printf("a = %.*f", a);```

```c
#include <stdio.h>
int main(){
    double a = 3.1415926;
    printf("a = %.*f", 2, a); // 3.14
}
```

- 实型(浮点类型)有效位数问题
  + 对于单精度数,使用%f格式符输出时,仅前6~7位是有效数字
  + 对于双精度数,使用%lf格式符输出时,前15~16位是有效数字
  + 有效位数和精度(保留多少位)不同, 有效位数是指从第一个非零数字开始,误差不超过本数位半个单位的、精确可信的数位
  + 有效位数包含小数点前的非零数位

```c
#include <stdio.h>
int main(){
    //        1234.567871093750000
    float a = 1234.567890123456789;
    //         1234.567890123456900
    double b = 1234.567890123456789;
    printf("a = %.15f\n", a); // 前8位数字是准确的, 后面的都不准确
    printf("b = %.15f\n", b); // 前16位数字是准确的, 后面的都不准确
}
```

---

- 长度
  + 格式: ```printf("a = %[长度]类型", a);```

| 长度 | 修饰类型      | 含义               |
| ---- | ------------- | ------------------ |
| hh   | d、i、o、u、x | 输出char           |
| h    | d、i、o、u、x | 输出 short int     |
| l    | d、i、o、u、x | 输出 long int      |
| ll   | d、i、o、u、x | 输出 long long int |

```c
#include <stdio.h>
int main(){
    char a = 'a';
    short int b = 123;
    int  c = 123;
    long int d = 123;
    long long int e = 123;
    printf("a = %hhd\n", a); // 97
    printf("b = %hd\n", b); // 123
    printf("c = %d\n", c); // 123
    printf("d = %ld\n", d); // 123
    printf("e = %lld\n", e); // 123
}
```

- 转义字符
  + 格式: ```printf("%f%%", 3.1415);```
  + %号在格式控制字符串中有特殊含义, 所以想输出%必须添加一个转移字符

```c
#include <stdio.h>
int main(){
    printf("%f%%", 3.1415); // 输出结果3.1415%
}
```



## scanf函数

- scanf函数用于接收键盘输入的内容, 是一个阻塞式函数,程序会停在scanf函数出现的地方, 直到接收到数据才会执行后面的代码
- printf函数的调用格式为:

+ ```scanf("格式控制字符串", 地址列表);```
+ 例如: ```scanf("%d", &num);```
  

---

- 基本用法

+ 地址列表项中只能传入变量地址, 变量地址可以通过&符号+变量名称的形式获取

```c
#include <stdio.h>
int main(){
    int number;
    scanf("%d", &number); // 接收一个整数
    printf("number = %d\n", number); 
}
```

- 接收非字符和字符串类型时, 空格、Tab和回车会被忽略

```c
#include <stdio.h>
int main(){
    float num;
    // 例如:输入 Tab 空格 回车 回车 Tab 空格 3.14 , 得到的结果还是3.14
    scanf("%f", &num);
    printf("num = %f\n", num);
}
```

- 非格式字符串原样输入, 格式控制字符串会赋值给地址项列表项中的变量

+ 不推荐这种写法

```c
#include <stdio.h>
int main(){
    int number;
    // 用户必须输入number = 数字  , 否则会得到一个意外的值
    scanf("number = %d", &number);
    printf("number = %d\n", number);
}
```

- 接收多条数据

+ 格式控制字符串和地址列表项在数量和类型上必须一一对应
+ 非字符和字符串情况下如果没有指定多条数据的分隔符, 可以使用空格或者回车作为分隔符(不推荐这种写法)
+ 非字符和字符串情况下建议明确指定多条数据之间分隔符

```c
#include <stdio.h>
int main(){
    int number;
    scanf("%d", &number);
    printf("number = %d\n", number);
    int value;
    scanf("%d", &value);
    printf("value = %d\n", value);
}
```

```c
#include <stdio.h>
int main(){
    int number;
    int value;
    // 可以输入 数字 空格 数字, 或者 数字 回车 数字
    scanf("%d%d", &number, &value);
    printf("number = %d\n", number);
    printf("value = %d\n", value);
}
```

```c
#include <stdio.h>
int main(){
    int number;
    int value;
    // 输入 数字,数字 即可
    scanf("%d,%d", &number, &value);
    printf("number = %d\n", number);
    printf("value = %d\n", value);
}
```

- \n是scanf函数的结束符号, 所以格式化字符串中不能出现\n

```c
#include <stdio.h>
int main(){
    int number;
    // 输入完毕之后按下回车无法结束输入
    scanf("%d\n", &number);
    printf("number = %d\n", number);
}
```

### scanf运行原理

- 系统会将用户输入的内容先放入输入缓冲区
- scanf方式会从输入缓冲区中逐个取出内容赋值给变量
- 如果输入缓冲区的内容不为空,scanf会一直从缓冲区中获取,而不要求再次输入

```c
#include <stdio.h>
int main(){
    int num1;
    int num2;
    char ch1;
    scanf("%d%c%d", &num1, &ch1, &num2);
    printf("num1 = %d, ch1 = %c, num2 = %d\n", num1, ch1, num2);
    char ch2;
    int num3;
    scanf("%c%d",&ch2, &num3);
    printf("ch2 = %c, num3 = %d\n", ch2, num3);
}
```



- 利用fflush方法清空缓冲区(不是所有平台都能使用)
  + 格式: ```fflush(stdin);```
  + C和C++的标准里从来没有定义过 fflush(stdin)
  + MSDN 文档里清除的描述着"fflush on input stream is an extension to the C standard" （fflush 是在标准上扩充的函数, 不是标准函数, 所以不是所有平台都支持）
- 利用setbuf方法清空缓冲区(所有平台有效)
  + 格式: ```setbuf(stdin, NULL);```

```c
#include <stdio.h>
int main(){
    int num1;
    int num2;
    char ch1;
    scanf("%d%c%d", &num1, &ch1, &num2);
    printf("num1 = %d, ch1 = %c, num2 = %d\n", num1, ch1, num2);
    //fflush(stdin); // 清空输入缓存区
    setbuf(stdin, NULL); // 清空输入缓存区
    char ch2;
    int num3;
    scanf("%c%d",&ch2, &num3);
    printf("ch2 = %c, num3 = %d\n", ch2, num3);
}

```



## putchar和getchar

- putchar: 向屏幕输出一个字符

```c
#include <stdio.h>
int main(){
    char ch = 'a';
    putchar(ch); // 输出a
}
```

- getchar: 从键盘获得一个字符

```c
#include <stdio.h>
int main(){
    char ch;
    ch = getchar();// 获取一个字符
    printf("ch = %c\n", ch);
}
```

