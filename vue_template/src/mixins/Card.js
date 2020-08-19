export default {
    data() {
        return {
            namespace: null,
            module_name: null,
            component_name: null,
            id: null,
            object_details: null,
            base_url:null,
        }
    },
    mounted() {
       this.handleOnMount();
    },
    created() {
        this.$root.$on(this.getEventName(), this.getData)
    },
    watch: {
        $route() {
            if (this.$route.params.id) {
                this.id = parseInt(this.$route.params.id)
                this.getData()
            }
            if (!this.$route.params.id) {
                this.id = null
                this.object_details = null
            }
        }
    },
    methods: {
        handleOnMount(){
            debugger
            if (this.$route.params.id) {
                this.id = parseInt(this.$route.params.id)
                this.getData()
            }
            if (!this.$route.params.id) {
                this.id = null
                this.object_details = null
            }
        },
        getEventName() {
            return 'reload-' + this.namespace + '-' + this.module_name + '-' + this.component_name;
        },
        getData() {
            let url = this.base_url + this.id

            this.axios.get(url).then((response) => {
                    this.object_details = response.data
                }
            ).catch((error) => {
                console.log(error)
                this.object_details = null
            })
        },
    }
}
