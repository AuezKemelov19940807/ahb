import { defineStore } from 'pinia'
import axios from 'axios'
const api = `https://d5e5dbb25c79be8e.mokky.dev/items`

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [],
    isLoading: false,
    error: false,
    filterOptions: [
      { value: '', name: 'Все' },
      { value: 'Активен', name: 'Активен' },
      { value: 'Неактивен', name: 'Неактивен' },
      { value: 'Приостановлен', name: 'Приостановлен' },
    ],

    sortOptions: [
      { value: '', name: 'По умолчанию' },
      { value: 'fullname', name: 'Названию' },
      { value: 'created_at', name: 'Дата по возрастанию' },
      { value: '-created_at', name: 'Дата по убыванию' },
    ],
  }),

  getters: {
    getUsers(state) {
      return state.items
    },
    getUserById: (state) => (id) => {
      return state.items.find((item) => item.id === id)
    },
  },

  actions: {
    async fetchItems() {
      try {
        this.isLoading = true
        const { data } = await axios.get(`${api}`)
        this.isLoading = false

        this.items = data
      } catch (err) {
        console.log(err)
        this.isLoading = false
        this.error = true
      }
    },
    async fetchItem(id) {
      try {
        this.isLoading = true
        const { data } = await axios.get(`${api}/${id}`)
        this.isLoading = false
        return data
      } catch (err) {
        console.log(err)
      }
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    async deleteItem(id) {
      try {
        this.items = this.items.filter((item) => item.id !== id)
        return await axios.delete(`${api}/${id}`)
      } catch (err) {
        console.log(err)
      }
      localStorage.setItem('items', JSON.stringify(this.items))
    },

    async createItem(item) {
      try {
        const { data } = await axios.post(`${api}`, {
          id: Date.now(),
          ...item,
          created_at: new Date(),
        })

        this.items.push(data)
      } catch (err) {
        console.log(err)
      }
      localStorage.setItem('items', JSON.stringify(this.items))
    },

    async updateItem(item) {
      const itemState = this.items.find((user) => user.id === item.id)

      try {
        this.isLoading = true
        const { data } = await axios.patch(`${api}/${item.id}`, {
          id: Date.now(),
          ...item,
          created_at: new Date(),
        })
        this.isLoading = false

        if (itemState) {
          itemState.fullname = data.fullname
          itemState.created_at = data.created_at
          itemState.phone = data.phone
          itemState.region = data.region
          itemState.status = data.status
        }

        this.items = this.items.map((user) =>
          user.id !== itemState.id ? user : itemState
        )
      } catch (err) {
        console.log(err)
      }
      localStorage.setItem('items', JSON.stringify(this.items))
    },

    async changeSelectFilter(value) {
      const selectApi = value === '' ? `${api}` : `${api}?status=${value}`
      try {
        const { data } = await axios.get(selectApi)
        this.items = data
      } catch (err) {
        console.log(err)
      }
      localStorage.setItem('items', JSON.stringify(this.items))
    },

    async changeSelectSort(value) {
      const selectApi = value === '' ? `${api}` : `${api}?sortBy=${value}`
      try {
        const { data } = await axios.get(selectApi)
        this.items = data
      } catch (err) {
        console.log(err)
      }

      localStorage.setItem('items', JSON.stringify(this.items))
    },

    async changeSearch(value) {
      const selectApi = value === '' ? `${api}` : `${api}?fullname=*${value}*`

      try {
        this.isLoading = true
        const { data } = await axios.get(selectApi)
        this.items = data
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
      localStorage.setItem('items', JSON.stringify(this.items))
    },
  },
})
