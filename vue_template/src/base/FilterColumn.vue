<template>
    <v-card v-show="visible" :elevation="6">
        <v-card-title>
            Фільтри
        </v-card-title>
        <v-container grid-list-md>
            <v-layout wrap>

                <template v-for="header in value">

                    <template v-if="header.filter">
                        <v-flex xs12 md3 lg3>
                            <template v-if="header.filter.type === 'select'">
                                <v-select :items="['==', '>', '<', 'like']"
                                          :label="header.text"
                                          v-model="header.filter.value"
                                          outlined
                                          dense
                                          placeholder="Виберіть значення">
                                </v-select>
                            </template>
                            <template v-if="header.filter.type === 'select_choices'">
                                <v-select
                                        v-model="header.filter.value"
                                        :label="header.text"
                                        :items="update_element.getChoices(header.choice_name)"
                                        item-text="display_name"
                                        item-value="value"
                                        cache-items
                                        clearable
                                        outlined
                                        dense
                                        placeholder="Виберіть значення"
                                        @input="clearSelect(header.filter)"
                                >
                                </v-select>
                            </template>
                            <template v-if="header.filter.type === 'autocomplete'">

                                <FilterAutocomplete v-model="header.filter.value"
                                                    :label="header.text"
                                                    :url="header.filter.url"
                                                    dense
                                                    outlined
                                                    placeholder="Виберіть значення"
                                ></FilterAutocomplete>
                            </template>
                            <template v-if="header.filter.type === 'text'">
                                <v-text-field v-model="header.filter.value" :label="header.text"
                                              dense
                                              outlined
                                              placeholder="Введіть значення"
                                >
                                </v-text-field>
                            </template>
                            <template v-if="header.filter.type === 'checkbox'">
                                <v-checkbox v-model="header.filter.value" :label="header.text"
                                              dense
                                              outlined
                                              placeholder="Введіть значення"
                                >
                                </v-checkbox>
                            </template>

                            <template v-if="header.filter.type === 'date'">
                                <v-layout>
                                    <v-flex>
                                        <DataPicker v-model="header.filter.value"
                                                    :label="header.text"
                                                    dense
                                                    outlined
                                        ></DataPicker>
                                    </v-flex>
                                    <template v-if="header.filter.value">
                                        <v-flex xs6 md6 lg6>
                                            <v-btn text icon color="primary" @click="clearFilter(header)">
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </template>
                                </v-layout>
                            </template>
                            <template v-if="header.filter.type === 'comparison'">
                                <v-layout>
                                    <v-flex xs6 md12 lg6>
                                        <v-select v-model="header.filter.request_param"
                                                  :label="header.text"
                                                  item-text="name"
                                                  item-value="value"
                                                  dense
                                                  outlined
                                                  :items="header.filter.comparison_items">
                                        </v-select>
                                    </v-flex>
                                    <v-flex xs6 md12 lg6>
                                        <v-text-field v-model="header.filter.value"
                                                      :label="header.text"
                                                      dense
                                                      outlined
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </template>
                        </v-flex>
                    </template>
                    <template v-else>
                    </template>
                </template>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    import DataPicker from "./DataPicker";
    import FilterAutocomplete from "./FilterAutocomplete";


    export default {
        name: "FilterColumn",
        components: {FilterAutocomplete, DataPicker},
        props: {
            value: {
                type: Array,
                default: () => {
                    []
                }
            },
            extra_params: {
                type: Object,
                default: () => {
                    {
                    }
                }
            },

            update_element: {
                type: Object,
                default: () => {
                    {
                    }
                }
            },
            visible: {
                type: Boolean,
                default: () => {
                    return false
                }
            }
        },
        data: () => ({
            isChanged: false,
        }),
        watch:
            {
                value: {
                    handler: function (val, oldVal) {
                        //debugger
                        //console.log('handler')
                        this.isChanged = false
                        val.forEach((item) => {
                            if (item.filter) {
                                this.setFilter(item)
                            }
                        })
                        this.reloadSourceIfChange()
                    }
                    ,
                    deep: true
                },
            },
        methods: {
            filterByParam(param, value) {
                //console.log('filterByParam')
                this.checkExtraParams(param)
                if (param && this.extra_params[param] !== value) {
                    this.extra_params[param] = value
                    this.isChanged = true
                }
            },
            clearSelect(filter) {
                if (typeof filter.value === 'undefined') {
                    filter.value = null
                }
            },

            setFilter(item) {
                //console.log('setFilter')
                //debugger
                if (item.filter) {
                    if (item.filter.request_param) {
                        if (item.filter.comparison_items) {
                            this.clearCacheComparison(item.filter.request_param, item.filter.comparison_items)
                        }
                        this.filterByParam(item.filter.request_param, item.filter.value)
                        return
                    }
                    if (item.value) {
                        this.filterByParam(item.value, item.filter.value)

                    }
                }
            },
            clearCacheComparison(request_param, comparison_items) {
                //debugger
                console.log('clearCacheComparison')
                const all_params_to_delete = comparison_items.filter((item) => {
                    if (item.value !== request_param) {
                        return true
                    }
                });
                all_params_to_delete.forEach((item) => {
                    delete this.extra_params[item.value]
                })
                //this.isChanged = false
            },
            checkExtraParams(param) {
                //console.log('checkExtraParams')
                if (typeof this.extra_params[param] === 'undefined') {
                    this.extra_params[param] = null
                }
            },
            reloadSourceIfChange() {
                //debugger
                if (this.isChanged) {
                    if (this.update_element) {
                        console.log('reloadSourceIfChange')
                        this.update_element.filterData()
                        this.isChanged = false
                    }
                }
            },
            clearFilter(header) {
                //console.log('clearFilter')
                header.filter.value = null
                this.extra_params[header.value] = header.filter.value
                this.update_element.filterData()
                this.isChanged = false
            }
        }
    }
</script>
