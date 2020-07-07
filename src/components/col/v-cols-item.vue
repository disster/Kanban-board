<template>
    <div class="v-cols-item">
        <div class="v-cols-item__title">{{colData.title}} ({{colData.tasks.length}})</div>
        <draggable class="draggable_area" :list='colData.tasks'>
            <v-cols-item-task
                    v-for="task in colData.tasks"
                    :key="task.id"
                    :task="task"
                    @confirmTask="confirmTask"
            ></v-cols-item-task>
        </draggable>
    </div>
</template>

<script>
    import vColsItemTask from './v-cols-item-task';
    import {mapActions} from 'vuex';
    import draggable from 'vuedraggable';

    export default {
        name: "v-cols-item",
        components: {
            vColsItemTask,
            draggable

        },
        props: {
            colData: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            ...mapActions([
                'CONFIRM_TASK'
            ]),
            confirmTask(task) {
                this.CONFIRM_TASK({
                    col: this.colData,
                    task: task
                })
            }
        },

    }
</script>

<style lang="scss" scoped>
    ::-webkit-scrollbar {
        width: 13px;

    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 10px 10px #F3F3F3;
        border: solid 3px transparent;
        border-radius: 20px;

    }

    ::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 10px 10px #E0E0E0;
        border: solid 3px transparent;
        border-radius: 20px;
    }


    .draggable_area {
        width: 100%;
        height: 100%;
    }

    .v-cols-item {
        padding: $padding*3 $padding;
        border: 1px solid #ccc;
        border-radius: $border-radius;
        height: 65vh;
        width: 30%;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: overlay;

        &__title {
            font-size: 22px;
            font-weight: 700;
        }
    }

    .v-cols-item:nth-child(1) {
        background-color: #C0E2FF;
        color: #013773;
        border: 1px solid darken(#C0E2FF, 20%);
    }

    .v-cols-item:nth-child(2) {
        background-color: #FFF2C8;
        color: #7A5A1A;
        border: 1px solid darken(#FFF2C8, 20%);
    }

    .v-cols-item:nth-child(3) {
        background-color: #CDE8D8;
        color: #12482E;
        border: 1px solid darken(#CDE8D8, 20%);
    }
</style>