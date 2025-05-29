<template>
  <TitleBar class="titlebar" />
  <div class="body">
    <div class="tool_bar">
      <Breadcrumb :home="home" :model="items">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']" />
              <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
    </div>
    <DataTable :value="list" size="small" stripedRows>
      <Column field="title" header="标题">
        <template #body="slotProps">
          <div class="title_area">
            <div class="title text-sm">
              {{ slotProps.data.title }}
            </div>
            <div class="info_area">
              <div class="date select-none text-gray-400 text-xs">
                {{ dayjs(slotProps.data.time).format("YYYY-MM-DD HH:mm") }}
              </div>
              <div class="size select-none text-gray-400 text-xs ml-8">
                {{ store().formatBytes(slotProps.data.size) }}
              </div>
            </div>
          </div>
        </template>
      </Column>
      <Column header="操作" style="min-width: 150px;">
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import TitleBar from '../components/title_bar.vue';
import { Breadcrumb, useToast, DataTable, Column } from 'primevue';
import { onMounted, ref } from 'vue';
import type { HandlerItem } from '../store';
import dayjs from 'dayjs';
import store from '../store';
const toast = useToast();
const route=useRoute();
const query=ref(route.params)
const id=query.value.id as string;

const list=ref<HandlerItem[]>([]);

const name=ref("");

onMounted(async ()=>{
  const response=await store().allFromId(id);
  if(response.ok){
    list.value=response.msg.data;
    name.value=response.msg.name;
    items.value=[{
      label: `全部: ${name.value}`
    }]
  }else{
    toast.add({ severity: 'error', summary: '获取失败', detail: response.msg, life: 3000 });
  }
})

const home = ref({
  icon: 'pi pi-home',
  route: '/list'
});
const items=ref([
  { label: "全部" },
])


</script>

<style scoped>
.info_area{
  display: flex;
}
.title{
  width: 800px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title_area{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.tool_bar{
  margin-top: 10px;
  display: flex;
  align-items: center;
  user-select: none;
  height: 56px;
}
</style>