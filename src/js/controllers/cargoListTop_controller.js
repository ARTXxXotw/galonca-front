/*
* для блока груз ТОП = 2
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
export default class extends Controller {
    static values = { limit: Number }
    connect() {
        $(this.element).html(cargoListTemplate(cargoList));
    }
}

export const cargoList = [
    {
        id: 1,
        price: 50000,
        kilometers: 10000,
        cities: [
            {
                name: "Нур-Султан",
                start: true
            },
            {
                name: "Новосибирск"
            },
            {
                name: "Москва",
                finish: true
            }
        ],
        loadingType: [
            {
                name: "Задняя"
            }
        ],
        dateStart: '05.09.2020',
        dateEnd: '15.09.2020',
        companyName: 'ТОО Васильев',
        cargoWeight: 1,
        cargoVolume: 90,
        transportType: 'Рефрижератор',
        time: 1628329097
    },
    {
        id: 2,
        price: 25000,
        kilometers: 300,
        cities: [
            {
                name: "Новосибирск",
                start: true
            },
            {
                name: "Актау"
            },
            {
                name: "Москва",
                finish: true
            }
        ],
        loadingType: [
            {
                name: "Задняя"
            }
        ],
        dateStart: '06.09.2020',
        dateEnd: '12.09.2020',
        companyName: 'Супер Погрузы',
        cargoWeight: 200,
        cargoVolume: 50,
        transportType: 'Масловоз',
        time: 1628329097
    },
    {
        id: 3,
        price: 25000,
        kilometers: 300,
        cities: [
            {
                name: "Новосибирск",
                start: true
            },
            {
                name: "Актау"
            },
            {
                name: "Москва",
                finish: true
            }
        ],
        loadingType: [
            {
                name: "Задняя"
            }
        ],
        dateStart: '06.09.2020',
        dateEnd: '12.09.2020',
        companyName: 'Супер Погрузы',
        cargoWeight: 200,
        cargoVolume: 50,
        transportType: 'Масловоз',
        time: 1628329097
    },
    {
        id: 4,
        price: 25000,
        kilometers: 300,
        cities: [
            {
                name: "Новосибирск",
                start: true
            },
            {
                name: "Актау"
            },
            {
                name: "Москва",
                finish: true
            }
        ],
        loadingType: [
            {
                name: "Задняя"
            }
        ],
        dateStart: '06.09.2020',
        dateEnd: '12.09.2020',
        companyName: 'Супер Погрузы',
        cargoWeight: 200,
        cargoVolume: 50,
        transportType: 'Масловоз',
        time: 1628329097
    }
];

/* обертка для
    * список блоков груз в КЗ ТОП
*/
const cargoListTemplate = (model) => `              
              ${model.reduce((html, card) => html + cargoCardTemplate(card), '')}              
`;


/*
* блок - карточка груз в КЗ
*/
const cargoCardTemplate = (cardModel) => {
    let dateTime = new Date(cardModel.time * 1000);
    return `
    <div class="cargo__card" id="cargotop-${cardModel.id}">
        <div class="cargo-box__row cargo-box__row-header">
            <div class="cargo-item__row">
             ${cardModel.cities.reduce((html, card, index) => html + cityTemplate(card, index), '')} 
             </div>
            <div class="cargo-item__row">
                <div class="cargo-box__distance">
                    ${cardModel.kilometers} км
                </div>
                <div class="cargo-box__price">
                    от
                    <span>
     ${cardModel.price}
    </span>
                    тг.
                </div>
            </div>
        </div>
        <div class="cargo-box__row cargo-box__row-date">
            <div class="cargo-item__row">
                <div class="cargo-box__date">
                    <span>${cardModel.dateStart} </span>
                    -
                    <span>${cardModel.dateEnd}</span>
                </div>
                <div class="cargo-box__name">
                   ${cardModel.companyName} 
                </div>
            </div>
            <div class="cargo-item__row">
                <a href="" class="box__contact cargo-box__contact">Показать контакты</a>
                <div class="box__date-travel cargo-box__date-travel">
                   ${dateTime.getDate()}.${dateTime.getMonth()}.${dateTime.getFullYear()} 
                </div>
                <div class="box__time-travel">
                    ${dateTime.getHours()}:${dateTime.getMinutes()}
                </div>
            </div>
        </div>
        <div class="cargo-box__row cargo-box__row-description">
            <div class="cargo-box__description">
                Вес:
                <span>${cardModel.cargoWeight} т</span>
            </div>
            <div class="cargo-box__description">
                Объем:
                <span>${cardModel.cargoVolume} м<sup>3</sup></span>
            </div>
            <div class="cargo-box__description">
                Тип транспорта:
                <span>${cardModel.transportType}</span>
            </div>
            <div class="cargo-box__description">
                Вид погрузки:
                <span> ${cardModel.loadingType.reduce((html,type) => html + type.name + ' ', '')}</span>
            </div>
            <div class="cargo-box__label"></div>
        </div>
    </div>
`};

/*
* блок - список городов - пункты назначения
* == находится внутри div.cargo-item__row
*/
const cityTemplate = (cardModel,index) => {
    if (index === 0) {
        return `
        <div class="cargo-box__city cargo-box__city-bg">
            ${cardModel.name}
        </div>                             
`;
    }  else {
        return `
        <div class="cargo-box__city cargo-box__city-arrow">
            ${cardModel.name}
        </div>                             
`;
    }
}


