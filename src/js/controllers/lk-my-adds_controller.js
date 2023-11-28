/*
 мои объявления
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import datetimepicker from 'jquery-datetimepicker'

export default class extends Controller {
     contacts() {
        $(event.currentTarget).addClass('cargo-box__contact--hide');
    }

    contactSto(){
        $(event.currentTarget).addClass('box__contact-btn--hide');
    }

    contactRoadside(){
        $(event.currentTarget).addClass('top-sto__box-btn--hide');
    }

    dateFilterYesterday() {
        //определяем текущую дату
        let currentDate = new Date();

        //определяем вчерашнюю дату
        let yesterdayDate =  new Date(new Date().setDate(new Date().getDate() - 1));

        //преобразуем дату вид дд.мм.гггг + ставим дату в инпуты От и ДО
        $('#shipmentdate-from').val(yesterdayDate.toLocaleDateString('ru-Ru'));
        $('#shipmentdate-to').val(currentDate.toLocaleDateString('ru-Ru'));
    }

    dateFilterToday() {
        //определяем текущую дату
        let currentDate = new Date();

        //преобразуем дату в вид дд.мм.гггг + ставим дату в инпуты От и ДО
        $('#shipmentdate-from').val(currentDate.toLocaleDateString('ru-Ru'));
        $('#shipmentdate-to').val(currentDate.toLocaleDateString('ru-Ru'));
    }

    dateFilterWeek() {
        //определяем текущую дату
        let currentDate = new Date();

        //определяем дату неделя назад
        let weekDate =  new Date(new Date().setDate(new Date().getDate() - 7));

        //преобразуем дату в вид дд.мм.гггг + ставим дату в инпуты От и ДО
        $('#shipmentdate-from').val(weekDate.toLocaleDateString('ru-Ru'));
        $('#shipmentdate-to').val(currentDate.toLocaleDateString('ru-Ru'));
    }

    dateFilterMonth() {
        //определяем текущую дату
        let currentDate = new Date();

        //определяем дату месяц назад
        let monthDate =  new Date(new Date().setMonth(new Date().getMonth() - 1));

        //преобразуем дату в вид дд.мм.гггг + ставим дату в инпуты От и ДО
        $('#shipmentdate-from').val(monthDate.toLocaleDateString('ru-Ru'));
        $('#shipmentdate-to').val(currentDate.toLocaleDateString('ru-Ru'));
    }

    dateFilterYear() {
        //определяем текущую дату
        let currentDate = new Date();

        //определяем дату месяц назад
        let yearDate =  new Date(new Date().setMonth(new Date().getMonth() - 12));

        //преобразуем дату в вид дд.мм.гггг +  ставим дату в инпуты От и ДО
        $('#shipmentdate-from').val(yearDate.toLocaleDateString('ru-Ru'));
        $('#shipmentdate-to').val(currentDate.toLocaleDateString('ru-Ru'));
    }

    dateFilterAll() {
        $("#dateFilterForm").trigger('reset');
    }



   async dateFilter(){
        let form = $("#dateFilterForm")[0];
        let json = $(form).serializeObject();
        let dateFrom = json.shipmentdateFrom;
        let dateTo = json.shipmentdateUntil;
         if (dateFrom !== '' && dateTo !== "") {
             let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
             let dateFromDate = new Date(dateFrom.replace(pattern,'$3-$2-$1'));
             let dateToDate = new Date(dateTo.replace(pattern,'$3-$2-$1'));
             await this.lists(dateFromDate, dateToDate);
         } else {
             await this.lists();
         }
    }

    /* груз */
    async ListMyCargo(from, to){
        let advMyBox = $('#myAds-cargo');
        advMyBox.html('');
        try {
            let cargo = await api.ListMyCargo();
            if (from !== undefined && to !== undefined) {
                cargo.cargo.cargosList = cargo.cargo.cargosList.filter(function (item){
                    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
                    let dateCreate = new Date(item.createdAt.replace(pattern,'$3-$2-$1'));
                    return from <= dateCreate && to >= dateCreate
                })
            }

            cargo.cargo.cargosList.forEach(
                (item)=>{
                      advMyBox.append(cargoCardTemplate(item, 'cargo'));
                }


            );


        } catch(error) {
            console.debug(error)
        }
    }

    async DeleteCargo(event){
        let delItem = 'cargo-' + event.params.id
        try {
            let result = await api.DeleteCargo(event.params.id);

            if (result.success) {
                $('#' + delItem).remove();
            }
        }  catch (error) {
            console.debug(error)
        }
    }
    /* /груз */


    /* транспорт */
    async ListMyTruck(from, to){
        let advMyBox = $('#myAds-truck');
        advMyBox.html('');
        try {
            let truck = await api.ListMyTruck();
            if (from !== undefined && to !== undefined) {
                truck.truck.trucksList = truck.truck.trucksList.filter(function (item){
                    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
                    let dateCreate = new Date(item.createdAt.replace(pattern,'$3-$2-$1'));
                    return from <= dateCreate && to >= dateCreate
                })
            }


            truck.truck.trucksList.forEach(
                (item)=>{
                    advMyBox.append(truckCardTemplate(item, 'truck'));
                }
            );


        } catch(error) {
            console.debug(error)
        }
    }

    async DeleteTruck(event){
        let delItem = 'truck-' + event.params.id
        try {
            let result = await api.DeleteTruck(event.params.id);

            if (result.success) {
                $('#' + delItem).remove();
            }
        }  catch (error) {
            console.debug(error)
        }
    }
    /* /транспорт */


    /* СТО */
    async ListMyServiceStation(from, to){
        let advMyBox = $('#myAds-sto');
        advMyBox.html('');
        try {
            let sto = await api.ListMyServiceStation();

            if (from !== undefined && to !== undefined) {
                sto.servicestation.servicestationsList = sto.servicestation.servicestationsList.filter(function (item){
                    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
                    let dateCreate = new Date(item.createdAt.replace(pattern,'$3-$2-$1'));
                    return from <= dateCreate && to >= dateCreate
                })
            }

            sto.servicestation.servicestationsList.forEach(
                (item)=>{
                    advMyBox.append(stoCardTemplate(item, 'sto'));
                }
            );


        } catch(error) {
            console.debug(error)
        }
    }

    async DeleteServiceStation(event){
        let delItem = 'sto-' + event.params.id
        try {
            let result = await api.DeleteServiceStation(event.params.id);

            if (result.success) {
                $('#' + delItem).remove();
            }
        }  catch (error) {
            console.debug(error)
        }
    }
    /* /СТО */


    /* запчасти */
    async ListMySpareParts(from, to){
        let advMyBox = $('#myAds-spare');
        advMyBox.html('');
        try {
            let spare = await api.ListMySpareParts();
            if (from !== undefined && to !== undefined) {
                spare.spareparts.sparepartsList = spare.spareparts.sparepartsList.filter(function (item){
                    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
                    let dateCreate = new Date(item.createdAt.replace(pattern,'$3-$2-$1'));
                    return from <= dateCreate && to >= dateCreate
                })
            }

            spare.spareparts.sparepartsList.forEach(
                (item)=>{
                    advMyBox.append(spareCardTemplate(item, 'spare'));
                }
            );


        } catch(error) {
            console.debug(error)
        }
    }

    async DeleteSparePart(event){
        let delItem = 'spare-' + event.params.id
        try {
            let result = await api.DeleteSparePart(event.params.id);

            if (result.success) {
                $('#' + delItem).remove();
            }
        }  catch (error) {
            console.debug(error)
        }
    }
    /* /запчасти */

    /* транспорт */
    async ListMyTransport(from, to){
        let advMyBox = $('#myAds-auto');
        advMyBox.html('');
        try {
            let transport = await api.ListMyTransport();
            if (from !== undefined && to !== undefined) {
                transport.transport.transportsList = transport.transport.transportsList.filter(function (item){
                    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
                    let dateCreate = new Date(item.createdAt.replace(pattern,'$3-$2-$1'));
                    return from <= dateCreate && to >= dateCreate
                })
            }

            transport.transport.transportsList.forEach(
                (item)=>{
                    advMyBox.append(avtoCardTemplate(item, 'auto'));
                }
            );


        } catch(error) {
            console.debug(error)
        }
    }

    async DeleteTransport(event){
        let delItem = 'auto-' + event.params.id
        try {
            let result = await api.DeleteTransport(event.params.id);

            if (result.success) {
                $('#' + delItem).remove();
            }
        }  catch (error) {
            console.debug(error)
        }
    }
    /* /транспорт */


    /* придорожный сервис */
    async ListMyRoadsideService(from, to){
        let advMyBox = $('#myAds-roadside');
        advMyBox.html('');
        try {
            let roadside = await api.ListMyRoadsideService();
            if (from !== undefined && to !== undefined) {
                roadside.roadsideservice.roadsideservicesList = roadside.roadsideservice.roadsideservicesList.filter(function (item){
                    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
                    let dateCreate = new Date(item.createdAt.replace(pattern,'$3-$2-$1'));
                    return from <= dateCreate && to >= dateCreate
                })
            }

            roadside.roadsideservice.roadsideservicesList.forEach(
                (item)=>{
                    advMyBox.append(roadsideCardTemplate(item, 'cargo'));
                }
            );


        } catch(error) {
            console.debug(error)
        }
    }

    async DeleteRoadsideService(event){
        let delItem = 'roadside-' + event.params.id
        try {
            let result = await api.DeleteRoadsideService(event.params.id);

            if (result.success) {
                $('#' + delItem).remove();
            }
        }  catch (error) {
            console.debug(error)
        }
    }
    /* /придорожный сервис */


    async lists(from = undefined, to = undefined, type = 'cargo') {
        try {

            let advMy = ['cargo', 'truck', 'sto', 'spare', 'roadside', 'auto']
            let self = this;

            for (const type1 of advMy) {
                switch (type1){
                    case 'cargo':
                        await self.ListMyCargo(from, to)
                        break
                    case 'truck':
                        await self.ListMyTruck(from, to)
                        break
                    case 'sto':
                        await self.ListMyServiceStation(from, to)
                        break
                    case 'spare':
                        await self.ListMySpareParts(from, to)
                        break
                    case 'roadside':
                        await self.ListMyRoadsideService(from, to)
                        break
                    case 'auto':
                        await self.ListMyTransport(from, to)
                        break
                }

            }

        } catch (error) {
            console.debug(error)
        }
    }

    async connect() {
        $.datetimepicker.setLocale('ru');
        $('.datepicker-box').datetimepicker({
            timepicker:false,
            format:'d.m.Y',
            maxDate:0,
        });

      await this.lists();
    }


}

