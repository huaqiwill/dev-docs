## C++ STL学习笔记

### 引言

C++ STL（Standard Template Library，标准模板库）是 C++ 编程语言的核心之一，提供了丰富的容器、算法、迭代器和函数对象。STL 让 C++ 编程变得更加简洁和高效，极大地提升了程序员的开发效率。STL 采用了泛型编程的思想，通过模板支持多种数据类型，从而实现了高度的代码复用。

在这篇学习笔记中，我将带你深入探讨 STL 中的各种组件，了解如何使用这些工具高效编写代码。同时，本文会通过具体的代码示例与解释，帮助你理解 STL 的核心概念。

------

### 1. STL的四大组成部分

C++ STL 主要由四个组成部分构成：**容器（Containers）**、**迭代器（Iterators）**、**算法（Algorithms）**、**函数对象（Functors）**。这些组件共同作用，提供了强大的数据结构操作和算法支持。

------

### 2. 容器（Containers）

容器是 STL 中最基本的组件，负责存储数据。C++ STL 提供了多种容器，以应对不同类型的数据存储需求。容器可以分为序列容器、关联容器和无序容器。

#### 2.1 序列容器

序列容器是按照元素的插入顺序来管理数据的容器。它们提供了线性的数据结构，支持随机访问和顺序访问。

##### `vector`（动态数组）

`vector` 是最常用的序列容器，底层实现为动态数组，支持快速的随机访问。适用于频繁访问和少量插入/删除操作的场景。

**代码示例：**

```cpp
#include <iostream>
#include <vector>

int main() {
    // 创建一个包含 3 个整数的 vector
    std::vector<int> vec = {1, 2, 3};
    
    // 添加元素
    vec.push_back(4);
    
    // 使用迭代器遍历
    for (auto it = vec.begin(); it != vec.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;

    // 使用下标访问元素
    std::cout << "Second element: " << vec[1] << std::endl;

    return 0;
}
```

**输出：**

```
1 2 3 4
Second element: 2
```

**解释：**

- `push_back()` 函数向 `vector` 末尾添加元素。
- 使用迭代器（`begin()` 和 `end()`）进行遍历。
- 使用下标（`[]`）访问特定位置的元素。

##### `list`（双向链表）

`list` 是双向链表的实现，适合频繁的插入和删除操作，但不支持高效的随机访问。

**代码示例：**

```cpp
#include <iostream>
#include <list>

int main() {
    // 创建一个空的 list
    std::list<int> myList;

    // 添加元素
    myList.push_back(1);
    myList.push_back(2);
    myList.push_front(0);

    // 使用迭代器遍历
    for (auto it = myList.begin(); it != myList.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

**输出：**

```
0 1 2
```

**解释：**

- `push_back()` 向 `list` 末尾添加元素。
- `push_front()` 向 `list` 头部添加元素。
- `list` 通过迭代器提供顺序访问。

##### `deque`（双端队列）

`deque` 是双端队列，支持在两端高效地插入和删除操作。它适用于频繁的两端操作，但不像 `vector` 那样支持高效的随机访问。

**代码示例：**

```cpp
#include <iostream>
#include <deque>

