$(document).ready(function () {
  if(Service.checkPageUrl("/profile")){
    // Expand Order Item
    (function () {

      var selector = "profile__orders__item";
      $("." + selector).each(function (i, item) {
        var _this = $(this);
        $(item).find("." + selector + "__header").on("click",function () {
          var icon = "profile__orders__item__header__expand-icon";
          _this.find("." + icon).toggleClass(icon + "_is-transform");
          _this.toggleClass(selector + "_is-expand");
        });
      });

    }());

    (function () {
      var geoSelector = ".profile__choose-pharmacy__geo-container";
      var geoContainer = $(geoSelector);
      $(".js-require-geo").on("click",function () {
        Template.requireComponent({
          path: "/components/geo.php",
          templateParams: {},
          handler: function (resp) {
            geoContainer.html(resp.data);
            Init.searchField($(geoSelector + " .search-field"));
            Init.customScroll($(geoSelector + " .js-custom-scroll"));
            Init.yandexMap();
          }
        });
      });

    }());
  } else {
    console.log("kek");
  }
});
