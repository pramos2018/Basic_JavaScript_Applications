//****************************** Declaring the Objects Prototypes to cell and RC *****************************************
function iPoint(x, y) {
	this.X = x;
	this.Y = y;
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
	dFont="bold 18px Tahoma";
    //lp1; lp2; p1; p2;
    
    currFile = "";
    currBmp="";
    currImg="";
    flagImg = false;
    flagPaint = false; flagFill = false; flagP1= false;
    //eR;


	
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
	btnExit = document.getElementById('btnExit');
	
	
	//Update Cell
	t1 = document.getElementById('txtSize');
	t2 = document.getElementById('txtPen');
	t3 = document.getElementById('txtInput');
	//Menus
	fileMenu = document.getElementById('fileMenu');
	editMenu = document.getElementById('editMenu');
	helpMenu = document.getElementById('helpMenu');
	dropDownShape = document.getElementById('shapeMenu');
	lblStatus = document.getElementById('lblStatus');
	ck1 = document.getElementById('ckFill');
	
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

	
	fileMenu.addEventListener("click", menuFile_Click, false);
	editMenu.addEventListener("click", menuEdit_Click, false);
	helpMenu.addEventListener("click", menuHelp_Click, false);

	dropDownShape.addEventListener("click", setShape, false);
	ck1.addEventListener("click", setShape, false);
	
	t1.addEventListener("click", setShape, false);
	t2.addEventListener("click", setShape, false);
	
	start();
} 

//*************************************** [Mouse Events] *****************************************************************
function mouseMove(e) {
	
	var d_w = offLeft;
	var d_h = offTop;

	var x = e.clientX - offLeft;
	var y = e.clientY - offTop;
	
	//g1.clearRect(0,0,640,440);
	//g1.fillRect(xPos, yPos, 50,50);
			lblStatus.innerHTML = "Selected Shape: " + selShape+ " - P1["+(x)+" , "+(y)+"] P2[" + d_w + " , " + d_h + "]";
            if (selShape != "Drawing") {//Animation
                MoveGraphics();// moves g2 (BitMap) to g1 - Panel
				drawAnimation(g1, selShape, x, y, size_w, size_h);//Draw Animation
            } else {
                if (flagPaint == true && selShape == "Drawing")
                {
                    p2 = new iPoint(x, y);
					g1.lineWidth=penSize;
					g1.strokeStyle=dColor;			
					
					//--- Drawing Line ---
					g1.beginPath();
					g1.moveTo(p1.X,p1.Y);
					g1.lineTo(p2.X,p2.Y);					
					g1.closePath();
					g1.stroke();
					//--------------------
                    p1 = p2;
                    MoveGraphics();// moves g2 (BitMap) to g1 - Panel
                }
			}
}
function mouseClick(e) {
	//msgbox("MouseClick", "Mouse");
}
function mouseDown(e) {
	//msgbox("MouseDown", "Mouse");
	var x = e.clientX - offLeft;
	var y = e.clientY - offTop;
		

            if (selShape == "Drawing")
            { 
				flagPaint = true;
				p1 = new iPoint(x,y);
				
            } else {
            	drawShape(g1, selShape, x, y, size_w, size_h);
            }

}
function mouseUp(e) {
	//msgbox("MouseRelease", "Mouse");
    if (selShape == "Drawing") {
		flagP1 = true;
		saveScreen();
	}
    flagPaint = false;        	
}
function mouseOut(e) {
    if (selShape == "Drawing") {
		flagP1 = true;
		saveScreen();
	} else {
		recoverScreen();
	}
    flagPaint = false;        	
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
		//msgbox(txt,"Basic Paint");
	}
