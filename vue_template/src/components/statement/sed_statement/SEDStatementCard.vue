<template>
    <v-card>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
                <v-flex xs12>
                    <SEDStatementDetail :object_id="id"/>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>

    import SEDStatementDetail from "./SEDStatementDetail";



    export default {
        name: "ContractCard",
        components: { SEDStatementDetail},
        data() {
            return {
                id: 0,
                tabs: null,

            }
        },
        activated() {
            debugger
            if (this.$route.params.id) {
                this.id = parseInt(this.$route.params.id)
            }
            if (!this.$route.params.id) {
                this.id = null
            }
        },
        watch: {
            $route() {
                if (this.$route.params.id) {
                    this.id = parseInt(this.$route.params.id)
                }
                if (!this.$route.params.id) {
                    this.id = null
                }
            }
        }
    }
</script>

<style scoped>

</style>