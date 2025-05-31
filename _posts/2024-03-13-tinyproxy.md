---
title: "Tinyproxy - 轻量级HTTP代理服务器完全指南"
author: Kk
date: 2024-03-13
category: DevOps
layout: post
tags: [proxy, tinyproxy, networking, security, http]
excerpt: "Tinyproxy是一个轻量级、高性能的HTTP代理服务器，本文详细介绍其安装、配置和各种开发环境下的使用方法。"
diagram: |
  graph TB
      subgraph "Tinyproxy代理服务器架构"
          subgraph "客户端网络"
              CLIENT1[开发者客户端 1]
              CLIENT2[开发者客户端 2]
              CLIENT3[移动设备]
              BROWSER[Web浏览器]
              DEV_TOOLS[开发工具]
          end

          subgraph "代理服务器层"
              TINYPROXY[Tinyproxy服务器<br/>Port 8888]
              CONFIG[配置文件<br/>tinyproxy.conf]
              AUTH[认证模块<br/>BasicAuth]
              FILTER[URL过滤器<br/>filter文件]
              LOG[日志系统<br/>access.log]
              ACL[访问控制列表<br/>Allow/Deny]
          end

          subgraph "代理功能模块"
              HTTP_PROXY[HTTP代理]
              HTTPS_PROXY[HTTPS代理]
              REVERSE_PROXY[反向代理]
              TRANSPARENT[透明代理]
              ANONYMOUS[匿名代理]
              CACHE[缓存模块]
          end

          subgraph "目标服务器"
              WEB_SERVER[Web服务器<br/>80/443端口]
              API_SERVER[API服务器<br/>REST/GraphQL]
              CDN[CDN节点]
              PACKAGE_REPO[包仓库<br/>npm/pip/gem]
              GIT_REPO[Git仓库<br/>GitHub/GitLab]
              DOCKER_HUB[Docker Hub]
          end

          subgraph "网络安全"
              FIREWALL[防火墙规则]
              SSL_CERT[SSL证书]
              RATE_LIMIT[速率限制]
              IP_WHITELIST[IP白名单]
              CONTENT_FILTER[内容过滤]
          end

          subgraph "监控和管理"
              STATS[统计信息]
              HEALTH_CHECK[健康检查]
              ALERT[告警系统]
              METRICS[性能指标]
              DASHBOARD[监控面板]
          end

          subgraph "开发环境集成"
              NPM[NPM包管理器]
              PIP[Python Pip]
              GEM[Ruby Gem]
              GO_MOD[Go Modules]
              MAVEN[Maven仓库]
              DOCKER[Docker镜像]
          end
      end

      CLIENT1 --> TINYPROXY
      CLIENT2 --> TINYPROXY
      CLIENT3 --> TINYPROXY
      BROWSER --> TINYPROXY
      DEV_TOOLS --> TINYPROXY

      TINYPROXY --> CONFIG
      TINYPROXY --> AUTH
      TINYPROXY --> FILTER
      TINYPROXY --> LOG
      TINYPROXY --> ACL

      TINYPROXY --> HTTP_PROXY
      TINYPROXY --> HTTPS_PROXY
      TINYPROXY --> REVERSE_PROXY
      TINYPROXY --> TRANSPARENT
      TINYPROXY --> ANONYMOUS
      TINYPROXY --> CACHE

      HTTP_PROXY --> WEB_SERVER
      HTTPS_PROXY --> API_SERVER
      HTTP_PROXY --> CDN
      HTTP_PROXY --> PACKAGE_REPO
      HTTPS_PROXY --> GIT_REPO
      HTTP_PROXY --> DOCKER_HUB

      AUTH --> IP_WHITELIST
      FILTER --> CONTENT_FILTER
      ACL --> FIREWALL
      HTTPS_PROXY --> SSL_CERT
      TINYPROXY --> RATE_LIMIT

      LOG --> STATS
      TINYPROXY --> HEALTH_CHECK
      STATS --> ALERT
      HEALTH_CHECK --> METRICS
      METRICS --> DASHBOARD

      CLIENT1 --> NPM
      CLIENT1 --> PIP
      CLIENT1 --> GEM
      CLIENT2 --> GO_MOD
      CLIENT2 --> MAVEN
      CLIENT3 --> DOCKER

      NPM -.->|通过代理| PACKAGE_REPO
      PIP -.->|通过代理| PACKAGE_REPO
      GEM -.->|通过代理| PACKAGE_REPO
      GO_MOD -.->|通过代理| GIT_REPO
      MAVEN -.->|通过代理| PACKAGE_REPO
      DOCKER -.->|通过代理| DOCKER_HUB

      style TINYPROXY fill:#4ecdc4,stroke:#fff,stroke-width:2px,color:#fff
      style AUTH fill:#ff6b6b,stroke:#fff,stroke-width:2px,color:#fff
      style FILTER fill:#ffa502,stroke:#fff,stroke-width:2px,color:#000
      style HTTP_PROXY fill:#45b7d1,stroke:#fff,stroke-width:2px,color:#fff
      style HTTPS_PROXY fill:#96ceb4,stroke:#fff,stroke-width:2px,color:#fff
      style FIREWALL fill:#ff4757,stroke:#fff,stroke-width:2px,color:#fff
      style SSL_CERT fill:#2ed573,stroke:#fff,stroke-width:2px,color:#fff
      style PACKAGE_REPO fill:#3742fa,stroke:#fff,stroke-width:2px,color:#fff
      style DOCKER_HUB fill:#0db7ed,stroke:#fff,stroke-width:2px,color:#fff
      style DASHBOARD fill:#f1c40f,stroke:#fff,stroke-width:2px,color:#000
