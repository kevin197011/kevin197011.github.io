---
layout: post
title: "AWS Cloud 网络架构与管理实战指南"
excerpt: "深入掌握AWS云网络架构设计与管理，包含VPC、子网、路由、安全组、负载均衡等核心组件的配置与最佳实践。"
date: 2024-12-31
category: DevOps
tags: [AWS, 云计算, 网络架构, VPC, 负载均衡, 安全组, 路由]
author: Kk
diagram: |
  graph TB
      subgraph "AWS Region"
          subgraph "VPC"
              subgraph "可用区A"
                  PubSubA[公有子网A]
                  PrivSubA[私有子网A]
                  EC2A[EC2 实例]
                  RDS_A[RDS 主库]
              end

              subgraph "可用区B"
                  PubSubB[公有子网B]
                  PrivSubB[私有子网B]
                  EC2B[EC2 实例]
                  RDS_B[RDS 备库]
              end

              IGW[Internet Gateway]
              NAT_A[NAT Gateway A]
              NAT_B[NAT Gateway B]
              ALB[Application Load Balancer]

              subgraph "路由表"
                  PubRT[公有路由表]
                  PrivRT_A[私有路由表A]
                  PrivRT_B[私有路由表B]
              end

              subgraph "安全组"
                  WebSG[Web 安全组]
                  AppSG[App 安全组]
                  DBSG[DB 安全组]
              end
          end

          CF[CloudFront CDN]
          R53[Route 53]
      end

      Internet[互联网] --> CF
      CF --> ALB
      Internet --> IGW
      IGW --> PubSubA
      IGW --> PubSubB
      PubSubA --> NAT_A
      PubSubB --> NAT_B
      NAT_A --> PrivSubA
      NAT_B --> PrivSubB
      ALB --> EC2A
      ALB --> EC2B
      EC2A --> RDS_A
      EC2B --> RDS_B
      RDS_A --> RDS_B
      R53 --> ALB

      PubRT --> IGW
      PrivRT_A --> NAT_A
      PrivRT_B --> NAT_B

      WebSG --> EC2A
      WebSG --> EC2B
      AppSG --> EC2A
      AppSG --> EC2B
      DBSG --> RDS_A
      DBSG --> RDS_B

      style IGW fill:#00d4ff
      style ALB fill:#00ff88
      style CF fill:#ffa726
      style R53 fill:#ff6b6b
---

# AWS Cloud 网络架构与管理实战指南

## AWS网络基础概念

### 全球基础设施

AWS全球基础设施为网络架构提供了强大的基础：

```yaml
AWS全球架构:
  区域(Regions): 33个区域
  可用区(AZ): 105个可用区
  边缘站点(Edge): 450+个边缘站点
  本地区域: 17个本地区域
```

#### 区域和可用区
```bash
# 查看可用区域
aws ec2 describe-regions --output table

# 查看指定区域的可用区
aws ec2 describe-availability-zones --region us-east-1 --output table
```

### 核心网络组件

#### VPC (Virtual Private Cloud)
```json
{
  "VPC": {
    "作用": "虚拟私有云，提供隔离的网络环境",
    "特点": [
      "逻辑隔离",
      "自定义IP地址范围",
      "完全控制网络配置"
    ],
    "默认限制": {
      "每个区域VPC数量": 5,
      "每个VPC子网数量": 200,
      "每个VPC路由表数量": 200
    }
  }
}
```

## VPC架构设计

### 网络规划原则

#### CIDR块设计
```bash
# 推荐的CIDR规划示例
企业级VPC规划:
  生产环境: 10.0.0.0/16   (65,536个IP)
  测试环境: 10.1.0.0/16   (65,536个IP)
  开发环境: 10.2.0.0/16   (65,536个IP)

多层架构子网规划:
  公有子网:   10.0.1.0/24  (254个IP)
  应用子网:   10.0.2.0/24  (254个IP)
  数据库子网: 10.0.3.0/24  (254个IP)
  管理子网:   10.0.4.0/24  (254个IP)
```

#### VPC创建
```bash
# 使用AWS CLI创建VPC
aws ec2 create-vpc \
    --cidr-block 10.0.0.0/16 \
    --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=Production-VPC}]'

# 启用DNS解析和DNS主机名
aws ec2 modify-vpc-attribute \
    --vpc-id vpc-12345678 \
    --enable-dns-support

aws ec2 modify-vpc-attribute \
    --vpc-id vpc-12345678 \
    --enable-dns-hostnames
```

### 子网架构设计

