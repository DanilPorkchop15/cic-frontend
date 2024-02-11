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
            <p class="item__description" v-if="marker.description">Описание: {{ marker.description }}</p>
            <p class="item__city" v-if="marker.city">Город: {{ marker.city }}</p>
            <div class="item__coords" v-if="marker.latitude && marker.longitude">
              <p class="item__latitude">Ширита: {{ marker.latitude }}</p>
              <p class="item__longitude">Долгота: {{ marker.longitude }}</p>
            </div>
            <figure class="item__figure" v-if="marker.image">
              <img :src="marker.image" :alt="marker.description" class="item__img">
            </figure>
            <button class="item__delete" @click="deleteMarkers(marker.id, index)">✕</button>
          </div>
        </div>
      </div>
    </main>
    <main class="admin-page">
      <h3 class="admin-page__title">Категории</h3>
      <div class="categories-list">
        <div class="categories-list__item" v-for="(category, index) in markersData" :key="category.id">
          <div class="category-item">

            <button class="item__delete" @click="deleteMarkers(category.id, index)">✕</button>
          </div>
        </div>
        <form action="" class="add-category" @submit.prevent="addCategory">
          <input type="text" name="newCategory" id="newCategory" class="add-category__name" placeholder="Введите название категории"/>
          <input type="submit" value="+" class="add-category__button"/>
        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>