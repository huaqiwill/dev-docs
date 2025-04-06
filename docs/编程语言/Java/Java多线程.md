# Java多线程

Java 多线程是指在一个程序中同时运行多个执行流（线程）的机制。Java 提供了丰富的工具和类库来支持多线程编程，使得开发者可以在多核处理器上并发执行任务，从而提高应用程序的性能和响应性。多线程编程在现代应用中非常常见，尤其是在高性能计算、网络编程和用户界面编程等领域。

### 1. **线程的概念**

线程（Thread）是程序执行的最小单位。每个线程都属于一个进程，且一个进程中可以有多个线程，它们共享进程的资源。线程可以并发执行，提升程序的处理能力。

- **主线程**：Java 程序的入口是 `main` 方法，`main` 方法中的执行流由主线程控制。
- **子线程**：在主线程之外创建的线程，被称为子线程。通过创建新线程来执行并发任务。

### 2. **创建线程的方式**

#### 1. **继承 `Thread` 类**

通过继承 `Thread` 类并重写 `run()` 方法来创建一个线程。

```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread is running");
    }

    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start();  // 启动线程，调用 run() 方法
    }
}
```

- `start()` 方法启动线程，`run()` 方法定义线程的执行逻辑。
- `start()` 会创建一个新的执行流，而 `run()` 中的代码会在线程中执行。

#### 2. **实现 `Runnable` 接口**

通过实现 `Runnable` 接口，并将其传递给 `Thread` 类来创建线程。

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable thread is running");
    }

    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();  // 启动线程
    }
}
```

- `Runnable` 接口是线程任务的定义，可以将任务代码独立于线程类之外，便于多线程共享同一份任务。

#### **推荐方式**：

如果任务是可以被多个线程共享的，或者线程类已经继承了其他类，通常建议使用实现 `Runnable` 接口的方式。

### 3. **线程的生命周期**

线程的生命周期包括以下几个状态：

- **新建（New）**：线程创建后，但还未启动时，处于新建状态。
- **可运行（Runnable）**：线程准备执行，处于可运行状态，但可能被操作系统调度暂停或恢复。
- **运行中（Running）**：线程正在执行。
- **阻塞（Blocked）**：线程因等待资源（如锁）被阻塞，无法继续执行。
- **等待（Waiting）**：线程主动等待其他线程的某个动作，通常使用 `wait()` 方法。
- **终止（Terminated）**：线程执行完毕或被终止后，进入终止状态。

### 4. **线程同步**

当多个线程访问共享资源时，可能会出现数据竞争问题，导致结果不正确。为了保证线程安全，可以使用线程同步。

#### 1. **使用 `synchronized` 关键字**

`synchronized` 可以用于方法或代码块，确保同一时刻只有一个线程能执行该方法或代码块。

```java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter counter = new Counter();
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        t1.start();
        t2.start();
    }
}
```

- `synchronized` 确保同一时刻只有一个线程可以执行该方法或代码块，其他线程必须等待。
- 可以用来同步方法，也可以同步特定的代码块。

#### 2. **使用 `Lock` 接口**

Java 还提供了更灵活的同步机制，比如 `ReentrantLock`。

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

class Counter {
    private int count = 0;
    private Lock lock = new ReentrantLock();

    public void increment() {
        lock.lock();  // 加锁
        try {
            count++;
        } finally {
            lock.unlock();  // 解锁
        }
    }

    public int getCount() {
        return count;
    }
}
```

- `Lock` 提供了比 `synchronized` 更强大的功能，比如可以尝试加锁、定时锁等。

### 5. **线程池**

线程池是为了避免频繁创建和销毁线程的开销，集中管理一组线程，重用线程。Java 提供了 `ExecutorService` 接口及其实现类 `ThreadPoolExecutor` 来管理线程池。

#### 1. **使用 `Executors` 创建线程池**

```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        executor.submit(() -> {
            System.out.println("Task 1");
        });
        executor.submit(() -> {
            System.out.println("Task 2");
        });

        executor.shutdown();  // 关闭线程池
    }
}
```

- `Executors` 提供了多种方式创建线程池，如 `newFixedThreadPool()`、`newCachedThreadPool()`、`newSingleThreadExecutor()` 等。

### 6. **线程的通信**

线程之间的通信通常使用 `wait()`、`notify()` 和 `notifyAll()` 方法。通过这些方法，线程可以等待某个条件的发生或者通知其他线程继续执行。

```java
class MyThread {
    private static final Object lock = new Object();

    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(() -> {
            synchronized (lock) {
                System.out.println("Thread 1: Waiting");
                try {
                    lock.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("Thread 1: Woke up");
            }
        });

        Thread t2 = new Thread(() -> {
            synchronized (lock) {
                System.out.println("Thread 2: Waking up Thread 1");
                lock.notify();
            }
        });

        t1.start();
        t2.start();
    }
}
```

- `wait()`：使当前线程进入等待状态，直到其他线程调用 `notify()` 或 `notifyAll()` 唤醒它。
- `notify()`：唤醒等待该对象锁的一个线程。
- `notifyAll()`：唤醒所有等待该对象锁的线程。

### 7. **线程优先级**

每个线程都有一个优先级，决定了该线程的执行顺序。Java 提供了 `Thread` 类的 `setPriority(int priority)` 方法来设置线程优先级。线程优先级范围从 1 到 10，默认值是 5。

```java
Thread thread = new Thread();
thread.setPriority(Thread.MAX_PRIORITY);  // 设置最大优先级
```

### 总结

Java 多线程编程使得程序可以同时执行多个任务，提升效率。通过线程的创建、同步、通信等机制，可以实现并发任务的协调和管理。线程池是现代 Java 中推荐使用的处理线程的方式。理解并发编程中的线程管理和同步机制对于编写高效、安全的多线程程序至关重要。