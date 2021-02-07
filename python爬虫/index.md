# Python爬虫



## urllib模块

不使用

## requests模块

### 获得网页源码

```python
import requests
url = 'https://dyhgo.fun'
response = requests.get(url)
print(response.text)
```

### 带参数的url和UA伪装

```python
#测试一下带参数的url和ua伪装
import requests
url = 'https://www.baidu.com/s'
name = input('输入您要搜索的内容，我们将返回百度搜索该信息的网页源码')
params = {
    'wd' : name
}
headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}
response = requests.get(url=url, params=params, headers=headers)
print(response.text)
```


### 案例：有道翻译查词

```python
#有道翻译的结果获取，查询look单词并将结果存储
import requests
import json
params = {
    'i': 'look',
    'from': 'AUTO',
    'to': 'AUTO',
    'smartresult': 'dict',
    'client': 'fanyideskweb',
    'salt': '16119129043609',
    'sign': '288cdf16af5fa68411381ba3c9f7f874',
    'lts': '1611912904360',
    'bv': '44a53b4124e8b822ebfd881c5a599938',
    'doctype': 'json',
    'version': '2.1',
    'keyfrom': 'fanyi.web',
    'action': 'FY_BY_REALTlME'
}
url = 'http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule'
headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}
response = requests.post(url=url, data=params, headers=headers)
f = open('look.json', 'w', encoding='utf-8')
json.dump(response.json(), fp=f, ensure_ascii=False)
f.close()
print(response.json())
```


### 案例：获取豆瓣影单

