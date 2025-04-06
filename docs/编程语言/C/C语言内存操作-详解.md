# C语言之内存详解[内存篇]

原文链接：https://blog.csdn.net/ipmux/article/details/17549775

原文链接：https://blog.csdn.net/ipmux/article/details/17549157



## 1、内存篇之越界访问


​    由于C语言指针高度灵活和自由，导致内存操作中陷阱很多，比如之前的堆泄漏,栈溢出,野指针等，此外还有一种常见的“内存访问越界”错误。广义讲，栈溢出也属于内存越界，只是对同一问题站在不同角度的说法。下面看几个内存越界的例子：

```c
void test1()
{
  char string[10];
  char* str1 = "0123456789";
  strcpy( string, str1 );
}
```



程序中遗忘了字符串最后隐藏的终止符’\0’，导致内存访问范围超出数组string的边界，这就是内存越界的一种。而下面是由于循环体的边界条件设置失误导致了访问越界：

```c
void test2()
{
  int tab1[10] = {………};
  for(int i = 0; i<=10; i++)
  {
    tab[i] =tab1[i]*tab1[i];
    printf(“.....”);
  }
}
```

由于循环上限设置错误，最后一次循环的tab[10]超出数组界限，访问了越界的内存。

这两个例子都是栈内存越界，就是之前栈溢出中的第一种情况（stack buffer overflow）。如果把tab1的分配方式改成`int *tab1 = malloc(10)`，后面发生的就是堆内存越界；而如果把`int tab1[10] = {…};`定义在函数`test2()`之外，那就既不是堆也是栈，而是全局数据区的访问越界。各种内存角色越界导致的种种说法可能造成混淆，所以统称内存越界。

内存越界危害很大，被越界覆盖的内存其功能往往是随机的，越界结果也就不可预料。比如上面`test1`函数，执行`strcpy`可能没错，但此时正常的栈内存已经被越界操作破坏，继续运行的结果可能是跳到非法指令抛出异常，或是函数返回值错误，或者执行其他地址的代码，这取决于栈的内容和排列方式。一些病毒程序就是通过有意识的内存越界，覆盖栈中的函数返回地址，从而半路拦截程序去执行恶意代码。

有时尽管内存越界，但由于当时越界覆盖的恰好是一块空白内存，表面看程序运行一切正常。可这样反而更糟，因为错误可能逃脱测试的检查，为软件埋下一颗不定时炸弹。



## 2、内存篇之堆与栈的绕口令


​    堆(heap)/栈(stack或call stack)是两块功能完全不同的系统内存区，堆内存是由malloc/free函数动态申请和回收，而栈则是编译器与启动代码或线程创建代码配合，约定用CPU某寄存器标识最新使用位置的一段内存（所以分系统栈与任务栈，见后文）。但不知是谁添乱，用“堆栈”这个词代表“栈”的含义，导致中文里“堆“、“栈”和“堆栈”混在一起，三者的关系就象绕口令，“堆为堆，栈是栈，堆栈是栈不是堆”。为避免混淆，后文一律不用“堆栈”，而用“堆/栈”表示。

注：栈有时也指一种数据结构，特点是只从一端（栈顶stack pointer）进行数据推入（push）和弹出（pop）操作。由于只允许单端操作，因而遵循后进先出（LIFO, Last In First Out）原则，(想想为什么)，好比弹匣里压子弹，后压进的子弹先发射。而形成对比的队列结构则是从两端分别读写数据，因而先进先出(FIFO),好比火车过隧道，车头先进，也是车头先出。

本文所说的栈更确切的说法是栈段（stack segment），指采用这种栈结构工作的一段物理内存，用于存放局部变量和函数返回地址等。栈段只需通过栈顶指针即可访问，一些CPU有专用寄存器用于存放栈顶地址，另一些则定义某种规范，让所有此CPU的编译器都默认使用某通用寄存器（如ARM的R13）存放sp指针。

堆/栈的区分在相关bbs上似乎是一个永恒的话题，可见大量初学者对此混淆不清。这是因为一来虽然堆/栈是软件最基础的概念之一，却很少有书详细论述，多数是只言片语；再者很多人觉得堆/栈与具体编程无关，不需要深入研究。然而编程时即使写出完全一样的代码，不同人的底气也不一样：有人有理有据所以胸有成竹，有人纯粹瞎蒙写完听天由命。而深刻理解堆/栈，是跳出代码搬运工层次的必需一步。看下面例子：

