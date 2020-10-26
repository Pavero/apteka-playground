$(document).ready(function () {

  var Checkbox = function (label,checkbox) {
    var getId = function () {
      var id = "";
      for(var i = 0; i < 5; i ++){
        id += Math.random().toString(36).substring(7);
      }
      return id;
    };
    var id = getId();
    $(label).attr("for",id);
    $(checkbox).attr("id",id);
  };
  var $checkbox = $(".input-checkbox__input");
  var $label = $(".input-checkbox__input + .input-checkbox__label");
  var checkboxList = [];
  $checkbox.each(function (i, item) {
    checkboxList.push(new Checkbox($label[i],$checkbox[i]));
  });
});

$(".catalog-filter__checkbox-list__item").on("click",function () {
  var checkbox = $(this).find(".input-checkbox__input");
  checkbox.attr("checked",!checkbox.attr("checked"));
});
