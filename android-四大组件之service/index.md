# Android 四大组件之Service




# Service
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020031909222543.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
## Service的生命周期
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319092350922.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

## 通过启动Service传递数据
在serviceactivity的输入框中输入数据，启动Myservice并传递数据，打印到日志

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020031910391510.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319104054866.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

serviceactivity_xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".serviceActivity">

    <Button
        android:id="@+id/sbtn1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="startservice"
        android:textSize="25sp"/>
    <Button
        android:id="@+id/sbtn2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="25dp"
        android:text="stopservice"
        app:layout_constraintTop_toBottomOf="@+id/sbtn1"
        android:layout_marginTop="20dp"/>

    <Button
        android:id="@+id/sbtn3"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="25dp"
        android:text="bindservice"
        app:layout_constraintTop_toBottomOf="@+id/sbtn2"
        android:layout_marginTop="20dp"/>


    <Button
        android:id="@+id/sbtn4"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="25dp"
        android:text="unbindservice"
        app:layout_constraintTop_toBottomOf="@+id/sbtn3"
        android:layout_marginTop="20dp"/>

    <EditText
        android:id="@+id/set1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toBottomOf="@+id/sbtn4"
        android:textSize="20sp"
        android:layout_marginTop="20dp"/>

    <Button
        android:id="@+id/sbtn5"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="25dp"
        android:text="syncdata"
        app:layout_constraintTop_toBottomOf="@+id/set1"
        android:layout_marginTop="30dp"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

serviceactivity.java

```java
sbtn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(serviceActivity.this , MyService.class);
                intent.putExtra("data",set1.getText().toString());
                startService(intent);
            }
        });
```

Myservice.java

```java
private   String data="cat";
    private boolean running=false;
```

```java
@Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        data = intent.getStringExtra("data");

        //Log.d("tag",data);
        return super.onStartCommand(intent, flags, startId);
    }
```

```java
@Override
    public void onCreate() {
        super.onCreate();
        //Log.d("tag",data);
        running=true;
        new Thread(){
            @Override
            public void run() {
                super.run();
                while (running){
                    System.out.println(data);
                    try {
                        sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }.start();
    }
```

## 通过绑定来同步数据

点击bindservice

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319105311999.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319105228723.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

输入数据，点击syncdata

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319105512462.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319105416614.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
service.java

```java
package com.example.test;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class serviceActivity extends AppCompatActivity implements ServiceConnection {

    private Button sbtn1,sbtn2,sbtn3,sbtn4;
    private EditText set1;
    private Button sbtn5;
    private MyService.mybinder binder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_service);

        sbtn1 = findViewById(R.id.sbtn1);
        sbtn2 = findViewById(R.id.sbtn2);
        sbtn3 = findViewById(R.id.sbtn3);
        sbtn4 = findViewById(R.id.sbtn4);
        set1 = findViewById(R.id.set1);
        sbtn5 = findViewById(R.id.sbtn5);

        sbtn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(serviceActivity.this , MyService.class);
                intent.putExtra("data",set1.getText().toString());
                startService(intent);
            }
        });

        sbtn2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(serviceActivity.this , MyService.class);
                stopService(intent);
            }
        });

        sbtn3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(serviceActivity.this , MyService.class);
                bindService(intent,serviceActivity.this, Context.BIND_AUTO_CREATE);
            }
        });

        sbtn4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Intent intent = new Intent(serviceActivity.this,MyService.class);
                unbindService(serviceActivity.this);
            }
        });

        sbtn5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(binder!=null){
                    binder.setdata(set1.getText().toString());
                    //System.out.println(MyService.data);
                }
            }
        });
    }


    @Override
    public void onServiceConnected(ComponentName name, IBinder service) {
        Log.d("service123","connected123");
        binder = (MyService.mybinder) service;
    }

    @Override
    public void onServiceDisconnected(ComponentName name) {

    }
}

```


Myservive.java

```java
package com.example.test;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;

public class MyService extends Service {
    private   String data="cat";
    private boolean running=false;
    public MyService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        //throw new UnsupportedOperationException("Not yet implemented");
        //return new Binder();
        return new mybinder();
    }

    public class mybinder extends Binder{    //是binder不是 ibinder
        public void setdata(String data){
            MyService.this.data = data;
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        //data = intent.getStringExtra("data");

        //Log.d("tag",data);
        return super.onStartCommand(intent, flags, startId);
    }





    @Override
    public boolean onUnbind(Intent intent) {
        return super.onUnbind(intent);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        //Log.d("tag",data);
        running=true;
        new Thread(){
            @Override
            public void run() {
                super.run();
                while (running){
                    System.out.println(data);
                    try {
                        sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }.start();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d("tag","dog");
        running=false;
    }


}

```

## 在manifest里的注册

```xml
<activity
            android:name=".serviceActivity"
            android:exported="true" />

        <service
            android:name=".MyService"
            android:enabled="true"
            android:exported="true" />
```

