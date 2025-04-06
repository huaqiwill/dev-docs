# cJSON使用笔记

`cJSON` 是一个轻量级的 C 语言 JSON 解析库，适用于需要处理 JSON 数据的嵌入式系统或者对内存和资源有限的环境。下面是一些常见的 `cJSON` 使用笔记，包括基本的功能、示例和常见问题的解决方法。

## 1. cJSON 的基本使用

### 1.1. 引入头文件和链接库

```c
#include "cJSON.h"
```

### 1.2. 创建 JSON 对象

- 使用 `cJSON_CreateObject` 创建一个 JSON 对象。

```c
cJSON *json = cJSON_CreateObject();
```

### 1.3. 创建 JSON 数组

- 使用 `cJSON_CreateArray` 创建一个 JSON 数组。

```c
cJSON *json_array = cJSON_CreateArray();
```

### 1.4. 添加键值对

- 使用 `cJSON_AddItemToObject` 或者 `cJSON_AddStringToObject` 等函数向 JSON 对象添加键值对。

```c
cJSON_AddStringToObject(json, "name", "John");
cJSON_AddNumberToObject(json, "age", 25);
```

### 1.5. 添加元素到 JSON 数组

- 使用 `cJSON_AddItemToArray` 向 JSON 数组中添加元素。

```c
cJSON_AddItemToArray(json_array, cJSON_CreateString("apple"));
cJSON_AddItemToArray(json_array, cJSON_CreateString("banana"));
```

### 1.6. 输出 JSON 字符串

- 使用 `cJSON_Print` 或 `cJSON_PrintUnformatted` 输出 JSON 对象。

```c
char *json_string = cJSON_Print(json);
printf("%s\n", json_string);
```

## 2. 解析 JSON 数据

### 2.1. 解析 JSON 字符串

- 使用 `cJSON_Parse` 解析 JSON 字符串。

```c
const char *json_string = "{\"name\": \"John\", \"age\": 25}";
cJSON *json = cJSON_Parse(json_string);
```

### 2.2. 获取值

- 使用 `cJSON_GetObjectItemCaseSensitive` 获取对象中的键值。

```c
cJSON *name = cJSON_GetObjectItemCaseSensitive(json, "name");
if (cJSON_IsString(name) && (name->valuestring != NULL)) {
    printf("Name: %s\n", name->valuestring);
}
```

### 2.3. 获取数组中的元素

- 使用 `cJSON_GetArrayItem` 获取数组中的元素。

```c
cJSON *first_item = cJSON_GetArrayItem(json_array, 0);
if (cJSON_IsString(first_item) && (first_item->valuestring != NULL)) {
    printf("First item: %s\n", first_item->valuestring);
}
```

## 3. 销毁 JSON 对象

### 3.1. 销毁 JSON 对象

- 使用 `cJSON_Delete` 销毁 JSON 对象，释放内存。

```c
cJSON_Delete(json);
```

## 4. 示例：创建和解析 JSON

```c
#include <stdio.h>
#include "cJSON.h"

int main() {
    // 创建一个 JSON 对象
    cJSON *json = cJSON_CreateObject();
    
    // 添加数据
    cJSON_AddStringToObject(json, "name", "John");
    cJSON_AddNumberToObject(json, "age", 25);
    
    // 创建一个数组
    cJSON *json_array = cJSON_CreateArray();
    cJSON_AddItemToArray(json_array, cJSON_CreateString("apple"));
    cJSON_AddItemToArray(json_array, cJSON_CreateString("banana"));
    cJSON_AddItemToObject(json, "fruits", json_array);

    // 输出 JSON
    char *json_string = cJSON_Print(json);
    printf("Generated JSON:\n%s\n", json_string);
    
    // 解析 JSON
    const char *json_data = "{\"name\":\"John\", \"age\":25}";
    cJSON *parsed_json = cJSON_Parse(json_data);
    cJSON *name = cJSON_GetObjectItemCaseSensitive(parsed_json, "name");
    cJSON *age = cJSON_GetObjectItemCaseSensitive(parsed_json, "age");

    if (cJSON_IsString(name) && (name->valuestring != NULL)) {
        printf("Parsed Name: %s\n", name->valuestring);
    }
    if (cJSON_IsNumber(age)) {
        printf("Parsed Age: %d\n", age->valueint);
    }

    // 销毁 JSON 对象
    cJSON_Delete(json);
    cJSON_Delete(parsed_json);

    return 0;
}
```

## 5. 常见问题与解决

### 5.1. 解析失败

- 当 `cJSON_Parse` 解析失败时，可以使用 `cJSON_GetErrorPtr` 获取错误指针，定位错误位置。

```c
cJSON *json = cJSON_Parse(invalid_json_string);
if (!json) {
    const char *error_ptr = cJSON_GetErrorPtr();
    printf("Error before: %s\n", error_ptr);
}
```

### 5.2. 内存泄漏

- 在创建 JSON 对象时，确保在不需要时调用 `cJSON_Delete` 来释放内存。

### 5.3. 无法获取 JSON 值

- 检查键名是否正确，大小写敏感，确保值的类型匹配。

```c
cJSON *item = cJSON_GetObjectItemCaseSensitive(json, "key");
if (item != NULL && cJSON_IsString(item)) {
    printf("Value: %s\n", item->valuestring);
}
```

## 6. 小结

`cJSON` 是一个非常简洁的 JSON 解析库，适合嵌入式系统及 C 语言项目。在使用时，重点在于创建 JSON 对象、解析 JSON 字符串、正确处理内存和类型匹配。它提供了丰富的 API 来创建和访问 JSON 数据，可以满足大多数简单的 JSON 操作需求。