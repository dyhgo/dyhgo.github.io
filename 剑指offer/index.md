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


## 14-1 剪绳子

### 考点

medium 数学规律 dp

### 题意

给一个段长度为n的绳子，把绳子分成若干段，求每段绳子的长度积的最大值

[题链](https://leetcode.cn/problems/jian-sheng-zi-lcof/)

### 题解

dp很容易想到，对于数学规律

首先平均分能够获得最大积，但是不知道是分成222222还是333333还是444444

因为有时候不能正好平均分，所以一般是222221,33333332,44444443这种形式

可以概括为分成1和2的、分成2和3的、分成3和4的。。。

对于分成3和4的，由于4可以分成2和2，没有损失，所以3和4实际上就是2和3

对于分成4和5的，由于4可以分成2和2，没有损失，5可以分成2和3，积增加了，所以4和5实际还是2和3

对于分成5和6的，由于5可以分成2和3，6可以分成3和3，积增加了，所以5和6实际上还是2和3

可以推测其他的都可以变成2和3

比较1和2的与2和3的，假设把2和3分解成1和2，积减少了，所以还是2和3划算，且应该尽可能多得保留3（可以进行严谨的数学证明，懒得写）

结论，当n%3=0时，是3333333，当n%3=1时，是33333322，当n%3==2时，是3333333332


```go
func cuttingRope(n int) int {
	switch n {
	case 1:
		return 1
	case 2:
		return 1
	case 3:
		return 2
	default:
		if n%3 == 0 {
			return int(math.Pow(3, float64(n/3)))
		} else if n%3 == 1 {
			return int(math.Pow(3, float64(n/3-1)) * 4)
		} else {
			return int(math.Pow(3, float64(n/3)) * 2)
		}
	}
}
```


## 14-2 剪绳子 II

### 考点

medium 数学规律 dp 快速幂

### 题意

给一个段长度为n的绳子，把绳子分成若干段，求每段绳子的长度积的最大值

[题链](https://leetcode.cn/problems/jian-sheng-zi-lcof/)

### 题解

同上题，加个快速幂

```go
func cuttingRope(n int) int {
	const mod = 1e9 + 7
	qpow := func(x, n int) int {
		res := 1
		for n > 0 {
			if n & 1 == 1 {
				res = res * x % mod
			}
			x = x * x % mod
			n >>= 1
		}
		return res
	}
	switch n {
	case 1:
		return 1
	case 2:
		return 1
	case 3:
		return 2
	default:
		if n%3 == 0 {
			return qpow(3, n / 3)
		} else if n%3 == 1 {
			return qpow(3, n / 3 - 1) * 4 % mod
		} else {
			return qpow(3, n / 3) * 2 % mod
		}
	}
}
```


## 15 二进制中1的个数

### 考点

easy 位运算

### 题意

求正数二进制1的个数

[题链](https://leetcode.cn/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/)

### 题解

```go
func hammingWeight(num uint32) int {
	ans := 0
	for num != 0 {
		ans += (int)(num & 1)
		num >>= 1
	}
	return ans
}
```


## 16 数值的整数次方

### 考点

medium 快速幂

### 题意

求x的n次方

[题链](https://leetcode.cn/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/)

### 题解

```go
func myPow(x float64, n int) float64 {
	if n == 0 {
		return 1
	}
	pos := n > 0
	if !pos {
		n = -n
	}
	var ans = 1.0
	for n > 0 {
		if n%2 == 1 {
			ans *= x
		}
		x *= x
		n >>= 1
	}
	if pos {
		return ans
	} else {
		return 1 / ans
	}
}
```


## 17 打印从1到最大的n位数

### 考点

easy 小模拟

### 题意

如题名

[题链](https://leetcode.cn/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/)

### 题解

```go
func printNumbers(n int) []int {
	var ans []int
	for i := 1; i < (int)(math.Pow10(n)); i++ {
		ans = append(ans, i)
	}
	return ans
}
```


## 18 删除链表的节点

### 考点

easy 小模拟

### 题意

如题名

[题链](https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/)

### 题解

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func deleteNode(head *ListNode, val int) *ListNode {
	cnt := head
	if head.Val == val {
		return head.Next
	}
	for cnt != nil {
		if cnt.Next.Val == val {
			cnt.Next = cnt.Next.Next
			return head
		}
		cnt = cnt.Next
	}
	return head
}
```


## 19 正则表达式匹配

### 考点

hard dp 分类讨论

### 题意

[题链](https://leetcode.cn/problems/zheng-ze-biao-da-shi-pi-pei-lcof/)

### 题解

正则表达式匹配最高效的做法应该是用状态机？

很好的dp题，细节比较多（官方题解似乎很简洁🤔）

dp[i][j]表示s串前i个和p串的前j个是否匹配

如果s[i] = p[j] 那一定可以匹配， dp[i][j] = dp[i-1][j-1]

否则如果p[j] 是个字母，由于两个字母不同，一定不匹配 dp[i][j] = false

否则如果p[j]是’.'，它可以匹配任意一个字母，可以匹配dp[i][j] = dp[i-1][j-1]

否则如果p[j] = ‘*'， 这个比较麻烦

如果p[j-1] = s[i] 则这个*可以把前面的字母和自己吞掉，可以把自己吞掉，可以复制前面的字母，所以 dp[i][j] = dp[i][j-2] || dp[i][j-1] || dp[i-1][j]  （注意这里是dp[i-1][j]不是dp[i-1][j-1]，这样可以过加强的用例）

否则如果p[j-1]是个字母，那*只能把前面的字母吞掉，dp[i][j] = dp[i][j-2]

否则如果p[j-1]是’.'， 那它可以当做任何一个字母，dp[i][j] = dp[i][j-2] || dp[i][j-1] || dp[i-1][j-1]

不可能出现两个连续的’*’

初始化 dp = false, dp[0][0] = true

这么做有几个漏洞

“aab”, “cab” 无法通过，因为一开始就不匹配，后面都匹配不了（这肯能和代码有关），所以需要在s串和p串加个’a'来启动匹配

“aaa”, “.\*”  无法通过，最后漏考虑了一种情况，因为 “.*” 的 ‘.’ 可以是任意字母，所以dp[i][j] |= dp[i-1][j]，即当前s串的最后一个字母一定能匹配

有罚时的比赛应该考虑怎么通过想这些样例来降低dirt！！

```go
func isMatch(s string, p string) bool {
	s, p = "a" + s, "a" + p // insert 'a' in front to make aligned, pass "aab", "c*a*b"
	sn, pn := len(s), len(p)
	s, p = "a" + s, "a" + p
	dp := make([][]bool, sn+2)
	for i := range dp {
		dp[i] = make([]bool, pn+2)
	}
	dp[0][0] = true
    // fmt.Println(s)
    // fmt.Println(p)
	for i := 1; i <= sn; i++ {
		for j := 1; j <= pn; j++ {
			if s[i] == p[j] {
				dp[i][j] = dp[i - 1][j - 1]
			} else if 'a' <= p[j] && p[j] <= 'z' {
				dp[i][j] = false
			} else if p[j] == '.' {
				dp[i][j] = dp[i - 1][j - 1]
			} else if p[j] == '*' {
				if p[j - 1] == s[i] {
					dp[i][j] = dp[i][j - 2] || dp[i][j - 1] || dp[i - 1][j]
				} else if p[j - 1] >= 'a' && p[j - 1] <= 'z' {
					dp[i][j] = dp[i][j - 2]
				} else if p[j - 1] == '.' {
					dp[i][j] = dp[i][j - 2] || dp[i][j - 1] || dp[i - 1][j - 1] || dp[i - 1][j]
				}
			}
		}
	}
    // for i := 1; i <= sn; i++ {
    //     for j := 1; j <= pn; j++ {
    //         fmt.Printf("%d %d ", i, j)
    //         fmt.Println(dp[i][j])
    //     }
    // }
	return dp[sn][pn]
}

//数据加强了
// "aaa"
// "a*"
// wa false
// ac true
```


## 20 表示数值的字符串

### 考点

medium dfa，大模拟

### 题意

[题链](https://leetcode.cn/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/)

### 题解

dfa，大模拟题，此处放一个官方题解

![在这里插入图片描述](https://img-blog.csdnimg.cn/891d2cc5531f44a78e5f5dd49b36c6f5.png)

```cpp
class Solution {
public:
    enum State {
        STATE_INITIAL,
        STATE_INT_SIGN,
        STATE_INTEGER,
        STATE_POINT,
        STATE_POINT_WITHOUT_INT,
        STATE_FRACTION,
        STATE_EXP,
        STATE_EXP_SIGN,
        STATE_EXP_NUMBER,
        STATE_END
    };

    enum CharType {
        CHAR_NUMBER,
        CHAR_EXP,
        CHAR_POINT,
        CHAR_SIGN,
        CHAR_SPACE,
        CHAR_ILLEGAL
    };

    CharType toCharType(char ch) {
        if (ch >= '0' && ch <= '9') {
            return CHAR_NUMBER;
        } else if (ch == 'e' || ch == 'E') {
            return CHAR_EXP;
        } else if (ch == '.') {
            return CHAR_POINT;
        } else if (ch == '+' || ch == '-') {
            return CHAR_SIGN;
        } else if (ch == ' ') {
            return CHAR_SPACE;
        } else {
            return CHAR_ILLEGAL;
        }
    }

    bool isNumber(string s) {
        unordered_map<State, unordered_map<CharType, State>> transfer{
            {
                STATE_INITIAL, {
                    {CHAR_SPACE, STATE_INITIAL},
                    {CHAR_NUMBER, STATE_INTEGER},
                    {CHAR_POINT, STATE_POINT_WITHOUT_INT},
                    {CHAR_SIGN, STATE_INT_SIGN}
                }
            }, {
                STATE_INT_SIGN, {
                    {CHAR_NUMBER, STATE_INTEGER},
                    {CHAR_POINT, STATE_POINT_WITHOUT_INT}
                }
            }, {
                STATE_INTEGER, {
                    {CHAR_NUMBER, STATE_INTEGER},
                    {CHAR_EXP, STATE_EXP},
                    {CHAR_POINT, STATE_POINT},
                    {CHAR_SPACE, STATE_END}
                }
            }, {
                STATE_POINT, {
                    {CHAR_NUMBER, STATE_FRACTION},
                    {CHAR_EXP, STATE_EXP},
                    {CHAR_SPACE, STATE_END}
                }
            }, {
                STATE_POINT_WITHOUT_INT, {
                    {CHAR_NUMBER, STATE_FRACTION}
                }
            }, {
                STATE_FRACTION,
                {
                    {CHAR_NUMBER, STATE_FRACTION},
                    {CHAR_EXP, STATE_EXP},
                    {CHAR_SPACE, STATE_END}
                }
            }, {
                STATE_EXP,
                {
                    {CHAR_NUMBER, STATE_EXP_NUMBER},
                    {CHAR_SIGN, STATE_EXP_SIGN}
                }
            }, {
                STATE_EXP_SIGN, {
                    {CHAR_NUMBER, STATE_EXP_NUMBER}
                }
            }, {
                STATE_EXP_NUMBER, {
                    {CHAR_NUMBER, STATE_EXP_NUMBER},
                    {CHAR_SPACE, STATE_END}
                }
            }, {
                STATE_END, {
                    {CHAR_SPACE, STATE_END}
                }
            }
        };

        int len = s.length();
        State st = STATE_INITIAL;

        for (int i = 0; i < len; i++) {
            CharType typ = toCharType(s[i]);
            if (transfer[st].find(typ) == transfer[st].end()) {
                return false;
            } else {
                st = transfer[st][typ];
            }
        }
        return st == STATE_INTEGER || st == STATE_POINT || st == STATE_FRACTION || st == STATE_EXP_NUMBER || st == STATE_END;
    }
};
```


```go
type State int
type CharType int

const (
    STATE_INITIAL State = iota
    STATE_INT_SIGN
    STATE_INTEGER
    STATE_POINT
    STATE_POINT_WITHOUT_INT
    STATE_FRACTION
    STATE_EXP
    STATE_EXP_SIGN
    STATE_EXP_NUMBER
    STATE_END
)

const (
    CHAR_NUMBER CharType = iota
    CHAR_EXP
    CHAR_POINT
    CHAR_SIGN
    CHAR_SPACE
    CHAR_ILLEGAL
)

func toCharType(ch byte) CharType {
    switch ch {
    case '0', '1', '2', '3', '4', '5', '6', '7', '8', '9':
        return CHAR_NUMBER
    case 'e', 'E':
        return CHAR_EXP
    case '.':
        return CHAR_POINT
    case '+', '-':
        return CHAR_SIGN
    case ' ':
        return CHAR_SPACE
    default:
        return CHAR_ILLEGAL
    }
}

func isNumber(s string) bool {
    transfer := map[State]map[CharType]State{
        STATE_INITIAL: map[CharType]State{
            CHAR_SPACE:  STATE_INITIAL,
            CHAR_NUMBER: STATE_INTEGER,
            CHAR_POINT:  STATE_POINT_WITHOUT_INT,
            CHAR_SIGN:   STATE_INT_SIGN,
        },
        STATE_INT_SIGN: map[CharType]State{
            CHAR_NUMBER: STATE_INTEGER,
            CHAR_POINT:  STATE_POINT_WITHOUT_INT,
        },
        STATE_INTEGER: map[CharType]State{
            CHAR_NUMBER: STATE_INTEGER,
            CHAR_EXP:    STATE_EXP,
            CHAR_POINT:  STATE_POINT,
            CHAR_SPACE:  STATE_END,
        },
        STATE_POINT: map[CharType]State{
            CHAR_NUMBER: STATE_FRACTION,
            CHAR_EXP:    STATE_EXP,
            CHAR_SPACE:  STATE_END,
        },
        STATE_POINT_WITHOUT_INT: map[CharType]State{
            CHAR_NUMBER: STATE_FRACTION,
        },
        STATE_FRACTION: map[CharType]State{
            CHAR_NUMBER: STATE_FRACTION,
            CHAR_EXP:    STATE_EXP,
            CHAR_SPACE:  STATE_END,
        },
        STATE_EXP: map[CharType]State{
            CHAR_NUMBER: STATE_EXP_NUMBER,
            CHAR_SIGN:   STATE_EXP_SIGN,
        },
        STATE_EXP_SIGN: map[CharType]State{
            CHAR_NUMBER: STATE_EXP_NUMBER,
        },
        STATE_EXP_NUMBER: map[CharType]State{
            CHAR_NUMBER: STATE_EXP_NUMBER,
            CHAR_SPACE:  STATE_END,
        },
        STATE_END: map[CharType]State{
            CHAR_SPACE: STATE_END,
        },
    }
    state := STATE_INITIAL
    for i := 0; i < len(s); i++ {
        typ := toCharType(s[i])
        if _, ok := transfer[state][typ]; !ok {
            return false
        } else {
            state = transfer[state][typ]
        }
    }
    return state == STATE_INTEGER || state == STATE_POINT || state == STATE_FRACTION || state == STATE_EXP_NUMBER || state == STATE_END
}
```


图片和代码
作者：LeetCode-Solution
链接：https://leetcode.cn/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/solution/biao-shi-shu-zhi-de-zi-fu-chuan-by-leetcode-soluti/
来源：力扣（LeetCode）


## 21 调整数组顺序使奇数位于偶数前面

### 考点

easy 双指针

### 题意

[题链](https://leetcode.cn/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

### 题解

```go
func exchange(nums []int) []int {
	n := len(nums)
	l, r := 0, n-1
	for l < r {
		if nums[l]%2 == 0 && nums[r]%2 == 1 {
			nums[l], nums[r] = nums[r], nums[l]
			l++
			r--
		} else if nums[l] % 2 == 1 && nums[r] % 2 == 0 {
			l++
			r--
		} else if nums[l] % 2 == 0 && nums[r] % 2 == 0 {
			r--
		} else {
			l++
		}
	}
	return nums
}
```


## 22 链表中倒数第k个节点

### 考点

easy 模拟

### 题意

[题链](https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

### 题解

注意函数体可以调用返回值变量

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func getKthFromEnd(head *ListNode, k int) (kth *ListNode) {
    n := 0
    for node := head; node != nil; node = node.Next {

        n++

    }
    for kth = head; n > k; n-- {
        kth = kth.Next
    }
    return
}
```

## 24 反转链表

### 考点

easy 三指针

### 题意

[题链](https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof/)

### 题解

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseList(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}
	if head.Next == nil {
		return head
	}
	l, m, r := head, head.Next, head.Next.Next
	for r != nil {
		m.Next = l
		l, m = m, r
		r = m.Next
	}
    m.Next = l
	head.Next = nil
	return m
}
```


## 25 合并两个排序的链表

### 考点

easy 双指针比较值

### 题意

[题链](https://leetcode.cn/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)

### 题解

注意切换主链和副链，主链是真正头节点的链

空间复杂度O(1)

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
	var ma1n, sub *ListNode
	if l1 == nil {
		return l2
	} else if l2 == nil {
		return l1
	}
	if l1.Val < l2.Val {
		ma1n, sub = l1, l2
	} else {
		ma1n, sub = l2, l1
	}
	head := ma1n
	for ma1n != nil && sub != nil {
		if ma1n.Val <= sub.Val {
			if ma1n.Next != nil && ma1n.Next.Val <= sub.Val {
				ma1n = ma1n.Next
			} else {
				tmp := ma1n.Next
				ma1n.Next = sub
				ma1n = tmp
                ma1n, sub = sub, ma1n   // 互换主链和副链
			}
		} else {
			if sub.Next != nil && sub.Next.Val <= ma1n.Val {
				sub = sub.Next
			} else {
				tmp := sub.Next
				sub.Next = ma1n
				sub = tmp
                ma1n, sub = sub, ma1n   // 互换主链和副链
			}
		}
	}
	return head
}

// [5]
// [1,2,4]
// wa [1,5]
// ac [1,2,4,5]

// [-9,-7,-3,-3,-1,2,3]
// [-7,-7,-6,-6,-5,-3,2,4]
// wa [-9,-7,-7,-7,-6,-6,-5,-3,-1,2,2,3,4]
// ac [-9,-7,-7,-7,-6,-6,-5,-3,-3,-3,-1,2,2,3,4]
```


## 26 树的子结构

### 考点

medium 递归

### 题意

[题链](https://leetcode.cn/problems/shu-de-zi-jie-gou-lcof/)

### 题解

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func isSubStructure(A *TreeNode, B *TreeNode) bool {
	if A == nil || B == nil {
		return false
	}
	if A.Val == B.Val && B.Left == nil && B.Right == nil {
		return true
	}
	ok := true
	if A.Val == B.Val {
		//ok = isSubStructure(A.Left, B.Left) && isSubStructure(A.Right, B.Right)
		if B.Left != nil {
			if A.Left != nil && A.Left.Val == B.Left.Val && isSubStructure(A.Left, B.Left) {    //注意需要条件A.Left.Val == B.Left.Val
				
			} else {
				ok = false
			}
		}
		if ok && B.Right != nil {
			if A.Right != nil && A.Right.Val == B.Right.Val && isSubStructure(A.Right, B.Right) {
				
			} else {
				ok = false
			}
		}
	} else {
        ok = false  //加这一句
    }
	return ok || isSubStructure(A.Left, B) || isSubStructure(A.Right, B)
}

// [3,4]
// [3,4]
// wa false
// ac true

// [0,-4,-3]
// [1,-4]
// wa true
// ac false
```


## 27 二叉树的镜像

### 考点

easy 递归

### 题意

[题链](https://leetcode.cn/problems/er-cha-shu-de-jing-xiang-lcof/)

### 题解

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func mirrorTree(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}
	tmpL := root.Left
	tmpR := root.Right
	if tmpR != nil {
		root.Left = mirrorTree(tmpR)
	} else {
		root.Left = nil
	}
	if tmpL != nil {
		root.Right = mirrorTree(tmpL)
	} else {
		root.Right = nil
	}
	return root
}
```


## 28 对称的二叉树

### 考点

easy 递归

### 题意

[题链](https://leetcode.cn/problems/dui-cheng-de-er-cha-shu-lcof/)

### 题解

先求镜像，然后比较是否相同，注意深拷贝

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func mirrorTree(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}
	tmpL := root.Left
	tmpR := root.Right
	if tmpR != nil {
		root.Left = mirrorTree(tmpR)
	} else {
		root.Left = nil
	}
	if tmpL != nil {
		root.Right = mirrorTree(tmpL)
	} else {
		root.Right = nil
	}
	return root
}

func same(node1, node2 *TreeNode) bool {
	if node1 == nil && node2 == nil {
		return true
	} else if node1 == nil || node2 == nil {
		return false
	}
	return node1.Val == node2.Val && same(node1.Left, node2.Left) && same(node2.Right, node1.Right)
}

func deepCopy(node *TreeNode) *TreeNode {
	if node == nil {
		return nil
	}
	newNode := &TreeNode{node.Val, nil, nil}
	if node.Left != nil {
		newNode.Left = deepCopy(node.Left)
	}
	if node.Right != nil {
		newNode.Right = deepCopy(node.Right)
	}
	return newNode
}

func isSymmetric(root *TreeNode) bool {
	copied := deepCopy(root)
	mirrorTree(root)
	return same(root, copied)
}
```


官方较为简洁的代码

```go
func isSymmetric(root *TreeNode) bool {
    return check(root, root)
}

func check(p, q *TreeNode) bool {
    if p == nil && q == nil {
        return true
    }
    if p == nil || q == nil {
        return false
    }
    return p.Val == q.Val && check(p.Left, q.Right) && check(p.Right, q.Left) 
}
```


## 29 顺时针打印矩阵

### 考点

easy 模拟

### 题意

[题链](https://leetcode.cn/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/)

### 题解

注意特判

```go
func spiralOrder(matrix [][]int) []int {
    // 特判
    if len(matrix) == 0 || len(matrix[0]) == 0 {
        return []int{}
    }
	dir := [][]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}
	n, m := len(matrix), len(matrix[0])
	var ans []int
	vis := make([][]bool, n)
	for i := range vis {
		vis[i] = make([]bool, m)
	}
	idx := 0
	ans = append(ans, matrix[0][0])
	vis[0][0] = true
	x, y := 0, 0
	for len(ans) != n*m {
		nx, ny := x+dir[idx][0], y+dir[idx][1]
		if nx >= 0 && nx < n && ny >= 0 && ny < m && !vis[nx][ny] {
			x, y = nx, ny
			vis[x][y] = true
			ans = append(ans, matrix[x][y])
		} else {
			idx = (idx + 1) % 4
		}
	}
	return ans
}
```


## 30 包含min函数的栈

### 考点

easy 栈、思维

### 题意

[题链](https://leetcode.cn/problems/bao-han-minhan-shu-de-zhan-lcof/)

### 题解

使用两个栈，具体看动图

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/072ccbd8574278f800efc34466d25285.gif#pic_center)

```go
type MinStack struct {
	stack    []int
	minStack []int
}

/** initialize your data structure here. */
func Constructor() MinStack {
	return MinStack{
		stack:    []int{},
		minStack: []int{math.MaxInt64},
	}
}

func (this *MinStack) Push(x int) {
	this.stack = append(this.stack, x)
	this.minStack = append(this.minStack, min(x, this.minStack[len(this.minStack)-1]))
}

func (this *MinStack) Pop() {
	this.stack = this.stack[:len(this.stack)-1]
	this.minStack = this.minStack[:len(this.minStack)-1]
}

func (this *MinStack) Top() int {
	return this.stack[len(this.stack)-1]
}

func (this *MinStack) Min() int {
	return this.minStack[len(this.minStack)-1]
}

func min(x, y int) int {
	if x < y {
		return x
	} else {
		return y
	}
}

/**
 * Your MinStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(x);
 * obj.Pop();
 * param_3 := obj.Top();
 * param_4 := obj.Min();
 */
```


## 31 栈的压入、弹出序列

### 考点

medium 栈

### 题意

[题链](https://leetcode.cn/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/)

### 题解

```go
func validateStackSequences(pushed []int, popped []int) bool {
	mp := make(map[int]bool)
	var st []int
	idx := 0
	sz := len(pushed)
	for _, v := range popped {
		_, ok := mp[v]
		if ok {
			if st[len(st)-1] == v {
				st = st[:len(st)-1]
			} else {
				return false
			}
		} else {
			for idx < sz && pushed[idx] != v {
				st = append(st, pushed[idx])
				mp[pushed[idx]] = true
				idx++
			}
			//st = append(st, pushed[idx])
			mp[pushed[idx]] = true
			idx++
		}
	}
	return true
}
```


## 32-1 从上到下打印二叉树

### 考点

medium bfs

### 题意

[题链](https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/)

### 题解

注意特判空树

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func levelOrder(root *TreeNode) []int {
    if root == nil {
        return []int{}
    }
	var (
		ans []int
		queue []*TreeNode
	)
	queue = append(queue, root)
	for len(queue) != 0 {
		tmp := queue[0]
		queue = queue[1:]
		ans = append(ans, tmp.Val)
		if tmp.Left != nil {
			queue = append(queue, tmp.Left)
		}
		if tmp.Right != nil {
			queue = append(queue, tmp.Right)
		}
	}
	return ans
}
```


## 32-2 从上到下打印二叉树 II

### 考点

easy bfs

### 题意

[题链](https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/)

### 题解

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func levelOrder(root *TreeNode) [][]int {
    if root == nil {
        return [][]int{}
    }
	var (
		ans   [][]int
		queue []*TreeNode
	)
	queue = append(queue, root)
	sz := 1
	var nana []int
	for len(queue) != 0 {
		tmp := queue[0]
		queue = queue[1:]
		nana = append(nana, tmp.Val)
		sz--
		if tmp.Left != nil {
			queue = append(queue, tmp.Left)
		}
		if tmp.Right != nil {
			queue = append(queue, tmp.Right)
		}
		if sz == 0 {
			sz = len(queue)
			ans = append(ans, nana)
			nana = []int{}
		}
	}
	return ans
}
```


## 32-3 从上到下打印二叉树 III

### 考点

medium bfs

### 题意

[题链](https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/)

### 题解

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func levelOrder(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}
	var (
		ans   [][]int
		queue []*TreeNode
	)
	queue = append(queue, root)
	sz := 1
	var nana []int
	for len(queue) != 0 {
		tmp := queue[0]
		queue = queue[1:]
		nana = append(nana, tmp.Val)
		sz--
		if tmp.Left != nil {
			queue = append(queue, tmp.Left)
		}
		if tmp.Right != nil {
			queue = append(queue, tmp.Right)
		}
		if sz == 0 {
			sz = len(queue)
			ans = append(ans, nana)
			nana = []int{}
		}
	}
	rev := false
	for _, v := range ans {
		if rev {
			reverse(v)
		}
		rev = !rev
	}
	return ans
}

func reverse(x []int) {
	for i, j := 0, len(x)-1; i < j; i, j = i+1, j-1 {
		x[i], x[j] = x[j], x[i]
	}
}
```


## 33 二叉搜索树的后序遍历序列

### 考点

medium 单调栈、思维

### 题意

给定一个后序遍历序列，问是否可以还原成二叉搜索树

[题链](https://leetcode.cn/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/)

### 题解

用单调栈O(n)，递归O(n*n)

```go
func verifyPostorder(postorder []int) bool {
	var stack []int
	par := math.MaxInt64
	for i := len(postorder) - 1; i >= 0; i-- {
		if postorder[i] > par {
			return false
		}
		for len(stack) != 0 && postorder[i] < stack[len(stack) - 1] {
			par = stack[len(stack) - 1]
			stack = stack[:len(stack) - 1]
		}
		stack = append(stack, postorder[i])
	}
	return true
}
```


## 34 二叉树中和为某一值的路径

### 考点

medium dfs、深拷贝

### 题意

给一二叉树，求从根到叶子节点中权值和为target的路径

[题链](https://leetcode.cn/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/)

### 题解

dfs，注意深拷贝而不是回溯，时间复杂度是O(n^2)

注意go深拷贝数组的写法

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func pathSum(root *TreeNode, target int) [][]int {
	var ans [][]int
	if root == nil {
		return [][]int{}
	}
	cnt := []int{root.Val}
	var dfs func(*TreeNode, []int, int)
	dfs = func(node *TreeNode, path []int, val int) {
		if node.Left == nil && node.Right == nil {
			if val == target {
				ans = append(ans, path)
			} else {
				return
			}
		}
		if node.Left != nil {
			//var tmpPath []int
			//for _, v := range path {
			//	tmpPath = append(tmpPath, v)
			//}
			//tmpPath = append(tmpPath, node.Left.Val)
			tmpPath := make([]int, 0)
			tmpPath = append(tmpPath, path[:]...)
			tmpPath = append(tmpPath, node.Left.Val)
			dfs(node.Left, tmpPath, val+node.Left.Val)
		}
		if node.Right != nil {
			//var tmpPath []int
			//for _, v := range path {
			//	tmpPath = append(tmpPath, v)
			//}
			//tmpPath = append(tmpPath, node.Right.Val)
			tmpPath := make([]int, 0)
			tmpPath = append(tmpPath, path[:]...)
			tmpPath = append(tmpPath, node.Right.Val)
			dfs(node.Right, tmpPath, val+node.Right.Val)
		}
	}
	dfs(root, cnt, root.Val)
	return ans
}
```



## 35 复杂链表的复制

### 考点
medium 哈希表

### 题意

[题链](https://leetcode.cn/problems/fu-za-lian-biao-de-fu-zhi-lcof/)


### 题解

```go
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Next *Node
 *     Random *Node
 * }
 */

func copyRandomList(head *Node) *Node {
	if head == nil {
		return nil
	}
	mp := make(map[*Node]*Node)
	cnt := head
	s1mple := &Node{cnt.Val, nil, nil}
	for ; ; cnt, s1mple = cnt.Next, s1mple.Next {
		mp[cnt] = s1mple
		if cnt.Next != nil {
			s1mple.Next = &Node{cnt.Next.Val, nil, nil}
		} else {
			break
		}
	}
	cnt = head
	for ; cnt != nil; cnt = cnt.Next {
		mp[cnt].Random = mp[cnt.Random]
	}
	return mp[head]
}
```


## 36 二叉搜索树与双向链表

### 考点

medium 递归

### 题意

[题链](https://leetcode.cn/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/)

将一棵值不重复的二叉搜索树转化为双向链表，要求双向链表是单调递增的，要求原地转化，链表的左指针就是二叉树的左指针，右指针就是二叉树的右指针


### 题解

二叉搜索树的中序遍历是单调的

递归，对于一个节点，每次dfs左子树和右子树都返回子树的最左边节点（值最小的节点）和最右边的节点（值最大的节点），然后直接连边

lc没有go版本，可以去[nc](https://www.nowcoder.com/practice/947f6eb80d944a84850b0538bf0ec3a5?tpId=13&tqId=23253&ru=/practice/75e878df47f24fdc9dc3e400ec6058ca&qru=/ta/coding-interviews/question-ranking&sourceUrl=)

```go
package main
import . "nc_tools"
/*
 * type TreeNode struct {
 *   Val int
 *   Left *TreeNode
 *   Right *TreeNode
 * }
 */

func Convert(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}
	if root.Left == nil && root.Right == nil {
		return root
	}
	var dfs func(*TreeNode) (*TreeNode, *TreeNode)
	dfs = func(node *TreeNode) (*TreeNode, *TreeNode) {
		var Lmin, Lmax, Rmin, Rmax *TreeNode
		if node.Left != nil {
			Lmin, Lmax = dfs(node.Left)
			node.Left = Lmax
			Lmax.Right = node
		}
		if node.Right != nil {
			Rmin, Rmax = dfs(node.Right)
			node.Right = Rmin
			Rmin.Left = node
		}
		if Lmin == nil {
			Lmin = node
		}
		if Rmax == nil {
			Rmax = node
		}
		return Lmin, Rmax
	}
	dfs(root)
	Lnode := root
	for Lnode.Left != nil {
		Lnode = Lnode.Left
	}
	//Rnode := root
	//for Rnode.Right != nil {
	//	Rnode = Rnode.Right
	//}
	//Lnode.Left = Rnode
	//Rnode.Right = Lnode
	return Lnode
}
```

## 37 序列化二叉树

### 考点

hard bfs

### 题意

[题链](https://leetcode.cn/problems/xu-lie-hua-er-cha-shu-lcof/)

将二叉树序列化和反序列化，不管实现逻辑，只要能保证不同二叉树对应不同序列即可


### 题解

只要bfs层序遍历，多记一层的空节点

lc没有go版本，可在[nc](https://www.nowcoder.com/practice/cf7e25aa97c04cc1a68c8f040e71fb84?tpId=13&tqId=23455&ru=/practice/75e878df47f24fdc9dc3e400ec6058ca&qru=/ta/coding-interviews/question-ranking&sourceUrl=)

```go
package main
import . "nc_tools"
import (
	"strconv"
	"strings"
)
/*
 * type TreeNode struct {
 *   Val int
 *   Left *TreeNode
 *   Right *TreeNode
 * }
 */
func Serialize(root *TreeNode) string {
	if root == nil {
		return "#"
	}
	queue := make([]*TreeNode, 0)
	queue = append(queue, root)
	s := ""
	for len(queue) != 0 {
		tmp := queue[0]
		queue = queue[1:]
		if tmp == nil {
			s += ",#"
		} else {
			if tmp != root {
				s += ","
			}
			s += strconv.Itoa(tmp.Val)
		}
		if tmp != nil {
			queue = append(queue, tmp.Left)
			queue = append(queue, tmp.Right)
		}
	}
	return s
}

func Deserialize(s string) *TreeNode {
	if s == "#" {
		return nil
	}
	d := strings.Split(s, ",")
	val, _ := strconv.Atoi(d[0])
	root := &TreeNode{val, nil, nil}
	queue := make([]*TreeNode, 0)
    queue = append(queue, root)
	cnt := 1
	for len(queue) != 0 {
		tmp := queue[0]
		queue = queue[1:]
		left := d[cnt]
		right := d[cnt+1]
		cnt += 2
		if left != "#" {
			val, _ = strconv.Atoi(left)
			lnode := &TreeNode{val, nil, nil}
			tmp.Left = lnode
			queue = append(queue, lnode)
		}
		if right != "#" {
			val, _ = strconv.Atoi(right)
			rnode := &TreeNode{val, nil, nil}
			tmp.Right = rnode
			queue = append(queue, rnode)
		}
	}
	return root
}
```


## 38 字符串的排列

### 考点

medium 暴力枚举 回溯

### 题意

[题链](https://leetcode.cn/problems/zi-fu-chuan-de-pai-lie-lcof/)

给一个字符串，求字符串不相同的排列

### 题解

```go
func permutation(s string) []string {
	mp := make(map[byte]int)
	var ans []string
	for _, v := range s {
		mp[byte(v)]++
	}
	sz := len(s)
	var dfs func(string, map[byte]int)
	dfs = func(s string, m map[byte]int) {
		if len(s) == sz {
			ans = append(ans, s)
			return
		}
		for k, v := range m {
			if v != 0 {
				m[k]--
				dfs(s + string(k), m)
				m[k]++
			}
		}
	}
	dfs("", mp)
	return ans
}
```


## 39 数组中出现次数超过一半的数字

### 考点

easy 摩尔投票

### 题意

[题链](https://leetcode.cn/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/)


### 题解

时间复杂度O(n)，空间复杂度O(1)的做法是摩尔投票

```go
func majorityElement(nums []int) int {
	candidate := -1
	count := 0
	for _, v := range nums {
		if candidate == v {
			count++
		} else if count == 0 {
			candidate = v
			count = 1
		} else {
			count--
		}
	}
	return candidate
}
```


此题的[进阶版](https://leetcode.cn/problems/majority-element-ii/)是超过n/3的数字，理论上超过n/k的数字最多有k-1个

```go
func majorityElement(nums []int) []int {
	candidate1, candidate2 := math.MinInt64, math.MinInt64
	count1, count2 := 0, 0
	for _, v := range nums {
		if v == candidate1 {
			count1++
		} else if v == candidate2 {
			count2++
		} else if count1 == 0 {
			candidate1 = v
			count1 = 1
		} else if count2 == 0 {
			candidate2 = v
			count2 = 1
		} else {
			count1--
			count2--
		}
	}
	ans := make([]int, 0)
	count1, count2 = 0, 0
	for _, v := range nums {
		if v == candidate1 {
			count1++
		}
		if v == candidate2 {
			count2++
		}
	}
	if count1 > len(nums) / 3 {
		ans = append(ans, candidate1)
	}
	if count2 > len(nums) / 3 {
		ans = append(ans, candidate2)
	}
	return ans
}
```


## 40 最小的k个数

### 考点

easy 分治

### 题意

[题链](https://leetcode.cn/problems/zui-xiao-de-kge-shu-lcof/)

求数组最小的k个数


### 题解

很多种方法

时间复杂度期望为O(n)，空间复杂度为O(logn)的方法可以用快排的分治递归思想

[快排题](https://leetcode.cn/problems/array-partition/)代码如下


```go
func quicksort(a []int, l, r int) {
	if l < r {
		lo, hi := l, r
		for lo < hi {
			for lo < hi && a[hi] >= a[l] {
                hi--
            }
            for lo < hi && a[lo] <= a[l] {   //写<会超时
                lo++
            }
            a[lo], a[hi] = a[hi], a[lo]
		}
		a[lo], a[l] = a[l], a[lo]
		quicksort(a, l, lo-1)
		quicksort(a, lo+1, r)
	}
}

func arrayPairSum(nums []int) int {
	quicksort(nums, 0, len(nums) - 1)
	ans := 0
	for i, v := range nums {
		if i % 2 == 0 {
			ans += v
		}
	}
	return ans
}
```


本题代码如下

```go
func quicksort(a []int, l, r, k int) {
	if l < r {
		lo, hi := l, r
		for lo < hi {
			for lo < hi && a[hi] >= a[l] {
				hi--
			}
			for lo < hi && a[lo] <= a[l] {
				lo++
			}
			a[lo], a[hi] = a[hi], a[lo]
		}
		a[lo], a[l] = a[l], a[lo]
		if k == lo {
			return
		} else if lo < k {
			quicksort(a, lo+1, r, k)
		} else {
			quicksort(a, l, lo-1, k)
		}
	}
}

func getLeastNumbers(arr []int, k int) []int {
	quicksort(arr, 0, len(arr)-1, k)
	return arr[:k]
}
```


## 41 数据流中的中位数

### 考点

hard 堆

### 题意

[题链](https://leetcode.cn/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/)


### 题解

对顶堆，注意go的堆写法，用到container/heap接口

```go
type MedianFinder struct {
	minHeap *MinHeap
	maxHeap *MaxHeap
}

/** initialize your data structure here. */
func Constructor() MedianFinder {
	return MedianFinder{&MinHeap{}, &MaxHeap{}}
}

func (this *MedianFinder) AddNum(num int) {
	if this.maxHeap.Len() == 0 {
		heap.Push(this.maxHeap, num)
	} else {
		if num > this.maxHeap.IntSlice[0] {
			heap.Push(this.minHeap, num)
		} else {
			heap.Push(this.maxHeap, num)
		}
	}
	if this.maxHeap.Len() > this.minHeap.Len()+1 {
		heap.Push(this.minHeap, heap.Pop(this.maxHeap))
	}
	if this.minHeap.Len() > this.maxHeap.Len()+1 {
		heap.Push(this.maxHeap, heap.Pop(this.minHeap))
	}
}

func (this *MedianFinder) FindMedian() float64 {
	if this.maxHeap.Len() == this.minHeap.Len()+1 {
		return float64(this.maxHeap.IntSlice[0])
	} else if this.minHeap.Len() == this.maxHeap.Len() + 1 {
		return float64(this.minHeap.Heap.IntSlice[0])
	} else {
		return float64(this.minHeap.IntSlice[0] + this.maxHeap.IntSlice[0]) / 2
	}
}

type Heap struct {
	sort.IntSlice
}

type MinHeap struct {
	Heap
}

type MaxHeap struct {
	Heap
}

func (h *Heap) Push(v interface{}) {
	h.IntSlice = append(h.IntSlice, v.(int))
}

func (h *Heap) Pop() interface{} {
	a := h.IntSlice
	v := h.IntSlice[len(a)-1]
	h.IntSlice = a[:len(a)-1]
	return v
}

func (minHeap *MinHeap) Less(i, j int) bool {
	return minHeap.Heap.IntSlice[i] < minHeap.Heap.IntSlice[j]
}

func (maxHeap *MaxHeap) Less(i, j int) bool {
	return maxHeap.IntSlice[i] > maxHeap.IntSlice[j]
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * obj := Constructor();
 * obj.AddNum(num);
 * param_2 := obj.FindMedian();
 */
```


## 42 连续子数组的最大和


### 考点

easy dp

### 题意

[题链](https://leetcode.cn/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)

给一个数组，求所有子数组中，子数组元素和的最大值。子数组是连续的


### 题解

```go
func maxSubArray(nums []int) int {
	dp := nums[0]
	ans := dp
	max := func(x, y int) int {if x > y {return x } else {return y}}
	for i, v := range nums {
		if i == 0 {
			continue
		}
		dp = max(dp+v, v)
		ans = max(ans, dp)
	}
	return ans
}
```


## 43 1～n 整数中 1 出现的次数

### 考点

hard  数位dp 预处理 递归

### 题意

输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。

[题链](https://leetcode.cn/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/)


### 题解

预处理dp[i]表示小于等于i位数的1的个数

对于数n，比如它为114514，就可以先算1-99999中1的个数，然后计算100000-114514的1的个数，接下来算最高位的1，有14515个，最后递归算1-14514的1的个数

再比如7355608，可以先算1-999999的1的个数，然后计算1000000-7355608的1的个数，接下来算最高位1，有1000000个，再算2000000-7355608，这等价于递归算1-355608中1的个数

```go
func countDigitOne(n int) int {
	dp := make([]int, 11)
	dp[1] = 1
	for i := 2; i < 11; i++ {
		dp[i] += dp[i - 1]
		dp[i] += 9 * dp[i - 1] + int(math.Pow10(i - 1))
	}
	digitNum := func(n int) int {
		if n == 0 {return 1}
		res := 0
		for n != 0 {
			res++
			n /= 10
		}
		return res
	}
	var cal func(int) int
	min := func(x, y int) int {if x > y {return y} else {return x}}
	cal = func(n int) int {
		num := digitNum(n)
		if num == 1 {if n < 1 {return 0} else {return 1}}
		ans := dp[num - 1]
		tmp := n / int(math.Pow10(num - 1))
		tmp--
		ans += tmp * dp[num - 1]
		ans += min(n - int(math.Pow10(num - 1)) + 1, int(math.Pow10(num-1)))
		ans += cal(n % int(math.Pow10(num - 1 )))
		return ans
	}
	return cal(n)
}
```


## 44 数字序列中某一位的数字

### 考点

medium  预处理

### 题意

一个数字序列为123456789101112...，求第n位数字

[题链](https://leetcode.cn/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/)


### 题解

```go
func findNthDigit(n int) int {
	if n <= 9 {
		return n
	}
	f := make([]int, 14)
	f[1] = 9
	base10 := 10
	base1 := 2
	for i := 2; i < 11; i++ {
		f[i] = f[i-1]
		f[i] += 9 * base10 * base1
		base10 *= 10
		base1++
	}
	for i := 1; i < 14; i++ {
		if f[i] == n {
			return 9
		}
		if f[i] < n && f[i+1] > n {
			n -= f[i]
			a := n/(i+1) + int(math.Pow10(i))
			n %= i + 1
			if n == 0 {
				a--
				str := strconv.Itoa(a)
				str = str[len(str) - 1:]
				ret, _ := strconv.Atoi(str)
				return ret
			} else {
				str := strconv.Itoa(a)
				str = string(str[n-1])
				ret, _ := strconv.Atoi(str)
				return ret
			}
		}
	}
	return 0
}
```


## 45 把数组排成最小的数

### 考点

medium  排序

### 题意

把数组中的数进行排列，使得排列后的数按字符串形式组成新的数字，这个数字尽可能小

[题链](https://leetcode.cn/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/)


### 题解

排序，定义排序规则，判断字符串a和b的摆放顺序，如果a+b字典序小于b+a，那么a在前b在后

注意go的写法

```go
func minNumber(nums []int) string {
	sort.Slice(nums, func(i, j int) bool {
		return strconv.Itoa(nums[i]) + strconv.Itoa(nums[j]) < strconv.Itoa(nums[j]) + strconv.Itoa(nums[i])
	})
	ans := ""
	for _, v := range nums {
		ans += strconv.Itoa(v)
	}
	return ans
}
```


## 46 把数字翻译成字符串

### 考点

medium  dp

### 题意


给一个数字，0可以翻译成a，1可以翻译成b，25可以翻译成z，求有多少种翻译方式

[题链](https://leetcode.cn/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)


### 题解

```go
func translateNum(num int) int {
	dp, dp2 := 1, 1
	str := strconv.Itoa(num)
	for i := 1; i < len(str); i++ {
		if str[i - 1] > '2' || (str[i - 1] == '2' && str[i] > '5') || str[i - 1] == '0' {
			dp2 = dp
		} else {
			dp, dp2 = dp + dp2, dp
		}
	}
	return dp
}
```


## 47 礼物的最大价值

### 考点

medium  dp

### 题意


有一个网格，每个格子上有数字，从左上角走到右下角，每次只能往右和下走，求走过的数字和最大值

[题链](https://leetcode.cn/problems/li-wu-de-zui-da-jie-zhi-lcof/)


### 题解

```go
func maxValue(grid [][]int) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}
	n, m := len(grid), len(grid[0])
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, m)
	}
	max := func(x, y int) int {if x > y {return x} else {return y}}
	dp[0][0] = grid[0][0]
	for i := 1; i < n; i++ {
		dp[i][0] = dp[i - 1][0] + grid[i][0]
	}
	for i := 1; i < m; i++ {
		dp[0][i] = dp[0][i - 1] + grid[0][i]
	}
	for i := 1; i < n; i++ {
		for j := 1; j < m; j++ {
			dp[i][j] = max(dp[i][j - 1], dp[i - 1][j]) + grid[i][j]
		}
	}
	return dp[n - 1][m - 1]
}
```


## 48 最长不含重复字符的子字符串

### 考点

medium  尺取

### 题意



[题链](https://leetcode.cn/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/)


### 题解

```go
func lengthOfLongestSubstring(s string) int {
	if len(s) == 0 {
		return 0
	}
	mp := make(map[uint8]int)
	for i := 'a'; i <= 'z'; i++ {
		mp[uint8(i)] = 0
	}
	l, r := 0, 1
	mp[s[0]] = 1
	ans := 1
	max := func(x, y int) int {if x > y {return x} else {return y}}
	for r < len(s) {
		if mp[s[r]] > 0 {
			mp[s[l]]--
			l++
		} else {
            mp[s[r]]++
			r++
			ans = max(ans, r - l)
		}
	}
	return ans
}
```


## 49 丑数
### 考点

medium  堆

### 题意



[题链](https://leetcode.cn/problems/chou-shu-lcof/)


### 题解

注意go里面堆的写法在pop里是取最后一个元素，默认是小根堆（最小的元素在最后）less是注释的写法


```go
type Heap struct{ sort.IntSlice }

func (h *Heap) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *Heap) Pop() interface{} {
	a := h.IntSlice
	v := a[len(a)-1]
	h.IntSlice = a[:len(a)-1]
	return v
}
// func (h *Heap) Less(i, j int) bool {
// 	return h.IntSlice[i] < h.IntSlice[j]
// }

