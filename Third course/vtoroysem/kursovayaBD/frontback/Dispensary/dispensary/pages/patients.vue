<template>
  <div>
    <div v-for="patient in patients">
      <span>{{ patient.fio }}</span>
      <nuxt-link :to="`patient-page/${patient.id}`">Детальная страница</nuxt-link>
    </div>
    <nuxt-link to="add-patient">Добавить пациента</nuxt-link>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    // получаем данные
    const dataPatients = await $axios.$get(
      "http://localhost:8000/get-patients"
    );

    return {
      patients: dataPatients.patients
    };
  },
}
</script>

<style scoped>

</style>
