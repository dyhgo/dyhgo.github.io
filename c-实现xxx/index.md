# C++实现XXX






## 智能指针

```cpp
#include <iostream>

template <typename T>
class SmartPointer {
public:
    SmartPointer(T* ptr = nullptr) : _ptr(ptr), _cnt(ptr == nullptr ? nullptr : new int (1)){

    }

    SmartPointer(const SmartPointer<T>& other) : _ptr(other._ptr), _cnt(other._cnt) {
        if (_cnt) {
            ++(*_cnt);
        }
    }

    SmartPointer<T>& operator=(const SmartPointer<T>& other) {
        if (this != &other) {
            unpoint();
            _ptr = other._ptr;
            _cnt = other._cnt;
            if (_cnt) {
                ++(*_cnt);
            }
        }
        return *this;
    }

    ~SmartPointer() {
        unpoint();
    }

    T& operator*() const {
        return *_ptr;
    }

    T* operator->() const {
        return _ptr;
    }

    int getCnt() const {
        return _cnt ? *_cnt : 0;
    }

private:
    void unpoint() {
        if (_cnt and --(*_cnt) == 0) {
            delete _ptr;
            delete _cnt;
        }
    }
    T* _ptr;
    int* _cnt;
};

int main() {
    SmartPointer<int> ptr(new int(3));
    std::cout << ptr.getCnt() << '\n';
    SmartPointer<int> ptr2(ptr);
    std::cout << ptr.getCnt() << '\n';
    std::cout << ptr2.getCnt() << '\n';
    {SmartPointer<int> ptr3 ;
    ptr3 = ptr2;
    std::cout << ptr.getCnt() << '\n';
    std::cout << ptr2.getCnt() << '\n';
    std::cout << ptr3.getCnt() << '\n';}
    std::cout << ptr.getCnt() << '\n';
    std::cout << ptr2.getCnt() << '\n';

}
```


## 单例

```cpp
class Singleton {
private:
    Singleton() = default;
    static Singleton* instance;
public:
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
    static Singleton* getInstance() {
        if (instance == nullptr) {
            instance = new Singleton();
        } 
        return instance;
    }
};
Singleton* Singleton::instance = nullptr;
```


## String


```cpp
#include <iostream>

class String {
public:
    String() = default;
    // 构造函数
    String(const char* str) {
        m_size = strlen(str);
        m_data = new char[m_size + 1];
        memcpy(m_data, str, m_size + 1);
    }

    // 拷贝构造函数
    String(const String& s) {
        m_size = s.m_size;
        m_data = new char[m_size + 1];
        memcpy(m_data, s.m_data, m_size + 1);
    }

    // 移动构造函数
    String(String&& s) {
        m_size = s.m_size;
        m_data = s.m_data;
        s.m_size = 0;
        s.m_data = nullptr;
    }

    // 赋值函数
    String& operator=(const String& s) {
        if (this != &s) {
            delete m_data;
            m_size = s.m_size;
            m_data = new char[m_size + 1];
            memcpy(m_data, s.m_data, m_size + 1);
        }
        return *this;
    }

    // 析构函数
    ~String() {
        m_size = 0;
        delete[] m_data;
        m_data = nullptr;
    }

    char& operator[](size_t id) {
        return m_data[id];
    }

private:
    char* m_data = nullptr;
    size_t m_size;
    friend std::ostream& operator<<(std::ostream& os, const String& s);
};


// 重载输出流
std::ostream& operator<<(std::ostream& os, const String& s) {
    os << s.m_data;
    return os;
}


int main() {
    String a = "abc";
    std::cout << a << '\n';
    String b = a;
    b[0] = 'q';
    std::cout << b << '\n';
    String c ;
    c = b;
    c[1] = 'w';
    std::cout << b << '\n';
    std::cout << c << '\n';

    return 0;
}
```


## 线程池

```cpp
#include <iostream>
#include <queue>
#include <thread>
class ThreadPool {
public:

    ThreadPool(size_t num_thread = std::thread::hardware_concurrency()) {
        for (size_t i = 0; i < num_thread; i++) {
            threads_.emplace_back([this] () -> void {
                while (true) {

                    std::function<void()> task;

                    // 查看tasks有没有task，或者是否为stop_
                    {
                        std::unique_lock<std::mutex> lock(mutex_tasks_);
                        cv_.wait(lock, [this](){
                            return this->stop_ || !this->tasks_.empty();
                        });
                        if (stop_ && tasks_.empty()) {
                            return;
                        }

                        // 走到这步，队列中一定有任务
                        task = std::move(tasks_.front());
                        tasks_.pop();
                    }

                    task();

                }
            });
        }
    }

    ~ThreadPool() {
        {
            std::unique_lock<std::mutex> lock(mutex_tasks_);
            stop_ = true;
        }
        cv_.notify_all();
        for (auto& thread : threads_) {
            thread.join();
        }
    }

    void enqueue(std::function<void()> task) {
        {
            std::unique_lock<std::mutex> lock(mutex_tasks_);
            tasks_.emplace(std::move(task));
        }
        cv_.notify_one();
    }
private:

    std::vector<std::thread> threads_;
    std::queue<std::function<void()>> tasks_;
    std::mutex mutex_tasks_;
    std::condition_variable cv_;
    bool stop_ = false;
};


int main() {
    ThreadPool tp(3);
    for (int i = 0; i < 5; ++i) {
        tp.enqueue([i]() {
            std::cout << i << ' ' << std::this_thread::get_id() << '\n';
            std::this_thread::sleep_for(std::chrono::microseconds(1000));
        });
    }
    return 0;
}
```

## 快排

```cpp
#include <bits/stdc++.h>

using namespace std;


void quickSort(vector<int>& a, int l, int r) {
    if (l < r) {
        int ptrl = l, ptrr = r;
        int x = a[ptrl];
        while (ptrl < ptrr) {
            while (a[ptrl] <= x and ptrl < r) { // 注意这里是 < r 不是 < ptrr
                ptrl++;
            }
            while (a[ptrr] >= x and ptrr > l) {
                ptrr--;
            }
            if (ptrl < ptrr) {
                swap(a[ptrl], a[ptrr]);
            }
        }
        swap(a[l], a[ptrr]);
        quickSort(a, l, ptrr - 1);
        quickSort(a, ptrr + 1, r);
    }
}

int main() {


    vector<int> a = {3, 5, 1, 8, 9, 4, 2, 6, 0, 1};
    quickSort(a, 1, (int) a.size() - 1);
    for (int i : a) {
        cout << i << ' ';
    }
    return 0;
}

```

