# 一、Lambda 表达式
	Lambda 表达式，也可称为闭包，它是推动 Java 8 发布的最重要新特性。
	lambda 表达式只能引用标记了 final 的外层局部变量


	// 1. 不需要参数,返回值为 5  
	() -> 5  
	  
	// 2. 接收一个参数(数字类型),返回其2倍的值  
	x -> 2 * x  
	  
	// 3. 接受2个参数(数字),并返回他们的差值  
	(x, y) -> x – y  
	  
	// 4. 接收2个int型整数,返回他们的和  
	(int x, int y) -> x + y  
	  
	// 5. 接受一个 string 对象,并在控制台打印,不返回任何值(看起来像是返回void)  
	(String s) -> System.out.print(s)



	public class Java8Tester {
	   public static void main(String args[]){
	      Java8Tester tester = new Java8Tester();
	                
	      // 类型声明
	      MathOperation addition = (int a, int b) -> a + b;
	                
	      // 不用类型声明
	      MathOperation subtraction = (a, b) -> a - b;
	                
	      // 大括号中的返回语句
	      MathOperation multiplication = (int a, int b) -> { return a * b; };
	                
	      // 没有大括号及返回语句
	      MathOperation division = (int a, int b) -> a / b;
	                
	      System.out.println("10 + 5 = " + tester.operate(10, 5, addition));
	      System.out.println("10 - 5 = " + tester.operate(10, 5, subtraction));
	      System.out.println("10 x 5 = " + tester.operate(10, 5, multiplication));
	      System.out.println("10 / 5 = " + tester.operate(10, 5, division));
	                
	      // 不用括号
	      GreetingService greetService1 = message ->
	      System.out.println("Hello " + message);
	                
	      // 用括号
	      GreetingService greetService2 = (message) ->
	      System.out.println("Hello " + message);
	                
	      greetService1.sayMessage("Runoob");
	      greetService2.sayMessage("Google");
	   }
	        
	   interface MathOperation {
	      int operation(int a, int b);
	   }
	        
	   interface GreetingService {
	      void sayMessage(String message);
	   }
	        
	   private int operate(int a, int b, MathOperation mathOperation){
	      return mathOperation.operation(a, b);
	   }
	}


# 二、方法引用

```
	package com.runoob.main;

	@FunctionalInterface
	public interface Supplier<T> {
	    T get();
	}

	class Car {
	    //Supplier是jdk1.8的接口，这里和lamda一起使用了
	    public static Car create(final Supplier<Car> supplier) {
	        return supplier.get();
	    }

	    public static void collide(final Car car) {
	        System.out.println("Collided " + car.toString());
	    }

	    public void follow(final Car another) {
	        System.out.println("Following the " + another.toString());
	    }

	    public void repair() {
	        System.out.println("Repaired " + this.toString());
	    }
	}
```

	构造器引用
		final Car car = Car.create( Car::new );
		final List< Car > cars = Arrays.asList( car );

	静态方法引用
		cars.forEach( Car::collide );

	特定类的任意对象的方法引用
		cars.forEach( Car::repair );

	特定对象的方法引用
		final Car police = Car.create( Car::new );
		cars.forEach( police::follow );

# 三、函数式接口
	一个有且仅有一个抽象方法，但是可以有多个非抽象方法的接口。
	可以被隐式转换为 lambda 表达式。

