---
layout: post
title: "Java 完全指南：从入门到精通实战"
date: 2025-01-07 20:00:00 +0800
category: Dev
tags: [Java, JVM, Spring, 企业开发, 后端开发, 微服务]
author: Kk
excerpt: "全面掌握Java编程语言，从基础语法到企业级开发，包含Spring生态和微服务实战"
diagram: |
  graph TB
      subgraph "Java生态系统"
          subgraph "核心语言 Core Language"
              JVM[Java虚拟机]
              SYNTAX[语法特性]
              OOP[面向对象]
              COLLECTIONS[集合框架]
              GENERICS[泛型系统]
              REFLECTION[反射机制]
              ANNOTATIONS[注解系统]
          end

          subgraph "标准库 Standard Library"
              JDK[JDK标准库]
              IO[IO操作]
              NIO[NIO框架]
              CONCURRENCY[并发包]
              NETWORKING[网络编程]
              SECURITY[安全框架]
              DATETIME[日期时间]
          end

          subgraph "构建工具 Build Tools"
              MAVEN[Maven]
              GRADLE[Gradle]
              ANT[Apache Ant]
              SBT[SBT]
          end

          subgraph "Spring生态 Spring Ecosystem"
              SPRING_CORE[Spring Core]
              SPRING_BOOT[Spring Boot]
              SPRING_MVC[Spring MVC]
              SPRING_DATA[Spring Data]
              SPRING_SECURITY[Spring Security]
              SPRING_CLOUD[Spring Cloud]
          end

          subgraph "数据访问 Data Access"
              JDBC[JDBC]
              JPA[JPA/Hibernate]
              MYBATIS[MyBatis]
              REDIS_CLIENT[Redis客户端]
              MONGODB[MongoDB驱动]
          end

          subgraph "Web框架 Web Frameworks"
              SERVLET[Servlet API]
              JSP[JSP]
              STRUTS[Struts]
              PLAY[Play Framework]
              VERTX[Vert.x]
          end

          subgraph "测试框架 Testing"
              JUNIT[JUnit]
              TESTNG[TestNG]
              MOCKITO[Mockito]
              SPRING_TEST[Spring Test]
              TESTCONTAINERS[Testcontainers]
          end

          subgraph "微服务 Microservices"
              EUREKA[服务发现]
              ZUUL[API网关]
              HYSTRIX[熔断器]
              FEIGN[服务调用]
              CONFIG_SERVER[配置中心]
          end
      end

      JVM --> SYNTAX
      JVM --> OOP
      JVM --> COLLECTIONS
      JVM --> GENERICS
      JVM --> JDK

      JDK --> IO
      JDK --> CONCURRENCY
      JDK --> NETWORKING

      MAVEN --> SPRING_BOOT
      GRADLE --> SPRING_BOOT
      SPRING_CORE --> SPRING_BOOT
      SPRING_BOOT --> SPRING_MVC
      SPRING_BOOT --> SPRING_DATA
      SPRING_BOOT --> SPRING_SECURITY

      SPRING_DATA --> JPA
      SPRING_DATA --> MYBATIS
      SPRING_MVC --> SERVLET

      JUNIT --> MOCKITO
      JUNIT --> SPRING_TEST
      SPRING_TEST --> TESTCONTAINERS

      SPRING_CLOUD --> EUREKA
      SPRING_CLOUD --> ZUUL
      SPRING_CLOUD --> HYSTRIX
      SPRING_CLOUD --> FEIGN

      style JVM fill:#ed8936,stroke:#fff,stroke-width:2px,color:#fff
      style SPRING_BOOT fill:#6cb52d,stroke:#fff,stroke-width:2px,color:#fff
      style SPRING_CLOUD fill:#34d399,stroke:#fff,stroke-width:2px,color:#fff
      style JPA fill:#3182ce,stroke:#fff,stroke-width:2px,color:#fff
      style MAVEN fill:#c53030,stroke:#fff,stroke-width:2px,color:#fff
      style JUNIT fill:#38a169,stroke:#fff,stroke-width:2px,color:#fff
      style MICROSERVICES fill:#805ad5,stroke:#fff,stroke-width:2px,color:#fff
---

# Java 完全指南：从入门到精通实战

## 🚀 Java 简介

Java 是一门面向对象的编程语言，由 Sun Microsystems（现 Oracle）开发。Java 以"一次编写，到处运行"（Write Once, Run Anywhere）的理念著称，通过 Java 虚拟机（JVM）实现跨平台特性。Java 广泛应用于企业级开发、Android 应用、大数据处理和云计算等领域。

### 核心特点

- **🔒 平台无关性**: 通过 JVM 实现跨平台运行
- **🛡️ 面向对象**: 完全的面向对象编程语言
- **🔐 安全性**: 内置安全机制和沙箱模型
- **🚀 高性能**: JIT 编译器优化执行效率
- **🔄 自动内存管理**: 垃圾回收机制自动管理内存
- **📚 丰富的生态**: 庞大的第三方库和框架生态

## 📦 环境搭建

### JDK 安装

#### Windows 安装

```bash
# 下载 Oracle JDK 或 OpenJDK
# https://www.oracle.com/java/technologies/downloads/
# https://adoptium.net/

# 使用 Chocolatey 安装
choco install openjdk

# 使用 Scoop 安装
scoop install openjdk

# 配置环境变量
setx JAVA_HOME "C:\Program Files\Java\jdk-17"
setx PATH "%PATH%;%JAVA_HOME%\bin"
```

#### macOS 安装

```bash
# 使用 Homebrew 安装
brew install openjdk@17

# 或安装 Oracle JDK
brew install --cask oracle-jdk

# 配置环境变量
echo 'export JAVA_HOME=$(/usr/libexec/java_home)' >> ~/.zshrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

#### Linux 安装

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk

# CentOS/RHEL
sudo yum install java-17-openjdk-devel

# 或下载并手动安装
wget https://download.java.net/java/GA/jdk17/0d483333a00540d886896bac774ff48b/35/GPL/openjdk-17_linux-x64_bin.tar.gz
sudo tar -xzf openjdk-17_linux-x64_bin.tar.gz -C /opt/
sudo ln -s /opt/jdk-17 /opt/java

# 配置环境变量
echo 'export JAVA_HOME=/opt/java' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### 验证安装

```bash
# 检查 Java 版本
java -version

