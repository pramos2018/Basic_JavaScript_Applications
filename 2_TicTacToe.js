function doFirst() {      
	//Game Variables
	op = 1; // Option
	EOG=false; // End of Game Flag
	mv_seq = 0;//Move Sequence
	p = 1;//Player's Turn
	p1 = "Player#1";
	p2 = "Player#2";
	mt = new Array(10);
	
	//GUI Variables
	lblStatus = document.getElementById('lblStatus');
	
	btn1 = document.getElementById('btn1');
	btn2 = document.getElementById('btn2');
	btn3 = document.getElementById('btn3');
	btn4 = document.getElementById('btn4');
	btn5 = document.getElementById('btn5');
	btn6 = document.getElementById('btn6');
	btn7 = document.getElementById('btn7');
	btn8 = document.getElementById('btn8');
	btn9 = document.getElementById('btn9');
	var btnNG = document.getElementById('btnNG');
	var btnEX = document.getElementById('btnEX');

	var rd1 = document.getElementById('r1');
	var rd2 = document.getElementById('r2');
	var rd3 = document.getElementById('r3');
	rd1.checked = true;
	
	
	btn1.addEventListener("click", eventClick, false);
	btn2.addEventListener("click", eventClick, false);
	btn3.addEventListener("click", eventClick, false);
	btn4.addEventListener("click", eventClick, false);
	btn5.addEventListener("click", eventClick, false);
	btn6.addEventListener("click", eventClick, false);
	btn7.addEventListener("click", eventClick, false);
	btn8.addEventListener("click", eventClick, false);
	btn9.addEventListener("click", eventClick, false);
	
	r1.addEventListener("click", newGame, false);
	r2.addEventListener("click", newGame, false);
	r3.addEventListener("click", newGame, false);
	btnNG.addEventListener("click", newGame, false);
	btnEX.addEventListener("click", btnExit, false);
	newGame();
	
	
} 

function eventClick() {
	var txt = this.id;
	var len = txt.length;
	var txt2 = txt.substr(len-1, 1);
	var x = parseInt(txt2);
	//lblStatus.innerHTML = "Value='" + txt2 +"'";	
	movementControl(x);
	
}
function newGame() {
	var str = this.id;
	if (str=="r1") {op = 1;p1 = "Player#1"; p2 = "Player#2";}
	if (str=="r2") {op = 2;p1 = "Player#1"; p2 = "Computer";}
	if (str=="r3") {op = 3;p1 = "Computer"; p2 = "Player#1";}
	lblStatus.innerHTML = p1 + " vs " + p2;
	//Reset Variables
	p = 1; mv_seq = 0;
	EOG=false; // End of Game Flag
	clearMatrix();
	if (op==3) {movementControl(0);} // Computer move
	
}
function btnExit() {
	//location.href="file:///C:/Users/cliente/Desktop/Tutorials/Trainging%20Java%20Script%20-%20HTML5%20-%20CSS/index.html"
	document.write("");
}

