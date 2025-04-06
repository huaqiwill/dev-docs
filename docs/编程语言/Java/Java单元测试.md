# 单元测试框架 JUnit



## JUnit简单使用





## JUnit常用注解



在JUnit4 中常用的注解有@Test、@BeforeClass、@AfterClass、@Before、@After

**详细描述**

@BeforeClass：它会在所有的测试方法执行之前被执行，只执行一次该方法，且必须为 public static void。当运行一些关联的用例时，可能会需要执行一些相同的操作，这时可将共用的部分提取出来，放在一个方法里，并且这个方法注解为@BeforeClass。意思是在测试类里所有用例运行之前，运行一次这个方法。例如创建数据库连接、读取文件等。

@AfterClass：同@BeforeClass对应，在所有的测试方法执行完成后被执行，只执行一次该方法，且必须为 public static void。例如关闭数据量连接、释放 IO 连接资源，恢复现场等。

@Before：与@BeforeClass的区别在于，@Before不止运行一次，会在每一个测试方法被运行前执行一次，运行次数根据用例数而定，且必须为 public void。常用于一些独立于用例之间的准备工作，如进行测试环境或数据的准备。例如两个用例都需要读取数据库里的相同一条数据，但第一个用例会删除这条数据，而第二个用例需要编辑这条数据。就可以用	@BeforeClass来创建数据库连接。用@Before来执行插入这条数据。也可以用 @Before 来注释多个方法，这些方法都在每个测试之前运行。

@After：同@Before对应，会在每一个测试方法被运行结束后执行一次，且必须为 public void。常用与进行一些数据清理工作。
	@Test：将一个普通的方法修饰成为一个测试方法，在方法前添加@Test注释，就把这个方法标记为一个单元测试方法。测试方法必须为 public void。方法名字可以随便取，没有任何限制，但是规范写法是test+方法名，方法名第一个子母大写。方法不能有任何参数。

@Ignore：该注解标记的测试方法会被忽略，所修饰的测试方法不会被运行器执行。比如当测试的方法还没有实现，或者测试的方法已经过时。忽略或者禁止junit测试类上的所有方法的执行，则在测试类上添加@Ignore注解即可。@Ignore("message")，message可以备注为什么忽略。
	一个JUnit 4 的单元测试用例执行顺序为：

@BeforeClass--> （@Before –> @Test –> @After ）–>（@Before –> @Test –> @After ）–> @AfterClass
	每一个测试方法的调用顺序为：@Before –> @Test –> @After



## JUnit断言方法

### assert断言方法

断言方法参数统一说明：message是个可选的消息，假如提供，将会在发生错误时报告这个消息。expected是期望值，通常都是用户指定的内容。 actual是被测试的代码返回的实际值。

1. assertArrayEquals(“message”,expecteds, actuals)

   该断言用来比较两个数组是否相等。

2. assertEquals(“message”,expecteds,actuals)

   该断言用来比较两个对象是否相等。与字符串比较中使用的equals()方法类似。

3. assertSame(“message”,expecteds,actuals)

   该断言用来比较两个对象的引用是否相等。之前的assert方法是检查A与B是否有相同的值（使用了equals方法），而assertSame方法则是检查A与B就是同一个对象（使用的是==操作符）。

4. assertNotSame(“message”,expecteds,actuals)

   该断言用来比较两个对象的引用是否相等和不相等，类似于通过“!=”比较两个对象。

5. assertTrue(“message”,condition)

    该断言用来验证条件是否为真，查看的变量的值是true则测试成功，如果是false则失败。 

6. assertFalse(“message”,condition)

   该断言用来验证条件是否为假，查看的变量的值是false则测试成功，如果是true则失败。

7. assertNull(“message”,object)

   该断言用来验证给定的对象是否为null，假如不为null，则验证失败。

8. assertNotNull(“message”,object)

   该断言用来验证给定的对象是否为不为null，假如为null，则验证失败。

### assertThat

使用assertThat需要导入JUnit4包

junit.jar
hamcrest-core-1.3.jar
hamcrest-library-1.3.jar

```java
import static org.junit.Assert.assertThat;
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.CoreMatchers.*; 
```

assertThat的优点如下：

