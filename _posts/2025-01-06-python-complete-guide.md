---
layout: post
title: "Python 完全指南：从入门到精通实战"
date: 2025-01-06 20:00:00 +0800
category: Dev
tags: [Python, 编程语言, Web开发, 数据科学, 人工智能, 自动化]
author: Kk
excerpt: "全面掌握Python编程语言，从基础语法到高级特性，涵盖Web开发、数据科学和人工智能实战"
diagram: |
  graph TB
      subgraph "Python生态系统"
          subgraph "核心语言 Core Language"
              PYTHON[Python解释器]
              SYNTAX[语法特性]
              OOP[面向对象编程]
              FUNCTIONAL[函数式编程]
              DECORATORS[装饰器]
              GENERATORS[生成器]
              METACLASSES[元类]
          end

          subgraph "标准库 Standard Library"
              STD_LIB[标准库]
              OS[系统操作]
              JSON_LIB[JSON处理]
              DATETIME[日期时间]
              REGEX[正则表达式]
              COLLECTIONS[集合类型]
              ITERTOOLS[迭代工具]
              THREADING[多线程]
              MULTIPROCESSING[多进程]
          end

          subgraph "包管理 Package Management"
              PIP[pip包管理器]
              PYPI[PyPI仓库]
              VIRTUALENV[虚拟环境]
              CONDA[Conda]
              PIPENV[Pipenv]
              POETRY[Poetry]
              REQUIREMENTS[requirements.txt]
          end

          subgraph "Web框架 Web Frameworks"
              DJANGO[Django框架]
              FLASK[Flask框架]
              FASTAPI[FastAPI框架]
              TORNADO[Tornado框架]
              PYRAMID[Pyramid框架]
              BOTTLE[Bottle框架]
              STARLETTE[Starlette框架]
          end

          subgraph "数据科学 Data Science"
              NUMPY[NumPy数值计算]
              PANDAS[Pandas数据分析]
              MATPLOTLIB[Matplotlib可视化]
              SEABORN[Seaborn统计可视化]
              SCIPY[SciPy科学计算]
              SCIKIT_LEARN[Scikit-learn机器学习]
              JUPYTER[Jupyter Notebook]
          end

          subgraph "人工智能 AI/ML"
              TENSORFLOW[TensorFlow]
              PYTORCH[PyTorch]
              KERAS[Keras]
              OPENCV[OpenCV计算机视觉]
              NLTK[NLTK自然语言处理]
              SPACY[spaCy]
              TRANSFORMERS[Transformers]
          end

          subgraph "异步编程 Async Programming"
              ASYNCIO[asyncio]
              AIOHTTP[aiohttp]
              UVLOOP[uvloop]
              ASYNCPG[asyncpg]
              CELERY[Celery任务队列]
          end

          subgraph "数据库 Database"
              SQLALCHEMY[SQLAlchemy ORM]
              DJANGO_ORM[Django ORM]
              PYMONGO[PyMongo]
              REDIS_PY[Redis-py]
              PSYCOPG2[psycopg2]
              SQLITE3[sqlite3]
          end

          subgraph "测试框架 Testing"
              PYTEST[pytest]
              UNITTEST[unittest]
              NOSE[nose2]
              MOCK[unittest.mock]
              COVERAGE[coverage.py]
              TOX[tox]
          end

          subgraph "开发工具 Development Tools"
              PYCHARM[PyCharm]
              VSCODE[VS Code]
              JUPYTER_LAB[JupyterLab]
              IPYTHON[IPython]
              BLACK[Black代码格式化]
              FLAKE8[Flake8代码检查]
              MYPY[MyPy类型检查]
          end
      end

      PYTHON --> SYNTAX
      PYTHON --> OOP
      PYTHON --> FUNCTIONAL
      PYTHON --> DECORATORS
      PYTHON --> STD_LIB

      STD_LIB --> OS
      STD_LIB --> JSON_LIB
      STD_LIB --> DATETIME
      STD_LIB --> THREADING
      STD_LIB --> MULTIPROCESSING

      PIP --> PYPI
      PIP --> VIRTUALENV
      CONDA --> VIRTUALENV
      POETRY --> REQUIREMENTS

      PYTHON --> DJANGO
      PYTHON --> FLASK
      PYTHON --> FASTAPI
      FLASK --> SQLALCHEMY
      DJANGO --> DJANGO_ORM

      NUMPY --> PANDAS
      PANDAS --> MATPLOTLIB
      MATPLOTLIB --> SEABORN
      NUMPY --> SCIPY
      PANDAS --> SCIKIT_LEARN
      JUPYTER --> JUPYTER_LAB

      NUMPY --> TENSORFLOW
      NUMPY --> PYTORCH
      TENSORFLOW --> KERAS
      OPENCV --> CV_APPS
      NLTK --> NLP_APPS

      ASYNCIO --> AIOHTTP
      ASYNCIO --> UVLOOP
      CELERY --> REDIS_PY

      PYTEST --> COVERAGE
      UNITTEST --> MOCK
      PYTEST --> TOX

      PYTHON --> PYCHARM
      PYTHON --> VSCODE
      JUPYTER --> JUPYTER_LAB
      BLACK --> FLAKE8
      FLAKE8 --> MYPY

      style PYTHON fill:#3776ab,stroke:#fff,stroke-width:2px,color:#fff
      style DJANGO fill:#092e20,stroke:#fff,stroke-width:2px,color:#fff
      style FLASK fill:#000000,stroke:#fff,stroke-width:2px,color:#fff
      style NUMPY fill:#013243,stroke:#fff,stroke-width:2px,color:#fff
      style PANDAS fill:#150458,stroke:#fff,stroke-width:2px,color:#fff
      style TENSORFLOW fill:#ff6f00,stroke:#fff,stroke-width:2px,color:#fff
      style PYTORCH fill:#ee4c2c,stroke:#fff,stroke-width:2px,color:#fff
      style JUPYTER fill:#f37626,stroke:#fff,stroke-width:2px,color:#fff
      style FASTAPI fill:#009688,stroke:#fff,stroke-width:2px,color:#fff
      style PYTEST fill:#0a9edc,stroke:#fff,stroke-width:2px,color:#fff
---

# Python 完全指南：从入门到精通实战

## 🚀 Python 简介

Python 是一种高级、解释型、通用的编程语言，由 Guido van Rossum 于 1989 年创造。Python 以其简洁、优雅的语法和强大的功能库而闻名，广泛应用于 Web 开发、数据科学、人工智能、自动化脚本等领域。

### 核心特点

- **🎯 简洁优雅**: 语法清晰简洁，接近自然语言
- **🔄 跨平台**: 支持 Windows、macOS、Linux 等多平台
- **📚 丰富生态**: 拥有庞大的第三方库生态系统
- **🚀 开发高效**: 快速原型开发，提高开发效率
- **🌐 应用广泛**: 适用于多个领域和场景
- **👥 社区活跃**: 拥有活跃的开源社区支持

## 📦 环境搭建

### 官方安装方式

#### Windows 安装

```bash
# 从官网下载安装包
# https://www.python.org/downloads/windows/

# 使用 Chocolatey
choco install python

# 使用 Scoop
scoop install python

# 验证安装
python --version
pip --version
```

#### macOS 安装

```bash
# 使用 Homebrew（推荐）
brew install python

# 或使用 pyenv 管理多版本
brew install pyenv
pyenv install 3.12.0
pyenv global 3.12.0

# 验证安装
python3 --version
pip3 --version
```

#### Linux 安装

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip python3-venv

# CentOS/RHEL
sudo yum install python3 python3-pip

# Fedora
sudo dnf install python3 python3-pip

# 验证安装
python3 --version
pip3 --version
```

### 虚拟环境配置

```bash
# 创建虚拟环境
python -m venv myproject_env

# 激活虚拟环境
# Windows
myproject_env\Scripts\activate
# macOS/Linux
source myproject_env/bin/activate

# 安装包
pip install requests numpy pandas

# 生成依赖文件
pip freeze > requirements.txt

# 从依赖文件安装
pip install -r requirements.txt

# 退出虚拟环境
deactivate
```

### 包管理工具

```bash
# pip 基础使用
pip install package_name
pip install package_name==1.2.3
pip install -U package_name
pip uninstall package_name
pip list
pip show package_name

# pipenv 使用
pip install pipenv
pipenv install requests
pipenv install pytest --dev
pipenv shell
pipenv run python script.py

# Poetry 使用
curl -sSL https://install.python-poetry.org | python3 -
poetry new myproject
poetry add requests
poetry add pytest --group dev
poetry install
poetry shell
```

## 🎯 基础语法

### 1. 变量和数据类型

```python
# 基础数据类型
# 数字类型
integer_num = 42
float_num = 3.14159
complex_num = 1 + 2j

# 字符串
single_quote = 'Hello'
double_quote = "World"
triple_quote = """Multi-line
string content"""

# 布尔类型
is_true = True
is_false = False

# 空值
nothing = None

# 动态类型
x = 10          # int
x = "Python"    # str
x = [1, 2, 3]   # list

# 类型检查
print(type(x))              # <class 'list'>
print(isinstance(x, list))  # True

# 类型转换
str_num = "123"
int_num = int(str_num)      # 123
float_num = float(str_num)  # 123.0
str_back = str(int_num)     # "123"

# 多重赋值
a, b, c = 1, 2, 3
x = y = z = 0

# 解包
numbers = [1, 2, 3, 4, 5]
first, *middle, last = numbers
print(first)    # 1
print(middle)   # [2, 3, 4]
print(last)     # 5
```

### 2. 字符串操作

```python
# 字符串定义
name = "Python Programming"
greeting = f"Hello, {name}!"  # f-string
template = "Hello, {}!".format(name)  # format method
old_style = "Hello, %s!" % name  # % formatting

# 字符串方法
text = "  Python Programming  "

# 基础操作
print(len(text))                    # 长度
print(text.strip())                 # 去除首尾空格
print(text.lower())                 # 转小写
print(text.upper())                 # 转大写
print(text.title())                 # 标题格式
print(text.replace("Python", "Go")) # 替换

# 查找和检查
print(text.find("Python"))          # 查找位置
print(text.count("o"))              # 计数
print(text.startswith("  Py"))      # 检查开头
print(text.endswith("ing  "))       # 检查结尾
print("Python" in text)             # 包含检查

