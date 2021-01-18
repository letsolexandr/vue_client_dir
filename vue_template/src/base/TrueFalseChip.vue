<template>
    <div>
        <v-chip v-if="status" color="success"> Так</v-chip>
        <v-chip v-if="!status" color="warning"> Ні</v-chip>
    </div>
</template>

<script>

    export default {
        props: {status: {type: Boolean}}
    }
</script>

<style scoped>

</style>