# 检查编译器版本
javac -version

# 查看 Java 环境信息
java -XshowSettings:properties -version
```

### IDE 选择

```bash
# IntelliJ IDEA (推荐)
# https://www.jetbrains.com/idea/

# Eclipse
# https://www.eclipse.org/downloads/

# Visual Studio Code + Java Extension Pack
# https://code.visualstudio.com/
# 安装 Extension Pack for Java

# NetBeans
# https://netbeans.apache.org/
```

## 🎯 基础语法

### 1. Hello World

```java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```bash
# 编译和运行
javac HelloWorld.java
java HelloWorld

# 或使用 Java 11+ 的单文件运行
java HelloWorld.java
```

### 2. 变量和数据类型

```java
public class DataTypes {
    public static void main(String[] args) {
        // 基本数据类型
        
        // 整数类型
        byte b = 127;                    // 8位，-128 到 127
        short s = 32767;                 // 16位，-32768 到 32767
        int i = 2147483647;              // 32位，-2^31 到 2^31-1
        long l = 9223372036854775807L;   // 64位，-2^63 到 2^63-1
        
        // 浮点类型
        float f = 3.14f;                 // 32位单精度
        double d = 3.141592653589793;    // 64位双精度
        
        // 字符类型
        char c = 'A';                    // 16位 Unicode 字符
        char unicode = '\u0041';         // Unicode 表示法
        
        // 布尔类型
        boolean flag = true;             // true 或 false
        
        // 引用数据类型
        String str = "Hello, Java!";     // 字符串
        String nullStr = null;           // 空引用
        
        // 数组
        int[] numbers = {1, 2, 3, 4, 5};
        String[] names = new String[3];
        
        // 常量
        final int CONSTANT = 100;
        final double PI = 3.14159;
        
        // 输出
        System.out.println("Integer: " + i);
        System.out.println("Double: " + d);
        System.out.println("Character: " + c);
        System.out.println("Boolean: " + flag);
        System.out.println("String: " + str);
        System.out.println("Array length: " + numbers.length);
        
        // 类型转换
        int intValue = 100;
        long longValue = intValue;        // 自动类型提升
        int backToInt = (int) longValue;  // 强制类型转换
        
        String numberStr = "123";
        int parsedInt = Integer.parseInt(numberStr);
        double parsedDouble = Double.parseDouble("3.14");
        
        System.out.println("Parsed int: " + parsedInt);
        System.out.println("Parsed double: " + parsedDouble);
    }
}
```

### 3. 运算符

```java
public class Operators {
    public static void main(String[] args) {
        int a = 10, b = 3;
        
        // 算术运算符
        System.out.println("=== 算术运算符 ===");
        System.out.println("a + b = " + (a + b));  // 加法
        System.out.println("a - b = " + (a - b));  // 减法
        System.out.println("a * b = " + (a * b));  // 乘法
        System.out.println("a / b = " + (a / b));  // 除法
        System.out.println("a % b = " + (a % b));  // 取模
        
        // 自增自减运算符
        System.out.println("\n=== 自增自减运算符 ===");
        int x = 5;
        System.out.println("x = " + x);
        System.out.println("++x = " + (++x));  // 前置自增
        System.out.println("x++ = " + (x++));  // 后置自增
        System.out.println("x = " + x);
        
        // 关系运算符
        System.out.println("\n=== 关系运算符 ===");
        System.out.println("a > b: " + (a > b));
        System.out.println("a < b: " + (a < b));
        System.out.println("a >= b: " + (a >= b));
        System.out.println("a <= b: " + (a <= b));
        System.out.println("a == b: " + (a == b));
        System.out.println("a != b: " + (a != b));
        
        // 逻辑运算符
        System.out.println("\n=== 逻辑运算符 ===");
        boolean p = true, q = false;
        System.out.println("p && q: " + (p && q));  // 逻辑与
        System.out.println("p || q: " + (p || q));  // 逻辑或
        System.out.println("!p: " + (!p));          // 逻辑非
        
        // 位运算符
        System.out.println("\n=== 位运算符 ===");
        int m = 12, n = 10;  // 12 = 1100, 10 = 1010
        System.out.println("m & n: " + (m & n));   // 按位与: 1000 = 8
        System.out.println("m | n: " + (m | n));   // 按位或: 1110 = 14
        System.out.println("m ^ n: " + (m ^ n));   // 按位异或: 0110 = 6
        System.out.println("~m: " + (~m));         // 按位取反
        System.out.println("m << 1: " + (m << 1)); // 左移: 11000 = 24
        System.out.println("m >> 1: " + (m >> 1)); // 右移: 110 = 6
        
        // 赋值运算符
        System.out.println("\n=== 赋值运算符 ===");
        int y = 10;
        y += 5;  // y = y + 5
        System.out.println("y += 5: " + y);
        y -= 3;  // y = y - 3
        System.out.println("y -= 3: " + y);
        y *= 2;  // y = y * 2
        System.out.println("y *= 2: " + y);
        y /= 4;  // y = y / 4
        System.out.println("y /= 4: " + y);
        
        // 三元运算符
        System.out.println("\n=== 三元运算符 ===");
        int max = (a > b) ? a : b;
        System.out.println("Max of " + a + " and " + b + " is: " + max);
        
        String result = (a % 2 == 0) ? "偶数" : "奇数";
        System.out.println(a + " 是 " + result);
    }
}
```

## 🔧 控制结构

### 1. 条件语句

