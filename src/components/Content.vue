<script setup>
import { onMounted } from 'vue'
import { useItemsStore } from '../store/items'

//components
import ContentTop from './ContentTop.vue'
import ContentTable from './ContentTable.vue'
import userAdd from '../assets/user-add.svg'
const storeItems = useItemsStore()
onMounted(() => {
  //localStorage
  const storedUsersString = localStorage.getItem('items')
  if (storedUsersString) {
    storeItems.items = storedUsersString ? JSON.parse(storedUsersString) : []
  } else {
    storeItems.fetchItems()
  }
})
</script>

<template>
  <div
    class="w-full xl:basis-4/5 xl:h-[85%] container relative mx-auto flex flex-col"
  >
    <ContentTop />
    <div class="flex-1">
      <ContentTable />
    </div>

    <router-link to="/add">
      <img
        class="bg-blue-600 rounded-full p-1 opacity-75 w-10 h-10 xl:hidden fixed bottom-5 right-5 sm:right-10 cs:right-[80px] lg:right-[150px]"
        :src="userAdd"
        alt="userAdd"
      />
    </router-link>
    <div>
      <router-link
        to="/add"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 mt-5 hidden xl:inline-block"
      >
        Добавить разработчика
      </router-link>
    </div>
  </div>
</template>
