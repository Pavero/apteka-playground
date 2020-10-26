var Init = (function () {
  function init(){
    _export.customScroll();
  }
  var _export = {
    customScroll: function (el) {
      el = Service.defaultValue(el,".js-custom-scroll");
      $(el).each(function (i, item) {
        if($(item).height() >= 300) $(item).customScroll();
      });
    }
  };
  $(document).ready(function () {
    init();
  });
  return _export;
})();
