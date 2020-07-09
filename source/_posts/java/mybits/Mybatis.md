# 一、简介
    MyBatis 是一款优秀的持久层框架，
    它支持定制化 SQL、存储过程以及高级映射。

    使用简单的 XML 或注解来配置和映射原生类型、接口和 Java 的 POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

# 二、xml映射文件

    一般位于xxxx-mapper\src\main\resources\mapper\xxxx.xml

##  1、映射查询语句

    示例：
    ```
    <select id="selectPerson" parameterType="int" resultType="hashmap">
      SELECT * FROM PERSON WHERE ID = #{id}
    </select>
    ```

    属性分析：
    ```
    <select
      id="selectPerson" 在命名空间中唯一的标识符，可以被Mapper用来引用这条语句。
      parameterType="int" 传入参数类型
      parameterMap="deprecated" 已经被废弃
      resultType="hashmap" 返回的期望类型，不能和resultMap同时使用
      resultMap="personResultMap" 外部resultMap标签的命名引用，
      flushCache="false" 调用时是否刷新本地缓存和二级缓存
      useCache="true" 结果被二级缓存缓存起来，默认对 select 元素为 true
      timeout="10" 这个设置是在抛出异常之前，驱动程序等待数据库返回请求结果的秒数。
      fetchSize="256" 让驱动程序每次批量返回的结果行数和这个设置值相等。 
      statementType="PREPARED" STATEMENT，PREPARED 或 CALLABLE
      resultSetType="FORWARD_ONLY" FORWARD_ONLY，SCROLL_SENSITIVE, SCROLL_INSENSITIVE 或 DEFAULT
    >
    ```

## 2、映射插入语句

    示例：
    ```
    <insert id="insertAuthor">
      insert into Author (id,username,password,email,bio)
      values (#{id},#{username},#{password},#{email},#{bio})
    </insert>
```

    属性分析：
    ```
    <insert
      id="insertAuthor"
      parameterType="domain.blog.Author"
      flushCache="true"
      statementType="PREPARED"
      keyProperty=""
      keyColumn=""
      useGeneratedKeys="" 取出由数据库内部生成的主键，默认false
      timeout="20">
    ```

## 3、映射更新语句

    示例：
    ```
    <update id="updateAuthor">
      update Author set
        username = #{username},
        password = #{password},
        email = #{email},
        bio = #{bio}
      where id = #{id}
    </update>
    ```

    属性分析：
    ```
    <update
      id="updateAuthor"
      parameterType="domain.blog.Author"
      flushCache="true"
      statementType="PREPARED"
      timeout="20">
    ```

## 4、映射删除语句

    示例：
    ```
    <delete id="deleteAuthor">
      delete from Author where id = #{id}
    </delete>
    ```

    属性分析：
    ```
    <delete
      id="deleteAuthor"
      parameterType="domain.blog.Author"
      flushCache="true"
      statementType="PREPARED"
      timeout="20">
    ```

## 5、sql  可被其他语句引用的可重用语句块

    示例：
    ```
    <sql id="userColumns"> 
        ${alias}.id,${alias}.username,${alias}.password 
    </sql>
    ```

    上面这个 SQL 片段可以被包含在其他语句中
    ```
    <select id="selectUsers" resultType="map">
      select
        <include refid="userColumns"><property name="alias" value="t1"/></include>,
        <include refid="userColumns"><property name="alias" value="t2"/></include>
      from some_table t1
        cross join some_table t2
    </select>
    ```

    示例
    ```
    <sql id="sometable">
      ${prefix}Table
    </sql>
    <sql id="someinclude">
      from
        <include refid="${include_target}"/>
    </sql>
    <select id="select" resultType="map">
      select
        field1, field2, field3
      <include refid="someinclude">
        <property name="prefix" value="Some"/>
        <property name="include_target" value="sometable"/>
      </include>
    </select>
    ```

## 6、resultMap  用来描述如何从数据库结果集中来加载对象

    解决列名不匹配的另外一种方式

    示例：
    ```
      <resultMap id="myNewItemsVO" type="com.imooc.pojo.vo.NewItemsVO">
        <id column="rootCatId" property="rootCatId"></id>
        <result column="rootCatName" property="rootCatName"></result>
        <result column="slogan" property="slogan"></result>
        <result column="catImage" property="catImage"></result>
        <result column="bgColor" property="bgColor"></result>
        <collection property="simpleItemList" ofType="SimpleItemVO">
          <id column="itemId" property="itemId"></id>
          <result column="itemName" property="itemName"></result>
          <result column="itemUrl" property="itemUrl"></result>
          <result column="createdTime" property="createdTime"></result>
        </collection>
      </resultMap>
    ```
    在引用它的语句中使用 resultMap 属性就行了
    ```
        <select id="getNewItems" resultMap="myNewItemsVO">...</select>
    ```