```java
public class ConditionalStatements {
    public static void main(String[] args) {
        int score = 85;
        
        // if-else 语句
        System.out.println("=== if-else 语句 ===");
        if (score >= 90) {
            System.out.println("等级: A");
        } else if (score >= 80) {
            System.out.println("等级: B");
        } else if (score >= 70) {
            System.out.println("等级: C");
        } else if (score >= 60) {
            System.out.println("等级: D");
        } else {
            System.out.println("等级: F");
        }
        
        // switch 语句
        System.out.println("\n=== switch 语句 ===");
        String day = "Monday";
        switch (day) {
            case "Monday":
                System.out.println("工作周开始");
                break;
            case "Tuesday":
            case "Wednesday":
            case "Thursday":
                System.out.println("工作日");
                break;
            case "Friday":
                System.out.println("感谢上帝今天是星期五！");
                break;
            case "Saturday":
            case "Sunday":
                System.out.println("周末！");
                break;
            default:
                System.out.println("无效的日期");
        }
        
        // Java 14+ 的 switch 表达式
        System.out.println("\n=== switch 表达式 (Java 14+) ===");
        String dayType = switch (day) {
            case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" -> "工作日";
            case "Saturday", "Sunday" -> "周末";
            default -> "无效日期";
        };
        System.out.println(day + " 是 " + dayType);
        
        // 嵌套条件
        System.out.println("\n=== 嵌套条件 ===");
        int age = 25;
        boolean hasLicense = true;
        
        if (age >= 18) {
            if (hasLicense) {
                System.out.println("可以开车");
            } else {
                System.out.println("需要先获得驾照");
            }
        } else {
            System.out.println("年龄不够，不能开车");
        }
        
        // 条件运算符
        System.out.println("\n=== 条件运算符 ===");
        String ageGroup = (age < 18) ? "未成年" : (age < 60) ? "成年" : "老年";
        System.out.println("年龄组: " + ageGroup);
    }
}
```

### 2. 循环语句

```java
public class LoopStatements {
    public static void main(String[] args) {
        // for 循环
        System.out.println("=== for 循环 ===");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        // 增强型 for 循环 (for-each)
        System.out.println("\n=== 增强型 for 循环 ===");
        int[] numbers = {10, 20, 30, 40, 50};
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        // while 循环
        System.out.println("\n=== while 循环 ===");
        int count = 1;
        while (count <= 5) {
            System.out.print(count + " ");
            count++;
        }
        System.out.println();
        
        // do-while 循环
        System.out.println("\n=== do-while 循环 ===");
        int num = 1;
        do {
            System.out.print(num + " ");
            num++;
        } while (num <= 5);
        System.out.println();
        
        // 嵌套循环
        System.out.println("\n=== 嵌套循环 ===");
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                System.out.print("(" + i + "," + j + ") ");
            }
            System.out.println();
        }
        
        // break 和 continue
        System.out.println("\n=== break 和 continue ===");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                continue; // 跳过 5
            }
            if (i == 8) {
                break; // 在 8 处停止
            }
            System.out.print(i + " ");
        }
        System.out.println();
        
        // 标签和 break
        System.out.println("\n=== 标签和 break ===");
        outer: for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i == 2 && j == 2) {
                    break outer; // 跳出外层循环
                }
                System.out.print("(" + i + "," + j + ") ");
            }
        }
        System.out.println();
        
        // 无限循环示例（注释掉以避免程序卡住）
        /*
        System.out.println("\n=== 无限循环示例 ===");
        while (true) {
            // 一些条件下 break
            if (someCondition) {
                break;
            }
        }
        */
    }
}
```

## 📁 面向对象编程

### 1. 类和对象

```java
// Person.java
public class Person {
    // 实例变量（属性）
    private String name;
    private int age;
    private String email;
    
    // 静态变量（类变量）
    private static int personCount = 0;
    
    // 常量
    public static final String SPECIES = "Homo sapiens";
    
    // 默认构造器
    public Person() {
        this("Unknown", 0, "");
    }
    
    // 带参数的构造器
    public Person(String name, int age) {
        this(name, age, "");
    }
    
    // 完整构造器
    public Person(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
        personCount++;
    }
    
    // Getter 方法
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    public String getEmail() {
        return email;
    }
    
    // Setter 方法
    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        }
    }
    
    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        }
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    // 实例方法
    public void introduce() {
        System.out.println("你好，我是 " + name + "，今年 " + age + " 岁。");
    }
    
    public boolean isAdult() {
        return age >= 18;
    }
    
    public void celebrateBirthday() {
        age++;
        System.out.println("生日快乐！" + name + " 现在 " + age + " 岁了。");
    }
    
    // 静态方法
    public static int getPersonCount() {
        return personCount;
    }
    
    public static void printSpecies() {
        System.out.println("我们都是 " + SPECIES);
    }
    
    // 重写 toString 方法
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + ", email='" + email + "'}";
    }
    
    // 重写 equals 方法
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        
        Person person = (Person) obj;
        return age == person.age &&
               name.equals(person.name) &&
               email.equals(person.email);
    }
    
    // 重写 hashCode 方法
    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + age;
        result = 31 * result + email.hashCode();
        return result;
    }
}

// PersonDemo.java
public class PersonDemo {
    public static void main(String[] args) {
        // 创建对象
        Person person1 = new Person();
        Person person2 = new Person("Alice", 25);
        Person person3 = new Person("Bob", 30, "bob@example.com");
        
        // 使用对象
        person1.setName("Charlie");
        person1.setAge(28);
        person1.setEmail("charlie@example.com");
        
        // 调用方法
        person1.introduce();
        person2.introduce();
        person3.introduce();
        
        // 检查成年状态
        System.out.println(person2.getName() + " 是成年人吗？" + person2.isAdult());
        
        // 庆祝生日
        person2.celebrateBirthday();
        
        // 静态方法调用
        System.out.println("总共创建了 " + Person.getPersonCount() + " 个人。");
        Person.printSpecies();
        
        // toString 方法
        System.out.println("Person1: " + person1);
        System.out.println("Person2: " + person2);
        
        // equals 方法测试
        Person person4 = new Person("Alice", 26, "");
        System.out.println("person2 equals person4: " + person2.equals(person4));
    }
}
```

### 2. 继承

