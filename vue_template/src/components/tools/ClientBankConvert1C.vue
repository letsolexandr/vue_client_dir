<template>
    <div>
        <v-layout align-center="center" justify="center">
            <v-card class="mx-auto"
                    max-width="700"
                    min-width="500"

            >
                <v-card-title>
                    <span class="headline">Конвертування</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <FileFieldV1 label="Завантажте csv-файл" v-model="fields.in_file" :errormessages="errors.in_file"></FileFieldV1>
                            </v-flex>
                            <v-flex xs12 v-show="result_href">
                                <div class="title text-center">
                                    <a :href="result_href" download="result" target="_blank"> Завантажити результат </a>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-btn :loading="button_loading" rounded color="primary" block @click="convertCSV() ">Конвертувати
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </div>
</template>

<script>
    import axios from 'axios';
    import FileFieldV1 from "../../base/FileFieldV1";

    export default {
        name: "ClientBankConvert1C",
        components: {FileFieldV1},
        data() {
            return {
                endpoint: `${this.$config.domen}/contracts/convert-client-bank`,
                fields: {in_file: null},
                errors:{in_file:[]},
                result_href: null,
                button_loading: false,
            }
        },
        methods: {
            convertCSV() {
                this.errors={};
                this.button_loading = true;
                const form_data = new FormData();
                form_data.append('in_file', this.fields.in_file);
                axios.post(this.endpoint, form_data).then((response) => {
                        setTimeout(()=>{
                            this.result_href = `${this.$config.root}${response.data.url}`;
                            this.button_loading = false;
                        },500)

                    }
                ).catch((error) => {
                    debugger
                    this.button_loading = false;
                    this.errors = error.response.data;

                })
            }
        }
    }
</script>

<style scoped>

</style>