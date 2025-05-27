<template>
  <TitleBar class="titlebar" />
  <div class="body">
    <div class="tool_bar">
      <ButtonGroup>
        <Button size="small" @click="addIndexer">添加索引</Button>
        <Button size="small" icon="pi pi-sliders-h" />
      </ButtonGroup>
    </div>
    <div class="add_info" v-if="store().indexers.length==0 && !loading">没有添加任何索引</div>
    <AddIndexer ref="addIndexerRef"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TitleBar from '../components/title_bar.vue';
import AddIndexer from '../components/add_indexer.vue';
import { Button, ButtonGroup } from 'primevue';
import store from '../store';

const loading=ref(true);
const addIndexerRef=ref();

onMounted(async ()=>{
  await store().getIndexers();
  loading.value=false;
})

const addIndexer=()=>{
  addIndexerRef.value.showAddIndexer();
}

</script>

<style scoped>
.add_info{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  color: lightgray;
  user-select: none;
}
.tool_bar{
  margin-top: 10px;
  display: flex;
}
.body{
  margin: auto;
  width: 1000px;
  padding-bottom: 50px;
}
.titlebar{
  top: 0;
  position: sticky;
}
</style>