# 分割和连接
words = text.strip().split()         # 分割为列表
joined = " ".join(words)             # 连接列表
lines = "line1\nline2\nline3".splitlines()  # 按行分割

# 字符串切片
s = "Python"
print(s[0])      # 'P' - 第一个字符
print(s[-1])     # 'n' - 最后一个字符
print(s[0:3])    # 'Pyt' - 切片
print(s[:3])     # 'Pyt' - 从开头切片
print(s[3:])     # 'hon' - 切到末尾
print(s[::-1])   # 'nohtyP' - 反转

# 字符串格式化
name = "Alice"
age = 30
score = 95.5

# f-string (Python 3.6+)
message1 = f"Name: {name}, Age: {age}, Score: {score:.1f}"

# format method
message2 = "Name: {}, Age: {}, Score: {:.1f}".format(name, age, score)
message3 = "Name: {name}, Age: {age}, Score: {score:.1f}".format(
    name=name, age=age, score=score)

# % formatting
message4 = "Name: %s, Age: %d, Score: %.1f" % (name, age, score)

print(message1)  # Name: Alice, Age: 30, Score: 95.5
```

### 3. 数据结构

```python
# 列表 (List) - 可变、有序
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# 列表操作
fruits.append("grape")              # 添加元素
fruits.insert(1, "kiwi")           # 插入元素
fruits.remove("banana")            # 删除元素
popped = fruits.pop()              # 弹出最后一个元素
fruits.extend(["mango", "pear"])   # 扩展列表
fruits.sort()                      # 排序
fruits.reverse()                   # 反转

# 列表推导式
squares = [x**2 for x in range(10)]
even_squares = [x**2 for x in range(10) if x % 2 == 0]
matrix = [[i*j for j in range(3)] for i in range(3)]

print(squares)      # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
print(even_squares) # [0, 4, 16, 36, 64]

# 元组 (Tuple) - 不可变、有序
point = (3, 4)
colors = ("red", "green", "blue")
single_item = (42,)  # 注意逗号

# 元组解包
x, y = point
r, g, b = colors

# 命名元组
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(1, 2)
print(p.x, p.y)  # 1 2

# 字典 (Dictionary) - 可变、无序（Python 3.7+ 保持插入顺序）
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# 字典操作
person["email"] = "alice@example.com"    # 添加
person["age"] = 31                       # 修改
del person["city"]                       # 删除
age = person.get("age", 0)              # 安全获取
keys = list(person.keys())              # 获取键
values = list(person.values())          # 获取值
items = list(person.items())            # 获取键值对

# 字典推导式
squared_dict = {x: x**2 for x in range(5)}
filtered_dict = {k: v for k, v in person.items() if len(str(v)) > 5}

print(squared_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 集合 (Set) - 可变、无序、唯一
unique_numbers = {1, 2, 3, 4, 5}
fruits_set = {"apple", "banana", "orange"}

# 集合操作
fruits_set.add("grape")                 # 添加元素
fruits_set.remove("banana")             # 删除元素（不存在会报错）
fruits_set.discard("kiwi")              # 删除元素（不存在不报错）

# 集合运算
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

union = set1 | set2              # 并集: {1, 2, 3, 4, 5, 6}
intersection = set1 & set2       # 交集: {3, 4}
difference = set1 - set2         # 差集: {1, 2}
symmetric_diff = set1 ^ set2     # 对称差集: {1, 2, 5, 6}

# 集合推导式
even_squares_set = {x**2 for x in range(10) if x % 2 == 0}
```

## 🔧 控制结构

### 1. 条件语句

```python
# if-elif-else 语句
score = 85

if score >= 90:
    grade = "A"
    print("Excellent!")
elif score >= 80:
    grade = "B"
    print("Good job!")
elif score >= 70:
    grade = "C"
    print("Average")
elif score >= 60:
    grade = "D"
    print("Below average")
else:
    grade = "F"
    print("Failed")

print(f"Your grade is: {grade}")

# 三元运算符
status = "pass" if score >= 60 else "fail"
max_value = a if a > b else b

# 多条件判断
age = 25
has_license = True
has_car = False

if age >= 18 and has_license:
    print("Can drive")

if has_license or has_car:
    print("Has transportation option")

if not has_car:
    print("Needs a car")

# 链式比较
x = 15
if 10 < x < 20:
    print("x is between 10 and 20")

# 检查成员资格
user_role = "admin"
allowed_roles = ["admin", "moderator", "editor"]

if user_role in allowed_roles:
    print("Access granted")

# 检查类型
value = "42"
if isinstance(value, str):
    print("Value is a string")

# 检查空值
data = []
if not data:  # 空列表、空字符串、None、0 都被认为是 False
    print("Data is empty")

# 使用 match-case (Python 3.10+)
def handle_status_code(code):
    match code:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case 500:
            return "Internal Server Error"
        case code if 400 <= code < 500:
            return "Client Error"
        case code if 500 <= code < 600:
            return "Server Error"
        case _:
            return "Unknown Status"

print(handle_status_code(404))  # Not Found
```

### 2. 循环语句

```python
# for 循环
# 遍历列表
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")

# 遍历字符串
for char in "Python":
    print(char)

# 使用 range()
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):       # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8
    print(i)

# 使用 enumerate() 获取索引
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# 遍历字典
person = {"name": "Alice", "age": 30, "city": "NY"}

for key in person:
    print(f"{key}: {person[key]}")

for key, value in person.items():
    print(f"{key}: {value}")

# 并行遍历多个序列
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
cities = ["NY", "LA", "Chicago"]

for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age}, {city}")

# while 循环
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# 无限循环与 break
while True:
    user_input = input("Enter 'quit' to exit: ")
    if user_input.lower() == 'quit':
        break
    print(f"You entered: {user_input}")

# continue 语句
for i in range(10):
    if i % 2 == 0:
        continue  # 跳过偶数
    print(f"Odd number: {i}")

# else 子句（循环正常结束时执行）
for i in range(5):
    print(i)
    if i == 10:  # 这个条件永远不会满足
        break
else:
    print("Loop completed normally")  # 会被执行

# 嵌套循环
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for row in matrix:
    for element in row:
        print(element, end=" ")
    print()  # 换行

# 循环推导式
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 列表推导式
squares = [x**2 for x in numbers]
even_numbers = [x for x in numbers if x % 2 == 0]
pairs = [(x, y) for x in range(3) for y in range(3)]

# 字典推导式
square_dict = {x: x**2 for x in numbers}

# 集合推导式
unique_squares = {x**2 for x in numbers}

# 生成器表达式
squares_gen = (x**2 for x in numbers)

print(list(squares_gen))  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

## 📁 函数

### 1. 基础函数

```python
# 基本函数定义
def greet(name):
    """简单的问候函数"""
    return f"Hello, {name}!"

# 调用函数
message = greet("Alice")
print(message)  # Hello, Alice!

# 带默认参数的函数
def greet_with_title(name, title="Mr."):
    """带默认参数的问候函数"""
    return f"Hello, {title} {name}!"

print(greet_with_title("Smith"))           # Hello, Mr. Smith!
print(greet_with_title("Smith", "Dr."))    # Hello, Dr. Smith!

# 可变参数函数
def sum_all(*args):
    """接受任意数量参数的求和函数"""
    return sum(args)

print(sum_all(1, 2, 3, 4, 5))  # 15

def print_info(**kwargs):
    """接受任意关键字参数的函数"""
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="NY")

# 混合参数类型
def complex_function(required_arg, default_arg="default", *args, **kwargs):
    """演示各种参数类型的函数"""
    print(f"Required: {required_arg}")
    print(f"Default: {default_arg}")
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

complex_function("hello", "world", 1, 2, 3, name="Alice", age=30)

# 多返回值
def calculate_stats(numbers):
    """计算统计信息"""
    total = sum(numbers)
    count = len(numbers)
    average = total / count if count > 0 else 0
    return total, count, average

total, count, avg = calculate_stats([1, 2, 3, 4, 5])
print(f"Total: {total}, Count: {count}, Average: {avg}")

# 函数作为参数
def apply_operation(numbers, operation):
    """对数字列表应用操作函数"""
    return [operation(x) for x in numbers]

def square(x):
    return x ** 2

def cube(x):
    return x ** 3

numbers = [1, 2, 3, 4, 5]
squares = apply_operation(numbers, square)
cubes = apply_operation(numbers, cube)

print(f"Squares: {squares}")  # [1, 4, 9, 16, 25]
print(f"Cubes: {cubes}")      # [1, 8, 27, 64, 125]

# Lambda 函数
# 简单的 lambda 函数
double = lambda x: x * 2
add = lambda x, y: x + y

print(double(5))    # 10
print(add(3, 4))    # 7

# 在高阶函数中使用 lambda
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map() 函数
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# filter() 函数
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)  # [2, 4, 6, 8, 10]

# sorted() 函数
students = [("Alice", 85), ("Bob", 90), ("Charlie", 78)]
sorted_by_grade = sorted(students, key=lambda x: x[1], reverse=True)
print(sorted_by_grade)  # [('Bob', 90), ('Alice', 85), ('Charlie', 78)]

# 递归函数
def factorial(n):
    """计算阶乘的递归函数"""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120

def fibonacci(n):
    """计算斐波那契数列"""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# 生成斐波那契数列
fib_sequence = [fibonacci(i) for i in range(10)]
print(fib_sequence)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# 带缓存的递归（避免重复计算）
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci_cached(n):
    """带缓存的斐波那契函数"""
    if n <= 1:
        return n
    return fibonacci_cached(n - 1) + fibonacci_cached(n - 2)

print(fibonacci_cached(50))  # 很快就能计算出结果

# 闭包
def outer_function(x):
    """外部函数"""
    def inner_function(y):
        """内部函数，形成闭包"""
        return x + y
    return inner_function

add_10 = outer_function(10)
print(add_10(5))  # 15

# 更复杂的闭包示例
def make_counter():
    """创建计数器的工厂函数"""
    count = 0

    def counter():
        nonlocal count
        count += 1
        return count

    return counter

counter1 = make_counter()
counter2 = make_counter()

print(counter1())  # 1
print(counter1())  # 2
print(counter2())  # 1
print(counter1())  # 3
```

