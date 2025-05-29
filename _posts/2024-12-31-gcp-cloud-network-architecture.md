---
layout: post
title: "GCP Cloud 网络架构与管理实战指南"
excerpt: "深入解析Google Cloud Platform网络结构设计，从VPC规划到防火墙配置，包含完整的网络架构最佳实践和故障排除方案。"
date: 2024-12-31
category: DevOps
tags: [GCP, 云计算, 网络架构, VPC, 防火墙, 负载均衡器, 云原生]
author: Kk
diagram: |
  graph TB
      subgraph "Google Cloud Platform网络架构"
          subgraph "Google全球网络基础设施"
              GOOGLE_BACKBONE[Google全球网络骨干]
              DEDICATED_INT[Dedicated Interconnect 专线]
              CLOUD_CDN[Cloud CDN边缘节点]
              PREMIUM_TIER[Premium Tier 高级网络]
          end

          subgraph "区域 Region (us-central1)"
              subgraph "可用区 Zone A (us-central1-a)"
                  VPC1[VPC 网络 1<br/>production-vpc]
                  SUBNET1[子网 Web<br/>10.1.1.0/24]
                  VM1[Compute Engine VM<br/>Web服务器]
                  FW1[防火墙规则 Web]
              end

              subgraph "可用区 Zone B (us-central1-b)"
                  VPC2[VPC 网络 2<br/>production-vpc]
                  SUBNET2[子网 App<br/>10.1.2.0/24]
                  VM2[Compute Engine VM<br/>应用服务器]
                  FW2[防火墙规则 App]
              end

              subgraph "可用区 Zone C (us-central1-c)"
                  VPC3[VPC 网络 3<br/>production-vpc]
                  SUBNET3[子网 DB<br/>10.1.3.0/24]
                  VM3[Compute Engine VM<br/>数据库服务器]
                  FW3[防火墙规则 DB]
              end

              GLB[Global Load Balancer<br/>全球负载均衡]
              ILB[Internal Load Balancer<br/>内部负载均衡]
              NAT_GW[Cloud NAT<br/>网络地址转换]
              VPN_GW[Cloud VPN<br/>站点到站点VPN]
              CLOUD_ROUTER[Cloud Router<br/>动态路由]
          end

          subgraph "托管服务网络"
              GKE[Google Kubernetes Engine<br/>容器编排]
              CLOUD_SQL[Cloud SQL<br/>托管数据库]
              MEMORYSTORE[Memorystore<br/>托管Redis]
              CLOUD_STORAGE[Cloud Storage<br/>对象存储]
          end

          subgraph "网络安全服务"
              ARMOR[Cloud Armor<br/>DDoS和WAF防护]
              IAP[Identity-Aware Proxy<br/>零信任访问]
              VPC_SC[VPC Service Controls<br/>数据边界保护]
              SECURITY_COMMAND[Security Command Center<br/>安全态势管理]
          end

          subgraph "网络监控和工具"
              NETWORK_INTEL[Network Intelligence<br/>网络洞察]
              VPC_FLOW_LOGS[VPC Flow Logs<br/>流量日志]
              CLOUD_MONITORING[Cloud Monitoring<br/>网络监控]
              NETWORK_TOPOLOGY[Network Topology<br/>拓扑可视化]
          end
      end

      subgraph "企业本地环境"
          ONPREM_DC[企业数据中心]
          ONPREM_NETWORK[企业网络]
          ENTERPRISE_USERS[企业用户]
      end

      subgraph "互联网和外部用户"
          INTERNET[互联网]
          EXTERNAL_USERS[外部用户]
      end

      EXTERNAL_USERS --> CLOUD_CDN
      CLOUD_CDN --> GLB
      GLB --> SUBNET1
      SUBNET1 --> VM1
      FW1 --> VM1

      VM1 --> ILB
      ILB --> SUBNET2
      SUBNET2 --> VM2
      FW2 --> VM2

      VM2 --> SUBNET3
      SUBNET3 --> VM3
      FW3 --> VM3

      VM3 --> CLOUD_SQL
      VM3 --> MEMORYSTORE
      VM1 --> CLOUD_STORAGE

      ENTERPRISE_USERS --> ONPREM_NETWORK
      ONPREM_NETWORK --> ONPREM_DC
      ONPREM_DC --> DEDICATED_INT
      DEDICATED_INT --> VPN_GW
      VPN_GW --> VPC1

      VPC1 -.->|VPC Peering| VPC2
      VPC2 -.->|VPC Peering| VPC3
      VPC1 -.->|Shared VPC| GKE

      ARMOR --> GLB
      IAP --> VM1
      IAP --> VM2
      IAP --> VM3
      VPC_SC --> VPC1
      VPC_SC --> VPC2
      VPC_SC --> VPC3

      NETWORK_INTEL --> VPC1
      NETWORK_INTEL --> VPC2
      NETWORK_INTEL --> VPC3
      VPC_FLOW_LOGS --> CLOUD_MONITORING
      NETWORK_TOPOLOGY --> NETWORK_INTEL

      GOOGLE_BACKBONE --> DEDICATED_INT
      GOOGLE_BACKBONE --> CLOUD_CDN
      PREMIUM_TIER --> GOOGLE_BACKBONE

      NAT_GW --> SUBNET2
      NAT_GW --> SUBNET3
      CLOUD_ROUTER --> VPN_GW
      CLOUD_ROUTER --> NAT_GW

      style GLB fill:#4285f4,stroke:#fff,stroke-width:2px,color:#fff
      style ARMOR fill:#ea4335,stroke:#fff,stroke-width:2px,color:#fff
      style VPC1 fill:#34a853,stroke:#fff,stroke-width:2px,color:#fff
      style VPC2 fill:#34a853,stroke:#fff,stroke-width:2px,color:#fff
      style VPC3 fill:#34a853,stroke:#fff,stroke-width:2px,color:#fff
      style FW1 fill:#fbbc04,stroke:#fff,stroke-width:2px,color:#000
      style FW2 fill:#fbbc04,stroke:#fff,stroke-width:2px,color:#000
      style FW3 fill:#fbbc04,stroke:#fff,stroke-width:2px,color:#000
      style CLOUD_STORAGE fill:#4285f4,stroke:#fff,stroke-width:2px,color:#fff
      style CLOUD_SQL fill:#4285f4,stroke:#fff,stroke-width:2px,color:#fff
      style GKE fill:#34a853,stroke:#fff,stroke-width:2px,color:#fff
