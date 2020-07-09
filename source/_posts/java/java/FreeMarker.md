FreeMarker

​    一个用Java语言编写的模板引擎，它基于模板来生成文本输出。



优点

​    分离表现层和业务逻辑

​    提高开发效率

​    使得开发过程中的人员分工更加明确



缺点

​    生成静态的HTML页面后，如果一旦模板改变，而没有及时更新模板生成的HTML页面的话，用户看到的就是过期的数据。

​    变量必须要赋值，如果不赋值，那么就会抛出异常。需要使用if/elseif/else 指令进行判段。

​    map限定key必须是string，其他数据类型无法操作。

​    不支持集群应用。



技巧

​    内置空字符串处理

​        Invoice Date: ${(customer.invoice.date)!} 

​            感叹号自动检查 null 值和空字符串

​        Invoice Date: ${(customer.invoice.date)!'No Invoice Available'} 

​            为空时返回默认值



​    通过jquery修改vue绑定的model值

​        在vue对象中methods中的方法中，把需要用jquery改变的地方，还是用jquery取到之后再赋值给vue对象中的数据属性上。

​    在script中有new Vue的操作，结果到浏览器页面报错

        <script type=“application/javascript”>

​    模版中的input value明明是有值的，到浏览器中页面上却不显示

​        data: {

​            myForm: {

​            //这儿把freemarker模版中的初始值赋值给vue对象的data中属性

​            //然后freemarker中写成

​            //<input type="text" v-model="myForm.name" placeholder="请输入城市名称"/>

​            //这样就可以了。

​                name: "${oldCityInfo.name!''}",

​                //标签

​                labels: '',

​            }

​        }