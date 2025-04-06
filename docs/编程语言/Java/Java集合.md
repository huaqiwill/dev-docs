# Java集合和泛型

### Java集合

* ArrayList
* LinkedList
* List
* Set
* HashSet
* LinkedHashSet
* TreeSet





Java中的集合（Collections）和泛型（Generics）是两大核心概念，对于Java开发者来说非常重要。下面我会简要概述这些知识点。

### 1. **Java集合框架**

Java集合框架是一组接口、类和算法的集合，用于存储、操作和检索数据。它提供了多种数据结构，如列表、集合、映射等。

#### 主要接口：

- **Collection**：是所有集合类的根接口，继承了 `Iterable` 接口。`Collection` 接口有多个子接口，主要包括 `Set`、`List` 和 `Queue`。
  - **Set**：不允许重复的元素，常用实现类有 `HashSet`、`LinkedHashSet` 和 `TreeSet`。
  - **List**：有序集合，可以存储重复元素，常用实现类有 `ArrayList`、`LinkedList` 和 `Vector`。
  - **Queue**：队列接口，常用于按顺序处理元素，常用实现类有 `LinkedList`（同时实现了 `List` 和 `Queue`）、`PriorityQueue` 等。
- **Map**：用于存储键值对，不属于 `Collection` 的子接口。常用实现类有 `HashMap`、`TreeMap`、`LinkedHashMap` 等。

#### 常见集合类：

- **ArrayList**：基于动态数组实现，支持随机访问，适合查找多于插入的场景。
- **LinkedList**：基于链表实现，支持快速的插入和删除，但查找相对较慢。
- **HashSet**：基于哈希表实现，存储的元素无序且不可重复。
- **TreeSet**：基于红黑树实现，存储的元素按自然顺序或指定的比较器排序。
- **HashMap**：基于哈希表实现，存储键值对，允许键值为 `null`，键不重复，值可以重复。
- **TreeMap**：基于红黑树实现，按键的自然顺序或指定的比较器排序键。

#### 集合常用方法：

- `add(E e)`：向集合中添加元素。
- `remove(Object o)`：从集合中删除指定元素。
- `size()`：返回集合的元素个数。
- `contains(Object o)`：检查集合是否包含指定元素。
- `iterator()`：返回集合的迭代器，可以用于遍历集合。

------

### 2. **Java泛型（Generics）**

泛型是Java语言的一项强大功能，允许在定义类、接口和方法时，使用类型参数，而不需要指定具体的类型。这样做的好处是可以提高代码的复用性，并且提供更强的类型检查。

#### 泛型的基本语法：

- **类和接口的泛型声明**：

  ```java
  class Box<T> {
      private T value;
      
      public T getValue() {
          return value;
      }
  
      public void setValue(T value) {
          this.value = value;
      }
  }
  ```

  在上面的例子中，`T` 是泛型类型参数，代表任意类型。在使用时，可以替换成具体的类型，例如：

  ```java
  Box<Integer> intBox = new Box<>();
  intBox.setValue(10);
  Integer value = intBox.getValue();
  ```

- **方法的泛型声明**：

  ```java
  public <T> void printArray(T[] array) {
      for (T element : array) {
          System.out.println(element);
      }
  }
  ```

  这里的 `` 是方法的泛型声明，它使得 `printArray` 方法可以接受任何类型的数组。

#### 泛型的特性：

- **类型安全**：泛型让你在编译时就能捕获类型错误，避免了运行时的 `ClassCastException`。
- **消除强制类型转换**：使用泛型后，不再需要显式的类型转换，减少了代码的冗余。

#### 泛型的类型参数限制：

你可以使用 `extends` 关键字来指定泛型类型的上限，限制泛型参数只能是某个类的子类或实现某个接口的类型。

```java
class Box<T extends Number> {
    private T value;
    public void setValue(T value) {
        this.value = value;
    }
    public T getValue() {
        return value;
    }
}
```

这个例子中，`T` 被限制为 `Number` 类型及其子类，如 `Integer`、`Double` 等。

#### 通配符（Wildcard）：

在某些情况下，你可能不知道泛型类型的具体类型，可以使用通配符：

- **`?`**：表示未知类型。
- **`? extends T`**：表示 `T` 类型的某个子类或 `T` 本身。
- **`? super T`**：表示 `T` 类型的某个父类或 `T` 本身。

示例：

```java
// 允许传入任何类型的集合
public static void printList(List<?> list) {
    for (Object obj : list) {
        System.out.println(obj);
    }
}

// 只允许传入 T 或其子类型的集合
public static void addNumbers(List<? extends Number> list) {
    // list.add(10); // 编译错误，因为我们不知道实际类型
}

// 只允许传入 T 或其父类型的集合
public static void addNumbers(List<? super Integer> list) {
    list.add(10); // 可以添加 Integer 或其父类型的数据
}
```

