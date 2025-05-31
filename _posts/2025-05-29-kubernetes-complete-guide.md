---
layout: post
title: "Kubernetes 完全指南：从入门到生产实战"
date: 2024-12-29 21:00:00 +0800
category: DevOps
tags: [Kubernetes, K8s, 容器编排, 云原生, DevOps, 微服务]
author: Kk
excerpt: "深入掌握Kubernetes容器编排平台，从基础概念到生产级部署，全面提升云原生技能"
diagram: |
  graph TB
      subgraph "Master节点"
          API[API Server]
          ETCD[etcd 数据库]
          SCHED[Scheduler 调度器]
          CM[Controller Manager]
      end

      subgraph "Worker节点1"
          KUBELET1[kubelet]
          PROXY1[kube-proxy]
          RUNTIME1[Container Runtime]
          subgraph "Pod1"
              C1[容器1]
              C2[容器2]
          end
      end

      subgraph "Worker节点2"
          KUBELET2[kubelet]
          PROXY2[kube-proxy]
          RUNTIME2[Container Runtime]
          subgraph "Pod2"
              C3[容器3]
              C4[容器4]
          end
      end

      subgraph "外部访问"
          LB[LoadBalancer]
          ING[Ingress]
      end

      API --> ETCD
      API --> SCHED
      API --> CM
      KUBELET1 --> API
      KUBELET2 --> API
      SCHED --> KUBELET1
      SCHED --> KUBELET2
      KUBELET1 --> RUNTIME1
      KUBELET2 --> RUNTIME2
      RUNTIME1 --> Pod1
      RUNTIME2 --> Pod2
      PROXY1 --> Pod1
      PROXY2 --> Pod2
      LB --> ING
      ING --> PROXY1
      ING --> PROXY2

      style API fill:#00d4ff
      style ETCD fill:#00ff88
      style SCHED fill:#ffa726
      style CM fill:#ff6b6b
---

# Kubernetes 完全指南：从入门到生产实战

## 🌟 什么是 Kubernetes

Kubernetes（简称 K8s）是一个开源的容器编排平台，用于自动化部署、扩展和管理容器化应用程序。它由 Google 开发并捐赠给 CNCF（云原生计算基金会）。

### 核心价值

- **🚀 自动化部署**: 自动化容器的部署和更新
- **📈 弹性伸缩**: 根据负载自动扩缩容
- **🔄 服务发现**: 内置服务发现和负载均衡
- **💪 故障恢复**: 自动重启失败的容器
- **🔧 配置管理**: 统一管理应用配置和密钥

### 架构概览

```
┌─────────────────────────────────────────────────────────┐
│                    Kubernetes 集群                      │
├─────────────────┬───────────────────────────────────────┤
│   Master 节点   │              Worker 节点               │
├─────────────────┼───────────────────────────────────────┤
│ • API Server    │ • kubelet                            │
│ • etcd          │ • kube-proxy                         │
│ • Scheduler     │ • Container Runtime                  │
│ • Controller    │ • Pods                               │
└─────────────────┴───────────────────────────────────────┘
```

## 📦 安装 Kubernetes

### 1. 使用 Minikube（开发环境）

```bash
# 安装 Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# 启动集群
minikube start --driver=docker

# 检查状态
minikube status

# 安装 kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# 验证安装
kubectl version --client
kubectl cluster-info
```

### 2. 使用 kubeadm（生产环境）

#### 准备工作（所有节点）

```bash
# 关闭 swap
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# 配置内核模块
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# 配置网络参数
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward = 1
EOF

sudo sysctl --system

# 安装 Docker
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker

# 安装 kubeadm, kubelet, kubectl
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg

curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

#### 初始化主节点

```bash
# 初始化集群
sudo kubeadm init --pod-network-cidr=10.244.0.0/16

# 配置 kubectl
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 安装网络插件（Flannel）
kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml

# 获取加入命令
kubeadm token create --print-join-command
```

#### 加入工作节点

```bash
# 在工作节点执行（使用上面获取的命令）
sudo kubeadm join <master-ip>:6443 --token <token> --discovery-token-ca-cert-hash <hash>
```

## 🏗️ 核心概念

### 1. Pod - 最小部署单元

```yaml
# simple-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  labels:
    app: my-app
spec:
  containers:
  - name: nginx
    image: nginx:1.21
    ports:
    - containerPort: 80
  - name: sidecar
    image: busybox
    command: ['sh', '-c', 'while true; do echo $(date) >> /var/log/app.log; sleep 30; done']
    volumeMounts:
    - name: log-volume
      mountPath: /var/log
  volumes:
  - name: log-volume
    emptyDir: {}
```

```bash
# 部署 Pod
kubectl apply -f simple-pod.yaml

# 查看 Pod
kubectl get pods
kubectl describe pod my-pod

