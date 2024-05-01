# C++ IPC



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

## to be continued



## 参考

https://blog.csdn.net/weixin_44014982/article/details/130241892

https://blog.csdn.net/qq_43119867/article/details/130520252
