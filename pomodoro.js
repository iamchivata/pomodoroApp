//   this will give us the current date:
function currentDate(){
   
      var date = new Date();
      var year = date.getFullYear();
    //   var month = date.getMonth();
      var output = year ; 
  
      console.log(output);
      document.getElementById("year").innerHTML =output;
    
  }
 var timerId;
// by clicking the start button this function will work:
  function startTimer(){

    var countdown = 25 * 60 * 1000;
    var timerId = setInterval(function(){

    countdown -= 1000;

    var min = Math.floor(countdown / (60 * 1000));
    var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);  //correct

    if (countdown < 0) {

    //  alert("brovo you work for 25 minutes.");
     clearInterval(timerId);

   } 
   
  //  if(stopTimer()){
  //     clearInterval(timerId);
  //  }

   else {
    document.getElementById("timer").innerHTML =min + " : " + sec;
  }

 

    }, 1000);
}

function stopTimer(){
  console.log("stop");
  clearInterval(this.timerId);
}

 

