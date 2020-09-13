# Android 四大组件之Broadcast Receiver




# Broadcast Receiver

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319083437278.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319083547766.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

## 通过LoaclBroadcastManager发送广播并接收广播

点击broadactivity的click,跳转到broad2activity

点击broad2activity的clickme,发送广播

broadactivity接收广播，将abc改成123

broadactivity

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319090758814.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

broad2activity

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319090849619.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

点击clickme后返回到broadactivity

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319090946266.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

代码

broadactivity_xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".broad.broadActivity">

    <Button
        android:id="@+id/bcbt1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toTopOf="parent"
        android:layout_marginTop="40dp"
        android:textSize="30sp"
        android:text="click"/>

    <TextView
        android:id="@+id/bctv1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="abc"
        android:textSize="60sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/bcbt1"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintVertical_bias="0.3"
        />

</androidx.constraintlayout.widget.ConstraintLayout>
```

broadactivity_java

```java
package com.example.test.broad;

import androidx.appcompat.app.AppCompatActivity;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.example.test.R;

public class broadActivity extends AppCompatActivity {

    private Button bcbt1;
    private TextView bctv1;
    private Mybroad mybroad;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_broad);

        bcbt1 = findViewById(R.id.bcbt1);
        bctv1 = findViewById(R.id.bctv1);

        bcbt1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(broadActivity.this , broad2Activity.class);
                startActivity(intent);
            }
        });

        mybroad = new Mybroad();
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction("sss");
        LocalBroadcastManager.getInstance(broadActivity.this).registerReceiver(mybroad,intentFilter);

    }

    private class Mybroad extends BroadcastReceiver{
        @Override
        public void onReceive(Context context, Intent intent) {
            //接收到广播要处理的事
            switch(intent.getAction()){
                case "sss":
                    bctv1.setText("123");
                    break;
            }
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        LocalBroadcastManager.getInstance(broadActivity.this).unregisterReceiver(mybroad);
    }
}

```

broad2activity_xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".broad.broad2Activity">

    <Button
        android:id="@+id/bc2bt1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toTopOf="parent"
        android:layout_marginTop="30dp"
        android:textSize="30sp"
        android:text="click me"/>


</androidx.constraintlayout.widget.ConstraintLayout>
```

broad2activity_java

```java
package com.example.test.broad;

import androidx.appcompat.app.AppCompatActivity;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.example.test.R;

public class broad2Activity extends AppCompatActivity {

    private Button bc2bt1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_broad2);

        bc2bt1 = findViewById(R.id.bc2bt1);
        bc2bt1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent("sss");
                LocalBroadcastManager.getInstance(broad2Activity.this).sendBroadcast(intent);
            }
        });
    }
}

```

## 一些系统操作对应的action

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319091950607.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319092025721.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
