<script setup>
import Sidebar from './components/Sidebar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col min-h-full xl:flex-row container mx-auto">
    <Sidebar />
    <RouterView />
  </div>
</template>