##	方法：
		1	BiConsumer<T,U>
		代表了一个接受两个输入参数的操作，并且不返回任何结果
		2	BiFunction<T,U,R>
		代表了一个接受两个输入参数的方法，并且返回一个结果
		3	BinaryOperator<T>
		代表了一个作用于于两个同类型操作符的操作，并且返回了操作符同类型的结果
		4	BiPredicate<T,U>
		代表了一个两个参数的boolean值方法
		5	BooleanSupplier
		代表了boolean值结果的提供方
		6	Consumer<T>
		代表了接受一个输入参数并且无返回的操作
		7	DoubleBinaryOperator
		代表了作用于两个double值操作符的操作，并且返回了一个double值的结果。
		8	DoubleConsumer
		代表一个接受double值参数的操作，并且不返回结果。
		9	DoubleFunction<R>
		代表接受一个double值参数的方法，并且返回结果
		10	DoublePredicate
		代表一个拥有double值参数的boolean值方法
		11	DoubleSupplier
		代表一个double值结构的提供方
		12	DoubleToIntFunction
		接受一个double类型输入，返回一个int类型结果。
		13	DoubleToLongFunction
		接受一个double类型输入，返回一个long类型结果
		14	DoubleUnaryOperator
		接受一个参数同为类型double,返回值类型也为double 。
		15	Function<T,R>
		接受一个输入参数，返回一个结果。
		16	IntBinaryOperator
		接受两个参数同为类型int,返回值类型也为int 。
		17	IntConsumer
		接受一个int类型的输入参数，无返回值 。
		18	IntFunction<R>
		接受一个int类型输入参数，返回一个结果 。
		19	IntPredicate
		：接受一个int输入参数，返回一个布尔值的结果。
		20	IntSupplier
		无参数，返回一个int类型结果。
		21	IntToDoubleFunction
		接受一个int类型输入，返回一个double类型结果 。
		22	IntToLongFunction
		接受一个int类型输入，返回一个long类型结果。
		23	IntUnaryOperator
		接受一个参数同为类型int,返回值类型也为int 。
		24	LongBinaryOperator
		接受两个参数同为类型long,返回值类型也为long。
		25	LongConsumer
		接受一个long类型的输入参数，无返回值。
		26	LongFunction<R>
		接受一个long类型输入参数，返回一个结果。
		27	LongPredicate
		R接受一个long输入参数，返回一个布尔值类型结果。
		28	LongSupplier
		无参数，返回一个结果long类型的值。
		29	LongToDoubleFunction
		接受一个long类型输入，返回一个double类型结果。
		30	LongToIntFunction
		接受一个long类型输入，返回一个int类型结果。
		31	LongUnaryOperator
		接受一个参数同为类型long,返回值类型也为long。
		32	ObjDoubleConsumer<T>
		接受一个object类型和一个double类型的输入参数，无返回值。
		33	ObjIntConsumer<T>
		接受一个object类型和一个int类型的输入参数，无返回值。
		34	ObjLongConsumer<T>
		接受一个object类型和一个long类型的输入参数，无返回值。
		35	Predicate<T>
		接受一个输入参数，返回一个布尔值结果。
		36	Supplier<T>
		无参数，返回一个结果。
		37	ToDoubleBiFunction<T,U>
		接受两个输入参数，返回一个double类型结果
		38	ToDoubleFunction<T>
		接受一个输入参数，返回一个double类型结果
		39	ToIntBiFunction<T,U>
		接受两个输入参数，返回一个int类型结果。
		40	ToIntFunction<T>
		接受一个输入参数，返回一个int类型结果。
		41	ToLongBiFunction<T,U>
		接受两个输入参数，返回一个long类型结果。
		42	ToLongFunction<T>
		接受一个输入参数，返回一个long类型结果。
		43	UnaryOperator<T>
		接受一个参数为类型T,返回值类型也为T。

