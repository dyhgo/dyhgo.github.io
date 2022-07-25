# 剑指offer


> 在leetcode平台上做一下剑指offer的题，不定时更新



## 03 数组中重复的数字
### 考点
easy 模拟

### 题意

[题链](https://leetcode.cn/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)

找出数组中任一重复的数

### 题解



```go
func findRepeatNumber(nums []int) int {
	mp := make(map[int]int)
	for i := range nums {
		if _, ok := mp[nums[i]]; ok {
			return nums[i]
		}
		mp[nums[i]] = 1
	}
	return 0
}
```

## 04 二维数组中的查找

### 考点
medium 线性查找

### 题意

[题链](https://leetcode.cn/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

在二维数组中查找目标数

### 题解

暴力时间复杂度O(n*m)

从右上角开始，如果这个值小于目标数，则往下一行查找，如果大于目标数，则往前一列查找



```go
func findNumberIn2DArray(matrix [][]int, target int) bool {
	if matrix == nil || len(matrix) == 0 {
		return false
	}
	r, c := len(matrix), len(matrix[0])
	i, j := 0, c - 1
	for i < r && j >= 0 {
		tmp := matrix[i][j]
		if tmp == target {
			return true
		}
		if tmp < target {
			i++
		} else {
			j--
		}
	}
	return false
}
```


## 05 替换空格

### 考点
easy 模拟

### 题意

[题链](https://leetcode.cn/problems/ti-huan-kong-ge-lcof/)

把字符串中的空格替换成%20

### 题解



```go
func replaceSpace(s string) string {
	ans := ""
	for _, v := range s {
		if v == ' ' {
			ans += "%20"
		} else {
			ans += string(v)
		}
	}
	return ans
}
```

```go
func replaceSpace(s string) string {
	return strings.Replace(s, " ", "%20", -1)
}
```


## 06 从尾到头打印链表

### 考点
easy 模拟

### 题意
[题链](https://leetcode.cn/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)

如题名

### 题解


```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reversePrint(head *ListNode) []int {
	var ans []int
	for head != nil {
		ans = append(ans, head.Val)
		head = head.Next
	}
	for i, j := 0, len(ans) - 1; i < j; i, j = i + 1, j - 1 {
		ans[i], ans[j] = ans[j], ans[i]
	}
	return ans
}
```

## 07 重建二叉树

### 考点

medium dfs、迭代

### 题意

[题链](https://leetcode.cn/problems/zhong-jian-er-cha-shu-lcof/)

给二叉树的先序遍历和中序遍历，还原树

### 题解

dfs，只要锁定根在中序中的位置，然后类似于分治的做法，递归重建左子树和右子树



```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
var mp = make(map[int]int)

func sol(pre []int, in []int, prel int, prer int, inl int, inr int) *TreeNode {
	if prel > prer {
		return nil
	}
	rt := pre[prel]
	node := &TreeNode{rt, nil, nil}
	leftsize := mp[rt] - inl
	node.Left = sol(pre, in, prel + 1, prel + leftsize, inl, leftsize - 1)
	node.Right = sol(pre, in, prel + leftsize + 1, prer, mp[rt] + 1, inr)
	return node
}

func buildTree(preorder []int, inorder []int) *TreeNode {
	n := len(preorder)
	for i, v := range inorder {
		mp[v] = i
	}
	return sol(preorder, inorder, 0, n - 1, 0, n - 1)
}
```

用栈代替dfs可以节省时间和空间


```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
var mp = make(map[int]int)

type foo struct {
	node                 *TreeNode
	prel, prer, inl, inr int
}

func buildTree(preorder []int, inorder []int) *TreeNode {
	n := len(preorder)
	for i, v := range inorder {
		mp[v] = i
	}
	var stack []foo
	if n == 0 {
		return nil
	}
	node := &TreeNode{preorder[0], nil, nil}
	stack = append(stack, foo{node, 0, n - 1, 0, n - 1})
	for len(stack) != 0 {
		tmp := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		rt := tmp.node.Val
		leftsize := mp[rt] - tmp.inl
		
		curprel := tmp.prel + 1
		curprer := tmp.prel + leftsize
		curinl := tmp.inl
		curinr := leftsize - 1
		
		if curprel > curprer {
			tmp.node.Left = nil
		} else {
			lnode := &TreeNode{preorder[curprel], nil, nil}
			tmp.node.Left = lnode
			stack = append(stack, foo{lnode, curprel, curprer, curinl, curinr})
		}
		
		curprel = tmp.prel + leftsize + 1
		curprer = tmp.prer
		curinl = mp[rt] + 1
		curinr = tmp.inr
		
		if curprel > curprer {
			tmp.node.Right = nil
		} else {
			rnode := &TreeNode{preorder[curprel], nil, nil}
			tmp.node.Right = rnode
			stack = append(stack, foo{rnode, curprel, curprer, curinl, curinr})
		}
	}
	return node
}
```


## 09 用两个栈实现队列

### 考点

easy 栈、队列

### 题意

[题链](https://leetcode.cn/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

两个栈，入队操作就是直接push到栈顶，出队操作要获得栈底元素，就把它们倒到另一个栈中，这样队首就是另一个栈的栈顶

### 题解


```go
type CQueue struct {
	st1, st2 []int
}

func Constructor() CQueue {
	return CQueue{}
}

func (this *CQueue) AppendTail(value int) {
	this.st1 = append(this.st1, value)
}

func (this *CQueue) DeleteHead() int {
	if len(this.st1) == 0 && len(this.st2) == 0 {
		return -1
	}
	if len(this.st2) == 0 {
		for len(this.st1) != 0 {
			this.st2 = append(this.st2, this.st1[len(this.st1) - 1])
			this.st1 = this.st1[:len(this.st1) - 1]
		}
	}
	v := this.st2[len(this.st2) - 1]
	this.st2 = this.st2[:len(this.st2) - 1]
	return v
}


/**
 * Your CQueue object will be instantiated and called as such:
 * obj := Constructor();
 * obj.AppendTail(value);
 * param_2 := obj.DeleteHead();
 */
```


## 10-1 斐波那契数列

### 考点

easy 模拟

### 题意

[题链](https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof/)


### 题解

```go
func fib(n int) int {
    const mod int = 1e9 + 7
    if n < 2 {
        return n
    }
    p, q, r := 0, 0, 1
    for i := 2; i <= n; i++ {
        p = q
        q = r
        r = (p + q) % mod
    }
    return r
}
```

## 10-2 青蛙跳台阶问题

### 考点

easy dp

### 题意

[题链](https://leetcode.cn/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)


### 题解




```go
func numWays(n int) int {
	const mod = 1e9 + 7
	dp := make([]int, n + 3)
	dp[0] = 1
	dp[1] = 1
	for i := 2; i <= n; i++ {
		dp[i] = dp[i - 1] + dp[i - 2]
		dp[i] %= mod
	}
	return dp[n]
}
```


## 11 旋转数组的最小数字

### 考点

easy 二分

### 题意

[题链](https://leetcode.cn/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)


### 题解

二分，注意细节

```go
func minArray(numbers []int) int {
	low := 0
	hi := len(numbers) - 1
	for low < hi {
		mid := low + (hi-low)/2
		if numbers[mid] < numbers[hi] {
			hi = mid
		} else if numbers[mid] > numbers[hi] {
			low = mid + 1
		} else {
            hi--
        }
	}
	return numbers[low]
}
```


## 12  矩阵中的路径

### 考点

medium dfs、回溯、剪枝

### 题意

[题链](https://leetcode.cn/problems/ju-zhen-zhong-de-lu-jing-lcof/)

### 题解

注意要加剪枝、有几处需要回溯

题解在调用dfs时传递字符串，这样很浪费时间，不是一个快速的方法


```go
func exist(board [][]byte, word string) bool {
	dir := [][]int{{0, 1}, {0, -1}, {-1, 0}, {1, 0}}
	n := len(board)
	m := len(board[0])
	if len(word) > n*m {
		return false
	}
	vis := make([][]bool, n)
	for i := range vis {
		vis[i] = make([]bool, m)
	}
	le := len(word)
	var dfs func(x, y int, str string) bool
	dfs = func(x, y int, str string) bool {
		vis[x][y] = true
		defer func() { vis[x][y] = false }()
		for i := 0; i < len(str); i++ {
			if str[i] != word[i] {
				return false
			}
		}
		if len(str) == le {
			return true
		}
		for i := 0; i < 4; i++ {
			nx := x + dir[i][0]
			ny := y + dir[i][1]
			if nx >= 0 && nx < n && ny >= 0 && ny < m && !vis[nx][ny] {
				if dfs(nx, ny, str+string(board[nx][ny])) {
					return true
				}
			}
		}
		return false
	}
	for i, row := range board {
		for j, v := range row {
			if dfs(i, j, string(v)) {
				return true
			}
		}
	}
	return false
}
```


## 13 机器人的运动范围

### 考点

medium 搜索

### 题意

[题链](https://leetcode.cn/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/)

### 题解

把数位和>k的格子当做障碍

```go
func movingCount(m int, n int, k int) int {
	var queue [][2]int
	check := func(x int) int {
		res := 0
		for x != 0 {
			res += x % 10
			x /= 10
		}
		return res
	}
	obstacle := make([][]bool, m)
	for i := range obstacle {
		obstacle[i] = make([]bool, n)
	}
	vis := make([][]bool, m)
	for i := range vis {
		vis[i] = make([]bool, n)
	}
	dir := [][]int{{0, 1}, {0, -1}, {-1, 0}, {1, 0}}
	sx, sy := 0, 0
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if check(i) + check(j) > k {
				obstacle[i][j] = true
			}
		}
	}
	queue = append(queue, [2]int{sx, sy})
	vis[sx][sy] = true
	ans := 1
	for len(queue) != 0 {
		tmp := queue[0]
		queue = queue[1:]
		sx, sy = tmp[0], tmp[1]
		for i := 0; i < 4; i++ {
			nx, ny := sx + dir[i][0], sy + dir[i][1]
			if nx >= 0 && nx < m && ny >= 0 && ny < n && !vis[nx][ny] && !obstacle[nx][ny] {
				queue = append(queue, [2]int{nx, ny})
				ans++
				vis[nx][ny] = true
			}
		}
	}
	return ans
}
```

