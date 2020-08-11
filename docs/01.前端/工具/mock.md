---
title: MockJs
date: 2020-04-19 19:55:28
tags: tool
categories: tool
permalink: /pages/39a96d/
---
## 一、介绍

http://mockjs.com

为前端开发提供模拟数据

## 二、使用

### String

​    'name|min-max': string
​        "string|1-10": "★"//随机1－10个星
​        "string|3": "★★★" //3个3星，即9星

### Number

​    'name|+1': number
​        "number|+1": 202 //数字递增
​    'name|min-max': number
​        "number|1-100": 100 //1-100内随机
​    'name|min-max.dmin-dmax': number
​        "number|1-100.1-10": 1 //整数位1-100内随机，小数位数随机1-10位
​        "number|123.1-10": 1 //整数位固定123，小数位数随机1-10位
​        "number|123.3": 1  //整数位固定123，小数位数随机3位
​        "number|123.10": 1.123 //固定123.123，小数位后7位数随机

### Boolean

​    'name|1': boolean
​        "boolean|1": true //随机true或false

### Object

​    'name|count': object
​        "object|2": {       //随机2项
​            "310000": "上海市",
​            "320000": "江苏省",
​            "330000": "浙江省",
​            "340000": "安徽省"
​        }
​        "object|2-4": {       //随机2-4项
​            "110000": "北京市",
​            "120000": "天津市",
​            "130000": "河北省",
​            "140000": "山西省"
​        }

### Array

​    'name|1': array
​        "array|1": [ //随机获取一个成员
​            "AMD",
​            "CMD",
​            "UMD"
​        ]
​        "array|+1": [ //按次序轮流获取一个成员
​            "AMD",
​            "CMD",
​            "UMD"
​        ]
​        "array|1-10": [
​            {
​                "name|+1": [
​                    "Hello",·
​                    "Mock.js",
​                    "!"
​                ]
​            }
​        ]
​    'name|min-max': array  //随机复制次数数组成员，仍返回数组
​            "array|1-10": [
​                "Mock.js"
​            ]
​            "array|1-10": [
​                "Hello",
​                "Mock.js",
​                "!"
​            ]
​    'name|count': array //复制指定次数数组成员，仍返回数组
​        "array|3": [
​            "Mock.js"
​        ]
​        "array|3": [
​            "Hello",
​            "Mock.js",
​            "!"
​        ]

### RegExp

​    'regexp': /[a-z][A-Z][0-9]/  //匹配一个小写一个大写一个数字，"rL7"
​    'regexp': /\w\W\s\S\d\D/    //"L;\ne0y"
​    'regexp': /\d{5,10}/        //5-10位整数，"1397379"
​    'regexp|3': /\d{5,10}\-/    //"517305176-531837-967646851-07321438-"
​    'regexp|1-5': /\d{5,10}\-/  //"197685-57124-"



### Path

​    //数据占位符定义

        Basic
            boolean
                '@boolean()' //随机true或false
            natural
                '@natural()'    //随机自然数，4010302377033728
                '@natural(10000)' //随机自然数，最小10000
                '@natural(60, 100)' //随机60-100
            integer
                '@integer()'    //随机正负整数
                '@integer(10000)'
                '@integer(60, 100)'
            float
                '@float()'          //随机浮点数
                '@float(0)'         //排除负数
                '@float(60, 100)'   //指定范围
                '@float(60, 100, 3)'    //小数位最小3位
                '@float(60, 100, 3, 5)' //小数位随机3-5位
            character
                '@character()'  //随机单个字符，大小写字母及符号
                '@character("lower")'   //随机单个小写字母
                '@character("upper")'   //随机单个大写字母
                '@character("number")'  //随机单个数字
                '@character("symbol")'  //随机单个符号
                '@character("aeiou")'   //随机指定范围内的单个字符
            string
                '@string()'
                '@string(5)'
                '@string(7, 10)'
                '@string("lower", 5)'
                '@string("upper", 5)'
                '@string("number", 5)'
                '@string("symbol", 5)'
                '@string("aeiou", 1, 3)'
            range
                '@range(10)'        //[0,1,2,3,4,5,6,7,8,9]
                '@range(3, 7)'      //[3,4,5,6]
                '@range(1, 10, 2)'  //[1,3,5,7,9]
        Date
            date
                '@date()'               //"2010-02-10"
                '@date("yyyy-MM-dd")'   //"2014-11-30"
                '@date("yy-MM-dd")'     //"98-02-03"
                '@date("y-MM-dd")'      //"78-09-02"
                '@date("y-M-d")'        //"94-4-21"
                '@date("yyyy yy y MM M dd d")'  //"1990 90 90 05 5 22 22"
            time
            datetime
            now
            Image
            image
            dataImage
            Color
            color
            hex
            rgb
            rgba
            hsl
        Text
            paragraph
            sentence
            word
            title
            cparagraph
            csentence
            cword
            ctitle
            Name
            first
            last
            name
            cfirst
            clast
            cname
            Web
            url
            domain
            protocol
            tld
            email
            ip
            Address
            region
            province
            city
            county
            zip
            Helper
            capitalize
            upper
            lower
            pick
            shuffle
            Miscellaneous
            guid
            id
            increment



## 示例



```js
{
  "successed": true, 
  "status": 200, 
  "data": {
  	"page": 0, 
    "pageSize": 20, 
    "total": 120, 
    "list|20": [
      {
        "userID|+1": 29583, 
        "name|1": "@cfirst@clast", 
        "mobile|1": "13@integer(100000000,999999999)", 
        "departementName|1": "@ctitle(2,4)部", 
        "positionName|1": "@csentence(4)", 
        "email|1": "@email()", 
        "manageScope|1-2": [
          "南昌"
        ], 
        "createTime": "@date(\"yyyy-MM-dd\") @time(\"HH:mm:ss\")", 
        "sex|1": [
          -1, 
          1
        ], 
        "address": "@county(true)", 
        "cardId": "@id()", 
        "originPlace": "@city()", 
        "married|1": [
          0, 
          1, 
          2
        ], 
        "nation|1": [
          0, 
          1
        ], 
        "isManager|1": false, 
        "cardNo": "10001"
      }
    ]
  }, 
    "query": {
      "pageSize": "15", 
      "page": "1", 
      "keys": "", 
      "deptId": "1", 
      "corNode": "1"
    }
}
```



