/*
* для ЛК - профайл
* */

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import bootstrap from 'bootstrap'
import mask from 'jquery-mask-plugin'
import serializer from 'form-serializer'
import {load} from "recaptcha-v3";

export default class extends Controller {
    /* счетчики для генерируемых  инпутов емайл, телефон  + фото*/
    addPhotoCounter = 0;
    captha

    openProfile() {
        if(global.user == null) {
            $('#profileBox').html(headerpopupTemplateClose());
            return false;
        } else {
             return true
        }
    }

    deleteProfileConfirmation() {
        $('#popup-ads-box').html(headerpopupTemplateConfirmation());
        return false;
    }


    showPass() {
        let pass = $('#profilePassNew');
        if (pass.attr('type') === 'password'){
            pass.attr('type', 'text');
        } else {
            pass.attr('type', 'password');
        }
        return false;
    }

    showPassRepeat() {
        let pass = $('#profilePassNewRepeat');
        if (pass.attr('type') === 'password'){
            pass.attr('type', 'text');
        } else {
            pass.attr('type', 'password');
        }
        return false;
    }


    /* генерация блоков под картинки с загрузкой */
    addPhoto() {
        this.addPhotoCounter++;
        $('#add-photo-list').append(
            '<div class="img-box">\n' +
            '<div class="file-name file-name__demo">Фото ' + this.addPhotoCounter + '</div>' +
            '  <span class="img-box-item" data-action="click->imgManager#open" data-inputid="#image' + this.addPhotoCounter + '" data-thumbid="#thumb' + this.addPhotoCounter + '">\n' +
            '      <input type="hidden" name="imagesList[]" id="image' + this.addPhotoCounter + '">\n' +
            '      <img src="" width="200" height="132" alt="" id="thumb' + this.addPhotoCounter + '">\n' +
            '   </span>\n' +
            '   <span class="delete-link" title="Удалить" data-action="click->lkProfile#delete">Удалить</span>\n' +
            '</div>');
    }

    /* удаление блоков под картинки с загрузкой */
    delete() {
        $('html').on('click','.delete-link, .delete-item', function () {
            $(this).parent().remove();
        });
    }


    /* форма данные юзера - новые имя? емайл? тлф?*/
    async UserSaveChange() {
        let form = $("#profileUserForm")[0];
        if (form.checkValidity()) {
            let json = $(form).serializeObject();
            json.id = global.user.id;
            try {

                let result = await api.CreateUser(json, this.captha);

                $('#profileUserForm').prepend(
                    '<div class="alert alert-success reqiest-alert" role="alert">\n' +
                    '   Ваши данные обновлены\n' +
                    '</div>'
                );
            } catch(error) {
                console.debug(error);
            }
        } else {
            $('#profileUserForm').prepend(
                ' <div class="alert alert-danger reqiest-alert" role="alert">\n' +
                '            Пожалуйста, заполните все поля, отмеченные звездочкой (*)\n' +
                '        </div>'
            )
        }
        form.classList.add('was-validated');
    }


    //проверяем пароль на соответсвие параметров + совпадение паролей
    passCheck(){
        $('#profilePassNew').keyup(function() {
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
        })
        $("#profilePassNewRepeat").on("keyup", function() {
            let value_input1 = $("#profilePassNew").val();
            let value_input2 = $(this).val();
            if(value_input1 !== value_input2) {
                $(".pass-match").html("<div class=' alert alert-danger reqiest-alert'>Пароли не совпадают!</div>");
            } else {
                $(".pass-match").html("<div class=' alert alert-success reqiest-alert'>Пароли совпадают</div>");
            }
        });
    }

