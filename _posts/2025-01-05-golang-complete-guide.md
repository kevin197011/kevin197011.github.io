---
layout: post
title: "Go 完全指南：从入门到精通实战"
date: 2025-01-05 20:00:00 +0800
category: Dev
tags: [Go, Golang, 编程语言, 后端开发, 微服务, 云原生]
author: Kk
excerpt: "全面掌握Go编程语言，从基础语法到高级特性，包含微服务开发和云原生实战"
diagram: |
  graph TB
      subgraph "Go生态系统"
          subgraph "核心语言 Core Language"
              GO[Go编译器]
              SYNTAX[语法特性]
              GOROUTINES[协程并发]
              CHANNELS[通道通信]
              INTERFACES[接口系统]
              REFLECTION[反射机制]
          end

          subgraph "标准库 Standard Library"
              STD_LIB[标准库]
              HTTP[HTTP服务]
              JSON[JSON处理]
              TIME[时间处理]
              OS[系统调用]
              NET[网络编程]
              CRYPTO[加密算法]
              DATABASE[数据库驱动]
          end

          subgraph "包管理 Package Management"
              MODULES[Go Modules]
              GOPROXY[Go Proxy]
              GOMOD[go.mod]
              GOSUM[go.sum]
              VENDOR[vendor目录]
          end

          subgraph "Web框架 Web Frameworks"
              GIN[Gin框架]
              ECHO[Echo框架]
              FIBER[Fiber框架]
              BEEGO[Beego框架]
              IRIS[Iris框架]
              CHI[Chi路由]
          end

          subgraph "微服务 Microservices"
              GRPC[gRPC]
              PROTOBUF[Protocol Buffers]
              CONSUL[服务发现]
              ISTIO[服务网格]
              JAEGER[链路追踪]
              PROMETHEUS[监控指标]
          end

          subgraph "数据库 Database"
              GORM[GORM ORM]
              SQLX[SQLX]
              MONGO[MongoDB]
              REDIS[Redis]
              POSTGRES[PostgreSQL]
              MYSQL[MySQL]
          end

          subgraph "测试框架 Testing"
              TESTING[内置测试]
              TESTIFY[Testify]
              GINKGO[Ginkgo]
              GOMEGA[Gomega]
              MOCK[Go Mock]
              BENCHMARK[性能测试]
          end

          subgraph "DevOps工具 DevOps Tools"
              DOCKER[Docker]
              KUBERNETES[Kubernetes]
              HELM[Helm]
              TERRAFORM[Terraform]
              GITLAB_CI[GitLab CI]
              GITHUB_ACTIONS[GitHub Actions]
          end

          subgraph "开发工具 Development Tools"
              VSCODE[VS Code]
              GOLAND[GoLand]
              VIM[Vim-go]
              DELVE[Delve调试器]
              GOFMT[代码格式化]
              GOLINT[代码检查]
          end
      end

      GO --> SYNTAX
      GO --> GOROUTINES
      GO --> CHANNELS
      GO --> INTERFACES
      GO --> STD_LIB

      STD_LIB --> HTTP
      STD_LIB --> JSON
      STD_LIB --> NET
      STD_LIB --> DATABASE

      MODULES --> GOPROXY
      MODULES --> GOMOD
      MODULES --> GOSUM

      HTTP --> GIN
      HTTP --> ECHO
      HTTP --> FIBER
      NET --> GRPC
      GRPC --> PROTOBUF

      GIN --> GORM
      ECHO --> SQLX
      GRPC --> CONSUL
      CONSUL --> ISTIO

      TESTING --> TESTIFY
      TESTING --> GINKGO
      TESTIFY --> MOCK

      GO --> DOCKER
      DOCKER --> KUBERNETES
      KUBERNETES --> HELM

      VSCODE --> DELVE
      GOLAND --> GOFMT
      VIM --> GOLINT

      style GO fill:#00add8,stroke:#fff,stroke-width:2px,color:#fff
      style GOROUTINES fill:#29beb0,stroke:#fff,stroke-width:2px,color:#fff
      style CHANNELS fill:#48cae4,stroke:#fff,stroke-width:2px,color:#fff
      style GIN fill:#00d4aa,stroke:#fff,stroke-width:2px,color:#fff
      style GRPC fill:#244c5a,stroke:#fff,stroke-width:2px,color:#fff
      style DOCKER fill:#0db7ed,stroke:#fff,stroke-width:2px,color:#fff
      style KUBERNETES fill:#326ce5,stroke:#fff,stroke-width:2px,color:#fff
      style GORM fill:#ff6b6b,stroke:#fff,stroke-width:2px,color:#fff
      style TESTING fill:#ffd93d,stroke:#fff,stroke-width:2px,color:#000
---

# Go 完全指南：从入门到精通实战

## 🚀 Go 简介

Go（又称 Golang）是 Google 开发的开源编程语言，专为构建简单、可靠、高效的软件而设计。Go 结合了静态类型语言的安全性和动态语言的便利性，特别适合系统编程、网络服务和云原生应用开发。

### 核心特点

- **🚀 编译快速**: 快速编译，秒级构建大型项目
- **⚡ 执行高效**: 静态编译，接近 C 语言的执行效率
- **🔄 并发简单**: 内置 goroutines 和 channels，简化并发编程
- **🛡️ 类型安全**: 静态类型系统，编译期捕获错误
- **🎯 语法简洁**: 语法简单清晰，学习曲线平缓
- **📦 标准库丰富**: 功能强大的标准库，覆盖常见需求

## 📦 环境搭建

### 官方安装方式

#### macOS 安装

```bash
# 使用 Homebrew 安装
brew install go

# 或下载官方安装包
curl -L https://golang.org/dl/go1.21.0.darwin-amd64.pkg -o go.pkg
sudo installer -pkg go.pkg -target /
```

#### Linux 安装

```bash
# 下载并解压
wget https://golang.org/dl/go1.21.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz

# 配置环境变量
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
echo 'export GOBIN=$GOPATH/bin' >> ~/.bashrc
source ~/.bashrc
```

#### Windows 安装

