/*
* для списка сотрудников
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import serializer from 'form-serializer'

export default class extends Controller {

    async staffDelete() {
        let form = $("#profileStaffDelete")[0];
        let json = $(form).serializeObject();
        try {
            let result = await api.DeleteUser(json.id);

            if (result.success) {
             $('#employees-' + json.id).remove();
            }

        } catch (error) {
            console.debug(error)
        }
    }



    async connect() {
         try {
             let company = await api.GetCompanyByUser(global.user.email);
             if (company !== undefined) {
                 let myEmployees = await  api.ListEmployees(company.id);

                 myEmployees.employeesList.forEach((person, num)=> {
                     $('#staff-list').append(employeesCardTemplate(person, num+1));
                 })
             } else {

             }

         } catch (error) {
             console.debug(error)
         }
    }
}


const employeesCardTemplate  = (cardModel, num) => {
    return`
      <tr id="employees-${cardModel.id}">
                <td>${num}</td>
                <td>${cardModel.name}</td>
                <td>${cardModel.phone}</td>
                <td>${cardModel.email}</td>
                <td>
                  <a class="staff__img staff__img-edit" href="lk-staff-edit.html?staff_id=${cardModel.id}" aria-label="Редактировать ${cardModel.name}" title="Редактировать ${cardModel.name}"></a>
                </td>
                <td>
                <form id="profileStaffDelete">
                  <span class="staff__img staff__img-trash" aria-label="Удалить ${cardModel.name}" data-bs-toggle="modal" data-bs-target="#popup-delete" title="Удалить ${cardModel.name}"></span>  

              <!-- Modal -->
              <div class="modal fade" id="popup-delete" tabindex="-1" aria-labelledby="popup-delete" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Вы уверены, что ходите удалить сотрудника ${cardModel.name}?</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <p>После удаления сотрудника: </p>
                      <ul class="marked">
                        <li>Восстановить текущий аккаунт сотрудника невозможно</li> 
                        <li>Объявления, созданные сотрудником, будут удалены</li>
                      </ul>

                      <div class="container lk__container lk__container-center">

                        <button type="button" class="lk__btn lk__btn--no" data-bs-dismiss="modal">НЕ ХОЧУ УДАЛЯТЬ СОТРУДНИКА</button>

                        <div class="col-sm-6">
                          <input type="hidden" name="id" id="profileStaffId" value="${cardModel.id}">
                          <input type="button" value="Удалить сотрудника" class="lk__btn lk__btn-del" data-bs-dismiss="modal" data-action="click->lkStaff#staffDelete">
                        </div>
                      </div>
                    </div> 
                  </div>
                </div>
              </div>
                </form> 
                </td>
    </tr>
    `
}