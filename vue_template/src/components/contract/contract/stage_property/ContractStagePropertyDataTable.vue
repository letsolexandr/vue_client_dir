<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <div class="headline">Погодження</div>
            </div>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <CoordinationActForm :object_id="object_id"></CoordinationActForm>
        </v-card-title>
        <v-card-text>
            <v-data-table :headers="headers"
                          :items="items"
                          :pagination.sync="pagination"
                          :server-items-length="totalItems"
                          :loading="loading"
                          class="elevation-1">
                <template v-slot:items="props">
                    <td v-for="header in headers " class="text-xs-left">
                        <template v-if="header.value === 'id' ">
                            <v-icon small class="mr-2" @click="getObject({id:props.item.id,
                                                    module:module_name,
                                                    namespace:namespace})">
                                edit
                            </v-icon>
                            <v-icon small
                                    @click="openDeleteDialog({id:props.item.id,update_element:getThis()})">
                                delete
                            </v-icon>
                        </template>
                        <template v-else>
                            <template v-if="header.url">
                                <a @click="go_to('/main/contracts/',props.item.id)">
                                    {{getItem(header.value,props.item)}}
                                </a>
                            </template>
                            <template v-else>
                                {{getItem(header.value,props.item)}}
                            </template>
                        </template>
                    </td>
                </template>
            </v-data-table>
        </v-card-text>

    </v-card>
</template>

<script>
    import TableBase from "@/mixins/TableBase";
    import CoordinationActForm from "./CoordinationActForm";


    export default {
        name: "RegisterAct",
        components: {CoordinationActForm},
        props: {
            object_id: {
                type: Number,
                default: 0,
                required: true
            }
        },
        mixins: [TableBase],
        data() {
            return {
                namespace: 'contract',
                module_name: 'register_payment',
                base_url: `${this.$config.domen}/contracts/register-payment/`,
                object_details: [],
                extra_params:{},
                headers: [
                    {text: 'Дата сплати', value: 'payment_date'},
                    {text: 'Сума сплати', value: 'sum_payment'},
                    {text: 'Дії', value: 'id'},

                ],
            }
        },
        watch: {
            object_id(newId, oldId) {
                //debugger
                if (newId) {

                    this.getData()

                }
            }
        },
        methods: {
            getData() {
                this.page = 1
                this.extra_params = Object.assign(this.extra_params, {object_id: this.object_id})
                this.reloadData()
            }
        }
    }
</script>
