/*
 список избранное
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"

export default class extends Controller {
    async DeleteFavorite(event) {

        let result = await api.DeleteFavorite(event.params.type, event.params.id);
        if (result.success) {
            let id = '#' + event.params.type + '-' + event.params.id;
            $(id).remove();
        }
    }

    contacts() {
        $(event.currentTarget).addClass('cargo-box__contact--hide');
    }

    contactSto(){
        $(event.currentTarget).addClass('box__contact-btn--hide');
    }

    contactRoadside(){
        $(event.currentTarget).addClass('top-sto__box-btn--hide');
    }

    async cargoFavorite(idCargos){
        let favbox = $('#favorites-cargo');
      /*  favbox.append('<strong>Груз</strong>');*/
        try {
            idCargos.forEach(async (id)=> {
                let cargo = await api.GetCargo(id.id);

                favbox.append(cargoCardTemplate(cargo, 'cargo'));
            });
        } catch(error) {
            console.debug(error)
        }
    }

    async truckFavorite(idTrucks){
        let favbox = $('#favorites-truck');
       /* favbox.append('<strong>Транспорт</strong>');*/
        try {
            idTrucks.forEach(async (id)=> {
                let truck = await api.GetTruck(id.id);

                favbox.append(cargoCardTemplate(truck, 'truck'));
            });
        } catch(error) {
            console.debug(error)
        }
    }

    async stoFavorite(idSto){
        let favbox = $('#favorites-sto');
        /*favbox.append('<strong>СТО</strong>');*/
        try {
            idSto.forEach(async (id)=> {
                let sto = await api.GetServiceStation(id.id);

                favbox.append(stoCardTemplate(sto, 'sto'));
            });
        } catch(error) {
            console.debug(error)
        }
    }

    async stotopFavorite(idSto){
        let favbox = $('#favorites-sto');
        /*favbox.append('<strong>СТО топ</strong>');*/
        try {
            idSto.forEach(async (id)=> {
                let sto = await api.GetServiceStation(id.id);

                favbox.append(stoCardTemplate(sto, 'stotop'));
            });
        } catch(error) {
            console.debug(error)
        }
    }

    async spareFavorite(idSpares){
        let favbox = $('#favorites-spare');
        /*favbox.append('<strong>Запчасти</strong>');*/
        try {
            idSpares.forEach(async (id)=> {
                let spare = await api.GetSparePart(id.id);

                favbox.append(spareCardTemplate(spare, 'spare'));
            });
        } catch(error) {
            console.debug(error)
        }
    }

    async roadsideFavorite(idRoadsides){
        let favbox = $('#favorites-roadside');
        /*favbox.append('<strong>Придорожный сервис</strong>');*/
        try {
            idRoadsides.forEach(async (id)=> {
                let roadside = await api.GetRoadsideService(id.id);

                favbox.append(roadsideCardTemplate(roadside, 'roadside'));
            });
        } catch(error) {
            console.debug(error)
        }
    }

    async transportFavorite(idTransports){
        let favbox = $('#favorites-auto');
     /*   favbox.append('<strong>Транспорт</strong>');*/
        try {
            idTransports.forEach(async (id)=> {
                let avto = await api.GetTransport(id.id);

                favbox.append(avtoCardTemplate(avto, 'auto'));
            });
        } catch(error) {
            console.debug(error)
        }
    }

    async connect() {
        try {
            let advFavorite = ['cargo', 'truck', 'sto', 'stotop','spare', 'roadside', 'auto']
            let self = this;

            advFavorite.forEach(async function(type){
                let myFavorite = await  api.ListFavorites(type);

                let title = "";
                switch (type){
                    case 'cargo':
                        await self.cargoFavorite(myFavorite.favoriteList)
                        break
                    case 'truck':
                        await self.truckFavorite(myFavorite.favoriteList)
                        break
                    case 'sto':
                        await self.stoFavorite(myFavorite.favoriteList)
                        break
                    case 'stotop':
                        await self.stotopFavorite(myFavorite.favoriteList)
                        break
                    case 'spare':
                        await self.spareFavorite(myFavorite.favoriteList)
                        break
                    case 'roadside':
                        await self.roadsideFavorite(myFavorite.favoriteList)
                        break
                    case 'auto':
                        await self.transportFavorite(myFavorite.favoriteList)
                        break
                }

            });

        } catch (error) {
            console.debug(error)
        }
    }


}

