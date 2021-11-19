$(function(){
    var topsectionCta = $("#topsection .btn"),
        topsectionMouse = $("#topsection .scroll-container"),
        topbar = $("#topbar");

    function scrollDown(){
        $('html, body').animate({
            scrollTop: $("#booking").offset().top
        }, 1000);
    }

    function checkScrollTop(){
        if($(window).scrollTop() > 0){
            topbar.addClass("scrolled");
        } else {
            topbar.removeClass("scrolled");
        }
    }

    // Listen on events
    topsectionCta.on("click", scrollDown);
    topsectionMouse.on("click", scrollDown);
    $(window).on("scroll", checkScrollTop);

    // Run on pageload
    checkScrollTop();
});