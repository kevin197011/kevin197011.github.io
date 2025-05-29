---
layout: post
title: "Azure云网络架构与管理实战指南"
excerpt: "深入解析微软Azure网络架构设计，从虚拟网络规划到网络安全组配置，包含完整的云网络最佳实践和故障排除方案。"
date: 2024-12-31
category: DevOps
tags: [Azure, 微软云, 网络架构, Virtual Network, NSG, 负载均衡, 云原生]
author: Kk
---

# Azure云网络架构与管理实战指南

## Azure网络基础概念

### 全球基础设施

Azure提供覆盖全球的云计算基础设施：

```yaml
Azure全球架构:
  地理区域(Geographies): 全球多个地理区域
  区域(Regions): 60+个Azure区域
  可用性区域(AZs): 3+个可用性区域/区域
  边缘位置(Edge): 200+个CDN边缘节点
  网络骨干: 微软全球网络骨干
  连通性: ExpressRoute全球连接
```

#### 区域和可用性区域查询
```bash
# 安装Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# 登录Azure
az login

# 查看所有区域
az account list-locations --output table

# 查看指定区域的可用性区域
az vm list-skus --location eastus --zone --output table

# 查看网络服务可用性
az network list-service-tags --location eastus
```

### 核心网络组件

#### Virtual Network (VNet)
```json
{
  "VNet特性": {
    "网络隔离": "基于软件定义网络的隔离",
    "地址空间": "支持RFC1918私有地址空间",
    "子网划分": "灵活的子网配置和路由",
    "跨区域": "支持VNet对等连接"
  },
  "网络模式": {
    "经典部署": "经典虚拟网络（已弃用）",
    "资源管理器": "ARM模式虚拟网络（推荐）",
    "混合网络": "与本地数据中心连接"
  }
}
```

## Virtual Network架构设计

### 网络规划原则

#### CIDR块设计最佳实践
```bash
# Azure推荐的网络规划
企业级VNet规划:
  生产VNet:    10.0.0.0/8     (1600万个IP)
  测试VNet:    172.16.0.0/12  (100万个IP)
  开发VNet:    192.168.0.0/16 (65,536个IP)

多可用性区域子网规划:
  Zone 1: 10.1.0.0/16  (65,536个IP)
  Zone 2: 10.2.0.0/16  (65,536个IP)
  Zone 3: 10.3.0.0/16  (65,536个IP)
```

#### 创建VNet和子网
```bash
# 创建资源组
az group create \
    --name production-rg \
    --location eastus

# 创建虚拟网络
az network vnet create \
    --resource-group production-rg \
    --name production-vnet \
    --address-prefix 10.0.0.0/16 \
    --location eastus

# 创建Web层子网
az network vnet subnet create \
    --resource-group production-rg \
    --vnet-name production-vnet \
    --name web-subnet \
    --address-prefix 10.0.1.0/24

# 创建应用层子网
az network vnet subnet create \
    --resource-group production-rg \
    --vnet-name production-vnet \
    --name app-subnet \
    --address-prefix 10.0.2.0/24

# 创建数据层子网
az network vnet subnet create \
    --resource-group production-rg \
    --vnet-name production-vnet \
    --name db-subnet \
    --address-prefix 10.0.3.0/24
```

### 多层网络架构设计

#### 三层网络架构
```yaml
Azure三层架构:
  Web层(DMZ):
    - 子网: web-subnet (10.0.1.0/24)
    - 组件: Application Gateway, Web服务器
    - NSG: web-nsg

  应用层(内网):
    - 子网: app-subnet (10.0.2.0/24)
    - 组件: 应用服务器, API管理
    - NSG: app-nsg

  数据层(高安全):
    - 子网: db-subnet (10.0.3.0/24)
    - 组件: SQL数据库, 存储账户
    - NSG: db-nsg
```

