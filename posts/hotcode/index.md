# hotcode



## [912. 排序数组](https://leetcode.cn/problems/sort-an-array/description/)

### 题意

### 题解

改进版快排，针对数据重复问题，荷兰国旗问题
如果数据是有序的，直接随机洗牌就行

```go
func sortArray(nums []int) []int {
	n := len(nums)
	var quickSort func([]int, int, int)
	quickSort = func(nums []int, l int, r int) {
		if l >= r {
			return
		}
		pivot := nums[l + rand.Intn(r-l+1)]
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

## [103. 二叉树的锯齿形层序遍历](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/description/)

### 题意

### 题解

和层序遍历差不多

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
 type pair struct {
	node  *TreeNode
	level int
}
func zigzagLevelOrder(root *TreeNode) [][]int {
	ans := make([][]int, 0)
	if root == nil {
		return ans
	}
	queue := make([]pair, 0)
	queue = append(queue, pair{root, 0})
	mx := -1
	arr := make([]int, 0)
	for len(queue) > 0 {
		now := queue[0]
		queue = queue[1:]
		if now.level > mx {
			if mx != -1 {
                ans = append(ans, arr)
            }
			mx = now.level
			arr = make([]int, 0)
		}
		arr = append(arr, now.node.Val)
		if now.node.Left != nil {
			queue = append(queue, pair{now.node.Left, now.level + 1})
		}
		if now.node.Right != nil {
			queue = append(queue, pair{now.node.Right, now.level + 1})
		}
	}
    ans = append(ans, arr)
	reverse := func(arr []int) {
		for i, j := 0, len(arr)-1; i < j; i, j = i+1, j-1 {
			arr[i], arr[j] = arr[j], arr[i]
		}
	}
	for i := 0; i < len(ans); i++ {
		if i%2 == 1 {
			reverse(ans[i])
		}
	}
	return ans
}
```


## [92. 反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii/description/)

### 题意

### 题解

k个一组反转链表的其中一步

```go
func reverseBetween(head *ListNode, left int, right int) *ListNode {
	if head == nil {
		return head
	}
	dummy := &ListNode{}
	dummy.Next = head
	gap := right - left
	if gap == 0 {
		return head
	}
	ptr := dummy
	left--
	for left > 0 {
		ptr = ptr.Next
		left--
	}
	A, B := ptr, ptr.Next
    fmt.Println(A.Val)
	L, M, R := ptr, ptr.Next, ptr.Next.Next
	for gap >= 0 {
        gap--
		M.Next = L
		if gap >= 0 {
            L, M, R = M, R, R.Next
        } 
	}
	C, D := M, R
	A.Next = C
	B.Next = D
	return dummy.Next
}
```

## [23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/description/)

### 题意

### 题解

把节点加到优先队列来

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


## [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/description/)

### 题意

### 题解

二分

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

## [415.字符串相加](https://leetcode.cn/problems/add-strings/description/)

### 题意

### 题解

模拟

```python
class Solution:
    def addStrings(self, num1: str, num2: str) -> str:
        num1 = num1[::-1]
        num2 = num2[::-1]
        n1, n2 = len(num1), len(num2)
        n = max(n1, n2)
        while n1 < n:
            num1 += '0'
            n1 += 1
        while n2 < n:
            num2 += '0'
            n2 += 1
        ans = ''
        c = False
        for i in range(n):
            x = int(num1[i]) + int(num2[i])
            if c:   x += 1
            if x > 9:
                c = True
                x %= 10
            else:   c = False
            ans += str(x)
        if c:   ans += '1'
        ans = ans[::-1]
        return ans
```

## [143.重排链表](https://leetcode.cn/problems/reorder-list/description/)

### 题意

### 题解


## [93. 复原 IP 地址](https://leetcode.cn/problems/restore-ip-addresses/description/)

### 题意

### 题解

dfs(pos, cnt)表示当前从pos开始遍历，已经有了cnt个数字，把确定的数存到vector\<int>中，dfs推出条件是cnt == 4，0要单独特判


