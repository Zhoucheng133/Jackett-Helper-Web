<template>
  <router-view></router-view>
  <Toast />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import { onMounted, ref } from 'vue';
import { hostname } from './env/static';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue';
import store from './store';

const router=useRouter();
const loading=ref(true);
const toast=useToast();

onMounted(async ()=>{
  const {data: response}=await axios.get(`${hostname}/api/init`);
  if(response.msg){
    loading.value=false;
    router.replace("/register")
  }else{
    const token=localStorage.getItem("token");
    if(token==null){
      loading.value=false;
      router.replace("/login")
    }else{
      const {data: response}=await axios.get(`${hostname}/api/auth`, {
        headers: {
          token,
        }
      });
      loading.value=false;
      if(response.ok){
        store().token=token;
      }else{
        toast.add({ severity: 'error', summary: '身份验证失败', detail: '令牌过期或无效', life: 3000 });
        router.replace("/login")
      }
    }
  }
})
</script>