int main() {
    std::deque<int> myDeque = {1, 2, 3};

    // 从前端插入元素
    myDeque.push_front(0);
    // 从后端插入元素
    myDeque.push_back(4);

    // 遍历 deque
    for (auto &elem : myDeque) {
        std::cout << elem << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

**输出：**

```
0 1 2 3 4
```

**解释：**

- `push_front()` 和 `push_back()` 分别用于在 deque 的两端插入元素。
- 使用范围 `for` 循环进行遍历。

------

#### 2.2 关联容器

关联容器是一类根据键值进行快速查找的容器，底层通常使用哈希表或平衡二叉树来实现。

##### `map`（映射）

`map` 是一种关联容器，存储键值对（key-value）。每个键是唯一的，并且按键排序。

**代码示例：**

```cpp
#include <iostream>
#include <map>

int main() {
    std::map<int, std::string> myMap;

    // 添加键值对
    myMap[1] = "One";
    myMap[2] = "Two";
    myMap[3] = "Three";

    // 遍历 map
    for (const auto &pair : myMap) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }

    return 0;
}
```

**输出：**

```
1: One
2: Two
3: Three
```

**解释：**

- `map` 是一个有序容器，键值对按键的大小顺序自动排序。
- 使用范围 `for` 循环遍历 `map` 时，可以访问每个键值对。

##### `set`（集合）

`set` 是存储唯一元素的集合，所有元素都会自动按升序排序。

**代码示例：**

```cpp
#include <iostream>
#include <set>

int main() {
    std::set<int> mySet = {3, 1, 2};

    // 添加元素
    mySet.insert(4);

    // 遍历 set
    for (const auto &elem : mySet) {
        std::cout << elem << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

**输出：**

```
1 2 3 4
```

**解释：**

- `set` 自动按照元素大小排序，并且不允许重复元素。
- 使用范围 `for` 循环进行遍历。

------

#### 2.3 无序容器

无序容器类似于关联容器，但它们不保证元素的顺序。无序容器通常使用哈希表来存储元素。

##### `unordered_map`（无序映射）

`unordered_map` 与 `map` 类似，但是它不保证元素的顺序，而是通过哈希表进行快速查找。

**代码示例：**

```cpp
#include <iostream>
#include <unordered_map>

int main() {
    std::unordered_map<int, std::string> myUnorderedMap;

    // 添加键值对
    myUnorderedMap[1] = "One";
    myUnorderedMap[2] = "Two";
    myUnorderedMap[3] = "Three";

    // 遍历 unordered_map
    for (const auto &pair : myUnorderedMap) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }

    return 0;
}
```

**输出：**

```
1: One
2: Two
3: Three
```

**解释：**

- `unordered_map` 是无序的，元素的遍历顺序不可预测，但提供了快速的查找性能。

------

### 3. 迭代器（Iterators）

迭代器是 STL 中用于访问容器元素的对象。它们类似于指针，可以指向容器中的某个元素，并通过迭代器遍历容器中的所有元素。

#### 3.1 常见的迭代器类型

- **输入迭代器**：只能读取元素。
- **输出迭代器**：只能写入元素。
- **前向迭代器**：可读写元素，支持前向遍历。
- **双向迭代器**：支持前向和后向遍历。
- **随机访问迭代器**：支持任意位置访问元素。

#### 3.2 迭代器示例

```cpp
#include <iostream>
#include <vector>

int main() { 
    std::vector vec = {10, 20, 30, 40};
    // 创建迭代器
    auto it = vec.begin();
    // 迭代器遍历
    for (; it != vec.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    return 0;
}
```
**输出：**
```

10 20 30 40

```
**解释：**

- `vec.begin()` 返回指向容器第一个元素的迭代器，`vec.end()` 返回指向容器尾部之后的迭代器。
- 通过 `++it` 遍历容器元素。

---

### 4. 算法（Algorithms）

STL 提供了许多强大的算法，能够对容器中的数据进行各种常见操作，比如排序、查找、修改等。算法通过迭代器来访问容器元素，使得它们与容器解耦。

#### 4.1 排序算法

STL 提供了多个排序算法，最常用的是 `std::sort`。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> vec = {3, 1, 4, 1, 5, 9};

    // 排序
    std::sort(vec.begin(), vec.end());
    
    // 输出排序后的数组
    for (int num : vec) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

**输出：**

```
1 1 3 4 5 9
```

**解释：**

- `std::sort` 使用迭代器来排序容器中的元素，默认按升序排序。

#### 4.2 查找算法

`std::find` 用于查找容器中的元素。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> vec = {10, 20, 30, 40};

    auto it = std::find(vec.begin(), vec.end(), 30);
    if (it != vec.end()) {
        std::cout << "Found 30 at index: " << std::distance(vec.begin(), it) << std::endl;
    }
    
    return 0;
}
```

**输出：**

```
Found 30 at index: 2
```

**解释：**

- `std::find` 查找容器中是否存在指定元素，返回一个指向该元素的迭代器。

------

### 5. 函数对象（Functors）

函数对象是实现了 `operator()` 操作符的对象，使其可以像函数一样被调用。STL 中的算法和容器广泛使用函数对象来提供灵活性。

#### 5.1 使用函数对象

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

struct MultiplyBy {
    int factor;
    MultiplyBy(int f) : factor(f) {}
    int operator()(int val) { return val * factor; }
};

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};

    // 使用函数对象
    std::transform(vec.begin(), vec.end(), vec.begin(), MultiplyBy(2));
    
    for (int num : vec) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

**输出：**

```
2 4 6 8 10
```

**解释：**

- `MultiplyBy` 是一个函数对象，实现了 `operator()`，用于将元素乘以指定的因子。
- `std::transform` 使用该函数对象将 `vec` 中的元素乘以 2。

------

### 结语

C++ STL 是一个非常强大且灵活的工具集，它为我们提供了许多高效的数据结构和算法。通过学习和使用 STL，我们可以大大提高代码的可读性和开发效率。

在这篇学习笔记中，我详细介绍了 STL 的容器、迭代器、算法和函数对象。希望通过代码示例和详细解释，能够帮助你深入理解 STL 的核心概念，并能在实际开发中充分利用 STL 提供的功能。

