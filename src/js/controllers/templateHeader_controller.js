/*
* для вывода header во всех макетах
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import ymaps from "ymaps";

export default class extends Controller {
    logout() {
        sessionStorage.removeItem('tsl_token');
        sessionStorage.removeItem('email');
        location.href = 'index.html';
    }

    async  connect() {
        $(this.element).html(headerTemplate());

        $('#pointAddress').text(global.city.name);

        if(global.user !== null) {
            $('#hello-box').prepend(
                '<div class="header__hello">' +
                'Здравствуйте, '+  global.user.name +
                '</div>');
               } else {
            $('.header__hello').remove();
        }
    }
}

/*  тут статичный header */
const headerTemplate = (model) => `               
     <div class="main__header">
    <div class="header__top">
      <div class="header__row">
        <div class="header__left">
          <a href="index.html" class="header__logo"><img src="img/box.svg" alt="TSL.su - Международный маркетплейс грузоперевозок и сервиса №1" class="header__logo-img"> TSL.su</a>
          <div class="header__title">Международный маркетплейс грузоперевозок и сервиса №1</div>
        </div>
        <div class="header__right" id="hello-box"> 

          <div id="burger" class="menu__btn burger" aria-label="Кнопка меню" role="button" data-controller="templateheaderMob" data-action="click->templateheaderMob#mobnavopen"></div>
          <!--<select name="" id="" class="header__select">
            <option value="">Русский</option>
          </select>-->
          <div class="header__select select_marker">
                    <div class="select_marker-text" id="pointAddress"></div>
                  <!--  <div id="tow">Ваш город: ... определяется ...</div>
                    <div id="reg">Ваш регион: ... определяется ...</div>-->
          </div> 
       
           
          <span class="area" data-controller="templateHeaderAuth">
                     <!-- блок авториазция / ЛК -->
          </span>
          <!-- lk-popup -->
          <div data-controller="templateHeaderPopupAds">
            <a href="#popup-ads" class="add__ad" data-action="click->templateHeaderPopupAds#openPopup">Добавить объявление</a>
            <a href="#" class="staff-popup" id="popup-ads"></a>
            <div class="ads-popup" id="popup-ads-box">
              <!-- всплывающее окно с разделами для объявлений -->
            </div>
          </div>
          <!-- /lk-popup -->
        </div>
      </div>
    </div>
    <div class="header__bottom">
      <nav  class="header__nav" data-controller="templateHeaderNav"></nav>
    </div>
  </div>
`;



