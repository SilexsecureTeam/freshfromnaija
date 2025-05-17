import { createSlice } from '@reduxjs/toolkit'

// load persisted cart
const savedCart = localStorage.getItem('cart')
const initialState = savedCart ? JSON.parse(savedCart) : []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload
      const existing = state.find(i => i.id === item.id)
      if (existing) {
        existing.quantity += item.quantity
      } else {
        state.push(item)
      }
      localStorage.setItem('cart', JSON.stringify(state))
    },
    removeItem: (state, action) => {
      const id = action.payload
      const newState = state.filter(i => i.id !== id)
      localStorage.setItem('cart', JSON.stringify(newState))
      return newState
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const existing = state.find(i => i.id === id)
      if (existing) {
        existing.quantity = quantity
      }
      localStorage.setItem('cart', JSON.stringify(state))
    },
    clearCart: () => {
      localStorage.removeItem('cart')
      return []
    },
  },
})

export const { addItem, removeItem, changeQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer