/*
* для блока запчасти список
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import Swiper from 'swiper/bundle'
import {Geo} from "../../protos/cargo_pb";

export default class extends Controller {
    static values = { limit: Number }
    contacts() {
        $(event.currentTarget).addClass('cargo-box__contact--hide');
    }

    async favoritesAdd(event) {
        if(global.user !== null){

            try{
                let result = await api.AddFavorite(event.params.type, event.params.id);

                if (result.success) {
                    let id = '#' + event.params.type + '-' + event.params.id;
                    $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->spare-list#DeleteFavorite');
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
            $(id + ' .cargo-box__label').removeClass('active').attr('data-action', 'click->spare-list#favoritesAdd');
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
        try {
            let spareList = await api.FindSparePart({addressCity:[global.country.id]}, Geo.geo_type.COUNTRY);

            $(this.element).html(await spareListTemplate(spareList.sparepartsList));
            $('#spare-total').text(spareList.found);
            $('#spare-find').text(spareList.sparepartsList.length);
            if(spareList.sparepartsList.length < 5) {
                $('.btn__download-more').remove();
            }

            let myFavorite = await  api.ListFavorites("spare");

            myFavorite.favoriteList.forEach((favorite)=>{
                let id = '#'+favorite.entitytype + '-' + favorite.id;
                $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->spare-list#DeleteFavorite');
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

/*const spareListTemplate = (model) => `
        ${model.reduce((html, card) => html + spareCardTemplate(card), '')}  
`;*/

const spareListTemplate =  async (model) => {
    let html = "";
    for (let i = 0; i < model.length; i++){
        let spare = await spareCardTemplate(model[i]);
        html += spare;
    }
    return html
}

/*
* блок - карточка запчасти
*/
const spareCardTemplate = async (cardModel) => {
    let listLikes;
    let dateTime = new Date(cardModel.time * 1000);
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
        console.debug(error)
    }
    return `
     
     <div class="services__content spare-content" id="spare-${cardModel.id}">
        <div class="services__box">
                <div class="spare-ad__box">
                        <div class="spare-ad__img">
                            <div class="swiper-container">
                                 <div class="swiper-wrapper">
                                  ${cardModel.imagesList.reduce((html, img) => html + '<div class="swiper-slide"><img src="https://tsl.kz/uploads/image' + img + '" alt="" width="400" height="263"></div>', '')}                           
                                  </div><!-- /swiper-wrapper -->
                                     
                                  <div class="swiper-pagination"></div>
                              </div><!-- /swiper-container -->
                            </div>
                        <div class="spare-ad__data">
                            <div class="box-spare__head">
                              <div class="box-spare__title">${cardModel.title}</div>
                         <!--     <div class="box-spare__price">${cardModel.companyPrice}</div>-->
                            </div>
                            <div class="box__text box-spare__text">
                              ${cardModel.description}
                            </div>
                            <ul class="box__service box__spare-item">  
                                <li class="box__service-title">Транспорт:</li>
                                ${cardModel.transporttypesList.reduce((html, name) => html + '<li class="box__item">' + name + '</li>', '')}                    
                            </ul>
                            <ul class="box__service box__spare-item"> 
                                <li class="box__service-title">Категория:</li>  
                             ${cardModel.categoriesList.reduce((html, name) => html + '<li class="box__item">' + name + '</li>', '')} 
                            </ul>
                        </div> 
                </div>               
               
                <div class="box__footer">
                  <div class="box__footer_row">
            
                    <div class="box__service-name">${cardModel.owner.name}
                      <a class="box__like" id="like-true-${cardModel.id}" data-action="click->spare-list#addLike" data-spare-list-type-param="spare"  data-spare-list-id-param="${cardModel.id}" data-spare-list-positive-param="true" >${listLikes.positive}</a>
                    <a class="box__dislike"  id="like-false-${cardModel.id}" data-action="click->spare-list#addLike" data-spare-list-type-param="spare"  data-spare-list-id-param="${cardModel.id}" data-spare-list-positive-param="false" >${listLikes.negative}</a>
                    </div>
                    <div class="box__service-address">
                      ${cardModel.location.name}, ${cardModel.location.address}
                    </div>
                  </div>
                  <div class="box__footer_row box__footer_row-contact">
                    <div class="box__contact cargo-box__contact">                
                  <a class="box__contact contact-link cargo-box__contact" data-action="click->spare-list#contacts">Показать контакты</a>
                
                 <div class="box__contact-data">
                   <p> ${cardModel.phoneList} </p>
                   <p>${cardModel.emailList}</p>
                </div>
            </div>
                    <div class="box__date-travel services__date-travel">
                      ${cardModel.createdAt}
                    </div> 
                       <div class="cargo-box__label cargo-box__label-new"  data-action="click->spare-list#favoritesAdd" data-spare-list-type-param="spare" data-spare-list-id-param="${cardModel.id}" ></div>
                  </div>
                </div>
        </div>
     </div>
`};
