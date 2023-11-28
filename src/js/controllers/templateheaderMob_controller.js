import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
export default class extends Controller {
    mobnavopen() {
        $('#menu').toggleClass('header__list_visible');
        $('#burger').toggleClass('menu__btn').toggleClass('menu__btn-close');
    }
}