<template>
    <div v-show="showLoading">
        <v-container fluid fill-height>
            <v-layout child-flex>
                <div class="text-center child-flex">
                    <v-progress-circular
                            :size="100"
                            :width="10"
                            color="primary"
                            indeterminate
                    >
                    </v-progress-circular>
                </div>
            </v-layout>

        </v-container>
    </div>
</template>
<script>

    export default {
        props: ['showLoading',],
        data() {
            return {}
        },
    }
</script>
