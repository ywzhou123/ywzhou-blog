# 一、通用数据类型
	CHARACTER(n)	字符/字符串。固定长度 n。
	VARCHAR(n) 或
	CHARACTER VARYING(n)	字符/字符串。可变长度。最大长度 n。
	BINARY(n)	二进制串。固定长度 n。
	BOOLEAN	存储 TRUE 或 FALSE 值
	VARBINARY(n) 或
	BINARY VARYING(n)	二进制串。可变长度。最大长度 n。
	INTEGER(p)	整数值（没有小数点）。精度 p。
	SMALLINT	整数值（没有小数点）。精度 5。
	INTEGER	整数值（没有小数点）。精度 10。
	BIGINT	整数值（没有小数点）。精度 19。
	DECIMAL(p,s)	精确数值，精度 p，小数点后位数 s。例如：decimal(5,2) 是一个小数点前有 3 位数，小数点后有 2 位数的数字。
	NUMERIC(p,s)	精确数值，精度 p，小数点后位数 s。（与 DECIMAL 相同）
	FLOAT(p)	近似数值，尾数精度 p。一个采用以 10 为基数的指数计数法的浮点数。该类型的 size 参数由一个指定最小精度的单一数字组成。
	REAL	近似数值，尾数精度 7。
	FLOAT	近似数值，尾数精度 16。
	DOUBLE PRECISION	近似数值，尾数精度 16。
	DATE	存储年、月、日的值。
	TIME	存储小时、分、秒的值。
	TIMESTAMP	存储年、月、日、小时、分、秒的值。
	INTERVAL	由一些整数字段组成，代表一段时间，取决于区间的类型。
	ARRAY	元素的固定长度的有序集合
	MULTISET	元素的可变长度的无序集合
	XML	存储 XML 数据



# 二、视图（Views）
	视图总是显示最新的数据！每当用户查询视图时，数据库引擎通过使用视图的 SQL 语句重建数据。

	创建视图
		CREATE VIEW [Current Product List] AS
		SELECT ProductID,ProductName
		FROM Products
		WHERE Discontinued=No

		SELECT * FROM [Current Product List]

	更新视图
		CREATE OR REPLACE VIEW view_name AS
		SELECT column_name(s)
		FROM table_name
		WHERE condition

	删除视图
		DROP VIEW view_name


# 三、函数
	Date 函数
		NOW()	返回当前的日期和时间 2008-11-11 12:45:34
			CREATE TABLE Orders
			(
				OrderId int NOT NULL,
				ProductName varchar(50) NOT NULL,
				OrderDate datetime NOT NULL DEFAULT NOW(),
				PRIMARY KEY (OrderId)
			)

		CURDATE()	返回当前的日期  2008-11-11
		CURTIME()	返回当前的时间 12:45:34
		DATE()	提取日期或日期/时间表达式的日期部分
			SELECT ProductName, DATE(OrderDate) AS OrderDate
			FROM Orders
			WHERE OrderId=1

		EXTRACT()	返回日期/时间的单独部分
			SELECT  EXTRACT(YEAR FROM OrderDate) AS OrderYear,
					EXTRACT(MONTH FROM OrderDate) AS OrderMonth,
					EXTRACT(DAY FROM OrderDate) AS OrderDay 
			FROM Orders
			WHERE OrderId=1

		DATE_ADD()	向日期添加指定的时间间隔
			SELECT OrderId,DATE_ADD(OrderDate,INTERVAL 45 DAY) AS OrderPayDate
			FROM Orders

		DATE_SUB()	从日期减去指定的时间间隔
			SELECT OrderId,DATE_SUB(OrderDate,INTERVAL 5 DAY) AS SubtractDate
			FROM Orders

		DATEDIFF()	返回两个日期之间的天数
			SELECT DATEDIFF('2008-11-30','2008-11-29') AS DiffDate

		DATE_FORMAT()	用不同的格式显示日期/时间
			DATE_FORMAT(NOW(),'%b %d %Y %h:%i %p')
			DATE_FORMAT(NOW(),'%m-%d-%Y')
			DATE_FORMAT(NOW(),'%d %b %y')
			DATE_FORMAT(NOW(),'%d %b %Y %T:%f')


	IFNULL() 
		值为null时返回0
		SELECT ProductName,UnitPrice*(UnitsInStock+IFNULL(UnitsOnOrder,0))
		FROM Products

	COALESCE() 
		SELECT ProductName,UnitPrice*(UnitsInStock+COALESCE(UnitsOnOrder,0))
		FROM Products

	Aggregate 函数
		AVG() - 返回平均值
			SELECT AVG(count) AS CountAverage FROM access_log;
			SELECT site_id, count FROM access_log
			WHERE count > (SELECT AVG(count) FROM access_log);

		COUNT() - 返回行数
			SELECT COUNT(*) AS nums FROM access_log;
			SELECT COUNT(DISTINCT site_id) AS nums FROM access_log;
				计算 "access_log" 表中不同 site_id 的记录数：

		MAX() - 返回最大值
			SELECT MAX(alexa) AS max_alexa FROM Websites;

		MIN() - 返回最小值
			SELECT MIN(alexa) AS min_alexa FROM Websites;

		SUM() - 返回总和
			SELECT SUM(count) AS nums FROM access_log;


	Scalar 函数
		UCASE() - 将某个字段转换为大写
		LCASE() - 将某个字段转换为小写
		MID() - 从某个文本字段提取字符，MySql 中使用
		SubString(字段，1，end) - 从某个文本字段提取字符
		LEN() - 返回某个文本字段的长度
		ROUND() - 对某个数值字段进行指定小数位数的四舍五入
		NOW() - 返回当前的系统日期和时间
		FORMAT() - 格式化某个字段的显示方式

	聚合函数
		统计 access_log 各个 site_id 的访问量：
			SELECT site_id, SUM(access_log.count) AS nums
			FROM access_log GROUP BY site_id;

		统计有记录的网站的记录数量：
			SELECT Websites.name,COUNT(access_log.aid) AS nums FROM access_log
			LEFT JOIN Websites
			ON access_log.site_id=Websites.id
			GROUP BY Websites.name;

		查找总访问量大于 200 的网站，并且 alexa 排名小于 200。
			SELECT Websites.name, SUM(access_log.count) AS nums FROM Websites
			INNER JOIN access_log
			ON Websites.id=access_log.site_id
			WHERE Websites.alexa < 200 
			GROUP BY Websites.name
			HAVING SUM(access_log.count) > 200;

				HAVING 子句原因是，WHERE 关键字无法与聚合函数一起使用。
				HAVING 子句可以让我们筛选分组后的各组数据。

	MID() 函数
		用于从文本字段中提取字符。

		从 "Websites" 表的 "name" 列中提取前 4 个字符
		SELECT MID(name,1,4) AS ShortTitle
		FROM Websites;

	LEN() 函数
		返回文本字段中值的长度。
		SELECT name, LENGTH(url) as LengthOfURL
		FROM Websites;

	ROUND() 函数
		用于把数值字段舍入为指定的小数位数。
		SELECT ROUND(column_name,decimals) FROM table_name;

	NOW() 函数
		返回当前系统的日期和时间。
		SELECT name, url, Now() AS date
		FROM Websites;

	FORMAT() 函数
		用于对字段的显示进行格式化。

		SELECT name, url, DATE_FORMAT(Now(),'%Y-%m-%d') AS date
		FROM Websites;