#### 自动化部署脚本
```bash
#!/bin/bash
# Azure多层架构自动化部署脚本

RESOURCE_GROUP="production-rg"
LOCATION="eastus"
VNET_NAME="production-vnet"
VNET_CIDR="10.0.0.0/16"

# 创建资源组
echo "创建资源组..."
az group create \
    --name $RESOURCE_GROUP \
    --location $LOCATION

# 创建虚拟网络
echo "创建虚拟网络..."
az network vnet create \
    --resource-group $RESOURCE_GROUP \
    --name $VNET_NAME \
    --address-prefix $VNET_CIDR \
    --location $LOCATION

# 创建Web层子网
echo "创建Web层子网..."
az network vnet subnet create \
    --resource-group $RESOURCE_GROUP \
    --vnet-name $VNET_NAME \
    --name web-subnet \
    --address-prefix 10.0.1.0/24

# 创建应用层子网
echo "创建应用层子网..."
az network vnet subnet create \
    --resource-group $RESOURCE_GROUP \
    --vnet-name $VNET_NAME \
    --name app-subnet \
    --address-prefix 10.0.2.0/24

# 创建数据库层子网
echo "创建数据库层子网..."
az network vnet subnet create \
    --resource-group $RESOURCE_GROUP \
    --vnet-name $VNET_NAME \
    --name db-subnet \
    --address-prefix 10.0.3.0/24

echo "网络架构创建完成!"
echo "资源组: $RESOURCE_GROUP"
echo "虚拟网络: $VNET_NAME"
echo "Web子网: web-subnet"
echo "应用子网: app-subnet"
echo "数据库子网: db-subnet"
```

## 路由和网关配置

### 路由表配置
```bash
# 创建自定义路由表
az network route-table create \
    --resource-group production-rg \
    --name custom-route-table \
    --location eastus

# 添加自定义路由
az network route-table route create \
    --resource-group production-rg \
    --route-table-name custom-route-table \
    --name to-onprem \
    --address-prefix 192.168.0.0/16 \
    --next-hop-type VirtualNetworkGateway

# 将路由表关联到子网
az network vnet subnet update \
    --resource-group production-rg \
    --vnet-name production-vnet \
    --name app-subnet \
    --route-table custom-route-table
```

### NAT Gateway配置
```bash
# 创建公共IP
az network public-ip create \
    --resource-group production-rg \
    --name nat-gateway-ip \
    --sku Standard \
    --allocation-method Static

# 创建NAT网关
az network nat gateway create \
    --resource-group production-rg \
    --name production-nat \
    --public-ip-addresses nat-gateway-ip \
    --idle-timeout 10 \
    --location eastus

# 将NAT网关关联到子网
az network vnet subnet update \
    --resource-group production-rg \
    --vnet-name production-vnet \
    --name app-subnet \
    --nat-gateway production-nat
```

### VPN Gateway配置
```bash
# 创建网关子网
az network vnet subnet create \
    --resource-group production-rg \
    --vnet-name production-vnet \
    --name GatewaySubnet \
    --address-prefix 10.0.255.0/27

# 创建公共IP for VPN Gateway
az network public-ip create \
    --resource-group production-rg \
    --name vpn-gateway-ip \
    --allocation-method Dynamic

# 创建VPN网关
az network vnet-gateway create \
    --resource-group production-rg \
    --name production-vpn \
    --public-ip-address vpn-gateway-ip \
    --vnet production-vnet \
    --gateway-type Vpn \
    --vpn-type RouteBased \
    --sku VpnGw1 \
    --no-wait

# 创建本地网关
az network local-gateway create \
    --resource-group production-rg \
    --name onprem-gateway \
    --gateway-ip-address 203.0.113.1 \
    --local-address-prefixes 192.168.0.0/16

# 创建VPN连接
az network vpn-connection create \
    --resource-group production-rg \
    --name vpn-to-onprem \
    --vnet-gateway1 production-vpn \
    --local-gateway2 onprem-gateway \
    --shared-key "YourSharedKey123!"
```

## 网络安全组和访问控制

### NSG规则设计

#### Web层网络安全组
```bash
# 创建Web层NSG
az network nsg create \
    --resource-group production-rg \
    --name web-nsg \
    --location eastus

# 允许HTTP流量
az network nsg rule create \
    --resource-group production-rg \
    --nsg-name web-nsg \
    --name allow-http \
    --protocol Tcp \
    --priority 100 \
    --destination-port-range 80 \
    --source-address-prefix "*" \
    --destination-address-prefix "*" \
    --access Allow \
    --direction Inbound

# 允许HTTPS流量
az network nsg rule create \
    --resource-group production-rg \
    --nsg-name web-nsg \
    --name allow-https \
    --protocol Tcp \
    --priority 110 \
    --destination-port-range 443 \
    --source-address-prefix "*" \
    --destination-address-prefix "*" \
    --access Allow \
    --direction Inbound

# 允许SSH访问（限制源IP）
az network nsg rule create \
    --resource-group production-rg \
    --nsg-name web-nsg \
    --name allow-ssh \
    --protocol Tcp \
    --priority 120 \
    --destination-port-range 22 \
    --source-address-prefix "203.0.113.0/24" \
    --destination-address-prefix "*" \
    --access Allow \
    --direction Inbound

# 关联NSG到Web子网
az network vnet subnet update \
    --resource-group production-rg \
    --vnet-name production-vnet \
    --name web-subnet \
    --network-security-group web-nsg
```

