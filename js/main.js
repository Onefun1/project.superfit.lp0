(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // Вивід дати (+ час).
    postDate();
  });

  function postDate() {
    // Додаємо клас "date-N", де N - кількість "відмотаних" днів.
    // Наприклад, span class="date-0"></span> - мотає 0 днів назад (сьогодні).
    // Наприклад, span class="date-5"></span> - мотає 5 днів назад.
    // Вивід дати (+ години + хвилини), додаємо клас "time". Наприклад, <span class="date-1 time"></span>.
    // Виводить у форматі на зразок "14.02.2018 14:22"
    // Працює як в порядку зростання, так і в порядку спадання (міняємо флажок нижче)
    var body = document.body,
      postLang = body.getAttribute("data-post-lang");
    var sa = body.getAttribute("data-post-format") || "dd.mm.yyyy",
      msInDay = 86400000,
      counterLength = 90,
      // Максимальна кількість вімотаних днів. Змінюємо за необхідності.
      months,
      countryName = "th",
      // Мова для місяців.
      isAbbreviated = body.getAttribute("data-post-abbreviated") ? true : false,
      // Скорочений варіант місяців до трьох букв
      localDate = new Date();
    var days = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];

    switch (countryName) {
      case "it":
        // Italy
        days = [
          "Lunedì",
          "Martedì",
          "Mercoledì",
          "Giovedì",
          "Venerdì",
          "Sabato",
          "Domenica",
        ];
        break;

      case "es":
        // Spain
        days = [
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo",
        ];
        break;

      case "fr":
        // France
        days = [
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche",
        ];
        break;

      case "pt":
        // Portugal
        days = [
          "Segund-feira",
          "Terç-feira",
          "Quart-feira",
          "Quint-feira",
          "Sext-feira",
          "Sábado",
          "Domingo",
        ];
        break;

      case "de":
        // Germany
        days = [
          "Montag",
          "Dienstag",
          "Mittwoch",
          "Donnerstag",
          "Freitag",
          "Samstag",
          "Sonntag",
        ];
        break;

      case "bg":
        // Bulgaria
        days = [
          "Понеделник",
          "Вторник",
          "Сряда",
          "Четвъртък",
          "Петък",
          "Събота",
          "Неделя",
        ];
        break;

      case "pl":
        // Poland
        days = [
          "Poniedziałek",
          "Wtorek",
          "Środa",
          "Czwartek",
          "Piątek",
          "Sobota",
          "Niedziela",
        ];
        break;

      case "ro":
        // Romania
        days = [
          "Luni",
          "Marţi",
          "Miercuri",
          "Joi",
          "Vineri",
          "Sîmbătă",
          "Duminică",
        ];
        break;

      case "hu":
        // Hungary (Угорщина)
        days = [
          "Hétfő",
          "Kedd",
          "Szerda",
          "Csütörtök",
          "Péntek",
          "Szombat",
          "Vasárnap",
        ];
        break;

      case "gr": // Greece

      case "cy":
        // Cyprus (Кіпр)
        days = [
          "Δευτέρα",
          "Τρίτη",
          "Τετάρτη",
          "Πέμπτη",
          "Παρασκευή",
          "Σάββατο",
          "Κυριακή",
        ];
        break;

      case "th":
        // Cyprus (Кіпр)
        days = [
          "วันอาทิตย์",
          "วันจันทร์",
          "วันอังคาร",
          "วันพุธ",
          "วันพฦหัสบดี",
          "วันศุกร์",
          "วันเสาร์",
        ];
        break;

      case "ru": // Russia

      default:
        days = [
          "Воскресенье",
          "Понедельник",
          "Вторник",
          "Среда",
          "Четверг",
          "Пятница",
          "Суббота",
        ];
        break;
    }

    switch (countryName) {
      case "it":
        // Italy
        months = [
          "Gennaio",
          "Febbraio",
          "Marzo",
          "Aprile",
          "Maggio",
          "Giugno",
          "Luglio",
          "Agosto",
          "Settembre",
          "Ottobre",
          "Novembre",
          "Dicembre",
        ];
        break;

      case "es":
        // Spain
        months = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];
        break;

      case "fr":
        // France
        months = [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre",
        ];
        break;

      case "pt":
        // Portugal
        months = [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ];
        break;

      case "de":
        // Germany
        months = [
          "Januar",
          "Februar",
          "März",
          "April",
          "Mai",
          "Juni",
          "Juli",
          "August",
          "September",
          "Oktober",
          "November",
          "Dezember",
        ];
        break;

      case "bg":
        // Bulgaria
        months = [
          "Януари",
          "Февруари",
          "Март",
          "Април",
          "Май",
          "Юни",
          "Юли",
          "Август",
          "Септември",
          "Октомври",
          "Ноември",
          "Декември",
        ];
        break;

      case "pl":
        // Poland
        months = [
          "Styczeń",
          "Luty",
          "Marzec",
          "Kwiecień",
          "Maj",
          "Czerwiec",
          "Lipiec",
          "Sierpień",
          "Wrzesień",
          "Październik",
          "Listopad",
          "Grudzień",
        ];
        break;

      case "ro":
        // Romania
        months = [
          "Ianuarie",
          "Februarie",
          "Martie",
          "Aprilie",
          "Mai",
          "Iunie",
          "Iulie",
          "August",
          "Septembrie",
          "Octombrie",
          "Noiembrie",
          "Decembrie",
        ];
        break;

      case "hu":
        // Hungary (Румунія)
        months = [
          "Január",
          "Február",
          "Március",
          "Április",
          "Május",
          "Június",
          "Július",
          "Augusztus",
          "Szeptember",
          "Október",
          "November",
          "December",
        ];
        break;

      case "gr":
        // Greece
        months = [
          "Ιανουάριος",
          "Φεβρουάριος",
          "Μάρτιος",
          "Απρίλιος",
          "Μάιος",
          "Ιούνιος",
          "Ιούλιος",
          "Αύγουστος",
          "Σεπτέμβριος",
          "Οκτώβριος",
          "Νοέμβριος",
          "Δεκέμβριος",
        ];
        break;

      case "cy":
        // Cyprus (Кіпр)
        months = [
          "Ιανουάριος",
          "Φεβρουάριος",
          "Μάρτιος",
          "Απρίλιος",
          "Μάιος",
          "Ιούνιος",
          "Ιούλιος",
          "Αύγουστος",
          "Σεπτέμβριος",
          "Οκτώβριος",
          "Νοέμβριος",
          "Δεκέμβριος",
        ];
        break;

      case "th":
        months = [
          "มกราคม",
          "กุมภาพันธ์",
          "มีนาคม",
          "เมษายน",
          "พฤษภาคม",
          "มิถุนายน",
          "กรกฎาคม",
          "สิงหาคม",
          "กันยายน",
          "ตุลาคม",
          "พฤษจิกายน",
          "ธันวาคม",
        ];
        break;

      case "ru": // Russia

      default:
        months = [
          "Января",
          "Февраля",
          "Марта",
          "Апреля",
          "Мая",
          "Июня",
          "Июля",
          "Августа",
          "Сентября",
          "Октября",
          "Ноября",
          "Декабря",
        ];
        break;
    }

    if (isAbbreviated) {
      for (var i = 0; i < months.length; i++) {
        months[i] = months[i].slice(0, 3).toLowerCase(); // Прибираємо ".toLowerCase()", якщо перша буква повинна бути великою.
      }
    }

    for (var counter = 0; counter < counterLength; counter++) {
      var dateClass = "date-" + counter,
        nodeList = document.getElementsByClassName(dateClass),
        date = new Date(localDate.getTime() - counter * msInDay),
        timeCounter = 0,
        timeArray = time(
          nodeList
          /*, true*/
        ); // Розкоментувати, якщо необхідне сортування в порядку спадання.

      timeArray = timeFormat(timeArray);

      for (var i = 0; i < nodeList.length; i++) {
        var data = nodeList[i].dataset;

        if (data.format) {
          nodeList[i].innerHTML = format(date, data.format); // format: особливий формать для окремої дати. Додаємo як data-format="фомарт".
          /// Формати дивитись в switch нижче. dd - числом, day - прописом.
          // Наприклад, <span class="date-1" data-format="dd month yyyy"></span>
          // мотає на 1 день назад і виводить цей span у вигляді "14 Лютого 2018".
        } else {
          // Загальний формат виводу дати змінювати ТУТ!
          nodeList[i].innerHTML = format(date, sa); // Default: dd.mm.yyyy
        }

        if (/\btime\b/.test(nodeList[i].className)) {
          nodeList[i].innerHTML += " " + timeArray[timeCounter]; // Рядок для формату виводу часу.

          timeCounter++;
        }
      }
    } // <span clas="date-N"></span> - мотає час назад на N днів. Наприклад, <span className="date-5"></span>
    // <span clas="dateN"></span> - мотає час вперед на N днів. Наприклад, <span className="date5"></span>

    for (var counter = 0; counter < counterLength; counter++) {
      var dateClass = "date" + counter,
        nodeList = document.getElementsByClassName(dateClass),
        date = new Date(localDate.getTime() + counter * msInDay),
        timeCounter = 0;

      for (var i = 0; i < nodeList.length; i++) {
        var data = nodeList[i].dataset;

        if (data.format) {
          nodeList[i].innerHTML = format(date, data.format);
        } else {
          nodeList[i].innerHTML = format(date, sa);
        }
      }
    }

    function time(nodeList, reverse) {
      var timeArray = [],
        timeStatement = false;

      for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i].className.match(/\btime\b/)) {
          if (nodeList[i].className.match(/\bdate-0\b/)) {
            timeStatement = true;
          }

          timeArray.push(timeRandom(timeStatement));
        }
      }

      if (reverse)
        timeArray.sort(function (a, b) {
          return b - a;
        });
      else
        timeArray.sort(function (a, b) {
          return a - b;
        });
      return timeArray;
    }

    function timeRandom(statement) {
      if (statement) {
        var date = new Date(),
          timeLimit = date.getHours() * 60 + date.getMinutes();
        return Math.round(0 + Math.random() * timeLimit);
      }

      return Math.round(0 + Math.random() * 1440);
    }

    function timeFormat(timearray) {
      var array = [];

      for (var i = 0; i < timearray.length; i++) {
        var htemp = Math.floor(timearray[i] / 60),
          mtemp = timearray[i] % 60,
          hours = htemp < 10 ? "0" + htemp : htemp,
          minutes = mtemp < 10 ? "0" + mtemp : mtemp;
        array.push(hours + ":" + minutes);
      }

      return array;
    }

    function format(date, format) {
      var testFormat = ["dd", "day", "mm", "month", "yyyy", "year"];
      var innerDate = format;
      var dd = date.getDate(),
        mm = date.getMonth() + 1,
        year = date.getFullYear() + 543,
        month = months[mm - 1],
        day = days[new Date(year, mm - 1, dd - 2).getDay()];
      dd = dd < 10 ? "0" + dd : dd;
      mm = mm < 10 ? "0" + mm : mm;
      var dateFormat = {
        day: day,
        dd: dd,
        year: year,
        yyyy: year,
        mm: mm,
        month: month,
      };

      for (var i = 0; i < testFormat.length; i++) {
        var string = testFormat[i];
        var regExp = new RegExp(string);
        innerDate = innerDate.replace(regExp, dateFormat[string]);
      }

      return innerDate;
    }
  }

  var scrollSmooth = function () {
    $(document).on("click", 'a[href^="#"]', function (event) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $($.attr(this, "href")).offset().top,
        },
        500
      );
    });
  };

  var nav = function () {
    $(".nav__menu").on("click", function () {
      $(".nav__menu-open").css("opacity", "1");
      $(".nav__menu-open").css("display", "block");
    });
    $(".close").on("click", function () {
      $(".nav__menu-open").css("opacity", "0");
      $(".nav__menu-open").css("display", "none");
    });
    $(".close-menu").on("click", function () {
      $(".nav__menu-open").css("opacity", "0");
      $(".nav__menu-open").css("display", "none");
    });
    $(".nav__menu-bg").on("click", function () {
      $(".nav__menu-open").css("opacity", "0");
      $(".nav__menu-open").css("display", "none");
    });
    $(".nav__list--li a").on("click", function () {
      $(".nav__menu-open").css("opacity", "0");
      $(".nav__menu-open").css("display", "none");
    });
    $(document).ready(function () {
      $(".ev-footer__logo a").removeAttr("href");
    });
    setTimeout(function () {
      $(".ev-footer__logo a").removeAttr("href");
    }, 2000);
  };

  var banner = function () {
    // $(document).ready(function () {
    //   var banner = $(".banner");
    //   banner.fadeOut();
    //   if ($(".hide1")) {
    //     let scrollBottom = $(window).scrollTop() + $(window).height();
    //     $(window).on("scroll", function () {
    //       if (
    //         $(window).scrollTop() > 300 &&
    //         $(window).scrollTop() < $(".hide1").offset().top + 100
    //       ) {
    //         banner.fadeIn();
    //       } else {
    //         banner.fadeOut();
    //       }
    //     });
    //   }
    // });
    //баннер в стилях желательно скрыть
    $(window).on("scroll resize", function () {
      hideBannerScroll(".x_order_form"); // сюда через кому дописываем классы блоков, которые должны скрыть баннер
    });

    function hideBannerScroll() {
      var e = $(".banner"),
        t = $(".main-banner"),
        i = $(window).scrollTop(),
        o = i + $(window).height(),
        r = $(window).width();
      var n = 0;

      for (var _e = 0; _e < arguments.length; _e++) {
        $(arguments[_e]).each(function (e, t) {
          var a = $(t).offset().top,
            c = a + $(t).outerHeight(),
            s = $(t).offset().left,
            l = s + $(t).width();
          a <= o && c >= i && s <= r && l >= 0 && (n += 1);
        });
      }

      i <= 100 || n > 0
        ? e.fadeOut()
        : e.fadeIn().css({
            bottom: t.outerHeight(),
          });
    }
  };

  var reviews = function () {
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== "undefined"; // console.log("revirew", isFirefox);

    if (isFirefox) {
      var reviewsItemList = document.querySelectorAll(".reviews__item");

      for (var i = 0; i < reviewsItemList.length; i++) {
        reviewsItemList[i].classList.add("moz-fix");
      }
    }

    $(".slider__container").slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      adaptiveHeight: true,
      prevArrow: $(".arrow-prev"),
      nextArrow: $(".arrow-next"),
      autoplay: false,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 1219,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: false,
          },
        },
        {
          breakpoint: 769,
          settings: {
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
          },
        },
      ],
    });
    $(".slider__container").on("afterChange", function (
      event,
      slick,
      currentSlide
    ) {
      $(this)
        .find(".slick-slide.text-open")
        .not(".slick-active")
        .removeClass("text-open");
      $(this).find(".slide__desc").mCustomScrollbar("destroy");
      $(this).find(".js-show-comment").text("เพิ่มเติม");
      $(".reviews").find(".slick-list").removeClass("slick-list-rise-height");
      $(".reviews__item").removeClass("text-open");
    });
    $(".js-show-comment").on("click", function () {
      var targetButton = this;
      var slideDesc = targetButton.parentElement.querySelector(".slide__desc");
      var slickList = $(".reviews").find(".slick-list");
      console.log($(this).prev());
      targetButton.parentElement.classList.toggle("text-open");

      if (targetButton.parentElement.classList.contains("text-open")) {
        slickList.addClass("slick-list-rise-height");
        $(this).prev().mCustomScrollbar({
          scrollInertia: 300,
        });
        targetButton.innerText = "กลับ";
      } else {
        $(this).prev().mCustomScrollbar("destroy");
        slickList.removeClass("slick-list-rise-height");
        targetButton.innerText = "เพิ่มเติม";
      } // $(".slide__text-more").find(".slick-slide.slick-active").height("auto");
      // $(".slide__text-more").find(".slick-list").height("auto");
    }); // $(".slick-arrow").on("click", function () {
    //   $(".reviews__item").removeClass("text-open");
    //   $(".slide__btn").innerText = "Подробнее";
    // });
  };

  var customers = function () {
    $(".customers__slider").slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      adaptiveHeight: true,
      prevArrow:
        '<svg class="customers__arrow-left" xmlns="http://www.w3.org/2000/svg" width="21.906" height="41.91" viewBox="0 0 21.906 41.91"><path  class="cls-1" d="M665.808,3856.9l-0.694-.71a0.494,0.494,0,0,0-.694,0l-20.228,20.46a0.5,0.5,0,0,0,0,.7l0.694,0.7a0.476,0.476,0,0,0,.694,0l20.228-20.45A0.5,0.5,0,0,0,665.808,3856.9Zm0,39.5-20.228-20.45a0.476,0.476,0,0,0-.694,0l-0.694.7a0.5,0.5,0,0,0,0,.7l20.228,20.46a0.494,0.494,0,0,0,.694,0l0.694-.71A0.5,0.5,0,0,0,665.808,3896.4Z" transform="translate(-644.063 -3856.06)"/></svg>',
      nextArrow:
        '<svg class="customers__arrow-right" xmlns="http://www.w3.org/2000/svg" width="21.906" height="41.91" viewBox="0 0 21.906 41.91"><path  class="cls-1" d="M665.808,3856.9l-0.694-.71a0.494,0.494,0,0,0-.694,0l-20.228,20.46a0.5,0.5,0,0,0,0,.7l0.694,0.7a0.476,0.476,0,0,0,.694,0l20.228-20.45A0.5,0.5,0,0,0,665.808,3856.9Zm0,39.5-20.228-20.45a0.476,0.476,0,0,0-.694,0l-0.694.7a0.5,0.5,0,0,0,0,.7l20.228,20.46a0.494,0.494,0,0,0,.694,0l0.694-.71A0.5,0.5,0,0,0,665.808,3896.4Z" transform="translate(-644.063 -3856.06)"/></svg>\n    ',
      autoplay: false,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 1219,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: false,
          },
        },
        {
          breakpoint: 810,
          settings: {
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
          },
        },
      ],
    });
  };

  var order = function () {
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== "undefined";
    // Opera 8.0+
    var isOpera =
      (!!window.opr && !!opr.addons) ||
      !!window.opera ||
      navigator.userAgent.indexOf(" OPR/") >= 0;

    if (isFirefox) {
      let bodyHtml = document.querySelector(".body");
      bodyHtml.classList.add("moz-fix");
    }
    if (isOpera) {
      let bodyHtml = document.querySelector(".body");
      bodyHtml.classList.add("op-fix");
    }
  };

  document.addEventListener("DOMContentLoaded", main);

  function main() {
    scrollSmooth();
    nav();
    banner();
    reviews();
    customers();
    order();
  }
})();
