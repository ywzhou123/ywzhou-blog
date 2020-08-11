---
title: nacos
date: 2020-08-11 19:41:36
permalink: /pages/534b55/
categories: 
  - Java
  - cloud
tags: 
  - 
---
# Nacos



## 介绍

[官方文档](https://nacos.io/zh-cn/docs/what-is-nacos.html)

[参考文档](https://blog.csdn.net/love1793912554/article/details/106233821/)



> Nacos 致力于帮助您发现、配置和管理微服务。
>
> Nacos 提供了一组简单易用的特性集，帮助您快速实现动态服务发现、服务配置、服务元数据及流量管理。
>
> Nacos 帮助您更敏捷和容易地构建、交付和管理微服务平台。 
>
> Nacos 是构建以“服务”为中心的现代应用架构 (例如微服务范式、云原生范式) 的服务基础设施。

- **服务发现和服务健康监测**
- **动态配置服务**
- **动态 DNS 服务**
- **服务及其元数据管理**



![image-20200806203009736](/img/java/image-20200806203009736.png)

![image-20200806205645431](/img/java/image-20200806205645431.png)

## 注册中心对比

Spring Cloud Eureka：

###### 优点：

> ```undefined
> 1）Spring Cloud 官方推荐
> 2）AP模型，数据最终一致性
> 3）开箱即用，具有控制台管理
> ```

#### 缺点：

> ```css
> 1）客户端注册服务上报所有信息，节点多的情况下，网络，服务端压力过大，且浪费内存
> 2）客户端更新服务信息通过简单的轮询机制，当服务数量巨大时，服务器压力过大。
> 3）集群伸缩性不强，服务端集群通过广播式的复制，增加服务器压力
> 4）Eureka2.0 闭源（Spring Cloud最新版本还是使用的1.X版本的Eureka）
> ```

Spring Cloud Zookeeper：

###### 优点：

> ```undefined
> 1）比较成熟的协调系统，dubbo，Spring cloud均可适配
> 2）CP模型，ZAB算法，数据强一致性
> ```

###### 缺点：

> ```undefined
> 1）维护成本较高，客户端，session状态，网络故障等问题，会导致服务异常
> 2）集群伸缩性限制，内存，GC和连接
> 3）无控制台管理
> ```

Spring cloud Consul：

###### 优点：

> ```undefined
> 1）适用于Service Mesh架构，使用于JAVA生态
> 2）AP模型，Raft+Gossip算法，数据最终一致性
> ```

###### 缺点：

> ```undefined
> 1）未经大规模市场验证，无法保证可靠性
> 2）Go语言编写，内部异常排查困难
> ```

Spring Cloud Nacos：

###### 优点：

> ```undefined
> 1）开箱即用，适用于dubbo，spring cloud
> 2）AP模型，数据最终一致性
> 3）注册中心，配置中心二合一，提供控制台管理
> 4）纯国产，久经双十一考验
> ```

###### 缺点：

> ```css
> 1）刚刚开源不久，社区热度不够，依然存在bug
> 2）0.5.0 注册服务无鉴权认证机制，存在风险
> ```



## 部署

1. 64 bit JDK 1.8+；[下载](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) & [配置](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/)。
2. Maven 3.2.x+；[下载](https://maven.apache.org/download.cgi) & [配置](https://maven.apache.org/settings.html)。
3. nacos-server-1.3.2.tar.gz; [下载](https://github.com/alibaba/nacos/releases/download/1.3.2/nacos-server-1.3.2.tar.gz)

4. tar -xvf nacos-server-1.3.2.tar.gz  && cd nacos/bin && sh startup.sh -m standalone
5. 默认启动在8848端口

## 配置

### 服务注册

```bash
curl -X POST 'http://127.0.0.1:8848/nacos/v1/ns/instance?serviceName=nacos.naming.serviceName&ip=20.18.7.10&port=8080'
```

### 服务发现

```bash
curl -X GET 'http://127.0.0.1:8848/nacos/v1/ns/instance/list?serviceName=nacos.naming.serviceName'
```

### 发布配置

```bash
curl -X POST "http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&group=test&content=HelloWorld"
```

### 获取配置

```bash
curl -X GET "http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&group=test"
```



## Spring Cloud 项目



- alibaba-nacos 自动完成了服务注册的工作

### pom.xml依赖文件

```xml
<!--必备: 注册中心客户端-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
<!--必备: 配置中心客户端-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

### bootstrap.yml配置文件

```properties
# Tomcat端口
server:
  port: 18002
spring:
	# 应用名称
  application:
    name: bms
  cloud:
    nacos:
      discovery:
	      # 服务注册地址
        server-addr: 192.168.15.44:18848
        # 注册命名空间
        namespace: c6d30215-938d-4750-836a-85fd10ca5142
      config:
	      # 配置中心地址
        server-addr: ${spring.cloud.nacos.discovery.server-addr}
        # 配置文件格式
        file-extension: yml
        # 共享配置
        shared-dataids: application-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}
        # 服务命名空间
        # namespace: c6d30215-938d-4750-836a-85fd10ca5142
        # 分组
        # group: DEV_GROUP
  profiles:
	  # 环境配置
    active: dev
```



> 项目会自动注册到nacos服务端：192.168.15.44:18848
>
> 将自动加 bms 服务的载配置文件：application-dev.yml

### 配置动态刷新

在业务类要加上注解 `@RefreshScope`开启动态刷新

### 启动类

```java
@SpringCloudApplication
@EnableDiscoveryClient
public class NacosApplication {
    public static void main(String[] args) {
        SpringApplication.run(NacosApplication.class, args);
    }
}
```

## 控制台

### 命名空间

- 默认是public空间，配置时不需要指定nameplace

- ### 指定配置命名空间就会到指定命名空间找配置文件，如果一个项目有多个环境也可以这么用。创建多个命名空间存放对应配置文件。

![image-20200810202333589](/img/java/image-20200810202333589.png)

### 服务

![image-20200806202541479](/img/java/image-20200806202541479.png)

### 配置

- 可以设置分组GROUP

![image-20200806202235289](/img/java/image-20200806202235289.png)

### bms-dev.yml

```yml
security:
  oauth2:
    client:
      client-id: pig
      client-secret: pig
      scope: server

spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    dynamic:
      druid:
        initialSize: 5
        minIdele: 5
        maxActive: 20
        maxWait: 600000
        timeBetweenEvictionRunsMillis: 600000
        minEvictableIdleTimeMillis: 300000
        validationQuery: SELECT 1 FROM DUAL
        testWhileIdle: true
        testOnBorrow: false
        testOnReturn: false
        poolPreparedStatements: true
        maxPoolPreparedStatementPerConnectionSize: 20
        useGlobalDataSourceStat: true
        connectionProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=500
        filters: stat,wall
        wall:
          commentAllow: true
          noneBaseStatementAllow: true
          truncate-allow: true
          commit-allow: true
        stat:
          slow-sql-millis: 2000
      primary: pssc
      datasource:
        pmcs:
          url: jdbc:oracle:thin:@(DESCRIPTION =(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.14.190)(PORT = 1521)))(CONNECT_DATA =(SERVICE_NAME = prss) ))
          username: ENC(JgHywJq77EoXjoui5ab+TA==)
          password: ENC(qXurqFrRIruu+00elj+KL3lcA363I2vh)
          driver-class-name: oracle.jdbc.driver.OracleDriver
        pssc:
          url: jdbc:oracle:thin:@(DESCRIPTION =(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.14.190)(PORT = 1521)))(CONNECT_DATA =(SERVICE_NAME = prss) ))
          username: ENC(EH4/K6XJzoFY76NvsGW5Pw==)
          password: ENC(W6C4Pkj7M8X4PyqEQ1XLWLi3pYAOK3K4)
          driver-class-name: oracle.jdbc.driver.OracleDriver
    jpa:
      hibernate:
        ddl-auto: update
      show-sql: true
