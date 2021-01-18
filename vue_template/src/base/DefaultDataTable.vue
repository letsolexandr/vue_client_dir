<template>
    <div>
        <div v-show="!showCard">
            <v-row v-if="enableFilters">
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
                            <slot name="table-actions">

                            </slot>
                            <v-btn v-if="showDiagram" color="primary"

                                   fab dark small
                                   @click="nextViewMode()">
                                <v-icon v-if="mode==='diagram'">mdi-table</v-icon>
                                <v-icon v-if="mode==='table'">mdi-chart-bar</v-icon>
                            </v-btn>
                            <v-btn v-if="exportExcel" color="primary"
                                   :loading="show_loading_action_bottoms.download"
                                   fab dark small
                                   @click="downloadXlsx()">
                                <v-icon>mdi-arrow-down-bold-box-outline</v-icon>
                            </v-btn>
                            <v-btn color="primary"
                                   fab dark small
                                   @click="reloadData()"
                            >
                                <v-icon>mdi-reload</v-icon>
                            </v-btn>
                            <v-btn v-if="enableFilters" color="primary"
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
                                    <template v-if="mode==='table'">
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

                                                                <v-icon v-if="!disableDelete" small
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
                                                                <template v-else-if="header.widget==='media_dialog'">

                                                                    <v-chip @click="$root.$emit('open-media-dialog',{src:getItem(header.value,props.item,header)})">
                                                                        {{getFileName(getItem(header.value,props.item,header))}}
                                                                    </v-chip>
                                                                </template>

                                                                <template v-else-if="header.widget==='date'">
                                                                    {{formatDate(getItem(header.value,props.item,header))}}
                                                                </template>

                                                                <template v-else-if="header.widget==='boolean'">
                                                                    <TrueFalseChip :status="getItem(header.value,props.item,header)"></TrueFalseChip>
                                                                </template>


                                                                <template v-else-if="header.widget==='colored_badge'">

                                                                    <v-chip :color="getColorFromChoices(header,props.item)">
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
                                    </template>
                                    <template v-if="mode==='diagram'">
                                        <slot name="diagram"></slot>
                                    </template>
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
    import TableBase from "../mixins/TableBase"
    import ColumnController from "../base/ColumnController";
    import FilterColumn from "../base/FilterColumn";
    import TrueFalseChip from "./TrueFalseChip";

    export default {
        mixins: [TableBase],
        components: {TrueFalseChip, FilterColumn, ColumnController},
        props: {
            headers: {
                type: Array,
                required: true
            },
            object_id: {
                type: [Number, null],
                default: null,
                required: false
            },
            exportExcel: {
                type: Boolean,
                required: false,
                default: false
            },
            showDiagram: {
                type: Boolean,
                required: false,
                default: false
            },
            disableDelete: {
                type: Boolean,
                required: false,
                default: false
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
            xlsxBaseUrl: {
                type: String,
                required: false
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
            static_model_params: {
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
            enableFilters: {
                type: Boolean,
                default: true
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
