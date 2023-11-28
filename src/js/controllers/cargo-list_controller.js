/*
* для блока груз в казахстане
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import {Geo} from "../../protos/cargo_pb";


export default class extends Controller {
    static values = { limit: Number }
    contacts() {
        $(event.currentTarget).addClass('cargo-box__contact--hide');
    }

    filterCargo() {
        let form = $("#cargoFilterForm")[0];
        let json = $(form).serializeObject();

    }


    async favoritesAdd(event) {
        if(global.user !== null){

            try{
                let result = await api.AddFavorite(event.params.type, event.params.id);

                if (result.success) {
                    let id = '#' + event.params.type + '-' + event.params.id;
                    $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->cargo-list#DeleteFavorite');
                }
            } catch(error) {
                console.debug(error) }
        } else {
            $(location).attr("href", "lk-enter.html");
        }



    }

    async DeleteFavorite(event) {

        let result = await api.DeleteFavorite(event.params.type, event.params.id);
        if (result.success) {
            let id = '#' + event.params.type + '-' + event.params.id;
            $(id + ' .cargo-box__label').removeClass('active').attr('data-action', 'click->cargo-list#favoritesAdd');
        }
    }

    async connect() {

         $('.current-country-name').text(global.country.name);
        try {
            let cargoList = await api.FindCargo({pointLoading:[global.country.id], pointUnloading:[global.country.id], shipmentdateFrom:'', shipmentdateUntil:'',weightFrom: '', weightUntil: '', volumeFrom: '', volumeUntil: '', typeLoad:[], cargoType: -1}, Geo.geo_type.COUNTRY, Geo.geo_type.COUNTRY);

            $('#cargoList').html(await cargoListTemplate(cargoList.cargosList));
            $('#cargo-total').text(cargoList.found);
            $('#cargo-find').text(cargoList.cargosList.length);
            if(cargoList.cargosList.length < 5) {
                $('.btn__download-more').remove();
            }

            let myFavorite = await  api.ListFavorites("cargo");

            myFavorite.favoriteList.forEach((favorite)=>{
                let id = '#'+favorite.entitytype + '-' + favorite.id;
                $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->cargo-list#DeleteFavorite');
            })

        } catch (error) {
            console.debug(error)
        }
    }


}

/* колонки - обертки для
    * список блоков груз в КЗ
*/
/*
const cargoListTemplate = (model) => `
        ${model.reduce((html, card) => html + cargoCardTemplate(card), '')}  
`;
*/


const cargoListTemplate =  async (model) => {
    let html = "";
    for (let i = 0; i < model.length; i++){
        let cargo = await cargoCardTemplate(model[i]);
        html += cargo;
    }
    return html
}


