// type ProductDetailModalProps = {}
import Icon from './Icon'
import styles from './ProductDetailModal.module.scss'
import { SearchResultItem } from '../pages/Search'

type ProductDetailModalProps = {
  data: SearchResultItem
}

export default function ProductDetailModal({ data }: ProductDetailModalProps) {
  const { product, store, when_types } = data

  return (
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
            : `${store.distance_from_origin * 0.001}km`}
        </p>
        <p>・운영시간: {store.operation_hours}</p>
        <p>・주차장 {store.has_parking_lot ? '보유' : '없음'}</p>
      </div>
      <button
        type='button'
        className={styles.btn}
        onClick={() => {
          console.log('장바구니 담기')
        }}
      >
        장바구니 담기
      </button>
    </div>
  )
}