#### 应用层网络安全组
```bash
# 创建应用层NSG
az network nsg create \
    --resource-group production-rg \
    --name app-nsg \
    --location eastus

# 只允许来自Web层的访问
az network nsg rule create \
    --resource-group production-rg \
    --nsg-name app-nsg \
    --name allow-from-web \
    --protocol Tcp \
    --priority 100 \
    --destination-port-range 8080 \
    --source-address-prefix "10.0.1.0/24" \
    --destination-address-prefix "*" \
    --access Allow \
    --direction Inbound

# 关联NSG到应用子网
az network vnet subnet update \
    --resource-group production-rg \
    --vnet-name production-vnet \
    --name app-subnet \
    --network-security-group app-nsg
```

#### 数据库层网络安全组
```bash
# 创建数据库层NSG
az network nsg create \
    --resource-group production-rg \
    --name db-nsg \
    --location eastus

# 只允许来自应用层的数据库连接
az network nsg rule create \
    --resource-group production-rg \
    --nsg-name db-nsg \
    --name allow-sql-from-app \
    --protocol Tcp \
    --priority 100 \
    --destination-port-range 1433 \
    --source-address-prefix "10.0.2.0/24" \
    --destination-address-prefix "*" \
    --access Allow \
    --direction Inbound

# 关联NSG到数据库子网
az network vnet subnet update \
    --resource-group production-rg \
    --vnet-name production-vnet \
    --name db-subnet \
    --network-security-group db-nsg
```

## 负载均衡架构

### Application Gateway

#### 创建Application Gateway
```bash
# 创建Application Gateway子网
az network vnet subnet create \
    --resource-group production-rg \
    --vnet-name production-vnet \
    --name appgw-subnet \
    --address-prefix 10.0.4.0/24

# 创建公共IP for Application Gateway
az network public-ip create \
    --resource-group production-rg \
    --name appgw-ip \
    --allocation-method Static \
    --sku Standard

# 创建Application Gateway
az network application-gateway create \
    --resource-group production-rg \
    --name production-appgw \
    --location eastus \
    --vnet-name production-vnet \
    --subnet appgw-subnet \
    --capacity 2 \
    --sku Standard_v2 \
    --http-settings-cookie-based-affinity Disabled \
    --frontend-port 80 \
    --http-settings-port 80 \
    --http-settings-protocol Http \
    --public-ip-address appgw-ip
```

### Azure Load Balancer

#### 标准负载均衡器
```bash
# 创建公共IP for Load Balancer
az network public-ip create \
    --resource-group production-rg \
    --name lb-ip \
    --sku Standard \
    --allocation-method Static

# 创建负载均衡器
az network lb create \
    --resource-group production-rg \
    --name production-lb \
    --sku Standard \
    --public-ip-address lb-ip \
    --frontend-ip-name LoadBalancerFrontEnd \
    --backend-pool-name LoadBalancerBackEndPool

# 创建健康探测
az network lb probe create \
    --resource-group production-rg \
    --lb-name production-lb \
    --name health-probe \
    --protocol tcp \
    --port 80

# 创建负载均衡规则
az network lb rule create \
    --resource-group production-rg \
    --lb-name production-lb \
    --name web-rule \
    --protocol tcp \
    --frontend-port 80 \
    --backend-port 80 \
    --frontend-ip-name LoadBalancerFrontEnd \
    --backend-pool-name LoadBalancerBackEndPool \
    --probe-name health-probe
```

#### 内部负载均衡器
```bash
# 创建内部负载均衡器
az network lb create \
    --resource-group production-rg \
    --name internal-lb \
    --sku Standard \
    --vnet-name production-vnet \
    --subnet app-subnet \
    --frontend-ip-name InternalFrontEnd \
    --backend-pool-name InternalBackEndPool \
    --private-ip-address 10.0.2.10
```

## 网络监控和日志

