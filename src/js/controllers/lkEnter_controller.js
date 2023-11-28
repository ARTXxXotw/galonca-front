/*
* для формы регистрации
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import serializer from 'form-serializer'

export default class extends Controller {
  async  authorization() {
        let form = $("#tsl-enter")[0];

        if (form.checkValidity()) {
            let json = $(form).serializeObject();
            try {
                let loginauth = await api.Login(json.email, json.pass);

                sessionStorage.setItem('tsl_token', loginauth.accessToken);
                sessionStorage.setItem('email', json.email);
                location.href = 'index.html';
            } catch (error) {
                console.debug(error);
                $('#form-request-box').prepend(
                    '<div class="alert alert-danger reqiest-alert" role="alert">\n' +
                    'Ошибка авторизации. Неправильный логин и/или пароль.  \n' +
                    '</div>'
                );
            }

        } else {
            $('#form-request-box').prepend(
                ' <div class="alert alert-danger reqiest-alert" role="alert">\n' +
                '  Пожалуйста, заполните все поля для авторизации' +
                '</div>'
            )
        }

        form.classList.add('was-validated');
    }
    connect() {
        if(global.user !== null) {
            window.location.replace("lk-data.html");
        }

        //кнопка Войти реагирует на ENTER
        $(document).bind('keypress', function(e){
            if(e.which === 13) {
                $('#lk-enter').trigger('click');
            }
        });
    }
}
