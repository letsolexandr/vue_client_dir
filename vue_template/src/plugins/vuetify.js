// import Vue from 'vue'
// import Vuetify from 'vuetify/lib'
// import 'vuetify/src/stylus/app.styl'
//
// Vue.use(Vuetify, {
//   iconfont: 'md',
// })

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {dark: false}
});
