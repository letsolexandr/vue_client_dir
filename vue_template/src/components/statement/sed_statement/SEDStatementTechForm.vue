<template>
    <div>
        <v-btn fab bottom right color="primary" dark fixed
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace,form_name:form_name})">
            <v-icon>add</v-icon>
        </v-btn>
        <v-layout row justify-center>
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
                               @click="saveObject({module:module_name,namespace:namespace,form_name:form_name})">Зберегти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>

    </div>
</template>

<script>
    import FormBase from "@/mixins/FormBase";
    import DataPicker from "../../../base/DataPicker";
    import Autocomplete from "../../../base/Autocomplete";
    import conf from "./conf";

    export default {
        components: {Autocomplete, DataPicker},
        mixins: [FormBase,conf],
        data() {
            return {
                form_name:'tech_statement',
                fields: {
                    status: 1, //Нова
                    statement_type: 'web' //Тип заявки
                },
            }
        }
    }
</script>
