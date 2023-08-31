import Icon from './Icon'
import styles from './ProductDetailModal.module.scss'
import { SearchResultItem } from '../pages/Search'
import { useSearchResultItemsCart } from '../recoil/search-result-items'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type ProductDetailModalProps = {
  data: SearchResultItem
}

export default function ProductDetailModal({ data }: ProductDetailModalProps) {
  const { product, store, when_types } = data

  const { addSearchResultItemToCart } = useSearchResultItemsCart()

  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const addCartBtnClick = () => {
    addSearchResultItemToCart(data)
    setIsPopUpOpen(true)
  }

  const goCartPage = () => {
    setIsPopUpOpen(false)
    navigate('/cart')
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.badges}>
          {when_types.map(when_type => (
            <div className={styles.badge} key={when_type}>
              {when_type}
            </div>
          ))}
        </div>
        <div className={styles.productBox}>
          <div className={styles.productInfo}>
            <div className={styles.title}>{product.name}</div>
            <div className={styles.store}>
              {store.name}
              <Icon name='icon-arrow_right-gray400' size={12} />
            </div>
            <div className={styles.price}>{product.price.toLocaleString()}</div>
          </div>
          <div className={styles.productImg}>
            <img src={product.image_url} alt='' />
          </div>
        </div>
        <div className={styles.desc}>
          <p>
            ・내 위치에서{' '}
            {store.distance_from_origin < 1000
              ? `${store.distance_from_origin}m`
              : `${(store.distance_from_origin * 0.001).toFixed(2)}km`}
          </p>
          <p>・운영시간: {store.operation_hours}</p>
          <p>・주차장 {store.has_parking_lot ? '보유' : '없음'}</p>
        </div>
        <button type='button' className={styles.btn} onClick={addCartBtnClick}>
          장바구니 담기
        </button>
      </div>
      {isPopUpOpen && (
        <AddToCartPopUp
          handleClose={() => setIsPopUpOpen(false)}
          handleGoCartClick={() => goCartPage()}
        />
      )}
    </>
  )
}

type AddToCartPopUpProps = {
  handleClose: () => void
  handleGoCartClick: () => void
}

function AddToCartPopUp({ handleClose, handleGoCartClick }: AddToCartPopUpProps) {
  return (
    <div className={styles.popupBg}>
      <div className={styles.popupContainer}>
        <div>
          <p>장바구니로 이동할까요?</p>
          <p>상품을 성공적으로 담았습니다.</p>
        </div>
        <div className={styles.btnBox}>
          <button type='button' onClick={handleClose}>
            닫기
          </button>
          <button type='button' onClick={handleGoCartClick}>
            장바구니 보기
          </button>
        </div>
      </div>
    </div>
  )
}
