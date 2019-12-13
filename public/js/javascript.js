
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

function showPic(x){
  var list = ["./img/old_phone2.jpg",
              "./img/old_phone3.jpg",
              "./img/old_phone4.jpeg",
              "./img/old_phone4.jpg",
              "./img/old_phone6.jpg",
              "./img/old_phone.jpg",]
  document.getElementById("show").src=list[x];
}