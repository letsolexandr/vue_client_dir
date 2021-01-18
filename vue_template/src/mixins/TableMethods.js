import {mapActions} from 'vuex';
import {loadOptions, parseChoices, getFromChoices, getChoices, go_to, makeQueryString} from "./shared";
import {getFileName,saveAs} from "../js";
import {customError, handle_http_error} from "../store/modules/api/errorHandlers";

export default {
    methods: {
        ...mapActions(['getObject',
            'openAddObjectForm',
        ]),
        registerReloadEvent(){
            let event_name = this.namespace+'-'+this.module_name+'-reload';
            console.log('register event listener:'+event_name);
            this.$root.$on(event_name,this.reloadOnEvent);
        },
        reloadOnEvent(){
            let event_name = this.namespace+'-'+this.module_name+'-reload';
            console.log('reload_emit: '+event_name);
            this.reloadData()
        },
        nextViewMode(){
            let index = this.modes.indexOf(this.mode)
            if (index +1 > this.modes.length-1){
                this.mode = this.modes[0];
            }
            else{
                this.mode = this.modes[index +1];
            }
        },
        getColorFromChoices(header, item) {
            let key = item[header.choice_name]
            return header.choice_colors[key]
        },
        confirmMultipleDelete(params = null) {
            //debugger
            const _params = Object.assign({}, this.static_model_params);
            _params['ids'] = this.selected.map((item) => {
                return item.id
            });
            _params['request_q'] = this.getExtraParams();
            const obj_counts = _params['ids'].length;
            //debugger
            this.selected = [];
            let message = `Видалити обрані ${obj_counts} записи(ів)?`;
            this.$store.state.info_dialog.confirmDialog.open(this.MultipleDelete, _params, this.getThis(), message, null, true)
        },

        MultipleDelete(params) {
            const url = `${this.$config.domen}/api-base/multiple-delete`;
            return this.axios.get(url, {params})
        },
        callMultipleMethod(method, params = null) {
            this[method](params)
        },
        formatDate(value) {
            return new Date(value).toLocaleString()
        },
        clearData(){
            this.items=[]
        },
        reloadData() {
            //debugger
            this.loadOptions();
            this.$nextTick(() => {
                this.getDataFromApi()
            })
        },
        switchSelect(val, props) {
            if (val) {
                props.select(true)
            } else {
                props.select(false)
            }
        },
        addToStore() {
            const self = this;
            let params = {module_name: this.module_name, table: self};
            if (this.namespace) {
                params['namespace'] = this.namespace
            }
            console.log('addToStore');
            this.$nextTick(() => {
                this.$store.dispatch('addTableToStore', params).then(() => {
                    self.loadOptions()
                })
            })
        },
        filterData() {
            this.pagination.page = 1;
            this.reloadData()
        },
        getThis() {
            return this
        },
        getItem(key, value, header = null) {
            if (key.indexOf('.') !== -1) {
                return this.splitNested(key, value)
            } else if (header && header.choice_name) {
                let val = this.getFromChoices(value[key], header.choice_name);
                return val
            } else {
                return value[key]
            }
        },
        loadOptions,
        parseChoices,
        getFromChoices,
        getChoices,
        go_to,
        getFileName,
        splitNested(key, value) {
            //debugger
            if (key.indexOf('.') !== -1) {
                let keys = key.split('.');
                let current_key = keys.shift();
                let new_value = value[current_key];
                let new_key = keys.join('.');
                if (!new_value || typeof new_value === 'undefined') {
                    return ''
                }
                return this.splitNested(new_key, new_value)
            } else {
                return value[key]
            }
        },
        getVisibleHeaders() {
            console.log('getVisibleHeaders');
            let activeHeaders = this.headers.filter((header) => {
                if (header.visible) {
                    return true
                } else {
                    return false
                }
            });
            return activeHeaders
        },
        getAllFilters() {
            let activeHeaders = this.getVisibleHeaders();
            return activeHeaders.concat(this.custom_filters);
        },
        getExtraParams() {
            const params = {
                format: 'json',
                page_size: this.pagination.itemsPerPage,
                page: this.pagination.page,
                ordering: this.pagination.sort_by,
                search: this.search
            };
            Object.assign(params, this.extra_params);
            if (this.extra_watch && this.object_id !== 0) {
                const added_params = {};
                const param_name = this.extra_watch.param_name;
                //debugger
                added_params[param_name] = this.object_id;
                Object.assign(params, added_params);
                Object.assign(params, this.static_model_params)
            }
            Object.assign(params, this.static_model_params);
            debugger

            return params
        },
        getDataFromApi(api_params) {
            debugger

            console.log('getDataFromApi start');
            //refreshTokenFromStorage(this)
            this.loading = true;
            let url = this.base_url;
            const params = this.getExtraParams();
            const router = this.$router;
            this.axios.get(url, {
                params
            })
                .then(response => {
                    let data = response.data;
                    this.loading = false
                    this.items = data.results
                    this.totalItems = data.count
                    this.pagination.totalItems = data.count
                    console.log('getDataFromApi end')
                })
                .catch(error => {
                    handle_http_error(router, error, this.$store, this)
                })
        },
        downloadXlsx() {
            console.log('load XLSX start');
            this.loading = true;
            this.show_loading_action_bottoms.download = true;
            let url = this.xlsxBaseUrl||this.base_url;
            let params = Object.assign(this.getExtraParams(),{format:'xlsx', page_size: 10000});
            const download_url = (makeQueryString(url,params))
            saveAs(download_url,'contracts_export.xlsx');
            setTimeout(()=>{
                this.loading = false;
                this.show_loading_action_bottoms.download = false;
                },1000)



        },
        sortEvent(header_name) {
            if (!header_name || typeof header_name === 'undefined') {
                this.pagination.sortBy = '';
                return
            }
            let header = this.headers.find((item) => {
                return item.value === header_name
            })

            console.log('sortEvent');
            let column = header.sort_value || header.value;
            debugger
            const order_column = this.formatOrderColumn(column);
            this.pagination.sort_by = order_column
            //debugger
        },
        formatOrderColumn(column) {
            return column.replace('.', '__')
        },

        openDeleteDialog({id, update_element, reload_after_delete}) {
            let params = {
                base_url: this.base_url,
                id: id,
                update_element: update_element,
                reload_after_delete: reload_after_delete,
            };
            this.$store.state.info_dialog.deleteDialog.open(params)

        }
    }
}