# 查看日志
kubectl logs my-pod -c nginx
kubectl logs my-pod -c sidecar

# 进入容器
kubectl exec -it my-pod -c nginx -- /bin/bash

# 删除 Pod
kubectl delete pod my-pod
```

### 2. Deployment - 应用部署管理

```yaml
# nginx-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 15
          periodSeconds: 20
```

```bash
# 部署应用
kubectl apply -f nginx-deployment.yaml

# 查看部署状态
kubectl get deployments
kubectl rollout status deployment/nginx-deployment

# 扩缩容
kubectl scale deployment nginx-deployment --replicas=5

# 查看副本集
kubectl get replicasets

# 查看 Pod
kubectl get pods -l app=nginx
```

### 3. Service - 服务发现和负载均衡

```yaml
# nginx-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-nodeport
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
  type: NodePort
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-loadbalancer
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

```bash
# 创建服务
kubectl apply -f nginx-service.yaml

# 查看服务
kubectl get services

# 查看端点
kubectl get endpoints

# 测试服务
kubectl run test-pod --image=busybox --rm -it --restart=Never -- wget -qO- nginx-service
```

### 4. ConfigMap 和 Secret

```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_host: "db.example.com"
  database_port: "5432"
  app.properties: |
    environment=production
    debug=false
    max_connections=100
---
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  username: YWRtaW4=  # admin base64编码
  password: MWYyZDFlMmU2N2Rm  # 1f2d1e2e67df base64编码
```

#### 在 Pod 中使用 ConfigMap 和 Secret

```yaml
# app-with-config.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: app
        image: nginx:1.21
        env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: database_host
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: username
        volumeMounts:
        - name: config-volume
          mountPath: /etc/config
        - name: secret-volume
          mountPath: /etc/secret
      volumes:
      - name: config-volume
        configMap:
          name: app-config
      - name: secret-volume
        secret:
          secretName: app-secret
```

### 5. Ingress - 入口控制器

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 8080
```

## 🎯 实战案例：完整的微服务应用

### 项目结构

```
k8s-microservices/
├── namespace.yaml
├── frontend/
│   ├── deployment.yaml
│   └── service.yaml
├── backend/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── configmap.yaml
├── database/
│   ├── statefulset.yaml
│   ├── service.yaml
│   └── pvc.yaml
├── monitoring/
│   ├── prometheus.yaml
│   └── grafana.yaml
└── ingress.yaml
```

### 1. 创建命名空间

```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: microservices
  labels:
    name: microservices
```

### 2. 数据库层（PostgreSQL）

```yaml
# database/pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
  namespace: microservices
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
---
# database/statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: microservices
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:13
        env:
        - name: POSTGRES_DB
          value: "appdb"
        - name: POSTGRES_USER
          value: "appuser"
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: postgres-pvc
---
# database/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: microservices
spec:
  selector:
    app: postgres
  ports:
    - port: 5432
      targetPort: 5432
  type: ClusterIP
```

### 3. 后端服务

```yaml
# backend/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: backend-config
  namespace: microservices
data:
  DATABASE_HOST: "postgres"
  DATABASE_PORT: "5432"
  DATABASE_NAME: "appdb"
  REDIS_HOST: "redis"
  REDIS_PORT: "6379"
  LOG_LEVEL: "info"
---
# backend/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: microservices
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: myregistry/backend:v1.0.0
        ports:
        - containerPort: 8080
        env:
        - name: DATABASE_HOST
          valueFrom:
            configMapKeyRef:
              name: backend-config
              key: DATABASE_HOST
        - name: DATABASE_USER
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: username
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 30
---
# backend/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: backend
  namespace: microservices
spec:
  selector:
    app: backend
  ports:
    - port: 8080
      targetPort: 8080
  type: ClusterIP
```

### 4. 前端服务

```yaml
# frontend/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: microservices
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: myregistry/frontend:v1.0.0
        ports:
        - containerPort: 80
        env:
        - name: API_URL
          value: "http://backend:8080"
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "100m"
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 5
---
# frontend/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: microservices
spec:
  selector:
    app: frontend
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP
```

### 5. Ingress 配置

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: microservices-ingress
  namespace: microservices
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - app.example.com
    secretName: app-tls
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend
            port:
              number: 8080
```

### 部署应用

```bash
# 创建密钥
kubectl create secret generic postgres-secret \
  --from-literal=username=appuser \
  --from-literal=password=securepassword \
  -n microservices

# 部署所有组件
kubectl apply -f namespace.yaml
kubectl apply -f database/
kubectl apply -f backend/
kubectl apply -f frontend/
kubectl apply -f ingress.yaml

# 查看部署状态
kubectl get all -n microservices

# 查看 Pod 日志
kubectl logs -f deployment/backend -n microservices
```

