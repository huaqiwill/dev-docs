# Java网络编程

Java 网络编程允许程序通过网络进行通信和数据交换。Java 提供了丰富的类和库来进行网络编程，主要使用 `java.net` 包。通过该包，Java 程序可以实现客户端和服务器的通信，支持常见的网络协议，如 TCP/IP 和 UDP。

### 1. **Java 网络编程的基础概念**

- **客户端（Client）**：发送请求并接收响应的程序。
- **服务器（Server）**：接收客户端请求并返回响应的程序。
- **Socket**：网络通信的端点，客户端和服务器之间通过 Socket 进行数据交换。

### 2. **常用的网络协议**

- **TCP（传输控制协议）**：面向连接的协议，保证数据的可靠传输，常用于 HTTP、FTP、SMTP 等。
- **UDP（用户数据报协议）**：无连接的协议，不保证数据的可靠性，常用于实时视频、语音通信等。

### 3. **Java 网络编程基本流程**

Java 网络编程的基本流程分为客户端和服务器端的实现。

#### 3.1 **TCP 网络编程**

TCP 是面向连接的协议，需要建立连接后才可以进行数据传输。

##### **服务器端：`ServerSocket`**

服务器端使用 `ServerSocket` 类来监听客户端的连接请求。`ServerSocket` 会在指定的端口上监听客户端的连接请求，一旦有客户端连接，`ServerSocket` 会返回一个 `Socket` 对象，表示与该客户端的连接。

```java
import java.io.*;
import java.net.*;

public class TCPServer {
    public static void main(String[] args) {
        try {
            // 创建 ServerSocket 对象，绑定到端口 12345
            ServerSocket serverSocket = new ServerSocket(12345);
            System.out.println("Server started, waiting for client connection...");

            // 等待客户端连接
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client connected!");

            // 获取输入流，读取客户端发送的消息
            BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            String clientMessage = in.readLine();
            System.out.println("Received from client: " + clientMessage);

            // 获取输出流，发送消息给客户端
            PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
            out.println("Hello, client!");

            // 关闭连接
            in.close();
            out.close();
            clientSocket.close();
            serverSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### **客户端：`Socket`**

客户端使用 `Socket` 类来连接到服务器，通过输入输出流进行数据交换。

```java
import java.io.*;
import java.net.*;

