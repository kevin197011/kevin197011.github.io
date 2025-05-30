---
layout: post
title: "EFK日志平台架构及实践管理指南"
excerpt: "深入解析EFK(Elasticsearch+Fluentd+Kibana)企业级日志平台架构，从基础部署到生产级集群管理，包含完整的配置优化、监控告警和故障排除最佳实践。"
date: 2025-01-03
category: DevOps
tags: [EFK, Elasticsearch, Fluentd, Kibana, 日志平台, 大数据, 监控, DevOps]
author: Kk
diagram: |
  graph TB
      subgraph "EFK日志平台架构"
          subgraph "数据源层 Data Sources"
              WEB_LOGS[Web服务器日志<br/>Nginx/Apache]
              APP_LOGS[应用程序日志<br/>Java/Python/Go]
              SYS_LOGS[系统日志<br/>Syslog/Journald]
              CONTAINER_LOGS[容器日志<br/>Docker/K8s]
              DB_LOGS[数据库日志<br/>MySQL/PostgreSQL]
              NETWORK_LOGS[网络设备日志<br/>Firewall/Router]
          end

          subgraph "日志收集层 Collection Layer"
              FLUENTD_AGENT[Fluentd Agent<br/>日志采集代理]
              FLUENTBIT[Fluent Bit<br/>轻量级采集器]
              FILEBEAT[Filebeat<br/>日志文件收集]
              LOGSTASH[Logstash<br/>日志处理管道]
          end

          subgraph "日志聚合层 Aggregation Layer"
              FLUENTD_AGGREGATOR[Fluentd Aggregator<br/>日志聚合节点]
              KAFKA[Apache Kafka<br/>消息队列缓冲]
              REDIS[Redis<br/>缓存队列]
          end

          subgraph "数据处理层 Processing Layer"
              PARSER[日志解析器<br/>正则表达式/Grok]
              FILTER[数据过滤器<br/>字段提取/格式化]
              ENRICHMENT[数据增强<br/>地理位置/用户信息]
              ROUTING[路由分发<br/>按类型分流]
          end

          subgraph "Elasticsearch集群 Storage Cluster"
              subgraph "Master节点"
                  ES_MASTER1[ES Master 1<br/>集群管理]
                  ES_MASTER2[ES Master 2<br/>集群管理]
                  ES_MASTER3[ES Master 3<br/>集群管理]
              end

              subgraph "Data节点"
                  ES_DATA1[ES Data 1<br/>数据存储/索引]
                  ES_DATA2[ES Data 2<br/>数据存储/索引]
                  ES_DATA3[ES Data 3<br/>数据存储/索引]
                  ES_DATA4[ES Data 4<br/>数据存储/索引]
              end

              subgraph "Coordinating节点"
                  ES_COORD1[ES Coord 1<br/>查询协调]
                  ES_COORD2[ES Coord 2<br/>查询协调]
              end
          end

          subgraph "可视化分析层 Visualization Layer"
              KIBANA1[Kibana 1<br/>Web界面]
              KIBANA2[Kibana 2<br/>Web界面]
              LB_KIBANA[Nginx负载均衡<br/>Kibana集群]
              GRAFANA[Grafana<br/>监控大屏]
          end

          subgraph "监控告警层 Monitoring Layer"
              ELASTALERT[ElastAlert<br/>规则告警]
              WATCHER[Elasticsearch Watcher<br/>监控插件]
              CURATOR[Elasticsearch Curator<br/>索引生命周期]
              CEREBRO[Cerebro<br/>集群监控]
          end

          subgraph "安全认证层 Security Layer"
              X_PACK[X-Pack Security<br/>认证授权]
              LDAP_AUTH[LDAP认证<br/>企业目录集成]
              SSL_TLS[SSL/TLS加密<br/>传输安全]
              SHIELD[Search Guard<br/>安全插件]
          end

          subgraph "存储管理层 Storage Management"
              HOT_STORAGE[热数据存储<br/>SSD高性能]
              WARM_STORAGE[温数据存储<br/>HDD标准]
              COLD_STORAGE[冷数据存储<br/>对象存储]
              BACKUP[数据备份<br/>快照恢复]
          end
      end

      WEB_LOGS --> FLUENTD_AGENT
      APP_LOGS --> FLUENTD_AGENT
      SYS_LOGS --> FLUENTBIT
      CONTAINER_LOGS --> FILEBEAT
      DB_LOGS --> LOGSTASH
      NETWORK_LOGS --> FLUENTD_AGENT

      FLUENTD_AGENT --> FLUENTD_AGGREGATOR
      FLUENTBIT --> FLUENTD_AGGREGATOR
      FILEBEAT --> FLUENTD_AGGREGATOR
      LOGSTASH --> KAFKA

      FLUENTD_AGGREGATOR --> KAFKA
      KAFKA --> PARSER
      REDIS --> PARSER

      PARSER --> FILTER
      FILTER --> ENRICHMENT
      ENRICHMENT --> ROUTING

      ROUTING --> ES_DATA1
      ROUTING --> ES_DATA2
      ROUTING --> ES_DATA3
      ROUTING --> ES_DATA4

      ES_MASTER1 --> ES_DATA1
      ES_MASTER2 --> ES_DATA2
      ES_MASTER3 --> ES_DATA3
      ES_MASTER1 --> ES_DATA4

      ES_COORD1 --> ES_DATA1
      ES_COORD1 --> ES_DATA2
      ES_COORD2 --> ES_DATA3
      ES_COORD2 --> ES_DATA4

      ES_COORD1 --> KIBANA1
      ES_COORD2 --> KIBANA2
      KIBANA1 --> LB_KIBANA
      KIBANA2 --> LB_KIBANA

      ES_DATA1 --> GRAFANA
      ES_DATA2 --> ELASTALERT
      ES_DATA3 --> WATCHER
      ES_DATA4 --> CURATOR

      X_PACK --> ES_MASTER1
      LDAP_AUTH --> X_PACK
      SSL_TLS --> KIBANA1
      SHIELD --> ES_DATA1

      ES_DATA1 --> HOT_STORAGE
      ES_DATA2 --> WARM_STORAGE
      ES_DATA3 --> COLD_STORAGE
      ES_DATA4 --> BACKUP

      CEREBRO --> ES_MASTER1
      CEREBRO --> ES_MASTER2
      CEREBRO --> ES_MASTER3

      style ES_MASTER1 fill:#ff6b6b,stroke:#fff,stroke-width:2px,color:#fff
      style ES_MASTER2 fill:#ff6b6b,stroke:#fff,stroke-width:2px,color:#fff
      style ES_MASTER3 fill:#ff6b6b,stroke:#fff,stroke-width:2px,color:#fff
      style ES_DATA1 fill:#4ecdc4,stroke:#fff,stroke-width:2px,color:#fff
      style ES_DATA2 fill:#4ecdc4,stroke:#fff,stroke-width:2px,color:#fff
      style ES_DATA3 fill:#4ecdc4,stroke:#fff,stroke-width:2px,color:#fff
      style ES_DATA4 fill:#4ecdc4,stroke:#fff,stroke-width:2px,color:#fff
      style KIBANA1 fill:#45b7d1,stroke:#fff,stroke-width:2px,color:#fff
      style KIBANA2 fill:#45b7d1,stroke:#fff,stroke-width:2px,color:#fff
      style FLUENTD_AGGREGATOR fill:#feca57,stroke:#fff,stroke-width:2px,color:#000
      style KAFKA fill:#9b59b6,stroke:#fff,stroke-width:2px,color:#fff
      style ELASTALERT fill:#f39c12,stroke:#fff,stroke-width:2px,color:#fff
      style X_PACK fill:#e74c3c,stroke:#fff,stroke-width:2px,color:#fff
      style HOT_STORAGE fill:#2ed573,stroke:#fff,stroke-width:2px,color:#fff