func nthUglyNumber(n int) int {
	mp := make(map[int]int)
	data := make([]int, 0)
	hp := &Heap{}
	heap.Push(hp, 1)
	mp[1] = 1
	for len(data) < 1700 {
		tmp := heap.Pop(hp).(int)
		data = append(data, tmp)
		if _, ok := mp[tmp*2]; !ok {
			mp[tmp*2] = 1
			heap.Push(hp, tmp*2)
		}
		if _, ok := mp[tmp*3]; !ok {
			mp[tmp*3] = 1
			heap.Push(hp, tmp*3)
		}
		if _, ok := mp[tmp*5]; !ok {
			mp[tmp*5] = 1
			heap.Push(hp, tmp*5)
		}
	}
	return data[n-1]
}
```


## 50 第一个只出现一次的字符

### 考点

easy  模拟 哈希

### 题意



[题链](https://leetcode.cn/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/)


### 题解

```go
func firstUniqChar(s string) byte {
	mp := make(map[byte]int)
	for i := 0; i < len(s); i++ {
		mp[s[i]]++
	}
	for i := 0; i < len(s); i++ {
		if mp[s[i]] == 1 {
			return s[i]
		}
	}
	return ' '
}
```

## 51  数组中的逆序对

### 考点

hard  树状数组、归并排序、离散化

### 题意

求数组中逆序对个数

[题链](https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)


### 题解

经典的就是归并排序求，但是这个细节太多不好写，树状数组思路比较直接

时间复杂度都为O(nlogn)，空间复杂度都为O(n)

归并排序

```go
func reversePairs(nums []int) int {
	n := len(nums)
	if n < 2 {return 0}
	tmp := make([]int, n)
	var crossCount func(int, int, int) int 
	crossCount = func(l int, mid int, r int) int {
		for i := l; i <= r; i++ {
			tmp[i] = nums[i]
		}
		res := 0
		ptrL, ptrR := l, mid + 1
		for i := l; i <= r; i++ {
			if ptrL == mid + 1 {
				 nums[i] = tmp[ptrR]
				 ptrR++
			} else if ptrR == r + 1 {
				nums[i] = tmp[ptrL]
				ptrL++
			} else if tmp[ptrL] <= tmp[ptrR] {
				nums[i] = tmp[ptrL]
				ptrL++
			} else {
				nums[i] = tmp[ptrR]
				ptrR++
				res += mid - ptrL + 1
			}
		}
		return res
	}
	var cal func(int, int) int
	cal = func(l int, r int) int {
		if l == r {return 0}
		mid := l + (r - l) / 2
		leftCount := cal(l, mid)
		rightCount := cal(mid + 1, r)
		if nums[mid] <= nums[mid + 1] {
			return leftCount + rightCount
		}
		return leftCount + rightCount + crossCount(l, mid, r)
	}
	return cal(0, n - 1)
}
```

树状数组

注意go的slice深拷贝的另一种方法b = append(b, a[:]...)

```go
type FenwickTree struct {
	// [1,n]
	bit []int
	n   int
}