### NSG流日志
```bash
# 创建存储账户
az storage account create \
    --resource-group production-rg \
    --name nsgflowlogs$RANDOM \
    --location eastus \
    --sku Standard_LRS

# 启用NSG流日志
az network watcher flow-log create \
    --resource-group production-rg \
    --name web-nsg-flow-log \
    --nsg web-nsg \
    --storage-account nsgflowlogsxxxxxx \
    --enabled true \
    --retention 7 \
    --format JSON \
    --log-version 2
```

### Azure Monitor集成
```yaml
监控指标:
  网络指标:
    - BytesInDDoS: DDoS字节数
    - PacketsInDDoS: DDoS包数
    - BytesDroppedDDoS: DDoS丢弃字节数
    - TCPBytesInDDoS: TCP DDoS字节数

  虚拟机网络指标:
    - NetworkInTotal: 网络总入流量
    - NetworkOutTotal: 网络总出流量
    - NetworkPacketsInTotal: 网络总入包数
    - NetworkPacketsOutTotal: 网络总出包数

  负载均衡器指标:
    - DataPathAvailability: 数据路径可用性
    - HealthProbeStatus: 健康探测状态
    - PacketCount: 数据包计数
    - ByteCount: 字节计数
```

### 监控配置脚本
```python
#!/usr/bin/env python3
from azure.identity import AzureCliCredential
from azure.mgmt.monitor import MonitorManagementClient
from azure.mgmt.network import NetworkManagementClient
import json

def create_network_monitoring():
    """创建网络监控配置"""

    # 初始化认证和客户端
    credential = AzureCliCredential()
    subscription_id = "your-subscription-id"

    monitor_client = MonitorManagementClient(credential, subscription_id)
    network_client = NetworkManagementClient(credential, subscription_id)

    # 创建指标警报
    alert_rule = {
        "location": "eastus",
        "properties": {
            "description": "High network utilization alert",
            "severity": 2,
            "enabled": True,
            "scopes": [
                "/subscriptions/{}/resourceGroups/production-rg/providers/Microsoft.Network/loadBalancers/production-lb".format(subscription_id)
            ],
            "evaluationFrequency": "PT1M",
            "windowSize": "PT5M",
            "criteria": {
                "odata.type": "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria",
                "allOf": [
                    {
                        "name": "High_Network_In",
                        "metricName": "ByteCount",
                        "operator": "GreaterThan",
                        "threshold": 1000000000,
                        "timeAggregation": "Average"
                    }
                ]
            },
            "actions": [{
                "actionGroupId": "/subscriptions/{}/resourceGroups/production-rg/providers/microsoft.insights/actionGroups/network-alerts".format(subscription_id)
            }]
        }
    }

    print("网络监控警报已配置")

if __name__ == "__main__":
    create_network_monitoring()
```

## 故障排除和诊断

### 网络连接故障排除
```bash
# 创建连接监视器
az network watcher connection-monitor create \
    --resource-group production-rg \
    --name web-to-db-monitor \
    --source-resource /subscriptions/sub-id/resourceGroups/production-rg/providers/Microsoft.Compute/virtualMachines/web-vm \
    --dest-resource /subscriptions/sub-id/resourceGroups/production-rg/providers/Microsoft.Compute/virtualMachines/db-vm \
    --dest-port 1433

# 执行连接检查
az network watcher test-connectivity \
    --resource-group production-rg \
    --source-resource web-vm \
    --dest-resource db-vm \
    --dest-port 1433 \
    --protocol Tcp
```

### 网络诊断工具
```bash
#!/bin/bash
# Azure网络诊断脚本

echo "=== Azure网络诊断工具 ==="

# 检查虚拟网络
echo "检查虚拟网络..."
az network vnet list --resource-group production-rg --output table

# 检查子网
echo "检查子网..."
az network vnet subnet list --resource-group production-rg --vnet-name production-vnet --output table

# 检查网络安全组
echo "检查网络安全组..."
az network nsg list --resource-group production-rg --output table

# 检查路由表
echo "检查路由表..."
az network route-table list --resource-group production-rg --output table

# 检查负载均衡器
echo "检查负载均衡器..."
az network lb list --resource-group production-rg --output table

# 检查虚拟机网络接口
echo "检查网络接口..."
az network nic list --resource-group production-rg --output table
```

