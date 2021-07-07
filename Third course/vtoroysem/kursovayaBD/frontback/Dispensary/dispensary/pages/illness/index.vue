<template>
  <div>
    <div class="boxWithIllness">
      <div v-for="illness in illnesses" :key="illness.id">
        <div>
          <Illness
            class="boxWithItem"
            :id="illness.id"
            :name="illness.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Illness from "@/components/Illness";
export default {

  layout: "default",
  components: {
    Illness
  },
  async asyncData({ $axios }) {
    // получаем данные
    const data = await $axios.$get("http://localhost:8000/get-illnesses");
    return {
      illnesses: data.illnesses,
    };
  },

};
</script>

<style scoped>
.boxWithIllness {
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
</style>
