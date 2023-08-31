import { atom, useRecoilState } from 'recoil'
import { SearchResultItem } from '../pages/Search'
import productUrl from '../assets/product_sample.png'

export const searchResultItemsState = atom<SearchResultItem[]>({
  key: 'searchResultItemsState',
  default: [],
})

const MOCK_LIST = [
  {
    isSelected: true,
    result_id: 1,
    when_types: ['when_type1'],
    product: {
      name: '제품1',
      price: 20000,
      image_url: productUrl,
    },
    store: {
      coordinate: { lat: 37.54452, lng: 127.043452 },
      name: '상점1',
      operation_hours: '9:00~18:00',
      has_parking_lot: true,
      distance_from_origin: 32,
    },
  },
  {
    isSelected: true,
    result_id: 2,
    when_types: ['when_type2'],
    product: {
      name: '제품2',
      price: 4900,
      image_url: productUrl,
    },
    store: {
      coordinate: { lat: 37.54452, lng: 127.0439 },
      name: '상점2',
      operation_hours: '10:00~20:00',
      has_parking_lot: false,
      distance_from_origin: 100,
    },
  },
  {
    isSelected: true,
    result_id: 3,
    when_types: ['when_type3'],
    product: {
      name: '제품3',
      price: 10900,
      image_url: productUrl,
    },
    store: {
      coordinate: { lat: 37.54532, lng: 127.043452 },
      name: '상점3',
      operation_hours: '10:00~20:00',
      has_parking_lot: false,
      distance_from_origin: 1200,
    },
  },
]

export const searchResultItemCartState = atom<(SearchResultItem & { isSelected: boolean })[]>({
  key: 'searchResultItemCartState',
  default: MOCK_LIST,
})

export const useSearchResultItemsCart = () => {
  const [searchResultItems, setSearchResultItems] = useRecoilState(searchResultItemCartState)

  const addSearchResultItemToCart = (searchResultItem: SearchResultItem) => {
    if (searchResultItems.find(item => item.result_id === searchResultItem.result_id)) {
      return
    }
    setSearchResultItems(prev => [...prev, { ...searchResultItem, isSelected: true }])
  }

  const selectSearchResultItemFromCart = (searchResultItem: SearchResultItem) => {
    setSearchResultItems(prev =>
      prev.map(item => {
        if (item.result_id === searchResultItem.result_id) {
          return { ...item, isSelected: true }
        }
        return item
      }),
    )
  }

  const unselectSearchResultItemFromCart = (searchResultItem: SearchResultItem) => {
    setSearchResultItems(prev =>
      prev.map(item => {
        if (item.result_id === searchResultItem.result_id) {
          return { ...item, isSelected: false }
        }
        return item
      }),
    )
  }

  const selectAllSearchResultItemsFromCart = () => {
    setSearchResultItems(prev =>
      prev.map(item => {
        return { ...item, isSelected: true }
      }),
    )
  }

  const unselectAllSearchResultItemsFromCart = () => {
    setSearchResultItems(prev =>
      prev.map(item => {
        return { ...item, isSelected: false }
      }),
    )
  }

  return {
    addSearchResultItemToCart,
    selectSearchResultItemFromCart,
    unselectSearchResultItemFromCart,
    selectAllSearchResultItemsFromCart,
    unselectAllSearchResultItemsFromCart,
    searchResultItemsInCart: searchResultItems,
  }
}