### 2. 装饰器

```python
# 基础装饰器
def my_decorator(func):
    """基础装饰器示例"""
    def wrapper(*args, **kwargs):
        print(f"调用函数: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"函数 {func.__name__} 执行完成")
        return result
    return wrapper

@my_decorator
def say_hello(name):
    print(f"Hello, {name}!")
    return f"Greeted {name}"

result = say_hello("Alice")

# 计时装饰器
import time
from functools import wraps

def timer(func):
    """计算函数执行时间的装饰器"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} 执行时间: {end_time - start_time:.4f} 秒")
        return result
    return wrapper

@timer
def slow_function():
    """模拟耗时操作"""
    time.sleep(1)
    return "操作完成"

slow_function()

# 带参数的装饰器
def repeat(times):
    """重复执行函数的装饰器"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for i in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("Bob")  # 会打印3次

# 类装饰器
class CountCalls:
    """统计函数调用次数的类装饰器"""
    def __init__(self, func):
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"{self.func.__name__} 被调用了 {self.count} 次")
        return self.func(*args, **kwargs)

@CountCalls
def say_hi():
    print("Hi!")

say_hi()  # say_hi 被调用了 1 次
say_hi()  # say_hi 被调用了 2 次

# 缓存装饰器
def memoize(func):
    """缓存函数结果的装饰器"""
    cache = {}

    @wraps(func)
    def wrapper(*args, **kwargs):
        # 创建缓存键
        key = str(args) + str(sorted(kwargs.items()))

        if key not in cache:
            cache[key] = func(*args, **kwargs)
            print(f"计算并缓存: {key}")
        else:
            print(f"从缓存获取: {key}")

        return cache[key]
    return wrapper

@memoize
def expensive_calculation(n):
    """模拟耗时计算"""
    time.sleep(1)
    return n ** 2

print(expensive_calculation(5))  # 计算并缓存
print(expensive_calculation(5))  # 从缓存获取

# 多个装饰器组合
@timer
@repeat(2)
def combined_example():
    print("执行任务")

combined_example()

## 🏗️ 面向对象编程

### 1. 类和对象

```python
# 基础类定义
class Person:
    """人员类示例"""

    # 类变量（所有实例共享）
    species = "Homo sapiens"

    def __init__(self, name, age, email):
        """构造函数"""
        self.name = name        # 实例变量
        self.age = age
        self.email = email
        self._private_var = "私有变量"  # 约定的私有变量
        self.__very_private = "很私有的变量"  # 名称修饰

    def introduce(self):
        """实例方法"""
        return f"Hi, I'm {self.name}, {self.age} years old."

    def have_birthday(self):
        """增加年龄"""
        self.age += 1
        print(f"Happy birthday! Now {self.age} years old.")

    @staticmethod
    def is_adult(age):
        """静态方法 - 不需要访问实例或类"""
        return age >= 18

    @classmethod
    def create_baby(cls, name):
        """类方法 - 访问类本身"""
        return cls(name, 0, "")

    def __str__(self):
        """字符串表示"""
        return f"Person(name='{self.name}', age={self.age})"

    def __repr__(self):
        """开发者字符串表示"""
        return f"Person('{self.name}', {self.age}, '{self.email}')"

# 创建和使用对象
person1 = Person("Alice", 25, "alice@example.com")
person2 = Person("Bob", 30, "bob@example.com")

print(person1.introduce())  # Hi, I'm Alice, 25 years old.
person1.have_birthday()     # Happy birthday! Now 26 years old.

print(Person.is_adult(17))  # False
print(Person.is_adult(25))  # True

baby = Person.create_baby("Charlie")
print(baby)  # Person(name='Charlie', age=0)

# 属性访问
print(person1.name)         # Alice
print(person1._private_var) # 仍可访问，但不推荐
# print(person1.__very_private)  # 会报错，需要用 _Person__very_private
```

### 2. 继承

```python
# 基础继承
class Employee(Person):
    """员工类，继承自Person"""

    def __init__(self, name, age, email, employee_id, salary):
        super().__init__(name, age, email)  # 调用父类构造函数
        self.employee_id = employee_id
        self.salary = salary
        self.department = None

    def introduce(self):
        """重写父类方法"""
        base_intro = super().introduce()
        return f"{base_intro} I work here as employee #{self.employee_id}."

    def work(self):
        """员工特有的方法"""
        return f"{self.name} is working..."

    def get_annual_salary(self):
        """计算年薪"""
        return self.salary * 12

class Manager(Employee):
    """经理类，继承自Employee"""

    def __init__(self, name, age, email, employee_id, salary, team_size):
        super().__init__(name, age, email, employee_id, salary)
        self.team_size = team_size
        self.team_members = []

    def introduce(self):
        """再次重写方法"""
        base_intro = super().introduce()
        return f"{base_intro} I manage a team of {self.team_size} people."

    def hire(self, employee):
        """雇佣员工"""
        self.team_members.append(employee)
        employee.department = f"Team led by {self.name}"
        print(f"{employee.name} hired to {self.name}'s team")

    def hold_meeting(self):
        """举行会议"""
        return f"{self.name} is holding a team meeting with {len(self.team_members)} members."

# 使用继承
emp = Employee("John", 28, "john@company.com", "E001", 5000)
mgr = Manager("Sarah", 35, "sarah@company.com", "M001", 8000, 5)

print(emp.introduce())
print(mgr.introduce())

mgr.hire(emp)
print(mgr.hold_meeting())

# 检查继承关系
print(isinstance(emp, Employee))  # True
print(isinstance(emp, Person))    # True
print(isinstance(mgr, Manager))   # True
print(isinstance(mgr, Employee))  # True

print(issubclass(Manager, Employee))  # True
print(issubclass(Employee, Person))   # True
```

### 3. 特殊方法和属性

```python
class Vector:
    """向量类，演示特殊方法"""

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        """用户友好的字符串表示"""
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        """开发者字符串表示"""
        return f"Vector({self.x!r}, {self.y!r})"

    def __add__(self, other):
        """向量加法"""
        if isinstance(other, Vector):
            return Vector(self.x + other.x, self.y + other.y)
        return NotImplemented

    def __sub__(self, other):
        """向量减法"""
        if isinstance(other, Vector):
            return Vector(self.x - other.x, self.y - other.y)
        return NotImplemented

    def __mul__(self, scalar):
        """标量乘法"""
        if isinstance(scalar, (int, float)):
            return Vector(self.x * scalar, self.y * scalar)
        return NotImplemented

    def __rmul__(self, scalar):
        """右侧标量乘法"""
        return self.__mul__(scalar)

    def __eq__(self, other):
        """相等比较"""
        if isinstance(other, Vector):
            return self.x == other.x and self.y == other.y
        return False

    def __len__(self):
        """向量的模长"""
        return int((self.x**2 + self.y**2)**0.5)

    def __getitem__(self, index):
        """支持索引访问"""
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        else:
            raise IndexError("Vector index out of range")

    def __setitem__(self, index, value):
        """支持索引赋值"""
        if index == 0:
            self.x = value
        elif index == 1:
            self.y = value
        else:
            raise IndexError("Vector index out of range")

# 使用特殊方法
v1 = Vector(2, 3)
v2 = Vector(1, 4)

print(v1)           # Vector(2, 3)
print(v1 + v2)      # Vector(3, 7)
print(v1 - v2)      # Vector(1, -1)
print(v1 * 3)       # Vector(6, 9)
print(2 * v1)       # Vector(4, 6)
print(v1 == v2)     # False
print(len(v1))      # 3
print(v1[0], v1[1]) # 2 3

v1[0] = 5
print(v1)           # Vector(5, 3)
```

### 4. 属性和描述符

```python
class Temperature:
    """温度类，演示属性使用"""

    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        """摄氏度属性"""
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        """设置摄氏度"""
        if value < -273.15:
            raise ValueError("Temperature cannot be below absolute zero")
        self._celsius = value

    @property
    def fahrenheit(self):
        """华氏度属性（只读）"""
        return self._celsius * 9/5 + 32

    @property
    def kelvin(self):
        """开尔文温度属性（只读）"""
        return self._celsius + 273.15

    def __str__(self):
        return f"{self._celsius}°C"

# 使用属性
temp = Temperature(25)
print(temp.celsius)     # 25
print(temp.fahrenheit)  # 77.0
print(temp.kelvin)      # 298.15

temp.celsius = 30
print(temp.fahrenheit)  # 86.0

# temp.celsius = -300    # 会抛出 ValueError

# 描述符示例
class Descriptor:
    """简单的描述符"""

    def __init__(self, name):
        self.name = name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__.get(self.name)

    def __set__(self, obj, value):
        if not isinstance(value, str):
            raise TypeError(f"{self.name} must be a string")
        obj.__dict__[self.name] = value.upper()

class MyClass:
    """使用描述符的类"""
    name = Descriptor('name')

    def __init__(self, name):
        self.name = name

obj = MyClass("alice")
print(obj.name)  # ALICE
obj.name = "bob"
print(obj.name)  # BOB
```

## 📦 模块和包

### 1. 模块使用

```python
# 导入模块的不同方式
import math
import datetime as dt
from collections import defaultdict, Counter
from itertools import *

# 使用导入的模块
print(math.sqrt(16))        # 4.0
print(math.pi)              # 3.141592653589793

now = dt.datetime.now()
print(now.strftime("%Y-%m-%d %H:%M:%S"))

# collections 模块
dd = defaultdict(list)
dd['fruits'].append('apple')
dd['fruits'].append('banana')
print(dd)  # defaultdict(<class 'list'>, {'fruits': ['apple', 'banana']})

counter = Counter(['a', 'b', 'c', 'a', 'b', 'a'])
print(counter)  # Counter({'a': 3, 'b': 2, 'c': 1})
print(counter.most_common(2))  # [('a', 3), ('b', 2)]

# itertools 模块
from itertools import combinations, permutations, product

print(list(combinations('ABC', 2)))     # [('A', 'B'), ('A', 'C'), ('B', 'C')]
print(list(permutations('ABC', 2)))     # [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]
print(list(product('AB', '12')))        # [('A', '1'), ('A', '2'), ('B', '1'), ('B', '2')]

