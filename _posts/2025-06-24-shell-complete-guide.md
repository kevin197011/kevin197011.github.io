---
layout: post
title: "Shell 完全指南：从入门到精通"
date: 2025-06-24 20:00:00 +0800
category: DevOps
tags: [Shell, Bash, Linux, 运维, 自动化, DevOps, 脚本编程]
author: Kk
excerpt: "全面掌握Shell脚本编程，从基础语法到高级技巧，提升Linux运维和自动化能力"
diagram: |
  graph TB
      subgraph "Shell生态系统"
          subgraph "Shell类型"
              BASH[Bash Shell]
              ZSH[Zsh Shell]
              FISH[Fish Shell]
              DASH[Dash Shell]
              KSH[Korn Shell]
              CSH[C Shell]
          end

          subgraph "基础概念"
              TERMINAL[终端模拟器]
              SHELL_ENV[Shell环境]
              PROCESS[进程管理]
              VARIABLES[变量系统]
              PIPES[管道通信]
              REDIRECTION[重定向]
          end

          subgraph "脚本编程"
              SYNTAX[语法基础]
              FUNCTIONS[函数定义]
              CONDITIONALS[条件语句]
              LOOPS[循环结构]
              ARRAYS[数组处理]
              REGEX[正则表达式]
          end

          subgraph "系统交互"
              FILE_OPS[文件操作]
              PERMISSIONS[权限管理]
              SYSTEM_INFO[系统信息]
              NETWORK[网络工具]
              SERVICE_MGMT[服务管理]
              CRON[定时任务]
          end

          subgraph "高级特性"
              SIGNAL_HANDLING[信号处理]
              JOB_CONTROL[作业控制]
              PARAMETER_EXPANSION[参数扩展]
              COMMAND_SUBSTITUTION[命令替换]
              ARITHMETIC[算术运算]
              DEBUGGING[调试技巧]
          end

          subgraph "实用工具"
              TEXT_PROCESSING[文本处理]
              AWK[AWK编程]
              SED[SED编辑器]
              GREP[GREP搜索]
              FIND[文件查找]
              SORT[排序工具]
          end

          subgraph "自动化应用"
              DEPLOYMENT[部署脚本]
              MONITORING[监控脚本]
              BACKUP[备份脚本]
              LOG_ANALYSIS[日志分析]
              CI_CD[CI/CD集成]
              INFRASTRUCTURE[基础设施管理]
          end
      end

      TERMINAL --> SHELL_ENV
      SHELL_ENV --> BASH
      BASH --> SYNTAX
      SYNTAX --> FUNCTIONS
      SYNTAX --> CONDITIONALS
      SYNTAX --> LOOPS

      VARIABLES --> PARAMETER_EXPANSION
      PIPES --> COMMAND_SUBSTITUTION
      REDIRECTION --> FILE_OPS

      FUNCTIONS --> DEPLOYMENT
      CONDITIONALS --> MONITORING
      LOOPS --> BACKUP

      TEXT_PROCESSING --> AWK
      TEXT_PROCESSING --> SED
      TEXT_PROCESSING --> GREP
      GREP --> LOG_ANALYSIS

      SYSTEM_INFO --> MONITORING
      SERVICE_MGMT --> DEPLOYMENT
      CRON --> AUTOMATION

      DEBUGGING --> CI_CD
      PARAMETER_EXPANSION --> INFRASTRUCTURE

      style BASH fill:#4eaa25,stroke:#fff,stroke-width:2px,color:#fff
      style TERMINAL fill:#2e3440,stroke:#fff,stroke-width:2px,color:#fff
      style SYNTAX fill:#88c999,stroke:#fff,stroke-width:2px,color:#000
      style TEXT_PROCESSING fill:#d08770,stroke:#fff,stroke-width:2px,color:#fff
      style AUTOMATION fill:#5e81ac,stroke:#fff,stroke-width:2px,color:#fff
      style AWK fill:#bf616a,stroke:#fff,stroke-width:2px,color:#fff
      style SED fill:#ebcb8b,stroke:#fff,stroke-width:2px,color:#000
      style GREP fill:#a3be8c,stroke:#fff,stroke-width:2px,color:#000
---

