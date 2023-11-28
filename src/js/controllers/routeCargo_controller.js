/*
* для карты маршрута = грузы
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import ymaps from "ymaps";

export default class extends Controller {

   async connect() {
       if(global.user !== null) {
           const maps = await ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=582e9bd2-33d6-490f-981f-5847a69ea993&lang=ru_RU');

           let findParam = {};
           let cityCoords;

           let cargoItemId = window.location.href;
           cargoItemId = cargoItemId.slice(cargoItemId.indexOf('=') + 1);




           try {
               let cargoItem = await api.GetCargo(cargoItemId);


               let pointsFrom = [];
               let pointsTo = [];
               let emails = [];
               let phones = [];
               let addition = []
               let loadingtype = []
               let transporttype = []


               for (let i = 0; i < cargoItem.loadingpointsList.length; i++){
                   let city = await api.GetCity(cargoItem.loadingpointsList[i].id);
                   pointsFrom.push(city.name + ',' + city.region.name +',' + city.country.name);
               }
               for (let i = 0; i < cargoItem.unloadingpointsList.length; i++){
                   let city = await api.GetCity(cargoItem.unloadingpointsList[i].id);
                   pointsTo.push(city.name + ',' + city.region.name +',' + city.country.name);
               }
               for (let i = 0; i < cargoItem.additionalmailsList.length; i++){
                   emails.push(cargoItem.additionalmailsList[i]);
               }
               for (let i = 0; i < cargoItem.additionalphonesList.length; i++){
                   phones.push(cargoItem.additionalphonesList[i]);
               }
               for (let i = 0; i < cargoItem.additionList.length; i++){
                   addition.push(cargoItem.additionList[i]);
               }
               for (let i = 0; i < cargoItem.loadingtypeList.length; i++){
                   loadingtype.push(cargoItem.loadingtypeList[i]);
               }
               for (let i = 0; i < cargoItem.transporttypeList.length; i++){
                   transporttype.push(cargoItem.transporttypeList[i]);
               }


               $('#cargo-item-data').html('' +
                   ' <li>\n' +
                   '        <strong>Информация о грузе</strong>\n' +
                   ' <li>\n' +
                   '        <strong class="cargo-data__title">Дата публикации</strong>\n' +
                   '        <span class="cargo-data__text">'+ cargoItem.createdAt + '</span>\n' +
                   '      </li>\n' +
                   '      <li>\n' +
                   '        <strong class="cargo-data__title">Точки погрузки</strong>\n' +
                   '        <span class="cargo-data__text">'+ pointsFrom + '</span>\n' +
                   '      </li>\n' +
                   '      <li>\n' +
                   '        <strong class="cargo-data__title">Точки выгрузки</strong>\n' +
                   '        <span class="cargo-data__text">'+ pointsTo + '</span>\n' +
                   '      </li>\n' +
                   '      <li>\n' +
                   '        <strong class="cargo-data__title">Даты</strong>\n' +
                   '        <span class="cargo-data__text">С '+ cargoItem.from + ' по '+ cargoItem.till + '</span>\n' +
                   '      </li>\n' +
                   '      <li>\n' +
                   '        <strong class="cargo-data__title">Контакты</strong>\n' +
                   '        <span class="cargo-data__text">' +
                   ''+ emails + '' +
                   '<br>'
                   + phones +'' +
                   '</span>\n' +
                   '      </li>\n' +
                   '      <li>\n' +
                   '        <strong class="cargo-data__title">Транспорт</strong>\n' +
                   '        <span class="cargo-data__text">' +
                   'Вес: '+ cargoItem.weight + '<br>' +
                   'Объем: '+ cargoItem.volume + '<br>' +
                   'Тип транспорта: '+ transporttype + '<br>' +
                   'Вид погрузки: '+ loadingtype + '<br>' +
                   'Дополнительно: '+ addition + '<br>' +
                   '</span>      </li>')

               let points = [];
               for (let i = 0; i < pointsFrom.length; i++){
                   points.push(pointsFrom[i]);
               }
               for (let i = 0; i < pointsTo.length; i++){
                   points.push(pointsTo[i]);
               }


               /**
                * Создаем мультимаршрут.
                * Первым аргументом передаем модель либо объект описания модели.
                * Вторым аргументом передаем опции отображения мультимаршрута.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml
                */
               let multiRoute = await  new maps.multiRouter.MultiRoute({
                   // Описание опорных точек мультимаршрута.
                   referencePoints: points,
                   // Параметры маршрутизации.
                   params: {
                       // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
                       results: 5,

                       //Без учета трафика
                       avoidTrafficJams: true
                   }
               }, {
                   // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
                   boundsAutoApply: true,

                   // Тип промежуточных точек, которые могут быть добавлены при редактировании.
                   editorMidPointsType: "via",

                   // В режиме добавления новых путевых точек запрещаем ставить точки поверх объектов карты.
                   editorDrawOver: false
               });

               let buttonEditor = new maps.control.Button({
                   data: { content: "Режим редактирования" }
               });

               buttonEditor.events.add("select", function () {
                   /**
                    * Включение режима редактирования.
                    * В качестве опций может быть передан объект с полями:
                    * addWayPoints - разрешает добавление новых путевых точек при клике на карту. Значение по умолчанию: false.
                    * dragWayPoints - разрешает перетаскивание уже существующих путевых точек. Значение по умолчанию: true.
                    * removeWayPoints - разрешает удаление путевых точек при двойном клике по ним. Значение по умолчанию: false.
                    * dragViaPoints - разрешает перетаскивание уже существующих транзитных точек. Значение по умолчанию: true.
                    * removeViaPoints - разрешает удаление транзитных точек при двойном клике по ним. Значение по умолчанию: true.
                    * addMidPoints - разрешает добавление промежуточных транзитных или путевых точек посредством перетаскивания маркера, появляющегося при наведении курсора мыши на активный маршрут. Тип добавляемых точек задается опцией midPointsType. Значение по умолчанию: true
                    * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml#editor
                    */
                   multiRoute.editor.start({
                       addWayPoints: true,
                       removeWayPoints: true
                   });
               });

               buttonEditor.events.add("deselect", function () {
                   // Выключение режима редактирования.
                   multiRoute.editor.stop();
               });

               // Создаем карту
               let myMap = await  new maps.Map('map', {
                   center: [43.2567, 76.9286],
                   zoom: 4,
                   controls: [buttonEditor]
               }, {
                   buttonMaxWidth: 300
               });

               // Добавляем мультимаршрут на карту.
               await myMap.geoObjects.add(multiRoute);

               let routes = multiRoute.getRoutes();
               console.debug(routes.get(0));

               $('.adding-carg__section').append(

               );
           }catch (error){
               console.debug(error);
           }

       } else {
          $('.adding-carg__section').append('<div class="ads-popup__container">\n        ' +
              '<div class="ads-popup__title">Вы не авторизованы!</div>\n        ' +
              '<p class="ads-popup__text">Чтобы просмотреть маршрут, пожалуйста  <a class="ads-popup__link" href="lk-enter.html">войдите</a> или <a class="ads-popup__link" href="lk-registration.html" >зарегистрируйтесь</a></p> \n</div>');
          $('#map').remove();
       }



    }
}




