# git



[git安装](https://git-scm.com/download)

## 用户名和邮箱

初始化或切换用户名和邮箱

`git config --global user.name "XXX"`

`git config --global user.email "XXX"`

查看当前用户名和邮箱

`git config --global user.name`

`git config --global user.email`


查看用户名和邮箱列表


`git config --list`

删除用户名和邮箱

`git config --global --unset user.name "XXX"`

`git config --global --unset user.email "XXX"`

## git工作原理

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200505160650610.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

##  三种状态
`modified`  `staged`  `committed`

## 本地操作

### 基本操作

#### 从工作目录移动到暂存区

`git add XXX`

#### 全部移动

`git add .`

#### 从暂存区移动到本地仓库

`git commit -m "XXX"`

#### 修改提交信息

`git commit --amend`

 打开vim编辑器

只读状态下的保存退出

`[esc] :wq!`

[vim使用](https://www.runoob.com/linux/linux-vim.html)



#### 查看状态

`git status`

#### 查看日志

`git log`

查看更完全的日志并压缩排版

`git reflog --oneline`

### 版本回退

#### 从暂存区回退到工作目录

`git reset XXX`

#### 从本地仓库回退到暂存区(后面带数字可以选择回退几个版本)

`git reset --soft HEAD~`

#### 从本地仓库回退到工作目录

`git reset HEAD~`

#### 从本地仓库回退到工作目录，并撤销在工作目录的操作（可能导致删除文件）

`git reset --hard HEAD~`

#### 对因回退删除掉的文件还原

`git reset --hard <filename>`  (这时候已经commit)

### 恢复文件

#### 在工作目录中删除，要恢复(把暂存区的恢复过来)

`git checkout XXX`

### 删除文件

#### 删除工作目录和暂存区的文件，取消跟踪，不纳入版本管理（两个区文件要相同）

`git rm XXX`

此时本地仓库还有该文件

通过回退实现彻底删除

`git reset --soft HEAD~`

如果两个区文件不同

全都删除

`git rm -f XXX`

只删除暂存区

`git rm --cached XXX`

### 重命名

`git mv <before> <after>`

然后再添加，提交

### 文件比较

#### 比较两个历史快照

`git diff  XXX XXX`

#### 比较工作目录和暂存区

`git diff XXX`

#### 比较工作目录和仓库

`git diff XXX`

#### 比较暂存区和仓库

`git diff --cached XXX`


### 分支

#### 创建分支

`git  branch XXX`

#### 进入分支

`git checkout XXX`

#### 创建并进入分支

`git checkout -b XXX`

#### 列出所有分支

`git branch -a`

#### 查看当前分支

`git branch`

#### 图化所有分支

`git log --decorate --oneline --graph --all`

#### 与当前分支合并

`git merge XXX`

#### 合并冲突

打开文件，修改文件，重新添加提交

#### 删除分支

`git branch -d XXX`

分支名删除，文件仍然存在




## 远程操作

#### 远程项目拷贝到本地

`git clone XXX`

### push/pull

#### 推到远程分支上

`git push`

需要输入github账号密码

#### 把远程分支更新的内容拉到本地

`git pull`


#### 连续两次  git push 内容不一样产生冲突

`git pull`



文件会自动更新，改文件内容，重新添加提交

### 其他

`git push <远程主机名> <远程分支名>`


`git pull <远程主机名> <远程分支名>`

e.g

`git push origin master`

`git pull origin master`

push需要创建upstream连接本地分支和远程分支

`git branch --set-upstreamXXX`

更常用的是(建立upstream并push)(本地与远程同名)

`git push -u origin XXX`

### fetch

`git pull` 类似于 `git fetch + git merge`

和commitId的改动有关

`git fetch` 更安全

具体参考 [这篇文章](https://blog.csdn.net/a19881029/article/details/42245955)

### remote

远程添加仓库

`git remote add <name> <url>`

远程删除仓库

`git remote remove XXX`

查看远程仓库

`git remote`

查看有关联的远程仓库

`git remote -v`


## 问题


`git remote set-url origin xxx.git` 来设置你要提交的仓库，不是使用`git remote add origin`

-----------------------------------------

在ubuntu16.04 git push时出现 `fatal: unable to access "xxx.git": gnutls_handshake() failed: Handshake failed`

解决方法：

[https://stackoverflow.com/questions/60262230/fatal-unable-to-access-gnutls-handshake-failed-handshake-failed](https://stackoverflow.com/questions/60262230/fatal-unable-to-access-gnutls-handshake-failed-handshake-failed)第一个回答



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200505170215710.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)













