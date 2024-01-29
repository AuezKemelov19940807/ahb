<script setup>
//components
import ContentTopSort from './ContentTopSort.vue'
import ContentTopFilter from './ContentTopFilter.vue'
import ContenTopSearch from './ContenTopSearch.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-between py-4 pl-4">
    <div class="flex items-center">
      <!-- title -->
      <h2 class="text-[20px] sm:text-[32px] leading-none font-bold mb-5">
        Frontend разработчики
      </h2>
    </div>

    <div class="flex flex-col gap-y-3 lg:flex-row justify-between w-full gap-5">
      <div class="flex flex-col sm:flex-row gap-y-2 items-end gap-x-5">
        <!-- select sort -->
        <ContentTopSort />
        <!-- select filter -->
        <ContentTopFilter />
      </div>

      <!-- search -->
      <ContenTopSearch />
    </div>
  </div>
</template>
