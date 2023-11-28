/*
* для вывода меню во всех макетах
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
export default class extends Controller {
    connect() {
        $(this.element).html(headerNavTemplate());

        let favoriteLink;
        if(global.user !== null){

        } else {

        }
    }
}

/*  тут меню + кнопка избранное */
const headerNavTemplate = (model) => {
    let html =  `
    <div id="menu" class="header__list ">
                    <ul class="header__nav_row">
                        <li class="burger-nav__link">
                            <a href="cargo.html"  class="items__cargo">Грузы</a>
                        </li>
                        <li class="burger-nav__link">
                            <a href="transport.html" class="iten__transport">Транспорт</a>
                        </li>
                        <li class="burger-nav__link">
                            <a href="service.html" class="item__service">Сервис</a>
                        </li>
                        <li class="burger-nav__link">
                            <a href="spare.html" class="item__spare">Запчасти</a>
                        </li>
                    </ul>
                    <ul class="header__nav_row">
                      <!--  <li class="burger-nav__link">
                            <a href="gas.html" class="item__droplet">АЗС</a>
                        </li>-->
                        <li class="burger-nav__link">
                            <a href="roadside.html" class="item__cafe">Придорожный сервис</a>
                        </li>
                        <li class="burger-nav__link">
                            <a href="avto.html" class="item__auto">Автотранспорт</a>
                        </li>
                       
                        </li>
                         `

              if(global.user !== null) {
                  html += `
                   <li class="burger-nav__link">
                            <a href="lk-favorites.html" class="item__favorites"><span class="favorites"></span>Избранное</a>
                  `
              } else {
                  html += `
                   <li class="burger-nav__link">
                            <a href="lk-enter.html" class="item__favorites"><span class="favorites"></span>Избранное</a>
                  `
              }

              html += `
                    </ul>
                </div> 
    `
    return html
}



