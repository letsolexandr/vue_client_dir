<template>
    <div>
        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <v-text-field
                          :label="label"
                          v-model='fileName'
                          :error-messages="errormessages"
                          prepend-icon='attach_file'
            >
                <template v-if="fileUrl" v-slot:append>
                    <a  :href="fileUrl" target="_blank"><v-icon>mdi-eye</v-icon></a>
                </template>
            </v-text-field>
            <input
                    type="file"
                    class="custom-file-upload"
                    @click="clear"
                    @input="onFilePicked"
            >
        </v-flex>
    </div>
</template>
<script>
    export default {
        props: ['label', 'value', 'errormessages'],
        data() {
            return {
                title: "Image Upload",
                dialog: false,
                fileName: '',
                fileUrl: '',
                fFile: null
            }
        },
        mounted() {
            //debugger
        },
        watch: {
            // эта функция запускается при любом изменении
            value: function (value, oldvalue) {
                debugger;
                if (this.dont_change_on_next_tick) {
                    this.dont_change_on_next_tick = false;
                    return;
                }
                let val = this.$props.value;
                if (val && typeof val === 'string') {

                    let arr = val.split('/');
                    this.fileName = arr[arr.length - 1];
                    this.fFile = null;
                    this.fileUrl = val;
                    //debugger
                    this.dont_change_on_next_tick = true;
                    this.$emit('input', null);
                } else if (val instanceof File) {
                    this.fileName = val.name;

                } else {
                    this.clear()
                }
            },
            fileName(newFileName,oldFileName){
                debugger
            }
        },
        methods: {
            pickFile() {
                debugger
                let self = this
                setTimeout(function() {
                    self.$refs.file.click()
                }, 200);

            },
            clear(e){
                debugger

                this.fileName = ''
                this.fFile = null
                this.fileUrl = ''
            },
            onFilePicked(e) {
                debugger
                const files = e.target.files
                if (files[0] !== undefined) {
                    this.fileName = files[0].name
                    if (this.fileName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.fileUrl = fr.result
                        this.fFile = files[0];
                        this.$emit('input', files[0]);
                    })
                } else {
                    this.clear()
                }
            }
        }

    }
</script>