```c
void alg_proc(char *infile, char *outfile)

{  

  char tmp_inbuf[3000000],tmp_outbuf[3000000];

  FILE *input=fopen(infile,”rb”);

  FILE *output=fopen(outfile,”wb”);

  fread(tmp_inbuf, 1, 3000000, input);

  algfun(tmp_inbuf, tmp_outbuf, BUF_LEN);

  fwrite(tmp_outbuf,1,3000000, output);

  ……

}
```



乍一看没什么问题，初学者习惯用数组，不愿碰指针，反正功能实现了，有容易的何必用难的J。但理解堆/栈后就会知道，这段程序在某些环境下可能无法运行。为什么？暂时卖个关子，先从几方面对比理解堆/栈。

**堆/栈初始化**

堆/栈都是在系统的启动代码里预留并初始化，初始化阶段结束后，系统就能为用户提供函数调用背后的进出栈支持以及动态堆内存管理支持。堆的初始化与后续管理方式相关，设定初始默认堆大小后，根据不同管理方式初始化链表/位图/内存池甚至OS内核里的相关结构和参数。栈是单端存取，初始化时只需设定栈顶地址（stack pointer，简称SP）和栈最大容量，具体说是由启动代码和内存布局脚本文件配合，从系统整体内存中划定一块区域，并用一个CPU寄存器保存SP，可以是专门的硬件SP寄存器（如x86）或者标准规范指定某通用寄存器专门存储SP（ARM），具体栈初始化过程后面专文论述。注意这里指的是系统栈，任务栈是在线程创建时由用户任意分配，不需要初始化。

**分配与回收**

堆内存借助malloc/free函数分配和回收，这里的分配和回收，不象小孩子分糖果，分完就没有了。堆内存只是被暂时使用，是对内存使用权的虚拟分配/回收，就象宾馆把代表房间使用权的钥匙分给客人，客人结帐时还要交还钥匙。（站在管理者视角是分配/回收，用户视角为申请/释放，实际一回事）。用户通过malloc从堆内存区拿到某块内存的钥匙，这块内存此后就被用户独占，可在上面存储数据，使用完则调用free，系统收回内存钥匙。malloc/free在程序运行中动态调用，所以堆都是动态分配，没有静态堆。

栈内存是编译器自动分配和回收的内存区：栈区所保存的元素大小可统计，如局部变量/数组/函数参数等，所以编译器就能提前把所有元素在栈中的位置安排好。相对堆在运行时才申请空间，栈是一种事先的离线的静态分配（或者说安排更恰当）。做到这点还依赖于栈的单端存储结构，不需要专门提供地址，按LIFO原则挪动相应SP指针就能实现内存的安排：压栈是往SP指针所指内存写数据，并递增或递减SP，出栈是把数据从SP所指内存读到寄存器，并递减或递增SP（具体过程见本章节5）。

堆的分配和使用都在运行阶段发生，即先通过malloc返回一块buffer的指针，然后用这块buffer承载数据。栈在运行时直接使用，即通过sp指针读写栈内存。打个比方，堆分配是临时买了一堆东西，然后在家里到处找地方放；而栈是事先计划好买多少东西，根据每件物品大小划定好对应的空间，买好后不需要找，直接一件件放到事先规划好的位置。事先规划可以一个萝卜一个坑，但计划又往往赶不上变化，所以堆/栈两种方式都不可缺少。

**空间大小**

为防浪费，系统栈空间一般较小，因为大容量栈固然能避免栈溢出，但程序触及的最大栈深如果远达不到系统栈底，剩下的部分就成了乌鸦喝不到的水。看开头例子，函数中的局部数组char tmp_inbuf[3000000]，意味着要在栈中存储3000000bytes数据，这已超出多数系统栈的最大容量，因此是不实用的代码。更进一步，涉及多线程编程时，线程栈的设置直接考验程序员对栈的理解，要根据线程里函数调用深度及局部变量使用情况估计栈的极限占用，若设置过小，函数执行到一定深度会发生栈溢出。

 堆大小只受限于计算机物理或虚拟内存，容量一般很大。只不过注意malloc失败会返回空指针，最好做针对性处理，主动给出提示并避免内存不足时程序crash。

