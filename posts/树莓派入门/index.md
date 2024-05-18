# 树莓派入门



[树莓派官网](https://www.raspberrypi.org/)

树莓派4b图解

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210318165651102.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)



## 烧录系统


### 格式化SD卡

用格式化工具SDFormatter V4.0

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210318200658274.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)


### 烧录镜像


从[官网](https://www.raspberrypi.org/software/operating-systems/)下载最新的镜像

打开`Win32DiskImager.exe`

选择下载的镜像

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210318204307783.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)


后面选择E盘

点击write，等待

完成

安装`Linux文件查看工具Linux_Reader.exe`，打开

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210318211737789.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
可以看到linux的文件结构


![在这里插入图片描述](https://img-blog.csdnimg.cn/2021031821180345.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)



### 放置空的ssh文件

这样允许树莓派用ssh远程连接

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210318212101410.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

### wifi配置

在boot盘中个创建文件`wpa_supplicant.conf`

在里面写入

```
country=CN
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
	ssid="将我替换成第一个WiFi的名字，不删除引号,不能有中文"
	psk="将我替换成WiFi密码，不删除引号"
	priority=将我替换成数字，数字越大代表优先级越高
}
network={
	ssid="将我替换成第二个WiFi的名字，不删除引号,不能有中文"
	psk="将我替换成WiFi密码，不删除引号"
	priority=将我替换成数字，数字越大代表优先级越高
}
```


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210318214009765.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)



拔出u盘

## 开机

插入sd卡，电源线，就可以通电开机了

## 获取树莓派ip

如果是ios，可以下载`dataplicity`软件，在此之前需要到它的官网注册（激活）一下邮箱，然后才可以再软件中登录

确保ios设备和树莓派连同一个wifi，然后用这个软件扫描即可


如果是电脑端，可以让电脑和树莓派连到同一个wifi，然后打开`advanced_ip_scanner.exe`，扫描即可


## 远程登录

### putty远程登录

打开`远程ssh工具 putty.exe`输入树莓派ip即可

默认用户名是`pi`


密码是`raspberry`


### vncviewer远程登录

打开`vnc viewer`软件，输入树莓派ip即可，如果出现`cannot currently show the desktop`，调整分辨率即可

调整分辨率的方法是先用putty远程登录，然后输入`sudo raspi-config` 选择 `display options` 选择非默认的分辨率，最后`finish`


## 给apt-get换源

在终端输入`sudo nano /etc/apt/sources.list`

把第一行注释掉，在后面复制

```
deb http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ buster main contrib non-free rpi
deb-src http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ buster main contrib non-free rpi
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210319092659243.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)


点击右键和方向键下键粘贴，然后ctrl-o保存


运行`sudo apt-get update `


## 安装vim

`sudo apt-get install vim`


## 给pip换源

```shell
sudo mkdir ~/.pip
cd .pip
sudo nano pip.conf
```

写入

```shell
[global]
timeout = 10
index-url =  http://mirrors.aliyun.com/pypi/simple/
extra-index-url= http://pypi.douban.com/simple/
[install]
trusted-host=
    mirrors.aliyun.com
    pypi.douban.com
```



## 树莓派的一些设置

`sudo raspi-config` 进入到设置界面

选择 `advanced options` 

选择 `expand filesystem` 可以将根目录扩展到sd卡，充分利用sd卡空间

选择 `system options`

选择 `audio`  选择 `headphones` 可以让声音通过耳机输出

在 `display options` 中按情况调节分辨率，选择 `pixel doubling` 可以将像素两倍显示，更清晰


## 安装中文字体和输入法

安装中文字体 `sudo apt-get install fonts-wqy-zenhei`

安装中文输入法 `sudo apt-get install fcitx fcitx-googlepinyin fcitx-module-cloudpinyin fcitx-sunpinyin`

在右上角将google pinyin添加进去

下次开机生效，按 `ctrl+space` 切换输入法


## 安装teamviewer

进入[官网](https://www.teamviewer.com/en/download/linux/)

选择 armv7_32bits 

```shell
cd /home/pi/Downloads
sudo dpkg -i 下载的文件名_armhf.deb
sudo apt-get -f install
sudo apt-get install gdebi
```


点击右上角的图标即可进入

需要注册账号

teamviewer遇到网络问题，设备可以断掉重连


另外一种内网穿透可以用sunny-ngrok



## 参考

[https://blog.csdn.net/wu693966797/article/details/95936275](https://blog.csdn.net/wu693966797/article/details/95936275)

[https://www.bilibili.com/video/BV1zb411x7yo](https://www.bilibili.com/video/BV1zb411x7yo)

资源

[百度网盘](https://pan.baidu.com/share/init?surl=0LlZWXrkyLWheV42fPHFnQ)

提取码 92Mb


推荐淘宝购买店铺 ： 亚博智能科技

