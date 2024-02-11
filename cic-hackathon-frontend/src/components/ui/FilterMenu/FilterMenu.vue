<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import axios from "axios";
import {useCategoryStore} from "@/stores/category.ts";

const store = useCategoryStore();

const categoryData = ref([])
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

const filters = ref({
  date: true,
  type: true,
});

onMounted(() => {
  getCategory()
})

</script>

<template>
  <div class="filter-menu">
    <h3 class="filter-menu__header">Меню фильтрации</h3>
    <div class="filters">
<!--      <div class="filters__item">-->
<!--        <div class="filter__header" @click="filters.date = !filters.date">-->
<!--          <h4>Период данных</h4>-->
<!--          <span class="filter__toggle-icon">{{ filters.date ? '▼' : '►' }}</span>-->
<!--        </div>-->
<!--        <div class="filter__body" v-if="filters.date">-->
<!--          &lt;!&ndash; Здесь добавьте содержимое фильтра по дате &ndash;&gt;ччч-->
<!--        </div>-->
<!--      </div>-->
      <div class="filters__item">
        <div class="filter__header" @click="filters.type = !filters.type">
          <h4>Тип отметки</h4>
          <span class="filter__toggle-icon">{{ filters.type ? '▼' : '►' }}</span>
        </div>
        <div class="filter__body" v-if="filters.type">
          <div class=""v-if="categoryData">
            <label><input type="radio" checked name="category" id="filter__radio" class="filter__radio" @change="store.setFilter(true)">Показывать все</label>
          </div>
          <div class="" v-for="category in categoryData" :key="category.id" v-if="categoryData">
            <label><input type="radio"  name="category" id="filter__radio" class="filter__radio" @change="store.setFilter(category)">{{category.name}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-menu {
  width: 300px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  opacity: 90%;
  border-radius: 8px;
  position: fixed;
  left: 0;
  top: 4rem;
  margin-left: 36px;
  margin-top: 36px;
}

.filter-menu__header {
  margin-bottom: 16pt;
  font-size: 16pt;
  font-weight: bold;
}

.filters__item {
  margin-bottom: 6pt;
}

.filter__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #2D698E;
  cursor: pointer;
}

.filter__header h4 {
  margin: 0;
  font-size: 12pt;
}

.filter__toggle-icon {
  font-size: 8pt;
}

.filter__radio{
  margin: 6px;
}


</style>
