<script setup>
// store
import { onMounted, ref } from 'vue'
import { useItemsStore } from '../store/items'
const storeItems = useItemsStore()

const selectRef = ref(null)

const filterRef = ref(storeItems.filterOptions)

const currentStatus = ref('')

onMounted(() => {
  if (localStorage.getItem('filter')) {
    const item = localStorage.getItem('filter')
    currentStatus.value = item
  }
})

const handleChangeSelect = () => {
  storeItems.changeSelectFilter(event.target.value)
  localStorage.setItem('filter', event.target.value)
  currentStatus.value = event.target.value
}
</script>
<template>
  <label class="flex gap-x-2 items-center">
    <span> Фильтровать: </span>
    <select
      ref="selectRef"
      @change="handleChangeSelect"
      :value="currentStatus"
      class="outline-none border px-2 rounded-md cursor-pointer h-[35px] sm:h-[45px]"
    >
      <option v-for="{ name, value } in filterRef" :key="name" :value="value">
        {{ name }}
      </option>
    </select>
  </label>
</template>
