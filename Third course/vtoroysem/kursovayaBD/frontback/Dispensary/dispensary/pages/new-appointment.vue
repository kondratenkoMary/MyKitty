<template>
  <div>
    <div>
      <label for="doctorSelect">Выберите доктора</label>
      <select id="doctorSelect" v-model="doctorId">
          <option v-for="doctor in doctors" :value="doctor.id">{{ doctor.fio }}</option>
      </select>
    </div>
    <div>
      <label for="patientSelect">Выберите пациента</label>
      <select id="patientSelect" v-model="patientId">
          <option v-for="patient in patients" :value="patient.id">{{ patient.fio }}</option>
      </select>
    </div>
    <div>
      <label for="dateInput">Введите дату</label>
      <input name="date" id="dateInput" v-model="date">
    </div>
    <button @click="sendForm">Сохранить</button>
  </div>
</template>

<script>
export default {
  async asyncData({$axios}) {
    const resDoctors = await $axios.$get('http://localhost:8000/get-doctors');
    const resPatients = await $axios.$get('http://localhost:8000/get-patients');

    return {
      doctors: resDoctors.doctors,
      patients: resPatients.patients
    }
  },
  data() {
    return {
      doctorId: null,
      patientId: null,
      date: ''
    }
  },
  methods: {
    async sendForm() {
      await this.$axios.$post('http://localhost:8000/new-appointment/', {
        doctorId: this.doctorId,
        patientId: this.patientId,
        date: this.date
      })
    }
  }
}
</script>

<style scoped>

</style>