    /* форма поменять пароль */
    async passwordNew() {
        let form = $("#profileChangePassword")[0];
        if (form.checkValidity()) {

             //if + else проверяем соответствие пароля параметрам
            if($('#profilePassNew').val().match(/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)) {
                let json = $(form).serializeObject();
                json.id = global.user.id;

                try {
                    let result = await api.ChangePass(json, true);

                    if (result.success) {
                        $('#profileChangePassword').prepend(
                            '<div class="alert alert-success reqiest-alert" role="alert">\n' +
                            '   Ваши данные обновлены\n' +
                            '</div>'
                        );
                    } else {
                        if (result.error === 'New passwords not match') {
                            $('#profileChangePassword').prepend(
                                '<div class="alert alert-danger reqiest-alert" role="alert">\n' +
                                'Пароли не совпадают\n' +
                                '</div>'
                            );
                        } else {
                            $('#profileChangePassword').prepend(
                                '<div class="alert alert-danger reqiest-alert" role="alert">\n' +
                                'Старый пароль неверен. Если вы его не помните, воспользуйтесь формой <a class="alert-link" href="lk-resetpassword.html">восстановления пароля</a>. \n' +
                                '</div>'
                            );
                        }
                    }


                } catch (error) {
                    console.debug(error);
                }
            } else {
                $('#profileChangePassword').prepend(
                    '<div class="alert alert-danger reqiest-alert" role="alert">\n' +
                    'Пароль должен быть только на латинице, не менее 8 символов, содержать минимум одну букву, одну цифру, одну заглавную букву \n' +
                    '</div>'
                );
                $('html, body').animate({
                    scrollTop: $(".alert-danger").offset().top
                }, 500);
            }



        } else {
            $('#profileChangePassword').prepend(
                ' <div class="alert alert-danger reqiest-alert" role="alert">\n' +
                '            Пожалуйста, заполните все поля, отмеченные звездочкой (*)\n' +
                '        </div>'
            )
        }
        form.classList.add('was-validated');
    }
    async favoritesAdd(event) {
        console.debug(event.params)
    }

    async userDelete() {
        try {
            let result = await api.DeleteUser(global.user.id);

            if (result.success) {
                sessionStorage.removeItem('tsl_token');
                sessionStorage.removeItem('email');
                global.user = null;
                location.href = 'index.html';
            }

        } catch (error) {
            console.debug(error)
        }
    }

    userNoDelete() {
        $("#popup-delete, #popup-ads-box").css({ display: "none" });
    }


 async   connect() {
       if(this.openProfile()){
           $('#profileName').val(global.user.name);
           $('#profileEmail').val(global.user.email);
           $('#profileId').text(global.user.id);
           $('#profilePhone').val(global.user.phone);
      /*     $('#profilePhone, #profileCompanyPhone').val(global.user.phone).mask('+099 (000) 000-00-00', {placeholder: "+___ (___) ___-__-__"});
          $('#profileCompanyBin').mask('000000000000', {placeholder: "____________"});*/
           function timestampToDate(ts) {
               let d = new Date();
               d.setTime(ts);
               return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
           }
           let date = timestampToDate(global.user.createdat.seconds * 1000)
           $('#profileDate').text(date);

       }
       this.passCheck();

     api.GetCompanyByUserEmail(global.user.email).then(
                    result => {
                    console.debug(result)
                        $('#profileUserForm').append('<input type="hidden" name="id" value="'+ result.id +'">')
                },
         error => {
             console.debug(error, 'no company')
         }
         );

        const recaptcha = await load('6LflwQMfAAAAAJ2yMqRI2cfXk0DJ3QZL-EBA03JK');
        const token = await recaptcha.execute('submit');
        this.captha = token;
    }
}

const headerpopupTemplateClose = () => `
<section class="main__baner-lk">
      <strong class="main__baner-title">
       Вы не авторизованы!
      </strong>
    </section>
    <section class="lk__section">
        <div class="container lk__container lk__container-center">
        <p class="ads-popup__text">Чтобы зайти в Личный кабинет, пожалуйста  <a class="ads-popup__link" href="lk-enter.html">войдите</a> или <a class="ads-popup__link" href="lk-registration.html" >зарегистрируйтесь</a></p> 
        </div>
    </section> 
`;


const headerpopupTemplateConfirmation = () => `
 

`;