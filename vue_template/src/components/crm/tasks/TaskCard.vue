<template>
    <v-card>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
                <v-flex xs6>
                    <TaskDetail :object_id="id"></TaskDetail>
                </v-flex>
                <v-flex xs6>
                    <TaskItems :task_id="id"></TaskItems>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>
<script>

    import Card from "../../../mixins/Card";
    import TaskDetail from "./TaskDetail";
    import TaskItems from "./TaskItems";
    import DropzoneComponent from "../../../base/dropzone/DropzoneComponent";

    export default {
        mixins: [Card],
        name: "TaskCard",
        components: {DropzoneComponent, TaskItems, TaskDetail},

    }
</script>

<style scoped>

</style>