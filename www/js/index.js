$(document).on('deviceready', function() {


      var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d');

      // resize the canvas to fill browser window dynamically
      window.addEventListener('resize', resizeCanvas, false);

      function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            /**
             * Your drawings need to be inside this function otherwise they will be reset when 
             * you resize the browser window and the canvas goes will be cleared.
             */
            dibuixar_alguna_cosa(); 
      }
      resizeCanvas();



      function dibuixar_alguna_cosa() {
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
      
          ctx.fillRect(25,25,100,100);
          ctx.clearRect(45,45,60,60);
          ctx.strokeRect(50,50,50,50);
        }
      }


});