软件，尤其是嵌入式软件中，必须清楚自己的代码占用了多少堆/栈资源，否则，程序可能中看不中用。

**分配效率**

堆管理是C函数库实现的功能，属于在线分配，尽管不同实现机制间效率有高有低，但总归要占用运行时资源，如位图查找/链表查找等。而且频繁malloc/free后往往会会造成内存碎片，需要不定时整理。如果要进行系统调用，更会引发用户态和核心态的切换，使整体分配效率更低。

而栈是在编译时划定空间，属于离线分配，不占用运行时资源，没有运行时代价。

所以单就分配效率来说，栈优于堆。

**访问效率**

有人认为栈的访问效率一定高于堆，这是不对的。首先要把分配与使用区分开，不能混为一谈。如上文，栈的分配效率高于堆，因为其根本不在运行时分配。但内存的真实读写效率取决于其物理属性，堆和栈具体谁的访问效率高取决于初始化阶段或线程创建阶段（即系统栈/任务栈），系统把堆/栈各自定位到哪段物理内存上，包括要考虑cache的影响。

所以如果所处物理内存相同，堆/栈的访问效率相当。笼统说法中栈效率高于堆是综合分配与访问，毕竟栈没有分配的代价。

**总结**

栈由系统（编译器）管理，不需要程序员运行时显式分配/释放，使用方便且整体效率高，缺点是容量一般较小，不合适大数据缓存，且栈是编译器静态预先使用，不如动态堆使用灵活；堆是运行时函数库和OS提供的功能，灵活方便，适合灵活存储动态大数据，但需要一定管理代价，且易发生堆泄漏。



## 3、内存篇之栈溢出


​    “溢出”这个词很生动，水满则溢，前面说过栈就象一个容器，容器装满了，还要往里装东西，当然就会溢出了。

有两种不同情景都被称为栈溢出，一种是栈中的数据被越界覆盖，wiki中称这种情况为stack buffer overflow。一种常用的黑客攻击手段--栈溢出攻击，就是通过栈越界访问，用事先设计好的数据覆盖正常栈里的内容。比如把保存函数返回地址的栈内存用某段黑客代码的地址覆盖，函数结束时不能正确返回，而是顺着被篡改的地址跳到黑客代码处，攻击者从而获得系统控制权，执行一些非法操作。这属于一种有意识的越界访问，但并没有真正溢出栈的存储空间的边界，只是破坏了栈内的数据。

而嵌入式软件需要注意另一种真正的栈溢出：所有栈空间都被填满，即真正的stack overflow。因为栈空间说到底就是一块固定大小的内存，当程序不断压栈，以至超出了系统预留的栈空间，压栈操作就可能越界覆盖其它内存功能模块，这就是真的栈溢出。

栈溢出或者说占用过多主要有几种原因：

**a. 递归函数调用**

函数调用过程需要保存当前地址，传入的参数等，递归函数不断调用自身，直到某条件满足，是非常消耗栈的一种方式，因此嵌入式系统中一般不使用递归函数。

**b. 过大的局部变量**

嵌入式平台下栈的大小有限，所以大的缓存应尽量分配到堆内存，避免大尺寸的局部数组。可以对照Wiki的解释（简化）：

**Stack overflow mean:**

> Stack overflow, when too much memory is used on the call stack
>
> Stack buffer overflow, when a program writes to a memory address on the program's call stack outside of the intended data structure, usually a fixed length buffer.
>
> A stack overflow occurs when too muchmemory is used on the call stack. The call stack contains a limited amount of memory. The size of the call stack depends on many factors, including the programming language, machine architecture, multi-threading, and amount of available memory. When too much memory is used on the call stack the stack is said to overflow。This is usually caused by one of two types of programming errors.
>
> a. Infinite recursion
>
> The most common cause of stack overflows is excessively deep or infinite recursion.
>
>  An example of infinite recursion inC language:  main() {   main(); } .The main function calls itself until the stack overflows resulting in a segmentation fault.
>
> b. Very large stack variables
>
> The other major cause of a stack overflow results from an attempt to allocate more memory on the stack than will fit. This is usually the result of creating local array variables that are far too large. For this reason arrays larger than a few kilobytes should be allocated dynamically instead of as a local variable.
>
> Stack overflows are made worse by anything that reduces the effective stack size of a given program. For example, the same program being run without multiple threads might work fine, but as soon as multi-threading is enabled the program will crash. This is because most programs with threads have less stack space per thread than a program with no threading support.

