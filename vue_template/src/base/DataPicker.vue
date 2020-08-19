<template>
    <v-menu
            v-model="date_c_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="value"
                    :label="label"
                    :error-messages="errors"
                    prepend-icon="event"
                    readonly
                    :dense="dense"
                    :outlined="outlined"
                    v-on="on"
                    :disabled="disabled"
            ></v-text-field>
        </template>
        <v-date-picker v-model="date_c"
                       locale="uk-ua"
                       @input="updateDataPicker()">

        </v-date-picker>
    </v-menu>
</template>

<script>
    export default {
        model: {
            prop: 'value',
            event: 'update:date'
        },
        props: ['value', 'label','error_messages','errorMessages','dense','outlined','disabled'],
        name: "DataPicker",
        data() {
            return {
                date_c_menu: false,
                errors:null,
                date_c: new Date().toISOString().substr(0, 10),
            }
        },
        watch: {
            value(newValue, oldValue) {
                //debugger
            },
            error_messages:function(newValue, oldValue){
                //debugger
                this.errors = newValue
            },
            errorMessages:function(newValue, oldValue){
                //debugger
                this.errors = newValue
            }
        },
        methods:{
            updateDataPicker(){
                this.$emit('update:date', this.date_c)
                this.date_c_menu = false
            }
        }
    }
</script>

<style scoped>

</style>