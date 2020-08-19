<template>
    <v-app id="inspire">
        <template v-if="$store.getters.isLoggedIn">
            <Navigation></Navigation>
            <ToolBar></ToolBar>
        </template>
        <v-content>
            <template v-if="$store.getters.isLoggedIn">
                <Breadscrum/>
            </template>
            <v-container
                    fluid
                    fill-height>
                <router-view class="view one" id="r_container">
                </router-view>
                <MessageBar/>
                <InfoDialog/>
                <DeleteDialog/>
                <ConfirmDialog/>
                <OverleyLoading></OverleyLoading>
            </v-container>
        </v-content>

    </v-app>
</template>
<script>

    import axios from '@/m_axios';
    import Navigation from "./layouts/Navigation";
    import ToolBar from "./layouts/ToolBar";
    import MessageBar from '@/base/info_dialog/MessageBar';
    import InfoDialog from '@/base/info_dialog/InfoDialog';
    import DeleteDialog from '@/base/info_dialog/DeleteDialog';
    import Breadscrum from "./layouts/Breadscrum";
    import ConfirmDialog from "./base/info_dialog/ConfirmDialog";
    import OverleyLoading from "./base/OverlayLoading";

    //!!!!!!Не видаляти
    /*ця штука глобально реструє модифікацію */

    export default {
        components: {
            OverleyLoading,
            ConfirmDialog,
            ToolBar,
            Navigation,
            Breadscrum,
            MessageBar,
            InfoDialog,
            DeleteDialog
        },
        mounted() {
            this.$root.$emit('show-overlay-loading');
            setTimeout(() => {
                this.$root.$emit('hide-overlay-loading')
            }, 3000)
        },

    }
</script>
