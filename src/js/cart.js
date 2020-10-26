$(document).ready(function () {
  if(Service.checkPageUrl("/cart")){
    var $order = $(".cart-container__order");
    var $window = $(window);
    (function () {
      var paddingValue = 0;
      var paddingMax = 0;
      $(window).on("scroll",function () {
        if($window.scrollTop() >= $order.offset().top - ($(".search-form").height() * 1.5)){
          paddingValue = ($window.scrollTop() - ($("header").height()) - 50);
          paddingMax = $(".cart-container__products__items").height() - $(".cart-container__order-block").height() - 40;
          if(paddingValue <= paddingMax) $order.css("padding-top", paddingValue);
          else $order.css("padding-top", paddingMax);
        } else {
          $order.css("padding-top","0");
        }
      });
    }());

    (function () {
      var getElem = function (el) {
        return $(".row-product__" + el)[0];
      };
      var elements = [getElem("picture"),getElem("price"),getElem("amount"),getElem("sum")];
      var legend = ['Товар','Цена','Кол-во','Сумма'];
      $(elements).each(function (i,item) {
        $("<div>",{
          html: legend[i],
          class: "row-product__legend"
        }).prependTo($(item));
      });
    }());
  }
});
