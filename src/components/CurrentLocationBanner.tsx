import Icon from './Icon'

import styles from './CurrentLocationBanner.module.scss'

export default function CurrentLocationBanner({ address }: { address: string }) {
  return (
    <div className={styles.container}>
      <Icon name='icon-spot-white' />
      <div>
        <p className={styles.desc}>
          <strong>
            <span>내 위치</span>를 기준으로 찾아볼게요
          </strong>
        </p>
        <p className={styles.addr}>{address}</p>
      </div>
    </div>
  )
}
