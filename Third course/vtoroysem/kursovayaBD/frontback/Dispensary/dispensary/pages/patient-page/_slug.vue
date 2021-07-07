<template>
  <div>
    <h1>Детальная страница пациента</h1>
    <div>{{patient.fio}}</div>
    <nuxt-link :to="`/edit-patient/${patient.id}`">Редактировать</nuxt-link>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, route}) {
    const res = await $axios.$get('http://localhost:8000/get-patient', {
      params: {
        id: route.params.slug
      }
    })

    return {
      patient: res.patient
    }
  }
}
</script>

<style scoped>

</style>
