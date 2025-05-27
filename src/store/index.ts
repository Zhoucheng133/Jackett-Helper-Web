import { defineStore } from "pinia";
import { ref } from "vue";

export interface IndexerItem{
  id: string,
  url: string,
}

export default defineStore("index", () => {
  const token=ref("");

  const indexers=ref<IndexerItem[]>([]);

  return {
    token,
    indexers,
  };
})