<template>
    <div class="text-center">
        <v-dialog
                v-model="dialog"
                width="750"
                persistent>
            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title>
                    {{title}}
                </v-card-title>
                <v-card-text>
                    <IframeViewer :src="src" height="700px"></IframeViewer>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            text
                            @click="close()"
                    > Закрити
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import IframeViewer from "../IframeViewer";

    export default {
        name: "MediaDialog",
        components: {IframeViewer},
        data() {
            return {
                dialog: false,
                src: null,
                title: null
            }
        },
        mounted() {
            this.registerEvent()
        },
        methods: {
            registerEvent() {
                this.$root.$on('open-media-dialog', this.open);
            },
            open({src, title}) {
                this.src = src;
                this.title = title;
                this.dialog = true;
                console.log(this.src)

            },
            close() {
                this.src = null;
                this.title = null;
                this.dialog = false;

            }
        }
    }
</script>

<style scoped>

</style>