# 创建自定义模块
# 文件: mymodule.py
"""
def greet(name):
    return f"Hello, {name}!"

def calculate_area(radius):
    import math
    return math.pi * radius ** 2

PI = 3.14159

class SimpleCalculator:
    def add(self, a, b):
        return a + b

    def multiply(self, a, b):
        return a * b
"""

# 使用自定义模块
# import mymodule
# print(mymodule.greet("World"))
# print(mymodule.calculate_area(5))
# calc = mymodule.SimpleCalculator()
# print(calc.add(2, 3))
```

### 2. 包结构

```python
# 包结构示例
"""
mypackage/
    __init__.py
    math_utils/
        __init__.py
        basic.py
        advanced.py
    string_utils/
        __init__.py
        formatters.py
        validators.py
"""

# mypackage/__init__.py
"""
__version__ = "1.0.0"
__author__ = "Your Name"

from .math_utils import add, multiply
from .string_utils import format_name
"""

# mypackage/math_utils/__init__.py
"""
from .basic import add, subtract
from .advanced import power, logarithm
"""

# mypackage/math_utils/basic.py
"""
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
"""

# mypackage/string_utils/formatters.py
"""
def format_name(first_name, last_name):
    return f"{last_name}, {first_name}"

def capitalize_words(text):
    return ' '.join(word.capitalize() for word in text.split())
"""

# 使用包
# from mypackage import add, multiply, format_name
# from mypackage.math_utils.advanced import power
# from mypackage.string_utils.validators import is_email

# 相对导入（在包内部使用）
# from .basic import add          # 从同级模块导入
# from ..string_utils import format_name  # 从父级包导入
# from ...other_package import something  # 从更高级包导入
```

## 📁 文件处理

### 1. 基础文件操作

```python
# 基础文件读写
# 写入文件
with open('example.txt', 'w', encoding='utf-8') as file:
    file.write("Hello, World!\n")
    file.write("This is a test file.\n")
    file.writelines(["Line 1\n", "Line 2\n", "Line 3\n"])

# 读取文件
with open('example.txt', 'r', encoding='utf-8') as file:
    content = file.read()  # 读取全部内容
    print(content)

# 逐行读取
with open('example.txt', 'r', encoding='utf-8') as file:
    for line_number, line in enumerate(file, 1):
        print(f"Line {line_number}: {line.strip()}")

# 读取所有行到列表
with open('example.txt', 'r', encoding='utf-8') as file:
    lines = file.readlines()
    print(f"Total lines: {len(lines)}")

# 追加内容
with open('example.txt', 'a', encoding='utf-8') as file:
    file.write("Appended line\n")

# 二进制文件处理
# 复制文件
def copy_file(source, destination):
    """复制文件"""
    with open(source, 'rb') as src, open(destination, 'wb') as dst:
        while True:
            chunk = src.read(1024)  # 每次读取1KB
            if not chunk:
                break
            dst.write(chunk)

# 文件信息
import os
import stat
from pathlib import Path

file_path = 'example.txt'

# 使用 os 模块
if os.path.exists(file_path):
    print(f"File size: {os.path.getsize(file_path)} bytes")
    print(f"Last modified: {os.path.getmtime(file_path)}")
    print(f"Is file: {os.path.isfile(file_path)}")
    print(f"Is directory: {os.path.isdir(file_path)}")

# 使用 pathlib (推荐)
path = Path(file_path)
if path.exists():
    print(f"File size: {path.stat().st_size} bytes")
    print(f"Last modified: {path.stat().st_mtime}")
    print(f"Is file: {path.is_file()}")
    print(f"Parent directory: {path.parent}")
    print(f"File extension: {path.suffix}")
    print(f"File name: {path.name}")
    print(f"File stem: {path.stem}")

# 目录操作
import glob

# 创建目录
os.makedirs('test_dir/sub_dir', exist_ok=True)

# 列出目录内容
for item in os.listdir('.'):
    print(item)

# 使用 pathlib
current_dir = Path('.')
for item in current_dir.iterdir():
    if item.is_file():
        print(f"File: {item.name}")
    elif item.is_dir():
        print(f"Directory: {item.name}")

# 查找文件
# 使用 glob
python_files = glob.glob('*.py')
all_txt_files = glob.glob('**/*.txt', recursive=True)

# 使用 pathlib
python_files = list(Path('.').glob('*.py'))
all_txt_files = list(Path('.').rglob('*.txt'))

print(f"Python files: {python_files}")
```

### 2. 高级文件处理

```python
import json
import csv
import pickle
from dataclasses import dataclass, asdict
import tempfile
import shutil

# JSON 文件处理
data = {
    "name": "Alice",
    "age": 30,
    "skills": ["Python", "Java", "Go"],
    "is_active": True
}