func FenwickTreeConstructor(n int) FenwickTree {
	return FenwickTree{
		bit: make([]int, n+1),
		n:   n,
	}
}

func (ft *FenwickTree) sum(i int) int {
	s := 0
	for i > 0 {
		s += ft.bit[i]
		i -= i & -i
	}
	return s
}

func (ft *FenwickTree) add(i, x int) {
	for i <= ft.n {
		ft.bit[i] += x
		i += i & -i
	}
}

func reversePairs(nums []int) int {
	n := len(nums)
	tmp := make([]int, n)
	copy(tmp, nums)
	sort.Ints(tmp)
	for i, v := range nums {
		nums[i] = sort.SearchInts(tmp, v) + 1
	}
	fenwickTree := FenwickTreeConstructor(n)
	ans := 0
	for i := 0; i < n; i++ {
		ans += i - fenwickTree.sum(nums[i])
		fenwickTree.add(nums[i], 1)
	}
	return ans
}
```

## 52  两个链表的第一个公共节点

### 考点

easy  双指针

### 题意


[题链](https://leetcode.cn/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)


### 题解

哈希表做法的空间复杂度为O(n)。双指针，先求两链表谁更长，长的指针先移几格，然后上下指针同步移

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func getIntersectionNode(headA, headB *ListNode) *ListNode {
	lenA, lenB := 0, 0
	for i := headA; i != nil; i = i.Next {
		lenA++
	}
	for i := headB; i != nil; i = i.Next {
		lenB++
	}
	ptrA, ptrB := headA, headB
	if lenA > lenB {
		dif := lenA - lenB
		for dif > 0 {
			ptrA = ptrA.Next
			dif--
		}
	} else if lenB > lenA {
		dif := lenB - lenA
		for dif > 0 {
			ptrB = ptrB.Next
			dif--
		}
	}
	for ptrA != nil && ptrB != nil {
		if ptrA == ptrB {
			return ptrA
		} else {
			ptrA, ptrB = ptrA.Next, ptrB.Next
		}
	}
	return nil
}
```