[网站链接](https://movie.douban.com/typerank?type_name=%E5%96%9C%E5%89%A7&type=24&interval_id=100:90&action=)

```python
#获取豆瓣影单
import requests
import json
url = 'https://movie.douban.com/j/chart/top_list'
headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}
params = {
    'type': '24',
    'interval_id': '100:90',
    'action':'',
    'start': '1',
    'limit': '2'
}
response = requests.get(url=url, params=params, headers=headers)
list_data = response.json()
f = open('douban.json', 'w', encoding='utf-8')
json.dump(list_data, fp=f, ensure_ascii=False)
f.close()
```


### 案例：kfc餐厅信息

[网站链接](http://www.kfc.com.cn/kfccda/storelist/index.aspx)

```python
#kfc餐厅信息
import requests
url = 'http://www.kfc.com.cn/kfccda/ashx/GetStoreList.ashx?op=keyword'
params = {
    'cname':'',
    'pid':'',
    'keyword': '上海',
    'pageIndex': '1',
    'pageSize': '10'
}
headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}
response = requests.post(url=url, data=params, headers=headers)
print(response.text)
```


### 案例：药监局相关信息

注意数据由ajax加载

[网站链接](http://scxk.nmpa.gov.cn:81/xk/)

```python
#药监局相关数据
import requests
import json
url1 = 'http://scxk.nmpa.gov.cn:81/xk/itownet/portalAction.do?method=getXkzsList'
headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}
data = {
    'on': 'true',
    'page': '1',
    'pageSize': '15',
    'productName':'',
    'conditionType': '1',
    'applyname':'',
    'applysn':''
}
id_list = []
response = requests.post(url=url1, data=data, headers=headers).json()['list']
for i in response:
    id_list.append(i['ID'])
#print(id_list)

detail_list = []
url2 = 'http://scxk.nmpa.gov.cn:81/xk/itownet/portalAction.do?method=getXkzsById'
for id in id_list:
    data = {
        'id' : id
    }
    response = requests.post(url=url2, data=data, headers=headers).json()
    detail_list.append(response)
    #print(response)
with open('yaojianju.json', 'w', encoding='utf-8') as f:
    json.dump(detail_list, fp=f, ensure_ascii=False, indent=True)
print('over')
```

## 数据解析

### 正则

基础用法参考[此处](https://dyhgo.fun/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F/)

#### 案例：下载糗事百科图片

[网站链接](https://www.qiushibaike.com/imgrank/)

```python
#下载糗事百科的图片
import requests
url = 'https://pic.qiushibaike.com/system/pictures/12402/124029001/medium/J8FFRWUK30TM3X79.jpg'
header = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}
response = requests.get(url=url, headers=header)
image = response.content
with open('qiutu.jpg', 'wb') as f:
    f.write(image)
print('over')
```


#### 案例：批量下载糗事百科图片

[网站链接](https://www.qiushibaike.com/imgrank/)

```python
#用正则表达式下载图片（可批量下载）
# <div class="thumb">
#
# <a href="/article/124031033" target="_blank">
# <img src="//pic.qiushibaike.com/system/pictures/12403/124031033/medium/V35P60R0KM4YCY3Q.jpg" alt="糗事#124031033" class="illustration" width="100%" height="auto">
# </a>
# </div>

import requests
import re
url = 'https://www.qiushibaike.com/imgrank/'
headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}
response = requests.get(url=url, headers=headers).text
#print(response)

regex = '<div class="thumb">.*?<img src="(.*?)" alt.*?</div>'

img_list = re.findall(regex, response, re.S)
#print(img_list)
img_url = 'https:' + img_list[0]
#print(img_url)
response = requests.get(url=img_url, headers=headers).content
#print(type(response))
with open('qiutu2.jpg', 'wb') as f :
    f.write(response)
print('download successfully')
```







### bs4

#### BeautifulSoup解析本地html

```python
#beautifulsoup解析本地html
from bs4 import BeautifulSoup
import requests
with open('test.html', 'r', encoding='utf-8') as f:
    bs = BeautifulSoup(f, 'lxml')
    print(bs)
```


#### BeautifulSoup解析当前获得的html源码

```python
#beautifulsoup解析当前获得的html源码
from bs4 import BeautifulSoup
import requests
url = 'https://dyhgo.fun'
print(BeautifulSoup(requests.get(url=url).text, 'lxml'))
```

#### BeautifulSoup的使用

```python
#beautifulsoup的使用，挺复杂的
from bs4 import BeautifulSoup
with open('forbsfor.html', 'r', encoding='utf-8') as f:
    bs = BeautifulSoup(f, 'lxml')
print(bs)
print(bs.a) #print fitst a tag
print(bs.div)
print(bs.find('div'))   #same as bs.div
print(bs.find('div', class_='header-title'))    #find tag by attribute, notice class
print(bs.find('div', id = 'menu-toggle-mobile'))
print(bs.find_all('a')) #get a list of all 'a' tags

#css selector
print(bs.select('.page-item'))  #a list of tags which of class is 'page-item'
print(bs.select('.header-wrapper > .header-title > a[0]'))  #wrong statement
print(bs.select('.header-wrapper > .header-title > a')[0]) #means level, return a list of all 'a' tags
print(bs.select('.header-wrapper a')[0])    #space means cross level

#get context or attribute
print(bs.select('.header-wrapper a')[0].text)
print(bs.select('.header-wrapper a')[0].get_text())
print(bs.select('.header-wrapper a')[0].string)
print(bs.select('.header-title')[0].text)   #get all text between this tag
print(bs.select('.header-title')[0].get_text())
print(bs.select('.header-title')[0].string) #get direct text between this tag

print(bs.select('.header-wrapper > .header-title > a')[0]['title'])
```


#### 案例：爬取《三国演义》内容

[网站链接](https://www.shicimingju.com/book/sanguoyanyi.html)

```python
#爬取三国演义的内容
import requests
from bs4 import BeautifulSoup
url = 'https://www.shicimingju.com/book/sanguoyanyi.html'
headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}

response = requests.get(url=url, headers=headers).text
bs = BeautifulSoup(response, 'lxml')
#mulu = bs.find('div', class_='book-mulu')
a_list = bs.select('.book-mulu > ul > li > a')
#print(a_list)
f = open('sanguo.txt', 'a', encoding='utf-8')
for a in a_list[:3]:
    title = a.string.encode('iso-8859-1').decode('utf-8')#.encode('iso-8859-1')
    #print(title)
    url_detail = 'https://www.shicimingju.com/' + a['href']
    #print(url_detail)
    #response_detail = requests.get(url=url_detail, headers=headers).text.encode('iso-8859-1')
    # ！！！！！！notice this statement is more common
    response_detail = requests.get(url=url_detail, headers=headers)
    response_detail.encoding = response_detail.apparent_encoding
    response_detail = response_detail.text


    bs = BeautifulSoup(response_detail, 'lxml')

    content_detail = bs.find('div', class_='chapter_content').text#.encode('iso-8859-1')  # !!!!!text not string

    #print(type(content_detail))

    f.write(title + ':' + content_detail + '\n')
    #print(content_detail)

    print(title + 'download successfully')
```


### xpath

很常用

#### 基本用法

```python
from lxml import etree
import requests
parser = etree.HTMLParser()
url = 'https://dyhgo.fun'
response = requests.get(url=url).text
tree = etree.HTML(response)     #without etree.HTMLParser
print(tree.xpath('/html/head/title/text()'))
```

####  xpath语法

```python
from lxml import etree
parser = etree.HTMLParser()
tree = etree.parse('forbsfor.html', parser=parser)
r = tree.xpath('/html/head/meta')   #return a list
r = tree.xpath('/html//meta')       # // means cross level
r = tree.xpath('//div')              # means all tags named div
r = tree.xpath('//div[@class = "header-wrapper"]')      #with condition
r = tree.xpath('(//div[@class =  "header-wrapper"])[2]')    #second div which of class is header-wrapper !!! notice the index is started from 1
r = tree.xpath('(//div[@class = "header-wrapper"])[1]/div/a/text()')    #get DYH but doesn't work if replace '/div/' with '//'
r = tree.xpath('(//div[@class = "header-title"])[1]//text()')       # get ['\r\n            ', 'DYH', '\r\n        '] ok ! so '//text()' means all text and '/text()' means direct text
r = tree.xpath('(//div[@class = "header-title"])[1]/a/@title')      # get attribute of <a>
print(r)
```


#### 案例：获取58同城二手房信息

[网站链接](https://bj.58.com/ershoufang/)

```python
#爬取58信息 notice : the info on website is random

import requests

from lxml import etree
url = 'https://bj.58.com/ershoufang/'
headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}
response = requests.get(url=url, headers=headers).text
tree = etree.HTML(response)
div_list = tree.xpath('(//section[@class = "list"])[1]/div')
#print(div_list)
for div in div_list:
    title = div.xpath('./a/div[@class = "property-content"]//h3/@title')[0]     # '..' means upper level
    print(title)
```

#### xpath或运算（案例：获取所有城市名称）

[网站链接](https://www.aqistudy.cn/historydata/)

```python
#所有城市 xpath 与或运算
import requests
from lxml import etree
url = 'https://www.aqistudy.cn/historydata/'
headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}
response = requests.get(url=url, headers=headers).text
tree = etree.HTML(response)
a_list = tree.xpath('//div[@class = "bottom"]/ul/li/a | //div[@class = "bottom"]/ul/div[2]/li/a')
city_name = []
for a in a_list:
    city_name.append(a.xpath('./text()')[0])
print(city_name, len(city_name))
```


## 验证码识别

使用超级鹰api

[链接](https://www.chaojiying.com/)

[点击此处下载Python版api](https://www.chaojiying.com/download/Chaojiying_Python.rar)

使用示例如下

```python
import requests
from lxml import etree
import chaojiying_Python.chaojiying as rec
url = 'https://so.gushiwen.cn/user/login.aspx?from=http://so.gushiwen.cn/user/collect.aspx'
headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}
response = requests.get(url=url, headers=headers).text
tree = etree.HTML(response)
img_url = 'https://so.gushiwen.cn/' + tree.xpath('//*[@id="imgCode"]/@src')[0]
response = requests.get(url=img_url, headers=headers).content
with open('chaojiying_Python/b.png', 'wb') as f:
    f.write(response)
print(rec.main())
```


## cookie(模拟登录）

#### 案例：登录牛客竞赛网

```python
#session can keep cookie
import requests
url = 'https://www.nowcoder.com/nccommon/login/do?token='
session = requests.Session()
headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
}
data = {
    'email': 'xxxxxxx', #登录账号（手机或邮箱）
    'remember': 'false',
    'cipherPwd': 'xxxxxxxxx'    #加密后的密码（可通过抓包获取）
}
response = session.post(url=url, headers=headers, data=data)
print(response.status_code)
page_src = response.text
profile_url = 'https://ac.nowcoder.com/sns/message/90625985/conversation-list?#/'
profile_resopnse = session.get(url=profile_url, headers=headers)
print(profile_resopnse.status_code)

profile_src = profile_resopnse.text
with open('wangye2.html', 'w', encoding='utf-8') as f:
     f.write(profile_src)
```


## 代理ip

[代理ip的网站](http://www.goubanjia.com/)（大多数不好用）

[代理ip池的github仓库](https://github.com/jhao104/proxy_pool)


```python
#use proxy ip
import requests
headers = {
     'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
 }
src = requests.get(url='http://www.baidu.com/s?wd=ip', headers=headers, proxies={"https" : '183.166.102.222:9999'}).text
```

## 异步爬虫

### 进程池

```python
from multiprocessing.dummy import Pool
import time
def tst(str):
    print(str, 'doing')
    time.sleep(2)
    print(str, 'done')

pool = Pool(3)
sta = time.time()
lis = ['aa', 'bb', 'cc', 'dd']
pool.map(tst, lis)
ed = time.time()
print(ed - sta)	#4s
```

### 案例：爬取梨视频网站视频

[网站链接](https://www.pearvideo.com/category_5)

```python
#https://video.pearvideo.com/mp4/third/20210201/cont-1718821-15765543-134934-hd.mp4
#https://video.pearvideo.com/mp4/third/20210201/1612279360957-15765543-134934-hd.mp4

#pearvideo
import requests
from lxml import etree
import random
from multiprocessing.dummy import Pool
headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}
url = 'https://www.pearvideo.com/category_5'
page_src = requests.get(url=url, headers=headers).text
tree = etree.HTML(page_src)
li_list = tree.xpath('//ul[@id = "listvideoListUl"]/li')
vd_list = []
for li in li_list:
    if li == li_list[0]:
        continue
    #detail_url = 'https://www.pearvideo.com/' + li.xpath('./div/a/@href')[0]
    video_id = li.xpath('./div/a/@href')[0][6:]
    video_name = li.xpath('./div/a/div[@class = "vervideo-title"]/text()')[0] + '.mp4'
    #print(video_id, video_name)

    detail_url = 'https://www.pearvideo.com/videoStatus.jsp'
    params = {
        'contId' : video_id,
        'mrd' : str(random.random())
    }
    new_headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
        'Referer' : 'https://www.pearvideo.com/video_' + video_id
    }
    video_dict = requests.get(url=detail_url, headers=new_headers, params=params).json()
    raw_url = video_dict['videoInfo']['videos']['srcUrl']
    #print(raw_url, video_name)
    left = raw_url.rfind('/')
    right = raw_url.find('-')
    true_url = raw_url.replace(raw_url[left + 1 : right], 'cont-' + video_id)
    #print(true_url, video_name)
    vd = {


        'name' : video_name,
        'url' : true_url
    }
    vd_list.append(vd)


def store(vd):
    url = vd['url']
    name = vd['name']
    dat = requests.get(url=url, headers=headers).content
    print(name, 'downloading')
    with open(name, 'wb') as f:
        f.write(dat)
    print(name, 'done')

pool = Pool(4)
pool.map(store, vd_list)
pool.close()
pool.join()
```


## selenium模块

以chrome为例

### 安装驱动

根据chrome的版本安装相应的chromedriver

[链接](http://npm.taobao.org/mirrors/chromedriver/)

### 基本用法

windows系统

```python
from selenium import webdriver
from lxml import etree
import time
browser = webdriver.Chrome(executable_path='chromedriver.exe')
browser.get(url='http://scxk.nmpa.gov.cn:81/xk/')
page_src = browser.page_source
tree = etree.HTML(page_src)
li_list = tree.xpath('//ul[@id="gzlist"]/li')
for li in li_list:
    name = li.xpath('./dl/@title')[0]
    print(name)

time.sleep(5)
browser.quit()
```


### 一些操作

```python
from selenium import webdriver
import time
browser = webdriver.Chrome(executable_path='chromedriver.exe')
browser.maximize_window()
browser.get(url='https://www.taobao.com/')
time.sleep(1)
search_input = browser.find_elements_by_id('q')[0]
search_input.send_keys('ipad')
time.sleep(1)
btn = browser.find_elements_by_css_selector('.btn-search')[0]
btn.click()
time.sleep(1)
browser.execute_script('window.scrollTo(0, document.body.scrollHeight)')
time.sleep(2)
browser.get('https://dyhgo.fun')
time.sleep(5)
browser.back()
time.sleep(2)
browser.forward()
time.sleep(2)
time.sleep(3)
browser.quit()
```


### 无头浏览器

```python
#phantomJs also works
from selenium import webdriver
import time
from selenium.webdriver.chrome.options import Options
chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
browser = webdriver.Chrome(executable_path='chromedriver.exe', chrome_options=chrome_options)
browser.get(url='https://dyhgo.fun')
page_src = browser.page_source
time.sleep(2)
print(page_src)
browser.quit()
```

### 规避检测

版本chrome <= 79 

```python
from selenium import webdriver
import time
from selenium.webdriver import ChromeOptions
option = ChromeOptions()
option.add_experimental_option('excludeSwitches', ['enable-automation'])
browser = webdriver.Chrome(executable_path='chromedriver.exe', options=option)
browser.get(url='https://dyhgo.fun')
page_src = browser.page_source
time.sleep(2)
print(page_src)
browser.quit()
```


版本chrome > 79

```python
from selenium import webdriver
import time
browser = webdriver.Chrome(executable_path='chromedriver.exe')
browser.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
        Object.defineProperty(navigator, 'webdriver', {
          get: () => undefined
        })
      """
    })
browser.get(url='https://dyhgo.fun')
page_src = browser.page_source
time.sleep(2)
print(page_src)
browser.quit()
```


## scrapy框架

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207161753956.png)

## hhu爬虫

（已停止维护）

### hhu健康打卡脚本（假期版）

### hhu查成绩脚本（新版教务系统）

[点击此处](https://dyhgo.fun/hhu_spider)

