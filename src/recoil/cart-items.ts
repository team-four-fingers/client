import { atom } from 'recoil'

interface CartItems {
  items: CartItem[]
}

interface CartItem {
  store: StoreInfo
  products: Product[]
}

interface Product {
  name: string
  price: number
}

interface StoreInfo {
  coordinate: Coordinate
  name: string
  operation_hours: string
  has_parking_lot: boolean
  distance_from_origin: number
}
interface Coordinate {
  x: number
  y: number
}

const MOCK_CART_ITEMS: CartItems = {
  items: [
    {
      store: {
        coordinate: {
          x: 126.92716700037366,
          y: 37.5266641708316,
        },
        name: 'test',
        operation_hours: 'test',
        has_parking_lot: true,
        distance_from_origin: 0,
      },
      products: [
        {
          name: 'test',
          price: 0,
        },
      ],
    },
  ],
}

export const cartItemsState = atom<CartItems>({
  key: 'cartItemsState',
  default: MOCK_CART_ITEMS,
})
