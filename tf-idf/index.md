# tf-idf


记录一下tf-idf

TF-IDF（term frequency–inverse document frequency）是一种用于信息检索与数据挖掘的常用加权技术。TF为词频，定义为

$$
TF_i = \frac{n_i}{n}
$$

其中TFi为第i种单词的TF值，ni为该文档中第i种单词出现的频数，n为文档的总单词数

IDF为逆文档频率，定义为

$$
IDF_i = \log\frac{F}{F_w}
$$

其中IDF为第i种单词的idf值，F是语料库文档数量，Fw是包含这个单词的文档数量，

$$
(TF-IDF)_i = TF_i * IDF_i
$$

可以看出tf-idf值越小，这个词越常用


信息检索系统的作业是：试按tf-idf算法在剔除一些常用词后给出文本中术语的统计算法和程序，并按降序进行排序

```python
# encoding=utf-8
import jieba
import re
import os
import math
punc_reg = '\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5'

class Article:
    def __init__(self, content):
        self.content = content

    def cut_word(self):
        self.cut_result = list(jieba.cut(self.content))
        tmp_result = []
        for word in self.cut_result:
            if re.match(punc_reg, word) == None:
                tmp_result.append(word)
        self.cut_result = tmp_result

    def cal_tf(self):
        self.tf = {}
        sz = len(self.cut_result)
        for word in self.cut_result:
            if word not in self.tf.keys():
                self.tf[word] = 1
            else:
                self.tf[word] += 1
        for word in self.tf:
            self.tf[word] = float(self.tf[word] / sz)

    def cal_tf_idf(self):
        self.tf_idf = {}
        for word in self.tf:
            self.tf_idf[word] = self.tf[word] * idf[word]

    def get_result(self):
        tmp_list = list(zip(self.tf_idf.keys(), self.tf_idf.values()))
        tmp_list = sorted(tmp_list, key=lambda x : x[1], reverse=True)
        print('----------------------------')
        for i in range(20):
            print(tmp_list[i][0], tmp_list[i][1])
        print('----------------------------')
        print()


def cal_idf():
    for article in articles:
        for word in article.cut_result:
            idf[word] = 1

    for word in idf:
        for article in articles:
            if word in article.cut_result:
                idf[word] += 1

    for word in idf:
        idf[word] -= 1

    sz = len(articles)
    for word in idf:
        idf[word] = math.log(sz / idf[word])


def read_content():
    path = 'material/Chinese article'
    files = os.listdir(path)
    for file in files:
        with open(str(path + '/' + file), encoding='utf-8') as f:
            data = f.read()
            article = Article(data)
            articles.append(article)

def work():
    for article in articles:
        article.cut_word()
        article.cal_tf()
    cal_idf()
    for article in articles:
        article.cal_tf_idf()
        article.get_result()


if __name__ == '__main__':
    idf = {}
    articles = []

    read_content()

    work()
```



其中一篇文章的测试效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/c5d502f8682f4a098a14c16b94e5982e.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/bb65a5be61fc4b45a1269f11d9147d89.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_8,color_FFFFFF,t_70,g_se,x_16)
