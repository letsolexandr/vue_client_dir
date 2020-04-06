<template>
    <div>
        <v-btn small color="primary" class="mx-2"
               @click.stop="openAddObjectForm({module:module_name,form_name: form_name, initial:initial})">
            Розрахувати нарахування
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Нарахування</span>
                    </v-card-title>
                    <v-card-text >
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-layout wrap>
                                        <v-flex xs4>
                                            <p class="title"> Період</p>
                                        </v-flex>
                                        <v-flex xs4>
                                            <DataPicker label="Початок періоду" outlined
                                                        v-model="fields.start_date"></DataPicker>
                                        </v-flex>
                                        <v-flex xs4>
                                            <DataPicker label="Кінець періоду" outlined
                                                        v-model="fields.end_date"></DataPicker>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <!--
                                <v-flex xs12>
                                    <v-layout wrap>
                                        <v-flex xs4>
                                            <p class="title"> Тип банку</p>
                                        </v-flex>
                                        <v-flex xs3>
                                            <v-checkbox label="Комерціний"
                                                        v-model="fields.is_comercial"></v-checkbox>
                                        </v-flex>
                                        <v-flex xs3>
                                            <v-checkbox label="Державний"
                                                        v-model="fields.is_budget"></v-checkbox>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-checkbox label="Згенерувати PDF"
                                                        v-model="fields.create_pdf"></v-checkbox>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>-->
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                        <v-btn color="primary"
                               @click="calculateAccrual()">Розрахувати
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import Autocomplete from '@/base/Autocomplete';
    import axios from 'axios';
    import FormBase from "@/mixins/FormBase";
    import DataPicker from "../../../base/DataPicker";


    export default {
        mixins: [FormBase],
        components: {
            DataPicker,
            Autocomplete
        },
        data() {
            return {
                namespace: null,
                initial: {
                    create_pdf: true,
                    is_budget: true,
                    is_comercial: true,
                    start_date: ((new Date()).toISOString()).substr(0, 8) + '01',
                    end_date: ((new Date()).toISOString()).substr(0, 8) + '28'
                },
                form_name: 'calculate_accrual',
                module_name: 'register_accurual',
                base_url: `${this.$config.domen}/contracts/calculate-range-accrual/`

            }
        },
        methods: {
            calculateAccrual() {
                this.LoaderBar = true;
                let info_dialog = this.$store.state.info_dialog.infoDialog;
                const url = this.base_url;
                const params = this.fields;
                this.dialog = false;
                info_dialog.open({
                    title: 'Формування нарахувань',
                    message: 'Це може зайняти деякий час. Будь ласка, дочекайтесь закінчення ...',
                    show_loader: true,
                    disabled_close: true
                });
                axios.post(url, params).then((response) => {
                         info_dialog.open({
                            title: 'Успішно',
                            message: 'Формування нарахувань закінчено',
                            disabled_close: false,
                            //update_element: update_element
                        });

                    }
                ).catch((error) => {
                    debugger
                    this.loaderBar = false;
                    info_dialog.close();
                })
            }
        }
    }
</script>
