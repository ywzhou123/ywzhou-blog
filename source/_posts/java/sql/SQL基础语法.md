# 一、SELECT - 从数据库中提取数据
	按列查
		SELECT name,country FROM Websites;

	查所有列
		SELECT * FROM Websites;

	DISTINCT去重
		SELECT DISTINCT country FROM Websites;

	WHERE条件过滤
		比较过滤
			SELECT * FROM Websites WHERE country='CN';
				=	等于
				<>	不等于。注释：在 SQL 的一些版本中，该操作符可被写成 !=
				>	大于
				<	小于
				>=	大于等于
				<=	小于等于
		逻辑运算
			SELECT * from emp WHERE sal > 2000 AND sal < 3000;
			SELECT * from emp WHERE sal > 2000 OR comm > 500;
			SELECT * from emp WHERE NOT sal > 1500;
			SELECT * FROM Websites WHERE alexa > 15 AND (country='CN' OR country='USA');
		特殊条件
			SELECT * from emp WHERE comm IS NULL;
			SELECT * from emp WHERE sal BETWEEN 1500 AND 3000;
			SELECT * FROM Websites WHERE name BETWEEN 'A' AND 'H';
				介于 'A' 和 'H' 之间字母开始的所有网站
			SELECT * FROM access_log WHERE date BETWEEN '2016-05-10' AND '2016-05-14';
			SELECT * from emp WHERE sal IN (5000,3000,1500);
			SELECT * from emp WHERE ename LIKE 'M%';
				 % 表示多个字值
				 _ 下划线表示一个字符
				 [charlist] 字符列中的任何单一字符
				 [^charlist] 不在字符列中的任何单一字符
				 [!charlist] 不在字符列中的任何单一字符
	
	ORDER BY排序
		默认ASC升序，指定DESC降序
		SELECT * FROM Websites ORDER BY alexa;
		SELECT * FROM Websites ORDER BY alexa DESC;
		SELECT * FROM Websites ORDER BY country, alexa DESC;
			先按country升序，再在相同country列中按alexa降序排列
	
	LIMIT数量
		SELECT * FROM Websites LIMIT 2; 

		SQL Server 语法
			SELECT TOP number|percent column_name(s)
			FROM table_name;
		Oracle 语法
			SELECT column_name(s)
			FROM table_name
			WHERE ROWNUM <= number;

	AS别名
		列的别名
			SELECT name AS n, country AS c FROM Websites;
			SELECT name, CONCAT(url, ', ', alexa, ', ', country) AS site_info FROM Websites;
				把三个列（url、alexa 和 country）结合在一起，并创建一个名为 "site_info" 的新列
		表的别名
			SELECT w.name, w.url, a.count, a.date 
			FROM Websites AS w, access_log AS a 
			WHERE a.site_id=w.id and w.name="菜鸟教程";

	JOIN连接
		把来自两个或多个表的行结合起来，基于这些表之间的共同字段。

		JOIN
			同INNER JOIN

		INNER JOIN
			如果表中有至少一个匹配，则返回行（AB交集）
			SELECT w.id, w.name, a.count, a.date
			FROM Websites AS w
			INNER JOIN access_log as a
			ON w.id=a.site_id;
			
		LEFT JOIN
			即使右表中没有匹配，也从左表返回所有的行（A非B）
			SELECT w.id, w.name, a.count, a.date
			FROM Websites AS w
			INNER JOIN access_log as a
			ON w.id=a.site_id;

		RIGHT JOIN
			即使左表中没有匹配，也从右表返回所有的行（B非A）

		FULL OUTER JOIN 
			结合了 LEFT JOIN 和 RIGHT JOIN 的结果
			只要其中一个表中存在匹配，则返回行（AB并集）
			MySQL中不支持 FULL OUTER JOIN

	UNION合并
		合并两个或多个 SELECT 语句的结果。
		每个 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型，顺序必须相同。
		结果集中的列名总是等于 UNION 中第一个 SELECT 语句中的列名

		UNION
			会去重
			SELECT country FROM Websites
			UNION
			SELECT country FROM apps
			ORDER BY country;

		UNION ALL
			不会去重
			SELECT country FROM Websites
			UNION ALL
			SELECT country FROM apps
			ORDER BY country;


