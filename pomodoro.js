window.onload = function(){

  var countdown = 25*60*1000;


  var today= new Date();
  var month =today.getMonth()+1;

  document.getElementById("year").innerHTML= today.getFullYear();
  
   switch(month){
    case 1:
      document.getElementById("month").innerHTML="Jan";
      break;

    case 2:
      document.getElementById("month").innerHTML="Feb";
      break;

    case 3:
      document.getElementById("month").innerHTML="March";
      break;

    case 4:
      document.getElementById("month").innerHTML="April";
      break;

    case 5:
      document.getElementById("month").innerHTML="May";
      break;

    case 6:
      document.getElementById("month").innerHTML="Jun";
      break;
    
    case 7:
      document.getElementById("month").innerHTML="July"
      break;
     
    case 8:
      document.getElementById("month").innerHTML="Aug";
      break;

    case 9:
      document.getElementById("month").innerHTML="Sep";
      break;
      
    case 10:
      document.getElementById("month").innerHTML="Oct";
      break;
      
    case 11:
      document.getElementById("month").innerHTML="Nov";
      break;
      
    case 12:
      document.getElementById("month").innerHTML="Dec";
      break;
   }

  

  // function for start timer:
  document.getElementById("start").onclick= function(){
      window.timerId = setInterval(function(){
     
       countdown -= 1000;
     
       var min = Math.floor(countdown / (60 * 1000));
       var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);  //correct
       
       if (min<10){
         min= "0"+min;
       }

       if (sec<10){
         sec= "0"+sec;
       }

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

// Pause function:
 document.getElementById("pause").onclick=function(){
  console.log("pause");
  clearInterval(window.timerId);
 }
 
// Reset function:
 document.getElementById("reset").onclick= function(){
  console.log("reset");
  clearInterval(window.timerId);
  countdown=25*60*1000;
  document.getElementById("timer").innerHTML= "25:00";
 };


}




 

