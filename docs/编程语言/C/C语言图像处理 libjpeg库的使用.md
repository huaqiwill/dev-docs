# C语言libjpeg库的使用

### 1. **安装 libjpeg**

在 Linux 系统中，通常可以通过包管理器安装 `libjpeg` 库：

```bash
sudo apt-get install libjpeg-dev
```

在 macOS 上，可以使用 Homebrew 安装：

```bash
brew install libjpeg
```

Windows 上可以从官方网站下载并安装 `libjpeg`，或者使用包管理工具如 `vcpkg`。

### 2. **包含头文件**

在 C 语言程序中，使用 `libjpeg` 时需要包含以下头文件：

```c
#include <stdio.h>
#include <stdlib.h>
#include <jpeglib.h>
```

### 3. **读取 JPEG 文件**

以下是一个读取 JPEG 文件并获取其图像信息的简单示例：

```c
#include <stdio.h>
#include <stdlib.h>
#include <jpeglib.h>

void read_jpeg_file(char *filename) {
    FILE *infile = fopen(filename, "rb");
    if (!infile) {
        perror("Unable to open file");
        return;
    }

    struct jpeg_decompress_struct cinfo;
    struct jpeg_error_mgr jerr;

    // 设置错误处理机制
    cinfo.err = jpeg_std_error(&jerr);
    jpeg_create_decompress(&cinfo);

    // 指定输入文件
    jpeg_stdio_src(&cinfo, infile);

    // 读取 JPEG 文件头信息
    jpeg_read_header(&cinfo, TRUE);

    // 输出图像信息
    printf("Image width: %d\n", cinfo.image_width);
    printf("Image height: %d\n", cinfo.image_height);
    printf("Image color components: %d\n", cinfo.num_components);
    printf("Image color space: %d\n", cinfo.jpeg_color_space);

    // 读取图像数据
    jpeg_start_decompress(&cinfo);
    unsigned long row_stride = cinfo.output_width * cinfo.output_components;
    JSAMPARRAY buffer = (*cinfo.mem->alloc_sarray)((j_common_ptr)&cinfo, JPOOL_IMAGE, row_stride, 1);

    while (cinfo.output_scanline < cinfo.output_height) {
        jpeg_read_scanlines(&cinfo, buffer, 1);
        // 此处处理每一行图像数据
    }

    // 完成解码
    jpeg_finish_decompress(&cinfo);
    jpeg_destroy_decompress(&cinfo);
    fclose(infile);
}

int main() {
    read_jpeg_file("example.jpg");
    return 0;
}
```

在这个示例中：

- `jpeg_create_decompress()` 创建解压结构体。
- `jpeg_stdio_src()` 设置输入文件来源。
- `jpeg_read_header()` 读取 JPEG 文件头信息。
- `jpeg_start_decompress()` 开始解码过程。
- `jpeg_read_scanlines()` 逐行读取图像数据。

### 4. **保存 JPEG 文件**

保存 JPEG 文件需要使用 `libjpeg` 编码功能。以下是一个将 RGB 图像保存为 JPEG 文件的例子：

```c
#include <stdio.h>
#include <stdlib.h>
#include <jpeglib.h>

void write_jpeg_file(char *filename, int width, int height, unsigned char *image_data) {
    FILE *outfile = fopen(filename, "wb");
    if (!outfile) {
        perror("Unable to open file");
        return;
    }

    struct jpeg_compress_struct cinfo;
    struct jpeg_error_mgr jerr;

    // 设置错误处理机制
    cinfo.err = jpeg_std_error(&jerr);
    jpeg_create_compress(&cinfo);

    // 设置输出文件
    jpeg_stdio_dest(&cinfo, outfile);

    // 设置 JPEG 参数
    cinfo.image_width = width;
    cinfo.image_height = height;
    cinfo.input_components = 3; // 假设是 RGB 图像
    cinfo.in_color_space = JCS_RGB; // 图像色彩空间

    jpeg_set_defaults(&cinfo);
    jpeg_set_quality(&cinfo, 75, TRUE); // 设置图像质量

    // 开始压缩
    jpeg_start_compress(&cinfo, TRUE);

    // 逐行写入图像数据
    unsigned char *row_pointer = image_data;
    while (cinfo.next_scanline < cinfo.image_height) {
        jpeg_write_scanlines(&cinfo, &row_pointer, 1);
        row_pointer += width * 3; // 每行的字节数
    }

    // 完成压缩
    jpeg_finish_compress(&cinfo);
    jpeg_destroy_compress(&cinfo);
    fclose(outfile);
}

int main() {
    int width = 256;
    int height = 256;
    unsigned char *image_data = (unsigned char *)malloc(width * height * 3); // RGB 图像

    // 填充图像数据（此处仅为示例，实际情况中需要使用真实数据）
    for (int i = 0; i < width * height; i++) {
        image_data[i * 3] = 255;     // 红色分量
        image_data[i * 3 + 1] = 0;   // 绿色分量
        image_data[i * 3 + 2] = 0;   // 蓝色分量
    }

    write_jpeg_file("output.jpg", width, height, image_data);
    free(image_data);

    return 0;
}
```

在这个示例中：

- `jpeg_create_compress()` 创建压缩结构体。
- `jpeg_stdio_dest()` 设置输出文件。
- `jpeg_set_defaults()` 设置压缩参数。
- `jpeg_set_quality()` 设置 JPEG 图像的质量（范围 0-100，100 为最佳质量）。
- `jpeg_start_compress()` 启动压缩。
- `jpeg_write_scanlines()` 写入图像数据。
- `jpeg_finish_compress()` 完成压缩过程。

### 5. **错误处理**

`libjpeg` 提供了丰富的错误处理机制，通常通过设置错误管理器来处理文件读取或写入过程中可能发生的错误：

```c
struct jpeg_error_mgr jerr;
cinfo.err = jpeg_std_error(&jerr);
jpeg_create_decompress(&cinfo);
```

### 总结

1. **读取 JPEG 文件**：使用 `jpeg_create_decompress()` 创建解压结构体，`jpeg_stdio_src()` 设置输入文件，`jpeg_read_header()` 读取文件头信息，`jpeg_read_scanlines()` 逐行读取图像数据。
2. **保存 JPEG 文件**：使用 `jpeg_create_compress()` 创建压缩结构体，`jpeg_stdio_dest()` 设置输出文件，`jpeg_write_scanlines()` 逐行写入图像数据。
3. **错误处理**：使用 `jpeg_std_error()` 进行标准错误处理。

`libjpeg` 是处理 JPEG 图像的强大工具，可以对 JPEG 图像进行解码和编码操作，非常适合图像处理应用。