import axios from "axios";
import {handle_http_error} from "./errorHandlers"
import {show_message_in_snackbar} from "./common"

function getEditableFields(form) {
    let editable_fields = form.editable_fields || (Object.keys(form.fields).splice(","))
    //debugger
    return Array.from(new Set(editable_fields.concat(['id'])))
}

function getFormData(form) {
    /* поля форми які містять файли */
    const form_data = new FormData()
    const file_fields = form.getFileFieldV1s()
    const editable_fields = getEditableFields(form)
    for (let [key, value] of Object.entries(file_fields)) {
        if (editable_fields.indexOf(key) !== -1) { /* перевіряємо чи файл*/
            form_data.append(key, value)
            form_data.has_files = true
        }
    }
    return form_data
}

function getSendParams(form) {

    let fields = form.fields
    var id, http;
    if (fields.id) {
        id = fields.id + '/'
        http = axios.patch
    } else {
        id = ''
        http = axios.post
    }
    return {id, http}
}

function thenFormSave(form, response) {
    form.fields = {}
    form.form_errors = {}
    form.dialog = false
    let message = `${response.data.__str__ || ''} - Збережено!`
    let store = form.$store
    show_message_in_snackbar(message, store)
    debugger
    if (form.redirect_to_card) {
        form.$router.push(form.card_url + response.data.id)
        return
    }
    if (form.on_save_callback) {
        if (form.on_save_callback_params) {
            form[form.on_save_callback](form.on_save_callback_params)
        } else {
            form[form.on_save_callback]()
        }
    }
    if (form.reload_on_save) {
        form.reloadPage()
        return
    }
    if (form.update_element) {
        form.update_element.reloadData(response.data.id)
    }


}

function saveData(form, module) {
    //debugger
    console.log('saveData')
    const self = this;
    let base_url = form.base_url || module.table.base_url
    const static_form_data = form.static_form_fields || {}
    const req_params = Object.assign(static_form_data, form.getNoFileFieldV1s())
    //Object.freeze(req_params);
    const send_params = getSendParams(form)
    const http = send_params.http
    const id = send_params.id
    const form_data = getFormData(form)
    //debugger
    /* Збереження іде в два етапи:
        - збереження не файлових полів форми
        - відправка файлів */
    //debugger
    if (form.pre_request_callback) (
        form[form.pre_request_callback]()
    )

    setTimeout(() => {
        form.loadingPGBar = true
    }, 500)


    http(`${base_url}${id}`, req_params)
        .then((response) => {
            /* якщо успішно, і форма містить файли відправляємо файли
            якщо форма містить файл - відправляємо форму з файлом */
            if (form_data.has_files) {
                return axios.patch(`${base_url}${response.data.id}/`, form_data)
            } else {
                /* якщо форма не містить файл - повертаємо проміс  з результатами попереднього запиту */
                return response
            }
        }).then((response) => {
        form.loadingPGBar = false
        thenFormSave(form, response)
        //debugger
        if (module.table) {
            form.$nextTick(() => {
                module.table.reloadData()
            })
        }
    })
        .catch(error => {
            form.loadingPGBar = false
            let error_data = error.response.data
            form.form_errors = Object.assign({}, error_data)
            if (!error_data) {
                handle_http_error(form.$router, error, form.$store)
            }
        })
}

export default saveData;
