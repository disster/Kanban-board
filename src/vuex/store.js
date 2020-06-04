import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        cols: []
    },
    mutations: {
        SET_COLS_TO_STATE: (state, cols) => {
            state.cols = cols;
        },
        ADD_TASK_TO_COLS: (state, task) => {
            function tasksQuantity() {
                let counter = 0;
                if (state.cols.length) {
                    for (let col of state.cols) {
                        counter += col.tasks.length
                    }
                }
                return counter;
            }

            state.cols[0].tasks.push({
                id: tasksQuantity() + 1,
                description: task
            });
        },
        MOVE_TASK: (state, data) => {
            function getColIndex(colTitle) {
                for (let i = 0; i < state.cols.length; i++) {
                    if (state.cols[i].title == colTitle) {
                        return i;
                    }
                }
            }

            function getTaskIndex(colIndex, taskId) {
                for (let i = 0; i < state.cols[colIndex].tasks.length; i++) {
                    if (state.cols[colIndex].tasks[i].id == taskId) {
                        return i;
                    }
                }
            }

            let colTitle = data.col.title;
            let taskId = data.task.id;
            let colIndex = getColIndex(colTitle);
            if (colIndex != state.cols.length - 1) {
                let taskIndex = getTaskIndex(colIndex, taskId);
                let task = state.cols[colIndex].tasks[taskIndex];
                state.cols[colIndex].tasks.splice(taskIndex, 1);
                state.cols[colIndex + 1].tasks.push(task);
            } else {
                let colIndex = state.cols.length - 1
                let taskIndex = getTaskIndex(colIndex, taskId);
                state.cols[colIndex].tasks.splice(taskIndex, 1);
            }

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
        ADD_TASK({commit}, task) {
            commit('ADD_TASK_TO_COLS', task)
        },
        CONFIRM_TASK({commit}, data) {
            commit('MOVE_TASK', data);
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