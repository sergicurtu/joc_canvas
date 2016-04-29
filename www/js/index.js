$(document).on('deviceready', function() {

     var canvas = document.getElementById('canvas');
      
      draw();
      
     // FUNCIONS A EXECUTAR EN EL MOMENT DE SER CRIDADES 
     // COM A ---> nom_funcio();   s'executa function nom_funcio(){ ... codi ... } 
     function draw() {
        var canvas = document.getElementById('canvas');
        if (canvas.getContext){
          var ctx = canvas.getContext('2d');
      
          
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
      
});
