<template>
    <v-card>
        <v-card-title>
            <span class="title font-weight-light">Кількість відкритих заявок</span>
        </v-card-title>
        <v-data-table
                dense
                :headers="headers"
                :items="items"
                :items-per-page="15"
                class="elevation-1"
        ></v-data-table>
    </v-card>
</template>

<script>
    import axios from 'axios';

    export default {

        props: {
            isActivated: {
                type: Boolean,
                default: () => false
            },

        },

        data() {
            return {
                headers: [
                    {
                        text: 'Працівник',
                        align: 'left',
                        value: 'name',
                    },
                    {text: 'Кількість заявок', value: 'c'},

                ],
                items: []
            }
        },
        watch: {
            isActivated: {
                handler: function (val, oldVal) {
                    //debugger
                    this.createChart()
                }
            },
        },
        mounted() {
            //debugger
            this.createChart()
        },
        activated() {
            //debugger
            this.createChart()
        },
        methods: {
            createChart(loader = false) {
                //debugger
                const self = this;
                let params = {
                    conn_string: `DRIVER={ODBC Driver 17 for SQL Server};SERVER=10.0.20.31;DATABASE=msp_servicedesk;UID=sa2;PWD=d@193hQk77;PORT=3306`,
                    sql: `select name, count(WORKORDERID) as c ,USERID  from (select ISNULL(FIRSTNAME,'') + ' ' +ISNULL(MIDDLENAME,'')+ ' ' + ISNULL(LASTNAME,'') as name, WORKORDERID,USERID from WorkOrder left join SDUser on WorkOrder.CREATEDBYID = SDUser.USERID where COMPLETEDTIME =0 and FR_DUETIME =0 and USERID <> 1) as query group by USERID,name order by c desc`
                }
                axios.get('http://10.0.30.220:9999/api/statistic/any-sql', {params: params}).then((response) => {
                        debugger
                        self.items = response.data.result;
                        setTimeout(() => {
                            self.createChart()
                        }, 1000 * 60 * 5)
                    }
                ).catch((error) => {
                    console.log(error)
                })
            }
        }
    }
</script>


<style scoped>

</style>