# 每日一题 (LeetCode)



> 在这篇文章下更新LeetCode的每日一题，之所以选择LeetCode，是因为好像只有它有每日一题版块，每日一题并不是为了提高编程水平，而是保持手感，从10月2日开始更新，应该过几天批量更新一次

##  进制转化 Easy

### 题意

[题链](https://leetcode-cn.com/problems/convert-a-number-to-hexadecimal/)

把一个有符号数数转化成16进制，不能使用内置函数

### 题解

注意无符号数的转化

```java
class Solution {
    public String toHex(int num) {
        if (num == 0) return "0";
        long NUM = num & 0xffffffffl;
        StringBuffer sb = new StringBuffer();
        while (NUM != 0) {
            long tmp = NUM & 0xf;
            if (tmp > 9) sb.append((char)('a' + tmp - 10));
            else sb.append((char)('0' + tmp));
            NUM >>= 4;
        }
        return sb.reverse().toString();
    }
}
```

## 模拟，哈希表 Medium

### 题意

[题链](https://leetcode-cn.com/problems/fraction-to-recurring-decimal/)

给定分数的分子和分母，求小数形式，如有循环节则标出

### 题解

注意long类型的转化

```java
class Solution {
    public String fractionToDecimal(int numerator, int denominator) {
        if (numerator == 0) return "0";
        boolean neg = (numerator < 0) ^ (denominator < 0);
        long NUM = Math.abs((long)numerator);
        long DEN = Math.abs((long)denominator);
        long interger = NUM / DEN;
        NUM %= DEN;
        Map<Long, Boolean> mp = new HashMap<Long, Boolean>();
        if (NUM == 0) {
            StringBuffer sb = new StringBuffer();
            if (neg) sb.append('-');
            sb.append(String.valueOf(interger));
            return sb.toString();
        }
        List<long []> ans = new ArrayList<long []>();
        long loop = 0;
        long remaider = NUM;

        while (true) {
            if (remaider == 0) break;
            if (mp.containsKey(remaider)) {
                loop = remaider;
                break;
            }
            mp.put(remaider, true);
            long tmp = remaider * 10 / DEN;
            long a[] = new long[2];
            a[0] = tmp;
            a[1] = remaider;
            ans.add(a);
            remaider = remaider * 10 % DEN;
        }
        StringBuffer sb = new StringBuffer();
        if (neg) sb.append('-');
        sb.append(String.valueOf(interger));
        sb.append('.');
        boolean circle = false;
        for (long [] i : ans) {
            if (i[1] == loop) {
                circle = true;
                sb.append('(');
            }
            sb.append((char)('0' + i[0]));
        }
        if (circle) sb.append(')');
        return sb.toString();
    }
}
```


## 模拟 Easy

### 题意

[题链](https://leetcode-cn.com/problems/license-key-formatting/)



### 题解

```java
class Solution {
    public String licenseKeyFormatting(String s, int k) {
        int sum = 0;
        for (int i = 0; i < s.length(); ++i) {
            if (s.charAt(i) != '-') sum++;
        }
        if (sum == 0) {
            return "";
        }
        int rem = sum % k;
        if (rem == 0) rem = k;
        StringBuilder sb = new StringBuilder();
        int cnt = 0;
        while (cnt < s.length()) {
            while (rem > 0) {
                if (s.charAt(cnt) == '-') {
                    cnt++;
                    continue;
                }
                sb.append(s.charAt(cnt));
                rem--;
                cnt++;
            }
            if (cnt >= s.length()) break;
            sb.append('-');
            int kk = k;
            while (kk > 0) {
                if (s.charAt(cnt) == '-') {
                    cnt++;
                    if (cnt >= s.length()) break;
                    continue;
                }
                sb.append(s.charAt(cnt));
                cnt++;
                kk--;
            }
        }
        for (int i = 0; i < sb.length(); ++i) {
            if (Character.isAlphabetic(sb.charAt(i))) {
                sb.setCharAt(i, Character.toUpperCase(sb.charAt(i)));
            }
        }
        if (sb.charAt(sb.length() - 1) == '-') sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }
}
```


## dp Hard

### 题意

[题链](https://leetcode-cn.com/problems/decode-ways-ii/)

### 题解

```java
class Solution {
    private static final int mod = 1000000007;
    public int numDecodings(String s) {
        int sz = s.length();
        StringBuilder sb = new StringBuilder(s);
        sb.insert(0, '#');
        long dp[] = new long[sz + 1];
        dp[0] = 1;
        char cnt = sb.charAt(1);
        if (cnt == '*') {
            dp[1] = 9;
        }else {
            if (cnt == '0') dp[1] = 0;
            else dp[1] = 1;
        }
        for (int i = 2; i <= sz; ++i) {
            cnt = sb.charAt(i);
            if (cnt == '*') {
                dp[i] += 9 * dp[i - 1];
                dp[i] %= mod;
                char pre = sb.charAt(i - 1);
                if (pre == '*') {
                    dp[i] += 15 * dp[i - 2];
                    dp[i] %= mod;
                }else { // num
                    if (pre == '1') {
                        dp[i] += 9 * dp[i - 2];
                        dp[i] %= mod;
                    }else if (pre == '2') {
                        dp[i] += 6 * dp[i - 2];
                        dp[i] %= mod;
                    }
                }
            }else { // num
                if (cnt == '0') {
                    char pre = sb.charAt(i - 1);
                    if (pre == '*') {
                        dp[i] += 2 * dp[i - 2];
                        dp[i] %= mod;
                    }else {
                        if (pre == '1' || pre == '2') {
                            dp[i] += dp[i - 2];
                            dp[i] %= mod;
                        }else return 0;
                    }
                    continue;
                }

                dp[i] += dp[i - 1];
                dp[i] %= mod;
                char pre = sb.charAt(i - 1);
                if (pre == '*') {
                    if (cnt > '6') {
                        dp[i] += dp[i - 2];
                        dp[i] %= mod;
                    }else {
                        dp[i] += 2 * dp[i - 2];
                        dp[i] %= mod;
                    }
                }else {
                    StringBuilder str = new StringBuilder();
                    str.append(pre);
                    str.append(cnt);
                    if (str.compareTo(new StringBuilder("10")) >= 0 && str.compareTo(new StringBuilder("26")) <= 0) {
                        dp[i] += dp[i - 2];
                        dp[i] %= mod;
                    }
                }
            }
        }
        
        return (int) dp[sz];
    }
}
```

 
## 贪心 Hard

###  题意

[题链](https://leetcode-cn.com/problems/super-washing-machines/)

### 题解

```java
class Solution {
    public int findMinMoves(int[] machines) {
        int ans = 0;
        int sum = 0;
        for (int i : machines) sum += i;
        int sz = machines.length;
        if (sum % sz != 0) return -1;
        int avg = sum / sz;
        for (int i = 0; i < machines.length; ++i) {
            machines[i] = machines[i] - avg;
        }
        sum = 0;
        for (int i : machines) {
            sum += i;
            ans = Math.max(ans, Math.max(i, Math.abs(sum)));
        }
        return ans;
    }
}
```


## 迭代器的了解 Medium

### 题意

[题链](https://leetcode-cn.com/problems/peeking-iterator/)

分析样例感觉题目说的有点不清楚，具体方法的功能写在注释里

### 题解

泛型就直接用E代替Integer

```java
// Java Iterator interface reference:
// https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html

class PeekingIterator implements Iterator<Integer> {
    private Iterator<Integer> ite;
    private Integer currentElement;

    public PeekingIterator(Iterator<Integer> iterator) {
        // initialize any member here.
        ite = iterator;
        currentElement = ite.next();
    }

    // Returns the next element in the iteration without advancing the iterator.
    // Coder's note: return the current element, starting from the first one
    public Integer peek() {
        return currentElement;
    }

    // hasNext() and next() should behave the same as in the Iterator interface.
    // Override them if needed.
    // CN: return the current element and advance the iterator
    @Override
    public Integer next() {
        Integer tmp = currentElement;
        currentElement = ite.hasNext() ? ite.next() : null;
        return tmp;
    }

    //CN: return if the current element exist
    @Override
    public boolean hasNext() {
        return currentElement != null;
    }
}
```



## 小模拟 Easy

### 题意

[题链](https://leetcode-cn.com/problems/third-maximum-number/)

求数组第三大的数

### 题解

```java
class Solution {
    public int thirdMax(int[] nums) {
        TreeSet<Integer> ts = new TreeSet<>();
        for (int i : nums) {
            ts.add(i);
            if (ts.size() > 3) {
                ts.remove(ts.first());
            }
        }
        return (ts.size() == 3) ? ts.first() : ts.last();
    }
}
```



## 小模拟 Easy

### 题意

[题链](https://leetcode-cn.com/problems/number-of-segments-in-a-string/)

求字符串有多少个单词，单词是由没有空格的连续字符组成的字符串

### 题解

```java
class Solution {
    public int countSegments(String s) {
        int ans = 0;
        boolean word = false;
        for (int i = 0; i < s.length(); ++i) {
            if (s.charAt(i) != ' ') {
                word = true;
            }else {
                if (word == true) {
                    word = false;
                    ans++;
                }
            }
        }
        if (word) ++ans;
        return ans;
    }
}
```

## 哈希表 Medium

### 题意

[题链](https://leetcode-cn.com/problems/repeated-dna-sequences/)

查找字符串中长度为10且不止出现过一次的子串

### 题解

```java
class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        HashMap<String, Integer> mp = new HashMap<>();
        StringBuilder sb = new StringBuilder();
        List<String> ans = new ArrayList<>();
        if (s.length() < 10) return ans;
        for (int i = 0; i < 10; i++) {
            sb.append(s.charAt(i));
        }
        mp.put(sb.toString(), 1);
        for (int i = 10; i < s.length(); ++i) {
            sb.append(s.charAt(i));
            sb.deleteCharAt(0);
            if (mp.containsKey(sb.toString()) && mp.get(sb.toString()) == 1) {
                ans.add(sb.toString());
                mp.put(sb.toString(), mp.get(sb.toString()) + 1);
            }else if (!mp.containsKey(sb.toString())) {
                mp.put(sb.toString(), 1);
            }
        }
        return ans;
    }
}
```

## 分类讨论 Hard

### 题意

[题链](https://leetcode-cn.com/problems/data-stream-as-disjoint-intervals/)

编写一个类的三个函数，初始化、添加一个元素、查找当前所有元素由几个区间组成（输出区间）

### 题解

考虑合并，插入一个元素后能否和左边的数合并成一个区间、 能否和右边的数合并，分成4种情况

```java
class SummaryRanges {

    private TreeMap<Integer, Integer> mp;
    int[] left;
    boolean[] used;

    public SummaryRanges() {
        mp = new TreeMap<>();
        used = new boolean[10005];
        left = new int[10005];
    }

    public void addNum(int val) {
        if (used[val]) return;
        used[val] = true;
        if (val - 1 >= 0 && used[val - 1]) { // exist left number
            if (used[val + 1]) {    // exist left number and right number
                int tmp_left = left[val - 1];
                int tmpsz = mp.get(tmp_left);
                tmpsz = tmpsz + 1 + mp.get(val + 1);
                left[val + mp.get(val + 1)] = tmp_left;
                mp.remove(val + 1);
                mp.put(tmp_left, tmpsz);
            }else { // exist left number but not right number
                int tmp_left = left[val - 1];
                left[val] = tmp_left;
                mp.put(tmp_left, mp.get(tmp_left) + 1);
            }
        }else { // val == 0 or not exitst left number
            if (used[val + 1]) {    // not exist left number but exist right number
                left[val + mp.get(val + 1)] = val;
                mp.put(val, mp.get(val + 1) + 1);
                mp.remove(val + 1);
            }else {     // both left and right number are not exist
                left[val] = val;
                mp.put(val, 1);
            }
        }
    }

    public int[][] getIntervals() {
        int[][] ans = new int[mp.size()][2];
        int id = 0;
        for (Map.Entry<Integer, Integer> entry : mp.entrySet()) {
            ans[id][0] = entry.getKey();
            ans[id][1] = entry.getValue() + ans[id][0] - 1;
            id++;
        }
        return ans;
    }
}

/**
 * Your SummaryRanges object will be instantiated and called as such:
 * SummaryRanges obj = new SummaryRanges();
 * obj.addNum(val);
 * int[][] param_2 = obj.getIntervals();
 */
```


##  二分 Easy

### 题意

[题链](https://leetcode-cn.com/problems/arranging-coins/)

n个硬币按阶梯式排列，求最后一层被排满的阶梯

### 题解

```java
class Solution {
    public int arrangeCoins(int n) {
        long l = 1, r = n;
        while (l <= r) {
            long mid = (l + r) >> 1;
            if ((1 + mid) * mid / 2 <= n) {
                l = mid + 1;
            }else r = mid - 1;
        }
        return (int)(l - 1);
    }
}
```

## 模拟 Hard

### 题意

[题链](https://leetcode-cn.com/problems/integer-to-english-words/)

把数字转化成英文

### 题解

注意特判0，注意20

```java
class Solution {
    String[] thousand = {"Billion", "Million", "Thousand", ""};
    String[] number = {"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"};
    String[] ty = {"", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};
    String[] teen = {"Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};
    public String numberToWords(int num) {
        if (num == 0) return "Zero";
        StringBuilder sb = new StringBuilder();
        for (int i = 1000000000, j = 0; num != 0; i /= 1000, j++) {
            if (i == 1) { // 3-digital number
                if (num >= 100) {
                    sb.append(number[num / 100]);
                    sb.append(' ');
                    sb.append("Hundred");
                    sb.append(' ');
                    num %= 100;
                }
                if (num >= 20) {
                    sb.append(ty[num / 10]);
                    sb.append(' ');
                    num %= 10;
                }
                if (num == 0) break;
                if (num < 10) {
                    sb.append(number[num]);
                    sb.append(' ');
                }else {
                    sb.append(teen[num - 10]);
                    sb.append(' ');
                }
                break;
            }
            if (num >= i) {
                sb.append(numberToWords(num / i));
                sb.append(' ');
                sb.append(thousand[j]);
                sb.append(' ');
                num %= i;
            }
        }
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }
}
```


##  二分、快速乘 Medium

### 题意

[题链](https://leetcode-cn.com/problems/divide-two-integers/)


求一个数除以另一个数的结果（保留整数部分），不能使用乘法、除法、模运算


### 题解

用快速乘的加法代替乘法，注意特判溢出

```java
class Solution {
    public int divide(int dividend, int divisor) {
        boolean neg = (dividend > 0) ^ (divisor > 0);
        long tmp_dividend = dividend;
        long tmp_divisor = divisor;
        tmp_dividend = Math.abs(tmp_dividend);
        tmp_divisor = Math.abs(tmp_divisor);
        long l = 0, r = tmp_dividend;
        while (l <= r) {
            long mid = (l + r) >> 1;
            if (qmul(mid, tmp_divisor) <= tmp_dividend && qmul(mid + 1, tmp_divisor) > tmp_dividend) {
                if (neg) mid = -mid;
                if (mid > Integer.MAX_VALUE) return Integer.MAX_VALUE;
                return (int) mid;
            }
            if (qmul(mid, tmp_divisor) < tmp_dividend) {
                l = mid + 1;
            }else {
                r = mid - 1;
            }
        }
        return Integer.MAX_VALUE;   //!!
    }

    private long qmul(long x, long y) {
        long ans = 0;
        while (y > 0) {
            if (y % 2 == 1) ans += x;
            x += x;
            y >>= 1;
        }
        return ans;
    }
}

```


##  模拟 Easy

### 题意

[题链](https://leetcode-cn.com/problems/fizz-buzz/)

### 题解

```java
class Solution {
    public List<String> fizzBuzz(int n) {
        List<String> ls = new ArrayList<>();
        for (int i = 1; i <= n; ++i) {
            if (i % 3 == 0 && i % 5 == 0) {
                ls.add("FizzBuzz");
            }else if (i % 3 == 0) {
                ls.add("Fizz");
            }else if (i % 5 == 0) {
                ls.add("Buzz");
            }else {
                ls.add(String.valueOf(i));
            }
        }
        return ls;
    }
}
```


## 三分 Easy

### 题意

[题链](https://leetcode-cn.com/problems/B1IidL/)


logn内求单峰数组的最大值


### 题解

三分，最高效的应该是黄金分割，其实还可以模拟退火（X）

```java
class Solution {
    public int peakIndexInMountainArray(int[] arr) {
        int l = 0, r = arr.length - 1;
        while (l <= r) {
            int midl = l + (r - l) / 3;
            int midr = r - (r - l) / 3;
            if (arr[midl] < arr[midr]) {
                l = midl + 1;
            }else {
                r = midr - 1;
            }
        }
        return l;
    }
}
```


## 模拟 Medium

### 题意

[题链](https://leetcode-cn.com/problems/count-and-say/)

不想描述

### 题解

```java
class Solution {
    public String countAndSay(int n) {
        if (n == 1) return "1";
        else return describe(countAndSay(n - 1));
    }

    private String describe(String str) {
        char cnt = str.charAt(0);
        int num = 1;
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i < str.length(); ++i) {
            if (str.charAt(i) == cnt) {
                num++;
            }else {
                sb.append(String.valueOf(num));
                sb.append(cnt);
                cnt = str.charAt(i);
                num = 1;
            }
        }
        sb.append(String.valueOf(num));
        sb.append(cnt);
        return sb.toString();
    }
}
```

## dfs Hard

### 题意

[题链](https://leetcode-cn.com/problems/expression-add-operators/)

对一个由数字组成的字符串中加运算符（+-*），求表达式能得到target值的所有方案，sb中文翻译居然没说数字不能有前导0

### 题解

为了图方便，直接用python的eval，但是eval不能有前导0，但是允许000的存在，这个要后处理特判，注意list不能边遍历边删除

注意在ide中用python3.5以上的类型检查时要导入typing包

```python
class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:  # 0-based index
        le = len(num)
        ans = []

        def dfs(now: str, pos: int, added: int):
            if pos == le - 1:
                try:
                    if eval(now) == target:
                        ans.append(now)
                except SyntaxError:
                    pass
                return

            tmp_now = now[: pos + added + 1] + '+' + now[pos + added + 1:]
            dfs(tmp_now, pos + 1, added + 1)
            tmp_now = now[: pos + added + 1] + '-' + now[pos + added + 1:]
            dfs(tmp_now, pos + 1, added + 1)
            tmp_now = now[: pos + added + 1] + '*' + now[pos + added + 1:]
            dfs(tmp_now, pos + 1, added + 1)
            tmp_now = now
            dfs(tmp_now, pos + 1, added)

        def all_zero(s: str) -> bool:
            if len(s) == 1: return False
            for i in s:
                if i != '0':
                    return False
            return True

        dfs(num, 0, 0)

        fans = []
        # postprocess
        for i in ans:
            removed = False
            s = ''
            for j in i:
                if j != '+' and j != '-' and j != '*':
                    s += j
                else:
                    if all_zero(s):
                        removed = True
                        break
                    else:
                        s = ''
            if not removed and all_zero(s):
                removed = True
            if not removed:
                fans.append(i)

        return fans
```




## 二分 中序遍历 Medium

### 题意

[题链](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)

求bst的第k小元素，允许多次求


### 题解

bst的中序是有序的，插入、删除、搜索均可二分


```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    List<Integer> li = new ArrayList<>();
    public int kthSmallest(TreeNode root, int k) {
        dfs(root);
        //Collections.sort(li);
        return li.get(k - 1);
    }
    private void dfs(TreeNode node) {
        if (node.left != null) dfs(node.left);
        li.add(node.val);
        if (node.right != null) dfs(node.right);
    }
}
```


## 次短路 Hard

### 题意

[题链](https://leetcode-cn.com/problems/second-minimum-time-to-reach-destination/)

给一个无向图，经过每条边的时间为t，任何时候可以到达任何点，但是只能在该点绿灯时离开且必须离开，一开始每个点都是绿灯，红绿灯以m时间交替，求从1到n的严格第二短时间
                                                                                                                                                                                                                                                                                                                                              

### 题解

dijkstra求次短路是最直接的想法，求次短路需要同时存储到每个点的次短路和最短路

```cpp
class Solution {
public:
    typedef pair<int,int> pii;       //first 是距离 ，second是点编号
    static const int maxv = 1e4 + 10;
    struct edge
    {
        int to,cost;
    };
    int V;
    vector<edge> G[maxv];
    int d[maxv];
    int dd[maxv];
    int cg ;
    int secondMinimum(int n, vector<vector<int>>& edges, int time, int change) {
        cg = change;
        for (auto i : edges) {
            G[i[0]].push_back({i[1], time});
            G[i[1]].push_back({i[0], time});
        }

        dijkstra(1);
        return dd[n];
    }

    void dijkstra(int s)
    {
        priority_queue<pii,vector<pii>,greater<> > q;           //使小的在上面
        memset(d, 0x3f, sizeof(d));
        memset(dd, 0x3f, sizeof(dd));
        d[s]=0;
        q.push(pii(0,s));
        while(!q.empty())
        {
            pii p=q.top();
            q.pop();
            int v=p.second;
            if(dd[v]<p.first) continue;
            for(int i=0;i<(int)G[v].size();i++)
            {
                edge e=G[v][i];
//                if(d[e.to]>d[v]+e.cost)
//                {
//                    d[e.to]=d[v]+e.cost;
//                    q.push(pii(d[e.to],e.to));
//                }
                int tmpdist;
                if (p.first % (cg * 2) < cg) {
                    tmpdist = p.first + e.cost;
                }else {
                    tmpdist = p.first + e.cost + 2 * cg - p.first % (2 * cg);
                }
                if (tmpdist < d[e.to]) {
                    swap(d[e.to], tmpdist);
                    q.emplace(d[e.to], e.to);
                }
                if (d[e.to] < tmpdist and dd[e.to] > tmpdist) {
                    dd[e.to] = tmpdist;
                    q.emplace(dd[e.to], e.to);
                }
            }
        }
    }
};
```


## 位运算 Easy

### 题意

[题链](https://leetcode-cn.com/problems/number-complement/)

求一个数耳朵二进制中0变成1,1变成0后的数字

### 题解

将它和全1异或

```java
class Solution {
    public int findComplement(int num) {
        int bitnum = 0;
        int tmp = num;
        while (tmp != 0) {
            tmp >>= 1;
            bitnum++;
        }
        int now = 0;
        for (int i = 0; i < bitnum; ++i) {
            now |= (1 << i);
        }
        return num ^ now;
    }
}
```


## 模拟 Easy

### 题意

[题链](https://leetcode-cn.com/problems/plus-one/)

求一个100位数+1的结果


### 题解

分享一篇Array\<Integer> 、Integer[] 、int[]相互转换的方法，[点它](https://blog.csdn.net/mbh12333/article/details/108573954)，不过应该尽量避免转化

```java
class Solution {
    public int[] plusOne(int[] digits) {
        boolean carry = false;
        int sz = digits.length;
        List<Integer> ls = new ArrayList<>();
        if (digits[sz - 1] + 1 > 9) {
            carry = true;
            ls.add(0);
        }else {
            ls.add(digits[sz - 1] + 1);
        }
        for (int i = sz - 2; i >= 0; --i) {
            if (carry) {
                if (digits[i] + 1 > 9) {
                    ls.add(0);
                }else {
                    carry = false;
                    ls.add(digits[i] + 1);
                }
            }else {
                ls.add(digits[i]);
            }
        }
        if (carry) ls.add(1);
        Collections.reverse(ls);
        return ls.stream().mapToInt(Integer::valueOf).toArray();
    }
}
```



## 摩尔投票 Medium

### 题意

[题链](https://leetcode-cn.com/problems/majority-element-ii/)

求一个数组中出现次数超过n/3的元素，要求时间复杂度O(n)，空间复杂度O(1)


### 题解

摩尔投票法一般用来求出现次数超过n/k的元素，这样的元素至多有k-1个，本质是相互抵消，注意判断条件的顺序

[相似的题](https://leetcode-cn.com/problems/majority-element/)

```java
class Solution {
    public List<Integer> majorityElement(int[] nums) {
        int candidate1 = 0xc0c0c0c0, candidate2 = 0xc0c0c0c0;
        int count1 = 0, count2 = 0;
        for (int i : nums) {
            if (count1 > 0 && i == candidate1) {
                count1++;
            }else if (count2 > 0 && i == candidate2) {
                count2++;
            }else if (count1 == 0) {
                candidate1 = i;
                count1 = 1;
            }else if (count2 == 0) {
                candidate2 = i;
                count2 = 1;
            }else {
                count1--;
                count2--;
            }
        }
        int cnt1 = 0, cnt2 = 0;
        for (int i : nums) {
            if (count1 > 0 && i == candidate1) cnt1++;
            if (count2 > 0 && i == candidate2) cnt2++;
        }
        List<Integer> ls = new ArrayList<>();
        int n = nums.length;
        if (cnt1 > n / 3) ls.add(candidate1);
        if (cnt2 > n / 3) ls.add(candidate2);
        return ls;
    }
}
```


## 数学 Easy

### 题意

[题链](https://leetcode-cn.com/problems/construct-the-rectangle/)

### 题解

```java
class Solution {
    public int[] constructRectangle(int area) {
        int ans = 0;
        for (int i = 1; i * i <= area; ++i) {
            if (area % i == 0) ans = i;
        }
        int[] ANS = new int[]{area / ans, ans};
        return ANS;
    }
}
```


## 模拟 Easy

### 题意

[题链](https://leetcode-cn.com/problems/number-of-valid-words-in-a-sentence/)

### 题解

按题意模拟

（要多写模拟，不要惧怕模拟😄）

```python
class Solution:
    def countValidWords(self, sentence: str) -> int:
        ls = list(sentence.split(' '))
        #print(ls)
        num = 0
        for i in ls:
            if i == '':
                continue
            ok = True
            for j in i:
                if j.isdigit():
                    ok = False
                    break
            if ok:
                if i.count('-') == 0:
                    if (i.count('!') + i.count(',') + i.count('.') == 1) and (
                            i[len(i) - 1] == '!' or i[len(i) - 1] == ',' or i[len(i) - 1] == '.'):
                        num += 1
                    elif i.count('!') + i.count(',') + i.count('.') == 0:
                        num += 1
                elif i.count('-') == 1:
                    index = i.find('-')
                    if index != 0 and index != len(i) - 1 and i[index - 1].isalpha() and i[index + 1].isalpha():
                        if (i.count('!') + i.count(',') + i.count('.') == 1) and (
                                i[len(i) - 1] == '!' or i[len(i) - 1] == ',' or i[len(i) - 1] == '.'):
                            num += 1
                        elif i.count('!') + i.count(',') + i.count('.') == 0:
                            num += 1
        return num
```


## 小模拟 Medium

### 题意

[题链](https://leetcode-cn.com/problems/next-greater-numerically-balanced-number/)

如果整数  x 满足：对于每个数位 d ，这个数位 恰好 在 x 中出现 d 次。那么整数 x 就是一个 数值平衡数 。

给你一个整数 n ，请你返回 严格大于 n 的 最小数值平衡数 。


### 题解

模拟

```python
class Solution:

    def nextBeautifulNumber(self, n: int) -> int:

        def ok(n: int) -> bool:
            st = str(n)
            for i in st:
                if st.count(i) != int(i):
                    return False
            return True


        while True:
            n += 1
            if ok(n):
                return n
        return 0
```

## dfs 分类讨论 Medium

### 题意

[题链](https://leetcode-cn.com/problems/count-nodes-with-the-highest-score/)

给一棵二叉树，每个节点的分数为把这个节点和所连的边移除的连通块大小之积，求具有最大分数的点的个数

### 题解

dfs求一下子树大小，然后分情况讨论（叶子、一个孩子、两个孩子）

```cpp
class Solution {
public:
    using ll = long long;
    int countHighestScoreNodes(vector<int>& parents) {
        ll num = (ll) parents.size();
        vector<ll> ch[num + 1];
        ll subnum[num + 1];
        for (ll i = 0; i < num; ++i) {
            if (parents[i] == -1) continue;
            ch[parents[i]].push_back(i);
        }
        function<void(ll)> dfs = [&](ll x) {
            if (ch[x].empty()) {
                subnum[x] = 1;
                return;
            }
            subnum[x] = 1;
            for (ll i : ch[x]) {
                dfs(i);
                subnum[x] += subnum[i];
            }
        };
        dfs(0);
        ll mx = -1;
        ll cnt = 0;
        if (ch[0].size() == 2) {
            mx = subnum[ch[0][0]] * subnum[ch[0][1]];
            cnt = 1;
        }else if (ch[0].size() == 1) {
            mx = subnum[ch[0][0]];
            cnt = 1;
        }
        for (ll i = 1; i < num; ++i) {
            ll tmp;
            if ((ll) ch[i].size() == 2) {
                tmp = subnum[ch[i][0]] * subnum[ch[i][1]] * (num - subnum[ch[i][0]] - subnum[ch[i][1]] - 1);

            }else if ((ll) ch[i].size() == 1) {
                tmp = subnum[ch[i][0]] * (num - subnum[ch[i][0]] - 1);
            }else {
                tmp = num - 1;
            }
            if (tmp > mx) {
                mx = tmp;
                cnt = 1;
            }else if (tmp == mx) {
                cnt++;
            }
        }
        return (int) cnt;
    }
};
```

## 拓扑序 Hard

### 题意

[题链](https://leetcode-cn.com/problems/parallel-courses-iii/)

给一个DAG，每个点表示一门课，有一个权值表示修这门课花费的时间，课程的修读有先后顺序，从起点开始修读到最后，求完成课程的最少时间，可以同时修多门课

### 题解

求拓扑序的过程更新每个点的最少时间，注意可能有多个DAG

```cpp
class Solution {
public:
    int minimumTime(int n, vector<vector<int>>& relations, vector<int>& time) {
        vector<int> indegree(n + 1);
        vector<int> G[n + 1];
        for (auto i : relations) {
            G[i[0]].push_back(i[1]);
            indegree[i[1]]++;
        }
        stack<int> s;
        vector<int> val(n + 1);
        for (int i = 1; i <= n; ++i) {
            if (indegree[i] == 0) s.push(i);
        }
        // for (int i = 1; i <= n; ++i) {
        //     cout << indegree[i] << ' ';
        // }
        int ans;
        vector<int> tmp;
        while (!s.empty()) {
            int now = s.top();
            s.pop();
            bool ok = false;
            for (int j : G[now]) {
                ok = true;
                val[j] = max(val[j], val[now] + time[now - 1]);
                if (--indegree[j] == 0) s.push(j);
            }
            if (!ok) tmp.push_back(now);
        }
        ans = 0;
        for (int i : tmp) {
            ans = max(ans, val[i] + time[i - 1]);
        }
        return ans;
        //return 0;
    }
};
```


## 小模拟 Easy

###  题意

[题链](https://leetcode-cn.com/problems/kth-distinct-string-in-an-array/)


### 题解

```cpp
class Solution {
public:
    unordered_map<string, int> mp;
    string kthDistinct(vector<string>& arr, int k) {
        for (auto i : arr) {
            mp[i]++;
        }
        for (auto i : arr) {
            if (mp[i] == 1) {
                k--;
                if (k == 0) {
                    return i;
                }
            }
        }
        return "";
    }
};
```


## 模拟 Medium

### 题意

[题链](https://leetcode-cn.com/problems/plates-between-candles/)

对于一个只有\*和 | 的字符串，每次询问一个子串，求夹在 | 的\*有几个


### 题解

存一个前缀*和，存一下 | 出现的位置，对于每个子区间，先算有多少个\*，然后算区间第一个 | 和最后一个 | ，在算一下之前和之后有几个\*，减一下。注意很多种情况都是0，注意细节

```cpp
class Solution {
public:
    vector<int> platesBetweenCandles(string s, vector<vector<int>>& queries) {
        int n = s.length();
        s.insert(s.begin(), '#');
        vector<int> prestar(n + 2);
        if (s[1] == '*') prestar[1] = 1;
        for (int i = 2; i <= n; ++i) {
            prestar[i] = prestar[i - 1] + (s[i] == '*' ? 1 : 0);
        }
        vector<int> bar;
        for (int i = 1; i <= n; ++i) {
            if (s[i] == '|') {
                bar.push_back(i);
            }
        }
        vector<int> ans;
        for (auto i : queries) {
            int l = i[0], r = i[1];
            l++, r++;
            int starnum = prestar[r] - prestar[l - 1];
            if (bar.empty()) {
                ans.push_back(0);
            }else {
                auto ite = lower_bound(bar.begin(), bar.end(), l);
                if (ite == bar.end()) {
                    ans.push_back(0);
                }else if (*ite > r) {
                    ans.push_back(0);
                }else {
                    int tmpl = *ite;
                    ite = upper_bound(bar.begin(), bar.end(), r);
                    if (ite == bar.begin()) {
                        ans.push_back(0);
                    }else {
                        ite--;
                        if (*ite < l) {
                            ans.push_back(0);
                        }else {
                            int tmpr = *ite;
                            ans.push_back(starnum - (tmpl - l) - (r - tmpr));
                        }
                    }
                }
            }
        }
        return ans;
    }
};
```



## 排序 前缀 离散化 Medium

### 题意

[题链](https://leetcode-cn.com/problems/two-best-non-overlapping-events/)

有n个区间，每个区间有一个价值，求两个不重叠区间价值和的最大值

### 题解

区间按右端点排序，离散化求到每个区间右端点的前缀最大值

遍历每个区间，对于该区间，求小于左端点的前缀最大值并和该区间价值相加，不断更新答案

注意排序用pair排，用vector排会超时！！！

```cpp
class Solution {
public:
    int maxTwoEvents(vector<vector<int>>& events) {
        int mx = -1;
        for (auto i : events) {
            mx = max(mx, i[2]);
        }
        int n = (int) events.size();
        vector<int> premax(n + 1);
        vector<int> bd;
        vector<pair<int, int>> v;
        for (auto i : events) {
            v.emplace_back(i[1], i[2]);
        }
        sort(v.begin(), v.end(), [&](pair<int, int> p1, pair<int, int> p2){
            return p1.first < p2.first;
        });
        premax[0] = v[0].second;
        bd.push_back(v[0].first);
        int ptr = 1;
        for (int i = 1; i < n; ++i) {
            if (v[i].first == bd.back()) {
                premax[ptr - 1] = max(premax[ptr - 1], v[i].second);
            }else {
                bd.push_back(v[i].first);
                premax[ptr] = max(premax[ptr - 1], v[i].second);
                ptr++;
            }
        }
        v.clear();
        for (auto i : events) {
            v.emplace_back(i[0], i[2]);
        }
        sort(v.begin(), v.end(), [&](pair<int, int> p1, pair<int, int> p2) {
            return p1.first < p2.first;
        });
        for (int i = 1; i < n; ++i) {
            int tmp = v[i].first - 1;
            auto ite = lower_bound(bd.begin(), bd.end(), tmp);
            if (ite != bd.end()) {
                if (*ite == tmp) {
                    mx = max(mx, v[i].second + premax[ite - bd.begin()]);
                }else {
                    if (ite != bd.begin()) {
                        mx = max(mx, v[i].second + premax[ite - bd.begin() - 1]);
                    }
                }
            }
        }
        return mx;
    }
};
```


## 小模拟 Easy

### 题意

[题链](https://leetcode-cn.com/problems/smallest-index-with-equal-value/)

### 题解

```cpp
class Solution {
public:
    int smallestEqual(vector<int>& nums) {
        for (int i = 0; i < (int) nums.size(); ++i) {
            if (i % 10 == nums[i]) {
                return i;
            }
        }
        return -1;
    }
};
```


## 小模拟 Medium

### 题意

[题链](https://leetcode-cn.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/)

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
    vector<int> nodesBetweenCriticalPoints(ListNode* head) {
        ListNode* now = head;
        ListNode* nn = head->next;
        vector<int> vals;
        int pos = 1;
        while (nn->next != NULL) {
            int l = now->val;
            int m = nn->val;
            int r = nn->next->val;
            if (m > l and m > r) {
                vals.push_back(pos);
            }else if (m < l and m < r) {
                vals.push_back(pos);
            }
            now = now->next;
            nn = nn->next;
            pos++;
        }
        sort(vals.begin(), vals.end());
        if ((int) vals.size() < 2) {
            return {-1, -1};
        } else {
            int mx = vals.back() - vals.front();
            int mn = 1e6;
            for (int i = 0; i < (int) vals.size() - 1; ++i) {
                mn = min(mn, vals[i + 1] - vals[i]);
            }
            return {mn, mx};
        }
    } 
};
```

## 异或 思维 Medium

### 题意

[题链](https://leetcode-cn.com/problems/single-number-iii/)

给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。你可以按 任意顺序 返回答案。在线性时间复杂度和常数空间复杂度求解

###  题解

假设两个数为x、y，将所有数异或为m，则x^y=m，求m二进制的某一位1，这一定是1\^0的结果，遍历一遍数，把该位为1的和0的分开，两堆分开异或得到答案

注意__builtin_ffs返回最后一位1的位置，下标从1开始

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        int a = 0;
        for (int i : nums) {
            a ^= i;
        }
        int pos = __builtin_ffs(a);
        pos--;
        vector<int> v1, v2;
        for (int i : nums) {
            if (i >> pos & 1) {
                v1.push_back(i);
            } else v2.push_back(i);
        }
        int l = 0, r = 0;
        for (int i : v1) {
            l ^= i;
        }
        for (int i : v2) {
            r ^= i;
        }
        return {l, r};
    }
};
```

## 预处理 哈希表 Medium

###  题意

[题链](https://leetcode-cn.com/problems/reordered-power-of-2/)

给定正整数 N ，我们按任何顺序（包括原始顺序）将数字重新排序，注意其前导数字不能为零。

如果我们可以通过上述方式得到 2 的幂，返回 true；否则，返回 false。

### 题解

预处理所有的2次幂，求每个数字出现的次数，一一比较

```cpp
class Solution {
public:
    bool reorderedPowerOf2(int n) {
        vector<int> num(10);
        while (n != 0) {
            num[n % 10]++;
            n /= 10;
        }
        vector<vector<int>> p;
        for (long long i = 1; i <= 1000000000; i *= 2) {
            vector<int> tmp(10);
            int now = i;
            while (now != 0) {
                tmp[now % 10]++;
                now /= 10;
            }
            p.push_back(tmp);
        }
        for (auto i : p) {
            bool same = true;
            for (int j = 0; j < 10; ++j) {
                if (i[j] != num[j]) {
                    same = false;
                    break;
                }
            }
            if (same) return true; 
        }
        return false;
    }
};
```

## dp 完全背包 Medium

### 题意

[题链](https://leetcode-cn.com/problems/shopping-offers/)

商店有n种商品，有k个礼包，礼包将商品捆绑售卖，即给出里面每一种商品的个数和礼包的价格，购物清单上写了每种商品的需求，求恰好按购物清单上买的最低花费（<=6种商品, <=100个大礼包）

### 题解

非常好的dp题，看数据大小可以暴搜，但我不会（官方题解有）

看起来很像完全背包，传统的完全背包是dp[i][j]表示前i个物品，容量不超过j的最大价值，这个题也有前i种物品（大礼包），也有容量（每种物品的购买个数），价值就变成了花费，但是有6种物品，所以有6种容量，所以可以设dp[i][j1][j2][j3][j4][j5][j6]，7重循环求解，（可以把6个容量维度状态压缩成1维，具体见民间题解），降维一下7重循环，6个维度的dp，初始化为dp = inf, dp[0][0][0][0][0][0] = 0，注意当物品没有6个时补齐6个

```cpp
class Solution {
public:

    int shoppingOffers(vector<int>& price, vector<vector<int>>& special, vector<int>& needs) {
        int n = (int) price.size();
        for (int i = 0; i < n; ++i) {
            vector<int> tmp(n + 1);
            tmp[i] = 1;
            tmp[n] = price[i];
            special.push_back(tmp);
        }
        vector<vector<int>> SP;
        for (auto i : special) {
            vector<int> tmp = i;
            tmp.pop_back();
            while ((int) tmp.size() != 6) {
                tmp.push_back(0);
            }
            tmp.push_back(i.back());
            SP.push_back(tmp);
        }
        int dp[12][12][12][12][12][12];
        while ((int) needs.size() < 6) {
            needs.push_back(0);
        }
        memset(dp, 0x3f, sizeof(dp));
        dp[0][0][0][0][0][0] = 0;
        int m = (int) special.size();
        for (int i = 0; i < m; ++i) {
            vector<int> bd(6);
            for (int j = 0; j < 6; ++j) {
                bd[j] = SP[i][j];
            }
            int money = SP[i][6];
            for (int k0 = bd[0]; k0 <= needs[0]; ++k0) {
                for (int k1 = bd[1]; k1 <= needs[1]; ++k1) {
                    for (int k2 = bd[2]; k2 <= needs[2]; ++k2) {
                        for (int k3 = bd[3]; k3 <= needs[3]; ++k3) {
                            for (int k4 = bd[4]; k4 <= needs[4]; ++k4) {
                                for (int k5 = bd[5]; k5 <= needs[5]; ++k5) {
                                    dp[k0][k1][k2][k3][k4][k5] = min(dp[k0][k1][k2][k3][k4][k5],
                                    dp[k0 - SP[i][0]][k1 - SP[i][1]][k2 - SP[i][2]][k3 - SP[i][3]][k4 - SP[i][4]][k5 - SP[i][5]] + money);
                                }
                            }
                        }
                    }
                }
            }
        }
        return dp[needs[0]][needs[1]][needs[2]][needs[3]][needs[4]][needs[5]];
    }
};
```


## 状态压缩 剪枝 Hard

### 题意

[题链](https://leetcode-cn.com/problems/remove-invalid-parentheses/)

给你一个由若干括号和字母组成的字符串 s（长度为25，括号为20） ，删除最小数量的无效括号，使得输入的字符串有效。

返回所有可能的结果。答案可以按 任意顺序 返回。

### 题解

因为合法括号序列左括号一定等于有括号，所以状压枚举左括号和右括号，数量不相等直接剪枝，去掉的括号数小于临时答案直接剪枝，最后判断是否真的合法

```cpp
class Solution {
public:
    vector<string> removeInvalidParentheses(string s) {
        auto ok = [&](string str) {
            stack<int> st;
            for (char i : str) {
                if (i == '(') st.push(1);
                if (i == ')') {
                    if (st.empty()) return false;
                    else st.pop();
                }
            }
            return st.empty();
        };
        int n = s.length();
        int lnum = 0, rnum = 0;
        for (char i : s) {
            if (i == '(') lnum ++;
            if (i == ')') rnum ++;
        }
        int mn = min(lnum, rnum);
        unordered_set<string> ans;
        int mncut = 100000;
        vector<int> lind, rind;
        for (int i = 0; i < n; ++i) {
            if (s[i] == '(') lind.push_back(i);
            if (s[i] == ')') rind.push_back(i);
        }
        for (int i = 0; i < (1 << lnum); ++i) {
            for (int j = 0; j < (1 << rnum); ++j) {
                int lonenum = __builtin_popcount(i);
                int ronenum = __builtin_popcount(j);
                if (lonenum != ronenum) continue;
                int tmpcut = lnum + rnum - lonenum - ronenum;
                if (tmpcut > mncut) continue;
                vector<int> ex(n);
                for (int k = 0; k < lnum; ++k) {
                    if ((i >> k & 1) == 0) {
                        ex[lind[k]] = 1;
                    }
                }
                for (int k = 0; k < rnum; ++k) {
                    if ((j >> k & 1) == 0) {
                        ex[rind[k]] = 1;
                    }
                }
                string tmpstr;
                for (int k = 0; k < n; ++k) {
                    if (ex[k]) continue;
                    tmpstr.push_back(s[k]);
                }
                if (ok(tmpstr)) {
                    if (tmpcut == mncut) {
                        ans.insert(tmpstr);
                    }else {
                        mncut = tmpcut;
                        ans.clear();
                        ans.insert(tmpstr);
                    }
                }
            }
        }
        vector<string> fans;
        for (auto i : ans) {
            fans.push_back(i);
        }
        return fans;
    }
};
```


## 小模拟 Easy

### 题意

[题链](https://leetcode-cn.com/problems/count-vowel-substrings-of-a-string/)


### 题解

```cpp
class Solution {
public:
    int countVowelSubstrings(string word) {
        auto ok = [&](string s) {
            auto ed = string::npos;
            for (char i : s) {
                if (i != 'a' and i != 'e' and i != 'i' and i != 'o' and i != 'u') return false;
            }
            if (s.find('a') != ed and s.find('e') != ed and s.find('i') != ed and s.find('o') != ed and s.find('u') != ed) return true;
            return false;
        };
        int ans = 0;
        int n = word.length();
        for (int i = 0; i < n; ++i) {
            for (int j = i; j < n; ++j) {
                string s = word.substr(i, j - i + 1);
                if (ok(s)) {
                    //cout << s << '\n';
                    ans++;
                }
            }
        }
        return ans;
    }
};
```


## 二分 Medium

### 题意

[题链](https://leetcode-cn.com/problems/minimized-maximum-of-products-distributed-to-any-store/)

有n个商店，有m种商品，每种商品有v[i]个，你需要把商品分到各个商店中，满足每个商店只能分一种商品（可以一个都不分），求商店最大商品数能达到的最小值

### 题解

像这种既贪心又单调的可以考虑二分！二分答案


```cpp
class Solution {
public:
    int minimizedMaximum(int n, vector<int>& quantities) {
        int sz = (int) quantities.size();
        int l = 1, r = *max_element(quantities.begin(), quantities.end());
        while (l <= r) {
            int mid = (l + r) >> 1;
            int now = 0;
            for (int i : quantities) {
                now += ceil(i / (double)mid);
            }
            if (now <= n) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
};
```


## 找规律 归纳 Hard

### 题意

[题链](https://leetcode-cn.com/problems/self-crossing/)

给一组行动序列，从原点出发，每次走move[i]步，每走一次自身逆时针90旋转，问走过的路径是否交叉

### 题解

考虑交叉的情况，可以发现4条及以上才会交叉

![在这里插入图片描述](https://img-blog.csdnimg.cn/7d524b6da9d04ed68b716ba061c9c428.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_8,color_FFFFFF,t_70,g_se,x_16)

5条（最后一条和第一条交叉才算）

![在这里插入图片描述](https://img-blog.csdnimg.cn/0b923d469b0a4420b067881a98086314.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_7,color_FFFFFF,t_70,g_se,x_16)


6条

![在这里插入图片描述](https://img-blog.csdnimg.cn/c302613154b94635beb1d548d78fb0b7.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_10,color_FFFFFF,t_70,g_se,x_16)


7条 （可以发现7条可以看做最后一条和第2条重复，所以应该算作6条）

之后也画不出更多的条数，所以对于每步只需要考虑4、5、6条的情况就行

![在这里插入图片描述](https://img-blog.csdnimg.cn/a9cfa6abd9cd41f0be58200da8b1b8f6.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_7,color_FFFFFF,t_70,g_se,x_16)


```java
class Solution {
    public boolean isSelfCrossing(int[] distance) {
        int n = distance.length;
        for (int i = 0; i < n; ++i) {
            if (i >= 3 && distance[i - 1] <= distance[i - 3] && distance[i] >= distance[i - 2]) return true;
        }
        for (int i = 0; i < n; ++i) {
            if (i >= 4 && distance[i - 2] > distance[i - 4] && distance[i - 1] == distance[i - 3] && distance[i] + distance[i - 4] >= distance[i - 2]) return true;
        }
        for (int i = 0; i < n; ++i) {
            if (i >= 5 && distance[i - 3] > distance[i - 5] && distance[i - 2] > distance[i - 4] && distance[i - 1] + distance[i - 5] >= distance[i - 3] && distance[i - 1] < distance[i - 3] && distance[i] + distance[i - 4] >= distance[i - 2]) return true;
        }
        return false;
    }
}
```


## 堆  类dijkstra  Hard

### 题意

[题链](https://leetcode-cn.com/problems/trapping-rain-water-ii/)


### 题解

没做过这种类型的题，感谢leetcode，设water[i][j]为水位高度，那么

water[i][j]=max(heightMap[i][j],min(water[i−1][j],water[i+1][j],water[i][j−1],water[i][j+1]))，所以water[i][j]需要四周来更新自己，但四周需要自己来更新对方

对于边缘 water[i][j] = heightMap[i][j]之后不会再改变，由于木桶效应，所以每次选择已经确定水位的方块中的最低水位的方块，来更新四周没有确定水位的方块，这就需要小根堆，用类dijkstra的思想

注意入堆时是Math.max(height[tx][ty], val)

```java
class Solution {
    public int trapRainWater(int[][] height) {
        int n = height.length;
        int m = height[0].length;
        boolean[][] used = new boolean[n][m];
        int[][] dir = {{0, -1}, {0, 1}, {-1, 0}, {1, 0}};
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);      // 小根堆
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (i == 0 || i == n - 1 || j == 0 || j == m - 1) {
                    pq.offer(new int[]{i * m + j, height[i][j]});
                    used[i][j] = true;
                }
            }
        }
        int ans = 0;
        while (!pq.isEmpty()) {
            int[] cnt = pq.poll();
            int x = cnt[0] / m;
            int y = cnt[0] % m;
            int val = cnt[1];
            for (int i = 0; i < 4; ++i) {
                int tx = x + dir[i][0];
                int ty = y + dir[i][1];
                if (tx >= 0 && tx < n && ty >= 0 && ty < m && !used[tx][ty]) {
                    if (val > height[tx][ty]) ans += val - height[tx][ty];
                    used[tx][ty] = true;
                    pq.offer(new int[]{tx * m + ty, Math.max(height[tx][ty], val)});
                }
            }
        }
        return ans;
    }
}
```


## 枚举 模拟 Hard

### 题意

[题链](https://leetcode-cn.com/problems/number-of-valid-move-combinations-on-chessboard/)

强烈建议看英文题面

### 题解

由于数据大小，枚举所有局面判断是否合法

代码来自[吴自华](https://leetcode-cn.com/u/lucifer1004/)

在计算时间复杂度时注意最多只有一个queen（这也太细节了，我直接忽略😫）

```cpp
const int d[8][2] = {{-1, 0}, {-1, -1}, {0, -1}, {1, -1}, {1, 0}, {1, 1}, {0, 1}, {-1, 1}};

class Solution {
    vector<vector<int>> positions, possible;
    int n, ans = 0;
    vector<int> direction, step, xinit, yinit;
    
    bool valid(int x, int y) {
        return x >= 1 && x <= 8 && y >= 1 && y <= 8;
    }
    
    void check() {
        vector<int> x(xinit), y(yinit), s(step);
        bool go = true;
        while (go) {
            go = false;
            for (int i = 0; i < n; ++i) {
                if (s[i] > 0) {
                    s[i]--;
                    x[i] += d[direction[i]][0];
                    y[i] += d[direction[i]][1];
                }
                if (s[i])
                    go = true;
            }
            for (int i = 0; i < n; ++i)
                for (int j = i + 1; j < n; ++j)
                    if (x[i] == x[j] && y[i] == y[j])
                        return;
        }
        ans++;
    }
    
    void dfs(int i) {        
        if (i == n) {
            check();
        } else {
            direction.push_back(0);
            step.push_back(0);
            dfs(i + 1);
            direction.pop_back();
            step.pop_back();
            
            for (int j = 1; j < 8; ++j) {
                for (int k : possible[i]) {
                    int x = positions[i][0] + d[k][0] * j, y = positions[i][1] + d[k][1] * j;
                    if (valid(x, y)) {
                        direction.push_back(k);
                        step.push_back(j);
                        dfs(i + 1);
                        direction.pop_back();
                        step.pop_back();
                    }
                }
            }
        }
    }
public:
    int countCombinations(vector<string>& pieces, vector<vector<int>>& positions) {
        n = pieces.size();
        possible = vector<vector<int>>(n);
        this->positions = positions;
        xinit = vector<int>(n), yinit = vector<int>(n);
        for (int i = 0; i < n; ++i) {
            xinit[i] = positions[i][0], yinit[i] = positions[i][1];
            if (pieces[i] != "rook") {
                possible[i].emplace_back(1);
                possible[i].emplace_back(3);
                possible[i].emplace_back(5);
                possible[i].emplace_back(7);
            }
            if (pieces[i] != "bishop") {
                possible[i].emplace_back(0);
                possible[i].emplace_back(2);
                possible[i].emplace_back(4);
                possible[i].emplace_back(6);
            }
        }
        
        dfs(0);
        
        return ans;
    }
};
```

## dp Hard

### 题意

[题链](https://leetcode-cn.com/problems/k-inverse-pairs-array/)

求有多少个n的排列有k个逆序对（n<=1000, k<=1000）

### 题解

裸dp，设dp[i][j]表示i的排列有j个逆序对的答案，对于数字i，它可以插到i-1的排列的任何位置而产生逆序对

dp[i][j] = dp[i-1][max(0, j-i+1)] + .. + dp[i-1][j]

初始化dp=0, dp[1][0] = 1，注意初始化和特判

```java
class Solution {
    public int kInversePairs(int n, int k) {
        if (k > n * (n - 1) / 2) return 0;
        final long mod = (long) (1e9 + 7);
        long[][] dp = new long[n + 1][k + 1];
        long[] presum = new long[k + 1];
        dp[1][0] = 1;
        Arrays.fill(presum, 1);
        for (int i = 2; i <= n; ++i) {
            for (int j = 0; j <= k; ++j) {
                if (j > i * (i - 1) / 2) break;
                else {
                    //dp[i][j] = (presum[j] - presum[Math.max(j - i, )]);
                    if (j - i >= 0) {
                        dp[i][j] = presum[j] - presum[j - i];
                    }else {
                        dp[i][j] = presum[j];
                    }
                    dp[i][j] += mod;
                    dp[i][j] %= mod;
                }
            }
            presum[0] = dp[i][0];
            for (int p = 1; p <= k; ++p) {
                presum[p] = presum[p - 1] + dp[i][p];
                presum[p] %= mod;
            }
        }
        return (int) dp[n][k];
    }
}

// 2 2 (0)
// 3 2 (2)
// 3 3 (1)
```



## 区间dp Medium

### 题意

[题链](https://leetcode-cn.com/problems/guess-number-higher-or-lower-ii/)


### 题解

这个题的本质是猜一个数后，会转到左边区间还是右边区间，然后一直重复，所以是个区间dp。设dp[i][j]表示从i到j的答案，对于某个区间，枚举区间的每个数作为猜测的数，dp[i][j] = max(dp[i][k-1], dp[k+1][j]) + val[k]，注意特判猜测的数为左端点和右端点，初始化为最大值，dp[i][i] = 0


```java
class Solution {
    public int getMoneyAmount(int n) {
        int[][] dp = new int[n + 1][n + 1];
        for (int i = 0; i < n + 1; ++i) {
            for (int j = 0; j < n + 1; ++j) {
                dp[i][j] = Integer.MAX_VALUE;
            }
        }
        for (int len = 1; len <= n; ++len) {
            for (int i = 1; i <= n - len + 1; ++i) {
                if (len == 1) {
                    dp[i][i] = 0;
                }else {
                    for (int j = i; j <= i + len - 1; ++j) {
                        if (j == i) {
                            dp[i][i + len - 1] = Math.min(dp[i][i + len - 1], dp[i + 1][i + len - 1] + j);
                        }else if (j == i + len - 1) {
                            dp[i][i + len - 1] = Math.min(dp[i][i + len - 1], dp[i][i + len - 2] + j);
                        }else {
                            dp[i][i + len - 1] = Math.min(dp[i][i + len - 1], Math.max(dp[i][j - 1], dp[j + 1][i + len - 1]) + j);
                        }
                    }
                }
            }
        }
        return dp[1][n];
    }
}
```


## 小模拟 Easy

### 题意

[题链](https://leetcode-cn.com/problems/check-whether-two-strings-are-almost-equivalent/)

### 题解

```cpp
class Solution {
public:
    bool checkAlmostEquivalent(string word1, string word2) {
        int num1[26] = {0};
        int num2[26] = {0};
        for (char i : word1) {
            num1[i - 'a']++;
        }
        for (char i : word2) {
            num2[i - 'a']++;
        }
        for (int i = 0; i < 26; ++i) {
            if (abs(num1[i] - num2[i]) > 3) return false;
        }
        return true;
    }
};
```


## 小模拟 Medium

### 题意

[题链](https://leetcode-cn.com/problems/most-beautiful-item-for-each-query/)

### 题解

```cpp
class Solution {
public:
    vector<int> maximumBeauty(vector<vector<int>>& items, vector<int>& queries) {
        int qn = (int) queries.size();
        int in = (int) items.size();
        vector<int> ans(qn);
        vector<pair<int, int>> Q;
        for (int i = 0; i < qn; ++i) {
            Q.emplace_back(queries[i], i);
        }
        sort(Q.begin(), Q.end());
        
        
        vector<pair<int, int>> tmp;
        for (auto i : items) {
            tmp.emplace_back(i[0], i[1]);
        }
        
        sort(tmp.begin(), tmp.end());
        
        int cnt = 0;
        int mx = 0;
        for (int i = 0; i < qn; ++i) {
            while (cnt < in and tmp[cnt].first <= Q[i].first) {
                 mx = max(mx, tmp[cnt].second);
                 cnt++;
            }
            ans[Q[i].second] = mx;
        }
        return ans;
        
        
    }
};
```


## 模拟 Medium

### 题意

[题链](https://leetcode-cn.com/problems/walking-robot-simulation-ii/)

### 题解

注意题目说机器人走到头如果没有下一步是不会转向的

注意用周期优化

降低dirt！！

```cpp
class Robot {
public:
    int dir;    // 0 right 1 up 2 left 3 down
    int w, h;
    int x, y;
    int circle;
    Robot(int width, int height) {
        dir = 0;
        w = width;
        h = height;
        x = 0;
        y = 0;
        circle = (w + h) * 2 - 4;
    }
    
    
    void move(int num) {
        //cout << num << ": ";
        while (num > 0) {
            if (dir == 0) {
                if (w - 1 - x >= num) {
                    x += num;
                    num = 0;
                }else {
                    num -= (w - 1 - x);
                    x = w - 1;
                    num %= circle;
                    if (num != 0) dir ++;
                    dir %= 4;
                    
                }
            } else if (dir == 3) {
                if (y >= num) {
                    y -= num;
                    num = 0;
                }else {
                    num -= y;
                    y = 0;
                    num %= circle;
                    if (num != 0) dir ++;
                    dir %= 4;
                    
                }
            } else if (dir == 2) {
                if (x >= num) {
                    x -= num;
                    num = 0;
                }else {
                    num -= x;
                    x = 0;
                    num %= circle;
                    if (num != 0) dir++;
                    dir %= 4;
                    
                }
            } else {
                if (h - 1 - y >= num) {
                    y += num;
                    num = 0;
                }else {
                    num -= (h - 1 - y);
                    y = h - 1;
                    num %= circle;
                    if (num != 0) dir++;
                    dir %= 4;
                    
                }
            }
        }
        //cout << x << ' ' << y << ' ' << dir << '\n';
    }
    
    vector<int> getPos() {
        return vector<int>{x, y};
    }
    
    string getDir() {
        if (dir == 0) return "East";
        if (dir == 1) return "North";
        if (dir == 2) return "West";
        return "South";
    }
};

/**
 * Your Robot object will be instantiated and called as such:
 * Robot* obj = new Robot(width, height);
 * obj->move(num);
 * vector<int> param_2 = obj->getPos();
 * string param_3 = obj->getDir();
 */
```



## 数论 Medium

### 题意

[题链](https://leetcode-cn.com/problems/bulb-switcher/)

强烈建议阅读英文题面

### 题解

只有被转换奇数次的才会亮着，也就是约数有奇数个的才行，约数有奇数个的是完全平方数，所以就是求n以内的完全平方数个数

注意如果出现精度问题要+0.0000001这种

```java
class Solution {
    public int bulbSwitch(int n) {
        return (int) Math.sqrt(n);
    }
}
```


## 扫描线 结论 Hard

### 题意


[题链](https://leetcode-cn.com/problems/perfect-rectangle/)

坐标系上有n个矩形，问是否这n个矩形不重叠且可以组成恰1个矩形

### 题解


![在这里插入图片描述](https://img-blog.csdnimg.cn/dcd625231e6e44d294a8ad60bfe1919d.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_7,color_FFFFFF,t_70,g_se,x_16)

如果可以拼成1个矩形，需要满足除边缘的线，组成的区间都有左边矩形和右边矩形匹配，因为最终只能是1个矩形，所以每条竖线只能合并成1个区间（且原来的碎片区间不相交）而不是分裂的几个区间，比如说

![在这里插入图片描述](https://img-blog.csdnimg.cn/3e7803c6c1f64584a08852014334aadc.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_9,color_FFFFFF,t_70,g_se,x_16)

这是我一开始的想法，后来被证伪，反例是

![在这里插入图片描述](https://img-blog.csdnimg.cn/a407c2e81af94356b7a5d1288bf0aff9.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_6,color_FFFFFF,t_70,g_se,x_16)

所以应该是除边缘线外可以是分裂的区间，边缘线必须合并成1个区间

```java
class Solution {
    public boolean isRectangleCover(int[][] rectangles) {
        int L, R;
        L = Integer.MAX_VALUE;
        R = Integer.MIN_VALUE;
        int n = rectangles.length;
        for (int[] rectangle : rectangles) {
            L = Math.min(L, rectangle[0]);
            R = Math.max(R, rectangle[2]);
        }
        HashMap<Integer, ArrayList<int[]>> LineL = new HashMap<>();
        HashMap<Integer, ArrayList<int[]>> LineR = new HashMap<>();
        HashSet<Integer> Line = new HashSet<>();
        for (int[] rectangle : rectangles) {
            Line.add(rectangle[0]);
            Line.add(rectangle[2]);
            int[] tmp = {rectangle[1], rectangle[3]};
            if (!LineR.containsKey(rectangle[0])) {
                LineR.put(rectangle[0], new ArrayList<>());
            }
            LineR.get(rectangle[0]).add(tmp);
            if (!LineL.containsKey(rectangle[2])) {
                LineL.put(rectangle[2], new ArrayList<>());
            }
            LineL.get(rectangle[2]).add(tmp);
        }
        for (Map.Entry<Integer, ArrayList<int[]>> entry : LineL.entrySet()) {
            entry.getValue().sort((a, b) -> {
                if (a[0] != b[0]) return a[0] - b[0];
                return a[1] - b[1];
            });
        }
        for (Map.Entry<Integer, ArrayList<int[]>> entry : LineR.entrySet()) {
            entry.getValue().sort((a, b) -> {
                if (a[0] != b[0]) return a[0] - b[0];
                return a[1] - b[1];
            });
        }
        for (int i : Line) {
            if (i == L) {
                List<int[]> tmp = LineR.get(i);
                for (int j = 1; j < tmp.size(); ++j) {
                   if (tmp.get(j)[0] == tmp.get(j - 1)[1]) continue;
                   return false;
                }
            }else if (i == R) {
                List<int[]> tmp = LineL.get(i);
                for (int j = 1; j < tmp.size(); ++j) {
                    if (tmp.get(j)[0] == tmp.get(j - 1)[1]) continue;
                    return false;
                }
            }else {
                if (!LineL.containsKey(i)) return false;
                if (!LineR.containsKey(i)) return false;
                List<int[]> tmpl = new ArrayList<>(), tmpr = new ArrayList<>();
                List<int[]> tmp = LineL.get(i);
                int cnt = tmp.get(0)[0];
                for (int j = 1; j < tmp.size(); ++j) {
                    if (tmp.get(j)[0] == tmp.get(j - 1)[1]) continue;
                    tmpl.add(new int[]{cnt, tmp.get(j - 1)[1]});
                    cnt = tmp.get(j)[0];
                }
                tmpl.add(new int[]{cnt, tmp.get(tmp.size() - 1)[1]});
                
                tmp = LineR.get(i);
                cnt = tmp.get(0)[0];
                for (int j = 1; j < tmp.size(); ++j) {
                    if (tmp.get(j)[0] == tmp.get(j - 1)[1]) continue;
                    tmpr.add(new int[]{cnt, tmp.get(j - 1)[1]});
                    cnt = tmp.get(j)[0];
                }
                tmpr.add(new int[]{cnt, tmp.get(tmp.size() - 1)[1]});
                
                if (tmpl.size() != tmpr.size()) return false;
                for (int j = 0; j < tmpl.size(); ++j) {
                    if (tmpl.get(j)[0] == tmpr.get(j)[0] && tmpl.get(j)[1] == tmpr.get(j)[1]) continue;
                    return false;
                }
            }
        }
        return true;
    }
}
```



## 模拟 Medium

### 题意

[题链](https://leetcode-cn.com/problems/maximum-product-of-word-lengths/)

### 题解

小技巧是用二进制存信息优化

```java
class Solution {
    public int maxProduct(String[] words) {
        int n = words.length;
        int[] num = new int[n];
        int ans = 0;
        for (int j = 0; j < n; ++j) {
            int tmp = 0;
            for (int i = 0; i < words[j].length(); ++i) {
                tmp |= (1 << (words[j].charAt(i) - 'a'));
            }
            num[j] = tmp;
        }
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if ((num[j] & num[i]) == 0) {
                    ans = Math.max(ans, words[i].length() * words[j].length());
                }
            }
        }
        return ans;
    }
}
```


## dp 分类讨论 Hard

### 题意

[题链](https://leetcode-cn.com/problems/zheng-ze-biao-da-shi-pi-pei-lcof/)



### 题解

正则表达式匹配最高效的做法应该是用状态机？

很好的dp题，细节比较多（官方题解似乎很简洁🤔）

dp[i][j]表示s串前i个和p串的前j个是否匹配

如果s[i] = p[j] 那一定可以匹配， dp[i][j] = dp[i-1][j-1]

否则如果p[j] 是个字母，由于两个字母不同，一定不匹配 dp[i][j] = false

否则如果p[j]是'.'，它可以匹配任意一个字母，可以匹配dp[i][j] = dp[i-1][j-1]

否则如果p[j] = '*'， 这个比较麻烦

如果p[j-1] = s[i] 则这个*可以把前面的字母和自己吞掉，可以把自己吞掉，可以复制前面的字母，所以 dp[i][j] = dp[i][j-2] || dp[i][j-1] || dp[i-1][j-1]

否则如果p[j-1]是个字母，那*只能把前面的字母吞掉，dp[i][j] = dp[i][j-2]

否则如果p[j-1]是'.'， 那它可以当做任何一个字母，dp[i][j] = dp[i][j-2] || dp[i][j-1] || dp[i-1][j-1]

不可能出现两个连续的'*'

初始化 dp = false, dp[0][0] = true

这么做有几个漏洞

"aab", "c*a*b" 无法通过，因为一开始就不匹配，后面都匹配不了（这肯能和代码有关），所以需要在s串和p串加个'a'来启动匹配


"aaa", ".*" 无法通过，最后漏考虑了一种情况，因为 ".\*" 的 '.' 可以是任意字母，所以dp[i][j] |= dp[i-1][j]，即当前s串的最后一个字母一定能匹配

有罚时的比赛应该考虑怎么通过想这些样例来降低dirt！！


```java
class Solution {
    public boolean isMatch(String s, String p) {
        s = new StringBuilder(s).insert(0, 'a').toString(); // insert 'a' in front to make aligned, pass "aab", "c*a*b"
        p = new StringBuilder(p).insert(0, 'a').toString();
        int sn = s.length(), pn = p.length();
        s = new StringBuilder(s).insert(0, 'a').toString();
        p = new StringBuilder(p).insert(0, 'a').toString();
        boolean[][] dp = new boolean[sn + 1][pn + 1];
        dp[0][0] = true;
        for (int i = 1; i <= sn; ++i) {
            for (int j = 1; j <= pn; ++j) {
                if (s.charAt(i) == p.charAt(j)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else if ('a' <= p.charAt(j) && p.charAt(j) <= 'z') {
                    dp[i][j] = false;
                } else if (p.charAt(j) == '.') {
                    dp[i][j] = dp[i - 1][j - 1];
                } else if (p.charAt(j) == '*') {
                    if (p.charAt(j - 1) == s.charAt(i)) {
                        dp[i][j] = dp[i][j - 2] || dp[i][j - 1] || dp[i - 1][j - 1];
                    } else if (p.charAt(j - 1) >= 'a' && p.charAt(j - 1) <= 'z') {
                        dp[i][j] = dp[i][j - 2];
                    } else if (p.charAt(j - 1) == '.') {
                        dp[i][j] = dp[i][j - 2] || dp[i][j - 1] || dp[i - 1][j - 1] || dp[i - 1][j];  // add dp[i - 1][j] to pass "aaa", ".*"
                    }
                }
            }
        }
        return dp[sn][pn];
    }
}
```


## 预处理 数位dp 递归 Hard

### 题意

[题链](https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/)

输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。

###  题解

预处理dp[i]表示小于等于i位数的1的个数

对于数n，比如它为114514，就可以先算1-99999中1的个数，然后计算100000-114514的1的个数，接下来算最高位的1，有14515个，最后递归算1-14514的1的个数

再比如7355608，可以先算1-999999的1的个数，然后计算1000000-7355608的1的个数，接下来算最高位1，有1000000个，再算2000000-7355608，这等价于递归算1-355608中1的个数

```java
class Solution {
    int[] dp = new int[11];
    public int countDigitOne(int n) {
        dp[1] = 1;
        for (int i = 2; i < 11; ++i) {
            dp[i] += dp[i - 1];
            dp[i] += 9 * dp[i - 1] + Math.pow(10, i - 1);
        }
        return cal(n);
    }

    private int digitNum(int n) {
        if (n == 0) return 1;
        int res = 0;
        while (n != 0) {
            res++;
            n /= 10;
        }
        return res;
    }

    private int cal(int n) {
        int num = digitNum(n);
        if (num == 1) {
            return n < 1 ? 0 : 1;
        }
        int ans = dp[num - 1];
        int tmp = (int) (n / Math.pow(10, num - 1));
        tmp--;
        ans += tmp * dp[num - 1];
        ans += Math.min(n - Math.pow(10, num - 1) + 1, Math.pow(10, num - 1));
        ans += cal((int) (n % Math.pow(10, num - 1)));
        return ans;
    }
}
```


## bfs Hard

### 题意

[题链](https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/)

将二叉树序列化和反序列化，不管实现逻辑，只要能保证不同二叉树对应不同序列即可

### 题解

本来想试试用prufer code，顺便复习一波，后来发现prufer code只能用在labeled tree

只要bfs层序遍历，多记一层的空节点

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Codec {

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        if (root == null) return "null";
        StringBuilder sb = new StringBuilder();
        Queue<TreeNode> q = new LinkedList<>(){{add(root);}};
        while (!q.isEmpty()) {
            TreeNode tmp = q.poll();
            if (tmp == null) {
                sb.append(",null");
            } else {
                if (tmp != root) sb.append(',');
                sb.append(String.valueOf(tmp.val));
            }
            if (tmp != null) {
                q.add(tmp.left);
                q.add(tmp.right);
            }
        }
        //System.out.println(sb.toString());
        return sb.toString();
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        if (data.equals("null")) return null;
        String[] d = data.split(",");
        TreeNode root = new TreeNode(Integer.parseInt(d[0]));
        Queue<TreeNode> q = new LinkedList<>(){{add(root);}};
        int cur = 1;
        while (!q.isEmpty()) {
            TreeNode tmp = q.poll();
            String left = d[cur];            
            String right = d[cur + 1];
            cur += 2;
            if (!left.equals("null")) {
                TreeNode lnode = new TreeNode(Integer.parseInt(left));
                tmp.left = lnode;
                q.add(lnode);
            }
            if (!right.equals("null")) {
                TreeNode rnode = new TreeNode(Integer.parseInt(right));
                tmp.right = rnode;
                q.add(rnode);
            }
        }
        return root;
    }
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));
```


## 双端队列 Hard

### 题意

[题链](https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/)

经典的滑动窗口

### 题解

[参考此处](https://dyhgo.xyz/%E6%AF%8F%E6%97%A5%E4%B8%80%E9%A2%98-x/#%E5%8F%8C%E7%AB%AF%E9%98%9F%E5%88%97-%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%B1%82%E6%9C%80%E5%80%BC)

```java
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums.length == 0) return new int[0];
        int n = nums.length;
        int[] ans = new int[n - k + 1];
        Deque<Integer> dq = new LinkedList<>();
        for (int i = 0; i < n; ++i) {
            if (!dq.isEmpty() && dq.peekFirst() <= i - k) {
                dq.pollFirst();
            }
            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) {
                dq.pollLast();
            }
            dq.offerLast(i);
            if (i >= k - 1) {
                ans[i - k + 1] = nums[dq.peekFirst()];
            }
        }
        return ans;
    }
}
```


## 堆 Hard

### 题意

[题链](https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/)

### 题解

三年前啥也不会的我在紫书上看到这个题以为无解。。。😄

[参考此处](https://dyhgo.xyz/%E6%AF%8F%E6%97%A5%E4%B8%80%E9%A2%98-x/#%E5%A0%86-%E5%AF%B9%E9%A1%B6%E5%A0%86%E6%B1%82%E5%AE%9E%E6%97%B6%E4%B8%AD%E4%BD%8D%E6%95%B0)


```java
class MedianFinder {

    /** initialize your data structure here. */
    Queue<Integer> minHeap, maxHeap;
    public MedianFinder() {
        minHeap = new PriorityQueue<>((a, b) -> a - b);
        maxHeap = new PriorityQueue<>((a, b) -> b - a);
    }
    
    public void addNum(int num) {
        if (maxHeap.isEmpty()) {
            maxHeap.add(num);
        } else {
            if (num > maxHeap.peek()) {
                minHeap.add(num);
            } else {
                maxHeap.add(num);
            }
        }
        if (maxHeap.size() > minHeap.size() + 1) {
            minHeap.add(maxHeap.poll());
        }
        if (minHeap.size() > maxHeap.size() + 1) {
            maxHeap.add(minHeap.poll());
        }
    }
    
    public double findMedian() {
        if (maxHeap.size() == minHeap.size() + 1) {
            return maxHeap.peek();
        } else if (minHeap.size() == maxHeap.size() + 1) {
            return minHeap.peek();
        } else {
            return (minHeap.peek() + maxHeap.peek()) / 2.0;
        }
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder obj = new MedianFinder();
 * obj.addNum(num);
 * double param_2 = obj.findMedian();
 */
```


## 归并排序 树状数组 Hard

### 题意

[题链](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)

求逆序对个数

### 题解

经典的就是归并排序求，但是这个细节太多不好写，树状数组思路比较直接

求三元逆序组[参考此处](https://dyhgo.xyz/%E6%AF%8F%E6%97%A5%E4%B8%80%E9%A2%98-cf/#%E6%A0%91%E7%8A%B6%E6%95%B0%E7%BB%84)

归并排序

```java
class Solution {
    int[] tmp;
    public int reversePairs(int[] nums) {
        int n = nums.length;
        if (n < 2) return 0;
        tmp = new int[n];
        return cal(nums, 0, n - 1);
    }

    private int cal(int[] nums, int l, int r) {
        if (l == r) return 0;
        int mid = l + (r - l) / 2;
        int leftCount = cal(nums, l, mid);
        int rightCount = cal(nums, mid + 1, r);
        if (nums[mid] <= nums[mid + 1]) {
            return leftCount + rightCount;
        }
        return leftCount + rightCount + crossCount(nums, l, mid, r);
    }

    private int crossCount(int[] nums, int l, int mid, int r) {
        for (int i = l; i <= r; ++i) {
            tmp[i] = nums[i];
        }
        int res = 0;
        int ptrL = l, ptrR = mid + 1;
        for (int i = l; i <= r; ++i) {
            if (ptrL == mid + 1) {
                nums[i] = tmp[ptrR];
                ptrR++;
            } else if (ptrR == r + 1) {
                nums[i] = tmp[ptrL];
                ptrL++;
            } else if (tmp[ptrL] <= tmp[ptrR]) {
                nums[i] = tmp[ptrL];
                ptrL++;
            } else {
                nums[i] = tmp[ptrR];
                ptrR++;
                res += mid - ptrL + 1;
            }
        }
        return res;
    }
}
```


树状数组

```java
class Solution {
    public int reversePairs(int[] nums) {
        int n = nums.length;
        int[] tmp = new int[n];
        System.arraycopy(nums, 0, tmp, 0, n);
        Arrays.sort(tmp);
        for (int i = 0; i < n; ++i) {
            nums[i] = Arrays.binarySearch(tmp, nums[i]) + 1;
        }
        FenwickTree fenwickTree = new FenwickTree(n);
        int ans = 0;
        for (int i = 0; i < n; ++i) {
            ans += i - fenwickTree.sum(nums[i]);
            fenwickTree.add(nums[i], 1);
        }
        return ans;
    }
}

class FenwickTree {
    //[1, n]
    private int[] bit;
    private int n;

    public FenwickTree(int n) {
        this.bit = new int[n + 1];
        this.n = n;
    }

    public int sum(int i) {
        int s = 0;
        while (i > 0) {
            s += bit[i];
            i -= i & -i;
        }
        return s;
    }

    public void add(int i, int x) {
        while (i <= n) {
            bit[i] += x;
            i += i & -i;
        }
    }
}
```


## 数论 结论 Medium

### 题意

[题链](https://leetcode-cn.com/problems/integer-replacement/)

给定一个正整数 n ，你可以做如下操作：

如果 n 是偶数，则用 n / 2替换 n 。
如果 n 是奇数，则可以用 n + 1或n - 1替换 n 。
n 变为 1 所需的最小替换次数是多少？


### 题解

直接搜索或者

对于奇数+1还是-1，分情况讨论

![在这里插入图片描述](https://img-blog.csdnimg.cn/c36d34ea7ca940f69bb945f9a122fae7.png?x-oss-process=image,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_19,color_FFFFFF,t_70,g_se,x_16)

可以发现奇数n%4=1选-1，否则选+1


注意特判3和int溢出，这个也太细节了😣，什么时候能做到思维严谨，都是以前养成的不好习惯

```java
class Solution {
    public int integerReplacement(int n) {
        long nn = n;
        int ans = 0;
        while (nn != 1) {
            if (nn == 3) return ans + 2;
            if ((nn & 1) == 1) {
                if ((nn >> 1 & 1) == 1) {
                    nn++;
                } else {
                    nn--;
                }
            } else {
                nn /= 2;
            }
            ans++;
        }
        return ans;
    }
}
```


## k进制 思维 Hard

### 题意

[题链](https://leetcode-cn.com/problems/poor-pigs/)


### 题解

经典面试题，用k进制做

```java
class Solution {
    public int poorPigs(int buckets, int minutesToDie, int minutesToTest) {
        return (int) Math.ceil(Math.log(buckets) / Math.log(minutesToTest / minutesToDie + 1));
    }
}
```



## 哈希表 Medium

### 题意


[题链](https://leetcode-cn.com/problems/random-flip-matrix/)

实现随机取1-1e8中的数字，取过的数字不再取的方法


### 题解

用哈希表，将取过的数据交换到后面，没取的数交换到前面。假设还能取x个，这样每次都随机取1-x，这里面包含了之前被交换过来没取过的数

```java
class Solution {
    Map<Integer, Integer> mp;
    int m, n;
    int curNum;
    Random random;
    public Solution(int m, int n) {
        this.m = m;
        this.n = n;
        mp = new HashMap<>();
        random = new Random();
        curNum = m * n;
    }

    public int[] flip() {
        int tmp = random.nextInt(curNum);
        curNum--;
        int id = mp.getOrDefault(tmp, tmp);
        mp.put(tmp, mp.getOrDefault(curNum, curNum));
        return new int[]{id / n, id % n};
    }

    public void reset() {
        mp.clear();
        curNum = m * n;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(m, n);
 * int[] param_1 = obj.flip();
 * obj.reset();
 */
```


## 可重置节点并查集 Hard

### 题意

[题链](https://leetcode-cn.com/problems/find-all-people-with-secret/)

### 题解

按时间顺序用并查集模拟，但是需要撤销操作。做法是把这个时刻的点都加完，遍历这一轮的点，如果和0不在一个集合里，就重置par[x] = x

主要是和 “重置节点” 结合

```cpp
class Solution {
public:
    vector<int> findAllPeople(int n, vector<vector<int>>& meetings, int firstPerson) {
        queue<int> q;
        int par[n];
        int rankk[n];
        for (int i = 0; i < n; ++i) {
            par[i] = i;
            rankk[i] = 0;
        }
        function<int(int)> find = [&](int x) {
            if (par[x] == x) return x;
            return par[x] = find(par[x]);
        }; 
        auto unite = [&](int x, int y) {
            x = find(x);
            y = find(y);
            if (x == y) return ;
            if (rankk[x] < rankk[y]) par[x] = y;
            else {
                par[y] = x;
                if (rankk[x] == rankk[y]) rankk[x]++;
            }
        };
        auto same = [&](int x, int y) {
            return find(x) == find(y);
        };
        auto reset = [&](int x) {
            par[x] = x;
            rankk[x] = 0;
        };
        map<int, vector<pair<int, int>>> mp;
        for (auto& i : meetings) {
            mp[i[2]].emplace_back(i[0], i[1]);
        }
        mp[0].emplace_back(0, firstPerson);
        for (auto& [x, y] : mp) {
            for (auto& [i, j] : y) {
                unite(i, j);
                q.push(i);
                q.push(j);
            }
            while (!q.empty()) {
                int tmp = q.front();
                q.pop();
                if (!same(tmp, 0)) reset(tmp);
            }
        }
        vector<int> ans;
        for (int i = 0; i < n; ++i) if (same(0, i)) ans.push_back(i);
        return ans;
    }
};
```

## 二分 双指针 Hard

### 题意

[题链](https://leetcode-cn.com/problems/k-th-smallest-prime-fraction/)


### 题解

bf或者

二分第k大的数的值x（在0-1）

检测小于等于x的数有几个，如果小于k，l=mid，否则r=mid

用双指针i,j表示arr[i]/arr[j]是否小于等于x，如果是则i++，否则counter+=i

遍历每个j，i跟随着移动（类似于用归并排序算逆序对时，算跨过左右两个区间的逆序对个数）

时间复杂度O(n*logC)，C为(3e4)^2

```java
class Solution {
    public int[] kthSmallestPrimeFraction(int[] arr, int k) {
        double l = 0, r = 1;
        final double eps = 1e-9;
        int n = arr.length;
        while (r - l >= eps) {
            double mid = (l + r) / 2;
            int count = 0;
            int cnti = 0;
            int ansi = 0, ansj = n - 1;
            for (int j = 1; j < n; ++j) {
                while (true) {
                    if ((double) arr[cnti] / arr[j] <= mid) {
                        if (arr[cnti] * arr[ansj] > arr[j] * arr[ansi]) {
                            ansi = cnti;
                            ansj = j;
                        }
                        cnti++;
                    }
                    else {
                        count += cnti;
                        break;
                    }
                }
            }
            if (count == k) return new int[]{arr[ansi], arr[ansj]};
            if (count > k) r = mid;
            else l = mid;
        }
        return null;
    }
}
```



## 二分 Medium

### 题意

[题链](https://leetcode-cn.com/problems/nth-digit/)

### 题解

二分

```java
class Solution {
    public int findNthDigit(int n) {
        long l = 1, r = n;
        while (l <= r) {
            long mid = l + (r - l) / 2;
            long cnt = count(mid);
            if (cnt < n) l = mid + 1;
            else r = mid - 1;
        }
        long ct = count(l);
        ct -= n;
        String s = String.valueOf(l);
        return (int) (s.charAt((int) (s.length() - ct - 1)) - '0');
    }
    public long count(long x) {
        int digitNum = 0;
        long tmp = x;
        while (tmp > 0) {
            tmp /= 10;
            digitNum++;
        }
        long res = 0;
        for (int i = 1; i < digitNum; ++i) {
            res += 9 * Math.pow(10, i - 1) * i;
        }
        res += (x - Math.pow(10, digitNum - 1) + 1) * digitNum;
        return res;
    }
}
```


## 欧拉降幂  Medium

### 题意

[题链](https://leetcode-cn.com/problems/super-pow/)


求a ^ b % 1337 ， b是大数

### 题解


除了欧拉降幂就不会做了捏😭


```java
class Solution {
    public long quickPow(long x, long n, long mod) {
        long res = 1;
        while (n > 0) {
            if (n % 2 == 1) res = res * x % mod;
            x = x * x % mod;
            n >>= 1;
        }
        return res;
    }
    public int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
    public int superPow(int a, int[] b) {
        long phi = 1140;
        int n = b.length;
        long now = 0;
        long multiple = 1;
        for (int i = n - 1; i >= 0; --i) {
            now += b[i] * multiple % phi;
            now %= phi;
            multiple *= 10;
            multiple %= phi;
        }
        if (gcd(a, 1337) == 1) {
            return (int) quickPow(a, now, 1337);
        } else {
            return (int) quickPow(a, now + phi, 1337);
        }
    }
}
```


##  完全背包 四平方和定理  Medium


### 题意

[题链](https://leetcode-cn.com/problems/perfect-squares/)

求1个正整数最少可以表示成几个完全平方数之和


### 题解

完全背包或

四平方数之和（Lagrange's four-square theorem），任何一个正整数都可以表示成最多四个完全平方数之和，特殊地，如果一个数不能表示成4^k*(8m+7)，(k>=0, m>=0)的形式，那它最多只需要三个数

```python
class Solution:
    def numSquares(self, n: int) -> int:
        dp = [100000 for i in range(10005)]
        dp[0] = 0
        a = []
        k = 1
        while k * k <= n + 5:
            a.append(k * k)
            k += 1


        sz = len(a)
        for i in range(1, sz + 1):
            for j in range(a[i - 1], n + 1):
                dp[j] = min(dp[j], dp[j - a[i - 1]] + 1) 
        
        return dp[n]
```



```java
class Solution {
    public int numSquares(int n) {
        //Lagrange's four-square theorem
        if (isPerfectSquare(n)) return 1;
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
    private boolean isPerfectSquare(int n) {
         int x = (int) Math.sqrt(n);
         return x * x == n;
    }
}
```



##  dfs Medium

### 题意

[题链](https://leetcode-cn.com/problems/coloring-a-border/)


求网格某个连通块的边界

### 题解

```java
class Solution {
    private int[][] grid;
    private int cl;
    private int[][] dir = {{-1, 0}, {1, 0}, {0, 1}, {0, -1}};
    private int n, m;

    public int[][] colorBorder(int[][] grid, int row, int col, int color) {
        Queue<int[]> q = new ArrayDeque<>();
        this.grid = grid;
        this.cl = grid[row][col];
        this.n = grid.length;
        this.m = grid[0].length;
        dfs(row, col);
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (this.grid[i][j] == -1) {
                    boolean ok = true;
                    for (int k = 0; k < 4; ++k) {
                        int tx = i + dir[k][0];
                        int ty = j + dir[k][1];
                        if (!(tx >= 0 && tx < n && ty >= 0 && ty < m && this.grid[tx][ty] == -1)) {
                            ok = false;
                            break;
                        }
                    }
                    if (!ok) q.add(new int[]{i, j});
                }
            }
        }
        for (int[] i : q) {
            grid[i[0]][i[1]] = color;
        }
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (grid[i][j] == -1) grid[i][j] = cl;
            }
        }
        return grid;
    }

    private void dfs(int x, int y) {
        grid[x][y] = -1;
        for (int i = 0; i < 4; ++i) {
            int tx = x + dir[i][0];
            int ty = y + dir[i][1];
            if (tx >= 0 && tx < n && ty >= 0 && ty < m && grid[tx][ty] == cl) dfs(tx, ty);
        }
    }
}

// [[1,2,1,2,1,2],[2,2,2,2,1,2],[1,2,2,2,1,2]]
// 1
// 3
// 1
```


## 欧拉路径 Hard

### 题意

[题链](https://leetcode-cn.com/problems/valid-arrangement-of-pairs/)

### 题解

hierholzer算法，注意删边，不要判断边是否被遍历过

[参考](https://www.luogu.com.cn/problem/solution/P7771)

```cpp
class Solution {
public:
    vector<vector<int>> validArrangement(vector<vector<int>>& pairs) {
        vector<int> id;
        for (auto i : pairs) {
            id.push_back(i[0]);
            id.push_back(i[1]);
        }
        sort(id.begin(), id.end());
        id.erase(unique(id.begin(), id.end()), id.end());
        int n = (int) id.size();
        vector<int> G[n];
        auto get_id = [&](int x) {
            return lower_bound(id.begin(), id.end(), x) - id.begin();
        };
        auto get_val = [&](int x) {
            return id[x];
        };
        vector<int> indegree(n), outdegree(n);
        for (auto i : pairs) {
            G[get_id(i[0])].push_back(get_id(i[1]));
            outdegree[get_id(i[0])]++;
            indegree[get_id(i[1])]++;
        }
        int s = -1, t = -1;
        for (int i = 0; i < n; ++i) {
            if (outdegree[i] - indegree[i] == 1) s = i;
            if (indegree[i] - outdegree[i] == 1) t = i;
        }
        if (s == -1) s = 0;
        if (t == -1) t = 1;
        stack<int> st;
        //unordered_map<pair<int, int>, bool, pair_hash> used;
        function<void(int)> dfs = [&](int x) {
            while (!G[x].empty()) {
                int tmp = G[x].back();
                G[x].pop_back();
                dfs(tmp);
            }
            st.push(x);
        };
        dfs(s);
        vector<int> tmp;
        while (!st.empty()) {
            tmp.push_back(st.top());
            st.pop();
        }
        vector<vector<int>> ans;
        for (int i = 0; i < (int) tmp.size() - 1; ++i) {
            ans.push_back({get_val(tmp[i]), get_val(tmp[i + 1])});
        } 
        return ans;
    }
};
```


## 前缀和 Hard

### 题意


[题链](https://leetcode-cn.com/problems/maximum-sum-of-3-non-overlapping-subarrays/)


### 题解

```java
class Solution {
    public int[] maxSumOfThreeSubarrays(int[] nums, int k) {
        long mx = -1;
        int left = 0, mid = 0, right = 0;
        int n = nums.length;
        long[] data = new long[n - k + 2];
        long tmp = 0;
        for (int i = 0; i < k; ++i) {
            tmp += nums[i];
        }
        for (int i = 1; i <= n - k + 1; ++i) {
            data[i] = tmp;
            if (i != n - k + 1) {
                tmp -= nums[i - 1];
                tmp += nums[i + k - 1];
            }
        }
        int[] premaxId = new int[n - k + 2];
        int[] sufmaxId = new int[n - k + 2];
        long[] premax = new long[n - k + 2];
        long[] sufmax = new long[n - k + 3];
        long cntMx = -1;
        for (int i = 1; i <= n - k + 1; ++i) {
            if (data[i] > cntMx) {
                cntMx = data[i];
                premaxId[i] = i;
            } else premaxId[i] = premaxId[i - 1];
            premax[i] = Math.max(premax[i - 1], data[i]);
        }
        cntMx = -1;
        for (int i = n - k + 1; i >= 1; --i) {
            if (data[i] >= cntMx) {
                cntMx = data[i];
                sufmaxId[i] = i;
            } else sufmaxId[i] = sufmaxId[i + 1];
            sufmax[i] = Math.max(sufmax[i + 1], data[i]);
        }
        for (int i = 2; i < n - k + 1; ++i) {
            long tmpval = data[i];
            if (i - k >= 1) tmpval += premax[i - k]; else continue;
            if (i + k <= n - k + 1) tmpval += sufmax[i + k]; else continue;
            if (tmpval > mx) {
                mx = tmpval;
                left = premaxId[i - k];
                mid = i;
                right = sufmaxId[i + k];
            }
        }
        return new int[]{left - 1, mid - 1, right - 1};
    }
}
```


## 分类讨论 Medium


### 题意

[题链](https://leetcode-cn.com/problems/valid-tic-tac-toe-state/)


### 题解

```java
class Solution {
    public boolean validTicTacToe(String[] board) {
        char[][] Board = new char[3][3];
        for (int i = 0; i < 3; ++i) {
            for (int j = 0; j < 3; ++j) {
                Board[i][j] = board[i].charAt(j);
            }
        }
        int xnum = 0, onum = 0;
        boolean xwin = false, owin = false;
        for (int i = 0; i < 3; ++i) for (int j = 0; j < 3; ++j) if (Board[i][j] == 'X') xnum++; else if (Board[i][j] == 'O') onum++;
        if (Board[0][0] == Board[0][1] && Board[0][1] == Board[0][2] && Board[0][2] == Board[0][0]) {
            if (Board[0][0] == 'X') xwin = true; else if (Board[0][0] == 'O') owin = true;
        }
        if (Board[1][0] == Board[1][1] && Board[1][1] == Board[1][2] && Board[1][2] == Board[1][0]) {
            if (Board[1][0] == 'X') xwin = true; else if (Board[1][0] == 'O') owin = true;
        }
        if (Board[2][0] == Board[2][1] && Board[2][1] == Board[2][2] && Board[2][2] == Board[2][0]) {
            if (Board[2][0] == 'X') xwin = true; else if (Board[2][0] == 'O') owin = true;
        }
        if (Board[0][0] == Board[1][0] && Board[1][0] == Board[2][0] && Board[2][0] == Board[0][0]) {
            if (Board[0][0] == 'X') xwin = true; else if (Board[0][0] == 'O') owin = true;
        }
        if (Board[0][1] == Board[1][1] && Board[1][1] == Board[2][1] && Board[2][1] == Board[0][1]) {
            if (Board[0][1] == 'X') xwin = true; else if (Board[0][1] == 'O') owin = true;
        }
        if (Board[0][2] == Board[1][2] && Board[1][2] == Board[2][2] && Board[2][2] == Board[0][2]) {
            if (Board[0][2] == 'X') xwin = true; else if (Board[0][2] == 'O') owin = true;
        }
        if (Board[0][0] == Board[1][1] && Board[1][1] == Board[2][2] && Board[2][2] == Board[0][0]) {
            if (Board[0][0] == 'X') xwin = true; else if (Board[0][0] == 'O') owin = true;
        }
        if (Board[0][2] == Board[1][1] && Board[1][1] == Board[2][0] && Board[2][0] == Board[0][2]) {
            if (Board[0][2] == 'X') xwin = true; else if (Board[0][2] == 'O') owin = true;
        }
        if (xwin && owin) return false;
        if (!xwin && !owin) {
            if (xnum == onum || xnum == onum + 1) return true; else return false;
        } else {
            if (xwin) { 
                if (xnum == onum + 1) return true; else return false;  // xnum != onum
            } else {
                if (xnum == onum) return true; else return false;
            }
        }
    }
}
// ["XXX","XOO","OO "]
```


## 前缀和 贪心 Hard

### 题意

[题链](https://leetcode-cn.com/contest/weekly-contest-271/problems/maximum-fruits-harvested-after-at-most-k-steps/)


### 题解


至多拐弯一次，注意细节


```cpp
class Solution {
public:
    int maxTotalFruits(vector<vector<int>>& f, int st, int k) {
        int n = (int) f.size();
        vector<int> presum(2e5 + 10);
        unordered_map<int, int> mp;
        for (int i = 0; i < n; ++i) {
            mp[f[i][0] + 1] = f[i][1];
        }
        for (int i = 1; i < 2e5 + 10; ++i) {
            if (mp.find(i) != mp.end()) {
                presum[i] = presum[i - 1] + mp[i];
            } else {
                presum[i] = presum[i - 1];
            }
        }
        int mx = -1;
        st++;
        if (k == 0) return mp[st];
        for (int i = 1; i <= 2e5 + 3; ++i) {
            int now = 0;
            if (abs(st - i) > k) continue;
            if (i <= st) {
                now += presum[st] - presum[i - 1];
                int rem = k - 2 * (st - i);
                if (rem <= 0 ) {
                    mx = max(mx, now);
                    continue;
                } else if (st + rem > 2e5 + 3) {
                    now += presum[2e5 + 3] - presum[st];
                    mx = max(mx, now);
                    continue;
                }
                now += presum[st + rem] - presum[st];
            } else {
                now += presum[i] - presum[st - 1];
                int rem = k - 2 * (i - st);
                if (rem <= 0) {
                    mx = max(now, mx);
                    continue;
                } else if (st - rem <= 0) {
                    now += presum[st - 1] - presum[0];
                    mx = max(mx, now);
                    continue;
                }
                now += presum[st - 1] - presum[st - rem - 1];
            }
            mx = max(mx, now);
        }
        return mx;
    }
};
```


## 贪心 Medium

### 题意


[题链](https://leetcode-cn.com/problems/max-increase-to-keep-city-skyline/)

### 题解


```java
class Solution {
    public int maxIncreaseKeepingSkyline(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        int[] maxrow = new int[n];
        int[] maxcol = new int[n];
        for (int i = 0; i < n; ++i) {
            int mx = -1;
            for (int j = 0; j < m; ++j) {
                mx = Math.max(mx, grid[i][j]);
            }
            maxrow[i] = mx;
        }
        for (int i = 0; i < m; ++i) {
            int mx = -1;
            for (int j = 0; j < n; ++j) {
                mx = Math.max(mx, grid[j][i]);
            }
            maxcol[i] = mx;
        }
        int ans = 0;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                ans += Math.min(maxcol[j], maxrow[i]) - grid[i][j];      
                //System.out.print(Math.min(maxcol[j], maxrow[i]) + " ");           
            }
            //System.out.println();
        }
        return ans;
    }
}
```


## 思维 Hard

### 题意

[题链](https://leetcode-cn.com/problems/sequentially-ordinal-rank-tracker/)


### 题解

奇妙利用查询的特殊性，参考[这位大佬](https://leetcode-cn.com/problems/sequentially-ordinal-rank-tracker/solution/qiao-miao-li-yong-cha-xun-de-te-shu-xing-7eyg/)，思路真的十分神奇巧妙

```cpp
class SORTracker {
public:
    set<pair<int, string>> st;
    set<pair<int, string>>::iterator ite;
    SORTracker() {
        st.insert({0, ""});
        ite = st.begin();
    }
    
    void add(string name, int score) {
        pair<int, string> p = make_pair(-score, name);
        st.insert(p);
        if (p < *ite) ite--;
    }
    
    string get() {
        return ite++->second;
    }
};

/**
 1. Your SORTracker object will be instantiated and called as such:
 2. SORTracker* obj = new SORTracker();
 3. obj->add(name,score);
 4. string param_2 = obj->get();
 */
```
 
 
## dfs 图论 技巧 Hard

### 题意

有n个人，每个人都有一个喜欢的人，让他们中的几个围着一个圆桌，满足所有人喜欢的人都坐在ta的旁边，求最多可以安排几个人

[题链](https://leetcode-cn.com/problems/maximum-employees-to-be-invited-to-a-meeting/)


### 题解

假设a喜欢b，则他们之间建立一条a指向b的有向边，组成有向图（可能不连通）

经分析可以发现有两种方式满足条件


把基环内向树最大的环放上去（只能放一个环）

![在这里插入图片描述](https://img-blog.csdnimg.cn/b6c6204ef1e84ccc843f31ac49fc11ad.png?x-oss-process=image,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_15,color_FFFFFF,t_70,g_se,x_16)
把类似于a->b->c->d<->e<-f<-g结构放上去（全都放）

![在这里插入图片描述](https://img-blog.csdnimg.cn/d9a2ef807fd34678995635cf2b3e92c6.png?x-oss-process=image,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAV1JZWVlZWVlZWVlZWVlZWVlZ,size_14,color_FFFFFF,t_70,g_se,x_16)

分别求这两种情况


对于第一种，dfs，用着色判断这个点是没遍历过，还是当前遍历的序列，还是以前遍历的

对于第二种，把环长度为2的单独存（假设u<->v），把边反向，求u往非v方向的最长链+v往非u方向的方向的最长链，注意基环内向树变成基环外向树，一个点能延伸的最长链等于所连接点的最长链的最大值+1




```java
class Solution {
    List<Integer>[] G;
    int[] sta, d;
    int max_circle = 0;
    int max_chain = 0;
    List<int[]> mu_pair;
    public int maximumInvitations(int[] fav) {
        int n = fav.length;
        G = new ArrayList[n + 3];
        mu_pair = new ArrayList<>();
        for (int i = 0; i < n; ++i) {
            G[i] = new ArrayList<>();
        }
        for (int i = 0; i < n; ++i) {
            G[fav[i]].add(i);
        }
        sta = new int[n + 3];
        d = new int[n + 3];
        for (int i = 0; i < n; ++i) {
            if (sta[i] == 0) dfs1(i);
        }
        for (int[] i : mu_pair) {
            max_chain += dfs2(i[0], i[1]);
            max_chain += dfs2(i[1], i[0]);
        }
        return Math.max(max_circle, max_chain);
    }
    public void dfs1(int x) {
        sta[x] = 1;
        for (int i : G[x]) {
            if (sta[i] == 0) {
                d[i] = d[x] + 1;
                dfs1(i);
            } else if (sta[i] == 1) {
                int now_circle = d[x] - d[i] + 1;
                if (now_circle == 2) {
                    mu_pair.add(new int[]{x, i});
                } else {
                    max_circle = Math.max(max_circle, now_circle);
                }
            }
        }
        sta[x] = 2;
    }
    public int dfs2(int x, int p) {
        if (G[x].isEmpty() || (G[x].size() == 1 && G[x].get(0) == p)) {
            return 1;
        }
        int ret = 0;
        for (int i : G[x]) {
            if (i != p) {
                ret = Math.max(ret, dfs2(i, x));
            }
        }
        return ret + 1;
    }
}
```


## dp 记忆化搜索 Hard

### 题意

[题链](https://leetcode-cn.com/problems/cat-and-mouse/)

### 题解

注意判断平局的条件

```java
class Solution {
    static final int WIN = 3;
    static final int LOSE = 4;
    static final int DRAW = 0;
    static final int MOUSE_WIN = 1;
    static final int CAT_WIN = 2;
    int n;
    int[][] G;
    int[][][] dp;   // mouse cat round,  val is WIN / LOSE
    public int catMouseGame(int[][] graph) {
        this.n = graph.length;
        this.G = graph;
        dp = new int[n + 2][n + 2][n * 2 + 2];
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                Arrays.fill(dp[i][j], -1);
            }
        }
        int result = getResult(1, 2, 0);
        if (result == WIN) return MOUSE_WIN;
        else if (result == LOSE) return CAT_WIN;
        else return DRAW;
    }
    public int getResult(int mouse, int cat, int round) {
        if (dp[mouse][cat][round] != -1) return dp[mouse][cat][round];
        if (round >= 2 * n) {
            dp[mouse][cat][round] = DRAW;
            return DRAW;
        }
        if (mouse == 0) {
            if (round % 2 == 0) {
                dp[mouse][cat][round] = WIN;
                return WIN;
            } else {
                dp[mouse][cat][round] = LOSE;
                return LOSE;
            }
        }
        if (mouse == cat) {
            if (round % 2 == 0) {
                dp[mouse][cat][round] = LOSE;
                return LOSE;
            } else {
                dp[mouse][cat][round] = WIN;
                return WIN;
            }
        }
        boolean draw = false;
        boolean mouseRound = round % 2 == 0;
        int curMove = round % 2 == 0 ? mouse : cat;
        int curResult;
        for (int i : G[curMove]) {
            if (!mouseRound && i == 0) continue;
            if (mouseRound) {
                curResult = getResult(i, cat, round + 1);
            } else {
                curResult = getResult(mouse, i, round + 1);
            }
            if (curResult == LOSE) {
                dp[mouse][cat][round] = WIN;
                return WIN;
            } else if (curResult == DRAW) {
                draw = true;
            }
        }
        if (draw) {
            dp[mouse][cat][round] = DRAW;
            return DRAW;
        } else {
            dp[mouse][cat][round] = LOSE;
            return LOSE;
        }
    }
}
```



## bfs Hard

### 题意

[题链](https://leetcode-cn.com/problems/jump-game-iv/)


有一个数组，初始时在0位置，每次可以选择向前一个位置或向后一个位置，或者跳到和当前值相同的位置，不能跳出界，求最少几次到最后一个位置


### 题解

转化成图，bfs求最短路，注意标记走过的点和值


```java
class Solution {
    public int minJumps(int[] arr) {
        Map<Integer, List<Integer>> mp = new HashMap<>();
        int n = arr.length;
        boolean[] vis = new boolean[n];
        Set<Integer> hoge = new HashSet<>();
        for (int i = 0; i < n; ++i) {
            mp.putIfAbsent(arr[i], new ArrayList<Integer>());
            mp.get(arr[i]).add(i);
        }
        int ans = 0;
        Queue<Integer> q = new ArrayDeque<>();
        q.offer(0);
        vis[0] = true;
        int num = 0;
        while (!q.isEmpty()) {
            if (num == 0) {
                num = q.size();
                ans++;
            }
            num--;
            int cnt = q.poll();
            if (cnt == n - 1) return ans - 1;
            int val = arr[cnt];
            if (cnt - 1 >= 0 && !vis[cnt - 1]) {
                q.offer(cnt - 1);
            }
            if (cnt + 1 < n && !vis[cnt + 1]) {
                q.offer(cnt + 1);
            }
            if (hoge.contains(val)) continue;
            List<Integer> tmp = mp.get(val);
            for (int i = 0; i < tmp.size(); ++i) {
                if (!vis[tmp.get(i)]) {
                    q.offer(tmp.get(i));
                    vis[tmp.get(i)] = true;
                }
            }
            hoge.add(val);
        }
        return 0;
    }
}
```






## 穷举 模拟 Medium

### 题意


[题链](https://leetcode-cn.com/problems/additive-number/)


### 题解


注意细节，减少dirt



```java
class Solution {
    public boolean isAdditiveNumber(String num) {
        int n = num.length();
        if (n < 3) return false;
        // split after index
        for (int i = 0; i < n - 2; ++i) {
            for (int j = i + 1; j < n - 1; ++j) {
                // checkPtr is the beginning of the number need checking
                int checkPtr = j + 1;
                String first = num.substring(0, i + 1);
                String second = num.substring(i + 1, j + 1);
                while (checkPtr < n) {
                    if (haveLeadingZero(first) || haveLeadingZero(second)) break;
                    String tmp = addForBigInteger(first, second);
                    if (haveLeadingZero(tmp)) break;
                    if (num.length() >= checkPtr + tmp.length() && tmp.equals(num.substring(checkPtr, checkPtr + tmp.length()))) {
                        checkPtr += tmp.length();
                        first = second;
                        second = tmp;
                    } else
                        break;
                }
                if (checkPtr == n) return true;
            }
        }
        return false;
    }
    private String addForBigInteger(String x, String y) {
        int len = Math.max(x.length(), y.length());
        StringBuffer sb1 = new StringBuffer(x);
        StringBuffer sb2 = new StringBuffer(y);
        sb1.reverse();
        sb2.reverse();
        while (sb1.length() < len) {
            sb1.append('0');
        }
        while (sb2.length() < len) {
            sb2.append('0');
        }
        StringBuffer sb = new StringBuffer();
        boolean carry = false;
        for (int i = 0; i < len; ++i) {
            int foo = sb1.charAt(i) - '0';
            int bar = sb2.charAt(i) - '0';
            int tmp = foo + bar + (carry ? 1 : 0);
            sb.append((char) (tmp % 10 + '0'));
            if (tmp > 9) carry = true; else carry = false;
        }
        if (carry) sb.append('1');
        sb.reverse();
        return sb.toString();
    }
    private boolean haveLeadingZero(String x) {
        if (x.isEmpty()) return true;
        if (x.length() == 1) return false;
        return x.charAt(0) == '0';
    }
}
```



## 归纳 Easy

### 题意

[题链](https://leetcode-cn.com/problems/remove-palindromic-subsequences/)


### 题解

```java
class Solution {
    public int removePalindromeSub(String s) {
        int n = s.length();
        for (int i = 0; i < n; ++i) {
            if (s.charAt(i) != s.charAt(n - 1 - i)) return 2;
        }
        return 1;
    }
}
```



## 贪心 技巧 Medium


### 题意


[题链](https://leetcode-cn.com/problems/increasing-triplet-subsequence/)



### 题解


如果没有空间限制直接用前后缀

在遍历的过程中维护三元组的第一个数和第二个数，贪心地选择最小的数作为第一个数和第二个数

注意注释的部分，我本来是这样写的，[2,3,1,4]这个用例错误，当遍历到1时，第一个数变成1，第二个数变成无穷，导致找不到三元组，实际上只应该更新第一个数即第一个数是1，第二个数是3，这个意思是已经有正序的二元组（还差第三个数），且第二个数最小为3

应该在提交前用一些容易想到的corner case来测试，比如说一个数、两个数、[2,3,1,4]等等

```java
class Solution {
    public boolean increasingTriplet(int[] nums) {
        int n = nums.length;
        int first = nums[0];
        int second = Integer.MAX_VALUE;
        for (int i = 1; i < n; ++i) {
            if (nums[i] > second) return true;
            if (nums[i] < first) {
                // second = Integer.MAX_VALUE;
                first = nums[i];
            } else if (nums[i] > first) {
                second = nums[i];
            }
        }
        return false;
    }
}
```




## 堆 Hard


### 题意

[题链](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

合并k个有序链表


### 题解


```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null) return null;
        PriorityQueue<ListNode> pq = new PriorityQueue<>((x, y) -> x.val - y.val);
        int n = lists.length;
        ListNode ptrListNode = new ListNode();
        ListNode ans = ptrListNode;
        for (int i = 0; i < n; ++i) {
            if (lists[i] == null) continue;
            pq.offer(lists[i]);
        }
        while (!pq.isEmpty()) {
            ListNode cntListNode = pq.poll();
            ptrListNode.next = cntListNode;
            ptrListNode = ptrListNode.next;
            if (cntListNode.next != null) pq.offer(cntListNode.next);
        }
        return ans.next;
    }
}
```





## 模拟 Medium


### 题意

[题链](https://leetcode-cn.com/problems/stock-price-fluctuation/)


### 题解


模拟


```java
class StockPrice {
    Map<Integer, Integer> prices;
    TreeSet<Integer> treeSet;
    Map<Integer, Integer> num;
    int lastestTimestamp;
    public StockPrice() {
        prices = new HashMap<>();
        treeSet = new TreeSet<>();
        num = new HashMap<>();
        lastestTimestamp = -1;
    }

    public void update(int timestamp, int price) {
        lastestTimestamp = Math.max(timestamp, lastestTimestamp);
        int prevPrice = prices.getOrDefault(timestamp, -1);
        prices.put(timestamp, price);
        if (prevPrice == -1) {
            num.put(price, num.getOrDefault(price, 0) + 1);
        } else {
            num.put(prevPrice, num.get(prevPrice) - 1);
            num.put(price, num.getOrDefault(price, 0) + 1);
        }
        treeSet.add(price);
    }

    public int current() {
        return prices.get(lastestTimestamp);
    }

    public int maximum() {
        while (num.getOrDefault(treeSet.last(), 0) == 0) {
            treeSet.remove(treeSet.last());
        }
        return treeSet.last();
    }

    public int minimum() {
        while (num.getOrDefault(treeSet.first(), 0) == 0) {
            treeSet.remove(treeSet.first());
        }
        return treeSet.first();
    }
}

/**
 * Your StockPrice object will be instantiated and called as such:
 * StockPrice obj = new StockPrice();
 * obj.update(timestamp,price);
 * int param_2 = obj.current();
 * int param_3 = obj.maximum();
 * int param_4 = obj.minimum();
 */
```


## 贪心 Medium

### 题意

[题链](https://leetcode-cn.com/problems/stone-game-ix/)


### 题解

石子数对3取模

枚举alice选择1和选择2的情况，对于每个人，假设当前和为1，则优先选择1，如果没有1再选择0，如果当前和为2，则优先选择2，如果没有2则选择0，如果都没得选就输了


为什么这样贪心是对的，可以看做选择1而不是选择0，是对自己有好处，对别人有坏处（损人又利己），而选择0是对自己有好处，对别人没坏处


```java
class Solution {
    public boolean stoneGameIX(int[] stones) {
        int n = stones.length;
        boolean aliceTurn = true;
        boolean aliceWin1 = false, aliceWin2 = false;   
        int zeroNum = 0, oneNum = 0, twoNum = 0;
        for (int i : stones) {
            if (i % 3 == 0) zeroNum++;
            else if (i % 3 == 1) oneNum++;
            else twoNum++;
        }
        int cnt;
        int cntOneNum = oneNum, cntTwoNum = twoNum;
        int cntZeroNum = zeroNum;
        aliceTurn = true;
        if (cntOneNum > 0) {
            cnt = 1;
            cntOneNum--;
            aliceTurn = !aliceTurn;
            while (true) {
                if (cntZeroNum == 0 && cntOneNum == 0 && cntTwoNum == 0) {
                    aliceWin1 = false;
                    break;
                }
                if (cnt == 1 && cntOneNum > 0) {
                    cntOneNum--;
                    cnt = 2;
                    aliceTurn = !aliceTurn;
                } else if (cnt == 2 && cntTwoNum > 0) {
                    cntTwoNum--;
                    cnt = 1;
                    aliceTurn = !aliceTurn;
                } else if (cnt == 1 && cntOneNum == 0 && cntZeroNum > 0) {
                    cntZeroNum--;
                    aliceTurn = !aliceTurn;
                } else if (cnt == 2 && cntTwoNum == 0 && cntZeroNum > 0) {
                    cntZeroNum--;
                    aliceTurn = !aliceTurn;
                } else {
                    if (aliceTurn) {
                        aliceWin1 = false;
                        break;
                    } else {
                        aliceWin1 = true;
                         break;
                    }
                }
            }
        }
        cntOneNum = oneNum;
        cntTwoNum = twoNum;
        cntZeroNum = zeroNum;
        aliceTurn = true;
        if (cntTwoNum > 0) {
            cnt = 2;
            cntTwoNum--;
            aliceTurn = !aliceTurn;
            while (true) {
                if (cntZeroNum == 0 && cntOneNum == 0 && cntTwoNum == 0) {
                    aliceWin2 = false;
                    break;
                }
                if (cnt == 1 && cntOneNum > 0) {
                    cntOneNum--;
                    cnt = 2;
                    aliceTurn = !aliceTurn;
                } else if (cnt == 2 && cntTwoNum > 0) {
                    cntTwoNum--;
                    cnt = 1;
                    aliceTurn = !aliceTurn;
                } else if (cnt == 1 && cntOneNum == 0 && cntZeroNum > 0) {
                    cntZeroNum--;
                    aliceTurn = !aliceTurn;
                } else if (cnt == 2 && cntTwoNum == 0 && cntZeroNum > 0) {
                    cntZeroNum--;
                    aliceTurn = !aliceTurn;
                } else {
                    if (aliceTurn) {
                        aliceWin2 = false;
                        break;
                    } else {
                        aliceWin2 = true;
                        break;
                    }
                }
            }
        }
        return aliceWin1 || aliceWin2;
    }
}
```


## 模拟 Easy

### 题意


[题链](https://leetcode-cn.com/problems/count-of-matches-in-tournament/)

### 题解

```java
class Solution {
    public int numberOfMatches(int n) {
        int ans = 0;
        while (n > 1) {
            ans += n / 2;
            if (n % 2 == 1) {
                n++;
            }
            n /= 2;
        }
        return ans;
    }
}
```


## 排序 后缀 Medium

### 题意

[题链](https://leetcode-cn.com/problems/the-number-of-weak-characters-in-the-game/)


### 题解

排序，维护后缀最大值

注意特判边界

```java
class Solution {
    public int numberOfWeakCharacters(int[][] properties) {
        Arrays.sort(properties, (x, y) -> {
            return x[0] == y[0] ? (x[1] - y[1]) : (x[0] - y[0]);
        });
        int n = properties.length;
        int ans = 0;
        int[] sufmax = new int[n];
        sufmax[n - 1] = properties[n - 1][1];
        for (int i = n - 2; i >= 0; --i) {
            sufmax[i] = Math.max(sufmax[i + 1], properties[i][1]);
        }
        int ptr = 1;
        for (int i = 0; i < n - 1; ++i) {
            while (ptr < n && properties[ptr][0] <= properties[i][0]) ptr++;
            if (ptr >= n) break;
            if (sufmax[ptr] > properties[i][1]) ans++;
        }
        return ans;
    }
}
```


## bfs Medium

### 题意


[题链](https://leetcode-cn.com/problems/map-of-highest-peak/)


### 题解

bfs

```java
class Solution {
    public int[][] highestPeak(int[][] isWater) {
        int[][] dir = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        int n = isWater.length;
        int m = isWater[0].length;
        int[][] ans = new int[n][m];
        for (int i = 0; i < n; ++i) {
            Arrays.fill(ans[i], -1);
        }
        Queue<int[]> queue = new ArrayDeque<>();
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (isWater[i][j] == 1) {
                    ans[i][j] = 0;
                    queue.offer(new int[]{i, j});
                }
            }
        }
        while (!queue.isEmpty()) {
            int[] tmp = queue.poll();
            int x = tmp[0], y = tmp[1];
            for (int i = 0; i < 4; ++i) {
                int dx = x + dir[i][0];
                int dy = y + dir[i][1];
                if (dx >= 0 && dx < n && dy >= 0 && dy < m && ans[dx][dy] == -1) {
                    ans[dx][dy] = ans[x][y] + 1;
                    queue.offer(new int[]{dx, dy});
                }
            }
        }
        return ans;
    }
}
```


## 哈希表 Medium

### 题意

### 题解


{{< admonition  title="Java语法注意点" open=false >}}
注意int[]不能作为HashMap的Key，理论上可以但这样得不到想要的结果，比如插入[1, 2]数组，调用containsKey(new int[]{1, 2})找不到，原因是containsKey只会识别相同的对象，而这两个对象虽然值相同，但地址不同，java在比较两个对象是否是同一个时，会先比较hashcode，如果hashcode不同就不是同一个，如果hashcode相同就会调用equals()方法，所以可以通过重写hashcode()和equals()方法达到目的，但这样比较麻烦，这就像c++中unordered_map<pair<int, int>, int> mp;或者unordered_map<vector\<int\>, int> mp;一样需要一个hash_pair。如果数组作为TreeMap的Key，会报错，因为数组没有实现Comparable，无法比较（排序）

用List\<Integer>作为HashMap的Key是可以的（Map<List\<Integer>, Integer> mp; mp.put(Arrays.asList(1, 2), 3;）， 因为 java.util.Collection自己有hashcode()和equals()且是比较值是否相同的

不过用List\<Integer>作为Key很慢，慎用
{{< /admonition >}}



用List作为Key的TLE版本

```java
class DetectSquares {
    Map<List<Integer>, Integer> mp;

    public DetectSquares() {
        mp = new HashMap<>();
    }

    public void add(int[] point) {
        mp.put(Arrays.asList(point[0], point[1]), mp.getOrDefault(Arrays.asList(point[0], point[1]), 0) + 1);
    }

    public int count(int[] point) {
        int ans = 0;
        int x = point[0], y = point[1];
        for (int i = 1; i <= 1000; ++i) {
            ans += mp.getOrDefault(Arrays.asList(x - i, y), 0) * mp.getOrDefault(Arrays.asList(x, y - i), 0) * mp.getOrDefault(Arrays.asList(x - i, y - i), 0);
            ans += mp.getOrDefault(Arrays.asList(x - i, y), 0) * mp.getOrDefault(Arrays.asList(x, y + i), 0) * mp.getOrDefault(Arrays.asList(x - i, y + i), 0);
            ans += mp.getOrDefault(Arrays.asList(x, y - i), 0) * mp.getOrDefault(Arrays.asList(x + i, y), 0) * mp.getOrDefault(Arrays.asList(x + i, y - i), 0);
            ans += mp.getOrDefault(Arrays.asList(x + i, y), 0) * mp.getOrDefault(Arrays.asList(x, y + i), 0) * mp.getOrDefault(Arrays.asList(x + i, y + i), 0);
        }
        return ans;
    }
}

/**
 * Your DetectSquares object will be instantiated and called as such:
 * DetectSquares obj = new DetectSquares();
 * obj.add(point);
 * int param_2 = obj.count(point);
 */
```

c++ 用pair作为Key的TLE版本


```cpp
class DetectSquares {
public:
    struct pair_hash {
        template<class T1, class T2>
        std::size_t operator()(const std::pair<T1, T2> &p) const {
            auto h1 = std::hash<T1>{}(p.first);
            auto h2 = std::hash<T2>{}(p.second);
            return h1 ^ h2;
        }
    };

    unordered_map<pair<int, int>, int, pair_hash> mp;

    DetectSquares() {

    }

    void add(vector<int> point) {
        mp[{point[0], point[1]}]++;
    }

    int count(vector<int> point) {
        int ans = 0;
        int x = point[0], y = point[1];
        for (int i = 1; i <= 1000; ++i) {
            ans += mp[{x - i, y}] * mp[{x, y - i}] * mp[{x - i, y - i}];
            ans += mp[{x - i, y}] * mp[{x, y + i}] * mp[{x - i, y + i}];
            ans += mp[{x, y - i}] * mp[{x + i, y}] * mp[{x + i, y - i}];
            ans += mp[{x + i, y}] * mp[{x, y + i}] * mp[{x + i, y + i}];
        }
        return ans;
    }
};
```



用哈希表嵌套哈希表，TLE，没有用判断优化的版本（单样例没超时，总时间超时）


```java
class DetectSquares {
    Map<Integer, Map<Integer, Integer>> mp;

    public DetectSquares() {
        mp = new HashMap<>();
    }

    public void add(int[] point) {
        int x = point[0], y = point[1];
        mp.putIfAbsent(x, new HashMap<>());
        Map<Integer, Integer> tmp = mp.get(x);
        tmp.put(y, tmp.getOrDefault(y, 0) + 1);
        mp.put(x, tmp);
    }

    public int count(int[] point) {
        int ans = 0;
        int x = point[0], y = point[1];
        for (int i = 1; i <= 1000; ++i) {
            ans += mp.getOrDefault(x - i, new HashMap<>()).getOrDefault(y, 0) * mp.getOrDefault(x, new HashMap<>()).getOrDefault(y - i, 0) * mp.getOrDefault(x - i, new HashMap<>()).getOrDefault(y - i, 0);
            ans += mp.getOrDefault(x - i, new HashMap<>()).getOrDefault(y, 0) * mp.getOrDefault(x, new HashMap<>()).getOrDefault(y + i, 0) * mp.getOrDefault(x - i, new HashMap<>()).getOrDefault(y + i, 0);
            ans += mp.getOrDefault(x, new HashMap<>()).getOrDefault(y - i, 0) * mp.getOrDefault(x + i, new HashMap<>()).getOrDefault(y, 0) * mp.getOrDefault(x + i, new HashMap<>()).getOrDefault(y - i, 0);
            ans += mp.getOrDefault(x + i, new HashMap<>()).getOrDefault(y, 0) * mp.getOrDefault(x, new HashMap<>()).getOrDefault(y + i, 0) * mp.getOrDefault(x + i, new HashMap<>()).getOrDefault(y + i, 0);
        }
        return ans;
    }
}

/**
 * Your DetectSquares object will be instantiated and called as such:
 * DetectSquares obj = new DetectSquares();
 * obj.add(point);
 * int param_2 = obj.count(point);
 */
```


优化后的AC代码（还可以再优化）


```java
class DetectSquares {
    Map<Integer, Map<Integer, Integer>> mp;

    public DetectSquares() {
        mp = new HashMap<>();
    }

    public void add(int[] point) {
        int x = point[0], y = point[1];
        mp.putIfAbsent(x, new HashMap<>());
        Map<Integer, Integer> tmp = mp.get(x);
        tmp.put(y, tmp.getOrDefault(y, 0) + 1);
        mp.put(x, tmp);
    }

    public int count(int[] point) {
        int ans = 0;
        int x = point[0], y = point[1];
        for (int i = 1; i <= 1000; ++i) {
            if (mp.containsKey(x - i) && mp.containsKey(x)) {
                ans += mp.get(x - i).getOrDefault(y, 0) * mp.get(x).getOrDefault(y - i, 0) * mp.get(x - i).getOrDefault(y - i, 0);
                ans += mp.get(x - i).getOrDefault(y, 0) * mp.get(x).getOrDefault(y + i, 0) * mp.get(x - i).getOrDefault(y + i, 0);
            }
            if (mp.containsKey(x + i) && mp.containsKey(x)) {
                ans += mp.get(x).getOrDefault(y - i, 0) * mp.get(x + i).getOrDefault(y, 0) * mp.get(x + i).getOrDefault(y - i, 0);
                ans += mp.get(x + i).getOrDefault(y, 0) * mp.get(x).getOrDefault(y + i, 0) * mp.get(x + i).getOrDefault(y + i, 0);
                
            }
        }
        return ans;
    }
}

/**
 * Your DetectSquares object will be instantiated and called as such:
 * DetectSquares obj = new DetectSquares();
 * obj.add(point);
 * int param_2 = obj.count(point);
 */
```


## 哈希表 Easy

### 题意

[题链](https://leetcode-cn.com/problems/uncommon-words-from-two-sentences/)


### 题解


```java
class Solution {
    public String[] uncommonFromSentences(String s1, String s2) {
        Map<String, Integer> mp = new HashMap<>();
        String[] word1 = s1.split(" ");
        String[] word2 = s2.split(" ");
        for (String i : word1) {
            mp.put(i, mp.getOrDefault(i, 0) + 1);
        }
        for (String i : word2) {
            mp.put(i, mp.getOrDefault(i, 0) + 1);
        }
        List<String> ans = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : mp.entrySet()) {
            if (entry.getValue() == 1) ans.add(entry.getKey());
        }
        return ans.toArray(new String[0]);
    }
}
```


注意通过toArray(new String[0])这种方法来转变成String数组，如果在前面加(String[]) 强制类型转化会转化失败，因为toArray不知道转化成什么类型，返回一个object，虽然前者也是返回obj，但指定了类型


## 并查集 状态压缩 Hard

### 题意

[题链](https://leetcode-cn.com/problems/groups-of-strings/)

### 题解

周赛的一道题，思路很简单，当时一直TLE，然后一直想着优化代码。赛后发现是时间复杂度算错了，原来以为时间复杂度是O(n\*26\*26)，后来发现如果数组中存在大量重复字符串时，比如说在计算not change部分时，“abc”会遍历一遍所有“abc”的下标，这样时间复杂度就是O(n*n)，其实只要遍历第一个“abc”的下标就行，预处理时把所有相同字符串加到一个集合中


为什么会犯这种错误或找不出错？可能是因为在做题时很少有时间复杂度算错的情况，大多数都是代码冗余或数据结构或者STL低效的问题，所以条件反射地往这方面想

我如何找出这个错误？先是花大量的时间在优化代码上，后来我企图测试是哪部分代码直接造成超时，最后发现当预处理二进制和not change部分共存时，超时，我仔细地看了一遍预处理二进制的代码，发现没有任何问题（甚至还怀疑是不是用for each更快），然后将not change的遍历mp[cnt]数组注释掉，发现这两部分代码可以共存，很大概率是这条代码超时，后来就想到如果存在很多一样的字符串，那么每次都需要完整遍历一遍，时间复杂度是O(n*n)

不知道怎样快速查找出错误，一直都在摸索，只能说下次要再检查一遍时间复杂度是否算对

最开始还忘记算相同的情况（not change）

```cpp
class Solution {
public:
    vector<int> par;
    vector<int> rankk;

    void init(int n) {
        for (int i = 0; i < n; i++) {
            par[i] = i;
            rankk[i] = 0;
        }
    }

    int find(int x) {
        if (par[x] == x) return x;
        else return par[x] = find(par[x]);
    }

    void unite(int x, int y) {
        x = find(x);
        y = find(y);
        if (x == y) return;

        if (rankk[x] < rankk[y]) par[x] = y;
        else {
            par[y] = x;
            if (rankk[x] == rankk[y]) rankk[x]++;
        }
    }

    bool same(int x, int y) {
        return find(x) == find(y);
    }

    vector<int> groupStrings(vector<string> &words) {
        unordered_map<int, vector<int>> mp;
        int n = (int) words.size();
        par.resize(n + 10);
        rankk.resize(n + 10);
        init(n + 5);
        vector<int> bin(n + 10);
        for (int i = 0; i < n; ++i) {
            int tmp = 0;
            for (int j = 0; j < words[i].length(); ++j) {
                tmp |= (1 << (words[i][j] - 'a'));
            }
            mp[tmp].push_back(i);
            bin[i] = tmp;
        }
        // !!!
        for (auto [i, j] : mp) {
            for (int k = 0; k < (int) j.size() - 1; ++k) {
                unite(j[k], j[k + 1]);
            } 
        }
        for (int i = 0; i < n; ++i) {
            int cnt = bin[i];
            vector<int> exist, notexist;
            for (int j = 0; j < 26; ++j) {
                if (cnt >> j & 1) {
                    exist.push_back(j);
                } else {
                    notexist.push_back(j);
                }
            }
            // delete
            for (int j : exist) {
                int tmp = cnt ^ (1 << j);
                if (mp.find(tmp) != mp.end()) {
                    unite(i, mp[tmp][0]);
                }
            }
            // add
            for (int j : notexist) {
                int tmp = cnt | (1 << j);
                if (mp.find(tmp) != mp.end()) {
                    unite(i, mp[tmp][0]);
                }
            }
            // replace
            for (int j : exist) {
                for (int k : notexist) {
                    int tmp = cnt ^ (1 << j);
                    tmp |= (1 << k);
                    if (mp.find(tmp) != mp.end()) {
                        unite(i, mp[tmp][0]);
                    }
                }
            }
            // not change
            if (mp.find(cnt) != mp.end()) {
                unite(i, mp[cnt][0]);
            }
        }
        unordered_map<int, int> sz;
        int ans1, ans2;
        ans2 = -1;
        for (int i = 0; i < n; ++i) {
            sz[find(i)]++;
        }
        ans1 = (int) sz.size();
        for (auto [i, j] : sz) {
            ans2 = max(ans2, j);
        }
        return vector<int>{ans1, ans2};
    }
};
```


## 分治 状压 二分 Hard

### 题意

[题链](https://leetcode-cn.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/)


### 题解

meet in the middle

分治把前一半2\^15的情况枚举出来，把后一半2\^15的情况枚举出来，然后枚举前一半，在后一半中二分查找，时间复杂度O(nlogn) n最大2\^15


```cpp
class Solution {
public:
    int minimumDifference(vector<int>& nums) {
        int n = (int) nums.size();
        n /= 2;
        unordered_map<int, vector<int>> mpL, mpR;
        vector<int> L(nums.begin(), nums.begin() + n);
        vector<int> R(nums.begin() + n, nums.end());
        for (int i = 1; i <= n; ++i) {
            int ss = (1 << i) - 1;
            while (ss < (1 << n)) {
                int tmp = 0;
                for (int j = 0; j < n; ++j) {
                    if (ss >> j & 1) {
                        tmp += L[j];
                    } else {
                        tmp -= L[j];
                    }
                }
                mpL[i].push_back(tmp);
                int x = ss & -ss, y = ss + x;
                ss = ((ss & ~y) / x >> 1) | y;
            }
        }
        // i = 0
        mpL[0].push_back(-accumulate(L.begin(), L.end(), 0));
        for (int i = 1; i <= n; ++i) {
            int ss = (1 << i) - 1;
            while (ss < (1 << n)) {
                int tmp = 0;
                for (int j = 0; j < n; ++j) {
                    if (ss >> j & 1) {
                        tmp += R[j];
                    } else {
                        tmp -= R[j];
                    }
                }
                mpR[i].push_back(tmp);
                int x = ss & -ss, y = ss + x;
                ss = ((ss & ~y) / x >> 1) | y;
            }
        }
        // i = 0
        mpR[0].push_back(-accumulate(R.begin(), R.end(), 0));
        int ans = 0x3f3f3f3f;
        for (int i = 0; i <= n; ++i) {
            sort(mpL[i].begin(), mpL[i].end());
            mpL[i].erase(unique(mpL[i].begin(), mpL[i].end()), mpL[i].end());
            sort(mpR[i].begin(), mpR[i].end());
            mpR[i].erase(unique(mpR[i].begin(), mpR[i].end()), mpR[i].end());
        }
        for (int i = 0; i <= n; ++i) {
            for (int j : mpL[i]) {
                auto ite = lower_bound(mpR[n - i].begin(), mpR[n - i].end(), -j);
                if (ite != mpR[n - i].end()) {
                    ans = min(ans, abs(j + *ite));
                }
                if (ite != mpR[n - i].begin()) {
                    ite--;
                    ans = min(ans, abs(j + *ite));
                }
            }
        }
        return ans;
    }
};
```


## 字典树 异或 Hard


### 题意

[题链](https://leetcode-cn.com/problems/count-pairs-with-xor-in-a-range/)

给一长度为2e4的数组，每个值最大为2e4，求有多少个数对，异或值在low和high之间

### 题解

遍历数组建字典树，对于当前数，查询字典树中有多少个数满足条件，再把这个数插入到字典树中

查询字典树有多少个数满足条件，可以查询字典树中有多少个数异或<=high，有多少个<=low-1，相减

查询字典树中有多少个数和y异或值<=x，就是从根节点往下遍历，如果x的当前位为0，则只能找和y相同的位，如果x的当前位为1，那和y当前位相同的位之后的所有节点都满足条件，和y当前位不同的继续往下搜，所以维护每个节点下面存了几个数

维护每个节点下面存了几个数，用sz[i]表示i节点存了几个数，只要在每次插入的时候，给沿途的每个节点sz[i]++就行

时间复杂度O(2e4 * 15)

```java
class Solution {
    int[][] next;
    int cnt;
    int[] sz;
    int low, high;
    public void insert(int num) {
        int p = 0;
        for (int i = 14; i >= 0; --i) {
            int c = (num >> i & 1) == 1 ? 1 : 0;
            if (next[p][c] == 0) {
                ++cnt;
                next[p][c] = cnt;
            }
            p = next[p][c];
            sz[p]++;
        }
    }
    public int count(int x) {
        return countLessThanOrEquals(high, x) - countLessThanOrEquals(low - 1, x);
    }
    public int countLessThanOrEquals(int bd, int x) {
        int p = 0;
        int ret = 0;
        for (int i = 14; i >= 0; --i) {
            int cx = (x >> i & 1) == 1 ? 1 : 0;
            int cbd = (bd >> i & 1) == 1 ? 1 : 0;
            if (cbd == 0) {
                if (next[p][cx] == 0) {
                    return ret;
                }
                p = next[p][cx];
                if (i == 0) {
                    ret += sz[p];
                    return ret;
                }
            } else {
                if (next[p][cx] != 0) {
                    ret += sz[next[p][cx]];
                }
                if (next[p][cx ^ 1] != 0) {
                    p = next[p][cx ^ 1];
                } else {
                    return ret;
                }
                if (i == 0) {
                    ret += sz[p];
                    return ret;
                }
            }
        }
        return 0;
    }
    public int countPairs(int[] nums, int low, int high) {
        this.low = low;
        this.high = high;
        int n = nums.length;
        next = new int[16 * (n + 2)][2];
        sz = new int[16 * (n + 2)];
        int ans = 0;
        for (int i : nums) {
            ans += count(i);
            insert(i);
        }
        return ans;
    }
}
```


## 二分 贪心 结论 Hard

### 题意

[题链](https://leetcode-cn.com/problems/maximum-running-time-of-n-computers/)

### 题解

二分找答案，假设最长时间是k，有一个结论是，>=k的电池只会给一个电脑供电，不会出现给一个电脑供一会儿电，再转移给另一个电脑的情况，因为这样不会更优

所以每个电池能提供的电是min(pi, k)，累加就是总的能提供的电，check就是判断总的电和n*k的大小，如果大于n*k，一定存在一种调度满足每个电脑同时充k时间（可以把电池看做电量为1的若干电池去填充）

```java
class Solution {
    public long maxRunTime(int n, int[] batteries) {
        long l = 1, r = (long)1e14 + 10;
        while (l <= r) {
            long mid = l + (r - l) / 2;
            long tmp = 0;
            for (int i : batteries) {
                tmp += Math.min(i, mid);
            }
            if (tmp >= n * mid) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return l - 1;
    }
}
```


## bfs Hard

### 题意

[题链](https://leetcode-cn.com/problems/escape-a-large-maze/)

有一个1e6\*1e6的格子，有200个障碍，求能否从s点到t点，只能4方向走

### 题解 

 因为只有200个障碍，所以看s点有没有被障碍围起来，看t点有没有被障碍围起来即可


由于障碍45°斜着排，把点困在某个角落里，能困住的格子最多，或者用的障碍最少，即最优。这样点最多只能到达400步以内的格子，所以只要bfs判断点能否到达400步以外的格子就行，两个一起搜，如果搜的过程中，能碰到对方也行

然后我超时了。。。单样例200+ms，我懵逼了，时间复杂度O(6.4e5)，leetcode的超时到底是怎么算的，单样例能过，总的就超时？难道还要算样例总时间？这合理吗

所以我被迫用另一个方法，最优的障碍设置使得点最多访问200\*(200-1)/2个格子，所以bfs判断访问了多少个格子，而不是能否到达400步以外的格子，这样时间复杂度从O(6.4e5)降到O(4e4)，单样例10+ms

谢谢你，leetcode，让我去想更高效的方法🙏

最初TLE代码

```java
class Solution {
    public boolean isEscapePossible(int[][] blocked, int[] source, int[] target) {
        final long STEP = 410;
        final int[][] dir = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        Map<Long, Integer> used = new HashMap<>();
        long sx = source[0], sy = source[1];
        long tx = target[0], ty = target[1];
        Set<Long> b = new HashSet<>();
        for (int[] i : blocked) {
            b.add((long) (i[0] * 1e6 + i[1]));
        }

        Queue<Long> q = new ArrayDeque<>();
        q.offer((long) (sx * 1e6 + sy));
        used.put((long) (sx * 1e6 + sy), 0);
        boolean sok = false, tok = false;
        while (!q.isEmpty()) {
            long val = q.poll();
            long cntx = (long) (val / 1e6);
            long cnty = (long) (val % 1e6);
            for (int i = 0; i < 4; ++i) {
                long dx = cntx + dir[i][0];
                long dy = cnty + dir[i][1];
                if (dx == tx && dy == ty) return true;
                if (dx >= 0 && dx < 1e6 && dy >= 0 && dy < 1e6 && !b.contains((long) (dx * 1e6 + dy)) && !used.containsKey((long) (dx * 1e6 + dy))) {
                    used.put((long) (dx * 1e6 + dy), used.get(val) + 1);
                    q.offer((long) (dx * 1e6 + dy));
                    if (used.get((long) (dx * 1e6 + dy)) >= STEP) {
                        sok = true;
                        q.clear();
                        used.clear();
                        break;
                    }
                }
            }
        }

        q.offer((long) (tx * 1e6 + ty));
        used.put((long) (tx * 1e6 + ty), 0);
        while (!q.isEmpty()) {
            long val = q.poll();
            long cntx = (long) (val / 1e6);
            long cnty = (long) (val % 1e6);
            for (int i = 0; i < 4; ++i) {
                long dx = cntx + dir[i][0];
                long dy = cnty + dir[i][1];
                if (dx == sx && dy == sy) return true;
                if (dx >= 0 && dx < 1e6 && dy >= 0 && dy < 1e6 && !b.contains((long) (dx * 1e6 + dy)) && !used.containsKey((long) (dx * 1e6 + dy))) {
                    used.put((long) (dx * 1e6 + dy), used.get(val) + 1);
                    q.offer((long) (dx * 1e6 + dy));
                    if (used.get((long) (dx * 1e6 + dy)) >= STEP) {
                        tok = true;
                        q.clear();
                        break;
                    }
                }
            }
        }

        if (sok && tok) return true;
        return false;
    }
}
```



以为不是时间复杂度的问题，想去优化代码，提取重复的代码，改版的TLE代码


```java
class Solution {
    public boolean isEscapePossible(int[][] blocked, int[] source, int[] target) {
        final long STEP = 410;
        final int[][] dir = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        Map<Long, Integer> used = new HashMap<>();
        long sx = source[0], sy = source[1];
        long tx = target[0], ty = target[1];
        Set<Long> b = new HashSet<>();
        for (int[] i : blocked) {
            b.add((long) (i[0] * 1e6 + i[1]));
        }

        Queue<Long> q = new ArrayDeque<>();
        q.offer((long) (sx * 1e6 + sy));
        used.put((long) (sx * 1e6 + sy), 0);
        boolean sok = false, tok = false;
        while (!q.isEmpty()) {
            long val = q.poll();
            long cntx = (long) (val / 1e6);
            long cnty = (long) (val % 1e6);
            for (int i = 0; i < 4; ++i) {
                long dx = cntx + dir[i][0];
                long dy = cnty + dir[i][1];
                if (dx == tx && dy == ty) return true;
                long tmp = (long) (dx * 1e6 + dy);
                if (dx >= 0 && dx < 1e6 && dy >= 0 && dy < 1e6 && !b.contains(tmp) && !used.containsKey(tmp)) {
                    used.put(tmp, used.get(val) + 1);
                    q.offer(tmp);
                    if (used.get(tmp) >= STEP) {
                        sok = true;
                        q.clear();
                        //used.clear();
                        break;
                    }
                }
            }
        }

        if (!sok) return false;

        q.offer((long) (tx * 1e6 + ty));
        used.put((long) (tx * 1e6 + ty), 0);
        while (!q.isEmpty()) {
            long val = q.poll();
            long cntx = (long) (val / 1e6);
            long cnty = (long) (val % 1e6);
            for (int i = 0; i < 4; ++i) {
                long dx = cntx + dir[i][0];
                long dy = cnty + dir[i][1];
                if (dx == sx && dy == sy) return true;
                long tmp = (long) (dx * 1e6 + dy);
                if (dx >= 0 && dx < 1e6 && dy >= 0 && dy < 1e6 && !b.contains(tmp) && !used.containsKey(tmp)) {
                    used.put(tmp, used.get(val) + 1);
                    q.offer(tmp);
                    if (used.get(tmp) >= STEP) {
                        tok = true;
                        q.clear();
                        break;
                    }
                }
            }
        }

        if (sok && tok) return true;
        return false;
    }
}
```



优化时间复杂度的AC代码

```java
class Solution {
    public boolean isEscapePossible(int[][] blocked, int[] source, int[] target) {
        final long COUNT = 20010;
        final int[][] dir = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        Map<Long, Integer> used = new HashMap<>();
        long sx = source[0], sy = source[1];
        long tx = target[0], ty = target[1];
        Set<Long> b = new HashSet<>();
        for (int[] i : blocked) {
            b.add((long) (i[0] * 1e6 + i[1]));
        }

        Queue<Long> q = new ArrayDeque<>();
        q.offer((long) (sx * 1e6 + sy));
        used.put((long) (sx * 1e6 + sy), 0);
        boolean sok = false, tok = false;
        int ct = 0;
        while (!q.isEmpty()) {
            long val = q.poll();
            long cntx = (long) (val / 1e6);
            long cnty = (long) (val % 1e6);
            for (int i = 0; i < 4; ++i) {
                long dx = cntx + dir[i][0];
                long dy = cnty + dir[i][1];
                if (dx == tx && dy == ty) return true;
                long tmp = (long) (dx * 1e6 + dy);
                if (dx >= 0 && dx < 1e6 && dy >= 0 && dy < 1e6 && !b.contains(tmp) && !used.containsKey(tmp)) {
                    ct++;
                    used.put(tmp, used.get(val) + 1);
                    q.offer(tmp);
                    if (ct >= COUNT) {
                        sok = true;
                        q.clear();
                        used.clear();
                        break;
                    }
                }
            }
        }

        if (!sok) return false;

        q.offer((long) (tx * 1e6 + ty));
        used.put((long) (tx * 1e6 + ty), 0);
        while (!q.isEmpty()) {
            long val = q.poll();
            long cntx = (long) (val / 1e6);
            long cnty = (long) (val % 1e6);
            for (int i = 0; i < 4; ++i) {
                long dx = cntx + dir[i][0];
                long dy = cnty + dir[i][1];
                if (dx == sx && dy == sy) return true;
                long tmp = (long) (dx * 1e6 + dy);
                if (dx >= 0 && dx < 1e6 && dy >= 0 && dy < 1e6 && !b.contains(tmp) && !used.containsKey(tmp)) {
                    ct++;
                    used.put(tmp, used.get(val) + 1);
                    q.offer(tmp);
                    if (ct >= COUNT) {
                        tok = true;
                        q.clear();
                        used.clear();
                        break;
                    }
                }
            }
        }

        if (sok && tok) return true;
        return false;
    }
}
```


这个题的测试用例不是很强，有个corner case是200个障碍在左下角45°靠墙围住s点，比如障碍是(0,199),(1,198),(2,197),... (199,0)，s点在(1,198)，t在(500,500)

我的初版TLE代码将搜索步数改成200也能过，因为oj没有这个用例

## dfs Hard


### 题意

[题链](https://leetcode-cn.com/problems/maximum-path-quality-of-a-graph/)


### 题解

注意到边权>=10，最大时间<=100和最多4条出边这种反常数据范围，直接搜索时间复杂度O(4^10)，注意回溯时不要记录是否访问过，应该记录访问次数，因为可以重复访问，如果回溯撤销了就相当于没访问过，这不是我们想要的

注意特判只有一个点


```java
class Solution {
    int ans;
    int[] used;
    int[] values;
    Map<Integer, List<int[]>> mp;
    int maxTime;
    public void dfs(int vertex, int cost, int value) {
        if (vertex == 0 && used[vertex] > 0) {
            if (cost <= maxTime) {
                ans = Math.max(ans, value);
                //return;
            }
        }
        used[vertex]++;
        List<int[]> list = mp.getOrDefault(vertex, null);
        if (list == null) return;
        for (int[] i : list) {
            if (i[1] + cost > maxTime) continue;
            if (used[i[0]] > 0) dfs(i[0], i[1] + cost, value);
            else dfs(i[0], i[1] + cost, value + values[i[0]]);
        }
        used[vertex]--;
    }
    public int maximalPathQuality(int[] values, int[][] edges, int maxTime) {
        ans = values[0];
        int n = values.length;
        used = new int[n + 5];
        this.values = values;
        this.maxTime = maxTime;
        mp = new HashMap<>();
        for (int[] i : edges) {
            mp.putIfAbsent(i[0], new LinkedList<>());
            int[] tmp = new int[]{i[1], i[2]};
            List<int[]> list = mp.get(i[0]);
            list.add(tmp);
            mp.put(i[0], list);
            mp.putIfAbsent(i[1], new LinkedList<>());
            tmp = new int[]{i[0], i[2]};
            list = mp.get(i[1]);
            list.add(tmp);
            mp.put(i[1], list);
        }
        dfs(0, 0, values[0]);
        return ans;
    }
}
```


## dfs 回溯 Medium

### 题意

[题链](https://leetcode-cn.com/problems/path-with-maximum-gold/)

### 题解

暴搜

```java
class Solution {
    int ans;
    int[][] grid;
    static int[][] dir = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
    int n, m;
    public void dfs(int x, int y, int gold) {
        ans = Math.max(ans, gold);
        int tmp = grid[x][y];
        grid[x][y] = 0;
        for (int i = 0; i < 4; ++i) {
            int nx = x + dir[i][0];
            int ny = y + dir[i][1];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && grid[nx][ny] != 0) {
                dfs(nx, ny, gold + grid[nx][ny]);
            }
        }
        grid[x][y] = tmp;

        
    }
    public int getMaximumGold(int[][] grid) {
        this.n = grid.length;
        this.m = grid[0].length;
        this.grid = grid;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (grid[i][j] != 0) {
                    dfs(i, j, grid[i][j]);
                }
            }
        }
        return ans;
    }
}
```


