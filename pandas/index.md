# Pandas




> pandas is a fast, powerful, flexible and easy to use open source data analysis and manipulation tool, built on top of the Python programming language.

[参考](https://pandas.pydata.org/docs/user_guide/10min.html)


```python
import numpy as np
import pandas as pd
```

## Object creation

`Series`是一维数据


```python
s = pd.Series([1, 3, 5, np.nan, 6, 8])
s
```




    0    1.0
    1    3.0
    2    5.0
    3    NaN
    4    6.0
    5    8.0
    dtype: float64



`DataFrame`是一张表格


```python
dates = pd.date_range("20130101", periods=6)
dates
```




    DatetimeIndex(['2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04',
                   '2013-01-05', '2013-01-06'],
                  dtype='datetime64[ns]', freq='D')




```python
df = pd.DataFrame(np.random.randn(6, 4), index=dates, columns=list("ABCD"))
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>1.672611</td>
      <td>1.010890</td>
      <td>1.873754</td>
      <td>1.026126</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>-1.858497</td>
      <td>-1.445272</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
      <td>-0.525263</td>
      <td>-0.661282</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>0.947373</td>
      <td>0.011333</td>
      <td>-0.303310</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.412637</td>
      <td>-1.539891</td>
      <td>-0.789662</td>
      <td>1.382914</td>
    </tr>
    <tr>
      <th>2013-01-06</th>
      <td>-1.925618</td>
      <td>-0.395157</td>
      <td>0.215027</td>
      <td>0.800317</td>
    </tr>
  </tbody>
</table>
</div>



通过传递字典来构造DataFrame


```python
df2 = pd.DataFrame(
    {
        "A": 1.0,
        "B": pd.Timestamp("20130102"),
        "C": pd.Series(1, index=list(range(4)), dtype="float32"),
        "D": np.array([3] * 4, dtype="int32"),
        "E": pd.Categorical(["test", "train", "test", "train"]),
        "F": "foo",
    }
)
df2
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
      <th>F</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.0</td>
      <td>2013-01-02</td>
      <td>1.0</td>
      <td>3</td>
      <td>test</td>
      <td>foo</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.0</td>
      <td>2013-01-02</td>
      <td>1.0</td>
      <td>3</td>
      <td>train</td>
      <td>foo</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1.0</td>
      <td>2013-01-02</td>
      <td>1.0</td>
      <td>3</td>
      <td>test</td>
      <td>foo</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1.0</td>
      <td>2013-01-02</td>
      <td>1.0</td>
      <td>3</td>
      <td>train</td>
      <td>foo</td>
    </tr>
  </tbody>
</table>
</div>



DataFrames每一列可以有不同的值


```python
df2.dtypes
```




    A           float64
    B    datetime64[ns]
    C           float32
    D             int32
    E          category
    F            object
    dtype: object



## Viewing data
使用`DataFrame.head()`和`DataFrame.tail()`来查看前几行和后几行，如果不指定参数则除了第一行（或者最后一行）都显示


```python
df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>1.672611</td>
      <td>1.010890</td>
      <td>1.873754</td>
      <td>1.026126</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>-1.858497</td>
      <td>-1.445272</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
      <td>-0.525263</td>
      <td>-0.661282</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>0.947373</td>
      <td>0.011333</td>
      <td>-0.303310</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.412637</td>
      <td>-1.539891</td>
      <td>-0.789662</td>
      <td>1.382914</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.tail(3)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>0.947373</td>
      <td>0.011333</td>
      <td>-0.303310</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.412637</td>
      <td>-1.539891</td>
      <td>-0.789662</td>
      <td>1.382914</td>
    </tr>
    <tr>
      <th>2013-01-06</th>
      <td>-1.925618</td>
      <td>-0.395157</td>
      <td>0.215027</td>
      <td>0.800317</td>
    </tr>
  </tbody>
</table>
</div>



使用`DataFrame.index` 和 `DataFrame.columns`来获取行表头和列表头


```python
df.index
```




    DatetimeIndex(['2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04',
                   '2013-01-05', '2013-01-06'],
                  dtype='datetime64[ns]', freq='D')




```python
df.columns
```




    Index(['A', 'B', 'C', 'D'], dtype='object')



使用`DataFrame.to_numpy()`可以将DataFrame转换成numpy，这将有很大的开销，因为DataFrame允许每一列的类型不一样，numpy不行


```python
df.to_numpy()
```




    array([[ 1.67261051,  1.01088994,  1.8737536 ,  1.02612614],
           [ 1.09926258,  0.33066777, -1.85849732, -1.44527193],
           [-0.83363676,  1.41695768, -0.52526275, -0.66128225],
           [-0.66794837,  0.94737275,  0.01133288, -0.30331012],
           [ 1.41263728, -1.53989118, -0.78966244,  1.38291399],
           [-1.92561833, -0.39515657,  0.21502717,  0.80031675]])




```python
df2.to_numpy()
```




    array([[1.0, Timestamp('2013-01-02 00:00:00'), 1.0, 3, 'test', 'foo'],
           [1.0, Timestamp('2013-01-02 00:00:00'), 1.0, 3, 'train', 'foo'],
           [1.0, Timestamp('2013-01-02 00:00:00'), 1.0, 3, 'test', 'foo'],
           [1.0, Timestamp('2013-01-02 00:00:00'), 1.0, 3, 'train', 'foo']],
          dtype=object)



注意，转化成numpy后将不再包含行列表头信息

`describe()`可以显示一些基本的统计信息


```python
df.describe()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>6.000000</td>
      <td>6.000000</td>
      <td>6.000000</td>
      <td>6.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>0.126218</td>
      <td>0.295140</td>
      <td>-0.178885</td>
      <td>0.133249</td>
    </tr>
    <tr>
      <th>std</th>
      <td>1.466634</td>
      <td>1.099208</td>
      <td>1.242481</td>
      <td>1.106116</td>
    </tr>
    <tr>
      <th>min</th>
      <td>-1.925618</td>
      <td>-1.539891</td>
      <td>-1.858497</td>
      <td>-1.445272</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>-0.792215</td>
      <td>-0.213700</td>
      <td>-0.723563</td>
      <td>-0.571789</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>0.215657</td>
      <td>0.639020</td>
      <td>-0.256965</td>
      <td>0.248503</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>1.334294</td>
      <td>0.995011</td>
      <td>0.164104</td>
      <td>0.969674</td>
    </tr>
    <tr>
      <th>max</th>
      <td>1.672611</td>
      <td>1.416958</td>
      <td>1.873754</td>
      <td>1.382914</td>
    </tr>
  </tbody>
</table>
</div>



转置


```python
df.T
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>2013-01-01</th>
      <th>2013-01-02</th>
      <th>2013-01-03</th>
      <th>2013-01-04</th>
      <th>2013-01-05</th>
      <th>2013-01-06</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>1.672611</td>
      <td>1.099263</td>
      <td>-0.833637</td>
      <td>-0.667948</td>
      <td>1.412637</td>
      <td>-1.925618</td>
    </tr>
    <tr>
      <th>B</th>
      <td>1.010890</td>
      <td>0.330668</td>
      <td>1.416958</td>
      <td>0.947373</td>
      <td>-1.539891</td>
      <td>-0.395157</td>
    </tr>
    <tr>
      <th>C</th>
      <td>1.873754</td>
      <td>-1.858497</td>
      <td>-0.525263</td>
      <td>0.011333</td>
      <td>-0.789662</td>
      <td>0.215027</td>
    </tr>
    <tr>
      <th>D</th>
      <td>1.026126</td>
      <td>-1.445272</td>
      <td>-0.661282</td>
      <td>-0.303310</td>
      <td>1.382914</td>
      <td>0.800317</td>
    </tr>
  </tbody>
</table>
</div>



`DataFrame.sort_index()`按某个轴的表头排序


```python
df.sort_index(axis=1, ascending=False)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>D</th>
      <th>C</th>
      <th>B</th>
      <th>A</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>1.026126</td>
      <td>1.873754</td>
      <td>1.010890</td>
      <td>1.672611</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>-1.445272</td>
      <td>-1.858497</td>
      <td>0.330668</td>
      <td>1.099263</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.661282</td>
      <td>-0.525263</td>
      <td>1.416958</td>
      <td>-0.833637</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.303310</td>
      <td>0.011333</td>
      <td>0.947373</td>
      <td>-0.667948</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.382914</td>
      <td>-0.789662</td>
      <td>-1.539891</td>
      <td>1.412637</td>
    </tr>
    <tr>
      <th>2013-01-06</th>
      <td>0.800317</td>
      <td>0.215027</td>
      <td>-0.395157</td>
      <td>-1.925618</td>
    </tr>
  </tbody>
</table>
</div>



`DataFrame.sort_values()`按某一行（列）排序


```python
df.sort_values(by="B")
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-05</th>
      <td>1.412637</td>
      <td>-1.539891</td>
      <td>-0.789662</td>
      <td>1.382914</td>
    </tr>
    <tr>
      <th>2013-01-06</th>
      <td>-1.925618</td>
      <td>-0.395157</td>
      <td>0.215027</td>
      <td>0.800317</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>-1.858497</td>
      <td>-1.445272</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>0.947373</td>
      <td>0.011333</td>
      <td>-0.303310</td>
    </tr>
    <tr>
      <th>2013-01-01</th>
      <td>1.672611</td>
      <td>1.010890</td>
      <td>1.873754</td>
      <td>1.026126</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
      <td>-0.525263</td>
      <td>-0.661282</td>
    </tr>
  </tbody>
</table>
</div>



## Selection

### Getting

选择一个列


```python
df["A"]
```




    2013-01-01    1.672611
    2013-01-02    1.099263
    2013-01-03   -0.833637
    2013-01-04   -0.667948
    2013-01-05    1.412637
    2013-01-06   -1.925618
    Freq: D, Name: A, dtype: float64



使用切片的方式选择行


```python
df[0:3]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>1.672611</td>
      <td>1.010890</td>
      <td>1.873754</td>
      <td>1.026126</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>-1.858497</td>
      <td>-1.445272</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
      <td>-0.525263</td>
      <td>-0.661282</td>
    </tr>
  </tbody>
</table>
</div>




```python
df["20130102":"20130104"]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>-1.858497</td>
      <td>-1.445272</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
      <td>-0.525263</td>
      <td>-0.661282</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>0.947373</td>
      <td>0.011333</td>
      <td>-0.303310</td>
    </tr>
  </tbody>
</table>
</div>



### Selection by label

获取某一行


```python
df.loc[dates[0]]
```




    A    1.672611
    B    1.010890
    C    1.873754
    D    1.026126
    Name: 2013-01-01 00:00:00, dtype: float64



通过标签选择一片区域


```python
df.loc[:, ["A", "B"]]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>1.672611</td>
      <td>1.010890</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>0.947373</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.412637</td>
      <td>-1.539891</td>
    </tr>
    <tr>
      <th>2013-01-06</th>
      <td>-1.925618</td>
      <td>-0.395157</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.loc["20130102":"20130104", ["A", "B"]]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>0.947373</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.loc["20130102", ["A", "B"]]
```




    A    1.099263
    B    0.330668
    Name: 2013-01-02 00:00:00, dtype: float64




```python
df.loc[dates[0], "A"]
```




    1.6726105100658228




```python
df.at[dates[0], "A"]
```




    1.6726105100658228



### Selection by position

通过传入的参数选择某一行


```python
df.iloc[3]
```




    A   -0.667948
    B    0.947373
    C    0.011333
    D   -0.303310
    Name: 2013-01-04 00:00:00, dtype: float64



通过传入的参数切片


```python
df.iloc[3:5, 0:2]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>0.947373</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.412637</td>
      <td>-1.539891</td>
    </tr>
  </tbody>
</table>
</div>



通过列表选择行和列


```python
df.iloc[[1, 2, 4], [0, 2]]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>-1.858497</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>-0.525263</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.412637</td>
      <td>-0.789662</td>
    </tr>
  </tbody>
</table>
</div>



对行直接切片


```python
df.iloc[1:3, :]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>-1.858497</td>
      <td>-1.445272</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
      <td>-0.525263</td>
      <td>-0.661282</td>
    </tr>
  </tbody>
</table>
</div>



对列直接切片


```python
df.iloc[:, 1:3]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>B</th>
      <th>C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>1.010890</td>
      <td>1.873754</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>0.330668</td>
      <td>-1.858497</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>1.416958</td>
      <td>-0.525263</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>0.947373</td>
      <td>0.011333</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>-1.539891</td>
      <td>-0.789662</td>
    </tr>
    <tr>
      <th>2013-01-06</th>
      <td>-0.395157</td>
      <td>0.215027</td>
    </tr>
  </tbody>
</table>
</div>



直接获得某个值


```python
df.iloc[1, 1]
```




    0.33066776522090735




```python
df.iat[1, 1]
```




    0.33066776522090735



### Boolean indexing

使用单个列的值来选择


```python
df[df["A"] > 0]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>1.672611</td>
      <td>1.010890</td>
      <td>1.873754</td>
      <td>1.026126</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>-1.858497</td>
      <td>-1.445272</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.412637</td>
      <td>-1.539891</td>
      <td>-0.789662</td>
      <td>1.382914</td>
    </tr>
  </tbody>
</table>
</div>



从DataFrame中选择


```python
df[df > 0]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>1.672611</td>
      <td>1.010890</td>
      <td>1.873754</td>
      <td>1.026126</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>NaN</td>
      <td>1.416958</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>NaN</td>
      <td>0.947373</td>
      <td>0.011333</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.412637</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1.382914</td>
    </tr>
    <tr>
      <th>2013-01-06</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.215027</td>
      <td>0.800317</td>
    </tr>
  </tbody>
</table>
</div>



使用`isin()`来过滤


```python
df2 = df.copy()
df2["E"] = ["one", "one", "two", "three", "four", "three"]
df2
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>1.672611</td>
      <td>1.010890</td>
      <td>1.873754</td>
      <td>1.026126</td>
      <td>one</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>-1.858497</td>
      <td>-1.445272</td>
      <td>one</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
      <td>-0.525263</td>
      <td>-0.661282</td>
      <td>two</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>0.947373</td>
      <td>0.011333</td>
      <td>-0.303310</td>
      <td>three</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.412637</td>
      <td>-1.539891</td>
      <td>-0.789662</td>
      <td>1.382914</td>
      <td>four</td>
    </tr>
    <tr>
      <th>2013-01-06</th>
      <td>-1.925618</td>
      <td>-0.395157</td>
      <td>0.215027</td>
      <td>0.800317</td>
      <td>three</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2[df2["E"].isin(["two", "four"])]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
      <td>-0.525263</td>
      <td>-0.661282</td>
      <td>two</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.412637</td>
      <td>-1.539891</td>
      <td>-0.789662</td>
      <td>1.382914</td>
      <td>four</td>
    </tr>
  </tbody>
</table>
</div>



### Setting

设置新列将自动按索引对齐数据


```python
s1 = pd.Series([1, 2, 3, 4, 5, 6], index=pd.date_range("20130102", periods=6))
```


```python
s1
```




    2013-01-02    1
    2013-01-03    2
    2013-01-04    3
    2013-01-05    4
    2013-01-06    5
    2013-01-07    6
    Freq: D, dtype: int64



通过label来设置值


```python
df.at[dates[0], "A"] = 0
```

通过位置来设置值


```python
df.iat[0, 1] = 0
```


```python
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.873754</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>-1.858497</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
      <td>-0.525263</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>0.947373</td>
      <td>0.011333</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.412637</td>
      <td>-1.539891</td>
      <td>-0.789662</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2013-01-06</th>
      <td>-1.925618</td>
      <td>-0.395157</td>
      <td>0.215027</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>



使用where设置值


```python
df2 = df.copy()
```


```python
df2[df2 > 0] = -df2
```


```python
df2
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>-1.873754</td>
      <td>-5</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>-1.099263</td>
      <td>-0.330668</td>
      <td>-1.858497</td>
      <td>-5</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>-1.416958</td>
      <td>-0.525263</td>
      <td>-5</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>-0.947373</td>
      <td>-0.011333</td>
      <td>-5</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>-1.412637</td>
      <td>-1.539891</td>
      <td>-0.789662</td>
      <td>-5</td>
    </tr>
    <tr>
      <th>2013-01-06</th>
      <td>-1.925618</td>
      <td>-0.395157</td>
      <td>-0.215027</td>
      <td>-5</td>
    </tr>
  </tbody>
</table>
</div>



## Missing data

np.nan表示缺失的数据

reindex可以更改、增加、删除某个轴上的索引，返回一份拷贝


```python
df1 = df.reindex(index=dates[0:4], columns=list(df.columns) + ["E"])
```


```python
df1.loc[dates[0] : dates[1], "E"] = 1
```


```python
df1
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.873754</td>
      <td>5</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>-1.858497</td>
      <td>5</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
      <td>-0.525263</td>
      <td>5</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>0.947373</td>
      <td>0.011333</td>
      <td>5</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



`DataFrame.dropna()`将有缺失值的行抛弃


```python
df1.dropna(how="any")
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.873754</td>
      <td>5</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>-1.858497</td>
      <td>5</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
</div>



`DataFrame.fillna()`填充缺失的数据


```python
df1.fillna(value=5)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.873754</td>
      <td>5</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>-1.858497</td>
      <td>5</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-0.833637</td>
      <td>1.416958</td>
      <td>-0.525263</td>
      <td>5</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.667948</td>
      <td>0.947373</td>
      <td>0.011333</td>
      <td>5</td>
      <td>5.0</td>
    </tr>
  </tbody>
</table>
</div>



`isna()`把nan的块变成true，其他位false


```python
pd.isna(df1)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
    </tr>
  </tbody>
</table>
</div>



## Operations

### Stats

平均值


```python
df.mean()
```




    A   -0.152551
    B    0.126658
    C   -0.178885
    D    5.000000
    dtype: float64



另一个轴的平均值


```python
df.mean(1)
```




    2013-01-01    1.718438
    2013-01-02    1.142858
    2013-01-03    1.264515
    2013-01-04    1.322689
    2013-01-05    1.020771
    2013-01-06    0.723563
    Freq: D, dtype: float64



不同维度时需要对齐和广播


```python
s = pd.Series([1, 3, 5, np.nan, 6, 8], index=dates).shift(2)
```


```python
s
```




    2013-01-01    NaN
    2013-01-02    NaN
    2013-01-03    1.0
    2013-01-04    3.0
    2013-01-05    5.0
    2013-01-06    NaN
    Freq: D, dtype: float64




```python
df.sub(s, axis="index")
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>-1.833637</td>
      <td>0.416958</td>
      <td>-1.525263</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-3.667948</td>
      <td>-2.052627</td>
      <td>-2.988667</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>-3.587363</td>
      <td>-6.539891</td>
      <td>-5.789662</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2013-01-06</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



### Apply

`DataFrame.apply()`应用某个用户自定义的函数


```python
df.apply(np.cumsum)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.873754</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2013-01-02</th>
      <td>1.099263</td>
      <td>0.330668</td>
      <td>0.015256</td>
      <td>10</td>
    </tr>
    <tr>
      <th>2013-01-03</th>
      <td>0.265626</td>
      <td>1.747625</td>
      <td>-0.510006</td>
      <td>15</td>
    </tr>
    <tr>
      <th>2013-01-04</th>
      <td>-0.402323</td>
      <td>2.694998</td>
      <td>-0.498674</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2013-01-05</th>
      <td>1.010315</td>
      <td>1.155107</td>
      <td>-1.288336</td>
      <td>25</td>
    </tr>
    <tr>
      <th>2013-01-06</th>
      <td>-0.915304</td>
      <td>0.759950</td>
      <td>-1.073309</td>
      <td>30</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.apply(lambda x: x.max() - x.min())
```




    A    3.338256
    B    2.956849
    C    3.732251
    D    0.000000
    dtype: float64



### Histogramming


```python
s = pd.Series(np.random.randint(0, 7, size=10))
```


```python
s
```




    0    3
    1    5
    2    6
    3    5
    4    5
    5    0
    6    5
    7    2
    8    3
    9    5
    dtype: int32




```python
s.value_counts()
```




    5    5
    3    2
    6    1
    0    1
    2    1
    dtype: int64



### String Methods


```python
s = pd.Series(["A", "B", "C", "Aaba", "Baca", np.nan, "CABA", "dog", "cat"])
```


```python
s.str.lower()
```




    0       a
    1       b
    2       c
    3    aaba
    4    baca
    5     NaN
    6    caba
    7     dog
    8     cat
    dtype: object



## Merge

### Concat

`concat()`


```python
df = pd.DataFrame(np.random.randn(10, 4))
```


```python
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-0.197911</td>
      <td>-0.211569</td>
      <td>0.648594</td>
      <td>-1.123691</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-1.486624</td>
      <td>-0.347519</td>
      <td>0.168468</td>
      <td>-1.687462</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-2.242102</td>
      <td>0.853538</td>
      <td>-1.275269</td>
      <td>2.274398</td>
    </tr>
    <tr>
      <th>3</th>
      <td>-1.695120</td>
      <td>0.262447</td>
      <td>-0.312296</td>
      <td>-0.977294</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.606254</td>
      <td>-0.358807</td>
      <td>0.517332</td>
      <td>-0.495694</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0.400137</td>
      <td>-0.557555</td>
      <td>0.032655</td>
      <td>0.057777</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.842657</td>
      <td>1.707752</td>
      <td>0.159613</td>
      <td>-0.077072</td>
    </tr>
    <tr>
      <th>7</th>
      <td>-1.918256</td>
      <td>0.666318</td>
      <td>-0.842085</td>
      <td>-0.655119</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0.955265</td>
      <td>-1.577956</td>
      <td>-0.073302</td>
      <td>0.049012</td>
    </tr>
    <tr>
      <th>9</th>
      <td>0.518293</td>
      <td>-1.392874</td>
      <td>-1.549751</td>
      <td>0.232338</td>
    </tr>
  </tbody>
</table>
</div>




```python
# break it into pieces
pieces = [df[:3], df[3:7], df[7:]]
```


```python
pd.concat(pieces)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-0.197911</td>
      <td>-0.211569</td>
      <td>0.648594</td>
      <td>-1.123691</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-1.486624</td>
      <td>-0.347519</td>
      <td>0.168468</td>
      <td>-1.687462</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-2.242102</td>
      <td>0.853538</td>
      <td>-1.275269</td>
      <td>2.274398</td>
    </tr>
    <tr>
      <th>3</th>
      <td>-1.695120</td>
      <td>0.262447</td>
      <td>-0.312296</td>
      <td>-0.977294</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.606254</td>
      <td>-0.358807</td>
      <td>0.517332</td>
      <td>-0.495694</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0.400137</td>
      <td>-0.557555</td>
      <td>0.032655</td>
      <td>0.057777</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.842657</td>
      <td>1.707752</td>
      <td>0.159613</td>
      <td>-0.077072</td>
    </tr>
    <tr>
      <th>7</th>
      <td>-1.918256</td>
      <td>0.666318</td>
      <td>-0.842085</td>
      <td>-0.655119</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0.955265</td>
      <td>-1.577956</td>
      <td>-0.073302</td>
      <td>0.049012</td>
    </tr>
    <tr>
      <th>9</th>
      <td>0.518293</td>
      <td>-1.392874</td>
      <td>-1.549751</td>
      <td>0.232338</td>
    </tr>
  </tbody>
</table>
</div>



Adding a column to a DataFrame is relatively fast. However, adding a row requires a copy, and may be expensive. We recommend passing a pre-built list of records to the DataFrame constructor instead of building a DataFrame by iteratively appending records to it.

### Join

`merge()`


```python
left = pd.DataFrame({"key": ["foo", "foo"], "lval": [1, 2]})
```


```python
right = pd.DataFrame({"key": ["foo", "foo"], "rval": [4, 5]})
```


```python
left
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>key</th>
      <th>lval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>foo</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
</div>




```python
right
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>key</th>
      <th>rval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>foo</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.merge(left, right, on="key")
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>key</th>
      <th>lval</th>
      <th>rval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>1</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>foo</td>
      <td>1</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>foo</td>
      <td>2</td>
      <td>4</td>
    </tr>
    <tr>
      <th>3</th>
      <td>foo</td>
      <td>2</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>



另一个例子


```python
left = pd.DataFrame({"key": ["foo", "bar"], "lval": [1, 2]})
```


```python
right = pd.DataFrame({"key": ["foo", "bar"], "rval": [4, 5]})
```


```python
left
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>key</th>
      <th>lval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>bar</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
</div>




```python
right
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>key</th>
      <th>rval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>bar</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.merge(left, right, on="key")
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>key</th>
      <th>lval</th>
      <th>rval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>1</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>bar</td>
      <td>2</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>



## Grouping

group一般执行以下步骤

Splitting the data into groups based on some criteria

Applying a function to each group independently

Combining the results into a data structure


```python
df = pd.DataFrame(
    {
        "A": ["foo", "bar", "foo", "bar", "foo", "bar", "foo", "foo"],
        "B": ["one", "one", "two", "three", "two", "two", "one", "three"],
        "C": np.random.randn(8),
        "D": np.random.randn(8),
    }
)
```


```python
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>one</td>
      <td>0.441899</td>
      <td>0.453832</td>
    </tr>
    <tr>
      <th>1</th>
      <td>bar</td>
      <td>one</td>
      <td>1.074023</td>
      <td>-0.715191</td>
    </tr>
    <tr>
      <th>2</th>
      <td>foo</td>
      <td>two</td>
      <td>1.716625</td>
      <td>-1.196256</td>
    </tr>
    <tr>
      <th>3</th>
      <td>bar</td>
      <td>three</td>
      <td>0.037677</td>
      <td>-1.320146</td>
    </tr>
    <tr>
      <th>4</th>
      <td>foo</td>
      <td>two</td>
      <td>-0.545053</td>
      <td>-0.372236</td>
    </tr>
    <tr>
      <th>5</th>
      <td>bar</td>
      <td>two</td>
      <td>-0.763277</td>
      <td>-1.350397</td>
    </tr>
    <tr>
      <th>6</th>
      <td>foo</td>
      <td>one</td>
      <td>-0.962743</td>
      <td>1.600875</td>
    </tr>
    <tr>
      <th>7</th>
      <td>foo</td>
      <td>three</td>
      <td>0.684661</td>
      <td>-0.004039</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.groupby("A")[["C", "D"]].sum()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>C</th>
      <th>D</th>
    </tr>
    <tr>
      <th>A</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>bar</th>
      <td>0.348422</td>
      <td>-3.385734</td>
    </tr>
    <tr>
      <th>foo</th>
      <td>1.335389</td>
      <td>0.482176</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.groupby(["A", "B"]).sum()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>C</th>
      <th>D</th>
    </tr>
    <tr>
      <th>A</th>
      <th>B</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">bar</th>
      <th>one</th>
      <td>1.074023</td>
      <td>-0.715191</td>
    </tr>
    <tr>
      <th>three</th>
      <td>0.037677</td>
      <td>-1.320146</td>
    </tr>
    <tr>
      <th>two</th>
      <td>-0.763277</td>
      <td>-1.350397</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">foo</th>
      <th>one</th>
      <td>-0.520844</td>
      <td>2.054707</td>
    </tr>
    <tr>
      <th>three</th>
      <td>0.684661</td>
      <td>-0.004039</td>
    </tr>
    <tr>
      <th>two</th>
      <td>1.171571</td>
      <td>-1.568492</td>
    </tr>
  </tbody>
</table>
</div>



## Reshaping

### Stack


```python
tuples = list(
    zip(
        ["bar", "bar", "baz", "baz", "foo", "foo", "qux", "qux"],
        ["one", "two", "one", "two", "one", "two", "one", "two"],
    )
)
```


```python
index = pd.MultiIndex.from_tuples(tuples, names=["first", "second"])
```


```python
df = pd.DataFrame(np.random.randn(8, 2), index=index, columns=["A", "B"])
```


```python
df2 = df[:4]
```


```python
df2
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>A</th>
      <th>B</th>
    </tr>
    <tr>
      <th>first</th>
      <th>second</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">bar</th>
      <th>one</th>
      <td>0.124214</td>
      <td>0.765203</td>
    </tr>
    <tr>
      <th>two</th>
      <td>-0.519057</td>
      <td>2.075762</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">baz</th>
      <th>one</th>
      <td>-0.830936</td>
      <td>-0.544587</td>
    </tr>
    <tr>
      <th>two</th>
      <td>1.660069</td>
      <td>1.475826</td>
    </tr>
  </tbody>
</table>
</div>




```python
stacked = df2.stack()
```


```python
stacked
```




    first  second   
    bar    one     A    0.124214
                   B    0.765203
           two     A   -0.519057
                   B    2.075762
    baz    one     A   -0.830936
                   B   -0.544587
           two     A    1.660069
                   B    1.475826
    dtype: float64




```python
stacked.unstack()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>A</th>
      <th>B</th>
    </tr>
    <tr>
      <th>first</th>
      <th>second</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">bar</th>
      <th>one</th>
      <td>0.124214</td>
      <td>0.765203</td>
    </tr>
    <tr>
      <th>two</th>
      <td>-0.519057</td>
      <td>2.075762</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">baz</th>
      <th>one</th>
      <td>-0.830936</td>
      <td>-0.544587</td>
    </tr>
    <tr>
      <th>two</th>
      <td>1.660069</td>
      <td>1.475826</td>
    </tr>
  </tbody>
</table>
</div>




```python
stacked.unstack(1)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>second</th>
      <th>one</th>
      <th>two</th>
    </tr>
    <tr>
      <th>first</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">bar</th>
      <th>A</th>
      <td>0.124214</td>
      <td>-0.519057</td>
    </tr>
    <tr>
      <th>B</th>
      <td>0.765203</td>
      <td>2.075762</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">baz</th>
      <th>A</th>
      <td>-0.830936</td>
      <td>1.660069</td>
    </tr>
    <tr>
      <th>B</th>
      <td>-0.544587</td>
      <td>1.475826</td>
    </tr>
  </tbody>
</table>
</div>




```python
stacked.unstack(0)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>first</th>
      <th>bar</th>
      <th>baz</th>
    </tr>
    <tr>
      <th>second</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">one</th>
      <th>A</th>
      <td>0.124214</td>
      <td>-0.830936</td>
    </tr>
    <tr>
      <th>B</th>
      <td>0.765203</td>
      <td>-0.544587</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">two</th>
      <th>A</th>
      <td>-0.519057</td>
      <td>1.660069</td>
    </tr>
    <tr>
      <th>B</th>
      <td>2.075762</td>
      <td>1.475826</td>
    </tr>
  </tbody>
</table>
</div>



### Pivot tables


```python
df = pd.DataFrame(
    {
        "A": ["one", "one", "two", "three"] * 3,
        "B": ["A", "B", "C"] * 4,
        "C": ["foo", "foo", "foo", "bar", "bar", "bar"] * 2,
        "D": np.random.randn(12),
        "E": np.random.randn(12),
    }
)
```


```python
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>one</td>
      <td>A</td>
      <td>foo</td>
      <td>-0.341421</td>
      <td>-0.546007</td>
    </tr>
    <tr>
      <th>1</th>
      <td>one</td>
      <td>B</td>
      <td>foo</td>
      <td>1.618503</td>
      <td>0.611306</td>
    </tr>
    <tr>
      <th>2</th>
      <td>two</td>
      <td>C</td>
      <td>foo</td>
      <td>-0.941145</td>
      <td>1.940351</td>
    </tr>
    <tr>
      <th>3</th>
      <td>three</td>
      <td>A</td>
      <td>bar</td>
      <td>0.799316</td>
      <td>0.184894</td>
    </tr>
    <tr>
      <th>4</th>
      <td>one</td>
      <td>B</td>
      <td>bar</td>
      <td>1.621951</td>
      <td>-0.394846</td>
    </tr>
    <tr>
      <th>5</th>
      <td>one</td>
      <td>C</td>
      <td>bar</td>
      <td>-1.334491</td>
      <td>0.177758</td>
    </tr>
    <tr>
      <th>6</th>
      <td>two</td>
      <td>A</td>
      <td>foo</td>
      <td>-2.192872</td>
      <td>-0.217708</td>
    </tr>
    <tr>
      <th>7</th>
      <td>three</td>
      <td>B</td>
      <td>foo</td>
      <td>-1.127164</td>
      <td>-0.266335</td>
    </tr>
    <tr>
      <th>8</th>
      <td>one</td>
      <td>C</td>
      <td>foo</td>
      <td>-0.305296</td>
      <td>0.404488</td>
    </tr>
    <tr>
      <th>9</th>
      <td>one</td>
      <td>A</td>
      <td>bar</td>
      <td>-0.479922</td>
      <td>0.379061</td>
    </tr>
    <tr>
      <th>10</th>
      <td>two</td>
      <td>B</td>
      <td>bar</td>
      <td>-2.166614</td>
      <td>-2.103981</td>
    </tr>
    <tr>
      <th>11</th>
      <td>three</td>
      <td>C</td>
      <td>bar</td>
      <td>1.932436</td>
      <td>0.609512</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.pivot_table(df, values="D", index=["A", "B"], columns=["C"])
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>C</th>
      <th>bar</th>
      <th>foo</th>
    </tr>
    <tr>
      <th>A</th>
      <th>B</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">one</th>
      <th>A</th>
      <td>-0.479922</td>
      <td>-0.341421</td>
    </tr>
    <tr>
      <th>B</th>
      <td>1.621951</td>
      <td>1.618503</td>
    </tr>
    <tr>
      <th>C</th>
      <td>-1.334491</td>
      <td>-0.305296</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">three</th>
      <th>A</th>
      <td>0.799316</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>B</th>
      <td>NaN</td>
      <td>-1.127164</td>
    </tr>
    <tr>
      <th>C</th>
      <td>1.932436</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">two</th>
      <th>A</th>
      <td>NaN</td>
      <td>-2.192872</td>
    </tr>
    <tr>
      <th>B</th>
      <td>-2.166614</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>C</th>
      <td>NaN</td>
      <td>-0.941145</td>
    </tr>
  </tbody>
</table>
</div>



## Time series

## Categoricals


```python
df = pd.DataFrame(
    {"id": [1, 2, 3, 4, 5, 6], "raw_grade": ["a", "b", "b", "a", "a", "e"]}
)
```

转化成类别类型


```python
df["grade"] = df["raw_grade"].astype("category")
```


```python
df["grade"]
```




    0    a
    1    b
    2    b
    3    a
    4    a
    5    e
    Name: grade, dtype: category
    Categories (3, object): ['a', 'b', 'e']



重命名


```python
new_categories = ["very good", "good", "very bad"]
```


```python
df["grade"] = df["grade"].cat.rename_categories(new_categories)
```

## Plotting


```python
import matplotlib.pyplot as plt
```


```python
plt.close("all")
```


```python
ts = pd.Series(np.random.randn(1000), index=pd.date_range("1/1/2000", periods=1000))
```


```python
ts = ts.cumsum()
```


```python
ts.plot()
```




    <AxesSubplot:>




![在这里插入图片描述](https://img-blog.csdnimg.cn/3c5bc9e2162a41a887a15a3bcb7b8957.png)



```python
plt.show()
```


```python
df = pd.DataFrame(
    np.random.randn(1000, 4), index=ts.index, columns=["A", "B", "C", "D"]
)
```


```python
df = df.cumsum()
```


```python
plt.figure();
```


    <Figure size 432x288 with 0 Axes>



```python
df.plot();
```


![在这里插入图片描述](https://img-blog.csdnimg.cn/b6c2fed705394a4bacd70a4e351a47c1.png)



```python
plt.legend(loc='best');
```

    No handles with labels found to put in legend.
    


![在这里插入图片描述](https://img-blog.csdnimg.cn/63bdab5f264f458186d567f97564439c.png)





