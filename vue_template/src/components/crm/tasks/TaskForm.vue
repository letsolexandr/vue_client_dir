<template>
    <div>
        <v-btn fab bottom right color="primary" dark fixed
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace})">
            <v-icon>add</v-icon>
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Послуги</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Назва задачі"
                                                  :error-messages='form_errors.title' v-model="fields.title"
                                                  required></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-textarea label="Опис задачі"
                                                  v-model="fields.description"
                                                  :error-messages='form_errors.description'
                                                  required>

                                    </v-textarea>
                                </v-flex>
                                <v-flex xs12>
                                    <DataPicker
                                            v-model="fields.due_date"
                                            :error_messages="form_errors.due_date"
                                            label="Дата контролю">
                                    </DataPicker>
                                </v-flex>
                                <v-flex xs12>
                                    <Autocomplete
                                            label="Виконавець"
                                            :url="`${this.$config.domen}/crm/contacts/`"
                                            v-model="fields.main_contact"
                                            :error_messages='form_errors.main_contact'>
                                    </Autocomplete>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select label="Статус"
                                              v-model="fields.status"
                                              :error-messages='form_errors.status'
                                              :items="choices.status"
                                              item-text="display_name"
                                              item-value="value">
                                    </v-select>
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
    import DataPicker from "../../../base/DataPicker";
    import Autocomplete from "../../../base/Autocomplete";

    export default {
        components: {Autocomplete, DataPicker},
        mixins: [FormBase],
        data() {
            return {
                namespace:'crm',
                module_name:'tasks',
                reload_on_save: true,
                form_errors: {
                    name: null,
                    code: null
                },
                base_url:`${this.$config.domen}/crm/tasks/`

            }
        },
    }
</script>
