<template>
    <div>
        <v-container>
            <v-file-input
                    v-model="value"
                    :error-messages="errormessages"
                    placeholder="Виберіть файл"
                    :label="label"
                    prepend-icon="mdi-paperclip">
            </v-file-input>
            <template v-if="value">
                Поточний файл <a :href="value" target="_blank">{{getFileName()}}</a>
            </template>
        </v-container>
    </div>
</template>
<script>
    import {getFileName} from "../js";

    export default {
        props: {
            label: {
                type: String,
                required: false,
                default: ''
            },
            errormessages: {
                type: Array,
                required: false
            },
            value: {
                type: [File, String],
                required: false
            }
        },
        watch: {
            value(newValue, ovalue) {
                if (newValue && newValue.name && typeof newValue.name === "string") {
                    this.file = newValue;
                    this.$emit('input', this.file);

                } else if (typeof newValue === "string") {
                    this.file_url = newValue;
                }
            }
        },

        data() {
            return {
                file: null,
                file_url: ''
            }
        },
        methods: {
            getFileName,
        }
    }
</script>