## 🔧 高级特性

### 1. 水平 Pod 自动伸缩（HPA）

```yaml
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
  namespace: microservices
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### 2. 垂直 Pod 自动伸缩（VPA）

```yaml
# vpa.yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: backend-vpa
  namespace: microservices
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  updatePolicy:
    updateMode: "Auto"
  resourcePolicy:
    containerPolicies:
    - containerName: backend
      maxAllowed:
        cpu: 1
        memory: 500Mi
      minAllowed:
        cpu: 100m
        memory: 50Mi
```

### 3. Pod 中断预算（PDB）

```yaml
# pdb.yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: backend-pdb
  namespace: microservices
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: backend
```

### 4. 网络策略

```yaml
# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-netpol
  namespace: microservices
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
  - to: []
    ports:
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53
```

## 🔐 安全最佳实践

### 1. RBAC（基于角色的访问控制）

```yaml
# rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-service-account
  namespace: microservices
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: microservices
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: microservices
subjects:
- kind: ServiceAccount
  name: app-service-account
  namespace: microservices
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

### 2. Pod 安全策略

```yaml
# security-context.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: secure-app
  template:
    metadata:
      labels:
        app: secure-app
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        runAsGroup: 3000
        fsGroup: 2000
      containers:
      - name: app
        image: nginx:1.21
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop:
            - ALL
        volumeMounts:
        - name: tmp-volume
          mountPath: /tmp
        - name: cache-volume
          mountPath: /var/cache/nginx
      volumes:
      - name: tmp-volume
        emptyDir: {}
      - name: cache-volume
        emptyDir: {}
```

### 3. 镜像安全扫描

```yaml
# admission-controller.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: admission-config
  namespace: kube-system
data:
  config.yaml: |
    imagePolicy:
      kubeConfigFile: /etc/kubernetes/admission-kubeconfig
      allowTTL: 30
      denyTTL: 30
      retryBackoff: 500
      defaultAllow: false
```

## 📊 监控和日志

### 1. Prometheus 监控

```yaml
# monitoring/prometheus.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      containers:
      - name: prometheus
        image: prom/prometheus:latest
        ports:
        - containerPort: 9090
        volumeMounts:
        - name: config-volume
          mountPath: /etc/prometheus
        - name: storage-volume
          mountPath: /prometheus
        command:
        - '/bin/prometheus'
        - '--config.file=/etc/prometheus/prometheus.yml'
        - '--storage.tsdb.path=/prometheus'
        - '--web.console.libraries=/etc/prometheus/console_libraries'
        - '--web.console.templates=/etc/prometheus/consoles'
      volumes:
      - name: config-volume
        configMap:
          name: prometheus-config
      - name: storage-volume
        emptyDir: {}
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
    - job_name: 'kubernetes-pods'
      kubernetes_sd_configs:
      - role: pod
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
```

### 2. 应用性能监控

```yaml
# app-monitoring.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: monitored-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: monitored-app
  template:
    metadata:
      labels:
        app: monitored-app
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
        prometheus.io/path: "/metrics"
    spec:
      containers:
      - name: app
        image: myregistry/app:v1.0.0
        ports:
        - containerPort: 8080
        env:
        - name: JAEGER_AGENT_HOST
          value: "jaeger-agent"
        - name: JAEGER_AGENT_PORT
          value: "6831"
```

## 🚀 CI/CD 集成

### 1. GitOps 工作流

```yaml
# .github/workflows/deploy.yml
name: Deploy to Kubernetes
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Configure kubectl
      uses: azure/k8s-set-context@v1
      with:
        method: kubeconfig
        kubeconfig: ${{ secrets.KUBE_CONFIG }}

    - name: Deploy to staging
      run: |
        kubectl apply -f k8s/staging/
        kubectl rollout status deployment/app -n staging

    - name: Run tests
      run: |
        kubectl run test-runner --image=test:latest --rm -i --restart=Never

    - name: Deploy to production
      if: success()
      run: |
        kubectl apply -f k8s/production/
        kubectl rollout status deployment/app -n production
```

### 2. Helm 包管理

```yaml
# helm/myapp/Chart.yaml
apiVersion: v2
name: myapp
description: A Helm chart for my application
type: application
version: 0.1.0
appVersion: "1.0.0"
```

```yaml
# helm/myapp/values.yaml
replicaCount: 2

image:
  repository: myregistry/myapp
  pullPolicy: IfNotPresent
  tag: "latest"

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  className: "nginx"
  annotations: {}
  hosts:
    - host: myapp.example.com
      paths:
        - path: /
          pathType: ImplementationSpecific
  tls:
    - secretName: myapp-tls
      hosts:
        - myapp.example.com

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
```

```bash
# Helm 部署命令
helm install myapp ./helm/myapp
helm upgrade myapp ./helm/myapp
helm rollback myapp 1
helm uninstall myapp
```

