import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

import store from './store';
import router from './router'
import App from './App.vue'
import Breabcrumbs from 'vue-2-breadcrumbs';


import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use(CKEditor);
Vue.use(VueRouter)
Vue.use(Breabcrumbs)

Vue.config.productionTip = false

Vue.prototype.$config = require('@/config').default

new Vue({
    vuetify,
    render: h => h(App),
    store: store,
    router: router,
    icons: {
        iconfont: 'mdi' // default
    }
}).$mount('#app')
