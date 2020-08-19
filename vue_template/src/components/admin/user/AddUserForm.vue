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
                        <span class="headline">Користувач</span>
                    </v-card-title>
                    <v-card-text>
                        <p style="color:red">{{form_errors.non_field_errors}}</p>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-tooltip v-model="tooltip.username" top>
                                        <template v-slot:activator="{ on }">
                                            <v-text-field label="login*" v-model="fields.username"
                                                          :error-messages='form_errors.username'
                                                          append-icon="info"
                                                          @click:append="tooltip.username = !tooltip.username">

                                            </v-text-field>
                                        </template>
                                        <p>Логін повинен складатись не менше ніж з 5 символів різного регістру.<br>
                                            Не допускається пробіл в логіні.<br>
                                            При створені логіна можна використовувати цифри, латинські літери, символи (@/./+/-/_).
                                        </p>
                                    </v-tooltip>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Email*" v-model="fields.email"
                                                  :error-messages='form_errors.email'></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Ім'я*" v-model="fields.first_name"
                                                  :error-messages='form_errors.first_name'></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Прізвище*" v-model="fields.last_name"
                                                  :error-messages='form_errors.last_name'></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="ІПН" v-model="fields.ipn"
                                                  :error-messages='form_errors.ipn'></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <Autocomplete
                                            label="Організація"
                                            :url="`${this.$config.domen}/api-base/organization/`"
                                            v-model="fields.organization"
                                            :error-messages='form_errors.organization'
                                            model="organization">
                                    </Autocomplete>
                                </v-flex>
                                <v-flex xs12>
                                    <v-tooltip v-model="tooltip.password" top>
                                        <template v-slot:activator="{ on }">
                                            <v-text-field label="Пароль*" v-model="fields.password"
                                                          :error-messages='form_errors.password'
                                                          append-icon="info"
                                                          @click:append="tooltip.password = !tooltip.password">
                                            </v-text-field>
                                        </template>
                                        <p>Пароль повинен складатись не менше ніж з 8 символів різного регістру.<br>
                                            Пароль не повинен співпадатись з логіном.<br>
                                            При створені паролю можна використовувати цифри, латинські літери, символи (@/./+/-/_).
                                        </p>
                                    </v-tooltip>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Підтвердження паролю*" type="password"
                                                  v-model="fields.password_confirm" required
                                                  :error-messages='form_errors.password_confirm'></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>Для реєстрації потрібно заповнити всі поля, позначені *</small>
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
    import Autocomplete from '@/base/Autocomplete';
    import FormBase from "@/mixins/FormBase";

    export default {
        mixins: [FormBase],
        components: {
            Autocomplete
        },
        data() {
            return {
                namespace: null,
                module_name: 'user',
                fields: {},
                tooltip: {
                    username: false,
                    password: false
                },
                form_errors: {
                    name: null,
                    area: null,
                    group_organization: null
                },
                base_url: `${this.$config.domen}/rest-auth/registration/register/`

            }
        },
    }
</script>
