<template>
    <div class="v-cols-item-task">
        <v-modal-window
                v-if="isModalWindowVisible"
                @closeModalWindow="closeModalWindow"
                :task="task"
        ></v-modal-window>
        <p>Задача №{{task.id}}</p>
        <p class="v-cols-item-task__description">{{task.description}}</p>
        <p class="v-cols-item-task__date" v-if="task.beginDate != undefined">Дата и время начала: {{task.beginDate}}</p>
        <p class="v-cols-item-task__date" v-if="task.finishDate != undefined">Ушло времени: {{task.finishDate}}</p>
        <p class="v-cols-item-task__responsible"  v-if="task.responsible != undefined"> Ответственный {{task.responsible}}</p>
        <button
                class="v-cols-item-task__button button"
                @click="editTask"
        >
            <i class="material-icons v-cols-item-task__icon">edit</i>
        </button>
        <button
                class="v-cols-item-task__button button"
                @click="confirmTask"
        >
            <i class="material-icons v-cols-item-task__icon">{{task.iconName}}</i>
        </button>
    </div>
</template>

<script>
    import vModalWindow from '../v-modal-window'

    export default {
        name: "v-cols-item-task",
        components: {
            vModalWindow
        },
        data() {
            return {
                isModalWindowVisible: false
            }
        },
        props: {
            task: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            confirmTask() {
                this.$emit('confirmTask', this.task);
            },
            editTask() {
                this.isModalWindowVisible = true;
            },
            closeModalWindow() {
                this.isModalWindowVisible = false
            }

        }
    }
</script>

<style lang="scss" scoped>
    .v-cols-item-task {
        position: relative;
        margin-top: $margin*4;
        height: 200px;
        width: 90%;
        border-radius: $border-radius;
        padding: $padding*2;
        background-color: #fff;
        min-height: 200px;

        &__button {
            position: absolute;
            width: 30px;
            height: 30px;
            bottom: 15px;
            right: 50px;
            cursor: pointer;
        }

        &__button:last-child {
            right: 10px;
        }

        &__icon, {
            width: 100%;
            height: 100%;
            font-size: 35px;
        }

        &__description {
            /*height: 170px;*/

        }
    }

</style>