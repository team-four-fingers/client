import Icon from './Icon'
import styles from './CurrentLocationBanner.module.scss'

export default function CurrentLocationBanner({ address }: { address: string }) {
  console.log(address)
  return (
    <div className={styles.container}>
      <Icon name='icon-spot-white' />
      <div>
        <p className={styles.desc}>
          <strong>
            <span>내 위치</span>를 기준으로 찾아볼게요
          </strong>
        </p>
        <p className={styles.addr}>경기도 성남시 분당구 판교역로 152</p>
      </div>
    </div>
  )
}
