import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { useSearchResultItemsCart } from '../recoil/search-result-items'
import TapBar from '../components/TapBar'

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

  console.log(searchResultItemsInCart)

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
          content: ' ',
          display: 'block',
          clear: 'both',
          height: '1px',
          background: '#F0F2F5',
        }}
      ></div>

      {searchResultItemsInCart.length > 0 && (
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
      )}

      {searchResultItemsInCart.length === 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
            marginTop: '200px',
          }}
        >
          <p style={{ color: '#9FA4B0', fontWeight: 500 }}>아직 장바구니에 담긴 상품이 없어요</p>
          <button
            style={{
              width: '153px',
              borderRadius: '12px',
              color: '#3B7AD9',
              fontWeight: 'bold',
              padding: '20px 24px',
              background: '#4A88E526',
            }}
            onClick={() => {
              navigate('/')
            }}
          >
            상품 찾으러 가기
          </button>
        </div>
      ) : (
        searchResultItemsInCart.map(item => {
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
                <img
                  src={item.product.image_url}
                  width={80}
                  height={80}
                  style={{ borderRadius: '12px' }}
                />
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
                  maxWidth: '640px',
                  position: 'fixed',
                  bottom: '84px',
                }}
              >
                <button
                  type='button'
                  style={{
                    padding: '16px 24px',
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
        })
      )}
      <div style={{ content: ' ', display: 'block', clear: 'both', height: '240px' }}></div>
      <TapBar />
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
