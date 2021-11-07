
$(function () {
    $('.slider').bxSlider({
        auto: true,
        mode: 'fade',
        speed: 1000,
        easing: 'ease-in-out',
        controls: false,
        pager: false,
    });
});




$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        if (!$('.header__bottom').hasClass('fixedmenu')) {
            $('.header__bottom').addClass('fixedmenu');
        }
    } else {
        $('.header__bottom').removeClass('fixedmenu');
    }
});

