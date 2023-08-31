import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { useSearchResultItemsCart } from '../recoil/search-result-items'

export default function Cart() {
  const navigate = useNavigate()

  const {
    searchResultItemsInCart,
    selectSearchResultItemFromCart,
    unselectSearchResultItemFromCart,
    selectAllSearchResultItemsFromCart,
    unselectAllSearchResultItemsFromCart,
  } = useSearchResultItemsCart()

  const isAllSelected = searchResultItemsInCart.every(item => item.isSelected)

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          margin: '0px 20px',
          padding: '10px',
        }}
      >
        <div
          style={{ position: 'absolute', left: 0 }}
          onClick={() => {
            navigate(-1)
          }}
        >
          <Icon name='icon-back' size={24} />
        </div>
        장바구니
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <CheckBox
            isChecked={isAllSelected}
            size={20}
            onClick={() => {
              if (isAllSelected) {
                unselectAllSearchResultItemsFromCart()
              } else {
                selectAllSearchResultItemsFromCart()
              }
            }}
          />
          전체 선택
        </div>
      </div>

      {searchResultItemsInCart.map(item => {
        return (
          <>
            <div
              style={{
                padding: '16px 20px',
                color: 'var(--gray-050, #111)',
                fontSize: '16px',
                fontWeight: 700,
                background: ' var(--gray-800, #F4F5F7)',
              }}
            >
              {item.store.name}
            </div>
            <div
              style={{
                padding: '20px',
                color: 'var(--gray-050, #111)',
                fontSize: '16px',
                fontWeight: 700,
                display: 'flex',
                gap: '12px',
              }}
            >
              <CheckBox
                isChecked={item.isSelected}
                size={20}
                onClick={() => {
                  if (item.isSelected) {
                    unselectSearchResultItemFromCart(item)
                  } else {
                    selectSearchResultItemFromCart(item)
                  }
                }}
              />
              <img src={item.product.image_url} width={80} height={80} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    color: 'var(--gray-050, #111)',
                    fontSize: '16px',
                    fontWeight: 700,
                  }}
                >
                  {item.product.name}
                </span>
                <span
                  style={{
                    color: 'var(--gray-300, #646D7A)',
                    fontSize: '15px',
                    fontWeight: 400,
                  }}
                >
                  {item.product.name}
                </span>
              </div>
            </div>

            <div
              style={{
                padding: '20px',
                width: '100%',
                position: 'fixed',
                bottom: 0,
              }}
            >
              <button
                type='button'
                style={{
                  padding: '20px 24px',
                  width: '100%',
                  borderRadius: '12px',
                  background: 'var(--blue-100, #4A88E5)',
                  color: 'var(--white-900, #FFF)',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
                onClick={() => {
                  navigate('/bestRoute')
                }}
              >
                선택한 {searchResultItemsInCart.filter(item => item.isSelected).length}개 상품
                사러가는 길 찾기
              </button>
            </div>
          </>
        )
      })}
    </>
  )
}

const CheckBox = ({
  isChecked,
  size,
  onClick,
}: {
  isChecked: boolean
  size: number
  onClick?: () => void
}) => {
  return (
    <img
      src={isChecked ? '/check-on.png' : '/check-off.png'}
      width={size}
      height={size}
      onClick={onClick}
    />
  )
}
