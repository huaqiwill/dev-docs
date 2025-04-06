# C语言网络编程

C语言网络编程涉及的内容包括使用 C 语言来实现网络通信功能。常见的网络编程功能包括客户端和服务器之间的数据传输、协议的实现、以及如何处理网络连接等。下面我将简要介绍一下 C 语言网络编程的基础，并给出相关代码示例。

### 1. 套接字（Socket）概念

网络编程的核心是套接字（Socket）。套接字是一种通信机制，用于在不同的计算机或进程之间进行数据交换。通常网络编程分为两部分：**客户端**和**服务器**。客户端负责发送请求，服务器负责接收请求并响应。

- **套接字类型**：常用的有 `SOCK_STREAM`（TCP协议）和 `SOCK_DGRAM`（UDP协议）。
- **协议族**：常用的有 `AF_INET`（IPv4）和 `AF_INET6`（IPv6）。

### 2. 网络编程基本流程

#### 服务器端：

1. 创建一个套接字
2. 绑定地址（IP 和端口）
3. 监听连接
4. 接受客户端连接
5. 接收和发送数据
6. 关闭连接

#### 客户端：

1. 创建一个套接字
2. 连接到服务器
3. 发送数据
4. 接收服务器的响应
5. 关闭连接

### 3. C语言实现网络编程的步骤

#### 3.1 服务器端代码（TCP）

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080
#define BACKLOG 5

int main() {
    int server_fd, new_socket;
    struct sockaddr_in address;
    int addr_len = sizeof(address);
    char buffer[1024] = {0};

    // 创建 socket
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    // 配置服务器地址
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;  // 监听所有网络接口
    address.sin_port = htons(PORT);

    // 绑定 socket 到地址
    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }

    // 监听客户端连接
    if (listen(server_fd, BACKLOG) < 0) {
        perror("listen failed");
        exit(EXIT_FAILURE);
    }

    // 接受客户端连接
    if ((new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addr_len)) < 0) {
        perror("accept failed");
        exit(EXIT_FAILURE);
    }

    // 接收数据并发送响应
    read(new_socket, buffer, 1024);
    printf("Client: %s\n", buffer);
    send(new_socket, "Hello from server", strlen("Hello from server"), 0);

    // 关闭 socket
    close(new_socket);
    close(server_fd);
    return 0;
}
```

#### 3.2 客户端代码（TCP）

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080

int main() {
    int sock = 0;
    struct sockaddr_in server_addr;
    char *message = "Hello from client";
    char buffer[1024] = {0};

    // 创建 socket
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        perror("socket failed");
        return -1;
    }

    // 配置服务器地址
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);

    if (inet_pton(AF_INET, "127.0.0.1", &server_addr.sin_addr) <= 0) {
        perror("Invalid address");
        return -1;
    }

    // 连接到服务器
    if (connect(sock, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        perror("connect failed");
        return -1;
    }

    // 发送消息
    send(sock, message, strlen(message), 0);
    printf("Message sent\n");

    // 接收响应
    read(sock, buffer, 1024);
    printf("Server: %s\n", buffer);

    // 关闭 socket
    close(sock);
    return 0;
}
```

### 4. 主要函数解析

- **`socket()`**：创建一个新的套接字。返回的文件描述符可以用于后续的网络通信。
- **`bind()`**：将套接字与本地地址（IP + 端口）绑定。
- **`listen()`**：使套接字进入监听状态，等待客户端连接。
- **`accept()`**：接受客户端连接，并返回新的套接字用于数据交换。
- **`connect()`**：客户端连接到指定的服务器。
- **`send()`**：发送数据到对方。
- **`recv()`**：接收从对方发送的数据。
- **`close()`**：关闭套接字。

### 5. 错误处理

网络编程中的错误处理非常重要。常见的错误如 `socket()` 创建失败、`bind()` 绑定失败、`listen()` 监听失败、`accept()` 接受连接失败等，需要用 `perror()` 或 `fprintf(stderr, ...)` 输出详细错误信息，帮助调试。

### 6. UDP 网络编程

与 TCP 不同，UDP 是无连接的协议，通信过程不需要建立连接。以下是一个 UDP 客户端和服务器的示例。

#### 6.1 UDP 服务器代码

```c
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080

int main() {
    int sock;
    struct sockaddr_in server_addr, client_addr;
    socklen_t addr_len = sizeof(client_addr);
    char buffer[1024] = {0};

    // 创建 UDP 套接字
    if ((sock = socket(AF_INET, SOCK_DGRAM, 0)) < 0) {
        perror("socket failed");
        return -1;
    }

    // 配置服务器地址
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    server_addr.sin_addr.s_addr = INADDR_ANY;

    // 绑定地址
    if (bind(sock, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        perror("bind failed");
        return -1;
    }

    // 接收数据
    recvfrom(sock, buffer, sizeof(buffer), 0, (struct sockaddr *)&client_addr, &addr_len);
    printf("Client: %s\n", buffer);

    // 发送响应
    sendto(sock, "Hello from server", strlen("Hello from server"), 0, (struct sockaddr *)&client_addr, addr_len);

    // 关闭套接字
    close(sock);
    return 0;
}
```

#### 6.2 UDP 客户端代码

```c
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080

int main() {
    int sock;
    struct sockaddr_in server_addr;
    char *message = "Hello from client";
    char buffer[1024] = {0};

    // 创建 UDP 套接字
    if ((sock = socket(AF_INET, SOCK_DGRAM, 0)) < 0) {
        perror("socket failed");
        return -1;
    }

    // 配置服务器地址
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    server_addr.sin_addr.s_addr = inet_addr("127.0.0.1");

    // 发送消息
    sendto(sock, message, strlen(message), 0, (struct sockaddr *)&server_addr, sizeof(server_addr));
    printf("Message sent\n");

    // 接收响应
    recvfrom(sock, buffer, sizeof(buffer), 0, NULL, NULL);
    printf("Server: %s\n", buffer);

    // 关闭套接字
    close(sock);
    return 0;
}
```

### 7. 总结

C语言的网络编程相对简单，但涉及到很多低层次的操作，如套接字管理、地址处理等。掌握了这些基本操作后，你就可以在 C 语言中编写出功能丰富的网络应用。对于更复杂的应用，可能需要对多线程、非阻塞 IO 或高效网络库（如 `libevent`）有进一步的了解。