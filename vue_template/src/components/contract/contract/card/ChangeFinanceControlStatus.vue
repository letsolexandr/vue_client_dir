<template>
    <div>
        <v-layout row>
            <v-dialog v-model="dialog" persistent max-width="800px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Змінити статус</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>

                                <v-flex xs12>
                                    <v-switch label="Договір на контролі в бухгалтерії?"
                                                  v-model="fields.finance_control">
                                    </v-switch>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                        <v-btn color="primary"
                               @click="saveObject({module:module_name,form_name:form_name})">Зберегти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import FormBase from "../../../../mixins/FormBase";
    import config from "../config";

    export default {
        mixins: [FormBase],
        components: {
        },
        props: {
            id: {
                type: Number,
                required: true,

            },
            initial: {
                type: Object,
                required: false,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                allowed_to_send: ['id', 'finance_control'],
                module_name: 'contract',
                form_name: 'change_finance_control_status_form',
                reload_on_save: true,
                config,
                base_url: `${config.domen}/contracts/contract/`

            }
        },
    }
</script>
