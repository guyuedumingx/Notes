
var second = 5;
function showTime() {
	second --;
	if(second<=0) {
		location.href = "https:www.baidu.com";
	}
	var time = document.getElementById("time");
	time.innerHTML = second + "";
}

setInterval(showTime,1000);