---

# GCP Cloud 网络架构与管理实战指南

## GCP网络基础概念

### 全球基础设施

Google Cloud Platform提供强大的全球网络基础设施：

```yaml
GCP全球架构:
  区域(Regions): 40+个区域
  可用区(Zones): 121+个可用区
  边缘节点(PoPs): 200+个边缘接入点
  海底光缆: 自有的全球海底光缆网络
  网络级别: Premium Tier和Standard Tier
```

#### 区域和可用区查询
```bash
# 查看可用区域
gcloud compute regions list

# 查看指定区域的可用区
gcloud compute zones list --filter="region:us-central1"

# 查看网络级别
gcloud compute networks list
```

### 核心网络组件

#### VPC (Virtual Private Cloud)
```json
{
  "VPC特性": {
    "全球资源": "单个VPC可跨越所有区域",
    "子网": "区域级资源，支持跨可用区",
    "路由": "全球路由表，自动路由管理",
    "防火墙": "分布式防火墙，基于标签的规则"
  },
  "网络模式": {
    "auto": "自动模式，每个区域自动创建子网",
    "custom": "自定义模式，手动管理子网",
    "legacy": "传统模式，已弃用"
  }
}
```

## VPC架构设计

### 网络规划原则

#### CIDR块设计最佳实践
```bash
# GCP推荐的网络规划
企业级VPC规划:
  生产VPC:     10.0.0.0/8    (1600万个IP)
  测试VPC:     172.16.0.0/12 (100万个IP)
  开发VPC:     192.168.0.0/16 (65,536个IP)

区域子网规划示例:
  us-central1:   10.1.0.0/16   (65,536个IP)
  us-east1:      10.2.0.0/16   (65,536个IP)
  europe-west1:  10.3.0.0/16   (65,536个IP)
  asia-east1:    10.4.0.0/16   (65,536个IP)
```

#### 创建自定义VPC网络
```bash
# 创建自定义VPC网络
gcloud compute networks create production-vpc \
    --subnet-mode=custom \
    --description="Production VPC network"

# 创建子网
gcloud compute networks subnets create web-subnet \
    --network=production-vpc \
    --range=10.1.1.0/24 \
    --region=us-central1 \
    --enable-private-ip-google-access

gcloud compute networks subnets create app-subnet \
    --network=production-vpc \
    --range=10.1.2.0/24 \
    --region=us-central1 \
    --enable-private-ip-google-access

gcloud compute networks subnets create db-subnet \
    --network=production-vpc \
    --range=10.1.3.0/24 \
    --region=us-central1 \
    --enable-private-ip-google-access
```

### 多层网络架构设计

#### 三层网络架构
```yaml
GCP三层架构:
  Web层(公网访问):
    - 子网: web-subnet (10.1.1.0/24)
    - 实例: 前端服务器、负载均衡器
    - 标签: tier=web

  应用层(内网访问):
    - 子网: app-subnet (10.1.2.0/24)
    - 实例: 应用服务器、API服务
    - 标签: tier=app

  数据层(高安全):
    - 子网: db-subnet (10.1.3.0/24)
    - 实例: 数据库服务器、缓存
    - 标签: tier=database
```

