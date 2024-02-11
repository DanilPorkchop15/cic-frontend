<script setup >
  import axios from "axios";
  import {onBeforeMount, onMounted, ref, watch} from "vue";
  import {useUserStore} from "@/stores/user.ts";
  import {useRouter} from "vue-router";

  const store = useUserStore();
  const router = useRouter();
  const getMarkers = async () => {
    try {
      const response = await axios.get("/api/markers");

      // Process the response data
      markersData.value = response.data
      return response.data
    } catch (error) {
      // Handle the error
      console.error("Error fetching data:", error.message);
    }
  }
  const getCategory = async () => {
    try {
      const response = await axios.get("/api/status");

      // Process the response data
      categoryData.value = response.data
      return response.data
    } catch (error) {
      // Handle the error
      console.error("Error fetching data:", error.message);
    }
  }

  const deleteMarkers = async (markersId) => {
    try{
      await axios.delete(`/api/markers/?id=${markersId}`, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
        }
      })
      markersData.value.push(1)
    } catch (error) {
      // Handle the error
      console.error("Error deleting data:", error.message);
    }
  }

  const updateRepair = async (isRepair, markersId) => {
    try{
      await axios.put(`/api/markers/repair/?id=${markersId}&repair=${isRepair}`, {},{
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
        }
      })
    } catch (error) {
      // Handle the error
      console.error("Error updating data:", error.message);
    }
  }

  const updateValidate = async (isRepair, markersId) => {
    try{
      await axios.put(`/api/markers/validate/?id=${markersId}&validate=${isRepair}`,{}, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
        }
      })
    } catch (error) {
      // Handle the error
      console.error("Error updating data:", error.message);
    }
  }
  const deleteCategory = async (categoryId) => {
    try{
      await axios.delete(`/api/status/?id=${categoryId}`, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
        }
      })
    } catch (error) {
      // Handle the error
      console.error("Error deleting data:", error.message);
    }
  }
  const categoryData = ref([])
  const categoryName = ref("")

  const addCategory = async (categoryName) => {
    try{
      await axios.post(`/api/status`, {name: categoryName}, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
        }
      })
      categoryData.value.push({name: categoryName, id:0})
    } catch (error) {
      // Handle the error
      console.error("Error posting data:", error.message);
    }
  }
  const markersData = ref([])
  onMounted(()=>{
    getMarkers().then((data)=>{
      markersData.value = data
    })
    getCategory().then((data) => {
      categoryData.value = data
    })
  })
  onBeforeMount(() => {
    if(!sessionStorage.getItem("jwt")){
      router.push('/login')
    }
  })

  watch(markersData, ()=>{
    getMarkers()
  })
  watch(categoryData, ()=>{
    getCategory()
  })
</script>

<template>
  <div class="admin-page__wrapper">
    <main class="admin-page">
      <h3 class="admin-page__title">Валидация меток</h3>
      <div class="markers-list">
        <div class="markers-list__item" v-for="(marker, index) in markersData" :key="marker.id">
          <div class="marker-item">
            <div class="item__content">
              <div class="item__info">
                <p class="item__description" v-if="marker.description">Описание: {{ marker.description }}</p>
                <p class="item__city" v-if="marker.city">Город: {{ marker.city }}</p>
                <div class="item__coords" v-if="marker.latitude && marker.longitude">
                  <p class="item__latitude">Широта: {{ marker.latitude }}</p>
                  <p class="item__longitude">Долгота: {{ marker.longitude }}</p>
                </div>
                <p class="item__description" v-if="marker.dateCreated">Дата создания: {{ marker.dateCreated.substring(0, 10) }}</p>
                <p class="item__description" v-if="marker.userCreatedId">Автор метки: {{ marker.userCreatedId }}</p>
              </div>
              <figure class="item__figure" v-if="marker.image">
                <img :src="`data:image/png;base64,${marker.image}`" :alt="marker.description" class="item__img">
              </figure>
              <div class="item__check"><label><input type="checkbox" name="isRepair" id="isRepair"
                                                     @change.stop="updateRepair(marker.isRepair, marker.id)"
                                                     v-model="marker.isRepair"> Ремонт идет</label>
                <label><input type="checkbox" name="isValidate" id="isValidate"
                              @change.stop="updateValidate(marker.isValidate, marker.id)"
                              v-model="marker.isValidate"> Валидно</label></div>
            </div>
              <button class="item__delete" @click="deleteMarkers(marker.id)">✕</button>
          </div>
        </div>
      </div>
    </main>
    <main class="admin-page">
      <h3 class="admin-page__title">Категории</h3>
      <div class="categories-list">
        <div class="categories-list__item" v-for="category in categoryData" :key="category.id" v-if="categoryData">
          <div class="category-item" >
            <button class="item__delete" @click="deleteCategory(category.id)">✕</button>

            <p>Название категории: {{category.name}}</p>
          </div>
        </div>
        <form action="" class="add-category" @submit.prevent="addCategory(categoryName)">
          <input type="text" name="newCategory" id="newCategory" class="add-category__name" placeholder="Введите название категории" v-model="categoryName" required/>
          <input type="submit" value="+" class="add-category__button"/>
        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>