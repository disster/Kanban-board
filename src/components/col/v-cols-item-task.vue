<template>
    <div class="v-cols-item-task">
        <v-modal-window
                v-if="isModalWindowVisible"
                @closeModalWindow="closeModalWindow"
                :task="task"
        ></v-modal-window>
        <p>Задача №{{task.id}}</p>
        <div class="v-cols-item-task__content">
            <p class="v-cols-item-task__description">{{task.description}}</p>
            <p class="v-cols-item-task__date" v-if="isEmpty(task.beginDate)">Дата и время начала:
                {{formattingDate(task.beginDate)}}</p>
            <p class="v-cols-item-task__date" v-if="isEmpty(task.finishDate)">Ушло времени: {{spendTime()}}</p>
            <p class="v-cols-item-task__responsible" v-if="isEmpty(task.responsible)"> Ответственный:
                <span class="responsible">{{task.responsible}}</span></p>
        </div>
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
    import vModalWindow from '../v-modal-window';

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
            isEmpty(input) {
                return input != "" && input != undefined;
            },
            confirmTask() {
                this.$emit('confirmTask', this.task);
            },
            editTask() {
                this.isModalWindowVisible = true;
            },
            closeModalWindow() {
                this.isModalWindowVisible = false
            },

            formattingDate(date) {
                let day = date.getDate();
                if (day < 10) {
                    day = '0' + day
                }
                let month = date.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month
                }
                let year = date.getFullYear();
                if (year < 10) {
                    year = '0' + year
                }
                let hours = date.getHours();
                if (hours < 10) {
                    hours = '0' + hours
                }
                let minutes = date.getMinutes();
                if (minutes < 10) {
                    minutes = '0' + minutes
                }
                let seconds = date.getSeconds();
                if (seconds < 10) {
                    seconds = '0' + seconds
                }
                return day + '.' + month + '.' + year + " " + hours + ":" + minutes + ":" + seconds;
            },
            spendTime() {
                let milliseconds = this.task.finishDate - this.task.beginDate;
                let sec = Math.round(milliseconds / 1000);
                let min = sec / 60;
                let hour = min / 60;
                let time = 'Дней: ' + Math.floor(hour / 24) +
                    ', часов: ' + Math.floor(hour % 24) +
                    ', минут: ' + Math.floor(min % 60) +
                    ', секунд: ' + Math.floor(sec % 60);
                return time;
            }
        }
    }


</script>

<style lang="scss" scoped>
    .responsible {
        font-weight: 700;
    }

    .v-cols-item-task {
        position: relative;
        margin: $margin*4 auto 0;
        height: 200px;
        width: 95%;
        border-radius: $border-radius;
        padding: $padding*2;
        background-color: #fff;
        min-height: 250px;

        &__content p {
            margin-top: 10px;
            text-align: left;
        }

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