#### 多层网络架构
```yaml
三层网络架构:
  Web层(公有子网):
    - 位置: 每个AZ各一个
    - CIDR: 10.0.1.0/24, 10.0.11.0/24
    - 用途: 负载均衡器、堡垒机

  应用层(私有子网):
    - 位置: 每个AZ各一个
    - CIDR: 10.0.2.0/24, 10.0.12.0/24
    - 用途: 应用服务器、API网关

  数据层(私有子网):
    - 位置: 每个AZ各一个
    - CIDR: 10.0.3.0/24, 10.0.13.0/24
    - 用途: 数据库、缓存服务
```

#### 子网创建脚本
```bash
#!/bin/bash
# 创建多层架构子网

VPC_ID="vpc-12345678"
REGION="us-east-1"

# 创建公有子网
aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.1.0/24 \
    --availability-zone ${REGION}a \
    --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Public-Subnet-1a}]'

aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.11.0/24 \
    --availability-zone ${REGION}b \
    --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Public-Subnet-1b}]'

# 创建私有应用子网
aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.2.0/24 \
    --availability-zone ${REGION}a \
    --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=App-Subnet-1a}]'

aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.12.0/24 \
    --availability-zone ${REGION}b \
    --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=App-Subnet-1b}]'

# 创建私有数据库子网
aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.3.0/24 \
    --availability-zone ${REGION}a \
    --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=DB-Subnet-1a}]'

aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.13.0/24 \
    --availability-zone ${REGION}b \
    --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=DB-Subnet-1b}]'
```

## 网关和路由配置

### Internet Gateway
```bash
# 创建Internet Gateway
aws ec2 create-internet-gateway \
    --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=Production-IGW}]'

# 附加到VPC
aws ec2 attach-internet-gateway \
    --internet-gateway-id igw-12345678 \
    --vpc-id vpc-12345678
```

### NAT Gateway
```bash
# 分配弹性IP
aws ec2 allocate-address --domain vpc

# 创建NAT Gateway
aws ec2 create-nat-gateway \
    --subnet-id subnet-12345678 \
    --allocation-id eipalloc-12345678 \
    --tag-specifications 'ResourceType=nat-gateway,Tags=[{Key=Name,Value=Production-NAT-1a}]'
```

### 路由表配置
```bash
# 创建公有路由表
aws ec2 create-route-table \
    --vpc-id vpc-12345678 \
    --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=Public-Route-Table}]'

# 添加默认路由到Internet Gateway
aws ec2 create-route \
    --route-table-id rtb-12345678 \
    --destination-cidr-block 0.0.0.0/0 \
    --gateway-id igw-12345678

# 关联公有子网
aws ec2 associate-route-table \
    --route-table-id rtb-12345678 \
    --subnet-id subnet-12345678

# 创建私有路由表
aws ec2 create-route-table \
    --vpc-id vpc-12345678 \
    --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=Private-Route-Table-1a}]'

# 添加默认路由到NAT Gateway
aws ec2 create-route \
    --route-table-id rtb-87654321 \
    --destination-cidr-block 0.0.0.0/0 \
    --nat-gateway-id nat-12345678
```

## 安全组和网络ACL

### 安全组配置

#### Web层安全组
```bash
# 创建Web层安全组
aws ec2 create-security-group \
    --group-name web-tier-sg \
    --description "Security group for web tier" \
    --vpc-id vpc-12345678

# 允许HTTP和HTTPS流量
aws ec2 authorize-security-group-ingress \
    --group-id sg-12345678 \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
    --group-id sg-12345678 \
    --protocol tcp \
    --port 443 \
    --cidr 0.0.0.0/0

# 允许SSH访问(仅限特定IP)
aws ec2 authorize-security-group-ingress \
    --group-id sg-12345678 \
    --protocol tcp \
    --port 22 \
    --cidr 203.0.113.0/24
```

#### 应用层安全组
```bash
# 创建应用层安全组
aws ec2 create-security-group \
    --group-name app-tier-sg \
    --description "Security group for application tier" \
    --vpc-id vpc-12345678

# 只允许来自Web层的流量
aws ec2 authorize-security-group-ingress \
    --group-id sg-87654321 \
    --protocol tcp \
    --port 8080 \
    --source-group sg-12345678
```

#### 数据库层安全组
```bash
# 创建数据库层安全组
aws ec2 create-security-group \
    --group-name db-tier-sg \
    --description "Security group for database tier" \
    --vpc-id vpc-12345678

# 只允许来自应用层的MySQL流量
aws ec2 authorize-security-group-ingress \
    --group-id sg-11111111 \
    --protocol tcp \
    --port 3306 \
    --source-group sg-87654321
```

