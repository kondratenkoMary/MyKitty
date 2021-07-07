<template>
  <div>
    <div class="boxWithDoctors">
      <div v-for="doctor in doctors" :key="doctor.id">
        <div>
          <Doctor
            class="boxWithItem"
            :id="doctor.id"
            :fio="doctor.fio"
            :speciality="doctor.speciality"
            @on-delete-click="onDeleteClick"
          />
        </div>
      </div>
    </div>
    <button class="addButton"><nuxt-link to="add-doctor">add</nuxt-link></button>
  </div>
</template>

<script>
import Doctor from "@/components/Doctor";
export default {
  layout: "default",
  components: {
    Doctor
  },
  async asyncData({ $axios }) {
    // получаем данные
    const data = await $axios.$get("http://localhost:8000/get-doctors");
    const dataPatients = await $axios.$get(
      "http://localhost:8000/get-patients"
    );

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
    },
    async onDeleteClick(doctorId) {
      console.log(doctorId);
      await this.$axios.$post('http://localhost:8000/delete-doctor/', {
        id: doctorId
      });

      window.location.reload();
    }
  }
};
</script>

<style scoped>
.boxWithDoctors {
  height: 700px;

  background: #ffffff;
  border-radius: 4px;
  padding-top: 32px;
  padding-left: 16px;

  /*  */
  display: flex;
  flex-direction: column;
}

.boxWithItem {
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
.addButton {
  background: #755ada;
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
