# docker2



[参考链接](https://docs.docker.com/get-started/)

## Containerize an application

构建应用的镜像

编写Dockerfile，构建镜像（假设镜像名叫getting-started）

```shell
docker build -t getting-started .
```

根据镜像创建容器

```shell
docker run -dp 127.0.0.1:3000:3000 getting-started
```


查看正在运行的容器

```shell
docker ps
```


## Update the application

修改源码

重新构建镜像

```shell
docker build -t getting-started .
```

重新开启新的容器

```shell
docker run -dp 127.0.0.1:3000:3000 getting-started
```


由于旧的容器已经占用端口，所以新容器无法运行

停止旧的容器

```shell
docker stop <the-container-id>
```

删除旧的容器

```shell
docker rm <the-container-id>
```

或者用以下命令停止并删除

```shell
docker rm -f <the-container-id>
```


运行新的容器

```shell
docker run -dp 127.0.0.1:3000:3000 getting-started
```


## Share the application

在网页端登录docker hub，创建仓库，名为getting-started


在命令行登录docker hub

```shell
docker login -u YOUR-USER-NAME
```


给镜像打标签

```shell
docker tag getting-started YOUR-USER-NAME/getting-started
```


推到仓库

```shell
docker push YOUR-USER-NAME/getting-started
```


使用[play with docker](https://labs.play-with-docker.com/)

在一个全新的环境里运行镜像

由于play with docker用的是amd64的平台，如果电脑是arm架构，就需要构建一个能在amd64平台上运行的镜像

```shell
docker build --platform linux/amd64 -f ./Dockerfile -t da1yh/getting_started .
```

重新push

在play with docker中，创建新的实例

在终端中输入

```shell
docker run -dp 0.0.0.0:3000:3000 YOUR-USER-NAME/getting-started
```

由于本地找不到这个镜像，所以去docker hub拉取


## Persist the DB

运行一个ubuntu容器，让它产生一个data.txt文件，并写入一个随机数

```shell
docker run -d ubuntu bash -c "shuf -i 1-10000 -n 1 -o /data.txt && tail -f /dev/null"
```

查看这个数字，注意docker exec和docker run的区别是他们虽然都是在容器中执行命令，但是docker exec是在已启动的容器中执行

```shell
docker exec <container-id> cat /data.txt
```

volume用于将容器中的文件与主机的文件关联，把一个卷挂载到容器中的一个文件路径，就可以在修改容器内这个路径下的所有数据同步到主机

创建volume

```shell
docker volume create todo-db
```


运行容器，并挂载到特定目录

```shell
docker run -dp 127.0.0.1:3000:3000 --mount type=volume,src=todo-db,target=/etc/todos getting-started
```

对应用进行增删改，停止并删除容器，重新运行容器，发现数据都在

查看volume信息

```shell
docker volume inspect todo-db
[
    {
        "CreatedAt": "2019-09-26T02:18:36Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/todo-db/_data",
        "Name": "todo-db",
        "Options": {},
        "Scope": "local"
    }
]
```


`Mountpoint`指示了容器中某个路径映射到主机的哪个路径

## Use bind mounts

bind mount可以指定主机哪个路径和容器内的路径关联

两者不同之处

| |Named volumes  |Bind mounts |
|--|--|--|
|Host location  |Docker chooses  |You decide |
|Mount example (using --mount)|type=volume,src=my-volume,target=/usr/local/data|type=bind,src=/path/to/data,target=/usr/local/|
|Populates new volume with container contents|yes|no|
|Supports Volume Drivers|yes|no|


运行如下命令

```shell
docker run -it --mount type=bind,src="$(pwd)",target=/src ubuntu bash
```

cd到src目录，ls发现与主机的目录内容一样

在容器中创建文件，会同步到主机

退出容器，文件在主机上不会消失

进入容器，在主机上删掉文件，在容器中也会相应删除

ctrl-d 退出容器，注意容器只是状态是exited，但并没有消失

bind mount的好处是不需要自己搭建开发环境，只需要docker run相应的容器就有了开发环境

以下说明一下怎么用docker搭建开发环境

首先确保没有容器在运行

运行以下代码

```shell
docker run -dp 127.0.0.1:3000:3000 \
    -w /app --mount type=bind,src="$(pwd)",target=/app \
    node:18-alpine \
    sh -c "yarn install && yarn run dev"
```


查看日志

```shell
docker logs -f <container-id>
```

具有开发环境的容器，你在本地修改文件，只要启动了容器，运行应用可以发现修改立即生效，因为bind mount


然后你就可以构建新的镜像

```shell
docker build -t getting-started .
```


## Multi container apps

创建network

```shell
docker network create todo-app
```


运行一个mysql容器，绑定某个网络，然后指定一些参数来初始化数据库

```shell
docker run -d \
    --network todo-app --network-alias mysql \
    -v todo-mysql-data:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=secret \
    -e MYSQL_DATABASE=todos \
    mysql:8.0
```


在容器中启动mysql

```shell
docker exec -it <mysql-container-id> mysql -u root -p
```

同一个网络下的容器要怎么找到别的容器？用容器的ip地址


接下来将使用一个镜像，它用来排除网络故障和调试

[nicolaka/netshoot](https://github.com/nicolaka/netshoot)

运行

```shell
docker run -it --network todo-app nicolaka/netshoot
```

找ip，这个mysql就是--network-alias指定的

```shell
dig mysql
```

得到输出

```shell
; <<>> DiG 9.18.13 <<>> mysql
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39687
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;mysql.				IN	A

;; ANSWER SECTION:
mysql.			600	IN	A	172.18.0.2

;; Query time: 3 msec
;; SERVER: 127.0.0.11#53(127.0.0.11) (UDP)
;; WHEN: Wed Jan 10 12:35:55 UTC 2024
;; MSG SIZE  rcvd: 44
```


运行getting-started-app


```shell
docker run -dp 127.0.0.1:3000:3000 \
  -w /app -v "$(pwd):/app" \
  --network todo-app \
  -e MYSQL_HOST=mysql \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=secret \
  -e MYSQL_DB=todos \
  node:18-alpine \
  sh -c "yarn install && yarn run dev"
```

使用`docker logs -f `查看发现用了mysql

打开浏览器，增加数据，在mysql容器中查看数据是否同步

```shell
docker exec -it <mysql-container-id> mysql -p todos
```

```shell
mysql> select * from todo_items;
+--------------------------------------+--------------------+-----------+
| id                                   | name               | completed |
+--------------------------------------+--------------------+-----------+
| c906ff08-60e6-44e6-8f49-ed56a0853e85 | Do amazing things! |         0 |
| 2912a79e-8486-4bc3-a4c5-460793a575ab | Be awesome!        |         0 |
+--------------------------------------+--------------------+-----------+
```




## Use Docker Compose

docker compose可以很好的处理多容器应用

需要在Dockerfile同级的目录下创建compose.yaml

本来是这样启动应用的

```shell
docker run -dp 127.0.0.1:3000:3000 \
  -w /app -v "$(pwd):/app" \
  --network todo-app \
  -e MYSQL_HOST=mysql \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=secret \
  -e MYSQL_DB=todos \
  node:18-alpine \
  sh -c "yarn install && yarn run dev"
```


现在在compose.yaml中这样写

```shell
services:
  app:
    image: node:18-alpine
    command: sh -c "yarn install && yarn run dev"
    ports:
      - 127.0.0.1:3000:3000
    working_dir: /app
    volumes:
      - ./:/app
    environment:
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: secret
      MYSQL_DB: todos
```



本来是这样启动mysql


```shell
docker run -d \
  --network todo-app --network-alias mysql \
  -v todo-mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=todos \
  mysql:8.0
```

现在在compose.yaml中是这样

```shell
services:
  app:
    # The app service definition
  mysql:
    image: mysql:8.0
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: todos

volumes:
  todo-mysql-data:
```


最终的compose.yaml长这样

```shell
services:
  app:
    image: node:18-alpine
    command: sh -c "yarn install && yarn run dev"
    ports:
      - 127.0.0.1:3000:3000
    working_dir: /app
    volumes:
      - ./:/app
    environment:
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: secret
      MYSQL_DB: todos

  mysql:
    image: mysql:8.0
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: todos

volumes:
  todo-mysql-data:
```


启动应用

首先确保没有该应用的容器在运行

```shell
docker compose up -d
```


看到输出，docker自动创建了volume和network

```shell
[+] Running 4/4
 ✔ Network getting-started-app_default           Created                   0.0s 
 ✔ Volume "getting-started-app_todo-mysql-data"  Created                   0.0s 
 ✔ Container getting-started-app-mysql-1         Started                   0.3s 
 ✔ Container getting-started-app-app-1           Started                   0.3s
```


查看实时日志

```shell
docker compose logs -f
```


停止并删除容器，注意这个命令也会删除network，但不会删除volume，如果要删除volume，要加`--volumes`

```shell
docker compose down
```


输出

```shell
[+] Running 3/3
 ✔ Container getting-started-app-mysql-1  Removed                                                                     3.4s 
 ✔ Container getting-started-app-app-1    Removed                                                                     0.1s 
 ✔ Network getting-started-app_default    Removed  
```


## Image-building best practices

docker中的layer

[参考链接](https://docs.docker.com/build/guide/layers/)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/69b6b3db0d7e4e1bb36c1b4a04c353b8.png)



查看某个镜像的每一"layer"

```shell
docker image history getting-started
```



有些layer无法显示，用下面的命令显示所有的layer

```shell
docker image history --no-trunc getting-started
```


原来Dockerfile

```shell
# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
```


修改为

```shell
# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
CMD ["node", "src/index.js"]
```


与Dockerfile同级目录创建.dockerignore，写入`node_modules`

构建镜像


```shell
docker build -t getting-started .
```


修改源码，再次构建，会发现快很多


Multi-stage builds

...
