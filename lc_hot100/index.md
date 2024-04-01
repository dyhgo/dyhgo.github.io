# LC_HOT100



## [1.两数之和](https://leetcode.cn/problems/two-sum/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意


### 题解

哈希表

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, vector<int>> mp;
        for (int i = 0; i < (int) nums.size(); ++i) {
            mp[nums[i]].push_back(i);
        }
        for (int i = 0; i < (int) nums.size(); ++i) {
            if (nums[i] * 2 == target and mp[nums[i]].size() > 1) {
                return vector<int>{mp[nums[i]][0], mp[nums[i]][1]};
            } else if (nums[i] * 2 != target and mp.find(target - nums[i]) != mp.end()) {
                return vector<int>{mp[nums[i]][0], mp[target - nums[i]][0]};
            }
        }
        return vector<int>{};
    }
};
```


## [49.字母异位词分组](https://leetcode.cn/problems/group-anagrams/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

通过计数哈希，时间复杂度O(n(k + 26))

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<int>> mp;
        for (int i = 0; i < (int) strs.size(); ++i) {
            string str = strs[i];
            unordered_map<char, int> mmp;
            for (char i : str) {
                mmp[i]++;
            }
            string tmp;
            for (char i = 'a'; i <= 'z'; ++i) {
                if (mmp.find(i) != mmp.end()) {
                    int tv = mmp[i];
                    while (tv--) {
                        tmp += i;
                    }
                }
            }
            mp[tmp].push_back(i);
        }
        vector<vector<string>> ans;
        for (auto& [x, y] : mp) {
            vector<string> now;
            for (int i : y) {
                now.push_back(strs[i]);
            }
            ans.push_back(now);
        }
        return ans;
    }
};
```


## [128.最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意


### 题解

哈希表，只从序列头开始计算，这样就不会重复计算

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> us;
        for (int i : nums) {
            us.insert(i);
        }
        int ans = 0;
        for (int i : us) {
            if (us.find(i - 1) == us.end()) {   // 序列头
                int num = 0;
                for (int j = i; ; ++j) {
                    if (us.find(j) != us.end()) {
                        num++;
                    } else {
                        ans = max(ans, num);
                        break;
                    }
                }
            }
        }
        return ans;
    }
};
```


## [283.移动零](https://leetcode.cn/problems/move-zeroes/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意


### 题解

双指针，一个指针指向接下来的第一个0，一个指针指向接下来的第一个非0，然后交换

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int n = (int) nums.size();
        if (n == 0) {
            return ;
        }
        int l = 0, r = 1;
        while (r < n) {
            if (nums[l] == 0 and nums[r] != 0) {
                swap(nums[l], nums[r]);
            }
            while (l < n) {
                if (nums[l] == 0) break;
                else l++;
            }
            r = l + 1;
            while (r < n) {
                if (nums[r] != 0) break;
                else r++;
            }
        }
    }
};
```


## [3.无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

滑动窗口


```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int n = s.length();
        int l = 0, r = 1;
        if (n == 1) {
            return 1;
        }
        unordered_map<char, int> mp;
        mp[s[0]]++;
        int ans = 0;
        while (l < r and r <= n) {
            if (r - l > (int) mp.size()) {
                mp[s[l]]--;
                if (mp[s[l]] == 0) mp.erase(s[l]);
                l++;
            } else {
                ans = max(ans, r - l);
                if (r < n) {mp[s[r]]++; r++;}
                else break;
            }
        }
        return ans;
    }
};
```


## [560.和为K的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/submissions/500384381/?envType=study-plan-v2&envId=top-100-liked)

### 题意


### 题解

前缀和

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int n = (int) nums.size();
        int sum = 0;
        int ans = 0;
        unordered_map<int, int> mp;
        for (int i = 0; i < n; ++i) {
            sum += nums[i];
            int now = sum - k;
            ans += mp[now];
            mp[sum]++;
            if (sum == k) ans++;
        }
        return ans;
    }
};
```

## [53.最大子数组和](https://leetcode.cn/problems/maximum-subarray/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

dp O(n)

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int dp = 0;
        int ans = -(1e4 + 3);
        for (int i : nums) {
            dp = max(dp + i, i);
            ans = max(ans, dp);
        }
        return ans;
    }
};
```


线段树


## [73.矩阵置零](https://leetcode.cn/problems/set-matrix-zeroes/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意


### 题解


```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int n = (int) matrix.size();
        int m = (int) matrix[0].size();
        bool colflag = false;
        bool rowflag = false;
        for (int i = 0; i < n; ++i) {
            if (matrix[i][0] == 0) {
                colflag = true;
                break;
            }
        }
        for (int j = 0; j < m; ++j) {
            if (matrix[0][j] == 0) {
                rowflag = true;
                break;
            }
        }
        for (int i = 1; i < n; ++i) {
            for (int j = 1; j < m; ++j) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = matrix[0][j] = 0;
                }
            }
        }
        for (int i = 1; i < n; ++i) {
            if (matrix[i][0] == 0) {
                for (int j = 1; j < m; ++j) {
                    matrix[i][j] = 0;
                }
            }
        }
        for (int j = 1; j < m; ++j) {
            if (matrix[0][j] == 0) {
                for (int i = 1; i < n; ++i) {
                    matrix[i][j] = 0;
                }
            }
        }
        if (rowflag) {
            for (int j = 0; j < m; ++j) {
                matrix[0][j] = 0;
            }
        }
        if (colflag) {
            for (int i = 0; i < n; ++i) {
                matrix[i][0] = 0;
            }
        }

    }
};
```

## [160.相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        int len1 = 0, len2 = 0;
        auto ptr1 = headA, ptr2 = headB;
        while (ptr1 != nullptr) {
            len1++;
            ptr1 = ptr1->next;
        }
        while (ptr2 != nullptr) {
            len2++;
            ptr2 = ptr2->next;
        }
        if (len1 > len2) {
            auto dif = len1 - len2;
            while (dif--) {
                headA = headA->next;
            }
        }
        if (len1 < len2) {
            auto dif = len2 - len1;
            while (dif--) {
                headB = headB->next;
            }
        }
        while (headA != nullptr) {
            if (headA == headB) {
                return headA;
            } else {
                headA = headA->next;
                headB = headB->next;
            }
        }
        return nullptr;
    }
};
```


## [94.二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

递归

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> ans;
        function<void(TreeNode*)> dfs = [&](TreeNode* node) {
            if (node == nullptr) return;
            if (node->left != nullptr) dfs(node->left);
            ans.push_back(node->val);
            if (node->right != nullptr) dfs(node->right);
        };
        dfs(root);
        return ans;
    }
};
```


迭代

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> ans;
        if (root == nullptr) return ans;
        stack<TreeNode*> st;
        auto cnt = root;
        while (cnt != nullptr || !st.empty()) {
            while (cnt != nullptr) {
                st.emplace(cnt);
                cnt = cnt->left;
            }
            cnt = st.top();
            st.pop();
            ans.push_back(cnt->val);
            cnt = cnt->right;
        }
        return ans;
    }
};
```


## [200.岛屿数量](https://leetcode.cn/problems/number-of-islands/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

```cpp
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int n = (int) grid.size();
        int m = (int) grid[0].size();
        int ans = 0;
        int dir[][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        function<void(int, int)> dfs = [&](int x, int y) {
            grid[x][y] = '2';
            for (int k = 0; k < 4; ++k) {
                int tx = x + dir[k][0], ty = y + dir[k][1];
                if (tx >= 0 and tx < n and ty >= 0 and ty < m and grid[tx][ty] == '1') dfs(tx, ty);
            }
        };
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (grid[i][j] == '1') {
                    ans++;
                    dfs(i, j);
                }
            }
        }
        return ans;
    }
};
```

## [46.全排列](https://leetcode.cn/problems/permutations/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

```cpp
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> ans;
        int n = (int) nums.size();
        function<void(int)> dfs = [&](int pos) {
            if (pos == n) {
                ans.emplace_back(nums);
                return ;
            }
            for (int i = pos; i < n; ++i) {
                swap(nums[pos], nums[i]);
                dfs(pos + 1);
                swap(nums[pos], nums[i]);
            }
        };
        dfs(0);
        return ans;
    }
};
```


## [47.全排列II](https://leetcode.cn/problems/permutations-ii/description/)

### 题意

### 题解

```cpp
class Solution {
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        vector<vector<int>> ans;
        int n = (int) nums.size();
        function<void(int)> dfs = [&](int pos) {
            if (pos == n) {
                ans.emplace_back(nums);
                return ;
            }
            unordered_set<int> s;
            for (int i = pos; i < n; ++i) {
                if (s.find(nums[i]) == s.end()) {
                    s.insert(nums[i]);
                    swap(nums[i], nums[pos]);
                    dfs(pos + 1);
                    swap(nums[i], nums[pos]);
                }
            }
        };
        dfs(0);
        return ans;
    }
};
```


## [LCR 016. 无重复字符的最长子串](https://leetcode.cn/problems/wtcaE1/description/)


### 题意

给定一个字符串 s ，请你找出其中不含有重复字符的 最长连续子字符串 的长度。

### 题解

尺取，注意边界

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int n = s.length();
        int l = 0, r = 1;
        unordered_map<char, int> mp;
        mp[s[0]] = 1;
        int ans = 0;
        while (r <= n and l < r) {
            if (r - l != (int) mp.size()) {
                mp[s[l]]--;
                if (mp[s[l]] == 0) mp.erase(s[l]);
                l++;
            } else {
                ans = max(ans, r - l);
                //if (r < n) // infinite loop
                {mp[s[r]]++; r++;}
            }
        }
        return ans;
    }
};
```



