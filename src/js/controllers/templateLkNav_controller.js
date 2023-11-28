/*
* для блока со ссылками на страницах форм объявлений
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"

export default class extends Controller {
    connect() {
        $(this.element).html(addingFormNav());
        $('#lk-nav__box-list [href]').each(function() {
            if (this.href === window.location.href) {
                $(this).addClass('lk-nav__box-link_active').removeAttr('href', null);
            }
        });
    }
}

/*  тут статичный блок с меню */
const addingFormNav = (model) => {
   let html =  ` 
<ul id="lk-nav__box-list">
              <li class="lk-nav__box-item">
                <a href="lk-data.html" class="lk-nav__box-link">Мои данные</a>
              </li>
<!--              <li class="lk-nav__box-item">
                <a href="lk-chat.html" class="lk-nav__box-link">Чат</a>
              </li>-->
              
              
              <li class="lk-nav__box-item">
                <a href="lk-favorites.html" class="lk-nav__box-link">Избранное</a>
              </li>
            `

              if(global.user.role === "admin") {
                  html += `
                  <li class="lk-nav__box-item">
                <a href="lk-company.html" class="lk-nav__box-link">Моя компания</a>
              </li>
              <li class="lk-nav__box-item">
                <a href="lk-staff.html" class="lk-nav__box-link">Мои сотрудники</a>
              </li>
                  `
              }

              html += `
                <li class="lk-nav__box-item">
                <a href="lk-my-ads.html" class="lk-nav__box-link">Мои объявления</a>
              </li>
            <!-- 
             можно удалить
             <li class="lk-nav__box-item">
                <a href="my-shop.html" class="lk-nav__box-link">Мои заведения</a>
              </li>-->
            </ul>
                `
    return html
}
    
