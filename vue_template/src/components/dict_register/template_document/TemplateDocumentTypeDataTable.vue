<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :headers="headers">
        <template slot="form">
            <TemplateDocumentTypeForm/>
        </template>
    </DefaultDataTable>
</template>
<script>

    import TemplateDocumentTypeForm from "./TemplateDocumentTypeForm";
    import DefaultDataTable from "../../../base/DefaultDataTable";

    export default {
        components: {DefaultDataTable, TemplateDocumentTypeForm,},
        data() {
            return {
                namespace: 'dict',
                module_name: 'template_document',
                base_url: `${this.$config.domen}/dict/template-document/`,
                headers: [
                    {
                        text: 'Призначення шаблону',
                        align: 'center',
                        visible: true,
                        value: 'related_model_name',
                    },
                    {
                        text: 'Дії',
                        visible: true,
                        value: 'id'
                    },
                ]
            }
        }
    }
</script>
