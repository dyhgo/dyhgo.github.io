# redis




## 基础篇

### redis命令

#### 通用命令


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/7edb39be80224fc9af908caed7424446.png)



#### String类型

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/45adff8cd4e54929b431927cfd224774.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/c1a84a0c6c8c4bc6a300c69d860098b2.png)


#### key的层级结构

e.g.

`douyin:user:1`

`douyin:user:2`

`douyin:product:1`

#### Hash类型

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/d10bc7faa57a4f27ae3131160f40b94d.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/1d4c3b239ae04cdd987adc882196a78e.png)

#### List类型

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/417482b2339e48578d434c83d4302d3f.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/3d19d9990b5948dab3d83d889018dba1.png)

List的操作类似于deque的操作

#### Set类型

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/c603c04774994d92923bb7a766148661.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/f1a301be7df04d47a2010fa1b554a489.png)

#### SortedSet类型

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/96fe9e798fbd4ee49a982717e7e30fcc.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/71edca98e76749ff9bd06a8c0f499a21.png)


	
## 实战篇

## 高级篇

### 分布式缓存

#### Redis持久化

##### RDB持久化

redis database backup

redis会对当前所存的数据（内存上）进行备份，备份到磁盘的rdb文件

##### AOF持久化

append only file

aof文件记录“写命令”，当数据丢失时，只要重新执行aof文件的记录的“写命令”就行

由于AOF记录的是命令，RDB记录的是数据，所以AOF文件比RDB文件大很多，有时候对一个key重复操作，可能是没有意义的，为了解决这个问题，可以用命令`bgrewriteaof`优化命令，使多条命令合并成一条命令



#### Redis主从

redis的场景经常是多读写少，所以可以把写操作给主节点，把读操作给从节点（当然要保证主从数据的一致性）

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/25932216ca84417bbb8b8fb369d9d091.png)
##### 主从同步

全量同步

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/854595091aa3477b8ba077394c65f519.png)

增量同步



#### Redis哨兵

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/3d81f622449d4895a7e365edc86e6e33.png)




#### Redis分片集群	

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/8ed5d20e21254643baee5dc8bc9c0312.png)



### 多级缓存

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/0f3b457a1f504b9e82e21bb05aa740be.png)


### 最佳实践

#### 键值设计

key要有层级结构

不要有大key（单个key的value小于10KB，对于集合类型，元素个数小于1000）

- 如何发现bigkey
- 如何删除bigkey

使用合理的数据结构


#### 批处理




## 原理篇

### 数据结构

#### 简单动态字符串sds


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/6a3270aa2f2641c79693d29c0673bbc2.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/1a8ede917bb340e7a2cd5554f44bbd8b.png)


#### IntSet


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/5ef43bcd1b7540f389985e99257700b1.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/d0356433a65a42db9e739a0cf1fc9ec6.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/1ac5085f64fd44428da82fb7477262d8.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/276a9fb681cd4f2799ff3571223e9fda.png)


#### Dict

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/aeee3141e7024cfc92cf5c19976ce0f8.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/c39f21b1f2ea4d66b16774b61ca1ae8d.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/6c51006ebba14f1f9185f0400aa5940f.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/dff6e9e996c24178a61c155c30b3d310.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/f650bcdd763b4c16bcd14e00c9da9f6a.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/dec354b41e6244fc91e5eb0b5cf593c9.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/eb3cf35dc511480a8bb8cebf535e6c70.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/9bf2d38625ae40b4b6623230790ad341.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/c1b1e20b15764051a87370daa931e7eb.png)


#### ZipList
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/d9695a7b007a4f5da81ff2334c5689dd.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/2a63ec372d0543548fba8b4ab3393617.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/13dfa43b97e04734b2e765ee3b26640d.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/4e9469f3ee5e4397b3b51e3481be46e5.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/32f4522c24c642b5b19bbbf3ba8f494e.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/9cb2d67a93b2412eb81e98c0876e1612.png)



#### QuickList


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/9e396f12d88f487d829927b81138c265.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/a39f30acd9a34192ba5120ca3adc72c7.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/6da41892ece3462e87619178238704a0.png)


#### SkipList

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/e23648501e5f4787b0d6090a5e8e9bac.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/d5cac789e2514fc0ad62e5c966ee4c0f.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/ca7fee649c5e43e399ca9d15bb81f0b0.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/0fa9fb54595e4e378df99919fece3458.png)


#### RedisObject

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/9d844de9e4d74a68ac672f73decca9f5.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/8ec4b6f7250543bd95af84801e7b4e62.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/3a6f073d984c4e3c8e516e1e3f45837a.png)

#### 五种数据类型


##### String

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/01bd209d7ab5495094a41111766ccabc.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/223d64a1256e45abac90fda4fe15236c.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/5f5a129d63fb45a8b0ff269b9b58fbbf.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/c6e7ba4a0b82459c88cea82b34141be5.png)

##### List

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/9e22452656064d8a9986cfeee600ff8e.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/8fae41039f804658b801ddb3c8615e71.png)

##### Set

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/ffa4c5af32e14d0494e3b69de4838aae.png)

##### ZSet

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/2a10e55da4744fc68bd93da60d7fce4c.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/2d16332761d343df96afac39c9bf7d08.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/e6b92399d7c441faafbc05fc86589893.png)


##### Hash

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/247c160e347c4045b9bb13a7eb6e1eac.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/887bd445cea64fd8ad9aa4bc10b59f71.png)


### 网络模型


#### 用户空间和内核空间

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/8cca935586ed42a4ad5a7693414fd586.png)


#### 阻塞IO

blocking io

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/06b21b09dd4b44a8ab061c30216e4702.png)


#### 非阻塞IO

nonblocking io

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/a756da7646904ce1a9556854f89a94af.png)


#### IO多路复用

io multiplexing


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/1c6450b3faaa42798a6bd9db0706bca4.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/41759730d87a4e24a742508c639db632.png)

##### select

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/71ffb82134bb438987fa9c6462c4c699.png)



##### poll

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/b7fc288ca384440ebf1502fcaa467f37.png)


##### epoll


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/2783e883e95f49e9b416e63dca721cbe.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/e11bc0edf1634d258b225089f4fd37da.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/d4349540bdc94e428cf98d5f2a5c789e.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/bb97501dad6e484e87695c0634cd1429.png)


#### 信号驱动IO

signal driven io


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/11718985c2a54b2da909f66f10119190.png)

#### 异步IO

asynchronous io

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/0f91f049ffff489ab95c8a44fbef7ae7.png)


缺点：用户不管内核忙不忙得过来，一直向内核发请求会让内核崩溃

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/1ce81c46890a47fd9ecc8e7930fd8057.png)

#### Redis网络模型

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/8c6e6dd1159a4574b46664f4bed48f09.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/238f1634f83b42b8962be65d259bb75a.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/d88521ad54cc40e8bd8b7175fa8fb9c9.png)



### 通信协议

#### RESP协议


#### 模拟Redis客户端




### 内存策略

#### 过期策略

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/53a9d3eee96f422ebded261790aa7b6f.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/5ad3cc63d530450285bc3474af241c7f.png)

过期策略是惰性删除和周期删除相结合

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/eeb659c6bfe44123a3074336f70fa229.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/d60ad4e07514467a8d2f1839cbed8d97.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/709d45ca0bbf42d3973332a90b41d394.png)



#### 淘汰策略

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/1a924075676e4812a8d24204c0d79837.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/2f59d6b4e6da4943b21d67b898bf87f3.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/672262b51c5d40aaa479065239691376.png)


## 参考

黑马程序员

