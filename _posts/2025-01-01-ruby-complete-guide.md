---
layout: post
title: "Ruby 完全学习指南：从入门到高级实战"
date: 2025-01-01 20:00:00 +0800
category: dev
tags: [Ruby, 编程语言, Web开发, Rails, 后端开发]
author: Kk
excerpt: "全面掌握Ruby编程语言，从基础语法到高级特性，包含实战项目和最佳实践"
diagram: |
  graph TB
      subgraph "Ruby生态系统"
          subgraph "核心语言 Core Language"
              RUBY[Ruby解释器]
              SYNTAX[语法特性]
              OOP[面向对象编程]
              META[元编程]
              BLOCKS[块和迭代器]
          end

          subgraph "标准库 Standard Library"
              STD_LIB[标准库]
              IO[文件I/O]
              NET[网络编程]
              JSON_LIB[JSON处理]
              TIME_LIB[时间处理]
              REGEX[正则表达式]
          end

          subgraph "包管理 Package Management"
              GEM[RubyGems]
              BUNDLER[Bundler]
              GEMFILE[Gemfile]
              GEMSPEC[Gemspec]
          end

          subgraph "Web框架 Web Frameworks"
              RAILS[Ruby on Rails]
              SINATRA[Sinatra]
              HANAMI[Hanami]
              GRAPE[Grape API]
              RACK[Rack]
          end

          subgraph "测试框架 Testing"
              RSPEC[RSpec]
              MINITEST[MiniTest]
              FACTORY[FactoryBot]
              CUCUMBER[Cucumber]
              CAPYBARA[Capybara]
          end

          subgraph "数据库 Database"
              AR[ActiveRecord]
              SEQUEL[Sequel]
              ROM[ROM.rb]
              MONGO[Mongoid]
          end

          subgraph "部署工具 Deployment"
              CAPISTRANO[Capistrano]
              MINA[Mina]
              DOCKER_RUBY[Docker]
              HEROKU[Heroku]
              PUMA[Puma Server]
          end

          subgraph "开发工具 Development Tools"
              IRB[IRB控制台]
              PRY[Pry调试器]
              RUBOCOP[RuboCop]
              GUARD[Guard]
              YARD[YARD文档]
          end
      end

      RUBY --> SYNTAX
      RUBY --> OOP
      RUBY --> META
      RUBY --> BLOCKS
      RUBY --> STD_LIB

      STD_LIB --> IO
      STD_LIB --> NET
      STD_LIB --> JSON_LIB
      STD_LIB --> TIME_LIB
      STD_LIB --> REGEX

      GEM --> BUNDLER
      BUNDLER --> GEMFILE
      GEM --> GEMSPEC

      RUBY --> RAILS
      RAILS --> AR
      RAILS --> RACK
      RUBY --> SINATRA
      SINATRA --> RACK

      RUBY --> RSPEC
      RUBY --> MINITEST
      RSPEC --> FACTORY
      RSPEC --> CAPYBARA

      RAILS --> CAPISTRANO
      RAILS --> PUMA
      RAILS --> HEROKU

      RUBY --> IRB
      RUBY --> PRY
      RUBY --> RUBOCOP

      style RUBY fill:#cc342d,stroke:#fff,stroke-width:2px,color:#fff
      style RAILS fill:#dc382d,stroke:#fff,stroke-width:2px,color:#fff
      style GEM fill:#e9573f,stroke:#fff,stroke-width:2px,color:#fff
      style RSPEC fill:#87ceeb,stroke:#fff,stroke-width:2px,color:#000
      style AR fill:#ff6b6b,stroke:#fff,stroke-width:2px,color:#fff
      style BUNDLER fill:#4ecdc4,stroke:#fff,stroke-width:2px,color:#fff
      style RUBOCOP fill:#000000,stroke:#fff,stroke-width:2px,color:#fff
      style PRY fill:#ffffff,stroke:#000,stroke-width:2px,color:#000
---

