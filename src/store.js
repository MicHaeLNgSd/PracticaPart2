import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    plugins: [createPersistedState()],
    state: {
        count: 0,
        isDark: false,
    },
    mutations: {
        setCount: (state, count) => (state.count = count),
        setIsDark: (state) => (state.isDark = !state.isDark),
    },
    getters: {
        getCount: (state) => {
            return state.count;
        },
        getIsDark: (state) => {
            return state.isDark;
        }
    }
})
export default store;


