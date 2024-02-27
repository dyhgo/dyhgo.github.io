# GO与并发




## 并发与并行

concurrncy和parallellism

并发指多个任务在同一时间段进行，并行指多个任务在同一时刻进行

单核cpu只能并发不能并行，现在的多核cpu既能并发又能并行

## 协程

coroutine，协程运行在线程上，一个线程可以拥有多个协程，协程只在用户态运行，由用户调度，它不像线程一样，由操作系统调度，切换涉及用户态和内核态，所以协程的开销很小。线程是栈MB级别，协程师栈KB级别

go使用协程

例子：启用5个协程，总共打印数字0～5

```go
package main

import (
	"fmt"
	"time"
)

func hello(i int) {
	println("hello", fmt.Sprint(i))
}

func main() {
	for i := 0; i < 5; i++ {
		go func(j int) {
			hello(j)
		}(i)
	}
	time.Sleep(time.Second) //为了避免子协程还没运行完，主协程先执行完了
}
```


## 协程间通信

协程间通信有两种：通道，共享内存（临界区）

一般通过通道更好，用临界区容易产生数据竞争


### channel

通道有两种

无缓冲通道，`a = make(chan int) `

有缓冲通道，`b = make(chan int, 2)`

任务：A协程发送0～9数字，B协程得到数字计算数字的平方，主协程输出数字


```go
package main

func main() {
	channel1 := make(chan int)
	channel2 := make(chan int, 3)
	go func() {
		defer close(channel1)
		for i := 0; i < 10; i++ {
			channel1 <- i
		}
	}()
	go func() {
		defer close(channel2)
		for i := range channel1 {
			channel2 <- i * i
		}
	}()
	for i := range channel2 {
		println(i, " ")
	}
}
```


输出，可以发现输出是有序的，因为第2个通道是缓冲通道


![在这里插入图片描述](https://img-blog.csdnimg.cn/01289121d715440fb849027980bf0d52.png)


### 共享内存，互斥锁

任务：开启5个协程，每个协程对某个变量执行2000次递增操作，分为加锁和不加锁情况


```go
package main

import (
	"sync"
	"time"
)

var (
	x    int64
	lock sync.Mutex
)

func addWithoutLock() {
	for i := 0; i < 2000; i++ {
		x++
	}
}

func addWithLock() {
	for i := 0; i < 2000; i++ {
		lock.Lock()
		x++
		lock.Unlock()
	}
}

func main() {
	x = 0
	for i := 0; i < 5; i++ {
		go addWithoutLock()
	}
	time.Sleep(time.Second)
	println("add without lock ", x)
	x = 0
	for i := 0; i < 5; i++ {
		go addWithLock()
	}
	time.Sleep(time.Second)
	println("add with lock ", x)
}

```


输出结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/8a033e21aa71431686670e05950cc433.png)


### WaitGroup

在上面的程序中使用time.Sleep的形式十分的不优雅，此处使用WaitGroup来让主协程等待子协程

WaitGroup使用计数器来达到要求，开启一个子协程时，计数器+1，结束一个子协程时，计数器-1，主协程会阻塞直到计数器为0。WaitGroup有三个重要的方法

Add方法计数器增加某个值，Done方法计数器-1，Wait方法阻塞当前协程，直到计数器为0


现在用WaitGroup来改写5个协程打印0～5的程序


```go
package main

import (
	"fmt"
	"sync"
)

func hello(i int) {
	println("hello", fmt.Sprint(i))
}

func main() {
	var wg sync.WaitGroup
	wg.Add(5)
	for i := 0; i < 5; i++ {
		go func(j int) {
			defer wg.Done()
			hello(j)
		}(i)
	}
	wg.Wait()
}

```


## 使用M个协程按顺序交替打印N个数字


```go
package main

import (
	"fmt"
	"sync"
)

func printN(m, n int) {
	chs := make([]chan int, m)
	for i := 0; i < m; i++ {
		chs[i] = make(chan int)
	}
	var wg sync.WaitGroup
	wg.Add(m)
	for i := 0; i < m; i++ {
		go func(id int) {
			defer wg.Done()
			for j := id + 1; j <= n; j += m {
				x := <-chs[id]
				fmt.Printf("goroutine: %d, number %d\n", id, x)
				if x < n {
					chs[(id+1)%m] <- x + 1
				}
			}
		}(i)
	}
	chs[0] <- 1
	wg.Wait()
}

func main() {
	printN(4, 30)
}

```


输出


```
goroutine: 0, number 1
goroutine: 1, number 2
goroutine: 2, number 3
goroutine: 3, number 4
goroutine: 0, number 5
goroutine: 1, number 6
goroutine: 2, number 7
goroutine: 3, number 8
goroutine: 0, number 9
goroutine: 1, number 10
goroutine: 2, number 11
goroutine: 3, number 12
goroutine: 0, number 13
goroutine: 1, number 14
goroutine: 2, number 15
goroutine: 3, number 16
goroutine: 0, number 17
goroutine: 1, number 18
goroutine: 2, number 19
goroutine: 3, number 20
goroutine: 0, number 21
goroutine: 1, number 22
goroutine: 2, number 23
goroutine: 3, number 24
goroutine: 0, number 25
goroutine: 1, number 26
goroutine: 2, number 27
goroutine: 3, number 28
goroutine: 0, number 29
goroutine: 1, number 30
```