```java
// Animal.java - 父类
public class Animal {
    protected String name;
    protected int age;
    protected String species;
    
    public Animal(String name, int age, String species) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
    
    public void eat() {
        System.out.println(name + " 正在吃东西");
    }
    
    public void sleep() {
        System.out.println(name + " 正在睡觉");
    }
    
    public void makeSound() {
        System.out.println(name + " 发出声音");
    }
    
    public String getInfo() {
        return "名字: " + name + ", 年龄: " + age + ", 种类: " + species;
    }
    
    // Getters
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getSpecies() { return species; }
}

// Dog.java - 子类
public class Dog extends Animal {
    private String breed;
    private boolean isTrained;
    
    public Dog(String name, int age, String breed) {
        super(name, age, "犬科"); // 调用父类构造器
        this.breed = breed;
        this.isTrained = false;
    }
    
    // 重写父类方法
    @Override
    public void makeSound() {
        System.out.println(name + " 汪汪叫");
    }
    
    // 子类特有方法
    public void wagTail() {
        System.out.println(name + " 摇尾巴");
    }
    
    public void fetch() {
        System.out.println(name + " 去捡球");
    }
    
    public void train() {
        isTrained = true;
        System.out.println(name + " 已经训练好了");
    }
    
    // 重写 getInfo 方法
    @Override
    public String getInfo() {
        return super.getInfo() + ", 品种: " + breed + ", 已训练: " + isTrained;
    }
    
    // Getters
    public String getBreed() { return breed; }
    public boolean isTrained() { return isTrained; }
}

// Cat.java - 另一个子类
public class Cat extends Animal {
    private boolean isIndoor;
    
    public Cat(String name, int age, boolean isIndoor) {
        super(name, age, "猫科");
        this.isIndoor = isIndoor;
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " 喵喵叫");
    }
    
    public void purr() {
        System.out.println(name + " 发出呼噜声");
    }
    
    public void climb() {
        System.out.println(name + " 爬树");
    }
    
    @Override
    public String getInfo() {
        return super.getInfo() + ", 室内猫: " + isIndoor;
    }
    
    public boolean isIndoor() { return isIndoor; }
}

// InheritanceDemo.java
public class InheritanceDemo {
    public static void main(String[] args) {
        // 创建不同类型的动物
        Animal animal = new Animal("通用动物", 5, "未知");
        Dog dog = new Dog("旺财", 3, "金毛");
        Cat cat = new Cat("咪咪", 2, true);
        
        // 调用共同方法
        System.out.println("=== 动物信息 ===");
        System.out.println(animal.getInfo());
        System.out.println(dog.getInfo());
        System.out.println(cat.getInfo());
        
        System.out.println("\n=== 动物行为 ===");
        animal.eat();
        animal.makeSound();
        
        dog.eat();
        dog.makeSound();
        dog.wagTail();
        dog.fetch();
        dog.train();
        
        cat.eat();
        cat.makeSound();
        cat.purr();
        cat.climb();
        
        // 多态性演示
        System.out.println("\n=== 多态性演示 ===");
        Animal[] animals = {animal, dog, cat};
        
        for (Animal a : animals) {
            System.out.println("--- " + a.getName() + " ---");
            a.eat();
            a.makeSound(); // 调用各自重写的方法
            System.out.println();
        }
        
        // instanceof 检查
        System.out.println("=== instanceof 检查 ===");
        for (Animal a : animals) {
            if (a instanceof Dog) {
                Dog d = (Dog) a;
                d.wagTail();
            } else if (a instanceof Cat) {
                Cat c = (Cat) a;
                c.purr();
            }
        }
    }
}
```

### 3. 抽象类和接口

```java
// Shape.java - 抽象类
public abstract class Shape {
    protected String color;
    protected boolean filled;
    
    public Shape(String color, boolean filled) {
        this.color = color;
        this.filled = filled;
    }
    
    // 抽象方法 - 子类必须实现
    public abstract double getArea();
    public abstract double getPerimeter();
    
    // 具体方法 - 子类可以继承
    public String getColor() {
        return color;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
    
    public boolean isFilled() {
        return filled;
    }
    
    public void setFilled(boolean filled) {
        this.filled = filled;
    }
    
    public void displayInfo() {
        System.out.println("颜色: " + color + ", 填充: " + filled);
    }
}

// Drawable.java - 接口
public interface Drawable {
    // 接口常量（默认 public static final）
    String DEFAULT_COLOR = "黑色";
    
    // 抽象方法（默认 public abstract）
    void draw();
    void erase();
    
    // Java 8+ 默认方法
    default void highlight() {
        System.out.println("高亮显示图形");
    }
    
    // Java 8+ 静态方法
    static void printDrawingInfo() {
        System.out.println("这是一个可绘制的图形");
    }
}

// Resizable.java - 另一个接口
public interface Resizable {
    void resize(double factor);
    
    default void doubleSize() {
        resize(2.0);
    }
    
    default void halfSize() {
        resize(0.5);
    }
}

// Rectangle.java - 实现类
public class Rectangle extends Shape implements Drawable, Resizable {
    private double width;
    private double height;
    
    public Rectangle(double width, double height, String color, boolean filled) {
        super(color, filled);
        this.width = width;
        this.height = height;
    }
    
    // 实现抽象方法
    @Override
    public double getArea() {
        return width * height;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * (width + height);
    }
    
    // 实现接口方法
    @Override
    public void draw() {
        System.out.println("绘制矩形: 宽=" + width + ", 高=" + height + ", 颜色=" + color);
    }
    
    @Override
    public void erase() {
        System.out.println("擦除矩形");
    }
    
    @Override
    public void resize(double factor) {
        width *= factor;
        height *= factor;
        System.out.println("矩形大小调整为: 宽=" + width + ", 高=" + height);
    }
    
    // Getters and Setters
    public double getWidth() { return width; }
    public double getHeight() { return height; }
    
    @Override
    public String toString() {
        return "Rectangle{width=" + width + ", height=" + height + 
               ", color='" + color + "', filled=" + filled + "}";
    }
}

// Circle.java - 另一个实现类
public class Circle extends Shape implements Drawable, Resizable {
    private double radius;
    
    public Circle(double radius, String color, boolean filled) {
        super(color, filled);
        this.radius = radius;
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * Math.PI * radius;
    }
    
    @Override
    public void draw() {
        System.out.println("绘制圆形: 半径=" + radius + ", 颜色=" + color);
    }
    
    @Override
    public void erase() {
        System.out.println("擦除圆形");
    }
    
    @Override
    public void resize(double factor) {
        radius *= factor;
        System.out.println("圆形半径调整为: " + radius);
    }
    
    public double getRadius() { return radius; }
    
    @Override
    public String toString() {
        return "Circle{radius=" + radius + ", color='" + color + "', filled=" + filled + "}";
    }
}

// AbstractInterfaceDemo.java
public class AbstractInterfaceDemo {
    public static void main(String[] args) {
        // 创建图形对象
        Rectangle rect = new Rectangle(10, 5, "红色", true);
        Circle circle = new Circle(3, "蓝色", false);
        
        // 使用抽象类方法
        System.out.println("=== 图形信息 ===");
        System.out.println("矩形面积: " + rect.getArea());
        System.out.println("矩形周长: " + rect.getPerimeter());
        rect.displayInfo();
        
        System.out.println("圆形面积: " + String.format("%.2f", circle.getArea()));
        System.out.println("圆形周长: " + String.format("%.2f", circle.getPerimeter()));
        circle.displayInfo();
        
        // 使用接口方法
        System.out.println("\n=== 绘制操作 ===");
        rect.draw();
        circle.draw();
        
        // 使用默认方法
        rect.highlight();
        circle.highlight();
        
        // 使用静态方法
        Drawable.printDrawingInfo();
        
        // 调整大小
        System.out.println("\n=== 大小调整 ===");
        rect.resize(1.5);
        circle.doubleSize();
        
        // 多态性
        System.out.println("\n=== 多态性演示 ===");
        Shape[] shapes = {rect, circle};
        
        for (Shape shape : shapes) {
            System.out.println("形状: " + shape.getClass().getSimpleName());
            System.out.println("面积: " + String.format("%.2f", shape.getArea()));
            
            // 接口类型转换
            if (shape instanceof Drawable) {
                ((Drawable) shape).draw();
            }
            
            if (shape instanceof Resizable) {
                ((Resizable) shape).halfSize();
            }
            
            System.out.println();
        }
        
        // 接口数组
        System.out.println("=== 接口数组 ===");
        Drawable[] drawables = {rect, circle};
        
        for (Drawable drawable : drawables) {
            drawable.draw();
            drawable.erase();
        }
    }
}
```

