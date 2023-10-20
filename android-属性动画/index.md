# Android 属性动画




简单演示

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200323221512658.gif)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".anim2Activity">


    <TextView
        android:layout_width="match_parent"
        android:layout_height="70dp"
        android:id="@+id/a2tv1"
        android:textSize="30sp"
        android:text="animation_test"
        android:gravity="center"
        android:textColor="#FFFFFF"
        android:background="#AAAAAA"/>
</androidx.constraintlayout.widget.ConstraintLayout>
```

```java
package com.example.test;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

public class anim2Activity extends AppCompatActivity {
    private TextView a2tv1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_anim2);
        a2tv1 = findViewById(R.id.a2tv1);
        a2tv1.animate().translationYBy(500).setDuration(2000).start();
    }
}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324104958404.gif)

```java
package com.example.test;

        import androidx.appcompat.app.AppCompatActivity;

        import android.animation.ObjectAnimator;
        import android.animation.ValueAnimator;
        import android.os.Bundle;
        import android.util.Log;
        import android.widget.TextView;

public class anim2Activity extends AppCompatActivity {
    private TextView a2tv1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_anim2);
        a2tv1 = findViewById(R.id.a2tv1);
        //a2tv1.animate().translationYBy(500).setDuration(2000).start();
        //a2tv1.animate().alpha(0).setDuration(2000).start();

//        ValueAnimator valueAnimator = ValueAnimator.ofInt(0,100);
//        valueAnimator.setDuration(2000);
//        valueAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
//            @Override
//            public void onAnimationUpdate(ValueAnimator animation) {
//                Log.d("test",animation.getAnimatedValue()+"");
//                Log.d("test",animation.getAnimatedFraction()+"");
//            }
//        });
//        valueAnimator.start();
        ObjectAnimator objectAnimator = ObjectAnimator.ofFloat(a2tv1,"translationY",1500,200,500,300,1000);
        objectAnimator.setDuration(5000);
        objectAnimator.start();
    }
}

```