```
	import java.util.Arrays;
	import java.util.List;
	import java.util.function.Predicate;

	public class Java8Tester {
	   public static void main(String args[]){
	      List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);
	                
	      // Predicate<Integer> predicate = n -> true
	      // n 是一个参数传递到 Predicate 接口的 test 方法
	      // n 如果存在则 test 方法返回 true
	                
	      System.out.println("输出所有数据:");
	                
	      // 传递参数 n
	      eval(list, n->true);
	                
	      // Predicate<Integer> predicate1 = n -> n%2 == 0
	      // n 是一个参数传递到 Predicate 接口的 test 方法
	      // 如果 n%2 为 0 test 方法返回 true
	                
	      System.out.println("输出所有偶数:");
	      eval(list, n-> n%2 == 0 );
	                
	      // Predicate<Integer> predicate2 = n -> n > 3
	      // n 是一个参数传递到 Predicate 接口的 test 方法
	      // 如果 n 大于 3 test 方法返回 true
	                
	      System.out.println("输出大于 3 的所有数字:");
	      eval(list, n-> n > 3 );
	   }
	        
	   public static void eval(List<Integer> list, Predicate<Integer> predicate) {
	      for(Integer n: list) {
	                
	         if(predicate.test(n)) {
	            System.out.println(n + " ");
	         }
	      }
	   }
	}
```

# 四、默认方法
	默认方法就是接口可以有实现方法，而且不需要实现类去实现其方法。
```
	public interface Vehicle {
	   default void print(){
	      System.out.println("我是一辆车!");
	   }
	   // 静态方法
	   static void blowHorn(){
	      System.out.println("按喇叭!!!");
	   }
	}

	public interface FourWheeler {
	   default void print(){
	      System.out.println("我是一辆四轮车!");
	   }
	}
```

	重写接口的默认方法：
```
		public class Car implements Vehicle, FourWheeler {
		   default void print(){
		      System.out.println("我是一辆四轮汽车!");
		   }
		}
```

	使用 super 来调用指定接口的默认方法
```
		public class Car implements Vehicle, FourWheeler {
		   public void print(){
		      Vehicle.super.print();
		      Vehicle.blowHorn();
		   }
		}
```

# 五、Stream
	Stream（流）是一个来自数据源的元素队列并支持聚合操作
	Stream 使用一种类似用 SQL 语句从数据库查询数据的直观方式来提供一种对 Java 集合运算和表达的高阶抽象。
	这种风格将要处理的元素集合看作一种流， 流在管道中传输， 并且可以在管道的节点上进行处理， 比如筛选， 排序，聚合等。

	List<Integer> transactionsIds = 
	widgets.stream()
		.filter(b -> b.getColor() == RED)
		.sorted((x,y) -> x.getWeight() - y.getWeight())
		.mapToInt(Widget::getWeight)
		.sum();

	filter
		List<String> strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");
		List<String> filtered = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.toList());
		// 获取空字符串的数量
		long count = strings.stream().filter(string -> string.isEmpty()).count();
	forEach
		Random random = new Random();
		random.ints().limit(10).forEach(System.out::println);
	map
		List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);
		// 获取对应的平方数
		List<Integer> squaresList = numbers.stream().map( i -> i*i).distinct().collect(Collectors.toList());
	limit
		Random random = new Random();
		random.ints().limit(10).forEach(System.out::println);
	sorted
		Random random = new Random();
		random.ints().limit(10).sorted().forEach(System.out::println);
	parallel并行程序
		List<String> strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");
		// 获取空字符串的数量
		int count = strings.parallelStream().filter(string -> string.isEmpty()).count();
	Collectors
		Collectors 类实现了很多归约操作，例如将流转换成集合和聚合元素。
		List<String>strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");
		List<String> filtered = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.toList());

		System.out.println("筛选列表: " + filtered);
		String mergedString = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.joining(", "));
		System.out.println("合并字符串: " + mergedString);
	统计
		List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);

		IntSummaryStatistics stats = numbers.stream().mapToInt((x) -> x).summaryStatistics();

		System.out.println("列表中最大的数 : " + stats.getMax());
		System.out.println("列表中最小的数 : " + stats.getMin());
		System.out.println("所有数之和 : " + stats.getSum());
		System.out.println("平均数 : " + stats.getAverage());


