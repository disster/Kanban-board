<template>
    <div class="v-cols">
        <v-cols-item
                v-for="col in COLS"
                :key="col.title"
                :col-data="col"

        ></v-cols-item>
    </div>
</template>

<script>
    import vColsItem from '../col/v-cols-item';
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "v-cols",
        data() {
            return {}
        },
        components: {vColsItem},
        methods: {
            ...mapActions([
                'GET_COLS_FROM_API'
            ]),
        },
        computed: {
            ...mapGetters([
                'COLS'
            ])
        },
        mounted() {
            this.GET_COLS_FROM_API();
        }

    }
</script>

<style lang="scss" scoped>
    .v-cols {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
    }
</style>