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



