/*
* для блока СТО список
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import Swiper from 'swiper/bundle'
import {transportList} from "./transportListTop_controller";
import {Geo} from "../../protos/cargo_pb";
export default class extends Controller {
    static values = { limit: Number }
    contacts() {
        $(event.currentTarget).addClass('top-sto__box-btn--hide');
    }

    filterAuto() {
        let form = $("#autoFilterForm")[0];
        let json = $(form).serializeObject();

    }

    async favoritesAdd(event) {
        if(global.user !== null){

            try{
                let result = await api.AddFavorite(event.params.type, event.params.id);

                if (result.success) {
                    let id = '#' + event.params.type + '-' + event.params.id;
                    $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->avto-list#DeleteFavorite');
                }
            } catch(error) {
                console.debug(error)
            }
        } else {
            $(location).attr("href", "lk-enter.html");
        }


    }

    async DeleteFavorite(event) {

        let result = await api.DeleteFavorite(event.params.type, event.params.id);
        if (result.success) {
            let id = '#' + event.params.type + '-' + event.params.id;
            $(id + ' .cargo-box__label').removeClass('active').attr('data-action', 'click->avto-list#favoritesAdd');
        }
    }

   async connect() {
        try {
            let autoList = await api.FindTransport({addressCity:[global.id],transportType:'', fuelType: ['all'], brand: '', volumeFrom: '', volumeUntil: ''}, Geo.geo_type.COUNTRY);

            $(this.element).html(avtoListTemplate(autoList.transportsList));
            $('#avto-total').text(autoList.found);
            $('#avto-find').text(autoList.transportsList.length);
            if(autoList.transportsList.length < 5) {
                $('.btn__download-more').remove();
            }


            let myFavorite = await  api.ListFavorites("auto");

            myFavorite.favoriteList.forEach((favorite)=>{
                let id = '#'+favorite.entitytype + '-' + favorite.id;
                $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->avto-list#DeleteFavorite');
            })
        } catch (error) {
            console.debug(error)
        }
       const swiper = new Swiper('.swiper-container', {
           loop: true,
           speed: 2000,
           pagination: {
               el: '.swiper-pagination',
           },

       });

    }
}


const avtoListTemplate = (model) => `   
        ${model.reduce((html, card) => html + avtoCardTemplate(card), '')}   
    `;
/*
* блок - карточка транспорт в КЗ
*/
const avtoCardTemplate = (cardModel) => {
    let dateTime = new Date(cardModel.time * 1000);
    if(cardModel.imagesList[0] === ""){
        cardModel.imagesList[0] = '/noimg.png';
    }
    let autobus = '';
    if (cardModel.numberpassengers !== 0){
        autobus = ',<br>Количество мест: ' + cardModel.numberpassengers;
    }

    let specialTech = '';
    if (cardModel.powder !== 0){
        specialTech = ',<br>Мощность: ' + cardModel.powder;
    }


    if(cardModel.location === undefined){
        cardModel.location = {name:'Не найдено', address:'Не найдено'}
    }
    return `
        <div class="roadside__content-box"  id="auto-${cardModel.id}">
            <div class="roadside-box">
                <div class="swiper-container">
                     <div class="swiper-wrapper">
                                  ${cardModel.imagesList.reduce((html, img) => html + '<div class="swiper-slide"><img src="https://tsl.kz/uploads/image' + img + '" alt="" width="400" height="263"></div>', '')}                           
                     </div><!-- /swiper-wrapper -->
                     <div class="swiper-pagination"></div>
                </div><!-- /swiper-container-->
                <div class="content-box__info">
                      <div class="avto__price">
                       ${cardModel.cost}  тг.
                      </div>
                      <div class="avto-box__name content-box__name">${cardModel.brand}</div>
                       <p class="avto__description">
                               Модель: ${cardModel.model}, <br>
                               Тип Транспорта: ${cardModel.transporttype}, <br>
                               Год: ${cardModel.releaseyear}, <br>
                               Состояние: ${cardModel.condition}, <br>
                               Топливо: ${cardModel.fueltype},  <br>
                               КПП: ${cardModel.transmission} 
                               ${autobus}                              
                               ${specialTech}                              
                       </p>
                      <p>объем двигателя: ${cardModel.engine}<br>
пробег: ${cardModel.mileage} км</p>
                        <p>${cardModel.salestype}, ${cardModel.availability}</p>
                      
                        <div class="avto-add__row">
                            <div class="sity__ad">${cardModel.location.name}</div>
                            <div class="date__ad"> ${cardModel.createdAt}</div>
                              <div class="cargo-box__label cargo-box__label-new"  data-action="click->avto-list#favoritesAdd" data-avto-list-type-param="auto" data-avto-list-id-param="${cardModel.id}" ></div>
                      </div><!-- /avto-add__row -->
                      
                        <button class="top-sto__box-btn" data-action="click->avto-list#contacts">Показать контакты</button>
               <div class="top-sto__contact">
                
               
               
                     <p>${cardModel.phonesList.reduce((html, phone) => html + phone + '<br>', '')}  </p>
                     <p>${cardModel.emailsList.reduce((html, email) => html + email + '<br>', '')}  </p>
                     
                </div>  
                </div><!-- /content-box__info -->
            </div><!-- /roadside-box-->
        </div><!-- /roadside__content-box-->

 
`};
