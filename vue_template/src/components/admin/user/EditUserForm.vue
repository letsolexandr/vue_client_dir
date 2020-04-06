<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Користувач</span>
            </v-card-title>
            <v-card-text>
                <LoaderBar :showLoading="loadingPGBar"/>
                <div v-show="!loadingPGBar">
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="login*"
                                              :error-messages='form_errors.username' v-model="fields.username"
                                              required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Імя*" v-model="fields.first_name"
                                              hint="це поле обовязкове"
                                              required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Прізвище" v-model="fields.last_name"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Email*" v-model="fields.email"
                                              :error-messages='form_errors.email'></v-text-field>
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
                                <Autocomplete
                                        label="Групи"
                                        multiple
                                        :url="`${this.$config.domen}/api-base/group/`"
                                        v-model="fields.groups"
                                        :error-messages='form_errors.groups'
                                       >
                                </Autocomplete>
                            </v-flex>
                            <MultiSelectTable
                                    label="Дозволи користувача"
                                    :url="`${$config.domen}/api-base/permission/?page_size=1000`"
                                    v-model="fields.user_permissions"
                                    :id="fields.id"/>
                            <v-flex xs12>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <template v-show="!loadingPGBar">
                    <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                    <v-btn color="primary"
                           @click="saveObject({module:'user',namespace:namespace,form_name:'edit_form'})">Зберегти
                    </v-btn>
                </template>
            </v-card-actions>
        </v-card>
        <OrganizationAddForm child/>
    </v-dialog>

</template>

<script>
    import Autocomplete from '@/base/Autocomplete'
    import MultiSelectTable from '@/base/MultiSelectTable'
    import OrganizationAddForm from '@/components/admin/organization/OrganizationAddForm'
    import LoaderBar from '@/base/LoaderBar'
    import FormBase from "@/mixins/FormBase"

    export default {
        mixins: [FormBase],
        components: {
            Autocomplete,
            MultiSelectTable,
            LoaderBar,
            OrganizationAddForm

        },
        data() {
            return {
                loadingPGBar: false,
                module_name: 'user',
                namespace: null,
                form_name: 'edit_form',
                base_url: `${this.$config.domen}/api-base/user/`,
                form_errors: {
                    name: null,
                    area: null,
                    group_organization: null
                },
            }
        }
    }
</script>