## [146. LRU 缓存](https://leetcode.cn/problems/lru-cache/description/)

### 题意

### 题解

```cpp
class LRUCache {
private:
    struct DLinkedList {
        int key, value;
        DLinkedList* prev;
        DLinkedList* next;
        DLinkedList() : key(0), value(0), prev(nullptr), next(nullptr) {}
        DLinkedList(int k, int v) : key(k), value(v), prev(nullptr), next(nullptr) {}
    };
    unordered_map<int, DLinkedList*> mp;
    size_t sz;
    size_t cap;
    DLinkedList* head, *tail;
public:
    LRUCache(int capacity) : cap(capacity), sz(0) {
        head = new DLinkedList();
        tail = new DLinkedList();
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        if (mp.find(key) != mp.end()) {
            auto node = mp[key];
            deleteNode(node);
            addHead(node);
            return node->value;
        } else {
            return -1;
        }
    }

    void put(int key, int value) {
        if (mp.find(key) != mp.end()) {
            auto node = mp[key];
            node->value = value;
            deleteNode(node);
            addHead(node);
        } else {
            auto node = new DLinkedList(key, value);
            mp[key] = node;
            addHead(node);
            sz++;
            if (sz > cap) {
                removeTail();
                sz--;
            } 
        }
    }
    
    void removeTail() {
        auto node = tail->prev;
        node->prev->next = tail;
        tail->prev = node->prev;
        mp.erase(node->key);
        delete node;
    }
    
    void deleteNode(DLinkedList* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    
    void addHead(DLinkedList* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```


## [347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/description/)


### 题意

### 题解


```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> mp;
        for (int i : nums) {
            mp[i]++;
        }
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        for (auto& [x, y] : mp) {
            if ((int) pq.size() < k) {
                pq.emplace(y, x);
            } else {
                if (y > pq.top().first) {
                    pq.pop();
                    pq.emplace(y, x);
                }
            }
        }
        vector<int> ans;
        while (!pq.empty()) {
            ans.emplace_back(pq.top().second);
            pq.pop();
        }
        return ans;
    }
};
```

## [692. 前K个高频单词](https://leetcode.cn/problems/top-k-frequent-words/description/)

### 题意


### 题解

```cpp
class Solution {
public:
    vector<string> topKFrequent(vector<string>& words, int k) {
        int n = (int) words.size();
        unordered_map<string, int> mp;
        for (const string& i : words) {
            mp[i]++;
        }
        struct cmp {
            bool operator() (const pair<string, int>& p1, const pair<string, int>& p2) const {
                if (p1.second == p2.second) return p1.first < p2.first;
                return p1.second > p2.second;
            }
        };
        priority_queue<pair<string, int>, vector<pair<string, int>>, cmp> pq;
        for (auto& [x, y] : mp) {
            pq.emplace(x, y);
            if ((int) pq.size() > k) {
                pq.pop();
            }
        }
        vector<string> ans;
        while (!pq.empty()) {
            auto& [x, _] = pq.top();
            ans.emplace_back(x);
            pq.pop();
        }
        reverse(ans.begin(), ans.end());
        return ans;
    }
};
```


## [25. K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

用四个指针，start指向将要翻转的这一组的头，end指向尾，pre指向start的前一个节点（需要在head前插一个虚拟的节点），nxt指向end的后一个节点

然后翻转这一组后就是各种指针移动（赋值）


```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    void reverse(ListNode* head, ListNode* tail) {
        ListNode* l, *m, *r;
        l = nullptr;
        m = head;
        r = m->next;
        while (l != tail) {
            m->next = l;
            l = m;
            m = r;
            if (r == nullptr) break;
            r = r->next;
        } 
    }
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* dummy = new ListNode(-1);
        dummy->next = head;
        ListNode* pre, *start, *end, *nxt;
        pre = dummy;
        start = pre->next;
        while (start != nullptr) {
            end = pre;
            for (int i = 0; i < k and end != nullptr; ++i) {
                end = end->next;
            }
            if (end == nullptr) break;
            nxt = end->next;
            reverse(start, end);
            pre->next = end;
            start->next = nxt;
            pre = start;
            start = nxt;
        }
        return dummy->next;
    }
};
```


## [300.最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = (int) nums.size();
        const int inf = 0x3f3f3f3f;
        vector<int> dp((size_t) n, inf);
        for (int i = 0; i < n; ++i) {
            *lower_bound(dp.begin(), dp.end(), nums[i]) = nums[i];
        }
        return lower_bound(dp.begin(), dp.end(), inf) - dp.begin();
    }
};
```


## [215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int findKthSmallest(vector<int>&nums, int l, int r, int k) {
        int ptrl = l, ptrr = r, x = nums[l];
        if (l < r) {
            while (ptrl < ptrr) {
                while (nums[ptrl] <= x and ptrl < r) ptrl++;
                while (nums[ptrr] >= x and ptrr > l) ptrr--;
                if (ptrl < ptrr) swap(nums[ptrl], nums[ptrr]);
            }
            swap(nums[ptrr], nums[l]);
            if (ptrr == k) return nums[ptrr];
            if (ptrr > k) return findKthSmallest(nums, l, ptrr - 1, k);
            else return findKthSmallest(nums, ptrr + 1, r, k);
        }
        return nums[k];
    }
    int findKthLargest(vector<int>& nums, int k) {
        mt19937 rng{random_device{}()};
        shuffle(nums.begin(), nums.end(), rng);
        int n = (int) nums.size();
        return findKthSmallest(nums, 0, n - 1, n - k);
    }
};
```



## [35.搜索插入位置](https://leetcode.cn/problems/search-insert-position/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int n = nums.size();
        int l = 0, r = n - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] > target) r = mid - 1;
            else l = mid + 1; 
        }
        return l;
    }
};
```


## [20.有效的括号](https://leetcode.cn/problems/valid-parentheses/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意


### 题解


```cpp
class Solution {
public:
    bool isValid(string ss) {
        stack<char> st;
        for (char i : ss) {
            if (i == '(' or i == '[' or i == '{') st.push(i);
            else if (i == ')') {
                if (st.empty() or st.top() != '(') {
                    return false;
                } else {
                    st.pop();
                }
            } 
            else if (i == ']') {
                if (st.empty() or st.top() != '[') {
                    return false;
                } else {
                    st.pop();
                }
            } else {
                if (st.empty() or st.top() != '{') {
                    return false;
                } else {
                    st.pop();
                }
            }
        }
        return st.empty();
    }
};
```


## [121.买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意


### 题解

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<int> sufmax(n);
        sufmax[n - 1] = prices[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            sufmax[i] = max(sufmax[i + 1], prices[i]);
        }
        int ans = 0;
        for (int i = 0; i < n - 1; ++i) {
            ans = max(ans, sufmax[i + 1] - prices[i]);
        }
        return ans;
    }
};
```


## [322.零钱兑换](https://leetcode.cn/problems/coin-change/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意


### 题解

完全背包

对于背包问题的至多、至少、恰好容量，求价值的最大最小值，代码都几乎一致，区别在于初始化

参考

[01背包和完全背包，一维二维](https://da1yh.xyz/cp%E7%AC%94%E8%AE%B0/#%E8%83%8C%E5%8C%85%E9%97%AE%E9%A2%98)

[初始化的区别](https://www.acwing.com/blog/content/458/)

👆这个链接的文章总结得非常好，但是不适用于多重背包问题，如果是多重背包还是老老实实开3个循环，其中一个遍历物品的数量。初始化和求法和01背包、多重背包一致

01背包和完全背包的两种目标函数就是求最大最小价值和求方案数

初始化的规律就是体积至多，求价值最大值时，全初始化为0

其他情况都是dp[0][0] = 0，其他初始化成最大或最小值

体积至多，求方案数，就是dp[0][i] = 1，其他全为0

其他都是dp[0][0] = 1，其他全是0

注意：物品的下标为1

注意：在求至少体积时，状态转移方程稍有差别

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        const int MAX = amount + 3;
        vector<int> dp(MAX, MAX);
        dp[0] = 0;
        for (int i = 0; i < n; ++i) {
            for (int j = coins[i]; j <= amount; ++j) {
                dp[j] = min(dp[j], dp[j - coins[i]] + 1);
            }
        }
        return dp[amount] == MAX ? -1 : dp[amount];
    }
};
```


## [438.找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解


```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        unordered_map<char, int> mp, mpp;
        for (char i = 'a'; i <= 'z'; i++) {
            mp[i] = 0;
            mpp[i] = 0;
        }
        vector<int> ans;
        int ns = s.length();
        int np = p.length();
        for (int i = 0; i < np; ++i) {
            mp[s[i]]++;
        }
        for (char i : p) {
            mpp[i]++;
        } 
        int ind = np;
        while (ind <= ns) {
            bool ok = true;
            for (char i = 'a'; i <= 'z'; i++) {
                if (mp[i] != mpp[i]) {
                    ok = false;
                    break;
                }
            }
            if (ok) ans.push_back(ind - np);
            mp[s[ind]]++;
            mp[s[ind - np]]--;
            ind++;
        }
        return ans;
    }
};
```


## [239.滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解


```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;
        int n = nums.size(); 
        vector<int> ans;
        for (int i = 0; i < n; ++i) {
            if (!dq.empty() and dq.front() <= i - k) {
                dq.pop_front();
            }
            while (!dq.empty() and nums[dq.back()] <= nums[i]) {
                dq.pop_back();
            }
            dq.push_back(i);
            if (i >= k - 1) {
                ans.push_back(nums[dq.front()]);
            }
        }
        return ans;
    }
};
```


## [56.合并区间](https://leetcode.cn/problems/merge-intervals/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意


### 题解

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        vector<pair<int, int>> v;
        for (auto& i : intervals) {
            v.emplace_back(i[0], i[1]);
            //cout << i[0] << ' ' << i[1] << '\n';
        }
        sort(v.begin(), v.end());
        vector<pair<int, int>> ans;
        int n = v.size();
        ans.emplace_back(v[0].first, v[0].second);
        for (int i = 1; i < n; i++) {
            auto [l, r] = v[i];
            auto [prel, prer] = ans.back();
            //cout << l << ' ' << r << ' ' << prel << ' ' << prer ;
            if (prer < l) {
                ans.emplace_back(l, r);[添加链接描述](https://leetcode.cn/problems/spiral-matrix/description/?envType=study-plan-v2&envId=top-100-liked)
            } else {
                ans.pop_back();
                ans.emplace_back(min(l, prel), max(r, prer));
            }
        }
        vector<vector<int>> fans;
        for (auto& [i, j] : ans) {
            fans.push_back(vector<int>{i, j});
        }
        return fans;
    }
};
```