```bash
# 下载官方安装包
# https://golang.org/dl/go1.21.0.windows-amd64.msi

# 或使用 Chocolatey
choco install golang

# 或使用 Scoop
scoop install go
```

### 验证安装

```bash
# 检查版本
go version

# 查看环境信息
go env

# 查看 GOPATH 和 GOROOT
echo $GOPATH
echo $GOROOT
```

### 配置开发环境

```bash
# 设置 Go 代理（国内用户推荐）
go env -w GOPROXY=https://goproxy.cn,direct

# 启用 Go Modules
go env -w GO111MODULE=on

# 设置私有仓库跳过代理
go env -w GOPRIVATE=github.com/yourcompany/*

# 创建工作目录
mkdir -p ~/go/{bin,src,pkg}
```

## 🎯 基础语法

### 1. Hello World

```go
// main.go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

```bash
# 运行程序
go run main.go

# 编译程序
go build main.go
./main

# 或直接编译并运行
go build -o hello main.go && ./hello
```

### 2. 变量和常量

```go
package main

import "fmt"

func main() {
    // 变量声明
    var name string = "Go"
    var age int = 13
    var version float64 = 1.21

    // 短变量声明
    language := "Golang"
    isAwesome := true

    // 多变量声明
    var (
        username string = "gopher"
        userID   int    = 1001
        active   bool   = true
    )

    // 零值
    var defaultInt int        // 0
    var defaultString string  // ""
    var defaultBool bool      // false

    // 常量
    const PI = 3.14159
    const (
        StatusOK       = 200
        StatusNotFound = 404
        StatusError    = 500
    )

    // iota 常量生成器
    const (
        Sunday = iota    // 0
        Monday           // 1
        Tuesday          // 2
        Wednesday        // 3
        Thursday         // 4
        Friday           // 5
        Saturday         // 6
    )

    fmt.Printf("Name: %s, Age: %d, Version: %.2f\n", name, age, version)
    fmt.Printf("Language: %s, Awesome: %t\n", language, isAwesome)
}
```

### 3. 数据类型

```go
package main

import "fmt"

func main() {
    // 基础数据类型

    // 整数类型
    var i8 int8 = 127
    var i16 int16 = 32767
    var i32 int32 = 2147483647
    var i64 int64 = 9223372036854775807
    var ui8 uint8 = 255
    var ui16 uint16 = 65535
    var ui32 uint32 = 4294967295
    var ui64 uint64 = 18446744073709551615

    // 浮点类型
    var f32 float32 = 3.14
    var f64 float64 = 3.141592653589793

    // 复数类型
    var c64 complex64 = 1 + 2i
    var c128 complex128 = 1 + 2i

    // 布尔类型
    var flag bool = true

    // 字符串类型
    var str string = "Hello, Go!"
    var rawStr string = `This is a
    raw string
    with multiple lines`

    // 字节类型
    var b byte = 'A'  // byte 是 uint8 的别名
    var r rune = '中'  // rune 是 int32 的别名，用于 Unicode

    fmt.Printf("Integers: %d, %d, %d, %d\n", i8, i16, i32, i64)
    fmt.Printf("Unsigned: %d, %d, %d, %d\n", ui8, ui16, ui32, ui64)
    fmt.Printf("Floats: %f, %f\n", f32, f64)
    fmt.Printf("Complex: %v, %v\n", c64, c128)
    fmt.Printf("Boolean: %t\n", flag)
    fmt.Printf("String: %s\n", str)
    fmt.Printf("Raw string: %s\n", rawStr)
    fmt.Printf("Byte: %c (%d), Rune: %c (%d)\n", b, b, r, r)
}
```

### 4. 数组和切片

```go
package main

import "fmt"

func main() {
    // 数组（固定长度）
    var arr1 [5]int                           // 零值数组
    arr2 := [5]int{1, 2, 3, 4, 5}           // 初始化数组
    arr3 := [...]int{1, 2, 3}               // 编译器推断长度
    arr4 := [5]int{1: 10, 3: 30}            // 指定索引初始化

    fmt.Printf("Arrays: %v, %v, %v, %v\n", arr1, arr2, arr3, arr4)

    // 切片（动态数组）
    var slice1 []int                         // nil 切片
    slice2 := []int{1, 2, 3, 4, 5}         // 初始化切片
    slice3 := make([]int, 3, 5)             // make(类型, 长度, 容量)
    slice4 := arr2[1:4]                     // 从数组创建切片

    fmt.Printf("Slices: %v, %v, %v, %v\n", slice1, slice2, slice3, slice4)
    fmt.Printf("Length and capacity: len=%d, cap=%d\n", len(slice2), cap(slice2))

    // 切片操作
    slice2 = append(slice2, 6, 7, 8)        // 追加元素
    slice5 := make([]int, len(slice2))
    copy(slice5, slice2)                     // 复制切片

    fmt.Printf("After append: %v\n", slice2)
    fmt.Printf("Copied slice: %v\n", slice5)

    // 二维切片
    matrix := [][]int{
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9},
    }
    fmt.Printf("Matrix: %v\n", matrix)
}
```

### 5. 映射（Map）

```go
package main

import "fmt"

func main() {
    // 映射声明和初始化
    var m1 map[string]int                    // nil map
    m2 := make(map[string]int)              // 空 map
    m3 := map[string]int{                   // 初始化 map
        "apple":  5,
        "banana": 3,
        "orange": 8,
    }

    // 操作映射
    m2["go"] = 13
    m2["python"] = 30
    m2["java"] = 25

    fmt.Printf("Maps: %v, %v\n", m2, m3)

    // 访问元素
    value := m2["go"]
    fmt.Printf("Value of 'go': %d\n", value)

    // 检查键是否存在
    value, exists := m2["rust"]
    if exists {
        fmt.Printf("Value of 'rust': %d\n", value)
    } else {
        fmt.Println("'rust' not found")
    }

    // 删除元素
    delete(m2, "java")
    fmt.Printf("After deletion: %v\n", m2)

    // 遍历映射
    for key, value := range m3 {
        fmt.Printf("%s: %d\n", key, value)
    }
}
```

## 🔧 控制结构

### 1. 条件语句

```go
package main

import "fmt"