------

### 3. **泛型的擦除（Type Erasure）**

Java中的泛型是在编译时进行类型检查的，但在运行时，所有的泛型类型都会被擦除为原始类型。也就是说，Java的泛型是**类型擦除**的。

- 在编译时，`List` 和 `List` 会被擦除为 `List`。

- 泛型的类型参数信息在运行时是不可用的。

- 例如，

  ```
  instanceof
  ```

   操作符不能用于泛型类型参数： 

  ```java
  List<String> list = new ArrayList<>();
  // 编译错误，因为类型参数在运行时擦除
  // if (list instanceof List<String>) { }
  ```

------

### 4. **泛型的常见应用**

- **集合框架**：大部分集合类，如 `ArrayList`、`HashMap`、`HashSet` 等，都使用了泛型。

- **方法和工具类**：常用的工具类库，如 `Collections` 和 `Arrays`，都支持泛型。

- 工厂模式

  ：泛型可以帮助在创建对象时确保类型安全，例如： 

  ```java
  public class Factory<T> {
      public T create(Class<T> clazz) throws Exception {
          return clazz.getDeclaredConstructor().newInstance();
      }
  }
  ```

------

### 总结

- **集合**：Java集合框架提供了多种数据结构，用于高效地存储和操作数据，常见的包括 `List`、`Set` 和 `Map`。
- **泛型**：通过泛型，Java能够提供类型安全的集合和方法，提升代码的复用性，避免类型转换错误。

掌握Java集合和泛型是编写高效、可维护代码的基础。

# Java集合、泛型 & 枚举



## 1、Java集合







## 2、Java泛型









## 3、Java枚举

# Java集合详解

## 前言

Java 集合是 Java 开发中非常重要的部分，提供了一种灵活、高效的数据存储方式。无论是开发企业应用还是个人项目，熟练掌握 Java 集合框架都是必要的。本篇文章详细介绍 Java 集合的基本概念、核心接口和常用实现类，并通过示例加深理解。

------

## Java集合概述

Java 集合类存放于 `java.util` 包中，是一个用来存放对象的容器。以下是几个关键点：

1. **集合只能存放对象**。例如，将 `int` 类型数据 `1` 存入集合时，会自动转换为 `Integer` 类型后存入。
2. **集合存放的是对象的引用**，对象本身存放在堆内存中。
3. **集合可以存放不同类型、不限数量的数据类型**。

Java 集合分为三大体系：

- **Set**：无序、不可重复的集合。
- **List**：有序、可重复的集合。
- **Map**：具有键值对映射关系的集合。

从 JDK 5 开始，增加了泛型功能，集合可以指定存储对象的类型。

------

## Collection接口

`Collection` 是集合框架的根接口，定义了集合操作的基本方法，包括添加、删除、判断和遍历元素等。

### 常用方法

```java
import java.util.*;

public class CollectionExample {
    public static void main(String[] args) {
        Collection<String> collection = new ArrayList<>();
        collection.add("A");
        collection.add("B");
        collection.add("C");

        System.out.println("集合中的元素：" + collection);

        // 判断是否包含某个元素
        System.out.println("是否包含 A：" + collection.contains("A"));

        // 删除元素
        collection.remove("B");
        System.out.println("删除后：" + collection);

        // 清空集合
        collection.clear();
        System.out.println("清空后：" + collection.isEmpty());
    }
}
```

------

## Iterator接口

`Iterator` 接口用于遍历 `Collection` 集合中的元素，提供统一的编程接口，隐藏了集合实现的底层细节。

### 使用示例

```java
import java.util.*;

public class IteratorExample {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            String element = iterator.next();
            System.out.println("元素：" + element);
        }
    }
}
```

### foreach 遍历

JDK 5 提供了 `foreach` 循环语法，用于简化集合的遍历：

```java
for (String element : list) {
    System.out.println("元素：" + element);
}
```

------

## Set接口

`Set` 是一个无序、不可重复的集合。

### HashSet

`HashSet` 是 `Set` 接口的典型实现，基于哈希表实现。

#### 特点

1. **无序**：不能保证元素的排列顺序。
2. **不可重复**：存入的元素通过 `equals()` 方法和 `hashCode()` 方法确保唯一性。
3. **线程不安全**：需要手动同步。

#### 示例

```java
import java.util.*;

public class HashSetExample {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>();
        set.add("A");
        set.add("B");
        set.add("C");
        set.add("A"); // 重复元素，不会添加

        System.out.println("集合内容：" + set);
    }
}
```

