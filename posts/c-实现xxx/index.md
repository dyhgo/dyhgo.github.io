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

对于顺序的数组，可以先随机洗牌

对于有大量重复元素，会退化成O(n\*n)，成为`荷兰国旗问题`，可以用如下解法

```go
func sortArray(nums []int) []int {
	n := len(nums)
	var quickSort func([]int, int, int)
	quickSort = func(nums []int, l int, r int) {
		if l >= r {
			return
		}
		pivot := nums[l + rand.Intn(r-l+1)]
        // pos := l + rand.Intn(r-l+1)
		// nums[l], nums[pos] = nums[pos], nums[l]
		// pivot := nums[l]
		samel, samer := l, r
		cur := l
		for cur <= samer {
			if nums[cur] < pivot {
				nums[cur], nums[samel] = nums[samel], nums[cur]
				samel++
				cur++
			} else if nums[cur] > pivot {
				nums[cur], nums[samer] = nums[samer], nums[cur]
				samer--
			} else {
				cur++
			}
		}
		quickSort(nums, l, samel-1)
		quickSort(nums, samer+1, r)
	}
	quickSort(nums, 0, n-1)
	return nums
}
```



## 归并排序

```cpp
#include <bits/stdc++.h>

using namespace std;

void _merge(vector<int>& a, int ll, int lr, int rl, int rr) {
    static vector<int> b(a.size());
    for (int i = ll; i <= rr; ++i) {
        b[i] = a[i];
    }
    int ptrl = ll, ptrr = rl, ptr = ll;
    while (ptrl <= lr or ptrr <= rr) {
        if (ptrr > rr) {
            a[ptr++] = b[ptrl++];
        } else if (ptrl > lr) {
            a[ptr++] = b[ptrr++];
        } else if (b[ptrl] < b[ptrr]) {
            a[ptr++] = b[ptrl++];
        } else {
            a[ptr++] = b[ptrr++];
        }
    }
}

void mergeSort(vector<int>& a, int l, int r) {
    if (l >= r) return;
    int mid = (l + r) >> 1;
    mergeSort(a, l, mid);
    mergeSort(a, mid + 1, r);
    _merge(a, l, mid, mid + 1, r);

}

int main() {
    //vector<int> a = {14, 12, -4, 5, 9, -1, 5, 5, 6, 2, 7, 8, 1};
    vector<int> a = {3};
    mergeSort(a, 0, (int) a.size() - 1);
    for (int i : a) {
        cout << i << ' ';
    }
    return 0;
}


```





## 冒泡排序

不断交换，每次把最大值换到后面

```cpp
#include <bits/stdc++.h>

using namespace std;

void bubbleSort(vector<int>& a, int l, int r) {
    int n = (int) a.size();
    for (int i = n - 1; i >= 0; --i) {
        for (int j = 0; j < i; ++j) {
            if (a[j] > a[j + 1]) swap(a[j], a[j + 1]);
        }
    }
}

int main() {
    //vector<int> a = {14, 12, -4, 5, 9, -1, 5, 5, 6, 2, 7, 8, 1};
    vector<int> a = {3, 2, 1};
    bubbleSort(a, 0, (int) a.size() - 1);
    for (int i : a) {
        cout << i << ' ';
    }
    return 0;
}

```


## 选择排序

每次选择最小值，放到最前面

```cpp
#include <bits/stdc++.h>

using namespace std;

void selectionSort(vector<int>& a, int l, int r) {
    int n = (int) a.size();
    for (int i = 0; i < n; ++i) {
        int mn = a[i];
        int id = i;
        for (int j = i + 1; j < n; ++j) {
            if (a[j] < mn) {
                mn = a[j];
                id = j;
            }
        }
        swap(a[i], a[id]);
    }
}

int main() {
    vector<int> a = {14, 12, -4, 5, 9, -1, 5, 5, 6, 2, 7, 8, 1};
    //vector<int> a = {3};
    selectionSort(a, 0, (int) a.size() - 1);
    for (int i : a) {
        cout << i << ' ';
    }
    return 0;
}

```


## 插入排序

对于遍历到的数，每次往前看它应该被插到哪个位置

```cpp
#include <bits/stdc++.h>

using namespace std;

void insertionSort(vector<int>& a, int l, int r) {
    int n = (int) a.size();
    for (int i = 0; i < n; ++i) {
        for (int j = i; j > 0; --j) {
            if (a[j] < a[j - 1]) {
                swap(a[j], a[j - 1]);
            } else break;
        }
    }
}

int main() {
    //vector<int> a = {14, 12, -4, 5, 9, -1, 5, 5, 6, 2, 7, 8, 1};
    vector<int> a = {3};
    insertionSort(a, 0, (int) a.size() - 1);
    for (int i : a) {
        cout << i << ' ';
    }
    return 0;
}

```

## 管道

```cpp
#include <iostream>
#include <unistd.h>
int main() {
    int fd[2];
    if (pipe(fd) == -1) {
        perror("pipe");
        return 1;
    }
    // create child process
    pid_t pid = fork();
    char buf[256];
    if (pid == -1) {
        perror("fork");
        return 1;
    } else if (pid > 0) { // parent process
        close(fd[0]);   // close read end
        std::string info = "hello world";
        write(fd[1], info.c_str(), info.length());
        close(fd[1]);
        wait(nullptr);  // block until one child end
    } else {    // pid == 0 is child process
        close(fd[1]);   // close write end
        read(fd[0], buf, sizeof buf);
        close(fd[0]);
        std::cout << "content is: " << buf << '\n';
    }
    return 0;
}
```


## 共享内存

```cpp
#include <sys/mman.h> // shm_open mmap
#include <fcntl.h> // for constants
#include <cstdio>
#include <unistd.h>
#include <iostream>

int main() {

    const int SIZE = 1024;

    // open a shared memory object which is a file located in /dev/shm/
    // "my_shm" is file name
    int fd = shm_open("my_shm", O_CREAT | O_RDWR, S_IRUSR | S_IWUSR); // -1 error

    // truncate or extend a file to a specified length
    ftruncate(fd, SIZE);    // -1 error

    int* shared_memory = static_cast<int *>(mmap(nullptr, SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0)); // MAP_FAILED error

    pid_t pid = fork(); // -1 error
    if (pid > 0) {
        shared_memory[32] = 1000;
        sleep(2);
        std::cout << pid << ' ' << shared_memory[32] << '\n';
        wait(nullptr);
        munmap(shared_memory, SIZE);
        shm_unlink("my_shm");
        close(fd);
    } else if (pid == 0) {
        sleep(1);
        std::cout << pid << ' ' << shared_memory[32] << '\n';
        shared_memory[32] = 2000;
    }
    return 0;
}
```





## IPC参考

https://blog.csdn.net/weixin_44014982/article/details/130241892

https://blog.csdn.net/qq_43119867/article/details/130520252