# Shell 完全指南：从入门到精通

## 🚀 什么是 Shell

Shell 是用户与操作系统内核之间的接口，它既是命令解释器，也是一种强大的编程语言。通过 Shell，我们可以执行系统命令、编写自动化脚本，实现复杂的系统管理任务。

### 核心特点

- **🖥️ 命令行界面**: 提供强大的命令行交互环境
- **📜 脚本编程**: 支持复杂的脚本编程逻辑
- **🔧 系统管理**: 深度集成系统功能
- **⚡ 高效自动化**: 快速实现任务自动化
- **🌐 跨平台**: 广泛支持各种 Unix-like 系统

## 📦 Shell 环境搭建

### 查看当前 Shell

```bash
# 查看当前使用的 Shell
echo $SHELL

# 查看系统可用的 Shell
cat /etc/shells

# 查看 Shell 版本
bash --version
```

### 切换 Shell

```bash
# 临时切换到 zsh
exec zsh

# 永久切换 Shell
chsh -s /bin/zsh

# 切换回 bash
chsh -s /bin/bash
```

### 配置文件

```bash
# Bash 配置文件
~/.bashrc          # 交互式非登录 shell
~/.bash_profile    # 登录 shell
~/.bash_aliases    # 别名定义
~/.bash_logout     # 登出时执行

# 系统级配置
/etc/bashrc        # 系统范围的 bashrc
/etc/profile       # 系统范围的 profile
```

## 🎯 基础语法

### 1. 变量和环境变量

```bash
#!/bin/bash

# 定义变量（注意等号两边不能有空格）
name="Shell Tutorial"
number=42
readonly PI=3.14159

# 使用变量
echo "Welcome to $name"
echo "Number is: $number"
echo "PI value: $PI"

# 环境变量
export PATH="/custom/path:$PATH"
export DATABASE_URL="postgresql://localhost:5432/mydb"

# 查看所有环境变量
env

# 查看特定变量
echo $HOME
echo $USER
echo $PWD
```

### 2. 特殊变量

```bash
#!/bin/bash

# 脚本参数
echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "All arguments: $@"
echo "Number of arguments: $#"

# 进程相关
echo "Current PID: $$"
echo "Last command exit status: $?"
echo "Last background process PID: $!"

# 示例脚本调用：./script.sh arg1 arg2
```

### 3. 字符串操作

```bash
#!/bin/bash

text="Hello World"

# 字符串长度
echo "Length: ${#text}"

# 字符串截取
echo "Substring: ${text:0:5}"        # 输出: Hello
echo "Substring: ${text:6}"          # 输出: World

# 字符串替换
echo "Replace: ${text/World/Shell}"  # 输出: Hello Shell
echo "Replace all: ${text//l/L}"     # 输出: HeLLo WorLd

# 字符串删除
echo "Remove prefix: ${text#Hello }" # 输出: World
echo "Remove suffix: ${text% World}" # 输出: Hello

# 大小写转换
echo "Uppercase: ${text^^}"          # 输出: HELLO WORLD
echo "Lowercase: ${text,,}"          # 输出: hello world
```

### 4. 数组操作

```bash
#!/bin/bash

# 定义数组
fruits=("apple" "banana" "orange")
numbers=(1 2 3 4 5)

# 访问数组元素
echo "First fruit: ${fruits[0]}"
echo "All fruits: ${fruits[@]}"
echo "Array length: ${#fruits[@]}"

# 遍历数组
for fruit in "${fruits[@]}"; do
    echo "Fruit: $fruit"
done

# 添加元素
fruits+=("grape")

# 关联数组（Bash 4.0+）
declare -A colors
colors["red"]="#FF0000"
colors["green"]="#00FF00"
colors["blue"]="#0000FF"

echo "Red color: ${colors[red]}"
```

## 🔧 控制结构

### 1. 条件语句

```bash
#!/bin/bash

# if-else 语句
number=10

if [ $number -gt 5 ]; then
    echo "Number is greater than 5"
elif [ $number -eq 5 ]; then
    echo "Number equals 5"
else
    echo "Number is less than 5"
fi

# 文件测试
file="/etc/passwd"

if [ -f "$file" ]; then
    echo "File exists"
    if [ -r "$file" ]; then
        echo "File is readable"
    fi
fi

# 字符串比较
name="admin"

if [ "$name" = "admin" ]; then
    echo "Admin user detected"
fi

# 多条件判断
age=25
status="active"

if [ $age -ge 18 ] && [ "$status" = "active" ]; then
    echo "User is adult and active"
fi
```

