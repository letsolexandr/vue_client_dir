<template>
    <v-navigation-drawer v-model="$store.state.menu.drawer"
                         :clipped="$vuetify.breakpoint.lgAndUp" app>
        <v-list dense>
            <template v-for="item in items"
                      v-if="$store.state.auth.permissions.indexOf(item.requires_permission)!=-1">

                <v-layout v-if="item.heading" :key="item.heading" row align-center>
                    <v-flex xs6>
                        <v-subheader v-if="item.heading">
                            {{ item.heading }}

                        </v-subheader>
                    </v-flex>
                    <v-flex xs6 class="text-xs-center">
                        <a href="#!" class="body-2 black--text">EDIT</a>
                    </v-flex>
                </v-layout>
                <template v-else-if="item.children">
                    <v-list-group :key="item.text" v-model="item.model"
                                  :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                        <template v-slot:activator>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ item.text }}

                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <template v-for="(child, i) in item.children">
                            <template v-if="child.children">
                                <v-list dense>
                                    <v-list-group :key="child.text" v-model="child.model"
                                                  :prepend-icon="child.model ? child.icon : child['icon-alt']"
                                                  append-icon="">
                                        <template v-slot:activator>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title>
                                                        {{ child.text }}
                                                    </v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </template>
                                        <v-list-item v-for="(inner_child, n) in child.children" :key="n"
                                                     v-if="$store.state.auth.permissions.indexOf(inner_child.requires_permission)!=-1"
                                                     @click="go_to(inner_child)">
                                            <v-list-item-action v-if="inner_child.icon">
                                                <v-icon>{{ inner_child.icon }}</v-icon>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    {{ inner_child.text }}
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-group>
                                </v-list>
                            </template>
                            <template v-else>
                                <v-list-item :key="i"
                                             v-if="$store.state.auth.permissions.indexOf(child.requires_permission)!=-1"
                                             @click="go_to(child)">
                                    <v-list-item-action v-if="child.icon">
                                        <v-icon>{{ child.icon }}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            <v-card tile>
                                            {{ child.text }}
                                            </v-card>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </template>
                    </v-list-group>
                </template>
                <v-list-item v-else :key="item.text" @click="go_to(item)">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'items',
                'getPermissions'
            ])
        },
        methods: {
            go_to: function (item) {
                //debugger
                this.$router.push(item.url);
            }
        },
    }
</script>
