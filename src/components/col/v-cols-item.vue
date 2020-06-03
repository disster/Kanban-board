<template>
    <div class="v-cols-item">
        <div class="v-cols-item__title">{{colData.title}} ({{colData.tasks.length}})</div>
        <v-cols-item-task
                v-for="task in colData.tasks"
                :key="task.name"
                :task="task"
        ></v-cols-item-task>
    </div>
</template>

<script>
    import vColsItemTask from './v-cols-item-task'

    export default {
        name: "v-cols-item",
        components: {
            vColsItemTask
        },
        props: {
            colData: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .v-cols-item {
        padding: $padding*3 $padding;
        border: 1px solid #ccc;
        border-radius: $border-radius;
        height: 70vh;
        width: 30%;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        &__title{
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