## 🔍 故障排除

### 1. 常用调试命令

```bash
# 查看集群状态
kubectl cluster-info
kubectl get nodes
kubectl top nodes

# 查看 Pod 状态
kubectl get pods --all-namespaces
kubectl describe pod <pod-name>
kubectl logs <pod-name> -c <container-name>
kubectl logs <pod-name> --previous

# 查看事件
kubectl get events --sort-by=.metadata.creationTimestamp

# 调试网络
kubectl run debug --image=busybox --rm -it --restart=Never -- sh
kubectl exec -it <pod-name> -- /bin/bash

# 查看资源使用
kubectl top pods
kubectl top nodes

# 检查服务和端点
kubectl get svc
kubectl get endpoints
kubectl describe svc <service-name>
```

### 2. 常见问题解决

```bash
# Pod 一直处于 Pending 状态
kubectl describe pod <pod-name>
# 检查资源请求、节点标签、污点容忍

# Pod 重启循环
kubectl logs <pod-name> --previous
# 检查健康检查、资源限制、应用错误

# 服务无法访问
kubectl get endpoints <service-name>
# 检查标签选择器、端口配置、网络策略

# 镜像拉取失败
kubectl describe pod <pod-name>
# 检查镜像名称、拉取策略、密钥配置
```

## 🎯 性能优化

### 1. 资源管理

```yaml
# resource-quotas.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: namespace-quota
  namespace: production
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    persistentvolumeclaims: "10"
    pods: "10"
    services: "5"
---
apiVersion: v1
kind: LimitRange
metadata:
  name: limit-range
  namespace: production
spec:
  limits:
  - default:
      cpu: "1"
      memory: "1Gi"
    defaultRequest:
      cpu: "100m"
      memory: "128Mi"
    type: Container
```

### 2. 集群调优

```bash
# kubelet 配置优化
# /var/lib/kubelet/config.yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
maxPods: 110
podsPerCore: 0
evictionHard:
  memory.available: "100Mi"
  nodefs.available: "10%"
  nodefs.inodesFree: "5%"
systemReserved:
  cpu: 100m
  memory: 100Mi
kubeReserved:
  cpu: 100m
  memory: 100Mi
```

### 3. 调度优化

```yaml
# node-affinity.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cache-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: cache-app
  template:
    metadata:
      labels:
        app: cache-app
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: node-type
                operator: In
                values:
                - memory-optimized
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - cache-app
              topologyKey: kubernetes.io/hostname
      containers:
      - name: cache
        image: redis:6
```

## 📚 最佳实践总结

### ✅ 部署最佳实践

- **🏷️ 使用标签和注解**: 统一资源标记和元数据管理
- **📦 容器化最佳实践**: 最小化镜像、非root用户、健康检查
- **🔧 资源限制**: 设置合理的CPU和内存请求/限制
- **🔄 滚动更新**: 使用滚动更新策略确保零停机
- **📊 监控和日志**: 集成全面的可观测性

### 🛡️ 安全最佳实践

- **🔐 RBAC**: 实施最小权限原则
- **🔒 网络策略**: 限制Pod间通信
- **🛡️ 安全上下文**: 使用非特权容器
- **🔑 密钥管理**: 使用Secret和外部密钥管理系统
- **🔍 安全扫描**: 定期扫描镜像和集群

### ⚡ 性能最佳实践

- **📈 水平扩展**: 使用HPA自动伸缩
- **🎯 节点选择**: 合理使用亲和性和反亲和性
- **💾 存储优化**: 选择合适的存储类型
- **🌐 网络优化**: 使用适当的网络插件
- **📊 监控调优**: 持续监控和优化

### 🔄 运维最佳实践

- **📋 GitOps**: 使用Git作为唯一真实源
- **🔄 CI/CD**: 自动化构建、测试和部署
- **🎭 多环境**: 开发、测试、生产环境隔离
- **💾 备份策略**: 定期备份etcd和持久化数据
- **📖 文档维护**: 保持文档和配置同步

## 🎓 学习路径建议

### 📈 进阶学习

1. **服务网格**: Istio、Linkerd
2. **无服务器**: Knative、OpenFaaS
3. **机器学习**: Kubeflow、MLOps
4. **边缘计算**: K3s、MicroK8s
5. **多集群管理**: Rancher、ArgoCD

### 🏆 认证考试

- **CKA**: Certified Kubernetes Administrator
- **CKAD**: Certified Kubernetes Application Developer
- **CKS**: Certified Kubernetes Security Specialist

通过系统学习和实践，你将能够熟练使用 Kubernetes 构建现代化的容器编排平台，实现高效、可靠的云原生应用部署和管理。

---

*💡 提示：建议从小规模集群开始练习，逐步扩展到生产级部署。*