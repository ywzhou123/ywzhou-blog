# 1	模块系统
	模块是一个包的容器，引入了模块系统（Jigsaw 项目）。
	模块就是代码和数据的封装体。模块的代码被组织成多个包，每个包中包含Java类和接口；模块的数据则包括资源文件和其他静态信息。

	创建模块 com.runoob.greetings
		C:\>JAVA\src\com.runoob.greetings\module-info.java 

		module com.runoob.greetings { }

		C:\>JAVA\src\com.runoob.greetings\com\runoob\greetings\Java9Tester.java

		package com.runoob.greetings;
		public class Java9Tester {
		   public static void main(String[] args) {
		      System.out.println("Hello World!");
		   }
		}
	编译模块到这个目录下
		C:\>JAVA\mods\com.runoob.greetings
		C:/>JAVA> javac -d mods/com.runoob.greetings 

	执行模块
		C:/>JAVA> java --module-path mods -m com.runoob.greetings/com.runoob.greetings.Java9Tester

# 2	REPL (JShell)
	交互式编程环境。
	$ jshell
	jshell> /help
	jshell> /imports
	jshell> /exit



# 3	改进的 Javadoc
	Javadoc 现在支持在 API 文档中的进行搜索。另外，Javadoc 的输出现在符合兼容 HTML5 标准。



# 4	多版本兼容 JAR 包
	多版本兼容 JAR 功能能让你创建仅在特定版本的 Java 环境中运行库程序时选择使用的 class 版本。
	META-INF 目录下 MANIFEST.MF 文件新增了一个属性：
	 	Multi-Release: true
	还新增了一个 versions 目录，如果是要支持 java9，则在 versions 目录下有 9 的目录。
		multirelease.jar
		├── META-INF
		│   └── versions
		│       └── 9
		│           └── multirelease
		│               └── Helper.class
		├── multirelease
		    ├── Helper.class
		    └── Main.class

	编译源代码时使用 --release指定版本：
		C:\test > javac --release 9 java9/com/runoob/Tester.java
	创建多版本兼容 jar 包
		C:\JAVA > jar -c -f test.jar -C java7 . --release 9 -C java9.


# 5	集合工厂方法
	List，Set 和 Map 接口中，新的静态工厂方法可以创建这些集合的不可变实例。

	新方法创建集合
		Map 接口如果超过 10 个参数, 可以使用 ofEntries(...) 方法。
		static <E> List<E> of(E e1, E e2, E e3);
		static <E> Set<E>  of(E e1, E e2, E e3);
		static <K,V> Map<K,V> of(K k1, V v1, K k2, V v2, K k3, V v3);
		static <K,V> Map<K,V> ofEntries(Map.Entry<? extends K,? extends V>... entries)

		import java.util.ArrayList;
		import java.util.Collections;
		import java.util.HashMap;
		import java.util.HashSet;
		import java.util.List;
		import java.util.AbstractMap;
		import java.util.Map;
		import java.util.Set;

		public class Tester {

		   public static void main(String []args) {
		      Set<String> set = Set.of("A", "B", "C");      
		      System.out.println(set);
		      List<String> list = List.of("A", "B", "C");
		      System.out.println(list);
		      Map<String, String> map = Map.of("A","Apple","B","Boy","C","Cat");
		      System.out.println(map);
		  
		      Map<String, String> map1 = Map.ofEntries (
		         new AbstractMap.SimpleEntry<>("A","Apple"),
		         new AbstractMap.SimpleEntry<>("B","Boy"),
		         new AbstractMap.SimpleEntry<>("C","Cat"));
		      System.out.println(map1);
		   }
		}
		结果
			[A, B, C]
			[A, B, C]
			{A=Apple, B=Boy, C=Cat}
			{A=Apple, B=Boy, C=Cat}

# 6	私有接口方法
	在接口中使用private私有方法。我们可以使用 private 访问修饰符在接口中编写私有方法。


# 7	进程 API
	改进的 API 来控制和管理操作系统进程。
	 添加了一个名为 ProcessHandle 的接口来增强 java.lang.Process 类。

	import java.time.ZoneId;
	import java.util.stream.Stream;
	import java.util.stream.Collectors;
	import java.io.IOException;

	public class Tester {
	   public static void main(String[] args) throws IOException {
	      ProcessBuilder pb = new ProcessBuilder("notepad.exe");
	      String np = "Not Present";
	      Process p = pb.start();
	      ProcessHandle.Info info = p.info();
	      System.out.printf("Process ID : %s%n", p.pid());
	      System.out.printf("Command name : %s%n", info.command().orElse(np));
	      System.out.printf("Command line : %s%n", info.commandLine().orElse(np));

	      System.out.printf("Start time: %s%n",
	         info.startInstant().map(i -> i.atZone(ZoneId.systemDefault())
	         .toLocalDateTime().toString()).orElse(np));

	      System.out.printf("Arguments : %s%n",
	         info.arguments().map(a -> Stream.of(a).collect(
	         Collectors.joining(" "))).orElse(np));

	      System.out.printf("User : %s%n", info.user().orElse(np));
	   } 
	}