## [54.螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意


### 题解

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> ans;
        int dir[][2] = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        int now = 0;
        int x = 0, y = 0;
        int n = matrix.size(), m = matrix[0].size();
        bool step = true;
        while ((int) ans.size() < n * m) {
            if (step) {
                ans.push_back(matrix[x][y]);
                matrix[x][y] = -1000;
            }
            int tx = x + dir[now][0], ty = y + dir[now][1];
            if (tx >= 0 and tx < n and ty >= 0 and ty < m and matrix[tx][ty] != -1000) {
                x = tx; y = ty;
                step = true;
            } else {
                now++;
                now %= 4;
                step = false;
            }
        }
        return ans;
    }
};
```


## [102.二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (root == nullptr) {
            return vector<vector<int>>{};
        }
        queue<pair<TreeNode*, int>> q;
        vector<vector<int>> ans;
        q.emplace(root, 0);
        int now = -1;
        vector<int> tmp;
        bool ok = true;
        while (!q.empty()) {
            auto [node, depth] = q.front(); // 不能写auto& 
            q.pop(); 
            if (depth > now) {
                now = depth;
                if (!ok) ans.push_back(tmp);
                tmp.clear();
                ok = false;
            }
            tmp.push_back(node->val);
            if (node->left != nullptr) {
                q.emplace(node->left, depth + 1);
            }
            if (node->right != nullptr) {
                q.emplace(node->right, depth + 1);
            }
        }
        ans.push_back(tmp);
        return ans;
    }
};
```


## [136.只出现一次的数字](https://leetcode.cn/problems/single-number/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解


异或

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int ans = 0;
        for (int i : nums) {
            ans ^= i;
        }
        return ans;
    }
};
```


## [189.轮转数组](https://leetcode.cn/problems/rotate-array/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        auto reverse = [&](int l, int r) -> void {
            while (l < r) {
                swap(nums[l], nums[r]);
                l++;
                r--;
            }
        };
        reverse(0, n - 1);
        reverse(0, k - 1);
        reverse(k, n - 1);
        return ;
    }
};
```

## [48.旋转图像](https://leetcode.cn/problems/rotate-image/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        int nn = n;
        n--;
        for (int i = 0; i < (nn + 1) / 2; i++) {
            for (int j = 0; j < nn / 2; j++) {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[n - j][i];
                matrix[n - j][i] = matrix[n - i][n - j];
                matrix[n - i][n - j] = matrix[j][n - i];
                matrix[j][n - i] = tmp;
            }
        }
    }
};
```


## [141.环形链表](https://leetcode.cn/problems/linked-list-cycle/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode* slow, *fast;
        slow = fast = head;
        if (head == nullptr) return false;
        while (true) {
            if (slow->next != nullptr) slow = slow->next; else return false;
            if (fast->next != nullptr) fast = fast->next; else return false;
            if (fast->next != nullptr) fast = fast->next; else return false;
            if (slow == fast) return true;
        }
    }
};
```


## [142.环形链表II](https://leetcode.cn/problems/linked-list-cycle-ii/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode* slow, *fast;
        slow = fast = head;
        if (head == nullptr) return nullptr;

        while (true) {
            if (slow->next != nullptr) slow = slow->next; else return nullptr;
            if (fast->next != nullptr) fast = fast->next; else return nullptr;
            if (fast->next != nullptr) fast = fast->next; else return nullptr;
            if (slow == fast) {
                ListNode* ptr = head;
                while (ptr != slow) {
                    ptr = ptr->next;
                    slow = slow->next;
                }
                return ptr;
            }
        }
    }
};
```


## [98.验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

中序遍历是有序的

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        vector<int> v;
        function<void(TreeNode*)> mid = [&](TreeNode* node) {
            if (node == nullptr) return ;
            if (node->left != nullptr) mid(node->left);
            v.push_back(node->val);
            if (node->right != nullptr) mid(node->right);
        };
        mid(root);
        for (int i = 1; i < (int) v.size(); ++i) {
            if (v[i] <= v[i - 1]) return false;
        }
        return true;
    }
};
```

## [78.子集](https://leetcode.cn/problems/subsets/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

```cpp
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> ans;
        for (int i = 0; i < (1 << n); i++) {
            vector<int> tmp;
            for (int j = 0; j < n; ++j) {
                if (i >> j & 1) {
                    tmp.push_back(nums[j]);
                }
            }
            ans.push_back(tmp);
        }
        return ans;
    }
};
```


## [17.电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        int n = digits.size();
        if (n == 0) return vector<string>{};
        unordered_map<char, vector<char>> mp;
        char now = 'a';
        for (char i = '2'; i <= '6'; i++) {
            vector<char> v;
            for (int j = 0; j < 3; ++j) {
                v.push_back(now++);
            }
            mp[i] = v;
        }
        mp['7'] = {'p', 'q', 'r', 's'};
        mp['8'] = {'t', 'u', 'v'};
        mp['9'] = {'w', 'x', 'y', 'z'};
        vector<string> ans;
        function<void(int, string&)> dfs = [&](int pos, string& s) {
            if (pos == n) {
                ans.push_back(s);
                return ;
            }
            for (char i : mp[digits[pos]]) {
                s += i;
                dfs(pos + 1, s);
                s.pop_back();
            }
        };
        string t = "";
        dfs(0, t);
        return ans;
    }
};
```


## [34.在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int n = nums.size();
        bool got = false;
        auto findPos = [&](int val, bool flag) -> int {
            int l = 0, r = n - 1;
            while (l <= r) {
                int mid = (l + r) / 2;
                if (flag) {
                    if (nums[mid] >= target) {
                        r = mid - 1;
                    } else {
                        l = mid + 1;
                    }
                } else {
                    if (nums[mid] > target) {
                        r = mid - 1;
                    } else {
                        l = mid + 1;
                    }
                }
            }
            if (l >= 0 and l < n and nums[l] == target) got = true;
            return l;
        };
        int res1 = findPos(target, true);
        int res2 = findPos(target + 1, false);
        if (!got) return vector<int>{-1, -1};
        return vector<int>{res1, res2 - 1};
    }
};
```


## [41.缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            while (nums[i] > 0 and nums[i] <= n and nums[i] != i + 1 and nums[i] != nums[nums[i] - 1]) {
                swap(nums[i], nums[nums[i] - 1]);
            }
        }
        for (int i = 0; i < n; ++i) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }
};
```


## [19.删除链表的倒数第N个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        if (n == 1 and head->next == nullptr) return nullptr;
        ListNode* nxt = head->next;
        ListNode* ptr1, *ptr2;
        ptr1 = head;
        ptr2 = head;
        n++;
        while (n-- and ptr2 != nullptr) {
            // cout << n << '\n';
            // cout << (n and ptr2 != nullptr) << '\n';
            // cout << '\n';
            ptr2 = ptr2->next;
        }
        if (n >= 0) {
            // cout << n ;
            return nxt;
        }
        while (ptr2 != nullptr) {
            ptr1 = ptr1->next;
            ptr2 = ptr2->next;
        }
        ptr1->next = ptr1->next->next;
        return head;
    }
};
```


## [114.二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

