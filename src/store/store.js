import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        query: 'Human',
        documentUrl: './sample.pdf'
    },
    mutations: {
        changeQuery(state, txt) {
            state.query = txt
        },
        changeDocumentUrl(state, url) {
            state.documentUrl = url
        }
    },
    getters: {
        query: state => state.query,
        documentUrl: state => state.documentUrl
    }
})
