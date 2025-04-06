# C++ STL详解

STL 是 C++ 的标准模板库，它提供了一系列的数据结构和算法，可以帮助你编写高效和复用的 C++ 程序。STL 的主要组成部分有：

- **容器**，可以存储各种类型的数据，例如数组、链表、堆栈、队列、集合、映射等。
- **算法**，可以对容器中的数据进行排序、查找、计数、比较、修改等操作。
- **迭代器**，可以遍历容器中的数据，支持各种操作，例如过滤、转换、组合等。
- **函数对象**，可以将函数作为参数传递给算法，实现回调、适配器、绑定等功能。
- **适配器**，可以修改容器或函数对象的行为，例如反向迭代器、插入迭代器、取反函数等。
- **分配器**，可以管理容器中的内存分配和释放，提高性能和灵活性。

STL 的优点是它可以让你编写通用和可移植的代码，不依赖于特定的平台或编译器。STL 的缺点是它有一定的学习曲线，需要掌握模板和泛型编程的概念和技巧。如果你想了解更多关于 STL 的信息，你可以参考以下的网站：

- [C++ 标准模板库（STL） - GeeksforGeeks](https://www.geeksforgeeks.org/the-c-standard-template-library-stl/)：这是一个英文的网站，介绍了 STL 的基本概念和用法，包括容器、算法、迭代器等，有很多实例代码和解释。
- [【C++】标准模板库（STL）：超快入门！算法竞赛必看！ - 知乎](https://zhuanlan.zhihu.com/p/344558356)：这是一个中文的网站，用通俗易懂的语言介绍了 STL 的基本概念和用法，重点介绍了 vector、string、set、map、queue、stack、pair 等常用的容器，适合初学者和算法竞赛选手。
- [STL教程：C++ STL快速入门（非常详细） - C语言中文网](https://c.biancheng.net/stl/)：这是一个中文的网站，系统地介绍了 STL 的各个组成部分，包括容器、算法、迭代器、函数对象、适配器、分配器等，有很多详细的代码和注释，适合进阶学习和参考。
- [Standard Template Library - Wikipedia](https://ja.wikipedia.org/wiki/Standard_Template_Library)：这是一个日文的网站，介绍了 STL 的历史和设计思想，以及 STL 的各个组成部分，有很多链接和参考文献，适合深入了解和研究 STL。

希望这些信息对你有帮助，如果你有任何其他的问题，欢迎继续和我聊天。😊



##  STL有哪些容器？ 

STL 有以下几种容器：

- [**序列容器**，它们按照线性顺序存储元素，可以在任意位置插入和删除元素。常用的序列容器有 vector（向量）、deque（双端队列）、list（双向链表）、forward_list（单向链表）和 array（固定数组）](https://zhuanlan.zhihu.com/p/564057584)[1](https://zhuanlan.zhihu.com/p/564057584)。
- [**关联容器**，它们按照一定的规则存储元素，可以根据元素的键值快速查找元素。常用的关联容器有 set（集合）、multiset（多重集合）、map（映射）和 multimap（多重映射）](https://www.runoob.com/cplusplus/cpp-stl-tutorial.html)[2](https://www.runoob.com/cplusplus/cpp-stl-tutorial.html)。
- [**无序关联容器**，它们使用哈希表存储元素，可以根据元素的哈希值快速查找元素。常用的无序关联容器有 unordered_set（无序集合）、unordered_multiset（无序多重集合）、unordered_map（无序映射）和 unordered_multimap（无序多重映射）](https://c.biancheng.net/view/6560.html)[3](https://c.biancheng.net/view/6560.html)。
- [**容器适配器**，它们是对其他容器的封装，提供了一些特定的功能。常用的容器适配器有 stack（栈）、queue（队列）和 priority_queue（优先队列）](https://blog.csdn.net/hyl1181/article/details/108572531)[4](https://blog.csdn.net/hyl1181/article/details/108572531)。

你可以在[这个网站](https://zhuanlan.zhihu.com/p/564057584)或[这个网站](https://www.runoob.com/cplusplus/cpp-stl-tutorial.html)学习更多关于 STL 容器的知识。如果你有兴趣，你也可以阅读[这篇文章](https://c.biancheng.net/view/6560.html)或[这篇文章](https://blog.csdn.net/hyl1181/article/details/108572531)，它们介绍了 STL 容器的内部结构和实现原理。希望这些信息对你有帮助。😊

### 序列容器

```cpp
// 引入头文件
#include <iostream>
#include <vector>
#include <deque>
#include <list>
#include <forward_list>
#include <array>
using namespace std;

int main() {
    // vector 是一个动态数组，可以在尾部高效地插入和删除元素，也可以随机访问元素
    vector<int> v = {1, 2, 3, 4, 5}; // 创建一个包含 1, 2, 3, 4, 5 的 vector
    v.push_back(6); // 在尾部插入 6
    v.pop_back(); // 在尾部删除 6
    cout << v[2] << endl; // 随机访问第 3 个元素，输出 3
    cout << v.size() << endl; // 获取 vector 的大小，输出 5

    // deque 是一个双端队列，可以在头部和尾部高效地插入和删除元素，也可以随机访问元素
    deque<int> d = {1, 2, 3, 4, 5}; // 创建一个包含 1, 2, 3, 4, 5 的 deque
    d.push_front(0); // 在头部插入 0
    d.push_back(6); // 在尾部插入 6
    d.pop_front(); // 在头部删除 0
    d.pop_back(); // 在尾部删除 6
    cout << d[2] << endl; // 随机访问第 3 个元素，输出 3
    cout << d.size() << endl; // 获取 deque 的大小，输出 5

    // list 是一个双向链表，可以在任意位置高效地插入和删除元素，但不能随机访问元素
    list<int> l = {1, 2, 3, 4, 5}; // 创建一个包含 1, 2, 3, 4, 5 的 list
    l.push_front(0); // 在头部插入 0
    l.push_back(6); // 在尾部插入 6
    l.pop_front(); // 在头部删除 0
    l.pop_back(); // 在尾部删除 6
    cout << l.front() << endl; // 访问第 1 个元素，输出 1
    cout << l.back() << endl; // 访问最后 1 个元素，输出 5
    cout << l.size() << endl; // 获取 list 的大小，输出 5

    // forward_list 是一个单向链表，可以在任意位置高效地插入和删除元素，但不能随机访问元素
    forward_list<int> fl = {1, 2, 3, 4, 5}; // 创建一个包含 1, 2, 3, 4, 5 的 forward_list
    fl.push_front(0); // 在头部插入 0
    fl.pop_front(); // 在头部删除 0
    cout << fl.front() << endl; // 访问第 1 个元素，输出 1
    // cout << fl.back() << endl; // 错误，forward_list 没有 back() 方法
    // cout << fl.size() << endl; // 错误，forward_list 没有 size() 方法

    // array 是一个固定大小的数组，不能插入和删除元素，但可以随机访问元素
    array<int, 5> a = {1, 2, 3, 4, 5}; // 创建一个包含 1, 2, 3, 4, 5 的 array，大小为 5
    // a.push_back(6); // 错误，array 不能插入元素
    // a.pop_back(); // 错误，array 不能删除元素
    cout << a[2] << endl; // 随机访问第 3 个元素，输出 3
    cout << a.size() << endl; // 获取 array 的大小，输出 5

    return 0;
}
```

### 关联容器

```cpp
// 引入头文件
#include <iostream>
#include <map>
#include <set>
using namespace std;

int main() {
    // map 是一个映射容器，可以存储键值对，其中键是唯一的，可以根据键快速查找或修改值
    map<string, int> m; // 创建一个空的 map
    m["Alice"] = 18; // 插入一个键值对，键为 "Alice"，值为 18
    m["Bob"] = 20; // 插入一个键值对，键为 "Bob"，值为 20
    m["Charlie"] = 22; // 插入一个键值对，键为 "Charlie"，值为 22
    cout << m["Alice"] << endl; // 根据键 "Alice" 查找值，输出 18
    m["Alice"] = 19; // 根据键 "Alice" 修改值，将其改为 19
    cout << m["Alice"] << endl; // 输出 19
    cout << m.size() << endl; // 获取 map 的大小，输出 3

    // set 是一个集合容器，可以存储不重复的元素，可以根据元素的值快速查找或删除元素
    set<int> s; // 创建一个空的 set
    s.insert(10); // 插入一个元素，值为 10
    s.insert(20); // 插入一个元素，值为 20
    s.insert(30); // 插入一个元素，值为 30
    s.insert(10); // 插入一个重复的元素，值为 10，会被忽略
    cout << s.count(10) << endl; // 查找元素，值为 10，返回 1，表示存在
    cout << s.count(40) << endl; // 查找元素，值为 40，返回 0，表示不存在
    s.erase(10); // 删除元素，值为 10
    cout << s.count(10) << endl; // 返回 0，表示已经删除
    cout << s.size() << endl; // 获取 set 的大小，输出 2
    return 0;
}
```

### 容器适配器

```cpp
// 引入头文件
#include <iostream>
#include <stack>
#include <queue>
#include <vector>
using namespace std;

int main() {
    // stack 是一个栈容器适配器，可以实现后进先出（LIFO）的操作，只能在栈顶插入和删除元素
    stack<int> s; // 创建一个空的 stack
    s.push(10); // 在栈顶压入 10
    s.push(20); // 在栈顶压入 20
    s.push(30); // 在栈顶压入 30
    cout << s.top() << endl; // 访问栈顶元素，输出 30
    s.pop(); // 弹出栈顶元素
    cout << s.top() << endl; // 输出 20
    cout << s.size() << endl; // 获取 stack 的大小，输出 2
    cout << s.empty() << endl; // 判断 stack 是否为空，输出 0（表示非空）

    // queue 是一个队列容器适配器，可以实现先进先出（FIFO）的操作，只能在队尾插入元素，在队头删除元素
    queue<int> q; // 创建一个空的 queue
    q.push(10); // 在队尾压入 10
    q.push(20); // 在队尾压入 20
    q.push(30); // 在队尾压入 30
    cout << q.front() << endl; // 访问队头元素，输出 10
    cout << q.back() << endl; // 访问队尾元素，输出 30
    q.pop(); // 弹出队头元素
    cout << q.front() << endl; // 输出 20
    cout << q.size() << endl; // 获取 queue 的大小，输出 2
    cout << q.empty() << endl; // 判断 queue 是否为空，输出 0（表示非空）

    // priority_queue 是一个优先队列容器适配器，可以实现按照元素的优先级顺序插入和删除元素，底层使用堆排序
    priority_queue<int> pq; // 创建一个空的 priority_queue，默认是大顶堆，即元素越大优先级越高
    pq.push(10); // 压入 10
    pq.push(20); // 压入 20
    pq.push(30); // 压入 30
    cout << pq.top() << endl; // 访问优先级最高的元素，输出 30
    pq.pop(); // 弹出优先级最高的元素
    cout << pq.top() << endl; // 输出 20
    cout << pq.size() << endl; // 获取 priority_queue 的大小，输出 2
    cout << pq.empty() << endl; // 判断 priority_queue 是否为空，输出 0（表示非空）

    // priority_queue 也可以使用自定义的比较函数或者类，来实现不同的优先级规则，例如小顶堆或者按照其他属性排序
    // 例如，我们可以定义一个学生类，包含姓名和成绩两个属性，然后使用一个比较类，按照成绩从高到低排序
    class Student { // 定义学生类
    public:
        string name; // 姓名
        int score; // 成绩
        Student(string n, int s) : name(n), score(s) {} // 构造函数
    };

    class Compare { // 定义比较类
    public:
        bool operator()(const Student& s1, const Student& s2) { // 重载 () 运算符
            return s1.score < s2.score; // 按照成绩从高到低排序，如果成绩相同，按照插入顺序排序
        }
    };

    priority_queue<Student, vector<Student>, Compare> pq2; // 创建一个自定义的 priority_queue，使用 vector 作为底层容器，使用 Compare 作为比较类
    pq2.push(Student("Alice", 90)); // 压入一个学生对象
    pq2.push(Student("Bob", 80)); // 压入一个学生对象
    pq2.push(Student("Charlie", 85)); // 压入一个学生对象
    cout << pq2.top().name << " " << pq2.top().score << endl; // 访问优先级最高的学生对象，输出 Alice 90
    pq2.pop(); // 弹出优先级最高的学生对象
    cout << pq2.top().name << " " << pq2.top().score << endl; // 输出 Charlie 85
    cout << pq2.size() << endl; // 获取 priority_queue 的大小，输出 2
    cout << pq2.empty() << endl; // 判断 priority_queue 是否为空，输出 0（表示非空）

    return 0;
}
```

##  STL有哪些算法？ 

[STL 是 C++ 的标准模板库，它提供了一系列的数据结构和算法，可以帮助你编写高效和复用的 C++ 程序。STL 的算法主要在头文件 、、 中，包括以下几类](https://blog.csdn.net/qq_52324409/article/details/121581591)[1](https://blog.csdn.net/qq_52324409/article/details/121581591)：

- **非变动性算法**，它们不会改变容器中的元素内容，例如查找、计数、遍历、比较、寻找极值等。
- **变动性算法**，它们会改变容器中的元素内容，例如拷贝、互换、替换、填充、删除、排序、随机重排等。
- **排序算法**，它们会对容器中的元素进行排序，例如 sort、stable_sort、partial_sort、nth_element、inplace_merge 等。
- **有序区间算法**，它们会对已经排序的容器中的元素进行操作，例如 lower_bound、upper_bound、equal_range、binary_search、merge、set_union、set_intersection、set_difference、set_symmetric_difference、includes 等。
- **数值算法**，它们会对容器中的元素进行数学运算，例如 accumulate、inner_product、partial_sum、adjacent_difference、power、iota 等。

你可以在[这个网站](https://zhuanlan.zhihu.com/p/381607411)或[这个网站](https://c.biancheng.net/stl/algorithms/)学习更多关于 STL 算法的知识，也可以在[这个网站](https://blog.csdn.net/qq_52324409/article/details/121581591)或[这个网站](https://blog.csdn.net/weixin_42608414/article/details/126064929)查看一些 STL 算法的示例代码。希望这些信息对你有帮助，如果你有任何其他的问题，欢迎继续和我聊天。😊

### 非变动性算法

```cpp
// 引入头文件
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // 创建一个包含 1, 2, 3, 4, 5 的 vector
    vector<int> v = {1, 2, 3, 4, 5};
    // 定义一个打印元素的函数
    void print(int n) {
        cout << n << " ";
    }
    // 定义一个判断元素是否为奇数的函数
    bool is_odd(int n) {
        return n % 2 == 1;
    }
    // 使用 for_each 算法，对容器中的每个元素执行 print 函数
    for_each(v.begin(), v.end(), print); // 输出 1 2 3 4 5
    cout << endl;
    // 使用 min_element 算法，找出容器中的最小元素
    auto it = min_element(v.begin(), v.end()); // 返回一个迭代器，指向最小元素的位置
    cout << *it << endl; // 输出 1
    // 使用 find_if 算法，找出容器中第一个满足 is_odd 函数的元素
    it = find_if(v.begin(), v.end(), is_odd); // 返回一个迭代器，指向第一个奇数的位置
    cout << *it << endl; // 输出 1
    // 使用 search 算法，找出容器中是否包含子区间 {3, 4}
    it = search(v.begin(), v.end(), {3, 4}); // 返回一个迭代器，指向子区间的第一个元素的位置
    cout << *it << endl; // 输出 3
    return 0;
}
```

### 变动性算法

```cpp
// 引入头文件
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // 创建一个包含 1, 2, 3, 4, 5 的 vector
    vector<int> v = {1, 2, 3, 4, 5};
    // 定义一个打印元素的函数
    void print(int n) {
        cout << n << " ";
    }
    // 定义一个判断元素是否为奇数的函数
    bool is_odd(int n) {
        return n % 2 == 1;
    }
    // 使用 for_each 算法，对容器中的每个元素执行 print 函数
    for_each(v.begin(), v.end(), print); // 输出 1 2 3 4 5
    cout << endl;
    // 使用 swap_ranges 算法，交换两个区间内的元素
    swap_ranges(v.begin(), v.begin() + 3, v.end() - 3); // 交换前三个和后三个元素
    for_each(v.begin(), v.end(), print); // 输出 4 5 3 1 2
    cout << endl;
    // 使用 fill 算法，以给定值替换每一个元素
    fill(v.begin(), v.end(), 0); // 用 0 替换所有元素
    for_each(v.begin(), v.end(), print); // 输出 0 0 0 0 0
    cout << endl;
    // 使用 transform 算法，变动（并复制）元素，将两个区间的元素合并
    vector<int> v2 = {1, 2, 3, 4, 5}; // 创建另一个 vector
    vector<int> v3(5); // 创建一个空的 vector，大小为 5
    transform(v2.begin(), v2.end(), v.begin(), v3.begin(), plus<int>()); // 将 v2 和 v 的元素相加，存入 v3
    for_each(v3.begin(), v3.end(), print); // 输出 1 2 3 4 5
    cout << endl;
    // 使用 replace_copy_if 算法，将满足条件的元素替换为给定值，并复制到另一个区间
    replace_copy_if(v2.begin(), v2.end(), v.begin(), is_odd, 0); // 将 v2 中的奇数替换为 0，并复制到 v
    for_each(v.begin(), v.end(), print); // 输出 0 2 0 4 0
    cout << endl;
    return 0;
}
```



### 排序算法

```cpp
// 引入头文件
#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

int main() {
    // 创建一个包含 1, 2, 3, 4, 5 的 vector
    vector<int> v = {1, 2, 3, 4, 5};
    // 定义一个打印元素的函数
    void print(int n) {
        cout << n << " ";
    }
    // 使用 sort 算法，对容器中的元素进行升序排序，默认使用 < 运算符比较元素
    sort(v.begin(), v.end()); // 将 v 中的元素从小到大排序
    for_each(v.begin(), v.end(), print); // 输出 1 2 3 4 5
    cout << endl;
    // 使用 sort 算法，对容器中的元素进行降序排序，可以传入一个自定义的比较函数或者函数对象
    sort(v.begin(), v.end(), greater<int>()); // 将 v 中的元素从大到小排序，使用 greater<int>() 函数对象比较元素
    for_each(v.begin(), v.end(), print); // 输出 5 4 3 2 1
    cout << endl;
    // 使用 stable_sort 算法，对容器中的元素进行稳定排序，即保持相等元素的相对顺序不变
    vector<pair<int, char>> vp = {{1, 'a'}, {2, 'b'}, {1, 'c'}, {2, 'd'}, {1, 'e'}}; // 创建一个包含一对整数和字符的 vector
    stable_sort(vp.begin(), vp.end()); // 将 vp 中的元素按照整数部分升序排序，相等的元素按照字符部分保持原来的顺序
    for (auto p : vp) { // 遍历 vp 中的元素
        cout << p.first << " " << p.second << endl; // 输出一对整数和字符
    }
    // 输出结果为：
    // 1 a
    // 1 c
    // 1 e
    // 2 b
    // 2 d
    // 使用 partial_sort 算法，对容器中的部分元素进行排序，使得前 n 个元素是整个容器中最小的 n 个元素，且按照升序排列
    vector<int> v2 = {5, 4, 3, 2, 1}; // 创建一个包含 5, 4, 3, 2, 1 的 vector
    partial_sort(v2.begin(), v2.begin() + 3, v2.end()); // 将 v2 中的前 3 个元素排序，使得它们是整个 v2 中最小的 3 个元素
    for_each(v2.begin(), v2.end(), print); // 输出 1 2 3 5 4
    cout << endl;
    // 使用 nth_element 算法，对容器中的元素进行部分排序，使得第 n 个元素是整个容器中第 n 小的元素，且左边的元素都小于等于它，右边的元素都大于等于它
    vector<int> v3 = {5, 4, 3, 2, 1}; // 创建一个包含 5, 4, 3, 2, 1 的 vector
    nth_element(v3.begin(), v3.begin() + 2, v3.end()); // 将 v3 中的第 3 个元素排序，使得它是整个 v3 中第 3 小的元素
    for_each(v3.begin(), v3.end(), print); // 输出 1 2 3 5 4
    cout << endl;
    return 0;
}

```







### 有序区间算法

```cpp
// 引入头文件
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // 创建两个已经排序的 vector
    vector<int> v1 = {1, 2, 3, 4, 5};
    vector<int> v2 = {3, 4, 5, 6, 7};
    // 定义一个打印元素的函数
    void print(int n) {
        cout << n << " ";
    }
    // 使用 lower_bound 算法，找出第一个不小于给定值的元素的位置
    auto it = lower_bound(v1.begin(), v1.end(), 3); // 返回一个迭代器，指向第一个不小于 3 的元素的位置
    cout << *it << endl; // 输出 3
    // 使用 upper_bound 算法，找出第一个大于给定值的元素的位置
    it = upper_bound(v1.begin(), v1.end(), 3); // 返回一个迭代器，指向第一个大于 3 的元素的位置
    cout << *it << endl; // 输出 4
    // 使用 equal_range 算法，同时找出 lower_bound 和 upper_bound 的位置
    auto p = equal_range(v1.begin(), v1.end(), 3); // 返回一个 pair，包含 lower_bound 和 upper_bound 的迭代器
    cout << *p.first << " " << *p.second << endl; // 输出 3 4
    // 使用 binary_search 算法，判断一个元素是否存在于一个有序区间中
    bool b = binary_search(v1.begin(), v1.end(), 3); // 返回一个布尔值，表示 3 是否存在于 v1 中
    cout << b << endl; // 输出 1（表示真）
    // 使用 merge 算法，将两个有序区间合并为一个有序区间
    vector<int> v3(10); // 创建一个空的 vector，大小为 10
    merge(v1.begin(), v1.end(), v2.begin(), v2.end(), v3.begin()); // 将 v1 和 v2 合并为 v3
    for_each(v3.begin(), v3.end(), print); // 输出 1 2 3 3 4 4 5 5 6 7
    cout << endl;
    // 使用 set_union 算法，求两个有序区间的并集
    vector<int> v4(6); // 创建一个空的 vector，大小为 6
    set_union(v1.begin(), v1.end(), v2.begin(), v2.end(), v4.begin()); // 将 v1 和 v2 的并集存入 v4
    for_each(v4.begin(), v4.end(), print); // 输出 1 2 3 4 5 6 7
    cout << endl;
    // 使用 set_intersection 算法，求两个有序区间的交集
    vector<int> v5(3); // 创建一个空的 vector，大小为 3
    set_intersection(v1.begin(), v1.end(), v2.begin(), v2.end(), v5.begin()); // 将 v1 和 v2 的交集存入 v5
    for_each(v5.begin(), v5.end(), print); // 输出 3 4 5
    cout << endl;
    // 使用 set_difference 算法，求两个有序区间的差集
    vector<int> v6(2); // 创建一个空的 vector，大小为 2
    set_difference(v1.begin(), v1.end(), v2.begin(), v2.end(), v6.begin()); // 将 v1 和 v2 的差集存入 v6
    for_each(v6.begin(), v6.end(), print); // 输出 1 2
    cout << endl;
    // 使用 set_symmetric_difference 算法，求两个有序区间的对称差集
    vector<int> v7(4); // 创建一个空的 vector，大小为 4
    set_symmetric_difference(v1.begin(), v1.end(), v2.begin(), v2.end(), v7.begin()); // 将 v1 和 v2 的对称差集存入 v7
    for_each(v7.begin(), v7.end(), print); // 输出 1 2 6 7
    cout << endl;
    // 使用 includes 算法，判断一个有序区间是否包含另一个有序区间
    b = includes(v1.begin(), v1.end(), v5.begin(), v5.end()); // 返回一个布尔值，表示 v1 是否包含 v5
    cout << b << endl; // 输出 1（表示真）
    return 0;
}

```



### 数值算法

```cpp
// 引入头文件
#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    // 创建一个包含 1, 2, 3, 4, 5 的 vector
    vector<int> v = {1, 2, 3, 4, 5};
    // 定义一个打印元素的函数
    void print(int n) {
        cout << n << " ";
    }
    // 使用 accumulate 算法，计算容器中所有元素的总和
    int sum = accumulate(v.begin(), v.end(), 0); // 传入起始迭代器、结束迭代器和初始值，返回总和
    cout << sum << endl; // 输出 15
    // 使用 accumulate 算法，计算容器中所有元素的乘积
    int product = accumulate(v.begin(), v.end(), 1, multiplies<int>()); // 传入起始迭代器、结束迭代器、初始值和乘法函数对象，返回乘积
    cout << product << endl; // 输出 120
    // 使用 inner_product 算法，计算两个容器中对应元素的乘积之和
    vector<int> v2 = {6, 7, 8, 9, 10}; // 创建另一个 vector
    int dot = inner_product(v.begin(), v.end(), v2.begin(), 0); // 传入第一个容器的起始迭代器、结束迭代器、第二个容器的起始迭代器和初始值，返回乘积之和
    cout << dot << endl; // 输出 130
    // 使用 inner_product 算法，计算两个容器中对应元素的差的平方之和
    int dist = inner_product(v.begin(), v.end(), v2.begin(), 0, plus<int>(), {return (x - y) * (x - y);}); // 传入第一个容器的起始迭代器、结束迭代器、第二个容器的起始迭代器、初始值、加法函数和自定义的差的平方函数，返回差的平方之和
    cout << dist << endl; // 输出 55
    // 使用 partial_sum 算法，计算容器中每个位置的前缀和
    vector<int> v3(5); // 创建一个空的 vector，大小为 5
    partial_sum(v.begin(), v.end(), v3.begin()); // 传入原容器的起始迭代器、结束迭代器和目标容器的起始迭代器，将前缀和存入目标容器
    for_each(v3.begin(), v3.end(), print); // 输出 1 3 6 10 15
    cout << endl;
    // 使用 partial_sum 算法，计算容器中每个位置的前缀积
    vector<int> v4(5); // 创建一个空的 vector，大小为 5
    partial_sum(v.begin(), v.end(), v4.begin(), multiplies<int>()); // 传入原容器的起始迭代器、结束迭代器、目标容器的起始迭代器和乘法函数，将前缀积存入目标容器
    for_each(v4.begin(), v4.end(), print); // 输出 1 2 6 24 120
    cout << endl;
    // 使用 adjacent_difference 算法，计算容器中相邻元素的差
    vector<int> v5(5); // 创建一个空的 vector，大小为 5
    adjacent_difference(v.begin(), v.end(), v5.begin()); // 传入原容器的起始迭代器、结束迭代器和目标容器的起始迭代器，将相邻元素的差存入目标容器
    for_each(v5.begin(), v5.end(), print); // 输出 1 1 1 1 1
    cout << endl;
    // 使用 adjacent_difference 算法，计算容器中相邻元素的商
    vector<int> v6(5); // 创建一个空的 vector，大小为 5
    adjacent_difference(v.begin(), v.end(), v6.begin(), divides<int>()); // 传入原容器的起始迭代器、结束迭代器、目标容器的起始迭代器和除法函数，将相邻元素的商存入目标容器
    for_each(v6.begin(), v6.end(), print); // 输出 1 2 1 1 1
    cout << endl;
    // 使用 iota 算法，生成一个从给定值开始的递增序列
    vector<int> v7(5); // 创建一个空的 vector，大小为 5
    iota(v7.begin(), v7.end(), 10); // 传入目标容器的起始迭代器、结束迭代器和初始值，将递增序列存入目标容器
    for_each(v7.begin(), v7.end(), print); // 输出 10 11 12 13 14
    cout << endl;
    return 0;
}

```



## STL有哪些迭代器？

[C++ STL 容器迭代器是一种用于访问和遍历容器中元素的数据类型，它提供了一种统一的接口，使得不同类型的容器可以以相似的方式进行操作。C++ STL 容器迭代器有以下几种](https://blog.csdn.net/qq_52324409/article/details/121048486)[1](https://blog.csdn.net/qq_52324409/article/details/121048486)：

- **输入迭代器**，它们支持对容器中的元素进行逐个遍历和读取，但不能修改元素，只能用于单遍扫描算法。
- **输出迭代器**，它们支持对容器中的元素进行逐个遍历和写入，但不能读取元素，只能用于单遍扫描算法。
- **前向迭代器**，它们支持向前逐个遍历元素，可以对元素进行读取和写入，可以用于多遍扫描算法。
- **双向迭代器**，它们支持向前和向后逐个遍历元素，可以对元素进行读取和写入，可以用于多遍扫描算法。
- **随机访问迭代器**，它们支持对元素的随机位置访问，可以对元素进行读取和写入，可以用于多遍扫描算法。

[不同的容器有不同的迭代器类型，例如，vector 和 deque 支持随机访问迭代器，list 和 set 支持双向迭代器，stack 和 queue 不支持迭代器](https://zhuanlan.zhihu.com/p/352606819)[2](https://zhuanlan.zhihu.com/p/352606819)。你可以在[这个网站](https://zhuanlan.zhihu.com/p/429076510)或[这个网站](https://zhuanlan.zhihu.com/p/143797824)学习更多关于 C++ STL 容器迭代器的知识，也可以在[这个网站](https://blog.csdn.net/qq_26735913/article/details/111301047)或[这个网站](https://blog.csdn.net/qq_52324409/article/details/121048486)查看一些 C++ STL 容器迭代器的示例代码。希望这些信息对你有帮助，如果你有任何其他的问题，欢迎继续和我聊天。😊

### 输入迭代器





### 输出迭代器





### 前向迭代器



### 双向迭代器



### 随机访问迭代器



## STL有哪些适配器？

[STL 是 C++ 的标准模板库，它提供了一系列的数据结构和算法，可以帮助你编写高效和复用的 C++ 程序。STL 有以下几种适配器](https://blog.csdn.net/yueguangmuyu/article/details/114359975)[1](https://blog.csdn.net/yueguangmuyu/article/details/114359975)：

- **容器适配器**，它们改变容器的接口，使之适应特定的数据结构，例如 stack、queue、priority_queue 等。
- **迭代器适配器**，它们改变迭代器的行为，使之适应不同的遍历方式，例如 reverse_iterator、insert_iterator、istream_iterator、ostream_iterator 等。
- **函数适配器**，它们改变函数或仿函数的行为，使之适应不同的算法需求，例如 bind、not1、not2、compose1、compose2 等。

你可以在[这个网站](https://zhuanlan.zhihu.com/p/610255181)或[这个网站](https://blog.csdn.net/weixin_39640298/article/details/88767303)学习更多关于 STL 适配器的知识，也可以在[这个网站](https://developer.aliyun.com/article/1198045)或[这个网站](https://cloud.tencent.com/developer/article/2299224)查看一些 STL 适配器的示例代码。希望这些信息对你有帮助，如果你有任何其他的问题，欢迎继续和我聊天。😊

### 迭代器适配器





### 函数适配器









## STL有哪些分配器？

[C++ STL 有哪些分配器？分配器是一种用于管理容器内存分配的类模板，它提供了一种抽象的接口，使得不同的内存分配策略可以适用于不同的容器。C++ STL 有以下几种分配器](https://zhuanlan.zhihu.com/p/185611161)[1](https://zhuanlan.zhihu.com/p/185611161)：

- **std::allocator**，这是最常用的分配器，它使用 new 和 delete 操作符来分配和释放内存，它是大多数容器的默认分配器。
- **std::allocator_traits**，这是一个用于提供分配器特性和操作的类模板，它可以适配不同版本的分配器接口，使得容器可以与任何符合最低要求的分配器兼容。
- **std::polymorphic_allocator**，这是一个多态分配器，它使用 std::memory_resource 对象来分配和释放内存，它可以在运行时动态改变内存资源，实现不同的内存管理策略。
- **std::scoped_allocator_adaptor**，这是一个用于支持嵌套容器的分配器适配器，它可以将多个分配器封装在一起，使得外层容器和内层容器可以使用不同的分配器。
- **std::new_allocator**，这是一个底层的分配器，它使用 ::operator new 和 ::operator delete 来分配和释放内存，它是 std::allocator 的基类。
- **std::allocator_arg_t**，这是一个空结构体，用于标识分配器感知的构造函数和工厂函数的第一个参数，它可以用于传递分配器给需要使用分配器的对象。

如果你想了解更多关于 C++ STL 分配器的知识，你可以参考[这个网站](https://blog.csdn.net/JMW1407/article/details/106868553)或[这个网站](https://zhuanlan.zhihu.com/p/548339711)，它们提供了详细的文档和说明。希望这些信息对你有帮助，如果你有任何其他的问题，欢迎继续和我聊天。😊



```cpp
// 引入头文件
#include <iostream>
#include <vector>
#include <memory>
using namespace std;

int main() {
    // 创建一个 int 类型的默认分配器对象
    allocator<int> alloc;
    // 使用 allocate 方法，分配 10 个 int 类型的内存空间，返回一个指向首元素的指针
    int *p = alloc.allocate(10);
    // 使用 construct 方法，在分配的内存空间上构造对象，传入对象的地址和初始值
    for (int i = 0; i < 10; i++) {
        alloc.construct(p + i, i + 1); // 构造 1, 2, ..., 10
    }
    // 使用 address 方法，获取对象的地址，传入对象的引用
    cout << alloc.address(*p) << endl; // 输出 p 的地址
    // 使用 max_size 方法，获取分配器支持的最大内存数，返回一个 size_t 类型的值
    cout << alloc.max_size() << endl; // 输出一个很大的数
    // 使用 destroy 方法，销毁对象，传入对象的地址
    for (int i = 0; i < 10; i++) {
        alloc.destroy(p + i); // 销毁 1, 2, ..., 10
    }
    // 使用 deallocate 方法，释放内存空间，传入指针和内存大小
    alloc.deallocate(p, 10); // 释放 p 指向的内存空间
    // 创建一个 vector<int> 类型的默认分配器对象
    allocator<vector<int>> alloc2;
    // 使用 allocate 方法，分配 1 个 vector<int> 类型的内存空间，返回一个指向首元素的指针
    vector<int> *v = alloc2.allocate(1);
    // 使用 construct 方法，在分配的内存空间上构造对象，传入对象的地址和初始值
    alloc2.construct(v, {1, 2, 3, 4, 5}); // 构造一个包含 1, 2, 3, 4, 5 的 vector
    // 使用 address 方法，获取对象的地址，传入对象的引用
    cout << alloc2.address(*v) << endl; // 输出 v 的地址
    // 使用 max_size 方法，获取分配器支持的最大内存数，返回一个 size_t 类型的值
    cout << alloc2.max_size() << endl; // 输出一个很大的数
    // 使用 destroy 方法，销毁对象，传入对象的地址
    alloc2.destroy(v); // 销毁 vector
    // 使用 deallocate 方法，释放内存空间，传入指针和内存大小
    alloc2.deallocate(v, 1); // 释放 v 指向的内存空间
    return 0;
}

```
























