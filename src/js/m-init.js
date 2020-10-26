var Init = (function () {
  function init(){
    _export.customScroll();
    _export.searchField();
    _export.yandexMap();
  }
  var _export = {
    customScroll: function (el) {
      el = Service.defaultValue(el,".js-custom-scroll");
      $(el).each(function (i, item) {
        if($(item).height() >= 300) $(item).customScroll();
      });
    },
    searchField: function (el) {
      el = Service.defaultValue(el,".search-field");
      $(el).each(function (i, item) {
        var inputField = $(item).find(".search-field__input");
        console.log($(item));
        inputField.on("focus",function () {
          $(item).addClass("search-field_focused");
        });
        inputField.on("blur",function () {
          $(item).removeClass("search-field_focused");
        });
      });
    },
    yandexMap: function (el) {
      YandexMap.buildMap();
    }
  };
  $(document).ready(function () {
    init();
  });
  return _export;
})();
