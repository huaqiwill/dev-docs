# Java学习路线

Java学习路线

> https://github.com/liyupi/codefather/blob/main/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF/Java%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF%20by%20%E7%A8%8B%E5%BA%8F%E5%91%98%E9%B1%BC%E7%9A%AE.md



参考：https://zhuanlan.zhihu.com/p/599706352



在后端开发中你可能经常听说到「中间件」这个词，中间件技术创建在对应用软件部分常用功能的抽象上，将常用且重要的过程调用、分布式组件、消息队列、事务、安全、链接器、商业流程、网络并发、HTTP 服务器、Web Service 等功能集于一身或者分别在不同品牌的不同产品中分别完成。

也把中间件定义为「平台+通信」。这个定义限定了只有用于分布式系统中的此类软件才能被称为中间件，同时此定义也把中间件与实际应用的应用软件区分开来。

大白话来说，中间件就是把分布式系统中一些通用功能的抽象出来提供服务的一类软件统称。它屏蔽掉了底层操作系统的复杂性，白上提供一个统一的开发环境，降低了软件系统开发的复杂度，由于中间他是介于操作系统和应用软件之间，为应用软件提供服务功能的软件，由于介于两种软件之间，所以称为中间件。
常见的的开源中间件有下面几种，组合起来就能搭建一个完整的。分布式后台服务系统:

消息队列中间件：
Kafka、RabbitMQ、ActiveMQ、RocketMQ
web server 中间件：
Nginx（部署运维中间件）、OpenResty、Tomcat...
应用服务中间件：
weblogic、jetty
缓存中间件：
服务端缓存包括 Redis、Memcached...
RPC框架：
Tars、Dubbo、gRPC、Thrift
数据库中间件：mycat、Sharding jdbc
日志系统中间件：
ELKB指的是一套解决方案，是Elasticsearch、Logstash 、 Kibana、Beats是这 4 种软件产品的首字母缩写。
配置中心中间件：
Apollo、zookeeper（分布式协调中间件） 统一配置管理 oAPI 网关，开源项目有 Tyk、kong、zuul、orange...
事务处理中间件：
seata、JDTX

主流中间件汇总，学完头发没了......把市面上经常用的或者招聘要求中眼熟的几个先学会，其他的用到的时候再学也不迟。

网关：Nginx、Kong、Zuul
缓存：Redis、MernCached、OsCache, EhCache
搜素：ElasticSearch. Solr
熔断：Hystrix.resillence4
负载均衡：DNS、 F5. LVS、 Nginx. OpenResty, HAproxy
注册中心：Eureka, Zookeeper 、Redis. Etcd. Consul
认证鉴权：JWT、SpringSecurity
消费队列：RabbitMQ. Kafka、RocketMQ、Activea. Redis
系统监控：Gratana， Prometheus, Intluxdb, Telegraf、 Lepus
文件系统：OSS、 NFS、FastDFS、MogileFsRPC框架：Dubbo、Motan. Thrift, grpc
构建工具：Maven. Gradle
集成部署：Docker、 Jenkins. Git . Maven
分布式配置：Disconf、 Apollo. Spring Cloud Config. Diamond
压测：LoadRunner、 JMeter、 AB、 webbench
数据库：MysQL• Redis. MongoDB、PostgresQL-、 Memcache 、 HBase
网络：专用网络VPC、弹性公网P、CDN
数据库中间件：DRDS, Mycat, 360 Atlas, Cobar
分布式框架：Dubbo、 Motan、Spring-Could
分布式任务：xxL-JOB、Elastic-Job、Saturn. Quartz
分布式追踪：Pinpoint. CAT. zipkin
分布式日志：elasticsearch, logstash. Kibana 、redis. kafka
版本发布：蓝绿部書、A/B测试、灰度发布/金丝雀发布