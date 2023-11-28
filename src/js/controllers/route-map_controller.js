/*
* для формы добавления объявления об авто
*/

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import 'select2/dist/js/select2.min'
import 'select2/dist/css/select2.min.css'
import serializer from 'form-serializer'
import ymaps from "ymaps";


export default class extends Controller {
    /* счетчики для генерируемых мультиселектов погрузки, выгрузки и инпутов емайл, телефон */
    loadCounter = 0;
    unloadCounter = 0;


    /* метод - массив города + вызов мультиселекта*/
    cityListAutocompete(id, counter){
        $(id + counter).select2({
            language: global.languageRu,
            ajax: {
                processResults: function (data){
                    return {
                        results: data
                    }
                },
                transport: async function(params, success, failure){
                    try {
                        let data = await api.ListCity(params.data.term);
                        success(data.citiesList);
                    } catch (e) {
                        failure();
                    }
                }
            },
            minimumInputLength: 3,
            templateResult: function (state) {
                console.debug(state);
                if (!state.id) {
                    return state.text;
                }

                return `${state.name} ${state.region.name} ${state.country.name}`
            },
            templateSelection: function (state) {
                if (!state.id) {
                    return state.text;
                }
                console.debug(state);
                return `${state.name} ${state.region.name} ${state.country.name}`
            },
            matcher: async function(params, data) {
                // If there are no search terms, return all of the data
                if ($.trim(params.term) === '') {
                    return data;
                }

                // Do not display the item if there is no 'text' property
                if (typeof data.text === 'undefined') {
                    return null;
                }

                if (typeof data.name === 'undefined') {
                    return null;
                }

                if(data.name.toLowerCase().indexOf(params.term.toLowerCase()) > -1) {
                    var modifiedData = $.extend({}, data.citiesList, true);
                    return modifiedData.citiesList;
                }

                /* data = await api.ListCity(params.term);
                 console.debug(data.citiesList);*/

            },
            placeholder: "Выберите",
            allowClear: true
        });
    }

    /* генерация мультиселекта для погрузки*/
    addPointLoading() {
        this.loadCounter++;
        $('.addpoint-loadingbox').append($('' +
            '<div class="col-sm-12 col-md-6 mb-4 addpoint-loadingbox__item">\n' +
            '<label class="form-label" for="point-loading-' + this.loadCounter + '"><span class="form-adding__text_red">*</span>выберите город ' + this.loadCounter + '</label>\n' +
            '<select class="form-control cityLoadAutocompete"  id="point-loading-' + this.loadCounter + '" name="pointLoading[]" required="">\n' +
            '<option></option>' +
            '</select>' +
            ' <div class="invalid-feedback">\n' +
            '   Пожалуйста, заполните поле\n' +
            ' </div>\n' +
            '<span class="delete-item" title="Удалить точку" aria-label="Удалить точку" data-action="click->route-map#deleteItem"></span>' +
            '</div>'));
        this.cityListAutocompete('#point-loading-', this.loadCounter);
        let pointLoading = $('#point-loading-'+ this.loadCounter);
        pointLoading.on('select2:open', (event) => {
            document.querySelector('.select2-search__field').focus();
        })
    }



    /* удаление генерируемых блоков - города, доп емайл, доп телефон */
    deleteItem() {
        $('html').on('click','.delete-item', function () {
            $(this).parent().remove();
        });
    }

    filterClear() {
        $('.cityLoadAutocompete').val(null).trigger("change");
        document.getElementsByClassName("filter__form").scrollIntoView();
    }

    async addCityList() {
        $('#map').html('').fadeIn('500');
        let form = $("#cityFilterForm")[0];
        let json = $(form).serializeObject();
        let cityList = json.pointLoading;

        let city = [];

        for (const item of cityList){
            let cityName = await api.GetCity(item);
            city.push(cityName.name + ','+ cityName.region.name +', ' +  cityName.country.name )
        }


        if(global.user !== null) {
            const maps = await ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=582e9bd2-33d6-490f-981f-5847a69ea993&lang=ru_RU');

            /**
             * Создаем мультимаршрут.
             * Первым аргументом передаем модель либо объект описания модели.
             * Вторым аргументом передаем опции отображения мультимаршрута.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml
             */

            let multiRoute = await  new maps.multiRouter.MultiRoute({
                // Описание опорных точек мультимаршрута.
                referencePoints: city,
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

/*            let routes = multiRoute.getRoutes();
            console.debug(routes.get(0));

            $('.adding-carg__section').append(

            );*/

        } else {
            $('.route-section').append('<div class="ads-popup__container">\n        ' +
                '<div class="ads-popup__title">Вы не авторизованы!</div>\n        ' +
                '<p class="ads-popup__text">Чтобы просмотреть маршрут, пожалуйста  <a class="ads-popup__link" href="lk-enter.html">войдите</a> или <a class="ads-popup__link" href="lk-registration.html" >зарегистрируйтесь</a></p> \n</div>');
            $('#map').remove();
        }
    }

    async connect() {
        this.addPointLoading();
    }
}