#### 子网创建自动化脚本
```bash
#!/bin/bash
# GCP多层架构自动化部署脚本

PROJECT_ID="your-project-id"
NETWORK_NAME="production-vpc"
REGION="us-central1"

# 设置项目
gcloud config set project $PROJECT_ID

# 创建VPC网络
echo "创建VPC网络..."
gcloud compute networks create $NETWORK_NAME \
    --subnet-mode=custom \
    --description="Production multi-tier VPC"

# 创建Web层子网
echo "创建Web层子网..."
gcloud compute networks subnets create web-subnet \
    --network=$NETWORK_NAME \
    --range=10.1.1.0/24 \
    --region=$REGION \
    --enable-private-ip-google-access

# 创建应用层子网
echo "创建应用层子网..."
gcloud compute networks subnets create app-subnet \
    --network=$NETWORK_NAME \
    --range=10.1.2.0/24 \
    --region=$REGION \
    --enable-private-ip-google-access

# 创建数据层子网
echo "创建数据层子网..."
gcloud compute networks subnets create db-subnet \
    --network=$NETWORK_NAME \
    --range=10.1.3.0/24 \
    --region=$REGION \
    --enable-private-ip-google-access

# 创建管理子网
echo "创建管理子网..."
gcloud compute networks subnets create mgmt-subnet \
    --network=$NETWORK_NAME \
    --range=10.1.4.0/24 \
    --region=$REGION \
    --enable-private-ip-google-access

echo "VPC网络架构创建完成!"
```

## 路由和网关配置

### 默认路由和自定义路由
```bash
# 查看现有路由
gcloud compute routes list --filter="network:production-vpc"

# 创建自定义路由
gcloud compute routes create custom-route-to-onprem \
    --network=production-vpc \
    --destination-range=192.168.0.0/16 \
    --next-hop-vpn-tunnel=vpn-tunnel-1 \
    --priority=100

# 创建到Internet的默认路由
gcloud compute routes create default-internet-route \
    --network=production-vpc \
    --destination-range=0.0.0.0/0 \
    --next-hop-gateway=default-internet-gateway \
    --priority=1000
```

### Cloud NAT配置
```bash
# 创建Cloud Router
gcloud compute routers create nat-router \
    --network=production-vpc \
    --region=us-central1

# 创建Cloud NAT
gcloud compute routers nats create nat-gateway \
    --router=nat-router \
    --region=us-central1 \
    --nat-all-subnet-ip-ranges \
    --auto-allocate-nat-external-ips
```

### VPN Gateway配置
```bash
# 创建VPN Gateway
gcloud compute vpn-gateways create production-vpn-gateway \
    --network=production-vpc \
    --region=us-central1

# 创建VPN隧道
gcloud compute vpn-tunnels create tunnel-to-onprem \
    --vpn-gateway=production-vpn-gateway \
    --peer-address=203.0.113.1 \
    --shared-secret="your-shared-secret" \
    --ike-version=2 \
    --region=us-central1
```

## 防火墙和安全配置

### 防火墙规则设计

#### Web层防火墙规则
```bash
# 允许HTTP和HTTPS流量到Web层
gcloud compute firewall-rules create allow-web-traffic \
    --network=production-vpc \
    --action=allow \
    --direction=ingress \
    --rules=tcp:80,tcp:443 \
    --source-ranges=0.0.0.0/0 \
    --target-tags=web-tier

# 允许SSH访问（仅限特定IP）
gcloud compute firewall-rules create allow-ssh-from-mgmt \
    --network=production-vpc \
    --action=allow \
    --direction=ingress \
    --rules=tcp:22 \
    --source-ranges=203.0.113.0/24 \
    --target-tags=web-tier,app-tier,db-tier
```

#### 应用层防火墙规则
```bash
# 只允许来自Web层的流量
gcloud compute firewall-rules create allow-web-to-app \
    --network=production-vpc \
    --action=allow \
    --direction=ingress \
    --rules=tcp:8080 \
    --source-tags=web-tier \
    --target-tags=app-tier

# 允许应用层内部通信
gcloud compute firewall-rules create allow-app-internal \
    --network=production-vpc \
    --action=allow \
    --direction=ingress \
    --rules=tcp:8080-8090 \
    --source-tags=app-tier \
    --target-tags=app-tier
```

