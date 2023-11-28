/*
* для фильтр
* */


import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
export default class extends Controller {
    page = 1;
    filterFindText = 'Найдено по фильтру:';
    btnBeginning = 'В начало';
    btnMore = 'Загрузить еще';


    async favoritesAdd(event) {
        if(global.user !== null){
            try{
                let result = await api.AddFavorite(event.params.type, event.params.id);
                if (result.success) {
                    let id = '#' + event.params.type + '-' + event.params.id;
                    $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->filter#DeleteFavorite');
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
            $(id + ' .cargo-box__label').removeClass('active').attr('data-action', 'click->filter#favoritesAdd');
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

    filterClear() {
        $(".filter__form").trigger('reset');
        $('#fuel-type option[value=all]').prop('selected', true);
        $('.cityLoadAutocompete').val(null).trigger("change");
        $('#service').val(null).trigger("change");
        $('#transport-filter').val(null).trigger("change");
        $('#transport-type').val(null).trigger("change");
        $('#brand').val(null).trigger("change");

        document.getElementsByClassName("filter__form").scrollIntoView();
    }

    /* ГРУЗЫ */
 async  filterCargo(event) {
     document.getElementById("cargoFilterForm").scrollIntoView();
        let form = $("#cargoFilterForm")[0];
        let json = $(form).serializeObject();
        if(event.currentTarget.id === 'buttonFilter') {
            json.page = 1;
        } else {
            json.page = this.page;
        }
        try {
            let cargoList = await api.FindCargo(json);
            $('#cargoList').html(cargoListTemplate(cargoList.cargosList));
            $('#cargo-total').text(cargoList.found);
            $('#cargo-find').text(cargoList.cargosList.length);
            $('#cargo-find-text').text(this.filterFindText)
            if(cargoList.cargosList.length < 5) {
                $('.btn__download-more').text(this.btnBeginning);
                this.page = 0;
            } else {
                $('.btn__download-more').text(this.btnMore);
                json.page = this.page;
            }

        } catch (error) {
            console.debug(error)
        }

        try {
            let myFavorite = await  api.ListFavorites("cargo");
            myFavorite.favoriteList.forEach((favorite)=>{
                let id = '#'+favorite.entitytype + '-' + favorite.id;
                $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->filter#DeleteFavorite');
            });
        } catch (error) {
            console.debug(error)
        }
    }

         loadMore(event) {
      this.page++;
      this.filterCargo(event);
       $('#cargo-page').html(this.page);
          document.getElementById("cargoFilterForm").scrollIntoView()
          return false;
    }
    /* end ГРУЗЫ */

    /* ТРАНСПОРТ */
    async  filterTruck(event) {
        document.getElementById("transportFilterForm").scrollIntoView();
        let form = $("#transportFilterForm")[0];
        let json = $(form).serializeObject();
        if(event.currentTarget.id === 'buttonFilter') {
            json.page = 1;
        } else {
            json.page = this.page;
        }
        try {
            let truckList = await api.FindTruck(json);
            $('#transportList').html(truckListTemplate(truckList.trucksList));
            $('#truck-find').text(truckList.trucksList.length);
            $('#truck-find-text').text(this.filterFindText)
            if(truckList.trucksList.length < 5) {
                $('.btn__download-more').text(this.btnBeginning);
                this.page = 0;
            } else {
                $('.btn__download-more').text(this.btnMore);
                json.page = this.page;
            }

        } catch (error) {
            console.debug(error)
        }

        try {
            let myFavorite = await  api.ListFavorites("truck");
            myFavorite.favoriteList.forEach((favorite)=>{
                let id = '#'+favorite.entitytype + '-' + favorite.id;
                $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->filter#DeleteFavorite');
            });
        } catch (error) {
            console.debug(error)
        }
    }

           transportLoadMore(event) {
                this.page++;
                this.filterTruck(event);
               $('#truck-page').html(this.page);
               document.getElementById("transportFilterForm").scrollIntoView();
               return false
  }

    /* end ТРАНСПОРТ */


    /* СТО */
    async  filterSto(event) {
        document.getElementById("stoFilterForm").scrollIntoView();
        let form = $("#stoFilterForm")[0];
        let json = $(form).serializeObject();
        if(event.currentTarget.id === 'buttonFilter') {
            json.page = 1;
        } else {
            json.page = this.page;
        }
        $('#sto-on-map').attr('href', 'servise-map.html?' + $(form).serialize());
        try {
            let pageOffset = 3;
            if (json.page !== undefined){
                pageOffset = (json.page-1)*8
            }

            let stoList = await api.FindServiceStation(json,5,pageOffset);
            $('#sto-find').text(stoList.servicestationsList.length);
            $('#sto-find-text').text(this.filterFindText);
            $('#stoList').html(await stoListTemplate(stoList.servicestationsList));

            if(stoList.servicestationsList.length < 5) {
                $('.btn__download-more').text(this.btnBeginning);
                this.page = 0;
            } else {
                $('.btn__download-more').text(this.btnMore);
                json.page = this.page;
            }

        } catch (error) {
            console.debug(error)
        }

        try {
            let myFavorite = await  api.ListFavorites("sto");
            myFavorite.favoriteList.forEach((favorite)=>{
                let id = '#'+favorite.entitytype + '-' + favorite.id;
                $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->filter#DeleteFavorite');
            });
        }catch (error) {
            console.debug(error)
        }
    }

    stoLoadMore(event) {
        this.page++;
        this.filterSto(event);
        $('#sto-page').html(this.page);
        document.getElementById("stoFilterForm").scrollIntoView();
        return false
    }
    /* end СТО */

    /* ЗАПЧАСТИ */
    async  filterSpare(event) {
        document.getElementById("spareFilterForm").scrollIntoView();
        let form = $("#spareFilterForm")[0];
        let json = $(form).serializeObject();
        if(event.currentTarget.id === 'buttonFilter') {
            json.page = 1;
        } else {
            json.page = this.page;
        }
        try {
            let spareList = await api.FindSparePart(json);
            $('#spareList').html(spareListTemplate(spareList.sparepartsList));
            $('#spare-total').text(spareList.found);
            $('#spare-find').text(spareList.sparepartsList.length);
            $('#spare-find-text').text(this.filterFindText)
            if(spareList.sparepartsList.length < 5) {
                $('.btn__download-more').text(this.btnBeginning);
                this.page = 0;
            } else {
                $('.btn__download-more').text(this.btnMore);
                json.page = this.page;
            }

        } catch (error) {
            console.debug(error)
        }

        try {
            let myFavorite = await  api.ListFavorites("spare");
            myFavorite.favoriteList.forEach((favorite)=>{
                let id = '#'+favorite.entitytype + '-' + favorite.id;
                $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->filter#DeleteFavorite');
            });
        }
        catch (error) {
            console.debug(error)
        }
    }

            spareLoadMore(event) {
                this.page++;
                this.filterSpare(event);
                $('#spare-page').html(this.page);
                document.getElementById("spareFilterForm").scrollIntoView();
                return false
  }
    /* end ЗАПЧАСТИ */


    /* ПОКУПКА АВТО */
    async  filterAuto(event) {
        document.getElementById("autoFilterForm").scrollIntoView();
        let form = $("#autoFilterForm")[0];
        let json = $(form).serializeObject();
        if(event.currentTarget.id === 'buttonFilter') {
            json.page = 1;
        } else {
            json.page = this.page;
        }
        try {
            let avtoList = await api.FindTransport(json);
            $('#avtoList').html(avtoListTemplate(avtoList.transportsList));
            $('#avto-find').text(avtoList.transportsList.length);
            $('#avto-find-text').text(this.filterFindText)
            if(avtoList.transportsList.length < 5) {
                $('.btn__download-more').text(this.btnBeginning);
                this.page = 0;
            } else {
                $('.btn__download-more').text(this.btnMore);
                json.page = this.page;
            }

        } catch (error) {
            console.debug(error)
        }

        try {
            let myFavorite = await  api.ListFavorites("auto");
            myFavorite.favoriteList.forEach((favorite)=>{
                let id = '#'+favorite.entitytype + '-' + favorite.id;
                $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->filter#DeleteFavorite');
            });
        } catch (error) {
            console.debug(error)
        }
    }

    autoLoadMore(event) {
        this.page++;
        this.filterAuto(event);
        $('#truck-page').html(this.page);
        document.getElementById("autoFilterForm").scrollIntoView();
        return false
    }
    /* end ПОКУПКА АВТО */

    /* ПРИДОРОЖНЫЕ ЗАВЕДЕНИЯ */
    async  filterRoadside(event) {
        document.getElementById("roadsideFilterForm").scrollIntoView();
        let form = $("#roadsideFilterForm")[0];
        let json = $(form).serializeObject();
        $('#roadside-on-map').attr('href', 'roadside-map.html?' + $(form).serialize());
        if(event.currentTarget.id === 'buttonFilter') {
            json.page = 1;
        } else {
            json.page = this.page;
        }
        try {
            let roadsideList = await api.FindRoadsideService(json);
            $('#roadsidesList').html(roadsideListTemplate(roadsideList.roadsideservicesList));
            $('#roadside-find').text(roadsideList.roadsideservicesList.length);
            $('#roadside-find-text').text(this.filterFindText)
            if(roadsideList.roadsideservicesList.length < 5) {
                $('.btn__download-more').text(this.btnBeginning);
                this.page = 0;
            } else {
                $('.btn__download-more').text(this.btnMore);
                json.page = this.page;
            }

        } catch (error) {
            console.debug(error)
        }

        try {
            let myFavorite = await  api.ListFavorites("roadside");
            myFavorite.favoriteList.forEach((favorite)=>{
                let id = '#'+favorite.entitytype + '-' + favorite.id;
                $(id + ' .cargo-box__label').addClass('active').attr('data-action', 'click->filter#DeleteFavorite');
            });
        } catch (error) {
            console.debug(error)
        }
    }

    roadsideLoadMore(event) {
        this.page++;
        this.filterRoadside(event);
        document.getElementById("roadsideFilterForm").scrollIntoView();
        return false
    }

    /* end ПРИДОРОЖНЫЕ ЗАВЕДЕНИЯ */

    contacts() {
        $(event.currentTarget).addClass('cargo-box__contact--hide');
    }
    contactsSto() {
        $(event.currentTarget).addClass('box__contact-btn--hide');
    }



    connect() {

    }

}

/* !!!! ГРУЗ !!!! */
const cargoListTemplate = (model) => `
        ${model.reduce((html, card) => html + cargoCardTemplate(card), '')}  
`;

const cargoCardTemplate = (cardModel) => {
    let dateTime = new Date(cardModel.time * 1000);
    if(cardModel.location === undefined){
        cardModel.location = {name:'Не найдено', address:'Не найдено'}
    }

    let autoType = cardModel.transporttypeList[0];
    let weightType = `<div class="cargo-box__description">Вес:<span>${cardModel.weight} т.</span></div><div class="cargo-box__description">Объем:<span>${cardModel.volume} м<sup>3</sup></span></div>`;
    if(autoType === 'автобус'){
        weightType = `<div class="cargo-box__description">Мест:<span>${cardModel.weight}</span></div>`
    }
    return `
    
   <div class="cargo__card" id="cargo-${cardModel.id}">
       <div class="cargo-box__row cargo-box__row-header cargo-box__row-headernew">
                  <a class="cargo-box__data icon-map" title="Посмотреть карту маршрута" href="route-cargo.html?=${cardModel.id}">
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

                    <a class="box__contact contact-link cargo-box__contact" data-action="click->filter#contacts">Показать контакты</a>
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
                    <div class="cargo-box__label cargo-box__label-new"  data-action="click->filter#favoritesAdd" data-filter-type-param="cargo" data-filter-id-param="${cardModel.id}" ></div>
                </div>
    </div>
`};
/* !!!! end ГРУЗ !!!! */

/* !!!! ТРАНСПОРТ !!!! */
const truckListTemplate = (model) => `
        ${model.reduce((html, card) => html + truckCardTemplate(card), '')}  
`;
const truckCardTemplate = (cardModel) => {
    let dateTime = new Date(cardModel.time * 1000);
    if(cardModel.location === undefined){
        cardModel.location = {name:'Не найдено', address:'Не найдено'}
    }
    let autoType = cardModel.transporttypeList[0];
    let weightType = `<div class="cargo-box__description">Вес:<span>${cardModel.weight} т.</span></div><div class="cargo-box__description">Объем:<span>${cardModel.volume} м<sup>3</sup></span></div>`;
    if(autoType === 'автобус'){
        weightType = `<div class="cargo-box__description">Мест:<span>${cardModel.weight}</span></div>`
    }

    return `
    
    <!-- card -->
    <div class="cargo__card" id="truck-${cardModel.id}">
       <div class="cargo-box__row cargo-box__row-header cargo-box__row-headernew">
                    <a class="cargo-box__data  icon-map" title="Посмотреть карту маршрута" href="route-truck.html?=${cardModel.id}" >
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

                    <a class="box__contact contact-link cargo-box__contact" data-action="click->filter#contacts">Показать контакты</a>
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
                   <div class="cargo-box__label cargo-box__label-new"  data-action="click->filter#favoritesAdd" data-filter-type-param="truck" data-filter-id-param="${cardModel.id}" ></div>
                </div>
    </div>
    <!-- /card -->

`};
/* !!!! end ТРАНСПОРТ !!!! */


/* !!!! СТО !!!! */
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
                   <a class="box__like" id="like-true-${cardModel.id}" data-action="click->filter#addLike" data-filter-type-param="sto"  data-filter-id-param="${cardModel.id}" data-filter-positive-param="true" >${listLikes.positive}</a>
                    <a class="box__dislike"  id="like-false-${cardModel.id}" data-action="click->filter#addLike" data-filter-type-param="sto"  data-filter-id-param="${cardModel.id}" data-filter-positive-param="false" >${listLikes.negative}</a>
                </div>
                <div class="box__service-address">
                  ${cardModel.location.name}, ${escapeHtml(cardModel.location.address)}
                </div>
            </div>
            <div class="box__footer_row box__footer_row-contact">
                <div class="box__contact">
                    <button class="box__contact-btn" data-action="click->filter#contactsSto">Показать контакты</button>                
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
/* !!!! end СТО !!!! */



/* !!!! ЗАПЧАСТИ !!!! */
const spareListTemplate = (model) => `
        ${model.reduce((html, card) => html + spareCardTemplate(card), '')}  
`;
const spareCardTemplate = (cardModel) => {
    let dateTime = new Date(cardModel.time * 1000);
    if(cardModel.location === undefined){
        cardModel.location = {name:'Не найдено', address:'Не найдено'}
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
                      <span class="box__like">5</span>
                      <span class="box__dislike">5</span>
                    </div>
                    <div class="box__service-address">
                     ${cardModel.location.name}, ${cardModel.location.address}
                    </div>
                  </div>
                  <div class="box__footer_row box__footer_row-contact">
                    <div class="box__contact cargo-box__contact">                
                  <a class="box__contact contact-link cargo-box__contact" data-action="click->filter#contacts">Показать контакты</a>
                
                 <div class="box__contact-data">
                   <p> ${cardModel.phoneList} </p>
                   <p>${cardModel.emailList}</p>
                </div>
            </div>
                    <div class="box__date-travel services__date-travel">
                      ${cardModel.createdAt}
                    </div> 
                      <div class="cargo-box__label cargo-box__label-new"  data-action="click->filter#favoritesAdd" data-filter-type-param="spare" data-filter-id-param="${cardModel.id}" ></div>
                  </div>
                </div>
        </div>
     </div>
`};
/* !!!! end ЗАПЧАСТИ !!!! */

/* !!!! автотранспорт продажа !!!! */
const avtoListTemplate = (model) => `   
        ${model.reduce((html, card) => html + avtoCardTemplate(card), '')}   
    `;
const avtoCardTemplate = (cardModel) => {
    let dateTime = new Date(cardModel.time * 1000);
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
                              <div class="cargo-box__label cargo-box__label-new"  data-action="click->filter#favoritesAdd" data-filter-type-param="auto" data-filter-id-param="${cardModel.id}" ></div>
                      </div><!-- /avto-add__row -->
                </div><!-- /content-box__info -->
            </div><!-- /roadside-box-->
        </div><!-- /roadside__content-box-->

 
`};
/* !!!! end автотранспорт продажа !!!! */



/* !!!! придорожный сервис !!!! */
const roadsideListTemplate = (model) => `   
        ${model.reduce((html, card) => html + roadsideCardTemplate(card), '')}   
    `;
const roadsideCardTemplate = (cardModel) => {
    if(cardModel.location === undefined){
        cardModel.location = {name:'Не найдено', address:'Не найдено'}
    }
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
                        <span class="like">5</span>
                        <span class="dislike">5</span>
                      </div>
                      
                    <div class="content-block-fix">
                        <div class="content-block-text">
                            <p>${cardModel.description}</p>
                        </div>
                        <div class="show-all-container">
                            <button class="show-all">Показать полностью</button>    
                        </div>
                    </div>
                      
                        <div class="cargo-box__label cargo-box__label-new"  data-action="click->filter#favoritesAdd" data-filter-type-param="roadside" data-filter-id-param="${cardModel.id}" ></div>
                        
                      <button class="top-sto__box-btn" data-action="click->filter#contacts">Показать контакты</button>
               <div class="top-sto__contact">
               <p>  ${cardModel.phoneList.reduce((html, phone) => html + '<a href="tel:+' + phone.replace(/\D/g, '') + '" class="contact-link">' + phone + '</a><br>', '')}   </p>
                <p>  ${cardModel.emailList.reduce((html, email) => html + '<a href=mailto:"' + email +'" class="contact-link">' + email + '</a><br>', '')}   </p> 
                </div>     
                    </div>
                  </div>
                </div> 
`};
/* !!!! end  придорожный сервис !!!! */

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