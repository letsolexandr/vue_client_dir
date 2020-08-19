import {mapActions} from 'vuex'
import {consoleError, consoleInfo} from "vuetify/lib/util/console"
import {reloadPage} from '@/js'
import {loadOptions, parseFileFieldV1s, parseChoices, getChoices} from "./shared"

export default {
    props: {
        object_id: {
            type: Number,
            default: 0,
            required: false
        },
        on_save_call_event:{
            type:String,
            required:false
        },
        extra_fields: {
            type: Object,
            default: function () {
                return {}
            },
            required: false
        }
    },
    data() {
        return {
            dialog: false,
            redirect_to_card: null,
            reload_on_save: false,
            loadingPGBar: false,
            static_form_fields: {},
            fields: {},
            allowed_to_send:null,
            choices: {},
            form_errors: {},
            file_fields: [],
        }
    },
    created() {
        //debugger
        this.loadOptions()
    },
    mounted() {
        this.$nextTick(() => {

            this.$store.dispatch('addFormToStore', {
                module_name: this.module_name, namespace: this.namespace,
                form: this, form_name: this.form_name
            })
                .then(() => {
                    consoleInfo('saved sucess')
                })
                .catch((err) => {
                    consoleError(err)
                })
        })
        // this.setExtraFields()
    },
    watch: {
        dialog(dialogStatus) {
            //debugger
            if (!dialogStatus) {
                this.fields = {}
                this.form_errors = {}
            }
        },
        // extra_fields: {
        //     handler: function (newId, oldId) {
        //
        //         if (newId) {
        //             this.setExtraFields()
        //         }
        //     },
        //     deep: true
        // }

    },
    methods: {
        ...mapActions([
            'openAddObjectForm',
            'saveObject',
            'getObject',
        ]),
        reloadPage,
        loadOptions,
        parseFileFieldV1s,
        parseChoices,
        getChoices,
        getFileFieldV1s() {
            const file_fields = {}
            for (let [key, value] of Object.entries(this.fields)) {
                if (value instanceof File) {
                    //debugger
                    file_fields[key] = value
                }
            }
            //debugger
            return file_fields
        },
        getThis() {
            return this
        },
        getNoFileFieldV1s() {

            const not_file_fields = {}
            for (let [key, value] of Object.entries(this.fields)) {
                if (this.file_fields.indexOf(key) === -1) {
                    not_file_fields[key] = value
                }
            }
            //debugger
            return not_file_fields
        },
        getAllowedToSend(fields){

            if (! this.allowed_to_send){
                return fields
            }
            const allowed_to_send = {}
            for (let [key, value] of Object.entries(fields)) {
                if (this.allowed_to_send.indexOf(key) !== -1) {
                    allowed_to_send[key] = value
                }
            }

            return allowed_to_send
        },
        updateField(evt, field) {
            this.fields[field] = evt;
        },
        // setExtraFields() {
        //
        //     this.fields = Object.assign( this.fields,this.extra_fields)
        //     console.log(this.fields)
        // }
    }
}