#### 数据库层防火墙规则
```bash
# 只允许来自应用层的数据库连接
gcloud compute firewall-rules create allow-app-to-db \
    --network=production-vpc \
    --action=allow \
    --direction=ingress \
    --rules=tcp:3306,tcp:5432 \
    --source-tags=app-tier \
    --target-tags=db-tier

# 数据库备份端口
gcloud compute firewall-rules create allow-db-backup \
    --network=production-vpc \
    --action=allow \
    --direction=ingress \
    --rules=tcp:3307 \
    --source-tags=backup-tier \
    --target-tags=db-tier
```

### 高级安全配置

#### 网络标签最佳实践
```yaml
标签策略:
  环境标签:
    - env=production
    - env=staging
    - env=development

  层级标签:
    - tier=web
    - tier=app
    - tier=database
    - tier=management

  功能标签:
    - role=frontend
    - role=backend
    - role=cache
    - role=monitoring
```

#### 组织级防火墙策略
```bash
# 创建组织级防火墙策略
gcloud compute org-security-policies create production-policy \
    --organization=123456789012 \
    --description="Production environment security policy"

# 添加拒绝所有规则（默认）
gcloud compute org-security-policies rules create 1000 \
    --security-policy=production-policy \
    --action=deny \
    --direction=ingress \
    --src-ip-ranges=0.0.0.0/0 \
    --organization=123456789012

# 允许特定服务
gcloud compute org-security-policies rules create 100 \
    --security-policy=production-policy \
    --action=allow \
    --direction=ingress \
    --src-ip-ranges=10.0.0.0/8 \
    --layer4-configs=tcp:80,tcp:443 \
    --organization=123456789012
```

## 负载均衡架构

### HTTP(S) Load Balancer
```bash
# 创建健康检查
gcloud compute health-checks create http web-health-check \
    --port=80 \
    --request-path=/health \
    --check-interval=30s \
    --timeout=10s \
    --healthy-threshold=2 \
    --unhealthy-threshold=3

# 创建实例组
gcloud compute instance-groups managed create web-instance-group \
    --base-instance-name=web-server \
    --template=web-server-template \
    --size=3 \
    --zone=us-central1-a

# 设置自动扩展
gcloud compute instance-groups managed set-autoscaling web-instance-group \
    --zone=us-central1-a \
    --max-num-replicas=10 \
    --min-num-replicas=3 \
    --target-cpu-utilization=0.7

# 创建后端服务
gcloud compute backend-services create web-backend-service \
    --protocol=HTTP \
    --health-checks=web-health-check \
    --global

# 添加后端
gcloud compute backend-services add-backend web-backend-service \
    --instance-group=web-instance-group \
    --instance-group-zone=us-central1-a \
    --global
```

### Network Load Balancer
```bash
# 创建目标池
gcloud compute target-pools create web-target-pool \
    --region=us-central1 \
    --health-check=web-health-check

# 添加实例到目标池
gcloud compute target-pools add-instances web-target-pool \
    --instances=web-server-1,web-server-2 \
    --zone=us-central1-a

# 创建转发规则
gcloud compute forwarding-rules create web-forwarding-rule \
    --region=us-central1 \
    --ports=80 \
    --target-pool=web-target-pool
```

### 内部负载均衡器
```bash
# 创建内部负载均衡器
gcloud compute backend-services create internal-backend-service \
    --protocol=TCP \
    --health-checks=app-health-check \
    --region=us-central1 \
    --load-balancing-scheme=INTERNAL

# 创建内部转发规则
gcloud compute forwarding-rules create internal-forwarding-rule \
    --region=us-central1 \
    --load-balancing-scheme=INTERNAL \
    --network=production-vpc \
    --subnet=app-subnet \
    --ports=8080 \
    --backend-service=internal-backend-service
```

## 网络监控和日志

### VPC Flow Logs
```bash
# 启用VPC Flow Logs
gcloud compute networks subnets update web-subnet \
    --region=us-central1 \
    --enable-flow-logs \
    --logging-flow-sampling=0.5 \
    --logging-aggregation-interval=interval-5-sec

# 配置日志元数据
gcloud compute networks subnets update app-subnet \
    --region=us-central1 \
    --enable-flow-logs \
    --logging-metadata=include-all
```

### Cloud Monitoring集成
```yaml
监控指标:
  网络指标:
    - compute.googleapis.com/instance/network/received_bytes_count
    - compute.googleapis.com/instance/network/sent_bytes_count
    - networking.googleapis.com/vpc_flow/rtt_msec

  负载均衡器指标:
    - loadbalancing.googleapis.com/https/request_count
    - loadbalancing.googleapis.com/https/backend_latencies
    - loadbalancing.googleapis.com/https/total_latencies

  防火墙指标:
    - firewallinsights.googleapis.com/subnet/firewall_hit_count
    - firewallinsights.googleapis.com/vm/firewall_hit_count
```

