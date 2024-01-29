<script setup>
import { format } from 'date-fns'
import { computed } from 'vue'
// store
import { useItemsStore } from '../store/items'
//images
import error from '../assets/error.png'
import notfound from '../assets/not-found.png'
import spinner from '../assets/spinner.gif'
import edit from '../assets/edit.svg'
import garbage from '../assets/garbage.svg'
import connected from '../assets/status-connected.svg'
import disconnected from '../assets/status-disconnected.svg'
import lagging from '../assets/status-lagging.svg'
import calendar from '../assets/calendar.svg'
import phone from '../assets/phone.svg'
import map from '../assets/map.svg'
import userIcon from '../assets/user.svg'
// store
const storeItems = useItemsStore()

const items = computed(() => {
  return storeItems.items
})

const handleDelete = (id) => {
  let question = confirm(`Вы действительно хотите удалить?`)
  if (question) {
    storeItems.deleteItem(id)
  }
}
</script>

<template>
  <div
    class="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[#60A5FA] scrollbar-track-[#EFF9FC] cursor-pointer xl:h-[calc(100vh_-_250px)]"
  >
    <div class="max-w-full">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="hidden lg:table-header-group w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <!-- header -->
          <tr>
            <th scope="col" class="px-6 py-3">ФИО</th>
            <th scope="col" class="px-6 py-3">Регион</th>
            <th scope="col" class="px-6 py-3">Контакты</th>
            <th scope="col" class="px-6 py-3">Статус</th>
            <th scope="col" class="px-6 py-3">Создан</th>
            <th scope="col" class="px-6 py-3">Действие</th>
          </tr>
        </thead>
        <div
          class="py-10 absolute flex flex-col items-center w-full h-full"
          v-if="storeItems.isLoading"
        >
          <img class="w-32 h-32" :src="spinner" alt="loading" />
        </div>
        <div
          class="py-10 absolute flex flex-col items-center w-full h-full"
          v-else-if="!storeItems.items.length && !storeItems.error"
        >
          <img class="w-32 h-32" :src="notfound" alt="Not Found" />
          <p class="text-[40px] mt-5">Ничего не найдено!</p>
        </div>
        <!-- items -->
        <div
          class="py-10 absolute flex flex-col items-center w-full h-full"
          v-else-if="storeItems.error"
        >
          <img class="w-32 h-32" :src="error" alt="error" />
          <p class="mt-5 leading-10 text-[20px] w-[600px] text-center">
            Кажется что-то пошло не так! Страница, которую вы запрашиваете, не
            существует. Возможно она устарела, была удалена, или был введен
            неверный адрес в адресной строке.
          </p>
        </div>
        <tbody v-else>
          <tr
            class="bg-white block lg:table-row border-b dark:bg-gray-800 dark:border-gray-700 py-5 lg:py-0"
            v-for="user in items"
            :key="user.id"
          >
            <th
              data-label="ФИО"
              scope="row"
              class="px-2 py-2 lg:py-4 flex lg:table-cell justify-between before:content-[attr(data-label)] lg:before:content-none whitespace-nowrap"
            >
              <router-link
                class="underline"
                :to="{
                  name: 'UserDetailView',
                  params: { id: user.id },
                }"
              >
                <span class="flex items-center gap-x-2">
                  <img
                    class="w-4 h-4 sm:w-5 sm:h-5"
                    :src="userIcon"
                    alt="user"
                  />
                  <span class="text-[12px] sm:text-[16px]">
                    {{ user.fullname }}</span
                  >
                </span>
              </router-link>
            </th>
            <td
              data-label="Регион"
              class="px-2 py-2 lg:py-4 flex lg:table-cell justify-between before:content-[attr(data-label)] lg:before:content-none"
            >
              <span class="flex items-center gap-x-1">
                <img class="w-5 h-5" :src="map" alt="map" />
                <span> {{ user.region }}</span>
              </span>
            </td>
            <td
              data-label="Контакты"
              class="px-2 py-2 lg:py-4 flex lg:table-cell justify-between before:content-[attr(data-label)] lg:before:content-none"
            >
              <a :href="`tel:${user.phone}`" class="flex gap-x-1 items-center">
                <img class="w-5 h-5" :src="phone" alt="phone" />
                <span class="text-blue-400 underline whitespace-nowrap">{{
                  user.phone
                }}</span>
              </a>
            </td>
            <td
              data-label="Статус"
              class="px-2 py-2 lg:py-4 flex lg:table-cell justify-between before:content-[attr(data-label)] lg:before:content-none"
            >
              <span class="flex items-center gap-x-2">
                <img
                  class="w-3 h-3"
                  :src="
                    user.status === 'Активен'
                      ? connected
                      : user.status === 'Приостановлен'
                      ? lagging
                      : disconnected
                  "
                  alt="edit"
                />
                <span
                  :class="{
                    'text-yellow-500': user.status === 'Приостановлен',
                    'text-red-600': user.status === 'Неактивен',
                    'text-green-700': user.status === 'Активен',
                  }"
                >
                  {{ user.status }}
                </span>
              </span>
            </td>
            <td
              data-label="Создан"
              class="px-2 py-2 lg:py-4 flex lg:table-cell justify-between before:content-[attr(data-label)] lg:before:content-none"
            >
              <span class="flex gap-x-1 items-center">
                <img class="w-5 h-5" :src="calendar" alt="calendar" />
                <span>{{ format(user.created_at, 'dd/MM/yy') }}</span>
              </span>
            </td>

            <td
              class="px-6 py-2 lg:py-4 flex gap-x-2 justify-end lg:justify-start"
            >
              <router-link
                class="bg-blue-400 rounded-md"
                :to="{
                  name: 'update',
                  params: { id: user.id },
                }"
              >
                <img class="w-5 h-5" :src="edit" alt="edit" />
              </router-link>
              <button
                class="bg-red-400 w-5 h-5 flex items-center justify-center rounded-md"
                @click="() => handleDelete(user.id)"
              >
                <img class="w-4 h-4" :src="garbage" alt="garbage" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
