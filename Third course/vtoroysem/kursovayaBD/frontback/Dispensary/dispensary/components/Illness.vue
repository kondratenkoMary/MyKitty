<template>
    <div class="Illness">
        <div class="illnessName" v-text="name"></div>
        <nuxt-link :to="`illness/${id}`">Детальная страница</nuxt-link>
<!--      :to="'/illness-page/${id}'"-->
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }

    }
</script>

<style scoped>
.Illness {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;
}
</style>
