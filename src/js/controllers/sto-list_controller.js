/*
* для блока СТО список
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import {Geo} from "../../protos/cargo_pb";


export default class extends Controller {
    static values = { limit: Number }
    contacts() {
        $(event.currentTarget).addClass('box__contact-btn--hide');
    }

    stoAll() {
        let scroll_el = $(this).attr('href'); // берем у него содержимое атрибута href, которое начинается на "#section" или ".section"
            $('html, body').animate({
                scrollTop: $(scroll_el).offset().top - 100 // отступ (пиксели)
            }, 2500); // скорость (миллисекунды)
    }


    async favoritesAdd(event) {
        if(global.user !== null){

            try{
                let result = await api.AddFavorite(event.params.type, event.params.id);

                if (result.success) {
                    let id = '#' + event.params.type + '-' + event.params.id;
                    $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->sto-list#DeleteFavorite');
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
            $(id + ' .cargo-box__label').removeClass('active').attr('data-action', 'click->sto-list#favoritesAdd');
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

   async connect() {
       $('.current-country-name').text(global.country.name);
        try {
            let serviceList = await api.FindServiceStation({addressCity:[global.country.id]},5,3, Geo.geo_type.COUNTRY);
            $('#stoList').html(await stoListTemplate(serviceList.servicestationsList));
            $('#service-total').text(serviceList.found);
            $('#sto-find').text(serviceList.servicestationsList.length);
            if(serviceList.servicestationsList.length < 5) {
                $('.btn__download-more').remove();
            }


            let myFavorite = await  api.ListFavorites("sto");

            myFavorite.favoriteList.forEach((favorite)=>{
                let id = '#'+favorite.entitytype + '-' + favorite.id;
                $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->sto-list#DeleteFavorite');


            })
        } catch (error) {
            console.debug(error)
        }


    }
}

/* простой список */
/*const stoListTemplate = (model) => `
        ${model.reduce((html, card) => html + stoCardTemplate(card), '')}   
    `;*/

const stoListTemplate =  async (model) => {
    let html = "";
    for (let i = 0; i < model.length; i++){
        let sto = await stoCardTemplate(model[i]);
        html += sto;
    }
    return html
}

const stoCardTemplate = async (cardModel) => {
    let dateTime = new Date(cardModel.time * 1000);
    let listLikes;
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
        console.debug(error)
    }
    return `
    <div class="services__content" id="sto-${cardModel.id}">
        <div class="services__box">
        <div class="box-top">
            <div class="box-header">
                <div class="box-header__title">${escapeHtml(cardModel.title)}</div>
               
            </div>
            <p class="box__text">${escapeHtml(cardModel.description)}             
            </p>           
           
            <div class="box__service">
               ${cardModel.categoriesList.reduce((html, servise) => html + '<div class="box__item">' + servise + '</div>', '')}  
            </div>
        </div>
        <div class="box__footer">
            <div class="box__footer_row">
                <div class="box__service-name">${escapeHtml(cardModel.owner.name)}  
                   <a class="box__like" id="like-true-${cardModel.id}" data-action="click->sto-list#addLike" data-sto-list-type-param="sto"  data-sto-list-id-param="${cardModel.id}" data-sto-list-positive-param="true" >${listLikes.positive}</a>
                    <a class="box__dislike"  id="like-false-${cardModel.id}" data-action="click->sto-list#addLike" data-sto-list-type-param="sto"  data-sto-list-id-param="${cardModel.id}" data-sto-list-positive-param="false" >${listLikes.negative}</a>
                </div>
                <div class="box__service-address">
                  ${cardModel.location.name}, ${escapeHtml(cardModel.location.address)}
                </div>
            </div>
            <div class="box__footer_row box__footer_row-contact">
                <div class="box__contact">
                    <button class="box__contact-btn" data-action="click->sto-list#contacts">Показать контакты</button>                
                     <div class="box__contact-data">
                       ${cardModel.phoneList.reduce((html, phone) => html + '<p class="box__contact-data-item"><a href="tel:+' + phone.replace(/\D/g, '') + '" class="contact-link">' + phone + '</a></p>', '')}   
${cardModel.emailList.reduce((html, email) => html + '<p class="box__contact-data-item"><a href=mailto:"' + email +'" class="contact-link">' + email + '</a></p>', '')}    
                     </div>
                </div>
                
                <div class="box__date-travel services__date-travel">
                    ${cardModel.createdAt}
                </div>
                
                 <div class="cargo-box__label cargo-box__label-new"  data-action="click->sto-list#favoritesAdd" data-sto-list-type-param="sto" data-sto-list-id-param="${cardModel.id}" ></div>
            </div>
        </div>
    </div>
    </div> 
`};
/* /END простой список */



