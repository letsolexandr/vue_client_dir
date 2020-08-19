<template>
    <v-overlay :value="overlay" opacity="0.7" z-index="999">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
    export default {
        name: "OverleyLoading",
        data: () => ({
            overlay: false,
        }),
        mounted() {
            this.registerEvents()
        },
        methods:{
            showOverlay(){
                this.overlay=true;
            },
            hideOverlay(){
                this.overlay=false;
            },
            registerEvents(){
                this.$root.$on('show-overlay-loading', this.showOverlay);
                this.$root.$on('hide-overlay-loading', this.hideOverlay);
            },
        }
    }
</script>

