# C语言操作MySQL数据库

在 C 语言中操作 MySQL 数据库，通常会使用 MySQL 官方提供的 **MySQL Connector/C**，这是一个 C 语言库，可以方便地与 MySQL 数据库进行交互。

### 1. **安装 MySQL Connector/C**

在 Linux 系统中，通常可以通过包管理器安装：

```bash
sudo apt-get install libmysqlclient-dev
```

在 macOS 上，使用 Homebrew 安装：

```bash
brew install mysql-client
```

对于 Windows，首先需要下载并安装 **MySQL Connector/C**，然后配置好开发环境。

官方连接：[MySQL Connector/C 下载页面](https://dev.mysql.com/downloads/connector/c/)

### 2. **包含 MySQL 头文件**

在 C 语言程序中使用 MySQL API，需要包含 `mysql/mysql.h` 头文件。

```c
#include <mysql/mysql.h>
```

### 3. **连接到 MySQL 数据库**

通过 `mysql_init()` 初始化 MySQL 连接，使用 `mysql_real_connect()` 连接到数据库。

```c
#include <stdio.h>
#include <mysql/mysql.h>

int main() {
    MYSQL *conn;
    MYSQL_RES *res;
    MYSQL_ROW row;

    // 初始化 MySQL 连接
    conn = mysql_init(NULL);

    if (conn == NULL) {
        fprintf(stderr, "mysql_init() failed\n");
        return EXIT_FAILURE;
    }

    // 连接到数据库
    if (mysql_real_connect(conn, "localhost", "root", "password", "test_db", 0, NULL, 0) == NULL) {
        fprintf(stderr, "mysql_real_connect() failed\n");
        mysql_close(conn);
        return EXIT_FAILURE;
    }

    printf("Connected to database successfully\n");

    // 关闭数据库连接
    mysql_close(conn);
    return 0;
}
```

在这个示例中：

- `mysql_init(NULL)` 初始化 MySQL 客户端库。

- ```
  mysql_real_connect()
  ```

   连接到数据库。参数包括： 

  - `localhost`：数据库主机名（如果是远程数据库，使用相应的 IP 地址或者域名）。
  - `root`：用户名。
  - `password`：密码。
  - `test_db`：要连接的数据库名称。
  - 其余参数用于配置端口、套接字等，通常可以保持为 `0` 和 `NULL`。

### 4. **执行 SQL 查询**

使用 `mysql_query()` 执行 SQL 查询。这里是一个执行 `SELECT` 查询并打印结果的例子：

```c
#include <stdio.h>
#include <mysql/mysql.h>

int main() {
    MYSQL *conn;
    MYSQL_RES *res;
    MYSQL_ROW row;

    // 初始化 MySQL 连接
    conn = mysql_init(NULL);
    if (conn == NULL) {
        fprintf(stderr, "mysql_init() failed\n");
        return EXIT_FAILURE;
    }

    // 连接到数据库
    if (mysql_real_connect(conn, "localhost", "root", "password", "test_db", 0, NULL, 0) == NULL) {
        fprintf(stderr, "mysql_real_connect() failed\n");
        mysql_close(conn);
        return EXIT_FAILURE;
    }

    // 执行查询
    if (mysql_query(conn, "SELECT id, name FROM users")) {
        fprintf(stderr, "SELECT query failed: %s\n", mysql_error(conn));
        mysql_close(conn);
        return EXIT_FAILURE;
    }

    // 获取查询结果
    res = mysql_store_result(conn);
    if (res == NULL) {
        fprintf(stderr, "mysql_store_result() failed: %s\n", mysql_error(conn));
        mysql_close(conn);
        return EXIT_FAILURE;
    }

    // 打印查询结果
    while ((row = mysql_fetch_row(res)) != NULL) {
        printf("id: %s, name: %s\n", row[0], row[1]);
    }

    // 释放结果集
    mysql_free_result(res);

    // 关闭数据库连接
    mysql_close(conn);
    return 0;
}
```

在这个例子中：

- `mysql_query()` 执行 SQL 查询。
- `mysql_store_result()` 获取查询结果。
- `mysql_fetch_row()` 获取查询的每一行数据，返回一个包含所有列数据的数组（`row[0]` 对应 `id`，`row[1]` 对应 `name`）。

### 5. **插入数据**

执行 `INSERT` 查询：

```c
#include <stdio.h>
#include <mysql/mysql.h>

int main() {
    MYSQL *conn;
    MYSQL_RES *res;

    // 初始化 MySQL 连接
    conn = mysql_init(NULL);
    if (conn == NULL) {
        fprintf(stderr, "mysql_init() failed\n");
        return EXIT_FAILURE;
    }

    // 连接到数据库
    if (mysql_real_connect(conn, "localhost", "root", "password", "test_db", 0, NULL, 0) == NULL) {
        fprintf(stderr, "mysql_real_connect() failed\n");
        mysql_close(conn);
        return EXIT_FAILURE;
    }

    // 执行 INSERT 语句
    if (mysql_query(conn, "INSERT INTO users (name, age) VALUES('Alice', 30)")) {
        fprintf(stderr, "INSERT failed: %s\n", mysql_error(conn));
        mysql_close(conn);
        return EXIT_FAILURE;
    }

    printf("数据插入成功\n");

    // 关闭数据库连接
    mysql_close(conn);
    return 0;
}
```

### 6. **更新数据**

执行 `UPDATE` 查询：

```c
#include <stdio.h>
#include <mysql/mysql.h>

int main() {
    MYSQL *conn;

    // 初始化 MySQL 连接
    conn = mysql_init(NULL);
    if (conn == NULL) {
        fprintf(stderr, "mysql_init() failed\n");
        return EXIT_FAILURE;
    }

    // 连接到数据库
    if (mysql_real_connect(conn, "localhost", "root", "password", "test_db", 0, NULL, 0) == NULL) {
        fprintf(stderr, "mysql_real_connect() failed\n");
        mysql_close(conn);
        return EXIT_FAILURE;
    }

    // 执行 UPDATE 语句
    if (mysql_query(conn, "UPDATE users SET age = 31 WHERE name = 'Alice'")) {
        fprintf(stderr, "UPDATE failed: %s\n", mysql_error(conn));
        mysql_close(conn);
        return EXIT_FAILURE;
    }

    printf("数据更新成功\n");

    // 关闭数据库连接
    mysql_close(conn);
    return 0;
}
```

### 7. **删除数据**

执行 `DELETE` 查询：

```c
#include <stdio.h>
#include <mysql/mysql.h>

int main() {
    MYSQL *conn;

    // 初始化 MySQL 连接
    conn = mysql_init(NULL);
    if (conn == NULL) {
        fprintf(stderr, "mysql_init() failed\n");
        return EXIT_FAILURE;
    }

    // 连接到数据库
    if (mysql_real_connect(conn, "localhost", "root", "password", "test_db", 0, NULL, 0) == NULL) {
        fprintf(stderr, "mysql_real_connect() failed\n");
        mysql_close(conn);
        return EXIT_FAILURE;
    }

    // 执行 DELETE 语句
    if (mysql_query(conn, "DELETE FROM users WHERE name = 'Alice'")) {
        fprintf(stderr, "DELETE failed: %s\n", mysql_error(conn));
        mysql_close(conn);
        return EXIT_FAILURE;
    }

    printf("数据删除成功\n");

    // 关闭数据库连接
    mysql_close(conn);
    return 0;
}
```

### 8. **错误处理**

在操作 MySQL 时，如果出现错误，可以使用 `mysql_error()` 来获取详细的错误信息。例如：

```c
fprintf(stderr, "SQL 错误: %s\n", mysql_error(conn));
```

### 9. **关闭连接**

操作完成后，使用 `mysql_close()` 关闭数据库连接：

```c
mysql_close(conn);
```

### 总结

1. **连接数据库**：通过 `mysql_real_connect()` 连接数据库。
2. **执行 SQL 查询**：通过 `mysql_query()` 执行查询语句。
3. **处理查询结果**：通过 `mysql_store_result()` 获取查询结果并使用 `mysql_fetch_row()` 访问每一行数据。
4. **插入、更新、删除**：通过执行 SQL 语句 `INSERT`、`UPDATE` 和 `DELETE` 来操作数据库。
5. **错误处理**：使用 `mysql_error()` 获取错误信息。
6. **关闭连接**：操作完成后，使用 `mysql_close()` 关闭连接。

这样，你可以在 C 程序中与 MySQL 数据库进行基本的交互。