/*
* блок - карточка груз  в КЗ
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

                    <span class="box__contact contact-link cargo-box__contact cargo-box__contact--hide">Контакты</span>
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
         </div>  
         
         <div class="cargo-box__row cargo-box__row-description cargo-box__buttons">
             <div class="ads-btn__row">
                <a class="ads__btn ads__btn-edit" href="lk-cargo-edit.html?id=${cardModel.id}">
                      <span class="ads__btn-img ads__btn-img-edit"></span>
                      Редактировать
                </a> 
                
                 <button class="ads__btn ads__btn-del" aria-label="Удалить объявление" data-bs-toggle="modal" data-bs-target="#popup-delete" title="Удалить объявление">
                      <span class="ads__btn-img ads__btn-img-del"></span>
                      Удалить
                 </button> 
                 
                   <!-- Modal -->
                      <div class="modal fade" id="popup-delete" tabindex="-1" aria-labelledby="popup-delete" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Вы уверены, что ходите удалить объявление?</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <p>После удаления объявления: </p>
                              <ul class="marked">
                                <li>Восстановить объявление невозможно</li>  
                              </ul>
                              <div class="container lk__container lk__container-center">
        
                                <button type="button" class="lk__btn lk__btn--no" data-bs-dismiss="modal">НЕ ХОЧУ УДАЛЯТЬ ОБЪЯВЛЕНИЕ</button>
        
                                <div class="col-sm-6">  
                                    <button class="lk__btn lk__btn-del" data-action="click->lk-my-adds#DeleteCargo" data-bs-dismiss="modal"  data-lk-my-adds-id-param="${cardModel.id}">                                    
                                    Удалить
                                    </button> 
                                </div>
                              </div>
                            </div> 
                          </div>
                        </div>
                      </div>
                      <!-- END Modal --> 
             </div>
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
* блок - карточка транспорт  в КЗ
*/
const truckCardTemplate = (cardModel, type) => {
    let dateTime = new Date(cardModel.time * 1000);
    return `
    
    <!-- version card -->
    <div class="cargo__card" id="${type}-${cardModel.id}">
        <div class="cargo-box__row cargo-box__row-header cargo-box__row-headernew">
                  <div class="cargo-box__data">
                    <div class="cargo-item__row cargo-item__row-new">
                      <span class="cargo-box__title">Погрузка:</span>
                       ${cardModel.loadingpointsList.reduce((html, card, index) => html + cityTruckTemplate(card, index), '')} 
                    </div>
                    <div class="cargo-item__row cargo-item__row-new">
                      <span class="cargo-box__title">Выгрузка:</span>
                       ${cardModel.unloadingpointsList.reduce((html, card, index) => html + cityTruckTemplate(card, index), '')} 
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

                    <a class="box__contact contact-link cargo-box__contact" data-action="click->lk-my-adds#contacts">Показать контакты</a>
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
         </div>  
         
         <div class="cargo-box__row cargo-box__row-description cargo-box__buttons">
             <div class="ads-btn__row">
             
              <a class="ads__btn ads__btn-edit" href="lk-truck-edit.html?id=${cardModel.id}">
                      <span class="ads__btn-img ads__btn-img-edit"></span>
                      Редактировать
                </a> 
                
              
                
                 <button class="ads__btn ads__btn-del" aria-label="Удалить объявление" data-bs-toggle="modal" data-bs-target="#popup-delete-truck" title="Удалить объявление">
                      <span class="ads__btn-img ads__btn-img-del"></span>
                      Удалить
                 </button> 
                 
                   <!-- Modal -->
                      <div class="modal fade" id="popup-delete-truck" tabindex="-1" aria-labelledby="popup-delete" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Вы уверены, что ходите удалить объявление?</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <p>После удаления объявления: </p>
                              <ul class="marked">
                                <li>Восстановить объявление невозможно</li>  
                              </ul>
                              <div class="container lk__container lk__container-center">
        
                                <button type="button" class="lk__btn lk__btn--no" data-bs-dismiss="modal">НЕ ХОЧУ УДАЛЯТЬ ОБЪЯВЛЕНИЕ</button>
        
                                <div class="col-sm-6">  
                                    <button class="lk__btn lk__btn-del" data-action="click->lk-my-adds#DeleteTruck" data-bs-dismiss="modal"  data-lk-my-adds-id-param="${cardModel.id}">                                    
                                    Удалить
                                    </button> 
                                </div>
                              </div>
                            </div> 
                          </div>
                        </div>
                      </div>
                      <!-- END Modal --> 
             </div>
         </div>
    
    </div>
    <!-- / card -->

`};
const cityTruckTemplate = (cardModel, index) => {
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

    if(cardModel.location === undefined){
        cardModel.location = {name:'Не найдено'}
    }
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
                    <span class="box__contact contact-link cargo-box__contact cargo-box__contact--hide">Контакты</span>              
                     <div class="box__contact-data">
                       ${cardModel.phoneList.reduce((html, phone) => html + '<p class="box__contact-data-item"><a href="tel:+' + phone.replace(/\D/g, '') + '" class="contact-link">' + phone + '</a></p>', '')}   
${cardModel.emailList.reduce((html, email) => html + '<p class="box__contact-data-item"><a href=mailto:"' + email +'" class="contact-link">' + email + '</a></p>', '')}    
                     </div>
                </div>
                
                <div class="box__date-travel services__date-travel">
                    ${cardModel.createdAt}
                </div>  
            </div>
        </div>
        <div class="box__footer">
         <div class="ads-btn__row">
              <a class="ads__btn ads__btn-edit" href="lk-service-edit.html?id=${cardModel.id}">
                      <span class="ads__btn-img ads__btn-img-edit"></span>
                      Редактировать
                </a>  
                
                 <button class="ads__btn ads__btn-del" aria-label="Удалить объявление" data-bs-toggle="modal" data-bs-target="#popup-delete-sto" title="Удалить объявление">
                      <span class="ads__btn-img ads__btn-img-del"></span>
                      Удалить
                 </button> 
                 
                   <!-- Modal -->
                      <div class="modal fade" id="popup-delete-sto" tabindex="-1" aria-labelledby="popup-delete" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Вы уверены, что ходите удалить объявление?</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <p>После удаления объявления: </p>
                              <ul class="marked">
                                <li>Восстановить объявление невозможно</li>  
                              </ul>
                              <div class="container lk__container lk__container-center">
        
                                <button type="button" class="lk__btn lk__btn--no" data-bs-dismiss="modal">НЕ ХОЧУ УДАЛЯТЬ ОБЪЯВЛЕНИЕ</button>
        
                                <div class="col-sm-6">  
                                    <button class="lk__btn lk__btn-del" data-action="click->lk-my-adds#DeleteServiceStation" data-bs-dismiss="modal"  data-lk-my-adds-id-param="${cardModel.id}">                                    
                                    Удалить
                                    </button> 
                                </div>
                              </div>
                            </div> 
                          </div>
                        </div>
                      </div>
                      <!-- END Modal --> 
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
    if(cardModel.location === undefined){
        cardModel.location = {name:'Не найдено'}
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
                     <!-- <span class="box__like">5</span>
                      <span class="box__dislike">5</span>-->
                    </div>
                    <div class="box__service-address">
                     ${cardModel.location.name}, ${cardModel.location.address}
                    </div>
                  </div>
                  <div class="box__footer_row box__footer_row-contact">
                    <div class="box__contact cargo-box__contact">                
               <span class="box__contact contact-link cargo-box__contact cargo-box__contact--hide">Контакты</span>  
                
                 <div class="box__contact-data">
                   <p> ${cardModel.phoneList} </p>
                   <p>${cardModel.emailList}</p>
                </div>
            </div>
                    <div class="box__date-travel services__date-travel">
                      ${cardModel.createdAt}
                    </div>                        
                  </div>
                </div>
                
                <div class="box__footer"> 
                     <div class="ads-btn__row">
                    <a class="ads__btn ads__btn-edit" href="lk-spare-edit.html?id=${cardModel.id}">
                      <span class="ads__btn-img ads__btn-img-edit"></span>
                      Редактировать
                </a>  
                    
                             <button class="ads__btn ads__btn-del" aria-label="Удалить объявление" data-bs-toggle="modal" data-bs-target="#popup-delete-spare" title="Удалить объявление">
                                  <span class="ads__btn-img ads__btn-img-del"></span>
                                  Удалить
                             </button> 
                     
                       <!-- Modal -->
                          <div class="modal fade" id="popup-delete-spare" tabindex="-1" aria-labelledby="popup-delete" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLabel">Вы уверены, что ходите удалить объявление?</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  <p>После удаления объявления: </p>
                                  <ul class="marked">
                                    <li>Восстановить объявление невозможно</li>  
                                  </ul>
                                  <div class="container lk__container lk__container-center">
            
                                    <button type="button" class="lk__btn lk__btn--no" data-bs-dismiss="modal">НЕ ХОЧУ УДАЛЯТЬ ОБЪЯВЛЕНИЕ</button>
            
                                    <div class="col-sm-6">  
                                        <button class="lk__btn lk__btn-del" data-action="click->lk-my-adds#DeleteSparePart" data-bs-dismiss="modal"  data-lk-my-adds-id-param="${cardModel.id}">                                    
                                        Удалить
                                        </button> 
                                    </div>
                                  </div>
                                </div> 
                              </div>
                            </div>
                          </div>
                          <!-- END Modal --> 
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
    if(cardModel.location === undefined){
        cardModel.location = {name:'Не найдено'}
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
                      <!--<div class="top-sto__review content-box__review">
                      Отзывов:
                        <span class="top-sto__namb">${cardModel.likes}</span>
                        <span class="like">5</span>
                        <span class="dislike">5</span>
                      </div>-->
                      
                    <div class="content-block-fix">
                        <div class="content-block-text">
                            <p>${cardModel.description}</p>
                        </div>
                        <div class="show-all-container">
                            <button class="show-all">Показать полностью</button>    
                        </div>
                    </div> 
                      
               
               <p>  ${cardModel.phoneList.reduce((html, phone) => html + '<a href="tel:+' + phone.replace(/\D/g, '') + '" class="contact-link">' + phone + '</a><br>', '')}   </p>
                <p>  ${cardModel.emailList.reduce((html, email) => html + '<a href=mailto:"' + email +'" class="contact-link">' + email + '</a><br>', '')}   </p> 
                
                    </div>
                    <div class="ads-btn__row ads-btn__row--roadside">
                            <div>
                                    <a class="ads__btn ads__btn-edit" href="lk-roadside-edit.html?id=${cardModel.id}">
                      <span class="ads__btn-img ads__btn-img-edit"></span>
                      Редактировать
                </a>  
                            </div>
                             <div>
                                  <button class="ads__btn ads__btn-del" aria-label="Удалить объявление" data-bs-toggle="modal" data-bs-target="#popup-delete-roadside" title="Удалить объявление">
                                              <span class="ads__btn-img ads__btn-img-del"></span>
                                              Удалить
                                         </button> 
                            </div>
                   
                  
                    
                           
                     
                       <!-- Modal -->
                          <div class="modal fade" id="popup-delete-roadside" tabindex="-1" aria-labelledby="popup-delete" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLabel">Вы уверены, что ходите удалить объявление?</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  <p>После удаления объявления: </p>
                                  <ul class="marked">
                                    <li>Восстановить объявление невозможно</li>  
                                  </ul>
                                  <div class="container lk__container lk__container-center">
            
                                    <button type="button" class="lk__btn lk__btn--no" data-bs-dismiss="modal">НЕ ХОЧУ УДАЛЯТЬ ОБЪЯВЛЕНИЕ</button>
            
                                    <div class="col-sm-6">  
                                        <button class="lk__btn lk__btn-del" data-action="click->lk-my-adds#DeleteRoadsideService" data-bs-dismiss="modal"  data-lk-my-adds-id-param="${cardModel.id}">                                    
                                        Удалить
                                        </button> 
                                    </div>
                                  </div>
                                </div> 
                              </div>
                            </div>
                          </div>
                          <!-- END Modal --> 
                 </div>
                  </div>
                </div> 
`};


/*
* блок - карточка транспорт в КЗ
*/
const avtoCardTemplate = (cardModel) => {
    let dateTime = new Date(cardModel.time * 1000);

    if(cardModel.location === undefined){
        cardModel.location = {name:'Не найдено'}
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
                            
                      </div><!-- /avto-add__row --> 
                      
                     
                        
               <div class="top-sto__contact" style="height: auto; opacity: 1"> 
               
                     <p>${cardModel.phonesList.reduce((html, phone) => html + phone + '<br>', '')}  </p>
                     <p>${cardModel.emailsList.reduce((html, email) => html + email + '<br>', '')}  </p>
                     
                </div>  
                </div><!-- /content-box__info -->
                
                 <div class="ads-btn__row ads-btn__row--roadside">
                            <div>
                                    <a class="ads__btn ads__btn-edit" href="lk-avtosale-edit.html?id=${cardModel.id}">
                      <span class="ads__btn-img ads__btn-img-edit"></span>
                      Редактировать
                </a>  
                            </div>
                             <div>
                                  <button class="ads__btn ads__btn-del" aria-label="Удалить объявление" data-bs-toggle="modal" data-bs-target="#popup-delete-transport" title="Удалить объявление">
                                              <span class="ads__btn-img ads__btn-img-del"></span>
                                              Удалить
                                         </button> 
                            </div>
                   
                  
                    
                           
                     
                       <!-- Modal -->
                          <div class="modal fade" id="popup-delete-transport" tabindex="-1" aria-labelledby="popup-delete" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLabel">Вы уверены, что ходите удалить объявление?</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  <p>После удаления объявления: </p>
                                  <ul class="marked">
                                    <li>Восстановить объявление невозможно</li>  
                                  </ul>
                                  <div class="container lk__container lk__container-center">
            
                                    <button type="button" class="lk__btn lk__btn--no" data-bs-dismiss="modal">НЕ ХОЧУ УДАЛЯТЬ ОБЪЯВЛЕНИЕ</button>
            
                                    <div class="col-sm-6">  
                                        <button class="lk__btn lk__btn-del" data-action="click->lk-my-adds#DeleteTransport" data-bs-dismiss="modal" data-lk-my-adds-id-param="${cardModel.id}">                                    
                                        Удалить
                                        </button> 
                                    </div>
                                  </div>
                                </div> 
                              </div>
                            </div>
                          </div>
                          <!-- END Modal --> 
                 </div>
            </div><!-- /roadside-box-->
        </div><!-- /roadside__content-box-->

 
`};

