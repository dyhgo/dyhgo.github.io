# 导航



<!-- <script type="module" src="lib/tabs/tabs.min.js"></script> -->

{{< script >}}

// 使用动态import()语法
import('./lib/tabs/tabs.min.js')
  .catch(error => console.error('模块加载失败:', error));

{{< /script >}}

<!-- {{< script >}}
// 创建script元素并设置属性
const script = document.createElement('script');
script.type = 'module';
script.src = 'lib/tabs/tabs.min.js';

// 添加到文档头部（或body）
document.head.appendChild(script);
{{< /script >}} -->


{{< style "text-align:right; strong{color:#00b1ff;}" >}}

This is a **right-aligned** paragraph.

{{< /style >}}


{{< tabs >}}

{{% tab title="选项卡 1" %}}

### 标题 1

你好👋

#### 标题 2

```py
print("Hello world!")
```

{{% /tab %}}

{{% tab title="选项卡 2" %}}

另一个选项卡

{{% /tab %}}

{{< /tabs >}}


{{< friend name="PCloud" url="https://github.com/HEIGE-PCloud/" avatar="https://avatars.githubusercontent.com/u/52968553?v=4" bio="This is PCloud~💤" >}}
