---
title: Spring
date: 2020-08-11 19:41:36
permalink: /pages/4e27c4/
categories: 
  - Java
  - cloud
tags: 
  - 
---
# Spring

[官网](https://spring.io)

## 简介

​	Spring 是一个开源框架，是为了解决企业应用程序开发复杂性而创建的。框架的主要优势之一就是其分层架构，分层架构允许您选择使用哪一个组件，同时为 J2EE 应用程序开发提供集成的框架。

	面向方面的程序设计（AOP）
		横切关注点
			一个程序中跨越多个点的功能
		关于方面的例子
			比如日志记录、声明性事务、安全性，和缓存等等


		AOP 帮助你将横切关注点从它们所影响的对象中分离出来
		依赖注入帮助你将你的应用程序对象从彼此中分离出来


	Spring 框架
		核心容器
			主要组件是 BeanFactory
			使用控制反转 （IOC） 模式将应用程序的配置和依赖性规范与实际的应用程序代码分开
		Context
			配置文件
			JNDI、EJB、电子邮件、国际化、校验和调度
		AOP
			直接将面向方面的编程功能集成到了 Spring 框架中
			提供了事务管理服务
		DAO
			管理异常处理和不同数据库供应商抛出的错误消息
		ORM
			提供了 ORM 的对象关系工具
			包括 JDO、Hibernate 和 iBatis SQL Map
		Web 模块
			为基于 Web 的应用程序提供了上下文
			支持与 Jakarta Struts 的集成
		MVC 框架
			是一个全功能的构建 Web 应用程序的 MVC 实现
			通过策略接口，MVC 框架变成为高度可配置的
			包括 JSP、Velocity、Tiles、iText 和 POI。

新一代JavaEE开发标准

习惯优于配置



- Spring1.x

通过xml文件配置Bean，需要频繁分放配置到不同的配置文件中

- Spring2.x

使用注解对Bean进行申明和注入，减少了xml配置文件

建议应用基本配置使用xml，如数据源、资源文件

业务开发使用注解，如Servise中注入Bean

- Spring3.x

提供了Java配置文式，更好的理解你配置的Bean

- Spring5.x

支持响应式的Web框架，提供了完整的端到端响应式编程的支持（WebFlux模块）

 