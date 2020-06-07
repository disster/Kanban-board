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

function lastTaskNumber(state) {
    let maxNumber = 0;
    for (let col of state.cols) {
        for (let task of col.tasks) {
            if (Number(task.id) > maxNumber){
                maxNumber = Number(task.id)
            }
        }
    }
    return maxNumber;
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
            state.cols[0].tasks.push({
                id: String(lastTaskNumber(state)+1),
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
            } else {
                let colIndex = state.cols.length - 1
                let taskIndex = getTaskIndex(state, colIndex, taskId);
                state.cols[colIndex].tasks.splice(taskIndex, 1);
            }
            setIcons(state);
            setStatus(state);
        },
        CHANGE_TASK: (state, data) => {
            for (let col of state.cols) {
                for (let task of col.tasks) {
                    if (task.id == data.id){
                        task.description = data.description;
                        task.status = data.status;
                        task.responsible = data.responsible;
                        task.beginDate = data.beginDate;
                        task.finishDate = data.finishDate;
                    }
                }
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
        CHANGE_TASK({commit}, data) {
            commit('CHANGE_TASK', data);
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