# Android 四大组件之Activity




# Activity
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020031908390495.PNG)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319083947645.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319084012872.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
## activity的生命周期
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318214923967.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

运行以下代码可以看到activity经历的生命周期

```java
package com.example.test;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;

public class lifeCircleActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_life_circle);
        Log.d("lifecircle","-----onCreate----");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d("lifecircle","-----onStart----");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d("lifecircle","-----onResume----");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d("lifecircle","-----onPause----");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d("lifecircle","-----onStop----");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.d("lifecircle","-----onRestart----");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d("lifecircle","-----onDestroy----");
    }

}

```

启动这个activity之后

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318215656185.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

按返回键退出activity

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318215847508.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

再启动activity,并按主页键或者菜单键

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318220024498.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

在cache中重新进入activity

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318220122115.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

## activity之间的跳转

方法有很多

以下是设置点击事件来跳转

```java
private Button bt11;
bt11 = findViewById(R.id.bt11);
        bt11.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this , broadActivity.class);
                startActivity(intent);
            }
        });
```
## 隐式intent

目标activity在manifest文件中应这样注册

```xml
<activity android:name=".implicitIntentActivity">
            <intent-filter>
                <action android:name="com.example.test.124"/>
                <category android:name="android.intent.category.DEFAULT"/>
            </intent-filter>
        </activity>
```

点击事件的设置

```java
bt14 = findViewById(R.id.bt14);
        bt14.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setAction("com.example.test.124");
                startActivity(intent);
            }
        });
```

## activity之间的数据传输

### 将activity的数据传输到目标activity

#### 发送数据

```java
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_jump);
        jumpbt1 = findViewById(R.id.jumpbt1);
        jumpbt1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(jumpActivity.this , jump2Activity.class);
                Bundle bundle = new Bundle();
                bundle.putString("name","henry");
                bundle.putInt("number",11);
                intent.putExtras(bundle);
                startActivity(intent);
                //startActivityForResult(intent,0);  //写在点击事件里

            }
        });
    }
```

#### 接收数据并呈现

```java
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_jump2);
        jump2tv1 = findViewById(R.id.jump2tv1);
        Bundle bundle = new Bundle();
        bundle = getIntent().getExtras();
        String name = bundle.getString("name");
        int number = bundle.getInt("number");
        jump2tv1.setText(name+","+number);}
```

## 启动一个activity,结束后返回结果

jump界面

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318225517386.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

jump2界面

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318225554652.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

点击back返回结果（一个toast）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318225704219.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

jumpactivity

```java
package com.example.test;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class jumpActivity extends AppCompatActivity {


    private Button jumpbt1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_jump);
        jumpbt1 = findViewById(R.id.jumpbt1);
        jumpbt1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(jumpActivity.this , jump2Activity.class);
                Bundle bundle = new Bundle();
                bundle.putString("name","henry");
                bundle.putInt("number",11);
                intent.putExtras(bundle);
                //startActivity(intent);
                startActivityForResult(intent,0);  //写在点击事件里

            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Toast.makeText(jumpActivity.this,data.getExtras().getString("msg"),Toast.LENGTH_LONG).show() ;
    }
}

```

jump2activity

```java
package com.example.test;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class jump2Activity extends AppCompatActivity {

    private TextView jump2tv1;
    private Button jump2bt1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_jump2);
        jump2tv1 = findViewById(R.id.jump2tv1);
        Bundle bundle = new Bundle();
        bundle = getIntent().getExtras();
        String name = bundle.getString("name");
        int number = bundle.getInt("number");
        jump2tv1.setText(name+","+number);

        jump2bt1 = findViewById(R.id.jump2bt1);
        jump2bt1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                Bundle bundle1 = new Bundle();
                bundle1.putString("msg","i'm back");
                intent.putExtras(bundle1);
                setResult(Activity.RESULT_OK,intent);
                finish();
            }
        });
    }
}

```

