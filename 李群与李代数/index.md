# 李群与李代数



## 群

与视觉slam有关的群

三维旋转矩阵构成了特殊正交群(special orthogonal group) 





$$S O(3)=\\left\\{R \\in \\mathbb{R}^{3 \\times 3} \\mid R R^{T}=I, \\operatorname{det}(R)=1\\right\\}$$

三维变换矩阵构成了特殊欧氏群（special euclidean group）

$$SE(3)=\\left\\{T=\\left[\\begin{array}{cc}R & t \\\\0^{T} & 1\\end{array}\\right] \\in \\mathbb{R}^{4 \\times 4} \\mid R \\in SO(3), t \\in \\mathbb{R}^{3}\\right\\} $$


### 群的定义

**群**（group）是一种集合加上一种运算的代数结构

记集合为A，运算为·，那么当运算满足以下性质时，称（A，·）成群


$$
\\begin{array}{ll}\\text { 1. 封闭性: } \\quad \\forall a_{1}, a_{2} \\in A, \\quad a_{1} \\cdot a_{2} \\in A \\text { . }\\end{array}
\\\\   \\text { 2. 结合律: } \\quad \\forall a_{1}, a_{2}, a_{3} \\in A, \\quad\\left(a_{1} \\cdot a_{2}\\right) \\cdot a_{3}=a_{1} \\cdot\\left(a_{2} \\cdot a_{3}\\right) \\text { . }
\\\\ \\begin{array}{llll}\\text { 3. 幺元: } & \\exists a_{0} \\in A, & \\text { s.t. } \\quad \\forall a \\in A, & a_{0} \\cdot a=a \\cdot a_{0}=a \\text { . }\\end{array}
\\\\ \\begin{array}{llll}\\text { 4. 逆: } & \\forall a \\in A, & \\exists a^{-1} \\in A, & \\text { s.t. } & a \\cdot a^{-1}=a_{0} \\text { . }\\end{array}
$$

如果满足交换律，就是交换群，矩阵很少有交换群


## 李群与李代数

