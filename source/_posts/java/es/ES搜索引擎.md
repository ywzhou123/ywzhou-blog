# 一、搜索技术选型
## 1、搜索需求
    空格
    拆词
    搜索内容高亮
    海量数据查询

## 2、分布式搜索引擎
    Lucene: java类库，搜索引擎的鼻祖
    Solr: 基于lucene的开源项目 
    Elasticsearch: 基于lucene，分布式，restful风格

# 二、ES术语
## 1、索引index
    表
## 2、文档document
    行
## 3、字段fields
    列
## 4、映射mapping
    表结构定义
## 5、近实时NRT
    near real time 新增的数据搜索延时1s左右
## 6、节点node
    服务器
## 7、shard
    数据分片
## 8、replica
    备份

# 三、安装
[Elasticsearch下载](https://www.elastic.co.cn/downloads/)
下载解压到/usr/local/elasticsearch
修改配置文件
    config/elasticearch.yml
```
# 集群名称
cluster.name: my-elasticsearch
# 节点名称
node.name: es-node0
# 数据路径
path.data: /usr/local/elasticsearch/data
# 日志路径
path.logs: /usr/local/elasticsearch/logs
# 绑定ip
network.host: 0.0.0.0
# 端口
http.port: 9200
# 集群节点
cluster.initial_master_nodes: ["es-node0"]

```

    jvm.options
        默认xms和xmx都是1g，虚拟机内存没这么大，修改一下即可
```
-Xms128m
-Xmx128m
```
创建用户（不能以root用户启动）
useradd esuser
chown -R esuser:esuser /usr/local/elasticsearch
su esuser
./elasticsearch -d

http://localhost:9200
9200：Http协议，用于外部通讯
9300：Tcp协议，ES集群之间是通过9300通讯

报错分析：
    最大虚拟内存至少262144
    vim /etc/security/limits.conf
```
* soft nofile 65536
* hard nofile 131072
* soft nproc 2048
* hard nproc 4096
```
    vi /etc/sysctl.conf
```
vm.max_map_count=262145
```
    sysctl -p

# 四、ES可视化
[elasticsearch-head](gitlub)
推荐使用chrome扩展插件方式

## 1、操作
集群健康
GET     /_cluster/health
创建索引
PUT     /index_test
{
    "settings": {
        "index": {
            "number_of_shards": "2",
            "number_of_replicas": "0"
        }
    }
}
查看索引
GET     _cat/indices?v

删除索引
DELETE      /index_test

 创建索引的同时创建mappings
 PUT     /index_mapping
{
    "mappings": {
        "properties": {
            "realname": {
                "type": "text",
                "index": true // 默认是ture
            },
            "username": {
                "type": "keyword", // 不会被会词，精确查找
                "index": false // 不会被索引
            }
        }
    }
}

查看分词效果
GET         /index_mapping/_analyze
{
    "field": "realname",
    "text": "imooc is good"
}

尝试修改
POST        /index_mapping/_mapping
{
    "properties": {
        "name": {
               "type": "long"
        }
    }
}

为已存在的索引创建或创建mappings
POST        /index_mapping/_mapping
{
    "properties": {
        "id": {
            "type": "long"
        },
        "age": {
            "type": "integer"
        },
        "nickname": {
            "type": "keyword"
        },
        "money1": {
            "type": "float"
        },
        "money2": {
            "type": "double"
        },
        "sex": {
            "type": "byte"
        },
        "score": {
            "type": "short"
        },
        "is_teenager": {
            "type": "boolean"
        },
        "birthday": {
            "type": "date"
        },
        "relationship": {
            "type": "object"
        }
    }
}

添加文档数据
POST /my_doc/_doc
{
    "id": 1001,
    "name": "imooc-1",
    "desc": "imooc is very good, 慕课网非常牛！",
    "create_date": "2019-12-24"
}


    注：如果索引没有手动建立mappings，那么当插入文档数据的时候，会根据文档类型自动设置属性类型。这个就是es的动态映射，帮我们在index索引库中去建立数据结构的相关配置信息。
    “fields”: {“type”: “keyword”}
    对一个字段设置多种索引模式，使用text类型做全文检索，也可使用keyword类型做聚合和排序
    “ignore_above” : 256
    设置字段索引和存储的长度最大值，超过则被忽略

删除文档
DELETE /my_doc/_doc/1
修改文档
局部：
POST /my_doc/_doc/1/_update
{
    "doc": {
        "name": "慕课"
    }
}
替换
PUT /my_doc/_doc/1
{
     "id": 1001,
    "name": "imooc-1",
    "desc": "imooc is very good, 慕课网非常牛！",
    "create_date": "2019-12-24"
}

查询文档
GET /index_demo/_doc/1
GET /index_demo/_doc/_search
GET /index_demo/_doc/1?_source=id,name
GET /index_demo/_doc/_search?_source=id,name
{
    "_index": "my_doc",
    "_type": "_doc",
    "_id": "2",
    "_score": 1.0,
    "_version": 9,
    "_source": {
        "id": 1002,
        "name": "imooc-2",
        "desc": "imooc is fashion",
        "create_date": "2019-12-25"
    }
}

判断文档是否存在
HEAD /index_demo/_doc/1

判断文档是否存在
HEAD /index_demo/_doc/1


文档乐观锁控制 if_seq_no与if_primary_term

POST    /my_doc/_doc/{_id}/_update?if_seq_no={数值}&if_primary_term={数值}
{
    "doc": {
        "name": "慕课1"
    }
}
## 2、分词查询
把文本转换为一个个的单词，分词称之为analysis。es默认只对英文语句做分词，中文不支持，每个中文字都会被拆分为独立的个体。

POST /my_doc/_analyze
{
    "analyzer": "standard",
    "field": "name",
    "text": "text文本"
}

内置分词器：
standard：默认分词，单词会被拆分，大小会转换为小写。
simple：按照非字母分词。大写转为小写。
whitespace：按照空格分词。忽略大小写。
stop：去除无意义单词，比如the/a/an/is…
keyword：不做分词。把整个文本作为一个单独的关键词。

中文分词器：
https://github.com/medcl/elasticsearch-analysis-ik
下载解压到es的plugins目录下
POST /_analyze
{
    "analyzer": "ik_max_word",
    "text": "上下班车流量很大"
}

自定义中文词库
在{es}/plugins/ik/config下
vim custom.dic
配置自定义扩展词典
<entry key="ext_dict">custom.dic</entry>




## 3、DSL搜索
    Domain Specific Language
    特定领域语言
    基于JSON格式的数据查询
    查询更灵活，有利于复杂查询
### 3.1、请求参数的方式查询
    GET     /shop/_doc/_search?q=desc:慕课网
    GET     /shop/_doc/_search?q=nickname:慕&q=age:25
### 3.2、DSL基本语法
    ```
    # 查询
    POST     /shop/_doc/_search
    {
        "query": {
            "match": {
                "desc": "慕课网"
            }
        }
    }
    # and查询：分词后的词语都匹配到，默认是or匹配到任意词语都返回
    {
        "query": {
            "match": {
                "desc": "慕课网",
                "operator": "and"
            }
        }
    }
    # 最低匹配精度：分词后的词语个数，最少同时匹配到多少个或百分多少
    {
        "query": {
            "match": {
                "desc": {
                    "query": "女友生日送我好玩的xbox游戏机",
                    "minimum_should_match": "60%"
                }
            }
        }
    }
    # 判断某个字段是否存在
    {
        "query": {
            "exists": {
                "field": "desc"
            }
        }
    }
    # 根据文档主键ids搜索
    {
        "query": {
            "ids": {
                "type": "_doc",
                "values": ["1001", "1010", "1008"]
            }
        }
    }
    ```

### 3.3、 查询所有
    ```
    GET     /shop/_doc/_search
    ```

    ```
    POST     /shop/_doc/_search
    {
        "query": {
            "match_all": {}
        },
        "_source": ["id", "nickname", "age"]
    }
    ```

### 3.4、 查询分页
    ```
    {
        "query": {
            "match_all": {}
        },
        "from": 0,
        "size": 10
    }
    ```

### 3.5、 精确搜索
    ```
    {
        "query": {
            "term": {
                "desc": "慕课网"
            }
        }
    }
    {
        "query": {
            "terms": {
                "desc": ["慕课网", "学习", "骚年"]
            }
        }
    }
    ```

### 3.6、 短语匹配
match：分词后只要有匹配就返回
match_phrase：分词结果必须在text字段分词中都包含，而且顺序必须相同，而且必须都是连续的。（搜索比较严格）

    ```
    {
        "query": {
            "match_phrase": {
                "desc": {
                    "query": "大学 毕业 研究生",
                    "slop": 2
                }
            }
        }
    }
    ```
slop：允许词语间跳过的数量

### 3.7、 多个字段中进行查询

    ```
    {
        "query": {
            "multi_match": {
                    "query": "皮特帕克慕课网",
                    "fields": ["desc", "nickname^10 "]
            }
        }
    }
    ```
nickname^10 代表搜索提升10倍相关性，也就是说用户搜索的时候其实以这个nickname为主，desc为辅，nickname的匹配相关度当然要提高权重比例了。


### 3.8、 布尔查询
must：查询必须匹配搜索条件，譬如 and
should：查询匹配满足1个以上条件，譬如 or
must_not：不匹配搜索条件，一个都不要满足

    ```
    {
        "query": {
            "bool": {
                "must": [
                    {
                        "multi_match": {
                            "query": "慕课网",
                            "fields": ["desc", "nickname"]
                        }
                    },
                    {
                        "term": {
                            "sex": 1
                        }
                    },
                    {
                        "term": {
                            "birthday": "1996-01-14"
                        }
                    }
                ]
            }
        }
    }

    {
        "query": {
            "bool": {
                "should（must_not）": [
                    {
                        "multi_match": {
                            "query": "学习",
                            "fields": ["desc", "nickname"]
                        }
                    },
                    {
                        "match": {
                            "desc": "游戏"
                        }   
                    },
                    {
                        "term": {
                            "sex": 0
                        }
                    }
                ]
            }
        }
    }
    ```

### 3.9、 过滤器
post_filter：用于查询后，对结果数据的筛选
gte：大于等于
lte：小于等于
gt：大于
lt：小于

    ```
    {
        "query": {
            "match": {
                "desc": "慕课网游戏"
            }   
        },
        "post_filter": {
            "range": {
                "money": {
                    "gt": 60,
                    "lt": 1000
                }
            }
        }   
    }
    ```

### 3.10、 排序
可以desc也可以asc。也支持组合排序。

    ```
    {
        "query": {
            "match": {
                "desc": "慕课网游戏"
            }
        },
        "sort": [
            {
                "age": "desc"
            },
            {
                "money": "desc"
            }
        ]
    }
    ```


#### 对文本排序

    由于文本会被分词，所以往往要去做排序会报错，通常我们可以为这个字段增加额外的一个附属属性，类型为keyword，用于做排序。

创建新的索引
POST        /shop2/_mapping
{
    "properties": {
        "id": {
            "type": "long"
        },
        "nickname": {
            "type": "text",
            "analyzer": "ik_max_word",
            "fields": {
                "keyword": {
                    "type": "keyword"
                }
            }
        }
    }
}
排序
{
    "sort": [
        {
            "nickname.keyword": "desc"
        }
    ]
}

### 3.11、 高亮显示
默认使用```<em></em>```标签将匹配到的词包起来，前端设置样式即可

POST     /shop/_doc/_search
{
    "query": {
        "match": {
            "desc": "慕课网"
        }
    },
    "highlight": {
        "pre_tags": ["<tag>"],
        "post_tags": ["</tag>"],
        "fields": {
            "desc": {}
        }
    }
}

### 3.12 prefix根据前缀去查询

POST     /shop/_doc/_search
{
    "query": {
        "prefix": {
            "desc": "imo"
        }
    }
}

### 3.13、 fuzzy模糊搜索

    并不是指的sql的模糊搜索，而是用户在进行搜索的时候的打字错误现象，搜索引擎会自动纠正，然后尝试匹配索引库中的数据。

POST     /shop/_doc/_search
{
  "query": {
    "fuzzy": {
      "desc": "imoov.coom"
    }
  }
}

    或多字段搜索

{
  "query": {
    "multi_match": {
      "fields": [ "desc", "nickname"],
      "query": "imcoc supor",
      "fuzziness": "AUTO"
    }
  }
}

{
  "query": {
    "multi_match": {
      "fields": [ "desc", "nickname"],
      "query": "演说",
      "fuzziness": "1"
    }
  }
}


###  3.14、wildcard占位符查询

    ?：1个字符
    *：1个或多个字符

POST     /shop/_doc/_search
{
  "query": {
    "wildcard": {
      "desc": "*oo?"
    }
  }
}
{
    "query": {
        "wildcard": {
            "desc": "演*"
        }
    }
}










# 四、深度分页
其实就是搜索的深浅度，比如第1页，第2页，第10页，第20页，是比较浅的；第10000页，第20000页就是很深了。
## 深度分页
{
    "query": {
        "match_all": {}
    },
    "from": 9999,
    "size": 10
}

    我们在获取第9999条到10009条数据的时候，其实每个分片都会拿到10009条数据，然后集合在一起，总共是10009*3=30027条数据，针对30027数据再次做排序处理，最终会获取最后10条数据。
    es不支持超过10000条以上的数据搜索；
    应该避免深度分页操作（限制分页页数），比如最多只能提供100页的展示。

## 修改最大搜索量限制
GET     /shop/_settings
POST    /shop/_settings
{
    "index.max_result_window": 100000
}

## 滚动搜索
    一次性查询1万+数据，往往会造成性能影响，因为数据量太多了。这个时候可以使用滚动搜索，也就是 scroll。

    滚动搜索可以先查询出一些数据，然后再紧接着依次往下查询。在第一次查询的时候会有一个滚动id，相当于一个锚标记，随后再次滚动搜索会需要上一次搜索的锚标记，根据这个进行下一次的搜索请求。每次搜索都是基于一个历史的数据快照，查询数据的期间，如果有数据变更，那么和搜索是没有关系的，搜索的内容还是快照中的数据。

    scroll=1m，相当于是一个session会话时间，搜索保持的上下文时间为1分钟。
第一次搜索
POST    /shop/_search?scroll=1m
{
    "query": { 
        "match_all": {
        }
    },  
    "sort" : ["_doc"], 
    "size":  5
}
后续搜索
POST    /_search/scroll
{
    "scroll": "1m", 
    "scroll_id" : "your last scroll_id"
}
   
## 批量查询
POST    /shop/_doc/_mget
{
    ids: ["1001", "1003", "10015"]
}
查询不到也会返回： "found": false
## 批量操作
    create新增文档数据，在metadata中指定index以及type

POST    /_bulk
{"create": {"_index": "shop2", "_type": "_doc", "_id": "2001"}}
{"id": "2001", "nickname": "name2001"}
{"create": {"_index": "shop2", "_type": "_doc", "_id": "2002"}}
{"id": "2002", "nickname": "name2002"}
{"create": {"_index": "shop2", "_type": "_doc", "_id": "2003"}}
{"id": "2003", "nickname": "name2003"}
    
    create创建已有id文档，在url中指定index和type

POST    /shop/_doc/_bulk
{"create": {"_id": "2003"}}
{"id": "2003", "nickname": "name2003"}
{"create": {"_id": "2004"}}
{"id": "2004", "nickname": "name2004"}
{"create": {"_id": "2005"}}
{"id": "2005", "nickname": "name2005"}

    index创建，已有文档id会被覆盖，不存在的id则新增

POST    /shop/_doc/_bulk
{"index": {"_id": "2004"}}
{"id": "2004", "nickname": "index2004"}
{"index": {"_id": "2007"}}
{"id": "2007", "nickname": "name2007"}
{"index": {"_id": "2008"}}
{"id": "2008", "nickname": "name2008"}

    update跟新部分文档数据

POST    /shop/_doc/_bulk
{"update": {"_id": "2004"}}
{"doc":{ "id": "3004"}}
{"update": {"_id": "2007"}}
{"doc":{ "nickname": "nameupdate"}}

    delete批量删除

POST    /shop/_doc/_bulk
{"delete": {"_id": "2004"}}
{"delete": {"_id": "2007"}}

    综合批量各种操作

POST    /shop/_doc/_bulk
{"create": {"_id": "8001"}}
{"id": "8001", "nickname": "name8001"}
{"update": {"_id": "2001"}}
{"doc":{ "id": "20010"}}
{"delete": {"_id": "2003"}}
{"delete": {"_id": "2005"}}



# 五、ES集群

# ES与数据库同步


# 六、SpringBoot整合ES

# ES的geo坐标搜索