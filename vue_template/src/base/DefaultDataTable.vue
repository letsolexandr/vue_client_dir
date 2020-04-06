<template>
    <div>
        <div v-show="!showCard">
            <v-row>
                <v-col>
                    <FilterColumn :value="getVisibleHeaders(headers)"
                                  :extra_params="extra_params" :update_element="getThis()"
                                  :visible="filter_visible">
                    </FilterColumn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card v-show="$route.name !== 'id'" :elevation="6">

                        <v-card-title>
                            <v-text-field
                                    v-model="search"
                                    append-icon="search"
                                    label="Пошук"
                                    single-line
                                    hide-details
                            ></v-text-field>
                            <v-spacer></v-spacer>
                            <v-spacer></v-spacer>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"
                                   fab dark small
                                   @click="reloadData()"
                            >
                                <v-icon>mdi-reload</v-icon>
                            </v-btn>
                            <v-btn color="primary"
                                   fab dark small
                                   @click="filter_visible = !filter_visible"
                            >
                                <v-icon>mdi-filter-outline</v-icon>
                            </v-btn>
                            <ColumnController v-model="headers"></ColumnController>

                        </v-card-title>
                        <v-card-text>

                        </v-card-text>
                        <v-container grid-list-md text-xs-center>

                            <v-layout row wrap>
                                <v-flex xs12 md12 ms12 lg12 xl12>
                                    <v-data-table :headers="getVisibleHeaders(headers)"
                                                  :items="items"
                                                  locale='uk-UA'
                                                  :options.sync="pagination"
                                                  :server-items-length="totalItems"
                                                  :loading="loading"
                                                  :sort-by.sync="sortBy"
                                                  :sort-desc.sync="sortDesc"
                                                  no-data-text="Немає даних..."
                                                  class="elevation-1">

                                        <template v-slot:item="props">
                                            <tr>
                                                <td v-for="header in getVisibleHeaders(headers) "
                                                    class="text-xs-center">
                                                    <slot :name="header.value" :props="props">
                                                        <template v-if="header.value === 'id' ">
                                                            <v-icon small class="mr-2" @click="getObject({
                                                            id:props.item.id,
                                                            namespace: namespace,
                                                            form_name: edit_form_name,
                                                            module: module_name})">
                                                                edit
                                                            </v-icon>

                                                                <v-icon small
                                                                        @click="openDeleteDialog({id:props.item.id,update_element:getThis(),reload_after_delete:reload_after_delete})">
                                                                    delete
                                                                </v-icon>

                                                            <slot name="extra-action"></slot>

                                                        </template>
                                                        <template v-else>
                                                            <template v-if="header.url">

                                                                <a @click="go_to(header.url,props.item.id)">
                                                                    {{getItem(header.value ,props.item,header)}}</a>
                                                            </template>
                                                            <template v-else-if="header.widget==='checkbox'">
                                                                <v-checkbox disabled
                                                                            :value="getItem(header.value,props.item,header)">
                                                                </v-checkbox>
                                                            </template>
                                                            <template v-else-if="header.widget==='href'">
                                                                <a :href="getItem(header.value,props.item,header)"
                                                                   target="_blank">
                                                                    {{getFileName(getItem(header.value,props.item,header))}}
                                                                </a>
                                                            </template>
                                                            <template v-else-if="header.widget==='colored_badge'">

                                                                <v-chip dark>
                                                                    {{getItem(header.value,props.item,header)}}
                                                                </v-chip>
                                                            </template>
                                                            <template v-else>
                                                                {{getItem(header.value,props.item,header)}}
                                                            </template>
                                                        </template>
                                                    </slot>
                                                </td>
                                            </tr>
                                        </template>
                                    </v-data-table>
                                </v-flex>
                            </v-layout>
                            <slot name="form"></slot>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div v-show="showCard">
            <transition name="component-fade" mode="out-in">
                <keep-alive>
                    <router-view class="view tree" name="item"></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
    import TableBase from "@/mixins/TableBase"
    import ColumnController from "../base/ColumnController";
    import FilterColumn from "../base/FilterColumn";

    export default {
        mixins: [TableBase],
        components: {FilterColumn, ColumnController},
        props: {
            headers: {
                type: Array,
                required: true
            },
            namespace: {
                type: String,
                required: false,
                default: null
            },
            base_url: {
                type: String,
                required: true
            },
            module_name: {
                type: String,
                required: true
            },
            use_card: {
                type: Boolean,
                required: false,
                default: () => {
                    return false
                }
            },
            edit_form_name: {
                type: String,
                default: 'form',
                required: false
            },

            extra_params: {
                type: Object,
                required: false,
                default: () => {
                    return {}
                }
            },
            reload_after_delete: {
                type: Boolean,
                required: false,
                default: false
            },
            choices: {
                type: Object,
                required: false,
                default: () => {
                    return {}
                }
            },
            custom_filters: {
                type: Array,
                required: false,
                default: () => {
                    return []
                }
            },
        },
    }
</script>
