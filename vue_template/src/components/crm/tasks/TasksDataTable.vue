<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :extra_params="extra_params"
                      :headers="headers"
                      use_card>
        <template slot="form">
            <TaskForm/>
        </template>
        <template slot="is_on_play" slot-scope="{ props }">
            <template v-if="props.item.is_on_play">
                <v-icon >mdi-play </v-icon>
            </template>
            <template v-else>
                <v-icon >mdi-pause </v-icon>
            </template>
        </template>
    </DefaultDataTable>
</template>
<script>

    import TaskForm from "./TaskForm";
    import DefaultDataTable from "../../../base/DefaultDataTable";

    export default {
        components: {DefaultDataTable, TaskForm},
        data() {
            return {
                namespace: 'crm',
                module_name: 'tasks',
                base_url: `${this.$config.domen}/crm/tasks/`,
                extra_params: {expand: 'main_contact_data'},
                headers: [{
                    text: 'Назва',
                    align: 'left',
                    //sortable: false,
                    value: 'title',
                    url: `/main/crm_tasks/`,
                    visible: true,
                },
                    {
                        text: 'Статус',
                        value: 'status',
                        visible: true,
                        choice_name: 'status',
                        filter: {type: 'select_choices', value: null},
                    },
                    {
                        text: 'Головний виконавець',
                        value: 'main_contact_data.__str__',
                        visible: true,
                        filter: {
                            type: 'autocomplete',
                            url: `${this.$config.domen}/crm/contacts/`,
                            request_param: 'main_contact',
                            value: null
                        }
                    },
                    {
                        text: 'Дата виконання',
                        value: 'due_date',
                        visible: true,
                    },
                    {
                        text: 'Запущені',
                        value: 'is_on_play',
                        visible: true,
                    },
                    {
                        text: 'Дії',
                        value: 'id',
                        visible: true,
                    },
                ]
            }
        }
    }
</script>