1、使用一条assertThat可以替代所有的实训3中的所有断言语句，这样可以在所有的单元测试中只是用一种断言方法，使得编写测试用例变得简单，代码风格统一，测试代码也更易维护。

2、assertThat使用了Hamcrest的Matcher 匹配符，用户可以使用匹配符规定的匹配准则精确的指定一些想设定满足的条件，具有很强的易读性，而且使用起来更加灵活，可以达到更多的目的。

3、assertEquals使用的是比较难懂的“谓宾主”语法模式，期望值在前，实际值在后 （如：assertEquals(expecteds,actuals);）不易于理解和记忆；assertThat 使用了类似于“主谓宾”的易读语法模式（如：assertThat(actuals,is(expecteds));），使得代码更加直观、易读。

4、assertThat错误信息更加易懂、可读且具有描述性，assertEquals 默认出错后不会抛出额外提示信息，错误信息不明确。

**一般匹配符**

1. allOf

   匹配符表明如果接下来的所有条件必须都成立测试才通过，相当于“与”（&&）；
    assertThat( testedNumber, allOf( greaterThan(4), lessThan(10) ) );。

2. anyOf

   匹配符表明如果接下来的所有条件只要有一个成立则测试通过，相当于“或”（||）；assertThat( testedNumber, anyOf( greaterThan(10), lessThan(4) ) );。

3. anything

   匹配符表明无论什么条件，永远为true；
    assertThat( testedNumber, anything() );。

4. is

   匹配符表明如果前面待测的object等于后面给出的object，则测试通过；
    assertThat( testedString, is( "developerWorks" ) );。

5. not

   匹配符和is匹配符正好相反，表明如果前面待测的object不等于后面给出的object，则测试通过；
     	 assertThat( testedString, not( "developerWorks" ) );。 

**字符串相关匹配符**

1. containsString

   assertThat( testedString, containsString( "developerWorks" ) );

   匹配符表明如果测试的字符串testedString 包含子字符串"developerWorks"则测试通过。

2. endsWith

   assertThat( testedString, endsWith( "developerWorks" ) ); 

   匹配符表明如果测试的字符串testedString以子字符串"developerWorks"结尾则测试通过。

3. startsWith

   assertThat( testedString, startsWith( "developerWorks" ) );

   匹配符表明如果测试的字符串testedString以子字符串"developerWorks"开始则测试通过。

4. equalTo

   assertThat( testedValue, equalTo( expectedValue ) ); 

   匹配符表明如果测试的testedValue等于expectedValue则测试通过，equalTo可以测试数值之间，字符串之间和对象之间是否相等，相当于Object的equals方法。

5. equalToIgnoringCase

   assertThat( testedString, equalToIgnoringCase( "developerWorks" ) ); 
   匹配符表明如果测试的字符串testedString在忽略大小写的情况下等于"developerWorks"则测试通过。

6. equalToIgnoringWhiteSpace

   assertThat( testedString, equalToIgnoringWhiteSpace( "developerWorks" ) );

   匹配符表明如果测试的字符串testedString在忽略头尾的任意个空格的情况下等于"developerWorks"则测试通过，注意：字符串中的空格不能被忽略。

**数值相关匹配符**

1. closeTo

   assertThat( testedDouble, closeTo( 10.0, 0.5 ) );

   匹配符表明如果所测试的浮点型数testedDouble在10.0±0.5范围之内则测试通过。

2. greaterThan

   assertThat( testedNumber, greaterThan(10.0) );

   匹配符表明如果所测试的数值testedNumber大于10.0则测试通过。

3. lessThan

   assertThat( testedNumber, lessThan (8.0) );

   匹配符表明如果所测试的数值testedNumber小于8.0则测试通过。

4. greaterThanOrEqualTo

   assertThat( testedNumber, greaterThanOrEqualTo (10.0) );

   匹配符表明如果所测试的数值testedNumber大于等于10.0则测试通过。

5. lessThanOrEqualTo

   assertThat( testedNumber, lessThanOrEqualTo (10.0) );

   匹配符表明如果所测试的数值testedNumber小于等于10.0则测试通过。   

**集合相关匹配符**

1. hasItemInArray

   assertThat( Array, hasItemInArray( "element" ) );

   匹配符表明如果测试的数组Array含有元素“element”项则测试通过。