# 8	Stream API
	改进的 Stream API 添加了一些便利的方法，使流处理更容易，并使用收集器编写复杂的查询。

	takeWhile 方法
		使用一个断言作为参数，返回给定 Stream 的子集直到断言语句第一次返回 false。

		import java.util.stream.Stream;
		public class Tester {
		   public static void main(String[] args) {
		      Stream.of("a","b","c","","e","f").takeWhile(s->!s.isEmpty())
		         .forEach(System.out::print);      
		   } 
		}
		结果
			abc

	dropWhile 方法
		和 takeWhile 作用相反的

		import java.util.stream.Stream;
		public class Tester {
		   public static void main(String[] args) {
		      Stream.of("a","b","c","","e","f").dropWhile(s-> !s.isEmpty())
		         .forEach(System.out::print);
		   } 
		}
		结果
			ef

	iterate 方法
		许使用初始种子值创建顺序（可能是无限）流，并迭代应用指定的下一个方法
		当指定的 hasNext 的 predicate 返回 false 时，迭代停止

		import java.util.stream.IntStream;
		public class Tester {
		   public static void main(String[] args) {
		      IntStream.iterate(3, x -> x < 10, x -> x + 3).forEach(System.out::println);
		   } 
		}
		结果
			3
			6
			9	

	ofNullable 方法
		以预防 NullPointerExceptions 异常， 可以通过检查流来避免 null 值。
		如果指定元素为非 null，则获取一个元素并生成单个元素流，元素为 null 则返回一个空流。

		import java.util.stream.Stream;
		public class Tester {
		   public static void main(String[] args) {
		      long count = Stream.ofNullable(100).count();
		      System.out.println(count);
		  
		      count = Stream.ofNullable(null).count();
		      System.out.println(count);
		   } 
		}
		结果
			1
			0


# 9	try-with-resources
	如果你已经有一个资源是 final 或等效于 final 变量,您可以在 try-with-resources 语句中使用该变量，而无需在 try-with-resources 语句中声明一个新变量。

	import java.io.BufferedReader;
	import java.io.IOException;
	import java.io.Reader;
	import java.io.StringReader;

	public class Tester {
	   public static void main(String[] args) throws IOException {
	      System.out.println(readData("test"));
	   } 
	   static String readData(String message) throws IOException {
	      Reader inputString = new StringReader(message);
	      BufferedReader br = new BufferedReader(inputString);
	      try (BufferedReader br1 = br) { 
	         return br1.readLine();
	      }
	   }
	}
	之前声明资源 br1，然后才能使用它
	在 Java 9 中，我们不需要声明资源 br1 就可以使用它，并得到相同的结果。
		try (br) {
	        return br.readLine();
	    }

# 10	@Deprecated
	表示被标记的 API 将会被移除，或者已经破坏。

# 11	内部类的钻石操作符(Diamond Operator) <>
	在 java 9 中， 它可以与匿名的内部类一起使用，从而提高代码的可读性。

	public class Tester {
	   public static void main(String[] args) {
	      Handler<Integer> intHandler = new Handler<>(1) {
	         @Override
	         public void handle() {
	            System.out.println(content);
	         }
	      };
	      intHandler.handle();
	      Handler<? extends Number> intHandler1 = new Handler<>(2) {
	         @Override
	         public void handle() {
	            System.out.println(content);
	         }
	      };
	      intHandler1.handle();
	      Handler<?> handler = new Handler<>("test") {
	         @Override
	         public void handle() {
	            System.out.println(content);
	         }
	      };

	      handler.handle();    
	   }  
	}

	abstract class Handler<T> {
	   public T content;

	   public Handler(T content) {
	      this.content = content; 
	   }
	   
	   abstract void handle();
	}

