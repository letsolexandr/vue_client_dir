<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <div class="headline"> Задача: {{object_details.__str__}}</div>
            </div>
        </v-card-title>
        <v-card-text>
            <template v-if="object_details.__str__">
                <v-layout row wrap>
                    <v-flex xs6>
                        <p class="text-sm-left">
                            Задача:
                        </p>
                    </v-flex>
                    <v-flex xs6>
                        <p class="text-sm-left">
                            {{object_details.title}}
                        </p>
                    </v-flex>
                    <v-flex xs6>
                        <p class="text-sm-left">
                            Даталі:
                        </p>
                    </v-flex>
                    <v-flex xs6>
                        <p class="text-sm-left">
                            {{object_details.description}}
                        </p>
                    </v-flex>
                    <v-flex xs6>
                        <p class="text-sm-left">
                            Дата контролю:
                        </p>
                    </v-flex>
                    <v-flex xs6>
                        <p class="text-sm-left">
                            {{object_details.due_date}}
                        </p>
                    </v-flex>
                    <v-flex xs6>
                        <p class="text-sm-left">
                            Затрати часу:
                        </p>
                    </v-flex>
                    <v-flex xs6>
                        <p class="text-sm-left" v-if="object_details.is_on_play">
                            {{FormatTime(object_details.dynamic_execution_time)}}
                        </p>
                        <p class="text-sm-left" v-else>
                            {{FormatTime(object_details.execution_time)}}
                        </p>
                    </v-flex>
                    <template v-if="object_details">
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Дії:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                <v-btn @click.stop="play()" :disabled="object_details.is_on_play">
                                    <v-icon>mdi-play</v-icon>
                                </v-btn>
                                <v-btn @click.stop="pause()" :disabled="!object_details.is_on_play">
                                    <v-icon>mdi-pause</v-icon>
                                </v-btn>
                            </p>
                        </v-flex>
                    </template>
                    <v-flex xs12 v-if="object_details.unique_uuid">
                        <DropzoneComponent :unique_uuid="object_details.unique_uuid"></DropzoneComponent>
                    </v-flex>
                </v-layout>
            </template>
            <template v-else>
                <v-skeleton-loader
                        class="mx-auto"
                        max-width="300"
                        type="card"
                ></v-skeleton-loader>
            </template>

        </v-card-text>
    </v-card>
</template>

<script>
    import axios from 'axios';
    import DetailCard from "@/mixins/DetailCard";
    import {FormatTime} from "../../../js"
    import DropzoneComponent from "../../../base/dropzone/DropzoneComponent";

    export default {
        components: {DropzoneComponent},
        mixins: [DetailCard],
        data() {
            return {
                namespace: 'crm',
                module_name: 'task',
                base_url: `${this.$config.domen}/crm/tasks/`,
                static_model_params: {
                    app_label: 'crm_module',
                    model: 'task',
                },
            }
        },
        methods: {
            FormatTime,
            callRPC(method) {
                let url = `${this.$config.domen}/api-base/rpc`;
                let params = Object.assign(this.static_model_params, {pk: this.object_id, method: method})
                axios.get(url, {params: params}).then((response) => {
                        this.reloadData();
                    }
                ).catch((error) => {
                    console.log(error)
                })
            },

            play() {
                debugger
                this.callRPC('play')
            },
            pause() {
                debugger
                this.callRPC('pause')
            }
        }
    }
</script>

<style scoped>

</style>