### 性能诊断脚本
```python
#!/usr/bin/env python3
from azure.identity import AzureCliCredential
from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.compute import ComputeManagementClient
import json

def diagnose_network_performance():
    """网络性能诊断"""

    credential = AzureCliCredential()
    subscription_id = "your-subscription-id"
    resource_group = "production-rg"

    network_client = NetworkManagementClient(credential, subscription_id)
    compute_client = ComputeManagementClient(credential, subscription_id)

    # 获取虚拟网络信息
    vnets = network_client.virtual_networks.list(resource_group)

    for vnet in vnets:
        print(f"诊断虚拟网络: {vnet.name}")
        print(f"  地址空间: {vnet.address_space.address_prefixes}")
        print(f"  位置: {vnet.location}")

        # 获取子网信息
        for subnet in vnet.subnets:
            print(f"  子网: {subnet.name}")
            print(f"    地址前缀: {subnet.address_prefix}")

            if subnet.network_security_group:
                nsg_name = subnet.network_security_group.id.split('/')[-1]
                print(f"    关联NSG: {nsg_name}")

    # 获取虚拟机网络性能
    vms = compute_client.virtual_machines.list(resource_group)

    for vm in vms:
        print(f"\n诊断虚拟机: {vm.name}")

        # 获取网络接口
        for nic_ref in vm.network_profile.network_interfaces:
            nic_name = nic_ref.id.split('/')[-1]
            nic = network_client.network_interfaces.get(resource_group, nic_name)

            print(f"  网络接口: {nic.name}")

            for ip_config in nic.ip_configurations:
                print(f"    私有IP: {ip_config.private_ip_address}")
                if ip_config.public_ip_address:
                    pip_name = ip_config.public_ip_address.id.split('/')[-1]
                    pip = network_client.public_ip_addresses.get(resource_group, pip_name)
                    print(f"    公共IP: {pip.ip_address}")

if __name__ == "__main__":
    diagnose_network_performance()
```

## 成本优化策略

### 网络成本分析
```yaml
成本优化要点:
  1. 带宽成本:
     - 选择合适的负载均衡器SKU
     - 使用Azure CDN减少流量成本
     - 优化出站数据传输

  2. 网关成本:
     - 合理选择VPN Gateway SKU
     - 使用ExpressRoute for高流量场景
     - 避免不必要的公共IP地址

  3. 资源成本:
     - 定期清理未使用的网络资源
     - 使用Azure Reserved Instances
     - 监控和优化网络使用情况
```

### 成本监控脚本
```python
#!/usr/bin/env python3
from azure.identity import AzureCliCredential
from azure.mgmt.consumption import ConsumptionManagementClient
from azure.mgmt.billing import BillingManagementClient
import json
from datetime import datetime, timedelta

def analyze_network_costs():
    """分析网络相关成本"""

    credential = AzureCliCredential()
    subscription_id = "your-subscription-id"

    consumption_client = ConsumptionManagementClient(credential, subscription_id)

    # 获取过去30天的使用情况
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)

    # 查询网络相关费用
    scope = f"/subscriptions/{subscription_id}"

    # 获取使用详情
    usage_details = consumption_client.usage_details.list(
        scope=scope,
        expand="properties/meterDetails"
    )

    network_costs = {}
    total_cost = 0

    for detail in usage_details:
        if any(keyword in detail.meter_category.lower() for keyword in
               ['network', 'bandwidth', 'vpn', 'load balancer', 'application gateway']):

            service = detail.meter_category
            cost = float(detail.cost_in_usd) if detail.cost_in_usd else 0

            if service not in network_costs:
                network_costs[service] = 0
            network_costs[service] += cost
            total_cost += cost

    print("Azure网络成本分析:")
    for service, cost in network_costs.items():
        print(f"  {service}: ${cost:.2f}")

    print(f"总网络成本: ${total_cost:.2f}")

    # 成本优化建议
    provide_cost_optimization_suggestions(network_costs)

def provide_cost_optimization_suggestions(costs):
    """提供成本优化建议"""

    suggestions = []

    if costs.get('Virtual Network', 0) > 100:
        suggestions.append("考虑合并小的虚拟网络以减少管理开销")

    if costs.get('Load Balancer', 0) > 200:
        suggestions.append("评估负载均衡器使用情况，考虑降级SKU")

    if costs.get('Application Gateway', 0) > 300:
        suggestions.append("优化Application Gateway配置，考虑使用WAF策略")

    if costs.get('VPN Gateway', 0) > 150:
        suggestions.append("评估VPN Gateway使用率，考虑使用ExpressRoute")

    print("\n成本优化建议:")
    for i, rec in enumerate(suggestions, 1):
        print(f"{i}. {rec}")

def monitor_bandwidth_usage():
    """监控带宽使用情况"""

    credential = AzureCliCredential()
    subscription_id = "your-subscription-id"

    consumption_client = ConsumptionManagementClient(credential, subscription_id)

    # 查询带宽使用情况
    scope = f"/subscriptions/{subscription_id}"

    usage_details = consumption_client.usage_details.list(scope=scope)

    bandwidth_usage = {}

    for detail in usage_details:
        if 'bandwidth' in detail.meter_category.lower():
            region = detail.resource_location
            usage = float(detail.quantity) if detail.quantity else 0

            if region not in bandwidth_usage:
                bandwidth_usage[region] = 0
            bandwidth_usage[region] += usage

    print("带宽使用情况 (按区域):")
    for region, usage in bandwidth_usage.items():
        print(f"  {region}: {usage:.2f} GB")

if __name__ == "__main__":
    analyze_network_costs()
    monitor_bandwidth_usage()
```