# 12	Optional 类
	添加了很多新的有用方法，Optional 可以直接转为 stream。

	stream() 方法
		将 Optional 转为一个 Stream，如果该 Optional 中包含值，那么就返回包含这个值的 Stream，否则返回一个空的 Stream（Stream.empty()）。

		import java.util.Arrays;
		import java.util.List;
		import java.util.Optional;
		import java.util.stream.Collectors;
		import java.util.stream.Stream;

		public class Tester {
		public static void main(String[] args) {
		   List<Optional<String>> list = Arrays.asList (
		      Optional.empty(), 
		      Optional.of("A"), 
		      Optional.empty(), 
		      Optional.of("B"));

		      //filter the list based to print non-empty values
		  
		      //if optional is non-empty, get the value in stream, otherwise return empty
		      List<String> filteredList = list.stream()
		         .flatMap(o -> o.isPresent() ? Stream.of(o.get()) : Stream.empty())
		         .collect(Collectors.toList());

		      //Optional::stream method will return a stream of either one 
		      //or zero element if data is present or not.
		      List<String> filteredListJava9 = list.stream()
		         .flatMap(Optional::stream)
		         .collect(Collectors.toList());

		      System.out.println(filteredList);
		      System.out.println(filteredListJava9);
		   }  
		}
		结果
			[A, B]
			[A, B]

	ifPresentOrElse() 方法
		改进就是有了 else，接受两个参数 Consumer 和 Runnable。
		如果一个 Optional 包含值，则对其包含的值调用函数 action，即 action.accept(value)

		import java.util.Optional;
		public class Tester {
		   public static void main(String[] args) {
		      Optional<Integer> optional = Optional.of(1);

		      optional.ifPresentOrElse( x -> System.out.println("Value: " + x),() -> 
		         System.out.println("Not Present."));

		      optional = Optional.empty();

		      optional.ifPresentOrElse( x -> System.out.println("Value: " + x),() -> 
		         System.out.println("Not Present."));
		   }  
		}
		结果
			Value: 1
			Not Present.

	or() 方法
		如果值存在，返回 Optional 指定的值，否则返回一个预设的值。

		import java.util.Optional;
		import java.util.function.Supplier;

		public class Tester {
		   public static void main(String[] args) {
		      Optional<String> optional1 = Optional.of("Mahesh");
		      Supplier<Optional<String>> supplierString = () -> Optional.of("Not Present");
		      optional1 = optional1.or( supplierString);
		      optional1.ifPresent( x -> System.out.println("Value: " + x));
		      optional1 = Optional.empty();    
		      optional1 = optional1.or( supplierString);
		      optional1.ifPresent( x -> System.out.println("Value: " + x));  
		   }  
		}
		结果
			Value: Mahesh
			Value: Not Present

# 13	多分辨率图像 API
	定义多分辨率图像API，开发者可以很容易的操作和展示不同分辨率的图像了。

	Image getResolutionVariant(double destImageWidth, double destImageHeight) 
		获取特定分辨率的图像变体-表示一张已知分辨率单位为DPI的特定尺寸大小的逻辑图像，并且这张图像是最佳的变体。。


	List<Image> getResolutionVariants() 
		返回可读的分辨率的图像变体列表。

		import java.io.IOException;
		import java.net.URL;
		import java.net.MalformedURLException;
		import java.util.ArrayList;
		import java.util.List;
		import java.awt.Image;
		import java.awt.image.MultiResolutionImage;
		import java.awt.image.BaseMultiResolutionImage;

		import javax.imageio.ImageIO;

		public class Tester {
		   public static void main(String[] args) throws IOException, MalformedURLException {

		      List<String> imgUrls = List.of("http://www.runoob.com/wp-content/themes/runoob/assets/img/runoob-logo@2x.png",
		         "http://www.runoob.com/wp-content/themes/runoob/assets/img/runoob-logo.png",
		         "http://www.runoob.com/wp-content/themes/runoob/assets/images/qrcode.png");

		      List<Image> images = new ArrayList<Image>();

		      for (String url : imgUrls) {
		         images.add(ImageIO.read(new URL(url)));
		      }

		      // 读取所有图片
		      MultiResolutionImage multiResolutionImage = 
		         new BaseMultiResolutionImage(images.toArray(new Image[0]));

		      // 获取图片的所有分辨率
		      List<Image> variants = multiResolutionImage.getResolutionVariants();

		      System.out.println("Total number of images: " + variants.size());

		      for (Image img : variants) {
		         System.out.println(img);
		      }

		      // 根据不同尺寸获取对应的图像分辨率
		      Image variant1 = multiResolutionImage.getResolutionVariant(156, 45);
		      System.out.printf("\nImage for destination[%d,%d]: [%d,%d]", 
		         156, 45, variant1.getWidth(null), variant1.getHeight(null));

		      Image variant2 = multiResolutionImage.getResolutionVariant(311, 89);
		      System.out.printf("\nImage for destination[%d,%d]: [%d,%d]", 311, 89, 
		         variant2.getWidth(null), variant2.getHeight(null));

		      Image variant3 = multiResolutionImage.getResolutionVariant(622, 178);
		      System.out.printf("\nImage for destination[%d,%d]: [%d,%d]", 622, 178, 
		         variant3.getWidth(null), variant3.getHeight(null));

		      Image variant4 = multiResolutionImage.getResolutionVariant(300, 300);
		      System.out.printf("\nImage for destination[%d,%d]: [%d,%d]", 300, 300, 
		         variant4.getWidth(null), variant4.getHeight(null));
		   }  
		}

		
# 14	CompletableFuture API
	异步机制可以在 ProcessHandle.onExit 方法退出时执行操作。


JSON API
	内置了一个轻量级的JSON API

响应式流（Reactive Streams) API
	引入了新的响应式流 API 来支持 Java 9 中的响应式编程。