<script setup >

import {reactive} from "vue";
import { useUserStore } from "@/stores/user";

const store = useUserStore()

const user = reactive({
  username: "",
  password: ""
})

</script>

<template>
  <div class="authorisation">
    <div class="form-wrapper">
      <form @submit.prevent="store.login(user)" class="authorisation__form">
        <h3 class="authorisation__title">Авторизация</h3>
        <input type="text" placeholder="Введите логин" v-model="user.username" required>
        <input type="password" placeholder="Введите пароль" v-model="user.password" required>
        <input type="submit" value="Войти">
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>