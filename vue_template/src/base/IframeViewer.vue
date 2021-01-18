<template>
    <div class="iframe-wrapper" :style="{height:height}">
        <vue-friendly-iframe ref="iframeEl" frameborder="0" gesture="media" allow="encrypted-media" crossorigin="anonymous"
                             :src="src">
        </vue-friendly-iframe>
    </div>
</template>

<script>
    export default {
        props: {
            src: {
                type: String,

            },
            height: {
                type: String,
                default: '700px'
            }
        },
        name: "IframeViewer"
    }
</script>

<style>
    .iframe-wrapper {
        border: 1px solid gray;
    }

    .vue-friendly-iframe {
        height: 100%;
        width: 100%;
    }

    iframe {
        height: 100%;
        width: 100%;
    }

</style>