看官方题解3

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode* cur = root;
        while (cur != nullptr) {
            if (cur->left != nullptr) {
                TreeNode* pre = cur->left;
                while (pre->right != nullptr) {
                    pre = pre->right;
                }
                pre->right = cur->right;
                cur->right = cur->left;
                cur->left = nullptr;
            }
            cur = cur->right;
        }
    }
};
```


## [236.二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        unordered_map<int, int> dep;
        unordered_map<int, TreeNode*> par;
        function<void(TreeNode*, int, TreeNode*)> dfs = [&](TreeNode* node, int de, TreeNode* pa) {
            dep[node->val] = de;
            par[node->val] = pa;
            if (node->left != nullptr) {
                dfs(node->left, de + 1, node);
            }
            if (node->right != nullptr) {
                dfs(node->right, de + 1, node);
            }
        };
        dfs(root, 0, nullptr);
        int dif = abs(dep[p->val] - dep[q->val]);
        TreeNode* ll = p, *rr = q;
        if (dep[p->val] > dep[q->val]) {
            while (dif--) {
                ll = par[ll->val];
            }
        } else {
            while (dif--) {
                rr = par[rr->val];
            }
        }
        while (ll != rr) {
            ll = par[ll->val];
            rr = par[rr->val];
        }
        return ll;
    }
};
```


## [22.括号生成](https://leetcode.cn/problems/generate-parentheses/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> ans;
        string tmp = "";
        function<void(int, int, int)> dfs = [&](int pos, int lnum, int rnum) {
            if (pos == n * 2) {
                ans.push_back(tmp);
                return ;
            }
            if (lnum < n) {
                tmp += '(';
                dfs(pos + 1, lnum + 1, rnum);
                tmp.pop_back();
            } 
            if (rnum < lnum) {
                tmp += ')';
                dfs(pos + 1, lnum, rnum + 1);
                tmp.pop_back();
            }
        };
        dfs(0, 0, 0);
        return ans;
    }
};
```


## [33.搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

注意各种特判

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {

        int n = nums.size();
        int l = 0, r = n - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] >= nums[0]) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        int start = l;
        cout << start << '\n';
        if (start == n) {
            l = 0, r = n - 1;
            while (l <= r) {
                int mid = (l + r) / 2;
                if (nums[mid] >= target) {
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }
            cout << l;
            return l < n and nums[l] == target ? l : -1;
        }
        l = 0, r = start - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] >= target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        if (l < start and nums[l] == target) return l;
        l = start, r = n - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] >= target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        if (l < n and nums[l] == target) return l;
        return -1;

    }
};
```


## [739.每日温度](https://leetcode.cn/problems/daily-temperatures/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        vector<int> ans;
        int n = temperatures.size();
        ans.resize(n);
        stack<int> s;
        for (int i = 0; i < n; ++i) {
            while (!s.empty() and temperatures[s.top()] < temperatures[i]) {
                ans[s.top()] = i - s.top();
                s.pop();
            }
            s.push(i);
        }   
        return ans;
    }
};
```


## [55.跳跃游戏](https://leetcode.cn/problems/jump-game/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int reach = 0;
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            if (i > reach) return false;
            reach = max(reach, nums[i] + i);
            //cout << i << ' ' << reach << '\n';
        }
        return true;
    }
};
```


## [45.跳跃游戏II](https://leetcode.cn/problems/jump-game-ii/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
       int n = nums.size();
       if (n == 1) return 0;
       int step = 0;
       int maxreach = 0;
       int end = 0;
       for (int i = 0; i < n; ++i) {
           if (i > end) {
               step++;
               end = maxreach;
           }
           maxreach = max(maxreach, i + nums[i]);
       }
       return step;
    }
};
```


## [139.单词拆分](https://leetcode.cn/problems/word-break/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        for (auto& i : wordDict) {
            reverse(i.begin(), i.end());
        } 
        int n = s.length();
        int nn = wordDict.size();
        vector<bool> dp(n);
        unordered_set<string> us;
        for (auto& i : wordDict) {
            us.insert(move(i));
        }
        for (int i = 0; i < n; ++i) {
            string tmp = "";
            for (int j = i; j >= max(0, i - 22); j--) {
                tmp += s[j];
                if (us.find(tmp) != us.end()) {
                    if (j - 1 >= 0) {
                        dp[i] = dp[i] | dp[j - 1];
                    } else if (j == 0) {
                        dp[i] = true;
                    }
                }
            }
        }
        for (int i = 0; i < n; ++i) {
            cout << i << ' ' << dp[i] << '\n';
        }
        return dp[n - 1];
    }
};
```


## [62.不同路径](https://leetcode.cn/problems/unique-paths/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m, vector<int>(n));
        dp[0][0] = 1;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (i == 0 and j == 0) continue;
                if (i == 0) dp[i][j] += dp[i][j - 1];
                else if (j == 0) dp[i][j] += dp[i - 1][j];
                else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            } 
        }
        return dp[m - 1][n - 1];
    }
};
```


## [64.最小路径和](https://leetcode.cn/problems/minimum-path-sum/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        vector<vector<int>> dp(n, vector<int>(m));
        for (auto& v : dp) {
            fill(v.begin(), v.end(), 1e8);
        }
        dp[0][0] = grid[0][0];
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (i == 0 and j == 0) continue;
                if (i == 0) {
                    dp[i][j] = min(dp[i][j], dp[i][j - 1] + grid[i][j]);
                } else if (j == 0) {
                    dp[i][j] = min(dp[i][j], dp[i - 1][j] + grid[i][j]);
                } else {
                    dp[i][j] = min({dp[i][j], dp[i - 1][j] + grid[i][j], dp[i][j - 1] + grid[i][j]});
                }
            }
        }
        return dp[n - 1][m - 1];;
    }
};
```


## [199.二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        if (root == nullptr) return vector<int>{};
        vector<int> ans;
        vector<vector<int>> tmp;
        queue<pair<TreeNode*, int>> q;
        int d = -1;
        q.emplace(root, 0);
        vector<int> qq;
        while (!q.empty()) {
            auto now = q.front();
            q.pop();
            if (now.second != d) {
                if (!qq.empty()) tmp.push_back(qq);
                d++;
                qq.clear();
            }
            qq.push_back(now.first->val);
            if (now.first->left) q.emplace(now.first->left, now.second + 1);
            if (now.first->right) q.emplace(now.first->right, now.second + 1);
        }
        if (!qq.empty()) tmp.push_back(qq);
        for (auto& i : tmp) {
            ans.push_back(i.back());
        }
        return ans;
    }
};
```


## [437.路径总和III](https://leetcode.cn/problems/path-sum-iii/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解


dfs、dp，dfs(a, b, c)表示以a为根的树，路径和为b的个数，c为true表示路径包含a，false表示路径不包含a

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int pathSum(TreeNode* root, int targetSum) {
        function<int(TreeNode*, long long, bool)> dfs = [&](TreeNode* node, long long target, bool includ) {
            if (node == nullptr) return 0;
            if (includ) {
                long long v = node->val;
                return (target == v ? 1 : 0) + dfs(node->left, target - v, true) + dfs(node->right, target - v, true);
            } else {
                int l = dfs(node->left, target, true) + dfs(node->left, target, false);
                int r = dfs(node->right, target, true) + dfs(node->right, target, false);
                return l + r;
            }
        };
        return dfs(root, targetSum, true) + dfs(root, targetSum, false);
    }
};
```

## [240.搜索二维矩阵II](https://leetcode.cn/problems/search-a-2d-matrix-ii/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int n = matrix.size();
        int m = matrix[0].size();
        int x = 0, y = m - 1;
        while (x < n and y >= 0) {
            if (matrix[x][y] == target) return true;
            if (matrix[x][y] < target) x++;
            else y--;
        }
        return false;
    }
};
```


## [124.二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxPathSum(TreeNode* root) {
        int ans = 0xc0c0c0c0;
        function<int(TreeNode*)> dfs = [&](TreeNode* node) {
            if (node == nullptr) return 0;
            int l = dfs(node->left);
            int r = dfs(node->right);
            ans = max(ans, max(l, r) + node->val);
            ans = max(ans, node->val);
            ans = max(ans, l + r + node->val);
            return max(node->val, max(l, r) + node->val); // 注意这里要max自身节点
        };
        dfs(root);
        return ans;
    }
};
```


## [238.除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

前后缀积

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n, 1);
        int prod = 1;
        for (int i = 0; i < n - 1; ++i) {
            prod *= nums[i];
            ans[i + 1] *= prod;
        }
        prod = 1;
        for (int i = n - 1; i > 0; --i) {
            prod *= nums[i];
            ans[i - 1] *= prod;
        }
        return ans;
    }
};
```

## [994.腐烂的橘子](https://leetcode.cn/problems/rotting-oranges/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        int ans = 0;
        int dir[][2] = {{0, 1}, {0, -1}, {-1, 0}, {1, 0}};
        queue<pair<int, int>> q;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (grid[i][j] == 2) {
                    q.emplace(i * m + j, 0);
                }
            }
        }
        while (!q.empty()) {
            auto now = q.front();
            q.pop();
            ans = max(ans, now.second);
            int x = now.first / m;
            int y = now.first % m;
            for (int i = 0; i < 4; ++i) {
                int tx = x + dir[i][0];
                int ty = y + dir[i][1];
                if (tx >= 0 and tx < n and ty >= 0 and ty < m and grid[tx][ty] == 1) {
                    grid[tx][ty] = 2;
                    q.emplace(tx * m + ty, now.second + 1);
                }
            }
        }
        bool ok = false;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (grid[i][j] == 1) {
                    ok = true;
                    break;
                }
            }
        }
        return ok ? -1 : ans;
    }
};
```


