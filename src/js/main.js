document.addEventListener("DOMContentLoaded", () => {
  // Scroll
  $('.go_to').click(function () { // ловим клик по ссылке с классом go_to
    var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
    if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 100 }, 800); // анимируем скроолинг к элементу scroll_el
    }
    return false; // выключаем стандартное действие
  });
});
document.addEventListener("DOMContentLoaded", () => {
  $('.menu li a').click(function (event) {
    $('.menu-btn').toggleClass('active');
    $('.menu').toggleClass('active');
    return false;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("header, section");
  const scrollNav = document.querySelector(".scroll-nav");
  const currentEl = scrollNav.querySelector(".scroll-nav__current");
  const nextEls = scrollNav.querySelectorAll(".scroll-nav__next span");

  function updateNav() {
    let currentIndex = 0;
    const scrollY = window.scrollY + window.innerHeight / 2;
    const docHeight = document.body.scrollHeight;
    const maxScroll = docHeight - window.innerHeight;

    sections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;

      if (scrollY >= top && scrollY < bottom) {
        currentIndex = i;
      }
    });

    // ✅ если мы ниже последней секции (перед футером или в нём)
    const lastSection = sections[sections.length - 1];
    const lastBottom = lastSection.offsetTop + lastSection.offsetHeight;
    if (window.scrollY + window.innerHeight >= lastBottom) {
      currentIndex = sections.length - 1;
    }

    // Формат с ведущим нулём
    const currentNum = String(currentIndex + 1).padStart(2, "0");
    currentEl.textContent = currentNum;

    // Следующие две секции
    nextEls[0].textContent = sections[currentIndex + 1]
      ? String(currentIndex + 2).padStart(2, "0")
      : "";
    nextEls[1].textContent = sections[currentIndex + 2]
      ? String(currentIndex + 3).padStart(2, "0")
      : "";

    // Классы для 12-й и 13-й секций
    scrollNav.classList.remove("one", "two");
    if (currentIndex + 1 >= 13) {
      scrollNav.classList.add("two");
    } else if (currentIndex + 1 === 12) {
      scrollNav.classList.add("one");
    }
  }

  updateNav();
  window.addEventListener("scroll", updateNav);
  window.addEventListener("resize", updateNav);
});
document.addEventListener('DOMContentLoaded', function () {
  $('.articmodal-close').click(function (e) {
    $.arcticmodal('close');

  });
});

