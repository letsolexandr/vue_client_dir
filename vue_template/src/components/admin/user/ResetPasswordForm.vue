<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Скидання пароля</span>
                    </v-card-title>
                    <v-card-text>
                        <LoaderBar :showLoading="loadingPGBar"/>
                        <div v-show="!loadingPGBar">
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field label="email*"
                                                      :error-messages='form_errors.email' v-model="fields.email"
                                                      messages="Введіль електронну адресу для підтвердження зміни паролю. На вказану електронну пошту буде надіслано запит на підтвердження зміни пароля."
                                                      required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <small>*indicates required field</small>
                        </div>
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
    import FormBase from "@/mixins/FormBase"
    import LoaderBar from '@/base/LoaderBar'
    import axios from 'axios';


    export default {
        name: "ResetPasswordForm",
        mixins: [FormBase],
        components: {LoaderBar},
        data() {
            return {
                loadingPGBar: false,
                module_name: 'user',
                namespace: null,
                form_name: 'reset_password_form',
                on_save_callback:'showSuccessInfo',
                pre_request_callback:'deleteAuthToken',
                base_url: `${this.$config.domen}/rest-auth/password/reset/`,
            }
        },
        methods:{
            deleteAuthToken(){
                delete axios.defaults.headers.common['Authorization']
            },
            showSuccessInfo(){
                this.dialog=false;
                debugger
                this.$store.state.info_dialog.infoDialog.open({
                    title: 'Операція успішна',
                    message: 'Інформацію для відновлення пароля відправлено на вказану електронну адресу.'
                })
            }
        }
    }
</script>

<style scoped>

</style>