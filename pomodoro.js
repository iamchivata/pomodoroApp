window.onload = function(){
  var pomodoro_length = 25;
  var countdown = pomodoro_length *60*1000;
  var num_promodos =0;
  var break_length = 5;

  document.getElementById("timer").innerHTML= pomodoro_length +":00";

  var today= new Date();
  var month_num = today.getMonth();
   switch(month_num){
    case 1:
      month="Jan";
      break;

    case 2:
      month="Feb";
      break;

    case 3:
      month="March";
      break;

    case 4:
      month="April";
      break;

    case 5:
      month="May";
      break;

    case 6:
      month="Jun";
      break;
    
    case 7:
      month="July"
      break;
     
    case 8:
      month="Aug";
      break;

    case 9:
      month="Sep";
      break;
      
    case 10:
      month="Oct";
      break;
      
    case 11:
      month="Nov";
      break;
      
    case 12:
      month="Dec";
      break;
   }

    document.getElementById("date").innerHTML= today.getDate()+" "+month+" "+today.getFullYear();
    document.getElementById("promodos").innerHTML ="Today's pomodoros: "+num_promodos ;

  // function for start timer:
  document.getElementById("start").onclick= function(){
      document.getElementById("message").innerHTML ="";
      countdown=pomodoro_length *60*1000;
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
	num_promodos++;
	document.getElementById("promodos").innerHTML ="Today's pomodoros: "+num_promodos ;
        audio.play();
	pomodoro_break();
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
  countdown=pomodoro_length *60*1000;
  break_countdown=0;
  document.getElementById("timer").innerHTML= pomodoro_length +":00";
 };
//break function:
 function pomodoro_break(){
      console.log("time for a break");
      document.getElementById("message").innerHTML ="Enjoy your break :)";
      document.getElementById("timer").innerHTML = break_length+":00"
      break_countdown=break_length*60*1000;
      window.timerId = setInterval(function(){
     
       break_countdown -= 1000;
     
       var min = Math.floor(break_countdown / (60 * 1000));
       var sec = Math.floor((break_countdown - (min * 60 * 1000)) / 1000);  //correct
       
       if (min<10){
         min= "0"+min;
       }

       if (sec<10){
         sec= "0"+sec;
       }

       if (break_countdown < 0) {
        clearInterval(timerId);
        var audio = new Audio('ding.mp3');
        audio.play();
	document.getElementById("message").innerHTML ="Let's get back to work!";
	document.getElementById("timer").innerHTML =pomodoro_length +":00";
       } 

       else {
       document.getElementById("timer").innerHTML =min + " : " + sec;
       }
     
      }, 1000);
  };

}




 

