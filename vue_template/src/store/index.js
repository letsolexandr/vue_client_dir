import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import menu from './modules/menu';
import delete_confirm from './modules/delete_confirm';
import user from './modules/user';
import message_bar from './modules/message_bar';
import field from './modules/field';
import agrochimfield from './modules/agrochimfield';
import agrochimpointzone from './modules/agrochimpointzone';
import providing from './modules/providing';
import culture from './modules/culture';
import growthphase from './modules/growthphase';
import organization from './modules/organization';
import technician from './modules/technician';
import fertilizer_schedule from './modules/fertilizer_schedule';
import api from  './modules/api';
//import admin from  './modules/admin';





Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    menu,
    api,
    //admin,
    delete_confirm,
    user,
    message_bar,
    field,
    agrochimfield,
    agrochimpointzone,
    organization,
    providing,
    culture,
    growthphase,
    technician,
    fertilizer_schedule
  }
})
