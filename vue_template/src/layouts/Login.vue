<template>
    <v-container fluid fill-height v-on:keyup.enter="login()">
        <v-layout child-flex align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Вхід</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <p style="color:red">{{form_errors.non_field_errors}}</p>
                        <div v-show="loading" class="text-xs-center">
                            <v-progress-circular
                                    :size="90"
                                    :width="7"
                                    color="info"
                                    indeterminate
                            ></v-progress-circular>
                        </div>
                        <v-form v-show="!loading">
                            <v-text-field v-model="fields.username" :error-messages='form_errors.username'
                                          prepend-icon="person" name="username" label="username" type="text">
                            </v-text-field>
                            <v-text-field v-model="fields.password" :error-messages='form_errors.password'
                                          id="password" prepend-icon="lock" name="password" label="Password"
                                          type="password">
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions v-show="!loading">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login()">Login</v-btn>
                    </v-card-actions>
                    <v-row align="center">
                        <v-col class="text-center" cols="12">
                            <v-btn text small color="primary"
                                   @click="openAddObjectForm({module:'user',namespace:null,form_name: 'reset_password_form'})">
                                Скинути пароль
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-flex>
        </v-layout>
        <ResetPasswordForm/>
    </v-container>
</template>

<script>
    import {mapActions} from 'vuex';

    import ResetPasswordForm from "../components/admin/user/ResetPasswordForm";

    export default {
        components: {ResetPasswordForm},
        data() {
            return {
                loading: false,
                drawer: null,
                fields: {},
                form_errors: {},
            }
        },
        methods: {
            ...mapActions(['getObject',
                'openAddObjectForm',
            ]),
            login() {
                const self = this;
                self.loading = !this.loading;
                self.form_errors = {}
                self.$store
                    .dispatch("login", self.fields, self)
                    .then(() => {
                        debugger
                        self.loading = !self.loading
                        return self.$router.push('/')
                        //return self.$router.push('/main/agrochimanalize')
                    }).then((result) => {
                    return result
                })
                    .catch(err => {
                        debugger
                        console.log(err);
                        self.form_errors = err.response.data;
                        self.loading = !self.loading;
                    });
            }

        }
    }
</script>
