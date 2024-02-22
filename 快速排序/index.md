# 快速排序




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

