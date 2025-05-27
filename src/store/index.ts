import { defineStore } from "pinia";
import { ref } from "vue";
import { hostname } from "../env/static";
import axios from "axios";

export interface IndexerItem{
  name: string,
  id: string,
  url: string,
  key: string,
}

export default defineStore("index", () => {
  const token=ref("");
  const indexers=ref<IndexerItem[]>([]);

  async function getIndexers(){
    const {data: response}=await axios.get(`${hostname}/api/list/get`, {
      headers: {
        token: token.value
      }
    })
    if(response.ok){
      indexers.value=response.msg;
    }
  }

  return {
    token,
    indexers,
    getIndexers
  };
})