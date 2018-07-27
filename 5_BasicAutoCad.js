//****************************** Declaring the Objects Prototypes to cell and RC *****************************************
function iPoint(x, y) {
	this.X = x;
	this.Y = y;	
}

function shapeX (shape1, x1, y1, rot1, lpx1, txt1, fnt1){
		if (shape1 === undefined) {this.shape = 0;} else {this.shape = shape1;}
		if (x1 === undefined) {this.x = 0;} else {this.x = x1;}
		if (y1 === undefined) {this.y = 0;} else {this.y = y1;}
		if (rot1 === undefined) {this.rot = 0;} else {this.rot = rot1;}
	
		if (lpx1 === undefined) {this.lpx = new iPoint(0, 0);} else {this.lpx = new iPoint(lpx1.X, lpx1.Y);}
		if (txt1 === undefined) {this.txt = "";} else {this.txt = txt1;}
		if (fnt1 === undefined) {this.fnt = "";} else {this.fnt = fnt1;}
}


//************************************************************************************************************************

function doFirst() {      
	
	//Project Variables
    //g1; g2;
    //dColor;
    //dFont;
    size_h=50; size_w=50; dsize = 50; penSize = 2;
    selShape = ""; selItem = "";
	dColor = "black";
	bkColor = "white";
	dFont="normal 12px Tahoma";
    //lp1; lp2; p1; p2;
	//lp1 = new iPoint(0,0);
	//lp2 = new iPoint(0,0);
    
    currFile = "";
    currBmp="";
    currImg="";
    flagImg = false;
    flagPaint = false; flagFill = false; flagP1= false;
    //eR;
	
    // AutoCad Project Variables
    //ArrayList<shapeX> compList;
	compList = new Array();
	
    rotation = 0; selectedShape = -1; 
    flagSelect = false; flagCopy = false; flagPaste = false; flagCut = false;
    currShape = new shapeX();
    zoom = 1.00;
    flagZoom = false;
    IC_Start = 30;
	flagP1 = false;
	lp1 = new iPoint(0,0);

		

	
	//GUI Variables
	var x2 = document.getElementById('main_div');
	
	var x = document.getElementById('canvas');
	x.addEventListener('mousemove',mouseMove, false);
	x.addEventListener('mousedown',mouseDown, false);
	x.addEventListener('mouseup',mouseUp, false);
	x.addEventListener('mouseout',mouseOut, false);
	x.addEventListener('click',mouseClick, false);

	
	offTop = x2.offsetTop + x.offsetTop;
	offLeft = x2.offsetLeft + x.offsetLeft;
	
	g1 = x.getContext('2d');
	g1.save();
	
	table = document.getElementById('main_div');
	btnOpen = document.getElementById('btnOpen');
	btnClear = document.getElementById('btnClear');
	btnCut = document.getElementById('btnCut');
	btnCopy = document.getElementById('btnCopy');
	btnPaste = document.getElementById('btnPaste');
	btnFont = document.getElementById('btnFont');
	btnColor = document.getElementById('btnColor');
	btnRot = document.getElementById('btnRot');
	btnExit = document.getElementById('btnExit');
	
	
	//Update Cell
	//t1 = document.getElementById('txtSize');
	t2 = document.getElementById('txtPen');
	t3 = document.getElementById('txtInput');
	//Menus
	fileMenu = document.getElementById('fileMenu');
	editMenu = document.getElementById('editMenu');
	helpMenu = document.getElementById('helpMenu');
	cbox1 = document.getElementById('shapeMenu');
	lblStatus = document.getElementById('lblStatus');
	//ck1 = document.getElementById('ckFill');
	
	//Output Area
	output = document.getElementById('output');
	
	
	//Events
	btnExit.addEventListener("click", eventClick, false);
	btnClear.addEventListener("click", eventClick, false);
	btnCut.addEventListener("click", eventClick, false);
	btnCopy.addEventListener("click", eventClick, false);
	btnPaste.addEventListener("click", eventClick, false);
	btnFont.addEventListener("click", eventClick, false);
	btnColor.addEventListener("click", eventClick, false);
	btnRot.addEventListener("click", eventClick, false);

	
	fileMenu.addEventListener("click", menuFile_Click, false);
	editMenu.addEventListener("click", menuEdit_Click, false);
	helpMenu.addEventListener("click", menuHelp_Click, false);

	cbox1.addEventListener("click", setShape, false);
	//ck1.addEventListener("click", setShape, false);
	
	//t1.addEventListener("click", setShape, false);
	t2.addEventListener("click", setShape, false);
	
	start();
} 

