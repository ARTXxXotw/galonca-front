/*
* для блока список придорожных заведений
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import Swiper from 'swiper/bundle'
import {Geo} from "../../protos/cargo_pb";
export default class extends Controller {
    static values = { limit: Number }
    contacts() {
        $(event.currentTarget).addClass('top-sto__box-btn--hide');
    }

    async favoritesAdd(event) {
        if(global.user !== null){

            try{
                let result = await api.AddFavorite(event.params.type, event.params.id);

                if (result.success) {
                    let id = '#' + event.params.type + '-' + event.params.id;
                    $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->roadside-list#DeleteFavorite');
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
            $(id + ' .cargo-box__label').removeClass('active').attr('data-action', 'click->roadside-list#favoritesAdd');
        }
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

    async connect() {
        try {
            let roadsideList = await api.FindRoadsideService({addressCity:[global.country.id]}, Geo.geo_type.COUNTRY);

            $(this.element).html(await roadsideListTemplate(roadsideList.roadsideservicesList));
            $('#roadside-total').text(roadsideList.found);
            $('#roadside-find').text(roadsideList.roadsideservicesList.length);

            if(roadsideList.roadsideservicesList.length < 5) {
                $('.btn__download-more').remove();
            }

            let myFavorite = await  api.ListFavorites("roadside");

            myFavorite.favoriteList.forEach((favorite)=>{
                let id = '#'+favorite.entitytype + '-' + favorite.id;
                $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->roadside-list#DeleteFavorite');
            })
        } catch (error) {
            console.debug(error)
        }
        this.opencontent();
        const swiper = new Swiper('.swiper-container', {
            loop: true,
            speed: 2000,
            pagination: {
                el: '.swiper-pagination',
            },

        });
    }
}

const roadsideListTemplate = async (model) => {
    let html = "";
    for (let i = 0; i < model.length; i++){
        let roadside = await roadsideCardTemplate(model[i]);
        html += roadside;
    }
    return html

   /* let template = await roadsideCardTemplate;
    console.debug(template);
    return `   
        ${model.reduce((html, card) => html + template(card), '')}   
    `;*/
}



/*
* блок - карточка придорожное заведение
*/
const roadsideCardTemplate = async (cardModel) => {
    if(cardModel.imagesList[0] === ""){
        cardModel.imagesList[0] = '/noimg.png';
    }
    let roadsiteType = "";
    let listLikes;
    if(cardModel.location === undefined){
        cardModel.location = {name:'Не найдено', address:'Не найдено'}
    }
    try {
        listLikes = await api.GetLikes('roadside', cardModel.id);


    } catch (error) {
        console.debug(error);
    }
    switch (cardModel.type) {
        case 0:
            roadsiteType = 'Придорожная гостиница'
            break;
        case 1:
            roadsiteType = 'Придорожное кафе'
            break;
        case 2:
            roadsiteType = 'Паркинг'
            break;
        case 3:
            roadsiteType = 'Автомойка'
    }
    return `
<div class="roadside__content-box" id="roadside-${cardModel.id}">
                  <div class="roadside-box"> 
                    <div class="swiper-container">
                             <div class="swiper-wrapper">
                                  ${cardModel.imagesList.reduce((html, img) => html + '<div class="swiper-slide"><img src="https://tsl.kz/uploads/image' + img + '" alt="" width="400" height="263"></div>', '')}                           
                              </div><!-- /swiper-wrapper -->
                             <div class="swiper-pagination"></div>
                    </div><!-- /swiper-container-->
                    <div class="content-box__info">
                      <div class="roadside-box__card">
                      ${roadsiteType}
                      </div>
                      <div class="top-sto__name content-box__name">${escapeHtml(cardModel.title)}</div>
                      <div class="top-sto__direction">  
${cardModel.location.name}, ${escapeHtml(cardModel.location.address)}
</div>
                      <div class="top-sto__review content-box__review">
                     <!-- Отзывов:
                    <span class="top-sto__namb">${cardModel.likes}</span>-->
                     <a class="like" id="like-true-${cardModel.id}" data-action="click->roadside-list#addLike" data-roadside-list-type-param="roadside"  data-roadside-list-id-param="${cardModel.id}" data-roadside-list-positive-param="true" >${listLikes.positive}</a>
                    <a class="dislike"  id="like-false-${cardModel.id}" data-action="click->roadside-list#addLike" data-roadside-list-type-param="roadside"  data-roadside-list-id-param="${cardModel.id}" data-roadside-list-positive-param="false" >${listLikes.negative}</a>
                      </div>
                      
                    <div class="content-block-fix">
                        <div class="content-block-text">
                            <p>${escapeHtml(cardModel.description)}</p>
                        </div>
                        <div class="show-all-container">
                            <button class="show-all">Показать полностью</button>    
                        </div>
                    </div>
                      
                         <div class="cargo-box__label cargo-box__label-new"  data-action="click->roadside-list#favoritesAdd" data-roadside-list-type-param="roadside" data-roadside-list-id-param="${cardModel.id}" ></div>
                      
                      <button class="top-sto__box-btn" data-action="click->roadside-list#contacts">Показать контакты</button>
               <div class="top-sto__contact">
               <p>  ${cardModel.phoneList.reduce((html, phone) => html + '<a href="tel:+' + phone.replace(/\D/g, '') + '" class="contact-link">' + phone + '</a><br>', '')}   </p>
                <p>  ${cardModel.emailList.reduce((html, email) => html + '<a href=mailto:"' + email +'" class="contact-link">' + email + '</a><br>', '')}   </p> 
                </div>     
                    </div>
                  </div>
                </div> 
`};

