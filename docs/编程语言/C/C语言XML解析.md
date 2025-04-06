# XML解析库minixml的使用

`minixml` 是一个轻量级的 XML 解析库，适用于嵌入式系统和对内存有限制的场景。它的目标是提供简单、易用的接口来解析和生成 XML 文件。

以下是 `minixml` 的基本使用方法，包括如何解析 XML 文件、生成 XML 文件、遍历 XML 树等。

### 1. 安装 `minixml`

`minixml` 是一个开源项目，你可以通过源代码编译安装。一般来说，你可以将源代码直接包含到你的项目中，或者使用以下步骤编译它：

```bash
# 克隆 minixml 仓库
git clone https://github.com/mist64/minixml.git

# 进入源代码目录
cd minixml

# 编译
make
```

### 2. 基本用法

在使用 `minixml` 之前，你需要包括相关头文件。

```c
#include "minixml.h"
```

### 3. 解析 XML

#### 3.1. 读取和解析 XML 文件

你可以使用 `minixml` 提供的函数来读取和解析 XML 文件。

```c
#include <stdio.h>
#include "minixml.h"

int main() {
    // XML 文件路径
    const char *filename = "example.xml";

    // 解析 XML 文件
    xml_document_t *doc = xml_document_new();
    if (!xml_document_load(doc, filename)) {
        printf("Failed to load XML file: %s\n", filename);
        return 1;
    }

    // 获取根元素
    xml_element_t *root = xml_document_root(doc);
    if (!root) {
        printf("No root element found.\n");
        return 1;
    }

    // 输出根元素的名称
    printf("Root element: %s\n", xml_element_name(root));

    // 清理
    xml_document_free(doc);
    return 0;
}
```

#### 3.2. 解析 XML 字符串

如果你已经有一个 XML 字符串，可以直接解析它：

```c
const char *xml_string = "<root><item>value</item></root>";
xml_document_t *doc = xml_document_new();
if (!xml_document_parse_string(doc, xml_string)) {
    printf("Failed to parse XML string.\n");
    return 1;
}

xml_element_t *root = xml_document_root(doc);
printf("Root element: %s\n", xml_element_name(root));
xml_document_free(doc);
```

### 4. 遍历 XML 元素

你可以遍历 XML 元素并访问其属性和内容。

#### 4.1. 获取子元素

通过 `xml_element_get_child` 函数，可以遍历子元素：

```c
xml_element_t *root = xml_document_root(doc);
xml_element_t *child = xml_element_get_child(root);
while (child) {
    printf("Child element: %s\n", xml_element_name(child));
    child = xml_element_get_next_sibling(child);
}
```

#### 4.2. 获取属性

可以使用 `xml_element_get_attribute` 获取元素的属性：

```c
const char *attribute_value = xml_element_get_attribute(child, "attribute_name");
printf("Attribute value: %s\n", attribute_value);
```

#### 4.3. 获取元素的文本内容

要获取元素的文本内容，可以使用 `xml_element_get_text`：

```c
const char *text = xml_element_get_text(child);
printf("Element text: %s\n", text);
```

### 5. 创建和生成 XML

`minixml` 还支持创建新的 XML 元素，并将它们写入文件。

#### 5.1. 创建 XML 元素

创建一个新的 XML 元素：

```c
xml_element_t *root = xml_element_new("root");
xml_element_t *child = xml_element_new("item");

// 添加文本内容到元素
xml_element_set_text(child, "value");

// 将子元素添加到根元素
xml_element_add_child(root, child);
```

#### 5.2. 创建 XML 文档

```c
xml_document_t *doc = xml_document_new();
xml_document_set_root(doc, root);
```

#### 5.3. 将 XML 写入文件

将 XML 文档保存到文件：

```c
if (!xml_document_save(doc, "output.xml")) {
    printf("Failed to save XML file.\n");
}
```

### 6. 错误处理

`minixml` 提供了基本的错误处理机制，你可以使用 `xml_document_get_error` 获取错误信息：

```c
const char *error = xml_document_get_error(doc);
if (error) {
    printf("Error: %s\n", error);
}
```

### 7. 小结

`minixml` 是一个非常简单的 XML 解析库，适用于嵌入式系统或资源受限的环境。它提供了基本的 XML 解析和生成功能，并能够通过 API 操作 XML 元素和属性。通过结合这些功能，你可以方便地进行 XML 数据的读取、写入、修改和遍历。

如果你的需求只是简单的 XML 操作，`minixml` 是一个非常轻便且易于使用的选择。





# XML解析库mxml的使用

`mxml` 是一个轻量级的 XML 解析库，常用于嵌入式系统和对内存要求较高的场合。它支持解析、生成和操作 XML 文档。它非常适合需要快速解析和修改 XML 数据的项目，尤其是在资源有限的设备上。

以下是 `mxml` 库的基本使用方法，包括如何解析 XML 文件、遍历 XML 树、生成 XML 文档等。

### 1. 安装 `mxml`

你可以通过源代码来安装 `mxml`，或者通过包管理工具来安装。

#### 1.1 使用包管理器安装（以 Ubuntu 为例）

```bash
sudo apt-get install libmxml-dev
```

#### 1.2 从源代码安装

```bash
# 克隆 mxml 仓库
git clone https://github.com/michaelrsweet/mxml.git

# 进入目录
cd mxml

# 编译和安装
./configure
make
sudo make install
```

### 2. 使用 `mxml` 解析 XML

在使用 `mxml` 时，首先需要包含头文件：

```c
#include <mxml.h>
```

### 3. 解析 XML 文件

#### 3.1 解析 XML 文件