/*
* блок - карточка груз в КЗ
*/
const cargoCardTemplate = async (cardModel) => {
    let dateTime = new Date(cardModel.time * 1000);
    let company;
    try {
        let user = await api.GetUserById(cardModel.owner.id);
        company = await api.GetCompanyByUserEmail(user.email);
    } catch (error) {
        console.debug(error);
    }

    let autoType = cardModel.transporttypeList[0];
    let weightType = `<div class="cargo-box__description">Вес:<span>${cardModel.weight} т.</span></div><div class="cargo-box__description">Объем:<span>${cardModel.volume} м<sup>3</sup></span></div>`;
    if(autoType === 'автобус'){
        weightType = `<div class="cargo-box__description">Мест:<span>${cardModel.weight}</span></div>`
    }

    let html = `
    <!-- version card -->
    <div class="cargo__card" id="cargo-${cardModel.id}">
       <div class="cargo-box__row cargo-box__row-header cargo-box__row-headernew">
                  <a class="cargo-box__data icon-map" title="Посмотреть карту маршрута" href="route-cargo.html?=${cardModel.id}" >
                    <div class="cargo-item__row cargo-item__row-new">
                      <span class="cargo-box__title">Погрузка:</span>
                       ${cardModel.loadingpointsList.reduce((html, card, index) => html + cityTemplate(card, index), '')} 
                    </div>
                    <div class="cargo-item__row cargo-item__row-new">
                      <span class="cargo-box__title">Выгрузка:</span>
                       ${cardModel.unloadingpointsList.reduce((html, card, index) => html + cityTemplate(card, index), '')} 
                    </div>
                  </a>
                  <div class="cargo-box__price">                    
                    <span>${cardModel.cost}</span> ${cardModel.currency} 
                  </div>
                </div>
    `
    if (company !== undefined){
        html+= `
        <!-- если есть компания то показываем блок -->
        <div class="cargo-box__row cargo-box__row-date cargo-box__row-date-new">
            <div class="cargo-box__company">
              ${escapeHtml(company.name)} 
            </div>

            <div class="cargo-box__company-contact">
                <a class="box__contact contact-link cargo-box__contact" data-action="click->cargo-list#contacts">Показать контакты</a>
                <div class="box__contact-data">
                    <p class="box__contact-data-item">
                    <a href="tel:${company.phone}.replace(/\\D/g, '')" class="contact-link">${company.phone}</a>
</p>
                    
                    <p class="box__contact-data-item">
                        <a class="contact-link" href="mailto:${company.email}">${company.email}</a>
                    </p>  
                </div>

            </div>

            <div class="box__date-travel box__date-travel--noicon">
                на сайте с ${company.createdat}
            </div>
        </div>
        <!-- /если есть компания то показываем блок -->
        `
    }

  html+= ` 
   <div class="cargo-box__row cargo-box__row-date cargo-box__row-date-new">
                  <div class="cargo-box__date">
                    <span>${cardModel.from} </span>
                    -
                    <span>${cardModel.till}</span>
                  </div>
               
                  
                  <div class="cargo-box__name cargo-box__name-new">
                    <strong class="cargo-box__nametitle">${escapeHtml(cardModel.owner.name)} </strong>

                    <a class="box__contact contact-link cargo-box__contact" data-action="click->cargo-list#contacts">Показать контакты</a>
                    <div class="box__contact-data">                        
                         ${cardModel.additionalphonesList.reduce((html, phone) => html + '<p class="box__contact-data-item"><a href="tel:+' + phone.replace(/\D/g, '') + '" class="contact-link">' + phone + '</a></p>', '')}   
${cardModel.additionalmailsList.reduce((html, email) => html + '<p class="box__contact-data-item"><a href=mailto:"' + email +'" class="contact-link">' + email + '</a></p>', '')}   
                    </div>
                    
                  </div>
                  <div class="box__date-travel cargo-box__date-travel">
                  ${cardModel.createdAt}   
                  </div>
                </div>        
        <div class="cargo-box__row cargo-box__row-description cargo-box__row-description-new">
                ${weightType}
                 
                  <div class="cargo-box__description">
                    Тип транспорта:
                    <span>${cardModel.transporttypeList[0]}</span>
                  </div>
                  <div class="cargo-box__description">
                    Вид погрузки:
                    <span> ${cardModel.loadingtypeList} </span>
                  </div>

                  <div class="cargo-box__description">
                    Дополнительно:
                    <span>${cardModel.additionList}</span>
                  </div>  
         
                      <div class="cargo-box__label cargo-box__label-new"  data-action="click->cargo-list#favoritesAdd" data-cargo-list-type-param="cargo" data-cargo-list-id-param="${cardModel.id}" ></div>
                
                </div>
    </div>
    <!-- / card -->

`
    return html
};

/*
* блок - список городов - пункты назначения
* == находится внутри div.cargo-item__row
*/
const cityTemplate = (cardModel, index) => {
    if (index === 0) {
        return `
        <div class="cargo-box__city">
            ${cardModel.name}
        </div>                             
`;
    } else {
        return `
        <div class="cargo-box__city cargo-box__city-arrow">
            ${cardModel.name}
        </div>                             
`;
    }
}