### 2. case 语句

```bash
#!/bin/bash

action=$1

case $action in
    "start")
        echo "Starting service..."
        ;;
    "stop")
        echo "Stopping service..."
        ;;
    "restart")
        echo "Restarting service..."
        ;;
    "status")
        echo "Checking service status..."
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac
```

### 3. 循环结构

```bash
#!/bin/bash

# for 循环
for i in {1..5}; do
    echo "Iteration: $i"
done

# for 循环遍历文件
for file in *.txt; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
    fi
done

# while 循环
counter=1
while [ $counter -le 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done

# until 循环
count=0
until [ $count -gt 3 ]; do
    echo "Count: $count"
    ((count++))
done

# 无限循环
while true; do
    echo "Press Ctrl+C to stop"
    sleep 1
done
```

## 📁 函数定义

### 1. 基本函数

```bash
#!/bin/bash

# 函数定义方式1
function greet() {
    echo "Hello, $1!"
}

# 函数定义方式2
say_goodbye() {
    local name=$1
    echo "Goodbye, $name!"
}

# 调用函数
greet "World"
say_goodbye "Shell"

# 返回值函数
check_file() {
    local filename=$1
    if [ -f "$filename" ]; then
        return 0
    else
        return 1
    fi
}

# 使用返回值
if check_file "/etc/passwd"; then
    echo "File exists"
else
    echo "File not found"
fi
```

### 2. 高级函数特性

```bash
#!/bin/bash

# 递归函数 - 计算阶乘
factorial() {
    local n=$1
    if [ $n -le 1 ]; then
        echo 1
    else
        local prev=$(factorial $((n-1)))
        echo $((n * prev))
    fi
}

echo "5! = $(factorial 5)"

# 函数参数处理
process_options() {
    local OPTIND=1
    local verbose=false
    local output_file=""

    while getopts "vo:" opt; do
        case $opt in
            v) verbose=true ;;
            o) output_file="$OPTARG" ;;
            \?) echo "Invalid option: -$OPTARG" >&2; return 1 ;;
        esac
    done

    [ "$verbose" = true ] && echo "Verbose mode enabled"
    [ -n "$output_file" ] && echo "Output file: $output_file"
}

# 调用: process_options -v -o output.txt
```

## 🔍 输入输出重定向

### 1. 基础重定向

```bash
#!/bin/bash

# 输出重定向
echo "Hello World" > output.txt          # 覆盖写入
echo "New line" >> output.txt            # 追加写入

# 错误重定向
ls /nonexistent 2> error.log            # 重定向错误输出
ls /nonexistent 2>> error.log           # 追加错误输出

# 同时重定向标准输出和错误输出
ls /etc /nonexistent > output.log 2>&1  # 方式1
ls /etc /nonexistent &> output.log      # 方式2

# 输入重定向
while read line; do
    echo "Line: $line"
done < input.txt
```

### 2. Here Document

```bash
#!/bin/bash

# Here Document
cat << EOF
This is a multi-line
text block that can contain
variables like $USER
EOF

# Here String
grep "pattern" <<< "search in this string"

# 生成配置文件
generate_config() {
    local server_name=$1
    local port=$2

cat << EOF > /etc/nginx/sites-available/$server_name
server {
    listen $port;
    server_name $server_name;
    root /var/www/$server_name;

    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF
}
```

## 🔗 管道和过滤器

### 1. 管道操作

```bash
#!/bin/bash

# 基础管道
ps aux | grep nginx | grep -v grep

# 多级管道
cat /var/log/access.log | grep "404" | cut -d' ' -f1 | sort | uniq -c

# 统计代码行数
find . -name "*.sh" | xargs wc -l | sort -nr

# 网络监控
netstat -an | grep LISTEN | awk '{print $4}' | cut -d: -f2 | sort -n | uniq
```

### 2. 命令替换

