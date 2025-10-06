# panic, log.Fatal, os.Exit, runtime.Goexit的区别



panic()如果在本协程里没有recover捕获，则会异常终止程序

在本协程里没有recover，在别的协程中recover是捕获不到的

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	defer func() {	// 捕获不到
		if r := recover(); r != nil {
			fmt.Println("Recovered in main", r)
		}
	}()
	go func() {
		defer func() {	// 能捕获到
			if r := recover(); r != nil {
				fmt.Println("Recovered in f", r)
			}
		}()
		panic("hello world")
	}()
	time.Sleep(3 * time.Second)
}

```


os.Exit()会立刻按退出码来终止程序，不会执行defer

```go
package main

import (
	"fmt"
	"os"
	"time"
)

func main() {
	defer func() { // 捕获不到
		if r := recover(); r != nil {
			fmt.Println("Recovered in main", r)
		}
	}()
	go func() {
		defer func() { // 能捕获到
			if r := recover(); r != nil {
				fmt.Println("Recovered in f", r)
			}
		}()
		os.Exit(1)
	}()
	time.Sleep(3 * time.Second)
}

```

log.Fatal() 就是先打印日志，然后执行os.Exit(1)


```go
package main

import (
	"fmt"
	"log"
	"time"
)

func main() {
	defer func() { // 捕获不到
		if r := recover(); r != nil {
			fmt.Println("Recovered in main", r)
		}
	}()
	go func() {
		defer func() { // 能捕获到
			if r := recover(); r != nil {
				fmt.Println("Recovered in f", r)
			}
		}()
		log.Fatal("haha")
	}()
	time.Sleep(3 * time.Second)
}

```


runtime.Goexit() 没有入参，他会立刻退出当前协程，会执行defer，但没有错误可被recover捕获

```go
package main

import (
	"fmt"
	"runtime"
	"time"
)

func main() {
	defer func() { // 捕获不到
		if r := recover(); r != nil {
			fmt.Println("Recovered in main", r)
		}
	}()
	go func() {
		defer func() { // 能捕获到
			if r := recover(); r != nil {
				fmt.Println("Recovered in f", r)
			}
		}()
		runtime.Goexit()
		fmt.Println("Hello World")
	}()
	time.Sleep(3 * time.Second)
}

```



