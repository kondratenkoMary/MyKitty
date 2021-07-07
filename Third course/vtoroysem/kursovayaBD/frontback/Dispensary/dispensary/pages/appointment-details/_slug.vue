<template>
  <div>
    <h1>Талон</h1>
    <div>
      Пациент: {{ appointment.patient.fio }}
    </div>
    <div>
      Доктор: {{ appointment.doctor.fio }}
    </div>
    <div>
      Дата: {{ appointment.date }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    // получаем данные
    const data = await $axios.$get("http://localhost:8000/appointment-details", {
      params: {
        appointmentId: route.params.slug
      }
    });

    return {
      appointment: data.appointment
    };
  }
}
</script>

<style scoped>

</style>
