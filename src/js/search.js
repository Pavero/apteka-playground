
var SearchField = (function () {
  function init(){
    $(".search-field").each(function (i, item) {
      _export.bindFocusEvent($(item));
    });
  }
  $(document).ready(function () {
    init();
  });
  var _export = {
    bindFocusEvent: function (el) {
      var inputField = el.find(".search-field__input");
      inputField.on("focus",function () {
        el.addClass("search-field_focused");
      });
      inputField.on("blur",function () {
        el.removeClass("search-field_focused");
      });
    }
  };
  return _export;
}());
