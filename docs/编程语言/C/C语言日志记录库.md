# C语言日志记录库log4c的使用

`log4c` 是一个用于 C 语言的日志记录库，基于 `log4j`（一个 Java 日志记录框架）。它提供了灵活的日志记录功能，可以将日志输出到不同的目标，如控制台、文件、网络等。下面是如何安装和使用 `log4c` 库的详细说明。

### 1. **安装 log4c**

首先，您需要下载和安装 `log4c` 库。可以通过源代码安装，也可以使用包管理工具（如 `apt` 在 Ubuntu 上）进行安装。

#### a. **从源代码安装**

1. 下载 `log4c` 源代码：

   ```bash
   git clone https://github.com/log4c/log4c.git
   cd log4c
   ```

2. 编译和安装：

   ```bash
   ./configure
   make
   sudo make install
   ```

   如果出现问题，可以查看 `README` 或 `INSTALL` 文件，确保依赖项正确安装。

#### b. **使用包管理工具安装**

对于 Ubuntu/Debian 系统，可以使用以下命令直接安装：

```bash
sudo apt-get install liblog4c-dev
```

对于其他 Linux 系统，可以根据包管理器的不同，使用相应的命令安装。

### 2. **基本使用示例**

安装完成后，可以在项目中使用 `log4c` 进行日志记录。下面是一个简单的示例，演示了如何配置和使用日志记录。

#### a. **配置日志记录器**

首先，需要包含头文件，并进行基本配置：

```c
#include <stdio.h>
#include <log4c.h>

int main() {
    // 初始化 log4c
    if (log4c_init()) {
        fprintf(stderr, "log4c initialization failed\n");
        return 1;
    }

    // 获取日志记录器
    log4c_category_t *my_category = log4c_category_get("mycategory");

    // 记录不同级别的日志
    log4c_category_log(my_category, LOG4C_PRIORITY_DEBUG, "This is a debug message");
    log4c_category_log(my_category, LOG4C_PRIORITY_INFO, "This is an info message");
    log4c_category_log(my_category, LOG4C_PRIORITY_WARN, "This is a warning message");
    log4c_category_log(my_category, LOG4C_PRIORITY_ERROR, "This is an error message");

    // 释放 log4c 资源
    log4c_fini();
    return 0;
}
```

#### b. **日志级别**

`log4c` 支持多种日志级别，可以根据需要选择不同的日志级别来输出信息：

- `LOG4C_PRIORITY_DEBUG` — 调试信息
- `LOG4C_PRIORITY_INFO` — 一般信息
- `LOG4C_PRIORITY_WARN` — 警告信息
- `LOG4C_PRIORITY_ERROR` — 错误信息
- `LOG4C_PRIORITY_FATAL` — 致命错误信息

#### c. **配置日志输出目标**

`log4c` 支持将日志信息输出到不同的目标（如文件、控制台等）。以下是配置文件示例。

`log4c` 使用一个配置文件来控制日志输出，通常是 `log4c.xml` 或者 `log4c.conf`。

一个简单的配置文件示例（`log4c.xml`）：

```xml
<log4c>
    <appender name="console" class="log4c_appender_stdout">
        <param name="threshold" value="DEBUG"/>
    </appender>
    
    <category name="mycategory">
        <appender-ref ref="console"/>
        <priority value="INFO"/>
    </category>
</log4c>
```

#### d. **输出到文件**

如果要将日志记录到文件中，可以将配置修改为如下：

```xml
<log4c>
    <appender name="file" class="log4c_appender_file">
        <param name="filename" value="application.log"/>
        <param name="threshold" value="INFO"/>
    </appender>
    
    <category name="mycategory">
        <appender-ref ref="file"/>
        <priority value="INFO"/>
    </category>
</log4c>
```

### 3. **常见操作**

#### a. **记录不同级别的日志**

可以使用以下函数来记录不同级别的日志：

```c
log4c_category_log(my_category, LOG4C_PRIORITY_DEBUG, "Debug level log");
log4c_category_log(my_category, LOG4C_PRIORITY_INFO, "Info level log");
log4c_category_log(my_category, LOG4C_PRIORITY_WARN, "Warning level log");
log4c_category_log(my_category, LOG4C_PRIORITY_ERROR, "Error level log");
log4c_category_log(my_category, LOG4C_PRIORITY_FATAL, "Fatal level log");
```

#### b. **设置日志级别**

可以在配置文件中设置日志级别，也可以在运行时动态修改日志级别：

```c
log4c_category_set_priority(my_category, LOG4C_PRIORITY_DEBUG);
```

#### c. **自定义日志输出格式**

`log4c` 允许您自定义日志的输出格式。可以在配置文件中设置格式。例如：

```xml
<appender name="file" class="log4c_appender_file">
    <param name="filename" value="app.log"/>
    <param name="threshold" value="DEBUG"/>
    <param name="layout" value="log4c_layout_pattern"/>
    <param name="pattern" value="%d %p %m%n"/>
</appender>
```

`%d` 是时间戳，`%p` 是日志级别，`%m` 是日志消息，`%n` 是换行符。

### 4. **日志输出到多个目标**

如果想将日志同时输出到文件和控制台，可以配置多个 `appender`，例如：

```xml
<log4c>
    <appender name="console" class="log4c_appender_stdout">
        <param name="threshold" value="DEBUG"/>
    </appender>

    <appender name="file" class="log4c_appender_file">
        <param name="filename" value="logfile.log"/>
        <param name="threshold" value="DEBUG"/>
    </appender>

    <category name="mycategory">
        <appender-ref ref="console"/>
        <appender-ref ref="file"/>
        <priority value="INFO"/>
    </category>
</log4c>
```

### 5. **调试与优化**

- **调试**：如果日志输出不符合预期，可以检查配置文件是否正确加载，确保配置路径和权限正确。
- **优化**：在高性能应用中，可以调整日志的输出频率，避免频繁的磁盘 I/O，或通过异步日志记录来提高性能。

### 总结

通过 `log4c`，你可以方便地为 C 语言应用程序添加日志功能，支持灵活的日志级别、输出目标和格式。只需简单的初始化和配置，就能实现日志记录功能，便于调试和监控。