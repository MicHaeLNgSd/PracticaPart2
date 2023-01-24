import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    plugins: [createPersistedState()],
    state: {
        count: 0,
        isDark: false,
        user: null,
    },
    mutations: {
        setCount: (state, count) => (state.count = count),
        setIsDark: (state) => (state.isDark = !state.isDark),
        setUser: (state, user) => state.user = user,
    },
    getters: {
        getCount: (state) => {
            return state.count;
        },
        getIsDark: (state) => {
            return state.isDark;
        },
        getUser: (state) => {
            return state.user
        },
    }
})
export default store;


