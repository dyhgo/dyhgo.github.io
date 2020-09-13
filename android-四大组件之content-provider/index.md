# Android 四大组件之Content Provider






# Content Provider

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319153118615.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319153232133.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319153348737.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319153425979.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319153505783.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319153534803.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)


##  获取外部应用的信息

#### 以获取通讯录为例

布局文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".contentProviderActivity">

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/cpbtn1"
        android:textSize="25sp"
        android:text="get_contacts"/>

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/cpbtn2"
        android:text="getdata"
        android:textSize="25dp"
        app:layout_constraintTop_toBottomOf="@+id/cpbtn1"
        android:layout_marginTop="20dp"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

点击get_contacts获取联系人信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319154159698.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

手机里存储的联系人信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319155416542.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

在manifest里获取权限

```xml
<uses-permission android:name="android.permission.READ_CONTACTS" />
```
利用content resolver获取

```java
package com.example.test;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import java.util.HashSet;
import java.util.List;

public class contentProviderActivity extends AppCompatActivity {

    private Button cpbtn1,cpbtn2;
    //private List<String> contactlist=null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_content_provider);

        cpbtn1 = findViewById(R.id.cpbtn1);
        cpbtn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ContentResolver contentResolver = getContentResolver();
                Cursor cursor = contentResolver.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,null,null,null,null);

                while(cursor.moveToNext()){
                    String name = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
                    String number = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
                    Log.d("tag",name+" "+number);
                    //contactlist.add(name+" "+number);
                }
                cursor.close();

                //System.out.println(contactlist.toString());
            }
        });

//        

    }
}

```

获取到的信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319155720548.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

### 获取系统权限指令大全

[点击此处](https://blog.csdn.net/Don_sandman/article/details/76651083)

## 提供自己的应用信息

在sqlite数据库中创建表

```java
package com.example.test;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;

public class Myopenhelper extends SQLiteOpenHelper {

    private static final String CREATE_TABLE_PERSON = "create table person (id integer primary key autoincrement,name text,age integer)";

    public Myopenhelper(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(CREATE_TABLE_PERSON);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
}

```

插入数据，提供content provider

```java
package com.example.test;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.net.Uri;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class Myprovider extends ContentProvider {
    private static final String PACKAGE_NAME = "com.example.test";
    private static UriMatcher uriMatcher;
    private Myopenhelper myopenhelper;
    private SQLiteDatabase sqLiteDatabase;

    static {
        uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
        uriMatcher.addURI(PACKAGE_NAME,"person",0);
    }

    @Override
    public boolean onCreate() {
       myopenhelper = new Myopenhelper(getContext(),"database",null,1);
       sqLiteDatabase = myopenhelper.getWritableDatabase();
       ContentValues contentValues = new ContentValues();
       contentValues.put("name","jingjing");
       contentValues.put("age",15);
       sqLiteDatabase.insert("person",null,contentValues);
       contentValues.put("name","kakulukia");
       contentValues.put("age",15);
       sqLiteDatabase.insert("person",null,contentValues);

        return true;
    }

    @Nullable
    @Override
    public Cursor query(@NonNull Uri uri, @Nullable String[] projection, @Nullable String selection, @Nullable String[] selectionArgs, @Nullable String sortOrder) {
        int code = uriMatcher.match(uri);
        switch (code){
            case 0:
                Cursor cursor = sqLiteDatabase.query("person",null,null,null,null,null,null);
                return cursor;
        }

        return null;
    }

    @Nullable
    @Override
    public String getType(@NonNull Uri uri) {
        return null;
    }

    @Nullable
    @Override
    public Uri insert(@NonNull Uri uri, @Nullable ContentValues values) {
        return null;
    }

    @Override
    public int delete(@NonNull Uri uri, @Nullable String selection, @Nullable String[] selectionArgs) {
        return 0;
    }

    @Override
    public int update(@NonNull Uri uri, @Nullable ContentValues values, @Nullable String selection, @Nullable String[] selectionArgs) {
        return 0;
    }
}

```

在manifest注册

```xml
<provider
            android:name=".Myprovider"
            android:authorities="com.example.test"
            android:exported="true" />
```

到此已经提供了自己的应用信息

现在通过点击“get_data”来查询（利用content resolver）

```java
package com.example.test;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import java.util.HashSet;
import java.util.List;

public class contentProviderActivity extends AppCompatActivity {

    private Button cpbtn1,cpbtn2;
    //private List<String> contactlist=null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_content_provider);

        cpbtn1 = findViewById(R.id.cpbtn1);
        cpbtn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ContentResolver contentResolver = getContentResolver();
                Cursor cursor = contentResolver.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,null,null,null,null);

                while(cursor.moveToNext()){
                    String name = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
                    String number = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
                    Log.d("tag",name+" "+number);
                    //contactlist.add(name+" "+number);
                }
                cursor.close();

                //System.out.println(contactlist.toString());
            }
        });

        cpbtn2 = findViewById(R.id.cpbtn2);
        cpbtn2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Uri uri = Uri.parse("content://com.example.test/person");
                Cursor cursor = getContentResolver().query(uri,null,null,null,null,null);
                while (cursor.moveToNext()){
                    String name = cursor.getString(cursor.getColumnIndex("name"));
                    int age = cursor.getInt(cursor.getColumnIndex("age"));
                    Log.d("tag",name+" "+age);
                }
                cursor.close();
            }
        });

    }
}

```

查询到的信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200319160934759.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzM3Njk3,size_16,color_FFFFFF,t_70)

如果重复运行，会在数据库中一直添加数据
