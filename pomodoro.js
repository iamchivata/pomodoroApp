window.onload = function(){

  var pomodoro_length = 25
  var countdown = pomodoro_length *60*1000;
  var num_promodos =0;
  const LARGE_BREAK = 30;
  const SHORT_BREAK = 5
  
  //set number of pomodoros for today
  var key = new Date().toISOString().split("T")[0]
  var value = localStorage.getItem(key);
  if (value!=null)
  {
	 var num_promodos = value;
  }

  document.getElementById("timer").innerHTML= pomodoro_length +":00";

  var today= new Date();
  var month_num = today.getMonth();
  console.log(month_num)
   switch(month_num){
    case 0:
      month="Jan";
      break;

    case 1:
      month="Feb";
      break;

    case 2:
      month="March";
      break;

    case 3:
      month="April";
      break;

    case 4:
      month="May";
      break;

    case 5:
      month="Jun";
      break;
    
    case 6:
      month="July"
      break;
     
    case 7:
      month="Aug";
      break;

    case 8:
      month="Sep";
      break;
      
    case 9:
      month="Oct";
      break;
      
    case 10:
      month="Nov";
      break;
      
    case 11:
      month="Dec";
      break;
   }

    document.getElementById("date").innerHTML= today.getDate()+" "+month+" "+today.getFullYear();
    document.getElementById("promodos").innerHTML ="Today's pomodoros: " + num_promodos + "/16";

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
	 
	var key = new Date().toISOString().split("T")[0]
	var value = localStorage.getItem(key);
	localStorage.setItem(key, num_promodos);
  
	 
      console.log("time for a break");
	  if (num_promodos % 4 == 0){
		  break_length = LARGE_BREAK;
		  message = "Enjoy your LONG break :)"
	  }
	  else{
			break_length = SHORT_BREAK;
			message = "Enjoy your break :)"
	  }
      document.getElementById("message").innerHTML = message;
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
  
  
  let data = [];
  for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  data.push({"label":key, "value":localStorage.getItem(key)});
	}

let myChart = new TChart("example", 600, 450, data);
myChart.drawBarChart()

  }



 

