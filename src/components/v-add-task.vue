<template>
    <div class="v-add-task">
        <p>Добавить задачу</p>
        <input v-model="description" type="text">
        <button @click="addTask">+</button>
    </div>
</template>

<script>
    import {mapActions} from  'vuex'
    export default {
        name: "v-add-task",
        data(){
            return{
                description: ""
            }
        },
        methods:{
            ...mapActions([
                'ADD_TASK'
            ]),
            addTask(){
                this.ADD_TASK(this.description)
            }
        }
    }
</script>

<style scoped>

</style>