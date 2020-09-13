# Android Fragment




## 生命周期

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324144138574.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)


在containerActivity的布局中放入一个fragment，然后点击按钮，切换成另一个fragment

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324162926821.gif)

containerActivity的布局文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".fragment.containerActivity">


    <Button
        android:id="@+id/ctnbtn1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="change_fragment"
        android:textSize="25sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.1" />

    <FrameLayout
        android:id="@+id/ctn1"
        android:layout_width="match_parent"

        app:layout_constraintTop_toBottomOf="@+id/ctnbtn1"
        app:layout_constraintBottom_toBottomOf="parent"
        android:layout_height="0dp"/>
</androidx.constraintlayout.widget.ConstraintLayout>
```

containerActivity.java

```java
package com.example.test.fragment;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.example.test.R;

public class containerActivity extends AppCompatActivity {

    private Afragment afragment;
    private Bfragment bfragment;
    private Button ctnbtn1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_container);


        ctnbtn1 = findViewById(R.id.ctnbtn1);
        ctnbtn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(bfragment==null) bfragment = new Bfragment();
                getSupportFragmentManager().beginTransaction().replace(R.id.ctn1,bfragment).commitAllowingStateLoss();
            }
        });

        afragment = new Afragment();
        getSupportFragmentManager().beginTransaction().add(R.id.ctn1,afragment).commitAllowingStateLoss();
    }
}

```

Afragment.java

```java
package com.example.test.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.test.R;

public class Afragment extends Fragment {

    private TextView fatv1;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_a,container,false);

        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        fatv1 = view.findViewById(R.id.fatv1);
    }
}

```

fragment_a.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/fatv1"
        android:text="fragment_a"
        android:textSize="25sp"
        android:gravity="center"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintVertical_bias="0.4"/>


</androidx.constraintlayout.widget.ConstraintLayout>
```


Bfragment.java和fragment_b.xml与A类似

## 传数据给fragment

Afragment.java

```java
package com.example.test.fragment;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.test.R;

public class Afragment extends Fragment {

    private TextView fatv1;

    public static Afragment newInstance(String title){
        Afragment afragment = new Afragment();
        Bundle bundle = new Bundle();
        bundle.putString("tk",title);
        afragment.setArguments(bundle);
        return afragment;
    }


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_a,container,false);

        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        fatv1 = view.findViewById(R.id.fatv1);
        if(getArguments()!=null) {
            fatv1.setText(getArguments().getString("tk"));
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
    }

    @Override
    public void onDetach() {
        super.onDetach();
    }
}

```

通过这种方法实例化

```java
afragment = Afragment.newInstance("hello world");
```

## fragment的回退栈
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324201701592.gif)

fragment_a.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


    <Button
        android:id="@+id/fabtn1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="change_to_Bfragment"
        android:textSize="25sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.1" />

    <Button
        android:id="@+id/fabtn2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="updata_text"
        android:textSize="25sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.2" />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/fatv1"
        android:text="fragment_a"
        android:textSize="25sp"
        android:gravity="center"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintVertical_bias="0.4"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

Afragment.java

```java
package com.example.test.fragment;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.test.R;

public class Afragment extends Fragment {

    private TextView fatv1;
    private Button fabtn1,fabtn2;
    private Bfragment bfragment;

    public static Afragment newInstance(String title){
        Afragment afragment = new Afragment();
        Bundle bundle = new Bundle();
        bundle.putString("tk",title);
        afragment.setArguments(bundle);
        return afragment;
    }


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_a,container,false);
        Log.d("Afragment","----------onCreateView--------");

        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        fatv1 = view.findViewById(R.id.fatv1);
        fabtn1 = view.findViewById(R.id.fabtn1);
        fabtn2 = view.findViewById(R.id.fabtn2);
        fabtn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(bfragment==null) bfragment = new Bfragment();
                if (getFragmentManager() != null) {
                    getFragmentManager().beginTransaction().replace(R.id.ctn1,bfragment).addToBackStack(null).commitAllowingStateLoss();
                }
            }
        });

        fabtn2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                fatv1.setText("updated");
            }
        });

        if(getArguments()!=null) {
            fatv1.setText(getArguments().getString("tk"));
        }
    }


}

```


fragment_b.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/fbtv1"
        android:text="fragment_b"
        android:textSize="25sp"
        android:gravity="center"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintVertical_bias="0.4"/>


</androidx.constraintlayout.widget.ConstraintLayout>
```

Bfragment.java

```java
package com.example.test.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.test.R;

public class Bfragment extends Fragment {

    private TextView fbtv1;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_b,container,false);

        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        fbtv1 = view.findViewById(R.id.fbtv1);
    }
}

```

containerActivity.java


```java
package com.example.test.fragment;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.example.test.R;

public class containerActivity extends AppCompatActivity {

