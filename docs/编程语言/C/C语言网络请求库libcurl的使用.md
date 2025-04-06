# C语言网络请求库libcurl的使用

`libcurl` 是一个强大的 C 库，广泛用于发送网络请求，支持多种协议，包括 HTTP、HTTPS、FTP、SFTP 等。它可以用于发送 GET、POST、PUT 等请求，处理返回的数据，并支持文件上传、下载、会话保持等功能。`libcurl` 的 API 非常灵活，适用于各种网络编程需求。

下面是 `libcurl` 的基本使用方法，涵盖了常见的请求类型、错误处理、以及一些进阶功能。

### 1. 安装 `libcurl`

#### 1.1 在 Ubuntu 上安装

```bash
sudo apt-get install libcurl4-openssl-dev
```

#### 1.2 从源代码安装

```bash
# 下载并解压源代码
curl -O https://curl.se/download/curl-7.76.0.tar.bz2
tar -xjf curl-7.76.0.tar.bz2
cd curl-7.76.0

# 编译安装
./configure
make
sudo make install
```

### 2. 使用 `libcurl` 进行简单的 HTTP 请求

#### 2.1 包含头文件

```c
#include <stdio.h>
#include <curl/curl.h>
```

#### 2.2 初始化和发送 GET 请求

下面是一个简单的 GET 请求示例，展示了如何使用 `libcurl` 发送一个 HTTP GET 请求，并打印响应。

```c
#include <stdio.h>
#include <curl/curl.h>

int main() {
    CURL *curl; 
    CURLcode res;

    // 初始化 curl 库
    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();
    
    if (curl) {
        // 设置请求 URL
        curl_easy_setopt(curl, CURLOPT_URL, "http://www.example.com");

        // 执行请求
        res = curl_easy_perform(curl);

        // 检查请求是否成功
        if (res != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        }

        // 清理
        curl_easy_cleanup(curl);
    }

    // 清理全局库
    curl_global_cleanup();
    return 0;
}
```

#### 2.3 编译代码

使用 `gcc` 编译时，需要链接 `libcurl` 库：

```bash
gcc -o my_curl_program my_curl_program.c -lcurl
```

然后执行生成的程序：

```bash
./my_curl_program
```

### 3. 发送 POST 请求

#### 3.1 发送 POST 请求和发送数据

你可以使用 `CURLOPT_POST` 来发送 POST 请求，并使用 `CURLOPT_POSTFIELDS` 传递 POST 数据。下面的示例展示了如何发送一个简单的 POST 请求。

```c
#include <stdio.h>
#include <curl/curl.h>

int main() {
    CURL *curl;
    CURLcode res;

    // 初始化 curl 库
    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();

    if (curl) {
        // 设置请求 URL
        curl_easy_setopt(curl, CURLOPT_URL, "http://www.example.com");

        // 设置 POST 数据
        const char *data = "name=John&age=30";
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);

        // 执行请求
        res = curl_easy_perform(curl);

        // 检查请求是否成功
        if (res != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        }

        // 清理
        curl_easy_cleanup(curl);
    }

    // 清理全局库
    curl_global_cleanup();
    return 0;
}
```

### 4. 处理响应数据

`libcurl` 提供了一些方法来处理从服务器返回的数据，例如使用 `CURLOPT_WRITEFUNCTION` 和 `CURLOPT_WRITEDATA` 来处理响应内容。以下是一个示例，将服务器的响应数据输出到标准输出。

#### 4.1 设置回调函数

```c
#include <stdio.h>
#include <curl/curl.h>

// 回调函数，用于处理返回的数据
size_t write_callback(void *ptr, size_t size, size_t nmemb, char *data) {
    // 将返回数据打印到标准输出
    printf("%s", (char*)ptr);
    return size * nmemb;
}

int main() {
    CURL *curl;
    CURLcode res;

    // 初始化 curl 库
    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();

    if (curl) {
        // 设置请求 URL
        curl_easy_setopt(curl, CURLOPT_URL, "http://www.example.com");

        // 设置回调函数来处理响应数据
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);

        // 执行请求
        res = curl_easy_perform(curl);

        // 检查请求是否成功
        if (res != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        }

        // 清理
        curl_easy_cleanup(curl);
    }

    // 清理全局库
    curl_global_cleanup();
    return 0;
}
```

在这个示例中，`write_callback` 函数被用作回调函数，处理服务器响应的内容。每次 `libcurl` 获取到数据时，它都会调用此回调函数。

### 5. 设置请求头

你可以使用 `CURLOPT_HTTPHEADER` 来设置 HTTP 请求头。

#### 5.1 设置自定义请求头

```c
#include <stdio.h>
#include <curl/curl.h>

int main() {
    CURL *curl;
    CURLcode res;
    struct curl_slist *headers = NULL;

    // 初始化 curl 库
    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();

    if (curl) {
        // 设置请求 URL
        curl_easy_setopt(curl, CURLOPT_URL, "http://www.example.com");

        // 添加自定义请求头
        headers = curl_slist_append(headers, "Content-Type: application/json");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        // 执行请求
        res = curl_easy_perform(curl);

        // 检查请求是否成功
        if (res != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        }

        // 清理
        curl_slist_free_all(headers); // 释放请求头
        curl_easy_cleanup(curl);
    }

    // 清理全局库
    curl_global_cleanup();
    return 0;
}
```

### 6. 文件上传

`libcurl` 也支持文件上传，使用 `CURLOPT_HTTPPOST` 来发送文件。

#### 6.1 上传文件

```c
#include <stdio.h>
#include <curl/curl.h>

int main() {
    CURL *curl;
    CURLcode res;
    struct curl_slist *headers = NULL;

    // 文件路径
    const char *file_path = "path/to/file.txt";

    // 初始化 curl 库
    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();

    if (curl) {
        // 设置请求 URL
        curl_easy_setopt(curl, CURLOPT_URL, "http://www.example.com/upload");

        // 设置文件上传
        curl_easy_setopt(curl, CURLOPT_UPLOAD, 1L);
        FILE *file = fopen(file_path, "rb");
        curl_easy_setopt(curl, CURLOPT_READDATA, file);

        // 执行请求
        res = curl_easy_perform(curl);

        // 检查请求是否成功
        if (res != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        }

        fclose(file); // 关闭文件
        curl_easy_cleanup(curl);
    }

    // 清理全局库
    curl_global_cleanup();
    return 0;
}
```

### 7. 错误处理

在所有请求之后，`libcurl` 会返回一个 `CURLcode` 类型的错误码。你可以通过 `curl_easy_strerror()` 函数来获取错误信息。

```c
if (res != CURLE_OK) {
    fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
}
```

### 总结

`libcurl` 是一个非常强大的网络请求库，支持多种协议和丰富的功能，如 GET、POST 请求、文件上传、下载、处理响应等。它的 API 相对简单，但也很灵活，适合用来处理网络通信需求。在使用时，你需要初始化库、执行请求、处理返回的数据，并在使用完后清理资源。

通过示例代码，你可以看到如何进行常见的网络操作，例如发送 GET、POST 请求、设置请求头、处理响应数据、上传文件等。