/*
* для вывода меню во всех макетах
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
export default class extends Controller {

    openPopup() {
        if(global.user == null) {
            $('#popup-ads-box').html(headerpopupTemplateClose());
        } else {
            $('#popup-ads-box').html(headerpopupTemplate());
        }
    }
    connect() {

    }
}

/*  тут всплывающее окно с выбором добавления объявлений */
const headerpopupTemplate = () => `               
   <div class="ads-popup__container">
                <div class="ads-popup__title">Выберите раздел для добавления объявления</div>
                <ul class="ads-popup__box container__menu-box">
                  <div class="ads-popup__row">
                   
                    <li class="menu-popup__box">
                      <div class="menu-popup__img add-carriage__bg"></div>
                      <div class="menu-popup__title"> Добавить груз</div>
                      <a href="adding-cargo.html" class="menu-box__link"></a>
                    </li>
                    
                     <li class="menu-popup__box">
                      <div class="menu-popup__img add-cargo__bg"></div>
                      <div class="menu-popup__title">Добавить транспорт</div>
                      <a href="adding-avto.html" class="menu-box__link"></a>
                    </li>
                    <li class="menu-popup__box">
                      <div class="menu-popup__img service__bg"></div>
                      <div class="menu-popup__title">Сервис
                        автотранспорта</div>
                      <a href="adding-service.html" class="menu-box__link"></a>
                    </li>
                  </div>
                  <div class="ads-popup__row">
                    <li class="menu-popup__box">
                      <div class="menu-popup__img add-service__bg"></div>
                      <div class="menu-popup__title">Продажа
                        запчастей</div>
                      <a href="adding-spare.html" class="menu-box__link"></a>
                    </li>
                    <li class="menu-popup__box">
                      <div class="menu-popup__img sale-avto__bg"></div>
                      <div class="menu-popup__title menu-box__title-add">Продажа/аренда
                        автотранспорта</div>
                      <a href="adding-avto-sale.html" class="menu-box__link"></a>
                    </li>
                    <li class="menu-popup__box">
                      <div class="menu-popup__img add-shop__bg"></div>
                      <div class="menu-popup__title">Придорожные
                        заведения</div>
                      <a href="adding-roadside.html" class="menu-box__link"></a>
                    </li>
                  </div>
                </ul>
              </div>  
`;

const headerpopupTemplateClose = () => `
        <div class="ads-popup__container">
        <div class="ads-popup__title">Вы не авторизованы!</div>
        <p class="ads-popup__text">Чтобы добавить объявление, пожалуйста  <a class="ads-popup__link" href="lk-enter.html">войдите</a> или <a class="ads-popup__link" href="lk-registration.html" >зарегистрируйтесь</a></p> 
</div>
`;



