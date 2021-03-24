# hhu_spider


## hhu健康打卡脚本（返校版）

### 环境
必装环境 python， requests

推荐环境 anaconda,  pycharm

### 功能说明

定时打卡、同时多人打卡、发邮件反馈打卡信息、失败重新打卡

（为什么不用发信息，国内手机号在twilio上不能用了）


### 使用方法

在#\*\*xxx\*\* 中按xxx提示填入自己的相关信息

运行

#### 关于定时打卡

将脚本传到服务器上，用cronb（linux系统）实现定时，可以选择发邮件反馈打卡情况

### 代码

```python
import requests
import sys
import datetime
import smtplib
from email.mime.text import MIMEText
from email.header import Header


def send_email(status, email, abbr, now_time):
    mail_host = "smtp.qq.com"       #现在是qq邮箱
    mail_user = "xxxxxxx"           #**发送打卡信息的邮箱**
    mail_pass = "xxxxxxx"           #**邮箱授权码**

    sender = 'xxxxxxx'              #**邮件发送方的邮箱**
    receivers = []                  # 接收邮件方
    receivers.append(email)


    if status:  text = '打卡成功！！！'
    else :  text = '打卡失败 T_T，请手动打卡'

    message = MIMEText(text + '今天是' + now_time + '\n如有信息变动，请即时反馈\n如果有一天没收到邮件请手动打卡', 'plain', 'utf-8')
    message['From'] = Header("xxxxxxx", 'utf-8')        #**邮件发送方的名字（自定义）**
    message['To'] = Header(abbr, 'utf-8')

    subject = text
    message['Subject'] = Header(subject, 'utf-8')

    try:
        smtpObj = smtplib.SMTP_SSL()
        smtpObj.connect(mail_host, 465)         #在阿里云上要用465端口和ssl
        smtpObj.login(mail_user, mail_pass)
        smtpObj.sendmail(sender, receivers, message.as_string())
        print("邮件发送成功")
    except smtplib.SMTPException:
        print("Error: 无法发送邮件")




def daka(user_data):
    session = requests.Session()
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
    }
    login_url = 'http://ids.hhu.edu.cn/amserver/UI/Login'
    user = user_data['user_name']
    password = user_data['password']

    data = {
        'Login.Token1': user,
        'Login.Token2': password,
        'goto': 'http://my.hhu.edu.cn/loginSuccess.portal',
        'gotoOnFail': 'http://my.hhu.edu.cn/loginFailure.portal'
    }
    login_response_text = session.post(url=login_url, headers=headers, data=data).text
    if 'handleLoginSuccessed' in login_response_text:
        print('登录成功')
    else:
        print('登录失败，请修改用户名和密码重新登录')
        sys.exit()

    ui_url = 'http://form.hhu.edu.cn/pdc/form/list'
    session.get(url=ui_url, headers=headers)

    form_url = 'http://form.hhu.edu.cn/pdc/formDesignApi/initFormAppInfo'

    data = {
        'selfFormWid': 'A335B048C8456F75E0538101600A6A04'
    }
    form_response = session.post(url=form_url, data=data, headers=headers)
    print('获得表单界面状态码', form_response.status_code)

    post_url = 'http://form.hhu.edu.cn/pdc/formDesignApi/dataFormSave?wid=A335B048C8456F75E0538101600A6A04&userId=' + user

    now_time = datetime.datetime.now().strftime('%Y/%m/%d')

    data = {
        'DATETIME_CYCLE': now_time,
        'XGH_336526': user_data['XGH_336526'],
        'XM_1474': user_data['XM_1474'],
        'SFZJH_859173': user_data['SFZJH_859173'],
        'SELECT_941320': user_data['SELECT_941320'],
        'SELECT_459666': user_data['SELECT_459666'],
        'SELECT_814855': user_data['SELECT_814855'],
        'SELECT_525884': user_data['SELECT_525884'],
        'SELECT_125597': user_data['SELECT_125597'],
        'TEXT_950231': user_data['TEXT_950231'],
        'TEXT_937296': user_data['TEXT_937296'],
        'RADIO_853789': '否',
        'RADIO_43840': '否',
        'RADIO_579935': '健康',
        'RADIO_138407': '是',
        'RADIO_546905':'',
        'RADIO_314799':'',
        'RADIO_209256':'',
        'RADIO_836972':'',
        'RADIO_302717':'',
        'RADIO_701131':'',
        'RADIO_438985':'',
        'RADIO_467360':'',
        'PICKER_956186':'',
        'TEXT_434598':'',
        'TEXT_515297':'',
        'TEXT_752063':''

    }

    post_response = session.post(url=post_url, data=data, headers=headers)
    print('提交表单后状态码', post_response.status_code)
    final_text = post_response.text
    print(final_text)
    if 'true' in final_text:
        print('今天是: ', now_time)
        print('打卡成功!!!')
        send_email(True, user_data['email'], user_data['abbr'], now_time)
        return True
    else:
        print('打卡失败')
        return False




if __name__ == '__main__':


    users = []

    user2 = {
        'name' : 'xxxxxxx',     #**打卡者姓名（为了区分不同打卡者）**

        'user_name' : 'xxxxxxx',   #**用户名（一般是学号）**
        'password' : 'xxxxxxx',      #**密码**

        'XGH_336526': 'xxxxxxx',         #**学号**
        'XM_1474': 'xxxxxxx',               #**姓名**
        'SFZJH_859173': 'xxxxxxx',       #**身份证号**
        'SELECT_941320': 'xxxxxxx',         #**学院（只能是选择列表中的值，比如：计信院）**
        'SELECT_459666': 'xxxxxxx',         #**年级（只能是选择列表中的值，比如：2019级）**
        'SELECT_814855': 'xxxxxxx',         #**专业（只能是选择列表中的值，比如：计算机）**
        'SELECT_525884': 'xxxxxxx',         #**班级（只能是选择列表中的值，比如：计算机19_2）**
        'SELECT_125597': 'xxxxxxx',      #**宿舍楼（只能是选择列表中的值，比如：江宁校区教学区25舍）**
        'TEXT_950231': 'xxxxxxx',           #**宿舍号，比如205**
        'TEXT_937296': 'xxxxxxx',       #**手机号码**

        'email' : 'xxxxxxx',            #**将打卡信息发送至这个邮箱**
        'abbr' : 'xxxxxxx'              #**名字缩写（用作邮件接受者的名字）**
    }

    user1 = {
        'name' : 'xxxxxxx',     #**打卡者姓名（为了区分不同打卡者）**

        'user_name' : 'xxxxxxx',   #**用户名（一般是学号）**
        'password' : 'xxxxxxx',      #**密码**

        'XGH_336526': 'xxxxxxx',         #**学号**
        'XM_1474': 'xxxxxxx',               #**姓名**
        'SFZJH_859173': 'xxxxxxx',       #**身份证号**
        'SELECT_941320': 'xxxxxxx',         #**学院（只能是选择列表中的值，比如：计信院）**
        'SELECT_459666': 'xxxxxxx',         #**年级（只能是选择列表中的值，比如：2019级）**
        'SELECT_814855': 'xxxxxxx',         #**专业（只能是选择列表中的值，比如：计算机）**
        'SELECT_525884': 'xxxxxxx',         #**班级（只能是选择列表中的值，比如：计算机19_2）**
        'SELECT_125597': 'xxxxxxx',      #**宿舍楼（只能是选择列表中的值，比如：江宁校区教学区25舍）**
        'TEXT_950231': 'xxxxxxx',           #**宿舍号，比如205**
        'TEXT_937296': 'xxxxxxx',       #**手机号码**

        'email' : 'xxxxxxx',            #**将打卡信息发送至这个邮箱**
        'abbr' : 'xxxxxxx'              #**名字缩写（用作邮件接受者的名字）**
    }


    #如果还有用户，则继续添加

    users.append(user1)
    users.append(user2)

    for user in users:
        T = 10                          #打卡失败的尝试次数
        while T > 0:
            T -= 1
            if daka(user_data=user) :
                break
            print('-------------尝试重新打卡--------------')
        if T == 0:
            print('最终打卡失败，请尝试手动打卡')
            send_email(False, user['email'], user['abbr'], '')
```