//*************************************** [Mouse Events] *****************************************************************
function mouseMove(e) {
	
	var d_w = offLeft;	var d_h = offTop;
	var x = e.clientX - offLeft; var y = e.clientY - offTop;
	
	lblStatus.innerHTML = "Selected Shape: " + selShape+ " - P1["+(x)+" , "+(y)+"] P2[" + d_w + " , " + d_h + "]";
	recoverScreen();
	showShapeX(x, y);
}
function mouseClick(e) {
	var x = e.clientX - offLeft; var y = e.clientY - offTop;
	 addShapeX(x, y);	
}
function mouseDown(e) {
	//msgbox("MouseDown", "Mouse");
	var x = e.clientX - offLeft;
	var y = e.clientY - offTop;
}
function mouseUp(e) {
}
function mouseOut(e) {
	recoverScreen();
}
//*****************************************[ Commands ]********************************************************************
	function exitApp() {
		document.write("");
	}
	function eventClick() {
		var txt = this.value;
		if (txt=="Clear") {clearScreen();}
		if (txt=="Cut") {setEdit("Cut");}
		if (txt=="Copy") {setEdit("Copy");}
		if (txt=="Paste") {setEdit("Paste");}
		if (txt=="Font") {fontPicker();};
		if (txt=="Color") {colorPicker();};
		if (txt=="Exit") {exitApp();}
		if (txt=="Rotate") {rotation++;if (rotation>3) rotation = 0;}
		//msgbox(txt,"Basic Paint");
	}
