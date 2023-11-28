/*
* для проверки авторизации для закрытых разделов:
* - ЛК
* - добавить объявления
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
export default class extends Controller {

  async  connect() {
      if (global.user === null) {
          location.href = 'lk-enter.html';
      }

    }
}