---

# EFK日志平台架构及实践管理指南

## EFK平台概述

### 什么是EFK

EFK是一套完整的日志收集、存储、分析和可视化解决方案，由三个核心组件组成：

```yaml
EFK组件架构:
  E - Elasticsearch: 分布式搜索和分析引擎
    - 数据存储和索引
    - 全文搜索和聚合分析
    - RESTful API接口
    - 水平扩展能力

  F - Fluentd: 统一日志收集和处理
    - 多源数据收集
    - 灵活的插件架构
    - 数据解析和路由
    - 缓冲和重试机制

  K - Kibana: 数据可视化和分析平台
    - 交互式仪表板
    - 实时搜索和过滤
    - 图表和报表生成
    - 告警和监控界面
```

#### EFK核心优势
```bash
# EFK平台核心优势
技术优势:
  实时性: 近实时数据处理和分析
  可扩展: 水平扩展支持海量数据
  灵活性: 支持多种数据源和格式
  开源: 完全开源，社区活跃
  生态: 丰富的插件和集成方案

业务价值:
  运维监控: 实时系统状态监控
  故障排查: 快速定位和分析问题
  安全审计: 安全事件追踪和分析
  业务分析: 用户行为和业务指标分析
  合规性: 日志审计和合规报告
```

## 生产环境架构设计

### 硬件资源规划

#### 服务器配置建议
```yaml
# Elasticsearch节点配置
Master节点:
  CPU: 4-8核心
  内存: 8-16GB
  存储: 100GB SSD (OS + 配置)
  网络: 1Gbps
  数量: 3台(奇数个，避免脑裂)

Data节点:
  CPU: 16-32核心
  内存: 64-128GB
  存储: 2-8TB SSD/NVMe (数据存储)
  网络: 10Gbps
  数量: 根据数据量和性能需求确定

Coordinating节点:
  CPU: 8-16核心
  内存: 16-32GB
  存储: 200GB SSD
  网络: 10Gbps
  数量: 2-4台

# Fluentd聚合节点配置
Fluentd Aggregator:
  CPU: 8-16核心
  内存: 16-32GB
  存储: 500GB SSD (缓冲)
  网络: 10Gbps
  数量: 2-4台(高可用)

# Kibana节点配置
Kibana服务器:
  CPU: 4-8核心
  内存: 8-16GB
  存储: 100GB SSD
  网络: 1Gbps
  数量: 2台(负载均衡)
```