```cpp
class Solution {
public:
    vector<string> restoreIpAddresses(string s) {
        vector<string> ans;
        const int CNT = 4;
        vector<int> num;
        int n = s.length();

        auto did = [&](vector<int>& num) -> string {
            string ans;
            for (int i : num) {
                ans += to_string(i);
                ans += '.';
            }
            ans.pop_back();
            return ans;
        };

        auto ok = [&](string str) -> bool {
            for (char i : str) {
                if (!isdigit(i)) return false;
            }
            int a = stoi(str);
            return a >= 0 and a <= 0xff;
        };

        function<void(int, int)> dfs = [&](int pos, int cnt) {
            if (cnt == CNT) {
                if (pos == n) {
                    ans.push_back(did(num));
                } 
                return ;
            }
            if (s[pos] == '0') {
                num.push_back(0);
                dfs(pos + 1, cnt + 1);
                num.pop_back();
                return ;
            }
            string tmp;
            for (int i = pos; i < min(pos + 3, n); ++i) {
                tmp += s[i];
                if (ok(tmp)) {
                    num.push_back(stoi(tmp));
                    dfs(i + 1, cnt + 1);
                    num.pop_back();
                }
            }
        };
        dfs(0, 0);
        return ans;
    }   
};
```


## [82.删除排序链表中的重复元素II](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/description/)

### 题意

### 题解

用dup变量来控制是否重复

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func deleteDuplicates(head *ListNode) *ListNode {
    if head == nil {
        return head
    }
	dummy := &ListNode{}
	dummy.Next = head
	stubborn, agile := dummy, dummy.Next
	dup := false
	for {
		if agile.Next == nil {
			if dup {
				stubborn.Next = nil
			} else {
				stubborn.Next = agile
			}
			return dummy.Next
		}
		if agile.Val == agile.Next.Val {
			dup = true
		} else {
			if dup {
				dup = false
			} else {
				stubborn.Next = agile
				stubborn = agile
			}
		}
		agile = agile.Next
	}
}
```

## [148.排序链表](https://leetcode.cn/problems/sort-list/description/)

### 题意

### 题解

归并排序，用快慢指针找中间节点，用sortList(head, tail)表示排序的区间，不包含tail，当只有一个节点时推出递归

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
    ListNode* sortList(ListNode* head) {
        if (head == nullptr) return head;
        return sortList(head, nullptr);
    }
    ListNode* sortList(ListNode* head, ListNode* tail) { // 不包含tail
        if (head->next == tail) {   // 如果只有一个结点
            head->next = nullptr;
            return head;
        }
        ListNode* slow = head, *fast = head;
        while (true) {
            if (slow->next == tail) break;
            slow = slow->next;
            if (fast->next == tail) break;
            fast = fast->next;
            if (fast->next == tail) break;
            fast = fast->next;
        }
        auto mid = slow;
        auto lpart = sortList(head, mid);
        auto rpart = sortList(mid, tail);
        return _merge(lpart, rpart);
    }
    ListNode* _merge(ListNode* lpart, ListNode* rpart) {
        ListNode* dummy = new ListNode();
        auto ptrl = lpart;
        auto ptrr = rpart;
        auto ptr = dummy;
        while (ptrl != nullptr or ptrr != nullptr) {
            if (ptrl == nullptr) {
                ptr->next = ptrr;
                ptrr = ptrr->next;
            } else if (ptrr == nullptr) {
                ptr->next = ptrl;
                ptrl = ptrl->next;
            } else if (ptrl->val < ptrr->val) {
                ptr->next = ptrl;
                ptrl = ptrl->next;
            } else {
                ptr->next = ptrr;
                ptrr = ptrr->next;
            }
            ptr = ptr->next;
        }
        return dummy->next;
    }
};
```

## [232.用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)

### 题意

### 题解

双栈实现队列，当要求队头时，把一个栈的数据倒到另一个栈中，另一个栈的栈顶就是队头

```go
type MyQueue struct {
	stack1, stack2 []int
}

func Constructor() MyQueue {
	return MyQueue{
		stack1: make([]int, 0),
		stack2: make([]int, 0),
	}
}

func (this *MyQueue) Push(x int) {
	this.stack1 = append(this.stack1, x)
}

func (this *MyQueue) Pop() int {
	val := this.Peek()
	this.stack2 = this.stack2[:len(this.stack2)-1]
	return val
}

func (this *MyQueue) Peek() int {
	if len(this.stack2) == 0 {
		for len(this.stack1) > 0 {
			this.stack2 = append(this.stack2, this.stack1[len(this.stack1)-1])
			this.stack1 = this.stack1[:len(this.stack1)-1]
		}
	}
	return this.stack2[len(this.stack2)-1]
}

func (this *MyQueue) Empty() bool {
	return len(this.stack1) == 0 && len(this.stack2) == 0
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(x);
 * param_2 := obj.Pop();
 * param_3 := obj.Peek();
 * param_4 := obj.Empty();
 */
```