程序移植过程中两种情况容易发生真正的栈溢出：1）windows上运行正常的程序，移植到嵌入式平台后发生奇怪错误：如跟踪某函数体内的return结果明明为0，但返回上一层函数后就突然变成另外的值，这多数就是由于大数组导致了栈溢出。2）程序从单线程移植到多线程环境，容易栈溢出，因为多线程往往对栈空间限制得更严格，这里涉及另一对概念，系统栈与任务栈，后文再续。



## 4、内存篇之堆的错误释放


​    在我开始写程序时因为担心某些分支下忘记释放内存导致泄漏，就想能不能保险点，多加几次释放，但很快发现堆内存不能重复释放，一些错误释放甚至会导致系统崩溃。这类错误可分几种情况：

1）重复释放某指针指向的内存，多数由于调用了不同层的子函数重复释放同一内存，如：

```c
int* p = malloc(20);

……

free (p);

……

System_Free()  //此函数内再次free(p)，程序员没有注意

有人说，释放前加上空指针判断就能避免这个问题。即：if(p!=null)  free(p);

可单单这样做并没有效果！人们往往认为free(p)的对象是指针p，而实际free(p)只是把指针p指向的内存释放，并不改变指针p本身。也就是说，free不会强制清零指针p，free之后p仍指向原来内存块，只是这块内存已不可用而已。既然p没有被free清零，判断空指针的操作就不起作用。所以完整做法还要在free后加上指针清零，这样空指针判断才有用，即：

if(p!=null)

{

  free(p);

  p = null;

}
```

2）即使free后指针清0，free前做非0检查，但如果不同指针指向同一内存，又分别被free呢，如：

```c
int* p1 = malloc(20);

int* p2 = p1; //p2,p1指向同一地址

……;

free( p1);

free( p2);  //错误，p2所指内存已被free( p1)释放，不能重复释放同一块内存。

这种情况也是重复free同一内存，但用1)的方法没法预防。
```

3)   free操作的指针不是指向堆内存：

```c
int a = 100;

int* p = &a;

free( p);  //ERROR, p don’t point to heap, and stack can’t be freed by free()

除了malloc返回的堆内存，其他如栈内存/数据区等不能用free释放。
```

4)  free操作的指针不是malloc返回的内存块起始指针：

```c
int* p = malloc(20);

p++;

……

free(p); //ERROR, p doesn’t point to the start address of a memory block

free操作的指针必须是已分配的某块堆内存的起始指针，移动后的指针不指向内存块起始，被free也会crash。
```

5)  free逻辑错误导致野指针，多由于free时机不对，比如两指针指向同一块内存时：

```c
int* a = (int*)malloc(sizeof(int));

int* b = a;

free(a);

*b = 0;      //访问野指针


```
这种类型错误还包括：子函数中包含释放某指针形参所指内存的操作，而主函数不知情，在调用此子函数之后还继续使用该内存；链表释放时先释放某节点内存，又试图通过此节点访问并摘除后续节点。这些都是错误释放导致的野指针访问错误。关于野指针，后叙。

如果程序总在退出时crash，就要检查是否有错误free。


## 5、内存篇之指向栈的指针


​    下面程序运行有什么样的结果？

```c
char *GetString(void)

{

  char array[6];

  strcpy(array, “hello”);

  return array;

}

void main()

{

  char *pstr = NULL;

  pstr = GetString();

  printf("%s\n", pstr);

}

```

答对这个问题，脑子里必须有一根弦，那就是栈内存里的内容如“昙花一现”，其有效的生命周期只等于函数周期，访问栈内存的前提条件是在函数运行范围内，函数一旦退出，相应的栈内存立马消散，如同镜花水月，再访问就是野指针的“非法”操作。

