# Server与Web通过Docker-Compose部署文档
## 前期部署准备
### 环境依赖
1. Docker
2. Docker-Compose 3.0以上版本

### 服务部署顺序
1. Server服务
2. Web服务

注：Docker-Compose部署脚本已包含mysql、redis服务部署操作

### 服务部署权限说明
#### 网络权限服务部署
1. 需要开放80、8000端口的访问权限(80为TCA平台访问端口，8000为TCA Server访问端口)

## 服务部署

### 首次启动
拉取代码并进入源码根目录后，执行 ``./compose_init.sh`` 命令，即可启动Server与Web服务
注：
1. 如果提示脚本没有执行权限，可以在源码执行命令：``chmod +x compose_init.sh``
2. 首次启动会构建相关镜像，耗时会比较久

``compose_init.sh``脚本会包含各个服务的初始化操作

### 非首次启动
进入源码目录后，执行``docker-compose up -d``命令，即可启动Server与Web服务

## 常见问题
Q：如何查看服务启动的日志：
A：可以先找服务名称，执行``docker-compose logs -f xxx``，xxx即服务的名称，比如``main-server``、``main-worker``等