### TreeSet

`TreeSet` 是 `SortedSet` 的实现类，可以对集合中的元素进行排序。

#### 特点

1. 默认采用**自然排序**。
2. 支持**定制排序**，通过传入 `Comparator` 实现。

#### 示例

```java
import java.util.*;

public class TreeSetExample {
    public static void main(String[] args) {
        TreeSet<Integer> treeSet = new TreeSet<>();
        treeSet.add(3);
        treeSet.add(1);
        treeSet.add(2);

        System.out.println("自然排序：" + treeSet);

        // 定制排序
        TreeSet<Integer> customSet = new TreeSet<>(Comparator.reverseOrder());
        customSet.addAll(treeSet);

        System.out.println("降序排序：" + customSet);
    }
}
```

------

## List接口

`List` 是一个有序、可重复的集合，每个元素都有其索引。

### ArrayList

`ArrayList` 是 `List` 的典型实现，基于动态数组实现。

#### 示例

```java
import java.util.*;

public class ArrayListExample {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("A");
        list.add("B");
        list.add("C");
        list.add("B"); // 允许重复

        System.out.println("集合内容：" + list);

        // 根据索引访问
        System.out.println("第一个元素：" + list.get(0));
    }
}
```

### Vector

`Vector` 是线程安全的动态数组。

#### 示例

```java
import java.util.*;

public class VectorExample {
    public static void main(String[] args) {
        Vector<String> vector = new Vector<>();
        vector.add("A");
        vector.add("B");
        vector.add("C");

        System.out.println("Vector 内容：" + vector);
    }
}
```

------

## Map接口

`Map` 是键值对（Key-Value）形式的集合，`Key` 不允许重复，`Value` 可以重复。

### HashMap

`HashMap` 是最常用的 `Map` 实现。

#### 示例

```java
import java.util.*;

public class HashMapExample {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        map.put("A", "Apple");
        map.put("B", "Banana");
        map.put("C", "Cherry");

        System.out.println("Map 内容：" + map);
    }
}
```

### TreeMap

`TreeMap` 按键排序。

#### 示例

```java
import java.util.*;

public class TreeMapExample {
    public static void main(String[] args) {
        TreeMap<String, String> treeMap = new TreeMap<>();
        treeMap.put("B", "Banana");
        treeMap.put("A", "Apple");
        treeMap.put("C", "Cherry");

        System.out.println("排序后的 TreeMap：" + treeMap);
    }
}

```

------

## Collections工具类

`Collections` 是一个操作集合的工具类，提供了排序、查找等方法。

### 示例

```java
import java.util.*;

public class CollectionsExample {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(Arrays.asList(3, 1, 2));

        // 排序
        Collections.sort(list);
        System.out.println("排序后：" + list);

        // 打乱顺序
        Collections.shuffle(list);
        System.out.println("打乱后：" + list);
    }
}

```

------

## 结语

Java 集合是开发过程中不可或缺的工具。熟练掌握其基本概念、实现类和使用方法，可以大幅提升代码的效率和可维护性。通过不断的练习和深入研究，您将更加得心应手地使用 Java 集合解决实际问题。



# Java集合和泛型

Java集合类存放于 java.util 包中，是一个用来存放对象的容器。
①、集合只能存放对象。比如你存一个 int 型数据 1放入集合中，其实它是自动转换成 Integer 类后存入的，Java中每一种基本类型都有对应的引用类型。
②、集合存放的是多个对象的引用，对象本身还是放在堆内存中。
③、集合可以存放不同类型，不限数量的数据类型。
Java 集合可分为 Set、List 和 Map 三种大体系
   Set：无序、不可重复的集合
   List：有序，可重复的集合
   Map：具有映射关系的集合
在 JDK5 之后，增加了泛型，Java 集合可以记住容器中对象的数据类型

## 1. Set

### HashSet

HashSet 是 Set 接口的典型实现，大多数时候使用 Set 集合时都使用这个实现类。我们大多数时候说的set集合指的都是HashSet
HashSet 按 Hash 算法来存储集合中的元素，因此具有很好的存取和查找性能。
HashSet 具有以下特点：

* 不能保证元素的排列顺序
* 不可重复
* HashSet 不是线程安全的
* 集合元素可以使 null

当向 HashSet 集合中存入一个元素时，HashSet 会调用该对象的 hashCode() 方法来得到该对象的 hashCode 值，然后根据 hashCode 值决定该对象在 HashSet 中的存储位置。
  如果两个元素的 equals() 方法返回 true，但它们的 hashCode() 返回值不相等，hashSet 将会把它们存储在不同的位置，但依然可以添加成功。

