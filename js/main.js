lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'alwaysShowNavOnTouchDevices': false,
    'showImageNumberLabel': true,

    //alwaysShowNavOnTouchDevices
    //По умолчанию: false
    //Если true, то левая и правая стрелки навигации, которые появляются при наведении мыши при просмотре набора изображений, будут всегода видимы на устройствах с поддержкой сенсорного ввода

    //fadeDuration
    //По умолчанию: 500
    //Время, необходимое для исчезновения контейнера, в миллисекундах.

    //fitImagesInViewport
    //По умолчанию: true
    //Если true, то пропорционально уменьшаем размер изображения чтобы картинка поместилось в области просмотра. Это избавляет пользователя от необходимости скроллить, чтобы увидеть все изображение.

    //maxWidth
    //Если задано, высота изображения будет ограничена этим значением (в пикселях). Соотношение сторон не будет соблюдаться.

    //maxHeight
    //Если задано, ширина изображения будет ограничена этим значением (в пикселях). Соотношение сторон не будет соблюдаться.

    //positionFromTop
    //По умолчанию: 50
    //Расстояние от верхней части окна просмотра до Lightbox-контейнера (в пикселях).

    //resizeDuration
    //По умолчанию: 700
    //Время, в течение которого Lightbox-контейнер будет изменять свою ширину и высоту при смене изображений разного размера (в миллисекундах).

    //showImageNumberLabel
    //По умолчанию: true
    // Если false, в текст будет указываться текущий номер изображения и общее количество изображений в наборе, например: "Изображение 2 из 4".

    //wrapAround
    // По умолчанию: false
    // Если true, то при показе последнего изображения кнопка для показа следующего изображения не исчезает. Нажатие на нее приведет к показу первого изображения.
})


$(function () {
    $('.slider').bxSlider({
        auto: true,
        mode: 'fade',
        speed: 2000,
        pause: 10000,
        //autoHover: true,
        //easing: 'ease-in-out',
        controls: false,
        pager: false,
    });
});


$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        if (!$('.header__bottom').hasClass('fixedmenu')) {
            $('.header__bottom').addClass('fixedmenu');
        }
        if (!$('.first').hasClass('first-margin-top')) {
            $('.first-section').addClass('first-margin-top');
        }
    } else {
        $('.header__bottom').removeClass('fixedmenu');
        $('.first-section').removeClass('first-margin-top');
    }
});

