# Java日志框架

* Log4j



## Log4j

- **简介**：Log4j是Apache软件基金会下的一个经典日志框架，提供了简单且功能强大的日志记录功能。尽管有Log4j2作为继任者，但旧版Log4j在某些项目中仍然有所使用。
- **流行程度**：虽然Log4j的流行程度在一定程度上被其继任者Log4j2所取代，但在一些老旧项目或特定场景中，它仍然具有一定的市场份额。

### log4j.properties

```properties
log4j.rootLogger=debug, stdout
# Console output...
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p [%t] - %m%n
```

log4j.properties

```properties
log4j.rootLogger=DEBUG,console,dailyFile,im
log4j.additivity.org.apache=true
# 控制台(console)
log4j.appender.console=org.apache.log4j.ConsoleAppender
log4j.appender.console.Threshold=DEBUG
log4j.appender.console.ImmediateFlush=true
log4j.appender.console.Target=System.err
log4j.appender.console.layout=org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
# 日志文件(logFile)
log4j.appender.logFile=org.apache.log4j.FileAppender
log4j.appender.logFile.Threshold=DEBUG
log4j.appender.logFile.ImmediateFlush=true
log4j.appender.logFile.Append=true
log4j.appender.logFile.File=D:/logs/log.log4j
log4j.appender.logFile.layout=org.apache.log4j.PatternLayout
log4j.appender.logFile.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
# 回滚文件(rollingFile)
log4j.appender.rollingFile=org.apache.log4j.RollingFileAppender
log4j.appender.rollingFile.Threshold=DEBUG
log4j.appender.rollingFile.ImmediateFlush=true
log4j.appender.rollingFile.Append=true
log4j.appender.rollingFile.File=D:/logs/log.log4j
log4j.appender.rollingFile.MaxFileSize=200KB
log4j.appender.rollingFile.MaxBackupIndex=50
log4j.appender.rollingFile.layout=org.apache.log4j.PatternLayout
log4j.appender.rollingFile.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
# 定期回滚日志文件(dailyFile)
log4j.appender.dailyFile=org.apache.log4j.DailyRollingFileAppender
log4j.appender.dailyFile.Threshold=DEBUG
log4j.appender.dailyFile.ImmediateFlush=true
log4j.appender.dailyFile.Append=true
log4j.appender.dailyFile.File=D:/logs/log.log4j
log4j.appender.dailyFile.DatePattern='.'yyyy-MM-dd
log4j.appender.dailyFile.layout=org.apache.log4j.PatternLayout
log4j.appender.dailyFile.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
# 应用于socket
log4j.appender.socket=org.apache.log4j.RollingFileAppender
log4j.appender.socket.RemoteHost=localhost
log4j.appender.socket.Port=5001
log4j.appender.socket.LocationInfo=true
# Set up for Log Factor 5
log4j.appender.socket.layout=org.apache.log4j.PatternLayout
log4j.appender.socket.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
# Log Factor 5 Appender
log4j.appender.LF5_APPENDER=org.apache.log4j.lf5.LF5Appender
log4j.appender.LF5_APPENDER.MaxNumberOfRecords=2000
# 发送日志到指定邮件
log4j.appender.mail=org.apache.log4j.net.SMTPAppender
log4j.appender.mail.Threshold=FATAL
log4j.appender.mail.BufferSize=10
log4j.appender.mail.From = xxx@mail.com
log4j.appender.mail.SMTPHost=mail.com
log4j.appender.mail.Subject=Log4J Message
log4j.appender.mail.To= xxx@mail.com
log4j.appender.mail.layout=org.apache.log4j.PatternLayout
log4j.appender.mail.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
# 应用于数据库
log4j.appender.database=org.apache.log4j.jdbc.JDBCAppender
log4j.appender.database.URL=jdbc:mysql://localhost:3306/test
log4j.appender.database.driver=com.mysql.jdbc.Driver
log4j.appender.database.user=root
log4j.appender.database.password=
log4j.appender.database.sql=INSERT INTO LOG4J (Message) VALUES('=[%-5p] %d(%r) --> [%t] %l: %m %x %n')
log4j.appender.database.layout=org.apache.log4j.PatternLayout
log4j.appender.database.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n

# 自定义Appender
log4j.appender.im = net.cybercorlin.util.logger.appender.IMAppender
log4j.appender.im.host = mail.cybercorlin.net
log4j.appender.im.username = username
log4j.appender.im.password = password
log4j.appender.im.recipient = corlin@cybercorlin.net
log4j.appender.im.layout=org.apache.log4j.PatternLayout
log4j.appender.im.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
```



## SLF4J

- **简介**：SLF4J是一个用于Java的简单日志门面（或抽象层），它本身并不记录日志，而是将日志请求委托给底层的日志框架（如Log4j、Logback等）。
- **流行程度**：SLF4J因其统一的日志API和良好的兼容性而广受欢迎。开发者可以在不改变底层日志框架的情况下，轻松切换日志实现，提高了代码的灵活性和可维护性。

## JUL

- **简介**：JUL是Java平台自带的日志记录框架，也是许多Java标准库使用的默认日志系统。它提供了一个简单的API，并与Java平台紧密集成。
- **流行程度**：尽管JUL在功能和扩展性方面相对有限，但作为Java标准库的一部分，它仍然具有一定的使用量和市场份额。然而，由于其限制，许多开发者选择使用其他更灵活的日志框架。



## Log4j2

- **简介**：Log4j2是Apache Log4j的升级版本，一个功能强大的日志记录框架。它支持多种输出格式，包括控制台、文件和数据库等，并通过配置文件灵活控制日志级别和输出方式。
- **流行程度**：Log4j2在市场上具有极高的流行度，尤其是在大型应用程序中，因其高性能、丰富的功能和良好的扩展性而广受欢迎。





## Logback



- **简介**：Logback是Log4j的继任者，由Log4j的同一开发者创建。与Log4j相比，Logback提供了更高的性能和更丰富的功能，如异步日志记录、日志分割和滚动等。
- **流行程度**：Logback因其高性能和易用性而受到开发者的喜爱，特别是在需要高性能日志处理的场景中，其流行程度很高。