# 六、Optional 类
	Optional是一个可以为null的容器对象。如果值存在则isPresent()方法会返回true，调用get()方法会返回该对象。
	Optional 是个容器：它可以保存类型T的值，或者仅仅保存null。Optional提供很多有用的方法，这样我们就不用显式进行空值检测。
	Optional 类的引入很好的解决空指针异常。

	static <T> Optional<T> empty()
		返回空的 Optional 实例。
	boolean equals(Object obj)
		判断其他对象是否等于 Optional。
	Optional<T> filter(Predicate<? super <T> predicate)
		如果值存在，并且这个值匹配给定的 predicate，返回一个Optional用以描述这个值，否则返回一个空的Optional。
	<U> Optional<U> flatMap(Function<? super T,Optional<U>> mapper)
		如果值存在，返回基于Optional包含的映射方法的值，否则返回一个空的Optional
	T get()
		如果在这个Optional中包含这个值，返回值，否则抛出异常：NoSuchElementException
	int hashCode()
		返回存在值的哈希码，如果值不存在 返回 0。
	void ifPresent(Consumer<? super T> consumer)
		如果值存在则使用该值调用 consumer , 否则不做任何事情。
	boolean isPresent()
		如果值存在则方法会返回true，否则返回 false。
	<U>Optional<U> map(Function<? super T,? extends U> mapper)
		如果有值，则对其执行调用映射函数得到返回值。如果返回值不为 null，则创建包含映射返回值的Optional作为map方法返回值，否则返回空Optional。
	static <T> Optional<T> of(T value)
		返回一个指定非null值的Optional。
	static <T> Optional<T> ofNullable(T value)
		如果为非空，返回 Optional 描述的指定值，否则返回空的 Optional。
	T orElse(T other)
		如果存在该值，返回值， 否则返回 other。
	T orElseGet(Supplier<? extends T> other)
		如果存在该值，返回值， 否则触发 other，并返回 other 调用的结果。
	<X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier)
		如果存在该值，返回包含的值，否则抛出由 Supplier 继承的异常
	String toString()
		返回一个Optional的非空字符串，用来调试


	import java.util.Optional;
	public class Java8Tester {
	   public static void main(String args[]){
	   
	      Java8Tester java8Tester = new Java8Tester();
	      Integer value1 = null;
	      Integer value2 = new Integer(10);
	                
	      // Optional.ofNullable - 允许传递为 null 参数
	      Optional<Integer> a = Optional.ofNullable(value1);
	                
	      // Optional.of - 如果传递的参数是 null，抛出异常 NullPointerException
	      Optional<Integer> b = Optional.of(value2);
	      System.out.println(java8Tester.sum(a,b));
	   }
	        
	   public Integer sum(Optional<Integer> a, Optional<Integer> b){
	        
	      // Optional.isPresent - 判断值是否存在
	                
	      System.out.println("第一个参数值存在: " + a.isPresent());
	      System.out.println("第二个参数值存在: " + b.isPresent());
	                
	      // Optional.orElse - 如果值存在，返回它，否则返回默认值
	      Integer value1 = a.orElse(new Integer(0));
	                
	      //Optional.get - 获取值，值需要存在
	      Integer value2 = b.get();
	      return value1 + value2;
	   }
	}
	结果
		第一个参数值存在: false
		第二个参数值存在: true
		10


# 七、Nashorn, JavaScript 引擎
	jjs是个基于Nashorn引擎的命令行工具。
	Java 中调用 JavaScript
		使用 ScriptEngineManager, JavaScript 代码可以在 Java 中执行


		import javax.script.ScriptEngineManager;
		import javax.script.ScriptEngine;
		import javax.script.ScriptException;

		public class Java8Tester {
		   public static void main(String args[]){
		   
		      ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
		      ScriptEngine nashorn = scriptEngineManager.getEngineByName("nashorn");
		                
		      String name = "Runoob";
		      Integer result = null;
		      
		      try {
		         nashorn.eval("print('" + name + "')");
		         result = (Integer) nashorn.eval("10 + 2");
		         
		      }catch(ScriptException e){
		         System.out.println("执行脚本错误: "+ e.getMessage());
		      }
		      
		      System.out.println(result.toString());
		   }
		}

	JavaScript 中调用 Java
		var BigDecimal = Java.type('java.math.BigDecimal');

		function calculate(amount, percentage) {

		   var result = new BigDecimal(amount).multiply(
		   new BigDecimal(percentage)).divide(new BigDecimal("100"), 2, BigDecimal.ROUND_HALF_EVEN);
		   
		   return result.toPlainString();
		}

		var result = calculate(568000000000000000023,13.9);
		print(result);

		$ jjs sample.js
		78952000000000002017.94


