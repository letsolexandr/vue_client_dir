<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <div class="headline">Погодження</div>
            </div>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <CoordinationActForm :object_id="object_id"></CoordinationActForm>
        </v-card-title>
        <v-card-text>
            <BaseDataTable :namespace="namespace"
                           :module_name="module_name"
                           :base_url="base_url"
                           :headers="headers"
                           :extra_params="extra_params"
                           :extra_watch="extra_watch"
                           :object_id="object_id"
                           :static_model_params="static_model_params"
            >
            </BaseDataTable>
        </v-card-text>

    </v-card>


</template>

<script>
    import CoordinationActForm from "./CoordinationActForm";
    import BaseDataTable from "../../../../base/BaseDataTable";


    export default {
        name: "RegisterAct",
        components: {BaseDataTable, CoordinationActForm},
        props: {
            object_id: {
                type: Number,
                default: 0,
                required: true
            }
        },
        data() {
            return {
                namespace: 'contract',
                module_name: 'coordination',
                base_url: `${this.$config.domen}/contracts/coordination/`,
                extra_params: {
                    "app_label": "contracts",
                    "model": "contract"
                },
                extra_watch: {
                    param_name: 'object_id',
                },
                static_model_params:{
                    app_label:'contracts',
                    model:'coordination',
                },
                headers: [
                    {text: 'Працівник', value: 'subject', visible: true},
                    {text: 'Початок погодження', value: 'start', visible: true},
                    {text: 'Кінець погодження', value: 'end', visible: true},
                    {text: 'Погоджено?', value: 'status', widget: 'checkbox', visible: true},
                    {text: 'Дії', value: 'id', visible: true},
                ],
            }
        }
    }
</script>