### 监控配置脚本
```python
from google.cloud import monitoring_v3
import time

def create_network_monitoring():
    """创建网络监控配置"""
    client = monitoring_v3.MetricServiceClient()
    project_name = f"projects/{PROJECT_ID}"

    # 创建自定义指标
    descriptor = monitoring_v3.MetricDescriptor()
    descriptor.type = "custom.googleapis.com/network/connection_count"
    descriptor.metric_kind = monitoring_v3.MetricDescriptor.MetricKind.GAUGE
    descriptor.value_type = monitoring_v3.MetricDescriptor.ValueType.INT64
    descriptor.description = "Number of active network connections"

    descriptor = client.create_metric_descriptor(
        name=project_name, metric_descriptor=descriptor
    )
    print(f"Created metric descriptor: {descriptor.name}")

    # 创建告警策略
    alert_client = monitoring_v3.AlertPolicyServiceClient()

    policy = monitoring_v3.AlertPolicy()
    policy.display_name = "High Network Traffic Alert"
    policy.documentation.content = "Network traffic is unusually high"

    condition = monitoring_v3.AlertPolicy.Condition()
    condition.display_name = "Network bytes received condition"
    condition.condition_threshold.filter = 'resource.type="gce_instance"'
    condition.condition_threshold.comparison = monitoring_v3.ComparisonType.COMPARISON_GREATER_THAN
    condition.condition_threshold.threshold_value.double_value = 1000000  # 1MB/s

    policy.conditions.append(condition)

    policy = alert_client.create_alert_policy(
        name=project_name, alert_policy=policy
    )
    print(f"Created alert policy: {policy.name}")

if __name__ == "__main__":
    PROJECT_ID = "your-project-id"
    create_network_monitoring()
```

## 故障排除和诊断

### 网络连通性测试
```bash
# 使用gcloud进行连通性测试
gcloud compute networks connectivity-tests create web-to-db-test \
    --source-instance=web-server-1 \
    --source-instance-zone=us-central1-a \
    --destination-instance=db-server-1 \
    --destination-instance-zone=us-central1-a \
    --destination-port=3306 \
    --protocol=TCP

# 运行测试
gcloud compute networks connectivity-tests run web-to-db-test

# 查看测试结果
gcloud compute networks connectivity-tests describe web-to-db-test
```

### 网络诊断工具
```bash
#!/bin/bash
# GCP网络诊断脚本

echo "=== GCP网络诊断工具 ==="

# 检查VPC网络
echo "检查VPC网络..."
gcloud compute networks list

# 检查子网
echo "检查子网..."
gcloud compute networks subnets list

# 检查防火墙规则
echo "检查防火墙规则..."
gcloud compute firewall-rules list --sort-by=priority

# 检查路由
echo "检查路由表..."
gcloud compute routes list

# 检查负载均衡器
echo "检查负载均衡器..."
gcloud compute backend-services list
gcloud compute forwarding-rules list

# 检查健康检查
echo "检查健康检查..."
gcloud compute health-checks list

# 检查实例网络信息
echo "检查实例网络接口..."
gcloud compute instances list --format="table(name,zone,machineType,status,networkInterfaces[].accessConfigs[0].natIP:label=EXTERNAL_IP,networkInterfaces[].networkIP:label=INTERNAL_IP)"
```

### Performance Diagnostics
```python
import subprocess
import json
from google.cloud import compute_v1

def diagnose_network_performance():
    """网络性能诊断"""

    # 获取实例信息
    instances_client = compute_v1.InstancesClient()
    project = "your-project-id"
    zone = "us-central1-a"

    instances = instances_client.list(project=project, zone=zone)

    for instance in instances:
        print(f"诊断实例: {instance.name}")

        # 检查网络接口
        for interface in instance.network_interfaces:
            print(f"  网络: {interface.network}")
            print(f"  子网: {interface.subnetwork}")
            print(f"  内部IP: {interface.network_i_p}")

            if interface.access_configs:
                for config in interface.access_configs:
                    print(f"  外部IP: {config.nat_i_p}")

        # 获取监控数据
        get_instance_metrics(instance.name, zone)

def get_instance_metrics(instance_name, zone):
    """获取实例网络指标"""
    from google.cloud import monitoring_v3
    from datetime import datetime, timedelta

    client = monitoring_v3.MetricServiceClient()
    project_name = f"projects/{PROJECT_ID}"

    now = datetime.utcnow()
    start_time = now - timedelta(hours=1)

    interval = monitoring_v3.TimeInterval()
    interval.end_time.seconds = int(now.timestamp())
    interval.start_time.seconds = int(start_time.timestamp())

    filter_str = f'resource.type="gce_instance" AND resource.labels.instance_name="{instance_name}"'

    # 网络接收字节数
    request = monitoring_v3.ListTimeSeriesRequest(
        name=project_name,
        filter=f'{filter_str} AND metric.type="compute.googleapis.com/instance/network/received_bytes_count"',
        interval=interval,
        view=monitoring_v3.ListTimeSeriesRequest.TimeSeriesView.FULL
    )

    results = client.list_time_series(request=request)

    for result in results:
        print(f"  网络接收: {result.metric.type}")
        for point in result.points:
            print(f"    值: {point.value.int64_value} 字节")

if __name__ == "__main__":
    PROJECT_ID = "your-project-id"
    diagnose_network_performance()
```

