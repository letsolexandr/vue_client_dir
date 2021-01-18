<template>
    <div>
        <v-btn v-if="showBtn" bottom small right color="primary"
               @click.stop="getObject({
                                                            id:object_id,
                                                            form_name: form_name,
                                                            namespace: namespace,
                                                            module: module_name})">
            {{titleBtn}}
        </v-btn>
        <v-layout row>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">
                            Заявка на підключення до СЕВ СЕВ
                        </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-checkbox
                                            label="Організація підключена?"
                                            v-model="fields.is_contractor_connected"
                                            color="primary">
                                    </v-checkbox>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea
                                            label="Примітка"
                                            v-model="fields.note">
                                    </v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                        <v-btn color="primary"
                               @click="saveObject({module:module_name,namespace:namespace,form_name:form_name})">
                            Зберегти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>

    </div>
</template>

<script>
    import FormBase from "../../../mixins/FormBase";
    import DataPicker from "../../../base/DataPicker";
    import Autocomplete from "../../../base/Autocomplete";
    import conf from "./conf";

    export default {
        props: {
            showBtn: {
                type: Boolean,
                default: false
            },
            titleBtn: {
                type: String,
            },
            object_id: {
                type: Number,
            }
        },
        components: {Autocomplete, DataPicker},
        mixins: [FormBase, conf],
        data() {
            return {
                allowed_to_send:["is_contractor_connected","note"],
                form_name: 'tech_statement',
                reload_on_save:true
            }
        }
    }
</script>
