import { atom, useRecoilState } from 'recoil'
import { SearchResultItem } from '../pages/Search'

export const searchResultItemsState = atom<SearchResultItem[]>({
  key: 'searchResultItemsState',
  default: [],
})

export const searchResultItemCartState = atom<(SearchResultItem & { isSelected: boolean })[]>({
  key: 'searchResultItemCartState',
  default: [],
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
