<template>
    <div class="v-main-wrapper" :class="{dark_theme: isDarkTheme}">
        <div class="container">
            <v-theme-toggle @changeTheme="changeTheme"></v-theme-toggle>
            <h1 class="v-main-wrapper__title">Kanban Board</h1>
            <v-add-task></v-add-task>
            <v-cols></v-cols>
        </div>
    </div>
    <footer>
        <a href=""></a>
    </footer>
</template>

<script>
    import vAddTask from "./v-add-task";
    import vCols from "./col/v-cols";
    import vThemeToggle from './v-theme-toggle';

    export default {
        name: "v-main-wrapper",
        components: {
            vCols,
            vAddTask,
            vThemeToggle,
        },
        data() {
            return {
                isDarkTheme: false,
            }
        },
        methods: {
            changeTheme(isDarkTheme) {
                this.isDarkTheme = isDarkTheme;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-main-wrapper {
        height: 100vh;
        padding-top: 30px;
        &__title {
            text-align: center;
            margin-top: 1vh;
            font-size: 40px;
        }
        &.dark_theme{
            background-color: $dark-theme;
            .v-main-wrapper__title{
                 color: #fff;
             }
        }
    }
</style>