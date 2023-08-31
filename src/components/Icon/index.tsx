import sprite from './sprite.svg'

export type IconNameType =
  | 'icon-arrow_down'
  | 'icon-arrow_right'
  | 'icon-arrow_up'
  | 'icon-back'
  | 'icon-bookmark-line'
  | 'icon-bookmark-solid'
  | 'icon-cart-line'
  | 'icon-cart-solid'
  | 'icon-check'
  | 'icon-list'
  | 'icon-map'
  | 'icon-minus'
  | 'icon-search-line'
  | 'icon-plus'
  | 'icon-search-solid'
  | 'icon-spot'
  | 'icon-spot-white'

type IconType = {
  name: IconNameType
  size?: number
}

export default function Icon({ name, size = 24 }: IconType) {
  return (
    <svg width={size} height={size}>
      <use href={`${sprite}#${name}`} />
    </svg>
  )
}
