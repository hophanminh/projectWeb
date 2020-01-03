
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
