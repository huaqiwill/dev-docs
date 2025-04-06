# RxJava



## **RxJava 是什么？**

**RxJava（Reactive Extensions for Java）** 是一个基于 **响应式编程（Reactive Programming）** 的 Java 库，主要用于 **异步编程、事件驱动编程** 和 **流式数据处理**。

RxJava 提供了 **可观察对象（Observable）** 和 **观察者（Observer）** 的模式，让开发者可以更方便地处理 **异步任务、多线程操作、事件流**，避免 **回调地狱（Callback Hell）**。

RxJava 由 **Netflix** 开发，后来贡献给 **ReactiveX** 组织，并成为响应式编程的标准之一，广泛应用于 **Android 开发、后端服务、微服务架构** 等领域。

------

## **RxJava 的核心概念**

RxJava 采用 **响应式编程模型**，主要涉及以下几个核心组件：

### **1. Observable（被观察者）**

- **数据源**，可以是 **单个值、多个值、事件流** 或者 **异步任务**。
- **类似于 Java 的 Stream，但支持异步操作**。
- **当数据变化时，会通知观察者（Observer）**。

#### **示例**

```java
Observable<String> observable = Observable.create(emitter -> {
    emitter.onNext("Hello");
    emitter.onNext("RxJava");
    emitter.onComplete();
});
```

------

### **2. Observer（观察者）**

- 订阅 `Observable`，并 **响应数据变化**。
- 需要实现以下 4 个方法： 
  - `onNext(T t)`: 处理收到的数据
  - `onError(Throwable e)`: 处理错误
  - `onComplete()`: 任务完成时调用
  - `onSubscribe()`: 订阅时调用

#### **示例**

```java
Observer<String> observer = new Observer<String>() {
    @Override
    public void onSubscribe(Disposable d) {
        System.out.println("Subscribed");
    }

    @Override
    public void onNext(String value) {
        System.out.println("Received: " + value);
    }

    @Override
    public void onError(Throwable e) {
        System.out.println("Error: " + e.getMessage());
    }

    @Override
    public void onComplete() {
        System.out.println("Completed");
    }
};
```

------

### **3. Subscription（订阅）**

- `Observer` 需要 **订阅（subscribe）** `Observable` 才能开始接收数据。
- 订阅后，`Observable` 会依次 **调用 `onNext()` 方法** 发送数据，最终 **调用 `onComplete()` 或 `onError()` 结束**。

#### **示例**

```java
observable.subscribe(observer);
```

**输出：**

```
Subscribed
Received: Hello
Received: RxJava
Completed
```

------

### **4. 操作符（Operators）**

RxJava 提供了 **丰富的操作符**，可以 **转换数据、过滤数据、合并流**，类似于 Java 的 `Stream` API。

| **操作符**   | **作用**                | **示例**                                                   |
| ------------ | ----------------------- | ---------------------------------------------------------- |
| `map()`      | **转换数据**            | `observable.map(String::toUpperCase)`                      |
| `flatMap()`  | **将数据展开为多个流**  | `observable.flatMap(item -> Observable.just(item + "!!"))` |
| `filter()`   | **过滤数据**            | `observable.filter(item -> item.length() > 3)`             |
| `debounce()` | **防止频繁触发**        | `observable.debounce(500, TimeUnit.MILLISECONDS)`          |
| `merge()`    | **合并多个 Observable** | `Observable.merge(obs1, obs2)`                             |

#### **示例**

```java
Observable.just("Hello", "RxJava")
    .map(String::toUpperCase)
    .subscribe(System.out::println);
```

**输出：**

```
HELLO
RXJAVA
```

------

### **5. Scheduler（线程调度）**

RxJava 允许开发者 **指定代码运行的线程**，适用于 **Android、后端并发处理**。