```bash
#!/bin/bash

# 使用 $() 语法（推荐）
current_date=$(date +%Y-%m-%d)
echo "Today is: $current_date"

# 使用反引号（传统方式）
uptime_info=`uptime`
echo "System uptime: $uptime_info"

# 嵌套命令替换
backup_file="backup-$(hostname)-$(date +%Y%m%d).tar.gz"
echo "Backup file: $backup_file"

# 在函数中使用
get_disk_usage() {
    local path=$1
    local usage=$(df -h "$path" | awk 'NR==2 {print $5}')
    echo "$usage"
}

echo "Root usage: $(get_disk_usage /)"

## ⚙️ 系统操作

### 1. 文件和目录操作

```bash
#!/bin/bash

# 创建目录结构
create_project_structure() {
    local project_name=$1
    mkdir -p "$project_name"/{src,tests,docs,config}
    touch "$project_name"/README.md
    echo "Project $project_name created"
}

# 批量重命名文件
batch_rename() {
    local extension=$1
    local prefix=$2

    counter=1
    for file in *."$extension"; do
        if [ -f "$file" ]; then
            mv "$file" "${prefix}_${counter}.${extension}"
            ((counter++))
        fi
    done
}

# 查找大文件
find_large_files() {
    local size=${1:-100M}
    local path=${2:-.}

    find "$path" -type f -size +$size -exec ls -lh {} \; | \
    awk '{print $5 " " $9}' | sort -hr
}

# 文件权限批量修改
fix_permissions() {
    local dir=$1
    find "$dir" -type d -exec chmod 755 {} \;
    find "$dir" -type f -exec chmod 644 {} \;
    find "$dir" -name "*.sh" -exec chmod +x {} \;
}
```

### 2. 进程管理

```bash
#!/bin/bash

# 进程监控
monitor_process() {
    local process_name=$1
    local max_memory=${2:-1000000}  # KB

    while true; do
        local pid=$(pgrep "$process_name")
        if [ -n "$pid" ]; then
            local memory=$(ps -o rss= -p "$pid")
            if [ "$memory" -gt "$max_memory" ]; then
                echo "$(date): Process $process_name ($pid) using ${memory}KB memory"
                # 可以选择重启进程
                # kill -9 "$pid"
            fi
        fi
        sleep 60
    done
}

# 服务状态检查
check_service() {
    local service=$1

    if systemctl is-active --quiet "$service"; then
        echo "✅ $service is running"
        return 0
    else
        echo "❌ $service is not running"
        return 1
    fi
}

# 批量服务检查
check_services() {
    local services=("nginx" "mysql" "redis" "docker")

    for service in "${services[@]}"; do
        check_service "$service"
    done
}
```

### 3. 网络工具

```bash
#!/bin/bash

# 端口扫描
port_scan() {
    local host=$1
    local start_port=${2:-1}
    local end_port=${3:-1000}

    echo "Scanning ports on $host..."
    for ((port=$start_port; port<=$end_port; port++)); do
        if timeout 1 bash -c "echo > /dev/tcp/$host/$port" 2>/dev/null; then
            echo "Port $port is open"
        fi
    done
}

# 网络连接统计
network_stats() {
    echo "=== Network Connection Statistics ==="
    echo "ESTABLISHED connections:"
    netstat -an | grep ESTABLISHED | wc -l

    echo "LISTEN ports:"
    netstat -tlnp | grep LISTEN | awk '{print $4}' | sort

    echo "Top connections by IP:"
    netstat -an | grep ESTABLISHED | awk '{print $5}' | \
    cut -d: -f1 | sort | uniq -c | sort -nr | head -10
}

# 带宽监控
bandwidth_monitor() {
    local interface=${1:-eth0}
    local interval=${2:-1}

    while true; do
        local rx_bytes=$(cat /sys/class/net/$interface/statistics/rx_bytes)
        local tx_bytes=$(cat /sys/class/net/$interface/statistics/tx_bytes)

        sleep $interval

        local new_rx=$(cat /sys/class/net/$interface/statistics/rx_bytes)
        local new_tx=$(cat /sys/class/net/$interface/statistics/tx_bytes)

        local rx_rate=$(((new_rx - rx_bytes) / interval))
        local tx_rate=$(((new_tx - tx_bytes) / interval))

        printf "RX: %8s/s TX: %8s/s\n" \
               "$(numfmt --to=iec-i --suffix=B $rx_rate)" \
               "$(numfmt --to=iec-i --suffix=B $tx_rate)"
    done
}
```

## 📊 文本处理

### 1. AWK 编程

```bash
#!/bin/bash

