/*
* для блока список городов
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
export default class extends Controller {
    connect() {
        $(this.element).html(spareCityListTemplate(spareCityList));
    }
}

export const spareCityList = [
    {
        id: 1,
        cityLink: '#',
        cityName: 'Алматы'
    },
    {
        id: 2,
        cityLink: '#',
        cityName: 'Нур-Султан'
    },
    {
        id: 3,
        cityLink: '#',
        cityName: 'Актобе'
    },
    {
        id: 4,
        cityLink: '#',
        cityName: 'Кокшетау'
    },
    {
        id: 5,
        cityLink: '#',
        cityName: 'Талдыкорган'
    },
    {
        id: 6,
        cityLink: '#',
        cityName: 'Атырау'
    },
    {
        id: 7,
        cityLink: '#',
        cityName: 'Оскемен (Усть-Каменогорск)'
    },
    {
        id: 8,
        cityLink: '#',
        cityName: 'Тараз'
    },
    {
        id: 9,
        cityLink: '#',
        cityName: 'Уральск'
    },
    {
        id: 1,
        cityLink: '#',
        cityName: 'Караганда'
    },
    {
        id: 11,
        cityLink: '#',
        cityName: 'Костанай'
    },
    {
        id: 12,
        cityLink: '#',
        cityName: 'Кызылорда'
    },
    {
        id: 13,
        cityLink: '#',
        cityName: 'Актау'
    },
    {
        id: 14,
        cityLink: '#',
        cityName: 'Павлодар'
    },
    {
        id: 15,
        cityLink: '#',
        cityName: 'Петропавловск'
    },
    {
        id: 1,
        cityLink: '#',
        cityName: 'Шымкент'
    }
];

/* обертка  список города КЗ
*/
const spareCityListTemplate = (model) => {
    return `${model.reduce((html, card) => html + spareCityTemplate(card), '')}`
}


/*
* блок - ссылка - город КЗ
*/
const spareCityTemplate = (cardModel) => {
    return `
        <a href="${cardModel.cityLink}" class="cargo-country__link" id="${cardModel.id}">Запчасти в ${cardModel.cityName} |</a> 
`};



