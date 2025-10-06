# 软件工程6大原则



宗旨：高内聚、低耦合、好扩展、好维护


六大设计原则

 - 单一职责原则（Single Responsibility Principle, SRP）
 - 开放封闭原则（Open-Closed Principle, OCP）
 - 里氏替换原则（Liskov Substitution Principle, LSP）
 - 接口隔离原则（Interface Segregation Principle, ISP）
 - 依赖倒置原则（Dependency Inversion Principle, DIP）
 - 迪米特法则（Law of Demeter, LoD）

## 单一职责原则（Single Responsibility Principle, SRP）

一个类或函数，只做一件事情

比如👇UserService和Logger都只做一件事，符合SRP

```go
package main

import "fmt"

// User 用户数据结构
type User struct {
    ID   int
    Name string
}

// UserService 仅负责用户信息管理（单一职责）
type UserService struct{}

func (u *UserService) CreateUser(name string) User {
    return User{ID: 1, Name: name}
}

// Logger 仅负责日志记录（单一职责）
type Logger struct{}

func (l *Logger) Log(message string) {
    fmt.Printf("[Log] %s\n", message)
}

func main() {
    userService := UserService{}
    logger := Logger{}
    
    user := userService.CreateUser("Alice")
    logger.Log(fmt.Sprintf("User created: %s", user.Name)) // 职责分离，修改日志逻辑不影响用户管理
}
```


## 开放关闭原则（Open-Closed Principle, OCP）

当需要对函数或类A新增功能时，应该在外部写，然后调用新功能，而非在内部写

或称“对调用开放，对修改封闭”

比如PaymentProcessor依赖Payment接口，新增PayPalPayment时只需实现接口，无需修改PaymentProcessor的代码，符合 “对调用（或扩展）开放，对修改关闭”。

```go
package main

import "fmt"

// Payment 支付接口（抽象层）
type Payment interface {
    Pay(amount float64) string
}

// CreditCardPayment 信用卡支付（实现接口）
type CreditCardPayment struct{}

func (c *CreditCardPayment) Pay(amount float64) string {
    return fmt.Sprintf("Paid %.2f via Credit Card", amount)
}

// PayPalPayment PayPal支付（新增实现，扩展功能）
type PayPalPayment struct{}

func (p *PayPalPayment) Pay(amount float64) string {
    return fmt.Sprintf("Paid %.2f via PayPal", amount)
}

// PaymentProcessor 支付处理器（依赖抽象，对修改关闭）
type PaymentProcessor struct {
    payment Payment
}

func (p *PaymentProcessor) ProcessPayment(amount float64) string {
    return p.payment.Pay(amount) // 无需修改此处即可支持新支付方式
}

func main() {
    // 扩展：新增支付方式时，只需实现Payment接口
    creditCard := &CreditCardPayment{}
    processor := &PaymentProcessor{payment: creditCard}
    fmt.Println(processor.ProcessPayment(100.50))

    paypal := &PayPalPayment{}
    processor = &PaymentProcessor{payment: paypal} // 直接替换支付方式
    fmt.Println(processor.ProcessPayment(200.00))
}
```


## 里氏替换原则（Liskov Substitution Principle, LSP）


两个类实现接口，对于所有使用到接口的地方，都能保证执行对应类的逻辑

比如下方Rectangle和Square都实现了Shape接口，在调用PrintArea时，根据传入具体的类的不同，执行了对应的逻辑

```go
package main

import "fmt"

// Shape 图形接口
type Shape interface {
	Area() float64
}

// Rectangle 长方形
// Rectangle 实现了Shape接口
type Rectangle struct {
	Width  float64
	Height float64
}

func (r *Rectangle) Area() float64 {
	return r.Width * r.Height
}

// Square 正方形（是特殊的长方形）
// Square 实现了Shape接口
type Square struct {
	Side float64
}

func (s *Square) Area() float64 {
	return s.Side * s.Side // 符合LSP：替换Shape时面积计算正确
}

// PrintArea 接收Shape接口，可透明替换为任何实现类
func PrintArea(shape Shape) {
	fmt.Printf("Area: %.2f\n", shape.Area())
}

func main() {
	rect := &Rectangle{Width: 3, Height: 4}
	square := &Square{Side: 3}

	PrintArea(rect)   // 输出：Area: 12.00（正确）
	PrintArea(square) // 输出：Area: 9.00（正确，符合LSP）
}
```


## 接口隔离原则（Interface Segregation Principle, ISP）


假设有个接口Object，有3个方法，eat，work，sleep

