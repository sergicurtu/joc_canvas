$(document).on('deviceready', function() {

     var canvas = document.getElementById('canvas');
     
     // determinem amplada alçada DISPOSITIU ------------------
     var amplada_pantalla = screen.width ;		// 720px  --> SG_Note2
     var alcada_pantalla = screen.height ; 		// 1280px
     var amplada_pantalla_CSS = window.innerWidth ; 	// 360px
     var alcada_pantalla_CSS = window.innerHeight ;	// 616px 
     /////////////////////////////////////////////////////////
     
     // REDIMENSIONEM EL CANVAS
     var ctx = canvas.getContext('2d');
     ctx.canvas.width  = window.innerWidth;
     ctx.canvas.height = window.innerHeight;
     
	// Situem la imatge ( bola )

		
		// centre pantalla ?
		var centre_x = amplada_pantalla_CSS / 2 ;
		var centre_y = alcada_pantalla_CSS / 2 ;
		
		// Quina posició la bola ? Temin present que la bola ocupa un espai 
		var posicio_x_bola = centre_x - ( mida_x_bola / 2 ) ;
		var posicio_y_bola = centre_y - ( mida_y_bola / 2 ) ;

	 
     draw(posicio_x_bola,posicio_y_bola);
 
     //--------------------------------------------------------------------------------------------------------------------------//     
 /*
	// Que fem si en quedem sense internet ( pots mirar amb el mode avió )
	document.addEventListener("offline", function() {
		
		// somthing
		// alert("ara NO HI HA internet");
		
	}, false);
	
	// Que fem si el dispositiu es gira ?
	$(window).resize(function() {
		//somthing
		//alert("has girat el dispositiu");
	});
      
     // AQUESTA PART DETECTA EL TOUCH DE L'USUARI
    document.addEventListener('touchstart', function(e) {
      
      	var touchobj = e.changedTouches[0] ; // referència al primer punt tocat (pex: el primner dit)
        startx = parseInt(touchobj.clientX) ; // quina és la posició x en referència al costat esquerra de la pantalla
        starty = parseInt(touchobj.clientY) ; // la pos Y en ref. a la part superior
        //statusdiv.innerHTML = 'Status: touchstart<br> ClientX: ' + startx + 'px' ;
        //alert("Has tocat el punt -coordenades- ( " + startx + "px , " + starty + "px )");
        e.preventDefault() ;
      
      	// dibuixem la esfera a x,y
      
      	    
	    // en primer lloc eliminem la esfera anterior	      	
		ctx.fillStyle="#FFFFFF";
	    ctx.fillRect(window.darrera_posicio_x, window.darrera_posicio_y, mida_x_bola, mida_y_bola);	
      	    
      	    // dibuixo el fons --> laberint_fons_1.png
	    var img_fons = new Image();   
	    img_fons.src = 'img/laberint_fons_1.png'; // Determinar origen
	    ctx.drawImage(img_fons,0,0,amplada_pantalla_CSS,alcada_pantalla_CSS);
      	    
      	    var img = new Image();   // Crear nova imatge
	    img.src = 'img/myImage.png'; // Determinar origen
	    ctx.drawImage(img,startx,starty,mida_x_bola,mida_y_bola);

	    // NOVA POSICIÓ DE LA BOLA -------
	    window.darrera_posicio_x = startx ;
	    window.darrera_posicio_y = starty ;
      
      }
      , false);


      // touchmove
      document.addEventListener('touchmove', function(e) {
	
	var touchobj = e.changedTouches[0] ; // referència al primer punt tocat (pex: el primner dit)
        startx = parseInt(touchobj.clientX) ; // quina és la posició x en referència al costat esquerra de la pantalla
        starty = parseInt(touchobj.clientY) ; // la pos Y en ref. a la part superior
        e.preventDefault() ;
      
      // quina mida la bola ?
      var amplada_pantalla_CSS = window.innerWidth ; 	// 360px
	    var mida_x_bola = amplada_pantalla_CSS * ( 10 / 100 ) ; // 36 ;  10% de l'amplada de la pantalla -> amplada_pantalla_CSS 
	    var mida_y_bola = mida_x_bola ;  // 36 ;
      	
	    // en primer lloc eliminem la esfera anterior	      	
      ctx.fillStyle="#FFFFFF";
	    ctx.fillRect(window.darrera_posicio_x, window.darrera_posicio_y, mida_x_bola, mida_y_bola);	
      	    
      // dibuixo el fons --> laberint_fons_1.png
	    var img_fons = new Image();   
	    img_fons.src = 'img/laberint_fons_1.png'; // Determinar origen
	    ctx.drawImage(img_fons,0,0,amplada_pantalla_CSS,alcada_pantalla_CSS);
		
      	    
      var img = new Image();   // Crear nova imatge
	    img.src = 'img/myImage.png'; // Determinar origen
	    ctx.drawImage(img,startx,starty,mida_x_bola,mida_y_bola);
	

	    // NOVA POSICIÓ DE LA BOLA -------
	    window.darrera_posicio_x = startx ;
	    window.darrera_posicio_y = starty ;
	
	
      });	
*/
      
});


function draw(posicio_x_bola,posicio_y_bola) {
	
	var canvas = document.getElementById('canvas');
	   
	if (canvas.getContext){
		
			var amplada_pantalla_CSS = window.innerWidth ; 	// 360px
			var alcada_pantalla_CSS = window.innerHeight ;	// 616px 
		
			// quina mida la bola ?
			var mida_x_bola = amplada_pantalla_CSS * ( 10 / 100 ) ; // 36 ;  10% de l'amplada de la pantalla -> amplada_pantalla_CSS 
			var mida_y_bola = mida_x_bola ;  // 36 ;
		
			var ctx = canvas.getContext('2d');

			// dibuixo el fons --> laberint_fons_1.png
			var img_fons = new Image();   
			img_fons.onload = function(){
				ctx.drawImage(img_fons,0,0,amplada_pantalla_CSS,alcada_pantalla_CSS);
			};
			img_fons.src = 'img/laberint_fons_1.png'; // Determinar origen
			

			// dibuixo la bola
			var img = new Image();   // Crear nova imatge
			img.onload = function(){
				ctx.drawImage(img,posicio_x_bola,posicio_y_bola,mida_x_bola,mida_y_bola);
			};
			img.src = 'img/myImage.png'; // Determinar origen
			
			window.darrera_posicio_x = posicio_x_bola ;
			window.darrera_posicio_y = posicio_y_bola ;
	
	
	}
}
      
function pausecomp(ms) {
   ms += new Date().getTime();
   while (new Date() < ms){}
} 

 