//************************************************************************************************************************
	function start() {
		clearScreen();
		pw = 640; ph=440;
        currBmp = g1.getImageData(0, 0, pw, pw);//Copy
		//g.putImageData(currImg, x, y);//Paste
		
        dsize = 50; size_h = 50; size_w = 50; penSize = 1;

        
        dColor = "black";
		dText = "";
        //dBrush = new SolidBrush(dColor);
        //dPen = new Pen(dBrush,2);
        flagPaint = false;
        flagFill = false;
        flagP1 = true;
        selShape = "Drawing";
        dFont="normal 12px Tahoma";
        //t1.value = dsize;
        t2.value = penSize;
        //clearScreen();
		setShape();
		startAutoCad();
	}
	
    function setShape()
    {
        selItem = cbox1[cbox1.selectedIndex].text;
        //MessageBox.Show(selItem);
        //if (ck1.checked == true) {flagFill=true;} else {flagFill = false;}
		flagFill = false;
		
        //dsize = t1.value;
		dsize = 50;
        penSize = t2.value;
        size_w = dsize; size_h = dsize;
        selShape = selItem;
        flagP1 = true;
        lblStatus.innerHTML = "Selected Shape: " + selShape;
        MoveGraphics();
		
        rotation = 0;
        flagSelect = false;
        setEdit("");
    }
	
	function drawOval(ctx, x, y, w, h) {
		ctx.save();
		w = Math.abs(w); h = Math.abs(h);
		//ctx.scale(w/h, 1);
		ctx.beginPath();
		ctx.arc(x+w/2, y+h/2, (w/2+h/2)/2, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();		
		
	}
	function fillOval(ctx, x, y, w, h) {
		ctx.save();
		//ctx.scale(w/h, 1);
		w = Math.abs(w); h = Math.abs(h);
		ctx.beginPath();
		ctx.arc(x+w/2, y+h/2, (w/2+h/2)/2, 0, Math.PI*2, false);
		ctx.fill();
		ctx.closePath();
		ctx.restore();		
	}
	function drawLine(g, x1, y1, x2, y2) {
		g.beginPath();
		g.moveTo(x1,y1);
		g.lineTo(x2,y2);
		g.stroke();
		g.closePath();
	}
	function drawRect(g, x, y, w, h, a1, a2) {
		g.strokeRect(x, y, w, h);
	}
	function drawArc(g, x, y, w, h, a1, a2) {
		
		var a3 = a2 + a1;
		w = Math.abs(w); h = Math.abs(h);
		
		g.beginPath();
		g.arc(x+w/2, y+h/2, (w/2+h/2)/2, Math.PI*((a1/360)*2), Math.PI*((a3/360)*2), false);
		g.stroke();
		g.closePath();
		
	}
	
	
    function clearScreen()
    {
		g1.clearRect(0,0,640,440);
        MoveGraphics();//Moves g2(BitMap) to g1(Panel)
		saveScreen();
		compList.length = 0;//Clear List
    }
    function clearPanel()
    {
		g1.clearRect(0,0,640,440);
        MoveGraphics();//Moves g2(BitMap) to g1(Panel)
		saveScreen();
	}
	
	function MoveGraphics() {
		
	}
	function saveScreen() {
		currBmp = g1.getImageData(0, 0, 640, 440);//Copy
	}
	function recoverScreen() {
		g1.putImageData(currBmp, 0, 0);//Paste
		if (flagZoom == true) showZoom();
	}
	
    
    
        // **************** [MENUS INTERFACE ] ************************** 
         function menuFile_Click()
        {
            var sel = this.value
			this.value = "File"; //Resetting
            switch (sel)
            {
                case "File": break;//Nothing
                case "New": clearScreen();setShape; break;
                case "Exit": exitApp(); break;
				case "Save": saveSchFile(); break;
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
				case "Clear": clearScreen(); break;//Nothing
				case "Cut": setEdit("Cut");break;//Nothing
				case "Copy": setEdit("Copy");break;//Nothing
				case "Paste": setEdit("Paste");break;//Nothing
				case "Change Font": fontPicker();break;//Nothing
				case "Change Color": colorPicker();break;//Nothing
				case "zoomIN": zoomIN();break;//Nothing
				case "zoomOut": zoomOut();break;//Nothing
				
                default:
                    msgbox("Error Not Found: " + sel, "Basic VisiCalc");
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
                case "About":
                    var msg = "";
                        msg += " Basic AutoCad Program \n";
                        msg += " Part of a Training Program \n";
                        msg += " Made by P.Ramos @ Aug/2016 \n";
                        msgbox(msg, "About");
                    
                    break;
				case "List":
					listAllComponents();
					break;
                default:
                    msgbox("MenuHelp\n Sender: " + sel, "Basic VisiCalc");
                    break;
            }
			
        }

     // **************** [OPEN FILE ] ************************** 
		
      var openBitMapFile = function(event) {
        var input = event.target;
		
        var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
		  //alert("Contents: \n" + text);
		  readFile(text);
        };
		reader.readAsText(input.files[0]);
      };


	 // Loading Images 
	function tutorial_42() {
		pic = new Image();
		//pic.src="Images/ppg2.jpg";
		pic.src="C:/TEMP/Images/ppg2.jpg"
		pic.addEventListener('load',showPic, false);	
	}
	function showPic(pic) {
		g1.save();
		//g1.drawImage(pic, 0,0, 100, 75);
		g1.drawImage(pic, 0,0);
		g1.restore();
		saveScreen();
	}
	
	//********* [Reusable Code: msgbox, inputBox, Color Picker and Font Picker] *****************
	     function msgbox(msg, title)
        {
            var n = 0;
			window.alert(title +"\n\n"+msg);
            return n;
        }
        function inputBox(title, msg)
        {
            var str = "";
			str = window.prompt(title +"\n\n"+msg,"");
            return str;
        }

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
	  //------------------------------------- Font Picker --------------------------------------------------------------
	  function fontPicker() {
		  var title = "JavaScript Font Picker";
		  var txt = "List of Fonts";
		  
		  var str = "";
		  			

		  str = str + '\n<Div id="textOut" style="padding: 10px;font-family:Lucida Console;font-size: 12px; width: 320px;height: 220px; background-color: #d3d3d3;text-align: left;">';
		  str = str + '\n<p style="font-family:Tahoma;font-weight:bold;font-size: 14px;">' + title + '</p>';
	    
		//---------------------------------
		str = str + '\nFont Name : <select id="listFont" name="shapeMenu" onchange="updateFont()">'
		list = ["Georgia", "Palatino Linotype","Times New Roman","Arial", "Arial Black", "Comic Sans MS", "Impact", 
		"Lucida Sans Unicode", "Tahoma", "Trebuchet MS", "Verdana", "Courier New","Lucida Console"];
		
		var item = "";
		for (i=0; i<list.length;i++) {
			item = list[i];
			str = str + '\n<option value="'+item+'">'+item+'</option>'
		}
		str = str + '\n</select><br>'
		  
		//---------------------------------
		str = str + '\nFont Type : <select id="listFType" name="shapeMenu" onchange="updateFont()">'
		list = ["normal", "plain", "bold", "italic"]
		var item = "";
		for (i=0; i<list.length;i++) {
			item = list[i];
			str = str + '\n<option value="'+item+'">'+item+'</option>'
		}
		str = str + '\n</select><br>'
		  
		//---------------------------------
		str = str + '\nFont Size  : <select id="listFSize" name="shapeMenu" onchange="updateFont()">'
		list = [20, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 38, 40, 44, 48, 52, 58, 64, 68, 72]
		var item = "";
		for (i=0; i<list.length;i++) {
			item = list[i];
			str = str + '\n<option value="'+item+'">'+item+'</option>'
		}
		str = str + '\n</select><br>'
		//---------------------------------

		str = str + '\n<br>Selected Font: <br><input style="width:200px;" id= "txtFont" type="Text" name="inp1" value="">'
		//---------------------------------
		str = str +'\n<input id="btnClose" type="button" name="btnClose" value="Close" style="text-align:center;">'		  
		str = str + '\n<p style="text-align:center;" id="lblTest"> Font Selected</p><br>'
		//---------------------------------
		  
		  
		  str = str + '\n</Div>';
		  output.innerHTML = str;
		  
		  btnClose = document.getElementById('btnClose');
		  btnClose.addEventListener("click", closeTextFile, false);
		  updateFont();
	  }
		function updateFont() {
			var d1 = document.getElementById('listFont');
			var d2 = document.getElementById('listFType');
			var d3 = document.getElementById('listFSize');
			var tx1 = document.getElementById('txtFont');
			var l1 = document.getElementById('lblTest');
			
			
			tx1.value = d2.value + " " + d3.value+"px "+d1.value ;
			
			var format  = ""
			format += 'font-family:'+ d1.value+';'
			format += 'font-weight:'+ d2.value+';'
			if (d3.value<48) {
				format += 'font-size: '+ d3.value+'px;'
			} else {
				format += 'font-size: 48px;'
			}
			
			var lbl = '<p style="margin: 0px; padding: 0px; width: 320px;test-align:center;border:1px solid black;background-color: #d3d3d3;' +format +'" id="lblTest"> Font Selected</p>'
			l1.innerHTML = lbl;
			
			dFont = tx1.value;
			//alert(tx1.value);
		}
	  //------------------------------------- Color Picker --------------------------------------------------------------
	  function colorPicker() {
		  var title = "JavaScript Color Picker";
		  
		  var str = "";
		  //str = str + '\n<Div id="textOut">';
		  str = str + '\n<Div id="textOut" style="width: 320px;height: 270px; background-color: #d3d3d3;text-align: center;">';
		  
		  str = str + '\n<p style="font-weight:bold;font-size: 14px;">' + title + '</p>';
		  
		  
		  
		  var idx = "" ;
		  var c = 0;
		  var r = 1;
		  var nc = 3;
		  var fct = 255/nc;
		  c1 = 0;
			for (c1=0; c1<=nc;c1++) {//red
				for (c2=0; c2<=nc;c2++) {//blue
					for (c3=0; c3<=nc;c3++) { //green
					
						cf1 = hexNumber(255 - c1 * fct);
						cf2 = hexNumber(255 - c2 * fct);
						cf3 = hexNumber(255 - c3 * fct);
						
						color1 = cf3+""+cf1+""+cf2;
						color1 = color1.toUpperCase();
						
						ix = "btnR"+ r + "C"  + c ;
						var fcr = "background-color: #"+color1;//color formated
						txt2 = "&#39" + "Color " + color1 + "&#39";
						
						str = str+ '\n<input id="' +idx +'" type="button" name="' +idx +'" value="" style="font-size: 8px;width:30px;'+fcr+'" onclick = "updateColor('+txt2+')">'
						c++;
						if (c>=8) {str = str + '\n<br>';c = 0;r++;}//Check Columns
					}
				}
			}
		  
		  
		  //View Color
		  str = str +'\n<p id="lblTest"><input style = "width:260px; height:40px;" id="btnTest" type="button" name="btnTest" value="Selected Color"></p>'		  
		  
		  //Custom Color
		  str = str +'\n<input id="btnCustColore" type="button" name="btnUpColor" value="Use Custom Color" onclick="customColor()">'		  
		  str = str +'\n<input style="width:65px;" id= "custColor" type="Text" name="inp1" value="">'		  
		  
		  
		  //Close Button
		  str = str +'\n<input id="btnClose" type="button" name="btnClose" value="Close">'		  
		  str = str + '\n</Div>';
		  output.innerHTML = str;
		  
		  btnClose = document.getElementById('btnClose');
		  btnClose.addEventListener("click", closeTextFile, false);
	  }
	  function updateColor(txt) {
		  var str = txt.split(" ");
		  var bx1 = document.getElementById('lblTest');
		  var cc1 = document.getElementById('custColor');
		  //var d2 = document.getElementById('listFType');

		  var fcr = "background-color: #"+str[1];//color formated
		  var idx = "btnTest";
		  var ctr =  '\n<input id="' +idx +'" type="button" name="' +idx +'" value="Selected" style="font-size: 12px;width:260px; height:40px;'+fcr+'">'
		  bx1.innerHTML = ctr;
		  dColor = "#"+str[1];
		  cc1.value = str[1];
		  //alert("You selected the Color: "+ str[1] +"!");
	  }
	  function customColor() {
		  var cc1 = document.getElementById('custColor');
		  txt = "Color: "+ cc1.value;
		  updateColor(txt);
		  //alert("You selected the Color: "+ txt +"!");
	  }
	  function hexNumber(nr) {
		  var tn = parseInt(Math.round(nr)).toString(16);
		  if (tn.length==1) {tn = "0"+tn;}
		  if (tn.length==0) {tn = "00";}
		  return tn;
	  }
	//-----------------------------------------------------------------------------------------------------------------------
	
