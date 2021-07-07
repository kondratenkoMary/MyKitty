<template>
    <div class="Doctor">
        <!-- <div v-text="id"></div> -->
        <nuxt-link class="doctorFIO" v-text="fio" :to="`/doctor-page/${id}`"></nuxt-link>
        <div class="doctorSpeciality" v-text="speciality.name"></div>
        <div v-text="roomNumber"></div>
        <div class="doctorActionButton">
            <nuxt-link :to="`/edit-doctor/${id}`">ред</nuxt-link>
            <div class="doctorDeleteButton" @click="onClick">удл</div>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: Number,
                required: true
            },
            fio: {
                type: String,
                required: true
            },
            speciality: {
                type: Object,
                required: true
            },
            roomNumber: {
                type: Number,
                required: true
            }
        },
        methods:{
            onClick(){
                this.$emit('on-delete-click', this.id);
            }
        }
    }
</script>

<style scoped>
.Doctor {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;
}
.doctorFIO{
    flex: 0 0 50%;
}
.doctorSpeciality{
    display: flex;
    flex: 0 0 30%;
    justify-content: flex-end;
}
.doctorActionButton{
    display: flex;
    flex: auto;
    margin-left: auto;
    width: fit-content;
    justify-content: flex-end;
}
.doctorDeleteButton{
    padding-left: 10px;
}
</style>
