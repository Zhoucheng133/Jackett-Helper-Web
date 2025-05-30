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
    <DataTable :value="list" size="small" stripedRows v-if="!loading">
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
                {{ formatBytes(slotProps.data.size) }}
              </div>
            </div>
          </div>
        </template>
      </Column>
      <Column header="操作" style="min-width: 100px;">
        <template #body="slotProps">
          <ButtonGroup>
            <Button size="small" severity="secondary" icon="pi pi-clipboard" style="font-size: 12px;" @click="copyLink(slotProps.data.magnet)"/>
            <Button size="small" severity="secondary" icon="pi pi-download" style="font-size: 12px;" @click="download($event, slotProps.data.magnet)"/>
          </ButtonGroup>
        </template>
      </Column>
    </DataTable>

    <div class="loading" v-else>
      <i class="pi pi-spinner" style="margin-right: 10px;"></i>
      <div>加载中...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import TitleBar from '../components/title_bar.vue';
import { Breadcrumb, useToast, DataTable, Column, ButtonGroup, Button, useConfirm } from 'primevue';
import { onMounted, ref } from 'vue';
import type { HandlerItem } from '../store';
import dayjs from 'dayjs';
import store from '../store';
import useClipboard from 'vue-clipboard3';
import { formatBytes } from "../store/static";
const { toClipboard } = useClipboard();
const toast = useToast();
const route=useRoute();
const query=ref(route.params)
const id=query.value.id as string;
const confirm = useConfirm();

const list=ref<HandlerItem[]>([]);

const name=ref("");

const loading=ref(true);

const copyLink=(url: string)=>{
  toClipboard(url);
  toast.add({ severity: 'success', summary: '复制成功', detail: '已复制磁力链接', life: 3000 });
}

const download=(event: any, url: string)=>{
  if(store().ariaConfig.url.length==0){
    toast.add({ severity: 'error', summary: '无法下载', detail: "没有配置Aria", life: 3000 });
  }

  confirm.require({
    target: event.currentTarget,
    position: "bottomleft",
    message: '你确定要下载吗',
    rejectProps: {
      label: '取消',
      severity: 'secondary',
      outlined: true,
      size: "small"
    },
    acceptProps: {
      label: '下载',
      size: "small"
    },
    accept: ()=>{
      store().download(url);
    },
    reject: () => {}
  });
}

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
  loading.value=false;
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

.pi-spinner{
  animation: loading 1s linear infinite;
}

@keyframes loading {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}

.loading{
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
}
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