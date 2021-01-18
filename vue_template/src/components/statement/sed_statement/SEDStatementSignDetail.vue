<template>

    <v-card>
        <v-card-subtitle>
            Деталі ЕЦП
        </v-card-subtitle>
        <v-card-text>
          <SignInfo :info="object_details.verify_result"></SignInfo>
        </v-card-text>
    </v-card>

</template>
<script>

    import DetailCard from "../../../mixins/DetailCard"
    import conf from "./conf";
    import {root} from "./config";
    import SignInfo from "../../SignInfo";

    export default {
        mixins: [DetailCard, conf],
        components: {SignInfo},
        data() {
            return {
                base_url: `${root}/api/statement/statement-uuid-info/`,
            }
        },
    }
</script>

<style scoped>

</style>