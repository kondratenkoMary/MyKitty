<template>
  <div>
    <form>
      <div id="doctorFIO" v-text="doctor.fio">
      </div>
<!--      <label for="doctorFIO">ФИО Доктора</label>-->
      <div id="doctorRoom" v-text="doctor.roomNumber">
      </div>
<!--      <label for="doctorRoom">Кабинет доктора</label>-->
<!--      <select v-model="doctor.speciality.id">-->
<!--        <option v-for="speciality in specialities" :value="speciality.id">{{speciality.name}}</option>-->
<!--      </select>-->
      <div id="doctorSpeciality" v-text="doctor.speciality.name">
      </div>
      <div v-if="patients && patients.length">Кого курирует:</div>
      <div>
        <div v-for="patient in patients">{{patient.fio}}</div>
      </div>
<!--      <button type="button" @click="onFormSubmit">Сохранить</button>-->
    </form>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, route}) {
    const res = await $axios.get('http://localhost:8000/get-doctor', {
      params: {
        id: route.params.slug
      }
    });
    const specialities = await $axios.get('http://localhost:8000/get-specialities');

    return {
      doctor: res.data.doctor,
      specialities: specialities.data.specialities,
      patients: res.data.patients
    }
  },
  methods: {
    async onFormSubmit() {
      if (!this.doctor.fio || !this.doctor.roomNumber) {
        return;
      }
      console.log(this.doctor);

      const headers = {
        "Content-type": "application/json"
      }

      await this.$axios.$post('http://localhost:8000/edit-doctor/', {
        id: this.doctor.id,
        fio: this.doctor.fio,
        roomNumber: this.doctor.roomNumber,
        specialityId: this.doctor.speciality.id
      }, {headers});

      await this.$router.push('/doctors');
    }
  }
}
</script>

<style scoped>

</style>