# AWK 基础用法
awk_examples() {
    # 打印特定列
    ps aux | awk '{print $1, $11}'

    # 条件过滤
    awk '$3 > 1.0 {print $1, $3}' /proc/loadavg

    # 计算统计
    df -h | awk 'NR>1 {gsub(/%/, "", $5); if($5 > 80) print $6, $5"%"}'

    # 字段分隔符
    awk -F: '{print $1, $3}' /etc/passwd
}

# 日志分析脚本
analyze_log() {
    local log_file=$1

    echo "=== Log Analysis for $log_file ==="

    # 总行数
    echo "Total lines: $(wc -l < "$log_file")"

    # 错误统计
    echo "Error count: $(grep -c "ERROR" "$log_file")"

    # IP 访问统计
    echo "Top IPs:"
    awk '{print $1}' "$log_file" | sort | uniq -c | sort -nr | head -5

    # 状态码统计
    echo "Status codes:"
    awk '{print $9}' "$log_file" | sort | uniq -c | sort -nr

    # 访问时间分布
    echo "Hourly distribution:"
    awk '{print substr($4, 14, 2)}' "$log_file" | sort | uniq -c | sort -k2n
}
```

### 2. SED 编辑器

```bash
#!/bin/bash

# SED 常用操作
sed_examples() {
    local file="example.txt"

    # 替换
    sed 's/old/new/g' "$file"                    # 全局替换
    sed 's/old/new/2' "$file"                    # 替换第2个匹配
    sed '2,5s/old/new/g' "$file"                 # 指定行范围

    # 删除
    sed '/pattern/d' "$file"                     # 删除包含模式的行
    sed '2,4d' "$file"                           # 删除第2-4行
    sed '/^$/d' "$file"                          # 删除空行

    # 插入
    sed '2i\Insert this line' "$file"           # 在第2行前插入
    sed '2a\Append this line' "$file"           # 在第2行后追加

    # 打印
    sed -n '2,5p' "$file"                       # 打印第2-5行
    sed -n '/pattern/p' "$file"                 # 打印匹配行
}

# 配置文件处理
update_config() {
    local config_file=$1
    local key=$2
    local value=$3

    # 备份原文件
    cp "$config_file" "${config_file}.bak"

    # 更新配置
    if grep -q "^$key=" "$config_file"; then
        sed -i "s/^$key=.*/$key=$value/" "$config_file"
    else
        echo "$key=$value" >> "$config_file"
    fi
}
```

### 3. 正则表达式

```bash
#!/bin/bash

# 正则表达式示例
regex_examples() {
    local text="Contact: john@example.com or call 123-456-7890"

    # 提取邮箱
    if [[ $text =~ ([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}) ]]; then
        echo "Email found: ${BASH_REMATCH[1]}"
    fi

    # 提取电话号码
    if [[ $text =~ ([0-9]{3}-[0-9]{3}-[0-9]{4}) ]]; then
        echo "Phone found: ${BASH_REMATCH[1]}"
    fi

    # 验证 IP 地址
    validate_ip() {
        local ip=$1
        local regex='^([0-9]{1,3}\.){3}[0-9]{1,3}$'

        if [[ $ip =~ $regex ]]; then
            echo "Valid IP format"
        else
            echo "Invalid IP format"
        fi
    }
}
```

## 🛠️ 调试和错误处理

### 1. 调试技巧

```bash
#!/bin/bash

# 启用调试模式
set -x    # 显示执行的命令
set -e    # 遇到错误立即退出
set -u    # 使用未定义变量时报错
set -o pipefail  # 管道中任一命令失败都会使整个管道失败

# 或者使用组合
set -euxo pipefail

# 调试函数
debug() {
    [ "${DEBUG:-0}" = "1" ] && echo "DEBUG: $*" >&2
}

# 使用示例
DEBUG=1 ./script.sh

