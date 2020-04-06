<template>
    <div>
        <v-btn small color="primary"
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace, initial:{task:task_id}})">
            Додати пункт
        </v-btn>
        <v-layout row >
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Пункт</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <Autocomplete label="Номер Договору"
                                                  :error-messages='form_errors.task'
                                                  v-model="fields.task"
                                                  :url="`${this.$config.domen}/crm/tasks/`"
                                    ></Autocomplete>
                                </v-flex>

                                <v-flex xs12>
                                    <v-textarea label="Опис пункту"
                                                  :error-messages='form_errors.title'
                                                  v-model="fields.title"
                                    ></v-textarea>
                                </v-flex>
                                <v-flex xs12>
                                    <v-checkbox
                                            label='Виконано?'
                                            v-model="fields.is_done"
                                            :error-messages='form_errors.is_done'>
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
                               @click="saveObject({module:module_name, namespace:namespace})">Зберегти
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
    export default {
        props: {
            task_id: {
                type: Number,
                default: 0,
            }
        },
        mixins: [FormBase],
        components: {
            Autocomplete
        },
        data() {
            return {
                namespace: 'crm',
                module_name: 'task_item',
                reload_on_save: true,
                fields: {
                    title: null,
                },
                base_url: `${this.$config.domen}/crm/task-item/`
            }
        },
    }
</script>
