//****************************** Declaring the Objects Prototypes to cell and RC *****************************************
function cell(flag, format, value, formula) {
	//cell = {flag:0, format: 0, formula: "", value:0.00};
	
    this.flag = flag;
    this.format = format;
    this.formula = formula;
    this.value = value;
}
function RC(r, c) {
	//RC = {r:0, c:0};
	this.r = r;
	this.c = c;
}
//************************************************************************************************************************

function doFirst() {      
	//Application Variables
	
	    // Project Variables

	    currPath = "c:\\temp\\vcalc\\";
	    currFile = "vcalc1.txt";
	    NROW = 100;
	    NCOL = 50;

        tb = new Array((NROW+1)*NCOL);// Table
		//cell() tb = new cell(NROW, NCOL);
	    col_size = new Array(NCOL);// default size
	    col_hide = new Array(NCOL);// default unhide
	    row_hide = new Array(NROW + 1);// default unhide
	    lastRow = 0;
	    lastCol = 0;
	    curCols = 0;
	    pr = 0; pc = 0;// For Scrolling
	    k=' ';// keyboard input
	    prtX = 0;
	    prtY = 0;
	
	//GUI Variables
	table = document.getElementById('div_table');
	btnNew = document.getElementById('btnNew');
	btnOpen = document.getElementById('btnOpen');
	btnEdit = document.getElementById('btnEdit');
	btnHelp = document.getElementById('btnHelp');
	
	btnExit = document.getElementById('btnExit');
	
	//Scrolling
	btnUp = document.getElementById('btnUp');
	btnDw = document.getElementById('btnDw');
	btnLf = document.getElementById('btnLf');
	btnRg = document.getElementById('btnRg');
	btnGT = document.getElementById('btnGT');
	t4 = document.getElementById('txtGoto');
	
	//Update Cell
	t1 = document.getElementById('txtCell');
	t2 = document.getElementById('txtValue');
	t3 = document.getElementById('txtFormula');
	btnUpdate = document.getElementById('btnUpdate');
	//Menus
	fileMenu = document.getElementById('fileMenu');
	editMenu = document.getElementById('editMenu');
	helpMenu = document.getElementById('helpMenu');
	//Output Area
	output = document.getElementById('output');
	
	
	
	//btnNew.addEventListener("click", eventClick, false);
	btnNew.addEventListener("click", newSpreadsheet, false);
	btnExit.addEventListener("click", exitApp, false);
	//btnOpen.addEventListener("click", eventClick, false);
	btnEdit.addEventListener("click", eventClick, false);
	btnHelp.addEventListener("click", help, false);
	
	btnUpdate.addEventListener("click", updateCell, false);
	
	btnUp.addEventListener("click", updateScroll, false);
	btnDw.addEventListener("click", updateScroll, false);
	btnLf.addEventListener("click", updateScroll, false);
	btnRg.addEventListener("click", updateScroll, false);
	btnGT.addEventListener("click", updateScroll, false);

	fileMenu.addEventListener("click", menuFile_Click, false);
	editMenu.addEventListener("click", menuEdit_Click, false);
	helpMenu.addEventListener("click", menuHelp_Click, false);
	
	
	
	start();
} 
//*****************************************[ Commands ]********************************************************************
	function exitApp() {
		document.write("");
	}
	function eventClick() {
		var txt = this.value;
		if (txt=="Edit") {editOptions(0)};
		if (txt=="Open") {help()};
	}
	function updateScroll() {
		var op = this.value;
		if (op=="Up") {pr--; if (pr<=0) pr=0;}
		if (op=="Dw") {pr++; if (pr>=NROW-17) pr=NROW-17;}
		if (op=="<<") {pc--; if (pc<=0) pc=0;}
		if (op==">>") {pc++; if (pc>=NCOL-8) pc=NCOL-8;}
		if (op=="GoTo") {
			var txt = t4.value;
			var t = getRC(txt);
			pc = t.c-1; pr = t.r-1;
			if (pc<=0) {pc=0;}
			if (pc>=NCOL-8) {pc=NCOL-8;}
			if (pr<=0) {pr=0;}
			if (pr>=NROW-17) {pr=NROW-17;}
			
		}
		
		showMatrix();
		//alert("PC = "+pc +", PR = "+pr);
	}
//************************************************************************************************************************
function start() {
	newSpreadsheet();
	preSet();
	//showMatrix();
}

function showMatrix() {
	calculateCells();
	createTable(17,50);
}
function createTable(row, col) {
 var str = "";
 var r=1; c=1;
 var color1 = '#D0D0D0';
 
 str = '<table align="left" border="1" cellspacing="0" cellpadding="2"> ';

size = 8;
var ct_sz = 0; 

	 for (c=0;c<col;c++) {//Column Header
		if (c==0) {
			str = str + '\n' + '<th style="background-color: '+ color1 +';font-weight:bold; height: 9px; width:'+4*8+'px;"id="R'+r+'C'+c+'"> ' + '</th>';
			ct_sz = ct_sz + 4*8;
			
		} else {
			if (col_hide[c+pc]==0) {
				size = col_size[c+pc];
				str = str + '\n' + '<th style="background-color: '+ color1 +';font-weight:bold; height: 9px; width:'+size*8+'px;"id="R'+r+'C'+c+'"> ' + getCol(c+pc)+ '</th>';
				ct_sz = ct_sz + size*8;
			}
		}
		if (ct_sz >=630) {break;}
	 }

var r1 =1;
 for (r=1;r<50;r++) {
  if (row_hide[r]==0) {
	 var dt = "";
	 str = str + '<tr>';
	 ct_sz = 0;
	 for (c=0;c<col;c++) {
		 
		if (c==0) {// Row Header
			str = str + '\n' + '<td align="center" style="background-color: '+ color1 +';font-weight:bold; height: 9px; width:'+4*8+'px;"id="R'+r+'C'+c+'"> ' + (r+pr) + '</td>';
			ct_sz = ct_sz + 4*8;
		}else {
			if (col_hide[c+pc]==0) {
				size = col_size[c+pc];
				//str = str + '\n' + '<td style="height: 9px; width:'+size*8+'px;"id="R'+r+'C'+c+'"> ' + 'R'+r+'C'+c+ '</td>';
				//dt = " "+ basicPrintCell(tb[gAdr(r+pr,c+pc)], c+pc)+" ";
				dt = " "+ printCell(tb[gAdr(r+pr,c+pc)], c+pc)+" ";
				str = str + '\n' + '<td style="height: 9px; width:'+size*8+'px;"id="R'+r+'C'+c+'"> ' + dt + '</td>';
				ct_sz = ct_sz + size*8;	
			}
		}
		
		if (ct_sz >=630) {break;}
	 }
	 str = str + '</tr>';
	 r1++;
   }
	 
	 if (r1>=row) break;

}
 str = str + '\n</table>\n';
 
 table.innerHTML = str;
 
}