## [39.组合总和](https://leetcode.cn/problems/combination-sum/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        int n = candidates.size();
        set<vector<int>> ans;
        function<void(vector<int>&, int, int)> dfs = [&](vector<int>& v, int pos, int sum) {
            if (sum == target) {
                ans.insert(v);
            }
            if (sum > target) return ;
            if (pos >= n) return ;
            v.push_back(candidates[pos]);
            dfs(v, pos, sum + candidates[pos]);
            dfs(v, pos + 1, sum + candidates[pos]);
            v.pop_back();
            dfs(v, pos + 1, sum); 
        };
        vector<int> tmp;
        dfs(tmp, 0, 0);
        vector<vector<int>> fans(ans.begin(), ans.end());
        return fans;
    }
};
```


## [79.单词搜索](https://leetcode.cn/problems/word-search/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        int n = board.size();
        int m = board[0].size();
        vector<bool> use(n * m + 3);
        int nn = word.length();
        int dir[][2] = {{0, 1}, {0, -1}, {-1, 0}, {1, 0}};
        bool flag = false;
        function<void(int, int, int)> dfs = [&](int x, int y, int pos) {

            if (flag) return ;

            if (pos == nn - 1) {
                flag = true;
                return ;
            }

            use[x * m + y] = true;

            for (int i = 0; i < 4; ++i) {
                int tx = x + dir[i][0];
                int ty = y + dir[i][1];
                if (tx >= 0 and tx < n and ty >= 0 and ty < m and !use[tx * m + ty] and board[tx][ty] == word[pos + 1]) {
                    dfs(tx, ty, pos + 1);
                }
            }
            
            use[x * m + y] = false;

        };
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                // fill(use.begin(), use.end(), 0);
                if (board[i][j] == word[0]) dfs(i, j, 0);
            }
        }
        return flag;
    }
};
```


## [74.搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int n = matrix.size();
        int m = matrix[0].size();
        int x = 0, y = m - 1;
        while (x < n and y >= 0) {
            if (matrix[x][y] == target) return true;
            if (matrix[x][y] > target) y--; else x++;
        }
        return false;
    }
};
```

## [153.寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int n = nums.size();
        int l = 0, r = n - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] >= nums[0]) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        if (l == n) return nums[0];
        return nums[l];
    }
};
```


## [155.最小栈](https://leetcode.cn/problems/min-stack/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class MinStack {
private:
    stack<long long> s, ms;
public:
    MinStack() {
        ms.push(0x3f3f3f3f3f3f3f3f);
    }
    
    void push(int val) {
        s.push(val);
        ms.push(min(ms.top(), (long long) val));
    }
    
    void pop() {
        s.pop();
        ms.pop();
    }
    
    int top() {
        return s.top();
    }
    
    int getMin() {
        return ms.top();
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```


## [394.字符串解码](https://leetcode.cn/problems/decode-string/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    string decodeString(string s) {
        stack<pair<int, int>> st;
        string ans = "";
        int pos = 0;
        for (int i = 0; i < s.length(); ++i) {
            if (isdigit(s[i])) {
                string num;
                while (i < s.length()) {
                    if (isdigit(s[i])) {
                        num += s[i];
                        i++;
                    } else break;
                }
                int foo = stoi(num);
                st.emplace(foo, pos);
            } else if (s[i] == '[') {
                continue;
            } else if (s[i] == ']') {
                auto [x, y] = st.top();
                st.pop();
                string tmp = ans.substr(y);
                for (int j = 0; j < x - 1; ++j) {
                    ans += tmp;
                }
                pos = ans.length();
            } else {
                ans += s[i];
                pos++;
            }
        }
        return ans;
    }
};
```


## [152.乘积最大子数组](https://leetcode.cn/problems/maximum-product-subarray/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size();
        vector<int> mn(n + 3), mx(n + 3);
        int ans = INT_MIN;
        mn[0] = nums[0];
        mx[0] = nums[0];
        for (int i = 1; i < n; ++i) {
            mn[i] = min({nums[i], mn[i - 1] * nums[i], mx[i - 1] * nums[i]});
            mx[i] = max({nums[i], mx[i - 1] * nums[i], mn[i - 1] * nums[i]});
        }
        ans = max(ans, nums[0]);
        for (int i = 1; i < n; ++i) {
            ans = max(ans, mx[i]);
        }
        return ans;
    }
};
```

## [72.编辑距离](https://leetcode.cn/problems/edit-distance/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int n = word1.length();
        int m = word2.length();
        word1.insert(word1.begin(), '#');
        word2.insert(word2.begin(), '#');
        vector<vector<int>> dp(n + 3, vector<int>(m + 3, 100000));
        // 1-indexed
        for (int i = 0; i <= n; ++i) {
            dp[i][0] = i;
        }
        for (int i = 0; i <= m; ++i) {
            dp[0][i] = i;
        }
        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j <= m; ++j) {
                if (word1[i] == word2[j]) {
                    dp[i][j] = min(dp[i][j], dp[i - 1][j - 1]);
                }
                dp[i][j] = min(dp[i][j], dp[i - 1][j] + 1);
                dp[i][j] = min(dp[i][j], dp[i][j - 1] + 1);
                dp[i][j] = min(dp[i][j], dp[i - 1][j - 1] + 1);
            }
        }
        return dp[n][m];
    }
};
```


## [1143.最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.length();
        int m = text2.length();
        text1.insert(text1.begin(), '$');
        text2.insert(text2.begin(), '3');
        vector<vector<int>> dp(n + 3, vector<int>(m + 3));
        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j <= m; ++j) {
                if (text1[i] == text2[j]) {
                    dp[i][j] = max(dp[i][j], dp[i - 1][j - 1] + 1);
                } else {
                    dp[i][j] = max(dp[i][j], max(dp[i - 1][j], dp[i][j - 1]));
                }
            }
        }
        return dp[n][m];
    }
};
```


## [763.划分字母区间](https://leetcode.cn/problems/partition-labels/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    vector<int> partitionLabels(string s) {
        vector<int> ans;
        int n = s.length();
        unordered_map<char, int> mp;
        for (int i = 0; i < n; ++i) {
            mp[s[i]] = i;
        }
        int pos = 0;
        char now = s[0];
        while (true) {
            int end = mp[now];
            int tmp = pos;
            while (true) {
                if (mp[s[tmp]] > end) {
                    end = mp[s[tmp]];
                    tmp++;
                } else if (tmp < end) {
                    tmp++;
                } else break;
            }
            ans.push_back(end - pos + 1);
            pos = end + 1;
            now = s[pos];
            if (pos >= n) break;
        }
        return ans;
    }
};
```



## [131.分割回文传](https://leetcode.cn/problems/palindrome-partitioning/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

预处理s[i][j]是否是回文串，然后dfs，回溯

```cpp
class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> ans;
        int n = s.length();
        vector<vector<bool>> dp(n + 3, vector<bool>(n + 3));
        for (int i = 1; i <= n; ++i) {
            for (int j = 0; j < n - i + 1; ++j) {
                if (i == 1) {
                    dp[j][j] = true;
                } else if (i == 2) {
                    dp[j][j + 1] = (s[j] == s[j + 1]);
                } else {
                    dp[j][j + i - 1] = (s[j] == s[j + i - 1] and dp[j + 1][j + i - 2]);
                }
            }
        }
        vector<string> tmp;
        function<void(int)> dfs = [&](int pos) {
            if (pos == n) {
                ans.emplace_back(tmp);
                return ;
            }
            for (int i = pos; i < n; ++i) {
                if (dp[pos][i]) {
                    tmp.push_back(s.substr(pos, i - pos + 1));
                    dfs(i + 1);
                    tmp.pop_back();
                }
            }
        };
        dfs(0);
        return ans;
    }
};
```


## [416.分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

注意特判边界，注意逻辑

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum & 1) return false;
        sum /= 2;
        int n = nums.size();
        if (n == 1) return false; // !
        vector<vector<bool>> dp(n + 3, vector<bool>(sum + 3));
        if (nums[0] < sum + 3) {    // !
            dp[0][nums[0]] = true;
        }
        for (int i = 1; i < n; ++i) {
            for (int j = 0; j < sum + 3; ++j) {
                dp[i][j] = dp[i][j] or dp[i - 1][j];
                if (j - nums[i] >= 0) {
                    dp[i][j] = dp[i][j] or dp[i - 1][j - nums[i]];
                }
                // cout << i << ' ' << j << ' ' << dp[i][j] << '\n';
            }
        }
        // cout << dp[0][50] << '\n';
        return dp[n - 1][sum];
    }
};
```


## [75.颜色分类](https://leetcode.cn/problems/sort-colors/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意 


### 题解

计数

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int z = 0, o = 0, t = 0;
        int n = nums.size();
        for (int i : nums) {
            if (i == 0) z++; else if (i == 1) o++; else t++;
        }
        for (int i = 0; i < z; ++i) {
            nums[i] = 0;
        }
        for (int i = z; i < z + o; ++i) {
            nums[i] = 1;
        }
        for (int i = z + o; i < n; ++i) {
            nums[i] = 2;
        }
        return ;
    }
};
```


## [31.下一个排列](https://leetcode.cn/problems/next-permutation/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

