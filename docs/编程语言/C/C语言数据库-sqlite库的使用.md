# C语言轻量级的关系型数据库sqlite库的使用

SQLite 是一个轻量级、服务器无关的关系型数据库库，广泛应用于嵌入式系统、移动设备、桌面应用程序等场景。它的特点是简单易用、体积小、支持 SQL 标准，且不需要安装和配置数据库服务。下面是如何在 C 语言中使用 SQLite 库的基本教程。

### 1. **安装 SQLite**

在大多数 Linux 发行版中，你可以通过包管理器安装 SQLite：

```bash
sudo apt-get install sqlite3 libsqlite3-dev
```

在 macOS 上，你可以使用 Homebrew 安装：

```bash
brew install sqlite
```

如果你使用 Windows，SQLite 的官方页面提供了预编译的二进制文件：[SQLite Download Page](https://www.sqlite.org/download.html)。

### 2. **链接 SQLite 库**

在 C 程序中使用 SQLite 时，需要将 `sqlite3` 库链接到项目中。通常，编译时添加 `-lsqlite3` 参数：

```bash
gcc -o my_program my_program.c -lsqlite3
```

### 3. **C 语言中的 SQLite 基本操作**

SQLite 的 C API 提供了许多函数来执行数据库操作。下面是一些基本操作的示例，包括创建数据库、打开数据库、执行 SQL 查询等。

#### a. **打开数据库**

首先需要打开（或创建）一个数据库文件。如果文件不存在，SQLite 会自动创建一个新的数据库文件。

```c
#include <stdio.h>
#include <sqlite3.h>

int main() {
    sqlite3 *db;
    char *err_msg = 0;

    // 打开（或创建）一个数据库文件
    int rc = sqlite3_open("test.db", &db); // 传入数据库文件名
    if (rc != SQLITE_OK) {
        printf("无法打开数据库: %s\n", sqlite3_errmsg(db));
        return 1;
    }

    printf("数据库打开成功\n");

    // 关闭数据库
    sqlite3_close(db);

    return 0;
}
```

#### b. **执行 SQL 语句（创建表格）**

在 SQLite 中执行 SQL 语句可以使用 `sqlite3_exec` 函数。以下是一个创建表格的示例：

```c
#include <stdio.h>
#include <sqlite3.h>

int main() {
    sqlite3 *db;
    char *err_msg = 0;

    int rc = sqlite3_open("test.db", &db);
    if (rc != SQLITE_OK) {
        printf("无法打开数据库: %s\n", sqlite3_errmsg(db));
        return 1;
    }

    // 创建表
    const char *sql = "CREATE TABLE IF NOT EXISTS Person(Id INTEGER PRIMARY KEY, Name TEXT, Age INTEGER);";

    rc = sqlite3_exec(db, sql, 0, 0, &err_msg);
    if (rc != SQLITE_OK) {
        printf("SQL 错误: %s\n", err_msg);
        sqlite3_free(err_msg);
    } else {
        printf("表创建成功\n");
    }

    sqlite3_close(db);
    return 0;
}
```

#### c. **插入数据**

使用 `sqlite3_exec` 执行 SQL 插入语句：

```c
#include <stdio.h>
#include <sqlite3.h>

int main() {
    sqlite3 *db;
    char *err_msg = 0;

    int rc = sqlite3_open("test.db", &db);
    if (rc != SQLITE_OK) {
        printf("无法打开数据库: %s\n", sqlite3_errmsg(db));
        return 1;
    }

    const char *sql = "INSERT INTO Person(Name, Age) VALUES('Alice', 30);";

    rc = sqlite3_exec(db, sql, 0, 0, &err_msg);
    if (rc != SQLITE_OK) {
        printf("SQL 错误: %s\n", err_msg);
        sqlite3_free(err_msg);
    } else {
        printf("数据插入成功\n");
    }

    sqlite3_close(db);
    return 0;
}
```

#### d. **查询数据**

查询数据时，我们通常会使用回调函数来处理查询结果。以下是查询所有人的名字和年龄并打印出来的示例：

```c
#include <stdio.h>
#include <sqlite3.h>

static int callback(void *data, int argc, char **argv, char **azColName) {
    for (int i = 0; i < argc; i++) {
        printf("%s = %s\n", azColName[i], argv[i] ? argv[i] : "NULL");
    }
    return 0;
}

int main() {
    sqlite3 *db;
    char *err_msg = 0;

    int rc = sqlite3_open("test.db", &db);
    if (rc != SQLITE_OK) {
        printf("无法打开数据库: %s\n", sqlite3_errmsg(db));
        return 1;
    }

    const char *sql = "SELECT * FROM Person;";

    rc = sqlite3_exec(db, sql, callback, 0, &err_msg);
    if (rc != SQLITE_OK) {
        printf("SQL 错误: %s\n", err_msg);
        sqlite3_free(err_msg);
    } else {
        printf("查询完成\n");
    }

    sqlite3_close(db);
    return 0;
}
```

在回调函数中，我们打印了每一列的名字和值。`callback` 函数将每一行的数据传递给你，然后你可以处理这些数据。

#### e. **更新数据**

更新数据也可以通过 `sqlite3_exec` 来实现，下面是一个示例，更新 `Person` 表中年龄为 30 的记录：

```c
#include <stdio.h>
#include <sqlite3.h>

int main() {
    sqlite3 *db;
    char *err_msg = 0;

    int rc = sqlite3_open("test.db", &db);
    if (rc != SQLITE_OK) {
        printf("无法打开数据库: %s\n", sqlite3_errmsg(db));
        return 1;
    }

    const char *sql = "UPDATE Person SET Age = 35 WHERE Name = 'Alice';";

    rc = sqlite3_exec(db, sql, 0, 0, &err_msg);
    if (rc != SQLITE_OK) {
        printf("SQL 错误: %s\n", err_msg);
        sqlite3_free(err_msg);
    } else {
        printf("数据更新成功\n");
    }

    sqlite3_close(db);
    return 0;
}
```

#### f. **删除数据**

删除数据使用类似的 SQL 语句：

```c
#include <stdio.h>
#include <sqlite3.h>

int main() {
    sqlite3 *db;
    char *err_msg = 0;

    int rc = sqlite3_open("test.db", &db);
    if (rc != SQLITE_OK) {
        printf("无法打开数据库: %s\n", sqlite3_errmsg(db));
        return 1;
    }

    const char *sql = "DELETE FROM Person WHERE Name = 'Alice';";

    rc = sqlite3_exec(db, sql, 0, 0, &err_msg);
    if (rc != SQLITE_OK) {
        printf("SQL 错误: %s\n", err_msg);
        sqlite3_free(err_msg);
    } else {
        printf("数据删除成功\n");
    }

    sqlite3_close(db);
    return 0;
}
```

### 4. **错误处理**

每个 SQLite 函数返回一个错误码，你可以使用 `sqlite3_errmsg()` 获取详细的错误信息。通常情况下，执行 SQL 时需要检查返回值并在发生错误时进行处理。

```c
if (rc != SQLITE_OK) {
    printf("SQL 错误: %s\n", sqlite3_errmsg(db));
}
```

### 5. **关闭数据库**

在使用完数据库后，记得关闭数据库连接：

```c
sqlite3_close(db);
```

### 总结

- **SQLite** 是一个非常适合嵌入式应用、移动设备以及小型项目的轻量级数据库库，提供了完整的 SQL 支持。
- **基本操作**：创建数据库、创建表、插入数据、查询数据、更新数据和删除数据都可以通过简单的 C API 来实现。
- **回调函数**：查询操作使用回调函数来处理返回的结果。
- **错误处理**：要时刻关注数据库操作的错误，使用 `sqlite3_errmsg()` 获取详细的错误信息。

SQLite 因其简单、轻量的特性，在很多小型项目中得到了广泛应用。如果你正在做一个需要内嵌数据库的应用，SQLite 是一个不错的选择。