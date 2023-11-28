/*
* ЛК - данные компании
*/

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import 'select2/dist/js/select2.min'
import 'select2/dist/css/select2.min.css'
import datetimepicker from 'jquery-datetimepicker'
import serializer from 'form-serializer'
import ymaps from "ymaps";
import Inputmask from "inputmask";


export default class extends Controller {
    /* счетчики для инпутов емайл, телефон + фото*/
    addPhotoCounter = 0

    /* перегрузить страницу чтобы открыть форму еще раз */
    reloadpage(){
        location.reload();
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
            '<label class="form-label" for="addressCity">Город</label>' +
            '<select class="form-control cityLoadAutocompete"  id="addressCity" name="addressCity" required="">\n' +
            '<option></option>' +
            '</select>' +
            ' <div class="invalid-feedback">\n' +
            '   Пожалуйста, заполните поле\n' +
            ' </div>\n' +
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
            '   <span class="delete-link" title="Удалить" data-action="click->lkCompany#deletePhoto">Удалить</span>\n' +
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
    async companySave() {
        let form = $("#profileCompanyForm")[0];
        if (form.checkValidity()) {
            let json = $(form).serializeObject();
            if(json.imagesList !== undefined && json.imagesList[0] !== "") {
                try {

                    let result = await api.CreateCompany(json);

                    if(result.success === true) {
                        $('#profileCompanyForm').prepend('' +
                            '<div class="alert alert-success reqiest-alert" role="alert">' +
                            'Данные компании сохранены!' +
                            '</div>');
                        setTimeout(function() {
                                window.location.reload();
                            },
                            1000);

                        $('html, body').animate({
                            scrollTop: $(".main__baner-title").offset().top
                        }, 500);
                    }


                } catch (error) {
                    console.debug(error)
                }
            }

        } else {
          
        }
        form.classList.add('was-validated');
    }

    async companyDelete() {
        let form = $("#profileDelete")[0];
        let json = $(form).serializeObject();
        try {
           let result = await api.DeleteCompany(json.id);

            if (result.success) {
                $('#profileCompanyForm').find('input').val('');
                $('.img-box').remove();
                setTimeout(function() {
                        window.location.reload();
                    },
                    1000);
             }

        } catch (error) {
            console.debug(error)
        }
    }

    companyNoDelete() {
        $("#popup-delete, #popup-ads-box").css({ display: "none" });

    }

    connect() {
        this.serviceCity();
        this.counter();
        api.GetCompanyByUser(global.user.email).then(
            result => {
                $('#default-tel-box').html('' +
                    '<input type="tel" name="phone" id="profileCompanyPhone" class="form-control" required="">\n' +
                    '<div class="invalid-feedback">\n' +
                    'Пожалуйста, заполните поле\n' +
                    '</div>' +
                    '');

                $('#default-bin-box').html('' +
                    '<input type="num" name="bin" id="profileCompanyBin" class="form-control" required="">\n' +
                    '<div class="invalid-feedback">\n' +
                    'Пожалуйста, заполните поле\n' +
                    '</div>' +
                    '');

                $('#profileCompanyName').val(result.name);
                $('#profileCompanyActivity').val(result.activitytype);
                $('#profileCompanyPhone').val(result.phone);
                $('#profileCompanyEmail').val(result.email);
                $('#profileCompanyBin').val(result.bin);
                $('#profileCompanyId').val(result.id);
                result.imagesList.forEach((image)=>{
                    this.addPhoto(image)
                });
                $('#profileCompanyForm').append('<input type="hidden" name="id" value="'+ result.id +'">');

            },
            error => {
                console.debug(error, 'no company');

                /* маска + селект стран */
                $('#default-tel-box').append($('' +
                    '' +
                    '<div class="row addpoint-loadingbox__item phone-code-box phone-code-box--addtel mb-4">' +
                    '                      <div class="phone-code-state">\n' +
                    '                        <select id="info-phone-list"></select>\n' +
                    '                        <div id="info-phone-box" class="info-phone-box-data"></div>\n' +
                    '                      </div>\n' +
                    '                      <div class="phone-code-num">\n' +
                    '                      <input type="tel" name="phone" id="profileCompanyPhone" class="form-control" required="">\n' +
                    '                        <div class="invalid-feedback">\n' +
                    '                          Пожалуйста, заполните поле\n' +
                    '                        </div>\n' +
                    '                      </div>\n' +
                    '</div>'));
                /* маска и список стран */
                let selectCountry = $('#info-phone-list');
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
                /* END маска + селект стран */


                /* маска + селект БИН */
                $('#default-bin-box').append($('' +
                    '' +
                    '<div class="row addpoint-loadingbox__item phone-code-box phone-code-box--addtel mb-4">' +
                    '                      <div class="phone-code-state">\n' +
                    '                        <select id="info-bin-list"></select>\n' +
                    '                        <div id="info-bin-box" class="info-phone-box-data"></div>\n' +
                    '                      </div>\n' +
                    '                      <div class="phone-code-num">\n' +
                    '                      <input type="num" name="bin" id="profileCompanyBin" class="form-control" required="">\n' +
                    '                        <div class="invalid-feedback">\n' +
                    '                          Пожалуйста, заполните поле\n' +
                    '                        </div>\n' +
                    '                      </div>\n' +
                    '</div>'));
                /* маска и список стран */
                let selectBin = $('#info-bin-list');
                selectBin.select2({
                    ajax: {
                        url: 'data/bin-codes.json',
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
                    dropdownParent: $('#info-bin-box')
                });
                selectBin.on('select2:open', (event) => {
                    document.querySelector('.select2-search__field').focus();
                })
                selectBin.on('select2:select', (event) => {
                    let selector = $(event.target).parent().next().find('input')[0];
                    $(selector).val('');
                    let data = event.params.data
                    console.debug(data)
                    $(selector).attr('placeholder',  data.mask);
                    let im = new Inputmask(
                        data.mask,
                        {
                            placeholder: data.mask
                        });
                    im.mask($(selector));
                });
                let optionForBin = { "mask": "############", "cc": "KZ", "name_en": "Kazakhstan", "desc_en": "", "name_ru": "Казахстан БИН/ИИН", "desc_ru": "" };
                let selectForBin = new Option(optionForBin.name_ru, optionForBin.mask,true, true) ;

                selectBin.append(selectForBin).trigger('change');
                selectBin.trigger({
                    type: 'select2:select',
                    params: {
                        data: optionForBin
                    }
                });


                $('#profileDelete').remove();
            }
        );

    }
}