上例中，函数`char *GetString`返回了指向局部数组`array[6]`的指针，但`array[6]`位于栈中，函数的栈内存在其结束后立刻失效，函数退出后再试图通过pstr访问栈内存就成了非法操作。因此，返回指向栈内存的指针这种机制，看似在函数退出后继续访问栈内存留了一个“后门”，实际上是一个隐晦的陷阱。再比较下面例子：

```c
char *GetString(void)    {
	char array[6]=”hello”;

  char *p = malloc(6);

  strcpy(p, array);

  return p;

}

void main()

{

  char *str = NULL;

  str = GetString();

  printf("%s\n", str);

}
```
这里先把hello字符串从array[]所在的栈内存拷贝到指针p指向的堆内存中，当GetString 函数结束后，array[]栈内存失效了，但指针p所指的堆内存仍有效并保存着”hello”串，函数返回指向堆的指针就没有问题了。如果把直接用指针指向字符串呢：

```c

char *GetString(void)

{

  char *p = "hello";

  return p;

}

void main()

{

  char *str = NULL;

  str = GetString();

  printf("%s\n", str);

}
```

把原先的数组修改成指针，即 char *str="hello"，这样也可行，因为"hello"串位于常量数据区，在子函数结束后依然有效，通过返回的p指针仍然可以读取这块内存。







## 6、内存篇之堆泄漏

“堆泄漏”即常说的内存泄漏，是嵌入式软件里的常见问题，会导致软件运行一段时间后内存耗尽。

### 什么是”堆泄漏”？

> 内存分配和释放的操作是程序员根据需要动态随机发起，程序本身（或编译工具）无法自动判断某块已分配的内存什么时候不再被使用，必须由程序员自己手动调用free释放，以便为其他程序腾出空间。而一旦程序员忘记释放某块内存，它就不能回到可用内存，系统总的可分配内存就随之减少，这就是内存泄漏。注意这里的内存特指堆（heap），只有堆内存才需要程序员自己控制分配和释放。所以内存泄漏和堆泄漏是同一概念。
>
> 新手对泄漏这个词往往感到不理解，不就是分配后忘记释放，怎么叫泄漏呢？叫内存丢失不是更通俗么？
>
> 关于这点，可以打个比方，分配内存就是从银行贷款，而释放内存就是给银行还钱。如果有人借了钱却赖帐不还，那么银行可支配的钱就会减少，银行总资产就被损失或泄漏。类似，堆是一块固定大小内存，“借”给不同程序使用，如果某个程序只借不还，堆管理所能支配的内存就减少，因此内存泄漏是针对系统中总的可支配内存资源来说，而并不是物理内存真的丢失。从这个角度理解，leak绝对比lost更准确生动：一种资源在封闭系统中循环使用，如果部分资源无法回到循环，不正是泄漏到封闭系统之外了么？



   借钱不还的银行客户越来越多，最终银行就会因为没钱放贷周转而破产。同样发生内存泄漏，直接的表现就是软件运行越来越慢，最终甚至因分不到内存而崩溃。（所以说一定要判断malloc的返回值，不是每次都能从银行借到钱滴）

### 泄漏原因及对策

所有老师都会强调malloc后一定要有free，但实际编写复杂代码时，内存泄漏几乎不可避免。比如下面多分支退出，某分支忘记释放已分配的内存，就导致泄漏：

```c
void MyFunc(int size)
{
  char* p= malloc(size);
  if( !GetStringFrom( p, nSize ) )
  {
    printf(“Error”);
    return;
  }
   …//using the string pointed by p;
  free(p);
}
```


无法完全避免内存泄漏，只能通过一些编程原则减少泄漏的概率：

1) 减少多分支退出而遗漏free，可用goto语句保证函数只有一个退出点。

2) 保证在同一层上使用malloc/free对，也就是说不要在子函数中malloc，在外层主函数free。这种内存在不同层次分配释放会使逻辑层次混乱，很容易导致内存泄漏。

```c
char* AllocStrFromHeap(int len)

{

  char *pstr;

  if ( len <= 0 ) return NULL;

  return ( char* ) malloc( len );

}
```



