# javascript_notes
前端开发笔记

- 基于[hexo](https://hexo.io/zh-cn/docs/)搭建的个人博客系统

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
```

### Run server

``` bash
$ hexo server
```
### Generate static files

``` bash
$ hexo generate
```
### Deploy to remote sites

``` bash
$ hexo deploy
```

## 目录结构
.
├── _config.yml   全局配置信息
├── package.json  应用程序的信息
├── scaffolds     模版文件夹
├── source        资源文件夹，除_posts以外的以_开头的将会被忽略。
|   ├── _drafts
|   └── _posts
└── themes        主题文件夹