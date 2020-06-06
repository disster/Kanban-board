<template>
    <div class="v-add-task">
        <p>Добавить задачу</p>
        <div class="v-add-task__content">
            <input
                    class="v-add-task__input"
                    v-model="description"
                    placeholder="Описание задачи"
                    type="text">
            <button class="v-add-task__button" @click="addTask">+</button>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "v-add-task",
        data() {
            return {
                description: ""
            }
        },
        methods: {
            ...mapActions([
                'ADD_TASK'
            ]),
            addTask() {
                this.ADD_TASK(this.description)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-add-task {
        margin-top: 5vh;

        &__content {
            border: 1px solid #E04623;
            display: inline-flex;
            width: 60%;
            justify-content: space-between;
            margin-top: 10px;
        }

        &__button {
            background-color: #E04623;
            color: #fff;
            font-size: 40px;
            width: 60px;
            cursor: pointer;

        }

        &__input {
            width: 100%;
            padding: 20px 10px;
            border: none;
            font-size: 17px;

        }
    }
</style>