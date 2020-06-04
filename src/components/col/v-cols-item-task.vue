<template>
    <div class="v-cols-item-task">
        <p>Задача №{{task.id}}</p>
        <p>{{task.description}}</p>
        <button  class="v-cols-item-task__button button">
            <img :src="require('../../assets/images/edit.png')" alt="">
        </button>
        <button @click="confirmTask" class="v-cols-item-task__button button">
            <img :src="require('../../assets/images/confirm.png')" alt="">
        </button>
    </div>
</template>

<script>


    export default {
        name: "v-cols-item-task",
        components: {},
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-cols-item-task {
        position: relative;
        margin-top: $margin*4;
        height: 18vh;
        width: 90%;
        border-radius: $border-radius;
        padding: $padding*2;
        background-color: #fff;

        &__button {
            position: absolute;
            width: 30px;
            height: 30px;
            bottom: 10px;
            right: 50px;
            cursor: pointer;
        }
        &__button:last-child {
            right: 10px;
        }
        &__button img {
            width: 100%;
            height: 100%;
        }

    }

</style>