## 53-1 在排序数组中查找数字 I

### 考点

easy  二分

### 题意
统计一个数字在排序数组中出现的次数。

[题链](https://leetcode.cn/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)


### 题解

注意细节

```go
func search(nums []int, target int) int {
    if len(nums) == 0 {
        return 0
    }
	i := sort.SearchInts(nums, target)
	if i == len(nums) || nums[i] != target {
		return 0
	} else {
		j := sort.SearchInts(nums, target + 1)
		return j - i
	}
}
```

手写二分

```go
func binarySearch(nums []int, target int) int {
	l, r := 0, len(nums) - 1
	for l <= r {
		mid := l + (r-l)/2
		if nums[mid] >= target {
			r = mid - 1
		} else {
			l = mid + 1
		}
	}
	return l
}

func search(nums []int, target int) int {
	if len(nums) == 0 {return 0}
	i := binarySearch(nums, target)
	if i == len(nums) || nums[i] != target {
		return 0
	} else {
		j := binarySearch(nums, target+1)
		return j - i
	}
}
```


## 53-2 0～n-1中缺失的数字

### 考点

easy  二分

### 题意


[题链](https://leetcode.cn/problems/que-shi-de-shu-zi-lcof/)


### 题解

```go
func missingNumber(nums []int) int {
	l, r := 0, len(nums)-1
	for l <= r {
		mid := l + (r-l)/2
		if nums[mid] == mid {
			l = mid + 1
		} else {
			r = mid - 1
		}
	}
	return l
}
```


## 54 二叉搜索树的第k大节点

### 考点

easy  dfs

### 题意


[题链](https://leetcode.cn/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)


### 题解

中序遍历

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func kthLargest(root *TreeNode, k int) int {
	nums := make([]int, 0)
	var dfs func(*TreeNode) 
	dfs = func(node *TreeNode) {
		if node.Left != nil {
			dfs(node.Left)
		}
		nums = append(nums, node.Val)
		if node.Right != nil {
			dfs(node.Right)
		}
	}
	dfs(root)
	return nums[len(nums) - k]
}
```


## 55-1 二叉树的深度

### 考点

easy  dfs/bfs

### 题意


[题链](https://leetcode.cn/problems/er-cha-shu-de-shen-du-lcof/)


### 题解

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func maxDepth(root *TreeNode) int {
	if root == nil {
		return 0
	}
	ans := 0
	max := func(x, y int) int {
		if x > y {
			return x
		} else {
			return y
		}
	}
	var dfs func(*TreeNode, int)
	dfs = func(node *TreeNode, i int) {
		ans = max(ans, i)
		if node.Left != nil {dfs(node.Left, i + 1)} 
		if node.Right != nil {dfs(node.Right, i + 1)}
	}
	dfs(root, 1)
	return ans
}
```

## 55-2  平衡二叉树


### 考点

easy  dfs

### 题意


[题链](https://leetcode.cn/problems/ping-heng-er-cha-shu-lcof/)


### 题解

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func isBalanced(root *TreeNode) bool {
	var dfs func(*TreeNode) int
	ans := true
	max := func(x, y int) int {if x > y {return x} else {return y}}
	dfs = func(node *TreeNode) int {
		if !ans {return 0}
		if node == nil {
			return 0
		}
		dl, dr := dfs(node.Left), dfs(node.Right)
		if dl-dr > 1 || dr-dl > 1 {
			ans = false
			return 0
		} else {
			return max(dl, dr) + 1
		}
	}
	dfs(root)
	return ans
}
```


## 56-1 数组中数字出现的次数

### 考点

medium  位运算、异或、思维

### 题意

有一个数组，数组中有两个数各出现一次，其他数各出现两次，求出现一次的两个数，要求时间复杂度O(n)，空间复杂度O(1)

[题链](https://leetcode.cn/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/)


### 题解

假设两个数为x和y，所有数异或得到x和y的异或值z，找到z的二进制表示的任意一位1，x和y在该位上一定是不同的，假设x在该位上是0，y在该位上是1。分类，遍历数组，把该位为0的放在一起异或，该位为1的放在一起异或，分别得到x和y

```go
func singleNumbers(nums []int) []int {
	a := 0
	for _, v := range nums {
		a ^= v
	}
	i := 0
	for a >> i & 1 == 0 {
		i++		
	}
	x, y := 0, 0
	for _, v := range nums {
		if v >> i & 1 == 0 {
			x ^= v
		} else {
			y ^= v
		}
	}
	return []int{x, y}
}
```


## 56-2 数组中数字出现的次数 II

### 考点

medium  位运算、思维

### 题意

有一个数组，数组中有一个数出现一次，其他数各出现三次，求出现一次的数，要求时间复杂度O(n)，空间复杂度O(1)

[题链](https://leetcode.cn/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/)


### 题解

[参考此处的视频题解](https://leetcode.cn/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/solution/shu-ju-jie-gou-he-suan-fa-san-chong-jie-4b9se/)

```go
func singleNumber(nums []int) int {
	arr := make([]int, 32)
	for _, v := range nums {
		for j := 0; j < 32; j++ {
			if v >> j & 1 == 1 {
				arr[j]++
			}
		}
	}
	ans := 0
	for i := 0; i < 32; i++ {
		if arr[i] % 3 != 0 {
			ans |= (1 << i)
		}
	}
	return ans
}
```

## 57 和为s的两个数字

### 考点

easy  双指针

### 题意

给一个递增数组，找两个数和为s，要求时间复杂度O(n)，空间复杂度O(1)

[题链](https://leetcode.cn/problems/he-wei-sde-liang-ge-shu-zi-lcof/)


### 题解

哈希表时间复杂度和空间复杂度都为O(n)，因为序列有序，用双指针空间复杂度为O(1)

```go
func twoSum(nums []int, target int) []int {
	ptrL, ptrR := 0, len(nums)-1
	for ptrL < ptrR {
		tmp := nums[ptrL] + nums[ptrR]
		if tmp == target {
			return []int{nums[ptrL], nums[ptrR]}
		} else if tmp > target {
			ptrR--
		} else {
			ptrL++
		}
	}
	return nil
}
```


## 57-2 和为s的连续正数序列


### 考点

easy  双指针

### 题意


[题链](https://leetcode.cn/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/)


### 题解

```go
func findContinuousSequence(target int) [][]int {
	ptrL, ptrR := 1, 2
	sum := 1
	ans := make([][]int, 0)
	for ptrL < ptrR && ptrR < target/2+3 {
		if sum == target {
			tmp := make([]int, 0)
			for i := ptrL; i < ptrR; i++ {
				tmp = append(tmp, i)
			}
			ans = append(ans, tmp)
            sum += ptrR
            sum -= ptrL
            ptrR++
            ptrL++
		} else if sum < target {
			sum += ptrR
			ptrR++
		} else {
			sum -= ptrL
			ptrL++
		}
	}
	return ans
}
```


## 58-1 翻转单词顺序

### 考点

easy  模拟

### 题意


[题链](https://leetcode.cn/problems/fan-zhuan-dan-ci-shun-xu-lcof/)


### 题解

```go
func reverseWords(s string) string {
	strs := make([]string, 0)
	tmp := ""
	for i := 0; i < len(s); i++ {
		if s[i] == ' ' {
			if tmp != "" {
				strs = append(strs, tmp)
				tmp = ""
			}
		} else {
			tmp += string(s[i])
		}
	}
	if tmp != "" {
		strs = append(strs, tmp)
	}
	if len(strs) == 0 {
		return ""
	}
	ans := ""
	ans += strs[len(strs) - 1]
	for i := len(strs) - 2; i >= 0; i-- {
		ans += " "
		ans += strs[i]
	}
	return ans
}
```


## 58-2 左旋转字符串

### 考点

easy  模拟

### 题意


[题链](https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)


### 题解

```go
func reverseLeftWords(s string, n int) string {
	ans := ""
	for i := n; len(ans) < len(s); i++ {
		ans += string(s[i % len(s)])
	}
	return ans
}
```


## 59-1 滑动窗口的最大值

### 考点

hard  双端队列

### 题意


[题链](https://leetcode.cn/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/)


### 题解

[参考此处](https://blog.csdn.net/u010429424/article/details/73692248)


```go
func maxSlidingWindow(nums []int, k int) []int {
	if len(nums) == 0 {
		return []int{}
	}
	n := len(nums)
	ans := make([]int, n-k+1)
	deque := make([]int, 0)
	for i := 0; i < n; i++ {
		if len(deque) != 0 && deque[0] <= i - k {
			deque = deque[1:]
		}
		for len(deque) != 0 && nums[deque[len(deque) - 1]] <= nums[i] {
			deque = deque[0:len(deque) - 1]
		}
		deque = append(deque, i)
		if i >= k - 1 {
			ans[i - k + 1] = nums[deque[0]]
		}
	}
	return ans
}
```


## 59-2 队列的最大值

### 考点

medium  双端队列

### 题意

求动态队列的最大值


[题链](https://leetcode.cn/problems/dui-lie-de-zui-da-zhi-lcof/)


### 题解

和上一题类似，此处deque存的是值，不是下标。对于pop操作，需要判断deque的队首和pop出的元素是否相等，相等就说明最大值被pop了（此时可能后面还有最大值，所以deque存的是非严格的递减序列，保证最大值存了多个，例如：55543）

```go
type MaxQueue struct {
	deque []int
	queue []int
}

func Constructor() MaxQueue {
	return MaxQueue{
		queue: make([]int, 0),
		deque: make([]int, 0),
	}
}

func (this *MaxQueue) Max_value() int {
	if len(this.deque) == 0 {
		return -1
	}
	return this.deque[0]
}

func (this *MaxQueue) Push_back(value int) {
	this.queue = append(this.queue, value)
	for len(this.deque) != 0 && this.deque[len(this.deque)-1] < value {
		this.deque = this.deque[0 : len(this.deque)-1]
	}
	this.deque = append(this.deque, value)
}

func (this *MaxQueue) Pop_front() int {
	if len(this.queue) == 0 {
		return -1
	}
	ret := this.queue[0]
	this.queue = this.queue[1:]
	if ret == this.deque[0] {
		this.deque = this.deque[1:]
	}
	return ret
}


/**
 * Your MaxQueue object will be instantiated and called as such:
 * obj := Constructor();
 * param_1 := obj.Max_value();
 * obj.Push_back(value);
 * param_3 := obj.Pop_front();
 */
```


## 60 n个骰子的点数

### 考点

medium  dp

### 题意

输入n，求n个骰子掷出所有点数的概率


[题链](https://leetcode.cn/problems/nge-tou-zi-de-dian-shu-lcof/)


### 题解

暴力超时，dp，dp[i][j]表示仍i个骰子，和为j的概率

```go
func dicesProbability(n int) []float64 {
	dp := make([][]float64, 15)
	for i := range dp {
		dp[i] = make([]float64, 70)
	}
	dp[0][0] = 1
	for i := 1; i < 12; i++ {
		for j := i; j <= 6*i; j++ {
			for k := 1; k <= 6; k++ {
				if j-k >= 0 {
					dp[i][j] += dp[i-1][j-k] / 6
				}
			}
		}
	}
	ans := make([]float64, 0)
	for i := n; i <= 6 * n; i++ {
		ans = append(ans, dp[n][i])
	}
	return ans
}
```


## 61  扑克牌中的顺子

### 考点

easy  模拟、思维

### 题意

判断给定的5张排是不是顺子，大小王可以当作任意排

[题链](https://leetcode.cn/problems/bu-ke-pai-zhong-de-shun-zi-lcof/)


### 题解

```go
func isStraight(nums []int) bool {
	mn, mx := 100, -1
	min := func(x, y int) int {
		if x < y {
			return x
		} else {
			return y
		}
	}
	max := func(x, y int) int {
		if x > y {
			return x
		} else {
			return y
		}
	}
	mp := make(map[int]int)
	for _, v := range nums {
		if v == 0 {
			continue
		}
		mn = min(mn, v)
		mx = max(mx, v)
		mp[v]++
	}
	for _, v := range mp {
		if v > 1 {
			return false
		}
	}
	return mx-mn <= 4
}
```


## 62 圆圈中最后剩下的数字

### 考点

easy  思维、数论

### 题意

经典的约瑟夫环，有n个人，循环报数，报到m的倍数的人退出，求最后剩下的人


[题链](https://leetcode.cn/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/)


### 题解


递归的做法是，假设这个答案为f(n, m)

首先第一个退出的人是第m%n个（此处如果m%n为0就是第n个），递归求f(n-1,m)，假设为x

对于n-1个数最后剩的是第x个，那么对于n个数最后剩的就是(m+x)%n个

![在这里插入图片描述](https://img-blog.csdnimg.cn/f1e7523c0ceb40809b8d15a024051830.png)

递归退出条件是n=1时，返回0（第一个数）（此题第一个数是0，如果是1，返回1）


```go
func lastRemaining(n int, m int) int {
	if n == 1 {return 0}
	x := lastRemaining(n - 1, m)
	return (x + m) % n
}
```


用迭代代替递归，将空间复杂度降到O(1)，迭代的写法从dfs最底层倒推，即f(1,m)->f(2,m)->f(3,m)->f(n,m)

```go
func lastRemaining(n int, m int) int {
	ans := 0
	for i := 2; i <= n; i++ {
		ans = (ans + m) % i
	}
	return ans
}
```


## 63 股票的最大利润

### 考点

medium  遍历、思维

### 题意

求数组中一个数减另一个数的最大值，要求大的数在小的数右边


[题链](https://leetcode.cn/problems/gu-piao-de-zui-da-li-run-lcof/)


### 题解

前后缀最大最小值，空间复杂度O(n)

直接遍历数组，在更新最小值时，更新最大值，保证最大值在最小值右边，空间复杂度O(1)


```go
func maxProfit(prices []int) int {
    if len(prices) == 0 {return 0}
	mn, mx := math.MaxInt64, -1
	max := func(x, y int) int {
		if x > y {
			return x
		} else {
			return y
		}
	}
	ans := -1
	for _, v := range prices {
		if v < mn {
			mn = v
			mx = mn
		} else {
			mx = max(mx, v)
		}
        ans = max(ans, mx - mn)
	}
	return ans
}

// [2,4,1]
// wa 0
// ac 2
```


## 64 求1+2+…+n

### 考点

medium  思维

### 题意

求 1+2+...+n ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。


[题链](https://leetcode.cn/problems/qiu-12n-lcof/)


### 题解

递归

```go
func sumNums(n int) int {
	if n == 1 {return 1}
	return n + sumNums(n - 1)
}
```

还可以用快速乘，把循环全部打开，最多只要14层循环


## 65 不用加减乘除做加法

### 考点

easy  位运算

### 题意


[题链](https://leetcode.cn/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/)


### 题解

模拟位运算，此处题意说可能出现负数，但实际上因为计算机中数的表示是补码形式，所以可以当作只考虑整数

如果没有进位，只要异或即可

有进位，需要在异或之后再加上进位

但是加上进位又可能产生进位，所以需要循环做这些事，直到进位为0

进位为何最后会为0？进位的求法是(a & b) << 1，只有同位都为1会产生进位，因为进位在前一位，所以左移一位。由于进位的求法是与操作，只有该位为1，结果才可能为1，而“暂时”的求和是异或操作，产生进位需要1和1,1和1异或为0，0再和原数的1与操作会变成0，相当于不断抵消1，所以进位1的数量会一直减少，直到没有

```go
func add(a int, b int) int {
	var carry int 
	for b != 0 {
		carry = (a & b) << 1
		a ^= b
		b = carry
	}
	return a
}
```



## 66 构建乘积数组

### 考点

medium 前后缀、思维

### 题意

给一个数组A，求数组B，其中B[i]是A中除了i位置的元素积

[题链](https://leetcode.cn/problems/gou-jian-cheng-ji-shu-zu-lcof/)


### 题解

前后缀积时间复杂度和空间复杂度为O(n)

可以先求前缀积再求后缀积，求的过程把当前积乘给对应的B[i]，空间复杂度为O(1)

```go
func constructArr(a []int) []int {
	if len(a) == 0 {
		return []int{}
	}
	n := len(a)
	ans := make([]int, n)
	for i := range ans {
		ans[i] = 1
	}
	product := 1
	for i := 1; i < len(a); i++ {
        product *= a[i - 1]
		ans[i] *= product
	}
	product = 1
	for i := len(a) - 2; i >= 0; i-- {
        product *= a[i + 1]
		ans[i] *= product
	}
	return ans
}
```


## 67 把字符串转换成整数

### 考点

medium 模拟

### 题意



[题链](https://leetcode.cn/problems/ba-zi-fu-chuan-zhuan-huan-cheng-zheng-shu-lcof/)


### 题解

模拟，注意细节（溢出和前导0）。或者状态机

```go
func strToInt(str string) int {
	if len(str) == 0 {
		return 0
	}
	positive := true
	for len(str) != 0 && str[0] == ' ' {
		str = str[1:]
	}
	if len(str) == 0 {
		return 0
	}
	if !(str[0] == '+' || str[0] == '-' || (str[0] >= '0' && str[0] <= '9')) {
		return 0
	}
	if str[0] == '-' {
		positive = false
		str = str[1:]
	} else if str[0] == '+' {
		str = str[1:]
	}
	if len(str) == 0 || str[0] < '0' || str[0] > '9' {
		return 0
	}
	numStr := ""
	for len(str) != 0 && str[0] >= '0' && str[0] <= '9' {
		numStr += string(str[0])
		str = str[1:]
	}

    for len(numStr) != 0 && numStr[0] == '0' {    // 在这里去掉前导0
        numStr = numStr[1:]
    }

    if len(numStr) > 12 {   // 在这里就判断是否溢出
        if positive {
            return math.MaxInt32
        } else {
            return math.MinInt32
        }
    }

	ans, base := 0, 1
	for i := len(numStr) - 1; i >= 0; i-- {
		ans += base * int(numStr[i]-'0')
		base *= 10
	}
	if positive {
		if ans > math.MaxInt32 {    // 增加len(numStr) > 12 防因溢出而判断失败，判断条件为len(numStr) > 12 || ans > math.MaxInt32，但这样无法通过注释2，因为base超了
			return math.MaxInt32
		} else {
			return ans
		}
	} else {
		if -ans < math.MinInt32 {
			return math.MinInt32
		} else {
			return -ans
		}
	}
}

// overflow maxint is 9223372036854775807
// "9223372036854775808" 
// wa -9223372036854775808
// ac 2147483647

// "  0000000000012345678"
// wa 2147483647
// ac 12345678
```


## 68-1 二叉搜索树的最近公共祖先

### 考点

easy 二叉树

### 题意



[题链](https://leetcode.cn/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/)


### 题解

二叉搜索树的lca一定是介于两个数之间

lc没有go，在[nc](https://www.nowcoder.com/practice/d9820119321945f588ed6a26f0a6991f?tpId=13&tqId=2290592&ru=/practice/947f6eb80d944a84850b0538bf0ec3a5&qru=/ta/coding-interviews/question-ranking&sourceUrl=)上可以测试

```go
package main
import . "nc_tools"
/*
 * type TreeNode struct {
 *   Val int
 *   Left *TreeNode
 *   Right *TreeNode
 * }
 */

func lowestCommonAncestor(root *TreeNode, p int, q int) int {
	cnt := root
	for true {
		if (cnt.Val >= p && cnt.Val <= q) || (cnt.Val >= q && cnt.Val <= p) {
			return cnt.Val
		} else if cnt.Val > p && cnt.Val > q {
			cnt = cnt.Left
		} else {
			cnt = cnt.Right
		}
	}
	return 0
}
```


## 68-2 二叉树的最近公共祖先

### 考点

easy 二叉树

### 题意



[题链](https://leetcode.cn/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/)


### 题解

维护节点的父节点和深度，往上搜索时，先将深度持平，然后同步向上爬，直到相同


如果是多次求lca，可以倍增预处理

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	depth := make(map[*TreeNode]int)
	par := make(map[*TreeNode]*TreeNode)
	depth[nil] = -1
	var dfs func(*TreeNode, *TreeNode)
	dfs = func(node, pa *TreeNode) {
		depth[node] = depth[pa] + 1
		par[node] = pa
		if node.Left != nil {
			dfs(node.Left, node)
		}
		if node.Right != nil {
			dfs(node.Right, node)
		}
	}
	dfs(root, nil)
	for depth[p] > depth[q] {
		p = par[p]
	}
	for depth[q] > depth[p] {
		q = par[q]
	}
	for p != q {
		p = par[p]
		q = par[q]
	}
	return p
}
```