## [225. 用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/)

### 题意

### 题解

两个栈，入栈时间复杂度O(n)，其他O(1)，始终让一个队列为空，入栈时，入这个队列，然后把另一个队列的数倒过去

```cpp
class MyStack {
private:
    queue<int> q1, q2;
public:
    MyStack() {
        
    }
    
    void push(int x) {
        q1.push(x);
        while (!q2.empty()) {
            q1.push(q2.front());
            q2.pop();
        }
        swap(q1, q2);
    }
    
    int pop() {
        int x = q2.front();
        q2.pop();
        return x;
    }
    
    int top() {
        int x = q2.front();
        return x;
    }
    
    bool empty() {
        return q2.empty();
    }
};

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack* obj = new MyStack();
 * obj->push(x);
 * int param_2 = obj->pop();
 * int param_3 = obj->top();
 * bool param_4 = obj->empty();
 */
```

用一个栈实现，时间复杂度入栈O(n)，其他O(1)

```cpp
class MyStack {
private:
    queue<int> q;
public:
    MyStack() {

    }
    
    void push(int x) {
        q.push(x);
        int sz = q.size();
        for (int i = 1; i < sz; ++i) {
            q.push(q.front());
            q.pop();
        }
    }
    
    int pop() {
        int x = q.front();
        q.pop();
        return x;
    }
    
    int top() {
        return q.front();
    }
    
    bool empty() {
        return q.empty();
    }
};

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack* obj = new MyStack();
 * obj->push(x);
 * int param_2 = obj->pop();
 * int param_3 = obj->top();
 * bool param_4 = obj->empty();
 */
```



## [69.x的平方根](https://leetcode.cn/problems/sqrtx/)

### 题意

### 题解

二分求答案

```go
func mySqrt(x int) int {
	l, r := 0, x
	for l <= r {
		mid := l + (r - l) / 2
		if mid * mid > x{
			r = mid - 1
		} else {
			l = mid + 1
		}
	}
	return l - 1
}
```


## [165.比较版本号](https://leetcode.cn/problems/compare-version-numbers/description/)

### 题意

### 题解

时间复杂度O(n + m)，空间复杂度O(1)，同时遍历v1和v2，拿到相同位置的修订号，比较

```cpp
class Solution {
public:
    int compareVersion(string version1, string version2) {
        int n = version1.length(), m = version2.length();
        int i = 0, j = 0;
        while (i < n || j < m) {
            long long x = 0;
            for (; i < n && version1[i] != '.'; ++i) {
                x = x * 10 + version1[i] - '0';
            }
            ++i; // 跳过点号
            long long y = 0;
            for (; j < m && version2[j] != '.'; ++j) {
                y = y * 10 + version2[j] - '0';
            }
            ++j; // 跳过点号
            if (x != y) {
                return x > y ? 1 : -1;
            }
        }
        return 0;
    }
};
```



## [151.反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/description/)

### 题意

### 题解

O(1)空间复杂度要求移动字符串，细节很多

```cpp
class Solution {
public:
    string reverseWords(string s) {
        reverse(s.begin(), s.end());
        int base = 0, len = s.length();
        int index = 0;	// 当前扫描到的字符
        int lastbase;
        while (base < len and index < len) {
            while (index < len and s[index] == ' ') {	// index找到第一个合理字符
                index++;
            }
            if (index == len) break; // !!! 没找到，直接退出
            lastbase = base;	// lastbase是字符串的起始位置，用于反转， base是移动后的位置 index是原来位置
            while (index < len and s[index] != ' ') {
                s[base++] = s[index++];
            }
            reverse(s.begin() + lastbase, s.begin() + base); // 反转
            s[base] = ' ';
            base++;
            index++;
        }
        s.erase(s.begin() + base - 1, s.end());
        return s;
    }
};
```

## [129.求根节点到叶节点数字之和](https://leetcode.cn/problems/sum-root-to-leaf-numbers/description/)

### 题意


### 题解

