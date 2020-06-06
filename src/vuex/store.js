import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

function setIcons(state) {
    for (let i = 0; i < state.cols.length - 1; i++) {
        for (let j = 0; j < state.cols[i].tasks.length; j++) {
            state.cols[i].tasks[j].iconName = 'check_circle_outline';
        }
    }
    for (let j = 0; j < state.cols[state.cols.length - 1].tasks.length; j++) {
        state.cols[state.cols.length - 1].tasks[j].iconName = 'highlight_off'
    }
}

function getTaskIndex(state, colIndex, taskId) {
    for (let i = 0; i < state.cols[colIndex].tasks.length; i++) {
        if (state.cols[colIndex].tasks[i].id == taskId) {
            return i;
        }
    }
}

function getColIndex(state, colTitle) {
    for (let i = 0; i < state.cols.length; i++) {
        if (state.cols[i].title == colTitle) {
            return i;
        }
    }
}

function setStatus(state) {
    for (let i = 0; i < state.cols.length; i++) {
        for (let j = 0; j < state.cols[i].tasks.length; j++) {
            state.cols[i].tasks[j].status = state.cols[i].title;
        }
    }
}

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        cols: []
    },
    mutations: {
        SET_COLS_TO_STATE: (state, cols) => {
            state.cols = cols;
            setIcons(state);
            setStatus(state)
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
                description: task,
                status: "План"
            });
            setIcons(state);
        },
        MOVE_TASK: (state, data) => {
            let colTitle = data.col.title;
            let taskId = data.task.id;
            let colIndex = getColIndex(state, colTitle);
            if (colIndex != state.cols.length - 1) {
                let taskIndex = getTaskIndex(state, colIndex, taskId);
                let task = state.cols[colIndex].tasks[taskIndex];
                state.cols[colIndex].tasks.splice(taskIndex, 1);
                state.cols[colIndex + 1].tasks.push(task);
                // if (colIndex == 0){
                //     state.cols[colIndex + 1].tasks[state.cols[colIndex + 1].tasks.length].status = 'doing';
                // } else {
                //     state.cols[colIndex + 1].tasks[state.cols[colIndex + 1].tasks.length].status = 'done'
                // }
            } else {
                let colIndex = state.cols.length - 1
                let taskIndex = getTaskIndex(state, colIndex, taskId);
                state.cols[colIndex].tasks.splice(taskIndex, 1);
            }
            setIcons(state);
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