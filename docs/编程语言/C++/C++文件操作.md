# C++文件操作

## 文件基本概念

- 文件流:

+  C 语言把文件看作是一个字符的序列，即文件是由一个一个字符组成的字符流，因此 c 语言将文件也称之为文件流。

- 文件分类

+ 文本文件
+ 以 ASCII 码格式存放，**一个字节存放一个字符**。` 文本文件的每一个字节存放一个 ASCII 码，代表一个字符`。这便于对字符的逐个处理，但占用存储空间
  较多，而且要花费时间转换。
+ .c文件就是以文本文件形式存放的

+ 二进制文件
+ 以补码格式存放。二进制文件是把数据以二进制数的格式存放在文件中的，其占用存储空间较少。`数据按其内存中的存储形式原样存放`
+ .exe文件就是以二进制文件形式存放的

---

- **文本文件和二进制文件示例**

+ 下列代码暂时不要求看懂, 主要理解什么是文本文件什么是二进制文件

```c
#include <stdio.h>

int main()
{
    /*
     * 以文本形式存储
     * 会将每个字符先转换为对应的ASCII,
     * 然后再将ASCII码的二进制存储到计算机中
     */
    int num = 666;
    FILE *fa = fopen("ascii.txt", "w");
    fprintf(fa, "%d", num);
    fclose(fa);

    /*
     * 以二进制形式存储
     * 会将666的二进制直接存储到文件中
     */
    FILE *fb = fopen("bin.txt", "w");
    fwrite(&num, 4, 1, fb);
    fclose(fb);

    return 0;
}
```

