# 每日一题 (LeetCode)



> 在这篇文章下更新LeetCode的每日一题，之所以选择LeetCode，是因为好像只有它有每日一题版块，每日一题并不是为了提高编程水平，而是保持手感，从10月2日开始更新，应该过几天批量更新一次

## 10.2 进制转化

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


## 10.3 模拟，哈希表 Medium

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

