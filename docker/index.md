# docker



[参考资料](https://vuepress.mirror.docker-practice.com/)

[参考教程](https://www.bilibili.com/video/BV11L411g7U1/)

docker的三个重要概念

image：镜像，就是各种环境的集合

container：由镜像生成一个一个的容器，是镜像的实例化

dockerfile：管理镜像和容器的文件

## docker下载镜像

以安装redis为例

到docker hub上找redis，然后可以找到官方提供的一条命令

```shell
docker run --name some-redis -d redis
```

可以在docker桌面版中看到有redis的镜像和容器

## docker运行ubuntu

```shell
docker pull ubuntu 
```

```shell
docker run -itd --name myubuntu ubuntu
```

用如下命令进入容器

```
docker exec -it <container_id> /bin/bash
```

可以用vscode的docker插件来编辑容器内的文本

docker的ubuntu没有gcc、vim等东西，要自己安装，但是无法使用`apt install`

要修改`/etc/source.list`

参考(https://blog.csdn.net/moutain9426/article/details/120292272)


