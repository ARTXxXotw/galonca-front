/*
* для формы добавления img на сервер
*/

import { Controller } from "@hotwired/stimulus"
import $ from "jquery"
import { Modal, Popover } from 'bootstrap'
import {findIconDefinition, icon} from '@fortawesome/fontawesome-svg-core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default class extends Controller  {
    static targets = ["hw", "thumb", "modal", "files", "image"];
    curr_id
    modal
    imgId
    thumbId

    connect() {
        this.curr_id = "/user" + global.user.id || ""
    }

    open(event) {
        this.curr_id = "/user" + global.user.id;
        this.imgId = $(event.currentTarget).data('inputid');
        this.thumbId = $(event.currentTarget).data('thumbid');
        if (this.modal !== undefined) {
            this.modal.show()
            return
        }
        let self = this
        $.get("https://tsl.kz:9000/imageManager/list", {id:this.curr_id}, function (json) {
            $(self.element).prepend(modalTemplate(json, self.curr_id))
            self.modal = new Modal(self.modalTarget)
            self.modal.show()
        }, "json")

    }

    ch_dir(e) {
        let self = this
        this.curr_id = $(e.currentTarget).data('folder')
        $.get("https://tsl.kz:9000/imageManager/list" , {id:this.curr_id}, function (json) {
            let html = json.reduce((html, file) => html + fileTemplate(file), '')
            $(self.filesTarget).html(html)
        }, "json")
    }
    up_level(e){
        if (this.curr_id === '/') return
        let self = this
        let part = this.curr_id.split('/')
        part.pop()
        if (part.length === 0) this.curr_id = '/'
        else this.curr_id = part.join('/')

        $.get("https://tsl.kz:9000/imageManager/list" , {id:this.curr_id}, function (json) {

            let html = json.reduce((html, file) => html + fileTemplate(file), '')
            $(self.filesTarget).html(html)
        }, "json")
    }
    refresh() {
        let self = this
        let token = sessionStorage.getItem("tsl_token")
        $.ajax({
            url: "https://tsl.kz:9000/imageManager/list" ,
            data:{id:this.curr_id},
            success:function (json) {

                let html = json.reduce((html, file) => html + fileTemplate(file), '')
                $(self.filesTarget).html(html)
            },
            format:"json",
            headers: {"Authorization": token },
            method: 'get'
        })
    }
    upload(){
        $(this.hwTarget).prepend('<form enctype="multipart/form-data" id="form-upload" style="display: none;"><input type="file" name="upload" value="" data-action="imgManager#uploadFile"></form>')
        $('#form-upload input[name=\'upload\']').trigger('click');
    }
    uploadFile(){
        $.ajax({
            url: `https://tsl.kz:9000/image/upload?id=${this.curr_id}`,
            type: 'post',
            dataType: 'json',
            data: new FormData($('#form-upload')[0]),
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                $('#button-upload i').replaceWith('<i class="fa fa-circle-o-notch fa-spin"></i>');
                $('#button-upload').prop('disabled', true);
            },
            complete: function() {
                $('#button-upload i').replaceWith('<i class="fa fa-upload"></i>');
                $('#button-upload').prop('disabled', false);
                $('#form-upload').remove()
            },
            success: function(json) {
                if (json['error']) {
                    console.debug(json['error']);
                } else {

                    $('#button-refresh').trigger('click');
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }
    pickup(e){
        /*console.debug(e.currentTarget)*/
        let pictureId = $(e.currentTarget).attr('id')
        $(this.imgId).val(pictureId)
        $(this.thumbId).attr('src', "https://tsl.kz/uploads/image" + pictureId)
        this.modal.hide()
    }
    new_folder(e){
        let pop = new Popover(e.currentTarget, {
            html: true,
            sanitize: false,
            placement: 'bottom',
            trigger: 'click',
            container: '#mod1',
            content:  function() {
                let html  = '<div>';
                html += '  <input type="text" name="new-folder" class="form-control" placeholder="Имя папки">';
                html += '  <span class="input-group-btn">' +
                    '<button type="button" title="Создать" id="button-create" class="btn btn-primary">' +
                    icon(findIconDefinition({ prefix: 'fas', iconName: 'plus-circle' }), {transform:{size: 20, x:0, y:0}, styles:{color:"white"}}).html +
                    '</button>' +
                    '</span>';
                html += '</div>';

                return html;
            },



            title: 'Создать папку'
        })

        pop.show()
        // document.querySelectorAll('#n_folder').forEach((formOutline) => {
        //     console.debug(formOutline)
        //     new Input(formOutline).init();
        // });
    }
    delete(e){
        let self = this
        let images = ''
        $('input[type="checkbox"]:checked').each(function (){
            images+='ids=' + $(this).val() + '&';

            }
        )
        $.ajax({
            url: 'https://tsl.kz:9000/image/delete?'+ images,
            type: 'DELETE',
            dataType: 'json',
            success: function (json){
                 $('#button-refresh').trigger('click');
            }
        })
    }
}

const modalTemplate = (files, currentDir) => `
<div
                    class="modal fade"
                    id="mod1"
                    tabindex="-1"
                    aria-labelledby="mod1"
                    aria-hidden="true"
                    data-imgManager-target="modal"
            >
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                          <!--  <h5 class="modal-title" id="exampleModalLabel">${currentDir}</h5>-->
                        <div class="d-grid gap-2 d-md-block">
                           <!-- <button type="button" data-action="click->imgManager#up_level" data-toggle="tooltip" title="up" id="button-parent" class="btn btn-primary">${icon(findIconDefinition({ prefix: 'fas', iconName: 'level-up-alt' }), {classes: ['fa-1x'], styles:{color:"white"}}).html}</button> -->
                            <button type="button" data-action="click->imgManager#refresh" data-toggle="tooltip" title="refresh" id="button-refresh" class="btn btn-primary">${icon(findIconDefinition({ prefix: 'fas', iconName: 'redo' }), {classes: ['fa-1x'], styles:{color:"white", margin:"0 5px 0 0"}}).html}Обновить список</button>
                            <button type="button" data-action="click->imgManager#upload" data-toggle="tooltip" title="upload" id="button-upload" class="btn btn-primary">${icon(findIconDefinition({ prefix: 'fas', iconName: 'plus' }), {classes: ['fa-1x'], styles:{color:"white", margin:"0 5px 0 0"}}).html} Загрузить</button>
                           <!-- <button type="button" data-action="click->imgManager#new_folder" data-toggle="tooltip" title="Новая папка" id="button-folder" class="btn btn-primary">${icon(findIconDefinition({ prefix: 'fas', iconName: 'folder-plus' }), {classes: ['fa-1x'], styles:{color:"white"}}).html}</button>-->
                            <button type="button" data-action="click->imgManager#delete" data-toggle="tooltip" title="delete" id="button-delete" class="btn btn-danger">${icon(findIconDefinition({ prefix: 'fas', iconName: 'trash' }), {classes: ['fa-1x'], styles:{color:"white", margin:"0 5px 0 0"}}).html} Удалить </button>
                        </div>                             
                            <button 
                              type="button" 
                              class="btn-close"
                              data-bs-dismiss="modal" 
                              aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body">
                        <div class="row" data-imgManager-target="files" style="justify-content: space-around; max-height: 400px; overflow-y: scroll">
                            ${files.reduce((html, file) => html + fileTemplate(file), '')}
                        </div>
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
`

const glasses = findIconDefinition({ prefix: 'fas', iconName: 'folder' })

const fileTemplate = (file) => {
    const i = icon(glasses, {title: file.value, transform:{size: 20, x:0}, classes: ['fa-10x'], styles:{color:"green", width:"100px"}})
    if (file.type === 'folder') {
        return `<div class="col-sm-3 mb-3 me-3 directory border border-1" data-action="click->imgManager#ch_dir" data-folder="${file.id}" style="display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;">${i.html}<span>${file.value}</span></div>`
    }
    return  `<div class="col-sm-3 mb-3 me-3 border border-1"><a href="javascript:void(0)" class="thumbnail" data-action="click->imgManager#pickup" id="${file.id}"  style="display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;"><img src="https://tsl.kz:9000/preview?id=${file.id}" alt="${file.value}" title="${file.value}" /><span style="max-width: 100%;
    word-wrap: break-word;">${file.value}</span></a>
    <input type="checkbox" value="${file.id}" name="imageList[]"></div>`
}