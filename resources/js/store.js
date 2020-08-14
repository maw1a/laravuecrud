import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        logged: false,
        currentUser: null,
    },
    mutations: {
        loggedToggle (state) {
            state.logged = !state.logged;
        },
        setCurrentUser (state, payload) {
            state.currentUser = payload;
        }
    }
})

export default store;