## hhu查成绩脚本（新版教务系统）

### 环境

必装环境 python , chaojiying_api , selenium , chromedriver , requests

推荐环境 anaconda , pycharm


### 功能说明

查本学期成绩（可以通过修改源码变成查所有成绩）、查绩点排名

### 使用方法

把#\*\*XXXX\*\*按XXXX提示改成自己的信息

在chaojiying.py中填写自己的账号和密码

在主程序中可以修改要查成绩的学年学期，按{}中的值填写，对应关系如下

2020-2021学年1 {2020-2021-1-1}

2019-2020学年2 {2019-2020-2-1}

2019-2020学年1 {2019-2020-1-1}

2018-2019学年2 {2018-2019-2-1}

2018-2019学年1 {2018-2019-1-1}

运行


### 代码

chaojiying_Python/chaojiying.py


```python
#!/usr/bin/env python
# coding:utf-8

import requests
from hashlib import md5

class Chaojiying_Client(object):

    def __init__(self, username, password, soft_id):
        self.username = username
        password =  password.encode('utf-8')
        self.password = md5(password).hexdigest()
        self.soft_id = soft_id
        self.base_params = {
            'user': self.username,
            'pass2': self.password,
            'softid': self.soft_id,
        }
        self.headers = {
            'Connection': 'Keep-Alive',
            'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
        }

    def PostPic(self, im, codetype):
        """
        im: 图片字节
        codetype: 题目类型 参考 http://www.chaojiying.com/price.html
        """
        params = {
            'codetype': codetype,
        }
        params.update(self.base_params)
        files = {'userfile': ('ccc.jpg', im)}
        r = requests.post('http://upload.chaojiying.net/Upload/Processing.php', data=params, files=files, headers=self.headers)
        return r.json()

    def ReportError(self, im_id):
        """
        im_id:报错题目的图片ID
        """
        params = {
            'id': im_id,
        }
        params.update(self.base_params)
        r = requests.post('http://upload.chaojiying.net/Upload/ReportError.php', data=params, headers=self.headers)
        return r.json()


def main():
    chaojiying = Chaojiying_Client('xxxxxx', 'xxxxxx', '912462')	#用户中心>>软件ID 生成一个替换 96001
    im = open('chaojiying_Python/captcha.png', 'rb').read()													#本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
    return chaojiying.PostPic(im, 1902)['pic_str']												#1902 验证码类型  官方网站>>价格体系 3.4+版 print 后要加()
```


