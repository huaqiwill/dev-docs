# Java日期时间

Java中的日期和时间操作通常通过以下几个类来处理：

### 1. **`java.util.Date` 类**

`java.util.Date` 是 Java 中最早用于表示时间和日期的类，但它的设计存在一些缺陷，并且不推荐直接使用。它包含了日期和时间（到毫秒级）的信息。

#### 1.1 **创建和操作 `Date` 对象**

```java
import java.util.Date;

public class DateExample {
    public static void main(String[] args) {
        // 获取当前日期和时间
        Date now = new Date();
        System.out.println("当前日期和时间：" + now);

        // 通过时间戳创建 Date 对象（从1970年1月1日到当前时间的毫秒数）
        long timestamp = System.currentTimeMillis();
        Date specificDate = new Date(timestamp);
        System.out.println("通过时间戳创建的日期：" + specificDate);
    }
}
```

#### 1.2 **`Date` 的问题**

- 不支持直接的日期运算（加、减日、月、年等）。
- 直接格式化日期会用 `SimpleDateFormat`，但是格式化、解析操作相对麻烦。
- 年份从 1900 年开始，月从 0 开始，这些都使得 `Date` 类的使用变得复杂。

### 2. **`java.time` 包（Java 8及以后的版本）**

Java 8 引入了全新的日期时间 API，这个新的 API 位于 `java.time` 包中，解决了 `java.util.Date` 类的一些问题。Java 8 的日期时间类是不可变的，更易于操作和格式化。

#### 2.1 **`LocalDate`、`LocalTime`、`LocalDateTime`**

- `LocalDate`：表示没有时区的日期（年、月、日）。
- `LocalTime`：表示没有时区的时间（时、分、秒）。
- `LocalDateTime`：表示没有时区的日期和时间（年、月、日、时、分、秒、毫秒）。

##### 示例代码：

```java
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

public class LocalDateTimeExample {
    public static void main(String[] args) {
        // 获取当前日期
        LocalDate date = LocalDate.now();
        System.out.println("当前日期：" + date);

        // 获取当前时间
        LocalTime time = LocalTime.now();
        System.out.println("当前时间：" + time);

        // 获取当前日期和时间
        LocalDateTime dateTime = LocalDateTime.now();
        System.out.println("当前日期和时间：" + dateTime);
    }
}
```

#### 2.2 **`Instant`**

`Instant` 类表示时间戳，通常用于计算持续时间或操作 UTC 时间。它表示自 1970 年 1 月 1 日以来的秒数。

```java
import java.time.Instant;

public class InstantExample {
    public static void main(String[] args) {
        // 获取当前时间戳
        Instant now = Instant.now();
        System.out.println("当前时间戳：" + now);

        // 获取某个特定时间戳
        Instant specificTime = Instant.ofEpochSecond(1609459200);
        System.out.println("特定时间戳：" + specificTime);
    }
}
```

#### 2.3 **`ZonedDateTime`**

`ZonedDateTime` 用于处理时区信息，表示一个日期和时间，具有时区信息。它可以精确到纳秒。

```java
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ZonedDateTimeExample {
    public static void main(String[] args) {
        // 获取当前时间和时区信息
        ZonedDateTime zonedDateTime = ZonedDateTime.now();
        System.out.println("当前时区时间：" + zonedDateTime);

        // 获取某时区的时间（例如：Asia/Shanghai）
        ZonedDateTime shanghaiTime = ZonedDateTime.now(ZoneId.of("Asia/Shanghai"));
        System.out.println("上海时区时间：" + shanghaiTime);
    }
}
```

#### 2.4 **日期运算**

`java.time` API 提供了非常方便的日期计算方法。例如：加/减天数、月数、年数等。

```java
import java.time.LocalDate;
import java.time.Month;

public class DateArithmeticExample {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        System.out.println("今天：" + today);

        // 加 5 天
        LocalDate fiveDaysLater = today.plusDays(5);
        System.out.println("5 天后：" + fiveDaysLater);

        // 减 2 个月
        LocalDate twoMonthsEarlier = today.minusMonths(2);
        System.out.println("2 个月前：" + twoMonthsEarlier);

        // 生成特定日期
        LocalDate specificDate = LocalDate.of(2022, Month.DECEMBER, 25);
        System.out.println("特定日期：" + specificDate);
    }
}
```

#### 2.5 **`Duration` 和 `Period`**

- `Duration` 用于表示时间的持续时间（如秒、分钟、小时等）。
- `Period` 用于表示日期的持续时间（如天数、月数、年数等）。

```java
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

public class DurationPeriodExample {
    public static void main(String[] args) {
        // 使用 Duration 计算持续时间
        LocalDateTime start = LocalDateTime.of(2025, 2, 6, 14, 0);
        LocalDateTime end = LocalDateTime.of(2025, 2, 6, 18, 0);
        Duration duration = Duration.between(start, end);
        System.out.println("时间差：" + duration.toHours() + " 小时");

        // 使用 Period 计算日期差异
        LocalDate startDate = LocalDate.of(2022, 12, 25);
        LocalDate endDate = LocalDate.now();
        Period period = Period.between(startDate, endDate);
        System.out.println("日期差异：" + period.getYears() + " 年 " + period.getMonths() + " 个月 " + period.getDays() + " 天");
    }
}
```

#### 2.6 **`DateTimeFormatter`**

`DateTimeFormatter` 用于格式化和解析日期时间。它可以将 `LocalDate`、`LocalTime`、`LocalDateTime` 转换为字符串，反之亦然。

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeFormatterExample {
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // 格式化日期时间
        String formattedDateTime = now.format(formatter);
        System.out.println("格式化后的日期时间：" + formattedDateTime);

        // 解析字符串为日期时间
        String dateString = "2025-02-06 14:30:00";
        LocalDateTime parsedDateTime = LocalDateTime.parse(dateString, formatter);
        System.out.println("解析后的日期时间：" + parsedDateTime);
    }
}
```

### 3. **总结**

- **`java.util.Date`**：较为陈旧且不太推荐使用，支持表示日期和时间。

- `java.time` 包

  （Java 8+）：提供了更为强大且易用的日期时间 API，支持日期时间的计算、格式化、解析等。 

  - **`LocalDate`**：没有时区的日期。
  - **`LocalTime`**：没有时区的时间。
  - **`LocalDateTime`**：没有时区的日期时间。
  - **`Instant`**：带时区的时间戳。
  - **`ZonedDateTime`**：带时区的日期时间。
  - **`Duration`** 和 **`Period`**：用于计算时间和日期的差值。
  - **`DateTimeFormatter`**：用于格式化和解析日期时间。

Java 8 引入的 `java.time` 包提供了更现代化、更强大的日期时间操作功能，是当前推荐使用的日期时间 API。