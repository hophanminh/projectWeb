$(document).ready(function(){
    $('.dropdown-submenu div#sub').on("click", function(e){
      $(this).next('#sub').toggle();
      e.stopPropagation();
      e.preventDefault();
    });
  });