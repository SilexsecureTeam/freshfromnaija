import { useSelector, useDispatch } from 'react-redux'
import { removeItem, changeQuantity, clearCart } from '../store/cartSlice'
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function ShoppingCart() {
  const items = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const onDecrement = (id, qty) => {
    const newQty = Math.max(1, qty - 1)
    dispatch(changeQuantity({ id, quantity: newQty }))
  }
  const onIncrement = (id, qty) => {
    dispatch(changeQuantity({ id, quantity: qty + 1 }))
  }

  return (
    <div className="max-w-[80%] mx-auto p-6 mt-40">
      <button
        onClick={() => dispatch(clearCart())}
        className="text-left font-bold border-[rgb(208,207,207,0.5)] w-full py-4 !border-t !border-b text-gray-600 mb-4 flex items-center"
      >
        &lt; Add Products
      </button>
      <h2 className="font-medium !mb-1">Shopping cart</h2>
      <p className="text-gray-500 !mb-6">You have {items.length} items in your cart</p>

      {items.map(item => (
        <div key={item.id} className="relative flex bg-white p-4 mb-4 rounded-[10px] shadow">
          <button
            onClick={() => dispatch(removeItem(item.id))}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <TrashIcon className="h-5 w-5" />
          </button>

          <div>
            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex items-center mt-2">
              <button onClick={() => onDecrement(item.id, item.quantity)} className="p-1 border border-gray-300 rounded-l">
                <MinusIcon className="h-5 w-5 bg-[#F2F2F2] rounded-[50%] p-0.5" />
              </button>
              <span className="px-3 py-1 text-[13px]">{item.quantity}</span>
              <button onClick={() => onIncrement(item.id, item.quantity)} className="p-1 border border-gray-300 rounded-r">
                <PlusIcon className="h-5 w-5 bg-[#F2F2F2] rounded-[50%] p-0.5" />
              </button>
            </div>
          </div>

          <div className="flex-1 px-4 !space-y-1.5 font-medium">
            <h3 className="font-semibold text-[17px] text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500"><span className="text-[#1E1E1E]">Category:</span> {item.category}</p>
            <p className="text-sm text-gray-500"><span className="text-[#1E1E1E]">Shipping Type:</span> {item.shippingType}</p>
            <p className="text-sm text-gray-500"><span className="text-[#1E1E1E]">Shipping Agent:</span> {item.shippingAgent}</p>
          </div>

          <div className="flex flex-col items-end absolute right-4 bottom-4">
            <span className="text-sm text-gray-800">Pick up fee: {item.price}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
