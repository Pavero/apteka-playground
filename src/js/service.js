var Service = (function () {

  var _export = {
      defaultValue: function (value, def) {
        return value != undefined ? value : (def != undefined ? def : null);
      },
      checkPageUrl: function (page) {
        return location.pathname.indexOf(page) > -1;
      }

  };
  return _export;
}());
