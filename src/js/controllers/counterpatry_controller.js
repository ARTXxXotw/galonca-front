/*
* проверка контрагента
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
export default class extends Controller {

  async  search(){
       let bin = $('#search-bin').val();
         let binNum;
       if (bin !== '') {
           try {
               binNum = await api.GetStat(bin);
               if (binNum.success === true) {
                   $('.alert-danger').remove();
                  $('#bin-result').append('' +
                       '<table class="result__table">\n' +
                       '            <colgroup>\n' +
                       '              <col class="result__table-col_grey">\n' +
                       '              <col class="result__table-col_white">\n' +
                       '            </colgroup>\n' +
                       '            <tr>\n' +
                       '              <td>БИН\\ИИН</td>\n' +
                       '              <td>' + binNum.obj.bin + '</td>\n' +
                       '            </tr>\n' +
                       '            <tr>\n' +
                       '              <td>Название</td>\n' +
                       '              <td>' + binNum.obj.name + '</td>\n' +
                       '            </tr>\n' +
                       '            <tr>\n' +
                       '              <td>Дата регистрации</td>\n' +
                       '              <td>' + binNum.obj.registerdate + '</td>\n' +
                       '            </tr>\n' +
                       '            <tr>\n' +
                       '              <td>ОКЭД код</td>\n' +
                       '              <td>' + binNum.obj.okedcode + '</td>\n' +
                       '            </tr>\n' +
                       '            <tr>\n' +
                       '              <td>Расшифровка кода ОКЭД</td>\n' +
                       '              <td>' + binNum.obj.okedname + '</td>\n' +
                       '            </tr>\n' +
                       '            <tr>\n' +
                       '              <td>КРП код</td>\n' +
                       '              <td>' + binNum.obj.krpcode + '</td>\n' +
                       '            </tr>\n' +
                       '            <tr>\n' +
                       '              <td>Наименование КРП</td>\n' +
                       '              <td>' + binNum.obj.krpname + '</td>\n' +
                       '            </tr>\n' +
                       '            <tr>\n' +
                       '              <td>КАТО ID</td>\n' +
                       '              <td>' + binNum.obj.katoid + '</td>\n' +
                       '            </tr>\n' +
                       '<tr>\n' +
                       '<td>КАТО код</td>\n' +
                       '<td>' + binNum.obj.katocode + '</td>\n' +
                       '</tr>\n' +
                       '<tr>\n' +
                       '<td>КРПБФ код</td>\n' +
                       '<td>' + binNum.obj.krpbfcode + '</td>\n' +
                       '</tr>\n' +
                       '<tr>\n' +
                       '<td>КРПБФ</td>\n' +
                       '<td>' + binNum.obj.krpbfname + '</td>\n' +
                       '</tr>\n' +
                       '            <tr>\n' +
                       '              <td>ФИО руководителя</td>\n' +
                       '              <td>' + binNum.obj.fio + '</td>\n' +
                       '            </tr>\n' +
                       '            <tr>\n' +
                       '              <td>Адрес</td>\n' +
                       '              <td>' + binNum.obj.katoaddress + '</td>\n' +
                       '            </tr>\n' +
                       '          </table>')
               } else {
                    let binDescription = binNum.description;
                    let binText = 'Ошибка!';
                    switch (binDescription){
                        case 'BIN not found':
                            binDescription = 'БИН не найден'
                            break ;
                        case '503 Service Temporarily Unavailable':
                            binDescription = 'Сервис временно недоступен'
                            binText = '';
                            break;
                        default:
                            binDescription = binNum.description;
                    }

                   $('#bin-result').html('<div class="col-sm-18 col-lg-8 alert alert-danger reqiest-alert" role="alert">' + binText +' ' + binDescription + '</div>');
               }
           } catch (error){
               $('#bin-result').html('<div class="col-sm-18 col-lg-8 alert alert-danger reqiest-alert" role="alert">Сервис госуслуг недоступен</div>');
                  }
       }
    }

    connect() {
        $('#search-bin').mask('000000000000', {placeholder: "XXXXXXXXXXXX"})
    }
}