dfs到叶子，累加

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func sumNumbers(root *TreeNode) int {
	sum := 0
	if root == nil {
		return sum
	}
	var dfs func(*TreeNode, int)
	dfs = func(node *TreeNode, val int) {
		if node.Left == nil && node.Right == nil {	// 判自己是不是叶子
			sum += val
			return
		}
		if node.Left != nil {
			dfs(node.Left, val * 10 + node.Left.Val)
		}
		if node.Right != nil {
			dfs(node.Right, val * 10 + node.Right.Val)
		}
	}
	dfs(root, root.Val)
	return sum
}
```


## [144.二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/description/)

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
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> v;
        function<void(TreeNode*)> dfs = [&](TreeNode* node) {
            if (node) {
                v.push_back(node->val);
                dfs(node->left);
                dfs(node->right);
            }
        };
        dfs(root);
        return v;
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
    vector<int> preorderTraversal(TreeNode* root) {
        if (root == nullptr) return vector<int>{};
        vector<int> v;
        stack<TreeNode*> s;
        s.push(root);
        while (!s.empty()) {
            auto now = s.top();
            s.pop();
            v.push_back(now->val);
            if (now->right != nullptr) s.push(now->right);	// 前序遍历先放右
            if (now->left != nullptr) s.push(now->left);
        }
        return v;
    }
};
```


## [470. 用 Rand7() 实现 Rand10()](https://leetcode.cn/problems/implement-rand10-using-rand7/description/)

### 题意

### 题解

用rd7 + 7 * (rd7 - 1)生成1 - 49的随机数，然后取1 - 40

```cpp
// The rand7() API is already defined for you.
// int rand7();
// @return a random integer in the range 1 to 7

class Solution {
public:
    int rand10() {
        int x;
        while (true) {
            x = rand7() + 7 * (rand7() - 1);
            if (x <= 40) break;
        }
        return x % 10 + 1;
    }
};
```

## [162.寻找峰值](https://leetcode.cn/problems/find-peak-element/description/)

### 题意

### 题解

条件依赖型二分，注意nums[-1] = nums[n] = -∞

特判mid的边界，然后如果为上坡状态，峰值在右半区，下坡状态，峰值在左半区

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return 0;
        int l = 0, r = n - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (mid == 0 and nums[0] > nums[1]) return 0;
            else if (mid == 0) l = mid + 1;
            else if (mid == n - 1 and nums[n - 1] > nums[n - 2]) return n - 1;
            else if (mid == n - 1) r = mid - 1;
            else if (nums[mid - 1] < nums[mid] and nums[mid] > nums[mid + 1]) return mid;
            else if (nums[mid] > nums[mid + 1]) r = mid - 1;
            else l = mid + 1;
        }
        return 0;
    }
};
```


## [221.最大正方形](https://leetcode.cn/problems/maximal-square/description/)

### 题意

### 题解

dp[i][j]表示以i，j为右下角的正方形的边长

dp[i][j] = min(dp[i - 1][j], dp[i][j -1], dp[i-1][j-1]) + 1

```go
func maximalSquare(matrix [][]byte) int {
	n, m := len(matrix), len(matrix[0])
	dp := make([][]int, n+1)
	for i := 0; i <= n; i++ {
		dp[i] = make([]int, m+1)
	}
	if matrix[0][0] == '1' {
		dp[0][0] = 1
	}
	for i := 1; i < n; i++ {
		if matrix[i][0] == '1' {
			dp[i][0] = 1
		}
	}
	for i := 1; i < m; i++ {
		if matrix[0][i] == '1' {
			dp[0][i] = 1
		}
	}
	for i := 1; i < n; i++ {
		for j := 1; j < m; j++ {
			if matrix[i][j] == '1' {
				dp[i][j] = min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1
			}
		}
	}
	ans := 0
	for i := 0; i < n; i++ {
		for j := 0; j < m; j++ {
			ans = max(ans, dp[i][j])
		}
	}
	return ans * ans
}
```

## [113.路径总和II](https://leetcode.cn/problems/path-sum-ii/description/)


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
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        if (root == nullptr) return vector<vector<int>>{};
        vector<vector<int>> ans;
        vector<int> tmp;
        function<void(TreeNode*, int)> dfs = [&](TreeNode* node, int cnt) {
          int now = cnt + node->val;
          tmp.push_back(node->val);
          if (node->left == nullptr and node->right == nullptr and now == targetSum) {
            ans.push_back(tmp);
          }
          if (node->left) dfs(node->left, now);
          if (node->right) dfs(node->right, now);
          tmp.pop_back();
        };
        dfs(root, 0);
        return ans;
    }
};
```


