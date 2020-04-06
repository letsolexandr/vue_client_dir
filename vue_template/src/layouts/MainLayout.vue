<template>
    <transition name="component-fade" mode="out-in">
        <keep-alive>
            <v-container
                    fluid
                    fill-height>
                <v-layout child-flex>
                    <router-view name="content">

                    </router-view>
                </v-layout>
            </v-container>
        </keep-alive>
    </transition>
</template>
<script>

    import Login from '@/layouts/Login';

    export default {
        components: {
            Login,
        },
    }
</script>

<style type="text/css">
    .component-fade-enter-active,
    .component-fade-leave-active {
        transition: opacity .3s ease;
    }

    .component-fade-enter,
    .component-fade-leave-to

        /* .component-fade-leave-active до версии 2.1.8 */
    {
        opacity: 0;
    }
</style>