//*****************************************************************************************
//**************************** [ AUTOCAD CODE] ********************************************
//*****************************************************************************************
 function drawComponentX(g, str, x, y, rot) {

	var i = 0;
	var dx1, dy1, dx2, dy2, x1, y1, x2, y2, n, ctr, i, a1, a2;
	var px1, px2;
	var sp = "L";

	g.lineWidth=penSize;
	g.strokeStyle=dColor;
	g.fillStyle=dColor;


	var  str1 = str.replace(/ /g, "");
	var  strx = str1.split(";");
	
	
	n = parseInt(strx[0]);
	
	ctr = 1;
	for (i=0; i<n;i++) {
		//---------------- Reading the var  -------------------------------
		sp = strx[ctr+0];
		dx1 = parseInt(strx[ctr+1]);	dy1 = parseInt(strx[ctr+2]);
		dx2 = parseInt(strx[ctr+3]);	dy2 = parseInt(strx[ctr+4]);
		ctr = ctr + 5;
		//---------------- Rotation -----------------------------------------
		x1 = x + dx1; y1 = y + dy1; x2 = x + dx2; y2 = y + dy2;a1 = 270; a2=90;//default
		if (rot==1) {x1 = x + dy1; y1 = y + dx1; x2 = x + dy2; y2 = y + dx2;a1=0; a2=180;}
		if (rot==2) {x1 = x - dx1; y1 = y - dy1; x2 = x - dx2; y2 = y - dy2;a1=90; a2 = 270;}
		if (rot==3) {x1 = x - dy1; y1 = y - dx1; x2 = x - dy2; y2 = y - dx2;a1=180; a2 = 0;}
		//--------------- px2 always > px1 ----------------------------------
		px2 = new iPoint(x2, y2); px1 = new iPoint(x1, y1);//Default
		if (y2>y1 && x2 > x1) {px2 = new iPoint(x2, y2); px1 = new iPoint(x1, y1);}
		if (y2>y1 && x1 > x2) {px2 = new iPoint(x1, y2); px1 = new iPoint(x2, y1);}
		if (y1>y2 && x1 > x2) {px2 = new iPoint(x1, y1); px1 = new iPoint(x2, y2);}
		if (y1>y2 && x2 > x1) {px2 = new iPoint(x2, y1); px1 = new iPoint(x1, y2);}
		if (sp==("L")) {px2 = new iPoint(x2, y2); px1 = new iPoint(x1, y1);}
		

		//--------------- Basic Shapes ---------------------------------------
		if (sp==("L")) {drawLine(g, px1.X, px1.Y, px2.X, px2.Y);}//Line
		if (sp==("R")) {drawRect(g, px1.X, px1.Y, px2.X-px1.X,px2.Y-px1.Y);}//Rectangle
		if (sp==("C")) {drawOval(g, px1.X, px1.Y, px2.X - px1.X, px2.Y - px1.Y);}//Circle
		if (sp==("A")) {drawArc(g, px1.X, px1.Y, px2.X-px1.X, px2.Y - px1.Y, a1, 180);}
		if (sp==("IA")) {drawArc(g, px1.X, px1.Y, px2.X-px1.X, px2.Y - px1.Y, a2, 180);}
		//--------------------------------------------------------------------
	}
	
	//lblStatus.innerHTML = "N= " + n.toString() + " str = "+ str + " strx = " +strx;
}


 function updateScreen() {
	clearPanel();
	var t = new shapeX();
	var bklp1 = lp1;//backup
	for (var i = 0; i < compList.length;i++) {
		t = compList[i];
		drawComponent(g1, t.shape, t.x, t.y, t.rot, t.lpx, false, t.txt);
	}
	saveScreen();
	MoveGraphics();
	lp1 = bklp1;//Restore
}

 function startAutoCad() {
	dText = "";
	flagP1 = true;
	
}
 function showShapeX(x, y) {
	var comp = cbox1.selectedIndex;
	dText = t3.value;
	MoveGraphics();
	
	if (flagCopy == true || flagCut == true) return;
	if (flagPaste=true && selectedShape != -1) {
			var t = new shapeX();
			t = currShape;
			dColor = "blue";
			drawComponent(g1, t.shape, x, y, t.rot, t.lpx, false, t.txt);
			dColor = "black";
	} else {
		drawComponent(g1, comp, x, y, rotation, lp1, flagP1, dText);
	}
}

 function addShapeX(x, y) {
	var comp = cbox1.selectedIndex;
	if (flagPaste==true && selectedShape != -1) {
    		var t = new shapeX(currShape.shape, x, y, currShape.rot);
    		t.lpx = currShape.lpx;  t.txt = currShape.txt;
        	compList.push(t); updateScreen();
			pasteShape(); flagPaste=false; selectedShape = -1; flagSelect = false; return;
		}
	if (flagSelect==true) {SelectShape(x, y);}
	if (flagCopy==true && selectedShape != -1) {copyShape();return;}
	if (flagCut==true && selectedShape != -1) {cutShape();return;}
	
	
	if (comp==0 || comp==1 || comp==2 || comp==5){
        if (flagP1 == true){
            lp1 = new iPoint(x, y); flagP1 = false;
        } else{
        	var t = new shapeX(comp, x, y, rotation);
        	t.lpx = lp1;
        	compList.push(t);
        	updateScreen();
			flagP1 = true;
		}
	} else {
		var t = new shapeX(comp, x, y, rotation);
		if (comp==3) t.txt = t3.value;
		compList.push(t);
		updateScreen();
	}
	
}

 function drawComponent(g, comp, x, y, rot, lpz, flagPt, lText) {
	var  str = "";
	var dx, dy;
	
	if (comp==0 || comp==1 || comp==2 || comp==5){
        if (flagPt == false){
        	dx = lpz.X - x; dy = lpz.Y - y;
        	var  strXY = dx.toString() + ";" +  dy.toString()+ ";";
            if ((lpz.X - x != 0 ) || (lpz.Y - y != 0 )) {
            	
            	if (comp==0) {str = "1;L;0;0;"+ strXY;}//Line
            	if (comp==1) {str = "1;R;0;0;"+ strXY;}//Rectangle
            	if (comp==2) {str = "1;C;0;0;"+ strXY;}//Circle
            	
            	if (comp==5) {
                	var  strXY1 = (dx-1).toString() + ";" +  (dy-1).toString()+ ";";
                	var  strXY2 = (dx+1).toString() + ";" +  (dy+1).toString()+ ";";
            		str = "3; R;-1;-1;1;1; L;0;0;"+ strXY+ " R;"+strXY1+ strXY2; 
            		}//Wire
            }
		}
	} //Wire	
	if (comp==6) {str = "3; L;0;0;12;0; R;12;4;36;-4; L;36;0;48;0;";}  //Resistor
	if (comp==7) {str = "4; L;0;0;12;0; L;12;8;12;-8; L;18;8;18;-8; L;18;0;30;0;";}  //Capacitor
	if (comp==8) {str = "7; L;0;0;12;0; L;10;8;10;-8; L;12;8;12;-8; L;18;8;18;-8; L;18;0;30;0; L;20;-4;26;-4; L;23;-2;23;-8;";}  //Electrolytic Capacitor
	if (comp==9) {str = "6; L;0;0;12;0; L;12;6;12;-6; L;12;6;24;0; L;12;-6;24;0; L;24;6;24;-6; L;24;0;36;0;";}  //Diode
	if (comp==10) {str = "12; L;0;0;12;0; L;12;6;12;-6; L;12;6;24;0; L;12;-6;24;0; L;24;6;24;-6; L;24;0;36;0;  L;28;-6;34;-12; L;31;-12;34;-12; L;34;-12;34;-9; L;36;-6;42;-12; L;39;-12;42;-12; L;42;-12;42;-9;";}  //LED
	if (comp==11) {str = "9; L;0;0;12;0; R;12;4;36;-4; L;36;0;48;0;  L;12;-18;18;-12; L;15;-12;18;-12; L;18;-12;18;-15;  L;18;-18;24;-12; L;21;-12;24;-12; L;24;-12;24;-15;";} //LDR
	if (comp==12) {str = "8; C;8;16;36;-16; L;0;0;18;0; L;18;12;18;-12; L;18;4;40;12; L;18;-4;40;-12; L;26;4;23;10; L;23;10;35;10; L;26;4;35;10;  ";} //NPN Transistor
	if (comp==13) {str = "8; C;8;16;36;-16; L;0;0;18;0; L;18;12;18;-12; L;18;4;40;12; L;18;-4;40;-12;  L;19;-4;25;-10; L;19;-4;27;-4;  L;27;-4;25;-10;";} //PNP Transistor
	
	if (comp==14) {str = "6; L;0;0;12;0; R;12;4;36;-4; L;36;0;48;0;  L;18;12;30;-12; L;30;-12;26;-10; L;31;-12;31;-8;";} //Variable Resistor
	if (comp==15) {str = "7; L;0;0;12;0; L;12;8;12;-8; L;18;8;18;-8; L;18;0;30;0; L;6;12;24;-12;  L;24;-12;20;-10; L;25;-12;25;-8;";}  // Variable Capacitor
	
	if (comp==16) {str = "4; L;12;1;30;1; L;12;0;30;0; L;21;-9;21;9; L;22;-9;22;9;";} //Positive
	if (comp==17) {str = "2; L;12;1;30;1; L;12;0;30;0; ";} //Negative
	if (comp==18) {str = "4; L;0;0;0;12; L;-12;12;12;12; L;-8;18;8;18;  L;-4;24;4;24;";} //Ground
	if (comp==19) {str = "9; L;0;0;0;12; L;-12;12;12;12; L;-8;18;8;18;  L;-12;24;12;24; L;-8;30;8;30; L;0;30;0;42; L;4;6;10;6; L;7;3;7;9;  L;4;36;10;36;";} //Battery
	if (comp==20) {str = "4; R;0;0;12;24; L;12;24;24;36; L;12;0;24;-12; L;24;-12;24;36;";} //IC X

	if (comp==21) {str = "1; C;0;0;8;8; ";} //Connector
	if (comp==22) {str = "1; R;0;0;3;3; ";} //Dot
	
	if (comp==23) {str = "6; A;0;0;18;12;  A;0;12;18;24;  A;0;24;18;36;  A;0;36;18;48; L;0;0;12;0; L;0;48;12;48; ";} //Inductor 2 pins
	if (comp==24) {str = "7; A;0;0;18;12;  A;0;12;18;24;  A;0;24;18;36;  A;0;36;18;48;  L;0;0;12;0; L;0;48;12;48; L;0;24;12;24; ";} //Inductor 3 pins
	if (comp==25) {str = "4; A;0;0;18;12;  A;0;12;18;24;  L;0;0;12;0; L;0;24;12;24; ";} //Small inductor
	if (comp==26) {str = "11; A;0;0;18;12;  A;0;12;18;24;  A;0;24;18;36;  A;0;36;18;48; L;0;0;12;0; L;0;48;12;48;  L;24;0;24;48; C;36;0;42;8;   C;36;24;42;16;   C;36;48;42;40;  L;36;24;30;3;";} //Relay
	if (comp==27) {str = "15; A;0;0;18;12;  A;0;12;18;24;  A;0;24;18;36;  A;0;36;18;48; L;0;0;12;0; L;0;48;12;48;  L;24;0;24;48; L;30;0;30;48; ";
		str = str + " IA;36;0;54;12;  IA;36;12;54;24;  IA;36;24;54;36;  IA;36;36;54;48;  L;46;0;58;0; L;46;48;58;48; L;46;24;58;24; ";
	} //Transformer
	if (comp==28) {str = "18; A;0;0;18;12;  A;0;12;18;24;  A;0;24;18;36;  A;0;36;18;48; L;0;0;12;0; L;0;48;12;48;  L;24;0;24;48; L;30;0;30;48; ";
	str = str + " IA;36;0;54;12;  IA;36;12;54;24;  IA;36;24;54;36;  IA;36;36;54;48;  L;46;0;58;0; L;46;48;58;48; L;46;24;58;24; ";
	str = str + " L;20;52;35;-4;  L;35;-4;31;0; L;35;-4;37;0; ";
	} //RF Coil

	
	if (comp>=IC_Start) {drawIC(comp-(IC_Start-1), g, x, y, rot);} //IC X
	
	if (comp==3) {
        if (lText.length > 0){
			g.font=dFont;
			g.textAlign="start";
			g.fillText(lText, x, y);						
        }
	}
	if (str.length > 0) {drawComponentX(g, str, x, y, rot);}
	
}
 function drawIC(n, g, x, y, rot) {
	var i, lx, ly, dx, dy, d, pin, fct, dt, x1, x2, y1, y2;
	var  stn;

	
	g.font="normal 12px Tahoma";
	g.textAlign="start";
	
	g.lineWidth=penSize;
	g.strokeStyle=dColor;
	g.fillStyle=dColor;
	
	
	
	//Draw Terminals and Numbers
	dx = 12; dy = 15;
	
	d = 8;	dt = 8;
	if (n>4) dt = 16;
	if (n>4) dx = 16;
			
	pin = 1;
	lx = x; ly = y + dy;
	if (rot==0 || rot==2) {lx = x; ly = y + dy;}
	if (rot==1 || rot==3) {lx = x+dx; ly = y;}
	//n = 2;
	for (i = 0; i<n; i++ ) {//Left
		stn = (pin.toString()).replace(" ", "");pin++;
		
		dt = stn.length*8;
		if (rot==0 || rot==2) {
			lx = x;
			drawLine(g, lx, ly-4, lx+d, ly-4);//Line#1
			g.fillText(stn, lx+d+3, ly);
			ly = ly + dy;
		}
		if (rot==1 || rot==3) {
			ly = y;
			drawLine(g, lx-4, ly, lx-4, ly+d);//Line#1
			g.fillText(stn, lx-dt, ly+d*2+4);
			lx = lx + dy;
		}
	}
	
	if (rot==0 || rot==2)	ly = ly - dy;
	if (rot==1 || rot==3)	lx = lx - dy;
	
	for (i = 0; i<n; i++ ) {//Right
		stn = (pin.toString()).replace(" ", "");pin++;
		dt = stn.length*8;
			
			if (rot==0 || rot==2) {
				lx = x+ dx*3;
				drawLine(g, lx, ly-4, lx+d, ly-4);//Line#1
				g.fillText (stn, lx-dt-3, ly);
				ly = ly - dy;
			}
			if (rot==1 || rot==3) {
				ly = y+dx*3;
				drawLine(g, lx-4, ly, lx-4, ly+d);//Line#1
				g.fillText(stn, lx-dt, ly-3);
				lx = lx - dy;
			}
	}
	
	//Draw Rectangle
	//---------------- Rotation -----------------------------------------
	if (rot==0 || rot==2) drawRect(g, x+d, y, dx*3-d, dy*(n)+d);//Rectangle
	if (rot==1 || rot==3) drawRect(g, x, y+d, dy*(n)+d, dx*3-d);//Rectangle
	
	
}

 
//************************Edit Options: Copy, Cut and Paste **************************
function SelectShape(x, y) {
	var t = new shapeX();
	var rx1, rx2, ry1, ry2, comp, rg;
	selectedShape = -1;
	for (var i = 0; i < compList.length;i++) {
		t = compList[i];
		comp = t.shape;
		if (comp==0 || comp==1 || comp==2 || comp==5){} else {
			if (t.rot==0) {t.lpx.X = t.x + 40; t.lpx.Y = t.y + 20;}
			if (t.rot==1) {t.lpx.X = t.x + 20; t.lpx.Y = t.y + 40;}
			if (t.rot==2) {t.lpx.X = t.x - 40; t.lpx.Y = t.y - 20;}
			if (t.rot==3) {t.lpx.X = t.x - 20; t.lpx.Y = t.y - 40;}
		}
		
		
		if (t.x > t.lpx.X) {rx2 = t.x;rx1 = t.lpx.X;} else {rx1 = t.x;rx2 = t.lpx.X;}
		if (t.y > t.lpx.Y) {ry2 = t.y;ry1 = t.lpx.Y;} else {ry1 = t.y;ry2 = t.lpx.Y;}

		//drawComponent(g2, t.shape, t.x, t.y, t.rot, t.lpx, false, t.txt);
		rg = 4;
		if (x>=rx1-rg && x <=rx2+rg && y >= ry1-rg && y <= ry2+rg) {selectedShape = i;currShape = compList[i]; break;}
	}
	//selectedShape = 2;
	MoveGraphics();
	showSelectedShape();
	if (selectedShape != -1) flagSelect = false;
}
function showSelectedShape() {
	if (selectedShape != -1) {
		try {
			var t = new shapeX();
			t = compList[selectedShape];
			dColor = "blue";
			drawComponent(g1, t.shape, t.x, t.y, t.rot, t.lpx, false, t.txt);
			dColor = "black";
		} catch (ex) {}
	}
}
function copyShape() {
	if (selectedShape != -1) {
		currShape = compList[selectedShape];
		updateScreen();
		setEdit("Paste");
	}
}
function cutShape() {
	if (selectedShape != -1) {
		currShape = compList[selectedShape];
		compList.splice(selectedShape, 1);
		
		updateScreen();
		setEdit("Paste");
	}
}
function pasteShape() {
	setEdit("");
	setShape();
}
 function setEdit(opt) {
	flagPaste = false; flagCut = false; flagCopy = false; flagSelect = false;
	if (opt=="Cut") {
        selShape = "Cut Image";
        flagCut = true;
        flagSelect = true;
	}
	if (opt=="Copy") {
        selShape = "Copy Image";
        flagCopy = true;
        flagSelect = true;
	}
	if (opt=="Paste" && selectedShape != -1) {
        selShape = "Paste Image";
        flagPaste = true;
        flagSelect = true;
	}
    flagP1 = true;

	lblStatus.innerHTML = "Selected Shape: " + selShape;
}
//*******************************List all Components**********************************
 function listAllComponents() {
	
	var x, y, i, ck, rot, fct;
	x= 25; y = 20;
	rot = 0; rotation = 0;
	clearScreen();
	
	
	
	t3.value = "Text";
	for (i=0; i < cbox1.length; i++) {
		cbox1.selectedIndex = i;
		
		lp1 = new iPoint(x+45, y+45);
			flagP1 = false;
			rotation = rot;
		
		ck = compList.length;
		addShapeX(x, y);//Testing
		if (compList.length > ck) {//Valid Component
			fct = 0;
			if (i>=IC_Start) {
				fct = i - (IC_Start-2);
				y = y +16*fct;
			}else {
				y = y +70;
			}
			if (y >= 440) {x = x+ 70;y = 20;}
		}
		if (i>= (IC_Start+8)) break;
		
	}
	t3.value = "";
	cbox1.selectedIndex = 0;
	
}
// *************************[FILES: OPEN, SAVE, SAVE AS, CLOSE]************************
function saveSchFile() {
	var msg = "";
	//try {
		msg = msg + ("AutoCad-ProjectFile:\r\n");
		var t = new shapeX();
		for (i = 0; i < compList.length;i++) {
			t = compList[i];
			msg = msg + ("Data:\r\n "+ t.shape + " " +  t.x + " " +  t.y + " " +  t.rot + " " +  t.lpx.X + " " +  t.lpx.Y + " \r\n" );
			if (t.txt.length>0) {
				msg = msg + ("Text:\r\n "+ t.txt + " \r\n" );
			}
			if (t.fnt != "") {
				msg = msg + ("Font:\r\n "+ t.fnt + " \r\n" );
			}
		}
		msg = msg + ("End:\r\n");
		
		var title = "[Copy the contents below to a Txt File and saved it]";
		showTextFile(msg, title);
	
	//} catch (e) {
		msgbox("Error: \n" + e.Message, "File Save Error");
		
	//}
}