# 二、UPDATE - 更新数据库中的数据
	在 MySQL 中可以通过设置 sql_safe_updates 这个自带的参数来解决，当该参数开启的情况下，你必须在update 语句后携带 where 条件，否则就会报错。

	UPDATE Websites 
	SET alexa='5000', country='USA' 
	WHERE name='菜鸟教程';


# 三、DELETE - 从数据库中删除数据

	DELETE FROM Websites
	WHERE name='百度' AND country='CN';

	删除表中所有的行
		DELETE FROM table_name;
		或者
		TRUNCATE TABLE table_name


# 四、INSERT INTO - 向数据库中插入新数据
	不指定列
		需要列出插入行的每一列数据
		INSERT INTO table_name
		VALUES (value1,value2,value3,...);
	指定列
		INSERT INTO Websites (name, url, alexa, country) 
		VALUES ('百度','https://www.baidu.com/','4','CN');


# 五、CREATE DATABASE - 创建新数据库

	CREATE DATABASE my_db;

	SELECT *
	INTO WebsitesBackup2016
	FROM Websites
	WHERE country='CN';

	INSERT INTO Websites (name, country)
	SELECT app_name, country FROM apps
	WHERE id=1;


# 六、ALTER DATABASE - 修改数据库


# 七、CREATE TABLE - 创建新表


	CREATE TABLE Persons
	(
		PersonID int NOT NULL,
		LastName varchar(255) NOT NULL,
		FirstName varchar(255),
		Address varchar(255),
		City varchar(255)  DEFAULT 'Sandnes',
		PRIMARY KEY (P_Id),
		UNIQUE (PersonID)
	);

	Constraints 约束
		NOT NULL - 指示某列不能存储 NULL 值。
		UNIQUE - 保证某列的每行必须有唯一的值。
		PRIMARY KEY - NOT NULL 和 UNIQUE 的结合。确保某列（或两个列多个列的结合）有唯一标识，有助于更容易更快速地找到表中的一个特定的记录。
		FOREIGN KEY - 保证一个表中的数据匹配另一个表中的值的参照完整性。
		CHECK - 保证列中的值符合指定的条件。
		DEFAULT - 规定没有给列赋值时的默认值。

	AUTO_INCREMENT
		列设置后会在新增记录是自动填入一个唯一的数字


# 八、ALTER TABLE - 变更（改变）数据库表

	添加列
	ALTER TABLE table_name
	ADD column_name datatype

	删除列
	ALTER TABLE table_name
	DROP COLUMN column_name

	添加 NOT NULL 约束
	ALTER TABLE Persons
	MODIFY Age INT NOT NULL;

	删除 NOT NULL 约束
	ALTER TABLE Persons
	MODIFY Age INT NULL;

	添加FOREIGN KEY 约束
	ALTER TABLE Orders
	ADD CONSTRAINT fk_PerOrders
	FOREIGN KEY (P_Id)
	REFERENCES Persons(P_Id)

	撤销 FOREIGN KEY 约束
	ALTER TABLE Orders
	DROP FOREIGN KEY fk_PerOrders

	ALTER TABLE Persons
	ADD CHECK (P_Id>0)

	ALTER TABLE Persons
	DROP CHECK chk_Person

	ALTER TABLE Persons
	ALTER City SET DEFAULT 'SANDNES'

	ALTER TABLE Persons
	ALTER City DROP DEFAULT


# 九、DROP TABLE - 删除表

	DROP TABLE table_name

	删除表内的数据
	TRUNCATE TABLE table_name


# 十、CREATE INDEX - 创建索引（搜索键）

	CREATE INDEX PIndex
	ON Persons (LastName)



# 十一、DROP INDEX - 删除索引
	DROP INDEX table_name.index_name (SQL Server)
	DROP INDEX index_name ON table_name (MS Access)
	DROP INDEX index_name (DB2/Oracle)
	ALTER TABLE table_name
	DROP INDEX index_name (MySQL)