## Infrastructure as Code

### Terraform配置
```hcl
# main.tf
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# 资源组
resource "azurerm_resource_group" "main" {
  name     = "${var.environment}-rg"
  location = var.location

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# 虚拟网络
resource "azurerm_virtual_network" "main" {
  name                = "${var.environment}-vnet"
  address_space       = [var.vnet_cidr]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Web层子网
resource "azurerm_subnet" "web" {
  name                 = "web-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]
}

# 应用层子网
resource "azurerm_subnet" "app" {
  name                 = "app-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.2.0/24"]
}

# 数据库层子网
resource "azurerm_subnet" "db" {
  name                 = "db-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.3.0/24"]
}

# Web层网络安全组
resource "azurerm_network_security_group" "web" {
  name                = "${var.environment}-web-nsg"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  security_rule {
    name                       = "HTTP"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "HTTPS"
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  tags = {
    Environment = var.environment
  }
}

# 应用层网络安全组
resource "azurerm_network_security_group" "app" {
  name                = "${var.environment}-app-nsg"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  security_rule {
    name                       = "AllowWebTier"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "8080"
    source_address_prefix      = "10.0.1.0/24"
    destination_address_prefix = "*"
  }

  tags = {
    Environment = var.environment
  }
}

# Application Gateway
resource "azurerm_subnet" "appgw" {
  name                 = "appgw-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.4.0/24"]
}

resource "azurerm_public_ip" "appgw" {
  name                = "${var.environment}-appgw-ip"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_application_gateway" "main" {
  name                = "${var.environment}-appgw"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location

  sku {
    name     = "Standard_v2"
    tier     = "Standard_v2"
    capacity = 2
  }

  gateway_ip_configuration {
    name      = "appgw-ip-configuration"
    subnet_id = azurerm_subnet.appgw.id
  }

  frontend_port {
    name = "frontend-port"
    port = 80
  }

  frontend_ip_configuration {
    name                 = "frontend-ip"
    public_ip_address_id = azurerm_public_ip.appgw.id
  }

  backend_address_pool {
    name = "backend-pool"
  }

  backend_http_settings {
    name                  = "backend-http-settings"
    cookie_based_affinity = "Disabled"
    port                  = 80
    protocol              = "Http"
    request_timeout       = 20
  }

  http_listener {
    name                           = "http-listener"
    frontend_ip_configuration_name = "frontend-ip"
    frontend_port_name             = "frontend-port"
    protocol                       = "Http"
  }

  request_routing_rule {
    name                       = "routing-rule"
    rule_type                  = "Basic"
    http_listener_name         = "http-listener"
    backend_address_pool_name  = "backend-pool"
    backend_http_settings_name = "backend-http-settings"
    priority                   = 100
  }

  tags = {
    Environment = var.environment
  }
}

# variables.tf
variable "location" {
  description = "Azure region"
  type        = string
  default     = "East US"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "vnet_cidr" {
  description = "VNet CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "myproject"
}

# outputs.tf
output "resource_group_name" {
  description = "Resource group name"
  value       = azurerm_resource_group.main.name
}

output "vnet_id" {
  description = "VNet ID"
  value       = azurerm_virtual_network.main.id
}

output "web_subnet_id" {
  description = "Web subnet ID"
  value       = azurerm_subnet.web.id
}

output "app_subnet_id" {
  description = "App subnet ID"
  value       = azurerm_subnet.app.id
}

output "appgw_public_ip" {
  description = "Application Gateway public IP"
  value       = azurerm_public_ip.appgw.ip_address
}
```

