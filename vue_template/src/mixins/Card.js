//import axios from 'axios';
export default {
    data() {
        return {
            id: 0,
            tabs: null,

        }
    },
    activated() {
        debugger
        if (this.$route.params.id) {
            this.id = parseInt(this.$route.params.id)
        }
        if (!this.$route.params.id) {
            this.id = null
        }
    },
    watch: {
        $route() {
            if (this.$route.params.id) {
                this.id = parseInt(this.$route.params.id)
            }
            if (!this.$route.params.id) {
                this.id = null
            }
        }
    }
}
