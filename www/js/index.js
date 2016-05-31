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
     
     /*
     	// ALTERNATIVA ----------------------------------------------------------------
        if (canvas.width  < window.innerWidth)  { canvas.width  = window.innerWidth;  }
        if (canvas.height < window.innerHeight) { canvas.height = window.innerHeight; }
     */
    
     /*
    	var info_pantalla = "amplada_pantalla : " + amplada_pantalla + " --- alçada_pantalla : " + alcada_pantalla +  " --- amplada_pantalla_CSS : " + amplada_pantalla_CSS + " --- alçada_pantalla_CSS : " + alcada_pantalla_CSS ;
    	alert(info_pantalla);
     */
     
     
     draw();
 
         
			

     //--------------------------------------------------------------------------------------------------------------------------//     
 
     // FUNCIONS A EXECUTAR EN EL MOMENT DE SER CRIDADES 
     // COM A ---> nom_funcio();   s'executa function nom_funcio(){ ... codi ... } 
     function draw() {
     	
        var canvas = document.getElementById('canvas');
           
           if (canvas.getContext){
        	
	        var ctx = canvas.getContext('2d');

		var amplada_rect = amplada_pantalla_CSS  - 20 ;
		var alcada_rect = alcada_pantalla_CSS - 20 ;
		
		// alert( "Dibuixaré un rectangle amb origen a (10,10) i d´amplada : " + amplada_rect + " i alçada : " + alcada_rect);
		roundedRect(ctx,10,10,amplada_rect,alcada_rect,10);
		
		// dibuixo el fons --> laberint_fons_1.png
		var img_fons = new Image();   
		img_fons.onload = function(){
		    ctx.drawImage(img_fons,0,0,amplada_pantalla_CSS,alcada_pantalla_CSS);
		};
		img_fons.src = 'img/laberint_fons_1.png'; // Determinar origen
		
		
		// Situem la imatge ( bola )
		var img = new Image();   // Crear nova imatge
		// centre pantalla ?
		var centre_x = amplada_pantalla_CSS / 2 ;
		var centre_y = alcada_pantalla_CSS / 2 ;
		
		// quina mida la bola ?
		var mida_x_bola = amplada_pantalla_CSS * ( 10 / 100 ) ; // 36 ;  10% de l'amplada de la pantalla -> amplada_pantalla_CSS 
		var mida_y_bola = mida_x_bola ;  // 36 ;
		
		// Quina posició la bola ? Temin present que la bola ocupa un espai 
		var posicio_x_bola = centre_x - ( mida_x_bola / 2 ) ;
		var posicio_y_bola = centre_y - ( mida_y_bola / 2 ) ;
		
		img.onload = function(){
		
		    // hauria de ser de 30x30 (o el que sigui) i centrada a la pantalla		
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
      
      	    
      // quina mida la bola ?
      var amplada_pantalla_CSS = window.innerWidth ; 	// 360px
	    var mida_x_bola = amplada_pantalla_CSS * ( 10 / 100 ) ; // 36 ;  10% de l'amplada de la pantalla -> amplada_pantalla_CSS 
	    var mida_y_bola = mida_x_bola ;  // 36 ;
      	    
      	    //alert("L´anterior estava a  : (" + window.darrera_posicio_x + "," + window.darrera_posicio_x +  ") i ara estarà a : (" + startx + "," + starty + ")");
      	    
      	    
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

      
});


