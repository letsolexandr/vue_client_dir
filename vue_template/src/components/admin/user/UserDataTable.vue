<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :edit_form_name="edit_form_name"
                      :headers="headers">
        <template slot="form">
            <AddUserForm/>
            <EditUserForm/>
            <ChangePasswordForm/>
        </template>
        <template slot="extra-action">
            <v-icon small class="mr-2"
                    @click="openAddObjectForm({module:module_name,namespace:namespace,form_name: 'change_password_form'})">
                mdi-lock-reset
            </v-icon>
        </template>

    </DefaultDataTable>
</template>
<script>
    import AddUserForm from './AddUserForm'
    import EditUserForm from './EditUserForm'
    import TableBase from "@/mixins/TableBase";
    import DefaultDataTable from "../../../base/DefaultDataTable";
    import ChangePasswordForm from "./ChangePasswordForm";

    export default {
        mixins:[TableBase],
        components: {ChangePasswordForm, DefaultDataTable, AddUserForm, EditUserForm},
        data() {
            return {
                namespace: null,
                module_name: 'user',
                base_url: `${this.$config.domen}/api-base/user/`,
                edit_form_name: 'edit_form',
                headers: [{
                    text: 'Імя',
                    align: 'left',
                    //sortable: false,
                    value: 'first_name',
                    visible: true
                },
                    {
                        text: 'Прізвище',
                        value: 'last_name',
                        visible: true
                    },
                    {
                        text: 'email',
                        value: 'email',
                        visible: true
                    },
                    {
                        text: 'Організація',
                        value: 'org_name',
                        visible: true
                    },
                    {
                        text: 'Дії',
                        value: 'id',
                        visible: true
                    },
                ]
            }
        }
    }
</script>
