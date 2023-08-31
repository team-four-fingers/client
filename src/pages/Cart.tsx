import Icon from '../components/Icon'
import { useSearchResultItemsCart } from '../recoil/search-result-items'

export default function Cart() {
  const { searchResultItemsInCart } = useSearchResultItemsCart()

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
        <div style={{ position: 'absolute', left: 0 }}>
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
          <CheckBox isChecked={searchResultItemsInCart.every(item => item.isSelected)} size={20} />
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
              <CheckBox isChecked={item.isSelected} size={20} />
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
          </>
        )
      })}
    </>
  )
}

const CheckBox = ({ isChecked, size }: { isChecked: boolean; size: number }) => {
  return (
    <img
      src={isChecked ? '/public/check-on.png' : '/public/check-off.png'}
      width={size}
      height={size}
    />
  )
}