# 写入 JSON
with open('data.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=2, ensure_ascii=False)

# 读取 JSON
with open('data.json', 'r', encoding='utf-8') as file:
    loaded_data = json.load(file)
    print(loaded_data)

# CSV 文件处理
# 写入 CSV
employees = [
    ['Name', 'Age', 'Department', 'Salary'],
    ['Alice', 30, 'Engineering', 75000],
    ['Bob', 25, 'Marketing', 55000],
    ['Charlie', 35, 'Engineering', 85000]
]

with open('employees.csv', 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerows(employees)

# 读取 CSV
with open('employees.csv', 'r', encoding='utf-8') as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)

# 使用字典读取 CSV
with open('employees.csv', 'r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['Name']}: ${row['Salary']}")

# 序列化对象 (Pickle)
@dataclass
class Person:
    name: str
    age: int
    skills: list

person = Person("Alice", 30, ["Python", "Go"])

# 保存对象
with open('person.pkl', 'wb') as file:
    pickle.dump(person, file)

# 加载对象
with open('person.pkl', 'rb') as file:
    loaded_person = pickle.load(file)
    print(loaded_person)

# 临时文件
# 创建临时文件
with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.txt') as temp_file:
    temp_file.write("Temporary content")
    temp_filename = temp_file.name

print(f"Temporary file: {temp_filename}")

# 创建临时目录
with tempfile.TemporaryDirectory() as temp_dir:
    print(f"Temporary directory: {temp_dir}")
    # 在这里使用临时目录
    temp_file_path = Path(temp_dir) / "temp_file.txt"
    temp_file_path.write_text("Content in temp directory")

# 文件操作工具
# 复制文件和目录
shutil.copy2('example.txt', 'backup_example.txt')  # 复制文件和元数据
shutil.copytree('source_dir', 'destination_dir')   # 复制整个目录树

# 移动/重命名
shutil.move('old_name.txt', 'new_name.txt')

# 删除
os.remove('file_to_delete.txt')        # 删除文件
shutil.rmtree('directory_to_delete')   # 删除目录树

# 文件监控
import time

def monitor_file_changes(file_path, interval=1):
    """监控文件变化"""
    last_modified = os.path.getmtime(file_path)

    while True:
        time.sleep(interval)
        current_modified = os.path.getmtime(file_path)

        if current_modified != last_modified:
            print(f"File {file_path} has been modified")
            last_modified = current_modified

# 批量文件处理
def process_text_files(directory, operation):
    """批量处理文本文件"""
    path = Path(directory)

    for txt_file in path.rglob('*.txt'):
        try:
            content = txt_file.read_text(encoding='utf-8')
            processed_content = operation(content)

            # 备份原文件
            backup_path = txt_file.with_suffix('.txt.bak')
            shutil.copy2(txt_file, backup_path)

            # 写入处理后的内容
            txt_file.write_text(processed_content, encoding='utf-8')
            print(f"Processed: {txt_file}")

        except Exception as e:
            print(f"Error processing {txt_file}: {e}")

# 使用示例
def uppercase_content(content):
    return content.upper()

# process_text_files('.', uppercase_content)

## ⚠️ 异常处理

### 1. 基础异常处理

```python
# 基本的 try-except 结构
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except ValueError:
    print("Invalid input! Please enter a valid number.")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
else:
    print("Operation completed successfully!")
finally:
    print("This always executes.")

# 捕获多种异常
try:
    file = open('nonexistent.txt', 'r')
    data = file.read()
    number = int(data)
except (FileNotFoundError, ValueError) as e:
    print(f"Error: {e}")

# 异常链
try:
    try:
        x = 1 / 0
    except ZeroDivisionError as e:
        raise ValueError("Value error occurred") from e
except ValueError as e:
    print(f"Caught: {e}")
    print(f"Original cause: {e.__cause__}")

# 重新抛出异常
def risky_operation():
    try:
        # 一些可能失败的操作
        result = 10 / 0
        return result
    except ZeroDivisionError:
        print("Logging the error...")
        raise  # 重新抛出相同的异常

try:
    risky_operation()
except ZeroDivisionError:
    print("Handled in outer scope")
```

### 2. 自定义异常

```python
# 自定义异常类
class CustomError(Exception):
    """基础自定义异常"""
    pass

class ValidationError(CustomError):
    """验证错误"""
    def __init__(self, field, value, message="Validation failed"):
        self.field = field
        self.value = value
        self.message = message
        super().__init__(f"{message}: {field}='{value}'")

class BusinessLogicError(CustomError):
    """业务逻辑错误"""
    def __init__(self, message, error_code=None):
        self.message = message
        self.error_code = error_code
        super().__init__(message)

# 使用自定义异常
def validate_age(age):
    """验证年龄"""
    if not isinstance(age, int):
        raise ValidationError("age", age, "Age must be an integer")
    if age < 0:
        raise ValidationError("age", age, "Age cannot be negative")
    if age > 150:
        raise ValidationError("age", age, "Age seems unrealistic")
    return True

def transfer_money(from_account, to_account, amount):
    """转账操作"""
    if from_account.balance < amount:
        raise BusinessLogicError(
            f"Insufficient funds. Available: {from_account.balance}, Required: {amount}",
            error_code="INSUFFICIENT_FUNDS"
        )

    # 执行转账逻辑
    from_account.balance -= amount
    to_account.balance += amount

# 使用示例
try:
    validate_age(-5)
except ValidationError as e:
    print(f"Validation failed: {e}")
    print(f"Field: {e.field}, Value: {e.value}")

# 上下文管理器与异常
class DatabaseConnection:
    """数据库连接上下文管理器"""

    def __init__(self, db_name):
        self.db_name = db_name
        self.connection = None

    def __enter__(self):
        print(f"Connecting to {self.db_name}")
        self.connection = f"Connection to {self.db_name}"
        return self.connection

    def __exit__(self, exc_type, exc_value, traceback):
        print(f"Closing connection to {self.db_name}")
        if exc_type is not None:
            print(f"An exception occurred: {exc_type.__name__}: {exc_value}")
            # 返回 False 表示不抑制异常
            return False
        return True

# 使用上下文管理器
try:
    with DatabaseConnection("mydb") as conn:
        print(f"Using {conn}")
        # raise ValueError("Something went wrong")
        print("Operations completed")
except ValueError as e:
    print(f"Caught exception: {e}")

# 函数装饰器用于异常处理
from functools import wraps
import logging

def exception_handler(logger=None, reraise=True):
    """异常处理装饰器"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                if logger:
                    logger.error(f"Exception in {func.__name__}: {e}")
                else:
                    print(f"Exception in {func.__name__}: {e}")

                if reraise:
                    raise
                return None
        return wrapper
    return decorator

@exception_handler(reraise=False)
def risky_function():
    """可能出错的函数"""
    return 10 / 0

result = risky_function()  # 不会抛出异常，返回 None
```

## 🌐 Web 开发

### 1. Flask 快速入门

```python
# 安装: pip install flask

from flask import Flask, request, jsonify, render_template
from datetime import datetime
import json

app = Flask(__name__)

# 基础路由
@app.route('/')
def home():
    return '<h1>Hello, Flask!</h1>'

@app.route('/about')
def about():
    return '<h1>About Page</h1>'

# 动态路由
@app.route('/user/<username>')
def show_user(username):
    return f'<h1>User: {username}</h1>'

@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'<h1>Post ID: {post_id}</h1>'

# HTTP 方法
@app.route('/submit', methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':
        username = request.form['username']
        return f'<h1>Hello, {username}!</h1>'
    return '''
        <form method="post">
            <input type="text" name="username" placeholder="Enter your name">
            <input type="submit" value="Submit">
        </form>
    '''

# JSON API
users = [
    {'id': 1, 'name': 'Alice', 'email': 'alice@example.com'},
    {'id': 2, 'name': 'Bob', 'email': 'bob@example.com'}
]

@app.route('/api/users')
def get_users():
    return jsonify(users)

@app.route('/api/users/<int:user_id>')
def get_user(user_id):
    user = next((u for u in users if u['id'] == user_id), None)
    if user:
        return jsonify(user)
    return jsonify({'error': 'User not found'}), 404

@app.route('/api/users', methods=['POST'])
def create_user():
    new_user = request.get_json()
    new_user['id'] = len(users) + 1
    users.append(new_user)
    return jsonify(new_user), 201

# 错误处理
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# 运行应用
if __name__ == '__main__':
    app.run(debug=True)

# Flask 应用结构示例
"""
myapp/
    app.py
    requirements.txt
    templates/
        base.html
        index.html
        user.html
    static/
        css/
            style.css
        js/
            main.js
    models/
        user.py
        post.py
    views/
        auth.py
        main.py
"""

# 模板使用 (Jinja2)
# templates/base.html
"""
<!DOCTYPE html>
<html>
<head>
    <title>{% raw %}{% block title %}My App{% endblock %}{% endraw %}</title>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
    </nav>
    <main>
        {% raw %}{% block content %}{% endblock %}{% endraw %}
    </main>
</body>
</html>
"""

# templates/index.html
"""
{% raw %}{% extends "base.html" %}

{% block title %}Home - My App{% endblock %}

{% block content %}
<h1>Welcome, {{ name }}!</h1>
<p>Current time: {{ current_time }}</p>

<ul>
{% for item in items %}
    <li>{{ item }}</li>
{% endfor %}
</ul>
{% endblock %}{% endraw %}
"""

@app.route('/template-demo')
def template_demo():
    return render_template('index.html',
                         name='Alice',
                         current_time=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                         items=['Python', 'Flask', 'Web Development'])
```

### 2. Django 基础

```python
# Django 项目结构
"""
myproject/
    manage.py
    myproject/
        __init__.py
        settings.py
        urls.py
        wsgi.py
        asgi.py
    myapp/
        __init__.py
        admin.py
        apps.py
        models.py
        views.py
        urls.py
        migrations/
        templates/
        static/
"""

# models.py - 数据模型
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Post(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.status == 'published' and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

# views.py - 视图
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.generic import ListView, DetailView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Post, Category

def home(request):
    """首页视图"""
    recent_posts = Post.objects.filter(status='published')[:5]
    return render(request, 'blog/home.html', {
        'recent_posts': recent_posts
    })

def post_detail(request, slug):
    """文章详情视图"""
    post = get_object_or_404(Post, slug=slug, status='published')
    return render(request, 'blog/post_detail.html', {
        'post': post
    })

class PostListView(ListView):
    """文章列表类视图"""
    model = Post
    template_name = 'blog/post_list.html'
    context_object_name = 'posts'
    paginate_by = 10

    def get_queryset(self):
        return Post.objects.filter(status='published')

class PostDetailView(DetailView):
    """文章详情类视图"""
    model = Post
    template_name = 'blog/post_detail.html'
    context_object_name = 'post'

@login_required
def create_post(request):
    """创建文章视图"""
    if request.method == 'POST':
        # 处理表单提交
        pass
    return render(request, 'blog/create_post.html')

# API 视图
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def api_posts(request):
    """文章 API"""
    if request.method == 'GET':
        posts = Post.objects.filter(status='published').values(
            'id', 'title', 'slug', 'created_at'
        )
        return JsonResponse(list(posts), safe=False)

    elif request.method == 'POST':
        data = json.loads(request.body)
        post = Post.objects.create(
            title=data['title'],
            content=data['content'],
            author=request.user
        )
        return JsonResponse({
            'id': post.id,
            'title': post.title,
            'slug': post.slug
        })

# urls.py - URL 配置
from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.home, name='home'),
    path('posts/', views.PostListView.as_view(), name='post_list'),
    path('post/<slug:slug>/', views.PostDetailView.as_view(), name='post_detail'),
    path('create/', views.create_post, name='create_post'),
    path('api/posts/', views.api_posts, name='api_posts'),
]

# 项目主 urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('blog.urls')),
]

# admin.py - 管理后台
from django.contrib import admin
from .models import Category, Post

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'status', 'created_at']
    list_filter = ['status', 'category', 'created_at']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'
```

## 📊 数据科学库

### 1. NumPy 数值计算

```python
# 安装: pip install numpy
import numpy as np

# 创建数组
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.array([[1, 2, 3], [4, 5, 6]])

# 特殊数组
zeros = np.zeros((3, 4))          # 全零数组
ones = np.ones((2, 3))            # 全一数组
identity = np.eye(3)              # 单位矩阵
range_arr = np.arange(0, 10, 2)   # 范围数组: [0, 2, 4, 6, 8]
linspace = np.linspace(0, 1, 5)   # 线性空间: [0. 0.25 0.5 0.75 1.]

# 随机数组
random_arr = np.random.random((3, 3))        # [0,1) 均匀分布
normal_arr = np.random.normal(0, 1, (3, 3))  # 正态分布
randint_arr = np.random.randint(1, 10, (3, 3))  # 随机整数

# 数组操作
print(f"Shape: {arr2.shape}")        # (2, 3)
print(f"Size: {arr2.size}")          # 6
print(f"Dtype: {arr2.dtype}")        # int64

# 重塑数组
reshaped = arr2.reshape(3, 2)         # 重塑为 3x2
flattened = arr2.flatten()            # 展平为一维

# 数组运算
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

addition = a + b                      # [5, 7, 9]
multiplication = a * b                # [4, 10, 18]
power = a ** 2                        # [1, 4, 9]

# 矩阵运算
matrix_a = np.array([[1, 2], [3, 4]])
matrix_b = np.array([[5, 6], [7, 8]])

matrix_mult = np.dot(matrix_a, matrix_b)  # 矩阵乘法
# 或使用 @ 操作符
matrix_mult = matrix_a @ matrix_b

# 统计函数
data = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

print(f"Mean: {np.mean(data)}")           # 5.5
print(f"Median: {np.median(data)}")       # 5.5
print(f"Std: {np.std(data)}")             # 2.87
print(f"Min: {np.min(data)}")             # 1
print(f"Max: {np.max(data)}")             # 10
print(f"Sum: {np.sum(data)}")             # 55

# 数组索引和切片
arr = np.array([[1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]])

print(arr[0, :])        # 第一行: [1 2 3 4]
print(arr[:, 1])        # 第二列: [2 6 10]
print(arr[1:, 2:])      # 子数组

# 布尔索引
mask = data > 5
filtered = data[mask]   # [6, 7, 8, 9, 10]

# 条件操作
result = np.where(data > 5, data, 0)  # 大于5的保留，否则为0
```

### 2. Pandas 数据分析

```python
# 安装: pip install pandas
import pandas as pd
import numpy as np

# 创建 Series
s1 = pd.Series([1, 2, 3, 4, 5])
s2 = pd.Series([1, 2, 3, 4, 5], index=['a', 'b', 'c', 'd', 'e'])

# 创建 DataFrame
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'age': [25, 30, 35, 28],
    'city': ['NY', 'LA', 'Chicago', 'Houston'],
    'salary': [70000, 80000, 90000, 75000]
}

df = pd.DataFrame(data)
print(df.head())

# 从文件读取数据
# df = pd.read_csv('data.csv')
# df = pd.read_excel('data.xlsx')
# df = pd.read_json('data.json')

# 基本信息
print(df.info())
print(df.describe())
print(df.shape)
print(df.columns)
print(df.dtypes)

# 数据选择
print(df['name'])                    # 选择列
print(df[['name', 'age']])          # 选择多列
print(df.iloc[0])                   # 按位置选择行
print(df.loc[df['age'] > 30])       # 按条件选择行

# 数据过滤
young_people = df[df['age'] < 30]
high_earners = df[df['salary'] > 75000]
ny_people = df[df['city'] == 'NY']

# 多条件过滤
filtered = df[(df['age'] > 25) & (df['salary'] > 70000)]

# 数据操作
# 添加新列
df['bonus'] = df['salary'] * 0.1
df['age_group'] = df['age'].apply(lambda x: 'Young' if x < 30 else 'Experienced')

# 数据排序
sorted_by_age = df.sort_values('age')
sorted_by_multiple = df.sort_values(['city', 'age'], ascending=[True, False])

# 分组操作
grouped = df.groupby('city')
print(grouped['salary'].mean())     # 按城市计算平均薪资
print(grouped.agg({
    'salary': ['mean', 'max', 'min'],
    'age': 'mean'
}))

# 数据透视表
pivot_table = df.pivot_table(
    values='salary',
    index='city',
    columns='age_group',
    aggfunc='mean'
)

# 缺失值处理
# 创建带缺失值的数据
df_with_nan = df.copy()
df_with_nan.loc[1, 'salary'] = np.nan
df_with_nan.loc[2, 'age'] = np.nan

print(df_with_nan.isnull().sum())           # 统计缺失值
df_cleaned = df_with_nan.dropna()           # 删除含缺失值的行
df_filled = df_with_nan.fillna(0)           # 用0填充缺失值
df_filled_mean = df_with_nan.fillna(df_with_nan.mean())  # 用均值填充

# 字符串操作
df['name_upper'] = df['name'].str.upper()
df['name_length'] = df['name'].str.len()
df['is_alice'] = df['name'].str.contains('Alice')

# 日期时间处理
dates = pd.date_range('2024-01-01', periods=4, freq='D')
df['join_date'] = dates
df['year'] = df['join_date'].dt.year
df['month'] = df['join_date'].dt.month

# 数据合并
df1 = pd.DataFrame({
    'id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Charlie']
})

df2 = pd.DataFrame({
    'id': [1, 2, 4],
    'salary': [70000, 80000, 75000]
})

# 内连接
merged = pd.merge(df1, df2, on='id', how='inner')
# 左连接
left_merged = pd.merge(df1, df2, on='id', how='left')

# 数据导出
# df.to_csv('output.csv', index=False)
# df.to_excel('output.xlsx', index=False)
# df.to_json('output.json')
```

### 3. Matplotlib 可视化

```python
# 安装: pip install matplotlib
import matplotlib.pyplot as plt
import numpy as np

# 基础图形
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sin(x)')
plt.plot(x, np.cos(x), label='cos(x)')
plt.xlabel('X values')
plt.ylabel('Y values')
plt.title('Sine and Cosine Functions')
plt.legend()
plt.grid(True)
plt.show()

# 子图
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# 第一个子图 - 线图
axes[0, 0].plot(x, y)
axes[0, 0].set_title('Line Plot')

# 第二个子图 - 散点图
axes[0, 1].scatter(np.random.randn(50), np.random.randn(50))
axes[0, 1].set_title('Scatter Plot')

# 第三个子图 - 柱状图
categories = ['A', 'B', 'C', 'D']
values = [23, 45, 56, 78]
axes[1, 0].bar(categories, values)
axes[1, 0].set_title('Bar Plot')

# 第四个子图 - 直方图
data = np.random.normal(0, 1, 1000)
axes[1, 1].hist(data, bins=30)
axes[1, 1].set_title('Histogram')

plt.tight_layout()
plt.show()

# 更多图形类型
# 饼图
labels = ['Python', 'Java', 'JavaScript', 'C++']
sizes = [40, 25, 20, 15]
colors = ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue']

plt.figure(figsize=(8, 6))
plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=90)
plt.title('Programming Languages Usage')
plt.axis('equal')
plt.show()

# 箱型图
data_to_plot = [np.random.normal(0, std, 100) for std in range(1, 4)]

plt.figure(figsize=(8, 6))
plt.boxplot(data_to_plot, labels=['Group 1', 'Group 2', 'Group 3'])
plt.title('Box Plot Example')
plt.ylabel('Values')
plt.show()

# 热力图
data = np.random.rand(10, 12)
plt.figure(figsize=(10, 8))
plt.imshow(data, cmap='viridis', aspect='auto')
plt.colorbar()
plt.title('Heatmap Example')
plt.show()

# 3D 图形
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(12, 5))

# 3D 散点图
ax1 = fig.add_subplot(121, projection='3d')
x = np.random.randn(100)
y = np.random.randn(100)
z = np.random.randn(100)
ax1.scatter(x, y, z)
ax1.set_title('3D Scatter Plot')

# 3D 表面图
ax2 = fig.add_subplot(122, projection='3d')
x = np.linspace(-5, 5, 50)
y = np.linspace(-5, 5, 50)
X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))
ax2.plot_surface(X, Y, Z, cmap='viridis')
ax2.set_title('3D Surface Plot')

plt.show()
```

## 🔀 并发编程

### 1. 多线程

```python
import threading
import time
import queue
from concurrent.futures import ThreadPoolExecutor

# 基础线程
def worker(name, duration):
    """工作函数"""
    print(f"Worker {name} starting...")
    time.sleep(duration)
    print(f"Worker {name} finished after {duration} seconds")

# 创建并启动线程
thread1 = threading.Thread(target=worker, args=("A", 2))
thread2 = threading.Thread(target=worker, args=("B", 3))

thread1.start()
thread2.start()

# 等待线程完成
thread1.join()
thread2.join()

print("All workers finished")

# 线程池
def fetch_data(url):
    """模拟网络请求"""
    time.sleep(1)
    return f"Data from {url}"

urls = [f"http://example.com/page{i}" for i in range(5)]

# 使用线程池
with ThreadPoolExecutor(max_workers=3) as executor:
    futures = [executor.submit(fetch_data, url) for url in urls]
    results = [future.result() for future in futures]

print(results)

# 线程同步 - 锁
import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        with lock:
            counter += 1

threads = []
for i in range(5):
    thread = threading.Thread(target=increment)
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()

print(f"Counter: {counter}")  # 应该是 500000

# 生产者-消费者模式
def producer(q):
    """生产者"""
    for i in range(5):
        item = f"item-{i}"
        q.put(item)
        print(f"Produced: {item}")
        time.sleep(0.5)

def consumer(q):
    """消费者"""
    while True:
        try:
            item = q.get(timeout=2)
            print(f"Consumed: {item}")
            q.task_done()
            time.sleep(1)
        except queue.Empty:
            break

q = queue.Queue()

prod_thread = threading.Thread(target=producer, args=(q,))
cons_thread = threading.Thread(target=consumer, args=(q,))

prod_thread.start()
cons_thread.start()

prod_thread.join()
cons_thread.join()
```

### 2. 异步编程

```python
import asyncio
import aiohttp
import time

# 基础异步函数
async def hello_async():
    """异步问候函数"""
    print("Hello")
    await asyncio.sleep(1)
    print("World")

# 运行异步函数
asyncio.run(hello_async())

# 并发执行多个异步任务
async def fetch_data_async(url, session):
    """异步获取数据"""
    async with session.get(url) as response:
        return await response.text()

async def main():
    """主异步函数"""
    urls = [
        "http://httpbin.org/delay/1",
        "http://httpbin.org/delay/2",
        "http://httpbin.org/delay/1"
    ]

    async with aiohttp.ClientSession() as session:
        # 并发执行请求
        start_time = time.time()
        tasks = [fetch_data_async(url, session) for url in urls]
        results = await asyncio.gather(*tasks)
        end_time = time.time()

        print(f"Total time: {end_time - start_time:.2f} seconds")
        print(f"Fetched {len(results)} URLs")

# 运行主函数
# asyncio.run(main())

# 异步生成器
async def async_range(count):
    """异步数字生成器"""
    for i in range(count):
        await asyncio.sleep(0.1)
        yield i

async def consume_async_generator():
    """消费异步生成器"""
    async for number in async_range(5):
        print(f"Received: {number}")

# asyncio.run(consume_async_generator())

# 异步上下文管理器
class AsyncDatabaseConnection:
    """异步数据库连接"""

    async def __aenter__(self):
        print("Connecting to database...")
        await asyncio.sleep(0.5)
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        print("Closing database connection...")
        await asyncio.sleep(0.2)

async def use_async_context():
    """使用异步上下文管理器"""
    async with AsyncDatabaseConnection() as conn:
        print("Using database connection")
        await asyncio.sleep(1)

# asyncio.run(use_async_context())
```

## 🚀 实战项目

### 1. Web API 服务器

```python
# Flask API 服务器
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# 数据模型
class Task(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

# API 路由
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    """获取任务列表"""
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

@app.route('/api/tasks/<task_id>', methods=['GET'])
def get_task(task_id):
    """获取单个任务"""
    task = Task.query.get_or_404(task_id)
    return jsonify(task.to_dict())

@app.route('/api/tasks', methods=['POST'])
def create_task():
    """创建新任务"""
    data = request.get_json()

    if not data or not data.get('title'):
        return jsonify({'error': 'Title is required'}), 400

    task = Task(
        title=data['title'],
        description=data.get('description', '')
    )

    db.session.add(task)
    db.session.commit()

    return jsonify(task.to_dict()), 201

@app.route('/api/tasks/<task_id>', methods=['PUT'])
def update_task(task_id):
    """更新任务"""
    task = Task.query.get_or_404(task_id)
    data = request.get_json()

    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    if 'completed' in data:
        task.completed = data['completed']

    db.session.commit()

    return jsonify(task.to_dict())

@app.route('/api/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    """删除任务"""
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()

    return '', 204

# 错误处理
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# 初始化数据库
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
```

### 2. 数据分析项目

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# 生成示例销售数据
def generate_sales_data():
    """生成模拟销售数据"""
    np.random.seed(42)

    # 日期范围
    start_date = datetime(2024, 1, 1)
    end_date = datetime(2024, 12, 31)
    dates = pd.date_range(start_date, end_date, freq='D')

    # 产品和类别
    products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E']
    categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports']
    regions = ['North', 'South', 'East', 'West']

    # 生成销售记录
    data = []
    for date in dates:
        # 每天随机生成20-50个销售记录
        daily_sales = np.random.randint(20, 51)

        for _ in range(daily_sales):
            record = {
                'date': date,
                'product': np.random.choice(products),
                'category': np.random.choice(categories),
                'region': np.random.choice(regions),
                'quantity': np.random.randint(1, 10),
                'unit_price': np.random.uniform(10, 500),
                'customer_id': np.random.randint(1000, 9999)
            }
            record['revenue'] = record['quantity'] * record['unit_price']
            data.append(record)

    return pd.DataFrame(data)

# 数据分析类
class SalesAnalyzer:
    """销售数据分析器"""

    def __init__(self, data):
        self.data = data.copy()
        self.prepare_data()

    def prepare_data(self):
        """数据预处理"""
        # 确保日期列是 datetime 类型
        self.data['date'] = pd.to_datetime(self.data['date'])

        # 添加时间相关列
        self.data['year'] = self.data['date'].dt.year
        self.data['month'] = self.data['date'].dt.month
        self.data['quarter'] = self.data['date'].dt.quarter
        self.data['day_of_week'] = self.data['date'].dt.day_name()

    def basic_statistics(self):
        """基础统计信息"""
        print("=== 销售数据基础统计 ===")
        print(f"总销售记录数: {len(self.data):,}")
        print(f"数据时间范围: {self.data['date'].min()} 到 {self.data['date'].max()}")
        print(f"总收入: ${self.data['revenue'].sum():,.2f}")
        print(f"平均每笔收入: ${self.data['revenue'].mean():.2f}")
        print(f"独特产品数: {self.data['product'].nunique()}")
        print(f"独特客户数: {self.data['customer_id'].nunique()}")
        print("\n")

    def monthly_analysis(self):
        """月度分析"""
        monthly_sales = self.data.groupby('month').agg({
            'revenue': 'sum',
            'quantity': 'sum'
        }).reset_index()

        plt.figure(figsize=(12, 5))

        plt.subplot(1, 2, 1)
        plt.plot(monthly_sales['month'], monthly_sales['revenue'], marker='o')
        plt.title('月度收入趋势')
        plt.xlabel('月份')
        plt.ylabel('收入 ($)')
        plt.grid(True)

        plt.subplot(1, 2, 2)
        plt.bar(monthly_sales['month'], monthly_sales['quantity'])
        plt.title('月度销量')
        plt.xlabel('月份')
        plt.ylabel('销量')

        plt.tight_layout()
        plt.show()

        return monthly_sales

    def product_analysis(self):
        """产品分析"""
        product_sales = self.data.groupby('product').agg({
            'revenue': 'sum',
            'quantity': 'sum'
        }).sort_values('revenue', ascending=False)

        plt.figure(figsize=(12, 5))

        plt.subplot(1, 2, 1)
        plt.pie(product_sales['revenue'], labels=product_sales.index, autopct='%1.1f%%')
        plt.title('产品收入占比')

        plt.subplot(1, 2, 2)
        plt.bar(product_sales.index, product_sales['revenue'])
        plt.title('产品收入对比')
        plt.xticks(rotation=45)
        plt.ylabel('收入 ($)')

        plt.tight_layout()
        plt.show()

        return product_sales

    def regional_analysis(self):
        """区域分析"""
        regional_sales = self.data.groupby('region').agg({
            'revenue': 'sum',
            'quantity': 'sum'
        })

        # 热力图
        pivot_data = self.data.groupby(['region', 'category'])['revenue'].sum().unstack()

        plt.figure(figsize=(10, 6))
        sns.heatmap(pivot_data, annot=True, fmt='.0f', cmap='YlOrRd')
        plt.title('区域-类别收入热力图')
        plt.show()

        return regional_sales

    def time_series_analysis(self):
        """时间序列分析"""
        daily_sales = self.data.groupby('date')['revenue'].sum().reset_index()

        # 计算移动平均
        daily_sales['ma_7'] = daily_sales['revenue'].rolling(window=7).mean()
        daily_sales['ma_30'] = daily_sales['revenue'].rolling(window=30).mean()

        plt.figure(figsize=(15, 6))
        plt.plot(daily_sales['date'], daily_sales['revenue'], alpha=0.3, label='日销售额')
        plt.plot(daily_sales['date'], daily_sales['ma_7'], label='7日移动平均')
        plt.plot(daily_sales['date'], daily_sales['ma_30'], label='30日移动平均')
        plt.title('销售额时间序列分析')
        plt.xlabel('日期')
        plt.ylabel('销售额 ($)')
        plt.legend()
        plt.grid(True)
        plt.show()

        return daily_sales

    def generate_report(self):
        """生成综合报告"""
        print("=== 销售数据分析报告 ===")

        # 基础统计
        self.basic_statistics()

        # 各维度分析
        monthly_data = self.monthly_analysis()
        product_data = self.product_analysis()
        regional_data = self.regional_analysis()
        daily_data = self.time_series_analysis()

        # 关键洞察
        print("=== 关键洞察 ===")
        best_month = monthly_data.loc[monthly_data['revenue'].idxmax(), 'month']
        best_product = product_data.index[0]
        best_region = regional_data['revenue'].idxmax()

        print(f"最佳销售月份: {best_month}月")
        print(f"最佳销售产品: {best_product}")
        print(f"最佳销售区域: {best_region}")

# 运行分析
if __name__ == "__main__":
    # 生成数据
    sales_data = generate_sales_data()

    # 创建分析器并运行分析
    analyzer = SalesAnalyzer(sales_data)
    analyzer.generate_report()
```

### 3. 自动化脚本

```python
import os
import shutil
import logging
from datetime import datetime
from pathlib import Path
import zipfile
import schedule
import time

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('automation.log'),
        logging.StreamHandler()
    ]
)