### ARM模板
```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "environment": {
      "type": "string",
      "defaultValue": "production",
      "metadata": {
        "description": "Environment name"
      }
    },
    "vnetAddressPrefix": {
      "type": "string",
      "defaultValue": "10.0.0.0/16",
      "metadata": {
        "description": "VNet address prefix"
      }
    }
  },
  "variables": {
    "resourceGroupName": "[concat(parameters('environment'), '-rg')]",
    "vnetName": "[concat(parameters('environment'), '-vnet')]",
    "webSubnetName": "web-subnet",
    "appSubnetName": "app-subnet",
    "dbSubnetName": "db-subnet"
  },
  "resources": [
    {
      "type": "Microsoft.Network/virtualNetworks",
      "apiVersion": "2020-06-01",
      "name": "[variables('vnetName')]",
      "location": "[resourceGroup().location]",
      "properties": {
        "addressSpace": {
          "addressPrefixes": [
            "[parameters('vnetAddressPrefix')]"
          ]
        },
        "subnets": [
          {
            "name": "[variables('webSubnetName')]",
            "properties": {
              "addressPrefix": "10.0.1.0/24"
            }
          },
          {
            "name": "[variables('appSubnetName')]",
            "properties": {
              "addressPrefix": "10.0.2.0/24"
            }
          },
          {
            "name": "[variables('dbSubnetName')]",
            "properties": {
              "addressPrefix": "10.0.3.0/24"
            }
          }
        ]
      }
    },
    {
      "type": "Microsoft.Network/networkSecurityGroups",
      "apiVersion": "2020-06-01",
      "name": "[concat(parameters('environment'), '-web-nsg')]",
      "location": "[resourceGroup().location]",
      "properties": {
        "securityRules": [
          {
            "name": "AllowHTTP",
            "properties": {
              "protocol": "Tcp",
              "sourcePortRange": "*",
              "destinationPortRange": "80",
              "sourceAddressPrefix": "*",
              "destinationAddressPrefix": "*",
              "access": "Allow",
              "priority": 100,
              "direction": "Inbound"
            }
          },
          {
            "name": "AllowHTTPS",
            "properties": {
              "protocol": "Tcp",
              "sourcePortRange": "*",
              "destinationPortRange": "443",
              "sourceAddressPrefix": "*",
              "destinationAddressPrefix": "*",
              "access": "Allow",
              "priority": 110,
              "direction": "Inbound"
            }
          }
        ]
      }
    }
  ],
  "outputs": {
    "vnetId": {
      "type": "string",
      "value": "[resourceId('Microsoft.Network/virtualNetworks', variables('vnetName'))]"
    },
    "webSubnetId": {
      "type": "string",
      "value": "[resourceId('Microsoft.Network/virtualNetworks/subnets', variables('vnetName'), variables('webSubnetName'))]"
    }
  }
}
```

## 网络安全最佳实践

### 零信任网络架构
```yaml
零信任原则:
  1. 身份验证:
     - 使用Azure AD进行身份管理
     - 启用多因子身份验证(MFA)
     - 实施条件访问策略

  2. 网络分段:
     - 使用NSG实现微分段
     - 部署Azure Firewall
     - 实施应用安全组(ASG)

  3. 数据保护:
     - 启用传输中加密
     - 使用Azure Key Vault
     - 实施数据丢失防护(DLP)

  4. 监控审计:
     - 启用Azure Security Center
     - 配置Azure Sentinel
     - 实施威胁检测
```