相反如果在主函数中malloc并使用内存，而在某子函数中释放参数所指内存，可能导致主函数中出现野指针（后续）。

3）人工review代码查找内存泄漏很困难，可借助工具快速检测，如boundchecker/pc-lint等都能通过自动扫描代码找到内存泄漏。



### 隐式泄漏

> 是指某内存已使用完，明明可以早点free掉，却非等到软件退出前才释放，俗称“占着XX不XX”，虽然程序最终释放了所有内存，严格意义上没有泄漏，但某些场合隐式泄露同样会导致严重后果：比如某长期运行的服务器程序，如果不断分配而不及时释放内存，最后系统很可能在运行中途就因堆内存耗尽而crash，因此内存使用过程中，不但要确保释放内存，而且用完要尽快释放，而不要全等到退出前释放，以消除隐式泄漏，确保内存占用峰值不超过系统堆资源上限。




原文链接：https://blog.csdn.net/ipmux/article/details/17530065



## 7、内存篇之静态与动态分配


​    经常听到诸如静态分配/动态分配以及静态库等类似表述，这些究竟是什么含义呢？老规矩，看看万能wiki上的定义：

> “The word static refers to things that happen at compile time and link time when the program is constructed--as opposed to load time or run time when the program is actually started.”
>
> “The term dynamic refers to things that take place when a program is loaded and executed. ”


软件范畴的静态和动态，主要以程序编译和运行的不同阶段划分。发生在程序编译连接阶段，由编译器处理和支配的是静态；而发生在程序加载和运行阶段的就是动态。这一划分方式可推及到很多相关概念，如动静态库，动静态链接和动静态内存分配等。

所以程序编译连接时，由编译器划分的存储空间就是静态内存，对应的过程是静态分配；而在程序运行阶段，通过函数(如malloc)按需申请的内存就是动态内存，其过程为动态分配。具体到不同内存区，堆内存是动态分配，没有静态堆的说法，其它如栈、全局数据区、常量区和程序代码区，一般都在编译阶段划分，属静态分配（特殊时也会动态划分）。

数组和malloc申请的内存各自代表体现了静态和动态的特点（参考”指针篇指针与数组”一节）。数组可直接使用，不需要用malloc去临时请求buffer，没有额外CPU开销。但数组无法在运行中根据情况变化按需请求内存，事先定义的数组大了会浪费，不够的话又可能引起下标越界；而用malloc请求内存需要一些开销，但它可以灵活的按需临时分配。

因此选择静态与动态其实是选择事先完成但只能预估的编译器，或者消耗资源但方式灵活的CPU，其中的思想和智慧值得体味。

"静态"还有一种更狭义的定义，只把static extern变量以及常量等存储于主数据区的元素称为静态，而局部变量和数组等栈里的元素称为自动变量。具体看看wiki大大怎么描述（手痒，自作主张加了点注释）：

> The C language manages memory statically, automatically, or dynamically. Static-duration variables are allocated in main memory, usually along with the executable code of the program, and persist for the lifetime of the program（即static变量和全局变量）; automatic-duration variables（所谓自动变量，即局部变量） are allocated on the stack and come and go as functions are called and return. For static-duration and automatic-duration variables, the size of the allocation is required to be compile-time constant (before C99, which allows variable-length automatic arrays). If the required size is not known until run-time (for example, if data of arbitrary size is being read from the user), then using fixed-size data objects is inadequate.（确实如此）
>
> The lifetime of allocated memory is also a concern. Neither static- nor automatic-duration memory is adequate for all situations（各有缺陷）. Automatic-allocated data cannot persist across multiple function calls（lifetime过短，不够）, while static data persists for the life of the program whether it is needed or not（lifetime过长，浪费）. In many situations the programmer requires greater flexibility in managing the lifetime of allocated memory（需要更灵活的内存使用方式）.
>
> These limitations are avoided by using dynamic memory allocation in which memory is more explicitly (but more flexibly) managed, typically, by allocating it from the heap, an area of memory structured for this purpose. In C, the library function malloc is used to allocate a block of memory on the heap. Then the program can access this block of memory via a pointer that malloc returns. When the memory is no longer needed, the pointer is passed to free which deallocates the memory so that it can be used for other purposes.