### 网络ACL配置
```bash
# 创建自定义网络ACL
aws ec2 create-network-acl \
    --vpc-id vpc-12345678 \
    --tag-specifications 'ResourceType=network-acl,Tags=[{Key=Name,Value=Custom-NACL}]'

# 创建入站规则
aws ec2 create-network-acl-entry \
    --network-acl-id acl-12345678 \
    --rule-number 100 \
    --protocol tcp \
    --rule-action allow \
    --port-range From=80,To=80 \
    --cidr-block 0.0.0.0/0

# 创建出站规则
aws ec2 create-network-acl-entry \
    --network-acl-id acl-12345678 \
    --rule-number 100 \
    --protocol tcp \
    --rule-action allow \
    --port-range From=80,To=80 \
    --cidr-block 0.0.0.0/0 \
    --egress
```

## 高级网络服务

### VPC Peering
```bash
# 创建VPC对等连接
aws ec2 create-vpc-peering-connection \
    --vpc-id vpc-12345678 \
    --peer-vpc-id vpc-87654321 \
    --peer-region us-west-2

# 接受对等连接请求
aws ec2 accept-vpc-peering-connection \
    --vpc-peering-connection-id pcx-12345678

# 更新路由表
aws ec2 create-route \
    --route-table-id rtb-12345678 \
    --destination-cidr-block 10.1.0.0/16 \
    --vpc-peering-connection-id pcx-12345678
```

### Transit Gateway
```yaml
Transit Gateway配置:
  用途: 简化多VPC连接
  支持协议: BGP路由
  连接类型:
    - VPC连接
    - VPN连接
    - Direct Connect Gateway
    - Transit Gateway对等连接
```

```bash
# 创建Transit Gateway
aws ec2 create-transit-gateway \
    --description "Enterprise Transit Gateway" \
    --options AmazonSideAsn=64512,AutoAcceptSharedAttachments=enable,DefaultRouteTableAssociation=enable

# 附加VPC到Transit Gateway
aws ec2 create-transit-gateway-vpc-attachment \
    --transit-gateway-id tgw-12345678 \
    --vpc-id vpc-12345678 \
    --subnet-ids subnet-12345678
```

### VPC Endpoints
```bash
# 创建S3 Gateway Endpoint
aws ec2 create-vpc-endpoint \
    --vpc-id vpc-12345678 \
    --service-name com.amazonaws.us-east-1.s3 \
    --vpc-endpoint-type Gateway \
    --route-table-ids rtb-12345678

# 创建Interface Endpoint (EC2)
aws ec2 create-vpc-endpoint \
    --vpc-id vpc-12345678 \
    --service-name com.amazonaws.us-east-1.ec2 \
    --vpc-endpoint-type Interface \
    --subnet-ids subnet-12345678 \
    --security-group-ids sg-12345678
```

## 负载均衡架构

### Application Load Balancer (ALB)
```bash
# 创建应用负载均衡器
aws elbv2 create-load-balancer \
    --name production-alb \
    --subnets subnet-12345678 subnet-87654321 \
    --security-groups sg-12345678 \
    --scheme internet-facing \
    --type application \
    --ip-address-type ipv4

# 创建目标组
aws elbv2 create-target-group \
    --name web-servers \
    --protocol HTTP \
    --port 80 \
    --vpc-id vpc-12345678 \
    --health-check-path /health

# 创建监听器
aws elbv2 create-listener \
    --load-balancer-arn arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/production-alb/1234567890123456 \
    --protocol HTTP \
    --port 80 \
    --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/web-servers/1234567890123456
```

### Network Load Balancer (NLB)
```bash
# 创建网络负载均衡器
aws elbv2 create-load-balancer \
    --name production-nlb \
    --subnets subnet-12345678 subnet-87654321 \
    --scheme internal \
    --type network \
    --ip-address-type ipv4
```

## 网络监控和故障排除

### CloudWatch网络监控
```bash
# 启用VPC Flow Logs
aws ec2 create-flow-logs \
    --resource-type VPC \
    --resource-ids vpc-12345678 \
    --traffic-type ALL \
    --log-destination-type cloud-watch-logs \
    --log-group-name VPCFlowLogs \
    --deliver-logs-permission-arn arn:aws:iam::123456789012:role/flowlogsRole
```