# 错误追踪
error_exit() {
    echo "Error: $1" >&2
    echo "Line: $2" >&2
    echo "Function: $3" >&2
    exit 1
}

trap 'error_exit "Command failed" "$LINENO" "${FUNCNAME[0]}"' ERR
```

### 2. 错误处理

```bash
#!/bin/bash

# 错误处理最佳实践
safe_execute() {
    local cmd="$1"
    local error_msg="$2"

    if ! eval "$cmd"; then
        echo "Error: $error_msg" >&2
        return 1
    fi
}

# 重试机制
retry() {
    local max_attempts=$1
    local cmd="$2"
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        if eval "$cmd"; then
            return 0
        fi
        echo "Attempt $attempt failed, retrying..."
        ((attempt++))
        sleep 1
    done

    echo "Command failed after $max_attempts attempts" >&2
    return 1
}

# 超时执行
timeout_execute() {
    local timeout=$1
    local cmd="$2"

    timeout "$timeout" bash -c "$cmd"
    local exit_code=$?

    if [ $exit_code -eq 124 ]; then
        echo "Command timed out after $timeout seconds" >&2
    fi

    return $exit_code
}
```

## 🔄 实战项目

### 1. 系统监控脚本

```bash
#!/bin/bash

# 系统监控脚本
system_monitor() {
    local threshold_cpu=80
    local threshold_memory=80
    local threshold_disk=90
    local log_file="/var/log/system_monitor.log"

    # 日志函数
    log_message() {
        echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$log_file"
    }

    # CPU 监控
    check_cpu() {
        local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
        cpu_usage=${cpu_usage%.*}  # 取整数部分

        if [ "$cpu_usage" -gt "$threshold_cpu" ]; then
            log_message "WARNING: CPU usage is ${cpu_usage}%"
            return 1
        fi
        return 0
    }

    # 内存监控
    check_memory() {
        local memory_usage=$(free | grep Mem | awk '{printf("%.0f", $3/$2 * 100.0)}')

        if [ "$memory_usage" -gt "$threshold_memory" ]; then
            log_message "WARNING: Memory usage is ${memory_usage}%"
            return 1
        fi
        return 0
    }

    # 磁盘监控
    check_disk() {
        while read output; do
            local usage=$(echo "$output" | awk '{print $5}' | cut -d'%' -f1)
            local partition=$(echo "$output" | awk '{print $6}')

            if [ "$usage" -gt "$threshold_disk" ]; then
                log_message "WARNING: Disk usage on $partition is ${usage}%"
                return 1
            fi
        done <<< "$(df -h | grep -vE '^Filesystem|tmpfs|cdrom')"
        return 0
    }

    # 执行检查
    check_cpu
    check_memory
    check_disk

    log_message "System check completed"
}
```

### 2. 自动化部署脚本

```bash
#!/bin/bash

# 自动化部署脚本
deploy_application() {
    local app_name=$1
    local version=$2
    local environment=${3:-staging}

    # 配置
    local deploy_dir="/opt/deployments"
    local backup_dir="/opt/backups"
    local service_name="$app_name"

    echo "Starting deployment of $app_name v$version to $environment"

    # 备份当前版本
    backup_current_version() {
        if [ -d "$deploy_dir/$app_name" ]; then
            local timestamp=$(date +%Y%m%d_%H%M%S)
            local backup_path="$backup_dir/${app_name}_${timestamp}"

            echo "Creating backup: $backup_path"
            cp -r "$deploy_dir/$app_name" "$backup_path"
        fi
    }

    # 下载新版本
    download_version() {
        local download_url="https://releases.company.com/$app_name/$version.tar.gz"
        local temp_dir=$(mktemp -d)

        echo "Downloading $app_name v$version"
        if wget -q "$download_url" -O "$temp_dir/$app_name.tar.gz"; then
            tar -xzf "$temp_dir/$app_name.tar.gz" -C "$temp_dir"
            rm -rf "$deploy_dir/$app_name"
            mv "$temp_dir/$app_name" "$deploy_dir/"
            rm -rf "$temp_dir"
        else
            echo "Failed to download application"
            exit 1
        fi
    }

    # 健康检查
    health_check() {
        local max_attempts=30
        local attempt=1

        while [ $attempt -le $max_attempts ]; do
            if curl -f -s "http://localhost:8080/health" > /dev/null; then
                echo "Health check passed"
                return 0
            fi
            echo "Health check attempt $attempt failed"
            sleep 2
            ((attempt++))
        done

        echo "Health check failed after $max_attempts attempts"
        return 1
    }

    # 回滚函数
    rollback() {
        echo "Rolling back to previous version"
        systemctl stop "$service_name"

        local latest_backup=$(ls -t "$backup_dir" | grep "$app_name" | head -1)
        if [ -n "$latest_backup" ]; then
            rm -rf "$deploy_dir/$app_name"
            cp -r "$backup_dir/$latest_backup" "$deploy_dir/$app_name"
            systemctl start "$service_name"
        fi
    }

    # 执行部署步骤
    backup_current_version
    systemctl stop "$service_name"
    download_version
    systemctl start "$service_name"

    if health_check; then
        echo "Deployment successful"
    else
        echo "Deployment failed, rolling back"
        rollback
        exit 1
    fi
}
```

### 3. 日志分析脚本

```bash
#!/bin/bash

