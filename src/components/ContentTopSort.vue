<script setup>
import { onMounted, ref } from 'vue'
// store
import { useItemsStore } from '../store/items'
const storeItems = useItemsStore()

const selectRef = ref(null)

const filterRef = ref(storeItems.sortOptions)

const currentSort = ref('')

onMounted(() => {
  if (localStorage.getItem('sort')) {
    const item = localStorage.getItem('sort')
    currentSort.value = item
  }
})

const handleChangeSelectSort = () => {
  storeItems.changeSelectSort(event.target.value)
  localStorage.setItem('sort', event.target.value)
  currentSort.value = event.target.value
}
</script>
<template>
  <label class="flex gap-x-2 items-center">
    <span class=""> Сортировать: </span>
    <select
      ref="selectRef"
      :value="currentSort"
      @change="handleChangeSelectSort"
      class="outline-none border sm:px-2 rounded-md h-[35px] sm:h-[45px] cursor-pointer"
    >
      <option v-for="{ name, value } in filterRef" :key="name" :value="value">
        <span class="">{{ name }}</span>
      </option>
    </select>
  </label>
</template>