思维，注意特判

```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        // find the last ordered pair which is nums[pos] and nums[pos + 1]
        int pos = -1;
        for (int i = n - 2; i >= 0; --i) {
            if (nums[i] < nums[i + 1]) {
                pos = i;
                break;
            }
        }
        if (pos == -1) {    // corner case
            reverse(nums.begin(), nums.end());
            return ;
        }
        // find the last number greater than nums[pos], then swap
        for (int i = n - 1; i > pos; --i) {
            if (nums[i] > nums[pos]) {
                swap(nums[i], nums[pos]);
                break;
            }
        }
        // make the sequence after pos ordered
        reverse(nums.begin() + pos + 1, nums.end());
    }
};
```


## [287.寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

思维

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = 0, fast = 0;
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        slow = 0;
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
};
```


## [51.N皇后](https://leetcode.cn/problems/n-queens/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

一次dfs是处理一行，遍历这行所有的列，判断是否可以落子

用三个集合存储当前哪些列，哪些正对角线，哪些反对角线有棋子

```cpp
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> ans;
        unordered_set<int> col, diag1, diag2;
        vector<int> queen(n, -1);
        auto genBoard = [&]() -> vector<string> {
            vector<string> ret;
            for (int i = 0; i < n; ++i) {
                string tmp = string(n, '.');
                tmp[queen[i]] = 'Q';
                ret.push_back(tmp);
            }
            return ret;
        };
        function<void(int)> dfs = [&](int row) {
            if (row == n) {
                auto board = genBoard();
                ans.push_back(board);
                return ;
            }
            for (int c = 0; c < n; ++c) {
                if (col.find(c) != col.end()) continue;
                if (diag1.find(row - c) != diag1.end()) continue;
                if (diag2.find(row + c) != diag2.end()) continue;
                queen[row] = c;
                col.insert(c);
                diag1.insert(row - c);
                diag2.insert(row + c);
                dfs(row + 1);
                // backtrace
                queen[row] = -c;
                col.erase(c);
                diag1.erase(row - c);
                diag2.erase(row + c);
            }
        };
        dfs(0);
        return ans;
    }
};
```


## [4.寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

比较巧妙的二分

细节非常多，很容易写bug，调了半天

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int nm = nums1.size() + nums2.size();
        // findk表示从v1的pos1开始，从v2的pos2开始，找这两者中第k大的数
        function<int(vector<int>&, int, vector<int>&, int, int)> findk = [&](vector<int>& v1, int pos1, vector<int>& v2, int pos2, int k) {
            if (v1.size() - pos1 > v2.size() - pos2) {  // 这句话写在函数的最前面
                return findk(v2, pos2, v1, pos1, k);    // 始终保持v1长度不大于v2
            }
            if (pos1 == v1.size()) {    // 由于v1的长度不大于v2，如果v1已经搜到头了，直接返回v2的第k个元素
                return v2[pos2 + k - 1];
            }
            if (k == 1) return min(v1[pos1], v2[pos2]); // 当k=1时，没法分给两个数组
            int num = min(k / 2, (int) v1.size() - pos1);   // v1取第num个，v2取第k - num个
            if (v1[pos1 + num - 1] < v2[pos2 + k - num - 1]) {  // 如果v1[num] < v2[k - num]那就说明第k个数不可能在v1的前num个，所以排除
                return findk(v1, pos1 + num, v2, pos2, k - num);
            } else {
                return findk(v1, pos1, v2, pos2 + k - num, num);
            }
        };
        if (nm % 2 == 0) {
            int l = findk(nums1, 0, nums2, 0, nm / 2);
            int r = findk(nums1, 0, nums2, 0, nm / 2 + 1);
            return (l + r) / 2.0;
        } else {
            return findk(nums1, 0, nums2, 0, nm / 2 + 1);
        }
    }
};
```


## [84.柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        heights.push_back(0); // -1 is also ok
        stack<int> s;
        s.push(-1);
        int ans = 0;
        for (int i = 0; i < heights.size(); ++i) {
            while (s.size() > 1 and heights[s.top()] > heights[i]) {
                auto tmp = s.top();
                s.pop();
                ans = max(ans, (i - s.top() - 1) * heights[tmp]);
            }
            s.push(i);
        }
        return ans;
    }
};
```

## [32.最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

```cpp
class Solution {
public:
    int longestValidParentheses(string s) {
        int left = 0, right = 0;
        int ans = 0;
        for (char i : s) {
            if (i == '(') left++; else right++;
            if (left == right) ans = max(ans, left * 2);
            if (right > left) left = right = 0;
        }
        reverse(s.begin(), s.end());
        left = right = 0;
        for (char i : s) {
            if (i == ')') left++; else right++;
            if (left == right) ans = max(ans, left * 2);
            if (right > left) left = right = 0;
        }
        return ans;
    }
};
```



## [118.杨辉三角](https://leetcode.cn/problems/pascals-triangle/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> ans;
        ans.push_back(vector<int>{1});
        while ((int) ans.size() < numRows) {
            auto tmp = ans.back();
            vector<int> v;
            v.push_back(1);
            for (int i = 0; i < (int) tmp.size() - 1; i++) {
                v.push_back(tmp[i] + tmp[i + 1]);
            }
            v.push_back(1);
            ans.push_back(v);
        }
        return ans;
    }
};
```


## [70.爬楼梯](https://leetcode.cn/problems/climbing-stairs/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int climbStairs(int n) {
        int p, q, r;
        p = q = r = 1;
        for (int i = 2; i <= n; ++i) {
            p = q + r;
            r = q;
            q = p;
        }
        return p;
    }
};
```


```cpp
class Solution {
public:
    using mat = vector<vector<long long>>;
    mat matmul(mat& A, mat& B) {
        mat C = mat(A.size(), vector<long long>(B[0].size()));
        for (int i = 0; i < A.size(); ++i) {
            for (int k = 0; k < B.size(); ++k) {
                for (int j = 0; j < B[0].size(); ++j) {
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return C;
    }
    mat quickPow(mat& A, int n) {
        mat ret = A;
        for (int i = 0; i < A.size(); ++i) {
            for (int j = 0; j < A[0].size(); ++j) {
                ret[i][j] = 1;
            }
        }
        while (n > 0) {
            if (n & 1) {
                ret = matmul(ret, A);
            }
            A = matmul(A, A);
            n >>= 1;
        }
        return ret;
    }
    int climbStairs(int n) {
        if (n == 1) return 1; 
        mat core = {{1, 1}, {1, 0}};
        mat ans = quickPow(core, n - 2);
        return ans[1][0] + ans[1][1];
    }
};
```


## [108.将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        function<TreeNode*(int, int)> build = [&](int l, int r) -> TreeNode* {	// 要加-> TreeNode*
            if (l > r) return nullptr;
            int mid = (l + r) / 2;
            TreeNode* node = new TreeNode(nums[mid]);
            node->left = build(l, mid - 1);
            node->right = build(mid + 1, r);
            return node;
        };
        return build(0, (int) nums.size() - 1);
    }
};
```


## [543.二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        int ans = 0;   
        function<int(TreeNode*)> dfs = [&](TreeNode* node) {    // 从node出发向下的最大深度
            int l = -1, r = -1;
            if (node->left != nullptr) {
                l = dfs(node->left);
            }
            if (node->right != nullptr) {
                r = dfs(node->right);
            }
            ans = max(ans, l + r + 2);
            return max(l, r) + 1;
        };
        dfs(root);
        return ans;
    }
};
```


## [101.对称二叉树](https://leetcode.cn/problems/symmetric-tree/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

递归

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        function<bool(TreeNode*, TreeNode*)> same = [&](TreeNode* node1, TreeNode* node2) {
            if (node1 != nullptr and node2 != nullptr) {
                return (node1->val == node2->val) && same(node1->left, node2->right) && same(node1->right, node2->left);
            } else if (node1 == nullptr and node2 == nullptr) return true;
            return false;
        };
        return same(root->left, root->right);
    }
};
```

迭代


```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        queue<pair<TreeNode*, TreeNode*>> q;
        q.emplace(root->left, root->right);
        while (!q.empty()) {
            auto [l, r] = q.front();
            q.pop();
            if (l == nullptr and r == nullptr) continue;
            if (l != nullptr and r != nullptr) {
                if (l->val != r->val) return false;
                q.emplace(l->left, r->right);
                q.emplace(l->right, r->left);
            } else {
                return false;
            }
        }
        return true;
    }
};
```


## [226.翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) return nullptr;
        auto l = invertTree(root->right);
        auto r = invertTree(root->left);
        root->left = l;
        root->right = r;
        return root;
    }
};
```


## [104.二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

dfs

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (root == nullptr) return 0;
        return max(maxDepth(root->left), maxDepth(root->right)) + 1;
    }
};
```


bfs

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (root == nullptr) return 0;
        queue<pair<TreeNode*, int>> q;
        q.emplace(root, 0);
        int ans = 0;
        while (!q.empty()) {
            auto tmp = q.front();
            q.pop();
            ans = max(ans, tmp.second);
            if (tmp.first->left != nullptr) q.emplace(tmp.first->left, tmp.second + 1);
            if (tmp.first->right != nullptr) q.emplace(tmp.first->right, tmp.second + 1);
        }
        return ans + 1;
    }
};
```


## [206.反转链表](https://leetcode.cn/problems/reverse-linked-list/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

迭代

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* l, *mid, *r;
        l = nullptr, mid = head;
        while (mid) {
            r = mid->next;
            mid->next = l;
            l = mid;
            mid = r;
        }
        return l;
    }
};
```

