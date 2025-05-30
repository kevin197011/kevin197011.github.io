---
layout: post
title: "Wazuh安全平台架构及实战管理指南"
excerpt: "深入解析Wazuh开源SIEM平台的企业级部署架构，从安装配置到高级威胁检测，包含完整的规则管理、合规性监控和事件响应实战案例。"
date: 2025-01-02
category: Security
tags: [Wazuh, SIEM, 安全监控, 威胁检测, 日志分析, 合规性]
author: Kk
diagram: |
  graph TB
      subgraph "Wazuh安全平台架构"
          subgraph "数据源层 Data Sources"
              LINUX_AGENTS[Linux Agent<br/>日志收集<br/>文件完整性监控]
              WINDOWS_AGENTS[Windows Agent<br/>事件日志<br/>注册表监控]
              MACOS_AGENTS[macOS Agent<br/>系统日志<br/>进程监控]
              NETWORK_DEVICES[网络设备<br/>Syslog<br/>SNMP]
              CLOUD_SERVICES[云服务<br/>AWS CloudTrail<br/>Azure监控]
              DOCKER_CONTAINERS[容器环境<br/>Docker日志<br/>Kubernetes审计]
          end

          subgraph "Wazuh核心组件 Core Components"
              subgraph "Wazuh Manager"
                  MANAGER_MAIN[Wazuh Manager<br/>规则引擎<br/>事件处理]
                  RULESET[规则集<br/>Custom Rules<br/>CDB Lists]
                  ANALYSISD[Analysis Engine<br/>日志解析<br/>关联分析]
                  REMOTED[Remote Daemon<br/>Agent通信<br/>数据接收]
                  MONITORD[Monitor Daemon<br/>系统监控<br/>性能统计]
              end

              subgraph "Wazuh Indexer 集群"
                  INDEXER1[Wazuh Indexer 1<br/>Elasticsearch<br/>数据存储]
                  INDEXER2[Wazuh Indexer 2<br/>Elasticsearch<br/>数据复制]
                  INDEXER3[Wazuh Indexer 3<br/>Elasticsearch<br/>负载均衡]
              end

              subgraph "Wazuh Dashboard"
                  DASHBOARD[Wazuh Dashboard<br/>Kibana界面<br/>可视化分析]
                  ALERTS_VIEW[告警视图<br/>事件分析<br/>响应操作]
                  COMPLIANCE_VIEW[合规性视图<br/>PCI DSS<br/>GDPR监控]
              end
          end

          subgraph "集成服务层 Integration Layer"
              ELASTIC_STACK[ELK Stack集成<br/>Logstash<br/>Beats]
              API_GATEWAY[API网关<br/>RESTful API<br/>Webhook集成]
              THREAT_INTEL[威胁情报<br/>IOC Feed<br/>MISP集成]
              SIEM_INTEGRATION[SIEM集成<br/>Splunk<br/>QRadar]
          end

          subgraph "安全分析层 Security Analytics"
              RULE_ENGINE[规则引擎<br/>Pattern Detection<br/>Correlation Rules]
              ML_DETECTION[机器学习检测<br/>异常检测<br/>行为分析]
              VULNERABILITY_SCAN[漏洞扫描<br/>CVE检测<br/>补丁管理]
              COMPLIANCE_CHECK[合规性检查<br/>CIS基准<br/>安全配置]
          end

          subgraph "响应处理层 Response Layer"
              ACTIVE_RESPONSE[主动响应<br/>自动阻断<br/>脚本执行]
              INCIDENT_RESPONSE[事件响应<br/>工单系统<br/>SOAR集成]
              NOTIFICATION[通知系统<br/>Email<br/>Slack<br/>PagerDuty]
              FORENSICS[数字取证<br/>日志保留<br/>证据收集]
          end

          subgraph "存储备份层 Storage Layer"
              HOT_STORAGE[热存储<br/>Recent Data<br/>快速查询]
              WARM_STORAGE[温存储<br/>Historical Data<br/>成本优化]
              COLD_STORAGE[冷存储<br/>Archive Data<br/>长期保留]
              BACKUP_SYSTEM[备份系统<br/>数据保护<br/>灾难恢复]
          end
      end

      LINUX_AGENTS --> MANAGER_MAIN
      WINDOWS_AGENTS --> MANAGER_MAIN
      MACOS_AGENTS --> MANAGER_MAIN
      NETWORK_DEVICES --> MANAGER_MAIN
      CLOUD_SERVICES --> MANAGER_MAIN
      DOCKER_CONTAINERS --> MANAGER_MAIN

      MANAGER_MAIN --> ANALYSISD
      MANAGER_MAIN --> REMOTED
      MANAGER_MAIN --> MONITORD
      ANALYSISD --> RULESET
      ANALYSISD --> RULE_ENGINE

      MANAGER_MAIN --> INDEXER1
      MANAGER_MAIN --> INDEXER2
      MANAGER_MAIN --> INDEXER3

      INDEXER1 --> DASHBOARD
      INDEXER2 --> DASHBOARD
      INDEXER3 --> DASHBOARD

      DASHBOARD --> ALERTS_VIEW
      DASHBOARD --> COMPLIANCE_VIEW

      MANAGER_MAIN --> API_GATEWAY
      API_GATEWAY --> THREAT_INTEL
      API_GATEWAY --> SIEM_INTEGRATION

      RULE_ENGINE --> ML_DETECTION
      RULE_ENGINE --> VULNERABILITY_SCAN
      RULE_ENGINE --> COMPLIANCE_CHECK

      ANALYSISD --> ACTIVE_RESPONSE
      ALERTS_VIEW --> INCIDENT_RESPONSE
      ALERTS_VIEW --> NOTIFICATION

      INDEXER1 --> HOT_STORAGE
      INDEXER2 --> WARM_STORAGE
      INDEXER3 --> COLD_STORAGE
      HOT_STORAGE --> BACKUP_SYSTEM

      ACTIVE_RESPONSE --> FORENSICS
      THREAT_INTEL -.->|威胁情报更新| RULE_ENGINE
      ELASTIC_STACK -.->|日志增强| ANALYSISD

      style MANAGER_MAIN fill:#ff6b6b,stroke:#fff,stroke-width:2px,color:#fff
      style INDEXER1 fill:#4ecdc4,stroke:#fff,stroke-width:2px,color:#fff
      style INDEXER2 fill:#4ecdc4,stroke:#fff,stroke-width:2px,color:#fff
      style INDEXER3 fill:#4ecdc4,stroke:#fff,stroke-width:2px,color:#fff
      style DASHBOARD fill:#45b7d1,stroke:#fff,stroke-width:2px,color:#fff
      style RULE_ENGINE fill:#feca57,stroke:#fff,stroke-width:2px,color:#000
      style ACTIVE_RESPONSE fill:#ff6348,stroke:#fff,stroke-width:2px,color:#fff
      style THREAT_INTEL fill:#9b59b6,stroke:#fff,stroke-width:2px,color:#fff
      style ML_DETECTION fill:#2ed573,stroke:#fff,stroke-width:2px,color:#fff
      style COMPLIANCE_CHECK fill:#f39c12,stroke:#fff,stroke-width:2px,color:#fff
