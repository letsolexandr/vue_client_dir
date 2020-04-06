<template>
    <div>
        <v-btn v-if="!child" fab bottom right color="primary" dark fixed
               @click.stop="openAddObjectForm(module_name)">
            <v-icon>add</v-icon>
        </v-btn>
        <v-layout row>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Група</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Назва" v-model="fields.codename"
                                                  :error-messages='form_errors.codename'
                                                  required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Назва" v-model="fields.name"
                                                  :error-messages='form_errors.name'
                                                  required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                <Autocomplete
                                        label="APP"
                                        :url="`${this.$config.domen}/api-base/content-type/`"
                                        v-model="fields.content_type"
                                        :error-messages='form_errors.content_type'
                                >
                                </Autocomplete>
                                </v-flex>
                                </v-layout>
                        </v-container>
                        <small>Для реєстрації потрібно заповнити всі поля, позначені *</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                        <v-btn color="primary"
                               @click="saveObject({module:module_name})">Зберегти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>

    import FormBase from "@/mixins/FormBase";
    import Autocomplete from '@/base/Autocomplete';
    //import MultiSelectTable from "../../../base/MultiSelectTable";

    export default {
        mixins: [FormBase],
        props: {
            child: {
                type: Boolean,
                default: false
            },
        },
        components: {
             Autocomplete
        },
        data() {
            //debugger
            return {
                module_name: 'permissions',
                base_url: `${this.$config.domen}/api-base/permission/`,
            }
        },
        methods: {}
    }
</script>