### 网络监控指标
```yaml
关键监控指标:
  VPC Flow Logs:
    - 源IP和目标IP
    - 源端口和目标端口
    - 协议类型
    - 数据包和字节数
    - 动作(ACCEPT/REJECT)

  CloudWatch指标:
    - NetworkIn/NetworkOut
    - NetworkPacketsIn/NetworkPacketsOut
    - NetworkLatency
    - TargetResponseTime
```

### 故障排除工具

#### VPC Reachability Analyzer
```bash
# 创建网络路径分析
aws ec2 create-network-insights-path \
    --source ec2-instance-id \
    --destination ec2-instance-id \
    --protocol tcp \
    --destination-port 80

# 开始分析
aws ec2 start-network-insights-analysis \
    --network-insights-path-id nip-12345678
```

#### 连通性测试脚本
```bash
#!/bin/bash
# 网络连通性测试脚本

# 测试Internet连接
echo "测试Internet连接..."
ping -c 4 8.8.8.8

# 测试DNS解析
echo "测试DNS解析..."
nslookup google.com

# 测试端口连通性
echo "测试端口连通性..."
nc -zv example.com 80
nc -zv example.com 443

# 检查路由表
echo "检查路由表..."
route -n

# 检查安全组规则
echo "检查实例安全组..."
aws ec2 describe-security-groups --group-ids sg-12345678
```

## 网络安全最佳实践

### 深度防御策略
```yaml
网络安全层次:
  1. 边界安全:
     - AWS WAF
     - AWS Shield
     - Internet Gateway限制

  2. 网络分段:
     - 多层子网架构
     - 安全组隔离
     - 网络ACL控制

  3. 访问控制:
     - IAM策略
     - 资源标签
     - 最小权限原则

  4. 监控审计:
     - VPC Flow Logs
     - CloudTrail日志
     - GuardDuty威胁检测
```

### 安全配置模板
```json
{
  "SecurityGroupTemplate": {
    "WebTier": {
      "Inbound": [
        {"Protocol": "tcp", "Port": 80, "Source": "0.0.0.0/0"},
        {"Protocol": "tcp", "Port": 443, "Source": "0.0.0.0/0"},
        {"Protocol": "tcp", "Port": 22, "Source": "管理IP段"}
      ],
      "Outbound": [
        {"Protocol": "tcp", "Port": 8080, "Destination": "应用层安全组"}
      ]
    },
    "AppTier": {
      "Inbound": [
        {"Protocol": "tcp", "Port": 8080, "Source": "Web层安全组"}
      ],
      "Outbound": [
        {"Protocol": "tcp", "Port": 3306, "Destination": "数据库层安全组"}
      ]
    },
    "DatabaseTier": {
      "Inbound": [
        {"Protocol": "tcp", "Port": 3306, "Source": "应用层安全组"}
      ],
      "Outbound": []
    }
  }
}
```

## 成本优化策略

### 网络流量成本优化
```yaml
成本优化措施:
  1. 数据传输:
     - 使用CloudFront减少源站流量
     - 区域内数据传输免费
     - VPC Endpoint减少NAT Gateway费用

  2. 负载均衡器:
     - 选择合适的LB类型
     - 配置适当的健康检查间隔
     - 清理未使用的负载均衡器

  3. NAT Gateway:
     - 使用NAT Instance替代NAT Gateway(小规模)
     - 合理规划NAT Gateway数量
     - 监控NAT Gateway使用率
```

### 成本监控脚本
```python
import boto3
import json
from datetime import datetime, timedelta

def analyze_network_costs():
    """分析网络相关成本"""

    ce_client = boto3.client('ce')

    # 获取过去30天的网络成本
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=30)).strftime('%Y-%m-%d')

    response = ce_client.get_cost_and_usage(
        TimePeriod={
            'Start': start_date,
            'End': end_date
        },
        Granularity='DAILY',
        Metrics=['BlendedCost'],
        GroupBy=[
            {
                'Type': 'DIMENSION',
                'Key': 'SERVICE'
            }
        ],
        Filter={
            'Dimensions': {
                'Key': 'SERVICE',
                'Values': [
                    'Amazon Elastic Compute Cloud - Compute',
                    'Amazon Virtual Private Cloud',
                    'Amazon CloudFront',
                    'AWS Data Transfer'
                ]
            }
        }
    )

    # 分析结果
    for result in response['ResultsByTime']:
        date = result['TimePeriod']['Start']
        print(f"\n日期: {date}")

        for group in result['Groups']:
            service = group['Keys'][0]
            cost = float(group['Metrics']['BlendedCost']['Amount'])
            print(f"  {service}: ${cost:.2f}")

if __name__ == "__main__":
    analyze_network_costs()
```

## 自动化部署

