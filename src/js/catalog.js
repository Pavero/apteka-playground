$(document).ready(function () {
  if(Service.checkPageUrl("/catalog")){


    (function () {
      $(".catalog-filter__checkbox-list__item").on("click",function () {
        var checkbox = $(this).find(".input-checkbox__input");
        checkbox.attr("checked",!checkbox.attr("checked"));
      });
    }());
    
    (function() {
      $priceMin = $("#filter-range-price-min");
      $priceMax = $("#filter-range-price-max");
      var price = {
        min: Config.getDataItem("price").minPrice,
        max: Config.getDataItem("price").maxPrice
      };
      $priceMin.val(price.min);
      $priceMax.val(price.max);
      var slider = $("#ui-filter-range-price").slider({
        range: true,
        min: price.min,
        max: price.max,
        values: [ price.min, price.max],
        slide: function( event, ui ) {
          $priceMin.val(ui.values[0]);
          $priceMax.val(ui.values[1]);
          console.log(ui.values[0] + " " + ui.values[1]);
        }
      });
    }());

  }
});
