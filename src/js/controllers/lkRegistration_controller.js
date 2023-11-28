/*
* для формы регистрации
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import Inputmask from "inputmask";
import serializer from 'form-serializer'
import { load } from 'recaptcha-v3'

export default class extends Controller {
    static targets = [ "password", "passwordadd"]

    captha

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


    conditions() {
        let regBtn =  $('.adding__dtn--lk');
        regBtn.attr('disabled', 'disabled');
        if ($('#conditions').is(':checked')) {
            regBtn.removeAttr('disabled');
        }
        else  {
            regBtn.attr('disabled', 'disabled');
         }
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
        })
        $("#info-password-add").on("keyup", function() {
            let value_input1 = $("#info-password").val();
            let value_input2 = $(this).val();
            if(value_input1 !== value_input2) {
                $(".pass-match").html("<div class=' alert alert-danger reqiest-alert'>Пароли не совпадают!</div>");
            } else {
                $(".pass-match").html("");
            }
        });
    }


    async  registration() {
        let form = $("#tsl-registration")[0];


        if (form.checkValidity()) {
           /* console.log(/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/gm.test(password));*/
            //if + else проверяем соответствие пароля параметрам
            if(this.passwordTarget.value.match(/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)) {

                //if + else проверяем совпадают ли пароли
                if (this.passwordTarget.value === this.passwordaddTarget.value) {
                    let json = $(form).serializeObject();
                    try {
                        let result = await api.CreateUser(json,this.captha);

                        $('#form-request-box').prepend(
                            '<div class="alert alert-success reqiest-alert text-center" role="alert">\n' +
                            '   Спасибо за регистрацию! Теперь Вы можете <a class="alert-link" href="lk-enter.html">авторизоваться</a> на сайте. \n' +
                            '</div>'
                        );
                        setTimeout(function() {
                                window.location.replace("lk-enter.html");
                            },
                            3000);

                    } catch (error) {
                        console.debug(error);
                        if (error.code === 13){
                            $('#form-request-box').prepend(
                                '<div class="alert alert-danger reqiest-alert" role="alert">\n' +
                                'Такой email уже зарегистрирован! <a class="alert-link" href="lk-enter.html">Авторизуйтесь</a> или <a class="alert-link" href="lk-resetpassword.html">воспользуйтесь сбросом пароля</a>.  \n' +
                                '</div>'
                            );
                        }
                        $('html, body').animate({
                            scrollTop: $(".main__baner-title").offset().top
                        }, 500);
                    }


                    $( "#tsl-registration, .form-adding__text" ).remove();
                } else {
                    $('#form-request-box').prepend(
                        '<div class="alert alert-danger reqiest-alert" role="alert">\n' +
                        'Пароли не совпадают! \n' +
                        '</div>'
                    );
                    $('html, body').animate({
                        scrollTop: $(".info-password").offset().top
                    }, 500);
                }
                //END if + else проверяем совпадают ли пароли
            } else {
                $('#form-request-box').prepend(
                    '<div class="alert alert-danger reqiest-alert" role="alert">\n' +
                    'Пароль должен быть только на латинице, не менее 8 символов, содержать минимум одну букву, одну цифру, одну заглавную букву \n' +
                    '</div>'
                );
                $('html, body').animate({
                    scrollTop: $(".alert-danger").offset().top
                }, 500);
            }
            //END if + else проверяем соответствие пароля параметрам


        } else {
            $('#form-request-box').prepend(
                ' <div class="alert alert-danger reqiest-alert" role="alert">\n' +
                'Пожалуйста, заполните все поля, отмеченные звездочкой (*)\n' +
                '</div>'
            );
            $('html, body').animate({
                scrollTop: $(".main__baner-title").offset().top
            }, 500);
        }


        form.classList.add('was-validated');
    }
  async  connect() {
        this.passCheck();
        this.conditions();

        //кнопка Зарегистрироваться реагирует на ENTER
      $(document).bind('keypress', function(e){
          if(e.which === 13) {
              $('#lk-reg').trigger('click');
          }
      });

      $('#info-phone-list').select2({
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
      $('#info-phone-list').on('select2:open', (event) => {
          document.querySelector('.select2-search__field').focus();
      })
      $('#info-phone-list').on('select2:select', (event) => {
          let selector = $('#info-phone');
          selector.val('');
          let data = event.params.data
          console.debug(data)
          selector.attr('placeholder',  data.mask.replace(/#/g, '_'));


          let im = new Inputmask(
              data.mask,
              {
                   placeholder: data.mask.replace(/#/g, '_')
              });
          im.mask(selector);

      });
      let option = { "mask": "+7(7##)###-##-##", "cc": "KZ", "name_en": "Kazakhstan", "desc_en": "", "name_ru": "Казахстан", "desc_ru": "" };
      let select = new Option(option.name_ru, option.mask,true, true) ;
      let item = $('#info-phone-list');
      item.append(select).trigger('change');
          item.trigger({
          type: 'select2:select',
          params: {
              data: option
          }
      });

      const recaptcha = await load('6LflwQMfAAAAAJ2yMqRI2cfXk0DJ3QZL-EBA03JK');
      const token = await recaptcha.execute('submit');
      this.captha = token;
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

