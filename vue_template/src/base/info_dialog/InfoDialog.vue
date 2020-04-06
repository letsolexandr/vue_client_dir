<template>
    <div class="text-center">
        <v-dialog
                v-model="dialog"
                width="500"
                persistent>
            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title>
                    {{title}}
                </v-card-title>
                <v-card-text>
                    {{message}}
                    <LoaderBar :show-loading="show_loader"></LoaderBar>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="disabled_close"
                           color="primary"
                           text
                           @click="close()"
                    > Ок
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import LoaderBar from "../LoaderBar";

    export default {
        name: "InfoDialog",
        components: {LoaderBar},
        data() {
            return {
                dialog: false,
                message: null,
                module_name: 'info_dialog',
                form_name: 'infoDialog',
                show_loader: false,
                title: null,
                disabled_close: false,
                update_element: null
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
            open({message, title, show_loader = false, disabled_close = false, update_element = null}) {
                debugger
                this.message = message;
                this.title = title;
                this.dialog = true;
                this.disabled_close = disabled_close;
                this.update_element = update_element;
                this.show_loader = show_loader;
            },
            callCloseCallback: function () {
                debugger
                if (this.update_element && this.update_element.reloadData) {
                    this.update_element.reloadData();
                    this.update_element = null;
                }
                try {
                    if (this.update_element && this.update_element._vnode.componentInstance.reloadData) {
                        this.update_element._vnode.componentInstance.reloadData()
                    }
                }
                catch(error) {
                    console.error('method "reloadData" not exist');
                }
            },
            close() {
                this.message = null;
                this.title = null;
                this.show_loader = false;
                this.dialog = false;
                this.callCloseCallback()

            }
        }
    }
</script>