#### 存储架构设计
```bash
# 存储分层策略
热数据层 (Hot Tier):
  - 存储时间: 0-7天
  - 存储介质: NVMe SSD
  - 索引配置: 高性能写入和查询
  - 副本数量: 1个副本

温数据层 (Warm Tier):
  - 存储时间: 7-30天
  - 存储介质: SATA SSD
  - 索引配置: 只读，优化压缩
  - 副本数量: 1个副本

冷数据层 (Cold Tier):
  - 存储时间: 30天-1年
  - 存储介质: HDD或对象存储
  - 索引配置: 高压缩比，低查询频率
  - 副本数量: 0个副本

归档层 (Archive Tier):
  - 存储时间: 1年以上
  - 存储介质: 对象存储(S3/OSS)
  - 索引配置: 极度压缩，很少查询
  - 备份策略: 定期快照备份
```

### 网络架构设计

#### 网络拓扑规划
```yaml
# 网络分层设计
管理网络:
  用途: 集群管理和监控
  网段: 10.1.0.0/24
  带宽: 1Gbps
  安全: 访问控制列表

数据网络:
  用途: 节点间数据传输
  网段: 10.2.0.0/24
  带宽: 10Gbps
  优化: Jumbo Frame支持

客户端网络:
  用途: 外部访问和API调用
  网段: 10.3.0.0/24
  带宽: 1-10Gbps
  安全: 负载均衡和防火墙

存储网络:
  用途: 共享存储访问
  网段: 10.4.0.0/24
  带宽: 10Gbps
  协议: iSCSI/NFS
```

## Elasticsearch集群部署

### 基础环境准备

#### 系统优化配置
```bash
# 操作系统参数优化
# /etc/sysctl.conf
vm.max_map_count=262144
vm.swappiness=1
net.core.somaxconn=65535
net.ipv4.tcp_max_syn_backlog=65535
fs.file-max=655360

# 应用参数
sysctl -p

# 用户限制配置
# /etc/security/limits.conf
elasticsearch soft nofile 65536
elasticsearch hard nofile 65536
elasticsearch soft nproc 4096
elasticsearch hard nproc 4096
elasticsearch soft memlock unlimited
elasticsearch hard memlock unlimited

# JVM堆内存设置原则
# 堆内存不超过系统内存的50%
# 堆内存不超过32GB (压缩指针限制)
# 例: 64GB内存的服务器，ES堆设置为30GB
```

#### Java环境安装
```bash
# 安装OpenJDK 11或17
sudo apt update
sudo apt install openjdk-11-jdk

# 验证Java版本
java -version

# 设置JAVA_HOME环境变量
echo 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Elasticsearch安装部署

#### 软件包安装
```bash
# 导入Elasticsearch GPG密钥
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -

# 添加Elasticsearch仓库
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list

# 安装Elasticsearch
sudo apt update
sudo apt install elasticsearch

# 启用开机自启
sudo systemctl enable elasticsearch

# 创建数据和日志目录
sudo mkdir -p /var/lib/elasticsearch
sudo mkdir -p /var/log/elasticsearch
sudo chown -R elasticsearch:elasticsearch /var/lib/elasticsearch
sudo chown -R elasticsearch:elasticsearch /var/log/elasticsearch
```

#### Master节点配置
```yaml
# /etc/elasticsearch/elasticsearch.yml - Master节点配置
cluster.name: production-efk-cluster
node.name: es-master-01
node.roles: [master]

# 网络设置
network.host: 10.1.0.10
http.port: 9200
transport.port: 9300

# 路径配置
path.data: /var/lib/elasticsearch
path.logs: /var/log/elasticsearch

# 集群发现
discovery.seed_hosts: ["10.1.0.10", "10.1.0.11", "10.1.0.12"]
cluster.initial_master_nodes: ["es-master-01", "es-master-02", "es-master-03"]

# 内存设置
bootstrap.memory_lock: true

# 安全设置
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
xpack.security.transport.ssl.verification_mode: certificate
xpack.security.transport.ssl.keystore.path: elastic-certificates.p12
xpack.security.transport.ssl.truststore.path: elastic-certificates.p12

# 监控设置
xpack.monitoring.collection.enabled: true
```

#### Data节点配置
```yaml
# /etc/elasticsearch/elasticsearch.yml - Data节点配置
cluster.name: production-efk-cluster
node.name: es-data-01
node.roles: [data, data_content, data_hot, data_warm, data_cold]

# 网络设置
network.host: 10.1.0.20
http.port: 9200
transport.port: 9300

# 路径配置
path.data: ["/data1/elasticsearch", "/data2/elasticsearch"]
path.logs: /var/log/elasticsearch

# 集群发现
discovery.seed_hosts: ["10.1.0.10", "10.1.0.11", "10.1.0.12"]

# 内存设置
bootstrap.memory_lock: true

# 索引设置
index.number_of_shards: 1
index.number_of_replicas: 1

# 存储优化
index.store.type: niofs
index.merge.scheduler.max_thread_count: 1

# 缓存设置
indices.memory.index_buffer_size: 20%
indices.memory.min_index_buffer_size: 96mb

# 安全设置
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
xpack.security.transport.ssl.verification_mode: certificate
xpack.security.transport.ssl.keystore.path: elastic-certificates.p12
xpack.security.transport.ssl.truststore.path: elastic-certificates.p12
```

#### JVM配置优化
```bash
# /etc/elasticsearch/jvm.options
# 堆内存设置 (根据服务器内存调整)
-Xms30g
-Xmx30g

