import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        cols: []
    },
    mutations: {
        SET_COLS_TO_STATE: (state, cols)=>{
            state.cols = cols;
        }
    },
    actions: {
        GET_COLS_FROM_API({commit}) {
            return axios('http://localhost:3000/cols', {
                method: "GET"
            })
                .then((cols) => {
                    commit('SET_COLS_TO_STATE', cols.data);
                    return cols;

                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },

    },
    getters:
        {
            COLS(state) {
                return state.cols;
            }
        }
});


export default store;