function clearMatrix() {
	for (i=0; i<=9; i++) {
		mt[i] = '0';
		colorButton(i, "Black")
	}
	showMatrix();
}
function showMatrix() {
	if (mt[1] != '0') {btn1.innerHTML = mt[1];} else {btn1.innerHTML = ' ';};
	if (mt[2] != '0') {btn2.innerHTML = mt[2];} else {btn2.innerHTML = ' ';};
	if (mt[3] != '0') {btn3.innerHTML = mt[3];} else {btn3.innerHTML = ' ';};
	if (mt[4] != '0') {btn4.innerHTML = mt[4];} else {btn4.innerHTML = ' ';};
	if (mt[5] != '0') {btn5.innerHTML = mt[5];} else {btn5.innerHTML = ' ';};
	if (mt[6] != '0') {btn6.innerHTML = mt[6];} else {btn6.innerHTML = ' ';};
	if (mt[7] != '0') {btn7.innerHTML = mt[7];} else {btn7.innerHTML = ' ';};
	if (mt[8] != '0') {btn8.innerHTML = mt[8];} else {btn8.innerHTML = ' ';};
	if (mt[9] != '0') {btn9.innerHTML = mt[9];} else {btn9.innerHTML = ' ';};
	
}


        function movementControl(move)
        {
			if (EOG==true) {
				lblStatus.innerHTML = "Click on New Game to start a New Game!";
				return;
			}
            if ((op == 2 && p == 2) || (op == 3 && p == 1))
            {
                move = computerMove();
                if (move == -1 || move == 99)
                {
                    lblStatus.innerHTML = "Error in the ComputerMove\n Move = " + move.ToString();
                    return;
                }
            }

            if (mt[move] != '0' || (move<1 && move >9)) {
                lblStatus.innerHTML = "Invalid Move, Try Again!!!";

            } else {
                if (p==1) {mt[move] = 'X'; p=2;} else {mt[move]='O';p=1;}
                mv_seq++;
                showMatrix();
                EndOfGame_Check();
            }

            if (p == 1)
            {
                lblStatus.innerHTML = p1 + " [X] Turn";
            }
            else
            {
                lblStatus.innerHTML = p2 + " [O] Turn";
            }

            // Checks if it is the computer movement and calls iself again
            if ((op == 2 && p == 2) || (op == 3 && p == 1))
            {
                movementControl(0);
            }
        }

        function EndOfGame_Check()
        {
            var msg = ""; ;
            var wc = winnerCheck();

            if (wc != -1)
            {
				EOG=true; // End of Game Flag
                if (wc == 0) { msg = "There were NO Winners \n Would you like to Start a New Game?"; }
                else
                {
                    if (mt[wc] == 'X') msg = p1 + " [X] has WON!!! \n Would you like to Start a New Game?";
                    if (mt[wc] == 'O') msg = p2 + " [O] has WON!!! \n Would you like to Start a New Game?";
                    hlightWinner(wc);
                }

				var r = confirm(msg);
				if (r == true) {
					newGame();
				} 
				
				
            }
        }


        function winnerCheck()
        {

            if (mt[1] == mt[2] && mt[2] == mt[3] && mt[3] != '0') { return 3; }//1st row
            if (mt[4] == mt[5] && mt[5] == mt[6] && mt[6] != '0') { return 4; }//2nd row
            if (mt[7] == mt[8] && mt[8] == mt[9] && mt[9] != '0') { return 7; }//3rd row

            if (mt[1] == mt[4] && mt[4] == mt[7] && mt[1] != '0') { return 1; }//1st column
            if (mt[2] == mt[5] && mt[5] == mt[8] && mt[8] != '0') { return 2; }//2nd column
            if (mt[3] == mt[6] && mt[6] == mt[9] && mt[9] != '0') { return 6; }//3rd column

            if (mt[1] == mt[5] && mt[5] == mt[9] && mt[9] != '0') { return 9; }//1st column
            if (mt[3] == mt[5] && mt[5] == mt[7] && mt[7] != '0') { return 5; }//1st column

            var i = 0;
            for (i = 1; i <= 9; i++)
            {
                if (mt[i] == '0') { return -1; }
            }

            return 0; //Tie
        }

        function hlightWinner(wc)
        {
            var cx = "Blue";

            if (wc == 3) { colorABC(1, 2, 3, cx); }
            if (wc == 4) { colorABC(4, 5, 6, cx); }
            if (wc == 7) { colorABC(7, 8, 9, cx); }
            
            if (wc == 1) { colorABC(1, 4, 7, cx); }
            if (wc == 2) { colorABC(2, 5, 8, cx); }
            if (wc == 6) { colorABC(3, 6, 9, cx); }

            if (wc == 9) { colorABC(1, 5, 9, cx); }
            if (wc == 5) { colorABC(3, 5, 7, cx); }
        }

        function colorABC(a, b, c, cx)
        {
            colorButton(a, cx);
            colorButton(b, cx);
            colorButton(c, cx);
        }


        function colorButton(btn, c)
        {
            if (btn == 1) { btn1.style.color = c; }
            if (btn == 2) { btn2.style.color = c; }
            if (btn == 3) { btn3.style.color = c; }
            if (btn == 4) { btn4.style.color = c; }
            if (btn == 5) { btn5.style.color = c; }
            if (btn == 6) { btn6.style.color = c; }
            if (btn == 7) { btn7.style.color = c; }
            if (btn == 8) { btn8.style.color = c; }
            if (btn == 9) { btn9.style.color = c; }
        }

        function computerMove()
        {
            // It reads the Matrix and change 'mv' based on the mv_seq

            //MessageBox.Show("Op = " + op.ToString() + ", Mv_Seq = " + mv_seq.ToString());
            if (op == 1) { return -1; } // Player#1 vs Player#2

            var t = 0;
            var cp, ad; //cp = computer, ad = adversary

            if (op == 2) { cp = 'O'; ad = 'X'; } else { cp = 'X'; ad = 'O'; }

            if (mv_seq == 0 && mt[5] == '0') { t = 5; return t; }
            if (mv_seq == 1 && mt[5] == '0') { t = 5; return t; }

            //Try to Win Strategy
            t = tryToWinOrBlock(cp); if (t != 0) {return t; }

            // Block Adversary strategy
            t = tryToWinOrBlock(ad); if (t != 0) {return t; }

            // Any Diagonal
            if (mt[1] == '0') { t = 1; return t; }
            if (mt[3] == '0') { t = 3; return t; }
            if (mt[7] == '0') { t = 7; return t; }
            if (mt[9] == '0') { t = 9; return t; }

            // Any movement
            var i = 0;
            for (i = 1; i <= 9; i++)
            {
                if (mt[i] == '0') { t = i; return t; }
            }
            return 99;
        }


        function tryToWinOrBlock(ck)
        {

            var t;
            t = checkABC(ck, 1, 2, 3); if (t != 0) return t; // 1st row
            t = checkABC(ck, 4, 5, 6); if (t != 0) return t; // 2nd row
            t = checkABC(ck, 7, 8, 9); if (t != 0) return t; // 3rd row

            t = checkABC(ck, 1, 4, 7); if (t != 0) return t; // 1st column
            t = checkABC(ck, 2, 5, 8); if (t != 0) return t; // 2nd column
            t = checkABC(ck, 3, 6, 9); if (t != 0) return t; // 3rd column

            t = checkABC(ck, 3, 5, 7); if (t != 0) return t; // 1st diagonal
            t = checkABC(ck, 1, 5, 9); if (t != 0) return t; // 2nd diagonal

            return 0;

        }

        function checkABC(ck, a, b, c)
        {
            if (mt[a] == mt[b] && mt[b] == ck && mt[c] == '0') { return c; }
            if (mt[a] == mt[c] && mt[c] == ck && mt[b] == '0') { return b; }
            if (mt[b] == mt[c] && mt[c] == ck && mt[a] == '0') { return a; }
            return 0;
        }




window.addEventListener("load", doFirst, false);

