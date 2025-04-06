# Java底层知识

## Java目录分析

**`bin/`**：包含 Java 编译器、解释器和其他工具的目录。常见工具包括：

- **`javac.exe`**：Java 编译器，用于将 `.java` 文件编译为 `.class` 文件。
- **`java.exe`**：Java 运行时环境，用于运行 `.class` 文件。
- **`javadoc.exe`**：生成 Java 文档的工具。
- **`jar.exe`**：用于打包和管理 Java 归档文件的工具。
- **`javap.exe`**：用于查看编译后的 `.class` 文件的工具。

**`lib/`**：包含 JDK 运行时库和其他支持文件的目录。例如：

- **`tools.jar`**：包含开发工具（如编译器和调试器）所需的类文件。
- **`dt.jar`**：包含用于开发工具的类文件（如 Java 语言工具包）。

**`include/`**：包含 C/C++ 头文件，用于开发 Java 本地接口（JNI）和 C/C++ 扩展。

**`jre/`**：包含 Java 运行时环境的子目录。这个子目录通常包括与 JRE 安装相同的目录结构，提供运行 Java 应用程序所需的所有文件。

**`docs/`**：包含 JDK 文档和相关帮助文件。

**`src.zip`**：包含 JDK 的源代码，供开发人员参考和调试。

**`man/`**：包含 JDK 命令的手册页（可能在一些安装中不存在）。

### bin（jdk目录下，35个exe文件）

**`java.exe`**

- **功能**：Java 应用程序的运行环境。用于执行 Java 字节码（`.class` 文件）或 JAR 文件。
- **用法**：`java -jar MyApp.jar` 用于运行一个 JAR 文件；`java MyClass` 用于运行一个包含 `public static void main(String[] args)` 方法的类。

**`javac.exe`**

- **功能**：Java 编译器。将 Java 源代码（`.java` 文件）编译成字节码（`.class` 文件）。
- **用法**：`javac MyClass.java` 编译一个 Java 源文件。

**`javap.exe`**

- **功能**：Java 类文件反汇编器。用于查看 `.class` 文件的内容，如方法和字段的信息。
- **用法**：`javap MyClass` 查看编译后的类的结构和方法。

**`jar.exe`**

- **功能**：用于创建、更新和提取 JAR 文件（Java 归档文件）。可以将多个 `.class` 文件及相关资源打包到一个 JAR 文件中。
- **用法**：`jar cf MyApp.jar *.class` 创建一个 JAR 文件；`jar xf MyApp.jar` 提取 JAR 文件的内容。

**`javadoc.exe`**

- **功能**：生成 Java API 文档。根据 Java 源代码中的注释生成 HTML 文档。
- **用法**：`javadoc -d doc MyClass.java` 生成指定源文件的 API 文档。

**`jdb.exe`**

- **功能**：Java 调试器。用于调试 Java 应用程序。
- **用法**：`jdb MyClass` 启动调试器来调试指定的类。

**`jdeps.exe`**

- **功能**：Java 依赖分析工具。分析 Java 类文件和 JAR 文件的依赖关系。
- **用法**：`jdeps -s MyApp.jar` 显示 JAR 文件的模块依赖。

**`jhsdb.exe`**

- **功能**：Java 热处理工具。用于诊断和分析运行中的 JVM 的内存和线程。
- **用法**：`jhsdb jmap` 查看进程的内存映像。

**`jshell.exe`**

- **功能**：Java Shell (JShell) 工具。提供一个交互式的 REPL (Read-Eval-Print Loop) 环境，用于尝试 Java 代码片段。
- **用法**：`jshell` 启动 Java Shell。

**`keytool.exe`**

- **功能**：Java 密钥和证书管理工具。用于管理密钥库（keystore）和信任库（truststore），以及生成证书。
- **用法**：`keytool -genkey -alias mykey -keystore mykeystore.jks` 生成新的密钥对。

**`jcmd.exe`**

- **功能**：JVM 命令工具。提供对运行中的 JVM 的管理和诊断功能。
- **用法**：`jcmd  GC.run` 执行垃圾回收。

**`jmap.exe`**

- **功能**：生成 Java 进程的内存映像。用于分析堆内存使用情况。
- **用法**：`jmap -heap ` 查看指定进程的堆内存信息。

**`jstack.exe`**

- **功能**：生成 Java 线程堆栈跟踪。用于分析线程的状态和堆栈信息。
- **用法**：`jstack ` 查看指定进程的线程堆栈信息。

**`jstat.exe`**

- **功能**：JVM 统计信息工具。用于监视 JVM 的各类性能统计数据。
- **用法**：`jstat -gc ` 查看垃圾回收统计信息。

**`pack200.exe`**

- **功能**：用于压缩和解压 JAR 文件（Pack200 格式）。
- **用法**：`pack200 MyApp.pack.gz MyApp.jar` 压缩 JAR 文件。

**`unpack200.exe`**

- **功能**：用于解压 Pack200 格式的 JAR 文件。
- **用法**：`unpack200 MyApp.jar.pack.gz MyApp.jar` 解压 JAR 文件。



### lib



### jmods

**使用 `jmod` 工具**：

- `jmod describe .jmod`：查看 `.jmod` 文件的详细信息。
- `jmod extract .jmod`：提取 `.jmod` 文件的内容，以查看模块内部的文件。



- **`jmods/` 目录**：这个目录通常包含多个 `.jmod` 文件。每个 `.jmod` 文件对应于一个 JDK 模块，提供了模块的二进制形式以及模块的描述和配置。

- **模块的类文件**：模块中定义的所有 Java 类的字节码。

  **资源文件**：模块可能包含的资源，如配置文件、属性文件等。

  **模块描述文件**：包含模块的信息和描述的文件，如 `module-info.class`，描述模块的名称、依赖关系、导出包等

**命令行工具**

- `jmod` 工具

  ：用于操作 `.jmod`

   文件，支持创建、打包、解包、验证和列出模块的内容。常见的 `.jmod`

   命令包括：

  - `jmod create`：创建新的 `.jmod` 文件。
  - `jmod extract`：提取 `.jmod` 文件的内容。
  - `jmod describe`：描述 `.jmod` 文件的内容。

### legal

在 Java JDK 安装目录中，`legal` 目录通常包含与 Java 相关的法律和许可信息。这个目录的主要内容包括：

**`legal` 目录内容**

**1. 许可文件**

- **`LICENSE`**：包含 Java SE 平台和 JDK 的许可证信息，说明了使用、分发和修改 Java 软件的法律条款和条件。
- **`COPYRIGHT`**：包含版权声明和版权相关的法律信息。

**2. 法律和声明文件**

- **`THIRD_PARTY_NOTICES`**：列出 JDK 使用的第三方软件的许可条款和通知。这些通知通常包括对第三方库和工具的许可证信息，说明它们的使用条款。
- **`NOTICE`**：包含 JDK 使用的各种组件的法律声明，通常包括对开源软件的致谢和版权声明。

**3. 其他法律文档**

- **`README`** 或其他文档：可能包含额外的法律说明或相关信息，帮助用户了解法律和许可要求。



