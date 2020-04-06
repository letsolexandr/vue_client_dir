import axios from 'axios';
import saveData from "./saveObject";
import {handle_http_error, customError} from "./errorHandlers"
import {show_message_in_snackbar} from "./common"
//import rules from '@/cummon';

//<!-----------------------register_module_if_not_exist-----------------------------//
function register_module_if_not_exist(self, params) {
    /*Реєстрація модуля, якщо він відсутній*/
    // debugger
    var module_name;
    /*Реєстрація простору імен, якщо щн не зареєстрований*/
    if (!self.state[params.namespace]) {
        if (params.namespace) {
            self.registerModule(params.namespace, {});
            module_name = [params.namespace, params.module_name];
            self.registerModule(module_name, {
                state: {
                    table: null,
                    form: null,
                }
            })
            return;
        }
    }

    /*Якщо простір імен зареєстрований, реєструємо модуль всередині нього*/
    if (self.state[params.namespace]) {

        if (!self.state[params.namespace][params.module_name]) {

            self.registerModule([params.namespace, params.module_name], {
                state: {
                    table: null,
                    form: null,
                }
            });
            return;
        }
    }

    /* Якщо не зареєстрований, реєструємо)) */
    if (!self.state[params.module_name]) {
        module_name = params.module_name;

        self.registerModule(module_name, {

            state: {

                table: null,

                form: null,

            }

        });

    } else {

        module_name = self.state[params.module_name]

    }
}

//-------------------register_module_if_not_exist-------------------------!>//


//-------------------------------------

function get_module(self, params) {
    //debugger
    if (params.namespace) {

        return self.state[params.namespace][params.module];

    }

    if (params.module) {

        return self.state[params.module];

    }

}

//-------------------------------------

//-------------------------------------

//-------------------------------------


const actions = {
    showMessage({
                    commit,
                    state
                }, {message}) {
        show_message_in_snackbar(message, this)
    },
    handleError({
                    commit,
                    state
                }, {error}) {
        //debugger
        handle_http_error(null, error, this)
    },
    clearFormErrors({
                        commit,
                        state
                    }, params) {

        let module = get_module(this, params);
        let form_name = params.form_name
        let form = form_name ? module[form_name] : module['form'];

        Object.keys(form.form_errors)
            .forEach(e => {
                form.form_errors[e] = null;
            });
    },


    getObject({commit, state}, params) {
        console.log(' call "getObject"')
        //debugger
        let module = get_module(this, params)
        let table = module.table
        let form_name = params.form_name || 'form'
        let form = module[form_name]
        if (!form) {
            this.state.info_dialog.infoDialog.open({
                title: 'Помилка налаштування',
                message: 'Форма редагування не вказана.'
            })
            return
        }
        let base_url = form.base_url || module.table.base_url;
        form.update_element = params.update_element;
        form.fields = {};
        /*--активуємо екран завантаження, якщо існує*/
        //debugger;
        /*активуємо екран завантаження, якщо існує--*/
        form.dialog = true;
        if (typeof (form.loadingPGBar) != 'undefined') {
            form.loadingPGBar = true;
        }

        axios.get(`${base_url}${params.id}/`)

            .then((response) => {

                console.log(response);
                /*--прибираємо екран завантаження, якщо існує*/
                form.fields = response.data;
                setTimeout(() => {
                    if (typeof (form.loadingPGBar) != 'undefined') {

                        form.loadingPGBar = false;
                    }
                }, 1000)

                /*прибираємо екран завантаження, якщо існує--*/

            })

            .catch(error => {
                let error_data = error.response.data;
                handle_http_error(form.$router, error, this);
                /*--прибираємо екран завантаження, якщо існує*/
                if (typeof (form.loadingPGBar) != 'undefined') {

                    form.loadingPGBar = false;
                }
                /*прибираємо екран завантаження, якщо існує--*/
            })

    },


    deleteObject({commit}, params) {
        //debugger
        let module = get_module(this, params);

        let table = module.table;

        axios.delete(`${table.base_url}${params.id}/`)

            .then((response) => {

                console.log(response);

                let message = `${params.confirm_del_message} - видалено!`;

                this.dispatch('getDataFromApi', {

                    url: table.base_url,

                    table: table.module_name

                });
                show_message_in_snackbar(message, this)

            })

            .catch(error => {


                let error_data = error.response.data;

                handle_http_error(table.$router, error, this);


            })

    },


    getobjectInfo({commit}, params) {
        console.log(' call "getobjectInfo"')

        let module = get_module(this, params);
        let table = module.table;
        axios.get(`${table.base_url}${params.id}/`)
            .then((response) => {
                let object_name = response.data.__str__;
                params.confirm_del_message = object_name;
                this.dispatch('deleteObject', params);
            })

            .catch(error => {
                let error_data = error.response.data;
                handle_http_error(table.$router, error, this);


            })

    },

    /*---------------------------------------------------------*/

    saveObject({commit, state}, params) {
        let module = get_module(this, params);
        let table = module.table;
        const module_name = params.module || table.module_name;
        const namespace = params.namespace;
        let form_name = params.form_name;
        /* якщо назва специфічнох форми не сказана - використовуємо універсальну*/
        let form = form_name ? module[form_name] : module['form'];
        /* якщо не вказано апі використовуємо вказане в таблиці*/
        saveData(form, module)
    },


    /*---------------------------------------------------------*/
    openAddObjectForm({commit, state}, params) {
        //debugger;
        console.log('call "openAddObjectForm"')
        let module_name = params.module || params
        let namespace = params.namespace
        let initial = params.initial || {}
        let module = get_module(this, {module: module_name, namespace: namespace});
        const form_name = params.form_name || 'form';
        //debugger
        if (!module[form_name]) {
            customError(state, 'Помилка налаштування', 'Форма створення обєкта не вказана')
            return
        }
        const form = module[form_name]
        form.update_element = params.update_element
        form.fields = initial || {};
        form.dialog = true;
    },
    /*---------------------------------------------------------*/

    addTableToStore({commit, state}, params) {
        //debugger;
        /*<-перевіка чи вказано простір імен*/
        register_module_if_not_exist(this, params);

        if (params.namespace) {
            this.state[params.namespace][params.module_name].table = params.table;
        } else {
            this.state[params.module_name].table = params.table;
        }

    },
    addFormToStore({commit, state}, params) {
        //debugger
        register_module_if_not_exist(this, params);
        let form_name = params.form_name || 'form';

        if (params.namespace) {
            this.state[params.namespace][params.module_name][form_name] = params.form
            return
        }

        if (params.module_name) {
            this.state[params.module_name][form_name] = params.form;
        }
        console.log("addFormToStore --> module:",params.module_name)
    },
}


const apiModule = {
    actions,
}


export default apiModule;