## 🎪 高级特性

### 1. 泛型

```java
import java.util.*;

// 泛型类
public class Box<T> {
    private T content;
    
    public Box() {}
    
    public Box(T content) {
        this.content = content;
    }
    
    public T getContent() {
        return content;
    }
    
    public void setContent(T content) {
        this.content = content;
    }
    
    public boolean isEmpty() {
        return content == null;
    }
    
    @Override
    public String toString() {
        return "Box{content=" + content + "}";
    }
}

// 泛型接口
public interface Pair<K, V> {
    K getKey();
    V getValue();
    void setKey(K key);
    void setValue(V value);
}

// 实现泛型接口
public class SimplePair<K, V> implements Pair<K, V> {
    private K key;
    private V value;
    
    public SimplePair(K key, V value) {
        this.key = key;
        this.value = value;
    }
    
    @Override
    public K getKey() { return key; }
    
    @Override
    public V getValue() { return value; }
    
    @Override
    public void setKey(K key) { this.key = key; }
    
    @Override
    public void setValue(V value) { this.value = value; }
    
    @Override
    public String toString() {
        return "Pair{" + key + "=" + value + "}";
    }
}

// 泛型方法和通配符
public class GenericUtils {
    
    // 泛型方法
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    // 有界类型参数
    public static <T extends Number> double sum(List<T> numbers) {
        double total = 0.0;
        for (T number : numbers) {
            total += number.doubleValue();
        }
        return total;
    }
    
    // 通配符 - 上界
    public static double sumOfNumbers(List<? extends Number> numbers) {
        double total = 0.0;
        for (Number number : numbers) {
            total += number.doubleValue();
        }
        return total;
    }
    
    // 通配符 - 下界
    public static void addNumbers(List<? super Integer> numbers) {
        numbers.add(1);
        numbers.add(2);
        numbers.add(3);
    }
    
    // 无界通配符
    public static void printList(List<?> list) {
        for (Object item : list) {
            System.out.print(item + " ");
        }
        System.out.println();
    }
    
    // 多个类型参数
    public static <T, U> boolean isEqual(T first, U second) {
        return first != null && first.equals(second);
    }
}

// GenericDemo.java
public class GenericDemo {
    public static void main(String[] args) {
        // 泛型类使用
        System.out.println("=== 泛型类 ===");
        Box<String> stringBox = new Box<>("Hello");> stringBox = new Box<>("Hello");
        Box<Integer> intBox = new Box<>(42);
        Box<List<String>> listBox = new Box<>(Arrays.asList("A", "B", "C"));
        
        System.out.println("String Box: " + stringBox);
        System.out.println("Integer Box: " + intBox);
        System.out.println("List Box: " + listBox);
        
        // 泛型接口使用
        System.out.println("\n=== 泛型接口 ===");
        Pair<String, Integer> pair1 = new SimplePair<>("Age", 25);
        Pair<Integer, String> pair2 = new SimplePair<>(1, "First");
        
        System.out.println("Pair 1: " + pair1);
        System.out.println("Pair 2: " + pair2);
        
        // 泛型方法使用
        System.out.println("\n=== 泛型方法 ===");
        String[] names = {"Alice", "Bob", "Charlie"};
        System.out.println("Before swap: " + Arrays.toString(names));
        GenericUtils.swap(names, 0, 2);
        System.out.println("After swap: " + Arrays.toString(names));
        
        Integer[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Before swap: " + Arrays.toString(numbers));
        GenericUtils.swap(numbers, 1, 3);
        System.out.println("After swap: " + Arrays.toString(numbers));
        
        // 有界类型参数
        System.out.println("\n=== 有界类型参数 ===");
        List<Integer> intList = Arrays.asList(1, 2, 3, 4, 5);
        List<Double> doubleList = Arrays.asList(1.1, 2.2, 3.3);
        
        System.out.println("Sum of integers: " + GenericUtils.sum(intList));
        System.out.println("Sum of doubles: " + GenericUtils.sum(doubleList));
        
        // 通配符使用
        System.out.println("\n=== 通配符 ===");
        System.out.println("Sum with wildcard: " + GenericUtils.sumOfNumbers(intList));
        System.out.println("Sum with wildcard: " + GenericUtils.sumOfNumbers(doubleList));
        
        List<Number> numberList = new ArrayList<>();
        GenericUtils.addNumbers(numberList);
        System.out.println("Added numbers: " + numberList);
        
        GenericUtils.printList(Arrays.asList("A", "B", "C"));
        GenericUtils.printList(Arrays.asList(1, 2, 3));
        
        // 类型推断 (Java 7+ Diamond Operator)
        System.out.println("\n=== 类型推断 ===");
        Map<String, List<Integer>> map = new HashMap<>(); // 右边不需要重复类型
        map.put("numbers", Arrays.asList(1, 2, 3));
        System.out.println("Map: " + map);
        
        // 多个类型参数
        System.out.println("\n=== 多个类型参数 ===");
        System.out.println("Is equal: " + GenericUtils.isEqual("hello", "hello"));
        System.out.println("Is equal: " + GenericUtils.isEqual(42, 42));
        System.out.println("Is equal: " + GenericUtils.isEqual("hello", 42));
    }
}
```

