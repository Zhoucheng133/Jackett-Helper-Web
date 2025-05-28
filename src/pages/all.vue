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
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import TitleBar from '../components/title_bar.vue';
import { Breadcrumb, useToast } from 'primevue';
import { onMounted, ref } from 'vue';
import type { HandlerItem } from '../store';
import store from '../store';
const toast = useToast();
const route=useRoute();
const query=ref(route.params)
const id=query.value.id as string;

const list=ref<HandlerItem[]>([]);

onMounted(async ()=>{
  const response=await store().allFromId(id);
  if(response.ok){
    list.value=response.msg;
  }else{
    toast.add({ severity: 'error', summary: '获取失败', detail: response.msg, life: 3000 });
  }
})

const home = ref({
  icon: 'pi pi-home',
  route: '/list'
});
const items=ref([
  { label: '全部' },
])


</script>

<style scoped>
.tool_bar{
  margin-top: 10px;
  display: flex;
  align-items: center;
  user-select: none;
  height: 56px;
}
</style>