<template>
  <TitleBar class="titlebar" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import TitleBar from '../components/title_bar.vue';
import { ref } from 'vue';
const route=useRoute();
const query=ref(route.params)
const id=query.value.id;

console.log(id);



</script>