### 2. 集合框架

```java
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class CollectionDemo {
    public static void main(String[] args) {
        
        // List 接口实现
        System.out.println("=== List 集合 ===");
        
        // ArrayList - 动态数组
        List<String> arrayList = new ArrayList<>();
        arrayList.add("Apple");
        arrayList.add("Banana");
        arrayList.add("Cherry");
        arrayList.add(1, "Blueberry"); // 在索引1插入
        
        System.out.println("ArrayList: " + arrayList);
        System.out.println("Get index 2: " + arrayList.get(2));
        System.out.println("Size: " + arrayList.size());
        
        // LinkedList - 双向链表
        List<Integer> linkedList = new LinkedList<>();
        linkedList.add(10);
        linkedList.add(20);
        linkedList.add(30);
        ((LinkedList<Integer>) linkedList).addFirst(5);
        ((LinkedList<Integer>) linkedList).addLast(40);
        
        System.out.println("LinkedList: " + linkedList);
        
        // Vector - 线程安全的动态数组
        Vector<String> vector = new Vector<>();
        vector.add("Vector1");
        vector.add("Vector2");
        System.out.println("Vector: " + vector);
        
        // Set 接口实现
        System.out.println("\n=== Set 集合 ===");
        
        // HashSet - 基于哈希表
        Set<String> hashSet = new HashSet<>();
        hashSet.add("Java");
        hashSet.add("Python");
        hashSet.add("JavaScript");
        hashSet.add("Java"); // 重复元素不会被添加
        
        System.out.println("HashSet: " + hashSet);
        
        // LinkedHashSet - 保持插入顺序
        Set<String> linkedHashSet = new LinkedHashSet<>();
        linkedHashSet.add("First");
        linkedHashSet.add("Second");
        linkedHashSet.add("Third");
        
        System.out.println("LinkedHashSet: " + linkedHashSet);
        
        // TreeSet - 排序集合
        Set<Integer> treeSet = new TreeSet<>();
        treeSet.add(30);
        treeSet.add(10);
        treeSet.add(20);
        treeSet.add(40);
        
        System.out.println("TreeSet: " + treeSet);
        
        // Map 接口实现
        System.out.println("\n=== Map 集合 ===");
        
        // HashMap - 基于哈希表
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("Alice", 25);
        hashMap.put("Bob", 30);
        hashMap.put("Charlie", 35);
        
        System.out.println("HashMap: " + hashMap);
        System.out.println("Alice's age: " + hashMap.get("Alice"));
        
        // LinkedHashMap - 保持插入顺序
        Map<String, String> linkedHashMap = new LinkedHashMap<>();
        linkedHashMap.put("1", "One");
        linkedHashMap.put("3", "Three");
        linkedHashMap.put("2", "Two");
        
        System.out.println("LinkedHashMap: " + linkedHashMap);
        
        // TreeMap - 排序映射
        Map<String, Integer> treeMap = new TreeMap<>();
        treeMap.put("Zebra", 1);
        treeMap.put("Apple", 2);
        treeMap.put("Banana", 3);
        
        System.out.println("TreeMap: " + treeMap);
        
        // ConcurrentHashMap - 线程安全
        Map<String, String> concurrentMap = new ConcurrentHashMap<>();
        concurrentMap.put("Key1", "Value1");
        concurrentMap.put("Key2", "Value2");
        
        System.out.println("ConcurrentHashMap: " + concurrentMap);
        
        // Queue 接口实现
        System.out.println("\n=== Queue 集合 ===");
        
        // LinkedList 作为队列
        Queue<String> queue = new LinkedList<>();
        queue.offer("First");
        queue.offer("Second");
        queue.offer("Third");
        
        System.out.println("Queue: " + queue);
        System.out.println("Poll: " + queue.poll()); // 移除并返回头元素
        System.out.println("Peek: " + queue.peek()); // 查看头元素但不移除
        System.out.println("Queue after poll: " + queue);
        
        // PriorityQueue - 优先队列
        Queue<Integer> priorityQueue = new PriorityQueue<>();
        priorityQueue.offer(30);
        priorityQueue.offer(10);
        priorityQueue.offer(20);
        
        System.out.println("PriorityQueue: " + priorityQueue);
        while (!priorityQueue.isEmpty()) {
            System.out.print(priorityQueue.poll() + " ");
        }
        System.out.println();
        
        // Deque 接口 - 双端队列
        System.out.println("\n=== Deque 双端队列 ===");
        Deque<String> deque = new ArrayDeque<>();
        deque.addFirst("Middle");
        deque.addFirst("First");
        deque.addLast("Last");
        
        System.out.println("Deque: " + deque);
        System.out.println("Remove first: " + deque.removeFirst());
        System.out.println("Remove last: " + deque.removeLast());
        System.out.println("Deque after removal: " + deque);
        
        // 集合操作
        System.out.println("\n=== 集合操作 ===");
        
        List<String> list1 = new ArrayList<>(Arrays.asList("A", "B", "C"));
        List<String> list2 = new ArrayList<>(Arrays.asList("B", "C", "D"));
        
        // 并集
        List<String> union = new ArrayList<>(list1);
        union.addAll(list2);
        System.out.println("Union: " + union);
        
        // 交集
        List<String> intersection = new ArrayList<>(list1);
        intersection.retainAll(list2);
        System.out.println("Intersection: " + intersection);
        
        // 差集
        List<String> difference = new ArrayList<>(list1);
        difference.removeAll(list2);
        System.out.println("Difference: " + difference);
        
        // 集合工具类
        System.out.println("\n=== Collections 工具类 ===");
        
        List<Integer> numbers = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6));
        System.out.println("Original: " + numbers);
        
        Collections.sort(numbers);
        System.out.println("Sorted: " + numbers);
        
        Collections.reverse(numbers);
        System.out.println("Reversed: " + numbers);
        
        Collections.shuffle(numbers);
        System.out.println("Shuffled: " + numbers);
        
        System.out.println("Max: " + Collections.max(numbers));
        System.out.println("Min: " + Collections.min(numbers));
        
        // 不可变集合
        List<String> immutableList = Collections.unmodifiableList(arrayList);
        System.out.println("Immutable list: " + immutableList);
        
        // 同步集合
        List<String> synchronizedList = Collections.synchronizedList(new ArrayList<>());
        synchronizedList.add("Thread-safe");
        System.out.println("Synchronized list: " + synchronizedList);
    }
}
```

