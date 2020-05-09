window.onload = function(){

  var countdown = 25*60*1000;


    document.getElementById("start").onclick= function(){
      window.timerId = setInterval(function(){
     
       countdown -= 1000;
     
       var min = Math.floor(countdown / (60 * 1000));
       var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);  //correct
     
       if (countdown < 0) {
        clearInterval(timerId);
        var audio = new Audio('ding.mp3');
        audio.play();
      } 

      else {
       document.getElementById("timer").innerHTML =min + " : " + sec;
     }
     
       }, 1000);
  };


 document.getElementById("pause").onclick=function(){
  console.log("pause");
  // clearInterval(timerId);
  // alert("pause");
  clearInterval(window.timerId);
}
 


document.getElementById("reset").onclick= function(){
  console.log("reset");
  clearInterval(window.timerId);
  countdown=25*60*1000;
  document.getElementById("timer").innerHTML= "25:00";
};


}




 

