<template>
    <v-chip :color="getColor()" text-color="white">{{value}}</v-chip>
</template>

<script>
    export default {
        name: "coloredBadge",
        props: ['value'],
        methods: {
            getColor() {
                let val = parseInt(this.value)
                //debugger
                if (!isNaN(val) && val >= 0) {
                    //debugger
                    return 'green'
                } else {
                    //debugger
                    return 'red'
                }
            }
        }
    }
</script>