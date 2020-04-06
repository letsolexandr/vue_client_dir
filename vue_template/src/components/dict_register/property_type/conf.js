export default {
    mixins: [TableBase],
    components: {MainActivityForm},
    data() {
        return {
            namespace: 'dict',
            module_name: 'property_type',
            base_url: `${this.$config.domen}/dict/property-type/`,
            headers: [{
                text: 'Код',
                align: 'left',
                //sortable: false,
                value: 'code'
            },
                {
                    text: 'Назва',
                    value: 'name'
                },
                {
                    text: 'Дії',
                    value: 'id'
                },
            ]
        }
    }
}