$(document).ready(function() {

    //variables
    var scrollOrigin = 0;

    //adds scolling class to navbar
    $(window).scroll(function(event) {
        //console.log(scrollOrigin);
        scrollOrigin = window.pageYOffset;
        if (scrollOrigin > 10) {
            $('.navbar').addClass('navbarLow');
        }
        if (scrollOrigin < 10 && $('.navbar').hasClass('navbarLow')) {
            $('.navbar').removeClass('navbarLow');
        }
    });

    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
    });

});