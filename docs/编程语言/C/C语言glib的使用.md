# C语言glib的使用

`glib` 是一个广泛使用的 C 语言库，提供了许多有用的功能，比如数据结构、算法、内存管理、字符串操作、文件 I/O 等。它是 `GTK`（用于图形用户界面开发的库）的基础，也被许多其他项目使用。`glib` 是跨平台的，适用于 Unix/Linux、Windows 等系统。

下面是 `glib` 的一些常见用法和基础示例。

## 1. **安装 glib**

在 Linux 系统上，你可以使用包管理器安装 `glib` 库。例如：

```bash
sudo apt-get install libglib2.0-dev
```

在 macOS 上，使用 Homebrew 安装：

```bash
brew install glib
```

Windows 上可以使用 `vcpkg` 安装：

```bash
vcpkg install glib
```

## 2. **基本的 `glib` 程序结构**

首先，在程序中包含 `glib.h` 头文件：

```c
#include <glib.h>
```

## 3. **创建 GList（链表）**

`glib` 提供了 `GList` 类型用于链表操作。以下是创建和操作 `GList` 链表的简单示例：

```c
#include <glib.h>
#include <stdio.h>

int main() {
    GList *list = NULL;

    // 添加元素到链表
    list = g_list_append(list, "First element");
    list = g_list_append(list, "Second element");
    list = g_list_append(list, "Third element");

    // 遍历链表并打印元素
    for (GList *l = list; l != NULL; l = l->next) {
        printf("%s\n", (char*)l->data);
    }

    // 释放链表内存
    g_list_free(list);

    return 0;
}
```

在这个例子中，`g_list_append()` 用于向链表中添加元素。`g_list_free()` 用于释放链表内存。

## 4. **创建 GHashTable（哈希表）**

`glib` 提供了 `GHashTable` 用于哈希表操作，下面是使用 `GHashTable` 的简单示例：

```c
#include <glib.h>
#include <stdio.h>

int main() {
    // 创建一个哈希表
    GHashTable *hash_table = g_hash_table_new(g_str_hash, g_str_equal);

    // 向哈希表中插入数据
    g_hash_table_insert(hash_table, "key1", "value1");
    g_hash_table_insert(hash_table, "key2", "value2");

    // 获取数据并打印
    printf("key1: %s\n", (char*)g_hash_table_lookup(hash_table, "key1"));
    printf("key2: %s\n", (char*)g_hash_table_lookup(hash_table, "key2"));

    // 释放哈希表内存
    g_hash_table_destroy(hash_table);

    return 0;
}
```

在这个例子中，`g_hash_table_new()` 用于创建一个新的哈希表，`g_hash_table_insert()` 用于插入键值对，`g_hash_table_lookup()` 用于根据键查找值。

## 5. **使用 GString（动态字符串）**

`glib` 提供了 `GString` 类型，适用于动态增长的字符串操作。以下是一个简单的例子：

```c
#include <glib.h>
#include <stdio.h>

int main() {
    // 创建一个空的 GString
    GString *gstr = g_string_new("Hello");

    // 向 GString 中添加字符串
    g_string_append(gstr, ", world!");

    // 打印 GString
    printf("%s\n", gstr->str);

    // 释放 GString 内存
    g_string_free(gstr, TRUE);

    return 0;
}
```

在这个示例中，`g_string_new()` 创建一个新的 `GString`，`g_string_append()` 用于向字符串添加内容，`g_string_free()` 用于释放内存。

## 6. **GMainLoop（主事件循环）**

`glib` 提供了 `GMainLoop` 用于实现事件驱动的程序流。你可以创建一个主事件循环并让程序在该循环中运行。以下是一个简单的事件循环示例：

```c
#include <glib.h>
#include <stdio.h>

gboolean print_hello(gpointer data) {
    printf("Hello, world!\n");
    return FALSE;  // 停止事件循环
}

int main() {
    GMainLoop *loop = g_main_loop_new(NULL, FALSE);

    // 设置定时事件，每隔 1 秒执行一次
    g_timeout_add_seconds(1, print_hello, NULL);

    // 启动主事件循环
    g_main_loop_run(loop);

    // 清理并退出
    g_main_loop_unref(loop);

    return 0;
}
```

在这个示例中，`g_timeout_add_seconds()` 用于定时调用 `print_hello()` 函数，`g_main_loop_run()` 启动主事件循环。

## 7. **GThread（线程支持）**

`glib` 提供了线程支持，通过 `GThread` 类型，你可以在应用程序中使用多线程。以下是一个简单的线程示例：

```c
#include <glib.h>
#include <stdio.h>

gpointer print_message(gpointer data) {
    printf("Hello from thread!\n");
    return NULL;
}

int main() {
    // 创建并启动一个线程
    GThread *thread = g_thread_new("example-thread", print_message, NULL);

    // 等待线程结束
    g_thread_join(thread);

    return 0;
}
```

在这个例子中，`g_thread_new()` 创建并启动一个新线程，`g_thread_join()` 等待线程执行完毕。

## 8. **GError（错误处理）**

`glib` 提供了 `GError` 结构，用于处理函数调用中的错误信息。以下是一个使用 `GError` 的示例：

```c
#include <glib.h>
#include <stdio.h>

void process_data(GError **error) {
    g_set_error(error, 1, 1, "An error occurred!");
}

int main() {
    GError *error = NULL;

    process_data(&error);

    if (error != NULL) {
        printf("Error: %s\n", error->message);
        g_error_free(error);  // 释放错误信息
    }

    return 0;
}
```

在这个例子中，`g_set_error()` 设置错误信息，`g_error_free()` 用于释放错误对象。

## 总结

`glib` 是一个功能强大的库，适用于各种 C 语言应用程序开发，涵盖了数据结构、算法、内存管理、线程支持等方面的内容。常用的功能包括：

- 数据结构：如 `GList`、`GHashTable`、`GQueue` 等。
- 字符串处理：如 `GString` 动态字符串。
- 内存管理：如 `g_malloc()`、`g_free()`。
- 文件和 I/O 操作：如 `GFile`。
- 事件循环和多线程支持：如 `GMainLoop` 和 `GThread`。
- 错误处理：如 `GError`。

你可以通过 `glib` 轻松实现复杂的功能，提高代码的可维护性和效率。