import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

import styles from './SearchResultHeader.module.scss'

type SearchResultHeaderProps = {
  keyword: string
  count: number
}

export default function SearchResultHeader({ keyword, count }: SearchResultHeaderProps) {
  const navigate = useNavigate()

  const handleBackClick = () => navigate('/')
  const handleCartClick = () => navigate('/cart')

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <button className={styles.button} type='button' onClick={handleBackClick}>
          <Icon name='icon-back' />
        </button>
        <div className={styles.keyword}>{keyword}</div>
        <div className={styles.count}>{count}</div>
      </div>
      <div className={styles.right}>
        <button className={styles.button} type='button' onClick={handleCartClick}>
          <Icon name='icon-bookmark-solid' />
        </button>
      </div>
    </div>
  )
}
