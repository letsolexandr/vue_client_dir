import {saveAs} from './FileSaver';

function reloadPage() {
    let location = this.$route.fullPath
    this.$router.replace(this.$route.matched[0])
    this.$nextTick(() => this.$router.replace(location))
}

function getFileName(full_url = null) {
    if (full_url) {
        let url_chancs = full_url.split('/')
        return decodeURI(url_chancs[url_chancs.length - 1])
    }
    if (this && this.file_url) {
        let url_chancs = this.file_url.split('/')
        return decodeURI(url_chancs[url_chancs.length - 1])
    } else {
        return ''
    }
}

function FormatTime(seconds) {
    if (!seconds) {
        return "";
    }
    let hours = Math.floor((seconds / 3600));
    let minutes = Math.floor(((seconds - (hours * 3600)) / 60));
    let left_seconds = (seconds - (hours * 3600) - (minutes * 60)).toFixed(0);
    const result = `${hours} год. ${minutes} хв.  ${left_seconds} сек.`;
    return result;
}


export {reloadPage, getFileName, FormatTime, saveAs};
