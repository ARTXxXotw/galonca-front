/*
* для формы отправления на почту ссылки на восстановление пароля
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import mask from 'jquery-mask-plugin'
import serializer from 'form-serializer'
import { load } from 'recaptcha-v3'

export default class extends Controller {

    captha

    showPass() {
        let showpass = '#info-password'
        if ($(showpass).attr('type') == 'password'){
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
                $(".pass-match").html("<div class='alert alert-danger reqiest-alert'>Пароли не совпадают!</div>");
            } else {
                $(".pass-match").html("");
            }
        });
    }

    /* форма поменять пароль */
    async passwordNew() {
        let form = $("#forgetChangePassword")[0];
        if (form.checkValidity()) {
            let json = $(form).serializeObject();

            try {
                let result = await api.ChangePass(json, false);

                if (result.success) {
                    $('#forgetChangePassword').prepend(
                        '<div class="alert alert-success reqiest-alert" role="alert">\n' +
                        '   Ваши данные обновлены\n' +
                        '</div>'
                    );
                } else {
                    if (result.error === 'New passwords not match') {
                        $('#forgetChangePassword').prepend(
                            '<div class="alert alert-danger reqiest-alert" role="alert">\n' +
                            'Пароли не совпадают\n' +
                            '</div>'
                        );
                    }
                    else {
                        $('#forgetChangePassword').prepend(
                            '<div class="alert alert-danger reqiest-alert" role="alert">\n' +
                            'Старый пароль неверен. Если вы его не помните, воспользуйтесь формой <a href="lk-resetpassword.html">восстановления пароля</a>. \n' +
                            '</div>'
                        );
                    }
                }


            } catch(error) {
                console.debug(error);
            }
        } else {
            $('#forgetChangePassword').prepend(
                ' <div class="alert alert-danger reqiest-alert" role="alert">\n' +
                '            Пожалуйста, заполните все поля, отмеченные звездочкой (*)\n' +
                '        </div>'
            )
        }
        form.classList.add('was-validated');
    }
    

    newPassword(userId) {
        $('#new-pass-box').append('' +
            ' <form class="form-adding lk-profile__form needs-validation" id="forgetChangePassword" novalidate>' +
                '<fieldset class="row mb-3">' +
                    '<p>Пароль должен быть: не менее 8 символов, на латинице, содержать минимум одну цифру, одну заглавную букву. </p>' +
            '<label for="info-password" class="col-sm-12 col-form-label">* Новый пароль</label>' +
            '<div class="col-sm-12 form-adding-pass">\n' +
            '                      <input type="password" class="form-control showpass" id="info-password" placeholder="Ваш пароль"  autocomplete="false" value="" name="lk_password" required="" data-lkResetPassword-target="password">\n' +
            '                      <div class="invalid-feedback">\n' +
            '                        Пожалуйста, заполните поле\n' +
            '                      </div>\n' +
            '                      <span class="password-control password-control--reg" data-action="click->lkResetPassword#showPass"></span>\n' +
            '\n' +
            '                        <ul class="info-password-check" id="info-password-check">\n' +
            '                          <li id="letter">Минимум <strong>одна буква</strong></li>\n' +
            '                          <li id="capital">Минимум <strong>одна заглавная буква</strong></li>\n' +
            '                          <li id="number">Минимум <strong>одна цифра</strong></li>\n' +
            '                          <li id="length">Быть не менее <strong>8 символов</strong></li>\n' +
            '                        </ul>\n' +
            '                    </div> ' +
            '</fieldset>' +
            '<fieldset class="row mb-3">\n' +
            '                    <label for="info-password-add" class="col-sm-12 col-form-label">* Подвердите новый пароль</label>\n' +
            '                    <div class="col-sm-12 form-adding-pass">\n' +
            '                      <input type="password" class="form-control showpass" id="info-password-add" placeholder="Ваш пароль"  autocomplete="false" value="" name="lk_password_new" required="" data-lkResetPassword-target="passwordadd">\n' +
            '                      <div class="invalid-feedback">\n' +
            '                        Пожалуйста, заполните поле\n' +
            '                      </div>\n' +
            '                      <span class="password-control password-control--reg" data-action="click->lkResetPassword#showPassAdd"></span>\n' +
            '                      <div class="pass-match"></div>\n' +
            '                    </div>\n' +
            '                  </fieldset>' +
            ' <fieldset class="row mb-3">\n' +
            '<input type="hidden" name="id" value="' + userId + '">' +
            '                    <div class="col-sm-12">\n' +
            '                      <button class="adding__dtn adding__dtn--lk" type="button" data-action="click->lkResetPassword#passwordNew">Обновить пароль</button>\n' +
            '                    </div>\n' +
            '                  </fieldset>' +
            '</form>');
    }

    errorMessage() {
        $('#new-pass-box').append('' +
            '<div class="alert alert-danger reqiest-alert">Ошибка! Попробуйте <a href="lk-resetpassword.html">восстановить пароль</a> еще раз</div>');
    }


    async sendEmail(){
        let form = $("#tsl-reset-pass")[0];
        if (form.checkValidity()) {
            try {
                let emailVal = $('#reset-email');
                let result = await api.ResetPasswordEmail(emailVal.val(),this.captha);

                $('#form-request-box').prepend(
                    '<div class="alert alert-success reqiest-alert" role="alert">\n' +
                    ' На ваш емайл ' + emailVal.val() +' отправлено письмо с инструкцией по восстановлению пароля. \n' +
                    '</div>'
                );

            } catch (error) {
                console.debug(error);
                if (error.code === 5){
                    $('#form-request-box').prepend(
                        '<div class="alert alert-danger reqiest-alert" role="alert">\n' +
                        'Пользователя с таким email не существует!  \n' +
                        '</div>'
                    );
                }

            }
        } else {

        }

    }

  async  connect() {
        if(window.location.href.indexOf('=') < 0){
            const recaptcha = await load('6LflwQMfAAAAAJ2yMqRI2cfXk0DJ3QZL-EBA03JK')
            const token = await recaptcha.execute('submit')
            this.captha = token;
        }


        let token = window.location.href;
        token = token.slice(token.indexOf('=') + 1);

        try {
            api.CheckResetPasswordToken(token).then((result)=>{
                   if (result.success){
                    this.newPassword(result.error);
                       console.debug(result);
                    return;

                }
                    this.errorMessage();

            });
        }
        catch (error){
            this.errorMessage();
        }
    }
}
