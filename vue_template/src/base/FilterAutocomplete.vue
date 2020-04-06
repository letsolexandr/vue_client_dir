<template>
    <v-autocomplete
            v-model="select"
            :loading="loading"
            dense
            clearable
            :label="label"
            :items="items"
            item-text="__str__"
            item-value="id"
            :search-input.sync="search"
            no-data-text="Нічого не знайдено"
            :multiple="multiple"
            placeholder="Виберіть значення"
            :outlined="outlined"
            :placeholder="placeholder"
            :error-messages="error_messages"
            @click:clear="remove($event)"
    >
        <template v-slot:no-data>
            <v-list-item>
                <v-list-item-title>
                    Почніть вводити значення...
                </v-list-item-title>
            </v-list-item>
        </template>
    </v-autocomplete>

</template>

<script>
    import axios from 'axios';
    import {mapActions} from 'vuex';

    export default {

        props: ['value', 'url', 'multiple', 'label',
            'error_messages', 'filter_name', 'filter_param',
            'add_form', 'edit_form', 'model', 'placeholder', 'outlined'],
        data() {
            return {
                loading: false,
                items: [],
                data: [],
                page: 1,
                page_size: 50,
                has_next_page: true,
                search: null,
                initial: null,
                fields: 'id,__str__'
            }
        },
        mounted() {
            this.querySelections('')
            this.addOnscrollListener()
        },
        watch: {
            filter_param() {
                this.querySelections('')
            },
            page(val) {
                this.querySelections(val)
            },
            search(val) {
                this.querySelections(val)
            },
            initial(newVal, oldVal) {
                //debugger
                let initialExistInItems = this.items.filter((item) => {
                    return item.id === newVal
                }).length || false;
                if (!initialExistInItems) {
                    //debugger
                    this.$nextTick(() => {
                        this.loadInital()
                    })
                }
            },
            value(newValue, oldValue) {
                //debugger
                if (newValue) {
                    this.initial = newValue
                } else if (typeof newValue === 'undefined') {
                    this.initial = null
                } else {
                    this.initial = null
                }
            },
            url(val) {
                this.url = val;
            },
        }
        ,
        computed: {
            select: {
                get: function () {
                    return this.initial
                }
                ,
                set: function (val) {

                    if (typeof val === 'undefined') {
                        val = null
                    }
                    this.initial = val
                    this.$emit('input', val)
                }
            }
        }
        ,
        methods: {
            ...
                mapActions([
                    'getObject',
                    'openAddObjectForm',
                ]),
            getThis() {
                return this
            }
            ,
            handleScroll(event) {
                //debugger
                let height = event.target.scrollTop + event.target.clientHeight
                let scrollHeight = event.target.scrollHeight
                if (height >= scrollHeight) {
                    //debugger
                    //console.log(new Date())
                    this.loadNext()
                }
            },
            addOnscrollListener() {
                //debugger
                let container = this.$children[0].$children[2].$children[0]
                container.$el.addEventListener('scroll', {handleEvent: this.handleScroll})
            },
            loadNext() {
                if (this.has_next_page) {
                    this.page = this.page + 1
                }
            }
            ,
            reloadData(initial) {
                this.initial = initial;
                this.querySelections(this.select)
            }
            ,
            checkNext(next) {
                if (next) {
                    this.has_next_page = true
                }
            }
            ,
            loadInital() {
                let self = this
                if (!self.initial) {
                    return
                }
                let params = {fields: this.fields}
                axios.get(self.url + self.initial, {params})
                    .then((response) => {
                        //debugger
                        let result = response.data
                        self.items.push(result)
                    })
                    .catch(error => {
                        let error_data = error.response.data
                    })
            }
            ,
            remove(event) {
                this.$emit('input', null)
            }
            ,
            querySelections(val) {
                this.loading = true;
                // Simulated ajax query
                const self = this;
                const params = {
                    page: self.page,
                    page_size: self.page_size,
                    fields: this.fields,
                    search:this.search,
                    format: 'json'
                }
                if (this.filter_name && this.filter_param) {
                    params[this.filter_name] = this.filter_param
                }
                axios.get(self.url, {
                    params
                }).then((response) => {
                    //debugger
                    let results = response.data.results
                    self.items = self.items.concat(results)
                    self.count = response.data.count
                    self.next = response.data.next
                    self.loading = false
                    this.checkNext(self.next)
                })
                    .catch(error => {
                        let error_data = error.response.data

                    })
            }
        }
    }
</script>

