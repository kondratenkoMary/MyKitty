<template>
  <div>
    <form>
      <div>
        <label for="doctorFIO">ФИО Доктора</label>
        <input id="doctorFIO" v-model="doctor.fio"/>
      </div>
      <div>
        <label for="doctorRoom">Кабинет доктора</label>
        <input id="doctorRoom" v-model="doctor.roomNumber"/>
      </div>
      <div>
        <label for="speciality">Специальность</label>
        <select id="speciality" v-model="doctor.speciality.id">
          <option v-for="speciality in specialities" :value="speciality.id">{{speciality.name}}</option>
        </select>
      </div>
      <button type="button" @click="onFormSubmit">Сохранить</button>
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
      specialities: specialities.data.specialities
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
