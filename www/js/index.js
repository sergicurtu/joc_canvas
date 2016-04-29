$(document).on('deviceready', function() {

     var canvas = document.getElementById('canvas');
     
     // determinem amplada alçada DISPOSITIU ------------------
     var amplada_pantalla = screen.width ;
     var alcada_pantalla = screen.height ; 
     var amplada_pantalla_CSS = window.innerWidth ; 
     var alcada_pantalla_CSS = window.innerHeight ;
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
     
     var info_pantalla = "amplada_pantalla : " + amplada_pantalla + " --- alçada_pantalla : " + alcada_pantalla +  " --- amplada_pantalla_CSS : " + amplada_pantalla_CSS + " --- alçada_pantalla_CSS : " + alcada_pantalla_CSS ;
     alert(info_pantalla);
     
     draw();
     
     
     //--------------------------------------------------------------------------------------------------------------------------//     
 
     // FUNCIONS A EXECUTAR EN EL MOMENT DE SER CRIDADES 
     // COM A ---> nom_funcio();   s'executa function nom_funcio(){ ... codi ... } 
     function draw() {
     	
        var canvas = document.getElementById('canvas');
           
           if (canvas.getContext){
        	
	        var ctx = canvas.getContext('2d');
	      
		// pinto rectangles més petits (tradicionals)
	      	ctx.beginPath();
	      	ctx.strokeRect(10,10,340,596); 	
	        ctx.strokeRect(10,10,100,100); 	 
	        ctx.strokeRect(10,10,200,200); 	 
	        ctx.closePath();
	       
	      
		var amplada_rect = amplada_pantalla_CSS  - 20 ;
		var alcada_rect = alcada_pantalla_CSS - 20 ;
		
		alert( "Dibuixaré un rectangle amb origen a (10,10) i d´amplada : " + amplada_rect + " i alçada : " + alcada_rect);
		roundedRect(ctx,10,10,amplada_rect,alcada_rect,10);	
      	  
           }
      }
      
      // Per dibuixar rectangles amb vores arrodonides
      // EXEMPLE roundedRect(ctx,12,12,150,150,15);
      function roundedRect(ctx,x,y,width,height,radius){
        ctx.beginPath();
        ctx.moveTo(x,y+radius);
        ctx.lineTo(x,y+height-radius);
        ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
        ctx.lineTo(x+width-radius,y+height);
        ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
        ctx.lineTo(x+width,y+radius);
        ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
        ctx.lineTo(x+radius,y);
        ctx.quadraticCurveTo(x,y,x,y+radius);
        ctx.stroke();
      }
      
      
     // Que fem si en quedem sense internet ( pots mirar amb el mode avió )
	document.addEventListener("offline", function() {
		
		//somthing
		alert("ara NO HI HA internet");
		
	}, false);
		
	// Que fem si el dispositiu es gira ?
	$(window).resize(function() {
		//somthing
		alert("has girat el dispositiu");
	});
      
      
      
});
