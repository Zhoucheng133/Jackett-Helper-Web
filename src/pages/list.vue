<template>
  <TitleBar class="titlebar" />
  <div class="body">
    <div class="tool_bar">
      <ButtonGroup>
        <Button size="small" @click="addIndexer">添加索引</Button>
        <Button size="small" icon="pi pi-sliders-h" @click="setAria" />
      </ButtonGroup>
    </div>
    <div class="add_info" v-if="store().indexers.length==0 && !loading">没有添加任何索引</div>
    <DataTable :value="store().indexers" style="user-select: none;">
      <Column field="name" header="名称"></Column>
      <Column header="操作">
        <template #body="slotProps">
          <div style="width: 100px;">
            <ButtonGroup>
              <Button size="small" severity="secondary" @click="showAllDialog(slotProps.data)">全部</Button>
              <Button size="small" severity="secondary" icon="pi pi-search" />
            </ButtonGroup>
          </div>
        </template>
      </Column>
      <Column field="url" header="链接"></Column>
    </DataTable>

    <AddIndexer ref="addIndexerRef"/>
    <AriaConfig ref="ariaConfigRef"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TitleBar from '../components/title_bar.vue';
import AddIndexer from '../components/add_indexer.vue';
import AriaConfig from '../components/aria_config.vue';
import { Button, ButtonGroup, DataTable, Column } from 'primevue';
import store, { type IndexerItem } from '../store';

const loading=ref(true);
const addIndexerRef=ref();
const ariaConfigRef=ref();

onMounted(async ()=>{
  await store().getIndexers();
  loading.value=false;
})

const addIndexer=()=>{
  addIndexerRef.value.showAddIndexer();
}

const setAria=()=>{
  ariaConfigRef.value.showAriaConfig();
}

const showAllDialog=(data: IndexerItem)=>{
  // TODO
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
  margin: 0 auto;
  width: 1000px;
  padding-bottom: 50px;
}
@media screen and (max-width: 1040px) {
  .body{
    width: calc(100vw - 40px);
  }
}
.titlebar{
  top: 0;
  position: sticky;
}
</style>