# Ruby 完全学习指南：从入门到高级实战

## 🚀 Ruby 简介

Ruby 是一种动态、开源的编程语言，注重简洁性和生产力。它拥有优雅的语法，易于阅读和编写。Ruby 遵循"程序员快乐原则"，让编程变得有趣而高效。

### 核心特点

- **🎨 优雅简洁**: 语法清晰，接近自然语言
- **🔄 完全面向对象**: 一切皆对象
- **🎯 动态灵活**: 支持元编程和动态类型
- **🌐 丰富生态**: 庞大的 Gem 生态系统
- **🚀 快速开发**: 提高开发效率

## 📦 环境搭建

### 使用 rbenv 安装 Ruby（推荐）

```bash
# 安装 rbenv
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash

# 配置环境变量
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc

# 安装最新版 Ruby
rbenv install 3.2.0
rbenv global 3.2.0

# 验证安装
ruby --version
```

### 使用 RVM 安装

```bash
# 安装 RVM
curl -L https://get.rvm.io | bash -s stable

# 重载 shell
source ~/.rvm/scripts/rvm

# 安装 Ruby
rvm install 3.2.0
rvm use 3.2.0 --default

# 验证安装
ruby --version
gem --version
```

### 配置开发环境

```bash
# 安装 Bundler
gem install bundler

# 安装常用开发工具
gem install pry rubocop yard

# 配置 Git（如果还没配置）
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 🎯 基础语法

### 1. 变量和数据类型

```ruby
# 数字类型
integer = 42
float = 3.14
complex = 1 + 2i
rational = Rational(1, 3)

# 字符串
name = "Ruby"
message = 'Hello, World!'
interpolation = "Hello, #{name}!"

# 符号 (Symbol)
status = :active
config = { database: :postgresql, cache: :redis }

# 数组
numbers = [1, 2, 3, 4, 5]
mixed = ["string", 42, :symbol, [1, 2]]
range_array = (1..10).to_a

# 哈希
person = {
  name: "Alice",
  age: 30,
  city: "Tokyo"
}

# 布尔值
is_ruby_awesome = true
is_difficult = false
nothing = nil
```

### 2. 字符串操作

```ruby
# 字符串基本操作
text = "Ruby Programming"

# 长度和检查
puts text.length          # 16
puts text.empty?          # false
puts text.include?("Ruby") # true

# 大小写转换
puts text.upcase          # "RUBY PROGRAMMING"
puts text.downcase        # "ruby programming"
puts text.capitalize      # "Ruby programming"

# 分割和连接
words = text.split(" ")   # ["Ruby", "Programming"]
joined = words.join("-")  # "Ruby-Programming"

# 替换和修剪
replaced = text.gsub("Ruby", "Python")  # "Python Programming"
trimmed = "  hello  ".strip             # "hello"

# 多行字符串
heredoc = <<~TEXT
  这是一个多行字符串
  可以保持格式
  很方便处理长文本
TEXT
```

### 3. 数组操作

```ruby
# 创建和初始化
numbers = [1, 2, 3, 4, 5]
letters = %w[a b c d e]  # ["a", "b", "c", "d", "e"]

# 添加和删除元素
numbers << 6              # [1, 2, 3, 4, 5, 6]
numbers.push(7, 8)        # [1, 2, 3, 4, 5, 6, 7, 8]
numbers.unshift(0)        # [0, 1, 2, 3, 4, 5, 6, 7, 8]

first = numbers.shift     # 0, numbers = [1, 2, 3, 4, 5, 6, 7, 8]
last = numbers.pop        # 8, numbers = [1, 2, 3, 4, 5, 6, 7]

# 访问元素
puts numbers[0]           # 1
puts numbers[-1]          # 7
puts numbers[1, 3]        # [2, 3, 4]
puts numbers[1..3]        # [2, 3, 4]