func main() {
    score := 85

    // if-else 语句
    if score >= 90 {
        fmt.Println("Grade: A")
    } else if score >= 80 {
        fmt.Println("Grade: B")
    } else if score >= 70 {
        fmt.Println("Grade: C")
    } else {
        fmt.Println("Grade: D")
    }

    // if 语句中的短变量声明
    if num := 42; num%2 == 0 {
        fmt.Printf("%d is even\n", num)
    } else {
        fmt.Printf("%d is odd\n", num)
    }

    // switch 语句
    day := "Monday"
    switch day {
    case "Monday":
        fmt.Println("Start of work week")
    case "Friday":
        fmt.Println("TGIF!")
    case "Saturday", "Sunday":
        fmt.Println("Weekend!")
    default:
        fmt.Println("Midweek")
    }

    // 无表达式的 switch
    num := 15
    switch {
    case num < 0:
        fmt.Println("Negative")
    case num == 0:
        fmt.Println("Zero")
    case num < 10:
        fmt.Println("Single digit")
    default:
        fmt.Println("Multiple digits")
    }

    // 类型 switch
    var i interface{} = "hello"
    switch v := i.(type) {
    case int:
        fmt.Printf("Integer: %d\n", v)
    case string:
        fmt.Printf("String: %s\n", v)
    case bool:
        fmt.Printf("Boolean: %t\n", v)
    default:
        fmt.Printf("Unknown type: %T\n", v)
    }
}
```

### 2. 循环语句

```go
package main

import "fmt"

func main() {
    // for 循环的三种形式

    // 1. 传统的三部分循环
    fmt.Println("Traditional for loop:")
    for i := 0; i < 5; i++ {
        fmt.Printf("%d ", i)
    }
    fmt.Println()

    // 2. 类似 while 循环
    fmt.Println("While-like loop:")
    j := 0
    for j < 5 {
        fmt.Printf("%d ", j)
        j++
    }
    fmt.Println()

    // 3. 无限循环
    fmt.Println("Infinite loop (with break):")
    k := 0
    for {
        if k >= 5 {
            break
        }
        fmt.Printf("%d ", k)
        k++
    }
    fmt.Println()

    // continue 语句
    fmt.Println("Loop with continue:")
    for i := 0; i < 10; i++ {
        if i%2 == 0 {
            continue
        }
        fmt.Printf("%d ", i)
    }
    fmt.Println()

    // range 循环
    fmt.Println("Range over slice:")
    numbers := []int{10, 20, 30, 40, 50}
    for index, value := range numbers {
        fmt.Printf("Index: %d, Value: %d\n", index, value)
    }

    // 只要值，不要索引
    fmt.Println("Range over slice (values only):")
    for _, value := range numbers {
        fmt.Printf("%d ", value)
    }
    fmt.Println()

    // range 循环遍历映射
    fmt.Println("Range over map:")
    fruits := map[string]int{
        "apple":  5,
        "banana": 3,
        "orange": 8,
    }
    for fruit, count := range fruits {
        fmt.Printf("%s: %d\n", fruit, count)
    }

    // range 循环遍历字符串
    fmt.Println("Range over string:")
    str := "Hello, 世界"
    for i, char := range str {
        fmt.Printf("Index: %d, Char: %c\n", i, char)
    }
}
```

## 📁 函数

### 1. 基本函数

```go
package main

import "fmt"

// 基本函数
func greet(name string) {
    fmt.Printf("Hello, %s!\n", name)
}

// 带返回值的函数
func add(a, b int) int {
    return a + b
}

// 多返回值函数
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// 命名返回值
func calculate(a, b int) (sum, product int) {
    sum = a + b
    product = a * b
    return  // 等价于 return sum, product
}

// 可变参数函数
func sum(numbers ...int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

// 函数作为参数
func operation(a, b int, op func(int, int) int) int {
    return op(a, b)
}

// 函数作为返回值
func getOperation(op string) func(int, int) int {
    switch op {
    case "+":
        return func(a, b int) int { return a + b }
    case "-":
        return func(a, b int) int { return a - b }
    case "*":
        return func(a, b int) int { return a * b }
    default:
        return func(a, b int) int { return 0 }
    }
}

func main() {
    // 调用函数
    greet("Go")

    result := add(3, 5)
    fmt.Printf("3 + 5 = %d\n", result)

    quotient, err := divide(10, 3)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
    } else {
        fmt.Printf("10 / 3 = %.2f\n", quotient)
    }

    s, p := calculate(4, 5)
    fmt.Printf("Sum: %d, Product: %d\n", s, p)

    total := sum(1, 2, 3, 4, 5)
    fmt.Printf("Sum of 1,2,3,4,5 = %d\n", total)

    // 函数作为参数
    multiply := func(a, b int) int { return a * b }
    result = operation(4, 5, multiply)
    fmt.Printf("4 * 5 = %d\n", result)

    // 函数作为返回值
    addFunc := getOperation("+")
    result = addFunc(10, 20)
    fmt.Printf("10 + 20 = %d\n", result)

    // 匿名函数和立即执行
    func(msg string) {
        fmt.Println(msg)
    }("This is an anonymous function")

    // 闭包
    counter := func() func() int {
        count := 0
        return func() int {
            count++
            return count
        }
    }()

    fmt.Printf("Counter: %d\n", counter())
    fmt.Printf("Counter: %d\n", counter())
    fmt.Printf("Counter: %d\n", counter())
}
```

### 2. 方法

```go
package main

import "fmt"

// 定义结构体
type Rectangle struct {
    Width  float64
    Height float64
}

type Circle struct {
    Radius float64
}

// 值接收者方法
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

// 指针接收者方法
func (r *Rectangle) Scale(factor float64) {
    r.Width *= factor
    r.Height *= factor
}

// Circle 的方法
func (c Circle) Area() float64 {
    return 3.14159 * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
    return 2 * 3.14159 * c.Radius
}

// 接口定义
type Shape interface {
    Area() float64
    Perimeter() float64
}

// 计算形状总面积
func totalArea(shapes []Shape) float64 {
    total := 0.0
    for _, shape := range shapes {
        total += shape.Area()
    }
    return total
}

