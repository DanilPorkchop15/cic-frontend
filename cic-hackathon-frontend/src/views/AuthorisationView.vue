<script setup >

import {onBeforeMount, reactive} from "vue";
import { useUserStore } from "@/stores/user";
import {useRouter} from "vue-router";

const router = useRouter();
const store = useUserStore();

const user = reactive({
  username: '',
  password: '',
});

onBeforeMount(() => {
  if(sessionStorage.getItem("jwt")){
    router.push('/admin')
  }
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
.authorisation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-wrapper {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px; /* Adjust the width as needed */
}

.authorisation__form {
  display: flex;
  flex-direction: column;
}

.authorisation__title {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="submit"] {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

input[type="submit"]:hover {
  background-color: #0056b3;
}
</style>