| **Scheduler**                    | **作用**                                   |
| -------------------------------- | ------------------------------------------ |
| `Schedulers.io()`                | **I/O 线程池（适用于网络请求、文件读写）** |
| `Schedulers.computation()`       | **计算密集型任务（CPU 密集型操作）**       |
| `Schedulers.newThread()`         | **每次创建新线程（适用于短任务）**         |
| `Schedulers.single()`            | **单线程执行**                             |
| `AndroidSchedulers.mainThread()` | **Android 主线程（UI 更新）**              |

#### **示例：IO 线程处理 + 主线程回调**

```java
Observable.just("Hello")
    .subscribeOn(Schedulers.io())         // 在 IO 线程执行任务
    .observeOn(AndroidSchedulers.mainThread())  // 回到主线程更新 UI
    .subscribe(System.out::println);
```

------

## **RxJava vs 传统回调**

| **特点**       | **传统回调**              | **RxJava**                    |
| -------------- | ------------------------- | ----------------------------- |
| **代码结构**   | 嵌套回调（Callback Hell） | **链式调用，代码清晰**        |
| **线程切换**   | 手动切换线程（AsyncTask） | **使用 `Scheduler` 自动切换** |
| **组合数据流** | 复杂，需要多个回调        | **轻松合并多个数据流**        |
| **错误处理**   | 需要 `try-catch`          | **`onError()` 统一处理**      |

------

## **RxJava 适用场景**

✅ **Android 开发**

- 网络请求（结合 Retrofit）
- 数据流处理（如搜索框防抖）
- 事件总线（EventBus 替代方案）

✅ **后端服务**

- 异步 HTTP 请求（结合 WebFlux）
- 并发数据处理
- 流式数据处理（如 Kafka 消息流）

✅ **微服务架构**

- 适用于 **Spring WebFlux、Reactor**，提供高吞吐量的非阻塞 API。

------

## **RxJava 结合 Retrofit（Android）**

RxJava **与 Retrofit（网络请求库）** 结合，可实现 **异步网络请求**，避免 `Callback`。

### **1. 添加依赖**

```groovy
implementation 'io.reactivex.rxjava3:rxjava:3.0.0'
implementation 'io.reactivex.rxjava3:rxandroid:3.0.0'
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:adapter-rxjava3:2.9.0'
```

### **2. 定义 Retrofit API**

```java
interface ApiService {
    @GET("users/{id}")
    Observable<User> getUser(@Path("id") int id);
}
```

### **3. 执行请求**

```java
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://api.example.com/")
    .addConverterFactory(GsonConverterFactory.create())
    .addCallAdapterFactory(RxJava3CallAdapterFactory.create()) // 适配 RxJava
    .build();

ApiService apiService = retrofit.create(ApiService.class);

apiService.getUser(1)
    .subscribeOn(Schedulers.io())   // 网络请求在 IO 线程执行
    .observeOn(AndroidSchedulers.mainThread()) // UI 更新在主线程执行
    .subscribe(user -> Log.d("User", user.getName()));
```

------

## **RxJava vs Kotlin Flow**

| **特点**           | **RxJava**       | **Kotlin Flow**     |
| ------------------ | ---------------- | ------------------- |
| **响应式编程**     | **支持**         | **支持**            |
| **线程调度**       | **Schedulers**   | **Dispatchers**     |
| **数据流处理**     | **Observable**   | **Flow**            |
| **背压处理**       | **支持**         | **原生支持**        |
| **Android 现代化** | **旧项目仍常用** | **新项目推荐 Flow** |

------

## **总结**

- **RxJava 是 Java 领域最流行的响应式编程库**，适用于 **异步数据流、事件驱动、并发处理**。
- **避免回调地狱（Callback Hell）**，提供 **强大的操作符** 和 **线程调度功能**。
- **在 Android、后端服务、微服务架构中广泛应用**。
- **新项目如果使用 Kotlin，可以考虑用 Flow 代替 RxJava**。

🚀 **一句话总结：RxJava 让异步编程更优雅、更高效！**