# 八、新的日期时间 API

	旧版问题
		非线程安全的，所有的日期类都是可变的
		日期/时间类的定义并不一致
		日期类并不提供国际化，没有时区支持

	新的java.time包涵盖了所有处理日期，时间，日期/时间，时区，时刻（instants），过程（during）与时钟（clock）的操作。
	LocalDate/LocalTime 和 LocalDateTime 类可以在处理时区不是必须的情况。

		import java.time.LocalDate;
		import java.time.LocalTime;
		import java.time.LocalDateTime;
		import java.time.Month;

		public class Java8Tester {
		   public static void main(String args[]){
		      Java8Tester java8tester = new Java8Tester();
		      java8tester.testLocalDateTime();
		   }
		        
		   public void testLocalDateTime(){
		        
		      // 获取当前的日期时间
		      LocalDateTime currentTime = LocalDateTime.now();
		      System.out.println("当前时间: " + currentTime);
		                
		      LocalDate date1 = currentTime.toLocalDate();
		      System.out.println("date1: " + date1);
		                
		      Month month = currentTime.getMonth();
		      int day = currentTime.getDayOfMonth();
		      int seconds = currentTime.getSecond();
		                
		      System.out.println("月: " + month +", 日: " + day +", 秒: " + seconds);
		                
		      LocalDateTime date2 = currentTime.withDayOfMonth(10).withYear(2012);
		      System.out.println("date2: " + date2);
		                
		      // 12 december 2014
		      LocalDate date3 = LocalDate.of(2014, Month.DECEMBER, 12);
		      System.out.println("date3: " + date3);
		                
		      // 22 小时 15 分钟
		      LocalTime date4 = LocalTime.of(22, 15);
		      System.out.println("date4: " + date4);
		                
		      // 解析字符串
		      LocalTime date5 = LocalTime.parse("20:15:30");
		      System.out.println("date5: " + date5);
		   }
		}

	结果
		当前时间: 2016-04-15T16:55:48.668
		date1: 2016-04-15
		月: APRIL, 日: 15, 秒: 48
		date2: 2012-04-10T16:55:48.668
		date3: 2014-12-12
		date4: 22:15
		date5: 20:15:30

	使用时区的日期时间API
		import java.time.ZonedDateTime;
		import java.time.ZoneId;

		public class Java8Tester {
		   public static void main(String args[]){
		      Java8Tester java8tester = new Java8Tester();
		      java8tester.testZonedDateTime();
		   }
		        
		   public void testZonedDateTime(){
		        
		      // 获取当前时间日期
		      ZonedDateTime date1 = ZonedDateTime.parse("2015-12-03T10:15:30+05:30[Asia/Shanghai]");
		      System.out.println("date1: " + date1);
		                
		      ZoneId id = ZoneId.of("Europe/Paris");
		      System.out.println("ZoneId: " + id);
		                
		      ZoneId currentZone = ZoneId.systemDefault();
		      System.out.println("当期时区: " + currentZone);
		   }
		}
	结果
		date1: 2015-12-03T10:15:30+08:00[Asia/Shanghai]
		ZoneId: Europe/Paris
		当期时区: Asia/Shanghai