那么Human类可以实现Object，但是Robot类不能实现Object，因为他无法执行eat和sleep方法（不需要吃饭和睡觉）

该怎么解决？

把Object接口拆成3个接口（或2个），Eater、Worker、Sleeper，分别有eat、work、sleep三个方法

让Human类实现Eater、Worker、Sleeper三个接口，让Robot实现Worker一个接口

即某个类不应该有不用的方法

比如👇Human和Robot按需实现接口

```go
package main

import "fmt"

// 拆分后的小接口
type Eater interface {
    Eat() string
}

type Worker interface {
    Work() string
}

type Sleeper interface {
    Sleep() string
}

// Human 实现所有接口（需要吃饭、工作、睡觉）
type Human struct{}

func (h *Human) Eat() string   { return "Human is eating" }
func (h *Human) Work() string  { return "Human is working" }
func (h *Human) Sleep() string { return "Human is sleeping" }

// Robot 只实现Work接口（不需要吃饭、睡觉）
type Robot struct{}

func (r *Robot) Work() string { return "Robot is working" } // 不依赖不需要的Eater和Sleeper

// 客户端函数：只依赖必要接口
func Feed(eater Eater) {
    fmt.Println(eater.Eat())
}

func ManageWorker(worker Worker) {
    fmt.Println(worker.Work())
}

func main() {
    human := &Human{}
    robot := &Robot{}

    Feed(human)        // 正确：Human实现了Eater
    ManageWorker(human) // 正确：Human实现了Worker
    ManageWorker(robot) // 正确：Robot实现了Worker（不依赖多余接口）
}
```


## 依赖倒置原则（Dependency Inversion Principle, DIP）

已有包含关系为，A包含B，B包含C，其中A是最高层，C是最底层，那么A就不应该再直接包含C

比如OrderService包含Payment接口，Payment包含CreditCardPayment，所以OrderService不能直接包含CreditCardPayment。当需要更换支付方式时，只需新增类，然后实现Payment接口，无需修改OrderService。

```go
package main

import "fmt"

// Payment 抽象接口（抽象）
type Payment interface {
    Pay(amount float64) error
}

// CreditCardPayment 具体实现（细节）
type CreditCardPayment struct{}

func (c *CreditCardPayment) Pay(amount float64) error {
    fmt.Printf("Paid %.2f via Credit Card\n", amount)
    return nil
}

// OrderService 高层模块（依赖抽象，不依赖具体实现）
type OrderService struct {
    payment Payment // 依赖Payment接口，而非具体类型
}

func (o *OrderService) ProcessOrder(amount float64) error {
    return o.payment.Pay(amount) // 高层模块通过抽象调用低层功能
}

func main() {
    // 注入具体实现（细节依赖抽象）
    creditCard := &CreditCardPayment{}
    orderService := &OrderService{payment: creditCard}
    orderService.ProcessOrder(300.00)

    // 若需替换为PayPal，只需新增PayPalPayment实现Payment接口，无需修改OrderService
}
```


## 迪米特法则（Law of Demeter, LoD）

一个类只与他的直接朋友通信，减少对其他朋友不必要的了解，比如访问其他朋友的成员变量

比如当A通过B访问C的成员变量时，B是A的直接朋友，那么A就不能直接访问到C的成员变量

对于下面代码，Customer只与Order（直接朋友）交互，通过Order的GetTotalPrice获取总价，而非直接访问Product的Price

```go
package main

import "fmt"

// Product 商品（非Customer的直接朋友）
type Product struct {
	Name  string
	Price float64 // 内部细节
}

// Order 订单（Customer的直接朋友）
type Order struct {
	products []Product
}

// GetTotalPrice 订单封装商品价格计算，对外提供结果
func (o *Order) GetTotalPrice() float64 {
	total := 0.0
	for _, p := range o.products {
		total += p.Price // Order可访问Product（Order的直接朋友）
	}
	return total
}

// Customer 客户（只与Order通信，不直接访问Product）
type Customer struct{}

// Checkout 结账：通过Order获取总价，不直接操作Product
func (c *Customer) Checkout(order *Order) {
	total := order.GetTotalPrice() // 只与直接朋友Order通信
	fmt.Printf("Total to pay: %.2f\n", total)
}

func main() {
	products := []Product{
		{Name: "Book", Price: 50.0},
		{Name: "Pen", Price: 5.0},
	}
	order := &Order{products: products}
	customer := &Customer{}
	customer.Checkout(order) // 输出：Total to pay: 55.00
}
```

