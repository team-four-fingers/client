import Icon from './Icon'

import styles from './CurrentLocationBanner.module.scss'

export default function CurrentLocationBanner() {
  return (
    <div className={styles.container}>
      <Icon name='icon-spot-white' />
      <div>
        <p className={styles.desc}>
          <strong>
            <span>내 위치</span>를 기준으로 찾아볼게요
          </strong>
        </p>
        <p className={styles.addr}>서울 성동구 왕십리로 83-21</p>
      </div>
    </div>
  )
}
