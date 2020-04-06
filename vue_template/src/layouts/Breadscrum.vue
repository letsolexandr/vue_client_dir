<template>
    <v-card>
        <div v-if="$breadcrumbs.length">
            <v-breadcrumbs :items="$breadcrumbs">
                <template v-slot:item="props">
                    <a @click="goTo(props.item.path)" >{{convertToUpper(props.item.meta.breadcrumb)}}</a>
                </template>
            </v-breadcrumbs>
        </div>
    </v-card>
</template>
<script>
    export default {
        data() {
            return {
                items: []
            }
        },
        watch: {
            $breadcrumbs(){
                //debugger
                //this.items = this.$route.matched.slice()
            }
        },
        methods:{
            convertToUpper(value){
                if(typeof value !== 'undefined'){
                    return value.toUpperCase()
                }
                else {
                    return ''
                }

            },
            goTo: function (url) {
                this.$router.push(url);
            },
        }
    }
</script>
<style lang="stylus" scoped>
    .disabled
        color: grey
        pointer-events: none
</style>