# 迭代方法
numbers.each { |n| puts n }
squares = numbers.map { |n| n * n }
evens = numbers.select { |n| n.even? }
sum = numbers.reduce(:+)  # 或 numbers.sum
```

### 4. 哈希操作

```ruby
# 创建哈希
person = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
}

# 访问和修改
puts person[:name]        # "Alice"
person[:city] = "Tokyo"   # 添加新键值对
person[:age] = 31         # 修改现有值

# 哈希方法
puts person.keys          # [:name, :age, :email, :city]
puts person.values        # ["Alice", 31, "alice@example.com", "Tokyo"]
puts person.length        # 4

# 迭代哈希
person.each do |key, value|
  puts "#{key}: #{value}"
end

# 合并和选择
defaults = { theme: "dark", language: "en" }
config = defaults.merge(person)

adults = { alice: 30, bob: 25, charlie: 17 }
adult_only = adults.select { |name, age| age >= 18 }
```

## 🔧 控制结构

### 1. 条件语句

```ruby
# if/elsif/else
age = 25

if age < 18
  puts "未成年"
elsif age < 65
  puts "成年人"
else
  puts "老年人"
end

# 单行条件
puts "可以投票" if age >= 18
puts "不能饮酒" unless age >= 21

# case 语句
grade = "A"

result = case grade
when "A"
  "优秀"
when "B"
  "良好"
when "C"
  "及格"
else
  "不及格"
end

# 多值匹配
day = "Saturday"

weekend = case day
when "Saturday", "Sunday"
  true
else
  false
end
```

### 2. 循环结构

```ruby
# while 循环
counter = 0
while counter < 5
  puts "计数: #{counter}"
  counter += 1
end

# until 循环
number = 0
until number > 10
  puts number
  number += 2
end

# for 循环
for i in 1..5
  puts "数字: #{i}"
end

# 迭代器（Ruby 风格）
5.times { |i| puts "第 #{i + 1} 次" }

(1..5).each { |i| puts "数字: #{i}" }

# 循环控制
(1..10).each do |i|
  next if i.even?    # 跳过偶数
  break if i > 7     # 大于7时退出
  puts i
end
```

## 🎭 面向对象编程

### 1. 类和对象

```ruby
# 定义类
class Person
  # 类变量
  @@count = 0

  # 构造方法
  def initialize(name, age)
    @name = name  # 实例变量
    @age = age
    @@count += 1
  end

  # 实例方法
  def introduce
    "我是 #{@name}，今年 #{@age} 岁"
  end

  def birthday
    @age += 1
    puts "生日快乐！现在 #{@age} 岁了"
  end

  # getter 和 setter
  def name
    @name
  end

  def name=(new_name)
    @name = new_name
  end

  # 使用 attr_* 快捷方法
  attr_reader :age      # 只读
  attr_writer :email    # 只写
  attr_accessor :city   # 读写

  # 类方法
  def self.count
    @@count
  end

  # 私有方法
  private

  def secret_method
    "这是私有方法"
  end
end

# 使用类
person1 = Person.new("Alice", 25)
person2 = Person.new("Bob", 30)

puts person1.introduce  # "我是 Alice，今年 25 岁"
person1.birthday        # "生日快乐！现在 26 岁了"

puts Person.count       # 2
```

### 2. 继承

```ruby
# 父类
class Animal
  def initialize(name)
    @name = name
  end

  def speak
    "#{@name} 发出声音"
  end

  def move
    "#{@name} 在移动"
  end
end

# 子类
class Dog < Animal
  def initialize(name, breed)
    super(name)  # 调用父类构造方法
    @breed = breed
  end

  def speak    # 重写父类方法
    "#{@name} 汪汪叫"
  end

  def fetch
    "#{@name} 去捡球"
  end
end

class Cat < Animal
  def speak
    "#{@name} 喵喵叫"
  end

  def climb
    "#{@name} 爬树"
  end
end

# 使用继承
dog = Dog.new("旺财", "拉布拉多")
cat = Cat.new("咪咪", "波斯猫")