func main() {
    // 创建结构体实例
    rect := Rectangle{Width: 10, Height: 5}
    circle := Circle{Radius: 3}

    // 调用方法
    fmt.Printf("Rectangle Area: %.2f\n", rect.Area())
    fmt.Printf("Rectangle Perimeter: %.2f\n", rect.Perimeter())

    fmt.Printf("Circle Area: %.2f\n", circle.Area())
    fmt.Printf("Circle Perimeter: %.2f\n", circle.Perimeter())

    // 修改方法
    fmt.Printf("Before scaling: %+v\n", rect)
    rect.Scale(2)
    fmt.Printf("After scaling: %+v\n", rect)

    // 接口使用
    shapes := []Shape{
        Rectangle{Width: 4, Height: 6},
        Circle{Radius: 2},
        Rectangle{Width: 3, Height: 8},
    }

    fmt.Printf("Total area of all shapes: %.2f\n", totalArea(shapes))
}
```

## 🎪 结构体和接口

### 1. 结构体详解

```go
package main

import (
    "fmt"
    "time"
)

// 基础结构体
type Person struct {
    Name    string
    Age     int
    Email   string
    private string  // 小写字段是私有的
}

// 嵌套结构体
type Address struct {
    Street   string
    City     string
    Country  string
    PostCode string
}

type Employee struct {
    Person           // 匿名字段（嵌入）
    Address          // 嵌入地址
    ID       int
    Position string
    Salary   float64
    HireDate time.Time
}

// 结构体标签（用于 JSON、数据库等）
type User struct {
    ID       int    `json:"id" db:"user_id"`
    Username string `json:"username" db:"username" validate:"required"`
    Email    string `json:"email" db:"email" validate:"required,email"`
    Created  time.Time `json:"created_at" db:"created_at"`
}

// 构造函数
func NewPerson(name string, age int, email string) *Person {
    return &Person{
        Name:  name,
        Age:   age,
        Email: email,
    }
}

func NewEmployee(name string, age int, email string, position string, salary float64) *Employee {
    return &Employee{
        Person: Person{
            Name:  name,
            Age:   age,
            Email: email,
        },
        Position: position,
        Salary:   salary,
        HireDate: time.Now(),
    }
}

// 方法
func (p *Person) GetFullInfo() string {
    return fmt.Sprintf("Name: %s, Age: %d, Email: %s", p.Name, p.Age, p.Email)
}

func (e *Employee) GetEmployeeInfo() string {
    return fmt.Sprintf("%s, Position: %s, Salary: %.2f", e.GetFullInfo(), e.Position, e.Salary)
}

func (e *Employee) Promote(newPosition string, salaryIncrease float64) {
    e.Position = newPosition
    e.Salary += salaryIncrease
}

func main() {
    // 创建结构体实例
    person1 := Person{
        Name:  "Alice",
        Age:   30,
        Email: "alice@example.com",
    }

    person2 := Person{"Bob", 25, "bob@example.com", "private"}

    person3 := NewPerson("Charlie", 35, "charlie@example.com")

    fmt.Println("Person 1:", person1.GetFullInfo())
    fmt.Println("Person 2:", person2.GetFullInfo())
    fmt.Println("Person 3:", person3.GetFullInfo())

    // 员工示例
    emp := NewEmployee("David", 28, "david@company.com", "Developer", 75000)
    fmt.Println("Employee:", emp.GetEmployeeInfo())

    emp.Promote("Senior Developer", 10000)
    fmt.Println("After promotion:", emp.GetEmployeeInfo())

    // 匿名结构体
    config := struct {
        Host string
        Port int
        SSL  bool
    }{
        Host: "localhost",
        Port: 8080,
        SSL:  true,
    }
    fmt.Printf("Config: %+v\n", config)

    // 结构体比较
    p1 := Person{Name: "Test", Age: 20, Email: "test@example.com"}
    p2 := Person{Name: "Test", Age: 20, Email: "test@example.com"}
    fmt.Printf("p1 == p2: %t\n", p1 == p2)
}
```

### 2. 接口详解

```go
package main

import (
    "fmt"
    "math"
)

// 基础接口
type Writer interface {
    Write([]byte) (int, error)
}

type Reader interface {
    Read([]byte) (int, error)
}

// 接口组合
type ReadWriter interface {
    Reader
    Writer
}

// 几何形状接口
type Geometry interface {
    Area() float64
    Perimeter() float64
}

// 实现接口的结构体
type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
    return 2 * math.Pi * c.Radius
}

// 空接口
func describe(i interface{}) {
    fmt.Printf("Type: %T, Value: %v\n", i, i)
}

// 类型断言
func processValue(i interface{}) {
    switch v := i.(type) {
    case int:
        fmt.Printf("Integer: %d\n", v)
    case string:
        fmt.Printf("String: %s\n", v)
    case Rectangle:
        fmt.Printf("Rectangle area: %.2f\n", v.Area())
    case Circle:
        fmt.Printf("Circle area: %.2f\n", v.Area())
    default:
        fmt.Printf("Unknown type: %T\n", v)
    }
}

