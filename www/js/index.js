$(document).on('deviceready', function() {

     // determinem amplada alçada DISPOSITIU ------------------
     var amplada_pantalla = screen.width ;		// 720px  --> SG_Note2
     var alcada_pantalla = screen.height ; 		// 1280px
     var amplada_pantalla_CSS = window.innerWidth ; 	// 360px
     var alcada_pantalla_CSS = window.innerHeight ;	// 616px 
     /////////////////////////////////////////////////////////
     
     // REDIMENSIONEM EL CANVAS
	 var canvas = document.getElementById('canvas');
     var ctx = canvas.getContext('2d');
     ctx.canvas.width  = window.innerWidth;
     ctx.canvas.height = window.innerHeight;
     
	// centre pantalla ?
	var centre_x = amplada_pantalla_CSS / 2 ;
	var centre_y = alcada_pantalla_CSS / 2 ;
		
	// Quina posició la bola ? Temin present que la bola ocupa un espai 	// quina mida la bola ?
	var mida_x_bola = amplada_pantalla_CSS * ( 10 / 100 ) ; 
	var mida_y_bola = mida_x_bola ;  // 36 ;
	var posicio_x_bola = centre_x - ( mida_x_bola / 2 ) ;
	var posicio_y_bola = centre_y - ( mida_y_bola / 2 ) ;

	// inici
	ctx.font = "30px Arial";
	ctx.fillText("Toca per començar",10,centre_y);
	
	window.nivell = 0 ;
 
	document.addEventListener("offline", function() { 
		// alert("ara NO HI HA internet");
	}, false);
 
	$(window).resize(function() {
		//alert("has girat el dispositiu");
	}, false); 
	
	document.addEventListener('touchstart', function(e) {
	
		//alert("TOCAT -> nivell = " + window.nivell) ;
	
		if ( window.nivell == 0 ) {
			
			// DIBUIXEM LA PANTALLA INICIAL & BOLA	--> el 1r nivell
			window.nivell = 1 ;
			var nivell = window.nivell ;
			
			var posicio_x_bola = 80 ; // hauria de ser en % o proporcional a la pantalla per tablets etc
			var posicio_y_bola = 60 ;
			
			//alert( " " + amplada_pantalla_CSS +   " " + alcada_pantalla_CSS +   " " + posicio_x_bola +   " " + posicio_y_bola +   " " + mida_x_bola +   " " + mida_y_bola +   " " + nivell   )
			
			var img_fons = new Image();   
			img_fons.src = 'img/laberint_fons_1.png'; // Determinar origen
			img_fons.onload = function(){
		    		ctx.drawImage(img_fons,0,0,amplada_pantalla_CSS,alcada_pantalla_CSS);
			};
			
			var img = new Image();
			img.onload = function(){
			  ctx.drawImage(img,posicio_x_bola,posicio_y_bola,mida_x_bola,mida_y_bola);
			};
			img.src = 'img/myImage.png'; // Determinar origen
			
		}
	
		
	});	
	
	document.addEventListener('touchmove', function(e) {
	
			var touchobj = e.changedTouches[0] ; // referència al primer punt tocat (pex: el primner dit)
			startx = parseInt(touchobj.clientX) ; // quina és la posició x en referència al costat esquerra de la pantalla
			starty = parseInt(touchobj.clientY) ; // la pos Y en ref. a la part superior
			e.preventDefault() ;
		  
			var posicio_x_bola = startx ;
			var posicio_y_bola = starty ;
		  
			var nivell = window.nivell ;
			draw(amplada_pantalla_CSS,alcada_pantalla_CSS,posicio_x_bola,posicio_y_bola,mida_x_bola,mida_y_bola,nivell);

	  });
      
});


function draw(amplada_pantalla_CSS,alcada_pantalla_CSS,posicio_x_bola,posicio_y_bola,mida_x_bola,mida_y_bola,nivell) {
	
		//alert("cridada la funció DRAW");
	
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		
		// dibuixo el fons --> laberint_fons_1.png
		var img_fons = new Image();   
		if ( window.nivell == 1 ) 
		{
		   img_fons.src = 'img/laberint_fons_1.png';
		} 
		ctx.drawImage(img_fons,0,0,amplada_pantalla_CSS,alcada_pantalla_CSS);
		
		// LA BOLA - ESFERA - NAU .... 
		var radi_bola = mida_x_bola / 2 ;
		posicio_x_bola = posicio_x_bola - radi_bola ; // FEM QUE EL CENTRE SIGUI EL PUNT TOCAT 
		posicio_y_bola = posicio_y_bola - radi_bola ; 
		
		
		// OK !!! el FONS . ARA abans de dibuixar la bola MIRO SI... he tocat un pixel BLANC O NEGRE ?
		var canvas_detectar = document.getElementById('canvas');
		var c = canvas_detectar.getContext('2d');
    	
		// DETERMINEM UNA SÈRIE DE PUNT DE LA CORDA D'AQUESTA CIRCUNFERÈNCIA
		
		color_pixel_sc = c.getImageData(posicio_x_bola+radi_bola, posicio_y_bola, 1, 1).data; 
		color_pixel_ce = c.getImageData(posicio_x_bola, posicio_y_bola+radi_bola, 1, 1).data; 
		color_pixel_cd = c.getImageData(posicio_x_bola+radi_bola+radi_bola, posicio_y_bola+radi_bola, 1, 1).data; 
		color_pixel_ic = c.getImageData(posicio_x_bola, posicio_y_bola+radi_bola+radi_bola, 1, 1).data; 
		
    		var suma = 0 ;
		
		suma = suma + color_pixel_sc[0] + color_pixel_sc[1] + color_pixel_sc[2] ;
		suma = suma + color_pixel_ce[0] + color_pixel_ce[1] + color_pixel_ce[2] ;
		suma = suma + color_pixel_cd[0] + color_pixel_cd[1] + color_pixel_cd[2] ;
		suma = suma + color_pixel_ic[0] + color_pixel_ic[1] + color_pixel_ic[2] ;
    	
		alert("Suma de valors : " + suma) ;
    		
    		// if ( suma >  ) { alert("piiippppp!!!! ") ;}
		
		
		// dibuixo la bola
		var img = new Image(); 
		img.src = 'img/myImage.png';
		ctx.drawImage(img,posicio_x_bola,posicio_y_bola,mida_x_bola,mida_y_bola);
		
		window.darrera_posicio_x = posicio_x_bola ;
		window.darrera_posicio_y = posicio_y_bola ;
		
		
		
		
		
}
      
function pausecomp(ms) {
   ms += new Date().getTime();
   while (new Date() < ms){}
} 

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
