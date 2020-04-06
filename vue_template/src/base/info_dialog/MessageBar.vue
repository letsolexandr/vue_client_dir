<template>
    <v-snackbar
            v-model="dialog"
            :bottom="true"
            :color="color"
            :timeout="5000"
            :left="true"
    >
        {{ message }}
        <v-btn
                dark
                text
                @click="close()"
        >
            Закрити
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "MessageBar",
        data() {
            return {
                dialog: false,
                message: null,
                module_name: 'info_dialog',
                form_name: 'messageBar',
                color: 'primary',
                title: null
            }
        },
        mounted() {
            this.$store.dispatch('addFormToStore', {
                module_name: this.module_name,
                form: this,
                form_name: this.form_name
            })
                .then(() => {

                })
                .catch((err) => {

                })
        },
        methods: {
            open({message, title, color}) {
                this.message = message
                this.title = title
                this.color = color || 'primary'
                this.dialog = true
            },
            close() {
                this.message = null
                this.title = null
                this.color = 'primary'
                this.dialog = false
            }
        }
    }
</script>