func main() {
    // 使用接口
    shapes := []Geometry{
        Rectangle{Width: 10, Height: 5},
        Circle{Radius: 3},
        Rectangle{Width: 4, Height: 4},
    }

    for i, shape := range shapes {
        fmt.Printf("Shape %d: Area=%.2f, Perimeter=%.2f\n",
            i+1, shape.Area(), shape.Perimeter())
    }

    // 空接口示例
    var empty interface{}
    empty = 42
    describe(empty)

    empty = "hello"
    describe(empty)

    empty = Rectangle{Width: 3, Height: 4}
    describe(empty)

    // 类型断言
    processValue(100)
    processValue("Go")
    processValue(Rectangle{Width: 5, Height: 6})
    processValue(Circle{Radius: 2})
    processValue(true)
}
```

## 🚦 并发编程

### 1. Goroutines

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

// 简单的 goroutine 示例
func sayHello(name string) {
    for i := 0; i < 3; i++ {
        fmt.Printf("Hello from %s: %d\n", name, i)
        time.Sleep(100 * time.Millisecond)
    }
}

// 使用 WaitGroup 等待 goroutines 完成
func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Worker %d starting\n", id)
    time.Sleep(time.Second)
    fmt.Printf("Worker %d done\n", id)
}

// 计算密集型任务
func calculateSum(start, end int, result chan<- int) {
    sum := 0
    for i := start; i <= end; i++ {
        sum += i
    }
    result <- sum
}

func main() {
    fmt.Println("=== Basic Goroutines ===")

    // 启动 goroutines
    go sayHello("Alice")
    go sayHello("Bob")

    // 主 goroutine 等待
    time.Sleep(500 * time.Millisecond)

    fmt.Println("\n=== Using WaitGroup ===")

    var wg sync.WaitGroup

    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }

    wg.Wait()
    fmt.Println("All workers completed")

    fmt.Println("\n=== Parallel Calculation ===")

    // 并行计算 1-1000000 的和
    nums := 1000000
    numGoroutines := 4
    chunkSize := nums / numGoroutines

    results := make(chan int, numGoroutines)

    start := time.Now()

    for i := 0; i < numGoroutines; i++ {
        startRange := i*chunkSize + 1
        endRange := (i + 1) * chunkSize
        if i == numGoroutines-1 {
            endRange = nums
        }
        go calculateSum(startRange, endRange, results)
    }

    totalSum := 0
    for i := 0; i < numGoroutines; i++ {
        totalSum += <-results
    }

    duration := time.Since(start)
    fmt.Printf("Sum of 1-%d = %d, Time: %v\n", nums, totalSum, duration)
}
```

### 2. Channels

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

// 基础 channel 使用
func basicChannels() {
    fmt.Println("=== Basic Channels ===")

    // 创建 channel
    ch := make(chan string)

    // 在 goroutine 中发送数据
    go func() {
        ch <- "Hello"
        ch <- "World"
        close(ch)
    }()

    // 接收数据
    for msg := range ch {
        fmt.Println("Received:", msg)
    }
}

// 缓冲 channel
func bufferedChannels() {
    fmt.Println("\n=== Buffered Channels ===")

    ch := make(chan int, 3)

    // 发送数据（不会阻塞，因为有缓冲）
    ch <- 1
    ch <- 2
    ch <- 3

    fmt.Printf("Channel length: %d, capacity: %d\n", len(ch), cap(ch))

    // 接收数据
    fmt.Println("Received:", <-ch)
    fmt.Println("Received:", <-ch)
    fmt.Println("Received:", <-ch)
}

// 单向 channel
func unidirectionalChannels() {
    fmt.Println("\n=== Unidirectional Channels ===")

    ch := make(chan string)

    // 只发送的 channel
    go func(sendCh chan<- string) {
        sendCh <- "Data from sender"
        close(sendCh)
    }(ch)

    // 只接收的 channel
    func(receiveCh <-chan string) {
        for msg := range receiveCh {
            fmt.Println("Received:", msg)
        }
    }(ch)
}

// Select 语句
func selectStatement() {
    fmt.Println("\n=== Select Statement ===")

    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(100 * time.Millisecond)
        ch1 <- "From channel 1"
    }()

    go func() {
        time.Sleep(200 * time.Millisecond)
        ch2 <- "From channel 2"
    }()

    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-ch1:
            fmt.Println("Received from ch1:", msg1)
        case msg2 := <-ch2:
            fmt.Println("Received from ch2:", msg2)
        case <-time.After(300 * time.Millisecond):
            fmt.Println("Timeout!")
        }
    }
}

// 生产者-消费者模式
func producerConsumer() {
    fmt.Println("\n=== Producer-Consumer Pattern ===")

    jobs := make(chan int, 5)
    results := make(chan int, 5)

    // 生产者
    go func() {
        for i := 1; i <= 5; i++ {
            jobs <- i
            fmt.Printf("Sent job %d\n", i)
        }
        close(jobs)
    }()

    // 消费者
    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go func(workerID int) {
            defer wg.Done()
            for job := range jobs {
                fmt.Printf("Worker %d processing job %d\n", workerID, job)
                time.Sleep(100 * time.Millisecond)
                results <- job * 2
            }
        }(i)
    }

    // 等待所有工作完成并收集结果
    go func() {
        wg.Wait()
        close(results)
    }()

    for result := range results {
        fmt.Printf("Result: %d\n", result)
    }
}

func main() {
    basicChannels()
    bufferedChannels()
    unidirectionalChannels()
    selectStatement()
    producerConsumer()
}
```

### 3. 同步原语

```go
package main

import (
    "fmt"
    "sync"
    "sync/atomic"
    "time"
)

// Mutex 示例
func mutexExample() {
    fmt.Println("=== Mutex Example ===")

    var (
        counter int
        mutex   sync.Mutex
        wg      sync.WaitGroup
    )

    // 启动多个 goroutines 并发修改 counter
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            mutex.Lock()
            counter++
            mutex.Unlock()
        }()
    }

    wg.Wait()
    fmt.Printf("Final counter value: %d\n", counter)
}

// RWMutex 示例
func rwMutexExample() {
    fmt.Println("\n=== RWMutex Example ===")

    var (
        data    = make(map[string]int)
        rwMutex sync.RWMutex
        wg      sync.WaitGroup
    )

    // 写入数据
    wg.Add(1)
    go func() {
        defer wg.Done()
        for i := 0; i < 5; i++ {
            rwMutex.Lock()
            data[fmt.Sprintf("key%d", i)] = i
            fmt.Printf("Written key%d = %d\n", i, i)
            rwMutex.Unlock()
            time.Sleep(50 * time.Millisecond)
        }
    }()

    // 多个读取 goroutines
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func(readerID int) {
            defer wg.Done()
            for j := 0; j < 5; j++ {
                rwMutex.RLock()
                value, exists := data[fmt.Sprintf("key%d", j)]
                if exists {
                    fmt.Printf("Reader %d read key%d = %d\n", readerID, j, value)
                }
                rwMutex.RUnlock()
                time.Sleep(10 * time.Millisecond)
            }
        }(i)
    }

    wg.Wait()
}

