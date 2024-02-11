import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'

interface ILogin {
    username: string,
    password: string
}
interface IUser extends ILogin{
    id: number
}

export const useCategoryStore = defineStore('category', () => {
    const filter = ref<Object | true>(true)
    const setFilter = (fil: Object) => {
        filter.value = fil
    }

    return{
        filter, setFilter
    }
})