递归（很抽象）

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (head == nullptr or head->next == nullptr) {
            return head;
        }
        ListNode* newHead = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;
        return newHead;
    }
};
```

## [234.回文链表](https://leetcode.cn/problems/palindrome-linked-list/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        if (head->next == nullptr) return true; // corner case, size = 1, cannot separate
        if (head->next->next == nullptr) return head->val == head->next->val; // corner case, size = 2, cannot seperate
        ListNode* slow, *fast;
        slow = fast = head;
        bool odd;
        while (true) {
            slow = slow->next;  // notice the order
            if (!fast->next) {
                odd = true;
                break;
            }
            if (!fast->next->next) {
                odd = false;
                break;
            }
            fast = fast->next->next;
        }
        ListNode* r = slow, *l = head;
        while (odd ? l->next->next != r : l->next != r) {
            l = l->next;
        }
        l->next = nullptr;
        // reverse
        ListNode* prev, *mid, *post;
        prev = nullptr, mid = head;
        while (mid) {
            post = mid->next;
            mid->next = prev;
            prev = mid;
            mid = post;
        }
        while (l != nullptr) {
            if (l->val != r->val) return false;
            l = l->next;
            r = r->next;
        }
        return true;
    }
};
```


## [11.盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/description/?envType=study-plan-v2&envId=top-100-liked)


### 题意

### 题解

双指针

```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int n = height.size();
        int l = 0, r = n - 1;
        int ans = 0;
        while (l < r) {
            ans = max(ans, min(height[l], height[r]) * (r - l));
            if (height[l] < height[r]) {
                l++;
            } else {
                r--;
            }
        }
        return ans;
    }
};
```


## [15.三数之和](https://leetcode.cn/problems/3sum/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        unordered_map<int, int> mp;
        for (int i : nums) {
            mp[i]++;
        }
        nums.erase(unique(nums.begin(), nums.end()), nums.end());
        vector<vector<int>> ans;
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                mp[nums[i]]--;
                mp[nums[j]]--;
                int now = -nums[i] - nums[j];
                if (now > nums[j] and mp.find(now) != mp.end() and mp[now] > 0) {
                    ans.push_back({nums[i], nums[j], now});
                }
                mp[nums[i]]++;
                mp[nums[j]]++;
            }
        }
        for (int i = 0; i < n; ++i) {
            if (mp[nums[i]] > 1) {
                mp[nums[i]] -= 2;
                int now = -nums[i] - nums[i];
                if (mp.find(now) != mp.end() and mp[now] > 0) {
                    ans.push_back({nums[i], nums[i], now});
                }
                mp[nums[i]] += 2;
            }
        }
        return ans;
    }
};
```


## [42.接雨水](https://leetcode.cn/problems/trapping-rain-water/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

双指针，前后缀

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        int l = 0, r = n - 1;
        int ans = 0;
        int premax = 0, sufmax = 0;
        while (l < r) { // l <= r is also ok, l and r will meet in the highest block which volume is 0
            premax = max(premax, height[l]);
            sufmax = max(sufmax, height[r]);
            if (premax < sufmax) {
                ans += premax - height[l];
                l++;
            } else {
                ans += sufmax - height[r];
                r--;
            }
        }
        return ans;
    }
};
```


## [76.最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

滑动窗口

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        int n = s.length();
        unordered_map<char, int> mp, mpp;
        for (char i : t) {
            mp[i]++;
        }
        int l = 0, r = 0;
        mpp[s[0]] = 1;
        int ans = 0x3f3f3f3f;
        int pos = -1;
        while (l <= r) {
            bool ok = true;
            for (auto& [x, y] : mp) {
                if (mpp.find(x) != mpp.end() and mpp[x] >= y) ;
                else {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                if (r - l + 1 < ans) {
                    ans = r - l + 1;
                    pos = l;
                }
                mpp[s[l]]--;
                l++;
            } else if (r == n) {
                mpp[s[l]]--;
                l++;
            } else {
                r++;
                if (r < n) mpp[s[r]]++;
            }
        }
        return pos == -1 ? "" : s.substr(pos, ans);
    }
};
```


## [21.合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode* dummy = new ListNode;
        ListNode* prev = dummy;
        ListNode* ptr1 = list1, *ptr2 = list2;
        while (ptr1 and ptr2) {
            if (ptr1->val <= ptr2->val) {
                prev->next = ptr1;
                prev = ptr1;
                ptr1 = ptr1->next;
            } else {
                prev->next = ptr2;
                prev = ptr2;
                ptr2 = ptr2->next;
            }
        }
        prev->next = (ptr1 ? ptr1 : ptr2);
        return dummy->next;
    }
};
```


## [2.两数相加](https://leetcode.cn/problems/add-two-numbers/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* ptr1 = l1, *ptr2 = l2;
        bool carry = false;
        ListNode* dummy = new ListNode;
        ListNode* ptr = dummy;
        while (ptr1 and ptr2) {
            int v = ptr1->val + ptr2->val + carry;
            if (v > 9) {
                carry = true;
                v -= 10;
            } else carry = false;
            ptr->next = new ListNode(v);
            ptr = ptr->next;
            ptr1 = ptr1->next;
            ptr2 = ptr2->next;
        }
        while (ptr1) {
            int v = ptr1->val + carry;
            if (v > 9) {
                carry = true;
                v -= 10;
            } else carry = false;
            ptr->next = new ListNode(v);
            ptr = ptr->next;
            ptr1 = ptr1->next;
        }
        while (ptr2) {
            int v = ptr2->val + carry;
            if (v > 9) {
                carry = true;
                v -= 10;
            } else carry = false;
            ptr->next = new ListNode(v);
            ptr = ptr->next;
            ptr2 = ptr2->next;
        }
        if (carry) {
            ptr->next = new ListNode(1);
        }
        return dummy->next;
    }
};
```


## [24.两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

递归

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if (!head or !head->next) return head;
        ListNode* newHead = head->next;
        head->next = swapPairs(newHead->next);
        newHead->next = head;
        return newHead;
    }
};
```


迭代，题解参看官方题解的图解

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        ListNode* dummy = new ListNode;
        dummy->next = head;
        ListNode* ptr1 = dummy;
        ListNode* ptr2, *ptr3;
        while (ptr1->next and ptr1->next->next) {
            ptr2 = ptr1->next;
            ptr3 = ptr2->next;
            ptr1->next = ptr3;
            ptr2->next = ptr3->next;
            ptr3->next = ptr2;
            ptr1 = ptr2;
        }
        auto ans = dummy->next;
        delete dummy;
        return ans;
    }
};
```

## [138.随机链表的复制](https://leetcode.cn/problems/copy-list-with-random-pointer/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;
    
    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};
*/

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;  // !!
        Node* ptr = head;
        // A->A'->B->B'->C->C'
        while (ptr) {
            Node* tmp = new Node(ptr->val);
            tmp->next = ptr->next;
            ptr->next = tmp;
            ptr = ptr->next->next;
        }
        // make random pointer of new list correct
        ptr = head;
        while (ptr) {
            if (ptr->random) ptr->next->random = ptr->random->next; // !!
            ptr = ptr->next->next;
        }
        auto ans = head->next;
        // set both next pointer back
        ptr = head;
        while (ptr) {
            auto nxt = ptr->next;
            if (ptr->next) ptr->next = ptr->next->next; // !!
            ptr = nxt;
        }
        return ans;
    }
};
```


## [23.合并K个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

时间复杂度O(knlogk)

空间复杂度O(k)

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    struct cmp {
        bool operator() (const ListNode* node1, const ListNode* node2) const {  // don't use &
            return node1->val > node2->val;
        }
    };
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, cmp> pq;   // vector<ListNode*>
        ListNode* ans = new ListNode(0);
        ListNode* ptr = ans;
        for (ListNode* i : lists) {
            if (i) pq.emplace(i);
        } 
        while (!pq.empty()) {
            auto tmp = pq.top();
            pq.pop();
            ptr->next = tmp;
            if (tmp->next) pq.emplace(tmp->next);
            ptr = ptr->next;
        }
        return ans->next;
    }
};
```


## [146.LRU缓存](https://leetcode.cn/problems/lru-cache/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

哈希表+双向链表

```cpp
class LRUCache {
private:
    struct DListNode {
        int key, val;
        DListNode* prev, *next;
        DListNode() : key(0), val(0), prev(nullptr), next(nullptr) {};
        DListNode(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };
    DListNode* head, *tail;
    unordered_map<int, DListNode*> mp;
    size_t sz, cap;

