import { defineStore } from "pinia";
import { ref } from "vue";
import { hostname } from "../env/static";
import axios from "axios";
import { useToast } from "primevue";

export interface IndexerItem{
  name: string,
  id: string,
  url: string,
  key: string,
}

export interface HandlerItem{
  title: string,
  torrent: string,
  magnet: string,
  pubDate: string,
}

export interface AriaConfig{
  url: string,
  secret: string,
}

export default defineStore("index", () => {
  const token=ref("");
  const indexers=ref<IndexerItem[]>([]);
  const toast=useToast();

  const ariaConfig=ref<AriaConfig>({
    url: "",
    secret: ""
  });

  async function allFromId(id: string){
    const {data: response}=await axios.get(`${hostname}/api/handler/all/${id}`, {
      headers: {
        token: token.value
      }
    })
    return response;
  }

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

  async function getAriaConfig(){
    const {data: response}=await axios.get(`${hostname}/api/aria/get`, {
      headers: {
        token: token.value
      }
    })
    if(response.ok && response.msg!=null){
      ariaConfig.value={
        url: response.msg.url,
        secret: response.msg.secret,
      }
    }
  }

  async function delListId(id: string, toast: any){
    const {data: response}=await axios.delete(`${hostname}/api/list/del/${id}`, {
      headers: {
        token: token.value
      }
    })
    if(response.ok){
      toast.add({ severity: 'success', summary: '删除成功', detail: "正在刷新列表", life: 3000 });
      getIndexers();
    }else{
      toast.add({ severity: 'danger', summary: '删除失败', detail: response.msg, life: 3000 });
    }
  }

  async function download(url: string){
    const {data: response}=await axios.post(`${hostname}/api/aria/download`, {
      url: url
    }, {
      headers: {
        token: token.value
      }
    })
    if(response.ok){
      toast.add({ severity: 'success', summary: '下载成功', detail: "已经添加到Aria任务列表", life: 3000 });
      getIndexers();
    }else{
      toast.add({ severity: 'danger', summary: '下载失败', detail: response.msg, life: 3000 });
    } 
  }

  return {
    token,
    indexers,
    getIndexers,
    allFromId,
    getAriaConfig,
    ariaConfig,
    delListId,
    download
  };
})