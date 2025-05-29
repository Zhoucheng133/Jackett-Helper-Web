<template>
  <Dialog v-model:visible="visible" modal header="配置 Aria" style="width: 25rem; user-select: none;" :draggable="false">
    <div class="flex items-center gap-4 mb-4">
      <label for="url" class="font-semibold w-24">URL地址</label>
      <InputText id="url" class="flex-auto" autocomplete="off" size="small" v-model="url" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="key" class="font-semibold w-24">密钥</label>
      <InputText id="key" class="flex-auto" autocomplete="off" size="small" v-model="key" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="取消" severity="secondary" @click="visible = false" size="small"></Button>
      <Button type="button" label="完成" @click="setHandler" size="small"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, InputText, Button, useToast } from 'primevue';
import store from '../store';
import axios from 'axios';
import { hostname } from '../env/static';
const toast = useToast();

const url=ref("");
const key=ref("");
const visible=ref(false);

const showAriaConfig=()=>{
  visible.value=true;
  url.value=store().ariaConfig.url;
  key.value=store().ariaConfig.secret;
}

const setHandler=async ()=>{
  if(url.value.length==0){
    toast.add({ severity: 'error', summary: '添加失败', detail: "URL地址不能为空", life: 3000 });
  }else if(key.value.length==0){
    toast.add({ severity: 'error', summary: '添加失败', detail: "密钥不能为空", life: 3000 });
  }
  const {data: response}=await axios.post(`${hostname}/api/aria/config`, {
      url: url.value,
      secret: key.value,
    }, {
    headers: {
      token: store().token
    }
  });
  if(response.ok){
    toast.add({ severity: 'success', summary: '配置成功', detail: "现在可以通过Aria下载", life: 3000 });
    visible.value=false;
    store().ariaConfig={
      url: url.value,
      secret: key.value,
    }
  }else{
    toast.add({ severity: 'success', summary: '配置失败', detail: response.msg, life: 3000 });
  }
}

defineExpose({
  showAriaConfig
})

</script>