# 日志分析脚本
analyze_access_logs() {
    local log_file=${1:-/var/log/nginx/access.log}
    local output_dir=${2:-./reports}
    local date_filter=${3:-$(date +%d/%b/%Y)}

    mkdir -p "$output_dir"

    echo "Analyzing access logs for $date_filter"

    # 过滤当天日志
    local filtered_log="$output_dir/filtered_$(date +%Y%m%d).log"
    grep "$date_filter" "$log_file" > "$filtered_log"

    # 生成报告
    generate_report() {
        local report_file="$output_dir/access_report_$(date +%Y%m%d).txt"

        {
            echo "=== Access Log Analysis Report ==="
            echo "Date: $date_filter"
            echo "Generated: $(date)"
            echo

            echo "=== Summary ==="
            echo "Total requests: $(wc -l < "$filtered_log")"
            echo "Unique IPs: $(awk '{print $1}' "$filtered_log" | sort | uniq | wc -l)"
            echo

            echo "=== Top 10 IP Addresses ==="
            awk '{print $1}' "$filtered_log" | sort | uniq -c | sort -nr | head -10
            echo

            echo "=== Top 10 Requested URLs ==="
            awk '{print $7}' "$filtered_log" | sort | uniq -c | sort -nr | head -10
            echo

            echo "=== HTTP Status Codes ==="
            awk '{print $9}' "$filtered_log" | sort | uniq -c | sort -nr
            echo

            echo "=== Hourly Request Distribution ==="
            awk '{print substr($4, 14, 2)}' "$filtered_log" | sort | uniq -c | sort -k2n
            echo

            echo "=== Top User Agents ==="
            awk -F'"' '{print $6}' "$filtered_log" | sort | uniq -c | sort -nr | head -5

        } > "$report_file"

        echo "Report generated: $report_file"
    }

    # 检测异常
    detect_anomalies() {
        echo "=== Anomaly Detection ==="

        # 4xx 和 5xx 错误
        local error_count=$(awk '$9 ~ /^[45]/ {count++} END {print count+0}' "$filtered_log")
        echo "HTTP errors (4xx/5xx): $error_count"

        # 可疑 IP（请求过多）
        echo "Suspicious IPs (>1000 requests):"
        awk '{print $1}' "$filtered_log" | sort | uniq -c | awk '$1 > 1000 {print $2, $1}'

        # 大文件下载
        echo "Large responses (>10MB):"
        awk '$10 > 10485760 {print $1, $7, $10}' "$filtered_log"
    }

    generate_report
    detect_anomalies
}
```

## 🎓 最佳实践

### 1. 脚本规范

```bash
#!/bin/bash
# Script: example_script.sh
# Description: Example script demonstrating best practices
# Author: Your Name
# Date: 2025-01-04
# Version: 1.0

# 严格模式
set -euo pipefail

# 全局变量
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_NAME="$(basename "$0")"
readonly LOG_FILE="/var/log/${SCRIPT_NAME%.sh}.log"

