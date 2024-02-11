import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import {useRouter} from "vue-router";

interface IUser {
  username: string,
  password: string
}

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user: IUser = reactive({
    username:"",
    password:""
  })

  const getUser = async () => {
    const response = await axios.get("/api/user", {
      withCredentials: true
    })
    return response.data
  }

  const login = async (data: IUser) => {
    const response = await axios.post("api/user/login", data, {
      withCredentials: true
    })
    sessionStorage.setItem("jwt", response.data)
    await router.push('/admin')
  }

  return {
    getUser, login
  }
})
