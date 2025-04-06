# Java IO和流

- **`java.io` 包**提供了传统的流（字节流和字符流）方式来进行文件操作，适合处理一些基本的文件输入输出任务。
- **`java.nio.file` 包**引入了更现代的文件操作方式，提供了更高效的文件操作，如复制、删除、移动文件，读取文件等。
- 使用 `BufferedReader` / `BufferedWriter` 来优化文本文件的读取和写入操作。
- `Path` 和 `Files` 类是 Java 7 引入的现代文件操作类，它们提供了更便捷和高效的文件操作方法。

iO流用来处理设备之间的数据传输。

 Java程序中，对于数据的输入/输出操作以”流(stream)” 的方式进行。

 java.io包下提供了各种“流”类和接口，用以获取不同种类的数据，并通过标准的方法输入或输出数据。

 输入input：读取外部数据（磁盘、光盘等存储设备的数据）到程序（内存）中。

 输出output：将程序（内存）数据输出到磁盘、光盘等存储设备中

![1690421577870](image/Java编程基础/1690421577870.png)

java.io.File类的使用
IO原理及流的分类

* 文件流
      FileInputStream  /  FileOutputStream  /  FileReader  /  FileWriter
* 缓冲流
      BufferedInputStream / BufferedOutputStream / 
      BufferedReader / BufferedWriter
* 转换流
      InputStreamReader  /  OutputStreamWriter
* 标准输入/输出流
* 打印流（了解）
      PrintStream  /  PrintWriter
* 数据流（了解）
      DataInputStream  /  DataOutputStream
* 对象流    ----涉及序列化、反序列化
  ObjectInputStream  /  ObjectOutputStream
* 随机存取文件流
  RandomAccessFile

流是用来处理数据的。

处理数据时，一定要先明确数据源，与数据目的地

* 数据源可以是文件，可以是键盘。
* 数据目的地可以是文件、显示器或者其他设备。

而流只是在帮助数据进行传输,并对传输的数据进行处理，比如过滤处理、转换处理等。

字节流-缓冲流（重点）

* 输入流InputStream-FileInputStream-BufferedInputStream
* 输出流OutputStream-FileOutputStream-BufferedOutputStream

字符流-缓冲流（重点）

* 输入流Reader-FileReader-BufferedReader
* 输出流Writer-FileWriter-BufferedWriter

转换流

* InputSteamReader和OutputStreamWriter
* 对象流ObjectInputStream和ObjectOutputStream（难点）
* 序列化
* 反序列化
* 随机存取流RandomAccessFile（掌握读取、写入）



能新建、删除、重命名文件和目录，但不能访问文件内容本身。

访问文件名

*  getName()
*  getPath()
*  getAbsoluteFile()
*  getAbsolutePath()
*  getParent()
*  renameTo(File newName)

文件检测

* exists()
* canWrite()
* canRead()
* isFile()
* isDirectory()

获取常规文件信息

* lastModify()
* length()

文件操作相关

* createNewFile()
* delete()

目录操作相关

 * mkDir()
 * list()
 * listFiles()


## 流的分类

​    按操作数据单位不同分为：字节流(8 bit)，字符流(16 bit)  
​    按数据流的流向不同分为：输入流，输出流
​    按流的角色的不同分为：节点流，处理流

Java的IO流共涉及40多个类，实际上非常规则，都是从如下4个抽象基类派生的。
由这四个类派生出来的子类名称都是以其父类名作为子类名后缀。

![image-20231022135542231](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/image-20231022135542231.png)



​    按操作数据单位不同分为：字节流(8 bit)，字符流(16 bit)  
​    按数据流的流向不同分为：输入流，输出流
​    按流的角色的不同分为：节点流，处理流

| 抽象基类   | 字节流           | 字符流     |
| ---------- | ---------------- | ---------- |
| **输入流** | **InputStream**  | **Reader** |
| **输出流** | **OutputStream** | **Writer** |

Java的IO流共涉及40多个类，实际上非常规则，都是从如下4个抽象基类派生的。
由这四个类派生出来的子类名称都是以其父类名作为子类名后缀。

![1690421614471](image/Java编程基础/1690421614471.png)

文件字节输入流

![1690421627271](image/Java编程基础/1690421627271.png)

文件字节输出流

![1690421638464](image/Java编程基础/1690421638464.png)

文件字符输入流

  读取文件操作步骤:
  1.建立一个流对象，将已存在的一个文件加载进流。
   FileReader fr = new FileReader(“Test.txt”);

  2.创建一个临时存放数据的数组。
   char[] ch = new char[1024];

 3.调用流对象的读取方法将流中的数据读入到数组中。
   fr.read(ch);