puts dog.speak    # "旺财 汪汪叫"
puts cat.speak    # "咪咪 喵喵叫"
puts dog.fetch    # "旺财 去捡球"
```

### 3. 模块和 Mixin

```ruby
# 定义模块
module Greetings
  def say_hello
    "Hello!"
  end

  def say_goodbye
    "Goodbye!"
  end
end

module MathUtils
  PI = 3.14159

  def self.circle_area(radius)
    PI * radius * radius
  end

  def square(number)
    number * number
  end
end

# 使用模块
class Person
  include Greetings  # 包含模块方法作为实例方法
  extend MathUtils   # 扩展模块方法作为类方法

  def initialize(name)
    @name = name
  end
end

person = Person.new("Alice")
puts person.say_hello     # "Hello!"
puts Person.square(5)     # 25

# 直接使用模块
puts MathUtils.circle_area(10)  # 314.159
```

## 🎪 高级特性

### 1. 块（Blocks）和迭代器

```ruby
# 基本块语法
[1, 2, 3, 4, 5].each { |num| puts num * 2 }

# 多行块
[1, 2, 3, 4, 5].each do |num|
  square = num * num
  puts "#{num} 的平方是 #{square}"
end

# 自定义迭代器
class TodoList
  def initialize
    @items = []
  end

  def add_item(item)
    @items << item
  end

  def each
    @items.each { |item| yield(item) }
  end
end

todo = TodoList.new
todo.add_item("买菜")
todo.add_item("写代码")
todo.add_item("锻炼")

todo.each { |item| puts "- #{item}" }

# Proc 和 Lambda
# Proc
my_proc = Proc.new { |x| x * 2 }
puts my_proc.call(5)  # 10

# Lambda
my_lambda = lambda { |x| x * 2 }
# 或者
my_lambda = ->(x) { x * 2 }
puts my_lambda.call(5)  # 10

# 将块转换为 Proc
def call_block(&block)
  block.call("Hello")
end

call_block { |msg| puts msg.upcase }  # "HELLO"
```

### 2. 元编程

```ruby
# 动态定义方法
class DynamicClass
  # 使用 define_method
  ["create", "read", "update", "delete"].each do |action|
    define_method("#{action}_user") do |id|
      puts "#{action.capitalize}ing user with ID: #{id}"
    end
  end

  # method_missing
  def method_missing(method_name, *args)
    if method_name.to_s.start_with?("find_by_")
      attribute = method_name.to_s.sub("find_by_", "")
      puts "查找 #{attribute} 为 #{args.first} 的记录"
    else
      super
    end
  end

  def respond_to_missing?(method_name, include_private = false)
    method_name.to_s.start_with?("find_by_") || super
  end
end

obj = DynamicClass.new
obj.create_user(123)        # "Creating user with ID: 123"
obj.find_by_email("a@b.c")  # "查找 email 为 a@b.c 的记录"

# 类的动态修改
class String
  def palindrome?
    self == self.reverse
  end
end

puts "level".palindrome?  # true
puts "hello".palindrome?  # false

# 使用 send 调用方法
class Calculator
  def add(a, b)
    a + b
  end

  def multiply(a, b)
    a * b
  end
end

calc = Calculator.new
operation = "add"
result = calc.send(operation, 5, 3)  # 8
```

### 3. 异常处理

```ruby
# 基本异常处理
begin
  # 可能出错的代码
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "除零错误: #{e.message}"
rescue StandardError => e
  puts "其他错误: #{e.message}"
ensure
  puts "这里的代码总是会执行"
end

# 自定义异常
class CustomError < StandardError
  def initialize(message = "自定义错误")
    super(message)
  end
end

def risky_operation(value)
  raise CustomError, "值不能为负数" if value < 0
  Math.sqrt(value)
end

begin
  result = risky_operation(-1)
rescue CustomError => e
  puts e.message
end

# retry 重试机制
attempts = 0
begin
  attempts += 1
  puts "尝试第 #{attempts} 次"
  # 模拟可能失败的操作
  raise "随机失败" if rand < 0.7
  puts "成功！"
