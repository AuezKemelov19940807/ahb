<script setup>
import { ref } from 'vue'
// store
import { useItemsStore } from '../store/items'
// router
import { useRouter } from 'vue-router'
import { citiesRussia } from '../data/citiesRussia'
// store
const storeItems = useItemsStore()
const router = useRouter()
const item = ref({
  fullname: '',
  phone: '',
  region: '',
  status: '',
})

const resetTodo = () => {
  item.value = {}
}

const addTask = () => {
  storeItems.createItem({ ...item.value })
  resetTodo()
}

const performAction = () => {
  addTask()
  router.push({ name: 'home' })
}
</script>
<template>
  <div class="py-12 pl-5">
    <form class="w-full max-w-lg" @submit.prevent="performAction">
      <div class="flex flex-wrap -mx-3 mb-2 md:mb-5">
        <div class="w-full px-3 mb-2 md:mb-5">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="fullname"
          >
            ФИО
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="ФИО"
            label="fullname"
            id="fullname"
            v-model="item.fullname"
            required
            type="text"
          />
        </div>
        <div class="flex flex-col mb-5 md:mb-5 md:flex-row px-3 gap-3 w-full">
          <div class="md:w-1/2 mb-2 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="status"
            >
              Статус
            </label>
            <div class="relative">
              <select
                class="block cursor-pointer appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="status"
                v-model="item.status"
              >
                <option value="" disabled>Выбор статуса</option>
                <option value="Активен">Активен</option>
                <option value="Неактивен">Неактивен</option>
                <option value="Приостановлен">Приостановлен</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="relative">
            <label
              for="exampleDataList"
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >Место проживание</label
            >
            <select
              class="block cursor-pointer appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              v-model="item.region"
            >
              <option value="" disabled>Выбор города</option>
              <option
                v-for="{ name, value } in citiesRussia"
                :key="name"
                :value="value"
              >
                {{ name }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute top-6 inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="phone"
          >
            Телефон
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="phone"
            type="tel"
            v-model="item.phone"
            required
            placeholder="+7 (XXX) XXX XX XX"
          />
        </div>
      </div>
      <div class="inline-flex flex-col gap-y-2 md:flex-row gap-x-3">
        <button
          type="submit"
          class="inline-flex items-center rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Добавить разработчика
        </button>
        <router-link
          to="/"
          class="inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          <span>Назад</span>
        </router-link>
      </div>
    </form>
  </div>
</template>
