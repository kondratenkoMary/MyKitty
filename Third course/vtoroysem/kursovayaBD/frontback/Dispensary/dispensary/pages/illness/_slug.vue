<template>
  <div>
    <div>{{illness.name}}</div>
    <h2 v-if="doctors && doctors.length">Доктора, которые лечат его:</h2>
    <div v-for="doctor in doctors">{{doctor.fio}}</div>
    <h2 v-if="patients && patients.length">Пациенты с этим заболеванием:</h2>
    <div v-for="patient in patients">{{patient.fio}}</div>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, route}) {
    const res = await $axios.$get('http://localhost:8000/get-illness', {
      params: {
        id: route.params.slug
      }
    });

    return {
      illness: res.illness,
      patients: res.patients,
      doctors: res.doctors
    }
  },
}
</script>

<style scoped>

</style>
