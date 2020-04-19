# 月晴星飞个人博客

- 基于[hexo](https://hexo.io/zh-cn/docs/)搭建

### Install and Init

``` bash
$ npm install -g hexo-cli
$ npm install hexo --save
$ npx hexo init
$ npm install
```

### Create a new post

``` bash
$ hexo new "My New Post"
$ hexo new "My New Post" -p web/vue/post
```

### Create a new page

``` bash
$ hexo new page "About"
```

### Run server

``` bash
$ hexo s
```

### Generate static files

``` bash
$ hexo g
```

### Deploy to remote sites

``` bash
$ hexo d
$ hexo d -g
```

### 目录结构

```
.
├── _config.yml   全局配置信息
├── package.json  应用程序的信息
├── scaffolds     模版文件夹
├── source        资源文件夹
|   ├── _drafts   草稿文件夹
|   └── _posts    文章文件夹
└── themes        主题文件夹
```