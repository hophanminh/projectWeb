
$(document).ready(function(){
  $(".question").click(function(){
    $(".answer").slideToggle("slow");
  });
});

$(function () {
    $("#datepicker").datepicker({ 
          autoclose: true, 
          todayHighlight: true
    }).datepicker('update', new Date());
  });


  // Count time
var countDownDate = new Date("Dec 24, 2019 20:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("day").innerHTML = days +" day";
  document.getElementById("hour").innerHTML = hours +" hour";
  document.getElementById("min").innerHTML = minutes + " min";
  document.getElementById("sec").innerHTML = seconds+" sec";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

function showPic(x){
  var list = ["./img/old_phone2.jpg",
              "./img/old_phone3.jpg",
              "./img/old_phone4.jpeg",
              "./img/old_phone4.jpg",
              "./img/old_phone6.jpg",
              "./img/old_phone.jpg",]
  document.getElementById("show").src=list[x];
}