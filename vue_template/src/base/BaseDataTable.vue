<template>
    <div>
        <v-row>
            <v-col>
                <FilterColumn :value="getAllFilters(headers)"
                              :extra_params="extra_params" :update_element="getThis()"
                              :visible="filter_visible">
                </FilterColumn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card :elevation="1">
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

                        <template v-if="selected.length>0">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-btn small
                                           color="primary"
                                           dark
                                           v-on="on"
                                    >групові операції
                                    </v-btn>
                                    <span class="caption">
                                        Вибрано {{selected.length}} з {{pagination.totalItems}}
                                    </span>
                                </template>
                                <v-list>
                                    <v-list-item
                                            v-for="(item, index) in group_actions"
                                            :key="index"
                                            @click="callMultipleMethod(item.action)">
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>

                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <slot name="table-actions">

                        </slot>
                        <v-btn color="primary"
                               fab dark small
                               @click="reloadData()"
                        >
                            <v-icon>mdi-reload</v-icon>
                        </v-btn>
                        <v-btn color="primary"
                               fab dark small
                               @click="filter_visible = !filter_visible">
                            <v-icon>mdi-filter-outline</v-icon>
                        </v-btn>
                        <ColumnController v-model="headers"></ColumnController>
                    </v-card-title>
                    <v-container grid-list-md text-xs-center>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-data-table v-model="selected"
                                              show-select
                                              :dense="dense"
                                              :headers="getVisibleHeaders(headers)"
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
                                            <template>
                                                <td>
                                                    <v-checkbox
                                                            v-model="props.isSelected"
                                                            @change="switchSelect($event, props)"
                                                    ></v-checkbox>
                                                </td>
                                            </template>
                                            <td v-for="header in getVisibleHeaders(headers) "
                                                class="text-xs-center">
                                                <slot :name="header.value" :props="props">
                                                    <template v-if="header.value === 'id' ">
                                                        <v-icon small class="mr-2" @click="getObject({id:props.item.id,
                                                    namespace:namespace,
                                                    module:module_name})">
                                                            edit
                                                        </v-icon>
                                                        <v-icon small
                                                                @click="openDeleteDialog({
                                                                id:props.item.id,
                                                                update_element:getThis(),
                                                                reload_after_delete:reload_after_delete})">
                                                            delete
                                                        </v-icon>
                                                    </template>
                                                    <template v-else>
                                                        <template v-if="header.url">
                                                            <a @click="go_to('/main/contracts/',props.item.id)">
                                                                {{getItem(header.value ,props.item,header)}}</a>
                                                        </template>
                                                        <template v-else-if="header.widget==='checkbox'">
                                                            <v-checkbox disabled
                                                                        :value="getItem(header.value,props.item,header)">
                                                            </v-checkbox>
                                                        </template>
                                                        <template v-else-if="header.widget==='yes_no'">

                                                                <v-chip  v-if="getItem(header.value,props.item,header)"
                                                                        color="success"
                                                                         x-small
                                                                        label>
                                                                    Так
                                                                </v-chip>
                                                                <v-chip v-else
                                                                        x-small
                                                                        color="warning"
                                                                        label>Ні
                                                                </v-chip>
                                                        </template>
                                                        <template v-else-if="header.widget==='href'">
                                                            <a :href="getItem(header.value,props.item,header)"
                                                               target="_blank">
                                                                {{getFileName(getItem(header.value,props.item,header))}}
                                                            </a>
                                                        </template>
                                                        <template v-else-if="header.widget==='colored_badge'">

                                                            <v-chip dark>{{getItem(header.value,props.item,header)}}
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
</template>

<script>
    import TableBase from "@/mixins/TableBase"
    import ColumnController from "../base/ColumnController";
    import FilterColumn from "../base/FilterColumn";
    import TemplateDocumentTypeForm from "../components/dict_register/template_document/TemplateDocumentTypeForm";

    export default {
        mixins: [TableBase],
        components: {TemplateDocumentTypeForm, FilterColumn, ColumnController},
        props: {
            object_id: {
                type: Number,
                default: 0,
                required: false
            },
            headers: {
                type: Array,
                required: true
            },
            reload_after_delete: {
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
            module_name: {
                type: String,
                required: true
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
            extra_watch: {
                type: Object,
                required: false,
                default: () => {
                    return {}
                }
            },
            choices: {
                type: Object,
                required: false,
                default: () => {
                    return {}
                }
            },
            dense: {
                type: Boolean,
                required: false,
                default: false
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
