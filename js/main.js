$(document).ready(function () {
  initMenu();
  initShadowText();
  initFeatures();
  initJoin();
});

var initMenu = function () {
  $(".toggle-menu, .menu-fader").on("click", function () {
    $("html").toggleClass("open-menu");
  });

  $("a.js_goto").click(function () {
    $("html").removeClass("open-menu");
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      {
        queue: false,
        duration: 500,
      }
    );
    return false;
  });
};

var initShadowText = function () {
  $(".shadow-text").each(function () {
    var hold = $(this);
    var num;
    var lh;
    hold.append('<div class="lines"></div>');
    var lines = hold.find(".lines");

    var _resize = function () {
      lh = parseInt(hold.css("line-height"), 10);
      num = +(hold.outerHeight() / lh).toFixed(0);
      lines.css({
        "--num": num,
        "--width": lines.outerWidth() + "px",
      });
      lines.find("> *").remove();

      for (var i = 0; i < num; i++) {
        lines.append("<div></div>");
      }
    };

    _resize();
    $(window).on("resize", _resize);

    var _scroll = function () {
      var i;
      var p = (
        (($(window).scrollTop() +
          $(window).outerHeight() -
          hold.outerHeight() / 2 -
          lh -
          hold.offset().top) /
          (hold.outerHeight() +
            ($(window).outerHeight() - hold.outerHeight()) / 2)) *
        num
      ).toFixed(6);

      if (p >= 0 && p <= num) {
        i = p;
      } else if (p < 0) {
        i = 0;
      } else if (p > num) {
        i = num;
      }

      if (p > num) {
        hold.addClass("end");
      } else {
        hold.removeClass("end");
      }

      hold.css({
        "--percent": i,
      });
    };

    _scroll();
    $(window).on("scroll resize", _scroll);
  });
};

var initFeatures = function () {
  $(".features")
    .find(".top-title")
    .each(function () {
      var el = $(this);
      var text = el.html();

      el.html(
        '<div class="line"><div>' +
          text +
          '</div><div class="sq"></div><div>' +
          text +
          '</div><div class="sq"></div><div>' +
          text +
          '</div><div class="sq"></div><div>' +
          text +
          '</div><div class="sq"></div><div>' +
          text +
          '</div><div class="sq"></div><div>' +
          text +
          '</div><div class="sq"></div></div>'
      );

      el.addClass("ready");
    });
};

var initJoin = function () {
  $(".join")
    .find(".line")
    .each(function () {
      var el = $(this);
      var text = el.html();

      el.html(text + text + text + text + text + text);
      el.addClass("ready");
    });
};
