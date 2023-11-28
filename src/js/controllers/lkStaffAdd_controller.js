/*
* для формы регистрации сотрудников в ЛК
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import mask from 'jquery-mask-plugin'
import serializer from 'form-serializer'
import Inputmask from "inputmask";

export default class extends Controller {
    static targets = [ "password", "passwordadd"]

    showPass() {
        let showpass = '#info-password';
        if ($(showpass).attr('type') === 'password'){
            $(showpass).attr('type', 'text');
        } else {
            $(showpass).attr('type', 'password');
        }
        return false;
    }

    showPassAdd() {
        let showpassadd = '#info-password-add';
        if ($(showpassadd).attr('type') === 'password'){
            $(showpassadd).attr('type', 'text');
        } else {
            $(showpassadd).attr('type', 'password');
        }
        return false;
    }

    passCheck(){
        $('#info-password').keyup(function() {
            // set password letiable
            let pswd = $(this).val();
//validate the length
            if ( pswd.length < 8 ) {
                $('#length').removeClass('valid').addClass('invalid');
            } else {
                $('#length').removeClass('invalid').addClass('valid');
            }
//validate letter
            if ( pswd.match(/[A-z]/) ) {
                $('#letter').removeClass('invalid').addClass('valid');
            } else {
                $('#letter').removeClass('valid').addClass('invalid');
            }

//validate capital letter
            if ( pswd.match(/[A-Z]/) ) {
                $('#capital').removeClass('invalid').addClass('valid');
            } else {
                $('#capital').removeClass('valid').addClass('invalid');
            }

//validate number
            if ( pswd.match(/[0-9]/) ) {
                $('#number').removeClass('invalid').addClass('valid');
            } else {
                $('#number').removeClass('valid').addClass('invalid');
            }
        }).focus(function() {
            $('#info-password-check').show();
        }).blur(function() {
            $('#info-password-check').hide();
        });

        $("#info-password-add").on("keyup", function() {
            let value_input1 = $("#info-password").val();
            let value_input2 = $(this).val();
            if(value_input1 !== value_input2) {
                $(".pass-match").html("<div class=' alert alert-danger reqiest-alert'>Пароли не совпадают!</div>");
                $(".adding__dtn--lk").attr("disabled", "disabled");
            } else {
                $(".adding__dtn--lk").removeAttr("disabled");
                $(".pass-match").html("");
            }
        });
    }


    async  registration() {
        let form = $("#tsl-registration-employee")[0];
        if (form.checkValidity()) {

            if (this.passwordTarget.value === this.passwordaddTarget.value) {
                let json = $(form).serializeObject();

                try {
                    let result = await api.AddEmployee(json);

                    $('#form-request-box').prepend(
                        '<div class="alert alert-success reqiest-alert" role="alert">\n' +
                        'Сотрудник добавлен\n' +
                        '</div>'
                    );

                } catch (error) {
                    console.debug(error);
                    if (error.code === 13 || error.code === 5){
                        $('#form-request-box').prepend(
                            '<div class="alert alert-danger reqiest-alert" role="alert">\n' +
                            'Такой email уже зарегистрирован! \n' +
                            '</div>'
                        );
                    } else {
                        $('#form-request-box').prepend(
                            '<div class="alert alert-danger reqiest-alert" role="alert">' +
                            'Сотрудник не добавлен. Если у Вас нет компании, добавить сотрудника нельзя!' +
                            '</div>'
                        )
                    }


                }


                $( "#tsl-registration-employee, .form-adding__text" ).remove();
            } else {
                $('#form-request-box').prepend(
                    ' <div class="alert alert-danger reqiest-alert" role="alert">\n' +
                    '          Пароли не совпадают! \n' +
                    '        </div>'
                )
            }


        } else {
            $('#form-request-box').prepend(
                ' <div class="alert alert-danger reqiest-alert" role="alert">\n' +
                '            Пожалуйста, заполните все поля, отмеченные звездочкой (*)\n' +
                '        </div>'
            )
        }
        form.classList.add('was-validated');
    }
    connect() {
        this.passCheck();

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
    }
}

export const lkRegistrationtext = [

]

const lkRegistrationTemplate = (model) =>  {
    return `${model.reduce((html, card) => html + lkFormTemplate(card), '')}`
}

const lkFormTemplate = (cardModel) => {
    return `
       
`};

