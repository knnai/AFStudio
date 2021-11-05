

$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        if (!$('.header__bottom').hasClass('fixedmenu')) {
            $('.header__bottom').addClass('fixedmenu');
            $('.first-screen').css({ marginTop: '50px' });
        }
    } else {
        $('.header__bottom').removeClass('fixedmenu');
        $('.first-screen').css({ marginTop: '0px' });
    }
});

