/*
* для блока СТО список
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import ymaps from "ymaps";

export default class extends Controller {

   async connect() {
       const maps = await ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=582e9bd2-33d6-490f-981f-5847a69ea993&lang=ru_RU');

       let findParam = {
           cityName: null,
           cityId: null,
           cityCoords: null,
           category: []
       };


       //URI собираем и превращаем ссылку в кириллицу
       let filterSort = decodeURI(window.location.href);

       /*проверка 1 - для варианта когда нет фильтра. если фильтра нет, то итог будет -1. если фильтр есть, то итог неважен, потому что проверяться будет значение -1*/
       if(filterSort.indexOf('?') === -1) {

       } else {
           /* проверка 2 - для варианта когда есть фильтр => формируются доп.значения в ссылке*/
           let filterSortIndex = filterSort.slice(filterSort.indexOf('?') + 1);
           filterSortIndex = filterSortIndex.replace(/%2F/g, '/');
           filterSortIndex = filterSortIndex.split('&');

           /*Проверка 2 => проверяем ID города */
           // город = это первый элемент массива filterSort
           let filterSortCity = filterSortIndex.shift();
           //обрезаем строку города в массиве - все до знака равно, включая знак -превращаем в ID
           filterSortCity = filterSortCity.substring(filterSortCity.indexOf('=') + 1);

           if(filterSortCity !== '') {
               findParam.cityId = filterSortCity;
           }
           /*Проверка 2 => проверяем категорию */
          let filterSortCategory = filterSortIndex;
           // категорий м.б. несколько, поэтому это цикл
           filterSortCategory.forEach(function(item, i, arr) {
               arr[i] = item.substring(item.indexOf('=') + 1);
           });
           findParam.category = filterSortCategory;
       }

        let cityCoords;


       /* проверяем условия: нет города в фильтре */
       if (findParam.cityId === null) {
           // ищем местонахождение юзера
           let geolocation = maps.geolocation;
           let result = await geolocation.get({
               /*provider: 'yandex',*/
               provider: 'browser',
               mapStateAutoApply: true
           });
           let coordPoint = result.geoObjects.get(0).geometry._coordinates;
           let res = await maps.geocode(coordPoint);
           let firstGeoObject = res.geoObjects.get(0);
           let geoCity = firstGeoObject.getLocalities()[0];
           $('#sto-city').text('Ваш город ' + geoCity);
           console.log(coordPoint);
           findParam.cityName = geoCity;
           findParam.cityCoords = coordPoint;
           let cityName = await api.ListCity(findParam.cityName);
           findParam.cityId = cityName.citiesList[0].id;
       }
       else {
           let city = await api.GetCity(findParam.cityId);
           findParam.cityName = city.name;
           let res = await maps.geocode(city.name + ', ' + city.region.name + ', ' + city.country.name);
          cityCoords = res.geoObjects.get(0).geometry.getCoordinates();
          findParam.cityCoords = cityCoords;
           $('#sto-city').text('Вы искали СТО в г. ' + city.name);
       }


       try {
           //подставляем значения из фильтра для вывода списка записей
           let serviceList = await api.FindServiceStation({
               addressCity: [findParam.cityId],
               category: findParam.category
           });
           if (findParam.category !== null &&  findParam.category.length !== 0) {
               $('#sto-cat').text('Выбранные услуги в СТО: ' + findParam.category);
           }

           if(serviceList.servicestationsList.length === 0 ){
               $('.map-title').append('' +
                   '<div class="col-sm-18 col-lg-8 mb-5 alert alert-danger reqiest-alert" role="alert">Нет записей</div>')
           } else {
               $('.alert-danger').remove();
           }



           let myMap = new maps.Map('map', {
                   center: findParam.cityCoords,
                   zoom: 12
               }, {
                   searchControlProvider: 'yandex#search'
               }),
               objectManager = new maps.ObjectManager({
                   clusterize: true,
                   gridSize: 32,
                   clusterDisableClickZoom: true
               });

           serviceList.servicestationsList.forEach(function(row) {
               let coord = [row.location.lat, row.location.lon];
               let myPlacemark = new maps.Placemark(coord, {
                   balloonContentHeader: row.title,
                   balloonContent: row.location.address,
                   balloonContentFooter: row.categoriesList
               }, {
                   preset: 'islands#blueDotIcon'
               });
               myMap.geoObjects.add(myPlacemark);
           });


       } catch (error) {
           console.debug(error)
       }

    }
}




