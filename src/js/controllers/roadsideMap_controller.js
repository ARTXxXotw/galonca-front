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
            category: undefined
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

            if(filterSortCategory.length > 0){
                findParam.category = filterSortCategory;
            }


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
            $('#roadside-city').text('Ваш город ' + geoCity);
            findParam.cityName = geoCity;
            findParam.cityCoords = coordPoint;
            let cityName = await api.ListCity(findParam.cityName);
            findParam.cityId = cityName.citiesList[0].id;
        }
        else {
            let city = await api.GetCity(findParam.cityId);
            findParam.cityName = city.name;
            let res = await maps.geocode(city.name);
            cityCoords = res.geoObjects.get(0).geometry.getCoordinates();
            findParam.cityCoords = cityCoords;
            $('#roadside-city').text('Вы искали в г. ' + city.name);
        }


        try {
            //подставляем значения из фильтра для вывода списка записей
             let roadsideList = await api.FindRoadsideService({
                addressCity: [findParam.cityId],
                category: findParam.category
            });
            if (findParam.category !== undefined &&  findParam.category.length !== 0) {
                let roadsiteType = findParam.category[0];

                switch (roadsiteType) {
                    case '0':
                        roadsiteType = 'придорожную гостиницу'
                        break;
                    case '1':
                        roadsiteType = 'придорожное кафе'
                        break;
                    case '2':
                        roadsiteType = 'паркинг'
                        break;
                    case '3':
                        roadsiteType = 'автомойку'
                }

                $('#roadside-cat').text('Вы искали: ' + roadsiteType);
            }

            if(roadsideList.roadsideservicesList.length === 0 ){
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

            roadsideList.roadsideservicesList.forEach(function(row) {
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


/*   async connect() {
       const maps = await ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=582e9bd2-33d6-490f-981f-5847a69ea993&lang=ru_RU');

       let findParam = {};
       let cityCoords;

      /!*надо проверить пуст или нет ID города в ссылке - чтобы потом проверять именно его*!/

       //превращаем ссылку в кириллицу
       let filterSort = decodeURI(window.location.href);

       //обрезаем все до вопроса включая символ вопроса
       filterSort = filterSort.slice(filterSort.indexOf('?') + 1);
       console.log(filterSort);
       //ищем в строке непереваренный слеш и превращаем в слеш
       filterSort = filterSort.replace(/%2F/g, '/');

       //превращаем строку в массив, делим по амперсанду
       filterSort = filterSort.split('&');

       // город = это первый элемент массива filterSort
      let filterSortCity = filterSort.shift();

       //обрезаем строку города в массиве - все до знака равно, включая знак -превращаем в ID
       filterSortCity = filterSortCity.substring(filterSortCity.indexOf('=') + 1);

      let filterSortCategory = filterSort;

       filterSortCategory.forEach(function(item, i, arr) {
           arr[i] = item.substring(item.indexOf('=') + 1);
       });

       //создаем json - город + категории
       findParam.addressCity = filterSortCity;
       findParam.category = filterSortCategory[0];

       //проверяем, есть ли ID города.
       // в заивисимости от этого показываем карту:
       // либо по фильтру,
       // либо по местонахождению юзера
       if(filterSortCity === ''){
           console.log('города в фильтре нет');
               // ищем местонахождение юзера
               let geolocation = maps.geolocation;
               let result = await geolocation.get({
                   provider: 'yandex',
                   mapStateAutoApply: true
               });
               let coordPoint = result.geoObjects.get(0).geometry._coordinates;
               let res = await maps.geocode(coordPoint);
               let firstGeoObject = res.geoObjects.get(0);
               let geoCity = firstGeoObject.getLocalities()[0];
               $('#roadside-city').text('Ваш город ' + geoCity);
               console.log(coordPoint);
                cityCoords = coordPoint;
       } else {
               let city = await api.GetCity(filterSortCity);
               let res = await maps.geocode(city.name);
               cityCoords = res.geoObjects.get(0).geometry.getCoordinates();
              $('#roadside-city').text('Вы искали в г. ' + city.name);
       }


       try {
           //подставляем значения из фильтра для вывода списка записей
           let roadsideList = await api.FindRoadsideService(findParam);
           console.debug(roadsideList.roadsideservicesList);
           console.debug(filterSortCategory);
           if (filterSortCategory.length !== 0) {
               $('#roadside-cat').text('' + filterSortCategory);
           }


              let myMap = new maps.Map('map', {
                       center: cityCoords,
                       zoom: 12
                   }, {
                       searchControlProvider: 'yandex#search'
                   }),
                   objectManager = new maps.ObjectManager({
                       clusterize: true,
                       gridSize: 32,
                       clusterDisableClickZoom: true
                   });

           roadsideList.roadsideservicesList.forEach(function(row) {
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


    }*/
}




