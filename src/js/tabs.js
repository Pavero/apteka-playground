var Tabs = (function () {
  var tabsList = [];
  function init() {
    var tabs = $(".tabs");
    console.log($(".tabs"));
    tabsList.push(new TabsElement({
      tabsId: $(tabs).attr("data-tabs"),
      tabsContainer: $(tabs).find(".tabs__container"),
      tabsControl: $(tabs).find(".tabs__control__item"),
      tabsContent: $(tabs).find(".tabs__content")
    }));
    tabsList.forEach(function (tabs, index) {
      $(tabs.tabsControl).each(function (i, item) {
        var controlId = $(item).attr("data-tab-control");
        $(item).on("click",function () {
         tabsList[index].changeTab(controlId);
        });
        if(i == 0) tabsList[index].changeTab(controlId);
      });
    });
  }
  var TabsElement = function (params) {
    var _this = this;
    this.tabsId = params.tabsId;
    this.tabsContainer = params.tabsContainer;
    this.tabsControl = params.tabsControl;
    this.tabsContent = params.tabsContent;
    this.changeTab = function (id) {
      $(_this.tabsControl).each(function () {
        var tabsControl = $(this);
        if(tabsControl.attr("data-tab-control") == id){
          tabsControl.addClass("tabs__control__item_is-active");
          $(_this.tabsContent).each(function (i, item) {
            var tabsContent = $(this);
            if(tabsContent.attr("data-tab-content") == id) tabsContent.show();
            else tabsContent.hide();
          });
        } else {
          tabsControl.removeClass("tabs__control__item_is-active");
        }
      });
    };
  };
  $(document).ready(function () {
    init();
  });
  return {
    getTabsList: function () {
      return tabsList;
    }
  };
}());
