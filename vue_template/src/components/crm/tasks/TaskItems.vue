<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <div class="headline">Пункти задачі</div>
            </div>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <TaskItemForm :task_id="task_id"></TaskItemForm>
        </v-card-title>
        <v-card-text>
            <BaseDataTable :namespace="namespace"
                           :module_name="module_name"
                           :base_url="base_url"
                           :headers="headers"
                           :extra_watch="extra_watch"
                           :object_id="task_id"
                           :static_model_params="static_model_params"
                           :reload_after_delete="reload_after_delete"
                           dense>
            </BaseDataTable>
        </v-card-text>

    </v-card>
</template>

<script>
    import BaseDataTable from "../../../base/BaseDataTable";
    import TaskItemForm from "./TaskItemForm";

    export default {
        name: "TaskItems",
        components: {TaskItemForm, BaseDataTable},
        props: {
            task_id: {
                type: Number,
                required: true,
                default: () => {
                    return 0
                }
            }
        },
        data() {
            return {
                namespace: 'crm',
                module_name: 'task_item',
                base_url: `${this.$config.domen}/crm/task-item/`,
                extra_watch: {
                    param_name: 'task',
                },
                static_model_params: {
                    app_label: 'crm_module',
                    model: 'taskitem',
                },

                reload_after_delete: false,
                headers: [
                    {text: 'Задача', value: '__str__', visible: true},
                    {text: 'Виконано?', value: 'is_done', widget: 'yes_no', visible: true},
                    {text: 'Дії', value: 'id', visible: true},
                ],
            }
        }
    }
</script>

<style scoped>

</style>