rescue
  retry if attempts < 3
  puts "尝试 3 次后仍然失败"
end
```

## 📚 文件和 I/O 操作

### 1. 文件读写

```ruby
# 读取文件
# 一次性读取整个文件
content = File.read("example.txt")

# 逐行读取
File.foreach("example.txt") do |line|
  puts line
end

# 使用块自动关闭文件
File.open("example.txt", "r") do |file|
  content = file.read
  puts content
end

# 写入文件
File.open("output.txt", "w") do |file|
  file.write("Hello, Ruby!")
  file.puts "这是新的一行"
end

# 追加内容
File.open("output.txt", "a") do |file|
  file.puts "追加的内容"
end

# 文件操作
puts File.exist?("example.txt")    # 检查文件是否存在
puts File.size("example.txt")      # 获取文件大小
puts File.mtime("example.txt")     # 获取修改时间

# 目录操作
Dir.mkdir("new_directory") unless Dir.exist?("new_directory")
Dir.foreach(".") { |file| puts file }  # 列出当前目录文件
```

### 2. JSON 处理

```ruby
require 'json'

# 对象转 JSON
person = {
  name: "Alice",
  age: 30,
  hobbies: ["reading", "coding", "traveling"]
}

json_string = JSON.generate(person)
puts json_string

# JSON 转对象
parsed = JSON.parse(json_string)
puts parsed["name"]  # "Alice"

# 从文件读取 JSON
data = JSON.parse(File.read("data.json"))

# 写入 JSON 文件
File.open("output.json", "w") do |file|
  file.write(JSON.pretty_generate(person))
end
```

## 🧪 测试

### 1. 使用 MiniTest

```ruby
require 'minitest/autorun'

class Calculator
  def add(a, b)
    a + b
  end

  def divide(a, b)
    raise ArgumentError, "不能除以零" if b == 0
    a / b
  end
end

class CalculatorTest < Minitest::Test
  def setup
    @calc = Calculator.new
  end

  def test_addition
    assert_equal 5, @calc.add(2, 3)
    assert_equal 0, @calc.add(-1, 1)
  end

  def test_division
    assert_equal 2, @calc.divide(6, 3)
    assert_raises(ArgumentError) { @calc.divide(5, 0) }
  end
end
```

### 2. 使用 RSpec

```ruby
# Gemfile
# gem 'rspec'

# spec/calculator_spec.rb
require_relative '../calculator'

RSpec.describe Calculator do
  let(:calc) { Calculator.new }

  describe '#add' do
    it '正确地加两个数' do
      expect(calc.add(2, 3)).to eq(5)
    end

    it '处理负数' do
      expect(calc.add(-1, 1)).to eq(0)
    end
  end

  describe '#divide' do
    it '正确地除两个数' do
      expect(calc.divide(6, 3)).to eq(2)
    end

    it '除以零时抛出错误' do
      expect { calc.divide(5, 0) }.to raise_error(ArgumentError)
    end
  end
end

# 运行测试
# rspec spec/calculator_spec.rb
```

## 🌐 Web 开发入门

### 1. 使用 Sinatra 创建简单 Web 应用

```ruby
# Gemfile
# gem 'sinatra'

require 'sinatra'
require 'json'

# 路由定义
get '/' do
  "Hello, Ruby Web!"
end

get '/users' do
  content_type :json
  users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
  ]
  users.to_json
end

get '/users/:id' do
  content_type :json
  id = params[:id].to_i
  user = { id: id, name: "User #{id}", email: "user#{id}@example.com" }
  user.to_json
end

post '/users' do
  content_type :json
  data = JSON.parse(request.body.read)
  # 这里应该保存到数据库
  { status: "created", user: data }.to_json
end

# 启动服务器
# ruby app.rb
```

### 2. Rails 快速入门

```bash
# 安装 Rails
gem install rails

# 创建新应用
rails new blog_app
cd blog_app

