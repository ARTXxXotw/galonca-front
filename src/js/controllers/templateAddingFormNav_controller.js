/*
* для блока со ссылками на страницах форм объявлений
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"

export default class extends Controller {
    connect() {
        $(this.element).html(addingFormNav());
        $('.addmenu-box [href]').each(function() {
            if (this.href === window.location.href) {
                $(this).addClass('addmenu-box__btn--active').removeAttr('href', null);
            }
        });
    }
}

/*  тут статичный блок с меню */
const addingFormNav = (model) => ` 
<nav class="container addmenu-box">     
 
        <a class="addmenu-box__btn addmenu-box__add-carriage" href="adding-cargo.html">
           Добавить груз
        </a> 
        
           <a class="addmenu-box__btn addmenu-box__add-cargo" href="adding-avto.html">
         Добавить транспорт
        </a>
        
        <a class="addmenu-box__btn addmenu-box__add-service" href="adding-service.html">
          Сервис
          автотранспорта
        </a> 
 
        <a class="addmenu-box__btn addmenu-box__add-add-service" href="adding-spare.html">
          Продажа
          запчастей
        </a> 
 
        <a class="addmenu-box__btn addmenu-box__add-sale-avto" href="adding-avto-sale.html">
          Продажа/аренда
          автотранспорта
        </a> 
 
        <a class="addmenu-box__btn addmenu-box__add-shop" href="adding-roadside.html">
          Придорожные
            заведения
        </a> 
        
    </nav>
`;