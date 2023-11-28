/*
* для формы добавления объявления ДОБАВЛЕНИЕ СЕРВИСА АВТОТРАНСПОРТА
*/

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import 'select2/dist/js/select2.min'
import 'select2/dist/css/select2.min.css'
import datetimepicker from 'jquery-datetimepicker'
import serializer from 'form-serializer'
import ymaps from 'ymaps'
import Inputmask from "inputmask";
import {isDisabled} from "bootstrap/js/src/util";

export default class extends Controller {
    /* счетчики для генерируемых  инпутов емайл, телефон  + фото*/
    addPhotoCounter = 0
    addEmailCounter = 1;
    addTelCounter = 1;

    /* перегрузить страницу чтобы открыть форму еще раз */
    reloadpage(){
        location.reload();
    }

    /* считаем 15 дней от текущей даты */
    adv15days() {
        let days15 =  new Date(new Date().setDate(new Date().getDate() + 15));
        $('#adv-15days').text(days15.toLocaleDateString('ru-Ru'));
    }

    addAccord() {
        if ($('#add-service-accord').is(':checked')){
            $('#costTransportationSum,#costTransportationCurrency').attr('disabled', 'disabled').removeAttr('required');
        } else {
            $('#costTransportationSum,#costTransportationCurrency').attr('required', 'required').removeAttr('disabled');
        }
    }


