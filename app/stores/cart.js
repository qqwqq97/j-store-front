import { defineStore } from 'pinia'

export const useCart = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  actions: {
    addCart(item) {
      const existingItem = this.items.find(i => i.id === item.id)

      if(existingItem) {
        existingItem.quantity += item.quantity || 1
      } else {
        this.items.push({
          ...item,
        })
      }
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id)
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    clearCart() {
      this.items = []
      localStorage.removeItem('cart')
    },

    loadCart() {
      const data = JSON.parse(localStorage.getItem('cart') || '[]')
      return this.items = data
    },
  },

  getters: {
    itemsCount: (state) => state.items.length,
    totalQuantity: (state) => 
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => 
      state.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }
})