## 私有Google访问和服务控制

### Private Google Access
```bash
# 启用私有Google访问
gcloud compute networks subnets update app-subnet \
    --region=us-central1 \
    --enable-private-ip-google-access

# 创建私有区域
gcloud dns managed-zones create private-zone \
    --description="Private zone for internal services" \
    --dns-name=internal.example.com \
    --networks=production-vpc \
    --visibility=private
```

### VPC Service Controls
```bash
# 创建访问策略
gcloud access-context-manager policies create \
    --title="Production Access Policy" \
    --organization=123456789012

# 创建服务边界
gcloud access-context-manager perimeters create production-perimeter \
    --policy=POLICY_ID \
    --title="Production Service Perimeter" \
    --resources=projects/PROJECT_ID \
    --restricted-services=storage.googleapis.com,bigquery.googleapis.com
```

## 成本优化策略

### 网络成本分析
```yaml
成本优化要点:
  1. 网络层级选择:
     Premium Tier: 高性能，全球优化路由
     Standard Tier: 标准性能，区域路由

  2. 数据传输优化:
     - 同区域传输免费
     - 使用CDN减少出站流量
     - 合理配置负载均衡器

  3. 资源清理:
     - 删除未使用的外部IP
     - 清理无效的防火墙规则
     - 优化负载均衡器配置
```

### 成本监控脚本
```python
from google.cloud import billing_v1
from google.cloud import asset_v1
import pandas as pd

def analyze_network_costs():
    """分析网络相关成本"""

    # 成本分析客户端
    billing_client = billing_v1.CloudBillingClient()

    # 资产分析客户端
    asset_client = asset_v1.AssetServiceClient()

    project_id = "your-project-id"

    # 获取网络资源
    assets = asset_client.list_assets(
        request={
            "parent": f"projects/{project_id}",
            "asset_types": [
                "compute.googleapis.com/Network",
                "compute.googleapis.com/Subnetwork",
                "compute.googleapis.com/ForwardingRule",
                "compute.googleapis.com/Address"
            ]
        }
    )

    network_resources = []
    for asset in assets:
        resource_data = {
            "name": asset.name,
            "type": asset.asset_type,
            "location": asset.resource.location if asset.resource else "global"
        }
        network_resources.append(resource_data)

    # 分析结果
    df = pd.DataFrame(network_resources)
    print("网络资源统计:")
    print(df.groupby(['type', 'location']).size().reset_index(name='count'))

    # 识别优化机会
    identify_optimization_opportunities(df)

def identify_optimization_opportunities(df):
    """识别成本优化机会"""

    print("\n成本优化建议:")

    # 检查未使用的外部IP
    external_ips = df[df['type'] == 'compute.googleapis.com/Address']
    if not external_ips.empty:
        print(f"- 发现 {len(external_ips)} 个外部IP地址，检查是否都在使用")

    # 检查负载均衡器
    forwarding_rules = df[df['type'] == 'compute.googleapis.com/ForwardingRule']
    if not forwarding_rules.empty:
        print(f"- 发现 {len(forwarding_rules)} 个转发规则，验证配置是否优化")

    # 区域分布分析
    regional_dist = df['location'].value_counts()
    print(f"- 资源分布在 {len(regional_dist)} 个位置，考虑整合到较少区域")

if __name__ == "__main__":
    analyze_network_costs()
```

## Infrastructure as Code

