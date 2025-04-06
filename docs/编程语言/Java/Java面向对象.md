# Java面向对象

Java 面向对象（Object-Oriented Programming, OOP）是编程的一个重要范式，它通过将数据和操作数据的代码封装在一起，帮助程序员创建模块化、可维护、可扩展的软件。Java 是一种典型的面向对象的编程语言，几乎所有的 Java 程序都由类和对象组成。

在 Java 中，面向对象的核心概念包括 **类**、**对象**、**封装**、**继承**、**多态** 和 **抽象**。

### 1. **类和对象**

- **类**（Class）是对象的蓝图或模板，它定义了对象的属性（成员变量）和行为（成员方法）。
- **对象**（Object）是类的实例，它包含了类中定义的属性和行为。

#### 示例：类和对象的定义

```java
class Car {
    String color;  // 属性
    String model;

    // 方法
    void start() {
        System.out.println("The car is starting.");
    }

    void stop() {
        System.out.println("The car is stopping.");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car1 = new Car();  // 创建对象
        car1.color = "Red";
        car1.model = "Tesla";

        System.out.println("Car color: " + car1.color);
        System.out.println("Car model: " + car1.model);

        car1.start();  // 调用方法
        car1.stop();
    }
}
```

在这个例子中，`Car` 是一个类，`car1` 是它的一个对象。

### 2. **封装（Encapsulation）**

封装是指将数据（属性）和操作数据的代码（方法）封装在一起，并通过访问修饰符控制对数据的访问。通过封装，可以隐藏类的实现细节，只暴露必要的接口，从而减少系统的复杂性和增强安全性。

#### 示例：封装的应用

```java
class Account {
    private double balance;  // 私有属性

    // 公共方法来访问和修改私有属性
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
        } else {
            System.out.println("Insufficient balance.");
        }
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        Account account = new Account();
        account.deposit(1000);  // 存款
        account.withdraw(500);  // 取款
        System.out.println("Balance: " + account.getBalance());  // 获取余额
    }
}
```

在这个例子中，`balance` 属性是私有的，外部类无法直接访问。通过 `deposit`、`withdraw` 和 `getBalance` 方法，外部类可以安全地操作该属性。

### 3. **继承（Inheritance）**

继承是面向对象编程中的一个基本特性，它允许一个类从另一个类继承属性和方法。继承帮助我们重用代码，并建立类之间的“是一个”关系。

- **父类（SuperClass）**：被继承的类。
- **子类（SubClass）**：继承父类的类，可以扩展父类的功能或修改父类的方法。

#### 示例：继承的应用

```java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {  // Dog 是 Animal 的子类
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Animal();
        animal.sound();  // 输出：Animal makes a sound

        Dog dog = new Dog();
        dog.sound();  // 输出：Dog barks
    }
}
```

在这个例子中，`Dog` 类继承了 `Animal` 类，并重写了 `sound` 方法。

### 4. **多态（Polymorphism）**

多态是指同一个方法或操作，可以作用于不同的对象并表现出不同的行为。Java 中的多态通过方法重载和方法重写实现。

- **方法重载**：同一个类中可以有多个方法，它们具有相同的名称，但参数不同。
- **方法重写**：子类可以重写父类的方法。

#### 示例：方法重载

```java
class Calculator {
    // 加法方法（方法重载）
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(5, 10));  // 调用 int 参数的方法
        System.out.println(calc.add(5.5, 10.5));  // 调用 double 参数的方法
    }
}
```

#### 示例：方法重写

```java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Animal();
        Animal cat = new Cat();  // 向上转型

        animal.sound();  // 输出：Animal makes a sound
        cat.sound();  // 输出：Cat meows
    }
}
```

在这个例子中，`Cat` 重写了 `Animal` 类的 `sound` 方法。通过父类引用指向子类对象，调用的是子类的 `sound` 方法。

### 5. **抽象（Abstraction）**

抽象是指只关心对象的**行为**，而不关心具体的**实现**。Java 中通过抽象类和接口实现抽象。

- **抽象类**：是不能实例化的类，可以包含抽象方法（没有实现的方法），也可以包含普通方法（有实现的方法）。
- **接口**：只包含常量和抽象方法，不能包含方法的实现，类通过实现接口来提供实现。

#### 示例：抽象类

```java
abstract class Animal {
    abstract void sound();  // 抽象方法

    void sleep() {
        System.out.println("Animal is sleeping");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.sound();  // 输出：Dog barks
        dog.sleep();  // 输出：Animal is sleeping
    }
}
```

#### 示例：接口

```java
interface Animal {
    void sound();  // 接口方法
}

class Dog implements Animal {
    @Override
    public void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal dog = new Dog();
        dog.sound();  // 输出：Dog barks
    }
}
```

在这个例子中，`Animal` 是一个接口，`Dog` 类实现了该接口。

### 总结

Java 面向对象编程（OOP）的四大特性：

1. **封装**：隐藏对象的内部实现，只提供公开的接口。
2. **继承**：通过继承机制重用已有类的代码，并创建新的子类。
3. **多态**：一个方法可以表现为不同的行为，使得程序更加灵活。
4. **抽象**：通过抽象类和接口，定义统一的接口和行为，而不关注具体的实现。

理解和掌握这些面向对象的基本概念，能帮助你编写更加模块化、可扩展和可维护的 Java 程序。

# Java常用类

* String
* Datetime
* StringBuilder
* StringBuffer
* Math
* System
* Object
* Runtime
* BigInteger
* 

