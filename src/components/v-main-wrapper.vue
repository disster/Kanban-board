<template>
    <div class="v-main-wrapper">
        <div class="container">
            <h1>Canban</h1>
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

</style>