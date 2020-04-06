<template>
    <div>
        <v-btn v-if="can_add" fab bottom right color="primary" dark fixed
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace})">
            <v-icon>add</v-icon>
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Договір</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>

                                <v-flex xs12>
                                    <v-text-field label="Номер акту"
                                                  :error-messages='form_errors.number_act'
                                                  v-model="fields.number_act"
                                                  required></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <DataPicker

                                            v-model="fields.date_formation_act"
                                            :error_messages="form_errors.date_formation_act"
                                            label="Дата формування">
                                    </DataPicker>
                                </v-flex>

                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.date_sending_act"
                                            :error_messages="form_errors.date_sending_act"
                                            label="Дата відправлення акту">
                                    </DataPicker>
                                </v-flex>
                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.date_return_act"
                                            :error_messages="form_errors.date_return_act"
                                            label="Дата повернення акту">
                                    </DataPicker>
                                </v-flex>
                                <v-flex xs6>
                                    <v-checkbox
                                            label="Акт відправлено успішно?"
                                            v-model="fields.is_send_successful"
                                            color="primary">
                                    </v-checkbox>
                                </v-flex>
                                <v-flex xs12>
                                    <FileFieldV1 label="Акт"
                                               :error-messages='form_errors.copy_act'
                                               v-model="fields.copy_act">
                                    </FileFieldV1>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                        <v-btn color="primary"
                               @click="saveObject({namespace:namespace,module:module_name})">Зберегти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import Autocomplete from '@/base/Autocomplete';

    import FormBase from "@/mixins/FormBase";
    import DataPicker from "../../../../base/DataPicker";
    import FileFieldV1 from "../../../../base/FileFieldV1";

    export default {
        props: {
            can_add: {
                type: Boolean,
                default: () => {
                    return false
                }
            }
        },
        mixins: [FormBase],
        components: {
            FileFieldV1,
            DataPicker,
            Autocomplete
        },
        data() {
            return {
                namespace: 'contract',
                module_name: 'register_act',
                form_errors: {},
                base_url: `${this.$config.domen}/contracts/register-act/`

            }
        },
    }
</script>