# 垃圾回收器选择
-XX:+UseG1GC
-XX:G1HeapRegionSize=32m
-XX:+UnlockExperimentalVMOptions
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200

# 内存优化
-XX:+AlwaysPreTouch
-Xss1m
-Djava.awt.headless=true

# 文件描述符
-Dfile.encoding=UTF-8
-Djna.nosys=true

# GC日志
-Xlog:gc*,gc+age=trace,safepoint:gc.log:time,level,tags
-XX:+UseGCLogFileRotation
-XX:NumberOfGCLogFiles=32
-XX:GCLogFileSize=64m

# 临时目录
-Djava.io.tmpdir=${ES_TMPDIR}

# JVM崩溃时生成转储文件
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/var/lib/elasticsearch
-XX:ErrorFile=/var/log/elasticsearch/hs_err_pid%p.log
```

## Fluentd部署配置

### Fluentd安装部署

#### 安装方式选择
```bash
# 方式1: 使用官方仓库安装
curl -fsSL https://toolbelt.treasuredata.com/sh/install-ubuntu-bionic-td-agent4.sh | sh

# 方式2: 使用Ruby Gem安装
gem install fluentd

# 方式3: 使用Docker容器部署
docker run -d \
  --name fluentd \
  -p 24224:24224 \
  -p 24224:24224/udp \
  -v /var/log:/var/log \
  -v $(pwd)/fluent.conf:/fluentd/etc/fluent.conf \
  fluent/fluentd:v1.16-debian-1

# 启用服务
sudo systemctl enable td-agent
sudo systemctl start td-agent
```

#### 核心插件安装
```bash
# 安装Elasticsearch输出插件
sudo td-agent-gem install fluent-plugin-elasticsearch

# 安装Kafka插件
sudo td-agent-gem install fluent-plugin-kafka

# 安装系统监控插件
sudo td-agent-gem install fluent-plugin-systemd

# 安装解析插件
sudo td-agent-gem install fluent-plugin-parser

# 安装缓冲插件
sudo td-agent-gem install fluent-plugin-redis

# 验证插件安装
sudo td-agent-gem list | grep fluent-plugin
```

### Agent节点配置

#### 基础日志收集配置
```ruby
# /etc/td-agent/td-agent.conf - Agent节点配置

# 系统配置
<system>
  log_level info
  workers 4
  root_dir /var/log/td-agent
</system>

# 输入源配置 - 系统日志
<source>
  @type systemd
  @id systemd_input
  tag systemd
  path /var/log/journal
  <storage>
    @type local
    persistent true
    path /var/log/td-agent/systemd.pos
  </storage>
  <entry>
    field_map {"MESSAGE": "message", "_HOSTNAME": "hostname", "_SYSTEMD_UNIT": "unit"}
    field_map_strict true
  </entry>
</source>

# 输入源配置 - Nginx访问日志
<source>
  @type tail
  @id nginx_access_log
  tag nginx.access
  path /var/log/nginx/access.log
  pos_file /var/log/td-agent/nginx_access.pos
  format nginx
  refresh_interval 10
  <parse>
    @type nginx
    expression /^(?<remote>[^ ]*) (?<host>[^ ]*) (?<user>[^ ]*) \[(?<time>[^\]]*)\] "(?<method>\S+)(?: +(?<path>[^\"]*?)(?: +\S*)?)?" (?<code>[^ ]*) (?<size>[^ ]*)(?: "(?<referer>[^\"]*)" "(?<agent>[^\"]*)")?$/
    time_format %d/%b/%Y:%H:%M:%S %z
  </parse>
</source>

