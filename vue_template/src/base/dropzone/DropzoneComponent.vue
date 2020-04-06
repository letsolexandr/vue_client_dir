<template>
    <div>
        <v-file-input label="Виберіть файл" outlined dense v-model="file">
            <template v-slot:append>
                <v-btn text icon small
                       @click.stop="sendFile()">
                    <v-icon>mdi-open-in-app</v-icon>
                </v-btn>

            </template>
        </v-file-input>
        <LoaderBar :show-loading="LoaderBar"></LoaderBar>
        <div v-show="!LoaderBar">
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-container fluid>
                            <v-row>
                                <v-col v-for="image in images"
                                       class="d-flex child-flex"
                                       cols="3">
                                    <v-hover>
                                        <template v-slot:default="{ hover }">
                                            <v-card flat tile class="d-flex">
                                                <v-img
                                                        :src="image.preview"
                                                        :lazy-src="image.preview"
                                                        aspect-ratio="1"
                                                        class="grey lighten-2">
                                                    <template v-slot:placeholder>
                                                        <v-row
                                                                class="fill-height ma-0"
                                                                align="center"
                                                                justify="center"
                                                        >
                                                            <v-progress-circular indeterminate
                                                                                 color="grey lighten-5"></v-progress-circular>
                                                        </v-row>
                                                    </template>
                                                </v-img>
                                                <v-fade-transition>
                                                    <v-overlay
                                                            v-if="hover"
                                                            absolute
                                                            color="#036358"
                                                    >
                                                        <v-btn text icon>
                                                            <a :href="image.upload" target="_blank"
                                                               style="color:white">
                                                                <v-icon>mdi-eye</v-icon>
                                                            </a>
                                                        </v-btn>
                                                        <v-btn text icon>
                                                            <a :href="image.upload" download target="_blank"
                                                               style="color:white">
                                                                <v-icon>mdi-arrow-down-bold-circle-outline</v-icon>
                                                            </a>
                                                        </v-btn>
                                                        <v-btn text icon
                                                               @click="openDeleteDialog({id:image.id,update_element:getThis(),reload_after_delete:reload_after_delete})">
                                                            <v-icon>mdi-delete</v-icon>
                                                        </v-btn>
                                                    </v-overlay>
                                                </v-fade-transition>
                                            </v-card>
                                        </template>
                                    </v-hover>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';
    import LoaderBar from "../LoaderBar";

    export default {
        name: "DropzoneComponent",
        components: {LoaderBar},
        props: {
            unique_uuid: {
                type: String,
                //required:true,
                default: ''
            }
        },
        data: function () {
            return {
                base_url: `${this.$config.domen}/api-file-gallery/file-gallery/`,
                form_data: null,
                reload_after_delete: false,
                LoaderBar: false,
                file: null,
                images: [],
            }
        },
        activated() {
            this.reloadData()
        },

        mounted() {
            this.reloadData()
        },
        deactivated() {
            this.unique_uuid = ''
        },
        watch:{unique_uuid(val, old_val){
                this.reloadData()
            }},
        methods: {
            getThis() {
                return this
            },
            sendFile() {
                debugger
                this.LoaderBar = true
                const self = this;
                const form_data = new FormData()
                form_data.append('related_unique', this.unique_uuid);
                debugger
                form_data.append('upload', this.file);
                axios.post(`${this.base_url}`, form_data).then((result) => {

                    this.file = null
                    this.reloadData()
                }).catch((error) => {
                    debugger
                    this.LoaderBar = false
                    this.images = []
                })
            },
            openDeleteDialog({id, update_element, reload_after_delete}) {
                let params = {
                    base_url: this.base_url,
                    id: id,
                    update_element: update_element,
                    reload_after_delete: reload_after_delete
                };
                this.$store.state.info_dialog.deleteDialog.open(params)

            },
            reloadData() {
                this.LoaderBar = true
                const params = {related_unique: this.unique_uuid, page_size: 1000}
                axios.get(`${this.base_url}`, {params}).then((result) => {
                    debugger
                    this.images = result.data.results
                    this.LoaderBar = false
                }).catch((error) => {
                    debugger
                    this.LoaderBar = false
                    this.images = []
                })
            }
        },
    }

</script>

<style scoped>

</style>