主程序

```python
import requests
import chaojiying_Python.chaojiying as cjy
from selenium import webdriver
from time import sleep
from PIL import Image
from lxml import etree
import sys
import re
from selenium.webdriver.chrome.options import Options


def main():
    id = 'xxxxxxx'      #**学号**
    pwd = 'xxxxxxx'     #**密码**

    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')

    proxy_ip = {"http": '183.166.70.155:9999'}

    browser = webdriver.Chrome(executable_path='chromedriver.exe', chrome_options=chrome_options)

    #chrome > 79
    browser.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
        Object.defineProperty(navigator, 'webdriver', {
          get: () => undefined
        })
      """
    })

    browser.maximize_window()
    login_url = 'http://202.119.114.197/login'
    browser.get(url=login_url)
    sleep(2)
    # browser.quit()
    browser.save_screenshot('login_interface.png')
    captcha_img_ele = browser.find_element_by_xpath('//*[@id="captchaImg"]')
    location = captcha_img_ele.location  # 左上角
    size = captcha_img_ele.size
    scale = 1
    captcha_coordinates = (
    int(location['x']) * scale, int(location['y']) * scale, int(location['x'] + size['width']) * scale,
    int(location['y'] + size['height']) * scale)
    i = Image.open('login_interface.png')
    frame = i.crop(captcha_coordinates)
    frame.save('chaojiying_Python/captcha.png')
    captcha_val = cjy.main()
    # print(captcha_val)

    id_input = browser.find_element_by_xpath('//*[@id="input_username"]')
    id_input.send_keys(id)
    pwd_input = browser.find_element_by_xpath('//*[@id="input_password"]')
    pwd_input.send_keys(pwd)
    captcha_input = browser.find_element_by_xpath('//*[@id="input_checkcode"]')
    captcha_input.send_keys(captcha_val)
    login_button = browser.find_element_by_xpath('//*[@id="loginButton"]')
    login_button.click()

    if 'errorCode=badCredentials' in browser.current_url:
        print('用户名或密码错，请重新登录')
        browser.quit()
        sys.exit()
    if 'errorCode=badCaptcha' in browser.current_url:
        print('验证码错，请重新登录')
        browser.quit()
        sys.exit()

    cookies = browser.get_cookies()

    query_url = 'http://202.119.114.197/student/integratedQuery/scoreQuery/allTermScores/data'

    data = {
        'zxjxjhh': '2020-2021-1-1',     #**此处可以修改要查成绩的学年学期**
        'kch': '',
        'kcm': '',
        'pageNum': '1',
        'pageSize': '30'
    }

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36'
    }
    session = requests.Session()
    for cookie in cookies:
        session.cookies.set(cookie['name'], cookie['value'])
    reports = session.post(url=query_url, data=data, headers=headers).json()['list']['records']
    # print(reports)

    gpa_url = 'http://202.119.114.197/student/integratedQuery/gpaRankingQuery/index/jdpmcx'
    gpa_result = session.get(url=gpa_url, headers=headers).text
    # print(gpa_result)

    regexs = []
    for i in range(5):
        regexs.append(' class="report1_' + str(i + 1) + '">(.*?)</td>')

    info = []
    for i in range(5):
        info = re.findall(regexs[i], gpa_result, re.S)
        if len(info) == 11:
            break

    # print(info)
    sleep(2)

    browser.quit()

    # 数据处理 reports 和 info

    name = []
    credit = []
    score = []
    for course in reports:
        name.append(course[11])
        credit.append(course[13])
        score.append(course[8])

    length = len(name)
    for i in range(length):
        print(name[i], credit[i], score[i])

    print('---------------------------------------')

    print('人数: ', info[4])
    print('绩点: ', info[5])
    print('排名: ', info[7])
    print('平均成绩: ', info[6])

if __name__ == '__main__':
    main()
```

