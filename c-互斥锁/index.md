# C++互斥锁



## std::mutex

最简单的互斥锁

```cpp
// mutex example
#include <iostream>       // std::cout
#include <thread>         // std::thread
#include <mutex>          // std::mutex

std::mutex mtx;           // mutex for critical section

void print_block (int n, char c) {
    // critical section (exclusive access to std::cout signaled by locking mtx):
    // mtx.lock();
    for (int i=0; i<n; ++i) { std::cout << c; }
    std::cout << '\n';
    // mtx.unlock();
}

int main ()
{
    std::thread th1 (print_block,50,'*');
    std::thread th2 (print_block,50,'$');

    th1.join();
    th2.join();

    return 0;
}
```

输出

```
****************************************$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$**********
$$$$$$$$$$$$$$
```

```cpp
// mutex example
#include <iostream>       // std::cout
#include <thread>         // std::thread
#include <mutex>          // std::mutex

std::mutex mtx;           // mutex for critical section

void print_block (int n, char c) {
    // critical section (exclusive access to std::cout signaled by locking mtx):
    mtx.lock();
    for (int i=0; i<n; ++i) { std::cout << c; }
    std::cout << '\n';
    mtx.unlock();
}

int main ()
{
    std::thread th1 (print_block,50,'*');
    std::thread th2 (print_block,50,'$');

    th1.join();
    th2.join();

    return 0;
}
```

输出


```
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
**************************************************
```

## std::lock_guard

能够在线程抛出异常和结束时自动解锁

```cpp
// lock_guard example
#include <iostream>       // std::cout
#include <thread>         // std::thread
#include <mutex>          // std::mutex, std::lock_guard
#include <stdexcept>      // std::logic_error

std::mutex mtx;

void print_even (int x) {
    if (x%2==0) std::cout << x << " is even\n";
    else throw (std::logic_error("not even"));
}

void print_thread_id (int id) {
    try {
        // using a local lock_guard to lock mtx guarantees unlocking on destruction / exception:
        std::lock_guard<std::mutex> lck (mtx);
        print_even(id);
    }
    catch (std::logic_error&) {
        std::cout << "[exception caught]\n";
    }
}

int main ()
{
    std::thread threads[10];
    // spawn 10 threads:
    for (int i=0; i<10; ++i)
        threads[i] = std::thread(print_thread_id,i+1);

    for (auto& th : threads) th.join();

    return 0;
}
```

一种可能的输出

```
2 is even
[exception caught]
[exception caught]
6 is even
4 is even
[exception caught]
[exception caught]
8 is even
[exception caught]
10 is even
```

## std::shared_mutex

读写锁，支持多读单写

配合`std::unique_lock`和`std::shared_lock`，前者是写锁，后者是读锁

```cpp
#include <iostream>
#include <mutex>  // 对于 std::unique_lock
#include <shared_mutex>
#include <thread>

class ThreadSafeCounter {
public:
    ThreadSafeCounter() = default;

    // 多个线程/读者能同时读计数器的值。
    unsigned int get() const {
        std::shared_lock<std::shared_mutex> lock(mutex_);
        return value_;
    }

    // 只有一个线程/写者能增加/写线程的值。
    void increment() {
        std::unique_lock<std::shared_mutex> lock(mutex_);
        value_++;
    }

    // 只有一个线程/写者能重置/写线程的值。
    void reset() {
        std::unique_lock<std::shared_mutex> lock(mutex_);
        value_ = 0;
    }

private:
    mutable std::shared_mutex mutex_;
    unsigned int value_ = 0;
};

int main() {
    ThreadSafeCounter counter;

    auto increment_and_print = [&counter]() {
        for (int i = 0; i < 3; i++) {
            counter.increment();
            std::cout << std::this_thread::get_id() << ' ' << counter.get() << '\n';

            // 注意：写入 std::cout 实际上也要由另一互斥同步。省略它以保持示例简洁。
        }
    };

    std::thread thread1(increment_and_print);
    std::thread thread2(increment_and_print);

    thread1.join();
    thread2.join();
}

// 解释：下列输出在单核机器上生成。 thread1 开始时，它首次进入循环并调用 increment() ，
// 随后调用 get() 。然而，在它能打印返回值到 std::cout 前，调度器将 thread1 置于休眠
// 并唤醒 thread2 ，它显然有足够时间一次运行全部三个循环迭代。再回到 thread1 ，它仍在首个
// 循环迭代中，它最终打印其局部的计数器副本的值，即 1 到 std::cout ，再运行剩下二个循环。
// 多核机器上，没有线程被置于休眠，且输出更可能为递增顺序。
```


在单核上运行，可能的输出

```
123084176803584 2
123084176803584 3
123084176803584 4
123084185655040 1
123084185655040 5
123084185655040 6
```


## std::unique_lock和std::lock_guard的区别

std::unique_lock是std::lock_guard的扩展，它可以在生命周期内手动加锁和解锁

## 信号量

#include <semaphore.h>

#include <signal.h>

sem_init	初始化一个信号量，并给定初值

sem_wait	信号量-1，如果信号量本来为0就会阻塞直到信号量>0

sem_post 信号量+1

signal(某个信号，收到这个信号的处理函数)

## 参考

[https://cplusplus.com/reference/mutex/mutex/](https://cplusplus.com/reference/mutex/mutex/)

[https://cplusplus.com/reference/mutex/lock_guard/](https://cplusplus.com/reference/mutex/lock_guard/)

[https://zh.cppreference.com/w/cpp/thread/shared_mutex](https://zh.cppreference.com/w/cpp/thread/shared_mutex)