# 生成控制器
rails generate controller Articles index show new create

# 生成模型
rails generate model Article title:string content:text

# 运行迁移
rails db:migrate

# 启动服务器
rails server
```

```ruby
# app/models/article.rb
class Article < ApplicationRecord
  validates :title, presence: true, length: { minimum: 5 }
  validates :content, presence: true
end

# app/controllers/articles_controller.rb
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article
    else
      render :new
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :content)
  end
end
```

## 📦 Gem 开发

### 1. 创建自己的 Gem

```bash
# 创建 gem 结构
bundle gem my_awesome_gem
cd my_awesome_gem
```

```ruby
# lib/my_awesome_gem.rb
require_relative "my_awesome_gem/version"
require_relative "my_awesome_gem/string_utils"

module MyAwesomeGem
  class Error < StandardError; end

  def self.hello(name = "World")
    "Hello, #{name}!"
  end
end

# lib/my_awesome_gem/string_utils.rb
module MyAwesomeGem
  module StringUtils
    def self.reverse_words(text)
      text.split.map(&:reverse).join(" ")
    end

    def self.count_vowels(text)
      text.downcase.count("aeiou")
    end
  end
end

# my_awesome_gem.gemspec
Gem::Specification.new do |spec|
  spec.name          = "my_awesome_gem"
  spec.version       = MyAwesomeGem::VERSION
  spec.authors       = ["Your Name"]
  spec.email         = ["your.email@example.com"]

  spec.summary       = "一个很棒的 Ruby gem"
  spec.description   = "提供字符串处理和其他实用功能的 gem"
  spec.homepage      = "https://github.com/username/my_awesome_gem"
  spec.license       = "MIT"

  spec.files         = Dir["lib/**/*"]
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "rake", "~> 13.0"
  spec.add_development_dependency "rspec", "~> 3.0"
end
```

### 2. 测试和发布

```ruby
# spec/my_awesome_gem_spec.rb
require "spec_helper"

RSpec.describe MyAwesomeGem do
  it "有版本号" do
    expect(MyAwesomeGem::VERSION).not_to be nil
  end

  it "能够打招呼" do
    expect(MyAwesomeGem.hello).to eq("Hello, World!")
    expect(MyAwesomeGem.hello("Ruby")).to eq("Hello, Ruby!")
  end
end

RSpec.describe MyAwesomeGem::StringUtils do
  describe '.reverse_words' do
    it "反转单词中的字符" do
      result = MyAwesomeGem::StringUtils.reverse_words("hello world")
      expect(result).to eq("olleh dlrow")
    end
  end

  describe '.count_vowels' do
    it "计算元音字母数量" do
      count = MyAwesomeGem::StringUtils.count_vowels("hello")
      expect(count).to eq(2)
    end
  end
end
```

```bash
# 运行测试
bundle exec rspec

# 构建 gem
gem build my_awesome_gem.gemspec

# 发布到 RubyGems
gem push my_awesome_gem-0.1.0.gem
```

## 🛠️ 开发工具和最佳实践

### 1. 代码质量工具

```bash
# 安装 RuboCop
gem install rubocop

# 检查代码风格
rubocop

# 自动修复
rubocop -A

# 配置文件 .rubocop.yml
AllCops:
  TargetRubyVersion: 3.2
  NewCops: enable

Style/StringLiterals:
  Enabled: true
  EnforcedStyle: double_quotes

Metrics/LineLength:
  Max: 120
```

### 2. 调试工具

```ruby
# 使用 Pry 调试
require 'pry'

def complex_calculation(x, y)
  binding.pry  # 在这里暂停执行
  result = x * y + 10
  result / 2
end

complex_calculation(5, 3)

# 在 Pry 控制台中可以：
# - 查看变量值
# - 执行代码
# - 单步调试
```

### 3. 性能分析

```ruby
# 使用 Benchmark
require 'benchmark'