```



### application-dev.yml

```yml
jasypt:
  encryptor:
    password: pigx
spring:
  redis:
    host: cloud-redis
    lettuce:
      pool:
        max-idle: 50
        max-active: 500
    timeout: 5000
  servlet:
    multipart:
      max-file-size: 100MB
      max-request-size: 100MB
  cloud:
    sentinel:
      transport:
        dashboard: cloud-sentinel:5020
management:
  endpoints:
    web:
      exposure:
        include: '*'
feign:
  sentinel:
    enabled: true
  okhttp:
    enabled: true
  httpclient:
    enabled: false
  client:
    config:
      default:
        connectTimeout: 10000
        readTimeout: 10000
  compression:
    request:
      enabled: true
    response:
      enabled: true
hystrix:
  command:
    default:
      execution:
        isolation:
          strategy: SEMAPHORE
          thread:
            timeoutInMilliseconds: 60000
  shareSecurityContext: true
ribbon:
  ReadTimeout: 10000
  ConnectTimeout: 10000
mybatis-plus:
  tenant-enable: true
  mapper-locations: classpath*:/mapper/*Mapper.xml
  global-config:
    banner: false
    db-config:
      id-type: auto
      field-strategy: NOT_EMPTY
  configuration:
    jdbc-type-for-null: 'null'
swagger:
  title: CloudPlatform Swagger API
  license: Powered By CLOUDX_CONFIG
  licenseUrl: https://tellhowsoft.com/
  terms-of-service-url: https://tellhowsoft.com/
  contact:
    email: rdcenter@tellhow.com
    url: https://tellhowsoft.com/about.html
  authorization:
    name: pigX OAuth
    auth-regex: ^.*$
    authorization-scope-list:
      - scope: server
        description: server all
    token-url-list:
      - http://${GATEWAY-HOST:cloud-gateway}:${GATEWAY-PORT:9999}/auth/oauth/token
security:
  encode:
    key: 'ThCloudXXThCloud'
  oauth2:
    client:
      ignore-urls:
        - /actuator/**
        - /v2/api-docs
        - /rest/**
        - /query/process-definition/**
        - /query/highlights/**
        - /query/processInstanceDetail/**
    resource:
      loadBalanced: true
      token-info-uri: http://${AUTH-HOST:cloud-auth}/oauth/check_token
      #token-info-uri: http://192.168.14.162:3000/oauth/check_token
appliction:
  rrcs:
    params:
      appliction-name: rrcs
  cscs:
    params:
      appliction-name: cscs
  dnos:
    params:
      appliction-name: dnos
  dnoms:
    params:
      appliction-name: dnoms
  ippcs:
    params:
      appliction-name: ippcs
  psrcs:
    params:
      appliction-name: psrcs
  aps:
    params:
      appliction-name: aps
  pecs:
    params:
      appliction-name: pecs
  iss:
    params:
      appliction-name: iss
  bms:
    params:
     appliction-name: bms

isc:
  config:
    user-role-address: "http://192.168.14.202:19000/sgpssc/iscintegrate/rest/info/user/roles/"
    user-detail-address: "http://192.168.14.202:19000/sgpssc/iscintegrate/rest/info/user/detail/"
    user-menu-address: "http://192.168.14.202:19000/sgpssc/iscintegrate/rest/common/menutree/load"
    system-id: "8a6a90485b57b4d4015b83de8dd80e19"
```
:::



### 节点

![image-20200806204719001](/img/java/image-20200806204719001.png)

> 项目启动后可以看到本机ip:port已注册到nacos，可进行权重设置及上下线操作





## 元数据

Nacos数据（如配置和服务）描述信息，如服务版本、权重、容灾策略、负载均衡策略、鉴权配置、各种自定义标签 (label)，从作用范围来看，分为服务级别的元信息、集群的元信息及实例的元信息。



1、提供描述信息
2、让微服务调用更加灵活(例如：微服务版本控制)