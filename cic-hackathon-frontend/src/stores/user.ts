import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import {useRouter} from "vue-router";

interface ILogin {
  username: string,
  password: string
}
interface IUser extends ILogin{
  id: number
}

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user: IUser = reactive({
    id: 0,
    username:"",
    password:""
  })


  const getUser = async () => {
    const response = await axios.get("/api/user")
    return response.data
  }

  const login = async (data: ILogin) => {
    const response = await axios.post("api/user/login", data)
    console.log(response)
    sessionStorage.setItem("jwt", response.data)
    await router.push('/admin')
  }

  return {
    getUser, login
  }
})
