import axios from 'axios';

export default {
    props: {
        object_id: {
            type: Number,
            default: 0,
            required: false
        },
        filter_field_name: {
            type: String,
            default: null,
            required: false
        },
    },
    data() {
        return {
            namespace: null,
            module_name: null,
            base_url: null,
            title_value: null,
            object_details: {},
            extra_params: {}
        }
    },
    mounted() {
        this.getData()
    },
    watch: {
        object_id(newId, oldId) {
            //debugger
            if (newId) {
                this.getData()
            } else {
                this.object_details = {}
            }
        },
        $route(newRoute, oldRoute){
            this.reloadData()
        }
    },
    methods: {
        getUrl() {
            let url;
            debugger;
            if (this.filter_field_name) {
                url = this.base_url + '?' + this.filter_field_name + '=' + this.object_id
            } else {
                url = this.base_url + this.object_id
            }
            //debugger
            return url
        },
        getData() {
            let url = this.getUrl()
            if (this.object_id === 0) {
                return
            }
            debugger
            axios.get(url, {params: this.extra_params}).then((response) => {
                    if (response.data.results && response.data.results.length) {
                        this.object_details = response.data.results[0]
                    } else if (response.data) {
                        this.object_details = response.data;
                    }
                }
            ).catch((error) => {
                console.log(error)
            })
        },
        reloadData(){
            if(this.object_id){
                this.getData()
            }
            else{
                this.object_details = {}
            }
        }
    }
}
