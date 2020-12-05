## The Beauty Of Math
  
1. Definition	定义 研究对象  
-  Identification 定义中的关键因素  
-  Classification 如何分类  
-  Relation 类别之间的关系  

### Add:   

> 1. 实数轴不包括无穷远点  
 - 区间R是一维$\ (R\cup \infty)不是一维$  
2. 代数结构：  
 - 集合上有运算     
- 序结构：
 - 集合上有大小  
- 拓扑结构：
 - 集合上有空间  
- 多项式是有限个幂函数的代数和  
- 有界则必须同时存在上界和下界$|f(x)|\leqslant M$  

## 第一章  

### 第一节  

### Dirichlet  
$$ D(x)=\left\{
\begin{aligned}
1, & \qquad  x\in Q \\
0, & \qquad  x\in Q^C\\
\end{aligned}
\right.
$$

#### 黎曼函数  
$$ R(x)=\left\{
\begin{aligned}
\frac{1}{q}, & \qquad  x\in \frac{p}{q} \\
0, & \qquad  x\in Q^C\\
\end{aligned}
\right.
$$

#### 反函数  
$y = f(x),\  x \in D 的反函数记成y = f^{-1}(x), \ x\in f(D)$  
$f是定义在D上的单调函数，则f是单射，于是f的反函数必定存在$  

#### 双曲函数  
##### 双曲正弦  
$$ shx = \frac{e^x-e^{-x}}{2}$$  
##### 双曲余弦  
$$ chx = \frac{e^x+e^{-x}}{2}$$  
##### 双曲正切  
$$ thx = \frac{shx}{chx}=\frac{e^x-e^{-x}}{e^x+e^{-x}}$$  

### 第二节  

#### 数列的极限  

**定义**：设$\{x_n\}$为一个数列，如果存在一个常数a，对于任意给定的正数$\varepsilon$(无论它多小)，总有一个正整数N，使得当n>N时，不等式
$$|x_n-a|< \varepsilon$$
都成立，那么就称常数a是数列$\{x_n\}$的极限，或者称$\{x_n\}$收敛于a，记为
$$\lim_{n\to \infty }{x_n} = a$$  

> 如果不存在这样的a，则说明数列发散，或者说没有极限    

#### 收敛数列的性质  

**定理1：**  (极限唯一性) 如果数列$\{x_n\}$收敛，那么它的极限唯一  
**定理2：**  (收敛数列的有界性) 如果数列$\{x_n\}$收敛，那么数列$\{x_n\}$一定有界  
**定理3：**  (收敛数列的保号性) 如果
$$\lim_{n\to \infty }{x_n} = a$$
且$a > 0(或a < 0)$,那么存在正整数N，当$n > N $时，都有$x_n > 0(或 x_n < 0)$  
**推论： **  如果数列$\{x_n\}从某项起有x_n \geq(或x_n \leq 0)$, 且
$$\lim_{n\to \infty}x_n = a $$, 那么$a \geq 0 (或 a \leq 0)$  
   
