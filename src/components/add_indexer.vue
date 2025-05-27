<template>
  <Dialog v-model:visible="visible" modal header="添加索引" style="width: 25rem; user-select: none;" :draggable="false">
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">名称</label>
      <InputText id="name" class="flex-auto" autocomplete="off" size="small" v-model="name" />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="url" class="font-semibold w-24">URL地址</label>
      <InputText id="url" class="flex-auto" autocomplete="off" size="small" v-model="url" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="key" class="font-semibold w-24">API Key</label>
      <InputText id="key" class="flex-auto" autocomplete="off" size="small" v-model="key" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="取消" severity="secondary" @click="visible = false" size="small"></Button>
      <Button type="button" label="添加" @click="addHandler" size="small"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, InputText, Button, useToast } from 'primevue';
import axios from 'axios';
import { hostname } from '../env/static';
import store from '../store';
const toast = useToast();

const name=ref("");
const url=ref("");
const key=ref("");

const visible=ref(false);

const showAddIndexer=()=>{
  visible.value=true;
}

const addHandler=async ()=>{
  if(name.value.length==0){
    toast.add({ severity: 'error', summary: '添加失败', detail: "名称不能为空", life: 3000 });
  }else if(url.value.length==0){
    toast.add({ severity: 'error', summary: '添加失败', detail: "URL地址不能为空", life: 3000 });
  }else if(key.value.length==0){
    toast.add({ severity: 'error', summary: '添加失败', detail: "API Key不能为空", life: 3000 });
  }
  const {data: response}=await axios.post(`${hostname}/api/list/add`, [
    {
      name: name.value,
      url: url.value,
      key: key.value,
    }
  ], {
    headers: {
      token: store().token
    }
  });
  if(response.ok){
    toast.add({ severity: 'success', summary: '添加成功', detail: "正在刷新列表", life: 3000 });
    store().getIndexers();
    visible.value=false;
  }else{
    toast.add({ severity: 'success', summary: '添加失败', detail: response.msg, life: 3000 });
  }
}


defineExpose({
  showAddIndexer
})

</script>