文件字符输出流

  1.创建流对象，建立数据存放文件
      FileWriter fw = new FileWriter(“Test.txt”);

  2.调用流对象的写入方法，将数据写入流
      fw.write(“text”);
  2.1 输出流关闭之前需要清空缓存
	fw.flush();
  3.关闭流资源，并将流中的数据清空到文件中。
      fw.close();

注意

 定义文件路径时，注意：可以用“/”或者“\\”。

 在写入一个文件时，如果目录下有同名文件将被覆盖。

 在读取文件时，必须保证该文件已存在，否则出异常。



IO原理及流的分类
文件流

* FileInputStream  /  FileOutputStream  /  FileReader  /  FileWriter

缓冲流

* BufferedInputStream / BufferedOutputStream / 
* BufferedReader / BufferedWriter

转换流

* InputStreamReader  /  OutputStreamWriter

标准输入/输出流

打印流（了解）

* PrintStream  /  PrintWriter

数据流（了解）

* DataInputStream  /  DataOutputStream

对象流    ----涉及序列化、反序列化

* ObjectInputStream  /  ObjectOutputStream

随机存取文件流

* RandomAccessFile





1. 复制文件
2. 删除文件
3. 移动文件
4. 文件重命名
5. 创建文件
6. 文件是否存在

在 Java 中，文件操作是常见的任务之一，通常涉及到读取、写入和管理文件系统中的文件。Java 提供了许多类和方法来处理文件，主要通过 `java.io` 包和 `java.nio` 包来完成文件操作。





![1690421541844](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/1690421541844.png)

![1690421546983](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/1690421546983.png)

![1690421577870](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/1690421577870.png)

![1690421614471](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/1690421614471.png)

![1690421627271](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/1690421627271.png)

![1690421638464](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/1690421638464.png)

![1690420996666](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/1690420996666.png)

![1690421217660](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/1690421217660.png)

![1690421238689](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/1690421238689.png)

![1690421286416](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/1690421286416.png)

![1690421355320](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/1690421355320.png)