// Once 示例
func onceExample() {
    fmt.Println("\n=== Once Example ===")

    var (
        once sync.Once
        wg   sync.WaitGroup
    )

    initialization := func() {
        fmt.Println("Expensive initialization performed")
        time.Sleep(100 * time.Millisecond)
    }

    // 多个 goroutines 尝试执行初始化
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Goroutine %d calling Do\n", id)
            once.Do(initialization)
            fmt.Printf("Goroutine %d finished\n", id)
        }(i)
    }

    wg.Wait()
}

// Atomic 操作示例
func atomicExample() {
    fmt.Println("\n=== Atomic Example ===")

    var (
        counter int64
        wg      sync.WaitGroup
    )

    // 使用 atomic 操作
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            atomic.AddInt64(&counter, 1)
        }()
    }

    wg.Wait()
    fmt.Printf("Atomic counter value: %d\n", atomic.LoadInt64(&counter))
}

// Cond 示例
func condExample() {
    fmt.Println("\n=== Cond Example ===")

    var (
        mutex   sync.Mutex
        cond    = sync.NewCond(&mutex)
        ready   bool
        wg      sync.WaitGroup
    )

    // 等待条件的 goroutines
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            mutex.Lock()
            for !ready {
                fmt.Printf("Goroutine %d waiting\n", id)
                cond.Wait()
            }
            fmt.Printf("Goroutine %d proceeding\n", id)
            mutex.Unlock()
        }(i)
    }

    // 触发条件
    time.Sleep(200 * time.Millisecond)
    mutex.Lock()
    ready = true
    fmt.Println("Condition met, broadcasting")
    cond.Broadcast()
    mutex.Unlock()

    wg.Wait()
}

func main() {
    mutexExample()
    rwMutexExample()
    onceExample()
    atomicExample()
    condExample()
}
```

## 🌐 网络编程

### 1. HTTP 服务器

```go
package main

import (
    "encoding/json"
    "fmt"
    "html/template"
    "log"
    "net/http"
    "strconv"
    "time"
)

// User 结构体
type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

// 模拟数据库
var users = []User{
    {ID: 1, Name: "Alice", Email: "alice@example.com"},
    {ID: 2, Name: "Bob", Email: "bob@example.com"},
    {ID: 3, Name: "Charlie", Email: "charlie@example.com"},
}

// 首页处理器
func homeHandler(w http.ResponseWriter, r *http.Request) {
    html := `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Go HTTP Server</title>
    </head>
    <body>
        <h1>Welcome to Go HTTP Server</h1>
        <p>Current time: {{.}}</p>
        <ul>
            <li><a href="/users">Get all users</a></li>
            <li><a href="/users/1">Get user by ID</a></li>
            <li><a href="/static/">Static files</a></li>
        </ul>
    </body>
    </html>
    `

    tmpl, err := template.New("home").Parse(html)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    tmpl.Execute(w, time.Now().Format(time.RFC3339))
}

// 获取所有用户
func getUsersHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

// 根据 ID 获取用户
func getUserHandler(w http.ResponseWriter, r *http.Request) {
    idStr := r.URL.Path[len("/users/"):]
    id, err := strconv.Atoi(idStr)
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    for _, user := range users {
        if user.ID == id {
            w.Header().Set("Content-Type", "application/json")
            json.NewEncoder(w).Encode(user)
            return
        }
    }

    http.Error(w, "User not found", http.StatusNotFound)
}

// 创建用户
func createUserHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    var user User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    user.ID = len(users) + 1
    users = append(users, user)

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}

// 中间件：日志记录
func loggingMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    }
}

// 中间件：CORS
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

        if r.Method == http.MethodOptions {
            w.WriteHeader(http.StatusOK)
            return
        }

        next(w, r)
    }
}

func main() {
    // 路由设置
    http.HandleFunc("/", loggingMiddleware(homeHandler))
    http.HandleFunc("/users", loggingMiddleware(corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
        switch r.Method {
        case http.MethodGet:
            getUsersHandler(w, r)
        case http.MethodPost:
            createUserHandler(w, r)
        default:
            http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        }
    })))
    http.HandleFunc("/users/", loggingMiddleware(getUserHandler))

    // 静态文件服务
    fs := http.FileServer(http.Dir("static/"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))

    fmt.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

### 2. HTTP 客户端

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "time"
)

type Post struct {
    UserID int    `json:"userId"`
    ID     int    `json:"id"`
    Title  string `json:"title"`
    Body   string `json:"body"`
}

// 简单 GET 请求
func simpleGet() {
    fmt.Println("=== Simple GET Request ===")

    resp, err := http.Get("https://jsonplaceholder.typicode.com/posts/1")
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        fmt.Printf("Error reading body: %v\n", err)
        return
    }

    var post Post
    if err := json.Unmarshal(body, &post); err != nil {
        fmt.Printf("Error parsing JSON: %v\n", err)
        return
    }

    fmt.Printf("Post: %+v\n", post)
}

// 带超时的 GET 请求
func getWithTimeout() {
    fmt.Println("\n=== GET Request with Timeout ===")

    client := &http.Client{
        Timeout: 5 * time.Second,
    }

    resp, err := client.Get("https://jsonplaceholder.typicode.com/posts")
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    defer resp.Body.Close()

    var posts []Post
    if err := json.NewDecoder(resp.Body).Decode(&posts); err != nil {
        fmt.Printf("Error decoding JSON: %v\n", err)
        return
    }

    fmt.Printf("Received %d posts\n", len(posts))
    if len(posts) > 0 {
        fmt.Printf("First post: %+v\n", posts[0])
    }
}

