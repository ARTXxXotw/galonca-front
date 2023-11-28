/*
* для формы редактирования сотрудников в ЛК
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import mask from 'jquery-mask-plugin'
import serializer from 'form-serializer'
import {load} from "recaptcha-v3";

export default class extends Controller {
    static targets = [ "password", "passwordadd"]

    captha

    showPass() {
        let showpass = '#info-password';
        if ($(showpass).attr('type') === 'password'){
            $(showpass).attr('type', 'text');
        } else {
            $(showpass).attr('type', 'password');
        }
        return false;
    }

    passCheck(){
        $('#info-password').keyup(function() {
            // set password letiable
            let pswd = $(this).val();
//validate the length
            if ( pswd.length < 8 ) {
                $('#length').removeClass('valid').addClass('invalid');
            } else {
                $('#length').removeClass('invalid').addClass('valid');
            }
//validate letter
            if ( pswd.match(/[A-z]/) ) {
                $('#letter').removeClass('invalid').addClass('valid');
            } else {
                $('#letter').removeClass('valid').addClass('invalid');
            }

//validate capital letter
            if ( pswd.match(/[A-Z]/) ) {
                $('#capital').removeClass('invalid').addClass('valid');
            } else {
                $('#capital').removeClass('valid').addClass('invalid');
            }

//validate number
            if ( pswd.match(/[0-9]/) ) {
                $('#number').removeClass('invalid').addClass('valid');
            } else {
                $('#number').removeClass('valid').addClass('invalid');
            }
        }).focus(function() {
            $('#info-password-check').show();
        }).blur(function() {
            $('#info-password-check').hide();
        });

        $("#info-password-add").on("keyup", function() {
            let value_input1 = $("#info-password").val();
            let value_input2 = $(this).val();
            if(value_input1 !== value_input2) {
                $(".pass-match").html("<div class=' alert alert-danger reqiest-alert'>Пароли не совпадают!</div>");
                $(".adding__dtn--lk").attr("disabled", "disabled");
            } else {
                $(".adding__dtn--lk").removeAttr("disabled");
                $(".pass-match").html("");
            }
        });
    }


    /* форма данные юзера - новые имя? емайл? тлф?*/
    async UserSaveChange() {
        let form = $("#tsl-edit-employee")[0];
        if (form.checkValidity()) {
            let json = $(form).serializeObject();
            let staffId = window.location.href;
            staffId = staffId.slice(staffId.indexOf('=') + 1);
            json.id = staffId;
            try {

                let result = await api.CreateUser(json, this.captha);

                if (json.pass !== "") {
                    let resultPass = await api.ChangePass({'lk_password_new':json.pass,'lk_password_new_repeat':json.pass, 'id': staffId}, false);

                }
                $('#tsl-edit-employee').prepend(
                    '<div class="alert alert-success reqiest-alert" role="alert">\n' +
                    '  Данные сотрудника обновлены\n' +
                    '</div>'
                );
            } catch(error) {
                console.debug(error);
            }
        } else {
            $('#tsl-edit-employee').prepend(
                ' <div class="alert alert-danger reqiest-alert" role="alert">\n' +
                '            Пожалуйста, заполните все поля, отмеченные звездочкой (*)\n' +
                '        </div>'
            )
        }
        form.classList.add('was-validated');
    }


    async connect() {
        let staffId = window.location.href;
        staffId = staffId.slice(staffId.indexOf('=') + 1);

        try {
            let staffPerson = await api.GetUserById(staffId);

            $('#info-fio').val(staffPerson.name);
            $('#info-email').val(staffPerson.email);
            $('#info-phone').val(staffPerson.phone);
            $('#info-password').val("");

        }  catch (error) {
            console.debug(error)
        }

        this.passCheck();

        const recaptcha = await load('6LflwQMfAAAAAJ2yMqRI2cfXk0DJ3QZL-EBA03JK');
        const token = await recaptcha.execute('submit');
        this.captha = token;
    }
}

export const lkRegistrationtext = [

]

const lkRegistrationTemplate = (model) =>  {
    return `${model.reduce((html, card) => html + lkFormTemplate(card), '')}`
}

const lkFormTemplate = (cardModel) => {
    return `
       
`};

