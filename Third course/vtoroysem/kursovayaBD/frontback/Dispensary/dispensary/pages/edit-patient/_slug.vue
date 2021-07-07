<template>
  <div>
      <h1>Редактирование пациента</h1>
      <div>
        <label for="fioInput">ФИО</label>
        <input id="fioInput" v-model="patient.fio"/>
      </div>
      <div>
        <label for="birthday">День рождения</label>
        <input id="birthday" v-model="patient.birthday"/>
      </div>
      <div>
        <label for="snilsInput">СНИЛС</label>
        <input id="snilsInput" v-model="patient.snils"/>
      </div>
      <div>
        <label for="doctor">Врач</label>
        <select id="doctor" v-model="patient.doctor.id">
          <option v-for="doctor in doctors" :value="doctor.id">{{doctor.fio}}</option>
        </select>
      </div>
      <div>
        <label for="illnesses">Болезни</label>
        <select multiple id="illnesses" v-model="patient.illness">
          <option v-for="illness in illnesses" :value="illness">{{illness.name}}</option>
        </select>
      </div>
      <button @click="save">Сохранить</button>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, route}) {
    const resDoctors = await $axios.$get('http://localhost:8000/get-doctors')
    const resPatient = await $axios.$get('http://localhost:8000/get-patient', {
      params: {
        id: route.params.slug
      }
    });

    const resIllnesses = await $axios.$get('http://localhost:8000/get-illnesses');

    return {
      patient: resPatient.patient,
      doctors: resDoctors.doctors,
      illnesses: resIllnesses.illnesses
    }
  },
  computed: {
    illnessesIds() {
      console.log(this.patient);
      return this.patient.illness.map(v => v.id);
    }
  },
  methods: {
    async save() {
      await this.$axios.$post('http://localhost:8000/edit-patient/', {
        id: this.patient.id,
        fio: this.patient.fio,
        snils: this.patient.snils,
        birthday: this.patient.birthday,
        doctorId: this.patient.doctor.id,
        illnesses: this.patient.illness.map(v => v.id)
      });

      this.$router.push(`/patient-page/${this.patient.id}`)
    }
  }
}
</script>

<style scoped>

</style>