// POST 请求
func postRequest() {
    fmt.Println("\n=== POST Request ===")

    newPost := Post{
        UserID: 1,
        Title:  "Go HTTP Client Example",
        Body:   "This is a test post created with Go HTTP client",
    }

    jsonData, err := json.Marshal(newPost)
    if err != nil {
        fmt.Printf("Error marshaling JSON: %v\n", err)
        return
    }

    resp, err := http.Post("https://jsonplaceholder.typicode.com/posts",
        "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    defer resp.Body.Close()

    var createdPost Post
    if err := json.NewDecoder(resp.Body).Decode(&createdPost); err != nil {
        fmt.Printf("Error decoding response: %v\n", err)
        return
    }

    fmt.Printf("Created post: %+v\n", createdPost)
}

// 自定义请求头
func customHeaders() {
    fmt.Println("\n=== Custom Headers Request ===")

    client := &http.Client{}

    req, err := http.NewRequest("GET", "https://jsonplaceholder.typicode.com/posts/1", nil)
    if err != nil {
        fmt.Printf("Error creating request: %v\n", err)
        return
    }

    req.Header.Add("User-Agent", "Go-HTTP-Client/1.0")
    req.Header.Add("Accept", "application/json")
    req.Header.Add("Authorization", "Bearer your-token-here")

    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    defer resp.Body.Close()

    fmt.Printf("Status: %s\n", resp.Status)
    fmt.Printf("Content-Type: %s\n", resp.Header.Get("Content-Type"))

    var post Post
    if err := json.NewDecoder(resp.Body).Decode(&post); err != nil {
        fmt.Printf("Error decoding JSON: %v\n", err)
        return
    }

    fmt.Printf("Post: %+v\n", post)
}

func main() {
    simpleGet()
    getWithTimeout()
    postRequest()
    customHeaders()
}
```

## 🗄️ 数据库操作

### 1. SQL 数据库

```go
package main

import (
    "database/sql"
    "fmt"
    "log"
    "time"

    _ "github.com/lib/pq" // PostgreSQL driver
)

type User struct {
    ID        int       `db:"id"`
    Name      string    `db:"name"`
    Email     string    `db:"email"`
    CreatedAt time.Time `db:"created_at"`
}

func connectDB() (*sql.DB, error) {
    // 连接字符串，实际使用时请替换为真实的数据库信息
    connStr := "postgres://username:password@localhost/dbname?sslmode=disable"

    db, err := sql.Open("postgres", connStr)
    if err != nil {
        return nil, err
    }

    // 测试连接
    if err := db.Ping(); err != nil {
        return nil, err
    }

    // 设置连接池参数
    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(5)
    db.SetConnMaxLifetime(5 * time.Minute)

    return db, nil
}

func createTable(db *sql.DB) error {
    query := `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`

    _, err := db.Exec(query)
    return err
}

func insertUser(db *sql.DB, name, email string) (int, error) {
    query := `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING id`

    var id int
    err := db.QueryRow(query, name, email).Scan(&id)
    return id, err
}

func getUserByID(db *sql.DB, id int) (*User, error) {
    query := `
    SELECT id, name, email, created_at
    FROM users
    WHERE id = $1`

    user := &User{}
    err := db.QueryRow(query, id).Scan(
        &user.ID, &user.Name, &user.Email, &user.CreatedAt)

    if err != nil {
        return nil, err
    }

    return user, nil
}

func getAllUsers(db *sql.DB) ([]User, error) {
    query := `
    SELECT id, name, email, created_at
    FROM users
    ORDER BY created_at DESC`

    rows, err := db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var user User
        err := rows.Scan(&user.ID, &user.Name, &user.Email, &user.CreatedAt)
        if err != nil {
            return nil, err
        }
        users = append(users, user)
    }

    return users, rows.Err()
}

func updateUser(db *sql.DB, id int, name, email string) error {
    query := `
    UPDATE users
    SET name = $1, email = $2
    WHERE id = $3`

    result, err := db.Exec(query, name, email, id)
    if err != nil {
        return err
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        return err
    }

    if rowsAffected == 0 {
        return fmt.Errorf("user with id %d not found", id)
    }

    return nil
}

func deleteUser(db *sql.DB, id int) error {
    query := `DELETE FROM users WHERE id = $1`

    result, err := db.Exec(query, id)
    if err != nil {
        return err
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        return err
    }

    if rowsAffected == 0 {
        return fmt.Errorf("user with id %d not found", id)
    }

    return nil
}

// 事务示例
func transferExample(db *sql.DB) error {
    tx, err := db.Begin()
    if err != nil {
        return err
    }

    defer func() {
        if err != nil {
            tx.Rollback()
        } else {
            tx.Commit()
        }
    }()

    // 模拟转账操作
    _, err = tx.Exec("UPDATE accounts SET balance = balance - $1 WHERE id = $2", 100, 1)
    if err != nil {
        return err
    }

    _, err = tx.Exec("UPDATE accounts SET balance = balance + $1 WHERE id = $2", 100, 2)
    if err != nil {
        return err
    }

    return nil
}

func main() {
    db, err := connectDB()
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }
    defer db.Close()

    // 创建表
    if err := createTable(db); err != nil {
        log.Fatal("Failed to create table:", err)
    }

    // 插入用户
    id, err := insertUser(db, "Alice", "alice@example.com")
    if err != nil {
        log.Printf("Failed to insert user: %v", err)
    } else {
        fmt.Printf("Inserted user with ID: %d\n", id)
    }

    // 获取用户
    user, err := getUserByID(db, id)
    if err != nil {
        log.Printf("Failed to get user: %v", err)
    } else {
        fmt.Printf("User: %+v\n", user)
    }

    // 获取所有用户
    users, err := getAllUsers(db)
    if err != nil {
        log.Printf("Failed to get users: %v", err)
    } else {
        fmt.Printf("All users: %d\n", len(users))
        for _, u := range users {
            fmt.Printf("  %+v\n", u)
        }
    }

    // 更新用户
    if err := updateUser(db, id, "Alice Smith", "alice.smith@example.com"); err != nil {
        log.Printf("Failed to update user: %v", err)
    } else {
        fmt.Println("User updated successfully")
    }
}
```

## 🔧 实战项目

### 1. REST API 服务

```go
// main.go
package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "strconv"
    "strings"
    "time"

    "github.com/gorilla/mux"
)

type Book struct {
    ID          int       `json:"id"`
    Title       string    `json:"title"`
    Author      string    `json:"author"`
    ISBN        string    `json:"isbn"`
    PublishedAt time.Time `json:"published_at"`
    CreatedAt   time.Time `json:"created_at"`
}

type BookStore struct {
    books  []Book
    nextID int
}

