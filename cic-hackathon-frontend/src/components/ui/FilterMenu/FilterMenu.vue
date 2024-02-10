<template>
  <div class="filter-menu">
    <h3 class="filter-menu__header">Меню фильтрации</h3>
    <div class="filters">
      <div class="filters__item">
        <div class="filter__header" @click="toggleFilter('date')">
          <h4>Период данных</h4>
          <span class="filter__toggle-icon">{{ filters.date ? '▼' : '►' }}</span>
        </div>
        <div class="filter__body" v-show="filters.date">
          <!-- Здесь добавьте содержимое фильтра по дате -->ччч
        </div>
      </div>
      <div class="filters__item">
        <div class="filter__header" @click="toggleFilter('type')">
          <h4>Тип отметки</h4>
          <span class="filter__toggle-icon">{{ filters.type ? '▼' : '►' }}</span>
        </div>
        <div class="filter__body" v-show="filters.type">
          <!-- Здесь добавьте содержимое фильтра по типу отметки -->ччч
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const filters = ref({
  date: true,
  type: true,
});

const toggleFilter = (filter: unknown) => {
  filters.value[filter] = !filters.value[filter];
};
</script>

<style scoped>
.filter-menu {
  width: 200px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: fixed;
  left: 0;
  top: 4rem;

}

.filter-menu__header {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.filters__item {
  margin-bottom: 15px;
}

.filter__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.filter__header h4 {
  margin: 0;
}

.filter__toggle-icon {
  font-size: 14px;
}

.filter__body {
  display: none;
}

.filter__body.show {
  display: block;
}
</style>