---

# Wazuh安全平台架构及实战管理指南

## Wazuh平台概述

### 什么是Wazuh

Wazuh是一个免费开源的安全平台，统一了XDR和SIEM能力，提供端点安全、威胁检测、合规性监控和事件响应功能。

```yaml
Wazuh核心特性:
  威胁检测: 实时监控和分析
  事件响应: 自动化响应机制
  合规性监控: PCI DSS, GDPR, HIPAA
  漏洞检测: CVE数据库集成
  文件完整性: 关键文件监控
  配置评估: 安全基准检查
  日志数据分析: 集中化日志管理
  云安全: AWS, Azure, GCP支持
```

## 系统架构设计

### 核心组件架构

#### Wazuh Manager配置
```bash
# Wazuh Manager安装脚本
#!/bin/bash

# 系统要求
echo "配置Wazuh Manager..."

# 更新系统
apt update && apt upgrade -y

# 安装必要依赖
apt install curl apt-transport-https lsb-release gnupg -y

# 添加Wazuh仓库
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import
chmod 644 /usr/share/keyrings/wazuh.gpg

echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | \
  tee /etc/apt/sources.list.d/wazuh.list

# 安装Wazuh Manager
apt update
apt install wazuh-manager -y

# 启动服务
systemctl daemon-reload
systemctl enable wazuh-manager
systemctl start wazuh-manager

echo "Wazuh Manager安装完成"
```

### 高可用架构部署

