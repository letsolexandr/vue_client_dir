<template>
    <div class="text-xs-center">
        <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x
        >
            <template v-slot:activator="{ on }">
                <v-btn color="primary"
                       fab dark small
                       v-on="on"
                >
                    <v-icon>mdi-view-column</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-list dense>
                    <v-list-item v-for="(item, index) in value" :key="index">
                        <v-list-item-action>
                            <v-checkbox
                                    v-model="item.visible" color="primary"
                            ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-content>
                            {{ item.text }}
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="menu = false">Закрити</v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
    export default {
        props: ['value'],
        name: "ColumnController",
        data: () => ({
            menu: false
        })
    }
</script>