2. hasItem

   assertThat( iterableObject, hasItem ( "element" ) );

   匹配符表明如果测试的迭代对象iterableObject含有元素“element”项则测试通过。

3. hasItems

   assertThat(iterableObject, hasItems("element1", "element2"));

   匹配符表明如果测试的迭代对象iterableObject中至少含有元素“element1”、“element2”则测试通过。

4. containsInAnyOrder

   assertThat(iterableObject,containsInAnyOrder("element1","element2","element3"));

   匹配符表明如果测试的迭代对象iterableObject只含有元素为“element1”、“element2”和“element3”项则测试通过。

5. hasEntry

   assertThat( mapObject, hasEntry( "key", "value" ) );

   匹配符表明如果测试的Map对象mapObject含有一个键值为"key"对应元素值为"value"的Entry项则测试通过。

6. hasKey

   assertThat( mapObject, hasKey ( "key" ) );

   匹配符表明如果测试的Map对象mapObject含有键值“key”则测试通过。

7. hasValue

   assertThat( mapObject, hasValue ( "value" ) );

   匹配符表明如果测试的Map对象mapObject含有元素值“value”则测试通过。 

```java
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.CoreMatchers.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.Before;
import org.junit.Test;
import com.lyh.share.model.User;

public class UserDaoTest {
	private User test1;
	private User test2;

	@Before
	public void init() {
		test1 = new User();
		test1.setUsername("tt1");
		test1.setPassword("3");
		test1.setShares();
		test2 = new User();
		test2.setUsername("tt2");
		test2.setPassword("1");
		test2.setShares();
	}

	@Test
	public void findUser() {
		/** 数值匹配 **/
		//测试变量是否大于指定值
		assertThat(test1.getShares(), greaterThan());
		// 测试变量是否小于指定值
		assertThat(test1.getShares(), lessThan(0));
		// 测试变量是否大于等于指定值
		assertThat(test1.getShares(), greaterThanOrEqualTo());
		// 测试变量是否小于等于指定值
		assertThat(test1.getShares(), lessThanOrEqualTo(0));

		// 测试所有条件必须成立
		assertThat(test1.getShares(), allOf(greaterThan(), lessThan(0)));
		// 测试只要有一个条件成立
		assertThat(test1.getShares(), anyOf(greaterThanOrEqualTo(), lessThanOrEqualTo(0)));
		// 测试无论什么条件成立(还没明白这个到底是什么意思)
		assertThat(test1.getShares(), anything());
		// 测试变量值等于指定值
		assertThat(test1.getShares(), is(0));
		// 测试变量不等于指定值
		assertThat(test1.getShares(), not());

		/** 字符串匹配 **/
		String url = "http://www.taobao.com";
		// 测试变量是否包含指定字符
		assertThat(url, containsString("taobao"));
		// 测试变量是否已指定字符串开头
		assertThat(url, startsWith("http://"));
		// 测试变量是否以指定字符串结尾
		assertThat(url, endsWith(".com"));
		// 测试变量是否等于指定字符串
		assertThat(url, equalTo("http://www.taobao.com"));
		// 测试变量再忽略大小写的情况下是否等于指定字符串
		assertThat(url, equalToIgnoringCase("http://www.taobao.com"));
		// 测试变量再忽略头尾任意空格的情况下是否等于指定字符串
		assertThat(url, equalToIgnoringWhiteSpace("http://www.taobao.com"));

		/** 集合匹配 **/

		List<User> user = new ArrayList<User>();
		user.add(test1);
		user.add(test2);

		// 测试集合中是否还有指定元素
		assertThat(user, hasItem(test1));
		assertThat(user, hasItem(test2));

		/** Map匹配 **/
		Map<String, User> userMap = new HashMap<String, User>();
		userMap.put(test1.getUsername(), test1);
		userMap.put(test2.getUsername(), test2);

		// 测试map中是否还有指定键值对
		assertThat(userMap, hasEntry(test1.getUsername(), test1));
		// 测试map中是否还有指定键
		assertThat(userMap, hasKey(test2.getUsername()));
		// 测试map中是否还有指定值
		assertThat(userMap, hasValue(test2));
	}
}
```

## JUnit限时和异常测试