n = 100000
Benchmark.bm do |x|
  x.report("each:") { (1..n).each { |i| i * 2 } }
  x.report("map:") { (1..n).map { |i| i * 2 } }
  x.report("times:") { n.times { |i| i * 2 } }
end

# 内存分析
require 'memory_profiler'

report = MemoryProfiler.report do
  # 要分析的代码
  1000.times { "hello" + "world" }
end

report.pretty_print
```

## 🎯 实战项目：待办事项应用

### 1. 项目结构

```
todo_app/
├── lib/
│   ├── todo_app.rb
│   ├── todo_item.rb
│   ├── todo_list.rb
│   └── cli.rb
├── spec/
│   ├── spec_helper.rb
│   ├── todo_item_spec.rb
│   └── todo_list_spec.rb
├── bin/
│   └── todo
├── Gemfile
└── README.md
```

### 2. 核心代码

```ruby
# lib/todo_item.rb
class TodoItem
  attr_accessor :title, :description, :completed, :created_at

  def initialize(title, description = "")
    @title = title
    @description = description
    @completed = false
    @created_at = Time.now
  end

  def complete!
    @completed = true
  end

  def incomplete!
    @completed = false
  end

  def completed?
    @completed
  end

  def to_s
    status = completed? ? "✓" : "○"
    "#{status} #{title}"
  end
end

# lib/todo_list.rb
require_relative 'todo_item'
require 'json'

class TodoList
  attr_reader :items

  def initialize
    @items = []
  end

  def add_item(title, description = "")
    item = TodoItem.new(title, description)
    @items << item
    item
  end

  def complete_item(index)
    return false unless valid_index?(index)
    @items[index].complete!
    true
  end

  def remove_item(index)
    return nil unless valid_index?(index)
    @items.delete_at(index)
  end

  def list_items(filter = :all)
    case filter
    when :completed
      @items.select(&:completed?)
    when :pending
      @items.reject(&:completed?)
    else
      @items
    end
  end

  def save_to_file(filename)
    data = @items.map do |item|
      {
        title: item.title,
        description: item.description,
        completed: item.completed,
        created_at: item.created_at.to_s
      }
    end

    File.write(filename, JSON.pretty_generate(data))
  end

  def load_from_file(filename)
    return unless File.exist?(filename)

    data = JSON.parse(File.read(filename))
    @items = data.map do |item_data|
      item = TodoItem.new(item_data['title'], item_data['description'])
      item.completed = item_data['completed']
      item.created_at = Time.parse(item_data['created_at'])
      item
    end
  end

  private

  def valid_index?(index)
    index >= 0 && index < @items.length
  end
end

# lib/cli.rb
require_relative 'todo_list'

class CLI
  def initialize
    @todo_list = TodoList.new
    @filename = File.expand_path("~/.todo_list.json")
    @todo_list.load_from_file(@filename)
  end

  def start
    puts "欢迎使用待办事项应用！"
    puts "输入 'help' 查看可用命令"

    loop do
      print "\n> "
      input = gets.chomp.split
      command = input[0]
      args = input[1..-1]

      case command
      when 'help'
        show_help
      when 'add'
        add_item(args)
      when 'list'
        list_items(args[0])
      when 'complete'
        complete_item(args[0])
      when 'remove'
        remove_item(args[0])
      when 'save'
        save_items
      when 'quit', 'exit'
        save_items
        puts "再见！"
        break
      else
        puts "未知命令。输入 'help' 查看可用命令。"
      end
    end
  end

  private

  def show_help
    puts <<~HELP
      可用命令:
      add <标题> [描述]     - 添加新待办事项
      list [all|pending|completed] - 列出待办事项
      complete <索引>      - 标记事项为完成
      remove <索引>        - 删除事项
      save                - 保存到文件
      quit/exit           - 退出应用
    HELP
  end

  def add_item(args)
    if args.empty?
      puts "请提供标题"
      return
    end

    title = args[0]
    description = args[1..-1].join(" ")

    @todo_list.add_item(title, description)
    puts "已添加: #{title}"
  end

  def list_items(filter = "all")
    filter_sym = filter&.to_sym || :all
    items = @todo_list.list_items(filter_sym)

    if items.empty?
      puts "没有待办事项"
      return
    end

    puts "\n待办事项:"
    items.each_with_index do |item, index|
      puts "#{index + 1}. #{item}"
    end
  end

  def complete_item(index_str)
    index = index_str.to_i - 1

    if @todo_list.complete_item(index)
      puts "已完成事项"
    else
      puts "无效的索引"
    end
  end

  def remove_item(index_str)
    index = index_str.to_i - 1

    if @todo_list.remove_item(index)
      puts "已删除事项"
    else
      puts "无效的索引"
    end
  end

  def save_items
    @todo_list.save_to_file(@filename)
    puts "已保存到 #{@filename}"
  end