    private Afragment afragment;
    private Bfragment bfragment;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_container);


        afragment = Afragment.newInstance("hello world");
        getSupportFragmentManager().beginTransaction().add(R.id.ctn1,afragment).commitAllowingStateLoss();
    }
}

```


让Afragment不再重新加载

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324212935639.gif)

改动containerActivity.java和Afragment.java即可

```java
package com.example.test.fragment;

        import androidx.appcompat.app.AppCompatActivity;

        import android.os.Bundle;
        import android.view.View;
        import android.widget.Button;

        import com.example.test.R;

public class containerActivity extends AppCompatActivity {

    private Afragment afragment;
    private Bfragment bfragment;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_container);


        afragment = Afragment.newInstance("hello world");
        getSupportFragmentManager().beginTransaction().add(R.id.ctn1,afragment,"a").commitAllowingStateLoss();
    }
}

```

```java
package com.example.test.fragment;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.test.R;

public class Afragment extends Fragment {

    private TextView fatv1;
    private Button fabtn1,fabtn2;
    private Bfragment bfragment;

    public static Afragment newInstance(String title){
        Afragment afragment = new Afragment();
        Bundle bundle = new Bundle();
        bundle.putString("tk",title);
        afragment.setArguments(bundle);
        return afragment;
    }


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_a,container,false);
        Log.d("Afragment","----------onCreateView--------");

        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        fatv1 = view.findViewById(R.id.fatv1);
        fabtn1 = view.findViewById(R.id.fabtn1);
        fabtn2 = view.findViewById(R.id.fabtn2);
        fabtn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(bfragment==null) bfragment = new Bfragment();
                Fragment fragment = null;
                if (getFragmentManager() != null) {
                    fragment = getFragmentManager().findFragmentByTag("a");
                }
                if(fragment!=null) {
                    getFragmentManager().beginTransaction().hide(fragment).add(R.id.ctn1,bfragment).addToBackStack(null).commitAllowingStateLoss();
                }
                else{
                    if (getFragmentManager() != null) {
                        getFragmentManager().beginTransaction().replace(R.id.ctn1,bfragment).addToBackStack(null).commitAllowingStateLoss();
                    }
                }
            }
        });

        fabtn2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                fatv1.setText("updated");
            }
        });

        if(getArguments()!=null) {
            fatv1.setText(getArguments().getString("tk"));
        }
    }


}

```

## 传递数据给activity

通过接口回调

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324221508211.gif)

Afragment.java

```java
package com.example.test.fragment;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.test.R;

public class Afragment extends Fragment {

    private msgclick listener;

    public interface msgclick{
        void onclick(String s);
    }

    private TextView fatv1;
    private Button fabtn1,fabtn2,fabtn3;
    private Bfragment bfragment;

    public static Afragment newInstance(String title){
        Afragment afragment = new Afragment();
        Bundle bundle = new Bundle();
        bundle.putString("tk",title);
        afragment.setArguments(bundle);
        return afragment;
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        listener = (msgclick) context;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_a,container,false);
        Log.d("Afragment","----------onCreateView--------");

        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        fatv1 = view.findViewById(R.id.fatv1);
        fabtn1 = view.findViewById(R.id.fabtn1);
        fabtn2 = view.findViewById(R.id.fabtn2);
        fabtn3 = view.findViewById(R.id.fabtn3);

        fabtn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(bfragment==null) bfragment = new Bfragment();
                Fragment fragment = null;
                if (getFragmentManager() != null) {
                    fragment = getFragmentManager().findFragmentByTag("a");
                }
                if(fragment!=null) {
                    getFragmentManager().beginTransaction().hide(fragment).add(R.id.ctn1,bfragment).addToBackStack(null).commitAllowingStateLoss();
                }
                else{
                    if (getFragmentManager() != null) {
                        getFragmentManager().beginTransaction().replace(R.id.ctn1,bfragment).addToBackStack(null).commitAllowingStateLoss();
                    }
                }
            }
        });

        fabtn2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                fatv1.setText("updated");
            }
        });

        fabtn3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                listener.onclick("dedsec");
            }
        });

        if(getArguments()!=null) {
            fatv1.setText(getArguments().getString("tk"));
        }
    }


}

```


containerActivity.java

```java
package com.example.test.fragment;

        import androidx.appcompat.app.AppCompatActivity;

        import android.os.Bundle;
        import android.view.View;
        import android.widget.Button;
        import android.widget.TextView;

        import com.example.test.R;

public class containerActivity extends AppCompatActivity implements Afragment.msgclick {

    private Afragment afragment;
    //private Bfragment bfragment;
    private TextView ctntv1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_container);


        afragment = Afragment.newInstance("hello world");
        getSupportFragmentManager().beginTransaction().add(R.id.ctn1,afragment,"a").commitAllowingStateLoss();

        ctntv1 = findViewById(R.id.ctntv1);
    }



    @Override
    public void onclick(String s) {
        ctntv1.setText(s);
    }
}

```



