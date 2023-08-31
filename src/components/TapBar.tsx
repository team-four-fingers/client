import { NavLink, useLocation } from 'react-router-dom'
import Icon, { IconNameType } from './Icon'

import styles from './TapBar.module.scss'

export default function TapBar() {
  const { pathname } = useLocation()

  type TapBarItem = {
    name: '탐색' | '장바구니' | '저장 경로'
    icon: IconNameType
    path: string
  }

  const tapBarItems: TapBarItem[] = [
    { name: '탐색', icon: 'icon-search-line', path: '/' },
    { name: '장바구니', icon: 'icon-cart-line', path: '/cart' },
    { name: '저장 경로', icon: 'icon-bookmark-line', path: '/savedRoutes' },
  ]

  return (
    <div className={styles.container}>
      {tapBarItems.map(item => (
        <div className={item.path === pathname ? styles.activeItem : styles.item} key={item.path}>
          <NavLink to={item.path}>
            <Icon name={item.icon} />
            <div className={styles.label}>{item.name}</div>
          </NavLink>
        </div>
      ))}
    </div>
  )
}
