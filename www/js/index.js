$(document).on('deviceready', function() {

      alert("ara hauria de dibuixar");
      
      var canvas = document.getElementById('canvas');
      
      var ctx = canvas.getContext('2d');
      
      ctx.fillRect(25,25,100,100);
      ctx.clearRect(45,45,60,60);
      ctx.strokeRect(50,50,50,50);
      
      alert("ja ha dibuixat")
      

});
