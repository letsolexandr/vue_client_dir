<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Скидання паролю</span>
                    </v-card-title>
                    <v-card-text>
                        <p style="color:red">{{form_errors.non_field_errors}}</p>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Поточний пароль"
                                                  :error-messages='form_errors.old_password' v-model="fields.old_password"
                                                  messages="Введіть поточний   пароль"
                                                  type="password">

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Новий пароль"
                                                  :error-messages='form_errors.password' v-model="fields.password"
                                                  messages="Введіть новий пароль"
                                                  type="password">

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Новий пароль(повторно)"
                                                  :error-messages='form_errors.password_confirm' v-model="fields.password_confirm"
                                                  messages="Повторіть новий пароль"
                                                  type="password">

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
                               @click="saveObject({module:module_name,namespace:namespace,form_name:form_name})">
                            Підтвердити
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
        name: "ChangePasswordForm",
        mixins: [FormBase],
        components: {},
        data() {
            return {
                module_name: 'user',
                namespace: null,
                form_name: 'change_password_form',
                base_url: `${this.$config.domen}/rest-auth/registration/change-password/`,
            }
        }
    }
</script>

<style scoped>

</style>