# 九、Base64

	Base64编码已经成为Java类库的标准。

	static class Base64.Decoder
		该类实现一个解码器用于，使用 Base64 编码来解码字节数据。
	static class Base64.Encoder
		该类实现一个编码器，使用 Base64 编码来编码字节数据。
	static Base64.Decoder getDecoder()
		返回一个 Base64.Decoder ，解码使用基本型 base64 编码方案。
	static Base64.Encoder getEncoder()
		返回一个 Base64.Encoder ，编码使用基本型 base64 编码方案。
	static Base64.Decoder getMimeDecoder()
		返回一个 Base64.Decoder ，解码使用 MIME 型 base64 编码方案。
	static Base64.Encoder getMimeEncoder()
		返回一个 Base64.Encoder ，编码使用 MIME 型 base64 编码方案。
	static Base64.Encoder getMimeEncoder(int lineLength, byte[] lineSeparator)
		返回一个 Base64.Encoder ，编码使用 MIME 型 base64 编码方案，可以通过参数指定每行的长度及行的分隔符。
	static Base64.Decoder getUrlDecoder()
		返回一个 Base64.Decoder ，解码使用 URL 和文件名安全型 base64 编码方案。
	static Base64.Encoder getUrlEncoder()
		返回一个 Base64.Encoder ，编码使用 URL 和文件名安全型 base64 编码方案。


		import java.util.Base64;
		import java.util.UUID;
		import java.io.UnsupportedEncodingException;

		public class Java8Tester {
		   public static void main(String args[]){
		      try {
		                
		         // 使用基本编码
		         String base64encodedString = Base64.getEncoder().encodeToString("runoob?java8".getBytes("utf-8"));
		         System.out.println("Base64 编码字符串 (基本) :" + base64encodedString);
		                
		         // 解码
		         byte[] base64decodedBytes = Base64.getDecoder().decode(base64encodedString);
		                
		         System.out.println("原始字符串: " + new String(base64decodedBytes, "utf-8"));
		         base64encodedString = Base64.getUrlEncoder().encodeToString("runoob?java8".getBytes("utf-8"));
		         System.out.println("Base64 编码字符串 (URL) :" + base64encodedString);
		                
		         StringBuilder stringBuilder = new StringBuilder();
		                
		         for (int i = 0; i < 10; ++i) {
		            stringBuilder.append(UUID.randomUUID().toString());
		         }
		                
		         byte[] mimeBytes = stringBuilder.toString().getBytes("utf-8");
		         String mimeEncodedString = Base64.getMimeEncoder().encodeToString(mimeBytes);
		         System.out.println("Base64 编码字符串 (MIME) :" + mimeEncodedString);
		         
		      }catch(UnsupportedEncodingException e){
		         System.out.println("Error :" + e.getMessage());
		      }
		   }
		}

	结果
		原始字符串: runoob?java8
		Base64 编码字符串 (URL) :VHV0b3JpYWxzUG9pbnQ_amF2YTg=
		Base64 编码字符串 (MIME) :M2Q4YmUxMTEtYWRkZi00NzBlLTgyZDgtN2MwNjgzOGY2NGFlOTQ3NDYyMWEtZDM4ZS00YWVhLTkz
		OTYtY2ZjMzZiMzFhNmZmOGJmOGI2OTYtMzkxZi00OTJiLWEyMTQtMjgwN2RjOGI0MTBmZWUwMGNk
		NTktY2ZiZS00MTMxLTgzODctNDRjMjFkYmZmNGM4Njg1NDc3OGItNzNlMC00ZWM4LTgxNzAtNjY3
		NTgyMGY3YzVhZWQyMmNiZGItOTIwZi00NGUzLTlkMjAtOTkzZTI1MjUwMDU5ZjdkYjg2M2UtZTJm
		YS00Y2Y2LWIwNDYtNWQ2MGRiOWQyZjFiMzJhMzYxOWQtNDE0ZS00MmRiLTk3NDgtNmM4NTczYjMx
		ZDIzNGRhOWU4NDAtNTBiMi00ZmE2LWE0M2ItZjU3MWFiNTI2NmQ2NTlmMTFmZjctYjg1NC00NmE1
		LWEzMWItYjk3MmEwZTYyNTdk