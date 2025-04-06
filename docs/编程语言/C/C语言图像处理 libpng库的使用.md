# C语言libpng库的使用

`libpng` 是一个用 C 语言编写的库，用于处理 PNG 格式的图片。它可以帮助你读写 PNG 文件、进行图片的压缩与解压缩操作，并处理图片的颜色、透明度等信息。

### 1. **安装 libpng**

在 Linux 系统中，通常可以通过包管理器安装：

```bash
sudo apt-get install libpng-dev
```

在 macOS 上，可以使用 Homebrew 安装：

```bash
brew install libpng
```

Windows 系统可以从官方网站下载并进行安装，或使用包管理工具如 `vcpkg` 或 `MSYS2` 安装。

### 2. **包含头文件**

在你的 C 语言程序中，使用 libpng 时需要包含 `png.h` 头文件：

```c
#include <png.h>
```

### 3. **读取 PNG 文件**

通过 `libpng` 读取 PNG 文件通常包括以下几个步骤：

- 打开 PNG 文件并初始化 libpng。
- 读取 PNG 图像数据。
- 处理图像数据。
- 关闭文件并清理资源。

下面是一个基本的读取 PNG 文件并获取其信息的示例：

```c
#include <stdio.h>
#include <stdlib.h>
#include <png.h>

void read_png_file(char *filename) {
    FILE *fp = fopen(filename, "rb");
    if (!fp) abort();

    png_structp png = png_create_read_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
    if (!png) abort();

    png_infop info = png_create_info_struct(png);
    if (!info) abort();

    if (setjmp(png_jmpbuf(png))) abort();

    png_init_io(png, fp);

    // 读取图像头信息
    png_read_info(png, info);

    // 获取图像信息
    int width = png_get_image_width(png, info);
    int height = png_get_image_height(png, info);
    int bit_depth = png_get_bit_depth(png, info);
    int color_type = png_get_color_type(png, info);

    printf("Width: %d, Height: %d, Bit Depth: %d, Color Type: %d\n", width, height, bit_depth, color_type);

    // 清理资源
    png_destroy_read_struct(&png, &info, NULL);
    fclose(fp);
}

int main() {
    read_png_file("image.png");
    return 0;
}
```

在这个示例中：

- `png_create_read_struct()` 初始化读取结构体。
- `png_create_info_struct()` 创建图像信息结构。
- `png_init_io()` 初始化文件读取。
- `png_read_info()` 读取图像头部信息。
- `png_get_image_width()`、`png_get_image_height()` 等获取图像宽度、高度、颜色类型等信息。

### 4. **读取 PNG 图像数据**

要读取图像的像素数据，我们需要逐行读取图像的像素。通常情况下，使用 `png_read_rows()` 逐行读取 PNG 文件数据。

```c
#include <stdio.h>
#include <stdlib.h>
#include <png.h>

void read_png_file(char *filename) {
    FILE *fp = fopen(filename, "rb");
    if (!fp) abort();

    png_structp png = png_create_read_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
    if (!png) abort();

    png_infop info = png_create_info_struct(png);
    if (!info) abort();

    if (setjmp(png_jmpbuf(png))) abort();

    png_init_io(png, fp);

    png_read_info(png, info);

    int width = png_get_image_width(png, info);
    int height = png_get_image_height(png, info);
    int bit_depth = png_get_bit_depth(png, info);
    int color_type = png_get_color_type(png, info);

    printf("Width: %d, Height: %d, Bit Depth: %d, Color Type: %d\n", width, height, bit_depth, color_type);

    // 分配内存来存储每行像素数据
    png_bytep *row_pointers = (png_bytep *)malloc(sizeof(png_bytep) * height);
    for (int i = 0; i < height; i++) {
        row_pointers[i] = (png_byte *)malloc(png_get_rowbytes(png, info));
    }

    // 读取图像数据
    png_read_image(png, row_pointers);

    // 访问像素数据（例：打印首行数据）
    for (int i = 0; i < width * 4; i++) { // 假设是 RGBA 图像
        printf("%u ", row_pointers[0][i]);
    }

    // 清理资源
    for (int i = 0; i < height; i++) {
        free(row_pointers[i]);
    }
    free(row_pointers);

    png_destroy_read_struct(&png, &info, NULL);
    fclose(fp);
}

int main() {
    read_png_file("image.png");
    return 0;
}
```

在这个例子中：

- `png_read_image()` 读取图像数据并将每行像素存储在 `row_pointers` 中。
- `png_get_rowbytes()` 获取每行的字节数。
- 每个像素数据以 RGBA 或 RGB 的形式存储在 `row_pointers` 中，可以根据需要处理每个像素的值。

### 5. **保存 PNG 文件**

保存 PNG 文件的过程与读取类似，关键步骤如下：

- 创建写入结构体。
- 设置文件输出。
- 写入图像数据。

以下是一个保存 PNG 文件的基本示例：

```c
#include <stdio.h>
#include <stdlib.h>
#include <png.h>

void write_png_file(char *filename) {
    int width = 256;
    int height = 256;
    int bit_depth = 8;
    int color_type = PNG_COLOR_TYPE_RGBA;

    // 创建一个文件输出流
    FILE *fp = fopen(filename, "wb");
    if (!fp) abort();

    png_structp png = png_create_write_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
    if (!png) abort();

    png_infop info = png_create_info_struct(png);
    if (!info) abort();

    if (setjmp(png_jmpbuf(png))) abort();

    png_init_io(png, fp);

    // 设置图像信息
    png_set_IHDR(
        png, info, width, height,
        bit_depth, color_type, PNG_INTERLACE_NONE,
        PNG_COMPRESSION_TYPE_DEFAULT, PNG_FILTER_DEFAULT
    );

    png_write_info(png, info);

    // 创建并写入数据
    png_bytep row = (png_bytep)malloc(4 * width);
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            row[x*4] = x;       // Red
            row[x*4+1] = y;     // Green
            row[x*4+2] = 255;   // Blue
            row[x*4+3] = 255;   // Alpha
        }
        png_write_row(png, row);
    }

    // 写入文件结束
    png_write_end(png, NULL);

    free(row);
    png_destroy_write_struct(&png, &info);
    fclose(fp);
}

int main() {
    write_png_file("output.png");
    return 0;
}
```

在这个示例中：

- `png_create_write_struct()` 初始化写入结构体。
- `png_set_IHDR()` 设置图像的头信息（宽度、高度、位深度、颜色类型等）。
- `png_write_row()` 将每行像素数据写入文件。
- `png_write_end()` 写入文件结束信息。

### 6. **错误处理**

当 libpng 发生错误时，使用 `png_jmpbuf()` 进行跳转，以避免程序崩溃。例如：

```c
if (setjmp(png_jmpbuf(png))) {
    fprintf(stderr, "PNG 读取失败\n");
    png_destroy_read_struct(&png, &info, NULL);
    fclose(fp);
    exit(1);
}
```

### 总结

1. **读取 PNG 文件**：使用 `png_create_read_struct()`、`png_create_info_struct()` 和 `png_read_image()` 等函数读取图像数据。
2. **保存 PNG 文件**：使用 `png_create_write_struct()`、`png_set_IHDR()` 和 `png_write_row()` 等函数保存图像。
3. **处理图像数据**：通过 `png_bytep` 类型的指针来访问图像的每个像素。
4. **错误处理**：使用 `setjmp()` 和 `longjmp()` 来处理 libpng 可能出现的错误。

这些是 libpng 的基本用法，你可以根据需要处理图像的不同属性（例如调色板、灰度图像、透明度等）进行进一步的自定义操作。