# 函数必须在使用前定义
usage() {
    cat << EOF
Usage: $SCRIPT_NAME [OPTIONS] COMMAND [ARGS...]

Description:
    Example script demonstrating Shell best practices

Options:
    -h, --help      Show this help message
    -v, --verbose   Enable verbose output
    -d, --debug     Enable debug mode

Commands:
    start           Start the service
    stop            Stop the service
    restart         Restart the service

Examples:
    $SCRIPT_NAME -v start
    $SCRIPT_NAME --debug restart

EOF
}

# 日志函数
log() {
    local level=$1
    shift
    echo "$(date '+%Y-%m-%d %H:%M:%S') [$level] $*" | tee -a "$LOG_FILE"
}

# 错误处理
error_exit() {
    log "ERROR" "$1"
    exit "${2:-1}"
}

# 清理函数
cleanup() {
    log "INFO" "Cleaning up..."
    # 清理临时文件等
}

# 注册清理函数
trap cleanup EXIT
```

### 2. 安全考虑

```bash
#!/bin/bash

# 安全编程实践
secure_practices() {
    # 验证输入
    validate_input() {
        local input=$1
        local pattern=$2

        if [[ ! $input =~ $pattern ]]; then
            echo "Invalid input: $input"
            return 1
        fi
    }

    # 安全地处理用户输入
    safe_user_input() {
        local user_input
        read -r user_input

        # 移除特殊字符
        user_input=$(echo "$user_input" | tr -d ';&|`$(){}[]<>')

        # 验证长度
        if [ ${#user_input} -gt 100 ]; then
            echo "Input too long"
            return 1
        fi

        echo "$user_input"
    }

    # 安全地执行命令
    safe_execute() {
        local cmd=("$@")

        # 使用数组避免命令注入
        if "${cmd[@]}"; then
            return 0
        else
            echo "Command execution failed"
            return 1
        fi
    }

    # 临时文件处理
    create_temp_file() {
        local temp_file
        temp_file=$(mktemp) || error_exit "Cannot create temp file"

        # 设置安全权限
        chmod 600 "$temp_file"

        # 注册清理
        trap "rm -f '$temp_file'" EXIT

        echo "$temp_file"
    }
}
```

### 3. 性能优化

```bash
#!/bin/bash

# 性能优化技巧
performance_tips() {
    # 避免频繁调用外部命令
    # 错误方式
    slow_way() {
        for file in *.txt; do
            if [ -f "$file" ]; then
                echo "Processing $file"
            fi
        done
    }

    # 优化方式
    fast_way() {
        local files=(*.txt)
        for file in "${files[@]}"; do
            if [ -f "$file" ]; then
                echo "Processing $file"
            fi
        done
    }

    # 使用内置命令替代外部命令
    # 替代 $(date +%s)
    printf -v timestamp '%(%s)T' -1

    # 替代 basename
    filename=${full_path##*/}

    # 替代 dirname
    directory=${full_path%/*}

    # 批量处理
    batch_process() {
        local files=()

        # 收集文件
        while IFS= read -r -d '' file; do
            files+=("$file")
        done < <(find . -name "*.log" -print0)

        # 批量处理
        if [ ${#files[@]} -gt 0 ]; then
            gzip "${files[@]}"
        fi
    }
}
```

## 📚 总结

Shell 脚本编程是系统管理和自动化的重要技能。掌握以下要点：

### 🎯 核心要素
- **语法基础**：变量、数组、控制结构
- **函数设计**：模块化和复用性
- **错误处理**：健壮性和容错性
- **文本处理**：AWK、SED、正则表达式

### 🛡️ 最佳实践
- **代码规范**：注释、缩进、命名规范
- **安全编程**：输入验证、权限控制
- **性能优化**：减少外部调用、批量处理
- **调试技巧**：set 选项、日志记录

### 🚀 进阶方向
- **自动化运维**：部署、监控、备份脚本
- **系统集成**：与其他工具和系统的集成
- **云原生**：容器化、微服务环境脚本
- **DevOps**：CI/CD 流水线脚本

通过不断实践和学习，你将能够编写出高效、安全、可维护的 Shell 脚本，大大提升工作效率！

---

*持续学习，持续改进，让 Shell 编程成为你的得力工具！* 🎉
```