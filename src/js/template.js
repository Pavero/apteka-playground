var Template = (function () {
  var _export = {
    html: function (params) {
      $(params.selector).html(params.data);
    },
    append: function (params) {
      $(params.selector).append(params.data);
    },
    prepend: function (params) {
      $(params.selector).prepend(params.data);
    },
    requireComponent: function (params) {
      $.ajax({
        url: params.path + "?" + $.param(params.templateParams),
        success: function (resp) {
          params.handler({
            data: resp,
            selector: params.selector
          });
        }
      });
    }
  };
  return _export;
})();
