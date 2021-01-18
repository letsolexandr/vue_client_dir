import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import axios from './plugins/axios';

import store from './store';
import router from './router'
import App from './App.vue'
import Breabcrumbs from 'vue-2-breadcrumbs';


import CKEditor from '@ckeditor/ckeditor5-vue';

import VueFriendlyIframe from 'vue-friendly-iframe';

Vue.use(VueFriendlyIframe);

Vue.use(CKEditor);
Vue.use(VueRouter);
Vue.use(Breabcrumbs);

Vue.config.productionTip = false;

Vue.prototype.$config = require('@/config').default;
Vue.prototype.axios= axios;

new Vue({
    vuetify,
    render: h => h(App),
    store: store,
    router: router,
    icons: {
        iconfont: 'mdi' // default
    }
}).$mount('#app')
