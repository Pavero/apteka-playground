$(document).ready(function () {
  // <pinned-search-form>
  (function () {
    var $window = $(this);
    var searchForm = $(".search-form");
    var searchOffset = searchForm.offset().top;
    var isPinned = false;
    $(window).on("scroll",function () {
      if($window.scrollTop() >= searchOffset){
        if(!isPinned) searchForm.addClass("search-form_is-pinned");
        isPinned = true;
      } else {
        if(isPinned) searchForm.removeClass("search-form_is-pinned");
        isPinned = false;
      }
    });
  })();
  // </pinned-search-form>

//[54.515376, 36.265381],[54.510150, 36.254574]

  // ВРЕМЕННОЕ
  $(".company-info__logo.company-info__item").on("click",function () {
    location.href="/main.php";
  });
  $(".search-form__catalog-button").on("click",function () {
    location.href="/catalog.php";
  });
  $(".search-form__cart-button.search-form__item").on("click",function () {
    location.href="/cart.php";
  });
  $("a[href='']").on("click",function () {
    $.fancybox.open({
      type: "ajax",
      src: "/components/soon.php"
    });
    return false;
  });
  $(document).ready(function () {
    $(".coming-soon").each(function (i, item) {
      var _soon = $(this);
      Template.requireComponent({
        path: "/components/soon.php",
        templateParams: {},
        handler: function (resp) {
          _soon.html(resp.data);
        }
      });
    });
  });
});
