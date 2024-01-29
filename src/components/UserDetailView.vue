<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useItemsStore } from '../store/items'
import spinner from '../assets/spinner.gif'
const storeItems = useItemsStore()
const route = useRoute()

const id = route.params.id

const info = ref({})

onMounted(async () => {
  try {
    const data = await storeItems.fetchItem(id)
    info.value = data
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <div class="flex flex-col gap-y-20 p-5">
    <div v-if="storeItems.isLoading">
      <img class="w-32 h-32" :src="spinner" alt="loading" />
    </div>
    <div v-else class="flex mt-10 flex-col justify-center text-[22px]">
      <div class="flex gap-x-3 items-center">
        <div class="font-bold">ФИО:</div>
        <div class="">{{ info.fullname }}</div>
      </div>
      <div class="flex gap-x-3 items-center">
        <div class="font-bold">Ползователь создан:</div>
        <div class="">{{ info.created_at }}</div>
      </div>
      <div class="flex gap-x-3 items-center">
        <div class="font-bold">Телефон:</div>
        <div class="">{{ info.phone }}</div>
      </div>
      <div class="flex gap-x-3 items-center">
        <div class="font-bold">Район:</div>
        <div class="">{{ info.region }}</div>
      </div>
      <div class="flex gap-x-3 items-center">
        <div class="font-bold">Статус:</div>
        <div class="">{{ info.status }}</div>
      </div>
    </div>
    <div>
      <router-link
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        to="/"
      >
        Назад
      </router-link>
    </div>
  </div>
</template>
