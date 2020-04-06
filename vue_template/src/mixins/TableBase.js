import {mapActions} from 'vuex';
import {loadOptions, parseChoices, getFromChoices, getChoices, go_to} from "./shared";
import axios from "axios";
import {getFileName} from "../js";
import {customError, handle_http_error} from "../store/modules/api/errorHandlers";

export default {
    components: {},
    data() {
        return {
            items: [],
            selected: [],
            group_actions: [
                {title: 'Видалити обрані', action: 'confirmMultipleDelete'},
            ],
            totalItems: null,
            loading: true,
            sortBy: null,
            sortDesc: false,
            filter_visible: false,
            main_variable: null,
            pagination: {},
            max_try_count: 5,
            search: '',
        }
    },
    watch: {
        object_id(newVal, oldVal) {
            debugger
            this.reloadData()
        },

        pagination: {
            handler: function (newVal, oldVal) {
                let val = newVal;
                //debugger
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    //console.log('pagination')
                    this.reloadData()
                }
            },
            deep: true
        },
        sortBy(newVal, oldVal) {
            if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
                return
            }
            var filter_value;
            if (Array.isArray(newVal)) {
                filter_value = newVal[0]
            } else if (typeof newVal !== "undefined") {
                filter_value = newVal
            } else {
                filter_value = null
            }
            debugger
            this.sortEvent(filter_value)
        },
        sortDesc(newVal, oldVal) {

            let val = Array.isArray(newVal) ? newVal[0] : newVal;
            let order_column = Array.isArray(this.pagination.sortBy) ? this.pagination.sortBy[0] : this.pagination.sortBy;

            if (val === false) {
                this.pagination.sort_by = this.formatOrderColumn(order_column)
            } else if (val === true) {
                this.pagination.sort_by = '-' + this.formatOrderColumn(order_column)
            } else {
                debugger
                this.pagination.sort_by = ''
            }
            debugger
        },
        search() {
            this.filterData()
        },
    },
    mounted() {
        this.addToStore()
        this.reloadData()

    },
    activated() {
        //this.reloadData()
    },
    $route(newRoute, oldRoute){
        this.reloadData()
    },
    computed: {
        showCard() {
            if (this.$route.name.indexOf('id') > -1 && this.use_card) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        ...mapActions(['getObject',
            'openAddObjectForm',
        ]),
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
            return axios.get(url, {params})
        },
        callMultipleMethod(method, params = null) {
            this[method](params)
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
            let params = {module_name: this.module_name, table: self}
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
            //debugger
            if (key.indexOf('.') !== -1) {
                return this.splitNested(key, value)
            } else if (header && header.choice_name) {
                return this.getFromChoices(value[key], header.choice_name)
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
        getAllFilters(){
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
                Object.assign(params, added_params)
            }
            return params
        },
        getDataFromApi(api_params) {
            console.log('getDataFromApi start');
            this.loading = true;
            let url = this.base_url;
            const params = this.getExtraParams();
            const router = this.$router;
            axios.get(url, {
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
                reload_after_delete: reload_after_delete
            };
            this.$store.state.info_dialog.deleteDialog.open(params)

        }
    }
}