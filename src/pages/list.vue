<template>
  <TitleBar class="titlebar" />
  <div class="body">
    <div class="tool_bar">
      <ButtonGroup>
        <Button size="small">添加索引</Button>
        <Button size="small" icon="pi pi-sliders-h" />
      </ButtonGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBar from '../components/title_bar.vue';
import { Button, ButtonGroup } from 'primevue';
</script>

<style scoped>
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