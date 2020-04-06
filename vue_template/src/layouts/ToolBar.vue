<template>
    <div>
        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="blue darken-3"
                dark
        >
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-app-bar-nav-icon @click.stop="togle_sidebar()"></v-app-bar-nav-icon>
                <span class="hidden-sm-and-down">ДП "Держінфоресурс"</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="$vuetify.theme.isDark=!$vuetify.theme.isDark">
                <v-icon>mdi-invert-colors</v-icon>
            </v-btn>

            {{$store.state.auth.user.first_name||$store.state.auth.user.username}}

            <!--<v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>
            -->

            <v-speed-dial
                    direction="bottom"
            >
                <template v-slot:activator>
                    <v-btn icon large>
                        <v-avatar size="32px" tile>
                            <!--<img
                              src="https://agroscope.ua/catalog/view/theme/default/img/Agroscop.svg"
                              alt="Держінфоресурс"
                            >-->
                            <v-icon>mdi-account</v-icon>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-btn fab small @click="logout()">
                    <v-icon>logout</v-icon>
                </v-btn>
            </v-speed-dial>

        </v-app-bar>
    </div>
</template>

<script>

    export default {
        components: {},
        methods: {
            togle_sidebar: function () {
                this.$store.state.menu.drawer = !this.$store.state.menu.drawer;
            },
            logout() {
                const self = this;
                this.$store
                    .dispatch("logout", this.fields)
                    .then(() => this.$router.push({path: '/login'}))
                    .catch(err => console.log(err));
            }
        }
    }
</script>