在实际测试中，测试一些逻辑复杂、循环嵌套较深的程序，很可能会出现死循环，进入死循环就无法自动终止。因此在测试中需要采取一些预防措施，@Test注解提供1个参数“timeout”可以使用在该场景。使用“timeout”就是给测试函数设定一个执行时间，如果测试运行时间长于定义的时间，执行方法会被系统强行终止，测试失败。并且系统还会汇报该测试方法是因为超时才结束。@Test(timeout = 1000)表示如1000ms未执行完成，就因为超时而自动终止。

在开发过程中，JAVA中的异常处理也是重点，异常的捕获、抛出和异常处理是维持代码健壮性的重要条件，灵活使用异常以及处理异常，不仅能最大限度的避免出错而且也能增加软件的容错能力。在进行单元测试时，我们除了需要测试正常流程和正确的程序功能置外，可能还需要测试异常场景。如果一个函数应该抛出异常但是却没有抛出异常这说明程序有Bug。在JUnit中@Test注解提供一个参数测试异常情况，@Test(expected…)定义测试方法应该抛出的异常类型，如果方法调用中抛出了这个异常则测试通过，如果测试方法没有抛出异常或者抛出了一个不同的异常，测试失败。

## JUnit参数化测试



## JUnite测试套件



## JUnit的TestRunner

在前面的JUnit的学习过程中，了解了JUnit核心的测试类（TestCase）、测试集（TestSuite），本指导书主要讲解JUnit核心的测试运行器（TestRunner）。

在JUnit测试执行过程中，我们把测试代码提交给JUnit框架后，框架是通过什么来运行代码呢？答案就是TestRunner。TestRunner就是执行测试集的程序，在JUnit中有很多TestRunner，它们负责调用测试代码，每一个TestRunner都有自己的特殊功能，在实际使用中，我们需要根据不同的要求来选择不同的TestRunner。使用测试运行器的的方式也比较简单，主要使用JUnit的@RunWith注解。

在前面的学习中，大部分的测试都未指定TestRunner，但是也能正常执行。这是因为如果未指定TestRunner，那么执行时JUnit会自动使用默认的Runner，即BlockJUnit4ClassRunner。

JUnit包含的测试运行器：

（1）JUnit38ClassRunner：为了兼容JUnit3.8的运行器

（2）BlockJunit4ClassRunner：JUnit4的默认测试运行器

（3）Parameterized：参数化测试，使用不同参数来运行相同测试集的运行器。

（4）Suite：实现打包测试。新建一个类把很多测试类放在一起，执行这个新建的类，就会把所有的测试类一起执行。

（5）Categories：分类执行，可以使用Categories运行器来制定一组测试被包含或排除。

在代码中如未指定Runner，执行的时候就使用默认的Runner。默认执行器叫BlockJUnit4ClassRunner。

## JUnit测试优先级顺序

在JUnit测试执行过程中，我们发现JUnit执行测试方法的顺序并不是按照测试类中写好的测试方法顺序来执行。在实际过程如果测试方法有执行的先后，比如在测试数据库相关的用例时候，按照插入数据，查询数据和删除数据的顺序来执行测试方法。如果未指定顺序，可能会先删除，那么测试就会不通过。

JUnit提供了@FixMethodOrder注解来控制测试方法的执行顺序。提供了3种执行顺序类型。

①　MethodSorters.JVM：按照JVM得到的方法顺序，也就是代码中定义的方法顺序；

②　MethodSorters.DEFAULT：JUnit默认的执行顺序；

③　MethodSorters.NAME_ASCENDING：按照方法名的字母顺序执行。







实训1 JUnit测试框架使用

实训2 JUnit基础注解

实训3 JUnit断言方法-assert

实训4 JUnit断言方法-assertThat-一般匹配符

实训5 JUnit断言方法-assertThat-字符串相关匹配符

实训6 JUnit断言方法-assertThat-数值相关匹配符

实训7 JUnit断言方法-assertThat-集合相关匹配符

实训8 JUnit限时和异常测试

实训9 JUnit参数化设置

实训10 JUnit测试套件

实训11 JUnit中Failure和Error讲解

实训12 JUnit的TestRunner使用

实训13  JUnit 测试优先级顺序



