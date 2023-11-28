/*
* для формы добавления объявления об продажа\аренда авто
*/

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import 'select2/dist/js/select2.min'
import 'select2/dist/css/select2.min.css'
import mask from 'jquery-mask-plugin'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'
import datetimepicker from 'jquery-datetimepicker'
import serializer from 'form-serializer'
import ymaps from 'ymaps'
import Inputmask from "inputmask";
import $this from "jquery-ui/external/jquery-1.10.0/jquery";


export default class extends Controller {
    /* счетчики для генерируемых  инпутов емайл, телефон  + фото*/
    addPhotoCounter = 0;
    addEmailCounter = 1;
    addTelCounter = 1;

    //для выгрузеи инфо
    myCheckBrand = 4;
    myCheckAutoType = 0;
    myImagesList;

    /* перегрузить страницу чтобы открыть форму еще раз */
    reloadpage(){
        location.reload();
    }

    /* считаем 15 дней от текущей даты */
    adv15days() {
        let days15 =  new Date(new Date().setDate(new Date().getDate() + 15));
        $('#adv-15days').text(days15.toLocaleDateString('ru-Ru'));
    }

    //вытаскиваем объявления юзера и подставляем значения в поля
    async editAvtoSale() {
        //вытаскиваем ID объявления из URL
        let advInfo = window.location.href;
        let advIndex = advInfo.slice(advInfo.indexOf('=') + 1);
        $('#editAvtoSaleForm').prepend('' +
            '<input type="hidden" value="' + advIndex +'" name="id">');
        try{
            let autoSale = await api.GetTransport(advIndex);
            this.myImagesList = autoSale.imagesList;
            this.myImagesList.forEach((image)=>{
                this.addPhoto(image)
            });


            /* тип транспорта радио */
            /*
            * 1. у нас три отдельных списка типов авто для каждого типа машин.
            * тип машин НЕ записывается, записывается ТОЛЬКО значение из соотвествующегт типу машины типу авто
            * то есть:
            * - надо вытащить все три списка
            * - последовательно их перебрать и найти сотвествующее значение в массиве
            * - в зависимости от типа списка где найдено значение ставить чекет на тип машины
            * type 0 = Автомобиль
            * type 7 = автобус
            * type 8 = спецтехника
            * */
            let typeTransportName = autoSale.transporttype;
            let found = false;
             // если автомобиль
            api.FindReference(0).then(res =>{
                res.referenceList.forEach(item =>{
                    if (item.name === typeTransportName){
                        $('#autoType-auto').prop('checked', true).trigger("change");
                        found = true;
                        $('#power').val(autoSale.powder);
                    }
                });

            });

            // если автобус
            if(!found) {
                api.FindReference(7).then(res =>{
                    res.referenceList.forEach(item =>{
                        if (item.name === typeTransportName){
                            $('#autoType-bus').prop('checked', true).trigger("change");
                            found = true;
                            $('#seats').val(autoSale.numberpassengers);
                        }
                    });
                });
            }


            // если спецтехника
            if (!found){
            api.FindReference(8).then(res =>{
                 res.referenceList.forEach(item =>{
                     if (item.name === typeTransportName){
                         $('#autoType-special').prop('checked', true).trigger("change");
                         $('#power').val(autoSale.powder);
                     }
                 });
            });
        }


            /* тип продажа - лизинг -  аренда */
            switch (autoSale.salestype) {
                case "Продажа":
                    $('#type-sale').prop('checked', true)
                    break

                case "Аренда":
                    $('#check-rent').prop('checked', true)
                    break

                case "Лизинг":
                    $('#check-leasing').prop('checked', true)
                    break
            }


            /* тип Наличие  */
            switch (autoSale.availability) {
                case "Под заказ":
                    $('#check-under-order').prop('checked', true)
                    break

                case "В наличии":
                    $('#check-availability').prop('checked', true)
                    break
            }

            /* тип Состояние  */
            switch (autoSale.condition) {
                case "Новый":
                    $('#check-new').prop('checked', true)
                    break

                case "Б\\У":
                    $('#check-used').prop('checked', true)
                    break

                case "Аварийный":
                    $('#check-emergency').prop('checked', true)
                    break
            }


            $('#model').val(autoSale.model);


            $('#engine-volume').val(autoSale.engine);
            $('#mileage').val(autoSale.mileage);
            $('#cost').val(autoSale.cost);


            $("#transmission-box >option").filter( function()
            {
                if ($(this).val() === autoSale.transmission)
                {
                    $(this).prop("selected", true);
                }
            });

            $("#fuel-type >option").filter( function()
            {
                if ($(this).val() === autoSale.fueltype)
                {
                    $(this).prop("selected", true);
                }
            });

            $("#currency >option").filter( function()
            {
                if ($(this).val() === autoSale.currency)
                {
                    $(this).prop("selected", true);
                }
            });

            $("#year-release >option").filter( function()
            {
                if ($(this).val() === autoSale.releaseyear)
                {
                    $(this).prop("selected", true);
                }
            });


            let $textarea = $('#text-counter');
            $textarea.val(autoSale.information);
            $('#counter').html(autoSale.information.length);


            if(autoSale.location !== undefined) {
                this.serviceCity();
                let city = await api.GetCity(autoSale.location.id);
                let option = new Option(city.name, city.id, true, true);
                option.name = city.name ;
                option.region = {
                    name:  city.region.name
                };
                option.country = {
                    name:  city.country.name
                };
                $('#addressCity').append(option).trigger('change');
                $('#addressStreet').val(autoSale.location.address);
            } else {
                this.serviceCity();
            }

            let myEmails = [];
            let myEmailCounter = 1;
            myEmails = autoSale.emailsList;
            myEmails.shift();
            myEmails.forEach(function(item) {
                myEmailCounter++;
                $('#new-email-box').append('' +
                    '<div class="addpoint-loadingbox__item">' +
                    '<input type="email" id="contact-email' + myEmailCounter + '" class="form-control mb-4" value="' + item +'" name="email[]" placeholder="Дополнительный email"  required="">' +
                    '<span class="delete-item delete-item--lg" title="Удалить дополнительный email" aria-label="Удалить дополнительный email" data-action="click->lk-avtosale-edit#deleteItem"></span>' +
                    '</div>');
            });



            let myPhones = [];
            let myPhonesCounter = 1;
            myPhones = autoSale.phonesList;            
            myPhones.shift();
            myPhones.forEach(function (item){
                 $('#new-tel-box').append('' +
                     '<div class="addpoint-loadingbox__item">' +
                     '<input type="tel" id="info-phone-'+ myPhonesCounter + '" class="form-control mb-4" value="' + item +'" name="phone[]" placeholder="Дополнительный телефон"  required="">' +
                     '<span class="delete-item delete-item--lg" title="Удалить дополнительный телефон" aria-label="Удалить дополнительный телефон" data-action="click->lk-avtosale-edit#deleteItem"></span>' +
                     '</div>')
             })

        } catch (error) {
            console.debug(error)
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

                if (!state.id) {
                    return state.text;
                }

                /* return `${state.name} ${state.region.name} ${state.country.name}`*/
                let name = state.name!==undefined?state.name:state.element.name;
                let region = state.region!==undefined?state.region.name:state.element.region.name;
                let country = state.country!==undefined?state.country.name:state.element.country.name;
                return `${name} ${region} ${country}`
            },
            templateSelection: function (state) {
                if (!state.id) {
                    return state.text;
                }

                let name = state.name!==undefined?state.name:state.element.name;
                let region = state.region!==undefined?state.region.name:state.element.region.name;
                let country = state.country!==undefined?state.country.name:state.element.country.name;
                return `${name} ${region} ${country}`
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

    /* генерация мультиселекта для города */
    serviceCity() {
        this.loadCounter++;
        $('.serviceAddressCity').append($('' +
            '<label class="form-label" for="addressCity"><span class="form-adding__text_red">*</span> Город</label>' +
            '<select class="form-control cityLoadAutocompete"  id="addressCity" name="addressCity" required="">\n' +
            '<option></option>' +
            '</select>' +
            ' <div class="invalid-feedback">\n' +
            '   Пожалуйста, заполните поле\n' +
            ' </div>\n' +
            '<div id="info-city-box"></div>' +
            '</div>'));
        this.cityListAutocompete('#addressCity');
    }

    /* Год выпуска */
    yearRelease(){
        let startYear = 1960;
        let currentTime = new Date();
        let currentYear = currentTime.getFullYear();
        let selectYear = $('#year-release');
        for (let i = startYear; i <= currentYear; i++) {
            selectYear.append('<option value="'+ i +'">'+ i +'</option>')
        }
        /*       selectYear.select2({
                   placeholder: 'Выберите год выпуска'
               });*/
    }

    /* проверка типов авто */
    checkType(){
        $('input:radio[name="autoType"]').change(function(){
            if ($(this).val() === 'Автомобиль') {
                this.myCheckBrand = 4;
                this.CheckAutoType = 0;
                $('#seatsBox').remove();
                $('#powerBox').remove();
            } else if($(this).val() === 'Автобус') {
                this.myCheckBrand = 5;
                this.CheckAutoType = 7;
                $('<div class="col-sm-12 col-md-6 mb-4" id="seatsBox">\n' +
                    '                <label class="form-label" for="seats">Количество мест</label>\n' +
                    '                <div id="seats-box">\n' +
                    '                  <input type="number" name="numberpassengers" id="seats" class="form-control">\n' +
                    '                  <div class="invalid-feedback"> Пожалуйста, заполните поле </div>\n' +
                    '                </div>\n' +
                    '              </div>').insertAfter('#modelBox');
                $('#powerBox').remove();
            }
            else {
                this.myCheckBrand = 6;
                this.CheckAutoType = 8;
                $('<div class="col-sm-12 col-md-6 mb-4" id="powerBox">\n' +
                    '                <label class="form-label" for="power">Мощность</label>\n' +
                    '                <div id="power-box">\n' +
                    '                  <input type="number" name="powder" id="power" class="form-control">\n' +
                    '                  <div class="invalid-feedback"> Пожалуйста, заполните поле </div>\n' +
                    '                </div>\n' +
                    '              </div>').insertAfter('#modelBox');

                $('#seatsBox').remove();
            }


            /* бренд  авто\автобус\спецтехника */
            api.FindReference(this.myCheckBrand).then(res =>{
                $('#brand option').remove();

                res.referenceList.forEach(item =>{
                    $('#brand').append('<option value="' + item.id + '">' + item.name + '</option>').select2({
                        placeholder: 'Выберите марку',
                        dropdownParent: $('#info-brand-list'),
                    });
                });
                $('#brand').on('select2:open', (event) => {
                    document.querySelector('#info-brand-list .select2-search__field').focus();
                });
            });

            /* тип транспорта */
            api.FindReference(this.CheckAutoType).then(res =>{
                $('#transport-type option').remove();
                res.referenceList.forEach(item =>{
                    $('#transport-type').append('<option value="' + item.id + '">' + item.name + '</option>').select2({
                        placeholder: 'Выберите тип транспорта',
                        dropdownParent: $('#info-transport-list'),
                    });
                });
                $('#transport-type').on('select2:open', (event) => {
                    document.querySelector('#info-transport-list .select2-search__field').focus();
                });
            })


        });


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


    /* генерация полей для доп емайла */
    addEmail() {
        this.addEmailCounter++;
        $('#new-email-box').append($('' +
            '<div class="addpoint-loadingbox__item">' +
            '<input type="email" id="contact-email' + this.addEmailCounter + '" class="form-control mb-4" name="email[]" placeholder="Дополнительный email"  required="">' +
            '<span class="delete-item delete-item--lg" title="Удалить дополнительный email" aria-label="Удалить дополнительный email" data-action="click->lk-avtosale-edit#deleteItem"></span>' +
            '</div>' +
            ''));
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

    /* генерация полей для доп телефона */
    addTel() {
        this.addTelCounter++;
        $('#new-tel-box').append($('' +
            '' +
            '<div class="row addpoint-loadingbox__item phone-code-box phone-code-box--addtel mb-4">' +
            '                      <div class="phone-code-state">\n' +
            '                        <select id="info-phone-list-'+ this.addTelCounter + '"></select>\n' +
            '                        <div id="info-phone-box" class="info-phone-box-data"></div>\n' +
            '                      </div>\n' +
            '                      <div class="phone-code-num">\n' +
            '                        <input type="tel" class="form-control phone-num" id="info-phone-'+ this.addTelCounter + '" name="phone[]" required="">\n' +
            '                        <div class="invalid-feedback">\n' +
            '                          Пожалуйста, заполните поле\n' +
            '                        </div>\n' +
            '                      </div>\n' +
            '<span class="delete-item delete-item--lg" title="Удалить дополнительный телефон" aria-label="Удалить дополнительный телефон" data-action="click->lk-avtosale-edit#deleteItem"></span>' +
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
        selectCountry.on('select2:open', (event) => {
            document.querySelector('.select2-search__field').focus();
        })
        selectCountry.on('select2:select', (event) => {
            let selector = $(event.target).parent().next().find('input')[0];
            $(selector).val('');
            let data = event.params.data

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
    addPhoto(src = "") {
        let imgPath = 'https://tsl.kz/uploads/image/';
        if (typeof src == 'object'){
            src = "";
        }
        if(src === ""){
            imgPath = ""
        }
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
            '      <input type="hidden" name="imagesList[]" id="image' + this.addPhotoCounter + '" value="' + src + '">\n' +
            '      <img src="'+ imgPath + src + '" width="200" height="132" alt="" id="thumb' + this.addPhotoCounter + '">\n' +
            '   </span>\n' +
            '   <span class="delete-link" title="Удалить" data-action="click->lk-avtosale-edit#deletePhoto">Удалить</span>\n' +
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


    /* валидация, отправка данных из формы, сворачивание формы после успешной отправки данных */
    async addAdvert() {
        let form = $("#editAvtoSaleForm")[0];
        if (form.checkValidity()) {
            let json = $(form).serializeObject();


            try {
                $('.adding__dtn').prop("disabled",true).html('<span class="loader">Создаем объявление</span>');
                let result = await api.UpdateTransport(json);

            } catch (error) {
                console.debug(error)
            }
            $('html, body').animate({
                scrollTop: $(".main__baner-title").offset().top
            }, 500);

            let $itempubl = $('<div class="alert alert-success reqiest-alert" role="alert">\n' +
                '   Ваше объявление обновлено\n' +
                '</div>'
            );
            $itempubl.appendTo($('#form-request-box')).delay(10000).slideUp(200, function(){
                $itempubl.remove();
            });

            $('#addingAvtoSaleForm, .form-adding__text').slideUp('slow', function(){
                $(this).remove();
            });

        } else {
            $('html, body').animate({
                scrollTop: $("#editAvtoSaleForm").offset().top
            }, 500);
            let $item = $(' <div class="alert alert-danger reqiest-alert" role="alert">\n' +
                '            Пожалуйста, заполните все поля, отмеченные звездочкой (*)\n' +
                '        </div>'
            );
            $item.appendTo($('#editAvtoSaleForm')).slideUp(200, function(){
                $item.remove();
            });
        }
        form.classList.add('was-validated');
    }

    async connect() {

        this.yearRelease();
        this.editAvtoSale();
        this.counter();
        this.checkType();
        this.adv15days();
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
                    '              </div>');
            }

        } catch (error) {
            console.debug(error)
        }

        /* тип  автобус */
        api.FindReference(7).then(res =>{
            res.referenceList.forEach(item =>{
                $('#bus-type').append('<option value="' + item.id + '">' + item.name + '</option>').select2({
                    placeholder: 'Выберите тип'
                });
            })
        });
        $('#map').fadeOut('500');

    }
}