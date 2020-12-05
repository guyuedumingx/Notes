
### 协方差  

$Cov(x,y) = E[(X-Ex)(Y-Ey)]$

推导:  

$$
Cov(x,y) = E[(X-Ex)(Y-Ey)]\\
				 = E(XY-XEy-YEx+ExEy)\\
				 = E(XY)-EyEx-ExEy+ExEy\\
				 = E(XY)-ExEy
$$

> 当x,y 相互独立时: $E(XY) = ExEy$  
> $Cov(x,y) = 0$  

$D(x \pm y) = Dx + Dy \pm 2Cov(x,y)$  
