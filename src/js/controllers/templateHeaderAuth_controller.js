/*
* для блока входа
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import serializer from 'form-serializer'

export default class extends Controller {


  async  connect() {
        if(global.user !== null) {
            $(this.element).html('<a href="lk-data.html" class="area-link">Личный кабинет</a><a href="#" class="area-link area-link--exit" data-action="click->templateHeader#logout">Выйти</a>');

        } else {
            $(this.element).html(' <a class="area-link" href="lk-enter.html">Вход</a> / <a class="area-link" href="lk-registration.html" >Регистрация</a>');
        }
    }
}