#### Wazuh集群配置
```xml
<!-- /var/ossec/etc/ossec.conf - Master节点配置 -->
<ossec_config>
  <cluster>
    <name>wazuh_cluster</name>
    <node_name>master-node</node_name>
    <node_type>master</node_type>
    <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
    <port>1516</port>
    <bind_addr>0.0.0.0</bind_addr>
    <nodes>
        <node>NODE_IP</node>
    </nodes>
    <hidden>no</hidden>
    <disabled>no</disabled>
  </cluster>

  <global>
    <jsonout_output>yes</jsonout_output>
    <alerts_log>yes</alerts_log>
    <logall>no</logall>
    <logall_json>no</logall_json>
    <email_notification>no</email_notification>
    <smtp_server>localhost</smtp_server>
    <email_from>wazuh@example.com</email_from>
    <email_to>admin@example.com</email_to>
    <hostname>wazuh-manager</hostname>
    <email_maxperhour>12</email_maxperhour>
  </global>

  <remote>
    <connection>secure</connection>
    <port>1514</port>
    <protocol>tcp</protocol>
    <queue_size>131072</queue_size>
  </remote>
</ossec_config>
```

## Wazuh Indexer集群

### Elasticsearch集群配置

#### 主节点配置
```yaml
# /etc/wazuh-indexer/opensearch.yml
cluster.name: wazuh-cluster
node.name: node-1
node.roles:
  - master
  - data
  - ingest

network.host: 0.0.0.0
http.port: 9200
transport.port: 9300

discovery.seed_hosts:
  - "192.168.1.10"
  - "192.168.1.11"
  - "192.168.1.12"

cluster.initial_master_nodes:
  - "node-1"
  - "node-2"
  - "node-3"

# 安全配置
plugins.security.ssl.transport.pemcert_filepath: node.pem
plugins.security.ssl.transport.pemkey_filepath: node-key.pem
plugins.security.ssl.transport.pemtrustedcas_filepath: root-ca.pem

# 性能优化
indices.fielddata.cache.size: 40%
indices.breaker.fielddata.limit: 60%
indices.breaker.total.use_real_memory: false

# 分片配置
cluster.routing.allocation.node_concurrent_recoveries: 4
cluster.routing.allocation.disk.watermark.low: 85%
cluster.routing.allocation.disk.watermark.high: 90%
```

### 索引管理策略

#### 索引生命周期管理
```bash
#!/bin/bash
# Wazuh索引管理脚本

# 设置索引策略
curl -X PUT "localhost:9200/_ilm/policy/wazuh-policy" \
-H 'Content-Type: application/json' -d'
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "5GB",
            "max_age": "7d"
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
            "number_of_replicas": 0
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
            "number_of_replicas": 0
          },
          "set_priority": {
            "priority": 0
          }
        }
      },
      "delete": {
        "min_age": "90d"
      }
    }
  }
}'

# 应用到Wazuh索引
curl -X PUT "localhost:9200/_index_template/wazuh-template" \
-H 'Content-Type: application/json' -d'
{
  "index_patterns": ["wazuh-alerts-*"],
  "template": {
    "settings": {
      "index.lifecycle.name": "wazuh-policy",
      "index.lifecycle.rollover_alias": "wazuh-alerts",
      "number_of_shards": 1,
      "number_of_replicas": 1
    }
  }
}'
```

## Agent部署管理

### Linux Agent安装

#### 自动化部署脚本
```bash
#!/bin/bash
# Wazuh Agent自动化部署

WAZUH_MANAGER="192.168.1.10"
WAZUH_MANAGER_PORT="1514"
WAZUH_PROTOCOL="tcp"
WAZUH_REGISTRATION_SERVER="192.168.1.10"
WAZUH_REGISTRATION_PORT="1515"
WAZUH_REGISTRATION_PASSWORD="your_password"
WAZUH_KEEP_ALIVE_INTERVAL="60"
WAZUH_TIME_RECONNECT="5"
WAZUH_REGISTRATION_CA=""
WAZUH_REGISTRATION_CERTIFICATE=""
WAZUH_REGISTRATION_KEY=""
WAZUH_AGENT_NAME="$(hostname)"
WAZUH_AGENT_GROUP="default"

# 下载安装脚本
curl -sO https://packages.wazuh.com/4.x/wazuh-install.sh

# 安装Agent
bash wazuh-install.sh -a \
  -i $WAZUH_MANAGER \
  -P $WAZUH_REGISTRATION_PASSWORD \
  -G $WAZUH_AGENT_GROUP \
  -A $WAZUH_AGENT_NAME

# 启动服务
systemctl daemon-reload
systemctl enable wazuh-agent
systemctl start wazuh-agent

echo "Wazuh Agent安装完成"
```