## 🚦 异常处理

### 1. 异常基础

```java
// 自定义异常类
class InsufficientFundsException extends Exception {
    private double amount;
    
    public InsufficientFundsException(double amount) {
        super("余额不足，尝试提取: " + amount);
        this.amount = amount;
    }
    
    public double getAmount() {
        return amount;
    }
}

class InvalidAccountException extends RuntimeException {
    public InvalidAccountException(String message) {
        super(message);
    }
}

// 银行账户类
class BankAccount {
    private String accountNumber;
    private double balance;
    
    public BankAccount(String accountNumber, double initialBalance) {
        if (accountNumber == null || accountNumber.trim().isEmpty()) {
            throw new InvalidAccountException("账户号码不能为空");
        }
        if (initialBalance < 0) {
            throw new InvalidAccountException("初始余额不能为负数");
        }
        
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("存款金额必须大于0");
        }
        balance += amount;
        System.out.println("存款成功，当前余额: " + balance);
    }
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("提款金额必须大于0");
        }
        if (amount > balance) {
            throw new InsufficientFundsException(amount);
        }
        
        balance -= amount;
        System.out.println("提款成功，当前余额: " + balance);
    }
    
    public double getBalance() {
        return balance;
    }
    
    public String getAccountNumber() {
        return accountNumber;
    }
}

public class ExceptionDemo {
    public static void main(String[] args) {
        
        // 基本异常处理
        System.out.println("=== 基本异常处理 ===");
        
        try {
            int result = 10 / 0; // ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("捕获算术异常: " + e.getMessage());
        }
        
        // 多个 catch 块
        System.out.println("\n=== 多个 catch 块 ===");
        
        try {
            String str = null;
            int length = str.length(); // NullPointerException
            
            int[] array = new int[5];
            int value = array[10]; // ArrayIndexOutOfBoundsException
            
        } catch (NullPointerException e) {
            System.out.println("空指针异常: " + e.getMessage());
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("数组越界异常: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("其他异常: " + e.getMessage());
        }
        
        // try-catch-finally
        System.out.println("\n=== try-catch-finally ===");
        
        try {
            System.out.println("执行 try 块");
            int result = Integer.parseInt("abc"); // NumberFormatException
        } catch (NumberFormatException e) {
            System.out.println("数字格式异常: " + e.getMessage());
        } finally {
            System.out.println("finally 块总是执行");
        }
        
        // 自定义异常使用
        System.out.println("\n=== 自定义异常 ===");
        
        try {
            BankAccount account = new BankAccount("12345", 1000.0);
            account.deposit(500.0);
            account.withdraw(2000.0); // 会抛出 InsufficientFundsException
            
        } catch (InsufficientFundsException e) {
            System.out.println("银行异常: " + e.getMessage());
            System.out.println("尝试提取金额: " + e.getAmount());
        } catch (InvalidAccountException e) {
            System.out.println("账户异常: " + e.getMessage());
        }
        
        // 异常链
        System.out.println("\n=== 异常链 ===");
        
        try {
            methodA();
        } catch (Exception e) {
            System.out.println("最终捕获的异常: " + e.getMessage());
            System.out.println("原因: " + e.getCause().getMessage());
        }
        
        // try-with-resources (Java 7+)
        System.out.println("\n=== try-with-resources ===");
        
        // 自动资源管理
        try (AutoCloseableResource resource = new AutoCloseableResource()) {
            resource.doSomething();
            // 资源会自动关闭，即使发生异常
        } catch (Exception e) {
            System.out.println("资源操作异常: " + e.getMessage());
        }
        
        // 多个资源
        try (AutoCloseableResource resource1 = new AutoCloseableResource();
             AutoCloseableResource resource2 = new AutoCloseableResource()) {
            
            resource1.doSomething();
            resource2.doSomething();
            
        } catch (Exception e) {
            System.out.println("多资源操作异常: " + e.getMessage());
        }
        
        // 异常处理最佳实践
        System.out.println("\n=== 异常处理最佳实践 ===");
        
        // 1. 具体异常处理
        handleSpecificExceptions();
        
        // 2. 异常转换
        try {
            processUserData("invalid-data");
        } catch (DataProcessingException e) {
            System.out.println("数据处理失败: " + e.getMessage());
        }
        
        // 3. 异常记录
        logExceptions();
    }
    
    // 异常链示例
    public static void methodA() throws Exception {
        try {
            methodB();
        } catch (RuntimeException e) {
            throw new Exception("methodA 中发生错误", e);
        }
    }
    
    public static void methodB() {
        throw new RuntimeException("methodB 中的原始错误");
    }
    
    // 具体异常处理
    public static void handleSpecificExceptions() {
        try {
            // 可能抛出多种异常的代码
            String[] array = {"1", "2", "abc", "4"};
            for (String s : array) {
                int num = Integer.parseInt(s);
                int result = 100 / num;
                System.out.println("结果: " + result);
            }
        } catch (NumberFormatException e) {
            System.out.println("数字格式错误: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("算术错误: " + e.getMessage());
        }
    }
    
    // 自定义业务异常
    static class DataProcessingException extends Exception {
        public DataProcessingException(String message, Throwable cause) {
            super(message, cause);
        }
    }
    
    // 异常转换示例
    public static void processUserData(String data) throws DataProcessingException {
        try {
            // 模拟数据处理
            if ("invalid-data".equals(data)) {
                throw new IllegalArgumentException("无效的数据格式");
            }
            // 处理数据...
        } catch (IllegalArgumentException e) {
            // 将底层异常转换为业务异常
            throw new DataProcessingException("用户数据处理失败", e);
        }
    }
    
    // 异常记录
    public static void logExceptions() {
        try {
            riskyOperation();
        } catch (Exception e) {
            // 记录异常信息
            System.err.println("异常时间: " + new java.util.Date());
            System.err.println("异常类型: " + e.getClass().getSimpleName());
            System.err.println("异常消息: " + e.getMessage());
            e.printStackTrace();
       
    }
    
    public static void riskyOperation() {
        throw new RuntimeException("模拟的运行时异常");
    }
}

// 自动关闭资源示例
class AutoCloseableResource implements AutoCloseable {
    private static int counter = 0;
    private final int id;
    
    public AutoCloseableResource() {
        this.id = ++counter;
        System.out.println("资源 " + id + " 已创建");
    }
    
    public void doSomething() {
        System.out.println("资源 " + id + " 正在工作");
    }
    
    @Override
    public void close() throws Exception {
        System.out.println("资源 " + id + " 已关闭");
    }
}
```