    void disconnect(DListNode* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void insertHead(DListNode* node) {
        node->next = head->next;
        head->next->prev = node;
        head->next = node;
        node->prev = head;
    }

    void evictNode() {
        DListNode* node = tail->prev;
        node->prev->next = node->next;
        node->next->prev = node->prev;
        mp.erase(node->key); // !
        delete node;
    }
 
public:
    LRUCache(int capacity) : sz(0), cap(capacity) {
        head = new DListNode();
        tail = new DListNode();
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int key) {
        if (mp.find(key) != mp.end()) {
            auto node = mp[key];
            disconnect(node);
            insertHead(node);
            return node->val;
        } else return -1;
    }
    
    void put(int key, int value) {
        if (mp.find(key) != mp.end()) {
            auto node = mp[key];
            node->val = value;
            disconnect(node);
            insertHead(node);
        } else {
            DListNode* node = new DListNode(key, value);
            mp[key] = node;
            insertHead(node);
            sz++;
            if (sz > cap) {
                sz--;
                evictNode();
            }
        }
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```


## [230.二叉搜索树中第K小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        unordered_map<TreeNode*, int> mp;
        function<int(TreeNode*)> dfs = [&](TreeNode* node) {
            if (node == nullptr) return 0;
            int ret = 1 + dfs(node->left) + dfs(node->right);
            mp[node] = ret;
            return ret;
        };
        dfs(root);
        function<int(TreeNode*, int)> find = [&](TreeNode* node, int foo) {
            int l = 0, r = 0;
            if (node->left) l = mp[node->left];
            if (node->right) r = mp[node->right];
            if (foo <= l) {
                return find(node->left, foo);
            } else if (l + 1 == foo) {
                return node->val;
            } else {
                return find(node->right, foo - l - 1);
            }
        };
        return find(root, k);
    }
};
```


## [105.从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

递归

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
private:
    unordered_map<int, int> mp;
public:
    TreeNode* sol(vector<int>& pre, vector<int>& in, int prel, int prer, int inl, int inr) {
        if (prel > prer) return nullptr;
        int rt = pre[prel];
        TreeNode* node = new TreeNode(rt);
        int leftSize = mp[rt] - inl;
        node->left = sol(pre, in, prel + 1, prel + leftSize, inl, inl + leftSize - 1);
        node->right = sol(pre, in, prel + leftSize + 1, prer, inl + leftSize + 1, inr);
        return node;
        
    }
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        int n = preorder.size();
        for (int i = 0; i < n; ++i) {
            mp[inorder[i]] = i;
        }
        return sol(preorder, inorder, 0, n - 1, 0, n - 1);
    }
};
```

迭代

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    struct info {
        TreeNode* node;
        int prel, prer, inl, inr;
    };
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        int n = preorder.size();
        stack<info> s;
        unordered_map<int, int> mp;
        for (int i = 0; i < n; ++i) {
            mp[inorder[i]] = i;
        }
        TreeNode* ans = new TreeNode(preorder[0]);
        if (n == 1) return ans;
        s.emplace(ans, 0, n - 1, 0, n - 1);
        while (!s.empty()) {
            auto now = s.top();
            s.pop();
            auto node = now.node;
            int prel = now.prel, prer = now.prer, inl = now.inl, inr = now.inr;
            // if (prel > prer) {
            //     // node->left = nullptr;
            //     // node->right = nullptr;
            //     continue;
            // }
            int rt = node->val;
            int leftsize = mp[rt] - inl;
            cout << prel;
            if (1 <= leftsize) {
                TreeNode* lnode = new TreeNode(preorder[prel + 1]);
                node->left = lnode;
                s.emplace(lnode, prel + 1, prel + leftsize, inl, inl + leftsize - 1);
            }
            if (prel + leftsize + 1 <= prer) {
                TreeNode* rnode = new TreeNode(preorder[prel + leftsize + 1]);
                node->right = rnode;
                s.emplace(rnode, prel + leftsize + 1, prer, inl + leftsize + 1, inr);
            }
        }
        return ans;
    }
};
```


## [279.完全平方数](https://leetcode.cn/problems/perfect-squares/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int numSquares(int n) {
        auto isPerfectSquare = [&](int x) -> bool {
            int y = sqrt(x);
            return y * y == x;
        };
        if (isPerfectSquare(n)) {
            return 1;
        }
        for (int i = 1; i * i < n; ++i) {
            if (isPerfectSquare(n - i * i)) return 2;
        }
        // 4 ^ k * (8 * m + 7)
        while (n % 4 == 0) {
            n /= 4;
        }
        if (n % 8 == 7) return 4;
        return 3;
    }
};
```


## [198.打家劫舍](https://leetcode.cn/problems/house-robber/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        if (n == 2) return max(nums[0], nums[1]);
        int foo = nums[0];
        int bar = max(nums[0], nums[1]);
        int hoge;
        for (int i = 2; i < n; ++i) {
            hoge = max(foo + nums[i], bar);
            foo = bar;
            bar = hoge;
        }
        return hoge;
    }
};
```


## [207.课程表](https://leetcode.cn/problems/course-schedule/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> G(numCourses);
        vector<int> indegree(numCourses);
        for (auto& i : prerequisites) {
            G[i[1]].push_back(i[0]);
            indegree[i[0]]++;
        }
        int ans = 0;
        stack<int> s;
        for (int i = 0; i < numCourses; ++i) {
            if (indegree[i] == 0) {
                s.push(i);
            }
        }
        while (!s.empty()) {
            auto tmp = s.top();
            s.pop();
            ans++;
            for (int i : G[tmp]) {
                if (--indegree[i] == 0) {
                    s.push(i);
                }
            }
        }
        return ans == numCourses;
    }
};
```


## [169.多数元素](https://leetcode.cn/problems/majority-element/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = -1;
        int count = 0;
        for (int i : nums) {
            if (candidate == i) {
                count++;
            } else if (count == 0) {
                candidate = i;
                count = 1;
            } else {
                count--;
            }
        }
        return candidate;
    }
};
```


## [208.实现Trie（前缀树）](https://leetcode.cn/problems/implement-trie-prefix-tree/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Trie {
public:
    
    Trie() {
        memset(nx, 0, sizeof(nx));
        memset(exist, 0, sizeof(exist));
    }
    
    void insert(string word) {
        int p = 0;
        for (char i : word) {
            int num = i - 'a';
            cout << p << ' ';
            if (!nx[p][num]) nx[p][num] = ++cnt;
            p = nx[p][num];
        }
        exist[p] = true;
    }
    
    bool search(string word) {
        int p = 0;
        for (char i : word) {
            int num = i - 'a';
            if (!nx[p][num]) return false;
            p = nx[p][num];
        }
        return exist[p];
    }
    
    bool startsWith(string prefix) {
        int p = 0;
        for (char i : prefix) {
            int num = i - 'a';
            if (!nx[p][num]) return false;
            p = nx[p][num];
        }
        return p != 0;
    }
private:
    int nx[2005 * 26][26];
    int cnt = 0;
    bool exist[2005 * 26];
};

/**
 * Your Trie object will be instantiated and called as such:
 * Trie* obj = new Trie();
 * obj->insert(word);
 * bool param_2 = obj->search(word);
 * bool param_3 = obj->startsWith(prefix);
 */
```


## [347.前K个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> mp;
        for (int i : nums) {
            mp[i]++;
        }
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        for (auto& [x, y] : mp) {
            if ((int) pq.size() < k) {
                pq.emplace(y, x);
            } else {
                if (y > pq.top().first) {
                    pq.pop();
                    pq.emplace(y, x);
                }
            }
        }
        vector<int> ans;
        while (!pq.empty()) {
            ans.emplace_back(pq.top().second);
            pq.pop();
        }
        return ans;
    }
};
```


## [295.数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class MedianFinder {
public:
    /** initialize your data structure here. */


    priority_queue<int> big;
    priority_queue<int, vector<int>, greater<>> small;

    MedianFinder() {

    }
    
    void addNum(int num) {
        if (big.empty()) big.push(num);
        //else if (small.empty()) small.push(num);
        else if (num > big.top()) small.push(num);
        else big.push(num);
        if ((int) big.size() > (int) small.size() + 1) {
            small.push(big.top());
            big.pop();
        }
        if ((int) small.size() > (int) big.size() + 1) {
            big.push(small.top());
            small.pop();
        }
    }
    
    double findMedian() {
        if (big.empty() and small.empty()) return 0;
        if ((int) big.size() > (int) small.size()) return big.top();
        if ((int) small.size() > (int) big.size()) return small.top();
        return (big.top() + small.top()) / 2.0;
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder* obj = new MedianFinder();
 * obj->addNum(num);
 * double param_2 = obj->findMedian();
 */
```


## [5.最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/description/?envType=study-plan-v2&envId=top-100-liked)

### 题意

### 题解

```cpp
class Solution {
public:
    bool dp[1005][1005];
    string longestPalindrome(string s) {
        int n = s.length();
        for (int i = 1; i <= n; ++i) {
            for (int j = 0; j <= n - i; ++j) {
                if (i == 1) {
                    dp[j][j] = true;
                } else if (i == 2) {
                    if (s[j] == s[j + 1]) {
                        dp[j][j + 1] = true;
                    }
                } else {
                    if (s[j] == s[j + i - 1]) {
                        dp[j][j + i - 1] = dp[j + 1][j + i - 2];
                    }
                }
            }
        }
        int ans = 0;
        int l, r;
        for (int i = 0; i < n; ++i) {
            for (int j = i; j < n; ++j) {
                if (dp[i][j]) {
                    if (j - i > r - l) {
                        l = i, r = j;
                        ans = r - l + 1;
                    }
                }
            }
        }
        return s.substr(l, r - l + 1);
    }
};
```