![1690420996666](image/Java编程基础/1690420996666.png)

### hashCode() 方法

HashSet 集合判断两个元素相等的标准：两个对象通过 equals() 方法比较相等，并且两个对象的 hashCode() 方法返回值也相等。
如果两个对象通过 equals() 方法返回 true，这两个对象的 hashCode 值也应该相同。



### TreeSet

TreeSet 是 SortedSet 接口的实现类，TreeSet 可以确保集合元素处于排序状态。
TreeSet 支持两种排序方法：自然排序和定制排序。默认情况下，TreeSet 采用自然排序。

![1690421217660](image/Java编程基础/1690421217660.png)

## 2. List

### List与ArrayList



List 代表一个元素有序、且可重复的集合，集合中的每个元素都有其对应的顺序索引
List 允许使用重复元素，可以通过索引来访问指定位置的集合元素。
List 默认按元素的添加顺序设置元素的索引。
List 集合里添加了一些根据索引来操作集合元素的方法

![1690421238689](image/Java编程基础/1690421238689.png)

### ArrayList 和 Vector

ArrayList 和 Vector 是 List 接口的两个典型实现
区别：
Vector是一个古老的集合，通常建议使用 ArrayList
ArrayList 是线程不安全的，而 Vector 是线程安全的。
即使为保证 List 集合线程安全，也不推荐使用 Vector



## 3. Map

Map 用于保存具有映射关系的数据，因此 Map 集合里保存着两组值，一组值用于保存 Map 里的 Key，另外一组用于保存 Map 里的 Value
Map 中的 key 和  value 都可以是任何引用类型的数据
Map 中的 Key 不允许重复，即同一个 Map 对象的任何两个 Key 通过 equals 方法比较中返回 false
Key 和 Value 之间存在单向一对一关系，即通过指定的 Key 总能找到唯一的，确定的 Value。

### Map 接口与HashMap类



![1690421286416](image/Java编程基础/1690421286416.png)

### HashMap & Hashtable

HashMap 和 Hashtable 是 Map 接口的两个典型实现类
区别：
Hashtable 是一个古老的 Map 实现类，不建议使用
Hashtable 是一个线程安全的 Map 实现，但 HashMap 是线程不安全的。
Hashtable 不允许使用 null 作为 key 和 value，而 HashMap 可以
与 HashSet 集合不能保证元素的顺序一样，Hashtable 、HashMap 也不能保证其中 key-value 对的顺序
Hashtable 、HashMap 判断两个 Key 相等的标准是：两个 Key 通过 equals 方法返回 true，hashCode 值也相等。
Hashtable 、相等的标准是：两个 Value 通过 equalHashMap 判断两个 Values 方法返回 true





### TreeMap

TreeMap 存储 Key-Value 对时，需要根据 Key 对 key-value 对进行排序。TreeMap 可以保证所有的 Key-Value 对处于有序状态。
TreeMap 的 Key 的排序：
自然排序：TreeMap 的所有的 Key 必须实现 Comparable 接口，而且所有的 Key 应该是同一个类的对象，否则将会抛出 ClasssCastException
定制排序（了解）：创建 TreeMap 时，传入一个 Comparator 对象，该对象负责对 TreeMap 中的所有 key 进行排序。此时不需要 Map 的 Key 实现 Comparable 接口



## 4. 操作集合的工具类：Collections

Collections 是一个操作 Set、List 和 Map 等集合的工具类
Collections 中提供了大量方法对集合元素进行排序、查询和修改等操作，还提供了对集合对象设置不可变、对集合对象实现同步控制等方法
排序操作：
reverse(List)：反转 List 中元素的顺序
shuffle(List)：对 List 集合元素进行随机排序
sort(List)：根据元素的自然顺序对指定 List 集合元素按升序排序
sort(List，Comparator)：根据指定的 Comparator 产生的顺序对 List 集合元素进行排序
swap(List，int， int)：将指定 list 集合中的 i 处元素和 j 处元素进行交换

### 查找、替换

Object max(Collection)：根据元素的自然顺序，返回给定集合中的最大元素
Object max(Collection，Comparator)：根据 Comparator 指定的顺序，返回给定集合中的最大元素
Object min(Collection)
Object min(Collection，Comparator)
int frequency(Collection，Object)：返回指定集合中指定元素的出现次数
boolean replaceAll(List list，Object oldVal，Object newVal)：使用新值替换 List 对象的所有旧值

### 同步控制



Collections 类中提供了多个 synchronizedXxx() 方法，该方法可使将指定集合包装成线程同步的集合，从而可以解决多线程并发访问集合时的线程安全问题

![1690421355320](image/Java编程基础/1690421355320.png)