end

# bin/todo (可执行文件)
#!/usr/bin/env ruby

require_relative '../lib/cli'

CLI.new.start
```

### 3. 测试

```ruby
# spec/todo_item_spec.rb
require_relative '../lib/todo_item'

RSpec.describe TodoItem do
  let(:item) { TodoItem.new("测试任务", "这是一个测试") }

  describe '#initialize' do
    it '创建新的待办事项' do
      expect(item.title).to eq("测试任务")
      expect(item.description).to eq("这是一个测试")
      expect(item.completed?).to be false
    end
  end

  describe '#complete!' do
    it '标记事项为完成' do
      item.complete!
      expect(item.completed?).to be true
    end
  end

  describe '#to_s' do
    it '返回格式化字符串' do
      expect(item.to_s).to eq("○ 测试任务")

      item.complete!
      expect(item.to_s).to eq("✓ 测试任务")
    end
  end
end
```

## 📚 学习资源

### 在线资源
- [Ruby 官方文档](https://ruby-doc.org/)
- [Ruby Guides](https://www.rubyguides.com/)
- [The Odin Project](https://www.theodinproject.com/)
- [Ruby Koans](http://rubykoans.com/) - 交互式学习

### 推荐书籍
- 《Ruby程序设计语言》- Matz & David Flanagan
- 《Effective Ruby》- Peter J. Jones
- 《Ruby元编程》- Paolo Perrotta
- 《Rails 教程》- Michael Hartl

### 练习平台
- [Codewars](https://www.codewars.com/)
- [Exercism](https://exercism.io/tracks/ruby)
- [HackerRank](https://www.hackerrank.com/domains/ruby)

## 🎯 学习路径建议

### 初学者（1-2个月）
1. ✅ 基础语法和数据类型
2. ✅ 控制结构和方法
3. ✅ 面向对象编程基础
4. ✅ 文件操作和异常处理
5. ✅ 完成小项目（如计算器、待办应用）

### 中级（2-4个月）
1. ✅ 高级面向对象特性
2. ✅ 元编程和反射
3. ✅ 测试驱动开发
4. ✅ Web 开发基础（Sinatra）
5. ✅ 数据库操作

### 高级（4-6个月）
1. ✅ Rails 框架深入
2. ✅ 性能优化
3. ✅ 设计模式
4. ✅ 开源贡献
5. ✅ 生产环境部署

## 🚀 总结

Ruby 是一种优雅而强大的编程语言，以其简洁的语法和强大的表达能力而闻名。通过本指南，你应该已经掌握了：

- **基础语法**：变量、数据类型、控制结构
- **面向对象**：类、继承、模块
- **高级特性**：元编程、块、异常处理
- **实战技能**：文件操作、测试、Web开发
- **工具链**：Gem管理、调试、性能分析

记住，学习编程最重要的是**实践**。多写代码，多做项目，多参与开源社区。Ruby 社区非常友好和活跃，不要害怕提问和分享。

祝你在 Ruby 的学习道路上一帆风顺！🎉

---

> 💡 **小贴士**: 坚持每天编码，即使只是15分钟。consistency beats intensity！