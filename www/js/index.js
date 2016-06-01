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
    	
		//alert("Suma de valors : " + suma) ;
    	
		// cas 4 element ( (255*3) * 4 = 3060 blanc   fins a 0 en negre)	
    		if ( suma < 3060  ) 
		{ 
			//PlaySound("vora_tocada"); 
			/* EL SO PROVOCA DELAY !!	
				beep_vora(); // tocarà un audio codificat en base64
				setTimeout(function(){ },2000);
			*/
			// tornem la bola a l'origen segons el nivell
			if ( window.nivell == 1) 
			{	
				var posicio_x_bola = 80 ; 
				var posicio_y_bola = 60 ;
			}
			
			
		}
		
		
		// dibuixo la bola
		var img = new Image(); 
		img.src = 'img/myImage.png';
		ctx.drawImage(img,posicio_x_bola,posicio_y_bola,mida_x_bola,mida_y_bola);
		
		window.darrera_posicio_x = posicio_x_bola ;
		window.darrera_posicio_y = posicio_y_bola ;
		
		
		
		
		
}
 
function PlaySound(soundObj) {
  var sound = document.getElementById(soundObj);
  sound.Play();
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

function beep_vora() {
    var snd = new  Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}


