function MapMonthNumber(month) {
    var dataBag = [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'Jun',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    return (dataBag[month - 1] == undefined) ? false : dataBag[month - 1];
}

window.onload = function() {

    var countdown = 25 * 60 * 1000;


    var today = new Date();
    var month = today.getMonth() + 1;

    document.getElementById("year").innerHTML = today.getFullYear();

    month = MapMonthNumber(month);



    // function for start timer:
    document.getElementById("start").onclick = function() {
        window.timerId = setInterval(function() {

            countdown -= 1000;

            var min = Math.floor(countdown / (60 * 1000));
            var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000); //correct

            if (min < 10) {
                min = "0" + min;
            }

            if (sec < 10) {
                sec = "0" + sec;
            }

            if (countdown < 0) {
                clearInterval(timerId);
                var audio = new Audio('ding.mp3');
                audio.play();
            } else {
                document.getElementById("timer").innerHTML = min + " : " + sec;
            }

        }, 1000);
    };

    // Pause function:
    document.getElementById("pause").onclick = function() {
        console.log("pause");
        clearInterval(window.timerId);
    }

    // Reset function:
    document.getElementById("reset").onclick = function() {
        console.log("reset");
        clearInterval(window.timerId);
        countdown = 25 * 60 * 1000;
        document.getElementById("timer").innerHTML = "25:00";
    };


}