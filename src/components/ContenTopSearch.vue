<script setup>
import { useItemsStore } from '../store/items'
// images
import search from '../assets/search.svg'
// state
const storeItems = useItemsStore()
// lodash
import debounce from 'lodash.debounce'

const handleChangeSearch = debounce((event) => {
  storeItems.changeSearch(event.target.value)
}, 300)
</script>

<template>
  <div
    class="flex pl-3 items-center border w-full h-[35px] sm:h-[45px] gap-x-3 rounded-lg"
  >
    <img class="w-6 h-6" :src="search" alt="" />
    <input
      @input="handleChangeSearch"
      class="outline-none"
      type="text"
      placeholder="Поиск..."
    />
  </div>
</template>