原文链接：https://blog.csdn.net/ipmux/article/details/17527709







## 8、内存篇之程序内存布局

​    程序内存布局是理解软件本质的基础要素。支持一个程序运行的所有内存大体可分为以下几部分，或者说程序运行需要系统为其提供如下几部分存储区域：
​    栈：由编译器自动分配释放，存放函数参数，局部变量等,特点为后进先出。

堆：程序员调用malloc/free进行内存动态分配和释放所操作的内存区域。

全局数据区（静态区）：全局变量以及static变量存放的内存区，注意static变量不管在哪里定义都存放在全局数据区（见C基础static篇）。初始化的全局和静态变量在全局初始化区，未初始化的全局和静态变量在全局未初始化区。整个全局数据区在程序结束后由系统释放。

程序代码区：存放二进制的程序代码，一般规定为只读。

常量区：里面存放常量，不能修改，如"adgf"这样的字符串就存放在常量区，一直占用到程序结束。

不同编译器和系统的内存布局划分会有细小差别，但上述几大块基本跑不掉。它们是组成一个完整程序的内存基础，这里的程序指运行在没有OS的裸系统上的控制程序，比如单片机应用等，而引入OS后，单个进程所包含的元素也基本归于以上几类。下面举例说明C程序中不同元素在内存中的定位区域：

```c


int a = 0;    //全局初始化区

char *p1;    //全局未初始化区

void main()

{

  int b;          //栈

  char s[] = "abc"; //s[]在栈上，abc在常量区

  char *p2;      //栈

  char *p3 = "12345"; // p3在栈上，12345在常量区。

  static int c =0； //全局（静态）初始化区

  p1 = (char *)malloc(10);

  p2 = (char *)malloc(20); //分配的10和20字节内存块在堆里，而p1,p2本身在栈中

  strcpy(p1,"12345"); //12345在常量区，编译器会将它与p3所指的"12345"优化成一块

}


```
总结：函数体中定义的局部变量（非static）位于栈上；通过malloc,calloc等函数分配所得到的内存在堆上；所有全局变量以及static静态变量都放在全局数据区。程序自身指令位于只读代码区。常量位于常量区（有的也散列在代码区，因为都是只读属性，可以合并放在一起）。


原文链接：https://blog.csdn.net/ipmux/article/details/17527465





## 9、内存篇之程序内存消耗评价指标


​    嵌入式软件除CPU占用率或者说运行速度外，内存方面还有三大量化评价标准，即ROM size, Peak memory occupation和 max stack depth,虽然不属于什么官方标准，但这三点的确综合反映了程序内存占用方面的整体指标。

rom size既不是指exe文件大小，也不是lib文件大小，而是目标文件中有效二进制段大小。exe和lib文件中都有一些辅助段，如文件头/加载信息/符号表等，这些段在最终进驻系统RAM的过程中一般会被剔除。因此统计模块的ROM size大小要用二进制工具（如gcc中的ar或objdump等toolchain）分析，累加“代码段”+“数据段”等有效的内存占用段，得到最终结果。

ROM size与编译器及其编译选项有一定相关性，同样的代码由不同的编译器编译，最终获得的纯粹二进制代码大小会有一定差别。如C优化篇提到空间换时间的循环展开就是增大ROM size换取速度的提高。

peak memory occupation是指模块内不断malloc 与free的过程中，动态堆内存消耗的最高点，这个指标代表了模块对内存的需求。注意这是一个动态过程，并不是将代码中所有malloc的内存大小相加的值，可对照理解内存泄漏中的隐式泄漏。



max stack depth是指整个模块运行过程中所进入的最大栈深度。软件运行中不停进出函数，同时也会不停压栈和出栈，在这个动态过程中触及的最大栈内存的深度代表了模块对系统栈段最小容量的要求。在程序由PC移植到嵌入式系统时要特别注意这个指标，往往要消除一些函数内部局部大数组来降低栈深度，满足嵌入式平台的要求。可参见栈溢出。

这几个评价标准在不同应用中各自有不同侧重点，要根据硬件平台特性综合考量。

原文链接：https://blog.csdn.net/ipmux/article/details/20695033





