<template>
    <div class="v-modal-window__bg">
        <div class="v-modal-window">
            <div class="v-modal-window__inner">
                <button
                        class="v-modal-window__close_button button"
                        @click="closeModalWindow"
                >
                    <i class="material-icons v-cols-item-task__icon">highlight_off</i>
                </button>
                <div class="v-modal-window__content">
                    <div class="v-modal-window__content__item">
                        <p>Описание</p>
                        <input
                                type="text"
                                placeholder="Введите описание"
                                v-model="editedTask.description"
                        >
                        <div class="v-modal-window__error">
                            {{errors.description}}
                        </div>
                    </div>
                    <div class="v-modal-window__content__item">
                        <p>Статус</p>
                        <select
                                name="status"
                                v-model="editedTask.status"
                                @change="changeStatus()"
                        >
                            <option value="План">План</option>
                            <option value="В работе">В работе</option>
                            <option value="Готово">Готово</option>
                        </select>
                        <div class="v-modal-window__error">
                        </div>
                    </div>
                    <div class="v-modal-window__content__item">
                        <p>Ответсвенный</p>
                        <input
                                type="text"
                                placeholder="Введите имя"
                                :disabled="isResponsibleDisabled"
                                v-model="editedTask.responsible"
                        >
                        <div class="v-modal-window__error">
                            {{errors.responsible}}
                        </div>
                    </div>
                    <div class="v-modal-window__content__item">
                        <p>Дата и время начала</p>
                        <date-picker
                                type="datetime"
                                format="DD.MM.YYYY HH:mm:ss"
                                v-model="editedTask.beginDate"
                                :disabled="isBeginDateDisabled"
                                :confirm="true"
                                placeholder="Введите дату и время начала"
                                :editable="false"
                                :default-value="defaultDate"
                        >

                        </date-picker>
                        <div class="v-modal-window__error">
                            {{errors.beginDate}}
                        </div>
                    </div>
                    <div class="v-modal-window__content__item">
                        <p>Дата и время завершения</p>
                        <date-picker
                                type="datetime"
                                format="DD.MM.YYYY HH:mm:ss"
                                v-model="editedTask.finishDate"
                                :disabled="isFinishDateDisabled"
                                :confirm="true"
                                placeholder="Введите дату и время конца"
                                :editable="false"
                                :default-value="defaultDate"
                        >
                        </date-picker>
                        <div class="v-modal-window__error">
                            {{errors.finishDate}}
                        </div>
                    </div>
                    <div class="v-modal-window__content__item">
                        <button
                                class="v-modal-window__confirm_button button"
                                @click="confirmChanges"
                        ><i class="material-icons">check</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import datePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';

    export default {
        name: "v-modal-window",
        components: {
            datePicker
        },
        data() {
            return {
                editedTask: {
                    id: this.task.id,
                    iconName: this.task.iconName,
                    description: this.task.description,
                    status: this.task.status,
                    responsible: this.task.responsible,
                    beginDate: this.task.beginDate,
                    finishDate: this.task.finishDate
                },
                errors: {
                    description: "",
                    responsible: "",
                    beginDate: "",
                    finishDate: ""
                }
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
            ...mapActions(['CHANGE_TASK']),
            closeModalWindow() {
                this.$emit('closeModalWindow')
            },
            confirmChanges() {
                this.validateData();
                if (this.isDataValid()) {
                    this.CHANGE_TASK(this.editedTask);
                    this.closeModalWindow();
                }
            },
            isDataValid() {
                for (let key in this.errors) {
                    if (this.errors[key] != '') {
                        return false;
                    }
                }
                return true;
            },
            isInputEmpty(inputData) {
                if (inputData != "" && inputData != undefined) {
                    return "";
                }
                return "Поле обязательно для заполнения";
            },
            validateData() {
                this.errors.description = this.isInputEmpty(this.editedTask.description);
                if (this.task.status == 'В работе' && this.editedTask.status == 'В работе') {
                    this.errors.responsible = this.isInputEmpty(this.editedTask.responsible);
                    this.errors.beginDate = this.isInputEmpty(this.editedTask.beginDate);
                } else if (this.task.status == 'В работе' && this.editedTask.status == 'Готово') {
                    this.errors.responsible = this.isInputEmpty(this.editedTask.responsible);
                    this.errors.beginDate = this.isInputEmpty(this.editedTask.beginDate);
                    this.errors.finishDate = this.isInputEmpty(this.editedTask.finishDate);
                } else if (this.task.status == 'Готово' && this.editedTask.status == 'В работе') {
                    this.errors.responsible = this.isInputEmpty(this.editedTask.responsible);
                    this.errors.beginDate = this.isInputEmpty(this.editedTask.beginDate);
                } else if (this.task.status == 'Готово' && this.editedTask.status == 'Готово') {
                    this.errors.responsible = this.isInputEmpty(this.editedTask.responsible);
                    this.errors.beginDate = this.isInputEmpty(this.editedTask.beginDate);
                    this.errors.finishDate = this.isInputEmpty(this.editedTask.finishDate);
                } else if (this.task.status == 'План' && this.editedTask.status == 'В работе') {
                    this.errors.responsible = this.isInputEmpty(this.editedTask.responsible);
                    this.errors.beginDate = this.isInputEmpty(this.editedTask.beginDate);
                } else if (this.task.status == 'План' && this.editedTask.status == 'Готово') {
                    this.errors.responsible = this.isInputEmpty(this.editedTask.responsible);
                    this.errors.beginDate = this.isInputEmpty(this.editedTask.beginDate);
                    this.errors.finishDate = this.isInputEmpty(this.editedTask.finishDate);
                }
            },
            changeStatus() {
                if (this.editedTask.status == 'В работе') {
                    if (this.editedTask.beginDate === undefined){
                        this.editedTask.beginDate = new Date();
                    }
                    this.editedTask.finishDate = undefined;
                } else if (this.editedTask.status == 'Готово') {
                    if (this.editedTask.beginDate === undefined){
                        this.editedTask.beginDate = new Date();
                    }
                    if (this.editedTask.finishDate === undefined){
                        this.editedTask.finishDate = new Date();
                    }
                } else  {
                    this.editedTask.beginDate = undefined;
                    this.editedTask.finishDate = undefined;
                    this.editedTask.responsible = undefined;
                }
            }
        },
        computed: {
            isBeginDateDisabled() {
                if (this.editedTask.status == 'План') {
                    return true;
                }
                return false;
            },
            isFinishDateDisabled() {
                if (this.editedTask.status == 'Готово') {
                    return false;
                }
                return true;
            },
            isResponsibleDisabled() {
                if (this.editedTask.status == 'План') {
                    return true;
                }
                return false;
            },
            defaultDate() {
                let date = new Date();
                date.setSeconds(0);
                return date;
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>

    .v-modal-window {
        z-index: 0;
        height: 70vh;
        width: 35vw;
        min-height: 500px;
        min-width: 400px;
        background-color: #00AA77;
        position: fixed;
        left: calc(50% - 17.5vw);
        top: calc(50% - 35vh);
        color: #fff;

        &__bg {
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            position: fixed;
            left: 0;
            top: 0;
            z-index: 100;
        }

        &__content {
            width: 70%;

            &__item {
                width: 100%;
                margin-top: 10px;
                text-align: left;

                input, select {
                    width: 100%;
                    padding: 10px;
                    margin-top: 7px;
                    border: none;
                }

                input[disabled="disabled"] {
                    background-color: #3DB494;
                }

                p {
                    font-size: 20px;
                }
            }
        }

        &__inner {
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        &__close_button {
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;

            i {
                font-size: 50px;
            }
        }

        &__confirm_button {
            background-color: #FF9A2E;
            width: 100%;
            cursor: pointer;
            color: #fff;
            transition: all .3s linear;

            i {
                font-size: 40px;
            }

            &:hover {
                transform: scale(1.1);
            }

        }

        &__error {
            height: 15px;
            color: #8D0505;
            font-size: 15px;
            margin-top: 3px;
        }
    }


</style>
<style>
    .mx-datepicker {
        width: 100%;
        margin-top: 7px;
    }

    .mx-input[disabled="disabled"] {
        background-color: #3DB494;
        cursor: default;
    }

    .mx-input {
        height: 35px !important;
        border: none;
    }
</style>