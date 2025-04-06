# C语言字符串操作

C语言中的字符串操作是非常基础但又非常重要的，因为字符串在很多程序中都起着至关重要的作用。C语言的字符串与其他语言不同，它没有专门的字符串类型，而是通过字符数组（`char` 数组）来表示字符串。操作字符串时，通常会涉及到字符数组、指针、标准库函数等。以下是C语言字符串操作的详细介绍。

### 1. 字符串的表示

在C语言中，字符串是以 `char` 数组的形式存储的，且以 **空字符**（`\0`）作为结束标志。因此，C语言中的字符串实际是一个字符数组，且最后一个字符是 `\0`，这表示字符串的结束。

#### 1.1 字符串声明

```c
char str[10];  // 声明一个字符数组，可以容纳10个字符（包括最后的'\0'）
char str[] = "Hello";  // 使用字符串字面量初始化数组，自动计算大小
```

注意：`char str[] = "Hello";` 会为字符串分配6个字符的空间（5个字符 + 1个 `\0` 结尾符）。

#### 1.2 字符串是字符数组

```c
char str[] = "Hello";
printf("%c\n", str[0]);  // 输出 'H'
printf("%c\n", str[4]);  // 输出 'o'
```

### 2. 字符串操作的标准库函数

C语言标准库提供了一系列字符串操作函数，这些函数定义在 `` 头文件中。常用的字符串操作函数包括：

#### 2.1 `strlen()` —— 获取字符串长度

`strlen()` 返回字符串的长度（不包括空字符`\0`）。

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str[] = "Hello, World!";
    printf("Length of string: %zu\n", strlen(str));  // 输出 13
    return 0;
}
```

#### 2.2 `strcpy()` —— 字符串复制

`strcpy()` 用于将源字符串复制到目标字符串中。注意，目标数组需要有足够的空间来存储源字符串及其空字符。

```c
#include <stdio.h>
#include <string.h>

int main() {
    char src[] = "Hello";
    char dest[20];
    strcpy(dest, src);  // 将 src 的内容复制到 dest
    printf("Copied string: %s\n", dest);  // 输出 "Hello"
    return 0;
}
```

#### 2.3 `strncpy()` —— 限制字符数的字符串复制

`strncpy()` 用于将源字符串的前 `n` 个字符复制到目标字符串。它比 `strcpy()` 更安全，因为可以指定最大复制字符数，避免溢出。

```c
#include <stdio.h>
#include <string.h>

int main() {
    char src[] = "Hello, World!";
    char dest[10];
    strncpy(dest, src, 5);  // 只复制前 5 个字符
    dest[5] = '\0';  // 添加终止符
    printf("Copied string: %s\n", dest);  // 输出 "Hello"
    return 0;
}
```

#### 2.4 `strcat()` —— 字符串连接

`strcat()` 用于将两个字符串连接在一起，目标字符串的末尾会追加源字符串的内容。

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[20] = "Hello";
    char str2[] = " World!";
    strcat(str1, str2);  // 将 str2 连接到 str1 后面
    printf("Concatenated string: %s\n", str1);  // 输出 "Hello World!"
    return 0;
}
```

#### 2.5 `strncat()` —— 限制字符数的字符串连接

`strncat()` 用于将源字符串的前 `n` 个字符连接到目标字符串后。

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[20] = "Hello";
    char str2[] = " World!";
    strncat(str1, str2, 6);  // 只连接前 6 个字符
    printf("Concatenated string: %s\n", str1);  // 输出 "Hello Wor"
    return 0;
}
```

#### 2.6 `strcmp()` —— 字符串比较

`strcmp()` 用于比较两个字符串。如果字符串相同，返回 `0`；如果不同，返回一个负值或正值，取决于哪个字符串字典顺序较小。

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[] = "Hello";
    char str2[] = "World";
    if (strcmp(str1, str2) == 0) {
        printf("Strings are equal\n");
    } else {
        printf("Strings are not equal\n");  // 输出 "Strings are not equal"
    }
    return 0;
}
```

#### 2.7 `strncmp()` —— 限制字符数的字符串比较

`strncmp()` 用于比较两个字符串的前 `n` 个字符。

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[] = "Hello";
    char str2[] = "Hellooo";
    if (strncmp(str1, str2, 4) == 0) {
        printf("First 4 characters are equal\n");  // 输出 "First 4 characters are equal"
    }
    return 0;
}
```

#### 2.8 `strchr()` —— 查找字符

`strchr()` 查找字符串中首次出现指定字符的位置。如果找到字符，返回该字符的指针，否则返回 `NULL`。

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str[] = "Hello, World!";
    char *ptr = strchr(str, 'W');
    if (ptr != NULL) {
        printf("Character found at position: %ld\n", ptr - str);  // 输出 7
    } else {
        printf("Character not found\n");
    }
    return 0;
}
```

#### 2.9 `strstr()` —— 查找子字符串

`strstr()` 用于查找一个字符串在另一个字符串中首次出现的位置。如果找到，返回该位置的指针，否则返回 `NULL`。

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str[] = "Hello, World!";
    char *ptr = strstr(str, "World");
    if (ptr != NULL) {
        printf("Substring found at position: %ld\n", ptr - str);  // 输出 7
    } else {
        printf("Substring not found\n");
    }
    return 0;
}
```

### 3. 自定义字符串操作函数

除了标准库函数，你还可以根据需求编写自己的字符串操作函数。例如，写一个简单的 `my_strlen` 来计算字符串的长度：

```c
#include <stdio.h>

int my_strlen(const char *str) {
    int length = 0;
    while (*str != '\0') {
        length++;
        str++;
    }
    return length;
}

int main() {
    char str[] = "Hello";
    printf("Length of string: %d\n", my_strlen(str));  // 输出 5
    return 0;
}
```

### 4. 字符串的输入与输出

#### 4.1 使用 `printf()` 输出字符串

```c
#include <stdio.h>

int main() {
    char str[] = "Hello, World!";
    printf("%s\n", str);  // 输出 "Hello, World!"
    return 0;
}
```

#### 4.2 使用 `scanf()` 输入字符串

使用 `scanf()` 输入字符串时，不能包含空格。`scanf("%s", str)` 会将字符串按空格分开。如果需要输入带空格的字符串，可以使用 `fgets()`。

```c
#include <stdio.h>

int main() {
    char str[100];
    scanf("%s", str);  // 只能输入一个单词，遇到空格停止
    printf("You entered: %s\n", str);
    return 0;
}
```

#### 4.3 使用 `fgets()` 输入字符串

`fgets()` 可以读取带空格的字符串，直到遇到换行符或文件结束。

```c
#include <stdio.h>

int main() {
    char str[100];
    fgets(str, sizeof(str), stdin);  // 读取整行
    printf("You entered: %s", str);
    return 0;
}
```

### 5. 总结

C语言中的字符串操作是非常重要的，虽然没有内置的字符串类型，但通过字符数组和指针，可以实现各种灵活的字符串操作。C标准库提供了丰富的字符串处理函数，如 `strlen()`、`strcpy()`、`strcat()` 等，帮助开发者高效地处理字符串。在使用字符串时，要特别注意内存管理，避免越界访问和内存泄漏等问题。