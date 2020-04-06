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
                        <span class="headline">Тип організації</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Код"
                                                  :error-messages='form_errors.code' v-model="fields.code"
                                                  required></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field label="Назва"
                                                  v-model="fields.name"
                                                  :error-messages='form_errors.name'
                                                  required>

                                    </v-text-field>
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

    export default {
        mixins: [FormBase],
        data() {
            return {
                namespace:'dict',
                module_name:'organization_type',
                form_errors: {
                    name: null,
                    code: null
                },
                base_url:`${this.$config.domen}/dict/organization-type/`

            }
        },
    }
</script>
