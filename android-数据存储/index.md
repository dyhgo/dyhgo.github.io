# Android 数据存储






# SharedPreferences





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200322213737854.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70#pic_center)


sharedpreferences的布局

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200322214132290.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

布局文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".datastorage.sharedPreferencesActivity">

    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/spet1"
        android:hint="input"
        android:textSize="25sp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintVertical_bias="0.1"
        />

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="25sp"
        android:text="sava"
        app:layout_constraintTop_toBottomOf="@+id/spet1"
        android:layout_marginTop="20dp"
        android:id="@+id/spbtn1"/>

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="25sp"
        android:text="show"
        app:layout_constraintTop_toBottomOf="@+id/spbtn1"
        android:layout_marginTop="20dp"
        android:id="@+id/spbtn2"/>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/sptv1"
        android:textSize="25sp"
        app:layout_constraintTop_toBottomOf="@+id/spbtn2"
        android:layout_marginTop="20dp"
        />


</androidx.constraintlayout.widget.ConstraintLayout>
```

输入内容，存储到sharedpreferences,并呈现

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020032221441910.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

```java
package com.example.test.datastorage;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.test.R;


public class sharedPreferencesActivity extends AppCompatActivity {

    private Button spbtn1,spbtn2;
    private EditText spet1;
    private TextView sptv1;
    private SharedPreferences mysp;
    private SharedPreferences.Editor myspe;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_shared_preferences);

        spbtn1 = findViewById(R.id.spbtn1);
        spbtn2 = findViewById(R.id.spbtn2);
        spet1 = findViewById(R.id.spet1);
        sptv1 = findViewById(R.id.sptv1);

        //实例化
        mysp = getSharedPreferences("data",MODE_PRIVATE);
        myspe = mysp.edit();

        spbtn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                myspe.putString("name",spet1.getText().toString());
                myspe.apply();       //相当于提交

            }
        });

        spbtn2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sptv1.setText(mysp.getString("name",""));
            }
        });

    }
}

```

sharedpreferences把数据存在xml文件中

在路径 `data\data\<applicationId>\shared_prefs`下有一个xml文件

真机要root查看

模拟器直接在终端打开monitor

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020032221571788.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

要查看这个文件可以点击右上角的 `pull a file from the device` 下载下来

打开之后

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200322220025675.PNG)
 
# File 内部存储

布局和功能几乎与sharedpreferences相同

java文件

```java
package com.example.test.datastorage;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.test.R;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class fileActivity extends AppCompatActivity {

    private Button fibtn1,fibtn2;
    private EditText fiet1;
    private TextView fitv1;
    private final String filename = "test.txt";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_file);

        fibtn1 = findViewById(R.id.fibtn1);
        fibtn2 = findViewById(R.id.fibtn2);
        fiet1 = findViewById(R.id.fiet1);
        fitv1 = findViewById(R.id.fitv1);

        fibtn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                save(fiet1.getText().toString());
            }
        });

        fibtn2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                fitv1.setText(read());
            }
        });

    }

    public void save(String content){
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = openFileOutput(filename,MODE_PRIVATE);
            fileOutputStream.write(content.getBytes());
        }  catch (IOException e) {
            e.printStackTrace();
        } finally {
            if(fileOutputStream!=null){
                try {
                    fileOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
    }


    public String read(){
        FileInputStream fileInputStream = null;
        try {
            fileInputStream = openFileInput(filename);
            byte[] buff = new byte[1024];
            //fileInputStream.read(buff);
            StringBuilder sb = new StringBuilder();  //字符串拼接
            int len=0;
            while((len = fileInputStream.read(buff)) > 0){
                sb.append(new String(buff,0,len));
            }
            return sb.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(fileInputStream!=null){
                try {
                    fileInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
        return null;
    }
}

```

# File 外部存储

java文件

```java
package com.example.test.datastorage;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.app.Activity;
import android.os.Bundle;
import android.os.Environment;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.test.R;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class fileActivity extends AppCompatActivity {

    private Button fibtn1,fibtn2;
    private EditText fiet1;
    private TextView fitv1;
    private final String filename = "test.txt";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_file);

        fibtn1 = findViewById(R.id.fibtn1);
        fibtn2 = findViewById(R.id.fibtn2);
        fiet1 = findViewById(R.id.fiet1);
        fitv1 = findViewById(R.id.fitv1);

        fibtn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                save(fiet1.getText().toString());
            }
        });

        fibtn2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                fitv1.setText(read());
            }
        });


        ActivityCompat.requestPermissions(this , new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},1); //1是随便写de


    }

    public void save(String content){
        FileOutputStream fileOutputStream = null;
        try {
            //fileOutputStream = openFileOutput(filename,MODE_PRIVATE);
            //路径
            File dir = new File(getExternalFilesDir(null),"hello");
            if(!dir.exists()){
                dir.mkdirs();
            }
            //文件
            File file = new File(dir,filename);
            if(!file.exists()){
                file.createNewFile();
            }
            fileOutputStream = new FileOutputStream(file);
            fileOutputStream.write(content.getBytes());
        }  catch (IOException e) {
            e.printStackTrace();
        } finally {
            if(fileOutputStream!=null){
                try {
                    fileOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
    }


    public String read(){
        FileInputStream fileInputStream = null;
        try {
            //fileInputStream = openFileInput(filename);
            File file = new File(getExternalFilesDir(null).getAbsolutePath()+File.separator+"hello",filename);
            fileInputStream = new FileInputStream(file);
            byte[] buff = new byte[1024];
            //fileInputStream.read(buff);
            StringBuilder sb = new StringBuilder();  //字符串拼接
            int len=0;
            while((len = fileInputStream.read(buff)) > 0){
                sb.append(new String(buff,0,len));
            }
            return sb.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(fileInputStream!=null){
                try {
                    fileInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
        return null;
    }
}

```
### 权限申请

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