function getCol(n) {
	var txt = "";
	var n2 = n;
	if (n>=27) {
		n2 = (n / 26) | 0;
		txt = txt + String.fromCharCode(64+n2);
		n = n - n2*26;
	}
	txt = txt + String.fromCharCode(64+n);
	return txt;
}


//**********************************************************************************
        //****************** BASIC SET UP *********************
        function preSet()
        {
            var r = 1, c = 1, i = 0;
            for (i = 1; i < 50; i++)
                col_size[i] = 8;// Default size;

            col_size[1] = 20;
            for (i = 2; i <= 8; i++)
                col_size[i] = 10;

            tb[gAdr(1, 1)] = setCell(2, 320, 0, "Income Statement");
            tb[gAdr(2, 1)] = setCell(2, 120, 0, "Net Sales");
            tb[gAdr(3, 1)] = setCell(2, 120, 0, "Costs");
            tb[gAdr(4, 1)] = setCell(2, 120, 0, "Margin");
            tb[gAdr(5, 1)] = setCell(2, 120, 0, "----------------");
            tb[gAdr(6, 1)] = setCell(2, 120, 0, "SG&A");
            tb[gAdr(7, 1)] = setCell(2, 120, 0, "----------------");
            tb[gAdr(8, 1)] = setCell(2, 120, 0, "Operating Profit");

            setTest("Jan", 2);
            setTest("Feb", 3);
            setTest("Mar", 4);
            setTest("Apr", 5);
            setTest("May", 6);
            setTest("Jun", 7);
            setTest("Jul", 8);
            setTest("Aug", 9);
            setTest("Sep", 10);
            setTest("Oct", 11);
            setTest("Nov", 12);
            setTest("Dec", 13);

            showMatrix();
        }

        function setTest(title, c)
        {

            tb[gAdr(1, c)] = setCell(2, 320, 0, title);
            tb[gAdr(2, c)] = setCell(1, 220, 100, "");
            tb[gAdr(3, c)] = setCell(1, 220, 80, "");
            tb[gAdr(4, c)] = setCell(1, 220, 20, "");
            tb[gAdr(5, c)] = setCell(2, 220, 0, "-------");
            tb[gAdr(6, c)] = setCell(1, 220, 10, "");
            tb[gAdr(7, c)] = setCell(2, 220, 0, "-------");
            tb[gAdr(8, c)] = setCell(1, 220, 10, "");
            var r = 8;
            if (c > lastCol)
            {
                lastCol = c;
            }
            if (r > lastRow)
            {
                lastRow = r;
            }
        }


        function newSpreadsheet()
        {
            var r=0, c=0;
            pc = 0; pr = 0;

            for (c = 0; c < NCOL; c++)
            {
                col_hide[c] = 0;// Default
                col_size[c] = 8;// Default
            }
            for (r = 0; r < NROW; r++)
            {// reseting columns
                row_hide[r] = 0;
                for (c = 0; c < NCOL; c++)
                {
                    // delCell(r,c);
					tb[gAdr(r, c)] = new cell(0, 0, 0, "");
					//tb[gAdr(r, c)].flag =2;
					//tb[gAdr(r, c)].formula = "R"+r+"C"+c;
					
                    //tb[r, c] = setCell(0, 0, 0, "");
                }
            }
            col_size[0] = 4;
            showMatrix();
        }


        // ********************** Basic Cell Operations - Set/Del/Copy **********************
        function setCell(type, Format, value, Text)
        {
            var tmp = new cell(0, 0, 0, "");
            tmp.flag = type;// Flag: 0 - Empty, 1 - Number, 2 = Text
            tmp.format = Format;// Float 255 options - Alignment(C = Center, R=Right, L=Left);
            tmp.value = value;// value
            tmp.formula = Text;// Text/Formula
            return tmp;
        }

		function basicPrintCell(cx, col) {
			if (cx.flag == 0) return "";
			if (cx.flag == 1) return cx.value;
			if (cx.flag == 2) return cx.formula;
		}

		function gAdr(r,c) {
			return r*NCOL + c;
		}

        function delCell(r, c){
            if (r >= NROW || c >= NCOL || r < 0 || c < 0){return;}
            try
            {
                tb[gAdr(r,c)].flag = 0;
                tb[gAdr(r,c)].formula = " ";
                tb[gAdr(r,c)].value = 0;
                tb[gAdr(r,c)].format = 0;
            }
            catch (ex){}
        }

        function copyCell(rd, cd, ro, co)
        {
            if (rd > NROW || ro > NROW || cd > NCOL || co > NCOL)
            {
				return;
            }
            try
            {
                col_size[cd] = col_size[co];
                col_hide[cd] = col_hide[cd];
                row_hide[rd] = row_hide[ro];

                tb[gAdr(rd,cd)].flag = tb[gAdr(ro,co)].flag;
                tb[gAdr(rd,cd)].format = tb[gAdr(ro,co)].format;
                tb[gAdr(rd,cd)].value = tb[gAdr(ro,co)].value;
                //tb[gAdr(rd,cd)].formula = tb[gAdr(ro,co)].formula;
                copyFormula(rd, cd, ro, co);

                if (rd > lastRow){lastRow = rd;}
                if (cd > lastCol){lastCol = cd;}
            }
            catch (ex){
            }

        }

        function getCell(r, c)
        {
            var txt = "";
            var cl = getCol(c);
            var rw = r;
            txt = cl + rw;
            return txt;
        }

        function getCellVal(txt1)
        {
            var val = 0.0;
            var txt = txt1.split('');
            //var txt = Array.from(txt1);
            
			
            if (txt[0].charCodeAt(0) >= 48 && txt[0].charCodeAt(0) <= 57)
            {
                val = parseFloat(txt1);
            }
            else
            {
                var t1 = getRC(txt1);// Cell

                if (t1.r != 0 && t1.c != 0)
                {
                    val = tb[gAdr(t1.r, t1.c)].value;
                }
                else
                {
                    val = 0;
                }
            }
            return val;
        }

        function getRC(txt)
        {
            var x1 = "", tmp1 = ""
			tmp1 = txt.toUpperCase();
			tmp1 = tmp1.replace(" ", "");
            

            var t_c = "";
            var t_r = "";

            var t = new RC(0, 0);
            var i, i1 = 0, r = 0, c = 0, p = 1;

            var len = tmp1.length;

            for (i = 0; i < len; i++)
            {
                x1 = tmp1.substring(i, i+1);
                var ch = x1.split('');
				var chx = x1.charCodeAt(0);
				
                if (chx >= 65 && chx <= 65 + 25)
                {
                    t_c = t_c + x1;
                    i1++;
                }
                if (chx >= 48 && chx <= 57)
                {
                    t_r = t_r + x1;
                }
            }

            var tc = t_c.split('');
            for (i = 0; i < i1; i++)
            {// column
				var tcx = tc[i].charCodeAt(0);
                if (tcx == 0){break;}

                p = 26 * (i1 - i - 1);
                if (p == 0)
                {
                    p = 1;
                }

                c = c + (tcx - 64) * p;// *(pow(10,i));
            }

            t.c = c;
            if (t_r.length > 0)
            {
                t.r = parseInt(t_r);
                
            }
            else
            {
                t.r = 0;
            }
            return t;
        }
		
		function updateCell() {
            // String str = inputBox("Basic VisiCalc", "Edit Cells \n\n [Cell]
            // [Value] [Format/Text]");
            var txt1 = t1.value;
            var txt2 = t2.value;
            var txt3 = t3.value;
            var tx = new RC(10, 2);
            tx = getRC(txt1);

            if (tx.r > 0 && tx.c > 0)
            {// Formula/Text
                if (txt3.length > 0)
                {
                    var x = txt3.substring(0, 1);
                    if (x=="="){
						tb[gAdr(tx.r, tx.c)] = setCell(1, 0, 0, txt3);
					}else{
						tb[gAdr(tx.r,tx.c)] = setCell(2, 0, 0, txt3);
					}                
				}
                else
                {// Value
                    var f = parseFloat(txt2);
                    tb[gAdr(tx.r, tx.c)] = setCell(1, 0, f, "");
                }
                if (tx.r > lastRow)
                    lastRow = tx.r;
                if (tx.c > lastCol)
                    lastCol = tx.c;
                t2.value = "";
                t3.value = "";
                showMatrix();
            }
			
			//alert ("getRC("+txt1+") = [r="+tx.r+", c=" +tx.c+"] \ngetCell(3,4) = "+ getCell(3,4) + "\ngetCellVal('B2') = "+getCellVal("B2"));
			
		}
		
		
        // *************************[PRINT AND FORMAT CELLS]************************
        function printCell(c, col) {

		var size = col_size[col];
		if (size == 0) {
			return "";
		}

		prt = new Array(50)
		var str = "";
		var fnbr = "";

		var fmt = 0, al = 0, pl = 0, cur = 0;// Formats fmt, al = Alignment, pl
												// = places, cur = Currency
		// Extracting the formats
		if (c.flag != 0) {
			fmt = parseInt(c.format);
			al = parseInt(fmt / 100); // Extracting the Alignment
			pl = parseInt((fmt % 100) / 10);
			cur = parseInt((fmt % 10));
			if (cur == 1) {fnbr = "BRL ";}
			if (cur == 2) {fnbr = "USD ";}
			if (cur == 3) {fnbr = "EUR ";}
			if (cur == 4) {fnbr = "YEN ";}
			if (cur == 9) {fnbr = "%";}
			
		}

		if (c.flag == 0) { // cell empty
			str = "";
		} 
		if (c.flag == 1) { // Number
			var nb = c.value;
			if (cur == 9) {nb = nb * 100;} // %

            
            str = nb.toFixed(pl); //Decimal Places
			if (cur >= 1 && cur <= 4) {str = fnbr + str;} // Currency
			if (cur == 9) {	str = str + fnbr;} // %

		} 
		if (c.flag == 2) { // Text
			str = c.formula;
		}

		var i = 0, len = str.length;

		var pos = 0;// Default Align Left
		for (i = 0; i < 50; i++) {prt[i] = " ";}

		// default Align Left;
		pos = 0;
        if (len > size) len = size;;
		// --------- Format Alignment -----------------
		if (al == 1) {pos = 0;} // Align-Left
		if (al == 2) {pos = size - len;} // Align-Right
		if (al == 3) {pos = parseInt(size / 2 - len / 2);} // Align-Center
		// ----------------------------------------------
		var strx = str.split('');
		for (i = 0; i < len; i++) {
			prt[i + pos] = strx[i];
		}
		//prt[size] = String.fromCharCode(0);
		var str2 = "";
		try {
			for (i = 0; i < size; i++) {
				if (prt[i].charCodeAt(0) == 0) break;
				if (prt[i].charCodeAt(0) == 32) 
				{str2 = str2+"&nbsp";} else {str2 = str2 + prt[i];}
			}	
		} catch (ex) {}
		//str2 = "."+prt.join('').substring(0,size)+".";
		
		return str2;

	}

        
        // ********************** Edit Operations - Insert/Delete/Exclude/Copy Range ******************
        // ************** Insert, Exclude, Delete Delete Rows and Columns  ****************************
        function excludeRows(r1, r2)
        {
            var r, c, lc, lr;
            lc = lastCol;
            lr = lastRow;

            for (r = r1; r <= lr + 1; r++)
            {
                for (c = 0; c <= lc + 1; c++)
                {
                    copyCell(r, c, r2 + 1, c);
                }
                r2++;
            }
        }

        function excludeColumns(c1, c2)
        {
            var r, c, lc, lr;
            lc = lastCol;
            lr = lastRow;
            for (c = c1; c <= lc + 1; c++)
            {
                for (r = 0; r <= lr + 1; r++)
                {
                    copyCell(r, c, r, c2 + 1);
                }
                c2++;
            }
        }

        function deleteRows(r1, r2)
        {
            var r, c, lr, lc;
            lc = lastCol;
            lr = lastRow;

            for (r = r1; r <= r2; r++)
            {
                for (c = 0; c <= lc + 1; c++)
                {
                    delCell(r, c);
                }
            }

        }

        function deleteColumns(c1, c2)
        {
            var r, c, lr, lc;
            lc = lastCol;
            lr = lastRow;
            for (c = c1; c <= c2; c++)
            {
                for (r = 0; r <= lr + 1; r++)
                {
                    delCell(r, c);
                }
            }
        }

        function insertRow(r1)
        {
            var r, c, lr, lc;
            lc = lastCol;
            lr = lastRow;
            for (r = lr + 1; r >= r1; r--)
            {
                for (c = 0; c <= lc + 1; c++)
                {
                    copyCell(r, c, r - 1, c);
                }
            }
            for (c = 0; c <= lc + 1; c++)
            {// Cleaning the Current Row;
                delCell(r1, c);
            }

        }

        function insertCol(c1)
        {
            var r, c, lr, lc;
            lc = lastCol;
            lr = lastRow;
            for (c = lc + 1; c >= c1; c--)
            {
                for (r = 1; r <= lr + 1; r++)
                {
                    copyCell(r, c, r, c - 1);
                }
            }
            for (r = 1; r <= lr + 1; r++)
            {// Cleaning the Current Column;
                delCell(r, c1);
            }

        }

        function copyRange(r1, c1, r2, c2, r3, c3)
        {
            var r, c, dr, dc;
            dr = r3 - r1;
            dc = c3 - c1;

            for (r = r1; r <= r2; r++)
            {
                for (c = c1; c <= c2; c++)
                {
                    copyCell(r + dr, c + dc, r, c);
                }
            }
        }

        function delRange(r1, c1, r2, c2)
        {
            var r, c;
            for (r = r1; r <= r2; r++)
            {
                for (c = c1; c <= c2; c++)
                {
                    delCell(r, c);
                }
            }
        }

        function HideRC(str1, str2, s1, s2)
        {
            // Function to Hide/Unhide, columns or Rows
            var flag = 0, n1 = 0, n2 = 0, i = 0;
            if (str1==("H")) { flag = 1; } else { flag = 0; }

            if (str2==("R"))
            {//row
                n1 = parseInt(s1);
                n2 = parseInt(s2);
                for (i = n1; i <= n2; i++)
                {
                    row_hide[i] = flag;
                }
            }
            else if (str2==("C"))
            {//column
                var t1 = getRC(s1); if (t1.c == 0) { n1 = parseInt(s1); } else { n1 = t1.c; }
                var t2 = getRC(s2); if (t2.c == 0) { n2 = parseInt(s2); } else { n2 = t2.c; }
                for (i = n1; i <= n2; i++)
                {
                    col_hide[i] = flag;
                }

            }


        }
        
        // ***********************************[MENUS]******************************************************
        function help()
        {
            var msg = "";
            msg = msg + "\n" + (" ========= HELP MENU============");
            msg = msg + "\n" + (" [H] - Help Menu                ");
            msg = msg + "\n" + (" [L] - List of Functions        ");
            msg = msg + "\n" + (" [F] - Menu Files Options       ");
            msg = msg + "\n" + (" [C] - Edit Cell's Contents     ");
            msg = msg + "\n" + (" [V] - View Cell's Properties   ");
            msg = msg + "\n" + (" [E] - Menu Edit Options        ");
            msg = msg + "\n" + (" [S] - Edit Columns Size        ");
            msg = msg + "\n" + (" [U] - Hide/Unhide Rows/Cols    ");
            msg = msg + "\n" + (" [T] - Format Range             ");
            msg = msg + "\n" + (" [X] - Test RC Function         ");
            msg = msg + "\n" + (" ================================");
            msgbox(msg, "Basic VisiCalc");

        }

        function formatRange()
        {
            var op = 0;
            var txt1 = "", txt2 = "";
            var r, c, r1, c1, r2, c2, fmt;

            var msg = "";
            msg = msg + "\n" + ("  ==== FORMAT OPTIONS ==== ");
            msg = msg + "\n" + ("  [1XX] - Align Left     ");
            msg = msg + "\n" + ("  [2XX] - Align Right    ");
            msg = msg + "\n" + ("  [3XX] - Align Center   ");
            msg = msg + "\n" + ("  [X0X] - 0 Dec. Places  ");
            msg = msg + "\n" + ("  [X2X] - 2 Dec. Places  ");
            msg = msg + "\n" + ("  [X9X] - 9 Dec. Places  ");
            msg = msg + "\n" + ("  [XX0] - Number Format  ");
            msg = msg + "\n" + ("  [XX1] - Currency BRL   ");
            msg = msg + "\n" + ("  [XX2] - Currency USD   ");
            msg = msg + "\n" + ("  [XX3] - Currency EUR   ");
            msg = msg + "\n" + ("  [XX4] - Currency YEN   ");
            msg = msg + "\n" + ("  [XX9] - Percent Format ");
            msg = msg + "\n" + ("  ========================");
            msg = msg + "\n\n" + ("Inform the Range [CR1 CR2] and format [XXX]: ");
            var pr = inputBox("Basic VisiCalc", msg).split(" ");
            if (pr[0].length == 0) return;

            var t1 = getRC(pr[0]);
            r1 = t1.r;
            c1 = t1.c;
            var t2 = getRC(pr[1]);
            r2 = t2.r;
            c2 = t2.c;
            fmt = parseInt(pr[2]);

            for (r = r1; r <= r2; r++)
            {
                for (c = c1; c <= c2; c++)
                {
                    tb[gAdr(r, c)].format = fmt;
                }
            }

        }

        function listFunctions()
        {
            var op;
            var msg = "";
            msg = msg +        ("  ===== LIST OF FUNCTIONS ==== ");
            msg = msg + "\n"  
            msg = msg + "\n" + ("  =SUM(RG1:RG2)                ");
            msg = msg + "\n" 
            msg = msg + "\n" + ("  =SUMIF(CR1:CR2; CDX; RG1:RG2)");
            msg = msg + "\n" 
            msg = msg + "\n" + ("  =IF(CL1=VL1;CL2;CL3)         ");
            msg = msg + "\n" 
            msg = msg + "\n" + ("  =A1+B2/C3*C4-C5 - Basic Math ");
            msg = msg + "\n" 
            msg = msg + "\n" + ("  =VLOOKUP(VL1;RG1:RG2;DSL)    ");
            msg = msg + "\n" 
            msg = msg + "\n" + ("  =HLOOKUP(VL1;RG1:RG2;DSL)    ");
            msg = msg + "\n" + (" ============================= ");
            msgbox(msg, "Basic VisiCalc");

        }

         function msgbox(msg, title)
        {
            // JOptionPane.showMessageDialog(null, msg);
            var n = 0;// JOptionPane.showOptionDialog(null, msg, title, JOptionPane.OK_OPTION, JOptionPane.QUESTION_MESSAGE,
                     //null, null, null);

			window.alert(title +"\n\n"+msg);
            //MessageBox.Show(msg, title);
            return n;
        }
        function inputBox(title, msg)
        {
            var str = "";
			str = window.prompt(title +"\n\n"+msg,"");
            return str;
        }

		

		
        // *********************[CELL FUNCTIONS - CALCULATE, DECODE AND COPY FUNCTIONS]********************
         function calculateCells()
        {
            var r, c, lr, lc;
            var vl;
            lr = lastRow;
            lc = lastCol;

            for (r = 0; r <= lr; r++)
            {
                for (c = 0; c <= lc; c++)
                {
                    try
                    {
                        if (tb[gAdr(r, c)].flag != 0)
                        {
                            if (tb[gAdr(r, c)].formula.length > 0)
                            {
                                vl = cellFunctions(r, c);
                                tb[gAdr(r, c)].value = vl;
                            }
                        }
                    }
                    catch (ex){}
                }
            }
        }

		
        function cellFunctions(r, c) {
		// System.out.prvarln("Cell Functionss: (R="+r+"C="+c+")"+
		
		var tmp = new Array(50);
		var i, j, len, i1 = 0, i2 = 0;
		var tf = 0;
		var strx = new Array(20);
		for (i = 0; i < 20; i++)
			strx[i] = "";

		var tmpx2 = tb[gAdr(r, c)].formula;
		var tmp2 = tmpx2.split('');
		len = tmpx2.length;

		var ix = 0;
		for (i = 0; i < len; i++) { // REMOVING SPACES / ToUpper
			if (tmp2[i] != ' ') {
				tmp[ix] = tmp2[i].toUpperCase();
				ix++;
			}
		}


		tmp[ix] = String.fromCharCode(0);
		len = ix;
		strx[0] = "";i2 = 0;i1 = 0;
		for (i = 0; i < len; i++) {// Formating the Formula
			if (tmp[i] == 0) {break;}
			if (tmp[i] == '=' || tmp[i] == '+' || tmp[i] == '-' || tmp[i] == '/' || tmp[i] == '*' || tmp[i] == '!' || tmp[i] == '>' || tmp[i] == '<') {
				if (i2 > 0) i1++;
				strx[i1] = tmp[i];
				i1++;
				strx[i1] = "";
				i2 = 0;
			} else if (tmp[i] == ' ' || tmp[i] == '\n' || tmp[i] == '(' || tmp[i] == ')' || tmp[i] == ':'
					|| tmp[i] == ';') {
				i1++;
				strx[i1] = "";
				i2 = 0;
			} else {
				strx[i1] = strx[i1] + tmp[i];
				i2++;
			}
		}
		if (strx[0]==("=")) {
			//alert("CellFunctions! \n"+tb[gAdr(r,c)].formula +"\ntmp: "+tmp.join("")+"\nstrx: "+strx.join(""));
		} else {
			return 0;
		}
			

		// ----------- Checking ---------------
		var ft = 0; // Flag Test
		if (ft == 1) {
			if (strx[0]==("=")) {
				var msg = "Div: ";
				for (i = 0; i <= i1; i++) {
					msg = msg + "'" + strx[i]+ "' /";
				}
				alert(msg);
			}
		}
		// -------------------------------------

		// =SUM (R1C1 R2C2)
		if (strx[1]==("SUM")) {
			// prvarf("\nFormula: ",tmp);

			var t1 = getRC(strx[2]);
			var t2 = getRC(strx[3]);
			// Sum Range
			tf = 0;
			for (r = t1.r; r <= t2.r; r++) {
				for (c = t1.c; c <= t2.c; c++) {
					tf = tf + tb[gAdr(r, c)].value;
				}
			}
			return tf;
		}
		// =SUMIF (CD1:CD2;CDX;RG1:RG2)
		if (strx[1]==("SUMIF")) {
			var a1;
			var d1, d2;
			// = SUM(CD1:CD2;CDX;RG1:RG2)
			// 0 1 2 3 4 5 6

			var t1 = getRC(strx[2]);
			var t2 = getRC(strx[3]);
			var cdx = getCellVal(strx[4]);
			var t3 = getRC(strx[5]);
			var t4 = getRC(strx[6]);

			d1 = t3.r - t1.r;
			d2 = t3.c - t1.c;

			// Sum Range
			tf = 0;
			for (r = t1.r; r <= t2.r; r++) {
				for (c = t1.c; c <= t2.c; c++) {
					a1 = tb[gAdr(r, c)].value;
					if (a1 == cdx) {
						tf = tf + tb[gAdr(r + d1, c + d2)].value;
					}
				}
			}
			return tf;
		}

		// =VLOOKUP(VS;X1:X2;C)
		if (strx[1]==("VLOOKUP")) {
			var a1, a2;
			var dsl = 0;
			// =VLOOKUP(VS;X1:X2;C)
			// 0 1 2 3 4 5
			tf = 0;
			a1 = getCellVal(strx[2]);// Value Searched
			var t1 = getRC(strx[3]); // Range X1
			var t2 = getRC(strx[4]); // Range X2
			dsl = parseInt(getCellVal(strx[5]));// DSL Column

			// Sum Range
			tf = 0;
			for (r = t1.r; r <= t2.r; r++) {
				a2 = tb[gAdr(r, t1.c)].value;
				if (a1 == a2) {
					tf = tb[gAdr(r, t1.c + dsl - 1)].value;
					break;
				}
			}
			return tf;
		}
		// =HLOOKUP(VS;X1:X2;C)
		if (strx[1]==("HLOOKUP")) {
			var a1, a2;
			var dsl = 0;
			// =HLOOKUP(VS;X1:X2;C)
			// 0 1 2 3 4 5
			tf = 0;
			a1 = getCellVal(strx[2]);// Value Searched
			var t1 = getRC(strx[3]); // Range X1
			var t2 = getRC(strx[4]); // Range X2
			dsl = parseInt(getCellVal(strx[5]));// DSL Column

			tf = 0;
			for (c = t1.c; c <= t2.c; c++) {
				a2 = tb[gAdr(t1.r, c)].value;
				if (a1 == a2) {
					tf = tb[gAdr(t1.r + dsl - 1, c)].value;
					break;
				}
			}
			return tf;
		}
		if (strx[1]==("IF")) {
			// =IF(A = B):THEN:ELSE
			// 0 1 2 3 4 5 6
			var a, b;
			var flag = 0;

			a = getCellVal(strx[2]);
			b = getCellVal(strx[4]);

			if (strx[3]==("=")) {
				if (a == b) {
					flag = 1;
				}
			}
			;
			if (strx[3]==("!")) {
				if (a != b) {
					flag = 1;
				}
			}
			;
			if (strx[3]==(">")) {
				if (a > b) {
					flag = 1;
				}
			}
			;
			if (strx[3]==("<")) {
				if (a < b) {
					flag = 1;
				}
			}
			;

			if (flag == 1) {
				tf = getCellVal(strx[5]);
			} else {
				tf = getCellVal(strx[6]);
			}
			return tf;
		}

		// = R1C1 + R2C2 - R3C2 - R4C4 * R5C5 / R6C6
		if (strx[0]==("=")) {
			var op = 1; // 0 = Equal 1 Addition, 2 - Subtraction , 3 =
						// Multiplication 4 = Division
			var val = 0;
			tf = 0;

			for (i = 1; i <= i1 + 1; i++) {
				try {
					if (strx[i].length == 1) {
						if (strx[i]==("="))
							op = 0;
						if (strx[i]==("+"))
							op = 1;
						if (strx[i]==("-"))
							op = 2;
						if (strx[i]==("*"))
							op = 3;
						if (strx[i]==("/"))
							op = 4;
					}
					if (strx[i].length > 1) {
						try {
							val = getCellVal(strx[i]);

							if (op == 0) {
								tf = val;
							}
							if (op == 1) {
								tf = tf + val;
							}
							if (op == 2) {
								tf = tf - val;
							}
							if (op == 3) {
								tf = tf * val;
							}
							if (op == 4) {
								tf = tf / val;
							}
						} catch (ex) {
							val = 0;
						}
						// System.out.prvarf("P= %.2f / T= %.2f \n", val, tf);
					}
				} catch (ex) {}

			}
			return tf;
		}
		return 0;
	}

	
        function copyFormula(rd, cd, ro, co) {
		var tmp = new Array(50);
		var i, j, len, i1 = 0, i2 = 0;
		var tf = 0;
		var strx = new Array(20);
		for (i = 0; i < 20; i++)
			strx[i] = "";

		var tmpx2 = tb[gAdr(ro, co)].formula;
		var tmp2 = tmpx2.split('');
		//
		len = tmpx2.length;
		var ix = 0;
		for (i = 0; i < len; i++) { // REMOVING SPACES / ToUpper
			if (tmp2[i] != ' ') {
				tmp[ix] = tmp2[i].toUpperCase();
				ix++;
			}
		}
		tmp[len] = String.fromCharCode(0);

		if (tmp[0] != '=') {
			tb[gAdr(rd, cd)].formula = tb[gAdr(ro, co)].formula;
		}


		len = ix;
		strx[0] = "";
		for (i = 0; i < len; i++) {// Formating the Formula
			if (tmp[i] == 0) {
				break;
			}
			if (tmp[i] == '=' || tmp[i] == '+' || tmp[i] == '-' || tmp[i] == '/' || tmp[i] == '*' || tmp[i] == '!'
					|| tmp[i] == '>' || tmp[i] == '<' || tmp[i] == ' ' || tmp[i] == '\n' || tmp[i] == '('
					|| tmp[i] == ')' || tmp[i] == ':' || tmp[i] == ';') {
				if (i2 > 0)
					i1++;
				strx[i1] = tmp[i];
				i1++;
				strx[i1] = "";
				i2 = 0;
			} else {
				strx[i1] = strx[i1] + tmp[i];
				i2++;
			}
		}

		// ----------- Checking ---------------
		var ft = 0; // Flag Test
		if (ft == 1) {
			if (strx[0]==("=")) {
				var msg = "Div: ";
				for (i = 0; i <= i1; i++) {
					msg = msg + "'" + strx[i]+ "' /";
				}
				alert(msg);
			}
		}
		// -------------------------------------

		// = R1C1 + R2C2 - R3C2 - R4C4 * R5C5 / R6C6
		var dr, dc, r, c;
		if (strx[0]==("=")) {
			try {
				for (i = 1; i <= i1; i++) {
					if (strx[i].length > 1) {
						var tc = strx[i].split('');
						if (tc[0].charCodeAt(0) >= 48 && tc[0].charCodeAt(0) <= 57 || tc[0].charCodeAt(0) == '[') {
							// Literal - Keep it as it is
						} else {
							var t1 = getRC(strx[i]);// Cell
							if (t1.r != 0 && t1.c != 0) {
								// Change Reference
								dr = t1.r - ro; // Ref - Orige
								dc = t1.c - co; // Ref - Orige
								r = rd + dr;
								c = cd + dc;
								strx[i] = getCell(r, c);
							}
						}
					}
				}
			} catch (ex) {
			}

			var Tmpx = "";
			for (i = 0; i <= i1 + 1; i++) {
				Tmpx = Tmpx + strx[i];
			}

			tb[gAdr(rd, cd)].formula = Tmpx;
		} else {
			tb[gAdr(rd, cd)].formula = tb[gAdr(ro, co)].formula;
		}

	}

	
        // **************** [FILES: OPEN, SAVE, CLOSE] **************** 

        
        function files(op)
        {
            if (op == 1)
            {
                newSpreadsheet();
            }
            if (op == 2)
            {
                //openFile();
            }
            if (op == 3)
            {
                saveFile();
            }
            if (op == 4)
            {
                //saveFileAs();
            }
            if (op == 5)
            {
                exitApp();
            }
        }

        function saveFile() {
		
		try {
            var msg = ""
			var r, c;

			msg = msg + ("VisicalcProjectFile:\n");
			msg = msg + ("RC:\n " + lastRow + 1 + " " + lastCol + 1 + " \n");
			for (c = 0; c < lastCol + 1; c++) {
				msg = msg + ("col:\n " + c + " " + col_size[c] + " " + col_hide[c] + " \n");
			}

			for (r = 0; r < lastRow + 1; r++) {
				msg = msg + ("row:\n " + r + " " + row_hide[r] + " \n");
			}

			var nr = 0;
			for (r = 0; r <= lastRow + 1; r++) {
				for (c = 0; c <= lastCol + 1; c++) {
					if (tb[gAdr(r, c)].flag != 0) {
						nr++;
					}
				}
			}

			msg = msg + ("nr= " + nr + "\n");// number of cells

			for (r = 0; r <= lastRow + 1; r++) {
				for (c = 0; c <= lastCol + 1; c++) {
					if (tb[gAdr(r, c)].flag != 0) {
						msg = msg + ("data1:\n " + r + " " + c + " " + tb[gAdr(r, c)].flag + " " + tb[gAdr(r, c)].format + " "
								+ tb[gAdr(r, c)].value + " \n");
						if (tb[gAdr(r, c)].formula.length > 0) {
							msg = msg + ("data2:\n" + tb[gAdr(r, c)].formula + "\n");
						}
					}
				}
			}
			msg = msg + ("End:\n");

			//msgbox(msg, "Basic VisiCalc");
			var title = "[Copy the contents below to a Txt File and saved it]";
			showTextFile(msg, title);
		} catch (e) {
			msgbox("Writing to File Error: \n" + e, "Error Saving File");
		}

	}

        function readFile(data) {

		
		var lines = data.split("\r\n");
		if (lines.lenght<10) {lines = data.split("\n");}
		
		
		newSpreadsheet();
		// ****************** Opening the File ******************
		var cFile = "";
		var tmpf = "";
		var r = 0, c = 0, a = 0, b = 0, ch = 0,i=0;
		var f;
		
		var ctx = 0;
		var flagEOF = 0;
		i=0;
		try {
			while (i<lines.length) {
				i++;tmpf = lines[i];
				
				
				if (tmpf==("RC:")) {
					i++;tmpf = lines[i];
					var pr = tmpf.split(" ");
					lastRow = 0;//parseInt(pr[1]);
					lastCol = 0;//parseInt(pr[2]);

				}
				if (tmpf==("col:")) {
					i++;tmpf = lines[i];
					var pr = tmpf.split(" ");
				
					a = parseInt(pr[1]);
					b = parseInt(pr[2]);
					c = parseInt(pr[3]);
					col_size[a] = b;
					col_hide[a] = c;

				}
				if (tmpf==("row:")) {
					i++;tmpf = lines[i];
					var pr = tmpf.split(" ");
					a = parseInt(pr[1]);
					b = parseInt(pr[2]);
					row_hide[a] = b;
				}
				if (tmpf==("data1:")) {
					// fscanf(file2," %i %i %i %i %f \n", &r, &c, &a, &ch, &f);
					i++;tmpf = lines[i];
					var pr = tmpf.split(" ");
					r = parseInt(pr[1]);
					c = parseInt(pr[2]);
					a = parseInt(pr[3]);
					ch = parseInt(pr[4]);
					f = parseFloat(pr[5].replace(".",","));

					if (r != 0 && c != 0) {
						tb[gAdr(r, c)].flag = a;
						tb[gAdr(r, c)].format = ch;
						tb[gAdr(r, c)].value = f;
						if (r>lastRow) lastRow = r;
						if (c>lastRow) lastCol = c;
					}
				}
				if (tmpf==("data2:")) {
					i++;str = lines[i];
					if (r != 0 && c != 0) {
						if (str.length > 0) {
							tb[gAdr(r, c)].formula = str;
						}
					}
				}
				if (tmpf==("End:")) {
                    showMatrix();
                    msgbox("File Loaded!", "File Open");
					flagEOF = 1;
					break;
				}
				
			}
		} catch (e) {
			msgbox("Error: \n" + e.Message, "File Open Error");
		}
		if (flagEOF==0) {
			showMatrix();
			msgbox("File Loaded Partially!\nEOF not found!", "File Open");
		}

	}
  //*/
  
  
        // ************************************************************************************************

  
        function editOptions(op)
        {
            var r1, c1, r2, c2, r3, c3;
            var txt1 = "";
            var txt2 = "";
            var txt3 = "";
            var msg = "";

            if (op == 0)
            {

                msg = msg + "\n" + (" =========== EDIT OPTIONS ===========");
                msg = msg + "\n" + (" 1 - Insert Row   2 - Insert Col   ");
                msg = msg + "\n" + (" 3 - Delete Rows  4 - Delete Cols  ");
                msg = msg + "\n" + (" 5 - Excl.  Rows  6 - Excl. Cols   ");
                msg = msg + "\n" + (" 7 - Delete Range 8 - Copy Range   ");
                msg = msg + "\n" + (" 9 - Format Range 10- Resize Cols  ");
                msg = msg + "\n" + (" 11- Edit Cells   12- (Un)Hide RCs ");
                msg = msg + "\n" + (" 13- View Cells                    ");
                msg = msg + "\n" + (" ====================================");

                msg = msg + "\n\n" + ("Enter an Option: ");
                op = 0;
                try
                {
                    op = parseInt(inputBox("Edit Options", msg));
                }
                catch (ex) { op = 0; return;}

                // lastCol = NCOL-2;
                // lastRow = NROW-2;

            }

            if (op == 1)
            {
                r1 = parseInt(inputBox("Insert Row", "\nEnter the Row number:"));
                insertRow(r1);
            }
            if (op == 2)
            {
                txt1 = (inputBox("Insert Col", "\nEnter the Column:"));
                var t = getRC(txt1);
                c1 = t.c;
                insertCol(c1);
            }
            if (op == 3)
            {
                var pr = (inputBox("Delete Rows [R1 R2]", "\nEnter [r1] [r2]:")).split(" ");
                r1 = parseInt(pr[0]);
                r2 = parseInt(pr[1]);

                deleteRows(r1, r2);
            }
            if (op == 4)
            {
                var pr = (inputBox("Delete Cols [C1 C2]", "\nEnter [C1] [C2]:")).split(" ");
                var t1 = getRC(pr[0]);
                c1 = t1.c;
                var t2 = getRC(pr[1]);
                c2 = t2.c;
                deleteColumns(c1, c2);
            }

            if (op == 5)
            {
                var pr = (inputBox("Exclude Rows [R1 R2]", "\nEnter [r1] [r2]:")).split(" ");
                r1 = parseInt(pr[0]);
                r2 = parseInt(pr[1]);
                if (r1 != 0 && r2 != 0)
                {
                    excludeRows(r1, r2);
                }
            }
            if (op == 6)
            {
                var pr = (inputBox("Exclude Cols [C1 C2]", "\nEnter [C1] [C2]:")).split(" ");
                var t1 = getRC(pr[0]);
                c1 = t1.c;
                var t2 = getRC(pr[1]);
                c2 = t2.c;
                if (c1 != 0 && c2 != 0)
                {
                    excludeColumns(c1, c2);
                }
            }

            if (op == 7)
            {
                var pr = (inputBox("Delete Range[RC1 RC2]", "\nEnter [RC1] [RC2]:")).split(" ");
                var t1 = getRC(pr[0]);
                r1 = t1.r;
                c1 = t1.c;
                var t2 = getRC(pr[1]);
                r2 = t2.r;
                c2 = t2.c;
                delRange(r1, c1, r2, c2);
            }
            if (op == 8)
            {
                var pr = (inputBox("Copy Range (RC1 RC2] to [RC3]", "\nEnter [RC1] [RC2] [RC3]:")).split(" ");

                var t1 = getRC(pr[0]);
                r1 = t1.r;
                c1 = t1.c;
                var t2 = getRC(pr[1]);
                r2 = t2.r;
                c2 = t2.c;
                var t3 = getRC(pr[2]);
                r3 = t3.r;
                c3 = t3.c;

                copyRange(r1, c1, r2, c2, r3, c3);
            }

            if (op == 9)
            {
                formatRange();
            }
            if (op == 10)
            {
                otherOptions('S');
            }
            if (op == 11)
            {
                otherOptions('C');
            }
            if (op == 12)
            {
                otherOptions('U');
            }
            if (op == 13)
            {
                otherOptions('V');
            }

            showMatrix();
        }

        function otherOptions(kx)
        {
            // Format Columns, Resize Columns, Edit Cells
            var txt1 = "";
            var txt2 = "";
            var msg = "";

            if (kx == 'U' || kx == 'u')
            {// Hide and Unhide
                var pr = (inputBox("Hide/UnHide RC", "\nEnter [H/U] [R/C] [N1 N2]:")).split(" ");
                if (pr[0].length > 0) { HideRC(pr[0].toUpperCase(), pr[1].toUpperCase(), pr[2], pr[3]); }

            }
            if (kx == 'S' || kx == 's')
            {
                var c, c1, c2, sz;
                var pr = (inputBox("Coluns Size [C1..C2] ", "\nEnter [C1] [C2] [size]:")).split(" ");

                var t1 = getRC(pr[0]);
                c1 = t1.c;
                var t2 = getRC(pr[1]);
                c2 = t2.c;
                sz = parseInt(pr[2]);
                for (c = c1; c <= c2; c++)
                {
                    col_size[c] = sz;
                }
            }
            if (kx == 'C' || kx == 'c')
            {
                updateCell();
            }
            if (kx == 'V' || kx == 'v')
            {// View Cell's Properties

                txt1 = inputBox("View Cell", "\nEnter [Cell]:");

                while (txt1.length > 0)
                {

                    msg = "";
                    var t = getRC(txt1);
                    msg = msg + "\nCell   : " + txt1.toUpperCase() + " [R=" + t.r + ", C=" + t.c + "]";
                    msg = msg + "\nFlag   : " + tb[gAdr(t.r, t.c)].flag;
                    msg = msg + "\nFormat : " + tb[gAdr(t.r, t.c)].format;
                    msg = msg + "\nValue  : " + tb[gAdr(t.r, t.c)].value;
                    msg = msg + "\nFormula: " + tb[gAdr(t.r, t.c)].formula;
                    msg = msg + "\nColSize: " + col_size[t.c];
					
                    msg = msg + "\n\nEnter [Cell]:";

                    txt1 = inputBox("View Cell", msg);
                }
            }

        }

  

        //********************* Buttons *********************************

         function btnSave_Click()
        {
            files(3);
        }

         function btnNew_Click()
        {
            newSpreadsheet();
        }

         function btnHelp_Click()
        {
            help();
        }

         function btnEdit_Click()
        {
            editOptions(0);
        }
         function menuFile_Click()
        {
            var sel = this.value
			this.value = "File"; //Resetting
            switch (sel)
            {
                case "File": break;//Nothing
                case "New": files(1); break;
                case "Open": files(2); break;
                case "Save": files(3); break;
                case "Exit": files(5); break;

                default:
                    msgbox("MenuFile\n Sender: " + sel , "Basic VisiCalc");
                    break;
            }

        }
         function menuEdit_Click()
        {
            var sel = this.value;
			this.value = "Edit"; //Resetting
            switch (sel)
            {
				case "": break;//Nothing
				case "Edit": break;//Nothing
                case "Edit Cell": updateCell(); break;
                case "View Cell": editOptions(13); break;

                case "Format Range": editOptions(9); break;
                case "Delete Range": editOptions(7); break;
                case "Copy Range": editOptions(8); break;
                case "Resize Columns": editOptions(10); break;
                case "Hide/UnHide Rows/Cols": editOptions(12); break;

                case "Insert Row": editOptions(1); break;
                case "Insert Col": editOptions(2); break;
                case "Delete Row": editOptions(3); break;
                case "Delete Col": editOptions(4); break;
                case "Exclude Row": editOptions(5); break;
                case "Exclude Col": editOptions(6); break;

                default:
                    msgbox("MenuEdit\n Sender: " + sel, "Basic VisiCalc");
                    break;
            }
			

        }
         function menuHelp_Click()
        {
            var sel = this.value;
			this.value = "Help"; //Resetting
            switch (sel)
            {
				case "Help": break;//Nothing
                case "Show Help": help(); break;
                case "Functions": listFunctions(); break;
                case "About":
                    var msg = "";
                        msg += " Basic Visicalc SpreadSheet \n";
                        msg += " Part of a Training Program \n";
                        msg += " Made by P.Ramos @ Jun/2016 \n";
                        msgbox(msg, "About");
                    
                    break;
                default:
                    msgbox("MenuHelp\n Sender: " + sel, "Basic VisiCalc");
                    break;
            }
			
        }

      var openFile = function(event) {
        var input = event.target;
		
        var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
		  //alert("Contents: \n" + text);
		  readFile(text);
        };
		reader.readAsText(input.files[0]);
      };

	  function showTextFile(text, title) {
		  var str = "";
		  str = str + '\n<Div id="textOut">';
		  str = str + '\n<p style="font-weight:bold;font-size: 12px;">' + title + '</p>';
		  str = str + '\n<textarea rows="18" cols="36">';
		  str = str + "\n"+text
		  str = str + "\n</textarea>";
		  str = str +'\n<br><input id="btnClose" type="button" name="btnClose" value="Close">'		  
		  str = str + '\n</Div>';
		  output.innerHTML = str;
		  
		  btnClose = document.getElementById('btnClose');
		  btnClose.addEventListener("click", closeTextFile, false);
		  
		  
	  }
	  function closeTextFile() {
		  output.innerHTML = "";
	  }
	  
		
//*/

window.addEventListener("load", doFirst, false);

