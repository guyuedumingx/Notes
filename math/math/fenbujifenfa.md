##分部积分法  
### Model 1  
> $P_m(x) = a_mx^m+...+a_0$  
> $\int P_m(x)sinxdx \\
 \int P_m(x) cosxdx
\\\int P_m(x)e^xdx$    



###  Model 2
> $\int f(x)arccosxdx \\ \int f(x)arcsinxdx\\ \int f(x)arctanxdx \\ \int f(x)arccotxdx \\ \int f(x)lnxdx$  

### Model 3  

> 利用某些函数求一次或二次微分后形式不变的性质,在分部积分之后再次产生原积分整体(但系数$\ \neq 1$)  

### Model 4  
> $I_n = \int f^n(x)dx$  
>1.  先计算$I_1, I_2$  
>2.  建立递推公式  

### For example  
#### Model 1  
> $\int xcosxdx\\= \int xdsinx \\=  xsinx \ - \int sinxdx \\= xsinx\ + cosx + C $

#### Model 2  
> $\int xlnxdx \\= lnxd\frac{x^2}{2}\\ = \frac{x^2}{2}lnx \ - \int \frac{x^2}{2}d(lnx) \\ = \frac{x^2}{2}lnx\ - \frac{1}{2}\int xdx \\= \frac{x^2}{2}lnx - \frac{x^2}{4} \ + C$        

________

> $\int arccosxdx \\令 \ u = arccosx \quad cosu = x \quad dx= -sinudu \\= -\int usinudu \\ = - ucosu - \int cosudu \\= -ucosu - sinu\\ = xarccosx \  - \sqrt {1 - x^2 } $  

#### Model 3  
 
