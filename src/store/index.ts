import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("index", () => {
  const token=ref("");

  return {
    token
  };
})