import axios from 'axios';

//import rules from '@/cummon';


function register_module_if_not_exist(self, params) {
    debugger
    var module_name;

    if (!self.state[params.namespace]) {

        if (params.namespace) {

            self.registerModule(params.namespace, {});

            module_name = [params.namespace, params.module_name];

            self.registerModule(module_name, {

                state: {

                    table: null,

                    form: null,

                }

            });

            return;

        }

    }


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

    //debugger

}


//-------------------------------------

function get_module(self, params) {
    debugger
    if (params.namespace) {

        return self.state[params.namespace][params.module];

    }

    if (params.module) {

        return self.state[params.module];

    }

}

//-------------------------------------

//-------------------------------------

function handle_http_error(router, error) {

    let status = error.response.status

    if (status == 401) {

        //debugger

        router.push(`/login`);

    }

}


//-------------------------------------


const actions = {

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


    getObject({

                  commit,

                  state

              }, params) {

        debugger;

        let module = get_module(this, params);

        let table = module.table;

        let form_name = params.form_name || 'form';

        let form = module[form_name];

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

                handle_http_error(form.$router, error);

                /*--прибираємо екран завантаження, якщо існує*/

                if (typeof (form.loadingPGBar) != 'undefined') {

                    form.loadingPGBar = false;

                }

                /*прибираємо екран завантаження, якщо існує--*/

            })

    },


    deleteObject({commit}, params) {
        debugger

        let module = get_module(this, params);
        ;

        let table = module.table;

        axios.delete(`${table.base_url}${params.id}/`)

            .then((response) => {

                console.log(response);

                let message = `${params.confirm_del_message} - видалено!`;

                this.dispatch('getDataFromApi', {

                    url: table.base_url,

                    table: table.module_name

                });

                this.dispatch('showMessage', message);

            })

            .catch(error => {


                let error_data = error.response.data;

                handle_http_error(table.$router, error);


            })

    },


    getobjectInfo({

                      commit

                  }, params) {

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

                handle_http_error(table.$router, error);


            })

    },

    /*---------------------------------------------------------*/

    saveObject({
                   commit,
                   state
               }, params) {

        let module = get_module(this, params);

        let table = module.table;

        const module_name = params.module || table.module_name;

        const namespace = params.namespace;

        let form_name = params.form_name;

        /* якщо назва специфічнох форми не сказана - використовуємо універсальну*/

        let form = form_name ? module[form_name] : module['form'];


        /* якщо не вказано апі використовуємо вказане в таблиці*/

        let base_url = form.base_url || module.table.base_url;


        const req_params = {};

        const file_fields = ['file_shp', 'file_valid_docx'];/* поля форми які містять файли*/

        const form_data = new FormData();

        var form_has_file = false;

        //debugger


        /* --вибираємо поля які будуть відпрвлені на сервер */

        var editable_fields = form.editable_fields || (Object.keys(form.fields).splice(','));

        editable_fields = new Set(editable_fields.concat(['id']))


        for (var key of editable_fields.values()) {

            //debugger

            var field_value = form.fields[key];


            if (file_fields.indexOf(key) !== -1) { /* перевіряємо чи файл*/


                if (!field_value) { /* перевіряємо чи не пустий*/

                    form_data.append(key, field_value);

                    form_has_file = true

                }

            } else {

                req_params[key] = field_value;

            }

        }

        /* вибираємо поля які будуть відпрвлені на сервер--- */

        var id, http, file_loader;


        if (form.fields.id) {

            id = form.fields.id + '/';

            http = axios.patch;

        } else {

            id = '';

            http = axios.post;


        }
        /* Збереження іде в два етапи:

          - збереження не файлових полів форми

          - відправка файлів*/
        //debugger

        http(`${base_url}${id}`, req_params)

            .then((response) => {

                /* якщо успішно, і форма містить файли відправляємо файли */

                /* якщо форма містить файл - відправляємо форму з файлом */

                if (form_has_file) {

                    return axios.patch(`${base_url}${response.data.id}/`, form_data)

                } else {

                    /* якщо форма не містить файл - повертаємо проміс  з результатами попереднього запиту*/

                    return response

                }

            }).then((response) => {

            form.fields = {};

            form.dialog = false;

            let message = `${response.data.__str__} - Збережено!`;

            if (table) {

                this.dispatch('getDataFromApi', {

                    url: base_url,

                    table: module_name,

                    namespace: namespace,

                });

            }

            this.dispatch('showMessage', message);

            form.form_errors = {};

            this.dispatch('clearFormErrors', {

                module: module_name, form_name: form_name

            });

            //

            if (form.update_element) {

                form.update_element.reloadData()

            }

        })

            .catch(error => {

                let error_data = error.response.data;

                form.form_errors = error_data;

                handle_http_error(form.$router, error);

            })

    },


    /*---------------------------------------------------------*/
    openAddObjectForm({commit, state}, param) {
        debugger;
        var initial = {}
        if (param instanceof Object) {
            let module_name = param.module_name;
            initial = param.initial || {}

        }
        if (param instanceof String) {
            let module_name = param
        }
        let module = get_module(this, {module: module_name});
        module.form.fields = initial
        module.form.dialog = true;
    },


    /*---------------------------------------------------------*/

    addTableToStore({commit, state}, params) {
        //debugger;
        /*<-перевіка чи вказано простір імен*/
        register_module_if_not_exist(this, params);

        if (params.namespace) {
            this.state[params.namespace][params.name].table = params.table;
        } else {
            this.state[params.name].table = params.table;
        }

    },


    addFormToStore({commit, state}, params) {
        debugger

        register_module_if_not_exist(this, params);
        let form_name = params.form_name || 'form';

        if (params.namespace) {
            this.state[params.namespace][params.module_name][form_name] = params.form;
        }

        if (params.module_name) {
            this.state[params.module_name][form_name] = params.form;
        }

    },


    getDataFromApi({

                       commit,

                       state

                   }, api_params) {

        //debugger;


        var table;

        if (api_params.namespace && api_params.table) {

            table = this.state[api_params.namespace][api_params.table].table;

        }

        if (!api_params.namespace && api_params.table) {


            table = this.state[api_params.table].table;

        }

        //debugger

        table.loading = true;

        let url = api_params.url;

        const params = {

            format: 'json',

            page_size: table.pagination.rowsPerPage,

            page: table.pagination.page,

            ordering: table.sort_by,

            search: table.search

        };

        const router = table.$router

        //debugger

        //const headers = {headers : get_token_headers()};

        Object.assign(params, table.extra_params);

        //debugger;


        axios.get(url, {

            params

        })

            .then(response => {

                let data = response.data;

                table.loading = false

                table.items = data.results

                table.totalItems = data.count

                table.pagination.totalItems = data.count

            })

            .catch(error => {

                //debugger

                handle_http_error(router, error);

                //console.log(error)

            })

    },


}


const apiModule = {

    state,

    actions,

}


export default apiModule;


