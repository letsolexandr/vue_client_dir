import BaseDataTable from "../../../base/BaseDataTable";
import axios from "axios";

export default {
    extends: BaseDataTable,
    data() {
        return {
            group_actions: [
                {title: 'Вивантажити документи', action: 'exportAccrualsZIP'},
                {title: 'Видалити обрані', action: 'confirmMultipleDelete'},
            ],
        }
    },
    methods: {
        exportAccrualsZIP(params = null) {
            //debugger
            const _params = Object.assign({}, this.static_model_params);
            _params['ids'] = this.selected.map((item) => {
                return item.id
            });
            _params['request_q'] = this.getExtraParams();
            const obj_counts = _params['ids'].length;
            this.selected = [];
            const url = `${this.$config.domen}/contracts/export-accrual-zip`;
            return axios.get(url, {params:_params}).then((response) => {
                let file_url = `${this.$config.root}${response.data.url}`;
                window.open(file_url, '_blank');
            }).catch((error) => {
                console.log(error)
            })
        },
    }
}