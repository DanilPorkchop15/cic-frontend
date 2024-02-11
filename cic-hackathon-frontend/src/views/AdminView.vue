<script setup >
  import axios from "axios";
  import {onBeforeMount, onMounted, ref} from "vue";
  import {useUserStore} from "@/stores/user.ts";
  import {useRouter} from "vue-router";

  const store = useUserStore();
  const router = useRouter();
  const getMarkers = async () => {
    try {
      const response = await axios.get("/api/markers");

      // Process the response data
      return response.data
    } catch (error) {
      // Handle the error
      console.error("Error fetching data:", error.message);
    }
  }

  const deleteMarkers = async (markersId, index) => {
    try{
      await axios.delete(`/api/markers/?id=${markersId}`, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
        }
      })
      markersData.value.splice(index, 1)
    } catch (error) {
      // Handle the error
      console.error("Error deleting data:", error.message);
    }
  }

  const markersData = ref([])
  onMounted(()=>{
    getMarkers().then((data)=>{
      markersData.value = data
    })
  })
  onBeforeMount(() => {
    if(!sessionStorage.getItem("jwt")){
      router.push('/login')
    }
  })
</script>

<template>
  <div class="admin-page__wrapper">
    <main class="admin-page">
      <h3 class="admin-page__title">Валидация меток</h3>
      <div class="markers-list">
        <div class="markers-list__item" v-for="(marker, index) in markersData" :key="marker.id">
          <div class="marker-item">
            <p class="item__description" v-if="marker.description">{{ marker.description }}</p>
            <p class="item__city" v-if="marker.city">{{ marker.city }}</p>
            <div class="item__coords" v-if="marker.latitude && marker.longitude">
              <p class="item__latitude">{{ marker.latitude }}</p>
              <p class="item__longitude">{{ marker.longitude }}</p>
            </div>
            <figure class="item__figure" v-if="marker.image">
              <img :src="marker.image" :alt="marker.description" class="item__img">
            </figure>
            <button class="item__delete" @click="deleteMarkers(marker.id, index)">✕</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>