---

# Tinyproxy - 轻量级HTTP代理服务器完全指南 🌐

> Tinyproxy是一个小型、高效、安全的HTTP代理守护程序，适用于需要完整HTTP代理功能但系统资源有限的场景。

## 📊 目录

- [安装与配置](#安装与配置)
- [基本配置](#基本配置)
- [开发环境配置](#开发环境配置)
- [安全配置](#安全配置)
- [性能优化](#性能优化)
- [监控与日志](#监控与日志)
- [故障排除](#故障排除)

---

## 🚀 安装与配置

### Ubuntu/Debian安装
```bash
# 更新包列表
sudo apt update

# 安装tinyproxy
sudo apt install tinyproxy

# 启动服务
sudo systemctl start tinyproxy
sudo systemctl enable tinyproxy

# 查看服务状态
sudo systemctl status tinyproxy
```

### CentOS/RHEL安装
```bash
# 安装EPEL仓库
sudo yum install epel-release

# 安装tinyproxy
sudo yum install tinyproxy

# 启动服务
sudo systemctl start tinyproxy
sudo systemctl enable tinyproxy
```

### 从源码编译
```bash
# 安装依赖
sudo apt install build-essential autoconf automake libtool

# 下载源码
wget https://github.com/tinyproxy/tinyproxy/releases/download/1.11.1/tinyproxy-1.11.1.tar.gz
tar -xzf tinyproxy-1.11.1.tar.gz
cd tinyproxy-1.11.1

# 编译安装
./configure --prefix=/usr/local/tinyproxy \
            --enable-reverse \
            --enable-transparent \
            --enable-filter
make
sudo make install
```

---

## ⚙️ 基本配置

### 主配置文件
```bash
# 编辑主配置文件
sudo vim /etc/tinyproxy/tinyproxy.conf
```

### 基础配置示例
```bash
# /etc/tinyproxy/tinyproxy.conf

# 用户和组
User tinyproxy
Group tinyproxy

# 监听端口
Port 8888

# 绑定地址（0.0.0.0表示所有接口）
Listen 0.0.0.0

# 进程ID文件
PidFile /var/run/tinyproxy/tinyproxy.pid

# 日志文件
LogFile /var/log/tinyproxy/tinyproxy.log
LogLevel Info

# 最大客户端连接数
MaxClients 100

# 超时设置（秒）
Timeout 600

# 允许访问的客户端
Allow 127.0.0.1
Allow 192.168.0.0/16
Allow 10.0.0.0/8
Allow 172.16.0.0/12

# 禁止访问的域名
FilterURLs On
Filter /etc/tinyproxy/filter

# 匿名代理（隐藏客户端信息）
Anonymous "Host"
Anonymous "Authorization"
Anonymous "Cookie"
```

### 启用基本认证
```bash
# 添加认证配置
BasicAuth user password

# 或使用认证文件
# AuthFile /etc/tinyproxy/auth.txt
```

### 认证文件格式
```bash
# /etc/tinyproxy/auth.txt
username1:password1
username2:password2
admin:$ecur3P@ssw0rd
```

---

## 🛠️ 开发环境配置

### Ruby Gem配置
```bash
# 创建或编辑gem配置文件
vim ~/.gemrc

# 添加代理配置
---
:benchmark: false
:bulk_threshold: 1000
:backtrace: false
:update_sources: true
:verbose: true
http_proxy: http://tinyproxy_server:8888
https_proxy: http://tinyproxy_server:8888
```

### Python Pip配置
```bash
# 创建pip配置目录
mkdir -p ~/.pip

# 编辑pip配置文件
vim ~/.pip/pip.conf

# 添加代理配置
[global]
proxy = http://tinyproxy_server:8888
trusted-host = pypi.org
               pypi.python.org
               files.pythonhosted.org

# 或者使用环境变量
export http_proxy=http://tinyproxy_server:8888
export https_proxy=http://tinyproxy_server:8888
pip install package_name
```

### Go语言配置
```bash
# 编辑bashrc或profile
vim ~/.bashrc

# 添加Go代理配置
export GOPROXY="https://proxy.golang.org,direct"
export GOSUMDB="sum.golang.org"
export GOPRIVATE="gitlab.company.com"

# HTTP代理配置
export http_proxy=http://tinyproxy_server:8888
export https_proxy=http://tinyproxy_server:8888
export no_proxy="localhost,127.0.0.1,*.local"

# 应用配置
source ~/.bashrc

# 测试Go代理
go env GOPROXY
go mod download
```

### Node.js NPM配置
```bash
# 配置npm代理
npm config set proxy http://tinyproxy_server:8888
npm config set https-proxy http://tinyproxy_server:8888

# 查看配置
npm config list

# 取消代理设置
npm config delete proxy
npm config delete https-proxy

# 使用Yarn
yarn config set proxy http://tinyproxy_server:8888
yarn config set https-proxy http://tinyproxy_server:8888
```

### Docker配置
```bash
# Docker守护进程代理配置
sudo mkdir -p /etc/systemd/system/docker.service.d

# 创建代理配置文件
sudo vim /etc/systemd/system/docker.service.d/http-proxy.conf

[Service]
Environment="HTTP_PROXY=http://tinyproxy_server:8888"
Environment="HTTPS_PROXY=http://tinyproxy_server:8888"
Environment="NO_PROXY=localhost,127.0.0.1,docker-registry.local"

# 重启Docker
sudo systemctl daemon-reload
sudo systemctl restart docker

# 验证配置
docker info | grep -i proxy
```

### Git配置
```bash
# 配置Git代理
git config --global http.proxy http://tinyproxy_server:8888
git config --global https.proxy http://tinyproxy_server:8888

# 为特定域名配置代理
git config --global http.https://github.com.proxy http://tinyproxy_server:8888

# 查看配置
git config --global --list | grep proxy

# 取消代理配置
git config --global --unset http.proxy
git config --global --unset https.proxy
```

---

## 🔒 安全配置

### 访问控制列表
```bash
# 精确的IP访问控制
Allow 192.168.1.100
Allow 10.0.1.0/24

# 拒绝特定IP
Deny 192.168.1.50
Deny 10.0.2.0/24

# 默认拒绝所有（最后规则）
# Deny all
```

### URL过滤
```bash
# 启用URL过滤
FilterURLs On
Filter /etc/tinyproxy/filter
FilterExtended On

# 过滤文件示例
# /etc/tinyproxy/filter
facebook.com
twitter.com
.*\.gambling\..*
.*adult.*
^.*\.exe$
```

### SSL/TLS配置
```bash
# 禁用不安全的SSL版本
SSLVerify On

# 设置SSL证书路径（如果需要）
# SSLCertPath /etc/ssl/certs/
# SSLCertFile /etc/ssl/certs/tinyproxy.crt
# SSLKeyFile /etc/ssl/private/tinyproxy.key
```

### 反向代理配置
```bash
# 反向代理配置
ReversePath "/api/" "http://backend-server:3000/"
ReversePath "/static/" "http://static-server:8080/"

# 支持WebSocket
ReverseOnly On
ReverseMagic On
```

---

## 📈 性能优化

### 连接池配置
```bash
# 最大客户端连接数
MaxClients 200

# 每个客户端的最大请求数
MaxRequestsPerChild 1000

# 最小和最大空闲服务器数
MinSpareServers 5
MaxSpareServers 20
StartServers 10
```

### 缓存配置
```bash
# 启用HTTP缓存
Cache On
CacheSize 100MB
CacheDir /var/cache/tinyproxy

# 缓存策略
CacheDefaultExpire 3600
CacheMaxExpire 86400
```

### 系统优化
```bash
# 修改系统限制
echo "* soft nofile 65536" >> /etc/security/limits.conf
echo "* hard nofile 65536" >> /etc/security/limits.conf

# 内核参数调优
echo "net.core.somaxconn = 1024" >> /etc/sysctl.conf
echo "net.ipv4.tcp_max_syn_backlog = 1024" >> /etc/sysctl.conf
sysctl -p
```

---

## 📊 监控与日志

### 日志配置
```bash
# 详细日志配置
LogFile /var/log/tinyproxy/tinyproxy.log
LogLevel Info
Syslog On

# 日志轮转配置
# /etc/logrotate.d/tinyproxy
/var/log/tinyproxy/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 0644 tinyproxy tinyproxy
    postrotate
        /bin/kill -USR1 `cat /var/run/tinyproxy/tinyproxy.pid 2> /dev/null` 2> /dev/null || true
    endscript
}
```

### 统计信息页面
```bash
# 启用统计页面
StatHost "proxy.stats"
StatFile "/usr/share/tinyproxy/stats.html"

# 访问统计页面
# curl -H "Host: proxy.stats" http://tinyproxy_server:8888/
```

### 监控脚本
```bash
#!/bin/bash
# monitor_tinyproxy.sh

PROXY_HOST="localhost"
PROXY_PORT="8888"
LOG_FILE="/var/log/tinyproxy/monitor.log"

# 检查代理是否响应
check_proxy() {
    local response=$(curl -s -o /dev/null -w "%{http_code}" \
        --proxy http://$PROXY_HOST:$PROXY_PORT \
        --max-time 10 \
        http://httpbin.org/ip 2>/dev/null)

    if [ "$response" = "200" ]; then
        echo "$(date): Proxy is healthy" >> $LOG_FILE
        return 0
    else
        echo "$(date): Proxy check failed (HTTP: $response)" >> $LOG_FILE
        return 1
    fi
}

# 检查进程状态
check_process() {
    if pgrep tinyproxy > /dev/null; then
        echo "$(date): Tinyproxy process is running" >> $LOG_FILE
        return 0
    else
        echo "$(date): Tinyproxy process not found" >> $LOG_FILE
        return 1
    fi
}

# 主监控逻辑
main() {
    if ! check_process; then
        echo "$(date): Attempting to restart tinyproxy" >> $LOG_FILE
        systemctl restart tinyproxy
        sleep 5
    fi

    if ! check_proxy; then
        echo "$(date): Proxy health check failed" >> $LOG_FILE
        # 发送告警
        # send_alert "Tinyproxy health check failed"
    fi
}

main
```

---

## 🔧 故障排除

### 常见问题诊断
```bash
# 检查服务状态
sudo systemctl status tinyproxy

# 查看实时日志
sudo tail -f /var/log/tinyproxy/tinyproxy.log

# 检查端口占用
sudo netstat -tlnp | grep :8888
sudo ss -tlnp | grep :8888

# 检查防火墙
sudo ufw status
sudo iptables -L | grep 8888

# 测试代理连接
curl -v --proxy http://proxy_server:8888 http://httpbin.org/ip
```

### 配置验证
```bash
# 验证配置文件语法
sudo tinyproxy -c /etc/tinyproxy/tinyproxy.conf -d

# 检查权限
ls -la /etc/tinyproxy/
ls -la /var/log/tinyproxy/
ls -la /var/run/tinyproxy/
```

### 性能测试
```bash
#!/bin/bash
# proxy_benchmark.sh

PROXY="http://proxy_server:8888"
TEST_URL="http://httpbin.org/get"
CONCURRENT_USERS=10
REQUESTS_PER_USER=100

# 使用Apache Bench测试
ab -n $((CONCURRENT_USERS * REQUESTS_PER_USER)) \
   -c $CONCURRENT_USERS \
   -X ${PROXY#http://} \
   $TEST_URL

# 使用wrk测试
wrk -t$CONCURRENT_USERS \
    -c$CONCURRENT_USERS \
    -d30s \
    --script proxy.lua \
    $TEST_URL
```

---

## 🐳 Docker化部署

### Dockerfile
```dockerfile
FROM alpine:latest

RUN apk add --no-cache tinyproxy

# 创建配置目录
RUN mkdir -p /etc/tinyproxy /var/log/tinyproxy

# 复制配置文件
COPY tinyproxy.conf /etc/tinyproxy/

# 创建用户
RUN adduser -D -s /bin/sh tinyproxy

# 修改权限
RUN chown -R tinyproxy:tinyproxy /var/log/tinyproxy

EXPOSE 8888

USER tinyproxy

CMD ["tinyproxy", "-d", "-c", "/etc/tinyproxy/tinyproxy.conf"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  tinyproxy:
    build: .
    ports:
      - "8888:8888"
    volumes:
      - ./config/tinyproxy.conf:/etc/tinyproxy/tinyproxy.conf:ro
      - ./logs:/var/log/tinyproxy
    environment:
      - PROXY_PORT=8888
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "--proxy", "http://localhost:8888", "http://httpbin.org/ip"]
      interval: 30s
      timeout: 10s
      retries: 3
```

---

## 📚 有用命令总结

### 服务管理
```bash
# 启动/停止/重启服务
sudo systemctl start tinyproxy
sudo systemctl stop tinyproxy
sudo systemctl restart tinyproxy
sudo systemctl reload tinyproxy

# 查看配置
tinyproxy -h
cat /etc/tinyproxy/tinyproxy.conf

# 实时监控连接
watch -n 1 'netstat -an | grep :8888'
```

### 客户端测试
```bash
# 基本代理测试
curl --proxy http://proxy:8888 http://httpbin.org/ip

# 带认证的代理测试
curl --proxy-user username:password --proxy http://proxy:8888 http://httpbin.org/ip

# 测试HTTPS
curl --proxy http://proxy:8888 https://httpbin.org/ip

# 批量测试
for i in {1..10}; do
    curl -s --proxy http://proxy:8888 http://httpbin.org/ip
done
```

---

## 🎯 最佳实践

1. **安全配置**：始终使用最小权限原则配置访问控制
2. **日志管理**：定期轮转日志文件，避免磁盘空间不足
3. **性能监控**：定期监控连接数和响应时间
4. **备份配置**：定期备份配置文件和过滤规则
5. **更新维护**：保持软件版本更新，关注安全补丁

---

💡 **小贴士**: Tinyproxy适合轻量级场景，对于高并发场景建议考虑Squid或Nginx等更强大的代理服务器。