# 输入源配置 - 应用程序日志
<source>
  @type tail
  @id application_log
  tag app.logs
  path /var/log/app/*.log
  pos_file /var/log/td-agent/app.pos
  refresh_interval 5
  <parse>
    @type json
    time_key time
    time_format %Y-%m-%d %H:%M:%S.%L
  </parse>
</source>

# 输入源配置 - Docker容器日志
<source>
  @type forward
  @id docker_input
  port 24224
  bind 0.0.0.0
  <security>
    self_hostname "#{Socket.gethostname}"
    shared_key fluentd_shared_key
  </security>
</source>

# 数据处理 - 添加主机名标签
<filter **>
  @type record_transformer
  <record>
    hostname "#{Socket.gethostname}"
    timestamp ${time}
  </record>
</filter>

# 数据处理 - 地理位置解析
<filter nginx.access>
  @type geoip
  geoip_lookup_keys remote
  <record>
    location_country ${country_name["remote"]}
    location_city ${city_name["remote"]}
    location_latitude ${latitude["remote"]}
    location_longitude ${longitude["remote"]}
  </record>
  skip_adding_null_record false
</filter>

# 数据处理 - 敏感信息脱敏
<filter app.logs>
  @type record_transformer
  enable_ruby true
  <record>
    message ${record["message"].gsub(/password["\s]*[:=]["\s]*[^"\s,}]+/, 'password=***')}
    message ${record["message"].gsub(/token["\s]*[:=]["\s]*[^"\s,}]+/, 'token=***')}
  </record>
</filter>

# 输出配置 - 发送到Fluentd聚合器
<match **>
  @type forward
  @id forward_output
  <server>
    name aggregator1
    host 10.1.0.30
    port 24224
    weight 60
  </server>
  <server>
    name aggregator2
    host 10.1.0.31
    port 24224
    weight 40
  </server>

  # 缓冲配置
  <buffer>
    @type file
    path /var/log/td-agent/buffer/forward
    flush_mode interval
    retry_type exponential_backoff
    flush_thread_count 2
    flush_interval 30s
    retry_forever
    retry_max_interval 30
    chunk_limit_size 2M
    queue_limit_length 8
    overflow_action block
  </buffer>

  # 安全配置
  <security>
    self_hostname "#{Socket.gethostname}"
    shared_key fluentd_shared_key
  </security>

  # 健康检查
  heartbeat_type tcp
</match>
```

### 聚合器节点配置

#### Fluentd聚合器配置
```ruby
# /etc/td-agent/td-agent.conf - 聚合器节点配置

# 系统配置
<system>
  log_level info
  workers 8
  root_dir /var/log/td-agent
</system>

# 输入配置 - 接收Agent数据
<source>
  @type forward
  @id forward_input
  port 24224
  bind 0.0.0.0
  <security>
    self_hostname "#{Socket.gethostname}"
    shared_key fluentd_shared_key
  </security>
</source>

# 输入配置 - HTTP接口
<source>
  @type http
  @id http_input
  port 8888
  bind 0.0.0.0
  cors_allow_origins ["*"]
  <parse>
    @type json
  </parse>
</source>

# 数据路由 - 按标签分类处理
<match systemd>
  @type copy
  <store>
    @type elasticsearch
    @id elasticsearch_systemd
    host 10.1.0.20,10.1.0.21,10.1.0.22,10.1.0.23
    port 9200
    scheme https
    ssl_verify false
    user elastic
    password changeme

    # 索引配置
    index_name systemd-logs-%Y.%m.%d
    type_name _doc

    # 模板配置
    template_name systemd_template
    template_file /etc/td-agent/templates/systemd_template.json

    # 缓冲配置
    <buffer time>
      @type file
      path /var/log/td-agent/buffer/systemd
      timekey 1h
      timekey_wait 10m
      timekey_use_utc true
      flush_mode interval
      retry_type exponential_backoff
      flush_thread_count 8
      flush_interval 5s
      retry_forever
      retry_max_interval 30
      chunk_limit_size 10M
      queue_limit_length 32
      overflow_action block
    </buffer>
  </store>

  # 备份输出到文件
  <store>
    @type file
    @id file_backup_systemd
    path /var/log/td-agent/backup/systemd.%Y%m%d_%H
    compress gzip
    <buffer time>
      timekey 1h
      timekey_use_utc true
    </buffer>
  </store>
</match>

<match nginx.access>
  @type elasticsearch
  @id elasticsearch_nginx
  host 10.1.0.20,10.1.0.21,10.1.0.22,10.1.0.23
  port 9200
  scheme https
  ssl_verify false
  user elastic
  password changeme

  # 索引配置
  index_name nginx-access-%Y.%m.%d
  type_name _doc

  # 生命周期策略
  ilm_policy_id nginx_access_policy

  # 缓冲配置
  <buffer time>
    @type file
    path /var/log/td-agent/buffer/nginx
    timekey 1h
    timekey_wait 10m
    timekey_use_utc true
    flush_mode interval
    retry_type exponential_backoff
    flush_thread_count 8
    flush_interval 5s
    retry_forever
    retry_max_interval 30
    chunk_limit_size 10M
    queue_limit_length 32
    overflow_action block
  </buffer>
</match>

<match app.logs>
  @type elasticsearch
  @id elasticsearch_app
  host 10.1.0.20,10.1.0.21,10.1.0.22,10.1.0.23
  port 9200
  scheme https
  ssl_verify false
  user elastic
  password changeme

  # 索引配置
  index_name application-logs-%Y.%m.%d
  type_name _doc

  # 动态索引名
  target_index_key @target_index
  <buffer @target_index,time>
    @type file
    path /var/log/td-agent/buffer/app
    timekey 1h
    timekey_wait 10m
    timekey_use_utc true
    flush_mode interval
    retry_type exponential_backoff
    flush_thread_count 8
    flush_interval 5s
    retry_forever
    retry_max_interval 30
    chunk_limit_size 10M
    queue_limit_length 32
    overflow_action block
  </buffer>
</match>

# 错误处理
<label @ERROR>
  <match **>
    @type file
    @id error_file
    path /var/log/td-agent/error/error.log
    <buffer>
      flush_mode interval
      retry_type exponential_backoff
      flush_thread_count 2
      flush_interval 30s
      retry_forever
      retry_max_interval 30
      chunk_limit_size 2M
      queue_limit_length 8
      overflow_action block
    </buffer>
  </match>
</label>
```

## Kibana部署配置

### Kibana安装部署

#### 软件包安装
```bash
# 安装Kibana
sudo apt install kibana

# 启用服务
sudo systemctl enable kibana
```

#### 基础配置
```yaml
# /etc/kibana/kibana.yml
server.port: 5601
server.host: "0.0.0.0"
server.name: "kibana-prod-01"

# Elasticsearch配置
elasticsearch.hosts: ["https://10.1.0.20:9200", "https://10.1.0.21:9200"]
elasticsearch.username: "kibana_system"
elasticsearch.password: "changeme"

# SSL配置
elasticsearch.ssl.certificateAuthorities: ["/etc/kibana/certs/ca.crt"]
elasticsearch.ssl.verificationMode: "certificate"

# 安全配置
xpack.security.enabled: true
xpack.security.encryptionKey: "something_at_least_32_characters"
xpack.security.session.idleTimeout: "1h"
xpack.security.session.lifespan: "30d"

# 监控配置
xpack.monitoring.enabled: true
monitoring.ui.enabled: true

# 日志配置
logging.appenders:
  file:
    type: file
    fileName: /var/log/kibana/kibana.log
    layout:
      type: json
logging.root:
  appenders:
    - default
    - file
  level: warn

# 性能配置
elasticsearch.requestTimeout: 30000
elasticsearch.shardTimeout: 30000
server.maxPayload: 1048576

# 可视化配置
visualization.colorMapping:
map.includeElasticMapsService: false
```

### 负载均衡配置

#### Nginx负载均衡
```nginx
# /etc/nginx/sites-available/kibana
upstream kibana_backend {
    least_conn;
    server 10.1.0.40:5601 max_fails=3 fail_timeout=30s;
    server 10.1.0.41:5601 max_fails=3 fail_timeout=30s;
    keepalive 32;
}

server {
    listen 80;
    listen 443 ssl http2;
    server_name kibana.company.com;

    # SSL配置
    ssl_certificate /etc/nginx/ssl/kibana.crt;
    ssl_certificate_key /etc/nginx/ssl/kibana.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # 安全头
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

    # 日志配置
    access_log /var/log/nginx/kibana_access.log;
    error_log /var/log/nginx/kibana_error.log;

    # 代理配置
    location / {
        proxy_pass http://kibana_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # 超时配置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # 缓冲配置
        proxy_buffering on;
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }

    # 健康检查
    location /status {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

### 索引模板和策略配置

#### 索引生命周期策略
```json
PUT _ilm/policy/efk_logs_policy
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "10GB",
            "max_age": "1d"
          },
          "set_priority": {
            "priority": 100
          }
        }
      },
      "warm": {
        "min_age": "7d",
        "actions": {
          "allocate": {
            "number_of_replicas": 0,
            "include": {
              "box_type": "warm"
            }
          },
          "forcemerge": {
            "max_num_segments": 1
          },
          "set_priority": {
            "priority": 50
          }
        }
      },
      "cold": {
        "min_age": "30d",
        "actions": {
          "allocate": {
            "number_of_replicas": 0,
            "include": {
              "box_type": "cold"
            }
          },
          "set_priority": {
            "priority": 0
          }
        }
      },
      "delete": {
        "min_age": "90d",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}
```

#### 索引模板配置
```json
PUT _index_template/efk_logs_template
{
  "index_patterns": ["*-logs-*"],
  "priority": 200,
  "template": {
    "settings": {
      "number_of_shards": 1,
      "number_of_replicas": 1,
      "index.lifecycle.name": "efk_logs_policy",
      "index.lifecycle.rollover_alias": "logs",
      "index.mapping.total_fields.limit": 2000,
      "index.refresh_interval": "5s",
      "index.max_result_window": 10000
    },
    "mappings": {
      "properties": {
        "@timestamp": {
          "type": "date"
        },
        "hostname": {
          "type": "keyword"
        },
        "level": {
          "type": "keyword"
        },
        "message": {
          "type": "text",
          "analyzer": "standard"
        },
        "tags": {
          "type": "keyword"
        },
        "source": {
          "type": "keyword"
        },
        "fields": {
          "type": "object",
          "dynamic": true
        }
      }
    }
  }
}
```

## 监控告警配置

### ElastAlert告警配置

#### ElastAlert安装
```bash
# 安装ElastAlert
pip install elastalert

# 创建配置目录
sudo mkdir -p /etc/elastalert
sudo mkdir -p /var/log/elastalert

# 初始化索引
elastalert-create-index
```

#### 告警规则配置
```yaml
# /etc/elastalert/rules/error_logs_alert.yaml
name: Application Error Logs Alert
type: frequency
index: application-logs-*
num_events: 10
timeframe:
  minutes: 5

filter:
- term:
    level: "ERROR"

alert:
- "email"
- "slack"

email:
- "ops-team@company.com"
- "dev-team@company.com"

smtp_host: "smtp.company.com"
smtp_port: 587
smtp_auth_file: "/etc/elastalert/smtp_auth.yaml"
from_addr: "alerts@company.com"

slack:
webhook_url: "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
slack_channel_override: "#alerts"
slack_username_override: "ElastAlert"

alert_text: |
  应用程序错误日志告警！
  在过去5分钟内检测到 {0} 条错误日志

  时间范围: {1} - {2}
  索引: {3}

  请及时检查系统状态！

alert_text_type: alert_text_only

include:
- "@timestamp"
- "hostname"
- "message"
- "level"
- "source"
```

### Elasticsearch集群监控

#### 集群健康监控脚本
```bash
#!/bin/bash
# /usr/local/bin/es_cluster_check.sh

ES_HOST="https://10.1.0.20:9200"
ES_USER="elastic"
ES_PASS="changeme"

# 获取集群健康状态
CLUSTER_HEALTH=$(curl -s -u "$ES_USER:$ES_PASS" "$ES_HOST/_cluster/health")
CLUSTER_STATUS=$(echo "$CLUSTER_HEALTH" | jq -r '.status')

# 获取节点信息
NODES_INFO=$(curl -s -u "$ES_USER:$ES_PASS" "$ES_HOST/_nodes/stats")
TOTAL_NODES=$(echo "$NODES_INFO" | jq '.nodes | length')

# 获取索引统计
INDICES_STATS=$(curl -s -u "$ES_USER:$ES_PASS" "$ES_HOST/_cat/indices?v&h=index,health,status,pri,rep,docs.count,store.size&format=json")

# 发送到监控系统
cat << EOF | curl -X POST "http://monitoring.company.com/api/metrics" \
     -H "Content-Type: application/json" \
     -d @-
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "source": "elasticsearch",
  "cluster": {
    "status": "$CLUSTER_STATUS",
    "nodes": $TOTAL_NODES,
    "indices": $(echo "$INDICES_STATS" | jq length)
  },
  "health": $CLUSTER_HEALTH,
  "nodes": $NODES_INFO,
  "indices": $INDICES_STATS
}
EOF

# 健康检查告警
if [ "$CLUSTER_STATUS" != "green" ]; then
    echo "WARNING: Elasticsearch cluster status is $CLUSTER_STATUS" | \
    mail -s "Elasticsearch Cluster Alert" ops-team@company.com
fi
```

## 故障排除指南

### 常见问题诊断

#### Elasticsearch故障排除
```bash
# 检查集群状态
curl -X GET "localhost:9200/_cluster/health?pretty"

# 检查节点状态
curl -X GET "localhost:9200/_nodes/stats?pretty"

# 检查索引状态
curl -X GET "localhost:9200/_cat/indices?v&health=red"

# 检查未分配分片
curl -X GET "localhost:9200/_cluster/allocation/explain?pretty"

# 修复红色索引
curl -X POST "localhost:9200/red-index/_close"
curl -X POST "localhost:9200/red-index/_open"

# 手动分配分片
curl -X POST "localhost:9200/_cluster/reroute" \
-H "Content-Type: application/json" \
-d '{
  "commands": [
    {
      "allocate_primary": {
        "index": "my-index",
        "shard": 0,
        "node": "node-1",
        "accept_data_loss": true
      }
    }
  ]
}'
```

#### Fluentd故障排除
```bash
# 检查Fluentd状态
sudo systemctl status td-agent

# 查看详细日志
sudo tail -f /var/log/td-agent/td-agent.log

# 测试配置语法
sudo td-agent --dry-run -c /etc/td-agent/td-agent.conf

# 检查缓冲区状态
sudo ls -la /var/log/td-agent/buffer/

# 重启服务
sudo systemctl restart td-agent

# 发送测试日志
echo '{"message":"test log","level":"info"}' | \
curl -X POST -d @- http://localhost:8888/test.log
```

#### Kibana故障排除
```bash
# 检查Kibana状态
sudo systemctl status kibana

# 查看Kibana日志
sudo tail -f /var/log/kibana/kibana.log

# 检查Elasticsearch连接
curl -X GET "http://localhost:5601/api/status"

# 重建索引模式
curl -X DELETE "localhost:5601/api/saved_objects/index-pattern/logs-*"

# 清理缓存
sudo rm -rf /var/lib/kibana/optimize/
```

### 容量规划指南

#### 存储容量计算
```bash
# 日志量估算公式
每日日志量 = 日志行数 × 平均行大小 × 压缩比

# 示例计算
日志行数: 1亿行/天
平均行大小: 200字节
压缩比: 3:1
每日原始日志: 100,000,000 × 200 = 20GB
每日压缩日志: 20GB ÷ 3 = 6.7GB

# 存储需求计算
保留天数: 90天
副本数量: 1个
总存储需求: 6.7GB × 90天 × 2(原始+副本) = 1.2TB
```

#### 硬件资源规划
```yaml
# 集群规模规划
小型环境 (< 1TB/月):
  Master节点: 3台 × 8GB内存
  Data节点: 3台 × 32GB内存 × 1TB存储
  协调节点: 2台 × 16GB内存

中型环境 (1-10TB/月):
  Master节点: 3台 × 16GB内存
  Data节点: 6台 × 64GB内存 × 2TB存储
  协调节点: 3台 × 32GB内存

大型环境 (10TB+/月):
  Master节点: 3台 × 32GB内存
  Data节点: 12台+ × 128GB内存 × 4TB存储
  协调节点: 6台 × 64GB内存
```

## 安全管理配置

### X-Pack安全配置

#### 用户和角色管理
```bash
# 创建内置用户密码
sudo /usr/share/elasticsearch/bin/elasticsearch-setup-passwords auto

# 创建自定义角色
curl -X POST "https://localhost:9200/_security/role/log_reader" \
-H "Content-Type: application/json" \
-u elastic:password \
-d '{
  "cluster": ["monitor"],
  "indices": [
    {
      "names": ["*-logs-*"],
      "privileges": ["read", "view_index_metadata"]
    }
  ]
}'

# 创建用户
curl -X POST "https://localhost:9200/_security/user/log_analyst" \
-H "Content-Type: application/json" \
-u elastic:password \
-d '{
  "password": "secure_password",
  "roles": ["log_reader"],
  "full_name": "Log Analyst",
  "email": "analyst@company.com"
}'
```

#### SSL/TLS证书配置
```bash
# 生成CA证书
sudo /usr/share/elasticsearch/bin/elasticsearch-certutil ca

# 生成节点证书
sudo /usr/share/elasticsearch/bin/elasticsearch-certutil cert \
  --ca elastic-stack-ca.p12 \
  --dns elasticsearch-01,elasticsearch-02,elasticsearch-03 \
  --ip 10.1.0.20,10.1.0.21,10.1.0.22,10.1.0.23 \
  --out elastic-certificates.p12

# 复制证书到各节点
sudo cp elastic-certificates.p12 /etc/elasticsearch/
sudo chown elasticsearch:elasticsearch /etc/elasticsearch/elastic-certificates.p12
sudo chmod 660 /etc/elasticsearch/elastic-certificates.p12
```

## 性能优化实践

### Elasticsearch性能调优

#### JVM调优参数
```bash
# /etc/elasticsearch/jvm.options.d/performance.options

# 垃圾回收优化
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200
-XX:G1HeapRegionSize=32m
-XX:+UnlockExperimentalVMOptions
-XX:G1NewSizePercent=30
-XX:G1MaxNewSizePercent=40

# 内存优化
-XX:+AlwaysPreTouch
-XX:+UseLargePages
-XX:LargePageSizeInBytes=2m

# 编译优化
-XX:+UnlockDiagnosticVMOptions
-XX:+LogVMOutput
-XX:LogFile=/var/log/elasticsearch/gc.log

# 性能监控
-XX:+PrintGCDetails
-XX:+PrintGCTimeStamps
-XX:+PrintGCDateStamps
-XX:+PrintGCApplicationStoppedTime
```

### Fluentd性能调优

#### Buffer优化配置
```ruby
# 高性能缓冲配置
<buffer>
  @type file
  path /data/fluentd/buffer

  # 缓冲大小优化
  chunk_limit_size 32MB
  total_limit_size 8GB
  queue_limit_length 1024

  # 刷新优化
  flush_mode interval
  flush_interval 5s
  flush_thread_count 16

  # 压缩优化
  compress gzip

  # 重试优化
  retry_type exponential_backoff
  retry_wait 1s
  retry_max_interval 60s
  retry_forever true

  # 溢出处理
  overflow_action drop_oldest_chunk
</buffer>
```

## 生产环境最佳实践

### 部署最佳实践

1. **集群架构设计**
   - 分离Master、Data、Coordinating节点角色
   - 使用奇数个Master节点避免脑裂
   - 合理规划网络拓扑和存储架构

2. **安全配置**
   - 启用X-Pack安全功能
   - 配置SSL/TLS加密传输
   - 实施细粒度权限控制
   - 定期轮换密钥和证书

3. **监控告警**
   - 部署全面的监控体系
   - 配置实时告警规则
   - 建立运维响应机制
   - 定期检查系统健康状态

4. **备份恢复**
   - 配置自动快照备份
   - 定期测试恢复流程
   - 建立灾难恢复计划
   - 确保数据安全性

5. **性能优化**
   - 根据业务需求调优配置
   - 监控系统性能指标
   - 定期优化索引策略
   - 实施容量规划

### 运维管理策略

#### 索引生命周期管理
```bash
# 定期清理过期索引
#!/bin/bash
RETENTION_DAYS=90
INDICES_TO_DELETE=$(curl -s "http://localhost:9200/_cat/indices" | \
  awk '{print $3}' | \
  grep -E '^.*-[0-9]{4}\.[0-9]{2}\.[0-9]{2}$' | \
  while read index; do
    index_date=$(echo $index | grep -oE '[0-9]{4}\.[0-9]{2}\.[0-9]{2}$')
    index_timestamp=$(date -d "${index_date//./-}" +%s)
    current_timestamp=$(date +%s)
    days_diff=$(( (current_timestamp - index_timestamp) / 86400 ))
    if [ $days_diff -gt $RETENTION_DAYS ]; then
      echo $index
    fi
  done)

for index in $INDICES_TO_DELETE; do
  echo "Deleting index: $index"
  curl -X DELETE "http://localhost:9200/$index"
done
```

#### 集群维护计划
```yaml
# 维护计划清单
日常维护:
  - 检查集群健康状态
  - 监控磁盘空间使用率
  - 查看错误日志和告警
  - 验证备份完整性

周度维护:
  - 清理过期索引
  - 优化索引设置
  - 检查节点性能指标
  - 更新安全补丁

月度维护:
  - 容量规划评估
  - 性能调优分析
  - 灾难恢复演练
  - 系统升级计划

季度维护:
  - 架构优化评估
  - 安全审计检查
  - 成本效益分析
  - 技术栈升级规划
```

通过以上全面的EFK架构部署和管理实践，可以构建一个高可用、高性能、安全可靠的企业级日志平台，为业务运营提供强有力的数据支撑和实时监控能力。在实际生产环境中，应根据具体业务需求和技术栈特点，灵活调整配置参数和架构设计，确保系统的稳定性和可扩展性。