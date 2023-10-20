# Android 事件处理机制



# 事件处理
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319125011916.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319125041979.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319125148988.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

## 基于监听的事件处理机制
### 匿名内部类

```java
mbt1.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()){
                    case MotionEvent.ACTION_DOWN:
                        Log.d("listener","touch");
                        break;
                }
                return false;
            }
        });
```
### 事件源所在类（activity类）

```java
public class eventActivity extends AppCompatActivity implements View.OnClickListener
```

```java
ebt1 = findViewById(R.id.ebt1);
        ebt1.setOnClickListener(eventActivity.this);
```

```java
@Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.ebt1:
                Toast.makeText(eventActivity.this , "click...",Toast.LENGTH_LONG).show();
                break;
        }
    }
```
### 在布局文件中设置

```xml
<Button
        android:id="@+id/ebt1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="click"
        android:textSize="20sp"
        app:layout_constraintTop_toTopOf="parent"
        android:layout_marginTop="50dp"
        android:onClick="show"
        />
```

```java
public void show(View view){             //一定是public void
        switch (view.getId()){
            case R.id.ebt1:
                Toast.makeText(eventActivity.this , "click...",Toast.LENGTH_LONG).show();
                break;
        }
    }
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319131750142.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

## 基于回调的事件处理机制
布局文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".eventActivity">

    <Button
        android:id="@+id/ebt1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="click"
        android:textSize="20sp"
        app:layout_constraintTop_toTopOf="parent"
        android:layout_marginTop="50dp"
        />

    <com.example.test.Mybotton
        android:id="@+id/mbt1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="20sp"
        android:text="Mybotton"
        android:textAllCaps="false"
        app:layout_constraintTop_toBottomOf="@+id/ebt1"
        android:layout_marginTop="20dp"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319140619678.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

Mybotton类

```java
package com.example.test;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.widget.Button;

import androidx.appcompat.widget.AppCompatButton;

public class Mybotton extends AppCompatButton {

    public Mybotton(Context context) {
        super(context);
    }

    public Mybotton(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public Mybotton(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }


    @Override
    public boolean onTouchEvent(MotionEvent event) {
        super.onTouchEvent(event);
        switch (event.getAction()){
            case MotionEvent.ACTION_DOWN:
                Log.d("Mybotton","touch");
                break;
        }
        return false;   //return true即onTouchEvent到此终止
    }
}

```
eventactivity.java

```java
package com.example.test;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class eventActivity extends AppCompatActivity  {

    private Button ebt1;
    private Mybotton mbt1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event);
        mbt1 = findViewById(R.id.mbt1);
        mbt1.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()){
                    case MotionEvent.ACTION_DOWN:
                        Log.d("listener","touch");
                        break;
                }
                return false;
            }
        });

//        ebt1 = findViewById(R.id.ebt1);
//        ebt1.setOnClickListener(eventActivity.this);


    }

//    @Override
//    public void onClick(View v) {
//        switch (v.getId()){
//            case R.id.ebt1:
//                Toast.makeText(eventActivity.this , "click...",Toast.LENGTH_LONG).show();
//                break;
//        }
//    }

//    public void show(View view){             //一定是public void
//        switch (view.getId()){
//            case R.id.ebt1:
//                Toast.makeText(eventActivity.this , "click...",Toast.LENGTH_LONG).show();
//                break;
//        }
//    }


    @Override
    public boolean onTouchEvent(MotionEvent event) {
        super.onTouchEvent(event);
        switch (event.getAction()){
            case MotionEvent.ACTION_DOWN:
                Log.d("activity","touch");
                break;
        }
        return false;
    }


}

```
触摸Mybotton触发事件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319141519851.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

