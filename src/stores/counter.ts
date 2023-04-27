import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  persist: {
    storage: localStorage,
  },
  state:()=>({
   
  }),
  actions:{
   
  }
})
