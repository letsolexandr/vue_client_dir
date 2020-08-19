import TableMethods from "./TableMethods";

export default {
    mixins:[TableMethods],
    data() {
        return {
            mode:"table",
            modes:["table","diagram"],
            items: [],
            selected: [],
            show_loading_action_bottoms:{
                    download:false
            },
            group_actions: [
                {title: 'Видалити обрані', action: 'confirmMultipleDelete'},
            ],
            xlsx_base_url:null,
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
            if (newVal){
                this.reloadData()
            }
            else{
                this.clearData();
            }

        },
        $route(newRoute, oldRoute) {
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
            let filter_value;
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
            let _order_column = Array.isArray(this.pagination.sortBy) ? this.pagination.sortBy[0] : this.pagination.sortBy;
            debugger
            let header = this.headers.find((item) => {
                return item.value === _order_column
            })
            let sort_column = header.sort_value || header.value;
            let order_column = this.formatOrderColumn(sort_column);

            if (val === false) {
                this.pagination.sort_by = order_column
            } else if (val === true) {
                this.pagination.sort_by = '-' + order_column
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
        this.addToStore();
        this.reloadData();
        this.registerReloadEvent();

    },
    activated() {
        //this.reloadData()
    },

    computed: {
        showCard() {
            if (this.$route.name.indexOf('id') > -1 && this.use_card) {
                return true
            } else {
                return false
            }
        }
    }
}