## 🌐 网络编程和IO

### 1. 文件IO操作

```java
import java.io.*;
import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class FileIODemo {
    public static void main(String[] args) {
        
        // 传统IO操作
        System.out.println("=== 传统 IO 操作 ===");
        
        // 写入文件
        try (FileWriter writer = new FileWriter("example.txt");
             BufferedWriter bufferedWriter = new BufferedWriter(writer)) {
            
            bufferedWriter.write("Hello, Java IO!");
            bufferedWriter.newLine();
            bufferedWriter.write("这是第二行");
            bufferedWriter.newLine();
            bufferedWriter.write("文件IO示例");
            
            System.out.println("文件写入成功");
            
        } catch (IOException e) {
            System.err.println("写入文件失败: " + e.getMessage());
        }
        
        // 读取文件
        try (FileReader reader = new FileReader("example.txt");
             BufferedReader bufferedReader = new BufferedReader(reader)) {
            
            String line;
            System.out.println("文件内容:");
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
            }
            
        } catch (IOException e) {
            System.err.println("读取文件失败: " + e.getMessage());
        }
        
        // NIO.2 操作 (Java 7+)
        System.out.println("\n=== NIO.2 操作 ===");
        
        Path path = Paths.get("nio_example.txt");
        
        try {
            // 写入文件
            List<String> lines = List.of(
                "NIO.2 示例",
                "更简洁的文件操作",
                "支持现代文件系统特性"
            );
            Files.write(path, lines, StandardCharsets.UTF_8);
            System.out.println("NIO.2 写入成功");
            
            // 读取文件
            List<String> readLines = Files.readAllLines(path, StandardCharsets.UTF_8);
            System.out.println("NIO.2 读取内容:");
            readLines.forEach(System.out::println);
            
            // 文件信息
            System.out.println("文件大小: " + Files.size(path) + " 字节");
            System.out.println("是否存在: " + Files.exists(path));
            System.out.println("是否可读: " + Files.isReadable(path));
            System.out.println("是否可写: " + Files.isWritable(path));
            
        } catch (IOException e) {
            System.err.println("NIO.2 操作失败: " + e.getMessage());
        }
        
        // 二进制文件操作
        System.out.println("\n=== 二进制文件操作 ===");
        
        try (FileOutputStream fos = new FileOutputStream("binary_example.dat");
             DataOutputStream dos = new DataOutputStream(fos)) {
            
            // 写入不同类型的数据
            dos.writeInt(42);
            dos.writeDouble(3.14159);
            dos.writeUTF("二进制数据");
            dos.writeBoolean(true);
            
            System.out.println("二进制数据写入成功");
            
        } catch (IOException e) {
            System.err.println("二进制写入失败: " + e.getMessage());
        }
        
        try (FileInputStream fis = new FileInputStream("binary_example.dat");
             DataInputStream dis = new DataInputStream(fis)) {
            
            // 按写入顺序读取数据
            int intValue = dis.readInt();
            double doubleValue = dis.readDouble();
            String stringValue = dis.readUTF();
            boolean boolValue = dis.readBoolean();
            
            System.out.println("读取的二进制数据:");
            System.out.println("Int: " + intValue);
            System.out.println("Double: " + doubleValue);
            System.out.println("String: " + stringValue);
            System.out.println("Boolean: " + boolValue);
            
        } catch (IOException e) {
            System.err.println("二进制读取失败: " + e.getMessage());
        }
        
        // 清理文件
        try {
            Files.deleteIfExists(Paths.get("example.txt"));
            Files.deleteIfExists(Paths.get("nio_example.txt"));
            Files.deleteIfExists(Paths.get("binary_example.dat"));
            System.out.println("\n临时文件已清理");
        } catch (IOException e) {
            System.err.println("清理文件失败: " + e.getMessage());
        }
    }
}
```

## 📚 总结

Java 是一门功能强大、应用广泛的编程语言。掌握以下要点：

### 🎯 核心要素
- **面向对象**: 封装、继承、多态的完整实现
- **平台无关**: JVM 提供的跨平台能力
- **丰富生态**: Spring、Hibernate 等企业级框架
- **内存管理**: 自动垃圾回收机制

### 🛡️ 最佳实践
- **代码规范**: 遵循 Java 编码规范和命名约定
- **异常处理**: 合理的异常处理和资源管理
- **性能优化**: 理解 JVM 性能调优
- **测试驱动**: 使用 JUnit 进行单元测试

### 🚀 应用领域
- **企业应用**: Spring Boot 微服务架构
- **Android 开发**: 移动应用开发
- **大数据**: Hadoop、Spark 等大数据处理
- **Web 开发**: 服务端 API 和 Web 应用

通过不断实践和学习新的框架技术，你将能够使用 Java 构建出高质量、可维护的企业级应用！

---

*掌握 Java 的强大特性，构建稳定可靠的企业级应用！* 🎉 