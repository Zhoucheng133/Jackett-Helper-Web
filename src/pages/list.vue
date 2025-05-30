<template>
  <TitleBar class="titlebar" />
  <div class="body">
    <div class="tool_bar">
      <Breadcrumb :home="home" />
      <div style="margin-left: auto;">
        <ButtonGroup>
          <Button size="small" @click="addIndexer">添加索引</Button>
          <Button size="small" icon="pi pi-sliders-h" @click="setAria" />
        </ButtonGroup>
      </div>
    </div>
    <div class="add_info" v-if="store().indexers.length==0 && !loading">没有添加任何索引</div>
    <div class="add_info" v-if="store().ariaConfig.url.length==0 && !loading">
      没有配置Aria，点击
      <i class="pi pi-sliders-h ml-2 mr-2"></i>
      进行配置
    </div>
    <DataTable :value="store().indexers" style="user-select: none;" v-if="store().indexers.length!=0">
      <Column field="name" header="名称"></Column>
      <Column header="操作" style="width: 180px;">
        <template #body="slotProps">
          <ButtonGroup>
            <Button size="small" severity="secondary" @click="toAll(slotProps.data)">全部</Button>
            <Button size="small" severity="secondary" icon="pi pi-search" @click="toSearch(slotProps.data)" />
            <Button size="small" severity="secondary" icon="pi pi-pen-to-square" @click="editHandler(slotProps.data.id, slotProps.data.name, slotProps.data.url, slotProps.data.key)" />
            <Button size="small" severity="secondary" icon="pi pi-trash" @click="delHandler($event, slotProps.data.id)" />
          </ButtonGroup>
        </template>
      </Column>
      <Column field="url" header="链接"></Column>
    </DataTable>
    <EditIndexer ref="editIndexerRef" />
    <AddIndexer ref="addIndexerRef"/>
    <AriaConfig ref="ariaConfigRef"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TitleBar from '../components/title_bar.vue';
import AddIndexer from '../components/add_indexer.vue';
import AriaConfig from '../components/aria_config.vue';
import EditIndexer from '../components/edit_indexer.vue';
import { Button, ButtonGroup, DataTable, Column, Breadcrumb, useConfirm } from 'primevue';
import store, { type IndexerItem } from '../store';
import { useRouter } from 'vue-router';
const router=useRouter();
const confirm = useConfirm();

const home = ref({
  icon: 'pi pi-home',
  route: '/list'
});

const loading=ref(true);
const addIndexerRef=ref();
const ariaConfigRef=ref();
const editIndexerRef=ref();

onMounted(async ()=>{
  await store().getIndexers();
  loading.value=false;
})

const delHandler=(event: any, id: string)=>{
  confirm.require({
    target: event.currentTarget,
    position: "bottomleft",
    message: '你确定要删除这个索引吗',
    rejectProps: {
      label: '取消',
      severity: 'secondary',
      outlined: true,
      size: "small"
    },
    acceptProps: {
      label: '删除',
      severity: "danger",
      size: "small"
    },
    accept: ()=>{
      store().delListId(id);
    },
    reject: () => {}
  });
}

const editHandler=(id: string, name: string, url: string, key: string)=>{
  editIndexerRef.value.showEdit(id, name, url, key);
}

const addIndexer=()=>{
  addIndexerRef.value.showAddIndexer();
}

const setAria=()=>{
  ariaConfigRef.value.showAriaConfig();
}

const toAll=(data: IndexerItem)=>{
  router.push(`/all/${data.id}`);
}

const toSearch=(data: IndexerItem)=>{
  router.push(`/search/${data.id}`);
}

</script>

<style scoped>
.add_info{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: orange;
  user-select: none;
}
.tool_bar{
  margin-top: 10px;
  display: flex;
  align-items: center;
  height: 56px;
}
</style>