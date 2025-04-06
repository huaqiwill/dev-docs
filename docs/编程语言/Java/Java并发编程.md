# Java并发编程

进程&线程&协程&纤程

![学习路线](http://8.155.40.179:9000/blog/images/df5cd2ceda260d88e5d1857dec2b3829/学习路线.png)

## 知识点

> - 线程和进程
> - 线程状态
> - 并行和并发
> - 同步和异步
> - Synchronized
> - Volatile 关键字
> - Lock 锁
> - 死锁
> - 可重入锁
> - 线程安全
> - 线程池
> - JUC 的使用
> - AQS
> - Fork Join
> - CAS

> Java并发编程中，有多个广泛使用的库，这些库在市场上的流行程度可以根据其广泛的应用范围、社区支持、文档完善程度以及与其他Java生态的集成度来评估。以下是一些主要的Java并发编程库，按照市场流行程度排序：
>
> 1. java.util.concurrent包
>    - 这是Java并发编程的基础库，提供了线程池、并发集合、阻塞队列、锁以及其他并发工具。由于其内置于Java标准库中，因此具有极高的流行度和使用率。
>    - 该包中的`ExecutorService`、`CountDownLatch`、`CyclicBarrier`、`Semaphore`等工具类在并发编程中广泛使用。
>    - **示例**：`ExecutorService executor = Executors.newFixedThreadPool(10);` 创建一个固定大小的线程池。
> 2. java.util.concurrent.atomic包
>    - 该包提供了原子变量类，这些类可以在多线程环境中安全地进行原子操作，无需额外的同步措施。
>    - 由于原子变量在并发编程中的重要性，`java.util.concurrent.atomic`包中的类也受到了广泛的关注和使用。
>    - **示例**：`AtomicInteger atomicInt = new AtomicInteger(0);` 创建一个原子整数。
> 3. java.util.concurrent.locks包
>    - 该包提供了比内置`synchronized`关键字更灵活和强大的锁定功能，如`ReentrantLock`、`ReentrantReadWriteLock`等。
>    - 这些锁机制在需要更精细控制并发访问的场景中非常有用，因此也受到了较高的关注和使用。
>    - **示例**：`ReentrantLock lock = new ReentrantLock();` 创建一个可重入锁。
> 4. CompletableFuture
>    - Java 8中引入的`CompletableFuture`类为异步编程提供了强大的支持，使得开发者可以更加容易地编写异步、非阻塞的代码。
>    - 随着异步编程在Java中的普及，`CompletableFuture`的使用率也在逐渐上升。
>    - **示例**：`CompletableFuture future = CompletableFuture.supplyAsync(() -> "Hello, World!");` 异步执行一个任务并获取结果。
> 5. Fork/Join框架
>    - Java 7中引入的Fork/Join框架用于将大任务拆分成多个小任务，并在多个线程上并行执行。
>    - 虽然其应用场景相对较为特定（如递归分解和合并的任务），但在适合的场景下，Fork/Join框架可以显著提高程序的性能。
>    - **示例**：使用`ForkJoinPool`和`RecursiveTask`或`RecursiveAction`来编写Fork/Join任务。
>
> 需要注意的是，以上排名并不是绝对的，不同项目、不同场景下对并发编程库的需求和选择也会有所不同。此外，Java生态中还有许多其他的并发编程库和工具，如Akka、RxJava等，它们在某些特定场景下也可能具有更高的流行度和使用率。



# 并发编程知识点



> **并发编程的知识点**
>
> 并发编程主要关注编写能够正确和高效处理多个并发任务的程序。以下是一些并发编程的关键知识点：
>
> 1. 并发与并行
>
> ：
>
>    - 并发：多个任务看起来像是同时运行，但实际上是通过不断切换任务来实现的。
>    - 并行：真正的同时运行多个任务，需要多核或多处理器的支持。
>
> 2. 并发编程三要素
>
> ：
>
>    - 原子性：一个或多个操作要么全部执行成功，要么全部执行失败，不可被中断。
>    - 有序性：程序执行的顺序按照代码的先后顺序执行，但处理器可能会对指令进行重排序。
>    - 可见性：当多个线程访问同一个变量时，一个线程对其作了修改，其他线程能立即获取到最新的值。
>
> 3. 线程状态
>
> ：
>
>    - 创建状态：当用`new`操作符创建一个线程时。
>    - 就绪状态：调用`start()`方法后，等待CPU的调度。
>    - 运行状态：CPU开始调度线程，并执行`run()`方法。
>    - 阻塞状态：线程的执行过程中由于某些原因（如调用`sleep()`方法、尝试获取锁等）进入阻塞状态。
>    - 死亡状态：`run()`方法执行完毕或执行过程中遇到异常。
>
> 4. 锁机制
>
> ：
>
>    - 悲观锁：每次操作都会加锁，可能会造成线程阻塞。
>    - 乐观锁：每次操作不加锁，而是假设没有冲突去完成操作，如果因为冲突失败则重试。
>
> 5. 线程协作
>
> ：
>
>    - `wait()`、`notify()`、`notifyAll()`：这一组是`Object`类的方法，用于线程间的协作。
>
> **并发编程与多线程的区别**
>
> 1. 定义
>
> ：
>
>    - 并发编程是一种编程范式，关注的是编写能够正确和高效处理多个并发任务的程序。它包括了多线程，但也包括了其他并发技术和模式，如进程、协程、分布式编程等。
>    - 多线程是计算机编程技术的一种，它允许在单个程序中创建和管理多个线程，每个线程都可以独立执行不同的任务或代码段。
>
> 2. 范围
>
> ：
>
>    - 并发编程是一个更广泛的概念，涵盖了多线程以及其他的并发技术和模式。
>    - 多线程是并发编程的一种具体实现方式，专注于处理同一程序内的多个线程。
>
> 3. 目标
>
> ：
>
>    - 并发编程的目标是实现任务的并发执行，以提高系统的性能和资源利用率。
>    - 多线程则是为了在同一程序中同时执行多个任务，提高程序的执行效率和响应性。
>
> 综上所述，多线程是并发编程的一种实现方式，而并发编程则是一个更广泛的概念，包括了多线程以及其他并发技术和模式。



# JUC

# Java多进程



# 多线程 MultiThread

Java实现多线程网络下载工具



Java.Thread

### 线程实现

Thread

Runnable

Callable

### 线程状态

创建状态

就绪状态

阻塞状态

运行状态

死亡状态



join加塞

yield礼让

sleep休眠



JDK

Thread.State

线程的优先级

getPriority

setPriority



用户线程

守护线程（daemon）



### 线程同步

并发

队列和锁





Lock锁

ReentrantLock



synchronized

### 线程死锁











### 线程通信

线程协作



生产者消费者模式

信号灯法





### 线程池

背景

思路

好处：提高响应速度、降低资源消耗

ExecutorService和Executors



JUC

## Java多线程安全





## Java 线程池







# Java中锁的分类



## Java中锁可以分为以下几类：

互斥锁（Mutex Lock）：也称为独占锁（Exclusive Lock），只允许一个线程访问共享资源，其他线程必须等待当前线程释放锁才能访问。synchronized关键字就是一种互斥锁。

读写锁（Read-Write Lock）：也称为共享-独占锁（Shared-Exclusive Lock），允许多个线程同时读取共享资源，但只允许一个线程写入共享资源，其他线程必须等待写入线程释放锁才能访问。ReentrantReadWriteLock就是一种读写锁。

自旋锁（Spin Lock）：当线程在尝试获取锁时，如果发现锁已经被其他线程占用，就不会等待，而是一直尝试获取锁，直到获取到锁才会退出。Spin Lock的优点是减少线程切换的开销，缺点是占用CPU资源较多，适用于锁占用时间较短的情况。

可重入锁（Reentrant Lock）：也称为递归锁，允许一个线程多次获取同一个锁，也允许多个线程同时获取锁。Reentrant Lock提供了比synchronized更加灵活的锁控制，支持公平锁和非公平锁。

条件变量（Condition）：在使用锁控制并发访问时，经常需要等待某个条件满足才能继续执行，这时就需要使用条件变量。条件变量提供了等待/通知机制，允许线程在某个条件满足之前等待，同时允许其他线程在条件满足时通知等待的线程继续执行。Condition是Reentrant Lock的重要组成部分。



## 最后

https://blog.csdn.net/java_wxid/article/details/131755062?spm=1001.2100.3001.7377&utm_medium=distribute.pc_feed_blog.none-task-blog-hot-4-131755062-null-null.nonecase&depth_1-utm_source=distribute.pc_feed_blog.none-task-blog-hot-4-131755062-null-null.nonecase

# 异步IO & NIO

Java IO高并发

Java异步集合

