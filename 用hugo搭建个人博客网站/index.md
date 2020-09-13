# 用hugo搭建个人博客网站





[效果展示](https://dyhgo.fun)

在hugo官网也有说明如何搭建个人网站

### 注册github账号
### 创建github仓库
仓库的名字必须是   用户名.github.io

建议全小写

### 安装git bash（非必须，但建议）
[点击此处](https://git-scm.com/download)

选择计算机对应的规格

一步一步安装

在使用前要进行初始化用户名和邮箱

打开终端（以powershell为例）

输入git命令，没有异常就可以

### 安装hugo

[点击此处](https://github.com/gohugoio/hugo/releases)

选择计算机对应的规格

下载zip压缩包

解压后会得到 hugo.exe（这个是主要的）

### 创建博客
打开powershell

转到存放hugo.exe的文件夹下（hugo指令只能在这个目录下执行）

如果hugo指令识别不出来，可以配置环境变量

如果还是不行，那就用绝对路径，一直到hugo.exe

要启动hugo.exe就要用 .\hugo

在存放hugo.exe的文件夹下，执行以下代码
```powershell
>hugo new site myblog
```
myblog是自己起的名字，是一个identifier

之后会生成myblog文件夹

里面已经有一些东西了（大部分都是建立网站必须的）

### 下载主题
[点击此处](https://themes.gohugo.io/)

选一个主题下载

下载有两种方式

1.点击download，转到作者github，下载zip

把zip转到myblog/theme下，需要改文件夹一些名字

2.在主题下面有git clone(推荐使用这种)

直接在powershell下面输入（一定要 cd 到myblog）

个别主题下载的慢，可以在不同时间不同地点多试试

下载完，myblog/theme 就会多出一个主题对应的文件夹（很重要）

以下是无论哪一种都要进行的操作

根据作者在hugo网页中写的文档进行初始化配置（就是把主题文件夹中的东西搬出来，替换什么的）（很重要，没有这一步，可能本地都打不开，疯狂报错）（但有些主题没有此过程）

尝试在本地打开

输入以下代码(以pure主题为例）(这个主题名字是theme下对应文件夹的名字)

```powershell
myblog>hugo server -t pure
```
会得到一个本地网址

用浏览器打开这个网址

就可以在本地看到自己的网页

局域网内的用户也可以看到你的网页

###  部署到服务器上（github pages）
建议先在本地查看，确认无误之后再推到服务器

输入以下代码

注意不要写错

```powershell
myblog>hugo --theme=pure --baseUrl="https://你的用户名.github.io" --buildDrafts
```
myblog下会生成public文件夹

输入以下代码

```powershell
myblog>cd public
public>git init
public>git add .
public>git commit -m "输入你自己的提交信息"
public>git remote add origin https://github.com/用户名/用户名.github.io.git
public>git push -u origin master
public>
```
此过程中有可能需要输入github的账号和密码

访问 用户名.github.io就可以看到你的网页

会有延迟，需要等一会

### 配置主题和增加内容
配置因主题而异

通法就是认真仔细地阅读作者的文档

hugo/theme上的或者README.md（可见文档有多重要）

增加的内容一般都放在content文件夹下，当然也可以删掉内容

一般是markdown格式

写markdown可以用markdownpad / visual studio code / csdn自带的等等

但是发现一个问题，不同的编辑器预览的效果不一样

比如markdownpad不能很好的识别latex公式

有可能主题自带的markdown也不能很好的呈现出效果

### 更新网站内容

！！！文件名字不能有  #

建议首先在本地预览，确认无误再上传

然后执行以下代码（含本地预览）

```powershell
myblog>hugo server -t pure
myblog>hugo --theme=pure --baseUrl="https://你的用户名.github.io" --buildDrafts
myblog>cd public
public>git init
public>git add .
public>git commit -m "输入你自己的提交信息"
public>git remote add origin https://github.com/用户名/用户名.github.io.git
public>git pull origin master
public>git push -u origin master
public>

```
一定要写git pull origin master

有延迟

打开 用户名.github.io 可以看到内容已经更新

之后更新网站内容就一直重复上述操作

=================== **以下是自定义域名（附加内容**）=====================
在阿里云上面注册账号

实名制

购买域名

域名实名制

购买SSL证书（有免费的）

确定SSL证书有效

配置DNS服务器

在域名解析中添加记录

记录类型为CNAME

记录值填写 用户名.github.io（或者记录类型为A，记录值填写IP地址）

打开github对应的仓库

在settings中找到custom domain

输入新域名

在github pages下显示绿色的√就可以

访问新域名就可以看到网页了

之后更新的内容，都可以通过访问新域名实现

以上操作都需要时间，需耐心等待

个人博客网站基本搭建完毕