### CloudFormation网络模板
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Multi-tier VPC architecture'

Parameters:
  EnvironmentName:
    Description: Environment name prefix
    Type: String
    Default: Production

  VpcCIDR:
    Description: CIDR block for this VPC
    Type: String
    Default: 10.0.0.0/16

Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: !Ref VpcCIDR
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: !Sub ${EnvironmentName}-VPC

  InternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: !Sub ${EnvironmentName}-IGW

  InternetGatewayAttachment:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      InternetGatewayId: !Ref InternetGateway
      VpcId: !Ref VPC

  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select [ 0, !GetAZs '' ]
      CidrBlock: 10.0.1.0/24
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: !Sub ${EnvironmentName}-Public-Subnet-AZ1

  PublicSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select [ 1, !GetAZs '' ]
      CidrBlock: 10.0.2.0/24
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: !Sub ${EnvironmentName}-Public-Subnet-AZ2

  PrivateSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select [ 0, !GetAZs '' ]
      CidrBlock: 10.0.11.0/24
      Tags:
        - Key: Name
          Value: !Sub ${EnvironmentName}-Private-Subnet-AZ1

  PrivateSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select [ 1, !GetAZs '' ]
      CidrBlock: 10.0.12.0/24
      Tags:
        - Key: Name
          Value: !Sub ${EnvironmentName}-Private-Subnet-AZ2

Outputs:
  VPC:
    Description: A reference to the created VPC
    Value: !Ref VPC
    Export:
      Name: !Sub ${EnvironmentName}-VPCID

  PublicSubnets:
    Description: A list of the public subnets
    Value: !Join [ ",", [ !Ref PublicSubnet1, !Ref PublicSubnet2 ]]
    Export:
      Name: !Sub ${EnvironmentName}-PUB-NETS

  PrivateSubnets:
    Description: A list of the private subnets
    Value: !Join [ ",", [ !Ref PrivateSubnet1, !Ref PrivateSubnet2 ]]
    Export:
      Name: !Sub ${EnvironmentName}-PRIV-NETS
```

### Terraform网络配置
```hcl
# variables.tf
variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "${var.environment}-vpc"
    Environment = var.environment
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name        = "${var.environment}-igw"
    Environment = var.environment
  }
}

# Public Subnets
resource "aws_subnet" "public" {
  count = 2

  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, count.index + 1)
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name        = "${var.environment}-public-${count.index + 1}"
    Type        = "Public"
    Environment = var.environment
  }
}

# Private Subnets
resource "aws_subnet" "private" {
  count = 2

  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index + 11)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name        = "${var.environment}-private-${count.index + 1}"
    Type        = "Private"
    Environment = var.environment
  }
}

# Elastic IPs for NAT Gateways
resource "aws_eip" "nat" {
  count = 2

  domain = "vpc"
  depends_on = [aws_internet_gateway.main]

  tags = {
    Name        = "${var.environment}-eip-${count.index + 1}"
    Environment = var.environment
  }
}

# NAT Gateways
resource "aws_nat_gateway" "main" {
  count = 2

  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id

  tags = {
    Name        = "${var.environment}-nat-${count.index + 1}"
    Environment = var.environment
  }

  depends_on = [aws_internet_gateway.main]
}

# Route Tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name        = "${var.environment}-public-rt"
    Environment = var.environment
  }
}

resource "aws_route_table" "private" {
  count = 2

  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }

  tags = {
    Name        = "${var.environment}-private-rt-${count.index + 1}"
    Environment = var.environment
  }
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  count = 2

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count = 2

  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

# outputs.tf
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = aws_subnet.private[*].id
}
```

## 总结

AWS Cloud网络架构是构建可扩展、安全、高可用云基础设施的基础。通过合理的VPC设计、子网规划、安全组配置和路由策略，可以构建出满足企业级需求的网络架构。

### 关键要点

1. **网络设计原则**：
   - 合理规划CIDR块
   - 实施多层架构
   - 考虑高可用性和容错性

2. **安全最佳实践**：
   - 深度防御策略
   - 最小权限原则
   - 持续监控和审计

3. **成本优化**：
   - 监控网络流量成本
   - 合理选择网络服务
   - 定期清理未使用资源

4. **自动化管理**：
   - 使用IaC工具
   - 实施配置管理
   - 建立标准化模板

掌握这些概念和实践，将帮助你构建出高效、安全、经济的AWS云网络架构。

---

*本文为AWS网络架构管理指南，建议结合实际项目需求和AWS最新文档进行实践。如有技术问题，欢迎交流讨论。*