<template>
    <div>
      <div v-for="appointment in appointments">
        <span>{{appointment.patient.fio}}</span>--
        <span>{{appointment.doctor.fio}}</span>--
        <span>{{appointment.date}}</span>
        <nuxt-link :to="`appointment-details/${appointment.id}`">Смотреть талон</nuxt-link>
      </div>
      <nuxt-link to="new-appointment">Новая запись</nuxt-link>
    </div>
</template>

<script>
    export default {
      layout: "default",
      async asyncData({ $axios }) {
        // получаем данные
        const data = await $axios.$get("http://localhost:8000/get-appointments");

        return {
          appointments: data.appointments
        };
      }
    }
</script>

<style scoped>
.boxWithAppointment{
  height: 700px;

  background: #ffffff;
  border-radius: 4px;
  padding-top: 32px;
  padding-left: 16px;

  /*  */
  display: flex;
  flex-direction: column;
}
.boxWithItem{
  display: flex;
  width: 1000px;
  min-height: 65px;

  background: #efefef;
  border-radius: 2px;
  margin-bottom: 20px;
  margin-right: 335px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;

  color: #000000;
  /* padding-left: 20px;
  padding-top: 9px;
  padding-bottom: 8px; */
  padding: 9px 15px 8px 20px;

  text-decoration: none;
}
</style>
