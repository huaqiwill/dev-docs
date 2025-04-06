# Java虚拟机 JVM



JVM 性能调优

![JVM](http://8.155.40.179:9000/blog/images/79a81592fbb36ac514e0c70df67f3d60/JVM.png)



## Java内存分析



## 加载、链接与初始化

类的加载（Load）

类的链接（Link）

类的初始化（Initialize）



运行时常量池、虚拟机启动、创建和加载、链接、初始化、绑定本地方法实现、Java虚拟机退出。



### 类加载器

引导类加载器

扩展类加载器

系统类加载器





### 退出

Java 虚拟机的退出条件一般是：某些线程调用 Runtime 类或 System 类的 exit 方法，或是 Runtime 类的 halt 方法，并且 Java 安全管理器也允许这些 exit 或 halt 操作。

除此之外，在 JNI（Java Native Interface）规范中还描述了当使用 JNI API 来加载和卸载（Load & Unload）Java 虚拟机时，Java 虚拟机的退出过程。



## 字节码执行引擎

​	



# Java虚拟机结构



## Class文件结构





# Java虚拟机指令集

一条 Java 虚拟机指令由一个特定操作的操作码和零至多个操作所使用到的操作数所构成。在
本章中将会描述每条 Java 虚拟机指令的格式和所代表的操作含义。





# 虚拟机性能监控与故障处理工具

* jps：虚拟机进程状况工具
* jstat：虚拟机统计信息监视工具
* jinfo：Java配置信息工具
* jmap：Java内存映射工具
* jhat：虚拟机堆转储快照分析工具
* jstack：Java堆栈跟踪工具
* hsdis：JIT生成代码反汇编
* jconsole：Java监视与管理控制台
* visualvm：多合一故障处理工具



# JVM学习笔记（Java面试笔记）

《深入理解Java虚拟机模型》

* JVM虚拟机系列教程：https://www.cnblogs.com/chanshuyi/p/the_jvm_roadmap.html





知识点

> - JVM 内存结构
> - JVM 生命周期
> - 主流虚拟机
> - Java 代码执行流程
> - 类加载
>   - 类加载器
>   - 类加载过程
>   - 双亲委派机制
> - 垃圾回收
>   - 垃圾回收器
>   - 垃圾回收策略
>   - 垃圾回收算法
>   - StopTheWorld
> - 字节码
> - 内存分配和回收
> - JVM 性能调优
>   - 性能分析方法
>   - 常用工具
>   - 参数设置
> - Java 探针
> - 线上故障分析

参考：





 Java 虚拟机是学习 Java 的基础，也是迈入高级 Java 开发工程师的必备知识点。所以今天这篇文章我们来聊聊如何从零开始学习 Java 虚拟机。 



## 内存模型







## 字节码文件结构

https://www.cnblogs.com/chanshuyi/p/jvm_serial_05_jvm_bytecode_analysis.html



Java堆、方法区、常量区





### 栈内存解析





### 局部变量表、操作数栈





### 方法出口



### 本地方法



### 堆内存





## 垃圾回收机制

参考：https://www.cnblogs.com/chanshuyi/p/jvm_serial_08_jvm_garbage_collection.html

*  GC Root Tracing 算法

 ![img](http://8.155.40.179:9000/blog/images/79a81592fbb36ac514e0c70df67f3d60/595137-20190103105654744-845768824.png) 

垃圾回收的几种类型

：https://www.cnblogs.com/chanshuyi/p/jvm_serial_10_gc_type.html

* Minor GC
* Major GC
* Full GC
* Stop-The-World







##  Java虚拟机规范 

系列教程：陈树义

参考：https://www.cnblogs.com/chanshuyi/p/jvm_specification_01_preface.html





## 类加载





# 内存分配与回收策略





# 垃圾收集器

* serial收集器
* parnew收集器
* parallel scavenge收集器
* serial old收集器
* parallel old收集器
* cms收集器
* g1收集器

## G1GC算法







