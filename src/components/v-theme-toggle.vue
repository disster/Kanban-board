<template>
    <div class="v-theme-toggle">
        <label class="text">Темная тема</label>
        <input type="checkbox" class="toggle-button" v-model="isDarkTheme" @change="changeTheme()">
    </div>
</template>

<script>
    export default {
        name: "v-theme-toggle",
        data() {
            return {
                isDarkTheme: false
            }
        },
        methods: {
            changeTheme() {
                this.$emit('changeTheme', this.isDarkTheme);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-main-wrapper.dark_theme {
        .v-theme-toggle {
            color: #fff;
        }
    }

    .v-theme-toggle {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .toggle-button {
        position: relative;
        display: inline-block;
        width: 70px;
        height: 40px;
        margin: 0 0 0 15px;
        vertical-align: top;
        background: #ffffff;
        border: 1px solid #bbc1e1;
        border-radius: 30px;
        outline: none;
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);

        &::after {
            content: "";
            display: inline-block;
            position: absolute;
            left: 3px;
            top: 4px;
            width: 30px;
            height: 30px;
            background-color: #E04623;
            border-radius: 50%;
            transform: translateX(0);
            transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
        }

        &:checked::after {
            transform: translateX(calc(100% + 3px));
            background-color: #fff;
        }

        &:checked {
            background-color: #E04623;
        }
    }
</style>