### Terraform配置
```hcl
# variables.tf
variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# VPC网络
resource "google_compute_network" "vpc" {
  name                    = "${var.environment}-vpc"
  auto_create_subnetworks = false
  routing_mode           = "GLOBAL"
  description            = "VPC for ${var.environment} environment"
}

# 子网
resource "google_compute_subnetwork" "web_subnet" {
  name          = "${var.environment}-web-subnet"
  ip_cidr_range = "10.1.1.0/24"
  region        = var.region
  network       = google_compute_network.vpc.id

  enable_private_ip_google_access = true

  log_config {
    aggregation_interval = "INTERVAL_10_MIN"
    flow_sampling        = 0.5
    metadata            = "INCLUDE_ALL_METADATA"
  }
}

resource "google_compute_subnetwork" "app_subnet" {
  name          = "${var.environment}-app-subnet"
  ip_cidr_range = "10.1.2.0/24"
  region        = var.region
  network       = google_compute_network.vpc.id

  enable_private_ip_google_access = true
}

resource "google_compute_subnetwork" "db_subnet" {
  name          = "${var.environment}-db-subnet"
  ip_cidr_range = "10.1.3.0/24"
  region        = var.region
  network       = google_compute_network.vpc.id

  enable_private_ip_google_access = true
}

# 防火墙规则
resource "google_compute_firewall" "allow_web_traffic" {
  name    = "${var.environment}-allow-web-traffic"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["web-tier"]
}

resource "google_compute_firewall" "allow_ssh" {
  name    = "${var.environment}-allow-ssh"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["203.0.113.0/24"]  # 管理网络
  target_tags   = ["web-tier", "app-tier", "db-tier"]
}

resource "google_compute_firewall" "allow_web_to_app" {
  name    = "${var.environment}-allow-web-to-app"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = ["8080"]
  }

  source_tags = ["web-tier"]
  target_tags = ["app-tier"]
}

resource "google_compute_firewall" "allow_app_to_db" {
  name    = "${var.environment}-allow-app-to-db"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = ["3306", "5432"]
  }

  source_tags = ["app-tier"]
  target_tags = ["db-tier"]
}

# Cloud Router和NAT
resource "google_compute_router" "router" {
  name    = "${var.environment}-router"
  region  = var.region
  network = google_compute_network.vpc.id
}

resource "google_compute_router_nat" "nat" {
  name   = "${var.environment}-nat"
  router = google_compute_router.router.name
  region = var.region

  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

  log_config {
    enable = true
    filter = "ERRORS_ONLY"
  }
}

# 负载均衡器
resource "google_compute_health_check" "web_health_check" {
  name = "${var.environment}-web-health-check"

  http_health_check {
    port         = 80
    request_path = "/health"
  }

  check_interval_sec  = 30
  timeout_sec         = 10
  healthy_threshold   = 2
  unhealthy_threshold = 3
}

resource "google_compute_backend_service" "web_backend" {
  name                  = "${var.environment}-web-backend"
  protocol              = "HTTP"
  timeout_sec           = 30
  enable_cdn           = true
  load_balancing_scheme = "EXTERNAL_MANAGED"

  health_checks = [google_compute_health_check.web_health_check.id]

  backend {
    group           = google_compute_instance_group_manager.web_igm.instance_group
    balancing_mode  = "UTILIZATION"
    capacity_scaler = 1.0
  }

  log_config {
    enable      = true
    sample_rate = 1.0
  }
}

# outputs.tf
output "vpc_id" {
  description = "The ID of the VPC"
  value       = google_compute_network.vpc.id
}

output "vpc_name" {
  description = "The name of the VPC"
  value       = google_compute_network.vpc.name
}

output "web_subnet_id" {
  description = "The ID of the web subnet"
  value       = google_compute_subnetwork.web_subnet.id
}

output "app_subnet_id" {
  description = "The ID of the app subnet"
  value       = google_compute_subnetwork.app_subnet.id
}

output "db_subnet_id" {
  description = "The ID of the database subnet"
  value       = google_compute_subnetwork.db_subnet.id
}
```

### Deployment Manager配置
```yaml
# network-template.yaml
resources:
- name: production-vpc
  type: compute.v1.network
  properties:
    autoCreateSubnetworks: false
    routingConfig:
      routingMode: GLOBAL

- name: web-subnet
  type: compute.v1.subnetwork
  properties:
    network: $(ref.production-vpc.selfLink)
    ipCidrRange: 10.1.1.0/24
    region: us-central1
    enablePrivateIpGoogleAccess: true
    logConfig:
      enable: true
      aggregationInterval: INTERVAL_10_MIN
      flowSampling: 0.5

- name: allow-web-traffic
  type: compute.v1.firewall
  properties:
    network: $(ref.production-vpc.selfLink)
    allowed:
    - IPProtocol: TCP
      ports: ["80", "443"]
    sourceRanges: ["0.0.0.0/0"]
    targetTags: ["web-tier"]

- name: cloud-router
  type: compute.v1.router
  properties:
    network: $(ref.production-vpc.selfLink)
    region: us-central1

- name: cloud-nat
  type: compute.v1.router.nat
  properties:
    router: $(ref.cloud-router.selfLink)
    natIpAllocateOption: AUTO_ONLY
    sourceSubnetworkIpRangesToNat: ALL_SUBNETWORKS_ALL_IP_RANGES
```

## 网络安全最佳实践