### Windows Agent部署

#### PowerShell部署脚本
```powershell
# Wazuh Windows Agent部署脚本

param(
    [Parameter(Mandatory=$true)]
    [string]$WazuhManager,

    [Parameter(Mandatory=$true)]
    [string]$RegistrationPassword,

    [string]$AgentGroup = "windows",
    [string]$AgentName = $env:COMPUTERNAME
)

# 下载Agent
$url = "https://packages.wazuh.com/4.x/windows/wazuh-agent-4.7.0-1.msi"
$output = "$env:TEMP\wazuh-agent.msi"

Write-Host "下载Wazuh Agent..."
Invoke-WebRequest -Uri $url -OutFile $output

# 安装Agent
Write-Host "安装Wazuh Agent..."
Start-Process msiexec.exe -Wait -ArgumentList "/i $output /quiet",
    "WAZUH_MANAGER=$WazuhManager",
    "WAZUH_REGISTRATION_SERVER=$WazuhManager",
    "WAZUH_REGISTRATION_PASSWORD=$RegistrationPassword",
    "WAZUH_AGENT_GROUP=$AgentGroup",
    "WAZUH_AGENT_NAME=$AgentName"

# 启动服务
Write-Host "启动Wazuh服务..."
Start-Service -Name "Wazuh"
Set-Service -Name "Wazuh" -StartupType Automatic

Write-Host "Wazuh Agent安装完成"
```

## 规则配置管理

### 自定义规则创建

#### SSH攻击检测规则
```xml
<!-- /var/ossec/etc/rules/local_rules.xml -->
<group name="ssh_attacks">
  <!-- SSH暴力破解检测 -->
  <rule id="100001" level="10">
    <if_matched_sid>5716</if_matched_sid>
    <match>authentication failure</match>
    <description>SSH authentication failure</description>
    <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
  </rule>

  <!-- SSH成功登录后的可疑活动 -->
  <rule id="100002" level="8">
    <if_matched_sid>5715</if_matched_sid>
    <user>root</user>
    <time>22:00-06:00</time>
    <description>Root login outside business hours</description>
    <group>authentication_success,</group>
  </rule>

  <!-- 多次失败后成功登录 -->
  <rule id="100003" level="12" frequency="5" timeframe="300">
    <if_matched_sid>100001</if_matched_sid>
    <same_source_ip />
    <description>Multiple SSH authentication failures from same IP</description>
    <group>authentication_failures,attack,pci_dss_11.4,</group>
  </rule>

  <!-- 新用户SSH登录 -->
  <rule id="100004" level="8">
    <if_matched_sid>5715</if_matched_sid>
    <if_fts />
    <description>First time SSH login for user</description>
    <group>authentication_success,first_time,</group>
  </rule>
</group>

<!-- Web攻击检测规则 -->
<group name="web_attacks">
  <!-- SQL注入检测 -->
  <rule id="100010" level="12">
    <decoded_as>web-log</decoded_as>
    <regex type="pcre2">(?i)(union\s+select|select\s+.*\s+from|insert\s+into|delete\s+from|drop\s+table)</regex>
    <description>Possible SQL injection attack</description>
    <group>web,attack,sql_injection,</group>
  </rule>

  <!-- XSS攻击检测 -->
  <rule id="100011" level="10">
    <decoded_as>web-log</decoded_as>
    <regex type="pcre2">(?i)(\<script\>|javascript:|onerror=|onload=)</regex>
    <description>Possible XSS attack</description>
    <group>web,attack,xss,</group>
  </rule>

  <!-- 路径遍历攻击 -->
  <rule id="100012" level="10">
    <decoded_as>web-log</decoded_as>
    <regex>\.\.\/|\.\.\\</regex>
    <description>Possible directory traversal attack</description>
    <group>web,attack,directory_traversal,</group>
  </rule>
</group>
```

### 威胁情报集成