    /* метод - массив города + вызов мультиселекта*/
    cityListAutocompete(){
        $('#addressCity').select2({
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
                    let modifiedData = $.extend({}, data.citiesList, true);
                    return modifiedData.citiesList;
                }

                /* data = await api.ListCity(params.term);
                 console.debug(data.citiesList);*/

            },
            placeholder: "Выберите",
            allowClear: true,
            dropdownParent: $('#info-city-box')
        });
        $('#addressCity').on('select2:open', (event) => {
            document.querySelector('#info-city-box .select2-search__field').focus();
        });
    }

    /* генерация мультиселекта для города */
    serviceCity() {
        this.loadCounter++;
        $('.serviceAddressCity').append($('' +
            '<label class="form-label" for="addressCity"><span class="form-adding__text_red">*</span> Город</label>' +
            '<select class="form-control cityLoadAutocompete"  id="addressCity" name="addressCity[]" required="">\n' +
            '<option></option>' +
            '</select>' +
            ' <div class="invalid-feedback">\n' +
            '   Пожалуйста, заполните поле\n' +
            ' </div>\n' +
            '<div id="info-city-box"></div>' +
            '</div>'));
        this.cityListAutocompete('#addressCity');

    }

    /* счетчик знаков  */
    counter(){
        let $textarea = '#text-counter';
        let $counter = '#counter';

        $($textarea).on('blur, keyup', function() {
            let $max = 1000;
            let $val = $(this).val();
            $(this).attr('maxlength', $max);
            if( $val.length <= 0 ) {
                $($counter).html(0);
            } else {
                if( $max < parseInt( $val.length ) ) {
                    $this.val( $val.substring(0, $max) );
                }
                $($counter).html( $(this).val().length );
            }
        });
    }

    /* отменяем показ емайла в объявлении */
    emailClear(){
        if ($('#default-email-clear').is(':checked')){
            $('#default-email').val("").prop("disabled", true).prop("required", false);
            $('#default-email-box').addClass('disabled-control__box');
            $('#labelAddEmail').hide();
            $('#emailClearStar').hide()
            $('.add-checkboxmail-box .addpoint-loadingbox__item').remove();
        } else {
            $('#default-email').val(global.user.email).prop("disabled", false).prop("required", true);
            $('#default-email-box').removeClass('disabled-control__box');
            $('#labelAddEmail').show();
            $('#emailClearStar').show()
        }
    }

    /* генерация полей для доп емайла */
    addEmail() {
        this.addEmailCounter++;
        $('.add-checkboxmail-box').append($('' +
            '<div class="addpoint-loadingbox__item">' +
            '<input type="email" id="contact-email' + this.addEmailCounter + '" class="form-control mb-4" name="email[]" placeholder="Дополнительный email"  required="">' +
            '<span class="delete-item delete-item--lg" title="Удалить дополнительный email" aria-label="Удалить дополнительный email" data-action="click->addingService#deleteItem"></span>' +
            '</div>' +
            ''));
    }

    /* генерация полей для доп телефона */
    addTel() {
        this.addTelCounter++;
        $('.add-tel-box').append($('' +
            '' +
            '<div class="row addpoint-loadingbox__item phone-code-box phone-code-box--addtel mb-4">' +
            '                      <div class="phone-code-state">\n' +
            '                        <select id="info-phone-list-'+ this.addTelCounter + '"></select>\n' +
            '                        <div id="info-phone-box" class="info-phone-box-data"></div>\n' +
            '                      </div>\n' +
            '                      <div class="phone-code-num">\n' +
            '                        <input type="tel" class="form-control phone-num" id="info-phone-'+ this.addTelCounter + '" name="contactTel[]" required="">\n' +
            '                        <div class="invalid-feedback">\n' +
            '                          Пожалуйста, заполните поле\n' +
            '                        </div>\n' +
            '                      </div>\n' +
            '<span class="delete-item delete-item--lg" title="Удалить дополнительный телефон" aria-label="Удалить дополнительный телефон" data-action="click->addingService#deleteItem"></span>' +
            '</div>'));

        /* маска и список стран */
        let selectCountry = $('#info-phone-list-'+ this.addTelCounter + '');
        selectCountry.select2({
            ajax: {
                url: 'data/phone-codes.json',
                processResults: (data, params) => {
                    let res = data
                    res = $.map(res, (item) => {
                        item.id = item.mask
                        item.text = item.name_ru || item.name_en
                        return item
                    })
                    if(params.term != undefined && params.term != '') {
                        res = res.filter((item) => {
                            return item.text.toLowerCase().indexOf(params.term.toLowerCase()) > -1
                        })
                    }
                    return {results: res}
                }
            },
            minimumInputLenght: 1,
            templateResult: (state)=>{
                if (!state.id) return state.text; // optgroup
                if (!state.cc) state.cc = 'KZ'; // optgroup

                return $("<span><img class='flag' src='img/flags/" + state.cc.toLowerCase() + ".svg'/>" + state.text + ": "+ state.mask + "</span>");

            },
            templateSelection: (state)=>{
                if (!state.id) return state.text; // optgroup
                if (!state.cc) state.cc = 'KZ'; // optgroup
                return $("<span><img class='flag' src='img/flags/" + state.cc.toLowerCase() + ".svg'/></span>");
            },
            dropdownParent: $('#info-phone-box')
        });

        let findInput = '#' + selectCountry[0].id;
        $(findInput).on('select2:open', (event) => {
            document.querySelector('#info-phone-box .select2-search__field').focus();
        });
        selectCountry.on('select2:select', (event) => {
            let selector = $(event.target).parent().next().find('input')[0];
            $(selector).val('');
            let data = event.params.data
            console.debug(data)
            $(selector).attr('placeholder',  data.mask.replace(/#/g, '_'));
            let im = new Inputmask(
                data.mask,
                {
                    placeholder: data.mask.replace(/#/g, '_')
                });
            im.mask($(selector));
        });
        let option = { "mask": "+7(7##)###-##-##", "cc": "KZ", "name_en": "Kazakhstan", "desc_en": "", "name_ru": "Казахстан", "desc_ru": "" };
        let select = new Option(option.name_ru, option.mask,true, true) ;

        selectCountry.append(select).trigger('change');
        selectCountry.trigger({
            type: 'select2:select',
            params: {
                data: option
            }
        });
    }

    /* удаление генерируемых блоков - города, доп емайл, доп телефон */
    deleteItem() {
        $('html').on('click','.delete-item', function () {
            $(this).parent().remove();
        });
    }

    /* генерация блоков под картинки с загрузкой */
    addPhoto() {
        let photoNumber = $('#add-photo-list .img-box').length;
        if (photoNumber >= 10){
            $('#addingImageLable').addClass('disabled');
            return;
        }

        this.addPhotoCounter++;
        $('#add-photo-list').append(
            '<div class="img-box">\n' +
            '<div class="file-name file-name__demo">Фото ' + this.addPhotoCounter + '</div>' +
            '  <span class="img-box-item" data-action="click->imgManager#open" data-inputid="#image' + this.addPhotoCounter + '" data-thumbid="#thumb' + this.addPhotoCounter + '">\n' +
            '      <input type="hidden" name="imagesList[]" id="image' + this.addPhotoCounter + '">\n' +
            '      <img src="" width="200" height="132" alt="" id="thumb' + this.addPhotoCounter + '">\n' +
            '   </span>\n' +
            '   <span class="delete-link" title="Удалить" data-action="click->addingService#deletePhoto">Удалить</span>\n' +
            '</div>');

        $("#counterPhoto").text(photoNumber +1);
    }

    /* удаление блоков под картинки с загрузкой */
    deletePhoto() {
        $('html').on('click','.delete-link', function () {
            $(this).parent().remove();
            let photoNumber = $('#add-photo-list .img-box').length;
            $("#counterPhoto").text(photoNumber);
            $('#addingImageLable').removeClass('disabled');
        });
    }

    /* карта яндекс */
    async mapAddress() {
        const maps = await ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=582e9bd2-33d6-490f-981f-5847a69ea993&lang=ru_RU');
        let currentAddress = $('#addressCity').select2('data')[0];
        let addressString = currentAddress.country.name + ', ' + currentAddress.name + ', ' + $('#addressStreet').val();
        console.debug(addressString);
        let result = await maps.geocode(addressString);
        /* let firstGeoObject = result.geoObjects.get(0);*/
        let coords = result.geoObjects.get(0).geometry.getCoordinates();
        let placemark = new maps.Placemark(coords);
        $('#map').html('').fadeIn('500');
        const myMap = new maps.Map('map',{
            center:coords,
            zoom:15,
        });
        placemark.options.set('preset', 'islands#darkBlueDotIconWithCaption');
        placemark.properties.set('iconCaption', addressString);
        placemark.properties.set('balloonContent', addressString);
        myMap.geoObjects.add(placemark);
        console.debug(coords);
        $('#address-latitude').val(coords[0]);
        $('#address-longitude').val(coords[1]);

        // Слушаем клик на карте.
        myMap.events.add('click', function (e) {
            let coords = e.get('coords');

            // Если метка уже создана – просто передвигаем ее.
            if (placemark) {
                placemark.geometry.setCoordinates(coords);
            }
            getAddress(coords);


        });

        // Определяем адрес по координатам (обратное геокодирование).
        function getAddress(coords) {
            placemark.properties.set('iconCaption', 'поиск...');
            maps.geocode(coords).then(function (res) {
                let firstGeoObjectMap = res.geoObjects.get(0);
                console.debug(firstGeoObjectMap.getThoroughfare());
                placemark.properties
                    .set({
                        // Формируем строку с данными об объекте.
                        iconCaption: [
                            // Название населенного пункта или вышестоящее административно-территориальное образование.
                            firstGeoObjectMap.getLocalities().length ? firstGeoObjectMap.getLocalities() : firstGeoObjectMap.getAdministrativeAreas(),
                            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                            firstGeoObjectMap.getThoroughfare() || firstGeoObjectMap.getPremiseNumber()
                        ].filter(Boolean).join(', '),
                        // В качестве контента балуна задаем строку с адресом объекта.
                        balloonContent: firstGeoObjectMap.getAddressLine()
                    });

                $('#addressStreet').val([ firstGeoObjectMap.getThoroughfare(), firstGeoObjectMap.getPremiseNumber()].join(', '));
                $('#address-latitude').val(coords[0]);
                $('#address-longitude').val(coords[1]);

                console.debug(firstGeoObjectMap.getLocalities()[0]);

                /*
                 $("#addressCity").val('2000').trigger("change");
                ---
                *    api.ListCity(firstGeoObjectMap.getLocalities()[0]).then(function (data)                {
                                     console.debug(data.citiesList[0].id);
                                     $("#addressCity").select2().val(2000).trigger("change");
                                 })
                * */
            });


        }
    }

    /* валидация, отправка данных из формы, сворачивание формы после успешной отправки данных */
    async addAdvert() {
        let form = $("#addingServiceForm")[0];
        if (form.checkValidity()) {
            let json = $(form).serializeObject();
            if(json.lon === "" || json.lat === "") {
                let city = await api.GetCity(json.addressCity);
                const maps = await ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=582e9bd2-33d6-490f-981f-5847a69ea993&lang=ru_RU');
                let result = await maps.geocode(city.country + ', ' + city.name + ', ' + json.address);
                let coords = result.geoObjects.get(0).geometry.getCoordinates();
                json.lat = coords[0];
                json.lon = coords[1];
            }

            try {
                $('.adding__dtn').prop("disabled",true).html('<span class="loader">Создаем объявление</span>');
                /* await new Promise(r => setTimeout(r, 20000));*/
                let result = await api.CreateServiceStation(json);


                $('html, body').animate({
                    scrollTop: $(".main__baner-title").offset().top
                }, 500);

                let $itempubl = $('<div class="alert alert-success reqiest-alert" role="alert">\n' +
                    '   Ваше объявление опубликовано\n' +
                    '</div>'
                );
                $itempubl.appendTo($('#form-request-box')).delay(10000).slideUp(200, function(){
                    $itempubl.remove();
                });

                $('#addingServiceForm, .form-adding__text').slideUp('slow', function(){
                    $(this).remove();
                });
                $('.container__adding-avto').prepend(
                    '<label class="col-sm-12 col-md-6 mb-4 addpoint-plus">\n' +
                    '              <input class="adding-form__btn" id="form-adding__addadvert" type="button" value="+" title="Добавить еще объявление" data-action="click->addingService#reloadpage">\n' +
                    '              <span class="form-adding__addpointlabel">Добавить еще объявление</span>\n' +
                    '            </label>' +
                    ''
                );

            } catch (error) {
                console.debug(error);
            }


        } else {
            $('html, body').animate({
                scrollTop: $("#form-request-box").offset().top
            }, 500);
            let $item = $(' <div class="alert alert-danger reqiest-alert" role="alert">\n' +
                '            Пожалуйста, заполните все поля, отмеченные звездочкой (*)\n' +
                '        </div>'
            );
            $item.appendTo($('#form-request-box')).delay(10000).slideUp(200, function(){
                $item.remove();
            });
        }
        form.classList.add('was-validated');
    }

    async connect() {

/*        if(global.user === null) {
            location.href = 'lk-enter.html';
        }*/



        this.serviceCity();
        this.counter();
        this.adv15days();

        /* Категория теги */
        api.FindReference(3).then(res =>{
            res.referenceList.forEach(item =>{
                $('#service').append('<option value="' + item.id + '">' + item.name + '</option>').select2({
                    placeholder: 'Выберите одну или несколько категорий'
                });
            })
        })

        $('#default-name').text(global.user.name);
        $('#default-email').val(global.user.email);
        $('#default-tel').val(global.user.phone);

        if(global.user.role === 'admin'){
            $('#default-email-box').html('' +
                '<input type="email" id="default-email" class="form-control mb-4" name="email[]" value="'+ global.user.email + '" required="">');
            $('#default-tel-box').html('' +
                ' <input type="tel" id="default-tel" class="form-control  mb-4" value="'+ global.user.phone + '" name="phone[]"  required="">\n');

        } else {
            $('#default-email-box').html('' +
                '<div class="disabled-control__box"><input type="email" id="default-email" class="form-control disabled-control mb-4" name="email[]" value="'+ global.user.email + '" readonly required=""></div>');

            $('#default-tel-box').html('' +
                '<div class="disabled-control__box">\n' +
                ' <input type="tel" id="default-tel" class="form-control disabled-control mb-4" value="'+ global.user.phone + '" name="phone[]" readonly required="">\n' +
                '</div>');
        }

        try {
            let company = await api.GetCompanyByUser(global.user.email);
            if (company !== undefined) {
                $('#company-name').html('' +
                    '<div class="col-sm-12 col-md-4">\n' +
                    '                Компании:\n' +
                    '              </div><div class="col-sm-12 col-md-8">\n' +
                    '                <strong>'
                    + company.name + ' (БИН: ' + company.bin + ')</strong>\n' +
                    '              </div>');/*
                $('#default-email').val(company.email);
                $('#default-tel').val(company.phone);
                $('#default-name').text(global.user.name);*/
            }


        } catch (error) {
            console.debug(error)
        }


    }

}