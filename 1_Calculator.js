function doFirst() {      
	//Variables 
	display = document.getElementById('display');
	n1 = 0; n2 = 0; flag = false;
	
	
	var btn0 = document.getElementById('btn0');
	var btn1 = document.getElementById('btn1');
	var btn2 = document.getElementById('btn2');
	var btn3 = document.getElementById('btn3');
	var btn4 = document.getElementById('btn4');
	var btn5 = document.getElementById('btn5');
	var btn6 = document.getElementById('btn6');
	var btn7 = document.getElementById('btn7');
	var btn8 = document.getElementById('btn8');
	var btn9 = document.getElementById('btn9');
	var btnAdd = document.getElementById('btnAdd');
	var btnSub = document.getElementById('btnSub');
	var btnMult = document.getElementById('btnMult');
	var btnDiv = document.getElementById('btnDiv');
	var btnDot = document.getElementById('btnDot');
	var btnC = document.getElementById('btnC');
	
	
	
	btn0.addEventListener("click", eventClick, false);
	btn1.addEventListener("click", eventClick, false);
	btn2.addEventListener("click", eventClick, false);
	btn3.addEventListener("click", eventClick, false);
	btn4.addEventListener("click", eventClick, false);
	btn5.addEventListener("click", eventClick, false);
	btn6.addEventListener("click", eventClick, false);
	btn7.addEventListener("click", eventClick, false);
	btn8.addEventListener("click", eventClick, false);
	btn9.addEventListener("click", eventClick, false);
	btnAdd.addEventListener("click", eventClick, false);
	btnSub.addEventListener("click", eventClick, false);
	btnMult.addEventListener("click", eventClick, false);
	btnDiv.addEventListener("click", eventClick, false);
	btnDot.addEventListener("click", eventClick, false);
	btnC.addEventListener("click", eventClick, false);
	
	
} 

function eventClick() {
	var txt = this.innerHTML;
	//alert("Testing '"+txt+"'");
	//display.innerHTML += txt;
	
	if (txt == '+') {
		routineCalculate("+");
		return;
	}
	if (txt == '-') {
		routineCalculate("-");
		return;
	}
	if (txt == '*') {
		routineCalculate("*");
		return;
	}
	if (txt == '/') {
		routineCalculate("/");
		return;
	}
	if (txt == 'C') {
		display.value = "";
		flag = false; n1 = 0; n2 = 0;
		return;
	}
	
	if (flag == false) {
		display.value = txt;
		flag = true;
	} else {
		display.value += txt;
	}
}

function routineCalculate(opt) {

		n2 = parseFloat(display.value);
		
		if (opt=='+') {n2 = n1+n2;}
		if (opt=='-') {n2 = n1-n2;}
		if (opt=='*') {n2 = n1*n2;}
		if (opt=='/') {n2 = n1/n2;}
		
		display.value = n2;
		n1 = n2;
		flag = false;
}




window.addEventListener("load", doFirst, false);

