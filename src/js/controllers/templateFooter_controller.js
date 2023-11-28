/*
* для вывода футера во всех макетах
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
export default class extends Controller {
  /*  currentYear() {

    }*/

    connect() {
        $(this.element).html(footerTemplate());
        $('#currentYear').text(new Date().getFullYear());

    }
}

/*  тут статичный футер */
const footerTemplate = (model) => `               
    <section class="footer">
        <div class="container container__footer">
            <div class="footer__col">
                <div class="footer__info">
                    <ul>
                        <li class="footer__info-item">
                            <div class="footer__info-img info-img__marker"></div>
                            <div class="footer__info-data">
                                <span class="info-data__title">Адрес:</span>
                                Казахстан Алматы ул.Грибоедова 74
                            </div>
                        </li>
                        <li class="footer__info-item">
                            <div class="footer__info-img info-img__phone"></div>
                            <div class="footer__info-data">
                                <span class="info-data__title">Телефон:</span>
                                <a href="tel:87009788589" class="info-data__contact">8 700 978 85 89</a>
                                <a href="tel:87273822394" class="info-data__contact">8 (727) 382 23 94</a>
                            </div>
                        </li>
                        <li class="footer__info-item">
                            <div class="footer__info-img info-img__mail"></div>
                            <div class="footer__info-data">
                                <span class="info-data__title">E-mail:</span>
                                <a href="mailto:admin@tsl.kz" class="info-data__contact"></a>
                                admin@tsl.kz
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer__col footer__col_hidden">
                <nav class="footer-nav">
                    <ul>
                        <li class="footer-nav__item">
                            <a href="index.html" class="footer-nav__link footer-nav__link_bold">TSL.su</a>
                        </li>
                        <li class="footer-nav__item">
                            <a href="info-about-us.html" class="footer-nav__link">О нас</a>
                        </li>
                        <li class="footer-nav__item">
                            <a href="info-support-service.html" class="footer-nav__link">Служба поддержки</a>
                        </li>
                        <li class="footer-nav__item">
                            <a href="info-contacts.html" class="footer-nav__link">Контакты</a>
                        </li> 
                         <li class="footer-nav__item">
                            <a href="info-rulers.html" class="footer-nav__link">Правила  размещения информации</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="footer__col">
                <nav class="footer-services__nav">
                    <ul>
                        <li class="footer-services__item">
                            <a href="transport.html" class="footer-services__link">Транспорт</a>
                        </li>
                        <li class="footer-services__item">
                            <a href="cargo.html" class="footer-services__link">Грузы</a>
                        </li>
                        <li class="footer-services__item">
                            <a href="service.html" class="footer-services__link">Сервис</a>
                        </li>
                        <li class="footer-services__item">
                            <a href="spare.html" class="footer-services__link">Запчасти</a>
                        </li>
                        <li class="footer-services__item">
                            <a href="sale-avto.html" class="footer-services__link">Продажа автотранспорта</a>
                        </li>
                        <li class="footer-services__item">
                            <a href="roadside.html" class="footer-services__link">Придорожный сервис</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="footer__col footer__color_hidden"  data-controller="templateHeaderPopupAds">
                <a href="counterparty.html" class="footer__links">Проверка контрагента</a>
                <a href="route.html" class="footer__links">Расстояния</a>
                <a href="#popup-ads" class="add__ad footer__addadv" data-action="click->templateHeaderPopupAds#openPopup">Добавить объявление</a>
            </div>
        </div>
    </section>

    <section class="footer__copyright">
        <div class="container copyright__container">
            <div class="footer__copyright_row">
                <a href="index.html" class="header__logo">TSL.su</a>
                <div class="header__title title__footer">Международный маркетплейс грузоперевозок и сервиса №1</div>
            </div>
            <div class="footer__copyright_row">
                <div class="footer__circs">
                    <span class="circs__link_block">Все права защищены &copy; 2021-<span id="currentYear"></span></span>
                    <a href="info-privacy-policy.html" class="circs__link">Политика конфиденциальности</a>
                    <a href="info-personal-data.html" class="circs__link">Пользовательское соглашение</a>
                </div>
                <div class="footer__logo">
                    <a href="https://positiv.kz/"><img src="img/logo-positiv.svg" alt="positiv.kz" class="footer__logo-img" width="162" height="60"></a>
                </div>
            </div>
        </div>
    </section>     
`;



