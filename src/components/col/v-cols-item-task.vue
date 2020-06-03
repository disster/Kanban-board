<template>
    <div class="v-cols-item-task">
        <p>{{task.name}}</p>
        <p>{{task.description}}</p>
        <img class="v-cols-item-task__icon" :src="require('../../assets/images/edit.png')" alt="">
        <img class="v-cols-item-task__icon" :src="require('../../assets/images/confirm.png')" alt="">

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

        &__icon {
            position: absolute;
            width: 30px;
            height: 30px;
            bottom: 10px;
            right: 50px;
        }
        &__icon:last-child {
            right: 10px;
        }

    }

</style>