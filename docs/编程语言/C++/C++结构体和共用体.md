# C++结构体和共用体

## 什么是结构体

- 结构体和数组一样属于构造类型
- 数组是用于保存一组相同类型数据的, 而结构体是用于保存一组不同类型数组的
- 例如,在学生登记表中,姓名应为字符型;学号可为整型或字符型;年龄应为整型;性别应为字符型;成绩可为整型或实型。
- 显然这组数据不能用数组来存放, 为了解决这个问题,C语言中给出了另一种构造数据类型——“结构(structure)”或叫“结构体”。

---

## 定义结构体类型

- 在使用结构体之前必须先定义结构体类型, 因为C语言不知道你的结构体中需要存储哪些类型数据, 我们必须通过定义结构体类型来告诉C语言, 我们的结构体中需要存储哪些类型的数据
- 格式:

```c
struct　结构体名{
     类型名1　成员名1;
     类型名2　成员名2;
     ……
     类型名n　成员名n;
 };
```

- 示例:

```c
struct Student {
    char *name; // 姓名
    int age; // 年龄
    float height; // 身高
};
```

---

## 定义结构体变量

- 定好好结构体类型之后, 我们就可以利用我们定义的结构体类型来定义结构体变量
- 格式: ```struct 结构体名 结构体变量名;```
  ![](http://8.155.40.179:9000/blog/images/52b3be27ca956105ed259a711cfba774/a19ef99bede1b3b0d689959881390bd0.png)

- 先定义结构体类型，再定义变量

```c
struct Student {
     char *name;
     int age;
 };

 struct Student stu;
```

- 定义结构体类型的同时定义变量

```c
struct Student {
    char *name;
    int age;
} stu;
```

- 匿名结构体定义结构体变量

```c
struct {
    char *name;
    int age;
} stu;
```

>+ 第三种方法与第二种方法的区别在于,第三种方法中省去了结构体类型名称,而直接给出结构变量,这种结构体最大的问题是结构体类型不能复用

---

## 结构体成员访问

- 一般对结构体变量的操作是以成员为单位进行的，引用的一般形式为：```结构体变量名.成员名```

```c
struct Student {
     char *name;
     int age;
 };
 struct Student stu;
 // 访问stu的age成员
 stu.age = 27;
 printf("age = %d", stu.age);
```

---

## 结构体变量的初始化

- 定义的同时按顺序初始化

```c
struct Student {
     char *name;
     int age;
 };
struct Student stu = {“lnj", 27};
```

- 定义的同时不按顺序初始化

```c
struct Student {
     char *name;
     int age;
 };
struct Student stu = {.age = 35, .name = “lnj"};
```

- 先定义后逐个初始化

```c
struct Student {
     char *name;
     int age;
 };
 struct Student stu;
stu.name = "lnj";
stu.age = 35;

```

- 先定义后一次性初始化

```c
struct Student {
     char *name;
     int age;
 };
struct Student stu;
stu2 = (struct Student){"lnj", 35};

```

---

## 结构体类型作用域

- 结构类型定义在函数内部的作用域与局部变量的作用域是相同的

+ 从定义的那一行开始, 直到遇到return或者大括号结束为止

- 结构类型定义在函数外部的作用域与全局变量的作用域是相同的

+ 从定义的那一行开始,直到本文件结束为止

```c
//定义一个全局结构体,作用域到文件末尾
struct Person{
    int age;
    char *name;
};

int main(int argc, const char * argv[])
{
    //定义局部结构体名为Person,会屏蔽全局结构体
    //局部结构体作用域,从定义开始到“}”块结束
    struct Person{
        int age;
    };
    // 使用局部结构体类型
    struct Person pp;
    pp.age = 50;
    pp.name = "zbz";

    test();
    return 0;
}

void test() {

    //使用全局的结构体定义结构体变量p
    struct Person p = {10,"sb"};
    printf("%d,%s\n",p.age,p.name);
}

```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## 结构体数组

- 结构体数组和普通数组并无太大差异, 只不过是数组中的元素都是结构体而已
- 格式:  ```struct 结构体类型名称 数组名称[元素个数]```

```c
struct Student {
    char *name;
    int age;
};
struct Student stu[2]; 
```

- 结构体数组初始化和普通数组也一样, 分为先定义后初始化和定义同时初始化
  + 定义同时初始化

```c
struct Student {
    char *name;
    int age;
};
struct Student stu[2] = {{"lnj", 35},{"zs", 18}}; 
```

- + 先定义后初始化

```c
struct Student {
    char *name;
    int age;
};
struct Student stu[2]; 
stu[0] = {"lnj", 35};
stu[1] = {"zs", 18};
```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## 结构体指针

- 一个指针变量当用来指向一个结构体变量时,称之为结构体指针变量
- 格式: ```struct 结构名 *结构指针变量名```
- 示例:

```c
      // 定义一个结构体类型
      struct Student {
          char *name;
          int age;
      };

     // 定义一个结构体变量
     struct Student stu = {“lnj", 18};

     // 定义一个指向结构体的指针变量
     struct Student *p;

    // 指向结构体变量stu
    p = &stu;

     /*
      这时候可以用3种方式访问结构体的成员
      */
     // 方式1：结构体变量名.成员名
     printf("name=%s, age = %d \n", stu.name, stu.age);

     // 方式2：(*指针变量名).成员名
     printf("name=%s, age = %d \n", (*p).name, (*p).age);

     // 方式3：指针变量名->成员名
     printf("name=%s, age = %d \n", p->name, p->age);

     return 0;
 }
```

- 通过结构体指针访问结构体成员, 可以通过以下两种方式

+ (*结构指针变量).成员名
+ 结构指针变量->成员名(用熟)

>+ (pstu)两侧的括号不可少,因为成员符“.”的优先级高于“”。 
>+ 如去掉括号写作pstu.num则等效于(pstu.num),这样,意义就完全不对了。

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## 结构体内存分析

- 给结构体变量开辟存储空间和给普通开辟存储空间一样, 会从内存地址大的位置开始开辟
- 给结构体成员开辟存储空间和给数组元素开辟存储空间一样, 会从所占用内存地址小的位置开始开辟
- 结构体变量占用的内存空间永远是所有成员中占用内存最大成员的倍数(对齐问题)

>+多实际的计算机系统对基本类型数据在内存中存放的位置有限制,它们会要求这些数据的起始地址的值是 某个数k的倍数,这就是所谓的内存对齐,而这个k则被称为该数据类型的对齐模数(alignment modulus)。
>
>+ 这种强制的要求一来简化了处理器与内存之间传输系统的设计,二来可以提升读取数据的速度。比如这么一种处理器,它每次读写内存的时候都从某个8倍数的地址开始,一次读出或写入8个字节的数据,假如软件能 保证double类型的数据都从8倍数地址开始,那么读或写一个double类型数据就只需要一次内存操作。否则,我们就可能需要两次内存操作才能完成这个动作,因为数据或许恰好横跨在两个符合对齐要求的8字节 内存块上



最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## 结构体变量占用存储空间大小

```c
    struct Person{
        int age; // 4
        char ch; // 1
        double score; // 8
    };
    struct Person p;
    printf("sizeof = %i\n", sizeof(p)); // 16
```

- 占用内存最大属性是score, 占8个字节, 所以第一次会分配8个字节
- 将第一次分配的8个字节分配给age4个,分配给ch1个, 还剩下3个字节
- 当需要分配给score时, 发现只剩下3个字节, 所以会再次开辟8个字节存储空间
- 一共开辟了两次8个字节空间, 所以最终p占用16个字节

```c
    struct Person{
        int age; // 4
        double score; // 8
        char ch; // 1
    };
    struct Person p;
    printf("sizeof = %i\n", sizeof(p)); // 24
```

- 占用内存最大属性是score, 占8个字节, 所以第一次会分配8个字节
- 将第一次分配的8个字节分配给age4个,还剩下4个字节
- 当需要分配给score时, 发现只剩下4个字节, 所以会再次开辟8个字节存储空间
- 将新分配的8个字节分配给score, 还剩下0个字节
- 当需要分配给ch时, 发现上一次分配的已经没有了, 所以会再次开辟8个字节存储空间
- 一共开辟了3次8个字节空间, 所以最终p占用24个字节

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## 结构体嵌套定义

- 成员也可以又是一个结构,即构成了嵌套的结构

```c
struct Date{
     int month;
     int day;
     int year;
}
struct  stu{
     int num;
    char *name;
    char sex;
    struct Date birthday;
    Float score;
}
```

- 在stu中嵌套存储Date结构体内容
  ![](http://8.155.40.179:9000/blog/images/52b3be27ca956105ed259a711cfba774/de4aedd768012888dc7b2e70a744c86d.png)

>+ 注意:
>+ 结构体不可以嵌套自己变量,可以嵌套指向自己这种类型的指针
>
>```c
>struct Student {
>int age;
>struct Student stu;
>};
>```

- 对嵌套结构体成员的访问
  + 如果某个成员也是结构体变量，可以连续使用成员运算符"."访问最低一级成员

```c
struct Date {
       int year;
       int month;
       int day;
  };

  struct Student {
      char *name;
      struct Date birthday;
 };

 struct Student stu;
 stu.birthday.year = 1986;
 stu.birthday.month = 9;
 stu.birthday.day = 10;
```

---

## 结构体和函数

- 结构体虽然是构造类型, 但是结构体之间赋值是值拷贝, 而不是地址传递

```c
    struct Person{
        char *name;
        int age;
    };
    struct Person p1 = {"lnj", 35};
    struct Person p2;
    p2 = p1;
    p2.name = "zs"; // 修改p2不会影响p1
    printf("p1.name = %s\n", p1.name); // lnj
    printf("p2.name = %s\n", p2.name); //  zs
```

- 所以结构体变量作为函数形参时也是值传递, 在函数内修改形参, 不会影响外界实参

```c
#include <stdio.h>

struct Person{
    char *name;
    int age;
};

void test(struct Person per);

int main()
{
    struct Person p1 = {"lnj", 35};
    printf("p1.name = %s\n", p1.name); // lnj
    test(p1);
    printf("p1.name = %s\n", p1.name); // lnj
    return 0;
}
void test(struct Person per){
    per.name = "zs";
}
```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。





## 共用体

- 和结构体不同的是, 结构体的每个成员都是占用一块独立的存储空间, 而共用体所有的成员都占用同一块存储空间
- 和结构体一样, 共用体在使用之前必须先定义共用体类型, 再定义共用体变量
- 定义共用体类型格式:

```c
union 共用体名{
    数据类型 属性名称;
    数据类型 属性名称;
    ...   ....
};
```

- 定义共用体类型变量格式:

```c
union 共用体名 共用体变量名称;
```

- 特点: 由于所有属性共享同一块内存空间, 所以只要其中一个属性发生了改变, 其它的属性都会受到影响
- 示例:

```c
    union Test{
        int age;
        char ch;
    };
    union Test t;
    printf("sizeof(p) = %i\n", sizeof(t));

    t.age = 33;
    printf("t.age = %i\n", t.age); // 33
    t.ch = 'a';
    printf("t.ch = %c\n", t.ch); // a
    printf("t.age = %i\n", t.age); // 97
```

- 共用体的应用场景
  + （1）通信中的数据包会用到共用体，因为不知道对方会发送什么样的数据包过来，用共用体的话就简单了，定义几种格式的包，收到包之后就可以根据包的格式取出数据。
  + （2）节约内存。如果有2个很长的数据结构，但不会同时使用，比如一个表示老师，一个表示学生，要统计老师和学生的情况，用结构体就比较浪费内存，这时就可以考虑用共用体来设计。
    +（3）某些应用需要大量的临时变量，这些变量类型不同，而且会随时更换。而你的堆栈空间有限，不能同时分配那么多临时变量。这时可以使用共用体让这些变量共享同一个内存空间，这些临时变量不用长期保存，用完即丢，和寄存器差不多，不用维护。

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。