public class TCPClient {
    public static void main(String[] args) {
        try {
            // 创建 Socket 对象，连接到服务器的 IP 和端口 12345
            Socket socket = new Socket("localhost", 12345);

            // 获取输出流，向服务器发送消息
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            out.println("Hello, server!");

            // 获取输入流，读取服务器返回的消息
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            String serverMessage = in.readLine();
            System.out.println("Received from server: " + serverMessage);

            // 关闭连接
            in.close();
            out.close();
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### **TCP 编程的关键点：**

- **`ServerSocket`**：用于创建服务器端 Socket，监听端口，等待客户端的连接。
- **`Socket`**：用于在客户端和服务器之间建立连接，并通过输入输出流进行数据交换。
- **输入输出流**：`InputStream` 和 `OutputStream` 用于读取和写入数据。

#### 3.2 **UDP 网络编程**

UDP 是无连接的协议，适用于要求实时性较高但对数据丢失容忍度较大的场景，如视频、语音通信。

##### **服务器端：`DatagramSocket`**

UDP 服务器端使用 `DatagramSocket` 来接收客户端的数据报文（`DatagramPacket`）。

```java
import java.net.*;

public class UDPServer {
    public static void main(String[] args) {
        try {
            // 创建 DatagramSocket 对象，绑定到端口 12345
            DatagramSocket socket = new DatagramSocket(12345);
            byte[] buffer = new byte[1024];
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);

            // 接收客户端的数据
            System.out.println("Server started, waiting for packet...");
            socket.receive(packet);
            String clientMessage = new String(packet.getData(), 0, packet.getLength());
            System.out.println("Received from client: " + clientMessage);

            // 发送响应
            String response = "Hello, client!";
            byte[] responseData = response.getBytes();
            DatagramPacket responsePacket = new DatagramPacket(responseData, responseData.length, packet.getAddress(), packet.getPort());
            socket.send(responsePacket);
            
            socket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

##### **客户端：`DatagramSocket`**

UDP 客户端使用 `DatagramSocket` 发送数据报文。

```java
import java.net.*;

public class UDPClient {
    public static void main(String[] args) {
        try {
            // 创建 DatagramSocket 对象，发送数据
            DatagramSocket socket = new DatagramSocket();

            String message = "Hello, server!";
            byte[] messageData = message.getBytes();

            // 发送数据包到服务器（IP 地址和端口）
            InetAddress serverAddress = InetAddress.getByName("localhost");
            DatagramPacket packet = new DatagramPacket(messageData, messageData.length, serverAddress, 12345);
            socket.send(packet);

            // 接收服务器的响应
            byte[] buffer = new byte[1024];
            DatagramPacket responsePacket = new DatagramPacket(buffer, buffer.length);
            socket.receive(responsePacket);
            String serverMessage = new String(responsePacket.getData(), 0, responsePacket.getLength());
            System.out.println("Received from server: " + serverMessage);

            socket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

##### **UDP 编程的关键点：**

- **`DatagramSocket`**：用于创建 UDP 套接字进行数据的发送和接收。
- **`DatagramPacket`**：用于封装要发送的数据和接收的数据。

### 4. **网络编程中的常用类**

- **`InetAddress`**：表示 IP 地址或主机地址。

  ```java
  InetAddress address = InetAddress.getByName("www.google.com");
  System.out.println("Host: " + address.getHostName());
  System.out.println("IP: " + address.getHostAddress());
  ```

- **`Socket`**：表示客户端的网络连接，提供与服务器的数据通信。

- **`ServerSocket`**：表示服务器端的网络连接，监听客户端的连接请求。

- **`DatagramSocket`**：用于发送和接收 UDP 数据报。

- **`DatagramPacket`**：表示一个 UDP 数据包。

### 5. **URL 和 HTTP 请求**

Java 还提供了 `URLConnection` 和 `HttpURLConnection` 类，用于实现基于 HTTP 协议的网络通信。例如，可以用 `HttpURLConnection` 发送 HTTP 请求并处理响应。

```java
import java.net.*;
import java.io.*;

public class URLExample {
    public static void main(String[] args) {
        try {
            URL url = new URL("http://www.example.com");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            // 读取响应
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println(inputLine);
            }
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### 6. **总结**

- **TCP 编程**：使用 `ServerSocket`（服务器）和 `Socket`（客户端）进行可靠的、面向连接的通信。
- **UDP 编程**：使用 `DatagramSocket` 和 `DatagramPacket` 进行无连接、快速的通信。
- **HTTP 编程**：可以使用 `HttpURLConnection` 来发送 HTTP 请求并处理响应。
- **网络类**：`InetAddress`、`Socket`、`ServerSocket`、`DatagramSocket`、`URL` 等类是 Java 网络编程中的基础工具。

Java 的网络编程为开发分布式应用程序、进行客户端-服务器通信、实现 Web 服务等提供了强大的支持。



# Java网络编程

序列化和反序列化

# JavaHttp

# JavaNetApi

# JavaSocket

UDP

WebSocket

# Java网络编程

参考：https://blog.csdn.net/qq_32648593/article/details/106729520



**当你在百度浏览器输入www.google.cn并按回车的时候发生了什么？**
选取这个题作为讲解的原因一个是经典，一个是它把上面的知识串起来了。
1.按回车的时候，键盘把物理信号转化成电信号，触发之后的流程。
2.百度浏览器通过DNS查找www.google.cn的ip地址是203.208.43.119
3.DNS查询时会利用缓存信息，优先级是浏览器>操作系统> 路由器>本地域名服务器>根域名服务器
4.百度浏览器使用HTTP/HTTPS协议将请求打包，通过socket传给传输层
5.传输层将包做进一步的封装，交给操作系统的网络层
6.网络层使用ip协议，ip头包含你的ip（客户端）和203.208.43.119这个ip（目标ip）
7.如果203.208.43.119这个ip不是本机ip，操作系统会找网关（ip是192.168.1.1）解析这个ip的Mac地址
8.操作系统是如何找网关的呢，找网关过程使用ARP协议，广播给局域网内所有主机，会返回网关的MAC地址
9.找到网关后，操作系统就将IP包交给MAC层，MAC层经过层层网关最终获得目标ip对应的MAC地址
10.这时候，你的主机就可以通过这个MAC地址就能找到目标服务器。
11.目标服务器收到这个请求后，会解析包里的内容，解析包里的MAC地址给到网络层，IP地址给传输层。
12.此时就会进行著名的三次握手了，此时你的主机和服务器端的TCP连接就建立起来了。