func NewBookStore() *BookStore {
    return &BookStore{
        books:  make([]Book, 0),
        nextID: 1,
    }
}

func (bs *BookStore) GetBooks() []Book {
    return bs.books
}

func (bs *BookStore) GetBook(id int) (*Book, bool) {
    for i, book := range bs.books {
        if book.ID == id {
            return &bs.books[i], true
        }
    }
    return nil, false
}

func (bs *BookStore) CreateBook(book Book) Book {
    book.ID = bs.nextID
    book.CreatedAt = time.Now()
    bs.books = append(bs.books, book)
    bs.nextID++
    return book
}

func (bs *BookStore) UpdateBook(id int, updatedBook Book) (*Book, bool) {
    for i, book := range bs.books {
        if book.ID == id {
            updatedBook.ID = id
            updatedBook.CreatedAt = book.CreatedAt
            bs.books[i] = updatedBook
            return &bs.books[i], true
        }
    }
    return nil, false
}

func (bs *BookStore) DeleteBook(id int) bool {
    for i, book := range bs.books {
        if book.ID == id {
            bs.books = append(bs.books[:i], bs.books[i+1:]...)
            return true
        }
    }
    return false
}

type BookAPI struct {
    store *BookStore
}

func NewBookAPI() *BookAPI {
    return &BookAPI{
        store: NewBookStore(),
    }
}

func (api *BookAPI) GetBooksHandler(w http.ResponseWriter, r *http.Request) {
    books := api.store.GetBooks()

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "data": books,
        "count": len(books),
    })
}

func (api *BookAPI) GetBookHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
        http.Error(w, "Invalid book ID", http.StatusBadRequest)
        return
    }

    book, exists := api.store.GetBook(id)
    if !exists {
        http.Error(w, "Book not found", http.StatusNotFound)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "data": book,
    })
}

func (api *BookAPI) CreateBookHandler(w http.ResponseWriter, r *http.Request) {
    var book Book
    if err := json.NewDecoder(r.Body).Decode(&book); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    // 简单验证
    if book.Title == "" || book.Author == "" {
        http.Error(w, "Title and Author are required", http.StatusBadRequest)
        return
    }

    createdBook := api.store.CreateBook(book)

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]interface{}{
        "data": createdBook,
    })
}

func (api *BookAPI) UpdateBookHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
        http.Error(w, "Invalid book ID", http.StatusBadRequest)
        return
    }

    var book Book
    if err := json.NewDecoder(r.Body).Decode(&book); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    updatedBook, exists := api.store.UpdateBook(id, book)
    if !exists {
        http.Error(w, "Book not found", http.StatusNotFound)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "data": updatedBook,
    })
}

func (api *BookAPI) DeleteBookHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
        http.Error(w, "Invalid book ID", http.StatusBadRequest)
        return
    }

    if !api.store.DeleteBook(id) {
        http.Error(w, "Book not found", http.StatusNotFound)
        return
    }

    w.WriteHeader(http.StatusNoContent)
}

// 中间件
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}

func corsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }

        next.ServeHTTP(w, r)
    })
}

func main() {
    api := NewBookAPI()

    // 添加一些示例数据
    api.store.CreateBook(Book{
        Title:       "The Go Programming Language",
        Author:      "Alan Donovan, Brian Kernighan",
        ISBN:        "978-0134190440",
        PublishedAt: time.Date(2015, 11, 5, 0, 0, 0, 0, time.UTC),
    })

    api.store.CreateBook(Book{
        Title:       "Concurrency in Go",
        Author:      "Katherine Cox-Buday",
        ISBN:        "978-1491941195",
        PublishedAt: time.Date(2017, 8, 25, 0, 0, 0, 0, time.UTC),
    })

    // 路由设置
    r := mux.NewRouter()

    // API 路由
    apiRouter := r.PathPrefix("/api/v1").Subrouter()
    apiRouter.HandleFunc("/books", api.GetBooksHandler).Methods("GET")
    apiRouter.HandleFunc("/books", api.CreateBookHandler).Methods("POST")
    apiRouter.HandleFunc("/books/{id:[0-9]+}", api.GetBookHandler).Methods("GET")
    apiRouter.HandleFunc("/books/{id:[0-9]+}", api.UpdateBookHandler).Methods("PUT")
    apiRouter.HandleFunc("/books/{id:[0-9]+}", api.DeleteBookHandler).Methods("DELETE")

    // 健康检查
    r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(map[string]string{
            "status": "healthy",
            "time":   time.Now().Format(time.RFC3339),
        })
    }).Methods("GET")

    // 应用中间件
    handler := corsMiddleware(loggingMiddleware(r))

    fmt.Println("Server starting on :8080")
    fmt.Println("API endpoints:")
    fmt.Println("  GET    /api/v1/books")
    fmt.Println("  POST   /api/v1/books")
    fmt.Println("  GET    /api/v1/books/{id}")
    fmt.Println("  PUT    /api/v1/books/{id}")
    fmt.Println("  DELETE /api/v1/books/{id}")
    fmt.Println("  GET    /health")

    log.Fatal(http.ListenAndServe(":8080", handler))
}
```

## 📚 总结

Go 语言是一门现代化的编程语言，特别适合构建高性能的服务端应用。掌握以下要点：

### 🎯 核心要素
- **语法简洁**：清晰的语法和强类型系统
- **并发编程**：goroutines 和 channels 的优雅并发模型
- **标准库丰富**：覆盖网络、加密、数据库等常见需求
- **编译性能**：快速编译和高效执行

### 🛡️ 最佳实践
- **错误处理**：显式的错误处理机制
- **接口设计**：小而精的接口设计原则
- **代码规范**：使用 gofmt、golint 等工具
- **测试覆盖**：完善的测试框架和工具

### 🚀 应用领域
- **Web 服务**：高性能的 HTTP 服务和 API
- **微服务**：云原生微服务架构
- **系统工具**：命令行工具和系统软件
- **容器化**：Docker、Kubernetes 等容器技术

通过不断实践和学习，你将能够使用 Go 构建出高效、可靠、可维护的应用程序！

---

*拥抱 Go 的简洁与强大，构建下一代云原生应用！* 🎉