- 内存示意图
  ![](http://8.155.40.179:9000/blog/images/dad1e0ea2e1b456a8149e07e1c31f0a1/a989b57283bdbcd82ae8bfb0c6fb4b8d.png)

- 通过文本工具打开示意图
  ![](http://8.155.40.179:9000/blog/images/dad1e0ea2e1b456a8149e07e1c31f0a1/61ccbc31fd2ed870fde8de4598d52ee3.png)

>+ 文本工具默认会按照ASCII码逐个直接解码文件, 由于文本文件存储的就是ASCII码, 所以可以正常解析显示, 由于二进制文件存储的不是ASCII码, 所以解析出来之后是乱码

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。





## 文件的打开和关闭

- FILE 结构体

+ FILE 结构体是对缓冲区和文件读写状态的记录者，所有对文件的操作，都是通过FILE 结构体完成的。

```c
  struct _iobuf {
    char *_ptr;  //文件输入的下一个位置
    int _cnt;  //当前缓冲区的相对位置
    char *_base; //文件的起始位置)
    int _flag; //文件标志
    int _file;  //文件的有效性验证
    int _charbuf; //检查缓冲区状况,如果无缓冲区则不读取
    int _bufsiz; // 缓冲区大小
    char *_tmpfname; //临时文件名
  };
  typedef struct _iobuf FILE;
```

---

- fileopen函数

| 函数声明 | FILE * fopen ( const char * filename, const char * mode );   |
| -------- | ------------------------------------------------------------ |
| 所在文件 | stdio.h                                                      |
| 函数功能 | 以 mode 的方式，打开一个 filename 命名的文件，返回一个指向该文件缓冲的 FILE 结构体指针。 |

|参数及返回解析
|参数|	char*filaname	:要打开，或是创建文件的路径。|
|参数|	char*mode	:打开文件的方式。|
|返回值|	FILE*	返回指向文件缓冲区的指针，该指针是后序操作文件的句柄。|


| mode | 处理方式  | 当文件不存在时 | 当文件存在时     | 向文件输入 | 从文件输出 |
| ---- | --------- | -------------- | ---------------- | ---------- | ---------- |
| r    | 读取      | 出错           | 打开文件         | 不能       | 可以       |
| w    | 写入      | 建立新文件     | 覆盖原有文件     | 可以       | 不能       |
| a    | 追加      | 建立新文件     | 在原有文件后追加 | 可以       | 不能       |
| r+   | 读取/写入 | 出错           | 打开文件         | 可以       | 可以       |
| w+   | 写入/读取 | 建立新文件     | 覆盖原有文件     | 可以       | 可以       |
| a+   | 读取/追加 | 建立新文件     | 在原有文件后追加 | 可以       | 可以       |

> 注意点:
>
> + Windows如果读写的是二进制文件，则还要加 b,比如 rb, r+b 等。 unix/linux 不区分文本和二进制文件

---

- fclose函数

| 函数声明       | int fclose ( FILE * stream );                                |
| -------------- | ------------------------------------------------------------ |
| 所在文件       | stdio.h                                                      |
| 函数功能       | fclose()用来关闭先前 fopen()打开的文件.                      |
| 函数功能       | 此动作会让缓冲区内的数据写入文件中, 并释放系统所提供的文件资源 |
| 参数及返回解析 |                                                              |
| 参数           | FILE*	stream	:指向文件缓冲的指针。                     |
| 返回值         | int	成功返回 0 ，失败返回 EOF(-1)。                       |

```c
#include <stdio.h>

int main()
{
    FILE *fp = fopen("test.txt", "w+");
    fclose(fp);
    return 0;
}
```

--

## 一次读写一个字符

- 写入

| 函数声明       | int fputc (int ch, FILE * stream );                     |
| -------------- | ------------------------------------------------------- |
| 所在文件       | stdio.h                                                 |
| 函数功能       | 将 ch 字符，写入文件。                                  |
| 参数及返回解析 |                                                         |
| 参数           | FILE*	stream	:指向文件缓冲的指针。                |
| 参数           | int	: 需要写入的字符。                               |
| 返回值         | int	写入成功，返回写入成功字符，如果失败，返回 EOF。 |

```c
#include <stdio.h>

int main()
{
    // 1.打开一个文件
    FILE *fp = fopen("test.txt", "w+");

    // 2.往文件中写入内容
    for(char ch = 'a'; ch <= 'z'; ch++){
        // 一次写入一个字符
        char res = fputc(ch, fp);
        printf("res = %c\n", res);
    }

    // 3.关闭打开的文件
    fclose(fp);
    return 0;
}
```

- 读取

| 函数声明       | int fgetc ( FILE * stream );                              |
| -------------- | --------------------------------------------------------- |
| 所在文件       | stdio.h                                                   |
| 函数功能       | 从文件流中读取一个字符并返回。                            |
| 参数及返回解析 |                                                           |
| 参数           | FILE*	stream	:指向文件缓冲的指针。                  |
| 返回值         | int	正常，返回读取的字符；读到文件尾或出错时，为 EOF。 |

```c
#include <stdio.h>

int main()
{
    // 1.打开一个文件
    FILE *fp = fopen("test.txt", "r+");

    // 2.从文件中读取内容
    char res = EOF;
    while((res = fgetc(fp)) != EOF){
        printf("res = %c\n", res);
    }

    // 3.关闭打开的文件
    fclose(fp);
    return 0;
}
```

- 判断文件末尾
  + feof函数

| 函数声明       | int feof( FILE * stream );                   |
| -------------- | -------------------------------------------- |
| 所在文件       | stdio.h                                      |
| 函数功能       | 判断文件是否读到文件结尾                     |
| 参数及返回解析 |                                              |
| 参数           | FILE*	stream	:指向文件缓冲的指针。     |
| 返回值         | int	0 未读到文件结尾，非零 读到文件结尾。 |

```c
#include <stdio.h>

int main()
{
    // 1.打开一个文件
    FILE *fp = fopen("test.txt", "r+");

    // 2.从文件中读取内容
    char res = EOF;
    // 注意: 由于只有先读了才会修改标志位,
    // 所以通过feof判断是否到达文件末尾, 一定要先读再判断, 不能先判断再读
    while((res = fgetc(fp)) && (!feof(fp))){
        printf("res = %c\n", res);
    }

    // 3.关闭打开的文件
    fclose(fp);
    return 0;
}
```

>+ 注意点:
>+ feof 这个函数，是去读标志位判断文件是否结束的。
>+ 而标志位只有读完了才会被修改, 所以如果先判断再读标志位会出现多打一次的的现象
>+ 所以企业开发中使用feof函数一定要先读后判断, 而不能先判断后读

- 作业

+ 实现文件的简单加密和解密

```c
#include <stdio.h>
#include <string.h>
void encode(char *name, char *newName, int code);
void decode(char *name, char *newName, int code);
int main()
{
    encode("main.c", "encode.c", 666);
    decode("encode.c", "decode.c", 666);
    return 0;
}
/**
 * @brief encode 加密文件
 * @param name 需要加密的文件名称
 * @param newName 加密之后的文件名称
 * @param code 秘钥
 */
void encode(char *name, char *newName, int code){
    FILE *fw = fopen(newName, "w+");
    FILE *fr = fopen(name, "r+");
    char ch = EOF;
    while((ch = fgetc(fr)) && (!feof(fr))){
        fputc(ch ^ code, fw);
    }
    fclose(fw);
    fclose(fr);
}
/**
 * @brief encode 解密文件
 * @param name 需要解密的文件名称
 * @param newName 解密之后的文件名称
 * @param code 秘钥
 */
void decode(char *name, char *newName, int code){
    FILE *fw = fopen(newName, "w+");
    FILE *fr = fopen(name, "r+");
    char ch = EOF;
    while((ch = fgetc(fr)) && (!feof(fr))){
        fputc(ch ^ code, fw);
    }
    fclose(fw);
    fclose(fr);
}
```

---

## 一次读写一行字符

-  什么是行

+ 行是文本编辑器中的概念，文件流中就是一个字符。这个在不同的平台是有差异的。window 平台 '\r\n'，linux 平台是'\n'

-  平台差异

+ windows 平台在写入'\n'是会体现为'\r\n'，linux 平台在写入'\n'时会体现为'\n'。windows 平台在读入'\r\n'时，体现为一个字符'\n'，linux 平台在读入'\n'时，体现为一个字符'\n'
+ linux 读 windows 中的换行，则会多读一个字符，windows 读 linux 中的换行，则没有问题

```c
#include <stdio.h>

int main()
{
    FILE *fw = fopen("test.txt", "w+");
    fputc('a', fw);
    fputc('\n', fw);
    fputc('b', fw);
    fclose(fw);
    return 0;
}
```

![](http://8.155.40.179:9000/blog/images/dad1e0ea2e1b456a8149e07e1c31f0a1/1d80c69a41198813f0bb19cef89b74ea.png)

---

- 写入一行

| 函数声明       | int	fputs(char *str,FILE *fp)          |
| -------------- | ----------------------------------------- |
| 所在文件       | stdio.h                                   |
| 函数功能       | 把 str 指向的字符串写入 fp 指向的文件中。 |
| 参数及返回解析 |                                           |
| 参数           | char *	str : 表示指向的字符串的指针。  |
| 参数           | FILE *fp	: 指向文件流结构的指针。      |
| 返回值         | int	正常，返 0；出错返 EOF。           |

```c
#include <stdio.h>

int main()
{
    FILE *fw = fopen("test.txt", "w+");
    // 注意: fputs不会自动添加\n
    fputs("lnj\n", fw);
    fputs("it666\n", fw);
    fclose(fw);
    return 0;
}
```

- 遇到\0自动终止写入

```c
#include <stdio.h>

int main()
{
    FILE *fp = fopen("test.txt", "w+");
    // 注意: fputs写入时遇到\0就会自动终止写入
    fputs("lnj\0it666\n", fp);

    fclose(fp);
    return 0;
}

```

---

- 读取一行

| 函数声明       | char 	*fgets(char 	*str,int length,FILE *fp)           |
| -------------- | ------------------------------------------------------------ |
| 所在文件       | stdio.h                                                      |
| 函数功能       | 从 fp 所指向的文件中，至多读 length-1 个字符，送入字符数组 str 中， 如果在读入 length-1 个字符结束前遇\n 或 EOF，读入即结束，字符串读入后在最后加一个‘\0’字符。 |
| 参数及返回解析 |                                                              |
| 参数           | char *	str :指向需要读入数据的缓冲区。                    |
| 参数           | int length :每一次读数字符的字数。                           |
| 参数           | FILE*  fp :文件流指针。                                      |
| 返回值         | char *	正常，返 str 指针；出错或遇到文件结尾 返空指针 NULL。 |

- 最多只能读取N-1个字符

```c
#include <stdio.h>

int main()
{
    FILE *fp = fopen("test.txt", "w+");
    // 注意: fputs不会自动添加\n
    fputs("it666\n", fp);

    // 将FILE结构体中的读写指针重新移动到最前面
    // 注意: FILE结构体中读写指针每读或写一个字符后都会往后移动
    rewind(fp);
    char str[1024];
    // 从fp中读取4个字符, 存入到str中
    // 最多只能读取N-1个字符, 会在最后自动添加\0
    fgets(str, 4, fp);

    printf("str = %s", str); // it6
    fclose(fp);
    return 0;
}

```

- 遇到\n自动结束

```c
#include <stdio.h>
int main()
{
    FILE *fp = fopen("test.txt", "w+");
    // 注意: fputs不会自动添加\n
    fputs("lnj\n", fp);
    fputs("it666\n", fp);

    // 将FILE结构体中的读写指针重新移动到最前面
    // 注意: FILE结构体中读写指针每读或写一个字符后都会往后移动
    rewind(fp);
    char str[1024];
    // 从fp中读取1024个字符, 存入到str中
    // 但是读到第4个就是\n了, 函数会自动停止读取
    // 注意点: \n会被读取进来
    fgets(str, 1024, fp);

    printf("str = %s", str); // lnj
    fclose(fp);
    return 0;
}

```

- 读取到EOF自动结束

```c
#include <stdio.h>

int main()
{
    FILE *fp = fopen("test.txt", "w+");
    // 注意: fputs不会自动添加\n
    fputs("lnj\n", fp);
    fputs("it666", fp);

    // 将FILE结构体中的读写指针重新移动到最前面
    // 注意: FILE结构体中读写指针每读或写一个字符后都会往后移动
    rewind(fp);
    char str[1024];
    // 每次从fp中读取1024个字符, 存入到str中
    // 读取到文件末尾自动结束
    while(fgets(str, 1024, fp)){
        printf("str = %s", str);
    }
    fclose(fp);
    return 0;
}

```

- 注意点:
  + 企业开发中能不用feof函数就不用feof函数
  + 如果最后一行，没有行‘\n’的话则少读一行

```c
#include <stdio.h>

int main()
{
    FILE *fp = fopen("test.txt", "w+");
    // 注意: fputs不会自动添加\n
    fputs("12345678910\n", fp);
    fputs("12345678910\n", fp);
    fputs("12345678910", fp);

    // 将FILE结构体中的读写指针重新移动到最前面
    // 注意: FILE结构体中读写指针每读或写一个字符后都会往后移动
    rewind(fp);
    char str[1024];
    // 每次从fp中读取1024个字符, 存入到str中
    // 读取到文件末尾自动结束
    while(fgets(str, 1024, fp) && !feof(fp)){
        printf("str = %s", str);
    }
    fclose(fp);
    return 0;
}

```

- 作业:
  + 利用fgets(str, 5, fp)读取下列文本会读取多少次?

```
12345678910
12345
123

```

---

## 一次读写一块数据

+ C 语言己经从接口的层面区分了，文本的读写方式和二进制的读写方式。前面我们讲的是文本的读写方式。
+ 所有的文件接口函数，要么以 '\0'，表示输入结束，要么以 '\n'， EOF(0xFF)表示读取结束。 '\0'	'\n' 等都是文本文件的重要标识，而所有的二进制接口对于这些标识，是不敏感的。
  +二进制的接口可以读文本，而文本的接口不可以读二进制

- 一次写入一块数据

|函数声明|	int fwrite(void *buffer, int num_bytes, int count, FILE *fp)|
|--|--|	
|所在文件|	stdio.h|
|函数功能|	把buffer 指向的数据写入fp 指向的文件中|
|参数|	char *	buffer	:	指向要写入数据存储区的首地址的指针|
|| int num_bytes: 每个要写的字段的字节数count|
|| int count	:	要写的字段的个数|
||FILE* fp	:	要写的文件指针|
|返回值|	int	成功，返回写的字段数；出错或文件结束，返回 0。|

```c
#include <stdio.h>
#include <string.h>

int main()
{
    FILE *fp = fopen("test.txt", "wb+");
    // 注意: fwrite不会关心写入数据的格式
    char *str = "lnj\0it666";
     /*
     * 第一个参数: 被写入数据指针
     * 第二个参数: 每次写入多少个字节
     * 第三个参数: 需要写入多少次
     * 第四个参数: 已打开文件结构体指针
     */
    fwrite((void *)str, 9, 1, fp);

    fclose(fp);
    return 0;
}

```

- 一次读取一块数据

|函数声明|int	fread(void  *buffer,  int  num_bytes,  int count, FILE	*fp)|
|--|--|	
|所在文件|	stdio.h|
|函数功能|	把fp 指向的文件中的数据读到 buffer 中。|
|参数|	char *	buffer	:	指向要读入数据存储区的首地址的指针|
|| int num_bytes: 每个要读的字段的字节数count|
|| int count	:	要读的字段的个数|
||FILE* fp	:	要读的文件指针|
|返回值|	int	成功，返回读的字段数；出错或文件结束，返回 0。|

```c
#include <stdio.h>

int main()
{
    // test.txt中存放的是"lnj\0it666"
    FILE *fr = fopen("test.txt", "rb+");
    char buf[1024] = {0};
    // fread函数读取成功返回读取到的字节数, 读取失败返回0
    /*
     * 第一个参数: 存储读取到数据的容器
     * 第二个参数: 每次读取多少个字节
     * 第三个参数: 需要读取多少次
     * 第四个参数: 已打开文件结构体指针
     */ 
    int n = fread(buf, 1, 1024, fr);
    printf("%i\n", n);
    for(int i = 0; i < n; i++){
        printf("%c", buf[i]);
    }
    fclose(fr);
    return 0;
}

```

>+ 注意点:
>+ 读取时num_bytes应该填写读取数据类型的最小单位, 而count可以随意写
>+ 如果读取时num_bytes不是读取数据类型最小单位, 会引发读取失败
>+ 例如:  存储的是char类型  6C 6E 6A 00 69 74 36 36 36
>  如果num_bytes等于1, count等于1024, 那么依次取出 6C 6E 6A 00 69 74 36 36 36 , 直到取不到为止
>  如果num_bytes等于4, count等于1024, 那么依次取出[6C 6E 6A 00][69 74 36 36] , 但是最后还剩下一个36, 但又不满足4个字节, 那么最后一个36则取不到

```c
#include <stdio.h>
#include <string.h>

int main()
{

    // test.txt中存放的是"lnj\0it666"
    FILE *fr = fopen("test.txt", "rb+");
    char buf[1024] = {0};
    /*
    while(fread(buf, 4, 1, fr) > 0){
        printf("%c\n", buf[0]);
        printf("%c\n", buf[1]);
        printf("%c\n", buf[2]);
        printf("%c\n", buf[3]);
    }
    */
    /*
    while(fread(buf, 1, 4, fr) > 0){
        printf("%c\n", buf[0]);
        printf("%c\n", buf[1]);
        printf("%c\n", buf[2]);
        printf("%c\n", buf[3]);
    }
    */
    while(fread(buf, 1, 1, fr) > 0){
        printf("%c\n", buf[0]);
    }
    fclose(fr);
    return 0;
}

```

>+ 注意: fwrite和fread本质是用来操作二进制的
>+ 所以下面用法才是它们的正确打开姿势

```c
#include <stdio.h>

int main()
{

    FILE *fp = fopen("test.txt", "wb+");
    int ages[4] = {1, 3, 5, 6};
    fwrite(ages, sizeof(ages), 1, fp);
    rewind(fp);
    int data;
    while(fread(&data, sizeof(int), 1, fp) > 0){
        printf("data = %i\n", data);
    }
    return 0;
}

```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。





## 读写结构体

- 结构体中的数据类型不统一，此时最适合用二进制的方式进行读写
- 读写单个结构体

```c
#include <stdio.h>

typedef struct{
    char *name;
    int age;
    double height;
} Person;

int main()
{
    Person p1 = {"lnj", 35, 1.88};
//    printf("name = %s\n", p1.name);
//    printf("age = %i\n", p1.age);
//    printf("height = %lf\n", p1.height);

    FILE *fp = fopen("person.stu", "wb+");
    fwrite(&p1, sizeof(p1), 1, fp);

    rewind(fp);
    Person p2;
    fread(&p2, sizeof(p2), 1, fp);
    printf("name = %s\n", p2.name);
    printf("age = %i\n", p2.age);
    printf("height = %lf\n", p2.height);

    return 0;
}
```

- 读写结构体数组

```c
#include <stdio.h>

typedef struct{
    char *name;
    int age;
    double height;
} Person;

int main()
{
    Person ps[] = {
      {"zs", 18, 1.65},
      {"ls", 21, 1.88},
      {"ww", 33, 1.9}
    };


    FILE *fp = fopen("person.stu", "wb+");
    fwrite(&ps, sizeof(ps), 1, fp);

    rewind(fp);
    Person p;
    while(fread(&p, sizeof(p), 1, fp) > 0){
        printf("name = %s\n", p.name);
        printf("age = %i\n", p.age);
        printf("height = %lf\n", p.height);
    }
    return 0;
}
```

- 读写结构体链表

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct person{
    char *name;
    int age;
    double height;
    struct person* next;
} Person;
Person *createEmpty();
void  insertNode(Person *head, char *name, int age, double height);
void printfList(Person *head);
int saveList(Person *head, char *name);
Person *loadList(char *name);

int main()
{

//    Person *head = createEmpty();
//    insertNode(head, "zs", 18, 1.9);
//    insertNode(head, "ls", 22, 1.65);
//    insertNode(head, "ws", 31, 1.78);
//    printfList(head);
//    saveList(head, "person.list");
    Person *head = loadList("person.list");
    printfList(head);
    return 0;
}

/**
 * @brief loadList 从文件加载链表
 * @param name 文件名称
 * @return  加载好的链表头指针
 */
Person *loadList(char *name){
    // 1.打开文件
    FILE *fp = fopen(name, "rb+");
    if(fp == NULL){
        return NULL;
    }
    // 2.创建一个空链表
    Person *head = createEmpty();
    // 3.创建一个节点
    Person *node = (Person *)malloc(sizeof(Person));
    while(fread(node, sizeof(Person), 1, fp) > 0){
        // 3.进行插入
        // 3.1让新节点的下一个节点 等于 头节点的下一个节点
        node->next = head->next;
        // 3.2让头结点的下一个节点 等于 新节点
        head->next = node;

        // 给下一个节点申请空间
        node = (Person *)malloc(sizeof(Person));
    }
    // 释放多余的节点空间
    free(node);
    fclose(fp);
    return head;
}

/**
 * @brief saveList 存储链表到文件
 * @param head 链表头指针
 * @param name 存储的文件名称
 * @return  是否存储成功 -1失败 0成功
 */
int saveList(Person *head, char *name){
    // 1.打开文件
    FILE *fp = fopen(name, "wb+");
    if(fp == NULL){
        return -1;
    }
    // 2.取出头节点的下一个节点
    Person *cur = head->next;
    // 3.将所有有效节点保存到文件中
    while(cur != NULL){
        fwrite(cur, sizeof(Person), 1, fp);
        cur = cur->next;
    }
    fclose(fp);
    return 0;
}
/**
 * @brief printfList 遍历链表
 * @param head 链表的头指针
 */
void printfList(Person *head){
    // 1.取出头节点的下一个节点
    Person *cur = head->next;
    // 2.判断是否为NULL, 如果不为NULL就开始遍历
    while(cur != NULL){
        // 2.1取出当前节点的数据, 打印
        printf("name = %s\n", cur->name);
        printf("age = %i\n", cur->age);
        printf("height = %lf\n", cur->height);
        printf("next = %x\n", cur->next);
        printf("-----------\n");
        // 2.2让当前节点往后移动
        cur = cur->next;
    }
}

/**
 * @brief insertNode 插入新的节点
 * @param head 链表的头指针
 * @param p 需要插入的结构体
 */
void  insertNode(Person *head, char *name, int age, double height){
    // 1.创建一个新的节点
    Person *node = (Person *)malloc(sizeof(Person));
    // 2.将数据保存到新节点中
    node->name = name;
    node->age = age;
    node->height = height;

    // 3.进行插入
    // 3.1让新节点的下一个节点 等于 头节点的下一个节点
    node->next = head->next;
    // 3.2让头结点的下一个节点 等于 新节点
    head->next = node;
}
/**
 * @brief createEmpty 创建一个空链表
 * @return 链表头指针, 创建失败返回NULL
 */
Person *createEmpty(){
    // 1.定义头指针
    Person *head = NULL;
    // 2.创建一个空节点, 并且赋值给头指针
    head = (Person *)malloc(sizeof(Person));
    if(head == NULL){
        return head;
    }
    head->next = NULL;
    // 3.返回头指针
    return head;
}
```

## 

最后，如果有任何疑问，请加微信 **leader_fengy** 拉你进学习交流群。

开源不易，码字不易，如果觉得有价值，欢迎分享支持。



## 其它文件操作函数

-  ftell 函数

| 函数声明       | long	ftell ( FILE * stream );                             |
| -------------- | ------------------------------------------------------------ |
| 所在文件       | stdio.h                                                      |
| 函数功能       | 得到流式文件的当前读写位置,其返回值是当前读写位置偏离文件头部的字节数. |
| 参数及返回解析 |                                                              |
| 参数           | FILE *	流文件句柄                                         |
| 返回值         | int	成功，返回当前读写位置偏离文件头部的字节数。失败， 返回-1 |

```c
#include <stdio.h>

int main()
{
    char *str = "123456789";
    FILE *fp = fopen("test.txt", "w+");
    long cp = ftell(fp);
    printf("cp = %li\n", cp); // 0
    // 写入一个字节
    fputc(str[0], fp);
    cp = ftell(fp);
    printf("cp = %li\n", cp); // 1
    fclose(fp);
    return 0;
}
```

- rewind 函数

| 函数声明                                     | void rewind ( FILE * stream ); |
| -------------------------------------------- | ------------------------------ |
| 所在文件                                     | stdio.h                        |
| 函数功能	将文件指针重新指向一个流的开头。 |                                |
| 参数及返回解析                               |                                |
| 参数                                         | FILE *	流文件句柄           |
| 返回值                                       | void	无返回值               |

```c
#include <stdio.h>

int main()
{
    char *str = "123456789";
    FILE *fp = fopen("test.txt", "w+");
    long cp = ftell(fp);
    printf("cp = %li\n", cp); // 0
    // 写入一个字节
    fputc(str[0], fp);
    cp = ftell(fp);
    printf("cp = %li\n", cp); // 1
    // 新指向一个流的开头
    rewind(fp);
    cp = ftell(fp);
    printf("cp = %li\n", cp); // 0
    fclose(fp);
    return 0;
}
```

- fseek 函数

| 函数声明       | int fseek ( FILE * stream, long	offset, int where); |
| -------------- | ------------------------------------------------------ |
| 所在文件       | stdio.h                                                |
| 函数功能       | 偏移文件指针。                                         |
| 参数及返回解析 |                                                        |
| 参	数       | FILE * stream	文件句柄                              |
|                | long	offset	偏移量                               |
|                | int	where	偏移起始位置                           |
| 返回值         | int	成功返回 0 ，失败返回-1                         |

- 常用宏

```c
#define SEEK_CUR 1 当前文字
#define SEEK_END 2 文件结尾
#define SEEK_SET 0 文件开头
```

```c
#include <stdio.h>

int main()
{
    FILE *fp = fopen("test.txt", "w+");
    fputs("123456789", fp);
    // 将文件指针移动到文件结尾, 并且偏移0个单位
    fseek(fp, 0, SEEK_END);
    int len = ftell(fp); // 计算文件长度
    printf("len = %i\n", len);
    fclose(fp);
    return 0;
}
```

```c
#include <stdio.h>

int main()
{
    FILE *fp;
   fp = fopen("file.txt","w+");
   fputs("123456789", fp);

   fseek( fp, 7, SEEK_SET );
   fputs("lnj", fp);
   fclose(fp);
    return 0;
}
```

### 捐赠支持

项目的发展离不开你的支持，如果 **CNote** 帮助到你打开编程的大门，请作者喝杯咖啡吧 ☕ 后续我们会继续完善更新！加油！

[点击捐赠支持作者](https://www.yuque.com/docs/share/25942927-f732-4f94-a670-154a9c7b06d3)

### 联系我

![](http://8.155.40.179:9000/blog/images/dad1e0ea2e1b456a8149e07e1c31f0a1/Feng.png)

### 公众号

如果大家想要实时关注我们更新的文章以及分享的干货的话，可以关注我们的微信公众号“**代码情缘**”。

![我的公众号](http://8.155.40.179:9000/blog/images/dad1e0ea2e1b456a8149e07e1c31f0a1/qrcode_for_gh_2e49316aa973_344.jpg)