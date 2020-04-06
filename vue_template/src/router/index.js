import Vue from "vue";
import Router from "vue-router"
import store from '@/store'
import routes from './routes'

const my_store = store

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: routes
});

/////////////////////////////////////
function get_main_route(router, to) {
    return '/main'
}

/////////////////////////////////////////////

////////////////////////////////////////////
function set_permissions(my_store) {
    let permissions = localStorage.getItem('permissions')
    if (permissions) {
        my_store.state.auth.permissions = permissions.split(',')
    } else {
        my_store.state.auth.permissions = []
    }

    let user = localStorage.getItem('user')
    if (user) {
        my_store.state.auth.user = JSON.parse(user)
    } else {
        my_store.state.auth.user = {}
    }
}

function checkRoute(store, to) {
    if (!to.meta.requiresAuth) {
        return false
    }
    let permissions = store.state.auth.permissions
    if (to.meta.requiresAuth && permissions.indexOf(to.meta.requires_permission) == -1) {
        return true
    }
    return false
}
///////////////////////////////////////////////
//////////////////////////////////////////////
router.beforeEach((to, from, next) => {
        //debugger
        //----------//
        set_permissions(my_store)
//-----**-----//
        if (!my_store.getters.isLoggedIn) {

            to.name !== 'login' ? next('/login') : next()
        } else {

            if (to.path == '/') {
                let path = get_main_route(router, to)
                next(path)
            } else {

                if (checkRoute(my_store,to)) {
                    to.name !== 'login' ? next('/login') : next()
                } else {
                    next()
                }
            }
        }
//------******---------//
    }
)

export default router;