## [14.最长公共前缀](https://leetcode.cn/problems/longest-common-prefix/description/)

### 题意

### 题解

```cpp
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
      string ans;
      for (int i = 0; i < 205; ++i) {
        char now = '$';
        for (auto& j : strs) {
          if (i >= j.length()) return ans;
          if (now == '$') now = j[i];
          else if (now != j[i]) return ans;
        }
        ans += now;
      }
      return ans;
    }
};
```

## 小于N的最大数

https://leetcode.cn/circle/discuss/fbhhev/

### 题意

### 题解

把集合从大到小排，dfs(pos）表示遍历到pos位置，假设答案的位和t一样，对于每个pos找到小于等于t[pos]的数，如果小于t[pos]，后面的数直接选最大，如果等于t[pos]，则要回溯，因为可能后面找不到

如果最后的结果位数和t的位数不相同，就说明找不到位数和t相同且比t小的数，那就少一位数，然后全选最大

测试的时候要减1

```cpp
int func(vector<int>& a, int t) {
    sort(a.rbegin(), a.rend());
    size_t num = 0;
    string tt;
    while (t) {
        tt += char('0' + (t % 10));
        t /= 10;
    }
    reverse(tt.begin(), tt.end());
    num = tt.length();
    string s;
    int p = -1;
    bool flag = false;
    // 注意在三个地方加递归退出条件
    function<void(int)> dfs = [&](int pos) {
        if (flag) return ;
        if (pos == num) {
            flag = true;
            return;
        }
        for (int i : a) {
            if (flag) return;
            if (tt[pos] == '0' + i) { // 如果相等，继续往后，有可能回退
                s += tt[pos];
                dfs(pos + 1);
                if (flag) return ;
                s.pop_back();
            } else if (tt[pos] > '0' + i) { // 如果大于，则后面直接选最大
               s += char('0' + i);
               p = pos + 1;
               flag = true;
               return;
            }   // 其他情况继续找
        }
    };
    dfs(0);
    if (p != -1) {  // 后面直接填最大
        for (int i = p; i < num; ++i) {
            s += char('0' + a[0]);
        }
        return stoi(s);
    } else if (s.length() == num) {  // 位数相同
        return stoi(s);
    } else {
        for (int i = 0; i < num - 1; ++i) { // 找不到位数相同满足条件的数
            s += char('0' + a[0]);
        }
        return stoi(s);
    }
}
```


```cpp
// 2, 3, 5 | 3211 | 2555
// 2, 3, 5 | 33211 | 32555
// 9 | 100 | 99
// 1, 2, 4, 9 | 2533 | 2499
// 1, 9 | 222 | 199
// 2,3,5  | 32 | 25
// 2,3,5 | 332 | 325
// 1,4| 115 | 114
//1,2,4,9 | 222202222 |  222199999
//1,2,3,4,5,6,7,8,9 | 10000 | 9999
//1,9 | 9911 | 9199
//2,4,5 | 24131 | 22555
//1,2,3,4
    vector<int> a = {1,2,4,9};
    cout << func(a, 2100 - 1) << '\n';
```


## [902. 最大为 N 的数字组合](https://leetcode.cn/problems/numbers-at-most-n-given-digit-set/description/)

### 题意

### 题解

数位dp

dp[i][0]表示小于n的前i位的数量，dp[i][1]表示等于n的前i位的数量，比如n = 123，dp[0][0]表示小于1的数量，dp[1][0]表示小于12的数量，dp[2][0]表示小于123的数量，dp[1][1]表示等于12的数量

遍历每一位数，再遍历集合


dp[i][1] = dp[i - 1][1] 如果存在d[j] == s[i] 


dp[i][0] += dp[i - 1][1] * c[i] （c[i]表示第i位，digit有多少个数小于s[i]）

dp[i][0] += dp[i - 1][[0] * m （当它是两位数及以上时，对于小于前i - 1位的所有数，第i位可以选择集合中的任意数，m表示集合大小）

dp[i][0] += m（当它是两位数及以上时，可选集合中任意的一位数）


初始化 dp[-1][1] = 1因为要和c[i]乘



```cpp
class Solution {
public:
    int atMostNGivenDigitSet(vector<string>& digits, int n) {
        string s = to_string(n);
        int m = digits.size();
        int k = s.length();
        vector<vector<int>> dp(k + 1, vector<int>(2));
        dp[0][1] = 1;
        for (int i = 1; i <= k; ++i) {
          for (int j = 0; j < m; ++j) {
            if (digits[j][0] == s[i - 1]) {
              dp[i][1] += dp[i - 1][1];
            } else if (digits[j][0] < s[i - 1]) {
              dp[i][0] += dp[i - 1][1];
            } else break;
          }
          if (i > 1) dp[i][0] += m + dp[i - 1][0] * m;
        }
        return dp[k][0] + dp[k][1];
    }
};
```

## [112.路径总和](https://leetcode.cn/problems/path-sum/description/)

### 题意

### 题解

```cpp
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func hasPathSum(root *TreeNode, targetSum int) bool {
	if root == nil {
		return false
	}
	flag := false
	var dfs func(*TreeNode, int)
	dfs = func(node *TreeNode, val int) {
		if flag {
			return
		}
		if node.Left == nil && node.Right == nil && val == targetSum{
			flag = true
			return
		}
		if node.Left != nil {
			dfs(node.Left, val  + node.Left.Val)
		}
		if node.Right != nil {
			dfs(node.Right, val  + node.Right.Val)
		}
	}
	dfs(root, root.Val)
	return flag
}
```


## [662.二叉树最大宽度](https://leetcode.cn/problems/maximum-width-of-binary-tree/description/)

### 题意

### 题解

注意要用ull，还不能在哈希表中存最小最大值，然后用最大值-最小值，会溢出

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
    int widthOfBinaryTree(TreeNode* root) {
        using ull = unsigned long long;
        int ans = -1;
        unordered_map<int, vector<ull>> mp;
        function<void(TreeNode*, ull, int)> dfs = [&](TreeNode* node, ull val, int depth) {
            if (node == nullptr) return ;
            mp[depth].push_back(val);
            dfs(node->left, val * 2 - 1, depth + 1);
            dfs(node->right, val * 2, depth + 1);
        };
        dfs(root, 1, 0);
        for (auto& [i, j] : mp) {
            //cout << j.front() << ' ' << j.back() << '\n';
            int dif = j.back() - j.front();
            if (dif > ans) ans = dif;
        }
        return ans + 1;
    }
};

// [1,1,1,1,1,1,1,null,null,null,1,null,null,null,null,2,2,2,2,2,2,2,null,2,null,null,2,null,2]
// wa 32
// ac 8
```


## [224. 基本计算器](https://leetcode.cn/problems/basic-calculator/description/)

### 题意

### 题解

由于只有加减法，所以把括号打开，按顺序进行计算和有括号没什么差别，唯一的差别是这个数是+还是-，那就要看当前是+还是-


如果是-(+)，那么里面的+变成-，如果是-(-)，那么里面的-变成+，如果是+(+)里面的+还是+，如果是+(-)里面的-还是-，对于多重括号也是如此，所以要存储括号外的符号和当前符号

使用栈来操作，sign表示当前符号，由于要存括号外的符号，所以遇到（ 时，把当前符号入栈，遇到符号时，如果栈顶符号是-，那么当前符号就要反过来


```cpp
class Solution {
public:
    int calculate(string s) {
      int sign = 1;
      stack<int> st;
      st.push(1);
      int sum = 0;
      for (int j = 0; j < s.length(); ++j) {
        char i = s[j];
        if (i == ' ') continue;
        else if (i == '(') {
          st.push(sign);
        } else if (i == ')') {
          st.pop();
        } else if (i == '+') {
          sign = st.top();
        } else if (i == '-') {
          sign = -st.top();
        } else {
          int tmp = 0;
          for (; j < s.length(); ++j) {
            if (isdigit(s[j])) {
              tmp = tmp * 10 + (s[j] - '0');
            } else {
              break;
            }
          }
          j--;
          sum += sign * tmp;
        }
      }
      return sum;
    }
};

```


## [227.基本计算器II](https://leetcode.cn/problems/basic-calculator-ii/description/)

### 题意

### 题解

没有括号，可以把乘法和除法先计算

sign表示当前符号

当我们扫描到一个数时，如果当前符号是*，那当前数就和栈顶相乘，然后更新栈顶

如果是+，那就直接入栈，最后把栈元素相加，每个栈元素都是已经算好乘法和除法的结果


```cpp
class Solution {
public:
    int calculate(string s) {
        vector<int> st;
        char sign = '+';
        for (int i = 0; i < s.length(); ++i) {
            if (isdigit(s[i])) {
                int num = 0;
                for (; i < s.length(); ++i) {
                    if (isdigit(s[i])) {
                        num = num * 10 + (s[i] - '0');
                    } else break;
                }
                if (sign == '+') {
                    st.push_back(num);
                } else if (sign == '-') {
                    st.push_back(-num);
                } else if (sign == '*') {
                    st.back() *= num;
                } else {
                    st.back() /= num;
                }
                i--;
            } else if (s[i] != ' ') {
                sign = s[i];
            }
        }
        return accumulate(st.begin(), st.end(), 0);
    }
};
```

## [179.最大数](https://leetcode.cn/problems/largest-number/description/)

### 题意

### 题解

技巧题

特判全为0

对字符串数组排序，排序方法是a + b > b + a


```cpp
class Solution {
public:
    string largestNumber(vector<int>& nums) {
        bool zero = true;
        vector<string> v;
        for (int i : nums) {
            if (i != 0) zero = false;
            v.push_back(to_string(i));
        }
        if (zero) return "0";
        sort(v.begin(), v.end(), [&](string a, string b) {
            return a + b > b + a;   // nb
        });
        string ans;
        for (auto i : v) {
            ans += i;
        }
        return ans;
    }
};
```


## [718.最长重复子数组](https://leetcode.cn/problems/maximum-length-of-repeated-subarray/description/)

### 题意

### 题解

技巧题

滑动窗口

```cpp
class Solution {
public:
    int findLength(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size();
        int n2 = nums2.size();
        int ans = 0;
        auto donk = [&](int pos1, int pos2, int len) {
            int ret = 0, k = 0;
            for (int i = 0; i < len; ++i) {
                if (nums1[pos1 + i] == nums2[pos2 + i]) {
                    k++;
                } else {
                    k = 0;
                }
                ret = max(ret, k);
            }
            return ret;
        };
        for (int i = 0; i < n1; ++i) {
            ans = max(ans, donk(i, 0, min(n1 - i, n2)));
        }
        for (int i = 0; i < n2; ++i) {
            ans = max(ans, donk(0, i, min(n1, n2 - i)));
        }
        return ans;
    }
};
```

## [695.岛屿的最大面积](https://leetcode.cn/problems/max-area-of-island/description/)

### 题意

### 题解

```cpp
class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int dir[][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        int n = grid.size();
        int m = grid[0].size();
        int ans = 0;
        int tmp = 0;
        function<void(int, int)> dfs = [&](int x, int y) {
            tmp++;
            grid[x][y] = 2;
            for (int k = 0; k < 4; ++k) {
                int tx = x + dir[k][0], ty = y + dir[k][1];
                if (tx >= 0 and tx < n and ty >= 0 and ty < m and grid[tx][ty] == 1) dfs(tx, ty);
            }
        };
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (grid[i][j] == 1) {
                    tmp = 0;
                    dfs(i, j);
                    ans = max(ans, tmp);
                }
            }
        }
        return ans;
    }
};
```

## [122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/)

### 题意

### 题解

技巧题

无论哪天买入哪天卖出，买卖多少次，都可以看作是前一天买入，当前卖出，如果亏了，就不操作，收益是0

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int ans = 0;
        for (int i = 1; i < (int) prices.size(); ++i) {
            ans += max(0, prices[i] - prices[i - 1]);
        }
        return ans;
    }
};
```

## [83. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/description/)

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
    ListNode* deleteDuplicates(ListNode* head) {
        if (head == nullptr) return head;
        auto* ptr1 = head;
        auto* ptr2 = head->next;
        while (ptr2 != nullptr) {
            if (ptr1->val == ptr2->val) {
                ptr1->next = ptr2->next;
                ptr2 = ptr2->next;
                continue;
            } 
            ptr1 = ptr2;
            ptr2 = ptr2->next;
        }
        return head;
    }
};
```



## [209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/description/)

### 题意

### 题解

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int n = nums.size();
        int l = 0, r = 1;
        int now = nums[0];
        int ans = n + 3;
        while (l < r) {
            if (now >= target) {
                ans = min(ans, r - l);
                now -= nums[l];
                l++;
            } else if (r == n) {
                break;
            } else {
                now += nums[r];
                r++;
            }
        }
        return ans == n + 3 ? 0 : ans;
    }
};
```