/*
* блок - карточка груз в КЗ
*/
const cargoCardTemplate = (cardModel, type) => {
    let dateTime = new Date(cardModel.time * 1000);
    return `
    
    <!-- version card -->
    <div class="cargo__card" id="${type}-${cardModel.id}">
       <div class="cargo-box__row cargo-box__row-header cargo-box__row-headernew">
                  <div class="cargo-box__data">
                    <div class="cargo-item__row cargo-item__row-new">
                      <span class="cargo-box__title">Погрузка:</span>
                       ${cardModel.loadingpointsList.reduce((html, card, index) => html + cityTemplate(card, index), '')} 
                    </div>
                    <div class="cargo-item__row cargo-item__row-new">
                      <span class="cargo-box__title">Выгрузка:</span>
                       ${cardModel.unloadingpointsList.reduce((html, card, index) => html + cityTemplate(card, index), '')} 
                    </div>
                  </div>
                  <div class="cargo-box__price">
                    от
                    <span>${cardModel.cost}</span> ${cardModel.currency} 
                  </div>
                </div>
        
        <div class="cargo-box__row cargo-box__row-date cargo-box__row-date-new">
                  <div class="cargo-box__date">
                    <span>${cardModel.from} </span>
                    -
                    <span>${cardModel.till}</span>
                  </div>
                  <div class="cargo-box__name cargo-box__name-new">
                    <strong class="cargo-box__nametitle">${cardModel.owner.name} </strong>

                    <a class="box__contact contact-link cargo-box__contact" data-action="click->favorites#contacts">Показать контакты</a>
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
                  <div class="cargo-box__description">
                    Вес:
                    <span>${cardModel.weight} т</span>
                  </div>
                  <div class="cargo-box__description">
                    Объем:
                    <span>${cardModel.volume} м<sup>3</sup></span>
                  </div>
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
         
                       <div class="cargo-box__label active cargo-box__label-new"  data-action="click->favorites#DeleteFavorite" data-favorites-type-param="${type}" data-favorites-id-param="${cardModel.id}" ></div>
                
                </div>
    </div>
    <!-- / card -->

`};
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

/*
* блок - карточка СТО
*/
const stoCardTemplate = (cardModel, type) => {
    let dateTime = new Date(cardModel.time * 1000);
    return `
    <div class="services__content" id="sto-${cardModel.id}">
        <div class="services__box">
        <div class="box-top">
            <div class="box-header">
                <div class="box-header__title">${cardModel.title}</div>               
            </div>
            <p class="box__text">${cardModel.description}             
            </p>           
           
            <div class="box__service">
               ${cardModel.categoriesList.reduce((html, servise) => html + '<div class="box__item">' + servise + '</div>', '')}  
            </div>
        </div>
        <div class="box__footer">
            <div class="box__footer_row">
                <div class="box__service-name">${cardModel.owner.name}
                   <!-- <span class="box__like">5</span>
                    <span class="box__dislike">5</span>-->
                </div>
                <div class="box__service-address">
                  ${cardModel.location.name}, ${cardModel.location.address}  
                </div>
            </div>
            <div class="box__footer_row box__footer_row-contact">
                <div class="box__contact">
                    <button class="box__contact-btn" data-action="click->favorites#contactSto">Показать контакты</button>                
                     <div class="box__contact-data">
                       ${cardModel.phoneList.reduce((html, phone) => html + '<p class="box__contact-data-item"><a href="tel:+' + phone.replace(/\D/g, '') + '" class="contact-link">' + phone + '</a></p>', '')}   
${cardModel.emailList.reduce((html, email) => html + '<p class="box__contact-data-item"><a href=mailto:"' + email +'" class="contact-link">' + email + '</a></p>', '')}    
                     </div>
                </div>
                
                <div class="box__date-travel services__date-travel">
                    ${cardModel.createdAt}
                </div>
                
                  <div class="cargo-box__label active cargo-box__label-new"  data-action="click->favorites#DeleteFavorite" data-favorites-type-param="${type}" data-favorites-id-param="${cardModel.id}" ></div>
            </div>
        </div>
    </div>
    </div> 
`};

