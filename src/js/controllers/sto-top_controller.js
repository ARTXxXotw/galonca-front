/*
* для блока ТОП 3 СТО
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import Swiper from 'swiper'
import {Geo} from "../../protos/cargo_pb";


export default class extends Controller {
    static values = { limit: Number }
    contacts() {
          $(event.currentTarget).addClass('top-sto__box-btn--hide');
    }

    opencontent() {
        $(".content-block-text").each(function() {
            let th = $(this);
            if (th.prop('scrollHeight') > th.height()) {
                let more = th.next(".show-all-container").find(".show-all");
                th.next(".show-all-container").show();
                th.addClass("content-block-text-shadow");
                more.click(function() {
                    th.toggleClass("content-block-text-shadow content-block-text-open");
                    more.text(more.text() == "Скрыть" ? "Показать полностью" : "Скрыть");
                });
            }
        });
    }
    async favoritesAdd(event) {

        if(global.user !== null){
            let id = '#' + event.params.type + '-' + event.params.id;
            $(id + ' .cargo-box__label').attr('data-action', "");
            try{
                let result = await api.AddFavorite(event.params.type, event.params.id);
                  if (result.success) {
                    $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->sto-top#DeleteFavorite');
                }
            } catch(error) {
                console.debug(error)
            }
        } else {
            $(location).attr("href", "lk-enter.html");
        }

    }

    async DeleteFavorite(event) {
        let id = '#' + event.params.type + '-' + event.params.id;
        $(id + ' .cargo-box__label').attr('data-action', "");
        let result = await api.DeleteFavorite(event.params.type, event.params.id);
        if (result.success) {
            $(id + ' .cargo-box__label').removeClass('active').attr('data-action', 'click->sto-top#favoritesAdd');
        }
    }

    async addLike(event) {
        if(global.user !== null){

            try {
                let result = await api.AddLike(event.params.type, event.params.id, event.params.positive);

                $('#like-true-' + event.params.id).text(result.positive);
                $('#like-false-' + event.params.id).text(result.negative);

            } catch(error) {
                console.debug(error)
            }
        } else {
            $(location).attr("href", "lk-enter.html");
        }
    }

  async  connect() {

        try {
            let serviceTopList = await api.FindServiceStation({addressCity:[global.country.id]},3,0, Geo.geo_type.COUNTRY);
            $(this.element).html(await stoTopListTemplate(serviceTopList.servicestationsList));

            const swiper = new Swiper('.swiper-container', {
                loop: false,
                speed: 2000,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: 'true',
                },
            });
            let myFavorite = await  api.ListFavorites("stotop");
            myFavorite.favoriteList.forEach((favorite)=>{
                let id = '#'+favorite.entitytype + '-' + favorite.id;
                $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->sto-top#DeleteFavorite');
            })
        } catch (error) {
            console.debug(error)
        }
      this.opencontent();
    }
}



/* список с фото */
/*
const stoTopListTemplate = (model) => {
    return `${model.reduce((html, card) => html + stoTopCardTemplate(card), '')}`
}
*/

const stoTopListTemplate =  async (model) => {
    let html = "";
    for (let i = 0; i < model.length; i++){
        let stoTop = await stoTopCardTemplate(model[i]);
        html += stoTop;
    }
    return html
}


const stoTopCardTemplate = async (cardModel) => {
    let dateTime = new Date(cardModel.time * 1000);
    let listLikes;
    let company;
    if(cardModel.imagesList[0] === ""){
        cardModel.imagesList[0] = '/noimg.png';
    }
    if(cardModel.location === undefined){
        cardModel.location = {name:'Не найдено', address:'Не найдено'}
    }
    try {
        listLikes = await api.GetLikes('sto', cardModel.id);


        if (cardModel.owner === undefined){
            cardModel.owner = {
                name:'Не найдено',
                id: 'Не найдено'
            }
        } else {
            let user = await api.GetUserById(cardModel.owner.id);
            let company = await api.GetCompanyByUserEmail(user.email);
            if (company !== undefined) {
                cardModel.owner.name = company.name + ' (БИН: ' + company.bin + ')'
            }
        }

    } catch (error) {
        console.debug(error);
    }
    let html = `
     <div class="top-sto__box" id="stotop-${cardModel.id}">
            <div class="top-sto__box-img"> 
             <div class="swiper-container">
                            <div class="swiper-wrapper">
                              ${cardModel.imagesList.reduce((html, img) => html + '<div class="swiper-slide"><img src="https://tsl.kz/uploads/image' + img + '" alt="" width="400" height="263"></div>', '')} 
                            </div><!-- /swiper-wrapper-->
                    </div><!-- /swiper-container-->            
            </div>          
           
            
            <div class="top-sto__info">
                <div class="top-sto__repairs"> 
                  ${cardModel.categoriesList.reduce((html, servise) => html + '<span class="repairs__card">' + servise + '</span>', '')}  
                </div>
                <div class="top-sto__name">${escapeHtml(cardModel.title)}  </div>
                 <div class="top-sto__services">  
                     <div class="content-block-fix">
                        <div class="content-block-text">
                            <p>${escapeHtml(cardModel.description)}  </p>
                        </div>
                        <div class="show-all-container">
                            <button class="show-all">Показать полностью</button>    
                        </div>
                    </div>
                 </div>
                <div class="top-sto__direction"> ${cardModel.location.name}, ${escapeHtml(cardModel.location.address)} </div>
               
                <div class="top-sto__review">
                <!-- Отзывов:
                    <span class="top-sto__namb">${cardModel.likes}</span>-->
                     <a class="like" id="like-true-${cardModel.id}" data-action="click->sto-top#addLike" data-sto-top-type-param="sto"  data-sto-top-id-param="${cardModel.id}" data-sto-top-positive-param="true" >${listLikes.positive}</a>
                    <a class="dislike"  id="like-false-${cardModel.id}" data-action="click->sto-top#addLike" data-sto-top-type-param="sto"  data-sto-top-id-param="${cardModel.id}" data-sto-top-positive-param="false" >${listLikes.negative}</a>
                     
                    
                      <div class="cargo-box__label cargo-box__label-new"  data-action="click->sto-top#favoritesAdd" data-sto-top-type-param="stotop" data-sto-top-id-param="${cardModel.id}" ></div>
                </div>
                <button class="top-sto__box-btn" data-action="click->sto-top#contacts">Показать контакты</button>
               <div class="top-sto__contact">
               
               
                   <div class="top-sto__contact-user">                   
                   <p class="box__contact-data-item"><strong>${escapeHtml(cardModel.owner.name)}</strong></p>
                    ${cardModel.phoneList.reduce((html, phone) => html + '<p class="box__contact-data-item"><a href="tel:+' + phone.replace(/\D/g, '') + '" class="contact-link">' + phone + '</a></p>', '')}   
    ${cardModel.emailList.reduce((html, email) => html + '<p class="box__contact-data-item"><a href=mailto:"' + email +'" class="contact-link">' + email + '</a></p>', '')}    
                    </div>
                   
                </div>     
            </div>
     </div>
`
    return html};
/* END список с фото */


