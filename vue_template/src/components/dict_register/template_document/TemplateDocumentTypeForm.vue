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
                        <span class="headline">Шаблон документу</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Призначення шаблону"
                                              :error-messages='form_errors.related_model_name'
                                              v-model="fields.related_model_name"
                                              >
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <FileFieldV1 label="Шаблон документу"
                                               :errormessages='form_errors.template_file'
                                               v-model="fields.template_file">
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
    import FileFieldV1 from "../../../base/FileFieldV1";

    export default {
        components: {FileFieldV1},
        mixins: [FormBase],
        data() {
            return {
                namespace: 'dict',
                module_name: 'template_document',
                file_fields: ['template_file'],
                base_url: `${this.$config.domen}/dict/template-document/`

            }
        },
    }
</script>