### 零信任网络架构
```yaml
零信任原则:
  1. 验证身份:
     - 使用IAM和服务账号
     - 启用多因子认证
     - 定期轮换密钥

  2. 设备安全:
     - 使用安全的镜像
     - 启用OS Login
     - 定期更新补丁

  3. 网络分段:
     - 最小权限防火墙规则
     - 使用标签进行访问控制
     - 网络监控和日志

  4. 数据保护:
     - 传输中加密(TLS)
     - 静态数据加密
     - 密钥管理服务
```

### 安全配置检查脚本
```python
from google.cloud import compute_v1
import json

def security_audit():
    """安全配置审计"""

    compute_client = compute_v1.FirewallsClient()
    project_id = "your-project-id"

    # 检查防火墙规则
    print("=== 防火墙安全审计 ===")

    firewalls = compute_client.list(project=project_id)

    security_issues = []

    for firewall in firewalls:
        # 检查过于宽泛的规则
        if firewall.source_ranges and "0.0.0.0/0" in firewall.source_ranges:
            if any(rule.I_p_protocol == "tcp" and "22" in rule.ports for rule in firewall.allowed):
                security_issues.append({
                    "rule": firewall.name,
                    "issue": "SSH访问对所有IP开放",
                    "severity": "HIGH"
                })

        # 检查未使用的规则
        if not firewall.target_tags and not firewall.target_service_accounts:
            security_issues.append({
                "rule": firewall.name,
                "issue": "防火墙规则没有明确的目标",
                "severity": "MEDIUM"
            })

    # 输出审计结果
    if security_issues:
        print("发现以下安全问题:")
        for issue in security_issues:
            print(f"- {issue['rule']}: {issue['issue']} (严重性: {issue['severity']})")
    else:
        print("未发现明显的安全问题")

    return security_issues

def recommend_security_improvements():
    """安全改进建议"""

    recommendations = [
        "启用VPC Flow Logs进行网络监控",
        "使用私有Google访问减少外部暴露",
        "实施网络标签策略进行精细化访问控制",
        "配置Cloud Armor防护Web应用",
        "启用Binary Authorization确保容器安全",
        "使用VPC Service Controls保护敏感服务"
    ]

    print("\n=== 安全改进建议 ===")
    for i, rec in enumerate(recommendations, 1):
        print(f"{i}. {rec}")

if __name__ == "__main__":
    security_audit()
    recommend_security_improvements()
```

## 混合云连接

### Cloud Interconnect
```bash
# 创建Interconnect连接
gcloud compute interconnects create my-interconnect \
    --customer-name="Example Corp" \
    --interconnect-type=DEDICATED \
    --link-type=LINK_TYPE_ETHERNET_10G_LR \
    --location=los-zone1-1 \
    --requested-link-count=1

# 创建VLAN附件
gcloud compute interconnects attachments create my-attachment \
    --interconnect=my-interconnect \
    --vlan=100 \
    --region=us-central1
```

### Cloud VPN
```bash
# 创建经典VPN网关
gcloud compute vpn-gateways create production-vpn \
    --network=production-vpc \
    --region=us-central1

# 创建高可用VPN
gcloud compute vpn-gateways create ha-vpn-gateway \
    --network=production-vpc \
    --region=us-central1 \
    --stack-type=IPV4_ONLY

# 创建外部VPN网关
gcloud compute external-vpn-gateways create peer-gateway \
    --interfaces=0=203.0.113.1

# 创建VPN隧道
gcloud compute vpn-tunnels create tunnel-1 \
    --vpn-gateway=ha-vpn-gateway \
    --vpn-gateway-interface=0 \
    --peer-external-gateway=peer-gateway \
    --peer-external-gateway-interface=0 \
    --shared-secret="your-shared-secret" \
    --router=production-router \
    --region=us-central1
```

## 总结

Google Cloud Platform提供了功能强大且灵活的网络服务，通过合理的架构设计和配置管理，可以构建出安全、高性能、经济高效的云网络基础设施。

### 关键要点

1. **网络架构设计**：
   - 采用全球VPC提供统一的网络视图
   - 使用区域子网实现高可用性
   - 通过标签实现精细化访问控制

2. **安全最佳实践**：
   - 实施深度防御策略
   - 使用VPC Service Controls保护敏感数据
   - 启用全面的审计和监控

3. **性能优化**：
   - 选择合适的网络层级
   - 优化负载均衡器配置
   - 使用CDN和缓存策略

4. **成本管理**：
   - 监控网络使用情况和成本
   - 定期清理未使用的资源
   - 选择合适的服务层级

5. **自动化运维**：
   - 使用Infrastructure as Code
   - 实施配置管理和版本控制
   - 建立监控和告警机制

掌握这些概念和最佳实践，将帮助您在Google Cloud Platform上构建出现代化、安全、可扩展的网络架构。

---

*本文为GCP网络架构管理指南，建议结合实际项目需求和Google Cloud最新文档进行实践。如有技术问题，欢迎交流讨论。*