你可以使用 `mxmlLoadFile` 来加载和解析 XML 文件，并返回一个 `mxml_node_t` 类型的根节点。下面是一个基本示例：

```c
#include <stdio.h>
#include <mxml.h>

int main() {
    FILE *fp;
    mxml_node_t *tree;

    // 打开 XML 文件
    fp = fopen("example.xml", "r");
    if (!fp) {
        printf("Failed to open file.\n");
        return 1;
    }

    // 解析 XML 文件
    tree = mxmlLoadFile(NULL, fp, MXML_OPAQUE);
    if (!tree) {
        printf("Failed to parse XML file.\n");
        fclose(fp);
        return 1;
    }

    // 处理 XML 数据（例如输出根元素）
    mxml_node_t *root = mxmlGetFirstChild(tree);
    printf("Root element name: %s\n", mxmlGetElement(root));

    fclose(fp);
    mxmlDelete(tree); // 记得释放内存
    return 0;
}
```

#### 3.2 解析 XML 字符串

如果你有一个 XML 字符串，可以使用 `mxmlLoadString` 来解析字符串：

```c
#include <stdio.h>
#include <mxml.h>

int main() {
    const char *xml_string = "<root><child>data</child></root>";
    mxml_node_t *tree = mxmlLoadString(NULL, xml_string, MXML_OPAQUE);

    if (!tree) {
        printf("Failed to parse XML string.\n");
        return 1;
    }

    mxml_node_t *root = mxmlGetFirstChild(tree);
    printf("Root element name: %s\n", mxmlGetElement(root));

    mxmlDelete(tree); // 清理内存
    return 0;
}
```

### 4. 遍历 XML 元素

你可以使用 `mxmlGetFirstChild` 和 `mxmlGetNextSibling` 来遍历 XML 元素。

#### 4.1 获取子元素

```c
mxml_node_t *root = mxmlGetFirstChild(tree);
mxml_node_t *child = mxmlGetFirstChild(root);

while (child) {
    printf("Child element name: %s\n", mxmlGetElement(child));
    child = mxmlGetNextSibling(child); // 获取下一个兄弟元素
}
```

#### 4.2 获取元素内容

使用 `mxmlGetText` 获取元素的文本内容：

```c
mxml_node_t *child = mxmlGetFirstChild(root);
if (child) {
    const char *text = mxmlGetText(child, NULL);
    printf("Child element text: %s\n", text);
}
```

#### 4.3 获取元素的属性

`mxml` 提供了 `mxmlElementGetAttr` 来获取 XML 元素的属性值：

```c
mxml_node_t *child = mxmlGetFirstChild(root);
const char *attr_value = mxmlElementGetAttr(child, "attribute_name");
if (attr_value) {
    printf("Attribute value: %s\n", attr_value);
}
```

### 5. 创建和生成 XML 文档

#### 5.1 创建新的 XML 元素

你可以使用 `mxmlNewElement` 来创建新的元素，并通过 `mxmlNewText` 来为其添加文本内容。

```c
mxml_node_t *root = mxmlNewElement(NULL, "root");
mxml_node_t *child = mxmlNewElement(root, "child");
mxmlNewText(child, 0, "data");

```

#### 5.2 创建 XML 文档

你可以将元素添加到一个新的 XML 树：

```c
mxml_node_t *tree = mxmlNewXML("1.0");
mxml_node_t *root = mxmlNewElement(tree, "root");
mxml_node_t *child = mxmlNewElement(root, "child");
mxmlNewText(child, 0, "data");

```

#### 5.3 将 XML 输出到文件

可以使用 `mxmlSaveFile` 将 XML 树写入文件：

```c
FILE *fp = fopen("output.xml", "w");
if (fp) {
    mxmlSaveFile(tree, fp, MXML_NO_CALLBACK);
    fclose(fp);
}

```

### 6. 错误处理

`mxml` 提供了基本的错误处理机制，通常返回 `NULL` 时表示出现错误。你可以通过 `mxmlGetLastError` 来获取错误信息。

### 7. 清理内存

使用完 `mxml` 的 API 后，记得释放内存。使用 `mxmlDelete` 来释放解析树：

```c
mxmlDelete(tree); // 释放 XML 文档树

```

### 8. 示例：读取并修改 XML

下面是一个完整示例，演示如何读取、修改并保存 XML：

```c
#include <stdio.h>
#include <mxml.h>

int main() {
    // 读取 XML 文件
    FILE *fp = fopen("example.xml", "r");
    if (!fp) {
        printf("Failed to open file.\n");
        return 1;
    }

    mxml_node_t *tree = mxmlLoadFile(NULL, fp, MXML_OPAQUE);
    fclose(fp);
    if (!tree) {
        printf("Failed to parse XML file.\n");
        return 1;
    }

    // 获取根元素并修改内容
    mxml_node_t *root = mxmlGetFirstChild(tree);
    mxml_node_t *child = mxmlGetFirstChild(root);
    if (child) {
        mxmlNewText(child, 0, "modified data");
    }

    // 将修改后的 XML 保存到新文件
    fp = fopen("modified.xml", "w");
    if (fp) {
        mxmlSaveFile(tree, fp, MXML_NO_CALLBACK);
        fclose(fp);
        printf("XML saved to modified.xml\n");
    }

    // 释放内存
    mxmlDelete(tree);
    return 0;
}

```

### 9. 总结

`mxml` 是一个功能强大的轻量级 XML 解析库，适用于需要快速解析和生成 XML 文档的项目。它的 API 简单直观，适合用于嵌入式开发或资源有限的环境中。通过上述操作，你可以轻松解析、修改、创建 XML 文件，并进行简单的遍历和元素操作。