/*
* блок - карточка запчасти
*/
const spareCardTemplate = (cardModel, type) => {
    let dateTime = new Date(cardModel.time * 1000);
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
                    <!--  <span class="box__like">5</span>
                      <span class="box__dislike">5</span>-->
                    </div>
                    <div class="box__service-address">
                     ${cardModel.location.name}, ${cardModel.location.address}
                    </div>
                  </div>
                  <div class="box__footer_row box__footer_row-contact">
                    <div class="box__contact cargo-box__contact">                
                  <a class="box__contact contact-link cargo-box__contact" data-action="click->favorites#contacts">Показать контакты</a>
                
                 <div class="box__contact-data">
                   <p> ${cardModel.phoneList} </p>
                   <p>${cardModel.emailList}</p>
                </div>
            </div>
                    <div class="box__date-travel services__date-travel">
                      ${cardModel.createdAt}
                    </div> 
                        <div class="cargo-box__label active cargo-box__label-new"  data-action="click->favorites#DeleteFavorite" data-favorites-type-param="${type}" data-favorites-id-param="${cardModel.id}" ></div>
                  </div>
                </div>
        </div>
     </div>
`};


/*
* блок - карточка придорожное заведение
*/
const roadsideCardTemplate = (cardModel, type) => {
    let roadsiteType = "";
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
                      <div class="top-sto__name content-box__name">${cardModel.title}</div>
                      <div class="top-sto__direction"> ${cardModel.location.name}, ${cardModel.location.address}</div>
                      <div class="top-sto__review content-box__review">Отзывов:
                        <span class="top-sto__namb">${cardModel.likes}</span>
                      <!--  <span class="like">5</span>
                        <span class="dislike">5</span>-->
                      </div>
                      
                    <div class="content-block-fix">
                        <div class="content-block-text">
                            <p>${cardModel.description}</p>
                        </div>
                        <div class="show-all-container">
                            <button class="show-all">Показать полностью</button>    
                        </div>
                    </div>
                      
                          <div class="cargo-box__label active cargo-box__label-new"  data-action="click->favorites#DeleteFavorite" data-favorites-type-param="${type}" data-favorites-id-param="${cardModel.id}" ></div>
                      
                      <button class="top-sto__box-btn" data-action="click->favorites#contactRoadside">Показать контакты</button>
               <div class="top-sto__contact">
               <p>  ${cardModel.phoneList.reduce((html, phone) => html + '<a href="tel:+' + phone.replace(/\D/g, '') + '" class="contact-link">' + phone + '</a><br>', '')}   </p>
                <p>  ${cardModel.emailList.reduce((html, email) => html + '<a href=mailto:"' + email +'" class="contact-link">' + email + '</a><br>', '')}   </p> 
                </div>     
                    </div>
                  </div>
                </div> 
`};


/*
* блок - карточка транспорт в КЗ
*/
const avtoCardTemplate = (cardModel) => {
    let dateTime = new Date(cardModel.time * 1000);


    return `
        <div class="roadside__content-box"  id="auto-${cardModel.id}">
            <div class="roadside-box">
                <div class="swiper-container">
                     <div class="swiper-wrapper">
                                  ${cardModel.imagesList.reduce((html, img) => html + '<div class="swiper-slide"><img src="https://tsl.kz/uploads/image' + img + '" alt="" width="400" height="263"></div>', '')}                           
                     </div><!-- /swiper-wrapper -->
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
                               Толиво: ${cardModel.fueltype},  <br>
                               КПП: ${cardModel.transmission} 
                       </p>
                      <p>объем двигателя: ${cardModel.engine}<br>
пробег: ${cardModel.mileage} км</p>
                        <p>${cardModel.salestype}, ${cardModel.availability}</p>
                      
                        <div class="avto-add__row">
                            <div class="sity__ad">${cardModel.location.name}</div>
                            <div class="date__ad"> ${cardModel.createdAt}</div>
                             <div class="cargo-box__label active cargo-box__label-new"  data-action="click->favorites#DeleteFavorite" data-favorites-type-param="auto" data-favorites-id-param="${cardModel.id}" ></div>
                      </div><!-- /avto-add__row -->
                      
                        <button class="top-sto__box-btn" data-action="click->favorites#contactRoadside">Показать контакты</button>
               <div class="top-sto__contact">
                
               
               
                     <p>${cardModel.phonesList.reduce((html, phone) => html + phone + '<br>', '')}  </p>
                     <p>${cardModel.emailsList.reduce((html, email) => html + email + '<br>', '')}  </p>
                     
                </div>  
                </div><!-- /content-box__info -->
            </div><!-- /roadside-box-->
        </div><!-- /roadside__content-box-->

 
`};

