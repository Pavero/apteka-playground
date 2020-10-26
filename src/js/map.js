var YandexMap = (function () {
  var pharmacyData = "";
  $.ajax({
    url: "/data/pharmacyList.json",
    success: function (resp) {
      pharmacyData = resp;
    }
  });

    function initMap() {
          var mapCenter = [54.513527, 36.246636],
              map = new ymaps.Map('map', {
                  center: mapCenter,
                  zoom: 9,
                  controls: []
              },{
                geoObjectOpenBalloonOnClick: false
              }),
              placemarks = [];



          var clusterer = new ymaps.Clusterer({
              clusterDisableClickZoom: false,
              clusterOpenBalloonOnClick: true,
              // Устанавливаем собственный макет контента балуна.
          });

          // Заполняем кластер геообъектами со случайными позициями.
          pharmacyData.forEach(function (item, i, arr) {
            var placemark = new ymaps.Placemark(item.coords, {
                // Устаналиваем данные, которые будут отображаться в балуне.
                balloonContentHeader: (i + 1),
                balloonContentBody: 'Информация о метке №' + (i + 1),
                placemarkId: i
            });
            placemarks.push(placemark);
          });

          clusterer.add(placemarks);
          map.geoObjects.add(clusterer);

          map.geoObjects.events.add('click', function (e) {
            var id = (e.get('target').properties.get("placemarkId") + 1);
            if(!isNaN(id)) $.fancybox.open("Аптека N" + id);
          });
        }
  var _export = {
    buildMap: function () {
      var mapLoadAwait = setTimeout(function () {
        if(typeof ymaps != "object") mapLoadAwait();
        else if($("#map").length) initMap();
      },1000);
    }
  };
  return _export;
})();