#### MISP集成配置
```python
#!/usr/bin/env python3
# MISP威胁情报集成脚本

import json
import requests
from pymisp import PyMISP
import subprocess
import logging

class WazuhMISPIntegration:
    def __init__(self, misp_url, misp_key, wazuh_path):
        self.misp_url = misp_url
        self.misp_key = misp_key
        self.wazuh_path = wazuh_path
        self.misp = PyMISP(misp_url, misp_key, ssl=False)

        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)

    def fetch_iocs(self, event_id=None, tags=None):
        """从MISP获取IOC"""
        try:
            if event_id:
                event = self.misp.get_event(event_id, pythonify=True)
                iocs = self.extract_iocs_from_event(event)
            else:
                # 获取最近24小时的IOC
                iocs = self.misp.search(
                    controller='attributes',
                    published=True,
                    timestamp='24h',
                    tags=tags
                )

            return iocs
        except Exception as e:
            self.logger.error(f"获取IOC失败: {e}")
            return []

    def extract_iocs_from_event(self, event):
        """从事件中提取IOC"""
        iocs = {
            'domains': [],
            'ips': [],
            'hashes': [],
            'urls': []
        }

        for attribute in event.attributes:
            if attribute.type == 'domain':
                iocs['domains'].append(attribute.value)
            elif attribute.type in ['ip-src', 'ip-dst']:
                iocs['ips'].append(attribute.value)
            elif attribute.type in ['md5', 'sha1', 'sha256']:
                iocs['hashes'].append(attribute.value)
            elif attribute.type == 'url':
                iocs['urls'].append(attribute.value)

        return iocs

    def update_wazuh_cdb(self, iocs):
        """更新Wazuh CDB数据库"""
        try:
            # 更新恶意域名列表
            with open(f'{self.wazuh_path}/etc/lists/malicious_domains', 'w') as f:
                for domain in iocs.get('domains', []):
                    f.write(f"{domain}:malicious_domain\n")

            # 更新恶意IP列表
            with open(f'{self.wazuh_path}/etc/lists/malicious_ips', 'w') as f:
                for ip in iocs.get('ips', []):
                    f.write(f"{ip}:malicious_ip\n")

            # 更新恶意哈希列表
            with open(f'{self.wazuh_path}/etc/lists/malicious_hashes', 'w') as f:
                for hash_val in iocs.get('hashes', []):
                    f.write(f"{hash_val}:malicious_hash\n")

            # 重启Wazuh服务以加载新数据
            subprocess.run(['systemctl', 'restart', 'wazuh-manager'])

            self.logger.info("Wazuh CDB数据库更新成功")

        except Exception as e:
            self.logger.error(f"更新CDB数据库失败: {e}")

    def create_ioc_rules(self, iocs):
        """基于IOC创建Wazuh规则"""
        rules_content = """
<group name="misp_iocs">
  <!-- 恶意域名检测 -->
  <rule id="100050" level="12">
    <decoded_as>web-log</decoded_as>
    <list field="url" lookup="match_key">etc/lists/malicious_domains</list>
    <description>Access to malicious domain detected</description>
    <group>misp,threat_intel,malicious_domain</group>
  </rule>

  <!-- 恶意IP通信检测 -->
  <rule id="100051" level="12">
    <list field="srcip" lookup="match_key">etc/lists/malicious_ips</list>
    <description>Communication with malicious IP detected</description>
    <group>misp,threat_intel,malicious_ip</group>
  </rule>

  <!-- 恶意文件哈希检测 -->
  <rule id="100052" level="12">
    <list field="hash" lookup="match_key">etc/lists/malicious_hashes</list>
    <description>Malicious file hash detected</description>
    <group>misp,threat_intel,malicious_hash</group>
  </rule>
</group>
"""

        try:
            with open(f'{self.wazuh_path}/etc/rules/misp_rules.xml', 'w') as f:
                f.write(rules_content)

            self.logger.info("MISP IOC规则创建成功")

        except Exception as e:
            self.logger.error(f"创建IOC规则失败: {e}")

# 使用示例
if __name__ == "__main__":
    misp_integration = WazuhMISPIntegration(
        misp_url="https://misp.example.com",
        misp_key="YOUR_MISP_KEY",
        wazuh_path="/var/ossec"
    )

    # 获取威胁情报
    iocs = misp_integration.fetch_iocs(tags=['malware', 'botnet'])

    # 更新Wazuh
    misp_integration.update_wazuh_cdb(iocs)
    misp_integration.create_ioc_rules(iocs)
```