window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener("DOMContentLoaded", () => {
  (function ($) {
    var elActive = '';
    $.fn.selectCF = function (options) {

      // option
      var settings = $.extend({
        color: "#888888", // color
        backgroundColor: "#FFFFFF", // background
        change: function () { }, // event change
      }, options);

      return this.each(function () {

        var selectParent = $(this);
        list = [],
          html = '';

        //parameter CSS
        var width = $(selectParent).width();

        $(selectParent).hide();
        if ($(selectParent).children('option').length == 0) { return; }
        $(selectParent).children('option').each(function () {
          if ($(this).is(':selected')) { s = 1; title = $(this).text(); } else { s = 0; }
          list.push({
            value: $(this).attr('value'),
            text: $(this).text(),
            selected: s,
          })
        })

        // style
        var style = " background: " + settings.backgroundColor + "; color: " + settings.color + " ";

        html += "<ul class='selectCF'>";
        html += "<li>";
        html += "<span class='arrowCF ion-chevron-right' style='" + style + "'></span>";
        html += "<span class='titleCF' style='" + style + "; width:" + width + "px'>" + title + "</span>";
        html += "<span class='searchCF' style='" + style + "; width:" + width + "px'><input style='color:" + settings.color + "' /></span>";
        html += "<ul>";
        $.each(list, function (k, v) {
          s = (v.selected == 1) ? "selected" : "";
          html += "<li value=" + v.value + " class='" + s + "'>" + v.text + "</li>";
        })
        html += "</ul>";
        html += "</li>";
        html += "</ul>";
        $(selectParent).after(html);
        var customSelect = $(this).next('ul.selectCF'); // add Html
        var seachEl = $(this).next('ul.selectCF').children('li').children('.searchCF');
        var seachElOption = $(this).next('ul.selectCF').children('li').children('ul').children('li');
        var seachElInput = $(this).next('ul.selectCF').children('li').children('.searchCF').children('input');

        // handle active select
        $(customSelect).unbind('click').bind('click', function (e) {
          e.stopPropagation();
          if ($(this).hasClass('onCF')) {
            elActive = '';
            $(this).removeClass('onCF');
            $(this).removeClass('searchActive'); $(seachElInput).val('');
            $(seachElOption).show();
          } else {
            if (elActive != '') {
              $(elActive).removeClass('onCF');
              $(elActive).removeClass('searchActive'); $(seachElInput).val('');
              $(seachElOption).show();
            }
            elActive = $(this);
            $(this).addClass('onCF');
            $(seachEl).children('input').focus();
          }
        })

        // handle choose option
        var optionSelect = $(customSelect).children('li').children('ul').children('li');
        $(optionSelect).bind('click', function (e) {
          var value = $(this).attr('value');
          if ($(this).hasClass('selected')) {
            //
          } else {
            $(optionSelect).removeClass('selected');
            $(this).addClass('selected');
            $(customSelect).children('li').children('.titleCF').html($(this).html());
            $(selectParent).val(value);
            settings.change.call(selectParent); // call event change
          }
        })

        // handle search 
        $(seachEl).children('input').bind('keyup', function (e) {
          var value = $(this).val();
          if (value) {
            $(customSelect).addClass('searchActive');
            $(seachElOption).each(function () {
              if ($(this).text().search(new RegExp(value, "i")) < 0) {
                // not item
                $(this).fadeOut();
              } else {
                // have item
                $(this).fadeIn();
              }
            })
          } else {
            $(customSelect).removeClass('searchActive');
            $(seachElOption).fadeIn();
          }
        })

      });
    };
    $(document).click(function () {
      if (elActive != '') {
        $(elActive).removeClass('onCF');
        $(elActive).removeClass('searchActive');
      }
    })
  }(jQuery));

  $(function () {
    var event_change = $('#event-change');
    $(".select").selectCF({
      change: function () {
        var value = $(this).val();
        var text = $(this).children('option:selected').html();
        console.log(value + ' : ' + text);
        event_change.html(value + ' : ' + text);
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  //пишем событие при клике на кнопки - вызов функции toggle
  for (var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];

    accordeonButton.addEventListener("click", toggleItems, false);
  }

  //пишем функцию
  function toggleItems() {

    // переменная кнопки(актульная) с классом
    var itemClass = this.className;

    // добавляем всем кнопкам класс close
    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
    }

    // закрываем все открытые панели с текстом
    var pannels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < pannels.length; z++) {
      pannels[z].style.maxHeight = 0;
    }

    // проверка. если кнопка имеет класс close при нажатии
    // к актуальной(нажатой) кнопке добававляем активный класс
    // а панели - которая находится рядом задаем высоту
    if (itemClass == "accordeon__button closed") {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  }
});
document.addEventListener("DOMContentLoaded", () => {
  //popup1
  const popupBg = document.querySelector('.popup__bg');
  const popup = document.querySelector('.popup');
  const openPopupButtons = document.querySelectorAll('section a.btn, .nav__call, .footer__call, .item__el');
  const closePopupButton = document.querySelector('.close-popup');

  openPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg.classList.add('active');
      popup.classList.add('active');
    });
  });

  closePopupButton.addEventListener('click', () => {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg) {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });

 // popup2
  const popupBg2 = document.querySelector('.popup__bg2');
  const popup2 = document.querySelector('.popup2');
  const closePopupButton2 = document.querySelectorAll('.popup__bg2 .close-popup');

  closePopupButton2.forEach(btn => {
    btn.addEventListener('click', () => {
      popupBg2.classList.remove('active');
      popup2.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg2) {
      popupBg2.classList.remove('active');
      popup2.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popupBg2.classList.remove('active');
      popup2.classList.remove('active');
    }
  });

  // форма + валидация + отправка
  $(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    });

    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );

    function valEl(el) {
      el.validate({
        rules: {
          tel: {
            required: true,
            regex: '^([\\+]+)*[0-9\\x20\\x28\\x29\\-]{5,20}$'
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          tel: {
            required: 'Заполните поле',
            regex: 'Телефон может содержать символы + - ()'
          },
          name: {
            required: 'Заполните поле'
          },
          text: {
            required: 'Заполните поле'
          },
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          const $form = $(form);

          $.ajax({
            type: 'POST',
            url: $form.attr('action'),
            data: $form.serialize(),
          })
            .always(function (response) {
              setTimeout(() => {
                $('#loader').fadeOut();
              }, 800);

              setTimeout(() => {
                // закрываем popup1
                popupBg.classList.remove('active');
                popup.classList.remove('active');

                // открываем popup2
                popupBg2.classList.add('active');
                popup2.classList.add('active');

                // очищаем форму
                $form.trigger('reset');
              }, 1100);
            });

          return false;
        }
      });
    }

    $('.js-form').each(function () {
      valEl($(this));
    });

    $('[data-scroll]').on('click', function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 3,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination1",
        type: "progressbar",
      },
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        loop: true,
        slidesPerView: 1,
         pagination: {
        type: "bullets",
      },
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2, 
        pagination: {
        type: "bullets",
      },
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 3
      }
    }
  });
  const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 2,
    spaceBetween: 0,
    allowTouchMove: false,
    pagination: {
        el: ".swiper-pagination2",
        clickable: true,
      },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1,
      },
      767: {
        spaceBetween: 0,
        slidesPerView: 1,
        allowTouchMove: true,
      },
      992: {
        spaceBetween: 0,
        slidesPerView: 1,
      },
      1200: {
        spaceBetween: 0,
        slidesPerView: 2, 
      }
    }
  });
   const swiper3 = new Swiper('.swiper3', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination3",
        clickable: true,
      },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 1, 
         pagination: {
          el: ".swiper-pagination3",
        },
      }
    }
  });
  const swiper4 = new Swiper('.swiper4', {
    slidesPerView: 2,
    spaceBetween: 0,
    allowTouchMove: false,
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        allowTouchMove: true,
        slidesPerView: 1,
        pagination: {
        el: ".swiper-pagination4",
        clickable: true,
      },
      },
      767: {
        spaceBetween: 10,
        allowTouchMove: true,
        slidesPerView: 1,
        pagination: {
        el: ".swiper-pagination4",
        clickable: true,
      },
      },
      992: {
        allowTouchMove: true,
        spaceBetween: 20,
        slidesPerView: 2,
      },
      1200: {
        spaceBetween: 0,
        slidesPerView: 2, 
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let menuBtn = document.querySelector('.menu-btn');
  let menu = document.querySelector('.menu');
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  });
});
// svg
$(function () {
  jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, else we gonna set it if we can.
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');

  });
});