### 安全配置检查脚本
```python
#!/usr/bin/env python3
from azure.identity import AzureCliCredential
from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.security import SecurityCenter
import json

def security_audit():
    """安全配置审计"""

    credential = AzureCliCredential()
    subscription_id = "your-subscription-id"
    resource_group = "production-rg"

    network_client = NetworkManagementClient(credential, subscription_id)

    # 获取网络安全组列表
    nsgs = network_client.network_security_groups.list(resource_group)

    security_issues = []

    for nsg in nsgs:
        print(f"审核网络安全组: {nsg.name}")

        for rule in nsg.security_rules:
            # 检查过于宽泛的规则
            if rule.source_address_prefix == "*" and rule.access == "Allow":
                if rule.destination_port_range == "22":
                    security_issues.append({
                        'nsg': nsg.name,
                        'rule': rule.name,
                        'issue': 'SSH端口对所有IP开放',
                        'severity': 'HIGH'
                    })

                if rule.destination_port_range == "*":
                    security_issues.append({
                        'nsg': nsg.name,
                        'rule': rule.name,
                        'issue': '所有端口对所有IP开放',
                        'severity': 'CRITICAL'
                    })

    # 检查子网是否关联了NSG
    vnets = network_client.virtual_networks.list(resource_group)

    for vnet in vnets:
        for subnet in vnet.subnets:
            if not subnet.network_security_group:
                security_issues.append({
                    'subnet': f"{vnet.name}/{subnet.name}",
                    'issue': '子网未关联网络安全组',
                    'severity': 'MEDIUM'
                })

    # 输出审计结果
    if security_issues:
        print("\n发现以下安全问题:")
        for issue in security_issues:
            print(f"- {issue.get('nsg', issue.get('subnet'))}: {issue['issue']} (严重性: {issue['severity']})")
    else:
        print("未发现明显的安全问题")

    return security_issues

def recommend_security_improvements():
    """安全改进建议"""

    recommendations = [
        "启用Azure DDoS Protection Standard",
        "部署Azure Firewall保护虚拟网络",
        "配置Azure Security Center监控",
        "启用Network Watcher for流量分析",
        "实施Just-In-Time VM访问",
        "使用Azure Bastion for安全远程访问",
        "配置Azure Sentinel for威胁检测",
        "启用Azure Key Vault for密钥管理"
    ]

    print("\n=== 安全改进建议 ===")
    for i, rec in enumerate(recommendations, 1):
        print(f"{i}. {rec}")

if __name__ == "__main__":
    security_audit()
    recommend_security_improvements()
```

## 混合云连接

### ExpressRoute配置
```bash
# 创建ExpressRoute线路
az network express-route create \
    --resource-group production-rg \
    --name production-expressroute \
    --location eastus \
    --service-provider "Equinix" \
    --peering-location "Washington DC" \
    --bandwidth 200 \
    --sku-family MeteredData \
    --sku-tier Standard

# 创建ExpressRoute网关
az network vnet-gateway create \
    --resource-group production-rg \
    --name expressroute-gateway \
    --public-ip-address expressroute-gateway-ip \
    --vnet production-vnet \
    --gateway-type ExpressRoute \
    --sku Standard \
    --no-wait

# 创建连接
az network vpn-connection create \
    --resource-group production-rg \
    --name expressroute-connection \
    --vnet-gateway1 expressroute-gateway \
    --express-route-circuit2 production-expressroute
```

### Azure Arc网络配置
```bash
# 安装Azure Arc代理
wget https://aka.ms/azcmagent -O azcmagent.tar.gz
tar -xvzf azcmagent.tar.gz

# 连接服务器到Azure Arc
sudo bash install_linux_azcmagent.sh

# 配置网络连接
azcmagent connect \
    --resource-group production-rg \
    --tenant-id your-tenant-id \
    --location eastus \
    --subscription-id your-subscription-id
```

## 总结

Azure提供了全面的网络服务和工具，通过合理的架构设计和最佳实践，可以构建出安全、高性能、具有成本效益的云网络基础设施。

### 关键要点

1. **网络架构设计**：
   - 使用Virtual Network实现网络隔离
   - 采用多层架构提高安全性
   - 通过NSG实现细粒度访问控制

2. **安全最佳实践**：
   - 实施零信任网络模型
   - 使用Azure Security Center监控
   - 部署Azure Firewall和DDoS Protection

3. **性能优化**：
   - 选择合适的负载均衡器类型
   - 优化网络路由配置
   - 使用CDN和缓存策略

4. **成本管理**：
   - 监控网络使用情况和成本
   - 选择合适的SKU和定价层
   - 定期清理未使用的资源

5. **自动化运维**：
   - 使用Terraform进行基础设施即代码
   - 实施ARM模板部署
   - 建立全面的监控和告警

6. **混合连接**：
   - 使用ExpressRoute for专用连接
   - 配置站点到站点VPN
   - 实施Azure Arc for混合管理

掌握这些概念和实践，将帮助您在Azure上构建出现代化、安全、可扩展的网络架构，满足企业级应用的需求。

---

*本文为Azure网络架构管理指南，建议结合实际项目需求和Azure最新文档进行实践。如有技术问题，欢迎交流讨论。*
</rewritten_file>