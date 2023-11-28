/* webpackIgnore: true */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'swiper/swiper-bundle.min.css'
import 'jquery-datetimepicker/jquery.datetimepicker.css'
import "../style/normalize.css"
import "../style/style.css"
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"
import {Tsl_api} from "./tsl_api"
import ymaps from "ymaps";
global.languageRu = {
    inputTooShort:()=> "Используйте больше 3 символов..."
}
global.api = new  Tsl_api('https://tsl.kz:9000')
gps().then(()=>{
    global.api.WhoIs()
        .then(
            function (user) {
                global.user = user
                const application = Application.start()
                const context = require.context("./controllers", true, /\.js$/)
                application.load(definitionsFromContext(context))

            },
            function (e) {

                global.user = null
                const application = Application.start()
                const context = require.context("./controllers", true, /\.js$/)
                application.load(definitionsFromContext(context))

            }
        )
})


global.escapeHtml = (unsafe) => {
    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

global.country = {}
global.city = {}

async function gps(){
    const maps = await ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=582e9bd2-33d6-490f-981f-5847a69ea993&lang=ru_RU');

    let geolocation = maps.geolocation;

    // Сравним положение, вычисленное по ip пользователя и
    // положение, вычисленное средствами браузера.
    let result = await  geolocation.get({
        /*provider: 'yandex',*/
        provider: 'auto',
        mapStateAutoApply: true
    })
    let coordPoint = result.geoObjects.get(0).geometry._coordinates;
    let res = await maps.geocode(coordPoint)
    let firstGeoObject = res.geoObjects.get(0);
/*    let geoCountry = firstGeoObject.getCountry();*/
    let geoCity = firstGeoObject.getLocalities()[0];

    let cityName = await api.ListCity(geoCity);

    global.country = {
        name: cityName.citiesList[0].country.name,
        id: cityName.citiesList[0].country.id
    };
    global.city = {
        name: cityName.citiesList[0].name,
        id: cityName.citiesList[0].id
    };


}