[李群](https://en.wikipedia.beta.wmflabs.org/wiki/Lie_group)与[李代数](https://en.wikipedia.beta.wmflabs.org/wiki/Lie_algebra)在wiki上的定义

### 李群的定义

**李群**是指具有光滑（连续）性质的群，SO(3)和SE(3)表示的空间的旋转和变换，它一定是连续的，所以是李群。

### 李代数的引出

对于任意旋转矩阵 $R$

$$\boldsymbol{R} \boldsymbol{R}^{T}=\boldsymbol{I}$$

它是对时间的函数

$$\boldsymbol{R}(t) \boldsymbol{R}(t)^{T}=\boldsymbol{I}$$

等式两边对时间求导

（矩阵对标量求导就是每个entry求导后转置）

$$\dot{\boldsymbol{R}}(t) \boldsymbol{R}(t)^{T}+\boldsymbol{R}(t) \dot{\boldsymbol{R}}(t)^{T}=0$$

$$\dot{\boldsymbol{R}}(t) \boldsymbol{R}(t)^{T}=-\left(\dot{\boldsymbol{R}}(t) \boldsymbol{R}(t)^{T}\right)^{T}$$


引入向量与反对称矩阵的转换标志

$$\\boldsymbol{a}^{\\wedge}=\\boldsymbol{A}=\\left[\\begin{array}{ccc}0 & -a_{3} & a_{2} \\\\a_{3} & 0 & -a_{1} \\\\-a_{2} & a_{1} & 0\\end{array}\\right], \\quad \\boldsymbol{A}^{\\vee}=\\boldsymbol{a}$$

由于 $\dot{\boldsymbol{R}}(t) \boldsymbol{R}(t)^{T}$ 是一个反对称矩阵，所以有


$$\dot{\boldsymbol{R}}(t) \boldsymbol{R}(t)^{T}=\phi(t)^{\wedge}$$

$$\dot{\boldsymbol{R}}(t)=\phi(t)^{\wedge} \boldsymbol{R}(t)$$

可以看出对 $R$ 求导就是左乘一个 $\phi(t)^{\wedge}$

在原点处 $t_0 = 0$ ，假设 $R(0) = I$，在原点处[泰勒展开](https://en.wikipedia.org/wiki/Taylor_series)

$$\begin{aligned}\boldsymbol{R}(t) & \approx \boldsymbol{R}\left(t_{0}\right)+\dot{\boldsymbol{R}}\left(t_{0}\right)\left(t-t_{0}\right) \\&=\boldsymbol{I}+\boldsymbol{\phi}\left(t_{0}\right)^{\wedge}(t)\end{aligned}$$

可以看出 $\phi$ 反应了 $R$ 导数的性质，故称它为 $SO(3)$ 原点附近的**正切空间**（tangent space），设 $\phi(t_0) = \phi_0$

$$\dot{\boldsymbol{R}}(t)=\phi\left(t_{0}\right)^{\wedge} \boldsymbol{R}(t)=\boldsymbol{\phi}_{0}^{\wedge} \boldsymbol{R}(t)$$

将它看成一阶线性齐次微分方程，解得

$$\boldsymbol{R}(t)=\exp \left(\boldsymbol{\phi}_{0}^{\wedge} t\right)$$

此处并不是传统意义上的 $e^{\phi_0^{\wedge} t}$ 

该式说明对于任意 $t$ 都可以找到 $R$ 和 $\phi$ 的对应关系，这称为**指数映射**（exponential map）

$\phi$ 就是 $SO(3)$ 对应的李代数 $so(3)$

每个李群都有对应的李代数，李代数描述了李群的局部性质，准确地说，是单位元附近的正切空间


### 李代数的定义

李代数由一个集合 $\mathbb{V}$ ，一个数域 $\mathbb{F}$ ，和一个二元运算 $[,]$ 组成。如果它们满足以下几条性质，称 $(\mathbb{V}, \mathbb{F},[,])$ 为一个李代数 $\mathfrak{g}$



$$\begin{array}{ll}\text { 1. 封闭性 } \quad \forall \boldsymbol{X}, \boldsymbol{Y} \in \mathbb{V},[\boldsymbol{X}, \boldsymbol{Y}] \in \mathbb{V} \text { . }\end{array}$$

$$\text { 2. 叉线性 } \quad \forall \boldsymbol{X}, \boldsymbol{Y}, \boldsymbol{Z} \in \mathbb{V}, a, b \in \mathbb{F}, \text { 有: }$$

$$[a \boldsymbol{X}+b \boldsymbol{Y}, \boldsymbol{Z}]=a[\boldsymbol{X}, \boldsymbol{Z}]+b[\boldsymbol{Y}, \boldsymbol{Z}], \quad[\boldsymbol{Z}, a \boldsymbol{X}+b \boldsymbol{Y}]=a[\boldsymbol{Z}, \boldsymbol{X}]+b[\boldsymbol{Z}, \boldsymbol{Y}]$$

$$\text { 3. 自反性 } \quad \forall \boldsymbol{X} \in \mathbb{V},[\boldsymbol{X}, \boldsymbol{X}]=\mathbf{0} \text { . }$$


$$\text { 4. 雅可比等价 } \quad \forall X, Y, Z \in \mathbb{V},[X,[Y, Z]]+[Z,[Y, X]]+[Y,[Z, X]]=0$$

二元运算被称为李括号（lie bracket），表达了两个元素的差异

李代数的例子，集合是三维向量，数域是实数，二元运算是叉积

$$\mathfrak{g} = (\mathbb{R}^3,  \mathbb{R}, ×)$$

### 李代数so(3)

$$\\mathfrak{s} \\mathfrak{o}(3)=\\left\\{\\boldsymbol{\\phi} \\in \\mathbb{R}^{3}, \\boldsymbol{\\Phi}=\\boldsymbol{\\phi}^{\\wedge} \\in \\mathbb{R}^{3 \\times 3}\\right\\}$$

$$\\Phi=\\phi^{\\wedge}=\\left[\\begin{array}{ccc}0 & -\\phi_{3} & \\phi_{2} \\\\\\phi_{3} & 0 & -\\phi_{1} \\\\-\\phi_{2} & \\phi_{1} & 0\\end{array}\\right] \\in \\mathbb{R}^{3 \\times 3}$$


$$\left[\phi_{1}, \phi_{2}\right]=\left(\Phi_{1} \Phi_{2}-\Phi_{2} \Phi_{1}\right)^{\vee}$$


它们是一个由**三维向量**组成的集合，每个向量对应一个反对称矩阵，可以用于表达旋转矩阵的导数



### 李代数se(3)

$$\\mathfrak{s e}(3)=\\left\\{\\boldsymbol{\\xi}=\\left[\\begin{array}{c}\\rho \\\\\\phi\\end{array}\\right] \\in \\mathbb{R}^{6}, \\boldsymbol{\\rho} \\in \\mathbb{R}^{3}, \\boldsymbol{\\phi} \\in \\mathfrak{s} \\mathfrak{o}(3), \\boldsymbol{\\xi}^{\\wedge}=\\left[\\begin{array}{cc}\\phi^{\\wedge} & \\rho \\\\0^{T} & 0\\end{array}\\right] \\in \\mathbb{R}^{4 \\times 4}\\right\\}$$

前三维为平移，后三维为旋转，就是so(3)中的元素，**此处 ^ 不再表示反对称**

可以简单地理解成se(3)就是由一个平移加上一个so(3)元素构成的向量，虽然此处并不是直接平移

$$\\boldsymbol{\\xi}^{\\wedge}=\\left[\\begin{array}{cc}\\phi^{\\wedge} & \\rho \\\\0^{T} & 0\\end{array}\\right] \\in \\mathbb{R}^{4 \\times 4}$$

$$\left[\xi_{1}, \xi_{2}\right]=\left(\xi_{1}^{\wedge} \xi_{2}^{\wedge}-\xi_{2}^{\wedge} \xi_{1}^{\wedge}\right)^{\vee}$$

## 指数映射和对数映射

### SO(3)上的指数映射

指数映射

$$R=\exp \left(\phi^{\wedge}\right)$$

有泰勒展式得

$$\exp \left(\phi^{\wedge}\right)=\sum_{n=0}^{\infty} \frac{1}{n !}\left(\phi^{\wedge}\right)^{n}$$

由于幂次太多不好计算，考虑将 $\phi$ 分解成 $\theta a$ ，因为 $\phi$ 是三维向量，可以分解成方向和模长，此处 $||a|| =1$，这样又如下两条性质

$$\boldsymbol{a}^{\wedge} \boldsymbol{a}^{\wedge}=\boldsymbol{a} \boldsymbol{a}^{T}-\boldsymbol{I}$$


$$\boldsymbol{a}^{\wedge} \boldsymbol{a}^{\wedge} \boldsymbol{a}^{\wedge}=-\boldsymbol{a}^{\wedge}$$


这样就可以对泰勒展式进行化简

$$
\\begin{aligned}\\exp \\left(\\phi^{\\wedge}\\right) &=\\exp \\left(\\theta \\boldsymbol{a}^{\\wedge}\\right)=\\sum_{n=0}^{\\infty} \\frac{1}{n !}\\left(\\theta \\boldsymbol{a}^{\\wedge}\\right)^{n} \\\\&=\\boldsymbol{I}+\\theta \\boldsymbol{a}^{\\wedge}+\\frac{1}{2 !} \\theta^{2} \\boldsymbol{a}^{\\wedge} \\boldsymbol{a}^{\\wedge}+\\frac{1}{3 !} \\theta^{3} \\boldsymbol{a}^{\\wedge} \\boldsymbol{a}^{\\wedge} \\boldsymbol{a}^{\\wedge}+\\frac{1}{4 !} \\theta^{4}\\left(\\boldsymbol{a}^{\\wedge}\\right)^{4}+\\ldots \\\\&=\\boldsymbol{a} \\boldsymbol{a}^{T}-\\boldsymbol{a}^{\\wedge} \\boldsymbol{a}^{\\wedge}+\\theta \\boldsymbol{a}^{\\wedge}+\\frac{1}{2 !} \\theta^{2} \\boldsymbol{a}^{\\wedge} \\boldsymbol{a}^{\\wedge}-\\frac{1}{3 !} \\theta^{3} \\boldsymbol{a}^{\\wedge}-\\frac{1}{4 !} \\theta^{4}\\left(\\boldsymbol{a}^{\\wedge}\\right)^{2}+\\ldots \\\\&=\\boldsymbol{a} \\boldsymbol{a}^{T}+\\left(\\theta-\\frac{1}{3 !} \\theta^{3}+\\frac{1}{5 !} \\theta^{5}-\\ldots\\right) \\boldsymbol{a}^{\\wedge}-\\left(1-\\frac{1}{2 !} \\theta^{2}+\\frac{1}{4 !} \\theta^{4}-\\ldots\\right) \\boldsymbol{a}^{\\wedge} \\boldsymbol{a}^{\\wedge} \\\\&=\\boldsymbol{a}^{\\wedge} \\boldsymbol{a}^{\\wedge}+\\boldsymbol{I}+\\sin \\theta \\boldsymbol{a}^{\\wedge}-\\cos \\theta \\boldsymbol{a}^{\\wedge} \\boldsymbol{a}^{\\wedge} \\\\&=(1-\\cos \\theta) \\boldsymbol{a}^{\\wedge} \\boldsymbol{a}^{\\wedge}+\\boldsymbol{I}+\\sin \\theta \\boldsymbol{a}^{\\wedge} \\\\&=\\cos \\theta \\boldsymbol{I}+(1-\\cos \\theta) \\boldsymbol{a} \\boldsymbol{a}^{T}+\\sin \\theta \\boldsymbol{a}^{\\wedge}\\end{aligned}
$$

最终结果

$$\exp \left(\theta \boldsymbol{a}^{\wedge}\right)=\cos \theta \boldsymbol{I}+(1-\cos \theta) \boldsymbol{a} \boldsymbol{a}^{T}+\sin \theta \boldsymbol{a}^{\wedge}$$

这与罗德里格斯公式一致，说明so(3)实际上就是由所谓的**旋转向量**组成的空间。这样so(3)中任意一个向量对应到了SO(3)中的旋转矩阵

### so(3)上的对数映射

反过来可以定义**对数映射**，表示SO(3)到so(3)

$$\phi=\ln (R)^{\vee}=\left(\sum_{n=0}^{\infty} \frac{(-1)^{n}}{n+1}(R-I)^{n+1}\right)^{\vee}$$

但实际不应该这样求，更简单的方法是

$$\theta=\arccos \left(\frac{\operatorname{tr}(\boldsymbol{R})-1}{2}\right)$$

$$\boldsymbol{R} \boldsymbol{n}=\boldsymbol{n}$$

### 总结

指数映射是满射，不是单射，这意味着可能存在多个so(3)对应同一个SO(3)。但是，把旋转角固定在[-π,+π]之间，就是一一对应的

旋转矩阵的导数可以由旋转向量指定。总结一下就是 $R$ 对时间求导后的 $\dot{\boldsymbol{R}}(t) \boldsymbol{R}(t)^{T}$ 是个反对称矩阵，那就有个 $\phi$  它是个三维向量，变成旋转向量，指数映射刚好可以从罗德里格斯公式求出

### SE(3)上的指数映射

求解过程与so(3)相似



$$\\begin{aligned}\\exp \\left(\\boldsymbol{\\xi}^{\\wedge}\\right) &=\\left[\\begin{array}{ccc}\\sum_{n=0}^{\\infty} \\frac{1}{n !}\\left(\\phi^{\\wedge}\\right)^{n} & \\sum_{n=0}^{\\infty} \\frac{1}{(n+1) !}\\left(\\phi^{\\wedge}\\right)^{n} \\rho \\\\& 0^{T} & 1\\end{array}\\right] \\\\& \\triangleq\\left[\\begin{array}{cc}R & J \\rho \\\\0^{T} & 1\\end{array}\\right]=T\\end{aligned}$$


$$\\begin{aligned}\\sum_{n=0}^{\\infty} \\frac{1}{(n+1) !}\\left(\\phi^{\\wedge}\\right)^{n} &=I+\\frac{1}{2 !} \\theta \\boldsymbol{a}^{\\wedge}+\\frac{1}{3 !} \\theta^{2}\\left(\\boldsymbol{a}^{\\wedge}\\right)^{2}+\\frac{1}{4 !} \\theta^{3}\\left(\\boldsymbol{a}^{\\wedge}\\right)^{3}+\\frac{1}{5 !} \\theta^{4}\\left(\\boldsymbol{a}^{\\wedge}\\right)^{4} \\ldots \\\\&=\\frac{1}{\\theta}\\left(\\frac{1}{2 !} \\theta^{2}-\\frac{1}{4 !} \\theta^{4}+\\cdots\\right)\\left(\\boldsymbol{a}^{\\wedge}\\right)+\\frac{1}{\\theta}\\left(\\frac{1}{3 !} \\theta^{3}-\\frac{1}{5} \\theta^{5}+\\cdots\\right)\\left(\\boldsymbol{a}^{\\wedge}\\right)^{2}+\\boldsymbol{I} \\\\&=\\frac{1}{\\theta}(1-\\cos \\theta)\\left(\\boldsymbol{a}^{\\wedge}\\right)+\\frac{\\theta-\\sin \\theta}{\\theta}\\left(\\boldsymbol{a} \\boldsymbol{a}^{\\mathrm{T}}-\\boldsymbol{I}\\right)+\\boldsymbol{I} \\\\&=\\frac{\\sin \\theta}{\\theta} \\boldsymbol{I}+\\left(1-\\frac{\\sin \\theta}{\\theta}\\right) \\boldsymbol{a} \\boldsymbol{a}^{\\mathrm{T}}+\\frac{1-\\cos \\theta}{\\theta} \\boldsymbol{a}^{\\wedge} \\stackrel{\\text { def }}{=} \\boldsymbol{J}\\end{aligned}$$


$$\boldsymbol{J}=\frac{\sin \theta}{\theta} \boldsymbol{I}+\left(1-\frac{\sin \theta}{\theta}\right) \boldsymbol{a} \boldsymbol{a}^{T}+\frac{1-\cos \theta}{\theta} \boldsymbol{a}^{\wedge}$$

### se(3)上的对数映射

由以下两条可以求出 $\phi$

$$\theta=\arccos \left(\frac{\operatorname{tr}(\boldsymbol{R})-1}{2}\right)$$

$$\boldsymbol{R} \boldsymbol{n}=\boldsymbol{n}$$

由 $\phi$ 可以求出 $J$，$\rho$ 可以通过解线性方程求得

$$t=J \rho$$



### 总结



{{< image src="/images/lie1.png" caption="转换关系 (`image`)"  >}}



## 李代数求导与扰动模型


### BCH公式与近似形式

由于李群上无加法，所以很难对李群求导，有两个思路。利用李代数上加法定义李群元素的导数？利用指数映射和对数映射完成转换

要解决的基本问题：李代数上的加法是否等价于李群上的乘法？即下式是否成立？

$$\exp \left(\phi_{1}^{\wedge}\right) \exp \left(\phi_{2}^{\wedge}\right)=\exp \left(\left(\phi_{1}+\phi_{2}\right)^{\wedge}\right) ?$$

$$\ln{(\exp{(A)} \exp{(B)})} = A + B ?$$

答案是不成立，计算公式是[BCH公式](https://en.wikipedia.org/wiki/Baker%E2%80%93Campbell%E2%80%93Hausdorff_formula)


$$\ln (\exp (\boldsymbol{A}) \exp (\boldsymbol{B}))=\boldsymbol{A}+\boldsymbol{B}+\frac{1}{2}[\boldsymbol{A}, \boldsymbol{B}]+\frac{1}{12}[\boldsymbol{A},[\boldsymbol{A}, \boldsymbol{B}]]-\frac{1}{12}[\boldsymbol{B},[\boldsymbol{A}, \boldsymbol{B}]]+\cdots$$

当其中一个为小量时，bch拥有线性近似表示（分为左乘模型和右乘模型）

$$\\ln \\left(\\exp \\left(\\phi_{1}^{\\wedge}\\right) \\exp \\left(\\phi_{2}^{\\wedge}\\right)\\right)^{\\vee} \\approx\\left\\{\\begin{array}{ll}J_{l}\\left(\\phi_{2}\\right)^{-1} \\phi_{1}+\\phi_{2} & \\text { if } \\phi_{1} \\text { is small } \\\\J_{r}\\left(\\phi_{1}\\right)^{-1} \\phi_{2}+\\phi_{1} & \\text { if } \\phi_{2} \\text { is small }\\end{array}\\right.$$

$$\boldsymbol{J}_{l}=\boldsymbol{J}=\frac{\sin \theta}{\theta} \boldsymbol{I}+\left(1-\frac{\sin \theta}{\theta}\right) \boldsymbol{a} \boldsymbol{a}^{T}+\frac{1-\cos \theta}{\theta} \boldsymbol{a}^{\wedge}$$

$$\boldsymbol{J}_{l}^{-1}=\frac{\theta}{2} \cot \frac{\theta}{2} \boldsymbol{I}+\left(1-\frac{\theta}{2} \cot \frac{\theta}{2}\right) \boldsymbol{a} \boldsymbol{a}^{T}-\frac{\theta}{2} \boldsymbol{a}^{\wedge}$$

$$J_{r}(\phi)=J_{l}(-\phi)$$

这样就解决了李群乘法和李代数加法的问题

#### SO(3)上的BCH近似

$$\exp \left(\Delta \phi^{\wedge}\right) \exp \left(\phi^{\wedge}\right)=\exp \left(\left(\phi+J\_{l}^{-1}(\phi) \Delta \phi\right)^{\wedge}\right)$$

$$\exp \left((\phi+\Delta \phi)^{\wedge}\right)=\exp \left(\left(J\_{l} \Delta \phi\right)^{\wedge}\right) \exp \left(\phi^{\wedge}\right)=\exp \left(\phi^{\wedge}\right) \exp \left(\left(J\_{r} \Delta \phi\right)^{\wedge}\right)$$

#### SE(3)上的BCH近似

$$\\begin{array}{l}\\exp \\left(\\Delta \\xi^{\\wedge}\\right) \\exp \\left(\\xi^{\\wedge}\\right) \\approx \\exp \\left(\\left(\\mathcal{J}\_{l}^{-1} \\Delta \\xi+\\xi\\right)^{\\wedge}\\right) \\\\\\exp \\left(\\xi^{\\wedge}\\right) \\exp \\left(\\Delta \\xi^{\\wedge}\\right) \\approx \\exp \\left(\\left(\\mathcal{J}\_{r}^{-1} \\Delta \\xi+\\xi\\right)^{\\wedge}\\right)\\end{array}$$

### 问题引出

假设机器人的位姿为 $T$ ，它观测到一个世界坐标系位于 $p$ 的点，产生一个观测数据 $z$ ，假设噪声是 $w$

$$z = Tp + w$$

误差

$$e = z - Tp$$

假设一共有 $N$ 个这样的路标点和观测，就有 $N$ 个式子。那么对机器人进行位姿估计相当于寻找一个最优的 $T$ ，使得误差最小化


$$\\min \_{\\boldsymbol{T}} J(\\boldsymbol{T})=\\sum\_{i=1}^{N}\\left\\|\\boldsymbol{z}\_{i}-\\boldsymbol{T} \\boldsymbol{p}\_{i}\\right\\|\_{2}^{2}$$

求解类似问题都要用到导数，由于$SO(3)$ $SE(3)$上没有很好地定义加法，所以求导很麻烦

它们的李代数上定义了良好的加法，所以用李代数求导

这样就有两种思路：

对 $R$ 对应的李代数加上小量，求相对于小量的变化率（导数模型）

对 $R$ 左乘或右乘一个小量，求相对于小量的李代数的变化率（扰动模型）

### 求导模型
考虑 $SO(3)$ 上的情况，假设对一个空间点 $p$ 进行旋转，得到 $Rp$ 现在要计算旋转之后的点的坐标相对于旋转的导数，非正式地记为

$$\frac{\partial(\boldsymbol{R} \boldsymbol{p})}{\partial \boldsymbol{R}}$$

由于它在李群上不好计算，所以转成李代数

设 $R$ 对应的李代数为 $\phi$

$$ \\begin{aligned}\\frac{\\partial\\left(\\exp \\left(\\phi^{\\wedge}\\right) p\\right)}{\\partial \\phi} &=\\lim \_{\\delta \\phi \\rightarrow 0} \\frac{\\exp \\left((\\phi+\\delta \\phi)^{\\wedge}\\right) p-\\exp \\left(\\phi^{\\wedge}\\right) p}{\\delta \\phi} \\\\&=\\lim \_{\\delta \\phi \\rightarrow 0} \\frac{\\exp \\left(\\left(J\_{l} \\delta \\phi\\right)^{\\wedge}\\right) \\exp \\left(\\phi^{\\wedge}\\right) p-\\exp \\left(\\phi^{\\wedge}\\right) p}{\\delta \\phi} \\\\& \\approx \\lim \_{\\delta \\phi \\rightarrow 0} \\frac{\\left(I+\\left(J\_{l} \\delta \\phi\\right)^{\\wedge}\\right) \\exp \\left(\\phi^{\\wedge}\\right) p-\\exp \\left(\\phi^{\\wedge}\\right) p}{\\delta \\phi} \\\\&=\\lim \_{\\delta \\phi \\rightarrow 0} \\frac{\\left(J\_{l} \\delta \\phi\\right)^{\\wedge} \\exp \\left(\\phi^{\\wedge}\\right) p}{\\delta \\phi} \\\\&=\\lim \_{\\delta \\phi \\rightarrow 0} \\frac{-\\left(\\exp \\left(\\phi^{\\wedge}\\right) p\\right)^{\\wedge} J\_{l} \\delta \\phi}{\\delta \\phi}=-(R p)^{\\wedge} J\_{l}\\end{aligned} $$


 这样就推导出旋转后的点相对于李代数的导数

$$\frac{\partial(\boldsymbol{R} \boldsymbol{p})}{\partial \boldsymbol{\phi}} =  -(\boldsymbol{R} p)^{\wedge} \boldsymbol{J}_{l}$$

### 扰动模型(左乘）

对 $R$ 左乘一个扰动 $\Delta R$ ，设左扰动对应的李代数为 $\varphi$，对 $\varphi$ 求导

$$\\begin{aligned}\\frac{\\partial(R p)}{\\partial \\varphi} &=\\lim _{\\varphi \\rightarrow 0} \\frac{\\exp \\left(\\varphi^{\\wedge}\\right) \\exp \\left(\\phi^{\\wedge}\\right) p-\\exp \\left(\\phi^{\\wedge}\\right) p}{\\varphi} \\\\& \\approx \\lim _{\\varphi \\rightarrow 0} \\frac{\\left(1+\\varphi^{\\wedge}\\right) \\exp \\left(\\phi^{\\wedge}\\right) p-\\exp \\left(\\phi^{\\wedge}\\right) p}{\\varphi} \\\\&=\\lim _{\\varphi \\rightarrow 0} \\frac{\\varphi^{\\wedge} R p}{\\varphi}=\\lim _{\\varphi \\rightarrow 0} \\frac{-(R p)^{\\wedge} \\varphi}{\\varphi}=-(R p)^{\\wedge}\\end{aligned}$$

#### SE(3)上的扰动模型

$$\\frac{\\partial(T p)}{\\partial \\delta \\xi}=\\lim _{\\delta \\xi \\rightarrow 0} \\frac{\\exp \\left(\\delta \\xi^{\\wedge}\\right) \\exp \\left(\\xi^{\\wedge}\\right) p-\\exp \\left(\\xi^{\\wedge}\\right) p}{\\delta \\xi}
 \\\\ \\approx \\lim _{\\delta \\xi \\rightarrow 0} \\frac{\\left(I+\\delta \\xi^{\\wedge}\\right) \\exp \\left(\\xi^{\\wedge}\\right) p-\\exp \\left(\\xi^{\\wedge}\\right) p}{\\delta \\xi}
\\\\ =\\lim _{\\delta \\xi \\rightarrow 0} \\frac{\\delta \\boldsymbol{\\xi}^{\\wedge} \\exp \\left(\\boldsymbol{\\xi}^{\\wedge}\\right) \\boldsymbol{p}}{\\delta \\boldsymbol{\\xi}}
\\\\ =\\lim _{\\delta \\xi \\rightarrow 0} \\frac{\\left[\\begin{array}{cc}\\delta \\phi^{\\wedge} & \\delta \\rho \\\\0^{T} & 0\\end{array}\\right]\\left[\\begin{array}{c}R p+t \\\\1\\end{array}\\right]}{\\delta \\xi}
\\\\=\\lim _{\\delta \\xi \\rightarrow 0} \\frac{\\left[\\begin{array}{c}\\delta \\phi^{\\wedge}(\\boldsymbol{R} p+\\boldsymbol{t})+\\delta \\boldsymbol{\\rho} \\\\0\\end{array}\\right]}{\\delta \\boldsymbol{\\xi}}=\\left[\\begin{array}{cc}\\boldsymbol{I} & -(\\boldsymbol{R} \\boldsymbol{p}+\\boldsymbol{t})^{\\wedge} \\\\\\mathbf{0}^{T} & \\mathbf{0}^{T}\\end{array}\\right] \\triangleq(\\boldsymbol{T} \\boldsymbol{p})^{\\odot}$$