var openSchFile = function(event) {
        var input = event.target;
		
        var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
		  //alert("Contents: \n" + text);
		  readSchFile(text);
        };
		reader.readAsText(input.files[0]);
};

function readSchFile(data) {
	var lines = data.split("\r\n");
	if (lines.lenght<10) {lines = data.split("\n");}

	
	clearScreen();
	// ****************** Opening the File ******************
	var  tmpf = "";
	var t = new shapeX();
	var shape, x, y, x2, y2, rot, ctx, i;
	var flagEOF = 0;
	i=0;
	try {
		while (i<lines.length) {
			i++;tmpf = lines[i];			
			if (tmpf==("Data:")) {
				i++;tmpf = lines[i];
				var pr = tmpf.split(" ");
				shape = parseInt(pr[1]);
				x = parseInt(pr[2]);
				y = parseInt(pr[3]);
				rot = parseInt(pr[4]);
				x2 = parseInt(pr[5]);
				y2 = parseInt(pr[6]);
				t = new shapeX(shape, x, y, rot);
				t.lpx.X = x2;t.lpx.Y = y2;
				compList.push(t);
				ctx++;
			}
			if (tmpf==("Text:")) {
				i++;str = lines[i];
				//compList[ctx-1].txt = "Test";
				t.txt = str;
			}
			if (tmpf==("Font:")) {
				i++;str = lines[i];
				//compList[ctx-1].fnt = str;
				t.fnt = str;
			}
			if (tmpf==("End:")) {
                    updateScreen();
                    msgbox("File Loaded!", "File Open");
					flagEOF = 1;
					break;
			}
		}


	} catch (e) {
			msgbox("Error: \n" + e.Message, "File Open Error");
	}
		if (flagEOF==0) {
			updateScreen();
			msgbox("File Loaded Partially!\nEOF not found!", "File Open");
		}

}
//*/

//************************** Zoom IN and Zoom OUT *****************************************
 function showZoom() {

}
 function zoomIN() {
	zoom += 0.25;
	if (flagZoom = false) g1.save();
	flagZoom = true;
	showZoom();
	lblStatus.innerHTML = "Selected Shape: " + selShape+ " [Zoom IN " + zoom.toString() + "]";	
		g1.scale(zoom, zoom);
		updateScreen();
		//g1.putImageData(currBmp, 0, 0);//Paste
	
}
 function zoomOut() {
	zoom = 1.00;
	flagZoom = false;
		
		lblStatus.innerHTML = "Selected Shape: " + selShape+ " [Zoom Out]";
		g1.restore();
		updateScreen();
		//g1.putImageData(currBmp, 0, 0);//Paste
}

//*****************************************************************************************
  
window.addEventListener("load", doFirst, false);