## 主动响应配置

### 自动阻断脚本

#### IP阻断响应
```bash
#!/bin/bash
# /var/ossec/active-response/bin/block-ip.sh

LOCAL=`dirname $0`;
cd $LOCAL
cd ../

PWD=`pwd`
LOCK="${PWD}/block-ip"
LOCK_PID="${PWD}/block-ip.pid"

# 日志记录
LOG_FILE="/var/ossec/logs/active-responses.log"

# 记录函数
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOG_FILE
}

# 添加IP到iptables黑名单
add_ip() {
    IP=$1

    # 检查IP是否已被阻断
    if iptables -L INPUT -n | grep -q "$IP"; then
        log_message "IP $IP 已在黑名单中"
        return
    fi

    # 添加阻断规则
    iptables -I INPUT -s $IP -j DROP

    if [ $? -eq 0 ]; then
        log_message "成功阻断IP: $IP"

        # 记录到阻断列表
        echo "$IP $(date '+%Y-%m-%d %H:%M:%S')" >> /var/ossec/etc/blocked_ips.txt

        # 设置自动解除时间（24小时后）
        echo "sleep 86400 && iptables -D INPUT -s $IP -j DROP" | at now

    else
        log_message "阻断IP失败: $IP"
    fi
}

# 移除IP阻断
remove_ip() {
    IP=$1

    iptables -D INPUT -s $IP -j DROP

    if [ $? -eq 0 ]; then
        log_message "解除阻断IP: $IP"

        # 从阻断列表移除
        sed -i "/$IP/d" /var/ossec/etc/blocked_ips.txt
    else
        log_message "解除阻断失败: $IP"
    fi
}

# 主程序
case "$1" in
    add)
        add_ip $3
        ;;
    delete)
        remove_ip $3
        ;;
    *)
        echo "用法: $0 {add|delete} user ip"
        exit 1
        ;;
esac

exit 0
```

#### 主动响应配置
```xml
<!-- /var/ossec/etc/ossec.conf - 主动响应配置 -->
<ossec_config>
  <!-- 命令定义 -->
  <command>
    <name>block-ip</name>
    <executable>block-ip.sh</executable>
    <timeout_allowed>yes</timeout_allowed>
  </command>

  <command>
    <name>restart-service</name>
    <executable>restart-service.sh</executable>
    <timeout_allowed>yes</timeout_allowed>
  </command>

  <!-- 主动响应配置 -->
  <active-response>
    <command>block-ip</command>
    <location>local</location>
    <rules_id>100003,100010,100011,100012</rules_id>
    <timeout>3600</timeout>
  </active-response>

  <active-response>
    <command>restart-service</command>
    <location>local</location>
    <rules_id>100020</rules_id>
    <timeout>no</timeout>
  </active-response>
</ossec_config>
```

## 合规性监控

### PCI DSS合规配置

#### PCI DSS检查规则
```xml
<!-- PCI DSS合规性规则 -->
<group name="pci_dss">
  <!-- 要求2: 默认密码更改 -->
  <rule id="100100" level="8">
    <if_sid>5715</if_sid>
    <user>admin|administrator|root</user>
    <match>password</match>
    <description>Default account login detected</description>
    <group>pci_dss_2.1,authentication_success,</group>
  </rule>

  <!-- 要求8: 用户身份识别 -->
  <rule id="100101" level="10">
    <if_sid>5716</if_sid>
    <frequency>5</frequency>
    <timeframe>300</timeframe>
    <description>Multiple authentication failures</description>
    <group>pci_dss_8.1,authentication_failed,</group>
  </rule>

  <!-- 要求10: 网络资源访问记录 -->
  <rule id="100102" level="5">
    <decoded_as>web-log</decoded_as>
    <regex>\s+POST\s+</regex>
    <description>POST request to web server</description>
    <group>pci_dss_10.2.1,web,</group>
  </rule>

  <!-- 要求11: 安全系统测试 -->
  <rule id="100103" level="12">
    <if_sid>40101</if_sid>
    <match>vulnerability|exploit</match>
    <description>Vulnerability scanning detected</description>
    <group>pci_dss_11.2,vulnerability,</group>
  </rule>
</group>
```

### CIS基准检查