![1690421537437](http://8.155.40.179:9000/blog/images/74e5a0b64e8dc2a98eebdbe396264dbc/1690421537437.png)







## 文件流（FileInputStream / FileOutputStream）

`FileInputStream` 和 `FileOutputStream` 用于字节级别的文件输入输出，适用于处理二进制文件或非文本文件（例如图片、音频、视频文件）。

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileStreamExample {
    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("input.txt");
             FileOutputStream fos = new FileOutputStream("output.txt")) {

            int byteData;
            while ((byteData = fis.read()) != -1) {
                fos.write(byteData);  // 将文件内容复制到输出文件
            }

            System.out.println("文件已成功复制");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 字符流（FileReader / FileWriter）

`FileReader` 和 `FileWriter` 用于字符级别的输入输出，适用于文本文件的读取和写入。

```java
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class FileReaderWriterExample {
    public static void main(String[] args) {
        try (FileReader fr = new FileReader("input.txt");
             FileWriter fw = new FileWriter("output.txt")) {

            int charData;
            while ((charData = fr.read()) != -1) {
                fw.write(charData);  // 将字符内容复制到输出文件
            }

            System.out.println("文件已成功复制");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 缓冲流（BufferedReader / BufferedWriter）

`BufferedReader` 和 `BufferedWriter` 提供了缓冲功能，适用于处理大量文本数据，它们可以有效地提高读写性能。

为了提高数据读写的速度，Java API提供了带缓冲功能的流类，在使用这些流类时，会创建一个内部缓冲区数组
根据数据操作单位可以把缓冲流分为：
    BufferedInputStream 和 BufferedOutputStream
    BufferedReader 和 BufferedWriter
缓冲流要“套接”在相应的节点流之上，对读写的数据提供了缓冲的功能，提高了读写的效率，同时增加了一些新的方法
对于输出的缓冲流，写出的数据会先在内存中缓存，使用flush()将会使内存中的数据立刻写出
注意：缓冲流是把数据缓冲到内存中



```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.IOException;

public class BufferedExample {
    public static void main(String[] args) {
        try (BufferedReader br = new BufferedReader(new FileReader("input.txt"));
             BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {

            String line;
            while ((line = br.readLine()) != null) {
                bw.write(line);  // 写入一行文本
                bw.newLine();  // 添加换行符
            }

            System.out.println("文件已成功复制");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```





## 转换流（InputStreamReader / OutputSreamWriter）

  转换流提供了在字节流和字符流之间的转换
  Java API提供了两个转换流：
     InputStreamReader和OutputStreamWriter
  字节流中的数据都是字符时，转成字符流操作更高效。
            InputStreamReader
  用于将字节流中读取到的字节按指定字符集解码成字符。需要和                            InputStream“套接”。
  构造方法
             InputStreamReader(InputStream in)
  public InputSreamReader(InputStream in,String charsetName)
            如： Reader isr = new   InputStreamReader(System.in,”ISO5334_1”);

 OutputStreamWriter

 用于将要写入到字节流中的字符按指定字符集编码成字节。  需要和OutputStream“套接”。
  构造方法
  public OutputStreamWriter(OutputStream out)
  public OutputSreamWriter(OutputStream out,String                                                                                               charsetName)



## 标准输入输出流

  System.in和System.out分别代表了系统标准的输入和输出设备
  默认输入设备是键盘，输出设备是显示器
   System.in的类型是InputStream
   System.out的类型是PrintStream，其是OutputStream的子类FilterOutputStream 的子类
  练习：把控制台输入的内容写到指定的TXT文件中，当接收到字符串over，就结束程序的运行
练习2：在一个TXT文件中，写一组用户名和密码，通过控制台输入用户名和密码，与TXT文件中的用户名密码做对比，如果一样就在打印登录成功，如果不一致，就打印用户名密码错误





## 打印流

  在整个IO包中，打印流是输出信息最方便的类。
  PrintStream(字节打印流)和PrintWriter(字符打印流)提供了一系列重载的print和println方法，用于多种数据类型的输出
     PrintStream和PrintWriter的输出不会抛出异常
     PrintStream和PrintWriter有自动flush功能
     System.out返回的是PrintStream的实例



## 数据流（DataInputStream / DataOutputStream）

 为了方便地操作Java语言的基本数据类型的数据，可以使用数据流。
 数据流有两个类：(用于读取和写出基本数据类型的数据）
     DataInputStream 和 DataOutputStream
     分别“套接”在 InputStream 和 OutputStream 节点流上
 DataInputStream中的方法
           boolean readBoolean()		byte readByte()
           char readChar()			float readFloat()
           double readDouble()		short readShort()
           long readLong()			int readInt()
           String readUTF()                                 void readFully(byte[] b)
           DataOutputStream中的方法
 将上述的方法的read改为相应的write即可。

## 对象流（ObjectInputStream / ObjectOutputStream）

   ObjectInputStream和OjbectOutputSteam
    用于存储和读取对象的处理流。它的强大之处就是可以把Java中的对象写入到数据源中，也能把对象从数据源中还原回来。

​    序列化(Serialize)：用ObjectOutputStream类将一个Java对象写入IO流中
​    反序列化(Deserialize)：用ObjectInputStream类从IO流中恢复该Java对象
​    ObjectOutputStream和ObjectInputStream不能序列化static和transient修饰的成员变量

**对象的序列化**

   ObjectInputStream和OjbectOutputSteam
    用于存储和读取对象的处理流。它的强大之处就是可以把Java中的对象写入到数据源中，也能把对象从数据源中还原回来。

​    序列化(Serialize)：用ObjectOutputStream类将一个Java对象写入IO流中
​    反序列化(Deserialize)：用ObjectInputStream类从IO流中恢复该Java对象
​    ObjectOutputStream和ObjectInputStream不能序列化static和transient修饰的成员变量



  对象序列化机制允许把内存中的Java对象转换成平台无关的二进制流，从而允许把这种二进制流持久地保存在磁盘上，或通过网络将这种二进制流传输到另一个网络节点。当其它程序获取了这种二进制流，就可以恢复成原来的Java对象
  序列化的好处在于可将任何实现了Serializable接口的对象转化为字节数据，使其在保存和传输时可被还原
  序列化是 RMI（Remote Method Invoke – 远程方法调用）过程的参数和返回值都必须实现的机制，而 RMI 是 JavaEE 的基础。因此序列化机制是 JavaEE 平台的基础
 如果需要让某个对象支持序列化机制，则必须让其类是可序列化的，为了让某个类是可序列化的，该类必须实现如下两个接口之一：
     Serializable
     Externalizable

 凡是实现Serializable接口的类都有一个表示序列化版本标识符的静态变量：
     private static final long serialVersionUID;
     serialVersionUID用来表明类的不同版本间的兼容性
     如果类没有显示定义这个静态变量，它的值是Java运行时环境根据类的内部细节自动生成的。若类的源代码作了修改，serialVersionUID 可能发生变化。故建议，显示声明
 显示定义serialVersionUID的用途
     希望类的不同版本对序列化兼容，因此需确保类的不同版本具有相同的serialVersionUID
     不希望类的不同版本对序列化兼容，因此需确保类的不同版本具有不同的serialVersionUID

**使用对象流序列化对象**

 若某个类实现了 Serializable 接口，该类的对象就是可序列化的：

​     创建一个 ObjectOutputStream
​     调用 ObjectOutputStream 对象的 writeObject(对象) 方法输出可序列化对象。注意写出一次，操作flush()
  反序列化
​     创建一个 ObjectInputStream
​     调用 readObject() 方法读取流中的对象
  强调：如果某个类的字段不是基本数据类型或 String  类型，而是另一个引用类型，那么这个引用类型必须是可序列化的，否则拥有该类型的 Field 的类也不能序列化





## `FileInputStream`类和`FileOutputStream`类

1. 从文件读入全部数据

```java
public static String readData(String filename) {
    StringBuffer buffer = new StringBuffer();
    try {
        File file = new File(filename);
        FileInputStream in = new FileInputStream(file);
        for (int i = 0; i < file.length(); i++) {
            char ch = (char) (in.read());
            buffer.append(ch);
        }
        in.close();
    } catch (Exception e) {
        System.out.println("文件打开失败");
    }
    return buffer.toString();
}
```

2. 写数据到文件

```java
public static void writeData(String filename,String data){
    try {
        File file = new File(filename);
        FileOutputStream out = new FileOutputStream(file);
        out.write(data.getBytes());
        out.close();
    }catch (Exception e){
        e.printStackTrace();
    }
}
```

3. 追加数据到文件

```

```

## `FileWriter`类和`FileReader`类


1. 使用FileReader类和BufferedReader类读取文件中的数据

```java
public static String readData(String filename) {
    StringBuffer buffer = new StringBuffer();
    try {
        FileReader reader = new FileReader(new File(filename));
        BufferedReader bufferedReader = new BufferedReader(reader);
        char ch;
        while ((ch = (char) bufferedReader.read()) != (char) -1) {
            buffer.append(ch);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return buffer.toString();
}
```

2. 使用FileWriter类和BufferedWriter类写数据到文件

```java
public static void writeData(String filename, String data) {
    try {
        FileWriter writer = new FileWriter(filename);
        BufferedWriter bufferedWriter = new BufferedWriter(writer);
        bufferedWriter.write(data);
        bufferedWriter.close();
        writer.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

3. 追加数据到文件

```

```

## 序列化与反序列化

使用FileOutputStream类和ObjectOutputStream类对对象进行序列化后保存在指定文件中

```java
public static void writeObject(String filename, Object[] objs) {
    FileOutputStream in = null;
    ObjectOutputStream oIn = null;
    try {
        in = new FileOutputStream(filename);
        oIn = new ObjectOutputStream(in);
        for (int i = 0; i < objs.length; i++) {
            oIn.writeObject(objs[i]);
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        try {
            oIn.close();
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

使用FileIntputStream类和ObjectInputStream类反序列化对象

```java
public static Object[] readObject(String filename) {
    ArrayList<Object> data = new ArrayList<Object>();
    FileInputStream in = null;
    ObjectInputStream oIn = null;
    try {
        in = new FileInputStream(filename);
        oIn = new ObjectInputStream(in);
        Object obj;
        while ((obj = oIn.readObject()) != null) {
            data.add(obj);
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        try {
            oIn.close();
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    return data.toArray();
}
```





# Java 文件



## RandomAccessFile 类

 RandomAccessFile 类支持 “随机访问” 的方式，程序可以直接跳到文件的任意 地方来读、写文件
     支持只访问文件的部分内容
     可以向已存在的文件后追加内容
 RandomAccessFile 对象包含一个记录指针，用以标示当前读写处的位置。       RandomAccessFile 类对象可以自由移动记录指针：
     long getFilePointer()：获取文件记录指针的当前位置
     void seek(long pos)：将文件记录指针定位到 pos 位置



RandomAccessFile 类支持 “随机访问” 的方式，程序可以直接跳到文件的任意 地方来读、写文件

* 支持只访问文件的部分内容
* 可以向已存在的文件后追加内容

RandomAccessFile 对象包含一个记录指针，用以标示当前读写处的位置。
RandomAccessFile 类对象可以自由移动记录指针：

* long getFilePointer()：获取文件记录指针的当前位置
* void seek(long pos)：将文件记录指针定位到 pos 位置

构造器

* public RandomAccessFile(File file, String mode) 
* public RandomAccessFile(String  name, String  mode)

创建 RandomAccessFile 类实例需要指定一个 mode 参数，该参数指定 RandomAccessFile 的访问模式：

* r: 以只读方式打开
* rw：打开以便读取和写入
* rwd:打开以便读取和写入；同步文件内容的更新
* rws:打开以便读取和写入；同步文件内容和元数据的更新

读取文件内容

```java
RandomAccessFile raf = new RandomAccessFile(“test.txt”, “rw”）;	
raf.seek(5);
byte [] b = new byte[1024];
int off = 0;
int len = 5;
raf.read(b, off, len);	
String str = new String(b, 0, len);
System.out.println(str);	
raf.close();
```

写入文件内容

```java
RandomAccessFile raf = new RandomAccessFile("test.txt", "rw");
raf.seek(5);	
//先读出来
String temp = raf.readLine();	
raf.seek(5);
raf.write("xykj".getBytes());
raf.write(temp.getBytes());	
raf.close();
```







## File 类

`File` 类用于表示文件和目录，并提供了用于创建、删除、检查文件属性等方法。`File` 类不直接提供读取或写入文件的功能，它只是用来描述文件路径和基本的文件操作。

常用方法：

- `exists()`：检查文件或目录是否存在。
- `createNewFile()`：创建新文件（如果文件已存在，返回 `false`）。
- `delete()`：删除文件或目录。
- `isDirectory()`：检查是否为目录。
- `isFile()`：检查是否为文件。
- `length()`：获取文件的大小（字节数）。
- `listFiles()`：列出目录中的文件。

```java
import java.io.File;
import java.io.IOException;

public class FileExample {
    public static void main(String[] args) {
        File file = new File("example.txt");

        // 检查文件是否存在
        if (file.exists()) {
            System.out.println("文件存在");
        } else {
            System.out.println("文件不存在");

            // 创建新文件
            try {
                if (file.createNewFile()) {
                    System.out.println("文件已创建");
                } else {
                    System.out.println("文件创建失败");
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```



```
/*
* File类
* 能新建、删除、重命名文件和目录，但不能访问文件内容本身。
* 
* 访问文件名
* -- getName()
* -- getPath()
* -- getAbsoluteFile()
* -- getAbsolutePath()
* -- getParent()
* -- renameTo(File newName)
* 
* 文件检测
* -- exists()
* -- canWrite()
* -- canRead()
* -- isFile()
* -- isDirectory()
* 
* 获取常规文件信息
* -- lastModify()
* -- length()
* 
* 文件操作相关
* -- createNewFile()
* -- delete()
* 
* 目录操作相关
* -- mkDir()
* -- list()
* -- listFiles()
*/
```



java.io.File类：文件和目录路径名的抽象表示形式，与平台无关

File 能新建、删除、重命名文件和目录，但 File 不能访问文件内容本身。如果需要访问文件内容本身，则需要使用输入/输出流。

File对象可以作为参数传递给流的构造函数

File类的常见构造方法：

* public File(String pathname)
      以pathname为路径创建File对象，可以是绝对路径或者相对路径，如果pathname是相对路径，则默认的当前路径在系统属性user.dir中存储。
* public File(String parent,String child)
      以parent为父路径，child为子路径创建File对象。File的静态属性String separator存储了当前系统的路径分隔符。
  在UNIX中，此字段为‘/’，在Windows中，为‘\\’

File 类代表与平台无关的文件和目录。

File  能新建、删除、重命名文件和目录，但 File 不能访问文件内容本身。如果需要访问文件内容本身，则需要使用输入/输出流。

![1690421537437](image/Java编程基础/1690421537437.png)

![1690421541844](image/Java编程基础/1690421541844.png)

![1690421546983](image/Java编程基础/1690421546983.png)



新建目录和新建文件

```java
package learning.io;

import java.io.File;

public class FileTest {
	public static void main(String[] args) {
		String dirName = "resource/test";
		File dir = new File(dirName);
		// 如果test目录不存在，则创建test目录
		if (!dir.exists()) {
			dir.mkdir();
			System.out.println("test目录已经创建好了");
		} else {
			// 目录已经创建好了，接下来就是创建test目录下的test.txt文件
			String fileName = "resource/test/test.txt";
			File file = new File(fileName);
			// 如果文件不存在，则新建文件
			if (!file.exists()) {
				try {
					file.createNewFile();
					System.out.println("test.txt文件已经创建好了");
				} catch (Exception e) {
					System.out.println("创建文件时失败");
				}
			} else {
				System.out.println("目录已经创建好了");
				System.out.println("文件已经创建好了");
			}
		}
	}
}
```

枚举子目录


```java
package learning.io;

import java.io.File;
import java.util.Arrays;

public class FileTest {
	public static void main(String[] args) {
		String dirName = "resource";
		File dir = new File(dirName);
		System.out.println(Arrays.toString(dir.listFiles()));	// 会返回文件的路径
		System.out.println(Arrays.toString(dir.list()));	// 只返回文件名
	}
}

```



## Files 类

`Files` 类提供了更多的文件操作方法，例如读取文件内容、写入文件内容、复制文件、删除文件等。

```java
import java.nio.file.*;

public class NioFilesExample {
    public static void main(String[] args) {
        Path sourcePath = Paths.get("input.txt");
        Path destinationPath = Paths.get("output.txt");

        try {
            // 复制文件
            Files.copy(sourcePath, destinationPath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("文件已成功复制");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

2.3 **读取文件内容**

可以使用 `Files.readAllLines()` 读取文件的所有行，并返回一个字符串列表。这个方法非常方便，适用于小型文本文件。

```java
import java.nio.file.*;
import java.io.IOException;
import java.util.List;

public class NioReadFileExample {
    public static void main(String[] args) {
        Path path = Paths.get("input.txt");

        try {
            List<String> lines = Files.readAllLines(path);
            for (String line : lines) {
                System.out.println(line);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```





## Path 类

Java 7 引入了 `java.nio.file` 包，该包提供了更现代、更高效的文件操作方法。`java.nio` 提供了新的文件 I/O 类，如 `Files` 和 `Path`，它们支持更方便的文件操作。

`Path` 类代表文件的路径，可以使用 `Paths.get()` 方法来获取 `Path` 对象。`Path` 提供了丰富的方法，可以用来操作文件路径、文件创建、删除等操作。

```java
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.io.IOException;

public class NioPathExample {
    public static void main(String[] args) {
        Path path = Paths.get("example.txt");

        try {
            // 创建文件
            if (Files.notExists(path)) {
                Files.createFile(path);
                System.out.println("文件已创建");
            }

            // 获取文件大小
            long fileSize = Files.size(path);
            System.out.println("文件大小: " + fileSize + " 字节");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```





## 文件权限

Java 提供了对文件权限的支持，可以通过 `java.nio.file.attribute` 包中的类来获取和修改文件的权限。

示例：获取文件权限

```java
import java.nio.file.*;
import java.nio.file.attribute.*;
import java.io.IOException;

public class FilePermissions {
    public static void main(String[] args) {
        Path path = Paths.get("example.txt");

        try {
            // 获取文件的基本属性
            PosixFileAttributes attributes = Files.readAttributes(path, PosixFileAttributes.class);
            System.out.println("Owner: " + attributes.owner());
            System.out.println("Permissions: " + attributes.permissions());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```





## 递归遍历文件

```java
/**
	 * 递归遍历文件
	 * @param file
	 */
private static void traverse(File file) {
    String[] filePaths = null;
    if (file.isFile()) {
        System.out.println(file.getAbsolutePath());
    } else {
        File[] fs = file.listFiles();
        if(fs!=null && fs.length>0) {
            for(File ff:fs) {
                if(ff.isFile()) {
                    System.out.println(ff.getAbsolutePath());
                }else {
                    traverse(ff);
                }
            }
        }
    }
}
```

















# Java目录

- **`java.io.File` 类**：适用于进行简单的目录操作，如创建目录、列出目录中的文件、删除空目录等。它是基于路径的文件操作，比较基础，但对于现代 Java 应用，`java.nio.file` 包更为推荐。
- **`java.nio.file` 包**：提供了更为强大和高效的文件和目录操作方法，推荐用于进行更复杂的文件 I/O 操作，如遍历目录、删除非空目录等。

通过 `java.nio.file` 包，Java 程序员可以更加方便和高效地进行目录和文件的管理。在处理大量文件或需要高级功能时，`Files` 和 `Path` 是更好的选择。

1. 复制目录
2. 删除目录
3. 移动目录
4. 目录重命名
5. 遍历目录
6. 目录是否存在
7. 创建目录

在 Java 中，**目录操作**通常是通过 `java.io.File` 类或 `java.nio.file` 包来实现的。无论是创建目录、删除目录，还是列出目录中的文件，Java 都提供了相应的 API 来处理这些操作。



`File` 类提供了很多方法来进行目录操作，包括创建、删除、列出目录中的文件等。它提供了基础的目录操作功能，但通常来说，`java.nio.file` 包的操作更为现代和高效。

##  **创建目录**

- **`mkdir()`**：创建一个单一目录。如果父目录不存在，则创建失败。
- **`mkdirs()`**：创建单一目录以及所有必要的父目录。如果父目录不存在，会一并创建。

```java
import java.io.File;
import java.io.IOException;

public class DirectoryExample {
    public static void main(String[] args) {
        // 创建一个单一目录
        File dir = new File("myDir");
        if (dir.mkdir()) {
            System.out.println("目录已创建");
        } else {
            System.out.println("目录创建失败");
        }

        // 创建目录及其父目录
        File dirs = new File("parentDir/subDir");
        if (dirs.mkdirs()) {
            System.out.println("父目录及子目录已创建");
        } else {
            System.out.println("目录创建失败");
        }
    }
}
```







Java 7 引入了 `java.nio.file` 包，提供了更加现代和高效的目录操作方法，通常推荐使用 `Path` 和 `Files` 类来处理文件和目录操作。

使用 `Files.createDirectory()` 或 `Files.createDirectories()` 创建目录：

- **`createDirectory()`**：创建一个单一目录。
- **`createDirectories()`**：创建目录及所有父目录。

```java
import java.nio.file.*;

public class NioDirectoryExample {
    public static void main(String[] args) {
        Path dir = Paths.get("myDir");

        // 创建单一目录
        try {
            Files.createDirectory(dir);
            System.out.println("目录已创建");
        } catch (IOException e) {
            e.printStackTrace();
        }

        Path dirs = Paths.get("parentDir/subDir");

        // 创建目录及父目录
        try {
            Files.createDirectories(dirs);
            System.out.println("父目录及子目录已创建");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```





## 删除目录

- **`delete()`**：删除空目录。如果目录中有文件或子目录，该方法将无法删除目录。
- **`deleteOnExit()`**：在 JVM 退出时删除目录或文件。

```java
import java.io.File;

public class DeleteDirectoryExample {
    public static void main(String[] args) {
        // 删除空目录
        File dir = new File("myDir");
        if (dir.exists() && dir.isDirectory()) {
            if (dir.delete()) {
                System.out.println("目录已删除");
            } else {
                System.out.println("目录删除失败");
            }
        }

        // 在 JVM 退出时删除文件或目录
        File tempFile = new File("tempDir");
        tempFile.deleteOnExit();
    }
}
```





使用 `Files.delete()` 或 `Files.walkFileTree()` 删除目录：

- **`delete()`**：删除空目录。
- **`walkFileTree()`**：通过自定义 `FileVisitor` 删除目录及其中的所有文件和子目录。

```java
import java.nio.file.*;
import java.io.IOException;

public class NioDeleteDirectory {
    public static void main(String[] args) {
        Path dir = Paths.get("myDir");

        // 删除空目录
        try {
            Files.delete(dir);
            System.out.println("目录已删除");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

对于非空目录，您需要遍历目录中的所有文件和子目录并删除它们，可以使用 `Files.walkFileTree()` 方法来实现。

```java
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.io.IOException;

public class DeleteNonEmptyDirectory {
    public static void main(String[] args) {
        Path dir = Paths.get("parentDir");

        try {
            Files.walkFileTree(dir, new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    Files.delete(file);
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
                    Files.delete(dir);
                    return FileVisitResult.CONTINUE;
                }
            });

            System.out.println("目录及其中的文件已删除");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```



## 列出目录中的文件

- **`list()`**：返回目录中的文件和子目录的名称数组。
- **`listFiles()`**：返回目录中的文件和子目录的 `File` 对象数组。

```java
import java.io.File;

public class ListDirectoryExample {
    public static void main(String[] args) {
        File dir = new File("someDirectory");
        
        // 列出目录中的文件名
        String[] files = dir.list();
        if (files != null) {
            for (String file : files) {
                System.out.println(file);
            }
        }

        // 列出目录中的所有文件（返回 File 对象）
        File[] fileList = dir.listFiles();
        if (fileList != null) {
            for (File file : fileList) {
                System.out.println(file.getName());
            }
        }
    }
}
```





使用 `Files.list()` 或 `Files.walk()` 来列出目录中的文件：

- **`list()`**：返回目录中直接的文件。
- **`walk()`**：返回目录及其子目录中的所有文件。

```java
import java.nio.file.*;
import java.io.IOException;

public class NioListDirectory {
    public static void main(String[] args) {
        Path dir = Paths.get("someDirectory");

        try {
            // 列出目录中的文件
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
                for (Path entry : stream) {
                    System.out.println(entry.getFileName());
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 使用 Files.walk 列出目录及其子目录中的所有文件
        try {
            Files.walk(dir).forEach(System.out::println);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```





# Java磁盘

- **磁盘空间信息**：可以通过 `OSHI` 库获取磁盘的总空间、可用空间等详细信息。
- **内存信息**：使用 `OperatingSystemMXBean` 接口来获取物理内存的信息，使用 `Runtime` 类来获取 Java 堆内存信息。
- **操作系统特有的磁盘信息**：在 Windows 和 Linux 上，可以通过系统命令获取磁盘空间使用情况。

对于磁盘和内存的系统信息，`OSHI` 库提供了更便捷和跨平台的解决方案，而 `Runtime` 和 `OperatingSystemMXBean` 类则是 Java 原生的获取 JVM 内存信息的方法。

了解了，你的意思是要获取**磁盘空间**和**内存**相关的信息，而不涉及目录和文件的操作。下面是一些获取磁盘和内存信息的方法，主要使用 `java.nio.file` 包、`OperatingSystemMXBean` 接口以及其他系统工具。

## 获取磁盘空间信息

在 Java 中，可以通过 `java.nio.file` 包中的 `FileSystems` 和 `FileSystem` 类获取磁盘空间的相关信息。通过 `FileSystems.getDefault()` 获取系统的默认文件系统，接着可以用 `FileSystems` 提供的方法来查询磁盘的空间信息。

1.1 **获取文件系统的可用空间、总空间和剩余空间**

Java 标准库本身没有直接提供方法来获取磁盘空间，但可以通过第三方库（如 `OSHI`）或者操作系统特有的 API 来实现。以下示例演示如何使用 `OSHI` 库来获取磁盘空间信息。

**使用 `OSHI` 库获取磁盘信息**

[OSHI (Operating System and Hardware Information)](https://github.com/oshi/oshi) 是一个开源的 Java 库，可以用来查询操作系统、硬件和其他系统资源信息。首先需要在项目中加入 `OSHI` 依赖。

**添加依赖：**

```xml
<dependency>
    <groupId>com.github.oshi</groupId>
    <artifactId>oshi-core</artifactId>
    <version>5.8.2</version> <!-- 使用合适的版本 -->
</dependency>
```

**获取磁盘信息的代码示例：**

```java
import oshi.SystemInfo;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.HDD;
import oshi.util.Util;

public class DiskInfoExample {
    public static void main(String[] args) {
        // 创建 SystemInfo 对象
        SystemInfo systemInfo = new SystemInfo();
        HardwareAbstractionLayer hal = systemInfo.getHardware();
        
        // 获取硬盘信息
        HDD[] hdds = hal.getDiskStores();
        
        for (HDD hdd : hdds) {
            System.out.println("硬盘设备名称: " + hdd.getModel());
            System.out.println("硬盘容量: " + hdd.getSize() / (1024 * 1024 * 1024) + " GB");
            System.out.println("已用空间: " + (hdd.getSize() - hdd.getAvailable()) / (1024 * 1024 * 1024) + " GB");
            System.out.println("可用空间: " + hdd.getAvailable() / (1024 * 1024 * 1024) + " GB");
        }
    }
}
```

## 获取内存信息

Java 提供了 `OperatingSystemMXBean` 接口，可以通过它来获取系统内存和 CPU 的相关信息。`OperatingSystemMXBean` 是 Java 提供的系统级别信息接口，通过 `ManagementFactory` 获取。

2.1 **获取系统内存信息**

通过 `OperatingSystemMXBean` 可以获得系统的总内存和空闲内存。Java 8 及以上版本中提供了 `OperatingSystemMXBean`，但该接口对于不同的操作系统有所差异。

```java
import com.sun.management.OperatingSystemMXBean;
import java.lang.management.ManagementFactory;

public class MemoryInfoExample {
    public static void main(String[] args) {
        // 获取操作系统信息
        OperatingSystemMXBean osBean = (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();
        
        // 获取总物理内存（以字节为单位）
        long totalMemory = osBean.getTotalPhysicalMemorySize();
        // 获取可用物理内存（以字节为单位）
        long freeMemory = osBean.getFreePhysicalMemorySize();
        
        // 转换为 GB 并打印
        System.out.println("总物理内存: " + totalMemory / (1024 * 1024 * 1024) + " GB");
        System.out.println("可用物理内存: " + freeMemory / (1024 * 1024 * 1024) + " GB");
    }
}
```

2.2 **获取 Java 堆内存信息**

Java 还提供了 `Runtime` 类来获取 Java 堆内存的信息。`Runtime.getRuntime()` 可以获取 Java 虚拟机的内存使用情况。

```java
public class JavaMemoryInfoExample {
    public static void main(String[] args) {
        // 获取运行时实例
        Runtime runtime = Runtime.getRuntime();

        // 获取最大内存（单位：字节）
        long maxMemory = runtime.maxMemory();
        // 获取已分配内存（单位：字节）
        long allocatedMemory = runtime.totalMemory();
        // 获取空闲内存（单位：字节）
        long freeMemory = runtime.freeMemory();

        // 转换为 GB 并打印
        System.out.println("JVM 最大内存: " + maxMemory / (1024 * 1024 * 1024) + " GB");
        System.out.println("JVM 已分配内存: " + allocatedMemory / (1024 * 1024 * 1024) + " GB");
        System.out.println("JVM 空闲内存: " + freeMemory / (1024 * 1024 * 1024) + " GB");
    }
}
```

## 获取系统的磁盘使用情况

（Linux、Windows、Mac）

不同操作系统有不同的 API 可供查询磁盘空间。例如，在 Linux 系统上，你可以使用 `df` 命令，在 Windows 上可以使用 `wmic logicaldisk` 命令。

3.1 **Windows 磁盘信息**

在 Windows 系统上，你可以通过命令行获取磁盘的空间信息。使用 Java 的 `ProcessBuilder` 来执行系统命令获取磁盘空间信息。

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class DiskSpaceCommand {
    public static void main(String[] args) {
        try {
            // 执行 "wmic logicaldisk get size,freespace,caption" 命令
            ProcessBuilder pb = new ProcessBuilder("wmic", "logicaldisk", "get", "size,freespace,caption");
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

3.2 **Linux 磁盘信息**

在 Linux 系统上，`df` 命令可以显示磁盘空间信息。

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class DiskSpaceLinux {
    public static void main(String[] args) {
        try {
            // 执行 "df -h" 命令
            ProcessBuilder pb = new ProcessBuilder("df", "-h");
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



