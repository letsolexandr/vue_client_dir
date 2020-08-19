<template>
    <v-flex xs12 style="color:white ;background-color: gray">
        <v-flex xs12>
            <v-btn x-small fab color="primary" class="ma-1" @click="previousPage()">
                <v-icon dark> mdi-skip-previous</v-icon>
            </v-btn>
            <v-btn x-small fab color="primary" class="ma-1" @click="nextPage()">
                <v-icon dark>mdi-skip-next</v-icon>
            </v-btn>
            <!--<v-btn x-small fab color="primary" class="ma-1" @click="downloadWithAxios()">
                <v-icon dark>mdi-file-download-outline</v-icon>
            </v-btn>-->
            <v-btn x-small fab color="primary" class="ma-1" @click="openInNewPage()">
                <v-icon dark>mdi-open-in-new</v-icon>
            </v-btn>
            {{page}}/{{pages}}
        </v-flex>
        <v-flex xs12>
            <pdf :src="pdf_url" :page="page"
                 @num-pages="pages = $event"
                 @page-loaded="page = $event"/>
        </v-flex>
    </v-flex>
</template>

<script>
    import pdf from 'vue-pdf'

    export default {
        components: {pdf},
        name: "PDFViewer",
        props: {
            pdf_url: {type: String},
        },
        data() {
            return {
                page: 1,
                pages: 0
            }
        },
        methods: {
            nextPage() {
                if (this.page === this.pages) {
                    return
                }
                this.page = this.page + 1;
            },
            previousPage() {
                if (this.page === 1) {
                    return
                }
                this.page = this.page - 1;
            },
            downloadWithAxios() {
                axios({
                    method: 'get',
                    url: this.pdf_url,
                    responseType: 'arraybuffer'
                })
                    .then(response => {
                        this.forceFileDownload(response)

                    })
                    .catch(() => console.log('error occured'))
            },
            openInNewPage() {
                window.open(this.pdf_url, '_blank');
            },
            forceFileDownload(response) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf');
                document.body.appendChild(link);
                link.click()
            },
            async convertDocTOBase64(file) {
                function toBase64(file) {
                    new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = error => reject(error);
                    })
                }

                return toBase64(file);

            },
        }
    }
</script>

<style scoped>

</style>