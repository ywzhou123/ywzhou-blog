---
title: git
date: 2020-04-19 19:57:06
tags:
categories:
---
#http://www.bootcss.com/p/git-guide/

#http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
# 基本操作


#   版本
    git --version

#------------------------------------------------------------------------------------------------------

#   账号
    git config --global user.name "Jiang Xin"
    git config --global user.email jiangxin@ossxp.com

#------------------------------------------------------------------------------------------------------

#   别名
    git config --global alias.ci commit

#------------------------------------------------------------------------------------------------------

#   颜色
    git config --global color.ui true

#------------------------------------------------------------------------------------------------------

#   创建
    git init demo
    # 自动创建demo目录并初始化一个空的版本库.git

#------------------------------------------------------------------------------------------------------

#   目录
    git rev-parse --git-dir
    #   可在子目录中执行，向上查找.git目录
    #   /path/demo/.git
    git rev-parse --show-toplevel
    #   可在子目录中执行，显示工作区根目录
    #   /path/demo
    git rev-parse --show-prefix
    #   显示当前路径相对于工作区根目录的目录
    #   a/b/c/
    git rev-parse --show-cdup
    #   显示当前目录cd到工作区根目录的深度
    #   ../../.../

#------------------------------------------------------------------------------------------------------

#   添加
    cd demo
    echo "Hello World." > welcome.txt
    git add welcome.txt
    # 已在版本库中的文件修改后同样要git add后才能提交

#------------------------------------------------------------------------------------------------------

#   提交
    git ci -m "init"
    --allow-empty
    #   允许空白提交

#------------------------------------------------------------------------------------------------------

#   克隆
    git clone git://git.kernel.org/pub/scm/git/git.git
    cd /path
    git clone demo demo-bak-1
    #   备份本地git库

#------------------------------------------------------------------------------------------------------

#   日志
    git log --stat

#------------------------------------------------------------------------------------------------------

#   状态
    git status
    git status -s
    #   精简格式
    # M位于第一列表示，版本库与暂存区文件有改动
    #   文件修改并 git add 之后
    # M位于第二列表示，工作区当前文件与暂存区文件有改动
    #   文件修改，在git add之前
    # 第一二列均有M，表示git add后又修改了文件

#------------------------------------------------------------------------------------------------------

#   比较
    echo "Nice too meet you." >> welcome.txt
    git diff
    #   仅显示工作区最新改动，即工作区与暂存区相比
    git diff HEAD
    #   将工作区和HEAD（当前工作分支）相比
    git diff --cached
    #   将暂存区和版本库相比

#------------------------------------------------------------------------------------------------------

#   远程
    git remote –v
    #   查看版本库的网址
    git remote
    #   列出所有主机名

#------------------------------------------------------------------------------------------------------

#   更新
    git fetch origin master
    #   将远程版本库的更新，更新到本地库。

#------------------------------------------------------------------------------------------------------

#   推送
    git remote add origin git@192.168.56.1:git-test.git
    #   添加远程仓库地址
    git push origin master
    #   将本地master分支推送到origin主机的master分支上

#------------------------------------------------------------------------------------------------------

#   拉取
    git pull origin master:master
    #   将远程主机origin中的master分支跟新到本地分支master

#------------------------------------------------------------------------------------------------------

#   重置
    git reset --soft HEAD^
    git reset HEAD a/b/c
    #   将已经add到暂存队列中的文件取消暂存，然后通过checkout可以还原文件

#------------------------------------------------------------------------------------------------------

#   检出
    git checkout <paths>
    git checkout [<branch>]
    #   检出分支
    git checkout -- filename
    #   用暂存区中的文件来覆盖工作区的文件
    #   恢复到最后一次提交的改动

#------------------------------------------------------------------------------------------------------

#   进度
    git stach list
    #   查看保存的进度
    git stash pop
    #   恢复最近进度

#------------------------------------------------------------------------------------------------------

#   冲突
    merge

#------------------------------------------------------------------------------------------------------

#   分支
    git branch
    #   显示当前分支
    git branch new-branch
    #   创建分支
    git checkout new-branch
    #   切换到新分支
    #   -b 可以在创建分支后自动切换到新分支
    git push origin new-branch
    #   合并到远程服务器
    git checkout master
    #   合并进master
    git merge new-branch
    #   合并进master
    git push
    #   合并进master
    #   master中也合并了new-branch中的更新
    git cherry-pick
    #   从历史提交中拣选到特性分支

#------------------------------------------------------------------------------------------------------

#   里程碑
    git tag -m "Release 1.0" v1.0
    #   创建里程碑
    git push origin refs/tags/v1.0







#------------------------------------------------------------------------------------------------------
# 客户端工具
  windows
    TortoiseGit
  mac os x
    SourceTree

#------------------------------------------------------------------------------------------------------
# 生成SSH公私匙
# Linux
  ssh-keygen -t rsa
    Generating public/private rsa key pair. 
    Enter file in which to save the key (/home/git/.ssh/id_rsa):  
    Created directory '/home/git/.ssh'. 
    Enter passphrase (empty for no passphrase):  
    Enter same passphrase again:  
    Your identification has been saved in /home/git/.ssh/id_rsa. 
    Your public key has been saved in /home/git/.ssh/id_rsa.pub. 
    The key fingerprint is: 
    2e:38:0f:26:72:8e:3b:1f:1e:7a:74:40:1e:b9:d2:2d git@minion-test-76.ewin.com 
    The keys randomart image is:

   将公钥 ~/.ssh/id_rsa.pub 传给GIT管理员或将内容复制到GITLIB账号中。

# windows
  安装TortoiseGit
  使用puttygen.exe生成公钥和ppk
  将公钥文件传给GIT管理员或将内容复制到GITLIB账号中。
  将私匙保存在本地，添加到TortoiseGit设置中的远程账号中。