<template>
    <div class="v-main-wrapper">
        <div class="container">
            <h1 class="v-main-wrapper__title">Canban</h1>
            <v-add-task></v-add-task>
            <v-cols></v-cols>
        </div>
    </div>
</template>

<script>
    import vAddTask from "./v-add-task"
    import vCols from "./col/v-cols"

    export default {
        name: "v-main-wrapper",
        components: {
            vCols,
            vAddTask
        }
    }
</script>

<style lang="scss" scoped>
    .v-main-wrapper {
        &__title {
            text-align: center;
            margin-top: 5vh;
            font-size: 40px;
        }
    }
</style>