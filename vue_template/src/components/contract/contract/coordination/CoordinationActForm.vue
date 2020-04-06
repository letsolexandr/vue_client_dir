<template>
    <div>
        <v-btn small color="primary"
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace, initial:{object_id:object_id}})">
            <v-icon>add</v-icon>
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Погодження</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Відповідальний"
                                                  :error-messages='form_errors.subject'
                                                  v-model="fields.subject"
                                                  required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.start"
                                            :error_messages="form_errors.start"
                                            label="Початок погодження">
                                    </DataPicker>
                                </v-flex>

                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.end"
                                            :error_messages="form_errors.end"
                                            label="Кінець погодження">
                                    </DataPicker>
                                </v-flex>

                                <v-flex xs6>
                                    <v-checkbox
                                            label="Погоджено?"
                                            v-model="fields.status"
                                            :error-messages='form_errors.status'
                                            color="primary">
                                    </v-checkbox>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                        <v-btn color="primary"
                               @click="saveObject({module:module_name,namespace:namespace})">Зберегти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import FormBase from "@/mixins/FormBase";
    import DataPicker from "../../../../base/DataPicker";
    import FileFieldV1 from "../../../../base/FileFieldV1";

    export default {
        components: {FileFieldV1, DataPicker},
        mixins: [FormBase],
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
                static_form_fields:{"app_label":"contracts",
                                    "model": "contract",},
                base_url: `${this.$config.domen}/contracts/coordination/`,

            }
        },
    }
</script>
