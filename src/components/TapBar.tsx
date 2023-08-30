import { NavLink } from 'react-router-dom'
import Icon, { IconNameType } from './Icon'

import styles from './TapBar.module.scss'

export default function TapBar() {
  type TapBarItem = {
    name: '탐색' | '장바구니' | '저장 경로'
    icon: IconNameType
    path: string
    active: boolean
  }

  const tapBarItems: TapBarItem[] = [
    { name: '탐색', icon: 'icon_check', path: '/', active: true },
    { name: '장바구니', icon: 'icon_check', path: '/cart', active: false },
    { name: '저장 경로', icon: 'icon_check', path: '/savedRoutes', active: false },
  ]

  return (
    <div className={styles.container}>
      {tapBarItems.map(item => (
        <div className={item.active ? styles.activeItem : styles.item} key={item.path}>
          <NavLink to={item.path}>
            <Icon name={item.icon} />
            <div className={styles.label}>{item.name}</div>
          </NavLink>
        </div>
      ))}
    </div>
  )
}
