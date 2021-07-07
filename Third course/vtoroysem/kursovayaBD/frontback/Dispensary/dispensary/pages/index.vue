<template>
  <div class="container">
    <div>
      <h1 class="title">
        {{ text }}
      </h1>
      <div v-text="text"></div>
      <div v-for="doctor in doctors" :key="doctor.id">
        <Doctor
          :fio="doctor.fio"
          :id="doctor.id"
          :speciality="doctor.speciality"
          :room-number="doctor.roomNumber"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Doctor from "@/components/Doctor";
export default {
  components: {
    Doctor
  },
  async asyncData({ $axios }) {
    // получаем данные
    const data = await $axios.$get("http://localhost:8000/get-doctors");
    const dataPatients = await $axios.$get("http://localhost:8000/get-patients");

    return {
      doctors: data.doctors,
      patients: dataPatients.patients
    };
  },
  mounted() {
    // console.log(this.doctors);
    console.log(this.patients);
  },
  data() {
    return {
      text: "hello world"
    };
  },
  methods: {
    doSmth() {
      console.log(this.text);
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
