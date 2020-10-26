var Config = (function () {
  var data = {
    price: {
      minPrice: 12,
      maxPrice: 1235,
    }
  };
  return {
    getDataItem: function (key) {
      return data[key];
    },
    getValueItem: function (key) {
      return value[key];
    }
  };
})();
