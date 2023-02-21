# GO与测试


[参考](https://github.com/Moonlight-Zhao/go-project-example/tree/v0.1)

## 单元测试

### 规则

- 所有测试文件以_test.go结尾

- func TestXxx(*testing.T)

- 初始化逻辑放到TestMain中

例子

文件名为nihao_test.go

```go
package hello

import "testing"

func HelloTom() string {
	return "Jerry"
}

func TestHelloTom(t *testing.T) {
	output := HelloTom()
	expectOutput := "Tom"
	if output != expectOutput {
		t.Errorf("Expect %s do not match actual %s", expectOutput, output)
	}
}
```

在命令行输入`go test nihao_test.go``

![在这里插入图片描述](https://img-blog.csdnimg.cn/37a903210c0a437083e395c3824c4821.png)

更好的比较输出与预期的方法是用assert

代码如下

```go
package hello

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func HelloTom() string {
	return "Jerry"
}

func TestHelloTom(t *testing.T) {
	output := HelloTom()
	expectOutput := "Tom"
	assert.Equal(t, expectOutput, output)
}
```

输入命令之后，结果如下

![在这里插入图片描述](https://img-blog.csdnimg.cn/81102749881848e08f582e8124d81eef.png)
需要在go.mod中添加依赖（可以IDE自动添加）

```go
require github.com/stretchr/testify v1.7.0

require (
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/kr/pretty v0.3.0 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	github.com/rogpeppe/go-internal v1.8.0 // indirect
	gopkg.in/check.v1 v1.0.0-20201130134442-10cb98267c6c // indirect
	gopkg.in/yaml.v3 v3.0.0-20210107192922-496545a6307b // indirect
)
```


### 覆盖率

写两个文件nihao.go和nihao_test.go，分别写如下代码

nihao.go

```go
package hello

func JudgeScore(score int) bool {
	if score >= 60 {
		return true
	}
	return false
}
```

nihao_test.go

```go
package hello

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestJS(t *testing.T) {
	output := JudgeScore(70)
	assert.Equal(t, true, output)
}
```


输入命令 `go test nihao_test.go nihao.go  --cover`

输出结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/9d76cd84934b421097682c1323d70f7f.png)

如果将两个函数放在同一个文件中，执行以上命令无法测试覆盖率，会有如下结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/52349f9308a2459cb60c83806c74f097.png)

如果把nihao_test.go代码改为

```go
package hello

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestJS(t *testing.T) {
	output := JudgeScore(70)
	assert.Equal(t, true, output)
}

func TestJS2(t *testing.T) {
	output := JudgeScore(20)
	assert.Equal(t, false, output)
}
```

覆盖率将达到100%



## Mock测试

一种测试工具是monkey

https://github.com/bouk/monkey



## 基准测试

基准测试就是测代码的运行性能

例子

在nihao.go文件中写如下代码

```go
package hello
import (
	"github.com/bytedance/gopkg/lang/fastrand"
	"math/rand"
)

var ServerIndex [10]int

func InitServerIndex() {
	for i := 0; i < 10; i++ {
		ServerIndex[i] = i + 100
	}
}

func Select() int {
	return ServerIndex[rand.Intn(10)]
}

func FastSelect() int {
	return ServerIndex[fastrand.Intn(10)]
}
```

在nihao_test.go中写如下代码

```go
package hello

import (
	"testing"
)

func BenchmarkSelect(b *testing.B) {
	InitServerIndex()
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		Select()
	}
}
func BenchmarkSelectParallel(b *testing.B) {
	InitServerIndex()
	b.ResetTimer()
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			Select()
		}
	})
}
func BenchmarkFastSelectParallel(b *testing.B) {
	InitServerIndex()
	b.ResetTimer()
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			FastSelect()
		}
	})
}
```

输入如下命令`go test nihao_test.go nihao.go -bench=.`，有如下结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/a86eadaa81724dc08b76f5f544cbbeef.png)

可以看到BenchmarkSelectParallel在使用多协程并发时性能还不如单协程，这是因为rand为了保证全局的随机性和全局安全，持有了一把随机锁，可以用fastrand来优化