class FileManager:
    """文件管理自动化工具"""

    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)

    def organize_downloads(self):
        """整理下载文件夹"""
        downloads_path = Path(self.config['downloads_path'])

        if not downloads_path.exists():
            self.logger.warning(f"Downloads path does not exist: {downloads_path}")
            return

        # 文件类型映射
        file_types = {
            'images': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'],
            'documents': ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
            'spreadsheets': ['.xls', '.xlsx', '.csv'],
            'archives': ['.zip', '.rar', '.7z', '.tar', '.gz'],
            'videos': ['.mp4', '.avi', '.mkv', '.mov', '.wmv'],
            'audio': ['.mp3', '.wav', '.flac', '.aac']
        }

        # 创建分类文件夹
        for category in file_types.keys():
            category_path = downloads_path / category
            category_path.mkdir(exist_ok=True)

        # 整理文件
        moved_files = 0
        for file_path in downloads_path.iterdir():
            if file_path.is_file():
                file_extension = file_path.suffix.lower()

                # 找到对应的类别
                target_category = None
                for category, extensions in file_types.items():
                    if file_extension in extensions:
                        target_category = category
                        break

                if target_category:
                    target_path = downloads_path / target_category / file_path.name

                    # 处理重名文件
                    counter = 1
                    while target_path.exists():
                        name = file_path.stem
                        extension = file_path.suffix
                        new_name = f"{name}_{counter}{extension}"
                        target_path = downloads_path / target_category / new_name
                        counter += 1

                    try:
                        shutil.move(str(file_path), str(target_path))
                        moved_files += 1
                        self.logger.info(f"Moved {file_path.name} to {target_category}/")
                    except Exception as e:
                        self.logger.error(f"Failed to move {file_path.name}: {e}")

        self.logger.info(f"Organized {moved_files} files")

    def backup_important_folders(self):
        """备份重要文件夹"""
        backup_base = Path(self.config['backup_path'])
        backup_base.mkdir(exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        for folder_path in self.config['important_folders']:
            source = Path(folder_path)

            if not source.exists():
                self.logger.warning(f"Source folder does not exist: {source}")
                continue

            # 创建备份文件名
            backup_name = f"{source.name}_{timestamp}.zip"
            backup_path = backup_base / backup_name

            try:
                # 创建 ZIP 备份
                with zipfile.ZipFile(backup_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
                    for file_path in source.rglob('*'):
                        if file_path.is_file():
                            arcname = file_path.relative_to(source.parent)
                            zipf.write(file_path, arcname)

                self.logger.info(f"Created backup: {backup_name}")

            except Exception as e:
                self.logger.error(f"Failed to backup {source}: {e}")

    def clean_temp_files(self):
        """清理临时文件"""
        temp_paths = [
            Path.home() / "AppData" / "Local" / "Temp",  # Windows
            Path("/tmp"),  # Linux/Mac
            Path.home() / ".cache"  # Linux cache
        ]

        total_freed = 0

        for temp_path in temp_paths:
            if not temp_path.exists():
                continue

            try:
                for item in temp_path.iterdir():
                    if item.is_file():
                        try:
                            size = item.stat().st_size
                            item.unlink()
                            total_freed += size
                        except (PermissionError, FileNotFoundError):
                            continue
                    elif item.is_dir():
                        try:
                            shutil.rmtree(item)
                        except (PermissionError, OSError):
                            continue

            except PermissionError:
                self.logger.warning(f"Permission denied for {temp_path}")

        freed_mb = total_freed / (1024 * 1024)
        self.logger.info(f"Cleaned up {freed_mb:.2f} MB of temporary files")

    def monitor_disk_space(self):
        """监控磁盘空间"""
        for path in self.config['monitored_drives']:
            try:
                total, used, free = shutil.disk_usage(path)
                free_percentage = (free / total) * 100

                self.logger.info(f"Drive {path}: {free_percentage:.1f}% free")

                if free_percentage < self.config['disk_space_warning_threshold']:
                    self.logger.warning(f"Low disk space on {path}: {free_percentage:.1f}% free")

                    # 这里可以添加发送邮件或其他通知的逻辑

            except Exception as e:
                self.logger.error(f"Failed to check disk space for {path}: {e}")

# 主自动化类
class AutomationScheduler:
    """自动化任务调度器"""

    def __init__(self):
        # 配置
        self.config = {
            'downloads_path': str(Path.home() / "Downloads"),
            'backup_path': str(Path.home() / "Backups"),
            'important_folders': [
                str(Path.home() / "Documents"),
                str(Path.home() / "Pictures"),
            ],
            'monitored_drives': ["/"],  # Linux/Mac，Windows 用 ["C:\\"]
            'disk_space_warning_threshold': 10  # 10% 剩余空间时警告
        }

        self.file_manager = FileManager(self.config)
        self.logger = logging.getLogger(__name__)

    def setup_schedule(self):
        """设置定时任务"""
        # 每天早上 9 点整理下载文件夹
        schedule.every().day.at("09:00").do(self.file_manager.organize_downloads)

        # 每周日凌晨 2 点备份重要文件夹
        schedule.every().sunday.at("02:00").do(self.file_manager.backup_important_folders)

        # 每天清理临时文件
        schedule.every().day.at("01:00").do(self.file_manager.clean_temp_files)

        # 每小时监控磁盘空间
        schedule.every().hour.do(self.file_manager.monitor_disk_space)

        self.logger.info("Scheduled tasks set up successfully")

    def run_scheduler(self):
        """运行调度器"""
        self.setup_schedule()

        self.logger.info("Automation scheduler started")

        try:
            while True:
                schedule.run_pending()
                time.sleep(60)  # 每分钟检查一次
        except KeyboardInterrupt:
            self.logger.info("Automation scheduler stopped")

# 运行自动化系统
if __name__ == "__main__":
    scheduler = AutomationScheduler()

    # 可以选择运行单个任务或启动调度器
    print("选择操作:")
    print("1. 整理下载文件夹")
    print("2. 备份重要文件夹")
    print("3. 清理临时文件")
    print("4. 监控磁盘空间")
    print("5. 启动自动化调度器")

    choice = input("请输入选择 (1-5): ")

    if choice == "1":
        scheduler.file_manager.organize_downloads()
    elif choice == "2":
        scheduler.file_manager.backup_important_folders()
    elif choice == "3":
        scheduler.file_manager.clean_temp_files()
    elif choice == "4":
        scheduler.file_manager.monitor_disk_space()
    elif choice == "5":
        scheduler.run_scheduler()
    else:
        print("无效选择")
```

## 🏆 最佳实践

### 1. 代码质量

```python
# 代码风格和规范

# 1. 遵循 PEP 8 风格指南
# 使用工具: black, isort, flake8

# 2. 使用类型提示
from typing import List, Dict, Optional, Union

def process_user_data(
    users: List[Dict[str, Union[str, int]]],
    active_only: bool = True
) -> List[Dict[str, Union[str, int]]]:
    """处理用户数据

    Args:
        users: 用户数据列表
        active_only: 是否只返回活跃用户

    Returns:
        处理后的用户数据列表
    """
    if active_only:
        return [user for user in users if user.get('active', False)]
    return users

# 3. 文档字符串
class DataProcessor:
    """数据处理器

    用于处理各种格式的数据，包括清洗、转换和验证。

    Attributes:
        config (Dict): 配置参数
        logger (Logger): 日志记录器

    Example:
        >>> processor = DataProcessor({'validate': True})
        >>> result = processor.process(['data1', 'data2'])
    """

    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.logger = logging.getLogger(__name__)

    def process(self, data: List[str]) -> List[str]:
        """处理数据

        Args:
            data: 输入数据列表

        Returns:
            处理后的数据列表

        Raises:
            ValueError: 当数据格式无效时
        """
        pass

# 4. 错误处理最佳实践
def safe_divide(a: float, b: float) -> Optional[float]:
    """安全除法操作"""
    try:
        if b == 0:
            raise ValueError("Division by zero")
        return a / b
    except TypeError:
        logger.error(f"Invalid types for division: {type(a)}, {type(b)}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error in division: {e}")
        return None

# 5. 资源管理
class DatabaseManager:
    """数据库管理器"""

    def __enter__(self):
        self.connection = connect_to_database()
        return self.connection

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.connection:
            self.connection.close()

# 使用上下文管理器
with DatabaseManager() as db:
    db.execute("SELECT * FROM users")

# 6. 配置管理
import os
from dataclasses import dataclass

@dataclass
class Config:
    """应用配置"""
    database_url: str = os.getenv('DATABASE_URL', 'sqlite:///default.db')
    debug: bool = os.getenv('DEBUG', 'False').lower() == 'true'
    log_level: str = os.getenv('LOG_LEVEL', 'INFO')
    api_key: str = os.getenv('API_KEY', '')

config = Config()
```

### 2. 测试策略

```python
import unittest
import pytest
from unittest.mock import Mock, patch, MagicMock
import tempfile
import os

# 单元测试示例
class TestMathOperations(unittest.TestCase):
    """数学操作测试"""

    def setUp(self):
        """测试前设置"""
        self.calculator = Calculator()

    def test_addition(self):
        """测试加法"""
        result = self.calculator.add(2, 3)
        self.assertEqual(result, 5)

    def test_division_by_zero(self):
        """测试除零错误"""
        with self.assertRaises(ValueError):
            self.calculator.divide(10, 0)

    def test_negative_numbers(self):
        """测试负数"""
        result = self.calculator.multiply(-2, 3)
        self.assertEqual(result, -6)

# pytest 测试示例
def test_user_creation():
    """测试用户创建"""
    user = User("Alice", "alice@example.com")
    assert user.name == "Alice"
    assert user.email == "alice@example.com"
    assert user.is_active is True

@pytest.fixture
def sample_data():
    """测试数据夹具"""
    return {
        'users': [
            {'name': 'Alice', 'age': 30},
            {'name': 'Bob', 'age': 25}
        ]
    }

def test_data_processing(sample_data):
    """测试数据处理"""
    processor = DataProcessor()
    result = processor.process(sample_data['users'])
    assert len(result) == 2

# Mock 测试
class TestAPIClient(unittest.TestCase):
    """API 客户端测试"""

    @patch('requests.get')
    def test_fetch_user(self, mock_get):
        """测试获取用户"""
        # 设置 mock 返回值
        mock_response = Mock()
        mock_response.json.return_value = {'id': 1, 'name': 'Alice'}
        mock_response.status_code = 200
        mock_get.return_value = mock_response

        # 执行测试
        client = APIClient()
        user = client.fetch_user(1)

        # 验证结果
        self.assertEqual(user['name'], 'Alice')
        mock_get.assert_called_once_with('https://api.example.com/users/1')

# 集成测试
class TestFileProcessor(unittest.TestCase):
    """文件处理器集成测试"""

    def setUp(self):
        """创建临时文件"""
        self.temp_dir = tempfile.mkdtemp()
        self.test_file = os.path.join(self.temp_dir, 'test.txt')
        with open(self.test_file, 'w') as f:
            f.write("test content")

    def tearDown(self):
        """清理临时文件"""
        import shutil
        shutil.rmtree(self.temp_dir)

    def test_file_processing(self):
        """测试文件处理"""
        processor = FileProcessor()
        result = processor.process_file(self.test_file)
        self.assertIsNotNone(result)

# 参数化测试
@pytest.mark.parametrize("input,expected", [
    (2, 4),
    (3, 9),
    (-2, 4),
    (0, 0)
])
def test_square(input, expected):
    """参数化测试平方函数"""
    assert square(input) == expected

# 性能测试
import time

def test_performance():
    """性能测试"""
    start_time = time.time()

    # 执行被测试的代码
    result = expensive_operation()

    end_time = time.time()
    execution_time = end_time - start_time

    # 验证性能要求
    assert execution_time < 1.0  # 应在1秒内完成
    assert result is not None
```

### 3. 部署和运维

```python
# requirements.txt 管理
"""
# 生产依赖
Flask==2.3.0
SQLAlchemy==2.0.0
requests==2.31.0

# 开发依赖
pytest==7.4.0
black==23.0.0
flake8==6.0.0

# 固定版本确保一致性
numpy==1.24.0
pandas==2.0.0
"""

# Docker 配置
"""
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# 复制依赖文件
COPY requirements.txt .

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 5000

# 创建非 root 用户
RUN adduser --disabled-password --gecos '' appuser
USER appuser

# 启动命令
CMD ["python", "app.py"]
"""

# docker-compose.yml
"""
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    depends_on:
      - db
    volumes:
      - ./logs:/app/logs

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
"""

# 日志配置
import logging.config

LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'default': {
            'level': 'INFO',
            'formatter': 'standard',
            'class': 'logging.StreamHandler',
        },
        'file': {
            'level': 'INFO',
            'formatter': 'standard',
            'class': 'logging.FileHandler',
            'filename': 'app.log',
            'mode': 'a',
        },
    },
    'loggers': {
        '': {
            'handlers': ['default', 'file'],
            'level': 'INFO',
            'propagate': False
        }
    }
}

