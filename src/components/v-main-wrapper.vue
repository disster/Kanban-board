<template>
    <div class="v-main-wrapper" :class="{dark_theme: isDarkTheme}">
        <div class="container">
            <v-theme-toggle @changeTheme="changeTheme"></v-theme-toggle>
            <h1 class="v-main-wrapper__title">Kanban Board</h1>
            <v-add-task></v-add-task>
            <v-cols></v-cols>
        </div>
        <footer>
            <a href="https://github.com/disster/Kanban-board">Ссылка на github проекта</a>,
            Толпаров Пётр, 191-321
        </footer>
    </div>
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

        &.dark_theme {
            background-color: $dark-theme;

            .v-main-wrapper__title {
                color: #fff;
            }
        }
    }

    footer {
        background-color: #58555c;
        color: #fff;
        text-align: center;
        height: 40px;
        line-height: 40px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;

        a {
            color: #268afd;
            text-decoration: underline;
        }
    }
</style>