#### CIS控制检查脚本
```bash
#!/bin/bash
# CIS基准检查脚本

CIS_LOG="/var/ossec/logs/cis_check.log"

# 记录函数
log_cis() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - CIS Check: $1" >> $CIS_LOG
}

# CIS Control 1: 硬件和软件资产清单
check_cis_1() {
    log_cis "开始检查CIS Control 1 - 资产清单"

    # 检查已安装软件
    dpkg -l > /tmp/installed_packages.txt

    # 检查运行进程
    ps aux > /tmp/running_processes.txt

    # 检查网络连接
    netstat -tulpn > /tmp/network_connections.txt

    log_cis "CIS Control 1 检查完成"
}

# CIS Control 2: 软件资产清单
check_cis_2() {
    log_cis "开始检查CIS Control 2 - 软件资产"

    # 检查未授权软件
    UNAUTHORIZED_SOFTWARE=("netcat" "nmap" "john" "hashcat")

    for software in "${UNAUTHORIZED_SOFTWARE[@]}"; do
        if command -v $software >/dev/null 2>&1; then
            log_cis "警告: 发现未授权软件 $software"
            echo "CIS-2: Unauthorized software detected: $software" >> $CIS_LOG
        fi
    done

    log_cis "CIS Control 2 检查完成"
}

# CIS Control 3: 数据保护
check_cis_3() {
    log_cis "开始检查CIS Control 3 - 数据保护"

    # 检查敏感文件权限
    SENSITIVE_FILES=("/etc/passwd" "/etc/shadow" "/etc/sudoers")

    for file in "${SENSITIVE_FILES[@]}"; do
        if [ -f "$file" ]; then
            perms=$(stat -c "%a" "$file")
            if [ "$file" = "/etc/shadow" ] && [ "$perms" != "640" ]; then
                log_cis "警告: $file 权限不正确: $perms"
            fi
        fi
    done

    log_cis "CIS Control 3 检查完成"
}

# CIS Control 4: 安全配置
check_cis_4() {
    log_cis "开始检查CIS Control 4 - 安全配置"

    # 检查SSH配置
    if [ -f "/etc/ssh/sshd_config" ]; then
        # 检查root登录
        if grep -q "^PermitRootLogin yes" /etc/ssh/sshd_config; then
            log_cis "警告: SSH允许root登录"
        fi

        # 检查密码认证
        if grep -q "^PasswordAuthentication yes" /etc/ssh/sshd_config; then
            log_cis "警告: SSH允许密码认证"
        fi
    fi

    log_cis "CIS Control 4 检查完成"
}

# CIS Control 5: 账户管理
check_cis_5() {
    log_cis "开始检查CIS Control 5 - 账户管理"

    # 检查空密码账户
    awk -F: '($2 == "") {print $1}' /etc/shadow | while read user; do
        log_cis "警告: 用户 $user 没有密码"
    done

    # 检查UID为0的账户
    awk -F: '($3 == 0) {print $1}' /etc/passwd | while read user; do
        if [ "$user" != "root" ]; then
            log_cis "警告: 非root用户具有UID 0: $user"
        fi
    done

    log_cis "CIS Control 5 检查完成"
}

# 主检查函数
main() {
    log_cis "开始CIS基准检查"

    check_cis_1
    check_cis_2
    check_cis_3
    check_cis_4
    check_cis_5

    log_cis "CIS基准检查完成"

    # 发送结果到Wazuh
    /var/ossec/bin/agent_control -i $CIS_LOG
}

# 执行检查
main
```

## 性能优化

### 系统调优配置

#### Elasticsearch优化
```yaml
# /etc/wazuh-indexer/jvm.options
# JVM堆内存设置（系统内存的50%）
-Xms16g
-Xmx16g

# GC优化
-XX:+UseG1GC
-XX:G1HeapRegionSize=32m
-XX:+UnlockExperimentalVMOptions
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200

# 内存优化
-XX:+AlwaysPreTouch
-XX:+DisableExplicitGC
-XX:+HeapDumpOnOutOfMemoryError
```

### 监控脚本

