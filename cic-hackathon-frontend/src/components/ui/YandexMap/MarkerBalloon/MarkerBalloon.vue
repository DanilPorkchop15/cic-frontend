<script setup lang="ts">

interface Props {
  marker: {
    id: number,
    description: string,
    city: string,
    image: string,
    dateCreated: string,
    userCreated: string,
    latitude: number,
    longitude: number
  }
}
defineProps<Props>()
</script>

<template>
  <div class="balloon">
    <div class="balloon-header">
      <h3>{{ marker.description }}</h3>
    </div>
    <figure v-if="marker.image">
      <img :src="marker.image" alt="">
    </figure>
    <div class="balloon-content">
      <p v-if="marker.userCreated">Выложено пользователем {{ marker.userCreatedId }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>