//************************************************************************************************************************
	function start() {
		/*
        //var pw = panel3.getWidth();
        //var ph = panel3.getHeight();

		
        panel3.setBackground(Color.WHITE);
		g1 = (Graphics2D) panel3.getGraphics();
		g1.setColor(Color.BLACK);
		
		//------------[ Empty BMP ]-------------------
        currBmp = new BufferedImage (pw, ph, BufferedImage.TYPE_INT_ARGB );
		g2 = currBmp.createGraphics();
        g2.setColor(panel3.getBackground());
        g2.fillRect(0, 0, pw, ph);
		//--------------------------------------------
    	*/
		clearScreen();
		pw = 640; ph=440;
        currBmp = g1.getImageData(0, 0, pw, pw);//Copy
		//g.putImageData(currImg, x, y);//Paste
		
        dsize = 50; size_h = 50; size_w = 50; penSize = 2;

        
        dColor = "black";
        //dBrush = new SolidBrush(dColor);
        //dPen = new Pen(dBrush,2);
        flagPaint = false;
        flagFill = false;
        flagP1 = true;
        selShape = "Drawing";
        dFont="bold 36px Tahoma";
        t1.value = dsize;
        t2.value = penSize;
        //clearScreen();
        setShape();
	}
    function setShape()
    {
        selItem = dropDownShape.value;
        //MessageBox.Show(selItem);
        if (ck1.checked == true) {flagFill=true;} else {flagFill = false;}
		
        
        dsize = t1.value;
        penSize = t2.value;
        size_w = dsize; size_h = dsize;
        selShape = selItem;
        switch (selItem)
        {
            case "Drawing": selShape = "Drawing"; break;
            case "Square": selShape = "Rectangle"; break;
            case "Rectangle (V)": selShape = "Rectangle"; size_w = dsize; size_h = dsize * 2; break;
            case "Rectangle (H)": selShape = "Rectangle"; size_w = dsize * 2; size_h = dsize; break;
            case "Circle": selShape = "Ellipse"; break;
            case "Line": selShape = "Line"; break;
            default: break;
        }
        flagP1 = true;
        lblStatus.innerHTML = "Selected Shape: " + selShape;
        MoveGraphics();
		//recoverScreen();
    }
	
    function drawAnimation(g, shape, x, y, sz_w, sz_h)
    {
		recoverScreen();
		g.lineWidth=penSize;
		g.strokeStyle=dColor;
		g.fillStyle=dColor;
        switch (shape)
        {
            case "Rectangle (p1,p2)":
                if (flagP1 == false){
                    lp2 = new iPoint(x, y);
                    if (flagFill == false) g.strokeRect( lp1.X, lp1.Y, lp2.X - lp1.X, lp2.Y - lp1.Y);
                    if (flagFill == true) g.fillRect( lp1.X, lp1.Y, lp2.X - lp1.X, lp2.Y - lp1.Y);
                }
                break;
            case "Ellipse (p1,p2)":
                if (flagP1 == false){
                    lp2 = new iPoint(x, y);
                    if (flagFill == false) drawOval(g, lp1.X, lp1.Y, lp2.X - lp1.X, lp2.Y - lp1.Y);
                    if (flagFill == true) fillOval(g, lp1.X, lp1.Y, lp2.X - lp1.X, lp2.Y - lp1.Y);
                }
                break;

            case "Rectangle":
                if (flagFill == false) g.strokeRect( x, y, sz_w, sz_h);
                if (flagFill == true) g.fillRect( x, y, size_w, size_h);
                break;
            case "Ellipse":
                if (flagFill == false) drawOval(g, x, y, sz_w, sz_h);
                if (flagFill == true) fillOval(g, x, y, size_w, size_h);
                break;
            case "Line":
                if (flagP1 == false) {lp2 = new iPoint(x, y); 
						g.beginPath();
						g.moveTo(lp1.X,lp1.Y);g.lineTo(lp2.X,lp2.Y);
						g.stroke();
				}
                break;
            case "Text":
                    if (String.valueOf(t3.value).length > 0){
						g.font=dFont;"bold 36px Tahoma";
						g.textAlign="start";
						g.fillText(t3.value, x, y);						
                    }
                break;
            //********** Edit Events [Copy, Cut, Paste] ***********
            case "Erase":
				g.strokeStyle="blue";g.lineWidth="1";
                g.strokeRect(x , y, sz_w, sz_h);
                break;
            case "Erase Range":
                if (flagP1 == false) 
                {
                    lp2 = new iPoint(x, y);
                    g.strokeStyle="blue";g.lineWidth="1";
                    g.strokeRect(lp1.X, lp1.Y, lp2.X - lp1.X, lp2.Y - lp1.Y);
                }
                break;
            case "Copy Image":
                if (flagP1 == false) 
                {
                    lp2 = new iPoint(x,y);
					g.strokeStyle="blue";g.lineWidth="1";
                    g.strokeRect(lp1.X, lp1.Y, lp2.X - lp1.X, lp2.Y - lp1.Y);
                }

                break;
            case "Cut Image":
                if (flagP1 == false) 
                {
                    lp2 = new iPoint(x,y);
					g.strokeStyle="blue";g.lineWidth="1";
                    g.strokeRect(lp1.X, lp1.Y, lp2.X - lp1.X, lp2.Y - lp1.Y);
                }

                break;
            case "Paste Image":
                if (flagImg == true)
                {
					g.putImageData(currImg, x, y);//Paste
                }
                break;

            //******************************************************
            default: break;
        }
        lblStatus.innerHTML = "Selected Shape: " + selShape;
    }

	
    function drawShape(g, shape, x, y, sz_w, sz_h)
    {
    		//g.setColor(dColor);//Pen and SolidBrush Color
    		//g.setStroke(new BasicStroke(penSize));
			recoverScreen();
			g.lineWidth=penSize;
			g.strokeStyle=dColor;
			g.fillStyle=dColor;
            switch (shape) {
                case "Rectangle (p1,p2)":
                    if (flagP1 == true){
                        lp1 = new iPoint(x, y); flagP1 = false;
                    } else{
                    	
                        lp2 = new iPoint(x, y); flagP1 = true;
                        
                        if (flagFill == false) g.strokeRect(lp1.X, lp1.Y, lp2.X-lp1.X,lp2.Y-lp1.Y);
                        if (flagFill == true) g.fillRect(lp1.X, lp1.Y, lp2.X - lp1.X, lp2.Y - lp1.Y);
                    }
                    break;
                case "Ellipse (p1,p2)":
                    if (flagP1 == true)
                    {
                        lp1 = new iPoint(x, y); flagP1 = false;
                    }
                    else
                    {
                        lp2 = new iPoint(x, y); flagP1 = true;
                        if (flagFill == false) drawOval(g, lp1.X, lp1.Y, lp2.X - lp1.X, lp2.Y - lp1.Y);
                        if (flagFill == true)  fillOval(g, lp1.X, lp1.Y, lp2.X - lp1.X, lp2.Y - lp1.Y);
                    }
                    break;
                case "Rectangle":
                    if (flagFill == false) g.strokeRect( x, y, sz_w, sz_h);
                    if (flagFill == true ) g.fillRect( x, y, sz_w, sz_h);
                    break;
                case "Ellipse": 
                    if (flagFill == false) drawOval(g, x, y, sz_w, sz_h);
                    if (flagFill == true)  fillOval(g, x, y, sz_w, sz_h);
                    break;
                case "Line":
                    if (flagP1==true){
                        lp1 = new iPoint(x,y); flagP1 = false;
                    } else {
                        lp2 = new iPoint(x, y); flagP1 = true;
						g.beginPath();
						g.moveTo(lp1.X,lp1.Y);g.lineTo(lp2.X,lp2.Y);
						g.stroke();
                    }
                    break;
                case "Text":
                    if (String.valueOf(t3.value).length > 0){
						g.font=dFont;"bold 36px Tahoma";
						g.textAlign="start";
						g.fillText(t3.value, x, y);						
                    }
                    break;
				case "Erase":
					//g.strokeStyle=bkColor;
					g.clearRect(x, y, sz_w, sz_h);
                    break;
                case "Erase Range":
                    if (flagP1 == true){lp1 = new iPoint(x, y); flagP1 = false;
                    }else{
                        lp2 = new iPoint(x, y); flagP1 = true;
						//g.strokeStyle=bkColor;
                        g.clearRect(lp1.X, lp1.Y, lp2.X-lp1.X, lp2.Y-lp1.Y);
                    }
                    break;
                //********** Edit Events [Copy, Cut, Paste] ***********
				
                case "Copy Image":
                    if (flagP1==true){
                        lp1 = new iPoint(x,y); flagP1 = false;
                    } else {
                        lp2 = new iPoint(x, y);
                        flagP1 = true; var w1 = lp2.X - lp1.X; var h1 = lp2.Y - lp1.Y;
                        try
                        {
            				currImg = g.getImageData(lp1.X, lp1.Y, w1, h1);//Copy
			                setEdit("Paste"); // Paste After Copy
                        }
                        catch (ex) { }
                    }
                    break;
                case "Cut Image":
                    if (flagP1==true) {
                        lp1 = new iPoint(x, y); flagP1 = false;
                    } else {
                        lp2 = new iPoint(x, y); var w1 = lp2.X - lp1.X; var h1 = lp2.Y - lp1.Y;
                        flagP1 = true;
                        try
                        {
                            currImg = g.getImageData(lp1.X, lp1.Y, w1, h1);//Copy
                            //Erasing Image
							g.clearRect(lp1.X, lp1.Y, lp2.X-lp1.X, lp2.Y-lp1.Y);
                            setEdit("Paste"); // Paste After Copy
                            
                        }
                        catch (ex) { }

                    }
                	break;

                case "Paste Image":
					g.putImageData(currImg, x, y);//Paste
                	setShape();
                    break;
				//*/
                //******************************************************
                default:break;
            }
            lblStatus.innerHTML = "Selected Shape: " + selShape;
			saveScreen();
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
    function clearScreen()
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
                        msg += " Basic Paint Program \n";
                        msg += " Part of a Training Program \n";
                        msg += " Made by P.Ramos @ Jul/2016 \n";
                        msgbox(msg, "About");
                    
                    break;
                default:
                    msgbox("MenuHelp\n Sender: " + sel, "Basic VisiCalc");
                    break;
            }
			
        }

     // **************** [OPEN FILE ] ************************** 
		
      var openFile = function(event) {
        var input = event.target;
		var tmpImg = new Image();
        var reader = new FileReader();
        reader.onload = function(){
          var data = reader.result;
		  //readFile(text);
		  tmpImg.src = data;
		  showPic(tmpImg);
        };
		//reader.readAsText(input.files[0]);
		reader.readAsDataURL(input.files[0]);
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
	function setEdit(opt) {
		if (opt=="Cut") {
			selShape = "Cut Image";
		}
		if (opt=="Copy") {
			selShape = "Copy Image";
		}
		if (opt=="Paste") {
			selShape = "Paste Image";
			flagP1 = true;
			if (currImg != null) {flagImg = true; 
			} else {flagImg = false;}
		
		}
		flagP1 = true;
		lblStatus.innerHTML = "Selected Shape: " + selShape;	
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
	
	
	  
window.addEventListener("load", doFirst, false);