#### 性能监控脚本
```python
#!/usr/bin/env python3
# Wazuh性能监控脚本

import psutil
import json
import time
import requests
from datetime import datetime

class WazuhMonitor:
    def __init__(self):
        self.indexer_url = "http://localhost:9200"
        self.metrics = {}

    def collect_system_metrics(self):
        """收集系统指标"""
        self.metrics.update({
            'timestamp': datetime.now().isoformat(),
            'cpu_percent': psutil.cpu_percent(interval=1),
            'memory_usage': psutil.virtual_memory()._asdict(),
            'disk_usage': psutil.disk_usage('/')._asdict(),
            'network_io': psutil.net_io_counters()._asdict(),
            'load_average': psutil.getloadavg()
        })

    def collect_wazuh_metrics(self):
        """收集Wazuh指标"""
        try:
            # Manager状态
            manager_stats = self.get_manager_stats()

            # Indexer状态
            indexer_stats = self.get_indexer_stats()

            self.metrics.update({
                'wazuh_manager': manager_stats,
                'wazuh_indexer': indexer_stats
            })

        except Exception as e:
            print(f"收集Wazuh指标失败: {e}")

    def get_manager_stats(self):
        """获取Manager统计信息"""
        try:
            # 读取统计文件
            with open('/var/ossec/var/run/ossec-analysisd.state', 'r') as f:
                stats = {}
                for line in f:
                    if '=' in line:
                        key, value = line.strip().split('=', 1)
                        stats[key] = value
                return stats
        except:
            return {}

    def get_indexer_stats(self):
        """获取Indexer统计信息"""
        try:
            response = requests.get(f"{self.indexer_url}/_cluster/stats")
            return response.json()
        except:
            return {}

    def check_thresholds(self):
        """检查阈值告警"""
        alerts = []

        # CPU使用率告警
        if self.metrics.get('cpu_percent', 0) > 80:
            alerts.append({
                'level': 'warning',
                'metric': 'cpu_usage',
                'value': self.metrics['cpu_percent'],
                'threshold': 80
            })

        # 内存使用率告警
        memory_percent = self.metrics.get('memory_usage', {}).get('percent', 0)
        if memory_percent > 85:
            alerts.append({
                'level': 'critical',
                'metric': 'memory_usage',
                'value': memory_percent,
                'threshold': 85
            })

        # 磁盘使用率告警
        disk_percent = (self.metrics.get('disk_usage', {}).get('used', 0) /
                       self.metrics.get('disk_usage', {}).get('total', 1)) * 100
        if disk_percent > 90:
            alerts.append({
                'level': 'critical',
                'metric': 'disk_usage',
                'value': disk_percent,
                'threshold': 90
            })

        return alerts

    def send_to_wazuh(self, data):
        """发送数据到Wazuh"""
        try:
            log_entry = {
                'timestamp': datetime.now().isoformat(),
                'source': 'wazuh_monitor',
                'data': data
            }

            # 写入日志文件，由Wazuh Agent收集
            with open('/var/log/wazuh_monitor.log', 'a') as f:
                f.write(json.dumps(log_entry) + '\n')

        except Exception as e:
            print(f"发送数据失败: {e}")

    def run_monitoring(self):
        """运行监控"""
        self.collect_system_metrics()
        self.collect_wazuh_metrics()

        alerts = self.check_thresholds()

        # 发送指标
        self.send_to_wazuh(self.metrics)

        # 发送告警
        for alert in alerts:
            self.send_to_wazuh(alert)

        print(f"监控完成 - 指标已收集，发现 {len(alerts)} 个告警")

if __name__ == "__main__":
    monitor = WazuhMonitor()
    monitor.run_monitoring()
```

## 总结

Wazuh作为开源SIEM平台，提供了完整的安全监控解决方案。通过本指南的实施，可以构建出企业级的安全运营中心。

### 关键要点

1. **架构规划**：
   - 合理规划Manager集群和Indexer集群
   - 考虑数据量和性能需求
   - 实施高可用架构

2. **规则管理**：
   - 创建针对性的检测规则
   - 集成威胁情报源
   - 定期更新规则集

3. **主动响应**：
   - 配置自动化响应机制
   - 实施分层防护策略
   - 建立事件响应流程

4. **合规监控**：
   - 实施行业标准检查
   - 自动化合规报告
   - 持续监控配置

5. **性能优化**：
   - 优化Elasticsearch配置
   - 监控系统性能
   - 实施数据生命周期管理

掌握这些实践，将帮助您构建和维护强大的安全监控平台。

---

*本文为Wazuh安全平台实战指南，建议结合实际环境需求进行调整和优化。如有技术问题，欢迎交流讨论。*