logging.config.dictConfig(LOGGING_CONFIG)

# 健康检查端点
from flask import Flask

app = Flask(__name__)

@app.route('/health')
def health_check():
    """健康检查端点"""
    # 检查数据库连接、外部服务等
    try:
        # 数据库连接检查
        db.engine.execute('SELECT 1')

        return {
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat(),
            'version': '1.0.0'
        }, 200
    except Exception as e:
        return {
            'status': 'unhealthy',
            'error': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }, 503

# 监控和指标
from prometheus_client import Counter, Histogram, generate_latest

REQUEST_COUNT = Counter('requests_total', 'Total requests', ['method', 'endpoint'])
REQUEST_LATENCY = Histogram('request_duration_seconds', 'Request latency')

@app.before_request
def before_request():
    g.start_time = time.time()

@app.after_request
def after_request(response):
    REQUEST_COUNT.labels(method=request.method, endpoint=request.endpoint).inc()
    REQUEST_LATENCY.observe(time.time() - g.start_time)
    return response

@app.route('/metrics')
def metrics():
    """Prometheus 指标端点"""
    return generate_latest()
```

## 🎯 总结

Python 是一门功能强大、应用广泛的编程语言。通过本指南的学习，你应该掌握了：

### 🔤 核心语法
- 变量、数据类型和控制结构
- 函数、类和模块的使用
- 异常处理和文件操作

### 🚀 高级特性
- 面向对象编程
- 装饰器和生成器
- 并发和异步编程

### 🌐 实际应用
- Web 开发 (Flask/Django)
- 数据科学 (NumPy/Pandas/Matplotlib)
- 自动化脚本和工具开发

### 💡 最佳实践
- 代码质量和测试
- 项目结构和依赖管理
- 部署和运维

### 📚 继续学习

- **高级主题**: 元编程、性能优化、设计模式
- **专业领域**: 机器学习、Web 框架深入、数据工程
- **工具生态**: IDE 配置、调试技术、性能分析

Python 的强大在于其丰富的生态系统和活跃的社区。持续实践和探索新的库和技术，将帮助你成为一名优秀的 Python 开发者！

---

*Happy Coding with Python! 🐍*
```
```