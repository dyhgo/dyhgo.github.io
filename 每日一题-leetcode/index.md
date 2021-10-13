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

